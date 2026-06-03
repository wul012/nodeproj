# v690 Controlled read-only shard preview live read-only packet candidate

## Purpose

v690 converts the v689 gap matrix into a manual live read-only packet candidate.

The candidate defines the next real-but-read-only window without starting services automatically:

- Node health and controlled shard preview JSON/Markdown targets;
- Java shard-readiness HTTP GET target;
- mini-kv `SHARDJSON` and `SHARDROUTEVERIFYREPORTJSON` TCP command targets;
- explicit process ownership and cleanup requirements.

## Change

Added:

- `ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate`;
- `createControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate`;
- deterministic candidate digest;
- candidate Markdown renderer.

The candidate is ready for a manual live read-only window when the v689 matrix is ready for packet planning, every target stays read-only, automatic service startup is disabled, and cleanup is required for every planned process step.

## Growth control

This version still does not execute the packet. It defines what the next live read-only run must do.

Necessity proof:

- blocker resolved: v689 identified missing process ownership and fresh live evidence, but did not give an executable window shape;
- later consumer: v691 verifies the candidate and archives the sections that must remain stable;
- reuse decision: v690 reuses existing source matrix readiness and does not create a second route surface;
- stop condition: the candidate is only valid while `automaticServiceStart=false`, `executionAllowed=false`, and `writeRoutingAllowed=false`.

## Cross-project status

Java and mini-kv are recommended parallel work.

For the eventual live read-only window, Java owns its read-only service start/stop, mini-kv owns its read-only server start/stop, and Node owns the smoke route calls and final cleanup record.

## Verification

Ran:

- `npm.cmd run typecheck`
- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewExecutionReadinessArtifacts.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts`

Result:

- Typecheck passed.
- Focused tests passed: 3 files, 17 tests.

No screenshot was needed because v690 adds a service artifact and Markdown renderer without a new route.
