import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile,
  MinimalReadOnlyIntegrationSmokeTargetResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalTypes.js";

export type MinimalReadOnlyIntegrationSmokeRerunArchiveResult =
  | ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalProfile["smokeState"]
  | "pending";

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1";
  rerunArchiveState:
    | "minimal-read-only-integration-smoke-rerun-archived"
    | "minimal-read-only-integration-smoke-rerun-pending"
    | "blocked";
  rerunArchiveResult: MinimalReadOnlyIntegrationSmokeRerunArchiveResult;
  rerunArchiveDecision:
    | "archive-read-passed-rerun-evidence"
    | "archive-read-window-unavailable-rerun-evidence"
    | "request-java-mini-kv-read-contract-fix"
    | "pending-external-read-window"
    | "blocked";
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: boolean;
  consumesNodeV348MinimalReadOnlyIntegrationRerunDecision: true;
  activeNodeVersion: "Node v349";
  sourceNodeVersion: "Node v348";
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV348: SourceNodeV348RerunDecisionReference;
  rerunArchive: MinimalReadOnlyIntegrationSmokeRerunArchiveRecord;
  targetResults: MinimalReadOnlyIntegrationSmokeTargetResult[];
  checks: MinimalReadOnlyIntegrationSmokeRerunArchiveChecks;
  summary: MinimalReadOnlyIntegrationSmokeRerunArchiveSummary;
  productionBlockers: MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[];
  warnings: MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[];
  recommendations: MinimalReadOnlyIntegrationSmokeRerunArchiveMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationSmokeRerunArchiveJson: string;
    minimalReadOnlyIntegrationSmokeRerunArchiveMarkdown: string;
    sourceNodeV348Json: string;
    sourceNodeV348Markdown: string;
    sourceNodeV346Json: string;
    sourceNodeV346Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface SourceNodeV348RerunDecisionReference {
  sourceVersion: "Node v348";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile["profileVersion"];
  rerunDecisionState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile["rerunDecisionState"];
  rerunDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile["rerunDecision"];
  sourceArchiveResult: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile["sourceArchiveResult"];
  readyForRerunDecision: boolean;
  readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: boolean;
  decisionDigest: string;
  externalReadWindowRequired: boolean;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
}

export interface MinimalReadOnlyIntegrationSmokeRerunArchiveRecord {
  archiveDigest: string;
  archiveMode: "minimal-read-only-integration-smoke-rerun-or-pending-archive";
  sourceSpan: "Node v348 rerun decision plus optional Node v346 smoke lane rerun";
  rerunArchiveResult: MinimalReadOnlyIntegrationSmokeRerunArchiveResult;
  rerunArchiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveProfile["rerunArchiveDecision"];
  externalReadWindowConfirmed: boolean;
  liveProbePerformedNow: boolean;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  startsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v350";
}

export type MinimalReadOnlyIntegrationSmokeRerunArchiveChecks = {
  sourceNodeV348Ready: boolean;
  sourceNodeV348DecisionDigestStable: boolean;
  sourceNodeV348KeepsBoundariesClosed: boolean;
  externalReadWindowConfirmedBeforeProbe: boolean;
  pendingDoesNotProbe: boolean;
  liveProbeOnlyWhenWindowConfirmed: boolean;
  allReadTargetsAttemptedWhenProbing: boolean;
  onlyAllowedJavaGetRequestsAttempted: boolean;
  onlyAllowedMiniKvReadCommandsAttempted: boolean;
  noUpstreamServiceStartedByNode: boolean;
  noJavaMutationAttempted: boolean;
  noMiniKvMutationAttempted: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  invalidContractRequestsParallelEchoOnlyWhenNeeded: boolean;
  archiveDigestStable: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive: boolean;
};

export interface MinimalReadOnlyIntegrationSmokeRerunArchiveSummary {
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

export interface MinimalReadOnlyIntegrationSmokeRerunArchiveMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v348"
    | "java-read-probe"
    | "mini-kv-read-probe"
    | "runtime-boundary"
    | "external-window"
    | "read-contract"
    | "next-step";
  message: string;
}
