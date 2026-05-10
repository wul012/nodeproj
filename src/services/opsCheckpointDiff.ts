import type { OpsCheckpoint } from "./opsCheckpoint.js";
import type { OpsRunbookStepStatus } from "./opsRunbook.js";

export type OpsCheckpointDiffDirection = "improved" | "regressed" | "unchanged" | "changed";

export interface OpsCheckpointValueChange<T = number | boolean | string> {
  from: T;
  to: T;
  delta?: number;
  direction: OpsCheckpointDiffDirection;
}

export interface OpsCheckpointStepChange {
  id: string;
  title: string;
  status: OpsCheckpointValueChange<OpsRunbookStepStatus>;
}

export interface OpsCheckpointDiff {
  service: "orderops-node";
  generatedAt: string;
  base: {
    id: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  target: {
    id: string;
    sequence: number;
    digest: string;
    createdAt: string;
  };
  direction: OpsCheckpointDiffDirection;
  decision: {
    readinessState: OpsCheckpointValueChange;
    runbookState: OpsCheckpointValueChange;
    readyForExecution: OpsCheckpointValueChange<boolean>;
    blockers: OpsCheckpointValueChange<number>;
    todos: OpsCheckpointValueChange<number>;
  };
  signals: Record<string, OpsCheckpointValueChange<number>>;
  runbookTotals: Record<string, OpsCheckpointValueChange<number>>;
  stepChanges: OpsCheckpointStepChange[];
  summary: {
    changedSignals: number;
    changedRunbookTotals: number;
    changedSteps: number;
    hasRegression: boolean;
    hasImprovement: boolean;
  };
}

const stateRank: Record<string, number> = {
  blocked: 0,
  "action-required": 1,
  warning: 1,
  ready: 2,
};

const stepStatusRank: Record<OpsRunbookStepStatus, number> = {
  blocked: 0,
  todo: 1,
  info: 2,
  done: 3,
};

export function createOpsCheckpointDiff(base: OpsCheckpoint, target: OpsCheckpoint): OpsCheckpointDiff {
  const stepChanges = createStepChanges(base, target);
  const signals = compareNumberRecord(
    base.snapshot.summary.signals,
    target.snapshot.summary.signals,
    (_key, from, to) => lowerIsBetter(from, to),
  );
  const runbookTotals = compareNumberRecord(base.snapshot.runbook.totals, target.snapshot.runbook.totals, totalsDirection);
  const decision = {
    readinessState: compareRankedValue(base.decision.readinessState, target.decision.readinessState, stateRank),
    runbookState: compareRankedValue(base.decision.runbookState, target.decision.runbookState, stateRank),
    readyForExecution: compareBooleanReady(base.decision.readyForExecution, target.decision.readyForExecution),
    blockers: compareNumber(base.decision.blockers, target.decision.blockers, lowerIsBetter),
    todos: compareNumber(base.decision.todos, target.decision.todos, lowerIsBetter),
  };
  const directions = [
    decision.readinessState.direction,
    decision.runbookState.direction,
    decision.readyForExecution.direction,
    decision.blockers.direction,
    decision.todos.direction,
    ...Object.values(signals).map((change) => change.direction),
    ...Object.values(runbookTotals).map((change) => change.direction),
    ...stepChanges.map((change) => change.status.direction),
  ];

  return {
    service: "orderops-node",
    generatedAt: new Date().toISOString(),
    base: checkpointRef(base),
    target: checkpointRef(target),
    direction: summarizeDirection(directions),
    decision,
    signals,
    runbookTotals,
    stepChanges,
    summary: {
      changedSignals: Object.values(signals).filter((change) => change.direction !== "unchanged").length,
      changedRunbookTotals: Object.values(runbookTotals).filter((change) => change.direction !== "unchanged").length,
      changedSteps: stepChanges.length,
      hasRegression: directions.includes("regressed"),
      hasImprovement: directions.includes("improved"),
    },
  };
}

function checkpointRef(checkpoint: OpsCheckpoint): OpsCheckpointDiff["base"] {
  return {
    id: checkpoint.id,
    sequence: checkpoint.sequence,
    digest: checkpoint.digest.value,
    createdAt: checkpoint.createdAt,
  };
}

function compareNumberRecord<T extends Record<string, number>>(
  base: T,
  target: T,
  directionFor: (key: string, from: number, to: number) => OpsCheckpointDiffDirection,
): Record<string, OpsCheckpointValueChange<number>> {
  const keys = [...new Set([...Object.keys(base), ...Object.keys(target)])].sort();
  return Object.fromEntries(keys.map((key) => [
    key,
    compareNumber(base[key] ?? 0, target[key] ?? 0, (from, to) => directionFor(key, from, to)),
  ]));
}

function compareNumber(
  from: number,
  to: number,
  directionFor: (from: number, to: number) => OpsCheckpointDiffDirection,
): OpsCheckpointValueChange<number> {
  return {
    from,
    to,
    delta: to - from,
    direction: directionFor(from, to),
  };
}

function compareRankedValue<T extends string>(
  from: T,
  to: T,
  rank: Record<string, number>,
): OpsCheckpointValueChange<T> {
  return {
    from,
    to,
    direction: rankDirection(rank[from] ?? 0, rank[to] ?? 0),
  };
}

function compareBooleanReady(from: boolean, to: boolean): OpsCheckpointValueChange<boolean> {
  if (from === to) {
    return { from, to, direction: "unchanged" };
  }

  return { from, to, direction: to ? "improved" : "regressed" };
}

function createStepChanges(base: OpsCheckpoint, target: OpsCheckpoint): OpsCheckpointStepChange[] {
  const baseSteps = new Map(base.snapshot.runbook.steps.map((step) => [step.id, step]));
  return target.snapshot.runbook.steps
    .map((targetStep) => {
      const baseStep = baseSteps.get(targetStep.id);
      if (baseStep === undefined || baseStep.status === targetStep.status) {
        return undefined;
      }

      return {
        id: targetStep.id,
        title: targetStep.title,
        status: compareRankedValue(baseStep.status, targetStep.status, stepStatusRank),
      };
    })
    .filter((change): change is OpsCheckpointStepChange => change !== undefined);
}

function lowerIsBetter(from: number, to: number): OpsCheckpointDiffDirection {
  if (to === from) {
    return "unchanged";
  }

  return to < from ? "improved" : "regressed";
}

function totalsDirection(key: string, from: number, to: number): OpsCheckpointDiffDirection {
  if (key === "done") {
    if (to === from) {
      return "unchanged";
    }

    return to > from ? "improved" : "regressed";
  }

  if (key === "steps" || key === "info") {
    return to === from ? "unchanged" : "changed";
  }

  return lowerIsBetter(from, to);
}

function rankDirection(from: number, to: number): OpsCheckpointDiffDirection {
  if (to === from) {
    return "unchanged";
  }

  return to > from ? "improved" : "regressed";
}

function summarizeDirection(directions: OpsCheckpointDiffDirection[]): OpsCheckpointDiffDirection {
  if (directions.includes("regressed")) {
    return "regressed";
  }

  if (directions.includes("improved")) {
    return "improved";
  }

  if (directions.includes("changed")) {
    return "changed";
  }

  return "unchanged";
}
