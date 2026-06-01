# Node v444 Code Walkthrough: managed audit persistence route group split

## Goal

v444 keeps shrinking the central audit route table. It moves the managed persistence candidate and dry-run verification routes into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditPersistenceRoutes.ts`.
- Exported `managedAuditPersistenceAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted persistence loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- managed persistence boundary candidate
- managed persistence dry-run verification

## Verification

`test/auditManagedAuditPersistenceRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON and Markdown `200`.

The test forces `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true` directly and verifies Java/mini-kv evidence path resolution points under `fixtures/historical/sibling-workspaces/...`.

The test pins the persistence safety boundary: `executionAllowed` remains false, real managed adapter connection remains false, external audit system access remains false, production audit records remain blocked, and Java/mini-kv writes remain outside this Node route split.
