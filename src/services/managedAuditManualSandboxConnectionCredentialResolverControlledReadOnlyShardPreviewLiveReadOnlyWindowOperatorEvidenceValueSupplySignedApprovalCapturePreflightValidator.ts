import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates(
  template: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
  inputs:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput[],
  attestations:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates {
  return {
    sourceSignedApprovalTemplateReady: template.readyForSignedApprovalTemplatePreflight,
    captureInputCountComplete:
      inputs.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_VERSIONS.length,
    captureAttestationCountComplete:
      attestations.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_VERSIONS.length,
    inputVersionsSequential: inputs.every((input, index) =>
      input.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_VERSIONS[index]),
    attestationVersionsSequential: attestations.every((attestation, index) =>
      attestation.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_VERSIONS[index]),
    sourceTemplateFieldsReady: inputs.every((input) => input.sourceTemplateFieldReady),
    allInputsReady: inputs.every((input) => input.readyForSignedApprovalCapturePreflightInput),
    allAttestationsReady:
      attestations.every((attestation) => attestation.readyForSignedApprovalCapturePreflightAttestation),
    allInputsRequired: inputs.every((input) => input.requiredForCapturePreflight),
    allInputPurposesDeclared: inputs.every((input) => input.inputPurpose.length > 0),
    allCaptureBlockersDeclared: inputs.every((input) => input.captureBlockerCode.length > 0),
    allRequiredTemplateFieldsCovered: inputs.every((input) => input.requiredTemplateFieldPresent),
    allAttestationsRejectMissingInputs: attestations.every((attestation) => attestation.rejectsMissingInput),
    allAttestationsBlockUnsignedCapture: attestations.every((attestation) => attestation.blocksUnsignedCapture),
    allAttestationsBlockAutoCapture: attestations.every((attestation) => attestation.blocksAutoCapture),
    allAttestationsBlockRuntimePayload: attestations.every((attestation) => attestation.blocksRuntimePayload),
    allAttestationsBlockWrites: attestations.every((attestation) => attestation.blocksWrites),
    allAttestationsBlockSiblingMutation: attestations.every((attestation) => attestation.blocksSiblingMutation),
    sourceTemplateDigestPresent: /^[a-f0-9]{64}$/.test(template.signedApprovalTemplateDigest),
    sourceReviewDigestPresent: /^[a-f0-9]{64}$/.test(template.sourceApprovalPacketReviewDigest),
    sourceTemplateStillPreflightOnly:
      template.readyForSignedApprovalTemplatePreflight
      && template.templateState === "ready-for-signed-approval-template-preflight",
    sourceTemplateStillBlocksCapture: !template.readyForSignedApprovalCapture,
    operatorValueSupplyStillDisabled:
      !template.readyForOperatorValueSupply
      && inputs.every((input) => !input.readyForOperatorValueSupply)
      && attestations.every((attestation) => !attestation.readyForOperatorValueSupply),
    noCaptureValuesProvided: inputs.every((input) => !input.captureValueProvided && !input.capturedNow),
    noRawSignatureMaterial:
      !template.containsSecretValue && inputs.every((input) => !input.rawSignatureMaterialPresent),
    noApprovalGrantEmitted:
      !template.approvalGrantPresent && inputs.every((input) => !input.approvalGrantEmitted),
    noSignedApprovalPresent: !template.signedApprovalPresent,
    evidenceImportStillBlocked:
      !template.readyForEvidenceImport
      && inputs.every((input) => !input.readyForEvidenceImport)
      && attestations.every((attestation) => !attestation.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !template.readyForRuntimePayload
      && inputs.every((input) => !input.readyForRuntimePayload)
      && attestations.every((attestation) => !attestation.readyForRuntimePayload),
    liveExecutionStillBlocked: !template.readyForLiveExecution,
    productionExecutionStillBlocked: !template.readyForProductionExecution,
    allInputsReadOnly: inputs.every((input) => input.readOnly),
    allAttestationsReadOnly: attestations.every((attestation) => attestation.readOnly),
    noSideEffectsAllowed:
      !template.writeRoutingAllowed
      && !template.startsServices
      && !template.mutatesSiblingState
      && inputs.every((input) => !input.writesAllowed && !input.startsServices && !input.mutatesSiblingState)
      && attestations.every((attestation) =>
        !attestation.writesAllowed && !attestation.startsServices && !attestation.mutatesSiblingState),
    nextStepRequiresSignedApprovalCaptureArtifactPreflight: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates,
): string[] {
  return collectBlockedReasons([
    [gates.sourceSignedApprovalTemplateReady, "SOURCE_SIGNED_APPROVAL_TEMPLATE_NOT_READY"],
    [gates.captureInputCountComplete, "CAPTURE_PREFLIGHT_INPUT_COUNT_INCOMPLETE"],
    [gates.captureAttestationCountComplete, "CAPTURE_PREFLIGHT_ATTESTATION_COUNT_INCOMPLETE"],
    [gates.inputVersionsSequential, "CAPTURE_PREFLIGHT_INPUT_VERSIONS_NOT_SEQUENTIAL"],
    [gates.attestationVersionsSequential, "CAPTURE_PREFLIGHT_ATTESTATION_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceTemplateFieldsReady, "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_FIELDS_NOT_READY"],
    [gates.allInputsReady, "CAPTURE_PREFLIGHT_INPUTS_NOT_READY"],
    [gates.allAttestationsReady, "CAPTURE_PREFLIGHT_ATTESTATIONS_NOT_READY"],
    [gates.allInputsRequired, "CAPTURE_PREFLIGHT_INPUTS_NOT_REQUIRED"],
    [gates.allInputPurposesDeclared, "CAPTURE_PREFLIGHT_INPUT_PURPOSES_MISSING"],
    [gates.allCaptureBlockersDeclared, "CAPTURE_PREFLIGHT_BLOCKERS_MISSING"],
    [gates.allRequiredTemplateFieldsCovered, "CAPTURE_PREFLIGHT_TEMPLATE_FIELD_COVERAGE_MISSING"],
    [gates.allAttestationsRejectMissingInputs, "CAPTURE_PREFLIGHT_ATTESTATIONS_DO_NOT_REJECT_MISSING_INPUTS"],
    [gates.allAttestationsBlockUnsignedCapture, "CAPTURE_PREFLIGHT_UNSIGNED_CAPTURE_NOT_BLOCKED"],
    [gates.allAttestationsBlockAutoCapture, "CAPTURE_PREFLIGHT_AUTO_CAPTURE_NOT_BLOCKED"],
    [gates.allAttestationsBlockRuntimePayload, "CAPTURE_PREFLIGHT_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allAttestationsBlockWrites, "CAPTURE_PREFLIGHT_WRITES_NOT_BLOCKED"],
    [gates.allAttestationsBlockSiblingMutation, "CAPTURE_PREFLIGHT_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceTemplateDigestPresent, "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "CAPTURE_PREFLIGHT_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.sourceTemplateStillPreflightOnly, "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_NOT_PREFLIGHT_ONLY"],
    [gates.sourceTemplateStillBlocksCapture, "CAPTURE_PREFLIGHT_SOURCE_TEMPLATE_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "CAPTURE_PREFLIGHT_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.noCaptureValuesProvided, "CAPTURE_PREFLIGHT_VALUES_ALREADY_PROVIDED"],
    [gates.noRawSignatureMaterial, "CAPTURE_PREFLIGHT_RAW_SIGNATURE_MATERIAL_PRESENT"],
    [gates.noApprovalGrantEmitted, "CAPTURE_PREFLIGHT_APPROVAL_GRANT_EMITTED"],
    [gates.noSignedApprovalPresent, "CAPTURE_PREFLIGHT_SIGNED_APPROVAL_PRESENT"],
    [gates.evidenceImportStillBlocked, "CAPTURE_PREFLIGHT_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "CAPTURE_PREFLIGHT_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "CAPTURE_PREFLIGHT_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "CAPTURE_PREFLIGHT_PRODUCTION_EXECUTION_ENABLED"],
    [gates.allInputsReadOnly, "CAPTURE_PREFLIGHT_INPUT_NOT_READ_ONLY"],
    [gates.allAttestationsReadOnly, "CAPTURE_PREFLIGHT_ATTESTATION_NOT_READ_ONLY"],
    [gates.noSideEffectsAllowed, "CAPTURE_PREFLIGHT_SIDE_EFFECTS_ALLOWED"],
    [
      gates.nextStepRequiresSignedApprovalCaptureArtifactPreflight,
      "CAPTURE_PREFLIGHT_NEXT_STEP_NOT_CAPTURE_ARTIFACT_PREFLIGHT",
    ],
  ]);
}
