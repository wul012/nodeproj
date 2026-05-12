import crypto from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  loadUpstreamContractFixtureDriftDiagnostics,
  type UpstreamContractFixtureDriftDiagnostics,
} from "./upstreamContractFixtureDrift.js";

export interface UpstreamContractFixtureArchiveDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface UpstreamContractFixtureArchiveSnapshot {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  valid: boolean;
  fixtureArchiveDigest: UpstreamContractFixtureArchiveDigest;
  summary: {
    fixtureReportValid: boolean;
    driftDiagnosticsValid: boolean;
    hasDrift: boolean;
    issueCount: number;
    missingMappingCount: number;
    javaFixtureStatus: string;
    miniKvFixtureStatus: string;
    javaReplayPreconditionsSatisfied?: boolean;
    miniKvReadOnly?: boolean;
    miniKvExecutionAllowed?: boolean;
  };
  digests: {
    fixtureReportDigest: string;
    driftDigest: string;
    javaContractDigest?: string;
    miniKvCommandDigest?: string;
  };
  sourcePaths: {
    javaExecutionContractFixturePath: string;
    miniKvCheckJsonFixturePath: string;
  };
  keyFields: {
    java: {
      contractVersion?: string;
      contractDigest?: string;
      approvalDigest?: string;
      replayEligibilityDigest?: string;
      replayPreconditionsSatisfied?: boolean;
      digestVerificationMode?: string;
      expectedSideEffectCount?: number;
    };
    miniKv: {
      schemaVersion?: number;
      commandDigest?: string;
      readOnly?: boolean;
      executionAllowed?: boolean;
      sideEffectCount?: number;
      durability?: string;
    };
    drift: {
      issueCount: number;
      errorCount: number;
      warningCount: number;
      missingMappingCount: number;
    };
  };
  evidenceEndpoints: {
    fixtureReportJson: string;
    fixtureReportMarkdown: string;
    driftDiagnosticsJson: string;
    driftDiagnosticsMarkdown: string;
    archiveSnapshotJson: string;
    archiveSnapshotMarkdown: string;
  };
  nextActions: string[];
}

const ARCHIVE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "valid",
  "summary",
  "digests",
  "sourcePaths",
  "keyFields",
  "evidenceEndpoints",
  "nextActions",
]);

const ENDPOINTS = Object.freeze({
  fixtureReportJson: "/api/v1/upstream-contract-fixtures",
  fixtureReportMarkdown: "/api/v1/upstream-contract-fixtures?format=markdown",
  driftDiagnosticsJson: "/api/v1/upstream-contract-fixtures/drift-diagnostics",
  driftDiagnosticsMarkdown: "/api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown",
  archiveSnapshotJson: "/api/v1/upstream-contract-fixtures/archive-snapshot",
  archiveSnapshotMarkdown: "/api/v1/upstream-contract-fixtures/archive-snapshot?format=markdown",
});

export async function loadUpstreamContractFixtureArchiveSnapshot(
  config: Pick<AppConfig, "javaExecutionContractFixturePath" | "miniKvCheckJsonFixturePath">,
): Promise<UpstreamContractFixtureArchiveSnapshot> {
  return createUpstreamContractFixtureArchiveSnapshot(
    await loadUpstreamContractFixtureDriftDiagnostics(config),
  );
}

export function createUpstreamContractFixtureArchiveSnapshot(
  diagnostics: UpstreamContractFixtureDriftDiagnostics,
): UpstreamContractFixtureArchiveSnapshot {
  const fixtureReport = diagnostics.fixtureReport;
  const valid = fixtureReport.valid && diagnostics.valid;
  const hasDrift = diagnostics.summary.issueCount > 0;
  const summary = {
    fixtureReportValid: fixtureReport.valid,
    driftDiagnosticsValid: diagnostics.valid,
    hasDrift,
    issueCount: diagnostics.summary.issueCount,
    missingMappingCount: diagnostics.summary.missingMappingCount,
    javaFixtureStatus: fixtureReport.summary.javaFixtureStatus,
    miniKvFixtureStatus: fixtureReport.summary.miniKvFixtureStatus,
    ...optionalBoolean("javaReplayPreconditionsSatisfied", fixtureReport.summary.javaReplayPreconditionsSatisfied),
    ...optionalBoolean("miniKvReadOnly", fixtureReport.summary.miniKvReadOnly),
    ...optionalBoolean("miniKvExecutionAllowed", fixtureReport.summary.miniKvExecutionAllowed),
  };
  const digests = {
    fixtureReportDigest: `${fixtureReport.fixtureDigest.algorithm}:${fixtureReport.fixtureDigest.value}`,
    driftDigest: `${diagnostics.driftDigest.algorithm}:${diagnostics.driftDigest.value}`,
    ...optionalString("javaContractDigest", fixtureReport.summary.javaContractDigest),
    ...optionalString("miniKvCommandDigest", fixtureReport.summary.miniKvCommandDigest),
  };
  const sourcePaths = {
    javaExecutionContractFixturePath: fixtureReport.sources.java.path,
    miniKvCheckJsonFixturePath: fixtureReport.sources.miniKv.path,
  };
  const keyFields = {
    java: {
      ...optionalString("contractVersion", fixtureReport.summary.javaContractVersion),
      ...optionalString("contractDigest", fixtureReport.summary.javaContractDigest),
      ...optionalString("approvalDigest", fixtureReport.summary.javaApprovalDigest),
      ...optionalString("replayEligibilityDigest", fixtureReport.summary.javaReplayEligibilityDigest),
      ...optionalBoolean("replayPreconditionsSatisfied", fixtureReport.summary.javaReplayPreconditionsSatisfied),
      ...optionalString("digestVerificationMode", fixtureReport.summary.javaDigestVerificationMode),
      ...optionalNumber("expectedSideEffectCount", fixtureReport.summary.javaExpectedSideEffectCount),
    },
    miniKv: {
      ...optionalNumber("schemaVersion", fixtureReport.summary.miniKvSchemaVersion),
      ...optionalString("commandDigest", fixtureReport.summary.miniKvCommandDigest),
      ...optionalBoolean("readOnly", fixtureReport.summary.miniKvReadOnly),
      ...optionalBoolean("executionAllowed", fixtureReport.summary.miniKvExecutionAllowed),
      ...optionalNumber("sideEffectCount", fixtureReport.summary.miniKvSideEffectCount),
      ...optionalString("durability", fixtureReport.summary.miniKvDurability),
    },
    drift: {
      issueCount: diagnostics.summary.issueCount,
      errorCount: diagnostics.summary.errorCount,
      warningCount: diagnostics.summary.warningCount,
      missingMappingCount: diagnostics.summary.missingMappingCount,
    },
  };
  const nextActions = collectNextActions(valid, hasDrift);
  const snapshotWithoutDigest = {
    service: "orderops-node" as const,
    title: "Upstream fixture evidence archive snapshot",
    generatedAt: new Date().toISOString(),
    valid,
    summary,
    digests,
    sourcePaths,
    keyFields,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions,
  };

  return {
    ...snapshotWithoutDigest,
    fixtureArchiveDigest: digestUpstreamContractFixtureArchiveSnapshot(snapshotWithoutDigest),
  };
}

export function renderUpstreamContractFixtureArchiveSnapshotMarkdown(
  snapshot: UpstreamContractFixtureArchiveSnapshot,
): string {
  return [
    "# Upstream fixture evidence archive snapshot",
    "",
    `- Service: ${snapshot.service}`,
    `- Generated at: ${snapshot.generatedAt}`,
    `- Valid: ${snapshot.valid}`,
    `- Fixture archive digest: ${snapshot.fixtureArchiveDigest.algorithm}:${snapshot.fixtureArchiveDigest.value}`,
    "",
    "## Summary",
    "",
    `- Fixture report valid: ${snapshot.summary.fixtureReportValid}`,
    `- Drift diagnostics valid: ${snapshot.summary.driftDiagnosticsValid}`,
    `- Has drift: ${snapshot.summary.hasDrift}`,
    `- Issue count: ${snapshot.summary.issueCount}`,
    `- Missing mapping count: ${snapshot.summary.missingMappingCount}`,
    `- Java fixture: ${snapshot.summary.javaFixtureStatus}`,
    `- mini-kv fixture: ${snapshot.summary.miniKvFixtureStatus}`,
    `- Java replay preconditions satisfied: ${formatValue(snapshot.summary.javaReplayPreconditionsSatisfied)}`,
    `- mini-kv read_only: ${formatValue(snapshot.summary.miniKvReadOnly)}`,
    `- mini-kv execution_allowed: ${formatValue(snapshot.summary.miniKvExecutionAllowed)}`,
    "",
    "## Digests",
    "",
    `- Fixture report digest: ${snapshot.digests.fixtureReportDigest}`,
    `- Drift digest: ${snapshot.digests.driftDigest}`,
    `- Java contract digest: ${snapshot.digests.javaContractDigest ?? "unknown"}`,
    `- mini-kv command digest: ${snapshot.digests.miniKvCommandDigest ?? "unknown"}`,
    "",
    "## Source Paths",
    "",
    `- Java execution-contract fixture: ${snapshot.sourcePaths.javaExecutionContractFixturePath}`,
    `- mini-kv CHECKJSON fixture: ${snapshot.sourcePaths.miniKvCheckJsonFixturePath}`,
    "",
    "## Key Fields",
    "",
    "### Java",
    "",
    ...renderEntries(snapshot.keyFields.java),
    "",
    "### mini-kv",
    "",
    ...renderEntries(snapshot.keyFields.miniKv),
    "",
    "### Drift",
    "",
    ...renderEntries(snapshot.keyFields.drift),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(snapshot.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(snapshot.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function collectNextActions(valid: boolean, hasDrift: boolean): string[] {
  if (valid && !hasDrift) {
    return [
      "Archive snapshot is ready to attach to Node smoke evidence.",
      "Keep this snapshot read-only; it proves fixture evidence, not upstream execution approval.",
    ];
  }

  return [
    "Resolve fixture report or drift diagnostics issues before treating this snapshot as stable evidence.",
    "Do not auto-repair fixture drift and do not use this snapshot as a real execution permit.",
  ];
}

function digestUpstreamContractFixtureArchiveSnapshot(
  snapshot: Omit<UpstreamContractFixtureArchiveSnapshot, "fixtureArchiveDigest">,
): UpstreamContractFixtureArchiveDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: snapshot.service,
        valid: snapshot.valid,
        summary: snapshot.summary,
        digests: snapshot.digests,
        sourcePaths: snapshot.sourcePaths,
        keyFields: snapshot.keyFields,
        evidenceEndpoints: snapshot.evidenceEndpoints,
        nextActions: snapshot.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...ARCHIVE_DIGEST_COVERED_FIELDS],
  };
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
