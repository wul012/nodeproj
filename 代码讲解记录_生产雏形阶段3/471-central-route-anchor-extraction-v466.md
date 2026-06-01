# 471 central route anchor extraction v466

## Version Progress

Node v466 removes compatibility-anchor metadata from the central route table and keeps it in the route group catalog.

## Key Files

- `src/routes/auditJsonMarkdownRoutes.ts`
- `src/routes/auditJsonMarkdownRouteGroups.ts`
- `test/auditJsonMarkdownRouteGroups.test.ts`
- `test/support/auditJsonMarkdownRouteCatalogTestSupport.ts`

## Core Flow

The central route table now imports `auditJsonMarkdownRouteGroups` and exports `auditJsonMarkdownRoutes` as `flatMap((group) => group.routes)`. Source anchors remain available temporarily from the catalog file for tests and integrity checks.

## Validation

- Focused catalog/route-quality/code-health tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.

## Maturity

The central route table is now a pure runtime route table. Compatibility metadata has moved to the catalog layer, making the next cleanup step smaller.
