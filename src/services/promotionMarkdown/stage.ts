import {
  formatMarkdownDigest,
  optionalMarkdownValue,
  renderMarkdownFields,
  renderMarkdownItems,
  type MarkdownDigest,
  type MarkdownField,
} from "../promotionMarkdownEngine.js";

export interface DecisionData {
  totalDecisions: number;
  latestDecisionId?: string;
  latestOutcome?: string;
}

export interface SimpleItem {
  name: string;
  valid: boolean;
  digest: MarkdownDigest;
  source: string;
}

export interface CheckedItem {
  name: string;
  valid: boolean;
  validMatches: boolean;
  sourceMatches: boolean;
  digestMatches: boolean;
  recomputedDigest: MarkdownDigest;
  source: string;
}

export interface DetailItem extends SimpleItem {
  detail: string;
}

export interface CheckedDetailItem extends CheckedItem {
  detailMatches: boolean;
  detail: string;
}

export function decisionLines(decision: DecisionData): string[] {
  return renderMarkdownFields([
    ["Total decisions", decision.totalDecisions],
    ["Latest decision id", optionalMarkdownValue(decision.latestDecisionId)],
    ["Latest outcome", optionalMarkdownValue(decision.latestOutcome)],
  ]);
}

export function summaryLines(
  summary: Pick<DecisionData, "totalDecisions" | "latestDecisionId">,
  fields: readonly MarkdownField[],
): string[] {
  return renderMarkdownFields([
    ["Total decisions", summary.totalDecisions],
    ["Latest decision id", optionalMarkdownValue(summary.latestDecisionId)],
    ...fields,
  ]);
}

export function simpleItemLines(items: readonly SimpleItem[]): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Digest", formatMarkdownDigest(item.digest)],
    ["Source", item.source],
  ]);
}

export function checkedItemLines<T extends CheckedItem>(
  items: readonly T[],
  digestLabel: string,
  digest: (item: T) => MarkdownDigest,
): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Valid matches", item.validMatches],
    ["Source matches", item.sourceMatches],
    ["Digest matches", item.digestMatches],
    [digestLabel, formatMarkdownDigest(digest(item))],
    ["Recomputed digest", formatMarkdownDigest(item.recomputedDigest)],
    ["Source", item.source],
  ]);
}

export function detailItemLines(items: readonly DetailItem[]): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Digest", formatMarkdownDigest(item.digest)],
    ["Source", item.source],
    ["Detail", item.detail],
  ]);
}

export function checkedDetailLines<T extends CheckedDetailItem>(
  items: readonly T[],
  digestLabel: string,
  digest: (item: T) => MarkdownDigest,
): string[] {
  return renderMarkdownItems(items, (item) => [
    ["Valid", item.valid],
    ["Valid matches", item.validMatches],
    ["Source matches", item.sourceMatches],
    ["Detail matches", item.detailMatches],
    ["Digest matches", item.digestMatches],
    [digestLabel, formatMarkdownDigest(digest(item))],
    ["Recomputed digest", formatMarkdownDigest(item.recomputedDigest)],
    ["Source", item.source],
    ["Detail", item.detail],
  ]);
}
