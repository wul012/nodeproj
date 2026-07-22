import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
} from "./historicalEvidenceResolver.js";
import { evidenceFile as historicalEvidenceFile } from "./historicalEvidenceReportUtils.js";

// Design: this module owns the manual-connection evidence projection.
// Shared utilities own canonical metadata; domain services retain paths and rules.

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
  const evidence = historicalEvidenceFile(id, filePath);
  return {
    id: evidence.id,
    path: evidence.path,
    exists: evidence.exists,
    sizeBytes: evidence.sizeBytes,
    digest: evidence.digest,
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
