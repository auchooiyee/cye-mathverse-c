---
title: "CYE-MathVerse — Ultimate Mathematics Game Universe"
document_type: "AI-agent-readable master product plan"
version: "1.0"
prepared_on: "2026-10-18"
status: "Planning and phased implementation"
owner: "CYE-MathVerse"
locale: "Malaysia"
curriculum: "KSSM Mathematics and Additional Mathematics, Form 4 and Form 5"
primary_delivery: "Mobile-friendly web games; open a URL; no app installation"
target_users: ["Form 4 students", "Form 5 students", "Mathematics teachers", "Additional Mathematics teachers"]
preferred_ai_workflow: "ChatGPT Desktop Work + Codex, with teacher review"
platform_priority: ["Low-end Android phone", "Desktop browsers", "iPad/tablet", "Classroom projector"]
---

# CYE-MathVerse — Game Universe Master Plan

> **For ChatGPT Desktop Work / Codex / future development agents.** This is the single project brief for the CYE-MathVerse game universe. It contains the educational brief, 30 possible game genres, 36 chapter-specific game concepts, 10 flagship games, technical architecture, shared platform requirements, roadmap, acceptance criteria, and agent execution instructions. **Treat it as a product plan, not a claim that code or servers already exist.**

## 0. START HERE — Instructions for an AI development agent

**Goal:** Build an engaging, curriculum-aligned web game platform for Malaysian KSSM Form 4–5 Mathematics and Additional Mathematics students. The product should feel like real games (racing, mystery, tycoon, RPG, survival, co-op, strategy), not a multiple-choice quiz dressed up with animation.

**Before writing code:**

1. Inspect the current workspace and any user-provided CYE-MathVerse repositories, existing games, assets, question banks, deployment configuration, and documents. **Do not assume they exist, and do not overwrite existing work.**
2. Record what is already implemented versus only planned. Preserve working components; reuse validated games/assets when feasible.
3. Check the relevant **official KPM/BPK DSKP**, textbook, and current SPM assessment requirements before setting any exact Learning Standard (SP) numbers, scoring criteria, exam paper structure, or syllabus claims. The 36-chapter mapping below is a *planning index*, not a verified list of all granular learning standards. Additional Mathematics has core and elective topic packages; do not misrepresent every elective topic as universally compulsory.
4. Make a plan and build a **small, working, testable vertical slice**. Prefer a playable game with genuine mathematical interactions and useful teacher evidence over a polished menu of unfinished games.
5. Default initial build when the user has not selected another game: **Form 4 Mathematics, Ch 2 Number Bases — Cyber Code Breaker** (small, easy to test and deploy). Then build reusable infrastructure and **GraphQuest** and **Variation Factory**. Candy Kart is an existing strategic priority and should not be overwritten by this default.
6. Run actual available tests and build commands. Report what ran, what failed, what remains untested. Do not claim a working deployment or multiplayer feature without verification.
7. Do not purchase services, share student data, alter live school systems, or publish publicly without explicit permission. Prefer local/test deployment first.
8. Output a short implementation summary, test results, build/run instructions, changed files, and next steps. Leave a machine-readable `IMPLEMENTATION_STATUS.md` in the working repository if appropriate.

### Non-negotiable goals

- Students open a normal URL; **no app install**, login friction or high-end GPU should be required for basic play.
- Maths is part of the game mechanics: it changes routes, movement, production, strategy, or outcomes.
- Alignment with KSSM topic, content standard (SK), learning standard (SP), suitable age/level and assessment is explicit.
- Every game should support clear instructions, feedback, purposeful retries and meaningful mastery evidence.
- Works on small mobile screens, ordinary school computers and a teacher's projector; English-first for mathematical terms, optionally Bahasa Melayu and Simplified Chinese guidance.
- A useful individual learning experience must work even if multiplayer, sign-in or the backend is temporarily unavailable.
- Protect under-18 learners' personal data. Avoid public student full-name leaderboards, intrusive analytics and unnecessary collection.

### Decisions already made / user context

- Brand/project: **CYE-MathVerse**, sometimes alongside CYE GameLab and mathwithcye.
- Focus: Malaysian **Form 4 & Form 5 Mathematics and Additional Mathematics**, formative assessment and SPM revision.
- School context: teacher uses Google Classroom, Google Sheets, Apps Script, online classes and printable/downloadable PDF student reports.
- User's current development machine: **MacBook Air M2, 8 GB**. Prioritize efficient, low-poly assets and moderate build tooling.
- Browser games are the primary product; **Blender** is for optional 3D asset creation, **Three.js/React Three Fiber** for controlled web-native 3D, **Phaser** for many 2D games; **Godot 4 Web Export** remains an alternative when a particular game benefits from a visual game editor.
- Planned flagship **Candy Kart Math Rush**: cute candy kart racer, 3D, desktop + mobile, multiplayer aspirational, Form 4 + Form 5 Maths question banks; drifting, collisions, boosts and earned items.
- Other previously planned games include **Financial Survival Tycoon**, **GraphQuest (Networks: shortest/efficient paths & Eulerian reasoning)**, **Number Bases Cyber Code Breaker**, **Matrix Robot Battle**, **Variation Factory** and **Math Runner**.
- Current known example of an existing public game (verify before treating as current): `https://cye-mathverse.netlify.app/financial-survival-tycoon/`.

---

## 1. Product vision and learning design

**Vision:** An interconnected maths game universe students voluntarily revisit. A student can race, build, solve mysteries, explore dungeons, manage a restaurant or design a city and still demonstrate transferable KSSM mathematics skills.

### 1.1 Main audiences and classroom modes

| Audience | Typical mode | What matters |
|---|---|---|
| Form 4 Mathematics | 5–20 minute solo or pair tasks | Understand core concepts and recover gaps |
| Form 5 Mathematics | Topic revision and exam preparation | Applications, graphs, calculations, justified steps |
| Form 4 Additional Mathematics | Guided challenges and graph interactions | Algebra fluency, symbols, representations |
| Form 5 Additional Mathematics | Calculus, modeling, SPM practice | Derivations, accuracy, reasoning, working |
| Teachers | Whole-class, Google Meet, Google Classroom | Assign chapters, visibility, review errors, export evidence |
| Clubs/competitions | Team challenges / tournaments | Fair scoring, collaboration, accessibility |

### 1.2 Quality rubric for every game (0–5 points each)

1. **Mathematical authenticity:** correct concept actually alters gameplay (target ≥4).
2. **Curriculum fit:** verified KSSM learning standards and suitable depth (target 5).
3. **Fun/player agency:** satisfying controls, decisions, visual feedback, replay value (target ≥4).
4. **Accessible performance:** mobile touch, keyboard, low-spec mode, stable FPS (target ≥4).
5. **Actionable learning evidence:** diagnosis, step feedback, teacher report (target ≥4).
6. **Privacy/fairness:** age-appropriate data collection, no exploitation or pay-to-win (target 5).

**Do not:** attach arbitrary multiple-choice questions to a racing game and call that integrated learning; speed-rank students only by fast answers; make random rewards mimic paid gambling; penalize a student permanently for needing hints; claim automated marking is infallible.

### 1.3 Difficulty and mathematics feedback

- **Easy:** scaffolded steps, visual models, simple numbers, hints and unlimited retry.
- **Medium:** reduced scaffolding, mixed representations, multi-step questions.
- **Hard:** unfamiliar scenarios, explanation, higher-order problems, worked solutions after completion.
- **SPM mode:** show marks by working steps, timing when relevant, appropriate calculators/notation, and common misconceptions.
- Feedback should contain *why* an answer is wrong, not only correct/incorrect. Use exact or symbolic checking when possible, numeric tolerance only when justified, and manual review for open-ended reasoning.
- Player skill, language and accessibility needs must not be confused with mathematics mastery.

---

## 2. Catalogue of 30 possible game genres

The following are **design hypotheses**, not survey-measured popularity rankings. The same reusable engine can support many chapters.

| # | Genre | Appealing mechanic | Strong chapter matches | Relative appeal hypothesis |
|---|---|---|---|---|
| 01 | Kart Racing | Drift, boost, collision, earned items, circuits | Motion graphs, quadratics, kinematics, differentiation | Very high |
| 02 | Endless Runner | Dodge obstacles, coins, rhythm, quick runs | Number bases, algebra, graphs | Very high |
| 03 | Battle Arena | Team objectives, cooldowns, tactics | Matrices, vectors, probability | Very high |
| 04 | Sandbox Building | Construct, transform, automate, explore | Transformation, coordinate geometry, networks | Very high |
| 05 | Escape Room | Clues, locked doors, interconnected puzzles | Logic, equations, number bases, logarithms | Very high |
| 06 | Mystery Detective | Evidence, inference, cases, branching narrative | Logical reasoning, statistics | High |
| 07 | Tower Defense | Place units, budget resources, protect route | Inequalities, probability, optimization | Very high |
| 08 | Survival | Gather, craft, ration resources, cooperation | Sets, probabilities, variation | Very high |
| 09 | Restaurant Co-op | Timed teamwork, stations, recipes, orders | Variation, ratio, linear programming | Very high |
| 10 | City Builder | Roads, zoning, development and budgets | Networks, modeling, financial maths | High |
| 11 | Tycoon Simulator | Invest, expand, compare ROI, upgrade | Financial management, taxation, indices | Very high |
| 12 | RPG Adventure | Quest, character progression, abilities | All topics when mechanic-driven | High |
| 13 | Party Minigames | Short varied rounds and friendly eliminations | Cross-topic revision | Very high |
| 14 | Obstacle Course | Precise movement, switches, moving platforms | Geometry, graphs, trigonometry | Very high |
| 15 | Space Exploration | Navigate, fuel management, landing | Vectors, kinematics, logarithms | High |
| 16 | Robot Battle | Engineer builds and mathematical power systems | Matrices, functions | Very high |
| 17 | Farming Simulator | Harvest cycles, seed upgrades, output forecasts | Progressions, variation, percentages | High |
| 18 | Transport Simulator | Routes, fleet assignment, traffic | Graph theory, linear programming | High |
| 19 | Physics Puzzle | Launch, trajectory, gravity, constraints | Quadratics, calculus, trigonometry | High |
| 20 | Cyber Hacking | Codes, terminals, wires, decryption | Number bases, logarithms, matrices | High |
| 21 | Treasure Hunt | Maps, bearings, navigation, secret locations | Coordinates, triangle solution, vectors | High |
| 22 | Shopping Simulator | Compare offers, budgets, bills and tax | Insurance, taxation, financial management | High |
| 23 | Sports Simulation | Shooting, trajectories, consistency, tactics | Quadratics, statistics, motion | High |
| 24 | Theme Park Builder | Ride engineering, visitor flow, geometry | Circular measure, calculus, finance | High |
| 25 | Board/Card Strategy | Deck planning, combinatorics, conditional choice | Probability, permutations, combinations | High |
| 26 | Pet/Creature Collection | Collect, train, evolve, build squads | Probability, distributions and revision | High |
| 27 | Rhythm Game | Tap/slide to wave patterns, beat maps | Trigonometric functions, periodicity | High |
| 28 | Target Shooter | Precision targets, angles, coordinates | Trigonometry, coordinate geometry | High |
| 29 | Rescue Mission | Use maps, dispatch, reach objectives | Networks, vectors, graphs of motion | High |
| 30 | Science Lab Simulator | Manipulate input, graph results, optimize | Linear law, mathematical modeling, statistics | High |

### 2.1 Examples of genre fusion

- **Kart Racing + Battle Arena + Math:** driving remains continuous; validated maths achievements charge item energy.
- **RPG + Escape Room + Boss Battle:** a puzzle changes the dungeon, not merely a player's score.
- **Tycoon + Simulation + Optimization:** change a variable; immediately view costs, profit, output and feasibility.
- **Sandbox + Geometry + Spatial Puzzle:** transformations visually move shapes and structures.
- **Co-op Restaurant + Linear Programming:** teams decide which products to prepare under ingredient and time constraints.

---

## 3. Chapter-to-game index (36 games)

**IDs are stable design identifiers.** `M4` = Form 4 Mathematics, `M5` = Form 5 Mathematics, `A4` = Form 4 Additional Mathematics, `A5` = Form 5 Additional Mathematics. All names are design concepts, not claims of finished software. Specific exact SP numbers must be populated only from the official DSKP.

### 3.1 Form 4 Mathematics — 10 chapters

#### M4-01 — Quadratic Functions and Equations in One Variable
- **Game:** Math Dunk Champions; **genres:** Sports + Physics Puzzle.
- **Core play:** Change coefficients, graph shape, vertex or roots to aim a basketball trajectory; see the ball follow the curve. Solve factorization/equation challenges as applicable to the verified standard.
- **Progression:** Tutorial trajectory → target hoops → barriers → arena tournament.
- **Evidence:** Student identifies vertex/intercepts and explains how parameter changes affect a quadratic graph.

#### M4-02 — Number Bases
- **Game:** Cyber Code Breaker; **genres:** Cyber Hacking + Escape Room.
- **Core play:** Decode terminal locks by converting numbers across permissible bases and performing syllabus-aligned operations. Visual place-value chips give feedback.
- **Progression:** Binary gate → other bases → multi-door cipher → timed boss vault.
- **Evidence:** Record place-value reasoning, conversions, error types and attempts. **Recommended first MVP.**

#### M4-03 — Logical Reasoning
- **Game:** Logic Detective Agency; **genres:** Mystery Detective + Deduction.
- **Core play:** Assess statements, converse/inverse/contrapositive where aligned, arguments and validity to eliminate contradictions in a case.
- **Progression:** Individual clues → conditional chains → full detective board.
- **Evidence:** Correct logical justification; distinguish valid arguments from plausible stories.

#### M4-04 — Operations on Sets
- **Game:** Zombie Shelter Survival; **genres:** Survival + Resource Management.
- **Core play:** Use Venn diagrams and union/intersection/complement to allocate food, medicine and equipment across survivors; avoid double-counting.
- **Progression:** Two-set resources → three-set mission if syllabus-appropriate → rescue camp.
- **Evidence:** Correct set notation and membership counts.

#### M4-05 — Network in Graph Theory
- **Game:** GraphQuest: Delivery Empire; **genres:** Logistics + Strategy.
- **Core play:** Choose routes through weighted/unweighted networks, use degree, connectedness and Eulerian trails/circuits according to the official SP. Extend to cheapest spanning networks only as explicitly flagged enrichment where not required by the assessed syllabus.
- **Progression:** Town mail routes → bridge logistics → route optimization puzzle.
- **Evidence:** Path trace, route validity, total weight/cost, explanation. **Priority Phase 1.**

#### M4-06 — Linear Inequalities in Two Variables
- **Game:** Factory Zone Builder; **genres:** Builder + Strategy.
- **Core play:** Plot half-planes, drag boundaries, test feasible points and allocate limited factory space under inequalities.
- **Progression:** One boundary → overlap of restrictions → planning mission.
- **Evidence:** Shaded regions, inequality symbols and feasibility decisions.

#### M4-07 — Graphs of Motion
- **Game:** Speed Racer: Motion Lab; **genres:** Racing + Simulation.
- **Core play:** Drive/edit route segments and observe distance-time and speed-time graphs. Use graph interpretation to predict movement; be careful with velocity versus speed terminology.
- **Progression:** Steady motion → rest → variable speed → graph reconstruction.
- **Evidence:** Distance, speed, acceleration reasoning, matching graph to movement.

#### M4-08 — Measures of Dispersion for Ungrouped Data
- **Game:** Esports Team Manager; **genres:** Sports Management + Data.
- **Core play:** Compare player results using range, interquartile range, variance or standard deviation when in the verified subtopic; choose reliable lineups, not just the highest average.
- **Progression:** Compare pairs → draft teams → season analysis.
- **Evidence:** Correct dispersion calculations and justified choice.

#### M4-09 — Probability of Combined Events
- **Game:** Probability Monster Arena; **genres:** Card Strategy + Collection.
- **Core play:** Pick strategies based on combined-event probability and contextual independence/dependence, backed by simulations; no paid/randomized monetization.
- **Progression:** Event tree → combination rounds → strategic battle.
- **Evidence:** Event diagrams, calculations and simulation-vs-theory interpretation.

#### M4-10 — Consumer Mathematics: Financial Management
- **Game:** Financial Survival Tycoon; **genres:** Life Sim + Tycoon.
- **Core play:** Manage goals, income, expenses, savings and debt in authentic Malaysian ringgit scenarios; adapt decisions to life events.
- **Progression:** Basic budget → financial goals → setbacks → sustainable plan.
- **Evidence:** SMART goals, budget trade-offs and choices with reasons. **Existing game may be available; inspect before editing.**

### 3.2 Form 5 Mathematics — 8 chapters

#### M5-01 — Variation
- **Game:** Candy Factory Simulator / Variation Factory; **genres:** Factory Automation + Simulation.
- **Core play:** Set up machines whose output follows direct, inverse or joint variation. Estimate a constant of proportionality, change independent variables, predict output and observe the factory.
- **Progression:** Direct → inverse → joint variation → mixed production challenge.
- **Evidence:** Equation formation, proportionality constant, calculations, graph interpretation. **Priority Phase 1.**
- **Existing related work:** Three proposed interactive web lessons: Direct Variation Factory Simulation, Inverse Variation Delivery Mission and Combined/Joint Variation; integrate if available.

#### M5-02 — Matrices
- **Game:** Matrix Mech Battle; **genres:** Robot Combat + Strategy.
- **Core play:** Use matrix addition/multiplication and inverses where aligned to transform robot control commands and solve coded commands; visualize mapping.
- **Progression:** Basic matrices → control-grid puzzle → robot boss.
- **Evidence:** Matrix dimensions, calculations, inverse validity and solution steps. **High-value second-wave game.**

#### M5-03 — Consumer Mathematics: Insurance
- **Game:** Life & Car Insurance Simulator; **genres:** Life Simulation + Decisions.
- **Core play:** Compare illustrative insurance options, premiums, excess/deductible, co-insurance and coverage scenarios as appropriate to the prescribed DSKP.
- **Progression:** Travel/vehicle scenario → hospital bill scenario → responsible choices.
- **Evidence:** Premium/claim calculations and trade-off explanation. Use illustrative, non-advisory policies.

#### M5-04 — Consumer Mathematics: Taxation
- **Game:** Tax Tycoon Malaysia; **genres:** Business Tycoon + Roleplay.
- **Core play:** Calculate syllabus-defined tax scenarios, choose legitimate business actions and understand receipts, allowances or tax categories where relevant.
- **Progression:** Store opening → filing tasks → year-end decisions.
- **Evidence:** Clear arithmetic and reasoning. Any real-world Malaysian rates/thresholds must show jurisdiction, year, and authoritative source; default to explicitly hypothetical classroom rates.

#### M5-05 — Congruency, Enlargement and Combined Transformations
- **Game:** ShapeCraft World; **genres:** Sandbox + Geometry Puzzle.
- **Core play:** Translate, reflect, rotate and enlarge 2D shapes inside a playful 3D-looking world; chain transformations and verify images and scale factors.
- **Progression:** One transformation → combination → blueprint rebuild.
- **Evidence:** Object/image coordinates, transformation descriptions and congruency/enlargement checks.

#### M5-06 — Ratios and Graphs of Trigonometric Functions
- **Game:** Trigonometry Beat Rush; **genres:** Rhythm + Graph Puzzle.
- **Core play:** Synchronize beats with sine/cosine/tangent graphs, angles and cycles; solve trigonometric ratios and interpret graphs.
- **Progression:** Ratios → graph landmarks → visual rhythm circuits.
- **Evidence:** Angles, graphs, period and interpretation with correct degree/radian conventions for this subject.

#### M5-07 — Measures of Dispersion for Grouped Data
- **Game:** Sports Analytics League; **genres:** Team Management + Statistics.
- **Core play:** Group match datasets; visualize frequency distributions and dispersion, compare relative team performance and consistency.
- **Progression:** Tables → distributions → comparative analysis.
- **Evidence:** Working for appropriate grouped-data statistics and graph interpretation.

#### M5-08 — Mathematical Modeling
- **Game:** Save the City: Math Crisis; **genres:** City Simulation + Problem Solving.
- **Core play:** Collect data on transport, flooding or water demand, make assumptions, create a mathematical model, test and revise it.
- **Progression:** Identify variables → model → validate → communicate limitations.
- **Evidence:** Assumptions, model equations, verification, interpretation and reflections.

### 3.3 Form 4 Additional Mathematics — 10 chapters

#### A4-01 — Functions
- **Game:** Portal Function Quest; **genres:** Platform Puzzle + Portals.
- **Core play:** Enter function portals, compose functions and reverse with inverses where valid; domain/range restrictions determine reachable exits.
- **Evidence:** Function notation, mappings, compositions, inverse workings.

#### A4-02 — Quadratic Functions
- **Game:** Roller Coaster Designer; **genres:** Theme Park + Physics Puzzle.
- **Core play:** Tune quadratic parameters, roots, turning points and discriminant where aligned to make safe rail profiles.
- **Evidence:** Algebraic forms, graph properties, method and explanation.

#### A4-03 — Systems of Equations
- **Game:** Equation Crime Files; **genres:** Detective Puzzle.
- **Core play:** Combine clues into simultaneous equations, use algebraic/elimination/substitution techniques, and test solutions against story constraints.
- **Evidence:** Complete steps and solution validation.

#### A4-04 — Indices, Surds and Logarithms
- **Game:** Galaxy Power Core; **genres:** Space + Cipher Puzzle.
- **Core play:** Stabilize energy reactors by transforming index expressions, simplifying surds and solving logarithmic relationships.
- **Evidence:** Correct rules, restrictions and symbolic steps.

#### A4-05 — Progressions
- **Game:** Infinite Farm Empire; **genres:** Farming Tycoon.
- **Core play:** Apply arithmetic/geometric progression models to crop cycles, production upgrades and forecasts; interpret meaningful and unrealistic extrapolations.
- **Evidence:** nth term, sum, growth and reasoned decisions.

#### A4-06 — Linear Law
- **Game:** Science Lab X; **genres:** Lab Simulator + Data.
- **Core play:** Manipulate experimental variables and transform relationships into straight-line graphs; infer slope, intercept and required constants.
- **Evidence:** Transformed variables, axes, line of best fit, calculations.

#### A4-07 — Coordinate Geometry
- **Game:** Treasure Map Hunters; **genres:** Treasure Hunt + Navigation.
- **Core play:** Follow coordinate-based clues and compute gradients, distances, line equations and other verified chapter skills to locate treasure.
- **Evidence:** Coordinate constructions and justified routes.

#### A4-08 — Vectors
- **Game:** Drone Rescue Commander; **genres:** Rescue Strategy.
- **Core play:** Program drone movements with vectors; combine displacements, scale vectors and investigate parallelism/geometry as appropriate.
- **Evidence:** Vector diagrams, coordinates, notation and resultant vector.

#### A4-09 — Solution of Triangles — **elective-package topic**
- **Game:** Island Archery Quest; **genres:** Physics + Adventure.
- **Core play:** Calculate inaccessible sides/angles with the sine and cosine rules and area formula; manage ambiguous cases if included in the verified standards.
- **Evidence:** Diagrams, rule choice, calculations and ambiguity handling.

#### A4-10 — Index Numbers — **elective-package topic**
- **Game:** Inflation Empire; **genres:** Economic Tycoon.
- **Core play:** Compare basket prices over time using index numbers and composite indices; distinguish classroom data from real economic claims.
- **Evidence:** Correct weighted indices and contextual interpretation.

### 3.4 Form 5 Additional Mathematics — 8 chapters

#### A5-01 — Circular Measure
- **Game:** Ferris Wheel Tycoon; **genres:** Theme Park + Geometry.
- **Core play:** Set wheel angle, radius, arc length and sector area in a ride design puzzle. Convert units carefully.
- **Evidence:** Radians, geometry calculations, consistent units.

#### A5-02 — Differentiation
- **Game:** Calculus Speed Lab; **genres:** Racing + Optimization.
- **Core play:** Model motion/track or performance relationships, find rates of change and stationary points; choices alter speed and risk in a physically meaningful way.
- **Evidence:** Symbolic derivatives, gradient, stationary points, interpretation. Avoid conflating arbitrary game speed boost with mathematical derivative.

#### A5-03 — Integration
- **Game:** Build the Megacity; **genres:** Construction + Area Puzzles.
- **Core play:** Accumulate quantities and estimate land/section area under curves with integrals; visualize signed vs actual area when relevant.
- **Evidence:** Antiderivatives, definite-integral working, constants/units.

#### A5-04 — Permutation and Combination
- **Game:** Vault Heist: Mastermind; **genres:** Heist + Combinatorial Puzzle.
- **Core play:** Arrange crew positions or select teams/keys using permutations/combinations; player decides whether order matters.
- **Evidence:** Correct counting model, restrictions and calculation.

#### A5-05 — Probability Distribution
- **Game:** Probability Lab Monsters; **genres:** Collection Strategy + Data.
- **Core play:** Predict binomial/normal outcomes to allocate limited supplies and plan missions; show simulated versus theoretical distributions. No paid gacha systems.
- **Evidence:** Parameter choice, probability calculations, interpretation.

#### A5-06 — Trigonometric Functions
- **Game:** Wave Surfer Adventure; **genres:** Platformer + Rhythm.
- **Core play:** Manipulate periodic functions to synchronize moving platforms and waves; solve trigonometric identities/equations where syllabus-aligned.
- **Evidence:** Equations, graph features, transformation parameters.

#### A5-07 — Linear Programming — **elective-package topic**
- **Game:** Ultimate Restaurant Rush; **genres:** Co-op + Tycoon.
- **Core play:** Choose product amounts given ingredient/time constraints; graph feasible region, evaluate objective and decide optimal plan.
- **Evidence:** Constraints, objective function, corner point check, interpretation.

#### A5-08 — Kinematics of Linear Motion — **elective-package topic**
- **Game:** Rocket Physics Simulator; **genres:** Space Racing + Simulation.
- **Core play:** Link displacement, velocity and acceleration as functions of time to launch and landing; use differentiation/integration where appropriate.
- **Evidence:** Working, units, signed quantities, motion interpretation.

### 3.5 Coverage table for automation/import

| Game ID | Form | Subject | Ch | Topic | Flagship/Chapter game |
|---|---:|---|---:|---|---|
| M4-01 | 4 | Mathematics | 1 | Quadratic Functions and Equations in One Variable | Math Dunk Champions |
| M4-02 | 4 | Mathematics | 2 | Number Bases | Cyber Code Breaker |
| M4-03 | 4 | Mathematics | 3 | Logical Reasoning | Logic Detective Agency |
| M4-04 | 4 | Mathematics | 4 | Operations on Sets | Zombie Shelter Survival |
| M4-05 | 4 | Mathematics | 5 | Network in Graph Theory | GraphQuest: Delivery Empire |
| M4-06 | 4 | Mathematics | 6 | Linear Inequalities in Two Variables | Factory Zone Builder |
| M4-07 | 4 | Mathematics | 7 | Graphs of Motion | Speed Racer: Motion Lab |
| M4-08 | 4 | Mathematics | 8 | Measures of Dispersion for Ungrouped Data | Esports Team Manager |
| M4-09 | 4 | Mathematics | 9 | Probability of Combined Events | Probability Monster Arena |
| M4-10 | 4 | Mathematics | 10 | Consumer Mathematics: Financial Management | Financial Survival Tycoon |
| M5-01 | 5 | Mathematics | 1 | Variation | Candy Factory Simulator |
| M5-02 | 5 | Mathematics | 2 | Matrices | Matrix Mech Battle |
| M5-03 | 5 | Mathematics | 3 | Consumer Mathematics: Insurance | Life & Car Insurance Simulator |
| M5-04 | 5 | Mathematics | 4 | Consumer Mathematics: Taxation | Tax Tycoon Malaysia |
| M5-05 | 5 | Mathematics | 5 | Congruency, Enlargement and Combined Transformations | ShapeCraft World |
| M5-06 | 5 | Mathematics | 6 | Ratios and Graphs of Trigonometric Functions | Trigonometry Beat Rush |
| M5-07 | 5 | Mathematics | 7 | Measures of Dispersion for Grouped Data | Sports Analytics League |
| M5-08 | 5 | Mathematics | 8 | Mathematical Modeling | Save the City: Math Crisis |
| A4-01 | 4 | Additional Mathematics | 1 | Functions | Portal Function Quest |
| A4-02 | 4 | Additional Mathematics | 2 | Quadratic Functions | Roller Coaster Designer |
| A4-03 | 4 | Additional Mathematics | 3 | Systems of Equations | Equation Crime Files |
| A4-04 | 4 | Additional Mathematics | 4 | Indices, Surds and Logarithms | Galaxy Power Core |
| A4-05 | 4 | Additional Mathematics | 5 | Progressions | Infinite Farm Empire |
| A4-06 | 4 | Additional Mathematics | 6 | Linear Law | Science Lab X |
| A4-07 | 4 | Additional Mathematics | 7 | Coordinate Geometry | Treasure Map Hunters |
| A4-08 | 4 | Additional Mathematics | 8 | Vectors | Drone Rescue Commander |
| A4-09 | 4 | Additional Mathematics | 9 | Solution of Triangles [elective] | Island Archery Quest |
| A4-10 | 4 | Additional Mathematics | 10 | Index Numbers [elective] | Inflation Empire |
| A5-01 | 5 | Additional Mathematics | 1 | Circular Measure | Ferris Wheel Tycoon |
| A5-02 | 5 | Additional Mathematics | 2 | Differentiation | Calculus Speed Lab |
| A5-03 | 5 | Additional Mathematics | 3 | Integration | Build the Megacity |
| A5-04 | 5 | Additional Mathematics | 4 | Permutation and Combination | Vault Heist: Mastermind |
| A5-05 | 5 | Additional Mathematics | 5 | Probability Distribution | Probability Lab Monsters |
| A5-06 | 5 | Additional Mathematics | 6 | Trigonometric Functions | Wave Surfer Adventure |
| A5-07 | 5 | Additional Mathematics | 7 | Linear Programming [elective] | Ultimate Restaurant Rush |
| A5-08 | 5 | Additional Mathematics | 8 | Kinematics of Linear Motion [elective] | Rocket Physics Simulator |

---

## 4. Ten flagship games — cross-chapter experiences

These are cross-topic game franchises or larger projects; they **do not replace** the 36 chapter mappings.

| # | Franchise | Main loop and distinguishing feature | Subject coverage | Technical caution |
|---|---|---|---|---|
| 1 | **Candy Kart Math Rush** | Cute 3D candy kart driving; drift/collision/boost/item pickups; maths charges usable items without repeatedly pausing the race; friendly multiplayer | All Form 4/5 topic question packs; especially motion, algebra | Most technically demanding: touch control, 3D performance, lag, authoritative race state |
| 2 | **Math Fall Guys Challenge** | Party obstacle courses; mathematical gates, bridge logic, cooperative / elimination-style rounds | Mixed-topic revision | Avoid making slow readers auto-lose; fairness and mobile networking |
| 3 | **MathCraft Universe** | Voxel/low-poly building; transformations, roads, geometry and coordinates determine structures | Transformations, networks, coordinates | Scope control and mobile memory |
| 4 | **Math Dungeon Legends** | RPG quests, visual puzzles, boss encounters, equipment progression | Any through specific mathematical mechanics | Build one polished dungeon before broad content |
| 5 | **Math Survival Island** | Four-player-or-solo survival, resource allocation, routes and island exploration | Sets, variation, graphs and probabilities | Multiplayer optional; robust solo fallback |
| 6 | **Math Kitchen Chaos** | Cooperative kitchen stations, timed recipes, delivery and cost decisions | Ratio/variation, linear programming, operations | Local turn-taking first; realtime later |
| 7 | **Math Battle Royale** | Child-appropriate robot arena with nonviolent objectives, tactical ability energy | Matrices, vectors, mixed topic packs | Team balance and server costs |
| 8 | **The Missing Formula** | Detective escape-room narrative across school areas | Logic, equations, number bases, logs | Excellent lower-risk release choice |
| 9 | **Math Theme Park Empire** | Build amusement park, optimize design, visitor satisfaction, spending | Circular measure, calculus, graphs, finance | Scope and model realism |
| 10 | **Math Monsters Academy** | Collect, train and evolve original creatures through mastery challenges | Multiple subjects; probabilities and strategy | No microtransaction-driven loot boxes or problematic incentives |

### Candy Kart — minimum playable specification (first vertical slice)

- 1 small looping 3D candy track, 1 lightweight original kart, follow camera, reset button.
- Keyboard: arrows or WASD; touch: large accelerate/brake and steer buttons; optional assisted steering.
- Fixed simulation step where applicable, collision boundaries, respawn, lap timing, visibly responsive drift/boost.
- 1 independent, well-tested math item system: optional question station/overlay off racing line or math achievement that grants item energy; avoid blocking players unexpectedly.
- Include menu to select `Form 4/5`, `Mathematics/Additional Mathematics`, `chapter`, `difficulty`.
- Create 12+ reviewed starter questions per chosen slice rather than claiming the entire syllabus is populated.
- Mobile performance budget, reduced graphics settings and network-safe design; optional single-player initially.
- Later multiplayer: named room codes, joins/leaves, 2–4 participants pilot, then larger rooms; use server-authoritative results and measured latency before claiming full-class simultaneous play.

---

## 5. Development priority — do not confuse excitement with build order

Planning rubric: scores are **subjective hypotheses** on a 1–5 scale, not formal survey results.

| Rank | Game | Fun | Maths value | Relative build ease | Why/notes |
|---:|---|---:|---:|---:|---|
| 1 | Candy Kart Math Rush | 5 | 4 | 3 | Brand flagship; ambitious 3D multiplayer |
| 2 | Math Fall Guys | 5 | 4 | 3 | Strong class tournament potential |
| 3 | Math Dungeon Legends | 5 | 5 | 4 | Flexible multi-chapter RPG engine |
| 4 | Cyber Code Breaker | 4 | 5 | 5 | First robust playable MVP |
| 5 | GraphQuest | 4 | 5 | 5 | Excellent authentic concept game |
| 6 | Financial Survival Tycoon | 4 | 5 | 4 | Known existing project; improve and reuse |
| 7 | Matrix Mech Battle | 5 | 5 | 4 | Visual math and compelling robotics |
| 8 | Math Kitchen Chaos | 5 | 5 | 3 | Collaboration plus optimization |
| 9 | Portal Function Quest | 4 | 5 | 4 | Powerful functions intuition |
| 10 | Calculus Speed Lab | 5 | 5 | 4 | Strong Add Maths candidate |

**Build-order recommendation:** First create one production-worthy 2D game plus shared curriculum/assessment components. Then two more authentic math games. Then a small Candy Kart 3D prototype. Only after the basic products work introduce real-time multiplayer.

---

## 6. Shared CYE-MathVerse platform

### 6.1 Platform flow

```text
Student opens web URL
      |
      v
CYE-MathVerse Portal
      |
      +--> Subject / Form / Chapter / Difficulty / Game choice
      |
      +--> Game engine (2D, 3D or interactive web simulation)
      |       |
      |       +--> Curriculum-aligned challenge engine
      |       +--> Local saves / progress indicators
      |       +--> Instant feedback / hints / retry
      |
      +--> Trusted submission API (when available)
      |       |
      |       +--> Teacher dashboard and class analytics
      |       +--> Receipt with unique verification code
      |       +--> Downloadable PDF victory / learning report
      |
      +--> Teacher shares link via Google Classroom
```

### 6.2 Shared features required across games

1. **Student session/profile:** minimally necessary information; the teacher may request full name/class for Classroom hand-in, but prefer privacy-preserving IDs and never expose names publicly.
2. **Curriculum links:** topic, SK, SP, question provenance and review status for each challenge.
3. **Difficulty:** Easy, Medium, Hard; teacher can assign a range.
4. **Progression:** XP, achievements, optional cosmetic rewards, level unlocks.
5. **Helpful feedback:** workings, misconceptions, formative recovery.
6. **Boss/milestone challenges:** integrate concepts without impossible time pressure.
7. **Solo/team/multiplayer modes:** build incrementally.
8. **Teacher dashboard:** assignment status, concept errors, attempts, completion.
9. **PDF receipt:** full name/class if required, game, chapter, score/mastery, submission time, server-verified code where possible.
10. **Responsive web:** mobile portrait for many 2D games, landscape for racing where appropriate, accessibility and reduced-motion preferences.

### 6.3 Proposed data entities

```text
StudentSession: sessionId, optional pseudonymousStudentId, assignedClass, consentContext, startedAt
Game: gameId, title, engineType, releaseStatus, subjectCoverage[]
CurriculumUnit: curriculumVersion, subject, form, chapter, skCode, spCode, sourceUrl, verifiedAt
Question: questionId, curriculumUnitId, type, difficulty, prompt, inputs,
          answerSpec, acceptedForms, tolerancePolicy, workedSolution,
          misconceptionTags[], reviewerStatus, locale, version
Assignment: assignmentId, classRef, gameId, allowedTopics[], settings, dueAt
Attempt: attemptId, sessionId, questionId, answer, steps?, correct?,
         feedbackTags[], points, submittedAt, questionVersion
GameRun: runId, gameId, sessionId, start/end, stateSummary, score,
         masterySummary, integrityFlags[]
Receipt: receiptId, runId, verificationCode, signedServerRecord,
         issuedAt, revision
TeacherView: teacherId, classScope, permissionLevel
```

Do not use this proposed schema verbatim without a privacy/security review. Use a restricted identifier for students and store names only where necessary for school submission. Avoid exposing private Google Sheets to a public client.

### 6.4 Mathematics engine and marking rules

- Multiple-choice: compare stable option IDs, not text alone; randomize distractors carefully.
- Numeric answers: use exact rational arithmetic where possible, justified tolerance/rounding otherwise.
- Algebraic expressions: compare equivalence safely, not raw string equality; check domains and excluded values.
- Matrices/vectors: verify dimensions and components; retain working where relevant.
- Graph or drag answers: validate coordinates/regions/topology against tolerances and mathematical constraints.
- Explanations: rubric-based teacher review or clearly labeled AI-assisted formative comments. **Never treat generated feedback as a substitute for final human marking in consequential assessment.**
- Provide solutions and common error explanations written/reviewed by a maths educator.
- Question generators must have property tests, answer keys, adversarial edge-case tests and difficulty balance.

### 6.5 Teacher dashboard

- Filter by form, class, subject, chapter, lesson, assignment and attempt.
- Show: attempted/completed, accuracy by concept, common error tags, hints used, times, retry improvement, missing work and export.
- Avoid public ranking by full name; make classroom competitions opt-in, teacher-moderated and pseudonymous.
- Offer secure verification of a PDF receipt via server-backed receipt ID; a PDF with only a local random code is **not secure proof** against alterations.
- Teacher can download CSV and assign specific challenge links.
- Integration option: Google Apps Script + Google Sheets for small pilot, protected endpoints and careful quota/security handling. For scaling, move to proper server-side API and database.

### 6.6 Optional Google Classroom submission pattern

1. Teacher creates assignment with link and topic/difficulty.
2. Student selects class and enters an identity only if needed by the teacher.
3. Student completes required stage(s) and submits result.
4. Server stores authoritative run and issues verification token.
5. Student can download **Final Victory Report.pdf** at completion or reopen previously issued report from a safe receipt screen.
6. Teacher verifies receipt ID against server dashboard; do not trust editable PDF alone.
7. Provide a privacy notice, retention schedule and administrative delete/export process appropriate to school policy and Malaysian PDPA/school requirements.

---

## 7. Reference technology architecture

**Choose by game mechanics and device constraints; avoid using every framework in one build.**

| Need | Preferred approach | Alternatives / caveats |
|---|---|---|
| 2D runner/platformer/arena | Phaser + TypeScript (Vite) | Vanilla Canvas for small prototypes |
| Simulation / lesson UI | HTML/CSS/TypeScript or React | Lightweight vanilla JS for simpler lessons |
| Interactive graphs | SVG/Canvas, Plotly or a suitable math graphics lib | Favor correct scales and accessible labels |
| 3D web kart/adventure | Three.js + React Three Fiber where React helps | Plain Three.js for leaner bundles |
| Asset creation | Blender on Mac M2; low-poly `.glb`/glTF | Prebuilt legally licensed/open assets with attribution |
| Physics / collision | Rapier for browser where appropriate | Game-specific lightweight solutions |
| Multiplayer | Colyseus/WebSocket server; authoritative score | Pilot 2–4 players; scale with evidence |
| Web deployment | Existing Netlify, Cloudflare Pages/Workers | Choose based on current repository and budget |
| Backend/storage | Server-side API + D1/other DB; small pilot may use Apps Script/Sheets | Never embed secret credentials client-side |
| Testing | Vitest, Playwright, device checks, math property tests | Include low-memory mobile profile |
| PDF receipt | Browser-side for preview + server verified ID | Never claim client-generated-only receipt is tamper-proof |
| AI assistance | ChatGPT Desktop Work for orchestration; Codex for repo changes | Review and test all math and security logic |
| Godot | Godot 4 Web Export for selected game when fit justifies it | Validate Web export/mobile browser behavior and bundle size early |

### 7.1 Rules for 8 GB MacBook Air M2

- Use low-poly meshes, shared materials, modest textures, compressed `.glb` assets, level-of-detail as needed.
- Avoid rendering complex Blender scenes and running many heavy local services concurrently.
- Profile build size/memory and mobile GPU usage rather than relying on how fast it runs on the developer's laptop.
- No machine purchase is necessary for the first 2D MVP or lightweight 3D kart prototype.

### 7.2 Starter monorepo layout (suggestion, not an existing repo)

```text
cye-mathverse/
├── README.md
├── docs/
│   ├── CYE-MathVerse_Game_Universe_Master_Plan.md
│   ├── IMPLEMENTATION_STATUS.md
│   ├── curriculum-sources.md
│   ├── game-designs/
│   └── decisions/
├── apps/
│   ├── portal/
│   ├── teacher-dashboard/
│   └── games/
│       ├── cyber-code-breaker/
│       ├── graphquest/
│       ├── variation-factory/
│       └── candy-kart-math-rush/
├── packages/
│   ├── curriculum/
│   ├── question-engine/
│   ├── scoring/
│   ├── ui/
│   ├── game-bridge/
│   └── report-generator/
├── services/
│   ├── submissions-api/
│   └── multiplayer-server/  # only when implemented
├── assets/
│   ├── originals/
│   └── licenses-and-credits.md
└── tests/
```

**Important:** Before creating this structure, inspect the existing project and adapt. Do not rearrange a live repo simply to match this diagram.

---

## 8. Phased release roadmap

### Phase 0 — Inventory and curriculum validation

**Deliverables:** current repo/file inventory; 36-chapter coverage inventory; official DSKP SK/SP reference list; technical constraints; 1-page architecture decision record; agreed initial MVP. Keep source URLs and source dates. Do not invent syllabus details or silently substitute outdated curricula.

**Exit:** teacher can see exactly what exists, what's missing, and what will be built next.

### Phase 1 — Three production-quality classroom MVPs

1. **M4-02 Cyber Code Breaker:** first reference implementation with place-value conversion mechanics, 3–6 stages, rich feedback, 12–20 reviewed questions, completion receipt.
2. **M4-05 GraphQuest:** visual graph manipulation, route validation and teacher evidence; verify SP scope before adding minimum spanning tree enrichment.
3. **M5-01 Variation Factory:** visual direct/inverse/joint variation with equations, graph changes and teacher submissions; reuse existing interactive lesson plans if found.

**Shared outcomes:** basic profile/class input, reusable question schema, autosaving, mobile UI, teacher-readable exports, automated math tests, secure submission concept.

### Phase 2 — Reusable 2D gameplay engines

Build a compact playable starter for **RPG**, **Tycoon**, **Puzzle/Escape Room** and **Tower Defense**, designed so chapter packs are data-driven. Add Matrix Mech Battle or Portal Function Quest as high-impact next releases.

**Exit:** replacing a curriculum pack creates a substantively new playable chapter game without recoding the entire engine.

### Phase 3 — Candy Kart 3D and controlled multiplayer

- One original kart and small candy loop track.
- Stable desktop/mobile controls; performance mode.
- Working drift/boost/collision/lap system with a coherent maths power-up mechanic.
- Run single-player tests, then small 2–4-player room pilots, then progressively increase capacity only if server/network data supports it.
- No promise of 30–40 simultaneous 3D racers without controlled tests; class-wide tournaments can use heats and aggregate results.

### Phase 4 — All 36 curriculum chapters

Create a coverage matrix: chapter → SK/SP → actual game mechanics → question coverage → teacher QA → release. Flag elective packages appropriately, maintain versioning, add difficulty differentiation, and prioritize measured student learning value.

### Phase 5 — Competitions and teacher adoption

- Classroom/team challenges, configurable points, accessible alternatives and printable reports.
- School championships, assignment/term progress reports and versioned content.
- Evaluate student participation and learning improvement, not only gameplay time and leaderboard scores.

### Priority rule

At any time, favor **one complete learning-tested playable game** over three unfinished games or an expansive but inert world map.

---

## 9. Detailed first-release MVP: Cyber Code Breaker

**Why first:** authentic mechanic, strong visual feedback, minimal asset and server dependencies, easy to ship on inexpensive Android phones; ideal reference implementation for the larger platform.

### User story

> As a Form 4 student, I want to hack my way out of a fictional cyber-lab by converting numbers between bases, so that I can see place value and numerical equivalence rather than merely memorize steps.

### Game loop

1. Read a 15-second story/puzzle; tap a locked door.
2. Inspect a place-value board, choose a conversion and enter/assemble digits.
3. Preview the effect; valid solution triggers meaningful door/circuit interaction.
4. If incorrect, show the specific mistaken position/base and a hint. Retry.
5. Earn a key or tool, progress to a new mechanic, eventually complete a boss lock.
6. Finish with skills summary and download/submission receipt; retain ability to recover prior valid receipt.

### Suggested stages

| Stage | Mechanic | Educational purpose | Assessment evidence |
|---|---|---|---|
| 1. Power On | Build digits from weighted place-value chips | Understand a number's base | Contributions for each digit |
| 2. Binary Gate | Convert decimal ↔ binary | Place-value fluency | Converted value + explanation |
| 3. Cross-Base Relay | Convert between permitted bases | Representations | Valid conversions |
| 4. Logic Circuit | Apply operations within verified scope | Transfer and accuracy | Workings, checking |
| 5. Security Maze | Choose a path by decoding multiple locks | Multi-step application | Steps and time |
| 6. Master Vault | Mixed challenge + final report | Retrieval and mastery | Topic-level mastery summary |

For the first iteration create a **small curated set of 12–20 verified questions**; a larger question bank is a later editorial task. Do not invent an SP number.

### Definition of done — MVP

- App loads from localhost and a static production build is generated successfully.
- Keyboard/touch controls work; layout fits ~360px mobile width; clear landscape/portrait prompt if needed.
- All six planned stages can be completed without impossible states, or stage scope is explicitly adjusted and documented.
- Answer validation is covered by tests for zero, leading-zero handling, invalid digit in base, equivalent representations and edge cases.
- Correct/incorrect states show useful learning feedback.
- Progress survives refresh where locally appropriate; student is warned if data is device-only.
- Honest receipt: download works, and server verification is either implemented/tested or clearly labeled `local/unverified`.
- At least one teacher can open the game, assign it and understand the student learning result.
- No credentials in public bundle; basic accessibility checks pass.

---

## 10. Student-experience and accessibility requirements

- **Look and feel:** colorful, original, playful, not childish for older students. Consider candy pastel for racing; sci-fi for cyber/matrices; modern minimalist typography for teaching overlays.
- **Performance:** playable on modest Android and low-spec laptops; textures and effects scale down automatically; loading feedback and compressed assets.
- **Input:** touch targets ≥44 CSS px where practical; keyboard alternatives; avoid mandatory gestures requiring fine motor precision.
- **Comprehension:** English math instructions with optional BM/Chinese help; consistent LaTeX/notation; never depend on color alone.
- **Accessibility:** captions for essential sounds; reduced-motion option; pause; adjustable volume and timers; readable contrast; hint mode.
- **Fairness:** in multiplayer, balance math challenge difficulty, latency and accessibility; collaboration option; achievements not based solely on speed.
- **Student well-being:** no real-money gambling mechanics, predatory loops or chat features open to strangers; moderate competition rewards and teacher moderation.
- **Mobile compatibility:** do not require in-game text entry while driving; isolate input contexts and test browser virtual keyboards.

---

## 11. Analytics, measurement and improvement plan

Keep collection minimal and purpose-limited. Avoid exact location, biometric, medical or unnecessary personal data.

| Goal | Evidence | Useful teacher action |
|---|---|---|
| Students can access game | Load success rate, median load time, device type category | Offer low-bandwidth mode |
| Mathematics mastery | Correct answers by verified SK/SP and misconception | Reteach specific concepts |
| Persistence | Retry after hint, improvement between attempts | Adjust difficulty/hints |
| Authentic engagement | Completed levels, return usage *in context* | Improve pacing |
| Fair competition | Completion and improvement across groups | Rebalance items or latency |
| Classroom use | Assignment completion, PDF receipt verification | Follow up with students |

Suggested pilot: teacher reviews 10–20 questions and tests with a few students first; then pilot with one class. Collect short, voluntary feedback about fun, confusion and perceived learning. Do **not** present subjective fun scores in this document as empirical measurements.

---

## 12. Risks and guardrails

| Risk | Mitigation |
|---|---|
| Game fun overwhelms mathematics | Define math-affects-world mechanics and SK/SP checks before visuals |
| Incorrect auto-generated answer key | Human review + independent computation + property-based tests |
| Too broad a 36-game scope | Small release milestones and reusable engines |
| 3D mobile performance | Low-poly assets, profiling, fallback settings |
| Multiplayer cheating/latency | Server-authoritative state and scores, capped pilot rooms |
| Minors' identity exposure | No public full names; minimization, access controls, deletion policy |
| Fake PDF reports | Server verification code and read-only trusted records |
| Expensive API/hosting usage | Prefer static games, monitor quotas, avoid premature backend |
| Unverified KSSM details | DSKP checks per game, reviewed SP mapping, dated sources |
| Licensed/IP infringement | Use original characters and art; do not copy Mario/Roblox/Fall Guys assets, trademarks or music |
| Malaysian rates change | Annotate year/source and use safe example values as defaults |
| Backend unavailable | Offline-tolerant game, clear pending/unverified status |

---

## 13. Agent execution work orders

### Work Order A — first use in ChatGPT Desktop Work

Copy the prompt below into **Desktop Work** with this Markdown file attached or placed in the workspace. If the workspace contains an existing CYE-MathVerse repo, the agent should inspect it first.

```text
Read CYE-MathVerse_Game_Universe_Master_Plan.md fully. Treat it as the project brief.
First inspect the workspace and existing CYE-MathVerse code/assets; do not overwrite or refactor a functioning game without documenting a reason. Identify all existing games and what is already built versus planned. Validate the Form 4 Number Bases curriculum requirements against the official KSSM DSKP, citing the sources you used. Produce a prioritized technical implementation checklist, then immediately build the smallest fully playable first release of Cyber Code Breaker if the repository is ready, or bootstrap a clean project if none exists. Include a genuinely mathematical place-value puzzle, at least 3 working levels initially, 12 verified questions, mobile support, meaningful feedback, working scoring and local receipt, and unit/build tests. Use no credentials or paid APIs. Keep the structure expandable to the six-stage design. Document all decisions and provide exact run/test commands. Do not deploy publicly or submit student data without my approval.
```

### Work Order B — reuse or enhance an existing game

```text
Read the master plan. Inspect the existing game folder and run it locally first. Audit learning mechanics, question quality, mobile performance, UI, input accessibility, report integrity and maintainability. Give an ordered backlog of 10–20 concrete improvements, then implement the highest-value 2–3 safe improvements in an isolated branch. Avoid changing live data or deployment without permission. Test and document results.
```

### Work Order C — start Candy Kart Math Rush prototype

```text
Read the master plan and locate existing Candy Kart work, if any. Build a one-track, one-kart low-poly web prototype compatible with MacBook Air M2 8 GB development and mainstream mobile browsers. Prioritize visibly responsive driving, steer/accelerate/brake, drift/boost, track collisions, lap/reset, responsive HUD and performance mode. Integrate one syllabus-aligned mathematics-to-item-energy mechanic that does not freeze driving. Start with single player, and document the later 2–4-player server architecture. Do not claim full multiplayer until tested. Build, verify locally and explain run instructions.
```

### Work Order D — teacher dashboard and Google Classroom receipt

```text
Read the master plan. Inspect any existing submissions backend, Google Apps Script and teacher sheet/database. Design a student-safe submission schema and teacher-only report verification. Implement minimal secure submission and PDF receipt issuance in test mode with 1 class and 1 game. Distinguish verified online receipts from offline/local ones. Do not make the API or identifiable student data public. Document retention, permission and deployment needs; ask before linking to real school accounts or going live.
```

---

## 14. Agent deliverable format

For each working iteration include:

1. **Inventory:** repo paths read, what existed, source versions.
2. **Curriculum traceability:** KSSM subject/form/chapter, verified SK/SP, links and dates.
3. **Changes:** exact files changed/new, screenshots or preview when available.
4. **Playable outcome:** describe interaction actually implemented, not merely planned.
5. **Tests:** run/build/test commands, pass/fail and untested items.
6. **Teacher experience:** how to assign and interpret the report.
7. **Student experience:** how to open and play on Android/desktop.
8. **Risks:** privacy/security/performance and remaining blockers.
9. **Next small milestone:** scoped acceptance criteria.

`IMPLEMENTATION_STATUS.md` may use this checklist:

```markdown
# Implementation status
- Date:
- Repo / working directory:
- Existing code discovered:
- Target game / chapter:
- Curriculum verification (source, SK/SP, date):
- Implemented and working:
- Tested (commands/results):
- Not yet implemented:
- Privacy/security/performance concerns:
- Deploy status (local / staging / approved production):
- Next milestone:
```

---

## 15. References and verification notes

Use **official current DSKP and official assessment guidance** as the source of truth when developing individual questions or marking logic. The following links are discovery/reference aids, not automatically authoritative on their own:

- KSSM Mathematics Form 4–5 DSKP, school-hosted index (BM and English): https://sites.google.com/moe-dl.edu.my/panitia-matematik-plb/dskp
- KSSM Mathematics DSKP reproduction, curriculum chapter structure: https://fliphtml5.com/jzuki/tdkv/DSKP_KSSM_MATEMATIK_Tingkatan_4_DAN_Tingkatan_5_/43/
- KSSM Additional Mathematics Form 4–5 DSKP, school-hosted index: https://sites.google.com/moe-dl.edu.my/td2addmath/dskp
- KSSM Additional Mathematics DSKP section indicating **core versus elective packages**: https://fliphtml5.com/emhso/luld/DSKP_KSSM_MATEMATIK_TAMBAHAN_T4_DAN_T5-min_%281%29/44/
- Cross-check chapter indexes: https://spmmath.com.my/syllabus and https://www.jomstudyspm.my/nota/addmath
- Example game for inspection (user's prior project, live content may change): https://cye-mathverse.netlify.app/financial-survival-tycoon/

### Accuracy commitments

- The **36 chapter titles** are the standard KSSM Form 4–5 textbook-level planning sequence reviewed on 2026-10-18.
- **Do not infer that every fine-grained topic mentioned in a game concept is officially examinable.** Confirm against the specific SP before writing a level.
- Additional Mathematics chapters **A4-09, A4-10, A5-07 and A5-08** relate to elective-package fields in the DSKP; represent this accurately in teacher settings.
- The user asked for the *latest syllabus*. Curriculum updates can occur: re-check official sources before publishing anything described as "latest" or using SPM exam formats.
- Suggested games, ratings, architectures and difficulty estimates are proposals, **not finished implementations or empirical test results**.

---

## 16. Final project strategy

**Avoid writing 36 unrelated codebases.** Aim for **6–8 highly polished reusable game engines**, each supporting chapter- and objective-specific tasks. Create one carefully completed game, validate the learning design with students, then scale through data-driven curriculum packs and genuinely relevant mechanics. Design the portal, question schema, game bridge and reporting carefully enough that the games can eventually form a coherent **CYE-MathVerse** universe, while keeping every initial release useful on its own.

**First action after reading this plan in Desktop Work:** inspect the workspace; report the existing-versus-planned inventory; validate the target chapter against KSSM; then implement a modest, playable, tested Phase 1 slice without waiting to design the entire universe.
