import { createHash } from "node:crypto";

import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type { OpsPromotionDecision } from "./opsPromotionReview.js";

export type OpsPromotionArchiveState = "empty" | "ready" | "attention-required";
export type OpsPromotionArchiveArtifactType = "archive-summary" | "latest-evidence" | "ledger-integrity";

export interface OpsPromotionArchiveBundle {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestSequence?: number;
    latestOutcome?: OpsPromotionDecision;
    latestReadyForPromotion?: boolean;
    latestDigestValid?: boolean;
    integrityValid: boolean;
    integrityRootDigest: string;
    sequenceOrder: OpsPromotionDecisionLedgerIntegrity["checks"]["sequenceOrder"];
  };
  latestEvidence?: OpsPromotionEvidenceReport;
  integrity: OpsPromotionDecisionLedgerIntegrity;
  nextActions: string[];
}

export interface OpsPromotionArchiveManifestArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionArchiveManifest {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  summary: OpsPromotionArchiveBundle["summary"];
  artifacts: OpsPromotionArchiveManifestArtifact[];
  nextActions: string[];
}

export interface OpsPromotionArchiveVerificationArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  valid: boolean;
  presentMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionArchiveVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedManifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    manifestDigestValid: boolean;
    artifactsValid: boolean;
    archiveNameMatches: boolean;
    stateMatches: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    integrityRootDigest: string;
    artifactCount: number;
  };
  artifacts: OpsPromotionArchiveVerificationArtifact[];
  nextActions: string[];
}

export type OpsPromotionArchiveAttestationState = "not-started" | "blocked" | "ready";

export interface OpsPromotionArchiveAttestationEvidenceSource {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  verified: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionArchiveAttestation {
  service: "orderops-node";
  generatedAt: string;
  title: string;
  archiveName: string;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  decision: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestSequence?: number;
    latestOutcome?: OpsPromotionDecision;
    latestReadyForPromotion?: boolean;
    latestDigestValid?: boolean;
  };
  checks: {
    manifestVerified: boolean;
    artifactsVerified: boolean;
    archiveReady: boolean;
    latestDecisionReady: boolean;
    integrityVerified: boolean;
  };
  evidenceSources: OpsPromotionArchiveAttestationEvidenceSource[];
  nextActions: string[];
}

export interface OpsPromotionArchiveAttestationVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedSealDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedVerificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    sealDigestValid: boolean;
    verificationDigestValid: boolean;
    manifestDigestMatches: boolean;
    archiveNameMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    decisionMatches: boolean;
    checksMatch: boolean;
    evidenceSourcesMatch: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    evidenceSourceCount: number;
    handoffReady: boolean;
  };
  nextActions: string[];
}

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

export type OpsPromotionReleaseEvidenceItemName =
  | "handoff-completion"
  | "verified-handoff-completion"
  | "handoff-closure"
  | "verified-handoff-closure"
  | "final-closeout-state";

export interface OpsPromotionReleaseEvidenceItem {
  name: OpsPromotionReleaseEvidenceItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionReleaseEvidence {
  service: "orderops-node";
  generatedAt: string;
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
  evidenceDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  completionDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCompletionDigest: {
    algorithm: "sha256";
    value: string;
  };
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedClosureDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffCompletion["decision"];
  verification: {
    completionVerified: boolean;
    completionDigestValid: boolean;
    completionStepsValid: boolean;
    closureReferenceValid: boolean;
    closeoutReady: boolean;
    completionStepCount: number;
    evidenceItemCount: number;
  };
  evidenceItems: OpsPromotionReleaseEvidenceItem[];
  nextActions: string[];
}

export interface OpsPromotionReleaseEvidenceVerificationItem {
  name: OpsPromotionReleaseEvidenceItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  evidenceDigest: {
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

export interface OpsPromotionReleaseEvidenceVerification {
  service: "orderops-node";
  generatedAt: string;
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
  evidenceDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedEvidenceDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    evidenceDigestValid: boolean;
    coveredFieldsMatch: boolean;
    evidenceItemsValid: boolean;
    evidenceNameMatches: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    completionDigestMatches: boolean;
    verifiedCompletionDigestMatches: boolean;
    closureDigestMatches: boolean;
    verifiedClosureDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    evidenceItemCount: number;
    handoffReady: boolean;
    closeoutReady: boolean;
  };
  evidenceItems: OpsPromotionReleaseEvidenceVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionReleaseArchiveItemName =
  | "release-evidence"
  | "verified-release-evidence"
  | "handoff-completion"
  | "final-archive-state";

export interface OpsPromotionReleaseArchiveItem {
  name: OpsPromotionReleaseArchiveItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionReleaseArchive {
  service: "orderops-node";
  generatedAt: string;
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
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  evidenceDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedEvidenceDigest: {
    algorithm: "sha256";
    value: string;
  };
  completionDigest: {
    algorithm: "sha256";
    value: string;
  };
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionReleaseEvidence["decision"];
  verification: {
    evidenceVerified: boolean;
    evidenceDigestValid: boolean;
    evidenceItemsValid: boolean;
    evidenceReferenceValid: boolean;
    closeoutReady: boolean;
    evidenceItemCount: number;
    archiveItemCount: number;
  };
  archiveItems: OpsPromotionReleaseArchiveItem[];
  nextActions: string[];
}

export interface OpsPromotionReleaseArchiveVerificationItem {
  name: OpsPromotionReleaseArchiveItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  releaseArchiveDigest: {
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

export interface OpsPromotionReleaseArchiveVerification {
  service: "orderops-node";
  generatedAt: string;
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
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedReleaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    releaseArchiveDigestValid: boolean;
    coveredFieldsMatch: boolean;
    archiveItemsValid: boolean;
    releaseArchiveNameMatches: boolean;
    evidenceNameMatches: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    evidenceDigestMatches: boolean;
    verifiedEvidenceDigestMatches: boolean;
    completionDigestMatches: boolean;
    closureDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    archiveItemCount: number;
    handoffReady: boolean;
    closeoutReady: boolean;
  };
  archiveItems: OpsPromotionReleaseArchiveVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionDeploymentApprovalItemName =
  | "release-archive"
  | "verified-release-archive"
  | "verified-release-evidence"
  | "deployment-approval-state";

export interface OpsPromotionDeploymentApprovalItem {
  name: OpsPromotionDeploymentApprovalItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionDeploymentApproval {
  service: "orderops-node";
  generatedAt: string;
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
  approvalDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedReleaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  evidenceDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionReleaseArchive["decision"];
  verification: {
    releaseArchiveVerified: boolean;
    releaseArchiveDigestValid: boolean;
    archiveItemsValid: boolean;
    releaseArchiveReferenceValid: boolean;
    closeoutReady: boolean;
    archiveItemCount: number;
    approvalItemCount: number;
  };
  approvalItems: OpsPromotionDeploymentApprovalItem[];
  nextActions: string[];
}

export interface OpsPromotionDeploymentApprovalVerificationItem {
  name: OpsPromotionDeploymentApprovalItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  approvalDigest: {
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

export interface OpsPromotionDeploymentApprovalVerification {
  service: "orderops-node";
  generatedAt: string;
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
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedApprovalDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    approvalDigestValid: boolean;
    coveredFieldsMatch: boolean;
    approvalItemsValid: boolean;
    approvalNameMatches: boolean;
    releaseArchiveNameMatches: boolean;
    evidenceNameMatches: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    approvalReadyMatches: boolean;
    releaseArchiveDigestMatches: boolean;
    verifiedReleaseArchiveDigestMatches: boolean;
    evidenceDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    approvalItemCount: number;
    handoffReady: boolean;
    approvalReady: boolean;
    closeoutReady: boolean;
  };
  approvalItems: OpsPromotionDeploymentApprovalVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionDeploymentChangeRecordItemName =
  | "deployment-approval"
  | "verified-deployment-approval"
  | "verified-release-archive"
  | "deployment-change-state";

export interface OpsPromotionDeploymentChangeRecordItem {
  name: OpsPromotionDeploymentChangeRecordItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionDeploymentChangeRecord {
  service: "orderops-node";
  generatedAt: string;
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
  changeDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedApprovalDigest: {
    algorithm: "sha256";
    value: string;
  };
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionDeploymentApproval["decision"];
  verification: {
    approvalVerified: boolean;
    approvalDigestValid: boolean;
    approvalItemsValid: boolean;
    approvalReferenceValid: boolean;
    closeoutReady: boolean;
    approvalItemCount: number;
    changeItemCount: number;
  };
  changeItems: OpsPromotionDeploymentChangeRecordItem[];
  nextActions: string[];
}

export interface OpsPromotionDeploymentChangeRecordVerificationItem {
  name: OpsPromotionDeploymentChangeRecordItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  changeItemDigest: {
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

export interface OpsPromotionDeploymentChangeRecordVerification {
  service: "orderops-node";
  generatedAt: string;
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
  changeDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedChangeDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    changeDigestValid: boolean;
    coveredFieldsMatch: boolean;
    changeItemsValid: boolean;
    changeRecordNameMatches: boolean;
    approvalNameMatches: boolean;
    releaseArchiveNameMatches: boolean;
    evidenceNameMatches: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    approvalReadyMatches: boolean;
    changeReadyMatches: boolean;
    approvalDigestMatches: boolean;
    verifiedApprovalDigestMatches: boolean;
    releaseArchiveDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    changeItemCount: number;
    handoffReady: boolean;
    approvalReady: boolean;
    changeReady: boolean;
    closeoutReady: boolean;
  };
  changeItems: OpsPromotionDeploymentChangeRecordVerificationItem[];
  nextActions: string[];
}

export function createOpsPromotionArchiveBundle(input: {
  integrity: OpsPromotionDecisionLedgerIntegrity;
  latestEvidence?: OpsPromotionEvidenceReport;
}): OpsPromotionArchiveBundle {
  const state = archiveState(input.integrity, input.latestEvidence);
  const archiveName = `promotion-archive-${input.integrity.rootDigest.value.slice(0, 12)}`;

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName,
    state,
    summary: {
      totalDecisions: input.integrity.totalRecords,
      latestDecisionId: input.latestEvidence?.decisionId,
      latestSequence: input.latestEvidence?.sequence,
      latestOutcome: input.latestEvidence?.summary.outcome,
      latestReadyForPromotion: input.latestEvidence?.summary.readyForPromotion,
      latestDigestValid: input.latestEvidence?.summary.digestValid,
      integrityValid: input.integrity.valid,
      integrityRootDigest: input.integrity.rootDigest.value,
      sequenceOrder: input.integrity.checks.sequenceOrder,
    },
    latestEvidence: input.latestEvidence,
    integrity: input.integrity,
    nextActions: archiveNextActions(input.integrity, input.latestEvidence),
  };
}

export function createOpsPromotionArchiveManifest(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifest {
  const artifacts = archiveArtifacts(bundle);
  const manifestPayload = manifestDigestPayload({
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    artifacts,
    nextActions: bundle.nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: bundle.archiveName,
    state: bundle.state,
    manifestDigest: {
      algorithm: "sha256",
      value: digestStable(manifestPayload),
      coveredFields: ["archiveName", "state", "summary", "artifacts", "nextActions"],
    },
    summary: bundle.summary,
    artifacts,
    nextActions: bundle.nextActions,
  };
}

export function createOpsPromotionArchiveVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
}): OpsPromotionArchiveVerification {
  const expectedArtifacts = archiveArtifacts(input.bundle);
  const artifactChecks = input.manifest.artifacts.map((artifact) => {
    const expected = expectedArtifacts.find((candidate) => candidate.name === artifact.name);
    const presentMatches = expected?.present === artifact.present;
    const sourceMatches = expected?.source === artifact.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: artifact.name }) };
    const digestMatches = artifact.digest.value === expectedDigest.value;

    return {
      name: artifact.name,
      type: artifact.type,
      valid: expected !== undefined && presentMatches && sourceMatches && digestMatches,
      presentMatches,
      sourceMatches,
      digestMatches,
      manifestDigest: { ...artifact.digest },
      recomputedDigest: expectedDigest,
      source: artifact.source,
    };
  });
  const recomputedManifestDigest = digestStable(manifestDigestPayload(input.manifest));
  const archiveNameMatches = input.manifest.archiveName === input.bundle.archiveName;
  const stateMatches = input.manifest.state === input.bundle.state;
  const summaryMatches = stableJson(input.manifest.summary) === stableJson(input.bundle.summary);
  const nextActionsMatch = stableJson(input.manifest.nextActions) === stableJson(input.bundle.nextActions);
  const manifestDigestValid = input.manifest.manifestDigest.value === recomputedManifestDigest;
  const artifactsValid = artifactChecks.length === expectedArtifacts.length && artifactChecks.every((artifact) => artifact.valid);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: input.manifest.archiveName,
    valid: manifestDigestValid && artifactsValid && archiveNameMatches && stateMatches && summaryMatches && nextActionsMatch,
    state: input.manifest.state,
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    recomputedManifestDigest: {
      algorithm: "sha256",
      value: recomputedManifestDigest,
    },
    checks: {
      manifestDigestValid,
      artifactsValid,
      archiveNameMatches,
      stateMatches,
      summaryMatches,
      nextActionsMatch,
    },
    summary: {
      totalDecisions: input.manifest.summary.totalDecisions,
      latestDecisionId: input.manifest.summary.latestDecisionId,
      integrityRootDigest: input.manifest.summary.integrityRootDigest,
      artifactCount: artifactChecks.length,
    },
    artifacts: artifactChecks,
    nextActions: archiveVerificationNextActions(manifestDigestValid, artifactsValid, input.manifest),
  };
}

export function createOpsPromotionArchiveAttestation(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
}): OpsPromotionArchiveAttestation {
  const verificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
  const evidenceSources = input.manifest.artifacts.map((artifact) => {
    const verificationArtifact = input.verification.artifacts.find((candidate) => candidate.name === artifact.name);

    return {
      name: artifact.name,
      type: artifact.type,
      present: artifact.present,
      verified: verificationArtifact?.valid === true,
      source: artifact.source,
      digest: { ...artifact.digest },
    };
  });
  const checks = {
    manifestVerified: input.verification.checks.manifestDigestValid,
    artifactsVerified: input.verification.checks.artifactsValid,
    archiveReady: input.bundle.state === "ready" && input.manifest.state === "ready" && input.verification.state === "ready",
    latestDecisionReady: input.bundle.summary.latestOutcome === "approved"
      && input.bundle.summary.latestReadyForPromotion === true
      && input.bundle.summary.latestDigestValid === true,
    integrityVerified: input.bundle.summary.integrityValid
      && input.manifest.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest
      && input.verification.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest,
  };
  const handoffReady = input.verification.valid && Object.values(checks).every(Boolean);
  const state = handoffReady ? "ready" : input.bundle.summary.totalDecisions === 0 ? "not-started" : "blocked";
  const decision = {
    totalDecisions: input.bundle.summary.totalDecisions,
    latestDecisionId: input.bundle.summary.latestDecisionId,
    latestSequence: input.bundle.summary.latestSequence,
    latestOutcome: input.bundle.summary.latestOutcome,
    latestReadyForPromotion: input.bundle.summary.latestReadyForPromotion,
    latestDigestValid: input.bundle.summary.latestDigestValid,
  };
  const nextActions = archiveAttestationNextActions(state, checks, input.bundle, input.verification);
  const sealPayload = archiveAttestationDigestPayload({
    archiveName: input.bundle.archiveName,
    state,
    handoffReady,
    manifestDigest: input.manifest.manifestDigest.value,
    verificationDigest,
    decision,
    checks,
    evidenceSources,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    title: `Promotion archive attestation for ${input.bundle.archiveName}`,
    archiveName: input.bundle.archiveName,
    state,
    handoffReady,
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: verificationDigest,
    },
    sealDigest: {
      algorithm: "sha256",
      value: digestStable(sealPayload),
      coveredFields: [
        "archiveName",
        "state",
        "handoffReady",
        "manifestDigest",
        "verificationDigest",
        "decision",
        "checks",
        "evidenceSources",
        "nextActions",
      ],
    },
    decision,
    checks,
    evidenceSources,
    nextActions,
  };
}

export function createOpsPromotionArchiveAttestationVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
}): OpsPromotionArchiveAttestationVerification {
  const expectedAttestation = createOpsPromotionArchiveAttestation({
    bundle: input.bundle,
    manifest: input.manifest,
    verification: input.verification,
  });
  const recomputedVerificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
  const recomputedSealDigest = digestStable(archiveAttestationDigestPayload({
    archiveName: input.attestation.archiveName,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    manifestDigest: input.attestation.manifestDigest.value,
    verificationDigest: input.attestation.verificationDigest.value,
    decision: input.attestation.decision,
    checks: input.attestation.checks,
    evidenceSources: input.attestation.evidenceSources,
    nextActions: input.attestation.nextActions,
  }));
  const checks = {
    sealDigestValid: input.attestation.sealDigest.value === recomputedSealDigest,
    verificationDigestValid: input.attestation.verificationDigest.value === recomputedVerificationDigest,
    manifestDigestMatches: input.attestation.manifestDigest.value === input.manifest.manifestDigest.value,
    archiveNameMatches: input.attestation.archiveName === expectedAttestation.archiveName,
    stateMatches: input.attestation.state === expectedAttestation.state,
    handoffReadyMatches: input.attestation.handoffReady === expectedAttestation.handoffReady,
    decisionMatches: stableJson(input.attestation.decision) === stableJson(expectedAttestation.decision),
    checksMatch: stableJson(input.attestation.checks) === stableJson(expectedAttestation.checks),
    evidenceSourcesMatch: stableJson(input.attestation.evidenceSources) === stableJson(expectedAttestation.evidenceSources),
    nextActionsMatch: stableJson(input.attestation.nextActions) === stableJson(expectedAttestation.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: input.attestation.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    sealDigest: {
      algorithm: "sha256",
      value: input.attestation.sealDigest.value,
    },
    recomputedSealDigest: {
      algorithm: "sha256",
      value: recomputedSealDigest,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: input.attestation.verificationDigest.value,
    },
    recomputedVerificationDigest: {
      algorithm: "sha256",
      value: recomputedVerificationDigest,
    },
    checks,
    summary: {
      totalDecisions: input.attestation.decision.totalDecisions,
      latestDecisionId: input.attestation.decision.latestDecisionId,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      handoffReady: input.attestation.handoffReady,
    },
    nextActions: archiveAttestationVerificationNextActions(checks, input.attestation),
  };
}

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

export function createOpsPromotionReleaseEvidence(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
}): OpsPromotionReleaseEvidence {
  const evidenceName = `promotion-release-evidence-${input.completionVerification.recomputedCompletionDigest.value.slice(0, 12)}`;
  const evidenceItems = archiveReleaseEvidenceItems(input.completion, input.completionVerification);
  const closureReferenceValid = input.completionVerification.checks.closureDigestMatches
    && input.completionVerification.checks.verifiedClosureDigestMatches;
  const verification = {
    completionVerified: input.completionVerification.valid,
    completionDigestValid: input.completionVerification.checks.completionDigestValid,
    completionStepsValid: input.completionVerification.checks.completionStepsValid,
    closureReferenceValid,
    closeoutReady: input.completionVerification.summary.closeoutReady,
    completionStepCount: input.completionVerification.summary.completionStepCount,
    evidenceItemCount: evidenceItems.length,
  };
  const valid = input.completion.valid
    && input.completionVerification.valid
    && input.completion.completionDigest.value === input.completionVerification.recomputedCompletionDigest.value
    && evidenceItems.every((item) => item.valid);
  const handoffReady = valid && input.completion.handoffReady && input.completionVerification.handoffReady;
  const nextActions = archiveReleaseEvidenceNextActions(input.completionVerification, valid, handoffReady);
  const digestPayload = archiveReleaseEvidenceDigestPayload({
    evidenceName,
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady,
    completionDigest: input.completion.completionDigest.value,
    verifiedCompletionDigest: input.completionVerification.recomputedCompletionDigest.value,
    closureDigest: input.completion.closureDigest.value,
    verifiedClosureDigest: input.completion.verifiedClosureDigest.value,
    decision: input.completion.decision,
    verification,
    evidenceItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    evidenceName,
    completionName: input.completion.completionName,
    closureName: input.completion.closureName,
    receiptName: input.completion.receiptName,
    certificateName: input.completion.certificateName,
    packageName: input.completion.packageName,
    archiveName: input.completion.archiveName,
    valid,
    state: input.completion.state,
    handoffReady,
    evidenceDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
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
        "completionDigest",
        "verifiedCompletionDigest",
        "closureDigest",
        "verifiedClosureDigest",
        "decision",
        "verification",
        "evidenceItems",
        "nextActions",
      ],
    },
    completionDigest: {
      algorithm: "sha256",
      value: input.completion.completionDigest.value,
    },
    verifiedCompletionDigest: {
      algorithm: "sha256",
      value: input.completionVerification.recomputedCompletionDigest.value,
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.completion.closureDigest.value,
    },
    verifiedClosureDigest: {
      algorithm: "sha256",
      value: input.completion.verifiedClosureDigest.value,
    },
    decision: input.completion.decision,
    verification,
    evidenceItems,
    nextActions,
  };
}

export function createOpsPromotionReleaseEvidenceVerification(input: {
  completion: OpsPromotionHandoffCompletion;
  completionVerification: OpsPromotionHandoffCompletionVerification;
  evidence: OpsPromotionReleaseEvidence;
}): OpsPromotionReleaseEvidenceVerification {
  const expectedEvidence = createOpsPromotionReleaseEvidence({
    completion: input.completion,
    completionVerification: input.completionVerification,
  });
  const recomputedEvidenceDigest = digestStable(archiveReleaseEvidenceDigestPayload({
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid: input.evidence.valid,
    state: input.evidence.state,
    handoffReady: input.evidence.handoffReady,
    completionDigest: input.evidence.completionDigest.value,
    verifiedCompletionDigest: input.evidence.verifiedCompletionDigest.value,
    closureDigest: input.evidence.closureDigest.value,
    verifiedClosureDigest: input.evidence.verifiedClosureDigest.value,
    decision: input.evidence.decision,
    verification: input.evidence.verification,
    evidenceItems: input.evidence.evidenceItems,
    nextActions: input.evidence.nextActions,
  }));
  const evidenceItemChecks = input.evidence.evidenceItems.map((item) => {
    const expected = expectedEvidence.evidenceItems.find((candidate) => candidate.name === item.name);
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
      evidenceDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    evidenceDigestValid: input.evidence.evidenceDigest.value === recomputedEvidenceDigest,
    coveredFieldsMatch: stableJson(input.evidence.evidenceDigest.coveredFields)
      === stableJson(expectedEvidence.evidenceDigest.coveredFields),
    evidenceItemsValid: evidenceItemChecks.length === expectedEvidence.evidenceItems.length
      && evidenceItemChecks.every((item) => item.valid),
    evidenceNameMatches: input.evidence.evidenceName === expectedEvidence.evidenceName,
    completionNameMatches: input.evidence.completionName === expectedEvidence.completionName,
    closureNameMatches: input.evidence.closureName === expectedEvidence.closureName,
    receiptNameMatches: input.evidence.receiptName === expectedEvidence.receiptName,
    certificateNameMatches: input.evidence.certificateName === expectedEvidence.certificateName,
    packageNameMatches: input.evidence.packageName === expectedEvidence.packageName,
    archiveNameMatches: input.evidence.archiveName === expectedEvidence.archiveName,
    validMatches: input.evidence.valid === expectedEvidence.valid,
    stateMatches: input.evidence.state === expectedEvidence.state,
    handoffReadyMatches: input.evidence.handoffReady === expectedEvidence.handoffReady,
    completionDigestMatches: input.evidence.completionDigest.value === expectedEvidence.completionDigest.value,
    verifiedCompletionDigestMatches: input.evidence.verifiedCompletionDigest.value === expectedEvidence.verifiedCompletionDigest.value,
    closureDigestMatches: input.evidence.closureDigest.value === expectedEvidence.closureDigest.value,
    verifiedClosureDigestMatches: input.evidence.verifiedClosureDigest.value === expectedEvidence.verifiedClosureDigest.value,
    decisionMatches: stableJson(input.evidence.decision) === stableJson(expectedEvidence.decision),
    verificationMatches: stableJson(input.evidence.verification) === stableJson(expectedEvidence.verification),
    nextActionsMatch: stableJson(input.evidence.nextActions) === stableJson(expectedEvidence.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady: input.evidence.handoffReady,
    evidenceDigest: {
      algorithm: "sha256",
      value: input.evidence.evidenceDigest.value,
    },
    recomputedEvidenceDigest: {
      algorithm: "sha256",
      value: recomputedEvidenceDigest,
    },
    checks,
    summary: {
      totalDecisions: input.evidence.decision.totalDecisions,
      latestDecisionId: input.evidence.decision.latestDecisionId,
      evidenceItemCount: evidenceItemChecks.length,
      handoffReady: input.evidence.handoffReady,
      closeoutReady: input.evidence.verification.closeoutReady,
    },
    evidenceItems: evidenceItemChecks,
    nextActions: archiveReleaseEvidenceVerificationNextActions(checks, input.evidence),
  };
}

export function createOpsPromotionReleaseArchive(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
}): OpsPromotionReleaseArchive {
  const releaseArchiveName = `promotion-release-archive-${input.evidenceVerification.recomputedEvidenceDigest.value.slice(0, 12)}`;
  const archiveItems = archiveReleaseArchiveItems(input.evidence, input.evidenceVerification);
  const evidenceReferenceValid = input.evidence.evidenceDigest.value === input.evidenceVerification.recomputedEvidenceDigest.value;
  const verification = {
    evidenceVerified: input.evidenceVerification.valid,
    evidenceDigestValid: input.evidenceVerification.checks.evidenceDigestValid,
    evidenceItemsValid: input.evidenceVerification.checks.evidenceItemsValid,
    evidenceReferenceValid,
    closeoutReady: input.evidenceVerification.summary.closeoutReady,
    evidenceItemCount: input.evidenceVerification.summary.evidenceItemCount,
    archiveItemCount: archiveItems.length,
  };
  const valid = input.evidence.valid
    && input.evidenceVerification.valid
    && evidenceReferenceValid
    && archiveItems.every((item) => item.valid);
  const handoffReady = valid && input.evidence.handoffReady && input.evidenceVerification.handoffReady;
  const nextActions = archiveReleaseArchiveNextActions(input.evidenceVerification, valid, handoffReady);
  const digestPayload = archiveReleaseArchiveDigestPayload({
    releaseArchiveName,
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady,
    evidenceDigest: input.evidence.evidenceDigest.value,
    verifiedEvidenceDigest: input.evidenceVerification.recomputedEvidenceDigest.value,
    completionDigest: input.evidence.completionDigest.value,
    closureDigest: input.evidence.closureDigest.value,
    decision: input.evidence.decision,
    verification,
    archiveItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    releaseArchiveName,
    evidenceName: input.evidence.evidenceName,
    completionName: input.evidence.completionName,
    closureName: input.evidence.closureName,
    receiptName: input.evidence.receiptName,
    certificateName: input.evidence.certificateName,
    packageName: input.evidence.packageName,
    archiveName: input.evidence.archiveName,
    valid,
    state: input.evidence.state,
    handoffReady,
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
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
        "evidenceDigest",
        "verifiedEvidenceDigest",
        "completionDigest",
        "closureDigest",
        "decision",
        "verification",
        "archiveItems",
        "nextActions",
      ],
    },
    evidenceDigest: {
      algorithm: "sha256",
      value: input.evidence.evidenceDigest.value,
    },
    verifiedEvidenceDigest: {
      algorithm: "sha256",
      value: input.evidenceVerification.recomputedEvidenceDigest.value,
    },
    completionDigest: {
      algorithm: "sha256",
      value: input.evidence.completionDigest.value,
    },
    closureDigest: {
      algorithm: "sha256",
      value: input.evidence.closureDigest.value,
    },
    decision: input.evidence.decision,
    verification,
    archiveItems,
    nextActions,
  };
}

export function createOpsPromotionReleaseArchiveVerification(input: {
  evidence: OpsPromotionReleaseEvidence;
  evidenceVerification: OpsPromotionReleaseEvidenceVerification;
  releaseArchive: OpsPromotionReleaseArchive;
}): OpsPromotionReleaseArchiveVerification {
  const expectedReleaseArchive = createOpsPromotionReleaseArchive({
    evidence: input.evidence,
    evidenceVerification: input.evidenceVerification,
  });
  const recomputedReleaseArchiveDigest = digestStable(archiveReleaseArchiveDigestPayload({
    releaseArchiveName: input.releaseArchive.releaseArchiveName,
    evidenceName: input.releaseArchive.evidenceName,
    completionName: input.releaseArchive.completionName,
    closureName: input.releaseArchive.closureName,
    receiptName: input.releaseArchive.receiptName,
    certificateName: input.releaseArchive.certificateName,
    packageName: input.releaseArchive.packageName,
    archiveName: input.releaseArchive.archiveName,
    valid: input.releaseArchive.valid,
    state: input.releaseArchive.state,
    handoffReady: input.releaseArchive.handoffReady,
    evidenceDigest: input.releaseArchive.evidenceDigest.value,
    verifiedEvidenceDigest: input.releaseArchive.verifiedEvidenceDigest.value,
    completionDigest: input.releaseArchive.completionDigest.value,
    closureDigest: input.releaseArchive.closureDigest.value,
    decision: input.releaseArchive.decision,
    verification: input.releaseArchive.verification,
    archiveItems: input.releaseArchive.archiveItems,
    nextActions: input.releaseArchive.nextActions,
  }));
  const archiveItemChecks = input.releaseArchive.archiveItems.map((item) => {
    const expected = expectedReleaseArchive.archiveItems.find((candidate) => candidate.name === item.name);
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
      releaseArchiveDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
      detail: item.detail,
    };
  });
  const checks = {
    releaseArchiveDigestValid: input.releaseArchive.releaseArchiveDigest.value === recomputedReleaseArchiveDigest,
    coveredFieldsMatch: stableJson(input.releaseArchive.releaseArchiveDigest.coveredFields)
      === stableJson(expectedReleaseArchive.releaseArchiveDigest.coveredFields),
    archiveItemsValid: archiveItemChecks.length === expectedReleaseArchive.archiveItems.length
      && archiveItemChecks.every((item) => item.valid),
    releaseArchiveNameMatches: input.releaseArchive.releaseArchiveName === expectedReleaseArchive.releaseArchiveName,
    evidenceNameMatches: input.releaseArchive.evidenceName === expectedReleaseArchive.evidenceName,
    completionNameMatches: input.releaseArchive.completionName === expectedReleaseArchive.completionName,
    closureNameMatches: input.releaseArchive.closureName === expectedReleaseArchive.closureName,
    receiptNameMatches: input.releaseArchive.receiptName === expectedReleaseArchive.receiptName,
    certificateNameMatches: input.releaseArchive.certificateName === expectedReleaseArchive.certificateName,
    packageNameMatches: input.releaseArchive.packageName === expectedReleaseArchive.packageName,
    archiveNameMatches: input.releaseArchive.archiveName === expectedReleaseArchive.archiveName,
    validMatches: input.releaseArchive.valid === expectedReleaseArchive.valid,
    stateMatches: input.releaseArchive.state === expectedReleaseArchive.state,
    handoffReadyMatches: input.releaseArchive.handoffReady === expectedReleaseArchive.handoffReady,
    evidenceDigestMatches: input.releaseArchive.evidenceDigest.value === expectedReleaseArchive.evidenceDigest.value,
    verifiedEvidenceDigestMatches: input.releaseArchive.verifiedEvidenceDigest.value === expectedReleaseArchive.verifiedEvidenceDigest.value,
    completionDigestMatches: input.releaseArchive.completionDigest.value === expectedReleaseArchive.completionDigest.value,
    closureDigestMatches: input.releaseArchive.closureDigest.value === expectedReleaseArchive.closureDigest.value,
    decisionMatches: stableJson(input.releaseArchive.decision) === stableJson(expectedReleaseArchive.decision),
    verificationMatches: stableJson(input.releaseArchive.verification) === stableJson(expectedReleaseArchive.verification),
    nextActionsMatch: stableJson(input.releaseArchive.nextActions) === stableJson(expectedReleaseArchive.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
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
    handoffReady: input.releaseArchive.handoffReady,
    releaseArchiveDigest: {
      algorithm: "sha256",
      value: input.releaseArchive.releaseArchiveDigest.value,
    },
    recomputedReleaseArchiveDigest: {
      algorithm: "sha256",
      value: recomputedReleaseArchiveDigest,
    },
    checks,
    summary: {
      totalDecisions: input.releaseArchive.decision.totalDecisions,
      latestDecisionId: input.releaseArchive.decision.latestDecisionId,
      archiveItemCount: archiveItemChecks.length,
      handoffReady: input.releaseArchive.handoffReady,
      closeoutReady: input.releaseArchive.verification.closeoutReady,
    },
    archiveItems: archiveItemChecks,
    nextActions: archiveReleaseArchiveVerificationNextActions(checks, input.releaseArchive),
  };
}

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

export function renderOpsPromotionArchiveMarkdown(bundle: OpsPromotionArchiveBundle): string {
  const lines = [
    "# Promotion archive bundle",
    "",
    `- Service: ${bundle.service}`,
    `- Generated at: ${bundle.generatedAt}`,
    `- Archive name: ${bundle.archiveName}`,
    `- State: ${bundle.state}`,
    `- Total decisions: ${bundle.summary.totalDecisions}`,
    `- Integrity valid: ${bundle.summary.integrityValid}`,
    `- Integrity root digest: sha256:${bundle.summary.integrityRootDigest}`,
    `- Sequence order: ${bundle.summary.sequenceOrder}`,
    "",
    "## Latest Decision Evidence",
    "",
    ...renderLatestEvidence(bundle.latestEvidence),
    "",
    "## Ledger Integrity",
    "",
    `- Root digest: ${bundle.integrity.rootDigest.algorithm}:${bundle.integrity.rootDigest.value}`,
    `- Decision digests valid: ${bundle.integrity.checks.digestsValid}`,
    `- Sequences contiguous: ${bundle.integrity.checks.sequencesContiguous}`,
    `- Sequence order: ${bundle.integrity.checks.sequenceOrder}`,
    "",
    "## Next Actions",
    "",
    ...bundle.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffCertificateMarkdown(certificate: OpsPromotionHandoffCertificate): string {
  const lines = [
    "# Promotion handoff certificate",
    "",
    `- Service: ${certificate.service}`,
    `- Generated at: ${certificate.generatedAt}`,
    `- Certificate name: ${certificate.certificateName}`,
    `- Package name: ${certificate.packageName}`,
    `- Archive name: ${certificate.archiveName}`,
    `- State: ${certificate.state}`,
    `- Valid: ${certificate.valid}`,
    `- Handoff ready: ${certificate.handoffReady}`,
    `- Certificate digest: ${certificate.certificateDigest.algorithm}:${certificate.certificateDigest.value}`,
    `- Package digest: ${certificate.packageDigest.algorithm}:${certificate.packageDigest.value}`,
    `- Verified package digest: ${certificate.verifiedPackageDigest.algorithm}:${certificate.verifiedPackageDigest.value}`,
    `- Seal digest: ${certificate.sealDigest.algorithm}:${certificate.sealDigest.value}`,
    `- Covered fields: ${certificate.certificateDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${certificate.decision.totalDecisions}`,
    `- Latest decision id: ${certificate.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${certificate.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Package verified: ${certificate.verification.packageVerified}`,
    `- Package digest valid: ${certificate.verification.packageDigestValid}`,
    `- Attachments valid: ${certificate.verification.attachmentsValid}`,
    `- Attachment count: ${certificate.verification.attachmentCount}`,
    "",
    "## Attachments",
    "",
    ...renderHandoffCertificateAttachments(certificate.attachments),
    "",
    "## Next Actions",
    "",
    ...certificate.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffCertificateVerificationMarkdown(
  verification: OpsPromotionHandoffCertificateVerification,
): string {
  const lines = [
    "# Promotion handoff certificate verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Certificate digest: ${verification.certificateDigest.algorithm}:${verification.certificateDigest.value}`,
    `- Recomputed certificate digest: ${verification.recomputedCertificateDigest.algorithm}:${verification.recomputedCertificateDigest.value}`,
    "",
    "## Checks",
    "",
    `- Certificate digest valid: ${verification.checks.certificateDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Attachments valid: ${verification.checks.attachmentsValid}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Package digest matches: ${verification.checks.packageDigestMatches}`,
    `- Verified package digest matches: ${verification.checks.verifiedPackageDigestMatches}`,
    `- Seal digest matches: ${verification.checks.sealDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Attachments",
    "",
    ...renderHandoffCertificateVerificationAttachments(verification.attachments),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Attachment count: ${verification.summary.attachmentCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffReceiptMarkdown(receipt: OpsPromotionHandoffReceipt): string {
  const lines = [
    "# Promotion handoff receipt",
    "",
    `- Service: ${receipt.service}`,
    `- Generated at: ${receipt.generatedAt}`,
    `- Receipt name: ${receipt.receiptName}`,
    `- Certificate name: ${receipt.certificateName}`,
    `- Package name: ${receipt.packageName}`,
    `- Archive name: ${receipt.archiveName}`,
    `- State: ${receipt.state}`,
    `- Valid: ${receipt.valid}`,
    `- Handoff ready: ${receipt.handoffReady}`,
    `- Receipt digest: ${receipt.receiptDigest.algorithm}:${receipt.receiptDigest.value}`,
    `- Certificate digest: ${receipt.certificateDigest.algorithm}:${receipt.certificateDigest.value}`,
    `- Verified certificate digest: ${receipt.verifiedCertificateDigest.algorithm}:${receipt.verifiedCertificateDigest.value}`,
    `- Package digest: ${receipt.packageDigest.algorithm}:${receipt.packageDigest.value}`,
    `- Verified package digest: ${receipt.verifiedPackageDigest.algorithm}:${receipt.verifiedPackageDigest.value}`,
    `- Seal digest: ${receipt.sealDigest.algorithm}:${receipt.sealDigest.value}`,
    `- Covered fields: ${receipt.receiptDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${receipt.decision.totalDecisions}`,
    `- Latest decision id: ${receipt.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${receipt.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Certificate verified: ${receipt.verification.certificateVerified}`,
    `- Certificate digest valid: ${receipt.verification.certificateDigestValid}`,
    `- Package reference valid: ${receipt.verification.packageReferenceValid}`,
    `- Seal reference valid: ${receipt.verification.sealReferenceValid}`,
    `- Attachments valid: ${receipt.verification.attachmentsValid}`,
    `- Milestone count: ${receipt.verification.milestoneCount}`,
    `- Attachment count: ${receipt.verification.attachmentCount}`,
    "",
    "## Milestones",
    "",
    ...renderHandoffReceiptMilestones(receipt.milestones),
    "",
    "## Next Actions",
    "",
    ...receipt.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffReceiptVerificationMarkdown(
  verification: OpsPromotionHandoffReceiptVerification,
): string {
  const lines = [
    "# Promotion handoff receipt verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Receipt digest: ${verification.receiptDigest.algorithm}:${verification.receiptDigest.value}`,
    `- Recomputed receipt digest: ${verification.recomputedReceiptDigest.algorithm}:${verification.recomputedReceiptDigest.value}`,
    "",
    "## Checks",
    "",
    `- Receipt digest valid: ${verification.checks.receiptDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Milestones valid: ${verification.checks.milestonesValid}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Certificate digest matches: ${verification.checks.certificateDigestMatches}`,
    `- Verified certificate digest matches: ${verification.checks.verifiedCertificateDigestMatches}`,
    `- Package digest matches: ${verification.checks.packageDigestMatches}`,
    `- Verified package digest matches: ${verification.checks.verifiedPackageDigestMatches}`,
    `- Seal digest matches: ${verification.checks.sealDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Milestones",
    "",
    ...renderHandoffReceiptVerificationMilestones(verification.milestones),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Milestone count: ${verification.summary.milestoneCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffClosureMarkdown(closure: OpsPromotionHandoffClosure): string {
  const lines = [
    "# Promotion handoff closure",
    "",
    `- Service: ${closure.service}`,
    `- Generated at: ${closure.generatedAt}`,
    `- Closure name: ${closure.closureName}`,
    `- Receipt name: ${closure.receiptName}`,
    `- Certificate name: ${closure.certificateName}`,
    `- Package name: ${closure.packageName}`,
    `- Archive name: ${closure.archiveName}`,
    `- State: ${closure.state}`,
    `- Valid: ${closure.valid}`,
    `- Handoff ready: ${closure.handoffReady}`,
    `- Closure digest: ${closure.closureDigest.algorithm}:${closure.closureDigest.value}`,
    `- Receipt digest: ${closure.receiptDigest.algorithm}:${closure.receiptDigest.value}`,
    `- Verified receipt digest: ${closure.verifiedReceiptDigest.algorithm}:${closure.verifiedReceiptDigest.value}`,
    `- Certificate digest: ${closure.certificateDigest.algorithm}:${closure.certificateDigest.value}`,
    `- Verified certificate digest: ${closure.verifiedCertificateDigest.algorithm}:${closure.verifiedCertificateDigest.value}`,
    `- Package digest: ${closure.packageDigest.algorithm}:${closure.packageDigest.value}`,
    `- Verified package digest: ${closure.verifiedPackageDigest.algorithm}:${closure.verifiedPackageDigest.value}`,
    `- Seal digest: ${closure.sealDigest.algorithm}:${closure.sealDigest.value}`,
    `- Covered fields: ${closure.closureDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${closure.decision.totalDecisions}`,
    `- Latest decision id: ${closure.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${closure.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Receipt verified: ${closure.verification.receiptVerified}`,
    `- Receipt digest valid: ${closure.verification.receiptDigestValid}`,
    `- Milestone references valid: ${closure.verification.milestoneReferencesValid}`,
    `- Certificate reference valid: ${closure.verification.certificateReferenceValid}`,
    `- Package reference valid: ${closure.verification.packageReferenceValid}`,
    `- Seal reference valid: ${closure.verification.sealReferenceValid}`,
    `- Milestone count: ${closure.verification.milestoneCount}`,
    `- Closure item count: ${closure.verification.closureItemCount}`,
    "",
    "## Closure Items",
    "",
    ...renderHandoffClosureItems(closure.closureItems),
    "",
    "## Next Actions",
    "",
    ...closure.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffClosureVerificationMarkdown(
  verification: OpsPromotionHandoffClosureVerification,
): string {
  const lines = [
    "# Promotion handoff closure verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Closure digest: ${verification.closureDigest.algorithm}:${verification.closureDigest.value}`,
    `- Recomputed closure digest: ${verification.recomputedClosureDigest.algorithm}:${verification.recomputedClosureDigest.value}`,
    "",
    "## Checks",
    "",
    `- Closure digest valid: ${verification.checks.closureDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Closure items valid: ${verification.checks.closureItemsValid}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Receipt digest matches: ${verification.checks.receiptDigestMatches}`,
    `- Verified receipt digest matches: ${verification.checks.verifiedReceiptDigestMatches}`,
    `- Certificate digest matches: ${verification.checks.certificateDigestMatches}`,
    `- Verified certificate digest matches: ${verification.checks.verifiedCertificateDigestMatches}`,
    `- Package digest matches: ${verification.checks.packageDigestMatches}`,
    `- Verified package digest matches: ${verification.checks.verifiedPackageDigestMatches}`,
    `- Seal digest matches: ${verification.checks.sealDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Closure Items",
    "",
    ...renderHandoffClosureVerificationItems(verification.closureItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Closure item count: ${verification.summary.closureItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffCompletionMarkdown(completion: OpsPromotionHandoffCompletion): string {
  const lines = [
    "# Promotion handoff completion",
    "",
    `- Service: ${completion.service}`,
    `- Generated at: ${completion.generatedAt}`,
    `- Completion name: ${completion.completionName}`,
    `- Closure name: ${completion.closureName}`,
    `- Receipt name: ${completion.receiptName}`,
    `- Certificate name: ${completion.certificateName}`,
    `- Package name: ${completion.packageName}`,
    `- Archive name: ${completion.archiveName}`,
    `- State: ${completion.state}`,
    `- Valid: ${completion.valid}`,
    `- Handoff ready: ${completion.handoffReady}`,
    `- Completion digest: ${completion.completionDigest.algorithm}:${completion.completionDigest.value}`,
    `- Closure digest: ${completion.closureDigest.algorithm}:${completion.closureDigest.value}`,
    `- Verified closure digest: ${completion.verifiedClosureDigest.algorithm}:${completion.verifiedClosureDigest.value}`,
    `- Covered fields: ${completion.completionDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${completion.decision.totalDecisions}`,
    `- Latest decision id: ${completion.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${completion.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Closure verified: ${completion.verification.closureVerified}`,
    `- Closure digest valid: ${completion.verification.closureDigestValid}`,
    `- Closure items valid: ${completion.verification.closureItemsValid}`,
    `- Reference checks valid: ${completion.verification.referenceChecksValid}`,
    `- Closeout ready: ${completion.verification.closeoutReady}`,
    `- Closure item count: ${completion.verification.closureItemCount}`,
    `- Completion step count: ${completion.verification.completionStepCount}`,
    "",
    "## Completion Steps",
    "",
    ...renderHandoffCompletionSteps(completion.completionSteps),
    "",
    "## Next Actions",
    "",
    ...completion.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffCompletionVerificationMarkdown(
  verification: OpsPromotionHandoffCompletionVerification,
): string {
  const lines = [
    "# Promotion handoff completion verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Completion digest: ${verification.completionDigest.algorithm}:${verification.completionDigest.value}`,
    `- Recomputed completion digest: ${verification.recomputedCompletionDigest.algorithm}:${verification.recomputedCompletionDigest.value}`,
    "",
    "## Checks",
    "",
    `- Completion digest valid: ${verification.checks.completionDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Completion steps valid: ${verification.checks.completionStepsValid}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Closure digest matches: ${verification.checks.closureDigestMatches}`,
    `- Verified closure digest matches: ${verification.checks.verifiedClosureDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Completion Steps",
    "",
    ...renderHandoffCompletionVerificationSteps(verification.completionSteps),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Completion step count: ${verification.summary.completionStepCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionReleaseEvidenceMarkdown(evidence: OpsPromotionReleaseEvidence): string {
  const lines = [
    "# Promotion release evidence",
    "",
    `- Service: ${evidence.service}`,
    `- Generated at: ${evidence.generatedAt}`,
    `- Evidence name: ${evidence.evidenceName}`,
    `- Completion name: ${evidence.completionName}`,
    `- Closure name: ${evidence.closureName}`,
    `- Receipt name: ${evidence.receiptName}`,
    `- Certificate name: ${evidence.certificateName}`,
    `- Package name: ${evidence.packageName}`,
    `- Archive name: ${evidence.archiveName}`,
    `- State: ${evidence.state}`,
    `- Valid: ${evidence.valid}`,
    `- Handoff ready: ${evidence.handoffReady}`,
    `- Evidence digest: ${evidence.evidenceDigest.algorithm}:${evidence.evidenceDigest.value}`,
    `- Completion digest: ${evidence.completionDigest.algorithm}:${evidence.completionDigest.value}`,
    `- Verified completion digest: ${evidence.verifiedCompletionDigest.algorithm}:${evidence.verifiedCompletionDigest.value}`,
    `- Closure digest: ${evidence.closureDigest.algorithm}:${evidence.closureDigest.value}`,
    `- Verified closure digest: ${evidence.verifiedClosureDigest.algorithm}:${evidence.verifiedClosureDigest.value}`,
    `- Covered fields: ${evidence.evidenceDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${evidence.decision.totalDecisions}`,
    `- Latest decision id: ${evidence.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${evidence.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Completion verified: ${evidence.verification.completionVerified}`,
    `- Completion digest valid: ${evidence.verification.completionDigestValid}`,
    `- Completion steps valid: ${evidence.verification.completionStepsValid}`,
    `- Closure reference valid: ${evidence.verification.closureReferenceValid}`,
    `- Closeout ready: ${evidence.verification.closeoutReady}`,
    `- Completion step count: ${evidence.verification.completionStepCount}`,
    `- Evidence item count: ${evidence.verification.evidenceItemCount}`,
    "",
    "## Evidence Items",
    "",
    ...renderReleaseEvidenceItems(evidence.evidenceItems),
    "",
    "## Next Actions",
    "",
    ...evidence.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionReleaseEvidenceVerificationMarkdown(
  verification: OpsPromotionReleaseEvidenceVerification,
): string {
  const lines = [
    "# Promotion release evidence verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Evidence name: ${verification.evidenceName}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Evidence digest: ${verification.evidenceDigest.algorithm}:${verification.evidenceDigest.value}`,
    `- Recomputed evidence digest: ${verification.recomputedEvidenceDigest.algorithm}:${verification.recomputedEvidenceDigest.value}`,
    "",
    "## Checks",
    "",
    `- Evidence digest valid: ${verification.checks.evidenceDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Evidence items valid: ${verification.checks.evidenceItemsValid}`,
    `- Evidence name matches: ${verification.checks.evidenceNameMatches}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Completion digest matches: ${verification.checks.completionDigestMatches}`,
    `- Verified completion digest matches: ${verification.checks.verifiedCompletionDigestMatches}`,
    `- Closure digest matches: ${verification.checks.closureDigestMatches}`,
    `- Verified closure digest matches: ${verification.checks.verifiedClosureDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Evidence Items",
    "",
    ...renderReleaseEvidenceVerificationItems(verification.evidenceItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Evidence item count: ${verification.summary.evidenceItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionReleaseArchiveMarkdown(releaseArchive: OpsPromotionReleaseArchive): string {
  const lines = [
    "# Promotion release archive",
    "",
    `- Service: ${releaseArchive.service}`,
    `- Generated at: ${releaseArchive.generatedAt}`,
    `- Release archive name: ${releaseArchive.releaseArchiveName}`,
    `- Evidence name: ${releaseArchive.evidenceName}`,
    `- Completion name: ${releaseArchive.completionName}`,
    `- Closure name: ${releaseArchive.closureName}`,
    `- Receipt name: ${releaseArchive.receiptName}`,
    `- Certificate name: ${releaseArchive.certificateName}`,
    `- Package name: ${releaseArchive.packageName}`,
    `- Archive name: ${releaseArchive.archiveName}`,
    `- State: ${releaseArchive.state}`,
    `- Valid: ${releaseArchive.valid}`,
    `- Handoff ready: ${releaseArchive.handoffReady}`,
    `- Release archive digest: ${releaseArchive.releaseArchiveDigest.algorithm}:${releaseArchive.releaseArchiveDigest.value}`,
    `- Evidence digest: ${releaseArchive.evidenceDigest.algorithm}:${releaseArchive.evidenceDigest.value}`,
    `- Verified evidence digest: ${releaseArchive.verifiedEvidenceDigest.algorithm}:${releaseArchive.verifiedEvidenceDigest.value}`,
    `- Completion digest: ${releaseArchive.completionDigest.algorithm}:${releaseArchive.completionDigest.value}`,
    `- Closure digest: ${releaseArchive.closureDigest.algorithm}:${releaseArchive.closureDigest.value}`,
    `- Covered fields: ${releaseArchive.releaseArchiveDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${releaseArchive.decision.totalDecisions}`,
    `- Latest decision id: ${releaseArchive.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${releaseArchive.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Evidence verified: ${releaseArchive.verification.evidenceVerified}`,
    `- Evidence digest valid: ${releaseArchive.verification.evidenceDigestValid}`,
    `- Evidence items valid: ${releaseArchive.verification.evidenceItemsValid}`,
    `- Evidence reference valid: ${releaseArchive.verification.evidenceReferenceValid}`,
    `- Closeout ready: ${releaseArchive.verification.closeoutReady}`,
    `- Evidence item count: ${releaseArchive.verification.evidenceItemCount}`,
    `- Archive item count: ${releaseArchive.verification.archiveItemCount}`,
    "",
    "## Archive Items",
    "",
    ...renderReleaseArchiveItems(releaseArchive.archiveItems),
    "",
    "## Next Actions",
    "",
    ...releaseArchive.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionReleaseArchiveVerificationMarkdown(
  verification: OpsPromotionReleaseArchiveVerification,
): string {
  const lines = [
    "# Promotion release archive verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Release archive name: ${verification.releaseArchiveName}`,
    `- Evidence name: ${verification.evidenceName}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Release archive digest: ${verification.releaseArchiveDigest.algorithm}:${verification.releaseArchiveDigest.value}`,
    `- Recomputed release archive digest: ${verification.recomputedReleaseArchiveDigest.algorithm}:${verification.recomputedReleaseArchiveDigest.value}`,
    "",
    "## Checks",
    "",
    `- Release archive digest valid: ${verification.checks.releaseArchiveDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Archive items valid: ${verification.checks.archiveItemsValid}`,
    `- Release archive name matches: ${verification.checks.releaseArchiveNameMatches}`,
    `- Evidence name matches: ${verification.checks.evidenceNameMatches}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Evidence digest matches: ${verification.checks.evidenceDigestMatches}`,
    `- Verified evidence digest matches: ${verification.checks.verifiedEvidenceDigestMatches}`,
    `- Completion digest matches: ${verification.checks.completionDigestMatches}`,
    `- Closure digest matches: ${verification.checks.closureDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Archive Items",
    "",
    ...renderReleaseArchiveVerificationItems(verification.archiveItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Archive item count: ${verification.summary.archiveItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionDeploymentApprovalMarkdown(approval: OpsPromotionDeploymentApproval): string {
  const lines = [
    "# Promotion deployment approval",
    "",
    `- Service: ${approval.service}`,
    `- Generated at: ${approval.generatedAt}`,
    `- Approval name: ${approval.approvalName}`,
    `- Release archive name: ${approval.releaseArchiveName}`,
    `- Evidence name: ${approval.evidenceName}`,
    `- Completion name: ${approval.completionName}`,
    `- Closure name: ${approval.closureName}`,
    `- Receipt name: ${approval.receiptName}`,
    `- Certificate name: ${approval.certificateName}`,
    `- Package name: ${approval.packageName}`,
    `- Archive name: ${approval.archiveName}`,
    `- State: ${approval.state}`,
    `- Valid: ${approval.valid}`,
    `- Handoff ready: ${approval.handoffReady}`,
    `- Approval ready: ${approval.approvalReady}`,
    `- Approval digest: ${approval.approvalDigest.algorithm}:${approval.approvalDigest.value}`,
    `- Release archive digest: ${approval.releaseArchiveDigest.algorithm}:${approval.releaseArchiveDigest.value}`,
    `- Verified release archive digest: ${approval.verifiedReleaseArchiveDigest.algorithm}:${approval.verifiedReleaseArchiveDigest.value}`,
    `- Evidence digest: ${approval.evidenceDigest.algorithm}:${approval.evidenceDigest.value}`,
    `- Covered fields: ${approval.approvalDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${approval.decision.totalDecisions}`,
    `- Latest decision id: ${approval.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${approval.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Release archive verified: ${approval.verification.releaseArchiveVerified}`,
    `- Release archive digest valid: ${approval.verification.releaseArchiveDigestValid}`,
    `- Archive items valid: ${approval.verification.archiveItemsValid}`,
    `- Release archive reference valid: ${approval.verification.releaseArchiveReferenceValid}`,
    `- Closeout ready: ${approval.verification.closeoutReady}`,
    `- Archive item count: ${approval.verification.archiveItemCount}`,
    `- Approval item count: ${approval.verification.approvalItemCount}`,
    "",
    "## Approval Items",
    "",
    ...renderDeploymentApprovalItems(approval.approvalItems),
    "",
    "## Next Actions",
    "",
    ...approval.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionDeploymentApprovalVerificationMarkdown(
  verification: OpsPromotionDeploymentApprovalVerification,
): string {
  const lines = [
    "# Promotion deployment approval verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Approval name: ${verification.approvalName}`,
    `- Release archive name: ${verification.releaseArchiveName}`,
    `- Evidence name: ${verification.evidenceName}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Approval ready: ${verification.approvalReady}`,
    `- Valid: ${verification.valid}`,
    `- Approval digest: ${verification.approvalDigest.algorithm}:${verification.approvalDigest.value}`,
    `- Recomputed approval digest: ${verification.recomputedApprovalDigest.algorithm}:${verification.recomputedApprovalDigest.value}`,
    "",
    "## Checks",
    "",
    `- Approval digest valid: ${verification.checks.approvalDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Approval items valid: ${verification.checks.approvalItemsValid}`,
    `- Approval name matches: ${verification.checks.approvalNameMatches}`,
    `- Release archive name matches: ${verification.checks.releaseArchiveNameMatches}`,
    `- Evidence name matches: ${verification.checks.evidenceNameMatches}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Approval ready matches: ${verification.checks.approvalReadyMatches}`,
    `- Release archive digest matches: ${verification.checks.releaseArchiveDigestMatches}`,
    `- Verified release archive digest matches: ${verification.checks.verifiedReleaseArchiveDigestMatches}`,
    `- Evidence digest matches: ${verification.checks.evidenceDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Approval Items",
    "",
    ...renderDeploymentApprovalVerificationItems(verification.approvalItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Approval item count: ${verification.summary.approvalItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Approval ready: ${verification.summary.approvalReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionDeploymentChangeRecordMarkdown(changeRecord: OpsPromotionDeploymentChangeRecord): string {
  const lines = [
    "# Promotion deployment change record",
    "",
    `- Service: ${changeRecord.service}`,
    `- Generated at: ${changeRecord.generatedAt}`,
    `- Change record name: ${changeRecord.changeRecordName}`,
    `- Approval name: ${changeRecord.approvalName}`,
    `- Release archive name: ${changeRecord.releaseArchiveName}`,
    `- Evidence name: ${changeRecord.evidenceName}`,
    `- Completion name: ${changeRecord.completionName}`,
    `- Closure name: ${changeRecord.closureName}`,
    `- Receipt name: ${changeRecord.receiptName}`,
    `- Certificate name: ${changeRecord.certificateName}`,
    `- Package name: ${changeRecord.packageName}`,
    `- Archive name: ${changeRecord.archiveName}`,
    `- State: ${changeRecord.state}`,
    `- Valid: ${changeRecord.valid}`,
    `- Handoff ready: ${changeRecord.handoffReady}`,
    `- Approval ready: ${changeRecord.approvalReady}`,
    `- Change ready: ${changeRecord.changeReady}`,
    `- Change digest: ${changeRecord.changeDigest.algorithm}:${changeRecord.changeDigest.value}`,
    `- Approval digest: ${changeRecord.approvalDigest.algorithm}:${changeRecord.approvalDigest.value}`,
    `- Verified approval digest: ${changeRecord.verifiedApprovalDigest.algorithm}:${changeRecord.verifiedApprovalDigest.value}`,
    `- Release archive digest: ${changeRecord.releaseArchiveDigest.algorithm}:${changeRecord.releaseArchiveDigest.value}`,
    `- Covered fields: ${changeRecord.changeDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${changeRecord.decision.totalDecisions}`,
    `- Latest decision id: ${changeRecord.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${changeRecord.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Approval verified: ${changeRecord.verification.approvalVerified}`,
    `- Approval digest valid: ${changeRecord.verification.approvalDigestValid}`,
    `- Approval items valid: ${changeRecord.verification.approvalItemsValid}`,
    `- Approval reference valid: ${changeRecord.verification.approvalReferenceValid}`,
    `- Closeout ready: ${changeRecord.verification.closeoutReady}`,
    `- Approval item count: ${changeRecord.verification.approvalItemCount}`,
    `- Change item count: ${changeRecord.verification.changeItemCount}`,
    "",
    "## Change Items",
    "",
    ...renderDeploymentChangeRecordItems(changeRecord.changeItems),
    "",
    "## Next Actions",
    "",
    ...changeRecord.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionDeploymentChangeRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentChangeRecordVerification,
): string {
  const lines = [
    "# Promotion deployment change record verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Change record name: ${verification.changeRecordName}`,
    `- Approval name: ${verification.approvalName}`,
    `- Release archive name: ${verification.releaseArchiveName}`,
    `- Evidence name: ${verification.evidenceName}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Approval ready: ${verification.approvalReady}`,
    `- Change ready: ${verification.changeReady}`,
    `- Valid: ${verification.valid}`,
    `- Change digest: ${verification.changeDigest.algorithm}:${verification.changeDigest.value}`,
    `- Recomputed change digest: ${verification.recomputedChangeDigest.algorithm}:${verification.recomputedChangeDigest.value}`,
    "",
    "## Checks",
    "",
    `- Change digest valid: ${verification.checks.changeDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Change items valid: ${verification.checks.changeItemsValid}`,
    `- Change record name matches: ${verification.checks.changeRecordNameMatches}`,
    `- Approval name matches: ${verification.checks.approvalNameMatches}`,
    `- Release archive name matches: ${verification.checks.releaseArchiveNameMatches}`,
    `- Evidence name matches: ${verification.checks.evidenceNameMatches}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Approval ready matches: ${verification.checks.approvalReadyMatches}`,
    `- Change ready matches: ${verification.checks.changeReadyMatches}`,
    `- Approval digest matches: ${verification.checks.approvalDigestMatches}`,
    `- Verified approval digest matches: ${verification.checks.verifiedApprovalDigestMatches}`,
    `- Release archive digest matches: ${verification.checks.releaseArchiveDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Change Items",
    "",
    ...renderDeploymentChangeRecordVerificationItems(verification.changeItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Change item count: ${verification.summary.changeItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Approval ready: ${verification.summary.approvalReady}`,
    `- Change ready: ${verification.summary.changeReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffPackageVerificationMarkdown(
  verification: OpsPromotionHandoffPackageVerification,
): string {
  const lines = [
    "# Promotion handoff package verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Package digest: ${verification.packageDigest.algorithm}:${verification.packageDigest.value}`,
    `- Recomputed package digest: ${verification.recomputedPackageDigest.algorithm}:${verification.recomputedPackageDigest.value}`,
    "",
    "## Checks",
    "",
    `- Package digest valid: ${verification.checks.packageDigestValid}`,
    `- Attachments valid: ${verification.checks.attachmentsValid}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Seal digest matches: ${verification.checks.sealDigestMatches}`,
    `- Manifest digest matches: ${verification.checks.manifestDigestMatches}`,
    `- Verification digest matches: ${verification.checks.verificationDigestMatches}`,
    `- Summary matches: ${verification.checks.summaryMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Attachments",
    "",
    ...renderHandoffPackageVerificationAttachments(verification.attachments),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Attachment count: ${verification.summary.attachmentCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionHandoffPackageMarkdown(pkg: OpsPromotionHandoffPackage): string {
  const lines = [
    "# Promotion handoff package",
    "",
    `- Service: ${pkg.service}`,
    `- Generated at: ${pkg.generatedAt}`,
    `- Package name: ${pkg.packageName}`,
    `- Archive name: ${pkg.archiveName}`,
    `- State: ${pkg.state}`,
    `- Valid: ${pkg.valid}`,
    `- Handoff ready: ${pkg.handoffReady}`,
    `- Package digest: ${pkg.packageDigest.algorithm}:${pkg.packageDigest.value}`,
    `- Seal digest: ${pkg.sealDigest.algorithm}:${pkg.sealDigest.value}`,
    `- Manifest digest: ${pkg.manifestDigest.algorithm}:${pkg.manifestDigest.value}`,
    `- Verification digest: ${pkg.verificationDigest.algorithm}:${pkg.verificationDigest.value}`,
    `- Covered fields: ${pkg.packageDigest.coveredFields.join(", ")}`,
    "",
    "## Summary",
    "",
    `- Total decisions: ${pkg.summary.totalDecisions}`,
    `- Latest decision id: ${pkg.summary.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${pkg.summary.latestOutcome ?? "none"}`,
    `- Evidence source count: ${pkg.summary.evidenceSourceCount}`,
    `- Attachment count: ${pkg.summary.attachmentCount}`,
    "",
    "## Attachments",
    "",
    ...renderHandoffPackageAttachments(pkg.attachments),
    "",
    "## Next Actions",
    "",
    ...pkg.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionArchiveAttestationVerificationMarkdown(
  verification: OpsPromotionArchiveAttestationVerification,
): string {
  const lines = [
    "# Promotion archive attestation verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Valid: ${verification.valid}`,
    `- Seal digest: ${verification.sealDigest.algorithm}:${verification.sealDigest.value}`,
    `- Recomputed seal digest: ${verification.recomputedSealDigest.algorithm}:${verification.recomputedSealDigest.value}`,
    `- Verification digest: ${verification.verificationDigest.algorithm}:${verification.verificationDigest.value}`,
    `- Recomputed verification digest: ${verification.recomputedVerificationDigest.algorithm}:${verification.recomputedVerificationDigest.value}`,
    "",
    "## Checks",
    "",
    `- Seal digest valid: ${verification.checks.sealDigestValid}`,
    `- Verification digest valid: ${verification.checks.verificationDigestValid}`,
    `- Manifest digest matches: ${verification.checks.manifestDigestMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Checks match: ${verification.checks.checksMatch}`,
    `- Evidence sources match: ${verification.checks.evidenceSourcesMatch}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Evidence source count: ${verification.summary.evidenceSourceCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionArchiveAttestationMarkdown(attestation: OpsPromotionArchiveAttestation): string {
  const lines = [
    "# Promotion archive attestation",
    "",
    `- Service: ${attestation.service}`,
    `- Generated at: ${attestation.generatedAt}`,
    `- Title: ${attestation.title}`,
    `- Archive name: ${attestation.archiveName}`,
    `- State: ${attestation.state}`,
    `- Handoff ready: ${attestation.handoffReady}`,
    `- Manifest digest: ${attestation.manifestDigest.algorithm}:${attestation.manifestDigest.value}`,
    `- Verification digest: ${attestation.verificationDigest.algorithm}:${attestation.verificationDigest.value}`,
    `- Seal digest: ${attestation.sealDigest.algorithm}:${attestation.sealDigest.value}`,
    `- Covered fields: ${attestation.sealDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${attestation.decision.totalDecisions}`,
    `- Latest decision id: ${attestation.decision.latestDecisionId ?? "none"}`,
    `- Latest sequence: ${attestation.decision.latestSequence ?? "none"}`,
    `- Latest outcome: ${attestation.decision.latestOutcome ?? "none"}`,
    `- Latest ready for promotion: ${attestation.decision.latestReadyForPromotion ?? "none"}`,
    `- Latest digest valid: ${attestation.decision.latestDigestValid ?? "none"}`,
    "",
    "## Checks",
    "",
    `- Manifest verified: ${attestation.checks.manifestVerified}`,
    `- Artifacts verified: ${attestation.checks.artifactsVerified}`,
    `- Archive ready: ${attestation.checks.archiveReady}`,
    `- Latest decision ready: ${attestation.checks.latestDecisionReady}`,
    `- Integrity verified: ${attestation.checks.integrityVerified}`,
    "",
    "## Evidence Sources",
    "",
    ...renderAttestationEvidenceSources(attestation.evidenceSources),
    "",
    "## Next Actions",
    "",
    ...attestation.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionArchiveVerificationMarkdown(verification: OpsPromotionArchiveVerification): string {
  const lines = [
    "# Promotion archive verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Valid: ${verification.valid}`,
    `- Manifest digest: ${verification.manifestDigest.algorithm}:${verification.manifestDigest.value}`,
    `- Recomputed manifest digest: ${verification.recomputedManifestDigest.algorithm}:${verification.recomputedManifestDigest.value}`,
    "",
    "## Checks",
    "",
    `- Manifest digest valid: ${verification.checks.manifestDigestValid}`,
    `- Artifacts valid: ${verification.checks.artifactsValid}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Summary matches: ${verification.checks.summaryMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Artifacts",
    "",
    ...renderVerificationArtifacts(verification.artifacts),
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

export function renderOpsPromotionArchiveManifestMarkdown(manifest: OpsPromotionArchiveManifest): string {
  const lines = [
    "# Promotion archive manifest",
    "",
    `- Service: ${manifest.service}`,
    `- Generated at: ${manifest.generatedAt}`,
    `- Archive name: ${manifest.archiveName}`,
    `- State: ${manifest.state}`,
    `- Manifest digest: ${manifest.manifestDigest.algorithm}:${manifest.manifestDigest.value}`,
    `- Covered fields: ${manifest.manifestDigest.coveredFields.join(", ")}`,
    "",
    "## Summary",
    "",
    `- Total decisions: ${manifest.summary.totalDecisions}`,
    `- Latest decision id: ${manifest.summary.latestDecisionId ?? "none"}`,
    `- Latest sequence: ${manifest.summary.latestSequence ?? "none"}`,
    `- Latest outcome: ${manifest.summary.latestOutcome ?? "none"}`,
    `- Latest digest valid: ${manifest.summary.latestDigestValid ?? "none"}`,
    `- Integrity valid: ${manifest.summary.integrityValid}`,
    `- Integrity root digest: sha256:${manifest.summary.integrityRootDigest}`,
    `- Sequence order: ${manifest.summary.sequenceOrder}`,
    "",
    "## Artifacts",
    "",
    ...renderManifestArtifacts(manifest.artifacts),
    "",
    "## Next Actions",
    "",
    ...manifest.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

function manifestDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveState;
  summary: OpsPromotionArchiveBundle["summary"];
  artifacts: OpsPromotionArchiveManifestArtifact[];
  nextActions: string[];
}) {
  return {
    archiveName: input.archiveName,
    state: input.state,
    summary: input.summary,
    artifacts: input.artifacts.map((artifact) => ({
      name: artifact.name,
      type: artifact.type,
      present: artifact.present,
      digest: artifact.digest.value,
      source: artifact.source,
    })),
    nextActions: input.nextActions,
  };
}

function archiveBundleDigestPayload(bundle: OpsPromotionArchiveBundle) {
  return {
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    latestEvidence: bundle.latestEvidence === undefined
      ? { present: false }
      : {
        decisionId: bundle.latestEvidence.decisionId,
        sequence: bundle.latestEvidence.sequence,
        verdict: bundle.latestEvidence.verdict,
        summary: bundle.latestEvidence.summary,
        nextActions: bundle.latestEvidence.nextActions,
      },
    integrity: {
      valid: bundle.integrity.valid,
      totalRecords: bundle.integrity.totalRecords,
      rootDigest: bundle.integrity.rootDigest.value,
      checks: bundle.integrity.checks,
    },
    nextActions: bundle.nextActions,
  };
}

function archiveVerificationDigestPayload(verification: OpsPromotionArchiveVerification) {
  return {
    archiveName: verification.archiveName,
    valid: verification.valid,
    state: verification.state,
    manifestDigest: verification.manifestDigest.value,
    recomputedManifestDigest: verification.recomputedManifestDigest.value,
    checks: verification.checks,
    summary: verification.summary,
    artifacts: verification.artifacts.map((artifact) => ({
      name: artifact.name,
      type: artifact.type,
      valid: artifact.valid,
      presentMatches: artifact.presentMatches,
      sourceMatches: artifact.sourceMatches,
      digestMatches: artifact.digestMatches,
      manifestDigest: artifact.manifestDigest.value,
      recomputedDigest: artifact.recomputedDigest.value,
      source: artifact.source,
    })),
  };
}

function archiveAttestationVerificationDigestPayload(verification: OpsPromotionArchiveAttestationVerification) {
  return {
    archiveName: verification.archiveName,
    valid: verification.valid,
    state: verification.state,
    handoffReady: verification.handoffReady,
    sealDigest: verification.sealDigest.value,
    recomputedSealDigest: verification.recomputedSealDigest.value,
    verificationDigest: verification.verificationDigest.value,
    recomputedVerificationDigest: verification.recomputedVerificationDigest.value,
    checks: verification.checks,
    summary: verification.summary,
    nextActions: verification.nextActions,
  };
}

function archiveAttestationDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  manifestDigest: string;
  verificationDigest: string;
  decision: OpsPromotionArchiveAttestation["decision"];
  checks: OpsPromotionArchiveAttestation["checks"];
  evidenceSources: OpsPromotionArchiveAttestationEvidenceSource[];
  nextActions: string[];
}) {
  return {
    archiveName: input.archiveName,
    state: input.state,
    handoffReady: input.handoffReady,
    manifestDigest: input.manifestDigest,
    verificationDigest: input.verificationDigest,
    decision: input.decision,
    checks: input.checks,
    evidenceSources: input.evidenceSources.map((source) => ({
      name: source.name,
      type: source.type,
      present: source.present,
      verified: source.verified,
      source: source.source,
      digest: source.digest.value,
    })),
    nextActions: input.nextActions,
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

function archiveReleaseEvidenceDigestPayload(input: {
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
  completionDigest: string;
  verifiedCompletionDigest: string;
  closureDigest: string;
  verifiedClosureDigest: string;
  decision: OpsPromotionReleaseEvidence["decision"];
  verification: OpsPromotionReleaseEvidence["verification"];
  evidenceItems: OpsPromotionReleaseEvidenceItem[];
  nextActions: string[];
}) {
  return {
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
    completionDigest: input.completionDigest,
    verifiedCompletionDigest: input.verifiedCompletionDigest,
    closureDigest: input.closureDigest,
    verifiedClosureDigest: input.verifiedClosureDigest,
    decision: input.decision,
    verification: input.verification,
    evidenceItems: input.evidenceItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

function archiveReleaseArchiveDigestPayload(input: {
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
  evidenceDigest: string;
  verifiedEvidenceDigest: string;
  completionDigest: string;
  closureDigest: string;
  decision: OpsPromotionReleaseArchive["decision"];
  verification: OpsPromotionReleaseArchive["verification"];
  archiveItems: OpsPromotionReleaseArchiveItem[];
  nextActions: string[];
}) {
  return {
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
    evidenceDigest: input.evidenceDigest,
    verifiedEvidenceDigest: input.verifiedEvidenceDigest,
    completionDigest: input.completionDigest,
    closureDigest: input.closureDigest,
    decision: input.decision,
    verification: input.verification,
    archiveItems: input.archiveItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
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

function archiveHandoffPackageAttachments(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackageAttachment[] {
  return [
    {
      name: "archive-bundle",
      valid: input.bundle.summary.integrityValid,
      source: "/api/v1/ops/promotion-archive",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveBundleDigestPayload(input.bundle)),
      },
    },
    {
      name: "archive-manifest",
      valid: input.verification.checks.manifestDigestValid,
      source: "/api/v1/ops/promotion-archive/manifest",
      digest: { ...input.manifest.manifestDigest },
    },
    {
      name: "archive-verification",
      valid: input.verification.valid,
      source: "/api/v1/ops/promotion-archive/verification",
      digest: {
        algorithm: "sha256",
        value: input.attestation.verificationDigest.value,
      },
    },
    {
      name: "archive-attestation",
      valid: input.attestationVerification.checks.sealDigestValid,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: input.attestation.sealDigest.value,
      },
    },
    {
      name: "attestation-verification",
      valid: input.attestationVerification.valid,
      source: "/api/v1/ops/promotion-archive/attestation/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveAttestationVerificationDigestPayload(input.attestationVerification)),
      },
    },
  ];
}

function archiveHandoffReceiptMilestones(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
): OpsPromotionHandoffReceiptMilestone[] {
  return [
    {
      name: "handoff-package",
      valid: certificate.valid && certificateVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: certificate.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: certificate.verification.packageVerified && certificateVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: certificate.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: certificateVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: certificate.sealDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: certificate.valid && certificateVerification.checks.certificateDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: certificate.certificateDigest.value,
      },
    },
    {
      name: "certificate-verification",
      valid: certificateVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: certificateVerification.recomputedCertificateDigest.value,
      },
    },
  ];
}

function archiveHandoffClosureItems(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
): OpsPromotionHandoffClosureItem[] {
  return [
    {
      name: "handoff-receipt",
      valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt",
      digest: {
        algorithm: "sha256",
        value: receipt.receiptDigest.value,
      },
    },
    {
      name: "verified-handoff-receipt",
      valid: receiptVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: receiptVerification.recomputedReceiptDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: receiptVerification.checks.certificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: receipt.certificateDigest.value,
      },
    },
    {
      name: "verified-handoff-certificate",
      valid: receiptVerification.checks.verifiedCertificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedCertificateDigest.value,
      },
    },
    {
      name: "handoff-package",
      valid: receiptVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: receipt.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: receiptVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: receiptVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: receipt.sealDigest.value,
      },
    },
  ];
}

function archiveHandoffCompletionSteps(
  closure: OpsPromotionHandoffClosure,
  closureVerification: OpsPromotionHandoffClosureVerification,
): OpsPromotionHandoffCompletionStep[] {
  const referenceChecksValid = archiveHandoffCompletionReferenceChecksValid(closureVerification);

  return [
    {
      name: "closure-created",
      valid: closure.valid && closure.closureDigest.value === closureVerification.closureDigest.value,
      ready: closure.valid,
      source: "/api/v1/ops/promotion-archive/handoff-closure",
      digest: {
        algorithm: "sha256",
        value: closure.closureDigest.value,
      },
      detail: "Handoff closure exists and exposes the same closure digest used by verification.",
    },
    {
      name: "closure-verified",
      valid: closureVerification.valid && closureVerification.checks.closureDigestValid,
      ready: closureVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: closureVerification.recomputedClosureDigest.value,
      },
      detail: "Closure digest, covered fields, and closeout metadata match the recomputed closure.",
    },
    {
      name: "closure-items-verified",
      valid: closureVerification.checks.closureItemsValid,
      ready: closureVerification.checks.closureItemsValid,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable(closureVerification.closureItems.map((item) => ({
          name: item.name,
          valid: item.valid,
          digestMatches: item.digestMatches,
          source: item.source,
          digest: item.recomputedDigest.value,
        }))),
      },
      detail: "All handoff receipt, certificate, package, and seal closeout references are valid.",
    },
    {
      name: "receipt-chain-verified",
      valid: referenceChecksValid,
      ready: referenceChecksValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          receiptDigest: closure.verifiedReceiptDigest.value,
          certificateDigest: closure.verifiedCertificateDigest.value,
          packageDigest: closure.verifiedPackageDigest.value,
          sealDigest: closure.sealDigest.value,
        }),
      },
      detail: "Receipt, certificate, package, and archive seal references all match the verified chain.",
    },
    {
      name: "handoff-readiness-recorded",
      valid: closure.handoffReady === closureVerification.handoffReady
        && closure.state === closureVerification.state,
      ready: closure.handoffReady && closureVerification.handoffReady,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: closure.state,
          handoffReady: closure.handoffReady,
          verifiedHandoffReady: closureVerification.handoffReady,
          latestDecisionId: closure.decision.latestDecisionId ?? null,
        }),
      },
      detail: "Completion records whether the verified handoff chain is ready for final archive closeout.",
    },
  ];
}

function archiveHandoffCompletionReferenceChecksValid(
  closureVerification: OpsPromotionHandoffClosureVerification,
): boolean {
  return closureVerification.checks.receiptDigestMatches
    && closureVerification.checks.verifiedReceiptDigestMatches
    && closureVerification.checks.certificateDigestMatches
    && closureVerification.checks.verifiedCertificateDigestMatches
    && closureVerification.checks.packageDigestMatches
    && closureVerification.checks.verifiedPackageDigestMatches
    && closureVerification.checks.sealDigestMatches;
}

function archiveReleaseEvidenceItems(
  completion: OpsPromotionHandoffCompletion,
  completionVerification: OpsPromotionHandoffCompletionVerification,
): OpsPromotionReleaseEvidenceItem[] {
  return [
    {
      name: "handoff-completion",
      valid: completion.valid && completionVerification.checks.completionDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-completion",
      digest: {
        algorithm: "sha256",
        value: completion.completionDigest.value,
      },
      detail: "Final handoff completion record is present and its digest is covered by verification.",
    },
    {
      name: "verified-handoff-completion",
      valid: completionVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      digest: {
        algorithm: "sha256",
        value: completionVerification.recomputedCompletionDigest.value,
      },
      detail: "Completion record has been recomputed from the verified closure chain.",
    },
    {
      name: "handoff-closure",
      valid: completionVerification.checks.closureDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-closure",
      digest: {
        algorithm: "sha256",
        value: completion.closureDigest.value,
      },
      detail: "Completion still references the same handoff closure digest.",
    },
    {
      name: "verified-handoff-closure",
      valid: completionVerification.checks.verifiedClosureDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-closure/verification",
      digest: {
        algorithm: "sha256",
        value: completion.verifiedClosureDigest.value,
      },
      detail: "Completion still references the verified closure digest.",
    },
    {
      name: "final-closeout-state",
      valid: completionVerification.valid
        && completionVerification.checks.handoffReadyMatches
        && completion.verification.closeoutReady === completionVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/handoff-completion/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: completion.state,
          handoffReady: completion.handoffReady,
          closeoutReady: completion.verification.closeoutReady,
          verifiedCloseoutReady: completionVerification.summary.closeoutReady,
          latestDecisionId: completion.decision.latestDecisionId ?? null,
        }),
      },
      detail: "Release evidence records the final handoff readiness and closeout state.",
    },
  ];
}

function archiveReleaseArchiveItems(
  evidence: OpsPromotionReleaseEvidence,
  evidenceVerification: OpsPromotionReleaseEvidenceVerification,
): OpsPromotionReleaseArchiveItem[] {
  return [
    {
      name: "release-evidence",
      valid: evidence.valid && evidenceVerification.checks.evidenceDigestValid,
      source: "/api/v1/ops/promotion-archive/release-evidence",
      digest: {
        algorithm: "sha256",
        value: evidence.evidenceDigest.value,
      },
      detail: "Release evidence is present and its digest is covered by verification.",
    },
    {
      name: "verified-release-evidence",
      valid: evidenceVerification.valid,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: evidenceVerification.recomputedEvidenceDigest.value,
      },
      detail: "Release evidence has been recomputed from the verified completion chain.",
    },
    {
      name: "handoff-completion",
      valid: evidence.verification.completionVerified
        && evidence.verification.completionDigestValid
        && evidenceVerification.checks.completionDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-completion",
      digest: {
        algorithm: "sha256",
        value: evidence.completionDigest.value,
      },
      detail: "Final release archive still references the same handoff completion digest.",
    },
    {
      name: "final-archive-state",
      valid: evidenceVerification.valid
        && evidenceVerification.checks.stateMatches
        && evidenceVerification.checks.handoffReadyMatches
        && evidence.verification.closeoutReady === evidenceVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: evidence.state,
          handoffReady: evidence.handoffReady,
          closeoutReady: evidence.verification.closeoutReady,
          verifiedCloseoutReady: evidenceVerification.summary.closeoutReady,
          latestDecisionId: evidence.decision.latestDecisionId ?? null,
          nextActions: evidence.nextActions,
        }),
      },
      detail: "Final archive records the verified release state, closeout status, and remaining next actions.",
    },
  ];
}

function archiveDeploymentApprovalItems(
  releaseArchive: OpsPromotionReleaseArchive,
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification,
): OpsPromotionDeploymentApprovalItem[] {
  return [
    {
      name: "release-archive",
      valid: releaseArchive.valid && releaseArchiveVerification.checks.releaseArchiveDigestValid,
      source: "/api/v1/ops/promotion-archive/release-archive",
      digest: {
        algorithm: "sha256",
        value: releaseArchive.releaseArchiveDigest.value,
      },
      detail: "Final release archive is present and its digest is covered by verification.",
    },
    {
      name: "verified-release-archive",
      valid: releaseArchiveVerification.valid,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: releaseArchiveVerification.recomputedReleaseArchiveDigest.value,
      },
      detail: "Final release archive has been recomputed from the verified release evidence chain.",
    },
    {
      name: "verified-release-evidence",
      valid: releaseArchiveVerification.checks.evidenceDigestMatches
        && releaseArchiveVerification.checks.verifiedEvidenceDigestMatches,
      source: "/api/v1/ops/promotion-archive/release-evidence/verification",
      digest: {
        algorithm: "sha256",
        value: releaseArchive.verifiedEvidenceDigest.value,
      },
      detail: "Deployment approval still references the verified release evidence digest.",
    },
    {
      name: "deployment-approval-state",
      valid: releaseArchiveVerification.valid
        && releaseArchiveVerification.checks.stateMatches
        && releaseArchiveVerification.checks.handoffReadyMatches
        && releaseArchive.verification.closeoutReady === releaseArchiveVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: releaseArchive.state,
          handoffReady: releaseArchive.handoffReady,
          closeoutReady: releaseArchive.verification.closeoutReady,
          verifiedCloseoutReady: releaseArchiveVerification.summary.closeoutReady,
          latestDecisionId: releaseArchive.decision.latestDecisionId ?? null,
          nextActions: releaseArchive.nextActions,
        }),
      },
      detail: "Deployment approval records the verified final archive state and remaining release actions.",
    },
  ];
}

function archiveDeploymentChangeRecordItems(
  approval: OpsPromotionDeploymentApproval,
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
): OpsPromotionDeploymentChangeRecordItem[] {
  return [
    {
      name: "deployment-approval",
      valid: approval.valid && approvalVerification.checks.approvalDigestValid,
      source: "/api/v1/ops/promotion-archive/deployment-approval",
      digest: {
        algorithm: "sha256",
        value: approval.approvalDigest.value,
      },
      detail: "Deployment approval exists and its digest is covered by verification.",
    },
    {
      name: "verified-deployment-approval",
      valid: approvalVerification.valid,
      source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      digest: {
        algorithm: "sha256",
        value: approvalVerification.recomputedApprovalDigest.value,
      },
      detail: "Deployment approval has been recomputed from the verified release archive chain.",
    },
    {
      name: "verified-release-archive",
      valid: approvalVerification.checks.releaseArchiveDigestMatches
        && approvalVerification.checks.verifiedReleaseArchiveDigestMatches,
      source: "/api/v1/ops/promotion-archive/release-archive/verification",
      digest: {
        algorithm: "sha256",
        value: approval.verifiedReleaseArchiveDigest.value,
      },
      detail: "Deployment change record still references the verified release archive digest.",
    },
    {
      name: "deployment-change-state",
      valid: approvalVerification.valid
        && approvalVerification.checks.approvalReadyMatches
        && approval.verification.closeoutReady === approvalVerification.summary.closeoutReady,
      source: "/api/v1/ops/promotion-archive/deployment-approval/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable({
          state: approval.state,
          handoffReady: approval.handoffReady,
          approvalReady: approval.approvalReady,
          closeoutReady: approval.verification.closeoutReady,
          verifiedCloseoutReady: approvalVerification.summary.closeoutReady,
          latestDecisionId: approval.decision.latestDecisionId ?? null,
          nextActions: approval.nextActions,
        }),
      },
      detail: "Deployment change record stores the verified approval readiness and remaining actions.",
    },
  ];
}

function archiveVerificationNextActions(
  manifestDigestValid: boolean,
  artifactsValid: boolean,
  manifest: OpsPromotionArchiveManifest,
): string[] {
  if (!manifestDigestValid) {
    return ["Regenerate the archive manifest before trusting this archive fingerprint."];
  }

  if (!artifactsValid) {
    return ["Review archive manifest artifacts before attaching this archive to a handoff record."];
  }

  if (manifest.state === "ready") {
    return ["Archive manifest is verified; keep the manifest digest with the promotion handoff record."];
  }

  return manifest.nextActions;
}

function archiveAttestationVerificationNextActions(
  checks: OpsPromotionArchiveAttestationVerification["checks"],
  attestation: OpsPromotionArchiveAttestation,
): string[] {
  if (!checks.sealDigestValid) {
    return ["Regenerate the archive attestation before trusting this seal digest."];
  }

  if (!checks.verificationDigestValid) {
    return ["Rebuild archive verification before trusting this attestation seal."];
  }

  if (!checks.manifestDigestMatches || !checks.decisionMatches || !checks.checksMatch || !checks.evidenceSourcesMatch) {
    return ["Recreate the archive attestation from the latest bundle, manifest, and verification objects."];
  }

  if (attestation.handoffReady) {
    return ["Attestation verification is complete; keep the verified seal digest with the promotion handoff record."];
  }

  return attestation.nextActions;
}

function archiveHandoffPackageNextActions(
  attestation: OpsPromotionArchiveAttestation,
  attestationVerification: OpsPromotionArchiveAttestationVerification,
): string[] {
  if (!attestationVerification.valid) {
    return ["Resolve attestation verification failures before sharing the promotion handoff package."];
  }

  if (attestation.handoffReady) {
    return ["Handoff package is ready; share the package digest and verified seal digest with the promotion handoff record."];
  }

  return attestationVerification.nextActions;
}

function archiveHandoffPackageVerificationNextActions(
  checks: OpsPromotionHandoffPackageVerification["checks"],
  handoffPackage: OpsPromotionHandoffPackage,
): string[] {
  if (!checks.packageDigestValid) {
    return ["Regenerate the handoff package before trusting this package digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff package attachments before sharing the promotion handoff package."];
  }

  if (!checks.summaryMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Recreate the handoff package from the latest verified archive chain."];
  }

  if (handoffPackage.handoffReady) {
    return ["Handoff package verification is complete; share the verified package digest with the promotion handoff record."];
  }

  return handoffPackage.nextActions;
}

function archiveHandoffCertificateNextActions(
  handoffPackage: OpsPromotionHandoffPackage,
  handoffPackageVerification: OpsPromotionHandoffPackageVerification,
  valid: boolean,
): string[] {
  if (!handoffPackageVerification.valid) {
    return ["Resolve handoff package verification failures before issuing a promotion handoff certificate."];
  }

  if (!valid) {
    return ["Regenerate the handoff package before issuing a promotion handoff certificate."];
  }

  if (handoffPackage.handoffReady) {
    return ["Promotion handoff certificate is ready; share the certificate digest with the handoff record."];
  }

  return handoffPackageVerification.nextActions;
}

function archiveHandoffCertificateVerificationNextActions(
  checks: OpsPromotionHandoffCertificateVerification["checks"],
  certificate: OpsPromotionHandoffCertificate,
): string[] {
  if (!checks.certificateDigestValid) {
    return ["Regenerate the handoff certificate before trusting this certificate digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff certificate attachments before sharing the promotion handoff certificate."];
  }

  if (!checks.packageDigestMatches || !checks.verifiedPackageDigestMatches || !checks.sealDigestMatches) {
    return ["Recreate the handoff certificate from the latest verified handoff package."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff certificate from the latest package verification result."];
  }

  if (certificate.handoffReady) {
    return ["Handoff certificate verification is complete; share the verified certificate digest with the handoff record."];
  }

  return certificate.nextActions;
}

function archiveHandoffReceiptNextActions(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
  valid: boolean,
): string[] {
  if (!certificateVerification.valid) {
    return ["Resolve handoff certificate verification failures before issuing a promotion handoff receipt."];
  }

  if (!valid) {
    return ["Regenerate the handoff receipt from a verified certificate before storing it."];
  }

  if (certificate.handoffReady) {
    return ["Promotion handoff receipt is ready; store the receipt digest with the final handoff record."];
  }

  return certificateVerification.nextActions;
}

function archiveHandoffReceiptVerificationNextActions(
  checks: OpsPromotionHandoffReceiptVerification["checks"],
  receipt: OpsPromotionHandoffReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the handoff receipt before trusting this receipt digest."];
  }

  if (!checks.milestonesValid) {
    return ["Review handoff receipt milestones before storing the final handoff receipt."];
  }

  if (
    !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff receipt from the latest verified certificate chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff receipt from the latest receipt inputs."];
  }

  if (receipt.handoffReady) {
    return ["Handoff receipt verification is complete; store the verified receipt digest with the final handoff record."];
  }

  return receipt.nextActions;
}

function archiveHandoffClosureNextActions(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
  valid: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve handoff receipt verification failures before closing the promotion handoff."];
  }

  if (!valid) {
    return ["Regenerate the handoff closure from a verified receipt before marking the handoff closed."];
  }

  if (receipt.handoffReady) {
    return ["Promotion handoff closure is ready; record the closure digest and mark the handoff closed."];
  }

  return receiptVerification.nextActions;
}

function archiveHandoffClosureVerificationNextActions(
  checks: OpsPromotionHandoffClosureVerification["checks"],
  closure: OpsPromotionHandoffClosure,
): string[] {
  if (!checks.closureDigestValid) {
    return ["Regenerate the handoff closure before trusting this closure digest."];
  }

  if (!checks.closureItemsValid) {
    return ["Review handoff closure items before marking the promotion handoff closed."];
  }

  if (
    !checks.receiptDigestMatches
    || !checks.verifiedReceiptDigestMatches
    || !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff closure from the latest verified receipt chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff closure from the latest closure inputs."];
  }

  if (closure.handoffReady) {
    return ["Handoff closure verification is complete; store the verified closure digest with the final handoff record."];
  }

  return closure.nextActions;
}

function archiveHandoffCompletionNextActions(
  closureVerification: OpsPromotionHandoffClosureVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!closureVerification.valid) {
    return ["Resolve handoff closure verification failures before issuing the completion record."];
  }

  if (!valid) {
    return ["Regenerate the completion record after the closure and verification agree."];
  }

  if (handoffReady) {
    return ["Promotion handoff completion is ready; archive the completion digest with the final release evidence."];
  }

  return closureVerification.nextActions;
}

function archiveHandoffCompletionVerificationNextActions(
  checks: OpsPromotionHandoffCompletionVerification["checks"],
  completion: OpsPromotionHandoffCompletion,
): string[] {
  if (!checks.completionDigestValid) {
    return ["Regenerate the handoff completion record before trusting this completion digest."];
  }

  if (!checks.completionStepsValid) {
    return ["Review handoff completion steps before archiving final release evidence."];
  }

  if (!checks.closureDigestMatches || !checks.verifiedClosureDigestMatches) {
    return ["Recreate the handoff completion record from the latest verified closure chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff completion record from the latest completion inputs."];
  }

  if (completion.handoffReady) {
    return ["Handoff completion verification is complete; archive the verified completion digest with the final release evidence."];
  }

  return completion.nextActions;
}

function archiveReleaseEvidenceNextActions(
  completionVerification: OpsPromotionHandoffCompletionVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!completionVerification.valid) {
    return ["Resolve handoff completion verification failures before publishing release evidence."];
  }

  if (!valid) {
    return ["Regenerate release evidence after completion and verification agree."];
  }

  if (handoffReady) {
    return ["Release evidence is ready; store the evidence digest with the final release archive."];
  }

  return completionVerification.nextActions;
}

function archiveReleaseEvidenceVerificationNextActions(
  checks: OpsPromotionReleaseEvidenceVerification["checks"],
  evidence: OpsPromotionReleaseEvidence,
): string[] {
  if (!checks.evidenceDigestValid) {
    return ["Regenerate release evidence before trusting this evidence digest."];
  }

  if (!checks.evidenceItemsValid) {
    return ["Review release evidence items before storing the final release archive."];
  }

  if (
    !checks.completionDigestMatches
    || !checks.verifiedCompletionDigestMatches
    || !checks.closureDigestMatches
    || !checks.verifiedClosureDigestMatches
  ) {
    return ["Recreate release evidence from the latest verified completion chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue release evidence from the latest evidence inputs."];
  }

  if (evidence.handoffReady) {
    return ["Release evidence verification is complete; store the verified evidence digest with the final release archive."];
  }

  return evidence.nextActions;
}

function archiveReleaseArchiveNextActions(
  evidenceVerification: OpsPromotionReleaseEvidenceVerification,
  valid: boolean,
  handoffReady: boolean,
): string[] {
  if (!evidenceVerification.valid) {
    return ["Resolve release evidence verification failures before finalizing the release archive."];
  }

  if (!valid) {
    return ["Regenerate the final release archive after evidence and verification agree."];
  }

  if (handoffReady) {
    return ["Final release archive is ready; keep the release archive digest with deployment approval records."];
  }

  return evidenceVerification.nextActions;
}

function archiveReleaseArchiveVerificationNextActions(
  checks: OpsPromotionReleaseArchiveVerification["checks"],
  releaseArchive: OpsPromotionReleaseArchive,
): string[] {
  if (!checks.releaseArchiveDigestValid) {
    return ["Regenerate the final release archive before trusting this archive digest."];
  }

  if (!checks.archiveItemsValid) {
    return ["Review final release archive items before attaching deployment approval records."];
  }

  if (
    !checks.evidenceDigestMatches
    || !checks.verifiedEvidenceDigestMatches
    || !checks.completionDigestMatches
    || !checks.closureDigestMatches
  ) {
    return ["Recreate the final release archive from the latest verified release evidence chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the final release archive from the latest archive inputs."];
  }

  if (releaseArchive.handoffReady) {
    return ["Final release archive verification is complete; attach the verified archive digest to deployment approval records."];
  }

  return releaseArchive.nextActions;
}

function archiveDeploymentApprovalNextActions(
  releaseArchiveVerification: OpsPromotionReleaseArchiveVerification,
  valid: boolean,
  approvalReady: boolean,
): string[] {
  if (!releaseArchiveVerification.valid) {
    return ["Resolve final release archive verification failures before issuing deployment approval."];
  }

  if (!valid) {
    return ["Regenerate deployment approval after release archive and verification agree."];
  }

  if (approvalReady) {
    return ["Deployment approval is ready; attach the approval digest to the deployment change record."];
  }

  return releaseArchiveVerification.nextActions;
}

function archiveDeploymentApprovalVerificationNextActions(
  checks: OpsPromotionDeploymentApprovalVerification["checks"],
  approval: OpsPromotionDeploymentApproval,
): string[] {
  if (!checks.approvalDigestValid) {
    return ["Regenerate deployment approval before trusting this approval digest."];
  }

  if (!checks.approvalItemsValid) {
    return ["Review deployment approval items before attaching the deployment change record."];
  }

  if (
    !checks.releaseArchiveDigestMatches
    || !checks.verifiedReleaseArchiveDigestMatches
    || !checks.evidenceDigestMatches
  ) {
    return ["Recreate deployment approval from the latest verified release archive chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue deployment approval from the latest approval inputs."];
  }

  if (approval.approvalReady) {
    return ["Deployment approval verification is complete; attach the verified approval digest to the deployment change record."];
  }

  return approval.nextActions;
}

function archiveDeploymentChangeRecordNextActions(
  approvalVerification: OpsPromotionDeploymentApprovalVerification,
  valid: boolean,
  changeReady: boolean,
): string[] {
  if (!approvalVerification.valid) {
    return ["Resolve deployment approval verification failures before writing the deployment change record."];
  }

  if (!valid) {
    return ["Regenerate the deployment change record after deployment approval and verification agree."];
  }

  if (changeReady) {
    return ["Deployment change record is ready; attach the change digest to release execution logs."];
  }

  return approvalVerification.nextActions;
}

function archiveDeploymentChangeRecordVerificationNextActions(
  checks: OpsPromotionDeploymentChangeRecordVerification["checks"],
  changeRecord: OpsPromotionDeploymentChangeRecord,
): string[] {
  if (!checks.changeDigestValid) {
    return ["Regenerate the deployment change record before attaching it to release execution logs."];
  }

  if (!checks.changeItemsValid) {
    return ["Review deployment change record items before trusting the change digest."];
  }

  if (!checks.coveredFieldsMatch || !checks.verificationMatches || !checks.nextActionsMatch) {
    return ["Regenerate the deployment change record from the verified approval chain."];
  }

  if (changeRecord.changeReady) {
    return ["Deployment change record is verified; attach the change digest to release execution logs."];
  }

  return changeRecord.nextActions;
}

function archiveAttestationNextActions(
  state: OpsPromotionArchiveAttestationState,
  checks: OpsPromotionArchiveAttestation["checks"],
  bundle: OpsPromotionArchiveBundle,
  verification: OpsPromotionArchiveVerification,
): string[] {
  if (!verification.valid) {
    return ["Resolve archive verification failures before issuing a promotion archive attestation."];
  }

  if (bundle.summary.totalDecisions === 0 || state === "not-started") {
    return ["Record an approved promotion decision before issuing a promotion archive attestation."];
  }

  if (!checks.integrityVerified) {
    return ["Repair promotion decision ledger integrity before sealing the archive attestation."];
  }

  if (!checks.latestDecisionReady) {
    return ["Complete readiness, runbook, and baseline requirements before recording an approved promotion decision."];
  }

  if (!checks.archiveReady) {
    return bundle.nextActions;
  }

  return ["Archive attestation is ready; attach the seal digest to the promotion handoff record."];
}

function archiveState(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): OpsPromotionArchiveState {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return "empty";
  }

  if (!integrity.valid || !latestEvidence.summary.digestValid) {
    return "attention-required";
  }

  return latestEvidence.summary.outcome === "approved" ? "ready" : "attention-required";
}

function archiveNextActions(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): string[] {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return ["Record a promotion decision before building an archive bundle."];
  }

  if (!integrity.valid) {
    return ["Inspect promotion decision ledger integrity before trusting this archive bundle."];
  }

  if (!latestEvidence.summary.digestValid) {
    return ["Inspect the latest promotion decision digest before trusting this archive bundle."];
  }

  if (latestEvidence.summary.outcome === "approved") {
    return ["Archive bundle is internally consistent; keep it with the promotion handoff record."];
  }

  return latestEvidence.nextActions;
}

function renderLatestEvidence(evidence: OpsPromotionEvidenceReport | undefined): string[] {
  if (evidence === undefined) {
    return ["- No promotion decision evidence is available yet."];
  }

  return [
    `- Decision id: ${evidence.decisionId}`,
    `- Sequence: ${evidence.sequence}`,
    `- Verdict: ${evidence.verdict}`,
    `- Outcome: ${evidence.summary.outcome}`,
    `- Ready for promotion: ${evidence.summary.readyForPromotion}`,
    `- Digest valid: ${evidence.summary.digestValid}`,
    `- Digest: ${evidence.summary.digestAlgorithm}:${evidence.summary.digest}`,
    `- Readiness: ${evidence.summary.readinessState}`,
    `- Runbook: ${evidence.summary.runbookState}`,
    `- Baseline: ${evidence.summary.baselineState}`,
  ];
}

function archiveArtifacts(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifestArtifact[] {
  return [
    {
      name: "archive-summary",
      type: "archive-summary",
      present: true,
      digest: {
        algorithm: "sha256",
        value: digestStable({
          archiveName: bundle.archiveName,
          state: bundle.state,
          summary: bundle.summary,
          nextActions: bundle.nextActions,
        }),
      },
      source: "/api/v1/ops/promotion-archive",
    },
    {
      name: "latest-evidence",
      type: "latest-evidence",
      present: bundle.latestEvidence !== undefined,
      digest: {
        algorithm: "sha256",
        value: digestStable(bundle.latestEvidence === undefined
          ? { present: false }
          : {
            decisionId: bundle.latestEvidence.decisionId,
            sequence: bundle.latestEvidence.sequence,
            verdict: bundle.latestEvidence.verdict,
            summary: bundle.latestEvidence.summary,
            nextActions: bundle.latestEvidence.nextActions,
          }),
      },
      source: bundle.latestEvidence === undefined
        ? "/api/v1/ops/promotion-decisions/:decisionId/evidence"
        : `/api/v1/ops/promotion-decisions/${bundle.latestEvidence.decisionId}/evidence`,
    },
    {
      name: "ledger-integrity",
      type: "ledger-integrity",
      present: true,
      digest: {
        algorithm: "sha256",
        value: bundle.integrity.rootDigest.value,
      },
      source: "/api/v1/ops/promotion-decisions/integrity",
    },
  ];
}

function renderManifestArtifacts(artifacts: OpsPromotionArchiveManifestArtifact[]): string[] {
  return artifacts.flatMap((artifact) => [
    `### ${artifact.name}`,
    "",
    `- Type: ${artifact.type}`,
    `- Present: ${artifact.present}`,
    `- Digest: ${artifact.digest.algorithm}:${artifact.digest.value}`,
    `- Source: ${artifact.source}`,
    "",
  ]);
}

function renderVerificationArtifacts(artifacts: OpsPromotionArchiveVerificationArtifact[]): string[] {
  return artifacts.flatMap((artifact) => [
    `### ${artifact.name}`,
    "",
    `- Type: ${artifact.type}`,
    `- Valid: ${artifact.valid}`,
    `- Present matches: ${artifact.presentMatches}`,
    `- Source matches: ${artifact.sourceMatches}`,
    `- Digest matches: ${artifact.digestMatches}`,
    `- Manifest digest: ${artifact.manifestDigest.algorithm}:${artifact.manifestDigest.value}`,
    `- Recomputed digest: ${artifact.recomputedDigest.algorithm}:${artifact.recomputedDigest.value}`,
    `- Source: ${artifact.source}`,
    "",
  ]);
}

function renderAttestationEvidenceSources(sources: OpsPromotionArchiveAttestationEvidenceSource[]): string[] {
  return sources.flatMap((source) => [
    `### ${source.name}`,
    "",
    `- Type: ${source.type}`,
    `- Present: ${source.present}`,
    `- Verified: ${source.verified}`,
    `- Digest: ${source.digest.algorithm}:${source.digest.value}`,
    `- Source: ${source.source}`,
    "",
  ]);
}

function renderHandoffPackageAttachments(attachments: OpsPromotionHandoffPackageAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Digest: ${attachment.digest.algorithm}:${attachment.digest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}

function renderHandoffPackageVerificationAttachments(attachments: OpsPromotionHandoffPackageVerificationAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Valid matches: ${attachment.validMatches}`,
    `- Source matches: ${attachment.sourceMatches}`,
    `- Digest matches: ${attachment.digestMatches}`,
    `- Package digest: ${attachment.packageDigest.algorithm}:${attachment.packageDigest.value}`,
    `- Recomputed digest: ${attachment.recomputedDigest.algorithm}:${attachment.recomputedDigest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}

function renderHandoffCertificateAttachments(attachments: OpsPromotionHandoffCertificateAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Digest: ${attachment.digest.algorithm}:${attachment.digest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}

function renderHandoffCertificateVerificationAttachments(attachments: OpsPromotionHandoffCertificateVerificationAttachment[]): string[] {
  return attachments.flatMap((attachment) => [
    `### ${attachment.name}`,
    "",
    `- Valid: ${attachment.valid}`,
    `- Valid matches: ${attachment.validMatches}`,
    `- Source matches: ${attachment.sourceMatches}`,
    `- Digest matches: ${attachment.digestMatches}`,
    `- Certificate digest: ${attachment.certificateDigest.algorithm}:${attachment.certificateDigest.value}`,
    `- Recomputed digest: ${attachment.recomputedDigest.algorithm}:${attachment.recomputedDigest.value}`,
    `- Source: ${attachment.source}`,
    "",
  ]);
}

function renderHandoffReceiptMilestones(milestones: OpsPromotionHandoffReceiptMilestone[]): string[] {
  return milestones.flatMap((milestone) => [
    `### ${milestone.name}`,
    "",
    `- Valid: ${milestone.valid}`,
    `- Digest: ${milestone.digest.algorithm}:${milestone.digest.value}`,
    `- Source: ${milestone.source}`,
    "",
  ]);
}

function renderHandoffReceiptVerificationMilestones(milestones: OpsPromotionHandoffReceiptVerificationMilestone[]): string[] {
  return milestones.flatMap((milestone) => [
    `### ${milestone.name}`,
    "",
    `- Valid: ${milestone.valid}`,
    `- Valid matches: ${milestone.validMatches}`,
    `- Source matches: ${milestone.sourceMatches}`,
    `- Digest matches: ${milestone.digestMatches}`,
    `- Receipt digest: ${milestone.receiptDigest.algorithm}:${milestone.receiptDigest.value}`,
    `- Recomputed digest: ${milestone.recomputedDigest.algorithm}:${milestone.recomputedDigest.value}`,
    `- Source: ${milestone.source}`,
    "",
  ]);
}

function renderHandoffClosureItems(items: OpsPromotionHandoffClosureItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    "",
  ]);
}

function renderHandoffClosureVerificationItems(items: OpsPromotionHandoffClosureVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Closure digest: ${item.closureDigest.algorithm}:${item.closureDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    "",
  ]);
}

function renderHandoffCompletionSteps(steps: OpsPromotionHandoffCompletionStep[]): string[] {
  return steps.flatMap((step) => [
    `### ${step.name}`,
    "",
    `- Valid: ${step.valid}`,
    `- Ready: ${step.ready}`,
    `- Digest: ${step.digest.algorithm}:${step.digest.value}`,
    `- Source: ${step.source}`,
    `- Detail: ${step.detail}`,
    "",
  ]);
}

function renderHandoffCompletionVerificationSteps(steps: OpsPromotionHandoffCompletionVerificationStep[]): string[] {
  return steps.flatMap((step) => [
    `### ${step.name}`,
    "",
    `- Valid: ${step.valid}`,
    `- Valid matches: ${step.validMatches}`,
    `- Ready matches: ${step.readyMatches}`,
    `- Source matches: ${step.sourceMatches}`,
    `- Detail matches: ${step.detailMatches}`,
    `- Digest matches: ${step.digestMatches}`,
    `- Completion digest: ${step.completionDigest.algorithm}:${step.completionDigest.value}`,
    `- Recomputed digest: ${step.recomputedDigest.algorithm}:${step.recomputedDigest.value}`,
    `- Source: ${step.source}`,
    `- Detail: ${step.detail}`,
    "",
  ]);
}

function renderReleaseEvidenceItems(items: OpsPromotionReleaseEvidenceItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderReleaseEvidenceVerificationItems(items: OpsPromotionReleaseEvidenceVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Evidence digest: ${item.evidenceDigest.algorithm}:${item.evidenceDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderReleaseArchiveItems(items: OpsPromotionReleaseArchiveItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderReleaseArchiveVerificationItems(items: OpsPromotionReleaseArchiveVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Release archive digest: ${item.releaseArchiveDigest.algorithm}:${item.releaseArchiveDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderDeploymentApprovalItems(items: OpsPromotionDeploymentApprovalItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderDeploymentApprovalVerificationItems(items: OpsPromotionDeploymentApprovalVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Approval digest: ${item.approvalDigest.algorithm}:${item.approvalDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderDeploymentChangeRecordItems(items: OpsPromotionDeploymentChangeRecordItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Digest: ${item.digest.algorithm}:${item.digest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function renderDeploymentChangeRecordVerificationItems(items: OpsPromotionDeploymentChangeRecordVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Change item digest: ${item.changeItemDigest.algorithm}:${item.changeItemDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}

function digestStable(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function stableJson(value: unknown): string {
  if (value === undefined) {
    return "null";
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
