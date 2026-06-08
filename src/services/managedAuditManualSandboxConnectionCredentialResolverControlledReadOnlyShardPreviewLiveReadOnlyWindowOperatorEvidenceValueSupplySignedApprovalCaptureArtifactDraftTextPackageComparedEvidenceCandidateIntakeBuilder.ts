import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeTypes.js";

type Candidate =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidate;
type CandidateIntakeSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlot;
type CandidateIntakeGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuard;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeSlots(
  candidate: Candidate,
): CandidateIntakeSlot[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_SLOTS
    .map((template, index) => {
      const sourceSection = candidate.sections.find((section) => section.kind === template.sourceSectionKind);
      const sourceBlocker = sourceSection === undefined
        ? undefined
        : candidate.blockers.find((blocker) => blocker.sourceSectionCode === sourceSection.code);
      const sourceSectionReady =
        sourceSection?.readyForComparedEvidenceCandidateBlueprintSection === true;
      const sourceBlockerReady =
        sourceBlocker?.readyForComparedEvidenceCandidateBlueprintBlocker === true;
      const candidateFields = sourceSection?.candidateFields ?? [];
      const readyForComparedEvidenceCandidateIntakeSlot =
        candidate.readyForComparedEvidenceCandidateBlueprintContract
        && sourceSectionReady
        && sourceBlockerReady
        && candidateFields.length > 0
        && candidate.realComparedPackageEvidenceCandidateValueCount === 0
        && candidate.syntheticComparedPackageEvidenceCandidateValueCount === 0
        && candidate.materializedComparedPackageEvidenceCandidateValueCount === 0
        && candidate.acceptedComparedPackageEvidenceCandidateValueCount === 0
        && !candidate.approvalGrantPresent
        && !candidate.signedApprovalPresent
        && !candidate.candidateBlueprintMaterializationAllowed
        && !candidate.candidateEvaluationAllowed
        && !candidate.executionAllowed
        && !candidate.writeRoutingAllowed
        && !candidate.startsServices
        && !candidate.mutatesSiblingState
        && !candidate.importsRuntimePayload;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        slotName: template.slotName,
        kind: template.kind,
        sourceSectionKind: template.sourceSectionKind,
        sourceSectionCode: sourceSection?.code ?? "missing-source-section",
        sourceSectionReady,
        sourceBlockerReady,
        candidateFields: [...candidateFields],
        candidateFieldCount: candidateFields.length,
        intakeQuestion: template.intakeQuestion,
        readyForComparedEvidenceCandidateIntakeSlot,
        requiresRealCandidateDocument: true,
        realCandidateDocumentCount: 0,
        syntheticCandidateDocumentCount: 0,
        stagedCandidateDocumentCount: 0,
        importedCandidatePayloadCount: 0,
        evaluatedCandidatePayloadCount: 0,
        acceptedCandidatePayloadCount: 0,
        rejectedCandidatePayloadCount: 0,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedEvidenceCandidateIntakeGuards(
  slots: readonly CandidateIntakeSlot[],
): CandidateIntakeGuard[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_EVIDENCE_CANDIDATE_INTAKE_GUARDS
    .map((template, index) => {
      const sourceSlot = slots.find((slot) => slot.code === template.sourceSlotCode);
      const sourceSlotReady = sourceSlot?.readyForComparedEvidenceCandidateIntakeSlot === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceSlotCode: template.sourceSlotCode,
        sourceSlotReady,
        guardText: template.guardText,
        rejectsMissingCandidateDocument: true,
        rejectsSyntheticCandidateDocument: true,
        quarantinesUnreviewedCandidateDocument: true,
        blocksCandidatePayloadImport: true,
        blocksCandidateEvaluation: true,
        blocksCandidateAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForComparedEvidenceCandidateIntakeGuard: sourceSlotReady,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
