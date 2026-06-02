# Node v559 code walkthrough: route registration quality pass catalog count refactor

## Shared Count Authority

`managedAuditRouteRegistrationTableQualityPass.ts` no longer owns local `228` and `50` route-count constants. It consumes `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY`, which is already the central route catalog expectation.

## Checks

The quality pass still verifies:

- route group count alignment;
- route registration count preservation;
- route table/catalog integrity;
- production and upstream actions remain disabled.

The difference is that count preservation now compares against the catalog summary rather than a duplicated service-local constant.

## Tests

`managedAuditRouteRegistrationTableQualityPass.test.ts` imports the same catalog expectation and uses it for JSON object and Markdown assertions. Future route additions should update the catalog summary once, and this quality pass will follow that single authority.

## Boundary

v559 is a maintainability refactor only. It adds no route, starts no Java or mini-kv service, and does not consume fresh sibling evidence.
