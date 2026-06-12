import { describe, expect, it } from "vitest";

import { evaluateCodeWalkthroughDocument } from "../src/services/codeWalkthroughDocumentationQualityRules.js";
import type { CodeWalkthroughDocumentScan } from "../src/services/codeWalkthroughDocumentationQualityTypes.js";

describe("code walkthrough documentation quality rules", () => {
  it("accepts a sample-style enforced batch walkthrough", () => {
    const result = evaluateCodeWalkthroughDocument(documentWithText(`
# Node v2058-v2062 code walkthrough: code walkthrough quality gate foundation

## Version Goal And Non-Goal

The goal is to add a read-only quality gate. The non-goal is runtime execution.

## Entry Points

The public route is /api/v1/audit/code-walkthrough-documentation-quality-gate.

## Profile Response Model

The profile records checks, summary, bucketSummary, blockers, warnings, and recommendations.

## Upstream Evidence And Config

No Java or mini-kv service is started. The only evidence is local Markdown and the standard document.

## Service Flow

src/services/codeWalkthroughDocumentationQualityScanner.ts lists bucketed Markdown files and passes each file to the rules module.

## Safety Boundary

The gate is read-only, executionAllowed remains false, and it does not read credentials or write upstream state.

## Test Coverage

Focused Vitest coverage validates rules, scanner behavior, and route output.

## One-Sentence Summary

This batch turns the new walkthrough standard into an enforceable read-only quality gate.
`));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(true);
    expect(result.complianceScore).toBe(100);
    expect(result.placeholderSignals).toEqual([]);
    expect(result.forbiddenExecutionClaimSignals).toEqual([]);
  });

  it("blocks enforced placeholder walkthroughs", () => {
    const result = evaluateCodeWalkthroughDocument(documentWithText(`
# Node v2065 code walkthrough

TODO: coming soon.
`));

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.compliantWithCurrentStandard).toBe(false);
    expect(result.placeholderSignals.length).toBeGreaterThan(0);
    expect(result.missingRequiredSections).toContain("service-flow");
  });

  it("requires long Chinese writing for new walkthrough records", () => {
    const result = evaluateCodeWalkthroughDocument({
      ...documentWithText(`
# Node v2104 code walkthrough：中文太短

## Goal and Non-goal / 目标与非目标

目标是记录一个新版本，非目标是生产执行。

## Entry Points / 入口

src/services/fFolderExplanationQualityGate.ts

## Profile Response Model / 响应模型

profile、checks、summary。

## Upstream Evidence And Config / 上游证据与配置

本地证据。

## Service Flow / 服务流程

src/services/fFolderExplanationQualityRules.ts 评价文本。

## Safety Boundary / 安全边界

read-only，executionAllowed=false。

## Test Coverage / 测试覆盖

test/codeWalkthroughDocumentationQualityRules.test.ts。

## One-Sentence Summary / 一句话总结

这篇新记录太短，应该失败。
`),
      recordNumber: 2070,
      versionNumber: 2104,
    });

    expect(result.enforcedByCurrentStandard).toBe(true);
    expect(result.chineseWritingRequired).toBe(true);
    expect(result.meetsChineseWritingFloor).toBe(false);
    expect(result.compliantWithCurrentStandard).toBe(false);
  });

  it("keeps legacy walkthroughs visible without enforcing the current floor", () => {
    const result = evaluateCodeWalkthroughDocument({
      ...documentWithText("# Legacy short walkthrough\n"),
      recordNumber: 100,
      expectedBucket: "r0000",
      bucket: "r0000",
    });

    expect(result.enforcedByCurrentStandard).toBe(false);
    expect(result.compliantWithCurrentStandard).toBe(false);
  });
});

function documentWithText(text: string): CodeWalkthroughDocumentScan {
  return {
    relativePath: "r2000/2065-code-walkthrough-quality-gate-foundation-v2058-v2062.md",
    bucket: "r2000",
    expectedBucket: "r2000",
    recordNumber: 2065,
    versionNumber: 2058,
    title: "# Node v2058-v2062 code walkthrough",
    byteLength: Buffer.byteLength(text),
    lineCount: text.split(/\r?\n/).length,
    text,
  };
}
