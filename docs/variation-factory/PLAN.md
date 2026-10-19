# Variation Factory — implementation plan, 2026-10-18

The user has accepted GraphQuest and authorized the next local game. Follow master-plan Sections 0, 8, 13 and 14. Use the Sites skill's local-only workflow; no publication or school connection.

## Inventory and preservation

Cyber and GraphQuest are already implemented and user-accepted. Keep their complete public files, math/state/report modules and launchers unchanged; SHA-256 baseline is `preserved-files.json`. Extend shared serving/build registration only. New game uses its own directory, launcher, port 4188 and save key.

Read Number Academy `data.en.js` (f5-1), `workshop.en.js` (combined-variation-plan and exam-f5-1), and the existing curriculum register. Read Math Runner `public/data/questions.json` variation examples. Existing content covers direct, powers, inverse and combined variation. Adapt the Number Academy calibration 12 = 4×3 for the first machine, and 12 = 8×3/2 for a combined batch-sharing model, independently verified. Do not copy or alter those projects. New machines/scenarios/artwork are original. Avoid the ambiguous existing “output inversely as processing time” scenario; explicitly model portions per box for combined variation.

## Curriculum

KPM/BPK-authored KSSM Mathematics Forms 4–5 DSKP, September 2018, printed pp.80–81, PDF pp.94–95, read 2026-10-18:
https://bukuteksdigital.my/wp-content/uploads/2020/06/DSKP-MATEMATIK-Tingkatan-4-DAN-Tingkatan-5-KSSM.pdf

This is a hosted reproduction of the official-authored document; latest national revision is not confirmed. Selected tasks support 1.1.2/1.1.4 (direct), 1.1.3/1.1.4 (joint), 1.2.2/1.2.3 (inverse), 1.3.1/1.3.2 (combined). Table/graph exploration runs throughout. Square and square-root direct tasks are a subset; no full coverage of every exponent, proof, exam format or assessment mastery. Teacher review pending.

## Working slice

Six stations × two orders: label press (direct), wrapping crew (inverse), tray mixer (joint), square-tin coating (square), ribbon bench (square root), parcel sharing (combined). Infer constant k from a calibration sample; adjust input controls to fulfil an order. Joint/combined orders accept all valid configurations, not a hard-coded answer. Animated conveyor and filling/production meter respond to the chosen model. Graph axes are numerically scaled and show y versus x with z held fixed when present; table and formula show the same model. Root controls use perfect-square areas; exact rational arithmetic grades other cases.

Live outputs and graphs make this guided exploration. The report records first successful attempt, hints, constants, inputs and exact calculations, without claiming unaided mastery. No time penalty; 100 XP per completed order, once only. Replay, separate local autosave, recovery, protected corrupted saves, backup/import, local/unverified HTML/CSV/JSON exports and optional alias/class. Refresh during animation preserves completion.

## Checklist

- [x] Record GraphQuest acceptance; inspect existing variation material.
- [x] Verify selected curriculum scope and preserve accepted-game hashes.
- [x] Implement 12 independently checked orders, exact arithmetic and state validation.
- [x] Build interactive factory, equations/graphs/tables, mobile/keyboard and reduced motion.
- [x] Add local saves, safe recovery and teacher receipts.
- [x] Test mathematics, all orders, alternate solutions, recovery, exports and browser layouts.
- [x] Run both accepted-game regressions and preservation checks.
- [x] Document answer workings, run instructions, results, limits and implementation status.

Implementation complete and automatically tested. Human acceptance and classroom validation remain open; see `TEST_RESULTS.md` and `QUESTION_REVIEW.md`.
