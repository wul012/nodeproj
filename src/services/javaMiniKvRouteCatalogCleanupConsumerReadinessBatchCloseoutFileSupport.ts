import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export interface BatchCloseoutFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export function fileReference(projectRoot: string, relativePath: string): BatchCloseoutFileReference {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, sizeBytes: 0, sha256: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    sha256: createHash("sha256").update(content).digest("hex"),
  };
}

export function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(projectRoot, relativePath);
  if (text.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

export function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

export function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

export function objectField(source: Record<string, unknown> | null, key: string): Record<string, unknown> {
  const value = source?.[key];
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

export function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
