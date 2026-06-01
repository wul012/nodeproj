# v446 managed audit restore drill route group split roadmap

## Scope

Node v446 extracts the managed audit packet restore drill plan and restore drill archive verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditRestoreDrillRoutes.ts`.

The extracted group contains the existing restore drill plan and archive verification routes.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Necessity Proof

- Blocker resolved: after v445, the central route table still owned the restore drill plan and archive verification route registrations directly.
- Later consumer: future route-table work can now move into dry-run adapter and hardening routes without carrying the restore drill closeout pair in the central table.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v446 stops at route registration extraction and focused regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v446 is a Node route-table refactor and is not a pre-approval blocker for upstream project work.

## Validation Result

- Focused managed audit restore drill route-group regression test passed: 1 file / 1 test.
- Adjacent restore drill tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.
- Full Vitest shards passed: 379 files / 1205 tests.
- Browser screenshot is not required because v446 does not add or change a renderable UI page.
