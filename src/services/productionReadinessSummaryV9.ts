import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createJwksCacheContractProfile } from "./jwksCacheContract.js";
import { createManagedAuditAdapterRunnerProfile } from "./managedAuditAdapterRunner.js";
import { loadProductionReadinessSummaryV8 } from "./productionReadinessSummaryV8.js";

export interface ProductionReadinessSummaryV9 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v9";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-connection-candidate-integration";
    managedAuditAdapterRunnerVersion: "managed-audit-adapter-runner.v1";
    jwksCacheContractVersion: "jwks-cache-contract.v1";
    productionReadinessSummaryV8Version: "production-readiness-summary.v8";
    upstreamActionsEnabled: boolean;
  };
  candidateStatus: {
    adapterRunnerPasses: boolean;
    realManagedAuditAdapterStillMissing: boolean;
    jwksCacheContractPasses: boolean;
    realIdpVerifierStillMissing: boolean;
    productionReadinessV8StillBlocked: boolean;
  };
  categories: ProductionReadinessV9Category[];
  checks: {
    adapterRunnerPasses: boolean;
    realManagedAuditAdapterConnected: boolean;
    jwksCacheContractPasses: boolean;
    realIdpVerifierConnected: boolean;
    productionReadinessV8EvidenceConnected: boolean;
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
  productionBlockers: ProductionReadinessV9Message[];
  warnings: ProductionReadinessV9Message[];
  recommendations: ProductionReadinessV9Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV9Json: string;
    productionReadinessSummaryV9Markdown: string;
    productionReadinessSummaryV8Json: string;
    managedAuditAdapterRunnerJson: string;
    jwksCacheContractJson: string;
    managedAuditAdapterComplianceJson: string;
    jwksVerifierFixtureRehearsalJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV9Category {
  id:
    | "managed-audit-adapter-runner"
    | "jwks-cache-contract"
    | "production-connections"
    | "summary-v8-evidence"
    | "execution-safety";
  candidatePasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV9Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-runner"
    | "jwks-cache-contract"
    | "production-readiness-summary-v8"
    | "production-readiness-summary-v9";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV9Json: "/api/v1/production/readiness-summary-v9",
  productionReadinessSummaryV9Markdown: "/api/v1/production/readiness-summary-v9?format=markdown",
  productionReadinessSummaryV8Json: "/api/v1/production/readiness-summary-v8",
  managedAuditAdapterRunnerJson: "/api/v1/audit/managed-adapter-runner",
  jwksCacheContractJson: "/api/v1/security/jwks-cache-contract",
  managedAuditAdapterComplianceJson: "/api/v1/audit/managed-adapter-compliance",
  jwksVerifierFixtureRehearsalJson: "/api/v1/security/jwks-verifier-fixture-rehearsal",
});

export async function loadProductionReadinessSummaryV9(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV9> {
  const adapterRunner = await createManagedAuditAdapterRunnerProfile(input.config);
  const jwksCacheContract = createJwksCacheContractProfile(input.config);
  const summaryV8 = await loadProductionReadinessSummaryV8(input);
  const checks = {
    adapterRunnerPasses: adapterRunner.checks.memoryRunnerPasses
      && adapterRunner.checks.fileCandidateRunnerPasses
      && adapterRunner.checks.allRunnerTargetsPass
      && adapterRunner.checks.noDatabaseConnectionAttempted
      && adapterRunner.checks.noAuditFileMigrationPerformed,
    realManagedAuditAdapterConnected: adapterRunner.checks.realManagedAdapterConnected,
    jwksCacheContractPasses: jwksCacheContract.checks.idpConfigComplete
      && jwksCacheContract.checks.cacheHitCovered
      && jwksCacheContract.checks.unknownKidRejected
      && jwksCacheContract.checks.expiredCacheRejected
      && jwksCacheContract.checks.rotationMarkerCovered
      && jwksCacheContract.checks.noJwksNetworkFetch
      && jwksCacheContract.checks.noExternalIdpCall,
    realIdpVerifierConnected: jwksCacheContract.checks.realIdpVerifierConnected,
    productionReadinessV8EvidenceConnected: summaryV8.checks.managedAuditComplianceHarnessPasses
      && summaryV8.checks.jwksFixtureVerifierPasses
      && summaryV8.checks.productionReadinessV7EvidenceConnected,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const candidateStatus = {
    adapterRunnerPasses: checks.adapterRunnerPasses,
    realManagedAuditAdapterStillMissing: checks.realManagedAuditAdapterConnected === false,
    jwksCacheContractPasses: checks.jwksCacheContractPasses,
    realIdpVerifierStillMissing: checks.realIdpVerifierConnected === false,
    productionReadinessV8StillBlocked: summaryV8.summary.blockedCategoryCount > 0,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(candidateStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v9",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v9",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-connection-candidate-integration",
      managedAuditAdapterRunnerVersion: adapterRunner.profileVersion,
      jwksCacheContractVersion: jwksCacheContract.profileVersion,
      productionReadinessSummaryV8Version: summaryV8.summaryVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    candidateStatus,
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
      "Add an environment-selected real managed audit adapter target after credentials and migration rules are explicit.",
      "Add a real JWKS fetch/cache implementation after IdP URL, timeout, and rotation policies are explicit.",
      "Keep readyForProductionOperations=false until both real production connections pass their candidate checks.",
    ],
  };
}

export function renderProductionReadinessSummaryV9Markdown(summary: ProductionReadinessSummaryV9): string {
  return [
    "# Production readiness summary v9",
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
    "## Candidate Status",
    "",
    ...renderEntries(summary.candidateStatus),
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

function createCategories(checks: ProductionReadinessSummaryV9["checks"]): ProductionReadinessV9Category[] {
  return [
    {
      id: "managed-audit-adapter-runner",
      candidatePasses: checks.adapterRunnerPasses,
      productionConnected: checks.realManagedAuditAdapterConnected,
      status: checks.adapterRunnerPasses ? "pass" : "blocked",
      evidence: "managed-audit-adapter-runner",
      note: checks.adapterRunnerPasses
        ? "Memory and file-candidate managed audit targets pass the same runner."
        : "Managed audit adapter runner evidence is incomplete.",
    },
    {
      id: "jwks-cache-contract",
      candidatePasses: checks.jwksCacheContractPasses,
      productionConnected: checks.realIdpVerifierConnected,
      status: checks.jwksCacheContractPasses ? "pass" : "blocked",
      evidence: "jwks-cache-contract",
      note: checks.jwksCacheContractPasses
        ? "Local JWKS cache contract covers hit, unknown kid, expiry, and rotation marker."
        : "JWKS cache contract evidence is incomplete.",
    },
    {
      id: "production-connections",
      candidatePasses: checks.adapterRunnerPasses && checks.jwksCacheContractPasses,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter-runner + jwks-cache-contract",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Production audit and IdP connections are both connected."
        : "Candidate layers pass locally, but real audit storage and real IdP verifier remain missing.",
    },
    {
      id: "summary-v8-evidence",
      candidatePasses: checks.productionReadinessV8EvidenceConnected,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.productionReadinessV8EvidenceConnected ? "pass" : "blocked",
      evidence: "production-readiness-summary-v8",
      note: checks.productionReadinessV8EvidenceConnected
        ? "v8 rehearsal evidence remains connected."
        : "v8 evidence chain is incomplete.",
    },
    {
      id: "execution-safety",
      candidatePasses: checks.upstreamActionsStillDisabled,
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
  checks: ProductionReadinessSummaryV9["checks"],
): ProductionReadinessV9Message[] {
  const blockers: ProductionReadinessV9Message[] = [];
  addMessage(blockers, checks.adapterRunnerPasses, "MANAGED_AUDIT_ADAPTER_RUNNER_FAILED", "managed-audit-adapter-runner", "Managed audit adapter runner must pass before production audit connection work.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-adapter-runner", "A real managed audit adapter target is still required before production operations.");
  addMessage(blockers, checks.jwksCacheContractPasses, "JWKS_CACHE_CONTRACT_FAILED", "jwks-cache-contract", "JWKS cache contract must pass before production IdP connection work.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "jwks-cache-contract", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.productionReadinessV8EvidenceConnected, "PRODUCTION_READINESS_V8_EVIDENCE_INCOMPLETE", "production-readiness-summary-v8", "v8 rehearsal evidence must remain connected.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v9", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV9["candidateStatus"]): ProductionReadinessV9Message[] {
  return [
    {
      code: status.adapterRunnerPasses && status.jwksCacheContractPasses
        ? "CANDIDATES_PASS_CONNECTIONS_MISSING"
        : "CANDIDATE_EVIDENCE_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v9",
      message: "v9 separates candidate-layer success from real production connections; missing connections keep production operations blocked.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV9Message[] {
  return [
    {
      code: "ADD_REAL_AUDIT_ADAPTER_TARGET",
      severity: "recommendation",
      source: "managed-audit-adapter-runner",
      message: "Add a real managed audit adapter target to the runner when credentials and migration rules are explicit.",
    },
    {
      code: "ADD_REAL_JWKS_CACHE",
      severity: "recommendation",
      source: "jwks-cache-contract",
      message: "Add a real JWKS cache implementation with timeout, expiry, and rotation policies before production auth.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV9Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV9Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV9Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Candidate passes: ${category.candidatePasses}`,
    `- Production connected: ${category.productionConnected}`,
    `- Status: ${category.status}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV9Message[], emptyText: string): string[] {
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
