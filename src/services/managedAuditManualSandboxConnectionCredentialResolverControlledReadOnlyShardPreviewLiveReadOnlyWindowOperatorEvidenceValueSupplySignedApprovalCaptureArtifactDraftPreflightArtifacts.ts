import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFields,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuards,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflightTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight(
  preflight: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactPreflight,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflight {
  const fields =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFields(
      preflight,
    );
  const guards =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuards(
      fields,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGates(
      preflight,
      fields,
      guards,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightBlockedReasons(
      gates,
    );
  const readyForSignedApprovalArtifactDraftPreflight = blockedReasonCodes.length === 0;
  const signedApprovalCaptureArtifactDraftPreflightDigest = sha256StableJson({
    signedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
    sourceSignedApprovalCaptureArtifactPreflightVersion:
      preflight.signedApprovalCaptureArtifactPreflightVersion,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.signedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    fields: fields.map((field) => [
      field.order,
      field.nodeVersion,
      field.code,
      field.fieldName,
      field.kind,
      field.fieldMode,
      field.sourceArtifactFragmentCode,
      field.draftBlockerCode,
    ]),
    guards: guards.map((guard) => [
      guard.order,
      guard.nodeVersion,
      guard.code,
      guard.kind,
      guard.sourceDraftFieldCode,
      guard.rejectionCode,
    ]),
    gates,
  });

  return {
    signedApprovalCaptureArtifactDraftPreflightVersion: "Node v1111",
    sourceSignedApprovalCaptureArtifactPreflightVersion:
      preflight.signedApprovalCaptureArtifactPreflightVersion,
    artifactDraftPreflightState: readyForSignedApprovalArtifactDraftPreflight
      ? "ready-for-signed-approval-artifact-draft-preflight"
      : "blocked",
    readyForSignedApprovalArtifactDraftPreflight,
    readyForSignedApprovalArtifactDraft: false,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    draftFieldCount: fields.length,
    draftGuardCount: guards.length,
    identityDraftFieldCount: countFields(fields, "identity-draft-field"),
    digestBindingDraftFieldCount: countFields(fields, "digest-binding-draft-field"),
    signatureEnvelopeDraftFieldCount: countFields(fields, "signature-envelope-draft-field"),
    sourceEvidenceDraftFieldCount: countFields(fields, "source-evidence-draft-field"),
    valueBindingDraftFieldCount: countFields(fields, "value-binding-draft-field"),
    policyDraftFieldCount: countFields(fields, "policy-draft-field"),
    executionLockDraftFieldCount: countFields(fields, "execution-lock-draft-field"),
    closeoutDraftFieldCount: countFields(fields, "closeout-draft-field"),
    requiredDraftFieldCount: fields.filter((field) => field.requiredForArtifactDraftPreflight).length,
    readyDraftFieldCount:
      fields.filter((field) => field.readyForSignedApprovalArtifactDraftPreflightField).length,
    readyDraftGuardCount: guards.filter((guard) => guard.readyForSignedApprovalArtifactDraftPreflightGuard).length,
    draftBlockerCount: fields.filter((field) => field.draftBlockerCode.length > 0).length,
    digestBindingGuardCount: countGuards(guards, "digest-binding-guard"),
    signatureEnvelopeGuardCount: countGuards(guards, "signature-envelope-guard"),
    policyGuardCount: countGuards(guards, "policy-guard"),
    noExecutionGuardCount: countGuards(guards, "no-execution-guard"),
    draftArtifactCreated: false,
    draftArtifactMaterializedCount: 0,
    draftSignaturePayloadCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceSignedApprovalCaptureArtifactPreflightDigest:
      preflight.signedApprovalCaptureArtifactPreflightDigest,
    sourceSignedApprovalCapturePreflightDigest: preflight.sourceSignedApprovalCapturePreflightDigest,
    sourceSignedApprovalTemplateDigest: preflight.sourceSignedApprovalTemplateDigest,
    sourceApprovalPacketReviewDigest: preflight.sourceApprovalPacketReviewDigest,
    fields,
    guards,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalCaptureArtifactDraftPreflightDigest,
    executionAllowed: false,
    writeRoutingAllowed: false,
    startsServices: false,
    mutatesSiblingState: false,
    importsRuntimePayload: false,
    acceptsSyntheticEvidence: false,
    containsSecretValue: false,
  };
}

function countFields(
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightField[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightFieldKind,
): number {
  return fields.filter((field) => field.kind === kind).length;
}

function countGuards(
  guards:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuard[],
  kind:
    ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalCaptureArtifactDraftPreflightGuardKind,
): number {
  return guards.filter((guard) => guard.kind === kind).length;
}
