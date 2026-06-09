import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";

export type ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion =
  | "Node v1412"
  | "Node v1413"
  | "Node v1414"
  | "Node v1415"
  | "Node v1416"
  | "Node v1417"
  | "Node v1418"
  | "Node v1419"
  | "Node v1420"
  | "Node v1421";

export type ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind =
  | "source-precheck-intake-slot"
  | "reviewed-document-envelope-intake-slot"
  | "field-completeness-intake-slot"
  | "operator-review-attestation-intake-slot"
  | "identity-signature-intake-slot"
  | "evidence-policy-intake-slot"
  | "redaction-secret-boundary-intake-slot"
  | "runtime-payload-freeze-intake-slot"
  | "execution-write-mutation-freeze-intake-slot"
  | "archive-handoff-closeout-intake-slot";

export type ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind =
  | "source-precheck-intake-guard"
  | "reviewed-document-envelope-intake-guard"
  | "field-completeness-intake-guard"
  | "operator-review-attestation-intake-guard"
  | "identity-signature-intake-guard"
  | "evidence-policy-intake-guard"
  | "redaction-secret-boundary-intake-guard"
  | "runtime-payload-freeze-intake-guard"
  | "execution-write-mutation-freeze-intake-guard"
  | "archive-handoff-closeout-intake-guard";

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion;
  code: string;
  slotName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind;
  guardKind: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind;
  sourceCheckpointKinds: ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpointKind[];
  intakeInstruction: string;
  guardCriterion: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardTemplate {
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind;
  sourceSlotCode: string;
  guardText: string;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion;
  code: string;
  slotName: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlotKind;
  sourceCheckpointCodes: string[];
  sourceValidatorCodes: string[];
  sourceReady: boolean;
  candidateFields: string[];
  candidateFieldCount: number;
  intakeInstruction: string;
  guardCriterion: string;
  readyForCandidateDocumentIntakeSlot: boolean;
  requiresReviewedRealCandidateDocument: true;
  reviewedRealCandidateDocumentPresent: false;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard {
  order: number;
  nodeVersion: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketVersion;
  code: string;
  kind: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuardKind;
  sourceSlotCode: string;
  sourceSlotReady: boolean;
  guardText: string;
  rejectsMissingCandidateDocument: true;
  rejectsSyntheticCandidateDocument: true;
  quarantinesUnreviewedCandidateDocument: true;
  blocksCandidatePayloadImport: true;
  blocksCandidateEvaluation: true;
  blocksCandidateAcceptance: true;
  blocksApprovalGrant: true;
  blocksSignedApproval: true;
  blocksRuntimePayload: true;
  blocksWrites: true;
  blocksSiblingMutation: true;
  readyForCandidateDocumentIntakeGuard: boolean;
  readOnly: true;
  writesAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates {
  sourceSubmissionPrecheckReady: boolean;
  slotCountComplete: boolean;
  guardCountComplete: boolean;
  slotVersionsSequential: boolean;
  guardVersionsSequential: boolean;
  allSourceCheckpointsCovered: boolean;
  allSourceValidatorsCovered: boolean;
  allRequiredFieldsCarried: boolean;
  intakeFieldCountMatchesSource: boolean;
  allSlotsReady: boolean;
  allGuardsReady: boolean;
  allSlotsReadOnly: boolean;
  allGuardsReadOnly: boolean;
  allSlotsRequireReviewedRealCandidateDocument: boolean;
  allGuardsRejectMissingDocument: boolean;
  allGuardsRejectSyntheticDocument: boolean;
  allGuardsQuarantineUnreviewedDocument: boolean;
  allGuardsBlockPayloadImport: boolean;
  allGuardsBlockEvaluation: boolean;
  allGuardsBlockAcceptance: boolean;
  allGuardsBlockApprovalGrant: boolean;
  allGuardsBlockSignedApproval: boolean;
  allGuardsBlockRuntimePayload: boolean;
  allGuardsBlockWrites: boolean;
  allGuardsBlockSiblingMutation: boolean;
  sourceRealDocumentStillAbsent: boolean;
  intakeRealDocumentStillAbsent: boolean;
  intakePayloadImportStillBlocked: boolean;
  intakeEvaluationStillBlocked: boolean;
  sourceSubmissionStillBlocked: boolean;
  sourceIntakeStillBlocked: boolean;
  sourceExecutionStillBlocked: boolean;
  sourceWritesStillBlocked: boolean;
  noSideEffectsAllowed: boolean;
  nextStepRequiresReviewedRealCandidateDocumentMaterial: boolean;
}

export interface ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket {
  candidateDocumentIntakePacketVersion: "Node v1421";
  sourceCandidateDocumentSubmissionPrecheckVersion:
    ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck[
      "candidateDocumentSubmissionPrecheckVersion"
    ];
  candidateDocumentIntakePacketState:
    "ready-for-reviewed-real-candidate-document-intake-packet" | "blocked";
  readyForCandidateDocumentIntakePacket: boolean;
  readyForReviewedRealCandidateDocumentIntake: false;
  readyForCandidatePayloadImport: false;
  readyForCandidateEvaluation: false;
  readyForApprovalGrant: false;
  readyForSignedApproval: false;
  readyForRuntimePayload: false;
  readyForLiveExecution: false;
  readyForProductionExecution: false;
  intakeSlotCount: number;
  intakeGuardCount: number;
  sourceCheckpointCount: number;
  sourceValidatorCount: number;
  readyIntakeSlotCount: number;
  readyIntakeGuardCount: number;
  requiredCandidateFieldCount: number;
  intakeCandidateFieldCount: number;
  reviewedRealCandidateDocumentPresent: false;
  realCandidateDocumentCount: 0;
  syntheticCandidateDocumentCount: 0;
  stagedCandidateDocumentCount: 0;
  importedCandidatePayloadCount: 0;
  evaluatedCandidatePayloadCount: 0;
  acceptedCandidatePayloadCount: 0;
  rejectedCandidatePayloadCount: 0;
  sourceCandidateDocumentSubmissionPrecheckDigest: string;
  slots: ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot[];
  guards: ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard[];
  gates: ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates;
  gateCount: number;
  passedGateCount: number;
  blockedReasonCodes: string[];
  candidateDocumentIntakePacketDigest: string;
  candidateDocumentSubmissionAllowed: false;
  candidateDocumentIntakeAllowed: false;
  candidatePayloadImportAllowed: false;
  candidateEvaluationAllowed: false;
  executionAllowed: false;
  writeRoutingAllowed: false;
  startsServices: false;
  mutatesSiblingState: false;
  importsRuntimePayload: false;
  acceptsSyntheticEvidence: false;
  containsSecretValue: false;
}
