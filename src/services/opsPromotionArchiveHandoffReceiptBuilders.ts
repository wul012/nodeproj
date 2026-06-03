import type {
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import { archiveHandoffReceiptDigestPayload } from "./opsPromotionArchiveHandoffDigestPayloads.js";
import { archiveHandoffReceiptMilestones } from "./opsPromotionArchiveSteps.js";
import {
  archiveHandoffReceiptNextActions,
  archiveHandoffReceiptVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { missingHandoffVerificationDigest } from "./opsPromotionArchiveHandoffVerificationDigests.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionHandoffReceipt(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
}): OpsPromotionHandoffReceipt {
  const receiptName = `promotion-receipt-${input.certificateVerification.recomputedCertificateDigest.value.slice(0, 12)}`;
  const milestones = archiveHandoffReceiptMilestones(input.certificate, input.certificateVerification);
  const verification = {
    certificateVerified: input.certificateVerification.valid,
    certificateDigestValid: input.certificateVerification.checks.certificateDigestValid,
    packageReferenceValid: input.certificateVerification.checks.packageDigestMatches
      && input.certificateVerification.checks.verifiedPackageDigestMatches,
    sealReferenceValid: input.certificateVerification.checks.sealDigestMatches,
    attachmentsValid: input.certificateVerification.checks.attachmentsValid,
    milestoneCount: milestones.length,
    attachmentCount: input.certificateVerification.summary.attachmentCount,
  };
  const valid = input.certificate.valid
    && input.certificateVerification.valid
    && input.certificate.certificateDigest.value === input.certificateVerification.recomputedCertificateDigest.value
    && milestones.every((milestone) => milestone.valid);
  const handoffReady = valid && input.certificate.handoffReady && input.certificateVerification.handoffReady;
  const nextActions = archiveHandoffReceiptNextActions(input.certificate, input.certificateVerification, valid);
  const digestPayload = archiveHandoffReceiptDigestPayload({
    receiptName,
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady,
    certificateDigest: input.certificate.certificateDigest.value,
    verifiedCertificateDigest: input.certificateVerification.recomputedCertificateDigest.value,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification,
    milestones,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName,
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady,
    receiptDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "milestones",
        "nextActions",
      ],
    },
    certificateDigest: {
      algorithm: "sha256",
      value: input.certificate.certificateDigest.value,
    },
    verifiedCertificateDigest: {
      algorithm: "sha256",
      value: input.certificateVerification.recomputedCertificateDigest.value,
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.certificate.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.certificate.verifiedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.certificate.sealDigest.value,
    },
    decision: input.certificate.decision,
    verification,
    milestones,
    nextActions,
  };
}

export function createOpsPromotionHandoffReceiptVerification(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
  receipt: OpsPromotionHandoffReceipt;
}): OpsPromotionHandoffReceiptVerification {
  const expectedReceipt = createOpsPromotionHandoffReceipt({
    certificate: input.certificate,
    certificateVerification: input.certificateVerification,
  });
  const recomputedReceiptDigest = digestStable(archiveHandoffReceiptDigestPayload({
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid: input.receipt.valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification: input.receipt.verification,
    milestones: input.receipt.milestones,
    nextActions: input.receipt.nextActions,
  }));
  const milestoneChecks = input.receipt.milestones.map((milestone) => {
    const expected = expectedReceipt.milestones.find((candidate) => candidate.name === milestone.name);
    const validMatches = expected?.valid === milestone.valid;
    const sourceMatches = expected?.source === milestone.source;
    const expectedDigest = expected?.digest ?? missingHandoffVerificationDigest(milestone.name);
    const digestMatches = milestone.digest.value === expectedDigest.value;

    return {
      name: milestone.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      receiptDigest: { ...milestone.digest },
      recomputedDigest: expectedDigest,
      source: milestone.source,
    };
  });
  const checks = {
    receiptDigestValid: input.receipt.receiptDigest.value === recomputedReceiptDigest,
    coveredFieldsMatch: stableJson(input.receipt.receiptDigest.coveredFields)
      === stableJson(expectedReceipt.receiptDigest.coveredFields),
    milestonesValid: milestoneChecks.length === expectedReceipt.milestones.length
      && milestoneChecks.every((milestone) => milestone.valid),
    receiptNameMatches: input.receipt.receiptName === expectedReceipt.receiptName,
    certificateNameMatches: input.receipt.certificateName === expectedReceipt.certificateName,
    packageNameMatches: input.receipt.packageName === expectedReceipt.packageName,
    archiveNameMatches: input.receipt.archiveName === expectedReceipt.archiveName,
    validMatches: input.receipt.valid === expectedReceipt.valid,
    stateMatches: input.receipt.state === expectedReceipt.state,
    handoffReadyMatches: input.receipt.handoffReady === expectedReceipt.handoffReady,
    certificateDigestMatches: input.receipt.certificateDigest.value === expectedReceipt.certificateDigest.value,
    verifiedCertificateDigestMatches: input.receipt.verifiedCertificateDigest.value === expectedReceipt.verifiedCertificateDigest.value,
    packageDigestMatches: input.receipt.packageDigest.value === expectedReceipt.packageDigest.value,
    verifiedPackageDigestMatches: input.receipt.verifiedPackageDigest.value === expectedReceipt.verifiedPackageDigest.value,
    sealDigestMatches: input.receipt.sealDigest.value === expectedReceipt.sealDigest.value,
    decisionMatches: stableJson(input.receipt.decision) === stableJson(expectedReceipt.decision),
    verificationMatches: stableJson(input.receipt.verification) === stableJson(expectedReceipt.verification),
    nextActionsMatch: stableJson(input.receipt.nextActions) === stableJson(expectedReceipt.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
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
      milestoneCount: milestoneChecks.length,
      handoffReady: input.receipt.handoffReady,
    },
    milestones: milestoneChecks,
    nextActions: archiveHandoffReceiptVerificationNextActions(checks, input.receipt),
  };
}
