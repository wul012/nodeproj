import { createHash, randomUUID } from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OperationApprovalDecision } from "./operationApprovalDecision.js";
import type { OperationApprovalExecutionGatePreview } from "./operationApprovalExecutionGatePreview.js";
import type { OperationApprovalRequest } from "./operationApprovalRequest.js";

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

export interface OperationApprovalExecutionGateArchiveVerification {
  service: "orderops-node";
  archiveId: string;
  sequence: number;
  verifiedAt: string;
  valid: boolean;
  storedArchiveDigest: OperationApprovalExecutionGateArchiveDigest;
  recomputedArchiveDigest: OperationApprovalExecutionGateArchiveDigest;
  storedGateDigest: OperationApprovalExecutionGateArchiveRecord["gateDigest"];
  archivedPreviewGateDigest: OperationApprovalExecutionGateArchiveRecord["gateDigest"];
  storedBundleDigest: OperationApprovalExecutionGateArchiveRecord["bundleDigest"];
  archivedPreviewBundleDigest: OperationApprovalExecutionGateArchiveRecord["bundleDigest"];
  checks: {
    archiveDigestValid: boolean;
    gateDigestMatchesPreview: boolean;
    bundleDigestMatchesPreview: boolean;
    requestIdMatchesPreview: boolean;
    decisionIdMatchesPreview: boolean;
    intentIdMatchesPreview: boolean;
    requestLedgerMatches: boolean;
    decisionLedgerMatches: boolean;
    executionAllowedStillFalse: boolean;
    previewOnlyStillTrue: boolean;
  };
  summary: {
    requestId: string;
    decisionId?: string;
    intentId: string;
    state: OperationApprovalExecutionGateArchiveRecord["state"];
    requestStatus: OperationApprovalExecutionGateArchiveRecord["summary"]["requestStatus"];
    decision: OperationApprovalExecutionGateArchiveRecord["summary"]["decision"];
    reviewer: string;
    reviewerNote: string;
    hardBlockerCount: number;
    warningCount: number;
  };
  nextActions: string[];
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

export function createOperationApprovalExecutionGateArchiveVerification(
  record: OperationApprovalExecutionGateArchiveRecord,
  request: OperationApprovalRequest,
  decision: OperationApprovalDecision | undefined,
): OperationApprovalExecutionGateArchiveVerification {
  const recomputedArchiveDigest = digestOperationApprovalExecutionGateArchive(stripArchiveDigest(record));
  const checks = {
    archiveDigestValid: record.archiveDigest.value === recomputedArchiveDigest.value,
    gateDigestMatchesPreview: record.gateDigest.value === record.preview.gateDigest.value,
    bundleDigestMatchesPreview: record.bundleDigest.value === record.preview.bundleDigest.value,
    requestIdMatchesPreview: record.requestId === record.preview.requestId,
    decisionIdMatchesPreview: (record.decisionId ?? "missing") === (record.preview.decisionId ?? "missing"),
    intentIdMatchesPreview: record.intentId === record.preview.intentId,
    requestLedgerMatches: request.requestId === record.requestId
      && request.intentId === record.intentId
      && request.status === record.summary.requestStatus,
    decisionLedgerMatches: decision === undefined
      ? record.decisionId === undefined && record.summary.decision === "missing"
      : decision.decisionId === record.decisionId
        && decision.requestId === record.requestId
        && decision.intentId === record.intentId
        && decision.decision === record.summary.decision,
    executionAllowedStillFalse: record.executionAllowed === false && record.preview.executionAllowed === false,
    previewOnlyStillTrue: record.previewOnly === true && record.preview.previewOnly === true,
  };
  const valid = Object.values(checks).every(Boolean);

  return {
    service: "orderops-node",
    archiveId: record.archiveId,
    sequence: record.sequence,
    verifiedAt: new Date().toISOString(),
    valid,
    storedArchiveDigest: structuredClone(record.archiveDigest),
    recomputedArchiveDigest,
    storedGateDigest: structuredClone(record.gateDigest),
    archivedPreviewGateDigest: structuredClone(record.preview.gateDigest),
    storedBundleDigest: structuredClone(record.bundleDigest),
    archivedPreviewBundleDigest: structuredClone(record.preview.bundleDigest),
    checks,
    summary: {
      requestId: record.requestId,
      ...(record.decisionId === undefined ? {} : { decisionId: record.decisionId }),
      intentId: record.intentId,
      state: record.state,
      requestStatus: record.summary.requestStatus,
      decision: record.summary.decision,
      reviewer: record.reviewer,
      reviewerNote: record.reviewerNote,
      hardBlockerCount: record.summary.hardBlockerCount,
      warningCount: record.summary.warningCount,
    },
    nextActions: valid
      ? ["Execution gate archive verification is complete; keep this verification with the archive record."]
      : ["Execution gate archive verification failed; create a new gate preview and archive record before moving toward execution."],
  };
}

export function renderOperationApprovalExecutionGateArchiveVerificationMarkdown(
  verification: OperationApprovalExecutionGateArchiveVerification,
): string {
  return [
    "# Operation approval execution gate archive verification",
    "",
    `- Service: ${verification.service}`,
    `- Archive id: ${verification.archiveId}`,
    `- Sequence: ${verification.sequence}`,
    `- Verified at: ${verification.verifiedAt}`,
    `- Valid: ${verification.valid}`,
    `- Request id: ${verification.summary.requestId}`,
    `- Decision id: ${verification.summary.decisionId ?? "missing"}`,
    `- Intent id: ${verification.summary.intentId}`,
    `- State: ${verification.summary.state}`,
    `- Stored archive digest: ${verification.storedArchiveDigest.algorithm}:${verification.storedArchiveDigest.value}`,
    `- Recomputed archive digest: ${verification.recomputedArchiveDigest.algorithm}:${verification.recomputedArchiveDigest.value}`,
    `- Stored gate digest: ${verification.storedGateDigest.algorithm}:${verification.storedGateDigest.value}`,
    `- Archived preview gate digest: ${verification.archivedPreviewGateDigest.algorithm}:${verification.archivedPreviewGateDigest.value}`,
    `- Stored bundle digest: ${verification.storedBundleDigest.algorithm}:${verification.storedBundleDigest.value}`,
    `- Archived preview bundle digest: ${verification.archivedPreviewBundleDigest.algorithm}:${verification.archivedPreviewBundleDigest.value}`,
    "",
    "## Checks",
    "",
    `- Archive digest valid: ${verification.checks.archiveDigestValid}`,
    `- Gate digest matches preview: ${verification.checks.gateDigestMatchesPreview}`,
    `- Bundle digest matches preview: ${verification.checks.bundleDigestMatchesPreview}`,
    `- Request id matches preview: ${verification.checks.requestIdMatchesPreview}`,
    `- Decision id matches preview: ${verification.checks.decisionIdMatchesPreview}`,
    `- Intent id matches preview: ${verification.checks.intentIdMatchesPreview}`,
    `- Request ledger matches: ${verification.checks.requestLedgerMatches}`,
    `- Decision ledger matches: ${verification.checks.decisionLedgerMatches}`,
    `- Execution allowed still false: ${verification.checks.executionAllowedStillFalse}`,
    `- Preview only still true: ${verification.checks.previewOnlyStillTrue}`,
    "",
    "## Summary",
    "",
    `- Request status: ${verification.summary.requestStatus}`,
    `- Decision: ${verification.summary.decision}`,
    `- Reviewer: ${verification.summary.reviewer}`,
    `- Reviewer note: ${verification.summary.reviewerNote}`,
    `- Hard blocker count: ${verification.summary.hardBlockerCount}`,
    `- Warning count: ${verification.summary.warningCount}`,
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
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

function stripArchiveDigest(
  record: OperationApprovalExecutionGateArchiveRecord,
): Omit<OperationApprovalExecutionGateArchiveRecord, "archiveDigest"> {
  const { archiveDigest: _archiveDigest, ...withoutDigest } = record;
  return withoutDigest;
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
