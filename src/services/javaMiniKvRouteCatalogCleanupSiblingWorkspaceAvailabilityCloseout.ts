import { existsSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout.js";

export {
  renderJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutMarkdown,
} from "./javaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutRenderer.js";

const JAVA_HISTORICAL_FIXTURE_ROOT =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform";
const MINI_KV_HISTORICAL_FIXTURE_ROOT =
  "fixtures/historical/sibling-workspaces/mini-kv";

export interface JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-sibling-workspace-availability-closeout.v1";
  activeNodeVersion: "Node v556";
  sourceNodeVersion: "Node v555";
  closeoutState: "ready" | "blocked";
  readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  closeoutOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  siblingWorkspaceMode: {
    localLiveSiblingReposBundledInWorkspace: false;
    liveSiblingStartupRequiredByDefault: false;
    historicalFixturesAvailable: boolean;
    nodeMayUseLiveSiblingReposWhenProvided: true;
  };
  historicalFixtureRoots: {
    java: {
      path: typeof JAVA_HISTORICAL_FIXTURE_ROOT;
      exists: boolean;
    };
    miniKv: {
      path: typeof MINI_KV_HISTORICAL_FIXTURE_ROOT;
      exists: boolean;
    };
  };
  upstreamBoundary: {
    java: "recommended-parallel";
    miniKv: "recommended-parallel";
    nodeWaitsForFreshSiblingEvidence: false;
    defaultEvidenceMode: "historical-fixture";
  };
  sourceChainCloseout: {
    profileVersion: string;
    ready: boolean;
    completedNodeVersionCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
  };
  checks: {
    sourceChainCloseoutReady: boolean;
    javaHistoricalFixtureRootPresent: boolean;
    miniKvHistoricalFixtureRootPresent: boolean;
    historicalFixturesAvailable: boolean;
    liveSiblingStartupNotDefaultPrerequisite: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    historicalFixtureRootCount: number;
    presentHistoricalFixtureRootCount: number;
    localLiveSiblingRepoRequiredCount: 0;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout(input: {
  config: AppConfig;
  projectRoot?: string;
}): JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile {
  const projectRoot = input.projectRoot ?? process.cwd();
  const sourceChainCloseout = loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout({
    config: input.config,
    projectRoot,
  });
  const historicalFixtureRoots = {
    java: {
      path: JAVA_HISTORICAL_FIXTURE_ROOT,
      exists: existsRelative(projectRoot, JAVA_HISTORICAL_FIXTURE_ROOT),
    },
    miniKv: {
      path: MINI_KV_HISTORICAL_FIXTURE_ROOT,
      exists: existsRelative(projectRoot, MINI_KV_HISTORICAL_FIXTURE_ROOT),
    },
  } as const;
  const historicalFixturesAvailable = historicalFixtureRoots.java.exists && historicalFixtureRoots.miniKv.exists;
  const sourceChainSummary = {
    profileVersion: sourceChainCloseout.profileVersion,
    ready: sourceChainCloseout.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveChainCloseout,
    completedNodeVersionCount: sourceChainCloseout.summary.completedNodeVersionCount,
    routeCount: sourceChainCloseout.summary.routeCount,
    javaMiniKvDomainRouteCount: sourceChainCloseout.summary.javaMiniKvDomainRouteCount,
    cleanupHandoffRouteGroupRouteCount: sourceChainCloseout.summary.cleanupHandoffRouteGroupRouteCount,
  };
  const checks = createChecks({ historicalFixtureRoots, sourceChainSummary });
  checks.readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup sibling workspace availability closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-sibling-workspace-availability-closeout.v1",
    activeNodeVersion: "Node v556",
    sourceNodeVersion: "Node v555",
    closeoutState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    closeoutOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    siblingWorkspaceMode: {
      localLiveSiblingReposBundledInWorkspace: false,
      liveSiblingStartupRequiredByDefault: false,
      historicalFixturesAvailable,
      nodeMayUseLiveSiblingReposWhenProvided: true,
    },
    historicalFixtureRoots,
    upstreamBoundary: {
      java: "recommended-parallel",
      miniKv: "recommended-parallel",
      nodeWaitsForFreshSiblingEvidence: false,
      defaultEvidenceMode: "historical-fixture",
    },
    sourceChainCloseout: sourceChainSummary,
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      historicalFixtureRootCount: Object.keys(historicalFixtureRoots).length,
      presentHistoricalFixtureRootCount: Object.values(historicalFixtureRoots).filter((root) => root.exists).length,
      localLiveSiblingRepoRequiredCount: 0,
    },
    nextActions: ready
      ? [
        "Use historical fixtures by default for Node-only verification.",
        "Start live Java or mini-kv only when explicit local sibling repositories are provided for a live smoke.",
        "Keep Java and mini-kv progress parallel; Node is not a pre-approval blocker.",
      ]
      : [
        "Restore the Java and mini-kv historical fixture roots before relying on Node-only verification.",
        "Do not require live sibling startup to compensate for missing fixture archives.",
      ],
  };
}

function createChecks(input: {
  historicalFixtureRoots: JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile["historicalFixtureRoots"];
  sourceChainSummary: JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile["sourceChainCloseout"];
}): JavaMiniKvRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseoutProfile["checks"] {
  return {
    sourceChainCloseoutReady: input.sourceChainSummary.ready,
    javaHistoricalFixtureRootPresent: input.historicalFixtureRoots.java.exists,
    miniKvHistoricalFixtureRootPresent: input.historicalFixtureRoots.miniKv.exists,
    historicalFixturesAvailable:
      input.historicalFixtureRoots.java.exists && input.historicalFixtureRoots.miniKv.exists,
    liveSiblingStartupNotDefaultPrerequisite: true,
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupSiblingWorkspaceAvailabilityCloseout: false,
  };
}

function existsRelative(projectRoot: string, relativePath: string): boolean {
  return existsSync(path.join(projectRoot, ...relativePath.split("/")));
}
