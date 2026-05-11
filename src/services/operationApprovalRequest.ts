import crypto from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OperationExecutionPreview } from "./operationExecutionPreview.js";

export type OperationApprovalRequestStatus = "pending" | "approved" | "rejected" | "expired";

export interface OperationApprovalDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface OperationApprovalRequest {
  service: "orderops-node";
  requestId: string;
  intentId: string;
  action: string;
  target: string;
  requestedBy: string;
  reviewer: string;
  status: OperationApprovalRequestStatus;
  decisionReason: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  preflightDigest: OperationExecutionPreview["preflightDigest"];
  previewDigest: OperationApprovalDigest;
  preflightState: OperationExecutionPreview["preflightState"];
  previewState: OperationExecutionPreview["state"];
  readyForApprovalRequest: boolean;
  hardBlockers: string[];
  warnings: string[];
  expectedSideEffects: string[];
  preview: OperationExecutionPreview;
}

export interface CreateOperationApprovalRequestInput {
  preview: OperationExecutionPreview;
  requestedBy?: string;
  reviewer?: string;
  decisionReason?: string;
}

export interface RecordOperationApprovalDecisionInput {
  requestId: string;
  decision: Extract<OperationApprovalRequestStatus, "approved" | "rejected">;
  reviewer: string;
  reason: string;
}

interface OperationApprovalRequestLedgerOptions {
  ttlMs?: number;
  maxItems?: number;
}

const PREVIEW_DIGEST_COVERED_FIELDS = Object.freeze([
  "service",
  "intentId",
  "action",
  "target",
  "state",
  "preflightDigest",
  "preflightState",
  "wouldCall",
  "evidence",
  "expectedSideEffects",
  "hardBlockers",
  "warnings",
  "nextActions",
  "readyForApprovalRequest",
]);

export class OperationApprovalRequestLedger {
  private readonly requests = new Map<string, OperationApprovalRequest>();
  private readonly ttlMs: number;
  private readonly maxItems: number;

  constructor(options: OperationApprovalRequestLedgerOptions = {}) {
    this.ttlMs = options.ttlMs ?? 10 * 60 * 1000;
    this.maxItems = options.maxItems ?? 200;
  }

  create(input: CreateOperationApprovalRequestInput): OperationApprovalRequest {
    const now = new Date();
    const status: OperationApprovalRequestStatus = input.preview.readyForApprovalRequest ? "pending" : "rejected";
    const request: OperationApprovalRequest = {
      service: "orderops-node",
      requestId: crypto.randomUUID(),
      intentId: input.preview.intentId,
      action: input.preview.action,
      target: input.preview.target,
      requestedBy: normalizeHuman(input.requestedBy ?? input.preview.preflightReport.summary.operatorId, "requestedBy"),
      reviewer: normalizeHuman(input.reviewer ?? "unassigned", "reviewer"),
      status,
      decisionReason: normalizeDecisionReason(input.decisionReason) ?? defaultDecisionReason(status, input.preview),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + this.ttlMs).toISOString(),
      preflightDigest: structuredClone(input.preview.preflightDigest),
      previewDigest: digestOperationExecutionPreview(input.preview),
      preflightState: input.preview.preflightState,
      previewState: input.preview.state,
      readyForApprovalRequest: input.preview.readyForApprovalRequest,
      hardBlockers: [...input.preview.hardBlockers],
      warnings: [...input.preview.warnings],
      expectedSideEffects: [...input.preview.expectedSideEffects],
      preview: structuredClone(input.preview),
    };

    this.requests.set(request.requestId, request);
    this.trim();
    return cloneRequest(request);
  }

  list(limit = 20): OperationApprovalRequest[] {
    this.expireStale(new Date());
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.maxItems);
    return [...this.requests.values()]
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .slice(0, safeLimit)
      .map(cloneRequest);
  }

  get(requestId: string): OperationApprovalRequest {
    this.expireStale(new Date());
    const request = this.requireRequest(requestId);
    return cloneRequest(request);
  }

  recordDecision(input: RecordOperationApprovalDecisionInput): OperationApprovalRequest {
    this.expireStale(new Date());
    const request = this.requireRequest(input.requestId);
    if (request.status !== "pending") {
      throw new AppHttpError(409, "APPROVAL_REQUEST_NOT_DECIDABLE", "Only pending approval requests can receive a reviewer decision", {
        requestId: input.requestId,
        status: request.status,
      });
    }

    const now = new Date().toISOString();
    request.status = input.decision;
    request.reviewer = normalizeHuman(input.reviewer, "reviewer");
    request.decisionReason = normalizeDecisionReason(input.reason) ?? defaultDecisionReason(input.decision, request.preview);
    request.updatedAt = now;
    return cloneRequest(request);
  }

  private expireStale(now: Date): void {
    for (const request of this.requests.values()) {
      this.expireIfNeeded(request, now);
    }
  }

  private requireRequest(requestId: string): OperationApprovalRequest {
    const request = this.requests.get(requestId);
    if (!request) {
      throw new AppHttpError(404, "APPROVAL_REQUEST_NOT_FOUND", "Operation approval request was not found", {
        requestId,
      });
    }

    return request;
  }

  private expireIfNeeded(request: OperationApprovalRequest, now: Date): void {
    if (request.status === "pending" && Date.parse(request.expiresAt) <= now.getTime()) {
      request.status = "expired";
      request.updatedAt = now.toISOString();
      request.decisionReason = "Approval request expired before a reviewer decision was recorded.";
    }
  }

  private trim(): void {
    if (this.requests.size <= this.maxItems) {
      return;
    }

    const oldest = [...this.requests.values()].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    for (const request of oldest.slice(0, this.requests.size - this.maxItems)) {
      this.requests.delete(request.requestId);
    }
  }
}

export function digestOperationExecutionPreview(preview: OperationExecutionPreview): OperationApprovalDigest {
  return {
    algorithm: "sha256",
    value: crypto.createHash("sha256")
      .update(stableJson({
        service: preview.service,
        intentId: preview.intentId,
        action: preview.action,
        target: preview.target,
        state: preview.state,
        preflightDigest: preview.preflightDigest,
        preflightState: preview.preflightState,
        wouldCall: preview.wouldCall,
        evidence: preview.evidence,
        expectedSideEffects: preview.expectedSideEffects,
        hardBlockers: preview.hardBlockers,
        warnings: preview.warnings,
        nextActions: preview.nextActions,
        readyForApprovalRequest: preview.readyForApprovalRequest,
      }))
      .digest("hex"),
    coveredFields: [...PREVIEW_DIGEST_COVERED_FIELDS],
  };
}

export function renderOperationApprovalRequestMarkdown(request: OperationApprovalRequest): string {
  return [
    "# Operation approval request",
    "",
    `- Service: ${request.service}`,
    `- Request id: ${request.requestId}`,
    `- Intent id: ${request.intentId}`,
    `- Action: ${request.action}`,
    `- Target: ${request.target}`,
    `- Status: ${request.status}`,
    `- Requested by: ${request.requestedBy}`,
    `- Reviewer: ${request.reviewer}`,
    `- Created at: ${request.createdAt}`,
    `- Expires at: ${request.expiresAt}`,
    `- Decision reason: ${request.decisionReason}`,
    "",
    "## Evidence Digests",
    "",
    `- Preflight digest: ${request.preflightDigest.algorithm}:${request.preflightDigest.value}`,
    `- Preview digest: ${request.previewDigest.algorithm}:${request.previewDigest.value}`,
    `- Preflight state: ${request.preflightState}`,
    `- Preview state: ${request.previewState}`,
    `- Ready for approval request: ${request.readyForApprovalRequest}`,
    "",
    "## Expected Side Effects",
    "",
    ...renderList(request.expectedSideEffects, "No expected side effects."),
    "",
    "## Hard Blockers",
    "",
    ...renderList(request.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(request.warnings, "No warnings."),
    "",
    "## Next Actions",
    "",
    ...renderList(request.preview.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function defaultDecisionReason(status: OperationApprovalRequestStatus, preview: OperationExecutionPreview): string {
  if (status === "pending") {
    return "Approval request is pending human review.";
  }
  if (preview.hardBlockers.length > 0) {
    return `Execution preview has blockers: ${preview.hardBlockers.join(", ")}`;
  }

  return "Execution preview is not ready for approval.";
}

function normalizeHuman(value: string, field: "requestedBy" | "reviewer"): string {
  const normalized = value.trim();
  if (normalized.length === 0 || normalized.length > 80) {
    throw new AppHttpError(400, `INVALID_${field.toUpperCase()}`, `${field} must be 1-80 characters`);
  }

  return normalized;
}

function normalizeDecisionReason(reason: string | undefined): string | undefined {
  const normalized = reason?.trim();
  if (normalized === undefined || normalized.length === 0) {
    return undefined;
  }

  return normalized.slice(0, 400);
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

function cloneRequest(request: OperationApprovalRequest): OperationApprovalRequest {
  return structuredClone(request);
}
