import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const DECLARED_REPO_ROOT = "D:/nodeproj/orderops-node";

export function normalizeForParity(value: unknown): unknown {
  if (typeof value === "string") return normalizeText(value);
  if (Array.isArray(value)) return value.map(normalizeForParity);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeForParity(entry)]),
    );
  }
  return value;
}

export function normalizeHistoricalReportForParity(value: unknown): unknown {
  return normalizeForParity(canonicalizeEvidenceMetadata(value));
}

export function normalizeText(value: string, repositoryRoot = process.cwd()): string {
  const roots = [repositoryRoot, DECLARED_REPO_ROOT]
    .map((root) => root.replace(/\\/g, "/").replace(/\/$/, ""))
    .filter((root, index, all) => root.length > 0 && all.indexOf(root) === index)
    .sort((left, right) => right.length - left.length);

  return roots.reduce(
    (portable, root) => portable.replace(new RegExp(`${escapeRegex(root)}(?=$|/)`, "gi"), "<repo>"),
    value.replace(/\\/g, "/"),
  );
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function canonicalizeEvidenceMetadata(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalizeEvidenceMetadata);
  if (!isRecord(value)) return value;

  const metadata = isReadableEvidenceFile(value)
    ? canonicalTextMetadata(value.resolvedPath)
    : null;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      if (metadata && key === "sizeBytes") return [key, metadata.sizeBytes];
      if (metadata && key === "digest") return [key, metadata.digest];
      return [key, canonicalizeEvidenceMetadata(entry)];
    }),
  );
}

function canonicalTextMetadata(resolvedPath: string) {
  const content = readFileSync(resolvedPath, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return {
    sizeBytes: Buffer.byteLength(content, "utf8"),
    digest: sha256(content),
  };
}

function isReadableEvidenceFile(value: Record<string, unknown>): value is Record<string, unknown> & {
  resolvedPath: string;
} {
  return value.exists === true
    && typeof value.id === "string"
    && typeof value.path === "string"
    && typeof value.resolvedPath === "string"
    && typeof value.sizeBytes === "number"
    && typeof value.digest === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
