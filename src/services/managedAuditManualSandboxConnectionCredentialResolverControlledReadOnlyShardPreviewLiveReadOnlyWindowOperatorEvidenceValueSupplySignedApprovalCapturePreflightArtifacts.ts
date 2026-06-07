import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestations,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputs,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight(
  template: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight {
  const inputs =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputs(
      template,
    );
  const attestations =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestations(
      inputs,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightGates(
      template,
      inputs,
      attestations,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalCapturePreflight = blockedReasonCodes.length === 0;
  const signedApprovalCapturePreflightDigest = sha256StableJson({
    signedApprovalCapturePreflightVersion: "Node v1061",
    sourceSignedApprovalTemplateVersion: template.signedApprovalTemplateVersion,
    sourceSignedApprovalTemplateDigest: template.signedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: template.sourceApprovalPacketReviewDigest,
    inputs: inputs.map((input) => [
      input.order,
      input.nodeVersion,
      input.code,
      input.inputName,
      input.kind,
      input.valueMode,
      input.sourceTemplateFieldCode,
      input.captureBlockerCode,
    ]),
    attestations: attestations.map((attestation) => [
      attestation.order,
      attestation.nodeVersion,
      attestation.code,
      attestation.kind,
      attestation.sourceCaptureInputCode,
      attestation.rejectionCode,
    ]),
    gates,
  });

  return {
    signedApprovalCapturePreflightVersion: "Node v1061",
    sourceSignedApprovalTemplateVersion: template.signedApprovalTemplateVersion,
    preflightState: readyForSignedApprovalCapturePreflight
      ? "ready-for-signed-approval-capture-preflight"
      : "blocked",
    readyForSignedApprovalCapturePreflight,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    captureInputCount: inputs.length,
    captureAttestationCount: attestations.length,
    identityInputCount: countInputs(inputs, "identity-input"),
    timeInputCount: countInputs(inputs, "time-input"),
    digestBindingInputCount: countInputs(inputs, "digest-binding-input"),
    captureChannelInputCount: countInputs(inputs, "capture-channel-input"),
    signaturePolicyInputCount: countInputs(inputs, "signature-policy-input"),
    operatorStatementInputCount: countInputs(inputs, "operator-statement-input"),
    sourceEvidenceInputCount: countInputs(inputs, "source-evidence-input"),
    valueBindingInputCount: countInputs(inputs, "value-binding-input"),
    policyInputCount: countInputs(inputs, "policy-input"),
    executionLockInputCount: countInputs(inputs, "execution-lock-input"),
    closeoutInputCount: countInputs(inputs, "closeout-input"),
    requiredInputCount: inputs.filter((input) => input.requiredForCapturePreflight).length,
    readyInputCount: inputs.filter((input) => input.readyForSignedApprovalCapturePreflightInput).length,
    readyAttestationCount:
      attestations.filter((attestation) => attestation.readyForSignedApprovalCapturePreflightAttestation).length,
    missingInputBlockerCount: inputs.filter((input) => input.captureBlockerCode.length > 0).length,
    digestBindingAttestationCount: countAttestations(attestations, "digest-binding-attestation"),
    policyAttestationCount: countAttestations(attestations, "policy-attestation"),
    noExecutionAttestationCount: countAttestations(attestations, "no-execution-attestation"),
    captureValueProvidedCount: 0,
    rawSignatureMaterialCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalTemplateDigest: template.signedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: template.sourceApprovalPacketReviewDigest,
    inputs,
    attestations,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCapturePreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countInputs(
  inputs:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInput[],
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightInputKind,
): number {
  return inputs.filter((input) => input.kind === kind).length;
}

function countAttestations(
  attestations:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestation[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightAttestationKind,
): number {
  return attestations.filter((attestation) => attestation.kind === kind).length;
}
