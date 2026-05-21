import type { OpsPromotionArchiveAttestationState } from "./opsPromotionArchiveCoreTypes.js";
import type { OpsPromotionHandoffCompletion } from "./opsPromotionArchiveHandoffTypes.js";

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

