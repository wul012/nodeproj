import crypto from "node:crypto";

import {
  digestOperationApprovalDecision,
  type OperationApprovalDecision,
  type OperationApprovalDecisionDigest,
} from "./operationApprovalDecision.js";
import {
  digestOperationExecutionPreview,
  type OperationApprovalDigest,
  type OperationApprovalRequest,
} from "./operationApprovalRequest.js";

export type OperationApprovalEvidenceState = "missing-decision" | "approved" | "rejected";

export interface OperationApprovalEvidenceDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalEvidenceReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalEvidenceState;
  evidenceDigest: OperationApprovalEvidenceDigest;
  summary: {
    action: string;
    target: string;
    requestStatus: OperationApprovalRequest["status"];
    decision: OperationApprovalDecision["decision"] | "missing";
    reviewer: string;
    upstreamTouched: boolean;
    readyForApprovalRequest: boolean;
    preflightDigest: OperationApprovalDigest;
    previewDigest: OperationApprovalDigest;
    decisionDigest?: OperationApprovalDecisionDigest;
    expectedSideEffectCount: number;
    hardBlockerCount: number;
    warningCount: number;
  };
  request: OperationApprovalRequest;
  decision?: OperationApprovalDecision;
  nextActions: string[];
}

export interface OperationApprovalEvidenceVerification {
  service: "orderops-node";
  verifiedAt: string;
  valid: boolean;
  requestId: string;
  decisionId?: string;
  state: OperationApprovalEvidenceState;
  storedDigest: OperationApprovalEvidenceDigest;
  recomputedDigest: OperationApprovalEvidenceDigest;
  checks: {
    digestValid: boolean;
    requestMatches: boolean;
    decisionPresent: boolean;
    decisionMatchesRequest: boolean;
    requestPreviewDigestValid: boolean;
    decisionDigestValid: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
    upstreamUntouched: boolean;
  };
  summary: OperationApprovalEvidenceReport["summary"];
  nextActions: string[];
}

const EVIDENCE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "summary",
  "request",
  "decision",
  "nextActions",
]);

export function createOperationApprovalEvidenceReport(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): OperationApprovalEvidenceReport {
  const state = resolveEvidenceState(decision);
  const summary = summarizeEvidence(request, decision);
  const nextActions = collectNextActions(state, request, decision);
  const reportWithoutDigest = {
    service: "orderops-node" as const,
    title: `Operation approval evidence for ${request.action}`,
    generatedAt: new Date().toISOString(),
    requestId: request.requestId,
    ...(decision === undefined ? {} : { decisionId: decision.decisionId }),
    intentId: request.intentId,
    state,
    summary,
    request,
    ...(decision === undefined ? {} : { decision }),
    nextActions,
  };

  return {
    ...reportWithoutDigest,
    evidenceDigest: digestOperationApprovalEvidence(reportWithoutDigest),
  };
}

export function createOperationApprovalEvidenceVerification(
  report: OperationApprovalEvidenceReport,
): OperationApprovalEvidenceVerification {
  const recomputed = createOperationApprovalEvidenceReport(report.request, report.decision);
  const storedPreviewDigest = report.request.previewDigest;
  const recomputedPreviewDigest = digestOperationExecutionPreview(report.request.preview);
  const recomputedDecisionDigest = report.decision === undefined
    ? undefined
    : digestOperationApprovalDecision(stripDecisionDigest(report.decision));
  const checks = {
    digestValid: report.evidenceDigest.value === recomputed.evidenceDigest.value,
    requestMatches: report.requestId === report.request.requestId && report.intentId === report.request.intentId,
    decisionPresent: report.decision !== undefined,
    decisionMatchesRequest: report.decision === undefined
      ? false
      : report.decision.requestId === report.request.requestId
        && report.decision.intentId === report.request.intentId
        && report.decision.previewDigest.value === report.request.previewDigest.value
        && report.decision.requestStatusAfterDecision === report.request.status,
    requestPreviewDigestValid: storedPreviewDigest.value === recomputedPreviewDigest.value,
    decisionDigestValid: report.decision !== undefined
      && recomputedDecisionDigest !== undefined
      && report.decision.decisionDigest.value === recomputedDecisionDigest.value,
    summaryMatches: stableJson(report.summary) === stableJson(recomputed.summary),
    nextActionsMatch: stableJson(report.nextActions) === stableJson(recomputed.nextActions),
    upstreamUntouched: report.decision?.upstreamTouched === false,
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    verifiedAt: new Date().toISOString(),
    valid,
    requestId: report.requestId,
    ...(report.decisionId === undefined ? {} : { decisionId: report.decisionId }),
    state: report.state,
    storedDigest: report.evidenceDigest,
    recomputedDigest: recomputed.evidenceDigest,
    checks,
    summary: recomputed.summary,
    nextActions: valid
      ? ["Approval evidence verification is complete; archive this report with the release evidence."]
      : ["Approval evidence is incomplete or inconsistent; regenerate request, decision, and evidence before handoff."],
  };
}

export function renderOperationApprovalEvidenceMarkdown(report: OperationApprovalEvidenceReport): string {
  return [
    "# Operation approval evidence report",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- State: ${report.state}`,
    `- Request id: ${report.requestId}`,
    `- Decision id: ${report.decisionId ?? "missing"}`,
    `- Intent id: ${report.intentId}`,
    `- Action: ${report.summary.action}`,
    `- Target: ${report.summary.target}`,
    `- Evidence digest: ${report.evidenceDigest.algorithm}:${report.evidenceDigest.value}`,
    "",
    "## Approval Request",
    "",
    `- Request status: ${report.summary.requestStatus}`,
    `- Requested by: ${report.request.requestedBy}`,
    `- Reviewer: ${report.request.reviewer}`,
    `- Decision reason: ${report.request.decisionReason}`,
    `- Ready for approval request: ${report.summary.readyForApprovalRequest}`,
    `- Preflight digest: ${report.summary.preflightDigest.algorithm}:${report.summary.preflightDigest.value}`,
    `- Preview digest: ${report.summary.previewDigest.algorithm}:${report.summary.previewDigest.value}`,
    "",
    "## Reviewer Decision",
    "",
    `- Decision: ${report.summary.decision}`,
    `- Reviewer: ${report.summary.reviewer}`,
    `- Upstream touched: ${report.summary.upstreamTouched}`,
    `- Decision digest: ${report.summary.decisionDigest === undefined ? "missing" : `${report.summary.decisionDigest.algorithm}:${report.summary.decisionDigest.value}`}`,
    "",
    "## Expected Side Effects",
    "",
    ...renderList(report.request.expectedSideEffects, "No expected side effects."),
    "",
    "## Hard Blockers",
    "",
    ...renderList(report.request.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(report.request.warnings, "No warnings."),
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

export function renderOperationApprovalEvidenceVerificationMarkdown(verification: OperationApprovalEvidenceVerification): string {
  return [
    "# Operation approval evidence verification",
    "",
    `- Service: ${verification.service}`,
    `- Verified at: ${verification.verifiedAt}`,
    `- Valid: ${verification.valid}`,
    `- Request id: ${verification.requestId}`,
    `- Decision id: ${verification.decisionId ?? "missing"}`,
    `- State: ${verification.state}`,
    `- Stored digest: ${verification.storedDigest.algorithm}:${verification.storedDigest.value}`,
    `- Recomputed digest: ${verification.recomputedDigest.algorithm}:${verification.recomputedDigest.value}`,
    "",
    "## Checks",
    "",
    `- Digest valid: ${verification.checks.digestValid}`,
    `- Request matches: ${verification.checks.requestMatches}`,
    `- Decision present: ${verification.checks.decisionPresent}`,
    `- Decision matches request: ${verification.checks.decisionMatchesRequest}`,
    `- Request preview digest valid: ${verification.checks.requestPreviewDigestValid}`,
    `- Decision digest valid: ${verification.checks.decisionDigestValid}`,
    `- Summary matches: ${verification.checks.summaryMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    `- Upstream untouched: ${verification.checks.upstreamUntouched}`,
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function digestOperationApprovalEvidence(
  report: Omit<OperationApprovalEvidenceReport, "evidenceDigest">,
): OperationApprovalEvidenceDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: report.service,
        requestId: report.requestId,
        decisionId: report.decisionId ?? null,
        intentId: report.intentId,
        state: report.state,
        summary: report.summary,
        request: report.request,
        decision: report.decision ?? null,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...EVIDENCE_DIGEST_COVERED_FIELDS],
  };
}

function summarizeEvidence(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): OperationApprovalEvidenceReport["summary"] {
  return {
    action: request.action,
    target: request.target,
    requestStatus: request.status,
    decision: decision?.decision ?? "missing",
    reviewer: decision?.reviewer ?? request.reviewer,
    upstreamTouched: decision?.upstreamTouched ?? false,
    readyForApprovalRequest: request.readyForApprovalRequest,
    preflightDigest: structuredClone(request.preflightDigest),
    previewDigest: structuredClone(request.previewDigest),
    ...(decision === undefined ? {} : { decisionDigest: structuredClone(decision.decisionDigest) }),
    expectedSideEffectCount: request.expectedSideEffects.length,
    hardBlockerCount: request.hardBlockers.length,
    warningCount: request.warnings.length,
  };
}

function resolveEvidenceState(decision: OperationApprovalDecision | undefined): OperationApprovalEvidenceState {
  return decision?.decision ?? "missing-decision";
}

function collectNextActions(
  state: OperationApprovalEvidenceState,
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): string[] {
  if (decision === undefined) {
    return ["Record an approval decision before using this evidence report for handoff."];
  }
  if (state === "approved") {
    return [
      "Approval evidence is complete for archival review.",
      "Keep this report as proof that Node did not touch upstream execution.",
    ];
  }

  return [
    `Approval was rejected for request ${request.requestId}; keep this evidence with the blocked operation record.`,
    "Do not promote this operation unless a new request and decision are created.",
  ];
}

function stripDecisionDigest(decision: OperationApprovalDecision): Omit<OperationApprovalDecision, "decisionDigest"> {
  const { decisionDigest: _decisionDigest, ...withoutDigest } = decision;
  return withoutDigest;
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
