import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_CLAUSES,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseCatalog.js";
import {
  CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_FIELDS,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldCatalog.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReviewTypes.js";
import type {
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause,
  ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.js";

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFields(
  review: ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview,
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField[] {
  const reviewControlsByCode = new Map(review.controls.map((control) => [control.code, control]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_FIELDS
    .map((template, index) => {
      const sourceControl = reviewControlsByCode.get(template.sourceReviewControlCode);
      const requiredReviewControlFieldPresent = sourceControl
        ? sourceControl.requiredApprovalFieldName === template.requiredReviewControlFieldName
          || sourceControl.requiredReviewRecordFieldName === template.requiredReviewControlFieldName
        : false;
      const sourceReviewControlReady =
        review.readyForValueSupplyApprovalPacketReview
        && (sourceControl?.readyForValueSupplyApprovalPacketReview ?? false);
      const sourceManualReviewRequired = sourceControl?.manualReviewRequired ?? false;
      const sourceAutoApprovalBlocked = !(sourceControl?.autoApprovalAllowed ?? true);
      const readyForSignedApprovalTemplateField =
        sourceReviewControlReady
        && sourceManualReviewRequired
        && sourceAutoApprovalBlocked
        && requiredReviewControlFieldPresent;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        fieldName: template.fieldName,
        kind: template.kind,
        valueClass: template.valueClass,
        sourceReviewControlCode: template.sourceReviewControlCode,
        sourceReviewControlReady,
        sourceManualReviewRequired,
        sourceAutoApprovalBlocked,
        requiredReviewControlFieldName: template.requiredReviewControlFieldName,
        requiredReviewControlFieldPresent,
        missingFieldBlockerCode: template.missingFieldBlockerCode,
        fieldPurpose: template.fieldPurpose,
        required: true,
        captureAllowedNow: false,
        valueProvided: false,
        containsSecretValue: false,
        readyForSignedApprovalTemplateField,
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

export function createControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauses(
  fields:
    readonly ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateField[],
): ControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClause[] {
  const fieldsByCode = new Map(fields.map((field) => [field.code, field]));

  return CONTROLLED_READ_ONLY_SHARD_PREVIEW_VALUE_SUPPLY_SIGNED_APPROVAL_TEMPLATE_CLAUSES
    .map((template, index) => {
      const sourceField = fieldsByCode.get(template.sourceTemplateFieldCode);
      const sourceTemplateFieldReady = sourceField?.readyForSignedApprovalTemplateField ?? false;
      const rejectsMissingField =
        sourceField?.missingFieldBlockerCode.length
          ? template.rejectionCode.includes("MISSING") || template.rejectionCode.includes("REJECT")
          : false;
      const readyForSignedApprovalTemplateClause =
        sourceTemplateFieldReady
        && rejectsMissingField
        && template.clauseText.length > 0
        && template.rejectionCode.length > 0;

      return {
        order: index + 1,
        nodeVersion: template.nodeVersion,
        code: template.code,
        kind: template.kind,
        sourceTemplateFieldCode: template.sourceTemplateFieldCode,
        sourceTemplateFieldReady,
        rejectionCode: template.rejectionCode,
        clauseText: template.clauseText,
        rejectsMissingField,
        blocksUnsignedApproval: true,
        blocksAutoApproval: true,
        blocksRuntimePayload: true,
        blocksWrites: true,
        blocksSiblingMutation: true,
        readyForSignedApprovalTemplateClause,
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
