export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetVersion =
  | "Node v752"
  | "Node v753"
  | "Node v754"
  | "Node v755"
  | "Node v756"
  | "Node v757"
  | "Node v758"
  | "Node v759"
  | "Node v760"
  | "Node v761"
  | "Node v762"
  | "Node v763"
  | "Node v764"
  | "Node v765"
  | "Node v766"
  | "Node v767"
  | "Node v768"
  | "Node v769"
  | "Node v770"
  | "Node v771";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStepKind =
  | "source-check"
  | "environment-precheck"
  | "command-template"
  | "header-template"
  | "evidence-capture"
  | "cleanup-capture"
  | "failure-triage"
  | "archive-input"
  | "handoff"
  | "closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget =
  | "node-http"
  | "java-http"
  | "mini-kv-tcp"
  | "archive"
  | "policy";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStepKind;
  sourceRehearsalStepCode: string;
  owner: "node" | "java" | "miniKv" | "crossProject" | "operator";
  target: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget;
  commandTemplate: string;
  expectedReadOnlyResult: string;
  evidenceSlot: string;
  cleanupSlot: string | null;
  failureClass: string;
  requiresOperatorInput: boolean;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetGates {
  sourceRehearsalReady: boolean;
  stepCountComplete: boolean;
  versionsSequential: boolean;
  eachStepMapsRehearsalStep: boolean;
  commandTemplatesPresent: boolean;
  targetCoverageComplete: boolean;
  evidenceSlotsPresent: boolean;
  cleanupSlotsPresent: boolean;
  failureClassesPresent: boolean;
  noSecretValues: boolean;
  allStepsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheet {
  worksheetVersion: "Node v771";
  inputRehearsalPacketVersion: "Node v751";
  worksheetState: "ready-for-manual-command-review" | "blocked";
  readyForManualCommandReview: boolean;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  stepCount: number;
  commandTemplateCount: number;
  targetCount: number;
  evidenceSlotCount: number;
  cleanupSlotCount: number;
  failureClassCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  steps: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetStep[];
  worksheetDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  containsSecretValue: false;
}
