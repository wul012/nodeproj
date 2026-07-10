import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.js";
import type {
  JavaV104SandboxEndpointHandlePreflightEchoMarkerReference,
  ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
  MiniKvV113SandboxEndpointHandleNonParticipationReference,
  SandboxEndpointHandleUpstreamEchoVerificationChecks,
  SandboxEndpointHandleUpstreamEchoVerificationMessage,
  SourceNodeV258SandboxEndpointHandlePreflightReviewReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";
import {
  ACTIVE_PLAN,
  JAVA_V104_BUILDER,
  JAVA_V104_RUNBOOK,
  JAVA_V104_WALKTHROUGH,
  MINI_KV_V113_RECEIPT,
  MINI_KV_V113_RUNBOOK,
  MINI_KV_V113_WALKTHROUGH,
  NODE_V258_ROUTE,
  PROFILE_VERSION,
  ROUTE_PATH,
  booleanField,
  numberField,
  objectField,
  readJsonObject,
  snippetMatched,
  stringField,
} from "../evidence/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationEvidence.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationRenderer.js";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile {
  const sourceNodeV258 = createSourceNodeV258(
    loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview({ config: input.config }),
  );
  const javaV104 = createJavaV104Reference();
  const miniKvV113 = createMiniKvV113Reference();
  const checks = createChecks(input.config, sourceNodeV258, javaV104, miniKvV113);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification
    ? "sandbox-endpoint-handle-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV258ReviewDigest: sourceNodeV258.reviewDigest,
    javaV104Ready: javaV104.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
    miniKvV113ReceiptDigest: miniKvV113.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint handle upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV258,
    upstreamEchoes: { javaV104, miniKvV113 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v104-plus-mini-kv-v113-sandbox-endpoint-handle-upstream-echo-verification-only",
      sourceSpan: "Node v258 + Java v104 + mini-kv v113",
      endpointHandleAligned: checks.endpointHandleAligned,
      credentialHandleAligned: checks.credentialHandleAligned,
      reviewCountsAligned: checks.reviewCountsAligned,
      policyReviewsAligned:
        checks.networkAllowlistAligned && checks.tlsPolicyAligned && checks.redactionPolicyAligned,
      operatorWindowAligned: checks.operatorWindowAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      miniKvNonParticipationAligned: checks.miniKvV113NonParticipationReady,
      nodeV259BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV104.evidenceFiles.filter((file) => file.exists).length
        + miniKvV113.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV104.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV113.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointHandleUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointHandleUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV258Json: NODE_V258_ROUTE,
      javaV104Runbook: JAVA_V104_RUNBOOK,
      miniKvV113Receipt: MINI_KV_V113_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v259 as a read-only upstream echo gate before writing the Node v260 credential resolver decision record.",
      "Do not treat Java v104 or mini-kv v113 as permission to resolve credential values, parse raw endpoint URLs, or open a managed audit connection.",
      "Keep Java v104 and mini-kv v113 evidence in historical fallback so GitHub CI can verify this profile without sibling workspaces.",
    ],
  };
}

function createSourceNodeV258(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
): SourceNodeV258SandboxEndpointHandlePreflightReviewReference {
  const preflightReview = source.preflightReview;
  const reference = {
    sourceVersion: "Node v258" as const,
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForPreflightReview:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
    reviewDigest: preflightReview.reviewDigest,
    reviewMode: preflightReview.reviewMode,
    sourceSpan: preflightReview.sourceSpan,
    endpointHandle: preflightReview.endpointHandle,
    credentialHandle: preflightReview.credentialHandle,
    requiredReviewItemCount: source.summary.requiredReviewItemCount as 7,
    completedReviewItemCount: source.summary.completedReviewItemCount as 7,
    forbiddenOperationCount: source.summary.forbiddenOperationCount as 7,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    networkAllowlistReviewReady: source.checks.networkAllowlistReviewReady,
    tlsPolicyReviewReady: source.checks.tlsPolicyReviewReady,
    redactionPolicyReady: source.checks.redactionPolicyReady,
    operatorWindowReviewReady: source.checks.operatorWindowReviewReady,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    rawEndpointUrlIncluded: source.rawEndpointUrlIncluded,
    credentialValueRead: source.credentialValueRead,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    sourceNodeV257Ready: source.sourceNodeV257.readyForNodeV258PreflightReview,
    sourceNodeV257EvidenceFileCount: source.sourceNodeV257.evidenceFileCount,
    sourceNodeV257MatchedSnippetCount: source.sourceNodeV257.matchedSnippetCount,
    readyForNodeV259UpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV259UpstreamEchoVerification:
      reference.readyForPreflightReview
      && reference.reviewState === "sandbox-endpoint-handle-preflight-review-ready"
      && reference.reviewMode === "sandbox-endpoint-handle-preflight-review-only"
      && reference.sourceSpan === "Node v257"
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.requiredReviewItemCount === 7
      && reference.completedReviewItemCount === 7
      && reference.forbiddenOperationCount === 7
      && reference.checkCount === reference.passedCheckCount
      && reference.productionBlockerCount === 0
      && reference.networkAllowlistReviewReady
      && reference.tlsPolicyReviewReady
      && reference.redactionPolicyReady
      && reference.operatorWindowReviewReady
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.credentialValueRead
      && !reference.externalRequestSent
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && !reference.connectsManagedAudit
      && !reference.readsManagedAuditCredential
      && !reference.storesManagedAuditCredential
      && !reference.readyForManagedAuditSandboxAdapterConnection
      && reference.sourceNodeV257Ready
      && reference.sourceNodeV257EvidenceFileCount === 6
      && reference.sourceNodeV257MatchedSnippetCount === 33,
  };
}

function createJavaV104Reference(): JavaV104SandboxEndpointHandlePreflightEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v104-runbook", JAVA_V104_RUNBOOK),
    evidenceFile("java-v104-walkthrough", JAVA_V104_WALKTHROUGH),
    evidenceFile("java-v104-builder", JAVA_V104_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v104-marker-field", JAVA_V104_RUNBOOK, "managedAuditSandboxEndpointHandlePreflightEchoMarker"),
    snippet("java-v104-schema", JAVA_V104_RUNBOOK, "java-release-approval-rehearsal-response-schema.v26"),
    snippet("java-v104-marker-version", JAVA_V104_WALKTHROUGH, "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-handle-preflight-echo-marker.v1"),
    snippet("java-v104-node-v258-profile", JAVA_V104_WALKTHROUGH, "profile=managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1"),
    snippet("java-v104-node-v259", JAVA_V104_BUILDER, "readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification"),
    snippet("java-v104-endpoint-handle", JAVA_V104_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"),
    snippet("java-v104-credential-handle", JAVA_V104_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v104-required-count", JAVA_V104_RUNBOOK, "requiredReviewItemCount=7"),
    snippet("java-v104-completed-count", JAVA_V104_RUNBOOK, "completedReviewItemCount=7"),
    snippet("java-v104-forbidden-count", JAVA_V104_RUNBOOK, "forbiddenOperationCount=7"),
    snippet("java-v104-source-evidence-count", JAVA_V104_RUNBOOK, "source evidenceFileCount=6"),
    snippet("java-v104-source-snippet-count", JAVA_V104_RUNBOOK, "source matchedSnippetCount=33"),
    snippet("java-v104-network", JAVA_V104_RUNBOOK, "networkAllowlistReview.rawHostIncluded=false"),
    snippet("java-v104-tls", JAVA_V104_RUNBOOK, "tlsPolicyReview.certificateMaterialIncluded=false"),
    snippet("java-v104-redaction", JAVA_V104_RUNBOOK, "redactionPolicy.rawEndpointUrlRedacted=true"),
    snippet("java-v104-window", JAVA_V104_RUNBOOK, "operatorWindow.windowOpen=false"),
    snippet("java-v104-no-raw-parsed", JAVA_V104_RUNBOOK, "rawEndpointUrlParsed=false"),
    snippet("java-v104-no-raw-included", JAVA_V104_RUNBOOK, "rawEndpointUrlIncluded=false"),
    snippet("java-v104-no-credential", JAVA_V104_RUNBOOK, "credentialValueRead=false"),
    snippet("java-v104-no-external", JAVA_V104_RUNBOOK, "externalRequestSent=false"),
    snippet("java-v104-no-schema", JAVA_V104_RUNBOOK, "schemaMigrationExecuted=false"),
    snippet("java-v104-no-autostart", JAVA_V104_RUNBOOK, "automaticUpstreamStart=false"),
    snippet("java-v104-no-connection", JAVA_V104_WALKTHROUGH, "connectsManagedAudit=false"),
    snippet("java-v104-no-ledger", JAVA_V104_WALKTHROUGH, "approvalLedgerWritten=false"),
    snippet("java-v104-no-java-start", JAVA_V104_WALKTHROUGH, "javaStarted=false"),
    snippet("java-v104-no-mini-kv-start", JAVA_V104_WALKTHROUGH, "miniKvStarted=false"),
    snippet("java-v104-sandbox-blocked", JAVA_V104_RUNBOOK, "readyForManagedAuditSandboxAdapterConnection=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v104" as const,
    tagLabel: "v104订单平台sandbox-endpoint-handle-preflight-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v104-schema")
      ? "java-release-approval-rehearsal-response-schema.v26" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v104-marker-field")
      ? "managedAuditSandboxEndpointHandlePreflightEchoMarker" as const
      : "missing" as const,
    consumedByNodeV258Profile: snippetMatched(expectedSnippets, "java-v104-node-v258-profile")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v104-node-v259")
      ? "Node v259" as const
      : "missing" as const,
    endpointHandle: snippetMatched(expectedSnippets, "java-v104-endpoint-handle")
      ? "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      : "missing",
    credentialHandle: snippetMatched(expectedSnippets, "java-v104-credential-handle")
      ? "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      : "missing",
    requiredReviewItemCount: snippetMatched(expectedSnippets, "java-v104-required-count") ? 7 : 0,
    completedReviewItemCount: snippetMatched(expectedSnippets, "java-v104-completed-count") ? 7 : 0,
    forbiddenOperationCount: snippetMatched(expectedSnippets, "java-v104-forbidden-count") ? 7 : 0,
    sourceEvidenceFileCount: snippetMatched(expectedSnippets, "java-v104-source-evidence-count") ? 6 : 0,
    sourceMatchedSnippetCount: snippetMatched(expectedSnippets, "java-v104-source-snippet-count") ? 33 : 0,
    networkAllowlistReviewEchoed: snippetMatched(expectedSnippets, "java-v104-network"),
    tlsPolicyReviewEchoed: snippetMatched(expectedSnippets, "java-v104-tls"),
    redactionPolicyEchoed: snippetMatched(expectedSnippets, "java-v104-redaction"),
    operatorWindowReviewEchoed: snippetMatched(expectedSnippets, "java-v104-window"),
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    credentialValueRead: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    javaStarted: false,
    miniKvStarted: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v26"
      && reference.markerField === "managedAuditSandboxEndpointHandlePreflightEchoMarker"
      && reference.consumedByNodeV258Profile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1"
      && reference.nextNodeConsumerVersion === "Node v259"
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.requiredReviewItemCount === 7
      && reference.completedReviewItemCount === 7
      && reference.forbiddenOperationCount === 7
      && reference.sourceEvidenceFileCount === 6
      && reference.sourceMatchedSnippetCount === 33
      && reference.networkAllowlistReviewEchoed
      && reference.tlsPolicyReviewEchoed
      && reference.redactionPolicyEchoed
      && reference.operatorWindowReviewEchoed
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.credentialValueRead
      && !reference.externalRequestSent
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart
      && !reference.connectsManagedAudit
      && !reference.approvalLedgerWritten
      && !reference.javaStarted
      && !reference.miniKvStarted
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV113Reference(): MiniKvV113SandboxEndpointHandleNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v113-receipt", MINI_KV_V113_RECEIPT),
    evidenceFile("mini-kv-v113-runbook", MINI_KV_V113_RUNBOOK),
    evidenceFile("mini-kv-v113-walkthrough", MINI_KV_V113_WALKTHROUGH),
  ];
  const receiptRoot = readJsonObject(MINI_KV_V113_RECEIPT);
  const receipt = objectField(receiptRoot, "sandbox_endpoint_handle_non_participation_receipt");
  const preflightReview = objectField(receipt, "preflight_review");
  const networkAllowlistReview = objectField(receipt, "network_allowlist_review");
  const tlsPolicyReview = objectField(receipt, "tls_policy_review");
  const redactionPolicy = objectField(receipt, "redaction_policy");
  const operatorWindow = objectField(receipt, "operator_window");
  const expectedSnippets = [
    snippet("mini-kv-v113-receipt-version", MINI_KV_V113_RECEIPT, "mini-kv-sandbox-endpoint-handle-non-participation-receipt.v1"),
    snippet("mini-kv-v113-consumer", MINI_KV_V113_RECEIPT, "Node v259 sandbox endpoint handle upstream echo verification"),
    snippet("mini-kv-v113-node-v258", MINI_KV_V113_RECEIPT, "Node v258 sandbox endpoint handle preflight review"),
    snippet("mini-kv-v113-profile", MINI_KV_V113_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1"),
    snippet("mini-kv-v113-endpoint-handle", MINI_KV_V113_RECEIPT, "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"),
    snippet("mini-kv-v113-credential-handle", MINI_KV_V113_RECEIPT, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("mini-kv-v113-required-count", MINI_KV_V113_WALKTHROUGH, "source_required_review_item_count=7"),
    snippet("mini-kv-v113-no-raw", MINI_KV_V113_WALKTHROUGH, "source_raw_endpoint_url_parsed=false"),
    snippet("mini-kv-v113-no-credential", MINI_KV_V113_WALKTHROUGH, "source_credential_value_read=false"),
    snippet("mini-kv-v113-no-storage", MINI_KV_V113_WALKTHROUGH, "storage_write_allowed=false"),
    snippet("mini-kv-v113-no-restore", MINI_KV_V113_WALKTHROUGH, "load_restore_compact_executed=false"),
    snippet("mini-kv-v113-not-backend", MINI_KV_V113_WALKTHROUGH, "managed_audit_storage_backend=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "mini-kv v113" as const,
    tagLabel: "第一百一十三版沙箱端点句柄非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "current_release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? "missing",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    sourcePreflightProfileVersion: stringField(receipt, "source_preflight_profile_version") ?? "missing",
    sourceReviewState: stringField(receipt, "source_review_state") ?? "missing",
    sourceReviewMode: stringField(receipt, "source_review_mode") ?? "missing",
    sourceSpan: stringField(receipt, "source_span") ?? "missing",
    sourceReadyForPreflightReview: booleanField(receipt, "source_ready_for_sandbox_endpoint_handle_preflight_review") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadOnlyPreflightReview: booleanField(receipt, "source_read_only_preflight_review") ?? false,
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit") ?? true,
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential") ?? true,
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential") ?? true,
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed") ?? true,
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start") ?? true,
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent") ?? true,
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed") ?? true,
    sourceRawEndpointUrlIncluded: booleanField(receipt, "source_raw_endpoint_url_included") ?? true,
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read") ?? true,
    sourceRequiredReviewItemCount: numberField(receipt, "source_required_review_item_count") ?? 0,
    sourceCompletedReviewItemCount: numberField(receipt, "source_completed_review_item_count") ?? 0,
    sourceForbiddenOperationCount: numberField(receipt, "source_forbidden_operation_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceNodeV257Ready: booleanField(receipt, "source_node_v257_ready") ?? false,
    sourceNodeV257BoundariesAligned: booleanField(receipt, "source_node_v257_boundaries_aligned") ?? false,
    sourceNodeV257EvidenceFileCount: numberField(receipt, "source_node_v257_evidence_file_count") ?? 0,
    sourceNodeV257MatchedSnippetCount: numberField(receipt, "source_node_v257_matched_snippet_count") ?? 0,
    sourceNodeV257ReadyForNodeV258PreflightReview:
      booleanField(receipt, "source_node_v257_ready_for_node_v258_preflight_review") ?? false,
    sourceUpstreamActionsStillDisabled: booleanField(receipt, "source_upstream_actions_still_disabled") ?? false,
    endpointHandle: stringField(preflightReview, "endpoint_handle") ?? "missing",
    credentialHandle: stringField(preflightReview, "credential_handle") ?? "missing",
    networkAllowlistReady:
      booleanField(networkAllowlistReview, "review_required") === true
      && booleanField(networkAllowlistReview, "raw_host_included") === false
      && booleanField(networkAllowlistReview, "cidr_included") === false
      && booleanField(networkAllowlistReview, "reviewed") === true,
    tlsPolicyReady:
      booleanField(tlsPolicyReview, "review_required") === true
      && booleanField(tlsPolicyReview, "certificate_material_included") === false
      && booleanField(tlsPolicyReview, "private_key_included") === false
      && booleanField(tlsPolicyReview, "reviewed") === true,
    redactionPolicyReady:
      booleanField(redactionPolicy, "review_required") === true
      && booleanField(redactionPolicy, "credential_value_redacted") === true
      && booleanField(redactionPolicy, "raw_endpoint_url_redacted") === true
      && booleanField(redactionPolicy, "payload_secret_redacted") === true
      && booleanField(redactionPolicy, "reviewed") === true,
    operatorWindowReady:
      booleanField(operatorWindow, "manual_window_required") === true
      && booleanField(operatorWindow, "window_open") === false
      && booleanField(operatorWindow, "execution_blocked_until_window_open") === true
      && booleanField(operatorWindow, "operator_identity_required") === true
      && booleanField(operatorWindow, "approval_correlation_required") === true
      && booleanField(operatorWindow, "reviewed") === true,
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed") ?? true,
    externalAuditServiceAutoStartAllowed: booleanField(receipt, "external_audit_service_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(receipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed") ?? true,
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed") ?? true,
    approvalLedgerWriteExecuted: booleanField(receipt, "approval_ledger_write_executed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(receipt, "sandbox_managed_audit_state_write_allowed") ?? true,
    credentialValueRequired: booleanField(receipt, "credential_value_required") ?? true,
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded") ?? true,
    credentialValueIncluded: booleanField(receipt, "credential_value_included") ?? true,
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed") ?? true,
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included") ?? true,
    externalRequestSent: booleanField(receipt, "external_request_sent") ?? true,
    schemaRehearsalExecutionAllowed: booleanField(receipt, "schema_rehearsal_execution_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(receipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend") ?? true,
    sandboxAuditStorageBackend: booleanField(receipt, "sandbox_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? true,
    readyForNodeV259Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV259Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-sandbox-endpoint-handle-non-participation-receipt.v1"
      && reference.releaseVersion === "v113"
      && reference.consumerHint === "Node v259 sandbox endpoint handle upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePreflightProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1"
      && reference.sourceReviewState === "sandbox-endpoint-handle-preflight-review-ready"
      && reference.sourceReviewMode === "sandbox-endpoint-handle-preflight-review-only"
      && reference.sourceSpan === "Node v257"
      && reference.sourceReadyForPreflightReview
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyPreflightReview
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceStoresManagedAuditCredential
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && !reference.sourceExternalRequestSent
      && !reference.sourceRawEndpointUrlParsed
      && !reference.sourceRawEndpointUrlIncluded
      && !reference.sourceCredentialValueRead
      && reference.sourceRequiredReviewItemCount === 7
      && reference.sourceCompletedReviewItemCount === 7
      && reference.sourceForbiddenOperationCount === 7
      && reference.sourceCheckCount === 19
      && reference.sourcePassedCheckCount === 19
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceNodeV257Ready
      && reference.sourceNodeV257BoundariesAligned
      && reference.sourceNodeV257EvidenceFileCount === 6
      && reference.sourceNodeV257MatchedSnippetCount === 33
      && reference.sourceNodeV257ReadyForNodeV258PreflightReview
      && reference.sourceUpstreamActionsStillDisabled
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.networkAllowlistReady
      && reference.tlsPolicyReady
      && reference.redactionPolicyReady
      && reference.operatorWindowReady
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.externalAuditServiceAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.approvalLedgerWriteAllowed
      && !reference.approvalLedgerWriteExecuted
      && !reference.sandboxManagedAuditStateWriteAllowed
      && !reference.credentialValueRequired
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
      && !reference.credentialValueIncluded
      && !reference.rawEndpointUrlParsed
      && !reference.rawEndpointUrlIncluded
      && !reference.externalRequestSent
      && !reference.schemaRehearsalExecutionAllowed
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.sandboxAuditStorageBackend
      && !reference.orderAuthoritative,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV258: SourceNodeV258SandboxEndpointHandlePreflightReviewReference,
  javaV104: JavaV104SandboxEndpointHandlePreflightEchoMarkerReference,
  miniKvV113: MiniKvV113SandboxEndpointHandleNonParticipationReference,
): SandboxEndpointHandleUpstreamEchoVerificationChecks {
  return {
    sourceNodeV258Ready: sourceNodeV258.readyForNodeV259UpstreamEchoVerification,
    javaV104EchoReady: javaV104.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
    miniKvV113NonParticipationReady: miniKvV113.readyForNodeV259Alignment,
    endpointHandleAligned:
      sourceNodeV258.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && javaV104.endpointHandle === sourceNodeV258.endpointHandle
      && miniKvV113.endpointHandle === sourceNodeV258.endpointHandle,
    credentialHandleAligned:
      sourceNodeV258.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && javaV104.credentialHandle === sourceNodeV258.credentialHandle
      && miniKvV113.credentialHandle === sourceNodeV258.credentialHandle,
    reviewCountsAligned:
      sourceNodeV258.requiredReviewItemCount === 7
      && sourceNodeV258.completedReviewItemCount === 7
      && sourceNodeV258.forbiddenOperationCount === 7
      && javaV104.requiredReviewItemCount === 7
      && javaV104.completedReviewItemCount === 7
      && javaV104.forbiddenOperationCount === 7
      && miniKvV113.sourceRequiredReviewItemCount === 7
      && miniKvV113.sourceCompletedReviewItemCount === 7
      && miniKvV113.sourceForbiddenOperationCount === 7
      && miniKvV113.sourceCheckCount === sourceNodeV258.checkCount
      && miniKvV113.sourcePassedCheckCount === sourceNodeV258.passedCheckCount,
    networkAllowlistAligned:
      sourceNodeV258.networkAllowlistReviewReady
      && javaV104.networkAllowlistReviewEchoed
      && miniKvV113.networkAllowlistReady,
    tlsPolicyAligned:
      sourceNodeV258.tlsPolicyReviewReady
      && javaV104.tlsPolicyReviewEchoed
      && miniKvV113.tlsPolicyReady,
    redactionPolicyAligned:
      sourceNodeV258.redactionPolicyReady
      && javaV104.redactionPolicyEchoed
      && miniKvV113.redactionPolicyReady,
    operatorWindowAligned:
      sourceNodeV258.operatorWindowReviewReady
      && javaV104.operatorWindowReviewEchoed
      && miniKvV113.operatorWindowReady,
    credentialBoundaryAligned:
      !sourceNodeV258.credentialValueRead
      && !javaV104.credentialValueRead
      && !miniKvV113.sourceCredentialValueRead
      && !miniKvV113.credentialValueReadAllowed
      && !miniKvV113.credentialValueLoaded
      && !miniKvV113.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV258.rawEndpointUrlParsed
      && !sourceNodeV258.rawEndpointUrlIncluded
      && !javaV104.rawEndpointUrlParsed
      && !javaV104.rawEndpointUrlIncluded
      && !miniKvV113.sourceRawEndpointUrlParsed
      && !miniKvV113.sourceRawEndpointUrlIncluded
      && !miniKvV113.rawEndpointUrlParsed
      && !miniKvV113.rawEndpointUrlIncluded,
    connectionBoundaryAligned:
      !sourceNodeV258.connectsManagedAudit
      && !sourceNodeV258.externalRequestSent
      && !javaV104.connectsManagedAudit
      && !javaV104.externalRequestSent
      && !miniKvV113.sourceConnectsManagedAudit
      && !miniKvV113.sourceExternalRequestSent
      && !miniKvV113.connectionExecutionAllowed
      && !miniKvV113.externalRequestSent,
    writeBoundaryAligned:
      !sourceNodeV258.schemaMigrationExecuted
      && !javaV104.schemaMigrationExecuted
      && !javaV104.approvalLedgerWritten
      && !miniKvV113.sourceSchemaMigrationExecuted
      && !miniKvV113.schemaRehearsalExecutionAllowed
      && !miniKvV113.schemaMigrationExecutionAllowed
      && !miniKvV113.storageWriteAllowed
      && !miniKvV113.managedAuditWriteExecuted
      && !miniKvV113.approvalLedgerWriteAllowed
      && !miniKvV113.approvalLedgerWriteExecuted
      && !miniKvV113.sandboxManagedAuditStateWriteAllowed,
    autoStartBoundaryAligned:
      !sourceNodeV258.automaticUpstreamStart
      && !javaV104.automaticUpstreamStart
      && !javaV104.javaStarted
      && !javaV104.miniKvStarted
      && !miniKvV113.sourceAutomaticUpstreamStart
      && !miniKvV113.nodeAutoStartAllowed
      && !miniKvV113.javaAutoStartAllowed
      && !miniKvV113.miniKvAutoStartAllowed
      && !miniKvV113.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: SandboxEndpointHandleUpstreamEchoVerificationChecks,
): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SandboxEndpointHandleUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV258Ready,
      code: "NODE_V258_SOURCE_NOT_READY",
      source: "node-v258-sandbox-endpoint-handle-preflight-review",
      message: "Node v258 must be ready and keep handle-only review boundaries closed before v259.",
    },
    {
      condition: checks.javaV104EchoReady,
      code: "JAVA_V104_ENDPOINT_HANDLE_ECHO_NOT_READY",
      source: "java-v104-sandbox-endpoint-handle-preflight-echo-marker",
      message: "Java v104 must expose the sandbox endpoint handle preflight echo marker for Node v259.",
    },
    {
      condition: checks.miniKvV113NonParticipationReady,
      code: "MINI_KV_V113_ENDPOINT_HANDLE_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v113-sandbox-endpoint-handle-non-participation-receipt",
      message: "mini-kv v113 must prove no auto-start, no storage write, no credential read, no raw endpoint parse, and no backend role.",
    },
    {
      condition:
        checks.endpointHandleAligned
        && checks.credentialHandleAligned
        && checks.reviewCountsAligned
        && checks.networkAllowlistAligned
        && checks.tlsPolicyAligned
        && checks.redactionPolicyAligned
        && checks.operatorWindowAligned,
      code: "SANDBOX_ENDPOINT_HANDLE_REVIEW_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Node v258, Java v104, and mini-kv v113 must align on handles, counts, network, TLS, redaction, and operator window review.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "SANDBOX_ENDPOINT_HANDLE_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, and auto-start boundaries must remain closed in all three projects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v259 upstream echo verification.",
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

function collectWarnings(): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "v259 verifies upstream echo evidence only; it does not open a real managed audit connection.",
    },
    {
      code: "CREDENTIAL_RESOLVER_STILL_ABSENT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Credential resolver policy is intentionally absent and should be handled by v260 decision record.",
    },
  ];
}

function collectRecommendations(): SandboxEndpointHandleUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_V260_DECISION_RECORD_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Use v260 to decide credential resolver rehearsal conditions before any real endpoint, credential, or migration work.",
    },
    {
      code: "KEEP_UPSTREAM_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Do not treat Java v104 or mini-kv v113 receipts as authorization to read credential values, start services, or write state.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): VerificationEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, resolvedPath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readHistoricalEvidenceFile(filePath);
  return {
    id,
    path: filePath,
    resolvedPath,
    exists: true,
    sizeBytes: statHistoricalEvidence(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): VerificationSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  const content = historicalEvidenceExists(filePath) ? readHistoricalEvidenceFile(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched: content.includes(expectedText),
  };
}
