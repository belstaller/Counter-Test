# decision

A choice made and the reasoning behind it — the path taken over the alternatives.

## The new /landing page (src/app/landing/page.tsx) was built as a plain server component wi…

What: The new /landing page (src/app/landing/page.tsx) was built as a plain server component with no local state and no API calls, only embedding the client ThemeToggle component for dark-mode support. · Why: the work-order required the page to be fully static aside from the theme toggle, so a server component avoids unnecessary client-side JS. · Where: src/app/landing/page.tsx. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-4 -->

## For this project's Chiron work orders, verification steps (npm install, type-check, lint,…

What: For this project's Chiron work orders, verification steps (npm install, type-check, lint, tests) are skipped unless the user explicitly asks for them — delivering the requested code change is treated as the completion criterion. · Why: user explicitly rejected running npm install and said 'I dont care about the test, are the changes done?' when asked to verify. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-7 -->
