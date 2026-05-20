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



