import type { OpsPromotionEvidenceReport } from "../opsPromotionEvidenceReport.js";
import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveManifestArtifact,
  OpsPromotionArchiveVerification,
  OpsPromotionArchiveVerificationArtifact,
} from "../opsPromotionArchiveBundleTypes.js";
import {
  formatMarkdownDigest,
  optionalMarkdownValue,
  renderMarkdownBullets,
  renderMarkdownFields,
  renderMarkdownItems,
  type MarkdownDocumentSpec,
} from "../promotionMarkdownEngine.js";

export function archiveSpec(bundle: OpsPromotionArchiveBundle): MarkdownDocumentSpec {
  return {
    title: "Promotion archive bundle",
    fields: [
      ["Service", bundle.service],
      ["Generated at", bundle.generatedAt],
      ["Archive name", bundle.archiveName],
      ["State", bundle.state],
      ["Total decisions", bundle.summary.totalDecisions],
      ["Integrity valid", bundle.summary.integrityValid],
      ["Integrity root digest", `sha256:${bundle.summary.integrityRootDigest}`],
      ["Sequence order", bundle.summary.sequenceOrder],
    ],
    sections: [
      ["Latest Decision Evidence", latestEvidenceLines(bundle.latestEvidence)],
      ["Ledger Integrity", renderMarkdownFields([
        ["Root digest", formatMarkdownDigest(bundle.integrity.rootDigest)],
        ["Decision digests valid", bundle.integrity.checks.digestsValid],
        ["Sequences contiguous", bundle.integrity.checks.sequencesContiguous],
        ["Sequence order", bundle.integrity.checks.sequenceOrder],
      ])],
      ["Next Actions", renderMarkdownBullets(bundle.nextActions)],
    ],
  };
}

export function attestationCheckSpec(
  verification: OpsPromotionArchiveAttestationVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion archive attestation verification",
    fields: [
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
    ],
    sections: [
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
    ],
  };
}

export function attestationSpec(
  attestation: OpsPromotionArchiveAttestation,
): MarkdownDocumentSpec {
  return {
    title: "Promotion archive attestation",
    fields: [
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
    ],
    sections: [
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
      ["Evidence Sources", attestationSourceLines(attestation.evidenceSources)],
      ["Next Actions", renderMarkdownBullets(attestation.nextActions)],
    ],
  };
}

export function archiveCheckSpec(
  verification: OpsPromotionArchiveVerification,
): MarkdownDocumentSpec {
  return {
    title: "Promotion archive verification",
    fields: [
      ["Service", verification.service],
      ["Generated at", verification.generatedAt],
      ["Archive name", verification.archiveName],
      ["State", verification.state],
      ["Valid", verification.valid],
      ["Manifest digest", formatMarkdownDigest(verification.manifestDigest)],
      ["Recomputed manifest digest", formatMarkdownDigest(verification.recomputedManifestDigest)],
    ],
    sections: [
      ["Checks", renderMarkdownFields([
        ["Manifest digest valid", verification.checks.manifestDigestValid],
        ["Artifacts valid", verification.checks.artifactsValid],
        ["Archive name matches", verification.checks.archiveNameMatches],
        ["State matches", verification.checks.stateMatches],
        ["Summary matches", verification.checks.summaryMatches],
        ["Next actions match", verification.checks.nextActionsMatch],
      ])],
      ["Artifacts", verificationArtifactLines(verification.artifacts)],
      ["Next Actions", renderMarkdownBullets(verification.nextActions)],
    ],
  };
}

export function manifestSpec(manifest: OpsPromotionArchiveManifest): MarkdownDocumentSpec {
  return {
    title: "Promotion archive manifest",
    fields: [
      ["Service", manifest.service],
      ["Generated at", manifest.generatedAt],
      ["Archive name", manifest.archiveName],
      ["State", manifest.state],
      ["Manifest digest", formatMarkdownDigest(manifest.manifestDigest)],
      ["Covered fields", manifest.manifestDigest.coveredFields.join(", ")],
    ],
    sections: [
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
      ["Artifacts", manifestArtifactLines(manifest.artifacts)],
      ["Next Actions", renderMarkdownBullets(manifest.nextActions)],
    ],
  };
}

function latestEvidenceLines(evidence: OpsPromotionEvidenceReport | undefined): string[] {
  if (evidence === undefined) return ["- No promotion decision evidence is available yet."];
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

function manifestArtifactLines(artifacts: OpsPromotionArchiveManifestArtifact[]): string[] {
  return renderMarkdownItems(artifacts, (artifact) => [
    ["Type", artifact.type],
    ["Present", artifact.present],
    ["Digest", formatMarkdownDigest(artifact.digest)],
    ["Source", artifact.source],
  ]);
}

function verificationArtifactLines(
  artifacts: OpsPromotionArchiveVerificationArtifact[],
): string[] {
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

function attestationSourceLines(
  sources: OpsPromotionArchiveAttestationEvidenceSource[],
): string[] {
  return renderMarkdownItems(sources, (source) => [
    ["Type", source.type],
    ["Present", source.present],
    ["Verified", source.verified],
    ["Digest", formatMarkdownDigest(source.digest)],
    ["Source", source.source],
  ]);
}
