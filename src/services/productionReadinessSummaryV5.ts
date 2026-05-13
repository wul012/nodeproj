import type { AppConfig } from "../config.js";
import { type AuditLog } from "./auditLog.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  createAuditRetentionIntegrityEvidence,
  type AuditRetentionIntegrityEvidence,
} from "./auditRetentionIntegrityEvidence.js";
import {
  createAuthEnforcementRehearsalProfile,
  type AuthEnforcementRehearsalProfile,
} from "./authEnforcementRehearsal.js";
import {
  loadProductionReadinessSummaryV4,
  type ProductionReadinessSummaryV4,
} from "./productionReadinessSummaryV4.js";

export type ProductionReadinessV5CategoryId =
  | "upstream-boundary-evidence"
  | "auth-enforcement"
  | "audit-retention"
  | "execution-safety";

export interface ProductionReadinessSummaryV5 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v5";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    previousSummaryAvailable: boolean;
    upstreamBoundaryEvidenceReady: boolean;
    authRehearsalProfileReady: boolean;
    authEnforcementCurrentlyRejects: boolean;
    signedCredentialAuthReady: boolean;
    auditRetentionIntegrityEvidenceReady: boolean;
    managedAuditStoreReady: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionBlockersRemain: boolean;
  };
  summary: {
    categoryCount: number;
    readyCategoryCount: number;
    notReadyCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    authSampleCount: number;
    auditIntegrityEventCount: number;
    auditRetentionPolicyConfigured: boolean;
    previousProductionBlockerCount: number;
  };
  evidence: {
    previousSummary: {
      summaryVersion: string;
      readyForProductionOperations: false;
      productionBlockerCount: number;
    };
    authEnforcement: AuthEnforcementV5Summary;
    auditRetentionIntegrity: AuditRetentionIntegrityV5Summary;
  };
  categories: ProductionReadinessV5Category[];
  productionBlockers: ProductionReadinessV5Message[];
  warnings: ProductionReadinessV5Message[];
  recommendations: ProductionReadinessV5Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV5Json: string;
    productionReadinessSummaryV5Markdown: string;
    productionReadinessSummaryV4Json: string;
    authEnforcementRehearsalJson: string;
    auditRetentionIntegrityJson: string;
    auditEventsJson: string;
  };
  nextActions: string[];
}

export interface AuthEnforcementV5Summary {
  profileVersion: string;
  authMode: "disabled" | "rehearsal";
  enforcementEnabled: boolean;
  rejectsRequests: boolean;
  credentialAuthImplemented: false;
  sampleStatuses: Record<string, number>;
  productionBlockerCodes: string[];
}

export interface AuditRetentionIntegrityV5Summary {
  evidenceVersion: "audit-retention-integrity-evidence.v1";
  runtimeStoreKind: "memory" | "file";
  retentionDaysConfigured: boolean;
  maxFileBytesConfigured: boolean;
  rotationPolicyConfigured: boolean;
  backupPolicyConfigured: boolean;
  integrityDigestStable: boolean;
  managedStoreConfigured: boolean;
  eventCount: number;
  productionBlockerCodes: string[];
}

export interface ProductionReadinessV5Category {
  id: ProductionReadinessV5CategoryId;
  title: string;
  ready: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  blockerCount: number;
  warningCount: number;
  recommendationCount: number;
  evidenceEndpoints: string[];
  note: string;
}

export interface ProductionReadinessV5Message {
  category: ProductionReadinessV5CategoryId;
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV5Json: "/api/v1/production/readiness-summary-v5",
  productionReadinessSummaryV5Markdown: "/api/v1/production/readiness-summary-v5?format=markdown",
  productionReadinessSummaryV4Json: "/api/v1/production/readiness-summary-v4",
  authEnforcementRehearsalJson: "/api/v1/security/auth-enforcement-rehearsal",
  auditRetentionIntegrityJson: "/api/v1/audit/retention-integrity-evidence",
  auditEventsJson: "/api/v1/audit/events?limit=50",
});

export async function loadProductionReadinessSummaryV5(input: {
  config: AppConfig;
  auditLog: AuditLog;
  auditStoreRuntime: AuditStoreRuntimeDescription;
}): Promise<ProductionReadinessSummaryV5> {
  const previousSummary = await loadProductionReadinessSummaryV4(input.config);
  return createProductionReadinessSummaryV5({
    config: input.config,
    previousSummary,
    authEnforcement: createAuthEnforcementRehearsalProfile(input.config),
    auditRetentionIntegrity: createAuditRetentionIntegrityEvidence({
      config: input.config,
      runtime: input.auditStoreRuntime,
      auditLog: input.auditLog,
    }),
  });
}

export function createProductionReadinessSummaryV5(input: {
  config: Pick<AppConfig, "upstreamActionsEnabled">;
  previousSummary: ProductionReadinessSummaryV4;
  authEnforcement: AuthEnforcementRehearsalProfile;
  auditRetentionIntegrity: AuditRetentionIntegrityEvidence;
}): ProductionReadinessSummaryV5 {
  const authEnforcement = summarizeAuthEnforcement(input.authEnforcement);
  const auditRetentionIntegrity = summarizeAuditRetentionIntegrity(input.auditRetentionIntegrity);
  const checks = {
    previousSummaryAvailable: input.previousSummary.summaryVersion === "production-readiness-summary.v4",
    upstreamBoundaryEvidenceReady: input.previousSummary.checks.javaOperatorAuthBoundaryReady
      && input.previousSummary.checks.miniKvRecoveryBoundaryReady,
    authRehearsalProfileReady: Object.values(input.authEnforcement.checks).every(Boolean),
    authEnforcementCurrentlyRejects: input.authEnforcement.runtime.rejectsRequests,
    signedCredentialAuthReady: false,
    auditRetentionIntegrityEvidenceReady: input.auditRetentionIntegrity.checks.fileRuntimeSelected
      && input.auditRetentionIntegrity.checks.retentionDaysConfigured
      && input.auditRetentionIntegrity.checks.maxFileBytesConfigured
      && input.auditRetentionIntegrity.checks.rotationPolicyConfigured
      && input.auditRetentionIntegrity.checks.backupPolicyConfigured
      && input.auditRetentionIntegrity.checks.integrityDigestStable,
    managedAuditStoreReady: input.auditRetentionIntegrity.checks.managedStoreConfigured,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    executionStillBlocked: input.previousSummary.checks.executionStillBlocked
      && input.config.upstreamActionsEnabled === false,
    productionBlockersRemain: false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  checks.productionBlockersRemain = productionBlockers.length > 0;
  const warnings = collectWarnings(input);
  const recommendations = collectRecommendations();
  const categories = createCategories(checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Production readiness summary v5",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v5",
    maturityTarget: "production-near",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      categoryCount: categories.length,
      readyCategoryCount: categories.filter((category) => category.ready).length,
      notReadyCategoryCount: categories.filter((category) => !category.ready).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      authSampleCount: input.authEnforcement.summary.sampleCount,
      auditIntegrityEventCount: input.auditRetentionIntegrity.integrity.eventCount,
      auditRetentionPolicyConfigured: input.auditRetentionIntegrity.checks.retentionDaysConfigured
        && input.auditRetentionIntegrity.checks.maxFileBytesConfigured
        && input.auditRetentionIntegrity.checks.rotationPolicyConfigured
        && input.auditRetentionIntegrity.checks.backupPolicyConfigured,
      previousProductionBlockerCount: input.previousSummary.summary.productionBlockerCount,
    },
    evidence: {
      previousSummary: {
        summaryVersion: input.previousSummary.summaryVersion,
        readyForProductionOperations: input.previousSummary.readyForProductionOperations,
        productionBlockerCount: input.previousSummary.summary.productionBlockerCount,
      },
      authEnforcement,
      auditRetentionIntegrity,
    },
    categories,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Replace rehearsal headers with signed auth middleware and persistent sessions or tokens.",
      "Move audit evidence to a managed durable store with tested retention, rotation, backup, and restore.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until auth enforcement and managed audit blockers are closed together.",
    ],
  };
}

export function renderProductionReadinessSummaryV5Markdown(summary: ProductionReadinessSummaryV5): string {
  return [
    "# Production readiness summary v5",
    "",
    `- Service: ${summary.service}`,
    `- Generated at: ${summary.generatedAt}`,
    `- Summary version: ${summary.summaryVersion}`,
    `- Maturity target: ${summary.maturityTarget}`,
    `- Ready for production operations: ${summary.readyForProductionOperations}`,
    `- Read only: ${summary.readOnly}`,
    `- Execution allowed: ${summary.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(summary.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(summary.summary),
    "",
    "## Evidence",
    "",
    ...renderEntries(summary.evidence.previousSummary, "previousSummary"),
    ...renderEntries(summary.evidence.authEnforcement, "authEnforcement"),
    ...renderEntries(summary.evidence.auditRetentionIntegrity, "auditRetentionIntegrity"),
    "",
    "## Categories",
    "",
    ...summary.categories.flatMap(renderCategory),
    "## Production Blockers",
    "",
    ...renderMessages(summary.productionBlockers, "No production readiness blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(summary.warnings, "No production readiness warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(summary.recommendations, "No production readiness recommendations."),
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

function summarizeAuthEnforcement(profile: AuthEnforcementRehearsalProfile): AuthEnforcementV5Summary {
  return {
    profileVersion: profile.profileVersion,
    authMode: profile.runtime.authMode,
    enforcementEnabled: profile.runtime.accessGuardEnforcementEnabled,
    rejectsRequests: profile.runtime.rejectsRequests,
    credentialAuthImplemented: profile.runtime.credentialAuthImplemented,
    sampleStatuses: Object.fromEntries(profile.samples.map((sample) => [sample.id, sample.enforcement.statusCode])),
    productionBlockerCodes: profile.productionBlockers.map((blocker) => blocker.code),
  };
}

function summarizeAuditRetentionIntegrity(report: AuditRetentionIntegrityEvidence): AuditRetentionIntegrityV5Summary {
  return {
    evidenceVersion: report.evidenceVersion,
    runtimeStoreKind: report.runtime.runtimeStoreKind,
    retentionDaysConfigured: report.checks.retentionDaysConfigured,
    maxFileBytesConfigured: report.checks.maxFileBytesConfigured,
    rotationPolicyConfigured: report.checks.rotationPolicyConfigured,
    backupPolicyConfigured: report.checks.backupPolicyConfigured,
    integrityDigestStable: report.checks.integrityDigestStable,
    managedStoreConfigured: report.checks.managedStoreConfigured,
    eventCount: report.integrity.eventCount,
    productionBlockerCodes: report.productionBlockers.map((blocker) => blocker.code),
  };
}

function collectProductionBlockers(checks: ProductionReadinessSummaryV5["checks"]): ProductionReadinessV5Message[] {
  const blockers: ProductionReadinessV5Message[] = [];
  addCheckMessage(blockers, checks.previousSummaryAvailable, "PREVIOUS_SUMMARY_V4_UNAVAILABLE", "upstream-boundary-evidence", "production-readiness-summary-v4", "Production readiness summary v4 must remain loadable before v5 aggregation.");
  addCheckMessage(blockers, checks.upstreamBoundaryEvidenceReady, "UPSTREAM_BOUNDARY_EVIDENCE_NOT_READY", "upstream-boundary-evidence", "production-readiness-summary-v4", "Java operator auth and mini-kv recovery boundary evidence must remain ready.");
  addCheckMessage(blockers, checks.authRehearsalProfileReady, "AUTH_REHEARSAL_PROFILE_INVALID", "auth-enforcement", "auth-enforcement-rehearsal", "Auth enforcement rehearsal profile must expose stable 401/403/200 samples.");
  addCheckMessage(blockers, checks.authEnforcementCurrentlyRejects, "AUTH_ENFORCEMENT_NOT_ENABLED", "auth-enforcement", "node-config", "ACCESS_GUARD_ENFORCEMENT_ENABLED is not enabled in the current runtime.");
  addCheckMessage(blockers, checks.signedCredentialAuthReady, "SIGNED_AUTH_MIDDLEWARE_MISSING", "auth-enforcement", "auth-enforcement-rehearsal", "Rehearsal headers are not signed credential authentication.");
  addCheckMessage(blockers, checks.auditRetentionIntegrityEvidenceReady, "AUDIT_RETENTION_INTEGRITY_NOT_READY", "audit-retention", "audit-retention-integrity-evidence", "Audit retention knobs and digest evidence must be configured and stable.");
  addCheckMessage(blockers, checks.managedAuditStoreReady, "MANAGED_AUDIT_STORE_MISSING", "audit-retention", "audit-retention-integrity-evidence", "Managed durable audit storage is still required before production operations.");
  addCheckMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "execution-safety", "node-config", "UPSTREAM_ACTIONS_ENABLED must remain false while production blockers exist.");
  addCheckMessage(blockers, checks.executionStillBlocked, "NODE_EXECUTION_NOT_BLOCKED", "execution-safety", "production-readiness-summary-v4", "Execution must remain blocked until auth and audit blockers are closed.");
  return blockers;
}

function collectWarnings(input: {
  authEnforcement: AuthEnforcementRehearsalProfile;
  auditRetentionIntegrity: AuditRetentionIntegrityEvidence;
}): ProductionReadinessV5Message[] {
  return [
    ...input.authEnforcement.warnings.map((message) => fromProfileMessage("auth-enforcement", "auth-enforcement-rehearsal", message)),
    ...input.auditRetentionIntegrity.warnings.map((message) => fromProfileMessage("audit-retention", "audit-retention-integrity-evidence", message)),
  ];
}

function collectRecommendations(): ProductionReadinessV5Message[] {
  return [
    {
      category: "auth-enforcement",
      code: "IMPLEMENT_REAL_AUTH_STACK",
      severity: "recommendation",
      source: "production-readiness-summary-v5",
      message: "Implement signed credential auth and bind it to access guard enforcement before production exposure.",
    },
    {
      category: "audit-retention",
      code: "PROMOTE_MANAGED_AUDIT_STORE",
      severity: "recommendation",
      source: "production-readiness-summary-v5",
      message: "Move from file audit rehearsal to managed audit storage with retention and restore tests.",
    },
    {
      category: "execution-safety",
      code: "KEEP_EXECUTION_BLOCKED",
      severity: "recommendation",
      source: "production-readiness-summary-v5",
      message: "Keep upstream actions disabled until auth and audit production blockers are closed in the same release window.",
    },
  ];
}

function createCategories(
  checks: ProductionReadinessSummaryV5["checks"],
  blockers: ProductionReadinessV5Message[],
  warnings: ProductionReadinessV5Message[],
  recommendations: ProductionReadinessV5Message[],
): ProductionReadinessV5Category[] {
  return [
    {
      id: "upstream-boundary-evidence",
      title: "Upstream boundary evidence",
      ready: checks.previousSummaryAvailable && checks.upstreamBoundaryEvidenceReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "upstream-boundary-evidence"),
      warningCount: countMessages(warnings, "upstream-boundary-evidence"),
      recommendationCount: countMessages(recommendations, "upstream-boundary-evidence"),
      evidenceEndpoints: [ENDPOINTS.productionReadinessSummaryV4Json],
      note: "Java and mini-kv boundary evidence remains read-only input for Node readiness decisions.",
    },
    {
      id: "auth-enforcement",
      title: "Auth enforcement",
      ready: checks.authRehearsalProfileReady && checks.authEnforcementCurrentlyRejects && checks.signedCredentialAuthReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "auth-enforcement"),
      warningCount: countMessages(warnings, "auth-enforcement"),
      recommendationCount: countMessages(recommendations, "auth-enforcement"),
      evidenceEndpoints: [ENDPOINTS.authEnforcementRehearsalJson],
      note: "Rehearsal enforcement can prove 401/403 behavior, but signed credential auth is still missing.",
    },
    {
      id: "audit-retention",
      title: "Audit retention",
      ready: checks.auditRetentionIntegrityEvidenceReady && checks.managedAuditStoreReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "audit-retention"),
      warningCount: countMessages(warnings, "audit-retention"),
      recommendationCount: countMessages(recommendations, "audit-retention"),
      evidenceEndpoints: [ENDPOINTS.auditRetentionIntegrityJson, ENDPOINTS.auditEventsJson],
      note: "Local file integrity evidence is stable, but managed audit storage remains required.",
    },
    {
      id: "execution-safety",
      title: "Execution safety",
      ready: checks.upstreamActionsStillDisabled && checks.executionStillBlocked,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "execution-safety"),
      warningCount: countMessages(warnings, "execution-safety"),
      recommendationCount: countMessages(recommendations, "execution-safety"),
      evidenceEndpoints: [ENDPOINTS.productionReadinessSummaryV5Json],
      note: "Node keeps upstream execution disabled while auth and audit blockers remain.",
    },
  ];
}

function addCheckMessage(
  messages: ProductionReadinessV5Message[],
  condition: boolean,
  code: string,
  category: ProductionReadinessV5CategoryId,
  source: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ category, code, severity: "blocker", source, message });
  }
}

function fromProfileMessage(
  category: ProductionReadinessV5CategoryId,
  source: string,
  message: { code: string; severity: "blocker" | "warning" | "recommendation"; message: string },
): ProductionReadinessV5Message {
  return {
    category,
    source,
    code: message.code,
    severity: message.severity,
    message: message.message,
  };
}

function countMessages(messages: ProductionReadinessV5Message[], category: ProductionReadinessV5CategoryId): number {
  return messages.filter((message) => message.category === category).length;
}

function renderCategory(category: ProductionReadinessV5Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Title: ${category.title}`,
    `- Ready: ${category.ready}`,
    `- Read only: ${category.readOnly}`,
    `- Execution allowed: ${category.executionAllowed}`,
    `- Blocker count: ${category.blockerCount}`,
    `- Warning count: ${category.warningCount}`,
    `- Recommendation count: ${category.recommendationCount}`,
    `- Evidence endpoints: ${category.evidenceEndpoints.join(", ")}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV5Message[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.category}, ${message.source}): ${message.message}`);
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
