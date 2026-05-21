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

