# Node v454 Code Walkthrough: managed audit manual sandbox connection command route group split

## Goal

v454 keeps shrinking the central audit route table. It moves the manual sandbox connection operator-window and dry-run command route chain into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionCommandRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionCommandAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 5 extracted command-chain loaders and renderers.

## Route Coverage

The extracted group contains 5 JSON/Markdown routes:

- managed audit manual sandbox connection operator-window checklist
- managed audit manual sandbox connection operator-window evidence verification
- managed audit manual sandbox connection dry-run command package
- managed audit manual sandbox connection dry-run command package verification report
- managed audit manual sandbox connection dry-run command upstream echo verification

## Verification

`test/auditManagedAuditManualSandboxConnectionCommandRoutes.test.ts` verifies the route group has all 5 paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON/Markdown `200`.

The test pins the command-chain boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

The extracted routes are operator-window and dry-run-command reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
