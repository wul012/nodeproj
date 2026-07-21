import { mapReceiptFields } from "./historicalEvidenceReportUtils.js";

// Design: receipt schemas are ordered data maps. Verification services own
// acceptance predicates; this module only projects typed fields and fallbacks.

const PREFLIGHT_ROOT_FIELDS = [
  ["projectVersion", "project_version", "text", "missing"],
  ["releaseVersion", "release_version", "text", "missing"],
] as const;

const PREFLIGHT_GUARD_FIELDS = [
  ["consumer", "consumer", "text", "missing"],
  ["consumedReleaseVersion", "consumed_release_version", "text", "missing"],
  ["consumedMarkerDigest", "consumed_marker_digest", "text", "missing"],
  ["receiptDigest", "receipt_digest", "text", "missing"],
  ["manualWindowFlagName", "manual_window_flag_name", "text", "missing"],
  ["manualWindowMode", "manual_window_mode", "text", "missing"],
  ["timeoutBudgetMs", "timeout_budget_ms", "count", -1],
  ["readOnly", "read_only", "flag", false],
  ["executionAllowed", "execution_allowed", "flag", true],
  ["manualWindowOpenByDefault", "manual_window_open_by_default", "flag", true],
  ["connectionExecutionAllowed", "connection_execution_allowed", "flag", true],
  ["nodeAutoStartAllowed", "node_auto_start_allowed", "flag", true],
  ["javaAutoStartAllowed", "java_auto_start_allowed", "flag", true],
  ["miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", "flag", true],
  ["credentialValueReadAllowed", "credential_value_read_allowed", "flag", true],
  ["schemaRehearsalExecutionAllowed", "schema_rehearsal_execution_allowed", "flag", true],
  ["schemaMigrationExecutionAllowed", "schema_migration_execution_allowed", "flag", true],
  ["managedAuditWriteAllowed", "managed_audit_write_allowed", "flag", true],
  ["participatesInSandboxConnection", "participates_in_sandbox_connection", "flag", true],
  ["restoreExecutionAllowed", "restore_execution_allowed", "flag", true],
  ["orderAuthoritative", "order_authoritative", "flag", true],
] as const;

const OPERATOR_RECEIPT_FIELDS = [
  ["receiptVersion", "receipt_version", "text", "missing"],
  ["projectVersion", "current_project_version", "text", "missing"],
  ["releaseVersion", "current_release_version", "text", "missing"],
  ["consumerHint", "consumer_hint", "text", "missing"],
  ["sourceChecklist", "source_checklist", "text", "missing"],
  ["sourceChecklistState", "source_checklist_state", "text", "missing"],
  ["approvalItemCount", "approval_item_count", "count", -1],
  ["checklistStepCount", "checklist_step_count", "count", -1],
  ["pauseConditionCount", "pause_condition_count", "count", -1],
  ["forbiddenOperationCount", "forbidden_operation_count", "count", -1],
  ["readyForJavaV93EchoReceipt", "ready_for_java_v93_echo_receipt", "flag", false],
  ["readyForManagedAuditSandboxAdapterConnection", "ready_for_managed_audit_sandbox_adapter_connection", "flag", true],
  ["currentArtifactPathHint", "current_artifact_path_hint", "text", "missing"],
  ["currentLiveReadSessionEcho", "current_live_read_session_echo", "text", "missing"],
  ["readOnly", "read_only", "flag", false],
  ["executionAllowed", "execution_allowed", "flag", true],
  ["restoreExecutionAllowed", "restore_execution_allowed", "flag", true],
  ["orderAuthoritative", "order_authoritative", "flag", true],
  ["nodeAutoStartAllowed", "node_auto_start_allowed", "flag", true],
  ["javaAutoStartAllowed", "java_auto_start_allowed", "flag", true],
  ["miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", "flag", true],
  ["connectionExecutionAllowed", "connection_execution_allowed", "flag", true],
  ["writeCommandsExecuted", "write_commands_executed", "flag", true],
  ["adminCommandsExecuted", "admin_commands_executed", "flag", true],
  ["runtimeWriteObserved", "runtime_write_observed", "flag", true],
  ["managedAuditStore", "managed_audit_store", "flag", true],
  ["storageWriteAllowed", "storage_write_allowed", "flag", true],
  ["managedAuditWriteExecuted", "managed_audit_write_executed", "flag", true],
  ["sandboxManagedAuditStateWriteAllowed", "sandbox_managed_audit_state_write_allowed", "flag", true],
  ["credentialValueRequired", "credential_value_required", "flag", true],
  ["credentialValueReadAllowed", "credential_value_read_allowed", "flag", true],
  ["schemaRehearsalExecutionAllowed", "schema_rehearsal_execution_allowed", "flag", true],
  ["schemaMigrationExecutionAllowed", "schema_migration_execution_allowed", "flag", true],
  ["loadRestoreCompactExecuted", "load_restore_compact_executed", "flag", true],
  ["setnxexExecutionAllowed", "setnxex_execution_allowed", "flag", true],
  ["operatorWindowWriteAllowed", "operator_window_write_allowed", "flag", true],
] as const;

export function mapPreflightGuard(
  evidence: Record<string, unknown>,
  guard: Record<string, unknown>,
) {
  return {
    ...mapReceiptFields(evidence, PREFLIGHT_ROOT_FIELDS),
    ...mapReceiptFields(guard, PREFLIGHT_GUARD_FIELDS),
  };
}

export function mapOperatorReceipt(receipt: Record<string, unknown>) {
  return mapReceiptFields(receipt, OPERATOR_RECEIPT_FIELDS);
}
