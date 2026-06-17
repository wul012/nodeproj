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
interface VerificationReportSectionBase {
  heading: string;
  bodyLeadingBlankLine?: boolean;
}

export type VerificationReportSection =
  | (VerificationReportSectionBase & { entries: object })
  | (VerificationReportSectionBase & { messages: LiveProbeReportMessage[]; emptyText: string })
  | (VerificationReportSectionBase & { list: readonly string[]; emptyText: string })
  | (VerificationReportSectionBase & { lines: readonly string[] });

export interface VerificationReportSpec {
  title: string;
  meta: ReadonlyArray<readonly [label: string, value: unknown]>;
  sections: readonly VerificationReportSection[];
  trailingNewline?: boolean;
}

export interface VerificationArchiveFileReference {
  path: string;
  exists: boolean;
  byteLength: number;
  digest?: string | null;
}

export interface VerificationEvidenceFileReference {
  id: string;
  exists: boolean;
  resolvedPath: string;
  digest?: string | null;
}

export function renderVerificationReportMarkdown(spec: VerificationReportSpec): string {
  const lines: string[] = [`# ${spec.title}`, ""];

  for (const [label, value] of spec.meta) {
    lines.push(`- ${label}: ${value}`);
  }

  for (const section of spec.sections) {
    lines.push("", `## ${section.heading}`);
    if (section.bodyLeadingBlankLine !== false) {
      lines.push("");
    }
    lines.push(...renderSectionBody(section));
  }

  if (spec.trailingNewline !== false) {
    lines.push("");
  }
  return lines.join("\n");
}

export function renderVerificationArchiveFileReferenceLines(
  files: readonly VerificationArchiveFileReference[],
): string[] {
  return files.map((file) =>
    `- ${file.path}: exists=${file.exists}; bytes=${file.byteLength}; digest=${file.digest ?? "missing"}`);
}

export function renderVerificationEvidenceFileReferenceLines(
  files: readonly VerificationEvidenceFileReference[],
): string[] {
  return files.flatMap((file) => [
    `- ${file.id}: ${file.exists ? "present" : "missing"}`,
    `  - Resolved path: ${file.resolvedPath}`,
    `  - SHA-256: ${file.digest ?? "missing"}`,
  ]);
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
