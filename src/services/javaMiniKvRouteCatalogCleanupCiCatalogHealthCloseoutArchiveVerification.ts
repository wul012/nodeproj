import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CI_CATALOG_HEALTH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-archive-verification";

const ARCHIVE_JSON =
  "e/534/evidence/java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-v533-http.json";
const ARCHIVE_MARKDOWN =
  "e/534/evidence/java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-v533-http.md";
const ARCHIVE_SUMMARY =
  "e/534/evidence/java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-v534-archive-summary.json";

export interface CiCatalogHealthCloseoutArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-archive-verification.v1";
  activeNodeVersion: "Node v535";
  sourceNodeVersion: "Node v534";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: CiCatalogHealthCloseoutArchiveFileReference;
    markdown: CiCatalogHealthCloseoutArchiveFileReference;
    summary: CiCatalogHealthCloseoutArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    plannedSegmentVersionCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
    routeQualityReady: boolean;
    routeQualityRegistrationCount: number;
    ciNoNewFailureObserved: boolean;
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
    plannedSegmentVersionCount: number;
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
    jsonPlannedSegmentValid: boolean;
    jsonRouteQualityValid: boolean;
    jsonCiObservationValid: boolean;
    jsonRouteCatalogSnapshotValid: boolean;
    markdownRecordsCiCatalogHealthCloseout: boolean;
    summaryMatchesJson: boolean;
    runtimeBoundaryClosed: boolean;
    readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification {
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
  checks.readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup CI/catalog health closeout archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout-archive-verification.v1",
    activeNodeVersion: "Node v535",
    sourceNodeVersion: "Node v534",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: ready,
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
      plannedSegmentVersionCount: sourceReport.plannedSegmentVersionCount,
    },
    checks,
    nextActions: ready
      ? [
        "Expose this archive verification through the cleanup route group in Node v536.",
        "Use the v536 route as the public gate before final v537 closeout.",
      ]
      : [
        "Repair v534 archive files before exposing archive verification.",
        "Do not regenerate the archive from a later CI/catalog health snapshot.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupCiCatalogHealthCloseout") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    plannedSegmentVersionCount: numberValue(valueAt(json, "summary", "plannedSegmentVersionCount")),
    routeCount: numberValue(valueAt(json, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(json, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(json, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
    routeQualityReady: valueAt(json, "routeQuality", "ready") === true,
    routeQualityRegistrationCount: numberValue(valueAt(json, "routeQuality", "routeRegistrationCount")),
    ciNoNewFailureObserved: valueAt(json, "ciObservation", "conclusion") === "no-new-failure-observed",
    executionAllowed: valueAt(json, "executionAllowed") === true,
    startsJavaService: valueAt(json, "startsJavaService") === true,
    startsMiniKvService: valueAt(json, "startsMiniKvService") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification["archiveFiles"];
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification["checks"] {
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
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-ci-catalog-health-closeout.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v532"
      && input.sourceReport.sourceNodeVersion === "Node v531",
    jsonCloseoutReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 10
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonPlannedSegmentValid: input.sourceReport.plannedSegmentVersionCount === 5,
    jsonRouteQualityValid:
      input.sourceReport.routeQualityReady
      && input.sourceReport.routeQualityRegistrationCount === 221,
    jsonCiObservationValid: input.sourceReport.ciNoNewFailureObserved,
    jsonRouteCatalogSnapshotValid:
      input.sourceReport.routeCount === 221
      && input.sourceReport.javaMiniKvDomainRouteCount === 57
      && input.sourceReport.cleanupHandoffRouteGroupRouteCount === 23,
    markdownRecordsCiCatalogHealthCloseout:
      input.markdown.includes("# Java / mini-kv route catalog cleanup CI/catalog health closeout")
      && input.markdown.includes("Active Node version: Node v532")
      && input.markdown.includes("ciObservationHasNoNewFailure: true"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    runtimeBoundaryClosed:
      input.sourceReport.executionAllowed === false
      && input.sourceReport.startsJavaService === false
      && input.sourceReport.startsMiniKvService === false,
    readyForRouteCatalogCleanupCiCatalogHealthCloseoutArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string):
  CiCatalogHealthCloseoutArchiveFileReference {
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
