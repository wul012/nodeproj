import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export interface ArchiveEvidenceFile {
  path: string;
  exists: boolean;
  byteLength: number;
  digest: string | null;
}

export interface ArchiveEvidenceRefs<Root extends string = string> {
  archiveRoot: Root;
  jsonEvidence: ArchiveEvidenceFile;
  markdownEvidence: ArchiveEvidenceFile;
  summaryEvidence: ArchiveEvidenceFile;
  browserSnapshot: ArchiveEvidenceFile;
  htmlArchive: ArchiveEvidenceFile;
  screenshot: ArchiveEvidenceFile;
  explanation: ArchiveEvidenceFile;
  codeWalkthrough: ArchiveEvidenceFile;
  sourcePlan: ArchiveEvidenceFile;
  plansIndex: ArchiveEvidenceFile;
  archiveIndex: ArchiveEvidenceFile;
}

export interface ArchiveEvidenceSpec<Root extends string> {
  archiveRoot: Root;
  basename: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
  archiveIndex: string;
}

export interface ArchiveEvidenceContent {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
  archiveIndex: string;
}

export function createArchiveEvidenceRefs<Root extends string>(
  projectRoot: string,
  spec: ArchiveEvidenceSpec<Root>,
): ArchiveEvidenceRefs<Root> {
  const archiveFile = (...segments: string[]) => fileRef(projectRoot, spec.archiveRoot, ...segments);
  return {
    archiveRoot: spec.archiveRoot,
    jsonEvidence: archiveFile("evidence", `${spec.basename}-http.json`),
    markdownEvidence: archiveFile("evidence", `${spec.basename}-http.md`),
    summaryEvidence: archiveFile("evidence", `${spec.basename}-summary.json`),
    browserSnapshot: archiveFile("evidence", `${spec.basename}-browser-snapshot.md`),
    htmlArchive: archiveFile(`${spec.basename}.html`),
    screenshot: archiveFile("\u56fe\u7247", `${spec.basename}.png`),
    explanation: archiveFile("\u89e3\u91ca", `${spec.basename}.md`),
    codeWalkthrough: fileRef(projectRoot, spec.codeWalkthrough),
    sourcePlan: fileRef(projectRoot, spec.sourcePlan),
    plansIndex: fileRef(projectRoot, spec.plansIndex),
    archiveIndex: fileRef(projectRoot, spec.archiveIndex),
  };
}

export function readArchiveEvidence(
  projectRoot: string,
  refs: ArchiveEvidenceRefs,
): ArchiveEvidenceContent {
  return {
    json: readJson(projectRoot, refs.jsonEvidence.path),
    markdown: readText(projectRoot, refs.markdownEvidence.path),
    summary: readJson(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readText(projectRoot, refs.browserSnapshot.path),
    explanation: readText(projectRoot, refs.explanation.path),
    codeWalkthrough: readText(projectRoot, refs.codeWalkthrough.path),
    sourcePlan: readText(projectRoot, refs.sourcePlan.path),
    plansIndex: readText(projectRoot, refs.plansIndex.path),
    archiveIndex: readText(projectRoot, refs.archiveIndex.path),
  };
}

export function listArchiveEvidenceFiles(
  refs: ArchiveEvidenceRefs,
): ArchiveEvidenceFile[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.summaryEvidence,
    refs.browserSnapshot,
    refs.htmlArchive,
    refs.screenshot,
    refs.explanation,
    refs.codeWalkthrough,
    refs.sourcePlan,
    refs.plansIndex,
    refs.archiveIndex,
  ];
}

export function archiveValueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

export function archiveArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function archiveStrings(value: unknown): string[] {
  return archiveArray(value).filter((item): item is string => typeof item === "string");
}

export function archiveString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function archiveNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function hasAllStrings(values: readonly string[], required: readonly string[]): boolean {
  return required.every((value) => values.includes(value));
}

export function isSha256(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function fileRef(projectRoot: string, ...segments: string[]): ArchiveEvidenceFile {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, byteLength: 0, digest: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    byteLength: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function readJson(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const content = readText(projectRoot, relativePath);
  if (content.length === 0) return null;
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function readText(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) return "";
  const content = readFileSync(absolutePath, "utf8");
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}
