# Node v711 code walkthrough: twenty-version closeout

v711 closes the stage ledger that covers Node v692-v711.

The implementation adds:

- stage ledger types;
- stage ledger builder and gates;
- stage ledger Markdown renderer;
- profile, barrel, and catalog wiring;
- focused tests for ready and blocked flows.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 4 files, 22 tests.
- Adjacent controlled-preview tests passed: 13 files, 45 tests.
- Build passed.
