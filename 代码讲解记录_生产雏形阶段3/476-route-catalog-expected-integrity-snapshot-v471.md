# 476 route catalog expected integrity snapshot v471

## Version Progress

Node v471 moves the expected route catalog integrity snapshot factory into the catalog integrity module.

## Key Files

- `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts`
- `src/services/managedAuditRouteRegistrationTableQualityPass.ts`
- `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts`

## Core Flow

The catalog integrity module now owns both live evaluation and the expected fallback snapshot for the current route catalog. The route-quality service calls the catalog-owned factory only when no live catalog integrity result is injected, keeping service logic focused on quality-pass checks and rendering.

## Validation

- Focused catalog/route-quality tests passed: 3 files / 7 tests.
- Typecheck passed.
- Build passed.

## Maturity

Fallback catalog integrity is now owned by the catalog layer, which reduces service-layer duplication and keeps future catalog-count changes in one place.
