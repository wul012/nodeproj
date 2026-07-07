import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { buildRendererCensus } from "../scripts/renderer-census.mjs";

describe("renderer census script", () => {
  it("reproduces the current renderer migration baseline", async () => {
    const census = await buildRendererCensus();

    expect(census.totalRenderers).toBe(245);
    expect(census.standardizedRenderers).toBe(221);
    expect(census.unstandardizedRenderers).toBe(24);
    expect(census.remainingShapeSignals).toEqual({
      h3: 0,
      forLoop: 0,
      map: 21,
      flatMap: 22,
    });
    expect(census.unstandardizedFiles).toHaveLength(24);
    expect(census.unstandardizedFiles[0]?.file).toBe(
      "controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts",
    );
  });

  it("fails the shrink-only gate when the unstandardized count regresses above the allowed maximum", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");

    expect(() => {
      execFileSync(
        process.execPath,
        [scriptPath, "--max-unstandardized=23"],
        { encoding: "utf8" },
      );
    }).toThrow(/Renderer census regression: 24 exceeds --max-unstandardized=23/);
  });
});
