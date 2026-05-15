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



export function renderOpsPromotionDeploymentExecutionRecordMarkdown(record: OpsPromotionDeploymentExecutionRecord): string {
  const lines = [
    "# Promotion deployment execution record",
    "",
    `- Service: ${record.service}`,
    `- Generated at: ${record.generatedAt}`,
    `- Execution name: ${record.executionName}`,
    `- Change record name: ${record.changeRecordName}`,
    `- Approval name: ${record.approvalName}`,
    `- Release archive name: ${record.releaseArchiveName}`,
    `- Evidence name: ${record.evidenceName}`,
    `- Completion name: ${record.completionName}`,
    `- Closure name: ${record.closureName}`,
    `- Receipt name: ${record.receiptName}`,
    `- Certificate name: ${record.certificateName}`,
    `- Package name: ${record.packageName}`,
    `- Archive name: ${record.archiveName}`,
    `- State: ${record.state}`,
    `- Valid: ${record.valid}`,
    `- Handoff ready: ${record.handoffReady}`,
    `- Approval ready: ${record.approvalReady}`,
    `- Change ready: ${record.changeReady}`,
    `- Execution ready: ${record.executionReady}`,
    `- Execution digest: ${record.executionDigest.algorithm}:${record.executionDigest.value}`,
    `- Change digest: ${record.changeDigest.algorithm}:${record.changeDigest.value}`,
    `- Verified change digest: ${record.verifiedChangeDigest.algorithm}:${record.verifiedChangeDigest.value}`,
    `- Approval digest: ${record.approvalDigest.algorithm}:${record.approvalDigest.value}`,
    `- Release archive digest: ${record.releaseArchiveDigest.algorithm}:${record.releaseArchiveDigest.value}`,
    `- Covered fields: ${record.executionDigest.coveredFields.join(", ")}`,
    "",
    "## Decision",
    "",
    `- Total decisions: ${record.decision.totalDecisions}`,
    `- Latest decision id: ${record.decision.latestDecisionId ?? "none"}`,
    `- Latest outcome: ${record.decision.latestOutcome ?? "none"}`,
    "",
    "## Verification",
    "",
    `- Change record verified: ${record.verification.changeRecordVerified}`,
    `- Change digest valid: ${record.verification.changeDigestValid}`,
    `- Change items valid: ${record.verification.changeItemsValid}`,
    `- Change reference valid: ${record.verification.changeReferenceValid}`,
    `- Closeout ready: ${record.verification.closeoutReady}`,
    `- Change item count: ${record.verification.changeItemCount}`,
    `- Execution item count: ${record.verification.executionItemCount}`,
    "",
    "## Execution Items",
    "",
    ...renderDeploymentExecutionRecordItems(record.executionItems),
    "",
    "## Next Actions",
    "",
    ...record.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}



export function renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionRecordVerification,
): string {
  const lines = [
    "# Promotion deployment execution record verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Execution name: ${verification.executionName}`,
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
    `- Execution ready: ${verification.executionReady}`,
    `- Valid: ${verification.valid}`,
    `- Execution digest: ${verification.executionDigest.algorithm}:${verification.executionDigest.value}`,
    `- Recomputed execution digest: ${verification.recomputedExecutionDigest.algorithm}:${verification.recomputedExecutionDigest.value}`,
    "",
    "## Checks",
    "",
    `- Execution digest valid: ${verification.checks.executionDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Execution items valid: ${verification.checks.executionItemsValid}`,
    `- Execution name matches: ${verification.checks.executionNameMatches}`,
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
    `- Execution ready matches: ${verification.checks.executionReadyMatches}`,
    `- Change digest matches: ${verification.checks.changeDigestMatches}`,
    `- Verified change digest matches: ${verification.checks.verifiedChangeDigestMatches}`,
    `- Approval digest matches: ${verification.checks.approvalDigestMatches}`,
    `- Release archive digest matches: ${verification.checks.releaseArchiveDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Execution Items",
    "",
    ...renderDeploymentExecutionRecordVerificationItems(verification.executionItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Execution item count: ${verification.summary.executionItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Approval ready: ${verification.summary.approvalReady}`,
    `- Change ready: ${verification.summary.changeReady}`,
    `- Execution ready: ${verification.summary.executionReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}



export function renderOpsPromotionDeploymentExecutionReceiptMarkdown(receipt: OpsPromotionDeploymentExecutionReceipt): string {
  const lines = [
    "# Promotion deployment execution receipt",
    "",
    `- Service: ${receipt.service}`,
    `- Generated at: ${receipt.generatedAt}`,
    `- Receipt name: ${receipt.receiptName}`,
    `- Execution name: ${receipt.executionName}`,
    `- Change record name: ${receipt.changeRecordName}`,
    `- Approval name: ${receipt.approvalName}`,
    `- Release archive name: ${receipt.releaseArchiveName}`,
    `- Evidence name: ${receipt.evidenceName}`,
    `- Completion name: ${receipt.completionName}`,
    `- Closure name: ${receipt.closureName}`,
    `- Receipt record name: ${receipt.receiptRecordName}`,
    `- Certificate name: ${receipt.certificateName}`,
    `- Package name: ${receipt.packageName}`,
    `- Archive name: ${receipt.archiveName}`,
    `- State: ${receipt.state}`,
    `- Valid: ${receipt.valid}`,
    `- Handoff ready: ${receipt.handoffReady}`,
    `- Approval ready: ${receipt.approvalReady}`,
    `- Change ready: ${receipt.changeReady}`,
    `- Execution ready: ${receipt.executionReady}`,
    `- Receipt ready: ${receipt.receiptReady}`,
    `- Receipt digest: ${receipt.receiptDigest.algorithm}:${receipt.receiptDigest.value}`,
    `- Execution digest: ${receipt.executionDigest.algorithm}:${receipt.executionDigest.value}`,
    `- Verified execution digest: ${receipt.verifiedExecutionDigest.algorithm}:${receipt.verifiedExecutionDigest.value}`,
    `- Change digest: ${receipt.changeDigest.algorithm}:${receipt.changeDigest.value}`,
    `- Approval digest: ${receipt.approvalDigest.algorithm}:${receipt.approvalDigest.value}`,
    `- Release archive digest: ${receipt.releaseArchiveDigest.algorithm}:${receipt.releaseArchiveDigest.value}`,
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
    `- Execution record verified: ${receipt.verification.executionRecordVerified}`,
    `- Execution digest valid: ${receipt.verification.executionDigestValid}`,
    `- Execution items valid: ${receipt.verification.executionItemsValid}`,
    `- Execution reference valid: ${receipt.verification.executionReferenceValid}`,
    `- Closeout ready: ${receipt.verification.closeoutReady}`,
    `- Execution item count: ${receipt.verification.executionItemCount}`,
    `- Receipt item count: ${receipt.verification.receiptItemCount}`,
    "",
    "## Receipt Items",
    "",
    ...renderDeploymentExecutionReceiptItems(receipt.receiptItems),
    "",
    "## Next Actions",
    "",
    ...receipt.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}



export function renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown(
  verification: OpsPromotionDeploymentExecutionReceiptVerification,
): string {
  const lines = [
    "# Promotion deployment execution receipt verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Receipt name: ${verification.receiptName}`,
    `- Execution name: ${verification.executionName}`,
    `- Change record name: ${verification.changeRecordName}`,
    `- Approval name: ${verification.approvalName}`,
    `- Release archive name: ${verification.releaseArchiveName}`,
    `- Evidence name: ${verification.evidenceName}`,
    `- Completion name: ${verification.completionName}`,
    `- Closure name: ${verification.closureName}`,
    `- Receipt record name: ${verification.receiptRecordName}`,
    `- Certificate name: ${verification.certificateName}`,
    `- Package name: ${verification.packageName}`,
    `- Archive name: ${verification.archiveName}`,
    `- State: ${verification.state}`,
    `- Handoff ready: ${verification.handoffReady}`,
    `- Approval ready: ${verification.approvalReady}`,
    `- Change ready: ${verification.changeReady}`,
    `- Execution ready: ${verification.executionReady}`,
    `- Receipt ready: ${verification.receiptReady}`,
    `- Valid: ${verification.valid}`,
    `- Receipt digest: ${verification.receiptDigest.algorithm}:${verification.receiptDigest.value}`,
    `- Recomputed receipt digest: ${verification.recomputedReceiptDigest.algorithm}:${verification.recomputedReceiptDigest.value}`,
    "",
    "## Checks",
    "",
    `- Receipt digest valid: ${verification.checks.receiptDigestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Receipt items valid: ${verification.checks.receiptItemsValid}`,
    `- Receipt name matches: ${verification.checks.receiptNameMatches}`,
    `- Execution name matches: ${verification.checks.executionNameMatches}`,
    `- Change record name matches: ${verification.checks.changeRecordNameMatches}`,
    `- Approval name matches: ${verification.checks.approvalNameMatches}`,
    `- Release archive name matches: ${verification.checks.releaseArchiveNameMatches}`,
    `- Evidence name matches: ${verification.checks.evidenceNameMatches}`,
    `- Completion name matches: ${verification.checks.completionNameMatches}`,
    `- Closure name matches: ${verification.checks.closureNameMatches}`,
    `- Receipt record name matches: ${verification.checks.receiptRecordNameMatches}`,
    `- Certificate name matches: ${verification.checks.certificateNameMatches}`,
    `- Package name matches: ${verification.checks.packageNameMatches}`,
    `- Archive name matches: ${verification.checks.archiveNameMatches}`,
    `- Valid matches: ${verification.checks.validMatches}`,
    `- State matches: ${verification.checks.stateMatches}`,
    `- Handoff ready matches: ${verification.checks.handoffReadyMatches}`,
    `- Approval ready matches: ${verification.checks.approvalReadyMatches}`,
    `- Change ready matches: ${verification.checks.changeReadyMatches}`,
    `- Execution ready matches: ${verification.checks.executionReadyMatches}`,
    `- Receipt ready matches: ${verification.checks.receiptReadyMatches}`,
    `- Execution digest matches: ${verification.checks.executionDigestMatches}`,
    `- Verified execution digest matches: ${verification.checks.verifiedExecutionDigestMatches}`,
    `- Change digest matches: ${verification.checks.changeDigestMatches}`,
    `- Approval digest matches: ${verification.checks.approvalDigestMatches}`,
    `- Release archive digest matches: ${verification.checks.releaseArchiveDigestMatches}`,
    `- Decision matches: ${verification.checks.decisionMatches}`,
    `- Verification matches: ${verification.checks.verificationMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Receipt Items",
    "",
    ...renderDeploymentExecutionReceiptVerificationItems(verification.receiptItems),
    "",
    "## Summary",
    "",
    `- Total decisions: ${verification.summary.totalDecisions}`,
    `- Latest decision id: ${verification.summary.latestDecisionId ?? "none"}`,
    `- Receipt item count: ${verification.summary.receiptItemCount}`,
    `- Handoff ready: ${verification.summary.handoffReady}`,
    `- Approval ready: ${verification.summary.approvalReady}`,
    `- Change ready: ${verification.summary.changeReady}`,
    `- Execution ready: ${verification.summary.executionReady}`,
    `- Receipt ready: ${verification.summary.receiptReady}`,
    `- Closeout ready: ${verification.summary.closeoutReady}`,
    "",
    "## Next Actions",
    "",
    ...verification.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}



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



function renderDeploymentExecutionRecordItems(items: OpsPromotionDeploymentExecutionRecordItem[]): string[] {
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



function renderDeploymentExecutionRecordVerificationItems(items: OpsPromotionDeploymentExecutionRecordVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Execution item digest: ${item.executionItemDigest.algorithm}:${item.executionItemDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
}



function renderDeploymentExecutionReceiptItems(items: OpsPromotionDeploymentExecutionReceiptItem[]): string[] {
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



function renderDeploymentExecutionReceiptVerificationItems(items: OpsPromotionDeploymentExecutionReceiptVerificationItem[]): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    `- Valid: ${item.valid}`,
    `- Valid matches: ${item.validMatches}`,
    `- Source matches: ${item.sourceMatches}`,
    `- Detail matches: ${item.detailMatches}`,
    `- Digest matches: ${item.digestMatches}`,
    `- Receipt item digest: ${item.receiptItemDigest.algorithm}:${item.receiptItemDigest.value}`,
    `- Recomputed digest: ${item.recomputedDigest.algorithm}:${item.recomputedDigest.value}`,
    `- Source: ${item.source}`,
    `- Detail: ${item.detail}`,
    "",
  ]);
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


