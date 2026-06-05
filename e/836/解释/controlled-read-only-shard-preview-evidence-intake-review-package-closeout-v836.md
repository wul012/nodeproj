# v836 Controlled read-only shard preview evidence intake review package closeout

v836 closes the operator evidence intake review package for Node v812-v836.

The package consumes the v811 intake ledger and records twenty-five ordered review controls. It verifies source ledger readiness, control count, version order, ledger gate coverage, ledger gate pass state, entry coverage, entry code validity, manual review state, field preservation, acceptance preservation, redaction preservation, target coverage, cleanup coverage, failure-class coverage, maintenance controls, cross-project parallel plan clarity, no runtime payload import, no synthetic evidence, no secret values, read-only controls, no writes, no service start, and production execution blocked.

Growth control:

- blocker resolved: v811 had an intake ledger, but no bounded operator review package that could be consumed before future manual-entry/import work;
- later consumer: a future manual evidence entry form or captured evidence importer can consume these controls without inventing review criteria during execution;
- reuse decision: this version consumes the existing v811 ledger and adds no runtime client, credential reader, service start path, sibling mutation, or live evidence import;
- stop condition: the package reports `readyForManualEvidenceEntry=false`, `readyForLiveExecution=false`, `readyForProductionExecution=false`, `executionAllowed=false`, `writeRoutingAllowed=false`, `importsRuntimePayload=false`, `acceptsSyntheticEvidence=false`, and `containsSecretValue=false`.

Maintenance control:

- live-window Markdown sections were split into `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts`;
- the main renderer now delegates live-window sections instead of owning every section inline;
- the type module catalog registers the new review package modules and renderer split boundary.

Cross-project status: Java and mini-kv can continue in parallel. This Node version does not request fresh sibling evidence and does not start either sibling service.

Verification:

- `npm.cmd run typecheck`
- focused evidence intake review package/catalog/barrel/route tests: 5 files, 26 tests passed.
- adjacent controlled-preview route batch: 19 files, 75 tests passed.
- `npm.cmd run build`: passed.

No screenshot is needed because v836 adds service artifacts and Markdown rendering without a new browser page.
