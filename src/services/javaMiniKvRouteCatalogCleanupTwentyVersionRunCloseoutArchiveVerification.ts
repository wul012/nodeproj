import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_TWENTY_VERSION_RUN_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-archive-verification";

const ARCHIVE_JSON =
  "e/524/evidence/java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-v523-http.json";
const ARCHIVE_MARKDOWN =
  "e/524/evidence/java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-v523-http.md";
const ARCHIVE_SUMMARY =
  "e/524/evidence/java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-v524-archive-summary.json";

export interface TwentyVersionRunCloseoutArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-archive-verification.v1";
  activeNodeVersion: "Node v525";
  sourceNodeVersion: "Node v524";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: TwentyVersionRunCloseoutArchiveFileReference;
    markdown: TwentyVersionRunCloseoutArchiveFileReference;
    summary: TwentyVersionRunCloseoutArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    completedVersionCount: number;
    remainingVersionCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
    stabilityVerifierReady: boolean;
    stabilityVerifierCheckCount: number;
    stabilityVerifierPassedCheckCount: number;
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
    completedVersionCount: number;
    remainingVersionCount: number;
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
    jsonVersionCountsValid: boolean;
    jsonRouteCatalogSnapshotValid: boolean;
    jsonStabilityVerifierReady: boolean;
    markdownRecordsTwentyVersionCloseout: boolean;
    summaryMatchesJson: boolean;
    runtimeBoundaryClosed: boolean;
    readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification {
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
  checks.readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup twenty-version run closeout archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout-archive-verification.v1",
    activeNodeVersion: "Node v525",
    sourceNodeVersion: "Node v524",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: ready,
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
      completedVersionCount: sourceReport.completedVersionCount,
      remainingVersionCount: sourceReport.remainingVersionCount,
    },
    checks,
    nextActions: ready
      ? [
        "Expose this archive verification through the cleanup route group in Node v526.",
        "Use the v526 route as the public gate before the expanded stability closeout path.",
      ]
      : [
        "Repair v524 archive files before exposing archive verification.",
        "Do not regenerate the archive from a later route catalog snapshot.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupTwentyVersionRunCloseout") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    completedVersionCount: numberValue(valueAt(json, "summary", "completedVersionCount")),
    remainingVersionCount: numberValue(valueAt(json, "summary", "remainingVersionCount")),
    routeCount: numberValue(valueAt(json, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(json, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(json, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
    stabilityVerifierReady: valueAt(json, "stabilityVerifier", "ready") === true,
    stabilityVerifierCheckCount: numberValue(valueAt(json, "stabilityVerifier", "checkCount")),
    stabilityVerifierPassedCheckCount: numberValue(valueAt(json, "stabilityVerifier", "passedCheckCount")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification["archiveFiles"];
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification["checks"] {
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
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-twenty-version-run-closeout.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v522"
      && input.sourceReport.sourceNodeVersion === "Node v521",
    jsonCloseoutReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 9
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonVersionCountsValid:
      input.sourceReport.completedVersionCount === 16
      && input.sourceReport.remainingVersionCount === 15,
    jsonRouteCatalogSnapshotValid:
      input.sourceReport.routeCount === 217
      && input.sourceReport.javaMiniKvDomainRouteCount === 53
      && input.sourceReport.cleanupHandoffRouteGroupRouteCount === 19,
    jsonStabilityVerifierReady:
      input.sourceReport.stabilityVerifierReady
      && input.sourceReport.stabilityVerifierCheckCount === 15
      && input.sourceReport.stabilityVerifierPassedCheckCount === 15,
    markdownRecordsTwentyVersionCloseout:
      input.markdown.includes("# Java / mini-kv route catalog cleanup twenty-version run closeout")
      && input.markdown.includes("Active Node version: Node v522")
      && input.markdown.includes("remainingVersionCount: 15"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    runtimeBoundaryClosed:
      input.sourceReport.executionAllowed === false
      && input.sourceReport.startsJavaService === false
      && input.sourceReport.startsMiniKvService === false,
    readyForRouteCatalogCleanupTwentyVersionRunCloseoutArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string):
  TwentyVersionRunCloseoutArchiveFileReference {
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
