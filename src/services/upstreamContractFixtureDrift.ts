import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  loadUpstreamContractFixtureReport,
  type UpstreamContractFixtureReport,
} from "./upstreamContractFixtures.js";

export type UpstreamContractFixtureDriftCategory =
  | "java-fixture"
  | "mini-kv-fixture"
  | "diagnostics-alignment";

export type UpstreamContractFixtureDriftSeverity = "error" | "warning";

export interface UpstreamContractFixtureDriftIssue {
  code: string;
  category: UpstreamContractFixtureDriftCategory;
  severity: UpstreamContractFixtureDriftSeverity;
  field: string;
  expected: unknown;
  actual: unknown;
  message: string;
}

export interface UpstreamContractFixtureDriftMapping {
  source: "java" | "mini-kv";
  fixtureField: string;
  nodeSummaryField: string;
  diagnosticsField: string;
  present: boolean;
}

export interface UpstreamContractFixtureDriftDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface UpstreamContractFixtureDriftDiagnostics {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  driftDigest: UpstreamContractFixtureDriftDigest;
  summary: {
    fixtureReportValid: boolean;
    issueCount: number;
    errorCount: number;
    warningCount: number;
    javaRequiredFieldCount: number;
    miniKvRequiredFieldCount: number;
    missingMappingCount: number;
    invalidFixtureCount: number;
  };
  mappings: UpstreamContractFixtureDriftMapping[];
  issues: UpstreamContractFixtureDriftIssue[];
  fixtureReport: UpstreamContractFixtureReport;
  nextActions: string[];
}

const DRIFT_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "summary",
  "mappings",
  "issues",
  "fixtureDigest",
  "nextActions",
]);

const JAVA_REQUIRED_FIELD_COUNT = 7;
const MINIKV_REQUIRED_FIELD_COUNT = 7;

export async function loadUpstreamContractFixtureDriftDiagnostics(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureDriftDiagnostics> {
  return createUpstreamContractFixtureDriftDiagnostics(
    await loadUpstreamContractFixtureReport(config),
  );
}

export function createUpstreamContractFixtureDriftDiagnostics(
  fixtureReport: UpstreamContractFixtureReport,
): UpstreamContractFixtureDriftDiagnostics {
  const mappings = createMappings(fixtureReport);
  const issues = [
    ...diagnoseJavaFixture(fixtureReport),
    ...diagnoseMiniKvFixture(fixtureReport),
    ...diagnoseMappings(mappings),
  ];
  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.length - errorCount;
  const summary = {
    fixtureReportValid: fixtureReport.valid,
    issueCount: issues.length,
    errorCount,
    warningCount,
    javaRequiredFieldCount: JAVA_REQUIRED_FIELD_COUNT,
    miniKvRequiredFieldCount: MINIKV_REQUIRED_FIELD_COUNT,
    missingMappingCount: mappings.filter((mapping) => !mapping.present).length,
    invalidFixtureCount: fixtureReport.summary.invalidFixtureCount,
  };
  const valid = errorCount === 0;
  const nextActions = collectNextActions(valid, issues);
  const reportWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream execution contract fixture drift diagnostics",
    generatedAt: new Date().toISOString(),
    valid,
    summary,
    mappings,
    issues,
    fixtureReport,
    nextActions,
  };

  return {
    ...reportWithoutDigest,
    driftDigest: digestUpstreamContractFixtureDriftDiagnostics(reportWithoutDigest),
  };
}

export function renderUpstreamContractFixtureDriftDiagnosticsMarkdown(
  report: UpstreamContractFixtureDriftDiagnostics,
): string {
  return [
    "# Upstream execution contract fixture drift diagnostics",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Valid: ${report.valid}`,
    `- Drift digest: ${report.driftDigest.algorithm}:${report.driftDigest.value}`,
    "",
    "## Summary",
    "",
    `- Fixture report valid: ${report.summary.fixtureReportValid}`,
    `- Issue count: ${report.summary.issueCount}`,
    `- Error count: ${report.summary.errorCount}`,
    `- Warning count: ${report.summary.warningCount}`,
    `- Java required fields: ${report.summary.javaRequiredFieldCount}`,
    `- mini-kv required fields: ${report.summary.miniKvRequiredFieldCount}`,
    `- Missing mapping count: ${report.summary.missingMappingCount}`,
    `- Invalid fixture count: ${report.summary.invalidFixtureCount}`,
    "",
    "## Field Mappings",
    "",
    ...renderMappings(report.mappings),
    "",
    "## Issues",
    "",
    ...renderIssues(report.issues),
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createMappings(report: UpstreamContractFixtureReport): UpstreamContractFixtureDriftMapping[] {
  return [
    map("java", "contractDigest", "javaContractDigest", "javaContractDigest", report.sources.java.details),
    map("java", "replayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", "javaReplayPreconditionsSatisfied", report.sources.java.details),
    map("java", "digestVerificationMode", "javaDigestVerificationMode", "javaDigestVerificationMode", report.sources.java.details),
    map("mini-kv", "command_digest", "miniKvCommandDigest", "miniKvCommandDigest", report.sources.miniKv.details),
    map("mini-kv", "read_only", "miniKvCheckReadOnly", "miniKvCheckReadOnly", report.sources.miniKv.details),
    map("mini-kv", "execution_allowed", "miniKvCheckExecutionAllowed", "miniKvCheckExecutionAllowed", report.sources.miniKv.details),
    map("mini-kv", "wal.durability", "miniKvCheckDurability", "miniKvCheckDurability", report.sources.miniKv.details),
  ];
}

function diagnoseJavaFixture(report: UpstreamContractFixtureReport): UpstreamContractFixtureDriftIssue[] {
  const details = report.sources.java.details;
  return [
    issueUnless(readString(details, "contractVersion") === "failed-event-replay-execution-contract.v1", {
      code: "JAVA_FIXTURE_CONTRACT_VERSION_DRIFT",
      category: "java-fixture",
      field: "contractVersion",
      expected: "failed-event-replay-execution-contract.v1",
      actual: readField(details, "contractVersion"),
      message: "Java fixture contractVersion no longer matches Node execution-contract validation.",
    }),
    issueUnless(isSha256Digest(readString(details, "contractDigest")), {
      code: "JAVA_FIXTURE_CONTRACT_DIGEST_DRIFT",
      category: "java-fixture",
      field: "contractDigest",
      expected: "sha256:<64 hex chars>",
      actual: readField(details, "contractDigest"),
      message: "Java fixture contractDigest is missing or no longer has the expected digest format.",
    }),
    issueUnless(isSha256Digest(readString(details, "approvalDigest")), {
      code: "JAVA_FIXTURE_APPROVAL_DIGEST_DRIFT",
      category: "java-fixture",
      field: "approvalDigest",
      expected: "sha256:<64 hex chars>",
      actual: readField(details, "approvalDigest"),
      message: "Java fixture approvalDigest is missing or malformed.",
    }),
    issueUnless(isSha256Digest(readString(details, "replayEligibilityDigest")), {
      code: "JAVA_FIXTURE_REPLAY_ELIGIBILITY_DIGEST_DRIFT",
      category: "java-fixture",
      field: "replayEligibilityDigest",
      expected: "sha256:<64 hex chars>",
      actual: readField(details, "replayEligibilityDigest"),
      message: "Java fixture replayEligibilityDigest is missing or malformed.",
    }),
    issueUnless(readBoolean(details, "replayPreconditionsSatisfied") === true, {
      code: "JAVA_FIXTURE_REPLAY_PRECONDITION_DRIFT",
      category: "java-fixture",
      field: "replayPreconditionsSatisfied",
      expected: true,
      actual: readField(details, "replayPreconditionsSatisfied"),
      message: "Java fixture no longer represents an approved replay precondition sample.",
    }),
    issueUnless(readString(details, "digestVerificationMode") === "CLIENT_PRECHECK_ONLY", {
      code: "JAVA_FIXTURE_DIGEST_MODE_DRIFT",
      category: "java-fixture",
      field: "digestVerificationMode",
      expected: "CLIENT_PRECHECK_ONLY",
      actual: readField(details, "digestVerificationMode"),
      message: "Java fixture digest verification mode no longer matches Node diagnostics expectations.",
    }),
    issueUnless(readStringArray(details.expectedSideEffects).length > 0, {
      code: "JAVA_FIXTURE_EXPECTED_SIDE_EFFECTS_DRIFT",
      category: "java-fixture",
      field: "expectedSideEffects",
      expected: "non-empty string[]",
      actual: details.expectedSideEffects ?? "missing",
      message: "Java fixture expectedSideEffects is missing or empty.",
    }),
  ].filter((issue): issue is UpstreamContractFixtureDriftIssue => issue !== undefined);
}

function diagnoseMiniKvFixture(report: UpstreamContractFixtureReport): UpstreamContractFixtureDriftIssue[] {
  const details = report.sources.miniKv.details;
  const sideEffects = readStringArray(details.side_effects);
  return [
    issueUnless(isPositiveInteger(readNumber(details, "schema_version")), {
      code: "MINIKV_FIXTURE_SCHEMA_VERSION_DRIFT",
      category: "mini-kv-fixture",
      field: "schema_version",
      expected: "positive integer",
      actual: readField(details, "schema_version"),
      message: "mini-kv fixture schema_version is missing or invalid.",
    }),
    issueUnless(isFnv1a64Digest(readString(details, "command_digest")), {
      code: "MINIKV_FIXTURE_COMMAND_DIGEST_DRIFT",
      category: "mini-kv-fixture",
      field: "command_digest",
      expected: "fnv1a64:<16 hex chars>",
      actual: readField(details, "command_digest"),
      message: "mini-kv fixture command_digest is missing or malformed.",
    }),
    issueUnless(readBoolean(details, "read_only") === true, {
      code: "MINIKV_FIXTURE_READ_ONLY_DRIFT",
      category: "mini-kv-fixture",
      field: "read_only",
      expected: true,
      actual: readField(details, "read_only"),
      message: "mini-kv fixture no longer proves CHECKJSON is read-only.",
    }),
    issueUnless(readBoolean(details, "execution_allowed") === false, {
      code: "MINIKV_FIXTURE_EXECUTION_ALLOWED_DRIFT",
      category: "mini-kv-fixture",
      field: "execution_allowed",
      expected: false,
      actual: readField(details, "execution_allowed"),
      message: "mini-kv fixture no longer proves CHECKJSON refuses execution.",
    }),
    issueUnless(sideEffects.length > 0, {
      code: "MINIKV_FIXTURE_SIDE_EFFECTS_DRIFT",
      category: "mini-kv-fixture",
      field: "side_effects",
      expected: "non-empty string[]",
      actual: details.side_effects ?? "missing",
      message: "mini-kv fixture side_effects is missing or empty.",
    }),
    issueUnless(readNumber(details, "side_effect_count") === sideEffects.length, {
      code: "MINIKV_FIXTURE_SIDE_EFFECT_COUNT_DRIFT",
      category: "mini-kv-fixture",
      field: "side_effect_count",
      expected: sideEffects.length,
      actual: readField(details, "side_effect_count"),
      message: "mini-kv fixture side_effect_count no longer matches side_effects length.",
    }),
    issueUnless(typeof readNested(details, ["wal", "durability"]) === "string", {
      code: "MINIKV_FIXTURE_WAL_DURABILITY_DRIFT",
      category: "mini-kv-fixture",
      field: "wal.durability",
      expected: "string",
      actual: readNested(details, ["wal", "durability"]) ?? "missing",
      message: "mini-kv fixture wal.durability is missing.",
    }),
  ].filter((issue): issue is UpstreamContractFixtureDriftIssue => issue !== undefined);
}

function diagnoseMappings(mappings: UpstreamContractFixtureDriftMapping[]): UpstreamContractFixtureDriftIssue[] {
  return mappings
    .filter((mapping) => !mapping.present)
    .map((mapping) => ({
      code: "FIXTURE_DIAGNOSTICS_FIELD_MAPPING_MISSING",
      category: "diagnostics-alignment" as const,
      severity: "error" as const,
      field: mapping.fixtureField,
      expected: `Fixture field backing ${mapping.diagnosticsField}`,
      actual: "missing",
      message: `Fixture field ${mapping.fixtureField} is missing, so Node cannot populate diagnostics field ${mapping.diagnosticsField}.`,
    }));
}

function map(
  source: "java" | "mini-kv",
  fixtureField: string,
  nodeSummaryField: string,
  diagnosticsField: string,
  details: Record<string, unknown>,
): UpstreamContractFixtureDriftMapping {
  return {
    source,
    fixtureField,
    nodeSummaryField,
    diagnosticsField,
    present: readPath(details, fixtureField) !== undefined,
  };
}

function issueUnless(
  condition: boolean,
  issue: Omit<UpstreamContractFixtureDriftIssue, "severity"> & {
    severity?: UpstreamContractFixtureDriftSeverity;
  },
): UpstreamContractFixtureDriftIssue | undefined {
  if (condition) {
    return undefined;
  }
  return {
    severity: issue.severity ?? "error",
    ...issue,
  };
}

function collectNextActions(
  valid: boolean,
  issues: UpstreamContractFixtureDriftIssue[],
): string[] {
  if (valid) {
    return [
      "Fixture drift diagnostics are clean; fixture-driven smoke can keep using the upstream samples.",
      "Continue treating fixtures as read-only test evidence, not as production execution approval.",
    ];
  }

  return [
    `Fix fixture drift before relying on fixture-driven smoke: ${issues.map((issue) => issue.code).join(", ")}`,
    "Do not auto-repair fixture drift and do not silently fall back to hand-written mock fields.",
  ];
}

function digestUpstreamContractFixtureDriftDiagnostics(
  report: Omit<UpstreamContractFixtureDriftDiagnostics, "driftDigest">,
): UpstreamContractFixtureDriftDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        valid: report.valid,
        summary: report.summary,
        mappings: report.mappings,
        issues: report.issues,
        fixtureDigest: report.fixtureReport.fixtureDigest,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...DRIFT_DIGEST_COVERED_FIELDS],
  };
}

function renderMappings(mappings: UpstreamContractFixtureDriftMapping[]): string[] {
  return mappings.map((mapping) => (
    `- ${mapping.source}:${mapping.fixtureField} -> ${mapping.nodeSummaryField} -> ${mapping.diagnosticsField} present=${mapping.present}`
  ));
}

function renderIssues(issues: UpstreamContractFixtureDriftIssue[]): string[] {
  if (issues.length === 0) {
    return ["- No fixture drift diagnostics."];
  }

  return issues.flatMap((issue) => [
    `### ${issue.code}`,
    "",
    `- Category: ${issue.category}`,
    `- Severity: ${issue.severity}`,
    `- Field: ${issue.field}`,
    `- Expected: ${formatValue(issue.expected)}`,
    `- Actual: ${formatValue(issue.actual)}`,
    `- Message: ${issue.message}`,
    "",
  ]);
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

function readField(record: Record<string, unknown>, field: string): unknown {
  return record[field] ?? "missing";
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

function readPath(record: Record<string, unknown>, field: string): unknown {
  return field.includes(".") ? readNested(record, field.split(".")) : record[field];
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function isSha256Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/i.test(value);
}

function isFnv1a64Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^fnv1a64:[a-f0-9]{16}$/i.test(value);
}

function isPositiveInteger(value: number | undefined): boolean {
  return Number.isInteger(value) && value !== undefined && value > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatValue(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value === undefined) {
    return "missing";
  }
  return JSON.stringify(value);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
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
