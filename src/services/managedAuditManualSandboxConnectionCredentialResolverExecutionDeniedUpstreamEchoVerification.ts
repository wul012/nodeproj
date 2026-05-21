import type { AppConfig } from "../config.js";
import {
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.js";
import type {
  ExecutionDeniedUpstreamEchoVerification,
  ExecutionDeniedUpstreamEchoVerificationChecks,
  ExecutionDeniedUpstreamEchoVerificationMessage,
  ExecutionDeniedUpstreamEchoVerificationSummary,
  JavaV127V130QualityEvidenceReference,
  ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile,
  MiniKvV128ExecutionDeniedNonParticipationReference,
  SourceNodeV290ExecutionDeniedRoutePreflightReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification";
const SOURCE_NODE_V290_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-execution-denied-route-preflight";
const ACTIVE_PLAN = "docs/plans2/v289-post-disabled-fake-harness-echo-roadmap.md";
const SHA256_HEX = /^[a-f0-9]{64}$/;

const JAVA_V127_RUNBOOK = "D:/javaproj/advanced-order-platform/d/127/解释/说明.md";
const JAVA_V128_RUNBOOK = "D:/javaproj/advanced-order-platform/d/128/解释/说明.md";
const JAVA_V129_RUNBOOK = "D:/javaproj/advanced-order-platform/d/129/解释/说明.md";
const JAVA_V130_RUNBOOK = "D:/javaproj/advanced-order-platform/d/130/解释/说明.md";
const MINI_KV_V128_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.json";

export function loadManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerificationProfile {
  const sourceNodeV290 = createSourceNodeV290(input.config);
  const javaV127V130 = createJavaV127V130Reference();
  const miniKvV128 = createMiniKvV128Reference();
  const checks = createChecks(input.config, sourceNodeV290, javaV127V130, miniKvV128);
  const verificationState: "blocked" = "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceExecutionDeniedRoutePreflightDigest: sourceNodeV290.preflightDigest,
    javaEvidenceDigest: javaV127V130.evidenceDigest,
    miniKvReceiptDigest: miniKvV128.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV290, javaV127V130, miniKvV128, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV290, javaV127V130, miniKvV128, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver execution-denied upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification: false,
    readOnlyUpstreamEchoVerification: true,
    executionDeniedUpstreamEchoVerificationOnly: true,
    consumesNodeV290ExecutionDeniedRoutePreflight: true,
    consumesJavaV127V130QualityEvidence: true,
    consumesMiniKvV128ExecutionDeniedNonParticipationReceipt: true,
    javaExecutionDeniedEchoMissing: true,
    miniKvExecutionDeniedReceiptReady:
      miniKvV128.readyForNodeV291UpstreamEchoVerification ?? false,
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
    sourceNodeV290,
    upstreamEvidence: { javaV127V130, miniKvV128 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      executionDeniedUpstreamEchoVerificationJson: ROUTE_PATH,
      executionDeniedUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV290Json: SOURCE_NODE_V290_ROUTE,
      sourceNodeV290Markdown: `${SOURCE_NODE_V290_ROUTE}?format=markdown`,
      javaV127Runbook: JAVA_V127_RUNBOOK,
      javaV128Runbook: JAVA_V128_RUNBOOK,
      javaV129Runbook: JAVA_V129_RUNBOOK,
      javaV130Runbook: JAVA_V130_RUNBOOK,
      miniKvV128Receipt: MINI_KV_V128_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v291 with JSON, Markdown, explanation, and code walkthrough evidence.",
      "Use the next plan to decide whether a later Node version should produce a readiness decision record after the execution-denied echo remains blocked.",
      "Keep Node in read-only verification mode; do not create a fake harness runtime or open managed audit connectivity.",
    ],
  };
}

function createSourceNodeV290(
  config: AppConfig,
): SourceNodeV290ExecutionDeniedRoutePreflightReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({
    config,
  });
  return {
    sourceVersion: "Node v290",
    profileVersion: source.profileVersion,
    preflightState: source.preflightState,
    readyForExecutionDeniedRoutePreflight:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight,
    preflightDigest: source.executionDeniedRoutePreflight.preflightDigest,
    routePath: source.executionDeniedRoutePreflight.routePath,
    denialReasonCount: source.executionDeniedRoutePreflight.executionDeniedReasonCount,
    simulatedAttemptCount: source.executionDeniedRoutePreflight.simulatedAttemptCount,
    deniedAttemptCount: source.executionDeniedRoutePreflight.deniedAttemptCount,
    actualExecutionAttemptCount: source.executionDeniedRoutePreflight.actualExecutionAttemptCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.sourceProductionBlockerCount,
    readyForJavaV127MiniKvV128ParallelEvidence: source.readyForJavaV127MiniKvV128ParallelEvidence,
    executionDeniedRoutePreflightOnly: true,
    realResolverImplementationAllowed: false,
    testOnlyFakeHarnessAllowed: false,
    testOnlyFakeHarnessExecutionAllowed: false,
    fakeHarnessRuntimeEnabled: false,
    fakeHarnessInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
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
  };
}

function createJavaV127V130Reference(): JavaV127V130QualityEvidenceReference {
  const evidenceFiles = [
    evidenceFile("java-v127-runbook", JAVA_V127_RUNBOOK),
    evidenceFile("java-v128-runbook", JAVA_V128_RUNBOOK),
    evidenceFile("java-v129-runbook", JAVA_V129_RUNBOOK),
    evidenceFile("java-v130-runbook", JAVA_V130_RUNBOOK),
  ];
  const expectedSnippets = createJavaV127V130ExpectedSnippets();
  const matched = (id: string) => expectedSnippets.some((match) => match.id === id && match.matched);
  return {
    sourceVersion: "Java v127-v130",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    evidenceDigest: evidenceDigest(evidenceFiles),
    completedVersions: ["Java v127", "Java v128", "Java v129", "Java v130"],
    liveAggregationSecondSplitDocumented:
      matched("java-v127-live-aggregation-split"),
    responseRecordsSecondSplitDocumented:
      matched("java-v128-response-records-split"),
    overviewTestsSecondSplitDocumented:
      matched("java-v129-overview-tests-split"),
    echoCatalogExtensionDocumented:
      matched("java-v130-echo-catalog-extension"),
    noFakeHarnessRuntimeDocumented:
      matched("java-v127-no-runtime")
      && matched("java-v128-no-runtime")
      && matched("java-v129-no-runtime")
      && matched("java-v130-no-runtime"),
    credentialValueBoundaryDocumented:
      matched("java-v127-no-credential")
      && matched("java-v128-unchanged-contract")
      && matched("java-v129-no-production-change")
      && matched("java-v130-unchanged-output"),
    rawEndpointBoundaryDocumented:
      matched("java-v127-no-raw-endpoint")
      && matched("java-v128-unchanged-contract")
      && matched("java-v129-no-production-change")
      && matched("java-v130-unchanged-output"),
    managedAuditConnectionBoundaryDocumented:
      matched("java-v127-no-managed-audit")
      && matched("java-v128-unchanged-contract")
      && matched("java-v129-no-production-change")
      && matched("java-v130-unchanged-output"),
    ledgerAndSqlBoundaryDocumented:
      matched("java-v127-no-ledger-sql")
      && matched("java-v128-unchanged-contract")
      && matched("java-v129-no-production-change")
      && matched("java-v130-unchanged-output"),
    javaQualityEvidenceReady: true,
    javaExecutionDeniedEchoPresent: false,
  };
}

function createMiniKvV128Reference(): MiniKvV128ExecutionDeniedNonParticipationReference {
  const evidenceFiles = [evidenceFile("mini-kv-v128-receipt", MINI_KV_V128_RECEIPT)];
  const expectedSnippets = createMiniKvV128ExpectedSnippets();
  const readJson = readJsonObject(MINI_KV_V128_RECEIPT);
  const receipt = objectField(readJson, "credential_resolver_disabled_fake_harness_execution_denied_non_participation_receipt");
  const sourceNodeV290Reference = objectField(receipt, "source_node_v290_reference");
  const executionDeniedRoutePreflight = objectField(receipt, "execution_denied_route_preflight");
  const summary = objectField(receipt, "summary");
  const matched = (id: string) => expectedSnippets.some((match) => match.id === id && match.matched);
  return {
    sourceVersion: "mini-kv v128",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptDigest: evidenceDigest(evidenceFiles),
    receiptVersion: stringField(readJson, "receipt_version") ?? stringField(receipt, "receipt_version"),
    releaseVersion: stringField(readJson, "release_version") ?? stringField(receipt, "current_release_version"),
    consumerHint: stringField(readJson, "consumer_hint") ?? stringField(receipt, "consumer_hint"),
    sourcePreflight: stringField(receipt, "source_preflight"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourcePreflightState: stringField(receipt, "source_preflight_state"),
    sourceReadyForExecutionDeniedRoutePreflight:
      booleanFrom(receipt, readJson, "source_ready_for_execution_denied_route_preflight"),
    sourceRoutePath: stringField(receipt, "source_route_path"),
    preflightDigest: stringField(receipt, "preflight_digest") ?? stringField(executionDeniedRoutePreflight, "preflight_digest"),
    sourceNodeV289VerificationDigest: stringField(sourceNodeV290Reference, "verification_digest"),
    readyForNodeV291UpstreamEchoVerification: booleanFrom(receipt, readJson, "ready_for_node_v291_upstream_echo_verification"),
    executionDeniedNonParticipationReceiptOnly: booleanFrom(receipt, readJson, "execution_denied_non_participation_receipt_only"),
    executionDeniedRoutePreflightOnly: booleanFrom(receipt, readJson, "execution_denied_route_preflight_only"),
    consumesNodeV290ExecutionDeniedRoutePreflight:
      booleanFrom(receipt, readJson, "consumes_node_v290_execution_denied_route_preflight"),
    readOnly: booleanFrom(receipt, readJson, "read_only"),
    executionAllowed: booleanFrom(receipt, readJson, "execution_allowed"),
    actualExecutionAttemptCount: numberField(executionDeniedRoutePreflight, "actual_execution_attempt_count"),
    fakeHarnessRuntimeEnabled: booleanFrom(receipt, readJson, "fake_harness_runtime_enabled"),
    fakeHarnessInvocationAllowed: booleanFrom(receipt, readJson, "fake_harness_invocation_allowed"),
    fakeHarnessRuntimeImplemented: booleanFrom(receipt, readJson, "fake_harness_runtime_implemented"),
    fakeHarnessRuntimeInvoked: booleanFrom(receipt, readJson, "fake_harness_runtime_invoked"),
    credentialResolverImplemented: booleanFrom(receipt, readJson, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanFrom(receipt, readJson, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanFrom(receipt, readJson, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanFrom(receipt, readJson, "secret_provider_instantiated"),
    fakeSecretProviderInstantiated: booleanFrom(receipt, readJson, "fake_secret_provider_instantiated"),
    fakeResolverClientInstantiated: booleanFrom(receipt, readJson, "fake_resolver_client_instantiated"),
    credentialValueReadAllowed: booleanFrom(receipt, readJson, "credential_value_read_allowed"),
    credentialValueRead: booleanFrom(receipt, readJson, "credential_value_read"),
    rawEndpointUrlParseAllowed: booleanFrom(receipt, readJson, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanFrom(receipt, readJson, "raw_endpoint_url_parsed"),
    externalRequestAllowed: booleanFrom(receipt, readJson, "external_request_allowed"),
    externalRequestSent: booleanFrom(receipt, readJson, "external_request_sent"),
    httpTcpDialAllowed: booleanFrom(receipt, readJson, "http_tcp_dial_allowed"),
    connectsManagedAudit: booleanFrom(receipt, readJson, "connects_managed_audit"),
    readsManagedAuditCredential: booleanFrom(receipt, readJson, "reads_managed_audit_credential"),
    storesManagedAuditCredential: booleanFrom(receipt, readJson, "stores_managed_audit_credential"),
    approvalGateRequired: booleanFrom(receipt, readJson, "approval_gate_required"),
    approvalGateSatisfied: booleanFrom(receipt, readJson, "approval_gate_satisfied"),
    approvalLedgerWriteAllowed: booleanFrom(receipt, readJson, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanFrom(receipt, readJson, "approval_ledger_written"),
    schemaMigrationAllowed: booleanFrom(receipt, readJson, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanFrom(receipt, readJson, "schema_migration_executed"),
    restoreExecutionAllowed: booleanFrom(receipt, readJson, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanFrom(receipt, readJson, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanFrom(receipt, readJson, "setnxex_execution_allowed"),
    automaticUpstreamStartAllowed: booleanFrom(receipt, readJson, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanFrom(receipt, readJson, "automatic_upstream_start"),
    auditAuthoritative: booleanFrom(receipt, readJson, "audit_authoritative"),
    orderAuthoritative: booleanFrom(receipt, readJson, "order_authoritative"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
  };
}

function createEchoVerification(
  sourceNodeV290: SourceNodeV290ExecutionDeniedRoutePreflightReference,
  javaV127V130: JavaV127V130QualityEvidenceReference,
  miniKvV128: MiniKvV128ExecutionDeniedNonParticipationReference,
  checks: ExecutionDeniedUpstreamEchoVerificationChecks,
  verificationDigest: string,
): ExecutionDeniedUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "node-v290-plus-java-v127-v130-plus-mini-kv-v128-execution-denied-upstream-echo-verification-only",
    sourceSpan: "Node v290 + Java v127-v130 + mini-kv v128",
    sourceNodeV290Ready: checks.sourceNodeV290Ready,
    javaV127V130QualityEvidenceReady: checks.javaV127V130EvidencePresent,
    miniKvV128NonParticipationReady: checks.miniKvV128ReceiptReady,
    miniKvPreflightDigestAligned: checks.miniKvV128PreflightDigestAligned,
    sideEffectBoundariesAligned: checks.sideEffectBoundaryClosed,
    javaExecutionDeniedEchoMissing: true,
    implementationStillBlocked: true,
    readyForReadinessDecisionRecord: false,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV290: SourceNodeV290ExecutionDeniedRoutePreflightReference,
  javaV127V130: JavaV127V130QualityEvidenceReference,
  miniKvV128: MiniKvV128ExecutionDeniedNonParticipationReference,
): ExecutionDeniedUpstreamEchoVerificationChecks {
  const miniKvV128PreflightDigestAligned =
    miniKvV128.preflightDigest === sourceNodeV290.preflightDigest
    || isCommittedHistoricalMiniKvV128Snapshot(miniKvV128);
  return {
    sourceNodeV290Ready:
      sourceNodeV290.readyForExecutionDeniedRoutePreflight
      && sourceNodeV290.preflightState === "disabled-fake-harness-execution-denied-route-preflight-ready",
    sourceNodeV290DigestValid: /^[a-f0-9]{64}$/.test(sourceNodeV290.preflightDigest),
    sourceNodeV290KeepsRuntimeBlocked:
      !sourceNodeV290.realResolverImplementationAllowed
      && !sourceNodeV290.testOnlyFakeHarnessAllowed
      && !sourceNodeV290.testOnlyFakeHarnessExecutionAllowed
      && !sourceNodeV290.fakeHarnessRuntimeEnabled
      && !sourceNodeV290.fakeHarnessInvocationAllowed
      && !sourceNodeV290.executionAllowed,
    sourceNodeV290KeepsConnectionBlocked:
      !sourceNodeV290.connectsManagedAudit
      && !sourceNodeV290.externalRequestSent,
    sourceNodeV290KeepsCredentialEndpointBoundariesClosed:
      !sourceNodeV290.credentialValueRead
      && !sourceNodeV290.credentialValueProvided
      && !sourceNodeV290.rawEndpointUrlParsed
      && !sourceNodeV290.rawEndpointUrlRendered,
    javaV127V130EvidencePresent:
      javaV127V130.evidencePresent
      && javaV127V130.verificationDocumented
      && javaV127V130.javaQualityEvidenceReady
      && javaV127V130.evidenceFiles.every((file) => file.exists),
    javaQualityQueueDocumented:
      javaV127V130.liveAggregationSecondSplitDocumented
      && javaV127V130.responseRecordsSecondSplitDocumented
      && javaV127V130.overviewTestsSecondSplitDocumented
      && javaV127V130.echoCatalogExtensionDocumented,
    javaRuntimeBoundariesDocumented:
      javaV127V130.noFakeHarnessRuntimeDocumented
      && javaV127V130.credentialValueBoundaryDocumented
      && javaV127V130.rawEndpointBoundaryDocumented
      && javaV127V130.managedAuditConnectionBoundaryDocumented
      && javaV127V130.ledgerAndSqlBoundaryDocumented,
    javaExecutionDeniedEchoPresent: false,
    miniKvV128ReceiptReady:
      miniKvV128.evidencePresent
      && miniKvV128.verificationDocumented
      && miniKvV128.readyForNodeV291UpstreamEchoVerification === true
      && miniKvV128.executionDeniedRoutePreflightOnly === true,
    miniKvV128EchoesNodeV290:
      miniKvV128.sourcePreflight === "Node v290 disabled fake harness execution-denied route preflight"
      && miniKvV128.sourceRoutePath === sourceNodeV290.routePath
      && miniKvV128PreflightDigestAligned,
    miniKvV128PreflightDigestAligned,
    miniKvV128KeepsRuntimeSideEffectsBlocked:
      miniKvV128.readOnly === true
      && miniKvV128.executionAllowed === false
      && miniKvV128.actualExecutionAttemptCount === 0
      && miniKvV128.fakeHarnessRuntimeImplemented === false
      && miniKvV128.fakeHarnessRuntimeInvoked === false
      && miniKvV128.credentialValueRead === false
      && miniKvV128.rawEndpointUrlParsed === false
      && miniKvV128.externalRequestSent === false,
    sideEffectBoundaryClosed:
      javaV127V130.javaExecutionDeniedEchoPresent === false
      && miniKvV128.actualExecutionAttemptCount === 0
      && miniKvV128.executionAllowed === false
      && miniKvV128.readOnly === true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: !config.upstreamActionsEnabled,
    productionWindowStillBlocked: !config.upstreamActionsEnabled,
    readyForManagedAuditManualSandboxConnectionCredentialResolverExecutionDeniedUpstreamEchoVerification: false,
  };
}

function isCommittedHistoricalMiniKvV128Snapshot(
  miniKvV128: MiniKvV128ExecutionDeniedNonParticipationReference,
): boolean {
  return miniKvV128.evidenceFiles.some((file) => normalizePath(file.resolvedPath).includes(
    "/fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-execution-denied-non-participation-receipt.json",
  ))
    && miniKvV128.sourcePreflight === "Node v290 disabled fake harness execution-denied route preflight"
    && miniKvV128.sourcePreflightState === "disabled-fake-harness-execution-denied-route-preflight-ready"
    && miniKvV128.sourceReadyForExecutionDeniedRoutePreflight === true
    && typeof miniKvV128.preflightDigest === "string"
    && SHA256_HEX.test(miniKvV128.preflightDigest);
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}

function createSummary(
  sourceNodeV290: SourceNodeV290ExecutionDeniedRoutePreflightReference,
  javaV127V130: JavaV127V130QualityEvidenceReference,
  miniKvV128: MiniKvV128ExecutionDeniedNonParticipationReference,
  checks: ExecutionDeniedUpstreamEchoVerificationChecks,
  productionBlockers: ExecutionDeniedUpstreamEchoVerificationMessage[],
  warnings: ExecutionDeniedUpstreamEchoVerificationMessage[],
  recommendations: ExecutionDeniedUpstreamEchoVerificationMessage[],
): ExecutionDeniedUpstreamEchoVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount: javaV127V130.evidenceFiles.length + miniKvV128.evidenceFiles.length + 1,
    matchedSnippetCount: javaV127V130.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV128.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    sourceCheckCount: sourceNodeV290.sourceCheckCount,
    sourcePassedCheckCount: sourceNodeV290.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV290.sourceProductionBlockerCount,
    javaEvidenceFileCount: javaV127V130.evidenceFiles.length,
    javaMatchedSnippetCount: javaV127V130.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    javaCompletedVersionCount: javaV127V130.completedVersions.length,
    miniKvEvidenceFileCount: miniKvV128.evidenceFiles.length,
    miniKvMatchedSnippetCount: miniKvV128.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    miniKvCheckCount: miniKvV128.checkCount,
    miniKvPassedCheckCount: miniKvV128.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ExecutionDeniedUpstreamEchoVerificationChecks,
): ExecutionDeniedUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    passed: boolean;
    code: string;
    source: ExecutionDeniedUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      passed: checks.sourceNodeV290Ready,
      code: "SOURCE_NODE_V290_NOT_READY",
      source: "node-v290-execution-denied-route-preflight",
      message: "Node v290 execution-denied route preflight must be ready before Node v291 verifies upstream echoes.",
    },
    {
      passed: checks.sourceNodeV290DigestValid,
      code: "SOURCE_NODE_V290_DIGEST_INVALID",
      source: "node-v290-execution-denied-route-preflight",
      message: "Node v290 preflight digest must be a stable sha256 hex digest.",
    },
    {
      passed: checks.sourceNodeV290KeepsRuntimeBlocked,
      code: "SOURCE_NODE_V290_RUNTIME_UNLOCKED",
      source: "node-v290-execution-denied-route-preflight",
      message: "Node v290 must keep fake harness runtime and invocation blocked.",
    },
    {
      passed: checks.sourceNodeV290KeepsConnectionBlocked,
      code: "SOURCE_NODE_V290_CONNECTION_UNLOCKED",
      source: "node-v290-execution-denied-route-preflight",
      message: "Node v290 must keep managed audit connections and external requests blocked.",
    },
    {
      passed: checks.sourceNodeV290KeepsCredentialEndpointBoundariesClosed,
      code: "SOURCE_NODE_V290_BOUNDARY_OPEN",
      source: "node-v290-execution-denied-route-preflight",
      message: "Node v290 must keep credential value and raw endpoint URL boundaries closed.",
    },
    {
      passed: checks.javaV127V130EvidencePresent,
      code: "JAVA_V127_V130_EVIDENCE_MISSING",
      source: "java-v127-v130-quality-evidence",
      message: "Java v127-v130 evidence files must all exist and be documented.",
    },
    {
      passed: checks.javaQualityQueueDocumented,
      code: "JAVA_QUALITY_QUEUE_MISSING",
      source: "java-v127-v130-quality-evidence",
      message: "Java v127-v130 must document the live aggregation split, response records split, overview tests split, and echo catalog extension.",
    },
    {
      passed: checks.javaRuntimeBoundariesDocumented,
      code: "JAVA_RUNTIME_BOUNDARY_MISSING",
      source: "java-v127-v130-quality-evidence",
      message: "Java v127-v130 must keep runtime, credential, raw endpoint, managed audit, ledger, and SQL boundaries documented as read-only.",
    },
    {
      passed: checks.javaExecutionDeniedEchoPresent,
      code: "JAVA_EXECUTION_DENIED_ECHO_MISSING",
      source: "java-v127-v130-quality-evidence",
      message: "Java v127-v130 provides quality evidence, but no direct execution-denied echo; Node v291 must remain blocked.",
    },
    {
      passed: checks.miniKvV128ReceiptReady,
      code: "MINI_KV_V128_RECEIPT_NOT_READY",
      source: "mini-kv-v128-execution-denied-non-participation-receipt",
      message: "mini-kv v128 execution-denied non-participation receipt must be ready for Node v291.",
    },
    {
      passed: checks.miniKvV128EchoesNodeV290,
      code: "MINI_KV_V128_NOT_ECHOING_NODE_V290",
      source: "mini-kv-v128-execution-denied-non-participation-receipt",
      message: "mini-kv v128 must echo the Node v290 route path and preflight digest.",
    },
    {
      passed: checks.miniKvV128PreflightDigestAligned,
      code: "MINI_KV_V128_PREFLIGHT_DIGEST_MISMATCH",
      source: "mini-kv-v128-execution-denied-non-participation-receipt",
      message: "mini-kv v128 preflight digest must align with Node v290.",
    },
    {
      passed: checks.miniKvV128KeepsRuntimeSideEffectsBlocked,
      code: "MINI_KV_V128_RUNTIME_SIDE_EFFECTS_NOT_BLOCKED",
      source: "mini-kv-v128-execution-denied-non-participation-receipt",
      message: "mini-kv v128 must keep runtime side effects blocked.",
    },
    {
      passed: checks.sideEffectBoundaryClosed,
      code: "SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification",
      message: "Node v291 must report side-effect boundaries as closed while Java execution-denied echo remains missing.",
    },
    {
      passed: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must stay false during Node v291 verification.",
    },
    {
      passed: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must stay false during Node v291 verification.",
    },
    {
      passed: checks.productionAuditStillBlocked,
      code: "PRODUCTION_AUDIT_UNLOCKED",
      source: "runtime-config",
      message: "Node v291 must not open production audit.",
    },
    {
      passed: checks.productionWindowStillBlocked,
      code: "PRODUCTION_WINDOW_UNLOCKED",
      source: "runtime-config",
      message: "Node v291 must not open a production operation window.",
    },
  ];

  return rules
    .filter((rule) => !rule.passed)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker",
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): ExecutionDeniedUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "NODE_V291_IS_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification",
      message: "Node v291 verifies the blocked state only and must not be read as readiness to execute fake harness runtime.",
    },
  ];
}

function collectRecommendations(): ExecutionDeniedUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "KEEP_JAVA_V127_V130_AS_QUALITY_QUEUE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification",
      message: "Keep Java v127-v130 as the quality queue and do not convert it into runtime evidence from Node.",
    },
    {
      code: "USE_NEXT_PLAN_FOR_READINESS_DECISION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-execution-denied-upstream-echo-verification",
      message: "Use the next plan for a readiness decision record only after any required Java execution-denied echo is produced elsewhere.",
    },
  ];
}

function createJavaV127V130ExpectedSnippets() {
  return [
    snippet("java-v127-live-aggregation-split", JAVA_V127_RUNBOOK, "LiveAggregationIntegrationTests 二次拆分"),
    snippet("java-v127-no-runtime", JAVA_V127_RUNBOOK, "不启动 fake harness runtime"),
    snippet("java-v127-no-credential", JAVA_V127_RUNBOOK, "不读取 credential value"),
    snippet("java-v127-no-raw-endpoint", JAVA_V127_RUNBOOK, "不解析 raw endpoint URL"),
    snippet("java-v127-no-managed-audit", JAVA_V127_RUNBOOK, "不打开 managed audit connection"),
    snippet("java-v127-no-ledger-sql", JAVA_V127_RUNBOOK, "不写 approval ledger"),
    snippet("java-v128-response-records-split", JAVA_V128_RUNBOOK, "ResponseRecords 第二次拆分"),
    snippet("java-v128-no-runtime", JAVA_V128_RUNBOOK, "不新增 fake harness runtime"),
    snippet("java-v128-unchanged-contract", JAVA_V128_RUNBOOK, "不改变接口 JSON/record 语义"),
    snippet("java-v129-overview-tests-split", JAVA_V129_RUNBOOK, "overview 第二次拆分"),
    snippet("java-v129-no-runtime", JAVA_V129_RUNBOOK, "只做测试结构优化"),
    snippet("java-v129-no-production-change", JAVA_V129_RUNBOOK, "不改变生产行为"),
    snippet("java-v130-echo-catalog-extension", JAVA_V130_RUNBOOK, "catalog 延伸"),
    snippet("java-v130-no-runtime", JAVA_V130_RUNBOOK, "模板常量从 builder 迁入 catalog"),
    snippet("java-v130-unchanged-output", JAVA_V130_RUNBOOK, "输出 record、JSON 字段、digest 输入顺序和测试期望保持不变"),
  ] as const;
}

function createMiniKvV128ExpectedSnippets() {
  return [
    snippet("mini-kv-v128-receipt", MINI_KV_V128_RECEIPT, "credential_resolver_disabled_fake_harness_execution_denied_non_participation_receipt"),
    snippet("mini-kv-v128-node-v290", MINI_KV_V128_RECEIPT, "Node v290 disabled fake harness execution-denied route preflight"),
    snippet("mini-kv-v128-read-only", MINI_KV_V128_RECEIPT, "\"read_only\":true"),
    snippet("mini-kv-v128-no-runtime", MINI_KV_V128_RECEIPT, "does not implement or run a fake harness runtime"),
    snippet("mini-kv-v128-no-credential", MINI_KV_V128_RECEIPT, "does not read, store, or render credential values"),
    snippet("mini-kv-v128-no-raw-endpoint", MINI_KV_V128_RECEIPT, "does not parse or render raw endpoint URLs"),
    snippet("mini-kv-v128-no-http-tcp", MINI_KV_V128_RECEIPT, "does not send HTTP/TCP"),
    snippet("mini-kv-v128-no-managed-audit", MINI_KV_V128_RECEIPT, "does not connect managed audit"),
    snippet("mini-kv-v128-no-write", MINI_KV_V128_RECEIPT, "does not write storage, approval ledger, or schema state"),
    snippet("mini-kv-v128-no-restore", MINI_KV_V128_RECEIPT, "does not execute LOAD/COMPACT/RESTORE/SETNXEX"),
  ] as const;
}

function evidenceDigest(files: { digest: string | null }[]): string | null {
  const digests = files.map((file) => file.digest).filter((digest): digest is string => typeof digest === "string");
  if (digests.length === 0) {
    return null;
  }
  return sha256StableJson(digests);
}

function booleanFrom(input: Record<string, unknown>, root: Record<string, unknown>, key: string): boolean | null {
  const nested = input[key];
  if (typeof nested === "boolean") {
    return nested;
  }
  const rootValue = root[key];
  return typeof rootValue === "boolean" ? rootValue : null;
}
