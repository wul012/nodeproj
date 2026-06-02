import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";
import {
  loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification,
} from "./javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.js";

const REQUIRED_ARTIFACTS = {
  v507Plan:
    "docs/plans3/v507-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-intake-roadmap.md",
  v507EvidenceService: "src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidence.ts",
  v507EvidenceTest: "test/javaMiniKvRouteCatalogCleanupFreshBaselineEvidence.test.ts",
  v508Plan:
    "docs/plans3/v508-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-roadmap.md",
  v508ReportService: "src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReport.ts",
  v508ReportRenderer: "src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceReportRenderer.ts",
  v509Plan:
    "docs/plans3/v509-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-archive-roadmap.md",
  v509ArchiveJson:
    "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v508-http.json",
  v509ArchiveMarkdown:
    "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v508-http.md",
  v509ArchiveSummary:
    "e/509/evidence/java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-report-v509-archive-summary.json",
  v510Plan:
    "docs/plans3/v510-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification-roadmap.md",
  v510VerifierService:
    "src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.ts",
  v510VerifierRenderer:
    "src/services/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerificationRenderer.ts",
  v510VerifierTest:
    "test/javaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification.test.ts",
  v511Plan:
    "docs/plans3/v511-post-java-mini-kv-route-catalog-cleanup-fresh-baseline-evidence-archive-verification-route-roadmap.md",
  v511RouteFile: "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts",
  catalogSummary: "src/routes/auditJsonMarkdownRouteCatalogSummary.ts",
} as const;

export interface FreshBaselineBatchCloseoutFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v512";
  sourceNodeVersion: "Node v511";
  readyForRouteCatalogCleanupFreshBaselineBatchCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  closeoutOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  crossProjectMode: {
    java: "recommended-parallel-clean-v239-frozen";
    miniKv: "recommended-parallel-clean-v220-frozen";
    nodeWaitsForFreshSiblingEvidence: false;
  };
  closedVersions: readonly ["v507", "v508", "v509", "v510", "v511"];
  routeCatalog: {
    groupCount: 50;
    routeCount: 213;
    javaMiniKvDomainGroupCount: 5;
    javaMiniKvDomainRouteCount: 49;
    cleanupHandoffRouteGroupRouteCount: 15;
  };
  sourceArchive: {
    version: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    javaLatestCleanVersion: string;
    miniKvLatestCleanVersion: string;
    jsonSha256: string;
    markdownSha256: string;
    routeCount: number;
    javaMiniKvDomainRouteCount: number;
    cleanupHandoffRouteGroupRouteCount: number;
    executionAllowed: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
  };
  archiveVerification: {
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
  };
  files: Record<keyof typeof REQUIRED_ARTIFACTS, FreshBaselineBatchCloseoutFileReference>;
  checks: {
    closedVersionCountReady: boolean;
    v507ArtifactsPresent: boolean;
    v508ArtifactsPresent: boolean;
    v509ArchiveArtifactsPresent: boolean;
    v509ArchiveReady: boolean;
    v509ArchiveChecksPassed: boolean;
    v510VerifierArtifactsPresent: boolean;
    v510VerifierReady: boolean;
    v511RouteArtifactsPresent: boolean;
    routeCatalogCountsRecorded: boolean;
    cleanupRouteGroupRouteRecorded: boolean;
    javaMiniKvParallelRecommended: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupFreshBaselineBatchCloseout: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    closedVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 213;
    javaMiniKvDomainRouteCount: 49;
    cleanupHandoffRouteGroupRouteCount: 15;
    sourceArchiveCheckCount: number;
    sourceArchivePassedCheckCount: number;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout(
  input: { config: AppConfig; projectRoot?: string },
): JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout {
  const projectRoot = input.projectRoot ?? process.cwd();
  const files = Object.fromEntries(Object.entries(REQUIRED_ARTIFACTS).map(([key, relativePath]) => [
    key,
    fileReference(projectRoot, relativePath),
  ])) as Record<keyof typeof REQUIRED_ARTIFACTS, FreshBaselineBatchCloseoutFileReference>;
  const archiveSummary = readJsonFile(projectRoot, REQUIRED_ARTIFACTS.v509ArchiveSummary);
  const routeFile = readTextFile(projectRoot, REQUIRED_ARTIFACTS.v511RouteFile);
  const catalogSummary = readTextFile(projectRoot, REQUIRED_ARTIFACTS.catalogSummary);
  const sourceArchive = createSourceArchive(archiveSummary);
  const archiveVerifier =
    loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification({
      config: input.config,
      projectRoot,
    });
  const archiveVerification = {
    ready: archiveVerifier.readyForRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification,
    checkCount: archiveVerifier.summary.checkCount,
    passedCheckCount: archiveVerifier.summary.passedCheckCount,
    activeNodeVersion: archiveVerifier.activeNodeVersion,
    sourceNodeVersion: archiveVerifier.sourceNodeVersion,
  };
  const checks = createChecks({
    files,
    sourceArchive,
    archiveVerification,
    routeFile,
    catalogSummary,
  });
  checks.readyForRouteCatalogCleanupFreshBaselineBatchCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupFreshBaselineBatchCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupFreshBaselineBatchCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup fresh baseline batch closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-fresh-baseline-batch-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v512",
    sourceNodeVersion: "Node v511",
    readyForRouteCatalogCleanupFreshBaselineBatchCloseout: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    closeoutOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    crossProjectMode: {
      java: "recommended-parallel-clean-v239-frozen",
      miniKv: "recommended-parallel-clean-v220-frozen",
      nodeWaitsForFreshSiblingEvidence: false,
    },
    closedVersions: ["v507", "v508", "v509", "v510", "v511"],
    routeCatalog: {
      groupCount: 50,
      routeCount: 213,
      javaMiniKvDomainGroupCount: 5,
      javaMiniKvDomainRouteCount: 49,
      cleanupHandoffRouteGroupRouteCount: 15,
    },
    sourceArchive,
    archiveVerification,
    files,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      closedVersionCount: 5,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 213,
      javaMiniKvDomainRouteCount: 49,
      cleanupHandoffRouteGroupRouteCount: 15,
      sourceArchiveCheckCount: sourceArchive.checkCount,
      sourceArchivePassedCheckCount: sourceArchive.passedCheckCount,
    },
    nextActions: ready
      ? [
        "Expose this batch closeout as a JSON/Markdown report in Node v513.",
        "Archive the v513 report before adding another verifier.",
        "Keep Java and mini-kv parallel; Node does not wait for fresh sibling evidence in v513.",
      ]
      : [
        "Repair missing v507-v511 artifacts before exposing a closeout report.",
        "Do not replace archived v509 evidence with a later rolling sibling fixture.",
      ],
  };
}

function createSourceArchive(json: Record<string, unknown> | null):
  JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout["sourceArchive"] {
  const files = objectField(json, "files");
  const jsonFile = objectField(files, "json");
  const markdownFile = objectField(files, "markdown");
  const boundaries = objectField(json, "boundaries");
  const routeCatalog = objectField(json, "routeCatalog");

  return {
    version: stringValue(valueAt(json, "version")),
    ready: valueAt(json, "ready") === true,
    checkCount: numberValue(valueAt(json, "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "passedCheckCount")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    javaLatestCleanVersion: stringValue(valueAt(json, "javaLatestCleanVersion")),
    miniKvLatestCleanVersion: stringValue(valueAt(json, "miniKvLatestCleanVersion")),
    jsonSha256: stringValue(valueAt(jsonFile, "sha256")),
    markdownSha256: stringValue(valueAt(markdownFile, "sha256")),
    routeCount: numberValue(valueAt(routeCatalog, "routeCount")),
    javaMiniKvDomainRouteCount: numberValue(valueAt(routeCatalog, "javaMiniKvDomainRouteCount")),
    cleanupHandoffRouteGroupRouteCount: numberValue(valueAt(routeCatalog, "cleanupHandoffRouteGroupRouteCount")),
    executionAllowed: valueAt(boundaries, "executionAllowed") === true,
    startsJavaService: valueAt(boundaries, "startsJavaService") === true,
    startsMiniKvService: valueAt(boundaries, "startsMiniKvService") === true,
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout["files"];
  sourceArchive: JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout["sourceArchive"];
  archiveVerification: JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout["archiveVerification"];
  routeFile: string;
  catalogSummary: string;
}): JavaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseout["checks"] {
  return {
    closedVersionCountReady: true,
    v507ArtifactsPresent:
      input.files.v507Plan.exists
      && input.files.v507EvidenceService.exists
      && input.files.v507EvidenceTest.exists,
    v508ArtifactsPresent:
      input.files.v508Plan.exists
      && input.files.v508ReportService.exists
      && input.files.v508ReportRenderer.exists,
    v509ArchiveArtifactsPresent:
      input.files.v509Plan.exists
      && input.files.v509ArchiveJson.exists
      && input.files.v509ArchiveMarkdown.exists
      && input.files.v509ArchiveSummary.exists,
    v509ArchiveReady:
      input.sourceArchive.version === "v509"
      && input.sourceArchive.ready
      && input.sourceArchive.activeNodeVersion === "Node v508"
      && input.sourceArchive.sourceNodeVersion === "Node v507"
      && input.sourceArchive.javaLatestCleanVersion === "Java v239"
      && input.sourceArchive.miniKvLatestCleanVersion === "v220",
    v509ArchiveChecksPassed:
      input.sourceArchive.checkCount === 9
      && input.sourceArchive.checkCount === input.sourceArchive.passedCheckCount
      && /^[a-f0-9]{64}$/.test(input.sourceArchive.jsonSha256)
      && /^[a-f0-9]{64}$/.test(input.sourceArchive.markdownSha256),
    v510VerifierArtifactsPresent:
      input.files.v510Plan.exists
      && input.files.v510VerifierService.exists
      && input.files.v510VerifierRenderer.exists
      && input.files.v510VerifierTest.exists,
    v510VerifierReady:
      input.archiveVerification.ready
      && input.archiveVerification.checkCount === input.archiveVerification.passedCheckCount
      && input.archiveVerification.activeNodeVersion === "Node v510"
      && input.archiveVerification.sourceNodeVersion === "Node v509",
    v511RouteArtifactsPresent:
      input.files.v511Plan.exists
      && input.files.v511RouteFile.exists,
    routeCatalogCountsRecorded:
      input.files.catalogSummary.exists
      && input.catalogSummary.includes("routeCount:")
      && input.catalogSummary.includes("\"java-mini-kv\":"),
    cleanupRouteGroupRouteRecorded:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_FRESH_BASELINE_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH")
      && input.routeFile.includes("loadJavaMiniKvRouteCatalogCleanupFreshBaselineEvidenceArchiveVerification"),
    javaMiniKvParallelRecommended: true,
    noRuntimeAuthorityOpened:
      !input.sourceArchive.executionAllowed
      && !input.sourceArchive.startsJavaService
      && !input.sourceArchive.startsMiniKvService,
    readyForRouteCatalogCleanupFreshBaselineBatchCloseout: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): FreshBaselineBatchCloseoutFileReference {
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
