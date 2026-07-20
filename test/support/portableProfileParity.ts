import { createHash } from "node:crypto";

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

export function normalizeText(value: string): string {
  const repositoryRoot = process.cwd().replace(/\\/g, "/");
  return value.replace(/\\/g, "/").replaceAll(repositoryRoot, "<repo>");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
