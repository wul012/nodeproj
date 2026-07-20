import type { AppConfig } from "../config.js";
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
} from "../services/historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  JavaV115ApprovalRequiredBoundaryEchoReference,
  MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
  SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationTypes.js";

export const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification.v1";
export const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification";
export const NODE_V274_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification";
export const ACTIVE_PLAN = "docs/plans2/v274-post-disabled-candidate-echo-roadmap.md";

export const JAVA_V115_RUNBOOK = "D:/javaproj/advanced-order-platform/c/115/解释/说明.md";
export const JAVA_V115_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/118-version-115-credential-resolver-approval-required-boundary-echo-refinement.md";
export const JAVA_V115_BUILDER =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoReceiptBuilder.java";
export const JAVA_V115_SUPPORT =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoSupport.java";
export const JAVA_V115_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoRecords.java";
export const JAVA_V115_DECISION_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/DecisionEchoRecords.java";
export const JAVA_V115_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/v115-snapshot/OpsEvidenceService.java";

export const MINI_KV_V121_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-boundary-non-participation-receipt.json";
export const MINI_KV_V121_RUNBOOK = "D:/C/mini-kv/c/121/解释/说明.md";
export const MINI_KV_V121_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/177-version-121-credential-resolver-approval-required-boundary-non-participation-receipt.md";
export const MINI_KV_V121_RUNTIME_RECEIPT =
  "D:/C/mini-kv/src/runtime_credential_resolver_approval_boundary_receipts.cpp";

export const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

export const APPROVAL_REQUIRED_REQUIREMENT_CODES = [
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
] as const satisfies readonly CredentialResolverPreImplementationRequirementCode[];

export const PROHIBITED_ACTIONS_BY_BOUNDARY: Record<string, readonly string[]> = {
  CREDENTIAL_HANDLE: ["read-credential-value", "store-credential-value", "render-credential-value"],
  ENDPOINT_HANDLE: ["parse-raw-endpoint-url", "render-raw-endpoint-url", "connect-managed-audit"],
  OPERATOR_APPROVAL: ["execute-without-operator-marker", "auto-approve-operation", "auto-start-upstream"],
  ROLLBACK_BOUNDARY: ["execute-rollback", "deploy-resolver-without-abort-marker", "write-production-record"],
  SCHEMA_MIGRATION_POLICY: ["execute-schema-migration", "execute-sql", "mutate-managed-audit-schema"],
  AUDIT_LEDGER_WRITE_POLICY: ["write-approval-ledger", "write-managed-audit-state", "write-storage"],
};

export function createSourceNodeV274(config: AppConfig): SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
    config,
  });
  return {
    sourceVersion: "Node v274",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForDisabledCandidateUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    disabledCandidateEchoVerificationOnly: source.disabledCandidateEchoVerificationOnly,
    readyForDisabledResolverInterfaceCandidate: source.readyForDisabledResolverInterfaceCandidate,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    readyForProductionAudit: source.readyForProductionAudit,
    readyForProductionWindow: source.readyForProductionWindow,
    readyForProductionOperations: source.readyForProductionOperations,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
    candidateDigest: source.sourceNodeV273.candidateDigest,
    candidateDecisionCount: source.sourceNodeV273.candidateDecisionCount,
    candidateReadyDecisionCount: source.sourceNodeV273.candidateReadyDecisionCount,
    approvalRequiredDecisionCount: source.sourceNodeV273.approvalRequiredDecisionCount,
    approvalRequiredBoundaryCodes: source.sourceNodeV273.approvalRequiredBoundaryCodes,
    approvalRequiredRequirementCodes: [...APPROVAL_REQUIRED_REQUIREMENT_CODES],
    sourceNodeV273Ready: source.echoVerification.sourceNodeV273Ready,
    javaV113EchoReady: source.echoVerification.javaV113EchoReady,
    miniKvV120NonParticipationReady: source.echoVerification.miniKvV120NonParticipationReady,
    candidateCountsAligned: source.echoVerification.candidateCountsAligned,
    approvalRequiredBoundaryCodesAligned: source.checks.approvalRequiredBoundaryCodesAligned,
    interfaceShapeAligned: source.echoVerification.interfaceShapeAligned,
    fakeWiringAligned: source.echoVerification.fakeWiringAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    resolverBoundaryAligned: source.echoVerification.resolverBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    javaEchoWorkflowTemplateApplied: source.echoVerification.javaEchoWorkflowTemplateApplied,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
  };
}

export function createJavaV115Reference(): JavaV115ApprovalRequiredBoundaryEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v115-runbook", JAVA_V115_RUNBOOK),
    evidenceFile("java-v115-walkthrough", JAVA_V115_WALKTHROUGH),
    evidenceFile("java-v115-builder", JAVA_V115_BUILDER),
    evidenceFile("java-v115-support", JAVA_V115_SUPPORT),
    evidenceFile("java-v115-records", JAVA_V115_RECORDS),
    evidenceFile("java-v115-decision-records", JAVA_V115_DECISION_RECORDS),
    evidenceFile("java-v115-ops-evidence-service", JAVA_V115_EVIDENCE_SERVICE),
  ];
  const expectedSnippets = [
    snippet("java-v115-runbook-title", JAVA_V115_RUNBOOK, "Java v115 运行说明"),
    snippet("java-v115-runbook-node-v275", JAVA_V115_RUNBOOK, "Node v275"),
    snippet("java-v115-schema-v34", JAVA_V115_EVIDENCE_SERVICE, "java-release-approval-rehearsal-response-schema.v34"),
    snippet("java-v115-echo-mode", JAVA_V115_SUPPORT, "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"),
    snippet("java-v115-proof-claim", JAVA_V115_BUILDER, "managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6"),
    snippet("java-v115-node-action", JAVA_V115_BUILDER, "Verify managedAuditSandboxEndpointCredentialResolverDisabledImplementationCandidateEchoReceipt.approvalRequiredBoundaryExplanations.size=6"),
    snippet("java-v115-explanations-record", JAVA_V115_RECORDS, "approvalRequiredBoundaryExplanations"),
    snippet("java-v115-decision-records-split", JAVA_V115_DECISION_RECORDS, "ReleaseApprovalSandboxEndpointCredentialResolverDecisionEchoRecords"),
    snippet("java-v115-workflow-template", JAVA_V115_BUILDER, "workflowStep(\"approvalRequiredBoundaryExplanationsEchoed\""),
    ...APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => snippet(`java-v115-boundary-${code}`, JAVA_V115_SUPPORT, code)),
    ...APPROVAL_REQUIRED_REQUIREMENT_CODES.map((code) => snippet(`java-v115-requirement-${code}`, JAVA_V115_SUPPORT, code)),
    snippet("java-v115-evidence-allowed", JAVA_V115_SUPPORT, "approval-required-read-only-evidence"),
    snippet("java-v115-no-credential-value", JAVA_V115_RECORDS, "credentialValueReadAllowed"),
    snippet("java-v115-no-raw-endpoint", JAVA_V115_RECORDS, "rawEndpointUrlParseAllowed"),
    snippet("java-v115-no-connection", JAVA_V115_RECORDS, "managedAuditConnectionAllowed"),
    snippet("java-v115-no-ledger", JAVA_V115_RECORDS, "approvalLedgerWriteAllowed"),
    snippet("java-v115-no-sql", JAVA_V115_RECORDS, "sqlExecutionAllowed"),
    snippet("java-v115-no-rollback", JAVA_V115_RECORDS, "rollbackExecutionAllowed"),
    snippet("java-v115-no-autostart", JAVA_V115_RECORDS, "automaticUpstreamStartAllowed"),
  ];
  const reference: JavaV115ApprovalRequiredBoundaryEchoReference = {
    sourceVersion: "Java v115",
    tagLabel: "v115订单平台approval-required边界回显",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v115-schema-v34")
      ? "java-release-approval-rehearsal-response-schema.v34"
      : "missing",
    echoMode: snippetMatched(expectedSnippets, "java-v115-echo-mode")
      ? "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"
      : "missing",
    proofClaimPresent: snippetMatched(expectedSnippets, "java-v115-proof-claim"),
    nodeVerificationActionPresent: snippetMatched(expectedSnippets, "java-v115-node-action"),
    approvalRequiredBoundaryExplanationsEchoed: snippetMatched(expectedSnippets, "java-v115-explanations-record"),
    approvalRequiredBoundaryExplanationCount: APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    approvalRequiredBoundaryCodes: [...APPROVAL_REQUIRED_BOUNDARY_CODES],
    approvalRequiredRequirementCodes: [...APPROVAL_REQUIRED_REQUIREMENT_CODES],
    evidenceAllowedMode: snippetMatched(expectedSnippets, "java-v115-evidence-allowed")
      ? "approval-required-read-only-evidence"
      : "missing",
    credentialValueReadAllowed: false,
    rawEndpointUrlParseAllowed: false,
    managedAuditConnectionAllowed: false,
    approvalLedgerWriteAllowed: false,
    sqlExecutionAllowed: false,
    rollbackExecutionAllowed: false,
    automaticUpstreamStartAllowed: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    echoWorkflowTemplateApplied: snippetMatched(expectedSnippets, "java-v115-workflow-template"),
    recordsSplitApplied: snippetMatched(expectedSnippets, "java-v115-decision-records-split"),
    readyForNodeV275Alignment: false,
  };
  reference.readyForNodeV275Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.responseSchemaVersion === "java-release-approval-rehearsal-response-schema.v34"
    && reference.echoMode === "java-v115-credential-resolver-approval-required-boundary-echo-refinement-only"
    && reference.proofClaimPresent
    && reference.nodeVerificationActionPresent;

  return reference;
}

export function createMiniKvV121Reference(): MiniKvV121ApprovalRequiredBoundaryNonParticipationReference {
  const { evidenceFiles, expectedSnippets } = createMiniKvEvidence();
  const root = readJsonObject(MINI_KV_V121_RECEIPT);
  const receipt = objectField(root, "credential_resolver_approval_required_boundary_non_participation_receipt");
  const sourceVerification = objectField(receipt, "source_node_v274_verification");
  const approvalRequiredBoundaries = objectField(receipt, "approval_required_boundaries");
  const details = createMiniKvDetails(approvalRequiredBoundaries);
  const checks = objectField(receipt, "checks");
  const sourceNodeV274Checks = objectField(receipt, "source_node_v274_checks");
  const reference: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference = {
    sourceVersion: "mini-kv v121",
    tagLabel: "第一百二十一版审批边界非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    ...createMiniKvReceiptFields(root, receipt),
    ...createMiniKvSourceFields(receipt, sourceVerification),
    ...createMiniKvReviewFields(
      receipt,
      approvalRequiredBoundaries,
      details,
      checks,
      sourceNodeV274Checks,
    ),
    ...createMiniKvBoundaryFields(receipt),
    readyForNodeV275Alignment: false,
  };
  reference.readyForNodeV275Alignment = all([
    reference.evidencePresent,
    reference.verificationDocumented,
    reference.releaseVersion === "v121",
    reference.consumerHint === "Node v275 credential resolver approval-required boundary upstream echo verification",
    reference.readyForApprovalRequiredBoundaryUpstreamEcho === true,
  ]);

  return reference;
}

function createMiniKvEvidence() {
  const evidenceFiles = [
    evidenceFile("mini-kv-v121-receipt", MINI_KV_V121_RECEIPT),
    evidenceFile("mini-kv-v121-runbook", MINI_KV_V121_RUNBOOK),
    evidenceFile("mini-kv-v121-walkthrough", MINI_KV_V121_WALKTHROUGH),
    evidenceFile("mini-kv-v121-runtime-receipt", MINI_KV_V121_RUNTIME_RECEIPT),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v121-consumer-hint", MINI_KV_V121_RECEIPT, "Node v275 credential resolver approval-required boundary upstream echo verification"),
    snippet("mini-kv-v121-release", MINI_KV_V121_RECEIPT, "\"release_version\":\"v121\""),
    snippet("mini-kv-v121-non-participation", MINI_KV_V121_RECEIPT, "approval_required_boundary_non_participation_receipt_only"),
    ...APPROVAL_REQUIRED_BOUNDARY_CODES.map((code) => snippet(`mini-kv-v121-boundary-${code}`, MINI_KV_V121_RECEIPT, code)),
    snippet("mini-kv-v121-no-credential", MINI_KV_V121_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v121-no-raw-endpoint", MINI_KV_V121_RECEIPT, "\"raw_endpoint_url_parse_allowed\":false"),
    snippet("mini-kv-v121-no-connection", MINI_KV_V121_RECEIPT, "\"connects_managed_audit\":false"),
    snippet("mini-kv-v121-no-ledger", MINI_KV_V121_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v121-no-schema", MINI_KV_V121_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v121-no-load-restore", MINI_KV_V121_RECEIPT, "\"load_restore_compact_executed\":false"),
    snippet("mini-kv-v121-runtime-node-v275", MINI_KV_V121_RUNTIME_RECEIPT, "Node v275 credential resolver approval-required boundary upstream echo verification"),
  ];
  return { evidenceFiles, expectedSnippets };
}

function createMiniKvDetails(
  boundaries: Record<string, unknown>,
): MiniKvV121ApprovalRequiredBoundaryNonParticipationReference["approvalRequiredBoundaryDetails"] {
  return objectArrayField(boundaries, "details").map((detail) => ({
    code: stringField(detail, "code") ?? "",
    owner: stringField(detail, "owner") ?? "",
    reason: stringField(detail, "reason") ?? "",
    mini_kv_position: stringField(detail, "mini_kv_position") ?? "",
    prohibited_runtime_actions: stringArrayField(detail, "prohibited_runtime_actions"),
    read_only: booleanField(detail, "read_only") === true,
    approval_required: booleanField(detail, "approval_required") === true,
    mini_kv_participates: booleanField(detail, "mini_kv_participates") === true,
  }));
}

function createMiniKvReceiptFields(
  root: Record<string, unknown>,
  receipt: Record<string, unknown>,
) {
  return {
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
  };
}

function createMiniKvSourceFields(
  receipt: Record<string, unknown>,
  source: Record<string, unknown>,
) {
  return {
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourceVerificationState: stringField(receipt, "source_verification_state"),
    sourceReady: booleanField(receipt, "source_ready_for_disabled_candidate_upstream_echo_verification"),
    sourceReadOnlyUpstreamEchoVerification: booleanField(receipt, "source_read_only_upstream_echo_verification"),
    sourceDisabledCandidateEchoVerificationOnly: booleanField(receipt, "source_disabled_candidate_echo_verification_only"),
    sourceReadyForManagedAuditSandboxAdapterConnection: booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection"),
    sourceRealResolverImplementationAllowed: booleanField(receipt, "source_real_resolver_implementation_allowed"),
    sourceExecutionAllowed: booleanField(receipt, "source_execution_allowed"),
    sourceConnectsManagedAudit: booleanField(receipt, "source_connects_managed_audit"),
    sourceCredentialValueRead: booleanField(receipt, "source_credential_value_read"),
    sourceRawEndpointUrlParsed: booleanField(receipt, "source_raw_endpoint_url_parsed"),
    sourceExternalRequestSent: booleanField(receipt, "source_external_request_sent"),
    sourceSecretProviderInstantiated: booleanField(receipt, "source_secret_provider_instantiated"),
    sourceResolverClientInstantiated: booleanField(receipt, "source_resolver_client_instantiated"),
    sourceSchemaMigrationExecuted: booleanField(receipt, "source_schema_migration_executed"),
    sourceApprovalLedgerWritten: booleanField(receipt, "source_approval_ledger_written"),
    sourceAutomaticUpstreamStart: booleanField(receipt, "source_automatic_upstream_start"),
    sourceNodeV274CheckCount: numberField(source, "check_count"),
    sourceNodeV274PassedCheckCount: numberField(source, "passed_check_count"),
    sourceCandidateDecisionCount: numberField(source, "candidate_decision_count"),
    sourceCandidateReadyDecisionCount: numberField(source, "candidate_ready_decision_count"),
    sourceApprovalRequiredDecisionCount: numberField(source, "approval_required_decision_count"),
    sourceApprovalRequiredBoundaryCodes: stringArrayField(source, "approval_required_boundary_codes"),
    sourceCandidateDigest: stringField(source, "candidate_digest"),
  };
}

function createMiniKvReviewFields(
  receipt: Record<string, unknown>,
  boundaries: Record<string, unknown>,
  details: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference["approvalRequiredBoundaryDetails"],
  checks: Record<string, unknown>,
  sourceChecks: Record<string, unknown>,
) {
  const summary = objectField(receipt, "summary");
  return {
    approvalRequiredBoundaryCount: numberField(boundaries, "boundary_count"),
    approvalRequiredBoundaryCodes: stringArrayField(boundaries, "boundary_codes"),
    approvalRequiredBoundaryDetails: details,
    checks: booleanRecord(checks),
    sourceNodeV274Checks: booleanRecord(sourceChecks),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
  };
}

function createMiniKvBoundaryFields(receipt: Record<string, unknown>) {
  return {
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    approvalRequiredBoundaryNonParticipationReceiptOnly: booleanField(receipt, "approval_required_boundary_non_participation_receipt_only"),
    approvalRequiredBoundaryRefinementOnly: booleanField(receipt, "approval_required_boundary_refinement_only"),
    readyForApprovalRequiredBoundaryUpstreamEcho: booleanField(receipt, "ready_for_approval_required_boundary_upstream_echo"),
    readyForManagedAuditSandboxAdapterConnection: booleanField(receipt, "ready_for_managed_audit_sandbox_adapter_connection"),
    realResolverImplementationAllowed: booleanField(receipt, "real_resolver_implementation_allowed"),
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
    secretProviderRuntimeAllowed: booleanField(receipt, "secret_provider_runtime_allowed"),
    credentialValueReadAllowed: booleanField(receipt, "credential_value_read_allowed"),
    credentialValueLoaded: booleanField(receipt, "credential_value_loaded"),
    credentialValueStored: booleanField(receipt, "credential_value_stored"),
    credentialValueIncluded: booleanField(receipt, "credential_value_included"),
    rawEndpointUrlParseAllowed: booleanField(receipt, "raw_endpoint_url_parse_allowed"),
    rawEndpointUrlParsed: booleanField(receipt, "raw_endpoint_url_parsed"),
    rawEndpointUrlIncluded: booleanField(receipt, "raw_endpoint_url_included"),
    externalRequestAllowed: booleanField(receipt, "external_request_allowed"),
    externalRequestSent: booleanField(receipt, "external_request_sent"),
    connectsManagedAudit: booleanField(receipt, "connects_managed_audit"),
    readsManagedAuditCredential: booleanField(receipt, "reads_managed_audit_credential"),
    storesManagedAuditCredential: booleanField(receipt, "stores_managed_audit_credential"),
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    writeCommandsExecuted: booleanField(receipt, "write_commands_executed"),
    adminCommandsExecuted: booleanField(receipt, "admin_commands_executed"),
    runtimeWriteObserved: booleanField(receipt, "runtime_write_observed"),
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    approvalLedgerWriteExecuted: booleanField(receipt, "approval_ledger_write_executed"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
    productionRecordWritten: booleanField(receipt, "production_record_written"),
    schemaMigrationAllowed: booleanField(receipt, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    automaticUpstreamStartAllowed: booleanField(receipt, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
  };
}

function all(values: readonly boolean[]): boolean {
  return values.every((value) => value);
}

function booleanRecord(record: Record<string, unknown>): Record<string, boolean | null> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, typeof value === "boolean" ? value : null]),
  );
}
