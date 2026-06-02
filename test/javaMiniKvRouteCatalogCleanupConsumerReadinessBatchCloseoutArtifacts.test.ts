import { describe, expect, it } from "vitest";

import {
  CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.js";

describe("Java/mini-kv route catalog cleanup consumer readiness batch closeout artifact manifest", () => {
  it("keeps the v491-v495 closeout artifact manifest stable", () => {
    expect(Object.keys(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS)).toHaveLength(22);
    expect(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS.v491Plan).toBe(
      "docs/plans3/v491-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-roadmap.md",
    );
    expect(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS.v493ArchiveSummary).toBe(
      "e/493/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v493-archive-summary.json",
    );
    expect(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS.v494VerifierTest).toBe(
      "test/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.test.ts",
    );
    expect(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS.v495Explanation).toBe(
      "e/495/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-route-v495.md",
    );
    expect(CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS.v495Walkthrough).toContain(
      "代码讲解记录_生产雏形阶段3",
    );
  });
});
