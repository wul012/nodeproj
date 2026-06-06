import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion =
  | "Node v912"
  | "Node v913"
  | "Node v914"
  | "Node v915"
  | "Node v916"
  | "Node v917"
  | "Node v918"
  | "Node v919"
  | "Node v920"
  | "Node v921"
  | "Node v922"
  | "Node v923"
  | "Node v924"
  | "Node v925"
  | "Node v926"
  | "Node v927"
  | "Node v928"
  | "Node v929"
  | "Node v930"
  | "Node v931"
  | "Node v932"
  | "Node v933"
  | "Node v934"
  | "Node v935"
  | "Node v936";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject =
  | "java"
  | "miniKv"
  | "node";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotKind =
  | "java-import-preflight-evidence-slot"
  | "mini-kv-import-preflight-evidence-slot"
  | "node-value-draft-alignment-slot"
  | "cross-project-fresh-intake-closeout-slot";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlotKind;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingProject;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceValueDraftSlotCode: string;
  sourceValueDraftNodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueDraftVersion;
  sourceValueDraftSlotReady: boolean;
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceFilePresent: boolean;
  evidenceSnippetMatched: boolean;
  evidenceResolvedFromHistoricalFixture: boolean;
  evidenceExpectation: string;
  freshSiblingVersion: "Java v608" | "mini-kv v560" | "Node v911";
  readyForFreshSiblingEvidenceIntake: boolean;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForManualEvidenceEntry: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
  readOnly: true;
  writesAllowed: false;
  automaticServiceStart: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeGates {
  sourceValueDraftReady: boolean;
  intakeSlotCountComplete: boolean;
  versionsSequential: boolean;
  sourceValueDraftSlotsReady: boolean;
  allEvidenceFilesPresent: boolean;
  allEvidenceSnippetsMatched: boolean;
  javaV608EvidenceCovered: boolean;
  miniKvV560EvidenceCovered: boolean;
  nodeV911ValueDraftCovered: boolean;
  valueDraftStillHasNoActualValues: boolean;
  evidenceImportStillBlocked: boolean;
  manualEntryStillBlocked: boolean;
  liveExecutionStillBlocked: boolean;
  productionExecutionStillBlocked: boolean;
  noRuntimePayloadImported: boolean;
  noSyntheticEvidenceAccepted: boolean;
  noSecretValues: boolean;
  allSlotsReadOnly: boolean;
  noWritesAllowed: boolean;
  noAutomaticServiceStart: boolean;
  noSiblingMutation: boolean;
  crossProjectVersionsCleanAndSynced: boolean;
  historicalFallbackReady: boolean;
  noLiveServiceRequired: boolean;
  nextValueSupplyRequiresExplicitValues: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntake {
  freshSiblingIntakeVersion: "Node v936";
  sourceValueDraftVersion: "Node v911";
  javaEvidenceVersion: "Java v608";
  miniKvEvidenceVersion: "mini-kv v560";
  intakeState: "ready-for-fresh-sibling-evidence-intake" | "blocked";
  readyForFreshSiblingEvidenceIntake: boolean;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForManualEvidenceEntry: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  intakeSlotCount: number;
  javaEvidenceSlotCount: number;
  miniKvEvidenceSlotCount: number;
  nodeValueDraftAlignmentSlotCount: number;
  crossProjectCloseoutSlotCount: number;
  fileCount: number;
  presentFileCount: number;
  snippetCount: number;
  matchedSnippetCount: number;
  historicalFixtureResolvedFileCount: number;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  files: Record<string, HistoricalEvidenceFile>;
  snippets: HistoricalSnippetMatch[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeSlot[];
  freshSiblingIntakeDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
