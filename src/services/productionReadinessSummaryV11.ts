import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "./productionConnectionDryRunChangeRequest.js";
import { loadProductionConnectionImplementationPrecheck } from "./productionConnectionImplementationPrecheck.js";
import { loadProductionReadinessSummaryV10 } from "./productionReadinessSummaryV10.js";

export interface ProductionReadinessSummaryV11 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v11";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-connection-implementation-planning";
    productionReadinessSummaryV10Version: "production-readiness-summary.v10";
    productionConnectionImplementationPrecheckVersion: "production-connection-implementation-precheck.v1";
    productionConnectionDryRunChangeRequestVersion: "production-connection-dry-run-change-request.v1";
    upstreamActionsEnabled: boolean;
  };
  readinessStatus: {
    implementationPrecheckReady: boolean;
    dryRunChangeRequestReady: boolean;
    ownerApprovalsStillPending: boolean;
    realManagedAuditAdapterStillMissing: boolean;
    realIdpVerifierStillMissing: boolean;
    dryRunChangeRequestStillNonExecutable: boolean;
  };
  categories: ProductionReadinessV11Category[];
  checks: {
    summaryV10EvidenceReady: boolean;
    implementationPrecheckReady: boolean;
    dryRunChangeRequestReady: boolean;
    ownerApprovalsPresent: boolean;
    realManagedAuditAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
    dryRunChangeRequestExecutable: boolean;
    noDatabaseConnectionAttempted: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
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
  productionBlockers: ProductionReadinessV11Message[];
  warnings: ProductionReadinessV11Message[];
  recommendations: ProductionReadinessV11Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV11Json: string;
    productionReadinessSummaryV11Markdown: string;
    productionReadinessSummaryV10Json: string;
    productionConnectionImplementationPrecheckJson: string;
    productionConnectionDryRunChangeRequestJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV11Category {
  id:
    | "summary-v10-evidence"
    | "implementation-precheck"
    | "dry-run-change-request"
    | "real-production-connections"
    | "execution-safety";
  readinessPasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV11Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-readiness-summary-v10"
    | "production-connection-implementation-precheck"
    | "production-connection-dry-run-change-request"
    | "production-readiness-summary-v11";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV11Json: "/api/v1/production/readiness-summary-v11",
  productionReadinessSummaryV11Markdown: "/api/v1/production/readiness-summary-v11?format=markdown",
  productionReadinessSummaryV10Json: "/api/v1/production/readiness-summary-v10",
  productionConnectionImplementationPrecheckJson: "/api/v1/production/connection-implementation-precheck",
  productionConnectionDryRunChangeRequestJson: "/api/v1/production/connection-dry-run-change-request",
});

export async function loadProductionReadinessSummaryV11(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV11> {
  const summaryV10 = await loadProductionReadinessSummaryV10(input);
  const implementationPrecheck = await loadProductionConnectionImplementationPrecheck(input);
  const dryRunChangeRequest = await loadProductionConnectionDryRunChangeRequest(input);
  const checks = {
    summaryV10EvidenceReady: summaryV10.checks.configContractReady
      && summaryV10.checks.failureModeRehearsalReady
      && summaryV10.checks.productionReadinessV9EvidenceConnected
      && summaryV10.checks.upstreamActionsStillDisabled,
    implementationPrecheckReady: implementationPrecheck.checks.configContractReady
      && implementationPrecheck.checks.failureModeRehearsalReady
      && implementationPrecheck.checks.readinessSummaryV10Ready
      && implementationPrecheck.checks.noDatabaseConnectionAttempted
      && implementationPrecheck.checks.noJwksNetworkFetch
      && implementationPrecheck.checks.noExternalIdpCall
      && implementationPrecheck.checks.upstreamActionsStillDisabled,
    dryRunChangeRequestReady: dryRunChangeRequest.readyForDryRunArchive
      && dryRunChangeRequest.checks.archiveReady
      && dryRunChangeRequest.checks.dryRunOnly
      && dryRunChangeRequest.checks.realConnectionAttempted === false,
    ownerApprovalsPresent: implementationPrecheck.checks.humanAuditOwnerApprovalPresent
      && implementationPrecheck.checks.humanIdpOwnerApprovalPresent
      && implementationPrecheck.checks.rollbackOwnerApprovalPresent,
    realManagedAuditAdapterConnected: false,
    realIdpVerifierConnected: false,
    dryRunChangeRequestExecutable: dryRunChangeRequest.changeRequest.executable,
    noDatabaseConnectionAttempted: implementationPrecheck.checks.noDatabaseConnectionAttempted,
    noJwksNetworkFetch: implementationPrecheck.checks.noJwksNetworkFetch,
    noExternalIdpCall: implementationPrecheck.checks.noExternalIdpCall,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const readinessStatus = {
    implementationPrecheckReady: checks.implementationPrecheckReady,
    dryRunChangeRequestReady: checks.dryRunChangeRequestReady,
    ownerApprovalsStillPending: checks.ownerApprovalsPresent === false,
    realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
    realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
    dryRunChangeRequestStillNonExecutable: checks.dryRunChangeRequestExecutable === false,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(readinessStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v11",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v11",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-connection-implementation-planning",
      productionReadinessSummaryV10Version: summaryV10.summaryVersion,
      productionConnectionImplementationPrecheckVersion: implementationPrecheck.profileVersion,
      productionConnectionDryRunChangeRequestVersion: dryRunChangeRequest.profileVersion,
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
      "Keep production operations blocked while owner approvals, real audit adapter, and real IdP verifier are missing.",
      "Use v11 as the handoff summary for the dry-run change request archive.",
      "Do not convert the dry-run change request into executable work until credentials, rollback, and owner approvals are present.",
    ],
  };
}

export function renderProductionReadinessSummaryV11Markdown(summary: ProductionReadinessSummaryV11): string {
  return [
    "# Production readiness summary v11",
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

function createCategories(checks: ProductionReadinessSummaryV11["checks"]): ProductionReadinessV11Category[] {
  return [
    {
      id: "summary-v10-evidence",
      readinessPasses: checks.summaryV10EvidenceReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.summaryV10EvidenceReady ? "pass" : "blocked",
      evidence: "production-readiness-summary-v10",
      note: checks.summaryV10EvidenceReady
        ? "v10 readiness evidence remains connected."
        : "v10 readiness evidence is incomplete.",
    },
    {
      id: "implementation-precheck",
      readinessPasses: checks.implementationPrecheckReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.implementationPrecheckReady ? "pass" : "blocked",
      evidence: "production-connection-implementation-precheck",
      note: checks.implementationPrecheckReady
        ? "Implementation precheck evidence is ready, while human approvals remain separate blockers."
        : "Implementation precheck evidence is incomplete.",
    },
    {
      id: "dry-run-change-request",
      readinessPasses: checks.dryRunChangeRequestReady,
      productionConnected: false,
      status: checks.dryRunChangeRequestReady ? "pass" : "blocked",
      evidence: "production-connection-dry-run-change-request",
      note: checks.dryRunChangeRequestReady
        ? "Dry-run change request is archive-ready and intentionally non-executable."
        : "Dry-run change request is not archive-ready.",
    },
    {
      id: "real-production-connections",
      readinessPasses: checks.summaryV10EvidenceReady
        && checks.implementationPrecheckReady
        && checks.dryRunChangeRequestReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter + idp-jwks-verifier",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Real production connections are connected."
        : "Implementation planning can be ready while real managed audit and IdP connections are still missing.",
    },
    {
      id: "execution-safety",
      readinessPasses: checks.upstreamActionsStillDisabled
        && checks.noDatabaseConnectionAttempted
        && checks.noJwksNetworkFetch
        && checks.noExternalIdpCall,
      productionConnected: false,
      status: checks.upstreamActionsStillDisabled
        && checks.noDatabaseConnectionAttempted
        && checks.noJwksNetworkFetch
        && checks.noExternalIdpCall
        ? "pass"
        : "blocked",
      evidence: "runtime-config + implementation-precheck",
      note: checks.upstreamActionsStillDisabled
        ? "Upstream actions remain disabled and planning endpoints made no external connection attempts."
        : "Upstream actions are enabled before production connection blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV11["checks"],
): ProductionReadinessV11Message[] {
  const blockers: ProductionReadinessV11Message[] = [];
  addMessage(blockers, checks.summaryV10EvidenceReady, "SUMMARY_V10_EVIDENCE_NOT_READY", "production-readiness-summary-v10", "Production readiness summary v10 evidence must be ready before v11 planning summary.");
  addMessage(blockers, checks.implementationPrecheckReady, "IMPLEMENTATION_PRECHECK_NOT_READY", "production-connection-implementation-precheck", "Implementation precheck evidence must be ready before production connection implementation planning.");
  addMessage(blockers, checks.dryRunChangeRequestReady, "DRY_RUN_CHANGE_REQUEST_NOT_READY", "production-connection-dry-run-change-request", "Dry-run change request must be archive-ready before production connection planning can advance.");
  addMessage(blockers, checks.ownerApprovalsPresent, "OWNER_APPROVALS_PENDING", "production-connection-implementation-precheck", "Audit, IdP, and rollback owner approvals are still missing.");
  addMessage(blockers, checks.dryRunChangeRequestExecutable, "DRY_RUN_CHANGE_REQUEST_NOT_EXECUTABLE", "production-connection-dry-run-change-request", "The current change request is intentionally non-executable.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "production-readiness-summary-v11", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "production-readiness-summary-v11", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v11", "UPSTREAM_ACTIONS_ENABLED must remain false while production connection blockers are unresolved.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV11["readinessStatus"]): ProductionReadinessV11Message[] {
  return [
    {
      code: status.implementationPrecheckReady && status.dryRunChangeRequestReady
        ? "IMPLEMENTATION_PLANNING_READY_CONNECTIONS_MISSING"
        : "IMPLEMENTATION_PLANNING_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v11",
      message: "v11 separates implementation planning readiness from real production connections and owner approvals.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV11Message[] {
  return [
    {
      code: "ARCHIVE_DRY_RUN_CHANGE_REQUEST_BEFORE_REAL_WORK",
      severity: "recommendation",
      source: "production-connection-dry-run-change-request",
      message: "Archive the dry-run change request before creating any executable production connection implementation.",
    },
    {
      code: "COLLECT_OWNER_APPROVALS_BEFORE_CONNECTIONS",
      severity: "recommendation",
      source: "production-connection-implementation-precheck",
      message: "Collect audit, IdP, and release owner approvals before connecting managed audit or real JWKS verification.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV11Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV11Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV11Category): string[] {
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

function renderMessages(messages: ProductionReadinessV11Message[], emptyText: string): string[] {
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
