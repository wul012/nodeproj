# v890 Controlled read-only shard preview operator evidence value draft source record mapping

v890 adds `VALUE_DRAFT_SOURCE_RECORD_MAPPING` to the operator evidence value draft chain. It consumes `IMPORT_PREFLIGHT_SOURCE_RECORD_MAPPING` from the v862-v886 import preflight and contributes source mapping draft counts.

This version is part of the v887-v911 value draft package. The package creates twenty-five value-draft slots from the import preflight, keeps every slot at `draftValueState=awaiting-operator-value` and `actualValueState=not-supplied`, and exposes only a structural `readyForOperatorEvidenceValueDraft` signal. It deliberately keeps `readyForEvidenceImport=false`, `readyForManualEvidenceEntry=false`, `readyForLiveExecution=false`, and `readyForProductionExecution=false`.

Growth control:

- blocker resolved: the v886 import preflight defined normalizers and blockers, but there was no bounded place for future operator-entered value drafts;
- later consumer: a future explicit value importer can consume these draft slots before accepting actual values;
- reuse decision: this version consumes existing preflight slots and adds no runtime client, credential reader, service start path, sibling mutation, live evidence import, or value persistence;
- stop condition: the draft reports no actual supplied values, no runtime payload import, no synthetic evidence, no secret value, no writes, no automatic service start, and production execution blocked.

Slice detail:

- draft code: `VALUE_DRAFT_SOURCE_RECORD_MAPPING`;
- source preflight slot: `IMPORT_PREFLIGHT_SOURCE_RECORD_MAPPING`;
- focus: source mapping draft counts;
- boundary: keeps mapped evidence records out of the draft package.

Maintenance control:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.ts` owns the value draft contract;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotBuilder.ts` owns the twenty-five slot templates and preflight-slot mapping;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftArtifacts.ts` owns gate checks, blocked reasons, counts, and digest creation;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftRenderer.ts` owns archive Markdown rendering.

Cross-project status: Java v583 and mini-kv v535 were checked read-only and are clean/synced. They can continue in parallel. This Node version does not request fresh sibling evidence and does not start either sibling service.

Verification status for this package:

- `npm.cmd run typecheck`: passed.
- focused value draft/catalog/barrel/route tests: 5 files, 29 tests passed.
- adjacent controlled-preview batch plus minimal route: 22 files, 90 tests passed.
- `npm.cmd run build`: passed.

No screenshot is needed because v890 adds service artifacts and Markdown route content without a new browser page.
