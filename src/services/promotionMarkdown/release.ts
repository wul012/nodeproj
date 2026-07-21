import type {
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceVerification,
} from "../opsPromotionArchiveBundleTypes.js";
import {
  formatMarkdownDigest,
  renderMarkdownBullets,
  renderMarkdownFields,
  type MarkdownDocumentSpec,
} from "../promotionMarkdownEngine.js";
import {
  checkedDetailLines,
  decisionLines,
  detailItemLines,
  summaryLines,
} from "./stage.js";

export function releaseEvidenceSpec(
  evidence: OpsPromotionReleaseEvidence,
): MarkdownDocumentSpec {
  return {
    title: "Promotion release evidence",
    fields: [
      ["Service", evidence.service],
      ["Generated at", evidence.generatedAt],
      ["Evidence name", evidence.evidenceName],
      ["Completion name", evidence.completionName],
      ["Closure name", evidence.closureName],
      ["Receipt name", evidence.receiptName],
      ["Certificate name", evidence.certificateName],
      ["Package name", evidence.packageName],
      ["Archive name", evidence.archiveName],
      ["State", evidence.state],
      ["Valid", evidence.valid],
      ["Handoff ready", evidence.handoffReady],
      ["Evidence digest", formatMarkdownDigest(evidence.evidenceDigest)],
      ["Completion digest", formatMarkdownDigest(evidence.completionDigest)],
      ["Verified completion digest", formatMarkdownDigest(evidence.verifiedCompletionDigest)],
      ["Closure digest", formatMarkdownDigest(evidence.closureDigest)],
      ["Verified closure digest", formatMarkdownDigest(evidence.verifiedClosureDigest)],
      ["Covered fields", evidence.evidenceDigest.coveredFields.join(", ")],
    ],
    sections: [
      ["Decision", decisionLines(evidence.decision)],
      ["Verification", renderMarkdownFields([
        ["Completion verified", evidence.verification.completionVerified],
        ["Completion digest valid", evidence.verification.completionDigestValid],
        ["Completion steps valid", evidence.verification.completionStepsValid],
        ["Closure reference valid", evidence.verification.closureReferenceValid],
        ["Closeout ready", evidence.verification.closeoutReady],
        ["Completion step count", evidence.verification.completionStepCount],
        ["Evidence item count", evidence.verification.evidenceItemCount],
      ])],
      ["Evidence Items", detailItemLines(evidence.evidenceItems)],
      ["Next Actions", renderMarkdownBullets(evidence.nextActions)],
    ],
  };
}

export function releaseEvidenceCheckSpec(
  verification: OpsPromotionReleaseEvidenceVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion release evidence verification",
    fields: [
      ["Service", verification.service],
      ["Generated at", verification.generatedAt],
      ["Evidence name", verification.evidenceName],
      ["Completion name", verification.completionName],
      ["Closure name", verification.closureName],
      ["Receipt name", verification.receiptName],
      ["Certificate name", verification.certificateName],
      ["Package name", verification.packageName],
      ["Archive name", verification.archiveName],
      ["State", verification.state],
      ["Handoff ready", verification.handoffReady],
      ["Valid", verification.valid],
      ["Evidence digest", formatMarkdownDigest(verification.evidenceDigest)],
      ["Recomputed evidence digest", formatMarkdownDigest(verification.recomputedEvidenceDigest)],
    ],
    sections: [
      ["Checks", renderMarkdownFields([
        ["Evidence digest valid", verification.checks.evidenceDigestValid],
        ["Covered fields match", verification.checks.coveredFieldsMatch],
        ["Evidence items valid", verification.checks.evidenceItemsValid],
        ["Evidence name matches", verification.checks.evidenceNameMatches],
        ["Completion name matches", verification.checks.completionNameMatches],
        ["Closure name matches", verification.checks.closureNameMatches],
        ["Receipt name matches", verification.checks.receiptNameMatches],
        ["Certificate name matches", verification.checks.certificateNameMatches],
        ["Package name matches", verification.checks.packageNameMatches],
        ["Archive name matches", verification.checks.archiveNameMatches],
        ["Valid matches", verification.checks.validMatches],
        ["State matches", verification.checks.stateMatches],
        ["Handoff ready matches", verification.checks.handoffReadyMatches],
        ["Completion digest matches", verification.checks.completionDigestMatches],
        ["Verified completion digest matches", verification.checks.verifiedCompletionDigestMatches],
        ["Closure digest matches", verification.checks.closureDigestMatches],
        ["Verified closure digest matches", verification.checks.verifiedClosureDigestMatches],
        ["Decision matches", verification.checks.decisionMatches],
        ["Verification matches", verification.checks.verificationMatches],
        ["Next actions match", verification.checks.nextActionsMatch],
      ])],
      ["Evidence Items", checkedDetailLines(
        verification.evidenceItems,
        "Evidence digest",
        (item) => item.evidenceDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Evidence item count", verification.summary.evidenceItemCount],
        ["Handoff ready", verification.summary.handoffReady],
        ["Closeout ready", verification.summary.closeoutReady],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function releaseArchiveSpec(
  archive: OpsPromotionReleaseArchive,
): MarkdownDocumentSpec {
  return {
    title: "Promotion release archive",
    fields: [
      ["Service", archive.service],
      ["Generated at", archive.generatedAt],
      ["Release archive name", archive.releaseArchiveName],
      ["Evidence name", archive.evidenceName],
      ["Completion name", archive.completionName],
      ["Closure name", archive.closureName],
      ["Receipt name", archive.receiptName],
      ["Certificate name", archive.certificateName],
      ["Package name", archive.packageName],
      ["Archive name", archive.archiveName],
      ["State", archive.state],
      ["Valid", archive.valid],
      ["Handoff ready", archive.handoffReady],
      ["Release archive digest", formatMarkdownDigest(archive.releaseArchiveDigest)],
      ["Evidence digest", formatMarkdownDigest(archive.evidenceDigest)],
      ["Verified evidence digest", formatMarkdownDigest(archive.verifiedEvidenceDigest)],
      ["Completion digest", formatMarkdownDigest(archive.completionDigest)],
      ["Closure digest", formatMarkdownDigest(archive.closureDigest)],
      ["Covered fields", archive.releaseArchiveDigest.coveredFields.join(", ")],
    ],
    sections: [
      ["Decision", decisionLines(archive.decision)],
      ["Verification", renderMarkdownFields([
        ["Evidence verified", archive.verification.evidenceVerified],
        ["Evidence digest valid", archive.verification.evidenceDigestValid],
        ["Evidence items valid", archive.verification.evidenceItemsValid],
        ["Evidence reference valid", archive.verification.evidenceReferenceValid],
        ["Closeout ready", archive.verification.closeoutReady],
        ["Evidence item count", archive.verification.evidenceItemCount],
        ["Archive item count", archive.verification.archiveItemCount],
      ])],
      ["Archive Items", detailItemLines(archive.archiveItems)],
      ["Next Actions", renderMarkdownBullets(archive.nextActions)],
    ],
  };
}

export function releaseArchiveCheckSpec(
  verification: OpsPromotionReleaseArchiveVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion release archive verification",
    fields: [
      ["Service", verification.service],
      ["Generated at", verification.generatedAt],
      ["Release archive name", verification.releaseArchiveName],
      ["Evidence name", verification.evidenceName],
      ["Completion name", verification.completionName],
      ["Closure name", verification.closureName],
      ["Receipt name", verification.receiptName],
      ["Certificate name", verification.certificateName],
      ["Package name", verification.packageName],
      ["Archive name", verification.archiveName],
      ["State", verification.state],
      ["Handoff ready", verification.handoffReady],
      ["Valid", verification.valid],
      ["Release archive digest", formatMarkdownDigest(verification.releaseArchiveDigest)],
      ["Recomputed release archive digest", formatMarkdownDigest(verification.recomputedReleaseArchiveDigest)],
    ],
    sections: [
      ["Checks", renderMarkdownFields([
        ["Release archive digest valid", verification.checks.releaseArchiveDigestValid],
        ["Covered fields match", verification.checks.coveredFieldsMatch],
        ["Archive items valid", verification.checks.archiveItemsValid],
        ["Release archive name matches", verification.checks.releaseArchiveNameMatches],
        ["Evidence name matches", verification.checks.evidenceNameMatches],
        ["Completion name matches", verification.checks.completionNameMatches],
        ["Closure name matches", verification.checks.closureNameMatches],
        ["Receipt name matches", verification.checks.receiptNameMatches],
        ["Certificate name matches", verification.checks.certificateNameMatches],
        ["Package name matches", verification.checks.packageNameMatches],
        ["Archive name matches", verification.checks.archiveNameMatches],
        ["Valid matches", verification.checks.validMatches],
        ["State matches", verification.checks.stateMatches],
        ["Handoff ready matches", verification.checks.handoffReadyMatches],
        ["Evidence digest matches", verification.checks.evidenceDigestMatches],
        ["Verified evidence digest matches", verification.checks.verifiedEvidenceDigestMatches],
        ["Completion digest matches", verification.checks.completionDigestMatches],
        ["Closure digest matches", verification.checks.closureDigestMatches],
        ["Decision matches", verification.checks.decisionMatches],
        ["Verification matches", verification.checks.verificationMatches],
        ["Next actions match", verification.checks.nextActionsMatch],
      ])],
      ["Archive Items", checkedDetailLines(
        verification.archiveItems,
        "Release archive digest",
        (item) => item.releaseArchiveDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Archive item count", verification.summary.archiveItemCount],
        ["Handoff ready", verification.summary.handoffReady],
        ["Closeout ready", verification.summary.closeoutReady],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}
