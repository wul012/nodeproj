import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

type ComparisonControlKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_COMPARISON_CONTROLS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS
      .map((slot) => ({
        nodeVersion: slot.nodeVersion,
        code: `${slot.code}_CONTROL`,
        kind: toComparisonControlKind(slot.kind),
        sourceSubmissionSlotCode: slot.code,
        sourceReviewControlKind: "" as const,
        guardCode: `REJECT_${slot.code}_UNSUBMITTED`,
        guardText:
          `Block draft text package comparison unless ${slot.submissionSlotName} remains declared, read-only, unsubmitted, and bound to the v1261 review control.`,
      })),
  );

function toComparisonControlKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
): ComparisonControlKind {
  return kind.replace("-submission-slot", "-comparison-control") as ComparisonControlKind;
}
