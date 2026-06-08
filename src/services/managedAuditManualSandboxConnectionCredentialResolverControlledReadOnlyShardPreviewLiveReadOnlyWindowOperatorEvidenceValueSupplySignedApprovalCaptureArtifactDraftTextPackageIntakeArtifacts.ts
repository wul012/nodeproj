import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFields,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuards,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake(
  instructionPreflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake {
  const fields =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFields(
      instructionPreflight,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuards(
      fields,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates(
      instructionPreflight,
      fields,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftTextPackageIntake = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageIntakeDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      instructionPreflight.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      instructionPreflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      instructionPreflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: instructionPreflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: instructionPreflight.sourceApprovalPacketReviewDigest,
    fields: fields.map((field) => [
      field.order,
      field.nodeVersion,
      field.code,
      field.kind,
      field.fieldMode,
      field.sourceInstructionSlotCode,
      field.sourceInstructionGuardCode,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceIntakeFieldCode,
      guard.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      instructionPreflight.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    artifactDraftTextPackageIntakeState: readyForSignedApprovalArtifactDraftTextPackageIntake
      ? "ready-for-signed-approval-artifact-draft-text-package-intake"
      : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageIntake:
      readyForSignedApprovalArtifactDraftTextPackageIntake,
    readyForHumanSignedApprovalDraftTextPackageSubmission:
      readyForSignedApprovalArtifactDraftTextPackageIntake,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      instructionPreflight.readyForHumanSignedApprovalDraftInstructionAuthoring,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    intakeFieldCount: fields.length,
    intakeGuardCount: guards.length,
    identityIntakeFieldCount: countFields(fields, "identity-intake-field"),
    digestBindingIntakeFieldCount: countFields(fields, "digest-binding-intake-field"),
    signatureEnvelopeIntakeFieldCount: countFields(fields, "signature-envelope-intake-field"),
    sourceEvidenceIntakeFieldCount: countFields(fields, "source-evidence-intake-field"),
    valueBindingIntakeFieldCount: countFields(fields, "value-binding-intake-field"),
    policyIntakeFieldCount: countFields(fields, "policy-intake-field"),
    executionLockIntakeFieldCount: countFields(fields, "execution-lock-intake-field"),
    archiveCloseoutIntakeFieldCount: countFields(fields, "archive-closeout-intake-field"),
    digestModeIntakeFieldCount: fields.filter((field) => field.fieldMode === "digest-intake-pin").length,
    readyIntakeFieldCount:
      fields.filter((field) => field.readyForHumanSignedApprovalDraftTextPackageIntakeField).length,
    readyIntakeGuardCount:
      guards.filter((guard) => guard.readyForHumanSignedApprovalDraftTextPackageIntakeGuard).length,
    digestBindingIntakeGuardCount: countGuards(guards, "digest-binding-intake-guard"),
    signatureEnvelopeIntakeGuardCount: countGuards(guards, "signature-envelope-intake-guard"),
    policyIntakeGuardCount: countGuards(guards, "policy-intake-guard"),
    executionLockIntakeGuardCount: countGuards(guards, "execution-lock-intake-guard"),
    archiveCloseoutIntakeGuardCount: countGuards(guards, "archive-closeout-intake-guard"),
    expectedDraftTextPackageFieldCount: fields.length,
    actualDraftTextPackageFieldCount: 0,
    acceptedDraftTextPackageCount: 0,
    draftInstructionMaterializedCount: 0,
    draftArtifactCreated: false,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      instructionPreflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      instructionPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      instructionPreflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest:
      instructionPreflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest:
      instructionPreflight.sourceApprovalPacketReviewDigest,
    fields,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageIntakeDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countFields(
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
): number {
  return fields.filter((field) => field.kind === kind).length;
}

function countGuards(
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind,
): number {
  return guards.filter((guard) => guard.kind === kind).length;
}
