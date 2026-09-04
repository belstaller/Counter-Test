# convention

A rule the codebase follows — naming, patterns, and where things live.

## All colors, backgrounds, text, and card shadows are defined as CSS custom properties in g…

What: All colors, backgrounds, text, and card shadows are defined as CSS custom properties in globals.css (--color-bg-page, --color-bg-card, --color-text, --color-text-muted, --color-accent, --color-card-shadow) rather than hardcoded per component. · Why: keeps light/dark theming consistent across pages — any new UI should reference these vars instead of hardcoding hex values. · Where: src/app/globals.css. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-1 -->

## The signature pink/rose gradient (linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)) is r…

What: The signature pink/rose gradient (linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)) is reused both as the page background (--color-bg-page in globals.css) and as the Counter display background (Counter.module.css .display). · Why: — · Where: src/app/globals.css, src/components/Counter.module.css. · Learned: new visual sections (e.g. landing page hero/CTA) should match this same gradient/shadow motif to stay visually consistent with the existing design system. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-2 -->

## Each route under src/app/ gets its own colocated CSS module (page.module.css, landing.mod…

What: Each route under src/app/ gets its own colocated CSS module (page.module.css, landing.module.css, …) instead of sharing one global stylesheet, and new modules reuse the card look (background, border-radius, box-shadow) defined in the existing page.module.css. · Why: — · Where: src/app/page.module.css, src/app/landing/landing.module.css. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-3 -->

## Tests live in colocated `__tests__` directories next to the code they test (src/app/__tes…

What: Tests live in colocated `__tests__` directories next to the code they test (src/app/__tests__/page.test.tsx, src/components/__tests__/Counter.test.tsx), not in a top-level tests folder. · Why: — · Where: src/app/__tests__/, src/components/__tests__/. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-8 -->
