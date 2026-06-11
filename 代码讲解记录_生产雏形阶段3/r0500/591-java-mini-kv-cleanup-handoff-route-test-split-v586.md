# Node v586 code walkthrough: Java/mini-kv cleanup handoff route test split

## Goal

v586 splits the largest remaining route-test file outside the promotion suite.

The old `test/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts` file had 1700 lines and 30 tests. It covered many historical phases of the Java/mini-kv cleanup route group in one place, which made route-count and Markdown drift fixes more tedious than they needed to be.

## Support

`test/support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.ts` centralizes:

- `buildApp`;
- route path constants for the cleanup handoff group;
- access guard headers;
- test config defaults;
- route group catalog registration checks.

This keeps the split test files from copying a long import block and makes later route-count cleanup easier.

## New Test Files

`test/auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts` covers:

- v473 frozen handoff evidence;
- latest evidence;
- latest evidence archive verification;
- current evidence;
- current evidence archive verification;
- verification checklist evidence;
- verification checklist archive verification.

`test/auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts` covers:

- consumer readiness evidence;
- consumer readiness archive verification;
- consumer readiness batch closeout;
- batch closeout archive verification;
- readiness handoff evidence;
- readiness handoff archive verification.

`test/auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts` covers:

- fresh baseline evidence;
- fresh baseline archive verification;
- fresh baseline batch closeout;
- batch closeout archive verification;
- fresh baseline stability closeout;
- fresh baseline stability archive verification.

`test/auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts` covers:

- twenty-version run closeout;
- twenty-version run closeout archive verification;
- expanded stability closeout;
- expanded stability archive verification;
- CI/catalog health closeout;
- CI/catalog health closeout archive verification.

`test/auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts` covers:

- latest sibling evidence;
- latest sibling archive verification;
- latest sibling live smoke archive verification;
- live smoke archive verification route archive verification;
- sibling workspace availability closeout.

## Safety

All 30 original tests remain present. The route assertions were preserved, except the top route group registration assertion now calls a support helper instead of repeating the catalog check inline.

No production route, service, catalog, renderer, or evidence fixture changed.

## Verification

Focused verification:

```powershell
npm.cmd test -- test\auditJavaMiniKvRouteCatalogCleanupHandoffFoundationalRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffConsumerReadinessRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffFreshBaselineRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffStabilityCloseoutRoutes.test.ts test\auditJavaMiniKvRouteCatalogCleanupHandoffLatestSiblingRoutes.test.ts
```

Result:

- 5 files passed.
- 30 tests passed.

Additional checks:

```powershell
npm.cmd run typecheck
npm.cmd run build
```

Result:

- Typecheck passed.
- Build passed.

## Cross-project status

Java and mini-kv can continue in parallel. v586 adds no fresh upstream evidence requirement and no approval gate for sibling projects.
