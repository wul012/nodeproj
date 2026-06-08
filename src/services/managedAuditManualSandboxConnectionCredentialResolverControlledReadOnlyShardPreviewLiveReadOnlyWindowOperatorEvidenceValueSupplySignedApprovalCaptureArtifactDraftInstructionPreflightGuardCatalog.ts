import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";

type InstructionGuardKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardKind;
type SourceAuthoringBlockerKind =
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardTemplate[
    "sourceAuthoringBlockerKind"
  ];

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_GUARDS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightGuardTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS
      .map((slot) => ({
        nodeVersion: slot.nodeVersion,
        code: `${slot.code}_GUARD`,
        kind: toInstructionGuardKind(slot.kind),
        sourceInstructionSlotCode: slot.code,
        sourceAuthoringBlockerKind: toSourceBlockerKind(slot.kind),
        guardCode: `REJECT_${slot.code}_MISSING`,
        guardText:
          `Block draft instruction preflight unless ${slot.instructionSlotName} is ready and unmaterialized.`,
      })),
  );

function toInstructionGuardKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
): InstructionGuardKind {
  return kind.replace("-slot", "-guard") as InstructionGuardKind;
}

function toSourceBlockerKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
): SourceAuthoringBlockerKind {
  return kind.replace("-instruction-slot", "-authoring-blocker") as SourceAuthoringBlockerKind;
}
