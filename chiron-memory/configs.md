# config

Setup and configuration — env vars, flags, how to run the project.

## Fresh checkouts/work-order sandboxes for this project do not have node_modules installed,…

What: Fresh checkouts/work-order sandboxes for this project do not have node_modules installed, so `npm run type-check` (tsc), `npm run lint` (next lint), and `npm test` (jest) all fail with 'command not found' until `npm install` is run first. · Why: — · Learned: run npm install before attempting any verification step in a new sandbox for this project. <!-- id: bf91e327-b029-4d8f-8480-5cb8d45f67ea-6 -->
