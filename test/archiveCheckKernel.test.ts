import { describe, expect, it } from "vitest";

import {
  allBooleanChecksPass,
  arrayHasIds,
  isDigest,
  mergeArchiveCheckGroups,
  numberValue,
  stringValue,
  valueAt,
} from "../src/services/archiveVerification/kernel.js";

describe("archive check utilities", () => {
  it("preserves check group insertion order", () => {
    const checks = mergeArchiveCheckGroups<Record<string, boolean>>(
      { sourceReady: true, sourceClosed: true },
      { archivePresent: true },
      { executionBlocked: true },
    );

    expect(Object.keys(checks)).toEqual([
      "sourceReady",
      "sourceClosed",
      "archivePresent",
      "executionBlocked",
    ]);
  });

  it("fails closed for malformed boolean check collections", () => {
    expect(allBooleanChecksPass({ first: true, second: true }, 2)).toBe(true);
    expect(allBooleanChecksPass(null, 2)).toBe(false);
    expect(allBooleanChecksPass([true, true], 2)).toBe(false);
    expect(allBooleanChecksPass({ first: true }, 2)).toBe(false);
    expect(allBooleanChecksPass({ first: true, second: "true" }, 2)).toBe(false);
    expect(allBooleanChecksPass({ first: true, second: false }, 2)).toBe(false);
  });

  it("does not traverse arrays or primitive path segments", () => {
    const source = { archive: { checks: { ready: true } }, list: [{ ready: true }] };

    expect(valueAt(source, "archive", "checks", "ready")).toBe(true);
    expect(valueAt(source, "archive", "missing")).toBeUndefined();
    expect(valueAt(source, "list", "0", "ready")).toBeUndefined();
    expect(valueAt(null, "archive")).toBeUndefined();
  });

  it("accepts only complete id collections and strict scalar shapes", () => {
    expect(arrayHasIds([{ id: "first" }, { id: "second" }], ["first", "second"])).toBe(true);
    expect(arrayHasIds([{ id: "first" }, null, "second"], ["first", "second"])).toBe(false);
    expect(arrayHasIds({ first: true }, ["first"])).toBe(false);
    expect(stringValue("value")).toBe("value");
    expect(stringValue(1)).toBe("");
    expect(numberValue(3)).toBe(3);
    expect(numberValue(Number.NaN)).toBe(0);
    expect(numberValue("3")).toBe(0);
  });

  it("accepts only lowercase 64-character SHA-256 digests", () => {
    expect(isDigest("a".repeat(64))).toBe(true);
    expect(isDigest("A".repeat(64))).toBe(false);
    expect(isDigest("a".repeat(63))).toBe(false);
    expect(isDigest(null)).toBe(false);
  });
});
