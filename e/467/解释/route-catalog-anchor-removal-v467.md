# Node v467 route catalog anchor removal

## Summary

Node v467 removes the temporary source-anchor compatibility layer from route catalog tests.

## What Changed

- Removed `auditJsonMarkdownRouteGroupSourceAnchors`.
- Simplified `expectAuditRouteGroupRegisteredThroughCatalog(...)` to verify route-array identity, central flatMap alignment, and route order only.
- Removed `sourceAnchor` arguments from 50 route-group style tests.
- Updated catalog integrity and route-quality tests to run without source anchors.

## Cross-Project Check

- Java is at v198 / `64d1dfdb` with v199-like local changes.
- mini-kv is at v184 / `506ff62` with v185-like local changes.
- Node v467 does not need fresh Java or mini-kv evidence.

## Validation

- Affected route-group/catalog/route-quality tests passed: 53 files / 59 tests.
- Typecheck: passed.
- Build: passed.

## Boundary

v467 does not add routes, change API responses, start sibling services, read credentials, open managed-audit connections, or create new approval/evidence chains.
