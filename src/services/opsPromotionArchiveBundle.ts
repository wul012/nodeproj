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
