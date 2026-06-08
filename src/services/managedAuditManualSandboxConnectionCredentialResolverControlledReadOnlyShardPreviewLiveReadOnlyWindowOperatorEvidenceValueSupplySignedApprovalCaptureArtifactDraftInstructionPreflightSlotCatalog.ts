import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS = [
  "Node v1187",
  "Node v1188",
  "Node v1189",
  "Node v1190",
  "Node v1191",
  "Node v1192",
  "Node v1193",
  "Node v1194",
  "Node v1195",
  "Node v1196",
  "Node v1197",
  "Node v1198",
  "Node v1199",
  "Node v1200",
  "Node v1201",
  "Node v1202",
  "Node v1203",
  "Node v1204",
  "Node v1205",
  "Node v1206",
  "Node v1207",
  "Node v1208",
  "Node v1209",
  "Node v1210",
  "Node v1211",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REQUIREMENTS
      .map((requirement, index) => ({
        nodeVersion:
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_VERSIONS[
            index
          ],
        code: `${requirement.code.replace("AUTHORING_READINESS", "INSTRUCTION_PREFLIGHT")}_SLOT`,
        instructionSlotName: `${requirement.authoringRequirementName}InstructionSlot`,
        kind: toInstructionSlotKind(requirement.kind),
        slotMode: toInstructionSlotMode(requirement.requirementMode),
        sourceAuthoringRequirementCode: requirement.code,
        sourceAuthoringBlockerCode: `${requirement.code}_BLOCKER`,
        sourceAuthoringRequirementKind: requirement.kind,
        sourceAuthoringRequirementMode: requirement.requirementMode,
        instructionPurpose:
          `Prepare a non-materialized draft instruction slot for: ${requirement.authoringPurpose}`,
      })),
  );

function toInstructionSlotKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind {
  switch (kind) {
    case "identity-authoring-requirement":
      return "identity-instruction-slot";
    case "digest-binding-authoring-requirement":
      return "digest-binding-instruction-slot";
    case "signature-envelope-authoring-requirement":
      return "signature-envelope-instruction-slot";
    case "source-evidence-authoring-requirement":
      return "source-evidence-instruction-slot";
    case "value-binding-authoring-requirement":
      return "value-binding-instruction-slot";
    case "policy-authoring-requirement":
      return "policy-instruction-slot";
    case "execution-lock-authoring-requirement":
      return "execution-lock-instruction-slot";
    case "archive-closeout-authoring-requirement":
      return "archive-closeout-instruction-slot";
  }
}

function toInstructionSlotMode(
  mode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftAuthoringReadinessRequirementMode,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode {
  switch (mode) {
    case "human-authoring-metadata":
      return "human-instruction-metadata";
    case "digest-authoring-pin":
      return "digest-instruction-pin";
    case "policy-authoring-check":
      return "policy-instruction-check";
    case "execution-lock-authoring-check":
      return "execution-lock-instruction-check";
    case "authoring-closeout":
      return "instruction-closeout";
  }
}
