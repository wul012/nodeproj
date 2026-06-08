import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_COMPARISON_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

type ReviewPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight;
type SubmissionSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot;
type ComparisonControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlots(
  preflight: ReviewPreflight,
): SubmissionSlot[] {
  const criteriaByCode = new Map(preflight.criteria.map((criterion) => [criterion.code, criterion]));
  const controlsByCode = new Map(preflight.controls.map((control) => [control.code, control]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS
    .map((template, index) => {
      const sourceCriterion = criteriaByCode.get(template.sourceReviewCriterionCode);
      const sourceControl = controlsByCode.get(template.sourceReviewControlCode);
      const sourceReviewCriterionReady =
        preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight
        && (sourceCriterion?.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion ?? false);
      const sourceReviewControlReady =
        preflight.readyForSignedApprovalArtifactDraftTextPackageReviewPreflight
        && (sourceControl?.readyForOfflineSignedApprovalDraftTextPackageReviewControl ?? false);
      const sourceReviewCriterionReadOnly = sourceCriterion?.readOnly ?? false;
      const sourceReviewControlReadOnly = sourceControl?.readOnly ?? false;
      const sourceReviewCriterionMaterialized = sourceCriterion?.reviewCriterionMaterialized ?? true;
      const sourceDraftTextPackageReviewed = sourceCriterion?.draftTextPackageReviewed ?? true;
      const sourceDraftTextPackageApproved = sourceCriterion?.draftTextPackageApproved ?? true;
      const sourceDraftTextPackageRejected = sourceCriterion?.draftTextPackageRejected ?? true;
      const sourceSignedDraftTextPresent = sourceCriterion?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceCriterion?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceCriterion?.approvalGrantPresent ?? true;
      const sourceReviewControlBlocksDraftTextPackageReview =
        sourceControl?.blocksDraftTextPackageReview ?? false;
      const sourceReviewControlBlocksDraftTextPackageApproval =
        sourceControl?.blocksDraftTextPackageApproval ?? false;
      const sourceReviewControlBlocksSignedDraftText =
        sourceControl?.blocksSignedDraftText ?? false;
      const sourceReviewControlBlocksSignaturePayload =
        sourceControl?.blocksSignaturePayload ?? false;
      const sourceReviewControlBlocksApprovalGrant =
        sourceControl?.blocksApprovalGrant ?? false;
      const sourceReviewControlBlocksRuntimePayload =
        sourceControl?.blocksRuntimePayload ?? false;
      const sourceReviewControlBlocksWrites = sourceControl?.blocksWrites ?? false;
      const sourceReviewControlBlocksSiblingMutation =
        sourceControl?.blocksSiblingMutation ?? false;
      const readyForManualSignedApprovalDraftTextPackageSubmissionSlot =
        sourceReviewCriterionReady
        && sourceReviewControlReady
        && sourceReviewCriterionReadOnly
        && sourceReviewControlReadOnly
        && !sourceReviewCriterionMaterialized
        && !sourceDraftTextPackageReviewed
        && !sourceDraftTextPackageApproved
        && !sourceDraftTextPackageRejected
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourceReviewControlBlocksDraftTextPackageReview
        && sourceReviewControlBlocksDraftTextPackageApproval
        && sourceReviewControlBlocksSignedDraftText
        && sourceReviewControlBlocksSignaturePayload
        && sourceReviewControlBlocksApprovalGrant
        && sourceReviewControlBlocksRuntimePayload
        && sourceReviewControlBlocksWrites
        && sourceReviewControlBlocksSiblingMutation
        && template.expectedShape.length > 0
        && template.submissionRequirement.length > 0
        && template.comparisonQuestion.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        submissionSlotName: template.submissionSlotName,
        kind: template.kind,
        slotMode: template.slotMode,
        sourceReviewCriterionCode: template.sourceReviewCriterionCode,
        sourceReviewCriterionReady,
        sourceReviewCriterionKind: sourceCriterion?.kind ?? "",
        sourceReviewCriterionMode: sourceCriterion?.criterionMode ?? "",
        sourceReviewCriterionReadOnly,
        sourceReviewCriterionMaterialized,
        sourceDraftTextPackageReviewed,
        sourceDraftTextPackageApproved,
        sourceDraftTextPackageRejected,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourceReviewControlCode: template.sourceReviewControlCode,
        sourceReviewControlReady,
        sourceReviewControlKind: sourceControl?.kind ?? "",
        sourceReviewControlReadOnly,
        sourceReviewControlBlocksDraftTextPackageReview,
        sourceReviewControlBlocksDraftTextPackageApproval,
        sourceReviewControlBlocksSignedDraftText,
        sourceReviewControlBlocksSignaturePayload,
        sourceReviewControlBlocksApprovalGrant,
        sourceReviewControlBlocksRuntimePayload,
        sourceReviewControlBlocksWrites,
        sourceReviewControlBlocksSiblingMutation,
        expectedShape: template.expectedShape,
        submissionRequirement: template.submissionRequirement,
        comparisonQuestion: template.comparisonQuestion,
        readyForManualSignedApprovalDraftTextPackageSubmissionSlot,
        submissionSlotMaterialized: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControls(
  slots: readonly SubmissionSlot[],
): ComparisonControl[] {
  const slotsByCode = new Map(slots.map((slot) => [slot.code, slot]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_COMPARISON_CONTROLS
    .map((template, index) => {
      const sourceSlot = slotsByCode.get(template.sourceSubmissionSlotCode);
      const sourceSubmissionSlotReady =
        sourceSlot?.readyForManualSignedApprovalDraftTextPackageSubmissionSlot ?? false;
      const rejectsUnsubmittedSlot =
        template.guardCode.startsWith(
          "REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_",
        )
        && template.guardText.startsWith("Block draft text package comparison");
      const readyForManualSignedApprovalDraftTextPackageComparisonControl =
        sourceSubmissionSlotReady
        && rejectsUnsubmittedSlot
        && template.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceSubmissionSlotCode: template.sourceSubmissionSlotCode,
        sourceSubmissionSlotReady,
        sourceReviewControlKind: sourceSlot?.sourceReviewControlKind ?? "",
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsUnsubmittedSlot,
        blocksDraftTextPackageSubmission: true,
        blocksDraftTextPackageComparison: true,
        blocksDraftTextPackageAcceptance: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForManualSignedApprovalDraftTextPackageComparisonControl,
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
