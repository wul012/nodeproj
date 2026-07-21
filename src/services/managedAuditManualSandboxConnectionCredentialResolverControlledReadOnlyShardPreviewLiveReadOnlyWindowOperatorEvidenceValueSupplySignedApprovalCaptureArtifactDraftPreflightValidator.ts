import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";
import { collectBlockedReasons } from "./blockedReasonKernel.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField[],
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates {
  return {
    sourceSignedApprovalCaptureArtifactPreflightReady: preflight.readyForSignedApprovalCaptureArtifactPreflight,
    draftFieldCountComplete:
      fields.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VERSIONS.length,
    draftGuardCountComplete:
      guards.length
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VERSIONS.length,
    fieldVersionsSequential: fields.every((field, index) =>
      field.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VERSIONS[index]),
    guardVersionsSequential: guards.every((guard, index) =>
      guard.nodeVersion
        === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_VERSIONS[index]),
    sourceArtifactFragmentsReady: fields.every((field) => field.sourceArtifactFragmentReady),
    sourceArtifactSealsReady: fields.every((field) => field.sourceArtifactSealReady),
    allFieldsReady: fields.every((field) => field.readyForSignedApprovalArtifactDraftPreflightField),
    allGuardsReady: guards.every((guard) => guard.readyForSignedApprovalArtifactDraftPreflightGuard),
    allFieldsRequired: fields.every((field) => field.requiredForArtifactDraftPreflight),
    allFieldPurposesDeclared: fields.every((field) => field.fieldPurpose.length > 0),
    allDraftBlockersDeclared: fields.every((field) => field.draftBlockerCode.length > 0),
    allRequiredArtifactFragmentsCovered: fields.every((field) => field.requiredArtifactFragmentPresent),
    allGuardsRejectMissingFields: guards.every((guard) => guard.rejectsMissingField),
    allGuardsBlockUnsignedDraft: guards.every((guard) => guard.blocksUnsignedDraft),
    allGuardsBlockAutoCapture: guards.every((guard) => guard.blocksAutoCapture),
    allGuardsBlockRuntimePayload: guards.every((guard) => guard.blocksRuntimePayload),
    allGuardsBlockWrites: guards.every((guard) => guard.blocksWrites),
    allGuardsBlockSiblingMutation: guards.every((guard) => guard.blocksSiblingMutation),
    sourceArtifactPreflightDigestPresent:
      /^[a-f0-9]{64}$/.test(preflight.signedApprovalCaptureArtifactPreflightDigest),
    sourceCapturePreflightDigestPresent:
      /^[a-f0-9]{64}$/.test(preflight.sourceSignedApprovalCapturePreflightDigest),
    sourceTemplateDigestPresent: /^[a-f0-9]{64}$/.test(preflight.sourceSignedApprovalTemplateDigest),
    sourceReviewDigestPresent: /^[a-f0-9]{64}$/.test(preflight.sourceApprovalPacketReviewDigest),
    sourceArtifactPreflightStillPreflightOnly:
      preflight.readyForSignedApprovalCaptureArtifactPreflight
      && preflight.artifactPreflightState === "ready-for-signed-approval-capture-artifact-preflight",
    sourceArtifactStillBlocked: !preflight.readyForSignedApprovalCapture,
    signedApprovalCaptureStillDisabled:
      !preflight.readyForSignedApprovalCapture
      && fields.every((field) => !field.readyForSignedApprovalCapture)
      && guards.every((guard) => !guard.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !preflight.readyForOperatorValueSupply
      && fields.every((field) => !field.readyForOperatorValueSupply)
      && guards.every((guard) => !guard.readyForOperatorValueSupply),
    noDraftArtifactCreated: fields.every((field) => !field.draftArtifactCreated),
    noDraftSignaturePayload:
      !preflight.containsSecretValue && fields.every((field) => !field.draftSignaturePayloadPresent),
    noApprovalGrantEmitted:
      !preflight.approvalGrantPresent && fields.every((field) => !field.approvalGrantEmitted),
    noSignedApprovalPresent: !preflight.signedApprovalPresent,
    evidenceImportStillBlocked:
      !preflight.readyForEvidenceImport
      && fields.every((field) => !field.readyForEvidenceImport)
      && guards.every((guard) => !guard.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !preflight.readyForRuntimePayload
      && fields.every((field) => !field.readyForRuntimePayload)
      && guards.every((guard) => !guard.readyForRuntimePayload),
    liveExecutionStillBlocked: !preflight.readyForLiveExecution,
    productionExecutionStillBlocked: !preflight.readyForProductionExecution,
    allFieldsReadOnly: fields.every((field) => field.readOnly),
    allGuardsReadOnly: guards.every((guard) => guard.readOnly),
    noSideEffectsAllowed:
      !preflight.writeRoutingAllowed
      && !preflight.startsServices
      && !preflight.mutatesSiblingState
      && fields.every((field) => !field.writesAllowed && !field.startsServices && !field.mutatesSiblingState)
      && guards.every((guard) => !guard.writesAllowed && !guard.startsServices && !guard.mutatesSiblingState),
    nextStepRequiresManualSignedApprovalDraft: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates,
): string[] {
  return collectBlockedReasons([
    [
      gates.sourceSignedApprovalCaptureArtifactPreflightReady,
      "SOURCE_SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_NOT_READY",
    ],
    [gates.draftFieldCountComplete, "ARTIFACT_DRAFT_PREFLIGHT_FIELD_COUNT_INCOMPLETE"],
    [gates.draftGuardCountComplete, "ARTIFACT_DRAFT_PREFLIGHT_GUARD_COUNT_INCOMPLETE"],
    [gates.fieldVersionsSequential, "ARTIFACT_DRAFT_PREFLIGHT_FIELD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.guardVersionsSequential, "ARTIFACT_DRAFT_PREFLIGHT_GUARD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceArtifactFragmentsReady, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_FRAGMENTS_NOT_READY"],
    [gates.sourceArtifactSealsReady, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_SEALS_NOT_READY"],
    [gates.allFieldsReady, "ARTIFACT_DRAFT_PREFLIGHT_FIELDS_NOT_READY"],
    [gates.allGuardsReady, "ARTIFACT_DRAFT_PREFLIGHT_GUARDS_NOT_READY"],
    [gates.allFieldsRequired, "ARTIFACT_DRAFT_PREFLIGHT_FIELDS_NOT_REQUIRED"],
    [gates.allFieldPurposesDeclared, "ARTIFACT_DRAFT_PREFLIGHT_FIELD_PURPOSES_MISSING"],
    [gates.allDraftBlockersDeclared, "ARTIFACT_DRAFT_PREFLIGHT_BLOCKERS_MISSING"],
    [gates.allRequiredArtifactFragmentsCovered, "ARTIFACT_DRAFT_PREFLIGHT_FRAGMENT_COVERAGE_MISSING"],
    [gates.allGuardsRejectMissingFields, "ARTIFACT_DRAFT_PREFLIGHT_GUARDS_DO_NOT_REJECT_MISSING_FIELDS"],
    [gates.allGuardsBlockUnsignedDraft, "ARTIFACT_DRAFT_PREFLIGHT_UNSIGNED_DRAFT_NOT_BLOCKED"],
    [gates.allGuardsBlockAutoCapture, "ARTIFACT_DRAFT_PREFLIGHT_AUTO_CAPTURE_NOT_BLOCKED"],
    [gates.allGuardsBlockRuntimePayload, "ARTIFACT_DRAFT_PREFLIGHT_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allGuardsBlockWrites, "ARTIFACT_DRAFT_PREFLIGHT_WRITES_NOT_BLOCKED"],
    [gates.allGuardsBlockSiblingMutation, "ARTIFACT_DRAFT_PREFLIGHT_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceArtifactPreflightDigestPresent, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_ARTIFACT_DIGEST_MISSING"],
    [gates.sourceCapturePreflightDigestPresent, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_CAPTURE_DIGEST_MISSING"],
    [gates.sourceTemplateDigestPresent, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_TEMPLATE_DIGEST_MISSING"],
    [gates.sourceReviewDigestPresent, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.sourceArtifactPreflightStillPreflightOnly, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_NOT_PREFLIGHT_ONLY"],
    [gates.sourceArtifactStillBlocked, "ARTIFACT_DRAFT_PREFLIGHT_SOURCE_ARTIFACT_ENABLED"],
    [gates.signedApprovalCaptureStillDisabled, "ARTIFACT_DRAFT_PREFLIGHT_SIGNED_APPROVAL_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "ARTIFACT_DRAFT_PREFLIGHT_OPERATOR_VALUE_SUPPLY_ENABLED"],
    [gates.noDraftArtifactCreated, "ARTIFACT_DRAFT_PREFLIGHT_DRAFT_ALREADY_CREATED"],
    [gates.noDraftSignaturePayload, "ARTIFACT_DRAFT_PREFLIGHT_SIGNATURE_PAYLOAD_PRESENT"],
    [gates.noApprovalGrantEmitted, "ARTIFACT_DRAFT_PREFLIGHT_APPROVAL_GRANT_EMITTED"],
    [gates.noSignedApprovalPresent, "ARTIFACT_DRAFT_PREFLIGHT_SIGNED_APPROVAL_PRESENT"],
    [gates.evidenceImportStillBlocked, "ARTIFACT_DRAFT_PREFLIGHT_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "ARTIFACT_DRAFT_PREFLIGHT_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "ARTIFACT_DRAFT_PREFLIGHT_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "ARTIFACT_DRAFT_PREFLIGHT_PRODUCTION_EXECUTION_ENABLED"],
    [gates.allFieldsReadOnly, "ARTIFACT_DRAFT_PREFLIGHT_FIELD_NOT_READ_ONLY"],
    [gates.allGuardsReadOnly, "ARTIFACT_DRAFT_PREFLIGHT_GUARD_NOT_READ_ONLY"],
    [gates.noSideEffectsAllowed, "ARTIFACT_DRAFT_PREFLIGHT_SIDE_EFFECTS_ALLOWED"],
    [gates.nextStepRequiresManualSignedApprovalDraft, "ARTIFACT_DRAFT_PREFLIGHT_NEXT_STEP_NOT_MANUAL_DRAFT"],
  ]);
}
