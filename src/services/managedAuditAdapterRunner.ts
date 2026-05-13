import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { AppConfig } from "../config.js";
import type { ManagedAuditAdapter } from "./managedAuditAdapterBoundary.js";

export interface ManagedAuditAdapterRunnerProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-adapter-runner.v1";
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  runner: {
    targetInterface: "ManagedAuditAdapter";
    targetKinds: ["memory", "file-candidate"];
    realManagedAdapterConnected: false;
    realDatabaseConnectionAttempted: false;
    auditFileMigrationPerformed: false;
    upstreamActionsEnabled: boolean;
  };
  targetResults: ManagedAuditAdapterRunnerTargetResult[];
  checks: {
    memoryRunnerPasses: boolean;
    fileCandidateRunnerPasses: boolean;
    allRunnerTargetsPass: boolean;
    noDatabaseConnectionAttempted: boolean;
    noAuditFileMigrationPerformed: boolean;
    realManagedAdapterConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    targetCount: number;
    passedTargetCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ManagedAuditAdapterRunnerMessage[];
  warnings: ManagedAuditAdapterRunnerMessage[];
  recommendations: ManagedAuditAdapterRunnerMessage[];
  evidenceEndpoints: {
    managedAuditAdapterRunnerJson: string;
    managedAuditAdapterRunnerMarkdown: string;
    managedAuditAdapterComplianceJson: string;
    managedAuditAdapterBoundaryJson: string;
    productionReadinessSummaryV8Json: string;
  };
  nextActions: string[];
}

export interface ManagedAuditAdapterRunnerTargetResult {
  targetKind: "memory" | "file-candidate";
  adapterName: string;
  passed: boolean;
  temporaryFileUsed: boolean;
  temporaryFileCleanedUp: boolean;
  evidence: {
    requestId: string;
    appendedEventId: string;
    digestBefore: string;
    digestAfterAppend: string;
    digestAfterRepeatRead: string;
    queryByRequestIdCount: number;
    appendOnlyCountAfterWrite: number;
    backupRestoreMarker: string;
  };
  steps: ManagedAuditAdapterRunnerStep[];
}

export interface ManagedAuditAdapterRunnerStep {
  id: "append-only-write" | "query-by-request-id" | "digest-stability" | "backup-restore-marker";
  method: keyof ManagedAuditAdapter;
  passed: boolean;
  evidence: string;
}

export interface ManagedAuditAdapterRunnerMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

interface RunnerAuditEvent {
  id: string;
  requestId: string;
  action: "RUNNER_APPEND_ONLY_WRITE";
  operatorId: "managed-audit-runner";
  targetKind: "memory" | "file-candidate";
  occurredAt: string;
}

interface RunnerAdapter extends ManagedAuditAdapter {
  readonly adapterName: string;
  size(): Promise<number> | number;
}

const ENDPOINTS = Object.freeze({
  managedAuditAdapterRunnerJson: "/api/v1/audit/managed-adapter-runner",
  managedAuditAdapterRunnerMarkdown: "/api/v1/audit/managed-adapter-runner?format=markdown",
  managedAuditAdapterComplianceJson: "/api/v1/audit/managed-adapter-compliance",
  managedAuditAdapterBoundaryJson: "/api/v1/audit/managed-adapter-boundary",
  productionReadinessSummaryV8Json: "/api/v1/production/readiness-summary-v8",
});

export async function createManagedAuditAdapterRunnerProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): Promise<ManagedAuditAdapterRunnerProfile> {
  const targetResults = [
    await runMemoryTarget(),
    await runFileCandidateTarget(),
  ];
  const checks = {
    memoryRunnerPasses: targetPassed(targetResults, "memory"),
    fileCandidateRunnerPasses: targetPassed(targetResults, "file-candidate"),
    allRunnerTargetsPass: targetResults.every((target) => target.passed),
    noDatabaseConnectionAttempted: true,
    noAuditFileMigrationPerformed: true,
    realManagedAdapterConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit adapter harness runner",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-adapter-runner.v1",
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    runner: {
      targetInterface: "ManagedAuditAdapter",
      targetKinds: ["memory", "file-candidate"],
      realManagedAdapterConnected: false,
      realDatabaseConnectionAttempted: false,
      auditFileMigrationPerformed: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    targetResults,
    checks,
    summary: {
      targetCount: targetResults.length,
      passedTargetCount: targetResults.filter((target) => target.passed).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Add a real managed adapter target behind this runner in a dedicated version.",
      "Keep file-candidate runs isolated from the live audit file until migration and backup drills are explicit.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until a real managed adapter target passes the runner.",
    ],
  };
}

export function renderManagedAuditAdapterRunnerMarkdown(profile: ManagedAuditAdapterRunnerProfile): string {
  return [
    "# Managed audit adapter harness runner",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runner",
    "",
    ...renderEntries(profile.runner),
    "",
    "## Target Results",
    "",
    ...profile.targetResults.flatMap(renderTargetResult),
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
    ...renderMessages(profile.productionBlockers, "No managed audit adapter runner blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No managed audit adapter runner warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No managed audit adapter runner recommendations."),
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

class MemoryRunnerAuditAdapter implements RunnerAdapter {
  readonly adapterName = "MemoryRunnerAuditAdapter";
  private readonly events: RunnerAuditEvent[] = [];

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isRunnerAuditEvent(event)) {
      throw new Error("Runner audit event shape is invalid");
    }
    this.events.push(event);
  }

  async queryByRequestId(requestId: string): Promise<RunnerAuditEvent[]> {
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

class FileCandidateRunnerAuditAdapter implements RunnerAdapter {
  readonly adapterName = "FileCandidateRunnerAuditAdapter";

  constructor(private readonly filePath: string) {}

  async appendOnlyWrite(event: unknown): Promise<void> {
    if (!isRunnerAuditEvent(event)) {
      throw new Error("Runner audit event shape is invalid");
    }
    await appendFile(this.filePath, `${JSON.stringify(event)}\n`, "utf8");
  }

  async queryByRequestId(requestId: string): Promise<RunnerAuditEvent[]> {
    return (await this.readEvents()).filter((event) => event.requestId === requestId);
  }

  async digest(): Promise<string> {
    const content = await this.readContent();
    return `sha256:${createHash("sha256").update(content).digest("hex")}`;
  }

  async backupRestoreMarker(): Promise<string> {
    const digest = await this.digest();
    return `backup-restore-marker:${digest.slice("sha256:".length, "sha256:".length + 16)}`;
  }

  async size(): Promise<number> {
    return (await this.readEvents()).length;
  }

  private async readEvents(): Promise<RunnerAuditEvent[]> {
    const content = await this.readContent();
    return content
      .split(/\r?\n/)
      .filter((line) => line.length > 0)
      .map((line) => JSON.parse(line) as unknown)
      .filter(isRunnerAuditEvent);
  }

  private async readContent(): Promise<string> {
    try {
      return await readFile(this.filePath, "utf8");
    } catch (error) {
      if (isNotFoundError(error)) {
        return "";
      }
      throw error;
    }
  }
}

async function runMemoryTarget(): Promise<ManagedAuditAdapterRunnerTargetResult> {
  return runTarget({
    targetKind: "memory",
    adapter: new MemoryRunnerAuditAdapter(),
    temporaryFileUsed: false,
    temporaryFileCleanedUp: true,
  });
}

async function runFileCandidateTarget(): Promise<ManagedAuditAdapterRunnerTargetResult> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-audit-runner-"));
  try {
    return await runTarget({
      targetKind: "file-candidate",
      adapter: new FileCandidateRunnerAuditAdapter(path.join(directory, "audit-runner.jsonl")),
      temporaryFileUsed: true,
      temporaryFileCleanedUp: false,
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function runTarget(input: {
  targetKind: ManagedAuditAdapterRunnerTargetResult["targetKind"];
  adapter: RunnerAdapter;
  temporaryFileUsed: boolean;
  temporaryFileCleanedUp: boolean;
}): Promise<ManagedAuditAdapterRunnerTargetResult> {
  const digestBefore = await input.adapter.digest();
  const event = createRunnerEvent(input.targetKind);
  await input.adapter.appendOnlyWrite(event);
  const digestAfterAppend = await input.adapter.digest();
  const queried = await input.adapter.queryByRequestId(event.requestId);
  const digestAfterRepeatRead = await input.adapter.digest();
  const backupRestoreMarker = await input.adapter.backupRestoreMarker();
  const appendOnlyCountAfterWrite = await input.adapter.size();
  const evidence = {
    requestId: event.requestId,
    appendedEventId: event.id,
    digestBefore,
    digestAfterAppend,
    digestAfterRepeatRead,
    queryByRequestIdCount: queried.length,
    appendOnlyCountAfterWrite,
    backupRestoreMarker,
  };
  const steps = createSteps(evidence);

  return {
    targetKind: input.targetKind,
    adapterName: input.adapter.adapterName,
    passed: steps.every((step) => step.passed),
    temporaryFileUsed: input.temporaryFileUsed,
    temporaryFileCleanedUp: input.temporaryFileUsed ? true : input.temporaryFileCleanedUp,
    evidence,
    steps,
  };
}

function createRunnerEvent(targetKind: ManagedAuditAdapterRunnerTargetResult["targetKind"]): RunnerAuditEvent {
  return {
    id: randomUUID(),
    requestId: `managed-audit-runner-${targetKind}`,
    action: "RUNNER_APPEND_ONLY_WRITE",
    operatorId: "managed-audit-runner",
    targetKind,
    occurredAt: new Date().toISOString(),
  };
}

function createSteps(evidence: ManagedAuditAdapterRunnerTargetResult["evidence"]): ManagedAuditAdapterRunnerStep[] {
  return [
    {
      id: "append-only-write",
      method: "appendOnlyWrite",
      passed: evidence.appendOnlyCountAfterWrite === 1 && evidence.digestBefore !== evidence.digestAfterAppend,
      evidence: `appendOnlyCountAfterWrite=${evidence.appendOnlyCountAfterWrite}`,
    },
    {
      id: "query-by-request-id",
      method: "queryByRequestId",
      passed: evidence.queryByRequestIdCount === 1,
      evidence: `queryByRequestIdCount=${evidence.queryByRequestIdCount}`,
    },
    {
      id: "digest-stability",
      method: "digest",
      passed: evidence.digestAfterAppend === evidence.digestAfterRepeatRead
        && evidence.digestAfterAppend.startsWith("sha256:"),
      evidence: `digestAfterAppend=${evidence.digestAfterAppend}`,
    },
    {
      id: "backup-restore-marker",
      method: "backupRestoreMarker",
      passed: evidence.backupRestoreMarker.startsWith("backup-restore-marker:"),
      evidence: evidence.backupRestoreMarker,
    },
  ];
}

function targetPassed(
  targets: ManagedAuditAdapterRunnerTargetResult[],
  targetKind: ManagedAuditAdapterRunnerTargetResult["targetKind"],
): boolean {
  return targets.find((target) => target.targetKind === targetKind)?.passed === true;
}

function collectProductionBlockers(
  checks: ManagedAuditAdapterRunnerProfile["checks"],
): ManagedAuditAdapterRunnerMessage[] {
  const blockers: ManagedAuditAdapterRunnerMessage[] = [];
  addMessage(blockers, checks.memoryRunnerPasses, "MEMORY_RUNNER_FAILED", "Memory audit adapter runner target must pass.");
  addMessage(blockers, checks.fileCandidateRunnerPasses, "FILE_CANDIDATE_RUNNER_FAILED", "File-candidate audit adapter runner target must pass.");
  addMessage(blockers, checks.allRunnerTargetsPass, "RUNNER_TARGETS_FAILED", "All managed audit adapter runner targets must pass.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "A real managed audit adapter target is still required before production audit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production audit is not connected.");
  return blockers;
}

function collectWarnings(): ManagedAuditAdapterRunnerMessage[] {
  return [
    {
      code: "LOCAL_RUNNER_TARGETS_ONLY",
      severity: "warning",
      message: "Runner targets are local memory and temporary file candidates only; production managed storage is not connected.",
    },
  ];
}

function collectRecommendations(): ManagedAuditAdapterRunnerMessage[] {
  return [
    {
      code: "ADD_REAL_ADAPTER_TARGET",
      severity: "recommendation",
      message: "Add a real managed audit adapter target and run the same runner before production readiness.",
    },
    {
      code: "ADD_BACKUP_RESTORE_DRILL",
      severity: "recommendation",
      message: "Extend file-candidate evidence into an explicit backup and restore drill before production.",
    },
  ];
}

function isRunnerAuditEvent(value: unknown): value is RunnerAuditEvent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const event = value as Record<string, unknown>;
  return typeof event.id === "string"
    && typeof event.requestId === "string"
    && event.action === "RUNNER_APPEND_ONLY_WRITE"
    && event.operatorId === "managed-audit-runner"
    && (event.targetKind === "memory" || event.targetKind === "file-candidate")
    && typeof event.occurredAt === "string";
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === "object"
    && error !== null
    && "code" in error
    && (error as { code?: unknown }).code === "ENOENT";
}

function addMessage(
  messages: ManagedAuditAdapterRunnerMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderTargetResult(target: ManagedAuditAdapterRunnerTargetResult): string[] {
  return [
    `### ${target.targetKind}`,
    "",
    `- Adapter name: ${target.adapterName}`,
    `- Passed: ${target.passed}`,
    `- Temporary file used: ${target.temporaryFileUsed}`,
    `- Temporary file cleaned up: ${target.temporaryFileCleanedUp}`,
    `- Evidence: ${formatValue(target.evidence)}`,
    "",
    ...target.steps.flatMap(renderStep),
  ];
}

function renderStep(step: ManagedAuditAdapterRunnerStep): string[] {
  return [
    `#### ${step.id}`,
    "",
    `- Method: ${step.method}`,
    `- Passed: ${step.passed}`,
    `- Evidence: ${step.evidence}`,
    "",
  ];
}

function renderMessages(messages: ManagedAuditAdapterRunnerMessage[], emptyText: string): string[] {
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
