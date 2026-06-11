import { createHash } from "node:crypto";

import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  JAVA_V99_BUILDER,
  JAVA_V99_RUNBOOK,
  JAVA_V99_WALKTHROUGH,
  MINI_KV_V108_RECEIPT,
  MINI_KV_V108_RUNBOOK,
  MINI_KV_V108_WALKTHROUGH,
  NODE_V245_OPERATOR_FIELDS,
  NODE_V245_PRECHECK_ITEMS,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationConstants.js";
import type {
  JavaV99PrecheckEchoReference,
  ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile,
  MiniKvV108PrecheckNonParticipationReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
} from "./managedAuditManualSandboxConnectionPrecheckPacket.js";

export function createSourceNodeV245(
  source: ManagedAuditManualSandboxConnectionPrecheckPacketProfile,
): ManagedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerificationProfile["sourceNodeV245"] {
  return {
    sourceVersion: "Node v245",
    profileVersion: source.profileVersion,
    precheckState: source.precheckState,
    precheckDigest: source.precheckPacket.precheckDigest,
    readyForPrecheckPacket: source.readyForManagedAuditManualSandboxConnectionPrecheckPacket,
    precheckItemCount: source.summary.precheckItemCount,
    requiredOperatorFieldCount: source.summary.requiredOperatorFieldCount,
    timeoutBudgetMs: source.precheckPacket.timeoutPolicy.timeoutBudgetMs,
    readOnlyPrecheckPacket: source.readOnlyPrecheckPacket,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    actualConnectionAttempted: source.precheckPacket.boundary.actualConnectionAttempted,
    managedAuditStateWriteRequested: source.precheckPacket.boundary.managedAuditStateWriteRequested,
    approvalLedgerWriteRequested: source.precheckPacket.boundary.approvalLedgerWriteRequested,
    javaSqlExecutionRequested: source.precheckPacket.boundary.javaSqlExecutionRequested,
    miniKvWritePermissionRequested: source.precheckPacket.boundary.miniKvWritePermissionRequested,
  };
}

export function createJavaV99PrecheckEchoReference(): JavaV99PrecheckEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v99-runbook", JAVA_V99_RUNBOOK),
    evidenceFile("java-v99-walkthrough", JAVA_V99_WALKTHROUGH),
    evidenceFile("java-v99-builder", JAVA_V99_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v99-receipt-field", JAVA_V99_WALKTHROUGH, "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"),
    snippet("java-v99-ready-for-node-v246", JAVA_V99_WALKTHROUGH, "readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification=true"),
    snippet("java-v99-schema", JAVA_V99_WALKTHROUGH, "java-release-approval-rehearsal-response-schema.v23"),
    snippet("java-v99-item-count", JAVA_V99_WALKTHROUGH, "precheckItemCount=7"),
    snippet("java-v99-timeout", JAVA_V99_WALKTHROUGH, "timeoutBudgetMs=15000"),
    snippet("java-v99-no-credential-echo", JAVA_V99_WALKTHROUGH, "credentialValueEchoed=false"),
    snippet("java-v99-no-credential-read", JAVA_V99_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v99-no-connection", JAVA_V99_WALKTHROUGH, "actualConnectionAttemptedByJava=false"),
    snippet("java-v99-no-sql", JAVA_V99_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v99-no-ledger", JAVA_V99_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v99-no-mini-kv-write", JAVA_V99_WALKTHROUGH, "miniKvWritePermissionRequestedByJava=false"),
    snippet("java-v99-builder-review-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE_REVIEW"),
    snippet("java-v99-builder-rehearsal-field", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_SCHEMA_MIGRATION_REHEARSAL_ID"),
    snippet("java-v99-builder-operator-window", JAVA_V99_BUILDER, "ORDEROPS_MANAGED_AUDIT_OPERATOR_WINDOW"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v99" as const,
    tagLabel: "v99订单平台release-approval-sandbox-precheck-packet-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v99-schema")
      ? "java-release-approval-rehearsal-response-schema.v23" as const
      : "missing" as const,
    receiptField: snippetMatched(expectedSnippets, "java-v99-receipt-field")
      ? "managedAuditSandboxConnectionPrecheckPacketEchoReceipt" as const
      : "missing" as const,
    precheckItemCount: snippetMatched(expectedSnippets, "java-v99-item-count") ? 7 : 0,
    timeoutBudgetMs: snippetMatched(expectedSnippets, "java-v99-timeout") ? 15000 : 0,
    readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification:
      snippetMatched(expectedSnippets, "java-v99-ready-for-node-v246"),
    fieldEchoComplete: [
      "java-v99-builder-review-field",
      "java-v99-builder-rehearsal-field",
      "java-v99-builder-operator-window",
    ].every((id) => snippetMatched(expectedSnippets, id)),
    javaUsesReviewSpecificFieldNames: true,
    credentialValueEchoed: false as const,
    credentialValueReadByJava: false as const,
    actualConnectionAttemptedByJava: false as const,
    externalManagedAuditConnectionOpenedByJava: false as const,
    schemaMigrationSqlExecutedByJava: false as const,
    approvalLedgerWrittenByJava: false as const,
    managedAuditStateWriteRequestedByJava: false as const,
    upstreamServiceAutoStartRequestedByJava: false as const,
    miniKvWritePermissionRequestedByJava: false as const,
    readyForNodeV247Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV247Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v23"
      && reference.receiptField === "managedAuditSandboxConnectionPrecheckPacketEchoReceipt"
      && reference.precheckItemCount === 7
      && reference.timeoutBudgetMs === 15000
      && reference.readyForNodeV246ManualSandboxConnectionPrecheckUpstreamReceiptVerification
      && reference.fieldEchoComplete
      && !reference.credentialValueEchoed
      && !reference.credentialValueReadByJava
      && !reference.actualConnectionAttemptedByJava
      && !reference.externalManagedAuditConnectionOpenedByJava
      && !reference.schemaMigrationSqlExecutedByJava
      && !reference.approvalLedgerWrittenByJava
      && !reference.managedAuditStateWriteRequestedByJava
      && !reference.upstreamServiceAutoStartRequestedByJava
      && !reference.miniKvWritePermissionRequestedByJava,
  };
}

export function createMiniKvV108PrecheckNonParticipationReference(): MiniKvV108PrecheckNonParticipationReference {
  const receiptPath = MINI_KV_V108_RECEIPT;
  const receipt = readJsonObject(receiptPath);
  const sourcePacket = objectField(receipt, "source_precheck_packet");
  const nestedReceipt = objectField(receipt, "manual_sandbox_connection_precheck_non_participation_receipt");
  const operatorReviewFields = stringArrayField(sourcePacket, "operator_review_fields")
    ?? stringArrayField(nestedReceipt, "operator_review_fields")
    ?? [];
  const precheckItems = stringArrayField(sourcePacket, "precheck_items")
    ?? stringArrayField(nestedReceipt, "precheck_items")
    ?? [];
  const evidenceFiles = [
    evidenceFile("mini-kv-v108-receipt", receiptPath),
    evidenceFile("mini-kv-v108-walkthrough", MINI_KV_V108_WALKTHROUGH),
    evidenceFile("mini-kv-v108-runbook", MINI_KV_V108_RUNBOOK),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v108-title", MINI_KV_V108_WALKTHROUGH, "manual_sandbox_connection_precheck_non_participation_receipt"),
    snippet("mini-kv-v108-consumer-hint", MINI_KV_V108_WALKTHROUGH, "Node v246"),
    snippet("mini-kv-v108-item-count", MINI_KV_V108_WALKTHROUGH, "source_precheck_item_count=7"),
    snippet("mini-kv-v108-field-count", MINI_KV_V108_WALKTHROUGH, "source_required_operator_field_count=6"),
    snippet("mini-kv-v108-timeout", MINI_KV_V108_WALKTHROUGH, "source_timeout_budget_ms=15000"),
    snippet("mini-kv-v108-no-auto-start", MINI_KV_V108_WALKTHROUGH, "mini_kv_auto_start_allowed=false"),
    snippet("mini-kv-v108-no-storage-write", MINI_KV_V108_WALKTHROUGH, "storage_write_allowed=false"),
    snippet("mini-kv-v108-no-credential-read", MINI_KV_V108_WALKTHROUGH, "credential_value_read_allowed=false"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const consumerHint = stringField(receipt, "consumer_hint")
    ?? stringField(nestedReceipt, "consumer_hint")
    ?? "missing";
  const reference = {
    sourceVersion: "mini-kv v108" as const,
    tagLabel: "第一百零八版手动沙箱预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? stringField(nestedReceipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "release_version") ?? stringField(nestedReceipt, "current_release_version") ?? "missing",
    consumerHint,
    consumerHintAcceptedForCurrentPlan:
      consumerHint === "Node v246 manual sandbox connection precheck upstream receipt verification"
      || consumerHint === "Node v247 manual sandbox connection precheck upstream receipt verification",
    receiptDigest: stringField(nestedReceipt, "receipt_digest") ?? "missing",
    sourcePrecheckProfileVersion:
      stringField(sourcePacket, "profile_version") ?? stringField(nestedReceipt, "source_precheck_profile_version") ?? "missing",
    sourcePrecheckState:
      stringField(sourcePacket, "precheck_state") ?? stringField(nestedReceipt, "source_precheck_state") ?? "missing",
    sourcePrecheckItemCount:
      numberField(sourcePacket, "precheck_item_count") ?? numberField(nestedReceipt, "source_precheck_item_count") ?? 0,
    sourceRequiredOperatorFieldCount:
      numberField(sourcePacket, "required_operator_field_count")
      ?? numberField(nestedReceipt, "source_required_operator_field_count")
      ?? 0,
    sourceTimeoutBudgetMs:
      numberField(sourcePacket, "timeout_budget_ms") ?? numberField(nestedReceipt, "source_timeout_budget_ms") ?? 0,
    sourceReadyForPrecheckPacket:
      booleanField(sourcePacket, "ready_for_precheck_packet")
      ?? booleanField(nestedReceipt, "source_ready_for_precheck_packet")
      ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(sourcePacket, "ready_for_managed_audit_sandbox_adapter_connection")
      ?? booleanField(nestedReceipt, "source_ready_for_managed_audit_sandbox_adapter_connection")
      ?? true,
    sourceReadOnlyPrecheckPacket:
      booleanField(sourcePacket, "read_only_precheck_packet")
      ?? booleanField(nestedReceipt, "source_read_only_precheck_packet")
      ?? false,
    sourceExecutionAllowed:
      booleanField(sourcePacket, "execution_allowed") ?? booleanField(nestedReceipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit:
      booleanField(sourcePacket, "connects_managed_audit")
      ?? booleanField(nestedReceipt, "source_connects_managed_audit")
      ?? true,
    sourceReadsManagedAuditCredential:
      booleanField(sourcePacket, "reads_managed_audit_credential")
      ?? booleanField(nestedReceipt, "source_reads_managed_audit_credential")
      ?? true,
    sourceSchemaMigrationExecuted:
      booleanField(sourcePacket, "schema_migration_executed")
      ?? booleanField(nestedReceipt, "source_schema_migration_executed")
      ?? true,
    sourceAutomaticUpstreamStart:
      booleanField(sourcePacket, "automatic_upstream_start")
      ?? booleanField(nestedReceipt, "source_automatic_upstream_start")
      ?? true,
    operatorReviewFields,
    operatorFieldsMatchNodeV245: arraysEqual(operatorReviewFields, NODE_V245_OPERATOR_FIELDS),
    precheckItems,
    precheckItemsMatchNodeV245: arraysEqual(precheckItems, NODE_V245_PRECHECK_ITEMS),
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
    schemaMigrationExecutionAllowed: booleanField(nestedReceipt, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed:
      booleanField(receipt, "restore_execution_allowed") ?? booleanField(nestedReceipt, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(nestedReceipt, "load_restore_compact_executed") ?? true,
    setnxexExecutionAllowed: booleanField(nestedReceipt, "setnxex_execution_allowed") ?? true,
    managedAuditStorageBackend: booleanField(nestedReceipt, "managed_audit_storage_backend") ?? true,
    orderAuthoritative: booleanField(receipt, "order_authoritative") ?? booleanField(nestedReceipt, "order_authoritative") ?? true,
    readyForNodeV247Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV247Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-manual-sandbox-connection-precheck-non-participation-receipt.v1"
      && reference.releaseVersion === "v108"
      && reference.consumerHintAcceptedForCurrentPlan
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourcePrecheckProfileVersion === "managed-audit-manual-sandbox-connection-precheck-packet.v1"
      && reference.sourcePrecheckState === "manual-sandbox-connection-precheck-packet-ready"
      && reference.sourcePrecheckItemCount === 7
      && reference.sourceRequiredOperatorFieldCount === 6
      && reference.sourceTimeoutBudgetMs === 15000
      && reference.sourceReadyForPrecheckPacket
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyPrecheckPacket
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && reference.operatorFieldsMatchNodeV245
      && reference.precheckItemsMatchNodeV245
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
      && !reference.schemaMigrationExecutionAllowed
      && !reference.restoreExecutionAllowed
      && !reference.loadRestoreCompactExecuted
      && !reference.setnxexExecutionAllowed
      && !reference.managedAuditStorageBackend
      && !reference.orderAuthoritative,
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

function stringArrayField(input: Record<string, unknown>, key: string): readonly string[] | null {
  const value = input[key];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
