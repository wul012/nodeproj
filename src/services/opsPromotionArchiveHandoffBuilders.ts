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

export function createOpsPromotionHandoffPackage(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackage {
  const attachments = archiveHandoffPackageAttachments(input);
  const valid = input.attestationVerification.valid && attachments.every((attachment) => attachment.valid);
  const nextActions = archiveHandoffPackageNextActions(input.attestation, input.attestationVerification);
  const packageName = `promotion-handoff-${input.attestation.sealDigest.value.slice(0, 12)}`;
  const digestPayload = archiveHandoffPackageDigestPayload({
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    sealDigest: input.attestation.sealDigest.value,
    manifestDigest: input.manifest.manifestDigest.value,
    verificationDigest: input.attestation.verificationDigest.value,
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "sealDigest",
        "manifestDigest",
        "verificationDigest",
        "summary",
        "attachments",
        "nextActions",
      ],
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.attestation.sealDigest.value,
    },
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: input.attestation.verificationDigest.value,
    },
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  };
}

export function createOpsPromotionHandoffPackageVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
  handoffPackage: OpsPromotionHandoffPackage;
}): OpsPromotionHandoffPackageVerification {
  const expectedPackage = createOpsPromotionHandoffPackage({
    bundle: input.bundle,
    manifest: input.manifest,
    verification: input.verification,
    attestation: input.attestation,
    attestationVerification: input.attestationVerification,
  });
  const recomputedPackageDigest = digestStable(archiveHandoffPackageDigestPayload({
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid: input.handoffPackage.valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    sealDigest: input.handoffPackage.sealDigest.value,
    manifestDigest: input.handoffPackage.manifestDigest.value,
    verificationDigest: input.handoffPackage.verificationDigest.value,
    summary: input.handoffPackage.summary,
    attachments: input.handoffPackage.attachments,
    nextActions: input.handoffPackage.nextActions,
  }));
  const attachmentChecks = input.handoffPackage.attachments.map((attachment) => {
    const expected = expectedPackage.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      packageDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
  const checks = {
    packageDigestValid: input.handoffPackage.packageDigest.value === recomputedPackageDigest,
    attachmentsValid: attachmentChecks.length === expectedPackage.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    packageNameMatches: input.handoffPackage.packageName === expectedPackage.packageName,
    archiveNameMatches: input.handoffPackage.archiveName === expectedPackage.archiveName,
    validMatches: input.handoffPackage.valid === expectedPackage.valid,
    stateMatches: input.handoffPackage.state === expectedPackage.state,
    handoffReadyMatches: input.handoffPackage.handoffReady === expectedPackage.handoffReady,
    sealDigestMatches: input.handoffPackage.sealDigest.value === expectedPackage.sealDigest.value,
    manifestDigestMatches: input.handoffPackage.manifestDigest.value === expectedPackage.manifestDigest.value,
    verificationDigestMatches: input.handoffPackage.verificationDigest.value === expectedPackage.verificationDigest.value,
    summaryMatches: stableJson(input.handoffPackage.summary) === stableJson(expectedPackage.summary),
    nextActionsMatch: stableJson(input.handoffPackage.nextActions) === stableJson(expectedPackage.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.packageDigest.value,
    },
    recomputedPackageDigest: {
      algorithm: "sha256",
      value: recomputedPackageDigest,
    },
    checks,
    summary: {
      totalDecisions: input.handoffPackage.summary.totalDecisions,
      latestDecisionId: input.handoffPackage.summary.latestDecisionId,
      attachmentCount: attachmentChecks.length,
      handoffReady: input.handoffPackage.handoffReady,
    },
    attachments: attachmentChecks,
    nextActions: archiveHandoffPackageVerificationNextActions(checks, input.handoffPackage),
  };
}

export function createOpsPromotionHandoffCertificate(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
}): OpsPromotionHandoffCertificate {
  const certificateName = `promotion-certificate-${input.handoffPackage.packageDigest.value.slice(0, 12)}`;
  const attachments = input.handoffPackage.attachments.map((attachment) => {
    const verificationAttachment = input.handoffPackageVerification.attachments.find((candidate) => candidate.name === attachment.name);

    return {
      name: attachment.name,
      valid: attachment.valid && verificationAttachment?.valid === true,
      source: attachment.source,
      digest: { ...attachment.digest },
    };
  });
  const verification = {
    packageVerified: input.handoffPackageVerification.valid,
    packageDigestValid: input.handoffPackageVerification.checks.packageDigestValid,
    attachmentsValid: input.handoffPackageVerification.checks.attachmentsValid,
    attachmentCount: attachments.length,
  };
  const valid = input.handoffPackage.valid && input.handoffPackageVerification.valid && attachments.every((attachment) => attachment.valid);
  const handoffReady = valid && input.handoffPackage.handoffReady;
  const nextActions = archiveHandoffCertificateNextActions(input.handoffPackage, input.handoffPackageVerification, valid);
  const decision = {
    totalDecisions: input.handoffPackage.summary.totalDecisions,
    latestDecisionId: input.handoffPackage.summary.latestDecisionId,
    latestOutcome: input.handoffPackage.summary.latestOutcome,
  };
  const digestPayload = archiveHandoffCertificateDigestPayload({
    certificateName,
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady,
    packageDigest: input.handoffPackage.packageDigest.value,
    verifiedPackageDigest: input.handoffPackageVerification.recomputedPackageDigest.value,
    sealDigest: input.handoffPackage.sealDigest.value,
    decision,
    verification,
    attachments,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    certificateName,
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady,
    certificateDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "attachments",
        "nextActions",
      ],
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.handoffPackageVerification.recomputedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.sealDigest.value,
    },
    decision,
    verification,
    attachments,
    nextActions,
  };
}

export function createOpsPromotionHandoffCertificateVerification(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
  certificate: OpsPromotionHandoffCertificate;
}): OpsPromotionHandoffCertificateVerification {
  const expectedCertificate = createOpsPromotionHandoffCertificate({
    handoffPackage: input.handoffPackage,
    handoffPackageVerification: input.handoffPackageVerification,
  });
  const recomputedCertificateDigest = digestStable(archiveHandoffCertificateDigestPayload({
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid: input.certificate.valid,
    state: input.certificate.state,
    handoffReady: input.certificate.handoffReady,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification: input.certificate.verification,
    attachments: input.certificate.attachments,
    nextActions: input.certificate.nextActions,
  }));
  const attachmentChecks = input.certificate.attachments.map((attachment) => {
    const expected = expectedCertificate.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      certificateDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
  const checks = {
    certificateDigestValid: input.certificate.certificateDigest.value === recomputedCertificateDigest,
    coveredFieldsMatch: stableJson(input.certificate.certificateDigest.coveredFields)
      === stableJson(expectedCertificate.certificateDigest.coveredFields),
    attachmentsValid: attachmentChecks.length === expectedCertificate.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    certificateNameMatches: input.certificate.certificateName === expectedCertificate.certificateName,
    packageNameMatches: input.certificate.packageName === expectedCertificate.packageName,
    archiveNameMatches: input.certificate.archiveName === expectedCertificate.archiveName,
    validMatches: input.certificate.valid === expectedCertificate.valid,
    stateMatches: input.certificate.state === expectedCertificate.state,
    handoffReadyMatches: input.certificate.handoffReady === expectedCertificate.handoffReady,
    packageDigestMatches: input.certificate.packageDigest.value === expectedCertificate.packageDigest.value,
    verifiedPackageDigestMatches: input.certificate.verifiedPackageDigest.value === expectedCertificate.verifiedPackageDigest.value,
    sealDigestMatches: input.certificate.sealDigest.value === expectedCertificate.sealDigest.value,
    decisionMatches: stableJson(input.certificate.decision) === stableJson(expectedCertificate.decision),
    verificationMatches: stableJson(input.certificate.verification) === stableJson(expectedCertificate.verification),
    nextActionsMatch: stableJson(input.certificate.nextActions) === stableJson(expectedCertificate.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady: input.certificate.handoffReady,
    certificateDigest: {
      algorithm: "sha256",
      value: input.certificate.certificateDigest.value,
    },
    recomputedCertificateDigest: {
      algorithm: "sha256",
      value: recomputedCertificateDigest,
    },
    checks,
    summary: {
      totalDecisions: input.certificate.decision.totalDecisions,
      latestDecisionId: input.certificate.decision.latestDecisionId,
      attachmentCount: attachmentChecks.length,
      handoffReady: input.certificate.handoffReady,
    },
    attachments: attachmentChecks,
    nextActions: archiveHandoffCertificateVerificationNextActions(checks, input.certificate),
  };
}

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
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: milestone.name }) };
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
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
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

export function createOpsPromotionHandoffCompletion(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
}): OpsPromotionHandoffCompletion {
  const completionName = `promotion-completion-${input.closureVerification.recomputedClosureDigest.value.slice(0, 12)}`;
  const completionSteps = archiveHandoffCompletionSteps(input.closure, input.closureVerification);
  const referenceChecksValid = archiveHandoffCompletionReferenceChecksValid(input.closureVerification);
  const verification = {
    closureVerified: input.closureVerification.valid,
    closureDigestValid: input.closureVerification.checks.closureDigestValid,
    closureItemsValid: input.closureVerification.checks.closureItemsValid,
    referenceChecksValid,
    closeoutReady: input.closureVerification.handoffReady,
    closureItemCount: input.closureVerification.summary.closureItemCount,
    completionStepCount: completionSteps.length,
  };
  const valid = input.closure.valid
    && input.closureVerification.valid
    && input.closure.closureDigest.value === input.closureVerification.recomputedClosureDigest.value
    && completionSteps.every((step) => step.valid);
  const handoffReady = valid && input.closure.handoffReady && input.closureVerification.handoffReady;
  const nextActions = archiveHandoffCompletionNextActions(input.closureVerification, valid, handoffReady);
  const digestPayload = archiveHandoffCompletionDigestPayload({
    completionName,
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady,
    closureDigest: input.closure.closureDigest.value,
    verifiedClosureDigest: input.closureVerification.recomputedClosureDigest.value,
    decision: input.closure.decision,
    verification,
    completionSteps,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    completionName,
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady,
    completionDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "completionName",
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "completionSteps",
        "nextActions",
      ],
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.closure.closureDigest.value,
    },
    verifiedClosureDigest: {
      algorithm: "sha256",
      value: input.closureVerification.recomputedClosureDigest.value,
    },
    decision: input.closure.decision,
    verification,
    completionSteps,
    nextActions,
  };
}

export function createOpsPromotionHandoffCompletionVerification(input: {
  closure: OpsPromotionHandoffClosure;
  closureVerification: OpsPromotionHandoffClosureVerification;
  completion: OpsPromotionHandoffCompletion;
}): OpsPromotionHandoffCompletionVerification {
  const expectedCompletion = createOpsPromotionHandoffCompletion({
    closure: input.closure,
    closureVerification: input.closureVerification,
  });
  const recomputedCompletionDigest = digestStable(archiveHandoffCompletionDigestPayload({
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid: input.completion.valid,
    state: input.completion.state,
    handoffReady: input.completion.handoffReady,
    closureDigest: input.completion.closureDigest.value,
    verifiedClosureDigest: input.completion.verifiedClosureDigest.value,
    decision: input.completion.decision,
    verification: input.completion.verification,
    completionSteps: input.completion.completionSteps,
    nextActions: input.completion.nextActions,
  }));
  const completionStepChecks = input.completion.completionSteps.map((step) => {
    const expected = expectedCompletion.completionSteps.find((candidate) => candidate.name === step.name);
    const validMatches = expected?.valid === step.valid;
    const readyMatches = expected?.ready === step.ready;
    const sourceMatches = expected?.source === step.source;
    const detailMatches = expected?.detail === step.detail;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: step.name }) };
    const digestMatches = step.digest.value === expectedDigest.value;

    return {
      name: step.name,
      valid: expected !== undefined && validMatches && readyMatches && sourceMatches && detailMatches && digestMatches,
      validMatches,
      readyMatches,
      sourceMatches,
      detailMatches,
      digestMatches,
      completionDigest: { ...step.digest },
      recomputedDigest: expectedDigest,
      source: step.source,
      detail: step.detail,
    };
  });
  const checks = {
    completionDigestValid: input.completion.completionDigest.value === recomputedCompletionDigest,
    coveredFieldsMatch: stableJson(input.completion.completionDigest.coveredFields)
      === stableJson(expectedCompletion.completionDigest.coveredFields),
    completionStepsValid: completionStepChecks.length === expectedCompletion.completionSteps.length
      && completionStepChecks.every((step) => step.valid),
    completionNameMatches: input.completion.completionName === expectedCompletion.completionName,
    closureNameMatches: input.completion.closureName === expectedCompletion.closureName,
    receiptNameMatches: input.completion.receiptName === expectedCompletion.receiptName,
    certificateNameMatches: input.completion.certificateName === expectedCompletion.certificateName,
    packageNameMatches: input.completion.packageName === expectedCompletion.packageName,
    archiveNameMatches: input.completion.archiveName === expectedCompletion.archiveName,
    validMatches: input.completion.valid === expectedCompletion.valid,
    stateMatches: input.completion.state === expectedCompletion.state,
    handoffReadyMatches: input.completion.handoffReady === expectedCompletion.handoffReady,
    closureDigestMatches: input.completion.closureDigest.value === expectedCompletion.closureDigest.value,
    verifiedClosureDigestMatches: input.completion.verifiedClosureDigest.value === expectedCompletion.verifiedClosureDigest.value,
    decisionMatches: stableJson(input.completion.decision) === stableJson(expectedCompletion.decision),
    verificationMatches: stableJson(input.completion.verification) === stableJson(expectedCompletion.verification),
    nextActionsMatch: stableJson(input.completion.nextActions) === stableJson(expectedCompletion.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady: input.completion.handoffReady,
    completionDigest: {
      algorithm: "sha256",
      value: input.completion.completionDigest.value,
    },
    recomputedCompletionDigest: {
      algorithm: "sha256",
      value: recomputedCompletionDigest,
    },
    checks,
    summary: {
      totalDecisions: input.completion.decision.totalDecisions,
      latestDecisionId: input.completion.decision.latestDecisionId,
      completionStepCount: completionStepChecks.length,
      handoffReady: input.completion.handoffReady,
      closeoutReady: input.completion.verification.closeoutReady,
    },
    completionSteps: completionStepChecks,
    nextActions: archiveHandoffCompletionVerificationNextActions(checks, input.completion),
  };
}

function archiveHandoffCertificateDigestPayload(input: {
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffCertificate["decision"];
  verification: OpsPromotionHandoffCertificate["verification"];
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}) {
  return {
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    attachments: input.attachments.map((attachment) => ({
      name: attachment.name,
      valid: attachment.valid,
      source: attachment.source,
      digest: attachment.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffReceiptDigestPayload(input: {
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffReceipt["decision"];
  verification: OpsPromotionHandoffReceipt["verification"];
  milestones: OpsPromotionHandoffReceiptMilestone[];
  nextActions: string[];
}) {
  return {
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    certificateDigest: input.certificateDigest,
    verifiedCertificateDigest: input.verifiedCertificateDigest,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    milestones: input.milestones.map((milestone) => ({
      name: milestone.name,
      valid: milestone.valid,
      source: milestone.source,
      digest: milestone.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffClosureDigestPayload(input: {
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: string;
  verifiedReceiptDigest: string;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffClosure["decision"];
  verification: OpsPromotionHandoffClosure["verification"];
  closureItems: OpsPromotionHandoffClosureItem[];
  nextActions: string[];
}) {
  return {
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    receiptDigest: input.receiptDigest,
    verifiedReceiptDigest: input.verifiedReceiptDigest,
    certificateDigest: input.certificateDigest,
    verifiedCertificateDigest: input.verifiedCertificateDigest,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    closureItems: input.closureItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffCompletionDigestPayload(input: {
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: string;
  verifiedClosureDigest: string;
  decision: OpsPromotionHandoffCompletion["decision"];
  verification: OpsPromotionHandoffCompletion["verification"];
  completionSteps: OpsPromotionHandoffCompletionStep[];
  nextActions: string[];
}) {
  return {
    completionName: input.completionName,
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    closureDigest: input.closureDigest,
    verifiedClosureDigest: input.verifiedClosureDigest,
    decision: input.decision,
    verification: input.verification,
    completionSteps: input.completionSteps.map((step) => ({
      name: step.name,
      valid: step.valid,
      ready: step.ready,
      source: step.source,
      digest: step.digest.value,
      detail: step.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffPackageDigestPayload(input: {
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  sealDigest: string;
  manifestDigest: string;
  verificationDigest: string;
  summary: OpsPromotionHandoffPackage["summary"];
  attachments: OpsPromotionHandoffPackageAttachment[];
  nextActions: string[];
}) {
  return {
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    sealDigest: input.sealDigest,
    manifestDigest: input.manifestDigest,
    verificationDigest: input.verificationDigest,
    summary: input.summary,
    attachments: input.attachments.map((attachment) => ({
      name: attachment.name,
      valid: attachment.valid,
      source: attachment.source,
      digest: attachment.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

