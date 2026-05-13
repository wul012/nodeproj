import type { AppConfig } from "../config.js";
import type { AuditLog } from "./auditLog.js";
import {
  createAuditRetentionIntegrityEvidence,
  type AuditRetentionIntegrityEvidence,
} from "./auditRetentionIntegrityEvidence.js";
import type { AuditStoreRuntimeDescription } from "./auditStoreFactory.js";
import {
  createManagedAuditStoreContractProfile,
  type ManagedAuditStoreContractProfile,
} from "./managedAuditStoreContract.js";

export interface ManagedAuditReadinessSummary {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "managed-audit-readiness-summary.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    requestedStoreKind: string;
    runtimeStoreKind: "memory" | "file";
    durableAtRuntime: boolean;
    auditStoreUrlConfigured: boolean;
    realManagedAdapterConnected: false;
    fakeAdapterUsed: true;
    fileAuditStillRehearsal: true;
  };
  evidenceInputs: {
    managedAuditStoreContractVersion: "managed-audit-store-contract.v1";
    auditRetentionIntegrityEvidenceVersion: "audit-retention-integrity-evidence.v1";
    managedCapabilityCount: number;
    fileAuditEventCount: number;
  };
  checks: {
    fakeAdapterCapabilitiesCovered: boolean;
    fileAuditRuntimeSelected: boolean;
    fileAuditIntegrityStable: boolean;
    retentionKnobsConfigured: boolean;
    backupRotationConfigured: boolean;
    managedStoreUrlConfigured: boolean;
    realManagedAdapterConnected: boolean;
    localEvidenceReadyForAdapterWork: boolean;
    readyForProductionAudit: false;
  };
  implementationChecklist: ManagedAuditImplementationStep[];
  summary: {
    completedChecklistCount: number;
    pendingChecklistCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManagedAuditReadinessMessage[];
  warnings: ManagedAuditReadinessMessage[];
  recommendations: ManagedAuditReadinessMessage[];
  evidenceEndpoints: {
    managedAuditReadinessSummaryJson: string;
    managedAuditReadinessSummaryMarkdown: string;
    managedAuditStoreContractJson: string;
    auditRetentionIntegrityJson: string;
    auditStoreRuntimeProfileJson: string;
  };
  nextActions: string[];
}

export interface ManagedAuditImplementationStep {
  id:
    | "adapter-contract-covered"
    | "file-audit-evidence-stable"
    | "managed-store-url-configured"
    | "real-managed-adapter-implemented"
    | "backup-restore-drill-implemented";
  title: string;
  status: "complete" | "pending";
  evidence: string;
}

export interface ManagedAuditReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditReadinessSummaryJson: "/api/v1/audit/managed-readiness-summary",
  managedAuditReadinessSummaryMarkdown: "/api/v1/audit/managed-readiness-summary?format=markdown",
  managedAuditStoreContractJson: "/api/v1/audit/managed-store-contract",
  auditRetentionIntegrityJson: "/api/v1/audit/retention-integrity-evidence",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
});

export function createManagedAuditReadinessSummary(input: {
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
  >;
  runtime: AuditStoreRuntimeDescription;
  auditLog: AuditLog;
}): ManagedAuditReadinessSummary {
  const managedContract = createManagedAuditStoreContractProfile(input.config);
  const retentionEvidence = createAuditRetentionIntegrityEvidence({
    config: input.config,
    runtime: input.runtime,
    auditLog: input.auditLog,
  });
  const checks = createChecks(input.config, input.runtime, managedContract, retentionEvidence);
  const implementationChecklist = createImplementationChecklist(checks);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(input.runtime);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit readiness summary",
    generatedAt: new Date().toISOString(),
    summaryVersion: "managed-audit-readiness-summary.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      requestedStoreKind: input.config.auditStoreKind,
      runtimeStoreKind: input.runtime.runtimeStoreKind,
      durableAtRuntime: input.runtime.durableAtRuntime,
      auditStoreUrlConfigured: input.config.auditStoreUrl.length > 0,
      realManagedAdapterConnected: false,
      fakeAdapterUsed: true,
      fileAuditStillRehearsal: true,
    },
    evidenceInputs: {
      managedAuditStoreContractVersion: managedContract.profileVersion,
      auditRetentionIntegrityEvidenceVersion: retentionEvidence.evidenceVersion,
      managedCapabilityCount: managedContract.summary.capabilityCount,
      fileAuditEventCount: retentionEvidence.integrity.eventCount,
    },
    checks,
    implementationChecklist,
    summary: {
      completedChecklistCount: implementationChecklist.filter((step) => step.status === "complete").length,
      pendingChecklistCount: implementationChecklist.filter((step) => step.status === "pending").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Implement a real managed audit adapter after the fake adapter contract remains stable.",
      "Keep file-backed audit evidence as local rehearsal input until backup/restore drills exist.",
      "Feed this summary into production readiness summary v6 before changing execution safety flags.",
    ],
  };
}

export function renderManagedAuditReadinessSummaryMarkdown(summary: ManagedAuditReadinessSummary): string {
  return [
    "# Managed audit readiness summary",
    "",
    `- Service: ${summary.service}`,
    `- Generated at: ${summary.generatedAt}`,
    `- Summary version: ${summary.summaryVersion}`,
    `- Ready for production audit: ${summary.readyForProductionAudit}`,
    `- Read only: ${summary.readOnly}`,
    `- Execution allowed: ${summary.executionAllowed}`,
    "",
    "## Runtime",
    "",
    ...renderEntries(summary.runtime),
    "",
    "## Evidence Inputs",
    "",
    ...renderEntries(summary.evidenceInputs),
    "",
    "## Checks",
    "",
    ...renderEntries(summary.checks),
    "",
    "## Implementation Checklist",
    "",
    ...summary.implementationChecklist.flatMap(renderImplementationStep),
    "## Summary",
    "",
    ...renderEntries(summary.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(summary.productionBlockers, "No managed audit readiness blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(summary.warnings, "No managed audit readiness warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(summary.recommendations, "No managed audit readiness recommendations."),
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

function createChecks(
  config: Pick<AppConfig, "auditStoreUrl" | "auditRetentionDays" | "auditMaxFileBytes" | "auditRotationEnabled" | "auditBackupEnabled">,
  runtime: AuditStoreRuntimeDescription,
  managedContract: ManagedAuditStoreContractProfile,
  retentionEvidence: AuditRetentionIntegrityEvidence,
): ManagedAuditReadinessSummary["checks"] {
  const fakeAdapterCapabilitiesCovered = managedContract.summary.coveredCapabilityCount === managedContract.summary.capabilityCount
    && managedContract.checks.appendOnlyWriteCovered
    && managedContract.checks.queryByRequestIdCovered
    && managedContract.checks.digestVerificationCovered;
  const retentionKnobsConfigured = config.auditRetentionDays > 0 && config.auditMaxFileBytes > 0;
  const backupRotationConfigured = config.auditRotationEnabled && config.auditBackupEnabled;
  const fileAuditRuntimeSelected = runtime.runtimeStoreKind === "file";
  const fileAuditIntegrityStable = retentionEvidence.checks.integrityDigestStable;
  const managedStoreUrlConfigured = config.auditStoreUrl.length > 0;
  const realManagedAdapterConnected = false;

  return {
    fakeAdapterCapabilitiesCovered,
    fileAuditRuntimeSelected,
    fileAuditIntegrityStable,
    retentionKnobsConfigured,
    backupRotationConfigured,
    managedStoreUrlConfigured,
    realManagedAdapterConnected,
    localEvidenceReadyForAdapterWork: fakeAdapterCapabilitiesCovered
      && fileAuditIntegrityStable
      && retentionKnobsConfigured
      && backupRotationConfigured
      && managedStoreUrlConfigured,
    readyForProductionAudit: false,
  };
}

function createImplementationChecklist(
  checks: ManagedAuditReadinessSummary["checks"],
): ManagedAuditImplementationStep[] {
  return [
    {
      id: "adapter-contract-covered",
      title: "Fake adapter covers append, query, digest, retention, and backup marker contract.",
      status: checks.fakeAdapterCapabilitiesCovered ? "complete" : "pending",
      evidence: "managed-audit-store-contract",
    },
    {
      id: "file-audit-evidence-stable",
      title: "File audit digest and retention evidence are stable enough to guide adapter work.",
      status: checks.fileAuditRuntimeSelected && checks.fileAuditIntegrityStable && checks.retentionKnobsConfigured && checks.backupRotationConfigured ? "complete" : "pending",
      evidence: "audit-retention-integrity-evidence",
    },
    {
      id: "managed-store-url-configured",
      title: "Managed audit target URL is configured for future adapter wiring.",
      status: checks.managedStoreUrlConfigured ? "complete" : "pending",
      evidence: "AUDIT_STORE_URL",
    },
    {
      id: "real-managed-adapter-implemented",
      title: "Real managed audit adapter is implemented and selected at runtime.",
      status: checks.realManagedAdapterConnected ? "complete" : "pending",
      evidence: "future-managed-audit-adapter",
    },
    {
      id: "backup-restore-drill-implemented",
      title: "Backup and restore drill is implemented against the managed adapter.",
      status: "pending",
      evidence: "future-backup-restore-drill",
    },
  ];
}

function collectProductionBlockers(
  checks: ManagedAuditReadinessSummary["checks"],
): ManagedAuditReadinessMessage[] {
  const blockers: ManagedAuditReadinessMessage[] = [];
  addMessage(blockers, checks.fakeAdapterCapabilitiesCovered, "MANAGED_AUDIT_CONTRACT_INCOMPLETE", "Managed audit fake adapter contract must cover required capabilities before adapter work.");
  addMessage(blockers, checks.fileAuditIntegrityStable, "FILE_AUDIT_INTEGRITY_UNSTABLE", "File audit digest evidence must remain stable before adapter migration planning.");
  addMessage(blockers, checks.retentionKnobsConfigured, "AUDIT_RETENTION_KNOBS_MISSING", "Audit retention days and max file bytes must be configured.");
  addMessage(blockers, checks.backupRotationConfigured, "AUDIT_BACKUP_ROTATION_MISSING", "Audit rotation and backup flags must be configured.");
  addMessage(blockers, checks.managedStoreUrlConfigured, "MANAGED_AUDIT_STORE_URL_MISSING", "AUDIT_STORE_URL is required before a real managed audit adapter can be wired.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A real managed audit adapter is still required before production audit readiness.");
  return blockers;
}

function collectWarnings(runtime: AuditStoreRuntimeDescription): ManagedAuditReadinessMessage[] {
  return [
    {
      code: runtime.runtimeStoreKind === "file" ? "FILE_AUDIT_REHEARSAL_ONLY" : "MEMORY_AUDIT_REHEARSAL_ONLY",
      severity: "warning",
      message: runtime.runtimeStoreKind === "file"
        ? "File audit evidence is durable local rehearsal evidence, not managed production audit storage."
        : "Memory audit runtime cannot provide durable audit storage for production operations.",
    },
  ];
}

function collectRecommendations(): ManagedAuditReadinessMessage[] {
  return [
    {
      code: "IMPLEMENT_MANAGED_AUDIT_ADAPTER",
      severity: "recommendation",
      message: "Add a database or managed audit service adapter with append-only writes and requestId lookup.",
    },
    {
      code: "ADD_MANAGED_BACKUP_RESTORE_DRILL",
      severity: "recommendation",
      message: "Add a backup/restore drill against the managed adapter before production execution is considered.",
    },
  ];
}

function addMessage(
  messages: ManagedAuditReadinessMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderImplementationStep(step: ManagedAuditImplementationStep): string[] {
  return [
    `### ${step.id}`,
    "",
    `- Title: ${step.title}`,
    `- Status: ${step.status}`,
    `- Evidence: ${step.evidence}`,
    "",
  ];
}

function renderMessages(messages: ManagedAuditReadinessMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
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
