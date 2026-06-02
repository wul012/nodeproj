import { describe, expect, it } from "vitest";

import {
  createConsumerReadinessEvidenceFiles,
  createMiniKvLatestAuditNoteSnippets,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessFileBuilders.js";

describe("Java/mini-kv consumer readiness evidence file builders", () => {
  it("builds the full Java and mini-kv evidence file map", () => {
    const files = createConsumerReadinessEvidenceFiles();

    expect(Object.keys(files)).toHaveLength(15);
    expect(files.javaV220ConsumerEvidenceDigest).toMatchObject({
      id: "java-v220-consumer-evidence-digest",
      exists: true,
    });
    expect(files.javaV224ConsumerReadinessCompletion).toMatchObject({
      id: "java-v224-consumer-readiness-completion",
      exists: true,
    });
    expect(files.miniKvv202PostCloseoutContinuity).toMatchObject({
      id: "mini-kv-v202-post-closeout-continuity",
      exists: true,
    });
    expect(files.miniKvv209PostCloseoutContinuity).toMatchObject({
      id: "mini-kv-v209-post-closeout-continuity",
      exists: true,
    });
    expect(Object.values(files).every((file) => file.digest?.match(/^[a-f0-9]{64}$/))).toBe(true);
  });

  it("builds the mini-kv v210 audit note snippets", () => {
    const snippets = createMiniKvLatestAuditNoteSnippets();

    expect(Object.keys(snippets)).toEqual([
      "miniKvV210RollingFixture",
      "miniKvV210FallbackV209",
      "miniKvV210AllTestsPassed",
      "miniKvV210TcpSmoke",
    ]);
    expect(Object.values(snippets).every((snippet) => snippet.matched)).toBe(true);
    expect(snippets.miniKvV210FallbackV209).toMatchObject({
      id: "mini-kv-v210-fallback-v209",
      expectedText: "fallback `v209`",
    });
  });
});
