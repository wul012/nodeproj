# Node v456 Code Walkthrough: managed audit manual sandbox connection adapter client route group split

## Goal

v456 keeps shrinking the central audit route table. It moves the manual sandbox connection decision and disabled adapter-client route chain into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionAdapterClientAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 4 extracted adapter-client loaders and renderers.

## Route Coverage

The extracted group contains 4 JSON/Markdown routes:

- managed audit manual sandbox connection decision record
- managed audit manual sandbox connection disabled adapter client precheck
- managed audit manual sandbox connection test-only adapter shell contract
- managed audit manual sandbox connection disabled adapter client upstream echo verification

## Verification

`test/auditManagedAuditManualSandboxConnectionAdapterClientRoutes.test.ts` verifies the route group has all 4 paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON/Markdown `200`.

The test pins the adapter-client boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

The extracted routes are decision and disabled adapter-client reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
