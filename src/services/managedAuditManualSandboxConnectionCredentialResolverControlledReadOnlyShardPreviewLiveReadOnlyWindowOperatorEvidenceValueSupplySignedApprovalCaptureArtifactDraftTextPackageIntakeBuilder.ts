import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFields(
  instructionPreflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[] {
  const slotsByCode = new Map(instructionPreflight.slots.map((slot) => [slot.code, slot]));
  const guardsByCode = new Map(instructionPreflight.guards.map((guard) => [guard.code, guard]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS
    .map((template, index) => {
      const sourceSlot = slotsByCode.get(template.sourceInstructionSlotCode);
      const sourceGuard = guardsByCode.get(template.sourceInstructionGuardCode);
      const sourceInstructionSlotReady =
        instructionPreflight.readyForSignedApprovalArtifactDraftInstructionPreflight
        && (sourceSlot?.readyForHumanSignedApprovalDraftInstructionSlot ?? false);
      const sourceInstructionGuardReady =
        instructionPreflight.readyForSignedApprovalArtifactDraftInstructionPreflight
        && (sourceGuard?.readyForHumanSignedApprovalDraftInstructionGuard ?? false);
      const sourceInstructionSlotReadOnly = sourceSlot?.readOnly ?? false;
      const sourceInstructionGuardReadOnly = sourceGuard?.readOnly ?? false;
      const sourceInstructionMaterialized = sourceSlot?.instructionMaterialized ?? true;
      const sourceDraftArtifactCreated = sourceSlot?.draftArtifactCreated ?? true;
      const sourceSignedDraftTextPresent = sourceSlot?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceSlot?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceSlot?.approvalGrantPresent ?? true;
      const sourceInstructionGuardBlocksDraftArtifactCreation =
        sourceGuard?.blocksDraftArtifactCreation ?? false;
      const sourceInstructionGuardBlocksSignedDraftText =
        sourceGuard?.blocksSignedDraftText ?? false;
      const sourceInstructionGuardBlocksSignaturePayload =
        sourceGuard?.blocksSignaturePayload ?? false;
      const sourceInstructionGuardBlocksApprovalGrant =
        sourceGuard?.blocksApprovalGrant ?? false;
      const sourceInstructionGuardBlocksRuntimePayload =
        sourceGuard?.blocksRuntimePayload ?? false;
      const sourceInstructionGuardBlocksWrites = sourceGuard?.blocksWrites ?? false;
      const sourceInstructionGuardBlocksSiblingMutation =
        sourceGuard?.blocksSiblingMutation ?? false;
      const readyForHumanSignedApprovalDraftTextPackageIntakeField =
        sourceInstructionSlotReady
        && sourceInstructionGuardReady
        && sourceInstructionSlotReadOnly
        && sourceInstructionGuardReadOnly
        && !sourceInstructionMaterialized
        && !sourceDraftArtifactCreated
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourceInstructionGuardBlocksDraftArtifactCreation
        && sourceInstructionGuardBlocksSignedDraftText
        && sourceInstructionGuardBlocksSignaturePayload
        && sourceInstructionGuardBlocksApprovalGrant
        && sourceInstructionGuardBlocksRuntimePayload
        && sourceInstructionGuardBlocksWrites
        && sourceInstructionGuardBlocksSiblingMutation
        && template.expectedShape.length > 0
        && template.intakePurpose.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        intakeFieldName: template.intakeFieldName,
        kind: template.kind,
        fieldMode: template.fieldMode,
        sourceInstructionSlotCode: template.sourceInstructionSlotCode,
        sourceInstructionSlotReady,
        sourceInstructionSlotKind: sourceSlot?.kind ?? "",
        sourceInstructionSlotMode: sourceSlot?.slotMode ?? "",
        sourceInstructionSlotReadOnly,
        sourceInstructionMaterialized,
        sourceDraftArtifactCreated,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourceInstructionGuardCode: template.sourceInstructionGuardCode,
        sourceInstructionGuardReady,
        sourceInstructionGuardKind: sourceGuard?.kind ?? "",
        sourceInstructionGuardReadOnly,
        sourceInstructionGuardBlocksDraftArtifactCreation,
        sourceInstructionGuardBlocksSignedDraftText,
        sourceInstructionGuardBlocksSignaturePayload,
        sourceInstructionGuardBlocksApprovalGrant,
        sourceInstructionGuardBlocksRuntimePayload,
        sourceInstructionGuardBlocksWrites,
        sourceInstructionGuardBlocksSiblingMutation,
        expectedShape: template.expectedShape,
        intakePurpose: template.intakePurpose,
        readyForHumanSignedApprovalDraftTextPackageIntakeField,
        draftTextPackageFieldMaterialized: false,
        draftTextPackageAccepted: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuards(
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard[] {
  const fieldsByCode = new Map(fields.map((field) => [field.code, field]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARDS
    .map((template, index) => {
      const sourceField = fieldsByCode.get(template.sourceIntakeFieldCode);
      const sourceIntakeFieldReady =
        sourceField?.readyForHumanSignedApprovalDraftTextPackageIntakeField ?? false;
      const rejectsMissingIntakeField =
        template.guardCode.startsWith("REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_")
        && template.guardText.startsWith("Block draft text package intake");
      const readyForHumanSignedApprovalDraftTextPackageIntakeGuard =
        sourceIntakeFieldReady
        && rejectsMissingIntakeField
        && template.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceIntakeFieldCode: template.sourceIntakeFieldCode,
        sourceIntakeFieldReady,
        sourceInstructionGuardKind: sourceField?.sourceInstructionGuardKind ?? "",
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsMissingIntakeField,
        blocksDraftTextPackageAcceptance: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForHumanSignedApprovalDraftTextPackageIntakeGuard,
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
