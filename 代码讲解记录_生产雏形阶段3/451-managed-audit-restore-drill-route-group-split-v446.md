# Node v446 Code Walkthrough: managed audit restore drill route group split

## Goal

v446 keeps shrinking the central audit route table. It moves the managed audit restore drill plan and archive verification routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditRestoreDrillRoutes.ts`.
- Exported `managedAuditRestoreDrillAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted restore drill loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- managed audit packet restore drill plan
- managed audit restore drill archive verification

## Verification

`test/auditManagedAuditRestoreDrillRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON and Markdown `200`.

The test pins the restore drill safety boundary: `executionAllowed`, `restoreExecutionAllowed`, `connectsManagedAudit`, and `automaticUpstreamStart` remain false, and production audit stays blocked.

The extracted routes do not add new Java or mini-kv evidence consumption; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
