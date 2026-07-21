import type { AppConfig } from "../config.js";
import { createAbortRollbackIntakeChecks } from "./abortRollbackIntakeEvaluator.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview.js";
import type {
  AbortRollbackSemanticsContract,
  AbortRollbackSemanticsContractIntakeChecks,
  AbortRollbackSemanticsContractIntakeMessage,
  AbortRollbackSemanticsContractIntakeSummary,
  AbortRollbackSemanticsContractNecessityProof,
  AbortRollbackSemanticsNoGoBoundary,
  AbortRollbackSemanticsPrerequisiteTransition,
  AbortRollbackSemanticsProhibitedField,
  AbortRollbackSemanticsRejectionReason,
  AbortRollbackSemanticsRequiredField,
  AbortRollbackSemanticsUpstreamEchoRequest,
  ManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeProfile,
  SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake";
const SOURCE_NODE_V325_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-prerequisite-closure-review";
const ACTIVE_PLAN = "docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md";
const TARGET_PREREQUISITE_ID = "abort-rollback-semantics" as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntakeProfile {
  const sourceNodeV325 = createSourceNodeV325(input.config);
  const prerequisiteTransition = createPrerequisiteTransition(sourceNodeV325);
  const necessityProof = createNecessityProof();
  const abortRollbackSemanticsContract = createAbortRollbackSemanticsContract(
    sourceNodeV325,
    prerequisiteTransition,
    necessityProof,
  );
  const checks = createAbortRollbackIntakeChecks(
    input.config,
    sourceNodeV325,
    abortRollbackSemanticsContract,
    prerequisiteTransition,
    necessityProof,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake")
      .every(([, value]) => value);
  const contractState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake
    ? "abort-rollback-semantics-contract-intake-ready"
    : "blocked";
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV325,
    abortRollbackSemanticsContract,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver abort/rollback semantics contract intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    governanceChainDecision: "continue-only-for-abort-rollback-semantics-contract-intake",
    readyForManagedAuditManualSandboxConnectionCredentialResolverAbortRollbackSemanticsContractIntake:
      readyForParallelEcho,
    abortRollbackSemanticsContractIntakeOnly: true,
    readOnlyAbortRollbackSemanticsContract: true,
    consumesNodeV325NoNetworkSafetyFixturePrerequisiteClosureReview: true,
    consumesNodeV313PrerequisiteCatalog: true,
    activeNodeContractVersion: "Node v326",
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    nextJavaVersion: "Java v150",
    nextMiniKvVersion: "mini-kv v142",
    nextNodeVerificationVersion: "Node v327",
    readyForParallelJavaV150MiniKvV142Echo: readyForParallelEcho,
    readyForNodeV327BeforeUpstreamEcho: false,
    readyForFinalPrerequisiteClosureReview: false,
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
    runtimeShellCommandRendered: false,
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
    networkSafetyFixtureExecuted: false,
    abortRollbackSemanticsExecuted: false,
    rollbackExecutionAllowed: false,
    deploymentActionAllowed: false,
    javaSqlExecutionAllowed: false,
    miniKvWriteCommandAllowed: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV325,
    abortRollbackSemanticsContract,
    prerequisiteTransition,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      abortRollbackSemanticsContractIntakeJson: ROUTE_PATH,
      abortRollbackSemanticsContractIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV325Json: SOURCE_NODE_V325_ROUTE,
      sourceNodeV325Markdown: `${SOURCE_NODE_V325_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v326 as the abort/rollback semantics contract-only intake.",
      "After v326 is complete, Java v150 and mini-kv v142 can run in parallel as read-only echo and non-participation receipt work.",
      "Node v327 must wait for both Java v150 and mini-kv v142 before verifying abort/rollback semantics echo alignment.",
      "Stop immediately if the contract tries to execute rollback, deployment, SQL, mini-kv writes, runtime shell commands, HTTP/TCP, provider/client work, credential value reads, raw endpoint URL parsing, ledger/schema writes, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV325(
  config: AppConfig,
): SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview({
    config,
  });

  return {
    sourceVersion: "Node v325",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForNoNetworkSafetyFixturePrerequisiteClosureReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixturePrerequisiteClosureReview,
    reviewDigest: source.closureReview.reviewDigest,
    prerequisiteClosureDecision: source.prerequisiteClosureDecision,
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
    networkSafetyFixtureExecuted: source.networkSafetyFixtureExecuted,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    networkSocketOpened: source.networkSocketOpened,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createAbortRollbackSemanticsContract(
  sourceNodeV325: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
  prerequisiteTransition: AbortRollbackSemanticsPrerequisiteTransition,
  necessityProof: AbortRollbackSemanticsContractNecessityProof,
): AbortRollbackSemanticsContract {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    contractName: "managed-audit-abort-rollback-semantics" as const,
    contractVersion: "abort-rollback-semantics.v1" as const,
    contractMode: "abort-rollback-semantics-contract-intake-only" as const,
    sourceSpan: "Node v325 closure review + Node v313 catalog" as const,
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    purpose:
      "Define the final manual abort and rollback semantics prerequisite before any later resolver can discuss implementation candidate gates.",
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
    abortRollbackExecutionAllowed: false as const,
  };

  return {
    contractDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceNodeV325ReviewDigest: sourceNodeV325.reviewDigest,
      prerequisiteTransition,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): AbortRollbackSemanticsRequiredField[] {
  return [
    requiredField("manual_abort_marker", "Manual abort marker", "stable non-secret manual abort marker", "Bind the future path to a human-visible abort marker."),
    requiredField("rollback_runbook_reference", "Rollback runbook reference", "runbook id or immutable document reference", "Point operators to rollback instructions without executing them."),
    requiredField("operator_confirmation_handle", "Operator confirmation handle", "operator confirmation handle, no credential value", "Bind abort/rollback review to an operator confirmation."),
    requiredField("approval_correlation_id", "Approval correlation id", "stable non-secret correlation id", "Bind semantics to the approval chain."),
    requiredField("cleanup_evidence_marker", "Cleanup evidence marker", "cleanup marker or evidence digest", "Declare how cleanup evidence will be recognized after a stopped attempt."),
    requiredField("idempotent_noop_failure_policy", "Idempotent no-op failure policy", "policy id or semantic version", "Define how repeated abort/rollback requests remain safe no-ops."),
    requiredField("rollback_authority_boundary", "Rollback authority boundary", "authority handle, no executable permission", "Describe who may authorize rollback without granting Node execution."),
    requiredField("abort_reason_code", "Abort reason code", "stable reason code list", "Standardize operator-readable abort reasons."),
    requiredField("recovery_checkpoint_reference", "Recovery checkpoint reference", "checkpoint handle or digest", "Describe the recovery checkpoint to inspect before future execution."),
    requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest", "Prove contract immutability without secret, endpoint, or command material."),
  ];
}

function requiredField(
  id: AbortRollbackSemanticsRequiredField["id"],
  label: string,
  acceptedShape: string,
  purpose: string,
): AbortRollbackSemanticsRequiredField {
  return { id, label, required: true, acceptedShape, purpose };
}

function createProhibitedFields(): AbortRollbackSemanticsProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must not enter abort/rollback semantics.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "Raw endpoint URLs must remain outside this contract.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("runtime_shell_command", "Runtime shell commands would turn this intake into implementation.", "RUNTIME_SHELL_COMMAND_PRESENT"),
    prohibitedField("shell_script_body", "Shell scripts are prohibited in the contract-only intake.", "SHELL_SCRIPT_BODY_PRESENT"),
    prohibitedField("secret_provider_config", "Provider configuration is not allowed before implementation candidate gates.", "SECRET_PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration is not allowed before implementation candidate gates.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("external_request_payload", "HTTP/TCP payloads must not be prepared or sent by v326.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes remain outside this Node contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in this intake.", "SCHEMA_MIGRATION_SQL_PRESENT"),
    prohibitedField("deployment_action", "Deployment actions are prohibited during semantics intake.", "DEPLOYMENT_ACTION_PRESENT"),
    prohibitedField("rollback_execution_action", "Rollback execution is prohibited during semantics intake.", "ROLLBACK_EXECUTION_ACTION_PRESENT"),
    prohibitedField("upstream_process_start", "Starting Java, mini-kv, or external audit services is prohibited.", "UPSTREAM_PROCESS_START_PRESENT"),
    prohibitedField("mini_kv_write_command", "mini-kv write commands are prohibited and mini-kv remains non-authoritative.", "MINI_KV_WRITE_COMMAND_PRESENT"),
    prohibitedField("java_sql_execution", "Java SQL execution must not be triggered by this Node contract.", "JAVA_SQL_EXECUTION_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): AbortRollbackSemanticsProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): AbortRollbackSemanticsRejectionReason[] {
  return [
    rejection("MANUAL_ABORT_MARKER_MISSING", "abort-rollback-semantics-contract", "The manual abort marker is missing."),
    rejection("ROLLBACK_RUNBOOK_REFERENCE_MISSING", "abort-rollback-semantics-contract", "The rollback runbook reference or recovery checkpoint is missing."),
    rejection("CREDENTIAL_OR_RAW_ENDPOINT_PRESENT", "credential-boundary", "Credential values and raw endpoint URLs are not allowed in abort/rollback semantics."),
    rejection("RUNTIME_SHELL_COMMAND_PRESENT", "runtime-shell-boundary", "Runtime shell commands and shell script bodies are prohibited."),
    rejection("NETWORK_OR_PROVIDER_ACTION_PRESENT", "network-boundary", "Network execution, provider/client config, HTTP requests, and TCP attempts are prohibited."),
    rejection("WRITE_OR_ROLLBACK_ACTION_PRESENT", "write-boundary", "Ledger writes, schema migration, deployment, rollback execution, upstream start, Java SQL, and mini-kv writes are prohibited."),
  ];
}

function rejection(
  code: string,
  source: AbortRollbackSemanticsRejectionReason["source"],
  message: string,
): AbortRollbackSemanticsRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): AbortRollbackSemanticsNoGoBoundary[] {
  return [
    noGo("credential_value_read", "v326 must not read managed audit credential values."),
    noGo("raw_endpoint_url_parse", "v326 must not parse or render raw endpoint URLs."),
    noGo("runtime_shell_command_render", "v326 must not render or invoke runtime shell commands."),
    noGo("secret_provider_instantiation", "v326 must not instantiate secret providers."),
    noGo("resolver_client_instantiation", "v326 must not instantiate resolver clients."),
    noGo("http_or_tcp_execution", "v326 must not send HTTP/HTTPS requests or open TCP/TLS sockets."),
    noGo("rollback_execution", "v326 must not execute deployment or rollback operations."),
    noGo("java_sql_execution", "v326 must not trigger Java SQL execution."),
    noGo("mini_kv_write_command", "v326 must not request mini-kv write commands or authority."),
    noGo("ledger_or_schema_write", "v326 must not write approval ledger or schema state."),
    noGo("automatic_upstream_start", "v326 must not automatically start Java, mini-kv, or external audit services."),
  ];
}

function noGo(id: string, message: string): AbortRollbackSemanticsNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): AbortRollbackSemanticsUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v150",
      requestedEcho:
        "Read-only echo of the Node v326 abort/rollback semantics contract, confirming Java will not execute SQL, deployment, rollback, ledger writes, or external network calls.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v142",
      requestedEcho:
        "Non-participation receipt proving mini-kv does not execute LOAD/COMPACT/RESTORE/SETNXEX, write commands, or become abort/rollback authority.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createPrerequisiteTransition(
  sourceNodeV325: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
): AbortRollbackSemanticsPrerequisiteTransition {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID);

  return {
    prerequisiteId: TARGET_PREREQUISITE_ID,
    catalogLabel: entry.closureLabel,
    beforeV326: "still-missing",
    afterV326: "contract-intake-defined",
    closureRequiresUpstreamEcho: true,
    completedPrerequisiteCountBeforeV326: sourceNodeV325.completedPrerequisiteCount as 5,
    remainingPrerequisiteCountBeforeV326: sourceNodeV325.remainingPrerequisiteCount as 1,
    preservesSignedHumanApprovalArtifactClosure: true,
    preservesCredentialHandleApprovalClosure: true,
    preservesEndpointHandleAllowlistApprovalClosure: true,
    preservesNoNetworkSafetyFixtureClosure: true,
    closesAbortRollbackSemantics: false,
  };
}

function createNecessityProof(): AbortRollbackSemanticsContractNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v325 completed the no-network-safety-fixture prerequisite and named abort-rollback-semantics as the final concrete missing contract.",
    consumer: "Java v150 + mini-kv v142, then Node v327",
    whyV325CannotBeReused:
      "v325 is a closure review for no-network-safety-fixture only; it proves 5/6 prerequisites but does not define manual abort markers, rollback runbook references, cleanup evidence, authority boundaries, or idempotent no-op failure handling.",
    existingReportReuseDecision:
      "Reuse v325 as source state and v313 as the prerequisite catalog; create v326 only for the final abort/rollback semantics contract intake.",
    stopCondition:
      "Stop if the contract requires credential values, raw endpoint URLs, runtime shell commands, provider/client configuration, HTTP/TCP, deployment, rollback execution, Java SQL, mini-kv writes, ledger/schema writes, or automatic upstream start.",
  };
}

function collectProductionBlockers(
  checks: AbortRollbackSemanticsContractIntakeChecks,
): AbortRollbackSemanticsContractIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: AbortRollbackSemanticsContractIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV325Ready
        && checks.sourceNodeV325PointsToAbortRollbackSemantics
        && checks.sourceNodeV325KeepsRuntimeBlocked
        && checks.sourceNodeV325KeepsSideEffectsClosed
        && checks.abortRollbackSemanticsStillMissingInSource,
      code: "NODE_V325_SOURCE_NOT_READY",
      source: "node-v325-no-network-safety-fixture-prerequisite-closure-review",
      message: "Node v325 must be ready, point to abort-rollback-semantics, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.catalogTargetMatchesAbortRollbackSemantics
        && checks.contractRequiredFieldsDocumented
        && checks.contractProhibitedFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed,
      code: "ABORT_ROLLBACK_SEMANTICS_CONTRACT_NOT_DOCUMENTED",
      source: "abort-rollback-semantics-contract",
      message: "The abort/rollback semantics contract must document required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
    {
      condition:
        checks.prerequisiteTransitionScopedToAbortRollbackSemantics
        && checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.contractStaysNonSecretAndNonExecuting
        && checks.abortRollbackExecutionStillBlocked,
      code: "ABORT_ROLLBACK_SEMANTICS_SCOPE_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake",
      message: "v326 must stay scoped to a non-secret contract and remain read-only/non-executing.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v326 contract intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v326 contract intake.",
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

function collectWarnings(): AbortRollbackSemanticsContractIntakeMessage[] {
  return [
    {
      code: "ABORT_ROLLBACK_SEMANTICS_CONTRACT_DOES_NOT_EXECUTE_ROLLBACK",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake",
      message: "v326 defines abort/rollback semantics only; it does not execute rollback, deployment, SQL, shell, HTTP/TCP, or cleanup work.",
    },
    {
      code: "FINAL_PREREQUISITE_CONTRACT_DOES_NOT_APPROVE_RUNTIME",
      severity: "warning",
      source: "abort-rollback-semantics-contract",
      message: "Defining the final prerequisite contract does not close the final prerequisite; Java v150, mini-kv v142, and Node v327/v328 still have to verify and close it.",
    },
  ];
}

function collectRecommendations(): AbortRollbackSemanticsContractIntakeMessage[] {
  return [
    {
      code: "RUN_JAVA_V150_AND_MINI_KV_V142_AFTER_V326_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-abort-rollback-semantics-contract-intake",
      message: "After v326 is archived, Java v150 and mini-kv v142 can run in parallel as read-only echo and non-participation receipt work.",
    },
    {
      code: "KEEP_ABORT_ROLLBACK_SEMANTICS_CONTRACT_NON_EXECUTING",
      severity: "recommendation",
      source: "abort-rollback-semantics-contract",
      message: "Keep abort/rollback semantics as markers, runbook references, cleanup evidence, no-op policy, authority boundary, checkpoint reference, and digest only; never add commands, SQL, write operations, credentials, raw endpoints, or socket actions.",
    },
  ];
}

function createSummary(
  sourceNodeV325: SourceNodeV325NoNetworkSafetyFixturePrerequisiteClosureReviewReference,
  abortRollbackSemanticsContract: AbortRollbackSemanticsContract,
  checks: AbortRollbackSemanticsContractIntakeChecks,
  productionBlockers: AbortRollbackSemanticsContractIntakeMessage[],
  warnings: AbortRollbackSemanticsContractIntakeMessage[],
  recommendations: AbortRollbackSemanticsContractIntakeMessage[],
): AbortRollbackSemanticsContractIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV325CheckCount: sourceNodeV325.sourceCheckCount,
    sourceNodeV325PassedCheckCount: sourceNodeV325.sourcePassedCheckCount,
    sourceCompletedPrerequisiteCount: sourceNodeV325.completedPrerequisiteCount,
    sourceRemainingPrerequisiteCount: sourceNodeV325.remainingPrerequisiteCount,
    requiredFieldCount: abortRollbackSemanticsContract.requiredFieldCount,
    prohibitedFieldCount: abortRollbackSemanticsContract.prohibitedFieldCount,
    rejectionReasonCount: abortRollbackSemanticsContract.rejectionReasonCount,
    noGoBoundaryCount: abortRollbackSemanticsContract.noGoBoundaryCount,
    upstreamEchoRequestCount: abortRollbackSemanticsContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
