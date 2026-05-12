import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";

export type UpstreamContractFixtureStatus = "available" | "missing" | "invalid";

export interface UpstreamContractFixtureDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface UpstreamContractFixtureSource {
  name: "java-replay-execution-contract" | "mini-kv-checkjson-contract";
  path: string;
  status: UpstreamContractFixtureStatus;
  message: string;
  details: Record<string, unknown>;
}

export interface UpstreamContractFixtureReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  fixtureDigest: UpstreamContractFixtureDigest;
  summary: {
    javaFixtureStatus: UpstreamContractFixtureStatus;
    javaContractVersion?: string;
    javaContractDigest?: string;
    javaApprovalDigest?: string;
    javaReplayEligibilityDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    javaDigestVerificationMode?: string;
    javaExpectedSideEffectCount?: number;
    miniKvFixtureStatus: UpstreamContractFixtureStatus;
    miniKvSchemaVersion?: number;
    miniKvCommandDigest?: string;
    miniKvReadOnly?: boolean;
    miniKvExecutionAllowed?: boolean;
    miniKvSideEffectCount?: number;
    miniKvDurability?: string;
    missingFixtureCount: number;
    invalidFixtureCount: number;
  };
  checks: {
    javaFixtureReadable: boolean;
    javaJsonObject: boolean;
    javaContractVersionOk: boolean;
    javaContractDigestValid: boolean;
    javaApprovalDigestValid: boolean;
    javaReplayEligibilityDigestValid: boolean;
    javaReplayPreconditionsSatisfied: boolean;
    javaDigestVerificationModeOk: boolean;
    javaExpectedSideEffectsPresent: boolean;
    miniKvFixtureReadable: boolean;
    miniKvJsonObject: boolean;
    miniKvSchemaVersionValid: boolean;
    miniKvCommandDigestValid: boolean;
    miniKvReadOnlyOk: boolean;
    miniKvExecutionAllowedOk: boolean;
    miniKvSideEffectCountMatches: boolean;
    miniKvDurabilityPresent: boolean;
  };
  sources: {
    java: UpstreamContractFixtureSource;
    miniKv: UpstreamContractFixtureSource;
  };
  nextActions: string[];
}

const FIXTURE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "summary",
  "checks",
  "sources",
  "nextActions",
]);

export async function loadUpstreamContractFixtureReport(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureReport> {
  const javaResult = await readJsonFixture(config.javaExecutionContractFixturePath);
  const miniKvResult = await readJsonFixture(config.miniKvCheckJsonFixturePath);
  const java = createJavaSource(config.javaExecutionContractFixturePath, javaResult);
  const miniKv = createMiniKvSource(config.miniKvCheckJsonFixturePath, miniKvResult);
  return createUpstreamContractFixtureReport(java, miniKv);
}

export function createUpstreamContractFixtureReport(
  java: UpstreamContractFixtureSource,
  miniKv: UpstreamContractFixtureSource,
): UpstreamContractFixtureReport {
  const checks = createChecks(java, miniKv);
  const summary = createSummary(java, miniKv);
  const valid = Object.values(checks).every(Boolean);
  const nextActions = collectNextActions(valid, summary);
  const reportWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream execution contract fixture report",
    generatedAt: new Date().toISOString(),
    valid,
    summary,
    checks,
    sources: { java, miniKv },
    nextActions,
  };

  return {
    ...reportWithoutDigest,
    fixtureDigest: digestUpstreamContractFixtureReport(reportWithoutDigest),
  };
}

export function renderUpstreamContractFixtureReportMarkdown(report: UpstreamContractFixtureReport): string {
  return [
    "# Upstream execution contract fixture report",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Valid: ${report.valid}`,
    `- Fixture digest: ${report.fixtureDigest.algorithm}:${report.fixtureDigest.value}`,
    "",
    "## Summary",
    "",
    `- Java fixture: ${report.summary.javaFixtureStatus}`,
    `- Java contract version: ${report.summary.javaContractVersion ?? "unknown"}`,
    `- Java contract digest: ${report.summary.javaContractDigest ?? "unknown"}`,
    `- Java approval digest: ${report.summary.javaApprovalDigest ?? "unknown"}`,
    `- Java replay eligibility digest: ${report.summary.javaReplayEligibilityDigest ?? "unknown"}`,
    `- Java replay preconditions satisfied: ${report.summary.javaReplayPreconditionsSatisfied === undefined ? "unknown" : report.summary.javaReplayPreconditionsSatisfied}`,
    `- Java digest verification mode: ${report.summary.javaDigestVerificationMode ?? "unknown"}`,
    `- Java expected side effects: ${report.summary.javaExpectedSideEffectCount ?? "unknown"}`,
    `- mini-kv fixture: ${report.summary.miniKvFixtureStatus}`,
    `- mini-kv schema version: ${report.summary.miniKvSchemaVersion ?? "unknown"}`,
    `- mini-kv command digest: ${report.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv read_only: ${report.summary.miniKvReadOnly === undefined ? "unknown" : report.summary.miniKvReadOnly}`,
    `- mini-kv execution_allowed: ${report.summary.miniKvExecutionAllowed === undefined ? "unknown" : report.summary.miniKvExecutionAllowed}`,
    `- mini-kv side_effect_count: ${report.summary.miniKvSideEffectCount ?? "unknown"}`,
    `- mini-kv durability: ${report.summary.miniKvDurability ?? "unknown"}`,
    `- Missing fixture count: ${report.summary.missingFixtureCount}`,
    `- Invalid fixture count: ${report.summary.invalidFixtureCount}`,
    "",
    "## Checks",
    "",
    ...Object.entries(report.checks).map(([name, value]) => `- ${name}: ${value}`),
    "",
    "## Sources",
    "",
    `### ${report.sources.java.name}`,
    "",
    `- Path: ${report.sources.java.path}`,
    `- Status: ${report.sources.java.status}`,
    `- Message: ${report.sources.java.message}`,
    "",
    `### ${report.sources.miniKv.name}`,
    "",
    `- Path: ${report.sources.miniKv.path}`,
    `- Status: ${report.sources.miniKv.status}`,
    `- Message: ${report.sources.miniKv.message}`,
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

async function readJsonFixture(path: string): Promise<{ readable: boolean; data?: unknown; message: string }> {
  try {
    const raw = await readFile(path, "utf8");
    return {
      readable: true,
      data: JSON.parse(raw),
      message: "Fixture file was read and parsed.",
    };
  } catch (error) {
    return {
      readable: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

function createJavaSource(
  path: string,
  result: { readable: boolean; data?: unknown; message: string },
): UpstreamContractFixtureSource {
  if (!result.readable) {
    return {
      name: "java-replay-execution-contract",
      path,
      status: "missing",
      message: result.message,
      details: {},
    };
  }

  if (!isRecord(result.data)) {
    return {
      name: "java-replay-execution-contract",
      path,
      status: "invalid",
      message: "Java execution-contract fixture is not a JSON object.",
      details: { rawType: typeof result.data },
    };
  }

  const details = result.data;
  return {
    name: "java-replay-execution-contract",
    path,
    status: javaFixtureValid(details) ? "available" : "invalid",
    message: javaFixtureValid(details)
      ? "Java execution-contract fixture is available and schema-aligned."
      : "Java execution-contract fixture is present but does not satisfy Node fixture checks.",
    details,
  };
}

function createMiniKvSource(
  path: string,
  result: { readable: boolean; data?: unknown; message: string },
): UpstreamContractFixtureSource {
  if (!result.readable) {
    return {
      name: "mini-kv-checkjson-contract",
      path,
      status: "missing",
      message: result.message,
      details: {},
    };
  }

  if (!isRecord(result.data)) {
    return {
      name: "mini-kv-checkjson-contract",
      path,
      status: "invalid",
      message: "mini-kv CHECKJSON fixture is not a JSON object.",
      details: { rawType: typeof result.data },
    };
  }

  const details = result.data;
  return {
    name: "mini-kv-checkjson-contract",
    path,
    status: miniKvFixtureValid(details) ? "available" : "invalid",
    message: miniKvFixtureValid(details)
      ? "mini-kv CHECKJSON fixture is available and schema-aligned."
      : "mini-kv CHECKJSON fixture is present but does not satisfy Node fixture checks.",
    details,
  };
}

function createChecks(
  java: UpstreamContractFixtureSource,
  miniKv: UpstreamContractFixtureSource,
): UpstreamContractFixtureReport["checks"] {
  return {
    javaFixtureReadable: java.status !== "missing",
    javaJsonObject: isRecord(java.details) && Object.keys(java.details).length > 0,
    javaContractVersionOk: readString(java.details, "contractVersion") === "failed-event-replay-execution-contract.v1",
    javaContractDigestValid: isSha256Digest(readString(java.details, "contractDigest")),
    javaApprovalDigestValid: isSha256Digest(readString(java.details, "approvalDigest")),
    javaReplayEligibilityDigestValid: isSha256Digest(readString(java.details, "replayEligibilityDigest")),
    javaReplayPreconditionsSatisfied: readBoolean(java.details, "replayPreconditionsSatisfied") === true,
    javaDigestVerificationModeOk: readString(java.details, "digestVerificationMode") === "CLIENT_PRECHECK_ONLY",
    javaExpectedSideEffectsPresent: readStringArray(java.details.expectedSideEffects).length > 0,
    miniKvFixtureReadable: miniKv.status !== "missing",
    miniKvJsonObject: isRecord(miniKv.details) && Object.keys(miniKv.details).length > 0,
    miniKvSchemaVersionValid: isPositiveInteger(readNumber(miniKv.details, "schema_version")),
    miniKvCommandDigestValid: isFnv1a64Digest(readString(miniKv.details, "command_digest")),
    miniKvReadOnlyOk: readBoolean(miniKv.details, "read_only") === true,
    miniKvExecutionAllowedOk: readBoolean(miniKv.details, "execution_allowed") === false,
    miniKvSideEffectCountMatches: readNumber(miniKv.details, "side_effect_count") === readStringArray(miniKv.details.side_effects).length,
    miniKvDurabilityPresent: typeof readNested(miniKv.details, ["wal", "durability"]) === "string",
  };
}

function createSummary(
  java: UpstreamContractFixtureSource,
  miniKv: UpstreamContractFixtureSource,
): UpstreamContractFixtureReport["summary"] {
  return {
    javaFixtureStatus: java.status,
    ...optionalString("javaContractVersion", readString(java.details, "contractVersion")),
    ...optionalString("javaContractDigest", readString(java.details, "contractDigest")),
    ...optionalString("javaApprovalDigest", readString(java.details, "approvalDigest")),
    ...optionalString("javaReplayEligibilityDigest", readString(java.details, "replayEligibilityDigest")),
    ...optionalBoolean("javaReplayPreconditionsSatisfied", readBoolean(java.details, "replayPreconditionsSatisfied")),
    ...optionalString("javaDigestVerificationMode", readString(java.details, "digestVerificationMode")),
    ...(readStringArray(java.details.expectedSideEffects).length === 0 ? {} : { javaExpectedSideEffectCount: readStringArray(java.details.expectedSideEffects).length }),
    miniKvFixtureStatus: miniKv.status,
    ...optionalNumber("miniKvSchemaVersion", readNumber(miniKv.details, "schema_version")),
    ...optionalString("miniKvCommandDigest", readString(miniKv.details, "command_digest")),
    ...optionalBoolean("miniKvReadOnly", readBoolean(miniKv.details, "read_only")),
    ...optionalBoolean("miniKvExecutionAllowed", readBoolean(miniKv.details, "execution_allowed")),
    ...optionalNumber("miniKvSideEffectCount", readNumber(miniKv.details, "side_effect_count")),
    ...optionalString("miniKvDurability", readNestedString(miniKv.details, ["wal", "durability"])),
    missingFixtureCount: [java, miniKv].filter((source) => source.status === "missing").length,
    invalidFixtureCount: [java, miniKv].filter((source) => source.status === "invalid").length,
  };
}

function javaFixtureValid(details: Record<string, unknown>): boolean {
  return readString(details, "contractVersion") === "failed-event-replay-execution-contract.v1"
    && isSha256Digest(readString(details, "contractDigest"))
    && isSha256Digest(readString(details, "approvalDigest"))
    && isSha256Digest(readString(details, "replayEligibilityDigest"))
    && readBoolean(details, "replayPreconditionsSatisfied") === true
    && readString(details, "digestVerificationMode") === "CLIENT_PRECHECK_ONLY"
    && readStringArray(details.expectedSideEffects).length > 0;
}

function miniKvFixtureValid(details: Record<string, unknown>): boolean {
  const sideEffects = readStringArray(details.side_effects);
  return isPositiveInteger(readNumber(details, "schema_version"))
    && isFnv1a64Digest(readString(details, "command_digest"))
    && readBoolean(details, "read_only") === true
    && readBoolean(details, "execution_allowed") === false
    && readNumber(details, "side_effect_count") === sideEffects.length
    && typeof readNested(details, ["wal", "durability"]) === "string";
}

function collectNextActions(
  valid: boolean,
  summary: UpstreamContractFixtureReport["summary"],
): string[] {
  if (valid) {
    return [
      "Fixture report is valid; use these samples for Node fixture-driven smoke.",
      "Keep fixture samples read-only and do not treat them as production data.",
    ];
  }

  return [
    `Fix missing or invalid upstream fixture samples before fixture-driven smoke: missing=${summary.missingFixtureCount}, invalid=${summary.invalidFixtureCount}`,
    "Do not fall back to hand-written mock contract fields when stable fixtures are expected.",
  ];
}

function digestUpstreamContractFixtureReport(
  report: Omit<UpstreamContractFixtureReport, "fixtureDigest">,
): UpstreamContractFixtureDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        valid: report.valid,
        summary: report.summary,
        checks: report.checks,
        sources: report.sources,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...FIXTURE_DIGEST_COVERED_FIELDS],
  };
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

function optionalString<K extends string>(key: K, value: string | undefined): Record<K, string> | object {
  return value === undefined ? {} : { [key]: value };
}

function optionalNumber<K extends string>(key: K, value: number | undefined): Record<K, number> | object {
  return value === undefined ? {} : { [key]: value };
}

function optionalBoolean<K extends string>(key: K, value: boolean | undefined): Record<K, boolean> | object {
  return value === undefined ? {} : { [key]: value };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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
