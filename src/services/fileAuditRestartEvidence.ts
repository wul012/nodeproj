import { createHash, randomUUID } from "node:crypto";

import type { AppConfig } from "../config.js";
import { AuditLog, FileBackedAuditStore, InMemoryAuditStore, type AuditEvent } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";

export interface FileAuditRestartEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  evidenceVersion: "file-audit-restart-evidence.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    requestedStoreKind: string;
    runtimeStoreKind: "memory" | "file";
    storeImplementation: string;
    durableAtRuntime: boolean;
    configuredByEnvironment: boolean;
    auditStorePath?: string;
  };
  rehearsal: {
    mode: "file-runtime-reload" | "memory-runtime-skip";
    writesSyntheticEvent: boolean;
    beforeEventCount: number;
    writtenEventCount: number;
    restoredEventCount: number;
    expectedRequestId: string;
    restoredRequestIds: string[];
    digestBefore: string;
    digestAfterWrite: string;
    digestAfterRestore: string;
    recoveryVerified: boolean;
  };
  checks: {
    fileRuntimeSelected: boolean;
    filePathConfigured: boolean;
    syntheticWriteRecorded: boolean;
    restoredEventPresent: boolean;
    digestChangedAfterWrite: boolean;
    digestStableAfterRestore: boolean;
    memoryRuntimeNotClaimedDurable: boolean;
    productionAuditStillBlocked: boolean;
  };
  summary: {
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: FileAuditRestartEvidenceMessage[];
  warnings: FileAuditRestartEvidenceMessage[];
  recommendations: FileAuditRestartEvidenceMessage[];
  evidenceEndpoints: {
    fileAuditRestartEvidenceJson: string;
    fileAuditRestartEvidenceMarkdown: string;
    auditStoreProfileJson: string;
    auditEventsJson: string;
  };
  nextActions: string[];
}

export interface FileAuditRestartEvidenceMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  fileAuditRestartEvidenceJson: "/api/v1/audit/file-restart-evidence",
  fileAuditRestartEvidenceMarkdown: "/api/v1/audit/file-restart-evidence?format=markdown",
  auditStoreProfileJson: "/api/v1/audit/store-profile",
  auditEventsJson: "/api/v1/audit/events?limit=50",
});

export function createFileAuditRestartEvidenceReport(input: {
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">;
  runtime: AuditStoreRuntimeDescription;
}): FileAuditRestartEvidenceReport {
  const rehearsal = runRestartRehearsal(input.runtime);
  const checks = {
    fileRuntimeSelected: input.runtime.runtimeStoreKind === "file",
    filePathConfigured: input.runtime.auditStorePath !== undefined && input.runtime.auditStorePath.length > 0,
    syntheticWriteRecorded: rehearsal.writtenEventCount === 1,
    restoredEventPresent: rehearsal.recoveryVerified,
    digestChangedAfterWrite: rehearsal.digestBefore !== rehearsal.digestAfterWrite,
    digestStableAfterRestore: rehearsal.digestAfterWrite === rehearsal.digestAfterRestore,
    memoryRuntimeNotClaimedDurable: input.runtime.runtimeStoreKind !== "memory" || rehearsal.recoveryVerified === false,
    productionAuditStillBlocked: true,
  };
  const productionBlockers = collectProductionBlockers();
  const warnings = collectWarnings(input.runtime);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "File audit restart evidence",
    generatedAt: new Date().toISOString(),
    evidenceVersion: "file-audit-restart-evidence.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      requestedStoreKind: input.runtime.requestedStoreKind,
      runtimeStoreKind: input.runtime.runtimeStoreKind,
      storeImplementation: input.runtime.storeImplementation,
      durableAtRuntime: input.runtime.durableAtRuntime,
      configuredByEnvironment: input.runtime.configuredByEnvironment,
      auditStorePath: input.runtime.auditStorePath,
    },
    rehearsal,
    checks,
    summary: {
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep file-backed audit as restart rehearsal evidence, not as the final production audit store.",
      "Add retention, rotation, backup, encryption, and access-control policy before production operations.",
      "Use this report as input for the next production readiness summary.",
    ],
  };
}

export function renderFileAuditRestartEvidenceMarkdown(report: FileAuditRestartEvidenceReport): string {
  return [
    "# File audit restart evidence",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Evidence version: ${report.evidenceVersion}`,
    `- Ready for production audit: ${report.readyForProductionAudit}`,
    `- Read only: ${report.readOnly}`,
    `- Execution allowed: ${report.executionAllowed}`,
    "",
    "## Runtime",
    "",
    ...renderEntries(report.runtime),
    "",
    "## Rehearsal",
    "",
    ...renderEntries(report.rehearsal),
    "",
    "## Checks",
    "",
    ...renderEntries(report.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(report.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(report.productionBlockers, "No file audit blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(report.warnings, "No file audit warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(report.recommendations, "No file audit recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(report.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function runRestartRehearsal(runtime: AuditStoreRuntimeDescription): FileAuditRestartEvidenceReport["rehearsal"] {
  const expectedRequestId = `restart-evidence-${randomUUID()}`;

  if (runtime.runtimeStoreKind !== "file" || runtime.auditStorePath === undefined) {
    const log = new AuditLog({ capacity: runtime.capacity, store: new InMemoryAuditStore(runtime.capacity) });
    const before = log.list(runtime.capacity);
    log.record(createSyntheticEventInput(expectedRequestId));
    const afterWrite = log.list(runtime.capacity);

    return {
      mode: "memory-runtime-skip",
      writesSyntheticEvent: false,
      beforeEventCount: before.length,
      writtenEventCount: 0,
      restoredEventCount: 0,
      expectedRequestId,
      restoredRequestIds: [],
      digestBefore: digestEvents(before),
      digestAfterWrite: digestEvents(afterWrite),
      digestAfterRestore: digestEvents([]),
      recoveryVerified: false,
    };
  }

  const beforeLog = new AuditLog({ capacity: runtime.capacity, store: new FileBackedAuditStore(runtime.auditStorePath, runtime.capacity) });
  const beforeEvents = beforeLog.list(runtime.capacity);
  beforeLog.record(createSyntheticEventInput(expectedRequestId));
  const afterWriteEvents = beforeLog.list(runtime.capacity);
  const restoredLog = new AuditLog({ capacity: runtime.capacity, store: new FileBackedAuditStore(runtime.auditStorePath, runtime.capacity) });
  const restoredEvents = restoredLog.list(runtime.capacity);
  const restoredRequestIds = restoredEvents.map((event) => event.requestId);

  return {
    mode: "file-runtime-reload",
    writesSyntheticEvent: true,
    beforeEventCount: beforeEvents.length,
    writtenEventCount: 1,
    restoredEventCount: restoredEvents.length,
    expectedRequestId,
    restoredRequestIds,
    digestBefore: digestEvents(beforeEvents),
    digestAfterWrite: digestEvents(afterWriteEvents),
    digestAfterRestore: digestEvents(restoredEvents),
    recoveryVerified: restoredRequestIds.includes(expectedRequestId),
  };
}

function createSyntheticEventInput(requestId: string): Parameters<AuditLog["record"]>[0] {
  return {
    requestId,
    method: "GET",
    path: "/api/v1/audit/file-restart-evidence",
    statusCode: 200,
    durationMs: 1,
    accessGuard: {
      guardVersion: "access-guard-dry-run.v1",
      mode: "dry-run",
      rejectsRequests: false,
      policyMatched: true,
      policyId: "audit-read",
      routeGroup: "audit",
      requiredRole: "auditor",
      matchedRoles: ["auditor"],
      wouldDeny: false,
      reason: "allowed_by_role",
    },
    operatorIdentity: {
      identityVersion: "operator-identity-contract.v1",
      authenticated: true,
      operatorId: "audit-restart-rehearsal",
      roles: ["auditor"],
      authSource: "headers",
      rawRoles: ["auditor"],
      rejectedRoles: [],
    },
  };
}

function collectProductionBlockers(): FileAuditRestartEvidenceMessage[] {
  return [
    {
      code: "MANAGED_AUDIT_STORE_MISSING",
      severity: "blocker",
      message: "File-backed audit restart evidence is not a managed production audit store.",
    },
    {
      code: "AUDIT_RETENTION_POLICY_MISSING",
      severity: "blocker",
      message: "Production audit still needs retention, rotation, backup, and access policy.",
    },
  ];
}

function collectWarnings(runtime: AuditStoreRuntimeDescription): FileAuditRestartEvidenceMessage[] {
  if (runtime.runtimeStoreKind === "file") {
    return [
      {
        code: "FILE_RUNTIME_REHEARSAL_ONLY",
        severity: "warning",
        message: "File runtime proves local reload behavior but is still not the final production audit target.",
      },
    ];
  }

  return [
    {
      code: "MEMORY_RUNTIME_NOT_DURABLE",
      severity: "warning",
      message: "Memory runtime cannot prove restart recovery and should only be used for local development.",
    },
  ];
}

function collectRecommendations(): FileAuditRestartEvidenceMessage[] {
  return [
    {
      code: "PROMOTE_MANAGED_AUDIT_STORE",
      severity: "recommendation",
      message: "Move audit evidence to a managed durable store in a dedicated production-hardening version.",
    },
    {
      code: "COVER_RETENTION_AND_BACKUP",
      severity: "recommendation",
      message: "Add explicit tests and documentation for retention, rotation, backup, and restore policy.",
    },
  ];
}

function digestEvents(events: AuditEvent[]): string {
  const canonical = JSON.stringify(events.map((event) => ({
    requestId: event.requestId,
    method: event.method,
    path: event.path,
    routeGroup: event.routeGroup,
    accessGuard: event.accessGuard,
    operatorIdentity: event.operatorIdentity,
    statusCode: event.statusCode,
    outcome: event.outcome,
  })));
  return `sha256:${createHash("sha256").update(canonical).digest("hex")}`;
}

function renderMessages(messages: FileAuditRestartEvidenceMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
}

function renderEntries(record: object): string[] {
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
