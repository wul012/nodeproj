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
import { collectBlockedReasons } from "./blockedReasonKernel.js";

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
  return collectBlockedReasons([
    [gates.sourceApprovalPacketReviewReady, "SOURCE_APPROVAL_PACKET_REVIEW_NOT_READY"],
    [gates.templateFieldCountComplete, "SIGNED_TEMPLATE_FIELD_COUNT_INCOMPLETE"],
    [gates.templateClauseCountComplete, "SIGNED_TEMPLATE_CLAUSE_COUNT_INCOMPLETE"],
    [gates.fieldVersionsSequential, "SIGNED_TEMPLATE_FIELD_VERSIONS_NOT_SEQUENTIAL"],
    [gates.clauseVersionsSequential, "SIGNED_TEMPLATE_CLAUSE_VERSIONS_NOT_SEQUENTIAL"],
    [gates.sourceReviewControlsReady, "SIGNED_TEMPLATE_SOURCE_REVIEW_CONTROLS_NOT_READY"],
    [gates.allFieldsReady, "SIGNED_TEMPLATE_FIELDS_NOT_READY"],
    [gates.allClausesReady, "SIGNED_TEMPLATE_CLAUSES_NOT_READY"],
    [gates.allFieldsRequired, "SIGNED_TEMPLATE_FIELDS_NOT_REQUIRED"],
    [gates.allFieldPurposesDeclared, "SIGNED_TEMPLATE_FIELD_PURPOSES_MISSING"],
    [gates.allMissingFieldBlockersDeclared, "SIGNED_TEMPLATE_MISSING_FIELD_BLOCKERS_MISSING"],
    [gates.allRequiredReviewControlFieldsCovered, "SIGNED_TEMPLATE_REVIEW_FIELD_COVERAGE_MISSING"],
    [gates.allClausesRejectMissingFields, "SIGNED_TEMPLATE_CLAUSES_DO_NOT_REJECT_MISSING_FIELDS"],
    [gates.allClausesBlockUnsignedApproval, "SIGNED_TEMPLATE_UNSIGNED_APPROVAL_NOT_BLOCKED"],
    [gates.allClausesBlockAutoApproval, "SIGNED_TEMPLATE_AUTO_APPROVAL_NOT_BLOCKED"],
    [gates.allClausesBlockRuntimePayload, "SIGNED_TEMPLATE_RUNTIME_PAYLOAD_NOT_BLOCKED"],
    [gates.allClausesBlockWrites, "SIGNED_TEMPLATE_WRITES_NOT_BLOCKED"],
    [gates.allClausesBlockSiblingMutation, "SIGNED_TEMPLATE_SIBLING_MUTATION_NOT_BLOCKED"],
    [gates.sourceReviewDigestPresent, "SIGNED_TEMPLATE_SOURCE_REVIEW_DIGEST_MISSING"],
    [gates.manualReviewStillRequired, "SIGNED_TEMPLATE_MANUAL_REVIEW_NOT_REQUIRED"],
    [gates.autoApprovalStillBlocked, "SIGNED_TEMPLATE_AUTO_APPROVAL_ENABLED"],
    [gates.noTemplateValuesProvided, "SIGNED_TEMPLATE_VALUES_ALREADY_PROVIDED"],
    [gates.noSecretValues, "SIGNED_TEMPLATE_SECRET_VALUE_PRESENT"],
    [gates.signedApprovalCaptureStillBlocked, "SIGNED_TEMPLATE_CAPTURE_ENABLED"],
    [gates.operatorValueSupplyStillDisabled, "SIGNED_TEMPLATE_OPERATOR_SUPPLY_ENABLED"],
    [gates.evidenceImportStillBlocked, "SIGNED_TEMPLATE_EVIDENCE_IMPORT_ENABLED"],
    [gates.runtimePayloadStillBlocked, "SIGNED_TEMPLATE_RUNTIME_PAYLOAD_ENABLED"],
    [gates.liveExecutionStillBlocked, "SIGNED_TEMPLATE_LIVE_EXECUTION_ENABLED"],
    [gates.productionExecutionStillBlocked, "SIGNED_TEMPLATE_PRODUCTION_EXECUTION_ENABLED"],
    [gates.allFieldsReadOnly, "SIGNED_TEMPLATE_FIELD_NOT_READ_ONLY"],
    [gates.allClausesReadOnly, "SIGNED_TEMPLATE_CLAUSE_NOT_READ_ONLY"],
    [gates.noWritesAllowed, "SIGNED_TEMPLATE_WRITES_ALLOWED"],
    [gates.noServiceStart, "SIGNED_TEMPLATE_SERVICE_START_ENABLED"],
    [gates.noSiblingMutation, "SIGNED_TEMPLATE_SIBLING_MUTATION_ENABLED"],
    [gates.nextStepRequiresSignedApprovalCapturePreflight, "SIGNED_TEMPLATE_NEXT_STEP_NOT_CAPTURE_PREFLIGHT"],
  ]);
}
