import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createUpstreamContractFixtureArchiveSnapshot,
} from "../src/services/upstreamContractFixtureArchive.js";
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

describe("upstream contract fixture archive snapshot", () => {
  it("combines fixture report and drift diagnostics into a digestable archive snapshot", () => {
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
    const snapshot = createUpstreamContractFixtureArchiveSnapshot(diagnostics);

    expect(snapshot).toMatchObject({
      service: "orderops-node",
      valid: true,
      summary: {
        fixtureReportValid: true,
        driftDiagnosticsValid: true,
        hasDrift: false,
        issueCount: 0,
        missingMappingCount: 0,
        javaFixtureStatus: "available",
        miniKvFixtureStatus: "available",
      },
      digests: {
        fixtureReportDigest: `sha256:${fixtureReport.fixtureDigest.value}`,
        driftDigest: `sha256:${diagnostics.driftDigest.value}`,
        javaContractDigest: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
        miniKvCommandDigest: "fnv1a64:9f5c7ff14c0ebc5e",
      },
      sourcePaths: {
        javaExecutionContractFixturePath: "java.json",
        miniKvCheckJsonFixturePath: "minikv.json",
      },
    });
    expect(snapshot.fixtureArchiveDigest.value).toHaveLength(64);
    expect(snapshot.evidenceEndpoints.archiveSnapshotMarkdown).toBe("/api/v1/upstream-contract-fixtures/archive-snapshot?format=markdown");
  });

  it("exposes archive snapshot routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-fixture-archive-route-"));
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
        url: "/api/v1/upstream-contract-fixtures/archive-snapshot",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/archive-snapshot?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        summary: {
          hasDrift: false,
          issueCount: 0,
          missingMappingCount: 0,
        },
        sourcePaths: {
          javaExecutionContractFixturePath: javaPath,
          miniKvCheckJsonFixturePath: miniKvPath,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream fixture evidence archive snapshot");
      expect(markdown.body).toContain("- Valid: true");
      expect(markdown.body).toContain("- Fixture report digest: sha256:");
      expect(markdown.body).toContain("- mini-kv command digest: fnv1a64:9f5c7ff14c0ebc5e");
      expect(markdown.body).toContain("- commandDigest: fnv1a64:9f5c7ff14c0ebc5e");
    } finally {
      await app.close();
    }
  });
});
