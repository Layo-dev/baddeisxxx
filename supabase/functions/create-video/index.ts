import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { buildPlaybackUrl, bunnyStatusToAppStatus, slugify } from "../_shared/video-utils.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requiredEnv = (name: string): string => {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const json = (status: number, payload: Record<string, unknown>) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const libraryId = requiredEnv("BUNNY_STREAM_LIBRARY_ID");
    const accessKey = requiredEnv("BUNNY_STREAM_API_KEY");
    const supabaseUrl = requiredEnv("SUPABASE_URL");
    const serviceRoleKey = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const cdnHost = Deno.env.get("BUNNY_STREAM_CDN_HOST") ?? undefined;

    const payload = await req.json().catch(() => null);
    const videoIdRaw = payload?.videoId;
    const titleRaw = payload?.title;

    const videoId = typeof videoIdRaw === "string" ? videoIdRaw.trim() : "";
    const fallbackTitle = typeof titleRaw === "string" ? titleRaw.trim() : "";

    if (!videoId) {
      return json(400, { error: "videoId is required" });
    }

    const getVideoResponse = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`, {
      method: "GET",
      headers: {
        AccessKey: accessKey,
        Accept: "application/json",
      },
    });

    if (!getVideoResponse.ok) {
      const details = await getVideoResponse.text();
      return json(502, { error: "Failed to fetch Bunny video by id", details, videoId });
    }

    const bunnyVideo = await getVideoResponse.json();
    const bunnyTitle = typeof bunnyVideo?.title === "string" ? bunnyVideo.title.trim() : "";
    const title = bunnyTitle || fallbackTitle || `video-${videoId.slice(0, 8)}`;
    const appStatus = bunnyStatusToAppStatus(Number(bunnyVideo?.status ?? 0));

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${videoId.slice(0, 8)}`;

    const { data: inserted, error: insertError } = await supabase
      .from("videos")
      .insert({
        title,
        slug,
        bunny_video_id: videoId,
        status: appStatus,
        playback_url: buildPlaybackUrl(cdnHost, videoId),
        duration_seconds: typeof bunnyVideo?.length === "number" ? bunnyVideo.length : null,
      })
      .select("id, title, slug, bunny_video_id, status")
      .single();

    if (insertError) {
      return json(500, { error: "Failed to insert video in Supabase", details: insertError.message, videoId });
    }

    return json(200, {
      videoId,
      dbId: inserted.id,
      slug: inserted.slug,
      status: inserted.status,
      message: "Video registered in Supabase",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return json(500, { error: message });
  }
});
