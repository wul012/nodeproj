import type { OpsReadiness } from "./opsReadiness.js";
import type { OpsSummary } from "./opsSummary.js";

export type OpsRunbookState = "blocked" | "action-required" | "ready";
export type OpsRunbookStepStatus = "blocked" | "todo" | "done" | "info";

export interface OpsRunbookStep {
  id: string;
  title: string;
  status: OpsRunbookStepStatus;
  detail: string;
  evidence?: number | boolean | string;
  nextAction?: string;
}

export interface OpsRunbook {
  service: "orderops-node";
  generatedAt: string;
  state: OpsRunbookState;
  readyForExecution: boolean;
  totals: {
    steps: number;
    blocked: number;
    todo: number;
    done: number;
    info: number;
  };
  steps: OpsRunbookStep[];
  summary: {
    readinessState: OpsReadiness["state"];
    readyForUpstreamExecution: boolean;
    safety: OpsSummary["safety"];
    signals: OpsSummary["signals"];
  };
}

export function createOpsRunbook(summary: OpsSummary, readiness: OpsReadiness): OpsRunbook {
  const steps = buildSteps(summary, readiness);
  const blocked = countStatus(steps, "blocked");
  const todo = countStatus(steps, "todo");
  const done = countStatus(steps, "done");
  const info = countStatus(steps, "info");
  const state: OpsRunbookState = blocked > 0 ? "blocked" : todo > 0 ? "action-required" : "ready";

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    state,
    readyForExecution: state === "ready",
    totals: {
      steps: steps.length,
      blocked,
      todo,
      done,
      info,
    },
    steps,
    summary: {
      readinessState: readiness.state,
      readyForUpstreamExecution: readiness.readyForUpstreamExecution,
      safety: summary.safety,
      signals: summary.signals,
    },
  };
}

export function renderOpsRunbookMarkdown(runbook: OpsRunbook): string {
  return [
    "# OrderOps Runbook Checklist",
    "",
    `- Generated at: ${runbook.generatedAt}`,
    `- State: ${runbook.state}`,
    `- Ready for execution: ${runbook.readyForExecution ? "yes" : "no"}`,
    `- Blocked: ${runbook.totals.blocked}`,
    `- Todo: ${runbook.totals.todo}`,
    `- Done: ${runbook.totals.done}`,
    "",
    "## Steps",
    "",
    ...runbook.steps.map(renderStep),
    "",
  ].join("\n");
}

function buildSteps(summary: OpsSummary, readiness: OpsReadiness): OpsRunbookStep[] {
  const nextActionByCode = new Map(readiness.checks.map((check) => [check.code, check.nextAction]));

  return [
    {
      id: "ACTION_GATE",
      title: "Open upstream action gate only during an integration window",
      status: summary.safety.upstreamActionsEnabled ? "done" : "blocked",
      detail: summary.safety.upstreamActionsEnabled
        ? "UPSTREAM_ACTIONS_ENABLED is true."
        : "UPSTREAM_ACTIONS_ENABLED is false, so real upstream execution is blocked.",
      evidence: summary.safety.upstreamActionsEnabled,
      nextAction: nextActionByCode.get("UPSTREAM_ACTION_GATE"),
    },
    {
      id: "PROBE_MODE",
      title: "Decide whether live upstream probes are allowed",
      status: summary.safety.upstreamProbesEnabled ? "done" : "todo",
      detail: summary.safety.upstreamProbesEnabled
        ? "UPSTREAM_PROBES_ENABLED is true."
        : "UPSTREAM_PROBES_ENABLED is false, so Java and mini-kv health are not sampled.",
      evidence: summary.safety.upstreamProbesEnabled,
      nextAction: nextActionByCode.get("UPSTREAM_PROBE_GATE"),
    },
    {
      id: "UPSTREAM_TOUCH_GUARD",
      title: "Review whether any dispatch touched an upstream",
      status: summary.signals.upstreamTouchedDispatches === 0 ? "done" : "blocked",
      detail: "Real upstream touches should stay at 0 until the execution model is intentionally expanded.",
      evidence: summary.signals.upstreamTouchedDispatches,
      nextAction: nextActionByCode.get("UPSTREAM_TOUCH_GUARD"),
    },
    {
      id: "DRY_RUN_EVIDENCE",
      title: "Complete at least one confirmed dry-run dispatch",
      status: summary.signals.dryRunDispatches > 0 ? "done" : "todo",
      detail: "Dry-run dispatch proves the local intent -> confirmation -> dispatch path before real execution.",
      evidence: summary.signals.dryRunDispatches,
      nextAction: summary.signals.dryRunDispatches > 0
        ? undefined
        : "Create a confirmable intent, confirm it with the exact phrase, then dispatch in dry-run mode.",
    },
    {
      id: "PENDING_CONFIRMATIONS",
      title: "Clear pending confirmations",
      status: summary.signals.pendingConfirmations === 0 ? "done" : "todo",
      detail: "Pending confirmations should be confirmed, allowed to expire, or reviewed before promotion.",
      evidence: summary.signals.pendingConfirmations,
      nextAction: nextActionByCode.get("PENDING_CONFIRMATIONS"),
    },
    {
      id: "BLOCKED_INTENTS",
      title: "Review blocked intents",
      status: summary.signals.blockedIntents === 0 ? "done" : "todo",
      detail: "Blocked intents show policy, role, or gate problems that should be understood.",
      evidence: summary.signals.blockedIntents,
      nextAction: nextActionByCode.get("BLOCKED_INTENTS"),
    },
    {
      id: "REJECTED_DISPATCHES",
      title: "Review rejected dispatches",
      status: summary.signals.rejectedDispatches === 0 ? "done" : "todo",
      detail: "Rejected dispatches indicate attempted execution against an unconfirmed or invalid intent.",
      evidence: summary.signals.rejectedDispatches,
      nextAction: nextActionByCode.get("REJECTED_DISPATCHES"),
    },
    {
      id: "RATE_LIMITED_MUTATIONS",
      title: "Check mutation rate-limit events",
      status: summary.signals.rateLimitedRequests === 0 ? "done" : "todo",
      detail: "Recent 429 responses may indicate a stuck script or accidental repeated mutation submits.",
      evidence: summary.signals.rateLimitedRequests,
      nextAction: nextActionByCode.get("RATE_LIMITED_MUTATIONS"),
    },
    {
      id: "HANDOFF_REPORT",
      title: "Generate a local handoff report for review",
      status: "info",
      detail: "Use /api/v1/ops/handoff-report when handing the current state to another debugging session.",
      nextAction: "Open the Handoff Report dashboard action or call GET /api/v1/ops/handoff-report.",
    },
  ];
}

function countStatus(steps: OpsRunbookStep[], status: OpsRunbookStepStatus): number {
  return steps.filter((step) => step.status === status).length;
}

function renderStep(step: OpsRunbookStep): string {
  const evidence = step.evidence === undefined ? "" : ` evidence=${String(step.evidence)}`;
  const nextAction = step.nextAction === undefined ? "" : `\n  - Next: ${step.nextAction}`;
  return `- [${step.status}] ${step.id}: ${step.title}${evidence}\n  - ${step.detail}${nextAction}`;
}
