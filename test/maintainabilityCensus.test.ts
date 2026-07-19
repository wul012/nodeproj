import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts", "maintainability-census.mjs");
const LIMITS = {
  nearLimitLines: 600,
  longFunctionLines: 120,
  complexFunctionScore: 20,
};

describe("maintainability census", () => {
  it("reproduces the live baseline and CI command", () => {
    const result = runCensus(ROOT);
    const packageJson = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const workflow = readFileSync(path.join(ROOT, ".github/workflows/node-evidence.yml"), "utf8");

    expect(result.status, result.stderr).toBe(0);
    expect(result.report.ready).toBe(true);
    expect(result.report.limits).toEqual(LIMITS);
    expect(result.report.measurement).toEqual({
      fileLines: "physical-lines",
      functionLines: "physical-source-span",
      complexity: "branch-score",
      importCycles: "static-runtime-relative-import-scc",
    });
    expect(result.report.counts.sourceFiles).toBeGreaterThan(1_000);
    expect(result.report.counts.nearLimitFiles).toBeGreaterThan(0);
    expect(result.report.violations).toEqual(emptyViolations());
    expect(packageJson.scripts["maintainability:census"])
      .toBe("node scripts/maintainability-census.mjs");
    expect(workflow).toContain("npm run maintainability:census");
    expect(workflow).toContain('"docs/plans3/maintainability-baseline.json"');
  });

  it("rejects new file, span, and complexity debt", () => {
    withFixture({
      files: { "hotspot.ts": complexHotspot() },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.violations.nearLimitFiles.unknown[0].key)
        .toBe("src/hotspot.ts");
      expect(result.report.violations.longFunctions.unknown[0].key)
        .toBe("src/hotspot.ts|work");
      expect(result.report.violations.complexFunctions.unknown[0].key)
        .toBe("src/hotspot.ts|work");
    });
  });

  it("rejects growth above a recorded ceiling", () => {
    withFixture({
      files: { "big.ts": `export const value = 1;\n${"// filler\n".repeat(601)}` },
      baseline: {
        nearLimitFiles: [{ key: "src/big.ts", maxLines: 601 }],
      },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.violations.nearLimitFiles.grown).toEqual([{
        key: "src/big.ts",
        baseline: 601,
        current: 602,
      }]);
    });
  });

  it("requires stale baseline entries to be removed", () => {
    withFixture({
      files: { "small.ts": "export const value = 1;\n" },
      baseline: {
        nearLimitFiles: [{ key: "src/removed.ts", maxLines: 700 }],
        longFunctions: [{ key: "src/removed.ts|oldWork", maxLines: 150 }],
        complexFunctions: [{ key: "src/removed.ts|oldWork", maxComplexity: 30 }],
        importCycles: [{ key: "src/a.ts|src/b.ts" }],
      },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.violations.nearLimitFiles.stale).toHaveLength(1);
      expect(result.report.violations.longFunctions.stale).toHaveLength(1);
      expect(result.report.violations.complexFunctions.stale).toHaveLength(1);
      expect(result.report.violations.importCycles.stale).toHaveLength(1);
    });
  });

  it("rejects a new runtime import cycle", () => {
    withFixture({
      files: {
        "a.ts": 'import { b } from "./b.js";\nexport const a = b + 1;\n',
        "b.ts": 'import { a } from "./a.js";\nexport const b = a + 1;\n',
      },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.violations.importCycles.unknown).toEqual([{
        key: "src/a.ts|src/b.ts",
        files: ["src/a.ts", "src/b.ts"],
      }]);
    });
  });

  it("does not treat explicit type-only links as runtime cycles", () => {
    withFixture({
      files: {
        "a.ts": 'import type { B } from "./b.js";\nexport interface A { peer: B }\n',
        "b.ts": 'import type { A } from "./a.js";\nexport interface B { peer: A }\n',
        "c.ts": 'export { type D } from "./d.js";\n',
        "d.ts": 'export { type C } from "./c.js";\n',
      },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status, result.stderr).toBe(0);
      expect(result.report.counts.importCycles).toBe(0);
    });
  });

  it("refuses to overwrite the baseline when source parsing fails", () => {
    withFixture({
      files: { "broken.ts": "export const broken = ;\n" },
    }, (root) => {
      const baseline = path.join(root, "docs", "plans3", "maintainability-baseline.json");
      const before = readFileSync(baseline, "utf8");
      const result = spawnSync(process.execPath, [
        SCRIPT,
        `--project-root=${root}`,
        "--refresh-baseline",
      ], { encoding: "utf8" });

      expect(result.status).toBe(1);
      expect(result.stderr).toContain("Expression expected");
      expect(readFileSync(baseline, "utf8")).toBe(before);
    });
  });

  it("rejects threshold drift in the baseline", () => {
    withFixture({
      files: { "small.ts": "export const value = 1;\n" },
      limits: { ...LIMITS, nearLimitLines: 601 },
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.violations.baselineErrors)
        .toContain("limits.nearLimitLines must equal 600");
    });
  });
});

interface CensusReport {
  ready: boolean;
  limits: typeof LIMITS;
  measurement: Record<string, string>;
  counts: Record<string, number>;
  violations: ReturnType<typeof emptyViolations>;
}

function runCensus(projectRoot: string): {
  status: number | null;
  stderr: string;
  report: CensusReport;
} {
  const result = spawnSync(process.execPath, [
    SCRIPT,
    `--project-root=${projectRoot}`,
    "--json",
  ], { encoding: "utf8" });
  return {
    status: result.status,
    stderr: result.stderr,
    report: JSON.parse(result.stdout),
  };
}

function withFixture(
  input: {
    files: Record<string, string>;
    limits?: typeof LIMITS;
    baseline?: Partial<Baseline>;
  },
  run: (root: string) => void,
): void {
  const root = mkdtempSync(path.join(tmpdir(), "orderops-health-"));
  try {
    mkdirSync(path.join(root, "src"), { recursive: true });
    mkdirSync(path.join(root, "docs", "plans3"), { recursive: true });
    for (const [file, content] of Object.entries(input.files)) {
      writeFileSync(path.join(root, "src", file), content, "utf8");
    }
    writeFileSync(
      path.join(root, "docs", "plans3", "maintainability-baseline.json"),
      JSON.stringify({
        schemaVersion: 1,
        limits: input.limits ?? LIMITS,
        nearLimitFiles: input.baseline?.nearLimitFiles ?? [],
        longFunctions: input.baseline?.longFunctions ?? [],
        complexFunctions: input.baseline?.complexFunctions ?? [],
        importCycles: input.baseline?.importCycles ?? [],
      }),
      "utf8",
    );
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

interface Baseline {
  nearLimitFiles: Array<{ key: string; maxLines: number }>;
  longFunctions: Array<{ key: string; maxLines: number }>;
  complexFunctions: Array<{ key: string; maxComplexity: number }>;
  importCycles: Array<{ key: string }>;
}

function complexHotspot(): string {
  const branches = Array.from(
    { length: 21 },
    (_, index) => `  if (input === ${index}) return ${index};`,
  );
  const body = [
    "export function work(input: number): number {",
    ...branches,
    ...Array.from({ length: 121 }, () => "  // deliberate fixture span"),
    "  return -1;",
    "}",
  ];
  return `${body.join("\n")}\n${"// file filler\n".repeat(500)}`;
}

function emptyViolations() {
  const section = () => ({ unknown: [], grown: [], stale: [] });
  return {
    baselineErrors: [],
    scanErrors: [],
    nearLimitFiles: section(),
    longFunctions: section(),
    complexFunctions: section(),
    importCycles: section(),
  };
}
