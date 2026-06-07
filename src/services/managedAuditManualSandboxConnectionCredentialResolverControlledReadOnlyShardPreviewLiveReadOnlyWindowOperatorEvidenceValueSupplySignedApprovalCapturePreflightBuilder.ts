import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_ATTESTATIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_INPUTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputs(
  template: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput[] {
  const templateFieldsByCode = new Map(template.fields.map((field) => [field.code, field]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_INPUTS
    .map((inputTemplate, index) => {
      const sourceField = templateFieldsByCode.get(inputTemplate.sourceTemplateFieldCode);
      const sourceTemplateFieldReady =
        template.readyForSignedApprovalTemplatePreflight
        && (sourceField?.readyForSignedApprovalTemplateField ?? false);
      const sourceTemplateFieldRequired = sourceField?.required ?? false;
      const sourceTemplateCaptureBlocked = !(sourceField?.readyForSignedApprovalCapture ?? true);
      const requiredTemplateFieldPresent = sourceField?.fieldName === inputTemplate.requiredTemplateFieldName;
      const readyForSignedApprovalCapturePreflightInput =
        sourceTemplateFieldReady
        && sourceTemplateFieldRequired
        && sourceTemplateCaptureBlocked
        && requiredTemplateFieldPresent;

      return {
        order: index + 1,
        nodeVersion: inputTemplate.nodeVersion,
        code: inputTemplate.code,
        inputName: inputTemplate.inputName,
        kind: inputTemplate.kind,
        valueMode: inputTemplate.valueMode,
        sourceTemplateFieldCode: inputTemplate.sourceTemplateFieldCode,
        sourceTemplateFieldReady,
        sourceTemplateFieldRequired,
        sourceTemplateCaptureBlocked,
        requiredTemplateFieldName: inputTemplate.requiredTemplateFieldName,
        requiredTemplateFieldPresent,
        captureBlockerCode: inputTemplate.captureBlockerCode,
        inputPurpose: inputTemplate.inputPurpose,
        requiredForCapturePreflight: true,
        captureValueProvided: false,
        capturedNow: false,
        rawSignatureMaterialPresent: false,
        approvalGrantEmitted: false,
        readyForSignedApprovalCapturePreflightInput,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestations(
  inputs:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation[] {
  const inputsByCode = new Map(inputs.map((input) => [input.code, input]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_ATTESTATIONS
    .map((attestationTemplate, index) => {
      const sourceInput = inputsByCode.get(attestationTemplate.sourceCaptureInputCode);
      const sourceCaptureInputReady = sourceInput?.readyForSignedApprovalCapturePreflightInput ?? false;
      const rejectsMissingInput =
        sourceInput?.captureBlockerCode.length
          ? attestationTemplate.rejectionCode.includes("MISSING")
            || attestationTemplate.rejectionCode.includes("REJECT")
            || attestationTemplate.rejectionCode.includes("PRESENT")
            || attestationTemplate.rejectionCode.includes("ENABLED")
            || attestationTemplate.rejectionCode.includes("NONZERO")
            || attestationTemplate.rejectionCode.includes("EMITTED")
          : false;
      const readyForSignedApprovalCapturePreflightAttestation =
        sourceCaptureInputReady
        && rejectsMissingInput
        && attestationTemplate.rejectionCode.length > 0
        && attestationTemplate.attestationText.length > 0;

      return {
        order: index + 1,
        nodeVersion: attestationTemplate.nodeVersion,
        code: attestationTemplate.code,
        kind: attestationTemplate.kind,
        sourceCaptureInputCode: attestationTemplate.sourceCaptureInputCode,
        sourceCaptureInputReady,
        rejectionCode: attestationTemplate.rejectionCode,
        attestationText: attestationTemplate.attestationText,
        rejectsMissingInput,
        blocksUnsignedCapture: true,
        blocksAutoCapture: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForSignedApprovalCapturePreflightAttestation,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
