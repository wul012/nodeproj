# Node v457 Code Walkthrough: managed audit manual sandbox connection fake transport route group split

## Goal

v457 finishes the currently visible manual sandbox connection route-table split by moving the fake-transport packet chain out of the central audit route table.

It also fixes the planning workflow: future Node successor plans must first check Java and mini-kv progress and then state whether those projects can continue in parallel.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionFakeTransportAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted fake-transport loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed audit manual sandbox connection fake transport adapter dry-run verification packet
- managed audit manual sandbox connection fake transport packet archive verification
- managed audit manual sandbox connection fake transport packet upstream echo verification

## Cross-Project Planning Rule

`AGENTS.md` now requires every new Node plan to inspect Java and mini-kv read-only before writing the plan. The plan must record latest versions, clean/dirty state, whether each project can continue in parallel, and exact upstream blockers when Node needs fresh evidence.

For this version, Java v186 can continue read-only endpoint registry / historical snapshot quality work. mini-kv v175 should continue extending the read-only route split compatibility window from Node v449 through Node v450-v457. Node v457 does not block either project.

## Verification

`test/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.test.ts` verifies the route group has all 3 paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON/Markdown `200`.

The test pins the fake-transport boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

Full validation passed with 390 test files and 1216 tests.

The extracted routes are fake-transport verification reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
