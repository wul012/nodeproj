import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS,
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheckTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeTypes.js";

type AcceptancePrecheck =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparisonAcceptancePrecheck;
type IntakeSlot =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlot;
type IntakeGuard =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuard;

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeSlots(
  precheck: AcceptancePrecheck,
): IntakeSlot[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_SLOTS
    .map((template, index) => {
      const sourceCheckpoints = precheck.checkpoints.filter((checkpoint) =>
        template.sourceCheckpointKinds.includes(checkpoint.kind));
      const sourceGuards = precheck.guards.filter((guard) =>
        template.sourceGuardKinds.includes(guard.kind));
      const readyForManualComparedPackageEvidenceIntakeSlot =
        precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck
        && sourceCheckpoints.length > 0
        && sourceGuards.length > 0
        && sourceCheckpoints.every((checkpoint) =>
          checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint
          && checkpoint.readOnly
          && !checkpoint.writesAllowed
          && !checkpoint.startsServices
          && !checkpoint.mutatesSiblingState)
        && sourceGuards.every((guard) =>
          guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard
          && guard.readOnly
          && !guard.writesAllowed
          && !guard.startsServices
          && !guard.mutatesSiblingState)
        && precheck.actualDraftTextPackageAcceptanceEvidenceCount === 0
        && precheck.comparedDraftTextPackageCount === 0
        && precheck.acceptedDraftTextPackageCount === 0
        && !precheck.approvalGrantPresent
        && !precheck.signedApprovalPresent;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        slotName: template.slotName,
        kind: template.kind,
        slotMode: template.slotMode,
        sourceCheckpointKinds: [...template.sourceCheckpointKinds],
        sourceGuardKinds: [...template.sourceGuardKinds],
        sourceAcceptanceCheckpointCount: sourceCheckpoints.length,
        sourceAcceptanceGuardCount: sourceGuards.length,
        readySourceAcceptanceCheckpointCount:
          sourceCheckpoints.filter((checkpoint) =>
            checkpoint.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckCheckpoint).length,
        readySourceAcceptanceGuardCount:
          sourceGuards.filter((guard) =>
            guard.readyForOfflineSignedApprovalDraftTextPackageAcceptancePrecheckGuard).length,
        sourceAcceptancePrecheckReady:
          precheck.readyForSignedApprovalArtifactDraftTextPackageComparisonAcceptancePrecheck,
        sourceAcceptancePrecheckReadOnly:
          !precheck.executionAllowed
          && !precheck.writeRoutingAllowed
          && !precheck.startsServices
          && !precheck.mutatesSiblingState
          && !precheck.importsRuntimePayload,
        sourceStillNoAcceptanceEvidence:
          precheck.actualDraftTextPackageAcceptanceEvidenceCount === 0,
        requiredRealEvidence: template.requiredRealEvidence,
        manualEvidenceField: template.manualEvidenceField,
        readyForManualComparedPackageEvidenceIntakeSlot,
        manualComparedPackageEvidenceMaterialized: false,
        realComparedPackageEvidencePresent: false,
        syntheticComparedPackageEvidencePresent: false,
        comparedPackageAccepted: false,
        approvalGrantPresent: false,
        realSignedApprovalPresent: false,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageComparedPackageEvidenceIntakeGuards(
  slots: readonly IntakeSlot[],
): IntakeGuard[] {
  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_COMPARED_PACKAGE_EVIDENCE_INTAKE_GUARDS
    .map((template, index) => {
      const sourceSlot = slots.find((slot) => slot.code === template.sourceSlotCode);
      const sourceSlotReady = sourceSlot?.readyForManualComparedPackageEvidenceIntakeSlot === true;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceSlotCode: template.sourceSlotCode,
        sourceSlotReady,
        guardCode: template.guardCode,
        guardText: template.guardText,
        rejectsMissingRealComparedPackageEvidence: true,
        rejectsSyntheticComparedPackageEvidence: true,
        blocksComparedPackageAcceptance: true,
        blocksApprovalGrant: true,
        blocksSignedApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForManualComparedPackageEvidenceIntakeGuard: sourceSlotReady,
        readyForSignedApprovalArtifactDraft: false,
        readyForSignedApprovalCapture: false,
        readyForOperatorValueSupply: false,
        readyForEvidenceImport: false,
        readyForRuntimePayload: false,
        readOnly: true,
        writesAllowed: false,
        startsServices: false,
        mutatesSiblingState: false,
      };
    });
}
