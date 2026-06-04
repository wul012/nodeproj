export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalVersion =
  | "Node v732"
  | "Node v733"
  | "Node v734"
  | "Node v735"
  | "Node v736"
  | "Node v737"
  | "Node v738"
  | "Node v739"
  | "Node v740"
  | "Node v741"
  | "Node v742"
  | "Node v743"
  | "Node v744"
  | "Node v745"
  | "Node v746"
  | "Node v747"
  | "Node v748"
  | "Node v749"
  | "Node v750"
  | "Node v751";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStepKind =
  | "preflight"
  | "target-read"
  | "policy-check"
  | "evidence-slot"
  | "cleanup-slot"
  | "failure-class"
  | "archive-input"
  | "verification"
  | "handoff"
  | "closeout";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStepKind;
  sourceRunbookSectionCode: string;
  owner: "node" | "java" | "miniKv" | "crossProject";
  rehearsalInstruction: string;
  evidenceSlot: string;
  failureClass: string;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
  cleanupRequired: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketGates {
  sourceRunbookReady: boolean;
  stepCountComplete: boolean;
  versionsSequential: boolean;
  eachStepMapsRunbookSection: boolean;
  preflightPresent: boolean;
  evidenceSlotsPresent: boolean;
  cleanupSlotsPresent: boolean;
  failureClassesPresent: boolean;
  allStepsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacket {
  packetVersion: "Node v751";
  inputRunbookPackageVersion: "Node v731";
  packetState: "ready-for-manual-live-read-only-rehearsal" | "blocked";
  readyForManualLiveReadOnlyRehearsal: boolean;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  stepCount: number;
  ownerCount: number;
  evidenceSlotCount: number;
  cleanupRequiredStepCount: number;
  failureClassCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalPacketGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  steps: ControlledReadOnlyShardPreviewLiveReadOnlyWindowRehearsalStep[];
  packetDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}
