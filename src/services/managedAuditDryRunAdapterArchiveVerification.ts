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

export interface ManagedAuditDryRunAdapterArchiveVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1";
  verificationState: "verified-dry-run-adapter-archive" | "blocked";
  readyForManagedAuditDryRunAdapterArchiveVerification: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyVerification: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  archiveVerificationRerunsSourceEndpoint: false;
  localDryRunWritePerformed: false;
  automaticUpstreamStart: false;
  sourceArchive: {
    sourceVersion: "Node v215";
    sourceProfileVersion: "managed-audit-dry-run-adapter-candidate.v1";
    archiveRoot: "c/215/";
    htmlArchive: "c/215/managed-audit-dry-run-adapter-candidate-v215.html";
    screenshot: "c/215/\u56fe\u7247/managed-audit-dry-run-adapter-candidate-v215.png";
    explanation: "c/215/\u89e3\u91ca/managed-audit-dry-run-adapter-candidate-v215.md";
    codeWalkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/219-managed-audit-dry-run-adapter-candidate-v215.md";
    activePlan: "docs/plans/v215-post-dry-run-adapter-roadmap.md";
    previousPlanCloseout: "docs/plans/v213-post-restore-drill-plan-roadmap.md";
  };
  verification: {
    verificationDigest: string;
    evidenceSpan: "Node v215 dry-run adapter candidate archive";
    sourceCandidateState: "local-dry-run-adapter-verified";
    sourceArchiveVerificationVersion: "Node v214";
    sourceJavaReceiptVersion: "Java v77";
    sourceMiniKvReceiptVersion: "mini-kv v86";
    sourceMiniKvReceiptDigest: "fnv1a64:f39d8e3ef98654ea";
    sourceAppendRecordCount: 1;
    sourceQueryByRequestIdCount: 1;
    sourceDryRunDirectoryRemoved: true;
    sourceRestoreExecutionAllowed: false;
    sourceConnectsManagedAudit: false;
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
    sourceCandidateStateRecorded: boolean;
    sourceReceiptsRecorded: boolean;
    localJsonlDryRunRecorded: boolean;
    appendQueryDigestCleanupRecorded: boolean;
    forbiddenOperationsRecorded: boolean;
    previousPlanClosedOut: boolean;
    activePlanPointsToV216: boolean;
    activePlanAllowsParallelJavaMiniKvReceipts: boolean;
    noArchiveVerificationUpstreamRerun: boolean;
    noArchiveVerificationLocalDryRunRerun: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    restoreExecutionStillBlocked: boolean;
    readyForManagedAuditDryRunAdapterArchiveVerification: boolean;
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
    sourceDryRunAdapterCandidateJson: string;
    sourceDryRunAdapterCandidateMarkdown: string;
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
    | "managed-audit-dry-run-adapter-archive-verification"
    | "v215-archive"
    | "v215-plan"
    | "v213-plan"
    | "runtime-config";
  message: string;
}

const ARCHIVE_PATHS = Object.freeze({
  html: "c/215/managed-audit-dry-run-adapter-candidate-v215.html",
  screenshot: "c/215/\u56fe\u7247/managed-audit-dry-run-adapter-candidate-v215.png",
  explanation: "c/215/\u89e3\u91ca/managed-audit-dry-run-adapter-candidate-v215.md",
  walkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/219-managed-audit-dry-run-adapter-candidate-v215.md",
  activePlan: "docs/plans/v215-post-dry-run-adapter-roadmap.md",
  previousPlanCloseout: "docs/plans/v213-post-restore-drill-plan-roadmap.md",
});

const ENDPOINTS = Object.freeze({
  archiveVerificationJson: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification",
  archiveVerificationMarkdown: "/api/v1/audit/managed-audit-dry-run-adapter-archive-verification?format=markdown",
  sourceDryRunAdapterCandidateJson: "/api/v1/audit/managed-audit-dry-run-adapter-candidate",
  sourceDryRunAdapterCandidateMarkdown: "/api/v1/audit/managed-audit-dry-run-adapter-candidate?format=markdown",
  archiveExplanation: ARCHIVE_PATHS.explanation,
  archiveScreenshot: ARCHIVE_PATHS.screenshot,
  archiveCodeWalkthrough: ARCHIVE_PATHS.walkthrough,
  activePlan: ARCHIVE_PATHS.activePlan,
});

export function loadManagedAuditDryRunAdapterArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditDryRunAdapterArchiveVerificationProfile {
  const files = createArchiveFileEvidence();
  const snippets = createSnippetEvidence();
  const checks = createChecks(input.config, files, snippets);
  checks.readyForManagedAuditDryRunAdapterArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForManagedAuditDryRunAdapterArchiveVerification")
    .every(([, value]) => value);
  const verificationState = checks.readyForManagedAuditDryRunAdapterArchiveVerification
    ? "verified-dry-run-adapter-archive"
    : "blocked";
  const verificationDigest = sha256StableJson({
    profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1",
    verificationState,
    sourceVersion: "Node v215",
    fileDigests: files.map((file) => ({ id: file.id, digest: file.digest })),
    snippetMatches: snippets.map((snippet) => ({ id: snippet.id, matched: snippet.matched })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit dry-run adapter archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-dry-run-adapter-archive-verification.v1",
    verificationState,
    readyForManagedAuditDryRunAdapterArchiveVerification: checks.readyForManagedAuditDryRunAdapterArchiveVerification,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyVerification: true,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    archiveVerificationRerunsSourceEndpoint: false,
    localDryRunWritePerformed: false,
    automaticUpstreamStart: false,
    sourceArchive: {
      sourceVersion: "Node v215",
      sourceProfileVersion: "managed-audit-dry-run-adapter-candidate.v1",
      archiveRoot: "c/215/",
      htmlArchive: ARCHIVE_PATHS.html,
      screenshot: ARCHIVE_PATHS.screenshot,
      explanation: ARCHIVE_PATHS.explanation,
      codeWalkthrough: ARCHIVE_PATHS.walkthrough,
      activePlan: ARCHIVE_PATHS.activePlan,
      previousPlanCloseout: ARCHIVE_PATHS.previousPlanCloseout,
    },
    verification: {
      verificationDigest,
      evidenceSpan: "Node v215 dry-run adapter candidate archive",
      sourceCandidateState: "local-dry-run-adapter-verified",
      sourceArchiveVerificationVersion: "Node v214",
      sourceJavaReceiptVersion: "Java v77",
      sourceMiniKvReceiptVersion: "mini-kv v86",
      sourceMiniKvReceiptDigest: "fnv1a64:f39d8e3ef98654ea",
      sourceAppendRecordCount: 1,
      sourceQueryByRequestIdCount: 1,
      sourceDryRunDirectoryRemoved: true,
      sourceRestoreExecutionAllowed: false,
      sourceConnectsManagedAudit: false,
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
      "Run Java v78 and mini-kv v87 in the same recommended parallel round if they are not already complete.",
      "Start Node v217 only after Java v78 and mini-kv v87 receipts are present and still no-write.",
      "Keep Node v217 as a production-hardening readiness gate; do not connect real managed audit storage.",
    ],
  };
}

export function renderManagedAuditDryRunAdapterArchiveVerificationMarkdown(
  profile: ManagedAuditDryRunAdapterArchiveVerificationProfile,
): string {
  return [
    "# Managed audit dry-run adapter archive verification",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Verification state: ${profile.verificationState}`,
    `- Ready for archive verification: ${profile.readyForManagedAuditDryRunAdapterArchiveVerification}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Ready for production window: ${profile.readyForProductionWindow}`,
    `- Restore execution allowed: ${profile.restoreExecutionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    `- Local dry-run write performed: ${profile.localDryRunWritePerformed}`,
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
    snippet("source-profile-version", ARCHIVE_PATHS.explanation, "profileVersion=managed-audit-dry-run-adapter-candidate.v1"),
    snippet("source-candidate-state", ARCHIVE_PATHS.explanation, "candidateState=local-dry-run-adapter-verified"),
    snippet("source-no-restore", ARCHIVE_PATHS.explanation, "restoreExecutionAllowed=false"),
    snippet("source-no-managed-audit", ARCHIVE_PATHS.explanation, "connectsManagedAudit=false"),
    snippet("source-java-receipt", ARCHIVE_PATHS.explanation, "Java v77"),
    snippet("source-mini-kv-receipt", ARCHIVE_PATHS.explanation, "mini-kv v86"),
    snippet("source-mini-kv-digest", ARCHIVE_PATHS.explanation, "receiptDigest=fnv1a64:f39d8e3ef98654ea"),
    snippet("source-local-jsonl", ARCHIVE_PATHS.explanation, "managed-audit-adapter-candidate.jsonl"),
    snippet("source-append", ARCHIVE_PATHS.explanation, "appendRecordCount=1"),
    snippet("source-query", ARCHIVE_PATHS.explanation, "queryByRequestIdCount=1"),
    snippet("source-cleanup", ARCHIVE_PATHS.explanation, "dryRunDirectoryRemoved=true"),
    snippet("source-http-smoke", ARCHIVE_PATHS.explanation, "HTTP smoke"),
    snippet("forbid-real-managed-audit", ARCHIVE_PATHS.explanation, "\u771f\u5b9e managed audit \u8fde\u63a5"),
    snippet("forbid-java-write", ARCHIVE_PATHS.explanation, "Java approval / ledger / SQL / deployment / rollback"),
    snippet("forbid-mini-kv-restore", ARCHIVE_PATHS.explanation, "mini-kv LOAD / COMPACT / SETNXEX / RESTORE"),
    snippet("walkthrough-source-service", ARCHIVE_PATHS.walkthrough, "src/services/managedAuditDryRunAdapterCandidate.ts"),
    snippet("walkthrough-local-dry-run", ARCHIVE_PATHS.walkthrough, "Node \u672c\u5730 dry-run \u5199\u5165"),
    snippet("walkthrough-verification", ARCHIVE_PATHS.walkthrough, "\u5168\u91cf\u6d4b\u8bd5"),
    snippet("active-plan-v216", ARCHIVE_PATHS.activePlan, "Node v216"),
    snippet("active-plan-parallel-receipts", ARCHIVE_PATHS.activePlan, "Java v78 + mini-kv v87"),
    snippet("previous-plan-closeout", ARCHIVE_PATHS.previousPlanCloseout, "Node v215"),
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
): ManagedAuditDryRunAdapterArchiveVerificationProfile["checks"] {
  const fileById = new Map(files.map((file) => [file.id, file]));
  const snippetMatched = (id: string) => snippets.some((snippet) => snippet.id === id && snippet.matched);

  return {
    archiveFilesPresent: files.every((file) => file.exists),
    archiveFilesNonEmpty: files.every((file) => file.sizeBytes > 0),
    screenshotPresent: fileById.get("screenshot")?.exists === true,
    screenshotNonEmpty: (fileById.get("screenshot")?.sizeBytes ?? 0) > 0,
    htmlArchivePresent: fileById.get("html-archive")?.exists === true,
    explanationPresent: fileById.get("explanation")?.exists === true,
    walkthroughPresent: fileById.get("code-walkthrough")?.exists === true,
    sourceCandidateStateRecorded: snippetMatched("source-profile-version") && snippetMatched("source-candidate-state"),
    sourceReceiptsRecorded: snippetMatched("source-java-receipt")
      && snippetMatched("source-mini-kv-receipt")
      && snippetMatched("source-mini-kv-digest"),
    localJsonlDryRunRecorded: snippetMatched("source-local-jsonl"),
    appendQueryDigestCleanupRecorded: snippetMatched("source-append")
      && snippetMatched("source-query")
      && snippetMatched("source-cleanup"),
    forbiddenOperationsRecorded: snippetMatched("forbid-real-managed-audit")
      && snippetMatched("forbid-java-write")
      && snippetMatched("forbid-mini-kv-restore"),
    previousPlanClosedOut: snippetMatched("previous-plan-closeout"),
    activePlanPointsToV216: snippetMatched("active-plan-v216"),
    activePlanAllowsParallelJavaMiniKvReceipts: snippetMatched("active-plan-parallel-receipts"),
    noArchiveVerificationUpstreamRerun: true,
    noArchiveVerificationLocalDryRunRerun: true,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    restoreExecutionStillBlocked: true,
    readyForManagedAuditDryRunAdapterArchiveVerification: false,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditDryRunAdapterArchiveVerificationProfile["checks"],
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
      source: "v215-archive",
      message: "One or more v215 archive files are missing.",
    },
    {
      condition: checks.sourceCandidateStateRecorded,
      code: "SOURCE_CANDIDATE_STATE_NOT_RECORDED",
      source: "v215-archive",
      message: "The v215 explanation does not record candidate profile version and ready state.",
    },
    {
      condition: checks.sourceReceiptsRecorded,
      code: "SOURCE_RECEIPTS_NOT_RECORDED",
      source: "v215-archive",
      message: "The v215 archive does not record Java v77 and mini-kv v86 receipt evidence.",
    },
    {
      condition: checks.appendQueryDigestCleanupRecorded,
      code: "APPEND_QUERY_DIGEST_CLEANUP_NOT_RECORDED",
      source: "v215-archive",
      message: "The v215 archive does not record append, query, digest, and cleanup dry-run evidence.",
    },
    {
      condition: checks.forbiddenOperationsRecorded,
      code: "FORBIDDEN_OPERATIONS_NOT_RECORDED",
      source: "v215-archive",
      message: "The v215 archive does not document managed audit, Java write, and mini-kv restore prohibitions.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v216 archive verification.",
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
      source: "managed-audit-dry-run-adapter-archive-verification",
      message: "This profile verifies v215 archive evidence only; it does not rerun the local JSONL dry-run adapter.",
    },
  ];
}

function collectRecommendations(): ArchiveVerificationMessage[] {
  return [
    {
      code: "RUN_PARALLEL_PRODUCTION_PREREQUISITE_RECEIPTS",
      severity: "recommendation",
      source: "v215-plan",
      message: "Complete Java v78 and mini-kv v87 in the same planning round before Node v217 consumes production-hardening receipts.",
    },
    {
      code: "KEEP_V217_READINESS_GATE_ONLY",
      severity: "recommendation",
      source: "managed-audit-dry-run-adapter-archive-verification",
      message: "Node v217 should remain a readiness gate and must not connect real managed audit storage.",
    },
  ];
}
