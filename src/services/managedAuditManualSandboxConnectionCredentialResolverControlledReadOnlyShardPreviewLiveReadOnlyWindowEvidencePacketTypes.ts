import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketVersion =
  | "Node v772"
  | "Node v773"
  | "Node v774"
  | "Node v775"
  | "Node v776"
  | "Node v777"
  | "Node v778"
  | "Node v779"
  | "Node v780"
  | "Node v781"
  | "Node v782"
  | "Node v783"
  | "Node v784"
  | "Node v785"
  | "Node v786"
  | "Node v787"
  | "Node v788"
  | "Node v789"
  | "Node v790"
  | "Node v791";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecordKind =
  | "source-verification"
  | "operator-context"
  | "command-evidence"
  | "policy-evidence"
  | "acceptance-rule"
  | "cleanup-record"
  | "failure-triage"
  | "archive-record"
  | "handoff"
  | "closeout";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecordKind;
  sourceWorksheetStepCode: string;
  owner: "node" | "java" | "miniKv" | "crossProject" | "operator";
  target: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget;
  recordSlot: string;
  requiredFields: string[];
  acceptanceCriteria: string[];
  redactionRule: string;
  cleanupRequired: boolean;
  failureClass: string;
  captureState: "pending-manual-capture";
  runtimePayloadCaptured: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketGates {
  sourceWorksheetReady: boolean;
  recordCountComplete: boolean;
  versionsSequential: boolean;
  eachRecordMapsWorksheetStep: boolean;
  requiredFieldsPresent: boolean;
  acceptanceCriteriaPresent: boolean;
  redactionRulesPresent: boolean;
  cleanupRecordsPresent: boolean;
  targetCoverageComplete: boolean;
  allRecordsPendingManualCapture: boolean;
  noRuntimePayloadCaptured: boolean;
  noSecretValues: boolean;
  allRecordsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacket {
  evidencePacketVersion: "Node v791";
  inputCommandWorksheetVersion: "Node v771";
  packetState: "ready-for-manual-evidence-capture" | "blocked";
  readyForManualEvidenceCapture: boolean;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  recordCount: number;
  targetCount: number;
  commandEvidenceRecordCount: number;
  cleanupRecordCount: number;
  failureClassCount: number;
  requiredFieldCount: number;
  acceptanceCriterionCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  records: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidencePacketRecord[];
  evidencePacketDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  runtimePayloadCaptured: false;
  containsSecretValue: false;
}
