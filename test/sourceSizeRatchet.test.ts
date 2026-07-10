import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import { describe, expect, it } from "vitest";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(PROJECT_ROOT, "scripts", "source-size-census.mjs");

describe("source size ratchet", () => {
  it("keeps the live src census within the shrink-only remediation baseline", () => {
    const result = runCensus(PROJECT_ROOT);

    expect(result.status, result.stderr).toBe(0);
    expect(result.report.ready).toBe(true);
    expect(result.report.threshold).toBe(800);
    expect(result.report.oversizedFileCount).toBe(result.report.remediationEntryCount);
    expect(result.report.violations).toEqual({
      baselineErrors: [],
      unknownOversizedFiles: [],
      grownRemediationFiles: [],
      staleRemediationEntries: [],
      oversizedCountExceeded: false,
    });
  });

  it("rejects an oversized source file that is not in the remediation baseline", () => {
    withFixtureProject({ maxOversized: 0, remediation: [], lineCount: 801 }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.ready).toBe(false);
      expect(result.report.violations.unknownOversizedFiles).toEqual([
        { file: "src/big.ts", lines: 801 },
      ]);
    });
  });

  it("rejects growth above a recorded remediation ceiling", () => {
    withFixtureProject({
      maxOversized: 1,
      remediation: [{
        file: "src/big.ts",
        maxLines: 801,
        targetVersion: "v-test",
        reason: "fixture debt",
      }],
      lineCount: 802,
    }, (root) => {
      const result = runCensus(root);

      expect(result.status).toBe(1);
      expect(result.report.ready).toBe(false);
      expect(result.report.violations.grownRemediationFiles).toEqual([
        {
          file: "src/big.ts",
          maxLines: 801,
          targetVersion: "v-test",
          reason: "fixture debt",
          currentLines: 802,
        },
      ]);
    });
  });
});

function runCensus(projectRoot: string): {
  status: number | null;
  stderr: string;
  report: {
    ready: boolean;
    threshold: number;
    oversizedFileCount: number;
    remediationEntryCount: number;
    violations: {
      baselineErrors: string[];
      unknownOversizedFiles: Array<{ file: string; lines: number }>;
      grownRemediationFiles: Array<Record<string, unknown>>;
      staleRemediationEntries: Array<Record<string, unknown>>;
      oversizedCountExceeded: boolean;
    };
  };
} {
  const result = spawnSync(process.execPath, [SCRIPT, `--project-root=${projectRoot}`, "--json"], {
    encoding: "utf8",
  });
  return {
    status: result.status,
    stderr: result.stderr,
    report: JSON.parse(result.stdout),
  };
}

function withFixtureProject(
  input: {
    maxOversized: number;
    remediation: Array<Record<string, unknown>>;
    lineCount: number;
  },
  run: (root: string) => void,
): void {
  const root = mkdtempSync(path.join(tmpdir(), "orderops-source-size-"));
  try {
    mkdirSync(path.join(root, "src"), { recursive: true });
    mkdirSync(path.join(root, "docs", "plans"), { recursive: true });
    writeFileSync(path.join(root, "src", "big.ts"), "x\n".repeat(input.lineCount), "utf8");
    writeFileSync(
      path.join(root, "docs", "plans", "source-size-remediation-baseline.json"),
      JSON.stringify({
        schemaVersion: 1,
        threshold: 800,
        maxOversized: input.maxOversized,
        remediation: input.remediation,
      }),
      "utf8",
    );
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
