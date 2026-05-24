import type { AppConfig } from "../config.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake.js";
import type {
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks,
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage,
  EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary,
  JavaV147EndpointHandleAllowlistApprovalContractEchoReference,
  JavaV148QualitySplitReference,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationProfile,
  MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference,
  SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification";
const SOURCE_NODE_V320_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-intake";
const ACTIVE_PLAN = "docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md";

const JAVA_V147_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoSupport.java";
const JAVA_V147_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceEndpointHandleAllowlistApprovalContractEchoTests.java";
const JAVA_V147_EXPLANATION = "D:/javaproj/advanced-order-platform/d/147/解释/说明.md";
const JAVA_V147_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/149-version-147-endpoint-handle-allowlist-approval-contract-echo.md";
const JAVA_V148_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/150-version-148-sandbox-connection-response-records-split.md";
const MINI_KV_V140_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-endpoint-handle-allowlist-approval-contract-non-participation-receipt.json";
const MINI_KV_V140_EXPLANATION = "D:/C/mini-kv/d/140/解释/说明.md";
const MINI_KV_V140_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/196-version-140-credential-resolver-endpoint-handle-allowlist-approval-contract-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerificationProfile {
  const sourceNodeV320 = createSourceNodeV320(input.config);
  const javaV147 = createJavaV147Reference(sourceNodeV320);
  const miniKvV140 = createMiniKvV140Reference(sourceNodeV320);
  const javaV148QualitySplit = createJavaV148QualitySplitReference();
  const checks = createChecks(input.config, sourceNodeV320, javaV147, miniKvV140, javaV148QualitySplit);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification
      ? "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-ready"
      : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV320, javaV147, miniKvV140, checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV320, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval contract upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-remaining-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    endpointHandleAllowlistApprovalContractUpstreamEchoVerificationOnly: true,
    consumesNodeV320EndpointHandleAllowlistApprovalContractIntake: true,
    consumesJavaV147EndpointHandleAllowlistApprovalContractEcho: true,
    consumesMiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceipt: true,
    observesJavaV148QualitySplit: true,
    activeNodeVerificationVersion: "Node v321",
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
    sourceNodeV320,
    upstreamEvidence: { javaV147, miniKvV140, javaV148QualitySplit },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      endpointHandleAllowlistApprovalContractUpstreamEchoVerificationJson: ROUTE_PATH,
      endpointHandleAllowlistApprovalContractUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV320Json: SOURCE_NODE_V320_ROUTE,
      sourceNodeV320Markdown: `${SOURCE_NODE_V320_ROUTE}?format=markdown`,
      javaV147Support: JAVA_V147_SUPPORT,
      javaV147Test: JAVA_V147_TEST,
      javaV147Explanation: JAVA_V147_EXPLANATION,
      javaV147Walkthrough: JAVA_V147_WALKTHROUGH,
      javaV148QualityWalkthrough: JAVA_V148_WALKTHROUGH,
      miniKvV140Receipt: MINI_KV_V140_RECEIPT,
      miniKvV140Explanation: MINI_KV_V140_EXPLANATION,
      miniKvV140Walkthrough: MINI_KV_V140_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v321 as the read-only verification that Java v147 and mini-kv v140 echoed the Node v320 endpoint-handle allowlist contract.",
      "Keep endpoint-handle-allowlist-approval open for Node v322 closure review; v321 only proves upstream echo alignment.",
      "Do not parse raw endpoint URLs, instantiate providers or clients, send HTTP/TCP, write approval ledgers, execute SQL, or invoke runtime shell behavior.",
      "After v321, decide whether endpoint-handle-allowlist-approval can move to contract-intake-and-upstream-echo-complete while no-network safety and abort/rollback remain separate prerequisites.",
    ],
  };
}

function createSourceNodeV320(config: AppConfig): SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake({
    config,
  });
  const contract = source.endpointHandleAllowlistApprovalContract;

  return {
    sourceVersion: "Node v320",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForEndpointHandleAllowlistApprovalContractIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractIntake,
    targetPrerequisiteId: source.targetPrerequisiteId,
    contractDigest: contract.contractDigest,
    endpointHandleAllowlistApprovalContract: contract,
    prerequisiteTransition: source.prerequisiteTransition,
    checks: source.checks,
    summary: source.summary,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV147MiniKvV140Echo: source.readyForParallelJavaV147MiniKvV140Echo,
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
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV147Reference(
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
): JavaV147EndpointHandleAllowlistApprovalContractEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v147-support", JAVA_V147_SUPPORT),
    evidenceFile("java-v147-test", JAVA_V147_TEST),
    evidenceFile("java-v147-explanation", JAVA_V147_EXPLANATION),
    evidenceFile("java-v147-walkthrough", JAVA_V147_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v147-mode", JAVA_V147_TEST, "java-v147-endpoint-handle-allowlist-approval-contract-echo-only"),
    snippet("java-v147-node-v320", JAVA_V147_TEST, "Node v320"),
    snippet("java-v147-node-v321", JAVA_V147_TEST, "Node v321"),
    snippet("java-v147-profile", JAVA_V147_TEST, sourceNodeV320.profileVersion),
    snippet("java-v147-route", JAVA_V147_TEST, SOURCE_NODE_V320_ROUTE),
    snippet("java-v147-state", JAVA_V147_TEST, sourceNodeV320.contractState),
    snippet("java-v147-ready", JAVA_V147_TEST, "readyForNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification()).isTrue()"),
    snippet("java-v147-contract-digest", JAVA_V147_TEST, sourceNodeV320.contractDigest),
    snippet("java-v147-required-count", JAVA_V147_TEST, "summary().requiredFieldCount()).isEqualTo(10)"),
    snippet("java-v147-prohibited-count", JAVA_V147_TEST, "summary().prohibitedFieldCount()).isEqualTo(8)"),
    snippet("java-v147-rejection-count", JAVA_V147_TEST, "summary().rejectionReasonCount()).isEqualTo(5)"),
    snippet("java-v147-no-go-count", JAVA_V147_TEST, "summary().noGoBoundaryCount()).isEqualTo(9)"),
    snippet("java-v147-required-field", JAVA_V147_TEST, "\"endpoint_handle\""),
    snippet("java-v147-prohibited-field", JAVA_V147_TEST, "\"raw_endpoint_url\""),
    snippet("java-v147-rejection-reason", JAVA_V147_TEST, "\"RAW_ENDPOINT_URL_PRESENT\""),
    snippet("java-v147-no-go-boundary", JAVA_V147_TEST, "\"runtime_shell_invocation\""),
    snippet("java-v147-parallel", JAVA_V147_TEST, ".containsExactly(\"Java v147\", \"mini-kv v140\")"),
    snippet("java-v147-necessity", JAVA_V147_TEST, "Java v147 + mini-kv v140, then Node v321"),
    snippet("java-v147-no-credential", JAVA_V147_TEST, "credentialValueRead()).isFalse()"),
    snippet("java-v147-no-authority", JAVA_V147_TEST, "endpointHandleAuthorityClaimedByJava()).isFalse()"),
    snippet("java-v147-no-provider", JAVA_V147_TEST, "secretProviderInstantiated()).isFalse()"),
    snippet("java-v147-no-client", JAVA_V147_TEST, "resolverClientInstantiated()).isFalse()"),
    snippet("java-v147-no-write", JAVA_V147_TEST, "approvalLedgerWritten()).isFalse()"),
    snippet("java-v147-schema", JAVA_V147_TEST, "java-release-approval-rehearsal-response-schema.v48"),
    snippet("java-v147-explanation", JAVA_V147_EXPLANATION, "ready for Node v321"),
    snippet("java-v147-walkthrough", JAVA_V147_WALKTHROUGH, "without turning the contract into runtime behavior"),
  ];

  return {
    sourceVersion: "Java v147",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-endpoint-handle-allowlist-approval-contract-echo-receipt.v1",
    echoMode: "java-v147-endpoint-handle-allowlist-approval-contract-echo-only",
    sourceSpan: "Node v320",
    nextNodeVersion: "Node v321",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV320Plan:
      snippetMatched(expectedSnippets, "java-v147-node-v320")
      && snippetMatched(expectedSnippets, "java-v147-profile")
      && snippetMatched(expectedSnippets, "java-v147-route")
      && snippetMatched(expectedSnippets, "java-v147-state"),
    readyForNodeV321:
      snippetMatched(expectedSnippets, "java-v147-node-v321")
      && snippetMatched(expectedSnippets, "java-v147-ready"),
    endpointHandleAllowlistContractEchoed:
      snippetMatched(expectedSnippets, "java-v147-contract-digest")
      && snippetMatched(expectedSnippets, "java-v147-required-field")
      && snippetMatched(expectedSnippets, "java-v147-prohibited-field")
      && snippetMatched(expectedSnippets, "java-v147-rejection-reason")
      && snippetMatched(expectedSnippets, "java-v147-no-go-boundary"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v147-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v147-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v147-rejection-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v147-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v147-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v147-necessity"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v147-no-credential")
      && snippetMatched(expectedSnippets, "java-v147-no-authority")
      && snippetMatched(expectedSnippets, "java-v147-no-provider")
      && snippetMatched(expectedSnippets, "java-v147-no-client")
      && snippetMatched(expectedSnippets, "java-v147-no-write"),
  };
}

function createMiniKvV140Reference(
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
): MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v140-receipt", MINI_KV_V140_RECEIPT),
    evidenceFile("mini-kv-v140-explanation", MINI_KV_V140_EXPLANATION),
    evidenceFile("mini-kv-v140-walkthrough", MINI_KV_V140_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v140-receipt-version", MINI_KV_V140_RECEIPT, "mini-kv-credential-resolver-endpoint-handle-allowlist-approval-contract-non-participation-receipt.v1"),
    snippet("mini-kv-v140-node-v320", MINI_KV_V140_RECEIPT, "Node v320 endpoint-handle allowlist approval contract intake"),
    snippet("mini-kv-v140-node-v321", MINI_KV_V140_RECEIPT, "Node v321 endpoint-handle allowlist approval contract upstream echo verification"),
    snippet("mini-kv-v140-contract-digest", MINI_KV_V140_RECEIPT, sourceNodeV320.contractDigest),
    snippet("mini-kv-v140-required-field", MINI_KV_V140_RECEIPT, "\"endpoint_handle\""),
    snippet("mini-kv-v140-prohibited-field", MINI_KV_V140_RECEIPT, "\"raw_endpoint_url\""),
    snippet("mini-kv-v140-boundary", MINI_KV_V140_RECEIPT, "\"endpoint_allowlist_authority\":false"),
    snippet("mini-kv-v140-explanation", MINI_KV_V140_EXPLANATION, "真实 CLI smoke"),
    snippet("mini-kv-v140-walkthrough", MINI_KV_V140_WALKTHROUGH, "不把自己变成 endpoint 存储方"),
  ];
  const root = readJsonObject(MINI_KV_V140_RECEIPT);
  const receipt = objectField(root, "credential_resolver_endpoint_handle_allowlist_approval_contract_non_participation_receipt");
  const sourceNode = objectField(receipt, "source_node_v320_reference");
  const contract = objectField(sourceNode, "endpoint_handle_allowlist_approval_contract");

  const reference = {
    sourceVersion: "mini-kv v140" as const,
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    sourceNodeV320ContractDigest: stringField(contract, "contract_digest"),
    echoesNodeV320Plan:
      stringField(sourceNode, "profile_version") === sourceNodeV320.profileVersion
      && stringField(sourceNode, "contract_state") === sourceNodeV320.contractState
      && stringField(sourceNode, "target_prerequisite_id") === sourceNodeV320.targetPrerequisiteId,
    readyForNodeV321:
      stringField(root, "consumer_hint") === "Node v321 endpoint-handle allowlist approval contract upstream echo verification"
      && booleanField(receipt, "ready_for_node_v321_endpoint_handle_allowlist_approval_contract_upstream_echo_verification") === true,
    requiredFieldCount: numberField(contract, "required_field_count"),
    prohibitedFieldCount: numberField(contract, "prohibited_field_count"),
    rejectionReasonCount: numberField(contract, "rejection_reason_count"),
    noGoBoundaryCount: numberField(contract, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(contract, "upstream_echo_request_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "endpoint_handle_allowlist_approval_contract_non_participation_receipt_only") === true,
    readOnlyEndpointHandleAllowlistContract:
      booleanField(receipt, "read_only_endpoint_handle_allowlist_contract") === true,
    consumesNodeV320EndpointHandleAllowlistApprovalContractIntake:
      booleanField(receipt, "consumes_node_v320_endpoint_handle_allowlist_approval_contract_intake") === true,
    readyForNodeV321BeforeUpstreamEcho:
      booleanField(receipt, "ready_for_node_v321_before_upstream_echo") === true,
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented") === true,
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed") === true,
    executionAllowed: booleanField(receipt, "execution_allowed") === true,
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit") === true,
    credentialValueRead: booleanField(receipt, "credential_value_read") === true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") === true,
    externalRequestSent: booleanField(receipt, "external_request_sent") === true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") === true,
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated") === true,
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed") === true,
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written") === true,
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start") === true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") === true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") === true,
    endpointAuthorityClaimed: booleanField(receipt, "endpoint_handle_authoritative") === true,
    endpointAllowlistAuthority: booleanField(receipt, "endpoint_allowlist_authority") === true,
    auditAuthoritative: booleanField(receipt, "audit_authoritative") === true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") === true,
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
      && reference.secretProviderInstantiated === false
      && reference.resolverClientInstantiated === false
      && reference.schemaMigrationExecuted === false
      && reference.approvalLedgerWritten === false
      && reference.automaticUpstreamStart === false
      && reference.loadRestoreCompactExecuted === false
      && reference.setnxexExecutionAllowed === false
      && reference.endpointAuthorityClaimed === false
      && reference.endpointAllowlistAuthority === false
      && reference.auditAuthoritative === false
      && reference.orderAuthoritative === false,
  };
}

function createJavaV148QualitySplitReference(): JavaV148QualitySplitReference {
  return {
    sourceVersion: "Java v148",
    purpose: "quality-only-response-records-split",
    evidencePresent: evidenceFile("java-v148-walkthrough", JAVA_V148_WALKTHROUGH).exists,
    note:
      "Java v148 is recorded as a quality optimization after v147; Node v321 consumes Java v147 for echo semantics and treats v148 as non-blocking quality evidence.",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
  javaV147: JavaV147EndpointHandleAllowlistApprovalContractEchoReference,
  miniKvV140: MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference,
  javaV148QualitySplit: JavaV148QualitySplitReference,
): EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks {
  return {
    sourceNodeV320Ready: sourceNodeV320.readyForEndpointHandleAllowlistApprovalContractIntake,
    sourceNodeV320RequestsParallelEcho:
      sourceNodeV320.nextJavaVersion === "Java v147"
      && sourceNodeV320.nextMiniKvVersion === "mini-kv v140"
      && sourceNodeV320.nextNodeVerificationVersion === "Node v321"
      && sourceNodeV320.readyForParallelJavaV147MiniKvV140Echo,
    sourceNodeV320ContractComplete:
      sourceNodeV320.contractDigest.length === 64
      && sourceNodeV320.requiredFieldIds.length === 10
      && sourceNodeV320.prohibitedFieldIds.length === 8
      && sourceNodeV320.rejectionReasonCodes.length === 5
      && sourceNodeV320.noGoBoundaryIds.length === 9,
    sourceNodeV320KeepsRuntimeBlocked:
      sourceNodeV320.runtimeShellImplemented === false
      && sourceNodeV320.runtimeShellInvocationAllowed === false,
    sourceNodeV320KeepsSideEffectsClosed:
      sourceNodeV320.executionAllowed === false
      && sourceNodeV320.connectsManagedAudit === false
      && sourceNodeV320.credentialValueRead === false
      && sourceNodeV320.rawEndpointUrlParsed === false
      && sourceNodeV320.externalRequestSent === false
      && sourceNodeV320.schemaMigrationExecuted === false
      && sourceNodeV320.approvalLedgerWritten === false
      && sourceNodeV320.automaticUpstreamStart === false,
    javaV147EvidencePresent: javaV147.evidencePresent,
    javaV147EchoesNodeV320Plan: javaV147.echoesNodeV320Plan,
    javaV147ReadyForNodeV321: javaV147.readyForNodeV321,
    javaV147EndpointHandleAllowlistContractEchoed: javaV147.endpointHandleAllowlistContractEchoed,
    javaV147KeepsRuntimeBlocked: javaV147.sideEffectBoundariesClosed,
    miniKvV140EvidencePresent: miniKvV140.evidencePresent,
    miniKvV140EchoesNodeV320Plan: miniKvV140.echoesNodeV320Plan,
    miniKvV140ReadyForNodeV321: miniKvV140.readyForNodeV321,
    miniKvV140EndpointHandleAllowlistContractEchoed:
      miniKvV140.sourceNodeV320ContractDigest === sourceNodeV320.contractDigest
      && miniKvV140.requiredFieldCount === 10
      && miniKvV140.prohibitedFieldCount === 8
      && miniKvV140.rejectionReasonCount === 5
      && miniKvV140.noGoBoundaryCount === 9
      && miniKvV140.upstreamEchoRequestCount === 2,
    miniKvV140KeepsRuntimeBlocked: miniKvV140.sideEffectBoundariesClosed,
    javaV148QualitySplitObserved: javaV148QualitySplit.evidencePresent,
    upstreamEchoesAligned:
      javaV147.readyForNodeV321
      && miniKvV140.readyForNodeV321
      && javaV147.upstreamEchoRequestsEchoed,
    endpointHandleAllowlistContractAligned:
      javaV147.endpointHandleAllowlistContractEchoed
      && miniKvV140.sourceNodeV320ContractDigest === sourceNodeV320.contractDigest,
    sideEffectBoundariesAligned:
      javaV147.sideEffectBoundariesClosed
      && miniKvV140.sideEffectBoundariesClosed
      && sourceNodeV320.executionAllowed === false,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification:
      false,
  };
}

function createEchoVerification(
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
  javaV147: JavaV147EndpointHandleAllowlistApprovalContractEchoReference,
  miniKvV140: MiniKvV140EndpointHandleAllowlistApprovalContractNonParticipationReceiptReference,
  checks: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks,
): EndpointHandleAllowlistApprovalContractUpstreamEchoVerification {
  const record = {
    verificationMode: "endpoint-handle-allowlist-approval-contract-upstream-echo-verification-only" as const,
    sourceSpan: "Node v320 + Java v147 + mini-kv v140" as const,
    sourceContractDigest: sourceNodeV320.contractDigest,
    javaReady: javaV147.readyForNodeV321,
    miniKvReady: miniKvV140.readyForNodeV321,
    checks,
  };

  return {
    verificationDigest: sha256StableJson(record),
    verificationMode: record.verificationMode,
    sourceSpan: record.sourceSpan,
    sourceNodeV320Ready: sourceNodeV320.readyForEndpointHandleAllowlistApprovalContractIntake,
    javaV147EchoReady: javaV147.readyForNodeV321,
    miniKvV140ReceiptReady: miniKvV140.readyForNodeV321,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    endpointHandleAllowlistContractAligned: checks.endpointHandleAllowlistContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true,
    remainingPrerequisitesAfterV321: [
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
    ],
  };
}

function collectProductionBlockers(
  checks: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks,
): EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV320Ready
        && checks.sourceNodeV320RequestsParallelEcho
        && checks.sourceNodeV320ContractComplete
        && checks.sourceNodeV320KeepsRuntimeBlocked
        && checks.sourceNodeV320KeepsSideEffectsClosed,
      code: "NODE_V320_SOURCE_NOT_READY",
      source: "node-v320-endpoint-handle-allowlist-approval-contract-intake",
      message: "Node v320 must be ready, request Java v147 + mini-kv v140, and keep runtime and side effects blocked.",
    },
    {
      condition:
        checks.javaV147EvidencePresent
        && checks.javaV147EchoesNodeV320Plan
        && checks.javaV147ReadyForNodeV321
        && checks.javaV147EndpointHandleAllowlistContractEchoed
        && checks.javaV147KeepsRuntimeBlocked,
      code: "JAVA_V147_ECHO_NOT_READY",
      source: "java-v147-endpoint-handle-allowlist-approval-contract-echo",
      message: "Java v147 must read-only echo the Node v320 endpoint-handle allowlist contract and stay non-executing.",
    },
    {
      condition:
        checks.miniKvV140EvidencePresent
        && checks.miniKvV140EchoesNodeV320Plan
        && checks.miniKvV140ReadyForNodeV321
        && checks.miniKvV140EndpointHandleAllowlistContractEchoed
        && checks.miniKvV140KeepsRuntimeBlocked,
      code: "MINI_KV_V140_RECEIPT_NOT_READY",
      source: "mini-kv-v140-endpoint-handle-allowlist-approval-contract-non-participation",
      message: "mini-kv v140 must provide a non-participation receipt for the Node v320 endpoint-handle allowlist contract.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.endpointHandleAllowlistContractAligned
        && checks.sideEffectBoundariesAligned,
      code: "UPSTREAM_ECHO_ALIGNMENT_FAILED",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification",
      message: "Node, Java, and mini-kv must agree on the v320 contract shape and the blocked side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v321 read-only verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v321 read-only verification.",
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

function collectWarnings(): EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_DOES_NOT_CLOSE_ALL_REMAINING_PREREQUISITES",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification",
      message: "v321 verifies endpoint-handle allowlist echo only; no-network safety and abort/rollback semantics remain separate prerequisites.",
    },
    {
      code: "ENDPOINT_HANDLE_ALLOWLIST_APPROVAL_IS_NOT_CONNECTION_PERMISSION",
      severity: "warning",
      source: "node-v320-endpoint-handle-allowlist-approval-contract-intake",
      message: "Endpoint-handle allowlist approval still does not allow raw endpoint parsing, provider/client instantiation, or HTTP/TCP dialing.",
    },
  ];
}

function collectRecommendations(): EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V322_CLOSURE_REVIEW",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification",
      message: "After v321 archive, run Node v322 to decide whether endpoint-handle-allowlist-approval can be marked upstream-echo-complete.",
    },
    {
      code: "KEEP_JAVA_V148_AS_QUALITY_EVIDENCE_ONLY",
      severity: "recommendation",
      source: "java-v147-endpoint-handle-allowlist-approval-contract-echo",
      message: "Java v148 is useful quality evidence, but it should not alter v321 echo semantics or unlock any runtime behavior.",
    },
  ];
}

function createSummary(
  sourceNodeV320: SourceNodeV320EndpointHandleAllowlistApprovalContractIntakeReference,
  checks: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationChecks,
  productionBlockers: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[],
  warnings: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[],
  recommendations: EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationMessage[],
): EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredFieldCount: sourceNodeV320.endpointHandleAllowlistApprovalContract.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV320.endpointHandleAllowlistApprovalContract.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV320.endpointHandleAllowlistApprovalContract.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV320.endpointHandleAllowlistApprovalContract.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV320.endpointHandleAllowlistApprovalContract.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
