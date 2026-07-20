import { describe, expect, it } from "vitest";

import {
  allReportChecksPassExcept,
  collectFailedReportRules,
} from "../src/services/liveProbeReportUtils.js";

describe("live probe report utilities", () => {
  it("excludes only the named readiness field from conjunction", () => {
    const readyChecks = Object.freeze({ sourceReady: true, policyReady: true, ready: false });
    const blockedChecks = Object.freeze({ sourceReady: true, policyReady: false, ready: false });

    expect(allReportChecksPassExcept(readyChecks, "ready")).toBe(true);
    expect(allReportChecksPassExcept(blockedChecks, "ready")).toBe(false);
  });

  it("maps failed rules to ordered blocker messages", () => {
    const messages = collectFailedReportRules([
      { condition: false, code: "FIRST", source: "source-a", message: "first failed" },
      { condition: true, code: "PASSED", source: "source-b", message: "passed" },
      { condition: false, code: "SECOND", source: "source-c", message: "second failed" },
    ]);

    expect(messages).toEqual([
      { code: "FIRST", severity: "blocker", source: "source-a", message: "first failed" },
      { code: "SECOND", severity: "blocker", source: "source-c", message: "second failed" },
    ]);
  });
});
