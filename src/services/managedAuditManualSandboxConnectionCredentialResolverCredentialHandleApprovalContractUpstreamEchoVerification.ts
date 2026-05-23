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
  loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake.js";
import type {
  CredentialHandleApprovalContractUpstreamEchoVerification,
  CredentialHandleApprovalContractUpstreamEchoVerificationChecks,
  CredentialHandleApprovalContractUpstreamEchoVerificationMessage,
  CredentialHandleApprovalContractUpstreamEchoVerificationSummary,
  JavaV146CredentialHandleApprovalContractIntakeEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile,
  MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference,
  SourceNodeV317CredentialHandleApprovalContractIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification";
const SOURCE_NODE_V317_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake";
const ACTIVE_PLAN = "docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md";

const JAVA_V146_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoSupport.java";
const JAVA_V146_CATALOG =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.java";
const JAVA_V146_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialHandleApprovalContractEchoTests.java";
const JAVA_V146_EXPLANATION = "D:/javaproj/advanced-order-platform/d/146/解释/说明.md";
const JAVA_V146_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/148-version-146-credential-handle-approval-contract-echo.md";
const MINI_KV_V139_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-credential-handle-approval-contract-non-participation-receipt.json";
const MINI_KV_V139_EXPLANATION = "D:/C/mini-kv/d/139/解释/说明.md";
const MINI_KV_V139_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/195-version-139-credential-resolver-credential-handle-approval-contract-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerificationProfile {
  const sourceNodeV317 = createSourceNodeV317(input.config);
  const javaV146 = createJavaV146Reference(sourceNodeV317);
  const miniKvV139 = createMiniKvV139Reference(sourceNodeV317);
  const checks = createChecks(input.config, sourceNodeV317, javaV146, miniKvV139);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification
    ? "credential-handle-approval-contract-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV317, javaV146, miniKvV139, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV317, javaV146, miniKvV139, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver credential handle approval contract upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    credentialHandleApprovalContractUpstreamEchoVerificationOnly: true,
    consumesNodeV317CredentialHandleApprovalContractIntake: true,
    consumesJavaV146CredentialHandleApprovalContractIntakeEcho: true,
    consumesMiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v318",
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
    sourceNodeV317,
    upstreamEvidence: { javaV146, miniKvV139 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      credentialHandleApprovalContractUpstreamEchoVerificationJson: ROUTE_PATH,
      credentialHandleApprovalContractUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV317Json: SOURCE_NODE_V317_ROUTE,
      sourceNodeV317Markdown: `${SOURCE_NODE_V317_ROUTE}?format=markdown`,
      javaV146Support: JAVA_V146_SUPPORT,
      javaV146Catalog: JAVA_V146_CATALOG,
      javaV146Test: JAVA_V146_TEST,
      javaV146Explanation: JAVA_V146_EXPLANATION,
      javaV146Walkthrough: JAVA_V146_WALKTHROUGH,
      miniKvV139Receipt: MINI_KV_V139_RECEIPT,
      miniKvV139Explanation: MINI_KV_V139_EXPLANATION,
      miniKvV139Walkthrough: MINI_KV_V139_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v318 as the read-only verification that Java v146 and mini-kv v139 echoed the Node v317 credential handle approval contract.",
      "Keep disabled runtime shell implementation and invocation blocked after v318; this version only proves the credential handle contract was echoed upstream.",
      "The next plan should review whether credential-handle-approval can move from contract-intake-defined to upstream-echo-complete before any next prerequisite starts.",
    ],
  };
}

function createSourceNodeV317(config: AppConfig): SourceNodeV317CredentialHandleApprovalContractIntakeReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake({
    config,
  });

  return {
    sourceVersion: "Node v317",
    profileVersion: source.profileVersion,
    contractState: source.contractState,
    readyForCredentialHandleApprovalContractIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake,
    targetPrerequisiteId: source.targetPrerequisiteId,
    contractDigest: source.credentialHandleApprovalContract.contractDigest,
    credentialHandleApprovalContract: source.credentialHandleApprovalContract,
    prerequisiteTransition: source.prerequisiteTransition,
    checks: source.checks,
    summary: source.summary,
    nextJavaVersion: source.nextJavaVersion,
    nextMiniKvVersion: source.nextMiniKvVersion,
    nextNodeVerificationVersion: source.nextNodeVerificationVersion,
    readyForParallelJavaV146MiniKvV139Echo: source.readyForParallelJavaV146MiniKvV139Echo,
    requiredFieldIds: source.credentialHandleApprovalContract.requiredFields.map((field) => field.id),
    prohibitedFieldIds: source.credentialHandleApprovalContract.prohibitedFields.map((field) => field.id),
    rejectionReasonCodes: source.credentialHandleApprovalContract.rejectionReasons.map((reason) => reason.code),
    noGoBoundaryIds: source.credentialHandleApprovalContract.noGoBoundaries.map((boundary) => boundary.id),
    upstreamEchoRequestVersions: source.credentialHandleApprovalContract.upstreamEchoRequests.map((request) => request.version),
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

function createJavaV146Reference(
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference,
): JavaV146CredentialHandleApprovalContractIntakeEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v146-support", JAVA_V146_SUPPORT),
    evidenceFile("java-v146-catalog", JAVA_V146_CATALOG),
    evidenceFile("java-v146-test", JAVA_V146_TEST),
    evidenceFile("java-v146-explanation", JAVA_V146_EXPLANATION),
    evidenceFile("java-v146-walkthrough", JAVA_V146_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v146-version", JAVA_V146_SUPPORT, "java-v146-credential-handle-approval-contract-echo-only"),
    snippet("java-v146-node-v317", JAVA_V146_TEST, ".isEqualTo(\"Node v317\")"),
    snippet("java-v146-node-v318", JAVA_V146_TEST, ".isEqualTo(\"Node v318\")"),
    snippet("java-v146-upstream-profile", JAVA_V146_SUPPORT, PROFILE_VERSION),
    snippet("java-v146-plan-profile", JAVA_V146_TEST, sourceNodeV317.profileVersion),
    snippet("java-v146-plan-route", JAVA_V146_TEST, SOURCE_NODE_V317_ROUTE),
    snippet("java-v146-plan-state", JAVA_V146_TEST, sourceNodeV317.contractState),
    snippet("java-v146-ready", JAVA_V146_TEST, "readyForNodeV318CredentialHandleApprovalContractUpstreamEchoVerification()).isTrue()"),
    snippet("java-v146-source-span", JAVA_V146_SUPPORT, "\"Node v317 + Java v145\""),
    snippet("java-v146-required-count", JAVA_V146_TEST, "summary().requiredFieldCount()).isEqualTo(10)"),
    snippet("java-v146-prohibited-count", JAVA_V146_TEST, "summary().prohibitedFieldCount()).isEqualTo(8)"),
    snippet("java-v146-rejection-count", JAVA_V146_TEST, "summary().rejectionReasonCount()).isEqualTo(5)"),
    snippet("java-v146-no-go-count", JAVA_V146_TEST, "summary().noGoBoundaryCount()).isEqualTo(9)"),
    snippet("java-v146-contract-digest", JAVA_V146_TEST, sourceNodeV317.contractDigest),
    snippet("java-v146-required-field", JAVA_V146_TEST, "\"credential_handle\""),
    snippet("java-v146-prohibited-field", JAVA_V146_TEST, "\"credential_value\""),
    snippet("java-v146-rejection-reason", JAVA_V146_TEST, "\"CREDENTIAL_HANDLE_MISSING\""),
    snippet("java-v146-no-go-boundary", JAVA_V146_TEST, "\"automatic_upstream_start\""),
    snippet("java-v146-parallel", JAVA_V146_TEST, ".containsExactly(\"Java v146\", \"mini-kv v139\")"),
    snippet("java-v146-necessity", JAVA_V146_TEST, "Java v146 + mini-kv v139, then Node v318"),
    snippet("java-v146-no-runtime", JAVA_V146_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v146-no-invocation", JAVA_V146_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v146-no-credential", JAVA_V146_SUPPORT, "noCredentialValueReadEchoed"),
    snippet("java-v146-no-authority", JAVA_V146_SUPPORT, "noCredentialAuthorityClaimedEchoed"),
    snippet("java-v146-no-endpoint", JAVA_V146_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v146-no-provider", JAVA_V146_SUPPORT, "noProviderClientInstantiationEchoed"),
    snippet("java-v146-no-external", JAVA_V146_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v146-no-write", JAVA_V146_SUPPORT, "noLedgerSqlDeploymentRollbackEchoed"),
    snippet("java-v146-no-autostart", JAVA_V146_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v146-explanation", JAVA_V146_EXPLANATION, "v146"),
    snippet("java-v146-walkthrough", JAVA_V146_WALKTHROUGH, "Node v318"),
  ];

  return {
    sourceVersion: "Java v146",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-credential-handle-approval-contract-echo-receipt.v1",
    echoMode: "java-v146-credential-handle-approval-contract-echo-only",
    sourceSpan: "Node v317",
    nextNodeVersion: "Node v318",
    expectedProfileVersion: PROFILE_VERSION,
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV317Plan:
      snippetMatched(expectedSnippets, "java-v146-node-v317")
      && snippetMatched(expectedSnippets, "java-v146-plan-profile")
      && snippetMatched(expectedSnippets, "java-v146-plan-route")
      && snippetMatched(expectedSnippets, "java-v146-plan-state"),
    readyForNodeV318:
      snippetMatched(expectedSnippets, "java-v146-node-v318")
      && snippetMatched(expectedSnippets, "java-v146-upstream-profile")
      && snippetMatched(expectedSnippets, "java-v146-ready"),
    credentialHandleContractEchoed:
      snippetMatched(expectedSnippets, "java-v146-required-field")
      && snippetMatched(expectedSnippets, "java-v146-prohibited-field")
      && snippetMatched(expectedSnippets, "java-v146-rejection-reason")
      && snippetMatched(expectedSnippets, "java-v146-no-go-boundary")
      && snippetMatched(expectedSnippets, "java-v146-contract-digest"),
    requiredFieldCountEchoed: snippetMatched(expectedSnippets, "java-v146-required-count"),
    prohibitedFieldCountEchoed: snippetMatched(expectedSnippets, "java-v146-prohibited-count"),
    rejectionReasonCountEchoed: snippetMatched(expectedSnippets, "java-v146-rejection-count"),
    noGoBoundaryCountEchoed: snippetMatched(expectedSnippets, "java-v146-no-go-count"),
    upstreamEchoRequestsEchoed: snippetMatched(expectedSnippets, "java-v146-parallel"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v146-necessity"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v146-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v146-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v146-no-credential"),
    noCredentialAuthorityClaimedEchoed: snippetMatched(expectedSnippets, "java-v146-no-authority"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v146-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v146-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v146-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v146-no-write"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v146-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v146-no-runtime")
      && snippetMatched(expectedSnippets, "java-v146-no-invocation")
      && snippetMatched(expectedSnippets, "java-v146-no-credential")
      && snippetMatched(expectedSnippets, "java-v146-no-authority")
      && snippetMatched(expectedSnippets, "java-v146-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v146-no-provider")
      && snippetMatched(expectedSnippets, "java-v146-no-external")
      && snippetMatched(expectedSnippets, "java-v146-no-write")
      && snippetMatched(expectedSnippets, "java-v146-no-autostart"),
  };
}

function createMiniKvV139Reference(
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference,
): MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v139-receipt", MINI_KV_V139_RECEIPT),
    evidenceFile("mini-kv-v139-explanation", MINI_KV_V139_EXPLANATION),
    evidenceFile("mini-kv-v139-walkthrough", MINI_KV_V139_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v139-consumer", MINI_KV_V139_RECEIPT, "Node v318 credential-handle approval contract upstream echo verification"),
    snippet("mini-kv-v139-source-node-v317", MINI_KV_V139_RECEIPT, "\"source_version\":\"Node v317\""),
    snippet("mini-kv-v139-plan-profile", MINI_KV_V139_RECEIPT, sourceNodeV317.profileVersion),
    snippet("mini-kv-v139-contract-state", MINI_KV_V139_RECEIPT, sourceNodeV317.contractState),
    snippet("mini-kv-v139-contract-digest", MINI_KV_V139_RECEIPT, sourceNodeV317.contractDigest),
    snippet("mini-kv-v139-ready", MINI_KV_V139_RECEIPT, "\"ready_for_node_v318_credential_handle_approval_contract_upstream_echo_verification\":true"),
    snippet("mini-kv-v139-counts", MINI_KV_V139_RECEIPT, "\"required_field_count\":10"),
    snippet("mini-kv-v139-prohibited", MINI_KV_V139_RECEIPT, "\"prohibited_field_count\":8"),
    snippet("mini-kv-v139-rejections", MINI_KV_V139_RECEIPT, "\"rejection_reason_count\":5"),
    snippet("mini-kv-v139-no-go", MINI_KV_V139_RECEIPT, "\"no_go_boundary_count\":9"),
    snippet("mini-kv-v139-receipt-only", MINI_KV_V139_RECEIPT, "\"credential_handle_approval_contract_non_participation_receipt_only\":true"),
    snippet("mini-kv-v139-read-only", MINI_KV_V139_RECEIPT, "\"read_only_credential_handle_contract\":true"),
    snippet("mini-kv-v139-no-runtime", MINI_KV_V139_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v139-no-invocation", MINI_KV_V139_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v139-no-credential", MINI_KV_V139_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v139-no-handle-store", MINI_KV_V139_RECEIPT, "\"credential_handle_stored\":false"),
    snippet("mini-kv-v139-no-handle-resolve", MINI_KV_V139_RECEIPT, "\"credential_handle_resolved\":false"),
    snippet("mini-kv-v139-no-endpoint", MINI_KV_V139_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v139-no-provider", MINI_KV_V139_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v139-no-external", MINI_KV_V139_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v139-no-ledger", MINI_KV_V139_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v139-no-restore", MINI_KV_V139_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v139-no-setnxex", MINI_KV_V139_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v139-not-authority", MINI_KV_V139_RECEIPT, "\"order_authoritative\":false"),
    snippet("mini-kv-v139-explanation", MINI_KV_V139_EXPLANATION, "v139"),
    snippet("mini-kv-v139-walkthrough", MINI_KV_V139_WALKTHROUGH, "Node v318"),
  ];
  const parsed = readJsonObject(MINI_KV_V139_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_credential_handle_approval_contract_non_participation_receipt");
  const sourceNodeV317Reference = objectField(receipt, "source_node_v317_reference");
  const credentialHandleApprovalContract = objectField(sourceNodeV317Reference, "credential_handle_approval_contract");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v139",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV317Plan:
      stringField(sourceNodeV317Reference, "source_version") === "Node v317"
      && stringField(sourceNodeV317Reference, "profile_version") === sourceNodeV317.profileVersion
      && stringField(sourceNodeV317Reference, "contract_state") === sourceNodeV317.contractState
      && stringField(credentialHandleApprovalContract, "contract_digest") === sourceNodeV317.contractDigest,
    readyForNodeV318:
      booleanField(receipt, "ready_for_node_v318_credential_handle_approval_contract_upstream_echo_verification") === true,
    sourceNodeV317ProfileVersion: stringField(sourceNodeV317Reference, "profile_version"),
    sourceNodeV317ContractState: stringField(sourceNodeV317Reference, "contract_state"),
    sourceNodeV317ContractDigest: stringField(credentialHandleApprovalContract, "contract_digest"),
    requiredFieldCount: numberField(credentialHandleApprovalContract, "required_field_count"),
    prohibitedFieldCount: numberField(credentialHandleApprovalContract, "prohibited_field_count"),
    rejectionReasonCount: numberField(credentialHandleApprovalContract, "rejection_reason_count"),
    noGoBoundaryCount: numberField(credentialHandleApprovalContract, "no_go_boundary_count"),
    upstreamEchoRequestCount: numberField(credentialHandleApprovalContract, "upstream_echo_request_count"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "credential_handle_approval_contract_non_participation_receipt_only") === true,
    credentialHandleApprovalContractIntakeOnly:
      booleanField(receipt, "credential_handle_approval_contract_intake_only") === true,
    readOnlyCredentialHandleContract: booleanField(receipt, "read_only_credential_handle_contract") === true,
    consumesNodeV317CredentialHandleApprovalContractIntake:
      booleanField(receipt, "consumes_node_v317_credential_handle_approval_contract_intake") === true,
    consumesNodeV316SignedHumanApprovalArtifactPrerequisiteClosureReview:
      booleanField(receipt, "consumes_node_v316_signed_human_approval_artifact_prerequisite_closure_review") === true,
    consumesNodeV313PrerequisiteCatalog:
      booleanField(receipt, "consumes_node_v313_prerequisite_catalog") === true,
    readyForNodeV318BeforeUpstreamEcho: booleanField(receipt, "ready_for_node_v318_before_upstream_echo"),
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    credentialValueAccepted: booleanField(receipt, "credential_value_accepted"),
    credentialHandleStored: booleanField(receipt, "credential_handle_stored"),
    credentialHandleValidated: booleanField(receipt, "credential_handle_validated"),
    credentialHandleResolved: booleanField(receipt, "credential_handle_resolved"),
    credentialHandleAuthoritative: booleanField(receipt, "credential_handle_authoritative"),
    credentialApprovalStatusAuthoritative: booleanField(receipt, "credential_approval_status_authoritative"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlAccepted: booleanField(receipt, "raw_endpoint_url_accepted"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    fakeSecretProviderInstantiated: booleanField(receipt, "fake_secret_provider_instantiated"),
    fakeResolverClientInstantiated: booleanField(receipt, "fake_resolver_client_instantiated"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    sideEffectBoundariesClosed:
      booleanField(checks, "runtime_shell_implementation_still_blocked") === true
      && booleanField(checks, "production_audit_still_blocked") === true
      && booleanField(checks, "production_window_still_blocked") === true
      && booleanField(receipt, "runtime_shell_implemented") === false
      && booleanField(receipt, "runtime_shell_invocation_allowed") === false
      && booleanField(receipt, "execution_allowed") === false
      && booleanField(receipt, "connects_managed_audit") === false
      && booleanField(receipt, "credential_value_read") === false
      && booleanField(receipt, "credential_value_accepted") === false
      && booleanField(receipt, "raw_endpoint_url_parsed") === false
      && booleanField(receipt, "raw_endpoint_url_accepted") === false
      && booleanField(receipt, "external_request_sent") === false
      && booleanField(receipt, "secret_provider_instantiated") === false
      && booleanField(receipt, "resolver_client_instantiated") === false
      && booleanField(receipt, "fake_secret_provider_instantiated") === false
      && booleanField(receipt, "fake_resolver_client_instantiated") === false
      && booleanField(receipt, "schema_migration_executed") === false
      && booleanField(receipt, "approval_ledger_written") === false
      && booleanField(receipt, "automatic_upstream_start") === false
      && booleanField(receipt, "load_restore_compact_executed") === false
      && booleanField(receipt, "setnxex_execution_allowed") === false
      && booleanField(receipt, "audit_authoritative") === false
      && booleanField(receipt, "order_authoritative") === false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference,
  javaV146: JavaV146CredentialHandleApprovalContractIntakeEchoReference,
  miniKvV139: MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference,
): CredentialHandleApprovalContractUpstreamEchoVerificationChecks {
  return {
    sourceNodeV317Ready: sourceNodeV317.readyForCredentialHandleApprovalContractIntake,
    sourceNodeV317RequestsParallelEcho:
      sourceNodeV317.readyForParallelJavaV146MiniKvV139Echo
      && sourceNodeV317.nextJavaVersion === "Java v146"
      && sourceNodeV317.nextMiniKvVersion === "mini-kv v139"
      && sourceNodeV317.nextNodeVerificationVersion === "Node v318",
    sourceNodeV317ContractComplete:
      sourceNodeV317.credentialHandleApprovalContract.requiredFieldCount === 10
      && sourceNodeV317.credentialHandleApprovalContract.prohibitedFieldCount === 8
      && sourceNodeV317.credentialHandleApprovalContract.rejectionReasonCount === 5
      && sourceNodeV317.credentialHandleApprovalContract.noGoBoundaryCount === 9
      && sourceNodeV317.upstreamEchoRequestVersions.includes("Java v146")
      && sourceNodeV317.upstreamEchoRequestVersions.includes("mini-kv v139"),
    sourceNodeV317KeepsRuntimeBlocked:
      sourceNodeV317.runtimeShellImplemented === false
      && sourceNodeV317.runtimeShellInvocationAllowed === false
      && sourceNodeV317.executionAllowed === false,
    sourceNodeV317KeepsSideEffectsClosed:
      sourceNodeV317.connectsManagedAudit === false
      && sourceNodeV317.credentialValueRead === false
      && sourceNodeV317.rawEndpointUrlParsed === false
      && sourceNodeV317.externalRequestSent === false
      && sourceNodeV317.schemaMigrationExecuted === false
      && sourceNodeV317.approvalLedgerWritten === false
      && sourceNodeV317.automaticUpstreamStart === false,
    javaV146EvidencePresent: javaV146.evidencePresent && javaV146.verificationDocumented,
    javaV146EchoesNodeV317Plan: javaV146.echoesNodeV317Plan,
    javaV146ReadyForNodeV318: javaV146.readyForNodeV318,
    javaV146CredentialHandleContractEchoed:
      javaV146.credentialHandleContractEchoed
      && javaV146.requiredFieldCountEchoed
      && javaV146.prohibitedFieldCountEchoed
      && javaV146.rejectionReasonCountEchoed
      && javaV146.noGoBoundaryCountEchoed
      && javaV146.upstreamEchoRequestsEchoed
      && javaV146.necessityProofEchoed,
    javaV146KeepsRuntimeBlocked: javaV146.sideEffectBoundariesClosed,
    miniKvV139EvidencePresent: miniKvV139.evidencePresent && miniKvV139.verificationDocumented,
    miniKvV139EchoesNodeV317Plan: miniKvV139.echoesNodeV317Plan,
    miniKvV139ReadyForNodeV318: miniKvV139.readyForNodeV318,
    miniKvV139CredentialHandleContractEchoed:
      miniKvV139.requiredFieldCount === sourceNodeV317.credentialHandleApprovalContract.requiredFieldCount
      && miniKvV139.prohibitedFieldCount === sourceNodeV317.credentialHandleApprovalContract.prohibitedFieldCount
      && miniKvV139.rejectionReasonCount === sourceNodeV317.credentialHandleApprovalContract.rejectionReasonCount
      && miniKvV139.noGoBoundaryCount === sourceNodeV317.credentialHandleApprovalContract.noGoBoundaryCount
      && miniKvV139.upstreamEchoRequestCount === sourceNodeV317.credentialHandleApprovalContract.upstreamEchoRequests.length
      && miniKvV139.credentialHandleApprovalContractIntakeOnly
      && miniKvV139.readOnlyCredentialHandleContract,
    miniKvV139KeepsRuntimeBlocked:
      miniKvV139.nonParticipationReceiptOnly
      && miniKvV139.readyForNodeV318BeforeUpstreamEcho === false
      && miniKvV139.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV146.echoesNodeV317Plan
      && javaV146.readyForNodeV318
      && miniKvV139.echoesNodeV317Plan
      && miniKvV139.readyForNodeV318,
    credentialHandleContractAligned:
      javaV146.credentialHandleContractEchoed
      && miniKvV139.sourceNodeV317ContractDigest === sourceNodeV317.contractDigest
      && miniKvV139.requiredFieldCount === sourceNodeV317.credentialHandleApprovalContract.requiredFieldCount
      && miniKvV139.prohibitedFieldCount === sourceNodeV317.credentialHandleApprovalContract.prohibitedFieldCount
      && miniKvV139.rejectionReasonCount === sourceNodeV317.credentialHandleApprovalContract.rejectionReasonCount
      && miniKvV139.noGoBoundaryCount === sourceNodeV317.credentialHandleApprovalContract.noGoBoundaryCount,
    sideEffectBoundariesAligned:
      sourceNodeV317.executionAllowed === false
      && javaV146.sideEffectBoundariesClosed
      && miniKvV139.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference,
  javaV146: JavaV146CredentialHandleApprovalContractIntakeEchoReference,
  miniKvV139: MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference,
  checks: CredentialHandleApprovalContractUpstreamEchoVerificationChecks,
  verificationState: string,
): CredentialHandleApprovalContractUpstreamEchoVerification {
  const record = {
    verificationMode: "credential-handle-approval-contract-upstream-echo-verification-only" as const,
    sourceSpan: "Node v317 + Java v146 + mini-kv v139" as const,
    sourceNodeV317Ready: checks.sourceNodeV317Ready,
    javaV146EchoReady: checks.javaV146EvidencePresent && checks.javaV146ReadyForNodeV318,
    miniKvV139ReceiptReady: checks.miniKvV139EvidencePresent && checks.miniKvV139ReadyForNodeV318,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    credentialHandleContractAligned: checks.credentialHandleContractAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceNodeV317ContractDigest: sourceNodeV317.contractDigest,
      javaEvidenceDigest: javaV146.evidenceFiles.map((file) => file.digest),
      miniKvReceiptDigest: miniKvV139.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: CredentialHandleApprovalContractUpstreamEchoVerificationChecks,
): CredentialHandleApprovalContractUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialHandleApprovalContractUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV317Ready
        && checks.sourceNodeV317RequestsParallelEcho
        && checks.sourceNodeV317ContractComplete,
      code: "NODE_V317_CONTRACT_INTAKE_NOT_READY",
      source: "node-v317-credential-handle-approval-contract-intake",
      message: "Node v317 must define the complete credential handle contract and explicitly request Java v146 + mini-kv v139 echo before v318.",
    },
    {
      condition: checks.sourceNodeV317KeepsRuntimeBlocked && checks.sourceNodeV317KeepsSideEffectsClosed,
      code: "NODE_V317_BOUNDARY_OPEN",
      source: "node-v317-credential-handle-approval-contract-intake",
      message: "Node v317 must keep runtime shell, credential, endpoint, network, write, schema, and auto-start boundaries closed.",
    },
    {
      condition:
        checks.javaV146EvidencePresent
        && checks.javaV146EchoesNodeV317Plan
        && checks.javaV146ReadyForNodeV318
        && checks.javaV146CredentialHandleContractEchoed,
      code: "JAVA_V146_ECHO_NOT_READY",
      source: "java-v146-credential-handle-approval-contract-echo",
      message: "Java v146 evidence must echo Node v317's credential handle contract and mark itself ready for Node v318 verification.",
    },
    {
      condition:
        checks.miniKvV139EvidencePresent
        && checks.miniKvV139EchoesNodeV317Plan
        && checks.miniKvV139ReadyForNodeV318
        && checks.miniKvV139CredentialHandleContractEchoed,
      code: "MINI_KV_V139_RECEIPT_NOT_READY",
      source: "mini-kv-v139-credential-handle-approval-contract-non-participation",
      message: "mini-kv v139 evidence must echo Node v317's credential handle contract and mark itself ready for Node v318 verification.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.credentialHandleContractAligned
        && checks.sideEffectBoundariesAligned
        && checks.javaV146KeepsRuntimeBlocked
        && checks.miniKvV139KeepsRuntimeBlocked,
      code: "CREDENTIAL_HANDLE_APPROVAL_CONTRACT_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification",
      message: "Java v146 and mini-kv v139 must both echo the Node v317 credential handle approval contract without opening runtime or side-effect boundaries.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v318 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v318 upstream echo verification.",
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

function collectWarnings(): CredentialHandleApprovalContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification",
      message: "v318 proves Java v146 and mini-kv v139 echoed the Node v317 credential handle contract; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): CredentialHandleApprovalContractUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_NEXT_HUMAN_SUPPLIED_APPROVAL_ARTIFACT_REVIEW_PACKET",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification",
      message: "The next Node step may define how a human-supplied approval credential handle is reviewed, but must still reject credential values and raw endpoint URLs.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_BLOCKED_AFTER_ECHO_ALIGNMENT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification",
      message: "Do not convert upstream echo alignment into implementation permission; require a separate credential handle review packet and explicit approval gates.",
    },
  ];
}

function createSummary(
  sourceNodeV317: SourceNodeV317CredentialHandleApprovalContractIntakeReference,
  javaV146: JavaV146CredentialHandleApprovalContractIntakeEchoReference,
  miniKvV139: MiniKvV139CredentialHandleApprovalContractIntakeNonParticipationReceiptReference,
  checks: CredentialHandleApprovalContractUpstreamEchoVerificationChecks,
  productionBlockers: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[],
  warnings: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[],
  recommendations: CredentialHandleApprovalContractUpstreamEchoVerificationMessage[],
): CredentialHandleApprovalContractUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV317CheckCount: sourceNodeV317.summary.checkCount,
    sourceNodeV317PassedCheckCount: sourceNodeV317.summary.passedCheckCount,
    javaEvidenceFileCount: javaV146.evidenceFiles.length,
    javaMatchedSnippetCount: javaV146.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV139.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV139.expectedSnippets.filter((expected) => expected.matched).length,
    requiredFieldCount: sourceNodeV317.credentialHandleApprovalContract.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV317.credentialHandleApprovalContract.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV317.credentialHandleApprovalContract.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV317.credentialHandleApprovalContract.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV317.credentialHandleApprovalContract.upstreamEchoRequests.length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}




