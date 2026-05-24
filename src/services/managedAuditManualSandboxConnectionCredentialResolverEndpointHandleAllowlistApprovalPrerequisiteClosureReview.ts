import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification.js";
import type {
  EndpointHandleAllowlistApprovalClosurePrerequisite,
  EndpointHandleAllowlistApprovalPrerequisiteClosureReview,
  EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks,
  EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage,
  EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile,
  SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review";
const SOURCE_NODE_V321_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-contract-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md";
const NEXT_PLAN = "docs/plans2/v322-post-endpoint-handle-prerequisite-closure-roadmap.md";

const SIGNED_ARTIFACT_PREREQUISITE_ID =
  "signed-human-approval-artifact" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const CREDENTIAL_HANDLE_PREREQUISITE_ID =
  "credential-handle-approval" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID =
  "endpoint-handle-allowlist-approval" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID =
  "no-network-safety-fixture" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID =
  "abort-rollback-semantics" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;

export function loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReviewProfile {
  const sourceNodeV321 = createSourceNodeV321(input.config);
  const closureReview = createClosureReview(sourceNodeV321);
  const checks = createChecks(input.config, sourceNodeV321, closureReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview
    ? "endpoint-handle-allowlist-approval-prerequisite-closure-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV321, closureReview, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver endpoint handle allowlist approval prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    prerequisiteClosureDecision: "advance-endpoint-handle-allowlist-approval-only",
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview,
    readOnlyClosureReview: true,
    endpointHandleAllowlistApprovalPrerequisiteClosureReviewOnly: true,
    consumesNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerification: true,
    activeNodeReviewVersion: "Node v322",
    readyForNewJavaMiniKvEchoRequest: false,
    newJavaMiniKvEchoRequested: false,
    readyForNoNetworkSafetyFixtureContractIntake: true,
    nextNodeVersionSuggested: "Node v323",
    readyForDisabledRuntimeShellImplementation: false,
    readyForDisabledRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    credentialValueProvided: false,
    endpointHandleAllowlistApproved: false,
    rawEndpointUrlParsed: false,
    rawEndpointUrlRendered: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    fakeSecretProviderInstantiated: false,
    fakeResolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    approvalLedgerWritten: false,
    automaticUpstreamStart: false,
    sourceNodeV321,
    closureReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      endpointHandleAllowlistApprovalPrerequisiteClosureReviewJson: ROUTE_PATH,
      endpointHandleAllowlistApprovalPrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV321Json: SOURCE_NODE_V321_ROUTE,
      sourceNodeV321Markdown: `${SOURCE_NODE_V321_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v322 as the closure review that advances endpoint-handle-allowlist-approval only after Node v321 echo alignment.",
      "Do not request Java or mini-kv echo again until Node v323 defines the no-network safety fixture contract.",
      "Keep runtime shell, credential value, raw endpoint URL, provider/client, HTTP/TCP, ledger, schema, and auto-start boundaries closed.",
    ],
  };
}

function createSourceNodeV321(
  config: AppConfig,
): SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v321",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV320Ready: source.echoVerification.sourceNodeV320Ready,
    javaV147EchoReady: source.echoVerification.javaV147EchoReady,
    miniKvV140ReceiptReady: source.echoVerification.miniKvV140ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    endpointHandleAllowlistContractAligned: source.echoVerification.endpointHandleAllowlistContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    remainingPrerequisitesAfterV321: source.echoVerification.remainingPrerequisitesAfterV321,
    contractDigest: source.sourceNodeV320.contractDigest,
    requiredFieldCount: source.summary.requiredFieldCount,
    prohibitedFieldCount: source.summary.prohibitedFieldCount,
    rejectionReasonCount: source.summary.rejectionReasonCount,
    noGoBoundaryCount: source.summary.noGoBoundaryCount,
    upstreamEchoRequestCount: source.summary.upstreamEchoRequestCount,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceChecks: source.checks,
    sourceSummary: source.summary,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    endpointHandleAllowlistApproved: source.endpointHandleAllowlistApproved,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createClosureReview(
  sourceNodeV321: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
): EndpointHandleAllowlistApprovalPrerequisiteClosureReview {
  const completedPrerequisites: EndpointHandleAllowlistApprovalClosurePrerequisite[] = [
    completedBeforeV322(
      JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
      "Node v312 already closed this prerequisite after Node v311 verified Java v144 and mini-kv v137.",
    ),
    completedBeforeV322(
      SIGNED_ARTIFACT_PREREQUISITE_ID,
      "Node v316 already closed this prerequisite after Node v315 verified Java v145 and mini-kv v138.",
    ),
    completedBeforeV322(
      CREDENTIAL_HANDLE_PREREQUISITE_ID,
      "Node v319 already closed this prerequisite after Node v318 verified Java v146 and mini-kv v139.",
    ),
    completedEndpointHandleAllowlist(sourceNodeV321),
  ];
  const completedIds = new Set(completedPrerequisites.map((prerequisite) => prerequisite.id));
  const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
    .filter((entry) => !completedIds.has(entry.id))
    .map((entry) => missing(entry.id as RemainingEndpointHandleAllowlistClosurePrerequisiteId));
  const record = {
    reviewMode: "endpoint-handle-allowlist-approval-prerequisite-closure-review-only" as const,
    sourceSpan: "Node v321" as const,
    sourceVerificationDigest: sourceNodeV321.verificationDigest,
    completedPrerequisites,
    remainingPrerequisites,
    completedPrerequisiteCount: completedPrerequisites.length,
    remainingPrerequisiteCount: remainingPrerequisites.length,
    originalPrerequisiteCount: HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.length,
    movedPrerequisiteId: ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID as "endpoint-handle-allowlist-approval",
    movedFrom: "contract-intake-defined" as const,
    movedTo: "contract-intake-and-upstream-echo-complete" as const,
    nextConcretePrerequisiteId: NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID as "no-network-safety-fixture",
    nextConcretePrerequisiteContractRequired: true as const,
    nextNodeVersionSuggested: "Node v323" as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    chainContinuationAllowed: true as const,
    runtimeShellStillBlocked: true as const,
    closureReason:
      "Node v321 verified Node v320 endpoint-handle allowlist approval contract plus Java v147 and mini-kv v140 read-only echo alignment.",
  };

  return {
    reviewDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function completedBeforeV322(
  id:
    | typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
    | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
    | typeof CREDENTIAL_HANDLE_PREREQUISITE_ID,
  evidence: string,
): EndpointHandleAllowlistApprovalClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "completed-before-node-v322",
    evidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function completedEndpointHandleAllowlist(
  sourceNodeV321: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
): EndpointHandleAllowlistApprovalClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID);

  return {
    id: ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID,
    label: entry.closureLabel,
    closureState: "contract-intake-and-upstream-echo-complete",
    evidence:
      `Node v321 verified contract ${sourceNodeV321.contractDigest} with Java v147 and mini-kv v140 read-only echoes.`,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function missing(
  id: RemainingEndpointHandleAllowlistClosurePrerequisiteId,
): EndpointHandleAllowlistApprovalClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "still-missing",
    evidence: entry.closureMissingEvidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

type RemainingEndpointHandleAllowlistClosurePrerequisiteId = Exclude<
  HumanApprovalArtifactReviewPostEchoPrerequisiteId,
  typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
    | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
    | typeof CREDENTIAL_HANDLE_PREREQUISITE_ID
    | typeof ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID
>;

function createChecks(
  config: AppConfig,
  sourceNodeV321: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
  closureReview: EndpointHandleAllowlistApprovalPrerequisiteClosureReview,
): EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks {
  const completedIds = closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id);
  const remainingIds = closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id);

  return {
    sourceNodeV321Ready: sourceNodeV321.readyForEndpointHandleAllowlistApprovalContractUpstreamEchoVerification,
    sourceNodeV321EchoAligned:
      sourceNodeV321.sourceNodeV320Ready
      && sourceNodeV321.javaV147EchoReady
      && sourceNodeV321.miniKvV140ReceiptReady
      && sourceNodeV321.upstreamEchoAligned
      && sourceNodeV321.endpointHandleAllowlistContractAligned
      && sourceNodeV321.sideEffectBoundariesAligned,
    sourceNodeV321KeepsRuntimeBlocked:
      sourceNodeV321.implementationStillBlocked
      && sourceNodeV321.runtimeShellImplemented === false
      && sourceNodeV321.runtimeShellInvocationAllowed === false,
    sourceNodeV321KeepsSideEffectsClosed:
      sourceNodeV321.executionAllowed === false
      && sourceNodeV321.connectsManagedAudit === false
      && sourceNodeV321.credentialValueRead === false
      && sourceNodeV321.endpointHandleAllowlistApproved === false
      && sourceNodeV321.rawEndpointUrlParsed === false
      && sourceNodeV321.externalRequestSent === false
      && sourceNodeV321.schemaMigrationExecuted === false
      && sourceNodeV321.approvalLedgerWritten === false
      && sourceNodeV321.automaticUpstreamStart === false,
    endpointHandleAllowlistContractCanClose:
      closureReview.movedPrerequisiteId === ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID
      && closureReview.movedFrom === "contract-intake-defined"
      && closureReview.movedTo === "contract-intake-and-upstream-echo-complete"
      && sourceNodeV321.requiredFieldCount === 10
      && sourceNodeV321.prohibitedFieldCount === 8
      && sourceNodeV321.rejectionReasonCount === 5
      && sourceNodeV321.noGoBoundaryCount === 9
      && sourceNodeV321.upstreamEchoRequestCount === 2,
    endpointHandleAllowlistClosureDoesNotOpenRuntime:
      closureReview.completedPrerequisites
        .filter((prerequisite) => prerequisite.id === ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID)
        .every((prerequisite) => prerequisite.opensRuntimeShell === false),
    exactlyFourPrerequisitesCompleted:
      closureReview.completedPrerequisiteCount === 4
      && completedIds.includes(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
      && completedIds.includes(SIGNED_ARTIFACT_PREREQUISITE_ID)
      && completedIds.includes(CREDENTIAL_HANDLE_PREREQUISITE_ID)
      && completedIds.includes(ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID),
    twoPrerequisitesRemainMissing:
      closureReview.remainingPrerequisiteCount === 2
      && remainingIds.includes(NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID)
      && remainingIds.includes(ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID)
      && closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.closureState === "still-missing"),
    nextConcretePrerequisiteIsNoNetworkSafetyFixture:
      closureReview.nextConcretePrerequisiteId === NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID
      && closureReview.nextConcretePrerequisiteContractRequired
      && closureReview.nextNodeVersionSuggested === "Node v323",
    noNewJavaMiniKvEchoRequested:
      closureReview.nextJavaVersionRequested === null
      && closureReview.nextMiniKvVersionRequested === null,
    closureReviewStillReadOnly: true,
    runtimeShellStillBlocked: closureReview.runtimeShellStillBlocked,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverEndpointHandleAllowlistApprovalPrerequisiteClosureReview:
      false,
  };
}

function collectProductionBlockers(
  checks: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks,
): EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV321Ready
        && checks.sourceNodeV321EchoAligned
        && checks.sourceNodeV321KeepsRuntimeBlocked
        && checks.sourceNodeV321KeepsSideEffectsClosed,
      code: "NODE_V321_UPSTREAM_ECHO_NOT_READY",
      source: "node-v321-endpoint-handle-allowlist-approval-contract-upstream-echo-verification",
      message: "Node v321 must be ready, aligned across Node/Java/mini-kv, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.endpointHandleAllowlistContractCanClose
        && checks.endpointHandleAllowlistClosureDoesNotOpenRuntime
        && checks.exactlyFourPrerequisitesCompleted
        && checks.twoPrerequisitesRemainMissing,
      code: "ENDPOINT_HANDLE_ALLOWLIST_CLOSURE_COUNTS_NOT_SAFE",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "v322 may advance only endpoint-handle-allowlist-approval and must leave two remaining prerequisites missing.",
    },
    {
      condition:
        checks.nextConcretePrerequisiteIsNoNetworkSafetyFixture
        && checks.noNewJavaMiniKvEchoRequested
        && checks.closureReviewStillReadOnly
        && checks.runtimeShellStillBlocked,
      code: "NEXT_PREREQUISITE_PLAN_NOT_SAFE",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "v322 may suggest Node v323 no-network safety fixture contract intake only; it must not request new upstream echo or runtime work.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v322 closure review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v322 closure review.",
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

function collectWarnings(): EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "ENDPOINT_HANDLE_ALLOWLIST_CLOSURE_DOES_NOT_APPROVE_RUNTIME",
      severity: "warning",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "v322 advances one prerequisite after read-only echo alignment; it does not approve endpoint parsing, provider/client, network, ledger, schema, or runtime shell work.",
    },
  ];
}

function collectRecommendations(): EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "DEFINE_NO_NETWORK_SAFETY_FIXTURE_CONTRACT_NEXT",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "The next Node step should define a no-network safety fixture contract before requesting Java/mini-kv echo.",
    },
    {
      code: "KEEP_ABORT_ROLLBACK_SEMANTICS_VISIBLE",
      severity: "recommendation",
      source:
        "managed-audit-manual-sandbox-connection-credential-resolver-endpoint-handle-allowlist-approval-prerequisite-closure-review",
      message: "Keep abort and rollback semantics as the final explicit missing prerequisite after no-network safety fixture contract intake starts.",
    },
  ];
}

function createSummary(
  sourceNodeV321: SourceNodeV321EndpointHandleAllowlistApprovalContractUpstreamEchoVerificationReference,
  closureReview: EndpointHandleAllowlistApprovalPrerequisiteClosureReview,
  checks: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewChecks,
  productionBlockers: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[],
  warnings: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[],
  recommendations: EndpointHandleAllowlistApprovalPrerequisiteClosureReviewMessage[],
): EndpointHandleAllowlistApprovalPrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV321CheckCount: sourceNodeV321.sourceCheckCount,
    sourceNodeV321PassedCheckCount: sourceNodeV321.sourcePassedCheckCount,
    originalPrerequisiteCount: closureReview.originalPrerequisiteCount,
    completedPrerequisiteCount: closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureReview.remainingPrerequisiteCount,
    requiredFieldCount: sourceNodeV321.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV321.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV321.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV321.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV321.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
