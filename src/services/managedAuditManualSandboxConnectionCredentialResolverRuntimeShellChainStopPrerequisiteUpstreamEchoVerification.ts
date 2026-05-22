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
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord.js";
import type {
  JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationProfile,
  MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference,
  RuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
  RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks,
  RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage,
  RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationSummary,
  SourceNodeV304StopPrerequisiteDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification";
const SOURCE_NODE_V304_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-or-prerequisite-decision-record";
const ACTIVE_PLAN = "docs/plans2/v303-post-decision-plan-intake-upstream-echo-roadmap.md";
const SUCCESSOR_PLAN = "docs/plans2/v305-post-stop-prerequisite-upstream-echo-roadmap.md";

const JAVA_V141_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoSupport.java";
const JAVA_V141_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverRuntimeShellStopPrerequisiteDecisionEchoTests.java";
const JAVA_V141_EXPLANATION = "D:/javaproj/advanced-order-platform/d/141/解释/说明.md";
const JAVA_V141_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/143-version-141-runtime-shell-stop-prerequisite-decision-echo.md";
const MINI_KV_V134_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-runtime-shell-chain-stop-or-prerequisite-non-participation-receipt.json";
const MINI_KV_V134_EXPLANATION = "D:/C/mini-kv/d/134/解释/说明.md";
const MINI_KV_V134_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/190-version-134-credential-resolver-runtime-shell-chain-stop-prerequisite-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerificationProfile {
  const sourceNodeV304 = createSourceNodeV304(input.config);
  const javaV141 = createJavaV141Reference();
  const miniKvV134 = createMiniKvV134Reference();
  const checks = createChecks(input.config, sourceNodeV304, javaV141, miniKvV134);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification
    ? "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV304, javaV141, miniKvV134, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV304, javaV141, miniKvV134, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell chain stop/prerequisite upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    runtimeShellChainDecision: "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    runtimeShellChainStopPrerequisiteUpstreamEchoVerificationOnly: true,
    consumesNodeV304StopPrerequisiteDecisionRecord: true,
    consumesJavaV141StopPrerequisiteDecisionEcho: true,
    consumesMiniKvV134StopPrerequisiteNonParticipationReceipt: true,
    activeNodeVerificationVersion: "Node v305",
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
    sourceNodeV304,
    upstreamEvidence: { javaV141, miniKvV134 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellChainStopPrerequisiteUpstreamEchoVerificationJson: ROUTE_PATH,
      runtimeShellChainStopPrerequisiteUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV304Json: SOURCE_NODE_V304_ROUTE,
      sourceNodeV304Markdown: `${SOURCE_NODE_V304_ROUTE}?format=markdown`,
      javaV141Support: JAVA_V141_SUPPORT,
      javaV141Test: JAVA_V141_TEST,
      javaV141Explanation: JAVA_V141_EXPLANATION,
      javaV141Walkthrough: JAVA_V141_WALKTHROUGH,
      miniKvV134Receipt: MINI_KV_V134_RECEIPT,
      miniKvV134Explanation: MINI_KV_V134_EXPLANATION,
      miniKvV134Walkthrough: MINI_KV_V134_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
      successorPlan: SUCCESSOR_PLAN,
    },
    nextActions: [
      "Archive Node v305 as the read-only upstream echo verification for Java v141 and mini-kv v134.",
      "Close the v303-derived plan because v303, v304, Java v141, mini-kv v134, and Node v305 are now consumed.",
      "Write a successor plan that either stops the runtime shell chain or names a concrete approval-prerequisite artifact before any implementation discussion.",
      "Keep credential values, raw endpoint URLs, provider clients, external requests, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV304(config: AppConfig): SourceNodeV304StopPrerequisiteDecisionRecordReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord({
    config,
  });

  return {
    sourceVersion: "Node v304",
    profileVersion: source.profileVersion,
    decisionRecordState: source.decisionRecordState,
    readyForDecisionRecord:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopOrPrerequisiteDecisionRecord,
    readOnlyDecisionRecord: source.readOnlyDecisionRecord,
    runtimeShellChainDecision: source.runtimeShellChainDecision,
    decisionDigest: source.decisionRecord.decisionDigest,
    sourceSpan: source.decisionRecord.sourceSpan,
    selectedPath: source.decisionRecord.selectedPath,
    stopRuntimeShellChainWithoutPrerequisites: source.decisionRecord.stopRuntimeShellChainWithoutPrerequisites,
    allowsParallelJavaV141MiniKvV134EchoRequest:
      source.decisionRecord.allowsParallelJavaV141MiniKvV134EchoRequest,
    readyForNodeV305BeforeUpstreamEcho: source.decisionRecord.allowsNodeV305BeforeUpstreamEcho,
    prerequisiteCount: source.decisionRecord.prerequisiteCount,
    missingRuntimePrerequisiteCount: source.decisionRecord.missingRuntimePrerequisiteCount,
    noGoConditionCount: source.decisionRecord.noGoConditionCount,
    necessityProofComplete: source.decisionRecord.necessityProof.proofComplete,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
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

function createJavaV141Reference(): JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v141-support", JAVA_V141_SUPPORT),
    evidenceFile("java-v141-test", JAVA_V141_TEST),
    evidenceFile("java-v141-explanation", JAVA_V141_EXPLANATION),
    evidenceFile("java-v141-walkthrough", JAVA_V141_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v141-version", JAVA_V141_SUPPORT, "java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only"),
    snippet("java-v141-node-v304", JAVA_V141_TEST, ".isEqualTo(\"Node v304\")"),
    snippet("java-v141-node-v305", JAVA_V141_TEST, ".isEqualTo(\"Node v305\")"),
    snippet("java-v141-profile", JAVA_V141_SUPPORT, PROFILE_VERSION),
    snippet("java-v141-source-span", JAVA_V141_TEST, "sourceSpan()).isEqualTo(\"Node v304\")"),
    snippet("java-v141-ready", JAVA_V141_TEST, "readyForNodeV305StopPrerequisiteUpstreamEchoVerification()).isTrue()"),
    snippet("java-v141-decision", JAVA_V141_SUPPORT, "require-explicit-approval-prerequisites-before-runtime-shell"),
    snippet("java-v141-prerequisites", JAVA_V141_TEST, "decisionRecord().prerequisiteCount()).isEqualTo(6)"),
    snippet("java-v141-no-go", JAVA_V141_SUPPORT, "decisionRecord.noGoConditionCount() == 8"),
    snippet("java-v141-proof", JAVA_V141_SUPPORT, "decisionRecord.necessityProof().proofComplete()"),
    snippet("java-v141-runtime-rejected", JAVA_V141_SUPPORT, "runtimeImplementationRejectedEchoed"),
    snippet("java-v141-no-runtime", JAVA_V141_SUPPORT, "noRuntimeImplementationEchoed"),
    snippet("java-v141-no-invocation", JAVA_V141_SUPPORT, "noRuntimeInvocationEchoed"),
    snippet("java-v141-no-credential", JAVA_V141_SUPPORT, "noCredentialReadEchoed"),
    snippet("java-v141-no-endpoint", JAVA_V141_SUPPORT, "noRawEndpointParseEchoed"),
    snippet("java-v141-no-provider", JAVA_V141_SUPPORT, "noProviderClientInstantiationEchoed"),
    snippet("java-v141-no-external", JAVA_V141_SUPPORT, "noExternalRequestEchoed"),
    snippet("java-v141-no-write", JAVA_V141_SUPPORT, "noWriteOrMigrationEchoed"),
    snippet("java-v141-no-minikv", JAVA_V141_SUPPORT, "noMiniKvWriteOrAuthorityEchoed"),
    snippet("java-v141-no-autostart", JAVA_V141_SUPPORT, "noAutoStartBoundaryEchoed"),
    snippet("java-v141-explanation", JAVA_V141_EXPLANATION, "只读 echo receipt"),
    snippet("java-v141-walkthrough", JAVA_V141_WALKTHROUGH, "Node v304"),
  ];

  return {
    sourceVersion: "Java v141",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-receipt.v1",
    echoMode: "java-v141-credential-resolver-runtime-shell-stop-prerequisite-decision-echo-only",
    sourceSpan: "Node v304",
    nextNodeVersion: "Node v305",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV304Decision:
      snippetMatched(expectedSnippets, "java-v141-node-v304")
      && snippetMatched(expectedSnippets, "java-v141-source-span")
      && snippetMatched(expectedSnippets, "java-v141-decision"),
    readyForNodeV305:
      snippetMatched(expectedSnippets, "java-v141-node-v305")
      && snippetMatched(expectedSnippets, "java-v141-ready"),
    prerequisiteCountEchoed: snippetMatched(expectedSnippets, "java-v141-prerequisites"),
    noGoConditionCountEchoed: snippetMatched(expectedSnippets, "java-v141-no-go"),
    necessityProofEchoed: snippetMatched(expectedSnippets, "java-v141-proof"),
    runtimeImplementationRejectedEchoed: snippetMatched(expectedSnippets, "java-v141-runtime-rejected"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v141-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v141-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v141-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v141-no-endpoint"),
    noProviderClientInstantiationEchoed: snippetMatched(expectedSnippets, "java-v141-no-provider"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v141-no-external"),
    noWriteOrMigrationEchoed: snippetMatched(expectedSnippets, "java-v141-no-write"),
    noMiniKvWriteOrAuthorityEchoed: snippetMatched(expectedSnippets, "java-v141-no-minikv"),
    noAutoStartBoundaryEchoed: snippetMatched(expectedSnippets, "java-v141-no-autostart"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v141-no-runtime")
      && snippetMatched(expectedSnippets, "java-v141-no-invocation")
      && snippetMatched(expectedSnippets, "java-v141-no-credential")
      && snippetMatched(expectedSnippets, "java-v141-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v141-no-provider")
      && snippetMatched(expectedSnippets, "java-v141-no-external")
      && snippetMatched(expectedSnippets, "java-v141-no-write")
      && snippetMatched(expectedSnippets, "java-v141-no-minikv")
      && snippetMatched(expectedSnippets, "java-v141-no-autostart"),
  };
}

function createMiniKvV134Reference(): MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v134-receipt", MINI_KV_V134_RECEIPT),
    evidenceFile("mini-kv-v134-explanation", MINI_KV_V134_EXPLANATION),
    evidenceFile("mini-kv-v134-walkthrough", MINI_KV_V134_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v134-consumer", MINI_KV_V134_RECEIPT, "Node v305 runtime shell chain stop/prerequisite upstream echo verification"),
    snippet("mini-kv-v134-node-v304", MINI_KV_V134_RECEIPT, "Node v304 runtime shell chain stop-or-prerequisite decision record"),
    snippet("mini-kv-v134-version", MINI_KV_V134_RECEIPT, "\"release_version\":\"v134\""),
    snippet("mini-kv-v134-decision", MINI_KV_V134_RECEIPT, "\"runtime_shell_chain_decision\":\"require-explicit-approval-prerequisites-before-runtime-shell\""),
    snippet("mini-kv-v134-selected", MINI_KV_V134_RECEIPT, "\"selected_path\":\"continue-only-as-blocked-prerequisite-review\""),
    snippet("mini-kv-v134-receipt-only", MINI_KV_V134_RECEIPT, "\"runtime_shell_chain_stop_or_prerequisite_non_participation_receipt_only\":true"),
    snippet("mini-kv-v134-ready", MINI_KV_V134_RECEIPT, "\"ready_for_node_v305_stop_prerequisite_upstream_echo_verification\":true"),
    snippet("mini-kv-v134-prerequisites", MINI_KV_V134_RECEIPT, "\"prerequisite_count\":6"),
    snippet("mini-kv-v134-no-go", MINI_KV_V134_RECEIPT, "\"no_go_condition_count\":8"),
    snippet("mini-kv-v134-no-runtime", MINI_KV_V134_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v134-no-invocation", MINI_KV_V134_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v134-no-credential", MINI_KV_V134_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v134-no-endpoint", MINI_KV_V134_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v134-no-external", MINI_KV_V134_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v134-no-ledger", MINI_KV_V134_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v134-no-restore", MINI_KV_V134_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v134-no-setnxex", MINI_KV_V134_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v134-not-authority", MINI_KV_V134_RECEIPT, "\"order_authoritative\":false"),
    snippet("mini-kv-v134-explanation", MINI_KV_V134_EXPLANATION, "CHECKJSON SMOKEJSON"),
    snippet("mini-kv-v134-walkthrough", MINI_KV_V134_WALKTHROUGH, "Node v305"),
  ];
  const parsed = readJsonObject(MINI_KV_V134_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_runtime_shell_chain_stop_or_prerequisite_non_participation_receipt");
  const nodeV304Reference = objectField(receipt, "source_node_v304_reference");

  return {
    sourceVersion: "mini-kv v134",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    echoesNodeV304Decision:
      stringField(receipt, "source_decision_record") === "Node v304 runtime shell chain stop-or-prerequisite decision record"
      && stringField(nodeV304Reference, "decision") === "require-explicit-approval-prerequisites-before-runtime-shell",
    readyForNodeV305:
      booleanField(receipt, "ready_for_node_v305_stop_prerequisite_upstream_echo_verification") === true,
    decisionRecordState: stringField(receipt, "decision_record_state"),
    runtimeShellChainDecision: stringField(receipt, "runtime_shell_chain_decision"),
    selectedPath: stringField(receipt, "selected_path"),
    prerequisiteCount: numberField(nodeV304Reference, "prerequisite_count"),
    missingRuntimePrerequisiteCount: numberField(nodeV304Reference, "missing_runtime_prerequisite_count"),
    noGoConditionCount: numberField(nodeV304Reference, "no_go_condition_count"),
    nonParticipationReceiptOnly:
      booleanField(receipt, "runtime_shell_chain_stop_or_prerequisite_non_participation_receipt_only") === true,
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    sideEffectBoundariesClosed:
      booleanField(receipt, "runtime_shell_implemented") === false
      && booleanField(receipt, "runtime_shell_invocation_allowed") === false
      && booleanField(receipt, "execution_allowed") === false
      && booleanField(receipt, "connects_managed_audit") === false
      && booleanField(receipt, "credential_value_read") === false
      && booleanField(receipt, "raw_endpoint_url_parsed") === false
      && booleanField(receipt, "external_request_sent") === false
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
  sourceNodeV304: SourceNodeV304StopPrerequisiteDecisionRecordReference,
  javaV141: JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference,
  miniKvV134: MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference,
): RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks {
  return {
    sourceNodeV304Ready: sourceNodeV304.readyForDecisionRecord,
    sourceNodeV304RequestsParallelEcho:
      sourceNodeV304.allowsParallelJavaV141MiniKvV134EchoRequest
      && sourceNodeV304.readyForNodeV305BeforeUpstreamEcho === false,
    sourceNodeV304KeepsRuntimeBlocked:
      sourceNodeV304.stopRuntimeShellChainWithoutPrerequisites
      && sourceNodeV304.runtimeShellImplemented === false
      && sourceNodeV304.runtimeShellInvocationAllowed === false,
    sourceNodeV304KeepsSideEffectsClosed:
      sourceNodeV304.executionAllowed === false
      && sourceNodeV304.connectsManagedAudit === false
      && sourceNodeV304.credentialValueRead === false
      && sourceNodeV304.rawEndpointUrlParsed === false
      && sourceNodeV304.externalRequestSent === false
      && sourceNodeV304.schemaMigrationExecuted === false
      && sourceNodeV304.approvalLedgerWritten === false
      && sourceNodeV304.automaticUpstreamStart === false,
    javaV141EvidencePresent: javaV141.evidencePresent && javaV141.verificationDocumented,
    javaV141EchoesNodeV304:
      javaV141.echoesNodeV304Decision
      && javaV141.prerequisiteCountEchoed
      && javaV141.noGoConditionCountEchoed
      && javaV141.necessityProofEchoed,
    javaV141ReadyForNodeV305: javaV141.readyForNodeV305,
    javaV141KeepsRuntimeBlocked:
      javaV141.runtimeImplementationRejectedEchoed
      && javaV141.noRuntimeImplementationEchoed
      && javaV141.noRuntimeInvocationEchoed
      && javaV141.sideEffectBoundariesClosed,
    miniKvV134EvidencePresent: miniKvV134.evidencePresent && miniKvV134.verificationDocumented,
    miniKvV134EchoesNodeV304:
      miniKvV134.echoesNodeV304Decision
      && miniKvV134.runtimeShellChainDecision === "require-explicit-approval-prerequisites-before-runtime-shell"
      && miniKvV134.selectedPath === "continue-only-as-blocked-prerequisite-review"
      && miniKvV134.prerequisiteCount === 6
      && miniKvV134.missingRuntimePrerequisiteCount === 6
      && miniKvV134.noGoConditionCount === 8,
    miniKvV134ReadyForNodeV305: miniKvV134.readyForNodeV305,
    miniKvV134KeepsRuntimeBlocked:
      miniKvV134.nonParticipationReceiptOnly
      && miniKvV134.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV141.echoesNodeV304Decision
      && javaV141.readyForNodeV305
      && miniKvV134.echoesNodeV304Decision
      && miniKvV134.readyForNodeV305,
    prerequisiteGateStillBlocked:
      sourceNodeV304.runtimeShellChainDecision === "require-explicit-approval-prerequisites-before-runtime-shell"
      && sourceNodeV304.prerequisiteCount === 6
      && sourceNodeV304.missingRuntimePrerequisiteCount === 6
      && sourceNodeV304.noGoConditionCount === 8
      && miniKvV134.prerequisiteCount === sourceNodeV304.prerequisiteCount
      && miniKvV134.missingRuntimePrerequisiteCount === sourceNodeV304.missingRuntimePrerequisiteCount
      && miniKvV134.noGoConditionCount === sourceNodeV304.noGoConditionCount,
    sideEffectBoundariesAligned:
      sourceNodeV304.executionAllowed === false
      && javaV141.sideEffectBoundariesClosed
      && miniKvV134.sideEffectBoundariesClosed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellChainStopPrerequisiteUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV304: SourceNodeV304StopPrerequisiteDecisionRecordReference,
  javaV141: JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference,
  miniKvV134: MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference,
  checks: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks,
  verificationState: string,
): RuntimeShellChainStopPrerequisiteUpstreamEchoVerification {
  const record = {
    verificationMode: "runtime-shell-chain-stop-prerequisite-upstream-echo-verification-only" as const,
    sourceSpan: "Node v304 + Java v141 + mini-kv v134" as const,
    sourceNodeV304Ready: checks.sourceNodeV304Ready,
    javaV141EchoReady: checks.javaV141EvidencePresent && checks.javaV141ReadyForNodeV305,
    miniKvV134ReceiptReady: checks.miniKvV134EvidencePresent && checks.miniKvV134ReadyForNodeV305,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    prerequisiteGateStillBlocked: checks.prerequisiteGateStillBlocked,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesAligned,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      nodeV304DecisionDigest: sourceNodeV304.decisionDigest,
      miniKvReceiptDigest: miniKvV134.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks,
): RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV304Ready && checks.sourceNodeV304RequestsParallelEcho,
      code: "NODE_V304_DECISION_NOT_READY",
      source: "node-v304-runtime-shell-chain-stop-prerequisite-decision-record",
      message: "Node v304 stop/prerequisite decision record must be ready and request Java v141 + mini-kv v134 echo before v305.",
    },
    {
      condition: checks.sourceNodeV304KeepsRuntimeBlocked && checks.sourceNodeV304KeepsSideEffectsClosed,
      code: "NODE_V304_BOUNDARY_OPEN",
      source: "node-v304-runtime-shell-chain-stop-prerequisite-decision-record",
      message: "Node v304 must keep runtime shell and side-effect boundaries closed.",
    },
    {
      condition: checks.javaV141EvidencePresent && checks.javaV141EchoesNodeV304 && checks.javaV141ReadyForNodeV305,
      code: "JAVA_V141_ECHO_NOT_READY",
      source: "java-v141-runtime-shell-stop-prerequisite-decision-echo",
      message: "Java v141 evidence must echo Node v304 and mark itself ready for Node v305 verification.",
    },
    {
      condition: checks.miniKvV134EvidencePresent && checks.miniKvV134EchoesNodeV304 && checks.miniKvV134ReadyForNodeV305,
      code: "MINI_KV_V134_RECEIPT_NOT_READY",
      source: "mini-kv-v134-runtime-shell-stop-prerequisite-non-participation",
      message: "mini-kv v134 evidence must echo Node v304 and mark itself ready for Node v305 verification.",
    },
    {
      condition:
        checks.upstreamEchoesAligned
        && checks.prerequisiteGateStillBlocked
        && checks.sideEffectBoundariesAligned
        && checks.javaV141KeepsRuntimeBlocked
        && checks.miniKvV134KeepsRuntimeBlocked,
      code: "UPSTREAM_STOP_PREREQUISITE_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification",
      message: "Java v141 and mini-kv v134 must both echo the Node v304 prerequisite-gated blocked decision without opening side effects.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v305 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v305 upstream echo verification.",
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

function collectWarnings(): RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification",
      message: "v305 proves Java v141 and mini-kv v134 echoed the blocked prerequisite decision; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "CLOSE_V303_DERIVED_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification",
      message: "Close the v303-derived plan after v305 because its planned versions have all been consumed.",
    },
    {
      code: "REQUIRE_APPROVAL_PREREQUISITE_ARTIFACT_BEFORE_NEXT_RUNTIME_SHELL_STEP",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-chain-stop-prerequisite-upstream-echo-verification",
      message: "The next plan should either stop the runtime shell chain or define a concrete approval-prerequisite artifact; do not add another echo without a new artifact consumer.",
    },
  ];
}

function createSummary(
  sourceNodeV304: SourceNodeV304StopPrerequisiteDecisionRecordReference,
  javaV141: JavaV141RuntimeShellStopPrerequisiteDecisionEchoReference,
  miniKvV134: MiniKvV134RuntimeShellStopPrerequisiteNonParticipationReceiptReference,
  checks: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationChecks,
  productionBlockers: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[],
  warnings: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[],
  recommendations: RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationMessage[],
): RuntimeShellChainStopPrerequisiteUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV304CheckCount: sourceNodeV304.checkCount,
    sourceNodeV304PassedCheckCount: sourceNodeV304.passedCheckCount,
    javaEvidenceFileCount: javaV141.evidenceFiles.length,
    javaMatchedSnippetCount: javaV141.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV134.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV134.expectedSnippets.filter((expected) => expected.matched).length,
    prerequisiteCount: sourceNodeV304.prerequisiteCount,
    missingRuntimePrerequisiteCount: sourceNodeV304.missingRuntimePrerequisiteCount,
    noGoConditionCount: sourceNodeV304.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
