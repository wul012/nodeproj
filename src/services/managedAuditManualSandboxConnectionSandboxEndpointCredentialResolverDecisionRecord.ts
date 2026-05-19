import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationTypes.js";
import type {
  CredentialResolverDecisionField,
  CredentialResolverNoGoCondition,
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile,
  SandboxEndpointCredentialResolverDecisionRecord,
  SandboxEndpointCredentialResolverDecisionRecordChecks,
  SandboxEndpointCredentialResolverDecisionRecordMessage,
  SourceNodeV259SandboxEndpointHandleUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record";
const NODE_V259_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md";

export function loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordProfile {
  const sourceNodeV259 = createSourceNodeV259(
    loadManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification({ config: input.config }),
  );
  const decisionRecord = createDecisionRecord();
  const checks = createChecks(input.config, sourceNodeV259, decisionRecord);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord")
    .every(([, value]) => value);
  const decisionState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord
    ? "sandbox-endpoint-credential-resolver-decision-record-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint credential resolver decision record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    decisionState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord,
    readOnlyDecisionRecord: true,
    credentialResolverDecisionOnly: true,
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
    credentialValueIncluded: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    externalRequestSent: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV259,
    decisionRecord,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredDecisionFieldCount: decisionRecord.requiredDecisionFieldCount,
      explicitNoGoConditionCount: decisionRecord.explicitNoGoConditionCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointCredentialResolverDecisionRecordJson: ROUTE_PATH,
      sandboxEndpointCredentialResolverDecisionRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV259Json: NODE_V259_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Use Node v260 as a human decision envelope before any credential resolver rehearsal is designed.",
      "Keep the resolver limited to handles and policy markers; do not load, parse, log, or store credential values.",
      "After v260, start a new plan for Java and mini-kv read-only echo receipts before Node designs a disabled resolver precheck.",
    ],
  };
}

function createSourceNodeV259(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerificationProfile,
): SourceNodeV259SandboxEndpointHandleUpstreamEchoVerificationReference {
  const reference = {
    sourceVersion: "Node v259" as const,
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    endpointHandleAligned: source.echoVerification.endpointHandleAligned,
    credentialHandleAligned: source.echoVerification.credentialHandleAligned,
    reviewCountsAligned: source.echoVerification.reviewCountsAligned,
    policyReviewsAligned: source.echoVerification.policyReviewsAligned,
    operatorWindowAligned: source.echoVerification.operatorWindowAligned,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    miniKvNonParticipationAligned: source.echoVerification.miniKvNonParticipationAligned,
    nodeV259BlocksRealConnection: source.echoVerification.nodeV259BlocksRealConnection,
    evidenceFileCount: source.summary.evidenceFileCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    warningCount: source.summary.warningCount,
    recommendationCount: source.summary.recommendationCount,
    sourceNodeV258Ready: source.sourceNodeV258.readyForNodeV259UpstreamEchoVerification,
    javaV104Ready: source.upstreamEchoes.javaV104.readyForNodeV259SandboxEndpointHandleUpstreamEchoVerification,
    miniKvV113Ready: source.upstreamEchoes.miniKvV113.readyForNodeV259Alignment,
    readyForNodeV260CredentialResolverDecisionRecord: false,
  };

  return {
    ...reference,
    readyForNodeV260CredentialResolverDecisionRecord:
      reference.readyForUpstreamEchoVerification
      && reference.verificationState === "sandbox-endpoint-handle-upstream-echo-verification-ready"
      && reference.sourceSpan === "Node v258 + Java v104 + mini-kv v113"
      && reference.endpointHandleAligned
      && reference.credentialHandleAligned
      && reference.reviewCountsAligned
      && reference.policyReviewsAligned
      && reference.operatorWindowAligned
      && reference.credentialBoundaryAligned
      && reference.rawEndpointBoundaryAligned
      && reference.connectionBoundaryAligned
      && reference.writeBoundaryAligned
      && reference.autoStartBoundaryAligned
      && reference.miniKvNonParticipationAligned
      && reference.nodeV259BlocksRealConnection
      && reference.evidenceFileCount === 6
      && reference.matchedSnippetCount === 39
      && reference.checkCount === reference.passedCheckCount
      && reference.productionBlockerCount === 0
      && reference.sourceNodeV258Ready
      && reference.javaV104Ready
      && reference.miniKvV113Ready,
  };
}

function createDecisionRecord(): SandboxEndpointCredentialResolverDecisionRecord {
  const requiredDecisionFields = createRequiredDecisionFields();
  const explicitNoGoConditions = createExplicitNoGoConditions();
  const digestInput = {
    recordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
    decisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
    endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
    approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    requiredDecisionFields,
    explicitNoGoConditions,
  };

  return {
    decisionDigest: sha256StableJson(digestInput),
    recordMode: "sandbox-endpoint-credential-resolver-decision-record-only",
    decisionScope: "managed-audit-sandbox-endpoint-credential-resolver",
    decisionStatus: "human-review-required-before-credential-resolution",
    sourceSpan: "Node v259 sandbox endpoint handle upstream echo verification",
    endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    resolverPolicyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
    approvalMarker: "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    operatorIdentityRequired: true,
    approvalCorrelationRequired: true,
    resolverMode: "policy-record-only-no-value-read",
    resolverCandidateImplementation: "not-implemented",
    requiredDecisionFieldCount: 8,
    explicitNoGoConditionCount: explicitNoGoConditions.length,
    requiredDecisionFields,
    explicitNoGoConditions,
    credentialValueMayBeRead: false,
    credentialValueMayBeLoaded: false,
    credentialValueMayBeStored: false,
    rawEndpointUrlMayBeParsed: false,
    managedAuditConnectionMayOpen: false,
    schemaMigrationMayExecute: false,
    externalRequestMayBeSent: false,
    nodeMayStartJavaOrMiniKv: false,
    miniKvMayActAsManagedAuditStorage: false,
    approvalLedgerMayBeWritten: false,
  };
}

function createRequiredDecisionFields(): CredentialResolverDecisionField[] {
  return [
    decisionField("endpoint-handle", "Confirm sandbox endpoint handle", "Node v259 upstream echo", "handle-aligned"),
    decisionField("credential-handle", "Confirm sandbox credential handle", "Node v259 upstream echo", "handle-aligned"),
    decisionField("resolver-policy-handle", "Name the credential resolver policy handle", "operator decision", "policy-handle-only"),
    decisionField("approval-marker", "Record credential resolver approval marker", "operator decision", "approval-marker-only"),
    decisionField("operator-identity", "Require verified operator identity", "access guard", "operator-header"),
    decisionField("approval-correlation", "Require approval correlation id", "access guard", "approval-correlation-header"),
    decisionField("redaction-policy", "Confirm credential and endpoint redaction policy", "Node v259 policy review", "redaction-reviewed"),
    decisionField("fallback-rotation-plan", "Record fallback and rotation plan handle", "operator decision", "plan-handle-only"),
  ];
}

function decisionField(
  id: string,
  label: string,
  expectedSource: string,
  acceptedEvidence: string,
): CredentialResolverDecisionField {
  return {
    id,
    label,
    expectedSource,
    acceptedEvidence,
    required: true,
    nodeMayReadValue: false,
  };
}

function createExplicitNoGoConditions(): CredentialResolverNoGoCondition[] {
  return [
    noGo("CREDENTIAL_VALUE_REQUIRED", "The next step requires reading or loading a credential value."),
    noGo("RAW_ENDPOINT_URL_REQUIRED", "The next step requires parsing or emitting a raw managed audit endpoint URL."),
    noGo("REAL_CONNECTION_REQUIRED", "The next step requires opening a real managed audit HTTP/TCP connection."),
    noGo("EXTERNAL_REQUEST_REQUIRED", "The next step requires sending an external request from Node."),
    noGo("SCHEMA_MIGRATION_REQUIRED", "The next step requires schema rehearsal execution or migration SQL."),
    noGo("UPSTREAM_WRITE_REQUIRED", "The next step writes approval ledger, managed audit state, or mini-kv storage."),
    noGo("AUTO_START_REQUIRED", "The next step starts Java, mini-kv, or an external audit service automatically."),
    noGo("MINI_KV_BACKEND_REQUIRED", "The next step makes mini-kv a managed audit or order authoritative backend."),
    noGo("PRODUCTION_WINDOW_REQUIRED", "The next step assumes production audit or production window readiness."),
  ];
}

function noGo(code: string, condition: string): CredentialResolverNoGoCondition {
  return { code, condition, action: "pause-and-do-not-resolve-credential" };
}

function createChecks(
  config: AppConfig,
  sourceNodeV259: SourceNodeV259SandboxEndpointHandleUpstreamEchoVerificationReference,
  decisionRecord: SandboxEndpointCredentialResolverDecisionRecord,
): SandboxEndpointCredentialResolverDecisionRecordChecks {
  return {
    sourceNodeV259Ready: sourceNodeV259.readyForNodeV260CredentialResolverDecisionRecord,
    sourceNodeV259StillBlocksConnection: sourceNodeV259.connectionBoundaryAligned,
    sourceNodeV259StillBlocksCredentialValue: sourceNodeV259.credentialBoundaryAligned,
    sourceNodeV259StillBlocksRawEndpoint: sourceNodeV259.rawEndpointBoundaryAligned,
    sourceNodeV259StillBlocksWrites: sourceNodeV259.writeBoundaryAligned,
    sourceNodeV259StillBlocksAutoStart: sourceNodeV259.autoStartBoundaryAligned,
    sourceNodeV259KeepsMiniKvNonParticipant: sourceNodeV259.miniKvNonParticipationAligned,
    endpointHandleRecorded: decisionRecord.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandleRecorded: decisionRecord.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    resolverPolicyRecorded:
      decisionRecord.resolverPolicyHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_RESOLVER_POLICY_HANDLE",
    approvalMarkerRecorded:
      decisionRecord.approvalMarker === "ORDEROPS_MANAGED_AUDIT_CREDENTIAL_RESOLVER_APPROVAL_MARKER",
    operatorIdentityRequirementRecorded: decisionRecord.operatorIdentityRequired,
    approvalCorrelationRequirementRecorded: decisionRecord.approvalCorrelationRequired,
    resolverModeStillPolicyOnly:
      decisionRecord.resolverMode === "policy-record-only-no-value-read"
      && decisionRecord.resolverCandidateImplementation === "not-implemented",
    explicitNoGoConditionsRecorded:
      decisionRecord.requiredDecisionFieldCount === 8
      && decisionRecord.explicitNoGoConditionCount >= 9
      && decisionRecord.explicitNoGoConditions.some((condition) => condition.code === "CREDENTIAL_VALUE_REQUIRED")
      && decisionRecord.explicitNoGoConditions.some((condition) => condition.code === "REAL_CONNECTION_REQUIRED"),
    decisionRecordStillReadOnly:
      !decisionRecord.credentialValueMayBeRead
      && !decisionRecord.credentialValueMayBeLoaded
      && !decisionRecord.credentialValueMayBeStored
      && !decisionRecord.rawEndpointUrlMayBeParsed
      && !decisionRecord.managedAuditConnectionMayOpen
      && !decisionRecord.schemaMigrationMayExecute
      && !decisionRecord.externalRequestMayBeSent
      && !decisionRecord.nodeMayStartJavaOrMiniKv
      && !decisionRecord.miniKvMayActAsManagedAuditStorage
      && !decisionRecord.approvalLedgerMayBeWritten,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord: false,
  };
}

function collectProductionBlockers(
  checks: SandboxEndpointCredentialResolverDecisionRecordChecks,
): SandboxEndpointCredentialResolverDecisionRecordMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SandboxEndpointCredentialResolverDecisionRecordMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV259Ready,
      code: "NODE_V259_SOURCE_NOT_READY",
      source: "node-v259-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Node v259 must be ready before v260 can record a credential resolver decision.",
    },
    {
      condition:
        checks.sourceNodeV259StillBlocksConnection
        && checks.sourceNodeV259StillBlocksCredentialValue
        && checks.sourceNodeV259StillBlocksRawEndpoint
        && checks.sourceNodeV259StillBlocksWrites
        && checks.sourceNodeV259StillBlocksAutoStart
        && checks.sourceNodeV259KeepsMiniKvNonParticipant,
      code: "SOURCE_BOUNDARY_OPEN",
      source: "node-v259-sandbox-endpoint-handle-upstream-echo-verification",
      message: "Source v259 must still block credentials, raw endpoints, connections, writes, auto-start, and mini-kv backend participation.",
    },
    {
      condition:
        checks.endpointHandleRecorded
        && checks.credentialHandleRecorded
        && checks.resolverPolicyRecorded
        && checks.approvalMarkerRecorded
        && checks.operatorIdentityRequirementRecorded
        && checks.approvalCorrelationRequirementRecorded,
      code: "DECISION_FIELDS_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "The credential resolver decision record must include handles, policy, approval, operator identity, and correlation markers.",
    },
    {
      condition:
        checks.resolverModeStillPolicyOnly
        && checks.explicitNoGoConditionsRecorded
        && checks.decisionRecordStillReadOnly,
      code: "DECISION_RECORD_CAN_EXECUTE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "The decision record must remain policy-only and must not resolve credentials or connect to upstream systems.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false while recording the credential resolver decision.",
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

function collectWarnings(): SandboxEndpointCredentialResolverDecisionRecordMessage[] {
  return [
    {
      code: "DECISION_RECORD_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "v260 records credential resolver decision metadata only; it does not implement or invoke a resolver.",
    },
    {
      code: "REAL_CREDENTIAL_STILL_ABSENT",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "Credential values and raw endpoint URLs are intentionally absent from this profile.",
    },
  ];
}

function collectRecommendations(): SandboxEndpointCredentialResolverDecisionRecordMessage[] {
  return [
    {
      code: "START_POST_V260_PLAN",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "After v260, start a new plan and first ask Java and mini-kv for read-only echo/non-participation evidence.",
    },
    {
      code: "DESIGN_DISABLED_RESOLVER_PRECHECK_LATER",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-decision-record",
      message: "The first Node follow-up should be a disabled resolver precheck, not a real secret provider adapter.",
    },
  ];
}
