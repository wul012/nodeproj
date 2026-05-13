import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createIdpVerifierBoundaryProfile } from "./idpVerifierBoundary.js";
import { createManagedAuditAdapterBoundaryProfile } from "./managedAuditAdapterBoundary.js";
import { loadProductionReadinessSummaryV6 } from "./productionReadinessSummaryV6.js";

export interface ProductionReadinessSummaryV7 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v7";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-adapter-boundary-integration";
    managedAuditAdapterBoundaryVersion: "managed-audit-adapter-boundary.v1";
    idpVerifierBoundaryVersion: "idp-verifier-boundary.v1";
    productionReadinessSummaryV6Version: "production-readiness-summary.v6";
    upstreamActionsEnabled: boolean;
  };
  boundaryStatus: {
    managedAuditAdapterBoundaryExists: boolean;
    managedAuditAdapterConnected: false;
    idpVerifierBoundaryExists: boolean;
    idpVerifierConnected: false;
    productionReadinessV6StillBlocked: boolean;
  };
  categories: ProductionReadinessV7Category[];
  checks: {
    managedAuditAdapterBoundaryReady: boolean;
    realManagedAuditAdapterConnected: boolean;
    idpVerifierBoundaryReady: boolean;
    realIdpVerifierConnected: boolean;
    productionReadinessV6EvidenceConnected: boolean;
    upstreamActionsStillDisabled: boolean;
    readyForProductionOperations: false;
  };
  summary: {
    categoryCount: number;
    passedCategoryCount: number;
    blockedCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionReadinessV7Message[];
  warnings: ProductionReadinessV7Message[];
  recommendations: ProductionReadinessV7Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV7Json: string;
    productionReadinessSummaryV7Markdown: string;
    productionReadinessSummaryV6Json: string;
    managedAuditAdapterBoundaryJson: string;
    idpVerifierBoundaryJson: string;
    deploymentEnvironmentReadinessJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV7Category {
  id: "managed-audit-adapter" | "idp-verifier" | "summary-v6-evidence" | "execution-safety";
  boundaryExists: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV7Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-boundary"
    | "idp-verifier-boundary"
    | "production-readiness-summary-v6"
    | "production-readiness-summary-v7";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV7Json: "/api/v1/production/readiness-summary-v7",
  productionReadinessSummaryV7Markdown: "/api/v1/production/readiness-summary-v7?format=markdown",
  productionReadinessSummaryV6Json: "/api/v1/production/readiness-summary-v6",
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  idpVerifierBoundaryJson: "/api/v1/security/idp-verifier-boundary",
  deploymentEnvironmentReadinessJson: "/api/v1/deployment/environment-readiness",
});

export function loadProductionReadinessSummaryV7(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): ProductionReadinessSummaryV7 {
  const managedAuditAdapterBoundary = createManagedAuditAdapterBoundaryProfile({
    config: input.config,
    runtime: input.auditStoreRuntime,
  });
  const idpVerifierBoundary = createIdpVerifierBoundaryProfile(input.config);
  const summaryV6 = loadProductionReadinessSummaryV6(input);
  const checks = {
    managedAuditAdapterBoundaryReady: managedAuditAdapterBoundary.checks.adapterInterfaceDefined
      && managedAuditAdapterBoundary.checks.runtimeSelectionDocumented
      && managedAuditAdapterBoundary.checks.managedUnimplementedStateDocumented
      && managedAuditAdapterBoundary.checks.noDatabaseConnectionAttempted
      && managedAuditAdapterBoundary.checks.noAuditMigrationPerformed,
    realManagedAuditAdapterConnected: managedAuditAdapterBoundary.checks.realManagedAdapterConnected,
    idpVerifierBoundaryReady: idpVerifierBoundary.checks.oidcVerifierBoundaryDefined
      && idpVerifierBoundary.checks.issuerConfigured
      && idpVerifierBoundary.checks.audienceConfigured
      && idpVerifierBoundary.checks.jwksUrlConfigured
      && idpVerifierBoundary.checks.jwksUrlUsesHttps
      && idpVerifierBoundary.checks.clockSkewConfigured
      && idpVerifierBoundary.checks.noJwksNetworkFetch
      && idpVerifierBoundary.checks.noExternalIdpCall,
    realIdpVerifierConnected: idpVerifierBoundary.checks.realIdpVerifierConnected,
    productionReadinessV6EvidenceConnected: summaryV6.checks.verifiedIdentityAuditBindingReady
      && summaryV6.checks.managedAuditLocalEvidenceReady
      && summaryV6.checks.deploymentEnvironmentGateConfigured,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const boundaryStatus = {
    managedAuditAdapterBoundaryExists: checks.managedAuditAdapterBoundaryReady,
    managedAuditAdapterConnected: false as const,
    idpVerifierBoundaryExists: checks.idpVerifierBoundaryReady,
    idpVerifierConnected: false as const,
    productionReadinessV6StillBlocked: summaryV6.summary.blockedCategoryCount > 0,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(boundaryStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v7",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v7",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-adapter-boundary-integration",
      managedAuditAdapterBoundaryVersion: managedAuditAdapterBoundary.profileVersion,
      idpVerifierBoundaryVersion: idpVerifierBoundary.profileVersion,
      productionReadinessSummaryV6Version: summaryV6.summaryVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    boundaryStatus,
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
      "Implement the real managed audit adapter behind the v117 boundary.",
      "Implement the real OIDC/JWT verifier behind the v118 boundary.",
      "Keep production execution disabled until both production connections are implemented and verified.",
    ],
  };
}

export function renderProductionReadinessSummaryV7Markdown(summary: ProductionReadinessSummaryV7): string {
  return [
    "# Production readiness summary v7",
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
    "## Boundary Status",
    "",
    ...renderEntries(summary.boundaryStatus),
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

function createCategories(checks: ProductionReadinessSummaryV7["checks"]): ProductionReadinessV7Category[] {
  return [
    {
      id: "managed-audit-adapter",
      boundaryExists: checks.managedAuditAdapterBoundaryReady,
      productionConnected: checks.realManagedAuditAdapterConnected,
      status: checks.managedAuditAdapterBoundaryReady && checks.realManagedAuditAdapterConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter-boundary",
      note: checks.managedAuditAdapterBoundaryReady
        ? "Managed audit adapter boundary exists, but the production adapter is not connected."
        : "Managed audit adapter boundary evidence is incomplete.",
    },
    {
      id: "idp-verifier",
      boundaryExists: checks.idpVerifierBoundaryReady,
      productionConnected: checks.realIdpVerifierConnected,
      status: checks.idpVerifierBoundaryReady && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "idp-verifier-boundary",
      note: checks.idpVerifierBoundaryReady
        ? "IdP verifier boundary exists, but the production verifier is not connected."
        : "IdP verifier boundary evidence is incomplete.",
    },
    {
      id: "summary-v6-evidence",
      boundaryExists: checks.productionReadinessV6EvidenceConnected,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.productionReadinessV6EvidenceConnected ? "pass" : "blocked",
      evidence: "production-readiness-summary-v6",
      note: checks.productionReadinessV6EvidenceConnected
        ? "v6 identity, audit, and deployment evidence is connected."
        : "v6 evidence chain is incomplete.",
    },
    {
      id: "execution-safety",
      boundaryExists: checks.upstreamActionsStillDisabled,
      productionConnected: false,
      status: checks.upstreamActionsStillDisabled ? "pass" : "blocked",
      evidence: "runtime-config",
      note: checks.upstreamActionsStillDisabled
        ? "Upstream actions remain disabled while adapter and IdP connections are missing."
        : "Upstream actions are enabled before production blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV7["checks"],
): ProductionReadinessV7Message[] {
  const blockers: ProductionReadinessV7Message[] = [];
  addMessage(blockers, checks.managedAuditAdapterBoundaryReady, "MANAGED_AUDIT_ADAPTER_BOUNDARY_INCOMPLETE", "managed-audit-adapter-boundary", "Managed audit adapter boundary must be defined before production audit implementation.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-adapter-boundary", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.idpVerifierBoundaryReady, "IDP_VERIFIER_BOUNDARY_INCOMPLETE", "idp-verifier-boundary", "IdP verifier boundary must define issuer, audience, JWKS URL, clock skew, and no-network behavior.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "idp-verifier-boundary", "A real IdP verifier is still required before production operations.");
  addMessage(blockers, checks.productionReadinessV6EvidenceConnected, "PRODUCTION_READINESS_V6_EVIDENCE_INCOMPLETE", "production-readiness-summary-v6", "v6 identity, audit, and deployment evidence must remain connected.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v7", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(boundaryStatus: ProductionReadinessSummaryV7["boundaryStatus"]): ProductionReadinessV7Message[] {
  return [
    {
      code: boundaryStatus.managedAuditAdapterBoundaryExists && boundaryStatus.idpVerifierBoundaryExists
        ? "BOUNDARIES_EXIST_CONNECTIONS_MISSING"
        : "BOUNDARY_EVIDENCE_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v7",
      message: "v7 distinguishes boundary existence from production connections; missing connections keep production operations blocked.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV7Message[] {
  return [
    {
      code: "IMPLEMENT_MANAGED_AUDIT_CONNECTION",
      severity: "recommendation",
      source: "managed-audit-adapter-boundary",
      message: "Implement and verify a managed audit adapter before enabling production execution.",
    },
    {
      code: "IMPLEMENT_IDP_CONNECTION",
      severity: "recommendation",
      source: "idp-verifier-boundary",
      message: "Implement and verify the OIDC/JWT IdP verifier before using token identity for access decisions.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV7Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV7Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV7Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Boundary exists: ${category.boundaryExists}`,
    `- Production connected: ${category.productionConnected}`,
    `- Status: ${category.status}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV7Message[], emptyText: string): string[] {
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
