import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_GUARD_TEMPLATES,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_SLOT_TEMPLATES,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketCatalog.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard,
  ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";

type SubmissionPrecheck = ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheck;

export function createControlledReadOnlyShardPreviewCandidateDocumentIntakeSlots(
  precheck: SubmissionPrecheck,
): ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_SLOT_TEMPLATES
    .map((template, index) => {
      const sourceCheckpoints = precheck.checkpoints
        .filter((checkpoint) => template.sourceCheckpointKinds.includes(checkpoint.kind));
      const sourceCheckpointCodes = sourceCheckpoints.map((checkpoint) => checkpoint.code);
      const sourceValidators = precheck.validators
        .filter((validator) => sourceCheckpointCodes.includes(validator.sourceCheckpointCode));
      const candidateFields = [...new Set(sourceCheckpoints.flatMap((checkpoint) => checkpoint.candidateFields))];
      const sourceReady =
        precheck.readyForCandidateDocumentSubmissionPrecheck
        && sourceCheckpoints.length === template.sourceCheckpointKinds.length
        && sourceCheckpoints.every((checkpoint) => checkpoint.readyForCandidateDocumentSubmissionCheckpoint)
        && sourceValidators.length === sourceCheckpoints.length
        && sourceValidators.every((validator) => validator.readyForCandidateDocumentSubmissionValidator);
      const noPrematureDocumentMaterial =
        !precheck.candidateDocumentSubmissionAllowed
        && !precheck.candidateDocumentIntakeAllowed
        && !precheck.candidatePayloadImportAllowed
        && !precheck.candidateEvaluationAllowed
        && !precheck.executionAllowed
        && !precheck.writeRoutingAllowed
        && !precheck.startsServices
        && !precheck.mutatesSiblingState
        && !precheck.importsRuntimePayload
        && precheck.realCandidateDocumentCount === 0
        && precheck.syntheticCandidateDocumentCount === 0
        && precheck.stagedCandidateDocumentCount === 0
        && precheck.importedCandidatePayloadCount === 0
        && precheck.evaluatedCandidatePayloadCount === 0
        && precheck.acceptedCandidatePayloadCount === 0
        && precheck.rejectedCandidatePayloadCount === 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        slotName: template.slotName,
        kind: template.kind,
        sourceCheckpointCodes,
        sourceValidatorCodes: sourceValidators.map((validator) => validator.code),
        sourceReady,
        candidateFields,
        candidateFieldCount: candidateFields.length,
        intakeInstruction: template.intakeInstruction,
        guardCriterion: template.guardCriterion,
        readyForCandidateDocumentIntakeSlot: sourceReady && noPrematureDocumentMaterial,
        requiresReviewedRealCandidateDocument: true,
        reviewedRealCandidateDocumentPresent: false,
        realCandidateDocumentCount: 0,
        syntheticCandidateDocumentCount: 0,
        stagedCandidateDocumentCount: 0,
        importedCandidatePayloadCount: 0,
        evaluatedCandidatePayloadCount: 0,
        acceptedCandidatePayloadCount: 0,
        rejectedCandidatePayloadCount: 0,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewCandidateDocumentIntakeGuards(
  slots: readonly ControlledReadOnlyShardPreviewCandidateDocumentIntakeSlot[],
): ControlledReadOnlyShardPreviewCandidateDocumentIntakeGuard[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_INTAKE_GUARD_TEMPLATES
    .map((template, index) => {
      const sourceSlot = slots.find((slot) => slot.code === template.sourceSlotCode);
      const sourceSlotReady = sourceSlot?.readyForCandidateDocumentIntakeSlot === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceSlotCode: template.sourceSlotCode,
        sourceSlotReady,
        guardText: template.guardText,
        rejectsMissingCandidateDocument: true,
        rejectsSyntheticCandidateDocument: true,
        quarantinesUnreviewedCandidateDocument: true,
        blocksCandidatePayloadImport: true,
        blocksCandidateEvaluation: true,
        blocksCandidateAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForCandidateDocumentIntakeGuard: sourceSlotReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
