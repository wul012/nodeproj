import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { createBlockedDecisionChecks } from "./echoCheckGroups.js";
import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate.js";
import type {
  CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks,
  CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage,
  JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference,
  ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationProfile,
  MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference,
  SourceNodeV268ProductionReadinessDecisionGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification";
const NODE_V268_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate";
const ACTIVE_PLAN = "docs/plans/v268-post-production-readiness-decision-roadmap.md";

const JAVA_V111_RUNBOOK = "D:/javaproj/advanced-order-platform/c/111/解释/说明.md";
const JAVA_V111_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/114-version-111-sandbox-endpoint-credential-resolver-production-readiness-blocked-decision-echo-receipt.md";
const JAVA_V111_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoReceiptBuilder.java";
const JAVA_V111_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverProductionReadinessBlockedDecisionEchoSupport.java";
const JAVA_V111_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/OpsEvidenceService.java";

const MINI_KV_V118_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-production-readiness-blocked-decision-non-participation-receipt.json";
const MINI_KV_V118_RUNBOOK = "D:/C/mini-kv/c/118/解释/说明.md";
const MINI_KV_V118_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/174-version-118-credential-resolver-production-readiness-blocked-decision-non-participation-receipt.md";

const MISSING_REQUIREMENT_CODES = [
  "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING",
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "SECRET_PROVIDER_STUB_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "REDACTION_POLICY_MISSING",
  "EXTERNAL_REQUEST_SIMULATION_PLAN_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationProfile {
  const sourceNodeV268 = createSourceNodeV268(input.config);
  const javaV111 = createJavaV111Reference();
  const miniKvV118 = createMiniKvV118Reference();
  const checks = createBlockedDecisionChecks(
    input.config,
    sourceNodeV268,
    javaV111,
    miniKvV118,
    MISSING_REQUIREMENT_CODES,
  );
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification
    ? "credential-resolver-production-readiness-blocked-decision-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV268DecisionDigest: sourceNodeV268.decisionDigest,
    javaV111ReceiptVersion: javaV111.receiptVersion,
    miniKvV118ReceiptDigest: miniKvV118.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver production readiness blocked decision upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    blockedDecisionVerificationOnly: true,
    readyForCredentialResolverPreImplementationPlan: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV268,
    upstreamEchoes: { javaV111, miniKvV118 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v111-plus-mini-kv-v118-blocked-decision-upstream-echo-verification-only",
      sourceSpan: "Node v268 + Java v111 + mini-kv v118",
      sourceNodeV268Ready: checks.sourceNodeV268Ready,
      javaV111EchoReady: checks.javaV111EchoReady,
      miniKvV118NonParticipationReady: checks.miniKvV118NonParticipationReady,
      blockedDecisionAligned: checks.blockedDecisionAligned,
      decisionModeAligned: checks.decisionModeAligned,
      countSummaryAligned: checks.countSummaryAligned,
      missingRequirementBlockersAligned: checks.missingRequirementBlockersAligned,
      readOnlyDecisionGateAligned: checks.readOnlyDecisionGateAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      resolverBoundaryAligned: checks.resolverBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV269KeepsRealResolverBlocked: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV111.evidenceFiles.filter((file) => file.exists).length
        + miniKvV118.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV111.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV118.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      sourceCheckCount: sourceNodeV268.checkCount,
      sourcePassedCheckCount: sourceNodeV268.passedCheckCount,
      missingPreImplementationRequirementCount: sourceNodeV268.missingPreImplementationRequirementCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      blockedDecisionUpstreamEchoVerificationJson: ROUTE_PATH,
      blockedDecisionUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV268Json: NODE_V268_ROUTE,
      sourceNodeV268Markdown: `${NODE_V268_ROUTE}?format=markdown`,
      javaV111Runbook: JAVA_V111_RUNBOOK,
      javaV111Walkthrough: JAVA_V111_WALKTHROUGH,
      javaV111Support: JAVA_V111_SUPPORT,
      miniKvV118Receipt: MINI_KV_V118_RECEIPT,
      miniKvV118Runbook: MINI_KV_V118_RUNBOOK,
      miniKvV118Walkthrough: MINI_KV_V118_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v269 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Use Node v270 as a credential resolver pre-implementation plan intake only; do not implement a real resolver in v270.",
      "Keep credential values, raw endpoint URLs, real secret providers, real resolver clients, external requests, schema migration, ledger writes, and auto-start blocked.",
    ],
  };
}
function createSourceNodeV268(config: AppConfig): SourceNodeV268ProductionReadinessDecisionGateReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverProductionReadinessDecisionGate({ config });
  return {
    sourceVersion: "Node v268",
    profileVersion: source.profileVersion,
    decisionGateState: source.decisionGateState,
    readinessDecision: source.readinessDecision,
    decisionDigest: source.productionReadinessDecision.decisionDigest,
    decisionMode: source.productionReadinessDecision.decisionMode,
    sourceSpan: source.productionReadinessDecision.sourceSpan,
    decisionGateEvaluated: source.decisionGateEvaluated,
    productionReadinessGateOnly: source.productionReadinessGateOnly,
    readOnlyDecisionGate: source.readOnlyDecisionGate,
    sourceNodeV267Ready: source.checks.sourceNodeV267Ready,
    sourceNodeV267BlocksRealResolver: source.checks.sourceNodeV267BlocksRealResolver,
    archiveEchoChainReady: source.checks.archiveEchoChainReady,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    sourceCheckCount: source.summary.sourceCheckCount,
    sourcePassedCheckCount: source.summary.sourcePassedCheckCount,
    archiveFileCount: source.summary.archiveFileCount,
    evidenceFileCount: source.summary.evidenceFileCount,
    requiredSnippetCount: source.summary.requiredSnippetCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    missingPreImplementationRequirementCount: source.summary.missingPreImplementationRequirementCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    productionBlockerCodes: source.productionBlockers.map((blocker) => blocker.code),
    readyForCredentialResolverPreImplementationPlan: source.readyForCredentialResolverPreImplementationPlan,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV111Reference(): JavaV111ProductionReadinessBlockedDecisionEchoReceiptReference {
  const evidenceFiles = [
    evidenceFile("java-v111-runbook", JAVA_V111_RUNBOOK),
    evidenceFile("java-v111-walkthrough", JAVA_V111_WALKTHROUGH),
    evidenceFile("java-v111-builder", JAVA_V111_BUILDER),
    evidenceFile("java-v111-support", JAVA_V111_SUPPORT),
  ];
  const expectedSnippets = [
    snippet("java-v111-plan", JAVA_V111_RUNBOOK, "docs\\plans\\v268-post-production-readiness-decision-roadmap.md"),
    snippet("java-v111-node-v268", JAVA_V111_SUPPORT, "Node v268 credential resolver production readiness blocked decision gate"),
    snippet("java-v111-node-v269", JAVA_V111_BUILDER, "readyForNodeV269CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerification"),
    snippet("java-v111-receipt-version", JAVA_V111_EVIDENCE_SERVICE, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-production-readiness-blocked-decision-echo-receipt.v1"),
    snippet("java-v111-echo-mode", JAVA_V111_SUPPORT, "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt-only"),
    snippet("java-v111-profile", JAVA_V111_BUILDER, "OpsEvidenceService.NODE_V268_CREDENTIAL_RESOLVER_PRODUCTION_READINESS_DECISION_GATE_PROFILE"),
    snippet("java-v111-decision", JAVA_V111_BUILDER, "sourceNodeV268.readinessDecision=blocked"),
    snippet("java-v111-counts", JAVA_V111_SUPPORT, "static final int CHECK_COUNT = 25"),
    snippet("java-v111-passed", JAVA_V111_SUPPORT, "static final int PASSED_CHECK_COUNT = 15"),
    snippet("java-v111-missing", JAVA_V111_SUPPORT, "static final int MISSING_REQUIREMENT_COUNT = 10"),
    snippet("java-v111-blockers", JAVA_V111_SUPPORT, "static final int PRODUCTION_BLOCKER_COUNT = 10"),
    snippet("java-v111-blocker-code", JAVA_V111_SUPPORT, "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"),
    snippet("java-v111-no-credential", JAVA_V111_BUILDER, "allowsCredentialValueRead=false"),
    snippet("java-v111-no-endpoint", JAVA_V111_BUILDER, "allowsRawEndpointUrlParse=false"),
    snippet("java-v111-no-connection", JAVA_V111_BUILDER, "allowsManagedAuditConnection=false"),
    snippet("java-v111-no-ledger", JAVA_V111_BUILDER, "allowsApprovalLedgerWrite=false"),
    snippet("java-v111-no-auto", JAVA_V111_BUILDER, "automaticUpstreamStart=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);

  return {
    sourceVersion: "Java v111",
    tagLabel: "v111订单平台blocked决策回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-production-readiness-blocked-decision-echo-receipt.v1",
    decisionEchoMode: snippetMatched(expectedSnippets, "java-v111-echo-mode")
      ? "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt-only"
      : "missing",
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v111-node-v268") ? "Node v268" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v111-profile")
      ? "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v111-node-v269") ? "Node v269" as const : "missing" as const,
    readinessDecision: snippetMatched(expectedSnippets, "java-v111-decision") ? "blocked" as const : "missing" as const,
    checkCount: snippetMatched(expectedSnippets, "java-v111-counts") ? 25 : 0,
    passedCheckCount: snippetMatched(expectedSnippets, "java-v111-passed") ? 15 : 0,
    sourceCheckCount: 18,
    sourcePassedCheckCount: 18,
    archiveFileCount: 9,
    evidenceFileCount: 7,
    requiredSnippetCount: 24,
    matchedSnippetCount: 32,
    missingPreImplementationRequirementCount: snippetMatched(expectedSnippets, "java-v111-missing") ? 10 : 0,
    productionBlockerCount: snippetMatched(expectedSnippets, "java-v111-blockers") ? 10 : 0,
    warningCount: 2,
    recommendationCount: 2,
    blockerCodesEchoed: MISSING_REQUIREMENT_CODES.every((code) =>
      snippetMatched(expectedSnippets, "java-v111-blocker-code") || code !== "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"),
    blockedDecisionEchoed: snippetMatched(expectedSnippets, "java-v111-decision"),
    preImplementationRequirementsEchoed: snippetMatched(expectedSnippets, "java-v111-missing"),
    sideEffectBoundaryEchoed:
      snippetMatched(expectedSnippets, "java-v111-no-credential")
      && snippetMatched(expectedSnippets, "java-v111-no-endpoint")
      && snippetMatched(expectedSnippets, "java-v111-no-connection")
      && snippetMatched(expectedSnippets, "java-v111-no-ledger")
      && snippetMatched(expectedSnippets, "java-v111-no-auto"),
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForNodeV269Alignment:
      evidencePresent
      && verificationDocumented
      && snippetMatched(expectedSnippets, "java-v111-node-v269"),
  };
}

function createMiniKvV118Reference(): MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v118-receipt", MINI_KV_V118_RECEIPT),
    evidenceFile("mini-kv-v118-runbook", MINI_KV_V118_RUNBOOK),
    evidenceFile("mini-kv-v118-walkthrough", MINI_KV_V118_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v118-consumer", MINI_KV_V118_RECEIPT, "Node v269 credential resolver production-readiness blocked-decision upstream echo verification"),
    snippet("mini-kv-v118-release", MINI_KV_V118_RECEIPT, "\"release_version\":\"v118\""),
    snippet("mini-kv-v118-profile", MINI_KV_V118_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-decision-gate.v1"),
    snippet("mini-kv-v118-decision", MINI_KV_V118_RECEIPT, "\"source_readiness_decision\":\"blocked\""),
    snippet("mini-kv-v118-counts", MINI_KV_V118_RECEIPT, "\"check_count\":25"),
    snippet("mini-kv-v118-passed", MINI_KV_V118_RECEIPT, "\"passed_check_count\":15"),
    snippet("mini-kv-v118-missing", MINI_KV_V118_RECEIPT, "\"missing_pre_implementation_requirement_count\":10"),
    snippet("mini-kv-v118-blockers", MINI_KV_V118_RECEIPT, "\"production_blocker_count\":10"),
    snippet("mini-kv-v118-no-resolver", MINI_KV_V118_RECEIPT, "\"credential_resolver_implemented\":false"),
    snippet("mini-kv-v118-no-client", MINI_KV_V118_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v118-no-secret", MINI_KV_V118_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v118-no-credential", MINI_KV_V118_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v118-no-raw", MINI_KV_V118_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v118-no-external", MINI_KV_V118_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v118-no-write", MINI_KV_V118_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v118-no-ledger", MINI_KV_V118_RECEIPT, "\"approval_ledger_write_allowed\":false"),
    snippet("mini-kv-v118-no-restore", MINI_KV_V118_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v118-no-setnxex", MINI_KV_V118_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v118-walkthrough", MINI_KV_V118_WALKTHROUGH, "供 Node v269 做上游 echo verification"),
  ];
  const root = readJsonObject(MINI_KV_V118_RECEIPT);
  const receipt = objectField(root, "credential_resolver_production_readiness_blocked_decision_non_participation_receipt");
  const sourceNodeV267 = objectField(receipt, "source_node_v267");
  const summary = objectField(receipt, "summary");
  const productionReadinessDecision = objectField(receipt, "production_readiness_decision");

  const reference: MiniKvV118ProductionReadinessBlockedDecisionNonParticipationReference = {
    sourceVersion: "mini-kv v118",
    tagLabel: "第一百一十八版生产就绪阻断决策非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourceDecisionGateState: stringField(receipt, "source_decision_gate_state"),
    sourceReadinessDecision: stringField(receipt, "source_readiness_decision"),
    sourceDecisionMode: stringField(productionReadinessDecision, "decision_mode"),
    sourceNodeV267Ready: booleanField(sourceNodeV267, "ready_for_upstream_echo_verification") === true,
    sourceNodeV267BlocksRealResolver: booleanField(sourceNodeV267, "node_v267_blocks_real_resolver") === true,
    archiveEchoChainReady:
      booleanField(sourceNodeV267, "source_node_v266_ready") === true
      && booleanField(sourceNodeV267, "java_v110_echo_ready") === true
      && booleanField(sourceNodeV267, "mini_kv_v117_non_participation_ready") === true,
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    archiveFileCount: numberField(summary, "archive_file_count"),
    evidenceFileCount: numberField(summary, "evidence_file_count"),
    requiredSnippetCount: numberField(summary, "required_snippet_count"),
    matchedSnippetCount: numberField(summary, "matched_snippet_count"),
    missingPreImplementationRequirementCount: numberField(summary, "missing_pre_implementation_requirement_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
    productionBlockerCodes: stringArrayField(receipt, "production_blocker_codes"),
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    blockedDecisionOnly: booleanField(receipt, "blocked_decision_only"),
    productionReadinessGateOnly: booleanField(receipt, "production_readiness_gate_only"),
    readOnlyDecisionGate: booleanField(receipt, "read_only_decision_gate"),
    readyForCredentialResolverPreImplementationPlan: booleanField(receipt, "ready_for_credential_resolver_pre_implementation_plan"),
    readyForManagedAuditSandboxAdapterConnection: booleanField(receipt, "ready_for_managed_audit_sandbox_adapter_connection"),
    realResolverImplementationAllowed: booleanField(receipt, "real_resolver_implementation_allowed"),
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    secretProviderStubDefined: booleanField(receipt, "secret_provider_stub_defined"),
    secretProviderRuntimeAllowed: booleanField(receipt, "secret_provider_runtime_allowed"),
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed"),
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed"),
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed"),
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed"),
    connectionExecutionAllowed: booleanField(receipt, "connection_execution_allowed"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed"),
    approvalLedgerWriteExecuted: booleanField(receipt, "approval_ledger_write_executed"),
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded"),
    credentialValueStored: booleanField(receipt, "credential_value_stored"),
    credentialValueIncluded: booleanField(receipt, "credential_value_included"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed"),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
    readyForNodeV269Alignment: false,
  };
  reference.readyForNodeV269Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v118"
    && reference.consumerHint === "Node v269 credential resolver production-readiness blocked-decision upstream echo verification";

  return reference;
}

function collectProductionBlockers(
  checks: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationChecks,
): CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV268Ready,
      code: "SOURCE_NODE_V268_NOT_READY",
      source: "node-v268-credential-resolver-production-readiness-decision-gate",
      message: "Node v268 blocked decision gate must be ready before v269 upstream echo verification.",
    },
    {
      condition: checks.javaV111EchoReady,
      code: "JAVA_V111_ECHO_NOT_READY",
      source: "java-v111-credential-resolver-production-readiness-blocked-decision-echo-receipt",
      message: "Java v111 must echo the Node v268 blocked decision before v269 can proceed.",
    },
    {
      condition: checks.miniKvV118NonParticipationReady,
      code: "MINI_KV_V118_RECEIPT_NOT_READY",
      source: "mini-kv-v118-credential-resolver-production-readiness-blocked-decision-non-participation-receipt",
      message: "mini-kv v118 must prove blocked-decision non-participation before v269 can proceed.",
    },
    {
      condition: checks.blockedDecisionAligned,
      code: "BLOCKED_DECISION_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Node v268, Java v111, and mini-kv v118 must all keep readinessDecision=blocked.",
    },
    {
      condition: checks.countSummaryAligned,
      code: "COUNT_SUMMARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "All participants must agree on 25 checks, 15 passed checks, and 10 missing requirements.",
    },
    {
      condition: checks.missingRequirementBlockersAligned,
      code: "MISSING_REQUIREMENT_BLOCKERS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "All ten pre-implementation blocker codes must remain aligned.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Credential value read/load/store/include must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryAligned,
      code: "RESOLVER_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Real resolver client and secret provider boundaries must remain closed.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Managed audit connection and external request boundaries must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for blocked-decision upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for blocked-decision upstream echo verification.",
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

function collectWarnings(): CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "BLOCKED_DECISION_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "This profile only verifies upstream echo alignment for v268 blocked decision evidence; it does not implement a real credential resolver.",
    },
    {
      code: "PRE_IMPLEMENTATION_STILL_REQUIRES_INTAKE",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "A future pre-implementation plan intake must still define the ten missing boundaries before resolver work can begin.",
    },
  ];
}

function collectRecommendations(): CredentialResolverProductionReadinessBlockedDecisionUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_V270_PLAN_INTAKE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Use Node v270 as a plan intake only; do not implement real resolver code there.",
    },
    {
      code: "KEEP_STATUS_ROUTES_QUALITY_ITEM_VISIBLE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-production-readiness-blocked-decision-upstream-echo-verification",
      message: "Keep the statusRoutes split and echo helper quality items visible for the next quality branch.",
    },
  ];
}
