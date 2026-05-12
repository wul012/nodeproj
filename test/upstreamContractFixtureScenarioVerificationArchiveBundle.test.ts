import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadUpstreamContractFixtureScenarioMatrix,
} from "../src/services/upstreamContractFixtureScenarioMatrix.js";
import {
  createUpstreamContractFixtureScenarioMatrixVerification,
} from "../src/services/upstreamContractFixtureScenarioMatrixVerification.js";
import {
  createUpstreamContractFixtureScenarioVerificationArchiveBundle,
} from "../src/services/upstreamContractFixtureScenarioVerificationArchiveBundle.js";

const javaApprovedFixture = {
  contractVersion: "failed-event-replay-execution-contract.v1",
  contractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  approvalDigest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  replayEligibilityDigest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
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
  replayPreconditionsSatisfied: false,
  digestVerificationMode: "CLIENT_PRECHECK_ONLY",
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

describe("upstream contract fixture scenario verification archive bundle", () => {
  it("bundles scenario matrix and verification evidence for release archival", async () => {
    const paths = await writeFixtureSet();
    const matrix = await loadUpstreamContractFixtureScenarioMatrix({
      javaExecutionContractFixturePath: paths.javaApprovedPath,
      javaExecutionContractBlockedFixturePath: paths.javaBlockedPath,
      miniKvCheckJsonFixturePath: paths.miniKvWritePath,
      miniKvCheckJsonReadFixturePath: paths.miniKvReadPath,
    });
    const verification = createUpstreamContractFixtureScenarioMatrixVerification(matrix);

    const bundle = createUpstreamContractFixtureScenarioVerificationArchiveBundle(matrix, verification);

    expect(bundle).toMatchObject({
      service: "orderops-node",
      valid: true,
      readOnly: true,
      executionAllowed: false,
      summary: {
        matrixValid: true,
        verificationValid: true,
        matrixDigestValid: true,
        scenarioCountValid: true,
        sourcePathsPresent: true,
        blockedReplaySemanticsStable: true,
        miniKvReadSemanticsStable: true,
        totalScenarios: 4,
        sourcePathCount: 4,
        issueCount: 0,
      },
    });
    expect(bundle.archiveBundleDigest.value).toHaveLength(64);
    expect(bundle.digests.matrixDigest).toBe(`sha256:${matrix.matrixDigest.value}`);
    expect(bundle.digests.verificationDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(bundle.scenarioIds).toEqual([
      "java-approved-replay-contract",
      "java-blocked-replay-contract",
      "mini-kv-write-checkjson",
      "mini-kv-read-checkjson",
    ]);
    expect(bundle.sourcePaths["java-approved-replay-contract"]).toBe(paths.javaApprovedPath);
    expect(bundle.sourcePaths["mini-kv-read-checkjson"]).toBe(paths.miniKvReadPath);
    expect(bundle.evidenceEndpoints.scenarioMatrixVerificationArchiveBundleMarkdown).toBe(
      "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown",
    );
  });

  it("exposes archive bundle routes in JSON and Markdown", async () => {
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
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/verification/archive-bundle?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        summary: {
          verificationValid: true,
          sourcePathCount: 4,
          issueCount: 0,
        },
      });
      expect(json.json().archiveBundleDigest.value).toMatch(/^[a-f0-9]{64}$/);
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream fixture scenario verification archive bundle");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain("## Scenario Sources");
      expect(markdown.body).toContain("mini-kv-read-checkjson");
      expect(markdown.body).toContain("scenarioMatrixVerificationArchiveBundleMarkdown");
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
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-scenario-verification-archive-"));
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
