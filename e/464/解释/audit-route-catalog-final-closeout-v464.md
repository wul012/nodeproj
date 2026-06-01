# Node v464 audit route catalog final closeout

## Summary

Node v464 closes the six-version route catalog batch. It removes the last non-central route-table source read, fixes the route-quality service import cycle by injecting catalog integrity, and runs broad validation.

## What Changed

- Migrated `managedAuditManualSandboxAdapterConnectionRunbook.test.ts` to `expectAuditRouteGroupRegisteredThroughCatalog(...)`.
- Reduced direct `routeTableSource = readFileSync(...)` usage to one central source-shape test.
- Changed route-quality loading to accept an optional `AuditJsonMarkdownRouteCatalogIntegrityResult`.
- Added a current default catalog snapshot for runtime route reports so services no longer import route modules.
- Added a negative test proving route quality blocks when supplied catalog integrity is not ready.

## Cross-Project Check

- Java is clean at v198 / `64d1dfdb`.
- mini-kv is at v181 / `989d13d` with v182-like local changes.
- Node v464 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Validation

- Focused closeout tests passed: 7 files / 17 tests.
- Typecheck passed.
- Build passed.
- Full Vitest passed: 393 files / 1221 tests.

## Boundary

v464 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
