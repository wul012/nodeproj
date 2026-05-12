import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
  type UpstreamContractFixtureScenarioMatrix,
} from "./upstreamContractFixtureScenarioMatrix.js";
import {
  createUpstreamContractFixtureScenarioMatrixVerification,
  type UpstreamContractFixtureScenarioMatrixVerification,
} from "./upstreamContractFixtureScenarioMatrixVerification.js";
import {
  createUpstreamContractFixtureScenarioVerificationArchiveBundle,
  digestUpstreamContractFixtureScenarioMatrixVerification,
  type UpstreamContractFixtureScenarioVerificationArchiveBundle,
  type UpstreamContractFixtureScenarioVerificationArchiveBundleDigest,
} from "./upstreamContractFixtureScenarioVerificationArchiveBundle.js";
import {
  createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
  type UpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
} from "./upstreamContractFixtureScenarioVerificationArchiveBundleVerification.js";

export type UpstreamContractFixtureScenarioReleaseEvidenceId =
  | "scenario-matrix"
  | "scenario-matrix-verification"
  | "scenario-archive-bundle"
  | "scenario-archive-bundle-verification";

export interface UpstreamContractFixtureScenarioReleaseEvidenceIndex {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  maturityTarget: "production-leaning";
  releaseEvidenceDigest: UpstreamContractFixtureScenarioVerificationArchiveBundleDigest;
  checks: {
    allEvidenceValid: boolean;
    allEvidenceReadOnly: boolean;
    executionNeverAllowed: boolean;
    digestsPresent: boolean;
    archiveVerificationValid: boolean;
    sourcePathCoverageValid: boolean;
    scenarioEvidenceCoverageValid: boolean;
  };
  summary: {
    evidenceCount: number;
    validEvidenceCount: number;
    invalidEvidenceCount: number;
    readOnlyEvidenceCount: number;
    executionAllowedEvidenceCount: number;
    digestCount: number;
    totalScenarios: number;
    sourcePathCount: number;
    scenarioEvidenceCount: number;
    issueCount: number;
  };
  evidence: UpstreamContractFixtureScenarioReleaseEvidenceEntry[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

export interface UpstreamContractFixtureScenarioReleaseEvidenceEntry {
  id: UpstreamContractFixtureScenarioReleaseEvidenceId;
  title: string;
  jsonEndpoint: string;
  markdownEndpoint: string;
  digest: string;
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  boundary: {
    evidenceOnly: true;
    canAuthorizeExecution: false;
  };
  summary: Record<string, unknown>;
}

const RELEASE_EVIDENCE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "readOnly",
  "executionAllowed",
  "maturityTarget",
  "checks",
  "summary",
  "evidence",
  "evidenceEndpoints",
  "nextActions",
]);

const ENDPOINTS = Object.freeze({
  scenarioMatrixJson: "/api/v1/upstream-contract-fixtures/scenario-matrix",
  scenarioMatrixMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown",
  scenarioMatrixVerificationJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
  scenarioMatrixVerificationMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification?format=markdown",
  scenarioMatrixVerificationArchiveBundleJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
  scenarioMatrixVerificationArchiveBundleMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown",
  scenarioMatrixVerificationArchiveBundleVerificationJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification",
  scenarioMatrixVerificationArchiveBundleVerificationMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle/verification?format=markdown",
  scenarioReleaseEvidenceIndexJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
  scenarioReleaseEvidenceIndexMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index?format=markdown",
});

export async function loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioReleaseEvidenceIndex> {
  const matrix = await loadUpstreamContractFixtureScenarioMatrix(config);
  const verification = createUpstreamContractFixtureScenarioMatrixVerification(matrix);
  const archiveBundle = createUpstreamContractFixtureScenarioVerificationArchiveBundle(matrix, verification);
  const archiveVerification = createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(archiveBundle);

  return createUpstreamContractFixtureScenarioReleaseEvidenceIndex(
    matrix,
    verification,
    archiveBundle,
    archiveVerification,
  );
}

export function createUpstreamContractFixtureScenarioReleaseEvidenceIndex(
  matrix: UpstreamContractFixtureScenarioMatrix,
  verification: UpstreamContractFixtureScenarioMatrixVerification,
  archiveBundle: UpstreamContractFixtureScenarioVerificationArchiveBundle,
  archiveVerification: UpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
): UpstreamContractFixtureScenarioReleaseEvidenceIndex {
  const verificationDigest = digestUpstreamContractFixtureScenarioMatrixVerification(verification);
  const evidence = [
    createEvidenceEntry({
      id: "scenario-matrix",
      title: matrix.title,
      jsonEndpoint: ENDPOINTS.scenarioMatrixJson,
      markdownEndpoint: ENDPOINTS.scenarioMatrixMarkdown,
      digest: `${matrix.matrixDigest.algorithm}:${matrix.matrixDigest.value}`,
      valid: matrix.valid,
      summary: {
        totalScenarios: matrix.summary.totalScenarios,
        validScenarios: matrix.summary.validScenarios,
        issueCount: matrix.summary.issueCount,
      },
    }),
    createEvidenceEntry({
      id: "scenario-matrix-verification",
      title: verification.title,
      jsonEndpoint: ENDPOINTS.scenarioMatrixVerificationJson,
      markdownEndpoint: ENDPOINTS.scenarioMatrixVerificationMarkdown,
      digest: `${verificationDigest.algorithm}:${verificationDigest.value}`,
      valid: verification.valid,
      summary: {
        matrixDigestValid: verification.checks.matrixDigestValid,
        scenarioCountValid: verification.checks.scenarioCountValid,
        blockedReplaySemanticsStable: verification.checks.blockedReplaySemanticsStable,
        miniKvReadSemanticsStable: verification.checks.miniKvReadSemanticsStable,
      },
    }),
    createEvidenceEntry({
      id: "scenario-archive-bundle",
      title: archiveBundle.title,
      jsonEndpoint: ENDPOINTS.scenarioMatrixVerificationArchiveBundleJson,
      markdownEndpoint: ENDPOINTS.scenarioMatrixVerificationArchiveBundleMarkdown,
      digest: `${archiveBundle.archiveBundleDigest.algorithm}:${archiveBundle.archiveBundleDigest.value}`,
      valid: archiveBundle.valid,
      summary: {
        verificationValid: archiveBundle.summary.verificationValid,
        sourcePathCount: archiveBundle.summary.sourcePathCount,
        scenarioEvidenceCount: archiveBundle.scenarioEvidence.length,
        issueCount: archiveBundle.summary.issueCount,
      },
    }),
    createEvidenceEntry({
      id: "scenario-archive-bundle-verification",
      title: archiveVerification.title,
      jsonEndpoint: ENDPOINTS.scenarioMatrixVerificationArchiveBundleVerificationJson,
      markdownEndpoint: ENDPOINTS.scenarioMatrixVerificationArchiveBundleVerificationMarkdown,
      digest: archiveVerification.recomputedArchiveBundleDigest.algorithm + ":" + archiveVerification.recomputedArchiveBundleDigest.value,
      valid: archiveVerification.valid,
      summary: {
        archiveBundleDigestValid: archiveVerification.checks.archiveBundleDigestValid,
        verificationDigestValid: archiveVerification.checks.verificationDigestValid,
        readOnlyStillTrue: archiveVerification.checks.readOnlyStillTrue,
        executionAllowedStillFalse: archiveVerification.checks.executionAllowedStillFalse,
      },
    }),
  ];
  const checks = {
    allEvidenceValid: evidence.every((entry) => entry.valid),
    allEvidenceReadOnly: evidence.every((entry) => entry.readOnly),
    executionNeverAllowed: evidence.every((entry) => !entry.executionAllowed),
    digestsPresent: evidence.every((entry) => isDigest(entry.digest)),
    archiveVerificationValid: archiveVerification.valid,
    sourcePathCoverageValid: archiveVerification.checks.sourcePathCountValid,
    scenarioEvidenceCoverageValid: archiveVerification.checks.scenarioEvidenceCountValid,
  };
  const summary = {
    evidenceCount: evidence.length,
    validEvidenceCount: evidence.filter((entry) => entry.valid).length,
    invalidEvidenceCount: evidence.filter((entry) => !entry.valid).length,
    readOnlyEvidenceCount: evidence.filter((entry) => entry.readOnly).length,
    executionAllowedEvidenceCount: evidence.filter((entry) => entry.executionAllowed).length,
    digestCount: evidence.filter((entry) => isDigest(entry.digest)).length,
    totalScenarios: archiveVerification.summary.totalScenarios,
    sourcePathCount: archiveVerification.summary.sourcePathCount,
    scenarioEvidenceCount: archiveVerification.summary.scenarioEvidenceCount,
    issueCount: archiveVerification.summary.issueCount,
  };
  const valid = Object.values(checks).every((check) => check)
    && summary.validEvidenceCount === summary.evidenceCount
    && summary.invalidEvidenceCount === 0
    && summary.executionAllowedEvidenceCount === 0
    && summary.issueCount === 0;
  const indexWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream fixture scenario release evidence index",
    generatedAt: new Date().toISOString(),
    valid,
    readOnly: true as const,
    executionAllowed: false as const,
    maturityTarget: "production-leaning" as const,
    checks,
    summary,
    evidence,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };

  return {
    ...indexWithoutDigest,
    releaseEvidenceDigest: digestUpstreamContractFixtureScenarioReleaseEvidenceIndex(indexWithoutDigest),
  };
}

export function renderUpstreamContractFixtureScenarioReleaseEvidenceIndexMarkdown(
  index: UpstreamContractFixtureScenarioReleaseEvidenceIndex,
): string {
  return [
    "# Upstream fixture scenario release evidence index",
    "",
    `- Service: ${index.service}`,
    `- Generated at: ${index.generatedAt}`,
    `- Valid: ${index.valid}`,
    `- Read only: ${index.readOnly}`,
    `- Execution allowed: ${index.executionAllowed}`,
    `- Maturity target: ${index.maturityTarget}`,
    `- Release evidence digest: ${index.releaseEvidenceDigest.algorithm}:${index.releaseEvidenceDigest.value}`,
    "",
    "## Checks",
    "",
    ...renderEntries(index.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(index.summary),
    "",
    "## Evidence",
    "",
    ...index.evidence.flatMap(renderEvidenceEntry),
    "## Evidence Endpoints",
    "",
    ...renderEntries(index.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(index.nextActions, "No next actions."),
    "",
  ].join("\n");
}

export function digestUpstreamContractFixtureScenarioReleaseEvidenceIndex(
  index: Omit<UpstreamContractFixtureScenarioReleaseEvidenceIndex, "releaseEvidenceDigest">,
): UpstreamContractFixtureScenarioVerificationArchiveBundleDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: index.service,
        valid: index.valid,
        readOnly: index.readOnly,
        executionAllowed: index.executionAllowed,
        maturityTarget: index.maturityTarget,
        checks: index.checks,
        summary: index.summary,
        evidence: index.evidence,
        evidenceEndpoints: index.evidenceEndpoints,
        nextActions: index.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...RELEASE_EVIDENCE_DIGEST_COVERED_FIELDS],
  };
}

function createEvidenceEntry(
  input: Omit<UpstreamContractFixtureScenarioReleaseEvidenceEntry, "readOnly" | "executionAllowed" | "boundary">,
): UpstreamContractFixtureScenarioReleaseEvidenceEntry {
  return {
    ...input,
    readOnly: true,
    executionAllowed: false,
    boundary: {
      evidenceOnly: true,
      canAuthorizeExecution: false,
    },
  };
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Attach this release evidence index to the Node release archive and CI evidence trail.",
      "Keep this index read-only; it summarizes evidence and does not permit Java replay or mini-kv writes.",
      "Next production-level work should connect this index to automated release gates rather than adding more manual-only evidence.",
    ];
  }

  return [
    "Resolve invalid evidence before treating this release evidence index as complete.",
    "Do not auto-repair fixtures and do not execute upstream mutations from this index.",
  ];
}

function renderEvidenceEntry(entry: UpstreamContractFixtureScenarioReleaseEvidenceEntry): string[] {
  return [
    `### ${entry.id}`,
    "",
    `- Title: ${entry.title}`,
    `- Valid: ${entry.valid}`,
    `- Read only: ${entry.readOnly}`,
    `- Execution allowed: ${entry.executionAllowed}`,
    `- Digest: ${entry.digest}`,
    `- JSON endpoint: ${entry.jsonEndpoint}`,
    `- Markdown endpoint: ${entry.markdownEndpoint}`,
    `- Evidence only: ${entry.boundary.evidenceOnly}`,
    `- Can authorize execution: ${entry.boundary.canAuthorizeExecution}`,
    "",
    "#### Summary",
    "",
    ...renderEntries(entry.summary),
    "",
  ];
}

function isDigest(value: string): boolean {
  return /^sha256:[a-f0-9]{64}$/i.test(value);
}

function renderEntries(record: Record<string, unknown>): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function stableJson(value: unknown): string {
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
