import type {
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifestArtifact,
  OpsPromotionArchiveVerification,
} from "./opsPromotionArchiveBundleTypes.js";

export function manifestDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveBundle["state"];
  summary: OpsPromotionArchiveBundle["summary"];
  artifacts: OpsPromotionArchiveManifestArtifact[];
  nextActions: string[];
}) {
  return {
    archiveName: input.archiveName,
    state: input.state,
    summary: input.summary,
    artifacts: input.artifacts.map((artifact) => ({
      name: artifact.name,
      type: artifact.type,
      present: artifact.present,
      digest: artifact.digest.value,
      source: artifact.source,
    })),
    nextActions: input.nextActions,
  };
}

export function archiveBundleDigestPayload(bundle: OpsPromotionArchiveBundle) {
  return {
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    latestEvidence:
      bundle.latestEvidence === undefined
        ? { present: false }
        : {
            decisionId: bundle.latestEvidence.decisionId,
            sequence: bundle.latestEvidence.sequence,
            verdict: bundle.latestEvidence.verdict,
            summary: bundle.latestEvidence.summary,
            nextActions: bundle.latestEvidence.nextActions,
          },
    integrity: {
      valid: bundle.integrity.valid,
      totalRecords: bundle.integrity.totalRecords,
      rootDigest: bundle.integrity.rootDigest.value,
      checks: bundle.integrity.checks,
    },
    nextActions: bundle.nextActions,
  };
}

export function archiveVerificationDigestPayload(verification: OpsPromotionArchiveVerification) {
  return {
    archiveName: verification.archiveName,
    valid: verification.valid,
    state: verification.state,
    manifestDigest: verification.manifestDigest.value,
    recomputedManifestDigest: verification.recomputedManifestDigest.value,
    checks: verification.checks,
    summary: verification.summary,
    artifacts: verification.artifacts.map((artifact) => ({
      name: artifact.name,
      type: artifact.type,
      valid: artifact.valid,
      presentMatches: artifact.presentMatches,
      sourceMatches: artifact.sourceMatches,
      digestMatches: artifact.digestMatches,
      manifestDigest: artifact.manifestDigest.value,
      recomputedDigest: artifact.recomputedDigest.value,
      source: artifact.source,
    })),
  };
}

export function archiveAttestationVerificationDigestPayload(
  verification: OpsPromotionArchiveAttestationVerification,
) {
  return {
    archiveName: verification.archiveName,
    valid: verification.valid,
    state: verification.state,
    handoffReady: verification.handoffReady,
    sealDigest: verification.sealDigest.value,
    recomputedSealDigest: verification.recomputedSealDigest.value,
    verificationDigest: verification.verificationDigest.value,
    recomputedVerificationDigest: verification.recomputedVerificationDigest.value,
    checks: verification.checks,
    summary: verification.summary,
    nextActions: verification.nextActions,
  };
}

export function archiveAttestationDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  manifestDigest: string;
  verificationDigest: string;
  decision: OpsPromotionArchiveAttestation["decision"];
  checks: OpsPromotionArchiveAttestation["checks"];
  evidenceSources: OpsPromotionArchiveAttestationEvidenceSource[];
  nextActions: string[];
}) {
  return {
    archiveName: input.archiveName,
    state: input.state,
    handoffReady: input.handoffReady,
    manifestDigest: input.manifestDigest,
    verificationDigest: input.verificationDigest,
    decision: input.decision,
    checks: input.checks,
    evidenceSources: input.evidenceSources.map((source) => ({
      name: source.name,
      type: source.type,
      present: source.present,
      verified: source.verified,
      source: source.source,
      digest: source.digest.value,
    })),
    nextActions: input.nextActions,
  };
}
