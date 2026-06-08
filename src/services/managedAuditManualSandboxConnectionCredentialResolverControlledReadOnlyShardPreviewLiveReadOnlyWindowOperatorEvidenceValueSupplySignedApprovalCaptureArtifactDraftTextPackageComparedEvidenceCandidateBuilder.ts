import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_BLOCKERS,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SECTIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflightTypes.js";

type CandidateSection =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSection;
type CandidateBlocker =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlocker;
type EvaluationPreflight =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceEvaluationPreflight;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateSections(
  preflight: EvaluationPreflight,
): CandidateSection[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_SECTIONS
    .map((template, index) => {
      const sourceRules = preflight.rules.filter((rule) =>
        template.sourceRuleKinds.includes(rule.kind));
      const sourceRuleCodes = new Set(sourceRules.map((rule) => rule.code));
      const sourceGuards = preflight.guards.filter((guard) =>
        sourceRuleCodes.has(guard.sourceRuleCode));
      const readyForComparedEvidenceCandidateBlueprintSection =
        preflight.readyForComparedEvidenceEvaluationPreflightContract
        && sourceRules.length === template.sourceRuleKinds.length
        && sourceRules.length === template.candidateFields.length
        && sourceRules.every((rule) =>
          rule.readyForComparedEvidenceEvaluationRule
          && template.candidateFields.includes(rule.expectedCandidateField)
          && !rule.candidateValuePresent
          && !rule.candidateMaterialized
          && !rule.candidateAccepted
          && !rule.candidateRejected
          && rule.readOnly
          && !rule.writesAllowed
          && !rule.startsServices
          && !rule.mutatesSiblingState)
        && sourceGuards.every((guard) =>
          guard.readyForComparedEvidenceEvaluationGuard
          && guard.rejectsMissingCandidate
          && guard.rejectsSyntheticCandidate
          && guard.blocksCandidateAcceptance
          && guard.blocksRuntimePayload
          && guard.blocksWrites
          && guard.blocksSiblingMutation
          && guard.readOnly
          && !guard.writesAllowed
          && !guard.startsServices
          && !guard.mutatesSiblingState)
        && preflight.realComparedPackageEvidenceCandidateCount === 0
        && preflight.syntheticComparedPackageEvidenceCandidateCount === 0
        && preflight.candidateMaterializedCount === 0
        && preflight.candidateAcceptedCount === 0
        && !preflight.approvalGrantPresent
        && !preflight.signedApprovalPresent;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        sectionName: template.sectionName,
        kind: template.kind,
        sourceRuleKinds: [...template.sourceRuleKinds],
        sourceEvaluationRuleCount: sourceRules.length,
        readySourceEvaluationRuleCount:
          sourceRules.filter((rule) => rule.readyForComparedEvidenceEvaluationRule).length,
        sourceEvaluationGuardCount: sourceGuards.length,
        readySourceEvaluationGuardCount:
          sourceGuards.filter((guard) => guard.readyForComparedEvidenceEvaluationGuard).length,
        candidateFields: [...template.candidateFields],
        candidateFieldCount: template.candidateFields.length,
        candidateQuestion: template.candidateQuestion,
        readyForComparedEvidenceCandidateBlueprintSection,
        realCandidateValueCount: 0,
        syntheticCandidateValueCount: 0,
        materializedCandidateValueCount: 0,
        acceptedCandidateValueCount: 0,
        rejectedCandidateValueCount: 0,
        blockedByMissingRealCandidate: true,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateBlockers(
  sections: readonly CandidateSection[],
): CandidateBlocker[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_BLOCKERS
    .map((template, index) => {
      const sourceSection = sections.find((section) => section.code === template.sourceSectionCode);
      const sourceSectionReady =
        sourceSection?.readyForComparedEvidenceCandidateBlueprintSection === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceSectionCode: template.sourceSectionCode,
        sourceSectionReady,
        blockerText: template.blockerText,
        rejectsMissingCandidate: true,
        rejectsSyntheticCandidate: true,
        blocksCandidateMaterialization: true,
        blocksCandidateAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForComparedEvidenceCandidateBlueprintBlocker: sourceSectionReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
