# Wonderworks edition — 2026-10-19

The user played the original Variation Factory and requested much richer graphics and more interesting play. This upgrade is local and uses the same launcher, save key, port and original mathematical pack.

## Play the upgrade

在 Finder 双击 **Play Variation Factory.command**，保留 Terminal 窗口。如果游戏已经打开，请刷新页面。旧存档可以继续使用，无需重新通关。

Local address while the launcher runs: `http://127.0.0.1:4188/apps/games/variation-factory/`. It works on this Mac only.

- **A new factory world:** an original cinematic panorama, gold/teal/night palette, glass-style passport and illuminated workshop tabs.
- **Six visible mechanisms:** label press, wrapping robot crews, candy tray grid, square coating plate, square gift with ribbon, and a batch-to-box sharing line. Changing inputs changes the appropriate quantities or sizes.
- **Production sequence:** charging, shaping and packing; gears, flow paths and machine parts move together. Pause freezes production; Skip completes presentation. Completion is saved before animation.
- **Pip:** a robot companion with contextual encouragement and useful prompts.
- **Three atmospheres:** Aurora, Golden hour and Starlight change the actual workshop lighting. Preferences persist locally.
- **Gentle sounds:** opt in using Sound on or Settings. Muting stops additional notes; no music download or network request. Essential information remains on screen.
- **Discoveries:** finish the two orders in a workshop to unlock its optional scaling experiment. Six stars can be collected, once each, without changing the original order XP. Existing fully completed saves unlock all six immediately.
- **Mobile live preview:** the control card includes a small synchronized machine and output so input changes are visible without scrolling back to the main scene.

Reduced motion suppresses machine travel, decorative blinking, confetti and transitions. Original keyboard controls, 44 px touch targets, autosave/recovery, backup/import and report export remain available. The hero's artwork depicts a fantasy factory; quantitative information is provided by the controls and live SVG scenes, not by counting objects in that illustration.

## Discovery teacher review

All six experiments keep k fixed and show original versus changed output. Guided exploration remains explicit. The following goals were independently checked over all **86 offered configurations**; each has one valid setting under its constraints. Teacher sign-off and student-pilot evidence remain pending.

| Discovery | Original | Goal / valid setting | Relationship |
|---|---|---|---|
| D1 Twice as bright | y = 4x; x = 2 → y = 8 | x = 4 → y = 16 | Double x, double y |
| D2 Half the wait | y = 48/x; x = 2 → y = 24 | x = 4 → y = 12 | Double crews, halve time |
| D3 A bigger celebration | y = 2xz; x = 2, z = 2 → y = 8 | Keep x = 2; z = 4 → y = 16 | With x fixed, double z, double y |
| D4 The fourfold finish | y = 2x²; x = 2 → y = 8 | x = 4 → y = 32 | Double x, quadruple y |
| D5 Unravel the root | y = 4√x; area x = 4 → y = 8 | area x = 16 → y = 16 | Quadruple area, double ribbon |
| D6 Grow without changing | y = 8x/z; x = z = 2 → y = 8 | x = z = 4 → y = 8 | Double both inputs, preserve ratio |

Discovery stars are optional exploration rewards, not exam marks. They are stored in optional `extras` metadata and retained in progress backups. The original HTML/CSV/JSON order reports remain unchanged and cover the twelve orders, not discovery attempts; the notebook makes this distinction clear. Old backups gain safe presentation defaults. Invalid theme/star names are normalized.

## Preservation and changed files

The pre-upgrade game is preserved in `backups/variation-factory-v1/`. The original order pack, state validator, exact arithmetic module, report module and launcher match `core-baseline.json`. Cyber, GraphQuest and the master plan still match their prior preservation baseline.

Modified Variation files: `index.html`, `app.js`; added `scenery.js`, `experience.js`, `spectacle.css` and runtime artwork. Shared changes only add those public files, JPEG content type, a new test command and separate code/art build budgets. No deployment or school connection.

Original raster and full generation prompt are documented in [ARTWORK.md](ARTWORK.md). Verification and screenshots are in [TEST_RESULTS.md](TEST_RESULTS.md).
