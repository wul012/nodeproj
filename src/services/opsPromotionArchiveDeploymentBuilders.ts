import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerification,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseAuditTrailRecord,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidenceVerification
} from "./opsPromotionArchiveBundleTypes.js";
import {
  archiveDeploymentApprovalItems,
  archiveDeploymentChangeRecordItems,
  archiveDeploymentExecutionReceiptItems,
  archiveDeploymentExecutionRecordItems,
  archiveHandoffClosureItems,
  archiveHandoffCompletionSteps,
  archiveHandoffPackageAttachments,
  archiveHandoffReceiptMilestones,
  archiveReleaseArchiveItems,
  archiveReleaseAuditTrailItems,
  archiveReleaseEvidenceItems,
} from "./opsPromotionArchiveSteps.js";
import {
  archiveDeploymentApprovalNextActions,
  archiveDeploymentApprovalVerificationNextActions,
  archiveDeploymentChangeRecordNextActions,
  archiveDeploymentChangeRecordVerificationNextActions,
  archiveDeploymentExecutionReceiptNextActions,
  archiveDeploymentExecutionReceiptVerificationNextActions,
  archiveDeploymentExecutionRecordNextActions,
  archiveDeploymentExecutionRecordVerificationNextActions,
  archiveHandoffCertificateNextActions,
  archiveHandoffCertificateVerificationNextActions,
  archiveHandoffClosureNextActions,
  archiveHandoffClosureVerificationNextActions,
  archiveHandoffCompletionNextActions,
  archiveHandoffCompletionReferenceChecksValid,
  archiveHandoffCompletionVerificationNextActions,
  archiveHandoffPackageNextActions,
  archiveHandoffPackageVerificationNextActions,
  archiveHandoffReceiptNextActions,
  archiveHandoffReceiptVerificationNextActions,
  archiveReleaseArchiveNextActions,
  archiveReleaseArchiveVerificationNextActions,
  archiveReleaseAuditTrailNextActions,
  archiveReleaseEvidenceNextActions,
  archiveReleaseEvidenceVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionDeploymentApproval(input: {
  releaseArchive: OpsPromotionReleaseArchive;
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification;
}): OpsPromotionDeploymentApproval {
  const approvalName = `promotion-deployment-approval-${input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value.slice(0, 12)}`;
  const approvalItems = archiveDeploymentApprovalItems(input.releaseArchive, input.releaseArchiveVerification);
  const releaseArchiveReferenceValid = input.releaseArchive.releaseArchiveDigest.value
    === input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value;
  const verification = {
    releaseArchiveVerified: input.releaseArchiveVerification.valid,
    releaseArchiveDigestValid: input.releaseArchiveVerification.checks.releaseArchiveDigestValid,
    archiveItemsValid: input.releaseArchiveVerification.checks.archiveItemsValid,
    releaseArchiveReferenceValid,
    closeoutReady: input.releaseArchiveVerification.summary.closeoutReady,
    archiveItemCount: input.releaseArchiveVerification.summary.archiveItemCount,
    approvalItemCount: approvalItems.length,
  };
  const valid = input.releaseArchive.valid
    && input.releaseArchiveVerification.valid
    && releaseArchiveReferenceValid
    && approvalItems.every((item) => item.valid);
  const handoffReady = valid && input.releaseArchive.handoffReady && input.releaseArchiveVerification.handoffReady;
  const approvalReady = handoffReady && input.releaseArchiveVerification.summary.closeoutReady;
  const nextActions = archiveDeploymentApprovalNextActions(input.releaseArchiveVerification, valid, approvalReady);
  const digestPayload = archiveDeploymentApprovalDigestPayload({
    approvalName,
    releaseArchiveName: input.releaseArchive.releaseArchiveName,
    evidenceName: input.releaseArchive.evidenceName,
    completionName: input.releaseArchive.completionName,
    closureName: input.releaseArchive.closureName,
    receiptName: input.releaseArchive.receiptName,
    certificateName: input.releaseArchive.certificateName,
    packageName: input.releaseArchive.packageName,
    archiveName: input.releaseArchive.archiveName,
    valid,
    state: input.releaseArchive.state,
    handoffReady,
    approvalReady,
    releaseArchiveDigest: input.releaseArchive.releaseArchiveDigest.value,
    verifiedReleaseArchiveDigest: input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
    evidenceDigest: input.releaseArchive.evidenceDigest.value,
    decision: input.releaseArchive.decision,
    verification,
    approvalItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    approvalName,
    releaseArchiveName: input.releaseArchive.releaseArchiveName,
    evidenceName: input.releaseArchive.evidenceName,
    completionName: input.releaseArchive.completionName,
    closureName: input.releaseArchive.closureName,
    receiptName: input.releaseArchive.receiptName,
    certificateName: input.releaseArchive.certificateName,
    packageName: input.releaseArchive.packageName,
    archiveName: input.releaseArchive.archiveName,
    valid,
    state: input.releaseArchive.state,
    handoffReady,
    approvalReady,
    approvalDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "releaseArchiveDigest",
        "verifiedReleaseArchiveDigest",
        "evidenceDigest",
        "decision",
        "verification",
        "approvalItems",
        "nextActions",
      ],
    },
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.releaseArchive.releaseArchiveDigest.value,
    },
    verifiedReleaseArchiveDigest: {
      algorithm: "sha256",
      value: input.releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
    },
    evidenceDigest: {
      algorithm: "sha256",
      value: input.releaseArchive.evidenceDigest.value,
    },
    decision: input.releaseArchive.decision,
    verification,
    approvalItems,
    nextActions,
  };
}

export function createOpsPromotionDeploymentApprovalVerification(input: {
  releaseArchive: OpsPromotionReleaseArchive;
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification;
  approval: OpsPromotionDeploymentApproval;
}): OpsPromotionDeploymentApprovalVerification {
  const expectedApproval = createOpsPromotionDeploymentApproval({
    releaseArchive: input.releaseArchive,
    releaseArchiveVerification: input.releaseArchiveVerification,
  });
  const recomputedApprovalDigest = digestStable(archiveDeploymentApprovalDigestPayload({
    approvalName: input.approval.approvalName,
    releaseArchiveName: input.approval.releaseArchiveName,
    evidenceName: input.approval.evidenceName,
    completionName: input.approval.completionName,
    closureName: input.approval.closureName,
    receiptName: input.approval.receiptName,
    certificateName: input.approval.certificateName,
    packageName: input.approval.packageName,
    archiveName: input.approval.archiveName,
    valid: input.approval.valid,
    state: input.approval.state,
    handoffReady: input.approval.handoffReady,
    approvalReady: input.approval.approvalReady,
    releaseArchiveDigest: input.approval.releaseArchiveDigest.value,
    verifiedReleaseArchiveDigest: input.approval.verifiedReleaseArchiveDigest.value,
    evidenceDigest: input.approval.evidenceDigest.value,
    decision: input.approval.decision,
    verification: input.approval.verification,
    approvalItems: input.approval.approvalItems,
    nextActions: input.approval.nextActions,
  }));
  const approvalItemChecks = input.approval.approvalItems.map((item) => {
    const expected = expectedApproval.approvalItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      approvalDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    approvalDigestValid: input.approval.approvalDigest.value === recomputedApprovalDigest,
    coveredFieldsMatch: stableJson(input.approval.approvalDigest.coveredFields)
      === stableJson(expectedApproval.approvalDigest.coveredFields),
    approvalItemsValid: approvalItemChecks.length === expectedApproval.approvalItems.length
      && approvalItemChecks.every((item) => item.valid),
    approvalNameMatches: input.approval.approvalName === expectedApproval.approvalName,
    releaseArchiveNameMatches: input.approval.releaseArchiveName === expectedApproval.releaseArchiveName,
    evidenceNameMatches: input.approval.evidenceName === expectedApproval.evidenceName,
    completionNameMatches: input.approval.completionName === expectedApproval.completionName,
    closureNameMatches: input.approval.closureName === expectedApproval.closureName,
    receiptNameMatches: input.approval.receiptName === expectedApproval.receiptName,
    certificateNameMatches: input.approval.certificateName === expectedApproval.certificateName,
    packageNameMatches: input.approval.packageName === expectedApproval.packageName,
    archiveNameMatches: input.approval.archiveName === expectedApproval.archiveName,
    validMatches: input.approval.valid === expectedApproval.valid,
    stateMatches: input.approval.state === expectedApproval.state,
    handoffReadyMatches: input.approval.handoffReady === expectedApproval.handoffReady,
    approvalReadyMatches: input.approval.approvalReady === expectedApproval.approvalReady,
    releaseArchiveDigestMatches: input.approval.releaseArchiveDigest.value === expectedApproval.releaseArchiveDigest.value,
    verifiedReleaseArchiveDigestMatches: input.approval.verifiedReleaseArchiveDigest.value === expectedApproval.verifiedReleaseArchiveDigest.value,
    evidenceDigestMatches: input.approval.evidenceDigest.value === expectedApproval.evidenceDigest.value,
    decisionMatches: stableJson(input.approval.decision) === stableJson(expectedApproval.decision),
    verificationMatches: stableJson(input.approval.verification) === stableJson(expectedApproval.verification),
    nextActionsMatch: stableJson(input.approval.nextActions) === stableJson(expectedApproval.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    approvalName: input.approval.approvalName,
    releaseArchiveName: input.approval.releaseArchiveName,
    evidenceName: input.approval.evidenceName,
    completionName: input.approval.completionName,
    closureName: input.approval.closureName,
    receiptName: input.approval.receiptName,
    certificateName: input.approval.certificateName,
    packageName: input.approval.packageName,
    archiveName: input.approval.archiveName,
    valid,
    state: input.approval.state,
    handoffReady: input.approval.handoffReady,
    approvalReady: input.approval.approvalReady,
    approvalDigest: {
      algorithm: "sha256",
      value: input.approval.approvalDigest.value,
    },
    recomputedApprovalDigest: {
      algorithm: "sha256",
      value: recomputedApprovalDigest,
    },
    checks,
    summary: {
      totalDecisions: input.approval.decision.totalDecisions,
      latestDecisionId: input.approval.decision.latestDecisionId,
      approvalItemCount: approvalItemChecks.length,
      handoffReady: input.approval.handoffReady,
      approvalReady: input.approval.approvalReady,
      closeoutReady: input.approval.verification.closeoutReady,
    },
    approvalItems: approvalItemChecks,
    nextActions: archiveDeploymentApprovalVerificationNextActions(checks, input.approval),
  };
}

export function createOpsPromotionDeploymentChangeRecord(input: {
  approval: OpsPromotionDeploymentApproval;
  approvalVerification: OpsPromotionDeploymentApprovalVerification;
}): OpsPromotionDeploymentChangeRecord {
  const changeRecordName = `promotion-deployment-change-${input.approvalVerification.recomputedApprovalDigest.value.slice(0, 12)}`;
  const changeItems = archiveDeploymentChangeRecordItems(input.approval, input.approvalVerification);
  const approvalReferenceValid = input.approval.approvalDigest.value === input.approvalVerification.recomputedApprovalDigest.value;
  const verification = {
    approvalVerified: input.approvalVerification.valid,
    approvalDigestValid: input.approvalVerification.checks.approvalDigestValid,
    approvalItemsValid: input.approvalVerification.checks.approvalItemsValid,
    approvalReferenceValid,
    closeoutReady: input.approvalVerification.summary.closeoutReady,
    approvalItemCount: input.approvalVerification.summary.approvalItemCount,
    changeItemCount: changeItems.length,
  };
  const valid = input.approval.valid
    && input.approvalVerification.valid
    && approvalReferenceValid
    && changeItems.every((item) => item.valid);
  const handoffReady = valid && input.approval.handoffReady && input.approvalVerification.handoffReady;
  const approvalReady = handoffReady && input.approval.approvalReady && input.approvalVerification.approvalReady;
  const changeReady = approvalReady && input.approvalVerification.summary.closeoutReady;
  const nextActions = archiveDeploymentChangeRecordNextActions(input.approvalVerification, valid, changeReady);
  const digestPayload = archiveDeploymentChangeRecordDigestPayload({
    changeRecordName,
    approvalName: input.approval.approvalName,
    releaseArchiveName: input.approval.releaseArchiveName,
    evidenceName: input.approval.evidenceName,
    completionName: input.approval.completionName,
    closureName: input.approval.closureName,
    receiptName: input.approval.receiptName,
    certificateName: input.approval.certificateName,
    packageName: input.approval.packageName,
    archiveName: input.approval.archiveName,
    valid,
    state: input.approval.state,
    handoffReady,
    approvalReady,
    changeReady,
    approvalDigest: input.approval.approvalDigest.value,
    verifiedApprovalDigest: input.approvalVerification.recomputedApprovalDigest.value,
    releaseArchiveDigest: input.approval.releaseArchiveDigest.value,
    decision: input.approval.decision,
    verification,
    changeItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    changeRecordName,
    approvalName: input.approval.approvalName,
    releaseArchiveName: input.approval.releaseArchiveName,
    evidenceName: input.approval.evidenceName,
    completionName: input.approval.completionName,
    closureName: input.approval.closureName,
    receiptName: input.approval.receiptName,
    certificateName: input.approval.certificateName,
    packageName: input.approval.packageName,
    archiveName: input.approval.archiveName,
    valid,
    state: input.approval.state,
    handoffReady,
    approvalReady,
    changeReady,
    changeDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "approvalDigest",
        "verifiedApprovalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "changeItems",
        "nextActions",
      ],
    },
    approvalDigest: {
      algorithm: "sha256",
      value: input.approval.approvalDigest.value,
    },
    verifiedApprovalDigest: {
      algorithm: "sha256",
      value: input.approvalVerification.recomputedApprovalDigest.value,
    },
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.approval.releaseArchiveDigest.value,
    },
    decision: input.approval.decision,
    verification,
    changeItems,
    nextActions,
  };
}

export function createOpsPromotionDeploymentChangeRecordVerification(input: {
  approval: OpsPromotionDeploymentApproval;
  approvalVerification: OpsPromotionDeploymentApprovalVerification;
  changeRecord: OpsPromotionDeploymentChangeRecord;
}): OpsPromotionDeploymentChangeRecordVerification {
  const expectedChangeRecord = createOpsPromotionDeploymentChangeRecord({
    approval: input.approval,
    approvalVerification: input.approvalVerification,
  });
  const recomputedChangeDigest = digestStable(archiveDeploymentChangeRecordDigestPayload({
    changeRecordName: input.changeRecord.changeRecordName,
    approvalName: input.changeRecord.approvalName,
    releaseArchiveName: input.changeRecord.releaseArchiveName,
    evidenceName: input.changeRecord.evidenceName,
    completionName: input.changeRecord.completionName,
    closureName: input.changeRecord.closureName,
    receiptName: input.changeRecord.receiptName,
    certificateName: input.changeRecord.certificateName,
    packageName: input.changeRecord.packageName,
    archiveName: input.changeRecord.archiveName,
    valid: input.changeRecord.valid,
    state: input.changeRecord.state,
    handoffReady: input.changeRecord.handoffReady,
    approvalReady: input.changeRecord.approvalReady,
    changeReady: input.changeRecord.changeReady,
    approvalDigest: input.changeRecord.approvalDigest.value,
    verifiedApprovalDigest: input.changeRecord.verifiedApprovalDigest.value,
    releaseArchiveDigest: input.changeRecord.releaseArchiveDigest.value,
    decision: input.changeRecord.decision,
    verification: input.changeRecord.verification,
    changeItems: input.changeRecord.changeItems,
    nextActions: input.changeRecord.nextActions,
  }));
  const changeItemChecks = input.changeRecord.changeItems.map((item) => {
    const expected = expectedChangeRecord.changeItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      changeItemDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    changeDigestValid: input.changeRecord.changeDigest.value === recomputedChangeDigest,
    coveredFieldsMatch: stableJson(input.changeRecord.changeDigest.coveredFields)
      === stableJson(expectedChangeRecord.changeDigest.coveredFields),
    changeItemsValid: changeItemChecks.length === expectedChangeRecord.changeItems.length
      && changeItemChecks.every((item) => item.valid),
    changeRecordNameMatches: input.changeRecord.changeRecordName === expectedChangeRecord.changeRecordName,
    approvalNameMatches: input.changeRecord.approvalName === expectedChangeRecord.approvalName,
    releaseArchiveNameMatches: input.changeRecord.releaseArchiveName === expectedChangeRecord.releaseArchiveName,
    evidenceNameMatches: input.changeRecord.evidenceName === expectedChangeRecord.evidenceName,
    completionNameMatches: input.changeRecord.completionName === expectedChangeRecord.completionName,
    closureNameMatches: input.changeRecord.closureName === expectedChangeRecord.closureName,
    receiptNameMatches: input.changeRecord.receiptName === expectedChangeRecord.receiptName,
    certificateNameMatches: input.changeRecord.certificateName === expectedChangeRecord.certificateName,
    packageNameMatches: input.changeRecord.packageName === expectedChangeRecord.packageName,
    archiveNameMatches: input.changeRecord.archiveName === expectedChangeRecord.archiveName,
    validMatches: input.changeRecord.valid === expectedChangeRecord.valid,
    stateMatches: input.changeRecord.state === expectedChangeRecord.state,
    handoffReadyMatches: input.changeRecord.handoffReady === expectedChangeRecord.handoffReady,
    approvalReadyMatches: input.changeRecord.approvalReady === expectedChangeRecord.approvalReady,
    changeReadyMatches: input.changeRecord.changeReady === expectedChangeRecord.changeReady,
    approvalDigestMatches: input.changeRecord.approvalDigest.value === expectedChangeRecord.approvalDigest.value,
    verifiedApprovalDigestMatches: input.changeRecord.verifiedApprovalDigest.value
      === expectedChangeRecord.verifiedApprovalDigest.value,
    releaseArchiveDigestMatches: input.changeRecord.releaseArchiveDigest.value === expectedChangeRecord.releaseArchiveDigest.value,
    decisionMatches: stableJson(input.changeRecord.decision) === stableJson(expectedChangeRecord.decision),
    verificationMatches: stableJson(input.changeRecord.verification) === stableJson(expectedChangeRecord.verification),
    nextActionsMatch: stableJson(input.changeRecord.nextActions) === stableJson(expectedChangeRecord.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    changeRecordName: input.changeRecord.changeRecordName,
    approvalName: input.changeRecord.approvalName,
    releaseArchiveName: input.changeRecord.releaseArchiveName,
    evidenceName: input.changeRecord.evidenceName,
    completionName: input.changeRecord.completionName,
    closureName: input.changeRecord.closureName,
    receiptName: input.changeRecord.receiptName,
    certificateName: input.changeRecord.certificateName,
    packageName: input.changeRecord.packageName,
    archiveName: input.changeRecord.archiveName,
    valid,
    state: input.changeRecord.state,
    handoffReady: input.changeRecord.handoffReady,
    approvalReady: input.changeRecord.approvalReady,
    changeReady: input.changeRecord.changeReady,
    changeDigest: {
      algorithm: "sha256",
      value: input.changeRecord.changeDigest.value,
    },
    recomputedChangeDigest: {
      algorithm: "sha256",
      value: recomputedChangeDigest,
    },
    checks,
    summary: {
      totalDecisions: input.changeRecord.decision.totalDecisions,
      latestDecisionId: input.changeRecord.decision.latestDecisionId,
      changeItemCount: changeItemChecks.length,
      handoffReady: input.changeRecord.handoffReady,
      approvalReady: input.changeRecord.approvalReady,
      changeReady: input.changeRecord.changeReady,
      closeoutReady: input.changeRecord.verification.closeoutReady,
    },
    changeItems: changeItemChecks,
    nextActions: archiveDeploymentChangeRecordVerificationNextActions(checks, input.changeRecord),
  };
}

export function createOpsPromotionDeploymentExecutionRecord(input: {
  changeRecord: OpsPromotionDeploymentChangeRecord;
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification;
}): OpsPromotionDeploymentExecutionRecord {
  const executionName = `promotion-deployment-execution-${input.changeRecordVerification.recomputedChangeDigest.value.slice(0, 12)}`;
  const executionItems = archiveDeploymentExecutionRecordItems(input.changeRecord, input.changeRecordVerification);
  const changeReferenceValid = input.changeRecord.changeDigest.value === input.changeRecordVerification.recomputedChangeDigest.value;
  const verification = {
    changeRecordVerified: input.changeRecordVerification.valid,
    changeDigestValid: input.changeRecordVerification.checks.changeDigestValid,
    changeItemsValid: input.changeRecordVerification.checks.changeItemsValid,
    changeReferenceValid,
    closeoutReady: input.changeRecordVerification.summary.closeoutReady,
    changeItemCount: input.changeRecordVerification.summary.changeItemCount,
    executionItemCount: executionItems.length,
  };
  const valid = input.changeRecord.valid
    && input.changeRecordVerification.valid
    && changeReferenceValid
    && executionItems.every((item) => item.valid);
  const handoffReady = valid && input.changeRecord.handoffReady && input.changeRecordVerification.handoffReady;
  const approvalReady = handoffReady && input.changeRecord.approvalReady && input.changeRecordVerification.approvalReady;
  const changeReady = approvalReady && input.changeRecord.changeReady && input.changeRecordVerification.changeReady;
  const executionReady = changeReady && input.changeRecordVerification.summary.closeoutReady;
  const nextActions = archiveDeploymentExecutionRecordNextActions(input.changeRecordVerification, valid, executionReady);
  const digestPayload = archiveDeploymentExecutionRecordDigestPayload({
    executionName,
    changeRecordName: input.changeRecord.changeRecordName,
    approvalName: input.changeRecord.approvalName,
    releaseArchiveName: input.changeRecord.releaseArchiveName,
    evidenceName: input.changeRecord.evidenceName,
    completionName: input.changeRecord.completionName,
    closureName: input.changeRecord.closureName,
    receiptName: input.changeRecord.receiptName,
    certificateName: input.changeRecord.certificateName,
    packageName: input.changeRecord.packageName,
    archiveName: input.changeRecord.archiveName,
    valid,
    state: input.changeRecord.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    changeDigest: input.changeRecord.changeDigest.value,
    verifiedChangeDigest: input.changeRecordVerification.recomputedChangeDigest.value,
    approvalDigest: input.changeRecord.approvalDigest.value,
    releaseArchiveDigest: input.changeRecord.releaseArchiveDigest.value,
    decision: input.changeRecord.decision,
    verification,
    executionItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    executionName,
    changeRecordName: input.changeRecord.changeRecordName,
    approvalName: input.changeRecord.approvalName,
    releaseArchiveName: input.changeRecord.releaseArchiveName,
    evidenceName: input.changeRecord.evidenceName,
    completionName: input.changeRecord.completionName,
    closureName: input.changeRecord.closureName,
    receiptName: input.changeRecord.receiptName,
    certificateName: input.changeRecord.certificateName,
    packageName: input.changeRecord.packageName,
    archiveName: input.changeRecord.archiveName,
    valid,
    state: input.changeRecord.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    executionDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "changeDigest",
        "verifiedChangeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "executionItems",
        "nextActions",
      ],
    },
    changeDigest: {
      algorithm: "sha256",
      value: input.changeRecord.changeDigest.value,
    },
    verifiedChangeDigest: {
      algorithm: "sha256",
      value: input.changeRecordVerification.recomputedChangeDigest.value,
    },
    approvalDigest: {
      algorithm: "sha256",
      value: input.changeRecord.approvalDigest.value,
    },
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.changeRecord.releaseArchiveDigest.value,
    },
    decision: input.changeRecord.decision,
    verification,
    executionItems,
    nextActions,
  };
}

export function createOpsPromotionDeploymentExecutionRecordVerification(input: {
  changeRecord: OpsPromotionDeploymentChangeRecord;
  changeRecordVerification: OpsPromotionDeploymentChangeRecordVerification;
  executionRecord: OpsPromotionDeploymentExecutionRecord;
}): OpsPromotionDeploymentExecutionRecordVerification {
  const expectedExecutionRecord = createOpsPromotionDeploymentExecutionRecord({
    changeRecord: input.changeRecord,
    changeRecordVerification: input.changeRecordVerification,
  });
  const recomputedExecutionDigest = digestStable(archiveDeploymentExecutionRecordDigestPayload({
    executionName: input.executionRecord.executionName,
    changeRecordName: input.executionRecord.changeRecordName,
    approvalName: input.executionRecord.approvalName,
    releaseArchiveName: input.executionRecord.releaseArchiveName,
    evidenceName: input.executionRecord.evidenceName,
    completionName: input.executionRecord.completionName,
    closureName: input.executionRecord.closureName,
    receiptName: input.executionRecord.receiptName,
    certificateName: input.executionRecord.certificateName,
    packageName: input.executionRecord.packageName,
    archiveName: input.executionRecord.archiveName,
    valid: input.executionRecord.valid,
    state: input.executionRecord.state,
    handoffReady: input.executionRecord.handoffReady,
    approvalReady: input.executionRecord.approvalReady,
    changeReady: input.executionRecord.changeReady,
    executionReady: input.executionRecord.executionReady,
    changeDigest: input.executionRecord.changeDigest.value,
    verifiedChangeDigest: input.executionRecord.verifiedChangeDigest.value,
    approvalDigest: input.executionRecord.approvalDigest.value,
    releaseArchiveDigest: input.executionRecord.releaseArchiveDigest.value,
    decision: input.executionRecord.decision,
    verification: input.executionRecord.verification,
    executionItems: input.executionRecord.executionItems,
    nextActions: input.executionRecord.nextActions,
  }));
  const executionItemChecks = input.executionRecord.executionItems.map((item) => {
    const expected = expectedExecutionRecord.executionItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      executionItemDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    executionDigestValid: input.executionRecord.executionDigest.value === recomputedExecutionDigest,
    coveredFieldsMatch: stableJson(input.executionRecord.executionDigest.coveredFields)
      === stableJson(expectedExecutionRecord.executionDigest.coveredFields),
    executionItemsValid: executionItemChecks.length === expectedExecutionRecord.executionItems.length
      && executionItemChecks.every((item) => item.valid),
    executionNameMatches: input.executionRecord.executionName === expectedExecutionRecord.executionName,
    changeRecordNameMatches: input.executionRecord.changeRecordName === expectedExecutionRecord.changeRecordName,
    approvalNameMatches: input.executionRecord.approvalName === expectedExecutionRecord.approvalName,
    releaseArchiveNameMatches: input.executionRecord.releaseArchiveName === expectedExecutionRecord.releaseArchiveName,
    evidenceNameMatches: input.executionRecord.evidenceName === expectedExecutionRecord.evidenceName,
    completionNameMatches: input.executionRecord.completionName === expectedExecutionRecord.completionName,
    closureNameMatches: input.executionRecord.closureName === expectedExecutionRecord.closureName,
    receiptNameMatches: input.executionRecord.receiptName === expectedExecutionRecord.receiptName,
    certificateNameMatches: input.executionRecord.certificateName === expectedExecutionRecord.certificateName,
    packageNameMatches: input.executionRecord.packageName === expectedExecutionRecord.packageName,
    archiveNameMatches: input.executionRecord.archiveName === expectedExecutionRecord.archiveName,
    validMatches: input.executionRecord.valid === expectedExecutionRecord.valid,
    stateMatches: input.executionRecord.state === expectedExecutionRecord.state,
    handoffReadyMatches: input.executionRecord.handoffReady === expectedExecutionRecord.handoffReady,
    approvalReadyMatches: input.executionRecord.approvalReady === expectedExecutionRecord.approvalReady,
    changeReadyMatches: input.executionRecord.changeReady === expectedExecutionRecord.changeReady,
    executionReadyMatches: input.executionRecord.executionReady === expectedExecutionRecord.executionReady,
    changeDigestMatches: input.executionRecord.changeDigest.value === expectedExecutionRecord.changeDigest.value,
    verifiedChangeDigestMatches: input.executionRecord.verifiedChangeDigest.value
      === expectedExecutionRecord.verifiedChangeDigest.value,
    approvalDigestMatches: input.executionRecord.approvalDigest.value === expectedExecutionRecord.approvalDigest.value,
    releaseArchiveDigestMatches: input.executionRecord.releaseArchiveDigest.value
      === expectedExecutionRecord.releaseArchiveDigest.value,
    decisionMatches: stableJson(input.executionRecord.decision) === stableJson(expectedExecutionRecord.decision),
    verificationMatches: stableJson(input.executionRecord.verification) === stableJson(expectedExecutionRecord.verification),
    nextActionsMatch: stableJson(input.executionRecord.nextActions) === stableJson(expectedExecutionRecord.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    executionName: input.executionRecord.executionName,
    changeRecordName: input.executionRecord.changeRecordName,
    approvalName: input.executionRecord.approvalName,
    releaseArchiveName: input.executionRecord.releaseArchiveName,
    evidenceName: input.executionRecord.evidenceName,
    completionName: input.executionRecord.completionName,
    closureName: input.executionRecord.closureName,
    receiptName: input.executionRecord.receiptName,
    certificateName: input.executionRecord.certificateName,
    packageName: input.executionRecord.packageName,
    archiveName: input.executionRecord.archiveName,
    valid,
    state: input.executionRecord.state,
    handoffReady: input.executionRecord.handoffReady,
    approvalReady: input.executionRecord.approvalReady,
    changeReady: input.executionRecord.changeReady,
    executionReady: input.executionRecord.executionReady,
    executionDigest: {
      algorithm: "sha256",
      value: input.executionRecord.executionDigest.value,
    },
    recomputedExecutionDigest: {
      algorithm: "sha256",
      value: recomputedExecutionDigest,
    },
    checks,
    summary: {
      totalDecisions: input.executionRecord.decision.totalDecisions,
      latestDecisionId: input.executionRecord.decision.latestDecisionId,
      executionItemCount: executionItemChecks.length,
      handoffReady: input.executionRecord.handoffReady,
      approvalReady: input.executionRecord.approvalReady,
      changeReady: input.executionRecord.changeReady,
      executionReady: input.executionRecord.executionReady,
      closeoutReady: input.executionRecord.verification.closeoutReady,
    },
    executionItems: executionItemChecks,
    nextActions: archiveDeploymentExecutionRecordVerificationNextActions(checks, input.executionRecord),
  };
}

export function createOpsPromotionDeploymentExecutionReceipt(input: {
  executionRecord: OpsPromotionDeploymentExecutionRecord;
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification;
}): OpsPromotionDeploymentExecutionReceipt {
  const receiptName = `promotion-deployment-receipt-${input.executionRecordVerification.recomputedExecutionDigest.value.slice(0, 12)}`;
  const receiptItems = archiveDeploymentExecutionReceiptItems(input.executionRecord, input.executionRecordVerification);
  const executionReferenceValid = input.executionRecord.executionDigest.value
    === input.executionRecordVerification.recomputedExecutionDigest.value;
  const verification = {
    executionRecordVerified: input.executionRecordVerification.valid,
    executionDigestValid: input.executionRecordVerification.checks.executionDigestValid,
    executionItemsValid: input.executionRecordVerification.checks.executionItemsValid,
    executionReferenceValid,
    closeoutReady: input.executionRecordVerification.summary.closeoutReady,
    executionItemCount: input.executionRecordVerification.summary.executionItemCount,
    receiptItemCount: receiptItems.length,
  };
  const valid = input.executionRecord.valid
    && input.executionRecordVerification.valid
    && executionReferenceValid
    && receiptItems.every((item) => item.valid);
  const handoffReady = valid && input.executionRecord.handoffReady && input.executionRecordVerification.handoffReady;
  const approvalReady = handoffReady && input.executionRecord.approvalReady && input.executionRecordVerification.approvalReady;
  const changeReady = approvalReady && input.executionRecord.changeReady && input.executionRecordVerification.changeReady;
  const executionReady = changeReady
    && input.executionRecord.executionReady
    && input.executionRecordVerification.executionReady;
  const receiptReady = executionReady && input.executionRecordVerification.summary.closeoutReady;
  const nextActions = archiveDeploymentExecutionReceiptNextActions(input.executionRecordVerification, valid, receiptReady);
  const digestPayload = archiveDeploymentExecutionReceiptDigestPayload({
    receiptName,
    executionName: input.executionRecord.executionName,
    changeRecordName: input.executionRecord.changeRecordName,
    approvalName: input.executionRecord.approvalName,
    releaseArchiveName: input.executionRecord.releaseArchiveName,
    evidenceName: input.executionRecord.evidenceName,
    completionName: input.executionRecord.completionName,
    closureName: input.executionRecord.closureName,
    receiptRecordName: input.executionRecord.receiptName,
    certificateName: input.executionRecord.certificateName,
    packageName: input.executionRecord.packageName,
    archiveName: input.executionRecord.archiveName,
    valid,
    state: input.executionRecord.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    receiptReady,
    executionDigest: input.executionRecord.executionDigest.value,
    verifiedExecutionDigest: input.executionRecordVerification.recomputedExecutionDigest.value,
    changeDigest: input.executionRecord.changeDigest.value,
    approvalDigest: input.executionRecord.approvalDigest.value,
    releaseArchiveDigest: input.executionRecord.releaseArchiveDigest.value,
    decision: input.executionRecord.decision,
    verification,
    receiptItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName,
    executionName: input.executionRecord.executionName,
    changeRecordName: input.executionRecord.changeRecordName,
    approvalName: input.executionRecord.approvalName,
    releaseArchiveName: input.executionRecord.releaseArchiveName,
    evidenceName: input.executionRecord.evidenceName,
    completionName: input.executionRecord.completionName,
    closureName: input.executionRecord.closureName,
    receiptRecordName: input.executionRecord.receiptName,
    certificateName: input.executionRecord.certificateName,
    packageName: input.executionRecord.packageName,
    archiveName: input.executionRecord.archiveName,
    valid,
    state: input.executionRecord.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    receiptReady,
    receiptDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "receiptName",
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptRecordName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "receiptReady",
        "executionDigest",
        "verifiedExecutionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "receiptItems",
        "nextActions",
      ],
    },
    executionDigest: {
      algorithm: "sha256",
      value: input.executionRecord.executionDigest.value,
    },
    verifiedExecutionDigest: {
      algorithm: "sha256",
      value: input.executionRecordVerification.recomputedExecutionDigest.value,
    },
    changeDigest: {
      algorithm: "sha256",
      value: input.executionRecord.changeDigest.value,
    },
    approvalDigest: {
      algorithm: "sha256",
      value: input.executionRecord.approvalDigest.value,
    },
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.executionRecord.releaseArchiveDigest.value,
    },
    decision: input.executionRecord.decision,
    verification,
    receiptItems,
    nextActions,
  };
}

export function createOpsPromotionDeploymentExecutionReceiptVerification(input: {
  executionRecord: OpsPromotionDeploymentExecutionRecord;
  executionRecordVerification: OpsPromotionDeploymentExecutionRecordVerification;
  receipt: OpsPromotionDeploymentExecutionReceipt;
}): OpsPromotionDeploymentExecutionReceiptVerification {
  const expectedReceipt = createOpsPromotionDeploymentExecutionReceipt({
    executionRecord: input.executionRecord,
    executionRecordVerification: input.executionRecordVerification,
  });
  const recomputedReceiptDigest = digestStable(archiveDeploymentExecutionReceiptDigestPayload({
    receiptName: input.receipt.receiptName,
    executionName: input.receipt.executionName,
    changeRecordName: input.receipt.changeRecordName,
    approvalName: input.receipt.approvalName,
    releaseArchiveName: input.receipt.releaseArchiveName,
    evidenceName: input.receipt.evidenceName,
    completionName: input.receipt.completionName,
    closureName: input.receipt.closureName,
    receiptRecordName: input.receipt.receiptRecordName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid: input.receipt.valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    approvalReady: input.receipt.approvalReady,
    changeReady: input.receipt.changeReady,
    executionReady: input.receipt.executionReady,
    receiptReady: input.receipt.receiptReady,
    executionDigest: input.receipt.executionDigest.value,
    verifiedExecutionDigest: input.receipt.verifiedExecutionDigest.value,
    changeDigest: input.receipt.changeDigest.value,
    approvalDigest: input.receipt.approvalDigest.value,
    releaseArchiveDigest: input.receipt.releaseArchiveDigest.value,
    decision: input.receipt.decision,
    verification: input.receipt.verification,
    receiptItems: input.receipt.receiptItems,
    nextActions: input.receipt.nextActions,
  }));
  const receiptItemChecks = input.receipt.receiptItems.map((item) => {
    const expected = expectedReceipt.receiptItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const detailMatches = expected?.detail === item.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      receiptItemDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    receiptDigestValid: input.receipt.receiptDigest.value === recomputedReceiptDigest,
    coveredFieldsMatch: stableJson(input.receipt.receiptDigest.coveredFields)
      === stableJson(expectedReceipt.receiptDigest.coveredFields),
    receiptItemsValid: receiptItemChecks.length === expectedReceipt.receiptItems.length
      && receiptItemChecks.every((item) => item.valid),
    receiptNameMatches: input.receipt.receiptName === expectedReceipt.receiptName,
    executionNameMatches: input.receipt.executionName === expectedReceipt.executionName,
    changeRecordNameMatches: input.receipt.changeRecordName === expectedReceipt.changeRecordName,
    approvalNameMatches: input.receipt.approvalName === expectedReceipt.approvalName,
    releaseArchiveNameMatches: input.receipt.releaseArchiveName === expectedReceipt.releaseArchiveName,
    evidenceNameMatches: input.receipt.evidenceName === expectedReceipt.evidenceName,
    completionNameMatches: input.receipt.completionName === expectedReceipt.completionName,
    closureNameMatches: input.receipt.closureName === expectedReceipt.closureName,
    receiptRecordNameMatches: input.receipt.receiptRecordName === expectedReceipt.receiptRecordName,
    certificateNameMatches: input.receipt.certificateName === expectedReceipt.certificateName,
    packageNameMatches: input.receipt.packageName === expectedReceipt.packageName,
    archiveNameMatches: input.receipt.archiveName === expectedReceipt.archiveName,
    validMatches: input.receipt.valid === expectedReceipt.valid,
    stateMatches: input.receipt.state === expectedReceipt.state,
    handoffReadyMatches: input.receipt.handoffReady === expectedReceipt.handoffReady,
    approvalReadyMatches: input.receipt.approvalReady === expectedReceipt.approvalReady,
    changeReadyMatches: input.receipt.changeReady === expectedReceipt.changeReady,
    executionReadyMatches: input.receipt.executionReady === expectedReceipt.executionReady,
    receiptReadyMatches: input.receipt.receiptReady === expectedReceipt.receiptReady,
    executionDigestMatches: input.receipt.executionDigest.value === expectedReceipt.executionDigest.value,
    verifiedExecutionDigestMatches: input.receipt.verifiedExecutionDigest.value === expectedReceipt.verifiedExecutionDigest.value,
    changeDigestMatches: input.receipt.changeDigest.value === expectedReceipt.changeDigest.value,
    approvalDigestMatches: input.receipt.approvalDigest.value === expectedReceipt.approvalDigest.value,
    releaseArchiveDigestMatches: input.receipt.releaseArchiveDigest.value === expectedReceipt.releaseArchiveDigest.value,
    decisionMatches: stableJson(input.receipt.decision) === stableJson(expectedReceipt.decision),
    verificationMatches: stableJson(input.receipt.verification) === stableJson(expectedReceipt.verification),
    nextActionsMatch: stableJson(input.receipt.nextActions) === stableJson(expectedReceipt.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName: input.receipt.receiptName,
    executionName: input.receipt.executionName,
    changeRecordName: input.receipt.changeRecordName,
    approvalName: input.receipt.approvalName,
    releaseArchiveName: input.receipt.releaseArchiveName,
    evidenceName: input.receipt.evidenceName,
    completionName: input.receipt.completionName,
    closureName: input.receipt.closureName,
    receiptRecordName: input.receipt.receiptRecordName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    approvalReady: input.receipt.approvalReady,
    changeReady: input.receipt.changeReady,
    executionReady: input.receipt.executionReady,
    receiptReady: input.receipt.receiptReady,
    receiptDigest: {
      algorithm: "sha256",
      value: input.receipt.receiptDigest.value,
    },
    recomputedReceiptDigest: {
      algorithm: "sha256",
      value: recomputedReceiptDigest,
    },
    checks,
    summary: {
      totalDecisions: input.receipt.decision.totalDecisions,
      latestDecisionId: input.receipt.decision.latestDecisionId,
      receiptItemCount: receiptItemChecks.length,
      handoffReady: input.receipt.handoffReady,
      approvalReady: input.receipt.approvalReady,
      changeReady: input.receipt.changeReady,
      executionReady: input.receipt.executionReady,
      receiptReady: input.receipt.receiptReady,
      closeoutReady: input.receipt.verification.closeoutReady,
    },
    receiptItems: receiptItemChecks,
    nextActions: archiveDeploymentExecutionReceiptVerificationNextActions(checks, input.receipt),
  };
}

export function createOpsPromotionReleaseAuditTrailRecord(input: {
  receipt: OpsPromotionDeploymentExecutionReceipt;
  receiptVerification: OpsPromotionDeploymentExecutionReceiptVerification;
}): OpsPromotionReleaseAuditTrailRecord {
  const auditTrailName = `promotion-release-audit-${input.receiptVerification.recomputedReceiptDigest.value.slice(0, 12)}`;
  const auditItems = archiveReleaseAuditTrailItems(input.receipt, input.receiptVerification);
  const receiptReferenceValid = input.receipt.receiptDigest.value === input.receiptVerification.recomputedReceiptDigest.value;
  const verification = {
    receiptVerified: input.receiptVerification.valid,
    receiptDigestValid: input.receiptVerification.checks.receiptDigestValid,
    receiptItemsValid: input.receiptVerification.checks.receiptItemsValid,
    receiptReferenceValid,
    closeoutReady: input.receiptVerification.summary.closeoutReady,
    receiptItemCount: input.receiptVerification.summary.receiptItemCount,
    auditItemCount: auditItems.length,
  };
  const valid = input.receipt.valid
    && input.receiptVerification.valid
    && receiptReferenceValid
    && auditItems.every((item) => item.valid);
  const handoffReady = valid && input.receipt.handoffReady && input.receiptVerification.handoffReady;
  const approvalReady = handoffReady && input.receipt.approvalReady && input.receiptVerification.approvalReady;
  const changeReady = approvalReady && input.receipt.changeReady && input.receiptVerification.changeReady;
  const executionReady = changeReady && input.receipt.executionReady && input.receiptVerification.executionReady;
  const receiptReady = executionReady && input.receipt.receiptReady && input.receiptVerification.receiptReady;
  const auditReady = receiptReady && input.receiptVerification.summary.closeoutReady;
  const nextActions = archiveReleaseAuditTrailNextActions(input.receiptVerification, valid, auditReady);
  const digestPayload = archiveReleaseAuditTrailDigestPayload({
    auditTrailName,
    receiptName: input.receipt.receiptName,
    executionName: input.receipt.executionName,
    changeRecordName: input.receipt.changeRecordName,
    approvalName: input.receipt.approvalName,
    releaseArchiveName: input.receipt.releaseArchiveName,
    evidenceName: input.receipt.evidenceName,
    completionName: input.receipt.completionName,
    closureName: input.receipt.closureName,
    receiptRecordName: input.receipt.receiptRecordName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    receiptReady,
    auditReady,
    receiptDigest: input.receipt.receiptDigest.value,
    verifiedReceiptDigest: input.receiptVerification.recomputedReceiptDigest.value,
    executionDigest: input.receipt.executionDigest.value,
    changeDigest: input.receipt.changeDigest.value,
    approvalDigest: input.receipt.approvalDigest.value,
    releaseArchiveDigest: input.receipt.releaseArchiveDigest.value,
    decision: input.receipt.decision,
    verification,
    auditItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    auditTrailName,
    receiptName: input.receipt.receiptName,
    executionName: input.receipt.executionName,
    changeRecordName: input.receipt.changeRecordName,
    approvalName: input.receipt.approvalName,
    releaseArchiveName: input.receipt.releaseArchiveName,
    evidenceName: input.receipt.evidenceName,
    completionName: input.receipt.completionName,
    closureName: input.receipt.closureName,
    receiptRecordName: input.receipt.receiptRecordName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    approvalReady,
    changeReady,
    executionReady,
    receiptReady,
    auditReady,
    auditDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "auditTrailName",
        "receiptName",
        "executionName",
        "changeRecordName",
        "approvalName",
        "releaseArchiveName",
        "evidenceName",
        "completionName",
        "closureName",
        "receiptRecordName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "approvalReady",
        "changeReady",
        "executionReady",
        "receiptReady",
        "auditReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "executionDigest",
        "changeDigest",
        "approvalDigest",
        "releaseArchiveDigest",
        "decision",
        "verification",
        "auditItems",
        "nextActions",
      ],
    },
    receiptDigest: {
      algorithm: "sha256",
      value: input.receipt.receiptDigest.value,
    },
    verifiedReceiptDigest: {
      algorithm: "sha256",
      value: input.receiptVerification.recomputedReceiptDigest.value,
    },
    executionDigest: {
      algorithm: "sha256",
      value: input.receipt.executionDigest.value,
    },
    changeDigest: {
      algorithm: "sha256",
      value: input.receipt.changeDigest.value,
    },
    approvalDigest: {
      algorithm: "sha256",
      value: input.receipt.approvalDigest.value,
    },
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.receipt.releaseArchiveDigest.value,
    },
    decision: input.receipt.decision,
    verification,
    auditItems,
    nextActions,
  };
}

function archiveDeploymentApprovalDigestPayload(input: {
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  releaseArchiveDigest: string;
  verifiedReleaseArchiveDigest: string;
  evidenceDigest: string;
  decision: OpsPromotionDeploymentApproval["decision"];
  verification: OpsPromotionDeploymentApproval["verification"];
  approvalItems: OpsPromotionDeploymentApprovalItem[];
  nextActions: string[];
}) {
  return {
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    releaseArchiveDigest: input.releaseArchiveDigest,
    verifiedReleaseArchiveDigest: input.verifiedReleaseArchiveDigest,
    evidenceDigest: input.evidenceDigest,
    decision: input.decision,
    verification: input.verification,
    approvalItems: input.approvalItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveDeploymentChangeRecordDigestPayload(input: {
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  approvalDigest: string;
  verifiedApprovalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentChangeRecord["decision"];
  verification: OpsPromotionDeploymentChangeRecord["verification"];
  changeItems: OpsPromotionDeploymentChangeRecordItem[];
  nextActions: string[];
}) {
  return {
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    approvalDigest: input.approvalDigest,
    verifiedApprovalDigest: input.verifiedApprovalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    changeItems: input.changeItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveDeploymentExecutionRecordDigestPayload(input: {
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
  changeDigest: string;
  verifiedChangeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionRecord["decision"];
  verification: OpsPromotionDeploymentExecutionRecord["verification"];
  executionItems: OpsPromotionDeploymentExecutionRecordItem[];
  nextActions: string[];
}) {
  return {
    executionName: input.executionName,
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    executionReady: input.executionReady,
    changeDigest: input.changeDigest,
    verifiedChangeDigest: input.verifiedChangeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    executionItems: input.executionItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveDeploymentExecutionReceiptDigestPayload(input: {
  receiptName: string;
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptRecordName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
  receiptReady: boolean;
  executionDigest: string;
  verifiedExecutionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionReceipt["decision"];
  verification: OpsPromotionDeploymentExecutionReceipt["verification"];
  receiptItems: OpsPromotionDeploymentExecutionReceiptItem[];
  nextActions: string[];
}) {
  return {
    receiptName: input.receiptName,
    executionName: input.executionName,
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptRecordName: input.receiptRecordName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    executionReady: input.executionReady,
    receiptReady: input.receiptReady,
    executionDigest: input.executionDigest,
    verifiedExecutionDigest: input.verifiedExecutionDigest,
    changeDigest: input.changeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    receiptItems: input.receiptItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveReleaseAuditTrailDigestPayload(input: {
  auditTrailName: string;
  receiptName: string;
  executionName: string;
  changeRecordName: string;
  approvalName: string;
  releaseArchiveName: string;
  evidenceName: string;
  completionName: string;
  closureName: string;
  receiptRecordName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  approvalReady: boolean;
  changeReady: boolean;
  executionReady: boolean;
  receiptReady: boolean;
  auditReady: boolean;
  receiptDigest: string;
  verifiedReceiptDigest: string;
  executionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionReleaseAuditTrailRecord["decision"];
  verification: OpsPromotionReleaseAuditTrailRecord["verification"];
  auditItems: OpsPromotionReleaseAuditTrailRecordItem[];
  nextActions: string[];
}) {
  return {
    auditTrailName: input.auditTrailName,
    receiptName: input.receiptName,
    executionName: input.executionName,
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptRecordName: input.receiptRecordName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    executionReady: input.executionReady,
    receiptReady: input.receiptReady,
    auditReady: input.auditReady,
    receiptDigest: input.receiptDigest,
    verifiedReceiptDigest: input.verifiedReceiptDigest,
    executionDigest: input.executionDigest,
    changeDigest: input.changeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    auditItems: input.auditItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

