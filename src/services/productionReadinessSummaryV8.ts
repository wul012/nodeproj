import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import { createJwksVerifierFixtureRehearsalProfile } from "./jwksVerifierFixtureRehearsal.js";
import { createManagedAuditAdapterComplianceProfile } from "./managedAuditAdapterCompliance.js";
import { loadProductionReadinessSummaryV7 } from "./productionReadinessSummaryV7.js";

export interface ProductionReadinessSummaryV8 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v8";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  stage: {
    name: "production-compliance-rehearsal-integration";
    managedAuditAdapterComplianceVersion: "managed-audit-adapter-compliance.v1";
    jwksVerifierFixtureRehearsalVersion: "jwks-verifier-fixture-rehearsal.v1";
    productionReadinessSummaryV7Version: "production-readiness-summary.v7";
    upstreamActionsEnabled: boolean;
  };
  rehearsalStatus: {
    managedAuditComplianceHarnessPasses: boolean;
    managedAuditProductionConnectionStillMissing: boolean;
    jwksFixtureVerifierPasses: boolean;
    idpProductionConnectionStillMissing: boolean;
    productionReadinessV7StillBlocked: boolean;
  };
  categories: ProductionReadinessV8Category[];
  checks: {
    managedAuditComplianceHarnessPasses: boolean;
    realManagedAuditAdapterConnected: boolean;
    jwksFixtureVerifierPasses: boolean;
    realIdpVerifierConnected: boolean;
    productionReadinessV7EvidenceConnected: boolean;
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
  productionBlockers: ProductionReadinessV8Message[];
  warnings: ProductionReadinessV8Message[];
  recommendations: ProductionReadinessV8Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV8Json: string;
    productionReadinessSummaryV8Markdown: string;
    productionReadinessSummaryV7Json: string;
    managedAuditAdapterComplianceJson: string;
    jwksVerifierFixtureRehearsalJson: string;
    managedAuditAdapterBoundaryJson: string;
    idpVerifierBoundaryJson: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV8Category {
  id:
    | "managed-audit-compliance-harness"
    | "jwks-verifier-fixture"
    | "production-connections"
    | "summary-v7-evidence"
    | "execution-safety";
  rehearsalPasses: boolean;
  productionConnected: boolean;
  status: "pass" | "blocked";
  evidence: string;
  note: string;
}

export interface ProductionReadinessV8Message {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-adapter-compliance"
    | "jwks-verifier-fixture-rehearsal"
    | "production-readiness-summary-v7"
    | "production-readiness-summary-v8";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV8Json: "/api/v1/production/readiness-summary-v8",
  productionReadinessSummaryV8Markdown: "/api/v1/production/readiness-summary-v8?format=markdown",
  productionReadinessSummaryV7Json: "/api/v1/production/readiness-summary-v7",
  managedAuditAdapterComplianceJson: "/api/v1/audit/managed-adapter-compliance",
  jwksVerifierFixtureRehearsalJson: "/api/v1/security/jwks-verifier-fixture-rehearsal",
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  idpVerifierBoundaryJson: "/api/v1/security/idp-verifier-boundary",
});

export async function loadProductionReadinessSummaryV8(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV8> {
  const managedAuditCompliance = await createManagedAuditAdapterComplianceProfile(input.config);
  const jwksFixture = createJwksVerifierFixtureRehearsalProfile(input.config);
  const summaryV7 = loadProductionReadinessSummaryV7(input);
  const checks = {
    managedAuditComplianceHarnessPasses: managedAuditCompliance.checks.adapterInterfaceExercised
      && managedAuditCompliance.checks.appendOnlyWriteCovered
      && managedAuditCompliance.checks.queryByRequestIdCovered
      && managedAuditCompliance.checks.digestStableAfterRepeatRead
      && managedAuditCompliance.checks.backupRestoreMarkerCovered
      && managedAuditCompliance.checks.noDatabaseConnectionAttempted
      && managedAuditCompliance.checks.noAuditFileMigrationPerformed,
    realManagedAuditAdapterConnected: managedAuditCompliance.checks.realManagedAdapterConnected,
    jwksFixtureVerifierPasses: jwksFixture.checks.idpConfigComplete
      && jwksFixture.checks.localJwksFixtureCreated
      && jwksFixture.checks.acceptedTokenVerified
      && jwksFixture.checks.issuerMismatchRejected
      && jwksFixture.checks.audienceMismatchRejected
      && jwksFixture.checks.expiredTokenRejected
      && jwksFixture.checks.missingRequiredRoleRejected
      && jwksFixture.checks.unknownKidRejected
      && jwksFixture.checks.noJwksNetworkFetch
      && jwksFixture.checks.noExternalIdpCall,
    realIdpVerifierConnected: jwksFixture.checks.realIdpVerifierConnected,
    productionReadinessV7EvidenceConnected: summaryV7.checks.managedAuditAdapterBoundaryReady
      && summaryV7.checks.idpVerifierBoundaryReady
      && summaryV7.checks.productionReadinessV6EvidenceConnected,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    readyForProductionOperations: false as const,
  };
  const rehearsalStatus = {
    managedAuditComplianceHarnessPasses: checks.managedAuditComplianceHarnessPasses,
    managedAuditProductionConnectionStillMissing: checks.realManagedAuditAdapterConnected === false,
    jwksFixtureVerifierPasses: checks.jwksFixtureVerifierPasses,
    idpProductionConnectionStillMissing: checks.realIdpVerifierConnected === false,
    productionReadinessV7StillBlocked: summaryV7.summary.blockedCategoryCount > 0,
  };
  const categories = createCategories(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(rehearsalStatus);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production readiness summary v8",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v8",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    stage: {
      name: "production-compliance-rehearsal-integration",
      managedAuditAdapterComplianceVersion: managedAuditCompliance.profileVersion,
      jwksVerifierFixtureRehearsalVersion: jwksFixture.profileVersion,
      productionReadinessSummaryV7Version: summaryV7.summaryVersion,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
    },
    rehearsalStatus,
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
      "Run the managed audit compliance harness against a real managed audit adapter implementation.",
      "Replace the local JWKS fixture with a real JWKS cache and IdP verifier.",
      "Keep upstream execution disabled until both production connections pass the same readiness summary.",
    ],
  };
}

export function renderProductionReadinessSummaryV8Markdown(summary: ProductionReadinessSummaryV8): string {
  return [
    "# Production readiness summary v8",
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
    "## Rehearsal Status",
    "",
    ...renderEntries(summary.rehearsalStatus),
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

function createCategories(checks: ProductionReadinessSummaryV8["checks"]): ProductionReadinessV8Category[] {
  return [
    {
      id: "managed-audit-compliance-harness",
      rehearsalPasses: checks.managedAuditComplianceHarnessPasses,
      productionConnected: checks.realManagedAuditAdapterConnected,
      status: checks.managedAuditComplianceHarnessPasses ? "pass" : "blocked",
      evidence: "managed-audit-adapter-compliance",
      note: checks.managedAuditComplianceHarnessPasses
        ? "Local managed audit adapter compliance harness passes; production storage is still separate."
        : "Managed audit compliance harness failed or is incomplete.",
    },
    {
      id: "jwks-verifier-fixture",
      rehearsalPasses: checks.jwksFixtureVerifierPasses,
      productionConnected: checks.realIdpVerifierConnected,
      status: checks.jwksFixtureVerifierPasses ? "pass" : "blocked",
      evidence: "jwks-verifier-fixture-rehearsal",
      note: checks.jwksFixtureVerifierPasses
        ? "Local JWKS fixture validates accepted and rejected JWT samples; production IdP is still separate."
        : "JWKS fixture verifier rehearsal failed or is incomplete.",
    },
    {
      id: "production-connections",
      rehearsalPasses: checks.managedAuditComplianceHarnessPasses && checks.jwksFixtureVerifierPasses,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected ? "pass" : "blocked",
      evidence: "managed-audit-adapter-compliance + jwks-verifier-fixture-rehearsal",
      note: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected
        ? "Production audit and IdP connections are both connected."
        : "Compliance rehearsals pass locally, but real audit storage and real IdP verifier remain missing.",
    },
    {
      id: "summary-v7-evidence",
      rehearsalPasses: checks.productionReadinessV7EvidenceConnected,
      productionConnected: checks.realManagedAuditAdapterConnected && checks.realIdpVerifierConnected,
      status: checks.productionReadinessV7EvidenceConnected ? "pass" : "blocked",
      evidence: "production-readiness-summary-v7",
      note: checks.productionReadinessV7EvidenceConnected
        ? "v7 boundary and v6 evidence chain remain connected."
        : "v7 evidence chain is incomplete.",
    },
    {
      id: "execution-safety",
      rehearsalPasses: checks.upstreamActionsStillDisabled,
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
  checks: ProductionReadinessSummaryV8["checks"],
): ProductionReadinessV8Message[] {
  const blockers: ProductionReadinessV8Message[] = [];
  addMessage(blockers, checks.managedAuditComplianceHarnessPasses, "MANAGED_AUDIT_COMPLIANCE_HARNESS_FAILED", "managed-audit-adapter-compliance", "Managed audit adapter compliance harness must pass before production audit connection work.");
  addMessage(blockers, checks.realManagedAuditAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "managed-audit-adapter-compliance", "A real managed audit adapter is still required before production operations.");
  addMessage(blockers, checks.jwksFixtureVerifierPasses, "JWKS_FIXTURE_VERIFIER_FAILED", "jwks-verifier-fixture-rehearsal", "JWKS verifier fixture rehearsal must pass before production IdP connection work.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "jwks-verifier-fixture-rehearsal", "A real JWKS/OIDC verifier is still required before production operations.");
  addMessage(blockers, checks.productionReadinessV7EvidenceConnected, "PRODUCTION_READINESS_V7_EVIDENCE_INCOMPLETE", "production-readiness-summary-v7", "v7 boundary evidence must remain connected.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "production-readiness-summary-v8", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(status: ProductionReadinessSummaryV8["rehearsalStatus"]): ProductionReadinessV8Message[] {
  return [
    {
      code: status.managedAuditComplianceHarnessPasses && status.jwksFixtureVerifierPasses
        ? "REHEARSALS_PASS_CONNECTIONS_MISSING"
        : "REHEARSAL_EVIDENCE_INCOMPLETE",
      severity: "warning",
      source: "production-readiness-summary-v8",
      message: "v8 separates local rehearsal success from real production connections; missing connections keep production operations blocked.",
    },
  ];
}

function collectRecommendations(): ProductionReadinessV8Message[] {
  return [
    {
      code: "CONNECT_REAL_MANAGED_AUDIT_ADAPTER",
      severity: "recommendation",
      source: "managed-audit-adapter-compliance",
      message: "Implement a real managed audit adapter and run the same compliance harness against it.",
    },
    {
      code: "CONNECT_REAL_IDP_VERIFIER",
      severity: "recommendation",
      source: "jwks-verifier-fixture-rehearsal",
      message: "Implement a real JWKS cache and IdP verifier, then bind verified claims to access guard identity.",
    },
  ];
}

function addMessage(
  messages: ProductionReadinessV8Message[],
  condition: boolean,
  code: string,
  source: ProductionReadinessV8Message["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderCategory(category: ProductionReadinessV8Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Rehearsal passes: ${category.rehearsalPasses}`,
    `- Production connected: ${category.productionConnected}`,
    `- Status: ${category.status}`,
    `- Evidence: ${category.evidence}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV8Message[], emptyText: string): string[] {
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
