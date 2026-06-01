# v452 managed audit manual sandbox connection packet route group split roadmap

## Scope

Node v452 extracts the managed audit manual sandbox connection evidence checklist, operator packet, and packet verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionPacketRoutes.ts`.

The extracted group contains the existing packet-preparation route chain for the manual sandbox connection flow.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v451, the central route table still owned the manual sandbox connection packet-preparation route registrations directly.
- Later consumer: future manual sandbox connection preflight/readiness route-table work can continue without carrying the packet-preparation chain inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v452 stops at route registration extraction and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v452 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit manual sandbox connection packet route-group regression test passed: 1 file / 1 test.
- Adjacent evidence checklist, operator packet, and packet verification tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 385 files / 1211 tests.
- Browser screenshot is not required because v452 does not add or change a renderable UI page.
