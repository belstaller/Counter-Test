# architecture

How the system is put together — layers, boundaries, and how data flows.

## Dark/light theming is implemented via a ThemeProvider/useTheme context (src/context/Theme…

What: Dark/light theming is implemented via a ThemeProvider/useTheme context (src/context/ThemeContext.tsx, STORAGE_KEY) wrapping the whole app in src/app/layout.tsx, with CSS custom properties in globals.css switching per theme. · Why: lets any new page opt into consistent theme support just by rendering the ThemeToggle client component, without re-deriving state. · Where: src/context/ThemeContext.tsx, src/app/layout.tsx, src/components/ThemeToggle.tsx, src/app/globals.css. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-0 -->

## Navigation between the counter page and the landing page is bidirectional — Home (src/app…

What: Navigation between the counter page and the landing page is bidirectional — Home (src/app/page.tsx) has a nav Link to /landing, and the landing page's hero CTA links back to /. · Why: — · Where: src/app/page.tsx, src/app/landing/page.tsx. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-5 -->
