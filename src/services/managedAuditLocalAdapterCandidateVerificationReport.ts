import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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

export interface ManagedAuditLocalAdapterCandidateVerificationReportProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1";
  reportState: "local-adapter-candidate-verification-ready" | "blocked";
  readyForManagedAuditLocalAdapterCandidateVerificationReport: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyReport: true;
  sourceLocalDryRunWriteObserved: true;
  additionalLocalDryRunWritePerformed: false;
  sourceEndpointRerunPerformed: false;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  connectsManagedAudit: false;
  automaticUpstreamStart: false;
  sourceArchive: {
    sourceVersion: "Node v221";
    sourceProfileVersion: "managed-audit-local-adapter-candidate-dry-run.v1";
    archiveRoot: "c/221/";
    htmlArchive: "c/221/managed-audit-local-adapter-candidate-dry-run-v221.html";
    screenshot: "c/221/\u56fe\u7247/managed-audit-local-adapter-candidate-dry-run-v221.png";
    explanation: "c/221/\u89e3\u91ca/managed-audit-local-adapter-candidate-dry-run-v221.md";
    codeWalkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/225-managed-audit-local-adapter-candidate-dry-run-v221.md";
    activePlan: "docs/plans/v221-post-local-adapter-candidate-roadmap.md";
    previousPlanCloseout: "docs/plans/v219-post-implementation-precheck-roadmap.md";
  };
  verification: {
    reportDigest: string;
    evidenceSpan: "Node v221 local adapter candidate dry-run archive";
    sourceCandidateState: "local-adapter-dry-run-verified";
    sourceDisabledShellVersion: "Node v220";
    sourceJavaVersion: "Java v80";
    sourceMiniKvVersion: "mini-kv v89";
    sourceMiniKvReceiptDigest: "fnv1a64:76411286a0913dc8";
    sourceAppendRecordCount: 1;
    sourceQueryByRequestIdCount: 1;
    sourceDryRunDirectoryRemoved: true;
    sourceConnectsManagedAudit: false;
    sourceProductionAuditAllowed: false;
    upstreamActionsEnabled: boolean;
    reportReadsFilesOnly: true;
    sourceEndpointRerunPerformed: false;
    additionalLocalDryRunWritePerformed: false;
    v221TempDirectoriesPresent: number;
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
    sourceRecordShapeRecorded: boolean;
    sourceDigestLinkageRecorded: boolean;
    sourceCleanupEvidenceRecorded: boolean;
    javaV80GuardLinkageRecorded: boolean;
    miniKvV89GuardLinkageRecorded: boolean;
    forbiddenOperationsRecorded: boolean;
    previousPlanClosedOut: boolean;
    activePlanPointsToV222: boolean;
    activePlanRequiresParallelJavaMiniKvGuards: boolean;
    noSourceEndpointRerun: boolean;
    noAdditionalLocalDryRunWrite: boolean;
    currentV221TempDirectoriesAbsent: boolean;
    upstreamActionsStillDisabled: boolean;
    productionAuditStillBlocked: boolean;
    restoreExecutionStillBlocked: boolean;
    readyForManagedAuditLocalAdapterCandidateVerificationReport: boolean;
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
  productionBlockers: VerificationReportMessage[];
  warnings: VerificationReportMessage[];
  recommendations: VerificationReportMessage[];
  evidenceEndpoints: {
    verificationReportJson: string;
    verificationReportMarkdown: string;
    sourceLocalAdapterCandidateJson: string;
    sourceLocalAdapterCandidateMarkdown: string;
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

interface VerificationReportMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "managed-audit-local-adapter-candidate-verification-report"
    | "v221-archive"
    | "v221-plan"
    | "v219-plan"
    | "runtime-config";
  message: string;
}

const ARCHIVE_PATHS = Object.freeze({
  html: "c/221/managed-audit-local-adapter-candidate-dry-run-v221.html",
  screenshot: "c/221/\u56fe\u7247/managed-audit-local-adapter-candidate-dry-run-v221.png",
  explanation: "c/221/\u89e3\u91ca/managed-audit-local-adapter-candidate-dry-run-v221.md",
  walkthrough: "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb5/225-managed-audit-local-adapter-candidate-dry-run-v221.md",
  activePlan: "docs/plans/v221-post-local-adapter-candidate-roadmap.md",
  previousPlanCloseout: "docs/plans/v219-post-implementation-precheck-roadmap.md",
});

const ENDPOINTS = Object.freeze({
  verificationReportJson: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report",
  verificationReportMarkdown: "/api/v1/audit/managed-audit-local-adapter-candidate-verification-report?format=markdown",
  sourceLocalAdapterCandidateJson: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run",
  sourceLocalAdapterCandidateMarkdown: "/api/v1/audit/managed-audit-local-adapter-candidate-dry-run?format=markdown",
  archiveExplanation: ARCHIVE_PATHS.explanation,
  archiveScreenshot: ARCHIVE_PATHS.screenshot,
  archiveCodeWalkthrough: ARCHIVE_PATHS.walkthrough,
  activePlan: ARCHIVE_PATHS.activePlan,
});

export function loadManagedAuditLocalAdapterCandidateVerificationReport(input: {
  config: AppConfig;
}): ManagedAuditLocalAdapterCandidateVerificationReportProfile {
  const files = createArchiveFileEvidence();
  const snippets = createSnippetEvidence();
  const v221TempDirectoriesPresent = countV221TempDirectories();
  const checks = createChecks(input.config, files, snippets, v221TempDirectoriesPresent);
  checks.readyForManagedAuditLocalAdapterCandidateVerificationReport = Object.entries(checks)
    .filter(([key]) => ![
      "readyForManagedAuditLocalAdapterCandidateVerificationReport",
      "currentV221TempDirectoriesAbsent",
    ].includes(key))
    .every(([, value]) => value);
  const reportState = checks.readyForManagedAuditLocalAdapterCandidateVerificationReport
    ? "local-adapter-candidate-verification-ready"
    : "blocked";
  const reportDigest = sha256StableJson({
    profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1",
    reportState,
    sourceVersion: "Node v221",
    fileDigests: files.map((file) => ({ id: file.id, digest: file.digest })),
    snippetMatches: snippets.map((snippet) => ({ id: snippet.id, matched: snippet.matched })),
    v221TempDirectoriesPresent,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit local adapter candidate verification report",
    generatedAt: new Date().toISOString(),
    profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1",
    reportState,
    readyForManagedAuditLocalAdapterCandidateVerificationReport: checks.readyForManagedAuditLocalAdapterCandidateVerificationReport,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyReport: true,
    sourceLocalDryRunWriteObserved: true,
    additionalLocalDryRunWritePerformed: false,
    sourceEndpointRerunPerformed: false,
    executionAllowed: false,
    restoreExecutionAllowed: false,
    connectsManagedAudit: false,
    automaticUpstreamStart: false,
    sourceArchive: {
      sourceVersion: "Node v221",
      sourceProfileVersion: "managed-audit-local-adapter-candidate-dry-run.v1",
      archiveRoot: "c/221/",
      htmlArchive: ARCHIVE_PATHS.html,
      screenshot: ARCHIVE_PATHS.screenshot,
      explanation: ARCHIVE_PATHS.explanation,
      codeWalkthrough: ARCHIVE_PATHS.walkthrough,
      activePlan: ARCHIVE_PATHS.activePlan,
      previousPlanCloseout: ARCHIVE_PATHS.previousPlanCloseout,
    },
    verification: {
      reportDigest,
      evidenceSpan: "Node v221 local adapter candidate dry-run archive",
      sourceCandidateState: "local-adapter-dry-run-verified",
      sourceDisabledShellVersion: "Node v220",
      sourceJavaVersion: "Java v80",
      sourceMiniKvVersion: "mini-kv v89",
      sourceMiniKvReceiptDigest: "fnv1a64:76411286a0913dc8",
      sourceAppendRecordCount: 1,
      sourceQueryByRequestIdCount: 1,
      sourceDryRunDirectoryRemoved: true,
      sourceConnectsManagedAudit: false,
      sourceProductionAuditAllowed: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      reportReadsFilesOnly: true,
      sourceEndpointRerunPerformed: false,
      additionalLocalDryRunWritePerformed: false,
      v221TempDirectoriesPresent,
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
      "Run the recommended parallel Java v81 and mini-kv v90 guard receipt work before Node v223.",
      "Keep Node v223 as a connection readiness review, not a real production adapter connection.",
      "Do not treat Node v221 local JSONL dry-run records as production audit records.",
    ],
  };
}

export function renderManagedAuditLocalAdapterCandidateVerificationReportMarkdown(
  profile: ManagedAuditLocalAdapterCandidateVerificationReportProfile,
): string {
  return [
    "# Managed audit local adapter candidate verification report",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Report state: ${profile.reportState}`,
    `- Ready for verification report: ${profile.readyForManagedAuditLocalAdapterCandidateVerificationReport}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read-only report: ${profile.readOnlyReport}`,
    `- Source endpoint rerun performed: ${profile.sourceEndpointRerunPerformed}`,
    `- Additional local dry-run write performed: ${profile.additionalLocalDryRunWritePerformed}`,
    "",
    "## Source Archive",
    "",
    ...renderEntries(profile.sourceArchive),
    "",
    "## Verification",
    "",
    ...renderEntries(profile.verification),
    "",
    "## Archived Evidence Files",
    "",
    ...profile.archivedEvidence.files.flatMap(renderArchiveFile),
    "## Snippet Matches",
    "",
    ...profile.archivedEvidence.snippetMatches.flatMap(renderSnippet),
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
    ...renderMessages(profile.productionBlockers, "No local adapter candidate verification blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No local adapter candidate verification warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No local adapter candidate verification recommendations."),
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
    archiveFile("html", ARCHIVE_PATHS.html),
    archiveFile("screenshot", ARCHIVE_PATHS.screenshot),
    archiveFile("explanation", ARCHIVE_PATHS.explanation),
    archiveFile("walkthrough", ARCHIVE_PATHS.walkthrough),
    archiveFile("active-plan", ARCHIVE_PATHS.activePlan),
    archiveFile("previous-plan-closeout", ARCHIVE_PATHS.previousPlanCloseout),
  ];
}

function createSnippetEvidence(): ArchiveSnippetEvidence[] {
  return [
    snippet("state-recorded", ARCHIVE_PATHS.explanation, "candidateState=local-adapter-dry-run-verified"),
    snippet("production-blocked", ARCHIVE_PATHS.explanation, "readyForProductionAudit=false"),
    snippet("cleanup-recorded", ARCHIVE_PATHS.explanation, "dryRunDirectoryRemoved=true"),
    snippet("java-v80-recorded", ARCHIVE_PATHS.explanation, "Java v80"),
    snippet("mini-kv-v89-recorded", ARCHIVE_PATHS.explanation, "mini-kv v89"),
    snippet("mini-kv-digest-recorded", ARCHIVE_PATHS.explanation, "receiptDigest=fnv1a64:76411286a0913dc8"),
    snippet("mini-kv-storage-boundary", ARCHIVE_PATHS.explanation, "adapterShellStorageBackend=false"),
    snippet("candidate-class-recorded", ARCHIVE_PATHS.walkthrough, "LocalJsonlManagedAuditAdapterCandidate"),
    snippet("append-query-digest-cleanup", ARCHIVE_PATHS.walkthrough, "append/query/digest/cleanup"),
    snippet("cleanup-finally-recorded", ARCHIVE_PATHS.walkthrough, "await rm(directory, { recursive: true, force: true });"),
    snippet("temp-dir-no-residue", ARCHIVE_PATHS.walkthrough, ".tmp/managed-audit-v221-* \u4e0d\u6b8b\u7559"),
    snippet("html-title", ARCHIVE_PATHS.html, "Node v221 Local Adapter Candidate"),
    snippet("html-production-blocked", ARCHIVE_PATHS.html, "production audit</span><span class=\"blocked\">false"),
    snippet("plan-points-to-v222", ARCHIVE_PATHS.activePlan, "Node v222"),
    snippet("plan-parallel-v81-v90", ARCHIVE_PATHS.activePlan, "\u63a8\u8350\u5e76\u884c\uff1aJava v81 + mini-kv v90"),
    snippet("plan-no-production-jump", ARCHIVE_PATHS.activePlan, "\u4e0d\u80fd\u76f4\u63a5\u8df3\u5230\u751f\u4ea7\u5ba1\u8ba1\u8fde\u63a5"),
    snippet("previous-plan-v221-done", ARCHIVE_PATHS.previousPlanCloseout, "Node v221\uff1a\u5df2\u5b8c\u6210"),
    snippet("previous-plan-handoff", ARCHIVE_PATHS.previousPlanCloseout, "v221-post-local-adapter-candidate-roadmap.md"),
  ];
}

function createChecks(
  config: AppConfig,
  files: ArchiveFileEvidence[],
  snippets: ArchiveSnippetEvidence[],
  v221TempDirectoriesPresent: number,
): ManagedAuditLocalAdapterCandidateVerificationReportProfile["checks"] {
  const allSnippetsMatched = snippets.every((snippetEvidence) => snippetEvidence.matched);
  return {
    archiveFilesPresent: files.every((file) => file.exists),
    archiveFilesNonEmpty: files.every((file) => file.exists && file.sizeBytes > 0),
    screenshotPresent: fileById(files, "screenshot").exists,
    screenshotNonEmpty: fileById(files, "screenshot").sizeBytes > 0,
    htmlArchivePresent: fileById(files, "html").exists,
    explanationPresent: fileById(files, "explanation").exists,
    walkthroughPresent: fileById(files, "walkthrough").exists,
    sourceCandidateStateRecorded: snippetMatched(snippets, "state-recorded"),
    sourceRecordShapeRecorded: snippetMatched(snippets, "candidate-class-recorded"),
    sourceDigestLinkageRecorded: snippetMatched(snippets, "mini-kv-digest-recorded")
      && snippetMatched(snippets, "append-query-digest-cleanup"),
    sourceCleanupEvidenceRecorded: snippetMatched(snippets, "cleanup-recorded")
      && snippetMatched(snippets, "cleanup-finally-recorded")
      && snippetMatched(snippets, "temp-dir-no-residue"),
    javaV80GuardLinkageRecorded: snippetMatched(snippets, "java-v80-recorded"),
    miniKvV89GuardLinkageRecorded: snippetMatched(snippets, "mini-kv-v89-recorded")
      && snippetMatched(snippets, "mini-kv-storage-boundary"),
    forbiddenOperationsRecorded: snippetMatched(snippets, "production-blocked")
      && snippetMatched(snippets, "html-production-blocked"),
    previousPlanClosedOut: snippetMatched(snippets, "previous-plan-v221-done")
      && snippetMatched(snippets, "previous-plan-handoff"),
    activePlanPointsToV222: snippetMatched(snippets, "plan-points-to-v222"),
    activePlanRequiresParallelJavaMiniKvGuards: snippetMatched(snippets, "plan-parallel-v81-v90")
      && snippetMatched(snippets, "plan-no-production-jump"),
    noSourceEndpointRerun: true,
    noAdditionalLocalDryRunWrite: true,
    currentV221TempDirectoriesAbsent: v221TempDirectoriesPresent === 0,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
    productionAuditStillBlocked: true,
    restoreExecutionStillBlocked: true,
    readyForManagedAuditLocalAdapterCandidateVerificationReport: allSnippetsMatched,
  };
}

function collectProductionBlockers(
  checks: ManagedAuditLocalAdapterCandidateVerificationReportProfile["checks"],
): VerificationReportMessage[] {
  const blockers: VerificationReportMessage[] = [];
  addMessage(blockers, checks.archiveFilesPresent, "V221_ARCHIVE_FILES_MISSING", "v221-archive", "All v221 archive files must exist before the verification report is ready.");
  addMessage(blockers, checks.archiveFilesNonEmpty, "V221_ARCHIVE_FILES_EMPTY", "v221-archive", "All v221 archive files must be non-empty.");
  addMessage(blockers, checks.sourceCandidateStateRecorded, "SOURCE_CANDIDATE_STATE_MISSING", "v221-archive", "The v221 archive must record local-adapter-dry-run-verified.");
  addMessage(blockers, checks.sourceDigestLinkageRecorded, "SOURCE_DIGEST_LINKAGE_MISSING", "v221-archive", "The v221 archive must record digest and guard linkage.");
  addMessage(blockers, checks.sourceCleanupEvidenceRecorded, "SOURCE_CLEANUP_EVIDENCE_MISSING", "v221-archive", "The v221 archive must record cleanup and no leftover temp directory evidence.");
  addMessage(blockers, checks.javaV80GuardLinkageRecorded, "JAVA_V80_GUARD_LINKAGE_MISSING", "v221-archive", "The v221 archive must link Java v80 guard evidence.");
  addMessage(blockers, checks.miniKvV89GuardLinkageRecorded, "MINIKV_V89_GUARD_LINKAGE_MISSING", "v221-archive", "The v221 archive must link mini-kv v89 non-storage guard evidence.");
  addMessage(blockers, checks.previousPlanClosedOut, "PREVIOUS_PLAN_NOT_CLOSED", "v219-plan", "The v219 post-implementation plan must be closed out by v221.");
  addMessage(blockers, checks.activePlanPointsToV222, "ACTIVE_PLAN_NOT_POINTING_TO_V222", "v221-plan", "The active post-v221 plan must point to Node v222.");
  addMessage(blockers, checks.noSourceEndpointRerun, "SOURCE_ENDPOINT_RERUN_DETECTED", "managed-audit-local-adapter-candidate-verification-report", "v222 must not rerun the v221 dry-run endpoint.");
  addMessage(blockers, checks.noAdditionalLocalDryRunWrite, "ADDITIONAL_LOCAL_DRY_RUN_WRITE_DETECTED", "managed-audit-local-adapter-candidate-verification-report", "v222 must not add another local dry-run write.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_UNLOCKED", "managed-audit-local-adapter-candidate-verification-report", "v222 must not unlock production audit.");
  return blockers;
}

function collectWarnings(): VerificationReportMessage[] {
  return [
    {
      code: "READS_ARCHIVE_ONLY",
      severity: "warning",
      source: "managed-audit-local-adapter-candidate-verification-report",
      message: "The report reads v221 archive files and does not rerun the local adapter candidate endpoint.",
    },
  ];
}

function collectRecommendations(): VerificationReportMessage[] {
  return [
    {
      code: "RUN_PARALLEL_EXTERNAL_ADAPTER_GUARDS",
      severity: "recommendation",
      source: "managed-audit-local-adapter-candidate-verification-report",
      message: "Proceed with the planned parallel Java v81 and mini-kv v90 guard receipts.",
    },
    {
      code: "KEEP_V223_AS_READINESS_REVIEW",
      severity: "recommendation",
      source: "managed-audit-local-adapter-candidate-verification-report",
      message: "Node v223 should review external adapter connection readiness, not connect to production managed audit.",
    },
  ];
}

function archiveFile(id: string, relativePath: string): ArchiveFileEvidence {
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
  const content = readFileSync(absolutePath);
  return {
    id,
    path: relativePath,
    exists: true,
    sizeBytes: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function snippet(id: string, relativePath: string, expectedText: string): ArchiveSnippetEvidence {
  const absolutePath = path.join(process.cwd(), relativePath);
  const content = existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
  return {
    id,
    path: relativePath,
    expectedText,
    matched: content.includes(expectedText),
  };
}

function fileById(files: ArchiveFileEvidence[], id: string): ArchiveFileEvidence {
  return files.find((file) => file.id === id) ?? {
    id,
    path: "",
    exists: false,
    sizeBytes: 0,
    digest: null,
  };
}

function snippetMatched(snippets: ArchiveSnippetEvidence[], id: string): boolean {
  return snippets.some((snippetEvidence) => snippetEvidence.id === id && snippetEvidence.matched);
}

function countV221TempDirectories(): number {
  const tmpRoot = path.join(process.cwd(), ".tmp");
  if (!existsSync(tmpRoot)) {
    return 0;
  }
  return readdirSync(tmpRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("managed-audit-v221-"))
    .length;
}

function renderArchiveFile(file: ArchiveFileEvidence): string[] {
  return [
    `### ${file.id}`,
    "",
    `- Path: ${file.path}`,
    `- Exists: ${file.exists}`,
    `- Size bytes: ${file.sizeBytes}`,
    `- Digest: ${file.digest ?? "missing"}`,
    "",
  ];
}

function renderSnippet(snippetEvidence: ArchiveSnippetEvidence): string[] {
  return [
    `### ${snippetEvidence.id}`,
    "",
    `- Path: ${snippetEvidence.path}`,
    `- Matched: ${snippetEvidence.matched}`,
    `- Expected text: ${snippetEvidence.expectedText}`,
    "",
  ];
}

function addMessage(
  messages: VerificationReportMessage[],
  condition: boolean,
  code: string,
  source: VerificationReportMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}
