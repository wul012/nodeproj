# Node v836 code walkthrough: evidence intake review package closeout

v836 closes the evidence intake review package chain for v812-v836.

Implementation:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.ts` defines review versions, controls, gates, and package state.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageArtifacts.ts` builds twenty-five review controls from the v811 intake ledger, verifies gates, computes blocked reasons, and creates a stable digest.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageRenderer.ts` renders the package for archive review.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts` owns live-window route Markdown sections, reducing growth in the top-level renderer.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` wires the package into the profile after the v811 ledger.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts` registers the new package modules and renderer split boundary.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` re-exports the builder and renderer through the review artifact barrel.

Safety:

- `readyForManualEvidenceEntry`, `readyForLiveExecution`, `readyForProductionExecution`, `executionAllowed`, `writeRoutingAllowed`, `startsServices`, and `mutatesSiblingState` all remain false.
- `importsRuntimePayload`, `acceptsSyntheticEvidence`, and `containsSecretValue` remain false.
- No fresh Java or mini-kv evidence is required.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 5 files, 26 tests.
- Adjacent controlled-preview tests passed: 19 files, 75 tests.
- Build passed.
