import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification.js";

const ARCHIVE_SUMMARY =
  "e/514/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout-v514-archive-summary.json";
const ROUTE_FILE = "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts";

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v517";
  sourceNodeVersion: "Node v516";
  readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: boolean;
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
  closedVersions: readonly ["v512", "v513", "v514", "v515", "v516"];
  routeCatalog: {
    groupCount: 50;
    routeCount: 215;
    javaMiniKvDomainRouteCount: 51;
    cleanupHandoffRouteGroupRouteCount: 17;
  };
  sourceArchive: {
    version: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
    executionAllowed: boolean;
  };
  archiveVerification: {
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
  };
  checks: {
    currentCatalogCountsReady: boolean;
    currentJavaMiniKvRouteCountReady: boolean;
    cleanupRouteGroupCountReady: boolean;
    sourceArchiveReady: boolean;
    sourceArchiveChecksPassed: boolean;
    archiveVerifierReady: boolean;
    verifierRouteRegistered: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: boolean;
  };
  summary: {
    closedVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 215;
    javaMiniKvDomainRouteCount: 51;
    cleanupHandoffRouteGroupRouteCount: 17;
    sourceArchiveCheckCount: number;
    sourceArchivePassedCheckCount: number;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const sourceArchive = createSourceArchive(readJsonFile(projectRoot, ARCHIVE_SUMMARY));
  const routeFile = readTextFile(projectRoot, ROUTE_FILE);
  const archiveVerifier =
    loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const archiveVerification = {
    ready: archiveVerifier.readyForRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification,
    checkCount: archiveVerifier.summary.checkCount,
    passedCheckCount: archiveVerifier.summary.passedCheckCount,
    activeNodeVersion: archiveVerifier.activeNodeVersion,
    sourceNodeVersion: archiveVerifier.sourceNodeVersion,
  };
  const checks = createChecks({ sourceArchive, archiveVerification, routeFile });
  checks.readyForRouteCatalogCleanupFreshBaselineStabilityCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupFreshBaselineStabilityCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupFreshBaselineStabilityCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup fresh baseline stability closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v517",
    sourceNodeVersion: "Node v516",
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: ready,
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
    closedVersions: ["v512", "v513", "v514", "v515", "v516"],
    routeCatalog: {
      groupCount: 50,
      routeCount: 215,
      javaMiniKvDomainRouteCount: 51,
      cleanupHandoffRouteGroupRouteCount: 17,
    },
    sourceArchive,
    archiveVerification,
    checks,
    summary: {
      closedVersionCount: 5,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 215,
      javaMiniKvDomainRouteCount: 51,
      cleanupHandoffRouteGroupRouteCount: 17,
      sourceArchiveCheckCount: sourceArchive.checkCount,
      sourceArchivePassedCheckCount: sourceArchive.passedCheckCount,
    },
    nextActions: ready
      ? [
        "Expose this stability closeout as a JSON/Markdown route in Node v518.",
        "Archive and verify the stability closeout once before the final closeout segment.",
      ]
      : [
        "Repair the live catalog or v514/v515 archive-verifier chain before exposing stability closeout.",
        "Keep Java and mini-kv parallel; do not request fresh sibling evidence for this closeout.",
      ],
  };
}

function createSourceArchive(json: Record<string, unknown> | null):
  JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout["sourceArchive"] {
  const routeCatalog = objectField(json, "routeCatalog");
  const boundaries = objectField(json, "boundaries");
  return {
    version: stringValue(valueAt(json, "version")),
    ready: valueAt(json, "ready") === true,
    checkCount: numberValue(valueAt(json, "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "passedCheckCount")),
    routeCount: numberValue(valueAt(routeCatalog, "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(routeCatalog, "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount: numberValue(valueAt(routeCatalog, "cleanupHandoffRouteGroupRouteCount")),
    executionAllowed: valueAt(boundaries, "executionAllowed") === true,
  };
}

function createChecks(input: {
  sourceArchive: JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout["sourceArchive"];
  archiveVerification: JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout["archiveVerification"];
  routeFile: string;
}): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseout["checks"] {
  return {
    currentCatalogCountsReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.groupCount === 50
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount === 215,
    currentJavaMiniKvRouteCountReady:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"] === 51,
    cleanupRouteGroupCountReady:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    sourceArchiveReady:
      input.sourceArchive.version === "v514"
      && input.sourceArchive.ready
      && input.sourceArchive.routeCount === 213
      && input.sourceArchive.javaMiniKvDomainRouteCount === 49
      && input.sourceArchive.cleanupHandoffRouteGroupRouteCount === 15,
    sourceArchiveChecksPassed:
      input.sourceArchive.checkCount === 14
      && input.sourceArchive.checkCount === input.sourceArchive.passedCheckCount,
    archiveVerifierReady:
      input.archiveVerification.ready
      && input.archiveVerification.checkCount === input.archiveVerification.passedCheckCount
      && input.archiveVerification.activeNodeVersion === "Node v515"
      && input.archiveVerification.sourceNodeVersion === "Node v514",
    verifierRouteRegistered:
      input.routeFile.includes("loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification")
      && input.routeFile.includes("renderJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerificationMarkdown"),
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened: !input.sourceArchive.executionAllowed,
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseout: false,
  };
}

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(projectRoot, relativePath);
  if (text.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(text) as unknown;
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function objectField(source: Record<string, unknown> | null, key: string): Record<string, unknown> {
  const value = source?.[key];
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
