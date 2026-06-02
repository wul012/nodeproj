import { describe, expect, it } from "vitest";

import {
  JAVA_V220_CONSUMER_EVIDENCE_DIGEST,
  JAVA_V224_CONSUMER_READINESS_COMPLETION,
  MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidencePaths.js";
import {
  MINI_KV_EXPECTED_DIGESTS,
  MINI_KV_POST_CLOSEOUT_RELEASES,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessMiniKvSupport.js";

describe("Java/mini-kv route catalog cleanup consumer readiness support constants", () => {
  it("keeps Java evidence paths and the mini-kv audit note path stable", () => {
    expect(JAVA_V220_CONSUMER_EVIDENCE_DIGEST).toBe(
      "D:/javaproj/advanced-order-platform/e/220/evidence/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.json",
    );
    expect(JAVA_V224_CONSUMER_READINESS_COMPLETION).toBe(
      "D:/javaproj/advanced-order-platform/e/224/evidence/java-shard-readiness-v1-contract-consumer-readiness-completion-v224.json",
    );
    expect(MINI_KV_V210_ROUTE_CATALOG_CLEANUP_POST_CLOSEOUT_AUDIT_NOTE).toBe(
      "D:/C/mini-kv/e/210/解释/说明.md",
    );
  });

  it("keeps the mini-kv post-closeout release sequence and digest table aligned", () => {
    expect(MINI_KV_POST_CLOSEOUT_RELEASES).toEqual([202, 203, 204, 205, 206, 207, 208, 209]);
    expect(Object.keys(MINI_KV_EXPECTED_DIGESTS)).toEqual([
      "v202",
      "v203",
      "v204",
      "v205",
      "v206",
      "v207",
      "v208",
      "v209",
    ]);
    expect(MINI_KV_EXPECTED_DIGESTS.v202).toBe("fnv1a64:cd0c634b2fc44eff");
    expect(MINI_KV_EXPECTED_DIGESTS.v209).toBe("fnv1a64:6c283479e8bb1988");
  });
});
