export type ControlledReadOnlyShardPreviewExecutionReadinessScope =
  | "node"
  | "java"
  | "miniKv"
  | "crossProject"
  | "production";

export type ControlledReadOnlyShardPreviewExecutionReadinessGateState =
  | "ready"
  | "action-required"
  | "blocked";

export interface ControlledReadOnlyShardPreviewExecutionReadinessGate {
  code: string;
  scope: ControlledReadOnlyShardPreviewExecutionReadinessScope;
  state: ControlledReadOnlyShardPreviewExecutionReadinessGateState;
  severity: "info" | "warning" | "blocker";
  evidence: string;
  nextAction: string;
  blocksLiveReadOnlyPacketPlanning: boolean;
  blocksProductionExecution: boolean;
}

export interface ControlledReadOnlyShardPreviewExecutionGapMatrix {
  matrixVersion: "Node v689";
  inputPreviewProfileVersion:
    "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1";
  sourceNodeVersion: "Node v688";
  matrixState: "ready-for-live-read-only-packet-planning" | "blocked";
  readyForLiveReadOnlyPacketPlanning: boolean;
  readyForLiveReadOnlyExecution: false;
  readyForProductionExecution: false;
  gateCount: number;
  readyGateCount: number;
  actionRequiredGateCount: number;
  blockedGateCount: number;
  liveReadOnlyPacketPlanningBlockerCount: number;
  productionExecutionBlockerCount: number;
  gates: ControlledReadOnlyShardPreviewExecutionReadinessGate[];
  requiredParallelProjects: readonly ["advanced-order-platform", "mini-kv"];
  nextPacketVersion: "Node v690";
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep {
  id: string;
  project: "orderops-node" | "advanced-order-platform" | "mini-kv";
  owner: "node" | "java" | "miniKv";
  action:
    | "keep-node-smoke-server-under-explicit-owner"
    | "start-java-read-only-service-under-explicit-owner"
    | "start-mini-kv-read-only-service-under-explicit-owner"
    | "stop-owned-process-after-window";
  automatic: false;
  cleanupRequired: true;
  status: "planned";
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget {
  id: string;
  project: "orderops-node" | "advanced-order-platform" | "mini-kv";
  protocol: "http-get" | "tcp-command";
  target: string;
  readOnly: true;
  writesAllowed: false;
  requiredOperatorHeaders: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateChecks {
  sourceGapMatrixReady: boolean;
  manualServiceOwnersPlanned: boolean;
  cleanupRequiredForEveryProcessStep: boolean;
  readTargetsComplete: boolean;
  readTargetsStayReadOnly: boolean;
  noAutomaticServiceStart: boolean;
  noWriteRouting: boolean;
  noProductionExecution: boolean;
  candidateDigestStable: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidate {
  candidateVersion: "Node v690";
  inputMatrixVersion: "Node v689";
  candidateState: "ready-for-manual-live-read-only-window" | "blocked";
  readyForManualLiveReadOnlyWindow: boolean;
  readyForProductionExecution: false;
  manualServiceStartRequired: true;
  automaticServiceStart: false;
  processStepCount: number;
  readTargetCount: number;
  processPlan: ControlledReadOnlyShardPreviewLiveReadOnlyPacketProcessStep[];
  readTargets: ControlledReadOnlyShardPreviewLiveReadOnlyPacketTarget[];
  checks: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateChecks;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  nextVerificationVersion: "Node v691";
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationGates {
  candidateReady: boolean;
  candidateDigestPresent: boolean;
  processPlanHasCleanup: boolean;
  readTargetsRemainReadOnly: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionStillBlocked: boolean;
  verificationDoesNotStartServices: true;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerification {
  verificationVersion: "Node v691";
  inputCandidateVersion: "Node v690";
  verificationState: "verified-manual-live-read-only-window-candidate" | "blocked";
  readyForManualLiveReadOnlyWindow: boolean;
  readyForProductionExecution: false;
  gateCount: number;
  passedGateCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyPacketCandidateVerificationGates;
  blockedReasonCodes: string[];
  candidateDigestValue: string;
  archivedSectionCount: number;
  archivedSections: string[];
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  nextAction: "run-three-project-live-read-only-window-with-explicit-process-owners";
}
