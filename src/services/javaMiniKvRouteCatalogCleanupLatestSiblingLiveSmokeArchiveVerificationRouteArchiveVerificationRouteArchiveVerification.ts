import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  fileReference,
  type LatestSiblingLiveSmokeArchiveFileReference,
  numberValue,
  readJsonFile,
  readTextFile,
  stringValue,
  valueAt,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationSupport.js";
import {
  archiveFileDigestsMatchSummary,
  currentLatestSiblingLiveSmokeRouteCatalogCounts,
  routeCatalogCountsCover,
  routeCatalogCountsMatch,
  type LatestSiblingLiveSmokeRouteCatalogCounts,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeRouteArchiveVerifierSupport.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-route-archive-verification";

const ARCHIVE_JSON =
  "e/552/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-v551-http.json";
const ARCHIVE_MARKDOWN =
  "e/552/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-v551-http.md";
const ARCHIVE_SUMMARY =
  "e/552/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-v552-archive-summary.json";
const ARCHIVED_ROUTE_CATALOG_COUNTS = {
  routeCount: 227,
  javaMiniKvDomainRouteCount: 63,
  cleanupHandoffRouteGroupRouteCount: 29,
} as const;
const SOURCE_ROUTE_ARCHIVE_COUNTS = {
  routeCount: 226,
  javaMiniKvDomainRouteCount: 62,
  cleanupHandoffRouteGroupRouteCount: 28,
} as const;

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-route-archive-verification.v1";
  activeNodeVersion: "Node v553";
  sourceNodeVersion: "Node v552";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  credentialValueRead: false;
  rawEndpointUrlParsed: false;
  executionAllowed: false;
  archiveFiles: {
    json: LatestSiblingLiveSmokeArchiveFileReference;
    markdown: LatestSiblingLiveSmokeArchiveFileReference;
    summary: LatestSiblingLiveSmokeArchiveFileReference;
  };
  sourceRouteArchive: {
    statusCodeJson: number;
    statusCodeMarkdown: number;
    ready: boolean;
    archiveVerificationState: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    checkCount: number;
    passedCheckCount: number;
    sourceArchiveRouteCount: number;
    sourceArchiveJavaMiniKvRouteCount: number;
    sourceArchiveCleanupHandoffRouteCount: number;
    archivedRouteCatalogRouteCount: number;
    archivedRouteCatalogJavaMiniKvRouteCount: number;
    archivedRouteCatalogCleanupHandoffRouteCount: number;
  };
  summary: {
    archiveFileCount: number;
    presentArchiveFileCount: number;
    checkCount: number;
    passedCheckCount: number;
    sourceCheckCount: number;
    sourcePassedCheckCount: number;
  };
  checks: {
    archiveFilesPresent: boolean;
    jsonReadable: boolean;
    markdownReadable: boolean;
    summaryReadable: boolean;
    summaryDigestsMatchFiles: boolean;
    jsonProfileVersionValid: boolean;
    sourceVersionsMatch: boolean;
    sourceRouteStatusCodesPassed: boolean;
    sourceVerifierReady: boolean;
    sourceVerifierChecksAllPassed: boolean;
    sourceArchiveCountsMatchV548Baseline: boolean;
    archivedRouteCatalogCountsMatchV552Baseline: boolean;
    currentRouteCatalogCoversArchivedRouteCatalog: boolean;
    markdownRecordsRouteArchiveVerification: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile {
  void input.config;
  const projectRoot = input.projectRoot ?? process.cwd();
  const archiveFiles = {
    json: fileReference(projectRoot, ARCHIVE_JSON),
    markdown: fileReference(projectRoot, ARCHIVE_MARKDOWN),
    summary: fileReference(projectRoot, ARCHIVE_SUMMARY),
  };
  const json = readJsonFile(projectRoot, ARCHIVE_JSON);
  const markdown = readTextFile(projectRoot, ARCHIVE_MARKDOWN);
  const summaryJson = readJsonFile(projectRoot, ARCHIVE_SUMMARY);
  const sourceRouteArchive = createSourceRouteArchive(json, summaryJson);
  const checks = createChecks({ archiveFiles, json, markdown, summaryJson, sourceRouteArchive });
  checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key
        !== "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification")
      .every(([, value]) => value);
  const ready =
    checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification;

  return {
    service: "orderops-node",
    title:
      "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification route archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion:
      "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification-route-archive-verification.v1",
    activeNodeVersion: "Node v553",
    sourceNodeVersion: "Node v552",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification:
      ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveVerificationOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    archiveFiles,
    sourceRouteArchive,
    summary: {
      archiveFileCount: Object.keys(archiveFiles).length,
      presentArchiveFileCount: Object.values(archiveFiles).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceRouteArchive.checkCount,
      sourcePassedCheckCount: sourceRouteArchive.passedCheckCount,
    },
    checks,
    nextActions: ready
      ? [
        "Expose this route archive verification only if a later public route needs to consume it.",
        "Keep Java and mini-kv parallel; no fresh sibling evidence is required for this archive verifier.",
      ]
      : [
        "Repair the v552 route archive files before exposing or consuming this verifier.",
        "Do not start Java or mini-kv; this verifier only reads Node archive files.",
      ],
  };
}

function createSourceRouteArchive(
  json: Record<string, unknown> | null,
  summaryJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"] {
  return {
    statusCodeJson: numberValue(valueAt(summaryJson, "statusCodes", "json")),
    statusCodeMarkdown: numberValue(valueAt(summaryJson, "statusCodes", "markdown")),
    ready: valueAt(summaryJson, "ready") === true,
    archiveVerificationState: stringValue(valueAt(summaryJson, "archiveVerificationState")),
    activeNodeVersion: stringValue(valueAt(summaryJson, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(summaryJson, "sourceNodeVersion")),
    checkCount: numberValue(valueAt(summaryJson, "checkCount")),
    passedCheckCount: numberValue(valueAt(summaryJson, "passedCheckCount")),
    sourceArchiveRouteCount: numberValue(valueAt(json, "sourceRouteArchive", "routeCount")),
    sourceArchiveJavaMiniKvRouteCount:
      numberValue(valueAt(json, "sourceRouteArchive", "javaMiniKvDomainRouteCount")),
    sourceArchiveCleanupHandoffRouteCount:
      numberValue(valueAt(json, "sourceRouteArchive", "cleanupHandoffRouteGroupRouteCount")),
    archivedRouteCatalogRouteCount: numberValue(valueAt(summaryJson, "routeCatalog", "routeCount")),
    archivedRouteCatalogJavaMiniKvRouteCount:
      numberValue(valueAt(summaryJson, "routeCatalog", "javaMiniKvDomainRouteCount")),
    archivedRouteCatalogCleanupHandoffRouteCount:
      numberValue(valueAt(summaryJson, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceRouteArchive: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["checks"] {
  return {
    archiveFilesPresent: Object.values(input.archiveFiles).every((file) => file.exists),
    jsonReadable: input.json !== null,
    markdownReadable: input.markdown.length > 0,
    summaryReadable: input.summaryJson !== null,
    summaryDigestsMatchFiles:
      archiveFileDigestsMatchSummary(input.archiveFiles, input.summaryJson),
    jsonProfileVersionValid:
      valueAt(input.json, "profileVersion")
      === "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1",
    sourceVersionsMatch:
      input.sourceRouteArchive.activeNodeVersion === "Node v549"
      && input.sourceRouteArchive.sourceNodeVersion === "Node v548"
      && valueAt(input.json, "activeNodeVersion") === "Node v549"
      && valueAt(input.json, "sourceNodeVersion") === "Node v548",
    sourceRouteStatusCodesPassed:
      input.sourceRouteArchive.statusCodeJson === 200
      && input.sourceRouteArchive.statusCodeMarkdown === 200,
    sourceVerifierReady:
      input.sourceRouteArchive.ready
      && input.sourceRouteArchive.archiveVerificationState === "ready"
      && valueAt(input.json, "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification")
        === true,
    sourceVerifierChecksAllPassed:
      input.sourceRouteArchive.checkCount === 18
      && input.sourceRouteArchive.checkCount === input.sourceRouteArchive.passedCheckCount,
    sourceArchiveCountsMatchV548Baseline:
      routeCatalogCountsMatch(sourceArchiveCounts(input.sourceRouteArchive), SOURCE_ROUTE_ARCHIVE_COUNTS),
    archivedRouteCatalogCountsMatchV552Baseline:
      routeCatalogCountsMatch(archivedRouteCatalogCounts(input.sourceRouteArchive), ARCHIVED_ROUTE_CATALOG_COUNTS),
    currentRouteCatalogCoversArchivedRouteCatalog:
      routeCatalogCountsCover(
        currentLatestSiblingLiveSmokeRouteCatalogCounts(),
        archivedRouteCatalogCounts(input.sourceRouteArchive),
      ),
    markdownRecordsRouteArchiveVerification:
      input.markdown.includes(
        "# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification",
      )
      && input.markdown.includes("summaryRouteCatalogCountsMatchSourceArchive: true")
      && input.markdown.includes("currentRouteCatalogCoversSourceArchive: true"),
    noRuntimeAuthorityOpened:
      valueAt(input.json, "archiveVerificationOnly") === true
      && valueAt(input.json, "startsJavaService") === false
      && valueAt(input.json, "startsMiniKvService") === false
      && valueAt(input.json, "mutatesJavaState") === false
      && valueAt(input.json, "mutatesMiniKvState") === false
      && valueAt(input.json, "connectsManagedAudit") === false
      && valueAt(input.json, "credentialValueRead") === false
      && valueAt(input.json, "rawEndpointUrlParsed") === false
      && valueAt(input.json, "executionAllowed") === false,
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerification:
      false,
  };
}

function sourceArchiveCounts(
  sourceRouteArchive: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"],
): LatestSiblingLiveSmokeRouteCatalogCounts {
  return {
    routeCount: sourceRouteArchive.sourceArchiveRouteCount,
    javaMiniKvDomainRouteCount: sourceRouteArchive.sourceArchiveJavaMiniKvRouteCount,
    cleanupHandoffRouteGroupRouteCount: sourceRouteArchive.sourceArchiveCleanupHandoffRouteCount,
  };
}

function archivedRouteCatalogCounts(
  sourceRouteArchive: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"],
): LatestSiblingLiveSmokeRouteCatalogCounts {
  return {
    routeCount: sourceRouteArchive.archivedRouteCatalogRouteCount,
    javaMiniKvDomainRouteCount: sourceRouteArchive.archivedRouteCatalogJavaMiniKvRouteCount,
    cleanupHandoffRouteGroupRouteCount: sourceRouteArchive.archivedRouteCatalogCleanupHandoffRouteCount,
  };
}
