import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageVersion =
  | "Node v812"
  | "Node v813"
  | "Node v814"
  | "Node v815"
  | "Node v816"
  | "Node v817"
  | "Node v818"
  | "Node v819"
  | "Node v820"
  | "Node v821"
  | "Node v822"
  | "Node v823"
  | "Node v824"
  | "Node v825"
  | "Node v826"
  | "Node v827"
  | "Node v828"
  | "Node v829"
  | "Node v830"
  | "Node v831"
  | "Node v832"
  | "Node v833"
  | "Node v834"
  | "Node v835"
  | "Node v836";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlKind =
  | "ledger-gate-review"
  | "target-intake-review"
  | "archive-policy-review"
  | "maintenance-boundary-review"
  | "closeout";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope =
  | "ledger"
  | "node"
  | "java"
  | "miniKv"
  | "policyArchive"
  | "maintenance"
  | "crossProject";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageLedgerGate =
  keyof ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeLedgerGates;

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlKind;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceLedgerGate: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageLedgerGate;
  sourceGatePassed: boolean;
  sourceLedgerEntryCodes: string[];
  reviewInstruction: string;
  blockingPolicy: string;
  maintenanceAction: string;
  reviewState: "awaiting-operator-review";
  requiresOperatorReview: true;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageGates {
  sourceIntakeLedgerReady: boolean;
  controlCountComplete: boolean;
  versionsSequential: boolean;
  sourceLedgerGateNamesCovered: boolean;
  sourceLedgerGatePassagePreserved: boolean;
  sourceLedgerEntriesCovered: boolean;
  sourceLedgerEntryCodesValid: boolean;
  manualReviewStateOnly: boolean;
  requiredFieldsPreserved: boolean;
  acceptanceCriteriaPreserved: boolean;
  redactionRulesPreserved: boolean;
  targetCoveragePreserved: boolean;
  cleanupCoveragePreserved: boolean;
  failureClassesPreserved: boolean;
  maintenanceControlsPresent: boolean;
  crossProjectParallelPlanClear: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allControlsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  productionExecutionBlocked: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackage {
  packageVersion: "Node v836";
  sourceIntakeLedgerVersion: "Node v811";
  packageState: "ready-for-operator-intake-review" | "blocked";
  readyForOperatorIntakeReview: boolean;
  readyForManualEvidenceEntry: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  controlCount: number;
  ledgerGateReviewControlCount: number;
  targetReviewControlCount: number;
  maintenanceReviewControlCount: number;
  sourceLedgerEntryCoverageCount: number;
  targetCount: number;
  requiredFieldCount: number;
  acceptanceCriterionCount: number;
  cleanupEntryCount: number;
  failureClassCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  controls: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControl[];
  packageDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
