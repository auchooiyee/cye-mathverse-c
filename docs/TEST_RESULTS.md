# Cyber initial-release verification — 2026-10-18

Historical first-release evidence. The later GraphQuest delivery and Cyber regression results are recorded in [GraphQuest verification](graphquest/TEST_RESULTS.md). Current combined build/test totals are in `IMPLEMENTATION_STATUS.md`.

Environment: macOS, Node 22.14.0; installed Google Chrome via bundled Playwright. Tests use synthetic alias “Comet”; no school account or student record.

| Check | Command / evidence | Result |
|---|---|---|
| JavaScript syntax | `node --check apps/games/cyber-code-breaker/app.js` | Pass |
| Static production build | `npm run build` | Pass; 8 public app files, approximately 62 KB; no publication |
| Unit/content/build | `npm test` | 17/17 pass |
| Arithmetic property checks | Included in unit tests | 36,864 base representations round-trip and match independent weighted-place calculation |
| Authored keys | Included in unit tests | All 12 checked against independent literal decimal and encoded answer keys |
| Browser flow on production build | `PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:browser` | Pass; 10 scenario groups, no page errors and no external requests |
| Local preview | HTTP HEAD on `http://127.0.0.1:4186/apps/games/cyber-code-breaker/` | 200 OK; security policy and nosniff headers |
| Visual inspection | `artifacts/cyber-desktop.png`, `cyber-mobile.png`, `cyber-complete.png` | Desktop and 360 px full-page screenshots inspected; corrected off-screen skip-link screenshot visibility |

Browser scenarios: invalid digits; purposeful retries/hints; draft and hint recovery after refresh; all six sectors/twelve locks; either order in maze; completed-run recovery with identical receipt ID; actual HTML/JSON/CSV download events and file content checks; 360 px touch and landscape layout without horizontal overflow; keyboard-only chips/connect; reduced motion; disabled storage; corrupted-save backup/protection; question-key exposure evidence; validated backup import.

Unit scenarios additionally include zero, leading zeros, invalid/unsupported bases, malformed notation, overflow, exact equivalence, duplicate XP prevention, future-stage lockout, save validation, bounded history, HTML escaping and spreadsheet formula-injection protection.

## Limits and observed environment issue

The default tool sandbox initially denied binding a local HTTP port (`EPERM`). The approved local execution succeeded; this was an environment restriction, not an app failure. The sandbox also could not connect to that outside-sandbox preview; the approved read-only HTTP check returned 200. No approval-review rejection occurred.

Not yet tested: physical Android/iPad devices; Safari; actual screen-reader operation; formal accessibility audit; low-end device frame rate; a real teacher-led lesson; student engagement/learning outcomes. The existing sibling games were inventoried, not retested. No public deployment, multiplayer or live student submission was attempted.

## Pilot acceptance checklist

1. Teacher verifies current DSKP applicability, question language, answer workings and difficulty; signs all 12 review rows.
2. A small supervised group finishes the mission; note confusing moments, unprompted retries and whether they want another mission.
3. Confirm 44 px controls, reading comfort, focus visibility and no overflow on the actual class phones/tablets.
4. Teacher opens the printable receipt/CSV and correctly distinguishes completion from independent evidence.
5. Adjust the game based on observations before expanding to GraphQuest and Variation Factory.
