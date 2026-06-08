import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuards,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRules,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

type ComparedPackageEvidenceIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight(
  intake: ComparedPackageEvidenceIntake,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight {
  const rules =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRules(
      intake,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuards(
      rules,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGates(
      intake,
      rules,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightBlockedReasons(
      gates,
    );
  const readyForComparedEvidenceEvaluationPreflightContract = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    rules: rules.map((rule) => [
      rule.order,
      rule.nodeVersion,
      rule.code,
      rule.kind,
      rule.expectedCandidateField,
      rule.sourceIntakeSlotCount,
      rule.sourceIntakeGuardCount,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceRuleCode,
      guard.guardCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightVersion: "Node v1351",
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeVersion,
    artifactDraftTextPackageComparedEvidenceEvaluationPreflightState:
      readyForComparedEvidenceEvaluationPreflightContract
        ? "waiting-for-real-compared-package-evidence"
        : "blocked",
    readyForComparedEvidenceEvaluationPreflightContract,
    readyForRealComparedPackageEvidenceEvaluation: false,
    readyForManualComparedPackageEvidenceIntakeContract:
      intake.readyForManualComparedPackageEvidenceIntakeContract,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    evaluationRuleCount: rules.length,
    evaluationGuardCount: guards.length,
    sourceIntakeSlotCount: intake.slotCount,
    sourceIntakeGuardCount: intake.guardCount,
    readyEvaluationRuleCount:
      rules.filter((rule) => rule.readyForComparedEvidenceEvaluationRule).length,
    readyEvaluationGuardCount:
      guards.filter((guard) => guard.readyForComparedEvidenceEvaluationGuard).length,
    satisfiedEvaluationRuleCount: 0,
    expectedRealComparedPackageEvidenceCandidateFieldCount: rules.length,
    realComparedPackageEvidenceCandidateCount: 0,
    syntheticComparedPackageEvidenceCandidateCount: 0,
    candidateMaterializedCount: 0,
    candidateAcceptedCount: 0,
    candidateRejectedCount: 0,
    acceptedComparedPackageEvidenceCount: 0,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest:
      intake.signedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeDigest,
    sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest:
      intake.sourceSignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckDigest,
    rules,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightDigest,
    evaluationAllowed: false,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}
