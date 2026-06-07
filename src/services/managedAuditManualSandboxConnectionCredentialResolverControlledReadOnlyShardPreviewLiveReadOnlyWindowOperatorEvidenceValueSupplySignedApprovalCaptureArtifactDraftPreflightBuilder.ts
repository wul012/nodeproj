import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_FIELDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_GUARDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFields(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField[] {
  const fragmentsByCode = new Map(preflight.fragments.map((fragment) => [fragment.code, fragment]));
  const sealsByFragmentCode = new Map(preflight.seals.map((seal) => [seal.sourceArtifactFragmentCode, seal]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_FIELDS
    .map((fieldTemplate, index) => {
      const sourceFragment = fragmentsByCode.get(fieldTemplate.sourceArtifactFragmentCode);
      const sourceSeal = sealsByFragmentCode.get(fieldTemplate.sourceArtifactFragmentCode);
      const sourceArtifactFragmentReady =
        preflight.readyForSignedApprovalCaptureArtifactPreflight
        && (sourceFragment?.readyForSignedApprovalCaptureArtifactPreflightFragment ?? false);
      const sourceArtifactSealReady =
        preflight.readyForSignedApprovalCaptureArtifactPreflight
        && (sourceSeal?.readyForSignedApprovalCaptureArtifactPreflightSeal ?? false);
      const sourceArtifactStillBlocked = !(sourceFragment?.readyForSignedApprovalCapture ?? true);
      const requiredArtifactFragmentPresent =
        sourceFragment?.fragmentName === fieldTemplate.requiredArtifactFragmentName;
      const readyForSignedApprovalArtifactDraftPreflightField =
        sourceArtifactFragmentReady
        && sourceArtifactSealReady
        && sourceArtifactStillBlocked
        && requiredArtifactFragmentPresent;

      return {
        order: index + 1,
        nodeVersion: fieldTemplate.nodeVersion,
        code: fieldTemplate.code,
        fieldName: fieldTemplate.fieldName,
        kind: fieldTemplate.kind,
        fieldMode: fieldTemplate.fieldMode,
        sourceArtifactFragmentCode: fieldTemplate.sourceArtifactFragmentCode,
        sourceArtifactFragmentReady,
        sourceArtifactSealReady,
        sourceArtifactStillBlocked,
        requiredArtifactFragmentName: fieldTemplate.requiredArtifactFragmentName,
        requiredArtifactFragmentPresent,
        draftBlockerCode: fieldTemplate.draftBlockerCode,
        fieldPurpose: fieldTemplate.fieldPurpose,
        requiredForArtifactDraftPreflight: true,
        draftArtifactCreated: false,
        draftSignaturePayloadPresent: false,
        approvalGrantEmitted: false,
        readyForSignedApprovalArtifactDraftPreflightField,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuards(
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard[] {
  const fieldsByCode = new Map(fields.map((field) => [field.code, field]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_GUARDS
    .map((guardTemplate, index) => {
      const sourceField = fieldsByCode.get(guardTemplate.sourceDraftFieldCode);
      const sourceDraftFieldReady =
        sourceField?.readyForSignedApprovalArtifactDraftPreflightField ?? false;
      const rejectsMissingField =
        sourceField?.draftBlockerCode.length
          ? guardTemplate.rejectionCode.includes("MISSING")
            || guardTemplate.rejectionCode.includes("REJECT")
            || guardTemplate.rejectionCode.includes("PRESENT")
            || guardTemplate.rejectionCode.includes("ENABLED")
            || guardTemplate.rejectionCode.includes("NONZERO")
            || guardTemplate.rejectionCode.includes("EMITTED")
          : false;
      const readyForSignedApprovalArtifactDraftPreflightGuard =
        sourceDraftFieldReady
        && rejectsMissingField
        && guardTemplate.rejectionCode.length > 0
        && guardTemplate.guardText.length > 0;

      return {
        order: index + 1,
        nodeVersion: guardTemplate.nodeVersion,
        code: guardTemplate.code,
        kind: guardTemplate.kind,
        sourceDraftFieldCode: guardTemplate.sourceDraftFieldCode,
        sourceDraftFieldReady,
        rejectionCode: guardTemplate.rejectionCode,
        guardText: guardTemplate.guardText,
        rejectsMissingField,
        blocksUnsignedDraft: true,
        blocksAutoCapture: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForSignedApprovalArtifactDraftPreflightGuard,
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
