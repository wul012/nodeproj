import { createHash } from "node:crypto";

import { parseJsonEvidence } from "./jsonEvidenceUtils.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
} from "./historicalEvidenceResolver.js";

export interface HistoricalEvidenceFile {
  id: string;
  path: string;
  resolvedPath: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface HistoricalSnippetMatch {
  id: string;
  path: string;
  resolvedPath: string;
  expectedText: string;
  matched: boolean;
}

export interface EvidenceFileOptions {
  textMode?: "normalized" | "raw";
}

export function evidenceFile(
  id: string,
  filePath: string,
  options: EvidenceFileOptions = {},
): HistoricalEvidenceFile {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, resolvedPath, exists: false, sizeBytes: 0, digest: null };
  }
  if (options.textMode === "raw") {
    const content = readHistoricalEvidenceFile(filePath);
    return {
      id,
      path: filePath,
      resolvedPath,
      exists: true,
      sizeBytes: content.byteLength,
      digest: createHash("sha256").update(content).digest("hex"),
    };
  }
  const content = normalizeHistoricalEvidenceText(readHistoricalEvidenceFile(filePath, "utf8"));
  return {
    id,
    path: filePath,
    resolvedPath,
    exists: true,
    sizeBytes: Buffer.byteLength(content, "utf8"),
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

export function snippet(id: string, filePath: string, expectedText: string): HistoricalSnippetMatch {
  const resolvedPath = resolveHistoricalEvidencePath(filePath);
  const content = historicalEvidenceExists(filePath)
    ? normalizeHistoricalEvidenceText(readHistoricalEvidenceFile(filePath, "utf8"))
    : "";
  return {
    id,
    path: filePath,
    resolvedPath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

export function snippetMatched(snippets: readonly HistoricalSnippetMatch[], id: string): boolean {
  return snippets.some((snippetMatch) => snippetMatch.id === id && snippetMatch.matched);
}

type SnippetFieldValue = string | number | boolean;

export type SnippetFieldSpec = readonly [
  target: string,
  snippetId: string,
  matchedValue: SnippetFieldValue,
  missingValue: SnippetFieldValue,
];

type SnippetFieldValues<Specs extends readonly SnippetFieldSpec[]> = {
  [Spec in Specs[number] as Spec[0]]: Spec[2] | Spec[3];
};

export function mapSnippetFields<const Specs extends readonly SnippetFieldSpec[]>(
  snippets: readonly HistoricalSnippetMatch[],
  specs: Specs,
): SnippetFieldValues<Specs> {
  const values: Record<string, SnippetFieldValue> = {};
  for (const [target, snippetId, matchedValue, missingValue] of specs) {
    if (Object.hasOwn(values, target)) throw new Error(`Duplicate snippet target field: ${target}`);
    values[target] = snippetMatched(snippets, snippetId) ? matchedValue : missingValue;
  }
  return values as SnippetFieldValues<Specs>;
}

export function snippetsMatched(
  snippets: readonly HistoricalSnippetMatch[],
  ids: readonly string[],
): boolean {
  return ids.every((id) => snippetMatched(snippets, id));
}

export function readJsonObject(filePath: string): Record<string, unknown> {
  if (!historicalEvidenceExists(filePath)) {
    return {};
  }
  const parsed = parseJsonEvidence(readHistoricalEvidenceFile(filePath, "utf8"));
  return isRecord(parsed) ? parsed : {};
}

export function objectField(input: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = input[key];
  return isRecord(value) ? value : {};
}

export function objectArrayField(input: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

export function stringArrayField(input: Record<string, unknown>, key: string): string[] {
  const value = input[key];
  return Array.isArray(value) ? value.filter(isNonNullString) : [];
}

export function stringField(input: Record<string, unknown>, key: string): string | null {
  const value = input[key];
  return typeof value === "string" ? value : null;
}

export function numberField(input: Record<string, unknown>, key: string): number | null {
  const value = input[key];
  return typeof value === "number" ? value : null;
}

export function booleanField(input: Record<string, unknown>, key: string): boolean | null {
  const value = input[key];
  return typeof value === "boolean" ? value : null;
}

export type ReceiptFieldSpec =
  | readonly [target: string, source: string, kind: "text", fallback: string]
  | readonly [target: string, source: string, kind: "flag", fallback: boolean]
  | readonly [target: string, source: string, kind: "count", fallback: number];

type ReceiptFieldValue<Spec extends ReceiptFieldSpec> =
  Spec[2] extends "text" ? string
    : Spec[2] extends "flag" ? boolean
      : number;

export type ReceiptFieldValues<Specs extends readonly ReceiptFieldSpec[]> = {
  [Spec in Specs[number] as Spec[0]]: ReceiptFieldValue<Spec>;
};

export function mapReceiptFields<const Specs extends readonly ReceiptFieldSpec[]>(
  input: Record<string, unknown>,
  specs: Specs,
): ReceiptFieldValues<Specs> {
  const values: Record<string, string | boolean | number> = {};
  for (const spec of specs) {
    if (Object.hasOwn(values, spec[0])) {
      throw new Error(`Duplicate receipt target field: ${spec[0]}`);
    }
    if (spec[2] === "text") values[spec[0]] = stringField(input, spec[1]) ?? spec[3];
    else if (spec[2] === "flag") values[spec[0]] = booleanField(input, spec[1]) ?? spec[3];
    else values[spec[0]] = numberField(input, spec[1]) ?? spec[3];
  }
  return values as ReceiptFieldValues<Specs>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isNonNullString(value: unknown): value is string {
  return typeof value === "string";
}

function normalizeHistoricalEvidenceText(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
