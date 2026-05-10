import type { OpsSummary } from "./opsSummary.js";

export type OpsReadinessState = "blocked" | "warning" | "ready";
export type OpsReadinessSeverity = "blocker" | "warning" | "info" | "pass";

export interface OpsReadinessCheck {
  code: string;
  severity: OpsReadinessSeverity;
  message: string;
  value?: number | boolean | string;
  nextAction?: string;
}

export interface OpsReadiness {
  service: "orderops-node";
  generatedAt: string;
  state: OpsReadinessState;
  readyForUpstreamExecution: boolean;
  blockers: number;
  warnings: number;
  checks: OpsReadinessCheck[];
  nextActions: string[];
  summary: {
    safety: OpsSummary["safety"];
    mutationRateLimit: OpsSummary["mutationRateLimit"];
    signals: OpsSummary["signals"];
  };
}

export function createOpsReadiness(summary: OpsSummary): OpsReadiness {
  const checks = buildChecks(summary);
  const blockers = checks.filter((check) => check.severity === "blocker").length;
  const warnings = checks.filter((check) => check.severity === "warning").length;
  const state: OpsReadinessState = blockers > 0 ? "blocked" : warnings > 0 ? "warning" : "ready";

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    state,
    readyForUpstreamExecution: state === "ready",
    blockers,
    warnings,
    checks,
    nextActions: checks
      .filter((check) => check.severity === "blocker" || check.severity === "warning")
      .map((check) => check.nextAction)
      .filter((action): action is string => action !== undefined),
    summary: {
      safety: summary.safety,
      mutationRateLimit: summary.mutationRateLimit,
      signals: summary.signals,
    },
  };
}

function buildChecks(summary: OpsSummary): OpsReadinessCheck[] {
  return [
    summary.safety.upstreamActionsEnabled
      ? pass("UPSTREAM_ACTION_GATE", "Real upstream action gate is open.", true)
      : blocker(
        "UPSTREAM_ACTION_GATE",
        "Real upstream action gate is closed.",
        false,
        "Set UPSTREAM_ACTIONS_ENABLED=true and restart orderops-node only when Java and mini-kv are ready for traffic.",
      ),
    summary.safety.upstreamProbesEnabled
      ? pass("UPSTREAM_PROBE_GATE", "Upstream probe mode is enabled.", true)
      : warning(
        "UPSTREAM_PROBE_GATE",
        "Upstream probe mode is disabled, so readiness cannot see live Java or mini-kv health.",
        false,
        "Set UPSTREAM_PROBES_ENABLED=true during a coordinated integration window if live health checks are needed.",
      ),
    summary.signals.upstreamTouchedDispatches === 0
      ? pass("UPSTREAM_TOUCH_GUARD", "No dispatch has touched an upstream.", 0)
      : blocker(
        "UPSTREAM_TOUCH_GUARD",
        "At least one dispatch reports upstreamTouched=true.",
        summary.signals.upstreamTouchedDispatches,
        "Review dispatch history before enabling more execution paths.",
      ),
    summary.signals.pendingConfirmations === 0
      ? pass("PENDING_CONFIRMATIONS", "No intents are waiting for confirmation.", 0)
      : warning(
        "PENDING_CONFIRMATIONS",
        "Some intents are waiting for confirmation.",
        summary.signals.pendingConfirmations,
        "Confirm or let pending intents expire before a real execution window.",
      ),
    summary.signals.blockedIntents === 0
      ? pass("BLOCKED_INTENTS", "No blocked intents are present.", 0)
      : warning(
        "BLOCKED_INTENTS",
        "Blocked intents are present in the local ledger.",
        summary.signals.blockedIntents,
        "Review blocked intents and their policy reasons.",
      ),
    summary.signals.rejectedDispatches === 0
      ? pass("REJECTED_DISPATCHES", "No rejected dispatches are present.", 0)
      : warning(
        "REJECTED_DISPATCHES",
        "Rejected dispatches are present in the local ledger.",
        summary.signals.rejectedDispatches,
        "Review rejected dispatches before promoting the flow.",
      ),
    summary.signals.rateLimitedRequests === 0
      ? pass("RATE_LIMITED_MUTATIONS", "No mutation requests have been rate limited recently.", 0)
      : warning(
        "RATE_LIMITED_MUTATIONS",
        "Mutation rate limit events were observed.",
        summary.signals.rateLimitedRequests,
        "Check whether a user or script is repeatedly submitting mutations.",
      ),
    summary.signals.dryRunDispatches > 0
      ? pass("DRY_RUN_DISPATCH", "At least one dry-run dispatch has completed.", summary.signals.dryRunDispatches)
      : info(
        "DRY_RUN_DISPATCH",
        "No dry-run dispatch has completed yet.",
        0,
        "Exercise a confirmed intent with dry-run dispatch before real execution work.",
      ),
  ];
}

function blocker(code: string, message: string, value: number | boolean | string, nextAction: string): OpsReadinessCheck {
  return { code, severity: "blocker", message, value, nextAction };
}

function warning(code: string, message: string, value: number | boolean | string, nextAction: string): OpsReadinessCheck {
  return { code, severity: "warning", message, value, nextAction };
}

function info(code: string, message: string, value: number | boolean | string, nextAction: string): OpsReadinessCheck {
  return { code, severity: "info", message, value, nextAction };
}

function pass(code: string, message: string, value: number | boolean | string): OpsReadinessCheck {
  return { code, severity: "pass", message, value };
}
