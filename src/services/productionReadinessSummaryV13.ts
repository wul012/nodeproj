import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  createProductionLiveProbeReadinessContract,
} from "./productionLiveProbeReadinessContract.js";
import {
  loadProductionLiveProbeSmokeHarness,
} from "./productionLiveProbeSmokeHarness.js";
import type { ProductionConnectionDryRunApprovalLedger } from "./productionConnectionDryRunApprovalLedger.js";
import { loadProductionReadinessSummaryV12 } from "./productionReadinessSummaryV12.js";

export interface ProductionReadinessSummaryV13 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v13";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-live-probe-readiness";
    productionReadinessSummaryV12Version: "production-readiness-summary.v12";
    productionLiveProbeReadinessContractVersion: "production-live-probe-readiness-contract.v1";
    productionLiveProbeSmokeHarnessVersion: "production-live-probe-smoke-harness.v1";
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
  };
  readinessStatus: {
    summaryV12Ready: boolean;
    liveProbeContractReady: boolean;
    liveProbeSmokeEvidenceReady: boolean;
    liveProbeSmokeSkipped: boolean;
    liveProbeSmokePassed: boolean;
    realManagedAuditAdapterStillMissing: boolean;
    realIdpVerifierStillMissing: boolean;
  };
  categories: ProductionReadinessV13Category[];
  checks: {
    summaryV12EvidenceReady: boolean;
    liveProbeContractReady: boolean;
    liveProbeSmokeEvidenceReady: boolean;
    liveProbeSmokeSkipped: boolean;
    liveProbeSmokePassed: boolean;
    liveProbeWritesAttempted: false;
    realManagedAuditAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
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
  productionBlockers: ProductionReadinessV13Message[];
  warnings: ProductionReadinessV13Message[];
  recommendations: ProductionReadinessV13Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV13Json: string;
    productionReadinessSummaryV13Markdown: string;
    productionReadinessSummaryV12Json: string;
    productionLiveProbeReadinessContractJson: string;
    productionLiveProbeSmokeHarnessJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV13Category {
  id:
    | "summary-v12-evidence"
    | "live-probe-contract"
    | "live-probe-smoke"
    | "real-production-connections"
    | "execution-safety";
  readinessPasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV13Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-readiness-summary-v12"
    | "live-probe-contract"
    | "live-probe-smoke-harness"
    | "production-readiness-summary-v13";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV13Json: "/api/v1/production/readiness-summary-v13",
  productionReadinessSummaryV13Markdown: "/api/v1/production/readiness-summary-v13?format=markdown",
  productionReadinessSummaryV12Json: "/api/v1/production/readiness-summary-v12",
  productionLiveProbeReadinessContractJson: "/api/v1/production/live-probe-readiness-contract",
  productionLiveProbeSmokeHarnessJson: "/api/v1/production/live-probe-smoke-harness",
});

export async function loadProductionReadinessSummaryV13(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
  productionConnectionDryRunApprovals: ProductionConnectionDryRunApprovalLedger;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
}): Promise<ProductionReadinessSummaryV13> {
  const summaryV12 = await loadProductionReadinessSummaryV12(input);
  const contract = createProductionLiveProbeReadinessContract(input.config);
  const smokeHarness = await loadProductionLiveProbeSmokeHarness({
    config: input.config,
    orderPlatform: input.orderPlatform,
    miniKv: input.miniKv,
  });
  const checks = {
    summaryV12EvidenceReady: summaryV12.checks.summaryV11EvidenceReady
      && summaryV12.checks.approvalLedgerReady
      && summaryV12.checks.archiveVerificationReady
      && summaryV12.checks.dryRunReviewOnly
      && summaryV12.checks.noRealConnectionAttempted
      && summaryV12.checks.upstreamActionsStillDisabled,
    liveProbeContractReady: contract.readyForLiveProbePlanning
      && contract.checks.writeActionsForbidden
      && contract.checks.noProbeAttempted,
    liveProbeSmokeEvidenceReady: smokeHarness.readyForLiveProbeEvidence
      && smokeHarness.summary.blockedProbeCount === 0
      && smokeHarness.checks.writeProbeAttempted === false
      && smokeHarness.checks.javaWritesAttempted === false
      && smokeHarness.checks.miniKvWritesAttempted === false,
    liveProbeSmokeSkipped: smokeHarness.summary.skippedProbeCount > 0,
    liveProbeSmokePassed: smokeHarness.summary.probeCount > 0
      && smokeHarness.summary.passedProbeCount === smokeHarness.summary.probeCount,
    liveProbeWritesAttempted: false as const,
    realManagedAuditAdapterConnected: false,
    realIdpVerifierConnected: false,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const readinessStatus = {
    summaryV12Ready: checks.summaryV12EvidenceReady,
    liveProbeContractReady: checks.liveProbeContractReady,
    liveProbeSmokeEvidenceReady: checks.liveProbeSmokeEvidenceReady,
    liveProbeSmokeSkipped: checks.liveProbeSmokeSkipped,
    liveProbeSmokePassed: checks.liveProbeSmokePassed,
    realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
    realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(readinessStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v13",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v13",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-live-probe-readiness",
      productionReadinessSummaryV12Version: summaryV12.summaryVersion,
      productionLiveProbeReadinessContractVersion: contract.profileVersion,
      productionLiveProbeSmokeHarnessVersion: smokeHarness.profileVersion,
      upstreamProbesEnabled: input.config.upstreamProbesEnabled,
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
      "Treat skipped live probe evidence as local-development evidence, not as proof that Java and mini-kv are production-connected.",
      "When Java and mini-kv are explicitly started, rerun the smoke harness with UPSTREAM_PROBES_ENABLED=true and archive pass evidence.",
    ],
  };
}

export function renderProductionReadinessSummaryV13Markdown(summary: ProductionReadinessSummaryV13): string {
  return [
    "# Production readiness summary v13",
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

function createCategories(checks: ProductionReadinessSummaryV13["checks"]): ProductionReadinessV13Category[] {
  return [
    {
      id: "summary-v12-evidence",
      readinessPasses: checks.summaryV12EvidenceReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.summaryV12EvidenceReady ? "pass" : "blocked",
      evidence: "production-readiness-summary-v12",
      note: checks.summaryV12EvidenceReady
        ? "v12 dry-run approval and archive evidence remains ready."
        : "v12 dry-run approval or archive evidence is incomplete.",
    },
    {
      id: "live-probe-contract",
      readinessPasses: checks.liveProbeContractReady,
      productionConnected: false,
      status: checks.liveProbeContractReady ? "pass" : "blocked",
      evidence: "production-live-probe-readiness-contract",
      note: checks.liveProbeContractReady
        ? "Live probe targets and no-write boundaries are defined."
        : "Live probe contract is incomplete or unsafe.",
    },
    {
      id: "live-probe-smoke",
      readinessPasses: checks.liveProbeSmokeEvidenceReady,
      productionConnected: checks.liveProbeSmokePassed,
      status: checks.liveProbeSmokeEvidenceReady ? "pass" : "blocked",
      evidence: "production-live-probe-smoke-harness",
      note: checks.liveProbeSmokePassed
        ? "All read-only live probes returned evidence."
        : "Smoke evidence is recorded, but one or more probes are skipped.",
    },
    {
      id: "real-production-connections",
      readinessPasses: checks.summaryV12EvidenceReady
        && checks.liveProbeContractReady
        && checks.liveProbeSmokeEvidenceReady,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter + idp-jwks-verifier",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Real production connections are connected."
        : "Live probe readiness can be complete while real managed audit and IdP connections are still missing.",
    },
    {
      id: "execution-safety",
      readinessPasses: checks.liveProbeWritesAttempted === false
        && checks.upstreamActionsStillDisabled,
      productionConnected: false,
      status: checks.liveProbeWritesAttempted === false && checks.upstreamActionsStillDisabled
        ? "pass"
        : "blocked",
      evidence: "live-probe-smoke-harness + runtime-config",
      note: checks.upstreamActionsStillDisabled
        ? "Live probe smoke remains read-only and upstream actions remain disabled."
        : "Upstream actions are enabled before production blockers are resolved.",
    },
  ];
}

function collectProductionBlockers(
  checks: ProductionReadinessSummaryV13["checks"],
): ProductionReadinessV13Message[] {
  const blockers: ProductionReadinessV13Message[] = [];
  addMessage(blockers, checks.summaryV12EvidenceReady, "SUMMARY_V12_EVIDENCE_NOT_READY", "production-readiness-summary-v12", "Summary v12 evidence must be ready before v13 can summarize live probe readiness.");
  addMessage(blockers, checks.liveProbeContractReady, "LIVE_PROBE_CONTRACT_NOT_READY", "live-probe-contract", "Live probe readiness contract must be ready before v13.");
  addMessage(blockers, checks.liveProbeSmokeEvidenceReady, "LIVE_PROBE_SMOKE_EVIDENCE_NOT_READY", "live-probe-smoke-harness", "Live probe smoke harness must record pass or skipped evidence for every planned probe.");
  addMessage(blockers, checks.liveProbeWritesAttempted === false, "LIVE_PROBE_WRITE_ATTEMPTED", "live-probe-smoke-harness", "v13 requires live probe smoke to remain read-only.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "production-readiness-summary-v13", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "production-readiness-summary-v13", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v13", "UPSTREAM_ACTIONS_ENABLED must remain false while production blockers are unresolved.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV13["readinessStatus"]): ProductionReadinessV13Message[] {
  return [
    {
      code: status.liveProbeSmokePassed
        ? "LIVE_PROBE_SMOKE_PASSED_CONNECTIONS_MISSING"
        : "LIVE_PROBE_SMOKE_SKIPPED_CONNECTIONS_MISSING",
      severity: "warning",
      source: "production-readiness-summary-v13",
      message: "v13 separates live probe evidence from real managed audit and IdP production readiness.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV13Message[] {
  return [
    {
      code: "ARCHIVE_LIVE_PROBE_EVIDENCE_NEXT",
      severity: "recommendation",
      source: "production-readiness-summary-v13",
      message: "Archive the live probe contract and smoke harness together before moving toward real production connection work.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV13Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV13Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV13Category): string[] {
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

function renderMessages(messages: ProductionReadinessV13Message[], emptyText: string): string[] {
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
