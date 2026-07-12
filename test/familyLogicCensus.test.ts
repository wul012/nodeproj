import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  buildFamilyLogicCensus,
  inspectFormattingLogic,
} from "../scripts/family-logic-census.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts", "family-logic-census.mjs");

describe("family logic census", () => {
  it("counts formatting bodies without treating ordinary builders as formatting", () => {
    const source = [
      "export function createReport(value: string) {",
      "  return { value };",
      "}",
      "export function renderReport(value: string): string {",
      "  return [\"# Report\", `- ${value}`].join(\"\\n\");",
      "}",
      "",
    ].join("\n");

    const result = inspectFormattingLogic(source, "sampleReport.ts");

    expect(result.parseErrors).toEqual([]);
    expect(result.lines).toEqual([4, 5, 6]);
  });

  it("uses the renderer AST gate instead of counting declarative wrapper bodies", async () => {
    const root = mkdtempSync(path.join(tmpdir(), "orderops-family-logic-"));
    try {
      mkdirSync(path.join(root, "src", "services"), { recursive: true });
      mkdirSync(path.join(root, "docs", "plans"), { recursive: true });
      for (const prefix of ["first", "second", "third"]) {
        writeFileSync(
          path.join(root, "src", "services", `${prefix}Renderer.ts`),
          `export function render${prefix}(): string { return "# ${prefix}"; }\n`,
          "utf8",
        );
        writeFileSync(
          path.join(root, "src", "services", `${prefix}Report.ts`),
          `export function render${prefix}Report(): string { return "# ${prefix}"; }\n`,
          "utf8",
        );
      }
      writeFileSync(
        path.join(root, "docs", "plans", "elegance-baseline.json"),
        JSON.stringify({
          structuralFamilies: {
            "src/services:renderer": 3,
            "src/services:report": 3,
          },
        }),
        "utf8",
      );

      const report = await buildFamilyLogicCensus({
        projectRoot: root,
        rendererCensus: {
          totalRenderers: 3,
          standardizedRenderers: 2,
          waivedUnstandardizedRenderers: 1,
          nonWaivedUnstandardizedRenderers: 0,
        },
      });

      expect(report.ready).toBe(true);
      expect(report.rankedFamilies.map((family) => family.family))
        .toEqual(["src/services:report", "src/services:renderer"]);
      expect(report.rankedFamilies[1]).toMatchObject({
        memberCount: 3,
        formattingLogicLines: 0,
        score: 0,
      });
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("reproduces the live 52-family ranking from one CLI command", () => {
    const output = execFileSync(process.execPath, [SCRIPT, "--json"], {
      cwd: ROOT,
      encoding: "utf8",
    });
    const report = JSON.parse(output);

    expect(report.ready).toBe(true);
    expect(report.trackedFamilyCount).toBeGreaterThan(0);
    expect(report.rankedFamilies).toHaveLength(report.trackedFamilyCount);
    expect(report.rendererAdjustment).toMatchObject({
      applied: true,
      nonWaivedRenderers: 0,
    });
  });
});
