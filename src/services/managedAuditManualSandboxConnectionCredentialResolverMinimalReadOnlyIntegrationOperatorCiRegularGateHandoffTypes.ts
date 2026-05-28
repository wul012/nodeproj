import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationTypes.js";

export interface OperatorCiRegularGateHandoffFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface SourceNodeV368GateExecutionArchiveVerificationReference {
  sourceVersion: "Node v368";
  profileVersion: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile["profileVersion"];
  archiveVerificationState: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile["archiveVerificationState"];
  archiveVerificationDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionArchiveVerificationProfile["archiveVerificationDecision"];
  readyForArchiveVerification: boolean;
  readyForNodeV369OperatorCiRegularGateHandoff: boolean;
  sourceNodeVersion: "Node v367";
  sourceNodeV367GateExecutionResult: string;
  sourceNodeV367GateExecutionDecision: string;
  sourceNodeV367ExecutionDigest: string;
  v368ArchiveVerificationDigest: string;
  v368OperatorCiCheckDigest: string;
  sourceCheckCount: number;
  sourcePassedCheckCount: number;
  archiveCheckCount: number;
  archivePassedCheckCount: number;
  attemptedTargetCount: number;
  passedTargetCount: number;
  archiveFileCount: number;
  presentArchiveFileCount: number;
  productionBlockerCount: number;
  startsJavaService: false;
  startsMiniKvService: false;
  connectsManagedAudit: false;
  sendsManagedAuditHttpTcp: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  runtimeShellImplemented: false;
  executionAllowed: false;
}

export interface OperatorCiRegularGateHandoffArchiveReferences {
  sourceNodeV368Json: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Markdown: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Summary: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368BrowserSnapshot: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Html: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Screenshot: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Explanation: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Walkthrough: OperatorCiRegularGateHandoffFileReference;
  sourceNodeV368Plan: OperatorCiRegularGateHandoffFileReference;
}

export interface FrozenContractReference {
  contractVersion: "read-only-integration.v1" | "shard-readiness.v1";
  contractState: "frozen" | "missing";
  path: string;
  exists: boolean;
  digest: string | null;
  requiredFields: string[];
  requiredFieldCount: number;
  readOnlyRequired: boolean;
  executionAllowedRequired: boolean;
  automaticUpstreamStartAllowed: boolean;
}

export interface OperatorCiRegularGateHandoff {
  handoffDigest: string;
  handoffMode: "operator-ci-regular-minimal-read-only-gate";
  sourceSpan: "Node v367 gate execution plus Node v368 archive verification";
  freezesContracts: true;
  readOnlyIntegrationContractVersion: "read-only-integration.v1";
  shardReadinessContractVersion: "shard-readiness.v1";
  focusedCommand: string;
  groupedCommand: string;
  buildCommand: string;
  smokeCommand: string;
  actualProbeRequiresExternalReadWindow: true;
  largeTestBatchDefaultAllowed: false;
  automaticUpstreamStart: false;
  managedAuditConnectionAllowed: false;
  nextNodeVersionSuggested: "Node v370";
}

export interface ParallelShardReadinessPlan {
  planDigest: string;
  miniKvTrack: {
    recommendedVersion: "mini-kv shard-readiness prototype";
    canRunInParallelWithJava: true;
    consumesContract: "shard-readiness.v1";
    expectedOutput: "read-only JSON/CLI evidence";
    allowedScope: readonly ["shard-map", "slot-table", "key-routing", "multi-dir-or-multi-process-smoke"];
    forbiddenScope: readonly ["order-authoritative-storage", "audit-authoritative-storage", "write-admin-in-node-gate"];
  };
  javaTrack: {
    recommendedVersion: "Java shard-readiness echo";
    canRunInParallelWithMiniKv: true;
    consumesContract: "shard-readiness.v1";
    expectedOutput: "fixture-first read-only echo, then live echo";
    allowedScope: readonly ["read-only-endpoint-or-fixture", "shard-count-echo", "routing-mode-echo"];
    forbiddenScope: readonly ["order-transaction-change", "payment-or-inventory-route-change", "ledger-write"];
  };
  nodeTrack: {
    nextVersion: "Node v370";
    waitsForJavaAndMiniKvShardEvidence: true;
    consumesContracts: readonly ["read-only-integration.v1", "shard-readiness.v1"];
    role: "contract-consumer-and-integration-gate";
  };
}

export type OperatorCiRegularGateHandoffChecks = {
  sourceNodeV368Ready: boolean;
  sourceNodeV367GatePassed: boolean;
  sourceNodeV368ArchiveFilesComplete: boolean;
  sourceNodeV368ChecksAllPassed: boolean;
  sourceNodeV368DoesNotRerunProbe: boolean;
  sourceNodeV368KeepsRuntimeBoundaryClosed: boolean;
  sourceNodeV368EvidenceFilesPresent: boolean;
  readOnlyIntegrationContractPresent: boolean;
  readOnlyIntegrationContractFrozen: boolean;
  readOnlyIntegrationRequiredFieldsComplete: boolean;
  readOnlyIntegrationRulesSafe: boolean;
  shardReadinessContractPresent: boolean;
  shardReadinessContractFrozen: boolean;
  shardReadinessRequiredFieldsComplete: boolean;
  shardReadinessRulesSafe: boolean;
  handoffDigestStable: boolean;
  handoffUsesFocusedCommands: boolean;
  handoffAvoidsLargeTestBatch: boolean;
  handoffRequiresExternalReadWindowForProbe: boolean;
  handoffDoesNotStartUpstreams: boolean;
  parallelShardPlanExplicit: boolean;
  parallelJavaMiniKvAllowed: boolean;
  nodeNoLongerBlocksParallelProgress: boolean;
  noManagedAuditConnection: boolean;
  noCredentialValueRead: boolean;
  noRawEndpointUrlParsed: boolean;
  noRuntimeShellImplementedOrInvoked: boolean;
  productionAuditStillBlocked: boolean;
  productionWindowStillBlocked: boolean;
  readyForOperatorCiRegularGateHandoff: boolean;
};

export interface OperatorCiRegularGateHandoffSummary {
  checkCount: number;
  passedCheckCount: number;
  sourceArchiveCheckCount: number;
  sourceArchivePassedCheckCount: number;
  sourceGateTargetCount: number;
  sourceGatePassedTargetCount: number;
  sourceArchiveFileCount: number;
  sourcePresentArchiveFileCount: number;
  frozenContractCount: number;
  productionBlockerCount: number;
  warningCount: number;
  recommendationCount: number;
}

export interface OperatorCiRegularGateHandoffMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "node-v368"
    | "node-v367"
    | "contract-freeze"
    | "operator-ci-handoff"
    | "parallel-shard-plan"
    | "runtime-boundary";
  message: string;
}

export interface ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff.v1";
  handoffState: "operator-ci-regular-gate-handoff-ready" | "blocked";
  handoffDecision: "freeze-read-only-and-shard-readiness-contracts" | "blocked";
  readyForOperatorCiRegularGateHandoff: boolean;
  readyForParallelMiniKvShardReadinessPrototype: boolean;
  readyForParallelJavaShardReadinessEcho: boolean;
  readyForNodeV370ShardReadinessContractConsumerGate: boolean;
  consumesNodeV367GateExecution: true;
  consumesNodeV368GateExecutionArchiveVerification: true;
  activeNodeVersion: "Node v369";
  sourceNodeVersion: "Node v368";
  handoffOnly: true;
  contractFreezeIncluded: true;
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
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  sourceNodeV368: SourceNodeV368GateExecutionArchiveVerificationReference;
  archiveReferences: OperatorCiRegularGateHandoffArchiveReferences;
  frozenContracts: FrozenContractReference[];
  handoff: OperatorCiRegularGateHandoff;
  parallelShardReadinessPlan: ParallelShardReadinessPlan;
  checks: OperatorCiRegularGateHandoffChecks;
  summary: OperatorCiRegularGateHandoffSummary;
  productionBlockers: OperatorCiRegularGateHandoffMessage[];
  warnings: OperatorCiRegularGateHandoffMessage[];
  recommendations: OperatorCiRegularGateHandoffMessage[];
  evidenceEndpoints: {
    operatorCiRegularGateHandoffJson: string;
    operatorCiRegularGateHandoffMarkdown: string;
    sourceNodeV368Json: string;
    sourceNodeV368Markdown: string;
    readOnlyIntegrationContract: string;
    shardReadinessContract: string;
    activePlan: string;
    nextPlan: string;
    nextNodeVersion: string;
  };
  nextActions: string[];
}
