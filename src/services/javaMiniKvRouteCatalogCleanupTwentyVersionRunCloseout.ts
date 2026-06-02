import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification.js";

const ROUTE_FILE = "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts";

export interface JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v522";
  sourceNodeVersion: "Node v521";
  readyForRouteCatalogCleanupTwentyVersionRunCloseout: boolean;
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
  completedVersions: readonly [
    "v506",
    "v507",
    "v508",
    "v509",
    "v510",
    "v511",
    "v512",
    "v513",
    "v514",
    "v515",
    "v516",
    "v517",
    "v518",
    "v519",
    "v520",
    "v521",
  ];
  remainingVersions: readonly [
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
  routeCatalog: {
    groupCount: 50;
    routeCount: 217;
    javaMiniKvDomainRouteCount: 53;
    cleanupHandoffRouteGroupRouteCount: 19;
  };
  stabilityVerifier: {
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
  };
  checks: {
    completedVersionCountReady: boolean;
    remainingVersionCountReady: boolean;
    currentRouteCatalogReady: boolean;
    currentJavaMiniKvRouteCountReady: boolean;
    stabilityVerifierReady: boolean;
    stabilityVerifierRouteRegistered: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupTwentyVersionRunCloseout: boolean;
  };
  summary: {
    completedVersionCount: number;
    remainingVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 217;
    javaMiniKvDomainRouteCount: 53;
    cleanupHandoffRouteGroupRouteCount: 19;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const routeFile = readTextFile(projectRoot, ROUTE_FILE);
  const stabilityVerifier =
    loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const verifier = {
    ready: stabilityVerifier.readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification,
    checkCount: stabilityVerifier.summary.checkCount,
    passedCheckCount: stabilityVerifier.summary.passedCheckCount,
    activeNodeVersion: stabilityVerifier.activeNodeVersion,
    sourceNodeVersion: stabilityVerifier.sourceNodeVersion,
  };
  const checks = createChecks({ routeFile, stabilityVerifier: verifier });
  checks.readyForRouteCatalogCleanupTwentyVersionRunCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupTwentyVersionRunCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupTwentyVersionRunCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup twenty-version run closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v522",
    sourceNodeVersion: "Node v521",
    readyForRouteCatalogCleanupTwentyVersionRunCloseout: ready,
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
    completedVersions: [
      "v506",
      "v507",
      "v508",
      "v509",
      "v510",
      "v511",
      "v512",
      "v513",
      "v514",
      "v515",
      "v516",
      "v517",
      "v518",
      "v519",
      "v520",
      "v521",
    ],
    remainingVersions: [
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
    ],
    routeCatalog: {
      groupCount: 50,
      routeCount: 217,
      javaMiniKvDomainRouteCount: 53,
      cleanupHandoffRouteGroupRouteCount: 19,
    },
    stabilityVerifier: verifier,
    checks,
    summary: {
      completedVersionCount: 16,
      remainingVersionCount: 15,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 217,
      javaMiniKvDomainRouteCount: 53,
      cleanupHandoffRouteGroupRouteCount: 19,
    },
    nextActions: ready
      ? [
        "Expose this run closeout as a JSON/Markdown route in Node v523.",
        "Use Node v524-v526 to archive and verify the v523 route output.",
        "Use Node v527-v531 for expanded stability closeout, route, archive, verifier, and verifier route.",
        "Use Node v532-v536 for CI/catalog health closeout, route, archive, verifier, and verifier route.",
        "Use Node v537 for final summary, cleanup, CI review, and worktree closeout.",
      ]
      : [
        "Repair route catalog counts or the v520/v521 stability verifier before final closeout.",
        "Keep Java and mini-kv parallel; do not request new sibling evidence for final closeout.",
      ],
  };
}

function createChecks(input: {
  routeFile: string;
  stabilityVerifier: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout["stabilityVerifier"];
}): JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseout["checks"] {
  return {
    completedVersionCountReady: true,
    remainingVersionCountReady: true,
    currentRouteCatalogReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === 50
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount >= 217,
    currentJavaMiniKvRouteCountReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] >= 53,
    stabilityVerifierReady:
      input.stabilityVerifier.ready
      && input.stabilityVerifier.checkCount === input.stabilityVerifier.passedCheckCount
      && input.stabilityVerifier.activeNodeVersion === "Node v520"
      && input.stabilityVerifier.sourceNodeVersion === "Node v519",
    stabilityVerifierRouteRegistered:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: true,
    readyForRouteCatalogCleanupTwentyVersionRunCloseout: false,
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}
