# Node v551 explanation: latest sibling live smoke archive verification route archive verification route

v551 exposes the v549 route-archive verifier through the Java / mini-kv route catalog cleanup handoff route group.

## Necessity proof

- Blocker resolved: v549 produced a typed verifier for the v548 archived route output, but it was only callable in code and tests.
- Later consumer: v552 can archive this public verifier route and prove JSON/Markdown output for the route itself.
- Existing route cannot be reused: the existing latest sibling live-smoke archive verification route reports the v546 verifier over v545 live-smoke evidence; it does not verify the v548 route archive files.
- Growth stop condition: the verifier now treats 226/62/28 as the historical v548 source-archive baseline and only requires the current route catalog to cover that baseline. Future route growth does not require changing the verifier unless its source archive changes.

## Change

- Registered `JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH`.
- Updated the expected audit route catalog summary to 227 total routes and 63 Java/mini-kv routes.
- Updated the managed route-registration quality pass to the same 227-route current count.
- Stabilized the v549 verifier by splitting route-count checks into source-archive equality and current-catalog coverage.
- Added JSON/Markdown route coverage for the new public endpoint.

## Cross-project plan

Java and mini-kv are recommended parallel for this version. Node does not need fresh sibling evidence, does not start sibling services, and does not wait for Java or mini-kv approvals.

## Validation

- `npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification.test.ts test\managedAuditRouteRegistrationTableQualityPass.test.ts test\auditJsonMarkdownRouteGroups.test.ts`

Next step: v552 should archive the v551 route JSON and Markdown output.
