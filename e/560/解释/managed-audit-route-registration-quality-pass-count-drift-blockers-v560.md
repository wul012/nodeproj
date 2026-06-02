# Node v560 explanation: route registration quality pass count drift blockers

v560 makes the route registration quality pass explain count drift precisely when it blocks.

## Necessity proof

- Blocker resolved: `routeCountPreserved=false` could block readiness without producing a matching production blocker message.
- Later consumer: route-growth maintenance can now see whether drift came from route count, route group count, or catalog integrity.
- Existing report cannot be reused alone: the quality pass already owns blocker collection, so the missing blocker belongs there.
- Growth stop condition: this is diagnostic alignment only. It adds no route, no evidence archive, and no sibling service dependency.

## Change

- The stale `expected 49 route groups` message now uses the shared catalog summary group count.
- A new `ROUTE_REGISTRATION_COUNT_NOT_PRESERVED` blocker reports route-count drift with the shared catalog summary route count.
- A focused test injects count drift and verifies both blocker messages use current expected counts.

Java and mini-kv remain recommended parallel. Node v560 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\managedAuditRouteRegistrationTableQualityPass.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
