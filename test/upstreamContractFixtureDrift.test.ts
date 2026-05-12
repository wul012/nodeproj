import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createUpstreamContractFixtureDriftDiagnostics,
} from "../src/services/upstreamContractFixtureDrift.js";
import {
  createUpstreamContractFixtureReport,
} from "../src/services/upstreamContractFixtures.js";

const javaFixture = {
  contractVersion: "failed-event-replay-execution-contract.v1",
  contractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  replayPreconditionsSatisfied: true,
  digestVerificationMode: "CLIENT_PRECHECK_ONLY",
  expectedSideEffects: ["PUBLISH_RABBITMQ_REPLAY_MESSAGE"],
};

const miniKvFixture = {
  schema_version: 1,
  read_only: true,
  execution_allowed: false,
  command_digest: "fnv1a64:9f5c7ff14c0ebc5e",
  side_effects: ["store_write", "wal_append_when_enabled"],
  side_effect_count: 2,
  wal: {
    durability: "memory_only",
  },
};

describe("upstream contract fixture drift diagnostics", () => {
  it("reports clean drift diagnostics for schema-aligned fixtures", () => {
    const fixtureReport = createUpstreamContractFixtureReport(
      {
        name: "java-replay-execution-contract",
        path: "java.json",
        status: "available",
        message: "ok",
        details: javaFixture,
      },
      {
        name: "mini-kv-checkjson-contract",
        path: "minikv.json",
        status: "available",
        message: "ok",
        details: miniKvFixture,
      },
    );
    const diagnostics = createUpstreamContractFixtureDriftDiagnostics(fixtureReport);

    expect(diagnostics).toMatchObject({
      valid: true,
      summary: {
        fixtureReportValid: true,
        issueCount: 0,
        errorCount: 0,
        warningCount: 0,
        missingMappingCount: 0,
      },
      issues: [],
    });
    expect(diagnostics.mappings).toEqual(expect.arrayContaining([
      expect.objectContaining({ fixtureField: "contractDigest", diagnosticsField: "javaContractDigest", present: true }),
      expect.objectContaining({ fixtureField: "wal.durability", diagnosticsField: "miniKvCheckDurability", present: true }),
    ]));
    expect(diagnostics.driftDigest.value).toHaveLength(64);
  });

  it("pinpoints missing or drifted fields used by Node diagnostics", () => {
    const fixtureReport = createUpstreamContractFixtureReport(
      {
        name: "java-replay-execution-contract",
        path: "java.json",
        status: "invalid",
        message: "bad java",
        details: {
          contractVersion: "wrong",
          contractDigest: "not-sha",
          replayPreconditionsSatisfied: false,
          digestVerificationMode: "SERVER_ONLY",
          expectedSideEffects: [],
        },
      },
      {
        name: "mini-kv-checkjson-contract",
        path: "minikv.json",
        status: "invalid",
        message: "bad minikv",
        details: {
          schema_version: 1,
          command_digest: "bad",
          read_only: false,
          execution_allowed: true,
          side_effects: ["store_write"],
          side_effect_count: 2,
          wal: {},
        },
      },
    );
    const diagnostics = createUpstreamContractFixtureDriftDiagnostics(fixtureReport);

    expect(diagnostics.valid).toBe(false);
    expect(diagnostics.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "JAVA_FIXTURE_CONTRACT_VERSION_DRIFT", field: "contractVersion" }),
      expect.objectContaining({ code: "JAVA_FIXTURE_APPROVAL_DIGEST_DRIFT", field: "approvalDigest" }),
      expect.objectContaining({ code: "MINIKV_FIXTURE_COMMAND_DIGEST_DRIFT", field: "command_digest" }),
      expect.objectContaining({ code: "MINIKV_FIXTURE_EXECUTION_ALLOWED_DRIFT", field: "execution_allowed" }),
      expect.objectContaining({ code: "FIXTURE_DIAGNOSTICS_FIELD_MAPPING_MISSING", field: "wal.durability" }),
    ]));
  });

  it("exposes drift diagnostics routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-drift-route-"));
    const javaPath = path.join(directory, "java-contract.json");
    const miniKvPath = path.join(directory, "minikv-checkjson.json");
    await writeFile(javaPath, `${JSON.stringify(javaFixture)}\n`);
    await writeFile(miniKvPath, `${JSON.stringify(miniKvFixture)}\n`);
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      JAVA_EXECUTION_CONTRACT_FIXTURE_PATH: javaPath,
      MINIKV_CHECKJSON_FIXTURE_PATH: miniKvPath,
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/drift-diagnostics",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/drift-diagnostics?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        summary: {
          issueCount: 0,
          missingMappingCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Upstream execution contract fixture drift diagnostics");
      expect(markdown.body).toContain("- Issue count: 0");
      expect(markdown.body).toContain("- No fixture drift diagnostics.");
    } finally {
      await app.close();
    }
  });
});
