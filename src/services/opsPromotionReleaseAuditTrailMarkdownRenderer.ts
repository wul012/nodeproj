import type {
  OpsPromotionReleaseAuditTrailRecord,
  OpsPromotionReleaseAuditTrailRecordItem,
} from "./opsPromotionArchiveBundleTypes.js";

export function renderOpsPromotionReleaseAuditTrailRecordMarkdown(record: OpsPromotionReleaseAuditTrailRecord): string {
  const lines = [
    "# Promotion release audit trail record",
    "",
    `- Service: ${record.service}`,
    `- Generated at: ${record.generatedAt}`,
    `- Audit trail name: ${record.auditTrailName}`,
    `- Receipt name: ${record.receiptName}`,
    `- Execution name: ${record.executionName}`,
    `- Change record name: ${record.changeRecordName}`,
    `- Approval name: ${record.approvalName}`,
    `- Release archive name: ${record.releaseArchiveName}`,
    `- Evidence name: ${record.evidenceName}`,
    `- Completion name: ${record.completionName}`,
    `- Closure name: ${record.closureName}`,
    `- Receipt record name: ${record.receiptRecordName}`,
    `- Certificate name: ${record.certificateName}`,
    `- Package name: ${record.packageName}`,
    `- Archive name: ${record.archiveName}`,
    `- State: ${record.state}`,
    `- Valid: ${record.valid}`,
    `- Handoff ready: ${record.handoffReady}`,
    `- Approval ready: ${record.approvalReady}`,
    `- Change ready: ${record.changeReady}`,
    `- Execution ready: ${record.executionReady}`,
    `- Receipt ready: ${record.receiptReady}`,
    `- Audit ready: ${record.auditReady}`,
    `- Audit digest: ${record.auditDigest.algorithm}:${record.auditDigest.value}`,
    `- Receipt digest: ${record.receiptDigest.algorithm}:${record.receiptDigest.value}`,
    `- Verified receipt digest: ${record.verifiedReceiptDigest.algorithm}:${record.verifiedReceiptDigest.value}`,
    `- Execution digest: ${record.executionDigest.algorithm}:${record.executionDigest.value}`,
    `- Change digest: ${record.changeDigest.algorithm}:${record.changeDigest.value}`,
    `- Approval digest: ${record.approvalDigest.algorithm}:${record.approvalDigest.value}`,
    `- Release archive digest: ${record.releaseArchiveDigest.algorithm}:${record.releaseArchiveDigest.value}`,
    `- Covered fields: ${record.auditDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${record.decision.totalDecisions}`,
    `- Latest decision id: ${record.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${record.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Receipt verified: ${record.verification.receiptVerified}`,
    `- Receipt digest valid: ${record.verification.receiptDigestValid}`,
    `- Receipt items valid: ${record.verification.receiptItemsValid}`,
    `- Receipt reference valid: ${record.verification.receiptReferenceValid}`,
    `- Closeout ready: ${record.verification.closeoutReady}`,
    `- Receipt item count: ${record.verification.receiptItemCount}`,
    `- Audit item count: ${record.verification.auditItemCount}`,
    "",
    "## Audit Items",
    "",
    ...renderReleaseAuditTrailItems(record.auditItems),
    "",
    "## Next Actions",
    "",
    ...record.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}



function renderReleaseAuditTrailItems(items: OpsPromotionReleaseAuditTrailRecordItem[]): string[] {
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
