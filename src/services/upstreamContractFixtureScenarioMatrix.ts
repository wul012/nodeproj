import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";

export type UpstreamContractFixtureScenarioId =
  | "java-approved-replay-contract"
  | "java-blocked-replay-contract"
  | "mini-kv-write-checkjson"
  | "mini-kv-read-checkjson";

export type UpstreamContractFixtureScenarioProject = "java" | "mini-kv";
export type UpstreamContractFixtureScenarioSourceStatus = "available" | "missing" | "invalid";

export interface UpstreamContractFixtureScenarioCheck {
  field: string;
  diagnosticField: string;
  expected: unknown;
  actual: unknown;
  present: boolean;
  valid: boolean;
  message: string;
}

export interface UpstreamContractFixtureScenario {
  id: UpstreamContractFixtureScenarioId;
  project: UpstreamContractFixtureScenarioProject;
  title: string;
  role: "approved-replay" | "blocked-replay" | "write-checkjson" | "read-checkjson";
  source: {
    path: string;
    status: UpstreamContractFixtureScenarioSourceStatus;
    message: string;
  };
  valid: boolean;
  diagnosticReady: boolean;
  checkCount: number;
  failingCheckCount: number;
  keyFields: Record<string, unknown>;
  checks: UpstreamContractFixtureScenarioCheck[];
}

export interface UpstreamContractFixtureScenarioMatrixDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface UpstreamContractFixtureScenarioMatrix {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  matrixDigest: UpstreamContractFixtureScenarioMatrixDigest;
  summary: {
    totalScenarios: number;
    validScenarios: number;
    diagnosticReadyScenarios: number;
    issueCount: number;
    missingFixtureCount: number;
    invalidFixtureCount: number;
    javaScenarioCount: number;
    miniKvScenarioCount: number;
  };
  scenarios: UpstreamContractFixtureScenario[];
  driftSummary: {
    hasDrift: boolean;
    issueCount: number;
    issues: Array<{
      scenarioId: UpstreamContractFixtureScenarioId;
      field: string;
      expected: unknown;
      actual: unknown;
      message: string;
    }>;
  };
  evidenceEndpoints: {
    scenarioMatrixJson: string;
    scenarioMatrixMarkdown: string;
    fixtureArchiveSnapshotJson: string;
    fixtureArchiveSnapshotMarkdown: string;
  };
  nextActions: string[];
}

const MATRIX_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "summary",
  "scenarios",
  "driftSummary",
  "evidenceEndpoints",
  "nextActions",
]);

const ENDPOINTS = Object.freeze({
  scenarioMatrixJson: "/api/v1/upstream-contract-fixtures/scenario-matrix",
  scenarioMatrixMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown",
  fixtureArchiveSnapshotJson: "/api/v1/upstream-contract-fixtures/archive-snapshot",
  fixtureArchiveSnapshotMarkdown: "/api/v1/upstream-contract-fixtures/archive-snapshot?format=markdown",
});

interface FixtureReadResult {
  path: string;
  status: UpstreamContractFixtureScenarioSourceStatus;
  message: string;
  details: Record<string, unknown>;
}

export async function loadUpstreamContractFixtureScenarioMatrix(
  config: Pick<
    AppConfig,
    | "javaExecutionContractFixturePath"
    | "javaExecutionContractBlockedFixturePath"
    | "miniKvCheckJsonFixturePath"
    | "miniKvCheckJsonReadFixturePath"
  >,
): Promise<UpstreamContractFixtureScenarioMatrix> {
  const [
    javaApproved,
    javaBlocked,
    miniKvWrite,
    miniKvRead,
  ] = await Promise.all([
    readJsonFixture(config.javaExecutionContractFixturePath),
    readJsonFixture(config.javaExecutionContractBlockedFixturePath),
    readJsonFixture(config.miniKvCheckJsonFixturePath),
    readJsonFixture(config.miniKvCheckJsonReadFixturePath),
  ]);

  return createUpstreamContractFixtureScenarioMatrix([
    createJavaApprovedScenario(javaApproved),
    createJavaBlockedScenario(javaBlocked),
    createMiniKvWriteScenario(miniKvWrite),
    createMiniKvReadScenario(miniKvRead),
  ]);
}

export function createUpstreamContractFixtureScenarioMatrix(
  scenarios: UpstreamContractFixtureScenario[],
): UpstreamContractFixtureScenarioMatrix {
  const validScenarios = scenarios.filter((scenario) => scenario.valid).length;
  const diagnosticReadyScenarios = scenarios.filter((scenario) => scenario.diagnosticReady).length;
  const issues = scenarios.flatMap((scenario) => scenario.checks
    .filter((check) => !check.valid)
    .map((check) => ({
      scenarioId: scenario.id,
      field: check.field,
      expected: check.expected,
      actual: check.actual,
      message: check.message,
    })));
  const summary = {
    totalScenarios: scenarios.length,
    validScenarios,
    diagnosticReadyScenarios,
    issueCount: issues.length,
    missingFixtureCount: scenarios.filter((scenario) => scenario.source.status === "missing").length,
    invalidFixtureCount: scenarios.filter((scenario) => scenario.source.status === "invalid").length,
    javaScenarioCount: scenarios.filter((scenario) => scenario.project === "java").length,
    miniKvScenarioCount: scenarios.filter((scenario) => scenario.project === "mini-kv").length,
  };
  const valid = validScenarios === scenarios.length && diagnosticReadyScenarios === scenarios.length;
  const nextActions = collectNextActions(valid, summary.issueCount);
  const matrixWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream fixture scenario matrix",
    generatedAt: new Date().toISOString(),
    valid,
    summary,
    scenarios,
    driftSummary: {
      hasDrift: issues.length > 0,
      issueCount: issues.length,
      issues,
    },
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions,
  };

  return {
    ...matrixWithoutDigest,
    matrixDigest: digestUpstreamContractFixtureScenarioMatrix(matrixWithoutDigest),
  };
}

export function renderUpstreamContractFixtureScenarioMatrixMarkdown(
  matrix: UpstreamContractFixtureScenarioMatrix,
): string {
  return [
    "# Upstream fixture scenario matrix",
    "",
    `- Service: ${matrix.service}`,
    `- Generated at: ${matrix.generatedAt}`,
    `- Valid: ${matrix.valid}`,
    `- Matrix digest: ${matrix.matrixDigest.algorithm}:${matrix.matrixDigest.value}`,
    "",
    "## Summary",
    "",
    ...renderEntries(matrix.summary),
    "",
    "## Scenarios",
    "",
    ...matrix.scenarios.flatMap(renderScenario),
    "",
    "## Drift Summary",
    "",
    `- Has drift: ${matrix.driftSummary.hasDrift}`,
    `- Issue count: ${matrix.driftSummary.issueCount}`,
    "",
    ...renderDriftIssues(matrix.driftSummary.issues),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(matrix.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(matrix.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createJavaApprovedScenario(source: FixtureReadResult): UpstreamContractFixtureScenario {
  const details = source.details;
  const checks = [
    sourceCheck(source),
    checkPath(details, "contractVersion", "javaContractVersion", "failed-event-replay-execution-contract.v1", (value) => value === "failed-event-replay-execution-contract.v1"),
    checkPath(details, "contractDigest", "javaContractDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "approvalDigest", "javaApprovalDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "replayEligibilityDigest", "javaReplayEligibilityDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "digestVerificationMode", "javaDigestVerificationMode", "CLIENT_PRECHECK_ONLY", (value) => value === "CLIENT_PRECHECK_ONLY"),
    checkPath(details, "realExecutionMethod", "javaRealExecutionMethod", "POST", (value) => value === "POST"),
    checkPath(details, "realExecutionPath", "javaRealExecutionPath", "/api/v1/failed-events/{id}/replay", (value) => value === "/api/v1/failed-events/{id}/replay"),
    checkPath(details, "replayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", true, (value) => value === true),
    checkValue("blockedBy", "javaBlockedBy", "empty array", details.blockedBy, Array.isArray(details.blockedBy), readArray(details.blockedBy).length === 0, "Approved replay fixture must not be blocked."),
    checkValue("expectedSideEffects", "javaExpectedSideEffects", "non-empty array", details.expectedSideEffects, Array.isArray(details.expectedSideEffects), readArray(details.expectedSideEffects).length > 0, "Approved replay fixture must list expected side effects."),
    checkValue("executionChecks", "javaExecutionChecks", "non-empty all PASSED", details.executionChecks, Array.isArray(details.executionChecks), executionChecks(details).length > 0 && executionChecks(details).every((check) => check.status === "PASSED"), "Approved replay fixture must have passing execution checks."),
  ];
  return createScenario({
    id: "java-approved-replay-contract",
    project: "java",
    title: "Java approved replay execution contract",
    role: "approved-replay",
    source,
    checks,
    keyFields: {
      contractDigest: readString(details, "contractDigest"),
      approvalDigest: readString(details, "approvalDigest"),
      replayEligibilityDigest: readString(details, "replayEligibilityDigest"),
      replayPreconditionsSatisfied: readBoolean(details, "replayPreconditionsSatisfied"),
      blockedByCount: readArray(details.blockedBy).length,
      expectedSideEffectCount: readArray(details.expectedSideEffects).length,
      failedExecutionCheckCount: executionChecks(details).filter((check) => check.status !== "PASSED").length,
    },
  });
}

function createJavaBlockedScenario(source: FixtureReadResult): UpstreamContractFixtureScenario {
  const details = source.details;
  const checks = [
    sourceCheck(source),
    checkPath(details, "contractVersion", "javaContractVersion", "failed-event-replay-execution-contract.v1", (value) => value === "failed-event-replay-execution-contract.v1"),
    checkPath(details, "contractDigest", "javaContractDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "approvalDigest", "javaApprovalDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "replayEligibilityDigest", "javaReplayEligibilityDigest", "sha256:<64 hex chars>", isSha256Digest),
    checkPath(details, "digestVerificationMode", "javaDigestVerificationMode", "CLIENT_PRECHECK_ONLY", (value) => value === "CLIENT_PRECHECK_ONLY"),
    checkPath(details, "replayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", false, (value) => value === false),
    checkValue("blockedBy", "javaBlockedBy", "non-empty array", details.blockedBy, Array.isArray(details.blockedBy), readArray(details.blockedBy).length > 0, "Blocked replay fixture must expose blockers."),
    checkValue("expectedSideEffects", "javaExpectedSideEffects", "empty array", details.expectedSideEffects, Array.isArray(details.expectedSideEffects), readArray(details.expectedSideEffects).length === 0, "Blocked replay fixture must not promise side effects."),
    checkValue("executionChecks", "javaExecutionChecks", "at least one FAILED", details.executionChecks, Array.isArray(details.executionChecks), executionChecks(details).some((check) => check.status === "FAILED"), "Blocked replay fixture must expose the failed execution check."),
  ];
  return createScenario({
    id: "java-blocked-replay-contract",
    project: "java",
    title: "Java blocked replay execution contract",
    role: "blocked-replay",
    source,
    checks,
    keyFields: {
      contractDigest: readString(details, "contractDigest"),
      approvalDigest: readString(details, "approvalDigest"),
      replayEligibilityDigest: readString(details, "replayEligibilityDigest"),
      replayPreconditionsSatisfied: readBoolean(details, "replayPreconditionsSatisfied"),
      blockedBy: readArray(details.blockedBy),
      expectedSideEffectCount: readArray(details.expectedSideEffects).length,
      failedExecutionCheckCount: executionChecks(details).filter((check) => check.status === "FAILED").length,
    },
  });
}

function createMiniKvWriteScenario(source: FixtureReadResult): UpstreamContractFixtureScenario {
  const details = source.details;
  const sideEffects = readArray(details.side_effects);
  const checks = [
    sourceCheck(source),
    checkPath(details, "schema_version", "miniKvSchemaVersion", "positive integer", isPositiveInteger),
    checkPath(details, "command_digest", "miniKvCommandDigest", "fnv1a64:<16 hex chars>", isFnv1a64Digest),
    checkPath(details, "command", "miniKvCommand", "SET", (value) => value === "SET"),
    checkPath(details, "write_command", "miniKvWriteCommand", true, (value) => value === true),
    checkPath(details, "read_only", "miniKvCheckReadOnly", true, (value) => value === true),
    checkPath(details, "execution_allowed", "miniKvCheckExecutionAllowed", false, (value) => value === false),
    checkValue("side_effects", "miniKvSideEffects", "includes store_write", details.side_effects, Array.isArray(details.side_effects), sideEffects.includes("store_write"), "Write CHECKJSON fixture must expose store_write side effect."),
    checkPath(details, "side_effect_count", "miniKvSideEffectCount", sideEffects.length, (value) => value === sideEffects.length),
    checkPath(details, "wal.durability", "miniKvCheckDurability", "string", (value) => typeof value === "string" && value.length > 0),
  ];
  return createScenario({
    id: "mini-kv-write-checkjson",
    project: "mini-kv",
    title: "mini-kv write CHECKJSON contract",
    role: "write-checkjson",
    source,
    checks,
    keyFields: {
      command: readString(details, "command"),
      commandDigest: readString(details, "command_digest"),
      readOnly: readBoolean(details, "read_only"),
      executionAllowed: readBoolean(details, "execution_allowed"),
      sideEffects,
      sideEffectCount: readNumber(details, "side_effect_count"),
      durability: readNestedString(details, ["wal", "durability"]),
    },
  });
}

function createMiniKvReadScenario(source: FixtureReadResult): UpstreamContractFixtureScenario {
  const details = source.details;
  const sideEffects = readArray(details.side_effects);
  const checks = [
    sourceCheck(source),
    checkPath(details, "schema_version", "miniKvSchemaVersion", "positive integer", isPositiveInteger),
    checkPath(details, "command_digest", "miniKvCommandDigest", "fnv1a64:<16 hex chars>", isFnv1a64Digest),
    checkPath(details, "command", "miniKvCommand", "GET", (value) => value === "GET"),
    checkPath(details, "write_command", "miniKvWriteCommand", false, (value) => value === false),
    checkPath(details, "read_only", "miniKvCheckReadOnly", true, (value) => value === true),
    checkPath(details, "execution_allowed", "miniKvCheckExecutionAllowed", false, (value) => value === false),
    checkValue("side_effects", "miniKvSideEffects", "[store_read]", details.side_effects, Array.isArray(details.side_effects), sideEffects.length === 1 && sideEffects[0] === "store_read", "Read CHECKJSON fixture must keep mini-kv's store_read explanation semantics."),
    checkPath(details, "side_effect_count", "miniKvSideEffectCount", 1, (value) => value === 1),
    checkPath(details, "wal.durability", "miniKvCheckDurability", "not_applicable", (value) => value === "not_applicable"),
  ];
  return createScenario({
    id: "mini-kv-read-checkjson",
    project: "mini-kv",
    title: "mini-kv read CHECKJSON contract",
    role: "read-checkjson",
    source,
    checks,
    keyFields: {
      command: readString(details, "command"),
      commandDigest: readString(details, "command_digest"),
      readOnly: readBoolean(details, "read_only"),
      executionAllowed: readBoolean(details, "execution_allowed"),
      sideEffects,
      sideEffectCount: readNumber(details, "side_effect_count"),
      durability: readNestedString(details, ["wal", "durability"]),
    },
  });
}

function createScenario(input: Omit<UpstreamContractFixtureScenario, "valid" | "diagnosticReady" | "checkCount" | "failingCheckCount">): UpstreamContractFixtureScenario {
  const failingCheckCount = input.checks.filter((check) => !check.valid).length;
  const valid = failingCheckCount === 0;
  return {
    ...input,
    valid,
    diagnosticReady: valid,
    checkCount: input.checks.length,
    failingCheckCount,
  };
}

function sourceCheck(source: FixtureReadResult): UpstreamContractFixtureScenarioCheck {
  return {
    field: "$fixture",
    diagnosticField: "fixtureSource",
    expected: "readable JSON object",
    actual: source.status,
    present: source.status !== "missing",
    valid: source.status === "available",
    message: source.message,
  };
}

function checkPath(
  details: Record<string, unknown>,
  field: string,
  diagnosticField: string,
  expected: unknown,
  predicate: (value: unknown) => boolean,
): UpstreamContractFixtureScenarioCheck {
  const actual = readPath(details, field);
  const present = actual !== undefined;
  return checkValue(
    field,
    diagnosticField,
    expected,
    present ? actual : "missing",
    present,
    present && predicate(actual),
    `${field} must match ${formatValue(expected)} for ${diagnosticField}.`,
  );
}

function checkValue(
  field: string,
  diagnosticField: string,
  expected: unknown,
  actual: unknown,
  present: boolean,
  valid: boolean,
  message: string,
): UpstreamContractFixtureScenarioCheck {
  return {
    field,
    diagnosticField,
    expected,
    actual,
    present,
    valid,
    message,
  };
}

async function readJsonFixture(path: string): Promise<FixtureReadResult> {
  try {
    const data: unknown = JSON.parse(await readFile(path, "utf8"));
    if (!isRecord(data)) {
      return {
        path,
        status: "invalid",
        message: "Fixture file is not a JSON object.",
        details: {},
      };
    }

    return {
      path,
      status: "available",
      message: "Fixture file was read and parsed.",
      details: data,
    };
  } catch (error) {
    return {
      path,
      status: "missing",
      message: error instanceof Error ? error.message : String(error),
      details: {},
    };
  }
}

function collectNextActions(valid: boolean, issueCount: number): string[] {
  if (valid) {
    return [
      "Scenario matrix is clean; Node can use these fixtures for multi-scenario evidence reports.",
      "Keep all scenarios read-only and continue treating blocked samples as diagnostics, not failures.",
    ];
  }

  return [
    `Resolve scenario fixture drift before relying on the matrix: issueCount=${issueCount}`,
    "Do not auto-repair upstream fixtures and do not fall back to hand-written scenario data.",
  ];
}

export function digestUpstreamContractFixtureScenarioMatrix(
  matrix: Omit<UpstreamContractFixtureScenarioMatrix, "matrixDigest">,
): UpstreamContractFixtureScenarioMatrixDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: matrix.service,
        valid: matrix.valid,
        summary: matrix.summary,
        scenarios: matrix.scenarios,
        driftSummary: matrix.driftSummary,
        evidenceEndpoints: matrix.evidenceEndpoints,
        nextActions: matrix.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...MATRIX_DIGEST_COVERED_FIELDS],
  };
}

function renderScenario(scenario: UpstreamContractFixtureScenario): string[] {
  return [
    `### ${scenario.id}`,
    "",
    `- Title: ${scenario.title}`,
    `- Project: ${scenario.project}`,
    `- Role: ${scenario.role}`,
    `- Source: ${scenario.source.path}`,
    `- Source status: ${scenario.source.status}`,
    `- Valid: ${scenario.valid}`,
    `- Diagnostic ready: ${scenario.diagnosticReady}`,
    `- Failing checks: ${scenario.failingCheckCount}/${scenario.checkCount}`,
    "",
    "#### Key Fields",
    "",
    ...renderEntries(scenario.keyFields),
    "",
    "#### Checks",
    "",
    ...scenario.checks.map((check) => `- ${check.field} -> ${check.diagnosticField}: ${check.valid} (expected ${formatValue(check.expected)}, actual ${formatValue(check.actual)})`),
    "",
  ];
}

function renderDriftIssues(issues: UpstreamContractFixtureScenarioMatrix["driftSummary"]["issues"]): string[] {
  if (issues.length === 0) {
    return ["- No scenario fixture drift."];
  }

  return issues.flatMap((issue) => [
    `### ${issue.scenarioId}:${issue.field}`,
    "",
    `- Expected: ${formatValue(issue.expected)}`,
    `- Actual: ${formatValue(issue.actual)}`,
    `- Message: ${issue.message}`,
    "",
  ]);
}

function executionChecks(details: Record<string, unknown>): Array<Record<string, unknown>> {
  return Array.isArray(details.executionChecks)
    ? details.executionChecks.filter(isRecord)
    : [];
}

function readString(record: Record<string, unknown>, field: string): string | undefined {
  const value = record[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumber(record: Record<string, unknown>, field: string): number | undefined {
  const value = record[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBoolean(record: Record<string, unknown>, field: string): boolean | undefined {
  const value = record[field];
  return typeof value === "boolean" ? value : undefined;
}

function readPath(record: Record<string, unknown>, field: string): unknown {
  if (!field.includes(".")) {
    return record[field];
  }
  return readNested(record, field.split("."));
}

function readNested(record: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = record;
  for (const segment of path) {
    if (!isRecord(current)) {
      return undefined;
    }
    current = current[segment];
  }
  return current;
}

function readNestedString(record: Record<string, unknown>, path: string[]): string | undefined {
  const value = readNested(record, path);
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isSha256Digest(value: unknown): boolean {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/i.test(value);
}

function isFnv1a64Digest(value: unknown): boolean {
  return typeof value === "string" && /^fnv1a64:[a-f0-9]{16}$/i.test(value);
}

function isPositiveInteger(value: unknown): boolean {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
