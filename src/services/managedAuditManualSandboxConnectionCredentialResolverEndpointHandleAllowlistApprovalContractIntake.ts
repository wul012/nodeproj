import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview.js";
import type {
  EndpointHandleAllowlistApprovalContract,
  EndpointHandleAllowlistApprovalContractIntakeChecks,
  EndpointHandleAllowlistApprovalContractIntakeMessage,
  EndpointHandleAllowlistApprovalContractIntakeSummary,
  EndpointHandleAllowlistApprovalContractNecessityProof,
  EndpointHandleAllowlistApprovalNoGoBoundary,
  EndpointHandleAllowlistApprovalPrerequisiteTransition,
  EndpointHandleAllowlistApprovalProhibitedField,
  EndpointHandleAllowlistApprovalRejectionReason,
  EndpointHandleAllowlistApprovalRequiredField,
  EndpointHandleAllowlistApprovalUpstreamEchoRequest,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile,
  SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake";
const SOURCE_NODE_V319_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review";
const ACTIVE_PLAN = "docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md";
const TARGET_PREREQUISITE_ID = "endpoint-handle-allowlist-approval" as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntakeProfile {
  const sourceNodeV319 = createSourceNodeV319(input.config);
  const prerequisiteTransition = createPrerequisiteTransition(sourceNodeV319);
  const necessityProof = createNecessityProof();
  const endpointHandleAllowlistApprovalContract = createEndpointHandleAllowlistApprovalContract(
    sourceNodeV319,
    prerequisiteTransition,
    necessityProof,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV319,
    endpointHandleAllowlistApprovalContract,
    prerequisiteTransition,
    necessityProof,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake")
      .every(([, value]) => value);
  const contractState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake
      ? "endpoint-handle-allowlist-approval-contract-intake-ready"
      : "blocked";
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV319,
    endpointHandleAllowlistApprovalContract,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    governanceChainDecision: "continue-only-for-endpoint-handle-allowlist-approval-contract-intake",
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake:
      readyForParallelEcho,
    endpointHandleAllowlistApprovalContractIntakeOnly: true,
    readOnlyEndpointHandleAllowlistApprovalContract: true,
    consumesNodeV319CredentialHandleApprovalPrerequisiteClosureReview: true,
    consumesNodeV313PrerequisiteCatalog: true,
    activeNodeContractVersion: "Node v320",
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    nextJavaVersion: "Java v147",
    nextMiniKvVersion: "mini-kv v140",
    nextNodeVerificationVersion: "Node v321",
    readyForParallelJavaV147MiniKvV140Echo: readyForParallelEcho,
    readyForNodeV321BeforeUpstreamEcho: false,
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
    endpointHandleAllowlistApproved: false,
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
    sourceNodeV319,
    endpointHandleAllowlistApprovalContract,
    prerequisiteTransition,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      endpointHandleAllowlistApprovalContractIntakeJson: ROUTE_PATH,
      endpointHandleAllowlistApprovalContractIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV319Json: SOURCE_NODE_V319_ROUTE,
      sourceNodeV319Markdown: `${SOURCE_NODE_V319_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v320 as the endpoint-handle allowlist approval contract-only intake.",
      "After v320 is complete, Java v147 and mini-kv v140 can run in parallel as read-only echo and non-participation receipt work.",
      "Node v321 must wait for both Java v147 and mini-kv v140 before verifying endpoint-handle allowlist approval echo alignment.",
      "Stop immediately if the endpoint-handle allowlist contract tries to include credential values, raw endpoint URLs, provider/client config, external request payloads, ledger/schema writes, runtime shell behavior, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV319(
  config: AppConfig,
): SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview({
    config,
  });

  return {
    sourceVersion: "Node v319",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForCredentialHandleApprovalPrerequisiteClosureReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview,
    reviewDigest: source.closureReview.reviewDigest,
    completedPrerequisiteCount: source.closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: source.closureReview.remainingPrerequisiteCount,
    originalPrerequisiteCount: source.closureReview.originalPrerequisiteCount,
    nextConcretePrerequisiteId: source.closureReview.nextConcretePrerequisiteId,
    nextConcretePrerequisiteContractRequired: source.closureReview.nextConcretePrerequisiteContractRequired,
    nextNodeVersionSuggested: source.closureReview.nextNodeVersionSuggested,
    chainContinuationAllowed: source.closureReview.chainContinuationAllowed,
    runtimeShellStillBlocked: source.closureReview.runtimeShellStillBlocked,
    completedPrerequisiteIds: source.closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id),
    remainingPrerequisiteIds: source.closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id),
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
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

function createEndpointHandleAllowlistApprovalContract(
  sourceNodeV319: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
  prerequisiteTransition: EndpointHandleAllowlistApprovalPrerequisiteTransition,
  necessityProof: EndpointHandleAllowlistApprovalContractNecessityProof,
): EndpointHandleAllowlistApprovalContract {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    contractName: "managed-audit-endpoint-handle-allowlist-approval" as const,
    contractVersion: "endpoint-handle-allowlist-approval.v1" as const,
    contractMode: "endpoint-handle-allowlist-approval-contract-intake-only" as const,
    sourceSpan: "Node v319 closure review + Node v313 catalog" as const,
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    purpose:
      "Define the non-secret endpoint handle allowlist approval shape required before any later resolver can discuss a managed audit sandbox endpoint.",
    requiredFields,
    prohibitedFields,
    rejectionReasons,
    noGoBoundaries,
    upstreamEchoRequests,
    requiredFieldCount: requiredFields.length,
    prohibitedFieldCount: prohibitedFields.length,
    rejectionReasonCount: rejectionReasons.length,
    noGoBoundaryCount: noGoBoundaries.length,
    upstreamEchoRequestCount: upstreamEchoRequests.length,
    implementationStillBlocked: true as const,
  };

  return {
    contractDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceNodeV319ReviewDigest: sourceNodeV319.reviewDigest,
      prerequisiteTransition,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): EndpointHandleAllowlistApprovalRequiredField[] {
  return [
    requiredField("endpoint_handle", "Endpoint handle", "stable non-secret endpoint handle", "Identify which endpoint handle was reviewed without exposing the raw endpoint URL."),
    requiredField("approval_correlation_id", "Approval correlation id", "stable non-secret correlation id", "Bind the endpoint allowlist review to the signed approval chain."),
    requiredField("operator_identity_handle", "Operator identity handle", "operator identity handle, no credential value", "Identify the requesting operator without embedding secret material."),
    requiredField("reviewer_identity_handle", "Reviewer identity handle", "reviewer identity handle, no private key", "Identify the human reviewer without carrying credentials or signing keys."),
    requiredField("policy_version", "Policy version", "policy id or semantic version", "Bind the endpoint allowlist approval to a known review policy contract."),
    requiredField("approval_status", "Approval status", "approved, rejected, expired, or revoked", "Keep this version contract-only and status-based."),
    requiredField("issued_at", "Issued at", "ISO-8601 timestamp", "Declare when the endpoint handle allowlist approval was issued."),
    requiredField("expires_at", "Expires at", "ISO-8601 timestamp", "Prevent stale endpoint allowlist approvals from being treated as current."),
    requiredField("revocation_marker", "Revocation marker", "boolean marker plus optional evidence handle", "Make revocation explicit without reading any secret provider state."),
    requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest", "Prove contract immutability without embedding raw credential or endpoint material."),
  ];
}

function requiredField(
  id: EndpointHandleAllowlistApprovalRequiredField["id"],
  label: string,
  acceptedShape: string,
  purpose: string,
): EndpointHandleAllowlistApprovalRequiredField {
  return { id, label, required: true, acceptedShape, purpose };
}

function createProhibitedFields(): EndpointHandleAllowlistApprovalProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must not enter the endpoint allowlist approval contract.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "Raw endpoint URLs must not enter this contract; only endpoint handles and allowlist review status are allowed.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("secret_provider_config", "Provider configuration would turn this contract into implementation.", "SECRET_PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration is not allowed in a contract-only intake.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("provider_client_runtime_binding", "Runtime bindings for providers or clients remain out of scope.", "PROVIDER_CLIENT_RUNTIME_BINDING_PRESENT"),
    prohibitedField("external_request_payload", "No HTTP/TCP payload may be prepared or sent by v320.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes remain outside this Node contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in this intake.", "SCHEMA_MIGRATION_SQL_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): EndpointHandleAllowlistApprovalProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): EndpointHandleAllowlistApprovalRejectionReason[] {
  return [
    rejection("ENDPOINT_HANDLE_MISSING", "endpoint-handle-contract", "The endpoint handle allowlist approval contract fields are missing."),
    rejection("CREDENTIAL_VALUE_PRESENT", "credential-boundary", "Credential values are not allowed; only handles and review statuses are allowed."),
    rejection("RAW_ENDPOINT_URL_PRESENT", "endpoint-boundary", "Raw endpoint URLs are not allowed; this intake accepts only endpoint handle and allowlist review metadata."),
    rejection("PROVIDER_CLIENT_CONFIG_PRESENT", "provider-client-boundary", "Secret provider and resolver client config are prohibited in this intake."),
    rejection("WRITE_OR_MIGRATION_PRESENT", "write-boundary", "Ledger writes, schema migration, deployment, and rollback execution are prohibited."),
  ];
}

function rejection(
  code: string,
  source: EndpointHandleAllowlistApprovalRejectionReason["source"],
  message: string,
): EndpointHandleAllowlistApprovalRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): EndpointHandleAllowlistApprovalNoGoBoundary[] {
  return [
    noGo("credential_value_read", "v320 must not read managed audit credential values."),
    noGo("raw_endpoint_url_parse", "v320 must not parse or render raw endpoint URLs."),
    noGo("secret_provider_instantiation", "v320 must not instantiate secret providers."),
    noGo("resolver_client_instantiation", "v320 must not instantiate resolver clients."),
    noGo("external_request", "v320 must not send HTTP/TCP requests."),
    noGo("ledger_or_schema_write", "v320 must not write approval ledger or schema state."),
    noGo("automatic_upstream_start", "v320 must not automatically start Java, mini-kv, or external audit services."),
    noGo("runtime_shell_implementation", "v320 must not implement a runtime shell."),
    noGo("runtime_shell_invocation", "v320 must not invoke a runtime shell."),
  ];
}

function noGo(id: string, message: string): EndpointHandleAllowlistApprovalNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): EndpointHandleAllowlistApprovalUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v147",
      requestedEcho: "Read-only echo of the Node v320 endpoint-handle allowlist approval contract.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v140",
      requestedEcho: "Non-participation receipt proving mini-kv does not store raw endpoint URLs, validate allowlist authority, or become authority for endpoint handles.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createPrerequisiteTransition(
  sourceNodeV319: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
): EndpointHandleAllowlistApprovalPrerequisiteTransition {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID);

  return {
    prerequisiteId: TARGET_PREREQUISITE_ID,
    catalogLabel: entry.closureLabel,
    beforeV320: "still-missing",
    afterV320: "contract-intake-defined",
    closureRequiresUpstreamEcho: true,
    completedPrerequisiteCountBeforeV320: sourceNodeV319.completedPrerequisiteCount as 3,
    remainingPrerequisiteCountBeforeV320: sourceNodeV319.remainingPrerequisiteCount as 3,
    preservesSignedHumanApprovalArtifactClosure: true,
    preservesCredentialHandleApprovalClosure: true,
    closesEndpointHandleAllowlistApproval: false,
    closesNoNetworkSafetyFixture: false,
    closesAbortRollbackSemantics: false,
  };
}

function createNecessityProof(): EndpointHandleAllowlistApprovalContractNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v319 completed the credential-handle-approval prerequisite and named endpoint-handle-allowlist-approval as the next concrete missing contract.",
    consumer: "Java v147 + mini-kv v140, then Node v321",
    whyV319CannotBeReused:
      "v319 is a closure review only; it proves the credential-handle-approval prerequisite is complete but does not define endpoint handle allowlist approval fields for upstream echo.",
    existingReportReuseDecision:
      "Reuse v319 as source state and v313 as the prerequisite catalog; create v320 only for the endpoint-handle allowlist approval contract intake.",
    stopCondition:
      "Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, external requests, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV319: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
  endpointHandleAllowlistApprovalContract: EndpointHandleAllowlistApprovalContract,
  prerequisiteTransition: EndpointHandleAllowlistApprovalPrerequisiteTransition,
  necessityProof: EndpointHandleAllowlistApprovalContractNecessityProof,
): EndpointHandleAllowlistApprovalContractIntakeChecks {
  const fieldIds = endpointHandleAllowlistApprovalContract.requiredFields.map((field) => field.id);
  const prohibitedIds = endpointHandleAllowlistApprovalContract.prohibitedFields.map((field) => field.id);

  return {
    sourceNodeV319Ready: sourceNodeV319.readyForCredentialHandleApprovalPrerequisiteClosureReview,
    sourceNodeV319PointsToEndpointHandleAllowlist:
      sourceNodeV319.nextConcretePrerequisiteId === TARGET_PREREQUISITE_ID
      && sourceNodeV319.nextConcretePrerequisiteContractRequired
      && sourceNodeV319.nextNodeVersionSuggested === "Node v320",
    sourceNodeV319KeepsRuntimeBlocked:
      sourceNodeV319.runtimeShellStillBlocked
      && sourceNodeV319.runtimeShellImplemented === false
      && sourceNodeV319.runtimeShellInvocationAllowed === false,
    sourceNodeV319KeepsSideEffectsClosed:
      sourceNodeV319.executionAllowed === false
      && sourceNodeV319.connectsManagedAudit === false
      && sourceNodeV319.credentialValueRead === false
      && sourceNodeV319.rawEndpointUrlParsed === false
      && sourceNodeV319.externalRequestSent === false
      && sourceNodeV319.schemaMigrationExecuted === false
      && sourceNodeV319.approvalLedgerWritten === false
      && sourceNodeV319.automaticUpstreamStart === false,
    endpointHandleAllowlistApprovalStillMissingInSource:
      sourceNodeV319.remainingPrerequisiteIds.includes(TARGET_PREREQUISITE_ID)
      && !sourceNodeV319.completedPrerequisiteIds.includes(TARGET_PREREQUISITE_ID),
    catalogTargetMatchesEndpointHandleAllowlist:
      getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID).id === TARGET_PREREQUISITE_ID,
    contractRequiredFieldsDocumented:
      fieldIds.length === 10
      && fieldIds.includes("endpoint_handle")
      && fieldIds.includes("approval_correlation_id")
      && fieldIds.includes("operator_identity_handle")
      && fieldIds.includes("reviewer_identity_handle")
      && fieldIds.includes("policy_version")
      && fieldIds.includes("approval_status")
      && fieldIds.includes("issued_at")
      && fieldIds.includes("expires_at")
      && fieldIds.includes("revocation_marker")
      && fieldIds.includes("audit_digest"),
    contractProhibitedFieldsDocumented:
      prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("secret_provider_config")
      && prohibitedIds.includes("resolver_client_config")
      && prohibitedIds.includes("external_request_payload")
      && prohibitedIds.includes("approval_ledger_mutation")
      && prohibitedIds.includes("schema_migration_sql"),
    rejectionReasonsDocumented: endpointHandleAllowlistApprovalContract.rejectionReasonCount >= 5,
    noGoBoundariesClosed:
      endpointHandleAllowlistApprovalContract.noGoBoundaryCount >= 9
      && endpointHandleAllowlistApprovalContract.noGoBoundaries.every((boundary) => boundary.allowed === false),
    prerequisiteTransitionScopedToEndpointHandleAllowlist:
      prerequisiteTransition.prerequisiteId === TARGET_PREREQUISITE_ID
      && prerequisiteTransition.beforeV320 === "still-missing"
      && prerequisiteTransition.afterV320 === "contract-intake-defined"
      && prerequisiteTransition.closureRequiresUpstreamEcho
      && prerequisiteTransition.completedPrerequisiteCountBeforeV320 === 3
      && prerequisiteTransition.remainingPrerequisiteCountBeforeV320 === 3
      && prerequisiteTransition.preservesSignedHumanApprovalArtifactClosure
      && prerequisiteTransition.preservesCredentialHandleApprovalClosure
      && !prerequisiteTransition.closesEndpointHandleAllowlistApproval
      && !prerequisiteTransition.closesNoNetworkSafetyFixture
      && !prerequisiteTransition.closesAbortRollbackSemantics,
    necessityProofDocumented:
      necessityProof.proofComplete && necessityProof.consumer === "Java v147 + mini-kv v140, then Node v321",
    javaMiniKvEchoRequestExplicitlyParallel:
      endpointHandleAllowlistApprovalContract.upstreamEchoRequests.length === 2
      && endpointHandleAllowlistApprovalContract.upstreamEchoRequests.every((request) =>
        request.canRunInParallel && request.mustRemainReadOnly),
    contractStaysNonSecret:
      fieldIds.includes("endpoint_handle")
      && !fieldIds.includes("credential_value" as EndpointHandleAllowlistApprovalRequiredField["id"])
      && prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url"),
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake: false,
  };
}

function collectProductionBlockers(
  checks: EndpointHandleAllowlistApprovalContractIntakeChecks,
): EndpointHandleAllowlistApprovalContractIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: EndpointHandleAllowlistApprovalContractIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV319Ready
        && checks.sourceNodeV319PointsToEndpointHandleAllowlist
        && checks.sourceNodeV319KeepsRuntimeBlocked
        && checks.sourceNodeV319KeepsSideEffectsClosed
        && checks.endpointHandleAllowlistApprovalStillMissingInSource,
      code: "NODE_V319_SOURCE_NOT_READY",
      source: "node-v319-credential-handle-approval-prerequisite-closure-review",
      message: "Node v319 must be ready, point to endpoint-handle-allowlist-approval, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.catalogTargetMatchesEndpointHandleAllowlist
        && checks.contractRequiredFieldsDocumented
        && checks.contractProhibitedFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed,
      code: "ENDPOINT_HANDLE_ALLOWLIST_CONTRACT_NOT_DOCUMENTED",
      source: "endpoint-handle-allowlist-approval-contract",
      message: "The endpoint handle allowlist approval contract must document required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
    {
      condition:
        checks.prerequisiteTransitionScopedToEndpointHandleAllowlist
        && checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.contractStaysNonSecret,
      code: "ENDPOINT_HANDLE_ALLOWLIST_SCOPE_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake",
      message: "v320 must stay scoped to endpoint-handle approval and remain non-secret/read-only.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v320 contract intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v320 contract intake.",
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

function collectWarnings(): EndpointHandleAllowlistApprovalContractIntakeMessage[] {
  return [
    {
      code: "ENDPOINT_HANDLE_ALLOWLIST_CONTRACT_DOES_NOT_CLOSE_ALL_PREREQUISITES",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake",
      message: "v320 defines an endpoint-handle allowlist approval contract only; no-network fixture and abort/rollback semantics remain separate prerequisites.",
    },
    {
      code: "ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_IS_NOT_CONNECTION_PERMISSION",
      severity: "warning",
      source: "endpoint-handle-allowlist-approval-contract",
      message: "An endpoint handle allowlist approval status does not authorize Node to parse raw endpoint URLs or send HTTP/TCP requests.",
    },
  ];
}

function collectRecommendations(): EndpointHandleAllowlistApprovalContractIntakeMessage[] {
  return [
    {
      code: "RUN_JAVA_V147_AND_MINI_KV_V140_AFTER_V320_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake",
      message: "After v320 is archived, Java v147 and mini-kv v140 can run in parallel as read-only echo and non-participation receipt work.",
    },
    {
      code: "KEEP_ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_NON_SECRET",
      severity: "recommendation",
      source: "endpoint-handle-allowlist-approval-contract",
      message: "Keep the endpoint handle allowlist approval as handles, statuses, digest, and timestamps only; never add credential values, raw endpoint URLs, provider/client config, or HTTP/TCP payloads.",
    },
  ];
}

function createSummary(
  sourceNodeV319: SourceNodeV319CredentialHandleApprovalPrerequisiteClosureReviewReference,
  endpointHandleAllowlistApprovalContract: EndpointHandleAllowlistApprovalContract,
  checks: EndpointHandleAllowlistApprovalContractIntakeChecks,
  productionBlockers: EndpointHandleAllowlistApprovalContractIntakeMessage[],
  warnings: EndpointHandleAllowlistApprovalContractIntakeMessage[],
  recommendations: EndpointHandleAllowlistApprovalContractIntakeMessage[],
): EndpointHandleAllowlistApprovalContractIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV319CheckCount: sourceNodeV319.sourceCheckCount,
    sourceNodeV319PassedCheckCount: sourceNodeV319.sourcePassedCheckCount,
    sourceCompletedPrerequisiteCount: sourceNodeV319.completedPrerequisiteCount,
    sourceRemainingPrerequisiteCount: sourceNodeV319.remainingPrerequisiteCount,
    requiredFieldCount: endpointHandleAllowlistApprovalContract.requiredFieldCount,
    prohibitedFieldCount: endpointHandleAllowlistApprovalContract.prohibitedFieldCount,
    rejectionReasonCount: endpointHandleAllowlistApprovalContract.rejectionReasonCount,
    noGoBoundaryCount: endpointHandleAllowlistApprovalContract.noGoBoundaryCount,
    upstreamEchoRequestCount: endpointHandleAllowlistApprovalContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}


