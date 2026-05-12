import type { AppConfig } from "../config.js";

export interface AuditStoreEnvConfigProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "audit-store-env-config-profile.v1";
  readyForDurableAuditMigration: boolean;
  readOnly: true;
  executionAllowed: false;
  config: {
    requestedStoreKind: string;
    normalizedStoreKind: "memory" | "file" | "database" | "unknown";
    auditStorePathConfigured: boolean;
    auditStoreUrlConfigured: boolean;
    auditStoreUrlRedacted: string;
    runtimeStillUsesDefaultInMemoryStore: true;
  };
  checks: {
    storeKindRecognized: boolean;
    currentRuntimeStillInMemory: boolean;
    fileStorePathReady: boolean;
    databaseStoreUrlReady: boolean;
    durableStoreRequested: boolean;
    durableStoreWiringImplemented: boolean;
    noDatabaseConnectionAttempted: boolean;
    noSecretValueExposed: boolean;
    migrationRequiredBeforeProduction: boolean;
  };
  summary: {
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    durableConfigFieldCount: number;
  };
  productionBlockers: AuditStoreEnvConfigMessage[];
  warnings: AuditStoreEnvConfigMessage[];
  recommendations: AuditStoreEnvConfigMessage[];
  evidenceEndpoints: {
    auditStoreEnvConfigProfileJson: string;
    auditStoreEnvConfigProfileMarkdown: string;
    auditStoreRuntimeProfileJson: string;
    auditSummaryJson: string;
  };
  nextActions: string[];
}

export interface AuditStoreEnvConfigMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  auditStoreEnvConfigProfileJson: "/api/v1/audit/store-config-profile",
  auditStoreEnvConfigProfileMarkdown: "/api/v1/audit/store-config-profile?format=markdown",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
  auditSummaryJson: "/api/v1/audit/summary",
});

export function createAuditStoreEnvConfigProfile(
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">,
): AuditStoreEnvConfigProfile {
  const normalizedStoreKind = normalizeStoreKind(config.auditStoreKind);
  const auditStorePathConfigured = config.auditStorePath.length > 0;
  const auditStoreUrlConfigured = config.auditStoreUrl.length > 0;
  const checks = {
    storeKindRecognized: normalizedStoreKind !== "unknown",
    currentRuntimeStillInMemory: true,
    fileStorePathReady: normalizedStoreKind !== "file" || auditStorePathConfigured,
    databaseStoreUrlReady: normalizedStoreKind !== "database" || auditStoreUrlConfigured,
    durableStoreRequested: normalizedStoreKind === "file" || normalizedStoreKind === "database",
    durableStoreWiringImplemented: false,
    noDatabaseConnectionAttempted: true,
    noSecretValueExposed: true,
    migrationRequiredBeforeProduction: true,
  };
  const productionBlockers = collectProductionBlockers(checks, normalizedStoreKind);
  const warnings = collectWarnings(config, normalizedStoreKind);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Audit store env config profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "audit-store-env-config-profile.v1",
    readyForDurableAuditMigration: productionBlockers.length === 0,
    readOnly: true,
    executionAllowed: false,
    config: {
      requestedStoreKind: config.auditStoreKind,
      normalizedStoreKind,
      auditStorePathConfigured,
      auditStoreUrlConfigured,
      auditStoreUrlRedacted: redactUrl(config.auditStoreUrl),
      runtimeStillUsesDefaultInMemoryStore: true,
    },
    checks,
    summary: {
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      durableConfigFieldCount: [config.auditStoreKind, config.auditStorePath, config.auditStoreUrl]
        .filter((value) => value.length > 0).length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(productionBlockers.length),
  };
}

export function renderAuditStoreEnvConfigProfileMarkdown(profile: AuditStoreEnvConfigProfile): string {
  return [
    "# Audit store env config profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for durable audit migration: ${profile.readyForDurableAuditMigration}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Config",
    "",
    ...renderEntries(profile.config),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No audit store env config blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No audit store env config warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No audit store env config recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function normalizeStoreKind(value: string): AuditStoreEnvConfigProfile["config"]["normalizedStoreKind"] {
  if (value === "memory" || value === "in-memory") {
    return "memory";
  }
  if (value === "file" || value === "jsonl") {
    return "file";
  }
  if (value === "database" || value === "postgres" || value === "postgresql") {
    return "database";
  }
  return "unknown";
}

function collectProductionBlockers(
  checks: AuditStoreEnvConfigProfile["checks"],
  normalizedStoreKind: AuditStoreEnvConfigProfile["config"]["normalizedStoreKind"],
): AuditStoreEnvConfigMessage[] {
  const blockers: AuditStoreEnvConfigMessage[] = [];
  addMessage(blockers, checks.storeKindRecognized, "AUDIT_STORE_KIND_UNKNOWN", "AUDIT_STORE_KIND must be memory, file, or database.");
  addMessage(blockers, normalizedStoreKind !== "memory", "AUDIT_STORE_KIND_MEMORY", "Default AUDIT_STORE_KIND=memory is not durable enough for production audit.");
  addMessage(blockers, checks.fileStorePathReady, "AUDIT_STORE_PATH_MISSING", "AUDIT_STORE_PATH is required when AUDIT_STORE_KIND=file.");
  addMessage(blockers, checks.databaseStoreUrlReady, "AUDIT_STORE_URL_MISSING", "AUDIT_STORE_URL is required when AUDIT_STORE_KIND=database.");
  addMessage(blockers, checks.durableStoreWiringImplemented, "AUDIT_STORE_RUNTIME_NOT_WIRED", "The app still constructs AuditLog with its default in-memory store.");
  addMessage(blockers, !checks.migrationRequiredBeforeProduction, "AUDIT_STORE_MIGRATION_REQUIRED", "A durable audit migration version is still required before production.");
  return blockers;
}

function collectWarnings(
  config: Pick<AppConfig, "auditStoreKind" | "auditStorePath" | "auditStoreUrl">,
  normalizedStoreKind: AuditStoreEnvConfigProfile["config"]["normalizedStoreKind"],
): AuditStoreEnvConfigMessage[] {
  const warnings: AuditStoreEnvConfigMessage[] = [];

  if (normalizedStoreKind === "database" && config.auditStoreUrl.length > 0) {
    warnings.push({
      code: "AUDIT_STORE_URL_REDACTED",
      severity: "warning",
      message: "AUDIT_STORE_URL is present and intentionally redacted in this profile.",
    });
  }

  if (normalizedStoreKind === "file") {
    warnings.push({
      code: "FILE_STORE_NOT_FINAL_PRODUCTION_TARGET",
      severity: "warning",
      message: "File-backed audit can help migration rehearsal but still needs rotation, retention, and backup policy.",
    });
  }

  return warnings;
}

function collectRecommendations(): AuditStoreEnvConfigMessage[] {
  return [
    {
      code: "IMPLEMENT_AUDIT_STORE_FACTORY",
      severity: "recommendation",
      message: "Add a dedicated factory that chooses in-memory, file, or database audit store from validated config.",
    },
    {
      code: "ADD_RESTART_RECOVERY_TEST",
      severity: "recommendation",
      message: "Verify audit events survive restart before claiming durable audit readiness.",
    },
    {
      code: "DEFINE_RETENTION_AND_BACKUP",
      severity: "recommendation",
      message: "Document retention, rotation, backup, and access policy for audit evidence.",
    },
  ];
}

function collectNextActions(productionBlockerCount: number): string[] {
  if (productionBlockerCount === 0) {
    return [
      "Use this profile as the input contract for a future durable audit store migration.",
      "Do not switch runtime storage until migration tests and rollback evidence exist.",
    ];
  }

  return [
    "Keep runtime on the default in-memory audit store for now.",
    "Implement durable audit store wiring in a dedicated version before production use.",
    "Do not place secrets in logs or Markdown evidence; keep URLs redacted.",
  ];
}

function redactUrl(value: string): string {
  if (value.length === 0) {
    return "";
  }

  try {
    const url = new URL(value);
    if (url.username.length > 0) {
      url.username = "redacted";
    }
    if (url.password.length > 0) {
      url.password = "redacted";
    }
    return url.toString();
  } catch {
    return "redacted-invalid-url";
  }
}

function addMessage(
  messages: AuditStoreEnvConfigMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderMessages(messages: AuditStoreEnvConfigMessage[], emptyText: string): string[] {
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
