## Task 1 — Legal Pages

Create 4 legal pages, all using `Header` + `Footer` and a shared layout look matching the uploaded screenshots (dark bg, purple left-bar accent on title, white-glow heading, body in muted text).

**New shared component:** `src/components/legal/LegalLayout.tsx`
- Props: `title`, `children`
- Renders: page title with purple `border-l-4 border-primary pl-4` accent + section heading style + `prose`-like spacing for paragraphs.

**New pages:**
1. `src/pages/PrivacyPolicyPage.tsx` → `/privacy-policy`  
   Standard adult-site privacy policy: data we collect (cookies, IP, analytics), how we use it, third parties (Bunny CDN, Supabase), cookies, user rights (GDPR/CCPA), contact.
2. `src/pages/DmcaPage.tsx` → `/dmca`  
   Content modeled on the second uploaded screenshot: Legal Disclaimer, How to File a DMCA Notice (required elements), Counter-Notification Procedures, Repeat Infringer Policy, contact email.
3. `src/pages/TermsOfServicePage.tsx` → `/terms-of-service`  
   Sections: Eligibility (must be 18+), Account responsibility, Acceptable Use (no illegal content, no copyright violations, no scraping/automated abuse, no harassment), Content ownership & license, Termination, Disclaimers, Governing Law.
4. `src/pages/Compliance2257Page.tsx` → `/2257`  
   Content modeled on the first uploaded screenshot — 18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement.

**Routing — `src/App.tsx`:** add 4 routes above the `*` catch-all.

**Footer — `src/components/Footer.tsx`:** wire `secondaryLinks` to real `<Link>`s:
- Privacy Policy → `/privacy-policy`
- DMCA → `/dmca`
- Legal → `/terms-of-service`
- Add a "18 U.S.C. 2257" link → `/2257`
- Replace anchor tags with react-router `Link` so navigation is SPA.

---

## Task 2 — Home Categories Filter + Skeleton

Edit `src/components/FeaturedVideos.tsx`:

**State**
- Add `selectedCategory: string` (default `"all"`, stores slug; `"all"` means no filter).
- Add `expanded: boolean` (default `false`) — controls collapsed (first row only) vs full list.

**Categories source**
- Replace the hardcoded `CATEGORY_CHIPS` array with a live `useQuery(['categories'], listCategories)` call (`src/lib/categories.ts` already exists). Keep "All" as a synthetic first chip (UI-only, not in DB).
- Show a skeleton row (8 chip-shaped Skeletons) while categories are loading.

**Chip behavior**
- Clicking a chip sets `selectedCategory` and resets `page` to 1.
- Active chip: `bg-gradient-purple text-white btn-glow`; inactive uses existing `chip` class.
- Collapsed mode: render only the first ~8 chips (plus "All"); show `"Show All Categories"` toggle.
- Expanded mode: render all chips; toggle now reads `"Hide Categories"`.

**Data fetching**
- When `selectedCategory === "all"`: keep existing `fetchVideos(page, limit, sort)` call against `list-videos` edge function.
- When a specific category is selected: call `getVideosByCategory(slug, sort)` from `src/lib/videos.ts` (already implemented). Map its `VideoRecord[]` into the same shape `VideoCard` consumes. For the category branch, paginate client-side (slice by `page`/`limit`) and compute `totalCount`/`totalPages` locally so the existing pagination UI still works.
- Use a single `useQuery` whose `queryKey` includes `selectedCategory` so cache is keyed correctly.

**Skeleton UI for videos**
- Replace `"Loading videos…"` text with a grid of `VideoCardSkeleton` items (count = `limit`, capped at e.g. 12 for first paint).
- New component `src/components/VideoCardSkeleton.tsx`:
  - `aspect-video Skeleton` for thumbnail
  - `h-4 w-3/4` Skeleton for title (centered)
  - Two small Skeletons in a row for views/rating
- Show skeletons when `isLoading` is true (initial fetch, no cached data). On `isFetching` with prior data, keep the existing 50% opacity behavior.

---

## Files

**Create**
- `src/components/legal/LegalLayout.tsx`
- `src/pages/PrivacyPolicyPage.tsx`
- `src/pages/DmcaPage.tsx`
- `src/pages/TermsOfServicePage.tsx`
- `src/pages/Compliance2257Page.tsx`
- `src/components/VideoCardSkeleton.tsx`

**Edit**
- `src/App.tsx` — register 4 legal routes
- `src/components/Footer.tsx` — real links via `react-router-dom` `Link`, add 2257 link
- `src/components/FeaturedVideos.tsx` — live categories, All/category filter, expand/collapse chips, skeleton loading state
