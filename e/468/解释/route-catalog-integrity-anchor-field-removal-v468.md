# Node v468 route catalog integrity anchor field removal

## Summary

Node v468 removes stale source-anchor fields from the route catalog integrity result and managed audit route registration table quality profile.

## What Changed

- Removed `sourceAnchorsMatchGroupCount` from catalog integrity checks.
- Removed `sourceAnchorCount` from catalog integrity and route quality summaries.
- Removed `sourceAnchorsAligned` and the obsolete `SOURCE_ANCHORS_NOT_ALIGNED` blocker from the route quality profile.
- Updated focused tests to assert the active catalog shape without retired compatibility fields.

## Cross-Project Check

- Java is at v199 / `b23e2a1d` with v200-like local changes.
- mini-kv is at v184 / `506ff62` with v185-like local changes.
- Node v468 does not need fresh Java or mini-kv evidence.

## Validation

- Focused catalog/route-quality/downstream package tests passed: 4 files / 10 tests.
- Typecheck: passed.
- Build: passed.

## Boundary

v468 does not add routes, change API paths, change approval behavior, start sibling services, read credentials, or create new evidence chains.
