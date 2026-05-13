import type { AppConfig } from "../config.js";
import {
  createManagedAuditStoreContractProfile,
  type ManagedAuditStoreContractProfile,
} from "./managedAuditStoreContract.js";
import {
  createSignedAuthTokenContractProfile,
  type SignedAuthTokenContractProfile,
} from "./signedAuthTokenContract.js";

export interface DeploymentEnvironmentReadinessGate {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  gateVersion: "deployment-environment-readiness.v1";
  readyForDeployment: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  environment: {
    upstreamActionsEnabled: boolean;
    authTokenIssuerConfigured: boolean;
    authTokenSecretConfigured: boolean;
    accessGuardEnforcementEnabled: boolean;
    auditStoreKind: string;
    auditStoreUrlConfigured: boolean;
    auditRetentionDays: number;
    auditMaxFileBytes: number;
    auditRotationEnabled: boolean;
    auditBackupEnabled: boolean;
  };
  evidence: {
    signedAuthTokenContract: {
      profileVersion: string;
      secretConfigured: boolean;
      allowedRoleAccepted: boolean;
      realIdpConnected: false;
      productionBlockerCodes: string[];
    };
    managedAuditStoreContract: {
      profileVersion: string;
      coveredCapabilityCount: number;
      capabilityCount: number;
      realManagedAdapterConnected: false;
      productionBlockerCodes: string[];
    };
  };
  checks: {
    upstreamActionsStillDisabled: boolean;
    authIssuerConfigured: boolean;
    authSecretConfigured: boolean;
    signedTokenContractPasses: boolean;
    realIdentityProviderConnected: boolean;
    accessGuardEnforcementEnabled: boolean;
    retentionDaysConfigured: boolean;
    auditMaxFileBytesConfigured: boolean;
    auditRotationEnabled: boolean;
    auditBackupEnabled: boolean;
    managedAuditStoreUrlConfigured: boolean;
    managedAuditStoreAdapterConnected: boolean;
  };
  summary: {
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    deployableRehearsalCheckCount: number;
    deployableRehearsalPassedCount: number;
  };
  productionBlockers: DeploymentEnvironmentReadinessMessage[];
  warnings: DeploymentEnvironmentReadinessMessage[];
  recommendations: DeploymentEnvironmentReadinessMessage[];
  evidenceEndpoints: {
    deploymentEnvironmentReadinessJson: string;
    deploymentEnvironmentReadinessMarkdown: string;
    signedAuthTokenContractJson: string;
    managedAuditStoreContractJson: string;
    productionReadinessSummaryV5Json: string;
  };
  nextActions: string[];
}

export interface DeploymentEnvironmentReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "node-config" | "signed-auth-token-contract" | "managed-audit-store-contract" | "deployment-environment-readiness";
  message: string;
}

const ENDPOINTS = Object.freeze({
  deploymentEnvironmentReadinessJson: "/api/v1/deployment/environment-readiness",
  deploymentEnvironmentReadinessMarkdown: "/api/v1/deployment/environment-readiness?format=markdown",
  signedAuthTokenContractJson: "/api/v1/security/signed-auth-token-contract",
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
  productionReadinessSummaryV5Json: "/api/v1/production/readiness-summary-v5",
});

export function createDeploymentEnvironmentReadinessGate(config: AppConfig): DeploymentEnvironmentReadinessGate {
  const signedAuthTokenContract = createSignedAuthTokenContractProfile(config);
  const managedAuditStoreContract = createManagedAuditStoreContractProfile(config);
  const checks = createChecks(config, signedAuthTokenContract, managedAuditStoreContract);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();
  const deployableRehearsalChecks = [
    checks.upstreamActionsStillDisabled,
    checks.authIssuerConfigured,
    checks.authSecretConfigured,
    checks.signedTokenContractPasses,
    checks.retentionDaysConfigured,
    checks.auditMaxFileBytesConfigured,
    checks.auditRotationEnabled,
    checks.auditBackupEnabled,
    checks.managedAuditStoreUrlConfigured,
  ];

  return {
    service: "orderops-node",
    title: "Deployment environment readiness",
    generatedAt: new Date().toISOString(),
    gateVersion: "deployment-environment-readiness.v1",
    readyForDeployment: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    environment: {
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      authTokenIssuerConfigured: config.authTokenIssuer.length > 0,
      authTokenSecretConfigured: config.authTokenSecret.length > 0,
      accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
      auditStoreKind: config.auditStoreKind,
      auditStoreUrlConfigured: config.auditStoreUrl.length > 0,
      auditRetentionDays: config.auditRetentionDays,
      auditMaxFileBytes: config.auditMaxFileBytes,
      auditRotationEnabled: config.auditRotationEnabled,
      auditBackupEnabled: config.auditBackupEnabled,
    },
    evidence: {
      signedAuthTokenContract: {
        profileVersion: signedAuthTokenContract.profileVersion,
        secretConfigured: signedAuthTokenContract.runtime.secretConfigured,
        allowedRoleAccepted: signedAuthTokenContract.checks.allowedRoleAccepted,
        realIdpConnected: false,
        productionBlockerCodes: signedAuthTokenContract.productionBlockers.map((blocker) => blocker.code),
      },
      managedAuditStoreContract: {
        profileVersion: managedAuditStoreContract.profileVersion,
        coveredCapabilityCount: managedAuditStoreContract.summary.coveredCapabilityCount,
        capabilityCount: managedAuditStoreContract.summary.capabilityCount,
        realManagedAdapterConnected: false,
        productionBlockerCodes: managedAuditStoreContract.productionBlockers.map((blocker) => blocker.code),
      },
    },
    checks,
    summary: {
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      deployableRehearsalCheckCount: deployableRehearsalChecks.length,
      deployableRehearsalPassedCount: deployableRehearsalChecks.filter(Boolean).length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Connect a real identity provider and keep token secrets outside the repository.",
      "Implement a real managed audit adapter before declaring deployment ready.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until auth and audit production blockers are closed together.",
    ],
  };
}

export function renderDeploymentEnvironmentReadinessMarkdown(gate: DeploymentEnvironmentReadinessGate): string {
  return [
    "# Deployment environment readiness",
    "",
    `- Service: ${gate.service}`,
    `- Generated at: ${gate.generatedAt}`,
    `- Gate version: ${gate.gateVersion}`,
    `- Ready for deployment: ${gate.readyForDeployment}`,
    `- Ready for production operations: ${gate.readyForProductionOperations}`,
    `- Read only: ${gate.readOnly}`,
    `- Execution allowed: ${gate.executionAllowed}`,
    "",
    "## Environment",
    "",
    ...renderEntries(gate.environment),
    "",
    "## Evidence",
    "",
    ...renderEntries(gate.evidence.signedAuthTokenContract, "signedAuthTokenContract"),
    ...renderEntries(gate.evidence.managedAuditStoreContract, "managedAuditStoreContract"),
    "",
    "## Checks",
    "",
    ...renderEntries(gate.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(gate.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(gate.productionBlockers, "No deployment blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(gate.warnings, "No deployment warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(gate.recommendations, "No deployment recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(gate.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(gate.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createChecks(
  config: AppConfig,
  signedAuthTokenContract: SignedAuthTokenContractProfile,
  managedAuditStoreContract: ManagedAuditStoreContractProfile,
): DeploymentEnvironmentReadinessGate["checks"] {
  return {
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    authIssuerConfigured: config.authTokenIssuer.length > 0,
    authSecretConfigured: config.authTokenSecret.length > 0,
    signedTokenContractPasses: signedAuthTokenContract.checks.allowedRoleAccepted
      && signedAuthTokenContract.checks.badSignatureRejected
      && signedAuthTokenContract.checks.expiredTokenRejected
      && signedAuthTokenContract.checks.insufficientRoleRejected,
    realIdentityProviderConnected: false,
    accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
    retentionDaysConfigured: config.auditRetentionDays > 0,
    auditMaxFileBytesConfigured: config.auditMaxFileBytes > 0,
    auditRotationEnabled: config.auditRotationEnabled,
    auditBackupEnabled: config.auditBackupEnabled,
    managedAuditStoreUrlConfigured: config.auditStoreUrl.length > 0,
    managedAuditStoreAdapterConnected: managedAuditStoreContract.checks.realManagedAdapterConnected,
  };
}

function collectProductionBlockers(
  checks: DeploymentEnvironmentReadinessGate["checks"],
): DeploymentEnvironmentReadinessMessage[] {
  const blockers: DeploymentEnvironmentReadinessMessage[] = [];
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "node-config", "UPSTREAM_ACTIONS_ENABLED must remain false while deployment readiness blockers exist.");
  addMessage(blockers, checks.authIssuerConfigured, "AUTH_TOKEN_ISSUER_MISSING", "node-config", "ORDEROPS_AUTH_TOKEN_ISSUER must be configured.");
  addMessage(blockers, checks.authSecretConfigured, "AUTH_TOKEN_SECRET_MISSING", "node-config", "ORDEROPS_AUTH_TOKEN_SECRET must be configured outside source control.");
  addMessage(blockers, checks.signedTokenContractPasses, "SIGNED_TOKEN_CONTRACT_FAILING", "signed-auth-token-contract", "Signed token contract samples must pass before deployment rehearsal.");
  addMessage(blockers, checks.realIdentityProviderConnected, "REAL_IDP_NOT_CONNECTED", "signed-auth-token-contract", "A real identity provider is required before production deployment.");
  addMessage(blockers, checks.accessGuardEnforcementEnabled, "ACCESS_GUARD_ENFORCEMENT_DISABLED", "node-config", "ACCESS_GUARD_ENFORCEMENT_ENABLED must be true in production-like rehearsal.");
  addMessage(blockers, checks.retentionDaysConfigured, "AUDIT_RETENTION_DAYS_MISSING", "node-config", "AUDIT_RETENTION_DAYS must be configured.");
  addMessage(blockers, checks.auditMaxFileBytesConfigured, "AUDIT_MAX_FILE_BYTES_MISSING", "node-config", "AUDIT_MAX_FILE_BYTES must be configured.");
  addMessage(blockers, checks.auditRotationEnabled, "AUDIT_ROTATION_DISABLED", "node-config", "AUDIT_ROTATION_ENABLED must be true.");
  addMessage(blockers, checks.auditBackupEnabled, "AUDIT_BACKUP_DISABLED", "node-config", "AUDIT_BACKUP_ENABLED must be true.");
  addMessage(blockers, checks.managedAuditStoreUrlConfigured, "AUDIT_STORE_URL_MISSING", "node-config", "AUDIT_STORE_URL must point to a managed audit store for production.");
  addMessage(blockers, checks.managedAuditStoreAdapterConnected, "MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-store-contract", "A real managed audit store adapter is not connected.");
  return blockers;
}

function collectWarnings(config: AppConfig): DeploymentEnvironmentReadinessMessage[] {
  return [
    {
      code: "DEPLOYMENT_GATE_REHEARSAL_ONLY",
      severity: "warning",
      source: "deployment-environment-readiness",
      message: "This gate reads local configuration and contract evidence; it does not deploy or mutate infrastructure.",
    },
    {
      code: config.auditStoreKind === "file" ? "FILE_AUDIT_NOT_PRODUCTION" : "AUDIT_STORE_KIND_NOT_MANAGED",
      severity: "warning",
      source: "node-config",
      message: "Current AUDIT_STORE_KIND is not backed by a real managed audit adapter.",
    },
  ];
}

function collectRecommendations(): DeploymentEnvironmentReadinessMessage[] {
  return [
    {
      code: "ADD_SECRET_MANAGER_CHECK",
      severity: "recommendation",
      source: "deployment-environment-readiness",
      message: "Add a secret-manager backed check before treating auth token secrets as deployment-ready.",
    },
    {
      code: "ADD_MANAGED_AUDIT_INTEGRATION_TEST",
      severity: "recommendation",
      source: "deployment-environment-readiness",
      message: "Run append/query/digest/restore tests against the real managed audit adapter before production.",
    },
  ];
}

function addMessage(
  messages: DeploymentEnvironmentReadinessMessage[],
  condition: boolean,
  code: string,
  source: DeploymentEnvironmentReadinessMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, source, severity: "blocker", message });
  }
}

function renderMessages(messages: DeploymentEnvironmentReadinessMessage[], emptyText: string): string[] {
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
