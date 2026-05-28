import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.js";

export interface SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference {
  sourceVersion: "Node v350";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["profileVersion"];
  transitionState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["transitionState"];
  transitionDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["transitionDecision"];
  readyForPassedArchiveVerification: boolean;
  transitionDigest: string;
  sourceArchiveDigest: string;
  sourceNodeV349Result: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["sourceNodeV349"]["rerunArchiveResult"];
  sourceNodeV349Decision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile["sourceNodeV349"]["rerunArchiveDecision"];
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false;
}

export interface MinimalReadOnlyIntegrationRegularGateEnvRequirement {
  key: string;
  requiredValue: string;
  scope: "gate-execution-window" | "gate-definition-runtime";
  reason: string;
}

export interface MinimalReadOnlyIntegrationRegularGateHeaderRequirement {
  header: string;
  required: true;
  secret: false;
  reason: string;
}

export interface MinimalReadOnlyIntegrationRegularGateTarget {
  project: "java" | "mini-kv";
  targetName: string;
  methodOrCommand: string;
  readOnly: true;
  mutatesState: false;
  expectedStatus: "read-passed";
  failureClass:
    | "read-window-unavailable"
    | "invalid-read-contract"
    | "blocked-runtime-boundary";
}

export interface MinimalReadOnlyIntegrationRegularGateFailureClassification {
  code: string;
  condition: string;
  action: string;
  requestsJavaMiniKvEcho: boolean;
  opensCredentialOrEndpoint: false;
}

export interface MinimalReadOnlyIntegrationRegularGateArtifactExpectation {
  artifact: string;
  required: true;
  sourceVersion: "Node v349" | "Node v350" | "Node v364";
}

export interface MinimalReadOnlyIntegrationRegularGateRecord {
  gateDigest: string;
  gateMode: "minimal-read-only-integration-regular-gate";
  sourceSpan: "Node v349 passed smoke + Node v350 passed archive verification";
  sourceTransitionDigest: string;
  sourceArchiveDigest: string;
  gateDecision:
    | "standardize-v349-read-only-smoke-as-regular-gate"
    | "blocked";
  requiredEnvCount: number;
  requiredHeaderCount: number;
  readOnlyTargetCount: number;
  failureClassificationCount: number;
  artifactExpectationCount: number;
  nextNodeVersionSuggested: "Node v365";
  rerunsLiveProbeNow: false;
  automaticUpstreamStart: false;
  opensManagedAuditConnection: false;
  readsCredentialValue: false;
  parsesRawEndpointUrl: false;
  instantiatesProviderClient: false;
  invokesRuntimeShell: false;
  mutatesUpstreamState: false;
  requiredEnv: MinimalReadOnlyIntegrationRegularGateEnvRequirement[];
  requiredHeaders: MinimalReadOnlyIntegrationRegularGateHeaderRequirement[];
  readOnlyTargets: MinimalReadOnlyIntegrationRegularGateTarget[];
  failureClassifications: MinimalReadOnlyIntegrationRegularGateFailureClassification[];
  artifactExpectations: MinimalReadOnlyIntegrationRegularGateArtifactExpectation[];
}

export type MinimalReadOnlyIntegrationRegularGateChecks = {
  sourceNodeV350Ready: boolean;
  sourceNodeV350VerifiedPassedArchive: boolean;
  sourceNodeV349AllReadPassed: boolean;
  sourceTargetCountsAllPassed: boolean;
  sourceTransitionDigestStable: boolean;
  sourceArchiveDigestStable: boolean;
  sourceKeepsRuntimeBoundaryClosed: boolean;
  gateDoesNotRerunProbeNow: boolean;
  safeEnvDocumentsProbeEnablement: boolean;
  safeEnvKeepsActionsDisabled: boolean;
  safeEnvRequiresAccessGuard: boolean;
  requiredHeadersDocumentOperatorIdentity: boolean;
  requiredHeadersContainNoSecrets: boolean;
  javaTargetsAreGetOnly: boolean;
  miniKvTargetsAreReadOnlyCommands: boolean;
  targetCountMatchesV349: boolean;
  failureClassificationCoversUnavailableWindow: boolean;
  failureClassificationCoversInvalidContract: boolean;
  failureClassificationCoversBoundaryBlocks: boolean;
  artifactExpectationsCoverEvidenceAndScreenshot: boolean;
  artifactExpectationsCoverPlanAndWalkthrough: boolean;
  noCredentialValueRequestedOrRead: boolean;
  noRawEndpointUrlRequestedOrParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  noManagedAuditHttpTcp: boolean;
  noUpstreamServiceStarted: boolean;
  noUpstreamMutation: boolean;
  noJavaMiniKvEchoRequiredForPassedEvidence: boolean;
  upstreamActionsStillDisabled: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  gateDigestStable: boolean;
  readyForMinimalReadOnlyIntegrationRegularGate: boolean;
};

export interface MinimalReadOnlyIntegrationRegularGateSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  readOnlyTargetCount: number;
  requiredEnvCount: number;
  requiredHeaderCount: number;
  failureClassificationCount: number;
  artifactExpectationCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationRegularGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v350"
    | "regular-gate"
    | "runtime-boundary"
    | "runtime-config"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-regular-gate.v1";
  gateState: "minimal-read-only-integration-regular-gate-ready" | "blocked";
  gateDecision:
    | "standardize-v349-read-only-smoke-as-regular-gate"
    | "blocked";
  readyForMinimalReadOnlyIntegrationRegularGate: boolean;
  readyForNodeV365RegularGateArchiveVerification: boolean;
  consumesNodeV350MinimalReadOnlyIntegrationPassedArchiveVerification: true;
  activeNodeVersion: "Node v364";
  sourceNodeVersion: "Node v350";
  regularGateOnly: true;
  gateDefinitionOnly: true;
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
  sourceNodeV350: SourceNodeV350MinimalReadOnlyIntegrationRegularGateReference;
  regularGate: MinimalReadOnlyIntegrationRegularGateRecord;
  checks: MinimalReadOnlyIntegrationRegularGateChecks;
  summary: MinimalReadOnlyIntegrationRegularGateSummary;
  productionBlockers: MinimalReadOnlyIntegrationRegularGateMessage[];
  warnings: MinimalReadOnlyIntegrationRegularGateMessage[];
  recommendations: MinimalReadOnlyIntegrationRegularGateMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationRegularGateJson: string;
    minimalReadOnlyIntegrationRegularGateMarkdown: string;
    sourceNodeV350Json: string;
    sourceNodeV350Markdown: string;
    sourceNodeV349Json: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
