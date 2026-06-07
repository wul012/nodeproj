import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_BLOCKERS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS
      .map((requirement) => ({
        nodeVersion: requirement.nodeVersion,
        code: `${requirement.code}_BLOCKER`,
        kind: toBlockerKind(requirement.kind),
        sourceAuthoringRequirementCode: requirement.code,
        blockerCode: `REJECT_${requirement.code}_MISSING`,
        blockerText:
          `Block draft authoring readiness unless ${requirement.authoringRequirementName} is ready and unmaterialized.`,
      })),
  );

function toBlockerKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind {
  switch (kind) {
    case "identity-authoring-requirement":
      return "identity-authoring-blocker";
    case "digest-binding-authoring-requirement":
      return "digest-binding-authoring-blocker";
    case "signature-envelope-authoring-requirement":
      return "signature-envelope-authoring-blocker";
    case "source-evidence-authoring-requirement":
      return "source-evidence-authoring-blocker";
    case "value-binding-authoring-requirement":
      return "value-binding-authoring-blocker";
    case "policy-authoring-requirement":
      return "policy-authoring-blocker";
    case "execution-lock-authoring-requirement":
      return "execution-lock-authoring-blocker";
    case "archive-closeout-authoring-requirement":
      return "archive-closeout-authoring-blocker";
  }
}
