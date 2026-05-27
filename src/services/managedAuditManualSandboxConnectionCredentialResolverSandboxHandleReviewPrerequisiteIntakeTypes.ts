import type {
  ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordTypes.js";

export interface SourceNodeV353ManagedAuditDisabledDecisionRecordReference {
  sourceVersion: "Node v353";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile["profileVersion"];
  decisionState: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile["decisionState"];
  decision: ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordProfile["decision"];
  readyForDecisionRecord: boolean;
  readyForNodeV354PrerequisiteIntake: boolean;
  decisionDigest: string;
  checkCount: number;
  passedCheckCount: number;
  inputCount: number;
  productionBlockerCount: number;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
}

export interface SandboxHandleReviewPrerequisiteNecessityProof {
  blockerResolved: "sandbox-handle-review-needs-non-secret-prerequisite-input-contract";
  consumedBy: "Node v355 sandbox handle review prerequisite intake archive verification or later handle review stage";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface SandboxHandleReviewPrerequisiteInput {
  id: string;
  label: string;
  category:
    | "handle-reference"
    | "review-status"
    | "binding-status"
    | "operator-context"
    | "source-evidence";
  allowedShape: string;
  requiredBeforeReview: boolean;
  containsSecretValue: false;
  containsRawEndpointUrl: false;
  allowsNetworkConnection: false;
  allowsRuntimeInvocation: false;
  status: "allowed-contract-only";
  notes: string;
}

export interface SandboxHandleReviewClosedScope {
  id: string;
  label: string;
  closedBecause: string;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  providerClientInstantiated: false;
  runtimeShellInvocationAllowed: false;
  managedAuditHttpTcpAllowed: false;
  upstreamMutationAllowed: false;
}

export interface SandboxHandleReviewPrerequisiteIntakeRecord {
  intakeDigest: string;
  intakeMode: "sandbox-handle-review-prerequisite-intake";
  sourceSpan: "Node v353 managed-audit-disabled read-only integration decision record";
  sourceDecisionDigest: string;
  intakeDecision:
    | "define-non-secret-sandbox-handle-review-prerequisites"
    | "blocked";
  intakeReason: string;
  allowedInputCount: number;
  closedScopeCount: number;
  requestsCredentialValue: false;
  requestsRawEndpointUrl: false;
  instantiatesProviderClient: false;
  implementsRuntimeShell: false;
  invokesRuntimeShell: false;
  opensManagedAuditConnection: false;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested: "Node v355";
}

export type SandboxHandleReviewPrerequisiteIntakeChecks = {
  sourceNodeV353Ready: boolean;
  sourceDecisionAllowsPrerequisiteIntake: boolean;
  sourceChecksAllPassed: boolean;
  necessityProofPresent: boolean;
  prerequisiteInputsComplete: boolean;
  prerequisiteInputsNonSecret: boolean;
  prerequisiteInputsNoRawEndpoint: boolean;
  prerequisiteInputsNoNetworkConnection: boolean;
  prerequisiteInputsNoRuntimeInvocation: boolean;
  closedScopesComplete: boolean;
  intakeDigestStable: boolean;
  intakeDecisionLimitedToPrerequisiteContract: boolean;
  noCredentialValueRequested: boolean;
  noRawEndpointRequested: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplemented: boolean;
  noRuntimeShellInvoked: boolean;
  noManagedAuditHttpTcp: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noJavaMiniKvEchoRequired: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForSandboxHandleReviewPrerequisiteIntake: boolean;
};

export interface SandboxHandleReviewPrerequisiteIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  prerequisiteInputCount: number;
  closedScopeCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceInputCount: number;
  sourceProductionBlockerCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface SandboxHandleReviewPrerequisiteIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v353"
    | "necessity-proof"
    | "prerequisite-inputs"
    | "closed-scopes"
    | "intake-record"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake.v1";
  intakeState: "sandbox-handle-review-prerequisite-intake-ready" | "blocked";
  intakeDecision:
    | "define-non-secret-sandbox-handle-review-prerequisites"
    | "blocked";
  readyForSandboxHandleReviewPrerequisiteIntake: boolean;
  readyForNodeV355SandboxHandleReviewPrerequisiteIntakeArchiveVerification: boolean;
  consumesNodeV353ManagedAuditDisabledReadOnlyIntegrationDecisionRecord: true;
  activeNodeVersion: "Node v354";
  sourceNodeVersion: "Node v353";
  prerequisiteIntakeOnly: true;
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
  sourceNodeV353: SourceNodeV353ManagedAuditDisabledDecisionRecordReference;
  necessityProof: SandboxHandleReviewPrerequisiteNecessityProof;
  prerequisiteInputs: SandboxHandleReviewPrerequisiteInput[];
  closedScopes: SandboxHandleReviewClosedScope[];
  intakeRecord: SandboxHandleReviewPrerequisiteIntakeRecord;
  checks: SandboxHandleReviewPrerequisiteIntakeChecks;
  summary: SandboxHandleReviewPrerequisiteIntakeSummary;
  productionBlockers: SandboxHandleReviewPrerequisiteIntakeMessage[];
  warnings: SandboxHandleReviewPrerequisiteIntakeMessage[];
  recommendations: SandboxHandleReviewPrerequisiteIntakeMessage[];
  evidenceEndpoints: {
    sandboxHandleReviewPrerequisiteIntakeJson: string;
    sandboxHandleReviewPrerequisiteIntakeMarkdown: string;
    sourceNodeV353Json: string;
    sourceNodeV353Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
