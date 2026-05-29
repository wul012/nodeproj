import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationTypes.js";

export type EvidenceProject = "advanced-order-platform" | "mini-kv";
export type EvidenceSourceVersion = "Java v154" | "mini-kv v145";

export interface EvidenceFileReference {
  project: EvidenceProject;
  role: "java-hardening" | "java-source-core" | "mini-kv-hardening";
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
  usedHistoricalFallback: boolean;
  historicalFallbackAvailable: boolean;
}

export interface ShardReadinessContractView {
  project: string;
  version: string;
  sourceCoreVersion: string | null;
  releaseVersion: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  status: string | null;
  evidencePath: string | null;
  rawFieldCount: number;
}

export interface ShardReadinessEvidenceAssessment {
  project: EvidenceProject;
  sourceVersion: EvidenceSourceVersion;
  hardeningFile: EvidenceFileReference;
  sourceCoreFile: EvidenceFileReference | null;
  contractVersionObserved: string | null;
  evidence: ShardReadinessContractView;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFields: string[];
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardCountValid: boolean;
  slotCountValid: boolean;
  routingModePresent: boolean;
  statusAccepted: boolean;
  hardeningExplainsFields: boolean;
  sourceCoreLinked: boolean;
  boundarySafe: boolean;
  preservesArchivedNodeEvidence: boolean;
  readyForNodeConsumption: boolean;
}

export interface SourceNodeV375ArchiveVerificationReference {
  sourceVersion: "Node v375";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile["archiveVerificationDecision"];
  readyForMinimalShardReadinessRegularGateArchiveVerification: boolean;
  readyForNodeV376JavaMiniKvShardEvidenceConsumption: boolean;
  sourceArchiveVerificationDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  connectsManagedAudit: false;
  executionAllowed: false;
}

export interface JavaMiniKvShardReadinessEvidenceConsumptionRecord {
  consumptionDigest: string;
  consumptionMode: "java-mini-kv-shard-readiness-evidence-consumption";
  sourceSpan: "Node v375 archive verification plus Java v154 and mini-kv v145 hardening evidence";
  sourceNodeV375Digest: string;
  javaV154HardeningDigest: string | null;
  javaV153SourceDigest: string | null;
  miniKvV145Digest: string | null;
  verifiesRequiredContractFields: readonly string[];
  verifiesHistoricalFallback: true;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v377";
}

export type JavaMiniKvShardReadinessEvidenceConsumptionChecks = {
  sourceNodeV375Ready: boolean;
  sourceNodeV375ArchiveVerified: boolean;
  sourceNodeV375BoundariesClosed: boolean;
  javaV154HardeningFilePresent: boolean;
  javaV153SourceCoreFilePresent: boolean;
  javaRequiredFieldsComplete: boolean;
  javaReadOnlySafe: boolean;
  javaExecutionBlocked: boolean;
  javaStatusAccepted: boolean;
  javaHardeningExplainsFields: boolean;
  javaSourceCoreLinked: boolean;
  miniKvV145FilePresent: boolean;
  miniKvReleaseVersionV145: boolean;
  miniKvRequiredFieldsComplete: boolean;
  miniKvReadOnlySafe: boolean;
  miniKvExecutionBlocked: boolean;
  miniKvStatusAccepted: boolean;
  miniKvBoundarySafe: boolean;
  miniKvArchivedEvidencePreserved: boolean;
  bothEvidenceSourcesReady: boolean;
  historicalFallbackCovered: boolean;
  digestCoverageComplete: boolean;
  nodeDoesNotStartOrStopUpstreams: boolean;
  nodeDoesNotMutateSiblingState: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForJavaMiniKvShardReadinessEvidenceConsumption: boolean;
};

export interface JavaMiniKvShardReadinessEvidenceConsumptionMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v375"
    | "java-v154"
    | "mini-kv-v145"
    | "shard-readiness-contract"
    | "runtime-boundary"
    | "next-plan";
  message: string;
}

export interface JavaMiniKvShardReadinessEvidenceConsumptionSummary {
  checkCount: number;
  passedCheckCount: number;
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFieldCount: number;
  historicalFallbackSourceCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1";
  evidenceConsumptionState: "java-mini-kv-shard-readiness-evidence-consumed" | "blocked";
  evidenceConsumptionDecision: "consume-java-v154-and-mini-kv-v145-hardening" | "blocked";
  readyForJavaMiniKvShardReadinessEvidenceConsumption: boolean;
  readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification: boolean;
  activeNodeVersion: "Node v376";
  sourceNodeVersion: "Node v375";
  consumesNodeV375ArchiveVerification: true;
  consumesJavaV154ShardReadinessHardening: true;
  consumesMiniKvV145ShardReadinessHardening: true;
  evidenceConsumptionOnly: true;
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
  sourceNodeV375: SourceNodeV375ArchiveVerificationReference;
  javaShardReadiness: ShardReadinessEvidenceAssessment;
  miniKvShardReadiness: ShardReadinessEvidenceAssessment;
  evidenceConsumption: JavaMiniKvShardReadinessEvidenceConsumptionRecord;
  checks: JavaMiniKvShardReadinessEvidenceConsumptionChecks;
  summary: JavaMiniKvShardReadinessEvidenceConsumptionSummary;
  productionBlockers: JavaMiniKvShardReadinessEvidenceConsumptionMessage[];
  warnings: JavaMiniKvShardReadinessEvidenceConsumptionMessage[];
  recommendations: JavaMiniKvShardReadinessEvidenceConsumptionMessage[];
  evidenceEndpoints: {
    evidenceConsumptionJson: string;
    evidenceConsumptionMarkdown: string;
    sourceNodeV375Json: string;
    sourceNodeV375Markdown: string;
    javaV154HardeningEvidence: string;
    javaV153SourceEvidence: string;
    miniKvV145Evidence: string;
    miniKvV145HistoricalFallback: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
