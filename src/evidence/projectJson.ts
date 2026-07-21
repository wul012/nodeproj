import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { parseJsonEvidence } from "../services/jsonEvidenceUtils.js";

// Design: this module owns project-local JSON access and safe type narrowing.
// Callers own version paths, domain fields, readiness rules, and report wording.
// Missing, malformed, or wrongly typed evidence always narrows to a closed value.

export type JsonObject = Record<string, unknown>;

export function readProjectJson(projectRoot: string, relativePath: string): JsonObject | null {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) return null;
  try {
    const parsed = parseJsonEvidence(readFileSync(absolutePath, "utf8"));
    return isJsonObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (!isJsonObject(value)) return undefined;
    value = value[key];
  }
  return value;
}

export function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function stringValues(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function includesAll(values: readonly string[], required: readonly string[]): boolean {
  return required.every((value) => values.includes(value));
}

export function isSha256(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
