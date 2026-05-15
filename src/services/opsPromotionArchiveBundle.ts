import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import {
  archiveAttestationDigestPayload,
  archiveAttestationVerificationDigestPayload,
  archiveVerificationDigestPayload,
  manifestDigestPayload,
} from "./opsPromotionArchiveDigestPayloads.js";
import type {
  OpsPromotionArchiveState,
  OpsPromotionArchiveArtifactType,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifestArtifact,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerificationArtifact,
  OpsPromotionArchiveVerification,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionHandoffPackageAttachmentName,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageVerificationAttachment,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerificationAttachment,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffReceiptMilestoneName,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerificationMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionHandoffClosureItemName,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerificationItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletionStepName,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionVerificationStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionReleaseEvidenceItemName,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceVerificationItem,
  OpsPromotionReleaseEvidenceVerification,
  OpsPromotionReleaseArchiveItemName,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerificationItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionDeploymentApprovalItemName,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerificationItem,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecordItemName,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerificationItem,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionRecordItemName,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerificationItem,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionDeploymentExecutionReceiptItemName,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerificationItem,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionReleaseAuditTrailRecordItemName,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseAuditTrailRecord
} from "./opsPromotionArchiveBundleTypes.js";
import { digestStable, stableJson } from "./stableDigest.js";
import {
  archiveAttestationNextActions,
  archiveAttestationVerificationNextActions,
  archiveNextActions,
  archiveState,
  archiveVerificationNextActions,
} from "./opsPromotionArchiveValidation.js";

export {
  renderOpsPromotionArchiveMarkdown,
  renderOpsPromotionHandoffCertificateMarkdown,
  renderOpsPromotionHandoffCertificateVerificationMarkdown,
  renderOpsPromotionHandoffReceiptMarkdown,
  renderOpsPromotionHandoffReceiptVerificationMarkdown,
  renderOpsPromotionHandoffClosureMarkdown,
  renderOpsPromotionHandoffClosureVerificationMarkdown,
  renderOpsPromotionHandoffCompletionMarkdown,
  renderOpsPromotionHandoffCompletionVerificationMarkdown,
  renderOpsPromotionReleaseEvidenceMarkdown,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown,
  renderOpsPromotionReleaseArchiveMarkdown,
  renderOpsPromotionReleaseArchiveVerificationMarkdown,
  renderOpsPromotionDeploymentApprovalMarkdown,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  renderOpsPromotionDeploymentChangeRecordMarkdown,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionRecordMarkdown,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  renderOpsPromotionHandoffPackageVerificationMarkdown,
  renderOpsPromotionHandoffPackageMarkdown,
  renderOpsPromotionArchiveAttestationVerificationMarkdown,
  renderOpsPromotionArchiveAttestationMarkdown,
  renderOpsPromotionArchiveVerificationMarkdown,
  renderOpsPromotionArchiveManifestMarkdown
} from "./opsPromotionArchiveRenderers.js";

export {
  createOpsPromotionHandoffPackage,
  createOpsPromotionHandoffPackageVerification,
  createOpsPromotionHandoffCertificate,
  createOpsPromotionHandoffCertificateVerification,
  createOpsPromotionHandoffReceipt,
  createOpsPromotionHandoffReceiptVerification,
  createOpsPromotionHandoffClosure,
  createOpsPromotionHandoffClosureVerification,
  createOpsPromotionHandoffCompletion,
  createOpsPromotionHandoffCompletionVerification,
  createOpsPromotionReleaseEvidence,
  createOpsPromotionReleaseEvidenceVerification,
  createOpsPromotionReleaseArchive,
  createOpsPromotionReleaseArchiveVerification,
  createOpsPromotionDeploymentApproval,
  createOpsPromotionDeploymentApprovalVerification,
  createOpsPromotionDeploymentChangeRecord,
  createOpsPromotionDeploymentChangeRecordVerification,
  createOpsPromotionDeploymentExecutionRecord,
  createOpsPromotionDeploymentExecutionRecordVerification,
  createOpsPromotionDeploymentExecutionReceipt,
  createOpsPromotionDeploymentExecutionReceiptVerification,
  createOpsPromotionReleaseAuditTrailRecord
} from "./opsPromotionArchiveProfileBuilders.js";

export type {
  OpsPromotionArchiveState,
  OpsPromotionArchiveArtifactType,
  OpsPromotionArchiveBundle,
  OpsPromotionArchiveManifestArtifact,
  OpsPromotionArchiveManifest,
  OpsPromotionArchiveVerificationArtifact,
  OpsPromotionArchiveVerification,
  OpsPromotionArchiveAttestationState,
  OpsPromotionArchiveAttestationEvidenceSource,
  OpsPromotionArchiveAttestation,
  OpsPromotionArchiveAttestationVerification,
  OpsPromotionHandoffPackageAttachmentName,
  OpsPromotionHandoffPackageAttachment,
  OpsPromotionHandoffPackage,
  OpsPromotionHandoffPackageVerificationAttachment,
  OpsPromotionHandoffPackageVerification,
  OpsPromotionHandoffCertificateAttachment,
  OpsPromotionHandoffCertificate,
  OpsPromotionHandoffCertificateVerificationAttachment,
  OpsPromotionHandoffCertificateVerification,
  OpsPromotionHandoffReceiptMilestoneName,
  OpsPromotionHandoffReceiptMilestone,
  OpsPromotionHandoffReceipt,
  OpsPromotionHandoffReceiptVerificationMilestone,
  OpsPromotionHandoffReceiptVerification,
  OpsPromotionHandoffClosureItemName,
  OpsPromotionHandoffClosureItem,
  OpsPromotionHandoffClosure,
  OpsPromotionHandoffClosureVerificationItem,
  OpsPromotionHandoffClosureVerification,
  OpsPromotionHandoffCompletionStepName,
  OpsPromotionHandoffCompletionStep,
  OpsPromotionHandoffCompletion,
  OpsPromotionHandoffCompletionVerificationStep,
  OpsPromotionHandoffCompletionVerification,
  OpsPromotionReleaseEvidenceItemName,
  OpsPromotionReleaseEvidenceItem,
  OpsPromotionReleaseEvidence,
  OpsPromotionReleaseEvidenceVerificationItem,
  OpsPromotionReleaseEvidenceVerification,
  OpsPromotionReleaseArchiveItemName,
  OpsPromotionReleaseArchiveItem,
  OpsPromotionReleaseArchive,
  OpsPromotionReleaseArchiveVerificationItem,
  OpsPromotionReleaseArchiveVerification,
  OpsPromotionDeploymentApprovalItemName,
  OpsPromotionDeploymentApprovalItem,
  OpsPromotionDeploymentApproval,
  OpsPromotionDeploymentApprovalVerificationItem,
  OpsPromotionDeploymentApprovalVerification,
  OpsPromotionDeploymentChangeRecordItemName,
  OpsPromotionDeploymentChangeRecordItem,
  OpsPromotionDeploymentChangeRecord,
  OpsPromotionDeploymentChangeRecordVerificationItem,
  OpsPromotionDeploymentChangeRecordVerification,
  OpsPromotionDeploymentExecutionRecordItemName,
  OpsPromotionDeploymentExecutionRecordItem,
  OpsPromotionDeploymentExecutionRecord,
  OpsPromotionDeploymentExecutionRecordVerificationItem,
  OpsPromotionDeploymentExecutionRecordVerification,
  OpsPromotionDeploymentExecutionReceiptItemName,
  OpsPromotionDeploymentExecutionReceiptItem,
  OpsPromotionDeploymentExecutionReceipt,
  OpsPromotionDeploymentExecutionReceiptVerificationItem,
  OpsPromotionDeploymentExecutionReceiptVerification,
  OpsPromotionReleaseAuditTrailRecordItemName,
  OpsPromotionReleaseAuditTrailRecordItem,
  OpsPromotionReleaseAuditTrailRecord
} from "./opsPromotionArchiveBundleTypes.js";
export function createOpsPromotionArchiveBundle(input: {
  integrity: OpsPromotionDecisionLedgerIntegrity;
  latestEvidence?: OpsPromotionEvidenceReport;
}): OpsPromotionArchiveBundle {
  const state = archiveState(input.integrity, input.latestEvidence);
  const archiveName = `promotion-archive-${input.integrity.rootDigest.value.slice(0, 12)}`;

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName,
    state,
    summary: {
      totalDecisions: input.integrity.totalRecords,
      latestDecisionId: input.latestEvidence?.decisionId,
      latestSequence: input.latestEvidence?.sequence,
      latestOutcome: input.latestEvidence?.summary.outcome,
      latestReadyForPromotion: input.latestEvidence?.summary.readyForPromotion,
      latestDigestValid: input.latestEvidence?.summary.digestValid,
      integrityValid: input.integrity.valid,
      integrityRootDigest: input.integrity.rootDigest.value,
      sequenceOrder: input.integrity.checks.sequenceOrder,
    },
    latestEvidence: input.latestEvidence,
    integrity: input.integrity,
    nextActions: archiveNextActions(input.integrity, input.latestEvidence),
  };
}

export function createOpsPromotionArchiveManifest(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifest {
  const artifacts = archiveArtifacts(bundle);
  const manifestPayload = manifestDigestPayload({
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    artifacts,
    nextActions: bundle.nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: bundle.archiveName,
    state: bundle.state,
    manifestDigest: {
      algorithm: "sha256",
      value: digestStable(manifestPayload),
      coveredFields: ["archiveName", "state", "summary", "artifacts", "nextActions"],
    },
    summary: bundle.summary,
    artifacts,
    nextActions: bundle.nextActions,
  };
}

export function createOpsPromotionArchiveVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
}): OpsPromotionArchiveVerification {
  const expectedArtifacts = archiveArtifacts(input.bundle);
  const artifactChecks = input.manifest.artifacts.map((artifact) => {
    const expected = expectedArtifacts.find((candidate) => candidate.name === artifact.name);
    const presentMatches = expected?.present === artifact.present;
    const sourceMatches = expected?.source === artifact.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: artifact.name }) };
    const digestMatches = artifact.digest.value === expectedDigest.value;

    return {
      name: artifact.name,
      type: artifact.type,
      valid: expected !== undefined && presentMatches && sourceMatches && digestMatches,
      presentMatches,
      sourceMatches,
      digestMatches,
      manifestDigest: { ...artifact.digest },
      recomputedDigest: expectedDigest,
      source: artifact.source,
    };
  });
  const recomputedManifestDigest = digestStable(manifestDigestPayload(input.manifest));
  const archiveNameMatches = input.manifest.archiveName === input.bundle.archiveName;
  const stateMatches = input.manifest.state === input.bundle.state;
  const summaryMatches = stableJson(input.manifest.summary) === stableJson(input.bundle.summary);
  const nextActionsMatch = stableJson(input.manifest.nextActions) === stableJson(input.bundle.nextActions);
  const manifestDigestValid = input.manifest.manifestDigest.value === recomputedManifestDigest;
  const artifactsValid = artifactChecks.length === expectedArtifacts.length && artifactChecks.every((artifact) => artifact.valid);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: input.manifest.archiveName,
    valid: manifestDigestValid && artifactsValid && archiveNameMatches && stateMatches && summaryMatches && nextActionsMatch,
    state: input.manifest.state,
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    recomputedManifestDigest: {
      algorithm: "sha256",
      value: recomputedManifestDigest,
    },
    checks: {
      manifestDigestValid,
      artifactsValid,
      archiveNameMatches,
      stateMatches,
      summaryMatches,
      nextActionsMatch,
    },
    summary: {
      totalDecisions: input.manifest.summary.totalDecisions,
      latestDecisionId: input.manifest.summary.latestDecisionId,
      integrityRootDigest: input.manifest.summary.integrityRootDigest,
      artifactCount: artifactChecks.length,
    },
    artifacts: artifactChecks,
    nextActions: archiveVerificationNextActions(manifestDigestValid, artifactsValid, input.manifest),
  };
}

export function createOpsPromotionArchiveAttestation(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
}): OpsPromotionArchiveAttestation {
  const verificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
  const evidenceSources = input.manifest.artifacts.map((artifact) => {
    const verificationArtifact = input.verification.artifacts.find((candidate) => candidate.name === artifact.name);

    return {
      name: artifact.name,
      type: artifact.type,
      present: artifact.present,
      verified: verificationArtifact?.valid === true,
      source: artifact.source,
      digest: { ...artifact.digest },
    };
  });
  const checks = {
    manifestVerified: input.verification.checks.manifestDigestValid,
    artifactsVerified: input.verification.checks.artifactsValid,
    archiveReady: input.bundle.state === "ready" && input.manifest.state === "ready" && input.verification.state === "ready",
    latestDecisionReady: input.bundle.summary.latestOutcome === "approved"
      && input.bundle.summary.latestReadyForPromotion === true
      && input.bundle.summary.latestDigestValid === true,
    integrityVerified: input.bundle.summary.integrityValid
      && input.manifest.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest
      && input.verification.summary.integrityRootDigest === input.bundle.summary.integrityRootDigest,
  };
  const handoffReady = input.verification.valid && Object.values(checks).every(Boolean);
  const state = handoffReady ? "ready" : input.bundle.summary.totalDecisions === 0 ? "not-started" : "blocked";
  const decision = {
    totalDecisions: input.bundle.summary.totalDecisions,
    latestDecisionId: input.bundle.summary.latestDecisionId,
    latestSequence: input.bundle.summary.latestSequence,
    latestOutcome: input.bundle.summary.latestOutcome,
    latestReadyForPromotion: input.bundle.summary.latestReadyForPromotion,
    latestDigestValid: input.bundle.summary.latestDigestValid,
  };
  const nextActions = archiveAttestationNextActions(state, checks, input.bundle, input.verification);
  const sealPayload = archiveAttestationDigestPayload({
    archiveName: input.bundle.archiveName,
    state,
    handoffReady,
    manifestDigest: input.manifest.manifestDigest.value,
    verificationDigest,
    decision,
    checks,
    evidenceSources,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    title: `Promotion archive attestation for ${input.bundle.archiveName}`,
    archiveName: input.bundle.archiveName,
    state,
    handoffReady,
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: verificationDigest,
    },
    sealDigest: {
      algorithm: "sha256",
      value: digestStable(sealPayload),
      coveredFields: [
        "archiveName",
        "state",
        "handoffReady",
        "manifestDigest",
        "verificationDigest",
        "decision",
        "checks",
        "evidenceSources",
        "nextActions",
      ],
    },
    decision,
    checks,
    evidenceSources,
    nextActions,
  };
}

export function createOpsPromotionArchiveAttestationVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
}): OpsPromotionArchiveAttestationVerification {
  const expectedAttestation = createOpsPromotionArchiveAttestation({
    bundle: input.bundle,
    manifest: input.manifest,
    verification: input.verification,
  });
  const recomputedVerificationDigest = digestStable(archiveVerificationDigestPayload(input.verification));
  const recomputedSealDigest = digestStable(archiveAttestationDigestPayload({
    archiveName: input.attestation.archiveName,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    manifestDigest: input.attestation.manifestDigest.value,
    verificationDigest: input.attestation.verificationDigest.value,
    decision: input.attestation.decision,
    checks: input.attestation.checks,
    evidenceSources: input.attestation.evidenceSources,
    nextActions: input.attestation.nextActions,
  }));
  const checks = {
    sealDigestValid: input.attestation.sealDigest.value === recomputedSealDigest,
    verificationDigestValid: input.attestation.verificationDigest.value === recomputedVerificationDigest,
    manifestDigestMatches: input.attestation.manifestDigest.value === input.manifest.manifestDigest.value,
    archiveNameMatches: input.attestation.archiveName === expectedAttestation.archiveName,
    stateMatches: input.attestation.state === expectedAttestation.state,
    handoffReadyMatches: input.attestation.handoffReady === expectedAttestation.handoffReady,
    decisionMatches: stableJson(input.attestation.decision) === stableJson(expectedAttestation.decision),
    checksMatch: stableJson(input.attestation.checks) === stableJson(expectedAttestation.checks),
    evidenceSourcesMatch: stableJson(input.attestation.evidenceSources) === stableJson(expectedAttestation.evidenceSources),
    nextActionsMatch: stableJson(input.attestation.nextActions) === stableJson(expectedAttestation.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    archiveName: input.attestation.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    sealDigest: {
      algorithm: "sha256",
      value: input.attestation.sealDigest.value,
    },
    recomputedSealDigest: {
      algorithm: "sha256",
      value: recomputedSealDigest,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: input.attestation.verificationDigest.value,
    },
    recomputedVerificationDigest: {
      algorithm: "sha256",
      value: recomputedVerificationDigest,
    },
    checks,
    summary: {
      totalDecisions: input.attestation.decision.totalDecisions,
      latestDecisionId: input.attestation.decision.latestDecisionId,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      handoffReady: input.attestation.handoffReady,
    },
    nextActions: archiveAttestationVerificationNextActions(checks, input.attestation),
  };
}

function archiveArtifacts(bundle: OpsPromotionArchiveBundle): OpsPromotionArchiveManifestArtifact[] {
  return [
    {
      name: "archive-summary",
      type: "archive-summary",
      present: true,
      digest: {
        algorithm: "sha256",
        value: digestStable({
          archiveName: bundle.archiveName,
          state: bundle.state,
          summary: bundle.summary,
          nextActions: bundle.nextActions,
        }),
      },
      source: "/api/v1/ops/promotion-archive",
    },
    {
      name: "latest-evidence",
      type: "latest-evidence",
      present: bundle.latestEvidence !== undefined,
      digest: {
        algorithm: "sha256",
        value: digestStable(bundle.latestEvidence === undefined
          ? { present: false }
          : {
            decisionId: bundle.latestEvidence.decisionId,
            sequence: bundle.latestEvidence.sequence,
            verdict: bundle.latestEvidence.verdict,
            summary: bundle.latestEvidence.summary,
            nextActions: bundle.latestEvidence.nextActions,
          }),
      },
      source: bundle.latestEvidence === undefined
        ? "/api/v1/ops/promotion-decisions/:decisionId/evidence"
        : `/api/v1/ops/promotion-decisions/${bundle.latestEvidence.decisionId}/evidence`,
    },
    {
      name: "ledger-integrity",
      type: "ledger-integrity",
      present: true,
      digest: {
        algorithm: "sha256",
        value: bundle.integrity.rootDigest.value,
      },
      source: "/api/v1/ops/promotion-decisions/integrity",
    },
  ];
}
