# Unified game lobby — 2026-10-19

User accepted Wonderworks: “剛剛試完了遊戲，我覺得可以。” Authorized one local entrance for students.

Inventory: three tested Phase 1 games, independent launchers and browser saves at ports 4186, 4187, 4188. Existing art and modules are reusable; no lobby exists. Master plan read in prior iterations; Sections 0/13 revisited. No new curriculum claims or grading changes.

Build a responsive spaceport with three playable worlds, Form 4/5 filters, simple bilingual descriptions, keyboard navigation, reduced motion and a return path. Reuse the factory panorama; draw original lightweight SVG cyber and route scenes. Avoid accounts, rankings, aggregated scores or collecting student information.

Preserve the existing three origins with a unified launcher that starts their servers together. On standard local ports, cards lead to the original game port. On arbitrary preview/static ports, links stay same-origin. Do not migrate or modify saves. Preserve all game logic/assets; only add a marked shared navigation include to each HTML head. Keep original HTML backups and verify original hashes after removing that exact include.

Test build/unit checks, lobby filters and all three game/return flows, real local-origin save continuity, repeated launcher startup, occupied-port errors, narrow-screen layout, keyboard, reduced motion, no remote requests, static fallback and old game regressions. Update status and guide with actual results and limits.
