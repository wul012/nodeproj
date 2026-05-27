import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
  MinimalReadOnlyIntegrationSmokeArchiveResult,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.js";

export type MinimalReadOnlyIntegrationRerunDecision =
  | "advance-to-next-managed-audit-disabled-read-only-stage"
  | "wait-for-external-read-window"
  | "wait-for-java-mini-kv-read-contract-fix"
  | "blocked";

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecisionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-rerun-decision.v1";
  rerunDecisionState: "minimal-read-only-integration-rerun-decision-ready" | "blocked";
  rerunDecision: MinimalReadOnlyIntegrationRerunDecision;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: boolean;
  consumesNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification: true;
  activeNodeVersion: "Node v348";
  sourceNodeVersion: "Node v347";
  sourceArchiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult | "blocked";
  sourceArchiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"];
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  externalReadWindowRequired: boolean;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  readyForNodeV349MinimalReadOnlyIntegrationRerunOrPendingArchive: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV347: SourceNodeV347SmokeArchiveVerificationReference;
  rerunDecisionRecord: MinimalReadOnlyIntegrationRerunDecisionRecord;
  checks: MinimalReadOnlyIntegrationRerunDecisionChecks;
  summary: MinimalReadOnlyIntegrationRerunDecisionSummary;
  productionBlockers: MinimalReadOnlyIntegrationRerunDecisionMessage[];
  warnings: MinimalReadOnlyIntegrationRerunDecisionMessage[];
  recommendations: MinimalReadOnlyIntegrationRerunDecisionMessage[];
  evidenceEndpoints: {
    minimalReadOnlyIntegrationRerunDecisionJson: string;
    minimalReadOnlyIntegrationRerunDecisionMarkdown: string;
    sourceNodeV347Json: string;
    sourceNodeV347Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}

export interface SourceNodeV347SmokeArchiveVerificationReference {
  sourceVersion: "Node v347";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveVerificationState"];
  archiveResult: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveResult"];
  archiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV348RerunDecision: boolean;
  verificationDigest: string;
  attemptedTargetCount: number;
  passedTargetCount: number;
  unavailableTargetCount: number;
  invalidContractTargetCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
  archiveVerificationOnly: true;
  rerunsLiveProbe: false;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  connectsManagedAudit: false;
  readsManagedAuditCredential: false;
  rawEndpointUrlParsed: false;
}

export interface MinimalReadOnlyIntegrationRerunDecisionRecord {
  decisionDigest: string;
  decisionMode: "minimal-read-only-integration-rerun-decision";
  sourceSpan: "Node v347 minimal read-only integration smoke archive verification";
  sourceArchiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult | "blocked";
  sourceArchiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"];
  rerunDecision: MinimalReadOnlyIntegrationRerunDecision;
  externalReadWindowRequired: boolean;
  requestsJavaMiniKvEcho: boolean;
  rerunsLiveProbe: false;
  startsUpstreamServices: false;
  nextNodeVersionSuggested: "Node v349";
}

export type MinimalReadOnlyIntegrationRerunDecisionChecks = {
  sourceArchiveVerificationReady: boolean;
  sourceArchiveVerificationDigestStable: boolean;
  sourceArchiveDecisionRecognized: boolean;
  readWindowUnavailableHandledAsExternalWindow: boolean;
  invalidContractRequestsParallelEchoOnlyWhenNeeded: boolean;
  allReadPassedCanAdvanceWithoutExtraEcho: boolean;
  doesNotRerunLiveProbe: boolean;
  noUpstreamServiceStarted: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  executionStillBlocked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  decisionDigestStable: boolean;
  readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRerunDecision: boolean;
};

export interface MinimalReadOnlyIntegrationRerunDecisionSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceAttemptedTargetCount: number;
  sourcePassedTargetCount: number;
  sourceUnavailableTargetCount: number;
  sourceInvalidContractTargetCount: number;
  externalReadWindowRequired: boolean;
  requiresParallelJavaV153MiniKvV144ReadOnlyEcho: boolean;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalReadOnlyIntegrationRerunDecisionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v347"
    | "rerun-decision"
    | "runtime-boundary"
    | "external-window"
    | "next-step";
  message: string;
}
