import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_REVIEW_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControlCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControls(
  draft: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewControl[] {
  const sourceDraftSlotsByCode = new Map(draft.slots.map((slot) => [slot.code, slot]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_APPROVAL_PACKET_REVIEW_CONTROLS
    .map((template, index) => {
      const sourceDraftSlot = sourceDraftSlotsByCode.get(template.sourceApprovalPacketDraftSlotCode);
      const project = sourceDraftSlot?.project ?? inferProjectFromReviewCode(template.code);
      const requiredApprovalFieldPresent =
        sourceDraftSlot?.approvalFieldNames.includes(template.requiredApprovalFieldName) ?? false;
      const requiredReviewRecordFieldPresent =
        sourceDraftSlot?.requiredReviewRecordFields.includes(template.requiredReviewRecordFieldName) ?? false;
      const policyRequirementSatisfied =
        sourceDraftSlot?.policy[template.expectedPolicyField] === template.expectedPolicyValue;
      const sourceApprovalPacketDraftSlotReady =
        draft.readyForValueSupplyApprovalPacketDraft
        && (sourceDraftSlot?.readyForValueSupplyApprovalPacketDraft ?? false);
      const readyForValueSupplyApprovalPacketReview =
        sourceApprovalPacketDraftSlotReady
        && requiredApprovalFieldPresent
        && requiredReviewRecordFieldPresent
        && policyRequirementSatisfied;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        scope: template.scope,
        project,
        sourceApprovalPacketDraftSlotCode: template.sourceApprovalPacketDraftSlotCode,
        sourceApprovalPacketDraftSlotReady,
        sourceApprovalPacketDraftSlotProject: sourceDraftSlot?.project ?? project,
        sourceApprovalPacketDraftPolicyCode: sourceDraftSlot?.policy.code ?? template.sourceApprovalPacketDraftSlotCode,
        requiredApprovalFieldName: template.requiredApprovalFieldName,
        requiredApprovalFieldPresent,
        requiredReviewRecordFieldName: template.requiredReviewRecordFieldName,
        requiredReviewRecordFieldPresent,
        expectedPolicyField: template.expectedPolicyField,
        expectedPolicyValue: template.expectedPolicyValue,
        policyRequirementSatisfied,
        reviewerQuestion: template.reviewerQuestion,
        acceptanceCriterion: template.acceptanceCriterion,
        blockerCode: template.blockerCode,
        manualReviewRequired: true,
        autoApprovalAllowed: false,
        approvalCaptured: false,
        approvalGrantPresent: false,
        signedApprovalPresent: false,
        operatorIdentityPresent: false,
        approvalTimestampPresent: false,
        suppliedValueCount: 0,
        acceptedValueCount: 0,
        importedValueCount: 0,
        readyForValueSupplyApprovalPacketReview,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForOperatorValueSubmission: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readyForLiveExecution: false,
        readyForProductionExecution: false,
        importsRuntimePayload: false,
        acceptsSyntheticEvidence: false,
        containsSecretValue: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

function inferProjectFromReviewCode(
  code: string,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraftProject {
  if (code.includes("MINI_KV")) {
    return "miniKv";
  }
  if (code.includes("NODE")) {
    return "node";
  }
  return "java";
}
