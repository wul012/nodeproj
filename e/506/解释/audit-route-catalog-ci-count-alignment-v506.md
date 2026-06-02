# Node v506 audit route catalog CI count alignment

v506 fixes the GitHub Actions failure from the v505 push.

## Failure

The CI `Node Evidence` workflow reached full `npm test` and failed only in route catalog count guards.

- Live route catalog: 211 routes.
- Live Java/mini-kv domain routes: 47 routes.
- Stale expectations still said 201, 205, and 37 in two tests.

## Fix

The tests now read the shared `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY` constant.

This keeps route count truth in one place. Future route additions still need to update the summary, but the integrity and flat-group tests no longer duplicate an older count by hand.

## Boundary

No runtime route is added. No sibling evidence is consumed in v506. No Java or mini-kv service is started.

## Next Direction

Node v507 should start the next evidence intake from the clean sibling baselines now available:

- Java v232-v239;
- mini-kv v213-v220.
