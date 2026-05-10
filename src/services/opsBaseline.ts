import type { OpsCheckpoint } from "./opsCheckpoint.js";
import { createOpsCheckpointDiff } from "./opsCheckpointDiff.js";
import type { OpsCheckpointDiff } from "./opsCheckpointDiff.js";

export type OpsBaselineState = "unset" | "current" | "drifted";

export interface OpsBaselineInput {
  actor?: string;
  note?: string;
}

export interface OpsBaselineRef {
  checkpointId: string;
  sequence: number;
  digest: string;
  checkpointCreatedAt: string;
  setAt: string;
  setBy: string;
  note: string;
}

export interface OpsBaselineStatus {
  service: "orderops-node";
  generatedAt: string;
  state: OpsBaselineState;
  baseline?: OpsBaselineRef;
  latest?: {
    checkpointId: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  diff?: OpsCheckpointDiff;
  guidance: string[];
}

export class OpsBaselineStore {
  private baseline?: OpsBaselineRef;

  set(checkpoint: OpsCheckpoint, input: OpsBaselineInput = {}): OpsBaselineRef {
    this.baseline = {
      checkpointId: checkpoint.id,
      sequence: checkpoint.sequence,
      digest: checkpoint.digest.value,
      checkpointCreatedAt: checkpoint.createdAt,
      setAt: new Date().toISOString(),
      setBy: normalizeActor(input.actor),
      note: normalizeNote(input.note),
    };

    return this.get() as OpsBaselineRef;
  }

  get(): OpsBaselineRef | undefined {
    return this.baseline === undefined ? undefined : { ...this.baseline };
  }

  clear(): OpsBaselineRef | undefined {
    const cleared = this.get();
    this.baseline = undefined;
    return cleared;
  }
}

export function createOpsBaselineStatus(input: {
  baseline?: OpsBaselineRef;
  baselineCheckpoint?: OpsCheckpoint;
  latest?: OpsCheckpoint;
}): OpsBaselineStatus {
  if (input.baseline === undefined) {
    return {
      service: "orderops-node",
      generatedAt: new Date().toISOString(),
      state: "unset",
      latest: input.latest === undefined ? undefined : checkpointSummary(input.latest),
      guidance: ["Create a checkpoint and set it as the local baseline before tracking drift."],
    };
  }

  const latest = input.latest ?? input.baselineCheckpoint;
  const diff = input.baselineCheckpoint !== undefined && latest !== undefined && latest.id !== input.baselineCheckpoint.id
    ? createOpsCheckpointDiff(input.baselineCheckpoint, latest)
    : undefined;
  const state: OpsBaselineState = diff === undefined ? "current" : "drifted";

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    state,
    baseline: input.baseline,
    latest: latest === undefined ? undefined : checkpointSummary(latest),
    diff,
    guidance: createGuidance(state, diff),
  };
}

function checkpointSummary(checkpoint: OpsCheckpoint): OpsBaselineStatus["latest"] {
  return {
    checkpointId: checkpoint.id,
    sequence: checkpoint.sequence,
    digest: checkpoint.digest.value,
    createdAt: checkpoint.createdAt,
  };
}

function createGuidance(state: OpsBaselineState, diff: OpsCheckpointDiff | undefined): string[] {
  if (state === "current") {
    return ["Baseline is the latest checkpoint; create a later checkpoint to detect drift."];
  }

  if (diff?.direction === "regressed") {
    return ["Latest checkpoint regressed from the baseline; review changed signals and runbook steps before promotion."];
  }

  if (diff?.direction === "improved") {
    return ["Latest checkpoint improved from the baseline; consider resetting the baseline after review."];
  }

  if (diff?.direction === "unchanged") {
    return ["Latest checkpoint is newer but has no meaningful signal drift from the baseline."];
  }

  return ["Latest checkpoint drifted from the baseline; review the diff before continuing."];
}

function normalizeActor(actor: string | undefined): string {
  const normalized = actor?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 80) : "local-dev";
}

function normalizeNote(note: string | undefined): string {
  const normalized = note?.trim() ?? "";
  return normalized.length > 0 ? normalized.slice(0, 400) : "local baseline";
}
