# Node v451 Code Walkthrough: managed audit sandbox adapter route group split

## Goal

v451 keeps shrinking the central audit route table. It moves the managed audit sandbox adapter plan/package/runbook routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditSandboxAdapterRoutes.ts`.
- Exported `managedAuditSandboxAdapterAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted sandbox adapter loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed audit sandbox adapter dry-run plan
- managed audit sandbox adapter dry-run package
- managed audit manual sandbox adapter connection runbook

## Verification

`test/auditManagedAuditSandboxAdapterRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON/Markdown `200`.

The test pins the sandbox adapter boundary: `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, `connectionExecutionAllowed`, `schemaMigrationExecutionAllowed`, `externalConnectionOpened`, and `managedAuditWriteAllowed` remain false where applicable.

`test/managedAuditManualSandboxAdapterConnectionRunbook.test.ts` was updated to assert the new route-group spread instead of direct central route registration. That keeps the test checking the architecture boundary without blocking the route table split.

The extracted routes are sandbox adapter plan/package/runbook reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
