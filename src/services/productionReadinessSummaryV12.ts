import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  loadProductionConnectionArchiveVerification,
} from "./productionConnectionArchiveVerification.js";
import { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import { loadProductionReadinessSummaryV11 } from "./productionReadinessSummaryV11.js";

export interface ProductionReadinessSummaryV12 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v12";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-connection-review-archive";
    productionReadinessSummaryV11Version: "production-readiness-summary.v11";
    productionConnectionDryRunApprovalLedgerVersion: "production-connection-dry-run-approval-ledger.v1";
    productionConnectionArchiveVerificationVersion: "production-connection-archive-verification.v1";
    upstreamActionsEnabled: boolean;
  };
  readinessStatus: {
    summaryV11Ready: boolean;
    approvalLedgerReady: boolean;
    archiveVerificationReady: boolean;
    realManagedAuditAdapterStillMissing: boolean;
    realIdpVerifierStillMissing: boolean;
    dryRunReviewNotProductionApproval: boolean;
  };
  categories: ProductionReadinessV12Category[];
  checks: {
    summaryV11EvidenceReady: boolean;
    approvalLedgerReady: boolean;
    archiveVerificationReady: boolean;
    approvalDigestValid: boolean;
    archiveDigestValid: boolean;
    realManagedAuditAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
    dryRunReviewOnly: boolean;
    noRealConnectionAttempted: boolean;
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
  productionBlockers: ProductionReadinessV12Message[];
  warnings: ProductionReadinessV12Message[];
  recommendations: ProductionReadinessV12Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV12Json: string;
    productionReadinessSummaryV12Markdown: string;
    productionReadinessSummaryV11Json: string;
    productionConnectionDryRunApprovalsJson: string;
    productionConnectionArchiveVerificationJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV12Category {
  id:
    | "summary-v11-evidence"
    | "approval-ledger"
    | "archive-verification"
    | "real-production-connections"
    | "execution-safety";
  readinessPasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV12Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-readiness-summary-v11"
    | "dry-run-approval-ledger"
    | "archive-verification"
    | "production-readiness-summary-v12";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV12Json: "/api/v1/production/readiness-summary-v12",
  productionReadinessSummaryV12Markdown: "/api/v1/production/readiness-summary-v12?format=markdown",
  productionReadinessSummaryV11Json: "/api/v1/production/readiness-summary-v11",
  productionConnectionDryRunApprovalsJson: "/api/v1/production/connection-dry-run-approvals",
  productionConnectionArchiveVerificationJson: "/api/v1/production/connection-archive-verification",
});

export async function loadProductionReadinessSummaryV12(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
}): Promise<ProductionReadinessSummaryV12> {
  const summaryV11 = await loadProductionReadinessSummaryV11(input);
  const approvalLedger = input.productionConnectionDryRunApprovals.snapshot(input.config);
  const archiveVerification = await loadProductionConnectionArchiveVerification(input);
  const checks = {
    summaryV11EvidenceReady: summaryV11.checks.summaryV10EvidenceReady
      && summaryV11.checks.implementationPrecheckReady
      && summaryV11.checks.dryRunChangeRequestReady
      && summaryV11.checks.noDatabaseConnectionAttempted
      && summaryV11.checks.noJwksNetworkFetch
      && summaryV11.checks.noExternalIdpCall,
    approvalLedgerReady: approvalLedger.readyForApprovalArchive
      && approvalLedger.checks.latestApprovalDigestValid
      && approvalLedger.checks.latestChangeRequestDigestMatches
      && approvalLedger.checks.latestRealConnectionAttempted === false,
    archiveVerificationReady: archiveVerification.readyForArchiveVerification
      && archiveVerification.checks.approvalDigestValid
      && archiveVerification.checks.approvalDigestMatchesChangeRequest
      && archiveVerification.checks.noRealConnectionAttempted,
    approvalDigestValid: approvalLedger.checks.latestApprovalDigestValid,
    archiveDigestValid: /^[a-f0-9]{64}$/.test(archiveVerification.archive.archiveDigest),
    realManagedAuditAdapterConnected: false,
    realIdpVerifierConnected: false,
    dryRunReviewOnly: archiveVerification.checks.dryRunOnly
      && archiveVerification.checks.changeRequestNonExecutable,
    noRealConnectionAttempted: archiveVerification.checks.noRealConnectionAttempted,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const readinessStatus = {
    summaryV11Ready: checks.summaryV11EvidenceReady,
    approvalLedgerReady: checks.approvalLedgerReady,
    archiveVerificationReady: checks.archiveVerificationReady,
    realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
    realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
    dryRunReviewNotProductionApproval: checks.dryRunReviewOnly,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(readinessStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v12",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v12",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-connection-review-archive",
      productionReadinessSummaryV11Version: summaryV11.summaryVersion,
      productionConnectionDryRunApprovalLedgerVersion: approvalLedger.profileVersion,
      productionConnectionArchiveVerificationVersion: archiveVerification.profileVersion,
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
      "Keep production operations blocked until real managed audit and IdP connections exist.",
      "Use v12 as the closeout summary for dry-run approval and archive verification.",
      "Prepare live-probe readiness work next, but only start Java and mini-kv when a plan explicitly asks for live read-only smoke.",
    ],
  };
}

export function renderProductionReadinessSummaryV12Markdown(summary: ProductionReadinessSummaryV12): string {
  return [
    "# Production readiness summary v12",
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

function createCategories(checks: ProductionReadinessSummaryV12["checks"]): ProductionReadinessV12Category[] {
  return [
    {
      id: "summary-v11-evidence",
      readinessPasses: checks.summaryV11EvidenceReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.summaryV11EvidenceReady ? "pass" : "blocked",
      evidence: "production-readiness-summary-v11",
      note: checks.summaryV11EvidenceReady
        ? "v11 planning evidence remains connected."
        : "v11 planning evidence is incomplete.",
    },
    {
      id: "approval-ledger",
      readinessPasses: checks.approvalLedgerReady,
      productionConnected: false,
      status: checks.approvalLedgerReady ? "pass" : "blocked",
      evidence: "production-connection-dry-run-approvals",
      note: checks.approvalLedgerReady
        ? "Dry-run approval ledger has a valid latest approval digest."
        : "Dry-run approval ledger is missing or invalid.",
    },
    {
      id: "archive-verification",
      readinessPasses: checks.archiveVerificationReady,
      productionConnected: false,
      status: checks.archiveVerificationReady ? "pass" : "blocked",
      evidence: "production-connection-archive-verification",
      note: checks.archiveVerificationReady
        ? "Archive verification confirms precheck, change request, approval digest, and no real connection."
        : "Archive verification is incomplete.",
    },
    {
      id: "real-production-connections",
      readinessPasses: checks.summaryV11EvidenceReady
        && checks.approvalLedgerReady
        && checks.archiveVerificationReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter + idp-jwks-verifier",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Real production connections are connected."
        : "Dry-run review can be complete while real managed audit and IdP connections are still missing.",
    },
    {
      id: "execution-safety",
      readinessPasses: checks.dryRunReviewOnly
        && checks.noRealConnectionAttempted
        && checks.upstreamActionsStillDisabled,
      productionConnected: false,
      status: checks.dryRunReviewOnly && checks.noRealConnectionAttempted && checks.upstreamActionsStillDisabled
        ? "pass"
        : "blocked",
      evidence: "archive-verification + runtime-config",
      note: checks.upstreamActionsStillDisabled
        ? "Upstream actions remain disabled and archive verification is dry-run only."
        : "Upstream actions are enabled before production connection blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV12["checks"],
): ProductionReadinessV12Message[] {
  const blockers: ProductionReadinessV12Message[] = [];
  addMessage(blockers, checks.summaryV11EvidenceReady, "SUMMARY_V11_EVIDENCE_NOT_READY", "production-readiness-summary-v11", "Summary v11 evidence must be ready before v12 can close out dry-run review.");
  addMessage(blockers, checks.approvalLedgerReady, "APPROVAL_LEDGER_NOT_READY", "dry-run-approval-ledger", "Dry-run approval ledger must have a valid latest approval digest.");
  addMessage(blockers, checks.archiveVerificationReady, "ARCHIVE_VERIFICATION_NOT_READY", "archive-verification", "Archive verification must pass before v12 can mark review evidence ready.");
  addMessage(blockers, checks.dryRunReviewOnly, "DRY_RUN_REVIEW_BOUNDARY_VIOLATED", "archive-verification", "v12 requires approval and verification evidence to remain dry-run only.");
  addMessage(blockers, checks.noRealConnectionAttempted, "REAL_CONNECTION_ATTEMPTED", "archive-verification", "v12 must not include any real production connection attempt.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "production-readiness-summary-v12", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "production-readiness-summary-v12", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v12", "UPSTREAM_ACTIONS_ENABLED must remain false while production connection blockers are unresolved.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV12["readinessStatus"]): ProductionReadinessV12Message[] {
  return [
    {
      code: status.approvalLedgerReady && status.archiveVerificationReady
        ? "DRY_RUN_REVIEW_READY_CONNECTIONS_MISSING"
        : "DRY_RUN_REVIEW_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v12",
      message: "v12 separates dry-run review readiness from real managed audit and IdP connections.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV12Message[] {
  return [
    {
      code: "PLAN_LIVE_PROBE_READINESS",
      severity: "recommendation",
      source: "production-readiness-summary-v12",
      message: "Plan read-only live probe readiness next, and start Java or mini-kv only when the plan explicitly requires live smoke.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV12Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV12Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV12Category): string[] {
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

function renderMessages(messages: ProductionReadinessV12Message[], emptyText: string): string[] {
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
