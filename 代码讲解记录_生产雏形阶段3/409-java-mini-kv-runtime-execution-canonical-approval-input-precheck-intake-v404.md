# Node v404 code walkthrough: runtime execution canonical approval input precheck intake

## Entry Point

Route:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-canonical-approval-input-precheck-intake`

The route is registered in `src/routes/auditJsonMarkdownRoutes.ts` and supports JSON plus `?format=markdown`.

## Service Split

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake.ts` builds the v404 profile, loads Node v403, Java v167, mini-kv v158, computes checks, blockers, and next actions.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeTypes.ts` holds the profile and nested evidence types.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntakeRenderer.ts` renders Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputPrecheckIntake.test.ts` verifies focused service behavior, forced historical fallback, and route exposure.

## Evidence Consumed

- Node v403 template compatibility intake route/archive.
- Java v167 compatibility intake receipt at `D:/javaproj/advanced-order-platform/e/167/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-intake-v167.json`.
- mini-kv v158 canonical approval input precheck through Node's frozen `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v158.json` fixture.

## Boundary

v404 does not write canonical approval files:

- `e/398/input/node-approved-runtime-window-v398.json`
- `e/398/input/correlated-operator-approval-record-v398.json`
- `e/398/input/cross-project-runtime-execution-packet-v398.json`

Those remain absent, and their absence is reported as the only production blocker set.

## Result

- `readyForRuntimeExecutionCanonicalApprovalInputPrecheckIntake=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `completeUpstreamPrecheckCount=2`
- `presentCanonicalInputCount=0`
- `validCanonicalInputCount=0`
- `missingCanonicalInputCount=3`
- `productionBlockerCount=3`
