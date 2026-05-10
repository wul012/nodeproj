import { createHash, randomUUID } from "node:crypto";

import { AppHttpError } from "../errors.js";
import type { OpsReadiness } from "./opsReadiness.js";
import type { OpsRunbook } from "./opsRunbook.js";
import type { OpsSummary } from "./opsSummary.js";

export interface CreateOpsCheckpointInput {
  actor?: string;
  note?: string;
  summary: OpsSummary;
  readiness: OpsReadiness;
  runbook: OpsRunbook;
}

export interface OpsCheckpoint {
  service: "orderops-node";
  id: string;
  sequence: number;
  createdAt: string;
  actor: string;
  note: string;
  digest: {
    algorithm: "sha256";
    value: string;
  };
  decision: {
    readinessState: OpsReadiness["state"];
    runbookState: OpsRunbook["state"];
    readyForExecution: boolean;
    blockers: number;
    todos: number;
  };
  snapshot: {
    summary: OpsSummary;
    readiness: OpsReadiness;
    runbook: OpsRunbook;
  };
}

export class OpsCheckpointLedger {
  private readonly checkpoints = new Map<string, OpsCheckpoint>();
  private nextSequence = 1;

  constructor(private readonly capacity = 100) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("OpsCheckpointLedger capacity must be a positive integer");
    }
  }

  create(input: CreateOpsCheckpointInput): OpsCheckpoint {
    const sequence = this.nextSequence;
    this.nextSequence += 1;
    const checkpoint: OpsCheckpoint = {
      service: "orderops-node",
      id: randomUUID(),
      sequence,
      createdAt: new Date().toISOString(),
      actor: normalizeActor(input.actor),
      note: normalizeNote(input.note),
      digest: {
        algorithm: "sha256",
        value: "",
      },
      decision: {
        readinessState: input.readiness.state,
        runbookState: input.runbook.state,
        readyForExecution: input.readiness.readyForUpstreamExecution && input.runbook.readyForExecution,
        blockers: input.readiness.blockers + input.runbook.totals.blocked,
        todos: input.runbook.totals.todo,
      },
      snapshot: {
        summary: structuredClone(input.summary),
        readiness: structuredClone(input.readiness),
        runbook: structuredClone(input.runbook),
      },
    };

    checkpoint.digest.value = digestCheckpoint(checkpoint);
    this.checkpoints.set(checkpoint.id, checkpoint);
    this.trim();
    return cloneCheckpoint(checkpoint);
  }

  list(limit = 20): OpsCheckpoint[] {
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), this.capacity);
    return [...this.checkpoints.values()]
      .sort((left, right) => right.sequence - left.sequence)
      .slice(0, safeLimit)
      .map(cloneCheckpoint);
  }

  get(id: string): OpsCheckpoint {
    const checkpoint = this.checkpoints.get(id);
    if (checkpoint === undefined) {
      throw new AppHttpError(404, "OPS_CHECKPOINT_NOT_FOUND", "Ops checkpoint was not found", { id });
    }

    return cloneCheckpoint(checkpoint);
  }

  private trim(): void {
    if (this.checkpoints.size <= this.capacity) {
      return;
    }

    const oldest = [...this.checkpoints.values()].sort((left, right) => left.sequence - right.sequence);
    for (const checkpoint of oldest.slice(0, this.checkpoints.size - this.capacity)) {
      this.checkpoints.delete(checkpoint.id);
    }
  }
}

function digestCheckpoint(checkpoint: OpsCheckpoint): string {
  return createHash("sha256")
    .update(stableJson({
      sequence: checkpoint.sequence,
      createdAt: checkpoint.createdAt,
      actor: checkpoint.actor,
      note: checkpoint.note,
      decision: checkpoint.decision,
      snapshot: checkpoint.snapshot,
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

function normalizeActor(actor: string | undefined): string {
  const normalized = actor?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 80) : "local-dev";
}

function normalizeNote(note: string | undefined): string {
  const normalized = note?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 400) : "local checkpoint";
}

function cloneCheckpoint(checkpoint: OpsCheckpoint): OpsCheckpoint {
  return structuredClone(checkpoint);
}
