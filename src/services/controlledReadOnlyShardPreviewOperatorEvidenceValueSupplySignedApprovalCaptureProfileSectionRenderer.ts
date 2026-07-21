import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const CAPTURE_SECTIONS = [
  capturePreflightSection,
  captureArtifactSection,
] as const;

export function renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplySignedApprovalCaptureProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return renderProfileEntrySections(CAPTURE_SECTIONS.map((buildSection) => buildSection(profile)));
}

function capturePreflightSection(profile: ControlledReadOnlyShardPreviewProfile) {
  const capture = profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight;
  return {
    heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Preflight",
    lines: renderEntries({
      signedApprovalCapturePreflightVersion: capture.signedApprovalCapturePreflightVersion,
      sourceSignedApprovalTemplateVersion: capture.sourceSignedApprovalTemplateVersion,
      preflightState: capture.preflightState,
      readyForSignedApprovalCapturePreflight: capture.readyForSignedApprovalCapturePreflight,
      readyForSignedApprovalCapture: capture.readyForSignedApprovalCapture,
      readyForOperatorValueSupply: capture.readyForOperatorValueSupply,
      readyForOperatorValueSubmission: capture.readyForOperatorValueSubmission,
      readyForEvidenceImport: capture.readyForEvidenceImport,
      readyForRuntimePayload: capture.readyForRuntimePayload,
      captureInputCount: capture.captureInputCount,
      captureAttestationCount: capture.captureAttestationCount,
      identityInputCount: capture.identityInputCount,
      digestBindingInputCount: capture.digestBindingInputCount,
      sourceEvidenceInputCount: capture.sourceEvidenceInputCount,
      valueBindingInputCount: capture.valueBindingInputCount,
      executionLockInputCount: capture.executionLockInputCount,
      readyInputCount: capture.readyInputCount,
      readyAttestationCount: capture.readyAttestationCount,
      missingInputBlockerCount: capture.missingInputBlockerCount,
      noExecutionAttestationCount: capture.noExecutionAttestationCount,
      captureValueProvidedCount: capture.captureValueProvidedCount,
      rawSignatureMaterialCount: capture.rawSignatureMaterialCount,
      approvalCaptured: capture.approvalCaptured,
      approvalGrantPresent: capture.approvalGrantPresent,
      signedApprovalPresent: capture.signedApprovalPresent,
      importsRuntimePayload: capture.importsRuntimePayload,
      acceptsSyntheticEvidence: capture.acceptsSyntheticEvidence,
      containsSecretValue: capture.containsSecretValue,
      signedApprovalCapturePreflightDigest: capture.signedApprovalCapturePreflightDigest,
    }),
  };
}

function captureArtifactSection(profile: ControlledReadOnlyShardPreviewProfile) {
  const artifact = profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight;
  return {
    heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Preflight",
    lines: renderEntries({
      signedApprovalCaptureArtifactPreflightVersion: artifact.signedApprovalCaptureArtifactPreflightVersion,
      sourceSignedApprovalCapturePreflightVersion: artifact.sourceSignedApprovalCapturePreflightVersion,
      artifactPreflightState: artifact.artifactPreflightState,
      readyForSignedApprovalCaptureArtifactPreflight: artifact.readyForSignedApprovalCaptureArtifactPreflight,
      readyForSignedApprovalCapture: artifact.readyForSignedApprovalCapture,
      readyForOperatorValueSupply: artifact.readyForOperatorValueSupply,
      readyForOperatorValueSubmission: artifact.readyForOperatorValueSubmission,
      readyForEvidenceImport: artifact.readyForEvidenceImport,
      readyForRuntimePayload: artifact.readyForRuntimePayload,
      artifactFragmentCount: artifact.artifactFragmentCount,
      artifactSealCount: artifact.artifactSealCount,
      identityFragmentCount: artifact.identityFragmentCount,
      digestBindingFragmentCount: artifact.digestBindingFragmentCount,
      signatureEnvelopeFragmentCount: artifact.signatureEnvelopeFragmentCount,
      sourceEvidenceFragmentCount: artifact.sourceEvidenceFragmentCount,
      valueBindingFragmentCount: artifact.valueBindingFragmentCount,
      policyFragmentCount: artifact.policyFragmentCount,
      executionLockFragmentCount: artifact.executionLockFragmentCount,
      closeoutFragmentCount: artifact.closeoutFragmentCount,
      requiredFragmentCount: artifact.requiredFragmentCount,
      readyFragmentCount: artifact.readyFragmentCount,
      readySealCount: artifact.readySealCount,
      artifactBlockerCount: artifact.artifactBlockerCount,
      noExecutionSealCount: artifact.noExecutionSealCount,
      gateCount: artifact.gateCount,
      passedGateCount: artifact.passedGateCount,
      artifactMaterializedCount: artifact.artifactMaterializedCount,
      rawSignatureMaterialCount: artifact.rawSignatureMaterialCount,
      approvalCaptured: artifact.approvalCaptured,
      approvalGrantPresent: artifact.approvalGrantPresent,
      signedApprovalPresent: artifact.signedApprovalPresent,
      sourceSignedApprovalCapturePreflightDigest: artifact.sourceSignedApprovalCapturePreflightDigest,
      sourceSignedApprovalTemplateDigest: artifact.sourceSignedApprovalTemplateDigest,
      sourceApprovalPacketReviewDigest: artifact.sourceApprovalPacketReviewDigest,
      importsRuntimePayload: artifact.importsRuntimePayload,
      acceptsSyntheticEvidence: artifact.acceptsSyntheticEvidence,
      containsSecretValue: artifact.containsSecretValue,
      signedApprovalCaptureArtifactPreflightDigest: artifact.signedApprovalCaptureArtifactPreflightDigest,
    }),
  };
}
