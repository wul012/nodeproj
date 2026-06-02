import type { AppConfig } from "../config.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import { javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes } from "../routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.js";
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

export {
  renderJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationMarkdown,
} from "./javaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationRenderer.js";

export const JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_LATEST_SIBLING_LIVE_SMOKE_ARCHIVE_VERIFICATION_ROUTE_ARCHIVE_VERIFICATION_ROUTE_PATH =
  "/api/v1/audit/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification";

const ARCHIVE_JSON =
  "e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.json";
const ARCHIVE_MARKDOWN =
  "e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v547-http.md";
const ARCHIVE_SUMMARY =
  "e/548/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-v548-archive-summary.json";
const SOURCE_ROUTE_ARCHIVE_ROUTE_COUNT = 226;
const SOURCE_ROUTE_ARCHIVE_JAVA_MINI_KV_ROUTE_COUNT = 62;
const SOURCE_ROUTE_ARCHIVE_CLEANUP_HANDOFF_ROUTE_COUNT = 28;

export interface JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1";
  activeNodeVersion: "Node v549";
  sourceNodeVersion: "Node v548";
  archiveVerificationState: "ready" | "blocked";
  readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: boolean;
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
    ready: boolean;
    archiveVerificationState: string;
    statusCodeJson: number;
    statusCodeMarkdown: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    checkCount: number;
    passedCheckCount: number;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
  };
  sourceVerifier: {
    profileVersion: string;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    ready: boolean;
    archiveVerificationState: string;
    checkCount: number;
    passedCheckCount: number;
    sourceRecordCount: number;
    sourcePassedRecordCount: number;
    sourceCleanupPassed: boolean;
    sourceAfterListeningSocketCount: number;
    localHttpProxyBypass: string;
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
    jsonVerifierReady: boolean;
    jsonChecksAllPassed: boolean;
    jsonSourceLiveSmokeStillReady: boolean;
    summaryStatusCodesPassed: boolean;
    summaryMatchesJson: boolean;
    summaryRouteCatalogCountsMatchSourceArchive: boolean;
    currentRouteCatalogCoversSourceArchive: boolean;
    markdownRecordsRouteArchive: boolean;
    markdownRecordsProxyAndCleanupChecks: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: boolean;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification(input: {
  config: AppConfig;
  projectRoot?: string;
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile {
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
  const sourceRouteArchive = createSourceRouteArchive(summaryJson);
  const sourceVerifier = createSourceVerifier(json);
  const checks = createChecks({ archiveFiles, json, markdown, summaryJson, sourceRouteArchive, sourceVerifier });
  checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification")
      .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup latest sibling live smoke archive verification route archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion:
      "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification-route-archive-verification.v1",
    activeNodeVersion: "Node v549",
    sourceNodeVersion: "Node v548",
    archiveVerificationState: ready ? "ready" : "blocked",
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: ready,
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
    sourceVerifier,
    summary: {
      archiveFileCount: Object.keys(archiveFiles).length,
      presentArchiveFileCount: Object.values(archiveFiles).filter((file) => file.exists).length,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      sourceCheckCount: sourceVerifier.checkCount,
      sourcePassedCheckCount: sourceVerifier.passedCheckCount,
    },
    checks,
    nextActions: ready
      ? [
        "Archive this public verifier route output before building a follow-up route archive verifier.",
        "Use the verified v548 route archive baseline before any later live-smoke closeout.",
      ]
      : [
        "Repair the v548 route archive files before exposing the verifier route.",
        "Do not rerun Java or mini-kv; v549 only verifies Node route archive files.",
      ],
  };
}

function createSourceRouteArchive(
  summaryJson: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"] {
  return {
    ready: valueAt(summaryJson, "ready") === true,
    archiveVerificationState: stringValue(valueAt(summaryJson, "archiveVerificationState")),
    statusCodeJson: numberValue(valueAt(summaryJson, "statusCodes", "json")),
    statusCodeMarkdown: numberValue(valueAt(summaryJson, "statusCodes", "markdown")),
    activeNodeVersion: stringValue(valueAt(summaryJson, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(summaryJson, "sourceNodeVersion")),
    checkCount: numberValue(valueAt(summaryJson, "checkCount")),
    passedCheckCount: numberValue(valueAt(summaryJson, "passedCheckCount")),
    routeCount: numberValue(valueAt(summaryJson, "routeCatalog", "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(summaryJson, "routeCatalog", "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount:
      numberValue(valueAt(summaryJson, "routeCatalog", "cleanupHandoffRouteGroupRouteCount")),
  };
}

function createSourceVerifier(
  json: Record<string, unknown> | null,
): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["sourceVerifier"] {
  return {
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    ready: valueAt(json, "readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerification") === true,
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    sourceRecordCount: numberValue(valueAt(json, "summary", "sourceRecordCount")),
    sourcePassedRecordCount: numberValue(valueAt(json, "summary", "sourcePassedRecordCount")),
    sourceCleanupPassed: valueAt(json, "sourceLiveSmoke", "cleanupPassed") === true,
    sourceAfterListeningSocketCount: numberValue(valueAt(json, "sourceLiveSmoke", "afterListeningSocketCount")),
    localHttpProxyBypass: stringValue(valueAt(json, "sourceLiveSmoke", "localHttpProxyBypass")),
  };
}

function createChecks(input: {
  archiveFiles: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["archiveFiles"];
  json: Record<string, unknown> | null;
  markdown: string;
  summaryJson: Record<string, unknown> | null;
  sourceRouteArchive: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["sourceRouteArchive"];
  sourceVerifier: JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["sourceVerifier"];
}): JavaMiniKvRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerificationProfile["checks"] {
  return {
    archiveFilesPresent: Object.values(input.archiveFiles).every((file) => file.exists),
    jsonReadable: input.json !== null,
    markdownReadable: input.markdown.length > 0,
    summaryReadable: input.summaryJson !== null,
    summaryDigestsMatchFiles:
      stringValue(valueAt(input.summaryJson, "files", "json", "sha256")) === input.archiveFiles.json.sha256
      && stringValue(valueAt(input.summaryJson, "files", "markdown", "sha256")) === input.archiveFiles.markdown.sha256,
    jsonProfileVersionValid:
      input.sourceVerifier.profileVersion
        === "java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-archive-verification.v1",
    jsonSourceVersionsMatch:
      input.sourceVerifier.activeNodeVersion === "Node v546"
      && input.sourceVerifier.sourceNodeVersion === "Node v545"
      && input.sourceRouteArchive.activeNodeVersion === "Node v546"
      && input.sourceRouteArchive.sourceNodeVersion === "Node v545",
    jsonVerifierReady:
      input.sourceVerifier.ready
      && input.sourceVerifier.archiveVerificationState === "ready",
    jsonChecksAllPassed:
      input.sourceVerifier.checkCount === 24
      && input.sourceVerifier.checkCount === input.sourceVerifier.passedCheckCount,
    jsonSourceLiveSmokeStillReady:
      input.sourceVerifier.sourceRecordCount === 9
      && input.sourceVerifier.sourceRecordCount === input.sourceVerifier.sourcePassedRecordCount
      && input.sourceVerifier.sourceCleanupPassed
      && input.sourceVerifier.sourceAfterListeningSocketCount === 0
      && input.sourceVerifier.localHttpProxyBypass === "--noproxy *",
    summaryStatusCodesPassed:
      input.sourceRouteArchive.statusCodeJson === 200
      && input.sourceRouteArchive.statusCodeMarkdown === 200,
    summaryMatchesJson:
      input.sourceRouteArchive.ready === input.sourceVerifier.ready
      && input.sourceRouteArchive.archiveVerificationState === input.sourceVerifier.archiveVerificationState
      && input.sourceRouteArchive.checkCount === input.sourceVerifier.checkCount
      && input.sourceRouteArchive.passedCheckCount === input.sourceVerifier.passedCheckCount,
    summaryRouteCatalogCountsMatchSourceArchive:
      input.sourceRouteArchive.routeCount === SOURCE_ROUTE_ARCHIVE_ROUTE_COUNT
      && input.sourceRouteArchive.javaMiniKvDomainRouteCount === SOURCE_ROUTE_ARCHIVE_JAVA_MINI_KV_ROUTE_COUNT
      && input.sourceRouteArchive.cleanupHandoffRouteGroupRouteCount === SOURCE_ROUTE_ARCHIVE_CLEANUP_HANDOFF_ROUTE_COUNT,
    currentRouteCatalogCoversSourceArchive:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount >= input.sourceRouteArchive.routeCount
      && EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["java-mini-kv"]
        >= input.sourceRouteArchive.javaMiniKvDomainRouteCount
      && javaMiniKvRouteCatalogCleanupHandoffAuditJsonMarkdownRoutes.length
        >= input.sourceRouteArchive.cleanupHandoffRouteGroupRouteCount,
    markdownRecordsRouteArchive:
      input.markdown.includes("# Java / mini-kv route catalog cleanup latest sibling live smoke archive verification")
      && input.markdown.includes("Archive verification state: ready"),
    markdownRecordsProxyAndCleanupChecks:
      input.markdown.includes("localProxyBypassRecorded: true")
      && input.markdown.includes("cleanupProofPassed: true"),
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
    readyForRouteCatalogCleanupLatestSiblingLiveSmokeArchiveVerificationRouteArchiveVerification: false,
  };
}
