import { readV114Fields } from "../evidence/miniKvReceiptFields.js";
import { isV114Ready } from "../evidence/miniKvReceiptReadiness.js";
import {
  evidenceFile,
  readJsonObject,
  snippet,
  snippetMatched,
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
  const reference: MiniKvV114CredentialResolverNonParticipationReference = {
    sourceVersion: "mini-kv v114",
    tagLabel: "第一百一十四版凭证解析器非参与回执",
    evidenceFiles,
    expectedSnippets,
    evidencePresent: evidenceFiles.every((file) => file.exists),
    verificationDocumented: expectedSnippets.every((match) => match.matched),
    ...readV114Fields(readJsonObject(MINI_KV_V114_RECEIPT)),
    readyForNodeV261Alignment: false,
  };
  return { ...reference, readyForNodeV261Alignment: isV114Ready(reference) };
}

export function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}
