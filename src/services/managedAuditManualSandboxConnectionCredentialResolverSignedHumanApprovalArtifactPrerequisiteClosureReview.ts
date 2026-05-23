import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  getHumanApprovalArtifactReviewPostEchoPrerequisite,
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile,
  SignedHumanApprovalArtifactClosurePrerequisite,
  SignedHumanApprovalArtifactPrerequisiteClosureReview,
  SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks,
  SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage,
  SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary,
  SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review";
const SOURCE_NODE_V315_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans2/v313-post-prerequisite-catalog-cleanup-roadmap.md";
const NEXT_PLAN = "docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md";

const SIGNED_ARTIFACT_PREREQUISITE_ID =
  "signed-human-approval-artifact" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;
const CREDENTIAL_HANDLE_PREREQUISITE_ID =
  "credential-handle-approval" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;

export function loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReviewProfile {
  const sourceNodeV315 = createSourceNodeV315(input.config);
  const closureReview = createClosureReview(sourceNodeV315);
  const checks = createChecks(input.config, sourceNodeV315, closureReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview
    ? "signed-human-approval-artifact-prerequisite-closure-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV315, closureReview, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver signed human approval artifact prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    prerequisiteClosureDecision: "advance-signed-human-approval-artifact-only",
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview,
    readOnlyClosureReview: true,
    signedHumanApprovalArtifactPrerequisiteClosureReviewOnly: true,
    consumesNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerification: true,
    activeNodeReviewVersion: "Node v316",
    readyForNewJavaMiniKvEchoRequest: false,
    newJavaMiniKvEchoRequested: false,
    readyForCredentialHandleContractIntake: true,
    nextNodeVersionSuggested: "Node v317",
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
    sourceNodeV315,
    closureReview,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      signedHumanApprovalArtifactPrerequisiteClosureReviewJson: ROUTE_PATH,
      signedHumanApprovalArtifactPrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV315Json: SOURCE_NODE_V315_ROUTE,
      sourceNodeV315Markdown: `${SOURCE_NODE_V315_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v316 as the closure review that advances signed-human-approval-artifact only after Node v315 echo alignment.",
      "Do not request Java or mini-kv echo for credential-handle-approval until Node v317 defines that next non-secret contract.",
      "Keep runtime shell, credential value, raw endpoint URL, provider/client, HTTP/TCP, ledger, schema, and auto-start boundaries closed.",
    ],
  };
}

function createSourceNodeV315(
  config: AppConfig,
): SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification({
    config,
  });

  return {
    sourceVersion: "Node v315",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactContractUpstreamEchoVerification,
    readOnlyUpstreamEchoVerification: source.readOnlyUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV314Ready: source.echoVerification.sourceNodeV314Ready,
    javaV145EchoReady: source.echoVerification.javaV145EchoReady,
    miniKvV138ReceiptReady: source.echoVerification.miniKvV138ReceiptReady,
    upstreamEchoAligned: source.echoVerification.upstreamEchoAligned,
    artifactContractAligned: source.echoVerification.artifactContractAligned,
    sideEffectBoundariesAligned: source.echoVerification.sideEffectBoundariesAligned,
    implementationStillBlocked: source.echoVerification.implementationStillBlocked,
    contractDigest: source.sourceNodeV314.contractDigest,
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
  sourceNodeV315: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
): SignedHumanApprovalArtifactPrerequisiteClosureReview {
  const completedPrerequisites: SignedHumanApprovalArtifactClosurePrerequisite[] = [
    completedBeforeV316(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID),
    completedSignedArtifact(sourceNodeV315),
  ];
  const remainingPrerequisites = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG
    .filter((entry) =>
      entry.id !== JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID
      && entry.id !== SIGNED_ARTIFACT_PREREQUISITE_ID)
    .map((entry) => missing(entry.id));
  const record = {
    reviewMode: "signed-human-approval-artifact-prerequisite-closure-review-only" as const,
    sourceSpan: "Node v315" as const,
    sourceVerificationDigest: sourceNodeV315.verificationDigest,
    completedPrerequisites,
    remainingPrerequisites,
    completedPrerequisiteCount: completedPrerequisites.length,
    remainingPrerequisiteCount: remainingPrerequisites.length,
    originalPrerequisiteCount: HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.length,
    movedPrerequisiteId: SIGNED_ARTIFACT_PREREQUISITE_ID as "signed-human-approval-artifact",
    movedFrom: "contract-intake-defined" as const,
    movedTo: "contract-intake-and-upstream-echo-complete" as const,
    nextConcretePrerequisiteId: CREDENTIAL_HANDLE_PREREQUISITE_ID as "credential-handle-approval",
    nextConcretePrerequisiteContractRequired: true as const,
    nextNodeVersionSuggested: "Node v317" as const,
    nextJavaVersionRequested: null,
    nextMiniKvVersionRequested: null,
    chainContinuationAllowed: true as const,
    runtimeShellStillBlocked: true as const,
    closureReason:
      "Node v315 verified Node v314 signed artifact contract plus Java v145 and mini-kv v138 read-only echo alignment.",
  };

  return {
    reviewDigest: sha256StableJson({ profileVersion: PROFILE_VERSION, record }),
    ...record,
  };
}

function completedBeforeV316(
  id: typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
): SignedHumanApprovalArtifactClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(id);

  return {
    id,
    label: entry.closureLabel,
    closureState: "completed-before-node-v316",
    evidence: "Node v312 already closed this prerequisite after Node v311 verified Java v144 and mini-kv v137.",
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function completedSignedArtifact(
  sourceNodeV315: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
): SignedHumanApprovalArtifactClosurePrerequisite {
  const entry = getHumanApprovalArtifactReviewPostEchoPrerequisite(SIGNED_ARTIFACT_PREREQUISITE_ID);

  return {
    id: SIGNED_ARTIFACT_PREREQUISITE_ID,
    label: entry.closureLabel,
    closureState: "contract-intake-and-upstream-echo-complete",
    evidence:
      `Node v315 verified contract ${sourceNodeV315.contractDigest} with Java v145 and mini-kv v138 read-only echoes.`,
    requiredBeforeRuntimeShell: true,
    opensRuntimeShell: false,
  };
}

function missing(
  id: Exclude<
    HumanApprovalArtifactReviewPostEchoPrerequisiteId,
    typeof JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID | typeof SIGNED_ARTIFACT_PREREQUISITE_ID
  >,
): SignedHumanApprovalArtifactClosurePrerequisite {
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

function createChecks(
  config: AppConfig,
  sourceNodeV315: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
  closureReview: SignedHumanApprovalArtifactPrerequisiteClosureReview,
): SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks {
  return {
    sourceNodeV315Ready: sourceNodeV315.readyForSignedHumanApprovalArtifactContractUpstreamEchoVerification,
    sourceNodeV315EchoAligned:
      sourceNodeV315.sourceNodeV314Ready
      && sourceNodeV315.javaV145EchoReady
      && sourceNodeV315.miniKvV138ReceiptReady
      && sourceNodeV315.upstreamEchoAligned
      && sourceNodeV315.artifactContractAligned
      && sourceNodeV315.sideEffectBoundariesAligned,
    sourceNodeV315KeepsRuntimeBlocked:
      sourceNodeV315.implementationStillBlocked
      && sourceNodeV315.runtimeShellImplemented === false
      && sourceNodeV315.runtimeShellInvocationAllowed === false,
    sourceNodeV315KeepsSideEffectsClosed:
      sourceNodeV315.executionAllowed === false
      && sourceNodeV315.connectsManagedAudit === false
      && sourceNodeV315.credentialValueRead === false
      && sourceNodeV315.rawEndpointUrlParsed === false
      && sourceNodeV315.externalRequestSent === false
      && sourceNodeV315.schemaMigrationExecuted === false
      && sourceNodeV315.approvalLedgerWritten === false
      && sourceNodeV315.automaticUpstreamStart === false,
    signedArtifactContractCanClose:
      closureReview.movedPrerequisiteId === SIGNED_ARTIFACT_PREREQUISITE_ID
      && closureReview.movedFrom === "contract-intake-defined"
      && closureReview.movedTo === "contract-intake-and-upstream-echo-complete"
      && sourceNodeV315.requiredFieldCount === 11
      && sourceNodeV315.prohibitedFieldCount === 8
      && sourceNodeV315.rejectionReasonCount === 5
      && sourceNodeV315.noGoBoundaryCount === 8
      && sourceNodeV315.upstreamEchoRequestCount === 2,
    signedArtifactClosureDoesNotOpenRuntime:
      closureReview.completedPrerequisites
        .filter((prerequisite) => prerequisite.id === SIGNED_ARTIFACT_PREREQUISITE_ID)
        .every((prerequisite) => prerequisite.opensRuntimeShell === false),
    exactlyTwoPrerequisitesCompleted:
      closureReview.completedPrerequisiteCount === 2
      && closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id).includes(JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID)
      && closureReview.completedPrerequisites.map((prerequisite) => prerequisite.id).includes(SIGNED_ARTIFACT_PREREQUISITE_ID),
    fourPrerequisitesRemainMissing:
      closureReview.remainingPrerequisiteCount === 4
      && closureReview.remainingPrerequisites.every((prerequisite) => prerequisite.closureState === "still-missing"),
    nextConcretePrerequisiteIsCredentialHandle:
      closureReview.nextConcretePrerequisiteId === CREDENTIAL_HANDLE_PREREQUISITE_ID
      && closureReview.nextConcretePrerequisiteContractRequired
      && closureReview.nextNodeVersionSuggested === "Node v317",
    noNewJavaMiniKvEchoRequested:
      closureReview.nextJavaVersionRequested === null
      && closureReview.nextMiniKvVersionRequested === null,
    closureReviewStillReadOnly: true,
    runtimeShellStillBlocked: closureReview.runtimeShellStillBlocked,
    upstreamProbesStillDisabled: config.upstreamProbesEnabled === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverSignedHumanApprovalArtifactPrerequisiteClosureReview:
      false,
  };
}

function collectProductionBlockers(
  checks: SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks,
): SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage["source"];
    message: string;
  }> = [
    {
      condition:
        checks.sourceNodeV315Ready
        && checks.sourceNodeV315EchoAligned
        && checks.sourceNodeV315KeepsRuntimeBlocked
        && checks.sourceNodeV315KeepsSideEffectsClosed,
      code: "NODE_V315_UPSTREAM_ECHO_NOT_READY",
      source: "node-v315-signed-human-approval-artifact-contract-upstream-echo-verification",
      message: "Node v315 must be ready, aligned across Node/Java/mini-kv, and keep runtime and side-effect boundaries closed.",
    },
    {
      condition:
        checks.signedArtifactContractCanClose
        && checks.signedArtifactClosureDoesNotOpenRuntime
        && checks.exactlyTwoPrerequisitesCompleted
        && checks.fourPrerequisitesRemainMissing,
      code: "SIGNED_ARTIFACT_CLOSURE_COUNTS_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review",
      message: "v316 may advance only signed-human-approval-artifact and must leave four remaining prerequisites missing.",
    },
    {
      condition:
        checks.nextConcretePrerequisiteIsCredentialHandle
        && checks.noNewJavaMiniKvEchoRequested
        && checks.closureReviewStillReadOnly
        && checks.runtimeShellStillBlocked,
      code: "NEXT_PREREQUISITE_PLAN_NOT_SAFE",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review",
      message: "v316 may suggest Node v317 credential-handle contract intake only; it must not request new upstream echo or runtime work.",
    },
    {
      condition: checks.upstreamProbesStillDisabled,
      code: "UPSTREAM_PROBES_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED must remain false during v316 closure review.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false during v316 closure review.",
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

function collectWarnings(): SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "SIGNED_ARTIFACT_CLOSURE_DOES_NOT_APPROVE_RUNTIME",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review",
      message: "v316 advances one prerequisite after read-only echo alignment; it does not approve credential, endpoint, provider/client, network, ledger, schema, or runtime shell work.",
    },
  ];
}

function collectRecommendations(): SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "DEFINE_CREDENTIAL_HANDLE_APPROVAL_CONTRACT_NEXT",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review",
      message: "The next Node step should define a non-secret credential-handle approval contract before requesting Java/mini-kv echo.",
    },
    {
      code: "KEEP_REMAINING_PREREQUISITES_VISIBLE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review",
      message: "Keep endpoint-handle allowlist, no-network safety fixture, and abort/rollback semantics as explicit missing prerequisites.",
    },
  ];
}

function createSummary(
  sourceNodeV315: SourceNodeV315SignedHumanApprovalArtifactContractUpstreamEchoVerificationReference,
  closureReview: SignedHumanApprovalArtifactPrerequisiteClosureReview,
  checks: SignedHumanApprovalArtifactPrerequisiteClosureReviewChecks,
  productionBlockers: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[],
  warnings: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[],
  recommendations: SignedHumanApprovalArtifactPrerequisiteClosureReviewMessage[],
): SignedHumanApprovalArtifactPrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV315CheckCount: sourceNodeV315.sourceCheckCount,
    sourceNodeV315PassedCheckCount: sourceNodeV315.sourcePassedCheckCount,
    originalPrerequisiteCount: closureReview.originalPrerequisiteCount,
    completedPrerequisiteCount: closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureReview.remainingPrerequisiteCount,
    requiredFieldCount: sourceNodeV315.requiredFieldCount,
    prohibitedFieldCount: sourceNodeV315.prohibitedFieldCount,
    rejectionReasonCount: sourceNodeV315.rejectionReasonCount,
    noGoBoundaryCount: sourceNodeV315.noGoBoundaryCount,
    upstreamEchoRequestCount: sourceNodeV315.upstreamEchoRequestCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}
