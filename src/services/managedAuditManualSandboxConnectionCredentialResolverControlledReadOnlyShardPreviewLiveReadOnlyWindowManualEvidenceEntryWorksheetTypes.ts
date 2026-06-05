import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion =
  | "Node v837"
  | "Node v838"
  | "Node v839"
  | "Node v840"
  | "Node v841"
  | "Node v842"
  | "Node v843"
  | "Node v844"
  | "Node v845"
  | "Node v846"
  | "Node v847"
  | "Node v848"
  | "Node v849"
  | "Node v850"
  | "Node v851"
  | "Node v852"
  | "Node v853"
  | "Node v854"
  | "Node v855"
  | "Node v856"
  | "Node v857"
  | "Node v858"
  | "Node v859"
  | "Node v860"
  | "Node v861";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlotKind =
  | "ledger-check-slot"
  | "target-entry-slot"
  | "policy-archive-slot"
  | "maintenance-slot"
  | "closeout-slot";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlotKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceReviewControlCode: string;
  sourceReviewControlPassed: boolean;
  worksheetFieldNames: string[];
  operatorPrompt: string;
  validationRule: string;
  redactionRule: string;
  missingValuePolicy: string;
  manualValueState: "not-entered";
  readyForOperatorEntry: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetGates {
  sourceReviewPackageReady: boolean;
  slotCountComplete: boolean;
  versionsSequential: boolean;
  eachSlotMapsReviewControl: boolean;
  sourceControlsPassed: boolean;
  blankManualEntryOnly: boolean;
  worksheetFieldsPresent: boolean;
  operatorPromptsPresent: boolean;
  validationRulesPresent: boolean;
  redactionRulesPresent: boolean;
  targetScopesCovered: boolean;
  maintenanceSlotPresent: boolean;
  closeoutSlotPresent: boolean;
  crossProjectParallelPlanClear: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allSlotsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheet {
  worksheetVersion: "Node v861";
  sourceReviewPackageVersion: "Node v836";
  worksheetState: "ready-for-operator-entry-worksheet" | "blocked";
  readyForOperatorEntryWorksheet: boolean;
  readyForManualEvidenceEntry: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  slotCount: number;
  ledgerCheckSlotCount: number;
  targetEntrySlotCount: number;
  policyArchiveSlotCount: number;
  maintenanceSlotCount: number;
  closeoutSlotCount: number;
  scopeCount: number;
  worksheetFieldCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetSlot[];
  worksheetDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
