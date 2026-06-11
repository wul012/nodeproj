# Node v402 code walkthrough: runtime execution approval input template validator

## Entry Point

Route:

`/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-approval-input-template-validator`

The route is registered in `src/routes/auditJsonMarkdownRoutes.ts` and supports both JSON and `?format=markdown`.

## Service Split

- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator.ts` builds the v402 profile, template bundle, target validation records, checks, blockers, and next actions.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorTypes.ts` keeps the profile, template, validation, summary, and message types separate from logic.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorRenderer.ts` renders the same profile as Markdown.
- `managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator.test.ts` verifies the service, forced historical fallback, and JSON/Markdown route.

## Boundary

v402 deliberately does not write files under `e/398/input/`. Those paths remain the canonical locations for real approval inputs:

- `e/398/input/node-approved-runtime-window-v398.json`
- `e/398/input/correlated-operator-approval-record-v398.json`
- `e/398/input/cross-project-runtime-execution-packet-v398.json`

Templates are archived under `e/402/input-templates/` so they can be inspected without accidentally satisfying prior gates.

## Validation Shape

The validator freezes:

- schema version and input kind for each missing input;
- Node v402, source Node v401, Java v165, and mini-kv v156 bindings;
- one shared `approvalCorrelationId` expectation;
- GET-only smoke constraints;
- cleanup rules and post-run cleanup proof requirements;
- runtime denial until real canonical files exist.

## Result

The v402 profile can be ready while runtime remains blocked:

- `readyForRuntimeExecutionApprovalInputTemplateValidator=true`
- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `templateCount=3`
- `presentTargetInputCount=0`
- `validTargetInputCount=0`
- `productionBlockerCount=3`
