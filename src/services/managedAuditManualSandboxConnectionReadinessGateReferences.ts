import { createHash } from "node:crypto";

import {
  historicalEvidenceExists as existsSync,
  readHistoricalEvidenceFile as readFileSync,
  statHistoricalEvidence as statSync,
} from "./historicalEvidenceResolver.js";
import {
  ACCEPTED_MINI_KV_RUNTIME_NO_START_NO_WRITE_FOLLOW_UPS,
  JAVA_V92_BUILDER_SOURCE,
  JAVA_V92_RUNBOOK,
  JAVA_V92_WALKTHROUGH,
  MINI_KV_V101_FOLLOW_UP,
  MINI_KV_V101_RUNBOOK,
  MINI_KV_V101_WALKTHROUGH,
} from "./managedAuditManualSandboxConnectionReadinessGateConstants.js";
import type {
  JavaV92DryRunEnvelopeEchoReceiptReference,
  JsonObject,
  ManagedAuditManualSandboxConnectionReadinessGateProfile,
  MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
  ReadinessGateEvidenceFile,
  ReadinessGateSnippetMatch,
} from "./managedAuditManualSandboxConnectionReadinessGateTypes.js";
import type {
  ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
} from "./managedAuditManualSandboxConnectionDryRunRequestEnvelope.js";

export function createSourceNodeV236(
  source: ManagedAuditManualSandboxConnectionDryRunRequestEnvelopeProfile,
): ManagedAuditManualSandboxConnectionReadinessGateProfile["sourceNodeV236"] {
  return {
    sourceVersion: "Node v236",
    profileVersion: source.profileVersion,
    envelopeState: source.envelopeState,
    envelopeDigest: source.dryRunRequestEnvelope.envelopeDigest,
    readyForDryRunRequestEnvelope: source.readyForManagedAuditManualSandboxConnectionDryRunRequestEnvelope,
    readyForOperatorReview: source.dryRunRequestEnvelope.readyForOperatorReview,
    operatorReviewFieldCount: source.dryRunRequestEnvelope.operatorReviewFieldCount,
    credentialHandleOnly: source.dryRunRequestEnvelope.credentialHandleOnly,
    credentialValueIncluded: source.dryRunRequestEnvelope.credentialValueIncluded,
    actualConnectionAttempted: source.dryRunRequestEnvelope.actualConnectionAttempted,
    readyForSandboxAdapterConnectionFromSource: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
  };
}

export function createJavaV92Reference(
  files: ReadinessGateEvidenceFile[],
  snippets: ReadinessGateSnippetMatch[],
): JavaV92DryRunEnvelopeEchoReceiptReference {
  const evidencePresent = fileById(files, "java-v92-runbook").exists
    && fileById(files, "java-v92-walkthrough").exists
    && fileById(files, "java-v92-builder-source").exists;
  const echoedEnvelopeFieldCount = [
    snippetMatched(snippets, "java-v92-owner-field"),
    snippetMatched(snippets, "java-v92-credential-handle-field"),
    snippetMatched(snippets, "java-v92-schema-rehearsal-field"),
    snippetMatched(snippets, "java-v92-rollback-path-field"),
    snippetMatched(snippets, "java-v92-timeout-budget-field"),
    snippetMatched(snippets, "java-v92-manual-abort-field"),
  ].filter(Boolean).length;
  const readyForNodeV237ManualSandboxConnectionReadinessGate =
    snippetMatched(snippets, "java-v92-ready-for-node-v237-true");
  const credentialValueIncludedInEnvelope = !snippetMatched(snippets, "java-v92-credential-value-included-false");
  const credentialValueReadByJava = !snippetMatched(snippets, "java-v92-credential-value-read-false");
  const actualConnectionAttemptedByJava = !snippetMatched(snippets, "java-v92-actual-connection-false");
  const schemaMigrationSqlExecutedByJava = !snippetMatched(snippets, "java-v92-schema-migration-false");
  const approvalLedgerWrittenByJava = !snippetMatched(snippets, "java-v92-approval-ledger-false");
  const managedAuditStoreWrittenByJava = !snippetMatched(snippets, "java-v92-managed-store-false");
  const readyForManagedAuditSandboxAdapterConnection =
    !snippetMatched(snippets, "java-v92-ready-for-adapter-false");

  return {
    sourceVersion: "Java v92",
    headTag: "v92订单平台release-approval-sandbox-connection-dry-run-envelope-echo-receipt",
    runbookPath: JAVA_V92_RUNBOOK,
    walkthroughPath: JAVA_V92_WALKTHROUGH,
    builderSourcePath: JAVA_V92_BUILDER_SOURCE,
    evidencePresent,
    consumedNodeV236DryRunRequestEnvelope: snippetMatched(snippets, "java-v92-consumes-node-v236"),
    consumedProfileMatched: snippetMatched(snippets, "java-v92-consumed-profile"),
    nextNodeReadinessGateVersionMatched: snippetMatched(snippets, "java-v92-next-node-v237"),
    echoedEnvelopeFieldCount,
    allEnvelopeFieldsEchoed: echoedEnvelopeFieldCount === 6,
    credentialHandleOnly: snippetMatched(snippets, "java-v92-credential-handle-only"),
    credentialValueIncludedInEnvelope,
    credentialValueReadByJava,
    actualConnectionAttemptedByJava,
    schemaMigrationSqlExecutedByJava,
    approvalLedgerWrittenByJava,
    managedAuditStoreWrittenByJava,
    readyForNodeV237ManualSandboxConnectionReadinessGate,
    readyForManagedAuditSandboxAdapterConnection,
    readyForNodeV237Gate: evidencePresent
      && readyForNodeV237ManualSandboxConnectionReadinessGate
      && echoedEnvelopeFieldCount === 6
      && !credentialValueIncludedInEnvelope
      && !credentialValueReadByJava
      && !actualConnectionAttemptedByJava
      && !schemaMigrationSqlExecutedByJava
      && !approvalLedgerWrittenByJava
      && !managedAuditStoreWrittenByJava
      && !readyForManagedAuditSandboxAdapterConnection,
  };
}

export function createMiniKvV101Reference(
  files: ReadinessGateEvidenceFile[],
  followUp: JsonObject,
): MiniKvV101RuntimeNoStartNoWriteFollowUpReference {
  const sourceEnvelope = recordField(followUp, "source_envelope");
  const runtime = recordField(followUp, "runtime_no_start_no_write_follow_up");
  const historicalAnchors = arrayField(followUp, "historical_receipt_retention")
    .filter((entry): entry is JsonObject => typeof entry === "object" && entry !== null && !Array.isArray(entry));
  const evidencePresent = fileById(files, "mini-kv-v101-runbook").exists
    && fileById(files, "mini-kv-v101-walkthrough").exists
    && fileById(files, "mini-kv-v101-follow-up").exists;
  const followUpVersion = stringField(followUp, "follow_up_version") ?? "";
  const projectVersion = stringField(followUp, "project_version") ?? "";
  const releaseVersion = stringField(followUp, "release_version") ?? "";
  const consumerHint = stringField(followUp, "consumer_hint") ?? "";
  const sourceEnvelopeProducer = stringField(sourceEnvelope, "producer") ?? "";
  const operatorReviewFieldCount = numberField(sourceEnvelope, "operator_review_field_count") ?? 0;
  const credentialHandleOnly = booleanField(sourceEnvelope, "credential_handle_only") ?? false;
  const credentialValueIncluded = booleanField(sourceEnvelope, "credential_value_included") ?? true;
  const actualConnectionAttempted = booleanField(sourceEnvelope, "actual_connection_attempted") ?? true;
  const schemaMigrationRequested = booleanField(sourceEnvelope, "schema_migration_requested") ?? true;
  const managedAuditStateWriteRequested = booleanField(sourceEnvelope, "managed_audit_state_write_requested") ?? true;
  const upstreamServiceAutoStartRequested = booleanField(sourceEnvelope, "upstream_service_auto_start_requested") ?? true;
  const miniKvPermissionRequested = booleanField(sourceEnvelope, "mini_kv_permission_requested") ?? true;
  const readyForOperatorReview = booleanField(sourceEnvelope, "ready_for_operator_review") ?? false;
  const readyForManagedAuditSandboxAdapterConnection =
    booleanField(sourceEnvelope, "ready_for_managed_audit_sandbox_adapter_connection") ?? true;
  const historicalReceiptAnchorsStable = historicalAnchors.length >= 9
    && historicalAnchors.every((entry) => booleanField(entry, "must_remain_stable") === true
      && typeof stringField(entry, "historical_digest") === "string"
      && typeof stringField(entry, "consumed_release_version") === "string");

  const reference: MiniKvV101RuntimeNoStartNoWriteFollowUpReference = {
    sourceVersion: "mini-kv v101",
    headTag: "第一百零一版不自启不写入证据跟进",
    runbookPath: MINI_KV_V101_RUNBOOK,
    walkthroughPath: MINI_KV_V101_WALKTHROUGH,
    followUpPath: MINI_KV_V101_FOLLOW_UP,
    evidencePresent,
    followUpVersion,
    projectVersion,
    releaseVersion,
    consumerHint,
    sourceEnvelopeProducer,
    operatorReviewFieldCount,
    credentialHandleOnly,
    credentialValueIncluded,
    actualConnectionAttempted,
    schemaMigrationRequested,
    managedAuditStateWriteRequested,
    upstreamServiceAutoStartRequested,
    miniKvPermissionRequested,
    readyForOperatorReview,
    readyForManagedAuditSandboxAdapterConnection,
    readOnly: booleanField(runtime, "read_only") ?? false,
    executionAllowed: booleanField(runtime, "execution_allowed") ?? true,
    nodeAutoStartAllowed: booleanField(runtime, "node_auto_start_allowed") ?? true,
    javaAutoStartAllowed: booleanField(runtime, "java_auto_start_allowed") ?? true,
    miniKvAutoStartAllowed: booleanField(runtime, "mini_kv_auto_start_allowed") ?? true,
    connectionExecutionAllowed: booleanField(runtime, "connection_execution_allowed") ?? true,
    writeCommandsExecuted: booleanField(runtime, "write_commands_executed") ?? true,
    adminCommandsExecuted: booleanField(runtime, "admin_commands_executed") ?? true,
    runtimeWriteObserved: booleanField(runtime, "runtime_write_observed") ?? true,
    managedAuditStore: booleanField(runtime, "managed_audit_store") ?? true,
    storageWriteAllowed: booleanField(runtime, "storage_write_allowed") ?? true,
    managedAuditWriteExecuted: booleanField(runtime, "managed_audit_write_executed") ?? true,
    sandboxManagedAuditStateWriteAllowed: booleanField(runtime, "sandbox_managed_audit_state_write_allowed") ?? true,
    credentialValueReadAllowed: booleanField(runtime, "credential_value_read_allowed") ?? true,
    schemaRehearsalExecutionAllowed: booleanField(runtime, "schema_rehearsal_execution_allowed") ?? true,
    schemaMigrationExecutionAllowed: booleanField(runtime, "schema_migration_execution_allowed") ?? true,
    restoreExecutionAllowed: booleanField(runtime, "restore_execution_allowed") ?? true,
    loadRestoreCompactExecuted: booleanField(runtime, "load_restore_compact_executed") ?? true,
    orderAuthoritative: booleanField(runtime, "order_authoritative") ?? true,
    historicalReceiptAnchorCount: historicalAnchors.length,
    historicalReceiptAnchorsStable,
    readyForNodeV237Gate: false,
  };

  reference.readyForNodeV237Gate = evidencePresent
    && reference.followUpVersion === "mini-kv-runtime-no-start-no-write-follow-up.v1"
    && acceptedMiniKvRuntimeNoStartNoWriteFollowUp(reference)
    && reference.sourceEnvelopeProducer === "Node v236 manual sandbox connection dry-run request envelope"
    && reference.operatorReviewFieldCount === 6
    && reference.credentialHandleOnly
    && !reference.credentialValueIncluded
    && !reference.actualConnectionAttempted
    && !reference.schemaMigrationRequested
    && !reference.managedAuditStateWriteRequested
    && !reference.upstreamServiceAutoStartRequested
    && !reference.miniKvPermissionRequested
    && reference.readyForOperatorReview
    && !reference.readyForManagedAuditSandboxAdapterConnection
    && reference.readOnly
    && !reference.executionAllowed
    && !reference.nodeAutoStartAllowed
    && !reference.javaAutoStartAllowed
    && !reference.miniKvAutoStartAllowed
    && !reference.connectionExecutionAllowed
    && !reference.writeCommandsExecuted
    && !reference.adminCommandsExecuted
    && !reference.runtimeWriteObserved
    && !reference.managedAuditStore
    && !reference.storageWriteAllowed
    && !reference.managedAuditWriteExecuted
    && !reference.sandboxManagedAuditStateWriteAllowed
    && !reference.credentialValueReadAllowed
    && !reference.schemaRehearsalExecutionAllowed
    && !reference.schemaMigrationExecutionAllowed
    && !reference.restoreExecutionAllowed
    && !reference.loadRestoreCompactExecuted
    && !reference.orderAuthoritative
    && reference.historicalReceiptAnchorsStable;

  return reference;
}

function acceptedMiniKvRuntimeNoStartNoWriteFollowUp(
  reference: MiniKvV101RuntimeNoStartNoWriteFollowUpReference,
): boolean {
  return ACCEPTED_MINI_KV_RUNTIME_NO_START_NO_WRITE_FOLLOW_UPS.some((accepted) =>
    reference.projectVersion === accepted.projectVersion
    && reference.releaseVersion === accepted.releaseVersion
    && reference.consumerHint === accepted.consumerHint
  );
}

export function createEvidenceFiles(): ReadinessGateEvidenceFile[] {
  return [
    evidenceFile("java-v92-runbook", JAVA_V92_RUNBOOK),
    evidenceFile("java-v92-walkthrough", JAVA_V92_WALKTHROUGH),
    evidenceFile("java-v92-builder-source", JAVA_V92_BUILDER_SOURCE),
    evidenceFile("mini-kv-v101-runbook", MINI_KV_V101_RUNBOOK),
    evidenceFile("mini-kv-v101-walkthrough", MINI_KV_V101_WALKTHROUGH),
    evidenceFile("mini-kv-v101-follow-up", MINI_KV_V101_FOLLOW_UP),
  ];
}

export function createSnippetMatches(): ReadinessGateSnippetMatch[] {
  return [
    snippet("java-v92-consumes-node-v236", JAVA_V92_WALKTHROUGH, "Node v236 dry-run request envelope"),
    snippet("java-v92-consumed-profile", JAVA_V92_BUILDER_SOURCE, "NODE_V236_MANUAL_SANDBOX_CONNECTION_DRY_RUN_REQUEST_ENVELOPE_PROFILE"),
    snippet("java-v92-next-node-v237", JAVA_V92_BUILDER_SOURCE, "NODE_V237_MANUAL_SANDBOX_CONNECTION_READINESS_GATE_VERSION"),
    snippet("java-v92-owner-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_OWNER_APPROVAL_ARTIFACT_ID"),
    snippet("java-v92-credential-handle-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v92-schema-rehearsal-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_SCHEMA_REHEARSAL_ID"),
    snippet("java-v92-rollback-path-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_ROLLBACK_PATH_ID"),
    snippet("java-v92-timeout-budget-field", JAVA_V92_BUILDER_SOURCE, "TIMEOUT_BUDGET_FIELD = \"timeoutBudgetMs\""),
    snippet("java-v92-manual-abort-field", JAVA_V92_BUILDER_SOURCE, "ORDEROPS_MANAGED_AUDIT_MANUAL_ABORT"),
    snippet("java-v92-ready-for-node-v237-true", JAVA_V92_WALKTHROUGH, "readyForNodeV237ManualSandboxConnectionReadinessGate=true"),
    snippet("java-v92-credential-handle-only", JAVA_V92_WALKTHROUGH, "credentialHandleOnly=true"),
    snippet("java-v92-credential-value-included-false", JAVA_V92_WALKTHROUGH, "credentialValueIncludedInEnvelope=false"),
    snippet("java-v92-credential-value-read-false", JAVA_V92_WALKTHROUGH, "credentialValueReadByJava=false"),
    snippet("java-v92-actual-connection-false", JAVA_V92_WALKTHROUGH, "actualConnectionAttemptedByJava=false"),
    snippet("java-v92-schema-migration-false", JAVA_V92_WALKTHROUGH, "schemaMigrationSqlExecutedByJava=false"),
    snippet("java-v92-approval-ledger-false", JAVA_V92_WALKTHROUGH, "approvalLedgerWrittenByJava=false"),
    snippet("java-v92-managed-store-false", JAVA_V92_BUILDER_SOURCE, "managedAuditStoreWrittenByJava"),
    snippet("java-v92-ready-for-adapter-false", JAVA_V92_WALKTHROUGH, "readyForManagedAuditSandboxAdapterConnection=false"),
  ];
}

function evidenceFile(id: string, filePath: string): ReadinessGateEvidenceFile {
  if (!existsSync(filePath)) {
    return { id, path: filePath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readFileSync(filePath);
  return {
    id,
    path: filePath,
    exists: true,
    sizeBytes: statSync(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): ReadinessGateSnippetMatch {
  const content = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function fileById(files: ReadinessGateEvidenceFile[], id: string): ReadinessGateEvidenceFile {
  const file = files.find((entry) => entry.id === id);
  if (!file) {
    throw new Error(`Missing evidence file descriptor: ${id}`);
  }
  return file;
}

function snippetMatched(snippets: ReadinessGateSnippetMatch[], id: string): boolean {
  return snippets.find((entry) => entry.id === id)?.matched ?? false;
}

export function readJsonFile(filePath: string): JsonObject {
  if (!existsSync(filePath)) {
    return {};
  }
  const value = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function recordField(record: JsonObject, field: string): JsonObject {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as JsonObject : {};
}

function arrayField(record: JsonObject, field: string): unknown[] {
  const value = record[field];
  return Array.isArray(value) ? value : [];
}

function stringField(record: JsonObject, field: string): string | null {
  const value = record[field];
  return typeof value === "string" ? value : null;
}

function booleanField(record: JsonObject, field: string): boolean | null {
  const value = record[field];
  return typeof value === "boolean" ? value : null;
}

function numberField(record: JsonObject, field: string): number | null {
  const value = record[field];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
