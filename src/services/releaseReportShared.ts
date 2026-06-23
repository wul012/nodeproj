import type { LiveProbeReportMessage } from "./liveProbeReportUtils.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface ReleaseReportForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy: string;
}

export interface ReleaseReportStepRenderOptions {
  identityLabel: string;
  identityKey: string;
  booleanFields: Array<readonly [label: string, key: string]>;
}

export interface ReleaseReportMarkdownSection {
  heading: string;
  entries: object;
}

export interface ReleaseReportMarkdownEntriesSubsection {
  heading: string;
  entries: object;
}

export interface ReleaseReportMarkdownItemSection<TItem> {
  heading: string;
  items: TItem[];
  renderItem: (item: TItem) => string[];
}

type AnyReleaseReportMarkdownItemSection = {
  heading: string;
  items: unknown[];
  renderItem: (item: any) => string[];
};

export interface ReleaseReportMarkdownMessageSection<TMessage extends LiveProbeReportMessage> {
  heading: string;
  messages: TMessage[];
  emptyText: string;
}

export interface ReleaseReportMarkdownOptions<TMessage extends LiveProbeReportMessage> {
  title: string;
  header: object;
  sections: ReleaseReportMarkdownSection[];
  itemSections: AnyReleaseReportMarkdownItemSection[];
  messageSections: Array<ReleaseReportMarkdownMessageSection<TMessage>>;
  evidenceEndpoints: object;
  nextActions: string[];
}

export interface ReleaseReportCheckSummary {
  checkCount: number;
  passedCheckCount: number;
}

export interface ReleaseReportBlockingMessageSpec<TMessage extends LiveProbeReportMessage> {
  condition: boolean | undefined;
  code: string;
  source: TMessage["source"];
  message: string;
}

export function summarizeReportChecks(checks: Record<string, boolean>): ReleaseReportCheckSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
  };
}

export function prefixReportCheckSummary(
  summary: ReleaseReportCheckSummary,
  prefix: string,
): Record<string, number> {
  return {
    [`${prefix}CheckCount`]: summary.checkCount,
    [`passed${capitalize(prefix)}CheckCount`]: summary.passedCheckCount,
  };
}

export function completeAggregateReadyCheck<TChecks extends Record<string, boolean>>(
  checks: TChecks,
  readyKey: keyof TChecks,
): void {
  checks[readyKey] = Object.entries(checks)
    .filter(([key]) => key !== readyKey)
    .every(([, value]) => value) as TChecks[keyof TChecks];
}

export function appendBlockingMessage<TMessage extends LiveProbeReportMessage>(
  messages: TMessage[],
  condition: boolean,
  code: string,
  source: TMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message } as TMessage);
  }
}

export function collectBlockingMessages<TMessage extends LiveProbeReportMessage>(
  specs: Array<ReleaseReportBlockingMessageSpec<TMessage>>,
): TMessage[] {
  const messages: TMessage[] = [];
  for (const spec of specs) {
    appendBlockingMessage(messages, Boolean(spec.condition), spec.code, spec.source, spec.message);
  }
  return messages;
}

export function renderReleaseReportMarkdown<TMessage extends LiveProbeReportMessage>(
  options: ReleaseReportMarkdownOptions<TMessage>,
): string {
  return [
    ...renderReleaseReportHeader(options.title, options.header),
    ...options.sections.flatMap((section) => renderReleaseReportEntriesSection(section.heading, section.entries)),
    ...options.itemSections.flatMap((section) => renderReleaseReportItemSection(
      section.heading,
      section.items,
      section.renderItem,
    )),
    ...options.messageSections.flatMap((section) => renderReleaseReportMessagesSection(
      section.heading,
      section.messages,
      section.emptyText,
    )),
    ...renderReleaseReportTail(options.evidenceEndpoints, options.nextActions),
  ].join("\n");
}

export function renderReleaseReportHeader(title: string, header: object): string[] {
  return [
    `# ${title}`,
    "",
    ...renderEntries(header),
    "",
  ];
}

export function renderReleaseReportEntriesSection(heading: string, entries: object): string[] {
  return [
    `## ${heading}`,
    "",
    ...renderEntries(entries),
    "",
  ];
}

export function renderReleaseReportLineSection(heading: string, lines: readonly string[]): string[] {
  return [
    `## ${heading}`,
    "",
    ...lines,
    "",
  ];
}

export function renderReleaseReportItemSection<TItem>(
  heading: string,
  items: readonly TItem[],
  renderItem: (item: TItem) => string[],
): string[] {
  return [
    `## ${heading}`,
    "",
    ...items.flatMap(renderItem),
  ];
}

export function renderReleaseReportEntriesSubsectionGroup(
  heading: string,
  subsections: readonly ReleaseReportMarkdownEntriesSubsection[],
): string[] {
  return renderReleaseReportItemSection(heading, subsections, renderReleaseReportEntriesSubsection);
}

export function renderReleaseReportMessagesSection<TMessage extends LiveProbeReportMessage>(
  heading: string,
  messages: TMessage[],
  emptyText: string,
): string[] {
  return [
    `## ${heading}`,
    "",
    ...renderMessages(messages, emptyText),
    "",
  ];
}

export function renderReleaseReportTail(evidenceEndpoints: object, nextActions: readonly string[]): string[] {
  return [
    "## Evidence Endpoints",
    "",
    ...renderEntries(evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(nextActions, "No next actions."),
    "",
  ];
}

export function renderReleaseReportStep(
  step: Record<string, unknown>,
  options: ReleaseReportStepRenderOptions,
): string[] {
  return [
    `### Step ${String(step.order)}: ${String(step.phase)}`,
    "",
    `- ${options.identityLabel}: ${String(step[options.identityKey])}`,
    `- Action: ${String(step.action)}`,
    `- Evidence target: ${String(step.evidenceTarget)}`,
    `- Expected evidence: ${String(step.expectedEvidence)}`,
    ...options.booleanFields.map(([label, key]) => `- ${label}: ${String(step[key])}`),
    "",
  ];
}

export function renderReleaseForbiddenOperation(operation: ReleaseReportForbiddenOperation): string[] {
  return [
    `- ${operation.operation}: ${operation.reason} Blocked by ${operation.blockedBy}.`,
  ];
}

export function digestReleaseReport(value: unknown): string {
  return sha256StableJson(value);
}

export function isReleaseReportDigest(value: unknown): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function capitalize(value: string): string {
  return value.length === 0 ? value : `${value[0]!.toUpperCase()}${value.slice(1)}`;
}

function renderReleaseReportEntriesSubsection(section: ReleaseReportMarkdownEntriesSubsection): string[] {
  return [
    `### ${section.heading}`,
    "",
    ...renderEntries(section.entries),
    "",
  ];
}
