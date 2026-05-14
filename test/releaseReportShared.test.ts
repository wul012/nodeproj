import { describe, expect, it } from "vitest";

import {
  isReleaseReportDigest,
  prefixReportCheckSummary,
  summarizeReportChecks,
} from "../src/services/releaseReportShared.js";

describe("release report shared helpers", () => {
  it("summarizes boolean checks with a stable prefixed shape", () => {
    const summary = summarizeReportChecks({
      upstreamActionsStillDisabled: true,
      noAutomaticUpstreamStart: true,
      productionDatabaseConnected: false,
    });

    expect(summary).toEqual({
      checkCount: 3,
      passedCheckCount: 2,
    });
    expect(prefixReportCheckSummary(summary, "gate")).toEqual({
      gateCheckCount: 3,
      passedGateCheckCount: 2,
    });
    expect(prefixReportCheckSummary(summary, "checklist")).toEqual({
      checklistCheckCount: 3,
      passedChecklistCheckCount: 2,
    });
  });

  it("validates release report digest strings without coercing arbitrary values", () => {
    const digest = "a".repeat(64);

    expect(isReleaseReportDigest(digest)).toBe(true);
    expect(isReleaseReportDigest(digest.toUpperCase())).toBe(false);
    expect(isReleaseReportDigest("a".repeat(63))).toBe(false);
    expect(isReleaseReportDigest({ value: digest })).toBe(false);
    expect(isReleaseReportDigest(undefined)).toBe(false);
  });
});
