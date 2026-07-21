import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates(
  instructionPreflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeField[],
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGuard[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates {
  const digestFields = fields.filter((field) => field.fieldMode === "digest-intake-pin");

  return {
    sourceInstructionPreflightReady:
      instructionPreflight.readyForSignedApprovalArtifactDraftInstructionPreflight,
    intakeFieldCountComplete:
      fields.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS.length,
    intakeGuardCountComplete:
      guards.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS.length,
    fieldVersionsSequential: fields.every((field, index) =>
      field.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS[index]),
    guardVersionsSequential: guards.every((guard, index) =>
      guard.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS[index]),
    sourceInstructionSlotsReady: fields.every((field) => field.sourceInstructionSlotReady),
    sourceInstructionGuardsReady: fields.every((field) => field.sourceInstructionGuardReady),
    allIntakeFieldsReady:
      fields.every((field) => field.readyForHumanSignedApprovalDraftTextPackageIntakeField),
    allIntakeGuardsReady:
      guards.every((guard) => guard.readyForHumanSignedApprovalDraftTextPackageIntakeGuard),
    allExpectedShapesDeclared: fields.every((field) => field.expectedShape.length > 0),
    allIntakePurposesDeclared: fields.every((field) => field.intakePurpose.length > 0),
    allGuardTextsDeclared: guards.every((guard) => guard.guardText.length > 0),
    allSourceInstructionSlotsReadOnly: fields.every((field) => field.sourceInstructionSlotReadOnly),
    allSourceInstructionGuardsReadOnly: fields.every((field) => field.sourceInstructionGuardReadOnly),
    allFieldsReadOnly: fields.every((field) => field.readOnly),
    allGuardsReadOnly: guards.every((guard) => guard.readOnly),
    allGuardsRejectMissingIntakeFields: guards.every((guard) => guard.rejectsMissingIntakeField),
    allGuardsBlockDraftTextPackageAcceptance:
      guards.every((guard) => guard.blocksDraftTextPackageAcceptance),
    allGuardsBlockSignedDraftText: guards.every((guard) => guard.blocksSignedDraftText),
    allGuardsBlockSignaturePayload: guards.every((guard) => guard.blocksSignaturePayload),
    allGuardsBlockApprovalGrant: guards.every((guard) => guard.blocksApprovalGrant),
    allGuardsBlockRuntimePayload: guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites: guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation: guards.every((guard) => guard.blocksSiblingMutation),
    sourceInstructionPreflightDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest),
    sourceAuthoringReadinessDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest),
    sourceReviewPackageDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest),
    sourceDraftReadinessDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest),
    sourceDraftPreflightDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest),
    sourceArtifactPreflightDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent:
      DIGEST_PATTERN.test(instructionPreflight.sourceApprovalPacketReviewDigest),
    digestIntakeFieldsReady:
      digestFields.length === 5
      && digestFields.every((field) => field.readyForHumanSignedApprovalDraftTextPackageIntakeField),
    sourceStillNoInstructionMaterialization:
      instructionPreflight.draftInstructionMaterializedCount === 0,
    sourceStillNoDraftArtifact: !instructionPreflight.draftArtifactCreated,
    sourceStillNoSignedDraftText:
      instructionPreflight.signedDraftTextCount === 0 && !instructionPreflight.containsSecretValue,
    sourceStillNoSignaturePayload: instructionPreflight.draftSignaturePayloadCount === 0,
    sourceStillNoApprovalGrant: !instructionPreflight.approvalGrantPresent,
    intakeReadyButNoPackageAccepted:
      instructionPreflight.readyForSignedApprovalArtifactDraftInstructionPreflight
      && fields.every((field) =>
        field.readyForHumanSignedApprovalDraftTextPackageIntakeField
        && !field.draftTextPackageFieldMaterialized
        && !field.draftTextPackageAccepted
        && !field.signedDraftTextPresent
        && !field.draftSignaturePayloadPresent)
      && guards.every((guard) => guard.readyForHumanSignedApprovalDraftTextPackageIntakeGuard),
    signedApprovalDraftStillDisabled:
      !instructionPreflight.readyForSignedApprovalArtifactDraft
      && fields.every((field) => !field.readyForSignedApprovalArtifactDraft)
      && guards.every((guard) => !guard.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !instructionPreflight.readyForSignedApprovalCapture
      && fields.every((field) => !field.readyForSignedApprovalCapture)
      && guards.every((guard) => !guard.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !instructionPreflight.readyForOperatorValueSupply
      && fields.every((field) => !field.readyForOperatorValueSupply)
      && guards.every((guard) => !guard.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !instructionPreflight.readyForEvidenceImport
      && fields.every((field) => !field.readyForEvidenceImport)
      && guards.every((guard) => !guard.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !instructionPreflight.readyForRuntimePayload
      && fields.every((field) => !field.readyForRuntimePayload)
      && guards.every((guard) => !guard.readyForRuntimePayload),
    liveExecutionStillBlocked: !instructionPreflight.readyForLiveExecution,
    productionExecutionStillBlocked: !instructionPreflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !instructionPreflight.writeRoutingAllowed
      && !instructionPreflight.startsServices
      && !instructionPreflight.mutatesSiblingState
      && fields.every((field) => !field.writesAllowed && !field.startsServices && !field.mutatesSiblingState)
      && guards.every((guard) => !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    requiresManualDraftTextPackageSubmission: true,
    requiresDetachedSignatureOutOfBand: true,
    requiresDigestRecheckBeforeAcceptance: true,
    requiresSeparateApprovalGrantReview: true,
    nextStepRequiresOfflineArtifactReview: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeBlockedReasons(
  gates:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceInstructionPreflightReady, "SOURCE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_NOT_READY"],
    [gates.intakeFieldCountComplete, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELD_COUNT_INCOMPLETE"],
    [gates.intakeGuardCountComplete, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARD_COUNT_INCOMPLETE"],
    [gates.fieldVersionsSequential, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.guardVersionsSequential, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceInstructionSlotsReady, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_SLOTS_NOT_READY"],
    [gates.sourceInstructionGuardsReady, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_GUARDS_NOT_READY"],
    [gates.allIntakeFieldsReady, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS_NOT_READY"],
    [gates.allIntakeGuardsReady, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARDS_NOT_READY"],
    [gates.allExpectedShapesDeclared, "ARTIFACT_DRAFT_TEXT_PACKAGE_EXPECTED_SHAPES_MISSING"],
    [gates.allIntakePurposesDeclared, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_PURPOSES_MISSING"],
    [gates.allGuardTextsDeclared, "ARTIFACT_DRAFT_TEXT_PACKAGE_GUARD_TEXTS_MISSING"],
    [gates.allSourceInstructionSlotsReadOnly, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SLOTS_NOT_READ_ONLY"],
    [gates.allSourceInstructionGuardsReadOnly, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_GUARDS_NOT_READ_ONLY"],
    [gates.allFieldsReadOnly, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS_NOT_READ_ONLY"],
    [gates.allGuardsReadOnly, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_GUARDS_NOT_READ_ONLY"],
    [gates.allGuardsRejectMissingIntakeFields, "ARTIFACT_DRAFT_TEXT_PACKAGE_MISSING_FIELD_NOT_REJECTED"],
    [gates.allGuardsBlockDraftTextPackageAcceptance, "ARTIFACT_DRAFT_TEXT_PACKAGE_ACCEPTANCE_NOT_BLOCKED"],
    [gates.allGuardsBlockSignedDraftText, "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_TEXT_NOT_BLOCKED"],
    [gates.allGuardsBlockSignaturePayload, "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNATURE_PAYLOAD_NOT_BLOCKED"],
    [gates.allGuardsBlockApprovalGrant, "ARTIFACT_DRAFT_TEXT_PACKAGE_APPROVAL_GRANT_NOT_BLOCKED"],
    [gates.allGuardsBlockRuntimePayload, "ARTIFACT_DRAFT_TEXT_PACKAGE_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allGuardsBlockWrites, "ARTIFACT_DRAFT_TEXT_PACKAGE_WRITES_NOT_BLOCKED"],
    [gates.allGuardsBlockSiblingMutation, "ARTIFACT_DRAFT_TEXT_PACKAGE_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceInstructionPreflightDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTION_DIGEST_MISSING"],
    [gates.sourceAuthoringReadinessDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_AUTHORING_DIGEST_MISSING"],
    [gates.sourceReviewPackageDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_PACKAGE_DIGEST_MISSING"],
    [gates.sourceDraftReadinessDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_READINESS_DIGEST_MISSING"],
    [gates.sourceDraftPreflightDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_DRAFT_PREFLIGHT_DIGEST_MISSING"],
    [gates.sourceArtifactPreflightDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_ARTIFACT_DIGEST_MISSING"],
    [gates.sourceCapturePreflightDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_CAPTURE_DIGEST_MISSING"],
    [gates.sourceTemplateDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.digestIntakeFieldsReady, "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_FIELDS_NOT_READY"],
    [gates.sourceStillNoInstructionMaterialization, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_INSTRUCTIONS_MATERIALIZED"],
    [gates.sourceStillNoDraftArtifact, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_DRAFT_ARTIFACT_PRESENT"],
    [gates.sourceStillNoSignedDraftText, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNED_TEXT_PRESENT"],
    [gates.sourceStillNoSignaturePayload, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_SIGNATURE_PAYLOAD_PRESENT"],
    [gates.sourceStillNoApprovalGrant, "ARTIFACT_DRAFT_TEXT_PACKAGE_SOURCE_APPROVAL_GRANT_PRESENT"],
    [gates.intakeReadyButNoPackageAccepted, "ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_NOT_READY_OR_ACCEPTED"],
    [gates.signedApprovalDraftStillDisabled, "ARTIFACT_DRAFT_TEXT_PACKAGE_SIGNED_DRAFT_ENABLED"],
    [gates.signedApprovalCaptureStillDisabled, "ARTIFACT_DRAFT_TEXT_PACKAGE_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "ARTIFACT_DRAFT_TEXT_PACKAGE_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.evidenceImportStillBlocked, "ARTIFACT_DRAFT_TEXT_PACKAGE_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "ARTIFACT_DRAFT_TEXT_PACKAGE_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "ARTIFACT_DRAFT_TEXT_PACKAGE_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "ARTIFACT_DRAFT_TEXT_PACKAGE_PRODUCTION_EXECUTION_ENABLED"],
    [gates.noSideEffectsAllowed, "ARTIFACT_DRAFT_TEXT_PACKAGE_SIDE_EFFECTS_ALLOWED"],
    [gates.requiresManualDraftTextPackageSubmission, "ARTIFACT_DRAFT_TEXT_PACKAGE_MANUAL_SUBMISSION_NOT_REQUIRED"],
    [gates.requiresDetachedSignatureOutOfBand, "ARTIFACT_DRAFT_TEXT_PACKAGE_DETACHED_SIGNATURE_NOT_OUT_OF_BAND"],
    [gates.requiresDigestRecheckBeforeAcceptance, "ARTIFACT_DRAFT_TEXT_PACKAGE_DIGEST_RECHECK_NOT_REQUIRED"],
    [gates.requiresSeparateApprovalGrantReview, "ARTIFACT_DRAFT_TEXT_PACKAGE_SEPARATE_APPROVAL_REVIEW_NOT_REQUIRED"],
    [gates.nextStepRequiresOfflineArtifactReview, "ARTIFACT_DRAFT_TEXT_PACKAGE_NEXT_STEP_NOT_OFFLINE_REVIEW"],
  ]);
}
