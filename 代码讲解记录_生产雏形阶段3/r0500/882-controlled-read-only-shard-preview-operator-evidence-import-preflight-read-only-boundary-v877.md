# Node v877 code walkthrough: operator evidence import preflight read-only boundary

v877 contributes `IMPORT_PREFLIGHT_READ_ONLY_BOUNDARY` to the operator evidence import preflight. It maps back to `ENTRY_WORKSHEET_READ_ONLY_BOUNDARY` from the v861 worksheet and preserves read-only boundary checks before import.

Implementation:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.ts` defines preflight versions v862-v886, slot kinds, gate names, and aggregate preflight state.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotBuilder.ts` builds twenty-five preflight slots from worksheet slots and owns the template list.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightArtifacts.ts` checks twenty-four gates, computes blocked reason codes, and creates a stable import preflight digest.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightRenderer.ts` renders gates and slot records into stable Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` wires the preflight after the v861 worksheet in the controlled preview profile.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts` adds the route summary section for the preflight.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts` registers the new preflight modules and updates catalog validation to Node v886.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` re-exports the preflight builder and renderer through the stable barrel.

Safety:

- the slot remains not imported: `importValueState=not-imported`, `manualValueState=not-entered`, and `readyForOperatorImport=false`;
- the preflight can be ready as structure while `readyForEvidenceImport=false`;
- `executionAllowed`, `writeRoutingAllowed`, `startsServices`, and `mutatesSiblingState` remain false;
- `importsRuntimePayload`, `acceptsSyntheticEvidence`, and `containsSecretValue` remain false;
- no fresh Java or mini-kv evidence is required.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
```

Result so far:

- Typecheck passed.
- Focused tests passed: 5 files, 28 tests.
- Adjacent controlled-preview tests passed: 21 files, 85 tests.
- Build passed.
