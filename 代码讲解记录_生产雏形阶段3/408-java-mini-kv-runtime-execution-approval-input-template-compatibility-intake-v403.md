# Node v403 code walkthrough: runtime execution approval input template compatibility intake

## Entry Point

Route:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-compatibility-intake`

The route is registered in `src/routes/auditJsonMarkdownRoutes.ts` and supports JSON plus `?format=markdown`.

## Service Split

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake.ts` builds the v403 profile, loads Node v402, Java v166, mini-kv v157, computes checks, blockers, and next actions.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeTypes.ts` holds the profile and nested evidence types.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntakeRenderer.ts` renders Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateCompatibilityIntake.test.ts` verifies focused service behavior, forced historical fallback, and route exposure.

## Evidence Consumed

- Node v402 template validator route/archive.
- Java v166 compatibility receipt at `D:/javaproj/advanced-order-platform/e/166/evidence/java-shard-readiness-runtime-execution-approval-input-template-compatibility-v166.json`.
- mini-kv v157 template-validator echo at `D:/C/mini-kv/fixtures/release/shard-readiness-v157.json`, resolved through Node's frozen historical fixture.

## Boundary

v403 does not write canonical approval files:

- `e/398/input/node-approved-runtime-window-v398.json`
- `e/398/input/correlated-operator-approval-record-v398.json`
- `e/398/input/cross-project-runtime-execution-packet-v398.json`

Those remain absent, and their absence is reported as the only production blocker set.

## Result

- `readyForRuntimeExecutionApprovalInputTemplateCompatibilityIntake=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `compatibleUpstreamCount=2`
- `presentCanonicalInputCount=0`
- `validCanonicalInputCount=0`
- `productionBlockerCount=3`
