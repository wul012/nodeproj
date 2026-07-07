import { renderList } from "./operationApprovalEvidenceReaders.js";
import type { OperationApprovalEvidenceReport, OperationApprovalEvidenceVerification } from "./operationApprovalEvidenceTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderOperationApprovalEvidenceMarkdown(report: OperationApprovalEvidenceReport): string {
  return renderVerificationReportMarkdown({
    title: "Operation approval evidence report",
    meta: [
      ["Service", report.service],
      ["Generated at", report.generatedAt],
      ["State", report.state],
      ["Request id", report.requestId],
      ["Decision id", report.decisionId ?? "missing"],
      ["Intent id", report.intentId],
      ["Action", report.summary.action],
      ["Target", report.summary.target],
      ["Evidence digest", `${report.evidenceDigest.algorithm}:${report.evidenceDigest.value}`],
    ],
    sections: [
      { heading: "Approval Request", lines: renderApprovalRequest(report) },
      { heading: "Reviewer Decision", lines: renderReviewerDecision(report) },
      { heading: "Upstream Evidence", lines: renderUpstreamEvidence(report) },
      { heading: "Expected Side Effects", list: report.request.expectedSideEffects, emptyText: "No expected side effects." },
      { heading: "Hard Blockers", list: report.request.hardBlockers, emptyText: "No hard blockers." },
      { heading: "Warnings", list: report.request.warnings, emptyText: "No warnings." },
      { heading: "Next Actions", list: report.nextActions, emptyText: "No next actions." },
    ],
  });
}

export function renderOperationApprovalEvidenceVerificationMarkdown(verification: OperationApprovalEvidenceVerification): string {
  return renderVerificationReportMarkdown({
    title: "Operation approval evidence verification",
    meta: [
      ["Service", verification.service],
      ["Verified at", verification.verifiedAt],
      ["Valid", verification.valid],
      ["Request id", verification.requestId],
      ["Decision id", verification.decisionId ?? "missing"],
      ["State", verification.state],
      ["Stored digest", `${verification.storedDigest.algorithm}:${verification.storedDigest.value}`],
      ["Recomputed digest", `${verification.recomputedDigest.algorithm}:${verification.recomputedDigest.value}`],
    ],
    sections: [
      { heading: "Checks", lines: renderVerificationChecks(verification) },
      { heading: "Next Actions", list: verification.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderApprovalRequest(report: OperationApprovalEvidenceReport): string[] {
  return [
    `- Request status: ${report.summary.requestStatus}`,
    `- Requested by: ${report.request.requestedBy}`,
    `- Reviewer: ${report.request.reviewer}`,
    `- Decision reason: ${report.request.decisionReason}`,
    `- Ready for approval request: ${report.summary.readyForApprovalRequest}`,
    `- Preflight digest: ${report.summary.preflightDigest.algorithm}:${report.summary.preflightDigest.value}`,
    `- Preview digest: ${report.summary.previewDigest.algorithm}:${report.summary.previewDigest.value}`,
  ];
}

function renderReviewerDecision(report: OperationApprovalEvidenceReport): string[] {
  return [
    `- Decision: ${report.summary.decision}`,
    `- Reviewer: ${report.summary.reviewer}`,
    `- Upstream touched: ${report.summary.upstreamTouched}`,
    `- Decision digest: ${report.summary.decisionDigest === undefined ? "missing" : `${report.summary.decisionDigest.algorithm}:${report.summary.decisionDigest.value}`}`,
  ];
}

function renderUpstreamEvidence(report: OperationApprovalEvidenceReport): string[] {
  return [
    `- Java approval-status: ${report.summary.javaApprovalStatus} - ${report.upstreamEvidence.javaApprovalStatus.message}`,
    `- Java approved for replay: ${report.summary.javaApprovedForReplay === undefined ? "unknown" : report.summary.javaApprovedForReplay}`,
    `- Java evidence version: ${report.summary.javaEvidenceVersion ?? "unknown"}`,
    `- Java approval digest: ${report.summary.javaApprovalDigest ?? "unknown"}`,
    `- Java replay eligibility digest: ${report.summary.javaReplayEligibilityDigest ?? "unknown"}`,
    `- Java execution contract: ${report.summary.javaExecutionContractStatus} - ${report.upstreamEvidence.javaExecutionContract.message}`,
    `- Java contract version: ${report.summary.javaContractVersion ?? "unknown"}`,
    `- Java contract digest: ${report.summary.javaContractDigest ?? "unknown"}`,
    `- Java replay preconditions satisfied: ${report.summary.javaReplayPreconditionsSatisfied === undefined ? "unknown" : report.summary.javaReplayPreconditionsSatisfied}`,
    `- Java digest verification mode: ${report.summary.javaDigestVerificationMode ?? "unknown"}`,
    `- mini-kv EXPLAINJSON coverage: ${report.summary.miniKvExplainCoverage} - ${report.upstreamEvidence.miniKvExplainCoverage.message}`,
    `- mini-kv schema version: ${report.summary.miniKvSchemaVersion ?? "unknown"}`,
    `- mini-kv command digest: ${report.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv side_effect_count: ${report.summary.miniKvSideEffectCount ?? "unknown"}`,
    `- mini-kv CHECKJSON contract: ${report.summary.miniKvExecutionContractStatus} - ${report.upstreamEvidence.miniKvExecutionContract.message}`,
    `- mini-kv CHECKJSON read_only: ${report.summary.miniKvCheckReadOnly === undefined ? "unknown" : report.summary.miniKvCheckReadOnly}`,
    `- mini-kv CHECKJSON execution_allowed: ${report.summary.miniKvCheckExecutionAllowed === undefined ? "unknown" : report.summary.miniKvCheckExecutionAllowed}`,
    `- mini-kv CHECKJSON durability: ${report.summary.miniKvCheckDurability ?? "unknown"}`,
    "",
    "### mini-kv side_effects",
    "",
    ...renderList(report.summary.miniKvSideEffects, "No mini-kv side_effects reported."),
  ];
}

function renderVerificationChecks(verification: OperationApprovalEvidenceVerification): string[] {
  return [
    `- Digest valid: ${verification.checks.digestValid}`,
    `- Request matches: ${verification.checks.requestMatches}`,
    `- Decision present: ${verification.checks.decisionPresent}`,
    `- Decision matches request: ${verification.checks.decisionMatchesRequest}`,
    `- Request preview digest valid: ${verification.checks.requestPreviewDigestValid}`,
    `- Decision digest valid: ${verification.checks.decisionDigestValid}`,
    `- Summary matches: ${verification.checks.summaryMatches}`,
    `- Upstream evidence matches summary: ${verification.checks.upstreamEvidenceMatchesSummary}`,
    `- Java approval digest evidence valid: ${verification.checks.javaApprovalDigestEvidenceValid}`,
    `- Java execution contract evidence valid: ${verification.checks.javaExecutionContractEvidenceValid}`,
    `- mini-kv command digest evidence valid: ${verification.checks.miniKvCommandDigestEvidenceValid}`,
    `- mini-kv side_effect_count matches: ${verification.checks.miniKvSideEffectCountMatches}`,
    `- mini-kv execution contract evidence valid: ${verification.checks.miniKvExecutionContractEvidenceValid}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    `- Upstream untouched: ${verification.checks.upstreamUntouched}`,
  ];
}
