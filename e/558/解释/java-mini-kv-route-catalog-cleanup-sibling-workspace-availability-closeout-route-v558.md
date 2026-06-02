# Node v558 explanation: sibling workspace availability closeout route

v558 exposes the v556 sibling workspace availability closeout through the Java / mini-kv route catalog cleanup handoff route group.

## Necessity proof

- Blocker resolved: future plans need a public, route-level statement that Node should use historical fixtures by default and should not require live Java/mini-kv startup unless real sibling repositories are provided.
- Later consumer: route archive or handoff material can reference this endpoint instead of relying on local desktop observations.
- Existing route cannot be reused: previous live-smoke and archive-verifier routes prove evidence files; they do not state the sibling workspace availability boundary.
- Growth stop condition: this route is a boundary report, not another live-smoke archive-verifier chain. Do not archive it unless a later handoff explicitly needs route-output evidence.

## Change

- Added `JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_SIBLING_WORKSPACE_AVAILABILITY_CLOSEOUT_ROUTE_PATH`.
- Registered the closeout in the cleanup handoff route group.
- Updated route catalog counts to `228` total routes, `64` Java/mini-kv routes, and `30` cleanup handoff routes.
- Updated managed route-quality expectations to the same `228` total.
- Added JSON/Markdown route coverage.

Java and mini-kv are recommended parallel. Node does not need fresh sibling evidence and does not start sibling services.

Validation completed:

- `npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts test\auditJsonMarkdownRouteGroups.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\managedAuditRouteRegistrationTableQualityPass.test.ts test\javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout.test.ts test\javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Next step: continue compact maturity work; archive this route only if a later handoff needs route-output proof.
