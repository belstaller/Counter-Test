# gotcha

A non-obvious pitfall or trap, learned the hard way.

## The new landing page (src/app/landing/page.tsx) was shipped with no corresponding test fi…

What: The new landing page (src/app/landing/page.tsx) was shipped with no corresponding test file, breaking the codebase's established pattern of colocating a __tests__ folder with every page/component. Why it matters: future work touching src/app/landing/ should add src/app/landing/__tests__/page.test.tsx to match the convention used elsewhere (e.g. src/app/__tests__/page.test.tsx). · Why: — <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-9 -->
