import type { OpsBaselineStatus } from "./opsBaseline.js";
import type { OpsReadiness } from "./opsReadiness.js";
import type { OpsRunbook } from "./opsRunbook.js";
import type { OpsSummary } from "./opsSummary.js";

export type OpsPromotionDecision = "blocked" | "review-required" | "approved";
export type OpsPromotionReasonSeverity = "blocker" | "review" | "pass";

export interface OpsPromotionReason {
  code: string;
  severity: OpsPromotionReasonSeverity;
  message: string;
  evidence?: number | boolean | string;
  nextAction?: string;
}

export interface OpsPromotionReview {
  service: "orderops-node";
  generatedAt: string;
  decision: OpsPromotionDecision;
  readyForPromotion: boolean;
  reasons: OpsPromotionReason[];
  summary: {
    readinessState: OpsReadiness["state"];
    runbookState: OpsRunbook["state"];
    baselineState: OpsBaselineStatus["state"];
    safety: OpsSummary["safety"];
    signals: OpsSummary["signals"];
    latestCheckpointSequence?: number;
    baselineCheckpointSequence?: number;
  };
}

export function createOpsPromotionReview(input: {
  summary: OpsSummary;
  readiness: OpsReadiness;
  runbook: OpsRunbook;
  baseline: OpsBaselineStatus;
}): OpsPromotionReview {
  const reasons = [
    readinessReason(input.readiness),
    runbookReason(input.runbook),
    checkpointReason(input.baseline),
    baselineReason(input.baseline),
  ];
  const blockers = reasons.filter((reason) => reason.severity === "blocker").length;
  const reviews = reasons.filter((reason) => reason.severity === "review").length;
  const decision: OpsPromotionDecision = blockers > 0 ? "blocked" : reviews > 0 ? "review-required" : "approved";

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    decision,
    readyForPromotion: decision === "approved",
    reasons,
    summary: {
      readinessState: input.readiness.state,
      runbookState: input.runbook.state,
      baselineState: input.baseline.state,
      safety: input.summary.safety,
      signals: input.summary.signals,
      latestCheckpointSequence: input.baseline.latest?.sequence,
      baselineCheckpointSequence: input.baseline.baseline?.sequence,
    },
  };
}

function readinessReason(readiness: OpsReadiness): OpsPromotionReason {
  if (readiness.readyForUpstreamExecution) {
    return pass("READINESS_READY", "Readiness gate is ready for upstream execution.", readiness.state);
  }

  return blocker(
    "READINESS_NOT_READY",
    `Readiness gate is ${readiness.state}.`,
    readiness.state,
    readiness.nextActions[0] ?? "Review readiness checks before promotion.",
  );
}

function runbookReason(runbook: OpsRunbook): OpsPromotionReason {
  if (runbook.readyForExecution) {
    return pass("RUNBOOK_READY", "Runbook checklist is ready for execution.", runbook.state);
  }

  return blocker(
    "RUNBOOK_NOT_READY",
    `Runbook checklist is ${runbook.state}.`,
    runbook.state,
    firstRunbookNextAction(runbook) ?? "Complete blocked and todo runbook steps before promotion.",
  );
}

function checkpointReason(baseline: OpsBaselineStatus): OpsPromotionReason {
  if (baseline.latest !== undefined) {
    return pass("LATEST_CHECKPOINT_PRESENT", "A latest checkpoint is available for review.", baseline.latest.sequence);
  }

  return review(
    "NO_CHECKPOINT",
    "No checkpoint exists yet for promotion evidence.",
    "missing",
    "Create a checkpoint before promotion review.",
  );
}

function baselineReason(baseline: OpsBaselineStatus): OpsPromotionReason {
  if (baseline.state === "unset") {
    return review(
      "BASELINE_UNSET",
      "No checkpoint baseline has been selected.",
      "unset",
      "Set a checkpoint baseline before promotion.",
    );
  }

  if (baseline.state === "current") {
    return pass("BASELINE_CURRENT", "Baseline is the latest checkpoint.", baseline.baseline?.sequence ?? "current");
  }

  if (baseline.diff?.direction === "regressed") {
    return blocker(
      "BASELINE_REGRESSED",
      "Latest checkpoint regressed from the selected baseline.",
      baseline.diff.direction,
      "Review checkpoint diff and resolve regressions before promotion.",
    );
  }

  if (baseline.diff?.direction === "improved") {
    return review(
      "BASELINE_IMPROVED",
      "Latest checkpoint improved from the selected baseline.",
      baseline.diff.direction,
      "Review the improvement and reset baseline if this should become the new reference.",
    );
  }

  if (baseline.diff?.direction === "unchanged") {
    return pass("BASELINE_UNCHANGED", "Latest checkpoint has no meaningful drift from baseline.", baseline.diff.direction);
  }

  return review(
    "BASELINE_DRIFTED",
    "Latest checkpoint drifted from the selected baseline.",
    baseline.diff?.direction ?? "changed",
    "Review checkpoint diff before promotion.",
  );
}

function firstRunbookNextAction(runbook: OpsRunbook): string | undefined {
  return runbook.steps.find((step) => step.status === "blocked" || step.status === "todo")?.nextAction;
}

function blocker(code: string, message: string, evidence: number | boolean | string, nextAction: string): OpsPromotionReason {
  return { code, severity: "blocker", message, evidence, nextAction };
}

function review(code: string, message: string, evidence: number | boolean | string, nextAction: string): OpsPromotionReason {
  return { code, severity: "review", message, evidence, nextAction };
}

function pass(code: string, message: string, evidence: number | boolean | string): OpsPromotionReason {
  return { code, severity: "pass", message, evidence };
}
