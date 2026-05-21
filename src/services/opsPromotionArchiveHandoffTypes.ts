import type { OpsPromotionDecision } from "./opsPromotionReview.js";
import type { OpsPromotionArchiveAttestationState } from "./opsPromotionArchiveCoreTypes.js";

export type OpsPromotionHandoffPackageAttachmentName =
  | "archive-bundle"
  | "archive-manifest"
  | "archive-verification"
  | "archive-attestation"
  | "attestation-verification";

export interface OpsPromotionHandoffPackageAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffPackage {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestOutcome?: OpsPromotionDecision;
    evidenceSourceCount: number;
    attachmentCount: number;
  };
  attachments: OpsPromotionHandoffPackageAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffPackageVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffPackageVerification {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    packageDigestValid: boolean;
    attachmentsValid: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    sealDigestMatches: boolean;
    manifestDigestMatches: boolean;
    verificationDigestMatches: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    attachmentCount: number;
    handoffReady: boolean;
  };
  attachments: OpsPromotionHandoffPackageVerificationAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffCertificateAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffCertificate {
  service: "orderops-node";
  generatedAt: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestOutcome?: OpsPromotionDecision;
  };
  verification: {
    packageVerified: boolean;
    packageDigestValid: boolean;
    attachmentsValid: boolean;
    attachmentCount: number;
  };
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffCertificateVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffCertificateVerification {
  service: "orderops-node";
  generatedAt: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    certificateDigestValid: boolean;
    coveredFieldsMatch: boolean;
    attachmentsValid: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    attachmentCount: number;
    handoffReady: boolean;
  };
  attachments: OpsPromotionHandoffCertificateVerificationAttachment[];
  nextActions: string[];
}

export type OpsPromotionHandoffReceiptMilestoneName =
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal"
  | "handoff-certificate"
  | "certificate-verification";

export interface OpsPromotionHandoffReceiptMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffReceipt {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffCertificate["decision"];
  verification: {
    certificateVerified: boolean;
    certificateDigestValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    attachmentsValid: boolean;
    milestoneCount: number;
    attachmentCount: number;
  };
  milestones: OpsPromotionHandoffReceiptMilestone[];
  nextActions: string[];
}

export interface OpsPromotionHandoffReceiptVerificationMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffReceiptVerification {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    receiptDigestValid: boolean;
    coveredFieldsMatch: boolean;
    milestonesValid: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    certificateDigestMatches: boolean;
    verifiedCertificateDigestMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    milestoneCount: number;
    handoffReady: boolean;
  };
  milestones: OpsPromotionHandoffReceiptVerificationMilestone[];
  nextActions: string[];
}

export type OpsPromotionHandoffClosureItemName =
  | "handoff-receipt"
  | "verified-handoff-receipt"
  | "handoff-certificate"
  | "verified-handoff-certificate"
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal";

export interface OpsPromotionHandoffClosureItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffClosure {
  service: "orderops-node";
  generatedAt: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffReceipt["decision"];
  verification: {
    receiptVerified: boolean;
    receiptDigestValid: boolean;
    milestoneReferencesValid: boolean;
    certificateReferenceValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    milestoneCount: number;
    closureItemCount: number;
  };
  closureItems: OpsPromotionHandoffClosureItem[];
  nextActions: string[];
}

export interface OpsPromotionHandoffClosureVerificationItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffClosureVerification {
  service: "orderops-node";
  generatedAt: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedClosureDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    closureDigestValid: boolean;
    coveredFieldsMatch: boolean;
    closureItemsValid: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    receiptDigestMatches: boolean;
    verifiedReceiptDigestMatches: boolean;
    certificateDigestMatches: boolean;
    verifiedCertificateDigestMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    closureItemCount: number;
    handoffReady: boolean;
  };
  closureItems: OpsPromotionHandoffClosureVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionHandoffCompletionStepName =
  | "closure-created"
  | "closure-verified"
  | "closure-items-verified"
  | "receipt-chain-verified"
  | "handoff-readiness-recorded";

export interface OpsPromotionHandoffCompletionStep {
  name: OpsPromotionHandoffCompletionStepName;
  valid: boolean;
  ready: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionHandoffCompletion {
  service: "orderops-node";
  generatedAt: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  completionDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedClosureDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffClosure["decision"];
  verification: {
    closureVerified: boolean;
    closureDigestValid: boolean;
    closureItemsValid: boolean;
    referenceChecksValid: boolean;
    closeoutReady: boolean;
    closureItemCount: number;
    completionStepCount: number;
  };
  completionSteps: OpsPromotionHandoffCompletionStep[];
  nextActions: string[];
}

export interface OpsPromotionHandoffCompletionVerificationStep {
  name: OpsPromotionHandoffCompletionStepName;
  valid: boolean;
  validMatches: boolean;
  readyMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  completionDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
  detail: string;
}

export interface OpsPromotionHandoffCompletionVerification {
  service: "orderops-node";
  generatedAt: string;
  completionName: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  completionDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedCompletionDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    completionDigestValid: boolean;
    coveredFieldsMatch: boolean;
    completionStepsValid: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    closureDigestMatches: boolean;
    verifiedClosureDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    completionStepCount: number;
    handoffReady: boolean;
    closeoutReady: boolean;
  };
  completionSteps: OpsPromotionHandoffCompletionVerificationStep[];
  nextActions: string[];
}

