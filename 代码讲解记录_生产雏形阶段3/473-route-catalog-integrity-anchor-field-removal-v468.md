# 473 route catalog integrity anchor field removal v468

## Version Progress

Node v468 removes the last source-anchor fields from active route catalog reporting.

## Key Files

- `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts`
- `src/services/managedAuditRouteRegistrationTableQualityPass.ts`
- `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts`
- `test/managedAuditRouteRegistrationTableQualityPass.test.ts`

## Core Flow

The catalog integrity evaluator now reports only live catalog facts: group presence, route presence, empty groups, duplicate ids/paths, route-table flattening, domain counts, and first/last route paths. The route-quality profile consumes that shape directly and no longer creates a redundant anchor alignment check.

## Validation

- Focused catalog/route-quality/downstream package tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.

## Maturity

The route catalog quality surface no longer exposes compatibility fields for a source-anchor catalog that has been removed.
