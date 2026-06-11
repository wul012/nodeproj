# Node v771 code walkthrough: command worksheet closeout

v771 closes the manual command worksheet covering Node v752-v771.

Implementation:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.ts` defines worksheet versions, step kinds, targets, gates, and aggregate state.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetArtifacts.ts` builds twenty command-review steps, computes gates, blocked reasons, target coverage, cleanup slot count, and a stable digest.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetRenderer.ts` renders the worksheet for archive review.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` wires the worksheet into the controlled shard preview profile after the v751 rehearsal packet.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts` registers the three worksheet modules and keeps the profile entry last.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` re-exports the builder and renderer through the stable review artifact barrel.

Tests:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet.test.ts` covers ready worksheet creation, blocked source rehearsal behavior, renderer output, and profile wiring.
- The barrel test proves the new builder and renderer stay available through the review artifact entry point.
- The catalog test proves the module catalog advanced to Node v771 with 28 ownership entries.
- The route test proves the profile Markdown exposes the command worksheet summary.

Safety:

- `readyForManualCommandReview` can become true only when all worksheet gates pass.
- `readyForLiveExecution`, `readyForProductionExecution`, `executionAllowed`, `writeRoutingAllowed`, `startsServices`, and `mutatesSiblingState` all remain false.
- `containsSecretValue` remains false.
- No fresh Java or mini-kv evidence is required; both sibling projects can continue in parallel.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 4 files, 22 tests.
- Adjacent controlled-preview tests passed: 16 files, 60 tests.
- Build passed.
