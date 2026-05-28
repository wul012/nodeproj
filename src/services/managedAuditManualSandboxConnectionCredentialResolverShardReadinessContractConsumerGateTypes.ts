import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffTypes.js";

export interface ShardReadinessEvidenceFileReference {
  project: "advanced-order-platform" | "mini-kv";
  configuredPath: string;
  resolvedPath: string;
  historicalFallbackPath: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
  usedHistoricalFallback: boolean;
  historicalFallbackAvailable: boolean;
}

export interface ShardReadinessEvidenceView {
  project: string;
  version: string;
  releaseVersion: string | null;
  readOnly: boolean | null;
  executionAllowed: boolean | null;
  shardEnabled: boolean | null;
  shardCount: number | null;
  slotCount: number | null;
  routingMode: string | null;
  evidencePath: string | null;
  status: string | null;
  evidenceDigest: string | null;
  rawFieldCount: number;
}

export interface ShardReadinessEvidenceAssessment {
  project: "advanced-order-platform" | "mini-kv";
  sourceVersion: "Java v153" | "mini-kv v144";
  evidenceFile: ShardReadinessEvidenceFileReference;
  evidence: ShardReadinessEvidenceView;
  contractVersionObserved: string | null;
  requiredFieldCount: number;
  presentRequiredFieldCount: number;
  missingRequiredFields: string[];
  readOnlySafe: boolean;
  executionBlocked: boolean;
  shardCountValid: boolean;
  slotCountValid: boolean;
  routingModePresent: boolean;
  statusAccepted: boolean;
  sourceSpecificPrototypeValueAccepted: boolean;
  boundarySafe: boolean;
  readyForNodeConsumption: boolean;
}

export interface SourceNodeV369OperatorCiHandoffReference {
  sourceVersion: "Node v369";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile["profileVersion"];
  handoffState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile["handoffState"];
  handoffDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile["handoffDecision"];
  readyForOperatorCiRegularGateHandoff: boolean;
  readyForNodeV370ShardReadinessContractConsumerGate: boolean;
  sourceHandoffDigest: string;
  sourcePlanDigest: string;
  frozenContractCount: number;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  executionAllowed: false;
}

export interface ShardReadinessContractConsumerGate {
  gateDigest: string;
  gateMode: "shard-readiness-contract-consumer";
  sourceSpan: "Node v369 handoff plus Java v153 and mini-kv v144 shard readiness evidence";
  consumesContracts: readonly ["read-only-integration.v1", "shard-readiness.v1"];
  consumesSiblingEvidence: readonly ["Java v153", "mini-kv v144"];
  focusedCommand: string;
  groupedCommand: string;
  buildCommand: string;
  smokeCommand: string;
  nodeRole: "contract-consumer-and-integration-gate";
  automaticUpstreamStart: false;
  externalReadWindowRequiredForLiveGate: true;
  nextNodeVersionSuggested: "Node v371";
}

export type ShardReadinessContractConsumerGateChecks = {
  sourceNodeV369Ready: boolean;
  sourceNodeV369ContractsFrozen: boolean;
  sourceNodeV369BoundariesClosed: boolean;
  javaEvidenceFilePresent: boolean;
  javaEvidenceRequiredFieldsComplete: boolean;
  javaEvidenceReadOnly: boolean;
  javaEvidenceExecutionBlocked: boolean;
  javaShardCountValid: boolean;
  javaSlotCountValid: boolean;
  javaRoutingModePresent: boolean;
  javaStatusAccepted: boolean;
  miniKvEvidenceFilePresent: boolean;
  miniKvEvidenceRequiredFieldsComplete: boolean;
  miniKvEvidenceReadOnly: boolean;
  miniKvEvidenceExecutionBlocked: boolean;
  miniKvShardCountValid: boolean;
  miniKvSlotCountValid: boolean;
  miniKvRoutingModePresent: boolean;
  miniKvStatusAccepted: boolean;
  miniKvBoundarySafe: boolean;
  bothEvidenceSourcesReady: boolean;
  digestCoverageComplete: boolean;
  historicalFallbackCovered: boolean;
  nodeDoesNotStartUpstreams: boolean;
  nodeDoesNotMutateSiblingState: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForShardReadinessContractConsumerGate: boolean;
};

export interface ShardReadinessContractConsumerGateSummary {
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

export interface ShardReadinessContractConsumerGateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v369"
    | "java-v153"
    | "mini-kv-v144"
    | "shard-readiness-contract"
    | "runtime-boundary"
    | "next-plan";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate.v1";
  gateState: "shard-readiness-contract-consumer-gate-ready" | "blocked";
  gateDecision: "consume-java-and-mini-kv-shard-readiness-evidence" | "blocked";
  readyForShardReadinessContractConsumerGate: boolean;
  readyForNodeV371MinimalShardReadinessLiveReadGate: boolean;
  activeNodeVersion: "Node v370";
  sourceNodeVersion: "Node v369";
  consumesNodeV369OperatorCiRegularGateHandoff: true;
  consumesJavaV153ShardReadinessEcho: true;
  consumesMiniKvV144ShardReadinessPrototype: true;
  contractConsumerOnly: true;
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
  runtimeShellImplemented: false;
  runtimeShellInvocationAllowed: false;
  executionAllowed: false;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV369: SourceNodeV369OperatorCiHandoffReference;
  javaShardReadiness: ShardReadinessEvidenceAssessment;
  miniKvShardReadiness: ShardReadinessEvidenceAssessment;
  gate: ShardReadinessContractConsumerGate;
  checks: ShardReadinessContractConsumerGateChecks;
  summary: ShardReadinessContractConsumerGateSummary;
  productionBlockers: ShardReadinessContractConsumerGateMessage[];
  warnings: ShardReadinessContractConsumerGateMessage[];
  recommendations: ShardReadinessContractConsumerGateMessage[];
  evidenceEndpoints: {
    shardReadinessContractConsumerGateJson: string;
    shardReadinessContractConsumerGateMarkdown: string;
    sourceNodeV369Json: string;
    sourceNodeV369Markdown: string;
    javaShardReadinessEvidence: string;
    miniKvShardReadinessEvidence: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
