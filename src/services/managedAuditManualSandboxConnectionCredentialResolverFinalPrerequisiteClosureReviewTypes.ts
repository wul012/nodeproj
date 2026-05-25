import type { HumanApprovalArtifactReviewPostEchoPrerequisiteId } from "./managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import type {
  ReadOnlyCrossProjectReadinessChecks,
  ReadOnlyCrossProjectReadinessSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerTypes.js";

export interface ManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-final-prerequisite-closure-review.v1";
  reviewState: "final-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision: "advance-abort-rollback-semantics-and-close-prerequisites";
  readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview: boolean;
  readOnlyClosureReview: true;
  finalPrerequisiteClosureReviewOnly: true;
  consumesNodeV327ReadOnlyCrossProjectReadinessRunner: true;
  activeNodeReviewVersion: "Node v328";
  sourceNodeReadinessVersion: "Node v327";
  targetPrerequisiteId: "abort-rollback-semantics";
  allPrerequisitesClosed: boolean;
  readyForImplementationCandidateGate: boolean;
  nextNodeVersionSuggested: "Node v329";
  nextPlanRequired: true;
  readyForRuntimeShellImplementation: false;
  readyForRuntimeShellInvocation: false;
  readyForManagedAuditResolverImplementation: false;
  readyForManagedAuditSandboxAdapterConnection: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  runtimeShellImplemented: false;
  runtimeShellEnabled: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  networkSocketOpened: false;
  javaServiceStarted: false;
  miniKvServiceStarted: false;
  javaSqlExecutionAllowed: false;
  approvalLedgerWritten: false;
  schemaMigrationExecuted: false;
  rollbackExecutionAllowed: false;
  deploymentActionAllowed: false;
  miniKvWriteCommandAllowed: false;
  miniKvLoadAllowed: false;
  miniKvCompactAllowed: false;
  miniKvRestoreAllowed: false;
  miniKvSetnxexAllowed: false;
  automaticUpstreamStart: false;
  sourceNodeV327: SourceNodeV327ReadOnlyCrossProjectReadinessReference;
  closureReview: FinalPrerequisiteClosureReview;
  closureDigest: string;
  checks: FinalPrerequisiteClosureReviewChecks;
  summary: FinalPrerequisiteClosureReviewSummary;
  productionBlockers: FinalPrerequisiteClosureReviewMessage[];
  warnings: FinalPrerequisiteClosureReviewMessage[];
  recommendations: FinalPrerequisiteClosureReviewMessage[];
  evidenceEndpoints: {
    finalPrerequisiteClosureReviewJson: string;
    finalPrerequisiteClosureReviewMarkdown: string;
    sourceNodeV327Json: string;
    sourceNodeV327Markdown: string;
    activePlan: string;
    nextPlan: string;
  };
  nextActions: string[];
}

export interface SourceNodeV327ReadOnlyCrossProjectReadinessReference {
  sourceVersion: "Node v327";
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-read-only-cross-project-readiness-runner.v1";
  runnerState: "read-only-cross-project-readiness-ready" | "blocked";
  readyForReadOnlyCrossProjectReadinessReport: boolean;
  readyForFinalPrerequisiteClosureReview: boolean;
  readinessDigest: string;
  sourceNodeContractVersion: "Node v326";
  sourceJavaVersion: "Java v150";
  sourceMiniKvVersion: "mini-kv v142";
  targetPrerequisiteId: "abort-rollback-semantics";
  javaV150ReadyForNodeConsumption: boolean;
  miniKvV142ReadyForNodeConsumption: boolean;
  sideEffectSafetyMatrixClosed: boolean;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  sourceWarningCount: number;
  sourceRecommendationCount: number;
  sourceChecks: ReadOnlyCrossProjectReadinessChecks;
  sourceSummary: ReadOnlyCrossProjectReadinessSummary;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  externalRequestSent: false;
  httpRequestSent: false;
  tcpConnectionAttempted: false;
  networkSocketOpened: false;
  javaServiceStarted: false;
  miniKvServiceStarted: false;
  javaSqlExecutionAllowed: false;
  approvalLedgerWritten: false;
  schemaMigrationExecuted: false;
  rollbackExecutionAllowed: false;
  deploymentActionAllowed: false;
  miniKvWriteCommandAllowed: false;
  miniKvLoadAllowed: false;
  miniKvCompactAllowed: false;
  miniKvRestoreAllowed: false;
  miniKvSetnxexAllowed: false;
  automaticUpstreamStart: false;
}

export interface FinalClosurePrerequisite {
  id: HumanApprovalArtifactReviewPostEchoPrerequisiteId;
  label: string;
  closureState: "completed-before-node-v328" | "final-cross-project-readiness-complete";
  evidence: string;
  requiredBeforeRuntimeShell: true;
  opensRuntimeShell: false;
}

export interface FinalPrerequisiteClosureReview {
  reviewDigest: string;
  reviewMode: "final-prerequisite-closure-review-only";
  sourceSpan: "Node v327";
  sourceReadinessDigest: string;
  completedPrerequisites: FinalClosurePrerequisite[];
  remainingPrerequisites: [];
  completedPrerequisiteCount: 6;
  remainingPrerequisiteCount: 0;
  originalPrerequisiteCount: 6;
  movedPrerequisiteId: "abort-rollback-semantics";
  movedFrom: "contract-intake-and-cross-project-readiness-complete";
  movedTo: "final-prerequisite-complete";
  allPrerequisitesClosed: boolean;
  nextNodeVersionSuggested: "Node v329";
  nextStepMode: "implementation-candidate-gate-only";
  runtimeShellStillBlocked: true;
  closureReason: string;
}

export type FinalPrerequisiteClosureReviewChecks = {
  sourceNodeV327Ready: boolean;
  sourceNodeV327ReadinessReportReady: boolean;
  sourceNodeV327FinalClosureReady: boolean;
  sourceNodeV327KeepsRuntimeBlocked: boolean;
  sourceNodeV327KeepsSideEffectsClosed: boolean;
  sourceJavaV150Consumed: boolean;
  sourceMiniKvV142Consumed: boolean;
  abortRollbackSemanticsCanClose: boolean;
  allSixPrerequisitesCompleted: boolean;
  noPrerequisitesRemain: boolean;
  finalClosureDoesNotOpenRuntime: boolean;
  implementationCandidateGateOnly: boolean;
  noNewJavaMiniKvEchoRequested: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverFinalPrerequisiteClosureReview: boolean;
};

export interface FinalPrerequisiteClosureReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceNodeV327CheckCount: number;
  sourceNodeV327PassedCheckCount: number;
  originalPrerequisiteCount: 6;
  completedPrerequisiteCount: 6;
  remainingPrerequisiteCount: 0;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface FinalPrerequisiteClosureReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v327-readiness-runner"
    | "final-prerequisite-closure-review"
    | "runtime-boundary"
    | "configuration"
    | "next-step";
  message: string;
}
