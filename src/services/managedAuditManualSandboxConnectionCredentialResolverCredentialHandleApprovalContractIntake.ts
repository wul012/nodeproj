import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview.js";
import type {
  CredentialHandleApprovalContract,
  CredentialHandleApprovalContractIntakeChecks,
  CredentialHandleApprovalContractIntakeMessage,
  CredentialHandleApprovalContractIntakeSummary,
  CredentialHandleApprovalContractNecessityProof,
  CredentialHandleApprovalNoGoBoundary,
  CredentialHandleApprovalPrerequisiteTransition,
  CredentialHandleApprovalProhibitedField,
  CredentialHandleApprovalRejectionReason,
  CredentialHandleApprovalRequiredField,
  CredentialHandleApprovalUpstreamEchoRequest,
  ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeProfile,
  SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake";
const SOURCE_NODE_V316_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review";
const ACTIVE_PLAN = "docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md";
const TARGET_PREREQUISITE_ID = "credential-handle-approval" as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntakeProfile {
  const sourceNodeV316 = createSourceNodeV316(input.config);
  const prerequisiteTransition = createPrerequisiteTransition(sourceNodeV316);
  const necessityProof = createNecessityProof();
  const credentialHandleApprovalContract = createCredentialHandleApprovalContract(
    sourceNodeV316,
    prerequisiteTransition,
    necessityProof,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV316,
    credentialHandleApprovalContract,
    prerequisiteTransition,
    necessityProof,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake")
      .every(([, value]) => value);
  const contractState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake
      ? "credential-handle-approval-contract-intake-ready"
      : "blocked";
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV316,
    credentialHandleApprovalContract,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver credential handle approval contract intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    governanceChainDecision: "continue-only-for-credential-handle-approval-contract-intake",
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake:
      readyForParallelEcho,
    credentialHandleApprovalContractIntakeOnly: true,
    readOnlyCredentialHandleApprovalContract: true,
    consumesNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReview: true,
    consumesNodeV313PrerequisiteCatalog: true,
    activeNodeContractVersion: "Node v317",
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    nextJavaVersion: "Java v146",
    nextMiniKvVersion: "mini-kv v139",
    nextNodeVerificationVersion: "Node v318",
    readyForParallelJavaV146MiniKvV139Echo: readyForParallelEcho,
    readyForNodeV318BeforeUpstreamEcho: false,
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
    credentialHandleApproved: false,
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
    sourceNodeV316,
    credentialHandleApprovalContract,
    prerequisiteTransition,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      credentialHandleApprovalContractIntakeJson: ROUTE_PATH,
      credentialHandleApprovalContractIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV316Json: SOURCE_NODE_V316_ROUTE,
      sourceNodeV316Markdown: `${SOURCE_NODE_V316_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v317 as the credential-handle approval contract-only intake.",
      "After v317 is complete, Java v146 and mini-kv v139 can run in parallel as read-only echo and non-participation receipt work.",
      "Node v318 must wait for both Java v146 and mini-kv v139 before verifying credential-handle approval echo alignment.",
      "Stop immediately if the credential-handle contract tries to include credential values, raw endpoint URLs, provider/client config, external request payloads, ledger/schema writes, runtime shell behavior, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV316(
  config: AppConfig,
): SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview({
    config,
  });

  return {
    sourceVersion: "Node v316",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForSignedHumanApprovalArtifactPrerequisiteClosureReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview,
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

function createCredentialHandleApprovalContract(
  sourceNodeV316: SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference,
  prerequisiteTransition: CredentialHandleApprovalPrerequisiteTransition,
  necessityProof: CredentialHandleApprovalContractNecessityProof,
): CredentialHandleApprovalContract {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    contractName: "managed-audit-credential-handle-approval" as const,
    contractVersion: "credential-handle-approval.v1" as const,
    contractMode: "credential-handle-approval-contract-intake-only" as const,
    sourceSpan: "Node v316 closure review + Node v313 catalog" as const,
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    purpose:
      "Define the non-secret credential handle approval shape required before any later resolver can discuss sandbox credential lookup.",
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
      sourceNodeV316ReviewDigest: sourceNodeV316.reviewDigest,
      prerequisiteTransition,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): CredentialHandleApprovalRequiredField[] {
  return [
    requiredField("credential_handle", "Credential handle", "stable non-secret credential handle", "Identify which credential handle was reviewed without exposing the resolved credential value."),
    requiredField("approval_correlation_id", "Approval correlation id", "stable non-secret correlation id", "Bind the handle review to the signed approval chain."),
    requiredField("operator_identity_handle", "Operator identity handle", "operator identity handle, no credential value", "Identify the requesting operator without embedding secret material."),
    requiredField("reviewer_identity_handle", "Reviewer identity handle", "reviewer identity handle, no private key", "Identify the human reviewer without carrying credentials or signing keys."),
    requiredField("policy_version", "Policy version", "policy id or semantic version", "Bind the handle approval to a known review policy contract."),
    requiredField("approval_status", "Approval status", "approved, rejected, expired, or revoked", "Keep this version contract-only and status-based."),
    requiredField("issued_at", "Issued at", "ISO-8601 timestamp", "Declare when the credential handle approval was issued."),
    requiredField("expires_at", "Expires at", "ISO-8601 timestamp", "Prevent stale handle approvals from being treated as current."),
    requiredField("revocation_marker", "Revocation marker", "boolean marker plus optional evidence handle", "Make revocation explicit without reading any secret provider state."),
    requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest", "Prove contract immutability without embedding raw credential or endpoint material."),
  ];
}

function requiredField(
  id: CredentialHandleApprovalRequiredField["id"],
  label: string,
  acceptedShape: string,
  purpose: string,
): CredentialHandleApprovalRequiredField {
  return { id, label, required: true, acceptedShape, purpose };
}

function createProhibitedFields(): CredentialHandleApprovalProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must not enter the handle approval contract.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "Endpoint material remains handle/allowlist-only and belongs to a later prerequisite.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("secret_provider_config", "Provider configuration would turn this contract into implementation.", "SECRET_PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration is not allowed in a contract-only intake.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("provider_client_runtime_binding", "Runtime bindings for providers or clients remain out of scope.", "PROVIDER_CLIENT_RUNTIME_BINDING_PRESENT"),
    prohibitedField("external_request_payload", "No HTTP/TCP payload may be prepared or sent by v317.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes remain outside this Node contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in this intake.", "SCHEMA_MIGRATION_SQL_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): CredentialHandleApprovalProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): CredentialHandleApprovalRejectionReason[] {
  return [
    rejection("CREDENTIAL_HANDLE_MISSING", "credential-handle-contract", "The credential handle approval contract fields are missing."),
    rejection("CREDENTIAL_VALUE_PRESENT", "credential-boundary", "Credential values are not allowed; only handles and review statuses are allowed."),
    rejection("RAW_ENDPOINT_URL_PRESENT", "endpoint-boundary", "Raw endpoint URLs are not allowed; endpoint allowlist approval is a separate prerequisite."),
    rejection("PROVIDER_CLIENT_CONFIG_PRESENT", "provider-client-boundary", "Secret provider and resolver client config are prohibited in this intake."),
    rejection("WRITE_OR_MIGRATION_PRESENT", "write-boundary", "Ledger writes, schema migration, deployment, and rollback execution are prohibited."),
  ];
}

function rejection(
  code: string,
  source: CredentialHandleApprovalRejectionReason["source"],
  message: string,
): CredentialHandleApprovalRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): CredentialHandleApprovalNoGoBoundary[] {
  return [
    noGo("credential_value_read", "v317 must not read managed audit credential values."),
    noGo("raw_endpoint_url_parse", "v317 must not parse or render raw endpoint URLs."),
    noGo("secret_provider_instantiation", "v317 must not instantiate secret providers."),
    noGo("resolver_client_instantiation", "v317 must not instantiate resolver clients."),
    noGo("external_request", "v317 must not send HTTP/TCP requests."),
    noGo("ledger_or_schema_write", "v317 must not write approval ledger or schema state."),
    noGo("automatic_upstream_start", "v317 must not automatically start Java, mini-kv, or external audit services."),
    noGo("runtime_shell_implementation", "v317 must not implement a runtime shell."),
    noGo("runtime_shell_invocation", "v317 must not invoke a runtime shell."),
  ];
}

function noGo(id: string, message: string): CredentialHandleApprovalNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): CredentialHandleApprovalUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v146",
      requestedEcho: "Read-only echo of the Node v317 credential-handle approval contract.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v139",
      requestedEcho: "Non-participation receipt proving mini-kv does not store, validate, resolve, or become authority for credential handles.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createPrerequisiteTransition(
  sourceNodeV316: SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference,
): CredentialHandleApprovalPrerequisiteTransition {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID);

  return {
    prerequisiteId: TARGET_PREREQUISITE_ID,
    catalogLabel: entry.closureLabel,
    beforeV317: "still-missing",
    afterV317: "contract-intake-defined",
    closureRequiresUpstreamEcho: true,
    completedPrerequisiteCountBeforeV317: sourceNodeV316.completedPrerequisiteCount as 2,
    remainingPrerequisiteCountBeforeV317: sourceNodeV316.remainingPrerequisiteCount as 4,
    preservesSignedHumanApprovalArtifactClosure: true,
    closesEndpointHandleAllowlistApproval: false,
    closesNoNetworkSafetyFixture: false,
    closesAbortRollbackSemantics: false,
  };
}

function createNecessityProof(): CredentialHandleApprovalContractNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v316 completed the signed-human-approval-artifact prerequisite and named credential-handle-approval as the next concrete missing contract.",
    consumer: "Java v146 + mini-kv v139, then Node v318",
    whyV316CannotBeReused:
      "v316 is a closure review only; it proves the signed artifact prerequisite is complete but does not define credential handle approval fields for upstream echo.",
    existingReportReuseDecision:
      "Reuse v316 as source state and v313 as the prerequisite catalog; create v317 only for the credential-handle approval contract intake.",
    stopCondition:
      "Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, external requests, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV316: SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference,
  credentialHandleApprovalContract: CredentialHandleApprovalContract,
  prerequisiteTransition: CredentialHandleApprovalPrerequisiteTransition,
  necessityProof: CredentialHandleApprovalContractNecessityProof,
): CredentialHandleApprovalContractIntakeChecks {
  const fieldIds = credentialHandleApprovalContract.requiredFields.map((field) => field.id);
  const prohibitedIds = credentialHandleApprovalContract.prohibitedFields.map((field) => field.id);

  return {
    sourceNodeV316Ready: sourceNodeV316.readyForSignedHumanApprovalArtifactPrerequisiteClosureReview,
    sourceNodeV316PointsToCredentialHandle:
      sourceNodeV316.nextConcretePrerequisiteId === TARGET_PREREQUISITE_ID
      && sourceNodeV316.nextConcretePrerequisiteContractRequired
      && sourceNodeV316.nextNodeVersionSuggested === "Node v317",
    sourceNodeV316KeepsRuntimeBlocked:
      sourceNodeV316.runtimeShellStillBlocked
      && sourceNodeV316.runtimeShellImplemented === false
      && sourceNodeV316.runtimeShellInvocationAllowed === false,
    sourceNodeV316KeepsSideEffectsClosed:
      sourceNodeV316.executionAllowed === false
      && sourceNodeV316.connectsManagedAudit === false
      && sourceNodeV316.credentialValueRead === false
      && sourceNodeV316.rawEndpointUrlParsed === false
      && sourceNodeV316.externalRequestSent === false
      && sourceNodeV316.schemaMigrationExecuted === false
      && sourceNodeV316.approvalLedgerWritten === false
      && sourceNodeV316.automaticUpstreamStart === false,
    credentialHandleApprovalStillMissingInSource:
      sourceNodeV316.remainingPrerequisiteIds.includes(TARGET_PREREQUISITE_ID)
      && !sourceNodeV316.completedPrerequisiteIds.includes(TARGET_PREREQUISITE_ID),
    catalogTargetMatchesCredentialHandle:
      getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID).id === TARGET_PREREQUISITE_ID,
    contractRequiredFieldsDocumented:
      fieldIds.length === 10
      && fieldIds.includes("credential_handle")
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
    rejectionReasonsDocumented: credentialHandleApprovalContract.rejectionReasonCount >= 5,
    noGoBoundariesClosed:
      credentialHandleApprovalContract.noGoBoundaryCount >= 9
      && credentialHandleApprovalContract.noGoBoundaries.every((boundary) => boundary.allowed === false),
    prerequisiteTransitionScopedToCredentialHandle:
      prerequisiteTransition.prerequisiteId === TARGET_PREREQUISITE_ID
      && prerequisiteTransition.beforeV317 === "still-missing"
      && prerequisiteTransition.afterV317 === "contract-intake-defined"
      && prerequisiteTransition.closureRequiresUpstreamEcho
      && prerequisiteTransition.completedPrerequisiteCountBeforeV317 === 2
      && prerequisiteTransition.remainingPrerequisiteCountBeforeV317 === 4
      && prerequisiteTransition.preservesSignedHumanApprovalArtifactClosure
      && !prerequisiteTransition.closesEndpointHandleAllowlistApproval
      && !prerequisiteTransition.closesNoNetworkSafetyFixture
      && !prerequisiteTransition.closesAbortRollbackSemantics,
    necessityProofDocumented:
      necessityProof.proofComplete && necessityProof.consumer === "Java v146 + mini-kv v139, then Node v318",
    javaMiniKvEchoRequestExplicitlyParallel:
      credentialHandleApprovalContract.upstreamEchoRequests.length === 2
      && credentialHandleApprovalContract.upstreamEchoRequests.every((request) =>
        request.canRunInParallel && request.mustRemainReadOnly),
    contractStaysNonSecret:
      fieldIds.includes("credential_handle")
      && !fieldIds.includes("credential_value" as CredentialHandleApprovalRequiredField["id"])
      && prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url"),
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake: false,
  };
}

function collectProductionBlockers(
  checks: CredentialHandleApprovalContractIntakeChecks,
): CredentialHandleApprovalContractIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialHandleApprovalContractIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV316Ready
        && checks.sourceNodeV316PointsToCredentialHandle
        && checks.sourceNodeV316KeepsRuntimeBlocked
        && checks.sourceNodeV316KeepsSideEffectsClosed
        && checks.credentialHandleApprovalStillMissingInSource,
      code: "NODE_V316_SOURCE_NOT_READY",
      source: "node-v316-signed-human-approval-artifact-prerequisite-closure-review",
      message: "Node v316 must be ready, point to credential-handle-approval, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.catalogTargetMatchesCredentialHandle
        && checks.contractRequiredFieldsDocumented
        && checks.contractProhibitedFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed,
      code: "CREDENTIAL_HANDLE_CONTRACT_NOT_DOCUMENTED",
      source: "credential-handle-approval-contract",
      message: "The credential handle approval contract must document required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
    {
      condition:
        checks.prerequisiteTransitionScopedToCredentialHandle
        && checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.contractStaysNonSecret,
      code: "CREDENTIAL_HANDLE_SCOPE_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake",
      message: "v317 must stay scoped to credential-handle approval and remain non-secret/read-only.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v317 contract intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v317 contract intake.",
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

function collectWarnings(): CredentialHandleApprovalContractIntakeMessage[] {
  return [
    {
      code: "CREDENTIAL_HANDLE_CONTRACT_DOES_NOT_CLOSE_ALL_PREREQUISITES",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake",
      message: "v317 defines a credential-handle approval contract only; endpoint allowlist, no-network fixture, and abort/rollback semantics remain separate prerequisites.",
    },
    {
      code: "CREDENTIAL_HANDLE_APPROVAL_IS_NOT_CREDENTIAL_RESOLUTION",
      severity: "warning",
      source: "credential-handle-approval-contract",
      message: "A credential handle approval status does not authorize Node to resolve or read the underlying credential value.",
    },
  ];
}

function collectRecommendations(): CredentialHandleApprovalContractIntakeMessage[] {
  return [
    {
      code: "RUN_JAVA_V146_AND_MINI_KV_V139_AFTER_V317_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake",
      message: "After v317 is archived, Java v146 and mini-kv v139 can run in parallel as read-only echo and non-participation receipt work.",
    },
    {
      code: "KEEP_CREDENTIAL_HANDLE_APPROVAL_NON_SECRET",
      severity: "recommendation",
      source: "credential-handle-approval-contract",
      message: "Keep the credential handle approval as handles, statuses, digest, and timestamps only; never add credential values, raw endpoint URLs, provider/client config, or HTTP/TCP payloads.",
    },
  ];
}

function createSummary(
  sourceNodeV316: SourceNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReviewReference,
  credentialHandleApprovalContract: CredentialHandleApprovalContract,
  checks: CredentialHandleApprovalContractIntakeChecks,
  productionBlockers: CredentialHandleApprovalContractIntakeMessage[],
  warnings: CredentialHandleApprovalContractIntakeMessage[],
  recommendations: CredentialHandleApprovalContractIntakeMessage[],
): CredentialHandleApprovalContractIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV316CheckCount: sourceNodeV316.sourceCheckCount,
    sourceNodeV316PassedCheckCount: sourceNodeV316.sourcePassedCheckCount,
    sourceCompletedPrerequisiteCount: sourceNodeV316.completedPrerequisiteCount,
    sourceRemainingPrerequisiteCount: sourceNodeV316.remainingPrerequisiteCount,
    requiredFieldCount: credentialHandleApprovalContract.requiredFieldCount,
    prohibitedFieldCount: credentialHandleApprovalContract.prohibitedFieldCount,
    rejectionReasonCount: credentialHandleApprovalContract.rejectionReasonCount,
    noGoBoundaryCount: credentialHandleApprovalContract.noGoBoundaryCount,
    upstreamEchoRequestCount: credentialHandleApprovalContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
