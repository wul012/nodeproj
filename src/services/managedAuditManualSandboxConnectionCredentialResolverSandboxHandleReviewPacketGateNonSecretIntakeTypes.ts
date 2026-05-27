import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationTypes.js";

export interface SourceNodeV357SandboxHandleReviewContractArchiveReference {
  sourceVersion: "Node v357";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV358PacketGateIntake: boolean;
  archiveVerificationDigest: string;
  sourceDecisionDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  contractInputCount: number;
  contractSectionCount: number;
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

export interface SandboxHandleReviewPacketGateNecessityProof {
  blockerResolved: "sandbox-handle-review-needs-packet-gate-intake-after-contract-archive-verification";
  consumedBy: "Node v359 sandbox handle review packet/gate intake archive verification or later non-secret review gate";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface SandboxHandleReviewPacketInput {
  id: string;
  label: string;
  category:
    | "handle-reference"
    | "review-status"
    | "binding-status"
    | "operator-context"
    | "source-evidence"
    | "request-purpose";
  sourceContractInputId: string;
  packetRequirement: string;
  containsSecretValue: false;
  containsRawEndpointUrl: false;
  allowsNetworkConnection: false;
  allowsRuntimeInvocation: false;
  status: "packet-required";
}

export interface SandboxHandleReviewGateOutput {
  id: string;
  title: string;
  decisionRule: string;
  emitsSecretValue: false;
  emitsRawEndpointUrl: false;
  opensManagedAuditConnection: false;
  invokesRuntimeShell: false;
  mutatesUpstreamState: false;
  status: "gate-output-defined";
}

export interface SandboxHandleReviewStopCondition {
  id: string;
  trigger: string;
  effect: "fail-closed";
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  managedAuditHttpTcpAllowed: false;
  runtimeShellInvocationAllowed: false;
  upstreamMutationAllowed: false;
}

export interface SandboxHandleReviewPacketGateIntakeRecord {
  intakeDigest: string;
  intakeMode: "sandbox-handle-review-packet-gate-non-secret-intake";
  sourceSpan: "Node v357 sandbox handle review contract decision archive verification";
  sourceArchiveVerificationDigest: string;
  intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate" | "blocked";
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  permitsOnlyNonSecretPacket: true;
  requestsCredentialValue: false;
  requestsRawEndpointUrl: false;
  instantiatesProviderClient: false;
  implementsRuntimeShell: false;
  invokesRuntimeShell: false;
  opensManagedAuditConnection: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v359";
}

export type SandboxHandleReviewPacketGateIntakeChecks = {
  sourceNodeV357Ready: boolean;
  sourceArchiveVerificationAllowsPacketGateIntake: boolean;
  sourceArchiveFilesComplete: boolean;
  sourceChecksAllPassed: boolean;
  necessityProofPresent: boolean;
  packetInputsComplete: boolean;
  gateOutputsComplete: boolean;
  stopConditionsComplete: boolean;
  packetInputsNonSecret: boolean;
  gateOutputsNonSecret: boolean;
  stopConditionsClosed: boolean;
  packetDoesNotRequestRawEndpoint: boolean;
  packetDoesNotAllowNetwork: boolean;
  intakeDigestStable: boolean;
  intakeLimitedToNonSecretPacketGate: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplemented: boolean;
  noRuntimeShellInvoked: boolean;
  noManagedAuditHttpTcp: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noJavaMiniKvEchoRequired: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForSandboxHandleReviewPacketGateNonSecretIntake: boolean;
};

export interface SandboxHandleReviewPacketGateIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  packetInputCount: number;
  gateOutputCount: number;
  stopConditionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPacketGateIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v357"
    | "necessity-proof"
    | "packet-inputs"
    | "gate-outputs"
    | "stop-conditions"
    | "intake-record"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-packet-gate-non-secret-intake.v1";
  intakeState: "sandbox-handle-review-packet-gate-non-secret-intake-ready" | "blocked";
  intakeDecision: "define-non-secret-sandbox-handle-review-packet-gate" | "blocked";
  readyForSandboxHandleReviewPacketGateNonSecretIntake: boolean;
  readyForNodeV359SandboxHandleReviewPacketGateIntakeArchiveVerification: boolean;
  consumesNodeV357SandboxHandleReviewContractDecisionArchiveVerification: true;
  activeNodeVersion: "Node v358";
  sourceNodeVersion: "Node v357";
  packetGateIntakeOnly: true;
  sandboxHandleReviewOnly: true;
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
  sourceNodeV357: SourceNodeV357SandboxHandleReviewContractArchiveReference;
  necessityProof: SandboxHandleReviewPacketGateNecessityProof;
  packetInputs: SandboxHandleReviewPacketInput[];
  gateOutputs: SandboxHandleReviewGateOutput[];
  stopConditions: SandboxHandleReviewStopCondition[];
  intakeRecord: SandboxHandleReviewPacketGateIntakeRecord;
  checks: SandboxHandleReviewPacketGateIntakeChecks;
  summary: SandboxHandleReviewPacketGateIntakeSummary;
  productionBlockers: SandboxHandleReviewPacketGateIntakeMessage[];
  warnings: SandboxHandleReviewPacketGateIntakeMessage[];
  recommendations: SandboxHandleReviewPacketGateIntakeMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPacketGateNonSecretIntakeJson: string;
    sandboxHandleReviewPacketGateNonSecretIntakeMarkdown: string;
    sourceNodeV357Json: string;
    sourceNodeV357Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
