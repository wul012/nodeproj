import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion =
  | "Node v887"
  | "Node v888"
  | "Node v889"
  | "Node v890"
  | "Node v891"
  | "Node v892"
  | "Node v893"
  | "Node v894"
  | "Node v895"
  | "Node v896"
  | "Node v897"
  | "Node v898"
  | "Node v899"
  | "Node v900"
  | "Node v901"
  | "Node v902"
  | "Node v903"
  | "Node v904"
  | "Node v905"
  | "Node v906"
  | "Node v907"
  | "Node v908"
  | "Node v909"
  | "Node v910"
  | "Node v911";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotKind =
  | "ledger-value-draft-slot"
  | "target-value-draft-slot"
  | "policy-archive-value-draft-slot"
  | "maintenance-value-draft-slot"
  | "closeout-value-draft-slot";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlotKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourcePreflightSlotCode: string;
  sourcePreflightNodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceImportPreflightVersion;
  sourcePreflightSlotMapped: boolean;
  sourcePreflightSlotReady: boolean;
  sourcePreflightControlPassed: boolean;
  sourcePreflightValueNotImported: boolean;
  draftFieldNames: string[];
  draftValueState: "awaiting-operator-value";
  actualValueState: "not-supplied";
  readyForOperatorValueDraft: boolean;
  readyForOperatorImport: false;
  readyForEvidenceImport: false;
  draftAcceptanceRule: string;
  draftNormalizerRule: string;
  draftRedactionRule: string;
  draftImportBlockRule: string;
  draftMissingValuePolicy: string;
  operatorInstruction: string;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftGates {
  sourceImportPreflightReady: boolean;
  valueDraftSlotCountComplete: boolean;
  versionsSequential: boolean;
  eachSlotMapsPreflightSlot: boolean;
  sourcePreflightControlsPassed: boolean;
  sourcePreflightSlotsNotImported: boolean;
  sourcePreflightFieldsPresent: boolean;
  sourcePreflightNormalizersPresent: boolean;
  sourcePreflightValidationRulesPresent: boolean;
  sourcePreflightRedactionRulesPresent: boolean;
  sourcePreflightBlockRulesPresent: boolean;
  draftFieldsPresent: boolean;
  operatorInstructionsPresent: boolean;
  draftValuesAwaitingOperator: boolean;
  noActualValuesSupplied: boolean;
  targetScopesCovered: boolean;
  maintenanceDraftPresent: boolean;
  closeoutDraftPresent: boolean;
  crossProjectParallelPlanClear: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allSlotsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraft {
  valueDraftVersion: "Node v911";
  sourceImportPreflightVersion: "Node v886";
  valueDraftState: "ready-for-operator-evidence-value-draft" | "blocked";
  readyForOperatorEvidenceValueDraft: boolean;
  readyForManualEvidenceEntry: false;
  readyForEvidenceImport: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  valueDraftSlotCount: number;
  ledgerValueDraftSlotCount: number;
  targetValueDraftSlotCount: number;
  policyArchiveValueDraftSlotCount: number;
  maintenanceValueDraftSlotCount: number;
  closeoutValueDraftSlotCount: number;
  scopeCount: number;
  draftFieldCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftSlot[];
  valueDraftDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
