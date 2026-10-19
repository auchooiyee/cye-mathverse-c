# GraphQuest verification — 2026-10-18

Environment: macOS; Node 22.14.0; installed Google Chrome with bundled Playwright. Test records are synthetic; no student/school data or accounts. All implementation is local.

| Check | Result / evidence |
|---|---|
| Static build, `npm run build` | Passed; 17 public app files, 122,696 bytes across both games; output in `dist/`; no publication |
| Unit/content/build, `npm test` | 30 passed, zero failed: 17 existing + 13 GraphQuest tests |
| Six mission keys | Independent exhaustive legal-walk search matches optimums 9 km, RM4, 10 km, 5 km, RM7 and 15 km. G05 accepts all legal routes within RM9, not just RM7. |
| Route correctness | Closed/reversed/disconnected roads, missing stops, budget boundary, alternative routes, equal optimums and repeated visits checked |
| Progress and receipts | Sequential unlock, 900 XP cap, hints/retries, bounded history, first-completion recovery, invalid saves, leg sums and HTML/CSV escaping checked |
| Accepted-file preservation | Cyber's eight public app/module files, original launcher and master plan match pre-GraphQuest SHA-256 baseline in `preserved-files.json` |
| GraphQuest built-app browser | 12 scenario groups passed; `artifacts/graphquest/browser-report.json`; no captured page errors or external requests on served-game pages |
| Cyber built-app regression | 10 scenario groups passed; `artifacts/browser-report.json`; no captured page errors or external requests |
| Launcher syntax / local serving | `zsh -n 'Play GraphQuest.command'` passed; local GraphQuest HTTP preview returned 200 |
| Visual review | Desktop, 360 px mobile and one-way screenshots inspected. Road labels moved onto roads, directional arrows separated; map targets remain ≥44 px. |

## GraphQuest browser scenarios

1. Built game serves over loopback; private documents are denied.
2. Invalid connections, real van movement, animation input lock, pause/skip and nonoptimal feedback.
3. Route/hint recovery, reduced motion and full rewards after retry.
4. All six missions, closure/one-way rejection, exact RM9 budget and reverse optimal tour.
5. Actual HTML/CSV/JSON downloads with route legs, stable recovered receipt and replay without duplicate XP.
6. 360 px touch planning, undo, 44 px map targets and landscape without overflow.
7. Keyboard route planning and dispatch.
8. Compatible backup restore; invalid import preserves saved progress.
9. Unreadable original save stays protected and downloadable.
10. Storage-disabled play remains functional.
11. Direct HTML opening shows launcher guidance; mobile one-way map layout.
12. Refresh during animation retains exactly one recorded delivery.

The direct-file guidance check intentionally does not count expected blocked ES-module console errors as a served-game failure. The game itself must run through the launcher/local HTTP server.

## Reproduce

From the workspace root, build before browser tests:

```sh
npm run build
npm test
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:graphquest:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:browser
```

The tests start and close their own loopback server. Existing Node/Chrome/Playwright were used; no packages or paid services were installed. One earlier browser approval attempt was interrupted by the approval service's usage limit; after the user's Continue, the retry and complete suite succeeded.

## Remaining checks

User GraphQuest playtest, teacher content/current-curriculum sign-off and real student enjoyment/learning evidence remain pending. Physical Android/iPad, Safari, actual screen-reader operation, formal accessibility audit and low-end-device frame rate are untested. The Finder double-click gesture itself was not automated. Mobile browser emulation does not establish real-device performance. No public hosting, multiplayer or cloud integration is claimed.

Cyber's original first-release evidence remains in `docs/TEST_RESULTS.md`; its user acceptance remains recorded in `IMPLEMENTATION_STATUS.md`.
