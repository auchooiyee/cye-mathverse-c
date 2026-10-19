# Wonderworks verification — 2026-10-19

Local macOS build, Node 22.14.0 and installed Chrome via existing Playwright. Synthetic saves only. No publication, school system or student-data collection.

| Check | Result |
|---|---|
| Static build | 30 public files; 1,011,330 bytes total: 213,069 bytes of app code/assets plus one 798,261-byte JPEG. Original full PNG and backups are not served. |
| Unit/content/build | **48 passed, zero failed**; transcript `artifacts/variation-factory-v2/unit-tests.tap`. |
| New discovery mathematics | All 86 offered configurations independently compared with six scaling conditions; exactly one valid configuration per discovery. |
| Original mathematics | All 12 factory order keys and 228 configurations, 500 scaling cases, graph-route checks and 36,864 base cases still pass. |
| Core preservation | Factory order pack, state, math, report module and launcher match pre-upgrade hashes. Cyber/GraphQuest accepted files and master plan match their existing baselines. |
| Original Variation browser suite | 12 scenario groups passed: full completion, keyboard/touch, animation pause/skip, saves, invalid/corrupt import protection and actual report downloads. |
| Wonderworks browser suite | **9 new scenario groups passed**, zero page errors and external requests; `artifacts/variation-factory-v2/browser-report.json`. |
| Other-game regressions | GraphQuest 12 groups; Cyber 10 groups; both passed after shared JPEG-serving support was added. |
| Visual review | Desktop panorama, six workshop captures, mobile layout, mobile discovery dialog and celebration screenshots inspected. |
| Preview | Local HTTP returned 200. Launcher remains unchanged. |

## Nine new browser groups

1. A legacy completed save retains its ID, 1,200 XP and original progress; new artwork loads locally with correct MIME; six discoveries unlock.
2. All six distinct SVG mechanisms render using saved inputs.
3. Aurora, Golden hour and Starlight alter actual scene colours and persist after refresh; theme button accessibility state is scoped correctly.
4. Opt-in sound creates oscillator notes; mute prevents more notes.
5. All six discoveries complete, survive refresh and cannot award duplicate stars; original XP remains 1,200.
6. Existing progress backup/import carries optional themes and discovery metadata with the unchanged save version.
7. Reduced motion disables production travel, confetti and decorative blinking.
8. 360 px touch layout, discovery dialog and ≥44 px controls fit without horizontal overflow; landscape also fits.
9. Production gears pause together, celebration confetti is finite, reward feedback appears and locked discoveries stay locked.

The original browser harnesses retain their initial pack date in their JSON output; they were rerun during this 2026-10-19 upgrade. The new upgrade report uses the current execution date. Earlier new-test attempts hit an overly broad gear selector that included multiple/hidden preview elements; the check was scoped to the visible workshop and passed. No remaining failed checks.

## Run

```sh
npm run build
npm test
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:experience
```

Regressions: `npm run test:graphquest:browser` and `npm run test:browser` with the same `PLAYWRIGHT_PACKAGE` environment. All browser test servers close automatically. Existing packages were reused. Code budget is now 300 KB across all three games, with a separate 1 MB runtime image budget; actual values are below both.

## Limits

The user tested the original game and requested this visual/play upgrade. Acceptance of the new presentation and discoveries is pending. Student enjoyment/learning outcomes, formal teacher review, physical Android/iPad, Safari and real screen-reader testing remain pending. Mobile emulation and a small static bundle do not certify low-end phone performance. Reports remain local/unverified and cover the original twelve orders; optional discoveries are saved in progress backups, not added to the original report schema.
