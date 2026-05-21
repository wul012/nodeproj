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
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview.js";
import type {
  DisabledRuntimeShellUpstreamEchoVerification,
  DisabledRuntimeShellUpstreamEchoVerificationChecks,
  DisabledRuntimeShellUpstreamEchoVerificationMessage,
  DisabledRuntimeShellUpstreamEchoVerificationSummary,
  JavaV133DisabledRuntimeShellHandoffEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile,
  MiniKvV130DisabledRuntimeShellNonParticipationReceiptReference,
  SourceNodeV295DisabledRuntimeShellDesignReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification";
const SOURCE_NODE_V295_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-review";
const ACTIVE_PLAN = "docs/plans2/v295-post-disabled-runtime-shell-design-review-roadmap.md";

const JAVA_V133_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverDisabledRuntimeShellHandoffEchoSupport.java";
const JAVA_V133_TEST =
  "D:/javaproj/advanced-order-platform/src/test/java/com/codexdemo/orderplatform/ops/OpsEvidenceServiceCredentialResolverDisabledRuntimeShellHandoffEchoTests.java";
const JAVA_V133_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/135-version-133-disabled-runtime-shell-handoff-echo.md";
const MINI_KV_V130_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-runtime-shell-non-participation-receipt.json";
const MINI_KV_V130_RUNBOOK = "D:/C/mini-kv/d/130/解释/说明.md";
const MINI_KV_V130_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/186-version-130-credential-resolver-disabled-runtime-shell-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerificationProfile {
  const sourceNodeV295 = createSourceNodeV295(input.config);
  const javaV133 = createJavaV133Reference();
  const miniKvV130 = createMiniKvV130Reference();
  const checks = createChecks(input.config, sourceNodeV295, javaV133, miniKvV130);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification
    ? "disabled-runtime-shell-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV295ReviewDigest: sourceNodeV295.reviewDigest,
    javaV133Ready: javaV133.readyForNodeV296,
    miniKvV130ReceiptDigest: miniKvV130.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(
    sourceNodeV295,
    javaV133,
    miniKvV130,
    checks,
    verificationDigest,
  );
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV295, javaV133, miniKvV130, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver disabled runtime shell upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    disabledRuntimeShellUpstreamEchoVerificationOnly: true,
    consumesNodeV295DisabledRuntimeShellDesignReview: true,
    consumesJavaV133DisabledRuntimeShellHandoffEcho: true,
    consumesMiniKvV130DisabledRuntimeShellNonParticipationReceipt: true,
    planVersionCorrectionApplied: true,
    plannedJavaVersion: "Java v132",
    actualJavaEchoVersion: "Java v133",
    readyForNodeV297RuntimeShellImplementationCandidateGate:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
    readyForNodeV297RuntimeShellImplementation: false,
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
    sourceNodeV295,
    upstreamEvidence: { javaV133, miniKvV130 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellUpstreamEchoVerificationJson: ROUTE_PATH,
      disabledRuntimeShellUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV295Json: SOURCE_NODE_V295_ROUTE,
      sourceNodeV295Markdown: `${SOURCE_NODE_V295_ROUTE}?format=markdown`,
      javaV133Support: JAVA_V133_SUPPORT,
      javaV133Test: JAVA_V133_TEST,
      javaV133Walkthrough: JAVA_V133_WALKTHROUGH,
      miniKvV130Receipt: MINI_KV_V130_RECEIPT,
      miniKvV130Runbook: MINI_KV_V130_RUNBOOK,
      miniKvV130Walkthrough: MINI_KV_V130_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v296 as a read-only upstream echo verification.",
      "Use Node v297 only for a runtime shell implementation candidate gate; do not implement or invoke runtime behavior there by default.",
      "Keep credential values, raw endpoint URLs, provider clients, HTTP/TCP, managed audit connections, schema migration, ledger writes, LOAD/COMPACT/RESTORE/SETNXEX, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV295(config: AppConfig): SourceNodeV295DisabledRuntimeShellDesignReviewReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview({ config });
  return {
    sourceVersion: "Node v295",
    profileVersion: source.profileVersion,
    designReviewState: source.designReviewState,
    readyForDesignReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignReview,
    readyForParallelUpstreamEchoRequest: source.readyForParallelUpstreamEchoRequest,
    readyForNodeV296RuntimeShellImplementation: source.readyForNodeV296RuntimeShellImplementation,
    reviewDigest: source.designReview.reviewDigest,
    decision: source.designReview.decision,
    reviewQuestionCount: source.summary.reviewQuestionCount,
    yesReviewQuestionCount: source.summary.yesReviewQuestionCount,
    recommendedParallelWorkCount: source.summary.recommendedParallelWorkCount,
    stopConditionCount: source.summary.stopConditionCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellEnabled: source.runtimeShellEnabled,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV133Reference(): JavaV133DisabledRuntimeShellHandoffEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v133-support", JAVA_V133_SUPPORT),
    evidenceFile("java-v133-test", JAVA_V133_TEST),
    evidenceFile("java-v133-walkthrough", JAVA_V133_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("java-v133-mode", JAVA_V133_SUPPORT, "java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only"),
    snippet("java-v133-node-v295", JAVA_V133_SUPPORT, "Node v295"),
    snippet("java-v133-node-v296", JAVA_V133_SUPPORT, "Node v296 disabled runtime shell upstream echo verification"),
    snippet("java-v133-ready", JAVA_V133_SUPPORT, "readyForNodeV296DisabledRuntimeShellUpstreamEchoVerification"),
    snippet("java-v133-decision", JAVA_V133_SUPPORT, "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation"),
    snippet("java-v133-no-runtime", JAVA_V133_TEST, "readyForDisabledRuntimeShellImplementation()).isFalse()"),
    snippet("java-v133-no-invocation", JAVA_V133_TEST, "readyForDisabledRuntimeShellInvocation()).isFalse()"),
    snippet("java-v133-no-credential", JAVA_V133_SUPPORT, "credentialValueRead=false"),
    snippet("java-v133-no-endpoint", JAVA_V133_SUPPORT, "rawEndpointUrlParsed=false"),
    snippet("java-v133-no-provider-client", JAVA_V133_TEST, "noProviderClientInstantiated()).isTrue()"),
    snippet("java-v133-no-write", JAVA_V133_SUPPORT, "NO_LEDGER_SQL_OR_SCHEMA_MIGRATION"),
    snippet("java-v133-no-autostart", JAVA_V133_SUPPORT, "NO_AUTOMATIC_UPSTREAM_START"),
    snippet("java-v133-walkthrough", JAVA_V133_WALKTHROUGH, "v133"),
  ];
  const matched = (id: string) => snippetMatched(expectedSnippets, id);
  return {
    sourceVersion: "Java v133",
    plannedVersionCorrection: "Java v132 was quality optimization; Java v133 contains the handoff echo",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    handoffEchoPresent: matched("java-v133-mode"),
    readyForNodeV296: matched("java-v133-node-v296") && matched("java-v133-ready"),
    handoffEchoMode: matched("java-v133-mode")
      ? "java-v133-credential-resolver-disabled-runtime-shell-handoff-echo-only"
      : "missing",
    designReviewEchoed: matched("java-v133-node-v295") && matched("java-v133-decision"),
    parallelUpstreamEchoRequestEchoed: matched("java-v133-decision"),
    noRuntimeImplementation: matched("java-v133-no-runtime"),
    noRuntimeInvocation: matched("java-v133-no-invocation"),
    credentialValueBoundaryClosed: matched("java-v133-no-credential"),
    rawEndpointBoundaryClosed: matched("java-v133-no-endpoint"),
    providerClientBoundaryClosed: matched("java-v133-no-provider-client"),
    connectionBoundaryClosed: matched("java-v133-no-runtime"),
    ledgerSqlSchemaBoundaryClosed: matched("java-v133-no-write"),
    automaticUpstreamStartBlocked: matched("java-v133-no-autostart"),
  };
}

function createMiniKvV130Reference(): MiniKvV130DisabledRuntimeShellNonParticipationReceiptReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v130-receipt", MINI_KV_V130_RECEIPT),
    evidenceFile("mini-kv-v130-runbook", MINI_KV_V130_RUNBOOK),
    evidenceFile("mini-kv-v130-walkthrough", MINI_KV_V130_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v130-consumer", MINI_KV_V130_RECEIPT, "Node v296 disabled runtime shell upstream echo verification"),
    snippet("mini-kv-v130-release", MINI_KV_V130_RECEIPT, "\"release_version\":\"v130\""),
    snippet("mini-kv-v130-ready", MINI_KV_V130_RECEIPT, "\"ready_for_node_v296_disabled_runtime_shell_upstream_echo_verification\":true"),
    snippet("mini-kv-v130-non-participation", MINI_KV_V130_RECEIPT, "disabled runtime shell non-participation receipt"),
    snippet("mini-kv-v130-no-runtime", MINI_KV_V130_RUNBOOK, "does not implement, enable, or invoke a disabled runtime shell"),
    snippet("mini-kv-v130-no-credential", MINI_KV_V130_RECEIPT, "\"credential_value_read\":false"),
    snippet("mini-kv-v130-no-raw-endpoint", MINI_KV_V130_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v130-no-http", MINI_KV_V130_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v130-no-restore", MINI_KV_V130_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v130-walkthrough", MINI_KV_V130_WALKTHROUGH, "mini-kv v130 credential resolver disabled runtime shell non-participation receipt"),
  ];
  const root = readJsonObject(MINI_KV_V130_RECEIPT);
  const receipt = objectField(root, "credential_resolver_disabled_runtime_shell_non_participation_receipt");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");

  return {
    sourceVersion: "mini-kv v130",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion: stringField(root, "receipt_version") ?? stringField(receipt, "receipt_version"),
    releaseVersion: stringField(root, "release_version") ?? stringField(receipt, "current_release_version"),
    consumerHint: stringField(root, "consumer_hint") ?? stringField(receipt, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceNodeV295Ready: booleanField(checks, "source_node_v295_ready"),
    sourceNodeV294Ready: booleanField(checks, "source_node_v294_ready"),
    miniKvNonParticipationRecorded: booleanField(checks, "mini_kv_non_participation_recorded"),
    readyForNodeV296: booleanField(receipt, "ready_for_node_v296_disabled_runtime_shell_upstream_echo_verification"),
    readOnly: booleanField(root, "read_only") ?? booleanField(receipt, "read_only"),
    executionAllowed: booleanField(root, "execution_allowed") ?? booleanField(receipt, "execution_allowed"),
    runtimeShellImplemented: booleanField(receipt, "runtime_shell_implemented"),
    runtimeShellInvocationAllowed: booleanField(receipt, "runtime_shell_invocation_allowed"),
    disabledRuntimeShellParticipates: booleanField(receipt, "disabled_runtime_shell_participates"),
    credentialValueRead: booleanField(receipt, "credential_value_read"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    providerClientInstantiationAllowed: booleanField(receipt, "provider_client_instantiation_allowed"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(root, "order_authoritative") ?? booleanField(receipt, "order_authoritative"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV295: SourceNodeV295DisabledRuntimeShellDesignReviewReference,
  javaV133: JavaV133DisabledRuntimeShellHandoffEchoReference,
  miniKvV130: MiniKvV130DisabledRuntimeShellNonParticipationReceiptReference,
): DisabledRuntimeShellUpstreamEchoVerificationChecks {
  return {
    sourceNodeV295Ready:
      sourceNodeV295.designReviewState === "disabled-runtime-shell-design-review-ready"
      && sourceNodeV295.readyForDesignReview
      && sourceNodeV295.readyForParallelUpstreamEchoRequest
      && sourceNodeV295.productionBlockerCount === 0,
    sourceNodeV295KeepsImplementationBlocked:
      sourceNodeV295.readyForNodeV296RuntimeShellImplementation === false
      && sourceNodeV295.runtimeShellImplemented === false
      && sourceNodeV295.executionAllowed === false,
    javaV133EvidencePresent: javaV133.evidencePresent && javaV133.verificationDocumented,
    javaV133HandoffEchoReady:
      javaV133.handoffEchoPresent
      && javaV133.readyForNodeV296
      && javaV133.designReviewEchoed
      && javaV133.parallelUpstreamEchoRequestEchoed,
    miniKvV130EvidencePresent: miniKvV130.evidencePresent && miniKvV130.verificationDocumented,
    miniKvV130NonParticipationReceiptReady:
      miniKvV130.releaseVersion === "v130"
      && miniKvV130.sourceNodeV295Ready === true
      && miniKvV130.miniKvNonParticipationRecorded === true
      && miniKvV130.readyForNodeV296 === true
      && miniKvV130.productionBlockerCount === 0,
    planVersionCorrectionDocumented:
      javaV133.plannedVersionCorrection.includes("Java v132")
      && javaV133.sourceVersion === "Java v133",
    upstreamEchoConsumerAligned:
      miniKvV130.consumerHint === "Node v296 disabled runtime shell upstream echo verification"
      && javaV133.readyForNodeV296,
    nodeJavaMiniKvDecisionAligned:
      sourceNodeV295.decision === "request-parallel-java-v132-and-mini-kv-v130-before-runtime-implementation"
      && javaV133.parallelUpstreamEchoRequestEchoed
      && miniKvV130.sourceNodeV295Ready === true,
    runtimeShellImplementationStillForbidden:
      !sourceNodeV295.runtimeShellImplemented
      && javaV133.noRuntimeImplementation
      && miniKvV130.runtimeShellImplemented === false
      && miniKvV130.disabledRuntimeShellParticipates === false,
    runtimeShellInvocationStillForbidden:
      !sourceNodeV295.runtimeShellInvocationAllowed
      && javaV133.noRuntimeInvocation
      && miniKvV130.runtimeShellInvocationAllowed === false
      && miniKvV130.executionAllowed === false,
    credentialBoundaryClosed:
      !sourceNodeV295.credentialValueRead
      && javaV133.credentialValueBoundaryClosed
      && miniKvV130.credentialValueRead === false,
    rawEndpointBoundaryClosed:
      !sourceNodeV295.rawEndpointUrlParsed
      && javaV133.rawEndpointBoundaryClosed
      && miniKvV130.rawEndpointUrlParsed === false,
    providerClientBoundaryClosed:
      !sourceNodeV295.secretProviderInstantiated
      && !sourceNodeV295.resolverClientInstantiated
      && javaV133.providerClientBoundaryClosed
      && miniKvV130.providerClientInstantiationAllowed === false,
    connectionBoundaryClosed:
      !sourceNodeV295.connectsManagedAudit
      && !sourceNodeV295.externalRequestSent
      && javaV133.connectionBoundaryClosed
      && miniKvV130.connectsManagedAudit === false
      && miniKvV130.externalRequestSent === false,
    writeBoundaryClosed:
      !sourceNodeV295.approvalLedgerWritten
      && !sourceNodeV295.schemaMigrationExecuted
      && javaV133.ledgerSqlSchemaBoundaryClosed
      && miniKvV130.storageWriteAllowed === false
      && miniKvV130.approvalLedgerWritten === false
      && miniKvV130.schemaMigrationExecuted === false,
    loadCompactRestoreSetnxexStillBlocked:
      miniKvV130.loadRestoreCompactExecuted === false
      && miniKvV130.setnxexExecutionAllowed === false,
    autoStartBoundaryClosed:
      !sourceNodeV295.automaticUpstreamStart
      && javaV133.automaticUpstreamStartBlocked
      && miniKvV130.automaticUpstreamStart === false,
    auditAndOrderAuthorityForbidden:
      miniKvV130.auditAuthoritative === false
      && miniKvV130.orderAuthoritative === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification: false,
  };
}

function createEchoVerification(
  sourceNodeV295: SourceNodeV295DisabledRuntimeShellDesignReviewReference,
  javaV133: JavaV133DisabledRuntimeShellHandoffEchoReference,
  miniKvV130: MiniKvV130DisabledRuntimeShellNonParticipationReceiptReference,
  checks: DisabledRuntimeShellUpstreamEchoVerificationChecks,
  verificationDigest: string,
): DisabledRuntimeShellUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode:
      "node-v295-plus-java-v133-plus-mini-kv-v130-disabled-runtime-shell-upstream-echo-verification-only",
    sourceSpan: "Node v295 + Java v133 + mini-kv v130",
    sourceNodeV295Ready: checks.sourceNodeV295Ready,
    javaV133HandoffReady: checks.javaV133HandoffEchoReady,
    miniKvV130ReceiptReady: checks.miniKvV130NonParticipationReceiptReady,
    planVersionCorrectionApplied: true,
    upstreamEchoAligned: checks.upstreamEchoConsumerAligned && checks.nodeJavaMiniKvDecisionAligned,
    sideEffectBoundariesAligned:
      checks.runtimeShellImplementationStillForbidden
      && checks.runtimeShellInvocationStillForbidden
      && checks.credentialBoundaryClosed
      && checks.rawEndpointBoundaryClosed
      && checks.providerClientBoundaryClosed
      && checks.connectionBoundaryClosed
      && checks.writeBoundaryClosed
      && checks.autoStartBoundaryClosed,
    implementationStillBlocked: true,
    readyForNodeV297RuntimeShellImplementationCandidateGate:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellUpstreamEchoVerification,
    readyForRuntimeShellImplementation: false,
  };
}

function createSummary(
  sourceNodeV295: SourceNodeV295DisabledRuntimeShellDesignReviewReference,
  javaV133: JavaV133DisabledRuntimeShellHandoffEchoReference,
  miniKvV130: MiniKvV130DisabledRuntimeShellNonParticipationReceiptReference,
  checks: DisabledRuntimeShellUpstreamEchoVerificationChecks,
  productionBlockers: DisabledRuntimeShellUpstreamEchoVerificationMessage[],
  warnings: DisabledRuntimeShellUpstreamEchoVerificationMessage[],
  recommendations: DisabledRuntimeShellUpstreamEchoVerificationMessage[],
): DisabledRuntimeShellUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV133.evidenceFiles.filter((file) => file.exists).length
      + miniKvV130.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV133.expectedSnippets.filter((match) => match.matched).length
      + miniKvV130.expectedSnippets.filter((match) => match.matched).length,
    sourceReviewQuestionCount: sourceNodeV295.reviewQuestionCount,
    sourceYesReviewQuestionCount: sourceNodeV295.yesReviewQuestionCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellUpstreamEchoVerificationChecks,
): DisabledRuntimeShellUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: DisabledRuntimeShellUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV295Ready,
      code: "SOURCE_NODE_V295_NOT_READY",
      source: "node-v295-disabled-runtime-shell-design-review",
      message: "Node v295 design review must be ready before v296 verifies upstream echoes.",
    },
    {
      passed: checks.javaV133HandoffEchoReady,
      code: "JAVA_V133_HANDOFF_ECHO_NOT_READY",
      source: "java-v133-disabled-runtime-shell-handoff-echo",
      message: "Java v133 must provide the disabled runtime shell handoff echo for Node v296.",
    },
    {
      passed: checks.miniKvV130NonParticipationReceiptReady,
      code: "MINI_KV_V130_RECEIPT_NOT_READY",
      source: "mini-kv-v130-disabled-runtime-shell-non-participation-receipt",
      message: "mini-kv v130 must provide the disabled runtime shell non-participation receipt.",
    },
    {
      passed: checks.planVersionCorrectionDocumented,
      code: "PLAN_VERSION_CORRECTION_NOT_DOCUMENTED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Node v296 must document that Java v132 was quality work and Java v133 is the actual handoff echo.",
    },
    {
      passed: checks.nodeJavaMiniKvDecisionAligned,
      code: "UPSTREAM_DECISION_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Node v295, Java v133, and mini-kv v130 must agree on the disabled runtime shell blocked decision.",
    },
    {
      passed: checks.runtimeShellImplementationStillForbidden,
      code: "RUNTIME_SHELL_IMPLEMENTATION_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "v296 cannot allow disabled runtime shell implementation.",
    },
    {
      passed: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Credential value boundaries must remain closed across Node, Java, and mini-kv.",
    },
    {
      passed: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Managed audit connection and HTTP/TCP boundaries must remain closed.",
    },
    {
      passed: checks.writeBoundaryClosed && checks.loadCompactRestoreSetnxexStillBlocked,
      code: "WRITE_OR_RESTORE_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Ledger, SQL, schema, storage, LOAD, COMPACT, RESTORE, and SETNXEX boundaries must remain closed.",
    },
    {
      passed: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Node, Java, mini-kv, and upstream auto-start boundaries must remain closed.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during v296 verification.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during v296 verification.",
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

function collectWarnings(): DisabledRuntimeShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "PLAN_VERSION_CORRECTION_APPLIED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "The previous plan named Java v132, but Java v132 was quality optimization; Java v133 is the actual disabled runtime shell handoff echo.",
    },
    {
      code: "UPSTREAM_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "v296 verifies upstream echo alignment only; it does not authorize runtime implementation or invocation.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_V297_CANDIDATE_GATE_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Use Node v297 only for a disabled runtime shell implementation candidate gate, still default blocked.",
    },
    {
      code: "KEEP_RUNTIME_IMPLEMENTATION_BEHIND_DEDICATED_FLAG",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-upstream-echo-verification",
      message: "Any later implementation candidate must require a dedicated disabled-by-default flag, operator approval, abort semantics, and no-network tests.",
    },
  ];
}
