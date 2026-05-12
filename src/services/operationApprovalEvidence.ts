import crypto from "node:crypto";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
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
import type { EvidenceRecord } from "./operationPreflight.js";

export type OperationApprovalEvidenceState = "missing-decision" | "approved" | "rejected";

export interface OperationApprovalEvidenceDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalUpstreamEvidence {
  javaApprovalStatus: EvidenceRecord;
  miniKvExplainCoverage: EvidenceRecord;
  javaExecutionContract: EvidenceRecord;
  miniKvExecutionContract: EvidenceRecord;
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
    javaApprovalStatus: EvidenceRecord["status"];
    javaApprovedForReplay?: boolean;
    javaEvidenceVersion?: string;
    javaApprovalDigest?: string;
    javaReplayEligibilityDigest?: string;
    javaExecutionContractStatus: EvidenceRecord["status"];
    javaContractVersion?: string;
    javaContractDigest?: string;
    javaReplayPreconditionsSatisfied?: boolean;
    javaDigestVerificationMode?: string;
    miniKvExplainCoverage: EvidenceRecord["status"];
    miniKvSideEffects: string[];
    miniKvSchemaVersion?: number;
    miniKvCommandDigest?: string;
    miniKvSideEffectCount?: number;
    miniKvExecutionContractStatus: EvidenceRecord["status"];
    miniKvCheckReadOnly?: boolean;
    miniKvCheckExecutionAllowed?: boolean;
    miniKvCheckDurability?: string;
  };
  request: OperationApprovalRequest;
  decision?: OperationApprovalDecision;
  upstreamEvidence: OperationApprovalUpstreamEvidence;
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
    upstreamEvidenceMatchesSummary: boolean;
    javaApprovalDigestEvidenceValid: boolean;
    javaExecutionContractEvidenceValid: boolean;
    miniKvCommandDigestEvidenceValid: boolean;
    miniKvSideEffectCountMatches: boolean;
    miniKvExecutionContractEvidenceValid: boolean;
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
  "upstreamEvidence",
  "nextActions",
]);

export class OperationApprovalEvidenceService {
  constructor(
    private readonly config: AppConfig,
    private readonly orderPlatform: OrderPlatformClient,
    private readonly miniKv: MiniKvClient,
  ) {}

  async createReport(
    request: OperationApprovalRequest,
    decision: OperationApprovalDecision | undefined,
  ): Promise<OperationApprovalEvidenceReport> {
    const upstreamEvidence = {
      javaApprovalStatus: await this.collectJavaApprovalStatus(request),
      miniKvExplainCoverage: await this.collectMiniKvExplainCoverage(request),
      javaExecutionContract: await this.collectJavaExecutionContract(request),
      miniKvExecutionContract: await this.collectMiniKvExecutionContract(request),
    };
    return createOperationApprovalEvidenceReport(request, decision, upstreamEvidence);
  }

  private async collectJavaApprovalStatus(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "order-platform" || request.action !== "failed-event-replay-simulation") {
      return {
        status: "not_applicable",
        message: "Approval request does not target Java failed-event approval status.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java approval-status evidence was not requested.",
      };
    }

    const failedEventId = inferFailedEventId(request);
    if (failedEventId === undefined) {
      return {
        status: "missing_context",
        message: "No failedEventId was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventApprovalStatus(failedEventId);
      return {
        status: "available",
        message: "Java failed-event approval-status evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          failedEventId,
          approvalStatus: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvExplainCoverage(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Approval request does not target mini-kv EXPLAINJSON coverage.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv EXPLAINJSON coverage was not requested.",
      };
    }

    const command = inferMiniKvExplainCommand(request);
    if (command === undefined) {
      return {
        status: "missing_context",
        message: "No mini-kv command was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.miniKv.explainJson(command);
      const sideEffects = Array.isArray(response.explanation.side_effects) ? response.explanation.side_effects : [];
      return {
        status: "available",
        message: "mini-kv EXPLAINJSON coverage evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          command,
          explanation: response.explanation,
          sideEffects,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectJavaExecutionContract(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "order-platform" || request.action !== "failed-event-replay-simulation") {
      return {
        status: "not_applicable",
        message: "Approval request does not target Java failed-event execution contract.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; Java replay execution contract was not requested.",
      };
    }

    const failedEventId = inferFailedEventId(request);
    if (failedEventId === undefined) {
      return {
        status: "missing_context",
        message: "No failedEventId was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.orderPlatform.failedEventReplayExecutionContract(failedEventId);
      return {
        status: "available",
        message: "Java failed-event replay execution contract evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          failedEventId,
          executionContract: response.data,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private async collectMiniKvExecutionContract(request: OperationApprovalRequest): Promise<EvidenceRecord> {
    if (request.target !== "mini-kv") {
      return {
        status: "not_applicable",
        message: "Approval request does not target mini-kv CHECKJSON execution contract.",
      };
    }
    if (!this.config.upstreamProbesEnabled) {
      return {
        status: "skipped",
        message: "UPSTREAM_PROBES_ENABLED=false; mini-kv CHECKJSON execution contract was not requested.",
      };
    }

    const command = inferMiniKvExplainCommand(request);
    if (command === undefined) {
      return {
        status: "missing_context",
        message: "No mini-kv command was found in the stored execution preview evidence.",
      };
    }

    try {
      const response = await this.miniKv.checkJson(command);
      return {
        status: "available",
        message: "mini-kv CHECKJSON execution contract evidence collected.",
        details: {
          latencyMs: response.latencyMs,
          command,
          contract: response.contract,
        },
      };
    } catch (error) {
      return {
        status: "unavailable",
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }
}

export function createOperationApprovalEvidenceReport(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
  upstreamEvidence: OperationApprovalUpstreamEvidence = defaultUpstreamEvidence(),
): OperationApprovalEvidenceReport {
  const state = resolveEvidenceState(decision);
  const summary = summarizeEvidence(request, decision, upstreamEvidence);
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
    upstreamEvidence,
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
  const recomputed = createOperationApprovalEvidenceReport(report.request, report.decision, report.upstreamEvidence);
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
    upstreamEvidenceMatchesSummary: summaryMatchesUpstreamEvidence(report.summary, report.upstreamEvidence),
    javaApprovalDigestEvidenceValid: javaApprovalDigestEvidenceValid(report.upstreamEvidence.javaApprovalStatus),
    javaExecutionContractEvidenceValid: javaExecutionContractEvidenceValid(report.upstreamEvidence.javaExecutionContract),
    miniKvCommandDigestEvidenceValid: miniKvCommandDigestEvidenceValid(report.upstreamEvidence.miniKvExplainCoverage),
    miniKvSideEffectCountMatches: miniKvSideEffectCountMatches(report.upstreamEvidence.miniKvExplainCoverage),
    miniKvExecutionContractEvidenceValid: miniKvExecutionContractEvidenceValid(report.upstreamEvidence.miniKvExecutionContract),
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
    "## Upstream Evidence",
    "",
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
    `- Upstream evidence matches summary: ${verification.checks.upstreamEvidenceMatchesSummary}`,
    `- Java approval digest evidence valid: ${verification.checks.javaApprovalDigestEvidenceValid}`,
    `- Java execution contract evidence valid: ${verification.checks.javaExecutionContractEvidenceValid}`,
    `- mini-kv command digest evidence valid: ${verification.checks.miniKvCommandDigestEvidenceValid}`,
    `- mini-kv side_effect_count matches: ${verification.checks.miniKvSideEffectCountMatches}`,
    `- mini-kv execution contract evidence valid: ${verification.checks.miniKvExecutionContractEvidenceValid}`,
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
        upstreamEvidence: report.upstreamEvidence,
        nextActions: report.nextActions,
      }))
      .digest("hex"),
    coveredFields: [...EVIDENCE_DIGEST_COVERED_FIELDS],
  };
}

function summarizeEvidence(
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
  upstreamEvidence: OperationApprovalUpstreamEvidence,
): OperationApprovalEvidenceReport["summary"] {
  const javaApprovedForReplay = readJavaApprovedForReplay(upstreamEvidence.javaApprovalStatus.details);
  const javaEvidenceVersion = readJavaEvidenceVersion(upstreamEvidence.javaApprovalStatus.details);
  const javaApprovalDigest = readJavaApprovalDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaReplayEligibilityDigest = readJavaReplayEligibilityDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaContractVersion = readJavaContractVersion(upstreamEvidence.javaExecutionContract.details);
  const javaContractDigest = readJavaContractDigest(upstreamEvidence.javaExecutionContract.details);
  const javaReplayPreconditionsSatisfied = readJavaReplayPreconditionsSatisfied(upstreamEvidence.javaExecutionContract.details);
  const javaDigestVerificationMode = readJavaDigestVerificationMode(upstreamEvidence.javaExecutionContract.details);
  const miniKvSchemaVersion = readMiniKvSchemaVersion(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCommandDigest = readMiniKvCommandDigest(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvSideEffectCount = readMiniKvSideEffectCount(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCheckReadOnly = readMiniKvCheckReadOnly(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckExecutionAllowed = readMiniKvCheckExecutionAllowed(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckDurability = readMiniKvCheckDurability(upstreamEvidence.miniKvExecutionContract.details);
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
    javaApprovalStatus: upstreamEvidence.javaApprovalStatus.status,
    ...(javaApprovedForReplay === undefined ? {} : { javaApprovedForReplay }),
    ...(javaEvidenceVersion === undefined ? {} : { javaEvidenceVersion }),
    ...(javaApprovalDigest === undefined ? {} : { javaApprovalDigest }),
    ...(javaReplayEligibilityDigest === undefined ? {} : { javaReplayEligibilityDigest }),
    javaExecutionContractStatus: upstreamEvidence.javaExecutionContract.status,
    ...(javaContractVersion === undefined ? {} : { javaContractVersion }),
    ...(javaContractDigest === undefined ? {} : { javaContractDigest }),
    ...(javaReplayPreconditionsSatisfied === undefined ? {} : { javaReplayPreconditionsSatisfied }),
    ...(javaDigestVerificationMode === undefined ? {} : { javaDigestVerificationMode }),
    miniKvExplainCoverage: upstreamEvidence.miniKvExplainCoverage.status,
    miniKvSideEffects: readMiniKvSideEffects(upstreamEvidence.miniKvExplainCoverage.details),
    ...(miniKvSchemaVersion === undefined ? {} : { miniKvSchemaVersion }),
    ...(miniKvCommandDigest === undefined ? {} : { miniKvCommandDigest }),
    ...(miniKvSideEffectCount === undefined ? {} : { miniKvSideEffectCount }),
    miniKvExecutionContractStatus: upstreamEvidence.miniKvExecutionContract.status,
    ...(miniKvCheckReadOnly === undefined ? {} : { miniKvCheckReadOnly }),
    ...(miniKvCheckExecutionAllowed === undefined ? {} : { miniKvCheckExecutionAllowed }),
    ...(miniKvCheckDurability === undefined ? {} : { miniKvCheckDurability }),
  };
}

function defaultUpstreamEvidence(): OperationApprovalUpstreamEvidence {
  return {
    javaApprovalStatus: {
      status: "not_applicable",
      message: "No Java approval-status evidence was attached.",
    },
    miniKvExplainCoverage: {
      status: "not_applicable",
      message: "No mini-kv EXPLAINJSON coverage evidence was attached.",
    },
    javaExecutionContract: {
      status: "not_applicable",
      message: "No Java execution contract evidence was attached.",
    },
    miniKvExecutionContract: {
      status: "not_applicable",
      message: "No mini-kv CHECKJSON execution contract evidence was attached.",
    },
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

function inferFailedEventId(request: OperationApprovalRequest): string | undefined {
  return readFailedEventId(request.preview.evidence.javaReplaySimulation.details)
    ?? readFailedEventId(request.preview.preflightReport.preflight.evidence.javaReplayReadiness.details);
}

function readFailedEventId(details: unknown): string | undefined {
  if (!isRecord(details)) {
    return undefined;
  }

  return normalizeFailedEventId(details.failedEventId)
    ?? (isRecord(details.simulation) ? normalizeFailedEventId(details.simulation.failedEventId) : undefined)
    ?? (isRecord(details.readiness) ? normalizeFailedEventId(details.readiness.failedEventId) : undefined)
    ?? (isRecord(details.approvalStatus) ? normalizeFailedEventId(details.approvalStatus.failedEventId) : undefined);
}

function normalizeFailedEventId(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) {
    return String(value);
  }
  if (typeof value === "string" && /^[0-9]+$/.test(value.trim())) {
    return value.trim();
  }
  return undefined;
}

function inferMiniKvExplainCommand(request: OperationApprovalRequest): string | undefined {
  const details = request.preview.evidence.miniKvCommandExplain.details;
  if (!isRecord(details) || typeof details.command !== "string") {
    return undefined;
  }

  const command = details.command.trim();
  return command.length === 0 ? undefined : command;
}

function readJavaApprovedForReplay(details: unknown): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.approvalStatus)) {
    return undefined;
  }
  return typeof details.approvalStatus.approvedForReplay === "boolean"
    ? details.approvalStatus.approvedForReplay
    : undefined;
}

function readJavaEvidenceVersion(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "evidenceVersion");
}

function readJavaApprovalDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "approvalDigest");
}

function readJavaReplayEligibilityDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "approvalStatus", "replayEligibilityDigest");
}

function readJavaContractVersion(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "contractVersion");
}

function readJavaContractDigest(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "contractDigest");
}

function readJavaReplayPreconditionsSatisfied(details: unknown): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.executionContract)) {
    return undefined;
  }
  const value = details.executionContract.replayPreconditionsSatisfied;
  return typeof value === "boolean" ? value : undefined;
}

function readJavaDigestVerificationMode(details: unknown): string | undefined {
  return readStringFieldFromNestedRecord(details, "executionContract", "digestVerificationMode");
}

function readMiniKvSideEffects(details: unknown): string[] {
  if (!isRecord(details)) {
    return [];
  }
  const direct = readStringArray(details.sideEffects);
  if (direct.length > 0) {
    return direct;
  }
  if (isRecord(details.explanation)) {
    return readStringArray(details.explanation.side_effects);
  }
  return [];
}

function readMiniKvSchemaVersion(details: unknown): number | undefined {
  return readNumberFieldFromMiniKvExplain(details, "schema_version");
}

function readMiniKvCommandDigest(details: unknown): string | undefined {
  return readStringFieldFromMiniKvExplain(details, "command_digest");
}

function readMiniKvSideEffectCount(details: unknown): number | undefined {
  if (!isRecord(details)) {
    return undefined;
  }
  if (typeof details.sideEffectCount === "number" && Number.isFinite(details.sideEffectCount)) {
    return details.sideEffectCount;
  }
  return readNumberFieldFromMiniKvExplain(details, "side_effect_count");
}

function readMiniKvCheckReadOnly(details: unknown): boolean | undefined {
  return readBooleanFieldFromMiniKvContract(details, "read_only");
}

function readMiniKvCheckExecutionAllowed(details: unknown): boolean | undefined {
  return readBooleanFieldFromMiniKvContract(details, "execution_allowed");
}

function readMiniKvCheckDurability(details: unknown): string | undefined {
  if (!isRecord(details) || !isRecord(details.contract) || !isRecord(details.contract.wal)) {
    return undefined;
  }
  const value = details.contract.wal.durability;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function summaryMatchesUpstreamEvidence(
  summary: OperationApprovalEvidenceReport["summary"],
  upstreamEvidence: OperationApprovalUpstreamEvidence,
): boolean {
  const javaApprovedForReplay = readJavaApprovedForReplay(upstreamEvidence.javaApprovalStatus.details);
  const javaEvidenceVersion = readJavaEvidenceVersion(upstreamEvidence.javaApprovalStatus.details);
  const javaApprovalDigest = readJavaApprovalDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaReplayEligibilityDigest = readJavaReplayEligibilityDigest(upstreamEvidence.javaApprovalStatus.details);
  const javaContractVersion = readJavaContractVersion(upstreamEvidence.javaExecutionContract.details);
  const javaContractDigest = readJavaContractDigest(upstreamEvidence.javaExecutionContract.details);
  const javaReplayPreconditionsSatisfied = readJavaReplayPreconditionsSatisfied(upstreamEvidence.javaExecutionContract.details);
  const javaDigestVerificationMode = readJavaDigestVerificationMode(upstreamEvidence.javaExecutionContract.details);
  const miniKvSchemaVersion = readMiniKvSchemaVersion(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCommandDigest = readMiniKvCommandDigest(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvSideEffectCount = readMiniKvSideEffectCount(upstreamEvidence.miniKvExplainCoverage.details);
  const miniKvCheckReadOnly = readMiniKvCheckReadOnly(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckExecutionAllowed = readMiniKvCheckExecutionAllowed(upstreamEvidence.miniKvExecutionContract.details);
  const miniKvCheckDurability = readMiniKvCheckDurability(upstreamEvidence.miniKvExecutionContract.details);
  return summary.javaApprovalStatus === upstreamEvidence.javaApprovalStatus.status
    && (javaApprovedForReplay === undefined
      ? summary.javaApprovedForReplay === undefined
      : summary.javaApprovedForReplay === javaApprovedForReplay)
    && (javaEvidenceVersion === undefined
      ? summary.javaEvidenceVersion === undefined
      : summary.javaEvidenceVersion === javaEvidenceVersion)
    && (javaApprovalDigest === undefined
      ? summary.javaApprovalDigest === undefined
      : summary.javaApprovalDigest === javaApprovalDigest)
    && (javaReplayEligibilityDigest === undefined
      ? summary.javaReplayEligibilityDigest === undefined
      : summary.javaReplayEligibilityDigest === javaReplayEligibilityDigest)
    && summary.javaExecutionContractStatus === upstreamEvidence.javaExecutionContract.status
    && (javaContractVersion === undefined
      ? summary.javaContractVersion === undefined
      : summary.javaContractVersion === javaContractVersion)
    && (javaContractDigest === undefined
      ? summary.javaContractDigest === undefined
      : summary.javaContractDigest === javaContractDigest)
    && (javaReplayPreconditionsSatisfied === undefined
      ? summary.javaReplayPreconditionsSatisfied === undefined
      : summary.javaReplayPreconditionsSatisfied === javaReplayPreconditionsSatisfied)
    && (javaDigestVerificationMode === undefined
      ? summary.javaDigestVerificationMode === undefined
      : summary.javaDigestVerificationMode === javaDigestVerificationMode)
    && summary.miniKvExplainCoverage === upstreamEvidence.miniKvExplainCoverage.status
    && stableJson(summary.miniKvSideEffects) === stableJson(readMiniKvSideEffects(upstreamEvidence.miniKvExplainCoverage.details))
    && (miniKvSchemaVersion === undefined
      ? summary.miniKvSchemaVersion === undefined
      : summary.miniKvSchemaVersion === miniKvSchemaVersion)
    && (miniKvCommandDigest === undefined
      ? summary.miniKvCommandDigest === undefined
      : summary.miniKvCommandDigest === miniKvCommandDigest)
    && (miniKvSideEffectCount === undefined
      ? summary.miniKvSideEffectCount === undefined
      : summary.miniKvSideEffectCount === miniKvSideEffectCount)
    && summary.miniKvExecutionContractStatus === upstreamEvidence.miniKvExecutionContract.status
    && (miniKvCheckReadOnly === undefined
      ? summary.miniKvCheckReadOnly === undefined
      : summary.miniKvCheckReadOnly === miniKvCheckReadOnly)
    && (miniKvCheckExecutionAllowed === undefined
      ? summary.miniKvCheckExecutionAllowed === undefined
      : summary.miniKvCheckExecutionAllowed === miniKvCheckExecutionAllowed)
    && (miniKvCheckDurability === undefined
      ? summary.miniKvCheckDurability === undefined
      : summary.miniKvCheckDurability === miniKvCheckDurability);
}

function javaApprovalDigestEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const evidenceVersion = readJavaEvidenceVersion(evidence.details);
  const approvalDigest = readJavaApprovalDigest(evidence.details);
  const replayEligibilityDigest = readJavaReplayEligibilityDigest(evidence.details);
  return evidenceVersion === "failed-event-approval-status.v1"
    && isSha256Digest(approvalDigest)
    && isSha256Digest(replayEligibilityDigest);
}

function javaExecutionContractEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const contractVersion = readJavaContractVersion(evidence.details);
  const contractDigest = readJavaContractDigest(evidence.details);
  const digestVerificationMode = readJavaDigestVerificationMode(evidence.details);
  return contractVersion === "failed-event-replay-execution-contract.v1"
    && isSha256Digest(contractDigest)
    && digestVerificationMode === "CLIENT_PRECHECK_ONLY";
}

function miniKvCommandDigestEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const schemaVersion = readMiniKvSchemaVersion(evidence.details);
  const commandDigest = readMiniKvCommandDigest(evidence.details);
  return Number.isInteger(schemaVersion)
    && schemaVersion !== undefined
    && schemaVersion > 0
    && isFnv1a64Digest(commandDigest);
}

function miniKvSideEffectCountMatches(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const count = readMiniKvSideEffectCount(evidence.details);
  return Number.isInteger(count) && count === readMiniKvSideEffects(evidence.details).length;
}

function miniKvExecutionContractEvidenceValid(evidence: EvidenceRecord): boolean {
  if (evidence.status !== "available") {
    return true;
  }

  const schemaVersion = readNumberFieldFromMiniKvContract(evidence.details, "schema_version");
  const commandDigest = readStringFieldFromMiniKvContract(evidence.details, "command_digest");
  const readOnly = readMiniKvCheckReadOnly(evidence.details);
  const executionAllowed = readMiniKvCheckExecutionAllowed(evidence.details);
  const sideEffectCount = readNumberFieldFromMiniKvContract(evidence.details, "side_effect_count");
  const sideEffects = readStringArrayFromMiniKvContract(evidence.details, "side_effects");
  return Number.isInteger(schemaVersion)
    && schemaVersion !== undefined
    && schemaVersion > 0
    && isFnv1a64Digest(commandDigest)
    && readOnly === true
    && executionAllowed === false
    && Number.isInteger(sideEffectCount)
    && sideEffectCount === sideEffects.length;
}

function readStringFieldFromNestedRecord(details: unknown, nestedField: string, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details[nestedField])) {
    return undefined;
  }
  const value = details[nestedField][field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readStringFieldFromMiniKvExplain(details: unknown, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details.explanation)) {
    return undefined;
  }
  const value = details.explanation[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumberFieldFromMiniKvExplain(details: unknown, field: string): number | undefined {
  if (!isRecord(details) || !isRecord(details.explanation)) {
    return undefined;
  }
  const value = details.explanation[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readStringFieldFromMiniKvContract(details: unknown, field: string): string | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumberFieldFromMiniKvContract(details: unknown, field: string): number | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBooleanFieldFromMiniKvContract(details: unknown, field: string): boolean | undefined {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return undefined;
  }
  const value = details.contract[field];
  return typeof value === "boolean" ? value : undefined;
}

function readStringArrayFromMiniKvContract(details: unknown, field: string): string[] {
  if (!isRecord(details) || !isRecord(details.contract)) {
    return [];
  }
  return readStringArray(details.contract[field]);
}

function isSha256Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/i.test(value);
}

function isFnv1a64Digest(value: string | undefined): boolean {
  return typeof value === "string" && /^fnv1a64:[a-f0-9]{16}$/i.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
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
