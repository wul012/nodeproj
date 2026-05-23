import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification.js";
import type {
  CredentialHandleApprovalClosurePrerequisite,
  CredentialHandleApprovalPrerequisiteClosureReview,
  CredentialHandleApprovalPrerequisiteClosureReviewChecks,
  CredentialHandleApprovalPrerequisiteClosureReviewMessage,
  CredentialHandleApprovalPrerequisiteClosureReviewSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile,
  SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review";
const SOURCE_NODE_V318_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md";
const NEXT_PLAN = "docs/plans2/v319-post-credential-handle-prerequisite-closure-roadmap.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReviewProfile {
  const sourceNodeV318 = createSourceNodeV318(input.config);
  const closureReview = createClosureReview(sourceNodeV318);
  const checks = createChecks(input.config, sourceNodeV318, closureReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview
    ? "credential-handle-approval-prerequisite-closure-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV318, closureReview, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver credential handle approval prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    prerequisiteClosureDecision: "advance-credential-handle-approval-only",
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview,
    readOnlyClosureReview: true,
    credentialHandleApprovalPrerequisiteClosureReviewOnly: true,
    consumesNodeV318CredentialHandleApprovalContractUpstreamEchoVerification: true,
    activeNodeReviewVersion: "Node v319",
    readyForNewJavaMiniKvEchoRequest: false,
    newJavaMiniKvEchoRequested: false,
    readyForEndpointHandleAllowlistContractIntake: true,
    nextNodeVersionSuggested: "Node v320",
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
    sourceNodeV318,
    closureReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      credentialHandleApprovalPrerequisiteClosureReviewJson: ROUTE_PATH,
      credentialHandleApprovalPrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV318Json: SOURCE_NODE_V318_ROUTE,
      sourceNodeV318Markdown: `${SOURCE_NODE_V318_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v319 as the closure review that advances credential-handle-approval only after Node v318 echo alignment.",
      "Do not request Java or mini-kv echo again until Node v320 defines the endpoint-handle allowlist approval contract.",
      "Keep runtime shell, credential value, raw endpoint URL, provider/client, HTTP/TCP, ledger, schema, and auto-start boundaries closed.",
    ],
  };
}

function createSourceNodeV318(
  config: AppConfig,
): SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v318",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForCredentialHandleApprovalContractUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV317Ready: source.echoVerification.sourceNodeV317Ready,
    javaV146EchoReady: source.echoVerification.javaV146EchoReady,
    miniKvV139ReceiptReady: source.echoVerification.miniKvV139ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    credentialHandleContractAligned: source.echoVerification.credentialHandleContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    contractDigest: source.sourceNodeV317.contractDigest,
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
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    approvalLedgerWritten: source.approvalLedgerWritten,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createClosureReview(
  sourceNodeV318: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
): CredentialHandleApprovalPrerequisiteClosureReview {
  const completedPrerequisites: CredentialHandleApprovalClosurePrerequisite[] = [
    completedBeforeV319(
      JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
      "Node v312 already closed this prerequisite after Node v311 verified Java v144 and mini-kv v137.",
    ),
    completedBeforeV319(
      SIGNED_ARTIFACT_PREREQUISITE_ID,
      "Node v316 already closed this prerequisite after Node v315 verified Java v145 and mini-kv v138.",
    ),
    completedCredentialHandle(sourceNodeV318),
  ];
  const completedIds = new Set(completedPrerequisites.map((prerequisite) => prerequisite.id));
  const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
    .filter((entry) => !completedIds.has(entry.id))
    .map((entry) => missing(entry.id as RemainingCredentialHandleClosurePrerequisiteId));
  const record = {
    reviewMode: "credential-handle-approval-prerequisite-closure-review-only" as const,
    sourceSpan: "Node v318" as const,
    sourceVerificationDigest: sourceNodeV318.verificationDigest,
    completedPrerequisites,
    remainingPrerequisites,
    completedPrerequisiteCount: completedPrerequisites.length,
    remainingPrerequisiteCount: remainingPrerequisites.length,
    originalPrerequisiteCount: HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.length,
    movedPrerequisiteId: CREDENTIAL_HANDLE_PREREQUISITE_ID as "credential-handle-approval",
    movedFrom: "contract-intake-defined" as const,
    movedTo: "contract-intake-and-upstream-echo-complete" as const,
    nextConcretePrerequisiteId: ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID as "endpoint-handle-allowlist-approval",
    nextConcretePrerequisiteContractRequired: true as const,
    nextNodeVersionSuggested: "Node v320" as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    chainContinuationAllowed: true as const,
    runtimeShellStillBlocked: true as const,
    closureReason:
      "Node v318 verified Node v317 credential-handle approval contract plus Java v146 and mini-kv v139 read-only echo alignment.",
  };

  return {
    reviewDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function completedBeforeV319(
  id: typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID | typeof SIGNED_ARTIFACT_PREREQUISITE_ID,
  evidence: string,
): CredentialHandleApprovalClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "completed-before-node-v319",
    evidence,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function completedCredentialHandle(
  sourceNodeV318: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
): CredentialHandleApprovalClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(CREDENTIAL_HANDLE_PREREQUISITE_ID);

  return {
    id: CREDENTIAL_HANDLE_PREREQUISITE_ID,
    label: entry.closureLabel,
    closureState: "contract-intake-and-upstream-echo-complete",
    evidence:
      `Node v318 verified contract ${sourceNodeV318.contractDigest} with Java v146 and mini-kv v139 read-only echoes.`,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function missing(
  id: RemainingCredentialHandleClosurePrerequisiteId,
): CredentialHandleApprovalClosurePrerequisite {
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

type RemainingCredentialHandleClosurePrerequisiteId = Exclude<
  HumanApprovalArtifactReviewPostEchoPrerequisiteId,
  typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
    | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
    | typeof CREDENTIAL_HANDLE_PREREQUISITE_ID
>;

function createChecks(
  config: AppConfig,
  sourceNodeV318: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
  closureReview: CredentialHandleApprovalPrerequisiteClosureReview,
): CredentialHandleApprovalPrerequisiteClosureReviewChecks {
  const completedIds = closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id);
  const remainingIds = closureReview.remainingPrerequisites.map((prerequisite) => prerequisite.id);

  return {
    sourceNodeV318Ready: sourceNodeV318.readyForCredentialHandleApprovalContractUpstreamEchoVerification,
    sourceNodeV318EchoAligned:
      sourceNodeV318.sourceNodeV317Ready
      && sourceNodeV318.javaV146EchoReady
      && sourceNodeV318.miniKvV139ReceiptReady
      && sourceNodeV318.upstreamEchoAligned
      && sourceNodeV318.credentialHandleContractAligned
      && sourceNodeV318.sideEffectBoundariesAligned,
    sourceNodeV318KeepsRuntimeBlocked:
      sourceNodeV318.implementationStillBlocked
      && sourceNodeV318.runtimeShellImplemented === false
      && sourceNodeV318.runtimeShellInvocationAllowed === false,
    sourceNodeV318KeepsSideEffectsClosed:
      sourceNodeV318.executionAllowed === false
      && sourceNodeV318.connectsManagedAudit === false
      && sourceNodeV318.credentialValueRead === false
      && sourceNodeV318.rawEndpointUrlParsed === false
      && sourceNodeV318.externalRequestSent === false
      && sourceNodeV318.schemaMigrationExecuted === false
      && sourceNodeV318.approvalLedgerWritten === false
      && sourceNodeV318.automaticUpstreamStart === false,
    credentialHandleContractCanClose:
      closureReview.movedPrerequisiteId === CREDENTIAL_HANDLE_PREREQUISITE_ID
      && closureReview.movedFrom === "contract-intake-defined"
      && closureReview.movedTo === "contract-intake-and-upstream-echo-complete"
      && sourceNodeV318.requiredFieldCount === 10
      && sourceNodeV318.prohibitedFieldCount === 8
      && sourceNodeV318.rejectionReasonCount === 5
      && sourceNodeV318.noGoBoundaryCount === 9
      && sourceNodeV318.upstreamEchoRequestCount === 2,
    credentialHandleClosureDoesNotOpenRuntime:
      closureReview.completedPrerequisites
        .filter((prerequisite) => prerequisite.id === CREDENTIAL_HANDLE_PREREQUISITE_ID)
        .every((prerequisite) => prerequisite.opensRuntimeShell === false),
    exactlyThreePrerequisitesCompleted:
      closureReview.completedPrerequisiteCount === 3
      && completedIds.includes(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
      && completedIds.includes(SIGNED_ARTIFACT_PREREQUISITE_ID)
      && completedIds.includes(CREDENTIAL_HANDLE_PREREQUISITE_ID),
    threePrerequisitesRemainMissing:
      closureReview.remainingPrerequisiteCount === 3
      && remainingIds.includes(ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID)
      && remainingIds.includes(NO_NETWORK_SAFETY_FIXTURE_PREREQUISITE_ID)
      && remainingIds.includes(ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID)
      && closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.closureState === "still-missing"),
    nextConcretePrerequisiteIsEndpointHandleAllowlist:
      closureReview.nextConcretePrerequisiteId === ENDPOINT_HANDLE_ALLOWLIST_PREREQUISITE_ID
      && closureReview.nextConcretePrerequisiteContractRequired
      && closureReview.nextNodeVersionSuggested === "Node v320",
    noNewJavaMiniKvEchoRequested:
      closureReview.nextJavaVersionRequested === null
      && closureReview.nextMiniKvVersionRequested === null,
    closureReviewStillReadOnly: true,
    runtimeShellStillBlocked: closureReview.runtimeShellStillBlocked,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalPrerequisiteClosureReview:
      false,
  };
}

function collectProductionBlockers(
  checks: CredentialHandleApprovalPrerequisiteClosureReviewChecks,
): CredentialHandleApprovalPrerequisiteClosureReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialHandleApprovalPrerequisiteClosureReviewMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV318Ready
        && checks.sourceNodeV318EchoAligned
        && checks.sourceNodeV318KeepsRuntimeBlocked
        && checks.sourceNodeV318KeepsSideEffectsClosed,
      code: "NODE_V318_UPSTREAM_ECHO_NOT_READY",
      source: "node-v318-credential-handle-approval-contract-upstream-echo-verification",
      message: "Node v318 must be ready, aligned across Node/Java/mini-kv, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.credentialHandleContractCanClose
        && checks.credentialHandleClosureDoesNotOpenRuntime
        && checks.exactlyThreePrerequisitesCompleted
        && checks.threePrerequisitesRemainMissing,
      code: "CREDENTIAL_HANDLE_CLOSURE_COUNTS_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review",
      message: "v319 may advance only credential-handle-approval and must leave three remaining prerequisites missing.",
    },
    {
      condition:
        checks.nextConcretePrerequisiteIsEndpointHandleAllowlist
        && checks.noNewJavaMiniKvEchoRequested
        && checks.closureReviewStillReadOnly
        && checks.runtimeShellStillBlocked,
      code: "NEXT_PREREQUISITE_PLAN_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review",
      message: "v319 may suggest Node v320 endpoint-handle allowlist contract intake only; it must not request new upstream echo or runtime work.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v319 closure review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v319 closure review.",
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

function collectWarnings(): CredentialHandleApprovalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "CREDENTIAL_HANDLE_CLOSURE_DOES_NOT_APPROVE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review",
      message: "v319 advances one prerequisite after read-only echo alignment; it does not approve endpoint, provider/client, network, ledger, schema, or runtime shell work.",
    },
  ];
}

function collectRecommendations(): CredentialHandleApprovalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "DEFINE_ENDPOINT_HANDLE_ALLOWLIST_CONTRACT_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review",
      message: "The next Node step should define a non-secret endpoint-handle allowlist approval contract before requesting Java/mini-kv echo.",
    },
    {
      code: "KEEP_REMAINING_PREREQUISITES_VISIBLE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-prerequisite-closure-review",
      message: "Keep no-network safety fixture and abort/rollback semantics as explicit missing prerequisites after endpoint-handle allowlist contract intake starts.",
    },
  ];
}

function createSummary(
  sourceNodeV318: SourceNodeV318CredentialHandleApprovalContractUpstreamEchoVerificationReference,
  closureReview: CredentialHandleApprovalPrerequisiteClosureReview,
  checks: CredentialHandleApprovalPrerequisiteClosureReviewChecks,
  productionBlockers: CredentialHandleApprovalPrerequisiteClosureReviewMessage[],
  warnings: CredentialHandleApprovalPrerequisiteClosureReviewMessage[],
  recommendations: CredentialHandleApprovalPrerequisiteClosureReviewMessage[],
): CredentialHandleApprovalPrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV318CheckCount: sourceNodeV318.sourceCheckCount,
    sourceNodeV318PassedCheckCount: sourceNodeV318.sourcePassedCheckCount,
    originalPrerequisiteCount: closureReview.originalPrerequisiteCount,
    completedPrerequisiteCount: closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureReview.remainingPrerequisiteCount,
    requiredFieldCount: sourceNodeV318.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV318.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV318.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV318.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV318.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
