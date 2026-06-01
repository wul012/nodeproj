# v447 managed audit dry-run adapter route group split roadmap

## Scope

Node v447 extracts the managed audit dry-run adapter candidate, dry-run adapter archive verification, and production-hardening readiness gate audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditDryRunAdapterRoutes.ts`.

The extracted group contains the existing local dry-run adapter candidate, archive verification, and production-hardening readiness gate routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v446, the central route table still owned the dry-run adapter and production-hardening readiness route registrations directly.
- Later consumer: future route-table work can now move into route-quality and local/external adapter routes without carrying the dry-run adapter chain in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v447 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v447 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit dry-run adapter route-group regression test passed: 1 file / 1 test.
- Adjacent dry-run adapter and production-hardening tests passed: 4 files / 11 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 380 files / 1206 tests.
- The focused route-group test sets `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv historical paths resolve under `fixtures/historical/sibling-workspaces/...`.
- Browser screenshot is not required because v447 does not add or change a renderable UI page.
