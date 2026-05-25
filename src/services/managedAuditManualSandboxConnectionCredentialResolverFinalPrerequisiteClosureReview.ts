import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  type HumanApprovalArtifactReviewPostEchoPrerequisiteId,
} from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner,
} from "./managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.js";
import type {
  FinalClosurePrerequisite,
  FinalPrerequisiteClosureReview,
  FinalPrerequisiteClosureReviewChecks,
  FinalPrerequisiteClosureReviewMessage,
  FinalPrerequisiteClosureReviewSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile,
  SourceNodeV327ReadOnlyCrossProjectReadinessReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review";
const SOURCE_NODE_V327_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner";
const ACTIVE_PLAN = "docs/plans2/v325-post-no-network-safety-fixture-prerequisite-closure-roadmap.md";
const NEXT_PLAN = "docs/plans2/v328-post-final-prerequisite-closure-roadmap.md";
const ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID =
  "abort-rollback-semantics" satisfies HumanApprovalArtifactReviewPostEchoPrerequisiteId;

const COMPLETED_BEFORE_NODE_V328: ReadonlyMap<HumanApprovalArtifactReviewPostEchoPrerequisiteId, string> = new Map([
  [
    "java-mini-kv-decision-echo",
    "Node v312 closed the Java/mini-kv decision echo prerequisite after the v311 upstream echo verification.",
  ],
  [
    "signed-human-approval-artifact",
    "Node v316 closed the signed-human-approval-artifact prerequisite after the v315 upstream echo verification.",
  ],
  [
    "credential-handle-approval",
    "Node v319 closed the credential-handle-approval prerequisite after the v318 upstream echo verification.",
  ],
  [
    "endpoint-handle-allowlist-approval",
    "Node v322 closed the endpoint-handle-allowlist-approval prerequisite after the v321 upstream echo verification.",
  ],
  [
    "no-network-safety-fixture",
    "Node v325 closed the no-network-safety-fixture prerequisite after the v324 upstream echo verification.",
  ],
]);

export function loadManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview(input: {
  config: AppConfig;
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  };
}): ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile {
  const sourceNodeV327 = createSourceNodeV327(input.config, input.evidencePaths);
  const closureReview = createClosureReview(sourceNodeV327);
  const checks = createChecks(input.config, sourceNodeV327, closureReview);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview")
      .every(([, value]) => value);
  const reviewState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview
    ? "final-prerequisite-closure-review-ready"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV327, closureReview, checks, productionBlockers, warnings, recommendations);
  const closureDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    sourceReadinessDigest: sourceNodeV327.readinessDigest,
    closureReview,
    checks,
  });

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver final prerequisite closure review",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    reviewState,
    prerequisiteClosureDecision: "advance-abort-rollback-semantics-and-close-prerequisites",
    readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
    readOnlyClosureReview: true,
    finalPrerequisiteClosureReviewOnly: true,
    consumesNodeV327ReadOnlyCrossProjectReadinessRunner: true,
    activeNodeReviewVersion: "Node v328",
    sourceNodeReadinessVersion: "Node v327",
    targetPrerequisiteId: ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID,
    allPrerequisitesClosed: closureReview.allPrerequisitesClosed,
    readyForImplementationCandidateGate:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview,
    nextNodeVersionSuggested: "Node v329",
    nextPlanRequired: true,
    readyForRuntimeShellImplementation: false,
    readyForRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    javaServiceStarted: false,
    miniKvServiceStarted: false,
    javaSqlExecutionAllowed: false,
    approvalLedgerWritten: false,
    schemaMigrationExecuted: false,
    rollbackExecutionAllowed: false,
    deploymentActionAllowed: false,
    miniKvWriteCommandAllowed: false,
    miniKvLoadAllowed: false,
    miniKvCompactAllowed: false,
    miniKvRestoreAllowed: false,
    miniKvSetnxexAllowed: false,
    automaticUpstreamStart: false,
    sourceNodeV327,
    closureReview,
    closureDigest,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      finalPrerequisiteClosureReviewJson: ROUTE_PATH,
      finalPrerequisiteClosureReviewMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV327Json: SOURCE_NODE_V327_ROUTE,
      sourceNodeV327Markdown: `${SOURCE_NODE_V327_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
    },
    nextActions: [
      "Archive Node v328 as the final prerequisite closure review and stop adding another prerequisite closure layer.",
      "Open the next plan at Node v329 as an implementation candidate gate only; do not implement runtime shell in v328.",
      "Keep credential values, raw endpoint URLs, HTTP/TCP, Java SQL, rollback, ledger/schema writes, mini-kv writes, and automatic upstream start closed.",
    ],
  };
}

function createSourceNodeV327(
  config: AppConfig,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
  },
): SourceNodeV327ReadOnlyCrossProjectReadinessReference {
  const source = loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
    config,
    evidencePaths,
  });

  return {
    sourceVersion: "Node v327",
    profileVersion: source.profileVersion,
    runnerState: source.runnerState,
    readyForReadOnlyCrossProjectReadinessReport: source.readyForReadOnlyCrossProjectReadinessReport,
    readyForFinalPrerequisiteClosureReview: source.readyForFinalPrerequisiteClosureReview,
    readinessDigest: source.readinessDigest,
    sourceNodeContractVersion: source.sourceNodeContractVersion,
    sourceJavaVersion: source.sourceJavaVersion,
    sourceMiniKvVersion: source.sourceMiniKvVersion,
    targetPrerequisiteId: source.targetPrerequisiteId,
    javaV150ReadyForNodeConsumption: source.javaV150Evidence.readyForNodeConsumption,
    miniKvV142ReadyForNodeConsumption: source.miniKvV142Receipt.readyForNodeConsumption,
    sideEffectSafetyMatrixClosed: source.sideEffectSafetyMatrix.allSideEffectsClosed,
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
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    networkSocketOpened: source.networkSocketOpened,
    javaServiceStarted: source.javaServiceStarted,
    miniKvServiceStarted: source.miniKvServiceStarted,
    javaSqlExecutionAllowed: source.javaSqlExecutionAllowed,
    approvalLedgerWritten: source.approvalLedgerWritten,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    rollbackExecutionAllowed: source.rollbackExecutionAllowed,
    deploymentActionAllowed: source.deploymentActionAllowed,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
    miniKvLoadAllowed: source.miniKvLoadAllowed,
    miniKvCompactAllowed: source.miniKvCompactAllowed,
    miniKvRestoreAllowed: source.miniKvRestoreAllowed,
    miniKvSetnxexAllowed: source.miniKvSetnxexAllowed,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createClosureReview(
  sourceNodeV327: SourceNodeV327ReadOnlyCrossProjectReadinessReference,
): FinalPrerequisiteClosureReview {
  const completedPrerequisites = createCompletedPrerequisites(sourceNodeV327);
  const reviewDigest = sha256StableJson({
    sourceReadinessDigest: sourceNodeV327.readinessDigest,
    completedPrerequisites,
    movedPrerequisiteId: ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID,
    nextNodeVersionSuggested: "Node v329",
  });

  return {
    reviewDigest,
    reviewMode: "final-prerequisite-closure-review-only",
    sourceSpan: "Node v327",
    sourceReadinessDigest: sourceNodeV327.readinessDigest,
    completedPrerequisites,
    remainingPrerequisites: [],
    completedPrerequisiteCount: 6,
    remainingPrerequisiteCount: 0,
    originalPrerequisiteCount: 6,
    movedPrerequisiteId: ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID,
    movedFrom: "contract-intake-and-cross-project-readiness-complete",
    movedTo: "final-prerequisite-complete",
    allPrerequisitesClosed: completedPrerequisites.length === 6,
    nextNodeVersionSuggested: "Node v329",
    nextStepMode: "implementation-candidate-gate-only",
    runtimeShellStillBlocked: true,
    closureReason:
      "Node v327 proved the final abort/rollback semantics prerequisite through read-only Java v150 and mini-kv v142 evidence, so v328 can close the six-prerequisite catalog without opening runtime execution.",
  };
}

function createCompletedPrerequisites(
  sourceNodeV327: SourceNodeV327ReadOnlyCrossProjectReadinessReference,
): FinalClosurePrerequisite[] {
  return HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.map((entry) => {
    if (entry.id === ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID) {
      return {
        id: entry.id,
        label: entry.closureLabel,
        closureState: "final-cross-project-readiness-complete",
        evidence:
          `Node v327 readiness digest ${sourceNodeV327.readinessDigest} consumed Java v150 evidence and mini-kv v142 receipt.`,
        requiredBeforeRuntimeShell: true,
        opensRuntimeShell: false,
      };
    }

    return {
      id: entry.id,
      label: entry.closureLabel,
      closureState: "completed-before-node-v328",
      evidence: COMPLETED_BEFORE_NODE_V328.get(entry.id) ?? entry.closureMissingEvidence,
      requiredBeforeRuntimeShell: true,
      opensRuntimeShell: false,
    };
  });
}

function createChecks(
  config: AppConfig,
  sourceNodeV327: SourceNodeV327ReadOnlyCrossProjectReadinessReference,
  closureReview: FinalPrerequisiteClosureReview,
): FinalPrerequisiteClosureReviewChecks {
  return {
    sourceNodeV327Ready:
      sourceNodeV327.runnerState === "read-only-cross-project-readiness-ready"
      && sourceNodeV327.sourceProductionBlockerCount === 0,
    sourceNodeV327ReadinessReportReady: sourceNodeV327.readyForReadOnlyCrossProjectReadinessReport,
    sourceNodeV327FinalClosureReady: sourceNodeV327.readyForFinalPrerequisiteClosureReview,
    sourceNodeV327KeepsRuntimeBlocked:
      !sourceNodeV327.runtimeShellImplemented
      && !sourceNodeV327.runtimeShellInvocationAllowed
      && !sourceNodeV327.executionAllowed,
    sourceNodeV327KeepsSideEffectsClosed:
      sourceNodeV327.sideEffectSafetyMatrixClosed
      && !sourceNodeV327.connectsManagedAudit
      && !sourceNodeV327.credentialValueRead
      && !sourceNodeV327.rawEndpointUrlParsed
      && !sourceNodeV327.externalRequestSent
      && !sourceNodeV327.httpRequestSent
      && !sourceNodeV327.tcpConnectionAttempted
      && !sourceNodeV327.networkSocketOpened
      && !sourceNodeV327.javaServiceStarted
      && !sourceNodeV327.miniKvServiceStarted
      && !sourceNodeV327.javaSqlExecutionAllowed
      && !sourceNodeV327.approvalLedgerWritten
      && !sourceNodeV327.schemaMigrationExecuted
      && !sourceNodeV327.rollbackExecutionAllowed
      && !sourceNodeV327.deploymentActionAllowed
      && !sourceNodeV327.miniKvWriteCommandAllowed
      && !sourceNodeV327.miniKvLoadAllowed
      && !sourceNodeV327.miniKvCompactAllowed
      && !sourceNodeV327.miniKvRestoreAllowed
      && !sourceNodeV327.miniKvSetnxexAllowed
      && !sourceNodeV327.automaticUpstreamStart,
    sourceJavaV150Consumed: sourceNodeV327.javaV150ReadyForNodeConsumption,
    sourceMiniKvV142Consumed: sourceNodeV327.miniKvV142ReadyForNodeConsumption,
    abortRollbackSemanticsCanClose:
      closureReview.movedPrerequisiteId === ABORT_ROLLBACK_SEMANTICS_PREREQUISITE_ID
      && closureReview.movedTo === "final-prerequisite-complete",
    allSixPrerequisitesCompleted: closureReview.completedPrerequisiteCount === 6 && closureReview.allPrerequisitesClosed,
    noPrerequisitesRemain: closureReview.remainingPrerequisiteCount === 0 && closureReview.remainingPrerequisites.length === 0,
    finalClosureDoesNotOpenRuntime: closureReview.runtimeShellStillBlocked,
    implementationCandidateGateOnly: closureReview.nextStepMode === "implementation-candidate-gate-only",
    noNewJavaMiniKvEchoRequested: true,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview: false,
  };
}

function collectProductionBlockers(
  checks: FinalPrerequisiteClosureReviewChecks,
): FinalPrerequisiteClosureReviewMessage[] {
  const blockers: FinalPrerequisiteClosureReviewMessage[] = [];
  addBlocker(blockers, checks.sourceNodeV327Ready, "NODE_V327_NOT_READY", "node-v327-readiness-runner",
    "Node v327 read-only cross-project readiness runner is not ready.");
  addBlocker(blockers, checks.sourceNodeV327ReadinessReportReady, "NODE_V327_REPORT_NOT_READY",
    "node-v327-readiness-runner", "Node v327 readiness report is not ready.");
  addBlocker(blockers, checks.sourceNodeV327FinalClosureReady, "NODE_V327_FINAL_CLOSURE_NOT_READY",
    "node-v327-readiness-runner", "Node v327 does not allow final prerequisite closure review.");
  addBlocker(blockers, checks.sourceNodeV327KeepsRuntimeBlocked, "RUNTIME_BOUNDARY_OPEN", "runtime-boundary",
    "Runtime shell implementation or invocation is no longer blocked.");
  addBlocker(blockers, checks.sourceNodeV327KeepsSideEffectsClosed, "SIDE_EFFECT_BOUNDARY_OPEN", "runtime-boundary",
    "One or more network, credential, SQL, rollback, ledger, schema, or mini-kv side effects are open.");
  addBlocker(blockers, checks.sourceJavaV150Consumed, "JAVA_V150_NOT_CONSUMED", "node-v327-readiness-runner",
    "Node v327 did not consume Java v150 evidence.");
  addBlocker(blockers, checks.sourceMiniKvV142Consumed, "MINI_KV_V142_NOT_CONSUMED", "node-v327-readiness-runner",
    "Node v327 did not consume mini-kv v142 receipt.");
  addBlocker(blockers, checks.abortRollbackSemanticsCanClose, "ABORT_ROLLBACK_SEMANTICS_CANNOT_CLOSE",
    "final-prerequisite-closure-review", "Abort/rollback semantics prerequisite cannot close.");
  addBlocker(blockers, checks.allSixPrerequisitesCompleted, "NOT_ALL_PREREQUISITES_COMPLETED",
    "final-prerequisite-closure-review", "The six-prerequisite catalog is not fully completed.");
  addBlocker(blockers, checks.noPrerequisitesRemain, "PREREQUISITES_STILL_REMAIN",
    "final-prerequisite-closure-review", "At least one prerequisite remains open.");
  addBlocker(blockers, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for final closure review.");
  addBlocker(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for final closure review.");
  return blockers;
}

function collectWarnings(): FinalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "FINAL_PREREQUISITE_CLOSURE_IS_NOT_RUNTIME_PERMISSION",
      severity: "warning",
      source: "next-step",
      message: "v328 closes the prerequisite catalog only; runtime implementation still needs a separate candidate gate.",
    },
  ];
}

function collectRecommendations(): FinalPrerequisiteClosureReviewMessage[] {
  return [
    {
      code: "OPEN_V329_CANDIDATE_GATE_PLAN",
      severity: "recommendation",
      source: "next-step",
      message: "Start the next plan with Node v329 implementation candidate gate and keep it non-executing.",
    },
    {
      code: "HARDEN_INPUT_EXPORTS_BEFORE_RUNTIME",
      severity: "recommendation",
      source: "next-step",
      message: "After final closure, harden read-only input exports and historical fallback before any real adapter work.",
    },
  ];
}

function createSummary(
  sourceNodeV327: SourceNodeV327ReadOnlyCrossProjectReadinessReference,
  closureReview: FinalPrerequisiteClosureReview,
  checks: FinalPrerequisiteClosureReviewChecks,
  productionBlockers: readonly FinalPrerequisiteClosureReviewMessage[],
  warnings: readonly FinalPrerequisiteClosureReviewMessage[],
  recommendations: readonly FinalPrerequisiteClosureReviewMessage[],
): FinalPrerequisiteClosureReviewSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV327CheckCount: sourceNodeV327.sourceCheckCount,
    sourceNodeV327PassedCheckCount: sourceNodeV327.sourcePassedCheckCount,
    originalPrerequisiteCount: closureReview.originalPrerequisiteCount,
    completedPrerequisiteCount: closureReview.completedPrerequisiteCount,
    remainingPrerequisiteCount: closureReview.remainingPrerequisiteCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: FinalPrerequisiteClosureReviewMessage[],
  condition: boolean,
  code: string,
  source: FinalPrerequisiteClosureReviewMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
