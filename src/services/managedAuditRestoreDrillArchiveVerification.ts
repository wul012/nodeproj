import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";

export interface ManagedAuditRestoreDrillArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-restore-drill-archive-verification.v1";
  verificationState: "verified-restore-drill-archive" | "blocked";
  readyForManagedAuditRestoreDrillArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyVerification: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  archiveVerificationRerunsSourceEndpoint: false;
  automaticUpstreamStart: false;
  sourceArchive: {
    sourceVersion: "Node v213";
    sourceProfileVersion: "managed-audit-packet-restore-drill-plan.v1";
    archiveRoot: "c/213/";
    htmlArchive: "c/213/managed-audit-packet-restore-drill-plan-v213.html";
    screenshot: "c/213/\u56fe\u7247/managed-audit-packet-restore-drill-plan-v213.png";
    explanation: "c/213/\u89e3\u91ca/managed-audit-packet-restore-drill-plan-v213.md";
    codeWalkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/217-managed-audit-packet-restore-drill-plan-v213.md";
    activePlan: "docs/plans/v213-post-restore-drill-plan-roadmap.md";
    previousPlanCloseout: "docs/plans/v211-post-managed-audit-packet-roadmap.md";
  };
  verification: {
    verificationDigest: string;
    evidenceSpan: "Node v213 restore drill plan archive";
    sourceDrillState: "ready-for-manual-dry-run-plan";
    sourcePlanMode: "manual-dry-run-plan-only";
    sourcePacketSourceVersion: "Node v211";
    sourceVerificationSourceVersion: "Node v212";
    sourceJavaReceiptVersion: "Java v76";
    sourceMiniKvReceiptVersion: "mini-kv v85";
    sourceMiniKvMarkerDigest: "fnv1a64:1ea4570c967cfdb1";
    sourceRestoreExecutionAllowed: false;
    sourceConnectsManagedAudit: false;
    sourceAutomaticUpstreamStart: false;
    upstreamActionsEnabled: boolean;
    productionAuditAllowed: false;
    archiveVerificationReadsFilesOnly: true;
  };
  archivedEvidence: {
    files: ArchiveFileEvidence[];
    expectedSnippetCount: number;
    matchedSnippetCount: number;
    snippetMatches: ArchiveSnippetEvidence[];
  };
  checks: {
    archiveFilesPresent: boolean;
    archiveFilesNonEmpty: boolean;
    screenshotPresent: boolean;
    screenshotNonEmpty: boolean;
    htmlArchivePresent: boolean;
    explanationPresent: boolean;
    walkthroughPresent: boolean;
    sourceDrillStateRecorded: boolean;
    sourceReceiptsRecorded: boolean;
    httpSmokeRecorded: boolean;
    forbiddenOperationsRecorded: boolean;
    normalizedEvidenceHintsRecorded: boolean;
    previousPlanClosedOut: boolean;
    activePlanPointsToV214: boolean;
    activePlanAllowsParallelJavaMiniKvReceipts: boolean;
    noArchiveVerificationUpstreamRerun: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    restoreExecutionStillBlocked: boolean;
    readyForManagedAuditRestoreDrillArchiveVerification: boolean;
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
    sourceRestoreDrillPlanJson: string;
    sourceRestoreDrillPlanMarkdown: string;
    archiveExplanation: string;
    archiveScreenshot: string;
    archiveCodeWalkthrough: string;
    activePlan: string;
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
    | "managed-audit-restore-drill-archive-verification"
    | "v213-archive"
    | "v213-plan"
    | "v211-plan"
    | "runtime-config";
  message: string;
}

const ARCHIVE_PATHS = Object.freeze({
  html: "c/213/managed-audit-packet-restore-drill-plan-v213.html",
  screenshot: "c/213/\u56fe\u7247/managed-audit-packet-restore-drill-plan-v213.png",
  explanation: "c/213/\u89e3\u91ca/managed-audit-packet-restore-drill-plan-v213.md",
  walkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/217-managed-audit-packet-restore-drill-plan-v213.md",
  activePlan: "docs/plans/v213-post-restore-drill-plan-roadmap.md",
  previousPlanCloseout: "docs/plans/v211-post-managed-audit-packet-roadmap.md",
});

const ENDPOINTS = Object.freeze({
  archiveVerificationJson: "/api/v1/audit/managed-audit-restore-drill-archive-verification",
  archiveVerificationMarkdown: "/api/v1/audit/managed-audit-restore-drill-archive-verification?format=markdown",
  sourceRestoreDrillPlanJson: "/api/v1/audit/managed-audit-packet-restore-drill-plan",
  sourceRestoreDrillPlanMarkdown: "/api/v1/audit/managed-audit-packet-restore-drill-plan?format=markdown",
  archiveExplanation: ARCHIVE_PATHS.explanation,
  archiveScreenshot: ARCHIVE_PATHS.screenshot,
  archiveCodeWalkthrough: ARCHIVE_PATHS.walkthrough,
  activePlan: ARCHIVE_PATHS.activePlan,
});

export function loadManagedAuditRestoreDrillArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditRestoreDrillArchiveVerificationProfile {
  const files = createArchiveFileEvidence();
  const snippets = createSnippetEvidence();
  const checks = createChecks(input.config, files, snippets);
  checks.readyForManagedAuditRestoreDrillArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditRestoreDrillArchiveVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditRestoreDrillArchiveVerification
    ? "verified-restore-drill-archive"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-restore-drill-archive-verification.v1",
    verificationState,
    sourceVersion: "Node v213",
    fileDigests: files.map((file) => ({ id: file.id, digest: file.digest })),
    snippetMatches: snippets.map((snippet) => ({ id: snippet.id, matched: snippet.matched })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit restore drill archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-restore-drill-archive-verification.v1",
    verificationState,
    readyForManagedAuditRestoreDrillArchiveVerification: checks.readyForManagedAuditRestoreDrillArchiveVerification,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyVerification: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    archiveVerificationRerunsSourceEndpoint: false,
    automaticUpstreamStart: false,
    sourceArchive: {
      sourceVersion: "Node v213",
      sourceProfileVersion: "managed-audit-packet-restore-drill-plan.v1",
      archiveRoot: "c/213/",
      htmlArchive: ARCHIVE_PATHS.html,
      screenshot: ARCHIVE_PATHS.screenshot,
      explanation: ARCHIVE_PATHS.explanation,
      codeWalkthrough: ARCHIVE_PATHS.walkthrough,
      activePlan: ARCHIVE_PATHS.activePlan,
      previousPlanCloseout: ARCHIVE_PATHS.previousPlanCloseout,
    },
    verification: {
      verificationDigest,
      evidenceSpan: "Node v213 restore drill plan archive",
      sourceDrillState: "ready-for-manual-dry-run-plan",
      sourcePlanMode: "manual-dry-run-plan-only",
      sourcePacketSourceVersion: "Node v211",
      sourceVerificationSourceVersion: "Node v212",
      sourceJavaReceiptVersion: "Java v76",
      sourceMiniKvReceiptVersion: "mini-kv v85",
      sourceMiniKvMarkerDigest: "fnv1a64:1ea4570c967cfdb1",
      sourceRestoreExecutionAllowed: false,
      sourceConnectsManagedAudit: false,
      sourceAutomaticUpstreamStart: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionAuditAllowed: false,
      archiveVerificationReadsFilesOnly: true,
    },
    archivedEvidence: {
      files,
      expectedSnippetCount: snippets.length,
      matchedSnippetCount: snippets.filter((snippet) => snippet.matched).length,
      snippetMatches: snippets,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      archiveFileCount: files.length,
      snippetMatchCount: snippets.filter((snippet) => snippet.matched).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Run Java v77 and mini-kv v86 in the same recommended parallel round if they are not already complete.",
      "Start Node v215 only after Java v77 and mini-kv v86 receipts are present and still no-write.",
      "Keep Node v215 as a local dry-run adapter candidate; do not connect real managed audit storage or write Java/mini-kv.",
    ],
  };
}

export function renderManagedAuditRestoreDrillArchiveVerificationMarkdown(
  profile: ManagedAuditRestoreDrillArchiveVerificationProfile,
): string {
  return [
    "# Managed audit restore drill archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for archive verification: ${profile.readyForManagedAuditRestoreDrillArchiveVerification}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Restore execution allowed: ${profile.restoreExecutionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Source Archive",
    "",
    ...renderEntries(profile.sourceArchive),
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Archive Files",
    "",
    ...profile.archivedEvidence.files.map(
      (file) => `- ${file.id}: ${file.path} exists=${file.exists} sizeBytes=${file.sizeBytes} digest=${file.digest ?? "missing"}`,
    ),
    "",
    "## Snippet Matches",
    "",
    ...profile.archivedEvidence.snippetMatches.map(
      (snippet) => `- ${snippet.id}: ${snippet.path} matched=${snippet.matched}`,
    ),
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
    ...renderMessages(profile.productionBlockers, "No blockers for this archive verification."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No recommendations."),
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
    createFileEvidence("html-archive", ARCHIVE_PATHS.html),
    createFileEvidence("screenshot", ARCHIVE_PATHS.screenshot),
    createFileEvidence("explanation", ARCHIVE_PATHS.explanation),
    createFileEvidence("code-walkthrough", ARCHIVE_PATHS.walkthrough),
    createFileEvidence("active-plan", ARCHIVE_PATHS.activePlan),
    createFileEvidence("previous-plan-closeout", ARCHIVE_PATHS.previousPlanCloseout),
  ];
}

function createFileEvidence(id: string, relativePath: string): ArchiveFileEvidence {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    return {
      id,
      path: relativePath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }

  const content = readFileSync(absolutePath);
  return {
    id,
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function createSnippetEvidence(): ArchiveSnippetEvidence[] {
  return [
    snippet("source-profile-version", ARCHIVE_PATHS.explanation, "profileVersion=managed-audit-packet-restore-drill-plan.v1"),
    snippet("source-drill-state", ARCHIVE_PATHS.explanation, "drillState=ready-for-manual-dry-run-plan"),
    snippet("source-no-restore", ARCHIVE_PATHS.explanation, "restoreExecutionAllowed=false"),
    snippet("source-no-managed-audit", ARCHIVE_PATHS.explanation, "connectsManagedAudit=false"),
    snippet("source-http-smoke", ARCHIVE_PATHS.explanation, "HTTP smoke"),
    snippet("source-java-receipt", ARCHIVE_PATHS.explanation, "Java v76"),
    snippet("source-mini-kv-receipt", ARCHIVE_PATHS.explanation, "mini-kv v85"),
    snippet("source-mini-kv-marker", ARCHIVE_PATHS.explanation, "fnv1a64:1ea4570c967cfdb1"),
    snippet("forbid-real-managed-audit", ARCHIVE_PATHS.explanation, "\u8fde\u63a5\u771f\u5b9e managed audit adapter"),
    snippet("forbid-java-decision", ARCHIVE_PATHS.explanation, "\u521b\u5efa Java approval decision"),
    snippet("forbid-mini-kv-restore", ARCHIVE_PATHS.explanation, "\u6267\u884c mini-kv LOAD / COMPACT / SETNXEX / RESTORE"),
    snippet("normalized-node-archive", ARCHIVE_PATHS.explanation, "nodeV211Archive=c/211/"),
    snippet("normalized-mini-kv-evidence", ARCHIVE_PATHS.explanation, "miniKvV85RuntimeSmokeEvidence=fixtures/release/runtime-smoke-evidence.json"),
    snippet("walkthrough-source-service", ARCHIVE_PATHS.walkthrough, "src/services/managedAuditPacketRestoreDrillPlan.ts"),
    snippet("walkthrough-verification", ARCHIVE_PATHS.walkthrough, "\u5168\u91cf\u6d4b\u8bd5"),
    snippet("active-plan-v214", ARCHIVE_PATHS.activePlan, "Node v214"),
    snippet("active-plan-parallel-receipts", ARCHIVE_PATHS.activePlan, "Java v77 + mini-kv v86"),
    snippet("previous-plan-closeout", ARCHIVE_PATHS.previousPlanCloseout, "Node v213"),
  ];
}

function snippet(id: string, relativePath: string, expectedText: string): ArchiveSnippetEvidence {
  const text = readUtf8(relativePath);
  return {
    id,
    path: relativePath,
    expectedText,
    matched: text.includes(expectedText),
  };
}

function readUtf8(relativePath: string): string {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function createChecks(
  config: AppConfig,
  files: ArchiveFileEvidence[],
  snippets: ArchiveSnippetEvidence[],
): ManagedAuditRestoreDrillArchiveVerificationProfile["checks"] {
  const fileById = new Map(files.map((file) => [file.id, file]));
  const snippetMatched = (id: string) => snippets.some((snippet) => snippet.id === id && snippet.matched);
  const explanationPresent = fileById.get("explanation")?.exists === true;
  const walkthroughPresent = fileById.get("code-walkthrough")?.exists === true;

  return {
    archiveFilesPresent: files.every((file) => file.exists),
    archiveFilesNonEmpty: files.every((file) => file.sizeBytes > 0),
    screenshotPresent: fileById.get("screenshot")?.exists === true,
    screenshotNonEmpty: (fileById.get("screenshot")?.sizeBytes ?? 0) > 0,
    htmlArchivePresent: fileById.get("html-archive")?.exists === true,
    explanationPresent,
    walkthroughPresent,
    sourceDrillStateRecorded: snippetMatched("source-profile-version") && snippetMatched("source-drill-state"),
    sourceReceiptsRecorded: snippetMatched("source-java-receipt")
      && snippetMatched("source-mini-kv-receipt")
      && snippetMatched("source-mini-kv-marker"),
    httpSmokeRecorded: snippetMatched("source-http-smoke"),
    forbiddenOperationsRecorded: snippetMatched("forbid-real-managed-audit")
      && snippetMatched("forbid-java-decision")
      && snippetMatched("forbid-mini-kv-restore"),
    normalizedEvidenceHintsRecorded: snippetMatched("normalized-node-archive")
      && snippetMatched("normalized-mini-kv-evidence"),
    previousPlanClosedOut: snippetMatched("previous-plan-closeout"),
    activePlanPointsToV214: snippetMatched("active-plan-v214"),
    activePlanAllowsParallelJavaMiniKvReceipts: snippetMatched("active-plan-parallel-receipts"),
    noArchiveVerificationUpstreamRerun: true,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    restoreExecutionStillBlocked: true,
    readyForManagedAuditRestoreDrillArchiveVerification: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditRestoreDrillArchiveVerificationProfile["checks"],
): ArchiveVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: ArchiveVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.archiveFilesPresent,
      code: "ARCHIVE_FILES_MISSING",
      source: "v213-archive",
      message: "One or more v213 archive files are missing.",
    },
    {
      condition: checks.sourceDrillStateRecorded,
      code: "SOURCE_DRILL_STATE_NOT_RECORDED",
      source: "v213-archive",
      message: "The v213 explanation does not record the restore drill profile version and ready state.",
    },
    {
      condition: checks.sourceReceiptsRecorded,
      code: "SOURCE_RECEIPTS_NOT_RECORDED",
      source: "v213-archive",
      message: "The v213 archive does not record Java v76 and mini-kv v85 receipt evidence.",
    },
    {
      condition: checks.forbiddenOperationsRecorded,
      code: "FORBIDDEN_OPERATIONS_NOT_RECORDED",
      source: "v213-archive",
      message: "The v213 archive does not document the managed audit, Java write, and mini-kv restore prohibitions.",
    },
    {
      condition: checks.normalizedEvidenceHintsRecorded,
      code: "NORMALIZED_EVIDENCE_HINTS_MISSING",
      source: "v213-archive",
      message: "The v213 archive does not record project-relative evidence hints.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for archive verification.",
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

function collectWarnings(): ArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-restore-drill-archive-verification",
      message: "This profile verifies v213 archive evidence only; it does not prove a real managed audit adapter exists.",
    },
  ];
}

function collectRecommendations(): ArchiveVerificationMessage[] {
  return [
    {
      code: "RUN_PARALLEL_UPSTREAM_RECEIPTS",
      severity: "recommendation",
      source: "v213-plan",
      message: "Complete Java v77 and mini-kv v86 in the same planning round before Node v215 consumes adapter-boundary receipts.",
    },
    {
      code: "KEEP_V215_LOCAL_DRY_RUN",
      severity: "recommendation",
      source: "managed-audit-restore-drill-archive-verification",
      message: "Node v215 should remain a local dry-run adapter candidate and must not connect real managed audit storage.",
    },
  ];
}
