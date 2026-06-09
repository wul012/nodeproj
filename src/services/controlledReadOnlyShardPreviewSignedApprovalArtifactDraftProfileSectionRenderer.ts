import { renderEntries } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

export function renderControlledReadOnlyShardPreviewSignedApprovalArtifactDraftProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return [
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Preflight",
    ...renderSignedApprovalCaptureArtifactDraftPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Readiness",
    ...renderSignedApprovalCaptureArtifactDraftReadinessProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Review Package Preflight",
    ...renderSignedApprovalCaptureArtifactDraftReviewPackagePreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Authoring Readiness",
    ...renderSignedApprovalCaptureArtifactDraftAuthoringReadinessProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness,
    ),
    "",
    "## Live Read-Only Window Operator Evidence Value Supply Signed Approval Capture Artifact Draft Instruction Preflight",
    ...renderSignedApprovalCaptureArtifactDraftInstructionPreflightProfileEntries(
      profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight,
    ),
    "",
  ];
}

function renderSignedApprovalCaptureArtifactDraftPreflightProfileEntries(
  draftPreflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftPreflightVersion:
      draftPreflight.signedApprovalCaptureArtifactDraftPreflightVersion,
    sourceSignedApprovalCaptureArtifactPreflightVersion:
      draftPreflight.sourceSignedApprovalCaptureArtifactPreflightVersion,
    artifactDraftPreflightState: draftPreflight.artifactDraftPreflightState,
    readyForSignedApprovalArtifactDraftPreflight:
      draftPreflight.readyForSignedApprovalArtifactDraftPreflight,
    readyForSignedApprovalArtifactDraft: draftPreflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: draftPreflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: draftPreflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: draftPreflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: draftPreflight.readyForEvidenceImport,
    readyForRuntimePayload: draftPreflight.readyForRuntimePayload,
    draftFieldCount: draftPreflight.draftFieldCount,
    draftGuardCount: draftPreflight.draftGuardCount,
    identityDraftFieldCount: draftPreflight.identityDraftFieldCount,
    digestBindingDraftFieldCount: draftPreflight.digestBindingDraftFieldCount,
    signatureEnvelopeDraftFieldCount: draftPreflight.signatureEnvelopeDraftFieldCount,
    sourceEvidenceDraftFieldCount: draftPreflight.sourceEvidenceDraftFieldCount,
    valueBindingDraftFieldCount: draftPreflight.valueBindingDraftFieldCount,
    policyDraftFieldCount: draftPreflight.policyDraftFieldCount,
    executionLockDraftFieldCount: draftPreflight.executionLockDraftFieldCount,
    closeoutDraftFieldCount: draftPreflight.closeoutDraftFieldCount,
    requiredDraftFieldCount: draftPreflight.requiredDraftFieldCount,
    readyDraftFieldCount: draftPreflight.readyDraftFieldCount,
    readyDraftGuardCount: draftPreflight.readyDraftGuardCount,
    draftBlockerCount: draftPreflight.draftBlockerCount,
    noExecutionGuardCount: draftPreflight.noExecutionGuardCount,
    gateCount: draftPreflight.gateCount,
    passedGateCount: draftPreflight.passedGateCount,
    draftArtifactCreated: draftPreflight.draftArtifactCreated,
    draftArtifactMaterializedCount: draftPreflight.draftArtifactMaterializedCount,
    draftSignaturePayloadCount: draftPreflight.draftSignaturePayloadCount,
    approvalCaptured: draftPreflight.approvalCaptured,
    approvalGrantPresent: draftPreflight.approvalGrantPresent,
    signedApprovalPresent: draftPreflight.signedApprovalPresent,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      draftPreflight.sourceSignedApprovalCaptureArtifactPreflightDigest,
    importsRuntimePayload: draftPreflight.importsRuntimePayload,
    acceptsSyntheticEvidence: draftPreflight.acceptsSyntheticEvidence,
    containsSecretValue: draftPreflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftPreflightDigest:
      draftPreflight.signedApprovalCaptureArtifactDraftPreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftReadinessProfileEntries(
  readiness:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReadiness"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftPreflightVersion:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightVersion,
    artifactDraftReadinessState: readiness.artifactDraftReadinessState,
    readyForSignedApprovalArtifactDraftReadiness:
      readiness.readyForSignedApprovalArtifactDraftReadiness,
    readyForManualSignedApprovalDraftReview: readiness.readyForManualSignedApprovalDraftReview,
    readyForSignedApprovalArtifactDraft: readiness.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: readiness.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: readiness.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: readiness.readyForOperatorValueSubmission,
    readyForEvidenceImport: readiness.readyForEvidenceImport,
    readyForRuntimePayload: readiness.readyForRuntimePayload,
    readinessLaneCount: readiness.readinessLaneCount,
    readinessControlCount: readiness.readinessControlCount,
    identityReadinessLaneCount: readiness.identityReadinessLaneCount,
    digestBindingReadinessLaneCount: readiness.digestBindingReadinessLaneCount,
    signatureEnvelopeReadinessLaneCount: readiness.signatureEnvelopeReadinessLaneCount,
    sourceEvidenceReadinessLaneCount: readiness.sourceEvidenceReadinessLaneCount,
    valueBindingReadinessLaneCount: readiness.valueBindingReadinessLaneCount,
    policyReadinessLaneCount: readiness.policyReadinessLaneCount,
    executionLockReadinessLaneCount: readiness.executionLockReadinessLaneCount,
    archiveCloseoutReadinessLaneCount: readiness.archiveCloseoutReadinessLaneCount,
    readyReadinessLaneCount: readiness.readyReadinessLaneCount,
    readyReadinessControlCount: readiness.readyReadinessControlCount,
    digestBindingReadinessControlCount: readiness.digestBindingReadinessControlCount,
    signatureEnvelopeReadinessControlCount: readiness.signatureEnvelopeReadinessControlCount,
    policyReadinessControlCount: readiness.policyReadinessControlCount,
    executionLockReadinessControlCount: readiness.executionLockReadinessControlCount,
    archiveCloseoutReadinessControlCount: readiness.archiveCloseoutReadinessControlCount,
    manualDraftMaterializedCount: readiness.manualDraftMaterializedCount,
    draftArtifactCreated: readiness.draftArtifactCreated,
    draftArtifactMaterializedCount: readiness.draftArtifactMaterializedCount,
    draftSignaturePayloadCount: readiness.draftSignaturePayloadCount,
    approvalCaptured: readiness.approvalCaptured,
    approvalGrantPresent: readiness.approvalGrantPresent,
    signedApprovalPresent: readiness.signedApprovalPresent,
    gateCount: readiness.gateCount,
    passedGateCount: readiness.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftPreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftPreflightDigest,
    importsRuntimePayload: readiness.importsRuntimePayload,
    acceptsSyntheticEvidence: readiness.acceptsSyntheticEvidence,
    containsSecretValue: readiness.containsSecretValue,
    signedApprovalCaptureArtifactDraftReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftReadinessDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftReviewPackagePreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftReviewPackagePreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftReadinessVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessVersion,
    artifactDraftReviewPackagePreflightState:
      preflight.artifactDraftReviewPackagePreflightState,
    readyForSignedApprovalArtifactDraftReviewPackagePreflight:
      preflight.readyForSignedApprovalArtifactDraftReviewPackagePreflight,
    readyForManualSignedApprovalDraftReviewPackage:
      preflight.readyForManualSignedApprovalDraftReviewPackage,
    readyForManualSignedApprovalDraftReview:
      preflight.readyForManualSignedApprovalDraftReview,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    packageSlotCount: preflight.packageSlotCount,
    packageGuardCount: preflight.packageGuardCount,
    identityReviewPackageSlotCount: preflight.identityReviewPackageSlotCount,
    digestBindingReviewPackageSlotCount: preflight.digestBindingReviewPackageSlotCount,
    signatureEnvelopeReviewPackageSlotCount: preflight.signatureEnvelopeReviewPackageSlotCount,
    sourceEvidenceReviewPackageSlotCount: preflight.sourceEvidenceReviewPackageSlotCount,
    valueBindingReviewPackageSlotCount: preflight.valueBindingReviewPackageSlotCount,
    policyReviewPackageSlotCount: preflight.policyReviewPackageSlotCount,
    executionLockReviewPackageSlotCount: preflight.executionLockReviewPackageSlotCount,
    archiveCloseoutReviewPackageSlotCount: preflight.archiveCloseoutReviewPackageSlotCount,
    digestModeReviewPackageSlotCount: preflight.digestModeReviewPackageSlotCount,
    readyPackageSlotCount: preflight.readyPackageSlotCount,
    readyPackageGuardCount: preflight.readyPackageGuardCount,
    digestBindingReviewPackageGuardCount: preflight.digestBindingReviewPackageGuardCount,
    signatureEnvelopeReviewPackageGuardCount: preflight.signatureEnvelopeReviewPackageGuardCount,
    policyReviewPackageGuardCount: preflight.policyReviewPackageGuardCount,
    executionLockReviewPackageGuardCount: preflight.executionLockReviewPackageGuardCount,
    archiveCloseoutReviewPackageGuardCount: preflight.archiveCloseoutReviewPackageGuardCount,
    packageSlotMaterializedCount: preflight.packageSlotMaterializedCount,
    packageArtifactCreated: preflight.packageArtifactCreated,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftReadinessDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftAuthoringReadinessProfileEntries(
  readiness:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadiness"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightVersion,
    artifactDraftAuthoringReadinessState: readiness.artifactDraftAuthoringReadinessState,
    readyForSignedApprovalArtifactDraftAuthoringReadiness:
      readiness.readyForSignedApprovalArtifactDraftAuthoringReadiness,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      readiness.readyForHumanSignedApprovalDraftArtifactAuthoring,
    readyForManualSignedApprovalDraftReviewPackage:
      readiness.readyForManualSignedApprovalDraftReviewPackage,
    readyForSignedApprovalArtifactDraft: readiness.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: readiness.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: readiness.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: readiness.readyForOperatorValueSubmission,
    readyForEvidenceImport: readiness.readyForEvidenceImport,
    readyForRuntimePayload: readiness.readyForRuntimePayload,
    authoringRequirementCount: readiness.authoringRequirementCount,
    authoringBlockerCount: readiness.authoringBlockerCount,
    identityAuthoringRequirementCount: readiness.identityAuthoringRequirementCount,
    digestBindingAuthoringRequirementCount: readiness.digestBindingAuthoringRequirementCount,
    signatureEnvelopeAuthoringRequirementCount: readiness.signatureEnvelopeAuthoringRequirementCount,
    sourceEvidenceAuthoringRequirementCount: readiness.sourceEvidenceAuthoringRequirementCount,
    valueBindingAuthoringRequirementCount: readiness.valueBindingAuthoringRequirementCount,
    policyAuthoringRequirementCount: readiness.policyAuthoringRequirementCount,
    executionLockAuthoringRequirementCount: readiness.executionLockAuthoringRequirementCount,
    archiveCloseoutAuthoringRequirementCount: readiness.archiveCloseoutAuthoringRequirementCount,
    digestModeAuthoringRequirementCount: readiness.digestModeAuthoringRequirementCount,
    readyAuthoringRequirementCount: readiness.readyAuthoringRequirementCount,
    readyAuthoringBlockerCount: readiness.readyAuthoringBlockerCount,
    digestBindingAuthoringBlockerCount: readiness.digestBindingAuthoringBlockerCount,
    signatureEnvelopeAuthoringBlockerCount: readiness.signatureEnvelopeAuthoringBlockerCount,
    policyAuthoringBlockerCount: readiness.policyAuthoringBlockerCount,
    executionLockAuthoringBlockerCount: readiness.executionLockAuthoringBlockerCount,
    archiveCloseoutAuthoringBlockerCount: readiness.archiveCloseoutAuthoringBlockerCount,
    authoringInstructionMaterializedCount: readiness.authoringInstructionMaterializedCount,
    draftArtifactCreated: readiness.draftArtifactCreated,
    signedDraftTextCount: readiness.signedDraftTextCount,
    draftSignaturePayloadCount: readiness.draftSignaturePayloadCount,
    approvalCaptured: readiness.approvalCaptured,
    approvalGrantPresent: readiness.approvalGrantPresent,
    signedApprovalPresent: readiness.signedApprovalPresent,
    gateCount: readiness.gateCount,
    passedGateCount: readiness.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest:
      readiness.sourceSignedApprovalCaptureArtifactDraftReviewPackagePreflightDigest,
    importsRuntimePayload: readiness.importsRuntimePayload,
    acceptsSyntheticEvidence: readiness.acceptsSyntheticEvidence,
    containsSecretValue: readiness.containsSecretValue,
    signedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      readiness.signedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
  });
}

function renderSignedApprovalCaptureArtifactDraftInstructionPreflightProfileEntries(
  preflight:
    ControlledReadOnlyShardPreviewProfile["preview"]["liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflight"],
): string[] {
  return renderEntries({
    signedApprovalCaptureArtifactDraftInstructionPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftInstructionPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion:
      preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessVersion,
    artifactDraftInstructionPreflightState: preflight.artifactDraftInstructionPreflightState,
    readyForSignedApprovalArtifactDraftInstructionPreflight:
      preflight.readyForSignedApprovalArtifactDraftInstructionPreflight,
    readyForHumanSignedApprovalDraftInstructionAuthoring:
      preflight.readyForHumanSignedApprovalDraftInstructionAuthoring,
    readyForHumanSignedApprovalDraftArtifactAuthoring:
      preflight.readyForHumanSignedApprovalDraftArtifactAuthoring,
    readyForSignedApprovalArtifactDraft: preflight.readyForSignedApprovalArtifactDraft,
    readyForSignedApprovalCapture: preflight.readyForSignedApprovalCapture,
    readyForOperatorValueSupply: preflight.readyForOperatorValueSupply,
    readyForOperatorValueSubmission: preflight.readyForOperatorValueSubmission,
    readyForEvidenceImport: preflight.readyForEvidenceImport,
    readyForRuntimePayload: preflight.readyForRuntimePayload,
    instructionSlotCount: preflight.instructionSlotCount,
    instructionGuardCount: preflight.instructionGuardCount,
    identityInstructionSlotCount: preflight.identityInstructionSlotCount,
    digestBindingInstructionSlotCount: preflight.digestBindingInstructionSlotCount,
    signatureEnvelopeInstructionSlotCount: preflight.signatureEnvelopeInstructionSlotCount,
    sourceEvidenceInstructionSlotCount: preflight.sourceEvidenceInstructionSlotCount,
    valueBindingInstructionSlotCount: preflight.valueBindingInstructionSlotCount,
    policyInstructionSlotCount: preflight.policyInstructionSlotCount,
    executionLockInstructionSlotCount: preflight.executionLockInstructionSlotCount,
    archiveCloseoutInstructionSlotCount: preflight.archiveCloseoutInstructionSlotCount,
    digestModeInstructionSlotCount: preflight.digestModeInstructionSlotCount,
    readyInstructionSlotCount: preflight.readyInstructionSlotCount,
    readyInstructionGuardCount: preflight.readyInstructionGuardCount,
    digestBindingInstructionGuardCount: preflight.digestBindingInstructionGuardCount,
    signatureEnvelopeInstructionGuardCount: preflight.signatureEnvelopeInstructionGuardCount,
    policyInstructionGuardCount: preflight.policyInstructionGuardCount,
    executionLockInstructionGuardCount: preflight.executionLockInstructionGuardCount,
    archiveCloseoutInstructionGuardCount: preflight.archiveCloseoutInstructionGuardCount,
    draftInstructionMaterializedCount: preflight.draftInstructionMaterializedCount,
    draftArtifactCreated: preflight.draftArtifactCreated,
    signedDraftTextCount: preflight.signedDraftTextCount,
    draftSignaturePayloadCount: preflight.draftSignaturePayloadCount,
    approvalCaptured: preflight.approvalCaptured,
    approvalGrantPresent: preflight.approvalGrantPresent,
    signedApprovalPresent: preflight.signedApprovalPresent,
    gateCount: preflight.gateCount,
    passedGateCount: preflight.passedGateCount,
    sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest:
      preflight.sourceSignedApprovalCaptureArtifactDraftAuthoringReadinessDigest,
    importsRuntimePayload: preflight.importsRuntimePayload,
    acceptsSyntheticEvidence: preflight.acceptsSyntheticEvidence,
    containsSecretValue: preflight.containsSecretValue,
    signedApprovalCaptureArtifactDraftInstructionPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftInstructionPreflightDigest,
  });
}
