import { randomUUID } from "node:crypto";

import type { OpsSnapshot } from "../types.js";
import type { AuditEvent } from "./auditLog.js";
import type { OperationDispatch } from "./operationDispatch.js";
import type { OperationIntent, OperationIntentEvent } from "./operationIntent.js";
import type { OpsReadiness, OpsReadinessCheck } from "./opsReadiness.js";
import type { OpsSummary } from "./opsSummary.js";

export interface OpsHandoffReportInput {
  sources: OpsSnapshot;
  summary: OpsSummary;
  readiness: OpsReadiness;
  auditEvents: AuditEvent[];
  intents: OperationIntent[];
  dispatches: OperationDispatch[];
  intentEvents: OperationIntentEvent[];
  limit: number;
}

export interface OpsHandoffReport {
  service: "orderops-node";
  reportId: string;
  generatedAt: string;
  sources: OpsSnapshot;
  summary: OpsSummary;
  readiness: OpsReadiness;
  recent: {
    limit: number;
    auditEvents: AuditEvent[];
    intents: OperationIntent[];
    dispatches: OperationDispatch[];
    intentEvents: OperationIntentEvent[];
  };
  guidance: string[];
}

export function createOpsHandoffReport(input: OpsHandoffReportInput): OpsHandoffReport {
  return {
    service: "orderops-node",
    reportId: randomUUID(),
    generatedAt: new Date().toISOString(),
    sources: input.sources,
    summary: input.summary,
    readiness: input.readiness,
    recent: {
      limit: input.limit,
      auditEvents: input.auditEvents,
      intents: input.intents,
      dispatches: input.dispatches,
      intentEvents: input.intentEvents,
    },
    guidance: createGuidance(input),
  };
}

export function renderOpsHandoffMarkdown(report: OpsHandoffReport): string {
  const blockers = report.readiness.checks.filter((check) => check.severity === "blocker");
  const warnings = report.readiness.checks.filter((check) => check.severity === "warning");

  return [
    "# OrderOps Handoff Report",
    "",
    `- Report ID: ${report.reportId}`,
    `- Generated at: ${report.generatedAt}`,
    `- Readiness: ${report.readiness.state}`,
    `- Ready for upstream execution: ${report.readiness.readyForUpstreamExecution ? "yes" : "no"}`,
    "",
    "## Sources",
    "",
    `- Node: ${report.sources.node.state}, pid ${report.sources.node.pid}, uptime ${report.sources.node.uptimeSeconds}s`,
    `- Java order platform: ${report.sources.javaOrderPlatform.state} (${report.sources.javaOrderPlatform.message ?? "no message"})`,
    `- mini-kv: ${report.sources.miniKv.state} (${report.sources.miniKv.message ?? "no message"})`,
    "",
    "## Local Signals",
    "",
    `- Audit events: ${report.summary.audit.total}`,
    `- Intents: ${report.summary.intents.total}`,
    `- Dispatches: ${report.summary.dispatches.total}`,
    `- Timeline events: ${report.summary.events.total}`,
    `- Blocked intents: ${report.summary.signals.blockedIntents}`,
    `- Pending confirmations: ${report.summary.signals.pendingConfirmations}`,
    `- Dry-run dispatches: ${report.summary.signals.dryRunDispatches}`,
    `- Rate-limited requests: ${report.summary.signals.rateLimitedRequests}`,
    "",
    "## Readiness Checks",
    "",
    ...renderChecks("Blockers", blockers),
    ...renderChecks("Warnings", warnings),
    "",
    "## Recent Activity",
    "",
    `- Recent audit events: ${report.recent.auditEvents.length}`,
    `- Recent intents: ${report.recent.intents.length}`,
    `- Recent dispatches: ${report.recent.dispatches.length}`,
    `- Recent intent events: ${report.recent.intentEvents.length}`,
    "",
    "## Guidance",
    "",
    ...report.guidance.map((item) => `- ${item}`),
    "",
  ].join("\n");
}

function createGuidance(input: OpsHandoffReportInput): string[] {
  const actions = input.readiness.nextActions.length === 0
    ? ["Readiness has no blocker or warning next actions."]
    : input.readiness.nextActions;

  const guidance = [
    ...actions,
    input.sources.javaOrderPlatform.state === "disabled" || input.sources.miniKv.state === "disabled"
      ? "Probe mode is disabled; coordinate a window before enabling live upstream probes."
      : undefined,
    input.summary.signals.dryRunDispatches === 0
      ? "Complete at least one confirmed dry-run dispatch before considering real upstream execution."
      : undefined,
    input.intents.length === 0
      ? "Create a local operation intent so the handoff report contains workflow evidence."
      : undefined,
  ];

  return [...new Set(guidance.filter((item): item is string => item !== undefined))];
}

function renderChecks(title: string, checks: OpsReadinessCheck[]): string[] {
  if (checks.length === 0) {
    return [`### ${title}`, "", "- None"];
  }

  return [
    `### ${title}`,
    "",
    ...checks.map((check) => {
      const value = check.value === undefined ? "" : ` value=${String(check.value)}`;
      return `- ${check.code}:${value} ${check.message}`;
    }),
  ];
}
