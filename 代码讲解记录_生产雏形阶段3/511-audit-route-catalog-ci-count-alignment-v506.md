# Node v506 code walkthrough: audit route catalog CI count alignment

## Why This Version Exists

The v505 feature itself passed focused route tests, typecheck, build, and smoke. The remote CI failure came from older full-suite guard tests that still duplicated route-count expectations.

## Changed Tests

`test/auditJsonMarkdownRouteCatalogIntegrity.test.ts` now imports `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY` and matches the live summary against that shared source.

`test/auditJsonMarkdownRouteGroups.test.ts` uses the same shared summary for the flat route-table length assertion.

## Why This Is Better

The route catalog already has a single expected-summary module:

`src/routes/auditJsonMarkdownRouteCatalogSummary.ts`

That module is the right place to record the current route count, domain group counts, domain route counts, and first/last route path. The integrity tests should verify the live catalog matches the shared summary, not keep another stale copy of the same numbers.

## Current Counts

- Total JSON/Markdown routes: 211.
- Java/mini-kv domain routes: 47.
- Route groups: 50.

## Validation

Focused catalog tests pass:

`npx.cmd vitest run test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts --testTimeout=180000`

## Next Work

v506 is a CI repair version. The next Node version should resume feature progress by freezing the newly clean sibling evidence from Java v232-v239 and mini-kv v213-v220 into Node historical fixtures before adding any new report route.
