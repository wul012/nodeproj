import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.js";

export interface SourceNodeV350PassedArchiveVerificationReference {
  sourceVersion: "Node v350";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["profileVersion"];
  transitionState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["transitionState"];
  transitionDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["transitionDecision"];
  readyForPassedArchiveVerification: boolean;
  readyForNodeV351Intake: boolean;
  transitionDigest: string;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  productionBlockerCount: number;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
}

export interface DisabledReadOnlyIntegrationNecessityProof {
  blockerResolved: "passed-minimal-read-only-integration-needs-next-stage-boundary";
  consumedBy: "Node v352 archive verification or later managed-audit-disabled read-only stage";
  cannotReuseExistingReportBecause: string;
  growthStopCondition: string;
}

export interface DisabledReadOnlyIntegrationInput {
  id: string;
  label: string;
  source: "node-v350" | "operator-window" | "future-disabled-managed-audit-stage";
  requiredBeforeNextLiveWindow: boolean;
  status: "available" | "operator-owned" | "not-opened";
  notes: string;
}

export interface DisabledReadOnlyIntegrationClosedScope {
  id: string;
  status: "closed";
  reason: string;
}

export interface DisabledReadOnlyIntegrationIntakeRecord {
  intakeDigest: string;
  intakeMode: "managed-audit-disabled-read-only-integration-intake";
  sourceSpan: "Node v350 passed archive verification transition";
  intakeDecision: "define-managed-audit-disabled-read-only-integration-stage" | "blocked";
  managedAuditDisabled: true;
  readOnlyIntegrationOnly: true;
  nextNodeVersionSuggested: "Node v352";
  sourceTransitionDigest: string;
  inputCount: number;
  closedScopeCount: number;
}

export type ManagedAuditDisabledReadOnlyIntegrationIntakeChecks = {
  sourceNodeV350Ready: boolean;
  sourceTransitionAllowsIntake: boolean;
  sourceV349AllReadTargetsPassed: boolean;
  necessityProofPresent: boolean;
  intakeInputsComplete: boolean;
  closedScopesComplete: boolean;
  managedAuditStillDisabled: boolean;
  credentialValueStillClosed: boolean;
  rawEndpointUrlStillClosed: boolean;
  providerClientNotInstantiated: boolean;
  runtimeShellStillNotImplemented: boolean;
  noUpstreamServiceStarted: boolean;
  noJavaMutation: boolean;
  noMiniKvMutation: boolean;
  noManagedAuditHttpTcp: boolean;
  noJavaMiniKvEchoRequired: boolean;
  intakeDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditDisabledReadOnlyIntegrationIntake: boolean;
};

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeSummary {
  checkCount: number;
  passedCheckCount: number;
  inputCount: number;
  closedScopeCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ManagedAuditDisabledReadOnlyIntegrationIntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v350"
    | "necessity-proof"
    | "intake-inputs"
    | "closed-scopes"
    | "runtime-boundary"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-managed-audit-disabled-read-only-integration-intake.v1";
  intakeState: "managed-audit-disabled-read-only-integration-intake-ready" | "blocked";
  intakeDecision: "define-managed-audit-disabled-read-only-integration-stage" | "blocked";
  readyForManagedAuditDisabledReadOnlyIntegrationIntake: boolean;
  consumesNodeV350PassedArchiveVerification: true;
  activeNodeVersion: "Node v351";
  sourceNodeVersion: "Node v350";
  managedAuditDisabled: true;
  readOnlyIntegrationOnly: true;
  intakeOnly: true;
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
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV350: SourceNodeV350PassedArchiveVerificationReference;
  necessityProof: DisabledReadOnlyIntegrationNecessityProof;
  intakeInputs: DisabledReadOnlyIntegrationInput[];
  closedScopes: DisabledReadOnlyIntegrationClosedScope[];
  intakeRecord: DisabledReadOnlyIntegrationIntakeRecord;
  checks: ManagedAuditDisabledReadOnlyIntegrationIntakeChecks;
  summary: ManagedAuditDisabledReadOnlyIntegrationIntakeSummary;
  productionBlockers: ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[];
  warnings: ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[];
  recommendations: ManagedAuditDisabledReadOnlyIntegrationIntakeMessage[];
  evidenceEndpoints: {
    managedAuditDisabledReadOnlyIntegrationIntakeJson: string;
    managedAuditDisabledReadOnlyIntegrationIntakeMarkdown: string;
    sourceNodeV350Json: string;
    sourceNodeV350Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
