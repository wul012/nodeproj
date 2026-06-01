# Node v466 central route anchor extraction

## Summary

Node v466 moves the temporary route group source anchors from the central route table into the route group catalog file.

## What Changed

- `src/routes/auditJsonMarkdownRoutes.ts` now exports only the flattened route table.
- `auditJsonMarkdownRouteGroupSourceAnchors` now lives in `src/routes/auditJsonMarkdownRouteGroups.ts`.
- Catalog, integrity, route-quality, and test-support imports now read anchors from the catalog file.
- The central source-shape test now asserts the route table does not contain the anchor array.

## Cross-Project Check

- Java is at v198 / `64d1dfdb` with local v199-like handoff manifest work.
- mini-kv is clean at v184 / `506ff62`.
- Node v466 does not need fresh Java or mini-kv evidence.

## Validation

- Focused catalog/route-quality/code-health tests passed: 4 files / 10 tests.
- Typecheck passed.
- Build passed.

## Boundary

v466 does not add routes, change API responses, start sibling services, read credentials, open managed-audit connections, or create new approval/evidence chains.
