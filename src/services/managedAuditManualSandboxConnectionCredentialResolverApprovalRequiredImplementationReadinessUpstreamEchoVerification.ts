import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
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
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.js";
import type {
  ApprovalRequiredImplementationReadinessNodeV281Reference,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerification,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage,
  JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile,
  MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification";
const NODE_V281_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-review";
const ACTIVE_PLAN = "docs/plans2/v280-post-status-routes-quality-roadmap.md";

const JAVA_V116_RUNBOOK = "D:/javaproj/advanced-order-platform/d/116/解释/说明.md";
const JAVA_V116_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段_续/119-version-116-credential-resolver-approval-required-implementation-readiness-echo.md";
const JAVA_V116_SUPPORT =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoSupport.java";
const JAVA_V116_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder.java";

const MINI_KV_V122_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-implementation-readiness-non-participation-receipt.json";
const MINI_KV_V122_RUNBOOK = "D:/C/mini-kv/d/122/解释/说明.md";
const MINI_KV_V122_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段_第二册/178-version-122-credential-resolver-approval-required-implementation-readiness-non-participation-receipt.md";

const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const;

const REQUIRED_ARTIFACT_IDS = [
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

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerificationProfile {
  const sourceNodeV281 = createSourceNodeV281(input.config);
  const javaV116 = createJavaV116Reference();
  const miniKvV122 = createMiniKvV122Reference();
  const checks = createChecks(input.config, sourceNodeV281, javaV116, miniKvV122);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification
    ? "credential-resolver-approval-required-implementation-readiness-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV281ReadinessDigest: sourceNodeV281.readinessReviewDigest,
    javaV116ReceiptVersion: javaV116.receiptVersion,
    miniKvV122ReceiptDigest: miniKvV122.receiptDigest,
    checks,
  });
  const echoVerification = createEchoVerification(sourceNodeV281, javaV116, miniKvV122, checks, verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV281, javaV116, miniKvV122, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval-required implementation readiness upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    approvalRequiredImplementationReadinessEchoVerificationOnly: true,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV281,
    upstreamEchoes: { javaV116, miniKvV122 },
    echoVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalRequiredImplementationReadinessUpstreamEchoVerificationJson: ROUTE_PATH,
      approvalRequiredImplementationReadinessUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV281Json: NODE_V281_ROUTE,
      sourceNodeV281Markdown: `${NODE_V281_ROUTE}?format=markdown`,
      javaV116Runbook: JAVA_V116_RUNBOOK,
      javaV116Walkthrough: JAVA_V116_WALKTHROUGH,
      javaV116Support: JAVA_V116_SUPPORT,
      javaV116Builder: JAVA_V116_BUILDER,
      miniKvV122Receipt: MINI_KV_V122_RECEIPT,
      miniKvV122Runbook: MINI_KV_V122_RUNBOOK,
      miniKvV122Walkthrough: MINI_KV_V122_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v283",
    },
    nextActions: [
      "Archive Node v282 under d/282 with screenshot, explanation, and route evidence.",
      "Keep Java v116 and mini-kv v122 unchanged; this version only verifies their archived evidence.",
      "After v282, write Node v283 as the managed audit resolver implementation plan draft.",
      "Do not implement a real resolver, secret provider, raw endpoint parser, HTTP/TCP client, schema migration, ledger write, or auto-start in this stage.",
    ],
  };
}

function createSourceNodeV281(config: AppConfig): ApprovalRequiredImplementationReadinessNodeV281Reference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({
    config,
  });
  return {
    sourceVersion: "Node v281",
    profileVersion: source.profileVersion,
    reviewState: source.reviewState,
    readyForApprovalRequiredImplementationReadinessReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview,
    readyForJavaV116MiniKvV122Echo: source.readyForJavaV116MiniKvV122Echo,
    readinessReviewDigest: source.readinessReview.reviewDigest,
    boundaryCount: source.summary.boundaryCount,
    echoReadyBoundaryCount: source.summary.echoReadyBoundaryCount,
    blockedForImplementationBoundaryCount: source.summary.blockedForImplementationBoundaryCount,
    requiredArtifactCount: source.summary.requiredArtifactCount,
    boundaryCodes: [...source.boundaryReadiness.map((boundary) => boundary.code)],
    requiredArtifactIds: source.boundaryReadiness.flatMap((boundary) => boundary.requiredArtifacts),
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    readyForManagedAuditResolverImplementation: source.readyForManagedAuditResolverImplementation,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createJavaV116Reference(): JavaV116ApprovalRequiredImplementationReadinessEchoReference {
  const evidenceFiles = [
    evidenceFile("java-v116-runbook", JAVA_V116_RUNBOOK),
    evidenceFile("java-v116-walkthrough", JAVA_V116_WALKTHROUGH),
    evidenceFile("java-v116-support", JAVA_V116_SUPPORT),
    evidenceFile("java-v116-builder", JAVA_V116_BUILDER),
  ];
  const expectedSnippets = [
    snippet("java-v116-runbook-title", JAVA_V116_RUNBOOK, "Java v116 运行说明"),
    snippet("java-v116-runbook-node-v281", JAVA_V116_RUNBOOK, "Node v281"),
    snippet("java-v116-walkthrough-title", JAVA_V116_WALKTHROUGH, "Java v116 代码讲解"),
    snippet("java-v116-support-mode", JAVA_V116_SUPPORT, "java-v116-credential-resolver-approval-required-implementation-readiness-echo-only"),
    snippet("java-v116-boundary-count", JAVA_V116_SUPPORT, "BOUNDARY_COUNT = 6"),
    snippet("java-v116-required-artifact-count", JAVA_V116_SUPPORT, "REQUIRED_ARTIFACT_COUNT = 18"),
    snippet("java-v116-check-count", JAVA_V116_SUPPORT, "CHECK_COUNT = 21"),
    snippet("java-v116-passed-check-count", JAVA_V116_SUPPORT, "PASSED_CHECK_COUNT = 21"),
    snippet("java-v116-proof-claims", JAVA_V116_BUILDER, "managedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceipt.boundaryReadiness.size=6"),
    snippet("java-v116-node-v282", JAVA_V116_BUILDER, "Node v282"),
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

function createMiniKvV122Reference(): MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference {
  const evidenceFiles = [
    evidenceFile("mini-kv-v122-receipt", MINI_KV_V122_RECEIPT),
    evidenceFile("mini-kv-v122-runbook", MINI_KV_V122_RUNBOOK),
    evidenceFile("mini-kv-v122-walkthrough", MINI_KV_V122_WALKTHROUGH),
  ];
  const expectedSnippets = [
    snippet("mini-kv-v122-consumer-hint", MINI_KV_V122_RECEIPT, "Node v282 credential resolver approval-required implementation readiness upstream echo verification"),
    snippet("mini-kv-v122-release", MINI_KV_V122_RECEIPT, "\"release_version\":\"v122\""),
    snippet("mini-kv-v122-node-v281", MINI_KV_V122_RECEIPT, "Node v281 credential resolver approval-required implementation readiness review"),
    snippet("mini-kv-v122-boundary-count", MINI_KV_V122_RECEIPT, "\"boundary_count\":6"),
    snippet("mini-kv-v122-required-artifact-count", MINI_KV_V122_RECEIPT, "\"required_artifact_count\":18"),
    snippet("mini-kv-v122-next-node", MINI_KV_V122_RECEIPT, "\"next_node_verification_version\":\"Node v282\""),
    snippet("mini-kv-v122-no-credential", MINI_KV_V122_RECEIPT, "\"credential_value_read_allowed\":false"),
    snippet("mini-kv-v122-no-raw-endpoint", MINI_KV_V122_RECEIPT, "\"raw_endpoint_url_parse_allowed\":false"),
    snippet("mini-kv-v122-no-connection", MINI_KV_V122_RECEIPT, "\"connects_managed_audit\":false"),
    snippet("mini-kv-v122-no-ledger", MINI_KV_V122_RECEIPT, "\"approval_ledger_written\":false"),
    snippet("mini-kv-v122-no-schema", MINI_KV_V122_RECEIPT, "\"schema_migration_executed\":false"),
    snippet("mini-kv-v122-no-load-restore", MINI_KV_V122_RECEIPT, "\"load_restore_compact_executed\":false"),
  ];
  const root = readJsonObject(MINI_KV_V122_RECEIPT);
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

function createEchoVerification(
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  verificationDigest: string,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerification {
  return {
    verificationDigest,
    verificationMode: "java-v116-plus-mini-kv-v122-approval-required-implementation-readiness-upstream-echo-verification-only",
    sourceSpan: "Node v281 + Java v116 + mini-kv v122",
    sourceNodeV281Ready: checks.sourceNodeV281Ready,
    javaV116EchoReady: checks.javaV116EchoReady,
    miniKvV122NonParticipationReady: checks.miniKvV122ReceiptReady,
    boundaryReadinessAligned: checks.boundaryCodesAligned,
    requiredArtifactsAligned: checks.requiredArtifactsAligned,
    readinessCountsAligned: checks.readinessCountsAligned,
    javaProofClaimsAligned: checks.proofClaimsAligned,
    miniKvReceiptAligned: checks.miniKvV122DocumentsNodeV281Consumption,
    sideEffectBoundariesAligned: checks.credentialBoundaryClosed
      && checks.rawEndpointBoundaryClosed
      && checks.resolverBoundaryClosed
      && checks.connectionBoundaryClosed
      && checks.writeBoundaryClosed
      && checks.autoStartBoundaryClosed,
    implementationStillBlocked: true,
    readyForNodeV283ImplementationPlanDraft:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification,
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks {
  return {
    sourceNodeV281Ready:
      sourceNodeV281.reviewState === "credential-resolver-approval-required-implementation-readiness-review-ready"
      && sourceNodeV281.readyForApprovalRequiredImplementationReadinessReview
      && sourceNodeV281.readyForJavaV116MiniKvV122Echo,
    sourceNodeV281KeepsRuntimeImplementationBlocked:
      !sourceNodeV281.readyForManagedAuditResolverImplementation
      && !sourceNodeV281.realResolverImplementationAllowed
      && !sourceNodeV281.executionAllowed
      && !sourceNodeV281.connectsManagedAudit
      && !sourceNodeV281.credentialValueRead
      && !sourceNodeV281.rawEndpointUrlParsed
      && !sourceNodeV281.externalRequestSent
      && !sourceNodeV281.secretProviderInstantiated
      && !sourceNodeV281.resolverClientInstantiated
      && !sourceNodeV281.schemaMigrationExecuted
      && !sourceNodeV281.approvalLedgerWritten
      && !sourceNodeV281.automaticUpstreamStart,
    javaV116EchoReady:
      javaV116.readyForNodeV282Verification
      && javaV116.readyForManagedAuditResolverImplementation === false
      && javaV116.noCredentialConnectionWriteOrAutoStartProved
      && javaV116.credentialValueRead === false
      && javaV116.rawEndpointUrlParsed === false
      && javaV116.externalRequestSent === false
      && javaV116.secretProviderInstantiated === false
      && javaV116.resolverClientInstantiated === false
      && javaV116.connectsManagedAudit === false
      && javaV116.approvalLedgerWritten === false
      && javaV116.sqlExecuted === false
      && javaV116.schemaMigrationExecuted === false
      && javaV116.automaticUpstreamStart === false
      && javaV116.javaStartedNodeOrMiniKv === false,
    javaV116DocumentsNodeV281Consumption:
      javaV116.evidencePresent
      && javaV116.verificationDocumented
      && javaV116.proofClaimCount === 11
      && javaV116.boundaryCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && javaV116.requiredArtifactCount === REQUIRED_ARTIFACT_IDS.length,
    javaV116KeepsRuntimeSideEffectsBlocked:
      javaV116.readyForManagedAuditResolverImplementation === false
      && javaV116.credentialValueRead === false
      && javaV116.rawEndpointUrlParsed === false
      && javaV116.externalRequestSent === false
      && javaV116.secretProviderInstantiated === false
      && javaV116.resolverClientInstantiated === false
      && javaV116.connectsManagedAudit === false
      && javaV116.approvalLedgerWritten === false
      && javaV116.sqlExecuted === false
      && javaV116.schemaMigrationExecuted === false
      && javaV116.javaStartedNodeOrMiniKv === false,
    miniKvV122ReceiptReady:
      miniKvV122.readyForNodeV282Alignment
      && miniKvV122.readOnly === true
      && miniKvV122.executionAllowed === false
      && miniKvV122.readyForManagedAuditResolverImplementation === false
      && miniKvV122.realResolverImplementationAllowed === false,
    miniKvV122DocumentsNodeV281Consumption:
      miniKvV122.evidencePresent
      && miniKvV122.verificationDocumented
      && miniKvV122.releaseVersion === "v122"
      && miniKvV122.consumerHint === "Node v282 credential resolver approval-required implementation readiness upstream echo verification",
    miniKvV122KeepsRuntimeSideEffectsBlocked:
      miniKvV122.credentialResolverImplemented === false
      && miniKvV122.credentialResolverInvoked === false
      && miniKvV122.resolverClientInstantiated === false
      && miniKvV122.secretProviderInstantiated === false
      && miniKvV122.credentialValueReadAllowed === false
      && miniKvV122.credentialValueLoaded === false
      && miniKvV122.credentialValueStored === false
      && miniKvV122.credentialValueIncluded === false
      && miniKvV122.rawEndpointUrlParseAllowed === false
      && miniKvV122.rawEndpointUrlParsed === false
      && miniKvV122.rawEndpointUrlIncluded === false
      && miniKvV122.externalRequestAllowed === false
      && miniKvV122.externalRequestSent === false
      && miniKvV122.connectsManagedAudit === false
      && miniKvV122.storageWriteAllowed === false
      && miniKvV122.writeCommandsExecuted === false
      && miniKvV122.adminCommandsExecuted === false
      && miniKvV122.approvalLedgerWriteAllowed === false
      && miniKvV122.approvalLedgerWritten === false
      && miniKvV122.managedAuditWriteExecuted === false
      && miniKvV122.schemaMigrationAllowed === false
      && miniKvV122.schemaMigrationExecuted === false
      && miniKvV122.restoreExecutionAllowed === false
      && miniKvV122.loadRestoreCompactExecuted === false
      && miniKvV122.setnxexExecutionAllowed === false
      && miniKvV122.automaticUpstreamStartAllowed === false
      && miniKvV122.automaticUpstreamStart === false
      && miniKvV122.managedAuditStorageBackend === false
      && miniKvV122.auditAuthoritative === false
      && miniKvV122.orderAuthoritative === false,
    boundaryCodesAligned:
      sourceNodeV281.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && sourceNodeV281.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index])
      && javaV116.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && javaV116.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index])
      && miniKvV122.boundaryCodes.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && miniKvV122.boundaryCodes.every((code, index) => code === APPROVAL_REQUIRED_BOUNDARY_CODES[index]),
    requiredArtifactsAligned:
      sourceNodeV281.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length
      && javaV116.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length
      && miniKvV122.requiredArtifactIds.length === REQUIRED_ARTIFACT_IDS.length
      && REQUIRED_ARTIFACT_IDS.every((id, index) =>
        sourceNodeV281.requiredArtifactIds[index] === id
        && javaV116.requiredArtifactIds[index] === id
        && miniKvV122.requiredArtifactIds[index] === id),
    readinessCountsAligned:
      sourceNodeV281.checkCount === 21
      && sourceNodeV281.passedCheckCount === 21
      && javaV116.proofClaimCount === 11
      && miniKvV122.checkCount === 21
      && miniKvV122.passedCheckCount === 21,
    proofClaimsAligned: javaV116.proofClaimsPresent && javaV116.warningDigestInputsPresent && javaV116.nodeVerificationActionsPresent,
    credentialBoundaryClosed:
      sourceNodeV281.credentialValueRead === false
      && javaV116.credentialValueRead === false
      && miniKvV122.credentialValueReadAllowed === false
      && miniKvV122.credentialValueLoaded === false
      && miniKvV122.credentialValueStored === false
      && miniKvV122.credentialValueIncluded === false,
    rawEndpointBoundaryClosed:
      sourceNodeV281.rawEndpointUrlParsed === false
      && javaV116.rawEndpointUrlParsed === false
      && miniKvV122.rawEndpointUrlParseAllowed === false
      && miniKvV122.rawEndpointUrlParsed === false
      && miniKvV122.rawEndpointUrlIncluded === false,
    resolverBoundaryClosed:
      sourceNodeV281.resolverClientInstantiated === false
      && sourceNodeV281.secretProviderInstantiated === false
      && javaV116.resolverClientInstantiated === false
      && javaV116.secretProviderInstantiated === false
      && miniKvV122.credentialResolverImplemented === false
      && miniKvV122.credentialResolverInvoked === false
      && miniKvV122.resolverClientInstantiated === false
      && miniKvV122.secretProviderInstantiated === false,
    connectionBoundaryClosed:
      sourceNodeV281.connectsManagedAudit === false
      && sourceNodeV281.externalRequestSent === false
      && javaV116.connectsManagedAudit === false
      && javaV116.externalRequestSent === false
      && miniKvV122.connectsManagedAudit === false
      && miniKvV122.externalRequestAllowed === false
      && miniKvV122.externalRequestSent === false,
    writeBoundaryClosed:
      sourceNodeV281.executionAllowed === false
      && sourceNodeV281.schemaMigrationExecuted === false
      && sourceNodeV281.approvalLedgerWritten === false
      && javaV116.approvalLedgerWritten === false
      && javaV116.sqlExecuted === false
      && javaV116.schemaMigrationExecuted === false
      && miniKvV122.storageWriteAllowed === false
      && miniKvV122.writeCommandsExecuted === false
      && miniKvV122.adminCommandsExecuted === false
      && miniKvV122.approvalLedgerWriteAllowed === false
      && miniKvV122.approvalLedgerWritten === false
      && miniKvV122.managedAuditWriteExecuted === false
      && miniKvV122.schemaMigrationAllowed === false
      && miniKvV122.schemaMigrationExecuted === false
      && miniKvV122.restoreExecutionAllowed === false
      && miniKvV122.loadRestoreCompactExecuted === false
      && miniKvV122.setnxexExecutionAllowed === false,
    autoStartBoundaryClosed:
      sourceNodeV281.automaticUpstreamStart === false
      && javaV116.automaticUpstreamStart === false
      && javaV116.javaStartedNodeOrMiniKv === false
      && miniKvV122.automaticUpstreamStartAllowed === false
      && miniKvV122.automaticUpstreamStart === false,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessUpstreamEchoVerification:
      sourceNodeV281.readyForApprovalRequiredImplementationReadinessReview
      && javaV116.readyForNodeV282Verification
      && miniKvV122.readyForNodeV282Alignment
      && !config.upstreamProbesEnabled
      && !config.upstreamActionsEnabled,
  };
}

function collectProductionBlockers(
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV281Ready,
      code: "NODE_V281_REVIEW_NOT_READY",
      source: "node-v281-approval-required-implementation-readiness-review",
      message: "Node v281 approval-required implementation readiness review must be ready before v282 verifies upstream echoes.",
    },
    {
      condition: checks.javaV116EchoReady,
      code: "JAVA_V116_ECHO_NOT_READY",
      source: "java-v116-approval-required-implementation-readiness-echo",
      message: "Java v116 approval-required implementation readiness echo must be ready before v282.",
    },
    {
      condition: checks.miniKvV122ReceiptReady,
      code: "MINI_KV_V122_RECEIPT_NOT_READY",
      source: "mini-kv-v122-approval-required-implementation-readiness-non-participation-receipt",
      message: "mini-kv v122 non-participation receipt must be ready before v282.",
    },
    {
      condition: checks.boundaryCodesAligned,
      code: "BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Node v281, Java v116, and mini-kv v122 must agree on the six approval-required boundary codes.",
    },
    {
      condition: checks.requiredArtifactsAligned,
      code: "REQUIRED_ARTIFACT_IDS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "The eighteen required artifact ids must be echoed identically by all three projects.",
    },
    {
      condition: checks.credentialBoundaryClosed,
      code: "CREDENTIAL_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Credential value reads and storage must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryClosed,
      code: "RAW_ENDPOINT_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Raw endpoint parsing must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.resolverBoundaryClosed,
      code: "RESOLVER_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Resolver client and secret provider instantiation must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryClosed,
      code: "CONNECTION_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Managed audit connection and external request sending must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.writeBoundaryClosed,
      code: "WRITE_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Ledger writes, schema migration, load/restore/compact, and storage writes must remain blocked.",
    },
    {
      condition: checks.autoStartBoundaryClosed,
      code: "AUTO_START_BOUNDARY_OPENED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Automatic upstream start must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during Node v282 upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during Node v282 upstream echo verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "IMPLEMENTATION_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "v282 is still an echo verification; runtime implementation remains blocked until Node v283 exists.",
    },
    {
      code: "DASHBOARD_QUALITY_VERSION_PENDING",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "After v282, the next quality-only version should focus on dashboard.ts or another naturally large Node file, not on more credential resolver behavior.",
    },
  ];
}

function collectRecommendations(): ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "RUN_NODE_V283_PLAN_DRAFT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "After v282, draft Node v283 as the managed audit resolver implementation plan only.",
    },
    {
      code: "SCHEDULE_DASHBOARD_QUALITY_VERSION",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-implementation-readiness-upstream-echo-verification",
      message: "Once the upstream echo chain is archived, schedule a separate Node quality version for dashboard.ts rather than mixing it into the credential resolver flow.",
    },
  ];
}

function createSummary(
  sourceNodeV281: ApprovalRequiredImplementationReadinessNodeV281Reference,
  javaV116: JavaV116ApprovalRequiredImplementationReadinessEchoReference,
  miniKvV122: MiniKvV122ApprovalRequiredImplementationReadinessNonParticipationReference,
  checks: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationChecks,
  productionBlockers: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
  warnings: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
  recommendations: ApprovalRequiredImplementationReadinessUpstreamEchoVerificationMessage[],
) {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceFileCount:
      javaV116.evidenceFiles.filter((file) => file.exists).length
      + miniKvV122.evidenceFiles.filter((file) => file.exists).length,
    matchedSnippetCount:
      javaV116.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
      + miniKvV122.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
    boundaryCount: sourceNodeV281.boundaryCount,
    requiredArtifactCount: sourceNodeV281.requiredArtifactCount,
    sourceCheckCount: sourceNodeV281.checkCount,
    sourcePassedCheckCount: sourceNodeV281.passedCheckCount,
    javaProofClaimCount: javaV116.proofClaimCount,
    miniKvCheckCount: miniKvV122.checkCount,
    miniKvPassedCheckCount: miniKvV122.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function booleanRecord(input: Record<string, unknown>): Record<string, boolean | null> {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      typeof value === "boolean" ? value : null,
    ]),
  );
}
