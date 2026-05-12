import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";

export interface UpstreamProductionEvidenceIntake {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  intakeVersion: "upstream-production-evidence-intake.v1";
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  sources: {
    java: UpstreamEvidenceSource;
    miniKv: UpstreamEvidenceSource;
  };
  checks: {
    javaEvidenceReadable: boolean;
    javaEvidenceVersionOk: boolean;
    javaReadOnly: boolean;
    javaExecutionBlocked: boolean;
    javaReplayNotAllowedByEvidence: boolean;
    javaApprovalDryRun: boolean;
    javaEvidenceEndpointsPresent: boolean;
    miniKvEvidenceReadable: boolean;
    miniKvSchemaVersionOk: boolean;
    miniKvReadOnly: boolean;
    miniKvExecutionBlocked: boolean;
    miniKvNotOrderAuthoritative: boolean;
    miniKvNoWriteCommandsExecuted: boolean;
    miniKvSideEffectCountMatches: boolean;
    allSourcesReadOnly: boolean;
    executionStillBlocked: boolean;
  };
  summary: {
    sourceCount: number;
    validSourceCount: number;
    invalidSourceCount: number;
    missingSourceCount: number;
    productionBlockerCount: number;
    warningCount: number;
    javaBlockerCount: number;
    javaWarningCount: number;
    miniKvDiagnosticNoteCount: number;
  };
  normalized: {
    java: {
      serviceName?: string;
      serviceVersion?: string;
      evidenceVersion?: string;
      replayBacklog?: number;
      pendingOutboxEvents?: number;
      realReplayAllowedByEvidence?: boolean;
      requiredApprovalStatus?: string;
      dryRun?: boolean;
      evidenceEndpointCount: number;
    };
    miniKv: {
      version?: string;
      schemaVersion?: number;
      liveKeys?: number;
      walEnabled?: boolean;
      walStatus?: string;
      snapshotSupported?: boolean;
      orderAuthoritative?: boolean;
      sideEffectCount?: number;
      diagnosticNotes: string[];
    };
  };
  productionBlockers: UpstreamProductionEvidenceMessage[];
  warnings: UpstreamProductionEvidenceMessage[];
  evidenceEndpoints: {
    upstreamProductionEvidenceIntakeJson: string;
    upstreamProductionEvidenceIntakeMarkdown: string;
    productionReadinessSummaryJson: string;
    javaOpsEvidence: string;
    miniKvStorageEvidence: string;
  };
  nextActions: string[];
}

export interface UpstreamEvidenceSource {
  project: "java" | "mini-kv";
  path: string;
  status: "available" | "missing" | "invalid";
  message: string;
}

export interface UpstreamProductionEvidenceMessage {
  code: string;
  severity: "blocker" | "warning";
  source: "java" | "mini-kv" | "node";
  message: string;
}

const ENDPOINTS = Object.freeze({
  upstreamProductionEvidenceIntakeJson: "/api/v1/upstreams/production-evidence-intake",
  upstreamProductionEvidenceIntakeMarkdown: "/api/v1/upstreams/production-evidence-intake?format=markdown",
  productionReadinessSummaryJson: "/api/v1/production/readiness-summary",
  javaOpsEvidence: "/api/v1/ops/evidence",
  miniKvStorageEvidence: "STORAGEJSON",
});

export async function loadUpstreamProductionEvidenceIntake(
  config: Pick<AppConfig, "javaOpsEvidenceFixturePath" | "miniKvStorageEvidenceFixturePath">,
): Promise<UpstreamProductionEvidenceIntake> {
  const java = await readJsonEvidence(config.javaOpsEvidenceFixturePath, "java");
  const miniKv = await readJsonEvidence(config.miniKvStorageEvidenceFixturePath, "mini-kv");

  return createUpstreamProductionEvidenceIntake({
    javaPath: config.javaOpsEvidenceFixturePath,
    javaEvidence: java.data,
    javaSource: java.source,
    miniKvPath: config.miniKvStorageEvidenceFixturePath,
    miniKvEvidence: miniKv.data,
    miniKvSource: miniKv.source,
  });
}

export function createUpstreamProductionEvidenceIntake(input: {
  javaPath: string;
  javaEvidence: unknown;
  javaSource?: UpstreamEvidenceSource;
  miniKvPath: string;
  miniKvEvidence: unknown;
  miniKvSource?: UpstreamEvidenceSource;
}): UpstreamProductionEvidenceIntake {
  const java = isRecord(input.javaEvidence) ? input.javaEvidence : {};
  const miniKv = isRecord(input.miniKvEvidence) ? input.miniKvEvidence : {};
  const javaSource = input.javaSource ?? createSource("java", input.javaPath, Object.keys(java).length > 0);
  const miniKvSource = input.miniKvSource ?? createSource("mini-kv", input.miniKvPath, Object.keys(miniKv).length > 0);
  const javaEvidenceEndpoints = readStringArray(java.evidenceEndpoints);
  const miniKvNotes = readStringArray(readPath(miniKv, "diagnostics.notes"));
  const miniKvSideEffects = readStringArray(miniKv.side_effects);
  const checks = {
    javaEvidenceReadable: javaSource.status === "available",
    javaEvidenceVersionOk: readString(java, "evidenceVersion") === "java-ops-evidence.v1",
    javaReadOnly: readBoolean(java, "readOnly") === true,
    javaExecutionBlocked: readBoolean(java, "executionAllowed") === false,
    javaReplayNotAllowedByEvidence: readBoolean(readRecord(java, "failedEventReplay"), "realReplayAllowedByEvidence") === false,
    javaApprovalDryRun: readBoolean(readRecord(java, "approvalExecution"), "dryRun") === true,
    javaEvidenceEndpointsPresent: javaEvidenceEndpoints.length >= 5,
    miniKvEvidenceReadable: miniKvSource.status === "available",
    miniKvSchemaVersionOk: readNumber(miniKv, "schema_version") === 1,
    miniKvReadOnly: readBoolean(miniKv, "read_only") === true,
    miniKvExecutionBlocked: readBoolean(miniKv, "execution_allowed") === false,
    miniKvNotOrderAuthoritative: readBoolean(readRecord(miniKv, "store"), "order_authoritative") === false
      && readBoolean(readRecord(miniKv, "diagnostics"), "order_authoritative") === false,
    miniKvNoWriteCommandsExecuted: readBoolean(readRecord(miniKv, "diagnostics"), "write_commands_executed") === false,
    miniKvSideEffectCountMatches: readNumber(miniKv, "side_effect_count") === miniKvSideEffects.length,
    allSourcesReadOnly: readBoolean(java, "readOnly") === true && readBoolean(miniKv, "read_only") === true,
    executionStillBlocked: readBoolean(java, "executionAllowed") === false && readBoolean(miniKv, "execution_allowed") === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(java, miniKv);
  const valid = Object.values(checks).every(Boolean) && productionBlockers.length === 0;
  const sources = { java: javaSource, miniKv: miniKvSource };

  return {
    service: "orderops-node",
    title: "Upstream production evidence intake",
    generatedAt: new Date().toISOString(),
    intakeVersion: "upstream-production-evidence-intake.v1",
    valid,
    readOnly: true,
    executionAllowed: false,
    sources,
    checks,
    summary: {
      sourceCount: 2,
      validSourceCount: [javaSource, miniKvSource].filter((source) => source.status === "available").length,
      invalidSourceCount: [javaSource, miniKvSource].filter((source) => source.status === "invalid").length,
      missingSourceCount: [javaSource, miniKvSource].filter((source) => source.status === "missing").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      javaBlockerCount: readStringArray(java.blockers).length,
      javaWarningCount: readStringArray(java.warnings).length,
      miniKvDiagnosticNoteCount: miniKvNotes.length,
    },
    normalized: {
      java: {
        serviceName: readString(readRecord(java, "service"), "name"),
        serviceVersion: readString(readRecord(java, "service"), "version"),
        evidenceVersion: readString(java, "evidenceVersion"),
        replayBacklog: readNumber(readRecord(java, "failedEventReplay"), "replayBacklog"),
        pendingOutboxEvents: readNumber(readRecord(java, "outbox"), "pendingEvents"),
        realReplayAllowedByEvidence: readBoolean(readRecord(java, "failedEventReplay"), "realReplayAllowedByEvidence"),
        requiredApprovalStatus: readString(readRecord(java, "approvalExecution"), "requiredApprovalStatus"),
        dryRun: readBoolean(readRecord(java, "approvalExecution"), "dryRun"),
        evidenceEndpointCount: javaEvidenceEndpoints.length,
      },
      miniKv: {
        version: readString(miniKv, "version"),
        schemaVersion: readNumber(miniKv, "schema_version"),
        liveKeys: readNumber(readRecord(miniKv, "store"), "live_keys"),
        walEnabled: readBoolean(readRecord(miniKv, "wal"), "enabled"),
        walStatus: readString(readRecord(miniKv, "wal"), "status"),
        snapshotSupported: readBoolean(readRecord(miniKv, "snapshot"), "supported"),
        orderAuthoritative: readBoolean(readRecord(miniKv, "store"), "order_authoritative"),
        sideEffectCount: readNumber(miniKv, "side_effect_count"),
        diagnosticNotes: miniKvNotes,
      },
    },
    productionBlockers,
    warnings,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };
}

export function renderUpstreamProductionEvidenceIntakeMarkdown(intake: UpstreamProductionEvidenceIntake): string {
  return [
    "# Upstream production evidence intake",
    "",
    `- Service: ${intake.service}`,
    `- Generated at: ${intake.generatedAt}`,
    `- Intake version: ${intake.intakeVersion}`,
    `- Valid: ${intake.valid}`,
    `- Read only: ${intake.readOnly}`,
    `- Execution allowed: ${intake.executionAllowed}`,
    "",
    "## Sources",
    "",
    ...renderEntries(intake.sources.java, "java"),
    ...renderEntries(intake.sources.miniKv, "miniKv"),
    "",
    "## Checks",
    "",
    ...renderEntries(intake.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(intake.summary),
    "",
    "## Normalized Evidence",
    "",
    ...renderEntries(intake.normalized.java, "java"),
    ...renderEntries(intake.normalized.miniKv, "miniKv"),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(intake.productionBlockers, "No upstream production evidence blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(intake.warnings, "No upstream production evidence warnings."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(intake.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(intake.nextActions, "No next actions."),
    "",
  ].join("\n");
}

async function readJsonEvidence(
  filePath: string,
  project: UpstreamEvidenceSource["project"],
): Promise<{ data?: unknown; source: UpstreamEvidenceSource }> {
  try {
    const data: unknown = JSON.parse(await readFile(filePath, "utf8"));
    if (!isRecord(data)) {
      return {
        data,
        source: {
          project,
          path: filePath,
          status: "invalid",
          message: "Evidence fixture is not a JSON object.",
        },
      };
    }

    return {
      data,
      source: {
        project,
        path: filePath,
        status: "available",
        message: "Evidence fixture was read and parsed.",
      },
    };
  } catch (error) {
    return {
      source: {
        project,
        path: filePath,
        status: "missing",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

function createSource(
  project: UpstreamEvidenceSource["project"],
  filePath: string,
  available: boolean,
): UpstreamEvidenceSource {
  return {
    project,
    path: filePath,
    status: available ? "available" : "missing",
    message: available ? "Evidence object was provided." : "Evidence object is missing.",
  };
}

function collectProductionBlockers(
  checks: UpstreamProductionEvidenceIntake["checks"],
): UpstreamProductionEvidenceMessage[] {
  const blockers: UpstreamProductionEvidenceMessage[] = [];
  addMessage(blockers, checks.javaEvidenceReadable, "JAVA_EVIDENCE_MISSING", "java", "Java ops evidence must be readable.");
  addMessage(blockers, checks.javaEvidenceVersionOk, "JAVA_EVIDENCE_VERSION_INVALID", "java", "Java ops evidenceVersion must be java-ops-evidence.v1.");
  addMessage(blockers, checks.javaReadOnly, "JAVA_EVIDENCE_NOT_READ_ONLY", "java", "Java ops evidence must report readOnly=true.");
  addMessage(blockers, checks.javaExecutionBlocked, "JAVA_EXECUTION_ALLOWED", "java", "Java ops evidence must report executionAllowed=false.");
  addMessage(blockers, checks.javaReplayNotAllowedByEvidence, "JAVA_REPLAY_ALLOWED_BY_EVIDENCE", "java", "Java evidence must not authorize real replay.");
  addMessage(blockers, checks.javaApprovalDryRun, "JAVA_APPROVAL_NOT_DRY_RUN", "java", "Java approval evidence must remain dry-run.");
  addMessage(blockers, checks.javaEvidenceEndpointsPresent, "JAVA_EVIDENCE_ENDPOINTS_INCOMPLETE", "java", "Java evidence should list follow-up read-only endpoints.");
  addMessage(blockers, checks.miniKvEvidenceReadable, "MINIKV_EVIDENCE_MISSING", "mini-kv", "mini-kv STORAGEJSON evidence must be readable.");
  addMessage(blockers, checks.miniKvSchemaVersionOk, "MINIKV_SCHEMA_VERSION_INVALID", "mini-kv", "mini-kv STORAGEJSON schema_version must be 1.");
  addMessage(blockers, checks.miniKvReadOnly, "MINIKV_EVIDENCE_NOT_READ_ONLY", "mini-kv", "mini-kv STORAGEJSON must report read_only=true.");
  addMessage(blockers, checks.miniKvExecutionBlocked, "MINIKV_EXECUTION_ALLOWED", "mini-kv", "mini-kv STORAGEJSON must report execution_allowed=false.");
  addMessage(blockers, checks.miniKvNotOrderAuthoritative, "MINIKV_ORDER_AUTHORITATIVE", "mini-kv", "mini-kv must not be treated as order-authoritative.");
  addMessage(blockers, checks.miniKvNoWriteCommandsExecuted, "MINIKV_WRITE_EXECUTED", "mini-kv", "STORAGEJSON diagnostics must report write_commands_executed=false.");
  addMessage(blockers, checks.miniKvSideEffectCountMatches, "MINIKV_SIDE_EFFECT_COUNT_MISMATCH", "mini-kv", "mini-kv side_effect_count must match side_effects length.");
  addMessage(blockers, checks.allSourcesReadOnly, "UPSTREAM_NOT_ALL_READ_ONLY", "node", "All upstream production evidence sources must be read-only.");
  addMessage(blockers, checks.executionStillBlocked, "UPSTREAM_EXECUTION_NOT_BLOCKED", "node", "All upstream production evidence sources must keep execution blocked.");
  return blockers;
}

function collectWarnings(
  java: Record<string, unknown>,
  miniKv: Record<string, unknown>,
): UpstreamProductionEvidenceMessage[] {
  const warnings: UpstreamProductionEvidenceMessage[] = [];
  const javaBlockers = readStringArray(java.blockers);
  const miniKvNotes = readStringArray(readPath(miniKv, "diagnostics.notes"));

  if (javaBlockers.length > 0) {
    warnings.push({
      code: "JAVA_EVIDENCE_HAS_RUNTIME_BLOCKERS",
      severity: "warning",
      source: "java",
      message: `Java evidence currently reports blockers: ${javaBlockers.join(", ")}`,
    });
  }

  if (miniKvNotes.includes("not_order_authoritative")) {
    warnings.push({
      code: "MINIKV_NOT_ORDER_AUTHORITATIVE",
      severity: "warning",
      source: "mini-kv",
      message: "mini-kv storage evidence is intentionally not an order-authoritative data source.",
    });
  }

  return warnings;
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Archive this intake beside the production readiness summary before Node v99.",
      "Keep Java replay and mini-kv writes behind separate audited workflows.",
      "Use this intake as the upstream-observability input for the next production readiness summary.",
    ];
  }

  return [
    "Resolve upstream evidence blockers before Node v99 summarizes these sources.",
    "Do not fall back to live upstream writes when production evidence is missing.",
  ];
}

function addMessage(
  messages: UpstreamProductionEvidenceMessage[],
  condition: boolean,
  code: string,
  source: UpstreamProductionEvidenceMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function readRecord(record: Record<string, unknown>, field: string): Record<string, unknown> {
  const value = record[field];
  return isRecord(value) ? value : {};
}

function readPath(record: Record<string, unknown>, field: string): unknown {
  if (!field.includes(".")) {
    return record[field];
  }

  let current: unknown = record;
  for (const segment of field.split(".")) {
    if (!isRecord(current)) {
      return undefined;
    }
    current = current[segment];
  }
  return current;
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

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function renderMessages(messages: UpstreamProductionEvidenceMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object, prefix?: string): string[] {
  return Object.entries(record).map(([key, value]) => `- ${prefix === undefined ? key : `${prefix}.${key}`}: ${formatValue(value)}`);
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
