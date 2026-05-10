import type { OpsPromotionDecisionRecord, OpsPromotionDecisionVerification } from "./opsPromotionDecision.js";
import type { OpsPromotionDecision, OpsPromotionReason } from "./opsPromotionReview.js";

export type OpsPromotionEvidenceVerdict =
  | "digest-mismatch"
  | "verified-approved"
  | "verified-blocked"
  | "verified-review-required";

export interface OpsPromotionEvidenceReport {
  service: "orderops-node";
  generatedAt: string;
  decisionId: string;
  sequence: number;
  title: string;
  verdict: OpsPromotionEvidenceVerdict;
  summary: {
    reviewer: string;
    note: string;
    outcome: OpsPromotionDecision;
    readyForPromotion: boolean;
    digestValid: boolean;
    digestAlgorithm: "sha256";
    digest: string;
    readinessState: string;
    runbookState: string;
    baselineState: string;
    blockerReasons: number;
    reviewReasons: number;
    passReasons: number;
  };
  verification: OpsPromotionDecisionVerification;
  decision: OpsPromotionDecisionRecord;
  nextActions: string[];
}

export function createOpsPromotionEvidenceReport(input: {
  decision: OpsPromotionDecisionRecord;
  verification: OpsPromotionDecisionVerification;
}): OpsPromotionEvidenceReport {
  const reasonCounts = countReasons(input.decision.review.reasons);
  const verdict = evidenceVerdict(input.decision, input.verification);

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    decisionId: input.decision.id,
    sequence: input.decision.sequence,
    title: `Promotion decision #${input.decision.sequence} evidence`,
    verdict,
    summary: {
      reviewer: input.decision.reviewer,
      note: input.decision.note,
      outcome: input.decision.outcome,
      readyForPromotion: input.decision.readyForPromotion,
      digestValid: input.verification.valid,
      digestAlgorithm: input.decision.digest.algorithm,
      digest: input.decision.digest.value,
      readinessState: input.decision.review.summary.readinessState,
      runbookState: input.decision.review.summary.runbookState,
      baselineState: input.decision.review.summary.baselineState,
      blockerReasons: reasonCounts.blocker,
      reviewReasons: reasonCounts.review,
      passReasons: reasonCounts.pass,
    },
    verification: input.verification,
    decision: input.decision,
    nextActions: evidenceNextActions(input.decision, input.verification),
  };
}

export function renderOpsPromotionEvidenceMarkdown(report: OpsPromotionEvidenceReport): string {
  const lines = [
    `# ${report.title}`,
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- Decision id: ${report.decisionId}`,
    `- Sequence: ${report.sequence}`,
    `- Verdict: ${report.verdict}`,
    `- Outcome: ${report.summary.outcome}`,
    `- Ready for promotion: ${report.summary.readyForPromotion}`,
    `- Digest valid: ${report.summary.digestValid}`,
    `- Digest: ${report.summary.digestAlgorithm}:${report.summary.digest}`,
    "",
    "## Reviewer",
    "",
    `- Reviewer: ${report.summary.reviewer}`,
    `- Note: ${report.summary.note}`,
    "",
    "## State Summary",
    "",
    `- Readiness: ${report.summary.readinessState}`,
    `- Runbook: ${report.summary.runbookState}`,
    `- Baseline: ${report.summary.baselineState}`,
    `- Reasons: ${report.summary.blockerReasons} blocker / ${report.summary.reviewReasons} review / ${report.summary.passReasons} pass`,
    "",
    "## Verification",
    "",
    `- Stored digest: ${report.verification.storedDigest.value}`,
    `- Recomputed digest: ${report.verification.recomputedDigest.value}`,
    `- Covered fields: ${report.verification.coveredFields.join(", ")}`,
    "",
    "## Reasons",
    "",
    ...renderReasons(report.decision.review.reasons),
    "",
    "## Next Actions",
    "",
    ...report.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

function evidenceVerdict(
  decision: OpsPromotionDecisionRecord,
  verification: OpsPromotionDecisionVerification,
): OpsPromotionEvidenceVerdict {
  if (!verification.valid) {
    return "digest-mismatch";
  }

  if (decision.outcome === "approved") {
    return "verified-approved";
  }

  if (decision.outcome === "review-required") {
    return "verified-review-required";
  }

  return "verified-blocked";
}

function evidenceNextActions(
  decision: OpsPromotionDecisionRecord,
  verification: OpsPromotionDecisionVerification,
): string[] {
  if (!verification.valid) {
    return ["Stop promotion review and inspect the stored decision record before trusting this evidence."];
  }

  const nextActions = decision.review.reasons
    .map((reason) => reason.nextAction)
    .filter((action): action is string => action !== undefined && action.length > 0);

  if (nextActions.length > 0) {
    return nextActions;
  }

  if (decision.outcome === "approved") {
    return ["Promotion evidence is internally consistent; keep this report with the operator handoff record."];
  }

  return ["Review the promotion decision reasons before continuing."];
}

function countReasons(reasons: OpsPromotionReason[]): { blocker: number; review: number; pass: number } {
  return {
    blocker: reasons.filter((reason) => reason.severity === "blocker").length,
    review: reasons.filter((reason) => reason.severity === "review").length,
    pass: reasons.filter((reason) => reason.severity === "pass").length,
  };
}

function renderReasons(reasons: OpsPromotionReason[]): string[] {
  if (reasons.length === 0) {
    return ["- No reasons recorded."];
  }

  return reasons.map((reason) => {
    const nextAction = reason.nextAction === undefined ? "" : ` Next action: ${reason.nextAction}`;
    return `- [${reason.severity}] ${reason.code}: ${reason.message}${nextAction}`;
  });
}
