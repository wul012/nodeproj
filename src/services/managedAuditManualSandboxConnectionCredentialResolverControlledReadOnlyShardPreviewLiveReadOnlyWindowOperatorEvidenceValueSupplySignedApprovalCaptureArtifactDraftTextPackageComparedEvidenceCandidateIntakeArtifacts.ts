import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeCatalog.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuards,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlots,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

type Candidate =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate;
type CandidateIntakeSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot;
type CandidateIntakeGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard;
type CandidateIntakeGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates;

function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates(
  candidate: Candidate,
  slots: readonly CandidateIntakeSlot[],
  guards: readonly CandidateIntakeGuard[],
): CandidateIntakeGates {
  const expectedVersions = [
    ...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_VERSIONS,
  ];
  const coveredSectionKinds = new Set(slots.map((slot) => slot.sourceSectionKind));
  const coveredSectionCodes = new Set(slots.map((slot) => slot.sourceSectionCode));
  const candidateFields = slots.flatMap((slot) => slot.candidateFields);

  return {
    sourceCandidateBlueprintReady:
      candidate.readyForComparedEvidenceCandidateBlueprintContract,
    slotCountComplete: slots.length === 10,
    guardCountComplete: guards.length === 10,
    slotVersionsSequential:
      slots.map((slot) => slot.nodeVersion).join("|") === expectedVersions.join("|"),
    guardVersionsSequential:
      guards.map((guard) => guard.nodeVersion).join("|") === expectedVersions.join("|"),
    allSourceSectionsCovered:
      coveredSectionKinds.size === candidate.sections.length,
    allSourceBlockersCovered:
      candidate.blockers.every((blocker) => coveredSectionCodes.has(blocker.sourceSectionCode)),
    allCandidateFieldsCarried:
      candidate.sections.every((section) =>
        section.candidateFields.every((field) => candidateFields.includes(field))),
    candidateFieldCountMatchesBlueprint:
      candidateFields.length === candidate.candidateFieldCount,
    allSlotsReady:
      slots.every((slot) => slot.readyForComparedEvidenceCandidateIntakeSlot),
    allGuardsReady:
      guards.every((guard) => guard.readyForComparedEvidenceCandidateIntakeGuard),
    allSlotsReadOnly:
      slots.every((slot) =>
        slot.readOnly && !slot.writesAllowed && !slot.startsServices && !slot.mutatesSiblingState),
    allGuardsReadOnly:
      guards.every((guard) =>
        guard.readOnly && !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    allSlotsRequireRealCandidateDocument:
      slots.every((slot) => slot.requiresRealCandidateDocument),
    allGuardsRejectMissingCandidateDocument:
      guards.every((guard) => guard.rejectsMissingCandidateDocument),
    allGuardsRejectSyntheticCandidateDocument:
      guards.every((guard) => guard.rejectsSyntheticCandidateDocument),
    allGuardsQuarantineUnreviewedCandidateDocument:
      guards.every((guard) => guard.quarantinesUnreviewedCandidateDocument),
    allGuardsBlockCandidatePayloadImport:
      guards.every((guard) => guard.blocksCandidatePayloadImport),
    allGuardsBlockCandidateEvaluation:
      guards.every((guard) => guard.blocksCandidateEvaluation),
    allGuardsBlockCandidateAcceptance:
      guards.every((guard) => guard.blocksCandidateAcceptance),
    allGuardsBlockApprovalGrant:
      guards.every((guard) => guard.blocksApprovalGrant),
    allGuardsBlockSignedApproval:
      guards.every((guard) => guard.blocksSignedApproval),
    allGuardsBlockRuntimePayload:
      guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites:
      guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation:
      guards.every((guard) => guard.blocksSiblingMutation),
    sourceRealCandidateStillAbsent:
      candidate.realComparedPackageEvidenceCandidateValueCount === 0,
    sourceSyntheticCandidateStillAbsent:
      candidate.syntheticComparedPackageEvidenceCandidateValueCount === 0,
    realCandidateDocumentStillAbsent:
      slots.every((slot) => slot.realCandidateDocumentCount === 0),
    candidatePayloadImportStillBlocked:
      slots.every((slot) => slot.importedCandidatePayloadCount === 0)
      && guards.every((guard) => guard.blocksCandidatePayloadImport),
    candidateEvaluationStillBlocked:
      slots.every((slot) => slot.evaluatedCandidatePayloadCount === 0)
      && guards.every((guard) => guard.blocksCandidateEvaluation),
    candidateAcceptanceStillBlocked:
      slots.every((slot) =>
        slot.acceptedCandidatePayloadCount === 0
        && slot.rejectedCandidatePayloadCount === 0)
      && guards.every((guard) => guard.blocksCandidateAcceptance),
    evidenceImportStillBlocked:
      !candidate.readyForEvidenceImport,
    liveExecutionStillBlocked:
      !candidate.readyForLiveExecution,
    productionExecutionStillBlocked:
      !candidate.readyForProductionExecution,
    noSideEffectsAllowed:
      !candidate.executionAllowed
      && !candidate.writeRoutingAllowed
      && !candidate.startsServices
      && !candidate.mutatesSiblingState
      && !candidate.importsRuntimePayload,
    nextStepRequiresRealComparedPackageEvidenceCandidateDocument: true,
  };
}

function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeBlockedReasons(
  gates: CandidateIntakeGates,
): string[] {
  const reasonByGate: Record<keyof CandidateIntakeGates, string> = {
    sourceCandidateBlueprintReady: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_BLUEPRINT_NOT_READY",
    slotCountComplete: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS_NOT_COMPLETE",
    guardCountComplete: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_NOT_COMPLETE",
    slotVersionsSequential: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOT_VERSIONS_NOT_SEQUENTIAL",
    guardVersionsSequential: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARD_VERSIONS_NOT_SEQUENTIAL",
    allSourceSectionsCovered: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_SECTIONS_NOT_COVERED",
    allSourceBlockersCovered: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_BLOCKERS_NOT_COVERED",
    allCandidateFieldsCarried: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_FIELDS_NOT_CARRIED",
    candidateFieldCountMatchesBlueprint: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_FIELD_COUNT_MISMATCH",
    allSlotsReady: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS_BLOCKED",
    allGuardsReady: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_BLOCKED",
    allSlotsReadOnly: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS_NOT_READ_ONLY",
    allGuardsReadOnly: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_NOT_READ_ONLY",
    allSlotsRequireRealCandidateDocument: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS_ALLOW_MISSING_REAL_DOCUMENT",
    allGuardsRejectMissingCandidateDocument: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_MISSING_DOCUMENT",
    allGuardsRejectSyntheticCandidateDocument: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_SYNTHETIC_DOCUMENT",
    allGuardsQuarantineUnreviewedCandidateDocument: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_SKIP_QUARANTINE",
    allGuardsBlockCandidatePayloadImport: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_PAYLOAD_IMPORT",
    allGuardsBlockCandidateEvaluation: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_EVALUATION",
    allGuardsBlockCandidateAcceptance: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_ACCEPTANCE",
    allGuardsBlockApprovalGrant: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_APPROVAL_GRANT",
    allGuardsBlockSignedApproval: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_SIGNED_APPROVAL",
    allGuardsBlockRuntimePayload: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_RUNTIME_PAYLOAD",
    allGuardsBlockWrites: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_WRITES",
    allGuardsBlockSiblingMutation: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS_ALLOW_SIBLING_MUTATION",
    sourceRealCandidateStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_REAL_CANDIDATE_ALREADY_PRESENT",
    sourceSyntheticCandidateStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SOURCE_SYNTHETIC_CANDIDATE_PRESENT",
    realCandidateDocumentStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_REAL_DOCUMENT_ALREADY_PRESENT",
    candidatePayloadImportStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_PAYLOAD_IMPORTED_TOO_EARLY",
    candidateEvaluationStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_EVALUATED_TOO_EARLY",
    candidateAcceptanceStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_ACCEPTED_OR_REJECTED_TOO_EARLY",
    evidenceImportStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_SIDE_EFFECTS_ENABLED",
    nextStepRequiresRealComparedPackageEvidenceCandidateDocument: "COMPARED_EVIDENCE_CANDIDATE_INTAKE_NEXT_STEP_NOT_REAL_DOCUMENT",
  };

  return (Object.entries(gates) as [keyof CandidateIntakeGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake(
  candidate: Candidate,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntake {
  const slots =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlots(
      candidate,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuards(
      slots,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGates(
      candidate,
      slots,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeBlockedReasons(
      gates,
    );
  const readyForComparedEvidenceCandidateIntakePreflightContract = blockedReasonCodes.length === 0;
  const requiredCandidateFieldCount = slots.reduce((sum, slot) => sum + slot.candidateFieldCount, 0);
  const signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
    slots: slots.map((slot) => [
      slot.order,
      slot.nodeVersion,
      slot.code,
      slot.kind,
      slot.sourceSectionCode,
      slot.candidateFields,
      slot.readyForComparedEvidenceCandidateIntakeSlot,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceSlotCode,
      guard.readyForComparedEvidenceCandidateIntakeGuard,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeVersion: "Node v1371",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion,
    artifactDraftTextPackageComparedEvidenceCandidateIntakeState:
      readyForComparedEvidenceCandidateIntakePreflightContract
        ? "waiting-for-real-compared-package-evidence-candidate-document"
        : "blocked",
    readyForComparedEvidenceCandidateIntakePreflightContract,
    readyForRealComparedPackageEvidenceCandidateDocumentIntake: false,
    readyForComparedEvidenceCandidateBlueprintContract:
      candidate.readyForComparedEvidenceCandidateBlueprintContract,
    readyForCandidatePayloadImport: false,
    readyForCandidateEvaluation: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    intakeSlotCount: slots.length,
    intakeGuardCount: guards.length,
    sourceBlueprintSectionCount: candidate.blueprintSectionCount,
    sourceBlueprintBlockerCount: candidate.blueprintBlockerCount,
    readyIntakeSlotCount:
      slots.filter((slot) => slot.readyForComparedEvidenceCandidateIntakeSlot).length,
    readyIntakeGuardCount:
      guards.filter((guard) => guard.readyForComparedEvidenceCandidateIntakeGuard).length,
    requiredCandidateFieldCount,
    sourceCandidateFieldCount: candidate.candidateFieldCount,
    realCandidateDocumentCount: 0,
    syntheticCandidateDocumentCount: 0,
    stagedCandidateDocumentCount: 0,
    importedCandidatePayloadCount: 0,
    evaluatedCandidatePayloadCount: 0,
    acceptedCandidatePayloadCount: 0,
    rejectedCandidatePayloadCount: 0,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest:
      candidate.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
    slots,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeDigest,
    candidateDocumentIntakeAllowed: false,
    candidatePayloadImportAllowed: false,
    candidateEvaluationAllowed: false,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}
