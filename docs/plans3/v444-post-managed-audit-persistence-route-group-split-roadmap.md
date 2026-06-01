# v444 managed audit persistence route group split roadmap

## Scope

Node v444 extracts the managed audit persistence boundary candidate and dry-run verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditPersistenceRoutes.ts`.

The extracted group contains the existing managed persistence candidate and local dry-run verification routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v443, the central route table still owned the managed persistence candidate and dry-run route registrations directly.
- Later consumer: future route-table work can now move into identity approval and provenance routes without carrying the persistence dry-run chain in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v444 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v444 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit persistence route-group regression test passed: 1 file / 1 test.
- Adjacent managed persistence tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 377 files / 1203 tests.
- The focused route-group test sets `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv historical paths resolve under `fixtures/historical/sibling-workspaces/...`.
- Browser screenshot is not required because v444 does not add or change a renderable UI page.
