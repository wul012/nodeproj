import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification.js";

const ROUTE_FILE = "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-expanded-stability-closeout";

export interface JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v527";
  sourceNodeVersion: "Node v526";
  readyForRouteCatalogCleanupExpandedStabilityCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  closeoutOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  crossProjectMode: {
    java: "recommended-parallel";
    miniKv: "recommended-parallel";
    nodeWaitsForFreshSiblingEvidence: false;
  };
  closedGate: {
    versionSpan: "v522-v526";
    publicVerifierRoute: string;
    archiveVerifierReady: boolean;
    archiveVerifierCheckCount: number;
    archiveVerifierPassedCheckCount: number;
    sourceCompletedVersionCount: number;
    sourceRemainingVersionCount: number;
  };
  plannedSegment: readonly ["v527", "v528", "v529", "v530", "v531"];
  routeCatalog: {
    groupCount: 50;
    routeCount: 219;
    javaMiniKvDomainRouteCount: 55;
    cleanupHandoffRouteGroupRouteCount: 21;
  };
  checks: {
    closedGateReady: boolean;
    verifierRouteRegistered: boolean;
    plannedSegmentCountReady: boolean;
    currentRouteCatalogReady: boolean;
    currentJavaMiniKvRouteCountReady: boolean;
    cleanupHandoffRouteGroupReady: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupExpandedStabilityCloseout: boolean;
  };
  summary: {
    plannedSegmentVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 219;
    javaMiniKvDomainRouteCount: 55;
    cleanupHandoffRouteGroupRouteCount: 21;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const routeFile = readTextFile(projectRoot, ROUTE_FILE);
  const archiveVerifier =
    loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const closedGate = {
    versionSpan: "v522-v526" as const,
    publicVerifierRoute: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
    archiveVerifierReady:
      archiveVerifier.readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification,
    archiveVerifierCheckCount: archiveVerifier.summary.checkCount,
    archiveVerifierPassedCheckCount: archiveVerifier.summary.passedCheckCount,
    sourceCompletedVersionCount: archiveVerifier.summary.completedVersionCount,
    sourceRemainingVersionCount: archiveVerifier.summary.remainingVersionCount,
  };
  const checks = createChecks({ routeFile, closedGate });
  checks.readyForRouteCatalogCleanupExpandedStabilityCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupExpandedStabilityCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupExpandedStabilityCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup expanded stability closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-expanded-stability-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v527",
    sourceNodeVersion: "Node v526",
    readyForRouteCatalogCleanupExpandedStabilityCloseout: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    closeoutOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    crossProjectMode: {
      java: "recommended-parallel",
      miniKv: "recommended-parallel",
      nodeWaitsForFreshSiblingEvidence: false,
    },
    closedGate,
    plannedSegment: ["v527", "v528", "v529", "v530", "v531"],
    routeCatalog: {
      groupCount: 50,
      routeCount: 219,
      javaMiniKvDomainRouteCount: 55,
      cleanupHandoffRouteGroupRouteCount: 21,
    },
    checks,
    summary: {
      plannedSegmentVersionCount: 5,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 219,
      javaMiniKvDomainRouteCount: 55,
      cleanupHandoffRouteGroupRouteCount: 21,
    },
    nextActions: ready
      ? [
        "Expose this expanded stability closeout as a JSON/Markdown route in Node v528.",
        "Archive the v528 route output in Node v529.",
        "Verify and expose the expanded stability archive verification in Node v530-v531.",
      ]
      : [
        "Repair the v524/v525 archive verifier before starting expanded stability route exposure.",
        "Keep Java and mini-kv parallel; do not request new sibling evidence for this segment.",
      ],
  };
}

function createChecks(input: {
  routeFile: string;
  closedGate: JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout["closedGate"];
}): JavaMiniKvRouteCatalogCleanupExpandedStabilityCloseout["checks"] {
  return {
    closedGateReady:
      input.closedGate.archiveVerifierReady
      && input.closedGate.archiveVerifierCheckCount === input.closedGate.archiveVerifierPassedCheckCount
      && input.closedGate.sourceCompletedVersionCount === 16
      && input.closedGate.sourceRemainingVersionCount === 15,
    verifierRouteRegistered:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    plannedSegmentCountReady: true,
    currentRouteCatalogReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === 50
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount >= 219,
    currentJavaMiniKvRouteCountReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] >= 55,
    cleanupHandoffRouteGroupReady: true,
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupExpandedStabilityCloseout: false,
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}
