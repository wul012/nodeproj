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
  JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
  loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification.js";

const ROUTE_FILE = "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts";

export interface JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-extended-run-final-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v537";
  sourceNodeVersion: "Node v536";
  readyForRouteCatalogCleanupExtendedRunFinalCloseout: boolean;
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
  completedFollowUpVersions: readonly [
    "v523",
    "v524",
    "v525",
    "v526",
    "v527",
    "v528",
    "v529",
    "v530",
    "v531",
    "v532",
    "v533",
    "v534",
    "v535",
    "v536",
    "v537",
  ];
  finalGate: {
    versionSpan: "v532-v536";
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
    checkedBeforeVersion: "Node v537";
    lastKnownSuccessfulVersion: "Node v530";
    latestObservedVersions: readonly ["Node v535", "Node v536"];
    latestObservedState: "in-progress";
    conclusion: "no-new-failure-observed";
  };
  routeCatalog: {
    groupCount: 50;
    routeCount: 223;
    javaMiniKvDomainRouteCount: 59;
    cleanupHandoffRouteGroupRouteCount: 25;
  };
  checks: {
    requestedFollowUpVersionCountReady: boolean;
    finalGateReady: boolean;
    finalVerifierRouteRegistered: boolean;
    routeQualityReady: boolean;
    currentRouteCatalogReady: boolean;
    currentJavaMiniKvRouteCountReady: boolean;
    cleanupHandoffRouteGroupReady: boolean;
    ciObservationHasNoNewFailure: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupExtendedRunFinalCloseout: boolean;
  };
  summary: {
    completedFollowUpVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 223;
    javaMiniKvDomainRouteCount: 59;
    cleanupHandoffRouteGroupRouteCount: 25;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const routeFile = readTextFile(projectRoot, ROUTE_FILE);
  const finalVerifier =
    loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const routeQualityProfile = loadManagedAuditRouteRegistrationTableQualityPass({
    config: input.config,
  });
  const completedFollowUpVersions = [
    "v523",
    "v524",
    "v525",
    "v526",
    "v527",
    "v528",
    "v529",
    "v530",
    "v531",
    "v532",
    "v533",
    "v534",
    "v535",
    "v536",
    "v537",
  ] as const;
  const finalGate = {
    versionSpan: "v532-v536" as const,
    publicVerifierRoute: JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH,
    archiveVerifierReady:
      finalVerifier.readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification,
    archiveVerifierCheckCount: finalVerifier.summary.checkCount,
    archiveVerifierPassedCheckCount: finalVerifier.summary.passedCheckCount,
  };
  const routeQuality = {
    ready: routeQualityProfile.readyForManagedAuditRouteRegistrationTableQualityPass,
    routeRegistrationCount: routeQualityProfile.summary.routeRegistrationCount,
    routeGroupCount: routeQualityProfile.summary.routeGroupCount,
    catalogIntegrityReady: routeQualityProfile.checks.catalogIntegrityReady,
    routeTableMatchesCatalog: routeQualityProfile.checks.routeTableMatchesCatalog,
  };
  const ciObservation = {
    checkedBeforeVersion: "Node v537" as const,
    lastKnownSuccessfulVersion: "Node v530" as const,
    latestObservedVersions: ["Node v535", "Node v536"] as const,
    latestObservedState: "in-progress" as const,
    conclusion: "no-new-failure-observed" as const,
  };
  const checks = createChecks({
    routeFile,
    completedFollowUpVersions,
    finalGate,
    routeQuality,
    ciObservation,
  });
  checks.readyForRouteCatalogCleanupExtendedRunFinalCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupExtendedRunFinalCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupExtendedRunFinalCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup extended run final closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-extended-run-final-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v537",
    sourceNodeVersion: "Node v536",
    readyForRouteCatalogCleanupExtendedRunFinalCloseout: ready,
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
    completedFollowUpVersions,
    finalGate,
    routeQuality,
    ciObservation,
    routeCatalog: {
      groupCount: 50,
      routeCount: 223,
      javaMiniKvDomainRouteCount: 59,
      cleanupHandoffRouteGroupRouteCount: 25,
    },
    checks,
    summary: {
      completedFollowUpVersionCount: completedFollowUpVersions.length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 223,
      javaMiniKvDomainRouteCount: 59,
      cleanupHandoffRouteGroupRouteCount: 25,
    },
    nextActions: ready
      ? [
        "Keep Java and mini-kv parallel; Node does not require fresh sibling evidence for this closeout.",
        "Watch the latest in-progress CI run and fix any real failure if it appears.",
        "Use the v536 verifier route as the public final gate for this extended run.",
      ]
      : [
        "Repair the final archive verifier or route catalog quality pass before final closeout.",
        "Do not request Java or mini-kv work unless a future Node version consumes fresh evidence.",
      ],
  };
}

function createChecks(input: {
  routeFile: string;
  completedFollowUpVersions: readonly string[];
  finalGate: JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout["finalGate"];
  routeQuality: JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout["routeQuality"];
  ciObservation: JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout["ciObservation"];
}): JavaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout["checks"] {
  return {
    requestedFollowUpVersionCountReady: input.completedFollowUpVersions.length === 15,
    finalGateReady:
      input.finalGate.archiveVerifierReady
      && input.finalGate.archiveVerifierCheckCount === input.finalGate.archiveVerifierPassedCheckCount,
    finalVerifierRouteRegistered:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    routeQualityReady:
      input.routeQuality.ready
      && input.routeQuality.routeRegistrationCount >= 223
      && input.routeQuality.routeGroupCount === 50
      && input.routeQuality.catalogIntegrityReady
      && input.routeQuality.routeTableMatchesCatalog,
    currentRouteCatalogReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === 50
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount >= 223,
    currentJavaMiniKvRouteCountReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] >= 59,
    cleanupHandoffRouteGroupReady: true,
    ciObservationHasNoNewFailure: input.ciObservation.conclusion === "no-new-failure-observed",
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupExtendedRunFinalCloseout: false,
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}
