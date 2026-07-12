import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { buildEleganceCensus } from "../scripts/elegance-census.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts", "elegance-census.mjs");

describe("elegance census", () => {
  it("reproduces the live shrink-only baseline and CI command", async () => {
    const report = await buildEleganceCensus({ projectRoot: ROOT });
    const baselinePath = path.join(ROOT, "docs", "plans", "elegance-baseline.json");
    const baselineBefore = readFileSync(baselinePath, "utf8");
    const cli = spawnSync(process.execPath, [SCRIPT, "--json"], { encoding: "utf8" });
    const packageJson = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8"));
    const workflow = readFileSync(path.join(ROOT, ".github/workflows/node-evidence.yml"), "utf8");

    expect(cli.status, cli.stderr).toBe(0);
    expect(JSON.parse(cli.stdout).ready).toBe(true);
    expect(readFileSync(baselinePath, "utf8")).toBe(baselineBefore);
    expect(report.ready).toBe(true);
    expect(report.maxNameLength).toBe(40);
    expect(report.familyThreshold).toBe(3);
    expect(report.nameViolationCount).toBe(report.baselineNameCount);
    expect(report.nameViolationCount).toBeGreaterThan(0);
    expect(report.trackedFamilyCount).toBeGreaterThan(0);
    expect(report.ratchet).toEqual({
      baselineErrors: [],
      scanErrors: [],
      grownNameDebt: [],
      shrunkNameDebt: [],
      changedNameDebt: [],
      newFamilies: [],
      grownFamilies: [],
      shrunkFamilies: [],
      staleFamilies: [],
    });
    expect(packageJson.scripts["elegance:census"]).toBe("node scripts/elegance-census.mjs");
    expect(workflow).toContain("npm run elegance:census");
    expect(workflow).toContain('"docs/plans/elegance-baseline.json"');
  });

  it("rejects new over-budget filenames and exports", async () => {
    await withFixture({
      files: {
        "ThisFileNameIsDefinitelyLongerThanFortyCharacters.ts":
          [
            "const source = true;",
            "export const ThisExportedIdentifierIsAlsoLongerThanFortyCharacters = true;",
            "export { source as ThisReExportedIdentifierIsLongerThanFortyCharacters };",
            "",
          ].join("\n"),
      },
    }, async (root) => {
      const report = await buildEleganceCensus({ projectRoot: root });

      expect(report.ready).toBe(false);
      expect(report.ratchet.grownNameDebt).toHaveLength(1);
      expect(report.topNameViolations.map((item) => item.declarationKind).filter(Boolean).sort())
        .toEqual(["re-export", "variable"]);
    });
  });

  it("rejects a third family member and growth", async () => {
    const files = {
      "firstService.ts": "export const first = 1;\n",
      "secondService.ts": "export const second = 2;\n",
      "thirdService.ts": "export const third = 3;\n",
    };
    await withFixture({ files }, async (root) => {
      const report = await buildEleganceCensus({ projectRoot: root });
      expect(report.ratchet.newFamilies).toEqual([
        { family: "src:service", currentFiles: 3 },
      ]);
    });
    await withFixture({
      files: { ...files, "fourthService.ts": "export const fourth = 4;\n" },
      baseline: { structuralFamilies: { "src:service": 3 } },
    }, async (root) => {
      const report = await buildEleganceCensus({ projectRoot: root });
      expect(report.ratchet.grownFamilies).toEqual([
        { family: "src:service", baselineFiles: 3, currentFiles: 4 },
      ]);
    });
  });

  it("requires baseline cleanup when debt shrinks", async () => {
    await withFixture({
      files: {
        "firstService.ts": "export const first = 1;\n",
        "secondService.ts": "export const second = 2;\n",
        "thirdService.ts": "export const third = 3;\n",
      },
      baseline: {
        nameKeys: ["file|src/RemovedFileNameThatWasLongerThanFortyCharacters.ts"],
        structuralFamilies: { "src:service": 4 },
      },
    }, async (root) => {
      const report = await buildEleganceCensus({ projectRoot: root });

      expect(report.ratchet.shrunkNameDebt).toHaveLength(1);
      expect(report.ratchet.shrunkFamilies).toEqual([
        { family: "src:service", baselineFiles: 4, currentFiles: 3 },
      ]);
    });
    await withFixture({
      files: {
        "CurrentFileNameThatIsDefinitelyLongerThanFortyCharacters.ts":
          "export const value = 1;\n",
      },
      baseline: {
        nameKeys: ["file|src/DifferentFileNameThatWasLongerThanFortyCharacters.ts"],
      },
    }, async (root) => {
      const report = await buildEleganceCensus({ projectRoot: root });
      expect(report.ratchet.changedNameDebt).toHaveLength(1);
    });
  });

  it("returns a non-zero CLI status for a ratchet violation", async () => {
    await withFixture({
      files: {
        "ThisFileNameIsDefinitelyLongerThanFortyCharacters.ts": "export const value = 1;\n",
      },
    }, async (root) => {
      const result = spawnSync(process.execPath, [
        SCRIPT,
        `--project-root=${root}`,
        "--json",
      ], { encoding: "utf8" });

      expect(result.status).toBe(1);
      expect(JSON.parse(result.stdout).ready).toBe(false);
    });
  });
});

async function withFixture(
  input: {
    files: Record<string, string>;
    baseline?: {
      nameKeys?: string[];
      structuralFamilies?: Record<string, number>;
    };
  },
  run: (root: string) => Promise<void>,
): Promise<void> {
  const root = mkdtempSync(path.join(tmpdir(), "orderops-elegance-"));
  try {
    mkdirSync(path.join(root, "src"), { recursive: true });
    mkdirSync(path.join(root, "docs", "plans"), { recursive: true });
    for (const [file, content] of Object.entries(input.files)) {
      writeFileSync(path.join(root, "src", file), content, "utf8");
    }
    writeFileSync(
      path.join(root, "docs", "plans", "elegance-baseline.json"),
      JSON.stringify({
        schemaVersion: 1,
        maxNameLength: 40,
        familyThreshold: 3,
        nameDebt: fixtureNameDebt(input.baseline?.nameKeys ?? []),
        structuralFamilies: input.baseline?.structuralFamilies ?? {},
      }),
      "utf8",
    );
    await run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function fixtureNameDebt(keys: string[]) {
  return {
    count: keys.length,
    fileCount: keys.filter((key) => key.startsWith("file|")).length,
    exportCount: keys.filter((key) => key.startsWith("export|")).length,
    keyDigest: `sha256:${createHash("sha256").update([...keys].sort().join("\n")).digest("hex")}`,
  };
}
