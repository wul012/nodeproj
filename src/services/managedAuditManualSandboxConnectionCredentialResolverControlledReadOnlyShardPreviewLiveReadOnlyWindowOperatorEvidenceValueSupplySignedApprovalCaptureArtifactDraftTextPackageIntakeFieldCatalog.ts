import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldTemplate,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeTypes.js";

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS = [
  "Node v1212",
  "Node v1213",
  "Node v1214",
  "Node v1215",
  "Node v1216",
  "Node v1217",
  "Node v1218",
  "Node v1219",
  "Node v1220",
  "Node v1221",
  "Node v1222",
  "Node v1223",
  "Node v1224",
  "Node v1225",
  "Node v1226",
  "Node v1227",
  "Node v1228",
  "Node v1229",
  "Node v1230",
  "Node v1231",
  "Node v1232",
  "Node v1233",
  "Node v1234",
  "Node v1235",
  "Node v1236",
] as const;

export const CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_FIELDS:
  readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldTemplate[]
  = Object.freeze(
    CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SLOTS
      .map((slot, index) => ({
        nodeVersion:
          CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_TEXT_PACKAGE_INTAKE_VERSIONS[
            index
          ],
        code: slot.code
          .replace("INSTRUCTION_PREFLIGHT", "TEXT_PACKAGE_INTAKE")
          .replace("_SLOT", "_FIELD"),
        intakeFieldName: slot.instructionSlotName.replace("InstructionSlot", "TextPackageIntakeField"),
        kind: toIntakeFieldKind(slot.kind),
        fieldMode: toIntakeFieldMode(slot.slotMode),
        sourceInstructionSlotCode: slot.code,
        sourceInstructionGuardCode: `${slot.code}_GUARD`,
        sourceInstructionSlotKind: slot.kind,
        sourceInstructionSlotMode: slot.slotMode,
        expectedShape: toExpectedShape(slot.kind),
        intakePurpose:
          `Declare the read-only draft text package field expected after instruction slot ${slot.code}; no signed text is accepted in this version.`,
      })),
  );

function toIntakeFieldKind(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind {
  return kind.replace("-instruction-slot", "-intake-field") as
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldKind;
}

function toIntakeFieldMode(
  mode:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotMode,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftTextPackageIntakeFieldMode {
  switch (mode) {
    case "human-instruction-metadata":
      return "text-package-metadata";
    case "digest-instruction-pin":
      return "digest-intake-pin";
    case "policy-instruction-check":
      return "policy-intake-check";
    case "execution-lock-instruction-check":
      return "execution-lock-intake-check";
    case "instruction-closeout":
      return "intake-closeout";
  }
}

function toExpectedShape(
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftInstructionPreflightSlotKind,
): string {
  switch (kind) {
    case "identity-instruction-slot":
      return "non-secret identity, signer, requester, or correlation handle";
    case "digest-binding-instruction-slot":
      return "lowercase sha256 digest pin with the source digest name";
    case "signature-envelope-instruction-slot":
      return "detached signature envelope metadata only, no private key or raw signature body";
    case "source-evidence-instruction-slot":
      return "source evidence handle plus stable digest reference";
    case "value-binding-instruction-slot":
      return "operator value handle and digest reference only, no credential value";
    case "policy-instruction-slot":
      return "approval policy assertion with version, review state, and rejection code";
    case "execution-lock-instruction-slot":
      return "explicit false execution, write, runtime, import, or sibling mutation flag";
    case "archive-closeout-instruction-slot":
      return "archive closeout handle with reviewer note and digest recheck status";
  }
}
