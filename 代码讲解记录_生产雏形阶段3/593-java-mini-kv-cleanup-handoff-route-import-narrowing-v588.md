# Node v588 code walkthrough: Java/mini-kv cleanup handoff route import narrowing

## Goal

v588 cleans up the mechanical residue from v586.

The v586 split replaced a 1700-line test file with five focused route test files, but each split file initially imported the full support symbol list. That was acceptable for the split, but not ideal to leave behind.

## Change

Each cleanup handoff route test now imports only what it uses from `test/support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.ts`.

Examples:

- the foundational suite imports the route group registration helper;
- the latest sibling suite imports only latest-sibling/live-smoke paths;
- the stability closeout suite imports route-count constants but not the Markdown route-count helper;
- fresh baseline and consumer readiness suites import the Markdown route-count helper because they assert route count in Markdown output.

## Safety

This is import-only maintenance.

No route assertions, route paths, production services, evidence fixtures, or catalog values changed.

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

Java and mini-kv can continue in parallel. v588 consumes no fresh sibling evidence and adds no approval gate for sibling projects.
