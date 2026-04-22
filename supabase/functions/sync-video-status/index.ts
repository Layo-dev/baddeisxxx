import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
import { buildPlaybackUrl, buildThumbnailUrl, bunnyStatusToAppStatus } from "../_shared/video-utils.ts";

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

type BunnyVideoResponse = {
  status: number;
  length?: number;
  thumbnailFileName?: string | null;
};

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

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: pendingVideos, error: pendingError } = await supabase
      .from("videos")
      .select("id, bunny_video_id")
      .eq("status", "processing")
      .limit(50);

    if (pendingError) {
      return json(500, { error: "Failed to load processing videos", details: pendingError.message });
    }

    if (!pendingVideos || pendingVideos.length === 0) {
      return json(200, { checked: 0, updated: 0 });
    }

    let updated = 0;

    for (const video of pendingVideos) {
      const response = await fetch(
        `https://video.bunnycdn.com/library/${libraryId}/videos/${video.bunny_video_id}`,
        {
          method: "GET",
          headers: {
            AccessKey: accessKey,
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        continue;
      }

      const bunnyVideo = (await response.json()) as BunnyVideoResponse;
      const status = bunnyStatusToAppStatus(bunnyVideo.status);
      const updates: Record<string, unknown> = { status };

      if (status === "ready") {
        updates.duration_seconds = bunnyVideo.length ?? null;
        updates.playback_url = buildPlaybackUrl(cdnHost, video.bunny_video_id);
        updates.thumbnail_url = buildThumbnailUrl(cdnHost, video.bunny_video_id, bunnyVideo.thumbnailFileName);
      }

      const { error: updateError } = await supabase.from("videos").update(updates).eq("id", video.id);
      if (!updateError) {
        updated += 1;
      }
    }

    return json(200, { checked: pendingVideos.length, updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return json(500, { error: message });
  }
});
