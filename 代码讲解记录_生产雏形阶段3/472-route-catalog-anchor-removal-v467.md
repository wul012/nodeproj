# 472 route catalog anchor removal v467

## Version Progress

Node v467 removes the route catalog source-anchor compatibility layer.

## Key Files

- `src/routes/auditJsonMarkdownRouteGroups.ts`
- `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts`
- `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts`
- `test/managedAuditRouteRegistrationTableQualityPass.test.ts`

## Core Flow

Route-group tests now call the shared helper with only the route array. The helper locates the matching catalog group, verifies the central route table is the catalog flatMap, and checks that the group appears in order.

## Validation

- Affected route-group/catalog/route-quality tests passed: 53 files / 59 tests.
- Typecheck passed.
- Build passed.

## Maturity

The route catalog is now typed-first with no compatibility source anchors in runtime or test support.
