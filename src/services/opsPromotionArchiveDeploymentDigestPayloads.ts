import type {
  OpsPromotionArchiveAttestationState,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionReleaseAuditTrailRecord,
  OpsPromotionReleaseAuditTrailRecordItem,
} from "./opsPromotionArchiveBundleTypes.js";

export function archiveDeploymentApprovalDigestPayload(input: {
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

export function archiveDeploymentChangeRecordDigestPayload(input: {
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

export function archiveDeploymentExecutionRecordDigestPayload(input: {
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
  changeDigest: string;
  verifiedChangeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionRecord["decision"];
  verification: OpsPromotionDeploymentExecutionRecord["verification"];
  executionItems: OpsPromotionDeploymentExecutionRecordItem[];
  nextActions: string[];
}) {
  return {
    executionName: input.executionName,
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
    executionReady: input.executionReady,
    changeDigest: input.changeDigest,
    verifiedChangeDigest: input.verifiedChangeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    executionItems: input.executionItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

export function archiveDeploymentExecutionReceiptDigestPayload(input: {
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
  executionDigest: string;
  verifiedExecutionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionDeploymentExecutionReceipt["decision"];
  verification: OpsPromotionDeploymentExecutionReceipt["verification"];
  receiptItems: OpsPromotionDeploymentExecutionReceiptItem[];
  nextActions: string[];
}) {
  return {
    receiptName: input.receiptName,
    executionName: input.executionName,
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptRecordName: input.receiptRecordName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    executionReady: input.executionReady,
    receiptReady: input.receiptReady,
    executionDigest: input.executionDigest,
    verifiedExecutionDigest: input.verifiedExecutionDigest,
    changeDigest: input.changeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    receiptItems: input.receiptItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}

export function archiveReleaseAuditTrailDigestPayload(input: {
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
  receiptDigest: string;
  verifiedReceiptDigest: string;
  executionDigest: string;
  changeDigest: string;
  approvalDigest: string;
  releaseArchiveDigest: string;
  decision: OpsPromotionReleaseAuditTrailRecord["decision"];
  verification: OpsPromotionReleaseAuditTrailRecord["verification"];
  auditItems: OpsPromotionReleaseAuditTrailRecordItem[];
  nextActions: string[];
}) {
  return {
    auditTrailName: input.auditTrailName,
    receiptName: input.receiptName,
    executionName: input.executionName,
    changeRecordName: input.changeRecordName,
    approvalName: input.approvalName,
    releaseArchiveName: input.releaseArchiveName,
    evidenceName: input.evidenceName,
    completionName: input.completionName,
    closureName: input.closureName,
    receiptRecordName: input.receiptRecordName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    approvalReady: input.approvalReady,
    changeReady: input.changeReady,
    executionReady: input.executionReady,
    receiptReady: input.receiptReady,
    auditReady: input.auditReady,
    receiptDigest: input.receiptDigest,
    verifiedReceiptDigest: input.verifiedReceiptDigest,
    executionDigest: input.executionDigest,
    changeDigest: input.changeDigest,
    approvalDigest: input.approvalDigest,
    releaseArchiveDigest: input.releaseArchiveDigest,
    decision: input.decision,
    verification: input.verification,
    auditItems: input.auditItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
      detail: item.detail,
    })),
    nextActions: input.nextActions,
  };
}


