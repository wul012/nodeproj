import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragments,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeals,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight {
  const fragments =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragments(
      preflight,
    );
  const seals =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeals(
      fragments,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates(
      preflight,
      fragments,
      seals,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalCaptureArtifactPreflight = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactPreflightVersion: "Node v1086",
    sourceSignedApprovalCapturePreflightVersion: preflight.signedApprovalCapturePreflightVersion,
    sourceSignedApprovalCapturePreflightDigest: preflight.signedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    fragments: fragments.map((fragment) => [
      fragment.order,
      fragment.nodeVersion,
      fragment.code,
      fragment.fragmentName,
      fragment.kind,
      fragment.valueMode,
      fragment.sourceCaptureInputCode,
      fragment.artifactBlockerCode,
    ]),
    seals: seals.map((seal) => [
      seal.order,
      seal.nodeVersion,
      seal.code,
      seal.kind,
      seal.sourceArtifactFragmentCode,
      seal.rejectionCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactPreflightVersion: "Node v1086",
    sourceSignedApprovalCapturePreflightVersion: preflight.signedApprovalCapturePreflightVersion,
    artifactPreflightState: readyForSignedApprovalCaptureArtifactPreflight
      ? "ready-for-signed-approval-capture-artifact-preflight"
      : "blocked",
    readyForSignedApprovalCaptureArtifactPreflight,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    artifactFragmentCount: fragments.length,
    artifactSealCount: seals.length,
    identityFragmentCount: countFragments(fragments, "identity-fragment"),
    digestBindingFragmentCount: countFragments(fragments, "digest-binding-fragment"),
    signatureEnvelopeFragmentCount: countFragments(fragments, "signature-envelope-fragment"),
    sourceEvidenceFragmentCount: countFragments(fragments, "source-evidence-fragment"),
    valueBindingFragmentCount: countFragments(fragments, "value-binding-fragment"),
    policyFragmentCount: countFragments(fragments, "policy-fragment"),
    executionLockFragmentCount: countFragments(fragments, "execution-lock-fragment"),
    closeoutFragmentCount: countFragments(fragments, "closeout-fragment"),
    requiredFragmentCount: fragments.filter((fragment) => fragment.requiredForArtifactPreflight).length,
    readyFragmentCount:
      fragments.filter((fragment) => fragment.readyForSignedApprovalCaptureArtifactPreflightFragment).length,
    readySealCount: seals.filter((seal) => seal.readyForSignedApprovalCaptureArtifactPreflightSeal).length,
    artifactBlockerCount: fragments.filter((fragment) => fragment.artifactBlockerCode.length > 0).length,
    digestBindingSealCount: countSeals(seals, "digest-binding-seal"),
    signatureEnvelopeSealCount: countSeals(seals, "signature-envelope-seal"),
    policySealCount: countSeals(seals, "policy-seal"),
    noExecutionSealCount: countSeals(seals, "no-execution-seal"),
    artifactMaterializedCount: 0,
    rawSignatureMaterialCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCapturePreflightDigest: preflight.signedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    fragments,
    seals,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactPreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countFragments(
  fragments:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentKind,
): number {
  return fragments.filter((fragment) => fragment.kind === kind).length;
}

function countSeals(
  seals:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSealKind,
): number {
  return seals.filter((seal) => seal.kind === kind).length;
}
