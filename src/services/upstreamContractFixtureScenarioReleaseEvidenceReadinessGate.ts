import type { AppConfig } from "../config.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceIndex,
  type UpstreamContractFixtureScenarioReleaseEvidenceEntry,
  type UpstreamContractFixtureScenarioReleaseEvidenceIndex,
} from "./upstreamContractFixtureScenarioReleaseEvidenceIndex.js";

export interface UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate {
  service: "orderops-node";
  title: string;
  evaluatedAt: string;
  readyForReleaseEvidenceArchive: boolean;
  readOnly: true;
  executionAllowed: false;
  sourceIndexDigest: string;
  checks: {
    indexValid: boolean;
    indexReadOnly: boolean;
    indexExecutionBlocked: boolean;
    evidenceCountComplete: boolean;
    allEvidenceValid: boolean;
    allEvidenceReadOnly: boolean;
    executionNeverAllowed: boolean;
    digestCoverageComplete: boolean;
    sourcePathCoverageValid: boolean;
    scenarioEvidenceCoverageValid: boolean;
    noScenarioIssues: boolean;
    maturityTargetProductionLeaning: boolean;
    sourceIndexDigestPresent: boolean;
  };
  summary: {
    maturityTarget: string;
    evidenceCount: number;
    validEvidenceCount: number;
    invalidEvidenceCount: number;
    readOnlyEvidenceCount: number;
    executionAllowedEvidenceCount: number;
    digestCount: number;
    totalScenarios: number;
    issueCount: number;
    blockerCount: number;
    warningCount: number;
  };
  evidenceGates: Array<{
    id: string;
    valid: boolean;
    digestPresent: boolean;
    readOnly: boolean;
    executionAllowed: boolean;
    canAuthorizeExecution: boolean;
  }>;
  blockers: ReleaseEvidenceReadinessMessage[];
  warnings: ReleaseEvidenceReadinessMessage[];
  evidenceEndpoints: {
    scenarioReleaseEvidenceIndexJson: string;
    scenarioReleaseEvidenceIndexMarkdown: string;
    scenarioReleaseEvidenceReadinessGateJson: string;
    scenarioReleaseEvidenceReadinessGateMarkdown: string;
  };
  nextActions: string[];
}

export interface ReleaseEvidenceReadinessMessage {
  code: string;
  severity: "blocker" | "warning";
  message: string;
}

const ENDPOINTS = Object.freeze({
  scenarioReleaseEvidenceIndexJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
  scenarioReleaseEvidenceIndexMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index?format=markdown",
  scenarioReleaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
  scenarioReleaseEvidenceReadinessGateMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate?format=markdown",
});

export async function loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate> {
  return createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(
    await loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(config),
  );
}

export function createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(
  index: UpstreamContractFixtureScenarioReleaseEvidenceIndex,
): UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate {
  const sourceIndexDigest = `${index.releaseEvidenceDigest.algorithm}:${index.releaseEvidenceDigest.value}`;
  const evidenceGates = index.evidence.map(createEvidenceGate);
  const checks = {
    indexValid: index.valid,
    indexReadOnly: index.readOnly === true,
    indexExecutionBlocked: index.executionAllowed === false,
    evidenceCountComplete: index.summary.evidenceCount === 4 && evidenceGates.length === 4,
    allEvidenceValid: index.checks.allEvidenceValid,
    allEvidenceReadOnly: index.checks.allEvidenceReadOnly,
    executionNeverAllowed: index.checks.executionNeverAllowed,
    digestCoverageComplete: index.checks.digestsPresent && index.summary.digestCount === index.summary.evidenceCount,
    sourcePathCoverageValid: index.checks.sourcePathCoverageValid,
    scenarioEvidenceCoverageValid: index.checks.scenarioEvidenceCoverageValid,
    noScenarioIssues: index.summary.issueCount === 0,
    maturityTargetProductionLeaning: index.maturityTarget === "production-leaning",
    sourceIndexDigestPresent: isSha256Digest(sourceIndexDigest),
  };
  const blockers = collectBlockers(checks, index, evidenceGates);
  const warnings = collectWarnings(index);
  const readyForReleaseEvidenceArchive = blockers.length === 0;

  return {
    service: "orderops-node",
    title: "Upstream fixture scenario release evidence readiness gate",
    evaluatedAt: new Date().toISOString(),
    readyForReleaseEvidenceArchive,
    readOnly: true,
    executionAllowed: false,
    sourceIndexDigest,
    checks,
    summary: {
      maturityTarget: index.maturityTarget,
      evidenceCount: index.summary.evidenceCount,
      validEvidenceCount: index.summary.validEvidenceCount,
      invalidEvidenceCount: index.summary.invalidEvidenceCount,
      readOnlyEvidenceCount: index.summary.readOnlyEvidenceCount,
      executionAllowedEvidenceCount: index.summary.executionAllowedEvidenceCount,
      digestCount: index.summary.digestCount,
      totalScenarios: index.summary.totalScenarios,
      issueCount: index.summary.issueCount,
      blockerCount: blockers.length,
      warningCount: warnings.length,
    },
    evidenceGates,
    blockers,
    warnings,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(readyForReleaseEvidenceArchive),
  };
}

export function renderUpstreamContractFixtureScenarioReleaseEvidenceReadinessGateMarkdown(
  gate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
): string {
  return [
    "# Upstream fixture scenario release evidence readiness gate",
    "",
    `- Service: ${gate.service}`,
    `- Evaluated at: ${gate.evaluatedAt}`,
    `- Ready for release evidence archive: ${gate.readyForReleaseEvidenceArchive}`,
    `- Read only: ${gate.readOnly}`,
    `- Execution allowed: ${gate.executionAllowed}`,
    `- Source index digest: ${gate.sourceIndexDigest}`,
    "",
    "## Checks",
    "",
    ...renderEntries(gate.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(gate.summary),
    "",
    "## Evidence Gates",
    "",
    ...gate.evidenceGates.flatMap(renderEvidenceGate),
    "## Blockers",
    "",
    ...renderMessages(gate.blockers, "No release evidence blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(gate.warnings, "No release evidence warnings."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(gate.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(gate.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createEvidenceGate(entry: UpstreamContractFixtureScenarioReleaseEvidenceEntry) {
  return {
    id: entry.id,
    valid: entry.valid,
    digestPresent: isSha256Digest(entry.digest),
    readOnly: entry.readOnly,
    executionAllowed: entry.executionAllowed,
    canAuthorizeExecution: entry.boundary.canAuthorizeExecution,
  };
}

function collectBlockers(
  checks: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate["checks"],
  index: UpstreamContractFixtureScenarioReleaseEvidenceIndex,
  evidenceGates: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate["evidenceGates"],
): ReleaseEvidenceReadinessMessage[] {
  const blockers: ReleaseEvidenceReadinessMessage[] = [];
  addBlocker(blockers, checks.indexValid, "INDEX_INVALID", "Release evidence index is invalid.");
  addBlocker(blockers, checks.indexReadOnly, "INDEX_NOT_READ_ONLY", "Release evidence index must remain read-only.");
  addBlocker(blockers, checks.indexExecutionBlocked, "INDEX_EXECUTION_ALLOWED", "Release evidence index must not allow execution.");
  addBlocker(blockers, checks.evidenceCountComplete, "EVIDENCE_COUNT_INCOMPLETE", "Release evidence index must contain exactly four scenario evidence records.");
  addBlocker(blockers, checks.allEvidenceValid, "EVIDENCE_INVALID", "All scenario evidence records must be valid.");
  addBlocker(blockers, checks.allEvidenceReadOnly, "EVIDENCE_NOT_READ_ONLY", "All scenario evidence records must remain read-only.");
  addBlocker(blockers, checks.executionNeverAllowed, "EVIDENCE_EXECUTION_ALLOWED", "No scenario evidence record may authorize execution.");
  addBlocker(blockers, checks.digestCoverageComplete, "DIGEST_COVERAGE_INCOMPLETE", "Every scenario evidence record must expose a sha256 digest.");
  addBlocker(blockers, checks.sourcePathCoverageValid, "SOURCE_PATH_COVERAGE_INVALID", "Scenario source path coverage must be valid.");
  addBlocker(blockers, checks.scenarioEvidenceCoverageValid, "SCENARIO_EVIDENCE_COVERAGE_INVALID", "Scenario evidence coverage must be valid.");
  addBlocker(blockers, checks.noScenarioIssues, "SCENARIO_ISSUES_PRESENT", "Scenario evidence must not report unresolved issues.");
  addBlocker(blockers, checks.maturityTargetProductionLeaning, "MATURITY_TARGET_UNSET", "Release evidence index must declare production-leaning maturity target.");
  addBlocker(blockers, checks.sourceIndexDigestPresent, "SOURCE_INDEX_DIGEST_MISSING", "Release evidence index must expose a sha256 release evidence digest.");

  for (const gate of evidenceGates) {
    addBlocker(blockers, gate.valid, `EVIDENCE_${gate.id}_INVALID`, `${gate.id} evidence is invalid.`);
    addBlocker(blockers, gate.digestPresent, `EVIDENCE_${gate.id}_DIGEST_MISSING`, `${gate.id} evidence digest is missing or invalid.`);
    addBlocker(blockers, gate.readOnly, `EVIDENCE_${gate.id}_NOT_READ_ONLY`, `${gate.id} evidence must remain read-only.`);
    addBlocker(blockers, !gate.executionAllowed, `EVIDENCE_${gate.id}_EXECUTION_ALLOWED`, `${gate.id} evidence must not allow execution.`);
    addBlocker(blockers, !gate.canAuthorizeExecution, `EVIDENCE_${gate.id}_AUTHORIZES_EXECUTION`, `${gate.id} evidence must not authorize execution.`);
  }

  if (index.summary.invalidEvidenceCount > 0) {
    blockers.push({
      code: "INVALID_EVIDENCE_COUNT_NONZERO",
      severity: "blocker",
      message: `invalidEvidenceCount=${index.summary.invalidEvidenceCount}`,
    });
  }

  return blockers;
}

function collectWarnings(index: UpstreamContractFixtureScenarioReleaseEvidenceIndex): ReleaseEvidenceReadinessMessage[] {
  const warnings: ReleaseEvidenceReadinessMessage[] = [
    {
      code: "CI_GATE_NOT_WIRED",
      severity: "warning",
      message: "This readiness gate is exposed as an endpoint but is not yet enforced by CI.",
    },
    {
      code: "EVIDENCE_ONLY",
      severity: "warning",
      message: "A ready gate only permits release evidence archival; it does not permit Java replay or mini-kv writes.",
    },
  ];

  if (index.summary.evidenceCount < 4) {
    warnings.push({
      code: "LOW_EVIDENCE_COUNT",
      severity: "warning",
      message: `Expected four evidence records but found ${index.summary.evidenceCount}.`,
    });
  }

  return warnings;
}

function collectNextActions(ready: boolean): string[] {
  if (ready) {
    return [
      "Archive the release evidence index and readiness gate output together.",
      "Wire this readiness gate into a CI evidence profile before treating it as an automated release control.",
      "Keep upstream mutation controls disabled unless a separate audited execution workflow is approved.",
    ];
  }

  return [
    "Resolve readiness blockers before archiving release evidence.",
    "Do not override blockers manually and do not use this gate as execution approval.",
  ];
}

function addBlocker(
  blockers: ReleaseEvidenceReadinessMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    blockers.push({ code, severity: "blocker", message });
  }
}

function renderEvidenceGate(gate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate["evidenceGates"][number]): string[] {
  return [
    `### ${gate.id}`,
    "",
    `- Valid: ${gate.valid}`,
    `- Digest present: ${gate.digestPresent}`,
    `- Read only: ${gate.readOnly}`,
    `- Execution allowed: ${gate.executionAllowed}`,
    `- Can authorize execution: ${gate.canAuthorizeExecution}`,
    "",
  ];
}

function renderMessages(messages: ReleaseEvidenceReadinessMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
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

function isSha256Digest(value: string): boolean {
  return /^sha256:[a-f0-9]{64}$/i.test(value);
}
