import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
  type ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientPrecheck.js";
import {
  loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
  type ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
} from "./managedAuditManualSandboxConnectionTestOnlyAdapterShellContract.js";
import type {
  DisabledAdapterClientUpstreamEchoVerificationChecks,
  DisabledAdapterClientUpstreamEchoVerificationMessage,
  JavaV102DisabledAdapterClientEchoReference,
  ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile,
  MiniKvV111DisabledAdapterClientNonParticipationReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationRenderer.js";

const JAVA_V102_RUNBOOK = "D:/javaproj/advanced-order-platform/c/102/解释/说明.md";
const JAVA_V102_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/105-version-102-disabled-adapter-client-precheck-echo-receipt.md";
const JAVA_V102_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptBuilder.java";

const MINI_KV_V111_RECEIPT = "D:/C/mini-kv/fixtures/release/disabled-adapter-client-non-participation-receipt.json";
const MINI_KV_V111_RUNBOOK = "D:/C/mini-kv/c/111/解释/说明.md";

const ENDPOINTS = Object.freeze({
  disabledAdapterClientUpstreamEchoVerificationJson:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
  disabledAdapterClientUpstreamEchoVerificationMarkdown:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification?format=markdown",
  sourceNodeV252Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck",
  sourceNodeV253Json:
    "/api/v1/audit/managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract",
  activePlan: "docs/plans/v252-post-disabled-adapter-client-precheck-roadmap.md",
});

export function loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile {
  const sourceNodeV252 = createSourceNodeV252(
    loadManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck({ config: input.config }),
  );
  const sourceNodeV253 = createSourceNodeV253(
    loadManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract({ config: input.config }),
  );
  const javaV102 = createJavaV102Reference();
  const miniKvV111 = createMiniKvV111Reference();
  const checks = createChecks(input.config, sourceNodeV252, sourceNodeV253, javaV102, miniKvV111);
  checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification
    ? "disabled-adapter-client-upstream-echo-verification-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
    verificationState,
    nodeV252PrecheckDigest: sourceNodeV252.precheckDigest,
    nodeV253ContractDigest: sourceNodeV253.contractDigest,
    javaV102Ready: javaV102.readyForNodeV254Alignment,
    miniKvV111ReceiptDigest: miniKvV111.receiptDigest,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection disabled adapter client upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification.v1",
    verificationState,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
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
    sourceNodeV252,
    sourceNodeV253,
    upstreamEchoes: { javaV102, miniKvV111 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v102-plus-mini-kv-v111-disabled-adapter-client-upstream-echo-verification-only",
      sourceSpan: "Node v252 + Node v253 + Java v102 + mini-kv v111",
      envHandleCountAligned: checks.envHandleCountAligned,
      failureClassCountAligned: checks.failureClassCountAligned,
      dryRunResponseShapeAligned: checks.dryRunResponseShapeAligned,
      fakeTransportShapeAligned: checks.fakeTransportShapeAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      nodeV254BlocksRealConnection: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV102.evidenceFiles.filter((file) => file.exists).length
        + miniKvV111.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV102.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV111.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to Node v255 fake transport adapter dry-run verification packet only after this verification remains ready.",
      "Keep fake transport isolated; do not resolve credential values or external endpoint URLs.",
      "Pause if Java or mini-kv changes env handle counts, failure taxonomy counts, fake transport shape, or no-write/no-start boundaries.",
    ],
  };
}

function createSourceNodeV252(
  source: ManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheckProfile,
): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"] {
  return {
    sourceVersion: "Node v252",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.disabledAdapterClientPrecheck.precheckDigest,
    readyForDisabledAdapterClientPrecheck:
      source.readyForManagedAuditManualSandboxConnectionDisabledAdapterClientPrecheck,
    requiredEnvHandleCount: source.disabledAdapterClientPrecheck.requiredEnvHandleCount,
    failureClassCount: source.disabledAdapterClientPrecheck.failureClassCount,
    dryRunResponseFieldCount: source.disabledAdapterClientPrecheck.dryRunResponseFieldCount,
    reusedNoGoConditionCount: source.disabledAdapterClientPrecheck.reusedNoGoConditions.length,
    readyForSandboxAdapterConnection: false,
    externalRequestStillBlocked: true,
    credentialValueStillBlocked: true,
  };
}

function createSourceNodeV253(
  source: ManagedAuditManualSandboxConnectionTestOnlyAdapterShellContractProfile,
): ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"] {
  return {
    sourceVersion: "Node v253",
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    contractDigest: source.testOnlyAdapterShellContract.contractDigest,
    readyForTestOnlyAdapterShellContract:
      source.readyForManagedAuditManualSandboxConnectionTestOnlyAdapterShellContract,
    requestShapeFieldCount: source.testOnlyAdapterShellContract.requestShapeFieldCount,
    responseShapeFieldCount: source.testOnlyAdapterShellContract.responseShapeFieldCount,
    failureMappingCount: source.testOnlyAdapterShellContract.failureMappingCount,
    guardConditionCount: source.testOnlyAdapterShellContract.guardConditionCount,
    fakeTransportOnly: true,
    realClientImplemented: false,
    realTransportAllowed: false,
    externalRequestSent: false,
    credentialValueRead: false,
    productionRecordWritten: false,
  };
}

function createJavaV102Reference(): JavaV102DisabledAdapterClientEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v102-runbook", JAVA_V102_RUNBOOK),
    evidenceFile("java-v102-walkthrough", JAVA_V102_WALKTHROUGH),
    evidenceFile("java-v102-builder", JAVA_V102_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v102-receipt-field", JAVA_V102_RUNBOOK, "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt"),
    snippet("java-v102-schema", JAVA_V102_RUNBOOK, "java-release-approval-rehearsal-response-schema.v24"),
    snippet("java-v102-env-count", JAVA_V102_RUNBOOK, "5 个 required env handles"),
    snippet("java-v102-failure-count", JAVA_V102_RUNBOOK, "6 个 failure class codes"),
    snippet("java-v102-dry-run-count", JAVA_V102_RUNBOOK, "10 个 dry-run response fields"),
    snippet("java-v102-no-go-count", JAVA_V102_BUILDER, "REUSED_NO_GO_CONDITION_COUNT = 8"),
    snippet("java-v102-ready-node-v254", JAVA_V102_BUILDER, "readyForNodeV254DisabledAdapterClientUpstreamEchoVerification"),
    snippet("java-v102-node-v253-ready", JAVA_V102_BUILDER, "Node v253 test-only adapter shell contract is ready"),
    snippet("java-v102-no-client", JAVA_V102_RUNBOOK, "clientMayBeInstantiated=false"),
    snippet("java-v102-no-external", JAVA_V102_RUNBOOK, "externalRequestMayBeSent=false"),
    snippet("java-v102-no-credential", JAVA_V102_RUNBOOK, "credentialValueMayBeLoaded=false"),
    snippet("java-v102-no-connection", JAVA_V102_RUNBOOK, "actualConnectionAttemptedByJava=false"),
    snippet("java-v102-no-sql", JAVA_V102_RUNBOOK, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v102-no-ledger", JAVA_V102_RUNBOOK, "approvalLedgerWrittenByJava=false"),
    snippet("java-v102-no-auto-start", JAVA_V102_RUNBOOK, "upstreamServiceAutoStartRequestedByJava=false"),
    snippet("java-v102-no-mini-kv-write", JAVA_V102_RUNBOOK, "miniKvWritePermissionRequestedByJava=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v102" as const,
    tagLabel: "v102订单平台disabled-adapter-client-precheck-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v102-schema")
      ? "java-release-approval-rehearsal-response-schema.v24" as const
      : "missing" as const,
    receiptField: snippetMatched(expectedSnippets, "java-v102-receipt-field")
      ? "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt" as const
      : "missing" as const,
    consumedByNodeDisabledAdapterClientPrecheckProfile:
      snippetMatched(expectedSnippets, "java-v102-ready-node-v254")
        ? "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1" as const
        : "missing" as const,
    consumedByNodeTestOnlyAdapterShellProfile:
      snippetMatched(expectedSnippets, "java-v102-node-v253-ready")
        ? "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1" as const
        : "missing" as const,
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v102-ready-node-v254")
      ? "Node v254" as const
      : "missing" as const,
    requiredEnvHandleCount: snippetMatched(expectedSnippets, "java-v102-env-count") ? 5 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v102-failure-count") ? 6 : 0,
    dryRunResponseFieldCount: snippetMatched(expectedSnippets, "java-v102-dry-run-count") ? 10 : 0,
    reusedNoGoConditionCount: snippetMatched(expectedSnippets, "java-v102-no-go-count") ? 8 : 0,
    readyForNodeV254DisabledAdapterClientUpstreamEchoVerification:
      snippetMatched(expectedSnippets, "java-v102-ready-node-v254"),
    clientMayBeInstantiated: false as const,
    externalRequestMayBeSent: false as const,
    credentialValueMayBeLoaded: false as const,
    actualConnectionAttemptedByJava: false as const,
    externalRequestSentByJava: false as const,
    schemaMigrationSqlExecutedByJava: false as const,
    approvalLedgerWrittenByJava: false as const,
    upstreamServiceAutoStartRequestedByJava: false as const,
    miniKvWritePermissionRequestedByJava: false as const,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV254Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV254Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v24"
      && reference.receiptField === "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt"
      && reference.consumedByNodeDisabledAdapterClientPrecheckProfile
        === "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1"
      && reference.consumedByNodeTestOnlyAdapterShellProfile
        === "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1"
      && reference.nextNodeConsumerVersion === "Node v254"
      && reference.requiredEnvHandleCount === 5
      && reference.failureClassCount === 6
      && reference.dryRunResponseFieldCount === 10
      && reference.reusedNoGoConditionCount === 8
      && reference.readyForNodeV254DisabledAdapterClientUpstreamEchoVerification
      && !reference.clientMayBeInstantiated
      && !reference.externalRequestMayBeSent
      && !reference.credentialValueMayBeLoaded
      && !reference.actualConnectionAttemptedByJava
      && !reference.externalRequestSentByJava
      && !reference.schemaMigrationSqlExecutedByJava
      && !reference.approvalLedgerWrittenByJava
      && !reference.upstreamServiceAutoStartRequestedByJava
      && !reference.miniKvWritePermissionRequestedByJava
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

function createMiniKvV111Reference(): MiniKvV111DisabledAdapterClientNonParticipationReference {
  const receipt = readJsonObject(MINI_KV_V111_RECEIPT);
  const nestedReceipt = objectField(receipt, "disabled_adapter_client_non_participation_receipt");
  const requestShape = objectField(nestedReceipt, "request_shape");
  const responseShape = objectField(nestedReceipt, "response_shape");
  const evidenceFiles = [
    evidenceFile("mini-kv-v111-receipt", MINI_KV_V111_RECEIPT),
    evidenceFile("mini-kv-v111-runbook", MINI_KV_V111_RUNBOOK),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v111-receipt-version", MINI_KV_V111_RECEIPT, "mini-kv-disabled-adapter-client-non-participation-receipt.v1"),
    snippet("mini-kv-v111-consumer", MINI_KV_V111_RECEIPT, "Node v254 disabled adapter client upstream echo verification"),
    snippet("mini-kv-v111-precheck", MINI_KV_V111_RECEIPT, "Node v252 disabled adapter client precheck"),
    snippet("mini-kv-v111-shell", MINI_KV_V111_RECEIPT, "Node v253 test-only adapter shell contract"),
    snippet("mini-kv-v111-env-count", MINI_KV_V111_RECEIPT, "\"source_required_env_handle_count\":5"),
    snippet("mini-kv-v111-failure-count", MINI_KV_V111_RECEIPT, "\"source_failure_class_count\":6"),
    snippet("mini-kv-v111-request-count", MINI_KV_V111_RECEIPT, "\"source_request_shape_field_count\":8"),
    snippet("mini-kv-v111-response-count", MINI_KV_V111_RECEIPT, "\"source_response_shape_field_count\":9"),
    snippet("mini-kv-v111-fake-only", MINI_KV_V111_RECEIPT, "\"source_fake_transport_only\":true"),
    snippet("mini-kv-v111-no-real-client", MINI_KV_V111_RECEIPT, "\"source_real_client_implemented\":false"),
    snippet("mini-kv-v111-no-external", MINI_KV_V111_RECEIPT, "\"external_request_sent\":false"),
    snippet("mini-kv-v111-no-credential", MINI_KV_V111_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v111-no-storage", MINI_KV_V111_RECEIPT, "\"storage_write_allowed\":false"),
    snippet("mini-kv-v111-no-auto-start", MINI_KV_V111_RECEIPT, "\"mini_kv_auto_start_allowed\":false"),
    snippet("mini-kv-v111-runbook-smoke", MINI_KV_V111_RUNBOOK, "real server/client path"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "mini-kv v111" as const,
    tagLabel: "第一百一十一版禁用适配器客户端非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? stringField(nestedReceipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "release_version") ?? stringField(nestedReceipt, "current_release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(nestedReceipt, "consumer_hint") ?? "missing",
    receiptDigest: stringField(nestedReceipt, "receipt_digest") ?? "missing",
    sourcePrecheckProfileVersion: stringField(nestedReceipt, "source_precheck_profile_version") ?? "missing",
    sourcePrecheckState: stringField(nestedReceipt, "source_precheck_state") ?? "missing",
    sourceRequiredEnvHandleCount: numberField(nestedReceipt, "source_required_env_handle_count") ?? 0,
    sourceFailureClassCount: numberField(nestedReceipt, "source_failure_class_count") ?? 0,
    sourceDryRunResponseFieldCount: numberField(nestedReceipt, "source_dry_run_response_field_count") ?? 0,
    sourceReusedNoGoConditionCount: numberField(nestedReceipt, "source_reused_no_go_condition_count") ?? 0,
    sourceReadyForDisabledAdapterClientPrecheck:
      booleanField(nestedReceipt, "source_ready_for_disabled_adapter_client_precheck") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(nestedReceipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceExternalRequestMayBeSent: booleanField(nestedReceipt, "source_external_request_may_be_sent") ?? true,
    sourceCredentialValueMayBeLoaded: booleanField(nestedReceipt, "source_credential_value_may_be_loaded") ?? true,
    sourceShellProfileVersion: stringField(nestedReceipt, "source_shell_profile_version") ?? "missing",
    sourceShellState: stringField(nestedReceipt, "source_shell_state") ?? "missing",
    sourceTransportKind: stringField(nestedReceipt, "source_transport_kind") ?? "missing",
    sourceRequestShapeFieldCount: numberField(nestedReceipt, "source_request_shape_field_count") ?? 0,
    sourceResponseShapeFieldCount: numberField(nestedReceipt, "source_response_shape_field_count") ?? 0,
    sourceFailureMappingCount: numberField(nestedReceipt, "source_failure_mapping_count") ?? 0,
    sourceGuardConditionCount: numberField(nestedReceipt, "source_guard_condition_count") ?? 0,
    sourceFakeTransportOnly: booleanField(nestedReceipt, "source_fake_transport_only") ?? false,
    sourceRealClientImplemented: booleanField(nestedReceipt, "source_real_client_implemented") ?? true,
    sourceRealTransportAllowed: booleanField(nestedReceipt, "source_real_transport_allowed") ?? true,
    sourceFakeTransportProbeNoExternalRequest:
      booleanField(nestedReceipt, "source_fake_transport_probe_no_external_request") ?? false,
    sourceFakeTransportProbeNoCredentialRead:
      booleanField(nestedReceipt, "source_fake_transport_probe_no_credential_read") ?? false,
    sourceFakeTransportProbeNoProductionWrite:
      booleanField(nestedReceipt, "source_fake_transport_probe_no_production_write") ?? false,
    requestCredentialHandleOnly: booleanField(requestShape, "credential_handle_only") ?? false,
    requestCredentialValueAccepted: booleanField(requestShape, "credential_value_accepted") ?? true,
    responseExternalRequestSent: booleanField(responseShape, "external_request_sent") ?? true,
    responseCredentialValueRead: booleanField(responseShape, "credential_value_read") ?? true,
    responseProductionRecordWritten: booleanField(responseShape, "production_record_written") ?? true,
    readOnly: booleanField(receipt, "read_only") ?? booleanField(nestedReceipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? booleanField(nestedReceipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(nestedReceipt, "dry_run_only") ?? false,
    nodeAutoStartAllowed: booleanField(nestedReceipt, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(nestedReceipt, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(nestedReceipt, "mini_kv_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(nestedReceipt, "connection_execution_allowed") ?? true,
    storageWriteAllowed: booleanField(nestedReceipt, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(nestedReceipt, "managed_audit_write_executed") ?? true,
    credentialValueReadAllowed: booleanField(nestedReceipt, "credential_value_read_allowed") ?? true,
    credentialValueLoaded: booleanField(nestedReceipt, "credential_value_loaded") ?? true,
    externalRequestSent: booleanField(nestedReceipt, "external_request_sent") ?? true,
    schemaMigrationExecutionAllowed: booleanField(nestedReceipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed:
      booleanField(receipt, "restore_execution_allowed") ?? booleanField(nestedReceipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(nestedReceipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(nestedReceipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(nestedReceipt, "managed_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? booleanField(nestedReceipt, "order_authoritative") ?? true,
    readyForNodeV254Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV254Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-disabled-adapter-client-non-participation-receipt.v1"
      && reference.releaseVersion === "v111"
      && reference.consumerHint === "Node v254 disabled adapter client upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePrecheckProfileVersion === "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1"
      && reference.sourcePrecheckState === "disabled-adapter-client-precheck-ready"
      && reference.sourceRequiredEnvHandleCount === 5
      && reference.sourceFailureClassCount === 6
      && reference.sourceDryRunResponseFieldCount === 10
      && reference.sourceReusedNoGoConditionCount === 8
      && reference.sourceReadyForDisabledAdapterClientPrecheck
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && !reference.sourceExternalRequestMayBeSent
      && !reference.sourceCredentialValueMayBeLoaded
      && reference.sourceShellProfileVersion === "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1"
      && reference.sourceShellState === "test-only-adapter-shell-contract-ready"
      && reference.sourceTransportKind === "fake-in-memory"
      && reference.sourceRequestShapeFieldCount === 8
      && reference.sourceResponseShapeFieldCount === 9
      && reference.sourceFailureMappingCount === 6
      && reference.sourceGuardConditionCount === 7
      && reference.sourceFakeTransportOnly
      && !reference.sourceRealClientImplemented
      && !reference.sourceRealTransportAllowed
      && reference.sourceFakeTransportProbeNoExternalRequest
      && reference.sourceFakeTransportProbeNoCredentialRead
      && reference.sourceFakeTransportProbeNoProductionWrite
      && reference.requestCredentialHandleOnly
      && !reference.requestCredentialValueAccepted
      && !reference.responseExternalRequestSent
      && !reference.responseCredentialValueRead
      && !reference.responseProductionRecordWritten
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && !reference.nodeAutoStartAllowed
      && !reference.javaAutoStartAllowed
      && !reference.miniKvAutoStartAllowed
      && !reference.connectionExecutionAllowed
      && !reference.storageWriteAllowed
      && !reference.managedAuditWriteExecuted
      && !reference.credentialValueReadAllowed
      && !reference.credentialValueLoaded
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
  sourceNodeV252: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV252"],
  sourceNodeV253: ManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationProfile["sourceNodeV253"],
  javaV102: JavaV102DisabledAdapterClientEchoReference,
  miniKvV111: MiniKvV111DisabledAdapterClientNonParticipationReference,
): DisabledAdapterClientUpstreamEchoVerificationChecks {
  return {
    sourceNodeV252Ready: sourceNodeV252.readyForDisabledAdapterClientPrecheck,
    sourceNodeV253Ready: sourceNodeV253.readyForTestOnlyAdapterShellContract,
    sourceNodeBoundariesStillClosed:
      !sourceNodeV252.readyForSandboxAdapterConnection
      && sourceNodeV252.externalRequestStillBlocked
      && sourceNodeV252.credentialValueStillBlocked
      && sourceNodeV253.fakeTransportOnly
      && !sourceNodeV253.realClientImplemented
      && !sourceNodeV253.realTransportAllowed
      && !sourceNodeV253.externalRequestSent
      && !sourceNodeV253.credentialValueRead
      && !sourceNodeV253.productionRecordWritten,
    javaV102EchoReady: javaV102.readyForNodeV254Alignment,
    miniKvV111NonParticipationReady: miniKvV111.readyForNodeV254Alignment,
    envHandleCountAligned:
      sourceNodeV252.requiredEnvHandleCount === 5
      && javaV102.requiredEnvHandleCount === 5
      && miniKvV111.sourceRequiredEnvHandleCount === 5,
    failureClassCountAligned:
      sourceNodeV252.failureClassCount === 6
      && javaV102.failureClassCount === 6
      && miniKvV111.sourceFailureClassCount === 6,
    dryRunResponseShapeAligned:
      sourceNodeV252.dryRunResponseFieldCount === 10
      && javaV102.dryRunResponseFieldCount === 10
      && miniKvV111.sourceDryRunResponseFieldCount === 10,
    fakeTransportShapeAligned:
      sourceNodeV253.requestShapeFieldCount === 8
      && sourceNodeV253.responseShapeFieldCount === 9
      && sourceNodeV253.failureMappingCount === 6
      && sourceNodeV253.guardConditionCount === 7
      && miniKvV111.sourceRequestShapeFieldCount === 8
      && miniKvV111.sourceResponseShapeFieldCount === 9
      && miniKvV111.sourceFailureMappingCount === 6
      && miniKvV111.sourceGuardConditionCount === 7
      && miniKvV111.sourceFakeTransportOnly,
    credentialBoundaryAligned:
      sourceNodeV252.credentialValueStillBlocked
      && !javaV102.credentialValueMayBeLoaded
      && !miniKvV111.sourceCredentialValueMayBeLoaded
      && miniKvV111.requestCredentialHandleOnly
      && !miniKvV111.requestCredentialValueAccepted
      && !miniKvV111.credentialValueReadAllowed
      && !miniKvV111.credentialValueLoaded
      && !miniKvV111.responseCredentialValueRead,
    connectionBoundaryAligned:
      sourceNodeV252.externalRequestStillBlocked
      && !sourceNodeV253.externalRequestSent
      && !javaV102.clientMayBeInstantiated
      && !javaV102.externalRequestMayBeSent
      && !javaV102.actualConnectionAttemptedByJava
      && !javaV102.externalRequestSentByJava
      && !miniKvV111.sourceExternalRequestMayBeSent
      && !miniKvV111.externalRequestSent
      && !miniKvV111.responseExternalRequestSent
      && !miniKvV111.connectionExecutionAllowed,
    writeBoundaryAligned:
      !sourceNodeV253.productionRecordWritten
      && !javaV102.schemaMigrationSqlExecutedByJava
      && !javaV102.approvalLedgerWrittenByJava
      && !javaV102.miniKvWritePermissionRequestedByJava
      && !miniKvV111.storageWriteAllowed
      && !miniKvV111.managedAuditWriteExecuted
      && !miniKvV111.responseProductionRecordWritten
      && !miniKvV111.managedAuditStorageBackend
      && !miniKvV111.orderAuthoritative,
    autoStartBoundaryAligned:
      !javaV102.upstreamServiceAutoStartRequestedByJava
      && !miniKvV111.nodeAutoStartAllowed
      && !miniKvV111.javaAutoStartAllowed
      && !miniKvV111.miniKvAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: DisabledAdapterClientUpstreamEchoVerificationChecks,
): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: DisabledAdapterClientUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV252Ready && checks.sourceNodeV253Ready && checks.sourceNodeBoundariesStillClosed,
      code: "NODE_SOURCES_NOT_READY",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Node v252 and v253 must be ready and still block real connection effects.",
    },
    {
      condition: checks.javaV102EchoReady,
      code: "JAVA_V102_DISABLED_ADAPTER_CLIENT_ECHO_NOT_READY",
      source: "java-v102-disabled-adapter-client-precheck-echo-receipt",
      message: "Java v102 must echo disabled adapter client precheck fields and keep execution boundaries closed.",
    },
    {
      condition: checks.miniKvV111NonParticipationReady,
      code: "MINI_KV_V111_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v111-disabled-adapter-client-non-participation-receipt",
      message: "mini-kv v111 must prove no storage, no credential, no external request, no restore, and no auto-start.",
    },
    {
      condition:
        checks.envHandleCountAligned
        && checks.failureClassCountAligned
        && checks.dryRunResponseShapeAligned
        && checks.fakeTransportShapeAligned,
      code: "DISABLED_ADAPTER_CLIENT_SHAPE_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Node, Java, and mini-kv must align on env handles, failure taxonomy, dry-run response, and fake transport shapes.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "DISABLED_ADAPTER_CLIENT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Credential, connection, write, and auto-start boundaries must remain closed in all three projects.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v254 upstream echo verification.",
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

function collectWarnings(): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "v254 verifies upstream echo evidence only; it does not open a real managed audit connection.",
    },
    {
      code: "FAKE_TRANSPORT_REMAINS_TEST_ONLY",
      severity: "warning",
      source: "node-v253-test-only-adapter-shell-contract",
      message: "The fake transport shell is shape evidence, not a production adapter client.",
    },
  ];
}

function collectRecommendations(): DisabledAdapterClientUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "CREATE_FAKE_TRANSPORT_DRY_RUN_PACKET_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "After v254 is ready, Node v255 may verify fake transport dry-run packets without real endpoints.",
    },
    {
      code: "KEEP_UPSTREAM_RECEIPTS_READ_ONLY",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-disabled-adapter-client-upstream-echo-verification",
      message: "Do not treat Java v102 or mini-kv v111 receipts as authorization to read credential values, start services, or write state.",
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

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed: unknown = JSON.parse(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}
