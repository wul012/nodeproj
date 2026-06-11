# Node v598 code walkthrough: controlled read-only shard preview source matrix

## Goal

v598 turns the v581 controlled read-only shard preview into a more useful cross-source data shape.

Before this version, the route returned Java and mini-kv observations separately. That was correct, but every future consumer would need to know where to find the same readiness fields in two different observations. v598 adds a matrix that normalizes those fields once.

## Type model

`src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` adds:

- `ControlledReadOnlyShardPreviewSourceMatrixEntry`;
- `ControlledReadOnlyShardPreviewSourceMatrix`;
- `preview.sourceMatrix` on the profile.

The profile version remains additive: the route still serves the same preview surface, but the active Node version moves to `Node v598`, and the source Node version records that this feature grows from `Node v581`.

## Builder flow

`createSourceMatrix(java, miniKv)` lives in `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts`.

It builds one normalized entry for Java and one for mini-kv, then calculates:

- source counts by status;
- unique routing modes;
- shard and slot deltas;
- comparable flags;
- `allSourcesReady`.

The main preview loader calls this helper once and attaches the result under `preview.sourceMatrix`.

## Renderer

`renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(...)` now renders a `## Source Matrix` section.

The section shows the aggregate counts first, then expands each source entry using the existing `renderEntries(...)` utility. This keeps the output readable without introducing a separate renderer or route.

## Tests

The preview test now asserts the exact ready matrix for Java v289 and mini-kv v262 fixture-style evidence.

The minimal shard readiness route test also checks that Markdown includes the new `## Source Matrix` section. Catalog tests were included to catch route-surface regressions.

## Safety

The version remains read-only:

- no Java or mini-kv service startup;
- no routing activation;
- no credential read;
- no managed audit mutation;
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

Node v599 should consume the matrix instead of adding another verification chain. The most useful next step is a read-only source-matrix consumer/report that compares readiness without starting services or activating live routing.
