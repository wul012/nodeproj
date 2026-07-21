import {
  booleanField,
  evidenceFile,
  mapReceiptFields,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  stringArrayField,
  stringField,
  type ReceiptFieldSpec,
} from "../historicalEvidenceReportUtils.js";
import {
  MINI_KV_V108_RECEIPT,
  MINI_KV_V108_RUNBOOK,
  MINI_KV_V108_WALKTHROUGH,
  NODE_V245_OPERATOR_FIELDS,
  NODE_V245_PRECHECK_ITEMS,
} from "./constants.js";
import type { MiniKvV108Receipt } from "./types.js";

type JsonObject = Record<string, unknown>;
type SnippetSpec = readonly [id: string, path: string, text: string];

const MINI_KV_SNIPPETS: readonly SnippetSpec[] = [
  ["mini-kv-v108-title", MINI_KV_V108_WALKTHROUGH, "manual_sandbox_connection_precheck_non_participation_receipt"],
  ["mini-kv-v108-consumer-hint", MINI_KV_V108_WALKTHROUGH, "Node v246"],
  ["mini-kv-v108-item-count", MINI_KV_V108_WALKTHROUGH, "source_precheck_item_count=7"],
  ["mini-kv-v108-field-count", MINI_KV_V108_WALKTHROUGH, "source_required_operator_field_count=6"],
  ["mini-kv-v108-timeout", MINI_KV_V108_WALKTHROUGH, "source_timeout_budget_ms=15000"],
  ["mini-kv-v108-no-auto-start", MINI_KV_V108_WALKTHROUGH, "mini_kv_auto_start_allowed=false"],
  ["mini-kv-v108-no-storage-write", MINI_KV_V108_WALKTHROUGH, "storage_write_allowed=false"],
  ["mini-kv-v108-no-credential-read", MINI_KV_V108_WALKTHROUGH, "credential_value_read_allowed=false"],
];

const BEFORE_RESTORE_FIELDS = [
  ["dryRunOnly", "dry_run_only", "flag", false],
  ["nodeAutoStartAllowed", "node_auto_start_allowed", "flag", true],
  ["javaAutoStartAllowed", "java_auto_start_allowed", "flag", true],
  ["miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", "flag", true],
  ["connectionExecutionAllowed", "connection_execution_allowed", "flag", true],
  ["storageWriteAllowed", "storage_write_allowed", "flag", true],
  ["managedAuditWriteExecuted", "managed_audit_write_executed", "flag", true],
  ["credentialValueReadAllowed", "credential_value_read_allowed", "flag", true],
  ["schemaMigrationExecutionAllowed", "schema_migration_execution_allowed", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const AFTER_RESTORE_FIELDS = [
  ["loadRestoreCompactExecuted", "load_restore_compact_executed", "flag", true],
  ["setnxexExecutionAllowed", "setnxex_execution_allowed", "flag", true],
  ["managedAuditStorageBackend", "managed_audit_storage_backend", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const RECEIPT_DIGEST = /^fnv1a64:[a-f0-9]{16}$/;

export function createMiniKvV108Receipt(
  root: JsonObject = readJsonObject(MINI_KV_V108_RECEIPT),
): MiniKvV108Receipt {
  const source = objectField(root, "source_precheck_packet");
  const receipt = objectField(root, "manual_sandbox_connection_precheck_non_participation_receipt");
  const operatorReviewFields = arrayPair(source, "operator_review_fields", receipt, "operator_review_fields");
  const precheckItems = arrayPair(source, "precheck_items", receipt, "precheck_items");
  const evidenceFiles = [
    evidenceFile("mini-kv-v108-receipt", MINI_KV_V108_RECEIPT, { textMode: "raw" }),
    evidenceFile("mini-kv-v108-walkthrough", MINI_KV_V108_WALKTHROUGH, { textMode: "raw" }),
    evidenceFile("mini-kv-v108-runbook", MINI_KV_V108_RUNBOOK, { textMode: "raw" }),
  ];
  const expectedSnippets = MINI_KV_SNIPPETS.map(([id, path, text]) => snippet(id, path, text));
  const consumerHint = textPair(root, "consumer_hint", receipt, "consumer_hint", "missing");
  const reference: MiniKvV108Receipt = {
    sourceVersion: "mini-kv v108",
    tagLabel: "第一百零八版手动沙箱预检非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion: textPair(root, "receipt_version", receipt, "receipt_version", "missing"),
    releaseVersion: textPair(root, "release_version", receipt, "current_release_version", "missing"),
    consumerHint,
    consumerHintAcceptedForCurrentPlan: acceptsConsumerHint(consumerHint),
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    ...sourceFields(source, receipt),
    operatorReviewFields,
    operatorFieldsMatchNodeV245: arraysEqual(operatorReviewFields, NODE_V245_OPERATOR_FIELDS),
    precheckItems,
    precheckItemsMatchNodeV245: arraysEqual(precheckItems, NODE_V245_PRECHECK_ITEMS),
    readOnly: flagPair(root, "read_only", receipt, "read_only", false),
    executionAllowed: flagPair(root, "execution_allowed", receipt, "execution_allowed", true),
    ...mapReceiptFields(receipt, BEFORE_RESTORE_FIELDS),
    restoreExecutionAllowed: flagPair(
      root,
      "restore_execution_allowed",
      receipt,
      "restore_execution_allowed",
      true,
    ),
    ...mapReceiptFields(receipt, AFTER_RESTORE_FIELDS),
    orderAuthoritative: flagPair(root, "order_authoritative", receipt, "order_authoritative", true),
    readyForNodeV247Alignment: false,
  };

  return { ...reference, readyForNodeV247Alignment: isAligned(reference) };
}

function sourceFields(source: JsonObject, receipt: JsonObject) {
  return {
    sourcePrecheckProfileVersion:
      textPair(source, "profile_version", receipt, "source_precheck_profile_version", "missing"),
    sourcePrecheckState:
      textPair(source, "precheck_state", receipt, "source_precheck_state", "missing"),
    sourcePrecheckItemCount:
      countPair(source, "precheck_item_count", receipt, "source_precheck_item_count", 0),
    sourceRequiredOperatorFieldCount:
      countPair(source, "required_operator_field_count", receipt, "source_required_operator_field_count", 0),
    sourceTimeoutBudgetMs:
      countPair(source, "timeout_budget_ms", receipt, "source_timeout_budget_ms", 0),
    sourceReadyForPrecheckPacket:
      flagPair(source, "ready_for_precheck_packet", receipt, "source_ready_for_precheck_packet", false),
    sourceReadyForManagedAuditSandboxAdapterConnection: flagPair(
      source,
      "ready_for_managed_audit_sandbox_adapter_connection",
      receipt,
      "source_ready_for_managed_audit_sandbox_adapter_connection",
      true,
    ),
    sourceReadOnlyPrecheckPacket:
      flagPair(source, "read_only_precheck_packet", receipt, "source_read_only_precheck_packet", false),
    sourceExecutionAllowed:
      flagPair(source, "execution_allowed", receipt, "source_execution_allowed", true),
    sourceConnectsManagedAudit:
      flagPair(source, "connects_managed_audit", receipt, "source_connects_managed_audit", true),
    sourceReadsManagedAuditCredential: flagPair(
      source,
      "reads_managed_audit_credential",
      receipt,
      "source_reads_managed_audit_credential",
      true,
    ),
    sourceSchemaMigrationExecuted: flagPair(
      source,
      "schema_migration_executed",
      receipt,
      "source_schema_migration_executed",
      true,
    ),
    sourceAutomaticUpstreamStart: flagPair(
      source,
      "automatic_upstream_start",
      receipt,
      "source_automatic_upstream_start",
      true,
    ),
  };
}

function textPair(
  primary: JsonObject,
  primaryKey: string,
  secondary: JsonObject,
  secondaryKey: string,
  fallback: string,
): string {
  return stringField(primary, primaryKey) ?? stringField(secondary, secondaryKey) ?? fallback;
}

function countPair(
  primary: JsonObject,
  primaryKey: string,
  secondary: JsonObject,
  secondaryKey: string,
  fallback: number,
): number {
  return numberField(primary, primaryKey) ?? numberField(secondary, secondaryKey) ?? fallback;
}

function flagPair(
  primary: JsonObject,
  primaryKey: string,
  secondary: JsonObject,
  secondaryKey: string,
  fallback: boolean,
): boolean {
  return booleanField(primary, primaryKey) ?? booleanField(secondary, secondaryKey) ?? fallback;
}

function arrayPair(
  primary: JsonObject,
  primaryKey: string,
  secondary: JsonObject,
  secondaryKey: string,
): readonly string[] {
  return exactStrings(primary, primaryKey) ?? exactStrings(secondary, secondaryKey) ?? [];
}

function exactStrings(input: JsonObject, key: string): readonly string[] | null {
  const value = input[key];
  const strings = stringArrayField(input, key);
  return Array.isArray(value) && strings.length === value.length ? strings : null;
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

function acceptsConsumerHint(value: string): boolean {
  return value === "Node v246 manual sandbox connection precheck upstream receipt verification"
    || value === "Node v247 manual sandbox connection precheck upstream receipt verification";
}

function isAligned(reference: MiniKvV108Receipt): boolean {
  return isIdentityReady(reference)
    && isSourceReady(reference)
    && isBoundaryClosed(reference);
}

function isIdentityReady(reference: MiniKvV108Receipt): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.receiptVersion === "mini-kv-manual-sandbox-connection-precheck-non-participation-receipt.v1"
    && reference.releaseVersion === "v108"
    && reference.consumerHintAcceptedForCurrentPlan
    && RECEIPT_DIGEST.test(reference.receiptDigest);
}

function isSourceReady(reference: MiniKvV108Receipt): boolean {
  return reference.sourcePrecheckProfileVersion === "managed-audit-manual-sandbox-connection-precheck-packet.v1"
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
    && reference.precheckItemsMatchNodeV245;
}

function isBoundaryClosed(reference: MiniKvV108Receipt): boolean {
  return reference.readOnly
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
    && !reference.orderAuthoritative;
}
