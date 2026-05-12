import { FileBackedAuditStore, InMemoryAuditStore } from "./auditLog.js";

export interface AuditStoreRuntimeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "audit-store-runtime-profile.v1";
  safeForCurrentRuntime: true;
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    instantiatedBy: string;
    defaultStore: string;
    defaultCapacity: number;
    durableAtRuntime: false;
    currentEventCount: number;
    configuredByEnvironment: false;
  };
  stores: AuditStoreDescription[];
  checks: {
    auditStoreInterfacePresent: boolean;
    defaultStoreIsInMemory: boolean;
    fileBackedPrototypeAvailable: boolean;
    databaseStoreConfigured: boolean;
    durableRuntimeConfigured: boolean;
    retentionPolicyConfigured: boolean;
    migrationRequiredBeforeProduction: boolean;
  };
  summary: {
    storeCount: number;
    durablePrototypeCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AuditStoreRuntimeProfileMessage[];
  warnings: AuditStoreRuntimeProfileMessage[];
  recommendations: AuditStoreRuntimeProfileMessage[];
  evidenceEndpoints: {
    auditStoreRuntimeProfileJson: string;
    auditStoreRuntimeProfileMarkdown: string;
    auditSummaryJson: string;
    auditEventsJson: string;
  };
  nextActions: string[];
}

export interface AuditStoreDescription {
  id: "in-memory" | "file-backed-prototype" | "database-required";
  implementation: string;
  runtimeDefault: boolean;
  durable: boolean;
  productionReady: boolean;
  purpose: string;
  limitation: string;
}

export interface AuditStoreRuntimeProfileMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

export interface AuditStoreRuntimeProfileInput {
  currentEventCount?: number;
}

const DEFAULT_AUDIT_CAPACITY = 200;

const ENDPOINTS = Object.freeze({
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
  auditStoreRuntimeProfileMarkdown: "/api/v1/audit/store-profile?format=markdown",
  auditSummaryJson: "/api/v1/audit/summary",
  auditEventsJson: "/api/v1/audit/events?limit=50",
});

export function createAuditStoreRuntimeProfile(
  input: AuditStoreRuntimeProfileInput = {},
): AuditStoreRuntimeProfile {
  const stores = createStoreDescriptions();
  const checks = {
    auditStoreInterfacePresent: true,
    defaultStoreIsInMemory: InMemoryAuditStore.name === "InMemoryAuditStore",
    fileBackedPrototypeAvailable: FileBackedAuditStore.name === "FileBackedAuditStore",
    databaseStoreConfigured: false,
    durableRuntimeConfigured: false,
    retentionPolicyConfigured: false,
    migrationRequiredBeforeProduction: true,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Audit store runtime profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "audit-store-runtime-profile.v1",
    safeForCurrentRuntime: true,
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      instantiatedBy: "src/app.ts:new AuditLog()",
      defaultStore: InMemoryAuditStore.name,
      defaultCapacity: DEFAULT_AUDIT_CAPACITY,
      durableAtRuntime: false,
      currentEventCount: input.currentEventCount ?? 0,
      configuredByEnvironment: false,
    },
    stores,
    checks,
    summary: {
      storeCount: stores.length,
      durablePrototypeCount: stores.filter((store) => store.durable && !store.productionReady).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(),
  };
}

export function renderAuditStoreRuntimeProfileMarkdown(profile: AuditStoreRuntimeProfile): string {
  return [
    "# Audit store runtime profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Safe for current runtime: ${profile.safeForCurrentRuntime}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runtime",
    "",
    ...renderEntries(profile.runtime),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Stores",
    "",
    ...profile.stores.flatMap(renderStore),
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production audit blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No audit store warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No audit store recommendations."),
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

function createStoreDescriptions(): AuditStoreDescription[] {
  return [
    {
      id: "in-memory",
      implementation: InMemoryAuditStore.name,
      runtimeDefault: true,
      durable: false,
      productionReady: false,
      purpose: "Fast local audit capture for development, tests, and safe smoke.",
      limitation: "Events are lost on process restart and cannot satisfy production audit retention.",
    },
    {
      id: "file-backed-prototype",
      implementation: FileBackedAuditStore.name,
      runtimeDefault: false,
      durable: true,
      productionReady: false,
      purpose: "Prototype adapter that appends audit events to JSONL and reloads recent events.",
      limitation: "No rotation, encryption, compaction, concurrent writer coordination, or retention policy.",
    },
    {
      id: "database-required",
      implementation: "Not implemented",
      runtimeDefault: false,
      durable: true,
      productionReady: false,
      purpose: "Future production audit store with retention, query, backup, and access control.",
      limitation: "Required before real production operations; not wired in this version.",
    },
  ];
}

function collectProductionBlockers(
  checks: AuditStoreRuntimeProfile["checks"],
): AuditStoreRuntimeProfileMessage[] {
  const blockers: AuditStoreRuntimeProfileMessage[] = [];
  addMessage(blockers, checks.durableRuntimeConfigured, "AUDIT_RUNTIME_NOT_DURABLE", "Current runtime uses in-memory audit storage, so audit evidence is lost on restart.", "blocker");
  addMessage(blockers, checks.databaseStoreConfigured, "DATABASE_AUDIT_STORE_MISSING", "A production audit store needs a database or equivalent durable service.", "blocker");
  addMessage(blockers, checks.retentionPolicyConfigured, "AUDIT_RETENTION_POLICY_MISSING", "Production audit evidence needs retention, rotation, and backup policy.", "blocker");
  return blockers;
}

function collectWarnings(): AuditStoreRuntimeProfileMessage[] {
  return [
    {
      code: "FILE_STORE_IS_PROTOTYPE",
      severity: "warning",
      message: "FileBackedAuditStore is useful for adapter validation but is not enough for production audit retention.",
    },
    {
      code: "RUNTIME_STORE_NOT_ENV_CONFIGURABLE",
      severity: "warning",
      message: "The running app currently constructs AuditLog with its default store instead of selecting a store from environment config.",
    },
  ];
}

function collectRecommendations(): AuditStoreRuntimeProfileMessage[] {
  return [
    {
      code: "ADD_AUDIT_STORE_CONFIG",
      severity: "recommendation",
      message: "Introduce AUDIT_STORE_KIND and AUDIT_STORE_URL before real operations.",
    },
    {
      code: "ADD_DURABLE_STORE_TESTS",
      severity: "recommendation",
      message: "Add integration tests for restart recovery, retention limits, and malformed audit records.",
    },
    {
      code: "ADD_AUDIT_ACCESS_POLICY",
      severity: "recommendation",
      message: "Protect audit export and query endpoints before exposing the control plane outside local smoke.",
    },
  ];
}

function collectNextActions(): string[] {
  return [
    "Keep the current in-memory store for local Node smoke and tests.",
    "Treat this endpoint as a production blocker list before real operations.",
    "Promote a durable audit store only in a dedicated version with migration tests.",
  ];
}

function addMessage(
  messages: AuditStoreRuntimeProfileMessage[],
  condition: boolean,
  code: string,
  message: string,
  severity: "blocker" | "warning" | "recommendation",
): void {
  if (!condition) {
    messages.push({ code, severity, message });
  }
}

function renderStore(store: AuditStoreDescription): string[] {
  return [
    `### ${store.id}`,
    "",
    `- Implementation: ${store.implementation}`,
    `- Runtime default: ${store.runtimeDefault}`,
    `- Durable: ${store.durable}`,
    `- Production ready: ${store.productionReady}`,
    `- Purpose: ${store.purpose}`,
    `- Limitation: ${store.limitation}`,
    "",
  ];
}

function renderMessages(messages: AuditStoreRuntimeProfileMessage[], emptyText: string): string[] {
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
