# Node v731 code walkthrough: runbook package closeout

v731 closes the runbook package covering Node v712-v731.

The implementation adds:

- runbook package types;
- runbook package builder and gates;
- runbook package Markdown renderer;
- profile, barrel, and catalog wiring;
- focused tests for ready and blocked flows.

Verification:

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbook.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts
npm.cmd test -- <all controlled-read-only shard preview tests> test\auditMinimalShardReadinessRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused tests passed: 4 files, 23 tests.
- Adjacent controlled-preview tests passed: 14 files, 50 tests.
- Build passed.
