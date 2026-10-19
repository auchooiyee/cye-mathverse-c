# Architecture decision 001 — local reference slice

Accepted 2026-10-18. Follow Work Order A; scope all six rooms to two challenges each (12 total). No time pressure; full XP is earned after successful recovery, with first-attempt and hint evidence tracked separately. Guided exploration and independent attempts are distinguished in exports. Students choose the order of the two maze locks and a cosmetic robot colour; rewards are deterministic.

Use browser ES modules, semantic HTML controls and original SVG scenery. Exact bounded integer arithmetic validates number bases; no eval, network services or dependencies. A versioned question pack carries provenance, intended standards and teacher-review state. Shared math/session/report modules can support later Phase 1 games. Node's built-in test runner and static copy build keep Mac memory and setup costs low.

Run a loopback-only HTTP server. A Mac `.command` launcher opens the local game without installation. A 127.0.0.1 URL works only on this Mac, not on a student's phone. Mobile is tested using browser emulation; physical phones require a later approved local-network or hosted configuration.

Store optional alias/class and bounded attempt history under one namespaced browser key. Protect unreadable saves from overwrite, allow raw backup, and support storage-disabled play with explicit warning. Receipts are local/unverified HTML (print to PDF), JSON and CSV. No passwords, student full names, remote collection or public leaderboards.

Future secure submission: separate authenticated teacher API, class-scoped access, server-side validation, idempotent run submission, retention/deletion, signed receipt linked to a private record. None of this is implemented; local receipts are editable evidence for formative review only.


## Extension 003 — Variation Factory

Keep accepted game modules immutable; extend the shared local public-file allowlist and launcher with a third game path/port. Use a separate versioned order pack and save state because factory inputs differ from digit locks and graph routes. New exact rational arithmetic validates constants and outcomes; SVG graph drawing uses numeric approximations only for presentation. Public report escaping is reused from the accepted module without modifying it. Factory receipts store attempted settings and exact workings; completion is persisted before animation. Shared build budget becomes 240 KB for three games, with actual public files about 180 KB.

## Extension 004 — local game lobby

The root route and packaged root redirect now open `apps/lobby/`. Keep three legacy origins (127.0.0.1 ports 4186, 4187, 4188), because localStorage is origin-specific. `play-lobby.mjs` starts all three with the same public allowlist and reuses compatible existing servers; it never kills another process. Partial startup failures close only newly owned servers. On known legacy ports, lobby cards use each game's original origin. Other preview/static origins use relative links. No automatic save migration, cross-origin storage access, new profiles, progress aggregation or data collection.

Each game's HTML gains one marked shared script include. It inserts an isolated navigation bar and a return link inside the first-visit modal. All game logic, scoring, state schemas, artwork and existing launchers remain unchanged. Game-port origins keep separate saves; the shared lobby is served on each origin, so return navigation also works from an individual launcher. The unified launcher is required to make all destinations available together.

Source and dist serving still use an explicit public-file allowlist; backups, teacher keys and status files are not served. Browser network policy is unchanged. This remains local-only and does not enable access from student phones.
