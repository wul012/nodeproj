import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile,
  MinimalReadOnlyIntegrationSmokeRerunArchiveResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveTypes.js";
import type {
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export type MinimalReadOnlyIntegrationGateExecutionResult =
  | Exclude<MinimalReadOnlyIntegrationSmokeRerunArchiveResult, "pending">
  | "blocked";

export type MinimalReadOnlyIntegrationGateExecutionDecision =
  | "archive-read-passed-gate-execution"
  | "archive-read-window-unavailable-gate-execution"
  | "request-java-mini-kv-read-contract-fix"
  | "blocked";

export interface SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference {
  sourceVersion: "Node v366";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile["profileVersion"];
  decisionState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile["decisionState"];
  gateExecutionDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationExplicitReadWindowGateExecutionDecisionProfile["gateExecutionDecision"];
  readyForDecision: boolean;
  decisionDigest: string;
  explicitReadWindowProvided: boolean;
  actualProbeExecutedNow: false;
  checkCount: number;
  passedCheckCount: number;
  readOnlyTargetCount: number;
  requiredHeaderCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  secretProviderInstantiated: false;
  resolverClientInstantiated: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
}

export interface ReusedNodeV349SmokeLaneReference {
  sourceVersion: "Node v349";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["profileVersion"];
  rerunArchiveState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveState"];
  rerunArchiveResult: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveResult"];
  rerunArchiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveDecision"];
  readyForSmokeRerunArchive: boolean;
  archiveDigest: string;
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  checkCount: number;
  passedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
}

export interface MinimalReadOnlyIntegrationGateExecutionRecord {
  executionDigest: string;
  executionMode: "minimal-read-only-integration-gate-execution";
  sourceSpan: "Node v366 explicit read-window decision plus reused Node v349 smoke lane";
  sourceDecisionDigest: string;
  reusedSmokeArchiveDigest: string | null;
  gateExecutionResult: MinimalReadOnlyIntegrationGateExecutionResult;
  gateExecutionDecision: MinimalReadOnlyIntegrationGateExecutionDecision;
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  readsCredentialValue: false;
  parsesRawEndpointUrl: false;
  instantiatesProviderClient: false;
  invokesRuntimeShell: false;
  requestsJavaMiniKvEcho: boolean;
  nextNodeVersionSuggested:
    | "Node v368"
    | "wait-for-external-read-window"
    | "recommended-parallel-java-mini-kv-read-contract-fix";
}

export type MinimalReadOnlyIntegrationGateExecutionChecks = {
  sourceNodeV366Ready: boolean;
  sourceDecisionAllowsV367: boolean;
  explicitReadWindowConfirmed: boolean;
  smokeLaneReusedInsteadOfDuplicated: boolean;
  allReadTargetsAttemptedWhenWindowOpen: boolean;
  onlyAllowedJavaGetRequestsAttempted: boolean;
  onlyAllowedMiniKvReadCommandsAttempted: boolean;
  noUpstreamServiceStartedByNode: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  noProviderClientInstantiated: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  resultClassifiedFailClosed: boolean;
  invalidContractRequestsParallelEchoOnlyWhenNeeded: boolean;
  executionDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalReadOnlyIntegrationGateExecution: boolean;
};

export interface MinimalReadOnlyIntegrationGateExecutionSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationGateExecutionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v366"
    | "node-v349-smoke-lane"
    | "java-read-probe"
    | "mini-kv-read-probe"
    | "runtime-boundary"
    | "read-window"
    | "read-contract"
    | "next-step";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-gate-execution.v1";
  gateExecutionState:
    | "minimal-read-only-integration-gate-executed"
    | "minimal-read-only-integration-gate-read-window-unavailable"
    | "minimal-read-only-integration-gate-invalid-read-contract"
    | "blocked";
  gateExecutionResult: MinimalReadOnlyIntegrationGateExecutionResult;
  gateExecutionDecision: MinimalReadOnlyIntegrationGateExecutionDecision;
  readyForMinimalReadOnlyIntegrationGateExecution: boolean;
  consumesNodeV366ExplicitReadWindowGateExecutionDecision: true;
  reusesNodeV349MinimalReadOnlySmokeLane: true;
  activeNodeVersion: "Node v367";
  sourceNodeVersion: "Node v366";
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
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
  requiresParallelJavaMiniKvReadContractFix: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV366: SourceNodeV366ExplicitReadWindowGateExecutionDecisionReference;
  reusedNodeV349SmokeLane: ReusedNodeV349SmokeLaneReference | null;
  gateExecution: MinimalReadOnlyIntegrationGateExecutionRecord;
  targetResults: MinimalReadOnlyIntegrationSmokeTargetResult[];
  checks: MinimalReadOnlyIntegrationGateExecutionChecks;
  summary: MinimalReadOnlyIntegrationGateExecutionSummary;
  productionBlockers: MinimalReadOnlyIntegrationGateExecutionMessage[];
  warnings: MinimalReadOnlyIntegrationGateExecutionMessage[];
  recommendations: MinimalReadOnlyIntegrationGateExecutionMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationGateExecutionJson: string;
    minimalReadOnlyIntegrationGateExecutionMarkdown: string;
    sourceNodeV366Json: string;
    sourceNodeV366Markdown: string;
    reusedNodeV349SmokeLaneJson: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
