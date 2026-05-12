import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
} from "../src/services/upstreamContractFixtureScenarioMatrix.js";

const javaApprovedFixture = {
  contractVersion: "failed-event-replay-execution-contract.v1",
  contractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  approvalStatus: "APPROVED",
  replayPreconditionsSatisfied: true,
  digestVerificationMode: "CLIENT_PRECHECK_ONLY",
  realExecutionMethod: "POST",
  realExecutionPath: "/api/v1/failed-events/{id}/replay",
  executionChecks: [
    { checkId: "FAILED_EVENT_EXISTS", status: "PASSED" },
    { checkId: "REPLAY_APPROVAL_APPROVED", status: "PASSED" },
  ],
  blockedBy: [],
  expectedSideEffects: ["PUBLISH_RABBITMQ_REPLAY_MESSAGE"],
};

const javaBlockedFixture = {
  contractVersion: "failed-event-replay-execution-contract.v1",
  contractDigest: "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  approvalDigest: "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  replayEligibilityDigest: "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  approvalStatus: "PENDING",
  replayPreconditionsSatisfied: false,
  digestVerificationMode: "CLIENT_PRECHECK_ONLY",
  realExecutionMethod: "POST",
  realExecutionPath: "/api/v1/failed-events/{id}/replay",
  executionChecks: [
    { checkId: "FAILED_EVENT_EXISTS", status: "PASSED" },
    { checkId: "REPLAY_APPROVAL_APPROVED", status: "FAILED" },
  ],
  blockedBy: ["REPLAY_APPROVAL_NOT_APPROVED"],
  expectedSideEffects: [],
};

const miniKvWriteFixture = {
  schema_version: 1,
  read_only: true,
  execution_allowed: false,
  command_digest: "fnv1a64:9f5c7ff14c0ebc5e",
  command: "SET",
  write_command: true,
  side_effects: ["store_write", "wal_append_when_enabled"],
  side_effect_count: 2,
  wal: {
    durability: "memory_only",
  },
};

const miniKvReadFixture = {
  schema_version: 1,
  read_only: true,
  execution_allowed: false,
  command_digest: "fnv1a64:e8d7a3d61e2a8111",
  command: "GET",
  write_command: false,
  side_effects: ["store_read"],
  side_effect_count: 1,
  wal: {
    durability: "not_applicable",
  },
};

describe("upstream contract fixture scenario matrix", () => {
  it("loads approved, blocked, write, and read fixture scenarios", async () => {
    const paths = await writeFixtureSet();

    const matrix = await loadUpstreamContractFixtureScenarioMatrix({
      javaExecutionContractFixturePath: paths.javaApprovedPath,
      javaExecutionContractBlockedFixturePath: paths.javaBlockedPath,
      miniKvCheckJsonFixturePath: paths.miniKvWritePath,
      miniKvCheckJsonReadFixturePath: paths.miniKvReadPath,
    });

    expect(matrix).toMatchObject({
      service: "orderops-node",
      valid: true,
      summary: {
        totalScenarios: 4,
        validScenarios: 4,
        diagnosticReadyScenarios: 4,
        issueCount: 0,
        javaScenarioCount: 2,
        miniKvScenarioCount: 2,
      },
      driftSummary: {
        hasDrift: false,
        issueCount: 0,
        issues: [],
      },
    });
    expect(matrix.matrixDigest.value).toHaveLength(64);
    expect(matrix.scenarios.map((scenario) => scenario.id)).toEqual([
      "java-approved-replay-contract",
      "java-blocked-replay-contract",
      "mini-kv-write-checkjson",
      "mini-kv-read-checkjson",
    ]);
    expect(matrix.scenarios.find((scenario) => scenario.id === "java-blocked-replay-contract")).toMatchObject({
      valid: true,
      keyFields: {
        replayPreconditionsSatisfied: false,
        blockedBy: ["REPLAY_APPROVAL_NOT_APPROVED"],
        expectedSideEffectCount: 0,
        failedExecutionCheckCount: 1,
      },
    });
    expect(matrix.scenarios.find((scenario) => scenario.id === "mini-kv-read-checkjson")).toMatchObject({
      valid: true,
      keyFields: {
        command: "GET",
        readOnly: true,
        executionAllowed: false,
        sideEffects: ["store_read"],
        sideEffectCount: 1,
      },
    });
  });

  it("exposes scenario matrix routes in JSON and Markdown", async () => {
    const paths = await writeFixtureSet();
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      JAVA_EXECUTION_CONTRACT_FIXTURE_PATH: paths.javaApprovedPath,
      JAVA_EXECUTION_CONTRACT_BLOCKED_FIXTURE_PATH: paths.javaBlockedPath,
      MINIKV_CHECKJSON_FIXTURE_PATH: paths.miniKvWritePath,
      MINIKV_CHECKJSON_READ_FIXTURE_PATH: paths.miniKvReadPath,
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        summary: {
          totalScenarios: 4,
          issueCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream fixture scenario matrix");
      expect(markdown.body).toContain("### java-blocked-replay-contract");
      expect(markdown.body).toContain("### mini-kv-read-checkjson");
      expect(markdown.body).toContain("- sideEffects: [\"store_read\"]");
      expect(markdown.body).toContain("- No scenario fixture drift.");
    } finally {
      await app.close();
    }
  });
});

async function writeFixtureSet(): Promise<{
  javaApprovedPath: string;
  javaBlockedPath: string;
  miniKvWritePath: string;
  miniKvReadPath: string;
}> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-scenario-matrix-"));
  const javaApprovedPath = path.join(directory, "java-approved.json");
  const javaBlockedPath = path.join(directory, "java-blocked.json");
  const miniKvWritePath = path.join(directory, "minikv-write.json");
  const miniKvReadPath = path.join(directory, "minikv-read.json");

  await writeFile(javaApprovedPath, `${JSON.stringify(javaApprovedFixture)}\n`);
  await writeFile(javaBlockedPath, `${JSON.stringify(javaBlockedFixture)}\n`);
  await writeFile(miniKvWritePath, `${JSON.stringify(miniKvWriteFixture)}\n`);
  await writeFile(miniKvReadPath, `${JSON.stringify(miniKvReadFixture)}\n`);

  return {
    javaApprovedPath,
    javaBlockedPath,
    miniKvWritePath,
    miniKvReadPath,
  };
}
