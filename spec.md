# NEWS

## Current State
- Stories section exists with 12+ genres, each linking to external sites (Wattpad, AO3, Royal Road)
- Story "Read" button opens external search pages (not direct story pages) — users can't read stories in-app
- "Showing sample news" banner appears when API quota is exhausted and no localStorage cache exists
- No Hindi stories section exists

## Requested Changes (Diff)

### Add
- Hindi stories section in storiesData.ts: genre id `hindi`, name "Hindi Stories", with 4 stories sourced from Pratilipi (pratilipi.com) and Matrubharti (matrubharti.com) — these are popular Hindi story platforms. Use direct story URLs where available.
- In-app story reader modal: when user clicks "Read" on any story card, open a styled modal/dialog showing the full excerpt/summary, story metadata, and a prominent "Read Full Story on [site]" button that opens the external link in a new tab
- Navigation filter tab for "Hindi" in the genre filter pills

### Modify
- `src/frontend/src/data/storiesData.ts`: add Hindi genre with 4 stories from Pratilipi and Matrubharti with direct URLs
- `src/frontend/src/pages/StoriesPage.tsx`: replace the `<a>` Read button with a button that opens the in-app reader modal; add a StoryReaderModal component
- `src/frontend/src/pages/HomePage.tsx`: make the "Showing sample news" banner less alarming — change message to "Showing recent news — refresh for latest updates" and auto-hide after 5 seconds

### Remove
- Nothing removed

## Implementation Plan
1. Add Hindi genre to `storiesData.ts` with 4 stories from Pratilipi/Matrubharti with real direct URLs
2. Build `StoryReaderModal` component in StoriesPage.tsx using shadcn Dialog — shows cover image, title, author, genre badge, full excerpt (2-3 paragraphs), reads count, and a "Read Full Story" button linking to sourceUrl
3. Update StoryCard to open modal instead of direct link
4. Update HomePage.tsx error banner: change text, add auto-dismiss after 5s
5. Validate and deploy
