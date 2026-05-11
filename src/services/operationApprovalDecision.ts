import crypto from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OperationApprovalDigest, OperationApprovalRequest } from "./operationApprovalRequest.js";
import { OperationApprovalRequestLedger } from "./operationApprovalRequest.js";

export const operationApprovalDecisionValues = ["approved", "rejected"] as const;

export type OperationApprovalDecisionValue = (typeof operationApprovalDecisionValues)[number];

export interface OperationApprovalDecisionDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalDecision {
  service: "orderops-node";
  decisionId: string;
  requestId: string;
  intentId: string;
  action: string;
  target: string;
  previewDigest: OperationApprovalDigest;
  decision: OperationApprovalDecisionValue;
  reviewer: string;
  reason: string;
  createdAt: string;
  requestStatusBeforeDecision: OperationApprovalRequest["status"];
  requestStatusAfterDecision: OperationApprovalRequest["status"];
  upstreamTouched: false;
  expectedSideEffects: string[];
  hardBlockers: string[];
  warnings: string[];
  decisionDigest: OperationApprovalDecisionDigest;
}

export interface CreateOperationApprovalDecisionInput {
  requestId: string;
  decision: OperationApprovalDecisionValue;
  reviewer: string;
  reason?: string;
}

interface OperationApprovalDecisionLedgerOptions {
  maxItems?: number;
}

const DECISION_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "decisionId",
  "requestId",
  "intentId",
  "action",
  "target",
  "previewDigest",
  "decision",
  "reviewer",
  "reason",
  "createdAt",
  "requestStatusBeforeDecision",
  "requestStatusAfterDecision",
  "upstreamTouched",
  "expectedSideEffects",
  "hardBlockers",
  "warnings",
]);

export class OperationApprovalDecisionLedger {
  private readonly decisions = new Map<string, OperationApprovalDecision>();
  private readonly requestDecisionIndex = new Map<string, string>();
  private readonly maxItems: number;

  constructor(
    private readonly approvalRequests: OperationApprovalRequestLedger,
    options: OperationApprovalDecisionLedgerOptions = {},
  ) {
    this.maxItems = options.maxItems ?? 200;
  }

  create(input: CreateOperationApprovalDecisionInput): OperationApprovalDecision {
    const existingDecisionId = this.requestDecisionIndex.get(input.requestId);
    if (existingDecisionId !== undefined) {
      throw new AppHttpError(409, "APPROVAL_DECISION_ALREADY_RECORDED", "Approval request already has a reviewer decision", {
        requestId: input.requestId,
        decisionId: existingDecisionId,
      });
    }

    const reviewer = normalizeReviewer(input.reviewer);
    const reason = normalizeReason(input.reason);
    const requestBeforeDecision = this.approvalRequests.get(input.requestId);
    if (requestBeforeDecision.status !== "pending") {
      throw new AppHttpError(409, "APPROVAL_REQUEST_NOT_DECIDABLE", "Only pending approval requests can receive a reviewer decision", {
        requestId: input.requestId,
        status: requestBeforeDecision.status,
      });
    }

    const requestAfterDecision = this.approvalRequests.recordDecision({
      requestId: input.requestId,
      decision: input.decision,
      reviewer,
      reason,
    });
    const decisionWithoutDigest = {
      service: "orderops-node" as const,
      decisionId: crypto.randomUUID(),
      requestId: requestBeforeDecision.requestId,
      intentId: requestBeforeDecision.intentId,
      action: requestBeforeDecision.action,
      target: requestBeforeDecision.target,
      previewDigest: structuredClone(requestBeforeDecision.previewDigest),
      decision: input.decision,
      reviewer,
      reason,
      createdAt: new Date().toISOString(),
      requestStatusBeforeDecision: requestBeforeDecision.status,
      requestStatusAfterDecision: requestAfterDecision.status,
      upstreamTouched: false as const,
      expectedSideEffects: [...requestBeforeDecision.expectedSideEffects],
      hardBlockers: [...requestBeforeDecision.hardBlockers],
      warnings: [...requestBeforeDecision.warnings],
    };
    const decision: OperationApprovalDecision = {
      ...decisionWithoutDigest,
      decisionDigest: digestOperationApprovalDecision(decisionWithoutDigest),
    };

    this.decisions.set(decision.decisionId, decision);
    this.requestDecisionIndex.set(decision.requestId, decision.decisionId);
    this.trim();
    return cloneDecision(decision);
  }

  list(limit = 20): OperationApprovalDecision[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.decisions.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, safeLimit)
      .map(cloneDecision);
  }

  get(decisionId: string): OperationApprovalDecision {
    const decision = this.decisions.get(decisionId);
    if (!decision) {
      throw new AppHttpError(404, "APPROVAL_DECISION_NOT_FOUND", "Operation approval decision was not found", {
        decisionId,
      });
    }

    return cloneDecision(decision);
  }

  getByRequest(requestId: string): OperationApprovalDecision | undefined {
    const decisionId = this.requestDecisionIndex.get(requestId);
    if (decisionId === undefined) {
      return undefined;
    }

    const decision = this.decisions.get(decisionId);
    return decision === undefined ? undefined : cloneDecision(decision);
  }

  private trim(): void {
    if (this.decisions.size <= this.maxItems) {
      return;
    }

    const oldest = [...this.decisions.values()].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    for (const decision of oldest.slice(0, this.decisions.size - this.maxItems)) {
      this.decisions.delete(decision.decisionId);
      this.requestDecisionIndex.delete(decision.requestId);
    }
  }
}

export function digestOperationApprovalDecision(
  decision: Omit<OperationApprovalDecision, "decisionDigest">,
): OperationApprovalDecisionDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: decision.service,
        decisionId: decision.decisionId,
        requestId: decision.requestId,
        intentId: decision.intentId,
        action: decision.action,
        target: decision.target,
        previewDigest: decision.previewDigest,
        decision: decision.decision,
        reviewer: decision.reviewer,
        reason: decision.reason,
        createdAt: decision.createdAt,
        requestStatusBeforeDecision: decision.requestStatusBeforeDecision,
        requestStatusAfterDecision: decision.requestStatusAfterDecision,
        upstreamTouched: decision.upstreamTouched,
        expectedSideEffects: decision.expectedSideEffects,
        hardBlockers: decision.hardBlockers,
        warnings: decision.warnings,
      }))
      .digest("hex"),
    coveredFields: [...DECISION_DIGEST_COVERED_FIELDS],
  };
}

export function renderOperationApprovalDecisionMarkdown(decision: OperationApprovalDecision): string {
  return [
    "# Operation approval decision",
    "",
    `- Service: ${decision.service}`,
    `- Decision id: ${decision.decisionId}`,
    `- Request id: ${decision.requestId}`,
    `- Intent id: ${decision.intentId}`,
    `- Action: ${decision.action}`,
    `- Target: ${decision.target}`,
    `- Decision: ${decision.decision}`,
    `- Reviewer: ${decision.reviewer}`,
    `- Reason: ${decision.reason}`,
    `- Created at: ${decision.createdAt}`,
    `- Upstream touched: ${decision.upstreamTouched}`,
    "",
    "## Evidence Digests",
    "",
    `- Preview digest: ${decision.previewDigest.algorithm}:${decision.previewDigest.value}`,
    `- Decision digest: ${decision.decisionDigest.algorithm}:${decision.decisionDigest.value}`,
    `- Request status before decision: ${decision.requestStatusBeforeDecision}`,
    `- Request status after decision: ${decision.requestStatusAfterDecision}`,
    "",
    "## Expected Side Effects",
    "",
    ...renderList(decision.expectedSideEffects, "No expected side effects."),
    "",
    "## Hard Blockers",
    "",
    ...renderList(decision.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(decision.warnings, "No warnings."),
    "",
  ].join("\n");
}

function normalizeReviewer(reviewer: string): string {
  const normalized = reviewer.trim();
  if (normalized.length === 0 || normalized.length > 80) {
    throw new AppHttpError(400, "INVALID_APPROVAL_REVIEWER", "reviewer must be 1-80 characters");
  }

  return normalized;
}

function normalizeReason(reason: string | undefined): string {
  const normalized = reason?.trim();
  return normalized && normalized.length > 0 ? normalized.slice(0, 400) : "local approval decision";
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

function cloneDecision(decision: OperationApprovalDecision): OperationApprovalDecision {
  return structuredClone(decision);
}
