import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockers,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirements,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness(
  preflight:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness {
  const requirements =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirements(
      preflight,
    );
  const blockers =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockers(
      requirements,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessGates(
      preflight,
      requirements,
      blockers,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftAuthoringReadiness = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftAuthoringReadinessDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    requirements: requirements.map((requirement) => [
      requirement.order,
      requirement.nodeVersion,
      requirement.code,
      requirement.kind,
      requirement.requirementMode,
      requirement.sourcePackageSlotCode,
      requirement.sourcePackageGuardCode,
    ]),
    blockers: blockers.map((blocker) => [
      blocker.order,
      blocker.nodeVersion,
      blocker.code,
      blocker.kind,
      blocker.sourceAuthoringRequirementCode,
      blocker.blockerCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftAuthoringReadinessVersion: "Node v1186",
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    artifactDraftAuthoringReadinessState: readyForSignedApprovalArtifactDraftAuthoringReadiness
      ? "ready-for-signed-approval-artifact-draft-authoring-readiness"
      : "blocked",
    readyForSignedApprovalArtifactDraftAuthoringReadiness,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      readyForSignedApprovalArtifactDraftAuthoringReadiness,
    readyForManualSignedApprovalDraftReviewPackage:
      preflight.readyForManualSignedApprovalDraftReviewPackage,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    authoringRequirementCount: requirements.length,
    authoringBlockerCount: blockers.length,
    identityAuthoringRequirementCount: countRequirements(requirements, "identity-authoring-requirement"),
    digestBindingAuthoringRequirementCount: countRequirements(requirements, "digest-binding-authoring-requirement"),
    signatureEnvelopeAuthoringRequirementCount: countRequirements(requirements, "signature-envelope-authoring-requirement"),
    sourceEvidenceAuthoringRequirementCount: countRequirements(requirements, "source-evidence-authoring-requirement"),
    valueBindingAuthoringRequirementCount: countRequirements(requirements, "value-binding-authoring-requirement"),
    policyAuthoringRequirementCount: countRequirements(requirements, "policy-authoring-requirement"),
    executionLockAuthoringRequirementCount: countRequirements(requirements, "execution-lock-authoring-requirement"),
    archiveCloseoutAuthoringRequirementCount: countRequirements(requirements, "archive-closeout-authoring-requirement"),
    digestModeAuthoringRequirementCount:
      requirements.filter((requirement) => requirement.requirementMode === "digest-authoring-pin").length,
    readyAuthoringRequirementCount:
      requirements.filter((requirement) =>
        requirement.readyForHumanSignedApprovalDraftArtifactAuthoringRequirement).length,
    readyAuthoringBlockerCount:
      blockers.filter((blocker) =>
        blocker.readyForHumanSignedApprovalDraftArtifactAuthoringBlocker).length,
    digestBindingAuthoringBlockerCount: countBlockers(blockers, "digest-binding-authoring-blocker"),
    signatureEnvelopeAuthoringBlockerCount: countBlockers(blockers, "signature-envelope-authoring-blocker"),
    policyAuthoringBlockerCount: countBlockers(blockers, "policy-authoring-blocker"),
    executionLockAuthoringBlockerCount: countBlockers(blockers, "execution-lock-authoring-blocker"),
    archiveCloseoutAuthoringBlockerCount: countBlockers(blockers, "archive-closeout-authoring-blocker"),
    authoringInstructionMaterializedCount: 0,
    draftArtifactCreated: false,
    signedDraftTextCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest:
      preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    requirements,
    blockers,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countRequirements(
  requirements:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirement[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
): number {
  return requirements.filter((requirement) => requirement.kind === kind).length;
}

function countBlockers(
  blockers:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlocker[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessBlockerKind,
): number {
  return blockers.filter((blocker) => blocker.kind === kind).length;
}
