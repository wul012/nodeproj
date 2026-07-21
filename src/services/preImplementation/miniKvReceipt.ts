import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  stringArrayField,
  stringField,
} from "../historicalEvidenceReportUtils.js";
import {
  MINI_KV_V119_RECEIPT,
  MINI_KV_V119_RUNBOOK,
  MINI_KV_V119_WALKTHROUGH,
} from "./evidence.js";
import type { MiniKvV119NonParticipation } from "./types.js";

type JsonObject = Record<string, unknown>;
type SnippetSpec = readonly [id: string, path: string, text: string];

const MINI_KV_SNIPPETS: readonly SnippetSpec[] = [
  ["mini-kv-v119-consumer", MINI_KV_V119_RECEIPT, "Node v272 credential resolver pre-implementation intake upstream echo verification"],
  ["mini-kv-v119-release", MINI_KV_V119_RECEIPT, "\"release_version\":\"v119\""],
  ["mini-kv-v119-profile", MINI_KV_V119_RECEIPT, "managed-audit-manual-sandbox-connection-credential-resolver-pre-implementation-plan-intake.v1"],
  ["mini-kv-v119-state", MINI_KV_V119_RECEIPT, "\"source_plan_intake_state\":\"credential-resolver-pre-implementation-plan-intake-ready\""],
  ["mini-kv-v119-plan-mode", MINI_KV_V119_RECEIPT, "\"plan_mode\":\"plan-intake-only\""],
  ["mini-kv-v119-boundary-count", MINI_KV_V119_RECEIPT, "\"boundary_count\":10"],
  ["mini-kv-v119-defined-boundary", MINI_KV_V119_RECEIPT, "\"defined_boundary_count\":10"],
  ["mini-kv-v119-missing-boundary", MINI_KV_V119_RECEIPT, "\"missing_boundary_count\":0"],
  ["mini-kv-v119-check-count", MINI_KV_V119_RECEIPT, "\"check_count\":26"],
  ["mini-kv-v119-passed-count", MINI_KV_V119_RECEIPT, "\"passed_check_count\":26"],
  ["mini-kv-v119-plan-document", MINI_KV_V119_RECEIPT, "PLAN_DOCUMENT"],
  ["mini-kv-v119-credential-handle", MINI_KV_V119_RECEIPT, "CREDENTIAL_HANDLE"],
  ["mini-kv-v119-audit-ledger-policy", MINI_KV_V119_RECEIPT, "AUDIT_LEDGER_WRITE_POLICY"],
  ["mini-kv-v119-requirement", MINI_KV_V119_RECEIPT, "REAL_RESOLVER_PRE_IMPLEMENTATION_PLAN_MISSING"],
  ["mini-kv-v119-no-resolver", MINI_KV_V119_RECEIPT, "\"credential_resolver_implemented\":false"],
  ["mini-kv-v119-no-client", MINI_KV_V119_RECEIPT, "\"resolver_client_instantiated\":false"],
  ["mini-kv-v119-no-secret", MINI_KV_V119_RECEIPT, "\"secret_provider_instantiated\":false"],
  ["mini-kv-v119-no-credential", MINI_KV_V119_RECEIPT, "\"credential_value_read_allowed\":false"],
  ["mini-kv-v119-no-raw", MINI_KV_V119_RECEIPT, "\"raw_endpoint_url_parsed\":false"],
  ["mini-kv-v119-no-external", MINI_KV_V119_RECEIPT, "\"external_request_sent\":false"],
  ["mini-kv-v119-no-write", MINI_KV_V119_RECEIPT, "\"storage_write_allowed\":false"],
  ["mini-kv-v119-no-ledger", MINI_KV_V119_RECEIPT, "\"approval_ledger_written\":false"],
  ["mini-kv-v119-no-schema", MINI_KV_V119_RECEIPT, "\"schema_migration_executed\":false"],
  ["mini-kv-v119-no-restore", MINI_KV_V119_RECEIPT, "\"load_restore_compact_executed\":false"],
  ["mini-kv-v119-no-setnxex", MINI_KV_V119_RECEIPT, "\"setnxex_execution_allowed\":false"],
  ["mini-kv-v119-walkthrough", MINI_KV_V119_WALKTHROUGH, "供 Node v272"],
];

export function createMiniKvV119Receipt(): MiniKvV119NonParticipation {
  const evidenceFiles = [
    evidenceFile("mini-kv-v119-receipt", MINI_KV_V119_RECEIPT),
    evidenceFile("mini-kv-v119-runbook", MINI_KV_V119_RUNBOOK),
    evidenceFile("mini-kv-v119-walkthrough", MINI_KV_V119_WALKTHROUGH),
  ];
  const expectedSnippets = MINI_KV_SNIPPETS.map(([id, path, text]) => snippet(id, path, text));
  const root = readJsonObject(MINI_KV_V119_RECEIPT);
  const receipt = objectField(root, "credential_resolver_pre_implementation_plan_intake_non_participation_receipt");
  const plan = objectField(receipt, "pre_implementation_plan");
  const intake = objectField(receipt, "plan_intake");
  const summary = objectField(receipt, "summary");

  const reference: MiniKvV119NonParticipation = {
    sourceVersion: "mini-kv v119",
    tagLabel: "第一百一十九版credential-resolver-plan-intake回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    ...sourceFields(receipt),
    ...planFields(plan, intake, summary),
    ...runtimeFields(receipt),
    ...authorityFields(receipt),
    readyForNodeV272Alignment: false,
  };
  reference.readyForNodeV272Alignment = isAligned(reference);
  return reference;
}

function sourceFields(receipt: JsonObject) {
  return {
    sourceProfileVersion: stringField(receipt, "source_profile_version"),
    sourcePlanIntakeState: stringField(receipt, "source_plan_intake_state"),
    sourceReadyForPlanIntake: booleanField(receipt, "source_ready_for_plan_intake"),
    sourcePlanIntakeOnly: booleanField(receipt, "source_plan_intake_only"),
    sourceReadOnlyPlanIntake: booleanField(receipt, "source_read_only_plan_intake"),
    sourceReadyForCredentialResolverPreImplementationPlan:
      booleanField(receipt, "source_ready_for_credential_resolver_pre_implementation_plan"),
    sourceReadyForManagedAuditSandboxAdapterConnection:
      booleanField(receipt, "source_ready_for_managed_audit_sandbox_adapter_connection"),
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
  };
}

function planFields(plan: JsonObject, intake: JsonObject, summary: JsonObject) {
  return {
    planVersion: stringField(plan, "plan_version"),
    planMode: stringField(plan, "plan_mode"),
    planDigest: stringField(plan, "plan_digest"),
    intakeDigest: stringField(intake, "intake_digest"),
    boundaryCount: numberField(plan, "boundary_count"),
    definedBoundaryCount: numberField(plan, "defined_boundary_count"),
    missingBoundaryCount: numberField(intake, "missing_boundary_count"),
    boundaryCodes: stringArrayField(plan, "boundary_codes"),
    requirementCodes: stringArrayField(plan, "requirement_codes"),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    sourceCheckCount: numberField(summary, "source_check_count"),
    sourcePassedCheckCount: numberField(summary, "source_passed_check_count"),
    productionBlockerCount: numberField(summary, "production_blocker_count"),
    warningCount: numberField(summary, "warning_count"),
    recommendationCount: numberField(summary, "recommendation_count"),
  };
}

function runtimeFields(receipt: JsonObject) {
  return {
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    planIntakeOnly: booleanField(receipt, "plan_intake_only"),
    readOnlyPlanIntake: booleanField(receipt, "read_only_plan_intake"),
    receiptOnly: booleanField(receipt, "credential_resolver_pre_implementation_plan_intake_non_participation_receipt_only"),
    readyForCredentialResolverPreImplementationPlan: booleanField(receipt, "ready_for_credential_resolver_pre_implementation_plan"),
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
    storageWriteAllowed: booleanField(receipt, "storage_write_allowed"),
    writeCommandsExecuted: booleanField(receipt, "write_commands_executed"),
    adminCommandsExecuted: booleanField(receipt, "admin_commands_executed"),
    approvalLedgerWriteAllowed: booleanField(receipt, "approval_ledger_write_allowed"),
    approvalLedgerWritten: booleanField(receipt, "approval_ledger_written"),
    managedAuditWriteExecuted: booleanField(receipt, "managed_audit_write_executed"),
  };
}

function authorityFields(receipt: JsonObject) {
  return {
    schemaMigrationAllowed: booleanField(receipt, "schema_migration_allowed"),
    schemaMigrationExecuted: booleanField(receipt, "schema_migration_executed"),
    restoreExecutionAllowed: booleanField(receipt, "restore_execution_allowed"),
    loadRestoreCompactExecuted: booleanField(receipt, "load_restore_compact_executed"),
    setnxexExecutionAllowed: booleanField(receipt, "setnxex_execution_allowed"),
    nodeAutoStartAllowed: booleanField(receipt, "node_auto_start_allowed"),
    javaAutoStartAllowed: booleanField(receipt, "java_auto_start_allowed"),
    miniKvAutoStartAllowed: booleanField(receipt, "mini_kv_auto_start_allowed"),
    automaticUpstreamStartAllowed: booleanField(receipt, "automatic_upstream_start_allowed"),
    automaticUpstreamStart: booleanField(receipt, "automatic_upstream_start"),
    managedAuditStorageBackend: booleanField(receipt, "managed_audit_storage_backend"),
    auditAuthoritative: booleanField(receipt, "audit_authoritative"),
    orderAuthoritative: booleanField(receipt, "order_authoritative"),
  };
}

function isAligned(reference: MiniKvV119NonParticipation): boolean {
  return reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v119"
    && reference.consumerHint
      === "Node v272 credential resolver pre-implementation intake upstream echo verification";
}
