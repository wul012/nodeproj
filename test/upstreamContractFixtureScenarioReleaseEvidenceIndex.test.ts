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
import {
  createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification,
} from "../src/services/upstreamContractFixtureScenarioVerificationArchiveBundleVerification.js";
import {
  createUpstreamContractFixtureScenarioReleaseEvidenceIndex,
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

describe("upstream contract fixture scenario release evidence index", () => {
  it("indexes all scenario release evidence with production-leaning read-only gates", async () => {
    const paths = await writeFixtureSet();
    const evidence = await createEvidence(paths);

    const index = createUpstreamContractFixtureScenarioReleaseEvidenceIndex(
      evidence.matrix,
      evidence.verification,
      evidence.archiveBundle,
      evidence.archiveVerification,
    );

    expect(index).toMatchObject({
      service: "orderops-node",
      valid: true,
      readOnly: true,
      executionAllowed: false,
      maturityTarget: "production-leaning",
      checks: {
        allEvidenceValid: true,
        allEvidenceReadOnly: true,
        executionNeverAllowed: true,
        digestsPresent: true,
        archiveVerificationValid: true,
        sourcePathCoverageValid: true,
        scenarioEvidenceCoverageValid: true,
      },
      summary: {
        evidenceCount: 4,
        validEvidenceCount: 4,
        invalidEvidenceCount: 0,
        readOnlyEvidenceCount: 4,
        executionAllowedEvidenceCount: 0,
        digestCount: 4,
        totalScenarios: 4,
        sourcePathCount: 4,
        scenarioEvidenceCount: 4,
        issueCount: 0,
      },
    });
    expect(index.releaseEvidenceDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(index.releaseEvidenceDigest.coveredFields).toContain("maturityTarget");
    expect(index.evidence.map((entry) => entry.id)).toEqual([
      "scenario-matrix",
      "scenario-matrix-verification",
      "scenario-archive-bundle",
      "scenario-archive-bundle-verification",
    ]);
    expect(index.evidence.every((entry) => /^sha256:[a-f0-9]{64}$/i.test(entry.digest))).toBe(true);
    expect(index.evidence.every((entry) => entry.boundary.canAuthorizeExecution === false)).toBe(true);
  });

  it("marks the index invalid when one evidence report is invalid", async () => {
    const paths = await writeFixtureSet();
    const evidence = await createEvidence(paths);
    const archiveVerification = {
      ...evidence.archiveVerification,
      valid: false,
    };

    const index = createUpstreamContractFixtureScenarioReleaseEvidenceIndex(
      evidence.matrix,
      evidence.verification,
      evidence.archiveBundle,
      archiveVerification,
    );

    expect(index.valid).toBe(false);
    expect(index.checks.allEvidenceValid).toBe(false);
    expect(index.checks.archiveVerificationValid).toBe(false);
    expect(index.summary.invalidEvidenceCount).toBe(1);
  });

  it("exposes release evidence index routes in JSON and Markdown", async () => {
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
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-index?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        valid: true,
        maturityTarget: "production-leaning",
        checks: {
          allEvidenceValid: true,
          executionNeverAllowed: true,
          digestsPresent: true,
        },
        summary: {
          evidenceCount: 4,
          digestCount: 4,
          executionAllowedEvidenceCount: 0,
        },
      });
      expect(json.json().evidence.map((entry: { id: string }) => entry.id)).toContain("scenario-archive-bundle-verification");
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Upstream fixture scenario release evidence index");
      expect(markdown.body).toContain("- Maturity target: production-leaning");
      expect(markdown.body).toContain("### scenario-matrix-verification");
      expect(markdown.body).toContain("scenarioReleaseEvidenceIndexMarkdown");
    } finally {
      await app.close();
    }
  });
});

async function createEvidence(paths: {
  javaApprovedPath: string;
  javaBlockedPath: string;
  miniKvWritePath: string;
  miniKvReadPath: string;
}) {
  const matrix = await loadUpstreamContractFixtureScenarioMatrix({
    javaExecutionContractFixturePath: paths.javaApprovedPath,
    javaExecutionContractBlockedFixturePath: paths.javaBlockedPath,
    miniKvCheckJsonFixturePath: paths.miniKvWritePath,
    miniKvCheckJsonReadFixturePath: paths.miniKvReadPath,
  });
  const verification = createUpstreamContractFixtureScenarioMatrixVerification(matrix);
  const archiveBundle = createUpstreamContractFixtureScenarioVerificationArchiveBundle(matrix, verification);
  const archiveVerification = createUpstreamContractFixtureScenarioVerificationArchiveBundleVerification(archiveBundle);

  return {
    matrix,
    verification,
    archiveBundle,
    archiveVerification,
  };
}

async function writeFixtureSet(): Promise<{
  javaApprovedPath: string;
  javaBlockedPath: string;
  miniKvWritePath: string;
  miniKvReadPath: string;
}> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-release-evidence-index-"));
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
