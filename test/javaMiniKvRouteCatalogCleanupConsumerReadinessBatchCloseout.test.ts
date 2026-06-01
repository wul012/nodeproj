import { describe, expect, it } from "vitest";

import {
  loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout.js";

describe("Java/mini-kv route catalog cleanup consumer readiness batch closeout", () => {
  it("closes the v491-v495 consumer readiness route cleanup chain", () => {
    const closeout = loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout();

    expect(closeout).toMatchObject({
      profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1",
      closeoutState: "ready",
      activeNodeVersion: "Node v496",
      sourceNodeVersion: "Node v495",
      readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: true,
      closeoutOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      closedVersions: ["v491", "v492", "v493", "v494", "v495"],
      routeCatalog: {
        groupCount: 50,
        routeCount: 207,
        javaMiniKvDomainRouteCount: 43,
        cleanupHandoffRouteGroupRouteCount: 9,
      },
      sourceArchive: {
        version: "v493",
        ready: true,
        checkCount: 21,
        passedCheckCount: 21,
        activeNodeVersion: "Node v492",
        sourceNodeVersion: "Node v491",
        executionAllowed: false,
        startsJavaService: false,
        startsMiniKvService: false,
      },
      summary: {
        fileCount: 22,
        presentFileCount: 22,
        closedVersionCount: 5,
        checkCount: 15,
        passedCheckCount: 15,
        routeCount: 207,
        javaMiniKvDomainRouteCount: 43,
        cleanupHandoffRouteGroupRouteCount: 9,
        sourceArchiveCheckCount: 21,
        sourceArchivePassedCheckCount: 21,
      },
    });
    expect(Object.values(closeout.files).every((file) => file.exists)).toBe(true);
    expect(closeout.sourceArchive.jsonSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(closeout.sourceArchive.markdownSha256).toMatch(/^[a-f0-9]{64}$/);
  });
});
