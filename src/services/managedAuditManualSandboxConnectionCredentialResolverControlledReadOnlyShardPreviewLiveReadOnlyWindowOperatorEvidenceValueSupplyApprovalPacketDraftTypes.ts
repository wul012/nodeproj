import type {
  HistoricalEvidenceFile,
  HistoricalSnippetMatch,
} from "./historicalEvidenceReportUtils.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeTypes.js";
import type {
  ControlledReadOnlyShardPreviewValueSupplyApprovalPacketDraftPolicy,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftPolicyCatalog.js";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftVersion =
  | "Node v962"
  | "Node v963"
  | "Node v964"
  | "Node v965"
  | "Node v966"
  | "Node v967"
  | "Node v968"
  | "Node v969"
  | "Node v970"
  | "Node v971"
  | "Node v972"
  | "Node v973"
  | "Node v974"
  | "Node v975"
  | "Node v976"
  | "Node v977"
  | "Node v978"
  | "Node v979"
  | "Node v980"
  | "Node v981"
  | "Node v982"
  | "Node v983"
  | "Node v984"
  | "Node v985"
  | "Node v986";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject =
  | "java"
  | "miniKv"
  | "node";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotKind =
  | "java-value-supply-closeout-evidence-slot"
  | "mini-kv-value-supply-envelope-evidence-slot"
  | "node-value-supply-approval-packet-draft-closeout-slot";

export type ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidenceVersion =
  | "Java v658"
  | "mini-kv v610"
  | "Node v961";

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlotKind;
  project: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject;
  sourceValueSupplyEnvelopeSlotCode: string;
  sourceValueSupplyEnvelopeNodeVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeVersion;
  sourceValueSupplyEnvelopeSlotReady: boolean;
  sourceValueSupplyEnvelopeValueState: "not-supplied";
  evidenceFileId: string;
  evidenceSnippetId: string;
  evidenceFilePresent: boolean;
  evidenceSnippetMatched: boolean;
  evidenceResolvedFromHistoricalFixture: boolean;
  evidenceExpectation: string;
  valueSupplyEvidenceVersion:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftEvidenceVersion;
  policy: ControlledReadOnlyShardPreviewValueSupplyApprovalPacketDraftPolicy;
  approvalFieldNames: string[];
  requiredReviewRecordFields: string[];
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  operatorIdentityPresent: false;
  approvalTimestampPresent: false;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  readyForValueSupplyApprovalPacketDraft: boolean;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForManualEvidenceEntry: false;
  readyForRuntimePayload: false;
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

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftGates {
  sourceValueSupplyEnvelopeReady: boolean;
  approvalPacketDraftSlotCountComplete: boolean;
  versionsSequential: boolean;
  sourceValueSupplyEnvelopeSlotsReady: boolean;
  allEvidenceFilesPresent: boolean;
  allEvidenceSnippetsMatched: boolean;
  javaV658ValueSupplyEvidenceCovered: boolean;
  miniKvV610ValueSupplyEvidenceCovered: boolean;
  nodeV961ValueSupplyEnvelopeCovered: boolean;
  allDraftSlotsReadyForReview: boolean;
  allApprovalFieldsDeclared: boolean;
  allReviewRecordFieldsDeclared: boolean;
  allApprovalPoliciesRequireSignedHumanApproval: boolean;
  missingValuePolicyFailClosed: boolean;
  malformedValuePolicyRejects: boolean;
  redactionPolicyRedactsBeforePersist: boolean;
  provenancePolicyRequiresSourceEvidence: boolean;
  noApprovalCaptured: boolean;
  noApprovalGrantPresent: boolean;
  noSignedApprovalPresent: boolean;
  operatorIdentityStillPending: boolean;
  approvalTimestampStillPending: boolean;
  noValuesSupplied: boolean;
  noValuesAccepted: boolean;
  noValuesImported: boolean;
  operatorValueSupplyStillDisabled: boolean;
  operatorValueSubmissionStillDisabled: boolean;
  evidenceImportStillBlocked: boolean;
  manualEntryStillBlocked: boolean;
  runtimePayloadStillBlocked: boolean;
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
  nextStepRequiresSignedApprovalPacket: boolean;
}

export interface ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft {
  approvalPacketDraftVersion: "Node v986";
  sourceValueSupplyEnvelopeVersion: "Node v961";
  javaValueSupplyEvidenceVersion: "Java v658";
  miniKvValueSupplyEvidenceVersion: "mini-kv v610";
  draftState: "ready-for-value-supply-approval-packet-draft" | "blocked";
  readyForValueSupplyApprovalPacketDraft: boolean;
  readyForOperatorValueSupply: false;
  readyForOperatorValueSubmission: false;
  readyForEvidenceImport: false;
  readyForManualEvidenceEntry: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  draftSlotCount: number;
  javaEvidenceSlotCount: number;
  miniKvEvidenceSlotCount: number;
  nodeValueSupplyEnvelopeSlotCount: number;
  fileCount: number;
  presentFileCount: number;
  snippetCount: number;
  matchedSnippetCount: number;
  historicalFixtureResolvedFileCount: number;
  approvalFieldCount: number;
  reviewRecordFieldCount: number;
  suppliedValueCount: 0;
  acceptedValueCount: 0;
  importedValueCount: 0;
  approvalCaptured: false;
  approvalGrantPresent: false;
  signedApprovalPresent: false;
  operatorIdentityPresent: false;
  approvalTimestampPresent: false;
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  files: Record<string, HistoricalEvidenceFile>;
  snippets: HistoricalSnippetMatch[];
  slots: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftSlot[];
  approvalPacketDraftDigest: string;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
