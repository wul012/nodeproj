import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

import type { AppConfig } from "../config.js";
import { AuditLog, type AuditEvent } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";

export interface AuditRetentionIntegrityEvidence {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  evidenceVersion: "audit-retention-integrity-evidence.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    requestedStoreKind: string;
    runtimeStoreKind: "memory" | "file";
    storeImplementation: string;
    durableAtRuntime: boolean;
    auditStorePath?: string;
  };
  retentionPolicy: {
    retentionDays: number;
    maxFileBytes: number;
    rotationEnabled: boolean;
    backupEnabled: boolean;
    managedStoreConfigured: false;
    deletesOrRotatesFiles: false;
  };
  integrity: {
    eventCount: number;
    canonicalEventDigest: string;
    repeatedCanonicalEventDigest: string;
    digestStable: boolean;
    fileDigest?: string;
    fileLineCount: number;
    fileBytes: number;
  };
  checks: {
    fileRuntimeSelected: boolean;
    retentionDaysConfigured: boolean;
    maxFileBytesConfigured: boolean;
    rotationPolicyConfigured: boolean;
    backupPolicyConfigured: boolean;
    managedStoreConfigured: boolean;
    integrityDigestStable: boolean;
    readOnlyEvidenceOnly: boolean;
  };
  summary: {
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AuditRetentionIntegrityMessage[];
  warnings: AuditRetentionIntegrityMessage[];
  recommendations: AuditRetentionIntegrityMessage[];
  evidenceEndpoints: {
    auditRetentionIntegrityJson: string;
    auditRetentionIntegrityMarkdown: string;
    fileAuditRestartEvidenceJson: string;
    auditStoreRuntimeProfileJson: string;
  };
  nextActions: string[];
}

export interface AuditRetentionIntegrityMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  auditRetentionIntegrityJson: "/api/v1/audit/retention-integrity-evidence",
  auditRetentionIntegrityMarkdown: "/api/v1/audit/retention-integrity-evidence?format=markdown",
  fileAuditRestartEvidenceJson: "/api/v1/audit/file-restart-evidence",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
});

export function createAuditRetentionIntegrityEvidence(input: {
  config: Pick<AppConfig, "auditRetentionDays" | "auditMaxFileBytes" | "auditRotationEnabled" | "auditBackupEnabled">;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
}): AuditRetentionIntegrityEvidence {
  const events = input.auditLog.list(input.runtime.capacity);
  const canonicalEventDigest = digestEvents(events);
  const repeatedCanonicalEventDigest = digestEvents(input.auditLog.list(input.runtime.capacity));
  const fileSnapshot = readAuditFileSnapshot(input.runtime.auditStorePath);
  const checks = {
    fileRuntimeSelected: input.runtime.runtimeStoreKind === "file",
    retentionDaysConfigured: input.config.auditRetentionDays > 0,
    maxFileBytesConfigured: input.config.auditMaxFileBytes > 0,
    rotationPolicyConfigured: input.config.auditRotationEnabled,
    backupPolicyConfigured: input.config.auditBackupEnabled,
    managedStoreConfigured: false,
    integrityDigestStable: canonicalEventDigest === repeatedCanonicalEventDigest,
    readOnlyEvidenceOnly: true,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(input.runtime);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Audit retention integrity evidence",
    generatedAt: new Date().toISOString(),
    evidenceVersion: "audit-retention-integrity-evidence.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      requestedStoreKind: input.runtime.requestedStoreKind,
      runtimeStoreKind: input.runtime.runtimeStoreKind,
      storeImplementation: input.runtime.storeImplementation,
      durableAtRuntime: input.runtime.durableAtRuntime,
      auditStorePath: input.runtime.auditStorePath,
    },
    retentionPolicy: {
      retentionDays: input.config.auditRetentionDays,
      maxFileBytes: input.config.auditMaxFileBytes,
      rotationEnabled: input.config.auditRotationEnabled,
      backupEnabled: input.config.auditBackupEnabled,
      managedStoreConfigured: false,
      deletesOrRotatesFiles: false,
    },
    integrity: {
      eventCount: events.length,
      canonicalEventDigest,
      repeatedCanonicalEventDigest,
      digestStable: canonicalEventDigest === repeatedCanonicalEventDigest,
      fileDigest: fileSnapshot.digest,
      fileLineCount: fileSnapshot.lineCount,
      fileBytes: fileSnapshot.bytes,
    },
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
      "Keep file audit retention evidence read-only until a managed audit store exists.",
      "Add real rotation and backup implementation in a dedicated version before production operations.",
      "Use this evidence as input for production readiness summary v5.",
    ],
  };
}

export function renderAuditRetentionIntegrityEvidenceMarkdown(report: AuditRetentionIntegrityEvidence): string {
  return [
    "# Audit retention integrity evidence",
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
    "## Retention Policy",
    "",
    ...renderEntries(report.retentionPolicy),
    "",
    "## Integrity",
    "",
    ...renderEntries(report.integrity),
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
    ...renderMessages(report.productionBlockers, "No audit retention blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(report.warnings, "No audit retention warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(report.recommendations, "No audit retention recommendations."),
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

function collectProductionBlockers(checks: AuditRetentionIntegrityEvidence["checks"]): AuditRetentionIntegrityMessage[] {
  const blockers: AuditRetentionIntegrityMessage[] = [];
  addMessage(blockers, checks.fileRuntimeSelected, "AUDIT_FILE_RUNTIME_NOT_SELECTED", "File audit runtime must be selected before local file integrity evidence can be inspected.");
  addMessage(blockers, checks.retentionDaysConfigured, "AUDIT_RETENTION_DAYS_MISSING", "AUDIT_RETENTION_DAYS must be configured before production audit retention can be assessed.");
  addMessage(blockers, checks.maxFileBytesConfigured, "AUDIT_MAX_FILE_BYTES_MISSING", "AUDIT_MAX_FILE_BYTES must be configured before file audit growth can be bounded.");
  addMessage(blockers, checks.rotationPolicyConfigured, "AUDIT_ROTATION_POLICY_MISSING", "AUDIT_ROTATION_ENABLED must be true before file audit rotation is considered covered.");
  addMessage(blockers, checks.backupPolicyConfigured, "AUDIT_BACKUP_POLICY_MISSING", "AUDIT_BACKUP_ENABLED must be true before audit backup policy is considered covered.");
  addMessage(blockers, checks.managedStoreConfigured, "MANAGED_AUDIT_STORE_MISSING", "A managed durable audit store is still required before production operations.");
  addMessage(blockers, checks.integrityDigestStable, "AUDIT_INTEGRITY_DIGEST_UNSTABLE", "Audit event digest must be stable across repeated reads.");
  return blockers;
}

function collectWarnings(runtime: AuditStoreRuntimeDescription): AuditRetentionIntegrityMessage[] {
  if (runtime.runtimeStoreKind === "file") {
    return [
      {
        code: "FILE_AUDIT_POLICY_REHEARSAL_ONLY",
        severity: "warning",
        message: "File audit retention and integrity evidence is local rehearsal evidence, not managed production audit storage.",
      },
    ];
  }

  return [
    {
      code: "MEMORY_AUDIT_HAS_NO_FILE_DIGEST",
      severity: "warning",
      message: "Memory audit runtime cannot provide file digest evidence.",
    },
  ];
}

function collectRecommendations(): AuditRetentionIntegrityMessage[] {
  return [
    {
      code: "IMPLEMENT_MANAGED_AUDIT_RETENTION",
      severity: "recommendation",
      message: "Move retention, rotation, backup, and restore policy into a managed durable audit store.",
    },
    {
      code: "VERIFY_AUDIT_EXPORT_ACCESS",
      severity: "recommendation",
      message: "Protect audit evidence export with enforced auth before production exposure.",
    },
  ];
}

function addMessage(
  messages: AuditRetentionIntegrityMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function digestEvents(events: AuditEvent[]): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(events.map((event) => ({
    id: event.id,
    requestId: event.requestId,
    method: event.method,
    path: event.path,
    routeGroup: event.routeGroup,
    accessGuard: event.accessGuard,
    operatorIdentity: event.operatorIdentity,
    statusCode: event.statusCode,
    outcome: event.outcome,
    durationMs: event.durationMs,
  })))).digest("hex")}`;
}

function readAuditFileSnapshot(filePath: string | undefined): {
  digest?: string;
  lineCount: number;
  bytes: number;
} {
  if (filePath === undefined || !existsSync(filePath)) {
    return { lineCount: 0, bytes: 0 };
  }

  const content = readFileSync(filePath, "utf8");
  return {
    digest: `sha256:${createHash("sha256").update(content).digest("hex")}`,
    lineCount: content.split(/\r?\n/).filter((line) => line.trim().length > 0).length,
    bytes: Buffer.byteLength(content, "utf8"),
  };
}

function renderMessages(messages: AuditRetentionIntegrityMessage[], emptyText: string): string[] {
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
