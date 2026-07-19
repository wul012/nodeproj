import type {
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionReleaseAuditTrailRecord,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  archiveDeploymentExecutionReceiptItems,
  archiveDeploymentExecutionRecordItems,
  archiveReleaseAuditTrailItems,
} from "./opsPromotionArchiveSteps.js";
import {
  archiveDeploymentExecutionReceiptNextActions,
  archiveDeploymentExecutionReceiptVerificationNextActions,
  archiveDeploymentExecutionRecordNextActions,
  archiveDeploymentExecutionRecordVerificationNextActions,
  archiveReleaseAuditTrailNextActions,
} from "./opsPromotionArchiveValidation.js";
import {
  archiveDeploymentExecutionReceiptDigestPayload,
  archiveDeploymentExecutionRecordDigestPayload,
  archiveReleaseAuditTrailDigestPayload,
} from "./opsPromotionArchiveDeploymentDigestPayloads.js";
import { digestStable, stableJson } from "./stableDigest.js";

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

