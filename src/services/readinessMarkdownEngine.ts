export type ReadinessField = readonly [label: string, value: unknown];
export type ReadinessSection = readonly [heading: string, body: readonly string[]];

export interface ReadinessMessage {
  code: string;
  severity: string;
  source: string;
  message: string;
  category?: string;
}

export interface ReadinessConnectionCategory {
  productionConnected: boolean;
  status: string;
  evidence: string;
  note: string;
}

export interface ReadinessReportBase<C, M> {
  service: string;
  generatedAt: string;
  summaryVersion: string;
  readyForProductionOperations: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  stage: object;
  categories: readonly C[];
  checks: object;
  summary: object;
  productionBlockers: readonly M[];
  warnings: readonly M[];
  recommendations: readonly M[];
  evidenceEndpoints: object;
  nextActions: readonly string[];
}

export interface ReadinessReportSpec<C extends { id: string }, M extends ReadinessMessage> {
  title: string;
  report: ReadinessReportBase<C, M>;
  status?: readonly [heading: string, record: object];
  categoryFields: (category: C) => readonly ReadinessField[];
}

export function renderReadinessReport<C extends { id: string }, M extends ReadinessMessage>(
  spec: ReadinessReportSpec<C, M>,
): string {
  const { report } = spec;
  const sections: ReadinessSection[] = [
    ["Stage", renderReadinessEntries(report.stage)],
  ];
  if (spec.status !== undefined) {
    sections.push([spec.status[0], renderReadinessEntries(spec.status[1])]);
  }
  sections.push(
    ["Categories", renderReadinessItems(report.categories, spec.categoryFields)],
    ["Checks", renderReadinessEntries(report.checks)],
    ["Summary", renderReadinessEntries(report.summary)],
    ["Production Blockers", renderReadinessMessages(report.productionBlockers, "No production blockers.")],
    ["Warnings", renderReadinessMessages(report.warnings, "No warnings.")],
    ["Recommendations", renderReadinessMessages(report.recommendations, "No recommendations.")],
    ["Evidence Endpoints", renderReadinessEntries(report.evidenceEndpoints)],
    ["Next Actions", renderReadinessList(report.nextActions, "No next actions.")],
  );
  return renderReadinessDocument(spec.title, [
    ["Service", report.service],
    ["Generated at", report.generatedAt],
    ["Summary version", report.summaryVersion],
    ["Ready for production operations", report.readyForProductionOperations],
    ["Read only", report.readOnly],
    ["Execution allowed", report.executionAllowed],
  ], sections);
}

export function renderReadinessDocument(
  title: string,
  fields: readonly ReadinessField[],
  sections: readonly ReadinessSection[],
): string {
  const lines = [`# ${title}`, "", ...renderReadinessFields(fields), ""];
  for (const [heading, body] of sections) {
    lines.push(`## ${heading}`, "", ...body, "");
  }
  return lines.join("\n");
}

export function renderReadinessFields(fields: readonly ReadinessField[]): string[] {
  return fields.map(([label, value]) => `- ${label}: ${value}`);
}

export function readinessConnectionFields(
  category: ReadinessConnectionCategory,
  signal: ReadinessField,
): readonly ReadinessField[] {
  return [
    signal,
    ["Production connected", category.productionConnected],
    ["Status", category.status],
    ["Evidence", category.evidence],
    ["Note", category.note],
  ];
}

export function renderReadinessItems<T extends { id: string }>(
  items: readonly T[],
  fields: (item: T) => readonly ReadinessField[],
): string[] {
  return items.flatMap((item, index) => [
    `### ${item.id}`,
    "",
    ...renderReadinessFields(fields(item)),
    ...(index === items.length - 1 ? [] : [""]),
  ]);
}

export function renderReadinessEntries(record: object, prefix?: string): string[] {
  return Object.entries(record).map(([key, value]) => (
    `- ${prefix === undefined ? key : `${prefix}.${key}`}: ${formatReadinessValue(value)}`
  ));
}

export function renderReadinessMessages(
  messages: readonly ReadinessMessage[],
  emptyText: string,
): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }
  return messages.map((message) => {
    const context = [message.severity, message.category, message.source]
      .filter((value) => value !== undefined)
      .join(", ");
    return `- ${message.code} (${context}): ${message.message}`;
  });
}

export function renderReadinessList(items: readonly string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatReadinessValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
