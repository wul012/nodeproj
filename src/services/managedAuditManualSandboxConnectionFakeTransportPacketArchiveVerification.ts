import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.js";
import type {
  ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
} from "./managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketTypes.js";
import type {
  FakeTransportPacketArchiveEvidence,
  FakeTransportPacketArchiveFileEvidence,
  FakeTransportPacketArchiveSnippetEvidence,
  FakeTransportPacketArchiveVerificationChecks,
  FakeTransportPacketArchiveVerificationMessage,
  ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile,
  SourceNodeV255FakeTransportPacketSummary,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification";
const SOURCE_NODE_V255_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-fake-transport-adapter-dry-run-verification-packet";
const ACTIVE_PLAN = "docs/plans/v255-post-fake-transport-dry-run-roadmap.md";

const ARCHIVE_PATHS = Object.freeze({
  html: "c/255/fake-transport-adapter-dry-run-verification-packet-v255.html",
  screenshot: "c/255/图片/fake-transport-adapter-dry-run-verification-packet-v255.png",
  explanation: "c/255/解释/fake-transport-adapter-dry-run-verification-packet-v255.md",
  walkthrough: "代码讲解记录_生产雏形阶段/259-fake-transport-adapter-dry-run-verification-packet-v255.md",
  activePlan: ACTIVE_PLAN,
});

const WORKSPACE_ROOT = "D:/nodeproj/orderops-node/";

export function loadManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerificationProfile {
  const sourceNodeV255 = createSourceNodeV255(
    loadManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket({ config: input.config }),
  );
  const archivedEvidence = createArchiveEvidence();
  const checks = createChecks(input.config, sourceNodeV255, archivedEvidence);
  checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification")
    .every(([, value]) => value);
  const archiveVerificationState = checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification
    ? "fake-transport-packet-archive-verification-ready"
    : "blocked";
  const archiveVerificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    archiveVerificationState,
    sourceNodeV255,
    fileDigests: archivedEvidence.files.map((file) => ({ id: file.id, digest: file.digest })),
    snippetMatches: archivedEvidence.snippetMatches.map((snippet) => ({ id: snippet.id, matched: snippet.matched })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection fake transport packet archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState,
    readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification:
      checks.readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyArchiveVerification: true,
    archiveVerificationRerunsFakeTransportBehavior: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV255,
    archivedEvidence,
    archiveVerification: {
      archiveVerificationDigest,
      evidenceSpan: "Node v255 fake transport adapter dry-run packet archive",
      sourcePacketDigest: sourceNodeV255.packetDigest,
      sourceRequestDigest: sourceNodeV255.requestDigest,
      sourceResponseDigest: sourceNodeV255.responseDigest,
      sourceRoutePath: SOURCE_NODE_V255_ROUTE,
      archiveVerificationReadsFilesOnly: true,
      archiveVerificationRerunsFakeTransportBehavior: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionAuditAllowed: false,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      archiveFileCount: archivedEvidence.files.length,
      requiredSnippetCount: archivedEvidence.requiredSnippetCount,
      matchedSnippetCount: archivedEvidence.matchedSnippetCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV255Json: SOURCE_NODE_V255_ROUTE,
      sourceNodeV255Markdown: `${SOURCE_NODE_V255_ROUTE}?format=markdown`,
      sourceHtmlArchive: ARCHIVE_PATHS.html,
      sourceScreenshot: ARCHIVE_PATHS.screenshot,
      sourceExplanation: ARCHIVE_PATHS.explanation,
      sourceCodeWalkthrough: ARCHIVE_PATHS.walkthrough,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Run Java v103 and mini-kv v112 in the recommended parallel round; both should only echo or prove non-participation for the v255 packet.",
      "Do not start Node v257 until Java v103 and mini-kv v112 evidence is committed and still no-write/no-credential/no-connection.",
      "Keep real managed audit endpoint, credential resolver, and schema migration execution blocked until a later explicit plan.",
    ],
  };
}

function createSourceNodeV255(
  source: ManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacketProfile,
): SourceNodeV255FakeTransportPacketSummary {
  const packet = source.fakeTransportDryRunPacket;

  return {
    sourceVersion: "Node v255",
    profileVersion: source.profileVersion,
    packetState: source.packetState,
    readyForFakeTransportPacket: source.readyForManagedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket,
    packetDigest: packet.packetDigest,
    requestDigest: packet.request.requestDigest,
    responseDigest: packet.response.responseDigest,
    requestShapeFieldCount: packet.request.requestShapeFieldCount,
    responseShapeFieldCount: packet.response.responseShapeFieldCount,
    failureMappingCount: packet.failureMappingVerification.mappedFailureCount,
    timeoutBudgetMs: packet.timeoutBudget.timeoutBudgetMs,
    cleanupArtifactCount: packet.cleanup.cleanupArtifactCount,
    cleanupVerified: packet.cleanup.cleanupVerified,
    temporaryDirectoryCreated: packet.cleanup.temporaryDirectoryCreated,
    temporaryFileCreated: packet.cleanup.temporaryFileCreated,
    fakeTransportOnly: source.fakeTransportOnly,
    connectionAttempted: packet.boundaries.connectionAttempted,
    externalRequestSent: packet.boundaries.externalRequestSent,
    credentialValueRead: packet.boundaries.credentialValueRead,
    schemaMigrationExecuted: packet.boundaries.schemaMigrationExecuted,
    productionRecordWritten: packet.boundaries.productionRecordWritten,
    javaStarted: packet.boundaries.javaStarted,
    miniKvStarted: packet.boundaries.miniKvStarted,
  };
}

function createArchiveEvidence(): FakeTransportPacketArchiveEvidence {
  const files = [
    fileEvidence("html-archive", ARCHIVE_PATHS.html),
    fileEvidence("screenshot", ARCHIVE_PATHS.screenshot),
    fileEvidence("explanation", ARCHIVE_PATHS.explanation),
    fileEvidence("code-walkthrough", ARCHIVE_PATHS.walkthrough),
    fileEvidence("active-plan", ARCHIVE_PATHS.activePlan),
  ];
  const snippetMatches = createSnippetEvidence();

  return {
    archiveRoot: "c/255/",
    sourceVersion: "Node v255",
    files,
    requiredSnippetCount: snippetMatches.length,
    matchedSnippetCount: snippetMatches.filter((snippet) => snippet.matched).length,
    snippetMatches,
  };
}

function fileEvidence(id: string, workspacePath: string): FakeTransportPacketArchiveFileEvidence {
  const historicalPath = toHistoricalPath(workspacePath);
  const resolvedPath = resolveHistoricalEvidencePath(historicalPath);
  try {
    const content = readHistoricalEvidenceFile(historicalPath);
    return {
      id,
      workspacePath,
      historicalPath,
      resolvedPath,
      exists: true,
      sizeBytes: statHistoricalEvidence(historicalPath).size,
      digest: createHash("sha256").update(content).digest("hex"),
    };
  } catch {
    return {
      id,
      workspacePath,
      historicalPath,
      resolvedPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
}

function createSnippetEvidence(): FakeTransportPacketArchiveSnippetEvidence[] {
  return [
    snippet("html-title", ARCHIVE_PATHS.html, "Node v255 fake transport adapter dry-run verification packet"),
    snippet("html-real-connection-blocked", ARCHIVE_PATHS.html, "Real connection"),
    snippet("html-test-only-code", ARCHIVE_PATHS.html, "TEST_ONLY_FAKE_TRANSPORT_DRY_RUN"),
    snippet("html-cleanup", ARCHIVE_PATHS.html, "in-memory only, no temporary directory or file created"),
    snippet("explanation-profile", ARCHIVE_PATHS.explanation, '"packetState": "fake-transport-adapter-dry-run-verification-packet-ready"'),
    snippet("explanation-cleanup", ARCHIVE_PATHS.explanation, "cleanupVerified=true"),
    snippet("explanation-no-temp-dir", ARCHIVE_PATHS.explanation, "temporaryDirectoryCreated=false"),
    snippet("explanation-no-temp-file", ARCHIVE_PATHS.explanation, "temporaryFileCreated=false"),
    snippet("explanation-smoke", ARCHIVE_PATHS.explanation, "safe HTTP smoke -> passed"),
    snippet("explanation-screenshot", ARCHIVE_PATHS.explanation, "Chrome screenshot -> c/255/图片/fake-transport-adapter-dry-run-verification-packet-v255.png"),
    snippet("walkthrough-service", ARCHIVE_PATHS.walkthrough, "src/services/managedAuditManualSandboxConnectionFakeTransportAdapterDryRunVerificationPacket.ts"),
    snippet("walkthrough-request", ARCHIVE_PATHS.walkthrough, "createDryRunRequest()"),
    snippet("walkthrough-response", ARCHIVE_PATHS.walkthrough, "createDryRunResponse()"),
    snippet("walkthrough-cleanup", ARCHIVE_PATHS.walkthrough, "cleanup"),
    snippet("walkthrough-tests", ARCHIVE_PATHS.walkthrough, "npm test -> 195 files passed, 654 tests passed"),
    snippet("plan-v256", ARCHIVE_PATHS.activePlan, "Node v256：fake transport packet archive verification"),
    snippet("plan-v256-archive-only", ARCHIVE_PATHS.activePlan, "只做归档完整性与 packet digest 验证"),
    snippet("plan-no-rerun", ARCHIVE_PATHS.activePlan, "不重新推进 fake transport 行为"),
    snippet("plan-parallel-java-mini-kv", ARCHIVE_PATHS.activePlan, "推荐并行：Java v103 + mini-kv v112"),
  ];
}

function snippet(
  id: string,
  workspacePath: string,
  expectedText: string,
): FakeTransportPacketArchiveSnippetEvidence {
  const text = readUtf8(workspacePath);
  return {
    id,
    workspacePath,
    expectedText,
    matched: text.includes(expectedText),
  };
}

function readUtf8(workspacePath: string): string {
  try {
    return readHistoricalEvidenceFile(toHistoricalPath(workspacePath), "utf8");
  } catch {
    return "";
  }
}

function createChecks(
  config: AppConfig,
  sourceNodeV255: SourceNodeV255FakeTransportPacketSummary,
  archivedEvidence: FakeTransportPacketArchiveEvidence,
): FakeTransportPacketArchiveVerificationChecks {
  const fileById = new Map(archivedEvidence.files.map((file) => [file.id, file]));
  const snippetMatched = (id: string) => archivedEvidence.snippetMatches.some(
    (snippetMatch) => snippetMatch.id === id && snippetMatch.matched,
  );
  const digestValid = (digest: string) => /^[a-f0-9]{64}$/.test(digest);

  return {
    sourceNodeV255Ready: sourceNodeV255.readyForFakeTransportPacket
      && sourceNodeV255.packetState === "fake-transport-adapter-dry-run-verification-packet-ready",
    sourcePacketDigestValid: digestValid(sourceNodeV255.packetDigest),
    sourceRequestDigestValid: digestValid(sourceNodeV255.requestDigest),
    sourceResponseDigestValid: digestValid(sourceNodeV255.responseDigest),
    sourceCleanupEvidenceVerified: sourceNodeV255.cleanupVerified
      && sourceNodeV255.cleanupArtifactCount === 0
      && !sourceNodeV255.temporaryDirectoryCreated
      && !sourceNodeV255.temporaryFileCreated,
    archiveFilesPresent: archivedEvidence.files.every((file) => file.exists),
    archiveFilesNonEmpty: archivedEvidence.files.every((file) => file.sizeBytes > 0),
    htmlArchivePresent: fileById.get("html-archive")?.exists === true,
    screenshotPresent: fileById.get("screenshot")?.exists === true,
    screenshotNonEmpty: (fileById.get("screenshot")?.sizeBytes ?? 0) > 0,
    explanationPresent: fileById.get("explanation")?.exists === true,
    codeWalkthroughPresent: fileById.get("code-walkthrough")?.exists === true,
    archiveSnippetsMatched: archivedEvidence.matchedSnippetCount === archivedEvidence.requiredSnippetCount,
    htmlRecordsFakeTransportBlocked: snippetMatched("html-title")
      && snippetMatched("html-real-connection-blocked")
      && snippetMatched("html-test-only-code"),
    explanationRecordsSmokeAndCleanup: snippetMatched("explanation-profile")
      && snippetMatched("explanation-cleanup")
      && snippetMatched("explanation-no-temp-dir")
      && snippetMatched("explanation-no-temp-file")
      && snippetMatched("explanation-smoke")
      && snippetMatched("explanation-screenshot"),
    walkthroughRecordsImplementationAndVerification: snippetMatched("walkthrough-service")
      && snippetMatched("walkthrough-request")
      && snippetMatched("walkthrough-response")
      && snippetMatched("walkthrough-cleanup")
      && snippetMatched("walkthrough-tests"),
    planPointsToV256: snippetMatched("plan-v256")
      && snippetMatched("plan-v256-archive-only")
      && snippetMatched("plan-no-rerun")
      && snippetMatched("plan-parallel-java-mini-kv"),
    routeResponseVerified: sourceNodeV255.requestShapeFieldCount === 8
      && sourceNodeV255.responseShapeFieldCount === 9
      && sourceNodeV255.failureMappingCount === 6
      && sourceNodeV255.timeoutBudgetMs === 15000,
    noArchiveVerificationFakeTransportRerun: true,
    noTempDryRunDirectoryCreated: true,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionFakeTransportPacketArchiveVerification: false,
  };
}

function collectProductionBlockers(
  checks: FakeTransportPacketArchiveVerificationChecks,
): FakeTransportPacketArchiveVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: FakeTransportPacketArchiveVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV255Ready,
      code: "SOURCE_NODE_V255_NOT_READY",
      source: "node-v255-fake-transport-packet",
      message: "Node v255 fake transport dry-run packet must be ready before archive verification.",
    },
    {
      condition: checks.archiveFilesPresent,
      code: "V255_ARCHIVE_FILES_MISSING",
      source: "node-v255-archive",
      message: "v255 HTML, screenshot, explanation, code walkthrough, or plan evidence is missing.",
    },
    {
      condition: checks.archiveFilesNonEmpty,
      code: "V255_ARCHIVE_FILES_EMPTY",
      source: "node-v255-archive",
      message: "Every v255 archive file must be non-empty.",
    },
    {
      condition: checks.archiveSnippetsMatched,
      code: "V255_ARCHIVE_SNIPPETS_MISSING",
      source: "node-v255-archive",
      message: "v255 archive evidence must include fake transport, cleanup, smoke, walkthrough, and plan snippets.",
    },
    {
      condition: checks.sourceCleanupEvidenceVerified,
      code: "SOURCE_CLEANUP_EVIDENCE_MISSING",
      source: "node-v255-fake-transport-packet",
      message: "v255 must prove cleanupArtifactCount=0 and no temporary dry-run files were created.",
    },
    {
      condition: checks.planPointsToV256,
      code: "ACTIVE_PLAN_DOES_NOT_POINT_TO_V256",
      source: "v255-plan",
      message: "The active plan must identify v256 as archive verification only.",
    },
    {
      condition: checks.routeResponseVerified,
      code: "SOURCE_ROUTE_RESPONSE_NOT_VERIFIED",
      source: "node-v255-fake-transport-packet",
      message: "v255 route response must retain request/response/failure/timeout counts before archive verification.",
    },
    {
      condition: checks.noArchiveVerificationFakeTransportRerun,
      code: "ARCHIVE_VERIFICATION_RERAN_FAKE_TRANSPORT",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
      message: "v256 archive verification must not rerun fake transport behavior.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v256 archive verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): FakeTransportPacketArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
      message: "This profile verifies v255 archive files and route shape only; it does not introduce a real transport client.",
    },
  ];
}

function collectRecommendations(): FakeTransportPacketArchiveVerificationMessage[] {
  return [
    {
      code: "RUN_PARALLEL_JAVA_V103_MINI_KV_V112",
      severity: "recommendation",
      source: "v255-plan",
      message: "Next round should run Java v103 and mini-kv v112 in parallel because both only consume v255 read-only evidence.",
    },
    {
      code: "KEEP_V257_DEPENDENT_ON_BOTH_RECEIPTS",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-fake-transport-packet-archive-verification",
      message: "Node v257 should wait for both Java v103 echo and mini-kv v112 non-participation evidence.",
    },
  ];
}

function toHistoricalPath(workspacePath: string): string {
  return `${WORKSPACE_ROOT}${workspacePath}`;
}
