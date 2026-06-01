# Node v450 Code Walkthrough: managed audit local adapter route group split

## Goal

v450 keeps shrinking the central audit route table. It moves the managed audit local adapter and external adapter readiness routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditLocalAdapterRoutes.ts`.
- Exported `managedAuditLocalAdapterAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted local/external adapter loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed audit local adapter candidate dry-run
- managed audit local adapter candidate verification report
- managed audit external adapter connection readiness review

## Verification

`test/auditManagedAuditLocalAdapterRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON/Markdown `200`.

The test pins the adapter boundary: `executionAllowed`, `restoreExecutionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable. It also proves the local dry-run still reports `appendWritten: true`, `dryRunDirectoryRemoved: true`, `externalManagedAuditAccessed: false`, and `productionAuditRecordAllowed: false`.

During the full shard run, an older credential resolver approval prerequisite route test exceeded its explicit 45s test budget only under shard pressure. The file passed focused before the change, passed focused after raising its explicit budget to 90s, and then shard 2/4 passed. This is test-budget stabilization, not a production behavior change.

The extracted routes are local/external adapter readiness reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
