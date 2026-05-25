import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake.js";
import type {
  JavaV149NoNetworkSafetyFixtureContractEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationProfile,
  MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference,
  NoNetworkSafetyFixtureUpstreamEchoVerification,
  NoNetworkSafetyFixtureUpstreamEchoVerificationChecks,
  NoNetworkSafetyFixtureUpstreamEchoVerificationMessage,
  NoNetworkSafetyFixtureUpstreamEchoVerificationSummary,
  SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification";
const SOURCE_NODE_V323_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake";
const ACTIVE_PLAN = "docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md";

const JAVA_V149_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoSupport.java";
const JAVA_V149_CATALOG =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.java";
const JAVA_V149_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceNoNetworkSafetyFixtureContractEchoTests.java";
const JAVA_V149_EXPLANATION = "D:/javaproj/advanced-order-platform/d/149/解释/说明.md";
const JAVA_V149_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/151-version-149-no-network-safety-fixture-contract-echo.md";
const MINI_KV_V141_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-no-network-safety-fixture-contract-non-participation-receipt.json";
const MINI_KV_V141_EXPLANATION = "D:/C/mini-kv/d/141/解释/说明.md";
const MINI_KV_V141_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/197-version-141-credential-resolver-no-network-safety-fixture-contract-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerificationProfile {
  const sourceNodeV323 = createSourceNodeV323(input.config);
  const javaV149 = createJavaV149Reference(sourceNodeV323);
  const miniKvV141 = createMiniKvV141Reference(sourceNodeV323);
  const checks = createChecks(input.config, sourceNodeV323, javaV149, miniKvV141);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification
      ? "no-network-safety-fixture-upstream-echo-verification-ready"
      : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV323, javaV149, miniKvV141, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV323, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver no-network safety fixture upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-abort-rollback-semantics-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    noNetworkSafetyFixtureUpstreamEchoVerificationOnly: true,
    consumesNodeV323NoNetworkSafetyFixtureContractIntake: true,
    consumesJavaV149NoNetworkSafetyFixtureContractEcho: true,
    consumesMiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v324",
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
    networkSocketOpened: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV323,
    upstreamEvidence: { javaV149, miniKvV141 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      noNetworkSafetyFixtureUpstreamEchoVerificationJson: ROUTE_PATH,
      noNetworkSafetyFixtureUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV323Json: SOURCE_NODE_V323_ROUTE,
      sourceNodeV323Markdown: `${SOURCE_NODE_V323_ROUTE}?format=markdown`,
      javaV149Support: JAVA_V149_SUPPORT,
      javaV149Catalog: JAVA_V149_CATALOG,
      javaV149Test: JAVA_V149_TEST,
      javaV149Explanation: JAVA_V149_EXPLANATION,
      javaV149Walkthrough: JAVA_V149_WALKTHROUGH,
      miniKvV141Receipt: MINI_KV_V141_RECEIPT,
      miniKvV141Explanation: MINI_KV_V141_EXPLANATION,
      miniKvV141Walkthrough: MINI_KV_V141_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v324 as the read-only verification that Java v149 and mini-kv v141 echoed the Node v323 no-network safety fixture contract.",
      "Keep no-network-safety-fixture open for Node v325 closure review; v324 only proves upstream echo alignment.",
      "Do not execute fixture behavior, open sockets, send HTTP/TCP, parse raw endpoint URLs, instantiate providers or clients, write ledgers/schema, or invoke runtime shell behavior.",
      "After v324, decide whether no-network-safety-fixture can move to contract-intake-and-upstream-echo-complete while abort/rollback remains separate.",
    ],
  };
}

function createSourceNodeV323(config: AppConfig): SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake({
    config,
  });
  const contract = source.noNetworkSafetyFixtureContract;

  return {
    sourceVersion: "Node v323",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForNoNetworkSafetyFixtureContractIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureContractIntake,
    targetPrerequisiteId: source.targetPrerequisiteId,
    contractDigest: contract.contractDigest,
    noNetworkSafetyFixtureContract: contract,
    prerequisiteTransition: source.prerequisiteTransition,
    checks: source.checks,
    summary: source.summary,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV149MiniKvV141Echo: source.readyForParallelJavaV149MiniKvV141Echo,
    requiredFieldIds: contract.requiredFields.map((field) => field.id),
    prohibitedFieldIds: contract.prohibitedFields.map((field) => field.id),
    rejectionReasonCodes: contract.rejectionReasons.map((reason) => reason.code),
    noGoBoundaryIds: contract.noGoBoundaries.map((boundary) => boundary.id),
    upstreamEchoRequestVersions: contract.upstreamEchoRequests.map((request) => request.version),
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
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV149Reference(
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
): JavaV149NoNetworkSafetyFixtureContractEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v149-support", JAVA_V149_SUPPORT),
    evidenceFile("java-v149-catalog", JAVA_V149_CATALOG),
    evidenceFile("java-v149-test", JAVA_V149_TEST),
    evidenceFile("java-v149-explanation", JAVA_V149_EXPLANATION),
    evidenceFile("java-v149-walkthrough", JAVA_V149_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v149-mode", JAVA_V149_TEST, "java-v149-no-network-safety-fixture-contract-echo-only"),
    snippet("java-v149-node-v323", JAVA_V149_TEST, "Node v323"),
    snippet("java-v149-node-v324", JAVA_V149_TEST, "Node v324"),
    snippet("java-v149-profile", JAVA_V149_TEST, sourceNodeV323.profileVersion),
    snippet("java-v149-route", JAVA_V149_TEST, SOURCE_NODE_V323_ROUTE),
    snippet("java-v149-state", JAVA_V149_TEST, sourceNodeV323.contractState),
    snippet("java-v149-ready", JAVA_V149_TEST, "readyForNodeV324NoNetworkSafetyFixtureUpstreamEchoVerification()).isTrue()"),
    snippet("java-v149-contract-digest", JAVA_V149_TEST, sourceNodeV323.contractDigest),
    snippet("java-v149-required-count", JAVA_V149_TEST, "summary().requiredFieldCount()).isEqualTo(10)"),
    snippet("java-v149-prohibited-count", JAVA_V149_TEST, "summary().prohibitedFieldCount()).isEqualTo(12)"),
    snippet("java-v149-rejection-count", JAVA_V149_CATALOG, "rejection(\"WRITE_OR_RUNTIME_ACTION_PRESENT\""),
    snippet("java-v149-no-go-count", JAVA_V149_TEST, "summary().noGoBoundaryCount()).isEqualTo(10)"),
    snippet("java-v149-required-field", JAVA_V149_TEST, "\"fixture_id\""),
    snippet("java-v149-prohibited-field", JAVA_V149_TEST, "\"http_request_execution\""),
    snippet("java-v149-no-go-boundary", JAVA_V149_TEST, "\"network_fixture_execution\""),
    snippet("java-v149-parallel", JAVA_V149_TEST, ".containsExactly(\"Java v149\", \"mini-kv v141\")"),
    snippet("java-v149-necessity", JAVA_V149_TEST, "Java v149 + mini-kv v141, then Node v324"),
    snippet("java-v149-no-fixture", JAVA_V149_TEST, "networkSafetyFixtureExecuted()).isFalse()"),
    snippet("java-v149-no-http", JAVA_V149_TEST, "httpRequestSent()).isFalse()"),
    snippet("java-v149-no-tcp", JAVA_V149_TEST, "tcpConnectionAttempted()).isFalse()"),
    snippet("java-v149-no-external", JAVA_V149_TEST, "externalRequestSent()).isFalse()"),
    snippet("java-v149-no-ledger", JAVA_V149_TEST, "approvalLedgerWritten()).isFalse()"),
    snippet("java-v149-no-sql", JAVA_V149_TEST, "sqlExecuted()).isFalse()"),
    snippet("java-v149-no-provider", JAVA_V149_SUPPORT, "secretProviderInstantiated"),
    snippet("java-v149-schema", JAVA_V149_TEST, "java-release-approval-rehearsal-response-schema.v49"),
    snippet("java-v149-explanation", JAVA_V149_EXPLANATION, "read-only no-network safety fixture contract echo"),
    snippet("java-v149-walkthrough", JAVA_V149_WALKTHROUGH, "Node v324 can verify it"),
  ];

  return {
    sourceVersion: "Java v149",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-no-network-safety-fixture-contract-echo-receipt.v1",
    echoMode: "java-v149-no-network-safety-fixture-contract-echo-only",
    sourceSpan: "Node v323 + Java v147",
    nextNodeVersion: "Node v324",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV323Plan:
      snippetMatched(expectedSnippets, "java-v149-node-v323")
      && snippetMatched(expectedSnippets, "java-v149-profile")
      && snippetMatched(expectedSnippets, "java-v149-route")
      && snippetMatched(expectedSnippets, "java-v149-state"),
    readyForNodeV324:
      snippetMatched(expectedSnippets, "java-v149-node-v324")
      && snippetMatched(expectedSnippets, "java-v149-ready"),
    noNetworkSafetyFixtureContractEchoed:
      snippetMatched(expectedSnippets, "java-v149-contract-digest")
      && snippetMatched(expectedSnippets, "java-v149-required-field")
      && snippetMatched(expectedSnippets, "java-v149-prohibited-field")
      && snippetMatched(expectedSnippets, "java-v149-no-go-boundary"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v149-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v149-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v149-rejection-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v149-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v149-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v149-necessity"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v149-no-fixture")
      && snippetMatched(expectedSnippets, "java-v149-no-http")
      && snippetMatched(expectedSnippets, "java-v149-no-tcp")
      && snippetMatched(expectedSnippets, "java-v149-no-external")
      && snippetMatched(expectedSnippets, "java-v149-no-ledger")
      && snippetMatched(expectedSnippets, "java-v149-no-sql")
      && snippetMatched(expectedSnippets, "java-v149-no-provider"),
  };
}

function createMiniKvV141Reference(
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
): MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v141-receipt", MINI_KV_V141_RECEIPT),
    evidenceFile("mini-kv-v141-explanation", MINI_KV_V141_EXPLANATION),
    evidenceFile("mini-kv-v141-walkthrough", MINI_KV_V141_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v141-receipt-version", MINI_KV_V141_RECEIPT, "mini-kv-credential-resolver-no-network-safety-fixture-contract-non-participation-receipt.v1"),
    snippet("mini-kv-v141-node-v323", MINI_KV_V141_RECEIPT, "Node v323 no-network safety fixture contract intake"),
    snippet("mini-kv-v141-node-v324", MINI_KV_V141_RECEIPT, "Node v324 no-network safety fixture upstream echo verification"),
    snippet("mini-kv-v141-contract-digest", MINI_KV_V141_RECEIPT, sourceNodeV323.contractDigest),
    snippet("mini-kv-v141-required-field", MINI_KV_V141_RECEIPT, "\"fixture_id\""),
    snippet("mini-kv-v141-prohibited-field", MINI_KV_V141_RECEIPT, "\"http_request_execution\""),
    snippet("mini-kv-v141-boundary", MINI_KV_V141_RECEIPT, "\"network_safety_authority\":false"),
    snippet("mini-kv-v141-no-http", MINI_KV_V141_RECEIPT, "\"http_request_sent\":false"),
    snippet("mini-kv-v141-no-tcp", MINI_KV_V141_RECEIPT, "\"tcp_connection_attempted\":false"),
    snippet("mini-kv-v141-explanation", MINI_KV_V141_EXPLANATION, "真实命令入口只读暴露 v141 回执"),
    snippet("mini-kv-v141-walkthrough", MINI_KV_V141_WALKTHROUGH, "给 Node v324 提供了 no-network safety fixture contract"),
  ];
  const root = readJsonObject(MINI_KV_V141_RECEIPT);
  const receipt = objectField(root, "credential_resolver_no_network_safety_fixture_contract_non_participation_receipt");
  const sourceNode = objectField(receipt, "source_node_v323_reference");
  const contract = objectField(sourceNode, "no_network_safety_fixture_contract");
  const requiredFieldIds = objectArrayField(contract, "required_fields").map((field) => stringField(field, "id"));
  const prohibitedFieldIds = objectArrayField(contract, "prohibited_fields").map((field) => stringField(field, "id"));
  const noGoBoundaryIds = objectArrayField(contract, "no_go_boundaries").map((field) => stringField(field, "id"));

  const reference = {
    sourceVersion: "mini-kv v141" as const,
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    sourceNodeV323ContractDigest: stringField(contract, "contract_digest"),
    echoesNodeV323Plan:
      stringField(sourceNode, "profile_version") === sourceNodeV323.profileVersion
      && stringField(sourceNode, "contract_state") === sourceNodeV323.contractState
      && stringField(sourceNode, "target_prerequisite_id") === sourceNodeV323.targetPrerequisiteId,
    readyForNodeV324:
      stringField(root, "consumer_hint") === "Node v324 no-network safety fixture upstream echo verification"
      && booleanField(receipt, "ready_for_node_v324_no_network_safety_fixture_upstream_echo_verification") === true,
    requiredFieldCount: numberField(contract, "required_field_count"),
    prohibitedFieldCount: numberField(contract, "prohibited_field_count"),
    rejectionReasonCount: numberField(contract, "rejection_reason_count"),
    noGoBoundaryCount: numberField(contract, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(contract, "upstream_echo_request_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "no_network_safety_fixture_contract_non_participation_receipt_only") === true,
    readOnlyNoNetworkSafetyFixtureContract:
      booleanField(receipt, "read_only_no_network_safety_fixture_contract") === true,
    consumesNodeV323NoNetworkSafetyFixtureContractIntake:
      booleanField(receipt, "consumes_node_v323_no_network_safety_fixture_contract_intake") === true,
    readyForNodeV324BeforeUpstreamEcho:
      booleanField(receipt, "ready_for_node_v324_before_upstream_echo") === true,
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented") === true,
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed") === true,
    executionAllowed: booleanField(receipt, "execution_allowed") === true,
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit") === true,
    credentialValueRead: booleanField(receipt, "credential_value_read") === true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") === true,
    externalRequestSent: booleanField(receipt, "external_request_sent") === true,
    networkSafetyFixtureExecuted: booleanField(receipt, "network_safety_fixture_executed") === true,
    networkFixtureExecutionAllowed: booleanField(receipt, "network_fixture_execution_allowed") === true,
    networkSafetyAuthority: booleanField(receipt, "network_safety_authority") === true,
    httpRequestSent: booleanField(receipt, "http_request_sent") === true,
    tcpConnectionAttempted: booleanField(receipt, "tcp_connection_attempted") === true,
    networkSocketOpened: booleanField(receipt, "network_socket_opened") === true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") === true,
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated") === true,
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed") === true,
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written") === true,
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start") === true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") === true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") === true,
    auditAuthoritative: booleanField(receipt, "audit_authoritative") === true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") === true,
    contractFieldIdsAligned:
      requiredFieldIds.includes("fixture_id")
      && prohibitedFieldIds.includes("http_request_execution")
      && noGoBoundaryIds.includes("network_fixture_execution")
      && stringArrayField(contract, "rejection_reasons").includes("NETWORK_ACTION_PRESENT"),
    sideEffectBoundariesClosed: false,
  };

  return {
    ...reference,
    sideEffectBoundariesClosed:
      reference.runtimeShellImplemented === false
      && reference.runtimeShellInvocationAllowed === false
      && reference.executionAllowed === false
      && reference.connectsManagedAudit === false
      && reference.credentialValueRead === false
      && reference.rawEndpointUrlParsed === false
      && reference.externalRequestSent === false
      && reference.networkSafetyFixtureExecuted === false
      && reference.networkFixtureExecutionAllowed === false
      && reference.networkSafetyAuthority === false
      && reference.httpRequestSent === false
      && reference.tcpConnectionAttempted === false
      && reference.networkSocketOpened === false
      && reference.secretProviderInstantiated === false
      && reference.resolverClientInstantiated === false
      && reference.schemaMigrationExecuted === false
      && reference.approvalLedgerWritten === false
      && reference.automaticUpstreamStart === false
      && reference.loadRestoreCompactExecuted === false
      && reference.setnxexExecutionAllowed === false
      && reference.auditAuthoritative === false
      && reference.orderAuthoritative === false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
  javaV149: JavaV149NoNetworkSafetyFixtureContractEchoReference,
  miniKvV141: MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference,
): NoNetworkSafetyFixtureUpstreamEchoVerificationChecks {
  return {
    sourceNodeV323Ready: sourceNodeV323.readyForNoNetworkSafetyFixtureContractIntake,
    sourceNodeV323RequestsParallelEcho:
      sourceNodeV323.nextJavaVersion === "Java v149"
      && sourceNodeV323.nextMiniKvVersion === "mini-kv v141"
      && sourceNodeV323.nextNodeVerificationVersion === "Node v324"
      && sourceNodeV323.readyForParallelJavaV149MiniKvV141Echo,
    sourceNodeV323ContractComplete:
      sourceNodeV323.contractDigest.length === 64
      && sourceNodeV323.requiredFieldIds.length === 10
      && sourceNodeV323.prohibitedFieldIds.length === 12
      && sourceNodeV323.rejectionReasonCodes.length === 6
      && sourceNodeV323.noGoBoundaryIds.length === 10,
    sourceNodeV323KeepsRuntimeBlocked:
      sourceNodeV323.runtimeShellImplemented === false
      && sourceNodeV323.runtimeShellInvocationAllowed === false,
    sourceNodeV323KeepsSideEffectsClosed:
      sourceNodeV323.executionAllowed === false
      && sourceNodeV323.connectsManagedAudit === false
      && sourceNodeV323.credentialValueRead === false
      && sourceNodeV323.rawEndpointUrlParsed === false
      && sourceNodeV323.externalRequestSent === false
      && sourceNodeV323.networkSafetyFixtureExecuted === false
      && sourceNodeV323.httpRequestSent === false
      && sourceNodeV323.tcpConnectionAttempted === false
      && sourceNodeV323.schemaMigrationExecuted === false
      && sourceNodeV323.approvalLedgerWritten === false
      && sourceNodeV323.automaticUpstreamStart === false,
    javaV149EvidencePresent: javaV149.evidencePresent,
    javaV149EchoesNodeV323Plan: javaV149.echoesNodeV323Plan,
    javaV149ReadyForNodeV324: javaV149.readyForNodeV324,
    javaV149NoNetworkSafetyFixtureContractEchoed: javaV149.noNetworkSafetyFixtureContractEchoed,
    javaV149KeepsRuntimeBlocked: javaV149.sideEffectBoundariesClosed,
    miniKvV141EvidencePresent: miniKvV141.evidencePresent,
    miniKvV141EchoesNodeV323Plan: miniKvV141.echoesNodeV323Plan,
    miniKvV141ReadyForNodeV324: miniKvV141.readyForNodeV324,
    miniKvV141NoNetworkSafetyFixtureContractEchoed:
      miniKvV141.sourceNodeV323ContractDigest === sourceNodeV323.contractDigest
      && miniKvV141.requiredFieldCount === 10
      && miniKvV141.prohibitedFieldCount === 12
      && miniKvV141.rejectionReasonCount === 6
      && miniKvV141.noGoBoundaryCount === 10
      && miniKvV141.upstreamEchoRequestCount === 2,
    miniKvV141KeepsRuntimeBlocked: miniKvV141.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV149.readyForNodeV324
      && miniKvV141.readyForNodeV324
      && javaV149.upstreamEchoRequestsEchoed,
    noNetworkSafetyFixtureContractAligned:
      javaV149.noNetworkSafetyFixtureContractEchoed
      && miniKvV141.sourceNodeV323ContractDigest === sourceNodeV323.contractDigest,
    sideEffectBoundariesAligned:
      javaV149.sideEffectBoundariesClosed
      && miniKvV141.sideEffectBoundariesClosed
      && sourceNodeV323.executionAllowed === false
      && sourceNodeV323.networkSafetyFixtureExecuted === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverNoNetworkSafetyFixtureUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
  javaV149: JavaV149NoNetworkSafetyFixtureContractEchoReference,
  miniKvV141: MiniKvV141NoNetworkSafetyFixtureContractNonParticipationReceiptReference,
  checks: NoNetworkSafetyFixtureUpstreamEchoVerificationChecks,
): NoNetworkSafetyFixtureUpstreamEchoVerification {
  const record = {
    verificationMode: "no-network-safety-fixture-upstream-echo-verification-only" as const,
    sourceSpan: "Node v323 + Java v149 + mini-kv v141" as const,
    sourceContractDigest: sourceNodeV323.contractDigest,
    javaReady: javaV149.readyForNodeV324,
    miniKvReady: miniKvV141.readyForNodeV324,
    checks,
  };

  return {
    verificationDigest: sha256StableJson(record),
    verificationMode: record.verificationMode,
    sourceSpan: record.sourceSpan,
    sourceNodeV323Ready: sourceNodeV323.readyForNoNetworkSafetyFixtureContractIntake,
    javaV149EchoReady: javaV149.readyForNodeV324,
    miniKvV141ReceiptReady: miniKvV141.readyForNodeV324,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    noNetworkSafetyFixtureContractAligned: checks.noNetworkSafetyFixtureContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true,
    remainingPrerequisitesAfterV324: [
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ],
  };
}

function collectProductionBlockers(
  checks: NoNetworkSafetyFixtureUpstreamEchoVerificationChecks,
): NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV323Ready
        && checks.sourceNodeV323RequestsParallelEcho
        && checks.sourceNodeV323ContractComplete
        && checks.sourceNodeV323KeepsRuntimeBlocked
        && checks.sourceNodeV323KeepsSideEffectsClosed,
      code: "NODE_V323_SOURCE_NOT_READY",
      source: "node-v323-no-network-safety-fixture-contract-intake",
      message: "Node v323 must be ready, request Java v149 + mini-kv v141, and keep runtime/network side effects blocked.",
    },
    {
      condition:
        checks.javaV149EvidencePresent
        && checks.javaV149EchoesNodeV323Plan
        && checks.javaV149ReadyForNodeV324
        && checks.javaV149NoNetworkSafetyFixtureContractEchoed
        && checks.javaV149KeepsRuntimeBlocked,
      code: "JAVA_V149_ECHO_NOT_READY",
      source: "java-v149-no-network-safety-fixture-contract-echo",
      message: "Java v149 must read-only echo the Node v323 no-network safety fixture contract and stay non-executing.",
    },
    {
      condition:
        checks.miniKvV141EvidencePresent
        && checks.miniKvV141EchoesNodeV323Plan
        && checks.miniKvV141ReadyForNodeV324
        && checks.miniKvV141NoNetworkSafetyFixtureContractEchoed
        && checks.miniKvV141KeepsRuntimeBlocked,
      code: "MINI_KV_V141_RECEIPT_NOT_READY",
      source: "mini-kv-v141-no-network-safety-fixture-contract-non-participation",
      message: "mini-kv v141 must provide a non-participation receipt for the Node v323 no-network safety fixture contract.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.noNetworkSafetyFixtureContractAligned
        && checks.sideEffectBoundariesAligned,
      code: "UPSTREAM_ECHO_ALIGNMENT_FAILED",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification",
      message: "Node, Java, and mini-kv must agree on the v323 contract shape and closed network side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v324 read-only verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v324 read-only verification.",
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

function collectWarnings(): NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_DOES_NOT_CLOSE_ABORT_ROLLBACK",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification",
      message: "v324 verifies no-network safety fixture echo only; abort/rollback semantics remains a separate prerequisite.",
    },
    {
      code: "NO_NETWORK_SAFETY_FIXTURE_IS_NOT_CONNECTION_PERMISSION",
      severity: "warning",
      source: "node-v323-no-network-safety-fixture-contract-intake",
      message: "No-network fixture alignment still does not allow provider/client instantiation, raw endpoint parsing, or HTTP/TCP dialing.",
    },
  ];
}

function collectRecommendations(): NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V325_CLOSURE_REVIEW",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-upstream-echo-verification",
      message: "After v324 archive, run Node v325 to decide whether no-network-safety-fixture can be marked upstream-echo-complete.",
    },
    {
      code: "KEEP_ABORT_ROLLBACK_AS_SEPARATE_PREREQUISITE",
      severity: "recommendation",
      source: "node-v323-no-network-safety-fixture-contract-intake",
      message: "Do not merge abort/rollback semantics into no-network safety fixture; it needs its own contract and echo cycle.",
    },
  ];
}

function createSummary(
  sourceNodeV323: SourceNodeV323NoNetworkSafetyFixtureContractIntakeReference,
  checks: NoNetworkSafetyFixtureUpstreamEchoVerificationChecks,
  productionBlockers: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[],
  warnings: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[],
  recommendations: NoNetworkSafetyFixtureUpstreamEchoVerificationMessage[],
): NoNetworkSafetyFixtureUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredFieldCount: sourceNodeV323.noNetworkSafetyFixtureContract.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV323.noNetworkSafetyFixtureContract.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV323.noNetworkSafetyFixtureContract.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV323.noNetworkSafetyFixtureContract.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV323.noNetworkSafetyFixtureContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
