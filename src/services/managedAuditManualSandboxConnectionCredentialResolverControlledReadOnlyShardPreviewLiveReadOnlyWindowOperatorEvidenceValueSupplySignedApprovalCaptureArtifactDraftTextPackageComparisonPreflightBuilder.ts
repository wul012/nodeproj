import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_ACCEPTANCE_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControlCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_LANES,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";

type SubmissionPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight;
type ComparisonLane =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLane;
type AcceptanceControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControl;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLanes(
  preflight: SubmissionPreflight,
): ComparisonLane[] {
  const slotsByCode = new Map(preflight.slots.map((slot) => [slot.code, slot]));
  const controlsByCode = new Map(preflight.controls.map((control) => [control.code, control]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_LANES
    .map((template, index) => {
      const sourceSlot = slotsByCode.get(template.sourceSubmissionSlotCode);
      const sourceControl = controlsByCode.get(template.sourceComparisonControlCode);
      const sourceSubmissionSlotReady =
        preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight
        && (sourceSlot?.readyForManualSignedApprovalDraftTextPackageSubmissionSlot ?? false);
      const sourceComparisonControlReady =
        preflight.readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight
        && (sourceControl?.readyForManualSignedApprovalDraftTextPackageComparisonControl ?? false);
      const sourceSubmissionSlotReadOnly = sourceSlot?.readOnly ?? false;
      const sourceComparisonControlReadOnly = sourceControl?.readOnly ?? false;
      const sourceSubmissionSlotMaterialized = sourceSlot?.submissionSlotMaterialized ?? true;
      const sourceDraftTextPackageSubmitted = sourceSlot?.draftTextPackageSubmitted ?? true;
      const sourceDraftTextPackageCompared = sourceSlot?.draftTextPackageCompared ?? true;
      const sourceDraftTextPackageAccepted = sourceSlot?.draftTextPackageAccepted ?? true;
      const sourceDraftTextPackageRejected = sourceSlot?.draftTextPackageRejected ?? true;
      const sourceSignedDraftTextPresent = sourceSlot?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceSlot?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceSlot?.approvalGrantPresent ?? true;
      const sourceComparisonControlRejectsUnsubmittedSlot =
        sourceControl?.rejectsUnsubmittedSlot ?? false;
      const sourceComparisonControlBlocksDraftTextPackageComparison =
        sourceControl?.blocksDraftTextPackageComparison ?? false;
      const sourceComparisonControlBlocksDraftTextPackageAcceptance =
        sourceControl?.blocksDraftTextPackageAcceptance ?? false;
      const sourceComparisonControlBlocksSignedDraftText =
        sourceControl?.blocksSignedDraftText ?? false;
      const sourceComparisonControlBlocksSignaturePayload =
        sourceControl?.blocksSignaturePayload ?? false;
      const sourceComparisonControlBlocksApprovalGrant =
        sourceControl?.blocksApprovalGrant ?? false;
      const sourceComparisonControlBlocksRuntimePayload =
        sourceControl?.blocksRuntimePayload ?? false;
      const sourceComparisonControlBlocksWrites = sourceControl?.blocksWrites ?? false;
      const sourceComparisonControlBlocksSiblingMutation =
        sourceControl?.blocksSiblingMutation ?? false;
      const readyForOfflineSignedApprovalDraftTextPackageComparisonLane =
        sourceSubmissionSlotReady
        && sourceComparisonControlReady
        && sourceSubmissionSlotReadOnly
        && sourceComparisonControlReadOnly
        && !sourceSubmissionSlotMaterialized
        && !sourceDraftTextPackageSubmitted
        && !sourceDraftTextPackageCompared
        && !sourceDraftTextPackageAccepted
        && !sourceDraftTextPackageRejected
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourceComparisonControlRejectsUnsubmittedSlot
        && sourceComparisonControlBlocksDraftTextPackageComparison
        && sourceComparisonControlBlocksDraftTextPackageAcceptance
        && sourceComparisonControlBlocksSignedDraftText
        && sourceComparisonControlBlocksSignaturePayload
        && sourceComparisonControlBlocksApprovalGrant
        && sourceComparisonControlBlocksRuntimePayload
        && sourceComparisonControlBlocksWrites
        && sourceComparisonControlBlocksSiblingMutation
        && template.requiredComparisonEvidence.length > 0
        && template.digestRecheckQuestion.length > 0
        && template.acceptanceQuestion.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        comparisonLaneName: template.comparisonLaneName,
        kind: template.kind,
        laneMode: template.laneMode,
        sourceSubmissionSlotCode: template.sourceSubmissionSlotCode,
        sourceSubmissionSlotReady,
        sourceSubmissionSlotKind: sourceSlot?.kind ?? "",
        sourceSubmissionSlotMode: sourceSlot?.slotMode ?? "",
        sourceSubmissionSlotReadOnly,
        sourceSubmissionSlotMaterialized,
        sourceDraftTextPackageSubmitted,
        sourceDraftTextPackageCompared,
        sourceDraftTextPackageAccepted,
        sourceDraftTextPackageRejected,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourceComparisonControlCode: template.sourceComparisonControlCode,
        sourceComparisonControlReady,
        sourceComparisonControlKind: sourceControl?.kind ?? "",
        sourceComparisonControlReadOnly,
        sourceComparisonControlRejectsUnsubmittedSlot,
        sourceComparisonControlBlocksDraftTextPackageComparison,
        sourceComparisonControlBlocksDraftTextPackageAcceptance,
        sourceComparisonControlBlocksSignedDraftText,
        sourceComparisonControlBlocksSignaturePayload,
        sourceComparisonControlBlocksApprovalGrant,
        sourceComparisonControlBlocksRuntimePayload,
        sourceComparisonControlBlocksWrites,
        sourceComparisonControlBlocksSiblingMutation,
        requiredComparisonEvidence: template.requiredComparisonEvidence,
        digestRecheckQuestion: template.digestRecheckQuestion,
        acceptanceQuestion: template.acceptanceQuestion,
        readyForOfflineSignedApprovalDraftTextPackageComparisonLane,
        comparisonLaneMaterialized: false,
        draftTextPackageSubmitted: false,
        draftTextPackageCompared: false,
        draftTextPackageAccepted: false,
        draftTextPackageRejected: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightAcceptanceControls(
  lanes: readonly ComparisonLane[],
): AcceptanceControl[] {
  const lanesByCode = new Map(lanes.map((lane) => [lane.code, lane]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_ACCEPTANCE_CONTROLS
    .map((template, index) => {
      const sourceLane = lanesByCode.get(template.sourceComparisonLaneCode);
      const sourceComparisonLaneReady =
        sourceLane?.readyForOfflineSignedApprovalDraftTextPackageComparisonLane ?? false;
      const rejectsUncomparedLane =
        template.guardCode.startsWith(
          "REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_",
        )
        && template.guardText.startsWith("Block draft text package acceptance");
      const readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl =
        sourceComparisonLaneReady
        && rejectsUncomparedLane
        && template.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceComparisonLaneCode: template.sourceComparisonLaneCode,
        sourceComparisonLaneReady,
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsUncomparedLane,
        blocksDraftTextPackageSubmission: true,
        blocksDraftTextPackageComparison: true,
        blocksDraftTextPackageAcceptance: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl,
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
