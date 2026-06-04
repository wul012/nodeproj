# Node v751 code walkthrough: rehearsal packet closeout

v751 closes the manual live read-only rehearsal packet covering Node v732-v751.

Implementation:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.ts` defines the packet, gates, step kinds, and version range.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.ts` builds twenty ordered steps, computes gates, blocked reasons, and a stable digest.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalRenderer.ts` renders stable Markdown for archive review.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` wires the packet into the controlled shard preview profile after the v731 runbook package.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts` registers the three rehearsal modules and keeps the profile entry last.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifacts.ts` re-exports the builder and renderer through the stable review artifact barrel.

Tests:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsal.test.ts` covers ready packet creation, blocked source package behavior, renderer output, and profile wiring.
- The barrel test proves the new builder and renderer stay available through the review artifact entry point.
- The catalog test proves the module catalog advanced to Node v751 with 25 ownership entries.

Safety:

- `readyForManualLiveReadOnlyRehearsal` can become true only when all rehearsal gates pass.
- `readyForLiveExecution`, `readyForProductionExecution`, `executionAllowed`, `writeRoutingAllowed`, `startsServices`, and `mutatesSiblingState` all remain false.
- No fresh Java or mini-kv evidence is required; both sibling projects can continue in parallel.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsal.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 3 files, 20 tests.
- Adjacent controlled-preview tests passed: 15 files, 55 tests.
- Build passed.
