import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_CHECKPOINT_TEMPLATES,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_VALIDATOR_TEMPLATES,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckCatalog.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionPrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";

type MaterialRequestPackage = ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestPackage;

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoints(
  requestPackage: MaterialRequestPackage,
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_CHECKPOINT_TEMPLATES
    .map((template, index) => {
      const sourceItems = requestPackage.requestItems
        .filter((item) => template.sourceMaterialRequestItemKinds.includes(item.kind));
      const sourceChecks = requestPackage.acceptanceChecks
        .filter((check) => template.sourceMaterialRequestCheckKinds.includes(check.kind));
      const materialFields = [...new Set(sourceItems.flatMap((item) => item.materialFields))];
      const sourceItemsReady =
        sourceItems.length === template.sourceMaterialRequestItemKinds.length
        && sourceItems.every((item) => item.readyForCandidateDocumentMaterialRequestItem);
      const sourceChecksReady =
        sourceChecks.length === template.sourceMaterialRequestCheckKinds.length
        && sourceChecks.every((check) => check.readyForCandidateDocumentMaterialRequestCheck);
      const sourceReady =
        requestPackage.readyForCandidateDocumentMaterialRequestPackage
        && sourceItemsReady
        && sourceChecksReady;
      const noPrematureMaterialSubmission =
        !requestPackage.candidateDocumentSubmissionAllowed
        && !requestPackage.candidateDocumentIntakeAllowed
        && !requestPackage.candidateDocumentMaterialIntakeAllowed
        && !requestPackage.candidatePayloadImportAllowed
        && !requestPackage.candidateEvaluationAllowed
        && !requestPackage.executionAllowed
        && !requestPackage.writeRoutingAllowed
        && !requestPackage.startsServices
        && !requestPackage.mutatesSiblingState
        && !requestPackage.importsRuntimePayload
        && requestPackage.realCandidateDocumentCount === 0
        && requestPackage.syntheticCandidateDocumentCount === 0
        && requestPackage.stagedCandidateDocumentCount === 0
        && requestPackage.importedCandidatePayloadCount === 0
        && requestPackage.evaluatedCandidatePayloadCount === 0
        && requestPackage.acceptedCandidatePayloadCount === 0
        && requestPackage.rejectedCandidatePayloadCount === 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        checkpointName: template.checkpointName,
        kind: template.kind,
        sourceMaterialRequestItemCodes: sourceItems.map((item) => item.code),
        sourceMaterialAcceptanceCheckCodes: sourceChecks.map((check) => check.code),
        sourceReady,
        materialFields,
        materialFieldCount: materialFields.length,
        submissionInstruction: template.submissionInstruction,
        validationRule: template.validationRule,
        readyForCandidateDocumentMaterialSubmissionCheckpoint:
          sourceReady && noPrematureMaterialSubmission,
        requiresReviewedRealCandidateDocumentMaterial: true,
        reviewedRealCandidateDocumentMaterialPresent: false,
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

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidators(
  checkpoints: readonly ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionCheckpoint[],
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialSubmissionValidator[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_SUBMISSION_VALIDATOR_TEMPLATES
    .map((template, index) => {
      const sourceCheckpoint = checkpoints.find((checkpoint) => checkpoint.code === template.sourceCheckpointCode);
      const sourceCheckpointReady =
        sourceCheckpoint?.readyForCandidateDocumentMaterialSubmissionCheckpoint === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceCheckpointCode: template.sourceCheckpointCode,
        sourceCheckpointReady,
        validatorText: template.validatorText,
        rejectsMissingMaterial: true,
        rejectsSyntheticMaterial: true,
        quarantinesUnreviewedMaterial: true,
        blocksMaterialIntake: true,
        blocksCandidatePayloadImport: true,
        blocksCandidateEvaluation: true,
        blocksCandidateAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForCandidateDocumentMaterialSubmissionValidator: sourceCheckpointReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
