# 465 audit route catalog integrity v460

## Version Progress

Node v460 follows v459 by turning the audit route group catalog invariants into a reusable integrity helper.

## Key Files

- `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts`
- `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts`
- `src/routes/auditJsonMarkdownRouteGroups.ts`
- `src/routes/auditJsonMarkdownRoutes.ts`

## Core Flow

`evaluateAuditJsonMarkdownRouteCatalogIntegrity(...)` receives the route groups, the flattened route table, and optional compatibility anchors. It flattens the catalog, checks group/path uniqueness, counts domains, detects empty groups, and verifies that the exported route table still matches the catalog by object identity and order.

## Validation

- Focused v459/v460 catalog tests passed: 2 files / 3 tests.
- Typecheck passed.
- Build passed.

## Maturity

This version removes another reason to inspect long route-source strings manually. Later route-quality reports can consume one typed integrity result instead of duplicating catalog assumptions.
