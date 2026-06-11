# Node v443 Code Walkthrough: managed audit adapter route group split

## Goal

v443 keeps shrinking the central audit route table. It moves the managed adapter boundary, compliance harness, and runner routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditAdapterRoutes.ts`.
- Exported `managedAuditAdapterAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted service factories and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed adapter boundary
- managed adapter compliance
- managed adapter runner

## Verification

`test/auditManagedAuditAdapterRoutes.test.ts` verifies the route group has all three paths, the central route table registers the group through the shared spread, and each extracted route still returns JSON and Markdown `200`.

The test pins the safety boundary for the adapter chain: `executionAllowed` remains false, real managed adapter connection remains false, database/network side effects remain blocked, and upstream actions stay disabled.

The extracted routes do not depend on historical sibling-workspace evidence, so the forced historical fixture fallback check is not applicable to v443.
