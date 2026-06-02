# v587 Java/mini-kv cleanup handoff route count constants

## Purpose

v587 is version 6 of the 16-version maintenance/refactor run.

After v586 split the Java/mini-kv cleanup handoff route tests, the remaining pain in that area was a set of bare historical `routeCount` numbers. Those numbers are still valid business/evidence assertions, but naked values such as `207`, `213`, and `224` make future drift harder to review.

## Change

`test/support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.ts` now owns:

- `cleanupHandoffRouteCounts`;
- `expectMarkdownRouteCount(...)`.

The cleanup handoff route tests now assert named route-count constants instead of repeating bare route-count literals and raw Markdown strings.

The route group length check remains centralized in the same support file.

## Maintenance impact

This keeps the evidence meaning while making future changes easier to audit:

- `cleanupHandoffRouteCounts.consumerReadinessBatchCloseout` is clearer than `207`;
- `cleanupHandoffRouteCounts.freshBaselineStabilityCloseout` is clearer than `215`;
- Markdown route-count checks share one helper instead of repeating string formatting.

Java and mini-kv remain recommended parallel work. v587 is Node-only test maintenance and requires no fresh sibling evidence.

## Next cut

v588 should clean the wide imports left by the v586 mechanical split so each cleanup handoff route test imports only the constants it actually uses.

## Verification

- `npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused cleanup handoff route tests passed: 5 files, 30 tests.
- Typecheck passed.
- Build passed.
