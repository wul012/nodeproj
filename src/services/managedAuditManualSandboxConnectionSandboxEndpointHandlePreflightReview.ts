import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationTypes.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile,
  SandboxEndpointHandlePreflightReview,
  SandboxEndpointHandlePreflightReviewChecks,
  SandboxEndpointHandlePreflightReviewMessage,
  SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewTypes.js";
export {
  renderManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewMarkdown,
} from "./managedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review";
const NODE_V257_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v257-post-fake-transport-upstream-echo-roadmap.md";

const REQUIRED_REVIEW_ITEMS = [
  "endpoint handle review",
  "credential handle review",
  "owner approval artifact review",
  "network allowlist review",
  "TLS policy review",
  "redaction policy review",
  "operator window review",
] as const;

const FORBIDDEN_OPERATIONS = [
  "read credential value",
  "parse raw endpoint URL",
  "send real managed audit request",
  "execute schema migration",
  "write approval ledger",
  "start Java or mini-kv",
  "promote mini-kv to managed audit storage backend",
] as const;

export function loadManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReviewProfile {
  const sourceNodeV257 = createSourceNodeV257(
    loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({ config: input.config }),
  );
  const preflightReview = createPreflightReview(sourceNodeV257);
  const checks = createChecks(input.config, sourceNodeV257, preflightReview);
  checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview")
    .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview
    ? "sandbox-endpoint-handle-preflight-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const completedReviewItemCount = [
    preflightReview.endpointHandleReviewed,
    preflightReview.credentialHandleReviewed,
    preflightReview.ownerApprovalArtifactReviewed,
    preflightReview.networkAllowlistReview.reviewed,
    preflightReview.tlsPolicyReview.reviewed,
    preflightReview.redactionPolicy.reviewed,
    preflightReview.operatorWindow.reviewed,
  ].filter(Boolean).length;

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection sandbox endpoint handle preflight review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview:
      checks.readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview,
    readOnlyPreflightReview: true,
    endpointHandleOnly: true,
    credentialHandleOnly: true,
    rawEndpointUrlParsed: false,
    rawEndpointUrlIncluded: false,
    credentialValueRead: false,
    externalRequestSent: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV257,
    preflightReview,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      requiredReviewItemCount: REQUIRED_REVIEW_ITEMS.length,
      completedReviewItemCount,
      forbiddenOperationCount: FORBIDDEN_OPERATIONS.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      sandboxEndpointHandlePreflightReviewJson: ROUTE_PATH,
      sandboxEndpointHandlePreflightReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV257Json: NODE_V257_ROUTE,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Run Java v104 and mini-kv v113 as the recommended parallel read-only echo round after Node v258 is archived.",
      "Keep Node v259 blocked until Java v104 endpoint handle echo and mini-kv v113 non-participation receipt both exist.",
      "Do not add a credential resolver, raw endpoint URL parser, schema migration rehearsal, or real managed audit HTTP request in v258.",
    ],
  };
}

function createSourceNodeV257(
  source: ManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationProfile,
): SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference {
  const verification = source.echoVerification;
  const checks = source.checks;
  const reference = {
    sourceVersion: "Node v257" as const,
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
    verificationDigest: verification.verificationDigest,
    requestShapeAligned: verification.requestShapeAligned,
    responseShapeAligned: verification.responseShapeAligned,
    timeoutBoundaryAligned: verification.timeoutBoundaryAligned,
    failureMappingAligned: verification.failureMappingAligned,
    cleanupBoundaryAligned: verification.cleanupBoundaryAligned,
    archiveNoRerunAligned: verification.archiveNoRerunAligned,
    credentialBoundaryAligned: verification.credentialBoundaryAligned,
    connectionBoundaryAligned: verification.connectionBoundaryAligned,
    writeBoundaryAligned: verification.writeBoundaryAligned,
    autoStartBoundaryAligned: verification.autoStartBoundaryAligned,
    upstreamActionsStillDisabled: checks.upstreamActionsStillDisabled,
    readyForManagedAuditSandboxAdapterConnection: source.readyForManagedAuditSandboxAdapterConnection,
    connectsManagedAudit: source.connectsManagedAudit,
    readsManagedAuditCredential: source.readsManagedAuditCredential,
    storesManagedAuditCredential: source.storesManagedAuditCredential,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    evidenceFileCount: source.summary.evidenceFileCount,
    matchedSnippetCount: source.summary.matchedSnippetCount,
    readyForNodeV258PreflightReview: false,
  };

  return {
    ...reference,
    readyForNodeV258PreflightReview:
      reference.readyForUpstreamEchoVerification
      && reference.verificationState === "fake-transport-packet-upstream-echo-verification-ready"
      && reference.requestShapeAligned
      && reference.responseShapeAligned
      && reference.timeoutBoundaryAligned
      && reference.failureMappingAligned
      && reference.cleanupBoundaryAligned
      && reference.archiveNoRerunAligned
      && reference.credentialBoundaryAligned
      && reference.connectionBoundaryAligned
      && reference.writeBoundaryAligned
      && reference.autoStartBoundaryAligned
      && reference.upstreamActionsStillDisabled
      && !reference.readyForManagedAuditSandboxAdapterConnection
      && !reference.connectsManagedAudit
      && !reference.readsManagedAuditCredential
      && !reference.storesManagedAuditCredential
      && !reference.schemaMigrationExecuted
      && !reference.automaticUpstreamStart,
  };
}

function createPreflightReview(
  sourceNodeV257: SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference,
): SandboxEndpointHandlePreflightReview {
  const reviewSeed = {
    profileVersion: PROFILE_VERSION,
    sourceNodeV257Digest: sourceNodeV257.verificationDigest,
    requiredReviewItems: REQUIRED_REVIEW_ITEMS,
    forbiddenOperations: FORBIDDEN_OPERATIONS,
    endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
  };

  return {
    reviewDigest: sha256StableJson(reviewSeed),
    reviewMode: "sandbox-endpoint-handle-preflight-review-only",
    sourceSpan: "Node v257",
    endpointHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    ownerApprovalArtifactId: "owner-approval-artifact-review-only",
    schemaRehearsalId: "schema-migration-rehearsal-review-only",
    operatorWindowMarker: "manual-sandbox-endpoint-window-review-only",
    endpointHandleReviewed: true,
    credentialHandleReviewed: true,
    ownerApprovalArtifactReviewed: true,
    networkAllowlistReview: {
      reviewRequired: true,
      allowlistHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_NETWORK_ALLOWLIST_HANDLE",
      rawHostIncluded: false,
      cidrIncluded: false,
      reviewed: true,
    },
    tlsPolicyReview: {
      reviewRequired: true,
      policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_TLS_POLICY_HANDLE",
      certificateMaterialIncluded: false,
      privateKeyIncluded: false,
      reviewed: true,
    },
    redactionPolicy: {
      reviewRequired: true,
      policyHandle: "ORDEROPS_MANAGED_AUDIT_SANDBOX_REDACTION_POLICY_HANDLE",
      credentialValueRedacted: true,
      rawEndpointUrlRedacted: true,
      payloadSecretRedacted: true,
      reviewed: true,
    },
    operatorWindow: {
      manualWindowRequired: true,
      windowOpen: false,
      executionBlockedUntilWindowOpen: true,
      operatorIdentityRequired: true,
      approvalCorrelationRequired: true,
      reviewed: true,
    },
    requiredReviewItems: REQUIRED_REVIEW_ITEMS,
    forbiddenOperations: FORBIDDEN_OPERATIONS,
    nextRequiredEchoVersions: ["Java v104", "mini-kv v113"],
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV257: SourceNodeV257FakeTransportPacketUpstreamEchoVerificationReference,
  preflightReview: SandboxEndpointHandlePreflightReview,
): SandboxEndpointHandlePreflightReviewChecks {
  return {
    sourceNodeV257Ready: sourceNodeV257.readyForNodeV258PreflightReview,
    sourceNodeV257BoundariesAligned:
      sourceNodeV257.credentialBoundaryAligned
      && sourceNodeV257.connectionBoundaryAligned
      && sourceNodeV257.writeBoundaryAligned
      && sourceNodeV257.autoStartBoundaryAligned
      && !sourceNodeV257.connectsManagedAudit
      && !sourceNodeV257.readsManagedAuditCredential
      && !sourceNodeV257.storesManagedAuditCredential,
    endpointHandleOnly: preflightReview.endpointHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_ENDPOINT_HANDLE",
    credentialHandleOnly: preflightReview.credentialHandle === "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
    ownerApprovalArtifactPresent: preflightReview.ownerApprovalArtifactReviewed,
    networkAllowlistReviewReady:
      preflightReview.networkAllowlistReview.reviewRequired
      && preflightReview.networkAllowlistReview.reviewed
      && !preflightReview.networkAllowlistReview.rawHostIncluded
      && !preflightReview.networkAllowlistReview.cidrIncluded,
    tlsPolicyReviewReady:
      preflightReview.tlsPolicyReview.reviewRequired
      && preflightReview.tlsPolicyReview.reviewed
      && !preflightReview.tlsPolicyReview.certificateMaterialIncluded
      && !preflightReview.tlsPolicyReview.privateKeyIncluded,
    redactionPolicyReady:
      preflightReview.redactionPolicy.reviewRequired
      && preflightReview.redactionPolicy.reviewed
      && preflightReview.redactionPolicy.credentialValueRedacted
      && preflightReview.redactionPolicy.rawEndpointUrlRedacted
      && preflightReview.redactionPolicy.payloadSecretRedacted,
    operatorWindowReviewReady:
      preflightReview.operatorWindow.reviewed
      && preflightReview.operatorWindow.manualWindowRequired
      && !preflightReview.operatorWindow.windowOpen
      && preflightReview.operatorWindow.executionBlockedUntilWindowOpen
      && preflightReview.operatorWindow.operatorIdentityRequired
      && preflightReview.operatorWindow.approvalCorrelationRequired,
    noRawEndpointUrlParsed: true,
    noRawEndpointUrlIncluded: true,
    noCredentialValueRead: true,
    noExternalRequestSent: true,
    noSchemaMigrationExecuted: true,
    noUpstreamAutoStart: !sourceNodeV257.automaticUpstreamStart,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionSandboxEndpointHandlePreflightReview: false,
  };
}

function collectProductionBlockers(
  checks: SandboxEndpointHandlePreflightReviewChecks,
): SandboxEndpointHandlePreflightReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SandboxEndpointHandlePreflightReviewMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV257Ready && checks.sourceNodeV257BoundariesAligned,
      code: "NODE_V257_SOURCE_NOT_READY",
      source: "node-v257-fake-transport-packet-upstream-echo-verification",
      message: "Node v257 must be ready and keep credential, connection, write, and auto-start boundaries closed.",
    },
    {
      condition:
        checks.endpointHandleOnly
        && checks.credentialHandleOnly
        && checks.ownerApprovalArtifactPresent
        && checks.networkAllowlistReviewReady
        && checks.tlsPolicyReviewReady
        && checks.redactionPolicyReady
        && checks.operatorWindowReviewReady,
      code: "HANDLE_PREFLIGHT_REVIEW_INCOMPLETE",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "Endpoint handle, credential handle, approval artifact, network, TLS, redaction, and operator window reviews must all be present.",
    },
    {
      condition:
        checks.noRawEndpointUrlParsed
        && checks.noRawEndpointUrlIncluded
        && checks.noCredentialValueRead
        && checks.noExternalRequestSent
        && checks.noSchemaMigrationExecuted
        && checks.noUpstreamAutoStart,
      code: "HANDLE_PREFLIGHT_SIDE_EFFECT_BOUNDARY_OPEN",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "v258 must not parse raw endpoint URLs, read credential values, send external requests, execute schema migration, or auto-start upstream services.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during sandbox endpoint handle preflight review.",
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

function collectWarnings(): SandboxEndpointHandlePreflightReviewMessage[] {
  return [
    {
      code: "HANDLE_REVIEW_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "v258 reviews endpoint and credential handles only; it does not resolve values or connect to managed audit.",
    },
    {
      code: "OPERATOR_WINDOW_CLOSED",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "The operator window is intentionally closed and blocks execution until a future explicitly approved rehearsal.",
    },
  ];
}

function collectRecommendations(): SandboxEndpointHandlePreflightReviewMessage[] {
  return [
    {
      code: "RUN_PARALLEL_UPSTREAM_ECHO_ROUND",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "Proceed with the recommended parallel Java v104 and mini-kv v113 read-only echo round before Node v259.",
    },
    {
      code: "KEEP_CREDENTIAL_RESOLVER_OUT_OF_V258",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-sandbox-endpoint-handle-preflight-review",
      message: "Defer credential resolver policy and any real endpoint connection decision to Node v260 or a later explicit plan.",
    },
  ];
}
