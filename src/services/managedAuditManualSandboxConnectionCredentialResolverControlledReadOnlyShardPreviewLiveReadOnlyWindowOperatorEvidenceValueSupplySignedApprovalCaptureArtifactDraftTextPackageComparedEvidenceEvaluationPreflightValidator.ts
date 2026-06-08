import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

type ComparedPackageEvidenceIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake;
type EvaluationRule =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule;
type EvaluationGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard;
type EvaluationGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates(
  intake: ComparedPackageEvidenceIntake,
  rules: readonly EvaluationRule[],
  guards: readonly EvaluationGuard[],
): EvaluationGates {
  const expectedVersions = [
    ...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_VERSIONS,
  ];
  const coveredSlotKinds = new Set<string>();
  const coveredGuardKinds = new Set<string>();

  for (const rule of rules) {
    for (const kind of rule.sourceSlotKinds) {
      coveredSlotKinds.add(kind);
    }
    for (const kind of rule.sourceGuardKinds) {
      coveredGuardKinds.add(kind);
    }
  }

  return {
    sourceComparedPackageEvidenceIntakeReady:
      intake.readyForManualComparedPackageEvidenceIntakeContract,
    ruleCountComplete: rules.length === 20,
    guardCountComplete: guards.length === 20,
    ruleVersionsSequential:
      rules.map((rule) => rule.nodeVersion).join("|") === expectedVersions.join("|"),
    guardVersionsSequential:
      guards.map((guard) => guard.nodeVersion).join("|") === expectedVersions.join("|"),
    allRulesReady:
      rules.every((rule) => rule.readyForComparedEvidenceEvaluationRule),
    allGuardsReady:
      guards.every((guard) => guard.readyForComparedEvidenceEvaluationGuard),
    allEvaluationQuestionsDeclared:
      rules.every((rule) => rule.evaluationQuestion.length > 0),
    allExpectedCandidateFieldsDeclared:
      rules.every((rule) => rule.expectedCandidateField.length > 0),
    allGuardTextsDeclared:
      guards.every((guard) => guard.guardText.length > 0),
    allSourceIntakeSlotsCovered:
      coveredSlotKinds.size === intake.slots.length,
    allSourceIntakeGuardsCovered:
      coveredGuardKinds.size === intake.guards.length,
    sourceIntakeSlotCountStillTen: intake.slotCount === 10,
    sourceIntakeGuardCountStillTen: intake.guardCount === 10,
    sourceReadyIntakeSlotCountStillTen: intake.readySlotCount === 10,
    sourceReadyIntakeGuardCountStillTen: intake.readyGuardCount === 10,
    sourceIntakeDigestPresent:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest.length === 64,
    sourceAcceptancePrecheckDigestPresent:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest.length === 64,
    sourceRealEvidenceStillAbsent:
      intake.realComparedPackageEvidenceCount === 0,
    sourceSyntheticEvidenceStillAbsent:
      intake.syntheticComparedPackageEvidenceCount === 0,
    realCandidateStillAbsent:
      rules.every((rule) => !rule.candidateValuePresent),
    candidateMaterializationStillAbsent:
      rules.every((rule) => !rule.candidateMaterialized),
    candidateSatisfiedCountStillZero:
      rules.every((rule) => !rule.realEvidenceCandidateSatisfied),
    candidateAcceptanceStillBlocked:
      rules.every((rule) => !rule.candidateAccepted && !rule.candidateRejected),
    allRulesReadOnly:
      rules.every((rule) =>
        rule.readOnly && !rule.writesAllowed && !rule.startsServices && !rule.mutatesSiblingState),
    allGuardsReadOnly:
      guards.every((guard) =>
        guard.readOnly && !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    allGuardsRejectMissingCandidate:
      guards.every((guard) => guard.rejectsMissingCandidate),
    allGuardsRejectSyntheticCandidate:
      guards.every((guard) => guard.rejectsSyntheticCandidate),
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
    signedApprovalDraftStillDisabled:
      !intake.readyForSignedApprovalArtifactDraft,
    signedApprovalCaptureStillDisabled:
      !intake.readyForSignedApprovalCapture,
    operatorValueSupplyStillDisabled:
      !intake.readyForOperatorValueSupply,
    evidenceImportStillBlocked:
      !intake.readyForEvidenceImport,
    runtimePayloadStillBlocked:
      !intake.readyForRuntimePayload,
    liveExecutionStillBlocked:
      !intake.readyForLiveExecution,
    productionExecutionStillBlocked:
      !intake.readyForProductionExecution,
    noSideEffectsAllowed:
      !intake.executionAllowed
      && !intake.writeRoutingAllowed
      && !intake.startsServices
      && !intake.mutatesSiblingState
      && !intake.importsRuntimePayload,
    nextStepRequiresRealComparedPackageEvidenceCandidate: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightBlockedReasons(
  gates: EvaluationGates,
): string[] {
  const blockedReasonCodes: string[] = [];
  const reasonByGate: Record<keyof EvaluationGates, string> = {
    sourceComparedPackageEvidenceIntakeReady: "SOURCE_COMPARED_PACKAGE_EVIDENCE_INTAKE_NOT_READY",
    ruleCountComplete: "COMPARED_EVIDENCE_EVALUATION_RULES_NOT_COMPLETE",
    guardCountComplete: "COMPARED_EVIDENCE_EVALUATION_GUARDS_NOT_COMPLETE",
    ruleVersionsSequential: "COMPARED_EVIDENCE_EVALUATION_RULE_VERSIONS_NOT_SEQUENTIAL",
    guardVersionsSequential: "COMPARED_EVIDENCE_EVALUATION_GUARD_VERSIONS_NOT_SEQUENTIAL",
    allRulesReady: "COMPARED_EVIDENCE_EVALUATION_RULES_BLOCKED",
    allGuardsReady: "COMPARED_EVIDENCE_EVALUATION_GUARDS_BLOCKED",
    allEvaluationQuestionsDeclared: "COMPARED_EVIDENCE_EVALUATION_QUESTIONS_NOT_DECLARED",
    allExpectedCandidateFieldsDeclared: "COMPARED_EVIDENCE_EVALUATION_FIELDS_NOT_DECLARED",
    allGuardTextsDeclared: "COMPARED_EVIDENCE_EVALUATION_GUARD_TEXTS_NOT_DECLARED",
    allSourceIntakeSlotsCovered: "COMPARED_EVIDENCE_EVALUATION_SOURCE_SLOTS_NOT_COVERED",
    allSourceIntakeGuardsCovered: "COMPARED_EVIDENCE_EVALUATION_SOURCE_GUARDS_NOT_COVERED",
    sourceIntakeSlotCountStillTen: "COMPARED_EVIDENCE_EVALUATION_SOURCE_SLOT_COUNT_CHANGED",
    sourceIntakeGuardCountStillTen: "COMPARED_EVIDENCE_EVALUATION_SOURCE_GUARD_COUNT_CHANGED",
    sourceReadyIntakeSlotCountStillTen: "COMPARED_EVIDENCE_EVALUATION_SOURCE_READY_SLOT_COUNT_CHANGED",
    sourceReadyIntakeGuardCountStillTen: "COMPARED_EVIDENCE_EVALUATION_SOURCE_READY_GUARD_COUNT_CHANGED",
    sourceIntakeDigestPresent: "COMPARED_EVIDENCE_EVALUATION_SOURCE_INTAKE_DIGEST_MISSING",
    sourceAcceptancePrecheckDigestPresent: "COMPARED_EVIDENCE_EVALUATION_SOURCE_ACCEPTANCE_PRECHECK_DIGEST_MISSING",
    sourceRealEvidenceStillAbsent: "COMPARED_EVIDENCE_EVALUATION_SOURCE_REAL_EVIDENCE_ALREADY_PRESENT",
    sourceSyntheticEvidenceStillAbsent: "COMPARED_EVIDENCE_EVALUATION_SOURCE_SYNTHETIC_EVIDENCE_PRESENT",
    realCandidateStillAbsent: "COMPARED_EVIDENCE_EVALUATION_REAL_CANDIDATE_ALREADY_PRESENT",
    candidateMaterializationStillAbsent: "COMPARED_EVIDENCE_EVALUATION_CANDIDATE_MATERIALIZED_TOO_EARLY",
    candidateSatisfiedCountStillZero: "COMPARED_EVIDENCE_EVALUATION_CANDIDATE_RULE_SATISFIED_TOO_EARLY",
    candidateAcceptanceStillBlocked: "COMPARED_EVIDENCE_EVALUATION_CANDIDATE_ACCEPTED_OR_REJECTED_TOO_EARLY",
    allRulesReadOnly: "COMPARED_EVIDENCE_EVALUATION_RULES_NOT_READ_ONLY",
    allGuardsReadOnly: "COMPARED_EVIDENCE_EVALUATION_GUARDS_NOT_READ_ONLY",
    allGuardsRejectMissingCandidate: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_MISSING_CANDIDATE",
    allGuardsRejectSyntheticCandidate: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_SYNTHETIC_CANDIDATE",
    allGuardsBlockCandidateAcceptance: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_CANDIDATE_ACCEPTANCE",
    allGuardsBlockApprovalGrant: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_APPROVAL_GRANT",
    allGuardsBlockSignedApproval: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_SIGNED_APPROVAL",
    allGuardsBlockRuntimePayload: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_RUNTIME_PAYLOAD",
    allGuardsBlockWrites: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_WRITES",
    allGuardsBlockSiblingMutation: "COMPARED_EVIDENCE_EVALUATION_GUARDS_ALLOW_SIBLING_MUTATION",
    signedApprovalDraftStillDisabled: "COMPARED_EVIDENCE_EVALUATION_SIGNED_APPROVAL_DRAFT_ENABLED_TOO_EARLY",
    signedApprovalCaptureStillDisabled: "COMPARED_EVIDENCE_EVALUATION_SIGNED_APPROVAL_CAPTURE_ENABLED_TOO_EARLY",
    operatorValueSupplyStillDisabled: "COMPARED_EVIDENCE_EVALUATION_OPERATOR_VALUE_SUPPLY_ENABLED_TOO_EARLY",
    evidenceImportStillBlocked: "COMPARED_EVIDENCE_EVALUATION_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    runtimePayloadStillBlocked: "COMPARED_EVIDENCE_EVALUATION_RUNTIME_PAYLOAD_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "COMPARED_EVIDENCE_EVALUATION_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "COMPARED_EVIDENCE_EVALUATION_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "COMPARED_EVIDENCE_EVALUATION_SIDE_EFFECTS_ENABLED",
    nextStepRequiresRealComparedPackageEvidenceCandidate: "COMPARED_EVIDENCE_EVALUATION_NEXT_STEP_NOT_REAL_CANDIDATE",
  };

  for (const [gate, passed] of Object.entries(gates) as [keyof EvaluationGates, boolean][]) {
    if (!passed) {
      blockedReasonCodes.push(reasonByGate[gate]);
    }
  }

  return blockedReasonCodes;
}
