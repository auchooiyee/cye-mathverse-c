# GraphQuest — local Phase 1 slice

Authorized by the user's “Proceed” on 2026-10-18, following the proposed second Phase 1 game. Continue the Sites local-only workflow; no public deployment or student submission.

## Inventory and preservation
Existing Cyber Code Breaker is user-accepted. Preserve its source, math/session/report modules, launcher and save key. `preserved-files.json` records their pre-change SHA-256 hashes; tests will verify them. Only shared static serving/build registration is extended. Use a separate GraphQuest launcher, port (4187), game folder and save key.

Inspected Number Academy's `data.en.js`, `data.en.expanded.js`, `workshop.en.js`, and `curriculum-standards.json` in `/Users/chooiyee/Documents/Maths Game`. Its network content includes degree, directed/weighted graph interpretation and the A–D shortest-path workshop. Reuse the user's five-edge workshop topology (AB4, AC7, BC2, BD8, CD3) for GraphQuest's first mission; independently verify the result. All other missions and artwork are newly authored. No sibling game is edited.

## Curriculum traceability
Read KPM/BPK's *KSSM Matematik Tingkatan 4 dan 5*, September 2018, printed pp. 52–53 / PDF pp. 66–67 on 2026-10-18:
https://bukuteksdigital.my/wp-content/uploads/2020/06/DSKP-MATEMATIK-Tingkatan-4-DAN-Tingkatan-5-KSSM.pdf

The accessible source is a mirror of the KPM-authored original, not proof of the latest national revision. SK 5.1: networks. SP 5.1.1 introduces vertices/edges/degree; SP 5.1.2 compares directed/undirected and weighted/unweighted graphs; SP 5.1.5 concerns network problem-solving, including optimum cost. This slice supports 5.1.2 and 5.1.5 through weighted routes and one-way roads, with introductory vertex/edge vocabulary. It does not fully cover 5.1.1, graph drawing 5.1.4, or subgraphs/trees 5.1.3. No MST/Euler theorem, SPM marking or full-chapter mastery claim.

## Implementation checklist
- [x] Inspect existing network material and confirm intended SP scope.
- [x] Record preservation baseline for the accepted game.
- [x] Build six mathematically distinct delivery missions across three illustrated districts.
- [x] Implement exact route validation, closed/directed edges, budget and required stops, and shortest-route checking accepting all optimal ties.
- [x] Animate van along the actual submitted route; allow pause/reduced motion; no speed score.
- [x] Add local saves, evidence/history, recoverable local receipts and safe backup/import.
- [x] Test route mathematics against an independent exhaustive oracle; browser-test full completion, controls, recovery and exports.
- [x] Rebuild, regression-test Cyber and verify preservation hashes.
- [x] Update status, teacher review register and local launch instructions.

## Architecture and acceptance
Use HTML/CSS/SVG + ES modules, zero runtime packages. Add graph math in `packages/math/network.js`; GraphQuest-specific run state is separate because the old base-question session assumes digits. Reuse the existing HTML escaping/report conventions and server/build pipeline without changing Cyber. Routes are vertex sequences in simple graphs; crossings are not junctions. Distances in km and fictional transport charges in RM are distinct weights. Map geometry is not a distance scale.

Six missions: shortest route; cheapest route; bridge closure; one-way streets; multi-stop budget; minimum-distance return circuit. Live totals support exploration; a route successfully delivered on first dispatch without hints is recorded as such, not claimed to be unaided arithmetic mastery. Hints do not reduce 150 XP completion rewards. Replay retains mission completion and evidence; a separate whole-run restart asks to export first.

Local reports include submitted vertex/edge traces, per-edge weights, totals, required stops, attempted costs, hints and feedback. They are editable/local/unverified. No hidden student collection. Animations are presentation only: refresh during travel returns to the saved route without losing the recorded attempt or issuing double XP.

Human acceptance remains open: user playtest, teacher sign-off, student pilot and physical-device checks are separate from the completed implementation checklist. See `TEST_RESULTS.md`.
