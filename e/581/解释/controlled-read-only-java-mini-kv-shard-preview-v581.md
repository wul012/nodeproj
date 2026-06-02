# Node v581 explanation: controlled read-only Java/mini-kv shard preview

v581 moves the post-v580 direction from archive growth into a controlled read-only shard preview.

## Necessity proof

- Blocker resolved: the project needed a real next-step runtime-facing slice instead of another archive verification layer.
- Later consumer: Node v582 can archive or smoke this preview output if the read window remains stable.
- Existing report cannot be reused alone: v371 proved a historical live-read gate, while v581 publishes a current preview surface with explicit no-router/no-write boundaries.
- Growth stop condition: this adds one preview route and one focused test set. It does not start a new approval chain, route archive chain, active router, write path, or runtime execution lane.

## Change

- Added `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview`.
- Split the preview into service, support, types, and renderer files so the runtime-facing change does not become another large service file.
- Added a Markdown renderer for the preview profile.
- Registered one audit JSON/Markdown route:
  `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview`.
- The route reads Java through `GET /api/v1/ops/shard-readiness` and mini-kv through `SHARDJSON` only when `UPSTREAM_PROBES_ENABLED=true`.
- The route remains blocked when probes are disabled and never starts, stops, writes, restores, loads, compacts, or activates shard routing.
- Archived a local read-only smoke against mock Java and mini-kv services:
  - `e/581/evidence/controlled-read-only-shard-preview-v581-http.json`
  - `e/581/evidence/controlled-read-only-shard-preview-v581-http.md`
  - `e/581/图片/controlled-read-only-shard-preview-v581.png`

Java and mini-kv can continue in parallel. Node v581 consumes only their read-only readiness surfaces and does not require Node-owned service startup.

Validation completed:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- Local HTTP smoke on port `4190` with mock Java `18081` and mock mini-kv `16379`.
- Playwright MCP screenshot of the Markdown route. The only browser console error was `favicon.ico` 404, not a route failure.
