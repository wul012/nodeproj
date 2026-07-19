import type {
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  archiveDeploymentApprovalItems,
  archiveDeploymentChangeRecordItems,
} from "./opsPromotionArchiveSteps.js";
import {
  archiveDeploymentApprovalNextActions,
  archiveDeploymentApprovalVerificationNextActions,
  archiveDeploymentChangeRecordNextActions,
  archiveDeploymentChangeRecordVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import {
  archiveDeploymentApprovalDigestPayload,
  archiveDeploymentChangeRecordDigestPayload,
} from "./opsPromotionArchiveDeploymentDigestPayloads.js";
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

