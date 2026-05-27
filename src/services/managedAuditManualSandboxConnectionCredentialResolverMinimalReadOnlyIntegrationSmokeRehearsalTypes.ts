import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutTypes.js";

export type MinimalReadOnlyIntegrationSmokeTargetStatus =
  | "read-passed"
  | "connection-refused"
  | "timeout"
  | "invalid-json"
  | "unexpected-status";

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1";
  smokeState: "all-read-passed" | "read-window-unavailable" | "invalid-read-contract" | "blocked";
  smokeDecision:
    | "archive-read-passed-evidence"
    | "archive-read-window-unavailable-evidence"
    | "request-read-contract-field-fix"
    | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal: boolean;
  readyForNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification: boolean;
  consumesNodeV345MinimalReadOnlyIntegrationWindowReadinessCut: true;
  activeNodeVersion: "Node v346";
  sourceNodeVersion: "Node v345";
  readOnlyIntegrationSmokeRehearsal: true;
  liveProbePerformedNow: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV345: SourceNodeV345ReadinessCutReference;
  smokeSession: MinimalReadOnlyIntegrationSmokeSession;
  targetResults: MinimalReadOnlyIntegrationSmokeTargetResult[];
  checks: MinimalReadOnlyIntegrationSmokeRehearsalChecks;
  summary: MinimalReadOnlyIntegrationSmokeRehearsalSummary;
  productionBlockers: MinimalReadOnlyIntegrationSmokeRehearsalMessage[];
  warnings: MinimalReadOnlyIntegrationSmokeRehearsalMessage[];
  recommendations: MinimalReadOnlyIntegrationSmokeRehearsalMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationSmokeRehearsalJson: string;
    minimalReadOnlyIntegrationSmokeRehearsalMarkdown: string;
    sourceNodeV345Json: string;
    sourceNodeV345Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface SourceNodeV345ReadinessCutReference {
  sourceVersion: "Node v345";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile["profileVersion"];
  readinessState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile["readinessState"];
  readinessDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutProfile["readinessDecision"];
  readyForReadinessCut: boolean;
  readyForNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: boolean;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readinessDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  sourceProductionBlockerCount: number;
  javaRequirementCount: number;
  miniKvRequirementCount: number;
  performsLiveProbeNow: false;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
}

export interface MinimalReadOnlyIntegrationSmokeSession {
  sessionDigest: string;
  sessionMode: "node-v346-minimal-read-only-integration-smoke-rehearsal";
  sourceSpan: "Node v345 readiness cut plus live Java/mini-kv read-only probes";
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  onlyJavaGetRequests: true;
  onlyMiniKvReadCommands: true;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v347";
}

export interface MinimalReadOnlyIntegrationSmokeTargetResult {
  project: "java" | "mini-kv";
  targetName: string;
  methodOrCommand: string;
  readOnly: true;
  mutatesState: false;
  attempted: boolean;
  status: MinimalReadOnlyIntegrationSmokeTargetStatus;
  latencyMs: number | null;
  statusCode: number | null;
  responseShape: string;
  errorCode: string | null;
  errorMessage: string | null;
}

export type MinimalReadOnlyIntegrationSmokeRehearsalChecks = {
  sourceNodeV345Ready: boolean;
  sourceNodeV345KeepsBoundariesClosed: boolean;
  allReadTargetsAttempted: boolean;
  onlyAllowedJavaGetRequestsAttempted: boolean;
  onlyAllowedMiniKvReadCommandsAttempted: boolean;
  noUpstreamServiceStarted: boolean;
  noJavaMutationAttempted: boolean;
  noMiniKvMutationAttempted: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  connectionFailuresFailClosed: boolean;
  invalidReadContractRequestsParallelEcho: boolean;
  smokeSessionDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal: boolean;
};

export interface MinimalReadOnlyIntegrationSmokeRehearsalSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  connectionRefusedTargetCount: number;
  timeoutTargetCount: number;
  invalidJsonTargetCount: number;
  unexpectedStatusTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationSmokeRehearsalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v345"
    | "java-read-probe"
    | "mini-kv-read-probe"
    | "runtime-boundary"
    | "read-contract"
    | "next-step";
  message: string;
}
