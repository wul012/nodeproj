import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS = [
  "Node v1237",
  "Node v1238",
  "Node v1239",
  "Node v1240",
  "Node v1241",
  "Node v1242",
  "Node v1243",
  "Node v1244",
  "Node v1245",
  "Node v1246",
  "Node v1247",
  "Node v1248",
  "Node v1249",
  "Node v1250",
  "Node v1251",
  "Node v1252",
  "Node v1253",
  "Node v1254",
  "Node v1255",
  "Node v1256",
  "Node v1257",
  "Node v1258",
  "Node v1259",
  "Node v1260",
  "Node v1261",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_CRITERIA:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS
      .map((field, index) => ({
        nodeVersion:
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_REVIEW_PREFLIGHT_VERSIONS[
            index
          ],
        code: field.code
          .replace("TEXT_PACKAGE_INTAKE", "TEXT_PACKAGE_REVIEW_PREFLIGHT")
          .replace("_FIELD", "_CRITERION"),
        reviewCriterionName:
          field.intakeFieldName.replace("TextPackageIntakeField", "TextPackageReviewCriterion"),
        kind: toReviewCriterionKind(field.kind),
        criterionMode: toReviewCriterionMode(field.fieldMode),
        sourceIntakeFieldCode: field.code,
        sourceIntakeGuardCode: `${field.code}_GUARD`,
        sourceIntakeFieldKind: field.kind,
        sourceIntakeFieldMode: field.fieldMode,
        expectedShape: field.expectedShape,
        reviewPurpose:
          `Prepare offline review of ${field.intakeFieldName} without accepting submitted text or detached signature material.`,
        reviewQuestion:
          `Can a later offline artifact reviewer verify ${field.intakeFieldName} against ${field.expectedShape} without accepting content in this preflight?`,
      })),
  );

function toReviewCriterionKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind {
  return kind.replace("-intake-field", "-review-criterion") as
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind;
}

function toReviewCriterionMode(
  mode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionMode {
  switch (mode) {
    case "text-package-metadata":
      return "offline-review-metadata";
    case "digest-intake-pin":
      return "digest-review-pin";
    case "signature-envelope-intake-check":
      return "signature-envelope-review-check";
    case "policy-intake-check":
      return "policy-review-check";
    case "execution-lock-intake-check":
      return "execution-lock-review-check";
    case "intake-closeout":
      return "review-closeout";
  }
}
