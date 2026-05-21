import type { OpsPromotionArchiveAttestationState } from "./opsPromotionArchiveCoreTypes.js";
import type { OpsPromotionReleaseArchive } from "./opsPromotionArchiveReleaseTypes.js";

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

