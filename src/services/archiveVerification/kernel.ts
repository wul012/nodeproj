export interface ParsedArchiveEvidence {
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

export interface ArchiveFileRef {
  exists: boolean;
  byteLength: number;
}

export function mergeArchiveCheckGroups<T extends Record<string, boolean>>(
  ...groups: Array<Partial<T>>
): T {
  return Object.assign({}, ...groups) as T;
}

export function arrayHasIds(value: unknown, ids: readonly string[]): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  const actualIds = new Set(value
    .filter((entry): entry is Record<string, unknown> =>
      entry !== null && typeof entry === "object" && !Array.isArray(entry))
    .map((entry) => String(entry.id)));
  return ids.every((id) => actualIds.has(id));
}

export function allBooleanChecksPass(value: unknown, expectedCount: number): boolean {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const values = Object.values(value);
  return values.length === expectedCount && values.every((entry) => entry === true);
}

export function valueAt(source: Record<string, unknown> | null, ...segments: string[]): unknown {
  let current: unknown = source;
  for (const segment of segments) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

export function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
