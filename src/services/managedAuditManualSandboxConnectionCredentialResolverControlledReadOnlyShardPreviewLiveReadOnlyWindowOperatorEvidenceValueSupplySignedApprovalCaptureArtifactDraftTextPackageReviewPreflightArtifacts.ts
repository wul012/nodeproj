import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControls,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriteria,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";

type TextPackageIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake;
type ReviewCriterion =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterion;
type ReviewControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControl;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight(
  intake: TextPackageIntake,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight {
  const criteria =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriteria(
      intake,
    );
  const controls =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControls(
      criteria,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightGates(
      intake,
      criteria,
      controls,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftTextPackageReviewPreflight =
    blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      intake.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: intake.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: intake.sourceApprovalPacketReviewDigest,
    criteria: criteria.map((criterion) => [
      criterion.order,
      criterion.nodeVersion,
      criterion.code,
      criterion.kind,
      criterion.criterionMode,
      criterion.sourceIntakeFieldCode,
      criterion.sourceIntakeGuardCode,
    ]),
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.sourceReviewCriterionCode,
      control.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion: "Node v1261",
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeVersion,
    artifactDraftTextPackageReviewPreflightState:
      readyForSignedApprovalArtifactDraftTextPackageReviewPreflight
        ? "ready-for-signed-approval-artifact-draft-text-package-review-preflight"
        : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageReviewPreflight,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      readyForSignedApprovalArtifactDraftTextPackageReviewPreflight,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      intake.readyForHumanSignedApprovalDraftTextPackageSubmission,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    reviewCriterionCount: criteria.length,
    reviewControlCount: controls.length,
    identityReviewCriterionCount: countCriteria(criteria, "identity-review-criterion"),
    digestBindingReviewCriterionCount: countCriteria(criteria, "digest-binding-review-criterion"),
    signatureEnvelopeReviewCriterionCount: countCriteria(criteria, "signature-envelope-review-criterion"),
    sourceEvidenceReviewCriterionCount: countCriteria(criteria, "source-evidence-review-criterion"),
    valueBindingReviewCriterionCount: countCriteria(criteria, "value-binding-review-criterion"),
    policyReviewCriterionCount: countCriteria(criteria, "policy-review-criterion"),
    executionLockReviewCriterionCount: countCriteria(criteria, "execution-lock-review-criterion"),
    archiveCloseoutReviewCriterionCount: countCriteria(criteria, "archive-closeout-review-criterion"),
    digestModeReviewCriterionCount:
      criteria.filter((criterion) => criterion.criterionMode === "digest-review-pin").length,
    readyReviewCriterionCount:
      criteria.filter((criterion) =>
        criterion.readyForOfflineSignedApprovalDraftTextPackageReviewCriterion).length,
    readyReviewControlCount:
      controls.filter((control) =>
        control.readyForOfflineSignedApprovalDraftTextPackageReviewControl).length,
    digestBindingReviewControlCount: countControls(controls, "digest-binding-review-control"),
    signatureEnvelopeReviewControlCount: countControls(controls, "signature-envelope-review-control"),
    policyReviewControlCount: countControls(controls, "policy-review-control"),
    executionLockReviewControlCount: countControls(controls, "execution-lock-review-control"),
    archiveCloseoutReviewControlCount: countControls(controls, "archive-closeout-review-control"),
    expectedDraftTextPackageFieldCount: intake.expectedDraftTextPackageFieldCount,
    actualDraftTextPackageFieldCount: 0,
    acceptedDraftTextPackageCount: 0,
    reviewedDraftTextPackageCount: 0,
    approvedDraftTextPackageCount: 0,
    rejectedDraftTextPackageCount: 0,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      intake.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      intake.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest:
      intake.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest:
      intake.sourceApprovalPacketReviewDigest,
    criteria,
    controls,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countCriteria(
  criteria: readonly ReviewCriterion[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightCriterionKind,
): number {
  return criteria.filter((criterion) => criterion.kind === kind).length;
}

function countControls(
  controls: readonly ReviewControl[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightControlKind,
): number {
  return controls.filter((control) => control.kind === kind).length;
}
