import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECK_TEMPLATES,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEM_TEMPLATES,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCatalog.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck,
  ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem,
} from "./controlledReadOnlyShardPreviewCandidateDocumentMaterialRequestTypes.js";
import type {
  ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket,
} from "./controlledReadOnlyShardPreviewCandidateDocumentIntakePacketTypes.js";

type IntakePacket = ControlledReadOnlyShardPreviewCandidateDocumentIntakePacket;

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItems(
  packet: IntakePacket,
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem[] {
  const allPacketFields = [...new Set(packet.slots.flatMap((slot) => slot.candidateFields))];

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_ITEM_TEMPLATES
    .map((template, index) => {
      const sourceSlots = packet.slots
        .filter((slot) => template.sourceIntakeSlotKinds.includes(slot.kind));
      const sourceGuards = packet.guards
        .filter((guard) => template.sourceIntakeGuardKinds.includes(guard.kind));
      const materialFields = template.sourceIntakeSlotKinds.length === 0
        ? allPacketFields
        : [...new Set(sourceSlots.flatMap((slot) => slot.candidateFields))];
      const sourceSlotsReady = template.sourceIntakeSlotKinds.length === 0
        || sourceSlots.length === template.sourceIntakeSlotKinds.length
        && sourceSlots.every((slot) => slot.readyForCandidateDocumentIntakeSlot);
      const sourceGuardsReady =
        sourceGuards.length === template.sourceIntakeGuardKinds.length
        && sourceGuards.every((guard) => guard.readyForCandidateDocumentIntakeGuard);
      const sourceReady =
        packet.readyForCandidateDocumentIntakePacket
        && sourceSlotsReady
        && sourceGuardsReady;
      const noPrematureMaterial =
        !packet.candidateDocumentSubmissionAllowed
        && !packet.candidateDocumentIntakeAllowed
        && !packet.candidatePayloadImportAllowed
        && !packet.candidateEvaluationAllowed
        && !packet.executionAllowed
        && !packet.writeRoutingAllowed
        && !packet.startsServices
        && !packet.mutatesSiblingState
        && !packet.importsRuntimePayload
        && packet.realCandidateDocumentCount === 0
        && packet.syntheticCandidateDocumentCount === 0
        && packet.stagedCandidateDocumentCount === 0
        && packet.importedCandidatePayloadCount === 0
        && packet.evaluatedCandidatePayloadCount === 0
        && packet.acceptedCandidatePayloadCount === 0
        && packet.rejectedCandidatePayloadCount === 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        itemName: template.itemName,
        kind: template.kind,
        sourceIntakeSlotCodes: sourceSlots.map((slot) => slot.code),
        sourceIntakeGuardCodes: sourceGuards.map((guard) => guard.code),
        sourceReady,
        materialFields,
        materialFieldCount: materialFields.length,
        materialInstruction: template.materialInstruction,
        acceptanceCriterion: template.acceptanceCriterion,
        readyForCandidateDocumentMaterialRequestItem: sourceReady && noPrematureMaterial,
        requiresReviewedRealCandidateDocument: true,
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

export function createControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestChecks(
  requestItems: readonly ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestItem[],
): ControlledReadOnlyShardPreviewCandidateDocumentMaterialRequestCheck[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_CANDIDATE_DOCUMENT_MATERIAL_REQUEST_CHECK_TEMPLATES
    .map((template, index) => {
      const sourceItem = requestItems.find((item) => item.code === template.sourceRequestItemCode);
      const sourceRequestItemReady = sourceItem?.readyForCandidateDocumentMaterialRequestItem === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceRequestItemCode: template.sourceRequestItemCode,
        sourceRequestItemReady,
        checkText: template.checkText,
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
        readyForCandidateDocumentMaterialRequestCheck: sourceRequestItemReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
