# v586 Java/mini-kv cleanup handoff route test split

## Purpose

v586 is version 5 of the 16-version maintenance/refactor run.

The target was `test/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts`, a 1700-line route group test that mixed every Java/mini-kv cleanup handoff phase in one file.

## Change

The old aggregate test file was removed and split into five focused suites:

- `test/auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts`
- `test/auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts`
- `test/auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts`
- `test/auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts`
- `test/auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts`

Shared route imports, headers, config, and route-group registration checks now live in:

- `test/support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.ts`

All 30 original tests remain present. The largest new test file is 390 lines, and the support file is 131 lines.

## Maintenance impact

The old file hid distinct cleanup phases behind one test name. The new files map to actual evidence phases:

- foundational/latest/current/checklist;
- consumer readiness and readiness handoff;
- fresh baseline;
- stability/CI closeout;
- latest sibling/live smoke and sibling workspace availability.

This makes the next cleanup sharper: route-count and Markdown count assertions can now be normalized phase by phase instead of editing a 1700-line file.

Java and mini-kv remain recommended parallel work. v586 consumes frozen/historical evidence through existing Node tests only and requests no fresh sibling work.

## Next cut

v587 should reduce brittle hardcoded route-count assertions inside the cleanup handoff route tests where the value can be derived from route catalog support or localized in one helper.

## Verification

- `npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Result:

- Focused cleanup handoff route split passed: 5 files, 30 tests.
- Typecheck passed.
- Build passed.

No screenshot was needed because v586 only reorganizes tests.
