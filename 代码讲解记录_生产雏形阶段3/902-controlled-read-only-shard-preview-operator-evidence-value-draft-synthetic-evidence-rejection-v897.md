# Node v897 code walkthrough: operator evidence value draft synthetic evidence rejection

v897 contributes `VALUE_DRAFT_SYNTHETIC_EVIDENCE_REJECTION` to the operator evidence value draft package. It maps back to `IMPORT_PREFLIGHT_SYNTHETIC_EVIDENCE_REJECTION` and adds synthetic evidence rejection draft flags without accepting actual values.

Implementation:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.ts` defines value draft versions v887-v911, slot kinds, gate names, and aggregate value draft state.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotBuilder.ts` builds twenty-five value draft slots from import preflight slots and owns the template list.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftArtifacts.ts` checks twenty-six gates, computes blocked reason codes, and creates a stable value draft digest.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftRenderer.ts` renders gates and slot records into stable Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` wires the value draft after the v886 import preflight in the controlled preview profile.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts` adds the route summary section for the draft.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts` registers the four new value draft modules and updates catalog validation to Node v911.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` re-exports the value draft builder and renderer through the stable barrel.

Safety:

- the slot remains a draft: `draftValueState=awaiting-operator-value` and `actualValueState=not-supplied`;
- `readyForOperatorEvidenceValueDraft` can be true as structure while `readyForEvidenceImport=false`;
- `readyForOperatorImport=false` and `readyForManualEvidenceEntry=false` remain locked;
- `executionAllowed`, `writeRoutingAllowed`, `startsServices`, and `mutatesSiblingState` remain false;
- `importsRuntimePayload`, `acceptsSyntheticEvidence`, and `containsSecretValue` remain false;
- no fresh Java or mini-kv evidence is required.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd test -- @files test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 5 files, 29 tests.
- Adjacent controlled-preview tests passed: 22 files, 90 tests.
- Build passed.
