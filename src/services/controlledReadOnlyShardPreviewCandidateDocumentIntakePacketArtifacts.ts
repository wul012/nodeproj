import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_PACKET_VERSIONS,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketCatalog.js";
import {
  createControlledReadOnlyShardPreviewCandidateDocumentIntakeGuards,
  createControlledReadOnlyShardPreviewCandidateDocumentIntakeSlots,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketBuilder.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";

type SubmissionPrecheck = ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck;
type IntakeSlot = ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot;
type IntakeGuard = ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard;
type IntakeGates = ControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates;

function createControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates(
  precheck: SubmissionPrecheck,
  slots: readonly IntakeSlot[],
  guards: readonly IntakeGuard[],
): IntakeGates {
  const expectedVersions = [...CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_PACKET_VERSIONS];
  const sourceCheckpointCodes = new Set(slots.flatMap((slot) => slot.sourceCheckpointCodes));
  const sourceValidatorCodes = new Set(slots.flatMap((slot) => slot.sourceValidatorCodes));
  const intakeFields = [...new Set(slots.flatMap((slot) => slot.candidateFields))];
  const sourceFields = [...new Set(precheck.checkpoints.flatMap((checkpoint) => checkpoint.candidateFields))];

  return {
    sourceSubmissionPrecheckReady: precheck.readyForCandidateDocumentSubmissionPrecheck,
    slotCountComplete: slots.length === 10,
    guardCountComplete: guards.length === 10,
    slotVersionsSequential:
      slots.map((slot) => slot.nodeVersion).join("|") === expectedVersions.join("|"),
    guardVersionsSequential:
      guards.map((guard) => guard.nodeVersion).join("|") === expectedVersions.join("|"),
    allSourceCheckpointsCovered:
      precheck.checkpoints.every((checkpoint) => sourceCheckpointCodes.has(checkpoint.code)),
    allSourceValidatorsCovered:
      precheck.validators.every((validator) => sourceValidatorCodes.has(validator.code)),
    allRequiredFieldsCarried:
      sourceFields.every((field) => intakeFields.includes(field)),
    intakeFieldCountMatchesSource:
      intakeFields.length === precheck.submissionCandidateFieldCount,
    allSlotsReady:
      slots.every((slot) => slot.readyForCandidateDocumentIntakeSlot),
    allGuardsReady:
      guards.every((guard) => guard.readyForCandidateDocumentIntakeGuard),
    allSlotsReadOnly:
      slots.every((slot) =>
        slot.readOnly && !slot.writesAllowed && !slot.startsServices && !slot.mutatesSiblingState),
    allGuardsReadOnly:
      guards.every((guard) =>
        guard.readOnly && !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    allSlotsRequireReviewedRealCandidateDocument:
      slots.every((slot) => slot.requiresReviewedRealCandidateDocument),
    allGuardsRejectMissingDocument:
      guards.every((guard) => guard.rejectsMissingCandidateDocument),
    allGuardsRejectSyntheticDocument:
      guards.every((guard) => guard.rejectsSyntheticCandidateDocument),
    allGuardsQuarantineUnreviewedDocument:
      guards.every((guard) => guard.quarantinesUnreviewedCandidateDocument),
    allGuardsBlockPayloadImport:
      guards.every((guard) => guard.blocksCandidatePayloadImport),
    allGuardsBlockEvaluation:
      guards.every((guard) => guard.blocksCandidateEvaluation),
    allGuardsBlockAcceptance:
      guards.every((guard) => guard.blocksCandidateAcceptance),
    allGuardsBlockApprovalGrant:
      guards.every((guard) => guard.blocksApprovalGrant),
    allGuardsBlockSignedApproval:
      guards.every((guard) => guard.blocksSignedApproval),
    allGuardsBlockRuntimePayload:
      guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites:
      guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation:
      guards.every((guard) => guard.blocksSiblingMutation),
    sourceRealDocumentStillAbsent:
      precheck.realCandidateDocumentCount === 0,
    intakeRealDocumentStillAbsent:
      slots.every((slot) => slot.realCandidateDocumentCount === 0),
    intakePayloadImportStillBlocked:
      slots.every((slot) => slot.importedCandidatePayloadCount === 0)
      && guards.every((guard) => guard.blocksCandidatePayloadImport),
    intakeEvaluationStillBlocked:
      slots.every((slot) => slot.evaluatedCandidatePayloadCount === 0)
      && guards.every((guard) => guard.blocksCandidateEvaluation),
    sourceSubmissionStillBlocked:
      !precheck.candidateDocumentSubmissionAllowed,
    sourceIntakeStillBlocked:
      !precheck.candidateDocumentIntakeAllowed,
    sourceExecutionStillBlocked:
      !precheck.executionAllowed,
    sourceWritesStillBlocked:
      !precheck.writeRoutingAllowed,
    noSideEffectsAllowed:
      !precheck.executionAllowed
      && !precheck.writeRoutingAllowed
      && !precheck.startsServices
      && !precheck.mutatesSiblingState
      && !precheck.importsRuntimePayload,
    nextStepRequiresReviewedRealCandidateDocumentMaterial: true,
  };
}

function createControlledReadOnlyShardPreviewCandidateDocumentIntakePacketBlockedReasons(
  gates: IntakeGates,
): string[] {
  const reasonByGate: Record<keyof IntakeGates, string> = {
    sourceSubmissionPrecheckReady: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_PRECHECK_NOT_READY",
    slotCountComplete: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOTS_NOT_COMPLETE",
    guardCountComplete: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_NOT_COMPLETE",
    slotVersionsSequential: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOT_VERSIONS_NOT_SEQUENTIAL",
    guardVersionsSequential: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARD_VERSIONS_NOT_SEQUENTIAL",
    allSourceCheckpointsCovered: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_CHECKPOINTS_NOT_COVERED",
    allSourceValidatorsCovered: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_VALIDATORS_NOT_COVERED",
    allRequiredFieldsCarried: "CANDIDATE_DOCUMENT_INTAKE_PACKET_FIELDS_NOT_CARRIED",
    intakeFieldCountMatchesSource: "CANDIDATE_DOCUMENT_INTAKE_PACKET_FIELD_COUNT_MISMATCH",
    allSlotsReady: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOTS_BLOCKED",
    allGuardsReady: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_BLOCKED",
    allSlotsReadOnly: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOTS_NOT_READ_ONLY",
    allGuardsReadOnly: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_NOT_READ_ONLY",
    allSlotsRequireReviewedRealCandidateDocument: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SLOTS_ALLOW_UNREVIEWED_DOCUMENT",
    allGuardsRejectMissingDocument: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_MISSING_DOCUMENT",
    allGuardsRejectSyntheticDocument: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_SYNTHETIC_DOCUMENT",
    allGuardsQuarantineUnreviewedDocument: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_SKIP_QUARANTINE",
    allGuardsBlockPayloadImport: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_PAYLOAD_IMPORT",
    allGuardsBlockEvaluation: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_EVALUATION",
    allGuardsBlockAcceptance: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_ACCEPTANCE",
    allGuardsBlockApprovalGrant: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_APPROVAL_GRANT",
    allGuardsBlockSignedApproval: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_SIGNED_APPROVAL",
    allGuardsBlockRuntimePayload: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_RUNTIME_PAYLOAD",
    allGuardsBlockWrites: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_WRITES",
    allGuardsBlockSiblingMutation: "CANDIDATE_DOCUMENT_INTAKE_PACKET_GUARDS_ALLOW_SIBLING_MUTATION",
    sourceRealDocumentStillAbsent: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_REAL_DOCUMENT_PRESENT",
    intakeRealDocumentStillAbsent: "CANDIDATE_DOCUMENT_INTAKE_PACKET_REAL_DOCUMENT_PRESENT",
    intakePayloadImportStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_PAYLOAD_IMPORTED_TOO_EARLY",
    intakeEvaluationStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_EVALUATED_TOO_EARLY",
    sourceSubmissionStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_SUBMISSION_ENABLED_TOO_EARLY",
    sourceIntakeStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_INTAKE_ENABLED_TOO_EARLY",
    sourceExecutionStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_EXECUTION_ENABLED_TOO_EARLY",
    sourceWritesStillBlocked: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SOURCE_WRITES_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "CANDIDATE_DOCUMENT_INTAKE_PACKET_SIDE_EFFECTS_ENABLED",
    nextStepRequiresReviewedRealCandidateDocumentMaterial: "CANDIDATE_DOCUMENT_INTAKE_PACKET_NEXT_STEP_NOT_REAL_MATERIAL",
  };

  return (Object.entries(gates) as [keyof IntakeGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewCandidateDocumentIntakePacket(
  precheck: SubmissionPrecheck,
): ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket {
  const slots = createControlledReadOnlyShardPreviewCandidateDocumentIntakeSlots(precheck);
  const guards = createControlledReadOnlyShardPreviewCandidateDocumentIntakeGuards(slots);
  const gates = createControlledReadOnlyShardPreviewCandidateDocumentIntakePacketGates(precheck, slots, guards);
  const blockedReasonCodes = createControlledReadOnlyShardPreviewCandidateDocumentIntakePacketBlockedReasons(gates);
  const readyForCandidateDocumentIntakePacket = blockedReasonCodes.length === 0;
  const intakeCandidateFields = [...new Set(slots.flatMap((slot) => slot.candidateFields))];
  const candidateDocumentIntakePacketDigest = sha256StableJson({
    candidateDocumentIntakePacketVersion: "Node v1421",
    sourceCandidateDocumentSubmissionPrecheckVersion: precheck.candidateDocumentSubmissionPrecheckVersion,
    sourceCandidateDocumentSubmissionPrecheckDigest: precheck.candidateDocumentSubmissionPrecheckDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.sourceCheckpointCodes,
      slot.sourceValidatorCodes,
      slot.candidateFields,
      slot.readyForCandidateDocumentIntakeSlot,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceSlotCode,
      guard.readyForCandidateDocumentIntakeGuard,
    ]),
    gates,
  });

  return {
    candidateDocumentIntakePacketVersion: "Node v1421",
    sourceCandidateDocumentSubmissionPrecheckVersion: precheck.candidateDocumentSubmissionPrecheckVersion,
    candidateDocumentIntakePacketState:
      readyForCandidateDocumentIntakePacket
        ? "ready-for-reviewed-real-candidate-document-intake-packet"
        : "blocked",
    readyForCandidateDocumentIntakePacket,
    readyForReviewedRealCandidateDocumentIntake: false,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForApprovalGrant: false,
    readyForSignedApproval: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    intakeSlotCount: slots.length,
    intakeGuardCount: guards.length,
    sourceCheckpointCount: precheck.checkpointCount,
    sourceValidatorCount: precheck.validatorCount,
    readyIntakeSlotCount: slots.filter((slot) => slot.readyForCandidateDocumentIntakeSlot).length,
    readyIntakeGuardCount: guards.filter((guard) => guard.readyForCandidateDocumentIntakeGuard).length,
    requiredCandidateFieldCount: precheck.submissionCandidateFieldCount,
    intakeCandidateFieldCount: intakeCandidateFields.length,
    reviewedRealCandidateDocumentPresent: false,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    sourceCandidateDocumentSubmissionPrecheckDigest: precheck.candidateDocumentSubmissionPrecheckDigest,
    slots,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    candidateDocumentIntakePacketDigest,
    candidateDocumentSubmissionAllowed: false,
    candidateDocumentIntakeAllowed: false,
    candidatePayloadImportAllowed: false,
    candidateEvaluationAllowed: false,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}
