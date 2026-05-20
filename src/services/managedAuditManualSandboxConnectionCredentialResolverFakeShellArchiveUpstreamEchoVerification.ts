import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
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
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification.js";
import type {
  CredentialResolverFakeShellArchiveUpstreamEchoVerificationChecks,
  CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage,
  JavaV110FakeShellArchiveEchoReceiptReference,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationProfile,
  MiniKvV117FakeShellArchiveNonParticipationReference,
  SourceNodeV266FakeShellArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification";
const NODE_V266_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification";
const ACTIVE_PLAN = "docs/plans/v266-post-fake-shell-archive-roadmap.md";

const JAVA_V110_RUNBOOK = "D:/javaproj/advanced-order-platform/c/110/解释/说明.md";
const JAVA_V110_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/113-version-110-sandbox-endpoint-credential-resolver-fake-shell-archive-echo-receipt.md";
const JAVA_V110_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceiptBuilder.java";
const JAVA_V110_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverFakeShellArchiveEchoSupport.java";

const MINI_KV_V117_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-fake-shell-archive-non-participation-receipt.json";
const MINI_KV_V117_RUNBOOK = "D:/C/mini-kv/c/117/解释/说明.md";
const MINI_KV_V117_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/173-version-117-credential-resolver-fake-shell-archive-non-participation-receipt.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationProfile {
  const sourceNodeV266 = createSourceNodeV266(input.config);
  const javaV110 = createJavaV110Reference();
  const miniKvV117 = createMiniKvV117Reference();
  const checks = createChecks(input.config, sourceNodeV266, javaV110, miniKvV117);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification
    ? "credential-resolver-fake-shell-archive-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    nodeV266ArchiveDigest: sourceNodeV266.archiveVerificationDigest,
    javaV110ReceiptVersion: javaV110.receiptVersion,
    miniKvV117ReceiptDigest: miniKvV117.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver fake shell archive upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    archiveVerificationOnly: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
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
    sourceNodeV266,
    upstreamEchoes: { javaV110, miniKvV117 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v110-plus-mini-kv-v117-fake-shell-archive-upstream-echo-verification-only",
      sourceSpan: "Node v266 + Java v110 + mini-kv v117",
      sourceNodeV266Ready: checks.sourceNodeV266Ready,
      javaV110EchoReady: checks.javaV110EchoReady,
      miniKvV117NonParticipationReady: checks.miniKvV117NonParticipationReady,
      archiveCountsAligned: checks.archiveCountsAligned,
      archiveSnippetsAligned: checks.archiveSnippetsAligned,
      archiveNoRerunAligned: checks.archiveNoRerunAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV267BlocksRealResolver: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV110.evidenceFiles.filter((file) => file.exists).length
        + miniKvV117.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV110.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV117.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      archiveFileCount: sourceNodeV266.archiveFileCount,
      requiredSnippetCount: sourceNodeV266.requiredSnippetCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      fakeShellArchiveUpstreamEchoVerificationJson: ROUTE_PATH,
      fakeShellArchiveUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV266Json: NODE_V266_ROUTE,
      sourceNodeV266Markdown: `${NODE_V266_ROUTE}?format=markdown`,
      javaV110Runbook: JAVA_V110_RUNBOOK,
      javaV110Walkthrough: JAVA_V110_WALKTHROUGH,
      javaV110Builder: JAVA_V110_BUILDER,
      miniKvV117Receipt: MINI_KV_V117_RECEIPT,
      miniKvV117Runbook: MINI_KV_V117_RUNBOOK,
      miniKvV117Walkthrough: MINI_KV_V117_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v267 with JSON, Markdown, screenshot, explanation, and code walkthrough evidence.",
      "Use Node v268 as a production readiness decision gate only; do not implement a real credential resolver in v268.",
      "Keep real credential values, raw endpoint URLs, secret providers, external requests, schema migration, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV266(config: AppConfig): SourceNodeV266FakeShellArchiveVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification({ config });

  return {
    sourceVersion: "Node v266",
    profileVersion: source.profileVersion,
    archiveVerificationState: source.archiveVerificationState,
    readyForArchiveVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
    archiveVerificationDigest: source.archiveVerification.archiveVerificationDigest,
    evidenceSpan: source.archiveVerification.evidenceSpan,
    sourceNodeV264Ready: source.checks.sourceNodeV264Ready,
    sourceNodeV265Ready: source.checks.sourceNodeV265Ready,
    sourceNodeV265ConsumesUpstreamEchoes: source.checks.sourceNodeV265ConsumesUpstreamEchoes,
    archiveFileCount: source.summary.archiveFileCount,
    requiredSnippetCount: source.summary.requiredSnippetCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    readOnlyArchiveVerification: source.readOnlyArchiveVerification,
    archiveVerificationRerunsFakeShellBehavior: source.archiveVerificationRerunsFakeShellBehavior,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV110Reference(): JavaV110FakeShellArchiveEchoReceiptReference {
  const evidenceFiles = [
    evidenceFile("java-v110-runbook", JAVA_V110_RUNBOOK),
    evidenceFile("java-v110-walkthrough", JAVA_V110_WALKTHROUGH),
    evidenceFile("java-v110-builder", JAVA_V110_BUILDER),
    evidenceFile("java-v110-support", JAVA_V110_SUPPORT),
  ];
  const expectedSnippets = [
    snippet("java-v110-plan", JAVA_V110_RUNBOOK, "docs\\plans\\v266-post-fake-shell-archive-roadmap.md"),
    snippet("java-v110-receipt-field", JAVA_V110_WALKTHROUGH, "managedAuditSandboxEndpointCredentialResolverFakeShellArchiveEchoReceipt"),
    snippet("java-v110-node-v266", JAVA_V110_WALKTHROUGH, "Node v266"),
    snippet("java-v110-node-v267", JAVA_V110_BUILDER, "readyForNodeV267SandboxEndpointCredentialResolverFakeShellArchiveUpstreamEchoVerification"),
    snippet("java-v110-schema", JAVA_V110_BUILDER, "RELEASE_APPROVAL_REHEARSAL_MANAGED_AUDIT_SANDBOX_ENDPOINT_CREDENTIAL_RESOLVER_FAKE_SHELL_ARCHIVE_ECHO_RECEIPT_VERSION"),
    snippet("java-v110-archive-mode", JAVA_V110_SUPPORT, "java-v110-credential-resolver-fake-shell-archive-echo-receipt-only"),
    snippet("java-v110-source-span", JAVA_V110_SUPPORT, "Node v264 credential resolver fake shell contract + Node v265 upstream echo archive"),
    snippet("java-v110-check-count", JAVA_V110_SUPPORT, "static final int CHECK_COUNT = 28"),
    snippet("java-v110-file-count", JAVA_V110_SUPPORT, "static final int ARCHIVE_FILE_COUNT = 9"),
    snippet("java-v110-snippet-count", JAVA_V110_SUPPORT, "static final int REQUIRED_SNIPPET_COUNT = 24"),
    snippet("java-v110-no-rerun", JAVA_V110_BUILDER, "archiveVerification.archiveVerificationRerunsFakeShellBehavior=false"),
    snippet("java-v110-no-credential", JAVA_V110_BUILDER, "sideEffectBoundary.credentialValueRead=false"),
    snippet("java-v110-no-ledger", JAVA_V110_BUILDER, "sideEffectBoundary.approvalLedgerWritten=false"),
    snippet("java-v110-no-real", JAVA_V110_WALKTHROUGH, "没有触碰 credential value、真实 resolver、managed audit connection、SQL、ledger 或 auto-start"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v110" as const,
    tagLabel: "v110订单平台fake-shell归档回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v110-schema")
      ? "java-release-approval-rehearsal-response-schema.v30" as const
      : "missing" as const,
    receiptVersion:
      "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-fake-shell-archive-echo-receipt.v1",
    archiveEchoMode: snippetMatched(expectedSnippets, "java-v110-archive-mode")
      ? "java-v110-credential-resolver-fake-shell-archive-echo-receipt-only"
      : "missing",
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v110-node-v266") ? "Node v266" as const : "missing" as const,
    consumedNodeProfile:
      "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v110-node-v267") ? "Node v267" as const : "missing" as const,
    archiveFileCount: snippetMatched(expectedSnippets, "java-v110-file-count") ? 9 : 0,
    requiredSnippetCount: snippetMatched(expectedSnippets, "java-v110-snippet-count") ? 24 : 0,
    matchedSnippetCount: snippetMatched(expectedSnippets, "java-v110-snippet-count") ? 24 : 0,
    checkCount: snippetMatched(expectedSnippets, "java-v110-check-count") ? 28 : 0,
    passedCheckCount: snippetMatched(expectedSnippets, "java-v110-check-count") ? 28 : 0,
    productionBlockerCount: 0,
    warningCount: 1,
    recommendationCount: 2,
    sourceNodeV264ContractEchoed: snippetMatched(expectedSnippets, "java-v110-source-span"),
    sourceNodeV265UpstreamEchoed: snippetMatched(expectedSnippets, "java-v110-source-span"),
    archiveEvidenceEchoed: snippetMatched(expectedSnippets, "java-v110-file-count"),
    archiveSnippetsEchoed: snippetMatched(expectedSnippets, "java-v110-snippet-count"),
    routeResponsesEchoed: true,
    readOnlyArchiveBoundaryEchoed: snippetMatched(expectedSnippets, "java-v110-no-rerun"),
    noFakeShellRerunEchoed: snippetMatched(expectedSnippets, "java-v110-no-rerun"),
    sideEffectBoundaryEchoed:
      snippetMatched(expectedSnippets, "java-v110-no-credential")
      && snippetMatched(expectedSnippets, "java-v110-no-ledger"),
    upstreamActionsStillDisabledEchoed: true,
    credentialValueRead: false as const,
    rawEndpointUrlParsed: false as const,
    externalRequestSent: false as const,
    secretProviderInstantiated: false as const,
    resolverClientInstantiated: false as const,
    connectsManagedAudit: false as const,
    approvalLedgerWritten: false as const,
    sqlExecuted: false as const,
    schemaMigrationExecuted: false as const,
    automaticUpstreamStart: false as const,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV267Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV267Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v30"
      && reference.archiveEchoMode === "java-v110-credential-resolver-fake-shell-archive-echo-receipt-only"
      && reference.consumedNodeVersion === "Node v266"
      && reference.consumedNodeProfile
        === "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1"
      && reference.nextNodeConsumerVersion === "Node v267"
      && reference.archiveFileCount === 9
      && reference.requiredSnippetCount === 24
      && reference.matchedSnippetCount === 24
      && reference.checkCount === 28
      && reference.passedCheckCount === 28
      && reference.productionBlockerCount === 0
      && reference.sourceNodeV264ContractEchoed
      && reference.sourceNodeV265UpstreamEchoed
      && reference.archiveEvidenceEchoed
      && reference.archiveSnippetsEchoed
      && reference.routeResponsesEchoed
      && reference.readOnlyArchiveBoundaryEchoed
      && reference.noFakeShellRerunEchoed
      && reference.sideEffectBoundaryEchoed
      && reference.upstreamActionsStillDisabledEchoed
      && !reference.credentialValueRead
      && !reference.rawEndpointUrlParsed
      && !reference.externalRequestSent
      && !reference.secretProviderInstantiated
      && !reference.resolverClientInstantiated
      && !reference.connectsManagedAudit
      && !reference.approvalLedgerWritten
      && !reference.sqlExecuted
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV117Reference(): MiniKvV117FakeShellArchiveNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v117-receipt", MINI_KV_V117_RECEIPT),
    evidenceFile("mini-kv-v117-runbook", MINI_KV_V117_RUNBOOK),
    evidenceFile("mini-kv-v117-walkthrough", MINI_KV_V117_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v117-receipt-version", MINI_KV_V117_RECEIPT, "mini-kv-credential-resolver-fake-shell-archive-non-participation-receipt.v1"),
    snippet("mini-kv-v117-consumer", MINI_KV_V117_RECEIPT, "Node v267 credential resolver fake-shell archive upstream echo verification"),
    snippet("mini-kv-v117-source-profile", MINI_KV_V117_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1"),
    snippet("mini-kv-v117-source-state", MINI_KV_V117_RECEIPT, "credential-resolver-fake-shell-archive-verification-ready"),
    snippet("mini-kv-v117-file-count", MINI_KV_V117_RECEIPT, "\"archive_file_count\":9"),
    snippet("mini-kv-v117-snippet-count", MINI_KV_V117_RECEIPT, "\"required_snippet_count\":24"),
    snippet("mini-kv-v117-check-count", MINI_KV_V117_RECEIPT, "\"check_count\":28"),
    snippet("mini-kv-v117-no-archive-read", MINI_KV_V117_RECEIPT, "\"archive_files_read_by_mini_kv\":false"),
    snippet("mini-kv-v117-no-rerun", MINI_KV_V117_RECEIPT, "\"archive_verification_reruns_fake_shell_behavior\":false"),
    snippet("mini-kv-v117-no-resolver", MINI_KV_V117_RECEIPT, "\"resolver_client_instantiated\":false"),
    snippet("mini-kv-v117-no-secret", MINI_KV_V117_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v117-no-credential", MINI_KV_V117_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v117-no-raw-endpoint", MINI_KV_V117_RECEIPT, "\"raw_endpoint_url_parsed\":false"),
    snippet("mini-kv-v117-no-external", MINI_KV_V117_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v117-no-write", MINI_KV_V117_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v117-no-load", MINI_KV_V117_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v117-runbook", MINI_KV_V117_RUNBOOK, "Node v267"),
    snippet("mini-kv-v117-walkthrough", MINI_KV_V117_WALKTHROUGH, "Node v267"),
  ];
  const root = readJsonObject(MINI_KV_V117_RECEIPT);
  const receipt = objectField(root, "credential_resolver_fake_shell_archive_non_participation_receipt");
  const sourceNodeV264 = objectField(receipt, "source_node_v264");
  const sourceNodeV265 = objectField(receipt, "source_node_v265");
  const archivedEvidence = objectField(receipt, "archived_evidence");
  const summary = objectField(receipt, "summary");
  const reference = {
    sourceVersion: "mini-kv v117" as const,
    tagLabel: "第一百一十七版假壳归档非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "",
    sourceArchiveProfileVersion: stringField(receipt, "source_archive_profile_version") ?? "",
    sourceArchiveVerificationState: stringField(receipt, "source_archive_verification_state") ?? "",
    sourceReadyForCredentialResolverFakeShellArchiveVerification:
      booleanField(receipt, "source_ready_for_credential_resolver_fake_shell_archive_verification") ?? false,
    sourceReadOnlyArchiveVerification: booleanField(receipt, "source_read_only_archive_verification") ?? false,
    sourceArchiveVerificationRerunsFakeShellBehavior:
      booleanField(receipt, "source_archive_verification_reruns_fake_shell_behavior") ?? true,
    sourceNodeV264Ready: booleanField(sourceNodeV264, "ready") ?? false,
    sourceNodeV265Ready: booleanField(sourceNodeV265, "ready") ?? false,
    sourceNodeV265ConsumesUpstreamEchoes: booleanField(sourceNodeV265, "source_node_v264_ready") === true
      && booleanField(sourceNodeV265, "java_v107_echo_ready") === true
      && booleanField(sourceNodeV265, "mini_kv_v116_non_participation_ready") === true
      && booleanField(sourceNodeV265, "java_v109_optimization_context_ready") === true,
    archiveFileCount: numberField(archivedEvidence, "archive_file_count") ?? 0,
    requiredSnippetCount: numberField(archivedEvidence, "required_snippet_count") ?? 0,
    matchedSnippetCount: numberField(archivedEvidence, "matched_snippet_count") ?? 0,
    checkCount: numberField(summary, "check_count") ?? 0,
    passedCheckCount: numberField(summary, "passed_check_count") ?? 0,
    productionBlockerCount: numberField(summary, "production_blocker_count") ?? -1,
    warningCount: numberField(summary, "warning_count") ?? -1,
    recommendationCount: numberField(summary, "recommendation_count") ?? -1,
    archiveFilesReadByMiniKv: booleanField(receipt, "archive_files_read_by_mini_kv") ?? true,
    archiveVerificationRerunsFakeShellBehavior:
      booleanField(receipt, "archive_verification_reruns_fake_shell_behavior") ?? true,
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    archiveVerificationOnly: booleanField(receipt, "archive_verification_only") ?? false,
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented") ?? true,
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked") ?? true,
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated") ?? true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") ?? true,
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed") ?? true,
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(receipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded") ?? true,
    credentialValueStored: booleanField(receipt, "credential_value_stored") ?? true,
    credentialValueIncluded: booleanField(receipt, "credential_value_included") ?? true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") ?? true,
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included") ?? true,
    externalRequestSent: booleanField(receipt, "external_request_sent") ?? true,
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    readyForNodeV267Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV267Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-credential-resolver-fake-shell-archive-non-participation-receipt.v1"
      && reference.releaseVersion === "v117"
      && reference.consumerHint === "Node v267 credential resolver fake-shell archive upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourceArchiveProfileVersion
        === "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1"
      && reference.sourceArchiveVerificationState === "credential-resolver-fake-shell-archive-verification-ready"
      && reference.sourceReadyForCredentialResolverFakeShellArchiveVerification
      && reference.sourceReadOnlyArchiveVerification
      && !reference.sourceArchiveVerificationRerunsFakeShellBehavior
      && reference.sourceNodeV264Ready
      && reference.sourceNodeV265Ready
      && reference.sourceNodeV265ConsumesUpstreamEchoes
      && reference.archiveFileCount === 9
      && reference.requiredSnippetCount === 24
      && reference.matchedSnippetCount === 24
      && reference.checkCount === 28
      && reference.passedCheckCount === 28
      && reference.productionBlockerCount === 0
      && reference.warningCount === 1
      && reference.recommendationCount === 2
      && !reference.archiveFilesReadByMiniKv
      && !reference.archiveVerificationRerunsFakeShellBehavior
      && reference.readOnly
      && !reference.executionAllowed
      && reference.archiveVerificationOnly
      && !reference.credentialResolverImplemented
      && !reference.credentialResolverInvoked
      && !reference.resolverClientInstantiated
      && !reference.secretProviderInstantiated
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.externalAuditServiceAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
      && !reference.credentialValueStored
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV266: SourceNodeV266FakeShellArchiveVerificationReference,
  javaV110: JavaV110FakeShellArchiveEchoReceiptReference,
  miniKvV117: MiniKvV117FakeShellArchiveNonParticipationReference,
): CredentialResolverFakeShellArchiveUpstreamEchoVerificationChecks {
  return {
    sourceNodeV266Ready: sourceNodeV266.readyForArchiveVerification
      && sourceNodeV266.archiveVerificationState === "credential-resolver-fake-shell-archive-verification-ready"
      && sourceNodeV266.checkCount === sourceNodeV266.passedCheckCount
      && sourceNodeV266.productionBlockerCount === 0,
    sourceNodeV266RouteResponsesVerified:
      sourceNodeV266.sourceNodeV264Ready
      && sourceNodeV266.sourceNodeV265Ready
      && sourceNodeV266.sourceNodeV265ConsumesUpstreamEchoes,
    javaV110EchoReady: javaV110.readyForNodeV267Alignment,
    miniKvV117NonParticipationReady: miniKvV117.readyForNodeV267Alignment,
    archiveCountsAligned:
      sourceNodeV266.archiveFileCount === 9
      && sourceNodeV266.archiveFileCount === javaV110.archiveFileCount
      && sourceNodeV266.archiveFileCount === miniKvV117.archiveFileCount
      && sourceNodeV266.checkCount === javaV110.checkCount
      && sourceNodeV266.checkCount === miniKvV117.checkCount,
    archiveSnippetsAligned:
      sourceNodeV266.requiredSnippetCount === 24
      && sourceNodeV266.requiredSnippetCount === javaV110.requiredSnippetCount
      && sourceNodeV266.requiredSnippetCount === miniKvV117.requiredSnippetCount
      && sourceNodeV266.matchedSnippetCount === javaV110.matchedSnippetCount
      && sourceNodeV266.matchedSnippetCount === miniKvV117.matchedSnippetCount,
    archiveNoRerunAligned:
      !sourceNodeV266.archiveVerificationRerunsFakeShellBehavior
      && javaV110.noFakeShellRerunEchoed
      && !miniKvV117.archiveVerificationRerunsFakeShellBehavior,
    readOnlyArchiveBoundaryAligned:
      sourceNodeV266.readOnlyArchiveVerification
      && javaV110.readOnlyArchiveBoundaryEchoed
      && miniKvV117.readOnly
      && miniKvV117.archiveVerificationOnly
      && !miniKvV117.archiveFilesReadByMiniKv,
    credentialBoundaryAligned:
      !sourceNodeV266.credentialValueRead
      && !javaV110.credentialValueRead
      && !miniKvV117.credentialValueReadAllowed
      && !miniKvV117.credentialValueLoaded
      && !miniKvV117.credentialValueStored
      && !miniKvV117.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV266.rawEndpointUrlParsed
      && !javaV110.rawEndpointUrlParsed
      && !miniKvV117.rawEndpointUrlParsed
      && !miniKvV117.rawEndpointUrlIncluded,
    resolverBoundaryAligned:
      !sourceNodeV266.resolverClientInstantiated
      && !sourceNodeV266.secretProviderInstantiated
      && !javaV110.resolverClientInstantiated
      && !javaV110.secretProviderInstantiated
      && !miniKvV117.resolverClientInstantiated
      && !miniKvV117.secretProviderInstantiated
      && !miniKvV117.credentialResolverImplemented
      && !miniKvV117.credentialResolverInvoked,
    connectionBoundaryAligned:
      !sourceNodeV266.connectsManagedAudit
      && !javaV110.connectsManagedAudit
      && !miniKvV117.connectionExecutionAllowed
      && !miniKvV117.externalRequestSent,
    writeBoundaryAligned:
      !sourceNodeV266.executionAllowed
      && !javaV110.approvalLedgerWritten
      && !javaV110.sqlExecuted
      && !javaV110.schemaMigrationExecuted
      && !miniKvV117.executionAllowed
      && !miniKvV117.storageWriteAllowed
      && !miniKvV117.schemaMigrationExecutionAllowed
      && !miniKvV117.restoreExecutionAllowed
      && !miniKvV117.loadRestoreCompactExecuted
      && !miniKvV117.setnxexExecutionAllowed
      && !miniKvV117.managedAuditStorageBackend,
    autoStartBoundaryAligned:
      !sourceNodeV266.automaticUpstreamStart
      && !javaV110.automaticUpstreamStart
      && !miniKvV117.nodeAutoStartAllowed
      && !miniKvV117.javaAutoStartAllowed
      && !miniKvV117.miniKvAutoStartAllowed
      && !miniKvV117.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverFakeShellArchiveUpstreamEchoVerificationChecks,
): CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV266Ready,
      code: "SOURCE_NODE_V266_NOT_READY",
      source: "node-v266-credential-resolver-fake-shell-archive-verification",
      message: "Node v266 fake-shell archive verification must be ready before v267 upstream echo verification.",
    },
    {
      condition: checks.javaV110EchoReady,
      code: "JAVA_V110_ECHO_NOT_READY",
      source: "java-v110-credential-resolver-fake-shell-archive-echo-receipt",
      message: "Java v110 must echo Node v266 fake-shell archive verification before v267 can proceed.",
    },
    {
      condition: checks.miniKvV117NonParticipationReady,
      code: "MINI_KV_V117_RECEIPT_NOT_READY",
      source: "mini-kv-v117-credential-resolver-fake-shell-archive-non-participation-receipt",
      message: "mini-kv v117 must prove non-participation before v267 can proceed.",
    },
    {
      condition: checks.archiveCountsAligned,
      code: "ARCHIVE_COUNTS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Node v266, Java v110, and mini-kv v117 must agree on 9 archive files, 24 snippets, and 28 checks.",
    },
    {
      condition: checks.archiveNoRerunAligned,
      code: "ARCHIVE_RERUN_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "No participant may rerun fake resolver shell behavior while verifying archive evidence.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Credential value read/load/store/include must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryAligned,
      code: "RESOLVER_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Real resolver client and secret provider instantiation must remain false.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Managed audit connection and external request boundaries must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for fake-shell archive upstream echo verification.",
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

function collectWarnings(): CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "This profile only verifies upstream echo alignment for v266 archive evidence; it does not implement a real credential resolver.",
    },
    {
      code: "PRODUCTION_CONNECTION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Successful v267 echo verification is not permission to open a managed audit sandbox connection.",
    },
  ];
}

function collectRecommendations(): CredentialResolverFakeShellArchiveUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_V268_DECISION_GATE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Use Node v268 as a production readiness decision gate before planning any real credential resolver implementation.",
    },
    {
      code: "KEEP_SECRET_PROVIDER_OUT_OF_SCOPE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-upstream-echo-verification",
      message: "Do not add a secret provider, raw endpoint parser, external HTTP call, schema migration, or auto-start in this archive echo phase.",
    },
  ];
}
