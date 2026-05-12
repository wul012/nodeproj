import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
} from "../src/services/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceIndex,
} from "../src/services/upstreamContractFixtureScenarioReleaseEvidenceIndex.js";

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

describe("upstream contract fixture scenario release evidence readiness gate", () => {
  it("turns a valid release evidence index into an archive readiness gate", async () => {
    const paths = await writeFixtureSet();
    const index = await loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(createConfig(paths));

    const gate = createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(index);

    expect(gate).toMatchObject({
      service: "orderops-node",
      readyForReleaseEvidenceArchive: true,
      readOnly: true,
      executionAllowed: false,
      checks: {
        indexValid: true,
        indexReadOnly: true,
        indexExecutionBlocked: true,
        evidenceCountComplete: true,
        allEvidenceValid: true,
        allEvidenceReadOnly: true,
        executionNeverAllowed: true,
        digestCoverageComplete: true,
        sourcePathCoverageValid: true,
        scenarioEvidenceCoverageValid: true,
        noScenarioIssues: true,
        maturityTargetProductionLeaning: true,
        sourceIndexDigestPresent: true,
      },
      summary: {
        maturityTarget: "production-leaning",
        evidenceCount: 4,
        blockerCount: 0,
        warningCount: 2,
      },
    });
    expect(gate.sourceIndexDigest).toMatch(/^sha256:[a-f0-9]{64}$/);
    expect(gate.evidenceGates).toHaveLength(4);
    expect(gate.evidenceGates.every((entry) => entry.canAuthorizeExecution === false)).toBe(true);
    expect(gate.nextActions).toContain("Archive the release evidence index and readiness gate output together.");
  });

  it("blocks archive readiness when the release evidence index is invalid", async () => {
    const paths = await writeFixtureSet();
    const index = await loadUpstreamContractFixtureScenarioReleaseEvidenceIndex(createConfig(paths));
    const invalidIndex = {
      ...index,
      valid: false,
      summary: {
        ...index.summary,
        invalidEvidenceCount: 1,
      },
    };

    const gate = createUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(invalidIndex);

    expect(gate.readyForReleaseEvidenceArchive).toBe(false);
    expect(gate.checks.indexValid).toBe(false);
    expect(gate.summary.blockerCount).toBeGreaterThan(0);
    expect(gate.blockers.map((blocker) => blocker.code)).toContain("INDEX_INVALID");
    expect(gate.blockers.map((blocker) => blocker.code)).toContain("INVALID_EVIDENCE_COUNT_NONZERO");
  });

  it("exposes readiness gate routes in JSON and Markdown", async () => {
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
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForReleaseEvidenceArchive: true,
        executionAllowed: false,
        checks: {
          indexValid: true,
          executionNeverAllowed: true,
          digestCoverageComplete: true,
        },
        summary: {
          evidenceCount: 4,
          blockerCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream fixture scenario release evidence readiness gate");
      expect(markdown.body).toContain("- Ready for release evidence archive: true");
      expect(markdown.body).toContain("CI_GATE_NOT_WIRED");
      expect(markdown.body).toContain("scenarioReleaseEvidenceReadinessGateMarkdown");
    } finally {
      await app.close();
    }
  });
});

function createConfig(paths: {
  javaApprovedPath: string;
  javaBlockedPath: string;
  miniKvWritePath: string;
  miniKvReadPath: string;
}) {
  return {
    javaExecutionContractFixturePath: paths.javaApprovedPath,
    javaExecutionContractBlockedFixturePath: paths.javaBlockedPath,
    miniKvCheckJsonFixturePath: paths.miniKvWritePath,
    miniKvCheckJsonReadFixturePath: paths.miniKvReadPath,
  };
}

async function writeFixtureSet(): Promise<{
  javaApprovedPath: string;
  javaBlockedPath: string;
  miniKvWritePath: string;
  miniKvReadPath: string;
}> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-evidence-gate-"));
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
