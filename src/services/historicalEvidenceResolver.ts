import { existsSync, readFileSync, statSync } from "node:fs";
import type { Stats } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const CANONICAL_REPO_ROOT = "D:/nodeproj/orderops-node";

const PINNED_CONTENT_MAPPINGS = Object.freeze([
  {
    path:
      "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeArtifacts.ts",
    contentPath: "fixtures/historical/node/v961/value-supply-envelope-artifacts.ts.snapshot",
  },
]);

const FALLBACK_MAPPINGS = Object.freeze([
  {
    prefix: "D:/nodeproj/orderops-node/",
    fallbackRoot: "",
  },
  {
    prefix: "D:/javaproj/advanced-order-platform/v113-snapshot/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/v113-snapshot/",
  },
  {
    prefix: "D:/javaproj/advanced-order-platform/v115-snapshot/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/v115-snapshot/",
  },
  {
    prefix: "D:/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverApprovalRequiredImplementationReadinessEchoReceiptBuilder.java",
    fallbackRoot:
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/v116-snapshot/ImplementationReadinessEchoReceiptBuilder.java",
  },
  {
    prefix: "D:/javaproj/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/",
  },
  {
    prefix: "D:/javaproj/advanced-order-platform/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/",
  },
  {
    prefix: "D:/C/mini-kv/",
    fallbackRoot: "fixtures/historical/sibling-workspaces/mini-kv/",
  },
]);

export function resolveHistoricalEvidencePath(inputPath: string): string {
  const fallbackPath = mappedHistoricalEvidencePath(inputPath);
  if (process.env[FORCE_FALLBACK_ENV] === "true") {
    return fallbackPath ?? inputPath;
  }

  if (fallbackPath && existsSync(fallbackPath)) {
    return fallbackPath;
  }

  if (existsSync(inputPath)) {
    return inputPath;
  }

  return fallbackPath ?? inputPath;
}

export function resolveHistoricalEvidenceContentPath(inputPath: string): string {
  const normalizedPath = inputPath.replace(/\\/g, "/");
  const pinned = PINNED_CONTENT_MAPPINGS.find((mapping) => mapping.path === normalizedPath);
  return pinned === undefined
    ? resolveHistoricalEvidencePath(inputPath)
    : path.resolve(REPO_ROOT, pinned.contentPath);
}

export function resolveHistoricalEvidenceReportPath(inputPath: string): string {
  const resolvedPath = resolveHistoricalEvidencePath(inputPath);
  const relativePath = path.relative(REPO_ROOT, resolvedPath);
  const outsideRepo = relativePath === ".."
    || relativePath.startsWith(`..${path.sep}`)
    || path.isAbsolute(relativePath);
  if (outsideRepo) return resolvedPath;

  return path.win32.join(CANONICAL_REPO_ROOT, ...relativePath.split(path.sep));
}

function mappedHistoricalEvidencePath(inputPath: string): string | null {
  const normalizedPath = inputPath.replace(/\\/g, "/");
  for (const mapping of FALLBACK_MAPPINGS) {
    if (normalizedPath.startsWith(mapping.prefix)) {
      return path.resolve(REPO_ROOT, mapping.fallbackRoot, normalizedPath.slice(mapping.prefix.length));
    }
  }

  return null;
}

export function historicalEvidenceExists(inputPath: string): boolean {
  return existsSync(resolveHistoricalEvidenceContentPath(inputPath));
}

export function readHistoricalEvidenceFile(inputPath: string): Buffer;
export function readHistoricalEvidenceFile(inputPath: string, encoding: BufferEncoding): string;
export function readHistoricalEvidenceFile(inputPath: string, encoding?: BufferEncoding): Buffer | string {
  const resolvedPath = resolveHistoricalEvidenceContentPath(inputPath);
  if (!encoding) {
    return readFileSync(resolvedPath);
  }
  const content = readFileSync(resolvedPath, encoding);
  return encoding === "utf8" && content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

export function statHistoricalEvidence(inputPath: string): Stats {
  return statSync(resolveHistoricalEvidenceContentPath(inputPath));
}
