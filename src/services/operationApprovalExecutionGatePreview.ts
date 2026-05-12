import crypto from "node:crypto";

import type { OperationApprovalHandoffBundle } from "./operationApprovalHandoffBundle.js";

export type OperationApprovalExecutionGateState = "blocked" | "review-required" | "ready";

export interface OperationApprovalExecutionGateDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalExecutionGatePreview {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalExecutionGateState;
  previewOnly: true;
  executionAllowed: false;
  gateDigest: OperationApprovalExecutionGateDigest;
  bundleDigest: OperationApprovalHandoffBundle["bundleDigest"];
  wouldCall: OperationApprovalHandoffBundle["report"]["request"]["preview"]["wouldCall"];
  summary: {
    action: string;
    target: string;
    requestStatus: OperationApprovalHandoffBundle["summary"]["requestStatus"];
    decision: OperationApprovalHandoffBundle["summary"]["decision"];
    handoffReady: boolean;
    verificationValid: boolean;
    upstreamTouched: boolean;
    requiredUpstreamEvidenceAvailable: boolean;
    javaApprovalStatus: OperationApprovalHandoffBundle["summary"]["javaApprovalStatus"];
    javaApprovedForReplay?: boolean;
    javaApprovalDigest?: string;
    javaReplayEligibilityDigest?: string;
    javaExecutionContractStatus: OperationApprovalHandoffBundle["summary"]["javaExecutionContractStatus"];
    javaContractVersion?: string;
    javaContractDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    javaDigestVerificationMode?: string;
    miniKvExplainCoverage: OperationApprovalHandoffBundle["summary"]["miniKvExplainCoverage"];
    miniKvCommandDigest?: string;
    miniKvSideEffectCount?: number;
    miniKvExecutionContractStatus: OperationApprovalHandoffBundle["summary"]["miniKvExecutionContractStatus"];
    miniKvCheckReadOnly?: boolean;
    miniKvCheckExecutionAllowed?: boolean;
    miniKvCheckDurability?: string;
    hardBlockerCount: number;
    warningCount: number;
  };
  gateChecks: {
    requestApproved: boolean;
    decisionApproved: boolean;
    handoffReady: boolean;
    evidenceVerificationValid: boolean;
    upstreamUntouched: boolean;
    noRequestHardBlockers: boolean;
    requiredUpstreamEvidenceAvailable: boolean;
    javaApprovedForReplayOk: boolean;
    javaApprovalDigestEvidenceValid: boolean;
    javaExecutionContractEvidenceValid: boolean;
    javaReplayPreconditionsSatisfiedOk: boolean;
    miniKvCommandDigestEvidenceValid: boolean;
    miniKvSideEffectCountMatches: boolean;
    miniKvExecutionContractEvidenceValid: boolean;
    miniKvCheckReadOnlyOk: boolean;
    miniKvCheckExecutionAllowedOk: boolean;
  };
  hardBlockers: string[];
  warnings: string[];
  nextActions: string[];
}

const EXECUTION_GATE_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "previewOnly",
  "executionAllowed",
  "bundleDigest",
  "wouldCall",
  "summary",
  "gateChecks",
  "hardBlockers",
  "warnings",
  "nextActions",
]);

export function createOperationApprovalExecutionGatePreview(
  bundle: OperationApprovalHandoffBundle,
): OperationApprovalExecutionGatePreview {
  const gateChecks = createGateChecks(bundle);
  const hardBlockers = collectHardBlockers(bundle, gateChecks);
  const warnings = [...bundle.report.request.warnings];
  const state = resolveState(hardBlockers, warnings);
  const summary = summarizeGatePreview(bundle, gateChecks, hardBlockers, warnings);
  const nextActions = collectNextActions(state, hardBlockers, warnings);
  const previewWithoutDigest = {
    service: "orderops-node" as const,
    title: `Operation approval execution gate preview for ${bundle.summary.action}`,
    generatedAt: new Date().toISOString(),
    requestId: bundle.requestId,
    ...(bundle.decisionId === undefined ? {} : { decisionId: bundle.decisionId }),
    intentId: bundle.intentId,
    state,
    previewOnly: true as const,
    executionAllowed: false as const,
    bundleDigest: structuredClone(bundle.bundleDigest),
    wouldCall: structuredClone(bundle.report.request.preview.wouldCall),
    summary,
    gateChecks,
    hardBlockers,
    warnings,
    nextActions,
  };

  return {
    ...previewWithoutDigest,
    gateDigest: digestOperationApprovalExecutionGatePreview(previewWithoutDigest),
  };
}

export function renderOperationApprovalExecutionGatePreviewMarkdown(
  preview: OperationApprovalExecutionGatePreview,
): string {
  return [
    "# Operation approval execution gate preview",
    "",
    `- Service: ${preview.service}`,
    `- Generated at: ${preview.generatedAt}`,
    `- State: ${preview.state}`,
    `- Preview only: ${preview.previewOnly}`,
    `- Execution allowed: ${preview.executionAllowed}`,
    `- Request id: ${preview.requestId}`,
    `- Decision id: ${preview.decisionId ?? "missing"}`,
    `- Intent id: ${preview.intentId}`,
    `- Action: ${preview.summary.action}`,
    `- Target: ${preview.summary.target}`,
    `- Gate digest: ${preview.gateDigest.algorithm}:${preview.gateDigest.value}`,
    `- Bundle digest: ${preview.bundleDigest.algorithm}:${preview.bundleDigest.value}`,
    "",
    "## Summary",
    "",
    `- Request status: ${preview.summary.requestStatus}`,
    `- Decision: ${preview.summary.decision}`,
    `- Handoff ready: ${preview.summary.handoffReady}`,
    `- Verification valid: ${preview.summary.verificationValid}`,
    `- Upstream touched: ${preview.summary.upstreamTouched}`,
    `- Required upstream evidence available: ${preview.summary.requiredUpstreamEvidenceAvailable}`,
    `- Java approval-status: ${preview.summary.javaApprovalStatus}`,
    `- Java approved for replay: ${preview.summary.javaApprovedForReplay === undefined ? "unknown" : preview.summary.javaApprovedForReplay}`,
    `- Java approval digest: ${preview.summary.javaApprovalDigest ?? "unknown"}`,
    `- Java replay eligibility digest: ${preview.summary.javaReplayEligibilityDigest ?? "unknown"}`,
    `- Java execution contract: ${preview.summary.javaExecutionContractStatus}`,
    `- Java contract version: ${preview.summary.javaContractVersion ?? "unknown"}`,
    `- Java contract digest: ${preview.summary.javaContractDigest ?? "unknown"}`,
    `- Java replay preconditions satisfied: ${preview.summary.javaReplayPreconditionsSatisfied === undefined ? "unknown" : preview.summary.javaReplayPreconditionsSatisfied}`,
    `- Java digest verification mode: ${preview.summary.javaDigestVerificationMode ?? "unknown"}`,
    `- mini-kv EXPLAINJSON coverage: ${preview.summary.miniKvExplainCoverage}`,
    `- mini-kv command digest: ${preview.summary.miniKvCommandDigest ?? "unknown"}`,
    `- mini-kv side_effect_count: ${preview.summary.miniKvSideEffectCount ?? "unknown"}`,
    `- mini-kv CHECKJSON contract: ${preview.summary.miniKvExecutionContractStatus}`,
    `- mini-kv CHECKJSON read_only: ${preview.summary.miniKvCheckReadOnly === undefined ? "unknown" : preview.summary.miniKvCheckReadOnly}`,
    `- mini-kv CHECKJSON execution_allowed: ${preview.summary.miniKvCheckExecutionAllowed === undefined ? "unknown" : preview.summary.miniKvCheckExecutionAllowed}`,
    `- mini-kv CHECKJSON durability: ${preview.summary.miniKvCheckDurability ?? "unknown"}`,
    `- Hard blocker count: ${preview.summary.hardBlockerCount}`,
    `- Warning count: ${preview.summary.warningCount}`,
    "",
    "## Gate Checks",
    "",
    `- Request approved: ${preview.gateChecks.requestApproved}`,
    `- Decision approved: ${preview.gateChecks.decisionApproved}`,
    `- Handoff ready: ${preview.gateChecks.handoffReady}`,
    `- Evidence verification valid: ${preview.gateChecks.evidenceVerificationValid}`,
    `- Upstream untouched: ${preview.gateChecks.upstreamUntouched}`,
    `- No request hard blockers: ${preview.gateChecks.noRequestHardBlockers}`,
    `- Required upstream evidence available: ${preview.gateChecks.requiredUpstreamEvidenceAvailable}`,
    `- Java approved for replay ok: ${preview.gateChecks.javaApprovedForReplayOk}`,
    `- Java approval digest evidence valid: ${preview.gateChecks.javaApprovalDigestEvidenceValid}`,
    `- Java execution contract evidence valid: ${preview.gateChecks.javaExecutionContractEvidenceValid}`,
    `- Java replay preconditions satisfied ok: ${preview.gateChecks.javaReplayPreconditionsSatisfiedOk}`,
    `- mini-kv command digest evidence valid: ${preview.gateChecks.miniKvCommandDigestEvidenceValid}`,
    `- mini-kv side_effect_count matches: ${preview.gateChecks.miniKvSideEffectCountMatches}`,
    `- mini-kv execution contract evidence valid: ${preview.gateChecks.miniKvExecutionContractEvidenceValid}`,
    `- mini-kv CHECKJSON read_only ok: ${preview.gateChecks.miniKvCheckReadOnlyOk}`,
    `- mini-kv CHECKJSON execution_allowed ok: ${preview.gateChecks.miniKvCheckExecutionAllowedOk}`,
    "",
    "## Would Call",
    "",
    `- ${JSON.stringify(preview.wouldCall)}`,
    "",
    "## Hard Blockers",
    "",
    ...renderList(preview.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(preview.warnings, "No warnings."),
    "",
    "## Next Actions",
    "",
    ...renderList(preview.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createGateChecks(
  bundle: OperationApprovalHandoffBundle,
): OperationApprovalExecutionGatePreview["gateChecks"] {
  return {
    requestApproved: bundle.summary.requestStatus === "approved",
    decisionApproved: bundle.summary.decision === "approved",
    handoffReady: bundle.handoffReady,
    evidenceVerificationValid: bundle.verification.valid,
    upstreamUntouched: !bundle.summary.upstreamTouched,
    noRequestHardBlockers: bundle.report.request.hardBlockers.length === 0,
    requiredUpstreamEvidenceAvailable: requiredUpstreamEvidenceAvailable(bundle),
    javaApprovedForReplayOk: javaApprovedForReplayOk(bundle),
    javaApprovalDigestEvidenceValid: bundle.verification.checks.javaApprovalDigestEvidenceValid,
    javaExecutionContractEvidenceValid: bundle.verification.checks.javaExecutionContractEvidenceValid,
    javaReplayPreconditionsSatisfiedOk: javaReplayPreconditionsSatisfiedOk(bundle),
    miniKvCommandDigestEvidenceValid: bundle.verification.checks.miniKvCommandDigestEvidenceValid,
    miniKvSideEffectCountMatches: bundle.verification.checks.miniKvSideEffectCountMatches,
    miniKvExecutionContractEvidenceValid: bundle.verification.checks.miniKvExecutionContractEvidenceValid,
    miniKvCheckReadOnlyOk: bundle.summary.target !== "mini-kv" || bundle.summary.miniKvCheckReadOnly === true,
    miniKvCheckExecutionAllowedOk: bundle.summary.target !== "mini-kv" || bundle.summary.miniKvCheckExecutionAllowed === false,
  };
}

function collectHardBlockers(
  bundle: OperationApprovalHandoffBundle,
  checks: OperationApprovalExecutionGatePreview["gateChecks"],
): string[] {
  const blockers: string[] = [];
  if (!checks.requestApproved) {
    blockers.push(`APPROVAL_REQUEST_NOT_APPROVED:${bundle.summary.requestStatus}`);
  }
  if (!checks.decisionApproved) {
    blockers.push(`APPROVAL_DECISION_NOT_APPROVED:${bundle.summary.decision}`);
  }
  if (!checks.handoffReady) {
    blockers.push("HANDOFF_BUNDLE_NOT_READY");
  }
  if (!checks.evidenceVerificationValid) {
    blockers.push("EVIDENCE_VERIFICATION_INVALID");
  }
  if (!checks.upstreamUntouched) {
    blockers.push("UPSTREAM_ALREADY_TOUCHED");
  }
  for (const blocker of bundle.report.request.hardBlockers) {
    blockers.push(`REQUEST_HARD_BLOCKER:${blocker}`);
  }
  if (!checks.requiredUpstreamEvidenceAvailable) {
    blockers.push("REQUIRED_UPSTREAM_EVIDENCE_NOT_AVAILABLE");
  }
  if (!checks.javaApprovedForReplayOk) {
    blockers.push("JAVA_APPROVAL_STATUS_NOT_APPROVED_FOR_REPLAY");
  }
  if (!checks.javaApprovalDigestEvidenceValid) {
    blockers.push("JAVA_APPROVAL_DIGEST_EVIDENCE_INVALID");
  }
  if (!checks.javaExecutionContractEvidenceValid) {
    blockers.push("JAVA_EXECUTION_CONTRACT_EVIDENCE_INVALID");
  }
  if (!checks.javaReplayPreconditionsSatisfiedOk) {
    blockers.push("JAVA_REPLAY_PRECONDITIONS_NOT_SATISFIED");
  }
  if (!checks.miniKvCommandDigestEvidenceValid) {
    blockers.push("MINIKV_COMMAND_DIGEST_EVIDENCE_INVALID");
  }
  if (!checks.miniKvSideEffectCountMatches) {
    blockers.push("MINIKV_SIDE_EFFECT_COUNT_MISMATCH");
  }
  if (!checks.miniKvExecutionContractEvidenceValid) {
    blockers.push("MINIKV_EXECUTION_CONTRACT_EVIDENCE_INVALID");
  }
  if (!checks.miniKvCheckReadOnlyOk) {
    blockers.push("MINIKV_CHECKJSON_NOT_READ_ONLY");
  }
  if (!checks.miniKvCheckExecutionAllowedOk) {
    blockers.push("MINIKV_CHECKJSON_EXECUTION_ALLOWED");
  }
  return [...new Set(blockers)];
}

function summarizeGatePreview(
  bundle: OperationApprovalHandoffBundle,
  checks: OperationApprovalExecutionGatePreview["gateChecks"],
  hardBlockers: string[],
  warnings: string[],
): OperationApprovalExecutionGatePreview["summary"] {
  return {
    action: bundle.summary.action,
    target: bundle.summary.target,
    requestStatus: bundle.summary.requestStatus,
    decision: bundle.summary.decision,
    handoffReady: bundle.handoffReady,
    verificationValid: bundle.verification.valid,
    upstreamTouched: bundle.summary.upstreamTouched,
    requiredUpstreamEvidenceAvailable: checks.requiredUpstreamEvidenceAvailable,
    javaApprovalStatus: bundle.summary.javaApprovalStatus,
    ...(bundle.summary.javaApprovedForReplay === undefined ? {} : { javaApprovedForReplay: bundle.summary.javaApprovedForReplay }),
    ...(bundle.summary.javaApprovalDigest === undefined ? {} : { javaApprovalDigest: bundle.summary.javaApprovalDigest }),
    ...(bundle.summary.javaReplayEligibilityDigest === undefined ? {} : { javaReplayEligibilityDigest: bundle.summary.javaReplayEligibilityDigest }),
    javaExecutionContractStatus: bundle.summary.javaExecutionContractStatus,
    ...(bundle.summary.javaContractVersion === undefined ? {} : { javaContractVersion: bundle.summary.javaContractVersion }),
    ...(bundle.summary.javaContractDigest === undefined ? {} : { javaContractDigest: bundle.summary.javaContractDigest }),
    ...(bundle.summary.javaReplayPreconditionsSatisfied === undefined ? {} : { javaReplayPreconditionsSatisfied: bundle.summary.javaReplayPreconditionsSatisfied }),
    ...(bundle.summary.javaDigestVerificationMode === undefined ? {} : { javaDigestVerificationMode: bundle.summary.javaDigestVerificationMode }),
    miniKvExplainCoverage: bundle.summary.miniKvExplainCoverage,
    ...(bundle.summary.miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest: bundle.summary.miniKvCommandDigest }),
    ...(bundle.summary.miniKvSideEffectCount === undefined ? {} : { miniKvSideEffectCount: bundle.summary.miniKvSideEffectCount }),
    miniKvExecutionContractStatus: bundle.summary.miniKvExecutionContractStatus,
    ...(bundle.summary.miniKvCheckReadOnly === undefined ? {} : { miniKvCheckReadOnly: bundle.summary.miniKvCheckReadOnly }),
    ...(bundle.summary.miniKvCheckExecutionAllowed === undefined ? {} : { miniKvCheckExecutionAllowed: bundle.summary.miniKvCheckExecutionAllowed }),
    ...(bundle.summary.miniKvCheckDurability === undefined ? {} : { miniKvCheckDurability: bundle.summary.miniKvCheckDurability }),
    hardBlockerCount: hardBlockers.length,
    warningCount: warnings.length,
  };
}

function requiredUpstreamEvidenceAvailable(bundle: OperationApprovalHandoffBundle): boolean {
  if (requiresJavaApprovalStatus(bundle)) {
    return bundle.summary.javaApprovalStatus === "available" && bundle.summary.javaExecutionContractStatus === "available";
  }
  if (bundle.summary.target === "mini-kv") {
    return bundle.summary.miniKvExplainCoverage === "available" && bundle.summary.miniKvExecutionContractStatus === "available";
  }
  return true;
}

function javaApprovedForReplayOk(bundle: OperationApprovalHandoffBundle): boolean {
  return !requiresJavaApprovalStatus(bundle) || bundle.summary.javaApprovedForReplay === true;
}

function requiresJavaApprovalStatus(bundle: OperationApprovalHandoffBundle): boolean {
  return bundle.summary.target === "order-platform" && bundle.summary.action === "failed-event-replay-simulation";
}

function javaReplayPreconditionsSatisfiedOk(bundle: OperationApprovalHandoffBundle): boolean {
  return !requiresJavaApprovalStatus(bundle) || bundle.summary.javaReplayPreconditionsSatisfied === true;
}

function resolveState(hardBlockers: string[], warnings: string[]): OperationApprovalExecutionGateState {
  if (hardBlockers.length > 0) {
    return "blocked";
  }
  if (warnings.length > 0) {
    return "review-required";
  }
  return "ready";
}

function collectNextActions(
  state: OperationApprovalExecutionGateState,
  hardBlockers: string[],
  warnings: string[],
): string[] {
  if (state === "blocked") {
    return [
      `Resolve execution gate blockers before any real upstream action: ${hardBlockers.join(", ")}`,
      "Keep this as a preview-only record; orderops-node does not execute upstream writes in this flow.",
    ];
  }
  if (state === "review-required") {
    return [
      `Review execution gate warnings before any real upstream action: ${warnings.join(", ")}`,
      "Keep this as a preview-only record; orderops-node does not execute upstream writes in this flow.",
    ];
  }
  return [
    "Execution gate preview is ready for operator review.",
    "Real execution remains unimplemented in this flow and must be added behind a separate explicit approval.",
  ];
}

function digestOperationApprovalExecutionGatePreview(
  preview: Omit<OperationApprovalExecutionGatePreview, "gateDigest">,
): OperationApprovalExecutionGateDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: preview.service,
        requestId: preview.requestId,
        decisionId: preview.decisionId ?? null,
        intentId: preview.intentId,
        state: preview.state,
        previewOnly: preview.previewOnly,
        executionAllowed: preview.executionAllowed,
        bundleDigest: preview.bundleDigest,
        wouldCall: preview.wouldCall,
        summary: preview.summary,
        gateChecks: preview.gateChecks,
        hardBlockers: preview.hardBlockers,
        warnings: preview.warnings,
        nextActions: preview.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...EXECUTION_GATE_DIGEST_COVERED_FIELDS],
  };
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
