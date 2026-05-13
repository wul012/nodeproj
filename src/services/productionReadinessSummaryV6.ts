import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createDeploymentEnvironmentReadinessGate } from "./deploymentEnvironmentReadiness.js";
import { createManagedAuditReadinessSummary } from "./managedAuditReadinessSummary.js";
import { createVerifiedIdentityAuditBindingProfile } from "./verifiedIdentityAuditBinding.js";

export interface ProductionReadinessSummaryV6 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v6";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-hardening-integration";
    verifiedIdentityAuditBindingVersion: "verified-identity-audit-binding.v1";
    managedAuditReadinessSummaryVersion: "managed-audit-readiness-summary.v1";
    deploymentEnvironmentReadinessVersion: "deployment-environment-readiness.v1";
    upstreamActionsEnabled: boolean;
  };
  categories: ProductionReadinessCategory[];
  checks: {
    verifiedIdentityAuditBindingReady: boolean;
    realIdentityProviderConnected: boolean;
    managedAuditLocalEvidenceReady: boolean;
    realManagedAuditAdapterConnected: boolean;
    deploymentEnvironmentGateConfigured: boolean;
    upstreamActionsStillDisabled: boolean;
    productionBlockersRemain: true;
  };
  summary: {
    categoryCount: number;
    passedCategoryCount: number;
    blockedCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionReadinessSummaryV6Message[];
  warnings: ProductionReadinessSummaryV6Message[];
  recommendations: ProductionReadinessSummaryV6Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV6Json: string;
    productionReadinessSummaryV6Markdown: string;
    verifiedIdentityAuditBindingJson: string;
    managedAuditReadinessSummaryJson: string;
    deploymentEnvironmentReadinessJson: string;
    productionReadinessSummaryV5Json: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessCategory {
  id: "identity" | "audit" | "deployment" | "execution-safety";
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessSummaryV6Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "verified-identity-audit-binding"
    | "managed-audit-readiness-summary"
    | "deployment-environment-readiness"
    | "production-readiness-summary-v6";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV6Json: "/api/v1/production/readiness-summary-v6",
  productionReadinessSummaryV6Markdown: "/api/v1/production/readiness-summary-v6?format=markdown",
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
  managedAuditReadinessSummaryJson: "/api/v1/audit/managed-readiness-summary",
  deploymentEnvironmentReadinessJson: "/api/v1/deployment/environment-readiness",
  productionReadinessSummaryV5Json: "/api/v1/production/readiness-summary-v5",
});

export function loadProductionReadinessSummaryV6(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): ProductionReadinessSummaryV6 {
  const verifiedIdentity = createVerifiedIdentityAuditBindingProfile(input.config);
  const managedAudit = createManagedAuditReadinessSummary({
    config: input.config,
    runtime: input.auditStoreRuntime,
    auditLog: input.auditLog,
  });
  const deploymentGate = createDeploymentEnvironmentReadinessGate(input.config);
  const checks = {
    verifiedIdentityAuditBindingReady: verifiedIdentity.checks.acceptedTokenBindsSubject
      && verifiedIdentity.checks.acceptedTokenBindsRoles
      && verifiedIdentity.checks.acceptedTokenCapturesIssuer
      && verifiedIdentity.checks.rejectedTokenCapturesReason,
    realIdentityProviderConnected: false,
    managedAuditLocalEvidenceReady: managedAudit.checks.localEvidenceReadyForAdapterWork,
    realManagedAuditAdapterConnected: managedAudit.checks.realManagedAdapterConnected,
    deploymentEnvironmentGateConfigured: deploymentGate.summary.deployableRehearsalPassedCount === deploymentGate.summary.deployableRehearsalCheckCount,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    productionBlockersRemain: true as const,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v6",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v6",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-hardening-integration",
      verifiedIdentityAuditBindingVersion: verifiedIdentity.profileVersion,
      managedAuditReadinessSummaryVersion: managedAudit.summaryVersion,
      deploymentEnvironmentReadinessVersion: deploymentGate.gateVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    categories,
    checks,
    summary: {
      categoryCount: categories.length,
      passedCategoryCount: categories.filter((category) => category.status === "pass").length,
      blockedCategoryCount: categories.filter((category) => category.status === "blocked").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Implement a real IdP verifier before using token identity for production access decisions.",
      "Implement a real managed audit adapter and backup/restore drill before production execution.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until identity, audit, deployment, and execution gates are all unblocked.",
    ],
  };
}

export function renderProductionReadinessSummaryV6Markdown(summary: ProductionReadinessSummaryV6): string {
  return [
    "# Production readiness summary v6",
    "",
    `- Service: ${summary.service}`,
    `- Generated at: ${summary.generatedAt}`,
    `- Summary version: ${summary.summaryVersion}`,
    `- Ready for production operations: ${summary.readyForProductionOperations}`,
    `- Read only: ${summary.readOnly}`,
    `- Execution allowed: ${summary.executionAllowed}`,
    "",
    "## Stage",
    "",
    ...renderEntries(summary.stage),
    "",
    "## Categories",
    "",
    ...summary.categories.flatMap(renderCategory),
    "## Checks",
    "",
    ...renderEntries(summary.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(summary.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(summary.productionBlockers, "No production blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(summary.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(summary.recommendations, "No recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(summary.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(summary.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createCategories(checks: ProductionReadinessSummaryV6["checks"]): ProductionReadinessCategory[] {
  return [
    {
      id: "identity",
      status: checks.verifiedIdentityAuditBindingReady && checks.realIdentityProviderConnected ? "pass" : "blocked",
      evidence: "verified-identity-audit-binding",
      note: checks.verifiedIdentityAuditBindingReady
        ? "Token verification is audit-bound, but a real IdP is still missing."
        : "Verified token audit binding evidence is incomplete.",
    },
    {
      id: "audit",
      status: checks.managedAuditLocalEvidenceReady && checks.realManagedAuditAdapterConnected ? "pass" : "blocked",
      evidence: "managed-audit-readiness-summary",
      note: checks.managedAuditLocalEvidenceReady
        ? "Local audit evidence is ready for adapter work, but a real managed adapter is still missing."
        : "Local audit evidence must be stabilized before managed adapter work.",
    },
    {
      id: "deployment",
      status: checks.deploymentEnvironmentGateConfigured ? "pass" : "blocked",
      evidence: "deployment-environment-readiness",
      note: checks.deploymentEnvironmentGateConfigured
        ? "Deployment rehearsal configuration is present."
        : "Deployment rehearsal configuration is incomplete.",
    },
    {
      id: "execution-safety",
      status: checks.upstreamActionsStillDisabled ? "pass" : "blocked",
      evidence: "runtime-config",
      note: checks.upstreamActionsStillDisabled
        ? "Upstream actions remain disabled while production blockers remain."
        : "Upstream actions are enabled before production blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV6["checks"],
): ProductionReadinessSummaryV6Message[] {
  const blockers: ProductionReadinessSummaryV6Message[] = [];
  addMessage(blockers, checks.verifiedIdentityAuditBindingReady, "VERIFIED_IDENTITY_AUDIT_BINDING_INCOMPLETE", "verified-identity-audit-binding", "Verified identity audit binding must record subject, roles, issuer, and rejected-token reason.");
  addMessage(blockers, checks.realIdentityProviderConnected, "REAL_IDP_NOT_CONNECTED", "verified-identity-audit-binding", "A real identity provider is required before production operations.");
  addMessage(blockers, checks.managedAuditLocalEvidenceReady, "MANAGED_AUDIT_LOCAL_EVIDENCE_INCOMPLETE", "managed-audit-readiness-summary", "Managed audit local evidence must be ready before adapter implementation.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-readiness-summary", "A real managed audit adapter is required before production operations.");
  addMessage(blockers, checks.deploymentEnvironmentGateConfigured, "DEPLOYMENT_ENVIRONMENT_GATE_INCOMPLETE", "deployment-environment-readiness", "Deployment environment rehearsal checks must be configured.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v6", "UPSTREAM_ACTIONS_ENABLED must remain false while production blockers remain.");
  return blockers;
}

function collectWarnings(): ProductionReadinessSummaryV6Message[] {
  return [
    {
      code: "REHEARSAL_EVIDENCE_ONLY",
      severity: "warning",
      source: "production-readiness-summary-v6",
      message: "v6 connects identity, audit, and deployment evidence, but still depends on rehearsal-only implementations.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessSummaryV6Message[] {
  return [
    {
      code: "BUILD_IDP_ADAPTER_BOUNDARY",
      severity: "recommendation",
      source: "verified-identity-audit-binding",
      message: "Introduce a real IdP verifier boundary before turning token identity into access guard authority.",
    },
    {
      code: "BUILD_MANAGED_AUDIT_ADAPTER",
      severity: "recommendation",
      source: "managed-audit-readiness-summary",
      message: "Introduce a real managed audit adapter with append-only writes, requestId lookup, and backup/restore drills.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessSummaryV6Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessSummaryV6Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessCategory): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Status: ${category.status}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessSummaryV6Message[], emptyText: string): string[] {
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
