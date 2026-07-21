import type {
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
} from "../opsPromotionArchiveBundleTypes.js";
import {
  formatMarkdownDigest,
  optionalMarkdownValue,
  renderMarkdownBullets,
  renderMarkdownFields,
  renderMarkdownItems,
  type MarkdownDigest,
  type MarkdownDocumentSpec,
} from "../promotionMarkdownEngine.js";

export function certificateSpec(
  certificate: OpsPromotionHandoffCertificate,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff certificate",
    fields: [
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
    ],
    sections: [
      ["Decision", decisionLines(certificate.decision)],
      ["Verification", renderMarkdownFields([
        ["Package verified", certificate.verification.packageVerified],
        ["Package digest valid", certificate.verification.packageDigestValid],
        ["Attachments valid", certificate.verification.attachmentsValid],
        ["Attachment count", certificate.verification.attachmentCount],
      ])],
      ["Attachments", simpleItemLines(certificate.attachments)],
      ["Next Actions", renderMarkdownBullets(certificate.nextActions)],
    ],
  };
}

export function certificateCheckSpec(
  verification: OpsPromotionHandoffCertificateVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff certificate verification",
    fields: [
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
    ],
    sections: [
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
      ["Attachments", checkedItemLines(
        verification.attachments,
        "Certificate digest",
        (item) => item.certificateDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Attachment count", verification.summary.attachmentCount],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function receiptSpec(receipt: OpsPromotionHandoffReceipt): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff receipt",
    fields: [
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
    ],
    sections: [
      ["Decision", decisionLines(receipt.decision)],
      ["Verification", renderMarkdownFields([
        ["Certificate verified", receipt.verification.certificateVerified],
        ["Certificate digest valid", receipt.verification.certificateDigestValid],
        ["Package reference valid", receipt.verification.packageReferenceValid],
        ["Seal reference valid", receipt.verification.sealReferenceValid],
        ["Attachments valid", receipt.verification.attachmentsValid],
        ["Milestone count", receipt.verification.milestoneCount],
        ["Attachment count", receipt.verification.attachmentCount],
      ])],
      ["Milestones", simpleItemLines(receipt.milestones)],
      ["Next Actions", renderMarkdownBullets(receipt.nextActions)],
    ],
  };
}

export function receiptCheckSpec(
  verification: OpsPromotionHandoffReceiptVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff receipt verification",
    fields: [
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
    ],
    sections: [
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
      ["Milestones", checkedItemLines(
        verification.milestones,
        "Receipt digest",
        (item) => item.receiptDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Milestone count", verification.summary.milestoneCount],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function closureSpec(closure: OpsPromotionHandoffClosure): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff closure",
    fields: [
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
    ],
    sections: [
      ["Decision", decisionLines(closure.decision)],
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
      ["Closure Items", simpleItemLines(closure.closureItems)],
      ["Next Actions", renderMarkdownBullets(closure.nextActions)],
    ],
  };
}

export function closureCheckSpec(
  verification: OpsPromotionHandoffClosureVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff closure verification",
    fields: [
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
    ],
    sections: [
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
      ["Closure Items", checkedItemLines(
        verification.closureItems,
        "Closure digest",
        (item) => item.closureDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Closure item count", verification.summary.closureItemCount],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function completionSpec(
  completion: OpsPromotionHandoffCompletion,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff completion",
    fields: [
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
    ],
    sections: [
      ["Decision", decisionLines(completion.decision)],
      ["Verification", renderMarkdownFields([
        ["Closure verified", completion.verification.closureVerified],
        ["Closure digest valid", completion.verification.closureDigestValid],
        ["Closure items valid", completion.verification.closureItemsValid],
        ["Reference checks valid", completion.verification.referenceChecksValid],
        ["Closeout ready", completion.verification.closeoutReady],
        ["Closure item count", completion.verification.closureItemCount],
        ["Completion step count", completion.verification.completionStepCount],
      ])],
      ["Completion Steps", completionStepLines(completion.completionSteps)],
      ["Next Actions", renderMarkdownBullets(completion.nextActions)],
    ],
  };
}

export function completionCheckSpec(
  verification: OpsPromotionHandoffCompletionVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff completion verification",
    fields: [
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
    ],
    sections: [
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
      ["Completion Steps", checkedStepLines(verification.completionSteps)],
      ["Summary", summaryLines(verification.summary, [
        ["Completion step count", verification.summary.completionStepCount],
      ], [
        ["Closeout ready", verification.summary.closeoutReady],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function packageCheckSpec(
  verification: OpsPromotionHandoffPackageVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff package verification",
    fields: [
      ["Service", verification.service],
      ["Generated at", verification.generatedAt],
      ["Package name", verification.packageName],
      ["Archive name", verification.archiveName],
      ["State", verification.state],
      ["Handoff ready", verification.handoffReady],
      ["Valid", verification.valid],
      ["Package digest", formatMarkdownDigest(verification.packageDigest)],
      ["Recomputed package digest", formatMarkdownDigest(verification.recomputedPackageDigest)],
    ],
    sections: [
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
      ["Attachments", checkedItemLines(
        verification.attachments,
        "Package digest",
        (item) => item.packageDigest,
      )],
      ["Summary", summaryLines(verification.summary, [
        ["Attachment count", verification.summary.attachmentCount],
      ])],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function packageSpec(pkg: OpsPromotionHandoffPackage): MarkdownDocumentSpec {
  return {
    title: "Promotion handoff package",
    fields: [
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
    ],
    sections: [
      ["Summary", renderMarkdownFields([
        ["Total decisions", pkg.summary.totalDecisions],
        ["Latest decision id", optionalMarkdownValue(pkg.summary.latestDecisionId)],
        ["Latest outcome", optionalMarkdownValue(pkg.summary.latestOutcome)],
        ["Evidence source count", pkg.summary.evidenceSourceCount],
        ["Attachment count", pkg.summary.attachmentCount],
      ])],
      ["Attachments", simpleItemLines(pkg.attachments)],
      ["Next Actions", renderMarkdownBullets(pkg.nextActions)],
    ],
  };
}

interface DecisionSummary {
  totalDecisions: number;
  latestDecisionId?: string;
  latestOutcome?: string;
}

interface HandoffSummary extends DecisionSummary {
  handoffReady: boolean;
}

interface SimpleItem {
  name: string;
  valid: boolean;
  digest: MarkdownDigest;
  source: string;
}

interface CheckedItem {
  name: string;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  recomputedDigest: MarkdownDigest;
  source: string;
}

interface CompletionStep extends SimpleItem {
  ready: boolean;
  detail: string;
}

interface CheckedStep extends CheckedItem {
  readyMatches: boolean;
  detailMatches: boolean;
  completionDigest: MarkdownDigest;
  detail: string;
}

function decisionLines(decision: DecisionSummary): string[] {
  return renderMarkdownFields([
    ["Total decisions", decision.totalDecisions],
    ["Latest decision id", optionalMarkdownValue(decision.latestDecisionId)],
    ["Latest outcome", optionalMarkdownValue(decision.latestOutcome)],
  ]);
}

function summaryLines(
  summary: HandoffSummary,
  fields: readonly (readonly [string, unknown])[],
  tail: readonly (readonly [string, unknown])[] = [],
): string[] {
  return renderMarkdownFields([
    ["Total decisions", summary.totalDecisions],
    ["Latest decision id", optionalMarkdownValue(summary.latestDecisionId)],
    ...fields,
    ["Handoff ready", summary.handoffReady],
    ...tail,
  ]);
}

function simpleItemLines(items: readonly SimpleItem[]): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Digest", formatMarkdownDigest(item.digest)],
    ["Source", item.source],
  ]);
}

function checkedItemLines<T extends CheckedItem>(
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

function completionStepLines(steps: readonly CompletionStep[]): string[] {
  return renderMarkdownItems(steps, (step) => [
    ["Valid", step.valid],
    ["Ready", step.ready],
    ["Digest", formatMarkdownDigest(step.digest)],
    ["Source", step.source],
    ["Detail", step.detail],
  ]);
}

function checkedStepLines(steps: readonly CheckedStep[]): string[] {
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
