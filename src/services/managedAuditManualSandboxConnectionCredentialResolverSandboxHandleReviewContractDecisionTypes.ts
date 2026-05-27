import type {
  ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationTypes.js";

export interface SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference {
  sourceVersion: "Node v355";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV356ContractDecision: boolean;
  archiveVerificationDigest: string;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  checkCount: number;
  passedCheckCount: number;
  prerequisiteInputCount: number;
  closedScopeCount: number;
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

export interface SandboxHandleReviewContractDecisionNecessityProof {
  blockerResolved: "sandbox-handle-review-needs-contract-decision-after-archive-verification";
  consumedBy: "Node v357 sandbox handle review contract decision archive verification or later non-secret handle review gate";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface SandboxHandleReviewContractInput {
  id: string;
  label: string;
  category:
    | "handle-reference"
    | "review-status"
    | "binding-status"
    | "operator-context"
    | "source-evidence";
  sourcePrerequisiteId: string;
  contractRequirement: string;
  containsSecretValue: false;
  containsRawEndpointUrl: false;
  allowsNetworkConnection: false;
  allowsRuntimeInvocation: false;
  status: "contract-required";
}

export interface SandboxHandleReviewContractSection {
  id: string;
  title: string;
  decisionRule: string;
  acceptsOnlyOpaqueReference: boolean;
  containsSecretValue: false;
  containsRawEndpointUrl: false;
  opensManagedAuditConnection: false;
  invokesRuntimeShell: false;
  mutatesUpstreamState: false;
}

export interface SandboxHandleReviewContractDecisionRecord {
  decisionDigest: string;
  decisionMode: "sandbox-handle-review-contract-decision";
  sourceSpan: "Node v355 sandbox handle review prerequisite intake archive verification";
  sourceArchiveVerificationDigest: string;
  decision: "define-sandbox-handle-review-contract" | "blocked";
  decisionReason: string;
  contractInputCount: number;
  contractSectionCount: number;
  permitsOnlyNonSecretContract: true;
  requestsCredentialValue: false;
  requestsRawEndpointUrl: false;
  instantiatesProviderClient: false;
  implementsRuntimeShell: false;
  invokesRuntimeShell: false;
  opensManagedAuditConnection: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v357";
}

export type SandboxHandleReviewContractDecisionChecks = {
  sourceNodeV355Ready: boolean;
  sourceArchiveVerificationAllowsContractDecision: boolean;
  sourceArchiveFilesComplete: boolean;
  sourceChecksAllPassed: boolean;
  necessityProofPresent: boolean;
  contractInputsComplete: boolean;
  contractSectionsComplete: boolean;
  contractInputsNonSecret: boolean;
  contractSectionsNonSecret: boolean;
  contractDoesNotRequestRawEndpoint: boolean;
  contractDoesNotAllowNetwork: boolean;
  decisionDigestStable: boolean;
  decisionLimitedToContract: boolean;
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
  readyForSandboxHandleReviewContractDecision: boolean;
};

export interface SandboxHandleReviewContractDecisionSummary {
  checkCount: number;
  passedCheckCount: number;
  contractInputCount: number;
  contractSectionCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewContractDecisionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v355"
    | "necessity-proof"
    | "contract-inputs"
    | "contract-sections"
    | "decision-record"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1";
  decisionState: "sandbox-handle-review-contract-decision-ready" | "blocked";
  decision: "define-sandbox-handle-review-contract" | "blocked";
  readyForSandboxHandleReviewContractDecision: boolean;
  readyForNodeV357SandboxHandleReviewContractDecisionArchiveVerification: boolean;
  consumesNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: true;
  activeNodeVersion: "Node v356";
  sourceNodeVersion: "Node v355";
  contractDecisionOnly: true;
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
  sourceNodeV355: SourceNodeV355SandboxHandleReviewPrerequisiteArchiveVerificationReference;
  necessityProof: SandboxHandleReviewContractDecisionNecessityProof;
  contractInputs: SandboxHandleReviewContractInput[];
  contractSections: SandboxHandleReviewContractSection[];
  decisionRecord: SandboxHandleReviewContractDecisionRecord;
  checks: SandboxHandleReviewContractDecisionChecks;
  summary: SandboxHandleReviewContractDecisionSummary;
  productionBlockers: SandboxHandleReviewContractDecisionMessage[];
  warnings: SandboxHandleReviewContractDecisionMessage[];
  recommendations: SandboxHandleReviewContractDecisionMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewContractDecisionJson: string;
    sandboxHandleReviewContractDecisionMarkdown: string;
    sourceNodeV355Json: string;
    sourceNodeV355Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
