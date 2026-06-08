import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CHECKPOINTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_GUARDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuardCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

type ComparisonPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight;
type Checkpoint =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint;
type Guard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuard;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoints(
  preflight: ComparisonPreflight,
): Checkpoint[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_CHECKPOINTS
    .map((template, index) => {
      const sourceLanes = preflight.lanes.filter((lane) =>
        template.sourceLaneKinds.includes(lane.kind)
        || template.sourceLaneModes.includes(lane.laneMode));
      const sourceControls = preflight.controls.filter((control) =>
        template.sourceAcceptanceControlKinds.includes(control.kind));
      const readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint =
        preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight
        && sourceLanes.length > 0
        && sourceControls.length > 0
        && sourceLanes.every((lane) =>
          lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane
          && lane.readOnly
          && !lane.writesAllowed
          && !lane.startsServices
          && !lane.mutatesSiblingState)
        && sourceControls.every((control) =>
          control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl
          && control.readOnly
          && !control.writesAllowed
          && !control.startsServices
          && !control.mutatesSiblingState)
        && preflight.comparedDraftTextPackageCount === 0
        && preflight.acceptedDraftTextPackageCount === 0
        && preflight.rejectedDraftTextPackageCount === 0
        && preflight.signedDraftTextCount === 0
        && preflight.draftSignaturePayloadCount === 0
        && !preflight.approvalGrantPresent;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        checkpointName: template.checkpointName,
        kind: template.kind,
        checkpointMode: template.checkpointMode,
        sourceLaneKinds: [...template.sourceLaneKinds],
        sourceLaneModes: [...template.sourceLaneModes],
        sourceAcceptanceControlKinds: [...template.sourceAcceptanceControlKinds],
        sourceComparisonLaneCount: sourceLanes.length,
        sourceAcceptanceControlCount: sourceControls.length,
        readySourceComparisonLaneCount:
          sourceLanes.filter((lane) => lane.readyForOfflineSignedApprovalDraftTextPackageComparisonLane).length,
        readySourceAcceptanceControlCount:
          sourceControls.filter((control) =>
            control.readyForOfflineSignedApprovalDraftTextPackageAcceptanceControl).length,
        sourceComparisonPreflightReady:
          preflight.readyForSignedApprovalArtifactDraftTextPackageComparisonPreflight,
        sourceComparisonPreflightReadOnly:
          !preflight.executionAllowed
          && !preflight.writeRoutingAllowed
          && !preflight.startsServices
          && !preflight.mutatesSiblingState
          && !preflight.importsRuntimePayload,
        sourceStillNoComparedDraftTextPackage: preflight.comparedDraftTextPackageCount === 0,
        sourceStillNoAcceptedDraftTextPackage: preflight.acceptedDraftTextPackageCount === 0,
        sourceStillNoRejectedDraftTextPackage: preflight.rejectedDraftTextPackageCount === 0,
        sourceStillNoSignedDraftText: preflight.signedDraftTextCount === 0,
        sourceStillNoSignaturePayload: preflight.draftSignaturePayloadCount === 0,
        sourceStillNoApprovalGrant: !preflight.approvalGrantPresent,
        acceptancePrecheckQuestion: template.acceptancePrecheckQuestion,
        requiredAcceptanceEvidence: template.requiredAcceptanceEvidence,
        readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint,
        acceptanceCheckpointMaterialized: false,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuards(
  checkpoints: readonly Checkpoint[],
): Guard[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARISON_ACCEPTANCE_PRECHECK_GUARDS
    .map((template, index) => {
      const checkpoint = checkpoints.find((entry) => entry.code === template.sourceCheckpointCode);
      const sourceCheckpointReady =
        checkpoint?.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceCheckpointCode: template.sourceCheckpointCode,
        sourceCheckpointReady,
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsMissingAcceptanceEvidence: true,
        blocksDraftTextPackageSubmission: true,
        blocksDraftTextPackageComparison: true,
        blocksDraftTextPackageAcceptance: true,
        blocksSignedDraftText: true,
        blocksSignaturePayload: true,
        blocksApprovalGrant: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard: sourceCheckpointReady,
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
