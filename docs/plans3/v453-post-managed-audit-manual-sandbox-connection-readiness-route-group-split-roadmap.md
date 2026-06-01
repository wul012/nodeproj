# v453 managed audit manual sandbox connection readiness route group split roadmap

## Scope

Node v453 extracts the managed audit manual sandbox connection preflight gate, preflight verification, rehearsal packet review, blocked execution rehearsal, precondition intake, dry-run request envelope, and readiness gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionReadinessRoutes.ts`.

The extracted group contains the existing preflight-to-readiness route chain for the manual sandbox connection flow.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v452, the central route table still owned the manual sandbox connection preflight/readiness route registrations directly.
- Later consumer: future operator-window and command-package route-table work can continue without carrying the preflight/readiness chain inside the central route table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v453 stops at route registration extraction and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v453 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit manual sandbox connection readiness route-group regression test passed: 1 file / 1 test.
- Adjacent preflight, rehearsal, precondition, envelope, and readiness tests passed: 8 files / 22 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 386 files / 1212 tests.
- Browser screenshot is not required because v453 does not add or change a renderable UI page.
