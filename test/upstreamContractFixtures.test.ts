import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createUpstreamContractFixtureReport,
  loadUpstreamContractFixtureReport,
} from "../src/services/upstreamContractFixtures.js";

const javaFixture = {
  contractVersion: "failed-event-replay-execution-contract.v1",
  contractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  replayPreconditionsSatisfied: true,
  digestVerificationMode: "CLIENT_PRECHECK_ONLY",
  expectedSideEffects: [
    "PUBLISH_RABBITMQ_REPLAY_MESSAGE",
    "SAVE_REPLAY_ATTEMPT_AUDIT",
  ],
};

const miniKvFixture = {
  schema_version: 1,
  read_only: true,
  execution_allowed: false,
  command_digest: "fnv1a64:9f5c7ff14c0ebc5e",
  command: "SET",
  side_effects: ["store_write", "wal_append_when_enabled"],
  side_effect_count: 2,
  wal: {
    enabled: false,
    touches_wal: true,
    append_when_enabled: true,
    durability: "memory_only",
  },
};

describe("upstream contract fixture report", () => {
  it("loads stable Java and mini-kv fixture samples from configured paths", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-fixtures-"));
    const javaPath = path.join(directory, "java-contract.json");
    const miniKvPath = path.join(directory, "minikv-checkjson.json");
    await writeFile(javaPath, `${JSON.stringify(javaFixture)}\n`);
    await writeFile(miniKvPath, `${JSON.stringify(miniKvFixture)}\n`);

    const report = await loadUpstreamContractFixtureReport({
      javaExecutionContractFixturePath: javaPath,
      miniKvCheckJsonFixturePath: miniKvPath,
    });

    expect(report).toMatchObject({
      service: "orderops-node",
      valid: true,
      summary: {
        javaFixtureStatus: "available",
        javaContractVersion: "failed-event-replay-execution-contract.v1",
        javaContractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
        javaReplayPreconditionsSatisfied: true,
        miniKvFixtureStatus: "available",
        miniKvCommandDigest: "fnv1a64:9f5c7ff14c0ebc5e",
        miniKvReadOnly: true,
        miniKvExecutionAllowed: false,
        miniKvSideEffectCount: 2,
        miniKvDurability: "memory_only",
        missingFixtureCount: 0,
        invalidFixtureCount: 0,
      },
      checks: {
        javaContractDigestValid: true,
        javaExpectedSideEffectsPresent: true,
        miniKvCommandDigestValid: true,
        miniKvSideEffectCountMatches: true,
      },
    });
    expect(report.fixtureDigest.value).toHaveLength(64);
  });

  it("marks malformed fixture content invalid without throwing", () => {
    const report = createUpstreamContractFixtureReport(
      {
        name: "java-replay-execution-contract",
        path: "java.json",
        status: "invalid",
        message: "invalid test fixture",
        details: {
          contractVersion: "wrong",
          expectedSideEffects: [],
        },
      },
      {
        name: "mini-kv-checkjson-contract",
        path: "mini.json",
        status: "invalid",
        message: "invalid test fixture",
        details: {
          schema_version: 1,
          read_only: false,
          execution_allowed: true,
          side_effects: ["store_write"],
          side_effect_count: 2,
          wal: {},
        },
      },
    );

    expect(report.valid).toBe(false);
    expect(report.summary.invalidFixtureCount).toBe(2);
    expect(report.checks.javaContractVersionOk).toBe(false);
    expect(report.checks.miniKvReadOnlyOk).toBe(false);
    expect(report.checks.miniKvExecutionAllowedOk).toBe(false);
  });

  it("exposes fixture report routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-fixtures-route-"));
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
        url: "/api/v1/upstream-contract-fixtures",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        summary: {
          javaFixtureStatus: "available",
          miniKvFixtureStatus: "available",
          miniKvCommandDigest: "fnv1a64:9f5c7ff14c0ebc5e",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.body).toContain("# Upstream execution contract fixture report");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain("- mini-kv command digest: fnv1a64:9f5c7ff14c0ebc5e");
    } finally {
      await app.close();
    }
  });
});
