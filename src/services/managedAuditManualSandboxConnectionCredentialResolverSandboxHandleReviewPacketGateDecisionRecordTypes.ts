import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationTypes.js";

export interface SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference {
  sourceVersion: "Node v359";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV360DecisionRecord: boolean;
  archiveVerificationDigest: string;
  sourceIntakeDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
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

export interface SandboxHandleReviewPacketGateDecisionNecessityProof {
  blockerResolved: "verified-packet-gate-intake-archive-needs-explicit-next-stage-decision";
  consumedBy: "Node v361 sandbox handle review packet/gate decision record archive verification or later prerequisite closure review";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface SandboxHandleReviewPacketGateDecisionInput {
  id: string;
  label: string;
  source:
    | "node-v359"
    | "packet-gate-contract"
    | "boundary-policy"
    | "human-review-policy"
    | "future-stage";
  requiredForDecision: boolean;
  status: "available" | "closed" | "not-requested";
  notes: string;
}

export interface SandboxHandleReviewPacketGateDecisionRecord {
  decisionDigest: string;
  decisionMode: "sandbox-handle-review-packet-gate-decision-record";
  sourceSpan: "Node v359 sandbox handle review packet/gate non-secret intake archive verification";
  sourceArchiveVerificationDigest: string;
  sourceIntakeDigest: string;
  decision:
    | "advance-to-sandbox-handle-review-prerequisite-closure-review"
    | "blocked";
  decisionReason: string;
  allowsSandboxHandleReviewPrerequisiteClosure: boolean;
  allowsHumanReviewDecisionOnly: boolean;
  requestsCredentialValue: false;
  requestsRawEndpointUrl: false;
  instantiatesProviderClient: false;
  implementsRuntimeShell: false;
  invokesRuntimeShell: false;
  opensManagedAuditConnection: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v361";
  inputCount: number;
}

export type SandboxHandleReviewPacketGateDecisionRecordChecks = {
  sourceNodeV359Ready: boolean;
  sourceArchiveVerificationAllowsDecision: boolean;
  sourceArchiveFilesComplete: boolean;
  sourceChecksAllPassed: boolean;
  sourcePacketGateShapeComplete: boolean;
  necessityProofPresent: boolean;
  decisionInputsComplete: boolean;
  decisionDigestStable: boolean;
  decisionLimitedToPrerequisiteClosure: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noManagedAuditHttpTcp: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noJavaMiniKvEchoRequired: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForSandboxHandleReviewPacketGateDecisionRecord: boolean;
};

export interface SandboxHandleReviewPacketGateDecisionRecordSummary {
  checkCount: number;
  passedCheckCount: number;
  inputCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPacketGateDecisionRecordMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v359"
    | "necessity-proof"
    | "decision-inputs"
    | "decision-record"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-decision-record.v1";
  decisionState: "sandbox-handle-review-packet-gate-decision-record-ready" | "blocked";
  decision:
    | "advance-to-sandbox-handle-review-prerequisite-closure-review"
    | "blocked";
  readyForSandboxHandleReviewPacketGateDecisionRecord: boolean;
  readyForNodeV361SandboxHandleReviewPacketGateDecisionRecordArchiveVerification: boolean;
  consumesNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: true;
  activeNodeVersion: "Node v360";
  sourceNodeVersion: "Node v359";
  decisionRecordOnly: true;
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
  sourceNodeV359: SourceNodeV359SandboxHandleReviewPacketGateArchiveVerificationReference;
  necessityProof: SandboxHandleReviewPacketGateDecisionNecessityProof;
  decisionInputs: SandboxHandleReviewPacketGateDecisionInput[];
  decisionRecord: SandboxHandleReviewPacketGateDecisionRecord;
  checks: SandboxHandleReviewPacketGateDecisionRecordChecks;
  summary: SandboxHandleReviewPacketGateDecisionRecordSummary;
  productionBlockers: SandboxHandleReviewPacketGateDecisionRecordMessage[];
  warnings: SandboxHandleReviewPacketGateDecisionRecordMessage[];
  recommendations: SandboxHandleReviewPacketGateDecisionRecordMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPacketGateDecisionRecordJson: string;
    sandboxHandleReviewPacketGateDecisionRecordMarkdown: string;
    sourceNodeV359Json: string;
    sourceNodeV359Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
