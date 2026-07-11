import { readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";

import {
  DEFAULT_AIPROJ_SCHEMA_ID,
  selectAiprojArtifactSchema,
  validateAiprojArtifactContract,
  validateAiprojNoPromotionBoundary,
} from "./aiprojArtifactContract.js";
import { sha256File } from "./capstoneDigest.js";
import type {
  AiprojCapstoneObservation,
  CapstoneCheck,
} from "./crossProjectReadinessTypes.js";

export const AIPROJ_REGISTRY_PATH = "docs/artifact-schema-guard-registry.json";

export interface AiprojArtifactProbeConfig {
  rootDirectory: string;
  commit: string;
  schemaId?: string;
}

export async function runAiprojArtifactProbe(
  config: AiprojArtifactProbeConfig,
): Promise<AiprojCapstoneObservation> {
  try {
    const root = await realpath(config.rootDirectory);
    const registry = await readJsonFileInsideRoot(root, AIPROJ_REGISTRY_PATH);
    const selection = selectAiprojArtifactSchema(
      registry.value,
      config.schemaId ?? DEFAULT_AIPROJ_SCHEMA_ID,
    );
    const artifact = await readJsonFileInsideRoot(root, selection.artifactPath);
    const contract = validateAiprojArtifactContract(artifact.value, selection);
    const noPromotion = validateAiprojNoPromotionBoundary(artifact.value, selection);
    const normalizedCommit = config.commit.trim();

    const checks: CapstoneCheck[] = [
      {
        id: "aiproj.registry",
        status: "pass",
        summary: "aiproj committed artifact registry and selected schema are valid",
        evidence: {
          registry_path: AIPROJ_REGISTRY_PATH,
          registry_resolved_path: registry.resolvedRelativePath,
          registry_sha256: registry.sha256,
          registry_schema_version: selection.registrySchemaVersion,
          registry_scope: selection.registryScope,
          selected_schema_id: selection.schemaId,
          artifact_kind: selection.artifactKind,
          registered_artifact_count: selection.registeredArtifactCount,
        },
      },
      {
        id: "aiproj.artifact_integrity",
        status: "pass",
        summary: "one registry-listed aiproj artifact was read inside the project root",
        evidence: {
          artifact_path: selection.artifactPath,
          artifact_resolved_path: artifact.resolvedRelativePath,
          artifact_bytes: artifact.bytes,
          artifact_sha256: artifact.sha256,
          aiproj_commit: normalizedCommit,
        },
      },
      {
        id: "aiproj.artifact_contract",
        status: contract.passed ? "pass" : "fail",
        summary: contract.passed
          ? "registered required fields, expected values, and type checks all pass"
          : "registered aiproj artifact contract validation failed",
        evidence: {
          required_field_count: contract.requiredFieldCount,
          missing_fields: contract.missingFields,
          expected_value_count: contract.expectedValueCount,
          expected_value_mismatches: contract.expectedValueMismatches,
          type_check_count: contract.typeCheckCount,
          type_mismatches: contract.typeMismatches,
        },
      },
      {
        id: "aiproj.no_promotion",
        status: noPromotion.passed ? "pass" : "fail",
        summary: noPromotion.passed
          ? "artifact grants downstream lookup only and denies promotion authority"
          : "aiproj registry or artifact no-promotion boundary drifted",
        evidence: {
          read_only: true,
          process_executed: false,
          promotion_allowed: false,
          granted_use: noPromotion.grantedUse,
          promotion_ready: noPromotion.promotionReady,
          approved_for_promotion: noPromotion.approvedForPromotion,
          registry_rule_mismatches: noPromotion.registryRuleMismatches,
          artifact_value_mismatches: noPromotion.artifactValueMismatches,
        },
      },
    ];
    return { c4Checks: checks };
  } catch (error) {
    return {
      c4Checks: [
        {
          id: "aiproj.artifact_validation",
          status: "fail",
          summary: "aiproj registry-listed artifact could not be validated",
          evidence: {
            read_only: true,
            process_executed: false,
            promotion_allowed: false,
            error: errorMessage(error),
          },
        },
      ],
    };
  }
}

interface ReadJsonResult {
  value: unknown;
  resolvedRelativePath: string;
  bytes: number;
  sha256: string;
}

async function readJsonFileInsideRoot(root: string, declaredPath: string): Promise<ReadJsonResult> {
  if (declaredPath.trim().length === 0 || isAbsolute(declaredPath)) {
    throw new Error(`registered path must be a non-empty relative path: ${declaredPath}`);
  }
  const candidate = resolve(root, declaredPath);
  assertInsideRoot(root, candidate, declaredPath);
  const resolvedPath = await realpath(candidate);
  assertInsideRoot(root, resolvedPath, declaredPath);
  const metadata = await stat(resolvedPath);
  if (!metadata.isFile()) {
    throw new Error(`registered path is not a file: ${declaredPath}`);
  }
  const source = await readFile(resolvedPath, "utf8");
  let value: unknown;
  try {
    value = JSON.parse(source) as unknown;
  } catch (error) {
    throw new Error(
      `registered JSON is invalid at ${declaredPath}: ${errorMessage(error)}`,
      { cause: error },
    );
  }
  return {
    value,
    resolvedRelativePath: toPosixPath(relative(root, resolvedPath)),
    bytes: metadata.size,
    sha256: await sha256File(resolvedPath),
  };
}

function assertInsideRoot(root: string, candidate: string, declaredPath: string): void {
  const relativePath = relative(root, candidate);
  const escapes = relativePath === ".."
    || relativePath.startsWith(`..${sep}`)
    || isAbsolute(relativePath);
  if (escapes) {
    throw new Error(`registered path escapes aiproj root: ${declaredPath}`);
  }
}

function toPosixPath(value: string): string {
  return value.split(sep).join("/");
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
