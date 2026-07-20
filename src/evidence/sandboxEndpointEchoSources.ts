import { createHash } from "node:crypto";

import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "../services/historicalEvidenceResolver.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.js";
import type {
  JavaV104SandboxEndpointHandlePreflightEchoMarkerReference,
  MiniKvV113SandboxEndpointHandleNonParticipationReference,
  SourceNodeV258SandboxEndpointHandlePreflightReviewReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";
import {
  JAVA_V104_BUILDER,
  JAVA_V104_RUNBOOK,
  JAVA_V104_WALKTHROUGH,
  MINI_KV_V113_RECEIPT,
  MINI_KV_V113_RUNBOOK,
  MINI_KV_V113_WALKTHROUGH,
  booleanField,
  numberField,
  objectField,
  readJsonObject,
  snippetMatched,
  stringField,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationEvidence.js";

export function createSourceNodeV258(
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
    readyForNodeV259UpstreamEchoVerification: all([
      reference.readyForPreflightReview,
      reference.reviewState === "sandbox-endpoint-handle-preflight-review-ready",
      reference.reviewMode === "sandbox-endpoint-handle-preflight-review-only",
      reference.sourceSpan === "Node v257",
      reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      reference.requiredReviewItemCount === 7,
      reference.completedReviewItemCount === 7,
      reference.forbiddenOperationCount === 7,
      reference.checkCount === reference.passedCheckCount,
      reference.productionBlockerCount === 0,
      reference.networkAllowlistReviewReady,
      reference.tlsPolicyReviewReady,
      reference.redactionPolicyReady,
      reference.operatorWindowReviewReady,
      !reference.rawEndpointUrlParsed,
      !reference.rawEndpointUrlIncluded,
      !reference.credentialValueRead,
      !reference.externalRequestSent,
      !reference.schemaMigrationExecuted,
      !reference.automaticUpstreamStart,
      !reference.connectsManagedAudit,
      !reference.readsManagedAuditCredential,
      !reference.storesManagedAuditCredential,
      !reference.readyForManagedAuditSandboxAdapterConnection,
      reference.sourceNodeV257Ready,
      reference.sourceNodeV257EvidenceFileCount === 6,
      reference.sourceNodeV257MatchedSnippetCount === 33,
    ]),
  };
}

export function createJavaV104Reference(): JavaV104SandboxEndpointHandlePreflightEchoMarkerReference {
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
    readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification: all([
      reference.evidencePresent,
      reference.verificationDocumented,
      reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v26",
      reference.markerField === "managedAuditSandboxEndpointHandlePreflightEchoMarker",
      reference.consumedByNodeV258Profile
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
      reference.nextNodeConsumerVersion === "Node v259",
      reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      reference.requiredReviewItemCount === 7,
      reference.completedReviewItemCount === 7,
      reference.forbiddenOperationCount === 7,
      reference.sourceEvidenceFileCount === 6,
      reference.sourceMatchedSnippetCount === 33,
      reference.networkAllowlistReviewEchoed,
      reference.tlsPolicyReviewEchoed,
      reference.redactionPolicyEchoed,
      reference.operatorWindowReviewEchoed,
      !reference.rawEndpointUrlParsed,
      !reference.rawEndpointUrlIncluded,
      !reference.credentialValueRead,
      !reference.externalRequestSent,
      !reference.schemaMigrationExecuted,
      !reference.automaticUpstreamStart,
      !reference.connectsManagedAudit,
      !reference.approvalLedgerWritten,
      !reference.javaStarted,
      !reference.miniKvStarted,
      !reference.readyForManagedAuditSandboxAdapterConnection,
    ]),
  };
}

export function createMiniKvV113Reference(): MiniKvV113SandboxEndpointHandleNonParticipationReference {
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
  const expectedSnippets = createMiniKvSnippets();
  const reference: MiniKvV113SandboxEndpointHandleNonParticipationReference = {
    sourceVersion: "mini-kv v113",
    tagLabel: "第一百一十三版沙箱端点句柄非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    ...createMiniKvSourceFields(receipt),
    ...createMiniKvReviewFields(
      preflightReview,
      networkAllowlistReview,
      tlsPolicyReview,
      redactionPolicy,
      operatorWindow,
    ),
    ...createMiniKvBoundaryFields(receipt),
    readyForNodeV259Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV259Alignment: all([
      reference.evidencePresent,
      reference.verificationDocumented,
      reference.receiptVersion === "mini-kv-sandbox-endpoint-handle-non-participation-receipt.v1",
      reference.releaseVersion === "v113",
      reference.consumerHint === "Node v259 sandbox endpoint handle upstream echo verification",
      /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest),
      reference.sourcePreflightProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1",
      reference.sourceReviewState === "sandbox-endpoint-handle-preflight-review-ready",
      reference.sourceReviewMode === "sandbox-endpoint-handle-preflight-review-only",
      reference.sourceSpan === "Node v257",
      reference.sourceReadyForPreflightReview,
      !reference.sourceReadyForManagedAuditSandboxAdapterConnection,
      reference.sourceReadOnlyPreflightReview,
      !reference.sourceExecutionAllowed,
      !reference.sourceConnectsManagedAudit,
      !reference.sourceReadsManagedAuditCredential,
      !reference.sourceStoresManagedAuditCredential,
      !reference.sourceSchemaMigrationExecuted,
      !reference.sourceAutomaticUpstreamStart,
      !reference.sourceExternalRequestSent,
      !reference.sourceRawEndpointUrlParsed,
      !reference.sourceRawEndpointUrlIncluded,
      !reference.sourceCredentialValueRead,
      reference.sourceRequiredReviewItemCount === 7,
      reference.sourceCompletedReviewItemCount === 7,
      reference.sourceForbiddenOperationCount === 7,
      reference.sourceCheckCount === 19,
      reference.sourcePassedCheckCount === 19,
      reference.sourceProductionBlockerCount === 0,
      reference.sourceNodeV257Ready,
      reference.sourceNodeV257BoundariesAligned,
      reference.sourceNodeV257EvidenceFileCount === 6,
      reference.sourceNodeV257MatchedSnippetCount === 33,
      reference.sourceNodeV257ReadyForNodeV258PreflightReview,
      reference.sourceUpstreamActionsStillDisabled,
      reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
      reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
      reference.networkAllowlistReady,
      reference.tlsPolicyReady,
      reference.redactionPolicyReady,
      reference.operatorWindowReady,
      reference.readOnly,
      !reference.executionAllowed,
      reference.dryRunOnly,
      !reference.nodeAutoStartAllowed,
      !reference.javaAutoStartAllowed,
      !reference.miniKvAutoStartAllowed,
      !reference.externalAuditServiceAutoStartAllowed,
      !reference.connectionExecutionAllowed,
      !reference.storageWriteAllowed,
      !reference.managedAuditWriteExecuted,
      !reference.approvalLedgerWriteAllowed,
      !reference.approvalLedgerWriteExecuted,
      !reference.sandboxManagedAuditStateWriteAllowed,
      !reference.credentialValueRequired,
      !reference.credentialValueReadAllowed,
      !reference.credentialValueLoaded,
      !reference.credentialValueIncluded,
      !reference.rawEndpointUrlParsed,
      !reference.rawEndpointUrlIncluded,
      !reference.externalRequestSent,
      !reference.schemaRehearsalExecutionAllowed,
      !reference.schemaMigrationExecutionAllowed,
      !reference.restoreExecutionAllowed,
      !reference.loadRestoreCompactExecuted,
      !reference.setnxexExecutionAllowed,
      !reference.managedAuditStorageBackend,
      !reference.sandboxAuditStorageBackend,
      !reference.orderAuthoritative,
    ]),
  };
}

function createMiniKvSnippets(): VerificationSnippetMatch[] {
  return [
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
}

function createMiniKvSourceFields(receipt: Record<string, unknown>) {
  return {
    receiptVersion: stringOr(receipt, "receipt_version", "missing"),
    releaseVersion: stringOr(receipt, "current_release_version", "missing"),
    consumerHint: stringOr(receipt, "consumer_hint", "missing"),
    receiptDigest: stringOr(receipt, "receipt_digest", "missing"),
    sourcePreflightProfileVersion: stringOr(receipt, "source_preflight_profile_version", "missing"),
    sourceReviewState: stringOr(receipt, "source_review_state", "missing"),
    sourceReviewMode: stringOr(receipt, "source_review_mode", "missing"),
    sourceSpan: stringOr(receipt, "source_span", "missing"),
    sourceReadyForPreflightReview: booleanOr(receipt, "source_ready_for_sandbox_endpoint_handle_preflight_review", false),
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanOr(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection", true),
    sourceReadOnlyPreflightReview: booleanOr(receipt, "source_read_only_preflight_review", false),
    sourceExecutionAllowed: booleanOr(receipt, "source_execution_allowed", true),
    sourceConnectsManagedAudit: booleanOr(receipt, "source_connects_managed_audit", true),
    sourceReadsManagedAuditCredential: booleanOr(receipt, "source_reads_managed_audit_credential", true),
    sourceStoresManagedAuditCredential: booleanOr(receipt, "source_stores_managed_audit_credential", true),
    sourceSchemaMigrationExecuted: booleanOr(receipt, "source_schema_migration_executed", true),
    sourceAutomaticUpstreamStart: booleanOr(receipt, "source_automatic_upstream_start", true),
    sourceExternalRequestSent: booleanOr(receipt, "source_external_request_sent", true),
    sourceRawEndpointUrlParsed: booleanOr(receipt, "source_raw_endpoint_url_parsed", true),
    sourceRawEndpointUrlIncluded: booleanOr(receipt, "source_raw_endpoint_url_included", true),
    sourceCredentialValueRead: booleanOr(receipt, "source_credential_value_read", true),
    sourceRequiredReviewItemCount: numberOr(receipt, "source_required_review_item_count", 0),
    sourceCompletedReviewItemCount: numberOr(receipt, "source_completed_review_item_count", 0),
    sourceForbiddenOperationCount: numberOr(receipt, "source_forbidden_operation_count", 0),
    sourceCheckCount: numberOr(receipt, "source_check_count", 0),
    sourcePassedCheckCount: numberOr(receipt, "source_passed_check_count", 0),
    sourceProductionBlockerCount: numberOr(receipt, "source_production_blocker_count", -1),
    sourceNodeV257Ready: booleanOr(receipt, "source_node_v257_ready", false),
    sourceNodeV257BoundariesAligned: booleanOr(receipt, "source_node_v257_boundaries_aligned", false),
    sourceNodeV257EvidenceFileCount: numberOr(receipt, "source_node_v257_evidence_file_count", 0),
    sourceNodeV257MatchedSnippetCount: numberOr(receipt, "source_node_v257_matched_snippet_count", 0),
    sourceNodeV257ReadyForNodeV258PreflightReview:
      booleanOr(receipt, "source_node_v257_ready_for_node_v258_preflight_review", false),
    sourceUpstreamActionsStillDisabled: booleanOr(receipt, "source_upstream_actions_still_disabled", false),
  };
}

function createMiniKvReviewFields(
  preflight: Record<string, unknown>,
  network: Record<string, unknown>,
  tls: Record<string, unknown>,
  redaction: Record<string, unknown>,
  operator: Record<string, unknown>,
) {
  return {
    endpointHandle: stringOr(preflight, "endpoint_handle", "missing"),
    credentialHandle: stringOr(preflight, "credential_handle", "missing"),
    networkAllowlistReady: all([
      booleanField(network, "review_required") === true,
      booleanField(network, "raw_host_included") === false,
      booleanField(network, "cidr_included") === false,
      booleanField(network, "reviewed") === true,
    ]),
    tlsPolicyReady: all([
      booleanField(tls, "review_required") === true,
      booleanField(tls, "certificate_material_included") === false,
      booleanField(tls, "private_key_included") === false,
      booleanField(tls, "reviewed") === true,
    ]),
    redactionPolicyReady: all([
      booleanField(redaction, "review_required") === true,
      booleanField(redaction, "credential_value_redacted") === true,
      booleanField(redaction, "raw_endpoint_url_redacted") === true,
      booleanField(redaction, "payload_secret_redacted") === true,
      booleanField(redaction, "reviewed") === true,
    ]),
    operatorWindowReady: all([
      booleanField(operator, "manual_window_required") === true,
      booleanField(operator, "window_open") === false,
      booleanField(operator, "execution_blocked_until_window_open") === true,
      booleanField(operator, "operator_identity_required") === true,
      booleanField(operator, "approval_correlation_required") === true,
      booleanField(operator, "reviewed") === true,
    ]),
  };
}

function createMiniKvBoundaryFields(receipt: Record<string, unknown>) {
  return {
    readOnly: booleanOr(receipt, "read_only", false),
    executionAllowed: booleanOr(receipt, "execution_allowed", true),
    dryRunOnly: booleanOr(receipt, "dry_run_only", false),
    nodeAutoStartAllowed: booleanOr(receipt, "node_auto_start_allowed", true),
    javaAutoStartAllowed: booleanOr(receipt, "java_auto_start_allowed", true),
    miniKvAutoStartAllowed: booleanOr(receipt, "mini_kv_auto_start_allowed", true),
    externalAuditServiceAutoStartAllowed: booleanOr(receipt, "external_audit_service_auto_start_allowed", true),
    connectionExecutionAllowed: booleanOr(receipt, "connection_execution_allowed", true),
    storageWriteAllowed: booleanOr(receipt, "storage_write_allowed", true),
    managedAuditWriteExecuted: booleanOr(receipt, "managed_audit_write_executed", true),
    approvalLedgerWriteAllowed: booleanOr(receipt, "approval_ledger_write_allowed", true),
    approvalLedgerWriteExecuted: booleanOr(receipt, "approval_ledger_write_executed", true),
    sandboxManagedAuditStateWriteAllowed: booleanOr(receipt, "sandbox_managed_audit_state_write_allowed", true),
    credentialValueRequired: booleanOr(receipt, "credential_value_required", true),
    credentialValueReadAllowed: booleanOr(receipt, "credential_value_read_allowed", true),
    credentialValueLoaded: booleanOr(receipt, "credential_value_loaded", true),
    credentialValueIncluded: booleanOr(receipt, "credential_value_included", true),
    rawEndpointUrlParsed: booleanOr(receipt, "raw_endpoint_url_parsed", true),
    rawEndpointUrlIncluded: booleanOr(receipt, "raw_endpoint_url_included", true),
    externalRequestSent: booleanOr(receipt, "external_request_sent", true),
    schemaRehearsalExecutionAllowed: booleanOr(receipt, "schema_rehearsal_execution_allowed", true),
    schemaMigrationExecutionAllowed: booleanOr(receipt, "schema_migration_execution_allowed", true),
    restoreExecutionAllowed: booleanOr(receipt, "restore_execution_allowed", true),
    loadRestoreCompactExecuted: booleanOr(receipt, "load_restore_compact_executed", true),
    setnxexExecutionAllowed: booleanOr(receipt, "setnxex_execution_allowed", true),
    managedAuditStorageBackend: booleanOr(receipt, "managed_audit_storage_backend", true),
    sandboxAuditStorageBackend: booleanOr(receipt, "sandbox_audit_storage_backend", true),
    orderAuthoritative: booleanOr(receipt, "order_authoritative", true),
  };
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

function stringOr(input: Record<string, unknown>, key: string, fallback: string): string {
  return stringField(input, key) ?? fallback;
}

function numberOr(input: Record<string, unknown>, key: string, fallback: number): number {
  return numberField(input, key) ?? fallback;
}

function booleanOr(input: Record<string, unknown>, key: string, fallback: boolean): boolean {
  return booleanField(input, key) ?? fallback;
}

function all(values: readonly boolean[]): boolean {
  return values.every((value) => value);
}
