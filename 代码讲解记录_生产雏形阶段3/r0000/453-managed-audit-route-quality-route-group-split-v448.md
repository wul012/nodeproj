# Node v448 Code Walkthrough: managed audit route quality route group split

## Goal

v448 keeps shrinking the central audit route table. It moves the managed audit route-quality reports into a dedicated route group.

## Split Shape

- Added `src/routes/auditManagedAuditRouteQualityRoutes.ts`.
- Exported `managedAuditRouteQualityAuditJsonMarkdownRoutes` from that file.
- Left `src/routes/auditJsonMarkdownRoutes.ts` with only the route-group spread registration.
- Removed direct central imports for the 2 extracted quality loaders and renderers.

## Route Coverage

The extracted group contains 2 JSON/Markdown routes:

- managed audit route helper quality pass
- managed audit route registration table quality pass

## Verification

`test/auditManagedAuditRouteQualityRoutes.test.ts` verifies the route group has both paths, the central route table registers the group through the shared spread, and the extracted routes still return JSON and Markdown `200`.

The test pins the quality-pass boundary: `executionAllowed`, `connectsManagedAudit`, and `automaticUpstreamStart` remain false, while route registrar and table quality checks stay true.

The extracted routes are route-quality reports only; Java and mini-kv can continue in parallel while Node keeps shrinking its route table.
