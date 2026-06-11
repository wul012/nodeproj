# Node v399 code walkthrough: Java / mini-kv runtime execution packet approval gate review archive verification

## Entry Point

The v399 route is:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review-archive-verification`

It is registered in `src/routes/auditJsonMarkdownRoutes.ts` and follows the JSON / `?format=markdown` audit route pattern.

## Service Split

The implementation is split into:

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerification.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationTypes.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewArchiveVerificationRenderer.ts`

The split keeps the archive verifier separate from the v398 approval gate service and avoids growing the v398 service into a mixed concern file.

## What v399 Verifies

v399 verifies the v398 archive set under `e/398`:

- JSON route output;
- Markdown route output;
- summary JSON;
- browser snapshot;
- HTML archive;
- screenshot;
- explanation;
- code walkthrough;
- active plan;
- plan index;
- archive index.

It also replays the v398 approval-gate review using frozen evidence and verifies that the three approval-gate inputs remain missing and runtime remains blocked.

## Runtime Boundary

v399 is archive verification only:

- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `archiveVerificationOnly=true`
- `presentRuntimeExecutionArtifactCount=0`
- `missingRuntimeExecutionArtifactCount=6`
- `runtimeExecutionPacketPresent=false`
- `runtimeExecutionPacketExecutable=false`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `activeShardPrototypeEnabled=false`

## Verification Focus

The focused test covers:

- successful v398 archive verification and replay;
- fail-closed behavior when the v398 archive is unavailable;
- JSON and Markdown route output with access-guard headers.
