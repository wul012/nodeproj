# Node v600 code walkthrough: controlled read-only shard preview source matrix drift summary

## Goal

v600 explains the differences between the Java and mini-kv read-only shard readiness sources.

The important distinction: drift here is not a production approval. It is a controlled, read-only review summary that makes source differences visible while keeping routing, writes, service lifecycle, and credential access closed.

## Type model

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` adds:

- `ControlledReadOnlyShardPreviewSourceMatrixDriftDimension`;
- `ControlledReadOnlyShardPreviewSourceMatrixDriftFinding`;
- `ControlledReadOnlyShardPreviewSourceMatrixDriftSummary`.

The profile now records active Node version `Node v600` and source Node version `Node v599`.

## Builder flow

`createSourceMatrixDriftSummary(sourceMatrix, sourceMatrixConsumer)` creates findings for:

- routing mode;
- shard count;
- slot count.

If both sides are present and equal, the finding is `aligned`. If both sides are present and differ, the finding is `drift-detected` with warning severity. If either side is missing, the finding is `not-comparable` with blocker severity.

When the source-matrix consumer is blocked, the summary adds a `consumerReadiness` blocker finding.

## Renderer

The Markdown renderer now includes:

- `## Source Matrix Drift Summary`;
- `### Drift Findings`.

This keeps the drift explanation on the same route as the source matrix and consumer report.

## Tests

The main preview test asserts:

- ready controlled drift for the fixture path;
- fail-closed blocked drift when probes are disabled.

The route group test verifies that the latest minimal shard readiness route still renders the drift summary section.

## Safety

v600 remains read-only:

- no new route;
- no routing activation;
- no fresh sibling evidence requirement;
- no service start/stop;
- no Java or mini-kv mutation;
- no credential value read;
- no LOAD, RESTORE, COMPACT, approval, or receipt behavior.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\auditMinimalShardReadinessRoutes.test.ts test\auditJsonMarkdownRouteCatalogSummary.test.ts test\auditJsonMarkdownRouteCatalogIntegrity.test.ts test\auditJsonMarkdownRouteGroups.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route/catalog tests passed: 5 files, 8 tests.
- Build passed.

## Next version

Node v601 should turn the drift summary into a controlled review checklist, still using the same route and avoiding another verification chain.
