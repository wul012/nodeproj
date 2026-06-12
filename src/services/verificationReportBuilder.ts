import {
  renderEntries,
  renderList,
  renderMessages,
  type LiveProbeReportMessage,
} from "./liveProbeReportUtils.js";

/**
 * Generic catalog-driven markdown report builder for verification / echo /
 * readiness profiles (AGENTS.md "Governance Growth Control": prefer
 * catalog/template builders over copying another full renderer).
 *
 * Output contract: byte-identical to the hand-written renderer pattern used
 * across src/services — `# title`, meta bullet lines, then `## heading`
 * sections joined with blank lines and a trailing newline.
 */
export type VerificationReportSection =
  | { heading: string; entries: object }
  | { heading: string; messages: LiveProbeReportMessage[]; emptyText: string }
  | { heading: string; list: readonly string[]; emptyText: string }
  | { heading: string; lines: readonly string[] };

export interface VerificationReportSpec {
  title: string;
  meta: ReadonlyArray<readonly [label: string, value: unknown]>;
  sections: readonly VerificationReportSection[];
}

export function renderVerificationReportMarkdown(spec: VerificationReportSpec): string {
  const lines: string[] = [`# ${spec.title}`, ""];

  for (const [label, value] of spec.meta) {
    lines.push(`- ${label}: ${value}`);
  }

  for (const section of spec.sections) {
    lines.push("", `## ${section.heading}`, "", ...renderSectionBody(section));
  }

  lines.push("");
  return lines.join("\n");
}

function renderSectionBody(section: VerificationReportSection): string[] {
  if ("entries" in section) {
    return renderEntries(section.entries);
  }
  if ("messages" in section) {
    return renderMessages(section.messages, section.emptyText);
  }
  if ("list" in section) {
    return renderList(section.list, section.emptyText);
  }
  return [...section.lines];
}
