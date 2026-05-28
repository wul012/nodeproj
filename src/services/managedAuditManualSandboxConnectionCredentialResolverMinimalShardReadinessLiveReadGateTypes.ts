import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";

export interface SourceNodeV370ShardReadinessConsumerGateReference {
  sourceVersion: "Node v370";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["profileVersion"];
  gateState: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["gateState"];
  gateDecision: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile["gateDecision"];
  readyForShardReadinessContractConsumerGate: boolean;
  readyForNodeV371MinimalShardReadinessLiveReadGate: boolean;
  sourceGateDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  evidenceSourceCount: number;
  readyEvidenceSourceCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  executionAllowed: false;
}

export interface MinimalShardReadinessLiveReadObservation {
  project: "advanced-order-platform" | "mini-kv";
  sourceVersion: "Java v153 live" | "mini-kv v144 live";
  attempted: boolean;
  status: "passed-read" | "failed-read" | "skipped-probes-disabled";
  transport: "http-json" | "tcp-command";
  endpoint: string;
  command: string | null;
  statusCode: number | null;
  latencyMs: number | null;
  errorCode: string | null;
  errorMessage: string | null;
  evidence: Record<string, unknown> | null;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFields: string[];
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardCountValid: boolean;
  slotCountValid: boolean;
  routingModePresent: boolean;
  statusAccepted: boolean;
  compatibleWithV370Evidence: boolean;
  boundarySafe: boolean;
  readyForGate: boolean;
}

export interface MinimalShardReadinessLiveReadGate {
  gateDigest: string;
  gateMode: "minimal-shard-readiness-live-read";
  sourceSpan: "Node v370 consumer gate plus Java and mini-kv live shard readiness reads";
  liveReadOnly: true;
  javaEndpoint: "GET /api/v1/ops/shard-readiness";
  miniKvCommand: "SHARDJSON";
  focusedCommand: string;
  groupedCommand: string;
  buildCommand: string;
  smokeCommand: string;
  automaticUpstreamStart: false;
  automaticUpstreamStop: false;
  writeCommandsAllowed: false;
  nextNodeVersionSuggested: "Node v372";
}

export type MinimalShardReadinessLiveReadGateChecks = {
  sourceNodeV370Ready: boolean;
  sourceNodeV370EvidenceSourcesReady: boolean;
  upstreamProbesEnabledForLiveRead: boolean;
  javaLiveReadAttempted: boolean;
  javaLiveReadPassed: boolean;
  javaRequiredFieldsComplete: boolean;
  javaReadOnlySafe: boolean;
  javaExecutionBlocked: boolean;
  javaCompatibleWithV370Evidence: boolean;
  miniKvLiveReadAttempted: boolean;
  miniKvLiveReadPassed: boolean;
  miniKvRequiredFieldsComplete: boolean;
  miniKvReadOnlySafe: boolean;
  miniKvExecutionBlocked: boolean;
  miniKvCompatibleWithV370Evidence: boolean;
  miniKvBoundarySafe: boolean;
  bothLiveReadsReady: boolean;
  digestStable: boolean;
  nodeDoesNotStartUpstreams: boolean;
  nodeDoesNotStopUpstreams: boolean;
  nodeDoesNotMutateSiblingState: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForMinimalShardReadinessLiveReadGate: boolean;
};

export interface MinimalShardReadinessLiveReadGateSummary {
  checkCount: number;
  passedCheckCount: number;
  attemptedReadCount: number;
  passedReadCount: number;
  failedReadCount: number;
  skippedReadCount: number;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFieldCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface MinimalShardReadinessLiveReadGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v370"
    | "java-live-read"
    | "mini-kv-live-read"
    | "runtime-boundary"
    | "next-plan";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-gate.v1";
  gateState: "minimal-shard-readiness-live-read-gate-ready" | "blocked";
  gateDecision: "archive-minimal-shard-readiness-live-read" | "blocked";
  readyForMinimalShardReadinessLiveReadGate: boolean;
  readyForNodeV372LiveReadArchiveVerification: boolean;
  activeNodeVersion: "Node v371";
  sourceNodeVersion: "Node v370";
  consumesNodeV370ShardReadinessContractConsumerGate: true;
  liveReadOnly: true;
  rerunsV370StaticConsumer: true;
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
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV370: SourceNodeV370ShardReadinessConsumerGateReference;
  sourceStaticEvidence: {
    java: ShardReadinessEvidenceAssessment;
    miniKv: ShardReadinessEvidenceAssessment;
  };
  liveReads: {
    java: MinimalShardReadinessLiveReadObservation;
    miniKv: MinimalShardReadinessLiveReadObservation;
  };
  gate: MinimalShardReadinessLiveReadGate;
  checks: MinimalShardReadinessLiveReadGateChecks;
  summary: MinimalShardReadinessLiveReadGateSummary;
  productionBlockers: MinimalShardReadinessLiveReadGateMessage[];
  warnings: MinimalShardReadinessLiveReadGateMessage[];
  recommendations: MinimalShardReadinessLiveReadGateMessage[];
  evidenceEndpoints: {
    minimalShardReadinessLiveReadGateJson: string;
    minimalShardReadinessLiveReadGateMarkdown: string;
    sourceNodeV370Json: string;
    sourceNodeV370Markdown: string;
    javaLiveEndpoint: string;
    miniKvLiveCommand: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
