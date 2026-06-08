import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_GUARDS,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_RULES,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

type ComparedPackageEvidenceIntake =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntake;
type EvaluationRule =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRule;
type EvaluationGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuard;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightRules(
  intake: ComparedPackageEvidenceIntake,
): EvaluationRule[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_RULES
    .map((template, index) => {
      const sourceSlots = intake.slots.filter((slot) =>
        template.sourceSlotKinds.includes(slot.kind));
      const sourceGuards = intake.guards.filter((guard) =>
        template.sourceGuardKinds.includes(guard.kind));
      const readyForComparedEvidenceEvaluationRule =
        intake.readyForManualComparedPackageEvidenceIntakeContract
        && sourceSlots.length > 0
        && sourceGuards.length > 0
        && sourceSlots.every((slot) =>
          slot.readyForManualComparedPackageEvidenceIntakeSlot
          && slot.readOnly
          && !slot.writesAllowed
          && !slot.startsServices
          && !slot.mutatesSiblingState)
        && sourceGuards.every((guard) =>
          guard.readyForManualComparedPackageEvidenceIntakeGuard
          && guard.readOnly
          && !guard.writesAllowed
          && !guard.startsServices
          && !guard.mutatesSiblingState)
        && intake.realComparedPackageEvidenceCount === 0
        && intake.syntheticComparedPackageEvidenceCount === 0
        && intake.actualDraftTextPackageAcceptanceEvidenceCount === 0
        && !intake.approvalGrantPresent
        && !intake.signedApprovalPresent;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        ruleName: template.ruleName,
        kind: template.kind,
        sourceSlotKinds: [...template.sourceSlotKinds],
        sourceGuardKinds: [...template.sourceGuardKinds],
        sourceIntakeSlotCount: sourceSlots.length,
        sourceIntakeGuardCount: sourceGuards.length,
        readySourceIntakeSlotCount:
          sourceSlots.filter((slot) => slot.readyForManualComparedPackageEvidenceIntakeSlot).length,
        readySourceIntakeGuardCount:
          sourceGuards.filter((guard) => guard.readyForManualComparedPackageEvidenceIntakeGuard).length,
        sourceIntakeReady: intake.readyForManualComparedPackageEvidenceIntakeContract,
        sourceIntakeReadOnly:
          !intake.executionAllowed
          && !intake.writeRoutingAllowed
          && !intake.startsServices
          && !intake.mutatesSiblingState
          && !intake.importsRuntimePayload,
        sourceRealEvidenceStillAbsent:
          intake.realComparedPackageEvidenceCount === 0
          && intake.syntheticComparedPackageEvidenceCount === 0,
        expectedCandidateField: template.expectedCandidateField,
        evaluationQuestion: template.evaluationQuestion,
        readyForComparedEvidenceEvaluationRule,
        realEvidenceCandidateSatisfied: false,
        candidateValuePresent: false,
        candidateMaterialized: false,
        candidateAccepted: false,
        candidateRejected: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightGuards(
  rules: readonly EvaluationRule[],
): EvaluationGuard[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_EVALUATION_PREFLIGHT_GUARDS
    .map((template, index) => {
      const sourceRule = rules.find((rule) => rule.code === template.sourceRuleCode);
      const sourceRuleReady = sourceRule?.readyForComparedEvidenceEvaluationRule === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceRuleCode: template.sourceRuleCode,
        sourceRuleReady,
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsMissingCandidate: true,
        rejectsSyntheticCandidate: true,
        blocksCandidateAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForComparedEvidenceEvaluationGuard: sourceRuleReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
