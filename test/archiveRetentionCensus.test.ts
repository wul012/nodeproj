import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { describe, expect, it } from "vitest";

const scriptPath = path.resolve("scripts/archive-retention-census.mjs");

describe("archive retention census", () => {
  it("keeps the repository archive set inside every committed budget", () => {
    const result = runCensus(process.cwd());

    expect(result.status).toBe(0);
    expect(result.report).toMatchObject({
      schemaVersion: 1,
      budget: "docs/archive-retention-budget.json",
      ready: true,
      limits: {
        maxAggregateBytes: 83_886_080,
        maxArchiveFileCount: 8_000,
        maxVersionDirectoryBytes: 1_048_576,
        maxWalkthroughFileBytes: 65_536,
      },
      violations: {
        budgetErrors: [],
        missingRoots: [],
        symbolicLinks: [],
        versionDirectoriesExceeded: [],
        walkthroughFilesExceeded: [],
        boundedRootsExceeded: [],
        boundedFilesExceeded: [],
        aggregateExceeded: false,
        fileCountExceeded: false,
      },
    });
    expect(result.report.archiveFileCount).toBeGreaterThan(7_000);
    expect(result.report.roots.map((root: { path: string }) => root.path)).toEqual(expect.arrayContaining([
      "a",
      "d",
      "fixtures",
      "docs/plans",
      "代码讲解记录_生产雏形阶段3",
    ]));
  });

  it("fails aggregate, count, version, walkthrough, and bounded-root regressions together", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "orderops-archive-retention-"));
    try {
      await mkdir(path.join(root, "versions", "1"), { recursive: true });
      await mkdir(path.join(root, "walkthroughs"), { recursive: true });
      await mkdir(path.join(root, "fixed"), { recursive: true });
      await writeFile(path.join(root, "versions", "1", "evidence.txt"), "12345");
      await writeFile(path.join(root, "walkthroughs", "record.md"), "12345");
      await writeFile(path.join(root, "fixed", "fixture.json"), "12345");
      await writeFile(path.join(root, "budget.json"), JSON.stringify({
        schemaVersion: 1,
        versionedRoots: ["versions"],
        walkthroughRoots: ["walkthroughs"],
        boundedRoots: [{
          path: "fixed",
          purpose: "bounded fixture evidence for a negative test",
          maxBytes: 4,
          maxFileBytes: 4,
        }],
        limits: {
          maxAggregateBytes: 8,
          maxArchiveFileCount: 2,
          maxVersionDirectoryBytes: 4,
          maxWalkthroughFileBytes: 4,
        },
      }));

      const result = runCensus(root, "budget.json");

      expect(result.status).toBe(1);
      expect(result.report.ready).toBe(false);
      expect(result.report.violations).toMatchObject({
        aggregateExceeded: true,
        fileCountExceeded: true,
      });
      expect(result.report.violations.versionDirectoriesExceeded).toHaveLength(1);
      expect(result.report.violations.walkthroughFilesExceeded).toHaveLength(1);
      expect(result.report.violations.boundedRootsExceeded).toHaveLength(1);
      expect(result.report.violations.boundedFilesExceeded).toHaveLength(1);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});

function runCensus(projectRoot: string, budget = "docs/archive-retention-budget.json") {
  const run = spawnSync(process.execPath, [
    scriptPath,
    "--json",
    `--project-root=${projectRoot}`,
    `--budget=${budget}`,
  ], { encoding: "utf8" });
  return {
    status: run.status,
    report: JSON.parse(run.stdout) as {
      archiveFileCount: number;
      ready: boolean;
      roots: Array<{ path: string }>;
      violations: Record<string, unknown>;
    },
  };
}
