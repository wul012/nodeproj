import {
  booleanField,
  evidenceFile,
  mapReceiptFields,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringField,
  type ReceiptFieldSpec,
} from "./historicalEvidenceReportUtils.js";
import { allBooleanFieldsAre } from "./liveProbeReportUtils.js";
import type {
  JavaV102DisabledAdapterClientEchoReference,
  MiniKvV111DisabledAdapterClientNonParticipationReference,
} from "./managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationTypes.js";

const JAVA_V102_RUNBOOK = "D:/javaproj/advanced-order-platform/c/102/解释/说明.md";
const JAVA_V102_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/105-version-102-disabled-adapter-client-precheck-echo-receipt.md";
const JAVA_V102_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceiptBuilder.java";
const MINI_KV_V111_RECEIPT =
  "D:/C/mini-kv/fixtures/release/disabled-adapter-client-non-participation-receipt.json";
const MINI_KV_V111_RUNBOOK = "D:/C/mini-kv/c/111/解释/说明.md";

const V111_SOURCE_FIELDS = [
  ["receiptDigest", "receipt_digest", "text", "missing"],
  ["sourcePrecheckProfileVersion", "source_precheck_profile_version", "text", "missing"],
  ["sourcePrecheckState", "source_precheck_state", "text", "missing"],
  ["sourceRequiredEnvHandleCount", "source_required_env_handle_count", "count", 0],
  ["sourceFailureClassCount", "source_failure_class_count", "count", 0],
  ["sourceDryRunResponseFieldCount", "source_dry_run_response_field_count", "count", 0],
  ["sourceReusedNoGoConditionCount", "source_reused_no_go_condition_count", "count", 0],
  ["sourceReadyForDisabledAdapterClientPrecheck", "source_ready_for_disabled_adapter_client_precheck", "flag", false],
  ["sourceReadyForManagedAuditSandboxAdapterConnection", "source_ready_for_managed_audit_sandbox_adapter_connection", "flag", true],
  ["sourceExternalRequestMayBeSent", "source_external_request_may_be_sent", "flag", true],
  ["sourceCredentialValueMayBeLoaded", "source_credential_value_may_be_loaded", "flag", true],
  ["sourceShellProfileVersion", "source_shell_profile_version", "text", "missing"],
  ["sourceShellState", "source_shell_state", "text", "missing"],
  ["sourceTransportKind", "source_transport_kind", "text", "missing"],
  ["sourceRequestShapeFieldCount", "source_request_shape_field_count", "count", 0],
  ["sourceResponseShapeFieldCount", "source_response_shape_field_count", "count", 0],
  ["sourceFailureMappingCount", "source_failure_mapping_count", "count", 0],
  ["sourceGuardConditionCount", "source_guard_condition_count", "count", 0],
  ["sourceFakeTransportOnly", "source_fake_transport_only", "flag", false],
  ["sourceRealClientImplemented", "source_real_client_implemented", "flag", true],
  ["sourceRealTransportAllowed", "source_real_transport_allowed", "flag", true],
  ["sourceFakeTransportProbeNoExternalRequest", "source_fake_transport_probe_no_external_request", "flag", false],
  ["sourceFakeTransportProbeNoCredentialRead", "source_fake_transport_probe_no_credential_read", "flag", false],
  ["sourceFakeTransportProbeNoProductionWrite", "source_fake_transport_probe_no_production_write", "flag", false],
] as const satisfies readonly ReceiptFieldSpec[];

const V111_REQUEST_FIELDS = [
  ["requestCredentialHandleOnly", "credential_handle_only", "flag", false],
  ["requestCredentialValueAccepted", "credential_value_accepted", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V111_RESPONSE_FIELDS = [
  ["responseExternalRequestSent", "external_request_sent", "flag", true],
  ["responseCredentialValueRead", "credential_value_read", "flag", true],
  ["responseProductionRecordWritten", "production_record_written", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V111_BOUNDARY_FIELDS = [
  ["dryRunOnly", "dry_run_only", "flag", false],
  ["nodeAutoStartAllowed", "node_auto_start_allowed", "flag", true],
  ["javaAutoStartAllowed", "java_auto_start_allowed", "flag", true],
  ["miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", "flag", true],
  ["connectionExecutionAllowed", "connection_execution_allowed", "flag", true],
  ["storageWriteAllowed", "storage_write_allowed", "flag", true],
  ["managedAuditWriteExecuted", "managed_audit_write_executed", "flag", true],
  ["credentialValueReadAllowed", "credential_value_read_allowed", "flag", true],
  ["credentialValueLoaded", "credential_value_loaded", "flag", true],
  ["externalRequestSent", "external_request_sent", "flag", true],
  ["schemaMigrationExecutionAllowed", "schema_migration_execution_allowed", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const V111_POST_RESTORE_FIELDS = [
  ["loadRestoreCompactExecuted", "load_restore_compact_executed", "flag", true],
  ["setnxexExecutionAllowed", "setnxex_execution_allowed", "flag", true],
  ["managedAuditStorageBackend", "managed_audit_storage_backend", "flag", true],
] as const satisfies readonly ReceiptFieldSpec[];

const JAVA_READY_TRUE_FIELDS = [
  "evidencePresent",
  "verificationDocumented",
  "readyForNodeV254DisabledAdapterClientUpstreamEchoVerification",
] as const;

const JAVA_READY_FALSE_FIELDS = [
  "clientMayBeInstantiated",
  "externalRequestMayBeSent",
  "credentialValueMayBeLoaded",
  "actualConnectionAttemptedByJava",
  "externalRequestSentByJava",
  "schemaMigrationSqlExecutedByJava",
  "approvalLedgerWrittenByJava",
  "upstreamServiceAutoStartRequestedByJava",
  "miniKvWritePermissionRequestedByJava",
  "readyForManagedAuditSandboxAdapterConnection",
] as const;

const V111_SOURCE_TRUE_FIELDS = [
  "sourceReadyForDisabledAdapterClientPrecheck",
  "sourceFakeTransportOnly",
  "sourceFakeTransportProbeNoExternalRequest",
  "sourceFakeTransportProbeNoCredentialRead",
  "sourceFakeTransportProbeNoProductionWrite",
] as const;

const V111_SOURCE_FALSE_FIELDS = [
  "sourceReadyForManagedAuditSandboxAdapterConnection",
  "sourceExternalRequestMayBeSent",
  "sourceCredentialValueMayBeLoaded",
  "sourceRealClientImplemented",
  "sourceRealTransportAllowed",
] as const;

const V111_RUNTIME_TRUE_FIELDS = [
  "requestCredentialHandleOnly",
  "readOnly",
  "dryRunOnly",
] as const;

const V111_RUNTIME_FALSE_FIELDS = [
  "requestCredentialValueAccepted",
  "responseExternalRequestSent",
  "responseCredentialValueRead",
  "responseProductionRecordWritten",
  "executionAllowed",
  "nodeAutoStartAllowed",
  "javaAutoStartAllowed",
  "miniKvAutoStartAllowed",
  "connectionExecutionAllowed",
  "storageWriteAllowed",
  "managedAuditWriteExecuted",
  "credentialValueReadAllowed",
  "credentialValueLoaded",
  "externalRequestSent",
  "schemaMigrationExecutionAllowed",
  "restoreExecutionAllowed",
  "loadRestoreCompactExecuted",
  "setnxexExecutionAllowed",
  "managedAuditStorageBackend",
  "orderAuthoritative",
] as const;

export function createJavaV102Reference(): JavaV102DisabledAdapterClientEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v102-runbook", JAVA_V102_RUNBOOK, { textMode: "raw" }),
    evidenceFile("java-v102-walkthrough", JAVA_V102_WALKTHROUGH, { textMode: "raw" }),
    evidenceFile("java-v102-builder", JAVA_V102_BUILDER, { textMode: "raw" }),
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
  const reference: JavaV102DisabledAdapterClientEchoReference = {
    sourceVersion: "Java v102",
    tagLabel: "v102订单平台disabled-adapter-client-precheck-echo-receipt",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v102-schema")
      ? "java-release-approval-rehearsal-response-schema.v24"
      : "missing",
    receiptField: snippetMatched(expectedSnippets, "java-v102-receipt-field")
      ? "managedAuditSandboxConnectionDisabledAdapterClientPrecheckEchoReceipt"
      : "missing",
    consumedByNodeDisabledAdapterClientPrecheckProfile:
      snippetMatched(expectedSnippets, "java-v102-ready-node-v254")
        ? "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1"
        : "missing",
    consumedByNodeTestOnlyAdapterShellProfile:
      snippetMatched(expectedSnippets, "java-v102-node-v253-ready")
        ? "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1"
        : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v102-ready-node-v254")
      ? "Node v254"
      : "missing",
    requiredEnvHandleCount: snippetMatched(expectedSnippets, "java-v102-env-count") ? 5 : 0,
    failureClassCount: snippetMatched(expectedSnippets, "java-v102-failure-count") ? 6 : 0,
    dryRunResponseFieldCount: snippetMatched(expectedSnippets, "java-v102-dry-run-count") ? 10 : 0,
    reusedNoGoConditionCount: snippetMatched(expectedSnippets, "java-v102-no-go-count") ? 8 : 0,
    readyForNodeV254DisabledAdapterClientUpstreamEchoVerification:
      snippetMatched(expectedSnippets, "java-v102-ready-node-v254"),
    clientMayBeInstantiated: false,
    externalRequestMayBeSent: false,
    credentialValueMayBeLoaded: false,
    actualConnectionAttemptedByJava: false,
    externalRequestSentByJava: false,
    schemaMigrationSqlExecutedByJava: false,
    approvalLedgerWrittenByJava: false,
    upstreamServiceAutoStartRequestedByJava: false,
    miniKvWritePermissionRequestedByJava: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForNodeV254Alignment: false,
  };

  return { ...reference, readyForNodeV254Alignment: isJavaV102Ready(reference) };
}

export function createMiniKvV111Reference(): MiniKvV111DisabledAdapterClientNonParticipationReference {
  const receipt = readJsonObject(MINI_KV_V111_RECEIPT);
  const nestedReceipt = objectField(receipt, "disabled_adapter_client_non_participation_receipt");
  const requestShape = objectField(nestedReceipt, "request_shape");
  const responseShape = objectField(nestedReceipt, "response_shape");
  const evidenceFiles = [
    evidenceFile("mini-kv-v111-receipt", MINI_KV_V111_RECEIPT, { textMode: "raw" }),
    evidenceFile("mini-kv-v111-runbook", MINI_KV_V111_RUNBOOK, { textMode: "raw" }),
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
  const reference: MiniKvV111DisabledAdapterClientNonParticipationReference = {
    sourceVersion: "mini-kv v111",
    tagLabel: "第一百一十一版禁用适配器客户端非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    ...readV111Fields(receipt, nestedReceipt, requestShape, responseShape),
    readyForNodeV254Alignment: false,
  };

  return { ...reference, readyForNodeV254Alignment: isMiniKvV111Ready(reference) };
}

function readV111Fields(
  receipt: Record<string, unknown>,
  nested: Record<string, unknown>,
  request: Record<string, unknown>,
  response: Record<string, unknown>,
) {
  return {
    receiptVersion: stringField(receipt, "receipt_version") ?? stringField(nested, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "release_version") ?? stringField(nested, "current_release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(nested, "consumer_hint") ?? "missing",
    ...mapReceiptFields(nested, V111_SOURCE_FIELDS),
    ...mapReceiptFields(request, V111_REQUEST_FIELDS),
    ...mapReceiptFields(response, V111_RESPONSE_FIELDS),
    readOnly: booleanField(receipt, "read_only") ?? booleanField(nested, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed")
      ?? booleanField(nested, "execution_allowed")
      ?? true,
    ...mapReceiptFields(nested, V111_BOUNDARY_FIELDS),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed")
      ?? booleanField(nested, "restore_execution_allowed")
      ?? true,
    ...mapReceiptFields(nested, V111_POST_RESTORE_FIELDS),
    orderAuthoritative: booleanField(receipt, "order_authoritative")
      ?? booleanField(nested, "order_authoritative")
      ?? true,
  };
}

function isJavaV102Ready(reference: JavaV102DisabledAdapterClientEchoReference): boolean {
  return reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v24"
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
    && allBooleanFieldsAre(reference, JAVA_READY_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, JAVA_READY_FALSE_FIELDS, false);
}

function isMiniKvV111Ready(reference: MiniKvV111DisabledAdapterClientNonParticipationReference): boolean {
  return hasV111Identity(reference)
    && hasV111SourcePrecheck(reference)
    && hasV111ShellShape(reference)
    && keepsV111RuntimeClosed(reference);
}

function hasV111Identity(reference: MiniKvV111DisabledAdapterClientNonParticipationReference): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.receiptVersion === "mini-kv-disabled-adapter-client-non-participation-receipt.v1"
    && reference.releaseVersion === "v111"
    && reference.consumerHint === "Node v254 disabled adapter client upstream echo verification"
    && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest);
}

function hasV111SourcePrecheck(reference: MiniKvV111DisabledAdapterClientNonParticipationReference): boolean {
  return reference.sourcePrecheckProfileVersion
      === "managed-audit-manual-sandbox-connection-disabled-adapter-client-precheck.v1"
    && reference.sourcePrecheckState === "disabled-adapter-client-precheck-ready"
    && reference.sourceRequiredEnvHandleCount === 5
    && reference.sourceFailureClassCount === 6
    && reference.sourceDryRunResponseFieldCount === 10
    && reference.sourceReusedNoGoConditionCount === 8
    && allBooleanFieldsAre(reference, V111_SOURCE_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, V111_SOURCE_FALSE_FIELDS, false);
}

function hasV111ShellShape(reference: MiniKvV111DisabledAdapterClientNonParticipationReference): boolean {
  return reference.sourceShellProfileVersion
      === "managed-audit-manual-sandbox-connection-test-only-adapter-shell-contract.v1"
    && reference.sourceShellState === "test-only-adapter-shell-contract-ready"
    && reference.sourceTransportKind === "fake-in-memory"
    && reference.sourceRequestShapeFieldCount === 8
    && reference.sourceResponseShapeFieldCount === 9
    && reference.sourceFailureMappingCount === 6
    && reference.sourceGuardConditionCount === 7;
}

function keepsV111RuntimeClosed(reference: MiniKvV111DisabledAdapterClientNonParticipationReference): boolean {
  return allBooleanFieldsAre(reference, V111_RUNTIME_TRUE_FIELDS, true)
    && allBooleanFieldsAre(reference, V111_RUNTIME_FALSE_FIELDS, false);
}
