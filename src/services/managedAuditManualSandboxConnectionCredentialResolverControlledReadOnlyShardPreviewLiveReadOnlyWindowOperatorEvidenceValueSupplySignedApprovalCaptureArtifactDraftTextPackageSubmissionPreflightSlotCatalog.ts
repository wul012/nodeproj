import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CRITERIA,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS = [
  "Node v1262",
  "Node v1263",
  "Node v1264",
  "Node v1265",
  "Node v1266",
  "Node v1267",
  "Node v1268",
  "Node v1269",
  "Node v1270",
  "Node v1271",
  "Node v1272",
  "Node v1273",
  "Node v1274",
  "Node v1275",
  "Node v1276",
  "Node v1277",
  "Node v1278",
  "Node v1279",
  "Node v1280",
  "Node v1281",
  "Node v1282",
  "Node v1283",
  "Node v1284",
  "Node v1285",
  "Node v1286",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CRITERIA
      .map((criterion, index) => ({
        nodeVersion:
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_VERSIONS[
            index
          ],
        code: criterion.code
          .replace("TEXT_PACKAGE_REVIEW_PREFLIGHT", "TEXT_PACKAGE_SUBMISSION_PREFLIGHT")
          .replace("_CRITERION", "_SLOT"),
        submissionSlotName:
          criterion.reviewCriterionName.replace("TextPackageReviewCriterion", "TextPackageSubmissionSlot"),
        kind: toSubmissionSlotKind(criterion.kind),
        slotMode: toSubmissionSlotMode(criterion.criterionMode),
        sourceReviewCriterionCode: criterion.code,
        sourceReviewControlCode: `${criterion.code}_CONTROL`,
        sourceReviewCriterionKind: criterion.kind,
        sourceReviewCriterionMode: criterion.criterionMode,
        expectedShape: criterion.expectedShape,
        submissionRequirement:
          `Declare the manual artifact submission slot for ${criterion.reviewCriterionName}; no draft text package is accepted in this preflight.`,
        comparisonQuestion:
          `Can a later offline comparison verify the submitted artifact slot for ${criterion.reviewCriterionName} without parsing signed text here?`,
      })),
  );

function toSubmissionSlotKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind {
  return kind.replace("-review-criterion", "-submission-slot") as
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind;
}

function toSubmissionSlotMode(
  mode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode {
  switch (mode) {
    case "offline-review-metadata":
      return "manual-submission-metadata";
    case "digest-review-pin":
      return "digest-comparison-pin";
    case "signature-envelope-review-check":
      return "signature-envelope-submission-check";
    case "policy-review-check":
      return "policy-submission-check";
    case "execution-lock-review-check":
      return "execution-lock-submission-check";
    case "review-closeout":
      return "submission-closeout";
  }
}
