import type {
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import { archiveHandoffClosureDigestPayload } from "./opsPromotionArchiveHandoffDigestPayloads.js";
import { archiveHandoffClosureItems } from "./opsPromotionArchiveSteps.js";
import {
  archiveHandoffClosureNextActions,
  archiveHandoffClosureVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";
import { missingHandoffVerificationDigest } from "./opsPromotionArchiveHandoffVerificationDigests.js";
import { digestStable, stableJson } from "./stableDigest.js";

export function createOpsPromotionHandoffClosure(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
}): OpsPromotionHandoffClosure {
  const closureName = `promotion-closure-${input.receiptVerification.recomputedReceiptDigest.value.slice(0, 12)}`;
  const closureItems = archiveHandoffClosureItems(input.receipt, input.receiptVerification);
  const verification = {
    receiptVerified: input.receiptVerification.valid,
    receiptDigestValid: input.receiptVerification.checks.receiptDigestValid,
    milestoneReferencesValid: input.receiptVerification.checks.milestonesValid,
    certificateReferenceValid: input.receiptVerification.checks.certificateDigestMatches
      && input.receiptVerification.checks.verifiedCertificateDigestMatches,
    packageReferenceValid: input.receiptVerification.checks.packageDigestMatches
      && input.receiptVerification.checks.verifiedPackageDigestMatches,
    sealReferenceValid: input.receiptVerification.checks.sealDigestMatches,
    milestoneCount: input.receiptVerification.summary.milestoneCount,
    closureItemCount: closureItems.length,
  };
  const valid = input.receipt.valid
    && input.receiptVerification.valid
    && input.receipt.receiptDigest.value === input.receiptVerification.recomputedReceiptDigest.value
    && closureItems.every((item) => item.valid);
  const handoffReady = valid && input.receipt.handoffReady && input.receiptVerification.handoffReady;
  const nextActions = archiveHandoffClosureNextActions(input.receipt, input.receiptVerification, valid);
  const digestPayload = archiveHandoffClosureDigestPayload({
    closureName,
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    receiptDigest: input.receipt.receiptDigest.value,
    verifiedReceiptDigest: input.receiptVerification.recomputedReceiptDigest.value,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification,
    closureItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    closureName,
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    closureDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "closureItems",
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
    certificateDigest: {
      algorithm: "sha256",
      value: input.receipt.certificateDigest.value,
    },
    verifiedCertificateDigest: {
      algorithm: "sha256",
      value: input.receipt.verifiedCertificateDigest.value,
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.receipt.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.receipt.verifiedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.receipt.sealDigest.value,
    },
    decision: input.receipt.decision,
    verification,
    closureItems,
    nextActions,
  };
}

export function createOpsPromotionHandoffClosureVerification(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
  closure: OpsPromotionHandoffClosure;
}): OpsPromotionHandoffClosureVerification {
  const expectedClosure = createOpsPromotionHandoffClosure({
    receipt: input.receipt,
    receiptVerification: input.receiptVerification,
  });
  const recomputedClosureDigest = digestStable(archiveHandoffClosureDigestPayload({
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid: input.closure.valid,
    state: input.closure.state,
    handoffReady: input.closure.handoffReady,
    receiptDigest: input.closure.receiptDigest.value,
    verifiedReceiptDigest: input.closure.verifiedReceiptDigest.value,
    certificateDigest: input.closure.certificateDigest.value,
    verifiedCertificateDigest: input.closure.verifiedCertificateDigest.value,
    packageDigest: input.closure.packageDigest.value,
    verifiedPackageDigest: input.closure.verifiedPackageDigest.value,
    sealDigest: input.closure.sealDigest.value,
    decision: input.closure.decision,
    verification: input.closure.verification,
    closureItems: input.closure.closureItems,
    nextActions: input.closure.nextActions,
  }));
  const closureItemChecks = input.closure.closureItems.map((item) => {
    const expected = expectedClosure.closureItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const expectedDigest = expected?.digest ?? missingHandoffVerificationDigest(item.name);
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      closureDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
    };
  });
  const checks = {
    closureDigestValid: input.closure.closureDigest.value === recomputedClosureDigest,
    coveredFieldsMatch: stableJson(input.closure.closureDigest.coveredFields)
      === stableJson(expectedClosure.closureDigest.coveredFields),
    closureItemsValid: closureItemChecks.length === expectedClosure.closureItems.length
      && closureItemChecks.every((item) => item.valid),
    closureNameMatches: input.closure.closureName === expectedClosure.closureName,
    receiptNameMatches: input.closure.receiptName === expectedClosure.receiptName,
    certificateNameMatches: input.closure.certificateName === expectedClosure.certificateName,
    packageNameMatches: input.closure.packageName === expectedClosure.packageName,
    archiveNameMatches: input.closure.archiveName === expectedClosure.archiveName,
    validMatches: input.closure.valid === expectedClosure.valid,
    stateMatches: input.closure.state === expectedClosure.state,
    handoffReadyMatches: input.closure.handoffReady === expectedClosure.handoffReady,
    receiptDigestMatches: input.closure.receiptDigest.value === expectedClosure.receiptDigest.value,
    verifiedReceiptDigestMatches: input.closure.verifiedReceiptDigest.value === expectedClosure.verifiedReceiptDigest.value,
    certificateDigestMatches: input.closure.certificateDigest.value === expectedClosure.certificateDigest.value,
    verifiedCertificateDigestMatches: input.closure.verifiedCertificateDigest.value === expectedClosure.verifiedCertificateDigest.value,
    packageDigestMatches: input.closure.packageDigest.value === expectedClosure.packageDigest.value,
    verifiedPackageDigestMatches: input.closure.verifiedPackageDigest.value === expectedClosure.verifiedPackageDigest.value,
    sealDigestMatches: input.closure.sealDigest.value === expectedClosure.sealDigest.value,
    decisionMatches: stableJson(input.closure.decision) === stableJson(expectedClosure.decision),
    verificationMatches: stableJson(input.closure.verification) === stableJson(expectedClosure.verification),
    nextActionsMatch: stableJson(input.closure.nextActions) === stableJson(expectedClosure.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady: input.closure.handoffReady,
    closureDigest: {
      algorithm: "sha256",
      value: input.closure.closureDigest.value,
    },
    recomputedClosureDigest: {
      algorithm: "sha256",
      value: recomputedClosureDigest,
    },
    checks,
    summary: {
      totalDecisions: input.closure.decision.totalDecisions,
      latestDecisionId: input.closure.decision.latestDecisionId,
      closureItemCount: closureItemChecks.length,
      handoffReady: input.closure.handoffReady,
    },
    closureItems: closureItemChecks,
    nextActions: archiveHandoffClosureVerificationNextActions(checks, input.closure),
  };
}
