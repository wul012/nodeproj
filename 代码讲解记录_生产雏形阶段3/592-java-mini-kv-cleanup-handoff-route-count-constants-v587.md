# Node v587 code walkthrough: Java/mini-kv cleanup handoff route count constants

## Goal

v587 follows the v586 split by reducing another maintenance smell in the same test area: bare historical route-count numbers.

These counts are not removed because they are part of the archived route cleanup evidence. The refactor changes how the tests express them.

## Support Constants

`test/support/javaMiniKvRouteCatalogCleanupHandoffRouteTestSupport.ts` now exports `cleanupHandoffRouteCounts`.

The named entries map route-count values to the stage they describe:

- `consumerReadinessBatchCloseout`;
- `freshBaselineArchiveVerification`;
- `freshBaselineBatchCloseout`;
- `freshBaselineStabilityCloseout`;
- `twentyVersionRunCloseout`;
- `expandedStabilityCloseout`;
- `ciCatalogHealthCloseout`;
- `latestSiblingEvidence`;
- `latestSiblingLiveSmokeRouteArchiveVerification`.

## Markdown Helper

The support file also exports `expectMarkdownRouteCount(markdownBody, routeCount)`.

This keeps Markdown route-count assertions consistent and prevents repeated string formatting such as `"routeCount: 224"` from drifting independently.

## Safety

No production code changed.

The route-count values are unchanged. The tests still verify the same JSON and Markdown evidence, but they now reference named constants.

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

Java and mini-kv can continue in parallel. v587 consumes no fresh sibling evidence and adds no cross-project approval gate.
