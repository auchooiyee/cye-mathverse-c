# GraphQuest teacher answer review — 2026-10-18

Pack `graphquest-1.0.0`, Form 4 Mathematics, planning ID M4-05. All six keys were checked against an independent exhaustive search of legal walks with positive integer weights. Formal teacher sign-off is pending for every row. These are route-planning tasks with live totals, not independently assessed arithmetic or official SPM questions.

| ID / mission | Goal and constraints | Example accepted route and working | Teacher review |
|---|---|---|---|
| G01 · The morning bun run | Shortest A→D; labels km | A–B–C–D: 4 + 2 + 3 = **9 km**. A–C–D is 10 km; A–B–D is 12 km. Fewer edges need not be shorter. | Pending |
| G02 · Small budget, big delivery | Cheapest A→D; same streets, labels RM | A–C–B–D: 1 + 1 + 2 = **RM4**. Distance is 7 + 2 + 8 = 17 km. G01's shortest route costs 3 + 1 + 5 = RM9; A–B–D costs RM5. | Pending |
| G03 · A bridge takes a day off | Shortest A→F; B–D closed both ways | A–C–E–F: 4 + 3 + 3 = **10 km**. A–B–C–E–F is 11 km. A route using B–D is invalid even if its sum looks attractive. | Pending |
| G04 · Follow the flow | Shortest C→D; every road directed | C→E→D: 3 + 2 = **5 km**. C→E→B→D is 7 km. C→B reverses B→C and is invalid. | Pending |
| G05 · Two stops, one little van | A→F, visit B and E, cost ≤RM9; not an optimum-only task | A–B–C–E–F: 2 + 2 + 1 + 2 = **RM7** (8 km). Also A–B–D–E–F: 2 + 2 + 3 + 2 = **RM9** (9 km). Both pass; any legal route meeting all conditions passes. | Pending |
| G06 · The whole town is counting on you | Start/end A; visit B, D, E and F; shortest tour | A–B–D–F–E–C–A: 2 + 3 + 3 + 2 + 2 + 3 = **15 km**. Reverse A–C–E–F–D–B–A also passes. Repeat visits are allowed, but cannot make the optimum smaller. | Pending |

## Coverage and provenance

KPM/BPK-authored September 2018 DSKP, SK 5.1, selected SP 5.1.2 and 5.1.5. G01–G05 support weighted/directed network interpretation and network problem-solving; G06 focuses on network problem-solving. This is not complete coverage of vertices/degree, subgraphs/trees, graph representation or the entire chapter. No Euler/MST theorem or exam-marking claim. See [source and limits](PLAN.md); latest curriculum applicability remains to be confirmed by the teacher.

G01 adapts the user's Number Academy `exam-f4-5` topology, verified independently. Other scenarios/networks are original. RM represents fictional road charges; no real transport rates are asserted. Geometric lengths do not determine edge weights.

## Sign-off record

For each row, record reviewer name, review date, curriculum applicability, mathematical/language corrections, difficulty and pilot observations before classroom release. User acceptance of Cyber on 2026-10-18 does not sign off GraphQuest.
