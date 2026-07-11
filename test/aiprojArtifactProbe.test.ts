import { readFile } from "node:fs/promises";

import { afterEach, describe, expect, it } from "vitest";

import {
  selectAiprojArtifactSchema,
  validateAiprojArtifactContract,
} from "../src/integration/aiprojArtifactContract.js";
import { runAiprojArtifactProbe } from "../src/integration/aiprojArtifactProbe.js";
import {
  createAiprojCapstoneFixture,
  type AiprojCapstoneFixture,
} from "./helpers/aiprojCapstoneFixture.js";

describe("aiproj artifact capstone probe", () => {
  const fixtures: AiprojCapstoneFixture[] = [];

  afterEach(async () => {
    await Promise.all(fixtures.splice(0).map((fixture) => fixture.cleanup()));
  });

  it("validates one registry-listed publication receipt and pins its digest", async () => {
    const fixture = await createFixture();
    const observation = await runAiprojArtifactProbe({
      rootDirectory: fixture.rootDirectory,
      commit: "aiproj-test-commit",
    });

    expect(observation.c4Checks.map((check) => [check.id, check.status])).toEqual([
      ["aiproj.registry", "pass"],
      ["aiproj.artifact_integrity", "pass"],
      ["aiproj.artifact_contract", "pass"],
      ["aiproj.no_promotion", "pass"],
    ]);
    const integrity = observation.c4Checks[1].evidence;
    expect(integrity).toMatchObject({
      artifact_path: "artifacts/publication-receipt.json",
      artifact_resolved_path: "artifacts/publication-receipt.json",
      aiproj_commit: "aiproj-test-commit",
    });
    expect(integrity.artifact_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(observation.c4Checks[3].evidence).toMatchObject({
      read_only: true,
      process_executed: false,
      promotion_allowed: false,
      granted_use: "downstream_governance_lookup_only",
      promotion_ready: false,
      approved_for_promotion: false,
    });
  });

  it("fails the contract when a registered required field disappears", async () => {
    const fixture = await createFixture();
    delete fixture.artifact.interpretation;
    await fixture.writeArtifact();

    const observation = await runAiprojArtifactProbe({
      rootDirectory: fixture.rootDirectory,
      commit: "aiproj-test-commit",
    });

    expect(observation.c4Checks[2]).toMatchObject({
      id: "aiproj.artifact_contract",
      status: "fail",
      evidence: { missing_fields: ["interpretation"] },
    });
  });

  it("fails both schema and boundary checks when promotion fields drift", async () => {
    const fixture = await createFixture();
    const summary = fixture.artifact.summary as Record<string, unknown>;
    summary.promotion_ready = true;
    await fixture.writeArtifact();

    const observation = await runAiprojArtifactProbe({
      rootDirectory: fixture.rootDirectory,
      commit: "aiproj-test-commit",
    });

    expect(observation.c4Checks[2].status).toBe("fail");
    expect(observation.c4Checks[3]).toMatchObject({
      id: "aiproj.no_promotion",
      status: "fail",
      evidence: { promotion_ready: true },
    });
  });

  it("reports registry type-rule drift without weakening type checks", async () => {
    const fixture = await createFixture();
    fixture.artifact.check_rows = {};
    await fixture.writeArtifact();

    const selection = selectAiprojArtifactSchema(fixture.registry);
    const validation = validateAiprojArtifactContract(fixture.artifact, selection);

    expect(validation.passed).toBe(false);
    expect(validation.typeMismatches).toEqual([
      { field: "check_rows", expected: "list", actual: "dict" },
    ]);
  });

  it("rejects a registry path that escapes the aiproj root", async () => {
    const fixture = await createFixture();
    const schemas = fixture.registry.schemas as Array<Record<string, unknown>>;
    schemas[0].artifact_paths = ["../outside.json"];
    await fixture.writeRegistry();

    const observation = await runAiprojArtifactProbe({
      rootDirectory: fixture.rootDirectory,
      commit: "aiproj-test-commit",
    });

    expect(observation.c4Checks).toHaveLength(1);
    expect(observation.c4Checks[0]).toMatchObject({
      id: "aiproj.artifact_validation",
      status: "fail",
      evidence: {
        read_only: true,
        process_executed: false,
        promotion_allowed: false,
      },
    });
    expect(observation.c4Checks[0].evidence.error).toContain("escapes aiproj root");
  });

  it("keeps the aiproj probe mechanically free of process and write APIs", async () => {
    const source = await readFile("src/integration/aiprojArtifactProbe.ts", "utf8");
    const digestSource = await readFile("src/integration/capstoneDigest.ts", "utf8");

    expect(source).toContain('from "./capstoneDigest.js"');
    expect(source).not.toContain("capstoneProcessSupport");
    expect(source).not.toMatch(/node:child_process|\bspawn\s*\(|\bexec(?:File)?\s*\(/);
    expect(source).not.toMatch(/\bwriteFile\s*\(|\bmkdir\s*\(|\brename\s*\(|\brm\s*\(/);
    expect(digestSource).not.toMatch(/node:child_process|\bspawn\s*\(|\bexec(?:File)?\s*\(/);
    expect(digestSource).not.toMatch(/\bwriteFile\s*\(|\bmkdir\s*\(|\brename\s*\(|\brm\s*\(/);
  });

  async function createFixture(): Promise<AiprojCapstoneFixture> {
    const fixture = await createAiprojCapstoneFixture();
    fixtures.push(fixture);
    return fixture;
  }
});
