import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_GUARDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlots(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot[] {
  const requirementsByCode = new Map(readiness.requirements.map((requirement) => [requirement.code, requirement]));
  const blockersByCode = new Map(readiness.blockers.map((blocker) => [blocker.code, blocker]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS
    .map((template, index) => {
      const sourceRequirement = requirementsByCode.get(template.sourceAuthoringRequirementCode);
      const sourceBlocker = blockersByCode.get(template.sourceAuthoringBlockerCode);
      const sourceAuthoringRequirementReady =
        readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness
        && (sourceRequirement?.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement ?? false);
      const sourceAuthoringBlockerReady =
        readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness
        && (sourceBlocker?.readyForHumanSignedApprovalDraftArtifactAuthoringBlocker ?? false);
      const sourceAuthoringRequirementReadOnly = sourceRequirement?.readOnly ?? false;
      const sourceAuthoringBlockerReadOnly = sourceBlocker?.readOnly ?? false;
      const sourceAuthoringInstructionMaterialized =
        sourceRequirement?.authoringInstructionMaterialized ?? true;
      const sourceDraftArtifactCreated = sourceRequirement?.draftArtifactCreated ?? true;
      const sourceSignedDraftTextPresent = sourceRequirement?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceRequirement?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceRequirement?.approvalGrantPresent ?? true;
      const sourceAuthoringBlockerBlocksInstructionMaterialization =
        sourceBlocker?.blocksAuthoringInstructionMaterialization ?? false;
      const sourceAuthoringBlockerBlocksDraftArtifactCreation =
        sourceBlocker?.blocksDraftArtifactCreation ?? false;
      const sourceAuthoringBlockerBlocksSignedDraftText =
        sourceBlocker?.blocksSignedDraftText ?? false;
      const sourceAuthoringBlockerBlocksSignaturePayload =
        sourceBlocker?.blocksSignaturePayload ?? false;
      const sourceAuthoringBlockerBlocksApprovalGrant =
        sourceBlocker?.blocksApprovalGrant ?? false;
      const sourceAuthoringBlockerBlocksRuntimePayload =
        sourceBlocker?.blocksRuntimePayload ?? false;
      const sourceAuthoringBlockerBlocksWrites = sourceBlocker?.blocksWrites ?? false;
      const sourceAuthoringBlockerBlocksSiblingMutation =
        sourceBlocker?.blocksSiblingMutation ?? false;
      const readyForHumanSignedApprovalDraftInstructionSlot =
        sourceAuthoringRequirementReady
        && sourceAuthoringBlockerReady
        && sourceAuthoringRequirementReadOnly
        && sourceAuthoringBlockerReadOnly
        && !sourceAuthoringInstructionMaterialized
        && !sourceDraftArtifactCreated
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourceAuthoringBlockerBlocksInstructionMaterialization
        && sourceAuthoringBlockerBlocksDraftArtifactCreation
        && sourceAuthoringBlockerBlocksSignedDraftText
        && sourceAuthoringBlockerBlocksSignaturePayload
        && sourceAuthoringBlockerBlocksApprovalGrant
        && sourceAuthoringBlockerBlocksRuntimePayload
        && sourceAuthoringBlockerBlocksWrites
        && sourceAuthoringBlockerBlocksSiblingMutation
        && template.instructionPurpose.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        instructionSlotName: template.instructionSlotName,
        kind: template.kind,
        slotMode: template.slotMode,
        sourceAuthoringRequirementCode: template.sourceAuthoringRequirementCode,
        sourceAuthoringRequirementReady,
        sourceAuthoringRequirementKind: sourceRequirement?.kind ?? "",
        sourceAuthoringRequirementMode: sourceRequirement?.requirementMode ?? "",
        sourceAuthoringRequirementReadOnly,
        sourceAuthoringInstructionMaterialized,
        sourceDraftArtifactCreated,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourceAuthoringBlockerCode: template.sourceAuthoringBlockerCode,
        sourceAuthoringBlockerReady,
        sourceAuthoringBlockerKind: sourceBlocker?.kind ?? "",
        sourceAuthoringBlockerReadOnly,
        sourceAuthoringBlockerBlocksInstructionMaterialization,
        sourceAuthoringBlockerBlocksDraftArtifactCreation,
        sourceAuthoringBlockerBlocksSignedDraftText,
        sourceAuthoringBlockerBlocksSignaturePayload,
        sourceAuthoringBlockerBlocksApprovalGrant,
        sourceAuthoringBlockerBlocksRuntimePayload,
        sourceAuthoringBlockerBlocksWrites,
        sourceAuthoringBlockerBlocksSiblingMutation,
        instructionPurpose: template.instructionPurpose,
        readyForHumanSignedApprovalDraftInstructionSlot,
        instructionMaterialized: false,
        draftArtifactCreated: false,
        signedDraftTextPresent: false,
        draftSignaturePayloadPresent: false,
        approvalGrantPresent: false,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuards(
  slots:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard[] {
  const slotsByCode = new Map(slots.map((slot) => [slot.code, slot]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_GUARDS
    .map((template, index) => {
      const sourceSlot = slotsByCode.get(template.sourceInstructionSlotCode);
      const sourceInstructionSlotReady = sourceSlot?.readyForHumanSignedApprovalDraftInstructionSlot ?? false;
      const rejectsMissingInstructionSlot =
        template.guardCode.startsWith("REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_")
        && template.guardText.startsWith("Block draft instruction preflight");
      const readyForHumanSignedApprovalDraftInstructionGuard =
        sourceInstructionSlotReady
        && rejectsMissingInstructionSlot
        && template.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceInstructionSlotCode: template.sourceInstructionSlotCode,
        sourceInstructionSlotReady,
        sourceAuthoringBlockerKind: sourceSlot?.sourceAuthoringBlockerKind ?? "",
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsMissingInstructionSlot,
        blocksInstructionMaterialization: true,
        blocksDraftArtifactCreation: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForHumanSignedApprovalDraftInstructionGuard,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
