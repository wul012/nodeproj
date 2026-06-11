# 468 audit route quality catalog integrity v463

## Version Progress

Node v463 makes the route-registration quality report consume the current audit route catalog integrity result.

## Key Files

- `src/services/managedAuditRouteRegistrationTableQualityPass.ts`
- `src/routes/auditJsonMarkdownRouteCatalogIntegrity.ts`
- `test/managedAuditRouteRegistrationTableQualityPass.test.ts`
- `test/managedAuditManualSandboxConnectionDryRunCommandPackage.test.ts`

## Core Flow

`loadManagedAuditRouteRegistrationTableQualityPass(...)` evaluates the live route catalog and folds the result into code shape, checks, summary, blockers, markdown, and digest generation. The report now treats route count, group count, source anchors, route-table alignment, duplicate paths, and empty groups as first-class quality inputs.

## Validation

- Route-registration quality pass, managed-audit route-quality route, and downstream dry-run command package tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.

## Maturity

The route catalog is now reflected by both tests and quality reports. This removes a stale v240 reporting island before the final v464 validation pass.
