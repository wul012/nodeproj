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
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord.js";
import type {
  JavaV135RuntimeShellDecisionRecordEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationProfile,
  MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference,
  RuntimeShellDecisionRecordUpstreamEchoVerification,
  RuntimeShellDecisionRecordUpstreamEchoVerificationChecks,
  RuntimeShellDecisionRecordUpstreamEchoVerificationMessage,
  RuntimeShellDecisionRecordUpstreamEchoVerificationSummary,
  SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification";
const SOURCE_NODE_V299_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record";
const ACTIVE_PLAN = "docs/plans2/v299-post-runtime-shell-candidate-gate-decision-roadmap.md";
const NEXT_PLAN = "docs/plans2/v300-post-runtime-shell-decision-record-upstream-echo-roadmap.md";

const JAVA_V135_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverRuntimeShellDecisionRecordEchoSupport.java";
const JAVA_V135_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverRuntimeShellDecisionRecordEchoTests.java";
const JAVA_V135_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/137-version-135-runtime-shell-decision-record-echo.md";
const MINI_KV_V132_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-runtime-shell-decision-record-non-participation-receipt.json";
const MINI_KV_V132_EXPLANATION = "D:/C/mini-kv/d/132/解释/说明.md";
const MINI_KV_V132_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/188-version-132-credential-resolver-runtime-shell-decision-record-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerificationProfile {
  const sourceNodeV299 = createSourceNodeV299(input.config);
  const javaV135 = createJavaV135Reference();
  const miniKvV132 = createMiniKvV132Reference();
  const checks = createChecks(input.config, sourceNodeV299, javaV135, miniKvV132);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification
    ? "runtime-shell-decision-record-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = createEchoVerification(sourceNodeV299, javaV135, miniKvV132, checks, verificationState);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV299, javaV135, miniKvV132, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver runtime shell decision record upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    runtimeShellDecisionRecordUpstreamEchoVerificationOnly: true,
    consumesNodeV299RuntimeShellCandidateGateDecisionRecord: true,
    consumesJavaV135RuntimeShellDecisionRecordEcho: true,
    consumesMiniKvV132RuntimeShellDecisionRecordNonParticipationReceipt: true,
    readyForPostRuntimeShellDecisionPlan:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification,
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
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
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
    sourceNodeV299,
    upstreamEvidence: { javaV135, miniKvV132 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeShellDecisionRecordUpstreamEchoVerificationJson: ROUTE_PATH,
      runtimeShellDecisionRecordUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV299Json: SOURCE_NODE_V299_ROUTE,
      sourceNodeV299Markdown: `${SOURCE_NODE_V299_ROUTE}?format=markdown`,
      javaV135Support: JAVA_V135_SUPPORT,
      javaV135Test: JAVA_V135_TEST,
      javaV135Walkthrough: JAVA_V135_WALKTHROUGH,
      miniKvV132Receipt: MINI_KV_V132_RECEIPT,
      miniKvV132Explanation: MINI_KV_V132_EXPLANATION,
      miniKvV132Walkthrough: MINI_KV_V132_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v300 as the read-only upstream echo verification for Java v135 and mini-kv v132.",
      "Write the next plan as a post-decision plan; do not silently turn upstream echo readiness into runtime implementation approval.",
      "Keep credential values, raw endpoint URLs, provider clients, external requests, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV299(config: AppConfig): SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord({
    config,
  });

  return {
    sourceVersion: "Node v299",
    profileVersion: source.profileVersion,
    decisionRecordState: source.decisionRecordState,
    runtimeShellDecision: source.runtimeShellDecision,
    readyForDecisionRecord:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellCandidateGateDecisionRecord,
    readOnlyDecisionRecord: source.readOnlyDecisionRecord,
    runtimeShellCandidateGateDecisionRecordOnly: source.runtimeShellCandidateGateDecisionRecordOnly,
    consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification:
      source.consumesNodeV298RuntimeShellCandidateGateUpstreamEchoVerification,
    readyForParallelJavaV135MiniKvV132EchoRequest: source.readyForParallelJavaV135MiniKvV132EchoRequest,
    readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification:
      source.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification,
    decisionDigest: source.decisionRecord.decisionDigest,
    decisionSourceSpan: source.decisionRecord.sourceSpan,
    upstreamEchoVerified: source.decisionRecord.upstreamEchoVerified,
    requiredEvidenceCount: source.decisionRecord.requiredEvidenceCount,
    missingRequiredEvidenceCount: source.summary.missingRequiredEvidenceCount,
    noGoConditionCount: source.decisionRecord.noGoConditionCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellEnabled: source.runtimeShellEnabled,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    credentialValueProvided: source.credentialValueProvided,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlRendered: source.rawEndpointUrlRendered,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    fakeSecretProviderInstantiated: source.fakeSecretProviderInstantiated,
    fakeResolverClientInstantiated: source.fakeResolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV135Reference(): JavaV135RuntimeShellDecisionRecordEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v135-support", JAVA_V135_SUPPORT),
    evidenceFile("java-v135-test", JAVA_V135_TEST),
    evidenceFile("java-v135-walkthrough", JAVA_V135_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v135-version", JAVA_V135_SUPPORT, "java-v135-credential-resolver-runtime-shell-decision-record-echo-only"),
    snippet("java-v135-next-node", JAVA_V135_TEST, "Node v300"),
    snippet("java-v135-profile", JAVA_V135_TEST, PROFILE_VERSION),
    snippet("java-v135-source-node", JAVA_V135_TEST, "Node v299"),
    snippet("java-v135-decision-blocked", JAVA_V135_TEST, "decision()).isEqualTo(\"blocked\")"),
    snippet("java-v135-required-evidence", JAVA_V135_TEST, "requiredEvidenceCount()).isEqualTo(4)"),
    snippet("java-v135-no-go", JAVA_V135_TEST, "noGoConditionCount()).isEqualTo(6)"),
    snippet("java-v135-no-runtime", JAVA_V135_SUPPORT, "allowsDisabledRuntimeShellImplementation=false"),
    snippet("java-v135-no-invocation", JAVA_V135_SUPPORT, "allowsDisabledRuntimeShellInvocation=false"),
    snippet("java-v135-no-credential", JAVA_V135_SUPPORT, "allowsCredentialValueRead=false"),
    snippet("java-v135-no-endpoint", JAVA_V135_SUPPORT, "allowsRawEndpointUrlParse=false"),
    snippet("java-v135-no-external", JAVA_V135_SUPPORT, "allowsExternalRequest=false"),
    snippet("java-v135-no-ledger", JAVA_V135_SUPPORT, "allowsApprovalLedgerWrite=false"),
    snippet("java-v135-ready", JAVA_V135_TEST, "readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification()).isTrue()"),
    snippet("java-v135-walkthrough", JAVA_V135_WALKTHROUGH, "给后续 Node v300 做 upstream echo verification 使用"),
  ];

  return {
    sourceVersion: "Java v135",
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-runtime-shell-decision-record-echo-receipt.v1",
    echoMode: "java-v135-credential-resolver-runtime-shell-decision-record-echo-only",
    sourceSpan: "Node v299",
    nextNodeVersion: "Node v300",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    readyForNodeV300: snippetMatched(expectedSnippets, "java-v135-ready"),
    echoesNodeV299DecisionRecord:
      snippetMatched(expectedSnippets, "java-v135-source-node") && snippetMatched(expectedSnippets, "java-v135-profile"),
    blockedDecisionEchoed: snippetMatched(expectedSnippets, "java-v135-decision-blocked"),
    requiredEvidenceEchoed: snippetMatched(expectedSnippets, "java-v135-required-evidence"),
    noGoConditionsEchoed: snippetMatched(expectedSnippets, "java-v135-no-go"),
    noRuntimeImplementationEchoed: snippetMatched(expectedSnippets, "java-v135-no-runtime"),
    noRuntimeInvocationEchoed: snippetMatched(expectedSnippets, "java-v135-no-invocation"),
    noCredentialReadEchoed: snippetMatched(expectedSnippets, "java-v135-no-credential"),
    noRawEndpointParseEchoed: snippetMatched(expectedSnippets, "java-v135-no-endpoint"),
    noExternalRequestEchoed: snippetMatched(expectedSnippets, "java-v135-no-external"),
    noLedgerOrSchemaWriteEchoed: snippetMatched(expectedSnippets, "java-v135-no-ledger"),
    sideEffectBoundariesClosed:
      snippetMatched(expectedSnippets, "java-v135-no-runtime")
      && snippetMatched(expectedSnippets, "java-v135-no-invocation")
      && snippetMatched(expectedSnippets, "java-v135-no-credential")
      && snippetMatched(expectedSnippets, "java-v135-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v135-no-external")
      && snippetMatched(expectedSnippets, "java-v135-no-ledger"),
  };
}

function createMiniKvV132Reference(): MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v132-receipt", MINI_KV_V132_RECEIPT),
    evidenceFile("mini-kv-v132-explanation", MINI_KV_V132_EXPLANATION),
    evidenceFile("mini-kv-v132-walkthrough", MINI_KV_V132_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v132-node-v300", MINI_KV_V132_RECEIPT, "Node v300 runtime shell decision record upstream echo verification"),
    snippet("mini-kv-v132-node-v299", MINI_KV_V132_RECEIPT, "Node v299 credential resolver runtime shell candidate gate decision record"),
    snippet("mini-kv-v132-version", MINI_KV_V132_RECEIPT, "\"release_version\":\"v132\""),
    snippet("mini-kv-v132-decision-blocked", MINI_KV_V132_RECEIPT, "\"runtime_shell_decision\":\"blocked\""),
    snippet("mini-kv-v132-receipt-only", MINI_KV_V132_RECEIPT, "\"runtime_shell_decision_record_non_participation_receipt_only\":true"),
    snippet("mini-kv-v132-ready", MINI_KV_V132_RECEIPT, "\"ready_for_node_v300_runtime_shell_decision_record_upstream_echo_verification\":true"),
    snippet("mini-kv-v132-no-runtime", MINI_KV_V132_RECEIPT, "\"runtime_shell_implemented\":false"),
    snippet("mini-kv-v132-no-invocation", MINI_KV_V132_RECEIPT, "\"runtime_shell_invocation_allowed\":false"),
    snippet("mini-kv-v132-no-credential", MINI_KV_V132_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v132-no-endpoint", MINI_KV_V132_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v132-no-external", MINI_KV_V132_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v132-no-ledger", MINI_KV_V132_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v132-no-restore", MINI_KV_V132_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v132-explanation", MINI_KV_V132_EXPLANATION, "不实现、不启用、不调用 runtime shell"),
    snippet("mini-kv-v132-walkthrough", MINI_KV_V132_WALKTHROUGH, "gives Node v300 a clean mini-kv echo"),
  ];
  const parsed = readJsonObject(MINI_KV_V132_RECEIPT);
  const receipt = objectField(parsed, "credential_resolver_runtime_shell_decision_record_non_participation_receipt");

  return {
    sourceVersion: "mini-kv v132",
    receiptVersion: stringField(parsed, "receipt_version"),
    releaseVersion: stringField(parsed, "release_version"),
    consumerHint: stringField(parsed, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((expected) => expected.matched),
    readyForNodeV300: booleanField(receipt, "ready_for_node_v300_runtime_shell_decision_record_upstream_echo_verification") === true,
    echoesNodeV299DecisionRecord:
      stringField(receipt, "source_decision_record") === "Node v299 credential resolver runtime shell candidate gate decision record",
    blockedDecisionEchoed: stringField(receipt, "runtime_shell_decision") === "blocked",
    runtimeShellDecisionRecordOnly: booleanField(receipt, "runtime_shell_decision_record_non_participation_receipt_only") === true,
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
      && booleanField(receipt, "setnxex_execution_allowed") === false,
  };
}

function createEchoVerification(
  sourceNodeV299: SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference,
  javaV135: JavaV135RuntimeShellDecisionRecordEchoReference,
  miniKvV132: MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference,
  checks: RuntimeShellDecisionRecordUpstreamEchoVerificationChecks,
  verificationState: string,
): RuntimeShellDecisionRecordUpstreamEchoVerification {
  const record = {
    verificationMode: "runtime-shell-decision-record-upstream-echo-verification-only" as const,
    sourceSpan: "Node v299 + Java v135 + mini-kv v132" as const,
    sourceNodeV299Ready: checks.sourceNodeV299Ready,
    javaV135EchoReady: checks.javaV135ReadyForNodeV300,
    miniKvV132ReceiptReady: checks.miniKvV132ReadyForNodeV300,
    upstreamEchoAligned: checks.upstreamEchoesAligned,
    blockedDecisionAligned:
      sourceNodeV299.runtimeShellDecision === "blocked"
      && javaV135.blockedDecisionEchoed
      && miniKvV132.blockedDecisionEchoed,
    requiredEvidenceAligned:
      sourceNodeV299.requiredEvidenceCount === 4
      && javaV135.requiredEvidenceEchoed,
    noGoConditionsAligned:
      sourceNodeV299.noGoConditionCount === 6
      && javaV135.noGoConditionsEchoed,
    sideEffectBoundariesAligned: checks.javaV135KeepsRuntimeBlocked && checks.miniKvV132KeepsRuntimeBlocked,
    implementationStillBlocked: true as const,
  };

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceDecisionDigest: sourceNodeV299.decisionDigest,
      javaEvidencePresent: javaV135.evidencePresent,
      miniKvReceiptDigest: miniKvV132.receiptDigest,
      checks,
      record,
    }),
    ...record,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV299: SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference,
  javaV135: JavaV135RuntimeShellDecisionRecordEchoReference,
  miniKvV132: MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference,
): RuntimeShellDecisionRecordUpstreamEchoVerificationChecks {
  return {
    sourceNodeV299Loaded: sourceNodeV299.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-candidate-gate-decision-record.v1",
    sourceNodeV299Ready: sourceNodeV299.readyForDecisionRecord,
    sourceNodeV299DecisionBlocked: sourceNodeV299.runtimeShellDecision === "blocked",
    sourceNodeV299KeepsRuntimeBlocked:
      sourceNodeV299.runtimeShellImplemented === false
      && sourceNodeV299.runtimeShellInvocationAllowed === false
      && sourceNodeV299.readyForNodeV300RuntimeShellDecisionRecordUpstreamEchoVerification === false,
    sourceNodeV299KeepsSideEffectsClosed:
      sourceNodeV299.executionAllowed === false
      && sourceNodeV299.connectsManagedAudit === false
      && sourceNodeV299.credentialValueRead === false
      && sourceNodeV299.rawEndpointUrlParsed === false
      && sourceNodeV299.externalRequestSent === false
      && sourceNodeV299.schemaMigrationExecuted === false
      && sourceNodeV299.approvalLedgerWritten === false
      && sourceNodeV299.automaticUpstreamStart === false,
    javaV135EvidencePresent: javaV135.evidencePresent && javaV135.verificationDocumented,
    javaV135ReadyForNodeV300: javaV135.readyForNodeV300,
    javaV135EchoesNodeV299: javaV135.echoesNodeV299DecisionRecord,
    javaV135KeepsRuntimeBlocked:
      javaV135.blockedDecisionEchoed
      && javaV135.noRuntimeImplementationEchoed
      && javaV135.noRuntimeInvocationEchoed
      && javaV135.sideEffectBoundariesClosed,
    miniKvV132EvidencePresent: miniKvV132.evidencePresent && miniKvV132.verificationDocumented,
    miniKvV132ReadyForNodeV300: miniKvV132.readyForNodeV300 === true,
    miniKvV132EchoesNodeV299: miniKvV132.echoesNodeV299DecisionRecord,
    miniKvV132KeepsRuntimeBlocked:
      miniKvV132.blockedDecisionEchoed
      && miniKvV132.runtimeShellDecisionRecordOnly
      && miniKvV132.sideEffectBoundariesClosed,
    upstreamEchoesAligned:
      javaV135.echoesNodeV299DecisionRecord
      && miniKvV132.echoesNodeV299DecisionRecord
      && javaV135.blockedDecisionEchoed
      && miniKvV132.blockedDecisionEchoed,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellDecisionRecordUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: RuntimeShellDecisionRecordUpstreamEchoVerificationChecks,
): RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV299Ready,
      code: "NODE_V299_DECISION_RECORD_NOT_READY",
      source: "node-v299-runtime-shell-candidate-gate-decision-record",
      message: "Node v299 decision record must be ready before v300 upstream echo verification.",
    },
    {
      condition: checks.sourceNodeV299DecisionBlocked,
      code: "NODE_V299_DECISION_NOT_BLOCKED",
      source: "node-v299-runtime-shell-candidate-gate-decision-record",
      message: "Node v299 must remain a blocked decision record, not a runtime approval.",
    },
    {
      condition: checks.javaV135EvidencePresent && checks.javaV135ReadyForNodeV300,
      code: "JAVA_V135_ECHO_NOT_READY",
      source: "java-v135-runtime-shell-decision-record-echo",
      message: "Java v135 decision record echo evidence must be present, documented, and ready for Node v300.",
    },
    {
      condition: checks.miniKvV132EvidencePresent && checks.miniKvV132ReadyForNodeV300,
      code: "MINI_KV_V132_RECEIPT_NOT_READY",
      source: "mini-kv-v132-runtime-shell-decision-record-non-participation",
      message: "mini-kv v132 non-participation receipt must be present, documented, and ready for Node v300.",
    },
    {
      condition: checks.upstreamEchoesAligned,
      code: "UPSTREAM_ECHOES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification",
      message: "Java v135 and mini-kv v132 must both echo the Node v299 blocked decision record.",
    },
    {
      condition: checks.sourceNodeV299KeepsSideEffectsClosed && checks.javaV135KeepsRuntimeBlocked && checks.miniKvV132KeepsRuntimeBlocked,
      code: "SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification",
      message: "Node, Java, and mini-kv evidence must keep runtime shell, credential, endpoint, network, ledger, schema, and auto-start boundaries closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v300 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v300 upstream echo verification.",
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

function collectWarnings(): RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_READY_DOES_NOT_AUTHORIZE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification",
      message: "v300 aligns the decision record echoes only; it does not approve or implement a runtime shell.",
    },
  ];
}

function collectRecommendations(): RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_POST_DECISION_PLAN_BEFORE_IMPLEMENTATION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification",
      message: "Write a successor plan that decides whether to continue blocked planning or stop the runtime shell chain before implementation.",
    },
    {
      code: "KEEP_RUNTIME_SHELL_DISABLED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-runtime-shell-decision-record-upstream-echo-verification",
      message: "Keep runtime shell implementation, invocation, credential reads, raw endpoint URL parsing, external requests, writes, schema migration, and auto-start disabled.",
    },
  ];
}

function createSummary(
  sourceNodeV299: SourceNodeV299RuntimeShellCandidateGateDecisionRecordReference,
  javaV135: JavaV135RuntimeShellDecisionRecordEchoReference,
  miniKvV132: MiniKvV132RuntimeShellDecisionRecordNonParticipationReceiptReference,
  checks: RuntimeShellDecisionRecordUpstreamEchoVerificationChecks,
  productionBlockers: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[],
  warnings: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[],
  recommendations: RuntimeShellDecisionRecordUpstreamEchoVerificationMessage[],
): RuntimeShellDecisionRecordUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: sourceNodeV299.checkCount,
    sourcePassedCheckCount: sourceNodeV299.passedCheckCount,
    sourceProductionBlockerCount: sourceNodeV299.productionBlockerCount,
    javaEvidenceFileCount: javaV135.evidenceFiles.length,
    javaMatchedSnippetCount: javaV135.expectedSnippets.filter((expected) => expected.matched).length,
    miniKvEvidenceFileCount: miniKvV132.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV132.expectedSnippets.filter((expected) => expected.matched).length,
    requiredEvidenceCount: sourceNodeV299.requiredEvidenceCount,
    missingRequiredEvidenceCount: sourceNodeV299.missingRequiredEvidenceCount,
    noGoConditionCount: sourceNodeV299.noGoConditionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
