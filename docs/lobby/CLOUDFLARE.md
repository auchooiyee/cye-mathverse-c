# Cloudflare Pages release

Authorized destination: https://github.com/auchooiyee/cye-mathverse-c.git
Requested production address: https://cye-mathverse-c.pages.dev

Connect the existing GitHub repository in Cloudflare Pages. Use these settings:

| Setting | Value |
|---|---|
| Project name | cye-mathverse-c |
| Production branch | main |
| Framework preset | None |
| Root directory | Repository root |
| Build command | npm run build && npm test |
| Build output directory | dist |
| Node version | 22 (NODE_VERSION environment variable) |

Only files copied to `dist/` are published. Source docs, teacher keys, tests and status are not part of the site. Backups, generated screenshots/test receipts, original full-size artwork and local environment files are excluded from Git. Existing local launchers remain available.

The hosted lobby uses relative links for the three games; it never sends students to localhost. Hosted saves remain namespaced per game and stored in that browser. Existing local saves can be exported and restored with each game's settings; the online origin cannot read the local origin's storage. No student login, analytics, backend, database or paid services are required.

`deploy/cloudflare/_headers` supplies the same restrictive network policy as the local preview. Cloudflare Pages serves the built static files; no Node server or Functions run in production. Keep automatic Web Analytics disabled for this release.

After deploying, verify root → lobby, every game/return path, one completed task per game, saved progress after reload, mobile layout and filter buttons. Confirm HTTPS responses and no remote resource requests. Check the deployment status/URL in Cloudflare before claiming it is live.

## Verified release — 2026-10-19

Production URL: https://cye-mathverse-c.pages.dev

Cloudflare reported success for the first production deployment `d87ba5a1-7946-401a-a49b-5487c998408b`, built from GitHub commit `edcc2dcde9f4364fd17a356aa53f8351a8a4421f`. The project overview confirms GitHub source, `main` production branch and automatic deployments enabled. Cloudflare's existing GitHub app access was extended only to the requested repository after the user completed GitHub verification and explicitly approved the displayed repository permissions. Existing repository access was retained.

50 unit/build/content tests passed locally and again in a clean GitHub checkout. The live production browser suite passed three scenario groups: HTTPS root/relative links/headers/online guidance; actual first-task completion and independent save recovery in all three games; form filters and mobile layout. Zero captured page errors and external requests. Test profiles contain only synthetic data; personal browser saves were untouched.

Evidence: `artifacts/hosting/live-report.json`, `live-desktop.png`, `live-mobile.png`, `github-checkout-tests.tap`; artifacts are local and excluded from Git/public output. Physical Android/iPad/Safari classroom tests remain pending. An early live test checked the lobby before its deferred script loaded after the root redirect; an explicit readiness wait resolved the test race without a production change.

Later commits update the release documentation/test readiness waits; game assets are unchanged from this verified production release.
