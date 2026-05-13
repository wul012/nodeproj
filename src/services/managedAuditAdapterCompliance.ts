import { createHash, randomUUID } from "node:crypto";

import type { AppConfig } from "../config.js";
import type { ManagedAuditAdapter } from "./managedAuditAdapterBoundary.js";

export interface ManagedAuditAdapterComplianceProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-compliance.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  harness: {
    adapterName: "InMemoryComplianceAuditAdapter";
    targetInterface: "ManagedAuditAdapter";
    realManagedAdapterConnected: false;
    realDatabaseConnectionAttempted: false;
    auditFileMigrationPerformed: false;
    upstreamActionsEnabled: boolean;
  };
  sampleEvidence: {
    requestId: string;
    appendedEventId: string;
    digestBefore: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    queryByRequestIdCount: number;
    appendOnlyCountAfterWrite: number;
    backupRestoreMarker: string;
  };
  complianceSteps: ManagedAuditComplianceStep[];
  checks: {
    adapterInterfaceExercised: boolean;
    appendOnlyWriteCovered: boolean;
    queryByRequestIdCovered: boolean;
    digestStableAfterRepeatRead: boolean;
    backupRestoreMarkerCovered: boolean;
    noDatabaseConnectionAttempted: boolean;
    noAuditFileMigrationPerformed: boolean;
    realManagedAdapterConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    complianceStepCount: number;
    passedComplianceStepCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManagedAuditAdapterComplianceMessage[];
  warnings: ManagedAuditAdapterComplianceMessage[];
  recommendations: ManagedAuditAdapterComplianceMessage[];
  evidenceEndpoints: {
    managedAuditAdapterComplianceJson: string;
    managedAuditAdapterComplianceMarkdown: string;
    managedAuditAdapterBoundaryJson: string;
    managedAuditReadinessSummaryJson: string;
    productionReadinessSummaryV7Json: string;
  };
  nextActions: string[];
}

export interface ManagedAuditComplianceStep {
  id: "append-only-write" | "query-by-request-id" | "digest-stability" | "backup-restore-marker";
  method: keyof ManagedAuditAdapter;
  passed: boolean;
  evidence: string;
}

export interface ManagedAuditAdapterComplianceMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

interface ComplianceAuditEvent {
  id: string;
  requestId: string;
  action: "COMPLIANCE_APPEND_ONLY_WRITE";
  operatorId: "managed-audit-compliance";
  occurredAt: string;
}

const ENDPOINTS = Object.freeze({
  managedAuditAdapterComplianceJson: "/api/v1/audit/managed-adapter-compliance",
  managedAuditAdapterComplianceMarkdown: "/api/v1/audit/managed-adapter-compliance?format=markdown",
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  managedAuditReadinessSummaryJson: "/api/v1/audit/managed-readiness-summary",
  productionReadinessSummaryV7Json: "/api/v1/production/readiness-summary-v7",
});

export async function createManagedAuditAdapterComplianceProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): Promise<ManagedAuditAdapterComplianceProfile> {
  const adapter = new InMemoryComplianceAuditAdapter();
  const digestBefore = await adapter.digest();
  const event = createComplianceEvent();
  await adapter.appendOnlyWrite(event);
  const digestAfterAppend = await adapter.digest();
  const queried = await adapter.queryByRequestId(event.requestId);
  const digestAfterRepeatRead = await adapter.digest();
  const backupRestoreMarker = await adapter.backupRestoreMarker();
  const sampleEvidence = {
    requestId: event.requestId,
    appendedEventId: event.id,
    digestBefore,
    digestAfterAppend,
    digestAfterRepeatRead,
    queryByRequestIdCount: queried.length,
    appendOnlyCountAfterWrite: adapter.size(),
    backupRestoreMarker,
  };
  const checks = {
    adapterInterfaceExercised: true,
    appendOnlyWriteCovered: sampleEvidence.appendOnlyCountAfterWrite === 1 && digestBefore !== digestAfterAppend,
    queryByRequestIdCovered: queried.length === 1 && queried[0]?.id === event.id,
    digestStableAfterRepeatRead: digestAfterAppend === digestAfterRepeatRead && digestAfterAppend.startsWith("sha256:"),
    backupRestoreMarkerCovered: backupRestoreMarker.startsWith("backup-restore-marker:"),
    noDatabaseConnectionAttempted: true,
    noAuditFileMigrationPerformed: true,
    realManagedAdapterConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const complianceSteps = createComplianceSteps(checks, sampleEvidence);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit adapter compliance",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-adapter-compliance.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    harness: {
      adapterName: "InMemoryComplianceAuditAdapter",
      targetInterface: "ManagedAuditAdapter",
      realManagedAdapterConnected: false,
      realDatabaseConnectionAttempted: false,
      auditFileMigrationPerformed: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    sampleEvidence,
    complianceSteps,
    checks,
    summary: {
      complianceStepCount: complianceSteps.length,
      passedComplianceStepCount: complianceSteps.filter((step) => step.passed).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Run this compliance harness against a real managed adapter implementation in a dedicated version.",
      "Keep the harness read-only and avoid migrating local audit files during compliance rehearsal.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until the real managed adapter passes compliance and backup drills.",
    ],
  };
}

export function renderManagedAuditAdapterComplianceMarkdown(profile: ManagedAuditAdapterComplianceProfile): string {
  return [
    "# Managed audit adapter compliance",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Harness",
    "",
    ...renderEntries(profile.harness),
    "",
    "## Sample Evidence",
    "",
    ...renderEntries(profile.sampleEvidence),
    "",
    "## Compliance Steps",
    "",
    ...profile.complianceSteps.flatMap(renderComplianceStep),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No managed audit adapter compliance blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit adapter compliance warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit adapter compliance recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

class InMemoryComplianceAuditAdapter implements ManagedAuditAdapter {
  private readonly events: ComplianceAuditEvent[] = [];

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isComplianceAuditEvent(event)) {
      throw new Error("Compliance audit event shape is invalid");
    }
    this.events.push(event);
  }

  async queryByRequestId(requestId: string): Promise<ComplianceAuditEvent[]> {
    return this.events.filter((event) => event.requestId === requestId);
  }

  async digest(): Promise<string> {
    return `sha256:${createHash("sha256").update(JSON.stringify(this.events)).digest("hex")}`;
  }

  async backupRestoreMarker(): Promise<string> {
    const digest = await this.digest();
    return `backup-restore-marker:${digest.slice("sha256:".length, "sha256:".length + 16)}`;
  }

  size(): number {
    return this.events.length;
  }
}

function createComplianceEvent(): ComplianceAuditEvent {
  return {
    id: randomUUID(),
    requestId: "managed-audit-compliance-request",
    action: "COMPLIANCE_APPEND_ONLY_WRITE",
    operatorId: "managed-audit-compliance",
    occurredAt: new Date().toISOString(),
  };
}

function createComplianceSteps(
  checks: ManagedAuditAdapterComplianceProfile["checks"],
  evidence: ManagedAuditAdapterComplianceProfile["sampleEvidence"],
): ManagedAuditComplianceStep[] {
  return [
    {
      id: "append-only-write",
      method: "appendOnlyWrite",
      passed: checks.appendOnlyWriteCovered,
      evidence: `appendOnlyCountAfterWrite=${evidence.appendOnlyCountAfterWrite}`,
    },
    {
      id: "query-by-request-id",
      method: "queryByRequestId",
      passed: checks.queryByRequestIdCovered,
      evidence: `queryByRequestIdCount=${evidence.queryByRequestIdCount}`,
    },
    {
      id: "digest-stability",
      method: "digest",
      passed: checks.digestStableAfterRepeatRead,
      evidence: `digestAfterAppend=${evidence.digestAfterAppend}`,
    },
    {
      id: "backup-restore-marker",
      method: "backupRestoreMarker",
      passed: checks.backupRestoreMarkerCovered,
      evidence: evidence.backupRestoreMarker,
    },
  ];
}

function collectProductionBlockers(
  checks: ManagedAuditAdapterComplianceProfile["checks"],
): ManagedAuditAdapterComplianceMessage[] {
  const blockers: ManagedAuditAdapterComplianceMessage[] = [];
  addMessage(blockers, checks.adapterInterfaceExercised, "ADAPTER_INTERFACE_NOT_EXERCISED", "ManagedAuditAdapter interface must be exercised by the compliance harness.");
  addMessage(blockers, checks.appendOnlyWriteCovered, "APPEND_ONLY_COMPLIANCE_FAILED", "appendOnlyWrite compliance step must pass.");
  addMessage(blockers, checks.queryByRequestIdCovered, "REQUEST_QUERY_COMPLIANCE_FAILED", "queryByRequestId compliance step must pass.");
  addMessage(blockers, checks.digestStableAfterRepeatRead, "DIGEST_COMPLIANCE_FAILED", "digest compliance step must remain stable after repeat reads.");
  addMessage(blockers, checks.backupRestoreMarkerCovered, "BACKUP_RESTORE_MARKER_COMPLIANCE_FAILED", "backupRestoreMarker compliance step must pass.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "Compliance currently runs against a local adapter; a real managed adapter is still missing.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while managed audit is not production-ready.");
  return blockers;
}

function collectWarnings(): ManagedAuditAdapterComplianceMessage[] {
  return [
    {
      code: "LOCAL_COMPLIANCE_ADAPTER_ONLY",
      severity: "warning",
      message: "Compliance harness proves the adapter contract against a local adapter only; production storage is not connected.",
    },
  ];
}

function collectRecommendations(): ManagedAuditAdapterComplianceMessage[] {
  return [
    {
      code: "RUN_HARNESS_AGAINST_REAL_ADAPTER",
      severity: "recommendation",
      message: "After a real managed audit adapter exists, run the same harness against it before production readiness.",
    },
    {
      code: "ADD_BACKUP_RESTORE_DRILL_ASSERTIONS",
      severity: "recommendation",
      message: "Extend compliance from marker generation to an actual backup/restore drill before production.",
    },
  ];
}

function isComplianceAuditEvent(value: unknown): value is ComplianceAuditEvent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const event = value as Record<string, unknown>;
  return typeof event.id === "string"
    && typeof event.requestId === "string"
    && event.action === "COMPLIANCE_APPEND_ONLY_WRITE"
    && event.operatorId === "managed-audit-compliance"
    && typeof event.occurredAt === "string";
}

function addMessage(
  messages: ManagedAuditAdapterComplianceMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderComplianceStep(step: ManagedAuditComplianceStep): string[] {
  return [
    `### ${step.id}`,
    "",
    `- Method: ${step.method}`,
    `- Passed: ${step.passed}`,
    `- Evidence: ${step.evidence}`,
    "",
  ];
}

function renderMessages(messages: ManagedAuditAdapterComplianceMessage[], emptyText: string): string[] {
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
