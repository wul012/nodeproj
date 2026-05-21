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
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord.js";
import type {
  FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
  FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks,
  FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage,
  FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationSummary,
  JavaV131DirectExecutionDeniedEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationProfile,
  MiniKvV129ReceiptRetentionCheckReference,
  SourceNodeV292FakeHarnessReadinessDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification";
const SOURCE_NODE_V292_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-decision-record";
const ACTIVE_PLAN = "docs/plans2/v292-post-fake-harness-readiness-decision-roadmap.md";

const JAVA_V131_RUNBOOK = "D:/javaproj/advanced-order-platform/d/131/解释/说明.md";
const JAVA_V131_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/133-version-131-credential-resolver-execution-denied-echo.md";
const JAVA_V131_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverExecutionDeniedEchoSupport.java";
const MINI_KV_V129_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-receipt-verification-retention-check.json";
const MINI_KV_V129_RUNBOOK = "D:/C/mini-kv/d/129/解释/说明.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationProfile {
  const sourceNodeV292 = createSourceNodeV292(input.config);
  const javaV131 = createJavaV131Reference();
  const miniKvV129 = createMiniKvV129Reference();
  const checks = createChecks(input.config, sourceNodeV292, javaV131, miniKvV129);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification
    ? "fake-harness-readiness-blocked-decision-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV292DecisionDigest: sourceNodeV292.decisionDigest,
    javaV131Ready: javaV131.readyForNodeV293,
    miniKvV129ReceiptDigest: miniKvV129.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV292, javaV131, miniKvV129, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV292, javaV131, miniKvV129, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver fake harness readiness blocked decision upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    fakeHarnessReadinessBlockedDecisionVerificationOnly: true,
    consumesNodeV292FakeHarnessReadinessDecisionRecord: true,
    consumesJavaV131DirectExecutionDeniedEcho: true,
    consumesMiniKvV129ReceiptRetentionCheck: true,
    readyForDisabledRuntimeShellPlanning: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
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
    sourceNodeV292,
    upstreamEvidence: { javaV131, miniKvV129 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      fakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationJson: ROUTE_PATH,
      fakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV292Json: SOURCE_NODE_V292_ROUTE,
      sourceNodeV292Markdown: `${SOURCE_NODE_V292_ROUTE}?format=markdown`,
      javaV131Runbook: JAVA_V131_RUNBOOK,
      javaV131Walkthrough: JAVA_V131_WALKTHROUGH,
      miniKvV129Receipt: MINI_KV_V129_RECEIPT,
      miniKvV129Runbook: MINI_KV_V129_RUNBOOK,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v293 as a read-only blocked decision upstream echo verification.",
      "Use Node v294 only for disabled runtime shell pre-plan intake; do not implement runtime shell behavior there.",
      "Keep credential values, raw endpoint URLs, resolver clients, external requests, managed audit connections, schema migration, ledger writes, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV292(config: AppConfig): SourceNodeV292FakeHarnessReadinessDecisionRecordReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord({ config });
  return {
    sourceVersion: "Node v292",
    profileVersion: source.profileVersion,
    decisionRecordState: source.decisionRecordState,
    readinessDecision: source.readinessDecision,
    readyForFakeHarnessReadinessDecisionRecord:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessDecisionRecord,
    decisionDigest: source.readinessDecisionRecord.decisionDigest,
    sourceSpan: source.readinessDecisionRecord.sourceSpan,
    requiredEvidenceCount: source.readinessDecisionRecord.requiredEvidenceCount,
    missingRequiredEvidenceCount: source.summary.missingRequiredEvidenceCount,
    noGoConditionCount: source.readinessDecisionRecord.noGoConditionCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    readOnlyDecisionRecord: source.readOnlyDecisionRecord,
    fakeHarnessReadinessDecisionOnly: source.fakeHarnessReadinessDecisionOnly,
    javaDirectExecutionDeniedEchoMissing: source.sourceNodeV291.javaExecutionDeniedEchoMissing,
    miniKvV128NonParticipationReady: source.sourceNodeV291.miniKvV128NonParticipationReady,
    sideEffectBoundariesAligned: source.sourceNodeV291.sideEffectBoundariesAligned,
    implementationStillBlocked: source.sourceNodeV291.implementationStillBlocked,
    readyForDisabledRuntimeShellPlanning: source.readyForDisabledRuntimeShellPlanning,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
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

function createJavaV131Reference(): JavaV131DirectExecutionDeniedEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v131-runbook", JAVA_V131_RUNBOOK),
    evidenceFile("java-v131-walkthrough", JAVA_V131_WALKTHROUGH),
    evidenceFile("java-v131-support", JAVA_V131_SUPPORT),
  ];
  const expectedSnippets = [
    snippet("java-v131-direct-echo", JAVA_V131_RUNBOOK, "direct execution-denied echo receipt"),
    snippet("java-v131-node-v292", JAVA_V131_WALKTHROUGH, "Node v292"),
    snippet("java-v131-node-v293", JAVA_V131_SUPPORT, "Node v293"),
    snippet("java-v131-echo-mode", JAVA_V131_SUPPORT, "java-v131-credential-resolver-direct-execution-denied-echo-only"),
    snippet("java-v131-ready", JAVA_V131_SUPPORT, "readyForNodeV293FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification"),
    snippet("java-v131-no-runtime", JAVA_V131_RUNBOOK, "没有执行 fake harness"),
    snippet("java-v131-no-credential", JAVA_V131_RUNBOOK, "没有读取 credential"),
    snippet("java-v131-no-raw-endpoint", JAVA_V131_RUNBOOK, "没有解析 raw endpoint"),
    snippet("java-v131-no-ledger-sql", JAVA_V131_RUNBOOK, "没有写 ledger/SQL/schema"),
    snippet("java-v131-no-autostart", JAVA_V131_RUNBOOK, "没有自动启动任何运行时"),
  ];
  const matched = (id: string) => snippetMatched(expectedSnippets, id);
  return {
    sourceVersion: "Java v131",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    directExecutionDeniedEchoPresent: matched("java-v131-direct-echo") && matched("java-v131-echo-mode"),
    readyForNodeV293: matched("java-v131-node-v293") && matched("java-v131-ready"),
    echoMode: matched("java-v131-echo-mode")
      ? "java-v131-credential-resolver-direct-execution-denied-echo-only"
      : "missing",
    noFakeHarnessRuntime: matched("java-v131-no-runtime"),
    credentialValueBoundaryClosed: matched("java-v131-no-credential"),
    rawEndpointBoundaryClosed: matched("java-v131-no-raw-endpoint"),
    managedAuditConnectionBoundaryClosed: matched("java-v131-no-runtime"),
    ledgerSqlSchemaBoundaryClosed: matched("java-v131-no-ledger-sql"),
    automaticUpstreamStartBlocked: matched("java-v131-no-autostart"),
  };
}

function createMiniKvV129Reference(): MiniKvV129ReceiptRetentionCheckReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v129-receipt", MINI_KV_V129_RECEIPT),
    evidenceFile("mini-kv-v129-runbook", MINI_KV_V129_RUNBOOK),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v129-consumer", MINI_KV_V129_RECEIPT, "Node v293 fake harness readiness blocked decision upstream echo verification"),
    snippet("mini-kv-v129-release", MINI_KV_V129_RECEIPT, "\"release_version\":\"v129\""),
    snippet("mini-kv-v129-ready", MINI_KV_V129_RECEIPT, "\"ready_for_node_v293_blocked_decision_upstream_echo_verification\":true"),
    snippet("mini-kv-v129-no-runtime", MINI_KV_V129_RUNBOOK, "does not implement or run a fake harness runtime"),
    snippet("mini-kv-v129-no-credential", MINI_KV_V129_RUNBOOK, "does not read credential values"),
    snippet("mini-kv-v129-no-raw-endpoint", MINI_KV_V129_RUNBOOK, "does not parse raw endpoint URLs"),
    snippet("mini-kv-v129-no-http", MINI_KV_V129_RUNBOOK, "does not send HTTP/TCP"),
    snippet("mini-kv-v129-no-write", MINI_KV_V129_RUNBOOK, "does not write storage, approval ledger, or schema state"),
    snippet("mini-kv-v129-no-restore", MINI_KV_V129_RUNBOOK, "does not execute LOAD, COMPACT, RESTORE, or SETNXEX"),
  ];
  const root = readJsonObject(MINI_KV_V129_RECEIPT);
  const receipt = objectField(root, "credential_resolver_disabled_fake_harness_execution_denied_receipt_verification_retention_check");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v129",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion: stringField(root, "receipt_version") ?? stringField(receipt, "receipt_version"),
    releaseVersion: stringField(root, "release_version") ?? stringField(receipt, "current_release_version"),
    consumerHint: stringField(root, "consumer_hint") ?? stringField(receipt, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceNodeV292Ready: booleanField(checks, "source_node_v292_ready"),
    sourceNodeV292BlockedAsExpected: booleanField(checks, "source_node_v292_blocked_as_expected"),
    sourceNodeV291Loaded: booleanField(checks, "source_node_v291_loaded"),
    v128ReceiptDigestStable: booleanField(checks, "v128_receipt_digest_stable"),
    readyForNodeV293: booleanField(receipt, "ready_for_node_v293_blocked_decision_upstream_echo_verification"),
    readOnly: booleanField(root, "read_only") ?? booleanField(receipt, "read_only"),
    executionAllowed: booleanField(root, "execution_allowed") ?? booleanField(receipt, "execution_allowed"),
    fakeHarnessRuntimeImplemented: booleanField(receipt, "fake_harness_runtime_implemented"),
    fakeHarnessRuntimeInvoked: booleanField(receipt, "fake_harness_runtime_invoked"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    orderAuthoritative: booleanField(root, "order_authoritative") ?? booleanField(receipt, "order_authoritative"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV292: SourceNodeV292FakeHarnessReadinessDecisionRecordReference,
  javaV131: JavaV131DirectExecutionDeniedEchoReference,
  miniKvV129: MiniKvV129ReceiptRetentionCheckReference,
): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks {
  return {
    sourceNodeV292Ready:
      sourceNodeV292.readyForFakeHarnessReadinessDecisionRecord
      && sourceNodeV292.decisionRecordState === "fake-harness-readiness-decision-record-ready",
    sourceNodeV292KeepsReadinessBlocked:
      sourceNodeV292.readinessDecision === "blocked"
      && sourceNodeV292.implementationStillBlocked,
    sourceNodeV292KeepsRuntimeShellBlocked:
      !sourceNodeV292.readyForDisabledRuntimeShellPlanning
      && !sourceNodeV292.executionAllowed,
    javaV131EvidencePresent: javaV131.evidencePresent && javaV131.verificationDocumented,
    javaV131DirectExecutionDeniedEchoReady:
      javaV131.directExecutionDeniedEchoPresent
      && javaV131.readyForNodeV293,
    miniKvV129EvidencePresent: miniKvV129.evidencePresent && miniKvV129.verificationDocumented,
    miniKvV129RetentionCheckReady:
      miniKvV129.readyForNodeV293 === true
      && miniKvV129.releaseVersion === "v129"
      && miniKvV129.sourceNodeV292Ready === true
      && miniKvV129.v128ReceiptDigestStable === true,
    blockedDecisionAligned:
      sourceNodeV292.readinessDecision === "blocked"
      && miniKvV129.sourceNodeV292BlockedAsExpected === true,
    missingJavaEchoResolvedByJavaV131:
      sourceNodeV292.javaDirectExecutionDeniedEchoMissing
      && javaV131.directExecutionDeniedEchoPresent,
    sideEffectBoundariesClosed:
      javaV131.noFakeHarnessRuntime
      && miniKvV129.fakeHarnessRuntimeImplemented === false
      && miniKvV129.fakeHarnessRuntimeInvoked === false
      && miniKvV129.executionAllowed === false,
    credentialBoundaryClosed:
      !sourceNodeV292.credentialValueRead
      && javaV131.credentialValueBoundaryClosed
      && miniKvV129.credentialValueRead === false,
    rawEndpointBoundaryClosed:
      !sourceNodeV292.rawEndpointUrlParsed
      && javaV131.rawEndpointBoundaryClosed
      && miniKvV129.rawEndpointUrlParsed === false,
    connectionBoundaryClosed:
      !sourceNodeV292.connectsManagedAudit
      && !sourceNodeV292.externalRequestSent
      && javaV131.managedAuditConnectionBoundaryClosed
      && miniKvV129.connectsManagedAudit === false
      && miniKvV129.externalRequestSent === false,
    writeBoundaryClosed:
      !sourceNodeV292.approvalLedgerWritten
      && !sourceNodeV292.schemaMigrationExecuted
      && javaV131.ledgerSqlSchemaBoundaryClosed
      && miniKvV129.storageWriteAllowed === false
      && miniKvV129.approvalLedgerWritten === false
      && miniKvV129.schemaMigrationExecuted === false
      && miniKvV129.loadRestoreCompactExecuted === false
      && miniKvV129.setnxexExecutionAllowed === false
      && miniKvV129.orderAuthoritative === false,
    autoStartBoundaryClosed:
      !sourceNodeV292.automaticUpstreamStart
      && javaV131.automaticUpstreamStartBlocked
      && miniKvV129.automaticUpstreamStart === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeHarnessReadinessBlockedDecisionUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV292: SourceNodeV292FakeHarnessReadinessDecisionRecordReference,
  javaV131: JavaV131DirectExecutionDeniedEchoReference,
  miniKvV129: MiniKvV129ReceiptRetentionCheckReference,
  checks: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks,
  verificationDigest: string,
): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode:
      "node-v292-plus-java-v131-plus-mini-kv-v129-fake-harness-readiness-blocked-decision-upstream-echo-verification-only",
    sourceSpan: "Node v292 + Java v131 + mini-kv v129",
    sourceNodeV292Ready: checks.sourceNodeV292Ready,
    javaV131EchoReady: checks.javaV131DirectExecutionDeniedEchoReady,
    miniKvV129RetentionReady: checks.miniKvV129RetentionCheckReady,
    blockedDecisionAligned: checks.blockedDecisionAligned,
    missingJavaEchoResolved: checks.missingJavaEchoResolvedByJavaV131,
    sideEffectBoundariesAligned: checks.sideEffectBoundariesClosed,
    implementationStillBlocked: true,
    readyForDisabledRuntimeShellPlanning: false,
  };
}

function createSummary(
  sourceNodeV292: SourceNodeV292FakeHarnessReadinessDecisionRecordReference,
  javaV131: JavaV131DirectExecutionDeniedEchoReference,
  miniKvV129: MiniKvV129ReceiptRetentionCheckReference,
  checks: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks,
  productionBlockers: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[],
  warnings: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[],
  recommendations: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[],
): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV131.evidenceFiles.filter((file) => file.exists).length
      + miniKvV129.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV131.expectedSnippets.filter((match) => match.matched).length
      + miniKvV129.expectedSnippets.filter((match) => match.matched).length,
    sourceRequiredEvidenceCount: sourceNodeV292.requiredEvidenceCount,
    sourceMissingRequiredEvidenceCount: sourceNodeV292.missingRequiredEvidenceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationChecks,
): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV292Ready,
      code: "SOURCE_NODE_V292_NOT_READY",
      source: "node-v292-fake-harness-readiness-decision-record",
      message: "Node v292 readiness decision record must be ready before v293 verifies upstream echo closure.",
    },
    {
      passed: checks.javaV131DirectExecutionDeniedEchoReady,
      code: "JAVA_V131_DIRECT_EXECUTION_DENIED_ECHO_NOT_READY",
      source: "java-v131-direct-execution-denied-echo",
      message: "Java v131 direct execution-denied echo must be present before v293 closes the Java evidence gap.",
    },
    {
      passed: checks.miniKvV129RetentionCheckReady,
      code: "MINI_KV_V129_RETENTION_CHECK_NOT_READY",
      source: "mini-kv-v129-receipt-retention-check",
      message: "mini-kv v129 receipt verification and retention check must be ready before v293.",
    },
    {
      passed: checks.blockedDecisionAligned,
      code: "BLOCKED_DECISION_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v292 and mini-kv v129 must both keep the fake harness readiness decision blocked.",
    },
    {
      passed: checks.missingJavaEchoResolvedByJavaV131,
      code: "JAVA_ECHO_GAP_NOT_RESOLVED",
      source: "java-v131-direct-execution-denied-echo",
      message: "Node v292 recorded a missing Java direct echo; Java v131 must resolve that gap without opening runtime execution.",
    },
    {
      passed: checks.sideEffectBoundariesClosed,
      code: "SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "v293 must keep fake harness runtime, execution, and side effects closed.",
    },
    {
      passed: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Credential value boundaries must remain closed across Node, Java, and mini-kv.",
    },
    {
      passed: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Raw endpoint URL boundaries must remain closed across Node, Java, and mini-kv.",
    },
    {
      passed: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Managed audit connection and HTTP/TCP boundaries must remain closed.",
    },
    {
      passed: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Ledger, SQL, schema, storage, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      passed: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Node, Java, mini-kv, and upstream auto-start boundaries must remain closed.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v293 verification.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v293 verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.passed)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "v293 only verifies that the blocked decision is now supported by Java v131 and mini-kv v129 evidence; it does not authorize a runtime shell.",
    },
  ];
}

function collectRecommendations(): FakeHarnessReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_V294_DISABLED_RUNTIME_SHELL_PRE_PLAN_INTAKE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Use Node v294 only to intake disabled runtime shell planning boundaries; keep implementation forbidden until a later explicit approval gate.",
    },
    {
      code: "KEEP_ECHO_CATALOG_QUALITY_RULE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-harness-readiness-blocked-decision-upstream-echo-verification",
      message: "Keep future echo/governance reports catalog-driven and below the 3000 changed-line budget.",
    },
  ];
}
