import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINT_TEMPLATES,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATOR_TEMPLATES,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCatalog.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint,
  ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator,
} from "./controlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";

type RequestPackage = ControlledReadOnlyShardPreviewCandidateDocumentRequestPackage;

export function createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoints(
  requestPackage: RequestPackage,
): ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_CHECKPOINT_TEMPLATES
    .map((template, index) => {
      const sourceRequestItems = requestPackage.requestItems
        .filter((item) => template.sourceRequestItemKinds.includes(item.kind));
      const sourceRequestChecks = requestPackage.acceptanceChecks
        .filter((check) => template.sourceRequestCheckKinds.includes(check.kind));
      const candidateFields = [...new Set(sourceRequestItems.flatMap((item) => item.candidateFields))];
      const requestItemsReady = template.sourceRequestItemKinds.length === 0
        || sourceRequestItems.length === template.sourceRequestItemKinds.length
        && sourceRequestItems.every((item) => item.readyForCandidateDocumentRequestItem);
      const checksReady = template.sourceRequestCheckKinds.length === 0
        || sourceRequestChecks.length === template.sourceRequestCheckKinds.length
        && sourceRequestChecks.every((check) => check.readyForCandidateDocumentRequestCheck);
      const sourceReady =
        requestPackage.readyForCandidateDocumentRequestPackage
        && requestItemsReady
        && checksReady;
      const noPrematureCandidateMaterial =
        requestPackage.realCandidateDocumentCount === 0
        && requestPackage.syntheticCandidateDocumentCount === 0
        && requestPackage.stagedCandidateDocumentCount === 0
        && requestPackage.importedCandidatePayloadCount === 0
        && requestPackage.evaluatedCandidatePayloadCount === 0
        && requestPackage.acceptedCandidatePayloadCount === 0
        && requestPackage.rejectedCandidatePayloadCount === 0
        && !requestPackage.candidateDocumentRequestAllowed
        && !requestPackage.candidateDocumentIntakeAllowed
        && !requestPackage.candidatePayloadImportAllowed
        && !requestPackage.candidateEvaluationAllowed
        && !requestPackage.executionAllowed
        && !requestPackage.writeRoutingAllowed
        && !requestPackage.startsServices
        && !requestPackage.mutatesSiblingState
        && !requestPackage.importsRuntimePayload;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        checkpointName: template.checkpointName,
        kind: template.kind,
        sourceRequestItemCodes: sourceRequestItems.map((item) => item.code),
        sourceRequestCheckCodes: sourceRequestChecks.map((check) => check.code),
        sourceReady,
        candidateFields,
        candidateFieldCount: candidateFields.length,
        submissionInstruction: template.submissionInstruction,
        validationCriterion: template.validationCriterion,
        readyForCandidateDocumentSubmissionCheckpoint: sourceReady && noPrematureCandidateMaterial,
        requiresReviewedRealCandidateDocument: true,
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

export function createControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidators(
  checkpoints: readonly ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckCheckpoint[],
): ControlledReadOnlyShardPreviewCandidateDocumentSubmissionPrecheckValidator[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_SUBMISSION_PRECHECK_VALIDATOR_TEMPLATES
    .map((template, index) => {
      const sourceCheckpoint = checkpoints.find((checkpoint) => checkpoint.code === template.sourceCheckpointCode);
      const sourceCheckpointReady = sourceCheckpoint?.readyForCandidateDocumentSubmissionCheckpoint === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceCheckpointCode: template.sourceCheckpointCode,
        sourceCheckpointReady,
        validatorText: template.validatorText,
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
        readyForCandidateDocumentSubmissionValidator: sourceCheckpointReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
