import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_COMPARISON_CONTROLS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_VERSIONS = [
  "Node v1287",
  "Node v1288",
  "Node v1289",
  "Node v1290",
  "Node v1291",
  "Node v1292",
  "Node v1293",
  "Node v1294",
  "Node v1295",
  "Node v1296",
  "Node v1297",
  "Node v1298",
  "Node v1299",
  "Node v1300",
  "Node v1301",
  "Node v1302",
  "Node v1303",
  "Node v1304",
  "Node v1305",
  "Node v1306",
  "Node v1307",
  "Node v1308",
  "Node v1309",
  "Node v1310",
  "Node v1311",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_LANES:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_SLOTS
      .map((slot, index) => {
        const sourceControl =
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_SUBMISSION_PREFLIGHT_COMPARISON_CONTROLS
            .find((control) => control.sourceSubmissionSlotCode === slot.code);

        return {
          nodeVersion:
            CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_PREFLIGHT_VERSIONS[
              index
            ],
          code: slot.code
            .replace("TEXT_PACKAGE_SUBMISSION_PREFLIGHT", "TEXT_PACKAGE_COMPARISON_PREFLIGHT")
            .replace("_SLOT", "_LANE"),
          comparisonLaneName:
            slot.submissionSlotName.replace("TextPackageSubmissionSlot", "TextPackageComparisonLane"),
          kind: toComparisonLaneKind(slot.kind),
          laneMode: toComparisonLaneMode(slot.slotMode),
          sourceSubmissionSlotCode: slot.code,
          sourceComparisonControlCode: sourceControl?.code ?? `${slot.code}_CONTROL`,
          sourceSubmissionSlotKind: slot.kind,
          sourceSubmissionSlotMode: slot.slotMode,
          requiredComparisonEvidence:
            `Prepare offline comparison evidence for ${slot.submissionSlotName}; no submitted draft text package is parsed in this preflight.`,
          digestRecheckQuestion:
            `Can a later reviewer recheck the submitted package evidence against ${slot.submissionSlotName} digest and source bindings without enabling runtime execution?`,
          acceptanceQuestion:
            `Can a later acceptance decision reject ${slot.submissionSlotName} unless the package remains compared, digest-matched, and approval-grant-free?`,
        };
      }),
  );

function toComparisonLaneKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind {
  return kind.replace("-submission-slot", "-comparison-lane") as
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneKind;
}

function toComparisonLaneMode(
  mode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotMode,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightLaneMode {
  switch (mode) {
    case "manual-submission-metadata":
      return "metadata-comparison-lane";
    case "digest-comparison-pin":
      return "digest-recheck-lane";
    case "signature-envelope-submission-check":
      return "signature-envelope-comparison-lane";
    case "policy-submission-check":
      return "policy-comparison-lane";
    case "execution-lock-submission-check":
      return "execution-lock-comparison-lane";
    case "submission-closeout":
      return "comparison-closeout";
  }
}
