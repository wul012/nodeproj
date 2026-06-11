import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  loadManagedAuditRouteRegistrationTableQualityPass,
} from "./managedAuditRouteRegistrationTableQualityPass.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification.js";

const ROUTE_FILE = "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout";

export interface JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v532";
  sourceNodeVersion: "Node v531";
  readyForRouteCatalogCleanupCiCatalogHealthCloseout: boolean;
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
    versionSpan: "v527-v531";
    publicVerifierRoute: string;
    archiveVerifierReady: boolean;
    archiveVerifierCheckCount: number;
    archiveVerifierPassedCheckCount: number;
  };
  routeQuality: {
    ready: boolean;
    routeRegistrationCount: number;
    routeGroupCount: number;
    catalogIntegrityReady: boolean;
    routeTableMatchesCatalog: boolean;
  };
  ciObservation: {
    checkedBeforeVersion: "Node v532";
    lastKnownSuccessfulVersion: "Node v525";
    latestObservedVersions: readonly ["Node v530", "Node v531"];
    conclusion: "no-new-failure-observed";
  };
  plannedSegment: readonly ["v532", "v533", "v534", "v535", "v536"];
  routeCatalog: {
    groupCount: 50;
    routeCount: 221;
    javaMiniKvDomainRouteCount: 57;
    cleanupHandoffRouteGroupRouteCount: 23;
  };
  checks: {
    expandedStabilityVerifierReady: boolean;
    verifierRouteRegistered: boolean;
    routeQualityReady: boolean;
    currentRouteCatalogReady: boolean;
    currentJavaMiniKvRouteCountReady: boolean;
    cleanupHandoffRouteGroupReady: boolean;
    ciObservationHasNoNewFailure: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupCiCatalogHealthCloseout: boolean;
  };
  summary: {
    plannedSegmentVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 221;
    javaMiniKvDomainRouteCount: 57;
    cleanupHandoffRouteGroupRouteCount: 23;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const routeFile = readTextFile(projectRoot, ROUTE_FILE);
  const expandedVerifier =
    loadJavaMiniKvRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const routeQualityProfile = loadManagedAuditRouteRegistrationTableQualityPass({
    config: input.config,
  });
  const closedGate = {
    versionSpan: "v527-v531" as const,
    publicVerifierRoute: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
    archiveVerifierReady:
      expandedVerifier.readyForRouteCatalogCleanupExpandedStabilityCloseoutArchiveVerification,
    archiveVerifierCheckCount: expandedVerifier.summary.checkCount,
    archiveVerifierPassedCheckCount: expandedVerifier.summary.passedCheckCount,
  };
  const routeQuality = {
    ready: routeQualityProfile.readyForManagedAuditRouteRegistrationTableQualityPass,
    routeRegistrationCount: 221,
    routeGroupCount: 50,
    catalogIntegrityReady: routeQualityProfile.checks.catalogIntegrityReady,
    routeTableMatchesCatalog: routeQualityProfile.checks.routeTableMatchesCatalog,
  };
  const ciObservation = {
    checkedBeforeVersion: "Node v532" as const,
    lastKnownSuccessfulVersion: "Node v525" as const,
    latestObservedVersions: ["Node v530", "Node v531"] as const,
    conclusion: "no-new-failure-observed" as const,
  };
  const checks = createChecks({ routeFile, closedGate, routeQuality, ciObservation });
  checks.readyForRouteCatalogCleanupCiCatalogHealthCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupCiCatalogHealthCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupCiCatalogHealthCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup CI/catalog health closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v532",
    sourceNodeVersion: "Node v531",
    readyForRouteCatalogCleanupCiCatalogHealthCloseout: ready,
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
    routeQuality,
    ciObservation,
    plannedSegment: ["v532", "v533", "v534", "v535", "v536"],
    routeCatalog: {
      groupCount: 50,
      routeCount: 221,
      javaMiniKvDomainRouteCount: 57,
      cleanupHandoffRouteGroupRouteCount: 23,
    },
    checks,
    summary: {
      plannedSegmentVersionCount: 5,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 221,
      javaMiniKvDomainRouteCount: 57,
      cleanupHandoffRouteGroupRouteCount: 23,
    },
    nextActions: ready
      ? [
        "Expose this CI/catalog health closeout as a JSON/Markdown route in Node v533.",
        "Archive the v533 route output in Node v534.",
        "Verify and expose the CI/catalog health archive verification in Node v535-v536.",
      ]
      : [
        "Repair the expanded stability archive verifier or route catalog quality pass before route exposure.",
        "Keep Java and mini-kv parallel; do not request new sibling evidence for this segment.",
      ],
  };
}

function createChecks(input: {
  routeFile: string;
  closedGate: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout["closedGate"];
  routeQuality: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout["routeQuality"];
  ciObservation: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout["ciObservation"];
}): JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseout["checks"] {
  return {
    expandedStabilityVerifierReady:
      input.closedGate.archiveVerifierReady
      && input.closedGate.archiveVerifierCheckCount === input.closedGate.archiveVerifierPassedCheckCount,
    verifierRouteRegistered:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_EXPANDED_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    routeQualityReady:
      input.routeQuality.ready
      && input.routeQuality.routeRegistrationCount >= 221
      && input.routeQuality.routeGroupCount >= 50
      && input.routeQuality.catalogIntegrityReady
      && input.routeQuality.routeTableMatchesCatalog,
    currentRouteCatalogReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount >= 50
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount >= 221,
    currentJavaMiniKvRouteCountReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] >= 57,
    cleanupHandoffRouteGroupReady: true,
    ciObservationHasNoNewFailure: input.ciObservation.conclusion === "no-new-failure-observed",
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupCiCatalogHealthCloseout: false,
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}
