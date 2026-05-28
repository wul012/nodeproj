import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationTypes.js";

export type MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision =
  | "ready-for-explicit-read-window-gate-execution"
  | "wait-for-external-read-window"
  | "blocked";

export interface SourceNodeV365RegularGateArchiveVerificationReference {
  sourceVersion: "Node v365";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV366ExplicitReadWindowGateExecutionDecision: boolean;
  sourceNodeV364GateDigest: string;
  archiveVerificationDigest: string;
  ciOperatorCheckDigest: string;
  checkCount: number;
  passedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  readOnlyTargetCount: number;
  requiredHeaderCount: number;
  productionBlockerCount: number;
  avoidsFullTestBatchByDefault: true;
  requiresExplicitReadWindowForActualProbe: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
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

export interface MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord {
  decisionDigest: string;
  decisionMode: "minimal-read-only-integration-explicit-read-window-gate-execution-decision";
  sourceSpan: "Node v365 minimal read-only integration regular gate archive verification";
  gateExecutionDecision: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision;
  externalReadWindowRequired: boolean;
  explicitReadWindowProvided: boolean;
  focusedCiOperatorCheckReady: boolean;
  actualProbeExecutedNow: false;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  mutatesUpstreamState: false;
  opensManagedAuditConnection: false;
  readsCredentialValue: false;
  parsesRawEndpointUrl: false;
  instantiatesProviderClient: false;
  invokesRuntimeShell: false;
  requestsJavaMiniKvEcho: false;
  nextNodeVersionSuggested:
    | "Node v367"
    | "wait-for-external-read-window";
}

export type MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks = {
  sourceNodeV365Ready: boolean;
  sourceArchiveVerificationDigestStable: boolean;
  sourceGateDigestStable: boolean;
  sourceCiOperatorCheckDigestStable: boolean;
  focusedCiOperatorCheckReady: boolean;
  sourceAvoidsFullTestBatchByDefault: boolean;
  explicitReadWindowHandledAsDecisionInput: boolean;
  missingWindowClassifiedAsExternalWait: boolean;
  noProbeExecutedWithoutExplicitWindow: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointUrlRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noJavaMiniKvEchoRequired: boolean;
  executionStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  decisionDigestStable: boolean;
  readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: boolean;
};

export interface MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  readOnlyTargetCount: number;
  requiredHeaderCount: number;
  externalReadWindowRequired: boolean;
  explicitReadWindowProvided: boolean;
  actualProbeExecutedNow: false;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v365"
    | "read-window"
    | "ci-operator-check"
    | "runtime-boundary"
    | "execution-decision"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-explicit-read-window-gate-execution-decision.v1";
  decisionState: "explicit-read-window-gate-execution-decision-ready" | "blocked";
  gateExecutionDecision: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision;
  readyForMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecision: boolean;
  consumesNodeV365RegularGateArchiveVerification: true;
  activeNodeVersion: "Node v366";
  sourceNodeVersion: "Node v365";
  decisionOnly: true;
  rerunsLiveProbe: false;
  actualProbeExecutedNow: false;
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
  sourceNodeV365: SourceNodeV365RegularGateArchiveVerificationReference;
  decisionRecord: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionRecord;
  checks: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionChecks;
  summary: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionSummary;
  productionBlockers: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[];
  warnings: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[];
  recommendations: MinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionMessage[];
  evidenceEndpoints: {
    explicitReadWindowGateExecutionDecisionJson: string;
    explicitReadWindowGateExecutionDecisionMarkdown: string;
    sourceNodeV365Json: string;
    sourceNodeV365Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
