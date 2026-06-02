import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_STABILITY_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-archive-verification";

const ARCHIVE_JSON =
  "e/519/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-v518-http.json";
const ARCHIVE_MARKDOWN =
  "e/519/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-v518-http.md";
const ARCHIVE_SUMMARY =
  "e/519/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-v519-archive-summary.json";

export interface FreshBaselineStabilityArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-archive-verification.v1";
  activeNodeVersion: "Node v520";
  sourceNodeVersion: "Node v519";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: FreshBaselineStabilityArchiveFileReference;
    markdown: FreshBaselineStabilityArchiveFileReference;
    summary: FreshBaselineStabilityArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
    executionAllowed: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
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
    jsonCloseoutReady: boolean;
    jsonChecksAllPassed: boolean;
    jsonRouteCatalogSnapshotValid: boolean;
    markdownRecordsStabilityCloseout: boolean;
    summaryMatchesJson: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile {
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
  const checks = createChecks({ archiveFiles, markdown, summaryJson, sourceReport });
  checks.readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup fresh baseline stability closeout archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout-archive-verification.v1",
    activeNodeVersion: "Node v520",
    sourceNodeVersion: "Node v519",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveVerificationOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    archiveFiles,
    sourceReport,
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
        "Expose this archive verification through the cleanup route group in Node v521.",
        "Use the v521 route as the final pre-closeout stability gate.",
      ]
      : [
        "Repair v519 archive files before exposing archive verification.",
        "Do not regenerate the archive from a later stability closeout snapshot.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupFreshBaselineStabilityCloseout") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    routeCount: numberValue(valueAt(json, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(json, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(json, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile["archiveFiles"];
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerificationProfile["checks"] {
  const summaryFiles = objectField(input.summaryJson, "files");
  const summaryJsonFile = objectField(summaryFiles, "json");
  const summaryMarkdownFile = objectField(summaryFiles, "markdown");

  return {
    archiveFilesPresent: Object.values(input.archiveFiles).every((file) => file.exists),
    jsonReadable: input.archiveFiles.json.exists,
    markdownReadable: input.markdown.length > 0,
    summaryReadable: input.archiveFiles.summary.exists,
    summaryDigestsMatchFiles:
      stringValue(valueAt(summaryJsonFile, "sha256")) === input.archiveFiles.json.sha256
      && stringValue(valueAt(summaryMarkdownFile, "sha256")) === input.archiveFiles.markdown.sha256,
    jsonProfileVersionValid:
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-fresh-baseline-stability-closeout.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v517"
      && input.sourceReport.sourceNodeVersion === "Node v516",
    jsonCloseoutReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 10
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonRouteCatalogSnapshotValid:
      input.sourceReport.routeCount === 215
      && input.sourceReport.javaMiniKvDomainRouteCount === 51
      && input.sourceReport.cleanupHandoffRouteGroupRouteCount === 17,
    markdownRecordsStabilityCloseout:
      input.markdown.includes("# Java / mini-kv route catalog cleanup fresh baseline stability closeout")
      && input.markdown.includes("Active Node version: Node v517"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    noRuntimeExecutionOpened: input.sourceReport.executionAllowed === false,
    noSiblingServiceStartup:
      input.sourceReport.startsJavaService === false
      && input.sourceReport.startsMiniKvService === false,
    readyForRouteCatalogCleanupFreshBaselineStabilityCloseoutArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string):
  FreshBaselineStabilityArchiveFileReference {
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
