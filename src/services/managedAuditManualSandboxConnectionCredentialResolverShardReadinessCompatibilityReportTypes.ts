import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.js";
import type {
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";

export interface SourceNodeV370ShardReadinessStaticCompatibilityReference {
  sourceVersion: "Node v370";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["profileVersion"];
  gateState: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["gateState"];
  gateDecision: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["gateDecision"];
  readyForShardReadinessContractConsumerGate: boolean;
  readyForNodeV371MinimalShardReadinessLiveReadGate: boolean;
  gateDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
}

export interface SourceNodeV372ShardReadinessArchiveCompatibilityReference {
  sourceVersion: "Node v372";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile["archiveVerificationDecision"];
  readyForMinimalShardReadinessLiveReadArchiveVerification: boolean;
  readyForNodeV373ShardReadinessCompatibilityReport: boolean;
  archiveVerificationDigest: string;
  sourceGateDigest: string;
  sourceNodeV370GateDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  productionBlockerCount: number;
  rerunsLiveRead: false;
  startsJavaService: false;
  startsMiniKvService: false;
  stopsJavaService: false;
  stopsMiniKvService: false;
  executionAllowed: false;
}

export interface ShardReadinessCompatibilityFieldCheck {
  project: "advanced-order-platform" | "mini-kv";
  field: string;
  staticValue: string | number | boolean | null;
  liveValue: string | number | boolean | null;
  matches: boolean;
}

export interface ShardReadinessCompatibilityProjectReport {
  project: "advanced-order-platform" | "mini-kv";
  staticSourceVersion: ShardReadinessEvidenceAssessment["sourceVersion"];
  liveSourceVersion: MinimalShardReadinessLiveReadObservation["sourceVersion"];
  staticReady: boolean;
  liveReady: boolean;
  readOnlySafe: boolean;
  executionBlocked: boolean;
  activeShardingEnabled: boolean;
  fieldCount: number;
  matchedFieldCount: number;
  mismatchedFields: string[];
  compatibleForRegularGate: boolean;
}

export interface ShardReadinessCompatibilityReportRecord {
  reportDigest: string;
  reportMode: "shard-readiness-compatibility-report";
  sourceSpan: "Node v370 static contract plus Node v371/v372 archived live-read evidence";
  sourceStaticGateDigest: string;
  sourceLiveReadGateDigest: string;
  sourceArchiveVerificationDigest: string;
  comparesStaticAndLiveEvidence: true;
  consumesArchiveVerificationOnly: true;
  rerunsLiveRead: false;
  startsUpstreamServices: false;
  stopsUpstreamServices: false;
  writesUpstreamState: false;
  opensManagedAuditConnection: false;
  nextNodeVersionSuggested: "Node v374";
}

export type ShardReadinessCompatibilityReportChecks = {
  sourceNodeV370Ready: boolean;
  sourceNodeV372ArchiveReady: boolean;
  sourceDigestChainAligned: boolean;
  javaStaticEvidenceReady: boolean;
  javaLiveReadArchivedReady: boolean;
  javaStaticLiveFieldsCompatible: boolean;
  javaReadOnlyBoundarySafe: boolean;
  miniKvStaticEvidenceReady: boolean;
  miniKvLiveReadArchivedReady: boolean;
  miniKvStaticLiveFieldsCompatible: boolean;
  miniKvReadOnlyBoundarySafe: boolean;
  bothProjectsCompatible: boolean;
  archiveVerificationOnly: boolean;
  noLiveReadRerun: boolean;
  noAutomaticUpstreamStartStop: boolean;
  noUpstreamMutation: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  reportDigestStable: boolean;
  readyForShardReadinessCompatibilityReport: boolean;
};

export interface ShardReadinessCompatibilityReportSummary {
  checkCount: number;
  passedCheckCount: number;
  projectReportCount: number;
  compatibleProjectCount: number;
  fieldCheckCount: number;
  matchedFieldCheckCount: number;
  mismatchedFieldCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface ShardReadinessCompatibilityReportMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v370"
    | "node-v372"
    | "java-compatibility"
    | "mini-kv-compatibility"
    | "runtime-boundary"
    | "compatibility-report";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report.v1";
  compatibilityState: "shard-readiness-compatible-for-regular-gate" | "blocked";
  compatibilityDecision: "prepare-minimal-shard-readiness-regular-gate" | "blocked";
  readyForShardReadinessCompatibilityReport: boolean;
  readyForNodeV374MinimalShardReadinessRegularGate: boolean;
  activeNodeVersion: "Node v373";
  sourceStaticNodeVersion: "Node v370";
  sourceArchiveNodeVersion: "Node v372";
  consumesNodeV370ShardReadinessContractConsumerGate: true;
  consumesNodeV372LiveReadArchiveVerification: true;
  compatibilityReportOnly: true;
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
  sourceNodeV370: SourceNodeV370ShardReadinessStaticCompatibilityReference;
  sourceNodeV372: SourceNodeV372ShardReadinessArchiveCompatibilityReference;
  projectReports: ShardReadinessCompatibilityProjectReport[];
  fieldChecks: ShardReadinessCompatibilityFieldCheck[];
  compatibilityReport: ShardReadinessCompatibilityReportRecord;
  checks: ShardReadinessCompatibilityReportChecks;
  summary: ShardReadinessCompatibilityReportSummary;
  productionBlockers: ShardReadinessCompatibilityReportMessage[];
  warnings: ShardReadinessCompatibilityReportMessage[];
  recommendations: ShardReadinessCompatibilityReportMessage[];
  evidenceEndpoints: {
    compatibilityReportJson: string;
    compatibilityReportMarkdown: string;
    sourceNodeV370Json: string;
    sourceNodeV370Markdown: string;
    sourceNodeV372Json: string;
    sourceNodeV372Markdown: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
