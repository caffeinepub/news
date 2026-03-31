# NEWS - Stories Section

## Current State
The NEWS app is a full-featured news website with sections for Latest, World, Sports, Cricket/IPL, Business, India. It has SiteHeader, SiteFooter, NewsCard, BreakingTicker components, SectionPage, ArticleDetailPage, legal pages, admin panel. Navigation is defined in SiteHeader NAV_LINKS. PageName type in App.tsx defines all routes.

## Requested Changes (Diff)

### Add
- `stories` page to PageName type in App.tsx
- StoriesPage.tsx: full page with all story genres as subsections
  - Genres: Romantic, Love Story, Romance, Thriller, Mystery, Horror, Fantasy, Adventure, Comedy, Drama, Sci-Fi, Crime, Historical
  - Each genre has its own subsection with 3-4 story cards
  - Each story card links to external story sites (Wattpad, AO3, Quotev, FanFiction.net, Literotica, Royal Road, etc.) so stories are always "fresh" from real platforms
  - Story cards show: title, genre badge, short description/excerpt, source site name, cover image (picsum), "Read Story" button that opens in new tab on the external site
- Genre section headers with 3D CSS animated highlights (rotate, glow, shimmer effect using CSS transforms and keyframes)
- Stories preview section on HomePage (showing top 4 stories across genres with 3D animated section header)
- "Stories" nav link added to SiteHeader NAV_LINKS and mobile menu
- `stories` route added to App.tsx routing logic
- PAGE_TITLES entry for `stories`

### Modify
- App.tsx: add `stories` to PageName, PAGE_TITLES, routing logic
- SiteHeader.tsx: add Stories nav link
- HomePage.tsx: add Stories preview section before the footer

### Remove
- Nothing removed

## Implementation Plan
1. Add `stories` to PageName and routing in App.tsx
2. Add Stories link to SiteHeader NAV_LINKS
3. Create `src/frontend/src/data/storiesData.ts` with curated story entries per genre linking to real external platforms
4. Create `src/frontend/src/pages/StoriesPage.tsx` with:
   - Genre subsections with 3D animated headers (CSS keyframe animations: rotateX shimmer, glow pulse)
   - Story cards grid per genre
   - Back to Home button
   - Full site header/footer
5. Add Stories preview section to HomePage.tsx with 3D animated section header
6. Wire everything together in App.tsx
