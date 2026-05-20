import { existsSync, readFileSync, statSync } from "node:fs";
import type { Stats } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

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
  if (process.env[FORCE_FALLBACK_ENV] !== "true" && existsSync(inputPath)) {
    return inputPath;
  }

  const normalizedPath = inputPath.replace(/\\/g, "/");
  for (const mapping of FALLBACK_MAPPINGS) {
    if (normalizedPath.startsWith(mapping.prefix)) {
      return path.resolve(REPO_ROOT, mapping.fallbackRoot, normalizedPath.slice(mapping.prefix.length));
    }
  }

  return inputPath;
}

export function historicalEvidenceExists(inputPath: string): boolean {
  return existsSync(resolveHistoricalEvidencePath(inputPath));
}

export function readHistoricalEvidenceFile(inputPath: string): Buffer;
export function readHistoricalEvidenceFile(inputPath: string, encoding: BufferEncoding): string;
export function readHistoricalEvidenceFile(inputPath: string, encoding?: BufferEncoding): Buffer | string {
  const resolvedPath = resolveHistoricalEvidencePath(inputPath);
  if (!encoding) {
    return readFileSync(resolvedPath);
  }
  const content = readFileSync(resolvedPath, encoding);
  return encoding === "utf8" && content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

export function statHistoricalEvidence(inputPath: string): Stats {
  return statSync(resolveHistoricalEvidencePath(inputPath));
}
