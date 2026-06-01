# v448 managed audit route quality route group split roadmap

## Scope

Node v448 extracts the managed audit route helper quality pass and route registration table quality pass audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditRouteQualityRoutes.ts`.

The extracted group contains the existing route-quality reports only.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v447, the central route table still owned the route-quality report registrations directly.
- Later consumer: future route-table work can now move into adapter implementation and local/external adapter route groups without carrying historical route-quality reports in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v448 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v448 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit route-quality route-group regression test passed: 1 file / 1 test.
- Adjacent route-quality tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 381 files / 1207 tests.
- Browser screenshot is not required because v448 does not add or change a renderable UI page.
