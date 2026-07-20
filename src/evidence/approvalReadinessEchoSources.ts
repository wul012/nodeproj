import {
  booleanField,
  evidenceFile,
  numberField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "../services/historicalEvidenceReportUtils.js";
import type {
  JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
} from "../services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";

export const APPROVAL_ECHO_PATHS = {
  javaRunbook: "D:/javaproj/advanced-order-platform/d/116/解释/说明.md",
  javaWalkthrough:
    "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/119-version-116-credential-resolver-approval-required-implementation-readiness-echo.md",
  javaSupport:
    "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.java",
  javaBuilder:
    "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder.java",
  miniKvReceipt:
    "D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-implementation-readiness-non-participation-receipt.json",
  miniKvRunbook: "D:/C/mini-kv/d/122/解释/说明.md",
  miniKvWalkthrough:
    "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/178-version-122-credential-resolver-approval-required-implementation-readiness-non-participation-receipt.md",
} as const;

export const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const;

export const REQUIRED_ARTIFACT_IDS = [
  "credential-handle-review-id",
  "credential-value-redaction-contract",
  "operator-visible-secret-value-prohibition",
  "endpoint-handle-review-id",
  "allowlist-review-status",
  "raw-endpoint-redaction-contract",
  "operator-identity-binding",
  "approval-correlation-marker",
  "manual-window-open-marker",
  "rollback-abort-marker",
  "restore-point-review-id",
  "manual-rollback-runbook-reference",
  "schema-migration-rehearsal-id",
  "migration-review-status",
  "sql-execution-prohibition-marker",
  "approval-ledger-write-policy-id",
  "audit-store-write-prohibition-marker",
  "write-path-owner-review",
] as const;

export function createJavaV116Reference(): JavaV116ApprovalRequiredImplementationReadinessEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v116-runbook", APPROVAL_ECHO_PATHS.javaRunbook),
    evidenceFile("java-v116-walkthrough", APPROVAL_ECHO_PATHS.javaWalkthrough),
    evidenceFile("java-v116-support", APPROVAL_ECHO_PATHS.javaSupport),
    evidenceFile("java-v116-builder", APPROVAL_ECHO_PATHS.javaBuilder),
  ];
  const expectedSnippets = [
    snippet("java-v116-runbook-title", APPROVAL_ECHO_PATHS.javaRunbook, "Java v116 运行说明"),
    snippet("java-v116-runbook-node-v281", APPROVAL_ECHO_PATHS.javaRunbook, "Node v281"),
    snippet("java-v116-walkthrough-title", APPROVAL_ECHO_PATHS.javaWalkthrough, "Java v116 代码讲解"),
    snippet("java-v116-support-mode", APPROVAL_ECHO_PATHS.javaSupport, "java-v116-credential-resolver-approval-required-implementation-readiness-echo-only"),
    snippet("java-v116-boundary-count", APPROVAL_ECHO_PATHS.javaSupport, "BOUNDARY_COUNT = 6"),
    snippet("java-v116-required-artifact-count", APPROVAL_ECHO_PATHS.javaSupport, "REQUIRED_ARTIFACT_COUNT = 18"),
    snippet("java-v116-check-count", APPROVAL_ECHO_PATHS.javaSupport, "CHECK_COUNT = 21"),
    snippet("java-v116-passed-check-count", APPROVAL_ECHO_PATHS.javaSupport, "PASSED_CHECK_COUNT = 21"),
    snippet("java-v116-proof-claims", APPROVAL_ECHO_PATHS.javaBuilder, "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6"),
    snippet("java-v116-node-v282", APPROVAL_ECHO_PATHS.javaBuilder, "Node v282"),
  ];
  const proofClaims = [
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sourceNodeV281.reviewState=credential-resolver-approval-required-implementation-readiness-review-ready",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readinessReview.allApprovalRequiredBoundariesEchoReady=true",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readinessReview.allApprovalRequiredBoundariesImplementationBlocked=true",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.credentialValueRead=false",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.sqlExecuted=false",
    "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForManagedAuditResolverImplementation=false",
  ];
  const nodeVerificationActions = [
    "Compare managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.consumedByNodeCredentialResolverApprovalRequiredImplementationReadinessReviewProfile with Node v281",
    "Require managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.readyForNodeV282CredentialResolverApprovalRequiredImplementationReadinessVerification=true before Node v282",
    "Verify managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6",
    "Verify managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.requiredArtifactIds.size=18",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.readyForRuntimeImplementation=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.credentialValueRead=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.rawEndpointUrlParsed=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.connectsManagedAudit=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.approvalLedgerWritten=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.sqlExecuted=false",
    "Keep managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.sideEffectBoundary.automaticUpstreamStart=false",
  ];
  return {
    sourceVersion: "Java v116",
    tagLabel: "v116订单平台approval-required实现前置回显",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    responseSchemaVersion: snippetMatched(expectedSnippets, "java-v116-support-mode")
      ? "java-release-approval-rehearsal-response-schema.v35"
      : "missing",
    receiptVersion: snippetMatched(expectedSnippets, "java-v116-boundary-count")
      ? "java-release-approval-rehearsal-managed-audit-sandbox-endpoint-credential-resolver-approval-required-implementation-readiness-echo-receipt.v1"
      : "missing",
    echoMode: snippetMatched(expectedSnippets, "java-v116-support-mode")
      ? "java-v116-credential-resolver-approval-required-implementation-readiness-echo-only"
      : "missing",
    boundaryCount: 6,
    requiredArtifactCount: 18,
    boundaryCodes: [...APPROVAL_REQUIRED_BOUNDARY_CODES],
    requiredArtifactIds: [...REQUIRED_ARTIFACT_IDS],
    proofClaimCount: proofClaims.length,
    proofClaimsPresent: proofClaims.every((claim) => claim.includes("managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt")),
    warningDigestInputsPresent: snippetMatched(expectedSnippets, "java-v116-runbook-title") && snippetMatched(expectedSnippets, "java-v116-support-mode"),
    nodeVerificationActionsPresent: nodeVerificationActions.length > 0,
    readyForNodeV282Verification:
      evidenceFiles.every((file) => file.exists)
      && expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    readyForManagedAuditResolverImplementation: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    connectsManagedAudit: false,
    approvalLedgerWritten: false,
    sqlExecuted: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    javaStartedNodeOrMiniKv: false,
    noCredentialConnectionWriteOrAutoStartProved: true,
    readyForNodeV282Alignment: true,
  };
}

export function createMiniKvV122Reference(): MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v122-receipt", APPROVAL_ECHO_PATHS.miniKvReceipt),
    evidenceFile("mini-kv-v122-runbook", APPROVAL_ECHO_PATHS.miniKvRunbook),
    evidenceFile("mini-kv-v122-walkthrough", APPROVAL_ECHO_PATHS.miniKvWalkthrough),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v122-consumer-hint", APPROVAL_ECHO_PATHS.miniKvReceipt, "Node v282 credential resolver approval-required implementation readiness upstream echo verification"),
    snippet("mini-kv-v122-release", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"release_version\":\"v122\""),
    snippet("mini-kv-v122-node-v281", APPROVAL_ECHO_PATHS.miniKvReceipt, "Node v281 credential resolver approval-required implementation readiness review"),
    snippet("mini-kv-v122-boundary-count", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"boundary_count\":6"),
    snippet("mini-kv-v122-required-artifact-count", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"required_artifact_count\":18"),
    snippet("mini-kv-v122-next-node", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"next_node_verification_version\":\"Node v282\""),
    snippet("mini-kv-v122-no-credential", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v122-no-raw-endpoint", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"raw_endpoint_url_parse_allowed\":false"),
    snippet("mini-kv-v122-no-connection", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"connects_managed_audit\":false"),
    snippet("mini-kv-v122-no-ledger", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v122-no-schema", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v122-no-load-restore", APPROVAL_ECHO_PATHS.miniKvReceipt, "\"load_restore_compact_executed\":false"),
  ];
  const root = readJsonObject(APPROVAL_ECHO_PATHS.miniKvReceipt);
  const receipt = objectField(root, "credential_resolver_approval_required_implementation_readiness_non_participation_receipt");
  const boundaryReadiness = objectField(receipt, "boundary_readiness");
  const checks = objectField(receipt, "checks");
  const summary = objectField(receipt, "summary");
  const reference: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference = {
    sourceVersion: "mini-kv v122",
    tagLabel: "第一百二十二版审批边界实现前非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
    sourceReviewState: stringField(receipt, "source_review_state"),
    sourceReadyForApprovalRequiredImplementationReadinessReview: booleanField(receipt, "source_ready_for_approval_required_implementation_readiness_review"),
    sourceReadyForJavaV116MiniKvV122Echo: booleanField(receipt, "source_ready_for_java_v116_mini_kv_v122_echo"),
    sourceReadyForManagedAuditResolverImplementation: booleanField(receipt, "source_ready_for_managed_audit_resolver_implementation"),
    boundaryCount: numberField(boundaryReadiness, "boundary_count"),
    requiredArtifactCount: numberField(boundaryReadiness, "required_artifact_count"),
    boundaryCodes: stringArrayField(boundaryReadiness, "boundary_codes"),
    requiredArtifactIds: stringArrayField(boundaryReadiness, "required_artifact_codes"),
    checks: booleanRecord(checks),
    checkCount: numberField(summary, "check_count"),
    passedCheckCount: numberField(summary, "passed_check_count"),
    readOnly: booleanField(receipt, "read_only"),
    executionAllowed: booleanField(receipt, "execution_allowed"),
    implementationReadinessReviewOnly: booleanField(receipt, "implementation_readiness_review_only"),
    nonParticipationReceiptOnly: booleanField(receipt, "approval_required_implementation_readiness_non_participation_receipt_only"),
    readyForApprovalRequiredImplementationReadinessUpstreamEcho: booleanField(receipt, "ready_for_approval_required_implementation_readiness_upstream_echo"),
    readyForManagedAuditResolverImplementation: booleanField(receipt, "ready_for_managed_audit_resolver_implementation"),
    realResolverImplementationAllowed: booleanField(receipt, "real_resolver_implementation_allowed"),
    credentialResolverImplemented: booleanField(receipt, "credential_resolver_implemented"),
    credentialResolverInvoked: booleanField(receipt, "credential_resolver_invoked"),
    resolverClientInstantiated: booleanField(receipt, "resolver_client_instantiated"),
    secretProviderInstantiated: booleanField(receipt, "secret_provider_instantiated"),
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
    readyForNodeV282Alignment: false,
  };
  reference.readyForNodeV282Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v122"
    && reference.consumerHint === "Node v282 credential resolver approval-required implementation readiness upstream echo verification"
    && reference.sourceReadyForApprovalRequiredImplementationReadinessReview === true
    && reference.sourceReadyForJavaV116MiniKvV122Echo === true;

  return reference;
}

function booleanRecord(input: Record<string, unknown>): Record<string, boolean | null> {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      typeof value === "boolean" ? value : null,
    ]),
  );
}
