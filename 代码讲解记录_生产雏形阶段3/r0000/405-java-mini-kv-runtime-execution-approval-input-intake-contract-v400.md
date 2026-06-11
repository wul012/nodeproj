# Node v400 code walkthrough: Java / mini-kv runtime execution approval input intake contract

## Route

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-intake-contract`

## Files

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractTypes.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractRenderer.ts`
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract.test.ts`

## What v400 Consumes

v400 consumes three read-only sources:

- Node v399 archive verification.
- Java v164 approval gate input.
- mini-kv v155 approval gate input precheck.

The service reads Java and mini-kv through the historical evidence resolver, so tests cover both local sibling evidence and forced historical fallback.

## Contract Decision

v400 accepts Java v164 only as Java-side source evidence. It records mini-kv v155 as precheck-only, not a final mini-kv approval input.

The contract keeps four runtime blockers:

- final mini-kv approval gate input missing;
- Node-approved runtime window missing;
- correlated operator approval record missing;
- complete cross-project runtime execution packet missing.

## Runtime Boundary

v400 does not start Java, start mini-kv, stop sibling services, parse raw endpoint URLs, connect managed audit, run runtime probes, or enable active shard routing.

`readyForRuntimeExecutionPacket=false`, `readyForRuntimeLiveReadGate=false`, `runtimeExecutionPacketExecutable=false`, and `executionAllowed=false` remain fixed.

## Why It Exists

Earlier plans said that three inputs were required, but did not spell out the complete owner-by-owner handoff after Java v164 and mini-kv v155 landed. v400 makes the next requirements explicit so later work cannot confuse Java-side evidence or mini-kv precheck evidence with cross-project runtime approval.
