import { renderEntries, renderProfileEntrySections } from "./liveProbeReportUtils.js";
import type { ControlledReadOnlyShardPreviewProfile } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.js";

const APPROVAL_SECTIONS = [
  approvalDraftSection,
  approvalReviewSection,
  approvalTemplateSection,
] as const;

export function renderControlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalPacketProfileSections(
  profile: ControlledReadOnlyShardPreviewProfile,
): string[] {
  return renderProfileEntrySections(APPROVAL_SECTIONS.map((buildSection) => buildSection(profile)));
}

function approvalDraftSection(profile: ControlledReadOnlyShardPreviewProfile) {
  const draft = profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketDraft;
  return {
    heading: "Live Read-Only Window Operator Evidence Value Supply Approval Packet Draft",
    lines: renderEntries({
      approvalPacketDraftVersion: draft.approvalPacketDraftVersion,
      sourceValueSupplyEnvelopeVersion: draft.sourceValueSupplyEnvelopeVersion,
      javaValueSupplyEvidenceVersion: draft.javaValueSupplyEvidenceVersion,
      miniKvValueSupplyEvidenceVersion: draft.miniKvValueSupplyEvidenceVersion,
      draftState: draft.draftState,
      readyForValueSupplyApprovalPacketDraft: draft.readyForValueSupplyApprovalPacketDraft,
      readyForOperatorValueSupply: draft.readyForOperatorValueSupply,
      readyForOperatorValueSubmission: draft.readyForOperatorValueSubmission,
      readyForEvidenceImport: draft.readyForEvidenceImport,
      readyForRuntimePayload: draft.readyForRuntimePayload,
      draftSlotCount: draft.draftSlotCount,
      javaEvidenceSlotCount: draft.javaEvidenceSlotCount,
      miniKvEvidenceSlotCount: draft.miniKvEvidenceSlotCount,
      nodeValueSupplyEnvelopeSlotCount: draft.nodeValueSupplyEnvelopeSlotCount,
      presentFileCount: draft.presentFileCount,
      matchedSnippetCount: draft.matchedSnippetCount,
      historicalFixtureResolvedFileCount: draft.historicalFixtureResolvedFileCount,
      approvalFieldCount: draft.approvalFieldCount,
      reviewRecordFieldCount: draft.reviewRecordFieldCount,
      suppliedValueCount: draft.suppliedValueCount,
      acceptedValueCount: draft.acceptedValueCount,
      importedValueCount: draft.importedValueCount,
      approvalCaptured: draft.approvalCaptured,
      approvalGrantPresent: draft.approvalGrantPresent,
      signedApprovalPresent: draft.signedApprovalPresent,
      importsRuntimePayload: draft.importsRuntimePayload,
      acceptsSyntheticEvidence: draft.acceptsSyntheticEvidence,
      containsSecretValue: draft.containsSecretValue,
      approvalPacketDraftDigest: draft.approvalPacketDraftDigest,
    }),
  };
}

function approvalReviewSection(profile: ControlledReadOnlyShardPreviewProfile) {
  const review = profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplyApprovalPacketReview;
  return {
    heading: "Live Read-Only Window Operator Evidence Value Supply Approval Packet Review",
    lines: renderEntries({
      approvalPacketReviewVersion: review.approvalPacketReviewVersion,
      sourceApprovalPacketDraftVersion: review.sourceApprovalPacketDraftVersion,
      reviewPackageState: review.reviewPackageState,
      readyForValueSupplyApprovalPacketReview: review.readyForValueSupplyApprovalPacketReview,
      readyForSignedApprovalCapture: review.readyForSignedApprovalCapture,
      readyForOperatorValueSupply: review.readyForOperatorValueSupply,
      readyForOperatorValueSubmission: review.readyForOperatorValueSubmission,
      readyForEvidenceImport: review.readyForEvidenceImport,
      readyForRuntimePayload: review.readyForRuntimePayload,
      reviewControlCount: review.reviewControlCount,
      approvalFieldReviewControlCount: review.approvalFieldReviewControlCount,
      policyReviewControlCount: review.policyReviewControlCount,
      sourceEvidenceReviewControlCount: review.sourceEvidenceReviewControlCount,
      executionLockReviewControlCount: review.executionLockReviewControlCount,
      closeoutReviewControlCount: review.closeoutReviewControlCount,
      manualReviewRequiredControlCount: review.manualReviewRequiredControlCount,
      autoApprovalBlockedControlCount: review.autoApprovalBlockedControlCount,
      suppliedValueCount: review.suppliedValueCount,
      acceptedValueCount: review.acceptedValueCount,
      importedValueCount: review.importedValueCount,
      approvalCaptured: review.approvalCaptured,
      approvalGrantPresent: review.approvalGrantPresent,
      signedApprovalPresent: review.signedApprovalPresent,
      importsRuntimePayload: review.importsRuntimePayload,
      acceptsSyntheticEvidence: review.acceptsSyntheticEvidence,
      containsSecretValue: review.containsSecretValue,
      approvalPacketReviewDigest: review.approvalPacketReviewDigest,
    }),
  };
}

function approvalTemplateSection(profile: ControlledReadOnlyShardPreviewProfile) {
  const template = profile.preview.liveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplate;
  return {
    heading: "Live Read-Only Window Operator Evidence Value Supply Signed Approval Template",
    lines: renderEntries({
      signedApprovalTemplateVersion: template.signedApprovalTemplateVersion,
      sourceApprovalPacketReviewVersion: template.sourceApprovalPacketReviewVersion,
      templateState: template.templateState,
      readyForSignedApprovalTemplatePreflight: template.readyForSignedApprovalTemplatePreflight,
      readyForSignedApprovalCapture: template.readyForSignedApprovalCapture,
      readyForOperatorValueSupply: template.readyForOperatorValueSupply,
      readyForOperatorValueSubmission: template.readyForOperatorValueSubmission,
      readyForEvidenceImport: template.readyForEvidenceImport,
      readyForRuntimePayload: template.readyForRuntimePayload,
      templateFieldCount: template.templateFieldCount,
      templateClauseCount: template.templateClauseCount,
      identityFieldCount: template.identityFieldCount,
      sourceEvidenceFieldCount: template.sourceEvidenceFieldCount,
      policyFieldCount: template.policyFieldCount,
      executionLockFieldCount: template.executionLockFieldCount,
      requiredFieldCount: template.requiredFieldCount,
      readyFieldCount: template.readyFieldCount,
      readyClauseCount: template.readyClauseCount,
      missingFieldBlockerCount: template.missingFieldBlockerCount,
      rejectionClauseCount: template.rejectionClauseCount,
      nonExecutionClauseCount: template.nonExecutionClauseCount,
      templateValueProvidedCount: template.templateValueProvidedCount,
      approvalCaptured: template.approvalCaptured,
      approvalGrantPresent: template.approvalGrantPresent,
      signedApprovalPresent: template.signedApprovalPresent,
      importsRuntimePayload: template.importsRuntimePayload,
      acceptsSyntheticEvidence: template.acceptsSyntheticEvidence,
      containsSecretValue: template.containsSecretValue,
      signedApprovalTemplateDigest: template.signedApprovalTemplateDigest,
    }),
  };
}
