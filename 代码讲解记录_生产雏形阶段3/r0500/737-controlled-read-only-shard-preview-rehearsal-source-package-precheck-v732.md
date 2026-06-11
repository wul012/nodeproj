# Node v732 code walkthrough: rehearsal source package precheck

v732 starts the rehearsal packet from the v731 runbook package.

Key code:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalTypes.ts` defines the `Node v732` version range entry.
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalArtifacts.ts` adds `REHEARSAL_SOURCE_PACKAGE_PRECHECK`.

The step maps to `RUNBOOK_PACKAGE_CLOSEOUT`, records the source package digest through the packet digest input, and fails closed when the source package is blocked.

Safety boundary: no service starts, no writes, and no sibling state mutation.

Verification: covered by the rehearsal packet focused test.
