import {
  booleanField,
  isNonNullString,
  mapReceiptFields,
  numberField,
  objectArrayField,
  objectField,
  stringArrayField,
  stringField,
} from "../services/historicalEvidenceReportUtils.js";
import type {
  MiniKvV117FakeShellArchiveNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationTypes.js";
import type {
  MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationTypes.js";
import type {
  MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";
import type {
  MiniKvV114CredentialResolverNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

type V114Fields = Omit<MiniKvV114CredentialResolverNonParticipationReference,
  "sourceVersion" | "tagLabel" | "evidenceFiles" | "expectedSnippets"
  | "evidencePresent" | "verificationDocumented" | "readyForNodeV261Alignment">;
type V115Fields = Omit<MiniKvV115CredentialResolverDisabledPrecheckNonParticipationReference,
  "sourceVersion" | "tagLabel" | "evidenceFiles" | "expectedSnippets"
  | "evidencePresent" | "verificationDocumented" | "readyForNodeV263Alignment">;
type V116Fields = Omit<MiniKvV116CredentialResolverTestOnlyShellNonParticipationReference,
  "sourceVersion" | "tagLabel" | "evidenceFiles" | "expectedSnippets"
  | "evidencePresent" | "verificationDocumented" | "readyForNodeV265Alignment">;
type V117Fields = Omit<MiniKvV117FakeShellArchiveNonParticipationReference,
  "sourceVersion" | "tagLabel" | "evidenceFiles" | "expectedSnippets"
  | "evidencePresent" | "verificationDocumented" | "readyForNodeV267Alignment">;

const START_FIELDS = [
  flag("nodeAutoStartAllowed", "node_auto_start_allowed", true),
  flag("javaAutoStartAllowed", "java_auto_start_allowed", true),
  flag("miniKvAutoStartAllowed", "mini_kv_auto_start_allowed", true),
  flag("externalAuditServiceAutoStartAllowed", "external_audit_service_auto_start_allowed", true),
] as const;

const WRITE_FIELDS = [
  flag("connectionExecutionAllowed", "connection_execution_allowed", true),
  flag("storageWriteAllowed", "storage_write_allowed", true),
  flag("managedAuditWriteExecuted", "managed_audit_write_executed", true),
  flag("approvalLedgerWriteAllowed", "approval_ledger_write_allowed", true),
  flag("approvalLedgerWriteExecuted", "approval_ledger_write_executed", true),
  flag("sandboxManagedAuditStateWriteAllowed", "sandbox_managed_audit_state_write_allowed", true),
  flag("credentialValueRequired", "credential_value_required", true),
] as const;

const VALUE_FIELDS = [
  flag("credentialValueReadAllowed", "credential_value_read_allowed", true),
  flag("credentialValueLoaded", "credential_value_loaded", true),
  flag("credentialValueStored", "credential_value_stored", true),
  flag("credentialValueIncluded", "credential_value_included", true),
  flag("rawEndpointUrlParsed", "raw_endpoint_url_parsed", true),
  flag("rawEndpointUrlIncluded", "raw_endpoint_url_included", true),
  flag("externalRequestSent", "external_request_sent", true),
] as const;

const FINAL_EXEC_FIELDS = [
  flag("schemaMigrationExecutionAllowed", "schema_migration_execution_allowed", true),
  flag("restoreExecutionAllowed", "restore_execution_allowed", true),
  flag("loadRestoreCompactExecuted", "load_restore_compact_executed", true),
  flag("setnxexExecutionAllowed", "setnxex_execution_allowed", true),
] as const;

const V114_SOURCE_FIELDS = [
  text("receiptDigest", "receipt_digest", "missing"),
  text("sourceDecisionProfileVersion", "source_decision_profile_version", "missing"),
  text("sourceDecisionState", "source_decision_state", "missing"),
  text("sourceRecordMode", "source_record_mode", "missing"),
  text("sourceDecisionScope", "source_decision_scope", "missing"),
  text("sourceDecisionStatus", "source_decision_status", "missing"),
  text("sourceSpan", "source_span", "missing"),
  flag("sourceReadyForDecisionRecord", "source_ready_for_credential_resolver_decision_record", false),
  flag("sourceReadyForManagedAuditSandboxAdapterConnection", "source_ready_for_managed_audit_sandbox_adapter_connection", true),
  flag("sourceReadOnlyDecisionRecord", "source_read_only_decision_record", false),
  flag("sourceCredentialResolverDecisionOnly", "source_credential_resolver_decision_only", false),
  flag("sourceExecutionAllowed", "source_execution_allowed", true),
  flag("sourceConnectsManagedAudit", "source_connects_managed_audit", true),
  flag("sourceReadsManagedAuditCredential", "source_reads_managed_audit_credential", true),
  flag("sourceStoresManagedAuditCredential", "source_stores_managed_audit_credential", true),
  flag("sourceCredentialValueRead", "source_credential_value_read", true),
  flag("sourceCredentialValueLoaded", "source_credential_value_loaded", true),
  flag("sourceCredentialValueIncluded", "source_credential_value_included", true),
  flag("sourceRawEndpointUrlParsed", "source_raw_endpoint_url_parsed", true),
  flag("sourceRawEndpointUrlIncluded", "source_raw_endpoint_url_included", true),
  flag("sourceExternalRequestSent", "source_external_request_sent", true),
  flag("sourceSchemaMigrationExecuted", "source_schema_migration_executed", true),
  flag("sourceAutomaticUpstreamStart", "source_automatic_upstream_start", true),
  count("sourceRequiredDecisionFieldCount", "source_required_decision_field_count", 0),
  count("sourceExplicitNoGoConditionCount", "source_explicit_no_go_condition_count", 0),
  count("sourceCheckCount", "source_check_count", 0),
  count("sourcePassedCheckCount", "source_passed_check_count", 0),
  count("sourceProductionBlockerCount", "source_production_blocker_count", -1),
  count("sourceWarningCount", "source_warning_count", -1),
  count("sourceRecommendationCount", "source_recommendation_count", -1),
  flag("sourceNodeV259Ready", "source_node_v259_ready", false),
  flag("sourceNodeV259BlocksRealConnection", "source_node_v259_blocks_real_connection", false),
  flag("sourceNodeV259CredentialBoundaryAligned", "source_node_v259_credential_boundary_aligned", false),
  flag("sourceNodeV259RawEndpointBoundaryAligned", "source_node_v259_raw_endpoint_boundary_aligned", false),
  flag("sourceNodeV259WriteBoundaryAligned", "source_node_v259_write_boundary_aligned", false),
  flag("sourceNodeV259AutoStartBoundaryAligned", "source_node_v259_auto_start_boundary_aligned", false),
  flag("sourceNodeV259KeepsMiniKvNonParticipant", "source_node_v259_keeps_mini_kv_non_participant", false),
  count("sourceNodeV259EvidenceFileCount", "source_node_v259_evidence_file_count", 0),
  count("sourceNodeV259MatchedSnippetCount", "source_node_v259_matched_snippet_count", 0),
  flag("sourceNodeV259ReadyForNodeV260DecisionRecord", "source_node_v259_ready_for_node_v260_decision_record", false),
  flag("sourceUpstreamActionsStillDisabled", "source_upstream_actions_still_disabled", false),
] as const;

const V114_DECISION_FIELDS = [
  text("endpointHandle", "endpoint_handle", "missing"),
  text("credentialHandle", "credential_handle", "missing"),
  text("resolverPolicyHandle", "resolver_policy_handle", "missing"),
  text("approvalMarker", "approval_marker", "missing"),
  flag("operatorIdentityRequired", "operator_identity_required", false),
  flag("approvalCorrelationRequired", "approval_correlation_required", false),
  text("resolverMode", "resolver_mode", "missing"),
  text("resolverCandidateImplementation", "resolver_candidate_implementation", "missing"),
  count("requiredDecisionFieldCount", "required_decision_field_count", 0),
  count("explicitNoGoConditionCount", "explicit_no_go_condition_count", 0),
] as const;

const V114_BOUNDARY_FIELDS = [
  flag("readOnly", "read_only", false),
  flag("executionAllowed", "execution_allowed", true),
  flag("dryRunOnly", "dry_run_only", false),
  flag("credentialResolverDecisionOnly", "credential_resolver_decision_only", false),
  flag("credentialResolverImplemented", "credential_resolver_implemented", true),
  flag("credentialResolverInvoked", "credential_resolver_invoked", true),
  flag("secretProviderInstantiated", "secret_provider_instantiated", true),
  ...START_FIELDS,
  ...WRITE_FIELDS,
  ...VALUE_FIELDS,
  flag("schemaRehearsalExecutionAllowed", "schema_rehearsal_execution_allowed", true),
  ...FINAL_EXEC_FIELDS,
  flag("managedAuditStorageBackend", "managed_audit_storage_backend", true),
  flag("sandboxAuditStorageBackend", "sandbox_audit_storage_backend", true),
  flag("orderAuthoritative", "order_authoritative", true),
] as const;

export function readV114Fields(root: Record<string, unknown>): V114Fields {
  const receipt = objectField(root, "credential_resolver_non_participation_receipt");
  const decision = objectField(receipt, "decision_record");
  const requiredIds = objectArrayField(receipt, "required_decision_fields")
    .map((field) => stringField(field, "id")).filter(isNonNullString);
  return {
    receiptVersion: stringField(receipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "current_release_version") ?? stringField(root, "release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(root, "consumer_hint") ?? "missing",
    ...mapReceiptFields(receipt, V114_SOURCE_FIELDS),
    ...mapReceiptFields(decision, V114_DECISION_FIELDS),
    requiredDecisionFieldIds: requiredIds,
    explicitNoGoConditionCodes: stringArrayField(receipt, "explicit_no_go_conditions"),
    ...mapReceiptFields(receipt, V114_BOUNDARY_FIELDS),
  };
}

const V115_SOURCE_FIELDS = [
  text("receiptDigest", "receipt_digest"),
  text("sourcePrecheckProfileVersion", "source_precheck_profile_version"),
  text("sourcePrecheckState", "source_precheck_state"),
  text("sourcePrecheckMode", "source_precheck_mode"),
  text("sourceSpan", "source_span"),
  flag("sourceReadyForDisabledPrecheck", "source_ready_for_disabled_credential_resolver_precheck", false),
  flag("sourceReadyForManagedAuditSandboxAdapterConnection", "source_ready_for_managed_audit_sandbox_adapter_connection", true),
  flag("sourceReadOnlyDisabledPrecheck", "source_read_only_disabled_precheck", false),
  flag("sourceDisabledCredentialResolverPrecheckOnly", "source_disabled_credential_resolver_precheck_only", false),
  flag("sourceCredentialResolverExecutionAllowed", "source_credential_resolver_execution_allowed", true),
  flag("sourceExecutionAllowed", "source_execution_allowed", true),
  flag("sourceConnectsManagedAudit", "source_connects_managed_audit", true),
  flag("sourceReadsManagedAuditCredential", "source_reads_managed_audit_credential", true),
  flag("sourceStoresManagedAuditCredential", "source_stores_managed_audit_credential", true),
  flag("sourceCredentialValueRead", "source_credential_value_read", true),
  flag("sourceCredentialValueLoaded", "source_credential_value_loaded", true),
  flag("sourceCredentialValueStored", "source_credential_value_stored", true),
  flag("sourceCredentialValueIncluded", "source_credential_value_included", true),
  flag("sourceRawEndpointUrlParsed", "source_raw_endpoint_url_parsed", true),
  flag("sourceRawEndpointUrlIncluded", "source_raw_endpoint_url_included", true),
  flag("sourceExternalRequestSent", "source_external_request_sent", true),
  flag("sourceSecretProviderInstantiated", "source_secret_provider_instantiated", true),
  flag("sourceResolverClientInstantiated", "source_resolver_client_instantiated", true),
  flag("sourceSchemaMigrationExecuted", "source_schema_migration_executed", true),
  flag("sourceAutomaticUpstreamStart", "source_automatic_upstream_start", true),
  count("sourceRequiredEnvHandleCount", "source_required_env_handle_count", 0),
  count("sourceOptInGateCount", "source_opt_in_gate_count", 0),
  count("sourceFailureClassCount", "source_failure_class_count", 0),
  count("sourceDryRunResponseFieldCount", "source_dry_run_response_field_count", 0),
  count("sourceInheritedNoGoConditionCount", "source_inherited_no_go_condition_count", 0),
  count("sourceCheckCount", "source_check_count", 0),
  count("sourcePassedCheckCount", "source_passed_check_count", 0),
  count("sourceProductionBlockerCount", "source_production_blocker_count", -1),
  count("sourceWarningCount", "source_warning_count", -1),
  count("sourceRecommendationCount", "source_recommendation_count", -1),
  flag("sourceNodeV261Ready", "source_node_v261_ready", false),
  text("sourceNodeV261VerificationMode", "source_node_v261_verification_mode"),
  text("sourceNodeV261Span", "source_node_v261_span"),
  flag("sourceNodeV261BlocksCredentialResolution", "source_node_v261_blocks_credential_resolution", false),
  flag("sourceNodeV261CredentialBoundaryAligned", "source_node_v261_credential_boundary_aligned", false),
  flag("sourceNodeV261RawEndpointBoundaryAligned", "source_node_v261_raw_endpoint_boundary_aligned", false),
  flag("sourceNodeV261ConnectionBoundaryAligned", "source_node_v261_connection_boundary_aligned", false),
  flag("sourceNodeV261WriteBoundaryAligned", "source_node_v261_write_boundary_aligned", false),
  flag("sourceNodeV261AutoStartBoundaryAligned", "source_node_v261_auto_start_boundary_aligned", false),
  flag("sourceNodeV261UpstreamActionsStillDisabled", "source_node_v261_upstream_actions_still_disabled", false),
] as const;

const V115_PRECHECK_FIELDS = [
  text("disabledPrecheckMode", "precheck_mode"),
  text("disabledPrecheckReadyState", "ready_state"),
  text("resolverImplementationStatus", "resolver_implementation_status"),
  text("secretProviderImplementationStatus", "secret_provider_implementation_status"),
  flag("resolverClientMayBeInstantiated", "resolver_client_may_be_instantiated", true),
  flag("secretProviderMayBeInstantiated", "secret_provider_may_be_instantiated", true),
  flag("credentialValueMayBeLoaded", "credential_value_may_be_loaded", true),
  flag("rawEndpointUrlMayBeParsed", "raw_endpoint_url_may_be_parsed", true),
  flag("externalRequestMayBeSent", "external_request_may_be_sent", true),
  flag("optInGateRequired", "opt_in_gate_required", false),
  count("requiredEnvHandleCount", "required_env_handle_count", 0),
  count("optInGateCount", "opt_in_gate_count", 0),
  count("failureClassCount", "failure_class_count", 0),
  count("dryRunResponseFieldCount", "dry_run_response_field_count", 0),
  count("inheritedNoGoConditionCount", "inherited_no_go_condition_count", 0),
] as const;

const V115_BOUNDARY_FIELDS = [
  flag("readOnly", "read_only", false),
  flag("executionAllowed", "execution_allowed", true),
  flag("dryRunOnly", "dry_run_only", false),
  flag("disabledCredentialResolverPrecheckOnly", "disabled_credential_resolver_precheck_only", false),
  flag("credentialResolverImplemented", "credential_resolver_implemented", true),
  flag("credentialResolverInvoked", "credential_resolver_invoked", true),
  flag("secretProviderInstantiated", "secret_provider_instantiated", true),
  flag("resolverClientInstantiated", "resolver_client_instantiated", true),
  ...START_FIELDS,
  ...WRITE_FIELDS,
  ...VALUE_FIELDS,
  flag("schemaRehearsalExecutionAllowed", "schema_rehearsal_execution_allowed", true),
  ...FINAL_EXEC_FIELDS,
  flag("managedAuditStorageBackend", "managed_audit_storage_backend", true),
  flag("sandboxAuditStorageBackend", "sandbox_audit_storage_backend", true),
  flag("orderAuthoritative", "order_authoritative", true),
] as const;

export function readV115Fields(root: Record<string, unknown>): V115Fields {
  const receipt = objectField(root, "disabled_credential_resolver_precheck_non_participation_receipt");
  const precheck = objectField(receipt, "disabled_precheck");
  const response = objectField(receipt, "dry_run_response_shape");
  return {
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    ...mapReceiptFields(receipt, V115_SOURCE_FIELDS),
    ...mapReceiptFields(precheck, V115_PRECHECK_FIELDS),
    requiredEnvHandleNames: namedValues(receipt, "required_env_handles", "name"),
    optInGateNames: namedValues(receipt, "opt_in_gates", "gate_name"),
    failureTaxonomyCodes: stringArrayField(receipt, "failure_taxonomy_codes"),
    dryRunResponseFields: stringArrayField(response, "fields"),
    inheritedNoGoConditions: stringArrayField(receipt, "inherited_no_go_conditions"),
    ...mapReceiptFields(receipt, V115_BOUNDARY_FIELDS),
  };
}

const V116_SOURCE_FIELDS = [
  text("receiptDigest", "receipt_digest"),
  text("sourceContractProfileVersion", "source_contract_profile_version"),
  text("sourceContractRoutePath", "source_contract_route_path"),
  text("sourceContractState", "source_contract_state"),
  text("sourceShellMode", "source_shell_mode"),
  text("sourceShellName", "source_shell_name"),
  text("sourceResolverKind", "source_resolver_kind"),
  flag("sourceReadyForTestOnlyResolverShellContract", "source_ready_for_test_only_resolver_shell_contract", false),
  flag("sourceTestOnlyShell", "source_test_only_shell", false),
  flag("sourceReadOnlyContract", "source_read_only_contract", false),
  flag("sourceFakeResolverOnly", "source_fake_resolver_only", false),
  flag("sourceHandleOnlyRequest", "source_handle_only_request", false),
  flag("sourceReadyForManagedAuditSandboxAdapterConnection", "source_ready_for_managed_audit_sandbox_adapter_connection", true),
  flag("sourceReadyForProductionAudit", "source_ready_for_production_audit", true),
  flag("sourceReadyForProductionWindow", "source_ready_for_production_window", true),
  flag("sourceCredentialResolverExecutionAllowed", "source_credential_resolver_execution_allowed", true),
  flag("sourceExecutionAllowed", "source_execution_allowed", true),
  flag("sourceConnectsManagedAudit", "source_connects_managed_audit", true),
  flag("sourceReadsManagedAuditCredential", "source_reads_managed_audit_credential", true),
  flag("sourceStoresManagedAuditCredential", "source_stores_managed_audit_credential", true),
  flag("sourceCredentialValueRead", "source_credential_value_read", true),
  flag("sourceCredentialValueLoaded", "source_credential_value_loaded", true),
  flag("sourceCredentialValueStored", "source_credential_value_stored", true),
  flag("sourceCredentialValueIncluded", "source_credential_value_included", true),
  flag("sourceRawEndpointUrlParsed", "source_raw_endpoint_url_parsed", true),
  flag("sourceRawEndpointUrlIncluded", "source_raw_endpoint_url_included", true),
  flag("sourceExternalRequestSent", "source_external_request_sent", true),
  flag("sourceSecretProviderInstantiated", "source_secret_provider_instantiated", true),
  flag("sourceResolverClientInstantiated", "source_resolver_client_instantiated", true),
  flag("sourceSchemaMigrationExecuted", "source_schema_migration_executed", true),
  flag("sourceAutomaticUpstreamStart", "source_automatic_upstream_start", true),
  flag("sourceProductionRecordWritten", "source_production_record_written", true),
  count("sourceRequestShapeFieldCount", "source_request_shape_field_count", 0),
  count("sourceResponseShapeFieldCount", "source_response_shape_field_count", 0),
  count("sourceFailureMappingCount", "source_failure_mapping_count", 0),
  count("sourceGuardConditionCount", "source_guard_condition_count", 0),
  count("sourceCheckCount", "source_check_count", 0),
  count("sourcePassedCheckCount", "source_passed_check_count", 0),
  count("sourceProductionBlockerCount", "source_production_blocker_count", -1),
  count("sourceWarningCount", "source_warning_count", -1),
  count("sourceRecommendationCount", "source_recommendation_count", -1),
  flag("sourceNodeV263Ready", "source_node_v263_ready", false),
  text("sourceNodeV263VerificationMode", "source_node_v263_verification_mode"),
  text("sourceNodeV263Span", "source_node_v263_span"),
  count("sourceNodeV263CheckCount", "source_node_v263_check_count", 0),
  count("sourceNodeV263PassedCheckCount", "source_node_v263_passed_check_count", 0),
  count("sourceNodeV263ProductionBlockerCount", "source_node_v263_production_blocker_count", -1),
] as const;

const V116_BOUNDARY_FIELDS = [
  flag("readOnly", "read_only", false),
  flag("executionAllowed", "execution_allowed", true),
  flag("dryRunOnly", "dry_run_only", false),
  flag("testOnlyResolverShellContractOnly", "test_only_resolver_shell_contract_only", false),
  flag("testOnlyShell", "test_only_shell", false),
  flag("fakeResolverOnly", "fake_resolver_only", false),
  flag("handleOnlyRequest", "handle_only_request", false),
  flag("credentialResolverImplemented", "credential_resolver_implemented", true),
  flag("credentialResolverInvoked", "credential_resolver_invoked", true),
  flag("secretProviderInstantiated", "secret_provider_instantiated", true),
  flag("resolverClientInstantiated", "resolver_client_instantiated", true),
  ...START_FIELDS,
  ...WRITE_FIELDS,
  ...VALUE_FIELDS,
  flag("schemaRehearsalExecutionAllowed", "schema_rehearsal_execution_allowed", true),
  ...FINAL_EXEC_FIELDS,
  flag("managedAuditStore", "managed_audit_store", true),
  flag("managedAuditStorageBackend", "managed_audit_storage_backend", true),
  flag("sandboxAuditStorageBackend", "sandbox_audit_storage_backend", true),
  flag("orderAuthoritative", "order_authoritative", true),
  flag("fakeResolverProbeExecuted", "fake_resolver_probe_executed", true),
] as const;

export function readV116Fields(root: Record<string, unknown>): V116Fields {
  const receipt = objectField(root, "test_only_resolver_shell_non_participation_receipt");
  const request = objectField(receipt, "request_shape");
  const response = objectField(receipt, "response_shape");
  const probe = objectField(receipt, "fake_resolver_probe");
  return {
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    ...mapReceiptFields(receipt, V116_SOURCE_FIELDS),
    requestShapeFields: stringArrayField(request, "fields"),
    responseShapeFields: stringArrayField(response, "fields"),
    failureClassCodes: namedValues(receipt, "failure_mapping", "source_failure_code"),
    guardConditionCodes: namedValues(receipt, "guard_conditions", "code"),
    fakeResolverProbeRequestId: stringField(probe, "request_id") ?? "",
    fakeResolverProbeAcceptedByFakeResolver: booleanField(probe, "accepted_by_fake_resolver") ?? false,
    fakeResolverProbeNoCredentialRead: !(booleanField(probe, "credential_value_read") ?? true),
    fakeResolverProbeNoExternalRequest: !(booleanField(probe, "external_request_sent") ?? true),
    fakeResolverProbeNoProductionWrite: !(booleanField(probe, "production_record_written") ?? true),
    ...mapReceiptFields(receipt, V116_BOUNDARY_FIELDS),
  };
}

const V117_SOURCE_FIELDS = [
  text("receiptDigest", "receipt_digest"),
  text("sourceArchiveProfileVersion", "source_archive_profile_version"),
  text("sourceArchiveVerificationState", "source_archive_verification_state"),
  flag("sourceReadyForCredentialResolverFakeShellArchiveVerification", "source_ready_for_credential_resolver_fake_shell_archive_verification", false),
  flag("sourceReadOnlyArchiveVerification", "source_read_only_archive_verification", false),
  flag("sourceArchiveVerificationRerunsFakeShellBehavior", "source_archive_verification_reruns_fake_shell_behavior", true),
] as const;

const V117_BOUNDARY_FIELDS = [
  flag("archiveFilesReadByMiniKv", "archive_files_read_by_mini_kv", true),
  flag("archiveVerificationRerunsFakeShellBehavior", "archive_verification_reruns_fake_shell_behavior", true),
  flag("readOnly", "read_only", false),
  flag("executionAllowed", "execution_allowed", true),
  flag("archiveVerificationOnly", "archive_verification_only", false),
  flag("credentialResolverImplemented", "credential_resolver_implemented", true),
  flag("credentialResolverInvoked", "credential_resolver_invoked", true),
  flag("resolverClientInstantiated", "resolver_client_instantiated", true),
  flag("secretProviderInstantiated", "secret_provider_instantiated", true),
  ...START_FIELDS,
  flag("connectionExecutionAllowed", "connection_execution_allowed", true),
  flag("storageWriteAllowed", "storage_write_allowed", true),
  ...VALUE_FIELDS,
  ...FINAL_EXEC_FIELDS,
  flag("managedAuditStorageBackend", "managed_audit_storage_backend", true),
  flag("orderAuthoritative", "order_authoritative", true),
] as const;

export function readV117Fields(root: Record<string, unknown>): V117Fields {
  const receipt = objectField(root, "credential_resolver_fake_shell_archive_non_participation_receipt");
  const nodeV264 = objectField(receipt, "source_node_v264");
  const nodeV265 = objectField(receipt, "source_node_v265");
  const archive = objectField(receipt, "archived_evidence");
  const summary = objectField(receipt, "summary");
  return {
    receiptVersion: stringField(root, "receipt_version") ?? "",
    releaseVersion: stringField(root, "release_version") ?? "",
    consumerHint: stringField(root, "consumer_hint") ?? "",
    ...mapReceiptFields(receipt, V117_SOURCE_FIELDS),
    sourceNodeV264Ready: booleanField(nodeV264, "ready") ?? false,
    sourceNodeV265Ready: booleanField(nodeV265, "ready") ?? false,
    sourceNodeV265ConsumesUpstreamEchoes: [
      booleanField(nodeV265, "source_node_v264_ready") === true,
      booleanField(nodeV265, "java_v107_echo_ready") === true,
      booleanField(nodeV265, "mini_kv_v116_non_participation_ready") === true,
      booleanField(nodeV265, "java_v109_optimization_context_ready") === true,
    ].every(Boolean),
    archiveFileCount: numberField(archive, "archive_file_count") ?? 0,
    requiredSnippetCount: numberField(archive, "required_snippet_count") ?? 0,
    matchedSnippetCount: numberField(archive, "matched_snippet_count") ?? 0,
    checkCount: numberField(summary, "check_count") ?? 0,
    passedCheckCount: numberField(summary, "passed_check_count") ?? 0,
    productionBlockerCount: numberField(summary, "production_blocker_count") ?? -1,
    warningCount: numberField(summary, "warning_count") ?? -1,
    recommendationCount: numberField(summary, "recommendation_count") ?? -1,
    ...mapReceiptFields(receipt, V117_BOUNDARY_FIELDS),
  };
}

function namedValues(input: Record<string, unknown>, group: string, key: string): string[] {
  return objectArrayField(input, group)
    .map((entry) => stringField(entry, key))
    .filter(isNonNullString);
}

function text<const Key extends string>(target: Key, source: string, fallback = "") {
  return [target, source, "text", fallback] as const;
}

function flag<const Key extends string>(target: Key, source: string, fallback: boolean) {
  return [target, source, "flag", fallback] as const;
}

function count<const Key extends string>(target: Key, source: string, fallback: number) {
  return [target, source, "count", fallback] as const;
}
