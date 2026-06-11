# Node v405 code walkthrough: runtime execution canonical approval input value validation

## Entry Point

Route:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-value-validation`

The route is registered in `src/routes/auditJsonMarkdownRoutes.ts` and supports JSON plus `?format=markdown`.

## Service Split

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation.ts` loads Node v404, reads the three canonical input files, validates values, computes checks, blockers, and next actions.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationTypes.ts` holds the profile and nested validation types.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationRenderer.ts` renders Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation.test.ts` verifies focused service behavior and route exposure.

## Inputs Validated

- `e/398/input/node-approved-runtime-window-v398.json`
- `e/398/input/correlated-operator-approval-record-v398.json`
- `e/398/input/cross-project-runtime-execution-packet-v398.json`

The three files share `approval-v405-20260531T130805-codex-auto`.

## Boundary

v405 validates values only. It does not start Java, start mini-kv, run runtime probes, connect managed audit, parse raw endpoint URLs, read credential values, write upstream state, or enable active shard routing.

## Result

- `readyForRuntimeExecutionCanonicalApprovalInputValueValidation=true`
- `readyForRuntimeExecutionPacket=true`
- `readyForRuntimeLiveReadGate=true`
- `presentTargetInputCount=3`
- `validTargetInputCount=3`
- `sharedApprovalCorrelationIdValidated=true`
- `productionBlockerCount=0`
