import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_GUARDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlots(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot[] {
  const lanesByCode = new Map(readiness.lanes.map((lane) => [lane.code, lane]));
  const controlsByCode = new Map(readiness.controls.map((control) => [control.code, control]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_SLOTS
    .map((slotTemplate, index) => {
      const sourceLane = lanesByCode.get(slotTemplate.sourceReadinessLaneCode);
      const sourceControl = controlsByCode.get(slotTemplate.sourceReadinessControlCode);
      const sourceReadinessLaneReady =
        readiness.readyForSignedApprovalArtifactDraftReadiness
        && (sourceLane?.readyForManualSignedApprovalDraftReadinessLane ?? false);
      const sourceReadinessControlReady =
        readiness.readyForSignedApprovalArtifactDraftReadiness
        && (sourceControl?.readyForManualSignedApprovalDraftReadinessControl ?? false);
      const sourceReadinessLaneReadOnly = sourceLane?.readOnly ?? false;
      const sourceReadinessControlReadOnly = sourceControl?.readOnly ?? false;
      const sourceReadinessLaneManualReviewRequired =
        sourceLane?.manualDraftReviewRequired ?? false;
      const sourceReadinessLaneManualDraftMaterialized =
        sourceLane?.manualDraftMaterialized ?? true;
      const sourceReadinessControlBlocksAutoMaterialization =
        sourceControl?.blocksAutoMaterialization ?? false;
      const sourceReadinessControlBlocksSignedApprovalCapture =
        sourceControl?.blocksSignedApprovalCapture ?? false;
      const sourceReadinessControlBlocksRuntimePayload =
        sourceControl?.blocksRuntimePayload ?? false;
      const requiredReadinessLaneModeCovered =
        sourceLane?.laneMode === slotTemplate.requiredReadinessLaneMode;
      const readyForManualSignedApprovalDraftReviewPackageSlot =
        sourceReadinessLaneReady
        && sourceReadinessControlReady
        && sourceReadinessLaneReadOnly
        && sourceReadinessControlReadOnly
        && sourceReadinessLaneManualReviewRequired
        && !sourceReadinessLaneManualDraftMaterialized
        && sourceReadinessControlBlocksAutoMaterialization
        && sourceReadinessControlBlocksSignedApprovalCapture
        && sourceReadinessControlBlocksRuntimePayload
        && requiredReadinessLaneModeCovered
        && slotTemplate.reviewPackagePurpose.length > 0;

      return {
        order: index + 1,
        nodeVersion: slotTemplate.nodeVersion,
        code: slotTemplate.code,
        packageSlotName: slotTemplate.packageSlotName,
        kind: slotTemplate.kind,
        slotMode: slotTemplate.slotMode,
        sourceReadinessLaneCode: slotTemplate.sourceReadinessLaneCode,
        sourceReadinessLaneReady,
        sourceReadinessLaneKind: sourceLane?.kind ?? "",
        sourceReadinessLaneMode: sourceLane?.laneMode ?? "",
        sourceReadinessLaneReadOnly,
        sourceReadinessLaneManualReviewRequired,
        sourceReadinessLaneManualDraftMaterialized,
        sourceReadinessControlCode: slotTemplate.sourceReadinessControlCode,
        sourceReadinessControlReady,
        sourceReadinessControlKind: sourceControl?.kind ?? "",
        sourceReadinessControlReadOnly,
        sourceReadinessControlBlocksAutoMaterialization,
        sourceReadinessControlBlocksSignedApprovalCapture,
        sourceReadinessControlBlocksRuntimePayload,
        requiredReadinessLaneMode: slotTemplate.requiredReadinessLaneMode,
        requiredReadinessLaneModeCovered,
        reviewPackagePurpose: slotTemplate.reviewPackagePurpose,
        readyForManualSignedApprovalDraftReviewPackageSlot,
        packageSlotMaterialized: false,
        packageArtifactCreated: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuards(
  slots:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard[] {
  const slotsByCode = new Map(slots.map((slot) => [slot.code, slot]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_GUARDS
    .map((guardTemplate, index) => {
      const sourceSlot = slotsByCode.get(guardTemplate.sourcePackageSlotCode);
      const sourcePackageSlotReady =
        sourceSlot?.readyForManualSignedApprovalDraftReviewPackageSlot ?? false;
      const rejectsMissingReviewPackageSlot =
        guardTemplate.blockerCode.startsWith("REJECT_DRAFT_REVIEW_PACKAGE_")
        && guardTemplate.guardText.startsWith("Block draft review package preflight");
      const readyForManualSignedApprovalDraftReviewPackageGuard =
        sourcePackageSlotReady
        && rejectsMissingReviewPackageSlot
        && guardTemplate.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: guardTemplate.nodeVersion,
        code: guardTemplate.code,
        kind: guardTemplate.kind,
        sourcePackageSlotCode: guardTemplate.sourcePackageSlotCode,
        sourcePackageSlotReady,
        blockerCode: guardTemplate.blockerCode,
        guardText: guardTemplate.guardText,
        rejectsMissingReviewPackageSlot,
        blocksPackageMaterialization: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForManualSignedApprovalDraftReviewPackageGuard,
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
