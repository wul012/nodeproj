import { describe, expect, it } from "vitest";

import { completeChecks } from "../../src/services/operatorLifecycle/checkAssembly.js";

describe("operator lifecycle check assembly", () => {
  it("completes all-true evidence without mutating the draft or changing key order", () => {
    const draft = { sourceReady: true, ready: false, boundaryClosed: true };

    const completed = completeChecks(draft, "ready");

    expect(completed).toEqual({
      checks: { sourceReady: true, ready: true, boundaryClosed: true },
      ready: true,
    });
    expect(completed.checks).not.toBe(draft);
    expect(draft.ready).toBe(false);
    expect(Object.keys(completed.checks)).toEqual(["sourceReady", "ready", "boundaryClosed"]);
  });

  it("fails closed when any evidence value is false", () => {
    expect(completeChecks({ sourceReady: true, boundaryClosed: false, ready: false }, "ready")).toMatchObject({
      ready: false,
      checks: { ready: false },
    });
  });

  it("fails closed for an empty evidence set", () => {
    expect(completeChecks({ ready: false }, "ready").ready).toBe(false);
  });

  it("fails closed for a non-boolean runtime value", () => {
    const malformed = { sourceReady: true, boundaryClosed: 1, ready: false } as unknown as {
      sourceReady: boolean;
      boundaryClosed: boolean;
      ready: boolean;
    };

    expect(completeChecks(malformed, "ready").ready).toBe(false);
  });
});
