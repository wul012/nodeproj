import { createHash } from "node:crypto";

export interface LiveProbeReportMessage {
  code: string;
  severity: string;
  source: string;
  message: string;
}

export interface ProfileEntrySection {
  heading: string;
  lines: readonly string[];
}

export interface ReportRule<Source extends string = string> {
  condition: boolean;
  code: string;
  source: Source;
  message: string;
}

export interface FailedReportRule<Source extends string = string> {
  code: string;
  severity: "blocker";
  source: Source;
  message: string;
}

export type BooleanFieldKey<Value> = Extract<{
  [Key in keyof Value]-?: Value[Key] extends boolean | null | undefined
    ? Extract<Value[Key], boolean> extends never ? never : Key
    : never;
}[keyof Value], string>;

export function sha256StableJson(value: unknown): string {
  return createHash("sha256")
    .update(stableJson(value))
    .digest("hex");
}

export function countReportChecks(checks: object): number {
  return Object.keys(checks).length;
}

export function countPassedReportChecks(checks: object): number {
  return Object.values(checks).filter(Boolean).length;
}

export function allReportChecksPassExcept<Checks extends object>(
  checks: Checks,
  excludedKey: Extract<keyof Checks, string>,
): boolean {
  return Object.entries(checks)
    .every(([key, value]) => key === excludedKey || value === true);
}

export function allBooleanFieldsAre<Value extends object>(
  value: Value,
  fields: readonly BooleanFieldKey<Value>[],
  expected: boolean,
): boolean {
  return fields.length > 0
    && new Set(fields).size === fields.length
    && fields.every((field) => value[field] === expected);
}

export function collectFailedReportRules<Source extends string>(
  rules: readonly ReportRule<Source>[],
): FailedReportRule<Source>[] {
  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker",
      source: rule.source,
      message: rule.message,
    }));
}

export function renderMessages<T extends LiveProbeReportMessage>(
  messages: T[],
  emptyText: string,
): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

export function renderEntries(record: object): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
}

export function renderProfileEntrySection(section: ProfileEntrySection): string[] {
  return [
    `## ${section.heading}`,
    ...section.lines,
    "",
  ];
}

export function renderProfileEntrySections(sections: readonly ProfileEntrySection[]): string[] {
  return sections.flatMap(renderProfileEntrySection);
}

export function renderList(items: readonly string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

export function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
