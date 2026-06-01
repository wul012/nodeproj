# Node v455 Code Walkthrough: managed audit manual sandbox connection precheck route group split

## Goal

v455 keeps shrinking the central audit route table. It moves the manual sandbox connection precheck, code-health, and rehearsal-guard route chain into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditManualSandboxConnectionPrecheckRoutes.ts`.
- Exported `managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 4 extracted precheck-chain loaders and renderers.

## Code Health Update

`managedAuditSandboxCodeHealthPass` used to require the v247 route path, loader, and renderer directly inside the central route table. v455 keeps the same registration guarantee but recognizes the established route-group pattern: the central table must spread `managedAuditManualSandboxConnectionPrecheckAuditJsonMarkdownRoutes`, and the group file must contain the v247 route path, loader, and Markdown renderer.

## Route Coverage

The extracted group contains 4 JSON/Markdown routes:

- managed audit manual sandbox connection precheck packet
- managed audit manual sandbox connection precheck upstream receipt verification
- managed audit sandbox code health pass
- managed audit manual sandbox connection rehearsal guard

## Verification

`test/auditManagedAuditManualSandboxConnectionPrecheckRoutes.test.ts` verifies the route group has all 4 paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON/Markdown `200`.

The test pins the precheck-chain boundary: `readyForManagedAuditSandboxAdapterConnection`, `executionAllowed`, `connectsManagedAudit`, `readsManagedAuditCredential`, `schemaMigrationExecuted`, and `automaticUpstreamStart` remain false where applicable.

The extracted routes are precheck/code-health/rehearsal-guard reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
