import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuards,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadinessTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight {
  const slots =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlots(
      readiness,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuards(
      slots,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGates(
      readiness,
      slots,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftReviewPackagePreflight = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
    sourceSignedApprovalCaptureArtifactDraftReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: readiness.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: readiness.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: readiness.sourceApprovalPacketReviewDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.slotMode,
      slot.sourceReadinessLaneCode,
      slot.sourceReadinessControlCode,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourcePackageSlotCode,
      guard.blockerCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion: "Node v1161",
    sourceSignedApprovalCaptureArtifactDraftReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftReadinessVersion,
    artifactDraftReviewPackagePreflightState: readyForSignedApprovalArtifactDraftReviewPackagePreflight
      ? "ready-for-signed-approval-artifact-draft-review-package-preflight"
      : "blocked",
    readyForSignedApprovalArtifactDraftReviewPackagePreflight,
    readyForManualSignedApprovalDraftReviewPackage: readyForSignedApprovalArtifactDraftReviewPackagePreflight,
    readyForManualSignedApprovalDraftReview: readiness.readyForManualSignedApprovalDraftReview,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    packageSlotCount: slots.length,
    packageGuardCount: guards.length,
    identityReviewPackageSlotCount: countSlots(slots, "identity-review-package-slot"),
    digestBindingReviewPackageSlotCount: countSlots(slots, "digest-binding-review-package-slot"),
    signatureEnvelopeReviewPackageSlotCount: countSlots(slots, "signature-envelope-review-package-slot"),
    sourceEvidenceReviewPackageSlotCount: countSlots(slots, "source-evidence-review-package-slot"),
    valueBindingReviewPackageSlotCount: countSlots(slots, "value-binding-review-package-slot"),
    policyReviewPackageSlotCount: countSlots(slots, "policy-review-package-slot"),
    executionLockReviewPackageSlotCount: countSlots(slots, "execution-lock-review-package-slot"),
    archiveCloseoutReviewPackageSlotCount: countSlots(slots, "archive-closeout-review-package-slot"),
    digestModeReviewPackageSlotCount:
      slots.filter((slot) => slot.slotMode === "digest-review-package-entry").length,
    readyPackageSlotCount:
      slots.filter((slot) => slot.readyForManualSignedApprovalDraftReviewPackageSlot).length,
    readyPackageGuardCount:
      guards.filter((guard) => guard.readyForManualSignedApprovalDraftReviewPackageGuard).length,
    digestBindingReviewPackageGuardCount: countGuards(guards, "digest-binding-review-package-guard"),
    signatureEnvelopeReviewPackageGuardCount: countGuards(guards, "signature-envelope-review-package-guard"),
    policyReviewPackageGuardCount: countGuards(guards, "policy-review-package-guard"),
    executionLockReviewPackageGuardCount: countGuards(guards, "execution-lock-review-package-guard"),
    archiveCloseoutReviewPackageGuardCount: countGuards(guards, "archive-closeout-review-package-guard"),
    packageSlotMaterializedCount: 0,
    packageArtifactCreated: false,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      readiness.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: readiness.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: readiness.sourceApprovalPacketReviewDigest,
    slots,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
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
  slots:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlot[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightSlotKind,
): number {
  return slots.filter((slot) => slot.kind === kind).length;
}

function countGuards(
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuard[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightGuardKind,
): number {
  return guards.filter((guard) => guard.kind === kind).length;
}
