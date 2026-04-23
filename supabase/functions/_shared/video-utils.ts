export type AppVideoStatus = "processing" | "ready" | "failed";

export const bunnyStatusToAppStatus = (status: number): AppVideoStatus => {
  if (status >= 0 && status <= 3) {
    return "processing";
  }

  if (status === 4) {
    return "ready";
  }

  return "failed";
};

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "video";

export const buildPlaybackUrl = (cdnHost: string | undefined, bunnyVideoId: string): string | null => {
  if (!cdnHost) {
    return null;
  }

  return `https://${cdnHost}/${bunnyVideoId}/playlist.m3u8`;
};

export const buildThumbnailUrl = (
  cdnHost: string | undefined,
  bunnyVideoId: string,
  thumbnailFileName: string | null | undefined,
): string | null => {
  if (!cdnHost) {
    return null;
  }

  if (thumbnailFileName) {
    return `https://${cdnHost}/${bunnyVideoId}/${thumbnailFileName}`;
  }

  return `https://${cdnHost}/${bunnyVideoId}/thumbnail.jpg`;
};
