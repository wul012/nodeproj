import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateCatalog.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockers,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSections,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBuilder.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

type CandidateSection =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection;
type CandidateBlocker =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker;
type CandidateGates =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates;
type EvaluationPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight;

function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates(
  preflight: EvaluationPreflight,
  sections: readonly CandidateSection[],
  blockers: readonly CandidateBlocker[],
): CandidateGates {
  const expectedVersions = [
    ...CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_VERSIONS,
  ];
  const sourceRuleKindsCovered = new Set(sections.flatMap((section) => section.sourceRuleKinds));
  const sourceRuleCodesCovered = new Set(
    sections.flatMap((section) =>
      preflight.rules
        .filter((rule) => section.sourceRuleKinds.includes(rule.kind))
        .map((rule) => rule.code)),
  );
  const candidateFields = sections.flatMap((section) => section.candidateFields);

  return {
    sourceEvaluationPreflightReady:
      preflight.readyForComparedEvidenceEvaluationPreflightContract,
    sectionCountComplete: sections.length === 10,
    blockerCountComplete: blockers.length === 10,
    sectionVersionsSequential:
      sections.map((section) => section.nodeVersion).join("|") === expectedVersions.join("|"),
    blockerVersionsSequential:
      blockers.map((blocker) => blocker.nodeVersion).join("|") === expectedVersions.join("|"),
    allSourceEvaluationRulesCovered:
      sourceRuleKindsCovered.size === preflight.rules.length,
    allSourceEvaluationGuardsCovered:
      preflight.guards.every((guard) => sourceRuleCodesCovered.has(guard.sourceRuleCode)),
    allSectionsReady:
      sections.every((section) => section.readyForComparedEvidenceCandidateBlueprintSection),
    allBlockersReady:
      blockers.every((blocker) => blocker.readyForComparedEvidenceCandidateBlueprintBlocker),
    allCandidateFieldsDeclared:
      sections.every((section) =>
        section.candidateFields.length > 0
        && section.candidateQuestion.length > 0),
    candidateFieldCountMatchesSourceRules:
      candidateFields.length === preflight.expectedRealComparedPackageEvidenceCandidateFieldCount,
    candidateFieldNamesUnique:
      new Set(candidateFields).size === candidateFields.length,
    sourceEvaluationRuleCountStillTwenty:
      preflight.evaluationRuleCount === 20,
    sourceEvaluationGuardCountStillTwenty:
      preflight.evaluationGuardCount === 20,
    sourceRealCandidateStillAbsent:
      preflight.realComparedPackageEvidenceCandidateCount === 0,
    sourceSyntheticCandidateStillAbsent:
      preflight.syntheticComparedPackageEvidenceCandidateCount === 0,
    candidateValuesStillAbsent:
      sections.every((section) =>
        section.realCandidateValueCount === 0
        && section.syntheticCandidateValueCount === 0),
    candidateMaterializationStillBlocked:
      sections.every((section) => section.materializedCandidateValueCount === 0)
      && blockers.every((blocker) => blocker.blocksCandidateMaterialization),
    candidateAcceptanceStillBlocked:
      sections.every((section) =>
        section.acceptedCandidateValueCount === 0
        && section.rejectedCandidateValueCount === 0)
      && blockers.every((blocker) => blocker.blocksCandidateAcceptance),
    allSectionsReadOnly:
      sections.every((section) =>
        section.readOnly
        && !section.writesAllowed
        && !section.startsServices
        && !section.mutatesSiblingState),
    allBlockersReadOnly:
      blockers.every((blocker) =>
        blocker.readOnly
        && !blocker.writesAllowed
        && !blocker.startsServices
        && !blocker.mutatesSiblingState),
    allBlockersRejectSyntheticCandidate:
      blockers.every((blocker) => blocker.rejectsSyntheticCandidate),
    allBlockersBlockApprovalGrant:
      blockers.every((blocker) => blocker.blocksApprovalGrant),
    allBlockersBlockSignedApproval:
      blockers.every((blocker) => blocker.blocksSignedApproval),
    allBlockersBlockRuntimePayload:
      blockers.every((blocker) => blocker.blocksRuntimePayload),
    allBlockersBlockWrites:
      blockers.every((blocker) => blocker.blocksWrites),
    allBlockersBlockSiblingMutation:
      blockers.every((blocker) => blocker.blocksSiblingMutation),
    signedApprovalDraftStillDisabled:
      !preflight.readyForSignedApprovalArtifactDraft,
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport,
    liveExecutionStillBlocked:
      !preflight.readyForLiveExecution,
    productionExecutionStillBlocked:
      !preflight.readyForProductionExecution,
    noSideEffectsAllowed:
      !preflight.executionAllowed
      && !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && !preflight.importsRuntimePayload,
    nextStepRequiresRealComparedPackageEvidenceCandidate: true,
  };
}

function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockedReasons(
  gates: CandidateGates,
): string[] {
  const reasonByGate: Record<keyof CandidateGates, string> = {
    sourceEvaluationPreflightReady: "COMPARED_EVIDENCE_CANDIDATE_SOURCE_PREFLIGHT_NOT_READY",
    sectionCountComplete: "COMPARED_EVIDENCE_CANDIDATE_SECTIONS_NOT_COMPLETE",
    blockerCountComplete: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_NOT_COMPLETE",
    sectionVersionsSequential: "COMPARED_EVIDENCE_CANDIDATE_SECTION_VERSIONS_NOT_SEQUENTIAL",
    blockerVersionsSequential: "COMPARED_EVIDENCE_CANDIDATE_BLOCKER_VERSIONS_NOT_SEQUENTIAL",
    allSourceEvaluationRulesCovered: "COMPARED_EVIDENCE_CANDIDATE_SOURCE_RULES_NOT_COVERED",
    allSourceEvaluationGuardsCovered: "COMPARED_EVIDENCE_CANDIDATE_SOURCE_GUARDS_NOT_COVERED",
    allSectionsReady: "COMPARED_EVIDENCE_CANDIDATE_SECTIONS_BLOCKED",
    allBlockersReady: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_BLOCKED",
    allCandidateFieldsDeclared: "COMPARED_EVIDENCE_CANDIDATE_FIELDS_NOT_DECLARED",
    candidateFieldCountMatchesSourceRules: "COMPARED_EVIDENCE_CANDIDATE_FIELD_COUNT_MISMATCH",
    candidateFieldNamesUnique: "COMPARED_EVIDENCE_CANDIDATE_FIELDS_NOT_UNIQUE",
    sourceEvaluationRuleCountStillTwenty: "COMPARED_EVIDENCE_CANDIDATE_SOURCE_RULE_COUNT_CHANGED",
    sourceEvaluationGuardCountStillTwenty: "COMPARED_EVIDENCE_CANDIDATE_SOURCE_GUARD_COUNT_CHANGED",
    sourceRealCandidateStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_REAL_SOURCE_ALREADY_PRESENT",
    sourceSyntheticCandidateStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_SYNTHETIC_SOURCE_PRESENT",
    candidateValuesStillAbsent: "COMPARED_EVIDENCE_CANDIDATE_VALUES_PRESENT_TOO_EARLY",
    candidateMaterializationStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_MATERIALIZED_TOO_EARLY",
    candidateAcceptanceStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_ACCEPTED_OR_REJECTED_TOO_EARLY",
    allSectionsReadOnly: "COMPARED_EVIDENCE_CANDIDATE_SECTIONS_NOT_READ_ONLY",
    allBlockersReadOnly: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_NOT_READ_ONLY",
    allBlockersRejectSyntheticCandidate: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_SYNTHETIC",
    allBlockersBlockApprovalGrant: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_APPROVAL_GRANT",
    allBlockersBlockSignedApproval: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_SIGNED_APPROVAL",
    allBlockersBlockRuntimePayload: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_RUNTIME_PAYLOAD",
    allBlockersBlockWrites: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_WRITES",
    allBlockersBlockSiblingMutation: "COMPARED_EVIDENCE_CANDIDATE_BLOCKERS_ALLOW_SIBLING_MUTATION",
    signedApprovalDraftStillDisabled: "COMPARED_EVIDENCE_CANDIDATE_SIGNED_APPROVAL_DRAFT_ENABLED_TOO_EARLY",
    evidenceImportStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_EVIDENCE_IMPORT_ENABLED_TOO_EARLY",
    liveExecutionStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_LIVE_EXECUTION_ENABLED_TOO_EARLY",
    productionExecutionStillBlocked: "COMPARED_EVIDENCE_CANDIDATE_PRODUCTION_EXECUTION_ENABLED_TOO_EARLY",
    noSideEffectsAllowed: "COMPARED_EVIDENCE_CANDIDATE_SIDE_EFFECTS_ENABLED",
    nextStepRequiresRealComparedPackageEvidenceCandidate: "COMPARED_EVIDENCE_CANDIDATE_NEXT_STEP_NOT_REAL_CANDIDATE",
  };

  return (Object.entries(gates) as [keyof CandidateGates, boolean][])
    .filter(([, passed]) => !passed)
    .map(([gate]) => reasonByGate[gate]);
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate(
  preflight: EvaluationPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate {
  const sections =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSections(
      preflight,
    );
  const blockers =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockers(
      sections,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateGates(
      preflight,
      sections,
      blockers,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockedReasons(
      gates,
    );
  const readyForComparedEvidenceCandidateBlueprintContract = blockedReasonCodes.length === 0;
  const candidateFieldCount = sections.reduce((sum, section) => sum + section.candidateFieldCount, 0);
  const signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
    sections: sections.map((section) => [
      section.order,
      section.nodeVersion,
      section.code,
      section.kind,
      section.candidateFields,
      section.readyForComparedEvidenceCandidateBlueprintSection,
    ]),
    blockers: blockers.map((blocker) => [
      blocker.order,
      blocker.nodeVersion,
      blocker.code,
      blocker.kind,
      blocker.sourceSectionCode,
      blocker.readyForComparedEvidenceCandidateBlueprintBlocker,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateVersion: "Node v1361",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion,
    artifactDraftTextPackageComparedEvidenceCandidateState:
      readyForComparedEvidenceCandidateBlueprintContract
        ? "waiting-for-real-compared-package-evidence-candidate"
        : "blocked",
    readyForComparedEvidenceCandidateBlueprintContract,
    readyForRealComparedPackageEvidenceCandidateIntake: false,
    readyForComparedEvidenceEvaluationPreflightContract:
      preflight.readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    blueprintSectionCount: sections.length,
    blueprintBlockerCount: blockers.length,
    sourceEvaluationRuleCount: preflight.evaluationRuleCount,
    sourceEvaluationGuardCount: preflight.evaluationGuardCount,
    readyBlueprintSectionCount:
      sections.filter((section) => section.readyForComparedEvidenceCandidateBlueprintSection).length,
    readyBlueprintBlockerCount:
      blockers.filter((blocker) => blocker.readyForComparedEvidenceCandidateBlueprintBlocker).length,
    candidateFieldCount,
    expectedCandidateFieldCountFromPreflight:
      preflight.expectedRealComparedPackageEvidenceCandidateFieldCount,
    realComparedPackageEvidenceCandidateValueCount: 0,
    syntheticComparedPackageEvidenceCandidateValueCount: 0,
    materializedComparedPackageEvidenceCandidateValueCount: 0,
    acceptedComparedPackageEvidenceCandidateValueCount: 0,
    rejectedComparedPackageEvidenceCandidateValueCount: 0,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest:
      preflight.signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
    sections,
    blockers,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateDigest,
    candidateBlueprintMaterializationAllowed: false,
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
