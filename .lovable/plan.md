

## Video Player Page + Supabase Connection

### Task 1 — Video Player Page (`/video/:id`)

Create a new route `/video/:slug` that mirrors the brand styling (black bg, purple `#AC58E9`, Roboto Condensed, glow). Page sections, top to bottom:

1. **Header** — reuse existing `Header` component.
2. **Title row**
   - Big bold uppercase title (e.g. "BACKSHOTS FOR THICKY") with text glow.
   - Meta row: 👁 views • ★ rating • "1 year ago".
3. **Video Player** (`VideoPlayer.tsx`)
   - Native HTML5 `<video>` (placeholder mp4) inside `aspect-video` black container, centered.
   - Custom overlay controls: play/pause, time `00:00 / 01:49`, volume + slider, settings cog, fullscreen toggle.
   - Purple progress bar with purple scrubber thumb; purple volume fill. Hooks into `videoRef` for play state, time, volume, fullscreen.
4. **Action bar** (`VideoActions.tsx`)
   - Outline pill buttons with purple border + glow: **DOWNLOAD** (with download icon), **SHARE**, **ADD TO ▾**.
   - Right side: ★ rating count, like / dislike circular icon buttons (purple), "0 votes / Your rating" labels.
5. **Categories & Tags** (`VideoMeta.tsx`)
   - "CATEGORIES" heading + chip row (Big Ass, Strippers, Black Baddies).
   - "TAGS" heading + chip row (Thot Baddies). Reuses `.chip` style.
6. **Comments** (`VideoComments.tsx`)
   - Divider line, "COMMENTS (0)" heading.
   - Comment textarea, Name input, fake captcha image + security code input, gradient-purple **ADD COMMENT** glow button.
   - Local state only (no submission yet).
7. **Similar Videos** (`SimilarVideos.tsx`)
   - "SIMILAR VIDEOS" centered heading.
   - 3-column responsive grid of `VideoCard`s (reuses existing component), ~9 items.
8. **Promoted Models** — reuse existing `PromotedModels`.
9. **Footer** — reuse existing `Footer`.

**Routing**: Add `<Route path="/video/:slug" element={<VideoPage />} />` in `App.tsx`. Update `VideoCard` to wrap in a `Link` to `/video/{slug}` so the homepage grid navigates here.

**Responsive**: video full-width on mobile; action bar wraps (buttons stack on top, ratings below); category/tag chips wrap; similar grid `1 → 2 → 3` columns at sm/lg.

### Task 2 — Connect Supabase

Enable **Lovable Cloud** (managed Supabase) — no auth setup yet, just initialize the client so the project is wired and ready for tables/queries later. The user-provided URL `ptfkuvchxdttqbvdmmpm.supabase.co` is noted but Lovable Cloud will provision its own project. If the user specifically wants to connect that *external* Supabase project, they should use the Supabase Integration instead — I'll confirm during implementation if needed.

### Files to add / edit

- add `src/pages/VideoPage.tsx`
- add `src/components/video/VideoPlayer.tsx`
- add `src/components/video/VideoActions.tsx`
- add `src/components/video/VideoMeta.tsx`
- add `src/components/video/VideoComments.tsx`
- add `src/components/video/SimilarVideos.tsx`
- add `src/assets/video-sample.mp4` placeholder (or use existing poster + silent video)
- edit `src/App.tsx` (new route)
- edit `src/components/VideoCard.tsx` (wrap with `Link`)
- enable Lovable Cloud (auto-creates `src/integrations/supabase/client.ts`)

