import { describe, expect, it } from "vitest";

import { normalizeRendererMigrationMarkdown } from "./rendererMigrationParityUtils.js";

const GENERATED_AT = "2026-07-10T00:00:00.000Z";

describe("renderer migration parity normalization", () => {
  it.each([
    {
      label: "Java",
      windows: String.raw`- Java v151 resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\javaproj\advanced-order-platform\d\151\explanation.md`,
      linux: "- Java v151 resolved path: /home/runner/work/nodeproj/nodeproj/fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/151/explanation.md",
    },
    {
      label: "mini-kv",
      windows: String.raw`- mini-kv v143 resolved path: D:\nodeproj\orderops-node\fixtures\historical\sibling-workspaces\mini-kv\fixtures\release\receipt.json`,
      linux: "- mini-kv v143 resolved path: /home/runner/work/nodeproj/nodeproj/fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/receipt.json",
    },
  ])("normalizes versioned $label resolved paths identically on Windows and Linux", ({ windows, linux }) => {
    const normalizedWindows = normalizeRendererMigrationMarkdown(windows, { generatedAt: GENERATED_AT });
    const normalizedLinux = normalizeRendererMigrationMarkdown(linux, { generatedAt: GENERATED_AT });

    expect(normalizedWindows).toBe(normalizedLinux);
    expect(normalizedWindows).toContain("resolved path: <repo>/fixtures/");
  });

  it("does not rewrite a non-path report line", () => {
    const line = "- Java v151 evidence status: stable-current-evidence-export";

    expect(normalizeRendererMigrationMarkdown(line, { generatedAt: GENERATED_AT })).toBe(line);
  });

  it("normalizes indented evidence size and digest metadata as one cross-platform fact", () => {
    const windows = [
      "  - sizeBytes: 7256",
      `  - digest: ${"1b".repeat(32)}`,
    ].join("\n");
    const linux = [
      "  - sizeBytes: 7255",
      `  - digest: ${"51".repeat(32)}`,
    ].join("\n");

    expect(normalizeRendererMigrationMarkdown(windows, { generatedAt: GENERATED_AT })).toBe(
      normalizeRendererMigrationMarkdown(linux, { generatedAt: GENERATED_AT }),
    );
    expect(normalizeRendererMigrationMarkdown(windows, { generatedAt: GENERATED_AT })).toBe([
      "  - sizeBytes: <bytes>",
      "  - digest: <sha256>",
    ].join("\n"));
  });
});
