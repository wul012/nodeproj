import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveManifestArtifact,
  OpsPromotionArchiveVerification,
  OpsPromotionArchiveVerificationArtifact,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentApprovalVerificationItem,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentChangeRecordVerificationItem,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionDeploymentExecutionReceiptVerificationItem,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionDeploymentExecutionRecordVerificationItem,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffCertificateVerificationAttachment,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffClosureVerificationItem,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffCompletionVerificationStep,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffPackageVerificationAttachment,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionHandoffReceiptVerificationMilestone,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseArchiveVerificationItem,
  OpsPromotionReleaseAuditTrailRecord,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidenceVerification,
  OpsPromotionReleaseEvidenceVerificationItem,
} from "./opsPromotionArchiveBundleTypes.js";

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



