# 467 audit route catalog test migration v462

## Version Progress

Node v462 completes the broad migration of route-group tests onto the shared catalog helper.

## Key Files

- `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts`
- `test/auditCredentialResolverFakeShellReadinessRoutes.test.ts`
- `test/auditManagedAuditAdapterRoutes.test.ts`
- `test/auditJavaMiniKvActiveShardPlanRoutes.test.ts`
- `test/auditSandboxEndpointCredentialResolverRoutes.test.ts`

## Core Flow

Each migrated test still verifies its route paths and HTTP behavior. The registration assertion now calls `expectAuditRouteGroupRegisteredThroughCatalog(...)`, which checks catalog membership, anchor presence, central flatMap alignment, and route order without parsing the central source file.

## Validation

- Migrated route-group tests plus v459/v460/v461 catalog/support tests passed: 39 files / 40 tests.
- Typecheck passed.
- Build passed.

## Maturity

The route-group suite is now mostly independent of source-string anchors. This makes the catalog ready for route-quality report integration and a later cleanup of the remaining legacy route-table source assertions.
