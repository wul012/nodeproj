# 466 audit route catalog test support v461

## Version Progress

Node v461 starts removing duplicated source-string route-table assertions from route-group tests.

## Key Files

- `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts`
- `test/auditFoundationalRoutes.test.ts`
- `test/auditJavaMiniKvRuntimeExecutionRoutes.test.ts`
- `test/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.test.ts`

## Core Flow

`expectAuditRouteGroupRegisteredThroughCatalog(...)` finds the route group by route-array identity, verifies the compatibility anchor, checks the central flatMap alignment, and confirms the exported route table contains the group routes in order.

## Validation

- Migrated route-group tests plus v459/v460 catalog tests passed: 14 files / 15 tests.
- Typecheck passed.
- Build passed.

## Maturity

This version turns the v459/v460 catalog into a practical test primitive. The remaining source-string tests can now be migrated in batches without repeating catalog logic in every file.
