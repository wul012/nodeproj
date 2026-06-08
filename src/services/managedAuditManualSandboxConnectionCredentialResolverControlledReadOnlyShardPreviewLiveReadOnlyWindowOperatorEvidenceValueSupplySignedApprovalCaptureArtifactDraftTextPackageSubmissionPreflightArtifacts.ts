import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControls,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightTypes.js";

type ReviewPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageReviewPreflight;
type SubmissionSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlot;
type ComparisonControl =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControl;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight(
  reviewPreflight: ReviewPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflight {
  const slots =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlots(
      reviewPreflight,
    );
  const controls =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControls(
      slots,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightGates(
      reviewPreflight,
      slots,
      controls,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight =
    blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      reviewPreflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      reviewPreflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      reviewPreflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest:
      reviewPreflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest:
      reviewPreflight.sourceApprovalPacketReviewDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.slotMode,
      slot.sourceReviewCriterionCode,
      slot.sourceReviewControlCode,
    ]),
    controls: controls.map((control) => [
      control.order,
      control.nodeVersion,
      control.code,
      control.kind,
      control.sourceSubmissionSlotCode,
      control.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightVersion: "Node v1286",
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion:
      reviewPreflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightVersion,
    artifactDraftTextPackageSubmissionPreflightState:
      readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight
        ? "ready-for-signed-approval-artifact-draft-text-package-submission-preflight"
        : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    readyForManualSignedApprovalDraftTextPackageSubmission:
      readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    readyForOfflineSignedApprovalDraftTextPackageComparison:
      readyForSignedApprovalArtifactDraftTextPackageSubmissionPreflight,
    readyForOfflineSignedApprovalDraftTextPackageReview:
      reviewPreflight.readyForOfflineSignedApprovalDraftTextPackageReview,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    submissionSlotCount: slots.length,
    comparisonControlCount: controls.length,
    identitySubmissionSlotCount: countSlots(slots, "identity-submission-slot"),
    digestBindingSubmissionSlotCount: countSlots(slots, "digest-binding-submission-slot"),
    signatureEnvelopeSubmissionSlotCount: countSlots(slots, "signature-envelope-submission-slot"),
    sourceEvidenceSubmissionSlotCount: countSlots(slots, "source-evidence-submission-slot"),
    valueBindingSubmissionSlotCount: countSlots(slots, "value-binding-submission-slot"),
    policySubmissionSlotCount: countSlots(slots, "policy-submission-slot"),
    executionLockSubmissionSlotCount: countSlots(slots, "execution-lock-submission-slot"),
    archiveCloseoutSubmissionSlotCount: countSlots(slots, "archive-closeout-submission-slot"),
    digestModeSubmissionSlotCount:
      slots.filter((slot) => slot.slotMode === "digest-comparison-pin").length,
    readySubmissionSlotCount:
      slots.filter((slot) => slot.readyForManualSignedApprovalDraftTextPackageSubmissionSlot).length,
    readyComparisonControlCount:
      controls.filter((control) =>
        control.readyForManualSignedApprovalDraftTextPackageComparisonControl).length,
    digestBindingComparisonControlCount: countControls(controls, "digest-binding-comparison-control"),
    signatureEnvelopeComparisonControlCount: countControls(controls, "signature-envelope-comparison-control"),
    policyComparisonControlCount: countControls(controls, "policy-comparison-control"),
    executionLockComparisonControlCount: countControls(controls, "execution-lock-comparison-control"),
    archiveCloseoutComparisonControlCount: countControls(controls, "archive-closeout-comparison-control"),
    expectedDraftTextPackageSubmissionSlotCount: slots.length,
    actualDraftTextPackageSubmissionCount: 0,
    submittedDraftTextPackageCount: 0,
    comparedDraftTextPackageCount: 0,
    acceptedDraftTextPackageCount: 0,
    rejectedDraftTextPackageCount: 0,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest:
      reviewPreflight.signedApprovalCaptureArtifactDraftTextPackageReviewPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      reviewPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      reviewPreflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest:
      reviewPreflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest:
      reviewPreflight.sourceApprovalPacketReviewDigest,
    slots,
    controls,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countSlots(
  slots: readonly SubmissionSlot[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightSlotKind,
): number {
  return slots.filter((slot) => slot.kind === kind).length;
}

function countControls(
  controls: readonly ComparisonControl[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageSubmissionPreflightComparisonControlKind,
): number {
  return controls.filter((control) => control.kind === kind).length;
}
