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

export type OpsPromotionDeploymentExecutionRecordItemName =
  | "deployment-change-record"
  | "verified-deployment-change-record"
  | "deployment-approval"
  | "deployment-execution-state";

export interface OpsPromotionDeploymentExecutionRecordItem {
  name: OpsPromotionDeploymentExecutionRecordItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionDeploymentExecutionRecord {
  service: "orderops-node";
  generatedAt: string;
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
  executionDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  changeDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedChangeDigest: {
    algorithm: "sha256";
    value: string;
  };
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionDeploymentChangeRecord["decision"];
  verification: {
    changeRecordVerified: boolean;
    changeDigestValid: boolean;
    changeItemsValid: boolean;
    changeReferenceValid: boolean;
    closeoutReady: boolean;
    changeItemCount: number;
    executionItemCount: number;
  };
  executionItems: OpsPromotionDeploymentExecutionRecordItem[];
  nextActions: string[];
}

export interface OpsPromotionDeploymentExecutionRecordVerificationItem {
  name: OpsPromotionDeploymentExecutionRecordItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  executionItemDigest: {
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

export interface OpsPromotionDeploymentExecutionRecordVerification {
  service: "orderops-node";
  generatedAt: string;
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
  executionDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedExecutionDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    executionDigestValid: boolean;
    coveredFieldsMatch: boolean;
    executionItemsValid: boolean;
    executionNameMatches: boolean;
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
    executionReadyMatches: boolean;
    changeDigestMatches: boolean;
    verifiedChangeDigestMatches: boolean;
    approvalDigestMatches: boolean;
    releaseArchiveDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    executionItemCount: number;
    handoffReady: boolean;
    approvalReady: boolean;
    changeReady: boolean;
    executionReady: boolean;
    closeoutReady: boolean;
  };
  executionItems: OpsPromotionDeploymentExecutionRecordVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionDeploymentExecutionReceiptItemName =
  | "deployment-execution-record"
  | "verified-deployment-execution-record"
  | "deployment-change-record"
  | "deployment-receipt-state";

export interface OpsPromotionDeploymentExecutionReceiptItem {
  name: OpsPromotionDeploymentExecutionReceiptItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionDeploymentExecutionReceipt {
  service: "orderops-node";
  generatedAt: string;
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
  receiptDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  executionDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedExecutionDigest: {
    algorithm: "sha256";
    value: string;
  };
  changeDigest: {
    algorithm: "sha256";
    value: string;
  };
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionDeploymentExecutionRecord["decision"];
  verification: {
    executionRecordVerified: boolean;
    executionDigestValid: boolean;
    executionItemsValid: boolean;
    executionReferenceValid: boolean;
    closeoutReady: boolean;
    executionItemCount: number;
    receiptItemCount: number;
  };
  receiptItems: OpsPromotionDeploymentExecutionReceiptItem[];
  nextActions: string[];
}

export interface OpsPromotionDeploymentExecutionReceiptVerificationItem {
  name: OpsPromotionDeploymentExecutionReceiptItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  detailMatches: boolean;
  digestMatches: boolean;
  receiptItemDigest: {
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

export interface OpsPromotionDeploymentExecutionReceiptVerification {
  service: "orderops-node";
  generatedAt: string;
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
    receiptItemsValid: boolean;
    receiptNameMatches: boolean;
    executionNameMatches: boolean;
    changeRecordNameMatches: boolean;
    approvalNameMatches: boolean;
    releaseArchiveNameMatches: boolean;
    evidenceNameMatches: boolean;
    completionNameMatches: boolean;
    closureNameMatches: boolean;
    receiptRecordNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    approvalReadyMatches: boolean;
    changeReadyMatches: boolean;
    executionReadyMatches: boolean;
    receiptReadyMatches: boolean;
    executionDigestMatches: boolean;
    verifiedExecutionDigestMatches: boolean;
    changeDigestMatches: boolean;
    approvalDigestMatches: boolean;
    releaseArchiveDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    receiptItemCount: number;
    handoffReady: boolean;
    approvalReady: boolean;
    changeReady: boolean;
    executionReady: boolean;
    receiptReady: boolean;
    closeoutReady: boolean;
  };
  receiptItems: OpsPromotionDeploymentExecutionReceiptVerificationItem[];
  nextActions: string[];
}

export type OpsPromotionReleaseAuditTrailRecordItemName =
  | "deployment-execution-receipt"
  | "verified-deployment-execution-receipt"
  | "deployment-execution-record"
  | "release-audit-state";

export interface OpsPromotionReleaseAuditTrailRecordItem {
  name: OpsPromotionReleaseAuditTrailRecordItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  detail: string;
}

export interface OpsPromotionReleaseAuditTrailRecord {
  service: "orderops-node";
  generatedAt: string;
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
  auditDigest: {
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
  executionDigest: {
    algorithm: "sha256";
    value: string;
  };
  changeDigest: {
    algorithm: "sha256";
    value: string;
  };
  approvalDigest: {
    algorithm: "sha256";
    value: string;
  };
  releaseArchiveDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionDeploymentExecutionReceipt["decision"];
  verification: {
    receiptVerified: boolean;
    receiptDigestValid: boolean;
    receiptItemsValid: boolean;
    receiptReferenceValid: boolean;
    closeoutReady: boolean;
    receiptItemCount: number;
    auditItemCount: number;
  };
  auditItems: OpsPromotionReleaseAuditTrailRecordItem[];
  nextActions: string[];
}

