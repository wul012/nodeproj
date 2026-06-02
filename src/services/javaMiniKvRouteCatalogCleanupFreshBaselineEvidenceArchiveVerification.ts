import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification";

const ARCHIVE_JSON =
  "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v508-http.json";
const ARCHIVE_MARKDOWN =
  "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v508-http.md";
const ARCHIVE_SUMMARY =
  "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v509-archive-summary.json";

export interface FreshBaselineArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification.v1";
  activeNodeVersion: "Node v510";
  sourceNodeVersion: "Node v509";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: FreshBaselineArchiveFileReference;
    markdown: FreshBaselineArchiveFileReference;
    summary: FreshBaselineArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    javaLatestCleanVersion: string;
    miniKvLatestCleanVersion: string;
    executionAllowed: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
  };
  routeCatalog: {
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
    jsonCleanEvidenceVersionsMatch: boolean;
    markdownRecordsFreshBaselineReport: boolean;
    markdownRecordsJavaAndMiniKvEvidence: boolean;
    summaryMatchesJson: boolean;
    routeCatalogCountsMatchArchive: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile {
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
  checks.readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup fresh baseline evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification.v1",
    activeNodeVersion: "Node v510",
    sourceNodeVersion: "Node v509",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveVerificationOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
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
        "Expose this archive verification through the cleanup route group in Node v511.",
        "Batch-close v507-v511 after the verifier route is published.",
      ]
      : [
        "Repair v509 archive files before exposing archive verification.",
        "Do not regenerate the archive from a later rolling sibling fixture.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupFreshBaselineEvidenceReport") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    javaLatestCleanVersion: stringValue(valueAt(json, "summary", "javaLatestCleanVersion")),
    miniKvLatestCleanVersion: stringValue(valueAt(json, "summary", "miniKvLatestCleanVersion")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
  };
}

function createRouteCatalog(
  summaryJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["routeCatalog"] {
  return {
    routeCount: numberValue(valueAt(summaryJson, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(summaryJson, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(summaryJson, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["sourceReport"];
  routeCatalog: JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["routeCatalog"];
}): JavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationProfile["checks"] {
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
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v508"
      && input.sourceReport.sourceNodeVersion === "Node v507",
    jsonReportReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 9
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonCleanEvidenceVersionsMatch:
      input.sourceReport.javaLatestCleanVersion === "Java v239"
      && input.sourceReport.miniKvLatestCleanVersion === "v220"
      && Array.isArray(valueAt(input.json, "evidence", "javaReceipts"))
      && JSON.stringify(valueAt(input.json, "evidence", "javaReceipts")).includes("\"Java v239\"")
      && Array.isArray(valueAt(input.json, "evidence", "miniKvReleases"))
      && JSON.stringify(valueAt(input.json, "evidence", "miniKvReleases")).includes("\"v220\""),
    markdownRecordsFreshBaselineReport:
      input.markdown.includes("# Java / mini-kv route catalog cleanup fresh baseline evidence report")
      && input.markdown.includes("Active Node version: Node v508"),
    markdownRecordsJavaAndMiniKvEvidence:
      input.markdown.includes("Java v232-v239 Readiness Handoff Receipts")
      && input.markdown.includes("mini-kv v213-v220 Post-Closeout Continuity"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    routeCatalogCountsMatchArchive:
      input.routeCatalog.routeCount === 212
      && input.routeCatalog.javaMiniKvDomainRouteCount === 48
      && input.routeCatalog.cleanupHandoffRouteGroupRouteCount === 14,
    noRuntimeExecutionOpened:
      input.sourceReport.executionAllowed === false
      && valueAt(input.json, "readyForProductionOperations") === false,
    noSiblingServiceStartup:
      input.sourceReport.startsJavaService === false
      && input.sourceReport.startsMiniKvService === false,
    readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): FreshBaselineArchiveFileReference {
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
