# CYE-MathVerse — Phase 1 game collection

**Play online: [CYE-MathVerse game lobby](https://cye-mathverse-c.pages.dev).** Published from `auchooiyee/cye-mathverse-c` with Cloudflare Pages automatic deployments. Release settings: [Cloudflare release guide](docs/lobby/CLOUDFLARE.md). Online saves use the online browser origin; use game backup/import to transfer a local run.

**New: unified game lobby.** Double-click **Play CYE-MathVerse.command** to choose Cyber Code Breaker, GraphQuest or Variation Factory from one illustrated entrance. Form filters, Chinese guidance and in-game return links are included. The original ports and saved runs are preserved. [Lobby guide](docs/lobby/GUIDE.md) · [Lobby test results](docs/lobby/TEST_RESULTS.md).

**Variation Factory: Wonderworks edition** adds an original fantasy factory panorama, six distinct animated machines, Pip, three atmospheres, optional sound and six discovery experiments. Existing saves continue working. [Upgrade guide](docs/variation-factory/visual-upgrade/GUIDE.md) · [New test results](docs/variation-factory/visual-upgrade/TEST_RESULTS.md).

Three games are ready to play locally. **Variation Factory** is the new release: six workstations, twelve orders and 1,200 completion XP. Calibrate machines and adjust inputs while the factory, equations, graphs and tables change together. [Variation guide](docs/variation-factory/GUIDE.md) · [Teacher keys](docs/variation-factory/QUESTION_REVIEW.md).

 **GraphQuest Delivery Club** adds six route-planning missions with a little delivery van, three illustrated districts and 900 completion XP. Plan shortest and cheapest routes, follow one-way roads, avoid a closed bridge and complete multi-stop deliveries. [GraphQuest guide](docs/graphquest/GUIDE.md) · [Teacher keys](docs/graphquest/QUESTION_REVIEW.md).

**Cyber Code Breaker**: rescue Pip through six sectors by building number-base signals, converting representations and balancing charge. Twelve original challenges, purposeful retries, a small branching lock choice, 1,200 completion XP and six badges. Existing Candy Kart, Math Runner, Number Academy and Sunshine Quest projects are unchanged.

## Play on this Mac

In Finder, double-click **Play CYE-MathVerse.command** for the complete collection. It opens **http://127.0.0.1:4186/apps/lobby/** and prepares all three original game ports. Keep its window open. If an older game launcher occupies a port, close that earlier launcher and try again; your saves remain in the browser. Compatible running servers are reused, so keep their windows open too. The original **Play Variation Factory.command**, **Play GraphQuest.command** and **Play Cyber Code Breaker.command** still open individual games; start the unified launcher before switching to other games from the lobby. Use these launchers instead of opening an HTML file directly. A Terminal window starts the game and opens your browser. Keep the Terminal window open while playing; Control-C stops it. No package installation, account, internet connection or paid API is needed. Node 20+ is required and Node 22.14.0 was available on this Mac during implementation.

Variation opens at **http://127.0.0.1:4188/apps/games/variation-factory/**; its command is `npm run start:variation`. It has a separate save key and origin.

GraphQuest opens at **http://127.0.0.1:4187/apps/games/graphquest/**. From this folder, you can also run `npm run start:graphquest`. Its saves are separate from Cyber.

Alternatively, for Cyber from this folder:

```sh
npm start
```

Open **http://127.0.0.1:4186/apps/games/cyber-code-breaker/**. If port 4186 is occupied, stop the earlier game server or use `PORT=4189 npm start` and open the newly printed address. Changing the port creates a separate browser storage origin; use save backup/import to transfer your run.

This address works only on the current computer. Do not send a localhost URL to pupils expecting it to work on their phones. The layout supports small screens and was tested with Chrome mobile emulation; students on their own phones/tablets can use https://cye-mathverse-c.pages.dev. Physical-device classroom testing remains pending.

## Cyber Code Breaker: play and teaching

- Optional agent alias/class; no student full name or login.
- Read the incoming number and subscript base. Each chip represents a place value. Tap +/− (digits wrap), or type a whole code. **Connect circuit** checks it.
- Guided mode shows live power and contributions; independent mode hides totals until checking. Hint/retry is always allowed. Every completed lock earns 100 XP regardless of hints; the report separately records independent first attempts.
- Two locks restore each sector. In the Security Maze, choose either lock first. The final vault frees Pip.
- **Learning report** shows progress and exports printable HTML, JSON or CSV. Open HTML in a browser, then Print → Save as PDF. Reports are clearly **local/unverified**, not a secure certificate or online submission.
- **Settings** includes reduced motion, robot colour, backup/import and deletion. System reduced-motion preference is also respected. Sound and timers are absent, so there is no time pressure or sound-dependent instruction.
- Use Tab/Enter/Space, large touch buttons or a typed code. English math terms include Chinese and Malay guidance in How to play.

Autosaving uses this browser only. Private mode/clearing browser data may erase progress. Export a backup before restarting, clearing data or changing browsers. An unreadable/incompatible save is protected until the learner explicitly replaces it; storage-disabled play remains available. Latest 100 attempt events per question are retained; total attempt counts continue. A new mission replaces the current run after a warning, so download completed receipts you want to keep.

Teacher: review `docs/QUESTION_REVIEW.md`, try a full mission yourself, then run a small supervised pupil trial. XP measures completion/persistence, not exam marks. Inspect independent attempts, hints and misconceptions. Opening question keys or exporting workings before completion flags remaining locks as guided. No teacher has yet signed off this pack or evaluated its fun/learning impact with pupils.

## Verify and build

Run these from the workspace root, in order:

```sh
npm run build
npm test
```

Static files are copied into `dist/` using an allowlist. Build checks compare output/source hashes. There are no runtime or build dependencies and no remote assets. The app files total 1,036,067 bytes (about 1.04 MB) across all three games, including the 798 KB factory artwork uncompressed. The collection is published on Cloudflare Pages; future pushes to the connected main branch run build/tests before deployment.

To test the built production files manually:

```sh
node scripts/play-lobby.mjs --dist
```

Browser tests need Playwright and installed Chrome. This Mac already has a bundled Playwright installation:

```sh
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:graphquest:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:browser
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:experience
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:lobby:browser
```

On another development machine, point `PLAYWRIGHT_PACKAGE` at its available Playwright package (or use a normal installed `playwright` package). This is only for developer tests; students do not install it. Game browser tests start their own loopback server on a free port and close it afterwards. Lobby browser tests start or reuse ports 4186–4188 to verify the original save locations; they close only servers they own. All use isolated test browser profiles. They test the `dist/` build, so rebuild after edits. Results/screenshots/download fixtures are in `artifacts/`.

## Scope and files

- `apps/lobby/`, `apps/shared/lobby-nav.js`: unified local game selection and shared return navigation.
- `docs/lobby/`: plan, guide, preservation baseline and test evidence.
- `apps/games/variation-factory/`: six factory stations, twelve orders, live graphs/tables and separate saves.
- `docs/variation-factory/`: plan, local guide, twelve teacher keys, preservation baseline and test results.
- `apps/games/graphquest/`: delivery world, six missions, route controls and separate save state.
- `docs/graphquest/`: scope, launch guide, teacher answer review, preservation hashes and test results.
- `apps/games/cyber-code-breaker/`: complete game page, original vector world, controls, style and question pack.
- `packages/math/`, `packages/session/`, `packages/reports/`: exact base checking, progression/evidence and safe local exports.
- `scripts/`: local serving, Mac launcher and static build.
- `tests/`: mathematics, progression, receipt safety, build and browser flows.
- `docs/INVENTORY.md`, `docs/coverage.csv`: existing projects versus the 36-chapter plan.
- `docs/curriculum-sources.md`, `docs/QUESTION_REVIEW.md`: dated DSKP mapping, answer workings and pending teacher review.
- `docs/ARCHITECTURE.md`, `docs/TEST_RESULTS.md`: decisions, test evidence and limits.
- `IMPLEMENTATION_STATUS.md`: machine-readable front matter plus ongoing milestone checklist.

The original master plan is preserved. All three Phase 1 **local slices are implemented**. Cyber, GraphQuest and the Variation Wonderworks upgrade have user playtest acceptance. The unified lobby is implemented and tested, awaiting user playtest. Formal classroom readiness, teacher review, student pilots and physical-device QA remain pending. Cloudflare static hosting is live. Multiplayer, automatic submission, full syllabus coverage and a teacher dashboard backend are not implemented; no latest-SPM assessment claim is made.
