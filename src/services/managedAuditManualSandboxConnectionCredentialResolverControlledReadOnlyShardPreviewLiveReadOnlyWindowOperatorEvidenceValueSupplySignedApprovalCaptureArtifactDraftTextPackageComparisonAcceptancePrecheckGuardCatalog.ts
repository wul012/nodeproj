import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CHECKPOINTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

const GUARD_KIND_BY_CHECKPOINT_KIND: Record<
  string,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardKind
> = {
  "source-comparison-preflight-acceptance-checkpoint": "source-comparison-preflight-acceptance-guard",
  "identity-acceptance-checkpoint": "identity-acceptance-guard",
  "digest-binding-acceptance-checkpoint": "digest-binding-acceptance-guard",
  "signature-envelope-acceptance-checkpoint": "signature-envelope-acceptance-guard",
  "source-evidence-acceptance-checkpoint": "source-evidence-acceptance-guard",
  "operator-value-acceptance-checkpoint": "operator-value-acceptance-guard",
  "policy-acceptance-checkpoint": "policy-acceptance-guard",
  "execution-lock-acceptance-checkpoint": "execution-lock-acceptance-guard",
  "approval-grant-review-acceptance-checkpoint": "approval-grant-review-acceptance-guard",
  "archive-closeout-acceptance-checkpoint": "archive-closeout-acceptance-guard",
};

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_GUARDS:
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardTemplate[] =
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CHECKPOINTS
      .map((checkpoint) => ({
        nodeVersion: checkpoint.nodeVersion,
        code: `${checkpoint.code}_GUARD`,
        kind: GUARD_KIND_BY_CHECKPOINT_KIND[checkpoint.kind],
        sourceCheckpointCode: checkpoint.code,
        guardCode: `${checkpoint.code}_REJECTS_MISSING_ACCEPTANCE_EVIDENCE`,
        guardText:
          `Reject acceptance when ${checkpoint.checkpointName.toLowerCase()} is missing compared package evidence, approval-grant separation, or no-side-effect proof.`,
      }));
