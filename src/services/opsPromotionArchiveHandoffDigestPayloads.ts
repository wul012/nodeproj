import type {
  OpsPromotionArchiveAttestationState,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptMilestone,
} from "./opsPromotionArchiveBundleTypes.js";

export function archiveHandoffCertificateDigestPayload(input: {
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

export function archiveHandoffReceiptDigestPayload(input: {
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

export function archiveHandoffClosureDigestPayload(input: {
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

export function archiveHandoffCompletionDigestPayload(input: {
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

export function archiveHandoffPackageDigestPayload(input: {
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
