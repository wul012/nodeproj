import type { AppConfig } from "../config.js";

export interface ProductionConnectionConfigContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-config-contract.v1";
  readyForProductionConnections: false;
  readOnly: true;
  executionAllowed: false;
  targets: {
    audit: ProductionConnectionTarget;
    idp: ProductionConnectionTarget;
  };
  safety: {
    upstreamActionsEnabled: boolean;
    upstreamActionsStillDisabled: boolean;
    noDatabaseConnectionAttempted: true;
    noJwksNetworkFetch: true;
    noExternalIdpCall: true;
    realManagedAdapterConnected: false;
    realIdpVerifierConnected: false;
  };
  checks: {
    auditTargetKindDocumented: boolean;
    auditRequiredEnvDocumented: boolean;
    auditRequiredEnvConfigured: boolean;
    idpTargetKindDocumented: boolean;
    idpRequiredEnvDocumented: boolean;
    idpRequiredEnvConfigured: boolean;
    noDatabaseConnectionAttempted: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    realManagedAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    targetCount: number;
    configuredTargetCount: number;
    missingEnvCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionConnectionConfigMessage[];
  warnings: ProductionConnectionConfigMessage[];
  recommendations: ProductionConnectionConfigMessage[];
  evidenceEndpoints: {
    productionConnectionConfigContractJson: string;
    productionConnectionConfigContractMarkdown: string;
    productionReadinessSummaryV9Json: string;
    managedAuditAdapterRunnerJson: string;
    jwksCacheContractJson: string;
    deploymentEnvironmentReadinessJson: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionTarget {
  id: "managed-audit-adapter" | "idp-verifier";
  currentTargetKind: string;
  productionTargetKind: string;
  connectionEnabled: false;
  realConnectionConnected: false;
  requiredEnv: ProductionConnectionEnvRequirement[];
  configuredEnv: string[];
  missingEnv: string[];
  note: string;
}

export interface ProductionConnectionEnvRequirement {
  key: string;
  requiredFor: "config-contract" | "production-connection";
  configured: boolean;
  safeToDisplayValue: boolean;
  valueSummary: string;
}

export interface ProductionConnectionConfigMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "audit-config" | "idp-config" | "connection-config-contract";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionConnectionConfigContractJson: "/api/v1/production/connection-config-contract",
  productionConnectionConfigContractMarkdown: "/api/v1/production/connection-config-contract?format=markdown",
  productionReadinessSummaryV9Json: "/api/v1/production/readiness-summary-v9",
  managedAuditAdapterRunnerJson: "/api/v1/audit/managed-adapter-runner",
  jwksCacheContractJson: "/api/v1/security/jwks-cache-contract",
  deploymentEnvironmentReadinessJson: "/api/v1/deployment/environment-readiness",
});

export function createProductionConnectionConfigContractProfile(
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStorePath"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
    | "idpIssuer"
    | "idpAudience"
    | "idpJwksUrl"
    | "idpClockSkewSeconds"
    | "upstreamActionsEnabled"
  >,
): ProductionConnectionConfigContractProfile {
  const audit = createAuditTarget(config);
  const idp = createIdpTarget(config);
  const checks = {
    auditTargetKindDocumented: audit.productionTargetKind === "managed-audit-adapter",
    auditRequiredEnvDocumented: audit.requiredEnv.length === 6,
    auditRequiredEnvConfigured: audit.missingEnv.length === 0,
    idpTargetKindDocumented: idp.productionTargetKind === "oidc-jwt-jwks",
    idpRequiredEnvDocumented: idp.requiredEnv.length === 4,
    idpRequiredEnvConfigured: idp.missingEnv.length === 0,
    noDatabaseConnectionAttempted: true,
    noJwksNetworkFetch: true,
    noExternalIdpCall: true,
    realManagedAdapterConnected: false,
    realIdpVerifierConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(audit, idp);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production connection config contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-connection-config-contract.v1",
    readyForProductionConnections: false,
    readOnly: true,
    executionAllowed: false,
    targets: {
      audit,
      idp,
    },
    safety: {
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
      noDatabaseConnectionAttempted: true,
      noJwksNetworkFetch: true,
      noExternalIdpCall: true,
      realManagedAdapterConnected: false,
      realIdpVerifierConnected: false,
    },
    checks,
    summary: {
      targetCount: 2,
      configuredTargetCount: [audit, idp].filter((target) => target.missingEnv.length === 0).length,
      missingEnvCount: audit.missingEnv.length + idp.missingEnv.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Add explicit environment-selected production targets only after credentials and migration rules are available.",
      "Keep this contract read-only until a real managed audit adapter and real JWKS verifier are implemented.",
      "Use the missingEnv lists as the operator-facing setup checklist before any production connection attempt.",
    ],
  };
}

export function renderProductionConnectionConfigContractMarkdown(
  profile: ProductionConnectionConfigContractProfile,
): string {
  return [
    "# Production connection config contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production connections: ${profile.readyForProductionConnections}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Targets",
    "",
    ...renderTarget(profile.targets.audit),
    ...renderTarget(profile.targets.idp),
    "## Safety",
    "",
    ...renderEntries(profile.safety),
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
    ...renderMessages(profile.productionBlockers, "No production connection config blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production connection config warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production connection config recommendations."),
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

function createAuditTarget(
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStorePath"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
  >,
): ProductionConnectionTarget {
  const requiredEnv = [
    envRequirement("AUDIT_STORE_KIND", config.auditStoreKind, "config-contract"),
    envRequirement("AUDIT_STORE_URL", config.auditStoreUrl, "production-connection"),
    envRequirement("AUDIT_RETENTION_DAYS", config.auditRetentionDays > 0 ? String(config.auditRetentionDays) : "", "config-contract"),
    envRequirement("AUDIT_MAX_FILE_BYTES", config.auditMaxFileBytes > 0 ? String(config.auditMaxFileBytes) : "", "config-contract"),
    envRequirement("AUDIT_ROTATION_ENABLED", config.auditRotationEnabled ? "true" : "", "config-contract"),
    envRequirement("AUDIT_BACKUP_ENABLED", config.auditBackupEnabled ? "true" : "", "config-contract"),
  ];
  return {
    id: "managed-audit-adapter",
    currentTargetKind: normalizeAuditTargetKind(config.auditStoreKind),
    productionTargetKind: "managed-audit-adapter",
    connectionEnabled: false,
    realConnectionConnected: false,
    requiredEnv,
    configuredEnv: requiredEnv.filter((item) => item.configured).map((item) => item.key),
    missingEnv: requiredEnv.filter((item) => !item.configured).map((item) => item.key),
    note: "Current runtime may be memory or file; real managed audit storage remains a future target.",
  };
}

function createIdpTarget(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "idpClockSkewSeconds">,
): ProductionConnectionTarget {
  const requiredEnv = [
    envRequirement("ORDEROPS_IDP_ISSUER", config.idpIssuer, "config-contract"),
    envRequirement("ORDEROPS_IDP_AUDIENCE", config.idpAudience, "config-contract"),
    envRequirement("ORDEROPS_IDP_JWKS_URL", config.idpJwksUrl.startsWith("https://") ? config.idpJwksUrl : "", "production-connection"),
    envRequirement("ORDEROPS_IDP_CLOCK_SKEW_SECONDS", config.idpClockSkewSeconds > 0 ? String(config.idpClockSkewSeconds) : "", "config-contract"),
  ];
  return {
    id: "idp-verifier",
    currentTargetKind: config.idpJwksUrl.length > 0 ? "jwks-configured" : "local-fixture-only",
    productionTargetKind: "oidc-jwt-jwks",
    connectionEnabled: false,
    realConnectionConnected: false,
    requiredEnv,
    configuredEnv: requiredEnv.filter((item) => item.configured).map((item) => item.key),
    missingEnv: requiredEnv.filter((item) => !item.configured).map((item) => item.key),
    note: "Current JWKS evidence is local fixture/cache rehearsal; real IdP verification remains a future target.",
  };
}

function envRequirement(
  key: string,
  value: string,
  requiredFor: ProductionConnectionEnvRequirement["requiredFor"],
): ProductionConnectionEnvRequirement {
  return {
    key,
    requiredFor,
    configured: value.length > 0,
    safeToDisplayValue: true,
    valueSummary: value.length > 0 ? summarizeValue(value) : "missing",
  };
}

function normalizeAuditTargetKind(value: string): string {
  if (value === "memory" || value === "in-memory") {
    return "memory";
  }
  if (value === "file" || value === "jsonl") {
    return "file";
  }
  if (value === "database" || value === "postgres" || value === "postgresql") {
    return "database-unimplemented";
  }
  return "unknown";
}

function collectProductionBlockers(
  checks: ProductionConnectionConfigContractProfile["checks"],
): ProductionConnectionConfigMessage[] {
  const blockers: ProductionConnectionConfigMessage[] = [];
  addMessage(blockers, checks.auditTargetKindDocumented, "AUDIT_TARGET_KIND_NOT_DOCUMENTED", "audit-config", "Managed audit adapter target kind must be documented.");
  addMessage(blockers, checks.auditRequiredEnvDocumented, "AUDIT_REQUIRED_ENV_NOT_DOCUMENTED", "audit-config", "Managed audit required env list must be documented.");
  addMessage(blockers, checks.auditRequiredEnvConfigured, "AUDIT_REQUIRED_ENV_MISSING", "audit-config", "Managed audit required env values are incomplete.");
  addMessage(blockers, checks.idpTargetKindDocumented, "IDP_TARGET_KIND_NOT_DOCUMENTED", "idp-config", "OIDC/JWKS target kind must be documented.");
  addMessage(blockers, checks.idpRequiredEnvDocumented, "IDP_REQUIRED_ENV_NOT_DOCUMENTED", "idp-config", "IdP required env list must be documented.");
  addMessage(blockers, checks.idpRequiredEnvConfigured, "IDP_REQUIRED_ENV_MISSING", "idp-config", "IdP required env values are incomplete.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "audit-config", "A real managed audit adapter is still required before production connections.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "idp-config", "A real JWKS/OIDC verifier is still required before production connections.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "connection-config-contract", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(
  audit: ProductionConnectionTarget,
  idp: ProductionConnectionTarget,
): ProductionConnectionConfigMessage[] {
  return [
    {
      code: audit.missingEnv.length === 0 && idp.missingEnv.length === 0
        ? "CONFIG_CONTRACT_READY_CONNECTIONS_MISSING"
        : "CONFIG_CONTRACT_ENV_INCOMPLETE",
      severity: "warning",
      source: "connection-config-contract",
      message: "This version documents production connection configuration only; no database connection or JWKS fetch is attempted.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionConfigMessage[] {
  return [
    {
      code: "ADD_ENV_SELECTED_AUDIT_TARGET",
      severity: "recommendation",
      source: "audit-config",
      message: "Add an explicit environment-selected real audit adapter target after migration and credential rules are ready.",
    },
    {
      code: "ADD_ENV_SELECTED_IDP_TARGET",
      severity: "recommendation",
      source: "idp-config",
      message: "Add an explicit real IdP verifier target after JWKS timeout and rotation policy are ready.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionConfigMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionConfigMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function summarizeValue(value: string): string {
  if (value.length <= 48) {
    return value;
  }
  return `${value.slice(0, 45)}...`;
}

function renderTarget(target: ProductionConnectionTarget): string[] {
  return [
    `### ${target.id}`,
    "",
    `- Current target kind: ${target.currentTargetKind}`,
    `- Production target kind: ${target.productionTargetKind}`,
    `- Connection enabled: ${target.connectionEnabled}`,
    `- Real connection connected: ${target.realConnectionConnected}`,
    `- Configured env: ${formatValue(target.configuredEnv)}`,
    `- Missing env: ${formatValue(target.missingEnv)}`,
    `- Note: ${target.note}`,
    "",
    "#### Required Env",
    "",
    ...target.requiredEnv.map(renderEnvRequirement),
    "",
  ];
}

function renderEnvRequirement(requirement: ProductionConnectionEnvRequirement): string {
  return `- ${requirement.key}: configured=${requirement.configured}, requiredFor=${requirement.requiredFor}, value=${requirement.valueSummary}`;
}

function renderMessages(messages: ProductionConnectionConfigMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
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
