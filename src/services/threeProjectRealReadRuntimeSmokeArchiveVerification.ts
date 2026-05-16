import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { IncomingHttpHeaders } from "node:http";

import type { MiniKvClient } from "../clients/miniKvClient.js";
import type { OrderPlatformClient } from "../clients/orderPlatformClient.js";
import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadThreeProjectRealReadRuntimeSmokeExecutionPacket,
  type ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile,
} from "./threeProjectRealReadRuntimeSmokeExecutionPacket.js";

export interface ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1";
  verificationState: "verified-real-read-runtime-smoke-archive" | "blocked";
  readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: boolean;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  verification: {
    verificationDigest: string;
    sourceExecutionPacketProfileVersion: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["profileVersion"];
    sourceExecutionPacketState: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["packetState"];
    sourceExecutionPacketDigest: string;
    archivedExecutionDigest: "1bb5dcd900100feb0ce0bccb96a9db371c03f90cab7199edc98433b5a21f36c1";
    archiveRoot: "c/205";
    evidenceSpan: "Node v205 + Java v73 + mini-kv v82";
    runtimeSmokeExecutedInSource: boolean;
    archiveVerificationRerunsUpstreams: false;
    upstreamActionsEnabled: boolean;
    productionWindowAllowed: false;
  };
  archivedEvidence: {
    files: ArchiveFileEvidence[];
    expectedSnippetCount: number;
    matchedSnippetCount: number;
    snippetMatches: ArchiveSnippetEvidence[];
  };
  closedWindowRecheck: {
    packetState: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile["packetState"];
    attemptedTargetCount: number;
    skippedTargetCount: number;
    realRuntimeSmokeExecuted: boolean;
    productionWindowReady: false;
    archiveVerificationReusedEndpointShape: boolean;
  };
  checks: {
    sourcePacketProfileVersionValid: boolean;
    sourcePacketClosedWindowSafe: boolean;
    sourcePacketDigestValid: boolean;
    archivedDigestDocumented: boolean;
    archiveFilesPresent: boolean;
    archiveFilesNonEmpty: boolean;
    screenshotPresent: boolean;
    screenshotNonEmpty: boolean;
    htmlArchivePresent: boolean;
    explanationMentionsExecutedPass: boolean;
    explanationMentionsEightTargets: boolean;
    explanationMentionsCleanup: boolean;
    walkthroughPresent: boolean;
    walkthroughMentionsRuntimeBoundary: boolean;
    planMarksV205Done: boolean;
    planPointsToV206: boolean;
    noArchiveVerificationUpstreamRerun: boolean;
    upstreamActionsStillDisabled: boolean;
    productionWindowStillBlocked: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: boolean;
  };
  summary: {
    checkCount: number;
    passedCheckCount: number;
    archiveFileCount: number;
    snippetMatchCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ArchiveVerificationMessage[];
  warnings: ArchiveVerificationMessage[];
  recommendations: ArchiveVerificationMessage[];
  evidenceEndpoints: {
    archiveVerificationJson: string;
    archiveVerificationMarkdown: string;
    sourceExecutionPacketJson: string;
    sourceExecutionPacketMarkdown: string;
    archiveExplanation: string;
    archiveScreenshot: string;
    codeWalkthrough: string;
  };
  nextActions: string[];
}

interface ArchiveFileEvidence {
  id: string;
  path: string;
  exists: boolean;
  sizeBytes: number;
  digest: string | null;
}

interface ArchiveSnippetEvidence {
  id: string;
  path: string;
  expectedText: string;
  matched: boolean;
}

interface ArchiveVerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "three-project-real-read-runtime-smoke-archive-verification"
    | "three-project-real-read-runtime-smoke-execution-packet"
    | "v205-archive"
    | "v205-plan"
    | "runtime-config";
  message: string;
}

const ARCHIVED_EXECUTION_DIGEST = "1bb5dcd900100feb0ce0bccb96a9db371c03f90cab7199edc98433b5a21f36c1" as const;

const ENDPOINTS = Object.freeze({
  archiveVerificationJson: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification",
  archiveVerificationMarkdown: "/api/v1/production/three-project-real-read-runtime-smoke-archive-verification?format=markdown",
  sourceExecutionPacketJson: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet",
  sourceExecutionPacketMarkdown: "/api/v1/production/three-project-real-read-runtime-smoke-execution-packet?format=markdown",
  archiveExplanation: "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md",
  archiveScreenshot: "c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png",
  codeWalkthrough: "代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md",
});

export async function loadThreeProjectRealReadRuntimeSmokeArchiveVerification(input: {
  config: AppConfig;
  orderPlatform: OrderPlatformClient;
  miniKv: MiniKvClient;
  headers?: IncomingHttpHeaders;
}): Promise<ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile> {
  const closedWindowPacket = await loadThreeProjectRealReadRuntimeSmokeExecutionPacket({
    ...input,
    config: {
      ...input.config,
      upstreamProbesEnabled: false,
    },
  });
  const files = createArchiveFileEvidence();
  const snippetMatches = createSnippetEvidence();
  const checks = createChecks(input.config, closedWindowPacket, files, snippetMatches);
  checks.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForThreeProjectRealReadRuntimeSmokeArchiveVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification
    ? "verified-real-read-runtime-smoke-archive"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1",
    verificationState,
    sourceExecutionPacketState: closedWindowPacket.packetState,
    sourceExecutionPacketDigest: closedWindowPacket.smokeSession.executionDigest,
    archivedExecutionDigest: ARCHIVED_EXECUTION_DIGEST,
    archiveFileDigests: files.map((file) => file.digest),
    snippetMatches: snippetMatches.map((snippet) => ({ id: snippet.id, matched: snippet.matched })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(verificationState);
  const recommendations = collectRecommendations(verificationState);

  return {
    service: "orderops-node",
    title: "Three-project real-read runtime smoke archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "three-project-real-read-runtime-smoke-archive-verification.v1",
    verificationState,
    readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: checks.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      sourceExecutionPacketProfileVersion: closedWindowPacket.profileVersion,
      sourceExecutionPacketState: closedWindowPacket.packetState,
      sourceExecutionPacketDigest: closedWindowPacket.smokeSession.executionDigest,
      archivedExecutionDigest: ARCHIVED_EXECUTION_DIGEST,
      archiveRoot: "c/205",
      evidenceSpan: "Node v205 + Java v73 + mini-kv v82",
      runtimeSmokeExecutedInSource: true,
      archiveVerificationRerunsUpstreams: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionWindowAllowed: false,
    },
    archivedEvidence: {
      files,
      expectedSnippetCount: snippetMatches.length,
      matchedSnippetCount: snippetMatches.filter((snippet) => snippet.matched).length,
      snippetMatches,
    },
    closedWindowRecheck: {
      packetState: closedWindowPacket.packetState,
      attemptedTargetCount: closedWindowPacket.smokeSession.attemptedTargetCount,
      skippedTargetCount: closedWindowPacket.smokeSession.skippedTargetCount,
      realRuntimeSmokeExecuted: closedWindowPacket.smokeSession.realRuntimeSmokeExecuted,
      productionWindowReady: false,
      archiveVerificationReusedEndpointShape: closedWindowPacket.profileVersion === "three-project-real-read-runtime-smoke-execution-packet.v1",
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      archiveFileCount: files.length,
      snippetMatchCount: snippetMatches.filter((snippet) => snippet.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Treat v206 as archive verification only; it does not reopen the v205 real-read runtime smoke.",
      "Create the next plan before adding more real-read summary checks, so the project moves toward production hardening instead of repeating archive packets.",
      "Keep production writes blocked until managed audit storage, real identity, approval records, and rollback controls are integrated.",
    ],
  };
}

export function renderThreeProjectRealReadRuntimeSmokeArchiveVerificationMarkdown(
  profile: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile,
): string {
  return [
    "# Three-project real-read runtime smoke archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for archive verification: ${profile.readyForThreeProjectRealReadRuntimeSmokeArchiveVerification}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Archived Evidence",
    "",
    ...profile.archivedEvidence.files.flatMap(renderArchiveFile),
    "",
    "## Snippet Matches",
    "",
    ...profile.archivedEvidence.snippetMatches.flatMap(renderSnippet),
    "",
    "## Closed Window Recheck",
    "",
    ...renderEntries(profile.closedWindowRecheck),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No three-project runtime smoke archive verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No three-project runtime smoke archive verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No three-project runtime smoke archive verification recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createArchiveFileEvidence(): ArchiveFileEvidence[] {
  return [
    fileEvidence("archive-html", "c/205/three-project-real-read-runtime-smoke-execution-packet-v205.html"),
    fileEvidence("archive-screenshot", "c/205/图片/three-project-real-read-runtime-smoke-execution-packet-v205.png"),
    fileEvidence("archive-explanation", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md"),
    fileEvidence("code-walkthrough", "代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md"),
    fileEvidence("plan-roadmap", "docs/plans/v203-post-ci-artifact-retention-roadmap.md"),
  ];
}

function createSnippetEvidence(): ArchiveSnippetEvidence[] {
  return [
    snippetEvidence("archive-executed-pass", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md", "packetState=executed-pass"),
    snippetEvidence("archive-eight-targets", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md", "passedTargetCount=8"),
    snippetEvidence("archive-cleanup", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md", "本轮启动的 Java、mini-kv、Node 进程：已停止"),
    snippetEvidence("archive-digest", "c/205/解释/three-project-real-read-runtime-smoke-execution-packet-v205.md", ARCHIVED_EXECUTION_DIGEST),
    snippetEvidence("walkthrough-boundary", "代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md", "不可以把 smoke 结果当成生产窗口授权"),
    snippetEvidence("walkthrough-temp-build", "代码讲解记录_生产雏形阶段/209-three-project-real-read-runtime-smoke-execution-packet-v205.md", ".tmp/mini-kv-build-v82"),
    snippetEvidence("plan-v205-complete", "docs/plans/v203-post-ci-artifact-retention-roadmap.md", "Node v205：three-project real-read runtime smoke execution packet。已完成。"),
    snippetEvidence("plan-v206-complete", "docs/plans/v203-post-ci-artifact-retention-roadmap.md", "Node v206：real-read runtime smoke archive verification。已完成。"),
    snippetEvidence("plan-post-v206-next", "docs/plans/v206-post-real-read-archive-verification-roadmap.md", "Node v207：post-real-read production hardening triage。"),
  ];
}

function createChecks(
  config: AppConfig,
  packet: ThreeProjectRealReadRuntimeSmokeExecutionPacketProfile,
  files: ArchiveFileEvidence[],
  snippets: ArchiveSnippetEvidence[],
): ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["checks"] {
  const fileById = new Map(files.map((file) => [file.id, file]));
  const snippetById = new Map(snippets.map((snippet) => [snippet.id, snippet]));
  return {
    sourcePacketProfileVersionValid: packet.profileVersion === "three-project-real-read-runtime-smoke-execution-packet.v1",
    sourcePacketClosedWindowSafe: packet.packetState === "closed-window-skipped"
      && packet.smokeSession.realRuntimeSmokeExecuted === false
      && packet.smokeSession.attemptedTargetCount === 0
      && packet.smokeSession.skippedTargetCount === 8,
    sourcePacketDigestValid: /^[a-f0-9]{64}$/.test(packet.smokeSession.executionDigest),
    archivedDigestDocumented: snippetById.get("archive-digest")?.matched === true,
    archiveFilesPresent: files.every((file) => file.exists),
    archiveFilesNonEmpty: files.every((file) => file.sizeBytes > 0),
    screenshotPresent: fileById.get("archive-screenshot")?.exists === true,
    screenshotNonEmpty: (fileById.get("archive-screenshot")?.sizeBytes ?? 0) > 0,
    htmlArchivePresent: fileById.get("archive-html")?.exists === true,
    explanationMentionsExecutedPass: snippetById.get("archive-executed-pass")?.matched === true,
    explanationMentionsEightTargets: snippetById.get("archive-eight-targets")?.matched === true,
    explanationMentionsCleanup: snippetById.get("archive-cleanup")?.matched === true,
    walkthroughPresent: fileById.get("code-walkthrough")?.exists === true,
    walkthroughMentionsRuntimeBoundary: snippetById.get("walkthrough-boundary")?.matched === true
      && snippetById.get("walkthrough-temp-build")?.matched === true,
    planMarksV205Done: snippetById.get("plan-v205-complete")?.matched === true,
    planPointsToV206: snippetById.get("plan-v206-complete")?.matched === true
      && snippetById.get("plan-post-v206-next")?.matched === true,
    noArchiveVerificationUpstreamRerun: packet.smokeSession.realRuntimeSmokeExecuted === false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionWindowStillBlocked: packet.readyForProductionWindow === false,
    readyForProductionOperationsStillFalse: packet.readyForProductionOperations === false,
    readyForThreeProjectRealReadRuntimeSmokeArchiveVerification: false,
  };
}

function fileEvidence(id: string, relativePath: string): ArchiveFileEvidence {
  const absolutePath = path.join(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    return {
      id,
      path: relativePath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
  const bytes = readFileSync(absolutePath);
  return {
    id,
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    digest: sha256StableJson({
      path: relativePath,
      contentSha256: sha256StableJson(bytes.toString("base64")),
    }),
  };
}

function snippetEvidence(id: string, relativePath: string, expectedText: string): ArchiveSnippetEvidence {
  const absolutePath = path.join(process.cwd(), relativePath);
  const content = existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
  return {
    id,
    path: relativePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function collectProductionBlockers(
  checks: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["checks"],
): ArchiveVerificationMessage[] {
  const blockers: ArchiveVerificationMessage[] = [];
  addMessage(blockers, checks.sourcePacketProfileVersionValid, "SOURCE_PACKET_PROFILE_VERSION_INVALID", "three-project-real-read-runtime-smoke-execution-packet", "v206 must verify the v205 execution packet shape.");
  addMessage(blockers, checks.sourcePacketClosedWindowSafe, "SOURCE_PACKET_RECHECK_NOT_CLOSED_WINDOW", "three-project-real-read-runtime-smoke-execution-packet", "Archive verification must recheck the v205 endpoint in closed-window mode without rerunning upstreams.");
  addMessage(blockers, checks.sourcePacketDigestValid, "SOURCE_PACKET_DIGEST_INVALID", "three-project-real-read-runtime-smoke-execution-packet", "Source packet digest must remain a sha256 hex digest.");
  addMessage(blockers, checks.archivedDigestDocumented, "ARCHIVED_DIGEST_NOT_DOCUMENTED", "v205-archive", "v205 archive must document the real-read execution digest.");
  addMessage(blockers, checks.archiveFilesPresent, "ARCHIVE_FILE_MISSING", "v205-archive", "All v205 archive files must exist.");
  addMessage(blockers, checks.archiveFilesNonEmpty, "ARCHIVE_FILE_EMPTY", "v205-archive", "All v205 archive files must be non-empty.");
  addMessage(blockers, checks.screenshotPresent, "SCREENSHOT_MISSING", "v205-archive", "v205 screenshot must exist.");
  addMessage(blockers, checks.screenshotNonEmpty, "SCREENSHOT_EMPTY", "v205-archive", "v205 screenshot must be non-empty.");
  addMessage(blockers, checks.htmlArchivePresent, "HTML_ARCHIVE_MISSING", "v205-archive", "v205 HTML archive must exist.");
  addMessage(blockers, checks.explanationMentionsExecutedPass, "EXECUTED_PASS_NOT_ARCHIVED", "v205-archive", "v205 explanation must record executed-pass.");
  addMessage(blockers, checks.explanationMentionsEightTargets, "EIGHT_TARGETS_NOT_ARCHIVED", "v205-archive", "v205 explanation must record eight passed targets.");
  addMessage(blockers, checks.explanationMentionsCleanup, "CLEANUP_NOT_ARCHIVED", "v205-archive", "v205 explanation must record process cleanup.");
  addMessage(blockers, checks.walkthroughPresent, "WALKTHROUGH_MISSING", "v205-archive", "v205 code walkthrough must exist.");
  addMessage(blockers, checks.walkthroughMentionsRuntimeBoundary, "WALKTHROUGH_BOUNDARY_INCOMPLETE", "v205-archive", "v205 walkthrough must explain runtime boundary and temp mini-kv build.");
  addMessage(blockers, checks.planMarksV205Done, "PLAN_DOES_NOT_MARK_V205_DONE", "v205-plan", "Plan must mark v205 complete.");
  addMessage(blockers, checks.planPointsToV206, "PLAN_DOES_NOT_POINT_TO_V206", "v205-plan", "Plan must identify v206 as archive verification.");
  addMessage(blockers, checks.noArchiveVerificationUpstreamRerun, "ARCHIVE_VERIFICATION_RERAN_UPSTREAMS", "three-project-real-read-runtime-smoke-archive-verification", "Archive verification must not rerun Java or mini-kv reads.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionWindowStillBlocked, "PRODUCTION_WINDOW_UNLOCKED", "runtime-config", "Archive verification must not unlock the production window.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "runtime-config", "Archive verification must not unlock production operations.");
  return blockers;
}

function collectWarnings(
  verificationState: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["verificationState"],
): ArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked" ? "ARCHIVE_VERIFICATION_BLOCKED" : "V205_ARCHIVE_VERIFIED",
      severity: "warning",
      source: "three-project-real-read-runtime-smoke-archive-verification",
      message: verificationState === "blocked"
        ? "v205 archive verification has blockers."
        : "v205 archive files, snippets, screenshot, and closed-window endpoint shape were verified.",
    },
  ];
}

function collectRecommendations(
  verificationState: ThreeProjectRealReadRuntimeSmokeArchiveVerificationProfile["verificationState"],
): ArchiveVerificationMessage[] {
  return [
    {
      code: verificationState === "blocked" ? "FIX_V205_ARCHIVE_VERIFICATION" : "CREATE_NEXT_REAL_READ_HARDENING_PLAN",
      severity: "recommendation",
      source: "three-project-real-read-runtime-smoke-archive-verification",
      message: verificationState === "blocked"
        ? "Fix v205 archive evidence before moving past this real-read stage."
        : "Create the next non-overlapping plan for production hardening instead of appending another archive-only summary.",
    },
  ];
}

function renderArchiveFile(file: ArchiveFileEvidence): string[] {
  return [
    `- ${file.id}: ${file.exists}`,
    `  - path: ${file.path}`,
    `  - sizeBytes: ${file.sizeBytes}`,
    `  - digest: ${file.digest ?? "missing"}`,
  ];
}

function renderSnippet(snippet: ArchiveSnippetEvidence): string[] {
  return [
    `- ${snippet.id}: ${snippet.matched}`,
    `  - path: ${snippet.path}`,
    `  - expectedText: ${snippet.expectedText}`,
  ];
}

function addMessage(
  messages: ArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: ArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
