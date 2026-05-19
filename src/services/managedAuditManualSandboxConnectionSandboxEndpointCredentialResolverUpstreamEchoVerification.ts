import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { parseJsonEvidence } from "./jsonEvidenceUtils.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";
import type {
  CredentialResolverUpstreamEchoVerificationChecks,
  CredentialResolverUpstreamEchoVerificationMessage,
  JavaV105CredentialResolverDecisionEchoMarkerReference,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile,
  MiniKvV114CredentialResolverNonParticipationReference,
  SourceNodeV260CredentialResolverDecisionRecordReference,
  VerificationEvidenceFile,
  VerificationSnippetMatch,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification";
const NODE_V260_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record";
const ACTIVE_PLAN = "docs/plans/v260-post-credential-resolver-decision-roadmap.md";

const JAVA_V105_RUNBOOK = "D:/javaproj/advanced-order-platform/c/105/解释/说明.md";
const JAVA_V105_WALKTHROUGH =
  "D:/javaproj/advanced-order-platform/代码讲解记录_生产雏形阶段/108-version-105-sandbox-endpoint-credential-resolver-decision-echo-marker.md";
const JAVA_V105_BUILDER =
  "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverDecisionEchoMarkerBuilder.java";

const MINI_KV_V114_RECEIPT = "D:/C/mini-kv/fixtures/release/credential-resolver-non-participation-receipt.json";
const MINI_KV_V114_RUNBOOK = "D:/C/mini-kv/c/114/解释/说明.md";
const MINI_KV_V114_WALKTHROUGH =
  "D:/C/mini-kv/代码讲解记录_生产雏形阶段/170-version-114-credential-resolver-non-participation-receipt.md";

const REQUIRED_DECISION_FIELD_IDS = [
  "endpoint-handle",
  "credential-handle",
  "resolver-policy-handle",
  "approval-marker",
  "operator-identity",
  "approval-correlation",
  "redaction-policy",
  "fallback-rotation-plan",
] as const;

const EXPLICIT_NO_GO_CONDITION_CODES = [
  "CREDENTIAL_VALUE_REQUIRED",
  "RAW_ENDPOINT_URL_REQUIRED",
  "REAL_CONNECTION_REQUIRED",
  "EXTERNAL_REQUEST_REQUIRED",
  "SCHEMA_MIGRATION_REQUIRED",
  "UPSTREAM_WRITE_REQUIRED",
  "AUTO_START_REQUIRED",
  "MINI_KV_BACKEND_REQUIRED",
  "PRODUCTION_WINDOW_REQUIRED",
] as const;

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationProfile {
  const sourceNodeV260 = createSourceNodeV260(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({ config: input.config }),
  );
  const javaV105 = createJavaV105Reference();
  const miniKvV114 = createMiniKvV114Reference();
  const checks = createChecks(input.config, sourceNodeV260, javaV105, miniKvV114);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification =
    Object.entries(checks)
      .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification")
      .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification
    ? "sandbox-endpoint-credential-resolver-upstream-echo-verification-ready"
    : "blocked";
  const echoVerification = {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      verificationState,
      sourceDecisionDigest: sourceNodeV260.decisionDigest,
      javaV105Ready: javaV105.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
      miniKvV114ReceiptDigest: miniKvV114.receiptDigest,
      checks,
    }),
    verificationMode: "java-v105-plus-mini-kv-v114-credential-resolver-upstream-echo-verification-only" as const,
    sourceSpan: "Node v260 + Java v105 + mini-kv v114" as const,
    decisionRecordAligned: checks.decisionRecordAligned,
    requiredDecisionFieldsAligned: checks.requiredDecisionFieldsAligned,
    explicitNoGoConditionsAligned: checks.explicitNoGoConditionsAligned,
    resolverPolicyAligned: checks.resolverPolicyAligned,
    approvalMarkerAligned: checks.approvalMarkerAligned,
    operatorIdentityAligned: checks.operatorIdentityAligned,
    approvalCorrelationAligned: checks.approvalCorrelationAligned,
    redactionAndFallbackAligned: checks.redactionAndFallbackAligned,
    credentialBoundaryAligned: checks.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: checks.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: checks.connectionBoundaryAligned,
    writeBoundaryAligned: checks.writeBoundaryAligned,
    autoStartBoundaryAligned: checks.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: checks.miniKvV114NonParticipationReady,
    nodeV261BlocksCredentialResolution: true as const,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver upstream echo verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    verificationState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: true,
    credentialResolverExecutionAllowed: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueLoaded: false,
    credentialValueStored: false,
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV260,
    upstreamEchoes: { javaV105, miniKvV114 },
    echoVerification,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      evidenceFileCount:
        javaV105.evidenceFiles.filter((file) => file.exists).length
        + miniKvV114.evidenceFiles.filter((file) => file.exists).length,
      matchedSnippetCount:
        javaV105.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length
        + miniKvV114.expectedSnippets.filter((snippetMatch) => snippetMatch.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverUpstreamEchoVerificationJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV260Json: NODE_V260_ROUTE,
      javaV105Runbook: JAVA_V105_RUNBOOK,
      miniKvV114Receipt: MINI_KV_V114_RECEIPT,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v261 as the last upstream echo gate before designing the disabled credential resolver precheck.",
      "Do not treat Java v105 or mini-kv v114 as permission to resolve credentials, parse raw endpoint URLs, or open managed audit connections.",
      "Keep Java v105 and mini-kv v114 evidence in historical fallback so GitHub CI can verify this profile without sibling workspaces.",
    ],
  };
}

function createSourceNodeV260(
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

function createJavaV105Reference(): JavaV105CredentialResolverDecisionEchoMarkerReference {
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

function createMiniKvV114Reference(): MiniKvV114CredentialResolverNonParticipationReference {
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

function createChecks(
  config: AppConfig,
  sourceNodeV260: SourceNodeV260CredentialResolverDecisionRecordReference,
  javaV105: JavaV105CredentialResolverDecisionEchoMarkerReference,
  miniKvV114: MiniKvV114CredentialResolverNonParticipationReference,
): CredentialResolverUpstreamEchoVerificationChecks {
  return {
    sourceNodeV260Ready: sourceNodeV260.readyForNodeV261CredentialResolverUpstreamEchoVerification,
    javaV105EchoReady: javaV105.readyForNodeV261SandboxEndpointCredentialResolverUpstreamEchoVerification,
    miniKvV114NonParticipationReady: miniKvV114.readyForNodeV261Alignment,
    decisionRecordAligned:
      sourceNodeV260.recordMode === "sandbox-endpoint-credential-resolver-decision-record-only"
      && miniKvV114.sourceRecordMode === sourceNodeV260.recordMode
      && miniKvV114.sourceDecisionScope === sourceNodeV260.decisionScope
      && miniKvV114.sourceDecisionStatus === sourceNodeV260.decisionStatus
      && javaV105.consumedNodeProfile === sourceNodeV260.profileVersion,
    requiredDecisionFieldsAligned:
      arraysEqual(sourceNodeV260.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS])
      && sourceNodeV260.requiredDecisionFieldCount === 8
      && javaV105.requiredDecisionFieldCount === 8
      && miniKvV114.requiredDecisionFieldCount === 8
      && arraysEqual(miniKvV114.requiredDecisionFieldIds, [...REQUIRED_DECISION_FIELD_IDS]),
    explicitNoGoConditionsAligned:
      arraysEqual(sourceNodeV260.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES])
      && sourceNodeV260.explicitNoGoConditionCount === 9
      && javaV105.explicitNoGoConditionCount === 9
      && miniKvV114.explicitNoGoConditionCount === 9
      && arraysEqual(miniKvV114.explicitNoGoConditionCodes, [...EXPLICIT_NO_GO_CONDITION_CODES]),
    resolverPolicyAligned:
      sourceNodeV260.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE"
      && javaV105.resolverPolicyHandle === sourceNodeV260.resolverPolicyHandle
      && miniKvV114.resolverPolicyHandle === sourceNodeV260.resolverPolicyHandle
      && sourceNodeV260.resolverMode === "policy-record-only-no-value-read"
      && javaV105.resolverMode === sourceNodeV260.resolverMode
      && miniKvV114.resolverMode === sourceNodeV260.resolverMode
      && sourceNodeV260.resolverCandidateImplementation === "not-implemented"
      && javaV105.resolverCandidateImplementation === sourceNodeV260.resolverCandidateImplementation
      && miniKvV114.resolverCandidateImplementation === sourceNodeV260.resolverCandidateImplementation,
    approvalMarkerAligned:
      sourceNodeV260.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER"
      && javaV105.approvalMarker === sourceNodeV260.approvalMarker
      && miniKvV114.approvalMarker === sourceNodeV260.approvalMarker,
    operatorIdentityAligned:
      sourceNodeV260.operatorIdentityRequired
      && miniKvV114.operatorIdentityRequired
      && sourceNodeV260.requiredDecisionFieldIds.includes("operator-identity")
      && miniKvV114.requiredDecisionFieldIds.includes("operator-identity"),
    approvalCorrelationAligned:
      sourceNodeV260.approvalCorrelationRequired
      && miniKvV114.approvalCorrelationRequired
      && sourceNodeV260.requiredDecisionFieldIds.includes("approval-correlation")
      && miniKvV114.requiredDecisionFieldIds.includes("approval-correlation"),
    redactionAndFallbackAligned:
      sourceNodeV260.requiredDecisionFieldIds.includes("redaction-policy")
      && sourceNodeV260.requiredDecisionFieldIds.includes("fallback-rotation-plan")
      && miniKvV114.requiredDecisionFieldIds.includes("redaction-policy")
      && miniKvV114.requiredDecisionFieldIds.includes("fallback-rotation-plan"),
    credentialBoundaryAligned:
      !sourceNodeV260.credentialValueMayBeRead
      && !sourceNodeV260.credentialValueMayBeLoaded
      && !sourceNodeV260.credentialValueMayBeStored
      && !javaV105.credentialValueMayBeRead
      && !javaV105.credentialValueRead
      && !miniKvV114.sourceCredentialValueRead
      && !miniKvV114.sourceCredentialValueLoaded
      && !miniKvV114.sourceCredentialValueIncluded
      && !miniKvV114.credentialValueRequired
      && !miniKvV114.credentialValueReadAllowed
      && !miniKvV114.credentialValueLoaded
      && !miniKvV114.credentialValueStored
      && !miniKvV114.credentialValueIncluded,
    rawEndpointBoundaryAligned:
      !sourceNodeV260.rawEndpointUrlMayBeParsed
      && !javaV105.rawEndpointUrlMayBeParsed
      && !javaV105.rawEndpointUrlParsed
      && !miniKvV114.sourceRawEndpointUrlParsed
      && !miniKvV114.sourceRawEndpointUrlIncluded
      && !miniKvV114.rawEndpointUrlParsed
      && !miniKvV114.rawEndpointUrlIncluded,
    connectionBoundaryAligned:
      !sourceNodeV260.managedAuditConnectionMayOpen
      && !sourceNodeV260.externalRequestMayBeSent
      && !javaV105.connectsManagedAudit
      && !javaV105.externalRequestMayBeSent
      && !javaV105.externalRequestSent
      && !miniKvV114.sourceConnectsManagedAudit
      && !miniKvV114.sourceExternalRequestSent
      && !miniKvV114.connectionExecutionAllowed
      && !miniKvV114.externalRequestSent
      && !miniKvV114.credentialResolverImplemented
      && !miniKvV114.credentialResolverInvoked
      && !miniKvV114.secretProviderInstantiated,
    writeBoundaryAligned:
      !sourceNodeV260.schemaMigrationMayExecute
      && !sourceNodeV260.approvalLedgerMayBeWritten
      && !javaV105.schemaMigrationMayExecute
      && !javaV105.approvalLedgerMayBeWritten
      && !miniKvV114.sourceSchemaMigrationExecuted
      && !miniKvV114.schemaRehearsalExecutionAllowed
      && !miniKvV114.schemaMigrationExecutionAllowed
      && !miniKvV114.storageWriteAllowed
      && !miniKvV114.managedAuditWriteExecuted
      && !miniKvV114.approvalLedgerWriteAllowed
      && !miniKvV114.approvalLedgerWriteExecuted
      && !miniKvV114.sandboxManagedAuditStateWriteAllowed
      && !miniKvV114.restoreExecutionAllowed
      && !miniKvV114.loadRestoreCompactExecuted
      && !miniKvV114.setnxexExecutionAllowed
      && !miniKvV114.managedAuditStorageBackend
      && !miniKvV114.sandboxAuditStorageBackend
      && !miniKvV114.orderAuthoritative,
    autoStartBoundaryAligned:
      !sourceNodeV260.nodeMayStartJavaOrMiniKv
      && !javaV105.javaStarted
      && !javaV105.miniKvStarted
      && !miniKvV114.sourceAutomaticUpstreamStart
      && !miniKvV114.nodeAutoStartAllowed
      && !miniKvV114.javaAutoStartAllowed
      && !miniKvV114.miniKvAutoStartAllowed
      && !miniKvV114.externalAuditServiceAutoStartAllowed,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverUpstreamEchoVerificationChecks,
): CredentialResolverUpstreamEchoVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverUpstreamEchoVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV260Ready,
      code: "NODE_V260_DECISION_RECORD_NOT_READY",
      source: "node-v260-sandbox-endpoint-credential-resolver-decision-record",
      message: "Node v260 must be ready and keep the credential resolver policy-only before v261.",
    },
    {
      condition: checks.javaV105EchoReady,
      code: "JAVA_V105_CREDENTIAL_RESOLVER_ECHO_NOT_READY",
      source: "java-v105-sandbox-endpoint-credential-resolver-decision-echo-marker",
      message: "Java v105 must expose the credential resolver decision echo marker before Node v261.",
    },
    {
      condition: checks.miniKvV114NonParticipationReady,
      code: "MINI_KV_V114_CREDENTIAL_RESOLVER_NON_PARTICIPATION_NOT_READY",
      source: "mini-kv-v114-credential-resolver-non-participation-receipt",
      message: "mini-kv v114 must prove no credential resolver, no secret provider, no storage backend, no writes, and no auto-start.",
    },
    {
      condition:
        checks.decisionRecordAligned
        && checks.requiredDecisionFieldsAligned
        && checks.explicitNoGoConditionsAligned
        && checks.resolverPolicyAligned
        && checks.approvalMarkerAligned
        && checks.operatorIdentityAligned
        && checks.approvalCorrelationAligned
        && checks.redactionAndFallbackAligned,
      code: "CREDENTIAL_RESOLVER_DECISION_ECHO_NOT_ALIGNED",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Node v260, Java v105, and mini-kv v114 must align on resolver policy, approval marker, operator/correlation, decision fields, and no-go conditions.",
    },
    {
      condition:
        checks.credentialBoundaryAligned
        && checks.rawEndpointBoundaryAligned
        && checks.connectionBoundaryAligned
        && checks.writeBoundaryAligned
        && checks.autoStartBoundaryAligned,
      code: "CREDENTIAL_RESOLVER_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Credential, raw endpoint, connection, write, resolver invocation, storage backend, and auto-start boundaries must remain closed.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v261 credential resolver upstream echo verification.",
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

function collectWarnings(): CredentialResolverUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "UPSTREAM_ECHO_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "v261 verifies read-only upstream evidence only; it does not implement or invoke a credential resolver.",
    },
    {
      code: "DISABLED_PRECHECK_STILL_NEXT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "The next Node step is a disabled resolver precheck, not a real secret provider or external endpoint request.",
    },
  ];
}

function collectRecommendations(): CredentialResolverUpstreamEchoVerificationMessage[] {
  return [
    {
      code: "WRITE_V262_DISABLED_PRECHECK_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Use v262 to define disabled resolver env handles, opt-in gate, failure taxonomy, and dry-run response shape.",
    },
    {
      code: "KEEP_CREDENTIAL_RESOLUTION_CLOSED",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-upstream-echo-verification",
      message: "Do not read credential values, parse raw endpoint URLs, instantiate secret providers, or open managed audit connections.",
    },
  ];
}

function evidenceFile(id: string, filePath: string): VerificationEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, resolvedPath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readHistoricalEvidenceFile(filePath);
  return {
    id,
    path: filePath,
    resolvedPath,
    exists: true,
    sizeBytes: statHistoricalEvidence(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, filePath: string, expectedText: string): VerificationSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  const content = historicalEvidenceExists(filePath) ? readHistoricalEvidenceFile(filePath, "utf8") : "";
  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed = parseJsonEvidence(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

function objectArrayField(input: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function stringArrayField(input: Record<string, unknown>, key: string): string[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter(isNonNullString) : [];
}

function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonNullString(value: unknown): value is string {
  return typeof value === "string";
}

function snippetMatched(snippets: VerificationSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
