import { createHash, randomUUID } from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OpsPromotionDecision, OpsPromotionReview } from "./opsPromotionReview.js";

export interface CreateOpsPromotionDecisionInput {
  reviewer?: string;
  note?: string;
  review: OpsPromotionReview;
}

export interface OpsPromotionDecisionRecord {
  service: "orderops-node";
  id: string;
  sequence: number;
  createdAt: string;
  reviewer: string;
  note: string;
  outcome: OpsPromotionDecision;
  readyForPromotion: boolean;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  review: OpsPromotionReview;
}

export class OpsPromotionDecisionLedger {
  private readonly records = new Map<string, OpsPromotionDecisionRecord>();
  private nextSequence = 1;

  constructor(private readonly capacity = 100) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("OpsPromotionDecisionLedger capacity must be a positive integer");
    }
  }

  create(input: CreateOpsPromotionDecisionInput): OpsPromotionDecisionRecord {
    const record: OpsPromotionDecisionRecord = {
      service: "orderops-node",
      id: randomUUID(),
      sequence: this.nextSequence,
      createdAt: new Date().toISOString(),
      reviewer: normalizeReviewer(input.reviewer),
      note: normalizeNote(input.note),
      outcome: input.review.decision,
      readyForPromotion: input.review.readyForPromotion,
      digest: {
        algorithm: "sha256",
        value: "",
      },
      review: structuredClone(input.review),
    };

    this.nextSequence += 1;
    record.digest.value = digestRecord(record);
    this.records.set(record.id, record);
    this.trim();
    return cloneRecord(record);
  }

  list(limit = 20): OpsPromotionDecisionRecord[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.capacity);
    return [...this.records.values()]
      .sort((left, right) => right.sequence - left.sequence)
      .slice(0, safeLimit)
      .map(cloneRecord);
  }

  get(id: string): OpsPromotionDecisionRecord {
    const record = this.records.get(id);
    if (record === undefined) {
      throw new AppHttpError(404, "OPS_PROMOTION_DECISION_NOT_FOUND", "Ops promotion decision was not found", { id });
    }

    return cloneRecord(record);
  }

  private trim(): void {
    if (this.records.size <= this.capacity) {
      return;
    }

    const oldest = [...this.records.values()].sort((left, right) => left.sequence - right.sequence);
    for (const record of oldest.slice(0, this.records.size - this.capacity)) {
      this.records.delete(record.id);
    }
  }
}

function digestRecord(record: OpsPromotionDecisionRecord): string {
  return createHash("sha256")
    .update(stableJson({
      sequence: record.sequence,
      createdAt: record.createdAt,
      reviewer: record.reviewer,
      note: record.note,
      outcome: record.outcome,
      readyForPromotion: record.readyForPromotion,
      review: record.review,
    }))
    .digest("hex");
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

function normalizeReviewer(reviewer: string | undefined): string {
  const normalized = reviewer?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 80) : "local-dev";
}

function normalizeNote(note: string | undefined): string {
  const normalized = note?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 400) : "local promotion decision";
}

function cloneRecord(record: OpsPromotionDecisionRecord): OpsPromotionDecisionRecord {
  return structuredClone(record);
}
