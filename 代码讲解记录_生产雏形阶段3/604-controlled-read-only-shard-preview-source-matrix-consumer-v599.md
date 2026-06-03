# Node v599 code walkthrough: controlled read-only shard preview source matrix consumer

## Goal

v599 makes the v598 matrix actionable.

The source matrix is a normalized data shape. The new consumer report answers a narrower question: can Node safely consume this matrix for controlled read-only comparison work?

## Type model

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` adds:

- `ControlledReadOnlyShardPreviewSource`;
- `ControlledReadOnlyShardPreviewSourceMatrixConsumerGates`;
- `ControlledReadOnlyShardPreviewSourceMatrixConsumerComparison`;
- `ControlledReadOnlyShardPreviewSourceMatrixConsumer`.

The profile now records active Node version `Node v599` and source Node version `Node v598`.

## Builder flow

`createSourceMatrixConsumer(sourceMatrix)` lives beside the matrix builder.

It checks:

- both required sources are present;
- all sources are ready;
- shard counts are comparable;
- slot counts are comparable;
- at least one routing mode is declared;
- the consumer itself stays read-only.

When a gate fails, the report records a blocked reason code. With probes disabled, it still observes the two source identities but blocks on readiness and comparability instead of reading or starting anything.

## Renderer

The Markdown renderer now includes:

- `## Source Matrix Consumer`;
- `### Consumer Gates`;
- `### Consumer Comparison`.

This makes the consumer decision visible in the same route output as the underlying source matrix.

## Tests

The main preview test asserts both ready and fail-closed consumer behavior.

The minimal shard readiness route test verifies that the route table still exposes the same latest route and that Markdown includes the consumer section.

## Safety

v599 remains a local Node read-only feature:

- no new route;
- no service start/stop;
- no active router;
- no write routing;
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

Node v600 should reuse `preview.sourceMatrixConsumer` to add a controlled drift summary, still without activating routing or creating a new verification chain.
