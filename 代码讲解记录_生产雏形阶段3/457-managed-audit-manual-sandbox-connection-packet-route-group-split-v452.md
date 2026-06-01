# Node v452 Code Walkthrough: managed audit manual sandbox connection packet route group split

## Goal

v452 keeps shrinking the central audit route table. It moves the manual sandbox connection packet-preparation routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionPacketRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionPacketAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted packet-preparation loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed audit manual sandbox connection evidence checklist
- managed audit manual sandbox connection operator packet
- managed audit manual sandbox connection packet verification

## Verification

`test/auditManagedAuditManualSandboxConnectionPacketRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON/Markdown `200`.

The test pins the packet-preparation boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

The extracted routes are packet-preparation reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
