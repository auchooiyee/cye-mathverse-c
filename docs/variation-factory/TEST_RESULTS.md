# Variation Factory verification — 2026-10-18

macOS, Node 22.14.0, installed Google Chrome via existing bundled Playwright. Synthetic nickname/class only; no school account or student data. Local-only delivery.

| Check | Result / evidence |
|---|---|
| Build: `npm run build` | Passed: 26 public app files across three games; 179,915 bytes. Output `dist/`; no publication. |
| Unit/content/build: `npm test` | 43 passed / 0 failed: 30 existing plus 13 Variation tests. Transcript: `artifacts/variation-factory/unit-tests.tap`. |
| Authored mathematics | All 12 calibration constants and targets verified; all 228 offered configurations compared with independent cross-product conditions. |
| Scaling laws | 500 combinations × six exact direct/inverse/joint/square/root/combined identities; no rounded grading. Original 36,864 base representation checks still pass. |
| Progress and imports | Sequential unlock; 1,200 XP cap; hint/retry evidence; 100-event cap with preserved first completion; invalid/forged-save rejection. |
| Report safety | Exact workings, first completion, HTML escaping and CSV formula protection checked. |
| Preservation | All 17 accepted public files/modules, both old launchers and master plan match the SHA-256 baseline. |
| Variation built-app browser | 12 scenario groups passed; zero captured page errors or external requests on served pages. See `artifacts/variation-factory/browser-report.json`. |
| Accepted-game browser regression | GraphQuest 12 groups and Cyber 10 groups passed after shared-server/build extension; zero captured errors/external requests. |
| Local launch | Launcher syntax passed; loopback HTTP preview returned 200. The Finder double-click gesture itself was not automated. |
| Visual review | Desktop, square-root station and 360 px screenshots inspected; graph ticks enlarged on mobile and axis labels separated from final ticks. |

## Variation browser scenarios

1. Built game serves locally; private workspace paths denied.
2. Invalid numeric input and wrong calibration rejected; live output/table agreement; saved draft/hint recovery.
3. Conveyor motion, pause/skip, disabled controls during packing and full retry rewards.
4. All 12 orders; inverse curve and zero-domain note; root input domain; held-z labels; alternate joint/combined solutions.
5. Actual HTML/CSV/JSON downloads and exact workings; stable receipt recovery; replay without duplicate XP.
6. 360 px touch controls, ≥44 px input targets, portrait/landscape without overflow, system reduced motion.
7. Keyboard production and equivalent fractional constant.
8. Invalid import preserves state; valid import and progress backup download work.
9. Corrupted save is protected and downloadable.
10. Storage-disabled play works with a warning.
11. Refresh during packing preserves one recorded attempt/completion.
12. Direct HTML opening explains the local launcher.

The direct-file page intentionally omits expected blocked-ES-module console errors from the served-game error count. Full play uses local HTTP.

## Issues found and resolved

The first new unit run had an incorrect expected configuration count in the test (242 versus the actual 228); all individual feasibility comparisons already passed. Corrected the count and reran successfully. A browser keyboard test initially assumed platform-specific native-select arrow behaviour; replaced it with the game's supported keyboard + button flow and asserted the resulting input before submission. Mobile screenshots showed small graph tick labels and an offscreen skip link appearing in full-page capture; corrected both and reran. No outstanding failing automated checks.

## Reproduce

```sh
npm run build
npm test
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:graphquest:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:browser
zsh -n 'Play Variation Factory.command'
```

Browser tests own and close their ephemeral loopback servers. No new packages or services were installed. The shared build budget was raised from 150 KB to 240 KB to allow the third game; the actual combined public files are about 180 KB.

## Not verified

Variation user acceptance, formal teacher/current-curriculum review, student enjoyment/learning outcomes, physical Android/iPad, Safari, actual screen-reader operation and low-end-device performance remain pending. A local browser report is not a secure online submission. No public hosting, cloud backend, multiplayer or school integration was added. All three planned Phase 1 local slices exist; classroom-readiness/secure-submission work remains separate.
