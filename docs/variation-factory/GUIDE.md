# Variation Factory — local play and teacher guide

**Updated 2026-10-19:** the Wonderworks visual/play upgrade is available with the same launcher and save key. See [new features and six discoveries](visual-upgrade/GUIDE.md). The original twelve-order instructions below still apply.

Six workstations, twelve orders and one community collection. Students calibrate a machine from a sample, then choose inputs that produce the requested output. The machine meter, formula, graph and exact value table respond together. Completing orders packs a parcel, earns six station badges and up to 1,200 XP. Hints/retries are free; there is no timer.

## 在这台 Mac 启动

在 Finder 打开 `CYE-MathVerse  GPT` 文件夹，双击 **Play Variation Factory.command**。保留 Terminal 窗口，游戏会在浏览器中打开。不要直接打开 `index.html`。

The launcher opens `http://127.0.0.1:4188/apps/games/variation-factory/`. This address works on this Mac only. Node 20+ is required; Node 22.14.0 was already available. No package installation, account, internet connection or paid API is needed for play. Control-C in the launcher's Terminal stops the server.

Alternatively, from the workspace root:

```sh
npm run start:variation
```

Cyber still uses port 4186; GraphQuest uses 4187. If 4188 is busy, close a previous Variation server or use `PORT=4189 npm run start:variation` and the printed address. A changed port/browser has separate storage; transfer progress with backup/import.

## Play

1. Read the order and the machine's test sample. Substitute the sample in the displayed equation to find k.
2. Enter k as a whole number, decimal or fraction. Use the +/− buttons or number selector to adjust x and, where present, z.
3. Watch the live output, machine fill, graph and table. The meter compares output with the target. For inverse variation, the output is time: more identical crews shorten a fixed job.
4. Run the order when both the calibration and target are satisfied. An output match with the wrong k does not pass. Feedback explains what needs changing.
5. Pause or skip packing if desired. Settings offers reduced motion; system reduced-motion preference is respected. Keyboard users can Tab between controls, type k, and press Enter/Space on +/− and Run.
6. Finish two orders to unlock the next station. Revisit completed orders to compare settings. Joint/combined tasks accept every valid configuration within the offered controls; replay cannot duplicate XP.

The graph shows y versus x, with z held at the current setting for joint/combined tasks. Axes rescale visibly. Inverse x=0 is undefined and is not plotted; the curve starts at x=1. Root stations use area as x and offer perfect squares for exact arithmetic. The continuous curve is an idealised model; offered machine settings are discrete. The value table gives exact fractions, even when the graph uses approximate plotting coordinates.

Chinese and Malay guidance is in How to play. All factory scenarios are idealised; other conditions remain fixed. No claim is made that real crews always scale perfectly.

## Save and report

An optional nickname/class and progress save only in this browser under `cye-mathverse.variation-factory.v1`. Settings provides a JSON progress backup, validated restore, and deletion. A corrupted/incompatible original save stays protected and downloadable until explicitly replaced. Storage-disabled play works in memory; download a backup before leaving. Refreshing during packing preserves the recorded completion without duplicate XP.

Each order keeps its latest 100 attempts, total attempt count and first successful settings. Starting a new day asks before replacing the run. Download receipts/backups first if you wish to retain them.

Factory notebook exports printable HTML, teacher CSV and evidence JSON. Open HTML in a browser, then Print → Save as PDF. Evidence JSON is a report; use the separate progress backup to restore play. All receipts are **local/unverified**, editable, with no online submission.

The report distinguishes completed orders, attempts, hints, constants, inputs and exact calculations. Live outputs, equations and tables are always available: first-try success is **guided exploration**, not unaided calculation mastery or an exam score. XP rewards completion/persistence. Nothing is uploaded.

## Teacher pilot and scope

Review the [twelve answer keys](QUESTION_REVIEW.md) and [curriculum scope](PLAN.md). Ask pupils to explain the difference between changing k and changing x; predict what happens before using a control; compare equivalent joint/combined settings; explain why square-root tasks use area rather than side.

User playtest of this new game is pending. Formal curriculum sign-off, real student enjoyment/learning evidence, physical Android/iPad, Safari and screen-reader checks remain pending. The two earlier games were accepted by the user. Mobile emulation has passed; classroom phones cannot access the current loopback address without a separately configured release.

## Verification commands

```sh
npm run build
npm test
PLAYWRIGHT_PACKAGE='/Users/chooiyee/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright' npm run test:variation:browser
```

For a manual production preview: `node scripts/server.mjs --dist --variation`. See [test results](TEST_RESULTS.md). The static build is saved locally, not published.
