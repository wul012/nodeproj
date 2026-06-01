# Node v463 audit route quality catalog integrity

## Summary

Node v463 upgrades the managed-audit route registration table quality pass so it reports the current route catalog instead of the old v240 table snapshot.

## What Changed

- `managedAuditRouteRegistrationTableQualityPass` now evaluates `auditJsonMarkdownRouteGroups`, `auditJsonMarkdownRoutes`, and source anchors through `evaluateAuditJsonMarkdownRouteCatalogIntegrity(...)`.
- The report now records 49 route groups, 198 routes, 49 source anchors, and catalog alignment checks.
- Added catalog integrity blockers for catalog readiness, group-count alignment, route-table alignment, unique paths, empty groups, and source-anchor alignment.
- Updated downstream dry-run command package expectations from the old 29-line route table snapshot to the current 57-line central table.

## Cross-Project Check

- Java is at v196 / `ffb2fd7f` with v197-like local checklist snapshot work.
- mini-kv is at v181 / `989d13d` with one untracked v181 release fixture.
- Node v463 does not need fresh Java or mini-kv evidence and is not their pre-approval blocker.

## Validation

- Route-registration quality pass, managed-audit route-quality route, and downstream dry-run command package tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.
- Full Vitest is deferred to v464 final validation.

## Boundary

v463 does not add a new approval chain, evidence gate, HTTP route, screenshot requirement, Java service start, mini-kv service start, credential read, raw endpoint parsing, managed audit connection, HTTP/TCP network action, mini-kv write/admin command, automatic upstream start, restore execution, real adapter wiring, or runtime execution behavior.
