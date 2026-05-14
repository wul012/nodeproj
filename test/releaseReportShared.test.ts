import { describe, expect, it } from "vitest";

import {
  collectBlockingMessages,
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

  it("collects blocker messages from declarative check specs", () => {
    interface TestMessage {
      code: string;
      severity: "blocker" | "warning" | "recommendation";
      source: "node" | "java";
      message: string;
    }

    expect(collectBlockingMessages<TestMessage>([
      {
        condition: true,
        code: "NODE_READY",
        source: "node",
        message: "Node check is ready.",
      },
      {
        condition: false,
        code: "JAVA_BLOCKED",
        source: "java",
        message: "Java evidence is blocked.",
      },
      {
        condition: undefined,
        code: "NODE_MISSING",
        source: "node",
        message: "Node evidence is missing.",
      },
    ])).toEqual([
      {
        code: "JAVA_BLOCKED",
        severity: "blocker",
        source: "java",
        message: "Java evidence is blocked.",
      },
      {
        code: "NODE_MISSING",
        severity: "blocker",
        source: "node",
        message: "Node evidence is missing.",
      },
    ]);
  });
});
