import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_VERSIONS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates(
  review: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField[],
  clauses:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates {
  return {
    sourceApprovalPacketReviewReady: review.readyForValueSupplyApprovalPacketReview,
    templateFieldCountComplete:
      fields.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_VERSIONS.length,
    templateClauseCountComplete:
      clauses.length === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_VERSIONS.length,
    fieldVersionsSequential: fields.every((field, index) =>
      field.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_VERSIONS[index]),
    clauseVersionsSequential: clauses.every((clause, index) =>
      clause.nodeVersion === CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_VERSIONS[index]),
    sourceReviewControlsReady: fields.every((field) => field.sourceReviewControlReady),
    allFieldsReady: fields.every((field) => field.readyForSignedApprovalTemplateField),
    allClausesReady: clauses.every((clause) => clause.readyForSignedApprovalTemplateClause),
    allFieldsRequired: fields.every((field) => field.required),
    allFieldPurposesDeclared: fields.every((field) => field.fieldPurpose.length > 0),
    allMissingFieldBlockersDeclared: fields.every((field) => field.missingFieldBlockerCode.length > 0),
    allRequiredReviewControlFieldsCovered: fields.every((field) => field.requiredReviewControlFieldPresent),
    allClausesRejectMissingFields: clauses.every((clause) => clause.rejectsMissingField),
    allClausesBlockUnsignedApproval: clauses.every((clause) => clause.blocksUnsignedApproval),
    allClausesBlockAutoApproval: clauses.every((clause) => clause.blocksAutoApproval),
    allClausesBlockRuntimePayload: clauses.every((clause) => clause.blocksRuntimePayload),
    allClausesBlockWrites: clauses.every((clause) => clause.blocksWrites),
    allClausesBlockSiblingMutation: clauses.every((clause) => clause.blocksSiblingMutation),
    sourceReviewDigestPresent: /^[a-f0-9]{64}$/.test(review.approvalPacketReviewDigest),
    manualReviewStillRequired:
      review.manualReviewRequiredControlCount === review.reviewControlCount
      && fields.every((field) => field.sourceManualReviewRequired),
    autoApprovalStillBlocked:
      review.autoApprovalBlockedControlCount === review.reviewControlCount
      && fields.every((field) => field.sourceAutoApprovalBlocked)
      && clauses.every((clause) => clause.blocksAutoApproval),
    noTemplateValuesProvided: fields.every((field) => !field.valueProvided),
    noSecretValues:
      !review.containsSecretValue && fields.every((field) => !field.containsSecretValue),
    signedApprovalCaptureStillBlocked:
      !review.readyForSignedApprovalCapture
      && fields.every((field) => !field.readyForSignedApprovalCapture)
      && clauses.every((clause) => !clause.readyForSignedApprovalCapture),
    operatorValueSupplyStillDisabled:
      !review.readyForOperatorValueSupply
      && fields.every((field) => !field.readyForOperatorValueSupply)
      && clauses.every((clause) => !clause.readyForOperatorValueSupply),
    evidenceImportStillBlocked:
      !review.readyForEvidenceImport
      && fields.every((field) => !field.readyForEvidenceImport)
      && clauses.every((clause) => !clause.readyForEvidenceImport),
    runtimePayloadStillBlocked:
      !review.readyForRuntimePayload
      && fields.every((field) => !field.readyForRuntimePayload)
      && clauses.every((clause) => !clause.readyForRuntimePayload),
    liveExecutionStillBlocked: !review.readyForLiveExecution,
    productionExecutionStillBlocked: !review.readyForProductionExecution,
    allFieldsReadOnly: fields.every((field) => field.readOnly),
    allClausesReadOnly: clauses.every((clause) => clause.readOnly),
    noWritesAllowed:
      !review.writeRoutingAllowed
      && fields.every((field) => !field.writesAllowed)
      && clauses.every((clause) => !clause.writesAllowed),
    noServiceStart:
      !review.startsServices
      && fields.every((field) => !field.startsServices)
      && clauses.every((clause) => !clause.startsServices),
    noSiblingMutation:
      !review.mutatesSiblingState
      && fields.every((field) => !field.mutatesSiblingState)
      && clauses.every((clause) => !clause.mutatesSiblingState),
    nextStepRequiresSignedApprovalCapturePreflight: true,
  };
}

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateBlockedReasons(
  gates: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateGates,
): string[] {
  return [
    gates.sourceApprovalPacketReviewReady ? null : "SOURCE_APPROVAL_PACKET_REVIEW_NOT_READY",
    gates.templateFieldCountComplete ? null : "SIGNED_TEMPLATE_FIELD_COUNT_INCOMPLETE",
    gates.templateClauseCountComplete ? null : "SIGNED_TEMPLATE_CLAUSE_COUNT_INCOMPLETE",
    gates.fieldVersionsSequential ? null : "SIGNED_TEMPLATE_FIELD_VERSIONS_NOT_SEQUENTIAL",
    gates.clauseVersionsSequential ? null : "SIGNED_TEMPLATE_CLAUSE_VERSIONS_NOT_SEQUENTIAL",
    gates.sourceReviewControlsReady ? null : "SIGNED_TEMPLATE_SOURCE_REVIEW_CONTROLS_NOT_READY",
    gates.allFieldsReady ? null : "SIGNED_TEMPLATE_FIELDS_NOT_READY",
    gates.allClausesReady ? null : "SIGNED_TEMPLATE_CLAUSES_NOT_READY",
    gates.allFieldsRequired ? null : "SIGNED_TEMPLATE_FIELDS_NOT_REQUIRED",
    gates.allFieldPurposesDeclared ? null : "SIGNED_TEMPLATE_FIELD_PURPOSES_MISSING",
    gates.allMissingFieldBlockersDeclared ? null : "SIGNED_TEMPLATE_MISSING_FIELD_BLOCKERS_MISSING",
    gates.allRequiredReviewControlFieldsCovered ? null : "SIGNED_TEMPLATE_REVIEW_FIELD_COVERAGE_MISSING",
    gates.allClausesRejectMissingFields ? null : "SIGNED_TEMPLATE_CLAUSES_DO_NOT_REJECT_MISSING_FIELDS",
    gates.allClausesBlockUnsignedApproval ? null : "SIGNED_TEMPLATE_UNSIGNED_APPROVAL_NOT_BLOCKED",
    gates.allClausesBlockAutoApproval ? null : "SIGNED_TEMPLATE_AUTO_APPROVAL_NOT_BLOCKED",
    gates.allClausesBlockRuntimePayload ? null : "SIGNED_TEMPLATE_RUNTIME_PAYLOAD_NOT_BLOCKED",
    gates.allClausesBlockWrites ? null : "SIGNED_TEMPLATE_WRITES_NOT_BLOCKED",
    gates.allClausesBlockSiblingMutation ? null : "SIGNED_TEMPLATE_SIBLING_MUTATION_NOT_BLOCKED",
    gates.sourceReviewDigestPresent ? null : "SIGNED_TEMPLATE_SOURCE_REVIEW_DIGEST_MISSING",
    gates.manualReviewStillRequired ? null : "SIGNED_TEMPLATE_MANUAL_REVIEW_NOT_REQUIRED",
    gates.autoApprovalStillBlocked ? null : "SIGNED_TEMPLATE_AUTO_APPROVAL_ENABLED",
    gates.noTemplateValuesProvided ? null : "SIGNED_TEMPLATE_VALUES_ALREADY_PROVIDED",
    gates.noSecretValues ? null : "SIGNED_TEMPLATE_SECRET_VALUE_PRESENT",
    gates.signedApprovalCaptureStillBlocked ? null : "SIGNED_TEMPLATE_CAPTURE_ENABLED",
    gates.operatorValueSupplyStillDisabled ? null : "SIGNED_TEMPLATE_OPERATOR_SUPPLY_ENABLED",
    gates.evidenceImportStillBlocked ? null : "SIGNED_TEMPLATE_EVIDENCE_IMPORT_ENABLED",
    gates.runtimePayloadStillBlocked ? null : "SIGNED_TEMPLATE_RUNTIME_PAYLOAD_ENABLED",
    gates.liveExecutionStillBlocked ? null : "SIGNED_TEMPLATE_LIVE_EXECUTION_ENABLED",
    gates.productionExecutionStillBlocked ? null : "SIGNED_TEMPLATE_PRODUCTION_EXECUTION_ENABLED",
    gates.allFieldsReadOnly ? null : "SIGNED_TEMPLATE_FIELD_NOT_READ_ONLY",
    gates.allClausesReadOnly ? null : "SIGNED_TEMPLATE_CLAUSE_NOT_READ_ONLY",
    gates.noWritesAllowed ? null : "SIGNED_TEMPLATE_WRITES_ALLOWED",
    gates.noServiceStart ? null : "SIGNED_TEMPLATE_SERVICE_START_ENABLED",
    gates.noSiblingMutation ? null : "SIGNED_TEMPLATE_SIBLING_MUTATION_ENABLED",
    gates.nextStepRequiresSignedApprovalCapturePreflight ? null : "SIGNED_TEMPLATE_NEXT_STEP_NOT_CAPTURE_PREFLIGHT",
  ].filter((reason): reason is string => reason !== null);
}
