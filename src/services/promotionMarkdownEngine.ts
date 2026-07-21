export interface MarkdownDigest {
  algorithm: string;
  value: string;
}

export type MarkdownField = readonly [label: string, value: unknown];
export type MarkdownSection = readonly [heading: string, body: readonly string[]];

export interface MarkdownDocumentSpec {
  title: string;
  fields: readonly MarkdownField[];
  sections: readonly MarkdownSection[];
}

export function renderMarkdownSpec(spec: MarkdownDocumentSpec): string {
  return renderMarkdownDocument(spec.title, spec.fields, spec.sections);
}

export function renderMarkdownDocument(
  title: string,
  fields: readonly MarkdownField[],
  sections: readonly MarkdownSection[],
): string {
  const lines = [`# ${title}`, "", ...renderMarkdownFields(fields), ""];
  for (const [heading, body] of sections) {
    lines.push(`## ${heading}`, "", ...body, "");
  }
  return lines.join("\n");
}

export function renderMarkdownFields(fields: readonly MarkdownField[]): string[] {
  return fields.map(([label, value]) => `- ${label}: ${value}`);
}

export function renderMarkdownItems<T extends { name: string }>(
  items: readonly T[],
  fields: (item: T) => readonly MarkdownField[],
): string[] {
  return items.flatMap((item) => [
    `### ${item.name}`,
    "",
    ...renderMarkdownFields(fields(item)),
    "",
  ]);
}

export function renderMarkdownBullets(items: readonly string[]): string[] {
  return items.map((item) => `- ${item}`);
}

export function formatMarkdownDigest(digest: MarkdownDigest): string {
  return `${digest.algorithm}:${digest.value}`;
}

export function optionalMarkdownValue<T>(value: T | null | undefined): T | "none" {
  return value ?? "none";
}
