# v443 managed audit adapter route group split roadmap

## Scope

Node v443 extracts the managed audit adapter boundary, compliance, and runner audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditAdapterRoutes.ts`.

The extracted group contains the existing managed adapter boundary, compliance harness, and harness runner routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v442, the central route table still owned three managed adapter route registrations and their service imports directly.
- Later consumer: future route-table work can now move into managed persistence and identity routes without carrying the adapter boundary/compliance/runner registrations in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v443 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v443 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit adapter route-group regression test passed: 1 file / 1 test.
- Adjacent managed adapter tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 376 files / 1202 tests.
- Browser screenshot is not required because v443 does not add or change a renderable UI page.
