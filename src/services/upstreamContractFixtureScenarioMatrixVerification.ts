import type { AppConfig } from "../config.js";
import {
  digestUpstreamContractFixtureScenarioMatrix,
  loadUpstreamContractFixtureScenarioMatrix,
  type UpstreamContractFixtureScenario,
  type UpstreamContractFixtureScenarioId,
  type UpstreamContractFixtureScenarioMatrix,
  type UpstreamContractFixtureScenarioMatrixDigest,
} from "./upstreamContractFixtureScenarioMatrix.js";

export interface UpstreamContractFixtureScenarioMatrixVerification {
  service: "orderops-node";
  title: string;
  verifiedAt: string;
  valid: boolean;
  storedMatrixDigest: UpstreamContractFixtureScenarioMatrixDigest;
  recomputedMatrixDigest: UpstreamContractFixtureScenarioMatrixDigest;
  expectedScenarioIds: UpstreamContractFixtureScenarioId[];
  checks: {
    matrixDigestValid: boolean;
    scenarioCountValid: boolean;
    expectedScenarioIdsPresent: boolean;
    noUnexpectedScenarioIds: boolean;
    summaryCountsMatchScenarios: boolean;
    sourcePathsPresent: boolean;
    driftIssueCountMatches: boolean;
    matrixValidityConsistent: boolean;
    blockedReplaySemanticsStable: boolean;
    miniKvReadSemanticsStable: boolean;
  };
  summary: {
    matrixValid: boolean;
    totalScenarios: number;
    validScenarios: number;
    diagnosticReadyScenarios: number;
    issueCount: number;
    missingScenarioIds: UpstreamContractFixtureScenarioId[];
    unexpectedScenarioIds: string[];
    sourcePaths: Partial<Record<UpstreamContractFixtureScenarioId, string>>;
  };
  scenarioChecks: Array<{
    scenarioId: UpstreamContractFixtureScenarioId;
    present: boolean;
    sourceStatus: string;
    sourcePath?: string;
    valid: boolean;
    diagnosticReady: boolean;
    failingCheckCount: number;
  }>;
  evidenceEndpoints: {
    scenarioMatrixJson: string;
    scenarioMatrixMarkdown: string;
    scenarioMatrixVerificationJson: string;
    scenarioMatrixVerificationMarkdown: string;
  };
  nextActions: string[];
}

const EXPECTED_SCENARIO_IDS: readonly UpstreamContractFixtureScenarioId[] = Object.freeze([
  "java-approved-replay-contract",
  "java-blocked-replay-contract",
  "mini-kv-write-checkjson",
  "mini-kv-read-checkjson",
]);

const ENDPOINTS = Object.freeze({
  scenarioMatrixJson: "/api/v1/upstream-contract-fixtures/scenario-matrix",
  scenarioMatrixMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown",
  scenarioMatrixVerificationJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification",
  scenarioMatrixVerificationMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification?format=markdown",
});

export async function loadUpstreamContractFixtureScenarioMatrixVerification(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioMatrixVerification> {
  return createUpstreamContractFixtureScenarioMatrixVerification(
    await loadUpstreamContractFixtureScenarioMatrix(config),
  );
}

export function createUpstreamContractFixtureScenarioMatrixVerification(
  matrix: UpstreamContractFixtureScenarioMatrix,
): UpstreamContractFixtureScenarioMatrixVerification {
  const recomputedMatrixDigest = digestUpstreamContractFixtureScenarioMatrix(stripMatrixDigest(matrix));
  const expectedScenarios = EXPECTED_SCENARIO_IDS.map((scenarioId) => ({
    scenarioId,
    scenario: findScenario(matrix, scenarioId),
  }));
  const missingScenarioIds = expectedScenarios
    .filter(({ scenario }) => scenario === undefined)
    .map(({ scenarioId }) => scenarioId);
  const unexpectedScenarioIds = matrix.scenarios
    .map((scenario) => scenario.id)
    .filter((scenarioId) => !EXPECTED_SCENARIO_IDS.includes(scenarioId));
  const sourcePaths = Object.fromEntries(
    expectedScenarios
      .filter((entry): entry is { scenarioId: UpstreamContractFixtureScenarioId; scenario: UpstreamContractFixtureScenario } => entry.scenario !== undefined)
      .map(({ scenarioId, scenario }) => [scenarioId, scenario.source.path]),
  ) as Partial<Record<UpstreamContractFixtureScenarioId, string>>;
  const checks = {
    matrixDigestValid: matrix.matrixDigest.value === recomputedMatrixDigest.value,
    scenarioCountValid: matrix.summary.totalScenarios === EXPECTED_SCENARIO_IDS.length
      && matrix.scenarios.length === EXPECTED_SCENARIO_IDS.length,
    expectedScenarioIdsPresent: missingScenarioIds.length === 0,
    noUnexpectedScenarioIds: unexpectedScenarioIds.length === 0,
    summaryCountsMatchScenarios: summaryCountsMatchScenarios(matrix),
    sourcePathsPresent: expectedScenarios.every(({ scenario }) => sourcePathPresent(scenario)),
    driftIssueCountMatches: matrix.summary.issueCount === matrix.driftSummary.issueCount
      && matrix.driftSummary.hasDrift === (matrix.driftSummary.issueCount > 0),
    matrixValidityConsistent: matrix.valid === matrix.scenarios.every((scenario) => scenario.valid && scenario.diagnosticReady),
    blockedReplaySemanticsStable: blockedReplaySemanticsStable(findScenario(matrix, "java-blocked-replay-contract")),
    miniKvReadSemanticsStable: miniKvReadSemanticsStable(findScenario(matrix, "mini-kv-read-checkjson")),
  };
  const valid = Object.values(checks).every((check) => check);

  return {
    service: "orderops-node",
    title: "Upstream fixture scenario matrix verification",
    verifiedAt: new Date().toISOString(),
    valid,
    storedMatrixDigest: matrix.matrixDigest,
    recomputedMatrixDigest,
    expectedScenarioIds: [...EXPECTED_SCENARIO_IDS],
    checks,
    summary: {
      matrixValid: matrix.valid,
      totalScenarios: matrix.summary.totalScenarios,
      validScenarios: matrix.summary.validScenarios,
      diagnosticReadyScenarios: matrix.summary.diagnosticReadyScenarios,
      issueCount: matrix.summary.issueCount,
      missingScenarioIds,
      unexpectedScenarioIds,
      sourcePaths,
    },
    scenarioChecks: expectedScenarios.map(({ scenarioId, scenario }) => ({
      scenarioId,
      present: scenario !== undefined,
      sourceStatus: scenario?.source.status ?? "missing",
      ...(scenario?.source.path === undefined ? {} : { sourcePath: scenario.source.path }),
      valid: scenario?.valid ?? false,
      diagnosticReady: scenario?.diagnosticReady ?? false,
      failingCheckCount: scenario?.failingCheckCount ?? -1,
    })),
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };
}

export function renderUpstreamContractFixtureScenarioMatrixVerificationMarkdown(
  verification: UpstreamContractFixtureScenarioMatrixVerification,
): string {
  return [
    "# Upstream fixture scenario matrix verification",
    "",
    `- Service: ${verification.service}`,
    `- Verified at: ${verification.verifiedAt}`,
    `- Valid: ${verification.valid}`,
    `- Stored matrix digest: ${verification.storedMatrixDigest.algorithm}:${verification.storedMatrixDigest.value}`,
    `- Recomputed matrix digest: ${verification.recomputedMatrixDigest.algorithm}:${verification.recomputedMatrixDigest.value}`,
    "",
    "## Checks",
    "",
    ...renderEntries(verification.checks),
    "",
    "## Summary",
    "",
    `- Matrix valid: ${verification.summary.matrixValid}`,
    `- Total scenarios: ${verification.summary.totalScenarios}`,
    `- Valid scenarios: ${verification.summary.validScenarios}`,
    `- Diagnostic-ready scenarios: ${verification.summary.diagnosticReadyScenarios}`,
    `- Issue count: ${verification.summary.issueCount}`,
    `- Missing scenario ids: ${formatList(verification.summary.missingScenarioIds)}`,
    `- Unexpected scenario ids: ${formatList(verification.summary.unexpectedScenarioIds)}`,
    "",
    "## Source Paths",
    "",
    ...EXPECTED_SCENARIO_IDS.map((scenarioId) => `- ${scenarioId}: ${verification.summary.sourcePaths[scenarioId] ?? "missing"}`),
    "",
    "## Scenario Checks",
    "",
    ...verification.scenarioChecks.flatMap((scenario) => [
      `### ${scenario.scenarioId}`,
      "",
      `- Present: ${scenario.present}`,
      `- Source status: ${scenario.sourceStatus}`,
      `- Source path: ${scenario.sourcePath ?? "missing"}`,
      `- Valid: ${scenario.valid}`,
      `- Diagnostic ready: ${scenario.diagnosticReady}`,
      `- Failing check count: ${scenario.failingCheckCount}`,
      "",
    ]),
    "## Evidence Endpoints",
    "",
    ...renderEntries(verification.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function stripMatrixDigest(
  matrix: UpstreamContractFixtureScenarioMatrix,
): Omit<UpstreamContractFixtureScenarioMatrix, "matrixDigest"> {
  const { matrixDigest: _matrixDigest, ...withoutDigest } = matrix;
  return withoutDigest;
}

function findScenario(
  matrix: UpstreamContractFixtureScenarioMatrix,
  scenarioId: UpstreamContractFixtureScenarioId,
): UpstreamContractFixtureScenario | undefined {
  return matrix.scenarios.find((scenario) => scenario.id === scenarioId);
}

function summaryCountsMatchScenarios(matrix: UpstreamContractFixtureScenarioMatrix): boolean {
  return matrix.summary.totalScenarios === matrix.scenarios.length
    && matrix.summary.validScenarios === matrix.scenarios.filter((scenario) => scenario.valid).length
    && matrix.summary.diagnosticReadyScenarios === matrix.scenarios.filter((scenario) => scenario.diagnosticReady).length
    && matrix.summary.javaScenarioCount === matrix.scenarios.filter((scenario) => scenario.project === "java").length
    && matrix.summary.miniKvScenarioCount === matrix.scenarios.filter((scenario) => scenario.project === "mini-kv").length;
}

function sourcePathPresent(scenario: UpstreamContractFixtureScenario | undefined): boolean {
  return scenario !== undefined
    && scenario.source.status === "available"
    && typeof scenario.source.path === "string"
    && scenario.source.path.length > 0;
}

function blockedReplaySemanticsStable(scenario: UpstreamContractFixtureScenario | undefined): boolean {
  if (scenario === undefined) {
    return false;
  }

  return scenario.project === "java"
    && scenario.role === "blocked-replay"
    && scenario.valid
    && scenario.diagnosticReady
    && scenario.keyFields.replayPreconditionsSatisfied === false
    && Array.isArray(scenario.keyFields.blockedBy)
    && scenario.keyFields.blockedBy.length > 0
    && scenario.keyFields.expectedSideEffectCount === 0
    && isPositiveNumber(scenario.keyFields.failedExecutionCheckCount);
}

function miniKvReadSemanticsStable(scenario: UpstreamContractFixtureScenario | undefined): boolean {
  if (scenario === undefined) {
    return false;
  }

  return scenario.project === "mini-kv"
    && scenario.role === "read-checkjson"
    && scenario.valid
    && scenario.diagnosticReady
    && scenario.keyFields.command === "GET"
    && scenario.keyFields.readOnly === true
    && scenario.keyFields.executionAllowed === false
    && Array.isArray(scenario.keyFields.sideEffects)
    && scenario.keyFields.sideEffects.length === 1
    && scenario.keyFields.sideEffects[0] === "store_read"
    && scenario.keyFields.sideEffectCount === 1;
}

function isPositiveNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Scenario matrix verification is clean; archive this report beside the v80 smoke evidence.",
      "Keep using this report as read-only evidence, not as a real upstream execution permit.",
    ];
  }

  return [
    "Resolve scenario matrix verification failures before relying on this matrix for release evidence.",
    "Do not auto-repair fixtures and do not call Java replay or mini-kv write commands from this verification.",
  ];
}

function renderEntries(record: Record<string, unknown>): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatList(items: string[]): string {
  return items.length === 0 ? "-" : items.join(", ");
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
