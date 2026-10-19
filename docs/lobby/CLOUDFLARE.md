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
