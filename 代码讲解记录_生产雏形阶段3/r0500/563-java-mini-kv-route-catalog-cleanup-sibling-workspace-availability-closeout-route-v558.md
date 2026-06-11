# Node v558 code walkthrough: sibling workspace availability closeout route

## Route Registration

`javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.ts` now exports a public route path:

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-sibling-workspace-availability-closeout`

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts` registers that path with the existing JSON/Markdown audit route helper.

## Route Catalog Counts

The route catalog summary now records:

- total routes: `228`;
- Java/mini-kv routes: `64`;
- cleanup handoff routes: `30`.

`managedAuditRouteRegistrationTableQualityPass.ts` and its tests now use the same `228` route-registration count.

## Tests

`auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts` now verifies JSON and Markdown 200 responses for the sibling workspace availability closeout route. The test asserts the report remains ready, does not start Java or mini-kv, and records that live sibling startup is not required by default.

## Boundary

v558 exposes a boundary report, not a new live-smoke archive-verifier chain. It does not start sibling services and does not consume fresh sibling evidence.
