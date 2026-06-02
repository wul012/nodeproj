# Node v559 explanation: route registration quality pass catalog count refactor

v559 removes the second route-count expectation source from the managed audit route registration table quality pass.

## Necessity proof

- Blocker resolved: route additions were forcing separate edits in the route catalog summary and the route registration quality pass constants.
- Later consumer: route-growth versions and closeout tests can rely on the catalog summary as the single count authority.
- Existing report cannot be reused alone: the quality pass still needs to assert preservation, but it should compare against the catalog summary rather than a duplicated local constant.
- Growth stop condition: this is a maintainability refactor only. It adds no new route, no upstream evidence chain, and no Java/mini-kv dependency.

## Change

- `managedAuditRouteRegistrationTableQualityPass.ts` now imports `EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY`.
- The quality checks compare group and route counts to that catalog summary.
- The focused test also uses the shared summary object for expected route and group counts.

Java and mini-kv remain recommended parallel. Node v559 does not need live sibling repositories and does not start sibling services.

Validation planned:

- `npm.cmd test -- test\managedAuditRouteRegistrationTableQualityPass.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`
