import { describe, expect, it } from "vitest";

import {
  loadJavaConsumerReadinessEvidenceParts,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessJavaEvidence.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("Java/mini-kv consumer readiness Java evidence parser", () => {
  it("loads Java v220-v224 evidence parts with closed runtime boundaries", () => {
    const javaEvidence = loadJavaConsumerReadinessEvidenceParts();

    expect(javaEvidence).toMatchObject({
      javaV220ConsumerEvidenceDigest: {
        version: "Java v220",
        status: "passed",
        digestEvidenceCount: 5,
        digestCheckCount: 7,
        validationCount: 2,
        boundaryRuntimeClosed: true,
      },
      javaV220ConsumerEvidenceDigestFixture: {
        version: "Java v220",
        contractName: "shard-readiness.v1",
        digestEvidenceCount: 5,
        digestCheckCount: 7,
        blockedOperationCount: 7,
        startsJavaService: false,
        startsMiniKvService: false,
      },
      javaV224ConsumerReadinessCompletion: {
        version: "Java v224",
        status: "passed",
        guardCount: 5,
        validationCount: 2,
        boundaryRuntimeClosed: true,
      },
    });
  });

  it("resolves Java evidence from frozen historical fixtures when fallback is forced", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";
    try {
      const javaEvidence = loadJavaConsumerReadinessEvidenceParts();

      expect(javaEvidence.javaV220ConsumerEvidenceDigest.boundaryRuntimeClosed).toBe(true);
      expect(javaEvidence.javaV221ConsumerEvidenceDigestSnapshotFreeze.guardCount).toBe(5);
      expect(javaEvidence.javaV222ConsumerEvidenceDigestHistoricalCompatibility.guardCount).toBe(4);
      expect(javaEvidence.javaV223ConsumerEvidenceDigestIntegrity.guardCount).toBe(6);
      expect(javaEvidence.javaV224ConsumerReadinessCompletion.guardCount).toBe(5);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });
});
