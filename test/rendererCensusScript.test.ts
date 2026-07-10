import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildRendererCensus,
  inspectCompositionOnlyRenderer,
} from "../scripts/renderer-census.mjs";

const EXPECTED_WAIVED_RENDERERS = [
  "controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts",
  "controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts",
  "controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts",
];

describe("renderer census script", () => {
  it("reproduces the current renderer migration baseline", async () => {
    const census = await buildRendererCensus();

    expect(census.totalRenderers).toBe(245);
    expect(census.standardizedRenderers).toBe(242);
    expect(census.unstandardizedRenderers).toBe(3);
    expect(census.waivedUnstandardizedRenderers).toBe(3);
    expect(census.nonWaivedUnstandardizedRenderers).toBe(0);
    expect(census.remainingShapeSignals).toEqual({
      h3: 0,
      forLoop: 0,
      map: 0,
      flatMap: 0,
    });
    expect(census.unstandardizedFiles).toHaveLength(3);
    expect(census.waivedFiles.map((waiver) => waiver.file)).toEqual(EXPECTED_WAIVED_RENDERERS);
    expect(census.nonWaivedUnstandardizedFiles).toEqual([]);
    expect(census.waivedFiles.every((waiver) => (
      waiver.validation.composedFunctions.length === 2
    ))).toBe(true);
  });

  it("keeps the reviewer-facing waiver document synchronized with the canonical manifest", async () => {
    const census = await buildRendererCensus();
    const waiverDocument = await readFile(
      resolve("docs", "plans", "renderer-consolidation-waivers.md"),
      "utf8",
    );

    expect(waiverDocument).toContain("renderer-consolidation-waivers.json");
    for (const waiver of census.waivedFiles) {
      expect(waiverDocument).toContain(`\`${waiver.file}\``);
      expect(waiverDocument).toContain(waiver.reviewerCheck);
    }
  });

  it("rejects direct formatting from a composition-only renderer", () => {
    expect(() => inspectCompositionOnlyRenderer(`
      export function renderProfile(profile: object): string[] {
        return ["### direct formatting", ...renderChild(profile)];
      }
    `, "invalidRenderer.ts")).toThrow(/may return only spread calls/);
  });

  it("fails the shrink-only gate when the unstandardized count regresses above the allowed maximum", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");

    expect(() => {
      execFileSync(
        process.execPath,
        [scriptPath, "--max-unstandardized=2"],
        { encoding: "utf8" },
      );
    }).toThrow(/Renderer census regression: 3 exceeds --max-unstandardized=2/);
  });

  it("fails the waiver ratchet when the approved waiver count exceeds the maximum", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");

    expect(() => {
      execFileSync(
        process.execPath,
        [scriptPath, "--max-waived=2"],
        { encoding: "utf8" },
      );
    }).toThrow(/Renderer waiver regression: 3 exceeds --max-waived=2/);
  });

  it("lets an appended stricter maximum override the package-script default", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");

    expect(() => {
      execFileSync(
        process.execPath,
        [scriptPath, "--max-waived=3", "--max-waived=2"],
        { encoding: "utf8" },
      );
    }).toThrow(/Renderer waiver regression: 3 exceeds --max-waived=2/);
  });

  it("passes the complete N1 closeout command with zero non-waived renderers", () => {
    const scriptPath = resolve("scripts", "renderer-census.mjs");
    const output = execFileSync(
      process.execPath,
      [
        scriptPath,
        "--json",
        "--max-unstandardized=3",
        "--max-waived=3",
        "--max-non-waived=0",
      ],
      { encoding: "utf8" },
    );

    expect(JSON.parse(output)).toMatchObject({
      totalRenderers: 245,
      unstandardizedRenderers: 3,
      waivedUnstandardizedRenderers: 3,
      nonWaivedUnstandardizedRenderers: 0,
    });
  });
});
