# Node v445 Code Walkthrough: managed audit identity approval route group split

## Goal

v445 keeps shrinking the central audit route table. It moves the identity approval binding and provenance packet routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditIdentityApprovalRoutes.ts`.
- Exported `managedAuditIdentityApprovalAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 3 extracted identity approval loaders and renderers.

## Route Coverage

The extracted group contains 3 JSON/Markdown routes:

- managed identity approval binding contract
- managed identity approval provenance dry-run packet
- managed identity approval provenance packet verification report

## Verification

`test/auditManagedAuditIdentityApprovalRoutes.test.ts` verifies the route group has all three paths, the central route table registers the group through the shared spread, and representative extracted routes still return JSON and Markdown `200`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv evidence path resolution points under `fixtures/historical/sibling-workspaces/...`.

The test pins the identity approval safety boundary: `executionAllowed` remains false, no real approval decision is created, no approval ledger is written, Java/mini-kv writes remain blocked, and production audit records remain disallowed.
