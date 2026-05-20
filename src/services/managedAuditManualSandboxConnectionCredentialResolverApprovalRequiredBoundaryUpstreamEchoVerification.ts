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
  objectArrayField,
  objectField,
  readJsonObject,
  snippet,
  snippetMatched,
  stringArrayField,
  stringField,
} from "./historicalEvidenceReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";
import type {
  CredentialResolverPreImplementationBoundaryCode,
  CredentialResolverPreImplementationRequirementCode,
} from "./managedAuditManualSandboxConnectionCredentialResolverPreImplementationPlanIntakeTypes.js";
import type {
  CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
  CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage,
  JavaV115ApprovalRequiredBoundaryEchoReference,
  ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile,
  MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
  SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification";
const NODE_V274_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-candidate-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v274-post-disabled-candidate-echo-roadmap.md";

const JAVA_V115_RUNBOOK = "D:/javaproj/advanced-order-platform/c/115/解释/说明.md";
const JAVA_V115_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/118-version-115-credential-resolver-approval-required-boundary-echo-refinement.md";
const JAVA_V115_BUILDER =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoReceiptBuilder.java";
const JAVA_V115_SUPPORT =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoSupport.java";
const JAVA_V115_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/EchoRecords.java";
const JAVA_V115_DECISION_RECORDS =
  "D:/javaproj/advanced-order-platform/v115-snapshot/DecisionEchoRecords.java";
const JAVA_V115_EVIDENCE_SERVICE =
  "D:/javaproj/advanced-order-platform/v115-snapshot/OpsEvidenceService.java";

const MINI_KV_V121_RECEIPT =
  "D:/C/mini-kv/fixtures/release/credential-resolver-approval-required-boundary-non-participation-receipt.json";
const MINI_KV_V121_RUNBOOK = "D:/C/mini-kv/c/121/解释/说明.md";
const MINI_KV_V121_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/177-version-121-credential-resolver-approval-required-boundary-non-participation-receipt.md";
const MINI_KV_V121_RUNTIME_RECEIPT =
  "D:/C/mini-kv/src/runtime_credential_resolver_approval_boundary_receipts.cpp";

const APPROVAL_REQUIRED_BOUNDARY_CODES = [
  "CREDENTIAL_HANDLE",
  "ENDPOINT_HANDLE",
  "OPERATOR_APPROVAL",
  "ROLLBACK_BOUNDARY",
  "SCHEMA_MIGRATION_POLICY",
  "AUDIT_LEDGER_WRITE_POLICY",
] as const satisfies readonly CredentialResolverPreImplementationBoundaryCode[];

const APPROVAL_REQUIRED_REQUIREMENT_CODES = [
  "CREDENTIAL_HANDLE_BOUNDARY_MISSING",
  "ENDPOINT_HANDLE_BOUNDARY_MISSING",
  "OPERATOR_APPROVAL_BOUNDARY_MISSING",
  "ROLLBACK_BOUNDARY_MISSING",
  "SCHEMA_MIGRATION_POLICY_MISSING",
  "AUDIT_LEDGER_WRITE_POLICY_MISSING",
] as const satisfies readonly CredentialResolverPreImplementationRequirementCode[];

const PROHIBITED_ACTIONS_BY_BOUNDARY: Record<string, readonly string[]> = {
  CREDENTIAL_HANDLE: ["read-credential-value", "store-credential-value", "render-credential-value"],
  ENDPOINT_HANDLE: ["parse-raw-endpoint-url", "render-raw-endpoint-url", "connect-managed-audit"],
  OPERATOR_APPROVAL: ["execute-without-operator-marker", "auto-approve-operation", "auto-start-upstream"],
  ROLLBACK_BOUNDARY: ["execute-rollback", "deploy-resolver-without-abort-marker", "write-production-record"],
  SCHEMA_MIGRATION_POLICY: ["execute-schema-migration", "execute-sql", "mutate-managed-audit-schema"],
  AUDIT_LEDGER_WRITE_POLICY: ["write-approval-ledger", "write-managed-audit-state", "write-storage"],
};

export function loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationProfile {
  const sourceNodeV274 = createSourceNodeV274(input.config);
  const javaV115 = createJavaV115Reference();
  const miniKvV121 = createMiniKvV121Reference();
  const checks = createChecks(input.config, sourceNodeV274, javaV115, miniKvV121);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification
    ? "credential-resolver-approval-required-boundary-upstream-echo-verification-ready"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    verificationState,
    sourceNodeV274CandidateDigest: sourceNodeV274.candidateDigest,
    javaV115EchoMode: javaV115.echoMode,
    miniKvV121ReceiptDigest: miniKvV121.receiptDigest,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver approval-required boundary upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    approvalRequiredBoundaryEchoVerificationOnly: true,
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
    sourceNodeV274,
    upstreamEchoes: { javaV115, miniKvV121 },
    echoVerification: {
      verificationDigest,
      verificationMode: "java-v115-plus-mini-kv-v121-approval-required-boundary-upstream-echo-verification-only",
      sourceSpan: "Node v274 + Java v115 + mini-kv v121",
      sourceNodeV274Ready: checks.sourceNodeV274Ready,
      javaV115EchoReady: checks.javaV115EchoReady,
      miniKvV121NonParticipationReady: checks.miniKvV121NonParticipationReady,
      approvalRequiredBoundaryScopeAligned:
        checks.approvalRequiredBoundaryCountAligned
        && checks.approvalRequiredBoundaryCodesAligned
        && checks.approvalRequiredRequirementCodesAligned,
      approvalRequiredExplanationsAligned:
        checks.javaApprovalRequiredExplanationsComplete
        && checks.miniKvApprovalRequiredDetailsComplete,
      prohibitedRuntimeActionsAligned: checks.prohibitedRuntimeActionsAligned,
      credentialBoundaryAligned: checks.credentialBoundaryAligned,
      rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
      resolverBoundaryAligned: checks.resolverBoundaryAligned,
      connectionBoundaryAligned: checks.connectionBoundaryAligned,
      writeBoundaryAligned: checks.writeBoundaryAligned,
      autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
      javaEchoWorkflowTemplateApplied: checks.javaEchoWorkflowTemplateApplied,
      javaRecordsSplitApplied: checks.javaRecordsSplitApplied,
      nodeV275KeepsRealResolverBlocked: true,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV115.evidenceFiles.filter((file) => file.exists).length
        + miniKvV121.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV115.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV121.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      sourceCheckCount: sourceNodeV274.checkCount,
      sourcePassedCheckCount: sourceNodeV274.passedCheckCount,
      approvalRequiredBoundaryCount: APPROVAL_REQUIRED_BOUNDARY_CODES.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      approvalRequiredBoundaryUpstreamEchoVerificationJson: ROUTE_PATH,
      approvalRequiredBoundaryUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV274Json: NODE_V274_ROUTE,
      sourceNodeV274Markdown: `${NODE_V274_ROUTE}?format=markdown`,
      javaV115Runbook: JAVA_V115_RUNBOOK,
      javaV115Walkthrough: JAVA_V115_WALKTHROUGH,
      javaV115Builder: JAVA_V115_BUILDER,
      javaV115Support: JAVA_V115_SUPPORT,
      javaV115Records: JAVA_V115_RECORDS,
      miniKvV121Receipt: MINI_KV_V121_RECEIPT,
      miniKvV121Runbook: MINI_KV_V121_RUNBOOK,
      miniKvV121Walkthrough: MINI_KV_V121_WALKTHROUGH,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Archive Node v275 under d/275 with screenshot, explanation, and route evidence.",
      "Write the code walkthrough under the current walkthrough sibling directory instead of the crowded historical folder.",
      "After v275, advance to Node v276 statusRoutes split quality pass only if no new Java or mini-kv dependency appears.",
      "Keep the real credential resolver, credential values, raw endpoint URL parsing, external requests, schema migration, ledger writes, and upstream auto-start blocked.",
    ],
  };
}

function createSourceNodeV274(config: AppConfig): SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference {
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

function createJavaV115Reference(): JavaV115ApprovalRequiredBoundaryEchoReference {
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

function createMiniKvV121Reference(): MiniKvV121ApprovalRequiredBoundaryNonParticipationReference {
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
  const root = readJsonObject(MINI_KV_V121_RECEIPT);
  const receipt = objectField(root, "credential_resolver_approval_required_boundary_non_participation_receipt");
  const sourceVerification = objectField(receipt, "source_node_v274_verification");
  const approvalRequiredBoundaries = objectField(receipt, "approval_required_boundaries");
  const details = objectArrayField(approvalRequiredBoundaries, "details").map((detail) => ({
    code: stringField(detail, "code") ?? "",
    owner: stringField(detail, "owner") ?? "",
    reason: stringField(detail, "reason") ?? "",
    mini_kv_position: stringField(detail, "mini_kv_position") ?? "",
    prohibited_runtime_actions: stringArrayField(detail, "prohibited_runtime_actions"),
    read_only: booleanField(detail, "read_only") === true,
    approval_required: booleanField(detail, "approval_required") === true,
    mini_kv_participates: booleanField(detail, "mini_kv_participates") === true,
  }));
  const checks = objectField(receipt, "checks");
  const sourceNodeV274Checks = objectField(receipt, "source_node_v274_checks");
  const reference: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference = {
    sourceVersion: "mini-kv v121",
    tagLabel: "第一百二十一版审批边界非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((snippetMatch) => snippetMatch.matched),
    receiptVersion: stringField(root, "receipt_version"),
    releaseVersion: stringField(root, "release_version"),
    consumerHint: stringField(root, "consumer_hint"),
    receiptDigest: stringField(receipt, "receipt_digest"),
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
    sourceNodeV274CheckCount: numberField(sourceVerification, "check_count"),
    sourceNodeV274PassedCheckCount: numberField(sourceVerification, "passed_check_count"),
    sourceCandidateDecisionCount: numberField(sourceVerification, "candidate_decision_count"),
    sourceCandidateReadyDecisionCount: numberField(sourceVerification, "candidate_ready_decision_count"),
    sourceApprovalRequiredDecisionCount: numberField(sourceVerification, "approval_required_decision_count"),
    sourceApprovalRequiredBoundaryCodes: stringArrayField(sourceVerification, "approval_required_boundary_codes"),
    sourceCandidateDigest: stringField(sourceVerification, "candidate_digest"),
    approvalRequiredBoundaryCount: numberField(approvalRequiredBoundaries, "boundary_count"),
    approvalRequiredBoundaryCodes: stringArrayField(approvalRequiredBoundaries, "boundary_codes"),
    approvalRequiredBoundaryDetails: details,
    checks: booleanRecord(checks),
    sourceNodeV274Checks: booleanRecord(sourceNodeV274Checks),
    checkCount: numberField(objectField(receipt, "summary"), "check_count"),
    passedCheckCount: numberField(objectField(receipt, "summary"), "passed_check_count"),
    sourceCheckCount: numberField(objectField(receipt, "summary"), "source_check_count"),
    sourcePassedCheckCount: numberField(objectField(receipt, "summary"), "source_passed_check_count"),
    productionBlockerCount: numberField(objectField(receipt, "summary"), "production_blocker_count"),
    warningCount: numberField(objectField(receipt, "summary"), "warning_count"),
    recommendationCount: numberField(objectField(receipt, "summary"), "recommendation_count"),
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
    readyForNodeV275Alignment: false,
  };
  reference.readyForNodeV275Alignment =
    reference.evidencePresent
    && reference.verificationDocumented
    && reference.releaseVersion === "v121"
    && reference.consumerHint === "Node v275 credential resolver approval-required boundary upstream echo verification"
    && reference.readyForApprovalRequiredBoundaryUpstreamEcho === true;

  return reference;
}

function createChecks(
  config: AppConfig,
  sourceNodeV274: SourceNodeV274DisabledCandidateUpstreamEchoVerificationReference,
  javaV115: JavaV115ApprovalRequiredBoundaryEchoReference,
  miniKvV121: MiniKvV121ApprovalRequiredBoundaryNonParticipationReference,
): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks {
  return {
    sourceNodeV274Ready:
      sourceNodeV274.verificationState === "credential-resolver-disabled-candidate-upstream-echo-verification-ready"
      && sourceNodeV274.readyForDisabledCandidateUpstreamEchoVerification
      && sourceNodeV274.sourceNodeV273Ready
      && sourceNodeV274.javaV113EchoReady
      && sourceNodeV274.miniKvV120NonParticipationReady,
    sourceNodeV274KeepsReadOnlyEchoOnly:
      sourceNodeV274.readOnlyUpstreamEchoVerification
      && sourceNodeV274.disabledCandidateEchoVerificationOnly,
    sourceNodeV274KeepsRealResolverBlocked:
      !sourceNodeV274.realResolverImplementationAllowed
      && !sourceNodeV274.connectsManagedAudit
      && !sourceNodeV274.externalRequestSent
      && !sourceNodeV274.resolverClientInstantiated
      && !sourceNodeV274.secretProviderInstantiated,
    sourceNodeV274KeepsBoundaryAlignment:
      sourceNodeV274.candidateDecisionCount === 10
      && sourceNodeV274.candidateReadyDecisionCount === 4
      && sourceNodeV274.approvalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && sourceNodeV274.candidateCountsAligned
      && sourceNodeV274.approvalRequiredBoundaryCodesAligned,
    javaV115EchoReady: javaV115.readyForNodeV275Alignment,
    miniKvV121NonParticipationReady: miniKvV121.readyForNodeV275Alignment,
    approvalRequiredBoundaryCountAligned:
      javaV115.approvalRequiredBoundaryExplanationCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && miniKvV121.approvalRequiredBoundaryCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && miniKvV121.sourceApprovalRequiredDecisionCount === APPROVAL_REQUIRED_BOUNDARY_CODES.length,
    approvalRequiredBoundaryCodesAligned:
      arrayEquals(sourceNodeV274.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
      && arrayEquals(javaV115.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
      && arrayEquals(miniKvV121.approvalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES])
      && arrayEquals(miniKvV121.sourceApprovalRequiredBoundaryCodes, [...APPROVAL_REQUIRED_BOUNDARY_CODES]),
    approvalRequiredRequirementCodesAligned:
      arrayEquals(sourceNodeV274.approvalRequiredRequirementCodes, [...APPROVAL_REQUIRED_REQUIREMENT_CODES])
      && arrayEquals(javaV115.approvalRequiredRequirementCodes, [...APPROVAL_REQUIRED_REQUIREMENT_CODES]),
    javaApprovalRequiredExplanationsComplete:
      javaV115.approvalRequiredBoundaryExplanationsEchoed
      && javaV115.evidenceAllowedMode === "approval-required-read-only-evidence"
      && javaV115.proofClaimPresent
      && javaV115.nodeVerificationActionPresent,
    miniKvApprovalRequiredDetailsComplete:
      miniKvV121.approvalRequiredBoundaryDetails.length === APPROVAL_REQUIRED_BOUNDARY_CODES.length
      && miniKvV121.approvalRequiredBoundaryDetails.every((detail) =>
        detail.read_only
        && detail.approval_required
        && !detail.mini_kv_participates
        && APPROVAL_REQUIRED_BOUNDARY_CODES.some((code) => code === detail.code)),
    prohibitedRuntimeActionsAligned:
      APPROVAL_REQUIRED_BOUNDARY_CODES.every((code) => {
        const detail = miniKvV121.approvalRequiredBoundaryDetails.find((candidate) => candidate.code === code);
        return detail !== undefined && arrayEquals(detail.prohibited_runtime_actions, [
          ...PROHIBITED_ACTIONS_BY_BOUNDARY[code],
        ]);
      }),
    credentialBoundaryAligned:
      !sourceNodeV274.credentialValueRead
      && !sourceNodeV274.readsManagedAuditCredential
      && !sourceNodeV274.storesManagedAuditCredential
      && !javaV115.credentialValueReadAllowed
      && miniKvV121.sourceCredentialValueRead === false
      && miniKvV121.credentialValueReadAllowed === false
      && miniKvV121.credentialValueLoaded === false
      && miniKvV121.credentialValueStored === false
      && miniKvV121.credentialValueIncluded === false,
    rawEndpointBoundaryAligned:
      !sourceNodeV274.rawEndpointUrlParsed
      && !javaV115.rawEndpointUrlParseAllowed
      && miniKvV121.sourceRawEndpointUrlParsed === false
      && miniKvV121.rawEndpointUrlParseAllowed === false
      && miniKvV121.rawEndpointUrlParsed === false
      && miniKvV121.rawEndpointUrlIncluded === false,
    resolverBoundaryAligned:
      !sourceNodeV274.resolverClientInstantiated
      && !sourceNodeV274.secretProviderInstantiated
      && miniKvV121.credentialResolverImplemented === false
      && miniKvV121.credentialResolverInvoked === false
      && miniKvV121.resolverClientInstantiated === false
      && miniKvV121.secretProviderInstantiated === false
      && miniKvV121.secretProviderRuntimeAllowed === false,
    connectionBoundaryAligned:
      !sourceNodeV274.connectsManagedAudit
      && !sourceNodeV274.externalRequestSent
      && !javaV115.managedAuditConnectionAllowed
      && miniKvV121.sourceConnectsManagedAudit === false
      && miniKvV121.externalRequestAllowed === false
      && miniKvV121.externalRequestSent === false
      && miniKvV121.connectsManagedAudit === false
      && miniKvV121.readyForManagedAuditSandboxAdapterConnection === false,
    writeBoundaryAligned:
      !sourceNodeV274.executionAllowed
      && !sourceNodeV274.schemaMigrationExecuted
      && !sourceNodeV274.approvalLedgerWritten
      && !javaV115.approvalLedgerWriteAllowed
      && !javaV115.sqlExecutionAllowed
      && !javaV115.rollbackExecutionAllowed
      && !javaV115.approvalLedgerWritten
      && !javaV115.sqlExecuted
      && !javaV115.schemaMigrationExecuted
      && miniKvV121.executionAllowed === false
      && miniKvV121.storageWriteAllowed === false
      && miniKvV121.writeCommandsExecuted === false
      && miniKvV121.adminCommandsExecuted === false
      && miniKvV121.runtimeWriteObserved === false
      && miniKvV121.approvalLedgerWriteAllowed === false
      && miniKvV121.approvalLedgerWritten === false
      && miniKvV121.managedAuditWriteExecuted === false
      && miniKvV121.schemaMigrationAllowed === false
      && miniKvV121.schemaMigrationExecuted === false
      && miniKvV121.restoreExecutionAllowed === false
      && miniKvV121.loadRestoreCompactExecuted === false
      && miniKvV121.setnxexExecutionAllowed === false
      && miniKvV121.managedAuditStorageBackend === false
      && miniKvV121.auditAuthoritative === false
      && miniKvV121.orderAuthoritative === false,
    autoStartBoundaryAligned:
      !sourceNodeV274.automaticUpstreamStart
      && !javaV115.automaticUpstreamStartAllowed
      && miniKvV121.sourceAutomaticUpstreamStart === false
      && miniKvV121.automaticUpstreamStartAllowed === false
      && miniKvV121.automaticUpstreamStart === false,
    javaEchoWorkflowTemplateApplied: javaV115.echoWorkflowTemplateApplied,
    javaRecordsSplitApplied: javaV115.recordsSplitApplied,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    realResolverImplementationStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationChecks,
): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV274Ready,
      code: "SOURCE_NODE_V274_NOT_READY",
      source: "node-v274-credential-resolver-disabled-candidate-upstream-echo-verification",
      message: "Node v274 disabled candidate upstream echo verification must be ready before v275 verifies approval-required boundaries.",
    },
    {
      condition: checks.javaV115EchoReady,
      code: "JAVA_V115_ECHO_NOT_READY",
      source: "java-v115-credential-resolver-approval-required-boundary-echo-refinement",
      message: "Java v115 must echo the six approval-required boundary explanations before v275 can proceed.",
    },
    {
      condition: checks.miniKvV121NonParticipationReady,
      code: "MINI_KV_V121_RECEIPT_NOT_READY",
      source: "mini-kv-v121-credential-resolver-approval-required-boundary-non-participation-receipt",
      message: "mini-kv v121 must prove approval-required boundary non-participation before v275 can proceed.",
    },
    {
      condition: checks.approvalRequiredBoundaryCodesAligned,
      code: "APPROVAL_REQUIRED_BOUNDARY_CODES_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Node v274, Java v115, and mini-kv v121 must agree on the six approval-required boundary codes.",
    },
    {
      condition: checks.javaApprovalRequiredExplanationsComplete && checks.miniKvApprovalRequiredDetailsComplete,
      code: "APPROVAL_REQUIRED_EXPLANATIONS_NOT_COMPLETE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Java explanations and mini-kv non-participation details must both be complete and read-only.",
    },
    {
      condition: checks.prohibitedRuntimeActionsAligned,
      code: "PROHIBITED_RUNTIME_ACTIONS_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "The prohibited runtime actions for the six approval-required boundaries must align.",
    },
    {
      condition: checks.credentialBoundaryAligned,
      code: "CREDENTIAL_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Credential value reads, loads, stores, and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.rawEndpointBoundaryAligned,
      code: "RAW_ENDPOINT_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Raw endpoint parsing and rendering must remain false across Node, Java, and mini-kv.",
    },
    {
      condition: checks.connectionBoundaryAligned,
      code: "CONNECTION_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Managed audit connections and external requests must remain closed.",
    },
    {
      condition: checks.writeBoundaryAligned,
      code: "WRITE_BOUNDARY_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "SQL, approval ledger, schema migration, storage write, restore, and SETNXEX boundaries must remain closed.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false for v275 approval-required boundary upstream echo verification.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v275 approval-required boundary upstream echo verification.",
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

function collectWarnings(): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "APPROVAL_REQUIRED_ECHO_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Node v275 verifies Java v115 and mini-kv v121 explanations; it does not approve or implement a real credential resolver.",
    },
    {
      code: "REAL_RESOLVER_STILL_BLOCKED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Credential values, raw endpoint URLs, external requests, schema migration, ledger writes, and upstream auto-start remain blocked.",
    },
  ];
}

function collectRecommendations(): CredentialResolverApprovalRequiredBoundaryUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_V275_UNDER_NEW_DOCUMENT_DIRECTORIES",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "Archive v275 under d/ and the new code walkthrough sibling directory because the old documentation folders are crowded.",
    },
    {
      code: "CONTINUE_WITH_NODE_V276_STATUS_ROUTES_QUALITY_PASS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-approval-required-boundary-upstream-echo-verification",
      message: "If no new upstream dependency appears, continue with the planned statusRoutes split quality pass rather than opening a real resolver.",
    },
  ];
}

function booleanRecord(record: Record<string, unknown>): Record<string, boolean | null> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, typeof value === "boolean" ? value : null]),
  );
}

function arrayEquals(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
