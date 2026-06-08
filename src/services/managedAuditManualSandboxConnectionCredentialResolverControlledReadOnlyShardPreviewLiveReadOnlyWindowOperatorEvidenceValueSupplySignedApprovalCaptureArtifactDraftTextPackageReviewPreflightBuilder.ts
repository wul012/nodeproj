import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CRITERIA,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";

type TextPackageIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake;
type ReviewCriterion =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion;
type ReviewControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriteria(
  intake: TextPackageIntake,
): ReviewCriterion[] {
  const fieldsByCode = new Map(intake.fields.map((field) => [field.code, field]));
  const guardsByCode = new Map(intake.guards.map((guard) => [guard.code, guard]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CRITERIA
    .map((template, index) => {
      const sourceField = fieldsByCode.get(template.sourceIntakeFieldCode);
      const sourceGuard = guardsByCode.get(template.sourceIntakeGuardCode);
      const sourceIntakeFieldReady =
        intake.readyForSignedApprovalArtifactDraftTextPackageIntake
        && (sourceField?.readyForHumanSignedApprovalDraftTextPackageIntakeField ?? false);
      const sourceIntakeGuardReady =
        intake.readyForSignedApprovalArtifactDraftTextPackageIntake
        && (sourceGuard?.readyForHumanSignedApprovalDraftTextPackageIntakeGuard ?? false);
      const sourceIntakeFieldReadOnly = sourceField?.readOnly ?? false;
      const sourceIntakeGuardReadOnly = sourceGuard?.readOnly ?? false;
      const sourceDraftTextPackageFieldMaterialized =
        sourceField?.draftTextPackageFieldMaterialized ?? true;
      const sourceDraftTextPackageAccepted = sourceField?.draftTextPackageAccepted ?? true;
      const sourceSignedDraftTextPresent = sourceField?.signedDraftTextPresent ?? true;
      const sourceDraftSignaturePayloadPresent = sourceField?.draftSignaturePayloadPresent ?? true;
      const sourceApprovalGrantPresent = sourceField?.approvalGrantPresent ?? true;
      const sourceIntakeGuardBlocksDraftTextPackageAcceptance =
        sourceGuard?.blocksDraftTextPackageAcceptance ?? false;
      const sourceIntakeGuardBlocksSignedDraftText =
        sourceGuard?.blocksSignedDraftText ?? false;
      const sourceIntakeGuardBlocksSignaturePayload =
        sourceGuard?.blocksSignaturePayload ?? false;
      const sourceIntakeGuardBlocksApprovalGrant =
        sourceGuard?.blocksApprovalGrant ?? false;
      const sourceIntakeGuardBlocksRuntimePayload =
        sourceGuard?.blocksRuntimePayload ?? false;
      const sourceIntakeGuardBlocksWrites = sourceGuard?.blocksWrites ?? false;
      const sourceIntakeGuardBlocksSiblingMutation =
        sourceGuard?.blocksSiblingMutation ?? false;
      const readyForOfflineSignedApprovalDraftTextPackageReviewCriterion =
        sourceIntakeFieldReady
        && sourceIntakeGuardReady
        && sourceIntakeFieldReadOnly
        && sourceIntakeGuardReadOnly
        && !sourceDraftTextPackageFieldMaterialized
        && !sourceDraftTextPackageAccepted
        && !sourceSignedDraftTextPresent
        && !sourceDraftSignaturePayloadPresent
        && !sourceApprovalGrantPresent
        && sourceIntakeGuardBlocksDraftTextPackageAcceptance
        && sourceIntakeGuardBlocksSignedDraftText
        && sourceIntakeGuardBlocksSignaturePayload
        && sourceIntakeGuardBlocksApprovalGrant
        && sourceIntakeGuardBlocksRuntimePayload
        && sourceIntakeGuardBlocksWrites
        && sourceIntakeGuardBlocksSiblingMutation
        && template.expectedShape.length > 0
        && template.reviewPurpose.length > 0
        && template.reviewQuestion.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        reviewCriterionName: template.reviewCriterionName,
        kind: template.kind,
        criterionMode: template.criterionMode,
        sourceIntakeFieldCode: template.sourceIntakeFieldCode,
        sourceIntakeFieldReady,
        sourceIntakeFieldKind: sourceField?.kind ?? "",
        sourceIntakeFieldMode: sourceField?.fieldMode ?? "",
        sourceIntakeFieldReadOnly,
        sourceDraftTextPackageFieldMaterialized,
        sourceDraftTextPackageAccepted,
        sourceSignedDraftTextPresent,
        sourceDraftSignaturePayloadPresent,
        sourceApprovalGrantPresent,
        sourceIntakeGuardCode: template.sourceIntakeGuardCode,
        sourceIntakeGuardReady,
        sourceIntakeGuardKind: sourceGuard?.kind ?? "",
        sourceIntakeGuardReadOnly,
        sourceIntakeGuardBlocksDraftTextPackageAcceptance,
        sourceIntakeGuardBlocksSignedDraftText,
        sourceIntakeGuardBlocksSignaturePayload,
        sourceIntakeGuardBlocksApprovalGrant,
        sourceIntakeGuardBlocksRuntimePayload,
        sourceIntakeGuardBlocksWrites,
        sourceIntakeGuardBlocksSiblingMutation,
        expectedShape: template.expectedShape,
        reviewPurpose: template.reviewPurpose,
        reviewQuestion: template.reviewQuestion,
        readyForOfflineSignedApprovalDraftTextPackageReviewCriterion,
        reviewCriterionMaterialized: false,
        draftTextPackageReviewed: false,
        draftTextPackageApproved: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControls(
  criteria: readonly ReviewCriterion[],
): ReviewControl[] {
  const criteriaByCode = new Map(criteria.map((criterion) => [criterion.code, criterion]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CONTROLS
    .map((template, index) => {
      const sourceCriterion = criteriaByCode.get(template.sourceReviewCriterionCode);
      const sourceReviewCriterionReady =
        sourceCriterion?.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion ?? false;
      const rejectsUnreviewableCriterion =
        template.guardCode.startsWith(
          "REJECT_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_",
        )
        && template.guardText.startsWith("Block draft text package review preflight");
      const readyForOfflineSignedApprovalDraftTextPackageReviewControl =
        sourceReviewCriterionReady
        && rejectsUnreviewableCriterion
        && template.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceReviewCriterionCode: template.sourceReviewCriterionCode,
        sourceReviewCriterionReady,
        sourceIntakeGuardKind: sourceCriterion?.sourceIntakeGuardKind ?? "",
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsUnreviewableCriterion,
        blocksDraftTextPackageReview: true,
        blocksDraftTextPackageApproval: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForOfflineSignedApprovalDraftTextPackageReviewControl,
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
