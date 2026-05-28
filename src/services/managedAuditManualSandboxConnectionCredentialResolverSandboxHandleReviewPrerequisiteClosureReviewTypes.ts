import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationTypes.js";

export interface SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference {
  sourceVersion: "Node v361";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForPrerequisiteClosureReview: boolean;
  archiveVerificationDigest: string;
  sourceDecisionDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  inputCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
}

export type SandboxHandleReviewClosureItemId =
  | "managed-audit-disabled-read-only-integration"
  | "sandbox-handle-review-prerequisite-intake"
  | "sandbox-handle-review-contract-decision"
  | "sandbox-handle-review-packet-gate-decision-record";

export interface SandboxHandleReviewClosureItem {
  id: SandboxHandleReviewClosureItemId;
  label: string;
  closureState:
    | "completed-before-node-v362"
    | "decision-record-archive-complete";
  evidence: string;
  requiredBeforeSandboxHandleReview: true;
  opensCredentialValue: false;
  opensRawEndpointUrl: false;
  opensProviderClient: false;
  opensRuntimeShell: false;
  opensManagedAuditConnection: false;
  mutatesUpstreamState: false;
}

export interface SandboxHandleReviewPrerequisiteClosureReview {
  reviewDigest: string;
  reviewMode: "sandbox-handle-review-prerequisite-closure-review-only";
  sourceSpan: "Node v361";
  sourceArchiveVerificationDigest: string;
  sourceDecisionDigest: string;
  completedClosureItems: SandboxHandleReviewClosureItem[];
  remainingClosureItems: SandboxHandleReviewClosureItem[];
  completedClosureItemCount: number;
  remainingClosureItemCount: number;
  originalClosureItemCount: number;
  movedClosureItemId: "sandbox-handle-review-packet-gate-decision-record";
  movedFrom: "decision-record-complete";
  movedTo: "decision-record-archive-complete";
  closureDecision:
    | "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review"
    | "blocked";
  nextNodeVersionSuggested: "Node v363";
  nextJavaVersionRequested: null;
  nextMiniKvVersionRequested: null;
  allowsPrerequisiteClosureArchiveVerification: boolean;
  allowsCredentialValue: false;
  allowsRawEndpointUrl: false;
  allowsProviderClient: false;
  allowsRuntimeShell: false;
  allowsManagedAuditConnection: false;
  allowsUpstreamMutation: false;
  closureReason: string;
}

export type SandboxHandleReviewPrerequisiteClosureReviewChecks = {
  sourceNodeV361Ready: boolean;
  sourceArchiveVerificationComplete: boolean;
  sourceDecisionAllowsClosureReview: boolean;
  sourceArchiveFilesComplete: boolean;
  sourceChecksAllPassed: boolean;
  sourcePacketGateShapePreserved: boolean;
  sourceKeepsCredentialAndEndpointClosed: boolean;
  sourceKeepsRuntimeAndConnectionClosed: boolean;
  sourceKeepsUpstreamsClosed: boolean;
  closureItemsComplete: boolean;
  noRemainingClosureItems: boolean;
  closureDigestStable: boolean;
  closureDecisionLimitedToNonExecutableReview: boolean;
  nextStepIsArchiveVerification: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noManagedAuditHttpTcp: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noJavaMiniKvEchoRequired: boolean;
  upstreamProbesStillDisabled: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForSandboxHandleReviewPrerequisiteClosureReview: boolean;
};

export interface SandboxHandleReviewPrerequisiteClosureReviewSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  originalClosureItemCount: number;
  completedClosureItemCount: number;
  remainingClosureItemCount: number;
  inputCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPrerequisiteClosureReviewMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v361"
    | "closure-review"
    | "runtime-boundary"
    | "runtime-config"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-closure-review.v1";
  reviewState: "sandbox-handle-review-prerequisite-closure-review-ready" | "blocked";
  prerequisiteClosureDecision:
    | "close-sandbox-handle-review-prerequisite-chain-for-non-executable-review"
    | "blocked";
  readyForSandboxHandleReviewPrerequisiteClosureReview: boolean;
  readyForNodeV363SandboxHandleReviewPrerequisiteClosureArchiveVerification: boolean;
  consumesNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: true;
  activeNodeVersion: "Node v362";
  sourceNodeVersion: "Node v361";
  closureReviewOnly: true;
  readOnlyClosureReview: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV361: SourceNodeV361SandboxHandleReviewPrerequisiteClosureReference;
  closureReview: SandboxHandleReviewPrerequisiteClosureReview;
  checks: SandboxHandleReviewPrerequisiteClosureReviewChecks;
  summary: SandboxHandleReviewPrerequisiteClosureReviewSummary;
  productionBlockers: SandboxHandleReviewPrerequisiteClosureReviewMessage[];
  warnings: SandboxHandleReviewPrerequisiteClosureReviewMessage[];
  recommendations: SandboxHandleReviewPrerequisiteClosureReviewMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPrerequisiteClosureReviewJson: string;
    sandboxHandleReviewPrerequisiteClosureReviewMarkdown: string;
    sourceNodeV361Json: string;
    sourceNodeV361Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
