import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeProfile,
  NoNetworkSafetyFixtureContract,
  NoNetworkSafetyFixtureContractIntakeChecks,
  NoNetworkSafetyFixtureContractIntakeMessage,
  NoNetworkSafetyFixtureContractIntakeSummary,
  NoNetworkSafetyFixtureContractNecessityProof,
  NoNetworkSafetyFixtureNoGoBoundary,
  NoNetworkSafetyFixturePrerequisiteTransition,
  NoNetworkSafetyFixtureProhibitedField,
  NoNetworkSafetyFixtureRejectionReason,
  NoNetworkSafetyFixtureRequiredField,
  NoNetworkSafetyFixtureUpstreamEchoRequest,
  SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake";
const SOURCE_NODE_V322_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review";
const ACTIVE_PLAN = "docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md";
const TARGET_PREREQUISITE_ID = "no-network-safety-fixture" as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntakeProfile {
  const sourceNodeV322 = createSourceNodeV322(input.config);
  const prerequisiteTransition = createPrerequisiteTransition(sourceNodeV322);
  const necessityProof = createNecessityProof();
  const noNetworkSafetyFixtureContract = createNoNetworkSafetyFixtureContract(
    sourceNodeV322,
    prerequisiteTransition,
    necessityProof,
  );
  const checks = createChecks(
    input.config,
    sourceNodeV322,
    noNetworkSafetyFixtureContract,
    prerequisiteTransition,
    necessityProof,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake")
      .every(([, value]) => value);
  const contractState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake
    ? "no-network-safety-fixture-contract-intake-ready"
    : "blocked";
  const readyForParallelEcho =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(
    sourceNodeV322,
    noNetworkSafetyFixtureContract,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver no-network safety fixture contract intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    contractState,
    governanceChainDecision: "continue-only-for-no-network-safety-fixture-contract-intake",
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake:
      readyForParallelEcho,
    noNetworkSafetyFixtureContractIntakeOnly: true,
    readOnlyNoNetworkSafetyFixtureContract: true,
    consumesNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReview: true,
    consumesNodeV313PrerequisiteCatalog: true,
    activeNodeContractVersion: "Node v323",
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    nextJavaVersion: "Java v149",
    nextMiniKvVersion: "mini-kv v141",
    nextNodeVerificationVersion: "Node v324",
    readyForParallelJavaV149MiniKvV141Echo: readyForParallelEcho,
    readyForNodeV324BeforeUpstreamEcho: false,
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
    networkSafetyFixtureExecuted: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV322,
    noNetworkSafetyFixtureContract,
    prerequisiteTransition,
    necessityProof,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      noNetworkSafetyFixtureContractIntakeJson: ROUTE_PATH,
      noNetworkSafetyFixtureContractIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV322Json: SOURCE_NODE_V322_ROUTE,
      sourceNodeV322Markdown: `${SOURCE_NODE_V322_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v323 as the no-network safety fixture contract-only intake.",
      "After v323 is complete, Java v149 and mini-kv v141 can run in parallel as read-only echo and non-participation receipt work.",
      "Node v324 must wait for both Java v149 and mini-kv v141 before verifying no-network safety fixture echo alignment.",
      "Stop immediately if the fixture contract tries to execute HTTP/TCP, instantiate providers or clients, parse raw endpoint URLs, read credentials, write ledgers/schema, invoke runtime shell behavior, or automatically start upstreams.",
    ],
  };
}

function createSourceNodeV322(
  config: AppConfig,
): SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview({
    config,
  });

  return {
    sourceVersion: "Node v322",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
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

function createNoNetworkSafetyFixtureContract(
  sourceNodeV322: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
  prerequisiteTransition: NoNetworkSafetyFixturePrerequisiteTransition,
  necessityProof: NoNetworkSafetyFixtureContractNecessityProof,
): NoNetworkSafetyFixtureContract {
  const requiredFields = createRequiredFields();
  const prohibitedFields = createProhibitedFields();
  const rejectionReasons = createRejectionReasons();
  const noGoBoundaries = createNoGoBoundaries();
  const upstreamEchoRequests = createUpstreamEchoRequests();
  const record = {
    contractName: "managed-audit-no-network-safety-fixture" as const,
    contractVersion: "no-network-safety-fixture.v1" as const,
    contractMode: "no-network-safety-fixture-contract-intake-only" as const,
    sourceSpan: "Node v322 closure review + Node v313 catalog" as const,
    targetPrerequisiteId: TARGET_PREREQUISITE_ID,
    purpose:
      "Define the no-network safety fixture shape required before any later resolver can discuss a runtime path that must refuse HTTP/TCP before approval.",
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
    fixtureExecutionAllowed: false as const,
  };

  return {
    contractDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceNodeV322ReviewDigest: sourceNodeV322.reviewDigest,
      prerequisiteTransition,
      necessityProof,
      record,
    }),
    ...record,
  };
}

function createRequiredFields(): NoNetworkSafetyFixtureRequiredField[] {
  return [
    requiredField("fixture_id", "Fixture id", "stable non-secret fixture identifier", "Identify the no-network safety fixture without running it."),
    requiredField("operator_confirmation_handle", "Operator confirmation handle", "operator confirmation handle, no credential value", "Bind fixture review to a human operator confirmation."),
    requiredField("approval_correlation_id", "Approval correlation id", "stable non-secret correlation id", "Bind the fixture contract to the approval chain."),
    requiredField("transport_denial_policy_id", "Transport denial policy id", "policy id or semantic version", "Declare which no-network denial policy is expected."),
    requiredField("expected_denied_transport_classes", "Expected denied transport classes", "HTTP, HTTPS, TCP, TLS, DNS, or equivalent class names", "List transport classes the future path must refuse before approval."),
    requiredField("required_denial_evidence", "Required denial evidence", "machine-readable denial evidence handle or digest", "Declare the evidence a later verification must observe."),
    requiredField("forbidden_network_actions", "Forbidden network actions", "non-empty action id list", "List network actions that must not occur in contract intake."),
    requiredField("cleanup_marker", "Cleanup marker", "stable cleanup marker or digest", "Prove any future fixture run has a cleanup requirement."),
    requiredField("timeout_budget_ms", "Timeout budget ms", "positive integer budget", "Bound any future denial verification without running it in v323."),
    requiredField("audit_digest", "Audit digest", "sha256 digest or equivalent stable digest", "Prove contract immutability without embedding secret or endpoint material."),
  ];
}

function requiredField(
  id: NoNetworkSafetyFixtureRequiredField["id"],
  label: string,
  acceptedShape: string,
  purpose: string,
): NoNetworkSafetyFixtureRequiredField {
  return { id, label, required: true, acceptedShape, purpose };
}

function createProhibitedFields(): NoNetworkSafetyFixtureProhibitedField[] {
  return [
    prohibitedField("credential_value", "Credential values must not enter the no-network safety fixture contract.", "CREDENTIAL_VALUE_PRESENT"),
    prohibitedField("raw_endpoint_url", "Raw endpoint URLs must not enter this contract; only handles and denial policy ids are allowed.", "RAW_ENDPOINT_URL_PRESENT"),
    prohibitedField("secret_provider_config", "Provider configuration would turn this contract into implementation.", "SECRET_PROVIDER_CONFIG_PRESENT"),
    prohibitedField("resolver_client_config", "Resolver client configuration is not allowed in a contract-only intake.", "RESOLVER_CLIENT_CONFIG_PRESENT"),
    prohibitedField("external_request_payload", "No HTTP/TCP payload may be prepared or sent by v323.", "EXTERNAL_REQUEST_PAYLOAD_PRESENT"),
    prohibitedField("network_socket_open", "Opening sockets is prohibited during contract intake.", "NETWORK_SOCKET_OPEN_PRESENT"),
    prohibitedField("http_request_execution", "HTTP request execution is prohibited during contract intake.", "HTTP_REQUEST_EXECUTION_PRESENT"),
    prohibitedField("tcp_connection_attempt", "TCP connection attempts are prohibited during contract intake.", "TCP_CONNECTION_ATTEMPT_PRESENT"),
    prohibitedField("approval_ledger_mutation", "Approval ledger writes remain outside this Node contract.", "APPROVAL_LEDGER_MUTATION_PRESENT"),
    prohibitedField("schema_migration_sql", "Schema migration SQL is prohibited in this intake.", "SCHEMA_MIGRATION_SQL_PRESENT"),
    prohibitedField("upstream_process_start", "Starting Java, mini-kv, or external audit services is prohibited.", "UPSTREAM_PROCESS_START_PRESENT"),
    prohibitedField("runtime_shell_invocation", "Runtime shell invocation remains prohibited.", "RUNTIME_SHELL_INVOCATION_PRESENT"),
  ];
}

function prohibitedField(id: string, reason: string, rejectionCode: string): NoNetworkSafetyFixtureProhibitedField {
  return { id, reason, rejectionCode };
}

function createRejectionReasons(): NoNetworkSafetyFixtureRejectionReason[] {
  return [
    rejection("FIXTURE_ID_MISSING", "no-network-fixture-contract", "The no-network safety fixture id is missing."),
    rejection("DENIAL_POLICY_MISSING", "no-network-fixture-contract", "The transport denial policy id or expected denied transport classes are missing."),
    rejection("NETWORK_ACTION_PRESENT", "network-boundary", "Network execution, socket opening, HTTP requests, or TCP connection attempts are prohibited."),
    rejection("CREDENTIAL_OR_RAW_ENDPOINT_PRESENT", "credential-boundary", "Credential values and raw endpoint URLs are not allowed in the fixture contract."),
    rejection("PROVIDER_CLIENT_CONFIG_PRESENT", "provider-client-boundary", "Secret provider and resolver client config are prohibited in this intake."),
    rejection("WRITE_OR_RUNTIME_ACTION_PRESENT", "write-boundary", "Ledger writes, schema migration, deployment, rollback, upstream start, and runtime shell invocation are prohibited."),
  ];
}

function rejection(
  code: string,
  source: NoNetworkSafetyFixtureRejectionReason["source"],
  message: string,
): NoNetworkSafetyFixtureRejectionReason {
  return { code, source, message };
}

function createNoGoBoundaries(): NoNetworkSafetyFixtureNoGoBoundary[] {
  return [
    noGo("credential_value_read", "v323 must not read managed audit credential values."),
    noGo("raw_endpoint_url_parse", "v323 must not parse or render raw endpoint URLs."),
    noGo("secret_provider_instantiation", "v323 must not instantiate secret providers."),
    noGo("resolver_client_instantiation", "v323 must not instantiate resolver clients."),
    noGo("http_request_send", "v323 must not send HTTP/HTTPS requests."),
    noGo("tcp_socket_connect", "v323 must not open TCP/TLS sockets."),
    noGo("network_fixture_execution", "v323 must not execute a no-network fixture; it only defines the contract."),
    noGo("ledger_or_schema_write", "v323 must not write approval ledger or schema state."),
    noGo("automatic_upstream_start", "v323 must not automatically start Java, mini-kv, or external audit services."),
    noGo("runtime_shell_invocation", "v323 must not invoke a runtime shell."),
  ];
}

function noGo(id: string, message: string): NoNetworkSafetyFixtureNoGoBoundary {
  return { id, allowed: false, message };
}

function createUpstreamEchoRequests(): NoNetworkSafetyFixtureUpstreamEchoRequest[] {
  return [
    {
      project: "java",
      version: "Java v149",
      requestedEcho:
        "Read-only echo of the Node v323 no-network safety fixture contract, confirming Java will not execute SQL, deployment, rollback, ledger writes, or external network calls.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
    {
      project: "mini-kv",
      version: "mini-kv v141",
      requestedEcho:
        "Non-participation receipt proving mini-kv does not execute LOAD/COMPACT/RESTORE/SETNXEX, open network sockets, or become network safety authority.",
      canRunInParallel: true,
      mustRemainReadOnly: true,
    },
  ];
}

function createPrerequisiteTransition(
  sourceNodeV322: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
): NoNetworkSafetyFixturePrerequisiteTransition {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID);

  return {
    prerequisiteId: TARGET_PREREQUISITE_ID,
    catalogLabel: entry.closureLabel,
    beforeV323: "still-missing",
    afterV323: "contract-intake-defined",
    closureRequiresUpstreamEcho: true,
    completedPrerequisiteCountBeforeV323: sourceNodeV322.completedPrerequisiteCount as 4,
    remainingPrerequisiteCountBeforeV323: sourceNodeV322.remainingPrerequisiteCount as 2,
    preservesSignedHumanApprovalArtifactClosure: true,
    preservesCredentialHandleApprovalClosure: true,
    preservesEndpointHandleAllowlistApprovalClosure: true,
    closesNoNetworkSafetyFixture: false,
    closesAbortRollbackSemantics: false,
  };
}

function createNecessityProof(): NoNetworkSafetyFixtureContractNecessityProof {
  return {
    proofComplete: true,
    blockerResolved:
      "v322 completed the endpoint-handle-allowlist-approval prerequisite and named no-network-safety-fixture as the next concrete missing contract.",
    consumer: "Java v149 + mini-kv v141, then Node v324",
    whyV322CannotBeReused:
      "v322 is a closure review only; it proves endpoint-handle-allowlist-approval is complete but does not define no-network denial evidence for upstream echo.",
    existingReportReuseDecision:
      "Reuse v322 as source state and v313 as the prerequisite catalog; create v323 only for the no-network safety fixture contract intake.",
    stopCondition:
      "Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, network execution, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV322: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
  noNetworkSafetyFixtureContract: NoNetworkSafetyFixtureContract,
  prerequisiteTransition: NoNetworkSafetyFixturePrerequisiteTransition,
  necessityProof: NoNetworkSafetyFixtureContractNecessityProof,
): NoNetworkSafetyFixtureContractIntakeChecks {
  const fieldIds = noNetworkSafetyFixtureContract.requiredFields.map((field) => field.id);
  const prohibitedIds = noNetworkSafetyFixtureContract.prohibitedFields.map((field) => field.id);

  return {
    sourceNodeV322Ready: sourceNodeV322.readyForEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
    sourceNodeV322PointsToNoNetworkSafetyFixture:
      sourceNodeV322.nextConcretePrerequisiteId === TARGET_PREREQUISITE_ID
      && sourceNodeV322.nextConcretePrerequisiteContractRequired
      && sourceNodeV322.nextNodeVersionSuggested === "Node v323",
    sourceNodeV322KeepsRuntimeBlocked:
      sourceNodeV322.runtimeShellStillBlocked
      && sourceNodeV322.runtimeShellImplemented === false
      && sourceNodeV322.runtimeShellInvocationAllowed === false,
    sourceNodeV322KeepsSideEffectsClosed:
      sourceNodeV322.executionAllowed === false
      && sourceNodeV322.connectsManagedAudit === false
      && sourceNodeV322.credentialValueRead === false
      && sourceNodeV322.rawEndpointUrlParsed === false
      && sourceNodeV322.externalRequestSent === false
      && sourceNodeV322.schemaMigrationExecuted === false
      && sourceNodeV322.approvalLedgerWritten === false
      && sourceNodeV322.automaticUpstreamStart === false,
    noNetworkSafetyFixtureStillMissingInSource:
      sourceNodeV322.remainingPrerequisiteIds.includes(TARGET_PREREQUISITE_ID)
      && !sourceNodeV322.completedPrerequisiteIds.includes(TARGET_PREREQUISITE_ID),
    catalogTargetMatchesNoNetworkSafetyFixture:
      getHumanApprovalArtifactReviewPostEchoPrerequisite(TARGET_PREREQUISITE_ID).id === TARGET_PREREQUISITE_ID,
    contractRequiredFieldsDocumented:
      fieldIds.length === 10
      && fieldIds.includes("fixture_id")
      && fieldIds.includes("operator_confirmation_handle")
      && fieldIds.includes("approval_correlation_id")
      && fieldIds.includes("transport_denial_policy_id")
      && fieldIds.includes("expected_denied_transport_classes")
      && fieldIds.includes("required_denial_evidence")
      && fieldIds.includes("forbidden_network_actions")
      && fieldIds.includes("cleanup_marker")
      && fieldIds.includes("timeout_budget_ms")
      && fieldIds.includes("audit_digest"),
    contractProhibitedFieldsDocumented:
      prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("secret_provider_config")
      && prohibitedIds.includes("resolver_client_config")
      && prohibitedIds.includes("external_request_payload")
      && prohibitedIds.includes("network_socket_open")
      && prohibitedIds.includes("http_request_execution")
      && prohibitedIds.includes("tcp_connection_attempt")
      && prohibitedIds.includes("approval_ledger_mutation")
      && prohibitedIds.includes("schema_migration_sql")
      && prohibitedIds.includes("upstream_process_start")
      && prohibitedIds.includes("runtime_shell_invocation"),
    rejectionReasonsDocumented: noNetworkSafetyFixtureContract.rejectionReasonCount >= 6,
    noGoBoundariesClosed:
      noNetworkSafetyFixtureContract.noGoBoundaryCount >= 10
      && noNetworkSafetyFixtureContract.noGoBoundaries.every((boundary) => boundary.allowed === false),
    prerequisiteTransitionScopedToNoNetworkSafetyFixture:
      prerequisiteTransition.prerequisiteId === TARGET_PREREQUISITE_ID
      && prerequisiteTransition.beforeV323 === "still-missing"
      && prerequisiteTransition.afterV323 === "contract-intake-defined"
      && prerequisiteTransition.closureRequiresUpstreamEcho
      && prerequisiteTransition.completedPrerequisiteCountBeforeV323 === 4
      && prerequisiteTransition.remainingPrerequisiteCountBeforeV323 === 2
      && prerequisiteTransition.preservesSignedHumanApprovalArtifactClosure
      && prerequisiteTransition.preservesCredentialHandleApprovalClosure
      && prerequisiteTransition.preservesEndpointHandleAllowlistApprovalClosure
      && !prerequisiteTransition.closesNoNetworkSafetyFixture
      && !prerequisiteTransition.closesAbortRollbackSemantics,
    necessityProofDocumented:
      necessityProof.proofComplete && necessityProof.consumer === "Java v149 + mini-kv v141, then Node v324",
    javaMiniKvEchoRequestExplicitlyParallel:
      noNetworkSafetyFixtureContract.upstreamEchoRequests.length === 2
      && noNetworkSafetyFixtureContract.upstreamEchoRequests.every((request) =>
        request.canRunInParallel && request.mustRemainReadOnly),
    contractStaysNoNetworkAndNonSecret:
      fieldIds.includes("fixture_id")
      && fieldIds.includes("expected_denied_transport_classes")
      && fieldIds.includes("forbidden_network_actions")
      && !fieldIds.includes("credential_value" as NoNetworkSafetyFixtureRequiredField["id"])
      && prohibitedIds.includes("credential_value")
      && prohibitedIds.includes("raw_endpoint_url")
      && prohibitedIds.includes("http_request_execution")
      && prohibitedIds.includes("tcp_connection_attempt"),
    fixtureExecutionStillBlocked: noNetworkSafetyFixtureContract.fixtureExecutionAllowed === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    runtimeShellImplementationStillBlocked: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake: false,
  };
}

function collectProductionBlockers(
  checks: NoNetworkSafetyFixtureContractIntakeChecks,
): NoNetworkSafetyFixtureContractIntakeMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: NoNetworkSafetyFixtureContractIntakeMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV322Ready
        && checks.sourceNodeV322PointsToNoNetworkSafetyFixture
        && checks.sourceNodeV322KeepsRuntimeBlocked
        && checks.sourceNodeV322KeepsSideEffectsClosed
        && checks.noNetworkSafetyFixtureStillMissingInSource,
      code: "NODE_V322_SOURCE_NOT_READY",
      source: "node-v322-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "Node v322 must be ready, point to no-network-safety-fixture, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.catalogTargetMatchesNoNetworkSafetyFixture
        && checks.contractRequiredFieldsDocumented
        && checks.contractProhibitedFieldsDocumented
        && checks.rejectionReasonsDocumented
        && checks.noGoBoundariesClosed,
      code: "NO_NETWORK_SAFETY_FIXTURE_CONTRACT_NOT_DOCUMENTED",
      source: "no-network-safety-fixture-contract",
      message: "The no-network safety fixture contract must document required fields, prohibited fields, rejection reasons, and no-go boundaries.",
    },
    {
      condition:
        checks.prerequisiteTransitionScopedToNoNetworkSafetyFixture
        && checks.necessityProofDocumented
        && checks.javaMiniKvEchoRequestExplicitlyParallel
        && checks.contractStaysNoNetworkAndNonSecret
        && checks.fixtureExecutionStillBlocked,
      code: "NO_NETWORK_SAFETY_FIXTURE_SCOPE_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake",
      message: "v323 must stay scoped to a no-network contract and remain non-secret/read-only/non-executing.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v323 contract intake.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v323 contract intake.",
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

function collectWarnings(): NoNetworkSafetyFixtureContractIntakeMessage[] {
  return [
    {
      code: "NO_NETWORK_SAFETY_FIXTURE_CONTRACT_DOES_NOT_EXECUTE_FIXTURE",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake",
      message: "v323 defines the no-network fixture contract only; it does not run a fixture, open sockets, or prove denial behavior yet.",
    },
    {
      code: "NO_NETWORK_SAFETY_FIXTURE_DOES_NOT_CLOSE_ABORT_ROLLBACK",
      severity: "warning",
      source: "no-network-safety-fixture-contract",
      message: "No-network safety fixture work does not close abort/rollback semantics, which remains a separate prerequisite.",
    },
  ];
}

function collectRecommendations(): NoNetworkSafetyFixtureContractIntakeMessage[] {
  return [
    {
      code: "RUN_JAVA_V149_AND_MINI_KV_V141_AFTER_V323_ARCHIVE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake",
      message: "After v323 is archived, Java v149 and mini-kv v141 can run in parallel as read-only echo and non-participation receipt work.",
    },
    {
      code: "KEEP_NO_NETWORK_FIXTURE_CONTRACT_NON_EXECUTING",
      severity: "recommendation",
      source: "no-network-safety-fixture-contract",
      message: "Keep the no-network safety fixture as handles, denied transport classes, evidence requirements, cleanup markers, timeout budget, and digest only; never add credential values, raw endpoint URLs, provider/client config, socket operations, or HTTP/TCP payloads.",
    },
  ];
}

function createSummary(
  sourceNodeV322: SourceNodeV322EndpointHandleAllowlistApprovalPrerequisiteClosureReviewReference,
  noNetworkSafetyFixtureContract: NoNetworkSafetyFixtureContract,
  checks: NoNetworkSafetyFixtureContractIntakeChecks,
  productionBlockers: NoNetworkSafetyFixtureContractIntakeMessage[],
  warnings: NoNetworkSafetyFixtureContractIntakeMessage[],
  recommendations: NoNetworkSafetyFixtureContractIntakeMessage[],
): NoNetworkSafetyFixtureContractIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV322CheckCount: sourceNodeV322.sourceCheckCount,
    sourceNodeV322PassedCheckCount: sourceNodeV322.sourcePassedCheckCount,
    sourceCompletedPrerequisiteCount: sourceNodeV322.completedPrerequisiteCount,
    sourceRemainingPrerequisiteCount: sourceNodeV322.remainingPrerequisiteCount,
    requiredFieldCount: noNetworkSafetyFixtureContract.requiredFieldCount,
    prohibitedFieldCount: noNetworkSafetyFixtureContract.prohibitedFieldCount,
    rejectionReasonCount: noNetworkSafetyFixtureContract.rejectionReasonCount,
    noGoBoundaryCount: noNetworkSafetyFixtureContract.noGoBoundaryCount,
    upstreamEchoRequestCount: noNetworkSafetyFixtureContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
