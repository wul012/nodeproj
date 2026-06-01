import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_VERIFICATION_CHECKLIST_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification";

const ARCHIVE_JSON =
  "e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v487-http.json";
const ARCHIVE_MARKDOWN =
  "e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v487-http.md";
const ARCHIVE_SUMMARY =
  "e/488/evidence/java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report-v488-archive-summary.json";

export interface ChecklistEvidenceArchiveFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification.v1";
  activeNodeVersion: "Node v489";
  sourceNodeVersion: "Node v488";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: ChecklistEvidenceArchiveFileReference;
    markdown: ChecklistEvidenceArchiveFileReference;
    summary: ChecklistEvidenceArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    javaVerificationItemCount: number;
    miniKvV201ReleaseVersion: string;
    miniKvV201BoundaryGroupCount: number;
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
    jsonChecklistEvidenceVersionsMatch: boolean;
    markdownRecordsChecklistReport: boolean;
    markdownRecordsJavaAndMiniKvEvidence: boolean;
    summaryMatchesJson: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile {
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
  checks.readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup verification checklist evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-archive-verification.v1",
    activeNodeVersion: "Node v489",
    sourceNodeVersion: "Node v488",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: ready,
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
        "Treat Java v221+ and mini-kv v202+ as a later fresh intake, not as part of this archive verifier.",
      ]
      : [
        "Repair the v488 archive files before publishing archive verification.",
        "Do not rerun sibling services to paper over missing archive files.",
      ],
  };
}

function createSourceReport(json: Record<string, unknown> | null):
  JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupVerificationChecklistEvidenceReport") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    javaVerificationItemCount: numberValue(valueAt(json, "summary", "javaVerificationItemCount")),
    miniKvV201ReleaseVersion:
      stringValue(valueAt(json, "evidence", "miniKvV201RouteCatalogCleanupPostCloseoutContinuity", "releaseVersion")),
    miniKvV201BoundaryGroupCount: numberValue(valueAt(json, "summary", "miniKvV201BoundaryGroupCount")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport: JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerificationProfile["checks"] {
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
      === "java-mini-kv-route-catalog-cleanup-verification-checklist-evidence-report.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v487"
      && input.sourceReport.sourceNodeVersion === "Node v486",
    jsonReportReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 18
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonChecklistEvidenceVersionsMatch:
      stringValue(valueAt(input.json, "evidence", "javaV217ConsumerVerificationChecklistHistoricalCompatibility",
        "version")) === "Java v217"
      && input.sourceReport.javaVerificationItemCount === 7
      && input.sourceReport.miniKvV201ReleaseVersion === "v201"
      && input.sourceReport.miniKvV201BoundaryGroupCount === 40,
    markdownRecordsChecklistReport:
      input.markdown.includes("# Java / mini-kv route catalog cleanup verification checklist evidence report")
      && input.markdown.includes("Active Node version: Node v487"),
    markdownRecordsJavaAndMiniKvEvidence:
      input.markdown.includes("Java v217 Consumer Verification Checklist Historical Compatibility")
      && input.markdown.includes("mini-kv v201 Post-Closeout Continuity"),
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
    readyForRouteCatalogCleanupVerificationChecklistEvidenceArchiveVerification: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): ChecklistEvidenceArchiveFileReference {
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
