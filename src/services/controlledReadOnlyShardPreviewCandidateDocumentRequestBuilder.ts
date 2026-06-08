import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_CHECK_TEMPLATES,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_ITEM_TEMPLATES,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestCatalog.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck,
  ControlledReadOnlyShardPreviewCandidateDocumentRequestItem,
} from "./controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

type CandidateIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake;

export function createControlledReadOnlyShardPreviewCandidateDocumentRequestItems(
  intake: CandidateIntake,
): ControlledReadOnlyShardPreviewCandidateDocumentRequestItem[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_ITEM_TEMPLATES.map((template, index) => {
    const sourceSlots = intake.slots.filter((slot) => template.sourceSlotKinds.includes(slot.kind));
    const sourceGuards = intake.guards.filter((guard) => template.sourceGuardKinds.includes(guard.kind));
    const candidateFields = [...new Set(sourceSlots.flatMap((slot) => slot.candidateFields))];
    const sourceSlotReady = template.sourceSlotKinds.length === 0
      || sourceSlots.length === template.sourceSlotKinds.length
      && sourceSlots.every((slot) => slot.readyForComparedEvidenceCandidateIntakeSlot);
    const sourceGuardReady = template.sourceGuardKinds.length === 0
      || sourceGuards.length === template.sourceGuardKinds.length
      && sourceGuards.every((guard) => guard.readyForComparedEvidenceCandidateIntakeGuard);
    const sourceReady =
      intake.readyForComparedEvidenceCandidateIntakePreflightContract
      && sourceSlotReady
      && sourceGuardReady;
    const noPrematureCandidateMaterial =
      intake.realCandidateDocumentCount === 0
      && intake.syntheticCandidateDocumentCount === 0
      && intake.stagedCandidateDocumentCount === 0
      && intake.importedCandidatePayloadCount === 0
      && intake.evaluatedCandidatePayloadCount === 0
      && intake.acceptedCandidatePayloadCount === 0
      && intake.rejectedCandidatePayloadCount === 0
      && !intake.candidateDocumentIntakeAllowed
      && !intake.candidatePayloadImportAllowed
      && !intake.candidateEvaluationAllowed
      && !intake.executionAllowed
      && !intake.writeRoutingAllowed
      && !intake.startsServices
      && !intake.mutatesSiblingState
      && !intake.importsRuntimePayload;

    return {
      order: index + 1,
      nodeVersion: template.nodeVersion,
      code: template.code,
      itemName: template.itemName,
      kind: template.kind,
      sourceSlotCodes: sourceSlots.map((slot) => slot.code),
      sourceGuardCodes: sourceGuards.map((guard) => guard.code),
      sourceReady,
      candidateFields,
      candidateFieldCount: candidateFields.length,
      requestInstruction: template.requestInstruction,
      acceptanceCriterion: template.acceptanceCriterion,
      readyForCandidateDocumentRequestItem: sourceReady && noPrematureCandidateMaterial,
      requiresRealCandidateDocument: true,
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

export function createControlledReadOnlyShardPreviewCandidateDocumentRequestChecks(
  requestItems: readonly ControlledReadOnlyShardPreviewCandidateDocumentRequestItem[],
): ControlledReadOnlyShardPreviewCandidateDocumentRequestCheck[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_REQUEST_CHECK_TEMPLATES.map((template, index) => {
    const sourceItem = requestItems.find((item) => item.code === template.sourceItemCode);
    const sourceItemReady = sourceItem?.readyForCandidateDocumentRequestItem === true;

    return {
      order: index + 1,
      nodeVersion: template.nodeVersion,
      code: template.code,
      kind: template.kind,
      sourceItemCode: template.sourceItemCode,
      sourceItemReady,
      checkText: template.checkText,
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
      readyForCandidateDocumentRequestCheck: sourceItemReady,
      readOnly: true,
      writesAllowed: false,
      startsServices: false,
      mutatesSiblingState: false,
    };
  });
}
