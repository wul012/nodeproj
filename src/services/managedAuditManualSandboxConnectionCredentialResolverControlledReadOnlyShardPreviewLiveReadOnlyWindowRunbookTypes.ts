export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookVersion =
  | "Node v712"
  | "Node v713"
  | "Node v714"
  | "Node v715"
  | "Node v716"
  | "Node v717"
  | "Node v718"
  | "Node v719"
  | "Node v720"
  | "Node v721"
  | "Node v722"
  | "Node v723"
  | "Node v724"
  | "Node v725"
  | "Node v726"
  | "Node v727"
  | "Node v728"
  | "Node v729"
  | "Node v730"
  | "Node v731";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSectionKind =
  | "owner"
  | "target"
  | "header-policy"
  | "command-policy"
  | "forbidden-operation"
  | "evidence"
  | "cleanup"
  | "verification"
  | "archive"
  | "handoff"
  | "closeout";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSectionKind;
  owner: "node" | "java" | "miniKv" | "crossProject";
  operatorInstruction: string;
  requiredEvidence: string;
  verifiesStageCode: string;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  cleanupRequired: boolean;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageGates {
  sourceStageLedgerReady: boolean;
  sectionCountComplete: boolean;
  versionsSequential: boolean;
  eachSectionMapsStage: boolean;
  allSectionsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  cleanupInstructionsPresent: boolean;
  nodeJavaMiniKvTargetsCovered: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackage {
  packageVersion: "Node v731";
  inputStageLedgerVersion: "Node v711";
  packageState: "ready-for-operator-live-read-only-window" | "blocked";
  readyForOperatorLiveReadOnlyWindow: boolean;
  readyForProductionExecution: false;
  sectionCount: number;
  ownerCount: number;
  cleanupRequiredSectionCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookPackageGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  sections: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRunbookSection[];
  packageDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}
