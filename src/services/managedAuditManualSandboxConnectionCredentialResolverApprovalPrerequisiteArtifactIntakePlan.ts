import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification.js";
import type {
  ApprovalPrerequisiteArtifactField,
  ApprovalPrerequisiteArtifactIntakeNecessityProof,
  ApprovalPrerequisiteArtifactIntakePlan,
  ApprovalPrerequisiteArtifactIntakePlanChecks,
  ApprovalPrerequisiteArtifactIntakePlanMessage,
  ApprovalPrerequisiteArtifactIntakePlanSummary,
  ApprovalPrerequisiteArtifactNoGoBoundary,
  ApprovalPrerequisiteArtifactProhibitedField,
  ApprovalPrerequisiteArtifactRejectionReason,
  ApprovalPrerequisiteArtifactUpstreamEchoRequest,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanProfile,
  SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan";
const SOURCE_NODE_V305_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlanProfile {
  const sourceNodeV305 = createSourceNodeV305Reference(input.config);
  const necessityProof = createNecessityProof();
  const artifactIntakePlan = createArtifactIntakePlan(sourceNodeV305, necessityProof);
  const checks = createChecks(input.config, sourceNodeV305, artifactIntakePlan, necessityProof);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan")
      .every(([, value]) => value);
  const planState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan
    ? "approval-prerequisite-artifact-intake-plan-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV305, artifactIntakePlan, checks, productionBlockers, warnings, recommendations);
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan;

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval prerequisite artifact intake plan",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    planState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: readyForParallelEcho,
    approvalPrerequisiteArtifactIntakePlanOnly: true,
    readOnlyArtifactContract: true,
    consumesNodeV305StopPrerequisiteUpstreamEchoVerification: true,
    sourceNodeVerificationVersion: "Node v305",
    nextJavaVersion: "Java v142",
    nextMiniKvVersion: "mini-kv v135",
    nextNodeVerificationVersion: "Node v307",
    readyForParallelJavaV142MiniKvV135Echo: readyForParallelEcho,
    readyForNodeV307BeforeUpstreamEcho: false,
    readyForDisabledRuntimeShellImplementation: false,
    readyForDisabledRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV305,
    artifactIntakePlan,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalPrerequisiteArtifactIntakePlanJson: ROUTE_PATH,
      approvalPrerequisiteArtifactIntakePlanMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV305Json: SOURCE_NODE_V305_ROUTE,
      sourceNodeV305Markdown: `${SOURCE_NODE_V305_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v306 as the artifact intake contract before any runtime shell implementation discussion.",
      "After Node v306 is complete, Java v142 and mini-kv v135 can run in parallel because they only echo the same read-only artifact contract.",
      "Node v307 must wait for both Java v142 and mini-kv v135, then verify their echo against this artifact intake plan.",
      "Stop immediately if a requested artifact includes credential values, raw endpoint URLs, provider/client configuration, HTTP/TCP calls, ledger writes, schema migration, mini-kv writes/admin commands, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV305Reference(config: AppConfig): SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v305",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    prerequisiteGateStillBlocked: source.echoVerification.prerequisiteGateStillBlocked,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    sourceNodeV304DecisionDigest: source.sourceNodeV304.decisionDigest,
    prerequisiteCount: source.summary.prerequisiteCount,
    missingRuntimePrerequisiteCount: source.summary.missingRuntimePrerequisiteCount,
    noGoConditionCount: source.summary.noGoConditionCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createArtifactIntakePlan(
  sourceNodeV305: SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference,
  necessityProof: ApprovalPrerequisiteArtifactIntakeNecessityProof,
): ApprovalPrerequisiteArtifactIntakePlan {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    artifactName: "managed-audit-runtime-shell-approval-prerequisite-artifact" as const,
    artifactVersion: "approval-prerequisite-artifact.v1" as const,
    intakeMode: "approval-prerequisite-artifact-intake-plan-only" as const,
    sourceSpan: "Node v305 + planned Java v142 + planned mini-kv v135" as const,
    purpose:
      "Capture non-secret approval prerequisite handles and review statuses required before any managed audit credential resolver runtime shell implementation can be discussed.",
    requiredFields,
    prohibitedFields,
    rejectionReasons,
    noGoBoundaries,
    upstreamEchoRequests,
    requiredFieldCount: requiredFields.length,
    prohibitedFieldCount: prohibitedFields.length,
    rejectionReasonCount: rejectionReasons.length,
    noGoBoundaryCount: noGoBoundaries.length,
    javaMiniKvEchoCanRunInParallel: true,
    implementationStillBlocked: true as const,
  };

  return {
    artifactDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      nodeV305Digest: sourceNodeV305.verificationDigest,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): ApprovalPrerequisiteArtifactField[] {
  return [
    requiredField("artifact_id", "Artifact id", "operator", "stable non-secret id", "Trace this intake artifact across Node, Java, and mini-kv evidence."),
    requiredField("source_node_verification", "Source Node verification", "node-v305", "Node v305 digest + route reference", "Bind the artifact to the v305 upstream echo verification."),
    requiredField("operator_approval_reference", "Operator approval reference", "operator", "non-secret approval ticket or review id", "Prove a human approval review exists before any runtime shell step."),
    requiredField("credential_handle_review_status", "Credential handle review status", "audit-process", "credential handle + status, no value", "Show that only a credential handle was reviewed."),
    requiredField("endpoint_handle_allowlist_review_status", "Endpoint handle allowlist review status", "audit-process", "endpoint handle + allowlist status, no raw URL", "Show that only an endpoint handle was reviewed."),
    requiredField("no_network_safety_test_reference", "No-network safety test reference", "node-v305", "test or report id", "Prove the intake remains offline and does not send HTTP/TCP."),
    requiredField("manual_abort_semantics_reference", "Manual abort semantics reference", "operator", "runbook or review id", "Document how an operator stops before any runtime shell invocation."),
    requiredField("rollback_semantics_reference", "Rollback semantics reference", "operator", "runbook or review id", "Document rollback expectations without executing deployment or rollback."),
    requiredField("java_echo_required_version", "Java echo required version", "java-v142", "Java v142 receipt reference", "Tell Java exactly which read-only artifact contract to echo."),
    requiredField("mini_kv_receipt_required_version", "mini-kv receipt required version", "mini-kv-v135", "mini-kv v135 receipt reference", "Tell mini-kv exactly which non-participation receipt to emit."),
    requiredField("created_by_operator_identity", "Created by operator identity", "operator", "operator id or identity handle", "Bind the artifact to a non-secret operator identity."),
    requiredField("audit_correlation_id", "Audit correlation id", "audit-process", "stable correlation id", "Link all later evidence without embedding secret material."),
  ];
}

function requiredField(
  id: string,
  label: string,
  source: ApprovalPrerequisiteArtifactField["source"],
  acceptedShape: string,
  purpose: string,
): ApprovalPrerequisiteArtifactField {
  return { id, label, required: true, source, acceptedShape, purpose };
}

function createProhibitedFields(): ApprovalPrerequisiteArtifactProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values are never accepted by Node, Java, or mini-kv in this stage.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "Raw endpoint URLs stay outside the artifact; only reviewed endpoint handles are allowed.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("secret_provider_config", "Secret provider configuration would imply implementation, not intake planning.", "PROVIDER_OR_CLIENT_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration would imply implementation, not intake planning.", "PROVIDER_OR_CLIENT_CONFIG_PRESENT"),
    prohibitedField("external_request_payload", "External HTTP/TCP payloads are forbidden before a later explicit connection version.", "EXTERNAL_REQUEST_REQUESTED"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes are Java-side production behavior and are blocked here.", "WRITE_OR_SCHEMA_MUTATION_REQUESTED"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is blocked in this artifact intake plan.", "WRITE_OR_SCHEMA_MUTATION_REQUESTED"),
    prohibitedField("mini_kv_write_command", "mini-kv must remain non-authoritative and read-only.", "MINI_KV_WRITE_OR_AUTHORITY_REQUESTED"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): ApprovalPrerequisiteArtifactProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): ApprovalPrerequisiteArtifactRejectionReason[] {
  return [
    rejectionReason("MISSING_OPERATOR_APPROVAL_REFERENCE", "operator-approval", "Reject artifacts without a non-secret operator approval reference."),
    rejectionReason("CREDENTIAL_VALUE_PRESENT", "credential-boundary", "Reject artifacts that include credential values instead of handles."),
    rejectionReason("RAW_ENDPOINT_URL_PRESENT", "endpoint-boundary", "Reject artifacts that include raw endpoint URLs instead of endpoint handles."),
    rejectionReason("NO_NETWORK_SAFETY_TEST_MISSING", "runtime-boundary", "Reject artifacts that do not cite a no-network safety check."),
    rejectionReason("ABORT_ROLLBACK_SEMANTICS_MISSING", "runtime-boundary", "Reject artifacts missing abort or rollback semantics."),
    rejectionReason("JAVA_OR_MINIKV_ECHO_MISSING", "upstream-echo", "Reject completion claims until Java v142 and mini-kv v135 echo this contract."),
    rejectionReason("RUNTIME_SHELL_IMPLEMENTATION_REQUESTED", "runtime-boundary", "Reject requests to implement, enable, or invoke a runtime shell."),
    rejectionReason("EXTERNAL_REQUEST_REQUESTED", "runtime-boundary", "Reject requests to send HTTP/TCP or instantiate providers/clients."),
    rejectionReason("WRITE_OR_SCHEMA_MUTATION_REQUESTED", "write-boundary", "Reject ledger writes, SQL migrations, deployments, rollbacks, and mini-kv write/admin commands."),
  ];
}

function rejectionReason(
  code: string,
  source: ApprovalPrerequisiteArtifactRejectionReason["source"],
  message: string,
): ApprovalPrerequisiteArtifactRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): ApprovalPrerequisiteArtifactNoGoBoundary[] {
  return [
    noGoBoundary("runtime_shell_implemented", "No runtime shell implementation belongs in v306."),
    noGoBoundary("runtime_shell_invocation_allowed", "No runtime shell invocation is allowed."),
    noGoBoundary("execution_allowed", "No execution path is opened by an intake plan."),
    noGoBoundary("connects_managed_audit", "No managed audit connection is opened."),
    noGoBoundary("credential_value_read", "No credential value is read or stored."),
    noGoBoundary("raw_endpoint_url_parsed", "No raw endpoint URL is parsed or rendered."),
    noGoBoundary("external_request_sent", "No HTTP/TCP request is sent."),
    noGoBoundary("provider_or_client_instantiated", "No secret provider, resolver client, fake provider, or fake client is instantiated."),
    noGoBoundary("schema_migration_executed", "No schema migration is executed."),
    noGoBoundary("approval_ledger_written", "No approval ledger write is performed."),
    noGoBoundary("mini_kv_write_or_authority", "mini-kv remains read-only and non-authoritative."),
    noGoBoundary("automatic_upstream_start", "Node does not start Java, mini-kv, or external audit services."),
  ];
}

function noGoBoundary(id: string, message: string): ApprovalPrerequisiteArtifactNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): ApprovalPrerequisiteArtifactUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v142",
      requestedEcho: "Echo the v306 artifact schema, required fields, rejection reasons, and no-go boundaries without ledger writes, SQL, deployment, rollback, or external managed audit calls.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v135",
      requestedEcho: "Emit a read-only non-participation receipt for the v306 artifact schema without LOAD, COMPACT, RESTORE, SETNXEX, writes, or authority claims.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createNecessityProof(): ApprovalPrerequisiteArtifactIntakeNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v305 proved the blocked prerequisite decision is echoed upstream, but the six documented-missing prerequisites still lack a concrete non-secret artifact shape.",
    consumer: "Java v142 + mini-kv v135, then Node v307",
    whyV305CannotBeReused:
      "v305 verifies Java v141 and mini-kv v134 echoed Node v304; it does not define required artifact fields, prohibited fields, rejection reasons, or no-go boundaries for the next intake.",
    existingReportReuseDecision:
      "Reuse v305 only as source evidence and create v306 as the smallest artifact intake contract consumed by Java v142, mini-kv v135, and Node v307.",
    stopCondition:
      "Stop if the next step asks for credential values, raw endpoint URLs, provider/client configuration, HTTP/TCP, runtime shell implementation or invocation, ledger writes, schema migration, mini-kv writes/admin commands, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV305: SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference,
  artifactIntakePlan: ApprovalPrerequisiteArtifactIntakePlan,
  necessityProof: ApprovalPrerequisiteArtifactIntakeNecessityProof,
): ApprovalPrerequisiteArtifactIntakePlanChecks {
  const prohibitedCodes = new Set(artifactIntakePlan.prohibitedFields.map((field) => field.rejectionCode));
  const rejectionCodes = new Set(artifactIntakePlan.rejectionReasons.map((reason) => reason.code));

  return {
    sourceNodeV305Ready: sourceNodeV305.readyForUpstreamEchoVerification,
    sourceNodeV305UpstreamEchoAligned: sourceNodeV305.upstreamEchoAligned,
    sourceNodeV305PrerequisiteGateBlocked:
      sourceNodeV305.prerequisiteGateStillBlocked
      && sourceNodeV305.prerequisiteCount === 6
      && sourceNodeV305.missingRuntimePrerequisiteCount === 6
      && sourceNodeV305.noGoConditionCount === 8,
    sourceNodeV305SideEffectsClosed:
      sourceNodeV305.sideEffectBoundariesAligned
      && sourceNodeV305.runtimeShellImplemented === false
      && sourceNodeV305.runtimeShellInvocationAllowed === false
      && sourceNodeV305.executionAllowed === false
      && sourceNodeV305.connectsManagedAudit === false
      && sourceNodeV305.credentialValueRead === false
      && sourceNodeV305.rawEndpointUrlParsed === false
      && sourceNodeV305.externalRequestSent === false
      && sourceNodeV305.schemaMigrationExecuted === false
      && sourceNodeV305.approvalLedgerWritten === false
      && sourceNodeV305.automaticUpstreamStart === false,
    requiredArtifactFieldsDocumented:
      artifactIntakePlan.requiredFields.length === 12
      && artifactIntakePlan.requiredFields.every((field) => field.required),
    prohibitedArtifactFieldsDocumented:
      artifactIntakePlan.prohibitedFields.length === 8
      && prohibitedCodes.has("CREDENTIAL_VALUE_PRESENT")
      && prohibitedCodes.has("RAW_ENDPOINT_URL_PRESENT")
      && prohibitedCodes.has("WRITE_OR_SCHEMA_MUTATION_REQUESTED"),
    rejectionReasonsDocumented:
      artifactIntakePlan.rejectionReasons.length === 9
      && rejectionCodes.has("JAVA_OR_MINIKV_ECHO_MISSING")
      && rejectionCodes.has("RUNTIME_SHELL_IMPLEMENTATION_REQUESTED")
      && rejectionCodes.has("EXTERNAL_REQUEST_REQUESTED"),
    noGoBoundariesClosed:
      artifactIntakePlan.noGoBoundaries.length === 12
      && artifactIntakePlan.noGoBoundaries.every((boundary) => boundary.allowed === false)
      && artifactIntakePlan.implementationStillBlocked,
    necessityProofDocumented:
      necessityProof.proofComplete
      && necessityProof.consumer === "Java v142 + mini-kv v135, then Node v307"
      && necessityProof.whyV305CannotBeReused.includes("does not define required artifact fields"),
    javaMiniKvEchoRequestExplicitlyParallel:
      artifactIntakePlan.upstreamEchoRequests.length === 2
      && artifactIntakePlan.upstreamEchoRequests.every((request) =>
        request.canRunInParallel && request.mustRemainReadOnly)
      && artifactIntakePlan.javaMiniKvEchoCanRunInParallel,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactIntakePlan: false,
  };
}

function collectProductionBlockers(
  checks: ApprovalPrerequisiteArtifactIntakePlanChecks,
): ApprovalPrerequisiteArtifactIntakePlanMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ApprovalPrerequisiteArtifactIntakePlanMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV305Ready
        && checks.sourceNodeV305UpstreamEchoAligned
        && checks.sourceNodeV305PrerequisiteGateBlocked
        && checks.sourceNodeV305SideEffectsClosed,
      code: "NODE_V305_SOURCE_NOT_READY",
      source: "node-v305-runtime-shell-chain-stop-prerequisite-upstream-echo-verification",
      message: "Node v305 must be ready, aligned, prerequisite-blocked, and side-effect-closed before v306 can define the artifact intake contract.",
    },
    {
      condition:
        checks.requiredArtifactFieldsDocumented
        && checks.prohibitedArtifactFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed
        && checks.necessityProofDocumented,
      code: "ARTIFACT_CONTRACT_INCOMPLETE",
      source: "approval-prerequisite-artifact-contract",
      message: "The artifact contract must document required fields, prohibited fields, rejection reasons, no-go boundaries, and necessity proof.",
    },
    {
      condition: checks.javaMiniKvEchoRequestExplicitlyParallel,
      code: "PARALLEL_ECHO_REQUEST_NOT_EXPLICIT",
      source: "approval-prerequisite-artifact-contract",
      message: "Java v142 and mini-kv v135 must be explicitly marked as independent read-only echo work before Node v307.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v306 artifact intake planning.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v306 artifact intake planning.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): ApprovalPrerequisiteArtifactIntakePlanMessage[] {
  return [
    {
      code: "ARTIFACT_INTAKE_PLAN_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan",
      message: "v306 defines the non-secret approval prerequisite artifact contract; it does not implement, enable, or invoke a runtime shell.",
    },
  ];
}

function collectRecommendations(): ApprovalPrerequisiteArtifactIntakePlanMessage[] {
  return [
    {
      code: "RUN_JAVA_V142_AND_MINI_KV_V135_IN_PARALLEL_AFTER_V306",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan",
      message: "After v306 is archived, Java v142 and mini-kv v135 can independently echo the same artifact contract because they do not depend on each other.",
    },
    {
      code: "VERIFY_ARTIFACT_ECHO_WITH_NODE_V307",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-intake-plan",
      message: "Node v307 should wait for both upstream echoes and verify the required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
  ];
}

function createSummary(
  sourceNodeV305: SourceNodeV305StopPrerequisiteUpstreamEchoVerificationReference,
  artifactIntakePlan: ApprovalPrerequisiteArtifactIntakePlan,
  checks: ApprovalPrerequisiteArtifactIntakePlanChecks,
  productionBlockers: ApprovalPrerequisiteArtifactIntakePlanMessage[],
  warnings: ApprovalPrerequisiteArtifactIntakePlanMessage[],
  recommendations: ApprovalPrerequisiteArtifactIntakePlanMessage[],
): ApprovalPrerequisiteArtifactIntakePlanSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    prerequisiteCountFromNodeV305: sourceNodeV305.prerequisiteCount,
    missingRuntimePrerequisiteCountFromNodeV305: sourceNodeV305.missingRuntimePrerequisiteCount,
    noGoConditionCountFromNodeV305: sourceNodeV305.noGoConditionCount,
    requiredFieldCount: artifactIntakePlan.requiredFieldCount,
    prohibitedFieldCount: artifactIntakePlan.prohibitedFieldCount,
    rejectionReasonCount: artifactIntakePlan.rejectionReasonCount,
    noGoBoundaryCount: artifactIntakePlan.noGoBoundaryCount,
    upstreamEchoRequestCount: artifactIntakePlan.upstreamEchoRequests.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
