import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuards,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";

type AcceptancePrecheck =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck;
type IntakeSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake(
  precheck: AcceptancePrecheck,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake {
  const slots =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlots(
      precheck,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuards(
      slots,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates(
      precheck,
      slots,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeBlockedReasons(
      gates,
    );
  const readyForManualComparedPackageEvidenceIntakeContract = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.slotMode,
      slot.manualEvidenceField,
      slot.sourceAcceptanceCheckpointCount,
      slot.sourceAcceptanceGuardCount,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceSlotCode,
      guard.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion: "Node v1331",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckVersion,
    artifactDraftTextPackageComparedPackageEvidenceIntakeState:
      readyForManualComparedPackageEvidenceIntakeContract
        ? "ready-for-manual-compared-package-evidence-intake-contract"
        : "blocked",
    readyForManualComparedPackageEvidenceIntakeContract,
    readyForRealComparedPackageEvidenceIntake: readyForManualComparedPackageEvidenceIntakeContract,
    readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck:
      precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck:
      precheck.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheck,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    slotCount: slots.length,
    guardCount: guards.length,
    sourceAcceptanceCheckpointCount: precheck.checkpointCount,
    sourceAcceptanceGuardCount: precheck.guardCount,
    readySlotCount: slots.filter((slot) => slot.readyForManualComparedPackageEvidenceIntakeSlot).length,
    readyGuardCount: guards.filter((guard) => guard.readyForManualComparedPackageEvidenceIntakeGuard).length,
    sourcePrecheckEvidenceSlotCount: countSlots(slots, "source-acceptance-precheck-evidence-slot"),
    manualSubmissionReferenceEvidenceSlotCount: countSlots(slots, "manual-submission-reference-evidence-slot"),
    offlineComparisonResultEvidenceSlotCount: countSlots(slots, "offline-comparison-result-evidence-slot"),
    identityBindingEvidenceSlotCount: countSlots(slots, "identity-binding-evidence-slot"),
    digestMatchSummaryEvidenceSlotCount: countSlots(slots, "digest-match-summary-evidence-slot"),
    signatureEnvelopeObservationEvidenceSlotCount:
      countSlots(slots, "detached-signature-envelope-observation-evidence-slot"),
    sourceEvidenceHandleEvidenceSlotCount: countSlots(slots, "source-evidence-handle-evidence-slot"),
    policyExecutionLockEvidenceSlotCount: countSlots(slots, "policy-execution-lock-evidence-slot"),
    approvalGrantSeparationEvidenceSlotCount: countSlots(slots, "approval-grant-separation-evidence-slot"),
    archiveCloseoutEvidenceSlotCount: countSlots(slots, "archive-closeout-evidence-slot"),
    expectedRealComparedPackageEvidenceSlotCount: slots.length,
    realComparedPackageEvidenceCount: 0,
    manualComparedPackageEvidenceMaterializedCount: 0,
    syntheticComparedPackageEvidenceCount: 0,
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
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest,
    slots,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
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
  slots: readonly IntakeSlot[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlotKind,
): number {
  return slots.filter((slot) => slot.kind === kind).length;
}
