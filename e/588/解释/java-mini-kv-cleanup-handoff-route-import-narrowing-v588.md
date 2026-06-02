# v588 Java/mini-kv cleanup handoff route import narrowing

## Purpose

v588 is version 7 of the 16-version maintenance/refactor run.

v586 intentionally used a broad generated import list while splitting the 1700-line cleanup handoff route test. v588 cleans that up so each split file imports only the support symbols it actually uses.

## Change

The five cleanup handoff route test files now have narrowed support imports.

Each file keeps:

- `buildApp`;
- `completeHeaders`;
- only the route path constants used by that file;
- `loadTestConfig`;
- route-count helpers only where needed;
- the route group registration helper only in the foundational suite.

No assertions or route behavior changed.

## Maintenance impact

This reduces visual noise at the top of each split test file and makes future route moves safer. Reviewers can now see a file's route dependencies from its import block instead of scanning a broad generated list.

Java and mini-kv remain recommended parallel work. v588 is Node-only test maintenance and requires no fresh sibling evidence.

## Next cut

v589 should move from test organization into production-code maintainability, starting with the large promotion archive/handoff builder file.

## Verification

- `npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused cleanup handoff route tests passed: 5 files, 30 tests.
- Typecheck passed.
- Build passed.
