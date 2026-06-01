# Node v447 Code Walkthrough: managed audit dry-run adapter route group split

## Goal

v447 keeps shrinking the central audit route table. It moves the managed audit dry-run adapter candidate, archive verification, and production-hardening readiness gate routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditDryRunAdapterRoutes.ts`.
- Exported `managedAuditDryRunAdapterAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted dry-run adapter loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed audit dry-run adapter candidate
- managed audit dry-run adapter archive verification
- managed audit adapter production-hardening readiness gate

## Verification

`test/auditManagedAuditDryRunAdapterRoutes.test.ts` verifies the route group has all three paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON and Markdown `200`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv evidence path resolution points under `fixtures/historical/sibling-workspaces/...`.

The test pins the dry-run adapter safety boundary: `executionAllowed`, `restoreExecutionAllowed`, `connectsManagedAudit`, `automaticUpstreamStart`, real approval decision creation, ledger writes, restore execution, and production audit records remain false.
