import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_BLOCKERS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirements(
  preflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement[] {
  const slotsByCode = new Map(preflight.slots.map((slot) => [slot.code, slot]));
  const guardsByCode = new Map(preflight.guards.map((guard) => [guard.code, guard]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS
    .map((template, index) => {
      const sourceSlot = slotsByCode.get(template.sourcePackageSlotCode);
      const sourceGuard = guardsByCode.get(template.sourcePackageGuardCode);
      const sourcePackageSlotReady =
        preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight
        && (sourceSlot?.readyForManualSignedApprovalDraftReviewPackageSlot ?? false);
      const sourcePackageGuardReady =
        preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight
        && (sourceGuard?.readyForManualSignedApprovalDraftReviewPackageGuard ?? false);
      const sourcePackageSlotReadOnly = sourceSlot?.readOnly ?? false;
      const sourcePackageGuardReadOnly = sourceGuard?.readOnly ?? false;
      const sourcePackageSlotMaterialized = sourceSlot?.packageSlotMaterialized ?? true;
      const sourcePackageArtifactCreated = sourceSlot?.packageArtifactCreated ?? true;
      const sourceSignedDraftTextPresent = sourceSlot?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceSlot?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceSlot?.approvalGrantPresent ?? true;
      const sourcePackageGuardBlocksPackageMaterialization =
        sourceGuard?.blocksPackageMaterialization ?? false;
      const sourcePackageGuardBlocksSignedDraftText =
        sourceGuard?.blocksSignedDraftText ?? false;
      const sourcePackageGuardBlocksSignaturePayload =
        sourceGuard?.blocksSignaturePayload ?? false;
      const sourcePackageGuardBlocksApprovalGrant =
        sourceGuard?.blocksApprovalGrant ?? false;
      const requiredPackageSlotModeCovered =
        sourceSlot?.slotMode === template.requiredPackageSlotMode;
      const readyForHumanSignedApprovalDraftArtifactAuthoringRequirement =
        sourcePackageSlotReady
        && sourcePackageGuardReady
        && sourcePackageSlotReadOnly
        && sourcePackageGuardReadOnly
        && !sourcePackageSlotMaterialized
        && !sourcePackageArtifactCreated
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourcePackageGuardBlocksPackageMaterialization
        && sourcePackageGuardBlocksSignedDraftText
        && sourcePackageGuardBlocksSignaturePayload
        && sourcePackageGuardBlocksApprovalGrant
        && requiredPackageSlotModeCovered
        && template.authoringPurpose.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        authoringRequirementName: template.authoringRequirementName,
        kind: template.kind,
        requirementMode: template.requirementMode,
        sourcePackageSlotCode: template.sourcePackageSlotCode,
        sourcePackageSlotReady,
        sourcePackageSlotKind: sourceSlot?.kind ?? "",
        sourcePackageSlotMode: sourceSlot?.slotMode ?? "",
        sourcePackageSlotReadOnly,
        sourcePackageSlotMaterialized,
        sourcePackageArtifactCreated,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourcePackageGuardCode: template.sourcePackageGuardCode,
        sourcePackageGuardReady,
        sourcePackageGuardKind: sourceGuard?.kind ?? "",
        sourcePackageGuardReadOnly,
        sourcePackageGuardBlocksPackageMaterialization,
        sourcePackageGuardBlocksSignedDraftText,
        sourcePackageGuardBlocksSignaturePayload,
        sourcePackageGuardBlocksApprovalGrant,
        requiredPackageSlotMode: template.requiredPackageSlotMode,
        requiredPackageSlotModeCovered,
        authoringPurpose: template.authoringPurpose,
        readyForHumanSignedApprovalDraftArtifactAuthoringRequirement,
        authoringInstructionMaterialized: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockers(
  requirements:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker[] {
  const requirementsByCode = new Map(requirements.map((requirement) => [requirement.code, requirement]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_BLOCKERS
    .map((template, index) => {
      const sourceRequirement = requirementsByCode.get(template.sourceAuthoringRequirementCode);
      const sourceAuthoringRequirementReady =
        sourceRequirement?.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement ?? false;
      const rejectsMissingAuthoringRequirement =
        template.blockerCode.startsWith("REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_")
        && template.blockerText.startsWith("Block draft authoring readiness");
      const readyForHumanSignedApprovalDraftArtifactAuthoringBlocker =
        sourceAuthoringRequirementReady
        && rejectsMissingAuthoringRequirement
        && template.blockerText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceAuthoringRequirementCode: template.sourceAuthoringRequirementCode,
        sourceAuthoringRequirementReady,
        blockerCode: template.blockerCode,
        blockerText: template.blockerText,
        rejectsMissingAuthoringRequirement,
        blocksAuthoringInstructionMaterialization: true,
        blocksDraftArtifactCreation: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForHumanSignedApprovalDraftArtifactAuthoringBlocker,
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
