import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragmentCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCapturePreflight,
  fragments:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightFragment[],
  seals:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightSeal[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates {
  return {
    sourceSignedApprovalCapturePreflightReady: preflight.readyForSignedApprovalCapturePreflight,
    artifactFragmentCountComplete:
      fragments.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VERSIONS.length,
    artifactSealCountComplete:
      seals.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VERSIONS.length,
    fragmentVersionsSequential: fragments.every((fragment, index) =>
      fragment.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VERSIONS[index]),
    sealVersionsSequential: seals.every((seal, index) =>
      seal.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_VERSIONS[index]),
    sourceCaptureInputsReady: fragments.every((fragment) => fragment.sourceCaptureInputReady),
    allFragmentsReady:
      fragments.every((fragment) => fragment.readyForSignedApprovalCaptureArtifactPreflightFragment),
    allSealsReady: seals.every((seal) => seal.readyForSignedApprovalCaptureArtifactPreflightSeal),
    allFragmentsRequired: fragments.every((fragment) => fragment.requiredForArtifactPreflight),
    allFragmentPurposesDeclared: fragments.every((fragment) => fragment.fragmentPurpose.length > 0),
    allArtifactBlockersDeclared: fragments.every((fragment) => fragment.artifactBlockerCode.length > 0),
    allRequiredCaptureInputsCovered: fragments.every((fragment) => fragment.requiredCaptureInputPresent),
    allSealsRejectMissingFragments: seals.every((seal) => seal.rejectsMissingFragment),
    allSealsBlockUnsignedArtifact: seals.every((seal) => seal.blocksUnsignedArtifact),
    allSealsBlockAutoMaterialization: seals.every((seal) => seal.blocksAutoMaterialization),
    allSealsBlockRuntimePayload: seals.every((seal) => seal.blocksRuntimePayload),
    allSealsBlockWrites: seals.every((seal) => seal.blocksWrites),
    allSealsBlockSiblingMutation: seals.every((seal) => seal.blocksSiblingMutation),
    sourceCapturePreflightDigestPresent: /^[a-f0-9]{64}$/.test(preflight.signedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent: /^[a-f0-9]{64}$/.test(preflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent: /^[a-f0-9]{64}$/.test(preflight.sourceApprovalPacketReviewDigest),
    sourceCapturePreflightStillPreflightOnly:
      preflight.readyForSignedApprovalCapturePreflight
      && preflight.preflightState === "ready-for-signed-approval-capture-preflight",
    sourceCaptureStillBlocked: !preflight.readyForSignedApprovalCapture,
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && fragments.every((fragment) => !fragment.readyForOperatorValueSupply)
      && seals.every((seal) => !seal.readyForOperatorValueSupply),
    noArtifactMaterialized: fragments.every((fragment) => !fragment.artifactMaterialized),
    noRawSignatureMaterial:
      !preflight.containsSecretValue && fragments.every((fragment) => !fragment.rawSignatureMaterialPresent),
    noApprovalGrantEmitted:
      !preflight.approvalGrantPresent && fragments.every((fragment) => !fragment.approvalGrantEmitted),
    noSignedApprovalPresent: !preflight.signedApprovalPresent,
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && fragments.every((fragment) => !fragment.readyForEvidenceImport)
      && seals.every((seal) => !seal.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && fragments.every((fragment) => !fragment.readyForRuntimePayload)
      && seals.every((seal) => !seal.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    allFragmentsReadOnly: fragments.every((fragment) => fragment.readOnly),
    allSealsReadOnly: seals.every((seal) => seal.readOnly),
    noSideEffectsAllowed:
      !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && fragments.every((fragment) =>
        !fragment.writesAllowed && !fragment.startsServices && !fragment.mutatesSiblingState)
      && seals.every((seal) => !seal.writesAllowed && !seal.startsServices && !seal.mutatesSiblingState),
    nextStepRequiresSignedApprovalArtifactDraft: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightGates,
): string[] {
  return [
    gates.sourceSignedApprovalCapturePreflightReady ? null : "SOURCE_SIGNED_APPROVAL_CAPTURE_PREFLIGHT_NOT_READY",
    gates.artifactFragmentCountComplete ? null : "ARTIFACT_PREFLIGHT_FRAGMENT_COUNT_INCOMPLETE",
    gates.artifactSealCountComplete ? null : "ARTIFACT_PREFLIGHT_SEAL_COUNT_INCOMPLETE",
    gates.fragmentVersionsSequential ? null : "ARTIFACT_PREFLIGHT_FRAGMENT_VERSIONS_NOT_SEQUENTIAL",
    gates.sealVersionsSequential ? null : "ARTIFACT_PREFLIGHT_SEAL_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceCaptureInputsReady ? null : "ARTIFACT_PREFLIGHT_SOURCE_CAPTURE_INPUTS_NOT_READY",
    gates.allFragmentsReady ? null : "ARTIFACT_PREFLIGHT_FRAGMENTS_NOT_READY",
    gates.allSealsReady ? null : "ARTIFACT_PREFLIGHT_SEALS_NOT_READY",
    gates.allFragmentsRequired ? null : "ARTIFACT_PREFLIGHT_FRAGMENTS_NOT_REQUIRED",
    gates.allFragmentPurposesDeclared ? null : "ARTIFACT_PREFLIGHT_FRAGMENT_PURPOSES_MISSING",
    gates.allArtifactBlockersDeclared ? null : "ARTIFACT_PREFLIGHT_BLOCKERS_MISSING",
    gates.allRequiredCaptureInputsCovered ? null : "ARTIFACT_PREFLIGHT_CAPTURE_INPUT_COVERAGE_MISSING",
    gates.allSealsRejectMissingFragments ? null : "ARTIFACT_PREFLIGHT_SEALS_DO_NOT_REJECT_MISSING_FRAGMENTS",
    gates.allSealsBlockUnsignedArtifact ? null : "ARTIFACT_PREFLIGHT_UNSIGNED_ARTIFACT_NOT_BLOCKED",
    gates.allSealsBlockAutoMaterialization ? null : "ARTIFACT_PREFLIGHT_AUTO_MATERIALIZATION_NOT_BLOCKED",
    gates.allSealsBlockRuntimePayload ? null : "ARTIFACT_PREFLIGHT_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allSealsBlockWrites ? null : "ARTIFACT_PREFLIGHT_WRITES_NOT_BLOCKED",
    gates.allSealsBlockSiblingMutation ? null : "ARTIFACT_PREFLIGHT_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceCapturePreflightDigestPresent ? null : "ARTIFACT_PREFLIGHT_SOURCE_CAPTURE_DIGEST_MISSING",
    gates.sourceTemplateDigestPresent ? null : "ARTIFACT_PREFLIGHT_SOURCE_TEMPLATE_DIGEST_MISSING",
    gates.sourceReviewDigestPresent ? null : "ARTIFACT_PREFLIGHT_SOURCE_REVIEW_DIGEST_MISSING",
    gates.sourceCapturePreflightStillPreflightOnly ? null : "ARTIFACT_PREFLIGHT_SOURCE_NOT_PREFLIGHT_ONLY",
    gates.sourceCaptureStillBlocked ? null : "ARTIFACT_PREFLIGHT_SOURCE_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "ARTIFACT_PREFLIGHT_OPERATOR_VALUE_SUPPLY_ENABLED",
    gates.noArtifactMaterialized ? null : "ARTIFACT_PREFLIGHT_ARTIFACT_ALREADY_MATERIALIZED",
    gates.noRawSignatureMaterial ? null : "ARTIFACT_PREFLIGHT_RAW_SIGNATURE_MATERIAL_PRESENT",
    gates.noApprovalGrantEmitted ? null : "ARTIFACT_PREFLIGHT_APPROVAL_GRANT_EMITTED",
    gates.noSignedApprovalPresent ? null : "ARTIFACT_PREFLIGHT_SIGNED_APPROVAL_PRESENT",
    gates.evidenceImportStillBlocked ? null : "ARTIFACT_PREFLIGHT_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "ARTIFACT_PREFLIGHT_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "ARTIFACT_PREFLIGHT_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "ARTIFACT_PREFLIGHT_PRODUCTION_EXECUTION_ENABLED",
    gates.allFragmentsReadOnly ? null : "ARTIFACT_PREFLIGHT_FRAGMENT_NOT_READ_ONLY",
    gates.allSealsReadOnly ? null : "ARTIFACT_PREFLIGHT_SEAL_NOT_READ_ONLY",
    gates.noSideEffectsAllowed ? null : "ARTIFACT_PREFLIGHT_SIDE_EFFECTS_ALLOWED",
    gates.nextStepRequiresSignedApprovalArtifactDraft ? null : "ARTIFACT_PREFLIGHT_NEXT_STEP_NOT_ARTIFACT_DRAFT",
  ].filter((reason): reason is string => reason !== null);
}
