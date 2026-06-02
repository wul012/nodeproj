# Node v506 post audit route catalog CI count alignment roadmap

## Goal

Node v506 fixes the GitHub Actions failure left by stale audit route catalog expectations, then reopens the twenty-version run from v506 through v525.

## CI Failure

The latest `Node Evidence` run for v505 failed in full `npm test`.

- `test/auditJsonMarkdownRouteCatalogIntegrity.test.ts` still expected `routeCount=201` and Java/mini-kv route count `37`.
- `test/auditJsonMarkdownRouteGroups.test.ts` still expected the flat route table to have `205` paths.
- The live catalog is correct at `211` routes and `47` Java/mini-kv routes.

## Fix

The two tests now consume `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY` instead of duplicating stale route counts.

## Cross-Project State

Java and mini-kv are recommended parallel.

- Java is clean through v239.
- mini-kv is clean through v220.
- Node v507 can begin consuming Java v232-v239 and mini-kv v213-v220 as frozen historical evidence.

## Validation Plan

- Run focused route catalog tests.
- Run typecheck before commit if the change touches TypeScript imports.
- Keep `dist` out of the commit.
- Leave no background process running.
