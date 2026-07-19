import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile,
  SignedHumanApprovalArtifactContract,
  SignedHumanApprovalArtifactContractIntakeChecks,
  SignedHumanApprovalArtifactContractIntakeMessage,
  SignedHumanApprovalArtifactContractIntakeSummary,
  SignedHumanApprovalArtifactContractNecessityProof,
  SignedHumanApprovalArtifactNoGoBoundary,
  SignedHumanApprovalArtifactPrerequisiteTransition,
  SignedHumanApprovalArtifactProhibitedField,
  SignedHumanApprovalArtifactRejectionReason,
  SignedHumanApprovalArtifactRequiredField,
  SignedHumanApprovalArtifactUpstreamEchoRequest,
  SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake";
const SOURCE_NODE_V312_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-governance-stop-prerequisite-closure-decision";
const ACTIVE_PLAN = "docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md";
const TARGET_PREREQUISITE_ID = "signed-human-approval-artifact" as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntakeProfile {
  const sourceNodeV312 = createSourceNodeV312(input.config);
  const necessityProof = createNecessityProof();
  const prerequisiteTransition = createPrerequisiteTransition();
  const signedArtifactContract = createSignedArtifactContract(sourceNodeV312, prerequisiteTransition, necessityProof);
  const checks = createChecks(input.config, sourceNodeV312, signedArtifactContract, prerequisiteTransition, necessityProof);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake")
      .every(([, value]) => value);
  const contractState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake
    ? "signed-human-approval-artifact-contract-intake-ready"
    : "blocked";
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV312, signedArtifactContract, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver signed human approval artifact contract intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    governanceChainDecision: "continue-only-for-signed-human-approval-artifact-contract-intake",
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: readyForParallelEcho,
    signedHumanApprovalArtifactContractIntakeOnly: true,
    readOnlyArtifactContract: true,
    consumesNodeV312GovernanceStopPrerequisiteClosureDecision: true,
    consumesNodeV313PrerequisiteCatalog: true,
    activeNodeContractVersion: "Node v314",
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    nextJavaVersion: "Java v145",
    nextMiniKvVersion: "mini-kv v138",
    nextNodeVerificationVersion: "Node v315",
    readyForParallelJavaV145MiniKvV138Echo: readyForParallelEcho,
    readyForNodeV315BeforeUpstreamEcho: false,
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
    sourceNodeV312,
    signedArtifactContract,
    prerequisiteTransition,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      signedHumanApprovalArtifactContractIntakeJson: ROUTE_PATH,
      signedHumanApprovalArtifactContractIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV312Json: SOURCE_NODE_V312_ROUTE,
      sourceNodeV312Markdown: `${SOURCE_NODE_V312_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v314 as the contract-only signed human approval artifact intake.",
      "After v314 is complete, Java v145 and mini-kv v138 can run in parallel as read-only echo and non-participation receipt work.",
      "Node v315 must wait for both Java v145 and mini-kv v138 before verifying upstream echo alignment.",
      "Stop immediately if the signed artifact contract tries to include credential values, raw endpoint URLs, provider/client config, HTTP/TCP payloads, ledger/schema writes, or runtime shell behavior.",
    ],
  };
}

function createSourceNodeV312(config: AppConfig): SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
    config,
  });

  return {
    sourceVersion: "Node v312",
    profileVersion: source.profileVersion,
    decisionState: source.decisionState,
    readyForClosureDecision:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
    decisionDigest: source.closureDecision.decisionDigest,
    sourceVerificationDigest: source.closureDecision.sourceVerificationDigest,
    completedPrerequisiteCount: source.closureDecision.completedPrerequisiteCount,
    remainingPrerequisiteCount: source.closureDecision.remainingPrerequisiteCount,
    originalPrerequisiteCount: source.closureDecision.originalPrerequisiteCount,
    noGoConditionCount: source.closureDecision.noGoConditionCount,
    chainContinuationAllowed: source.closureDecision.chainContinuationAllowed,
    nextConcretePrerequisiteContractRequired: source.closureDecision.nextConcretePrerequisiteContractRequired,
    completedPrerequisiteIds: source.closureDecision.completedPrerequisites.map((prerequisite) => prerequisite.id),
    remainingPrerequisiteIds: source.closureDecision.remainingPrerequisites.map((prerequisite) => prerequisite.id),
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

function createSignedArtifactContract(
  sourceNodeV312: SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference,
  prerequisiteTransition: SignedHumanApprovalArtifactPrerequisiteTransition,
  necessityProof: SignedHumanApprovalArtifactContractNecessityProof,
): SignedHumanApprovalArtifactContract {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    artifactName: "managed-audit-signed-human-approval-artifact" as const,
    artifactVersion: "signed-human-approval-artifact.v1" as const,
    contractMode: "signed-human-approval-artifact-contract-intake-only" as const,
    sourceSpan: "Node v312 + Node v313 catalog" as const,
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    purpose:
      "Define the non-secret signed human approval artifact shape required before any later managed audit credential resolver runtime shell discussion.",
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
      sourceNodeV312DecisionDigest: sourceNodeV312.decisionDigest,
      prerequisiteTransition,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): SignedHumanApprovalArtifactRequiredField[] {
  return [
    requiredField("artifact_id", "Artifact id", "stable non-secret artifact id", "Trace the signed approval artifact across Node, Java, and mini-kv evidence."),
    requiredField("approval_correlation_id", "Approval correlation id", "stable non-secret correlation id", "Bind the signed artifact to the approval review chain."),
    requiredField("operator_identity_handle", "Operator identity handle", "operator identity handle, no credential value", "Identify the requesting operator without embedding secret material."),
    requiredField("signer_identity_handle", "Signer identity handle", "signer identity handle, no private key", "Identify the human signer without carrying signing keys or credentials."),
    requiredField("policy_version", "Policy version", "policy id or semantic version", "Bind the artifact to a known approval policy contract."),
    requiredField("artifact_digest", "Artifact digest", "sha256 digest or equivalent stable digest", "Prove artifact immutability without embedding raw secret payloads."),
    requiredField("issued_at", "Issued at", "ISO-8601 timestamp", "Declare when the human approval artifact was issued."),
    requiredField("expires_at", "Expires at", "ISO-8601 timestamp", "Prevent stale approval artifacts from being treated as current."),
    requiredField("review_status", "Review status", "approved, rejected, expired, or revoked", "Keep this version contract-only and status-based."),
    requiredField("no_network_assertion", "No-network assertion", "boolean assertion plus evidence handle", "Assert this contract path sends no HTTP/TCP request."),
    requiredField("rollback_abort_reference", "Rollback/abort reference", "runbook or evidence handle", "Reference manual abort and rollback semantics without executing them."),
  ];
}

function requiredField(
  id: SignedHumanApprovalArtifactRequiredField["id"],
  label: string,
  acceptedShape: string,
  purpose: string,
): SignedHumanApprovalArtifactRequiredField {
  return { id, label, required: true, acceptedShape, purpose };
}

function createProhibitedFields(): SignedHumanApprovalArtifactProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must not enter the signed approval artifact.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "The contract may reference endpoint handles, not raw endpoint URLs.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("signing_private_key", "A signed artifact may reference a signer handle, not a private key.", "SIGNING_PRIVATE_KEY_PRESENT"),
    prohibitedField("secret_provider_config", "Provider configuration would turn this contract into implementation.", "PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration is not allowed in a contract-only intake.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("external_request_payload", "No HTTP/TCP payload may be prepared or sent by v314.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes remain outside this Node contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in this intake.", "SCHEMA_MIGRATION_SQL_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): SignedHumanApprovalArtifactProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): SignedHumanApprovalArtifactRejectionReason[] {
  return [
    rejection("SIGNED_ARTIFACT_MISSING", "artifact-contract", "The signed approval artifact contract fields are missing."),
    rejection("CREDENTIAL_VALUE_PRESENT", "credential-boundary", "Credential values are not allowed; only handles and review statuses are allowed."),
    rejection("RAW_ENDPOINT_URL_PRESENT", "endpoint-boundary", "Raw endpoint URLs are not allowed; only endpoint handles may appear later."),
    rejection("RUNTIME_IMPLEMENTATION_PRESENT", "runtime-boundary", "Runtime shell implementation or invocation details are prohibited."),
    rejection("WRITE_OR_MIGRATION_PRESENT", "write-boundary", "Ledger writes, schema migration, deployment, and rollback execution are prohibited."),
  ];
}

function rejection(
  code: string,
  source: SignedHumanApprovalArtifactRejectionReason["source"],
  message: string,
): SignedHumanApprovalArtifactRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): SignedHumanApprovalArtifactNoGoBoundary[] {
  return [
    noGo("runtime_shell_implementation", "v314 must not implement a runtime shell."),
    noGo("runtime_shell_invocation", "v314 must not invoke a runtime shell."),
    noGo("credential_value_read", "v314 must not read managed audit credential values."),
    noGo("raw_endpoint_url_parse", "v314 must not parse or render raw endpoint URLs."),
    noGo("provider_client_instantiation", "v314 must not instantiate secret providers or resolver clients."),
    noGo("external_request", "v314 must not send HTTP/TCP requests."),
    noGo("ledger_or_schema_write", "v314 must not write approval ledger or schema state."),
    noGo("automatic_upstream_start", "v314 must not automatically start Java, mini-kv, or external audit services."),
  ];
}

function noGo(id: string, message: string): SignedHumanApprovalArtifactNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): SignedHumanApprovalArtifactUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v145",
      requestedEcho: "Read-only echo of the Node v314 signed human approval artifact contract.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v138",
      requestedEcho: "Non-participation receipt proving mini-kv does not store, validate, or become authority for signed approval artifacts.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createPrerequisiteTransition(): SignedHumanApprovalArtifactPrerequisiteTransition {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID);

  return {
    prerequisiteId: TARGET_PREREQUISITE_ID,
    catalogLabel: entry.closureLabel,
    beforeV314: "still-missing",
    afterV314: "contract-intake-defined",
    closureRequiresUpstreamEcho: true,
    closesCredentialHandleApproval: false,
    closesEndpointHandleAllowlistApproval: false,
    closesNoNetworkSafetyFixture: false,
    closesAbortRollbackSemantics: false,
  };
}

function createNecessityProof(): SignedHumanApprovalArtifactContractNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v312 paused the governance chain with five remaining prerequisites; v314 names the first concrete missing prerequisite and defines its non-secret contract shape.",
    consumer: "Java v145 + mini-kv v138, then Node v315",
    whyV312CannotBeReused:
      "v312 is a closure decision only; it lists signed-human-approval-artifact as missing but does not define the signed artifact contract fields that upstreams can echo.",
    existingReportReuseDecision:
      "Reuse v312 as source state and v313 as the prerequisite catalog; create v314 only for the signed-human-approval-artifact contract intake.",
    stopCondition:
      "Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, HTTP/TCP, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV312: SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference,
  signedArtifactContract: SignedHumanApprovalArtifactContract,
  prerequisiteTransition: SignedHumanApprovalArtifactPrerequisiteTransition,
  necessityProof: SignedHumanApprovalArtifactContractNecessityProof,
): SignedHumanApprovalArtifactContractIntakeChecks {
  const fieldIds = signedArtifactContract.requiredFields.map((field) => field.id);
  const prohibitedIds = signedArtifactContract.prohibitedFields.map((field) => field.id);

  return {
    sourceNodeV312Ready: sourceNodeV312.readyForClosureDecision,
    sourceNodeV312KeepsGovernancePaused:
      sourceNodeV312.chainContinuationAllowed === false
      && sourceNodeV312.nextConcretePrerequisiteContractRequired === true,
    signedHumanApprovalArtifactStillMissingInSource:
      sourceNodeV312.remainingPrerequisiteIds.includes(TARGET_PREREQUISITE_ID)
      && !sourceNodeV312.completedPrerequisiteIds.includes(TARGET_PREREQUISITE_ID),
    catalogTargetMatchesSignedArtifact:
      getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID).id === TARGET_PREREQUISITE_ID,
    contractRequiredFieldsDocumented:
      fieldIds.length === 11
      && fieldIds.includes("artifact_id")
      && fieldIds.includes("approval_correlation_id")
      && fieldIds.includes("operator_identity_handle")
      && fieldIds.includes("signer_identity_handle")
      && fieldIds.includes("policy_version")
      && fieldIds.includes("artifact_digest")
      && fieldIds.includes("issued_at")
      && fieldIds.includes("expires_at")
      && fieldIds.includes("review_status")
      && fieldIds.includes("no_network_assertion")
      && fieldIds.includes("rollback_abort_reference"),
    contractProhibitedFieldsDocumented:
      prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("signing_private_key")
      && prohibitedIds.includes("external_request_payload"),
    rejectionReasonsDocumented: signedArtifactContract.rejectionReasonCount >= 5,
    noGoBoundariesClosed:
      signedArtifactContract.noGoBoundaryCount >= 8
      && signedArtifactContract.noGoBoundaries.every((boundary) => boundary.allowed === false),
    prerequisiteTransitionScopedToSignedArtifact:
      prerequisiteTransition.prerequisiteId === TARGET_PREREQUISITE_ID
      && prerequisiteTransition.beforeV314 === "still-missing"
      && prerequisiteTransition.afterV314 === "contract-intake-defined"
      && prerequisiteTransition.closureRequiresUpstreamEcho
      && !prerequisiteTransition.closesCredentialHandleApproval
      && !prerequisiteTransition.closesEndpointHandleAllowlistApproval
      && !prerequisiteTransition.closesNoNetworkSafetyFixture
      && !prerequisiteTransition.closesAbortRollbackSemantics,
    necessityProofDocumented: necessityProof.proofComplete && necessityProof.consumer === "Java v145 + mini-kv v138, then Node v315",
    javaMiniKvEchoRequestExplicitlyParallel:
      signedArtifactContract.upstreamEchoRequests.length === 2
      && signedArtifactContract.upstreamEchoRequests.every((request) => request.canRunInParallel && request.mustRemainReadOnly),
    contractStaysNonSecret:
      !prohibitedIds.includes("operator_identity_handle")
      && prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url"),
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractIntake: false,
  };
}

function collectProductionBlockers(
  checks: SignedHumanApprovalArtifactContractIntakeChecks,
): SignedHumanApprovalArtifactContractIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SignedHumanApprovalArtifactContractIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV312Ready
        && checks.sourceNodeV312KeepsGovernancePaused
        && checks.signedHumanApprovalArtifactStillMissingInSource,
      code: "NODE_V312_SOURCE_NOT_READY",
      source: "node-v312-human-approval-artifact-review-governance-stop-prerequisite-closure-decision",
      message: "Node v312 must be ready, paused, and still list signed-human-approval-artifact as missing.",
    },
    {
      condition:
        checks.catalogTargetMatchesSignedArtifact
        && checks.contractRequiredFieldsDocumented
        && checks.contractProhibitedFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed,
      code: "SIGNED_ARTIFACT_CONTRACT_NOT_DOCUMENTED",
      source: "signed-human-approval-artifact-contract",
      message: "The signed human approval artifact contract must document required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
    {
      condition:
        checks.prerequisiteTransitionScopedToSignedArtifact
        && checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.contractStaysNonSecret,
      code: "SIGNED_ARTIFACT_SCOPE_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake",
      message: "v314 must stay scoped to signed-human-approval-artifact and remain non-secret/read-only.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v314 contract intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v314 contract intake.",
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

function collectWarnings(): SignedHumanApprovalArtifactContractIntakeMessage[] {
  return [
    {
      code: "SIGNED_ARTIFACT_CONTRACT_DOES_NOT_CLOSE_ALL_PREREQUISITES",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake",
      message: "v314 defines a signed-human-approval-artifact contract only; credential handle approval, endpoint allowlist, no-network fixture, and abort/rollback semantics remain separate prerequisites.",
    },
  ];
}

function collectRecommendations(): SignedHumanApprovalArtifactContractIntakeMessage[] {
  return [
    {
      code: "RUN_JAVA_V145_AND_MINI_KV_V138_AFTER_V314_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake",
      message: "After v314 is archived, Java v145 and mini-kv v138 can run in parallel as read-only echo and non-participation receipt work.",
    },
    {
      code: "KEEP_SIGNED_ARTIFACT_CONTRACT_NON_SECRET",
      severity: "recommendation",
      source: "signed-human-approval-artifact-contract",
      message: "Keep the signed approval artifact as handles, status, digest, and timestamps only; never add credential values, raw endpoint URLs, private keys, provider/client config, or HTTP/TCP payloads.",
    },
  ];
}

function createSummary(
  sourceNodeV312: SourceNodeV312GovernanceStopPrerequisiteClosureDecisionReference,
  signedArtifactContract: SignedHumanApprovalArtifactContract,
  checks: SignedHumanApprovalArtifactContractIntakeChecks,
  productionBlockers: SignedHumanApprovalArtifactContractIntakeMessage[],
  warnings: SignedHumanApprovalArtifactContractIntakeMessage[],
  recommendations: SignedHumanApprovalArtifactContractIntakeMessage[],
): SignedHumanApprovalArtifactContractIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV312CheckCount: sourceNodeV312.sourceCheckCount,
    sourceNodeV312PassedCheckCount: sourceNodeV312.sourcePassedCheckCount,
    sourceRemainingPrerequisiteCount: sourceNodeV312.remainingPrerequisiteCount,
    requiredFieldCount: signedArtifactContract.requiredFieldCount,
    prohibitedFieldCount: signedArtifactContract.prohibitedFieldCount,
    rejectionReasonCount: signedArtifactContract.rejectionReasonCount,
    noGoBoundaryCount: signedArtifactContract.noGoBoundaryCount,
    upstreamEchoRequestCount: signedArtifactContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
