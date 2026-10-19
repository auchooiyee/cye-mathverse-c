# Cyber Code Breaker — teacher review register

Pack: cyber-1.0.0 · 2026-10-18 · 12 original questions. Automated arithmetic check: passed.

**User playtest and question acceptance — 2026-10-18:** the user reported completing the game and confirmed all questions were acceptable: “已经试完了游戏，全部问题都没问题，都可以。” All 12 items therefore have user acceptance. The register below tracks the separate formal curriculum/teacher sign-off, which was not explicitly supplied. Student engagement and full SP coverage have not been established by this acceptance.

| ID | Sector | SP | Difficulty | Teacher / date | Decision |
|---|---|---|---|---|---|
| C01 | Power On | 2.1.1 | foundation | — | Pending |
| C02 | Power On | 2.1.1 | foundation | — | Pending |
| C03 | Binary Gate | 2.1.2 | standard | — | Pending |
| C04 | Binary Gate | 2.1.2 | standard | — | Pending |
| C05 | Cross-Base Relay | 2.1.2 | standard | — | Pending |
| C06 | Cross-Base Relay | 2.1.2 | standard | — | Pending |
| C07 | Logic Circuit | 2.1.3 | standard | — | Pending |
| C08 | Logic Circuit | 2.1.3 | standard | — | Pending |
| C09 | Security Maze | 2.1.2 | standard | — | Pending |
| C10 | Security Maze | 2.1.4 | standard | — | Pending |
| C11 | Master Vault | 2.1.3 | challenge | — | Pending |
| C12 | Master Vault | 2.1.4 | challenge | — | Pending |

## C01 — Generator A

Build a binary signal carrying 5 units of power.

Worked solution: 5 (base 10) = 5 × 10^0 = 5. Output: 101 (base 2); 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 5.

Intended SP: 2.1.1. Misconception checks: valid digits, powers of the base, zero places.

## C02 — Generator B

This generator uses base 3. Give it 11 units of power.

Worked solution: 11 (base 10) = 1 × 10^1 + 1 × 10^0 = 11. Output: 102 (base 3); 1 × 3^2 + 0 × 3^1 + 2 × 3^0 = 11.

Intended SP: 2.1.1. Misconception checks: valid digits, powers of the base, zero places.

## C03 — Bridge transmitter

Transmit 13 units using the binary bridge controller.

Worked solution: 13 (base 10) = 1 × 10^1 + 3 × 10^0 = 13. Output: 1101 (base 2); 1 × 2^3 + 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 13.

Intended SP: 2.1.2. Misconception checks: valid digits, powers of the base, zero places.

## C04 — Bridge receiver

The bridge replies with 10110 in base 2. Set its decimal receiver.

Worked solution: 10110 (base 2) = 1 × 2^4 + 0 × 2^3 + 1 × 2^2 + 1 × 2^1 + 0 × 2^0 = 22. Output: 22 (base 10); 2 × 10^1 + 2 × 10^0 = 22.

Intended SP: 2.1.2. Misconception checks: valid digits, powers of the base, zero places.

## C05 — Violet relay

Relay 23 in base 4 to a base-3 receiver without changing its value.

Worked solution: 23 (base 4) = 2 × 4^1 + 3 × 4^0 = 11. Output: 102 (base 3); 1 × 3^2 + 0 × 3^1 + 2 × 3^0 = 11.

Intended SP: 2.1.2. Misconception checks: valid digits, powers of the base, zero places.

## C06 — Azure relay

Relay 34 in base 5 to a binary receiver.

Worked solution: 34 (base 5) = 3 × 5^1 + 4 × 5^0 = 19. Output: 10011 (base 2); 1 × 2^4 + 0 × 2^3 + 0 × 2^2 + 1 × 2^1 + 1 × 2^0 = 19.

Intended SP: 2.1.2. Misconception checks: valid digits, powers of the base, zero places.

## C07 — Charge combiner

Combine 101 and 11, both in base 2. Send the sum in base 2.

Worked solution: 101 (base 2) = 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 5; 11 (base 2) = 3; 5 + 3 = 8. Output: 1000 (base 2); 1 × 2^3 + 0 × 2^2 + 0 × 2^1 + 0 × 2^0 = 8.

Intended SP: 2.1.3. Misconception checks: valid digits, powers of the base, zero places, operation after decoding.

## C08 — Charge regulator

The circuit holds 32 in base 5 and uses 14 in base 5. Send the remaining charge in base 5.

Worked solution: 32 (base 5) = 3 × 5^1 + 2 × 5^0 = 17; 14 (base 5) = 9; 17 - 9 = 8. Output: 13 (base 5); 1 × 5^1 + 3 × 5^0 = 8.

Intended SP: 2.1.3. Misconception checks: valid digits, powers of the base, zero places, operation after decoding.

## C09 — Rooftop lock

A rooftop lock expects the binary equivalent of the route code 31 in base 4.

Worked solution: 31 (base 4) = 3 × 4^1 + 1 × 4^0 = 13. Output: 1101 (base 2); 1 × 2^3 + 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 13.

Intended SP: 2.1.2. Misconception checks: valid digits, powers of the base, zero places.

## C10 — Tunnel lock

A tunnel lock receives 110 in base 3. Translate this signal into base 4.

Worked solution: 110 (base 3) = 1 × 3^2 + 1 × 3^1 + 0 × 3^0 = 12. Output: 30 (base 4); 3 × 4^1 + 0 × 4^0 = 12.

Intended SP: 2.1.4. Misconception checks: valid digits, powers of the base, zero places.

## C11 — Vault batteries

Join batteries holding 27 and 15, both in base 8. Set the base-6 vault controller to their total.

Worked solution: 27 (base 8) = 2 × 8^1 + 7 × 8^0 = 23; 15 (base 8) = 13; 23 + 13 = 36. Output: 100 (base 6); 1 × 6^2 + 0 × 6^1 + 0 × 6^0 = 36.

Intended SP: 2.1.3. Misconception checks: valid digits, powers of the base, zero places, operation after decoding.

## C12 — Escape pod

The pod has 101101 units in base 2. Reserve 12 decimal units for landing. Encode the remaining flight power in base 5.

Worked solution: 101101 (base 2) = 1 × 2^5 + 0 × 2^4 + 1 × 2^3 + 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 45; 12 (base 10) = 12; 45 - 12 = 33. Output: 113 (base 5); 1 × 5^2 + 1 × 5^1 + 3 × 5^0 = 33.

Intended SP: 2.1.4. Misconception checks: valid digits, powers of the base, zero places, operation after decoding.

## Review before classroom release

Check curriculum currency, suitability of each contextual SP mapping, mathematical wording, difficulty and hint clarity. In the pupil pilot, ask what was fun, where they got stuck, and whether the circuit model helped explain place value. Record actual evidence rather than assuming engagement.
