import { createHash } from "node:crypto";

import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";

// Design: this module owns historical evidence I/O and primitive projection.
// Domain services retain their paths, expected snippets, and acceptance rules.

export interface ManualConnectionEvidenceFile {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

export interface ManualConnectionSnippetMatch {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

export function evidenceFile(id: string, filePath: string): ManualConnectionEvidenceFile {
  if (!historicalEvidenceExists(filePath)) {
    return { id, path: filePath, exists: false, sizeBytes: 0, digest: null };
  }
  const content = readHistoricalEvidenceFile(filePath);
  return {
    id,
    path: filePath,
    exists: true,
    sizeBytes: statHistoricalEvidence(filePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

export function snippet(
  id: string,
  filePath: string,
  expectedText: string,
): ManualConnectionSnippetMatch {
  const content = historicalEvidenceExists(filePath)
    ? readHistoricalEvidenceFile(filePath, "utf8")
    : "";
  return { id, path: filePath, expectedText, matched: content.includes(expectedText) };
}

export function readEvidenceJson<T extends Record<string, unknown>>(filePath: string): T {
  if (!historicalEvidenceExists(filePath)) {
    return {} as T;
  }
  return JSON.parse(readHistoricalEvidenceFile(filePath, "utf8")) as T;
}

export function evidenceById(
  files: ManualConnectionEvidenceFile[],
  id: string,
): ManualConnectionEvidenceFile {
  const file = files.find((candidate) => candidate.id === id);
  if (file === undefined) {
    throw new Error(`Missing evidence file ${id}`);
  }
  return file;
}

export function snippetMatched(
  snippets: ManualConnectionSnippetMatch[],
  id: string,
): boolean {
  return snippets.some((match) => match.id === id && match.matched);
}

export function stringField(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

export function booleanField(record: Record<string, unknown>, key: string): boolean | undefined {
  const value = record[key];
  return typeof value === "boolean" ? value : undefined;
}

export function numberField(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key];
  return typeof value === "number" ? value : undefined;
}
