import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
  DisabledRuntimeShellDesignDraftCandidateArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftCandidateArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftCandidateArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationProfile,
  SourceNodeV331DisabledRuntimeShellDesignDraftCandidateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-archive-verification";
const SOURCE_NODE_V331_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-candidate-review";
const ACTIVE_PLAN = "docs/plans2/v330-post-candidate-gate-upstream-hardening-roadmap.md";
const NEXT_PLAN = "docs/plans2/v332-post-disabled-design-draft-candidate-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/331";
const V331_BASENAME = "disabled-runtime-shell-design-draft-candidate-review-v331";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb52/336-disabled-runtime-shell-design-draft-candidate-review-v331.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification(
  input: {
    config: AppConfig;
    archiveRoot?: string;
    evidencePaths?: {
      javaV150EvidencePath?: string;
      miniKvV142ReceiptPath?: string;
      javaV151EvidencePath?: string;
      javaV152EvidencePath?: string;
      miniKvV143ReceiptPath?: string;
    };
  },
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerificationProfile {
  const sourceNodeV331 = createSourceNodeV331(input.config, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV331, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV331, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV331, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV331, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft candidate archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-candidate-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "proceed-to-disabled-design-draft-outline-intake" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV331DisabledRuntimeShellDesignDraftCandidateReview: true,
    activeNodeVersion: "Node v332",
    sourceNodeVersion: "Node v331",
    readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: ready,
    readyForDisabledRuntimeShellDesignDraft: false,
    readyForDisabledRuntimeShellDesignDraftOutline: false,
    readyForRuntimeShellImplementation: false,
    readyForRuntimeShellInvocation: false,
    readyForManagedAuditResolverImplementation: false,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    runtimeShellImplemented: false,
    runtimeShellEnabled: false,
    runtimeShellInvocationAllowed: false,
    realResolverImplementationAllowed: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    httpRequestSent: false,
    tcpConnectionAttempted: false,
    networkSocketOpened: false,
    javaServiceStarted: false,
    miniKvServiceStarted: false,
    javaSqlExecutionAllowed: false,
    approvalLedgerWritten: false,
    schemaMigrationExecuted: false,
    rollbackExecutionAllowed: false,
    deploymentActionAllowed: false,
    miniKvWriteCommandAllowed: false,
    miniKvLoadAllowed: false,
    miniKvCompactAllowed: false,
    miniKvRestoreAllowed: false,
    miniKvSetnxexAllowed: false,
    automaticUpstreamStart: false,
    sourceNodeV331,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftCandidateArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftCandidateArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV331Json: SOURCE_NODE_V331_ROUTE,
      sourceNodeV331Markdown: `${SOURCE_NODE_V331_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v333",
    },
    nextActions: [
      "Use Node v333 for a disabled design draft outline intake only after this archive verification is committed and tagged.",
      "Keep the next outline non-executable: no provider/client, credential value, raw endpoint URL, HTTP/TCP, Java writes, mini-kv writes/admin, or automatic upstream start.",
      "Do not request Java or mini-kv echo until a later version introduces new contract fields that need upstream confirmation.",
      "If any archive reference, smoke evidence, or historical fallback evidence drifts, stop before drafting the outline.",
    ],
  };
}

function createSourceNodeV331(
  config: AppConfig,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV331DisabledRuntimeShellDesignDraftCandidateReviewReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview({
      config,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v331",
    profileVersion: source.profileVersion,
    candidateReviewState: source.candidateReviewState,
    candidateReviewDecision: source.candidateReviewDecision,
    readyForCandidateReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateReview,
    readyForNodeV332ArchiveVerification: source.readyForNodeV332ArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    candidateReviewDigest: source.candidateReview.reviewDigest,
    sourceNodeV330Digest: source.sourceNodeV330.hardeningReviewDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    reviewQuestionCount: source.summary.reviewQuestionCount,
    stopConditionCount: source.summary.stopConditionCount,
    runtimeShellImplemented: source.runtimeShellImplemented,
    runtimeShellInvocationAllowed: source.runtimeShellInvocationAllowed,
    realResolverImplementationAllowed: source.realResolverImplementationAllowed,
    executionAllowed: source.executionAllowed,
    connectsManagedAudit: source.connectsManagedAudit,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    httpRequestSent: source.httpRequestSent,
    tcpConnectionAttempted: source.tcpConnectionAttempted,
    automaticUpstreamStart: source.automaticUpstreamStart,
    javaSqlExecutionAllowed: source.javaSqlExecutionAllowed,
    approvalLedgerWritten: source.approvalLedgerWritten,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    rollbackExecutionAllowed: source.rollbackExecutionAllowed,
    miniKvWriteCommandAllowed: source.miniKvWriteCommandAllowed,
    miniKvLoadAllowed: source.miniKvLoadAllowed,
    miniKvCompactAllowed: source.miniKvCompactAllowed,
    miniKvRestoreAllowed: source.miniKvRestoreAllowed,
    miniKvSetnxexAllowed: source.miniKvSetnxexAllowed,
  };
}

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftCandidateArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V331_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V331_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V331_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V331_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V331_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V331_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V331_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V331_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    activePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans2", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): ArchiveFileReference {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  if (!existsSync(absolutePath)) {
    return { path: relativePath, exists: false, byteLength: 0, digest: null };
  }

  const content = readFileSync(absolutePath);
  return {
    path: relativePath,
    exists: true,
    byteLength: statSync(absolutePath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function readParsedArchiveEvidence(
  refs: DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
): ParsedArchiveEvidence {
  return {
    json: readJsonFile(refs.jsonEvidence.path),
    markdown: readTextFile(refs.markdownEvidence.path),
    smokeSummary: readJsonFile(refs.smokeSummary.path),
    explanation: readTextFile(refs.explanation.path),
    codeWalkthrough: readTextFile(refs.codeWalkthrough.path),
    activePlan: readTextFile(refs.activePlan.path),
    plansIndex: readTextFile(refs.plansIndex.path),
  };
}

function readTextFile(relativePath: string): string {
  const absolutePath = path.join(process.cwd(), ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
}

function readJsonFile(relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(relativePath);
  if (text.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(text);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

function createArchiveVerification(
  sourceNodeV331: SourceNodeV331DisabledRuntimeShellDesignDraftCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "candidateReview", "reviewDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceCandidateReviewDigest: sourceNodeV331.candidateReviewDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v331-archive-verification",
    sourceSpan: "Node v331 disabled runtime shell design draft candidate review archive",
    decision: ready ? "proceed-to-disabled-design-draft-outline-intake" : "blocked",
    archiveRoot: "d/331",
    verifiesRouteAndMarkdown: true,
    verifiesSmokeSummary: true,
    verifiesScreenshotAndExplanation: true,
    verifiesCodeWalkthroughAndPlanIndex: true,
    verifiesHistoricalFallbackArchive: true,
    rerunsSourceEndpoint: false,
    opensDisabledDesignDraftOutlineNow: false,
    implementsRuntimeShell: false,
    invokesRuntimeShell: false,
    requestsJavaMiniKvEcho: false,
    readyForNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: ready,
    nextNodeVersionSuggested: "Node v333",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV331: SourceNodeV331DisabledRuntimeShellDesignDraftCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "candidateReviewState") === "disabled-runtime-shell-design-draft-candidate-review-ready"
    && valueAt(archive.json, "candidateReviewDecision") === "archive-before-disabled-design-draft-outline"
    && valueAt(archive.json, "readyForNodeV332ArchiveVerification") === true;
  const jsonDigest = valueAt(archive.json, "candidateReview", "reviewDigest");
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
    && valueAt(archive.smokeSummary, "readyForNodeV332ArchiveVerification") === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV331Ready:
      sourceNodeV331.candidateReviewState === "disabled-runtime-shell-design-draft-candidate-review-ready"
      && sourceNodeV331.candidateReviewDecision === "archive-before-disabled-design-draft-outline"
      && sourceNodeV331.readyForCandidateReview
      && sourceNodeV331.readyForNodeV332ArchiveVerification
      && sourceNodeV331.sourceProductionBlockerCount === 0,
    sourceNodeV331RequiresArchiveVerification:
      sourceNodeV331.readyForNodeV332ArchiveVerification && sourceNodeV331.reviewQuestionCount === 5,
    sourceNodeV331KeepsDesignDraftClosed:
      !sourceNodeV331.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV331.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV331KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV331.runtimeShellImplemented
      && !sourceNodeV331.runtimeShellInvocationAllowed
      && !sourceNodeV331.realResolverImplementationAllowed
      && !sourceNodeV331.executionAllowed
      && !sourceNodeV331.connectsManagedAudit
      && !sourceNodeV331.credentialValueRead
      && !sourceNodeV331.rawEndpointUrlParsed
      && !sourceNodeV331.externalRequestSent
      && !sourceNodeV331.httpRequestSent
      && !sourceNodeV331.tcpConnectionAttempted
      && !sourceNodeV331.automaticUpstreamStart
      && !sourceNodeV331.javaSqlExecutionAllowed
      && !sourceNodeV331.approvalLedgerWritten
      && !sourceNodeV331.schemaMigrationExecuted
      && !sourceNodeV331.rollbackExecutionAllowed
      && !sourceNodeV331.miniKvWriteCommandAllowed
      && !sourceNodeV331.miniKvLoadAllowed
      && !sourceNodeV331.miniKvCompactAllowed
      && !sourceNodeV331.miniKvRestoreAllowed
      && !sourceNodeV331.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigest === sourceNodeV331.candidateReviewDigest,
    jsonEvidenceKeepsCandidateReviewReady: jsonReady,
    markdownEvidenceRecordsCandidateBoundary:
      archive.markdown.includes("Ready for Node v332 archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("Requests Java/mini-kv echo: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("--maxWorkers=2")
      && archive.explanation.includes("Chrome headless")
      && archive.explanation.includes("22/22"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v331 disabled runtime shell design draft candidate review"),
    planIndexReferencesV331AndV332:
      archive.activePlan.includes("Node v331")
      && archive.activePlan.includes("Node v332")
      && archive.plansIndex.includes("Node v331")
      && archive.plansIndex.includes("Node v332"),
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    archiveVerificationDoesNotRerunEndpoint: !verification.rerunsSourceEndpoint,
    noRuntimeDesignDraftCreated: !verification.opensDisabledDesignDraftOutlineNow,
    noRuntimeImplementationCreated: !verification.implementsRuntimeShell,
    noRuntimeInvocationAllowed: !verification.invokesRuntimeShell,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    noProviderClientInstantiated: true,
    noExternalRequestSent: true,
    noJavaOrMiniKvWrites: true,
    noUpstreamEchoRequested: !verification.requestsJavaMiniKvEcho,
    upstreamProbesStillDisabled: !config.upstreamProbesEnabled,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftCandidateArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
): ArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.smokeSummary,
    refs.routeSnapshot,
    refs.browserSnapshot,
    refs.htmlArchive,
    refs.screenshot,
    refs.explanation,
    refs.codeWalkthrough,
    refs.activePlan,
    refs.plansIndex,
  ];
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV331Ready, "NODE_V331_NOT_READY", "node-v331",
    "Node v331 candidate review is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV331RequiresArchiveVerification, "NODE_V331_ARCHIVE_GATE_MISSING",
    "node-v331", "Node v331 did not require archive verification before a design outline.");
  addBlocker(messages, checks.sourceNodeV331KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v331 already opened a design draft or outline.");
  addBlocker(messages, checks.sourceNodeV331KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v331 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v331 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v331 JSON candidate review digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsCandidateReviewReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v331 JSON does not record the ready candidate review state.");
  addBlocker(messages, checks.markdownEvidenceRecordsCandidateBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v331 Markdown does not record the candidate and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v331 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV331AndV332, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v331 and v332.");
  addBlocker(messages, checks.noRuntimeDesignDraftCreated, "DESIGN_DRAFT_OPENED_TOO_EARLY", "runtime-boundary",
    "v332 must not create the design draft outline; it only verifies the v331 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v332 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_DESIGN_OUTLINE",
      severity: "warning",
      source: "archive-files",
      message: "v332 verifies v331 archive evidence only; it does not create the disabled runtime shell design outline.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V333_OUTLINE_INTAKE_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v332 remains verified, use Node v333 for a disabled design draft outline intake and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV331: SourceNodeV331DisabledRuntimeShellDesignDraftCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftCandidateArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftCandidateArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV331CheckCount: sourceNodeV331.sourceCheckCount,
    sourceNodeV331PassedCheckCount: sourceNodeV331.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV331.sourceProductionBlockerCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftCandidateArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function valueAt(source: Record<string, unknown> | null, ...segments: string[]): unknown {
  let current: unknown = source;
  for (const segment of segments) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}
