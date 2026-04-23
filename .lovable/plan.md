

## Plan

### Task 1 — Full page reload on video card clicks
- Edit `src/components/VideoCard.tsx`: replace the React Router `<Link to={...}>` with a plain `<a href={...}>`. This causes a real browser navigation, so the new page starts at the top automatically (no scroll-restoration logic needed).
- No changes to routes — React Router still handles the `/video/:slug` route after the reload.

### Task 2 — Remove video placeholder image everywhere and delete the file
- Delete `src/assets/video-placeholder.jpg`.
- Edit `src/components/video/VideoPlayer.tsx`:
  - Remove `import poster from "@/assets/video-placeholder.jpg"`.
  - Remove the `activePoster` fallback. Use only `posterUrl` (real Bunny thumbnail). If absent, render no poster image and show a plain black background behind the play button.
- Edit `src/components/VideoCard.tsx`:
  - Remove `import poster from "@/assets/video-placeholder.jpg"`.
  - For the thumbnail `<img>`, use `thumbnailUrl` only. If missing, render a black `aspect-video` box (no broken image, no placeholder asset).

### Task 3 — Smaller, mobile-friendly center play button on the video player
- Edit `src/components/video/VideoPlayer.tsx`: change the center play button from `h-20 w-20` with `h-9 w-9` icon to a responsive size:
  - Button: `h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20`
  - Icon: `h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9`
- Keeps the purple gradient + glow styling; only the dimensions change.

### Files touched
- delete `src/assets/video-placeholder.jpg`
- edit `src/components/VideoCard.tsx`
- edit `src/components/video/VideoPlayer.tsx`

