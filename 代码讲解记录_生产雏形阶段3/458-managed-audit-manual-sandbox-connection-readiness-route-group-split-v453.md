# Node v453 Code Walkthrough: managed audit manual sandbox connection readiness route group split

## Goal

v453 keeps shrinking the central audit route table. It moves the manual sandbox connection preflight-to-readiness route chain into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionReadinessRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionReadinessAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 7 extracted readiness-chain loaders and renderers.

## Route Coverage

The extracted group contains 7 JSON/Markdown routes:

- managed audit manual sandbox connection preflight gate
- managed audit manual sandbox connection preflight verification
- managed audit manual sandbox connection rehearsal packet review
- managed audit manual sandbox connection blocked execution rehearsal
- managed audit manual sandbox connection precondition intake
- managed audit manual sandbox connection dry-run request envelope
- managed audit manual sandbox connection readiness gate

## Verification

`test/auditManagedAuditManualSandboxConnectionReadinessRoutes.test.ts` verifies the route group has all 7 paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON/Markdown `200`.

The test pins the readiness-chain boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

The extracted routes are preflight/readiness reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
