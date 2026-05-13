import { createHash } from "node:crypto";

export interface LiveProbeReportMessage {
  code: string;
  severity: string;
  source: string;
  message: string;
}

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

export function renderList(items: string[], emptyText: string): string[] {
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
