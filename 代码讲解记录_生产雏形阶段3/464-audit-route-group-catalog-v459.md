# Node v459 Code Walkthrough: audit route group catalog

## Goal

v459 turns the audit JSON/Markdown route table into a catalog-backed composition model. This keeps route ordering explicit while giving future quality checks a typed list of route groups instead of scraping one central import/spread file.

## Catalog Shape

`src/routes/auditJsonMarkdownRouteGroups.ts` exports:

- `AuditJsonMarkdownRouteGroup`
- `auditJsonMarkdownRouteGroups`

Each group has an `id`, a coarse `domain`, and its `routes` array. The existing route group modules stay unchanged.

## Central Route Export

`src/routes/auditJsonMarkdownRoutes.ts` now exports:

- `auditJsonMarkdownRouteGroupSourceAnchors`
- `auditJsonMarkdownRoutes`

The route export is just `auditJsonMarkdownRouteGroups.flatMap((group) => group.routes)`. The source anchors are temporary compatibility material for historical source-based checks that still look for old spread strings.

## Verification

`test/auditJsonMarkdownRouteGroups.test.ts` verifies:

- 49 route groups.
- 198 total flattened routes.
- unique group ids.
- unique route paths.
- preserved first and last route order.
- central route export equals catalog flattening.

Full validation passed with 392 test files and 1218 tests.

The catalog is metadata and composition only; no route path, response shape, upstream call, Java service, or mini-kv behavior changed.
