import { createHash } from "node:crypto";

import type { OpsPromotionDecisionLedgerIntegrity } from "./opsPromotionDecision.js";
import type { OpsPromotionEvidenceReport } from "./opsPromotionEvidenceReport.js";
import type { OpsPromotionDecision } from "./opsPromotionReview.js";

export type OpsPromotionArchiveState = "empty" | "ready" | "attention-required";
export type OpsPromotionArchiveArtifactType = "archive-summary" | "latest-evidence" | "ledger-integrity";

export interface OpsPromotionArchiveBundle {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestSequence?: number;
    latestOutcome?: OpsPromotionDecision;
    latestReadyForPromotion?: boolean;
    latestDigestValid?: boolean;
    integrityValid: boolean;
    integrityRootDigest: string;
    sequenceOrder: OpsPromotionDecisionLedgerIntegrity["checks"]["sequenceOrder"];
  };
  latestEvidence?: OpsPromotionEvidenceReport;
  integrity: OpsPromotionDecisionLedgerIntegrity;
  nextActions: string[];
}

export interface OpsPromotionArchiveManifestArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionArchiveManifest {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  summary: OpsPromotionArchiveBundle["summary"];
  artifacts: OpsPromotionArchiveManifestArtifact[];
  nextActions: string[];
}

export interface OpsPromotionArchiveVerificationArtifact {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  valid: boolean;
  presentMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionArchiveVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveState;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedManifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    manifestDigestValid: boolean;
    artifactsValid: boolean;
    archiveNameMatches: boolean;
    stateMatches: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    integrityRootDigest: string;
    artifactCount: number;
  };
  artifacts: OpsPromotionArchiveVerificationArtifact[];
  nextActions: string[];
}

export type OpsPromotionArchiveAttestationState = "not-started" | "blocked" | "ready";

export interface OpsPromotionArchiveAttestationEvidenceSource {
  name: string;
  type: OpsPromotionArchiveArtifactType;
  present: boolean;
  verified: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionArchiveAttestation {
  service: "orderops-node";
  generatedAt: string;
  title: string;
  archiveName: string;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  decision: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestSequence?: number;
    latestOutcome?: OpsPromotionDecision;
    latestReadyForPromotion?: boolean;
    latestDigestValid?: boolean;
  };
  checks: {
    manifestVerified: boolean;
    artifactsVerified: boolean;
    archiveReady: boolean;
    latestDecisionReady: boolean;
    integrityVerified: boolean;
  };
  evidenceSources: OpsPromotionArchiveAttestationEvidenceSource[];
  nextActions: string[];
}

export interface OpsPromotionArchiveAttestationVerification {
  service: "orderops-node";
  generatedAt: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedSealDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedVerificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    sealDigestValid: boolean;
    verificationDigestValid: boolean;
    manifestDigestMatches: boolean;
    archiveNameMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    decisionMatches: boolean;
    checksMatch: boolean;
    evidenceSourcesMatch: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    evidenceSourceCount: number;
    handoffReady: boolean;
  };
  nextActions: string[];
}

export type OpsPromotionHandoffPackageAttachmentName =
  | "archive-bundle"
  | "archive-manifest"
  | "archive-verification"
  | "archive-attestation"
  | "attestation-verification";

export interface OpsPromotionHandoffPackageAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffPackage {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  manifestDigest: {
    algorithm: "sha256";
    value: string;
  };
  verificationDigest: {
    algorithm: "sha256";
    value: string;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestOutcome?: OpsPromotionDecision;
    evidenceSourceCount: number;
    attachmentCount: number;
  };
  attachments: OpsPromotionHandoffPackageAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffPackageVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffPackageVerification {
  service: "orderops-node";
  generatedAt: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    packageDigestValid: boolean;
    attachmentsValid: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    sealDigestMatches: boolean;
    manifestDigestMatches: boolean;
    verificationDigestMatches: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    attachmentCount: number;
    handoffReady: boolean;
  };
  attachments: OpsPromotionHandoffPackageVerificationAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffCertificateAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffCertificate {
  service: "orderops-node";
  generatedAt: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: {
    totalDecisions: number;
    latestDecisionId?: string;
    latestOutcome?: OpsPromotionDecision;
  };
  verification: {
    packageVerified: boolean;
    packageDigestValid: boolean;
    attachmentsValid: boolean;
    attachmentCount: number;
  };
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}

export interface OpsPromotionHandoffCertificateVerificationAttachment {
  name: OpsPromotionHandoffPackageAttachmentName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffCertificateVerification {
  service: "orderops-node";
  generatedAt: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    certificateDigestValid: boolean;
    coveredFieldsMatch: boolean;
    attachmentsValid: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    attachmentCount: number;
    handoffReady: boolean;
  };
  attachments: OpsPromotionHandoffCertificateVerificationAttachment[];
  nextActions: string[];
}

export type OpsPromotionHandoffReceiptMilestoneName =
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal"
  | "handoff-certificate"
  | "certificate-verification";

export interface OpsPromotionHandoffReceiptMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffReceipt {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffCertificate["decision"];
  verification: {
    certificateVerified: boolean;
    certificateDigestValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    attachmentsValid: boolean;
    milestoneCount: number;
    attachmentCount: number;
  };
  milestones: OpsPromotionHandoffReceiptMilestone[];
  nextActions: string[];
}

export interface OpsPromotionHandoffReceiptVerificationMilestone {
  name: OpsPromotionHandoffReceiptMilestoneName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffReceiptVerification {
  service: "orderops-node";
  generatedAt: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    receiptDigestValid: boolean;
    coveredFieldsMatch: boolean;
    milestonesValid: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    certificateDigestMatches: boolean;
    verifiedCertificateDigestMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    milestoneCount: number;
    handoffReady: boolean;
  };
  milestones: OpsPromotionHandoffReceiptVerificationMilestone[];
  nextActions: string[];
}

export type OpsPromotionHandoffClosureItemName =
  | "handoff-receipt"
  | "verified-handoff-receipt"
  | "handoff-certificate"
  | "verified-handoff-certificate"
  | "handoff-package"
  | "verified-handoff-package"
  | "archive-seal";

export interface OpsPromotionHandoffClosureItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  source: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export interface OpsPromotionHandoffClosure {
  service: "orderops-node";
  generatedAt: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  receiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedReceiptDigest: {
    algorithm: "sha256";
    value: string;
  };
  certificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedCertificateDigest: {
    algorithm: "sha256";
    value: string;
  };
  packageDigest: {
    algorithm: "sha256";
    value: string;
  };
  verifiedPackageDigest: {
    algorithm: "sha256";
    value: string;
  };
  sealDigest: {
    algorithm: "sha256";
    value: string;
  };
  decision: OpsPromotionHandoffReceipt["decision"];
  verification: {
    receiptVerified: boolean;
    receiptDigestValid: boolean;
    milestoneReferencesValid: boolean;
    certificateReferenceValid: boolean;
    packageReferenceValid: boolean;
    sealReferenceValid: boolean;
    milestoneCount: number;
    closureItemCount: number;
  };
  closureItems: OpsPromotionHandoffClosureItem[];
  nextActions: string[];
}

export interface OpsPromotionHandoffClosureVerificationItem {
  name: OpsPromotionHandoffClosureItemName;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedDigest: {
    algorithm: "sha256";
    value: string;
  };
  source: string;
}

export interface OpsPromotionHandoffClosureVerification {
  service: "orderops-node";
  generatedAt: string;
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  closureDigest: {
    algorithm: "sha256";
    value: string;
  };
  recomputedClosureDigest: {
    algorithm: "sha256";
    value: string;
  };
  checks: {
    closureDigestValid: boolean;
    coveredFieldsMatch: boolean;
    closureItemsValid: boolean;
    closureNameMatches: boolean;
    receiptNameMatches: boolean;
    certificateNameMatches: boolean;
    packageNameMatches: boolean;
    archiveNameMatches: boolean;
    validMatches: boolean;
    stateMatches: boolean;
    handoffReadyMatches: boolean;
    receiptDigestMatches: boolean;
    verifiedReceiptDigestMatches: boolean;
    certificateDigestMatches: boolean;
    verifiedCertificateDigestMatches: boolean;
    packageDigestMatches: boolean;
    verifiedPackageDigestMatches: boolean;
    sealDigestMatches: boolean;
    decisionMatches: boolean;
    verificationMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: {
    totalDecisions: number;
    latestDecisionId?: string;
    closureItemCount: number;
    handoffReady: boolean;
  };
  closureItems: OpsPromotionHandoffClosureVerificationItem[];
  nextActions: string[];
}

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

export function createOpsPromotionHandoffPackage(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackage {
  const attachments = archiveHandoffPackageAttachments(input);
  const valid = input.attestationVerification.valid && attachments.every((attachment) => attachment.valid);
  const nextActions = archiveHandoffPackageNextActions(input.attestation, input.attestationVerification);
  const packageName = `promotion-handoff-${input.attestation.sealDigest.value.slice(0, 12)}`;
  const digestPayload = archiveHandoffPackageDigestPayload({
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    sealDigest: input.attestation.sealDigest.value,
    manifestDigest: input.manifest.manifestDigest.value,
    verificationDigest: input.attestation.verificationDigest.value,
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName,
    archiveName: input.bundle.archiveName,
    valid,
    state: input.attestation.state,
    handoffReady: input.attestation.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "sealDigest",
        "manifestDigest",
        "verificationDigest",
        "summary",
        "attachments",
        "nextActions",
      ],
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.attestation.sealDigest.value,
    },
    manifestDigest: {
      algorithm: "sha256",
      value: input.manifest.manifestDigest.value,
    },
    verificationDigest: {
      algorithm: "sha256",
      value: input.attestation.verificationDigest.value,
    },
    summary: {
      totalDecisions: input.bundle.summary.totalDecisions,
      latestDecisionId: input.bundle.summary.latestDecisionId,
      latestOutcome: input.bundle.summary.latestOutcome,
      evidenceSourceCount: input.attestation.evidenceSources.length,
      attachmentCount: attachments.length,
    },
    attachments,
    nextActions,
  };
}

export function createOpsPromotionHandoffPackageVerification(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
  handoffPackage: OpsPromotionHandoffPackage;
}): OpsPromotionHandoffPackageVerification {
  const expectedPackage = createOpsPromotionHandoffPackage({
    bundle: input.bundle,
    manifest: input.manifest,
    verification: input.verification,
    attestation: input.attestation,
    attestationVerification: input.attestationVerification,
  });
  const recomputedPackageDigest = digestStable(archiveHandoffPackageDigestPayload({
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid: input.handoffPackage.valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    sealDigest: input.handoffPackage.sealDigest.value,
    manifestDigest: input.handoffPackage.manifestDigest.value,
    verificationDigest: input.handoffPackage.verificationDigest.value,
    summary: input.handoffPackage.summary,
    attachments: input.handoffPackage.attachments,
    nextActions: input.handoffPackage.nextActions,
  }));
  const attachmentChecks = input.handoffPackage.attachments.map((attachment) => {
    const expected = expectedPackage.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      packageDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
  const checks = {
    packageDigestValid: input.handoffPackage.packageDigest.value === recomputedPackageDigest,
    attachmentsValid: attachmentChecks.length === expectedPackage.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    packageNameMatches: input.handoffPackage.packageName === expectedPackage.packageName,
    archiveNameMatches: input.handoffPackage.archiveName === expectedPackage.archiveName,
    validMatches: input.handoffPackage.valid === expectedPackage.valid,
    stateMatches: input.handoffPackage.state === expectedPackage.state,
    handoffReadyMatches: input.handoffPackage.handoffReady === expectedPackage.handoffReady,
    sealDigestMatches: input.handoffPackage.sealDigest.value === expectedPackage.sealDigest.value,
    manifestDigestMatches: input.handoffPackage.manifestDigest.value === expectedPackage.manifestDigest.value,
    verificationDigestMatches: input.handoffPackage.verificationDigest.value === expectedPackage.verificationDigest.value,
    summaryMatches: stableJson(input.handoffPackage.summary) === stableJson(expectedPackage.summary),
    nextActionsMatch: stableJson(input.handoffPackage.nextActions) === stableJson(expectedPackage.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady: input.handoffPackage.handoffReady,
    packageDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.packageDigest.value,
    },
    recomputedPackageDigest: {
      algorithm: "sha256",
      value: recomputedPackageDigest,
    },
    checks,
    summary: {
      totalDecisions: input.handoffPackage.summary.totalDecisions,
      latestDecisionId: input.handoffPackage.summary.latestDecisionId,
      attachmentCount: attachmentChecks.length,
      handoffReady: input.handoffPackage.handoffReady,
    },
    attachments: attachmentChecks,
    nextActions: archiveHandoffPackageVerificationNextActions(checks, input.handoffPackage),
  };
}

export function createOpsPromotionHandoffCertificate(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
}): OpsPromotionHandoffCertificate {
  const certificateName = `promotion-certificate-${input.handoffPackage.packageDigest.value.slice(0, 12)}`;
  const attachments = input.handoffPackage.attachments.map((attachment) => {
    const verificationAttachment = input.handoffPackageVerification.attachments.find((candidate) => candidate.name === attachment.name);

    return {
      name: attachment.name,
      valid: attachment.valid && verificationAttachment?.valid === true,
      source: attachment.source,
      digest: { ...attachment.digest },
    };
  });
  const verification = {
    packageVerified: input.handoffPackageVerification.valid,
    packageDigestValid: input.handoffPackageVerification.checks.packageDigestValid,
    attachmentsValid: input.handoffPackageVerification.checks.attachmentsValid,
    attachmentCount: attachments.length,
  };
  const valid = input.handoffPackage.valid && input.handoffPackageVerification.valid && attachments.every((attachment) => attachment.valid);
  const handoffReady = valid && input.handoffPackage.handoffReady;
  const nextActions = archiveHandoffCertificateNextActions(input.handoffPackage, input.handoffPackageVerification, valid);
  const decision = {
    totalDecisions: input.handoffPackage.summary.totalDecisions,
    latestDecisionId: input.handoffPackage.summary.latestDecisionId,
    latestOutcome: input.handoffPackage.summary.latestOutcome,
  };
  const digestPayload = archiveHandoffCertificateDigestPayload({
    certificateName,
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady,
    packageDigest: input.handoffPackage.packageDigest.value,
    verifiedPackageDigest: input.handoffPackageVerification.recomputedPackageDigest.value,
    sealDigest: input.handoffPackage.sealDigest.value,
    decision,
    verification,
    attachments,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    certificateName,
    packageName: input.handoffPackage.packageName,
    archiveName: input.handoffPackage.archiveName,
    valid,
    state: input.handoffPackage.state,
    handoffReady,
    certificateDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "attachments",
        "nextActions",
      ],
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.handoffPackageVerification.recomputedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.handoffPackage.sealDigest.value,
    },
    decision,
    verification,
    attachments,
    nextActions,
  };
}

export function createOpsPromotionHandoffCertificateVerification(input: {
  handoffPackage: OpsPromotionHandoffPackage;
  handoffPackageVerification: OpsPromotionHandoffPackageVerification;
  certificate: OpsPromotionHandoffCertificate;
}): OpsPromotionHandoffCertificateVerification {
  const expectedCertificate = createOpsPromotionHandoffCertificate({
    handoffPackage: input.handoffPackage,
    handoffPackageVerification: input.handoffPackageVerification,
  });
  const recomputedCertificateDigest = digestStable(archiveHandoffCertificateDigestPayload({
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid: input.certificate.valid,
    state: input.certificate.state,
    handoffReady: input.certificate.handoffReady,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification: input.certificate.verification,
    attachments: input.certificate.attachments,
    nextActions: input.certificate.nextActions,
  }));
  const attachmentChecks = input.certificate.attachments.map((attachment) => {
    const expected = expectedCertificate.attachments.find((candidate) => candidate.name === attachment.name);
    const validMatches = expected?.valid === attachment.valid;
    const sourceMatches = expected?.source === attachment.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: attachment.name }) };
    const digestMatches = attachment.digest.value === expectedDigest.value;

    return {
      name: attachment.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      certificateDigest: { ...attachment.digest },
      recomputedDigest: expectedDigest,
      source: attachment.source,
    };
  });
  const checks = {
    certificateDigestValid: input.certificate.certificateDigest.value === recomputedCertificateDigest,
    coveredFieldsMatch: stableJson(input.certificate.certificateDigest.coveredFields)
      === stableJson(expectedCertificate.certificateDigest.coveredFields),
    attachmentsValid: attachmentChecks.length === expectedCertificate.attachments.length
      && attachmentChecks.every((attachment) => attachment.valid),
    certificateNameMatches: input.certificate.certificateName === expectedCertificate.certificateName,
    packageNameMatches: input.certificate.packageName === expectedCertificate.packageName,
    archiveNameMatches: input.certificate.archiveName === expectedCertificate.archiveName,
    validMatches: input.certificate.valid === expectedCertificate.valid,
    stateMatches: input.certificate.state === expectedCertificate.state,
    handoffReadyMatches: input.certificate.handoffReady === expectedCertificate.handoffReady,
    packageDigestMatches: input.certificate.packageDigest.value === expectedCertificate.packageDigest.value,
    verifiedPackageDigestMatches: input.certificate.verifiedPackageDigest.value === expectedCertificate.verifiedPackageDigest.value,
    sealDigestMatches: input.certificate.sealDigest.value === expectedCertificate.sealDigest.value,
    decisionMatches: stableJson(input.certificate.decision) === stableJson(expectedCertificate.decision),
    verificationMatches: stableJson(input.certificate.verification) === stableJson(expectedCertificate.verification),
    nextActionsMatch: stableJson(input.certificate.nextActions) === stableJson(expectedCertificate.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady: input.certificate.handoffReady,
    certificateDigest: {
      algorithm: "sha256",
      value: input.certificate.certificateDigest.value,
    },
    recomputedCertificateDigest: {
      algorithm: "sha256",
      value: recomputedCertificateDigest,
    },
    checks,
    summary: {
      totalDecisions: input.certificate.decision.totalDecisions,
      latestDecisionId: input.certificate.decision.latestDecisionId,
      attachmentCount: attachmentChecks.length,
      handoffReady: input.certificate.handoffReady,
    },
    attachments: attachmentChecks,
    nextActions: archiveHandoffCertificateVerificationNextActions(checks, input.certificate),
  };
}

export function createOpsPromotionHandoffReceipt(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
}): OpsPromotionHandoffReceipt {
  const receiptName = `promotion-receipt-${input.certificateVerification.recomputedCertificateDigest.value.slice(0, 12)}`;
  const milestones = archiveHandoffReceiptMilestones(input.certificate, input.certificateVerification);
  const verification = {
    certificateVerified: input.certificateVerification.valid,
    certificateDigestValid: input.certificateVerification.checks.certificateDigestValid,
    packageReferenceValid: input.certificateVerification.checks.packageDigestMatches
      && input.certificateVerification.checks.verifiedPackageDigestMatches,
    sealReferenceValid: input.certificateVerification.checks.sealDigestMatches,
    attachmentsValid: input.certificateVerification.checks.attachmentsValid,
    milestoneCount: milestones.length,
    attachmentCount: input.certificateVerification.summary.attachmentCount,
  };
  const valid = input.certificate.valid
    && input.certificateVerification.valid
    && input.certificate.certificateDigest.value === input.certificateVerification.recomputedCertificateDigest.value
    && milestones.every((milestone) => milestone.valid);
  const handoffReady = valid && input.certificate.handoffReady && input.certificateVerification.handoffReady;
  const nextActions = archiveHandoffReceiptNextActions(input.certificate, input.certificateVerification, valid);
  const digestPayload = archiveHandoffReceiptDigestPayload({
    receiptName,
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady,
    certificateDigest: input.certificate.certificateDigest.value,
    verifiedCertificateDigest: input.certificateVerification.recomputedCertificateDigest.value,
    packageDigest: input.certificate.packageDigest.value,
    verifiedPackageDigest: input.certificate.verifiedPackageDigest.value,
    sealDigest: input.certificate.sealDigest.value,
    decision: input.certificate.decision,
    verification,
    milestones,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName,
    certificateName: input.certificate.certificateName,
    packageName: input.certificate.packageName,
    archiveName: input.certificate.archiveName,
    valid,
    state: input.certificate.state,
    handoffReady,
    receiptDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "milestones",
        "nextActions",
      ],
    },
    certificateDigest: {
      algorithm: "sha256",
      value: input.certificate.certificateDigest.value,
    },
    verifiedCertificateDigest: {
      algorithm: "sha256",
      value: input.certificateVerification.recomputedCertificateDigest.value,
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.certificate.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.certificate.verifiedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.certificate.sealDigest.value,
    },
    decision: input.certificate.decision,
    verification,
    milestones,
    nextActions,
  };
}

export function createOpsPromotionHandoffReceiptVerification(input: {
  certificate: OpsPromotionHandoffCertificate;
  certificateVerification: OpsPromotionHandoffCertificateVerification;
  receipt: OpsPromotionHandoffReceipt;
}): OpsPromotionHandoffReceiptVerification {
  const expectedReceipt = createOpsPromotionHandoffReceipt({
    certificate: input.certificate,
    certificateVerification: input.certificateVerification,
  });
  const recomputedReceiptDigest = digestStable(archiveHandoffReceiptDigestPayload({
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid: input.receipt.valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification: input.receipt.verification,
    milestones: input.receipt.milestones,
    nextActions: input.receipt.nextActions,
  }));
  const milestoneChecks = input.receipt.milestones.map((milestone) => {
    const expected = expectedReceipt.milestones.find((candidate) => candidate.name === milestone.name);
    const validMatches = expected?.valid === milestone.valid;
    const sourceMatches = expected?.source === milestone.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: milestone.name }) };
    const digestMatches = milestone.digest.value === expectedDigest.value;

    return {
      name: milestone.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      receiptDigest: { ...milestone.digest },
      recomputedDigest: expectedDigest,
      source: milestone.source,
    };
  });
  const checks = {
    receiptDigestValid: input.receipt.receiptDigest.value === recomputedReceiptDigest,
    coveredFieldsMatch: stableJson(input.receipt.receiptDigest.coveredFields)
      === stableJson(expectedReceipt.receiptDigest.coveredFields),
    milestonesValid: milestoneChecks.length === expectedReceipt.milestones.length
      && milestoneChecks.every((milestone) => milestone.valid),
    receiptNameMatches: input.receipt.receiptName === expectedReceipt.receiptName,
    certificateNameMatches: input.receipt.certificateName === expectedReceipt.certificateName,
    packageNameMatches: input.receipt.packageName === expectedReceipt.packageName,
    archiveNameMatches: input.receipt.archiveName === expectedReceipt.archiveName,
    validMatches: input.receipt.valid === expectedReceipt.valid,
    stateMatches: input.receipt.state === expectedReceipt.state,
    handoffReadyMatches: input.receipt.handoffReady === expectedReceipt.handoffReady,
    certificateDigestMatches: input.receipt.certificateDigest.value === expectedReceipt.certificateDigest.value,
    verifiedCertificateDigestMatches: input.receipt.verifiedCertificateDigest.value === expectedReceipt.verifiedCertificateDigest.value,
    packageDigestMatches: input.receipt.packageDigest.value === expectedReceipt.packageDigest.value,
    verifiedPackageDigestMatches: input.receipt.verifiedPackageDigest.value === expectedReceipt.verifiedPackageDigest.value,
    sealDigestMatches: input.receipt.sealDigest.value === expectedReceipt.sealDigest.value,
    decisionMatches: stableJson(input.receipt.decision) === stableJson(expectedReceipt.decision),
    verificationMatches: stableJson(input.receipt.verification) === stableJson(expectedReceipt.verification),
    nextActionsMatch: stableJson(input.receipt.nextActions) === stableJson(expectedReceipt.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady: input.receipt.handoffReady,
    receiptDigest: {
      algorithm: "sha256",
      value: input.receipt.receiptDigest.value,
    },
    recomputedReceiptDigest: {
      algorithm: "sha256",
      value: recomputedReceiptDigest,
    },
    checks,
    summary: {
      totalDecisions: input.receipt.decision.totalDecisions,
      latestDecisionId: input.receipt.decision.latestDecisionId,
      milestoneCount: milestoneChecks.length,
      handoffReady: input.receipt.handoffReady,
    },
    milestones: milestoneChecks,
    nextActions: archiveHandoffReceiptVerificationNextActions(checks, input.receipt),
  };
}

export function createOpsPromotionHandoffClosure(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
}): OpsPromotionHandoffClosure {
  const closureName = `promotion-closure-${input.receiptVerification.recomputedReceiptDigest.value.slice(0, 12)}`;
  const closureItems = archiveHandoffClosureItems(input.receipt, input.receiptVerification);
  const verification = {
    receiptVerified: input.receiptVerification.valid,
    receiptDigestValid: input.receiptVerification.checks.receiptDigestValid,
    milestoneReferencesValid: input.receiptVerification.checks.milestonesValid,
    certificateReferenceValid: input.receiptVerification.checks.certificateDigestMatches
      && input.receiptVerification.checks.verifiedCertificateDigestMatches,
    packageReferenceValid: input.receiptVerification.checks.packageDigestMatches
      && input.receiptVerification.checks.verifiedPackageDigestMatches,
    sealReferenceValid: input.receiptVerification.checks.sealDigestMatches,
    milestoneCount: input.receiptVerification.summary.milestoneCount,
    closureItemCount: closureItems.length,
  };
  const valid = input.receipt.valid
    && input.receiptVerification.valid
    && input.receipt.receiptDigest.value === input.receiptVerification.recomputedReceiptDigest.value
    && closureItems.every((item) => item.valid);
  const handoffReady = valid && input.receipt.handoffReady && input.receiptVerification.handoffReady;
  const nextActions = archiveHandoffClosureNextActions(input.receipt, input.receiptVerification, valid);
  const digestPayload = archiveHandoffClosureDigestPayload({
    closureName,
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    receiptDigest: input.receipt.receiptDigest.value,
    verifiedReceiptDigest: input.receiptVerification.recomputedReceiptDigest.value,
    certificateDigest: input.receipt.certificateDigest.value,
    verifiedCertificateDigest: input.receipt.verifiedCertificateDigest.value,
    packageDigest: input.receipt.packageDigest.value,
    verifiedPackageDigest: input.receipt.verifiedPackageDigest.value,
    sealDigest: input.receipt.sealDigest.value,
    decision: input.receipt.decision,
    verification,
    closureItems,
    nextActions,
  });

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    closureName,
    receiptName: input.receipt.receiptName,
    certificateName: input.receipt.certificateName,
    packageName: input.receipt.packageName,
    archiveName: input.receipt.archiveName,
    valid,
    state: input.receipt.state,
    handoffReady,
    closureDigest: {
      algorithm: "sha256",
      value: digestStable(digestPayload),
      coveredFields: [
        "closureName",
        "receiptName",
        "certificateName",
        "packageName",
        "archiveName",
        "valid",
        "state",
        "handoffReady",
        "receiptDigest",
        "verifiedReceiptDigest",
        "certificateDigest",
        "verifiedCertificateDigest",
        "packageDigest",
        "verifiedPackageDigest",
        "sealDigest",
        "decision",
        "verification",
        "closureItems",
        "nextActions",
      ],
    },
    receiptDigest: {
      algorithm: "sha256",
      value: input.receipt.receiptDigest.value,
    },
    verifiedReceiptDigest: {
      algorithm: "sha256",
      value: input.receiptVerification.recomputedReceiptDigest.value,
    },
    certificateDigest: {
      algorithm: "sha256",
      value: input.receipt.certificateDigest.value,
    },
    verifiedCertificateDigest: {
      algorithm: "sha256",
      value: input.receipt.verifiedCertificateDigest.value,
    },
    packageDigest: {
      algorithm: "sha256",
      value: input.receipt.packageDigest.value,
    },
    verifiedPackageDigest: {
      algorithm: "sha256",
      value: input.receipt.verifiedPackageDigest.value,
    },
    sealDigest: {
      algorithm: "sha256",
      value: input.receipt.sealDigest.value,
    },
    decision: input.receipt.decision,
    verification,
    closureItems,
    nextActions,
  };
}

export function createOpsPromotionHandoffClosureVerification(input: {
  receipt: OpsPromotionHandoffReceipt;
  receiptVerification: OpsPromotionHandoffReceiptVerification;
  closure: OpsPromotionHandoffClosure;
}): OpsPromotionHandoffClosureVerification {
  const expectedClosure = createOpsPromotionHandoffClosure({
    receipt: input.receipt,
    receiptVerification: input.receiptVerification,
  });
  const recomputedClosureDigest = digestStable(archiveHandoffClosureDigestPayload({
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid: input.closure.valid,
    state: input.closure.state,
    handoffReady: input.closure.handoffReady,
    receiptDigest: input.closure.receiptDigest.value,
    verifiedReceiptDigest: input.closure.verifiedReceiptDigest.value,
    certificateDigest: input.closure.certificateDigest.value,
    verifiedCertificateDigest: input.closure.verifiedCertificateDigest.value,
    packageDigest: input.closure.packageDigest.value,
    verifiedPackageDigest: input.closure.verifiedPackageDigest.value,
    sealDigest: input.closure.sealDigest.value,
    decision: input.closure.decision,
    verification: input.closure.verification,
    closureItems: input.closure.closureItems,
    nextActions: input.closure.nextActions,
  }));
  const closureItemChecks = input.closure.closureItems.map((item) => {
    const expected = expectedClosure.closureItems.find((candidate) => candidate.name === item.name);
    const validMatches = expected?.valid === item.valid;
    const sourceMatches = expected?.source === item.source;
    const expectedDigest = expected?.digest ?? { algorithm: "sha256" as const, value: digestStable({ missing: item.name }) };
    const digestMatches = item.digest.value === expectedDigest.value;

    return {
      name: item.name,
      valid: expected !== undefined && validMatches && sourceMatches && digestMatches,
      validMatches,
      sourceMatches,
      digestMatches,
      closureDigest: { ...item.digest },
      recomputedDigest: expectedDigest,
      source: item.source,
    };
  });
  const checks = {
    closureDigestValid: input.closure.closureDigest.value === recomputedClosureDigest,
    coveredFieldsMatch: stableJson(input.closure.closureDigest.coveredFields)
      === stableJson(expectedClosure.closureDigest.coveredFields),
    closureItemsValid: closureItemChecks.length === expectedClosure.closureItems.length
      && closureItemChecks.every((item) => item.valid),
    closureNameMatches: input.closure.closureName === expectedClosure.closureName,
    receiptNameMatches: input.closure.receiptName === expectedClosure.receiptName,
    certificateNameMatches: input.closure.certificateName === expectedClosure.certificateName,
    packageNameMatches: input.closure.packageName === expectedClosure.packageName,
    archiveNameMatches: input.closure.archiveName === expectedClosure.archiveName,
    validMatches: input.closure.valid === expectedClosure.valid,
    stateMatches: input.closure.state === expectedClosure.state,
    handoffReadyMatches: input.closure.handoffReady === expectedClosure.handoffReady,
    receiptDigestMatches: input.closure.receiptDigest.value === expectedClosure.receiptDigest.value,
    verifiedReceiptDigestMatches: input.closure.verifiedReceiptDigest.value === expectedClosure.verifiedReceiptDigest.value,
    certificateDigestMatches: input.closure.certificateDigest.value === expectedClosure.certificateDigest.value,
    verifiedCertificateDigestMatches: input.closure.verifiedCertificateDigest.value === expectedClosure.verifiedCertificateDigest.value,
    packageDigestMatches: input.closure.packageDigest.value === expectedClosure.packageDigest.value,
    verifiedPackageDigestMatches: input.closure.verifiedPackageDigest.value === expectedClosure.verifiedPackageDigest.value,
    sealDigestMatches: input.closure.sealDigest.value === expectedClosure.sealDigest.value,
    decisionMatches: stableJson(input.closure.decision) === stableJson(expectedClosure.decision),
    verificationMatches: stableJson(input.closure.verification) === stableJson(expectedClosure.verification),
    nextActionsMatch: stableJson(input.closure.nextActions) === stableJson(expectedClosure.nextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    closureName: input.closure.closureName,
    receiptName: input.closure.receiptName,
    certificateName: input.closure.certificateName,
    packageName: input.closure.packageName,
    archiveName: input.closure.archiveName,
    valid,
    state: input.closure.state,
    handoffReady: input.closure.handoffReady,
    closureDigest: {
      algorithm: "sha256",
      value: input.closure.closureDigest.value,
    },
    recomputedClosureDigest: {
      algorithm: "sha256",
      value: recomputedClosureDigest,
    },
    checks,
    summary: {
      totalDecisions: input.closure.decision.totalDecisions,
      latestDecisionId: input.closure.decision.latestDecisionId,
      closureItemCount: closureItemChecks.length,
      handoffReady: input.closure.handoffReady,
    },
    closureItems: closureItemChecks,
    nextActions: archiveHandoffClosureVerificationNextActions(checks, input.closure),
  };
}

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

function manifestDigestPayload(input: {
  archiveName: string;
  state: OpsPromotionArchiveState;
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

function archiveBundleDigestPayload(bundle: OpsPromotionArchiveBundle) {
  return {
    archiveName: bundle.archiveName,
    state: bundle.state,
    summary: bundle.summary,
    latestEvidence: bundle.latestEvidence === undefined
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

function archiveVerificationDigestPayload(verification: OpsPromotionArchiveVerification) {
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

function archiveAttestationVerificationDigestPayload(verification: OpsPromotionArchiveAttestationVerification) {
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

function archiveAttestationDigestPayload(input: {
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

function archiveHandoffCertificateDigestPayload(input: {
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffCertificate["decision"];
  verification: OpsPromotionHandoffCertificate["verification"];
  attachments: OpsPromotionHandoffCertificateAttachment[];
  nextActions: string[];
}) {
  return {
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    attachments: input.attachments.map((attachment) => ({
      name: attachment.name,
      valid: attachment.valid,
      source: attachment.source,
      digest: attachment.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffReceiptDigestPayload(input: {
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffReceipt["decision"];
  verification: OpsPromotionHandoffReceipt["verification"];
  milestones: OpsPromotionHandoffReceiptMilestone[];
  nextActions: string[];
}) {
  return {
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    certificateDigest: input.certificateDigest,
    verifiedCertificateDigest: input.verifiedCertificateDigest,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    milestones: input.milestones.map((milestone) => ({
      name: milestone.name,
      valid: milestone.valid,
      source: milestone.source,
      digest: milestone.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffClosureDigestPayload(input: {
  closureName: string;
  receiptName: string;
  certificateName: string;
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  receiptDigest: string;
  verifiedReceiptDigest: string;
  certificateDigest: string;
  verifiedCertificateDigest: string;
  packageDigest: string;
  verifiedPackageDigest: string;
  sealDigest: string;
  decision: OpsPromotionHandoffClosure["decision"];
  verification: OpsPromotionHandoffClosure["verification"];
  closureItems: OpsPromotionHandoffClosureItem[];
  nextActions: string[];
}) {
  return {
    closureName: input.closureName,
    receiptName: input.receiptName,
    certificateName: input.certificateName,
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    receiptDigest: input.receiptDigest,
    verifiedReceiptDigest: input.verifiedReceiptDigest,
    certificateDigest: input.certificateDigest,
    verifiedCertificateDigest: input.verifiedCertificateDigest,
    packageDigest: input.packageDigest,
    verifiedPackageDigest: input.verifiedPackageDigest,
    sealDigest: input.sealDigest,
    decision: input.decision,
    verification: input.verification,
    closureItems: input.closureItems.map((item) => ({
      name: item.name,
      valid: item.valid,
      source: item.source,
      digest: item.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffPackageDigestPayload(input: {
  packageName: string;
  archiveName: string;
  valid: boolean;
  state: OpsPromotionArchiveAttestationState;
  handoffReady: boolean;
  sealDigest: string;
  manifestDigest: string;
  verificationDigest: string;
  summary: OpsPromotionHandoffPackage["summary"];
  attachments: OpsPromotionHandoffPackageAttachment[];
  nextActions: string[];
}) {
  return {
    packageName: input.packageName,
    archiveName: input.archiveName,
    valid: input.valid,
    state: input.state,
    handoffReady: input.handoffReady,
    sealDigest: input.sealDigest,
    manifestDigest: input.manifestDigest,
    verificationDigest: input.verificationDigest,
    summary: input.summary,
    attachments: input.attachments.map((attachment) => ({
      name: attachment.name,
      valid: attachment.valid,
      source: attachment.source,
      digest: attachment.digest.value,
    })),
    nextActions: input.nextActions,
  };
}

function archiveHandoffPackageAttachments(input: {
  bundle: OpsPromotionArchiveBundle;
  manifest: OpsPromotionArchiveManifest;
  verification: OpsPromotionArchiveVerification;
  attestation: OpsPromotionArchiveAttestation;
  attestationVerification: OpsPromotionArchiveAttestationVerification;
}): OpsPromotionHandoffPackageAttachment[] {
  return [
    {
      name: "archive-bundle",
      valid: input.bundle.summary.integrityValid,
      source: "/api/v1/ops/promotion-archive",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveBundleDigestPayload(input.bundle)),
      },
    },
    {
      name: "archive-manifest",
      valid: input.verification.checks.manifestDigestValid,
      source: "/api/v1/ops/promotion-archive/manifest",
      digest: { ...input.manifest.manifestDigest },
    },
    {
      name: "archive-verification",
      valid: input.verification.valid,
      source: "/api/v1/ops/promotion-archive/verification",
      digest: {
        algorithm: "sha256",
        value: input.attestation.verificationDigest.value,
      },
    },
    {
      name: "archive-attestation",
      valid: input.attestationVerification.checks.sealDigestValid,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: input.attestation.sealDigest.value,
      },
    },
    {
      name: "attestation-verification",
      valid: input.attestationVerification.valid,
      source: "/api/v1/ops/promotion-archive/attestation/verification",
      digest: {
        algorithm: "sha256",
        value: digestStable(archiveAttestationVerificationDigestPayload(input.attestationVerification)),
      },
    },
  ];
}

function archiveHandoffReceiptMilestones(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
): OpsPromotionHandoffReceiptMilestone[] {
  return [
    {
      name: "handoff-package",
      valid: certificate.valid && certificateVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: certificate.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: certificate.verification.packageVerified && certificateVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: certificate.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: certificateVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: certificate.sealDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: certificate.valid && certificateVerification.checks.certificateDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: certificate.certificateDigest.value,
      },
    },
    {
      name: "certificate-verification",
      valid: certificateVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: certificateVerification.recomputedCertificateDigest.value,
      },
    },
  ];
}

function archiveHandoffClosureItems(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
): OpsPromotionHandoffClosureItem[] {
  return [
    {
      name: "handoff-receipt",
      valid: receipt.valid && receiptVerification.checks.receiptDigestValid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt",
      digest: {
        algorithm: "sha256",
        value: receipt.receiptDigest.value,
      },
    },
    {
      name: "verified-handoff-receipt",
      valid: receiptVerification.valid,
      source: "/api/v1/ops/promotion-archive/handoff-receipt/verification",
      digest: {
        algorithm: "sha256",
        value: receiptVerification.recomputedReceiptDigest.value,
      },
    },
    {
      name: "handoff-certificate",
      valid: receiptVerification.checks.certificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate",
      digest: {
        algorithm: "sha256",
        value: receipt.certificateDigest.value,
      },
    },
    {
      name: "verified-handoff-certificate",
      valid: receiptVerification.checks.verifiedCertificateDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-certificate/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedCertificateDigest.value,
      },
    },
    {
      name: "handoff-package",
      valid: receiptVerification.checks.packageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package",
      digest: {
        algorithm: "sha256",
        value: receipt.packageDigest.value,
      },
    },
    {
      name: "verified-handoff-package",
      valid: receiptVerification.checks.verifiedPackageDigestMatches,
      source: "/api/v1/ops/promotion-archive/handoff-package/verification",
      digest: {
        algorithm: "sha256",
        value: receipt.verifiedPackageDigest.value,
      },
    },
    {
      name: "archive-seal",
      valid: receiptVerification.checks.sealDigestMatches,
      source: "/api/v1/ops/promotion-archive/attestation",
      digest: {
        algorithm: "sha256",
        value: receipt.sealDigest.value,
      },
    },
  ];
}

function archiveVerificationNextActions(
  manifestDigestValid: boolean,
  artifactsValid: boolean,
  manifest: OpsPromotionArchiveManifest,
): string[] {
  if (!manifestDigestValid) {
    return ["Regenerate the archive manifest before trusting this archive fingerprint."];
  }

  if (!artifactsValid) {
    return ["Review archive manifest artifacts before attaching this archive to a handoff record."];
  }

  if (manifest.state === "ready") {
    return ["Archive manifest is verified; keep the manifest digest with the promotion handoff record."];
  }

  return manifest.nextActions;
}

function archiveAttestationVerificationNextActions(
  checks: OpsPromotionArchiveAttestationVerification["checks"],
  attestation: OpsPromotionArchiveAttestation,
): string[] {
  if (!checks.sealDigestValid) {
    return ["Regenerate the archive attestation before trusting this seal digest."];
  }

  if (!checks.verificationDigestValid) {
    return ["Rebuild archive verification before trusting this attestation seal."];
  }

  if (!checks.manifestDigestMatches || !checks.decisionMatches || !checks.checksMatch || !checks.evidenceSourcesMatch) {
    return ["Recreate the archive attestation from the latest bundle, manifest, and verification objects."];
  }

  if (attestation.handoffReady) {
    return ["Attestation verification is complete; keep the verified seal digest with the promotion handoff record."];
  }

  return attestation.nextActions;
}

function archiveHandoffPackageNextActions(
  attestation: OpsPromotionArchiveAttestation,
  attestationVerification: OpsPromotionArchiveAttestationVerification,
): string[] {
  if (!attestationVerification.valid) {
    return ["Resolve attestation verification failures before sharing the promotion handoff package."];
  }

  if (attestation.handoffReady) {
    return ["Handoff package is ready; share the package digest and verified seal digest with the promotion handoff record."];
  }

  return attestationVerification.nextActions;
}

function archiveHandoffPackageVerificationNextActions(
  checks: OpsPromotionHandoffPackageVerification["checks"],
  handoffPackage: OpsPromotionHandoffPackage,
): string[] {
  if (!checks.packageDigestValid) {
    return ["Regenerate the handoff package before trusting this package digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff package attachments before sharing the promotion handoff package."];
  }

  if (!checks.summaryMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Recreate the handoff package from the latest verified archive chain."];
  }

  if (handoffPackage.handoffReady) {
    return ["Handoff package verification is complete; share the verified package digest with the promotion handoff record."];
  }

  return handoffPackage.nextActions;
}

function archiveHandoffCertificateNextActions(
  handoffPackage: OpsPromotionHandoffPackage,
  handoffPackageVerification: OpsPromotionHandoffPackageVerification,
  valid: boolean,
): string[] {
  if (!handoffPackageVerification.valid) {
    return ["Resolve handoff package verification failures before issuing a promotion handoff certificate."];
  }

  if (!valid) {
    return ["Regenerate the handoff package before issuing a promotion handoff certificate."];
  }

  if (handoffPackage.handoffReady) {
    return ["Promotion handoff certificate is ready; share the certificate digest with the handoff record."];
  }

  return handoffPackageVerification.nextActions;
}

function archiveHandoffCertificateVerificationNextActions(
  checks: OpsPromotionHandoffCertificateVerification["checks"],
  certificate: OpsPromotionHandoffCertificate,
): string[] {
  if (!checks.certificateDigestValid) {
    return ["Regenerate the handoff certificate before trusting this certificate digest."];
  }

  if (!checks.attachmentsValid) {
    return ["Review handoff certificate attachments before sharing the promotion handoff certificate."];
  }

  if (!checks.packageDigestMatches || !checks.verifiedPackageDigestMatches || !checks.sealDigestMatches) {
    return ["Recreate the handoff certificate from the latest verified handoff package."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff certificate from the latest package verification result."];
  }

  if (certificate.handoffReady) {
    return ["Handoff certificate verification is complete; share the verified certificate digest with the handoff record."];
  }

  return certificate.nextActions;
}

function archiveHandoffReceiptNextActions(
  certificate: OpsPromotionHandoffCertificate,
  certificateVerification: OpsPromotionHandoffCertificateVerification,
  valid: boolean,
): string[] {
  if (!certificateVerification.valid) {
    return ["Resolve handoff certificate verification failures before issuing a promotion handoff receipt."];
  }

  if (!valid) {
    return ["Regenerate the handoff receipt from a verified certificate before storing it."];
  }

  if (certificate.handoffReady) {
    return ["Promotion handoff receipt is ready; store the receipt digest with the final handoff record."];
  }

  return certificateVerification.nextActions;
}

function archiveHandoffReceiptVerificationNextActions(
  checks: OpsPromotionHandoffReceiptVerification["checks"],
  receipt: OpsPromotionHandoffReceipt,
): string[] {
  if (!checks.receiptDigestValid) {
    return ["Regenerate the handoff receipt before trusting this receipt digest."];
  }

  if (!checks.milestonesValid) {
    return ["Review handoff receipt milestones before storing the final handoff receipt."];
  }

  if (
    !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff receipt from the latest verified certificate chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff receipt from the latest receipt inputs."];
  }

  if (receipt.handoffReady) {
    return ["Handoff receipt verification is complete; store the verified receipt digest with the final handoff record."];
  }

  return receipt.nextActions;
}

function archiveHandoffClosureNextActions(
  receipt: OpsPromotionHandoffReceipt,
  receiptVerification: OpsPromotionHandoffReceiptVerification,
  valid: boolean,
): string[] {
  if (!receiptVerification.valid) {
    return ["Resolve handoff receipt verification failures before closing the promotion handoff."];
  }

  if (!valid) {
    return ["Regenerate the handoff closure from a verified receipt before marking the handoff closed."];
  }

  if (receipt.handoffReady) {
    return ["Promotion handoff closure is ready; record the closure digest and mark the handoff closed."];
  }

  return receiptVerification.nextActions;
}

function archiveHandoffClosureVerificationNextActions(
  checks: OpsPromotionHandoffClosureVerification["checks"],
  closure: OpsPromotionHandoffClosure,
): string[] {
  if (!checks.closureDigestValid) {
    return ["Regenerate the handoff closure before trusting this closure digest."];
  }

  if (!checks.closureItemsValid) {
    return ["Review handoff closure items before marking the promotion handoff closed."];
  }

  if (
    !checks.receiptDigestMatches
    || !checks.verifiedReceiptDigestMatches
    || !checks.certificateDigestMatches
    || !checks.verifiedCertificateDigestMatches
    || !checks.packageDigestMatches
    || !checks.verifiedPackageDigestMatches
    || !checks.sealDigestMatches
  ) {
    return ["Recreate the handoff closure from the latest verified receipt chain."];
  }

  if (!checks.decisionMatches || !checks.verificationMatches || !checks.nextActionsMatch || !checks.validMatches) {
    return ["Reissue the handoff closure from the latest closure inputs."];
  }

  if (closure.handoffReady) {
    return ["Handoff closure verification is complete; store the verified closure digest with the final handoff record."];
  }

  return closure.nextActions;
}

function archiveAttestationNextActions(
  state: OpsPromotionArchiveAttestationState,
  checks: OpsPromotionArchiveAttestation["checks"],
  bundle: OpsPromotionArchiveBundle,
  verification: OpsPromotionArchiveVerification,
): string[] {
  if (!verification.valid) {
    return ["Resolve archive verification failures before issuing a promotion archive attestation."];
  }

  if (bundle.summary.totalDecisions === 0 || state === "not-started") {
    return ["Record an approved promotion decision before issuing a promotion archive attestation."];
  }

  if (!checks.integrityVerified) {
    return ["Repair promotion decision ledger integrity before sealing the archive attestation."];
  }

  if (!checks.latestDecisionReady) {
    return ["Complete readiness, runbook, and baseline requirements before recording an approved promotion decision."];
  }

  if (!checks.archiveReady) {
    return bundle.nextActions;
  }

  return ["Archive attestation is ready; attach the seal digest to the promotion handoff record."];
}

function archiveState(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): OpsPromotionArchiveState {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return "empty";
  }

  if (!integrity.valid || !latestEvidence.summary.digestValid) {
    return "attention-required";
  }

  return latestEvidence.summary.outcome === "approved" ? "ready" : "attention-required";
}

function archiveNextActions(
  integrity: OpsPromotionDecisionLedgerIntegrity,
  latestEvidence: OpsPromotionEvidenceReport | undefined,
): string[] {
  if (integrity.totalRecords === 0 || latestEvidence === undefined) {
    return ["Record a promotion decision before building an archive bundle."];
  }

  if (!integrity.valid) {
    return ["Inspect promotion decision ledger integrity before trusting this archive bundle."];
  }

  if (!latestEvidence.summary.digestValid) {
    return ["Inspect the latest promotion decision digest before trusting this archive bundle."];
  }

  if (latestEvidence.summary.outcome === "approved") {
    return ["Archive bundle is internally consistent; keep it with the promotion handoff record."];
  }

  return latestEvidence.nextActions;
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

function digestStable(value: unknown): string {
  return createHash("sha256").update(stableJson(value)).digest("hex");
}

function stableJson(value: unknown): string {
  if (value === undefined) {
    return "null";
  }

  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
