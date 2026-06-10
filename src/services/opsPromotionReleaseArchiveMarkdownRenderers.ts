import type {
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidenceVerification,
  OpsPromotionReleaseEvidenceVerificationItem,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseArchiveVerificationItem,
} from "./opsPromotionArchiveBundleTypes.js";

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
