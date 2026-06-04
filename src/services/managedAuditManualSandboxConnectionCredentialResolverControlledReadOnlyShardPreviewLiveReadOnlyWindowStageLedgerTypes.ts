export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageVersion =
  | "Node v692"
  | "Node v693"
  | "Node v694"
  | "Node v695"
  | "Node v696"
  | "Node v697"
  | "Node v698"
  | "Node v699"
  | "Node v700"
  | "Node v701"
  | "Node v702"
  | "Node v703"
  | "Node v704"
  | "Node v705"
  | "Node v706"
  | "Node v707"
  | "Node v708"
  | "Node v709"
  | "Node v710"
  | "Node v711";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageCategory =
  | "process-ownership"
  | "read-target"
  | "evidence"
  | "cleanup"
  | "verification"
  | "archive"
  | "handoff"
  | "closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageOwner =
  | "node"
  | "java"
  | "miniKv"
  | "crossProject";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageVersion;
  code: string;
  category: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageCategory;
  owner: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageOwner;
  state: "ready" | "blocked";
  evidence: string;
  nextAction: string;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  cleanupRequired: boolean;
  startsServices: false;
  mutatesSiblingState: false;
  productionExecutionAllowed: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerGates {
  sourceVerificationReady: boolean;
  stageCountComplete: boolean;
  stageVersionsSequential: boolean;
  allStagesReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  cleanupCoverageComplete: boolean;
  noProductionExecution: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger {
  ledgerVersion: "Node v711";
  inputCandidateVerificationVersion: "Node v691";
  ledgerState: "ready-for-manual-live-read-only-window" | "blocked";
  readyForManualLiveReadOnlyWindow: boolean;
  readyForProductionExecution: false;
  stageCount: number;
  readyStageCount: number;
  blockedStageCount: number;
  cleanupRequiredStageCount: number;
  ownerCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedgerGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  stages: ControlledReadOnlyShardPreviewLiveReadOnlyWindowStage[];
  ledgerDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}
