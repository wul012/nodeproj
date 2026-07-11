import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { NO_PROMOTION_EXPECTATIONS } from "../../src/integration/aiprojArtifactContract.js";

export const TEST_AIPROJ_ARTIFACT_PATH = "artifacts/publication-receipt.json";

export interface AiprojCapstoneFixture {
  rootDirectory: string;
  registryPath: string;
  artifactPath: string;
  registry: Record<string, unknown>;
  artifact: Record<string, unknown>;
  writeRegistry(value?: Record<string, unknown>): Promise<void>;
  writeArtifact(value?: Record<string, unknown>): Promise<void>;
  cleanup(): Promise<void>;
}

export async function createAiprojCapstoneFixture(): Promise<AiprojCapstoneFixture> {
  const rootDirectory = await mkdtemp(join(tmpdir(), "orderops-aiproj-capstone-"));
  const registryPath = join(rootDirectory, "docs", "artifact-schema-guard-registry.json");
  const artifactPath = join(rootDirectory, ...TEST_AIPROJ_ARTIFACT_PATH.split("/"));
  const artifact = createPublicationReceipt();
  const registry = createArtifactRegistry();
  await mkdir(dirname(registryPath), { recursive: true });
  await mkdir(dirname(artifactPath), { recursive: true });

  const fixture: AiprojCapstoneFixture = {
    rootDirectory,
    registryPath,
    artifactPath,
    registry,
    artifact,
    async writeRegistry(value = fixture.registry) {
      await writeJson(registryPath, value);
    },
    async writeArtifact(value = fixture.artifact) {
      await writeJson(artifactPath, value);
    },
    async cleanup() {
      await rm(rootDirectory, { recursive: true, force: true });
    },
  };
  await fixture.writeRegistry();
  await fixture.writeArtifact();
  return fixture;
}

export function createArtifactRegistry(): Record<string, unknown> {
  return {
    schema_version: 1,
    title: "Test artifact schema guard registry",
    policy_version: "test",
    scope: "cards_and_publication_receipts",
    schemas: [
      {
        schema_id: "publication_receipt_v1",
        artifact_kind: "publication_receipt",
        artifact_paths: [TEST_AIPROJ_ARTIFACT_PATH],
        required_fields: [
          "schema_version",
          "title",
          "generated_at",
          "status",
          "decision",
          "receipt",
          "summary",
          "interpretation",
          "check_rows",
        ],
        expected_values: {
          schema_version: 1,
          status: "pass",
          ...NO_PROMOTION_EXPECTATIONS,
        },
        type_checks: {
          receipt: "dict",
          summary: "dict",
          interpretation: "dict",
          check_rows: "list",
        },
      },
    ],
  };
}

export function createPublicationReceipt(): Record<string, unknown> {
  return {
    schema_version: 1,
    title: "Test downstream publication receipt",
    generated_at: "2026-07-11T00:00:00Z",
    status: "pass",
    decision: "ready_for_downstream_lookup",
    receipt: {
      granted_use: "downstream_governance_lookup_only",
      promotion_ready: false,
      approved_for_promotion: false,
    },
    summary: {
      granted_use: "downstream_governance_lookup_only",
      promotion_ready: false,
      approved_for_promotion: false,
    },
    interpretation: {},
    check_rows: [],
  };
}

async function writeJson(path: string, value: Record<string, unknown>): Promise<void> {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
