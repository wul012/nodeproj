import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerVersion =
  | "Node v792"
  | "Node v793"
  | "Node v794"
  | "Node v795"
  | "Node v796"
  | "Node v797"
  | "Node v798"
  | "Node v799"
  | "Node v800"
  | "Node v801"
  | "Node v802"
  | "Node v803"
  | "Node v804"
  | "Node v805"
  | "Node v806"
  | "Node v807"
  | "Node v808"
  | "Node v809"
  | "Node v810"
  | "Node v811";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntryKind =
  | "source-intake"
  | "operator-intake"
  | "command-intake"
  | "policy-intake"
  | "acceptance-intake"
  | "cleanup-intake"
  | "failure-intake"
  | "archive-intake"
  | "handoff-intake"
  | "closeout";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntryKind;
  sourceEvidenceRecordCode: string;
  owner: "node" | "java" | "miniKv" | "crossProject" | "operator";
  target: ControlledReadOnlyShardPreviewLiveReadOnlyWindowCommandWorksheetTarget;
  intakeSlot: string;
  preservedRequiredFields: string[];
  preservedAcceptanceCriteria: string[];
  preservedRedactionRule: string;
  operatorInputInstruction: string;
  missingInputPolicy: string;
  cleanupRequired: boolean;
  failureClass: string;
  captureInputState: "awaiting-manual-entry";
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates {
  sourceEvidencePacketReady: boolean;
  entryCountComplete: boolean;
  versionsSequential: boolean;
  eachEntryMapsEvidenceRecord: boolean;
  sourceRecordsPendingManualCapture: boolean;
  requiredFieldsPreserved: boolean;
  acceptanceCriteriaPreserved: boolean;
  redactionRulesPreserved: boolean;
  manualInputStateOnly: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  targetCoverageComplete: boolean;
  cleanupEntriesPresent: boolean;
  failureClassesPresent: boolean;
  noSecretValues: boolean;
  allEntriesReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedger {
  ledgerVersion: "Node v811";
  inputEvidencePacketVersion: "Node v791";
  ledgerState: "ready-for-manual-evidence-intake" | "blocked";
  readyForManualEvidenceIntake: boolean;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  entryCount: number;
  targetCount: number;
  requiredFieldCount: number;
  acceptanceCriterionCount: number;
  cleanupEntryCount: number;
  failureClassCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  entries: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerEntry[];
  ledgerDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
