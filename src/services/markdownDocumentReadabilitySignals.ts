const CHINESE_CHARACTER_PATTERN = /[\u3400-\u9fff]/g;

const DEFAULT_REPETITIVE_PARAGRAPH_MIN_LENGTH = 80;
const DEFAULT_REPETITIVE_PARAGRAPH_MIN_COUNT = 3;
const DEFAULT_OVERSIZED_DETAILED_SECTION_MIN_CHINESE_CHARS = 1000;
const DEFAULT_OVERSIZED_DETAILED_SECTION_MIN_LINES = 24;
const DEFAULT_DETAILED_SECTION_HEADING_PATTERN =
  /^(?:Detailed Walkthrough(?:\s*\/\s*详细讲解)?|详细讲解|详细说明)$/i;

export interface MarkdownReadabilitySignalOptions {
  repetitiveParagraphMinLength?: number;
  repetitiveParagraphMinCount?: number;
  oversizedDetailedSectionMinChineseCharacters?: number;
  oversizedDetailedSectionMinLines?: number;
  detailedSectionHeadingPattern?: RegExp;
}

export interface MarkdownReadabilitySignals {
  repetitiveParagraphSignals: string[];
  oversizedDetailedSectionSignals: string[];
  h2SectionCount: number;
  scannableH2SectionCount: number;
  largestH2SectionHeading: string | null;
  largestH2SectionChineseCharacters: number;
}

interface H2Section {
  heading: string;
  bodyLines: string[];
}

export function analyzeMarkdownReadabilitySignals(
  text: string,
  options: MarkdownReadabilitySignalOptions = {},
): MarkdownReadabilitySignals {
  const sections = collectH2Sections(text);
  const largestSection = findLargestChineseSection(sections);

  return {
    repetitiveParagraphSignals: collectRepetitiveParagraphSignals(text, options),
    oversizedDetailedSectionSignals: collectOversizedDetailedSectionSignals(sections, options),
    h2SectionCount: sections.length,
    scannableH2SectionCount: sections
      .filter((section) => countChineseCharacters(section.bodyLines.join("\n")) > 0)
      .length,
    largestH2SectionHeading: largestSection?.heading ?? null,
    largestH2SectionChineseCharacters: largestSection === undefined
      ? 0
      : countChineseCharacters(largestSection.bodyLines.join("\n")),
  };
}

function collectH2Sections(text: string): H2Section[] {
  const lines = text.split(/\r?\n/);
  const sections: H2Section[] = [];
  let current: H2Section | null = null;

  for (const line of lines) {
    const headingMatch = /^##\s+(.+?)\s*$/.exec(line);
    if (headingMatch !== null) {
      current = { heading: headingMatch[1].trim(), bodyLines: [] };
      sections.push(current);
      continue;
    }

    if (current !== null) {
      current.bodyLines.push(line);
    }
  }

  return sections;
}

function findLargestChineseSection(sections: readonly H2Section[]): H2Section | undefined {
  return [...sections].sort((left, right) =>
    countChineseCharacters(right.bodyLines.join("\n")) - countChineseCharacters(left.bodyLines.join("\n")),
  )[0];
}

function collectRepetitiveParagraphSignals(
  text: string,
  options: MarkdownReadabilitySignalOptions,
): string[] {
  const minLength = options.repetitiveParagraphMinLength ?? DEFAULT_REPETITIVE_PARAGRAPH_MIN_LENGTH;
  const minCount = options.repetitiveParagraphMinCount ?? DEFAULT_REPETITIVE_PARAGRAPH_MIN_COUNT;
  const counts = new Map<string, number>();

  for (const paragraph of text.split(/\r?\n\s*\r?\n/)) {
    const normalized = normalizeParagraph(paragraph);
    if (normalized.length < minLength) {
      continue;
    }
    counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= minCount)
    .map(([paragraph, count]) => `${count}x:${paragraph.slice(0, 96)}`)
    .sort();
}

function collectOversizedDetailedSectionSignals(
  sections: readonly H2Section[],
  options: MarkdownReadabilitySignalOptions,
): string[] {
  const minChineseCharacters =
    options.oversizedDetailedSectionMinChineseCharacters
    ?? DEFAULT_OVERSIZED_DETAILED_SECTION_MIN_CHINESE_CHARS;
  const minLines = options.oversizedDetailedSectionMinLines ?? DEFAULT_OVERSIZED_DETAILED_SECTION_MIN_LINES;
  const headingPattern = options.detailedSectionHeadingPattern ?? DEFAULT_DETAILED_SECTION_HEADING_PATTERN;

  return sections
    .filter((section) => headingPattern.test(section.heading))
    .map((section) => {
      const chineseCharacters = countChineseCharacters(section.bodyLines.join("\n"));
      return {
        heading: section.heading,
        bodyLineCount: section.bodyLines.length,
        chineseCharacters,
      };
    })
    .filter((section) =>
      section.chineseCharacters >= minChineseCharacters || section.bodyLineCount >= minLines)
    .map((section) =>
      `${section.heading}: chinese=${section.chineseCharacters}; lines=${section.bodyLineCount}`)
    .sort();
}

function normalizeParagraph(paragraph: string): string {
  return paragraph
    .replace(/^\s*\d+[.)、]\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function countChineseCharacters(text: string): number {
  return text.match(CHINESE_CHARACTER_PATTERN)?.length ?? 0;
}
