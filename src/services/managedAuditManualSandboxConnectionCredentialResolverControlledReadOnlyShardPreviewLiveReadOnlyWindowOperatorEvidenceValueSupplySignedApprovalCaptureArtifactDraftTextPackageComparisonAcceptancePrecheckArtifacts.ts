import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoints,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuards,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";

type ComparisonPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonPreflight;
type Checkpoint =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoint;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck(
  preflight: ComparisonPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck {
  const checkpoints =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpoints(
      preflight,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGuards(
      checkpoints,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckGates(
      preflight,
      checkpoints,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck =
    blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    checkpoints: checkpoints.map((checkpoint) => [
      checkpoint.order,
      checkpoint.nodeVersion,
      checkpoint.code,
      checkpoint.kind,
      checkpoint.checkpointMode,
      checkpoint.sourceComparisonLaneCount,
      checkpoint.sourceAcceptanceControlCount,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceCheckpointCode,
      guard.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion: "Node v1321",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightVersion,
    artifactDraftTextPackageComparisonAcceptancePrecheckState:
      readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck
        ? "ready-for-signed-approval-artifact-draft-text-package-comparison-acceptance-precheck"
        : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      preflight.readyForOfflineSignedApprovalDraftTextPackageComparison,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      preflight.readyForManualSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    checkpointCount: checkpoints.length,
    guardCount: guards.length,
    sourceComparisonLaneCount: preflight.comparisonLaneCount,
    sourceAcceptanceControlCount: preflight.acceptanceControlCount,
    readyCheckpointCount:
      checkpoints.filter((checkpoint) =>
        checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint).length,
    readyGuardCount:
      guards.filter((guard) => guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard).length,
    sourceReadinessCheckpointCount:
      countCheckpoints(checkpoints, "source-comparison-preflight-acceptance-checkpoint"),
    identityCheckpointCount: countCheckpoints(checkpoints, "identity-acceptance-checkpoint"),
    digestBindingCheckpointCount: countCheckpoints(checkpoints, "digest-binding-acceptance-checkpoint"),
    signatureEnvelopeCheckpointCount: countCheckpoints(checkpoints, "signature-envelope-acceptance-checkpoint"),
    sourceEvidenceCheckpointCount: countCheckpoints(checkpoints, "source-evidence-acceptance-checkpoint"),
    operatorValueCheckpointCount: countCheckpoints(checkpoints, "operator-value-acceptance-checkpoint"),
    policyCheckpointCount: countCheckpoints(checkpoints, "policy-acceptance-checkpoint"),
    executionLockCheckpointCount: countCheckpoints(checkpoints, "execution-lock-acceptance-checkpoint"),
    approvalGrantReviewCheckpointCount:
      countCheckpoints(checkpoints, "approval-grant-review-acceptance-checkpoint"),
    archiveCloseoutCheckpointCount: countCheckpoints(checkpoints, "archive-closeout-acceptance-checkpoint"),
    expectedDraftTextPackageAcceptanceCheckpointCount: checkpoints.length,
    actualDraftTextPackageAcceptanceEvidenceCount: 0,
    submittedDraftTextPackageCount: 0,
    comparedDraftTextPackageCount: 0,
    acceptedDraftTextPackageCount: 0,
    rejectedDraftTextPackageCount: 0,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    checkpoints,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countCheckpoints(
  checkpoints: readonly Checkpoint[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckCheckpointKind,
): number {
  return checkpoints.filter((checkpoint) => checkpoint.kind === kind).length;
}
