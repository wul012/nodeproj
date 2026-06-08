import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";

type AcceptancePrecheck =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck;
type IntakeSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot;
type IntakeGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard;
type IntakeGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGates(
  precheck: AcceptancePrecheck,
  slots: readonly IntakeSlot[],
  guards: readonly IntakeGuard[],
): IntakeGates {
  const expectedVersions = [
    ...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_VERSIONS,
  ];
  const coveredCheckpointKinds = new Set<string>();
  const coveredGuardKinds = new Set<string>();

  for (const slot of slots) {
    for (const kind of slot.sourceCheckpointKinds) {
      coveredCheckpointKinds.add(kind);
    }
    for (const kind of slot.sourceGuardKinds) {
      coveredGuardKinds.add(kind);
    }
  }

  return {
    sourceComparisonAcceptancePrecheckReady:
      precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
    slotCountComplete: slots.length === 10,
    guardCountComplete: guards.length === 10,
    slotVersionsSequential:
      slots.map((slot) => slot.nodeVersion).join("|") === expectedVersions.join("|"),
    guardVersionsSequential:
      guards.map((guard) => guard.nodeVersion).join("|") === expectedVersions.join("|"),
    allSlotsReady:
      slots.every((slot) => slot.readyForManualComparedPackageEvidenceIntakeSlot),
    allGuardsReady:
      guards.every((guard) => guard.readyForManualComparedPackageEvidenceIntakeGuard),
    allSlotRequirementsDeclared:
      slots.every((slot) => slot.requiredRealEvidence.length > 0),
    allManualEvidenceFieldsDeclared:
      slots.every((slot) => slot.manualEvidenceField.length > 0),
    allGuardTextsDeclared:
      guards.every((guard) => guard.guardText.length > 0),
    allSourceCheckpointsCovered:
      coveredCheckpointKinds.size === precheck.checkpoints.length,
    allSourceGuardsCovered:
      coveredGuardKinds.size === precheck.guards.length,
    sourceCheckpointCountStillTen: precheck.checkpointCount === 10,
    sourceGuardCountStillTen: precheck.guardCount === 10,
    sourceReadyCheckpointCountStillTen: precheck.readyCheckpointCount === 10,
    sourceReadyGuardCountStillTen: precheck.readyGuardCount === 10,
    sourcePrecheckDigestPresent:
      precheck.signedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest.length === 64,
    sourceComparisonPreflightDigestPresent:
      precheck.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonPreflightDigest.length === 64,
    sourcePrecheckStillNoAcceptanceEvidence:
      precheck.actualDraftTextPackageAcceptanceEvidenceCount === 0,
    sourceStillNoComparedPackage: precheck.comparedDraftTextPackageCount === 0,
    sourceStillNoAcceptedPackage: precheck.acceptedDraftTextPackageCount === 0,
    realComparedPackageEvidenceStillAbsent:
      slots.every((slot) => !slot.realComparedPackageEvidencePresent),
    manualComparedPackageEvidenceMaterializationStillAbsent:
      slots.every((slot) => !slot.manualComparedPackageEvidenceMaterialized),
    actualAcceptanceEvidenceStillZero:
      precheck.actualDraftTextPackageAcceptanceEvidenceCount === 0,
    approvalGrantStillAbsent:
      !precheck.approvalGrantPresent && slots.every((slot) => !slot.approvalGrantPresent),
    signedApprovalStillAbsent:
      !precheck.signedApprovalPresent && slots.every((slot) => !slot.realSignedApprovalPresent),
    allSlotsReadOnly:
      slots.every((slot) =>
        slot.readOnly && !slot.writesAllowed && !slot.startsServices && !slot.mutatesSiblingState),
    allGuardsReadOnly:
      guards.every((guard) =>
        guard.readOnly && !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    allGuardsRejectMissingRealEvidence:
      guards.every((guard) => guard.rejectsMissingRealComparedPackageEvidence),
    allGuardsRejectSyntheticEvidence:
      guards.every((guard) => guard.rejectsSyntheticComparedPackageEvidence),
    allGuardsBlockAcceptance:
      guards.every((guard) => guard.blocksComparedPackageAcceptance),
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
    signedApprovalDraftStillDisabled:
      !precheck.readyForSignedApprovalArtifactDraft
      && slots.every((slot) => !slot.readyForSignedApprovalArtifactDraft),
    signedApprovalCaptureStillDisabled:
      !precheck.readyForSignedApprovalCapture
      && slots.every((slot) => !slot.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !precheck.readyForOperatorValueSupply
      && slots.every((slot) => !slot.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !precheck.readyForEvidenceImport
      && slots.every((slot) => !slot.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !precheck.readyForRuntimePayload
      && slots.every((slot) => !slot.readyForRuntimePayload),
    liveExecutionStillBlocked: !precheck.readyForLiveExecution,
    productionExecutionStillBlocked: !precheck.readyForProductionExecution,
    noSideEffectsAllowed:
      !precheck.executionAllowed
      && !precheck.writeRoutingAllowed
      && !precheck.startsServices
      && !precheck.mutatesSiblingState
      && !precheck.importsRuntimePayload,
    nextStepRequiresRealManualComparedPackageEvidence: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeBlockedReasons(
  gates: IntakeGates,
): string[] {
  const blockedReasonCodes: string[] = [];
  const reasonByGate: Record<keyof IntakeGates, string> = {
    sourceComparisonAcceptancePrecheckReady: "SOURCE_COMPARISON_ACCEPTANCE_PRECHECK_NOT_READY",
    slotCountComplete: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS_NOT_COMPLETE",
    guardCountComplete: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_NOT_COMPLETE",
    slotVersionsSequential: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOT_VERSIONS_NOT_SEQUENTIAL",
    guardVersionsSequential: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARD_VERSIONS_NOT_SEQUENTIAL",
    allSlotsReady: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS_BLOCKED",
    allGuardsReady: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_BLOCKED",
    allSlotRequirementsDeclared: "COMPARED_PACKAGE_EVIDENCE_INTAKE_REQUIREMENTS_NOT_DECLARED",
    allManualEvidenceFieldsDeclared: "COMPARED_PACKAGE_EVIDENCE_INTAKE_FIELDS_NOT_DECLARED",
    allGuardTextsDeclared: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARD_TEXTS_NOT_DECLARED",
    allSourceCheckpointsCovered: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_CHECKPOINTS_NOT_COVERED",
    allSourceGuardsCovered: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_GUARDS_NOT_COVERED",
    sourceCheckpointCountStillTen: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_CHECKPOINT_COUNT_CHANGED",
    sourceGuardCountStillTen: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_GUARD_COUNT_CHANGED",
    sourceReadyCheckpointCountStillTen: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_READY_CHECKPOINT_COUNT_CHANGED",
    sourceReadyGuardCountStillTen: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_READY_GUARD_COUNT_CHANGED",
    sourcePrecheckDigestPresent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_PRECHECK_DIGEST_MISSING",
    sourceComparisonPreflightDigestPresent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_COMPARISON_DIGEST_MISSING",
    sourcePrecheckStillNoAcceptanceEvidence: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_ACCEPTANCE_EVIDENCE_ALREADY_PRESENT",
    sourceStillNoComparedPackage: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_COMPARED_PACKAGE_ALREADY_PRESENT",
    sourceStillNoAcceptedPackage: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SOURCE_ACCEPTED_PACKAGE_ALREADY_PRESENT",
    realComparedPackageEvidenceStillAbsent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_REAL_EVIDENCE_ALREADY_PRESENT",
    manualComparedPackageEvidenceMaterializationStillAbsent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_MATERIALIZED_TOO_EARLY",
    actualAcceptanceEvidenceStillZero: "COMPARED_PACKAGE_EVIDENCE_INTAKE_ACCEPTANCE_EVIDENCE_NONZERO",
    approvalGrantStillAbsent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_APPROVAL_GRANT_PRESENT",
    signedApprovalStillAbsent: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SIGNED_APPROVAL_PRESENT",
    allSlotsReadOnly: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS_NOT_READ_ONLY",
    allGuardsReadOnly: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_NOT_READ_ONLY",
    allGuardsRejectMissingRealEvidence: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_MISSING_REAL_EVIDENCE",
    allGuardsRejectSyntheticEvidence: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_SYNTHETIC_EVIDENCE",
    allGuardsBlockAcceptance: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_ACCEPTANCE",
    allGuardsBlockApprovalGrant: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_APPROVAL_GRANT",
    allGuardsBlockSignedApproval: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_SIGNED_APPROVAL",
    allGuardsBlockRuntimePayload: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_RUNTIME_PAYLOAD",
    allGuardsBlockWrites: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_WRITES",
    allGuardsBlockSiblingMutation: "COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS_ALLOW_SIBLING_MUTATION",
    signedApprovalDraftStillDisabled: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SIGNED_APPROVAL_DRAFT_ENABLED_TOO_EARLY",
    signedApprovalCaptureStillDisabled: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SIGNED_APPROVAL_CAPTURE_ENABLED_TOO_EARLY",
    operatorValueSupplyStillDisabled: "COMPARED_PACKAGE_EVIDENCE_INTAKE_OPERATOR_VALUE_SUPPLY_ENABLED_TOO_EARLY",
    evidenceImportStillBlocked: "COMPARED_PACKAGE_EVIDENCE_INTAKE_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    runtimePayloadStillBlocked: "COMPARED_PACKAGE_EVIDENCE_INTAKE_RUNTIME_PAYLOAD_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "COMPARED_PACKAGE_EVIDENCE_INTAKE_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "COMPARED_PACKAGE_EVIDENCE_INTAKE_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "COMPARED_PACKAGE_EVIDENCE_INTAKE_SIDE_EFFECTS_ENABLED",
    nextStepRequiresRealManualComparedPackageEvidence: "COMPARED_PACKAGE_EVIDENCE_INTAKE_NEXT_STEP_NOT_REAL_MANUAL_EVIDENCE",
  };

  for (const [gate, passed] of Object.entries(gates) as [keyof IntakeGates, boolean][]) {
    if (!passed) {
      blockedReasonCodes.push(reasonByGate[gate]);
    }
  }

  return blockedReasonCodes;
}
