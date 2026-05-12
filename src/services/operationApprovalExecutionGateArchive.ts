import { createHash, randomUUID } from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OperationApprovalExecutionGatePreview } from "./operationApprovalExecutionGatePreview.js";

export interface OperationApprovalExecutionGateArchiveDigest {
  algorithm: "sha256";
  value: string;
  coveredFields: string[];
}

export interface CreateOperationApprovalExecutionGateArchiveInput {
  preview: OperationApprovalExecutionGatePreview;
  reviewer?: string;
  note?: string;
}

export interface OperationApprovalExecutionGateArchiveRecord {
  service: "orderops-node";
  archiveId: string;
  sequence: number;
  createdAt: string;
  reviewer: string;
  reviewerNote: string;
  requestId: string;
  decisionId?: string;
  intentId: string;
  state: OperationApprovalExecutionGatePreview["state"];
  previewOnly: true;
  executionAllowed: false;
  gateDigest: OperationApprovalExecutionGatePreview["gateDigest"];
  bundleDigest: OperationApprovalExecutionGatePreview["bundleDigest"];
  summary: OperationApprovalExecutionGatePreview["summary"];
  gateChecks: OperationApprovalExecutionGatePreview["gateChecks"];
  hardBlockers: string[];
  warnings: string[];
  nextActions: string[];
  archiveDigest: OperationApprovalExecutionGateArchiveDigest;
  preview: OperationApprovalExecutionGatePreview;
}

const ARCHIVE_DIGEST_COVERED_FIELDS = Object.freeze([
  "sequence",
  "createdAt",
  "reviewer",
  "reviewerNote",
  "requestId",
  "decisionId",
  "intentId",
  "state",
  "previewOnly",
  "executionAllowed",
  "gateDigest",
  "bundleDigest",
  "summary",
  "gateChecks",
  "hardBlockers",
  "warnings",
  "nextActions",
  "preview",
]);

export class OperationApprovalExecutionGateArchiveLedger {
  private readonly records = new Map<string, OperationApprovalExecutionGateArchiveRecord>();
  private nextSequence = 1;

  constructor(private readonly capacity = 200) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("OperationApprovalExecutionGateArchiveLedger capacity must be a positive integer");
    }
  }

  create(input: CreateOperationApprovalExecutionGateArchiveInput): OperationApprovalExecutionGateArchiveRecord {
    const recordWithoutDigest = {
      service: "orderops-node" as const,
      archiveId: randomUUID(),
      sequence: this.nextSequence,
      createdAt: new Date().toISOString(),
      reviewer: normalizeReviewer(input.reviewer),
      reviewerNote: normalizeNote(input.note),
      requestId: input.preview.requestId,
      ...(input.preview.decisionId === undefined ? {} : { decisionId: input.preview.decisionId }),
      intentId: input.preview.intentId,
      state: input.preview.state,
      previewOnly: true as const,
      executionAllowed: false as const,
      gateDigest: structuredClone(input.preview.gateDigest),
      bundleDigest: structuredClone(input.preview.bundleDigest),
      summary: structuredClone(input.preview.summary),
      gateChecks: structuredClone(input.preview.gateChecks),
      hardBlockers: [...input.preview.hardBlockers],
      warnings: [...input.preview.warnings],
      nextActions: [...input.preview.nextActions],
      preview: structuredClone(input.preview),
    };
    const record: OperationApprovalExecutionGateArchiveRecord = {
      ...recordWithoutDigest,
      archiveDigest: digestOperationApprovalExecutionGateArchive(recordWithoutDigest),
    };

    this.nextSequence += 1;
    this.records.set(record.archiveId, record);
    this.trim();
    return cloneRecord(record);
  }

  list(limit = 20): OperationApprovalExecutionGateArchiveRecord[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.capacity);
    return [...this.records.values()]
      .sort((left, right) => right.sequence - left.sequence)
      .slice(0, safeLimit)
      .map(cloneRecord);
  }

  get(archiveId: string): OperationApprovalExecutionGateArchiveRecord {
    return cloneRecord(this.find(archiveId));
  }

  private find(archiveId: string): OperationApprovalExecutionGateArchiveRecord {
    const record = this.records.get(archiveId);
    if (record === undefined) {
      throw new AppHttpError(404, "EXECUTION_GATE_ARCHIVE_NOT_FOUND", "Execution gate archive record was not found", {
        archiveId,
      });
    }
    return record;
  }

  private trim(): void {
    if (this.records.size <= this.capacity) {
      return;
    }

    const oldest = [...this.records.values()].sort((left, right) => left.sequence - right.sequence);
    for (const record of oldest.slice(0, this.records.size - this.capacity)) {
      this.records.delete(record.archiveId);
    }
  }
}

export function renderOperationApprovalExecutionGateArchiveMarkdown(
  record: OperationApprovalExecutionGateArchiveRecord,
): string {
  return [
    "# Operation approval execution gate archive record",
    "",
    `- Service: ${record.service}`,
    `- Archive id: ${record.archiveId}`,
    `- Sequence: ${record.sequence}`,
    `- Created at: ${record.createdAt}`,
    `- Reviewer: ${record.reviewer}`,
    `- Reviewer note: ${record.reviewerNote}`,
    `- Request id: ${record.requestId}`,
    `- Decision id: ${record.decisionId ?? "missing"}`,
    `- Intent id: ${record.intentId}`,
    `- State: ${record.state}`,
    `- Preview only: ${record.previewOnly}`,
    `- Execution allowed: ${record.executionAllowed}`,
    `- Archive digest: ${record.archiveDigest.algorithm}:${record.archiveDigest.value}`,
    `- Gate digest: ${record.gateDigest.algorithm}:${record.gateDigest.value}`,
    `- Bundle digest: ${record.bundleDigest.algorithm}:${record.bundleDigest.value}`,
    "",
    "## Summary",
    "",
    `- Action: ${record.summary.action}`,
    `- Target: ${record.summary.target}`,
    `- Request status: ${record.summary.requestStatus}`,
    `- Decision: ${record.summary.decision}`,
    `- Handoff ready: ${record.summary.handoffReady}`,
    `- Verification valid: ${record.summary.verificationValid}`,
    `- Upstream touched: ${record.summary.upstreamTouched}`,
    `- Required upstream evidence available: ${record.summary.requiredUpstreamEvidenceAvailable}`,
    `- Hard blocker count: ${record.summary.hardBlockerCount}`,
    `- Warning count: ${record.summary.warningCount}`,
    "",
    "## Gate Checks",
    "",
    `- Request approved: ${record.gateChecks.requestApproved}`,
    `- Decision approved: ${record.gateChecks.decisionApproved}`,
    `- Handoff ready: ${record.gateChecks.handoffReady}`,
    `- Evidence verification valid: ${record.gateChecks.evidenceVerificationValid}`,
    `- Upstream untouched: ${record.gateChecks.upstreamUntouched}`,
    `- No request hard blockers: ${record.gateChecks.noRequestHardBlockers}`,
    `- Required upstream evidence available: ${record.gateChecks.requiredUpstreamEvidenceAvailable}`,
    `- Java approved for replay ok: ${record.gateChecks.javaApprovedForReplayOk}`,
    `- Java approval digest evidence valid: ${record.gateChecks.javaApprovalDigestEvidenceValid}`,
    `- mini-kv command digest evidence valid: ${record.gateChecks.miniKvCommandDigestEvidenceValid}`,
    `- mini-kv side_effect_count matches: ${record.gateChecks.miniKvSideEffectCountMatches}`,
    "",
    "## Hard Blockers",
    "",
    ...renderList(record.hardBlockers, "No hard blockers."),
    "",
    "## Warnings",
    "",
    ...renderList(record.warnings, "No warnings."),
    "",
    "## Next Actions",
    "",
    ...renderList(record.nextActions, "No next actions."),
    "",
  ].join("\n");
}

export function digestOperationApprovalExecutionGateArchive(
  record: Omit<OperationApprovalExecutionGateArchiveRecord, "archiveDigest">,
): OperationApprovalExecutionGateArchiveDigest {
  return {
    algorithm: "sha256",
    value: createHash("sha256")
      .update(stableJson({
        sequence: record.sequence,
        createdAt: record.createdAt,
        reviewer: record.reviewer,
        reviewerNote: record.reviewerNote,
        requestId: record.requestId,
        decisionId: record.decisionId ?? null,
        intentId: record.intentId,
        state: record.state,
        previewOnly: record.previewOnly,
        executionAllowed: record.executionAllowed,
        gateDigest: record.gateDigest,
        bundleDigest: record.bundleDigest,
        summary: record.summary,
        gateChecks: record.gateChecks,
        hardBlockers: record.hardBlockers,
        warnings: record.warnings,
        nextActions: record.nextActions,
        preview: record.preview,
      }))
      .digest("hex"),
    coveredFields: [...ARCHIVE_DIGEST_COVERED_FIELDS],
  };
}

function normalizeReviewer(reviewer: string | undefined): string {
  const normalized = reviewer?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 80) : "local-reviewer";
}

function normalizeNote(note: string | undefined): string {
  const normalized = note?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 400) : "execution gate preview archived";
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

function cloneRecord(
  record: OperationApprovalExecutionGateArchiveRecord,
): OperationApprovalExecutionGateArchiveRecord {
  return structuredClone(record);
}
