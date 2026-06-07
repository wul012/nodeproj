import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_FRAGMENTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SEALS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragments(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment[] {
  const inputsByCode = new Map(preflight.inputs.map((input) => [input.code, input]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_FRAGMENTS
    .map((fragmentTemplate, index) => {
      const sourceInput = inputsByCode.get(fragmentTemplate.sourceCaptureInputCode);
      const sourceCaptureInputReady =
        preflight.readyForSignedApprovalCapturePreflight
        && (sourceInput?.readyForSignedApprovalCapturePreflightInput ?? false);
      const sourceCaptureInputRequired = sourceInput?.requiredForCapturePreflight ?? false;
      const sourceCaptureStillBlocked = !(sourceInput?.readyForSignedApprovalCapture ?? true);
      const requiredCaptureInputPresent = sourceInput?.inputName === fragmentTemplate.requiredCaptureInputName;
      const readyForSignedApprovalCaptureArtifactPreflightFragment =
        sourceCaptureInputReady
        && sourceCaptureInputRequired
        && sourceCaptureStillBlocked
        && requiredCaptureInputPresent;

      return {
        order: index + 1,
        nodeVersion: fragmentTemplate.nodeVersion,
        code: fragmentTemplate.code,
        fragmentName: fragmentTemplate.fragmentName,
        kind: fragmentTemplate.kind,
        valueMode: fragmentTemplate.valueMode,
        sourceCaptureInputCode: fragmentTemplate.sourceCaptureInputCode,
        sourceCaptureInputReady,
        sourceCaptureInputRequired,
        sourceCaptureStillBlocked,
        requiredCaptureInputName: fragmentTemplate.requiredCaptureInputName,
        requiredCaptureInputPresent,
        artifactBlockerCode: fragmentTemplate.artifactBlockerCode,
        fragmentPurpose: fragmentTemplate.fragmentPurpose,
        requiredForArtifactPreflight: true,
        artifactMaterialized: false,
        rawSignatureMaterialPresent: false,
        approvalGrantEmitted: false,
        readyForSignedApprovalCaptureArtifactPreflightFragment,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeals(
  fragments:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal[] {
  const fragmentsByCode = new Map(fragments.map((fragment) => [fragment.code, fragment]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_SEALS
    .map((sealTemplate, index) => {
      const sourceFragment = fragmentsByCode.get(sealTemplate.sourceArtifactFragmentCode);
      const sourceArtifactFragmentReady =
        sourceFragment?.readyForSignedApprovalCaptureArtifactPreflightFragment ?? false;
      const rejectsMissingFragment =
        sourceFragment?.artifactBlockerCode.length
          ? sealTemplate.rejectionCode.includes("MISSING")
            || sealTemplate.rejectionCode.includes("REJECT")
            || sealTemplate.rejectionCode.includes("PRESENT")
            || sealTemplate.rejectionCode.includes("ENABLED")
            || sealTemplate.rejectionCode.includes("NONZERO")
            || sealTemplate.rejectionCode.includes("EMITTED")
          : false;
      const readyForSignedApprovalCaptureArtifactPreflightSeal =
        sourceArtifactFragmentReady
        && rejectsMissingFragment
        && sealTemplate.rejectionCode.length > 0
        && sealTemplate.sealText.length > 0;

      return {
        order: index + 1,
        nodeVersion: sealTemplate.nodeVersion,
        code: sealTemplate.code,
        kind: sealTemplate.kind,
        sourceArtifactFragmentCode: sealTemplate.sourceArtifactFragmentCode,
        sourceArtifactFragmentReady,
        rejectionCode: sealTemplate.rejectionCode,
        sealText: sealTemplate.sealText,
        rejectsMissingFragment,
        blocksUnsignedArtifact: true,
        blocksAutoMaterialization: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForSignedApprovalCaptureArtifactPreflightSeal,
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
