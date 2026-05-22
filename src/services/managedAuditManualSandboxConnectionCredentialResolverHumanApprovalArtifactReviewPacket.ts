import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification.js";
import type {
  HumanApprovalArtifactReviewMissingFieldCheck,
  HumanApprovalArtifactReviewNoGoBoundary,
  HumanApprovalArtifactReviewPacket,
  HumanApprovalArtifactReviewPacketChecks,
  HumanApprovalArtifactReviewPacketMessage,
  HumanApprovalArtifactReviewPacketNecessityProof,
  HumanApprovalArtifactReviewPacketSummary,
  HumanApprovalArtifactReviewProhibitedField,
  HumanApprovalArtifactReviewRejectionReason,
  HumanApprovalArtifactReviewRequiredField,
  HumanApprovalArtifactReviewUpstreamEchoRequest,
  ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketProfile,
  SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet";
const SOURCE_NODE_V307_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-prerequisite-artifact-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacketProfile {
  const sourceNodeV307 = createSourceNodeV307(input.config);
  const reviewPacket = createReviewPacket(sourceNodeV307);
  const necessityProof = createNecessityProof();
  const checks = createChecks(input.config, sourceNodeV307, reviewPacket, necessityProof);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket")
      .every(([, value]) => value);
  const reviewPacketState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket
    ? "human-approval-artifact-review-packet-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV307, reviewPacket, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver human approval artifact review packet",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewPacketState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket,
    humanApprovalArtifactReviewPacketOnly: true,
    readOnlyReviewPacketContract: true,
    consumesNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerification: true,
    activeNodeReviewVersion: "Node v308",
    nextJavaVersion: "Java v143",
    nextMiniKvVersion: "mini-kv v136",
    nextNodeVerificationVersion: "Node v309",
    readyForParallelJavaV143MiniKvV136Echo: checks.javaMiniKvEchoRequestExplicitlyParallel,
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
    sourceNodeV307,
    reviewPacket,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      humanApprovalArtifactReviewPacketJson: ROUTE_PATH,
      humanApprovalArtifactReviewPacketMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV307Json: SOURCE_NODE_V307_ROUTE,
      sourceNodeV307Markdown: `${SOURCE_NODE_V307_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v308 as the contract-only human approval artifact review packet before any runtime shell implementation can be discussed.",
      "Run Java v143 and mini-kv v136 in parallel after v308; both should only echo this packet contract and keep all runtime, credential, network, write, and authority boundaries closed.",
      "Node v309 must wait for both Java v143 and mini-kv v136, then verify the upstream echoes before any later plan can consider a disabled runtime shell candidate.",
    ],
  };
}

function createSourceNodeV307(config: AppConfig): SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v307",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalPrerequisiteArtifactUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    verificationMode: source.echoVerification.verificationMode,
    sourceSpan: source.echoVerification.sourceSpan,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    artifactContractAligned: source.echoVerification.artifactContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    sourceNodeV306ArtifactDigest: source.sourceNodeV306.artifactDigest,
    sourceNodeV306PlanState: source.sourceNodeV306.planState,
    sourceNodeV306RequiredFieldCount: source.summary.requiredFieldCount,
    sourceNodeV306ProhibitedFieldCount: source.summary.prohibitedFieldCount,
    sourceNodeV306RejectionReasonCount: source.summary.rejectionReasonCount,
    sourceNodeV306NoGoBoundaryCount: source.summary.noGoBoundaryCount,
    sourceNodeV306UpstreamEchoRequestCount: source.summary.upstreamEchoRequestCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
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

function createReviewPacket(
  sourceNodeV307: SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference,
): HumanApprovalArtifactReviewPacket {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const missingFieldChecks = requiredFields.map((field): HumanApprovalArtifactReviewMissingFieldCheck => ({
    fieldId: field.id,
    rejectionCode: field.missingFieldCode,
  }));
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    packetName: "managed-audit-runtime-shell-human-approval-artifact-review-packet" as const,
    packetVersion: "human-approval-artifact-review-packet.v1" as const,
    reviewMode: "human-approval-artifact-review-packet-contract-only" as const,
    sourceSpan: "Node v307" as const,
    requiredFields,
    prohibitedFields,
    rejectionReasons,
    missingFieldChecks,
    noGoBoundaries,
    upstreamEchoRequests,
    requiredFieldCount: requiredFields.length,
    prohibitedFieldCount: prohibitedFields.length,
    rejectionReasonCount: rejectionReasons.length,
    missingFieldCheckCount: missingFieldChecks.length,
    noGoBoundaryCount: noGoBoundaries.length,
    upstreamEchoRequestCount: upstreamEchoRequests.length,
    implementationStillBlocked: true as const,
  };

  return {
    packetDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceNodeV307VerificationDigest: sourceNodeV307.verificationDigest,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): HumanApprovalArtifactReviewRequiredField[] {
  return [
    requiredField("artifact_id", "Artifact id", "Stable artifact id bound to the human review packet."),
    requiredField("operator_approval_reference", "Operator approval reference", "Human approval reference or ticket handle."),
    requiredField("credential_handle_review_status", "Credential handle review status", "Review status for the credential handle, not credential value."),
    requiredField("endpoint_handle_allowlist_review_status", "Endpoint handle allowlist review status", "Allowlist review status for endpoint handle, not raw URL."),
    requiredField("no_network_safety_test_reference", "No-network safety test reference", "Evidence that review packet validation performs no HTTP/TCP request."),
    requiredField("manual_abort_semantics_reference", "Manual abort semantics reference", "Documented operator abort behavior before runtime discussion."),
    requiredField("rollback_semantics_reference", "Rollback semantics reference", "Documented rollback behavior without executing rollback."),
    requiredField("created_by_operator_identity", "Created by operator identity", "Verified operator identity for the review artifact."),
    requiredField("audit_correlation_id", "Audit correlation id", "Correlation id linking artifact review, audit trail, and later echo verification."),
  ];
}

function requiredField(
  id: string,
  label: string,
  requiredEvidence: string,
): HumanApprovalArtifactReviewRequiredField {
  return {
    id,
    label,
    requiredEvidence,
    missingFieldCode: `MISSING_${id.toUpperCase()}`,
  };
}

function createProhibitedFields(): HumanApprovalArtifactReviewProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must never enter Node, Java, or mini-kv evidence.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "The review packet may carry endpoint handle status, not raw endpoint URLs.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("secret_provider_config", "Provider config would move v308 from contract review into implementation.", "PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client config would instantiate the runtime path too early.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("external_request_payload", "v308 must not prepare or send HTTP/TCP payloads.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Ledger writes are outside this read-only packet contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in the review packet.", "SCHEMA_MIGRATION_SQL_PRESENT"),
    prohibitedField("mini_kv_write_command", "mini-kv remains non-authoritative and must not receive write/admin commands.", "MINI_KV_WRITE_COMMAND_PRESENT"),
    prohibitedField("runtime_shell_invocation_request", "Runtime shell invocation is still blocked after v308.", "RUNTIME_SHELL_INVOCATION_REQUEST_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): HumanApprovalArtifactReviewProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): HumanApprovalArtifactReviewRejectionReason[] {
  return [
    rejectionReason("MISSING_ARTIFACT_ID", "Reject when artifact_id is absent or blank."),
    rejectionReason("MISSING_OPERATOR_APPROVAL_REFERENCE", "Reject when the operator approval reference is absent."),
    rejectionReason("MISSING_CREDENTIAL_HANDLE_REVIEW_STATUS", "Reject when credential handle review status is absent."),
    rejectionReason("MISSING_ENDPOINT_HANDLE_ALLOWLIST_REVIEW_STATUS", "Reject when endpoint handle allowlist review status is absent."),
    rejectionReason("MISSING_NO_NETWORK_SAFETY_TEST_REFERENCE", "Reject when no-network safety test reference is absent."),
    rejectionReason("MISSING_ABORT_OR_ROLLBACK_SEMANTICS", "Reject when abort or rollback semantics are missing."),
    rejectionReason("CREDENTIAL_VALUE_PRESENT", "Reject any artifact that includes credential values."),
    rejectionReason("RAW_ENDPOINT_URL_PRESENT", "Reject any artifact that includes a raw endpoint URL."),
    rejectionReason("PROVIDER_OR_CLIENT_CONFIG_PRESENT", "Reject provider or resolver client config."),
    rejectionReason("EXTERNAL_REQUEST_REQUESTED", "Reject external request payloads or execution requests."),
    rejectionReason("WRITE_OR_SCHEMA_MUTATION_REQUESTED", "Reject ledger writes and schema migration requests."),
    rejectionReason("MINI_KV_WRITE_OR_AUTHORITY_REQUESTED", "Reject mini-kv writes, admin commands, and authority claims."),
    rejectionReason("RUNTIME_SHELL_IMPLEMENTATION_REQUESTED", "Reject runtime shell implementation or invocation requests."),
  ];
}

function rejectionReason(code: string, message: string): HumanApprovalArtifactReviewRejectionReason {
  return { code, message };
}

function createNoGoBoundaries(): HumanApprovalArtifactReviewNoGoBoundary[] {
  return [
    noGoBoundary("credential_value_read", "Review only credential handle status."),
    noGoBoundary("raw_endpoint_url_parse", "Review only endpoint handle allowlist status."),
    noGoBoundary("secret_provider_instantiation", "No secret provider can be instantiated in v308."),
    noGoBoundary("resolver_client_instantiation", "No resolver client can be instantiated in v308."),
    noGoBoundary("fake_provider_or_client", "No fake provider/client is introduced as a shortcut."),
    noGoBoundary("external_http_or_tcp_request", "No HTTP/TCP request is prepared or sent."),
    noGoBoundary("runtime_shell_implementation", "Disabled runtime shell implementation remains blocked."),
    noGoBoundary("runtime_shell_invocation", "Runtime shell invocation remains blocked."),
    noGoBoundary("approval_ledger_write", "Approval ledger writes remain blocked."),
    noGoBoundary("schema_migration", "Schema migration remains blocked."),
    noGoBoundary("mini_kv_write_or_authority", "mini-kv stays a read-only evidence provider."),
    noGoBoundary("automatic_upstream_start", "Node must not start Java, mini-kv, or external audit services."),
  ];
}

function noGoBoundary(id: string, reason: string): HumanApprovalArtifactReviewNoGoBoundary {
  return { id, closed: true, reason };
}

function createUpstreamEchoRequests(): HumanApprovalArtifactReviewUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v143",
      mode: "read-only-human-approval-artifact-review-packet-echo",
      canRunInParallel: true,
      requiredBeforeNodeV309: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v136",
      mode: "read-only-human-approval-artifact-review-non-participation-receipt",
      canRunInParallel: true,
      requiredBeforeNodeV309: true,
    },
  ];
}

function createNecessityProof(): HumanApprovalArtifactReviewPacketNecessityProof {
  return {
    blockerResolved:
      "Node v307 proves the upstream echo alignment but leaves the human-submitted approval artifact review shape undefined.",
    nextConsumer: "Java v143 + mini-kv v136, then Node v309",
    whyV307CannotBeReused:
      "v307 verifies that Java and mini-kv echoed the Node v306 artifact prerequisite plan; it does not define the review packet fields, missing-field checks, prohibited-field checks, or rejection reasons for a human-supplied artifact.",
    existingReportReuseDecision:
      "Reuse v307 only as the source readiness reference, then create the smallest v308 packet contract for human approval artifact review.",
    stopCondition:
      "Stop if the work requires credential values, raw endpoint URLs, provider/client config, fake clients, external HTTP/TCP, runtime shell implementation, ledger writes, schema migration, mini-kv writes, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV307: SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference,
  reviewPacket: HumanApprovalArtifactReviewPacket,
  necessityProof: HumanApprovalArtifactReviewPacketNecessityProof,
): HumanApprovalArtifactReviewPacketChecks {
  return {
    sourceNodeV307Ready: sourceNodeV307.readyForUpstreamEchoVerification,
    sourceNodeV307UpstreamEchoAligned: sourceNodeV307.upstreamEchoAligned,
    sourceNodeV307ArtifactContractAligned: sourceNodeV307.artifactContractAligned,
    sourceNodeV307SideEffectsClosed:
      sourceNodeV307.sideEffectBoundariesAligned
      && sourceNodeV307.runtimeShellImplemented === false
      && sourceNodeV307.runtimeShellInvocationAllowed === false
      && sourceNodeV307.executionAllowed === false
      && sourceNodeV307.connectsManagedAudit === false
      && sourceNodeV307.credentialValueRead === false
      && sourceNodeV307.rawEndpointUrlParsed === false
      && sourceNodeV307.externalRequestSent === false
      && sourceNodeV307.schemaMigrationExecuted === false
      && sourceNodeV307.approvalLedgerWritten === false
      && sourceNodeV307.automaticUpstreamStart === false,
    requiredReviewFieldsDocumented:
      reviewPacket.requiredFieldCount === 9
      && reviewPacket.requiredFields.some((field) => field.id === "operator_approval_reference")
      && reviewPacket.requiredFields.some((field) => field.id === "credential_handle_review_status")
      && reviewPacket.requiredFields.some((field) => field.id === "endpoint_handle_allowlist_review_status")
      && reviewPacket.requiredFields.some((field) => field.id === "no_network_safety_test_reference")
      && reviewPacket.requiredFields.some((field) => field.id === "manual_abort_semantics_reference")
      && reviewPacket.requiredFields.some((field) => field.id === "rollback_semantics_reference")
      && reviewPacket.requiredFields.some((field) => field.id === "created_by_operator_identity")
      && reviewPacket.requiredFields.some((field) => field.id === "audit_correlation_id"),
    prohibitedReviewFieldsDocumented:
      reviewPacket.prohibitedFieldCount === 9
      && reviewPacket.prohibitedFields.some((field) => field.id === "credential_value")
      && reviewPacket.prohibitedFields.some((field) => field.id === "raw_endpoint_url")
      && reviewPacket.prohibitedFields.some((field) => field.id === "secret_provider_config")
      && reviewPacket.prohibitedFields.some((field) => field.id === "resolver_client_config")
      && reviewPacket.prohibitedFields.some((field) => field.id === "runtime_shell_invocation_request"),
    rejectionReasonsDocumented:
      reviewPacket.rejectionReasonCount === 13
      && reviewPacket.rejectionReasons.some((reason) => reason.code === "CREDENTIAL_VALUE_PRESENT")
      && reviewPacket.rejectionReasons.some((reason) => reason.code === "RAW_ENDPOINT_URL_PRESENT")
      && reviewPacket.rejectionReasons.some((reason) => reason.code === "RUNTIME_SHELL_IMPLEMENTATION_REQUESTED"),
    missingFieldChecksDocumented:
      reviewPacket.missingFieldCheckCount === reviewPacket.requiredFieldCount
      && reviewPacket.missingFieldChecks.every((check) => check.rejectionCode.startsWith("MISSING_")),
    noGoBoundariesClosed:
      reviewPacket.noGoBoundaryCount === 12
      && reviewPacket.noGoBoundaries.every((boundary) => boundary.closed),
    necessityProofDocumented:
      necessityProof.blockerResolved.includes("v307")
      && necessityProof.nextConsumer === "Java v143 + mini-kv v136, then Node v309"
      && necessityProof.whyV307CannotBeReused.includes("missing-field checks")
      && necessityProof.stopCondition.includes("credential values"),
    javaMiniKvEchoRequestExplicitlyParallel:
      reviewPacket.upstreamEchoRequestCount === 2
      && reviewPacket.upstreamEchoRequests.every((request) => request.canRunInParallel && request.requiredBeforeNodeV309)
      && reviewPacket.upstreamEchoRequests.some((request) => request.version === "Java v143")
      && reviewPacket.upstreamEchoRequests.some((request) => request.version === "mini-kv v136"),
    reviewPacketStaysContractOnly: reviewPacket.reviewMode === "human-approval-artifact-review-packet-contract-only"
      && reviewPacket.implementationStillBlocked,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPacket: false,
  };
}

function collectProductionBlockers(
  checks: HumanApprovalArtifactReviewPacketChecks,
): HumanApprovalArtifactReviewPacketMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: HumanApprovalArtifactReviewPacketMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV307Ready
        && checks.sourceNodeV307UpstreamEchoAligned
        && checks.sourceNodeV307ArtifactContractAligned
        && checks.sourceNodeV307SideEffectsClosed,
      code: "NODE_V307_UPSTREAM_ECHO_NOT_READY",
      source: "node-v307-approval-prerequisite-artifact-upstream-echo-verification",
      message: "Node v307 must prove upstream echo alignment and closed side-effect boundaries before v308 can define a review packet.",
    },
    {
      condition:
        checks.requiredReviewFieldsDocumented
        && checks.prohibitedReviewFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.missingFieldChecksDocumented
        && checks.noGoBoundariesClosed,
      code: "HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_CONTRACT_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet",
      message: "The human approval artifact review packet must document required fields, prohibited fields, rejection reasons, missing-field checks, and closed no-go boundaries.",
    },
    {
      condition:
        checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.reviewPacketStaysContractOnly,
      code: "HUMAN_APPROVAL_ARTIFACT_REVIEW_PACKET_GROWTH_CONTROL_MISSING",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet",
      message: "v308 must include a necessity proof, explicitly request parallel Java v143 + mini-kv v136 echo, and remain contract-only.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v308 review packet contract generation.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v308 review packet contract generation.",
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

function collectWarnings(): HumanApprovalArtifactReviewPacketMessage[] {
  return [
    {
      code: "REVIEW_PACKET_DOES_NOT_AUTHORIZE_RUNTIME_SHELL",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet",
      message: "v308 defines how a human approval artifact is reviewed; it does not implement or invoke a runtime shell.",
    },
  ];
}

function collectRecommendations(): HumanApprovalArtifactReviewPacketMessage[] {
  return [
    {
      code: "RUN_JAVA_V143_AND_MINI_KV_V136_IN_PARALLEL",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet",
      message: "After v308 is archived, Java v143 and mini-kv v136 can independently echo this review packet contract in parallel.",
    },
    {
      code: "VERIFY_REVIEW_PACKET_ECHO_WITH_NODE_V309",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet",
      message: "Node v309 should consume both upstream echoes and keep runtime shell implementation blocked.",
    },
  ];
}

function createSummary(
  sourceNodeV307: SourceNodeV307ApprovalPrerequisiteArtifactUpstreamEchoVerificationReference,
  reviewPacket: HumanApprovalArtifactReviewPacket,
  checks: HumanApprovalArtifactReviewPacketChecks,
  productionBlockers: HumanApprovalArtifactReviewPacketMessage[],
  warnings: HumanApprovalArtifactReviewPacketMessage[],
  recommendations: HumanApprovalArtifactReviewPacketMessage[],
): HumanApprovalArtifactReviewPacketSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV307CheckCount: sourceNodeV307.sourceSummary.checkCount,
    sourceNodeV307PassedCheckCount: sourceNodeV307.sourceSummary.passedCheckCount,
    requiredFieldCount: reviewPacket.requiredFieldCount,
    prohibitedFieldCount: reviewPacket.prohibitedFieldCount,
    rejectionReasonCount: reviewPacket.rejectionReasonCount,
    missingFieldCheckCount: reviewPacket.missingFieldCheckCount,
    noGoBoundaryCount: reviewPacket.noGoBoundaryCount,
    upstreamEchoRequestCount: reviewPacket.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
