import type { AppConfig } from "../config.js";
import {
  CONSUMER_READINESS_BATCH_CLOSEOUT_REQUIRED_ARTIFACTS as REQUIRED_ARTIFACTS,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutArtifacts.js";
import {
  fileReference,
  numberValue,
  objectField,
  readJsonFile,
  readTextFile,
  stringValue,
  valueAt,
  type BatchCloseoutFileReference,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseoutFileSupport.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

export {
  renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification";

export type ConsumerReadinessArchiveFileReference = BatchCloseoutFileReference;

export interface JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification.v1";
  activeNodeVersion: "Node v494";
  sourceNodeVersion: "Node v493";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  archiveVerificationOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  archiveFiles: {
    json: ConsumerReadinessArchiveFileReference;
    markdown: ConsumerReadinessArchiveFileReference;
    summary: ConsumerReadinessArchiveFileReference;
  };
  sourceReport: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    javaGuardCount: number;
    miniKvLatestVersionedRelease: string;
    miniKvLatestObservedAuditRelease: string;
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
    jsonConsumerEvidenceVersionsMatch: boolean;
    markdownRecordsConsumerReadinessReport: boolean;
    markdownRecordsJavaAndMiniKvEvidence: boolean;
    summaryMatchesJson: boolean;
    noRuntimeExecutionOpened: boolean;
    noSiblingServiceStartup: boolean;
    readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile {
  void input.config;
  const projectRoot = input.projectRoot ?? process.cwd();
  const archiveFiles = {
    json: fileReference(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveJson),
    markdown: fileReference(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveMarkdown),
    summary: fileReference(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveSummary),
  };
  const json = readJsonFile(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveJson);
  const markdown = readTextFile(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveMarkdown);
  const summaryJson = readJsonFile(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveSummary);
  const sourceReport = createSourceReport(json);
  const checks = createChecks({
    archiveFiles,
    json,
    markdown,
    summaryJson,
    sourceReport,
  });
  checks.readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup consumer readiness evidence archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification.v1",
    activeNodeVersion: "Node v494",
    sourceNodeVersion: "Node v493",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: ready,
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
        "Keep Java and mini-kv parallel; this verifier does not require fresh upstream evidence.",
      ]
      : [
        "Repair the v493 archive files before publishing archive verification.",
        "Do not regenerate the archive from dirty sibling evidence to hide verification failures.",
      ],
  };
}

function createSourceReport(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile["sourceReport"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupConsumerReadinessEvidenceReport") === true,
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    javaGuardCount: numberValue(valueAt(json, "summary", "javaGuardCount")),
    miniKvLatestVersionedRelease: stringValue(valueAt(json, "summary", "miniKvLatestVersionedRelease")),
    miniKvLatestObservedAuditRelease: stringValue(valueAt(json, "summary", "miniKvLatestObservedAuditRelease")),
    executionAllowed: valueAt(json, "executionAllowed") === true,
  };
}

function createChecks(input: {
  archiveFiles:
    JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceReport:
    JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile["sourceReport"];
}): JavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationProfile["checks"] {
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
      === "java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report.v1",
    jsonSourceVersionsMatch:
      input.sourceReport.activeNodeVersion === "Node v492"
      && input.sourceReport.sourceNodeVersion === "Node v491",
    jsonReportReady: input.sourceReport.ready,
    jsonChecksAllPassed:
      input.sourceReport.checkCount === 21
      && input.sourceReport.checkCount === input.sourceReport.passedCheckCount,
    jsonConsumerEvidenceVersionsMatch:
      input.sourceReport.javaGuardCount === 20
      && input.sourceReport.miniKvLatestVersionedRelease === "v209"
      && input.sourceReport.miniKvLatestObservedAuditRelease === "v210"
      && stringValue(valueAt(input.json, "evidence", "javaV224ConsumerReadinessCompletion", "version"))
        === "Java v224"
      && stringValue(valueAt(input.json, "evidence", "miniKvLatestAuditNote", "sourceVersionedRelease"))
        === "v209",
    markdownRecordsConsumerReadinessReport:
      input.markdown.includes("# Java / mini-kv route catalog cleanup consumer readiness evidence report")
      && input.markdown.includes("Active Node version: Node v492"),
    markdownRecordsJavaAndMiniKvEvidence:
      input.markdown.includes("Java v220 Consumer Evidence Digest")
      && input.markdown.includes("mini-kv v202-v209 Versioned Continuity"),
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
    readyForRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification: false,
  };
}
