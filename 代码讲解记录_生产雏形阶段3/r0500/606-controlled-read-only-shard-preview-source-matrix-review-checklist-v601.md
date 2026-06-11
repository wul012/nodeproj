# Node v601 code walkthrough: controlled read-only shard preview source matrix review checklist

## Goal

v601 creates a checklist from the v600 drift summary.

The checklist is deliberately not an approval artifact. It is a read-only operator review shape that says which items are ready, which require review, and which are blocked.

## Type model

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` adds:

- `ControlledReadOnlyShardPreviewSourceMatrixReviewChecklistItem`;
- `ControlledReadOnlyShardPreviewSourceMatrixReviewChecklist`.

The profile now records active Node version `Node v601` and source Node version `Node v600`.

## Builder flow

`createSourceMatrixReviewChecklist(driftSummary)` creates four items:

- confirm the source-matrix consumer;
- review controlled drift findings;
- confirm routing remains disabled;
- confirm Java and mini-kv can continue in parallel.

If the drift summary is ready but contains drift findings, the second item is `needs-review`. If the drift summary is blocked, the first two items are blocked while the safety-boundary items remain ready.

## Renderer

The Markdown renderer now includes:

- `## Source Matrix Review Checklist`;
- `### Checklist Items`.

The output shows checklist state and item counts before listing each item.

## Tests

The main preview test asserts:

- ready checklist with one needs-review item on the successful read-only fixture path;
- blocked checklist when probes are disabled.

The route group test verifies that the latest minimal shard readiness route renders the checklist section.

## Safety

v601 remains read-only:

- no new route;
- no approval requirement;
- no routing activation;
- no fresh sibling evidence requirement;
- no service start/stop;
- no sibling mutation;
- no credential value read.

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

Node v602 should add a deterministic review digest over the checklist so the first feature batch can be pushed and verified together.
