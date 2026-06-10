import {
  booleanField,
  evidenceFile,
  numberField,
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";
import {
  EXPLICIT_NO_GO_CONDITION_CODES,
  JAVA_V105_BUILDER,
  JAVA_V105_RUNBOOK,
  JAVA_V105_WALKTHROUGH,
  MINI_KV_V114_RECEIPT,
  MINI_KV_V114_RUNBOOK,
  MINI_KV_V114_WALKTHROUGH,
  REQUIRED_DECISION_FIELD_IDS,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationConstants.js";
import type {
  JavaV105CredentialResolverDecisionEchoMarkerReference,
  MiniKvV114CredentialResolverNonParticipationReference,
  SourceNodeV260CredentialResolverDecisionRecordReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";

export function createSourceNodeV260(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
): SourceNodeV260CredentialResolverDecisionRecordReference {
  const record = source.decisionRecord;
  const requiredDecisionFieldIds = record.requiredDecisionFields.map((field) => field.id);
  const explicitNoGoConditionCodes = record.explicitNoGoConditions.map((condition) => condition.code);
  const reference = {
    sourceVersion: "Node v260" as const,
    profileVersion: source.profileVersion,
    decisionState: source.decisionState,
    readyForCredentialResolverDecisionRecord:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
    decisionDigest: record.decisionDigest,
    recordMode: record.recordMode,
    decisionScope: record.decisionScope,
    decisionStatus: record.decisionStatus,
    sourceSpan: record.sourceSpan,
    endpointHandle: record.endpointHandle,
    credentialHandle: record.credentialHandle,
    resolverPolicyHandle: record.resolverPolicyHandle,
    approvalMarker: record.approvalMarker,
    operatorIdentityRequired: record.operatorIdentityRequired,
    approvalCorrelationRequired: record.approvalCorrelationRequired,
    resolverMode: record.resolverMode,
    resolverCandidateImplementation: record.resolverCandidateImplementation,
    requiredDecisionFieldCount: record.requiredDecisionFieldCount,
    explicitNoGoConditionCount: record.explicitNoGoConditionCount as 9,
    requiredDecisionFieldIds,
    explicitNoGoConditionCodes,
    credentialValueMayBeRead: record.credentialValueMayBeRead,
    credentialValueMayBeLoaded: record.credentialValueMayBeLoaded,
    credentialValueMayBeStored: record.credentialValueMayBeStored,
    rawEndpointUrlMayBeParsed: record.rawEndpointUrlMayBeParsed,
    managedAuditConnectionMayOpen: record.managedAuditConnectionMayOpen,
    schemaMigrationMayExecute: record.schemaMigrationMayExecute,
    externalRequestMayBeSent: record.externalRequestMayBeSent,
    nodeMayStartJavaOrMiniKv: record.nodeMayStartJavaOrMiniKv,
    miniKvMayActAsManagedAuditStorage: record.miniKvMayActAsManagedAuditStorage,
    approvalLedgerMayBeWritten: record.approvalLedgerMayBeWritten,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    sourceNodeV259Ready: source.sourceNodeV259.readyForNodeV260CredentialResolverDecisionRecord,
    sourceNodeV259EvidenceFileCount: source.sourceNodeV259.evidenceFileCount,
    sourceNodeV259MatchedSnippetCount: source.sourceNodeV259.matchedSnippetCount,
    readyForNodeV261CredentialResolverUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV261CredentialResolverUpstreamEchoVerification:
      reference.readyForCredentialResolverDecisionRecord
      && reference.decisionState === "sandbox-endpoint-credential-resolver-decision-record-ready"
      && reference.recordMode === "sandbox-endpoint-credential-resolver-decision-record-only"
      && reference.decisionScope === "managed-audit-sandbox-endpoint-credential-resolver"
      && reference.decisionStatus === "human-review-required-before-credential-resolution"
      && reference.sourceSpan === "Node v259 sandbox endpoint handle upstream echo verification"
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      && reference.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      && reference.operatorIdentityRequired
      && reference.approvalCorrelationRequired
      && reference.resolverMode === "policy-record-only-no-value-read"
      && reference.resolverCandidateImplementation === "not-implemented"
      && reference.requiredDecisionFieldCount === REQUIRED_DECISION_FIELD_IDS.length
      && reference.explicitNoGoConditionCount === EXPLICIT_NO_GO_CONDITION_CODES.length
      && arraysEqual(reference.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS])
      && arraysEqual(reference.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES])
      && !reference.credentialValueMayBeRead
      && !reference.credentialValueMayBeLoaded
      && !reference.credentialValueMayBeStored
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.managedAuditConnectionMayOpen
      && !reference.schemaMigrationMayExecute
      && !reference.externalRequestMayBeSent
      && !reference.nodeMayStartJavaOrMiniKv
      && !reference.miniKvMayActAsManagedAuditStorage
      && !reference.approvalLedgerMayBeWritten
      && reference.checkCount === reference.passedCheckCount
      && reference.checkCount === 20
      && reference.productionBlockerCount === 0
      && reference.warningCount === 2
      && reference.recommendationCount === 2
      && reference.sourceNodeV259Ready
      && reference.sourceNodeV259EvidenceFileCount === 6
      && reference.sourceNodeV259MatchedSnippetCount === 39,
  };
}

export function createJavaV105Reference(): JavaV105CredentialResolverDecisionEchoMarkerReference {
  const evidenceFiles = [
    evidenceFile("java-v105-runbook", JAVA_V105_RUNBOOK),
    evidenceFile("java-v105-walkthrough", JAVA_V105_WALKTHROUGH),
    evidenceFile("java-v105-builder", JAVA_V105_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v105-marker-field", JAVA_V105_RUNBOOK, "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker"),
    snippet("java-v105-response-schema", JAVA_V105_RUNBOOK, "response schema: java-release-approval-rehearsal-response-schema.v27"),
    snippet("java-v105-node-v260", JAVA_V105_RUNBOOK, "Node v260 decision record"),
    snippet("java-v105-node-v261", JAVA_V105_RUNBOOK, "Node v261"),
    snippet("java-v105-ready-v261", JAVA_V105_BUILDER, "readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification"),
    snippet("java-v105-endpoint-handle", JAVA_V105_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"),
    snippet("java-v105-credential-handle", JAVA_V105_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"),
    snippet("java-v105-policy-handle", JAVA_V105_BUILDER, "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"),
    snippet("java-v105-approval-marker", JAVA_V105_BUILDER, "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"),
    snippet("java-v105-resolver-mode", JAVA_V105_BUILDER, "policy-record-only-no-value-read"),
    snippet("java-v105-resolver-implementation", JAVA_V105_BUILDER, "not-implemented"),
    snippet("java-v105-field-count", JAVA_V105_BUILDER, "REQUIRED_DECISION_FIELD_COUNT = 8"),
    snippet("java-v105-no-go-count", JAVA_V105_BUILDER, "EXPLICIT_NO_GO_CONDITION_COUNT = 9"),
    snippet("java-v105-source-evidence-count", JAVA_V105_BUILDER, "SOURCE_EVIDENCE_FILE_COUNT = 6"),
    snippet("java-v105-source-snippet-count", JAVA_V105_BUILDER, "SOURCE_MATCHED_SNIPPET_COUNT = 39"),
    snippet("java-v105-source-check-count", JAVA_V105_BUILDER, "SOURCE_CHECK_COUNT = 19"),
    snippet("java-v105-field-operator", JAVA_V105_BUILDER, "operator-header"),
    snippet("java-v105-field-correlation", JAVA_V105_BUILDER, "approval-correlation-header"),
    snippet("java-v105-field-redaction", JAVA_V105_BUILDER, "redaction-reviewed"),
    snippet("java-v105-field-fallback", JAVA_V105_BUILDER, "fallback-rotation-plan"),
    snippet("java-v105-no-go-credential", JAVA_V105_BUILDER, "CREDENTIAL_VALUE_REQUIRED"),
    snippet("java-v105-no-go-connection", JAVA_V105_BUILDER, "REAL_CONNECTION_REQUIRED"),
    snippet("java-v105-no-go-window", JAVA_V105_BUILDER, "PRODUCTION_WINDOW_REQUIRED"),
    snippet("java-v105-no-credential-read", JAVA_V105_BUILDER, "credentialValueMayBeRead=false"),
    snippet("java-v105-no-credential-loaded", JAVA_V105_BUILDER, "credentialValueMayBeLoaded=false"),
    snippet("java-v105-no-raw-endpoint", JAVA_V105_BUILDER, "rawEndpointUrlMayBeParsed=false"),
    snippet("java-v105-no-connection-open", JAVA_V105_BUILDER, "managedAuditConnectionMayOpen=false"),
    snippet("java-v105-no-external", JAVA_V105_BUILDER, "externalRequestMayBeSent=false"),
    snippet("java-v105-no-ledger", JAVA_V105_BUILDER, "approvalLedgerMayBeWritten=false"),
    snippet("java-v105-side-effect-credential", JAVA_V105_BUILDER, "sideEffectBoundary.credentialValueRead=false"),
    snippet("java-v105-side-effect-raw", JAVA_V105_BUILDER, "sideEffectBoundary.rawEndpointUrlParsed=false"),
    snippet("java-v105-side-effect-external", JAVA_V105_BUILDER, "sideEffectBoundary.externalRequestSent=false"),
    snippet("java-v105-no-start", JAVA_V105_WALKTHROUGH, "自动启动 Java 或 mini-kv"),
  ];
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const reference = {
    sourceVersion: "Java v105" as const,
    tagLabel: "v105订单平台credential-resolver-decision-echo-marker",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v105-response-schema")
      ? "java-release-approval-rehearsal-response-schema.v27" as const
      : "missing" as const,
    markerField: snippetMatched(expectedSnippets, "java-v105-marker-field")
      ? "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker" as const
      : "missing" as const,
    consumedNodeVersion: snippetMatched(expectedSnippets, "java-v105-node-v260") ? "Node v260" as const : "missing" as const,
    consumedNodeProfile: snippetMatched(expectedSnippets, "java-v105-node-v260")
      ? "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1"
      : "missing",
    nextNodeConsumerVersion: snippetMatched(expectedSnippets, "java-v105-ready-v261") ? "Node v261" as const : "missing" as const,
    endpointHandle: snippetMatched(expectedSnippets, "java-v105-endpoint-handle")
      ? "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      : "missing",
    credentialHandle: snippetMatched(expectedSnippets, "java-v105-credential-handle")
      ? "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      : "missing",
    resolverPolicyHandle: snippetMatched(expectedSnippets, "java-v105-policy-handle")
      ? "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      : "missing",
    approvalMarker: snippetMatched(expectedSnippets, "java-v105-approval-marker")
      ? "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      : "missing",
    resolverMode: snippetMatched(expectedSnippets, "java-v105-resolver-mode")
      ? "policy-record-only-no-value-read"
      : "missing",
    resolverCandidateImplementation: snippetMatched(expectedSnippets, "java-v105-resolver-implementation")
      ? "not-implemented"
      : "missing",
    requiredDecisionFieldCount: snippetMatched(expectedSnippets, "java-v105-field-count") ? 8 : 0,
    explicitNoGoConditionCount: snippetMatched(expectedSnippets, "java-v105-no-go-count") ? 9 : 0,
    sourceEvidenceFileCount: snippetMatched(expectedSnippets, "java-v105-source-evidence-count") ? 6 : 0,
    sourceMatchedSnippetCount: snippetMatched(expectedSnippets, "java-v105-source-snippet-count") ? 39 : 0,
    sourceCheckCount: snippetMatched(expectedSnippets, "java-v105-source-check-count") ? 19 : 0,
    credentialValueMayBeRead: false,
    rawEndpointUrlMayBeParsed: false,
    externalRequestMayBeSent: false,
    schemaMigrationMayExecute: false,
    approvalLedgerMayBeWritten: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    connectsManagedAudit: false,
    javaStarted: false,
    miniKvStarted: false,
    readyForManagedAuditSandboxAdapterConnection: false as const,
    readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification: false,
  };

  return {
    ...reference,
    readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v27"
      && reference.markerField === "managedAuditSandboxEndpointCredentialResolverDecisionEchoMarker"
      && reference.consumedNodeVersion === "Node v260"
      && reference.consumedNodeProfile === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1"
      && reference.nextNodeConsumerVersion === "Node v261"
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      && reference.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      && reference.resolverMode === "policy-record-only-no-value-read"
      && reference.resolverCandidateImplementation === "not-implemented"
      && reference.requiredDecisionFieldCount === 8
      && reference.explicitNoGoConditionCount === 9
      && reference.sourceEvidenceFileCount === 6
      && reference.sourceMatchedSnippetCount === 39
      && reference.sourceCheckCount === 19
      && !reference.credentialValueMayBeRead
      && !reference.rawEndpointUrlMayBeParsed
      && !reference.externalRequestMayBeSent
      && !reference.schemaMigrationMayExecute
      && !reference.approvalLedgerMayBeWritten
      && !reference.credentialValueRead
      && !reference.rawEndpointUrlParsed
      && !reference.externalRequestSent
      && !reference.connectsManagedAudit
      && !reference.javaStarted
      && !reference.miniKvStarted
      && !reference.readyForManagedAuditSandboxAdapterConnection,
  };
}

export function createMiniKvV114Reference(): MiniKvV114CredentialResolverNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v114-receipt", MINI_KV_V114_RECEIPT),
    evidenceFile("mini-kv-v114-runbook", MINI_KV_V114_RUNBOOK),
    evidenceFile("mini-kv-v114-walkthrough", MINI_KV_V114_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v114-receipt-version", MINI_KV_V114_RECEIPT, "mini-kv-credential-resolver-non-participation-receipt.v1"),
    snippet("mini-kv-v114-consumer", MINI_KV_V114_RECEIPT, "Node v261 credential resolver upstream echo verification"),
    snippet("mini-kv-v114-source-profile", MINI_KV_V114_RECEIPT, "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1"),
    snippet("mini-kv-v114-field-count", MINI_KV_V114_RECEIPT, "\"source_required_decision_field_count\":8"),
    snippet("mini-kv-v114-no-go-count", MINI_KV_V114_RECEIPT, "\"source_explicit_no_go_condition_count\":9"),
    snippet("mini-kv-v114-secret-provider", MINI_KV_V114_RECEIPT, "\"secret_provider_instantiated\":false"),
    snippet("mini-kv-v114-resolver-invoked", MINI_KV_V114_RECEIPT, "\"credential_resolver_invoked\":false"),
    snippet("mini-kv-v114-no-storage-backend", MINI_KV_V114_RECEIPT, "\"managed_audit_storage_backend\":false"),
    snippet("mini-kv-v114-no-load-compact", MINI_KV_V114_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v114-no-setnxex", MINI_KV_V114_RECEIPT, "\"setnxex_execution_allowed\":false"),
    snippet("mini-kv-v114-runbook-boundary", MINI_KV_V114_RUNBOOK, "SMOKEJSON exposed credential_resolver_non_participation_receipt"),
    snippet("mini-kv-v114-walkthrough-summary", MINI_KV_V114_WALKTHROUGH, "sandbox endpoint credential resolver decision record"),
  ];
  const root = readJsonObject(MINI_KV_V114_RECEIPT);
  const receipt = objectField(root, "credential_resolver_non_participation_receipt");
  const decisionRecord = objectField(receipt, "decision_record");
  const evidencePresent = evidenceFiles.every((file) => file.exists);
  const verificationDocumented = expectedSnippets.every((snippetMatch) => snippetMatch.matched);
  const requiredDecisionFieldIds = objectArrayField(receipt, "required_decision_fields")
    .map((field) => stringField(field, "id"))
    .filter(isNonNullString);
  const explicitNoGoConditionCodes = stringArrayField(receipt, "explicit_no_go_conditions");
  const reference = {
    sourceVersion: "mini-kv v114" as const,
    tagLabel: "第一百一十四版凭证解析器非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent,
    verificationDocumented,
    receiptVersion: stringField(receipt, "receipt_version") ?? "missing",
    releaseVersion: stringField(receipt, "current_release_version") ?? stringField(root, "release_version") ?? "missing",
    consumerHint: stringField(receipt, "consumer_hint") ?? stringField(root, "consumer_hint") ?? "missing",
    receiptDigest: stringField(receipt, "receipt_digest") ?? "missing",
    sourceDecisionProfileVersion: stringField(receipt, "source_decision_profile_version") ?? "missing",
    sourceDecisionState: stringField(receipt, "source_decision_state") ?? "missing",
    sourceRecordMode: stringField(receipt, "source_record_mode") ?? "missing",
    sourceDecisionScope: stringField(receipt, "source_decision_scope") ?? "missing",
    sourceDecisionStatus: stringField(receipt, "source_decision_status") ?? "missing",
    sourceSpan: stringField(receipt, "source_span") ?? "missing",
    sourceReadyForDecisionRecord: booleanField(receipt, "source_ready_for_credential_resolver_decision_record") ?? false,
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection") ?? true,
    sourceReadOnlyDecisionRecord: booleanField(receipt, "source_read_only_decision_record") ?? false,
    sourceCredentialResolverDecisionOnly: booleanField(receipt, "source_credential_resolver_decision_only") ?? false,
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed") ?? true,
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit") ?? true,
    sourceReadsManagedAuditCredential: booleanField(receipt, "source_reads_managed_audit_credential") ?? true,
    sourceStoresManagedAuditCredential: booleanField(receipt, "source_stores_managed_audit_credential") ?? true,
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read") ?? true,
    sourceCredentialValueLoaded: booleanField(receipt, "source_credential_value_loaded") ?? true,
    sourceCredentialValueIncluded: booleanField(receipt, "source_credential_value_included") ?? true,
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed") ?? true,
    sourceRawEndpointUrlIncluded: booleanField(receipt, "source_raw_endpoint_url_included") ?? true,
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent") ?? true,
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed") ?? true,
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start") ?? true,
    sourceRequiredDecisionFieldCount: numberField(receipt, "source_required_decision_field_count") ?? 0,
    sourceExplicitNoGoConditionCount: numberField(receipt, "source_explicit_no_go_condition_count") ?? 0,
    sourceCheckCount: numberField(receipt, "source_check_count") ?? 0,
    sourcePassedCheckCount: numberField(receipt, "source_passed_check_count") ?? 0,
    sourceProductionBlockerCount: numberField(receipt, "source_production_blocker_count") ?? -1,
    sourceWarningCount: numberField(receipt, "source_warning_count") ?? -1,
    sourceRecommendationCount: numberField(receipt, "source_recommendation_count") ?? -1,
    sourceNodeV259Ready: booleanField(receipt, "source_node_v259_ready") ?? false,
    sourceNodeV259BlocksRealConnection: booleanField(receipt, "source_node_v259_blocks_real_connection") ?? false,
    sourceNodeV259CredentialBoundaryAligned:
      booleanField(receipt, "source_node_v259_credential_boundary_aligned") ?? false,
    sourceNodeV259RawEndpointBoundaryAligned:
      booleanField(receipt, "source_node_v259_raw_endpoint_boundary_aligned") ?? false,
    sourceNodeV259WriteBoundaryAligned: booleanField(receipt, "source_node_v259_write_boundary_aligned") ?? false,
    sourceNodeV259AutoStartBoundaryAligned:
      booleanField(receipt, "source_node_v259_auto_start_boundary_aligned") ?? false,
    sourceNodeV259KeepsMiniKvNonParticipant:
      booleanField(receipt, "source_node_v259_keeps_mini_kv_non_participant") ?? false,
    sourceNodeV259EvidenceFileCount: numberField(receipt, "source_node_v259_evidence_file_count") ?? 0,
    sourceNodeV259MatchedSnippetCount: numberField(receipt, "source_node_v259_matched_snippet_count") ?? 0,
    sourceNodeV259ReadyForNodeV260DecisionRecord:
      booleanField(receipt, "source_node_v259_ready_for_node_v260_decision_record") ?? false,
    sourceUpstreamActionsStillDisabled: booleanField(receipt, "source_upstream_actions_still_disabled") ?? false,
    endpointHandle: stringField(decisionRecord, "endpoint_handle") ?? "missing",
    credentialHandle: stringField(decisionRecord, "credential_handle") ?? "missing",
    resolverPolicyHandle: stringField(decisionRecord, "resolver_policy_handle") ?? "missing",
    approvalMarker: stringField(decisionRecord, "approval_marker") ?? "missing",
    operatorIdentityRequired: booleanField(decisionRecord, "operator_identity_required") ?? false,
    approvalCorrelationRequired: booleanField(decisionRecord, "approval_correlation_required") ?? false,
    resolverMode: stringField(decisionRecord, "resolver_mode") ?? "missing",
    resolverCandidateImplementation: stringField(decisionRecord, "resolver_candidate_implementation") ?? "missing",
    requiredDecisionFieldCount: numberField(decisionRecord, "required_decision_field_count") ?? 0,
    explicitNoGoConditionCount: numberField(decisionRecord, "explicit_no_go_condition_count") ?? 0,
    requiredDecisionFieldIds,
    explicitNoGoConditionCodes,
    readOnly: booleanField(receipt, "read_only") ?? false,
    executionAllowed: booleanField(receipt, "execution_allowed") ?? true,
    dryRunOnly: booleanField(receipt, "dry_run_only") ?? false,
    credentialResolverDecisionOnly: booleanField(receipt, "credential_resolver_decision_only") ?? false,
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented") ?? true,
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked") ?? true,
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated") ?? true,
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
    credentialValueStored: booleanField(receipt, "credential_value_stored") ?? true,
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
    readyForNodeV261Alignment: false,
  };

  return {
    ...reference,
    readyForNodeV261Alignment:
      reference.evidencePresent
      && reference.verificationDocumented
      && reference.receiptVersion === "mini-kv-credential-resolver-non-participation-receipt.v1"
      && reference.releaseVersion === "v114"
      && reference.consumerHint === "Node v261 credential resolver upstream echo verification"
      && /^fnv1a64:[a-f0-9]{16}$/.test(reference.receiptDigest)
      && reference.sourceDecisionProfileVersion
        === "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1"
      && reference.sourceDecisionState === "sandbox-endpoint-credential-resolver-decision-record-ready"
      && reference.sourceRecordMode === "sandbox-endpoint-credential-resolver-decision-record-only"
      && reference.sourceDecisionScope === "managed-audit-sandbox-endpoint-credential-resolver"
      && reference.sourceDecisionStatus === "human-review-required-before-credential-resolution"
      && reference.sourceSpan === "Node v259 sandbox endpoint handle upstream echo verification"
      && reference.sourceReadyForDecisionRecord
      && !reference.sourceReadyForManagedAuditSandboxAdapterConnection
      && reference.sourceReadOnlyDecisionRecord
      && reference.sourceCredentialResolverDecisionOnly
      && !reference.sourceExecutionAllowed
      && !reference.sourceConnectsManagedAudit
      && !reference.sourceReadsManagedAuditCredential
      && !reference.sourceStoresManagedAuditCredential
      && !reference.sourceCredentialValueRead
      && !reference.sourceCredentialValueLoaded
      && !reference.sourceCredentialValueIncluded
      && !reference.sourceRawEndpointUrlParsed
      && !reference.sourceRawEndpointUrlIncluded
      && !reference.sourceExternalRequestSent
      && !reference.sourceSchemaMigrationExecuted
      && !reference.sourceAutomaticUpstreamStart
      && reference.sourceRequiredDecisionFieldCount === 8
      && reference.sourceExplicitNoGoConditionCount === 9
      && reference.sourceCheckCount === reference.sourcePassedCheckCount
      && reference.sourceCheckCount === 20
      && reference.sourceProductionBlockerCount === 0
      && reference.sourceWarningCount === 2
      && reference.sourceRecommendationCount === 2
      && reference.sourceNodeV259Ready
      && reference.sourceNodeV259BlocksRealConnection
      && reference.sourceNodeV259CredentialBoundaryAligned
      && reference.sourceNodeV259RawEndpointBoundaryAligned
      && reference.sourceNodeV259WriteBoundaryAligned
      && reference.sourceNodeV259AutoStartBoundaryAligned
      && reference.sourceNodeV259KeepsMiniKvNonParticipant
      && reference.sourceNodeV259EvidenceFileCount === 6
      && reference.sourceNodeV259MatchedSnippetCount === 39
      && reference.sourceNodeV259ReadyForNodeV260DecisionRecord
      && reference.sourceUpstreamActionsStillDisabled
      && reference.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE"
      && reference.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE"
      && reference.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      && reference.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      && reference.operatorIdentityRequired
      && reference.approvalCorrelationRequired
      && reference.resolverMode === "policy-record-only-no-value-read"
      && reference.resolverCandidateImplementation === "not-implemented"
      && reference.requiredDecisionFieldCount === 8
      && reference.explicitNoGoConditionCount === 9
      && arraysEqual(reference.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS])
      && arraysEqual(reference.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES])
      && reference.readOnly
      && !reference.executionAllowed
      && reference.dryRunOnly
      && reference.credentialResolverDecisionOnly
      && !reference.credentialResolverImplemented
      && !reference.credentialResolverInvoked
      && !reference.secretProviderInstantiated
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
      && !reference.credentialValueStored
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

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function isNonNullString(value: string | null): value is string {
  return typeof value === "string";
}
