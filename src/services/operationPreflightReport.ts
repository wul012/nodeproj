import { createHash } from "node:crypto";

import type { EvidenceRecord, OperationPreflightBundle } from "./operationPreflight.js";

export type OperationPreflightReportState = "blocked" | "review-required" | "ready";

export interface OperationPreflightReport {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  intentId: string;
  state: OperationPreflightReportState;
  preflightDigest: {
    algorithm: "sha256";
    value: string;
    coveredFields: string[];
  };
  summary: {
    action: string;
    target: string;
    risk: string;
    intentStatus: string;
    operatorId: string;
    operatorRole: string;
    policyAllowed: boolean;
    confirmationConfirmed: boolean;
    readyForDryRunDispatch: boolean;
    hardBlockerCount: number;
    warningCount: number;
    dispatchTotal: number;
    dryRunDispatches: number;
    rejectedDispatches: number;
    upstreamTouchedDispatches: number;
    javaReplayReadiness: string;
    miniKvCommandCatalog: string;
    miniKvKeyInventory: string;
  };
  preflight: OperationPreflightBundle;
  nextActions: string[];
}

export interface OperationPreflightReportVerification {
  service: "orderops-node";
  verifiedAt: string;
  valid: boolean;
  intentId: string;
  state: OperationPreflightReportState;
  storedDigest: OperationPreflightReport["preflightDigest"];
  recomputedDigest: OperationPreflightReport["preflightDigest"];
  coveredFields: string[];
  checks: {
    digestValid: boolean;
    coveredFieldsMatch: boolean;
    intentMatches: boolean;
    summaryMatches: boolean;
    nextActionsMatch: boolean;
  };
  summary: OperationPreflightReport["summary"];
  nextActions: string[];
}

const PREFLIGHT_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "intent",
  "actionPlan",
  "policy",
  "confirmation",
  "rateLimit",
  "safety",
  "dispatches",
  "evidence",
  "hardBlockers",
  "warnings",
  "recommendedNextActions",
  "readyForDryRunDispatch",
]);

export function createOperationPreflightReport(preflight: OperationPreflightBundle): OperationPreflightReport {
  const state = resolveReportState(preflight);
  return {
    service: "orderops-node",
    title: `Operation preflight report for ${preflight.intent.action}`,
    generatedAt: new Date().toISOString(),
    intentId: preflight.intent.id,
    state,
    preflightDigest: {
      algorithm: "sha256",
      value: digestOperationPreflight(preflight),
      coveredFields: [...PREFLIGHT_DIGEST_COVERED_FIELDS],
    },
    summary: summarizePreflight(preflight),
    preflight,
    nextActions: [...preflight.recommendedNextActions],
  };
}

export function createOperationPreflightReportVerification(report: OperationPreflightReport): OperationPreflightReportVerification {
  const recomputedDigest: OperationPreflightReport["preflightDigest"] = {
    algorithm: "sha256",
    value: digestOperationPreflight(report.preflight),
    coveredFields: [...PREFLIGHT_DIGEST_COVERED_FIELDS],
  };
  const recomputedSummary = summarizePreflight(report.preflight);
  const checks = {
    digestValid: report.preflightDigest.value === recomputedDigest.value,
    coveredFieldsMatch: stableJson(report.preflightDigest.coveredFields) === stableJson(recomputedDigest.coveredFields),
    intentMatches: report.intentId === report.preflight.intent.id,
    summaryMatches: stableJson(report.summary) === stableJson(recomputedSummary),
    nextActionsMatch: stableJson(report.nextActions) === stableJson(report.preflight.recommendedNextActions),
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    verifiedAt: new Date().toISOString(),
    valid,
    intentId: report.intentId,
    state: report.state,
    storedDigest: report.preflightDigest,
    recomputedDigest,
    coveredFields: [...PREFLIGHT_DIGEST_COVERED_FIELDS],
    checks,
    summary: recomputedSummary,
    nextActions: valid
      ? ["Preflight report verification is complete; store the digest with the operation evidence."]
      : ["Regenerate the preflight report before using it as operation evidence."],
  };
}

export function renderOperationPreflightReportMarkdown(report: OperationPreflightReport): string {
  return [
    "# Operation preflight report",
    "",
    `- Service: ${report.service}`,
    `- Generated at: ${report.generatedAt}`,
    `- State: ${report.state}`,
    `- Intent id: ${report.intentId}`,
    `- Action: ${report.summary.action}`,
    `- Target: ${report.summary.target}`,
    `- Risk: ${report.summary.risk}`,
    `- Preflight digest: ${report.preflightDigest.algorithm}:${report.preflightDigest.value}`,
    `- Ready for dry-run dispatch: ${report.summary.readyForDryRunDispatch}`,
    "",
    "## Policy And Confirmation",
    "",
    `- Intent status: ${report.summary.intentStatus}`,
    `- Operator: ${report.summary.operatorId} (${report.summary.operatorRole})`,
    `- Policy allowed: ${report.summary.policyAllowed}`,
    `- Required role: ${report.preflight.policy.requiredRole}`,
    `- Actual role: ${report.preflight.policy.actualRole}`,
    `- Confirmed: ${report.summary.confirmationConfirmed}`,
    `- Required text: ${report.preflight.confirmation.requiredText}`,
    "",
    "## Safety Flags",
    "",
    `- UPSTREAM_PROBES_ENABLED: ${report.preflight.safety.upstreamProbesEnabled}`,
    `- UPSTREAM_ACTIONS_ENABLED: ${report.preflight.safety.upstreamActionsEnabled}`,
    `- Mutation rate limit: ${report.preflight.rateLimit.mutationMaxRequests}/${report.preflight.rateLimit.mutationWindowMs}ms`,
    "",
    "## Dispatch History",
    "",
    `- Total: ${report.summary.dispatchTotal}`,
    `- Dry-run completed: ${report.summary.dryRunDispatches}`,
    `- Rejected: ${report.summary.rejectedDispatches}`,
    `- Upstream touched: ${report.summary.upstreamTouchedDispatches}`,
    "",
    "## Evidence",
    "",
    ...renderEvidence("Java replay readiness", report.preflight.evidence.javaReplayReadiness),
    ...renderEvidence("mini-kv command catalog", report.preflight.evidence.miniKvCommandCatalog),
    ...renderEvidence("mini-kv key inventory", report.preflight.evidence.miniKvKeyInventory),
    "## Hard Blockers",
    "",
    ...renderList(report.preflight.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(report.preflight.warnings, "No warnings."),
    "",
    "## Next Actions",
    "",
    ...renderList(report.nextActions, "No next actions."),
    "",
  ].join("\n");
}

export function renderOperationPreflightVerificationMarkdown(verification: OperationPreflightReportVerification): string {
  return [
    "# Operation preflight report verification",
    "",
    `- Service: ${verification.service}`,
    `- Verified at: ${verification.verifiedAt}`,
    `- Valid: ${verification.valid}`,
    `- Intent id: ${verification.intentId}`,
    `- State: ${verification.state}`,
    `- Stored digest: ${verification.storedDigest.algorithm}:${verification.storedDigest.value}`,
    `- Recomputed digest: ${verification.recomputedDigest.algorithm}:${verification.recomputedDigest.value}`,
    "",
    "## Checks",
    "",
    `- Digest valid: ${verification.checks.digestValid}`,
    `- Covered fields match: ${verification.checks.coveredFieldsMatch}`,
    `- Intent matches: ${verification.checks.intentMatches}`,
    `- Summary matches: ${verification.checks.summaryMatches}`,
    `- Next actions match: ${verification.checks.nextActionsMatch}`,
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function resolveReportState(preflight: OperationPreflightBundle): OperationPreflightReportState {
  if (preflight.hardBlockers.length > 0) {
    return "blocked";
  }
  if (preflight.warnings.length > 0) {
    return "review-required";
  }
  return "ready";
}

function summarizePreflight(preflight: OperationPreflightBundle): OperationPreflightReport["summary"] {
  return {
    action: preflight.intent.action,
    target: preflight.intent.target,
    risk: preflight.actionPlan.risk,
    intentStatus: preflight.intent.status,
    operatorId: preflight.intent.operator.id,
    operatorRole: preflight.intent.operator.role,
    policyAllowed: preflight.policy.allowed,
    confirmationConfirmed: preflight.confirmation.confirmed,
    readyForDryRunDispatch: preflight.readyForDryRunDispatch,
    hardBlockerCount: preflight.hardBlockers.length,
    warningCount: preflight.warnings.length,
    dispatchTotal: preflight.dispatches.total,
    dryRunDispatches: preflight.dispatches.dryRunCompleted,
    rejectedDispatches: preflight.dispatches.rejected,
    upstreamTouchedDispatches: preflight.dispatches.upstreamTouched,
    javaReplayReadiness: preflight.evidence.javaReplayReadiness.status,
    miniKvCommandCatalog: preflight.evidence.miniKvCommandCatalog.status,
    miniKvKeyInventory: preflight.evidence.miniKvKeyInventory.status,
  };
}

function digestOperationPreflight(preflight: OperationPreflightBundle): string {
  return createHash("sha256")
    .update(stableJson({
      service: preflight.service,
      intent: preflight.intent,
      actionPlan: preflight.actionPlan,
      policy: preflight.policy,
      confirmation: preflight.confirmation,
      rateLimit: preflight.rateLimit,
      safety: preflight.safety,
      dispatches: preflight.dispatches,
      evidence: preflight.evidence,
      hardBlockers: preflight.hardBlockers,
      warnings: preflight.warnings,
      recommendedNextActions: preflight.recommendedNextActions,
      readyForDryRunDispatch: preflight.readyForDryRunDispatch,
    }))
    .digest("hex");
}

function renderEvidence(label: string, evidence: EvidenceRecord): string[] {
  return [
    `### ${label}`,
    "",
    `- Status: ${evidence.status}`,
    `- Message: ${evidence.message}`,
    ...renderEvidenceDetails(evidence.details),
    "",
  ];
}

function renderEvidenceDetails(details: unknown): string[] {
  if (!isRecord(details)) {
    return [];
  }

  const lines: string[] = [];
  const latencyMs = details.latencyMs;
  if (typeof latencyMs === "number") {
    lines.push(`- Latency: ${latencyMs}ms`);
  }

  const actionCommands = readStringArray(details, "actionCommands");
  if (actionCommands.length > 0) {
    lines.push(`- Action commands: ${actionCommands.join(", ")}`);
  }

  if (Array.isArray(details.matchedCommands)) {
    const names = details.matchedCommands
      .filter(isRecord)
      .map((command) => typeof command.name === "string" ? command.name : undefined)
      .filter((name): name is string => name !== undefined);
    if (names.length > 0) {
      lines.push(`- Matched commands: ${names.join(", ")}`);
    }
  }

  if (isRecord(details.inventory)) {
    const keyCount = details.inventory.key_count;
    const truncated = details.inventory.truncated;
    if (typeof keyCount === "number") {
      lines.push(`- Key count: ${keyCount}`);
    }
    if (typeof truncated === "boolean") {
      lines.push(`- Truncated: ${truncated}`);
    }
  }

  if (isRecord(details.readiness)) {
    const eligible = details.readiness.eligibleForReplay;
    if (typeof eligible === "boolean") {
      lines.push(`- Eligible for replay: ${eligible}`);
    }
    const blockedBy = readStringArray(details.readiness, "blockedBy");
    if (blockedBy.length > 0) {
      lines.push(`- Blocked by: ${blockedBy.join(", ")}`);
    }
  }

  return lines;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringArray(data: Record<string, unknown>, field: string): string[] {
  const value = data[field];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}
