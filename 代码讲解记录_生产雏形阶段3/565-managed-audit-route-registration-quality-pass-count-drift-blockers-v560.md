# Node v560 code walkthrough: route registration quality pass count drift blockers

## Dynamic Group Count Message

`collectProductionBlockers` now formats the group-count blocker from `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount`. The report no longer carries a stale literal count when the catalog grows.

## Route Count Blocker

`routeCountPreserved` already participated in readiness. v560 adds the matching `ROUTE_REGISTRATION_COUNT_NOT_PRESERVED` blocker so blocked profiles explain the exact count issue.

## Focused Coverage

`managedAuditRouteRegistrationTableQualityPass.test.ts` now injects group and route count drift, then verifies both blocker codes and their dynamic expected-count messages.

## Boundary

v560 is diagnostic alignment only. It changes no public route path, starts no upstream service, and consumes no fresh Java or mini-kv evidence.
