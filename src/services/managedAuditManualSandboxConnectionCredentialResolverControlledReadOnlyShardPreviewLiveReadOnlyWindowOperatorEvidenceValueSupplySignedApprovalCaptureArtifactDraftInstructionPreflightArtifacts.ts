import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuards,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight(
  readiness:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight {
  const slots =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlots(
      readiness,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuards(
      slots,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGates(
      readiness,
      slots,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftInstructionPreflight = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftInstructionPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
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
      slot.sourceAuthoringRequirementCode,
      slot.sourceAuthoringBlockerCode,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceInstructionSlotCode,
      guard.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftInstructionPreflightVersion: "Node v1211",
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    artifactDraftInstructionPreflightState: readyForSignedApprovalArtifactDraftInstructionPreflight
      ? "ready-for-signed-approval-artifact-draft-instruction-preflight"
      : "blocked",
    readyForSignedApprovalArtifactDraftInstructionPreflight,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      readyForSignedApprovalArtifactDraftInstructionPreflight,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      readiness.readyForHumanSignedApprovalDraftArtifactAuthoring,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    instructionSlotCount: slots.length,
    instructionGuardCount: guards.length,
    identityInstructionSlotCount: countSlots(slots, "identity-instruction-slot"),
    digestBindingInstructionSlotCount: countSlots(slots, "digest-binding-instruction-slot"),
    signatureEnvelopeInstructionSlotCount: countSlots(slots, "signature-envelope-instruction-slot"),
    sourceEvidenceInstructionSlotCount: countSlots(slots, "source-evidence-instruction-slot"),
    valueBindingInstructionSlotCount: countSlots(slots, "value-binding-instruction-slot"),
    policyInstructionSlotCount: countSlots(slots, "policy-instruction-slot"),
    executionLockInstructionSlotCount: countSlots(slots, "execution-lock-instruction-slot"),
    archiveCloseoutInstructionSlotCount: countSlots(slots, "archive-closeout-instruction-slot"),
    digestModeInstructionSlotCount: slots.filter((slot) => slot.slotMode === "digest-instruction-pin").length,
    readyInstructionSlotCount:
      slots.filter((slot) => slot.readyForHumanSignedApprovalDraftInstructionSlot).length,
    readyInstructionGuardCount:
      guards.filter((guard) => guard.readyForHumanSignedApprovalDraftInstructionGuard).length,
    digestBindingInstructionGuardCount: countGuards(guards, "digest-binding-instruction-guard"),
    signatureEnvelopeInstructionGuardCount: countGuards(guards, "signature-envelope-instruction-guard"),
    policyInstructionGuardCount: countGuards(guards, "policy-instruction-guard"),
    executionLockInstructionGuardCount: countGuards(guards, "execution-lock-instruction-guard"),
    archiveCloseoutInstructionGuardCount: countGuards(guards, "archive-closeout-instruction-guard"),
    draftInstructionMaterializedCount: 0,
    draftArtifactCreated: false,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      readiness.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest:
      readiness.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest:
      readiness.sourceApprovalPacketReviewDigest,
    slots,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
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
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlot[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
): number {
  return slots.filter((slot) => slot.kind === kind).length;
}

function countGuards(
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuard[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind,
): number {
  return guards.filter((guard) => guard.kind === kind).length;
}
