import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
  type UpstreamContractFixtureScenarioId,
  type UpstreamContractFixtureScenarioMatrix,
} from "./upstreamContractFixtureScenarioMatrix.js";
import {
  createUpstreamContractFixtureScenarioMatrixVerification,
  type UpstreamContractFixtureScenarioMatrixVerification,
} from "./upstreamContractFixtureScenarioMatrixVerification.js";

export interface UpstreamContractFixtureScenarioVerificationArchiveBundleDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface UpstreamContractFixtureScenarioVerificationArchiveBundle {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  archiveBundleDigest: UpstreamContractFixtureScenarioVerificationArchiveBundleDigest;
  summary: {
    matrixValid: boolean;
    verificationValid: boolean;
    matrixDigestValid: boolean;
    scenarioCountValid: boolean;
    sourcePathsPresent: boolean;
    blockedReplaySemanticsStable: boolean;
    miniKvReadSemanticsStable: boolean;
    totalScenarios: number;
    validScenarios: number;
    diagnosticReadyScenarios: number;
    issueCount: number;
    sourcePathCount: number;
  };
  digests: {
    matrixDigest: string;
    recomputedMatrixDigest: string;
    verificationDigest: string;
  };
  scenarioIds: UpstreamContractFixtureScenarioId[];
  sourcePaths: Partial<Record<UpstreamContractFixtureScenarioId, string>>;
  scenarioEvidence: Array<{
    scenarioId: UpstreamContractFixtureScenarioId;
    project: string;
    role: string;
    sourcePath: string;
    sourceStatus: string;
    valid: boolean;
    diagnosticReady: boolean;
    failingCheckCount: number;
  }>;
  evidenceEndpoints: {
    scenarioMatrixJson: string;
    scenarioMatrixMarkdown: string;
    scenarioMatrixVerificationJson: string;
    scenarioMatrixVerificationMarkdown: string;
    scenarioMatrixVerificationArchiveBundleJson: string;
    scenarioMatrixVerificationArchiveBundleMarkdown: string;
  };
  matrix: UpstreamContractFixtureScenarioMatrix;
  verification: UpstreamContractFixtureScenarioMatrixVerification;
  nextActions: string[];
}

const ARCHIVE_BUNDLE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "readOnly",
  "executionAllowed",
  "summary",
  "digests",
  "scenarioIds",
  "sourcePaths",
  "scenarioEvidence",
  "evidenceEndpoints",
  "nextActions",
]);

const VERIFICATION_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "storedMatrixDigest",
  "recomputedMatrixDigest",
  "expectedScenarioIds",
  "checks",
  "summary",
  "scenarioChecks",
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
});

export async function loadUpstreamContractFixtureScenarioVerificationArchiveBundle(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioVerificationArchiveBundle> {
  const matrix = await loadUpstreamContractFixtureScenarioMatrix(config);
  return createUpstreamContractFixtureScenarioVerificationArchiveBundle(
    matrix,
    createUpstreamContractFixtureScenarioMatrixVerification(matrix),
  );
}

export function createUpstreamContractFixtureScenarioVerificationArchiveBundle(
  matrix: UpstreamContractFixtureScenarioMatrix,
  verification: UpstreamContractFixtureScenarioMatrixVerification,
): UpstreamContractFixtureScenarioVerificationArchiveBundle {
  const scenarioIds = verification.expectedScenarioIds;
  const sourcePaths = verification.summary.sourcePaths;
  const scenarioEvidence = matrix.scenarios.map((scenario) => ({
    scenarioId: scenario.id,
    project: scenario.project,
    role: scenario.role,
    sourcePath: scenario.source.path,
    sourceStatus: scenario.source.status,
    valid: scenario.valid,
    diagnosticReady: scenario.diagnosticReady,
    failingCheckCount: scenario.failingCheckCount,
  }));
  const checks = verification.checks;
  const sourcePathCount = Object.values(sourcePaths).filter((sourcePath) => typeof sourcePath === "string" && sourcePath.length > 0).length;
  const verificationDigest = digestUpstreamContractFixtureScenarioMatrixVerification(verification);
  const summary = {
    matrixValid: matrix.valid,
    verificationValid: verification.valid,
    matrixDigestValid: checks.matrixDigestValid,
    scenarioCountValid: checks.scenarioCountValid,
    sourcePathsPresent: checks.sourcePathsPresent,
    blockedReplaySemanticsStable: checks.blockedReplaySemanticsStable,
    miniKvReadSemanticsStable: checks.miniKvReadSemanticsStable,
    totalScenarios: matrix.summary.totalScenarios,
    validScenarios: matrix.summary.validScenarios,
    diagnosticReadyScenarios: matrix.summary.diagnosticReadyScenarios,
    issueCount: matrix.summary.issueCount,
    sourcePathCount,
  };
  const valid = Object.values(summary)
    .filter((value): value is boolean => typeof value === "boolean")
    .every((value) => value)
    && summary.issueCount === 0
    && summary.totalScenarios === scenarioIds.length
    && summary.sourcePathCount === scenarioIds.length;
  const digests = {
    matrixDigest: `${matrix.matrixDigest.algorithm}:${matrix.matrixDigest.value}`,
    recomputedMatrixDigest: `${verification.recomputedMatrixDigest.algorithm}:${verification.recomputedMatrixDigest.value}`,
    verificationDigest: `${verificationDigest.algorithm}:${verificationDigest.value}`,
  };
  const nextActions = collectNextActions(valid);
  const bundleWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream fixture scenario verification archive bundle",
    generatedAt: new Date().toISOString(),
    valid,
    readOnly: true as const,
    executionAllowed: false as const,
    summary,
    digests,
    scenarioIds,
    sourcePaths,
    scenarioEvidence,
    evidenceEndpoints: { ...ENDPOINTS },
    matrix,
    verification,
    nextActions,
  };

  return {
    ...bundleWithoutDigest,
    archiveBundleDigest: digestUpstreamContractFixtureScenarioVerificationArchiveBundle(bundleWithoutDigest),
  };
}

export function renderUpstreamContractFixtureScenarioVerificationArchiveBundleMarkdown(
  bundle: UpstreamContractFixtureScenarioVerificationArchiveBundle,
): string {
  return [
    "# Upstream fixture scenario verification archive bundle",
    "",
    `- Service: ${bundle.service}`,
    `- Generated at: ${bundle.generatedAt}`,
    `- Valid: ${bundle.valid}`,
    `- Read only: ${bundle.readOnly}`,
    `- Execution allowed: ${bundle.executionAllowed}`,
    `- Archive bundle digest: ${bundle.archiveBundleDigest.algorithm}:${bundle.archiveBundleDigest.value}`,
    "",
    "## Summary",
    "",
    ...renderEntries(bundle.summary),
    "",
    "## Digests",
    "",
    ...renderEntries(bundle.digests),
    "",
    "## Scenario IDs",
    "",
    ...bundle.scenarioIds.map((scenarioId) => `- ${scenarioId}`),
    "",
    "## Scenario Sources",
    "",
    ...bundle.scenarioIds.map((scenarioId) => `- ${scenarioId}: ${bundle.sourcePaths[scenarioId] ?? "missing"}`),
    "",
    "## Scenario Evidence",
    "",
    ...bundle.scenarioEvidence.flatMap((scenario) => [
      `### ${scenario.scenarioId}`,
      "",
      `- Project: ${scenario.project}`,
      `- Role: ${scenario.role}`,
      `- Source status: ${scenario.sourceStatus}`,
      `- Source path: ${scenario.sourcePath}`,
      `- Valid: ${scenario.valid}`,
      `- Diagnostic ready: ${scenario.diagnosticReady}`,
      `- Failing check count: ${scenario.failingCheckCount}`,
      "",
    ]),
    "## Evidence Endpoints",
    "",
    ...renderEntries(bundle.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(bundle.nextActions, "No next actions."),
    "",
  ].join("\n");
}

export function digestUpstreamContractFixtureScenarioVerificationArchiveBundle(
  bundle: Omit<UpstreamContractFixtureScenarioVerificationArchiveBundle, "archiveBundleDigest">,
): UpstreamContractFixtureScenarioVerificationArchiveBundleDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: bundle.service,
        valid: bundle.valid,
        readOnly: bundle.readOnly,
        executionAllowed: bundle.executionAllowed,
        summary: bundle.summary,
        digests: bundle.digests,
        scenarioIds: bundle.scenarioIds,
        sourcePaths: bundle.sourcePaths,
        scenarioEvidence: bundle.scenarioEvidence,
        evidenceEndpoints: bundle.evidenceEndpoints,
        nextActions: bundle.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...ARCHIVE_BUNDLE_DIGEST_COVERED_FIELDS],
  };
}

function digestUpstreamContractFixtureScenarioMatrixVerification(
  verification: UpstreamContractFixtureScenarioMatrixVerification,
): UpstreamContractFixtureScenarioVerificationArchiveBundleDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: verification.service,
        valid: verification.valid,
        storedMatrixDigest: verification.storedMatrixDigest,
        recomputedMatrixDigest: verification.recomputedMatrixDigest,
        expectedScenarioIds: verification.expectedScenarioIds,
        checks: verification.checks,
        summary: verification.summary,
        scenarioChecks: verification.scenarioChecks,
        evidenceEndpoints: verification.evidenceEndpoints,
        nextActions: verification.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...VERIFICATION_DIGEST_COVERED_FIELDS],
  };
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Scenario verification archive bundle is ready to attach to release evidence.",
      "Keep this bundle read-only; it proves fixture scenario evidence, not upstream execution approval.",
    ];
  }

  return [
    "Resolve scenario matrix or verification failures before archiving this bundle as release evidence.",
    "Do not auto-repair fixtures and do not use this bundle as a real upstream execution permit.",
  ];
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
