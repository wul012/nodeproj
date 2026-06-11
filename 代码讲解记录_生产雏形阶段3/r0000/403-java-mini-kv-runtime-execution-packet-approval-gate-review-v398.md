# Node v398 code walkthrough: Java / mini-kv runtime execution packet approval gate review

## Entry Point

The v398 route is:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-packet-approval-gate-review`

It is registered in `src/routes/auditJsonMarkdownRoutes.ts` and follows the existing JSON / `?format=markdown` audit route pattern.

## Service Split

The implementation is split into:

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewTypes.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewRenderer.ts`

This version keeps the type contract, renderer, and profile builder separate so the runtime chain does not become a single large maintenance-heavy file.

## Source Evidence Handling

v398 reads the frozen v397 archive JSON from:

`e/397/evidence/java-mini-kv-runtime-execution-packet-contribution-review-v397-http.json`

It does not re-run v397. That keeps historical approval-gate behavior stable even after Java or mini-kv publish later evidence.

## Approval Gate Inputs

v398 scans only Node-owned input paths:

- `e/398/input/node-approved-runtime-window-v398.json`
- `e/398/input/correlated-operator-approval-record-v398.json`
- `e/398/input/cross-project-runtime-execution-packet-v398.json`

All three are missing in this version, so the approval gate review completes as blocked.

## Runtime Boundary

v398 keeps runtime closed:

- `presentRuntimeExecutionArtifactCount=0`
- `missingRuntimeExecutionArtifactCount=6`
- `runtimeExecutionPacketPresent=false`
- `runtimeExecutionPacketExecutable=false`
- `runtimeGateApprovalPresent=false`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `activeShardPrototypeEnabled=false`

The production blockers are the three missing approval-gate inputs, not failed checks. The service can therefore report `checkCount=26` and `passedCheckCount=26` while still correctly blocking runtime approval.

## Verification Focus

The focused test covers:

- successful approval-gate blocked review from frozen v397 evidence;
- fail-closed behavior when the v397 archive JSON is unavailable;
- JSON and Markdown route output with access-guard headers.
