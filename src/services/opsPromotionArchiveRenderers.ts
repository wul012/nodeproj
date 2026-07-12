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
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerification,
} from "./opsPromotionArchiveBundleTypes.js";
import {
  formatMarkdownDigest,
  optionalMarkdownValue,
  renderMarkdownBullets,
  renderMarkdownDocument,
  renderMarkdownFields,
  renderMarkdownItems,
  type MarkdownDigest,
} from "./promotionMarkdownEngine.js";

export function renderOpsPromotionArchiveMarkdown(bundle: OpsPromotionArchiveBundle): string {
  return renderMarkdownDocument("Promotion archive bundle", [
    ["Service", bundle.service],
    ["Generated at", bundle.generatedAt],
    ["Archive name", bundle.archiveName],
    ["State", bundle.state],
    ["Total decisions", bundle.summary.totalDecisions],
    ["Integrity valid", bundle.summary.integrityValid],
    ["Integrity root digest", `sha256:${bundle.summary.integrityRootDigest}`],
    ["Sequence order", bundle.summary.sequenceOrder],
  ], [
    ["Latest Decision Evidence", renderLatestEvidence(bundle.latestEvidence)],
    ["Ledger Integrity", renderMarkdownFields([
      ["Root digest", formatMarkdownDigest(bundle.integrity.rootDigest)],
      ["Decision digests valid", bundle.integrity.checks.digestsValid],
      ["Sequences contiguous", bundle.integrity.checks.sequencesContiguous],
      ["Sequence order", bundle.integrity.checks.sequenceOrder],
    ])],
    ["Next Actions", renderMarkdownBullets(bundle.nextActions)],
  ]);
}

export function renderOpsPromotionArchiveAttestationVerificationMarkdown(
  verification: OpsPromotionArchiveAttestationVerification,
): string {
  return renderMarkdownDocument("Promotion archive attestation verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Seal digest", formatMarkdownDigest(verification.sealDigest)],
    ["Recomputed seal digest", formatMarkdownDigest(verification.recomputedSealDigest)],
    ["Verification digest", formatMarkdownDigest(verification.verificationDigest)],
    ["Recomputed verification digest", formatMarkdownDigest(verification.recomputedVerificationDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Seal digest valid", verification.checks.sealDigestValid],
      ["Verification digest valid", verification.checks.verificationDigestValid],
      ["Manifest digest matches", verification.checks.manifestDigestMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Decision matches", verification.checks.decisionMatches],
      ["Checks match", verification.checks.checksMatch],
      ["Evidence sources match", verification.checks.evidenceSourcesMatch],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Evidence source count", verification.summary.evidenceSourceCount],
      ["Handoff ready", verification.summary.handoffReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionArchiveAttestationMarkdown(
  attestation: OpsPromotionArchiveAttestation,
): string {
  return renderMarkdownDocument("Promotion archive attestation", [
    ["Service", attestation.service],
    ["Generated at", attestation.generatedAt],
    ["Title", attestation.title],
    ["Archive name", attestation.archiveName],
    ["State", attestation.state],
    ["Handoff ready", attestation.handoffReady],
    ["Manifest digest", formatMarkdownDigest(attestation.manifestDigest)],
    ["Verification digest", formatMarkdownDigest(attestation.verificationDigest)],
    ["Seal digest", formatMarkdownDigest(attestation.sealDigest)],
    ["Covered fields", attestation.sealDigest.coveredFields.join(", ")],
  ], [
    ["Decision", renderMarkdownFields([
      ["Total decisions", attestation.decision.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(attestation.decision.latestDecisionId)],
      ["Latest sequence", optionalMarkdownValue(attestation.decision.latestSequence)],
      ["Latest outcome", optionalMarkdownValue(attestation.decision.latestOutcome)],
      ["Latest ready for promotion", optionalMarkdownValue(attestation.decision.latestReadyForPromotion)],
      ["Latest digest valid", optionalMarkdownValue(attestation.decision.latestDigestValid)],
    ])],
    ["Checks", renderMarkdownFields([
      ["Manifest verified", attestation.checks.manifestVerified],
      ["Artifacts verified", attestation.checks.artifactsVerified],
      ["Archive ready", attestation.checks.archiveReady],
      ["Latest decision ready", attestation.checks.latestDecisionReady],
      ["Integrity verified", attestation.checks.integrityVerified],
    ])],
    ["Evidence Sources", renderAttestationSources(attestation.evidenceSources)],
    ["Next Actions", renderMarkdownBullets(attestation.nextActions)],
  ]);
}

export function renderOpsPromotionArchiveVerificationMarkdown(
  verification: OpsPromotionArchiveVerification,
): string {
  return renderMarkdownDocument("Promotion archive verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Valid", verification.valid],
    ["Manifest digest", formatMarkdownDigest(verification.manifestDigest)],
    ["Recomputed manifest digest", formatMarkdownDigest(verification.recomputedManifestDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Manifest digest valid", verification.checks.manifestDigestValid],
      ["Artifacts valid", verification.checks.artifactsValid],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["State matches", verification.checks.stateMatches],
      ["Summary matches", verification.checks.summaryMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Artifacts", renderVerificationArtifacts(verification.artifacts)],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionArchiveManifestMarkdown(manifest: OpsPromotionArchiveManifest): string {
  return renderMarkdownDocument("Promotion archive manifest", [
    ["Service", manifest.service],
    ["Generated at", manifest.generatedAt],
    ["Archive name", manifest.archiveName],
    ["State", manifest.state],
    ["Manifest digest", formatMarkdownDigest(manifest.manifestDigest)],
    ["Covered fields", manifest.manifestDigest.coveredFields.join(", ")],
  ], [
    ["Summary", renderMarkdownFields([
      ["Total decisions", manifest.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(manifest.summary.latestDecisionId)],
      ["Latest sequence", optionalMarkdownValue(manifest.summary.latestSequence)],
      ["Latest outcome", optionalMarkdownValue(manifest.summary.latestOutcome)],
      ["Latest digest valid", optionalMarkdownValue(manifest.summary.latestDigestValid)],
      ["Integrity valid", manifest.summary.integrityValid],
      ["Integrity root digest", `sha256:${manifest.summary.integrityRootDigest}`],
      ["Sequence order", manifest.summary.sequenceOrder],
    ])],
    ["Artifacts", renderManifestArtifacts(manifest.artifacts)],
    ["Next Actions", renderMarkdownBullets(manifest.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffCertificateMarkdown(
  certificate: OpsPromotionHandoffCertificate,
): string {
  return renderMarkdownDocument("Promotion handoff certificate", [
    ["Service", certificate.service],
    ["Generated at", certificate.generatedAt],
    ["Certificate name", certificate.certificateName],
    ["Package name", certificate.packageName],
    ["Archive name", certificate.archiveName],
    ["State", certificate.state],
    ["Valid", certificate.valid],
    ["Handoff ready", certificate.handoffReady],
    ["Certificate digest", formatMarkdownDigest(certificate.certificateDigest)],
    ["Package digest", formatMarkdownDigest(certificate.packageDigest)],
    ["Verified package digest", formatMarkdownDigest(certificate.verifiedPackageDigest)],
    ["Seal digest", formatMarkdownDigest(certificate.sealDigest)],
    ["Covered fields", certificate.certificateDigest.coveredFields.join(", ")],
  ], [
    ["Decision", renderMarkdownFields([
      ["Total decisions", certificate.decision.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(certificate.decision.latestDecisionId)],
      ["Latest outcome", optionalMarkdownValue(certificate.decision.latestOutcome)],
    ])],
    ["Verification", renderMarkdownFields([
      ["Package verified", certificate.verification.packageVerified],
      ["Package digest valid", certificate.verification.packageDigestValid],
      ["Attachments valid", certificate.verification.attachmentsValid],
      ["Attachment count", certificate.verification.attachmentCount],
    ])],
    ["Attachments", renderSimpleItems(certificate.attachments)],
    ["Next Actions", renderMarkdownBullets(certificate.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffCertificateVerificationMarkdown(
  verification: OpsPromotionHandoffCertificateVerification,
): string {
  return renderMarkdownDocument("Promotion handoff certificate verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Certificate name", verification.certificateName],
    ["Package name", verification.packageName],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Certificate digest", formatMarkdownDigest(verification.certificateDigest)],
    ["Recomputed certificate digest", formatMarkdownDigest(verification.recomputedCertificateDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Certificate digest valid", verification.checks.certificateDigestValid],
      ["Covered fields match", verification.checks.coveredFieldsMatch],
      ["Attachments valid", verification.checks.attachmentsValid],
      ["Certificate name matches", verification.checks.certificateNameMatches],
      ["Package name matches", verification.checks.packageNameMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["Valid matches", verification.checks.validMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Package digest matches", verification.checks.packageDigestMatches],
      ["Verified package digest matches", verification.checks.verifiedPackageDigestMatches],
      ["Seal digest matches", verification.checks.sealDigestMatches],
      ["Decision matches", verification.checks.decisionMatches],
      ["Verification matches", verification.checks.verificationMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Attachments", renderCheckedItems(
      verification.attachments,
      "Certificate digest",
      (item) => item.certificateDigest,
    )],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Attachment count", verification.summary.attachmentCount],
      ["Handoff ready", verification.summary.handoffReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffReceiptMarkdown(receipt: OpsPromotionHandoffReceipt): string {
  return renderMarkdownDocument("Promotion handoff receipt", [
    ["Service", receipt.service],
    ["Generated at", receipt.generatedAt],
    ["Receipt name", receipt.receiptName],
    ["Certificate name", receipt.certificateName],
    ["Package name", receipt.packageName],
    ["Archive name", receipt.archiveName],
    ["State", receipt.state],
    ["Valid", receipt.valid],
    ["Handoff ready", receipt.handoffReady],
    ["Receipt digest", formatMarkdownDigest(receipt.receiptDigest)],
    ["Certificate digest", formatMarkdownDigest(receipt.certificateDigest)],
    ["Verified certificate digest", formatMarkdownDigest(receipt.verifiedCertificateDigest)],
    ["Package digest", formatMarkdownDigest(receipt.packageDigest)],
    ["Verified package digest", formatMarkdownDigest(receipt.verifiedPackageDigest)],
    ["Seal digest", formatMarkdownDigest(receipt.sealDigest)],
    ["Covered fields", receipt.receiptDigest.coveredFields.join(", ")],
  ], [
    ["Decision", renderMarkdownFields([
      ["Total decisions", receipt.decision.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(receipt.decision.latestDecisionId)],
      ["Latest outcome", optionalMarkdownValue(receipt.decision.latestOutcome)],
    ])],
    ["Verification", renderMarkdownFields([
      ["Certificate verified", receipt.verification.certificateVerified],
      ["Certificate digest valid", receipt.verification.certificateDigestValid],
      ["Package reference valid", receipt.verification.packageReferenceValid],
      ["Seal reference valid", receipt.verification.sealReferenceValid],
      ["Attachments valid", receipt.verification.attachmentsValid],
      ["Milestone count", receipt.verification.milestoneCount],
      ["Attachment count", receipt.verification.attachmentCount],
    ])],
    ["Milestones", renderSimpleItems(receipt.milestones)],
    ["Next Actions", renderMarkdownBullets(receipt.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffReceiptVerificationMarkdown(
  verification: OpsPromotionHandoffReceiptVerification,
): string {
  return renderMarkdownDocument("Promotion handoff receipt verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Receipt name", verification.receiptName],
    ["Certificate name", verification.certificateName],
    ["Package name", verification.packageName],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Receipt digest", formatMarkdownDigest(verification.receiptDigest)],
    ["Recomputed receipt digest", formatMarkdownDigest(verification.recomputedReceiptDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Receipt digest valid", verification.checks.receiptDigestValid],
      ["Covered fields match", verification.checks.coveredFieldsMatch],
      ["Milestones valid", verification.checks.milestonesValid],
      ["Receipt name matches", verification.checks.receiptNameMatches],
      ["Certificate name matches", verification.checks.certificateNameMatches],
      ["Package name matches", verification.checks.packageNameMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["Valid matches", verification.checks.validMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Certificate digest matches", verification.checks.certificateDigestMatches],
      ["Verified certificate digest matches", verification.checks.verifiedCertificateDigestMatches],
      ["Package digest matches", verification.checks.packageDigestMatches],
      ["Verified package digest matches", verification.checks.verifiedPackageDigestMatches],
      ["Seal digest matches", verification.checks.sealDigestMatches],
      ["Decision matches", verification.checks.decisionMatches],
      ["Verification matches", verification.checks.verificationMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Milestones", renderCheckedItems(
      verification.milestones,
      "Receipt digest",
      (item) => item.receiptDigest,
    )],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Milestone count", verification.summary.milestoneCount],
      ["Handoff ready", verification.summary.handoffReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffClosureMarkdown(closure: OpsPromotionHandoffClosure): string {
  return renderMarkdownDocument("Promotion handoff closure", [
    ["Service", closure.service],
    ["Generated at", closure.generatedAt],
    ["Closure name", closure.closureName],
    ["Receipt name", closure.receiptName],
    ["Certificate name", closure.certificateName],
    ["Package name", closure.packageName],
    ["Archive name", closure.archiveName],
    ["State", closure.state],
    ["Valid", closure.valid],
    ["Handoff ready", closure.handoffReady],
    ["Closure digest", formatMarkdownDigest(closure.closureDigest)],
    ["Receipt digest", formatMarkdownDigest(closure.receiptDigest)],
    ["Verified receipt digest", formatMarkdownDigest(closure.verifiedReceiptDigest)],
    ["Certificate digest", formatMarkdownDigest(closure.certificateDigest)],
    ["Verified certificate digest", formatMarkdownDigest(closure.verifiedCertificateDigest)],
    ["Package digest", formatMarkdownDigest(closure.packageDigest)],
    ["Verified package digest", formatMarkdownDigest(closure.verifiedPackageDigest)],
    ["Seal digest", formatMarkdownDigest(closure.sealDigest)],
    ["Covered fields", closure.closureDigest.coveredFields.join(", ")],
  ], [
    ["Decision", renderMarkdownFields([
      ["Total decisions", closure.decision.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(closure.decision.latestDecisionId)],
      ["Latest outcome", optionalMarkdownValue(closure.decision.latestOutcome)],
    ])],
    ["Verification", renderMarkdownFields([
      ["Receipt verified", closure.verification.receiptVerified],
      ["Receipt digest valid", closure.verification.receiptDigestValid],
      ["Milestone references valid", closure.verification.milestoneReferencesValid],
      ["Certificate reference valid", closure.verification.certificateReferenceValid],
      ["Package reference valid", closure.verification.packageReferenceValid],
      ["Seal reference valid", closure.verification.sealReferenceValid],
      ["Milestone count", closure.verification.milestoneCount],
      ["Closure item count", closure.verification.closureItemCount],
    ])],
    ["Closure Items", renderSimpleItems(closure.closureItems)],
    ["Next Actions", renderMarkdownBullets(closure.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffClosureVerificationMarkdown(
  verification: OpsPromotionHandoffClosureVerification,
): string {
  return renderMarkdownDocument("Promotion handoff closure verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Closure name", verification.closureName],
    ["Receipt name", verification.receiptName],
    ["Certificate name", verification.certificateName],
    ["Package name", verification.packageName],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Closure digest", formatMarkdownDigest(verification.closureDigest)],
    ["Recomputed closure digest", formatMarkdownDigest(verification.recomputedClosureDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Closure digest valid", verification.checks.closureDigestValid],
      ["Covered fields match", verification.checks.coveredFieldsMatch],
      ["Closure items valid", verification.checks.closureItemsValid],
      ["Closure name matches", verification.checks.closureNameMatches],
      ["Receipt name matches", verification.checks.receiptNameMatches],
      ["Certificate name matches", verification.checks.certificateNameMatches],
      ["Package name matches", verification.checks.packageNameMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["Valid matches", verification.checks.validMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Receipt digest matches", verification.checks.receiptDigestMatches],
      ["Verified receipt digest matches", verification.checks.verifiedReceiptDigestMatches],
      ["Certificate digest matches", verification.checks.certificateDigestMatches],
      ["Verified certificate digest matches", verification.checks.verifiedCertificateDigestMatches],
      ["Package digest matches", verification.checks.packageDigestMatches],
      ["Verified package digest matches", verification.checks.verifiedPackageDigestMatches],
      ["Seal digest matches", verification.checks.sealDigestMatches],
      ["Decision matches", verification.checks.decisionMatches],
      ["Verification matches", verification.checks.verificationMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Closure Items", renderCheckedItems(
      verification.closureItems,
      "Closure digest",
      (item) => item.closureDigest,
    )],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Closure item count", verification.summary.closureItemCount],
      ["Handoff ready", verification.summary.handoffReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffCompletionMarkdown(
  completion: OpsPromotionHandoffCompletion,
): string {
  return renderMarkdownDocument("Promotion handoff completion", [
    ["Service", completion.service],
    ["Generated at", completion.generatedAt],
    ["Completion name", completion.completionName],
    ["Closure name", completion.closureName],
    ["Receipt name", completion.receiptName],
    ["Certificate name", completion.certificateName],
    ["Package name", completion.packageName],
    ["Archive name", completion.archiveName],
    ["State", completion.state],
    ["Valid", completion.valid],
    ["Handoff ready", completion.handoffReady],
    ["Completion digest", formatMarkdownDigest(completion.completionDigest)],
    ["Closure digest", formatMarkdownDigest(completion.closureDigest)],
    ["Verified closure digest", formatMarkdownDigest(completion.verifiedClosureDigest)],
    ["Covered fields", completion.completionDigest.coveredFields.join(", ")],
  ], [
    ["Decision", renderMarkdownFields([
      ["Total decisions", completion.decision.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(completion.decision.latestDecisionId)],
      ["Latest outcome", optionalMarkdownValue(completion.decision.latestOutcome)],
    ])],
    ["Verification", renderMarkdownFields([
      ["Closure verified", completion.verification.closureVerified],
      ["Closure digest valid", completion.verification.closureDigestValid],
      ["Closure items valid", completion.verification.closureItemsValid],
      ["Reference checks valid", completion.verification.referenceChecksValid],
      ["Closeout ready", completion.verification.closeoutReady],
      ["Closure item count", completion.verification.closureItemCount],
      ["Completion step count", completion.verification.completionStepCount],
    ])],
    ["Completion Steps", renderCompletionSteps(completion.completionSteps)],
    ["Next Actions", renderMarkdownBullets(completion.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffCompletionVerificationMarkdown(
  verification: OpsPromotionHandoffCompletionVerification,
): string {
  return renderMarkdownDocument("Promotion handoff completion verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Completion name", verification.completionName],
    ["Closure name", verification.closureName],
    ["Receipt name", verification.receiptName],
    ["Certificate name", verification.certificateName],
    ["Package name", verification.packageName],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Completion digest", formatMarkdownDigest(verification.completionDigest)],
    ["Recomputed completion digest", formatMarkdownDigest(verification.recomputedCompletionDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Completion digest valid", verification.checks.completionDigestValid],
      ["Covered fields match", verification.checks.coveredFieldsMatch],
      ["Completion steps valid", verification.checks.completionStepsValid],
      ["Completion name matches", verification.checks.completionNameMatches],
      ["Closure name matches", verification.checks.closureNameMatches],
      ["Receipt name matches", verification.checks.receiptNameMatches],
      ["Certificate name matches", verification.checks.certificateNameMatches],
      ["Package name matches", verification.checks.packageNameMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["Valid matches", verification.checks.validMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Closure digest matches", verification.checks.closureDigestMatches],
      ["Verified closure digest matches", verification.checks.verifiedClosureDigestMatches],
      ["Decision matches", verification.checks.decisionMatches],
      ["Verification matches", verification.checks.verificationMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Completion Steps", renderCheckedSteps(verification.completionSteps)],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Completion step count", verification.summary.completionStepCount],
      ["Handoff ready", verification.summary.handoffReady],
      ["Closeout ready", verification.summary.closeoutReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffPackageVerificationMarkdown(
  verification: OpsPromotionHandoffPackageVerification,
): string {
  return renderMarkdownDocument("Promotion handoff package verification", [
    ["Service", verification.service],
    ["Generated at", verification.generatedAt],
    ["Package name", verification.packageName],
    ["Archive name", verification.archiveName],
    ["State", verification.state],
    ["Handoff ready", verification.handoffReady],
    ["Valid", verification.valid],
    ["Package digest", formatMarkdownDigest(verification.packageDigest)],
    ["Recomputed package digest", formatMarkdownDigest(verification.recomputedPackageDigest)],
  ], [
    ["Checks", renderMarkdownFields([
      ["Package digest valid", verification.checks.packageDigestValid],
      ["Attachments valid", verification.checks.attachmentsValid],
      ["Package name matches", verification.checks.packageNameMatches],
      ["Archive name matches", verification.checks.archiveNameMatches],
      ["Valid matches", verification.checks.validMatches],
      ["State matches", verification.checks.stateMatches],
      ["Handoff ready matches", verification.checks.handoffReadyMatches],
      ["Seal digest matches", verification.checks.sealDigestMatches],
      ["Manifest digest matches", verification.checks.manifestDigestMatches],
      ["Verification digest matches", verification.checks.verificationDigestMatches],
      ["Summary matches", verification.checks.summaryMatches],
      ["Next actions match", verification.checks.nextActionsMatch],
    ])],
    ["Attachments", renderCheckedItems(
      verification.attachments,
      "Package digest",
      (item) => item.packageDigest,
    )],
    ["Summary", renderMarkdownFields([
      ["Total decisions", verification.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(verification.summary.latestDecisionId)],
      ["Attachment count", verification.summary.attachmentCount],
      ["Handoff ready", verification.summary.handoffReady],
    ])],
    ["Next Actions", renderMarkdownBullets(verification.nextActions)],
  ]);
}

export function renderOpsPromotionHandoffPackageMarkdown(pkg: OpsPromotionHandoffPackage): string {
  return renderMarkdownDocument("Promotion handoff package", [
    ["Service", pkg.service],
    ["Generated at", pkg.generatedAt],
    ["Package name", pkg.packageName],
    ["Archive name", pkg.archiveName],
    ["State", pkg.state],
    ["Valid", pkg.valid],
    ["Handoff ready", pkg.handoffReady],
    ["Package digest", formatMarkdownDigest(pkg.packageDigest)],
    ["Seal digest", formatMarkdownDigest(pkg.sealDigest)],
    ["Manifest digest", formatMarkdownDigest(pkg.manifestDigest)],
    ["Verification digest", formatMarkdownDigest(pkg.verificationDigest)],
    ["Covered fields", pkg.packageDigest.coveredFields.join(", ")],
  ], [
    ["Summary", renderMarkdownFields([
      ["Total decisions", pkg.summary.totalDecisions],
      ["Latest decision id", optionalMarkdownValue(pkg.summary.latestDecisionId)],
      ["Latest outcome", optionalMarkdownValue(pkg.summary.latestOutcome)],
      ["Evidence source count", pkg.summary.evidenceSourceCount],
      ["Attachment count", pkg.summary.attachmentCount],
    ])],
    ["Attachments", renderSimpleItems(pkg.attachments)],
    ["Next Actions", renderMarkdownBullets(pkg.nextActions)],
  ]);
}

interface SimpleEvidenceItem {
  name: string;
  valid: boolean;
  digest: MarkdownDigest;
  source: string;
}

interface CheckedEvidenceItem {
  name: string;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  recomputedDigest: MarkdownDigest;
  source: string;
}

interface CompletionStep extends SimpleEvidenceItem {
  ready: boolean;
  detail: string;
}

interface CheckedCompletionStep extends CheckedEvidenceItem {
  readyMatches: boolean;
  detailMatches: boolean;
  completionDigest: MarkdownDigest;
  detail: string;
}

function renderLatestEvidence(evidence: OpsPromotionEvidenceReport | undefined): string[] {
  if (evidence === undefined) {
    return ["- No promotion decision evidence is available yet."];
  }
  return renderMarkdownFields([
    ["Decision id", evidence.decisionId],
    ["Sequence", evidence.sequence],
    ["Verdict", evidence.verdict],
    ["Outcome", evidence.summary.outcome],
    ["Ready for promotion", evidence.summary.readyForPromotion],
    ["Digest valid", evidence.summary.digestValid],
    ["Digest", `${evidence.summary.digestAlgorithm}:${evidence.summary.digest}`],
    ["Readiness", evidence.summary.readinessState],
    ["Runbook", evidence.summary.runbookState],
    ["Baseline", evidence.summary.baselineState],
  ]);
}

function renderManifestArtifacts(artifacts: OpsPromotionArchiveManifestArtifact[]): string[] {
  return renderMarkdownItems(artifacts, (artifact) => [
    ["Type", artifact.type],
    ["Present", artifact.present],
    ["Digest", formatMarkdownDigest(artifact.digest)],
    ["Source", artifact.source],
  ]);
}

function renderVerificationArtifacts(artifacts: OpsPromotionArchiveVerificationArtifact[]): string[] {
  return renderMarkdownItems(artifacts, (artifact) => [
    ["Type", artifact.type],
    ["Valid", artifact.valid],
    ["Present matches", artifact.presentMatches],
    ["Source matches", artifact.sourceMatches],
    ["Digest matches", artifact.digestMatches],
    ["Manifest digest", formatMarkdownDigest(artifact.manifestDigest)],
    ["Recomputed digest", formatMarkdownDigest(artifact.recomputedDigest)],
    ["Source", artifact.source],
  ]);
}

function renderAttestationSources(sources: OpsPromotionArchiveAttestationEvidenceSource[]): string[] {
  return renderMarkdownItems(sources, (source) => [
    ["Type", source.type],
    ["Present", source.present],
    ["Verified", source.verified],
    ["Digest", formatMarkdownDigest(source.digest)],
    ["Source", source.source],
  ]);
}

function renderSimpleItems(items: readonly SimpleEvidenceItem[]): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Digest", formatMarkdownDigest(item.digest)],
    ["Source", item.source],
  ]);
}

function renderCheckedItems<T extends CheckedEvidenceItem>(
  items: readonly T[],
  digestLabel: string,
  digest: (item: T) => MarkdownDigest,
): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Valid matches", item.validMatches],
    ["Source matches", item.sourceMatches],
    ["Digest matches", item.digestMatches],
    [digestLabel, formatMarkdownDigest(digest(item))],
    ["Recomputed digest", formatMarkdownDigest(item.recomputedDigest)],
    ["Source", item.source],
  ]);
}

function renderCompletionSteps(steps: readonly CompletionStep[]): string[] {
  return renderMarkdownItems(steps, (step) => [
    ["Valid", step.valid],
    ["Ready", step.ready],
    ["Digest", formatMarkdownDigest(step.digest)],
    ["Source", step.source],
    ["Detail", step.detail],
  ]);
}

function renderCheckedSteps(steps: readonly CheckedCompletionStep[]): string[] {
  return renderMarkdownItems(steps, (step) => [
    ["Valid", step.valid],
    ["Valid matches", step.validMatches],
    ["Ready matches", step.readyMatches],
    ["Source matches", step.sourceMatches],
    ["Detail matches", step.detailMatches],
    ["Digest matches", step.digestMatches],
    ["Completion digest", formatMarkdownDigest(step.completionDigest)],
    ["Recomputed digest", formatMarkdownDigest(step.recomputedDigest)],
    ["Source", step.source],
    ["Detail", step.detail],
  ]);
}

export {
  renderOpsPromotionDeploymentApprovalMarkdown,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  renderOpsPromotionDeploymentChangeRecordMarkdown,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionRecordMarkdown,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  renderOpsPromotionReleaseArchiveMarkdown,
  renderOpsPromotionReleaseArchiveVerificationMarkdown,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  renderOpsPromotionReleaseEvidenceMarkdown,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown,
} from "./opsPromotionArchiveReleaseDeploymentRenderers.js";
