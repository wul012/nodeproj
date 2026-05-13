import type { AppConfig } from "../config.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";

export interface ManagedAuditAdapter {
  appendOnlyWrite(event: unknown): Promise<void>;
  queryByRequestId(requestId: string): Promise<unknown[]>;
  digest(): Promise<string>;
  backupRestoreMarker(): Promise<string>;
}

export interface ManagedAuditAdapterBoundaryProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-boundary.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  adapterInterface: {
    name: "ManagedAuditAdapter";
    methods: ManagedAuditAdapterMethod[];
    realImplementationConnected: false;
    backupRestoreDrillImplemented: false;
  };
  runtimeSelection: {
    requestedStoreKind: string;
    currentRuntimeStoreKind: "memory" | "file";
    selectedBoundaryRuntime: "memory" | "file" | "managed-unimplemented";
    managedStoreUrlConfigured: boolean;
    wouldUseManagedAdapter: boolean;
    fallsBackToCurrentRuntime: boolean;
    doesNotOpenNetworkConnection: true;
    doesNotMigrateAuditFiles: true;
    upstreamActionsEnabled: boolean;
  };
  supportedRuntimeStates: ManagedAuditRuntimeState[];
  checks: {
    adapterInterfaceDefined: boolean;
    runtimeSelectionDocumented: boolean;
    memoryRuntimeStateDocumented: boolean;
    fileRuntimeStateDocumented: boolean;
    managedUnimplementedStateDocumented: boolean;
    managedStoreUrlConfigured: boolean;
    realManagedAdapterConnected: boolean;
    backupRestoreDrillImplemented: boolean;
    noDatabaseConnectionAttempted: boolean;
    noAuditMigrationPerformed: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    methodCount: number;
    runtimeStateCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManagedAuditAdapterBoundaryMessage[];
  warnings: ManagedAuditAdapterBoundaryMessage[];
  recommendations: ManagedAuditAdapterBoundaryMessage[];
  evidenceEndpoints: {
    managedAuditAdapterBoundaryJson: string;
    managedAuditAdapterBoundaryMarkdown: string;
    managedAuditReadinessSummaryJson: string;
    managedAuditStoreContractJson: string;
    auditStoreRuntimeProfileJson: string;
  };
  nextActions: string[];
}

export interface ManagedAuditAdapterMethod {
  name: keyof ManagedAuditAdapter;
  requiredForProduction: true;
  coveredByExistingContract: boolean;
  note: string;
}

export interface ManagedAuditRuntimeState {
  id: "memory" | "file" | "managed-unimplemented";
  selectedWhen: string;
  writesAuditEvents: boolean;
  durableAtRuntime: boolean;
  productionReady: boolean;
  note: string;
}

export interface ManagedAuditAdapterBoundaryMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  managedAuditAdapterBoundaryMarkdown: "/api/v1/audit/managed-adapter-boundary?format=markdown",
  managedAuditReadinessSummaryJson: "/api/v1/audit/managed-readiness-summary",
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
});

export function createManagedAuditAdapterBoundaryProfile(input: {
  config: Pick<AppConfig, "auditStoreKind" | "auditStoreUrl" | "upstreamActionsEnabled">;
  runtime: AuditStoreRuntimeDescription;
}): ManagedAuditAdapterBoundaryProfile {
  const methods = createAdapterMethods();
  const supportedRuntimeStates = createSupportedRuntimeStates();
  const selectedBoundaryRuntime = selectBoundaryRuntime(input.config.auditStoreKind, input.runtime.runtimeStoreKind);
  const checks = {
    adapterInterfaceDefined: methods.length === 4,
    runtimeSelectionDocumented: selectedBoundaryRuntime === "memory"
      || selectedBoundaryRuntime === "file"
      || selectedBoundaryRuntime === "managed-unimplemented",
    memoryRuntimeStateDocumented: supportedRuntimeStates.some((state) => state.id === "memory"),
    fileRuntimeStateDocumented: supportedRuntimeStates.some((state) => state.id === "file"),
    managedUnimplementedStateDocumented: supportedRuntimeStates.some((state) => state.id === "managed-unimplemented"),
    managedStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
    realManagedAdapterConnected: false,
    backupRestoreDrillImplemented: false,
    noDatabaseConnectionAttempted: true,
    noAuditMigrationPerformed: true,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(selectedBoundaryRuntime);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit adapter boundary",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-adapter-boundary.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    adapterInterface: {
      name: "ManagedAuditAdapter",
      methods,
      realImplementationConnected: false,
      backupRestoreDrillImplemented: false,
    },
    runtimeSelection: {
      requestedStoreKind: input.config.auditStoreKind,
      currentRuntimeStoreKind: input.runtime.runtimeStoreKind,
      selectedBoundaryRuntime,
      managedStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
      wouldUseManagedAdapter: selectedBoundaryRuntime === "managed-unimplemented",
      fallsBackToCurrentRuntime: selectedBoundaryRuntime !== "managed-unimplemented",
      doesNotOpenNetworkConnection: true,
      doesNotMigrateAuditFiles: true,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    supportedRuntimeStates,
    checks,
    summary: {
      methodCount: methods.length,
      runtimeStateCount: supportedRuntimeStates.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Implement a real ManagedAuditAdapter in a dedicated version without changing existing file audit evidence.",
      "Add backup/restore drill evidence before treating managed audit as production-ready.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false while the managed adapter is still unimplemented.",
    ],
  };
}

export function renderManagedAuditAdapterBoundaryMarkdown(profile: ManagedAuditAdapterBoundaryProfile): string {
  return [
    "# Managed audit adapter boundary",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Adapter Interface",
    "",
    `- Name: ${profile.adapterInterface.name}`,
    `- Real implementation connected: ${profile.adapterInterface.realImplementationConnected}`,
    `- Backup restore drill implemented: ${profile.adapterInterface.backupRestoreDrillImplemented}`,
    "",
    "## Methods",
    "",
    ...profile.adapterInterface.methods.flatMap(renderMethod),
    "## Runtime Selection",
    "",
    ...renderEntries(profile.runtimeSelection),
    "",
    "## Supported Runtime States",
    "",
    ...profile.supportedRuntimeStates.flatMap(renderRuntimeState),
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
    ...renderMessages(profile.productionBlockers, "No managed audit adapter blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit adapter warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit adapter recommendations."),
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

function selectBoundaryRuntime(
  requestedStoreKind: string,
  currentRuntimeStoreKind: "memory" | "file",
): ManagedAuditAdapterBoundaryProfile["runtimeSelection"]["selectedBoundaryRuntime"] {
  const normalized = requestedStoreKind.trim().toLowerCase();
  if (normalized === "database" || normalized === "postgres" || normalized === "postgresql" || normalized === "managed") {
    return "managed-unimplemented";
  }
  return currentRuntimeStoreKind;
}

function createAdapterMethods(): ManagedAuditAdapterMethod[] {
  return [
    {
      name: "appendOnlyWrite",
      requiredForProduction: true,
      coveredByExistingContract: true,
      note: "Persist audit events without rewriting existing records.",
    },
    {
      name: "queryByRequestId",
      requiredForProduction: true,
      coveredByExistingContract: true,
      note: "Retrieve request-scoped evidence during audits and incidents.",
    },
    {
      name: "digest",
      requiredForProduction: true,
      coveredByExistingContract: true,
      note: "Expose stable evidence digests for release and verification reports.",
    },
    {
      name: "backupRestoreMarker",
      requiredForProduction: true,
      coveredByExistingContract: true,
      note: "Expose backup/restore drill markers before production readiness.",
    },
  ];
}

function createSupportedRuntimeStates(): ManagedAuditRuntimeState[] {
  return [
    {
      id: "memory",
      selectedWhen: "AUDIT_STORE_KIND=memory",
      writesAuditEvents: true,
      durableAtRuntime: false,
      productionReady: false,
      note: "Development fallback only; events disappear on restart.",
    },
    {
      id: "file",
      selectedWhen: "AUDIT_STORE_KIND=file with AUDIT_STORE_PATH",
      writesAuditEvents: true,
      durableAtRuntime: true,
      productionReady: false,
      note: "Local rehearsal durability; still not managed production audit storage.",
    },
    {
      id: "managed-unimplemented",
      selectedWhen: "AUDIT_STORE_KIND=database/postgres/managed",
      writesAuditEvents: false,
      durableAtRuntime: false,
      productionReady: false,
      note: "Boundary state only; no database connection, migration, or network call is attempted.",
    },
  ];
}

function collectProductionBlockers(
  checks: ManagedAuditAdapterBoundaryProfile["checks"],
): ManagedAuditAdapterBoundaryMessage[] {
  const blockers: ManagedAuditAdapterBoundaryMessage[] = [];
  addMessage(blockers, checks.adapterInterfaceDefined, "MANAGED_ADAPTER_INTERFACE_MISSING", "ManagedAuditAdapter interface must define production-required methods.");
  addMessage(blockers, checks.runtimeSelectionDocumented, "MANAGED_ADAPTER_RUNTIME_SELECTION_MISSING", "Managed audit runtime selection must document memory, file, and managed-unimplemented states.");
  addMessage(blockers, checks.managedStoreUrlConfigured, "MANAGED_AUDIT_STORE_URL_MISSING", "AUDIT_STORE_URL must be configured before a real managed adapter can be wired.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A real managed audit adapter implementation is still missing.");
  addMessage(blockers, checks.backupRestoreDrillImplemented, "MANAGED_AUDIT_BACKUP_RESTORE_DRILL_MISSING", "A backup/restore drill is required before production audit readiness.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while managed audit is not production-ready.");
  return blockers;
}

function collectWarnings(
  selectedBoundaryRuntime: ManagedAuditAdapterBoundaryProfile["runtimeSelection"]["selectedBoundaryRuntime"],
): ManagedAuditAdapterBoundaryMessage[] {
  return [
    {
      code: selectedBoundaryRuntime === "managed-unimplemented" ? "MANAGED_RUNTIME_NOT_CONNECTED" : "CURRENT_RUNTIME_REHEARSAL_ONLY",
      severity: "warning",
      message: selectedBoundaryRuntime === "managed-unimplemented"
        ? "Managed runtime is only documented in this version; no database adapter is constructed."
        : "Current audit runtime remains a rehearsal runtime until the managed adapter exists.",
    },
  ];
}

function collectRecommendations(): ManagedAuditAdapterBoundaryMessage[] {
  return [
    {
      code: "IMPLEMENT_APPEND_ONLY_DATABASE_ADAPTER",
      severity: "recommendation",
      message: "Implement append-only managed storage behind the ManagedAuditAdapter interface.",
    },
    {
      code: "ADD_BACKUP_RESTORE_DRILL",
      severity: "recommendation",
      message: "Add backup and restore drill evidence before production readiness is allowed.",
    },
  ];
}

function addMessage(
  messages: ManagedAuditAdapterBoundaryMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderMethod(method: ManagedAuditAdapterMethod): string[] {
  return [
    `### ${method.name}`,
    "",
    `- Required for production: ${method.requiredForProduction}`,
    `- Covered by existing contract: ${method.coveredByExistingContract}`,
    `- Note: ${method.note}`,
    "",
  ];
}

function renderRuntimeState(state: ManagedAuditRuntimeState): string[] {
  return [
    `### ${state.id}`,
    "",
    `- Selected when: ${state.selectedWhen}`,
    `- Writes audit events: ${state.writesAuditEvents}`,
    `- Durable at runtime: ${state.durableAtRuntime}`,
    `- Production ready: ${state.productionReady}`,
    `- Note: ${state.note}`,
    "",
  ];
}

function renderMessages(messages: ManagedAuditAdapterBoundaryMessage[], emptyText: string): string[] {
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
