import { describe, expect, it } from "vitest";

import { evaluateFFolderExplanationDocument } from "../src/services/fFolderExplanationQualityRules.js";
import {
  F_FOLDER_EXPLANATION_MIN_BYTES,
  F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS,
  type FFolderExplanationDocumentScan,
} from "../src/services/fFolderExplanationQualityTypes.js";

describe("f-folder explanation quality rules", () => {
  it("accepts a long Chinese explanation with code paths, verification, and safety boundary", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(longChineseExplanation()));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(true);
    expect(result.meetsMinimumLength).toBe(true);
    expect(result.meetsChineseDepth).toBe(true);
    expect(result.hasEnoughCodePathReferences).toBe(true);
    expect(result.missingRequiredSections).toEqual([]);
    expect(result.placeholderSignals).toEqual([]);
    expect(result.forbiddenExecutionClaimSignals).toEqual([]);
  });

  it("blocks short enforced explanations even when they have a title", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(`
# Node v2099：太短的讲解

## 目标

只写一句话不够。
`));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(false);
    expect(result.byteLength).toBeLessThan(F_FOLDER_EXPLANATION_MIN_BYTES);
    expect(result.chineseCharacterCount).toBeLessThan(F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS);
    expect(result.meetsMinimumLength).toBe(false);
  });

  it("blocks forbidden production authority claims in explanations", () => {
    const result = evaluateFFolderExplanationDocument(documentWithText(
      longChineseExplanation().replace("productionAuthority=false", "productionAuthority: true"),
    ));

    expect(result.compliantWithCurrentStandard).toBe(false);
    expect(result.forbiddenExecutionClaimSignals).toContain("productionAuthority:\\s*true");
  });
});

function documentWithText(text: string): FFolderExplanationDocumentScan {
  return {
    relativePath: "f/2099/解释/f-folder-explanation-quality-type-contract-v2099.md",
    versionNumber: 2099,
    fileName: "f-folder-explanation-quality-type-contract-v2099.md",
    title: "Node v2099：f 目录讲解质量类型契约",
    byteLength: Buffer.byteLength(text),
    lineCount: text.split(/\r?\n/).length,
    text,
    explanationDirAligned: true,
  };
}

function longChineseExplanation(): string {
  const paragraph = "这一版的目标是把 f 目录中的中文讲解从人工约定变成可验证的工程契约。讲解不能只写结论，而要说明为什么改、入口在哪里、响应模型如何表达、执行流程如何被限制、哪些安全边界没有被打开，以及最终用哪些测试和 smoke 证明。";
  const deepExplanation = Array(40).fill(paragraph).join("\n\n");
  return `
# Node v2099：f 目录讲解质量类型契约

## 目标与背景

${deepExplanation}

## 代码入口

本版入口是 \`src/services/fFolderExplanationQualityTypes.ts\`、\`src/services/fFolderExplanationQualityRules.ts\`、\`src/services/fFolderExplanationQualityScanner.ts\` 和 \`src/services/fFolderExplanationQualityGate.ts\`。测试入口是 \`test/fFolderExplanationQualityRules.test.ts\`。这些路径会被规则扫描出来，证明讲解确实指向代码而不是空泛复述。

## 响应模型

质量门响应模型包含 profileVersion、qualityGateState、checks、summary、enforcedExplanations、blockers、warnings、recommendations 和 qualityDigest。每个 enforced explanation 都记录 byteLength、chineseCharacterCount、codePathReferences 和 complianceScore。

## 执行流程

扫描器从 \`f/<version>/解释\` 读取 Markdown，规则层计算中文字符数、代码路径数量、必需章节、占位符和禁止的生产授权声明，然后 gate 汇总为只读报告。它只读取本地归档文件，不连接 managed audit，不启动 Java，也不启动 mini-kv。

## 安全边界

这条质量门只允许 read-only 检查。executionAllowed=false，readyForProductionOperations=false，productionAuthority=false。任何讲解如果把 productionAuthority 或 readyForProductionShardExecution 写成开启状态，都会被规则当成禁止声明。

## 验证

验证包括 \`test/fFolderExplanationQualityRules.test.ts\`、\`test/fFolderExplanationQualityGate.test.ts\`、\`npm run typecheck\`、\`npm run build\` 和 HTTP smoke。CI 仍然负责完整回归。

## 下一步与停止条件

下一步是把 v2094-v2098 的旧短讲解加厚为中文长讲解，并把新质量门归档到 \`e/2099/evidence\` 和 \`f/2099/解释\`。停止条件是每个 enforced 文档都满足长度、中文深度、代码路径、验证和安全边界要求。
`;
}
