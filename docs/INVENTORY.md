# Existing-project inventory — 2026-10-18

Inspection used the app's saved-project list, local filenames, package scripts, READMEs and representative source files. This is a code inventory, not a fresh acceptance test of every older game.

| Project / absolute location | Evidence already present | Limits / reuse decision |
|---|---|---|
| `/Users/chooiyee/Documents/CYE-MathVerse  GPT` | Only the supplied 61,568-byte master plan before this iteration; no repository or app | New isolated local game belongs here. Master plan remains unchanged. |
| `/Users/chooiyee/Documents/CYE-MathVerse_Games/Candy_Kart_Math_Rush` | V1.2 README; `components/RaceScene.tsx`, `lib/race.mjs`, `lib/questions.mjs`, API routes, D1 schema, motion/API tests, local launcher | Actual 3D and room code exists. README says real 30–40 client/device tests remain pending. Preserve all code and local data. |
| `/Users/chooiyee/Documents/CYE-MathVerse_Games/Candy_Kart_Math_Rush_V1` | Separate earlier V1 source, README, schema and build configuration | Keep as existing earlier version; do not merge/delete it. |
| `/Users/chooiyee/Documents/CYE Math Runner/cye-math-runner` | Phaser 3.90/Vite app, runner/boss/gate systems, question system, mobile UI, report scenes, validation scripts, leaderboard backend | Form 5 runner is already implemented; not merely a plan. Preserve assets, questions and scoring. Deployment not reverified. |
| `/Users/chooiyee/Documents/Maths Game` | Number Academy; chapter data, 18-chapter story, interactive tasks, reasoning workshop, validation scripts, curriculum audit, cloud worker/schema | README reports 232 MCQs and 22 interactive tasks; independent teacher review pending. Useful future topic-content candidate, not automatically validated material. No copy of student records. |
| `/Users/chooiyee/Documents/Sunshine Quest` | v0.10 source, world/adventure configs, engine, local server, curriculum/review records, browser/unit tests, original art | Five Form 4 routes: quadratic, inequalities, motion, probability and finance; integrated supply finale. Reuse learning/report ideas without coupling new game to combat engine. |

No standalone Cyber Code Breaker, GraphQuest or Variation Factory project was found in the inspected local project paths or matching Documents filenames. This does not establish absence in uninspected cloud storage. No unrelated files, school data or credentials were read.

The master plan's Financial Survival Tycoon URL was requested read-only; the web retrieval returned an internal fetch error. Its live status and local source remain unverified. Do not replace it.

## Scope decision
Build the first Phase 1 slice in `apps/games/cyber-code-breaker/`, with tiny shared modules in `packages/`. Do not create a large unfinished portal. Native HTML/SVG controls suit an accessible place-value escape game; no framework, package installation, heavy 3D pipeline, remote fonts, analytics or paid API is needed. Public static build is an output folder only; it is not deployment.

## Curriculum coverage inventory
`coverage.csv` records all 36 planning IDs. Existing topic coverage is not equivalent to complete verified SK/SP or assessment coverage. Additional Mathematics elective packages remain flagged. Cyber is the only new implemented game in this first iteration; other Phase 1 games remain next milestones.

## Second iteration: GraphQuest — 2026-10-18

The inventory above records the workspace before initial implementation. Cyber is now implemented and user-accepted. GraphQuest is now implemented in `apps/games/graphquest/`, with six delivery missions and a separate launcher/save origin. Variation Factory remains planned.

Before GraphQuest implementation, inspected Number Academy's `data.en.js`, `data.en.expanded.js`, `workshop.en.js` and `curriculum-standards.json`. Reused the exam-f4-5 five-edge topology for G01; independently verified its optimum. No source in that project or any sibling project was edited. The accepted Cyber files, launcher and master plan are protected by the hash baseline in `docs/graphquest/preserved-files.json`, checked by the test suite. Shared local serving/build registration was extended to serve both games.

## Third iteration: Variation Factory — 2026-10-18

GraphQuest is now user-accepted. Read existing Number Academy f5-1 direct/inverse examples and combined-variation-plan/exam-f5-1 workshop content, plus Math Runner variation question examples. Adapted two Number Academy calibrations with independent checks; used a clear equal-sharing context for combined variation. Sibling projects remain untouched. Variation Factory now exists in `apps/games/variation-factory/`, with six stations and twelve orders; prior “planned” statements above are historical inventory snapshots.

Preserved all 17 accepted game/module public files, both old launchers and master plan against `docs/variation-factory/preserved-files.json`. Shared static serving/build registration now includes all three games. The complete combined app remains about 180 KB, with no runtime dependencies or external artwork.

## Variation Factory enhancement — 2026-10-19

User tested the first factory release and requested richer graphics and play. Inspected and backed up the existing game before upgrading its UI. Original order/math/state/report modules and launcher remain unchanged; old saves import correctly. Added local original artwork, six distinct visual mechanisms, cosmetic themes, sound and optional discoveries. See `variation-factory/visual-upgrade/` for exact change/test evidence. No sibling project or other accepted game was edited.

## Unified lobby — 2026-10-19

User accepted the Wonderworks upgrade and requested a single game entrance. Added `apps/lobby/`, shared return navigation and `Play CYE-MathVerse.command`. Reused the existing factory panorama; created original CSS/SVG spaceport, robot and delivery illustrations. No new game/content pack or sibling-project edits. Preserved all existing games/modules/launchers against `docs/lobby/preserved-files.json`; the only permitted game-file change is one exact navigation include in each HTML head. Originals are retained in `backups/pre-lobby/`. Existing historical preservation tests now remove only that exact include before comparing their original hashes.
