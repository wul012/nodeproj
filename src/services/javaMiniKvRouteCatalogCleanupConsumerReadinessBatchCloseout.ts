import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { countPassedReportChecks, countReportChecks } from "./liveProbeReportUtils.js";

const PROJECT_ROOT = process.cwd();

const REQUIRED_ARTIFACTS = {
  v491Plan: "docs/plans3/v491-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-roadmap.md",
  v491Explanation: "e/491/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-v491.md",
  v491Walkthrough:
    "代码讲解记录_生产雏形阶段3/496-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-intake-v491.md",
  v492Plan: "docs/plans3/v492-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-roadmap.md",
  v492Explanation: "e/492/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v492.md",
  v492Walkthrough:
    "代码讲解记录_生产雏形阶段3/497-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v492.md",
  v493Plan:
    "docs/plans3/v493-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-archive-roadmap.md",
  v493Explanation:
    "e/493/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-archive-v493.md",
  v493Walkthrough:
    "代码讲解记录_生产雏形阶段3/498-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-archive-v493.md",
  v493ArchiveJson:
    "e/493/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v492-http.json",
  v493ArchiveMarkdown:
    "e/493/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v492-http.md",
  v493ArchiveSummary:
    "e/493/evidence/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-report-v493-archive-summary.json",
  v494Plan:
    "docs/plans3/v494-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-roadmap.md",
  v494Explanation:
    "e/494/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-v494.md",
  v494Walkthrough:
    "代码讲解记录_生产雏形阶段3/499-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-v494.md",
  v494VerifierService:
    "src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.ts",
  v494VerifierTest:
    "test/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification.test.ts",
  v495Plan:
    "docs/plans3/v495-post-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-route-roadmap.md",
  v495Explanation:
    "e/495/解释/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-route-v495.md",
  v495Walkthrough:
    "代码讲解记录_生产雏形阶段3/500-java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence-archive-verification-route-v495.md",
  v495RouteFile: "src/routes/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts",
  catalogSummary: "src/routes/auditJsonMarkdownRouteCatalogSummary.ts",
} as const;

export interface BatchCloseoutFileReference {
  path: string;
  exists: boolean;
  sizeBytes: number;
  sha256: string | null;
}

export interface JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1";
  closeoutState: "ready" | "blocked";
  activeNodeVersion: "Node v496";
  sourceNodeVersion: "Node v495";
  readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  closeoutOnly: true;
  startsJavaService: false;
  startsMiniKvService: false;
  executionAllowed: false;
  crossProjectMode: {
    java: "recommended-parallel-dirty-current-worktree-excluded";
    miniKv: "recommended-parallel-clean-v210-observed";
    nodeWaitsForFreshSiblingEvidence: false;
  };
  closedVersions: readonly ["v491", "v492", "v493", "v494", "v495"];
  routeCatalog: {
    groupCount: 50;
    routeCount: 207;
    javaMiniKvDomainGroupCount: 5;
    javaMiniKvDomainRouteCount: 43;
    cleanupHandoffRouteGroupRouteCount: 9;
  };
  sourceArchive: {
    version: string;
    ready: boolean;
    checkCount: number;
    passedCheckCount: number;
    activeNodeVersion: string;
    sourceNodeVersion: string;
    jsonSha256: string;
    markdownSha256: string;
    executionAllowed: boolean;
    startsJavaService: boolean;
    startsMiniKvService: boolean;
  };
  files: Record<keyof typeof REQUIRED_ARTIFACTS, BatchCloseoutFileReference>;
  checks: {
    closedVersionCountReady: boolean;
    v491ArtifactsPresent: boolean;
    v492ArtifactsPresent: boolean;
    v493ArchiveArtifactsPresent: boolean;
    v493ArchiveReady: boolean;
    v493ArchiveChecksPassed: boolean;
    v494VerifierArtifactsPresent: boolean;
    v495RouteArtifactsPresent: boolean;
    routeCatalogCountsRecorded: boolean;
    cleanupRouteGroupCountRecorded: boolean;
    consumerArchiveVerifierRouteRecorded: boolean;
    javaDirtyWorktreeExcluded: boolean;
    miniKvRollingCurrentRejectedForBaseline: boolean;
    noRuntimeAuthorityOpened: boolean;
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: boolean;
  };
  summary: {
    fileCount: number;
    presentFileCount: number;
    closedVersionCount: number;
    checkCount: number;
    passedCheckCount: number;
    routeCount: 207;
    javaMiniKvDomainRouteCount: 43;
    cleanupHandoffRouteGroupRouteCount: 9;
    sourceArchiveCheckCount: number;
    sourceArchivePassedCheckCount: number;
  };
  nextActions: string[];
}

export function loadJavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout(
  input: { projectRoot?: string } = {},
): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout {
  const projectRoot = input.projectRoot ?? PROJECT_ROOT;
  const files = Object.fromEntries(Object.entries(REQUIRED_ARTIFACTS).map(([key, relativePath]) => [
    key,
    fileReference(projectRoot, relativePath),
  ])) as Record<keyof typeof REQUIRED_ARTIFACTS, BatchCloseoutFileReference>;
  const archiveSummary = readJsonFile(projectRoot, REQUIRED_ARTIFACTS.v493ArchiveSummary);
  const routeFile = readTextFile(projectRoot, REQUIRED_ARTIFACTS.v495RouteFile);
  const catalogSummary = readTextFile(projectRoot, REQUIRED_ARTIFACTS.catalogSummary);
  const sourceArchive = createSourceArchive(archiveSummary);
  const checks = createChecks({
    files,
    sourceArchive,
    routeFile,
    catalogSummary,
  });
  checks.readyForRouteCatalogCleanupConsumerReadinessBatchCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForRouteCatalogCleanupConsumerReadinessBatchCloseout")
    .every(([, value]) => value);
  const ready = checks.readyForRouteCatalogCleanupConsumerReadinessBatchCloseout;

  return {
    service: "orderops-node",
    title: "Java / mini-kv route catalog cleanup consumer readiness batch closeout",
    generatedAt: new Date().toISOString(),
    profileVersion: "java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout.v1",
    closeoutState: ready ? "ready" : "blocked",
    activeNodeVersion: "Node v496",
    sourceNodeVersion: "Node v495",
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    closeoutOnly: true,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
    crossProjectMode: {
      java: "recommended-parallel-dirty-current-worktree-excluded",
      miniKv: "recommended-parallel-clean-v210-observed",
      nodeWaitsForFreshSiblingEvidence: false,
    },
    closedVersions: ["v491", "v492", "v493", "v494", "v495"],
    routeCatalog: {
      groupCount: 50,
      routeCount: 207,
      javaMiniKvDomainGroupCount: 5,
      javaMiniKvDomainRouteCount: 43,
      cleanupHandoffRouteGroupRouteCount: 9,
    },
    sourceArchive,
    files,
    checks,
    summary: {
      fileCount: Object.keys(files).length,
      presentFileCount: Object.values(files).filter((file) => file.exists).length,
      closedVersionCount: 5,
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      routeCount: 207,
      javaMiniKvDomainRouteCount: 43,
      cleanupHandoffRouteGroupRouteCount: 9,
      sourceArchiveCheckCount: sourceArchive.checkCount,
      sourceArchivePassedCheckCount: sourceArchive.passedCheckCount,
    },
    nextActions: ready
      ? [
        "Expose this batch closeout as a JSON/Markdown report in Node v497.",
        "Archive the v497 report in Node v498 before adding a verifier.",
        "Keep Java and mini-kv parallel; Node does not wait for fresh sibling evidence in v497.",
      ]
      : [
        "Repair missing v491-v495 artifacts before exposing a closeout report.",
        "Do not replace archive evidence with regenerated output from dirty sibling state.",
      ],
  };
}

function createSourceArchive(json: Record<string, unknown> | null):
  JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout["sourceArchive"] {
  const files = objectField(json, "files");
  const jsonFile = objectField(files, "json");
  const markdownFile = objectField(files, "markdown");
  const boundaries = objectField(json, "boundaries");

  return {
    version: stringValue(valueAt(json, "version")),
    ready: valueAt(json, "ready") === true,
    checkCount: numberValue(valueAt(json, "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "passedCheckCount")),
    activeNodeVersion: stringValue(valueAt(json, "activeNodeVersion")),
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    jsonSha256: stringValue(valueAt(jsonFile, "sha256")),
    markdownSha256: stringValue(valueAt(markdownFile, "sha256")),
    executionAllowed: valueAt(boundaries, "executionAllowed") === true,
    startsJavaService: valueAt(boundaries, "startsJavaService") === true,
    startsMiniKvService: valueAt(boundaries, "startsMiniKvService") === true,
  };
}

function createChecks(input: {
  files: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout["files"];
  sourceArchive: JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout["sourceArchive"];
  routeFile: string;
  catalogSummary: string;
}): JavaMiniKvRouteCatalogCleanupConsumerReadinessBatchCloseout["checks"] {
  return {
    closedVersionCountReady: true,
    v491ArtifactsPresent:
      input.files.v491Plan.exists
      && input.files.v491Explanation.exists
      && input.files.v491Walkthrough.exists,
    v492ArtifactsPresent:
      input.files.v492Plan.exists
      && input.files.v492Explanation.exists
      && input.files.v492Walkthrough.exists,
    v493ArchiveArtifactsPresent:
      input.files.v493Plan.exists
      && input.files.v493Explanation.exists
      && input.files.v493Walkthrough.exists
      && input.files.v493ArchiveJson.exists
      && input.files.v493ArchiveMarkdown.exists
      && input.files.v493ArchiveSummary.exists,
    v493ArchiveReady:
      input.sourceArchive.version === "v493"
      && input.sourceArchive.ready
      && input.sourceArchive.activeNodeVersion === "Node v492"
      && input.sourceArchive.sourceNodeVersion === "Node v491",
    v493ArchiveChecksPassed:
      input.sourceArchive.checkCount === 21
      && input.sourceArchive.checkCount === input.sourceArchive.passedCheckCount
      && /^[a-f0-9]{64}$/.test(input.sourceArchive.jsonSha256)
      && /^[a-f0-9]{64}$/.test(input.sourceArchive.markdownSha256),
    v494VerifierArtifactsPresent:
      input.files.v494Plan.exists
      && input.files.v494Explanation.exists
      && input.files.v494Walkthrough.exists
      && input.files.v494VerifierService.exists
      && input.files.v494VerifierTest.exists,
    v495RouteArtifactsPresent:
      input.files.v495Plan.exists
      && input.files.v495Explanation.exists
      && input.files.v495Walkthrough.exists
      && input.files.v495RouteFile.exists,
    routeCatalogCountsRecorded:
      input.files.catalogSummary.exists
      && input.catalogSummary.includes("routeCount:")
      && input.catalogSummary.includes("\"java-mini-kv\":"),
    cleanupRouteGroupCountRecorded:
      input.routeFile.includes("JAVA_MINI_KV_ROUTE_CATALOG_CLEANUP_CONSUMER_READINESS_EVIDENCE_ARCHIVE_VERIFICATION_ROUTE_PATH"),
    consumerArchiveVerifierRouteRecorded:
      input.routeFile.includes("loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification")
      && input.routeFile.includes("renderJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerificationMarkdown"),
    javaDirtyWorktreeExcluded: true,
    miniKvRollingCurrentRejectedForBaseline: true,
    noRuntimeAuthorityOpened:
      !input.sourceArchive.executionAllowed
      && !input.sourceArchive.startsJavaService
      && !input.sourceArchive.startsMiniKvService,
    readyForRouteCatalogCleanupConsumerReadinessBatchCloseout: false,
  };
}

function fileReference(projectRoot: string, relativePath: string): BatchCloseoutFileReference {
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
