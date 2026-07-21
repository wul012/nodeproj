import { describe, expect, it } from "vitest";

import {
  NINE_POINT_LIMITS,
  evaluateNinePoint,
} from "../scripts/nine-point-census.mjs";

function readyInput() {
  return {
    elegance: {
      ready: true,
      nameViolationCount: NINE_POINT_LIMITS.nameDebt,
      trackedFamilyCount: NINE_POINT_LIMITS.trackedFamilies,
    },
    families: {
      ready: true,
      rankedFamilies: [
        { family: "src/services:renderers", score: NINE_POINT_LIMITS.renderersLogic },
        { family: "src/services:verification", score: NINE_POINT_LIMITS.verificationLogic },
      ],
    },
    maintainability: {
      scanErrors: [],
      sourceFiles: Array.from({ length: 70 }, (_, index) => ({
        file: `source-${index}.ts`,
        lines: index < NINE_POINT_LIMITS.nearLimitFiles ? 601 : 600,
      })),
      functions: Array.from({ length: 170 }, (_, index) => ({
        lines: index < NINE_POINT_LIMITS.longFunctions ? 121 : 120,
        complexity: index < NINE_POINT_LIMITS.complexFunctions ? 21 : 20,
      })),
      nearLimitFiles: Array.from({ length: NINE_POINT_LIMITS.nearLimitFiles }),
      longFunctions: Array.from({ length: NINE_POINT_LIMITS.longFunctions }),
      complexFunctions: Array.from({ length: NINE_POINT_LIMITS.complexFunctions }),
      importCycles: [],
    },
    renderers: {
      totalRenderers: 245,
      standardizedRenderers: 242,
      waivedUnstandardizedRenderers: 3,
      nonWaivedUnstandardizedRenderers: 0,
    },
  };
}

describe("nine-point census", () => {
  it("requires every foundation and absolute threshold without averaging", () => {
    const report = evaluateNinePoint(readyInput());

    expect(report.ninePointReady).toBe(true);
    expect(report.failedChecks).toEqual([]);
    expect(report.checks).toHaveLength(16);
  });

  it.each([
    ["sourceOverLimit", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.sourceFiles[0].lines = 801;
    }],
    ["importCycles", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.importCycles.push({ key: "a->b" });
    }],
    ["nonWaivedRenderers", (input: ReturnType<typeof readyInput>) => {
      input.renderers.nonWaivedUnstandardizedRenderers = 1;
    }],
    ["nearLimitFiles", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.nearLimitFiles.push({});
    }],
    ["longFunctions", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.longFunctions.push({});
    }],
    ["complexFunctions", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.complexFunctions.push({});
    }],
    ["maxFunctionLines", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.functions[0].lines = 161;
    }],
    ["maxComplexity", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.functions[0].complexity = 61;
    }],
    ["nameDebt", (input: ReturnType<typeof readyInput>) => {
      input.elegance.nameViolationCount += 1;
    }],
    ["renderersLogic", (input: ReturnType<typeof readyInput>) => {
      input.families.rankedFamilies[0].score += 1;
    }],
    ["verificationLogic", (input: ReturnType<typeof readyInput>) => {
      input.families.rankedFamilies[1].score += 1;
    }],
    ["trackedFamilies", (input: ReturnType<typeof readyInput>) => {
      input.elegance.trackedFamilyCount += 1;
    }],
  ])("fails when %s alone exceeds its limit", (key, mutate) => {
    const input = readyInput();
    mutate(input);

    const report = evaluateNinePoint(input);

    expect(report.ninePointReady).toBe(false);
    expect(report.failedChecks).toContain(key);
  });

  it.each([
    ["eleganceRatchet", (input: ReturnType<typeof readyInput>) => {
      input.elegance.ready = false;
    }],
    ["familyCensus", (input: ReturnType<typeof readyInput>) => {
      input.families.ready = false;
    }],
    ["maintainabilityScan", (input: ReturnType<typeof readyInput>) => {
      input.maintainability.scanErrors.push("parse error");
    }],
    ["rendererCoverage", (input: ReturnType<typeof readyInput>) => {
      input.renderers.standardizedRenderers -= 1;
    }],
  ])("cannot hide a failed %s foundation", (key, mutate) => {
    const input = readyInput();
    mutate(input);

    const report = evaluateNinePoint(input);

    expect(report.ninePointReady).toBe(false);
    expect(report.failedChecks).toContain(key);
  });
});
