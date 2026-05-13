import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createProductionConnectionConfigContractProfile } from "./productionConnectionConfigContract.js";
import { createProductionConnectionFailureModeRehearsalProfile } from "./productionConnectionFailureModeRehearsal.js";
import { loadProductionReadinessSummaryV9 } from "./productionReadinessSummaryV9.js";

export interface ProductionReadinessSummaryV10 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v10";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-connection-readiness-integration";
    productionConnectionConfigContractVersion: "production-connection-config-contract.v1";
    productionConnectionFailureModeRehearsalVersion: "production-connection-failure-mode-rehearsal.v1";
    productionReadinessSummaryV9Version: "production-readiness-summary.v9";
    upstreamActionsEnabled: boolean;
  };
  readinessStatus: {
    configContractReady: boolean;
    failureModeRehearsalReady: boolean;
    realManagedAuditAdapterStillMissing: boolean;
    realIdpVerifierStillMissing: boolean;
    productionReadinessV9StillBlocked: boolean;
  };
  categories: ProductionReadinessV10Category[];
  checks: {
    configContractReady: boolean;
    failureModeRehearsalReady: boolean;
    realManagedAuditAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
    productionReadinessV9EvidenceConnected: boolean;
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
  productionBlockers: ProductionReadinessV10Message[];
  warnings: ProductionReadinessV10Message[];
  recommendations: ProductionReadinessV10Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV10Json: string;
    productionReadinessSummaryV10Markdown: string;
    productionConnectionConfigContractJson: string;
    productionConnectionFailureModeRehearsalJson: string;
    productionReadinessSummaryV9Json: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV10Category {
  id:
    | "production-connection-config-contract"
    | "production-connection-failure-mode-rehearsal"
    | "production-connections"
    | "summary-v9-evidence"
    | "execution-safety";
  readinessPasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV10Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-connection-config-contract"
    | "production-connection-failure-mode-rehearsal"
    | "production-readiness-summary-v9"
    | "production-readiness-summary-v10";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV10Json: "/api/v1/production/readiness-summary-v10",
  productionReadinessSummaryV10Markdown: "/api/v1/production/readiness-summary-v10?format=markdown",
  productionConnectionConfigContractJson: "/api/v1/production/connection-config-contract",
  productionConnectionFailureModeRehearsalJson: "/api/v1/production/connection-failure-mode-rehearsal",
  productionReadinessSummaryV9Json: "/api/v1/production/readiness-summary-v9",
});

export async function loadProductionReadinessSummaryV10(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV10> {
  const configContract = createProductionConnectionConfigContractProfile(input.config);
  const failureModeRehearsal = createProductionConnectionFailureModeRehearsalProfile(input.config);
  const summaryV9 = await loadProductionReadinessSummaryV9(input);
  const checks = {
    configContractReady: configContract.checks.auditRequiredEnvConfigured
      && configContract.checks.idpRequiredEnvConfigured
      && configContract.checks.noDatabaseConnectionAttempted
      && configContract.checks.noJwksNetworkFetch
      && configContract.checks.noExternalIdpCall,
    failureModeRehearsalReady: failureModeRehearsal.checks.configContractReady
      && failureModeRehearsal.checks.auditConnectionMissingCovered
      && failureModeRehearsal.checks.idpJwksTimeoutSimulated
      && failureModeRehearsal.checks.credentialsMissingCovered
      && failureModeRehearsal.checks.safeFallbackCovered
      && failureModeRehearsal.checks.noDatabaseConnectionAttempted
      && failureModeRehearsal.checks.noAuditWritePerformed
      && failureModeRehearsal.checks.noJwksNetworkFetch
      && failureModeRehearsal.checks.noExternalIdpCall,
    realManagedAuditAdapterConnected: configContract.checks.realManagedAdapterConnected
      && failureModeRehearsal.checks.realManagedAdapterConnected,
    realIdpVerifierConnected: configContract.checks.realIdpVerifierConnected
      && failureModeRehearsal.checks.realIdpVerifierConnected,
    productionReadinessV9EvidenceConnected: summaryV9.checks.adapterRunnerPasses
      && summaryV9.checks.jwksCacheContractPasses
      && summaryV9.checks.productionReadinessV8EvidenceConnected,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const readinessStatus = {
    configContractReady: checks.configContractReady,
    failureModeRehearsalReady: checks.failureModeRehearsalReady,
    realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
    realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
    productionReadinessV9StillBlocked: summaryV9.summary.blockedCategoryCount > 0,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(readinessStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v10",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v10",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-connection-readiness-integration",
      productionConnectionConfigContractVersion: configContract.profileVersion,
      productionConnectionFailureModeRehearsalVersion: failureModeRehearsal.profileVersion,
      productionReadinessSummaryV9Version: summaryV9.summaryVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    readinessStatus,
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
      "Keep this readiness summary blocked until real managed audit and IdP connections exist.",
      "Add explicit operator approval before any future version attempts production connection checks.",
      "Use v10 as the handoff point from local readiness evidence to real connection implementation planning.",
    ],
  };
}

export function renderProductionReadinessSummaryV10Markdown(summary: ProductionReadinessSummaryV10): string {
  return [
    "# Production readiness summary v10",
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
    "## Readiness Status",
    "",
    ...renderEntries(summary.readinessStatus),
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

function createCategories(checks: ProductionReadinessSummaryV10["checks"]): ProductionReadinessV10Category[] {
  return [
    {
      id: "production-connection-config-contract",
      readinessPasses: checks.configContractReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.configContractReady ? "pass" : "blocked",
      evidence: "production-connection-config-contract",
      note: checks.configContractReady
        ? "Connection config contract is complete, but real production connections are still separate."
        : "Connection config contract is incomplete.",
    },
    {
      id: "production-connection-failure-mode-rehearsal",
      readinessPasses: checks.failureModeRehearsalReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.failureModeRehearsalReady ? "pass" : "blocked",
      evidence: "production-connection-failure-mode-rehearsal",
      note: checks.failureModeRehearsalReady
        ? "Failure-mode rehearsal blocks safely without external calls."
        : "Failure-mode rehearsal evidence is incomplete.",
    },
    {
      id: "production-connections",
      readinessPasses: checks.configContractReady && checks.failureModeRehearsalReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "production-connection-config-contract + production-connection-failure-mode-rehearsal",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Real managed audit and IdP connections are both connected."
        : "Config and failure-mode readiness can pass while real production connections remain missing.",
    },
    {
      id: "summary-v9-evidence",
      readinessPasses: checks.productionReadinessV9EvidenceConnected,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.productionReadinessV9EvidenceConnected ? "pass" : "blocked",
      evidence: "production-readiness-summary-v9",
      note: checks.productionReadinessV9EvidenceConnected
        ? "v9 candidate-layer evidence remains connected."
        : "v9 evidence chain is incomplete.",
    },
    {
      id: "execution-safety",
      readinessPasses: checks.upstreamActionsStillDisabled,
      productionConnected: false,
      status: checks.upstreamActionsStillDisabled ? "pass" : "blocked",
      evidence: "runtime-config",
      note: checks.upstreamActionsStillDisabled
        ? "Upstream actions remain disabled while production connections are missing."
        : "Upstream actions are enabled before production blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV10["checks"],
): ProductionReadinessV10Message[] {
  const blockers: ProductionReadinessV10Message[] = [];
  addMessage(blockers, checks.configContractReady, "PRODUCTION_CONNECTION_CONFIG_CONTRACT_INCOMPLETE", "production-connection-config-contract", "Production connection config contract must be ready before real connection work.");
  addMessage(blockers, checks.failureModeRehearsalReady, "PRODUCTION_CONNECTION_FAILURE_REHEARSAL_INCOMPLETE", "production-connection-failure-mode-rehearsal", "Production connection failure-mode rehearsal must pass before real connection work.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "production-readiness-summary-v10", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "production-readiness-summary-v10", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.productionReadinessV9EvidenceConnected, "PRODUCTION_READINESS_V9_EVIDENCE_INCOMPLETE", "production-readiness-summary-v9", "v9 candidate-layer evidence must remain connected.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v10", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV10["readinessStatus"]): ProductionReadinessV10Message[] {
  return [
    {
      code: status.configContractReady && status.failureModeRehearsalReady
        ? "CONNECTION_READINESS_READY_CONNECTIONS_MISSING"
        : "CONNECTION_READINESS_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v10",
      message: "v10 separates connection readiness evidence from real production connections; missing connections keep operations blocked.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV10Message[] {
  return [
    {
      code: "PLAN_REAL_AUDIT_ADAPTER_CONNECTION",
      severity: "recommendation",
      source: "production-connection-config-contract",
      message: "Plan a real managed audit adapter connection only after credentials, migration, and rollback rules are explicit.",
    },
    {
      code: "PLAN_REAL_IDP_CONNECTION",
      severity: "recommendation",
      source: "production-connection-failure-mode-rehearsal",
      message: "Plan a real IdP/JWKS connection only after timeout, retry, cache, and role-mapping rules are explicit.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV10Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV10Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV10Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Readiness passes: ${category.readinessPasses}`,
    `- Production connected: ${category.productionConnected}`,
    `- Status: ${category.status}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV10Message[], emptyText: string): string[] {
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
