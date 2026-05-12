import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";
import {
  createAccessControlReadinessProfile,
  type AccessControlReadinessProfile,
} from "./accessControlReadinessProfile.js";
import {
  createAuditStoreEnvConfigProfile,
  type AuditStoreEnvConfigProfile,
} from "./auditStoreEnvConfigProfile.js";
import {
  createAuditStoreRuntimeProfile,
  type AuditStoreRuntimeProfile,
} from "./auditStoreRuntimeProfile.js";
import {
  loadProductionReadinessSummaryIndex,
  type ProductionReadinessSummaryIndex,
} from "./productionReadinessSummaryIndex.js";
import {
  loadUpstreamProductionEvidenceIntake,
  type UpstreamProductionEvidenceIntake,
} from "./upstreamProductionEvidenceIntake.js";

export type ProductionReadinessV2CategoryId =
  | "upstream-observability"
  | "audit"
  | "access-control"
  | "execution-safety";

export interface ProductionReadinessSummaryV2 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v2";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    baseSummaryAvailable: boolean;
    upstreamEvidenceIntakeValid: boolean;
    javaReplayAuditEvidenceTraceable: boolean;
    javaReplayBlockedEvidenceStillBlocked: boolean;
    miniKvRestartRecoveryEvidenceReady: boolean;
    auditStoreRuntimeProductionReady: boolean;
    auditStoreEnvConfigReady: boolean;
    accessControlProductionReady: boolean;
    executionStillBlocked: boolean;
    categorizedProductionBlockersPresent: boolean;
  };
  summary: {
    categoryCount: number;
    readyCategoryCount: number;
    notReadyCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    upstreamEvidenceSourceCount: number;
    upstreamEvidenceReady: boolean;
  };
  upstreamEvidence: {
    javaReplayAudit: {
      approvedSource: EvidenceSource;
      blockedSource: EvidenceSource;
      approvedScenario?: string;
      blockedScenario?: string;
      approvedAuditTrailCount: number;
      blockedAuditTrailCount: number;
      approvedAttemptStatus?: string;
      blockedAttemptStatus?: string;
      blockedBy: string[];
    };
    miniKvRestartRecovery: {
      source: EvidenceSource;
      evidenceVersion?: string;
      recovered?: boolean;
      digestsMatch?: boolean;
      beforeKeyCount?: number;
      afterKeyCount?: number;
      walAppliedRecords?: number;
      diagnosticNotes: string[];
    };
  };
  categories: ProductionReadinessV2Category[];
  productionBlockers: ProductionReadinessV2Message[];
  warnings: ProductionReadinessV2Message[];
  recommendations: ProductionReadinessV2Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV2Json: string;
    productionReadinessSummaryV2Markdown: string;
    productionReadinessSummaryJson: string;
    upstreamProductionEvidenceIntakeJson: string;
    auditStoreRuntimeProfileJson: string;
    auditStoreEnvConfigProfileJson: string;
    accessControlReadinessJson: string;
    javaReplayAuditApprovedEvidence: string;
    javaReplayAuditBlockedEvidence: string;
    miniKvRestartRecoveryEvidence: string;
  };
  nextActions: string[];
}

export interface ProductionReadinessV2Category {
  id: ProductionReadinessV2CategoryId;
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

export interface ProductionReadinessV2Message {
  category: ProductionReadinessV2CategoryId;
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

export interface EvidenceSource {
  project: "java" | "mini-kv" | "node";
  path: string;
  status: "available" | "missing" | "invalid";
  message: string;
}

interface EvidenceDocument {
  source: EvidenceSource;
  data?: unknown;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV2Json: "/api/v1/production/readiness-summary-v2",
  productionReadinessSummaryV2Markdown: "/api/v1/production/readiness-summary-v2?format=markdown",
  productionReadinessSummaryJson: "/api/v1/production/readiness-summary",
  upstreamProductionEvidenceIntakeJson: "/api/v1/upstreams/production-evidence-intake",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
  auditStoreEnvConfigProfileJson: "/api/v1/audit/store-config-profile",
  accessControlReadinessJson: "/api/v1/security/access-control-readiness",
  javaReplayAuditApprovedEvidence: "/contracts/failed-event-replay-audit-approved.sample.json",
  javaReplayAuditBlockedEvidence: "/contracts/failed-event-replay-audit-blocked.sample.json",
  miniKvRestartRecoveryEvidence: "fixtures/recovery/restart-recovery-evidence.json",
});

export async function loadProductionReadinessSummaryV2(config: AppConfig): Promise<ProductionReadinessSummaryV2> {
  const [
    baseSummary,
    upstreamEvidenceIntake,
    javaReplayAuditApproved,
    javaReplayAuditBlocked,
    miniKvRestartRecovery,
  ] = await Promise.all([
    loadProductionReadinessSummaryIndex(config),
    loadUpstreamProductionEvidenceIntake(config),
    readJsonEvidence(config.javaReplayAuditApprovedFixturePath, "java"),
    readJsonEvidence(config.javaReplayAuditBlockedFixturePath, "java"),
    readJsonEvidence(config.miniKvRestartRecoveryEvidenceFixturePath, "mini-kv"),
  ]);

  return createProductionReadinessSummaryV2({
    config,
    baseSummary,
    upstreamEvidenceIntake,
    auditStoreRuntimeProfile: createAuditStoreRuntimeProfile(),
    auditStoreEnvConfigProfile: createAuditStoreEnvConfigProfile(config),
    accessControlReadinessProfile: createAccessControlReadinessProfile(config),
    javaReplayAuditApproved,
    javaReplayAuditBlocked,
    miniKvRestartRecovery,
  });
}

export function createProductionReadinessSummaryV2(input: {
  config: Pick<AppConfig, "upstreamActionsEnabled">;
  baseSummary: ProductionReadinessSummaryIndex;
  upstreamEvidenceIntake: UpstreamProductionEvidenceIntake;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
  accessControlReadinessProfile: AccessControlReadinessProfile;
  javaReplayAuditApproved: EvidenceDocument;
  javaReplayAuditBlocked: EvidenceDocument;
  miniKvRestartRecovery: EvidenceDocument;
}): ProductionReadinessSummaryV2 {
  const approved = asRecord(input.javaReplayAuditApproved.data);
  const blocked = asRecord(input.javaReplayAuditBlocked.data);
  const recovery = asRecord(input.miniKvRestartRecovery.data);
  const approvedAuditTrail = readRecordArray(approved.auditTrail);
  const blockedAuditTrail = readRecordArray(blocked.auditTrail);
  const blockedBy = readStringArray(blocked.blockedBy);
  const checks = {
    baseSummaryAvailable: input.baseSummary.service === "orderops-node",
    upstreamEvidenceIntakeValid: input.upstreamEvidenceIntake.valid,
    javaReplayAuditEvidenceTraceable: isJavaApprovedAuditTraceable(input.javaReplayAuditApproved.source, approved, approvedAuditTrail),
    javaReplayBlockedEvidenceStillBlocked: isJavaBlockedAuditStillBlocked(input.javaReplayAuditBlocked.source, blocked, blockedBy),
    miniKvRestartRecoveryEvidenceReady: isMiniKvRecoveryReady(input.miniKvRestartRecovery.source, recovery),
    auditStoreRuntimeProductionReady: input.auditStoreRuntimeProfile.readyForProductionAudit,
    auditStoreEnvConfigReady: input.auditStoreEnvConfigProfile.readyForDurableAuditMigration,
    accessControlProductionReady: input.accessControlReadinessProfile.readyForProductionAccessControl,
    executionStillBlocked: input.baseSummary.checks.executionStillBlocked
      && input.upstreamEvidenceIntake.checks.executionStillBlocked
      && input.config.upstreamActionsEnabled === false,
    categorizedProductionBlockersPresent: false,
  };
  const productionBlockers = collectProductionBlockers(input, checks);
  checks.categorizedProductionBlockersPresent = productionBlockers.length > 0;
  const warnings = collectWarnings(input);
  const recommendations = collectRecommendations(input);
  const categories = createCategories(checks, productionBlockers, warnings, recommendations);
  const upstreamEvidenceReady = categories.find((category) => category.id === "upstream-observability")?.ready ?? false;

  return {
    service: "orderops-node",
    title: "Production readiness summary v2",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v2",
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
      upstreamEvidenceSourceCount: 5,
      upstreamEvidenceReady,
    },
    upstreamEvidence: {
      javaReplayAudit: {
        approvedSource: input.javaReplayAuditApproved.source,
        blockedSource: input.javaReplayAuditBlocked.source,
        approvedScenario: readString(approved, "scenario"),
        blockedScenario: readString(blocked, "scenario"),
        approvedAuditTrailCount: approvedAuditTrail.length,
        blockedAuditTrailCount: blockedAuditTrail.length,
        approvedAttemptStatus: readString(readRecord(approved, "execution"), "attemptStatus"),
        blockedAttemptStatus: readString(readRecord(blocked, "execution"), "attemptStatus"),
        blockedBy,
      },
      miniKvRestartRecovery: {
        source: input.miniKvRestartRecovery.source,
        evidenceVersion: readString(recovery, "evidence_version"),
        recovered: readBoolean(recovery, "recovered"),
        digestsMatch: readBoolean(recovery, "digests_match"),
        beforeKeyCount: readNumber(readRecord(recovery, "before"), "key_count"),
        afterKeyCount: readNumber(readRecord(recovery, "after"), "key_count"),
        walAppliedRecords: readNumber(readRecord(readRecord(recovery, "wal"), "replay"), "applied_records"),
        diagnosticNotes: readStringArray(readRecord(recovery, "diagnostics").notes),
      },
    },
    categories,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(productionBlockers.length),
  };
}

export function renderProductionReadinessSummaryV2Markdown(summary: ProductionReadinessSummaryV2): string {
  return [
    "# Production readiness summary v2",
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
    "## Categories",
    "",
    ...summary.categories.flatMap(renderCategory),
    "## Upstream Evidence",
    "",
    ...renderEntries(summary.upstreamEvidence.javaReplayAudit, "javaReplayAudit"),
    ...renderEntries(summary.upstreamEvidence.miniKvRestartRecovery, "miniKvRestartRecovery"),
    "",
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

async function readJsonEvidence(filePath: string, project: EvidenceSource["project"]): Promise<EvidenceDocument> {
  try {
    const data: unknown = JSON.parse(await readFile(filePath, "utf8"));
    if (!isRecord(data)) {
      return {
        data,
        source: {
          project,
          path: filePath,
          status: "invalid",
          message: "Evidence fixture is not a JSON object.",
        },
      };
    }

    return {
      data,
      source: {
        project,
        path: filePath,
        status: "available",
        message: "Evidence fixture was read and parsed.",
      },
    };
  } catch (error) {
    return {
      source: {
        project,
        path: filePath,
        status: "missing",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

function isJavaApprovedAuditTraceable(
  source: EvidenceSource,
  approved: Record<string, unknown>,
  auditTrail: Record<string, unknown>[],
): boolean {
  return source.status === "available"
    && readString(approved, "auditEvidenceVersion") === "failed-event-replay-audit-evidence.v1"
    && readString(approved, "scenario") === "APPROVED_REPLAY_AUDIT"
    && readString(approved, "requestId") !== undefined
    && readString(approved, "decisionId") !== undefined
    && readString(readRecord(approved, "operator"), "operatorId") !== undefined
    && readString(readRecord(approved, "approval"), "approvalStatus") === "APPROVED"
    && readString(readRecord(approved, "execution"), "attemptStatus") === "SUCCEEDED"
    && auditTrail.length >= 3;
}

function isJavaBlockedAuditStillBlocked(
  source: EvidenceSource,
  blocked: Record<string, unknown>,
  blockedBy: string[],
): boolean {
  return source.status === "available"
    && readString(blocked, "auditEvidenceVersion") === "failed-event-replay-audit-evidence.v1"
    && readString(blocked, "scenario") === "BLOCKED_REPLAY_AUDIT"
    && readBoolean(blocked, "dryRun") === true
    && readBoolean(blocked, "executionAllowed") === false
    && readString(readRecord(blocked, "execution"), "attemptStatus") === "NOT_ATTEMPTED"
    && blockedBy.includes("REPLAY_APPROVAL_NOT_APPROVED");
}

function isMiniKvRecoveryReady(source: EvidenceSource, recovery: Record<string, unknown>): boolean {
  return source.status === "available"
    && readString(recovery, "evidence_version") === "mini-kv-restart-recovery.v1"
    && readBoolean(recovery, "read_only") === true
    && readBoolean(recovery, "execution_allowed") === false
    && readBoolean(recovery, "recovered") === true
    && readBoolean(recovery, "digests_match") === true
    && readBoolean(readRecord(recovery, "diagnostics"), "order_authoritative") === false
    && readBoolean(readRecord(recovery, "diagnostics"), "write_commands_executed_by_evidence") === false;
}

function collectProductionBlockers(
  input: {
    upstreamEvidenceIntake: UpstreamProductionEvidenceIntake;
    auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
    auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
    accessControlReadinessProfile: AccessControlReadinessProfile;
  },
  checks: ProductionReadinessSummaryV2["checks"],
): ProductionReadinessV2Message[] {
  const blockers: ProductionReadinessV2Message[] = [
    ...input.upstreamEvidenceIntake.productionBlockers.map((message) => ({
      category: "upstream-observability" as const,
      code: message.code,
      severity: "blocker" as const,
      source: `upstream-production-evidence-intake:${message.source}`,
      message: message.message,
    })),
    ...input.auditStoreRuntimeProfile.productionBlockers.map((message) => ({
      category: "audit" as const,
      code: message.code,
      severity: "blocker" as const,
      source: "audit-store-runtime-profile",
      message: message.message,
    })),
    ...input.auditStoreEnvConfigProfile.productionBlockers.map((message) => ({
      category: "audit" as const,
      code: message.code,
      severity: "blocker" as const,
      source: "audit-store-env-config-profile",
      message: message.message,
    })),
    ...input.accessControlReadinessProfile.productionBlockers.map((message) => ({
      category: "access-control" as const,
      code: message.code,
      severity: "blocker" as const,
      source: "access-control-readiness-profile",
      message: message.message,
    })),
  ];

  addCheckMessage(blockers, checks.baseSummaryAvailable, "BASE_SUMMARY_UNAVAILABLE", "execution-safety", "production-readiness-summary", "Base production readiness summary must be loadable.");
  addCheckMessage(blockers, checks.javaReplayAuditEvidenceTraceable, "JAVA_REPLAY_AUDIT_TRACE_MISSING", "upstream-observability", "java-replay-audit-evidence", "Java v46 approved replay audit evidence must be traceable.");
  addCheckMessage(blockers, checks.javaReplayBlockedEvidenceStillBlocked, "JAVA_REPLAY_BLOCKED_AUDIT_INVALID", "upstream-observability", "java-replay-audit-evidence", "Java v46 blocked replay audit evidence must prove execution remains blocked.");
  addCheckMessage(blockers, checks.miniKvRestartRecoveryEvidenceReady, "MINIKV_RESTART_RECOVERY_EVIDENCE_INVALID", "upstream-observability", "mini-kv-restart-recovery-evidence", "mini-kv v55 restart recovery evidence must prove recovery without order authority.");
  addCheckMessage(blockers, checks.executionStillBlocked, "NODE_EXECUTION_NOT_BLOCKED", "execution-safety", "node-config", "Node upstream actions must remain disabled while production blockers exist.");
  return blockers;
}

function collectWarnings(input: {
  upstreamEvidenceIntake: UpstreamProductionEvidenceIntake;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
  accessControlReadinessProfile: AccessControlReadinessProfile;
}): ProductionReadinessV2Message[] {
  return [
    ...input.upstreamEvidenceIntake.warnings.map((message) => ({
      category: "upstream-observability" as const,
      code: message.code,
      severity: "warning" as const,
      source: `upstream-production-evidence-intake:${message.source}`,
      message: message.message,
    })),
    ...input.auditStoreRuntimeProfile.warnings.map((message) => fromProfileMessage("audit", "audit-store-runtime-profile", message)),
    ...input.auditStoreEnvConfigProfile.warnings.map((message) => fromProfileMessage("audit", "audit-store-env-config-profile", message)),
    ...input.accessControlReadinessProfile.warnings.map((message) => fromProfileMessage("access-control", "access-control-readiness-profile", message)),
  ];
}

function collectRecommendations(input: {
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
  accessControlReadinessProfile: AccessControlReadinessProfile;
}): ProductionReadinessV2Message[] {
  return [
    ...input.auditStoreRuntimeProfile.recommendations.map((message) => fromProfileMessage("audit", "audit-store-runtime-profile", message)),
    ...input.auditStoreEnvConfigProfile.recommendations.map((message) => fromProfileMessage("audit", "audit-store-env-config-profile", message)),
    ...input.accessControlReadinessProfile.recommendations.map((message) => fromProfileMessage("access-control", "access-control-readiness-profile", message)),
    {
      category: "upstream-observability",
      code: "KEEP_UPSTREAM_EVIDENCE_VERSIONED",
      severity: "recommendation",
      source: "production-readiness-summary-v2",
      message: "Keep Java replay audit and mini-kv recovery evidence versioned before live probe windows.",
    },
  ];
}

function createCategories(
  checks: ProductionReadinessSummaryV2["checks"],
  blockers: ProductionReadinessV2Message[],
  warnings: ProductionReadinessV2Message[],
  recommendations: ProductionReadinessV2Message[],
): ProductionReadinessV2Category[] {
  return [
    {
      id: "upstream-observability",
      title: "Upstream observability",
      ready: checks.upstreamEvidenceIntakeValid
        && checks.javaReplayAuditEvidenceTraceable
        && checks.javaReplayBlockedEvidenceStillBlocked
        && checks.miniKvRestartRecoveryEvidenceReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "upstream-observability"),
      warningCount: countMessages(warnings, "upstream-observability"),
      recommendationCount: countMessages(recommendations, "upstream-observability"),
      evidenceEndpoints: [
        ENDPOINTS.upstreamProductionEvidenceIntakeJson,
        ENDPOINTS.javaReplayAuditApprovedEvidence,
        ENDPOINTS.javaReplayAuditBlockedEvidence,
        ENDPOINTS.miniKvRestartRecoveryEvidence,
      ],
      note: "Java v46 audit samples and mini-kv v55 recovery evidence are treated as read-only production evidence, not as execution permission.",
    },
    {
      id: "audit",
      title: "Audit durability and retention",
      ready: checks.auditStoreRuntimeProductionReady && checks.auditStoreEnvConfigReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "audit"),
      warningCount: countMessages(warnings, "audit"),
      recommendationCount: countMessages(recommendations, "audit"),
      evidenceEndpoints: [
        ENDPOINTS.auditStoreRuntimeProfileJson,
        ENDPOINTS.auditStoreEnvConfigProfileJson,
      ],
      note: "Audit evidence is visible, but production readiness remains blocked until durable runtime storage and retention policy exist.",
    },
    {
      id: "access-control",
      title: "Access control",
      ready: checks.accessControlProductionReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "access-control"),
      warningCount: countMessages(warnings, "access-control"),
      recommendationCount: countMessages(recommendations, "access-control"),
      evidenceEndpoints: [ENDPOINTS.accessControlReadinessJson],
      note: "Authentication, RBAC, operator identity, protected audit reads, and protected mutations are still production blockers.",
    },
    {
      id: "execution-safety",
      title: "Execution safety",
      ready: checks.baseSummaryAvailable && checks.executionStillBlocked,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "execution-safety"),
      warningCount: countMessages(warnings, "execution-safety"),
      recommendationCount: countMessages(recommendations, "execution-safety"),
      evidenceEndpoints: [ENDPOINTS.productionReadinessSummaryJson],
      note: "Node still refuses upstream execution by default while production blockers are categorized.",
    },
  ];
}

function collectNextActions(productionBlockerCount: number): string[] {
  if (productionBlockerCount === 0) {
    return [
      "Re-run this summary during a coordinated read-only live probe window.",
      "Keep upstream execution disabled until an access-controlled audit-backed execution version exists.",
    ];
  }

  return [
    "Treat upstream-observability as mostly ready evidence, but do not call the control plane production-ready yet.",
    "Implement durable audit runtime wiring and retention policy before real operations.",
    "Implement authentication, RBAC, operator identity, and protected audit reads before enabling upstream actions.",
  ];
}

function addCheckMessage(
  messages: ProductionReadinessV2Message[],
  condition: boolean,
  code: string,
  category: ProductionReadinessV2CategoryId,
  source: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ category, code, severity: "blocker", source, message });
  }
}

function fromProfileMessage(
  category: ProductionReadinessV2CategoryId,
  source: string,
  message: { code: string; severity: "blocker" | "warning" | "recommendation"; message: string },
): ProductionReadinessV2Message {
  return {
    category,
    source,
    code: message.code,
    severity: message.severity,
    message: message.message,
  };
}

function countMessages(messages: ProductionReadinessV2Message[], category: ProductionReadinessV2CategoryId): number {
  return messages.filter((message) => message.category === category).length;
}

function readRecord(record: Record<string, unknown>, field: string): Record<string, unknown> {
  const value = record[field];
  return isRecord(value) ? value : {};
}

function readString(record: Record<string, unknown>, field: string): string | undefined {
  const value = record[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumber(record: Record<string, unknown>, field: string): number | undefined {
  const value = record[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBoolean(record: Record<string, unknown>, field: string): boolean | undefined {
  const value = record[field];
  return typeof value === "boolean" ? value : undefined;
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function readRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isRecord) ? value : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function renderCategory(category: ProductionReadinessV2Category): string[] {
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

function renderMessages(messages: ProductionReadinessV2Message[], emptyText: string): string[] {
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
