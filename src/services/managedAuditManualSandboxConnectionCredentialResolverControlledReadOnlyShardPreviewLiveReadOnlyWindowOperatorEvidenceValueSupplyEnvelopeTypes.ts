import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeTypes.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion =
  | "Node v937"
  | "Node v938"
  | "Node v939"
  | "Node v940"
  | "Node v941"
  | "Node v942"
  | "Node v943"
  | "Node v944"
  | "Node v945"
  | "Node v946"
  | "Node v947"
  | "Node v948"
  | "Node v949"
  | "Node v950"
  | "Node v951"
  | "Node v952"
  | "Node v953"
  | "Node v954"
  | "Node v955"
  | "Node v956"
  | "Node v957"
  | "Node v958"
  | "Node v959"
  | "Node v960"
  | "Node v961";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject =
  | "java"
  | "miniKv"
  | "node";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlotKind =
  | "java-value-draft-evidence-slot"
  | "mini-kv-value-draft-evidence-slot"
  | "node-value-supply-envelope-closeout-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeEvidenceVersion =
  | "Java v633"
  | "mini-kv v585"
  | "Node v936";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlotKind;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeProject;
  scope: ControlledReadOnlyShardPreviewLiveReadOnlyWindowEvidenceIntakeReviewPackageControlScope;
  sourceFreshSiblingIntakeSlotCode: string;
  sourceFreshSiblingIntakeNodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceFreshSiblingIntakeVersion;
  sourceFreshSiblingIntakeSlotReady: boolean;
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceFilePresent: boolean;
  evidenceSnippetMatched: boolean;
  evidenceResolvedFromHistoricalFixture: boolean;
  evidenceExpectation: string;
  valueDraftEvidenceVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeEvidenceVersion;
  envelopeFieldNames: string[];
  envelopeValueState: "not-supplied";
  valueSupplyPolicy: "explicit-operator-value-required";
  missingValuePolicy: "block-value-supply";
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  valueSupplyAdapterEnabled: false;
  readyForValueSupplyEnvelopeReview: boolean;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeGates {
  sourceFreshSiblingIntakeReady: boolean;
  valueSupplyEnvelopeSlotCountComplete: boolean;
  versionsSequential: boolean;
  sourceFreshSiblingSlotsReady: boolean;
  allEvidenceFilesPresent: boolean;
  allEvidenceSnippetsMatched: boolean;
  javaV633ValueDraftEvidenceCovered: boolean;
  miniKvV585ValueDraftEvidenceCovered: boolean;
  nodeV936FreshSiblingIntakeCovered: boolean;
  allEnvelopeSlotsReadyForReview: boolean;
  noValuesSupplied: boolean;
  noValuesAccepted: boolean;
  noValuesImported: boolean;
  allEnvelopeFieldsDeclared: boolean;
  allSupplyPoliciesExplicit: boolean;
  missingValuePolicyBlocksSupply: boolean;
  operatorValueSupplyStillDisabled: boolean;
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
  historicalFallbackReady: boolean;
  noLiveServiceRequired: boolean;
  nextStepRequiresExplicitOperatorValues: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelope {
  valueSupplyEnvelopeVersion: "Node v961";
  sourceFreshSiblingIntakeVersion: "Node v936";
  javaValueDraftEvidenceVersion: "Java v633";
  javaValueDraftResponseVersion: "Java v632";
  miniKvValueDraftEvidenceVersion: "mini-kv v585";
  envelopeState: "ready-for-value-supply-envelope-review" | "blocked";
  readyForValueSupplyEnvelopeReview: boolean;
  readyForOperatorValueSupply: false;
  readyForEvidenceImport: false;
  readyForManualEvidenceEntry: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  envelopeSlotCount: number;
  javaEvidenceSlotCount: number;
  miniKvEvidenceSlotCount: number;
  nodeFreshSiblingIntakeSlotCount: number;
  fileCount: number;
  presentFileCount: number;
  snippetCount: number;
  matchedSnippetCount: number;
  historicalFixtureResolvedFileCount: number;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  files: Record<string, HistoricalEvidenceFile>;
  snippets: HistoricalSnippetMatch[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeSlot[];
  valueSupplyEnvelopeDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
