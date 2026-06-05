import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion =
  | "Node v862"
  | "Node v863"
  | "Node v864"
  | "Node v865"
  | "Node v866"
  | "Node v867"
  | "Node v868"
  | "Node v869"
  | "Node v870"
  | "Node v871"
  | "Node v872"
  | "Node v873"
  | "Node v874"
  | "Node v875"
  | "Node v876"
  | "Node v877"
  | "Node v878"
  | "Node v879"
  | "Node v880"
  | "Node v881"
  | "Node v882"
  | "Node v883"
  | "Node v884"
  | "Node v885"
  | "Node v886";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotKind =
  | "ledger-import-preflight-slot"
  | "target-import-preflight-slot"
  | "policy-archive-import-preflight-slot"
  | "maintenance-import-preflight-slot"
  | "closeout-import-preflight-slot";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlotKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceWorksheetSlotCode: string;
  sourceWorksheetNodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowManualEvidenceEntryWorksheetVersion;
  sourceWorksheetSlotBlank: boolean;
  sourceWorksheetControlPassed: boolean;
  importFieldNames: string[];
  expectedValueState: "operator-supplied-later";
  normalizerRule: string;
  validationRule: string;
  redactionRule: string;
  importBlockRule: string;
  missingValuePolicy: string;
  importValueState: "not-imported";
  manualValueState: "not-entered";
  readyForOperatorImport: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightGates {
  sourceWorksheetReady: boolean;
  preflightSlotCountComplete: boolean;
  versionsSequential: boolean;
  eachSlotMapsWorksheetSlot: boolean;
  sourceWorksheetControlsPassed: boolean;
  sourceWorksheetSlotsBlank: boolean;
  importFieldNamesPresent: boolean;
  normalizerRulesPresent: boolean;
  validationRulesPresent: boolean;
  redactionRulesPresent: boolean;
  importBlockRulesPresent: boolean;
  missingValuePoliciesPreserved: boolean;
  targetScopesCovered: boolean;
  maintenancePreflightPresent: boolean;
  closeoutPreflightPresent: boolean;
  crossProjectParallelPlanClear: boolean;
  noValuesImported: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allSlotsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflight {
  preflightVersion: "Node v886";
  sourceWorksheetVersion: "Node v861";
  preflightState: "ready-for-operator-evidence-import-preflight" | "blocked";
  readyForOperatorEvidenceImportPreflight: boolean;
  readyForManualEvidenceEntry: false;
  readyForEvidenceImport: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  preflightSlotCount: number;
  ledgerImportPreflightSlotCount: number;
  targetImportPreflightSlotCount: number;
  policyArchiveImportPreflightSlotCount: number;
  maintenanceImportPreflightSlotCount: number;
  closeoutImportPreflightSlotCount: number;
  scopeCount: number;
  importFieldCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightSlot[];
  importPreflightDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
