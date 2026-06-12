import { describe, expect, it } from "vitest";

import {
  analyzeMarkdownReadabilitySignals,
} from "../src/services/markdownDocumentReadabilitySignals.js";

describe("markdown document readability signals", () => {
  it("reports scannable section metrics without flagging normal split explanations", () => {
    const result = analyzeMarkdownReadabilitySignals(`
# Node v2110：可读性分析器

## 目标

这里说明目标和非目标。

## 入口

这里说明 src/services/markdownDocumentReadabilitySignals.ts。

## 验证

这里说明 test/markdownDocumentReadabilitySignals.test.ts。
`);

    expect(result).toMatchObject({
      h2SectionCount: 3,
      scannableH2SectionCount: 3,
      repetitiveParagraphSignals: [],
      oversizedDetailedSectionSignals: [],
    });
    expect(result.largestH2SectionHeading).not.toBeNull();
    expect(result.largestH2SectionChineseCharacters).toBeGreaterThan(0);
  });

  it("detects repeated long paragraphs after removing numbered-list prefixes", () => {
    const repeated = "这段解释重复出现，虽然每次编号不同，但正文完全一致，不能用来冒充不同的代码路径、响应模型、安全边界或验证证据，也不能用来满足中文讲解深度要求，更不能让审查者误以为每一条编号都提供了新的工程信息。";
    const result = analyzeMarkdownReadabilitySignals(`
# Node v2110：重复段落

## 详细

1. ${repeated}

2. ${repeated}

3. ${repeated}
`);

    expect(result.repetitiveParagraphSignals).toHaveLength(1);
  });

  it("detects oversized detailed walkthrough sections", () => {
    const result = analyzeMarkdownReadabilitySignals(`
# Node v2110：过大的详细讲解

## Detailed Walkthrough / 详细讲解

${"这段内容都塞在一个详细讲解章节里，读者无法跳读。".repeat(120)}
`);

    expect(result.oversizedDetailedSectionSignals).toHaveLength(1);
    expect(result.oversizedDetailedSectionSignals[0]).toContain("Detailed Walkthrough / 详细讲解");
  });
});
