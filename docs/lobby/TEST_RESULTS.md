# Game lobby verification — 2026-10-19

Built files tested in installed Chrome with isolated synthetic profiles. User's personal browser storage was not inspected or changed.

| Check | Result |
|---|---|
| Production build | 34 public files, 1,035,619 bytes: 237,358 code/assets and 798,261 reused JPEG. No new raster download or runtime package. |
| Unit/content/build | **50 passed, 0 failed**, `artifacts/lobby/unit-tests.tap`. Includes original math/property tests and source/build hashes. |
| Preservation | Every game asset/module and existing launcher matches the pre-lobby baseline. Three HTML heads differ only by the exact marked navigation include. Original baselines remain intact; tests remove only this exact include before comparing hashes. |
| New lobby browser suite | **9 scenario groups passed**, `artifacts/lobby/browser-report.json`, zero page errors and external requests. |
| Cyber regression | 10 scenario groups passed. |
| GraphQuest regression | 12 scenario groups passed. |
| Variation original regression | 12 scenario groups passed. |
| Wonderworks regression | 9 scenario groups passed. |
| Launcher | Three original ports successfully prepared, repeated startup reuses compatible servers, incompatible occupied port fails with a clear message, partial startup cleans up only owned servers. Shell syntax passed; executable bit set. |
| Visual inspection | Desktop, 360 px mobile and tablet screenshots inspected; no overflow. Magnified content tested at 200%, 44 px primary touch targets, system reduced motion and keyboard filters verified. |

The nine lobby groups cover root routing/private file denial; form filtering and screen-reader states; all three first-visit modal return paths plus completion/save/re-entry; switching without cross-game save changes; narrow/landscape/tablet/magnified layouts; repeated launch; conflicting-port cleanup; arbitrary-origin relative paths; no-JavaScript links and direct-file launcher guidance.

An early test incorrectly expected the welcome modal to recur after exiting: the existing games already autosave a new run on first render. The test was corrected without changing game logic. A magnification check revealed overflow; container-based responsive rules were added and the complete lobby suite passed afterward. No remaining failed checks. Original game harnesses still emit their original pack date in some reports; all four were rerun on 2026-10-19 for this lobby iteration. The subsequent magnification fix changed only lobby CSS.

Artifacts: `artifacts/lobby/desktop.png`, `mobile.png`, `mobile-form5.png`, `tablet.png`; original game browser reports remain in their respective artifact directories. No physical Android/iPad, Safari, screen-reader or Finder double-click automation was performed. No public deployment or student-network access was enabled. User acceptance of Wonderworks is recorded separately from these automated tests; the new lobby awaits user playtest.
