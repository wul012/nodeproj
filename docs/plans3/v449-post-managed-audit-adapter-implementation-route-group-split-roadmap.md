# v449 managed audit adapter implementation route group split roadmap

## Scope

Node v449 extracts the managed audit adapter implementation precheck packet and disabled shell audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditAdapterImplementationRoutes.ts`.

The extracted group contains the existing implementation precheck and disabled adapter shell routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v448, the central route table still owned the adapter implementation precheck and disabled shell route registrations directly.
- Later consumer: future route-table work can now move into local/external adapter route groups without carrying the implementation shell pair in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v449 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v449 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit adapter implementation route-group regression test passed: 1 file / 1 test.
- Adjacent implementation precheck and disabled shell tests passed: 3 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 382 files / 1208 tests.
- Browser screenshot is not required because v449 does not add or change a renderable UI page.
