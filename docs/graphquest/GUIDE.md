# GraphQuest Delivery Club — local play guide

Six deliveries, three districts and a little van whose journey follows the route you build. The mathematics changes the delivery: distance, cost, one-way roads, a closure, required stops and a return tour. No timer or penalty for hints; six badges and 900 completion XP.

## Start on this Mac

在 Finder 打开 `CYE-MathVerse  GPT` 文件夹，双击 **Play GraphQuest.command**。保留打开的 Terminal 窗口，浏览器会打开游戏。不要直接打开 `index.html`；该页面现在会显示启动提示。

The launcher opens `http://127.0.0.1:4187/apps/games/graphquest/`. It uses the local Node installation, requires no package installation or internet connection, and serves this Mac only. Stop with Control-C in its Terminal window. Cyber retains its separate launcher and port 4186.

From the workspace root, the equivalent command is:

```sh
npm run start:graphquest
```

If 4187 is already occupied, close the previous GraphQuest server or use `PORT=4189 npm run start:graphquest` and the printed address. A different port/browser has separate saved progress; use backup/import to transfer it.

## Play

1. Read the delivery goal and road-label units: kilometres or RM. The drawing is not to scale; a crossing without a stop is not a junction.
2. Tap/click the next connected map stop, or use the next-stop buttons. Build your route from the fixed starting point. Undo and Clear let you experiment. Keyboard users can Tab to the controls and use Enter/Space.
3. Compare the live distance/cost totals. A shortest route need not use the fewest roads, and a cheapest route need not be shortest.
4. Dispatch the van. It follows your submitted route; Pause/Resume and Skip are available. Reduced motion can be enabled in Settings and follows the system preference.
5. Feedback explains illegal moves, missed stops, excess cost and routes that can be improved. A hint costs no XP. A completed mission earns 150 XP once; replay allows different routes without duplicate rewards.
6. Open Mission log for the local delivery receipt. Download printable HTML (then browser Print → Save as PDF), CSV or JSON. Receipts contain actual route legs, sums, hints and attempts.

How to play includes Chinese/Malay guidance. English mathematical vocabulary is used in the missions.

## Saves and evidence

Progress autosaves in this browser under `cye-mathverse.graphquest.v1`. Settings provides an optional alias/class, backup, import and deletion. Avoid real student names for local trials. Clearing browser data/private-mode storage can remove progress. Export a backup and completed receipts before a New delivery day.

Unreadable saves are protected until explicitly replaced, and can be downloaded for recovery. Storage-disabled play remains possible with a warning. Each mission retains its most recent 100 events, cumulative attempts and first completion. Completion is saved before the animation; refreshing during travel does not award XP twice.

Reports are **local/unverified**, editable and never submitted automatically. First-dispatch success means a successful first submitted route without a hint; live sums were still available. It does not establish independent arithmetic mastery. Rewards record completion/persistence, not exam marks.

## Teacher trial

Review [the six answer keys](QUESTION_REVIEW.md) and [curriculum scope](PLAN.md), then try the full route yourself. G05 intentionally accepts every legal route within RM9, including the RM9 boundary; G06 accepts both directions of an optimal tour. Ask pupils to explain why their chosen route meets the goal and compare alternatives.

Suggested first pilot: 3–5 pupils, noting where instructions confuse them, whether they voluntarily retry, and whether they can explain the difference between distance and cost. Actual student enjoyment and learning outcomes have not yet been measured. Physical Android/iPad, Safari and screen-reader checks remain pending; the current local URL is not reachable from class phones.

## Verify

```sh
npm run build
npm test
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:graphquest:browser
```

Browser tests run the built `dist/` app and close their own local test server. See [test results](TEST_RESULTS.md). A built manual preview uses `node scripts/server.mjs --dist --graphquest`. Nothing is published.
