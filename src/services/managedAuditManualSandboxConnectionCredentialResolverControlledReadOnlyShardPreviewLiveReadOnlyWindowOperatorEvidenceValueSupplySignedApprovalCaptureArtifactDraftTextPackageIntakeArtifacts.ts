import { resolveShardArtifactState, type ShardArtifactState } from "./shardArtifactState.js";
import { createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFields, createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuards, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBuilder.js";
import { createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBlockedReasons, createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeValidator.js";
import type { ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import type { ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard, ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind, } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";

type InstructionPreflight = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight;
type IntakeResult = ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake;

interface IntakeContext extends ShardArtifactState {
  source: InstructionPreflight;
  fields: IntakeResult["fields"];
  guards: IntakeResult["guards"];
  gates: IntakeResult["gates"];
  blockedReasons: IntakeResult["blockedReasonCodes"];
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake(
  instructionPreflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntake {
  const fields = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFields(instructionPreflight);
  const guards = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuards(fields);
  const gates = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates(instructionPreflight, fields, guards);
  const blockedReasonCodes = createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBlockedReasons(gates);
  const state = resolveShardArtifactState(blockedReasonCodes, intakeDigestInput(instructionPreflight, fields, guards, gates));
  return intakeResult({
    source: instructionPreflight,
    fields,
    guards,
    gates,
    blockedReasons: blockedReasonCodes,
    ...state,
  });
}

function intakeDigestInput(source: InstructionPreflight, fields: IntakeResult["fields"], guards: IntakeResult["guards"], gates: IntakeResult["gates"]) {
  return {
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion: source.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: source.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest: source.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: source.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: source.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: source.sourceApprovalPacketReviewDigest,
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
  };
}

function intakeResult(context: IntakeContext): IntakeResult {
  const { source, fields, guards, gates, blockedReasons, ready, digest } = context;
  return {
    signedApprovalCaptureArtifactDraftTextPackageIntakeVersion: "Node v1236",
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightVersion: source.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    artifactDraftTextPackageIntakeState: ready
      ? "ready-for-signed-approval-artifact-draft-text-package-intake"
      : "blocked",
    readyForSignedApprovalArtifactDraftTextPackageIntake: ready,
    readyForHumanSignedApprovalDraftTextPackageSubmission: ready,
    readyForHumanSignedApprovalDraftInstructionAuthoring: source.readyForHumanSignedApprovalDraftInstructionAuthoring,
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
    readyIntakeFieldCount: fields.filter((field) => field.readyForHumanSignedApprovalDraftTextPackageIntakeField).length,
    readyIntakeGuardCount: guards.filter((guard) => guard.readyForHumanSignedApprovalDraftTextPackageIntakeGuard).length,
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
    sourceSignedApprovalCaptureArtifactDraftInstructionPreflightDigest: source.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest: source.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest: source.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest: source.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: source.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: source.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: source.sourceApprovalPacketReviewDigest,
    fields,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes: blockedReasons,
    signedApprovalCaptureArtifactDraftTextPackageIntakeDigest: digest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countFields(fields: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[], kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind): number {
  return fields.filter((field) => field.kind === kind).length;
}

function countGuards(guards: readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard[], kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuardKind): number {
  return guards.filter((guard) => guard.kind === kind).length;
}
