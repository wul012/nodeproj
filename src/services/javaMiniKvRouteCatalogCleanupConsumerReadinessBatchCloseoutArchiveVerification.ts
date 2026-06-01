import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_BATCH_CLOSEOUT_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification";

const ARCHIVE_JSON =
  "e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v497-http.json";
const ARCHIVE_MARKDOWN =
  "e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v497-http.md";
const ARCHIVE_SUMMARY =
  "e/498/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-v498-archive-summary.json";

export interface BatchCloseoutArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification.v1";
  activeNodeVersion: "Node v499";
  sourceNodeVersion: "Node v498";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: BatchCloseoutArchiveFileReference;
    markdown: BatchCloseoutArchiveFileReference;
    summary: BatchCloseoutArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    closedVersionCount: number;
    routeCountAtCloseout: number;
    executionAllowed: boolean;
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
    jsonClosedBatchMatchesV491ToV495: boolean;
    markdownRecordsBatchCloseout: boolean;
    markdownRecordsRouteAndBoundary: boolean;
    summaryMatchesJson: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile {
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
  const sourceReport = createSourceReport(json, summaryJson);
  const checks = createChecks({ archiveFiles, json, markdown, summaryJson, sourceReport });
  checks.readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout-archive-verification.v1",
    activeNodeVersion: "Node v499",
    sourceNodeVersion: "Node v498",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: ready,
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
        "Expose this batch closeout archive verification through the cleanup route group.",
        "Use Node v501+ for the final fifteen-version closeout or next evidence queue.",
      ]
      : [
        "Repair v498 archive files before exposing the verifier route.",
        "Do not regenerate the archive from dirty sibling evidence.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
  summaryJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupConsumerReadinessBatchCloseout") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    closedVersionCount: numberValue(valueAt(json, "summary", "closedVersionCount")),
    routeCountAtCloseout: numberValue(valueAt(summaryJson, "routeCountAtCloseout")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerificationProfile["checks"] {
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
      input.sourceReport.profileVersion
      === "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v496"
      && input.sourceReport.sourceNodeVersion === "Node v495",
    jsonCloseoutReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 15
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonClosedBatchMatchesV491ToV495:
      input.sourceReport.closedVersionCount === 5
      && input.sourceReport.routeCountAtCloseout === 207
      && Array.isArray(valueAt(input.json, "closedVersions"))
      && (valueAt(input.json, "closedVersions") as unknown[]).includes("v491")
      && (valueAt(input.json, "closedVersions") as unknown[]).includes("v495"),
    markdownRecordsBatchCloseout:
      input.markdown.includes("# Java / mini-kv route catalog cleanup consumer readiness batch closeout")
      && input.markdown.includes("Active Node version: Node v496"),
    markdownRecordsRouteAndBoundary:
      input.markdown.includes("routeCount: 207")
      && input.markdown.includes("javaDirtyWorktreeExcluded: true"),
    summaryMatchesJson:
      valueAt(input.summaryJson, "ready") === input.sourceReport.ready
      && valueAt(input.summaryJson, "checkCount") === input.sourceReport.checkCount
      && valueAt(input.summaryJson, "passedCheckCount") === input.sourceReport.passedCheckCount,
    noRuntimeExecutionOpened:
      input.sourceReport.executionAllowed === false
      && valueAt(input.json, "readyForProductionOperations") === false,
    noSiblingServiceStartup:
      valueAt(input.json, "startsJavaService") === false
      && valueAt(input.json, "startsMiniKvService") === false,
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseoutArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): BatchCloseoutArchiveFileReference {
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
