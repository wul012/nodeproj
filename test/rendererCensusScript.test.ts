import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { buildRendererCensus } from "../scripts/renderer-census.mjs";

describe("renderer census script", () => {
  it("reproduces the v2157 renderer migration baseline", async () => {
    const census = await buildRendererCensus();

    expect(census.totalRenderers).toBe(245);
    expect(census.standardizedRenderers).toBe(184);
    expect(census.unstandardizedRenderers).toBe(61);
    expect(census.remainingShapeSignals).toEqual({
      h3: 38,
      forLoop: 0,
      map: 75,
      flatMap: 46,
    });
    expect(census.unstandardizedFiles).toHaveLength(61);
    expect(census.unstandardizedFiles[0]?.file).toBe(
      "controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts",
    );
  });

  it("fails the shrink-only gate when the unstandardized count regresses above the allowed maximum", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");

    expect(() => {
      execFileSync(
        process.execPath,
        [scriptPath, "--max-unstandardized=60"],
        { encoding: "utf8" },
      );
    }).toThrow(/Renderer census regression: 61 exceeds --max-unstandardized=60/);
  });
});
