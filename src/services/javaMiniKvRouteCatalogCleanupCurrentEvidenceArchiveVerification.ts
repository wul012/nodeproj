import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CURRENT_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification";

const ARCHIVE_JSON =
  "e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v482-http.json";
const ARCHIVE_MARKDOWN =
  "e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v482-http.md";
const ARCHIVE_SUMMARY =
  "e/483/evidence/java-mini-kv-current-route-catalog-cleanup-evidence-report-v483-archive-summary.json";

export interface CurrentEvidenceArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification.v1";
  activeNodeVersion: "Node v484";
  sourceNodeVersion: "Node v483";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: CurrentEvidenceArchiveFileReference;
    markdown: CurrentEvidenceArchiveFileReference;
    summary: CurrentEvidenceArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    javaCatalogedArtifactCount: number;
    miniKvV200ReleaseVersion: string;
    miniKvV200BoundaryGroupCount: number;
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
    jsonReportReady: boolean;
    jsonChecksAllPassed: boolean;
    jsonCurrentEvidenceVersionsMatch: boolean;
    markdownRecordsCurrentReport: boolean;
    markdownRecordsJavaAndMiniKvEvidence: boolean;
    summaryMatchesJson: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile {
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
  const checks = createChecks({
    archiveFiles,
    json,
    markdown,
    summaryJson,
    sourceReport,
  });
  checks.readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup current evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-current-evidence-archive-verification.v1",
    activeNodeVersion: "Node v484",
    sourceNodeVersion: "Node v483",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: ready,
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
        "Expose this archive verification through the existing route catalog cleanup handoff route group.",
        "Consume Java v216 or mini-kv v201 only through a separate frozen evidence intake.",
      ]
      : [
        "Repair the v483 archive files before publishing archive verification.",
        "Do not rerun sibling services to paper over missing archive files.",
      ],
  };
}

function createSourceReport(json: Record<string, unknown> | null):
  JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupCurrentEvidenceReport") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    javaCatalogedArtifactCount: numberValue(valueAt(json, "summary", "javaCatalogedArtifactCount")),
    miniKvV200ReleaseVersion:
      stringValue(valueAt(json, "evidence", "miniKvV200RouteCatalogCleanupBatchCloseoutAudit", "releaseVersion")),
    miniKvV200BoundaryGroupCount: numberValue(valueAt(json, "summary", "miniKvV200BoundaryGroupCount")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationProfile["checks"] {
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
      input.sourceReport.profileVersion === "java-mini-kv-route-catalog-cleanup-current-evidence-report.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v482"
      && input.sourceReport.sourceNodeVersion === "Node v481",
    jsonReportReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 18
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonCurrentEvidenceVersionsMatch:
      stringValue(valueAt(input.json, "evidence", "javaV214ConsumerHandoffBundleIntegrity", "version")) === "Java v214"
      && input.sourceReport.javaCatalogedArtifactCount === 6
      && input.sourceReport.miniKvV200ReleaseVersion === "v200"
      && input.sourceReport.miniKvV200BoundaryGroupCount === 39,
    markdownRecordsCurrentReport:
      input.markdown.includes("# Java / mini-kv route catalog cleanup current evidence report")
      && input.markdown.includes("Active Node version: Node v482"),
    markdownRecordsJavaAndMiniKvEvidence:
      input.markdown.includes("Java v214 Consumer Handoff Bundle Integrity")
      && input.markdown.includes("mini-kv v200 Batch Closeout Audit"),
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
    readyForRouteCatalogCleanupCurrentEvidenceArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): CurrentEvidenceArchiveFileReference {
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
