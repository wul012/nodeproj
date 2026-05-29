import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportTypes.js";

export interface SourceNodeV373ShardReadinessCompatibilityRegularGateReference {
  sourceVersion: "Node v373";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile["profileVersion"];
  compatibilityState: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile["compatibilityState"];
  compatibilityDecision: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile["compatibilityDecision"];
  readyForShardReadinessCompatibilityReport: boolean;
  readyForNodeV374MinimalShardReadinessRegularGate: boolean;
  compatibilityReportDigest: string;
  sourceStaticGateDigest: string;
  sourceLiveReadGateDigest: string;
  sourceArchiveVerificationDigest: string;
  projectReportCount: number;
  compatibleProjectCount: number;
  fieldCheckCount: number;
  matchedFieldCheckCount: number;
  mismatchedFieldCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface MinimalShardReadinessRegularGateRecord {
  gateDigest: string;
  gateMode: "minimal-shard-readiness-regular-gate";
  sourceSpan: "Node v370-v373 shard readiness evidence chain";
  contractVersion: "shard-readiness-regular-gate.v1";
  consumesStaticContractGate: true;
  consumesLiveReadArchive: true;
  consumesArchiveVerification: true;
  consumesCompatibilityReport: true;
  operatorCiReady: boolean;
  activeShardingEnabled: false;
  readOnlyReadinessOnly: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  focusedCommand: string;
  groupedCommand: string;
  buildCommand: string;
  smokeCommand: string;
  nextNodeVersionSuggested: "Node v375";
}

export type MinimalShardReadinessRegularGateChecks = {
  sourceNodeV373Ready: boolean;
  sourceDigestChainComplete: boolean;
  sourceProjectReportsComplete: boolean;
  sourceFieldChecksAllMatched: boolean;
  sourceProductionBlockersClear: boolean;
  regularGateDigestStable: boolean;
  regularGateConsumesFullEvidenceChain: boolean;
  operatorCiReady: boolean;
  archiveVerificationOnlyEvidencePreserved: boolean;
  noLiveReadRerun: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalShardReadinessRegularGate: boolean;
};

export interface MinimalShardReadinessRegularGateSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceProjectReportCount: number;
  sourceCompatibleProjectCount: number;
  sourceFieldCheckCount: number;
  sourceMatchedFieldCheckCount: number;
  sourceMismatchedFieldCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalShardReadinessRegularGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v373"
    | "regular-gate"
    | "runtime-boundary"
    | "operator-ci";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1";
  gateState: "minimal-shard-readiness-regular-gate-ready" | "blocked";
  gateDecision: "freeze-minimal-shard-readiness-regular-gate" | "blocked";
  readyForMinimalShardReadinessRegularGate: boolean;
  readyForNodeV375RegularGateArchiveVerification: boolean;
  activeNodeVersion: "Node v374";
  sourceNodeVersion: "Node v373";
  consumesNodeV373ShardReadinessCompatibilityReport: true;
  regularGateOnly: true;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRequested: false;
  credentialValueRead: false;
  rawEndpointUrlRequested: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV373: SourceNodeV373ShardReadinessCompatibilityRegularGateReference;
  regularGate: MinimalShardReadinessRegularGateRecord;
  checks: MinimalShardReadinessRegularGateChecks;
  summary: MinimalShardReadinessRegularGateSummary;
  productionBlockers: MinimalShardReadinessRegularGateMessage[];
  warnings: MinimalShardReadinessRegularGateMessage[];
  recommendations: MinimalShardReadinessRegularGateMessage[];
  evidenceEndpoints: {
    regularGateJson: string;
    regularGateMarkdown: string;
    sourceNodeV373Json: string;
    sourceNodeV373Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
