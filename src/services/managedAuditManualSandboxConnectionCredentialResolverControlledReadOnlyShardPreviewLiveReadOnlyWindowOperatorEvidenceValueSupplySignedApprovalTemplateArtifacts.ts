import { sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauses,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFields,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateBuilder.js";
import {
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateBlockedReasons,
  createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateValidator.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseKind,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldKind,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate(
  review: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate {
  const fields =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFields(
      review,
    );
  const clauses =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauses(
      fields,
    );
  const gates =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates(
      review,
      fields,
      clauses,
    );
  const blockedReasonCodes =
    createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateBlockedReasons(
      gates,
    );
  const readyForSignedApprovalTemplatePreflight = blockedReasonCodes.length === 0;
  const signedApprovalTemplateDigest = sha256StableJson({
    signedApprovalTemplateVersion: "Node v1036",
    sourceApprovalPacketReviewVersion: review.approvalPacketReviewVersion,
    sourceApprovalPacketReviewDigest: review.approvalPacketReviewDigest,
    fields: fields.map((field) => [
      field.order,
      field.nodeVersion,
      field.code,
      field.fieldName,
      field.kind,
      field.valueClass,
      field.sourceReviewControlCode,
      field.missingFieldBlockerCode,
    ]),
    clauses: clauses.map((clause) => [
      clause.order,
      clause.nodeVersion,
      clause.code,
      clause.kind,
      clause.sourceTemplateFieldCode,
      clause.rejectionCode,
    ]),
    gates,
  });

  return {
    signedApprovalTemplateVersion: "Node v1036",
    sourceApprovalPacketReviewVersion: review.approvalPacketReviewVersion,
    templateState: readyForSignedApprovalTemplatePreflight
      ? "ready-for-signed-approval-template-preflight"
      : "blocked",
    readyForSignedApprovalTemplatePreflight,
    readyForSignedApprovalCapture: false,
    readyForOperatorValueSupply: false,
    readyForOperatorValueSubmission: false,
    readyForEvidenceImport: false,
    readyForRuntimePayload: false,
    readyForLiveExecution: false,
    readyForProductionExecution: false,
    templateFieldCount: fields.length,
    templateClauseCount: clauses.length,
    identityFieldCount: countFields(fields, "identity-field"),
    timeFieldCount: countFields(fields, "time-field"),
    sourceEvidenceFieldCount: countFields(fields, "source-evidence-field"),
    valueShapeFieldCount: countFields(fields, "value-shape-field"),
    policyFieldCount: countFields(fields, "policy-field"),
    executionLockFieldCount: countFields(fields, "execution-lock-field"),
    closeoutFieldCount: countFields(fields, "closeout-field"),
    requiredFieldCount: fields.filter((field) => field.required).length,
    readyFieldCount: fields.filter((field) => field.readyForSignedApprovalTemplateField).length,
    readyClauseCount: clauses.filter((clause) => clause.readyForSignedApprovalTemplateClause).length,
    missingFieldBlockerCount: fields.filter((field) => field.missingFieldBlockerCode.length > 0).length,
    rejectionClauseCount: countClauses(clauses, "rejection-clause"),
    nonExecutionClauseCount: countClauses(clauses, "non-execution-clause"),
    suppliedValueCount: 0,
    acceptedValueCount: 0,
    importedValueCount: 0,
    templateValueProvidedCount: 0,
    approvalCaptured: false,
    approvalGrantPresent: false,
    signedApprovalPresent: false,
    sourceApprovalPacketReviewDigest: review.approvalPacketReviewDigest,
    fields,
    clauses,
    gates,
    gateCount: Object.keys(gates).length,
    passedGateCount: Object.values(gates).filter(Boolean).length,
    blockedReasonCodes,
    signedApprovalTemplateDigest,
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
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField[],
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldKind,
): number {
  return fields.filter((field) => field.kind === kind).length;
}

function countClauses(
  clauses:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause[],
  kind: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseKind,
): number {
  return clauses.filter((clause) => clause.kind === kind).length;
}
