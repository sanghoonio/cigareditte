---
date: 2026-02-15
status: complete
description: Improve Cigareditte UX, HN API integration, and visual metaphor
---

# Cigareditte Improvements

## Context

Cigareditte is a ~630-line React app that reframes HN browsing as smoking cigarettes (5-min timer per cigarette, pixel art sprites). The user wants three improvements: (1) better ease of use and more complete HN API integration, (2) native comment rendering instead of iframes for HN discussions, and (3) subtle atmospheric visual effects that make the page reflect the smoking state. Smoke animation will use image-model-generated assets (not CSS particles).

## Phase 1: Foundation Refactoring

No visual changes — clean up the code to unblock everything else.

### 1A. Shared types (`src/types.ts` — new)

Define `StoryType`, `HNItem`, `HNUser`, `AlgoliaHit`, `AlgoliaSearchResult` interfaces. Currently everything is `any`.

### 1B. Generalize queries (`src/queries/main.ts` — modify)

Replace three identical fetch functions + hooks with one parameterized pair:

```ts
const STORY_ENDPOINTS: Record<StoryType, string> = {
  top: 'topstories', new: 'newstories', best: 'beststories',
  ask: 'askstories', show: 'showstories', job: 'jobstories',
};

export const useStoryIds = (type: StoryType) => {
  const { totalSmoked } = useCigarette();
  return useQuery({
    queryKey: ['storyIds', type, totalSmoked],
    queryFn: () => getStoryIds(type),
  });
};
```

Add new hooks: `useUser(username)`, `useSearch(query, page)` (Algolia), `useCommentTree(kidIds)`.

Keep `useItem` and `useItems` as-is (they already work generically).

### 1C. Consolidate story pages (`src/components/StoryList.tsx` — new)

Replace Top.tsx, New.tsx, Best.tsx (three nearly identical ~60-line files) with one parameterized `StoryList` component that takes `type: StoryType`.

Extract per-item rendering into `StoryItem.tsx` — adds domain display (e.g. "(github.com)") next to titles.

### 1D. Utils cleanup (`src/utils.ts` — modify)

- Add `extractDomain(url)` for showing domains next to story links.
- Remove unused `createSmoke()` (imperative DOM manipulation, doesn't fit React).

### 1E. Routing + navigation updates (`src/main.tsx`, `src/components/Navbar.tsx` — modify)

- Update routes to use `<StoryList type="..." />` instead of separate components.
- Add routes: `/ask`, `/show`, `/jobs`, `/search`.
- Add nav links for Ask HN, Show HN, Jobs, Search in both sidebar and mobile menu.
- Extract duplicated 10-line cigarette sprite ternary chain into `getCigaretteSprite(burnProgress)` helper.

### 1F. Delete old files

Remove `Top.tsx`, `New.tsx`, `Best.tsx`.

**Files:** `types.ts` (new), `queries/main.ts`, `utils.ts`, `main.tsx`, `Navbar.tsx`, `StoryList.tsx` (new), `StoryItem.tsx` (new). Delete: `Top.tsx`, `New.tsx`, `Best.tsx`.

---

## Phase 2: Native Comments, User Profiles, Search

Depends on Phase 1 (uses generalized query hooks + StoryItem component).

### 2A. Recursive comment tree (`CommentTree.tsx`, `CommentItem.tsx` — new)

Lazy-loading approach: fetch top-level comments (story's `kids` array) immediately, fetch nested replies when parent renders. Auto-expand 3 levels deep, then show "[N replies]" link to expand further. Each `CommentItem` renders: username, relative time, collapse toggle, HTML text, and child `CommentTree`.

Comment items share the `['item', id]` cache key with story items (same API endpoint) — no duplicate caching logic.

### 2B. Modify SelectedItemView (`SelectedItemView.tsx` — modify)

Current: always renders an iframe. New dual-mode approach:

- **Article tab** (when story has external URL): iframe to external site.
- **Comments tab**: native comment tree via `CommentTree`. Default when story has no URL (self-posts, Ask HN).
- Toggle buttons in the toolbar. Fetch item data with `useItem` to get `kids` array.

### 2C. User profile card (`UserProfile.tsx` — new)

Lightweight positioned card shown on username click (not a full page). Shows karma, join date, bio snippet, link to HN profile. Triggered from `StoryItem` and `CommentItem`.

### 2D. Search page (`SearchView.tsx` — new)

Uses Algolia HN Search API (`hn.algolia.com/api/v1/search`). Search input, paginated results in the same format as story lists. Clicking a result opens it in `SelectedItemView`.

**Files:** `CommentTree.tsx` (new), `CommentItem.tsx` (new), `UserProfile.tsx` (new), `SearchView.tsx` (new), `SelectedItemView.tsx`, `style.css` (comment + user profile CSS).

---

## Phase 3: Atmospheric Visual Effects

Independent of Phase 2. Only needs Phase 1 (Zustand store access).

### 3A. Atmospheric overlay (`AtmosphericOverlay.tsx` — new)

Two `position: fixed; pointer-events: none` overlay divs driven by `burnProgress`:

- **Warm tint**: `rgba(180, 140, 80, progress * 0.06)` — amber overlay at extremely low opacity, building over 5 minutes. Barely perceptible at max.
- **Vignette**: `box-shadow: inset 0 0 Npx rgba(160, 140, 110, progress * 0.12)` — soft warm haze closing in from edges. Blur radius grows with progress.

Both use `transition: all 2s ease` to smooth over the 1-second timer ticks. Renders `null` when `!isSmoking`, so effects disappear when cigarette ends and reset from zero on next light.

### 3B. Ember glow on cigarette sprite (`Navbar.tsx`, `style.css` — modify)

```css
@keyframes ember-pulse {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 120, 30, 0.4)); }
  50% { filter: drop-shadow(0 0 8px rgba(255, 120, 30, 0.7)); }
}
.ember-glow { animation: ember-pulse 2.5s ease-in-out infinite; }
```

Uses `filter: drop-shadow` (not `box-shadow`) because sprites have transparent backgrounds — `drop-shadow` follows the alpha contour.

### 3C. Mount overlay in `main.tsx`

Add `<AtmosphericOverlay />` as last child inside the smoking view container.

**Files:** `AtmosphericOverlay.tsx` (new), `Navbar.tsx`, `main.tsx`, `style.css`.

---

## Phase 4: Smoke Animation Infrastructure

Builds the system for plugging in image-model-generated smoke assets. Independent of Phases 2 and 3.

### 4A. Smoke layer component (`SmokeLayer.tsx` — new)

Supports two asset formats via a config object:

- **Animated image** (APNG/WebP/GIF): just an `<img>` tag. Simplest path — drop a looping smoke animation with transparent background into `public/`.
- **Sprite sheet**: CSS `background-position` animation with `steps()`. Configurable frame count, dimensions, FPS.
- **Frame sequence**: `requestAnimationFrame` loop swapping `src` on an `<img>`.

Positioned relative to the cigarette sprite via a wrapper div. `pointer-events: none` so it never blocks interaction. Renders `null` when `!isSmoking`.

### 4B. CSS for smoke positioning (`style.css` — modify)

Position `.smoke-layer` above the cigarette sprite using `position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%)`. Different positioning for mobile topbar vs desktop sidebar.

### 4C. Mount in Navbar (`Navbar.tsx` — modify)

Wrap each cigarette `<img>` in a `position: relative` container and render `<SmokeLayer />` above it. Applied in both sidebar and topbar sections.

### Asset workflow (not code — user does this separately)

1. Generate looping smoke animation with transparent background using image model.
2. Export as animated WebP or APNG (~128x256px).
3. Drop into `public/smoke.webp`.
4. Update `SMOKE_CONFIG.src` in `SmokeLayer.tsx`.
5. Adjust `.smoke-layer` dimensions in CSS.

**Files:** `SmokeLayer.tsx` (new), `Navbar.tsx`, `style.css`.

---

## Implementation Order

```
Phase 1 (Foundation) ─┬─> Phase 2 (Comments, Search, Profiles)
                      ├─> Phase 3 (Atmospheric Effects)
                      └─> Phase 4 (Smoke Infrastructure)
```

Phases 2, 3, 4 are independent of each other. Recommended order: 1 → 3 → 4 → 2 (3 and 4 are small, high-impact; 2 is the largest).

## Verification

- **Phase 1**: `npm run build` succeeds. All 6 story categories load. Domain names show next to external links. Navigation works on desktop and mobile.
- **Phase 2**: Click a story → Comments tab shows native threaded comments. Click username → profile card appears. Search page returns results and opens stories.
- **Phase 3**: Light a cigarette. Over 5 minutes, page gets subtly warmer and edges slightly haze. Cigarette sprite has a soft orange pulsing glow. All effects disappear when cigarette ends.
- **Phase 4**: Drop a test animated image into `public/smoke.webp` — it appears above the cigarette, looping, on both desktop and mobile. Does not block clicks.

## File Summary

| Action | File |
|--------|------|
| Create | `types.ts`, `StoryList.tsx`, `StoryItem.tsx`, `CommentTree.tsx`, `CommentItem.tsx`, `UserProfile.tsx`, `SearchView.tsx`, `AtmosphericOverlay.tsx`, `SmokeLayer.tsx` |
| Modify | `queries/main.ts`, `utils.ts`, `main.tsx`, `Navbar.tsx`, `SelectedItemView.tsx`, `style.css` |
| Delete | `Top.tsx`, `New.tsx`, `Best.tsx` |
