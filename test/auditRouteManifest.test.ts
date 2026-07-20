import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  CLEANUP_HANDOFF_ROUTE_COUNT,
  ROUTE_QUALITY_PATHS,
  ROUTE_QUALITY_ROUTE_COUNT,
} from "../src/contracts/auditRouteManifest.js";
import {
  javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes,
} from "../src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
import {
  managedAuditRouteQualityAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditRouteQualityRoutes.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout,
} from "../src/services/javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.js";
import {
  loadReadabilityMaintenanceProfile,
} from "../src/services/readabilityMaintenanceProfile.js";

describe("audit route manifest", () => {
  it("matches every managed-audit quality route in declaration order", () => {
    const manifestPaths = Object.values(ROUTE_QUALITY_PATHS);
    const registeredPaths = managedAuditRouteQualityAuditJsonMarkdownRoutes.map((route) => route.path);

    expect(ROUTE_QUALITY_ROUTE_COUNT).toBe(6);
    expect(registeredPaths).toEqual(manifestPaths);
    expect(new Set(manifestPaths).size).toBe(manifestPaths.length);
  });

  it("pins the cleanup handoff route count to the actual registration table", () => {
    const registeredPaths = javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes.map((route) => route.path);

    expect(CLEANUP_HANDOFF_ROUTE_COUNT).toBe(30);
    expect(registeredPaths).toHaveLength(CLEANUP_HANDOFF_ROUTE_COUNT);
    expect(new Set(registeredPaths).size).toBe(registeredPaths.length);
  });

  it("preserves route-dependent report projections across dependency inversion", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    });
    const readability = loadReadabilityMaintenanceProfile({ config });
    const cleanup = loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout({ config });

    expect({
      readability: readability.routeCatalog,
      cleanup: cleanup.currentRouteCatalog,
    }).toEqual({
      readability: {
        expectedGroupCount: 51,
        expectedRouteCount: 254,
        managedAuditRouteCount: 56,
        routeQualityRouteCount: 6,
      },
      cleanup: {
        groupCount: 51,
        routeCount: 254,
        javaMiniKvDomainRouteCount: 85,
        cleanupHandoffRouteGroupRouteCount: 30,
      },
    });
  });
});
