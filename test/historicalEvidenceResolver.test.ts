import { afterEach, describe, expect, it } from "vitest";

import { historicalEvidenceExists, resolveHistoricalEvidencePath } from "../src/services/historicalEvidenceResolver.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("historicalEvidenceResolver", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("resolves sibling Java evidence through the committed fixture fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const resolvedPath = resolveHistoricalEvidencePath(
      "D:/javaproj/advanced-order-platform/c/82/解释/说明.md",
    );

    expect(resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/82/解释/说明.md",
    );
    expect(historicalEvidenceExists("D:/javaproj/advanced-order-platform/c/82/解释/说明.md")).toBe(true);
  });

  it("resolves sibling mini-kv evidence through the committed fixture fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const resolvedPath = resolveHistoricalEvidencePath("D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json");

    expect(resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/runtime-smoke-evidence.json",
    );
    expect(historicalEvidenceExists("D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json")).toBe(true);
  });
});
