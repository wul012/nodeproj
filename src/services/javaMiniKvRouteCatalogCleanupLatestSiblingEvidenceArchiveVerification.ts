import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification";

const ARCHIVE_JSON =
  "e/541/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-v540-http.json";
const ARCHIVE_MARKDOWN =
  "e/541/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-v540-http.md";
const ARCHIVE_SUMMARY =
  "e/541/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report-v541-archive-summary.json";

export interface LatestSiblingEvidenceArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification.v1";
  activeNodeVersion: "Node v542";
  sourceNodeVersion: "Node v541";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  connectsManagedAudit: false;
  executionAllowed: false;
  archiveFiles: {
    json: LatestSiblingEvidenceArchiveFileReference;
    markdown: LatestSiblingEvidenceArchiveFileReference;
    summary: LatestSiblingEvidenceArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ciStabilizationVersion: string;
    ready: boolean;
    reportState: string;
    checkCount: number;
    passedCheckCount: number;
    javaLatestCleanVersion: string;
    miniKvLatestCleanVersion: string;
    miniKvEvidenceDigest: string;
    executionAllowed: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
    mutatesJavaState: boolean;
    mutatesMiniKvState: boolean;
    connectsManagedAudit: boolean;
  };
  routeCatalog: {
    groupCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
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
    jsonSourceVersionsMatch: boolean;
    jsonReportReady: boolean;
    jsonChecksAllPassed: boolean;
    jsonLatestEvidenceVersionsMatch: boolean;
    markdownRecordsLatestSiblingReport: boolean;
    markdownRecordsJavaAndMiniKvEvidence: boolean;
    summaryMatchesJson: boolean;
    routeCatalogCountsMatchArchive: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartupOrMutation: boolean;
    readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile {
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
  const sourceReport = createSourceReport(json);
  const routeCatalog = createRouteCatalog(summaryJson);
  const checks = createChecks({ archiveFiles, json, markdown, summaryJson, sourceReport, routeCatalog });
  checks.readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-archive-verification.v1",
    activeNodeVersion: "Node v542",
    sourceNodeVersion: "Node v541",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveVerificationOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    archiveFiles,
    sourceReport,
    routeCatalog,
    summary: {
      archiveFileCount: Object.keys(archiveFiles).length,
      presentArchiveFileCount: Object.values(archiveFiles).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceReport.checkCount,
      sourcePassedCheckCount: sourceReport.passedCheckCount,
    },
    checks,
    nextActions: ready
      ? [
        "Expose this archive verification through the cleanup route group in Node v543.",
        "Plan live Java/mini-kv smoke separately with explicit owner, ports, startup commands, and cleanup proof.",
      ]
      : [
        "Repair v541 archive files before exposing archive verification.",
        "Do not regenerate the archive from a later rolling sibling fixture.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ciStabilizationVersion: stringValue(valueAt(json, "ciStabilizationVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupLatestSiblingEvidenceReport") === true,
    reportState: stringValue(valueAt(json, "reportState")),
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    javaLatestCleanVersion: stringValue(valueAt(json, "summary", "javaLatestCleanVersion")),
    miniKvLatestCleanVersion: stringValue(valueAt(json, "summary", "miniKvLatestCleanVersion")),
    miniKvEvidenceDigest: stringValue(valueAt(json, "summary", "miniKvEvidenceDigest")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
    mutatesJavaState: valueAt(json, "mutatesJavaState") === true,
    mutatesMiniKvState: valueAt(json, "mutatesMiniKvState") === true,
    connectsManagedAudit: valueAt(json, "connectsManagedAudit") === true,
  };
}

function createRouteCatalog(
  summaryJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["routeCatalog"] {
  return {
    groupCount: numberValue(valueAt(summaryJson, "routeCatalog", "groupCount")),
    routeCount: numberValue(valueAt(summaryJson, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(summaryJson, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(summaryJson, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["sourceReport"];
  routeCatalog: JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["routeCatalog"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingEvidenceArchiveVerificationProfile["checks"] {
  const summaryFiles = objectField(input.summaryJson, "files");
  const summaryJsonFile = objectField(summaryFiles, "json");
  const summaryMarkdownFile = objectField(summaryFiles, "markdown");

  return {
    archiveFilesPresent: Object.values(input.archiveFiles).every((file) => file.exists),
    jsonReadable: input.json !== null,
    markdownReadable: input.markdown.length > 0,
    summaryReadable: input.summaryJson !== null,
    summaryDigestsMatchFiles:
      stringValue(valueAt(summaryJsonFile, "sha256")) === input.archiveFiles.json.sha256
      && stringValue(valueAt(summaryMarkdownFile, "sha256")) === input.archiveFiles.markdown.sha256,
    jsonProfileVersionValid:
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-latest-sibling-evidence-report.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v540"
      && input.sourceReport.sourceNodeVersion === "Node v538"
      && input.sourceReport.ciStabilizationVersion === "Node v539",
    jsonReportReady:
      input.sourceReport.ready
      && input.sourceReport.reportState === "ready",
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 13
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonLatestEvidenceVersionsMatch:
      input.sourceReport.javaLatestCleanVersion === "Java v274"
      && input.sourceReport.miniKvLatestCleanVersion === "v247"
      && input.sourceReport.miniKvEvidenceDigest === "fnv1a64:9fb71e13c517fff8"
      && JSON.stringify(valueAt(input.json, "evidence", "javaReceipt")).includes("Java v274")
      && JSON.stringify(valueAt(input.json, "evidence", "miniKvRelease")).includes("v247"),
    markdownRecordsLatestSiblingReport:
      input.markdown.includes("# Java / mini-kv route catalog cleanup latest sibling evidence report")
      && input.markdown.includes("Active Node version: Node v540"),
    markdownRecordsJavaAndMiniKvEvidence:
      input.markdown.includes("Java v274 Receipt")
      && input.markdown.includes("mini-kv v247 Release"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    routeCatalogCountsMatchArchive:
      input.routeCatalog.groupCount === 50
      && input.routeCatalog.routeCount === 224
      && input.routeCatalog.javaMiniKvDomainRouteCount === 60
      && input.routeCatalog.cleanupHandoffRouteGroupRouteCount === 26,
    noRuntimeExecutionOpened:
      input.sourceReport.executionAllowed === false
      && valueAt(input.json, "readyForProductionOperations") === false,
    noSiblingServiceStartupOrMutation:
      input.sourceReport.startsJavaService === false
      && input.sourceReport.startsMiniKvService === false
      && input.sourceReport.mutatesJavaState === false
      && input.sourceReport.mutatesMiniKvState === false
      && input.sourceReport.connectsManagedAudit === false,
    readyForRouteCatalogCleanupLatestSiblingEvidenceArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): LatestSiblingEvidenceArchiveFileReference {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, sizeBytes: 0, sha256: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    sha256: createHash("sha256").update(content).digest("hex"),
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
