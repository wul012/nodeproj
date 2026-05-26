import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
  DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationProfile,
  SourceNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReviewReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-archive-verification";
const SOURCE_NODE_V337_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-candidate-review";
const ACTIVE_PLAN = "docs/plans2/v336-post-disabled-design-draft-body-intake-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v338-post-disabled-design-draft-body-candidate-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/337";
const V337_BASENAME = "disabled-design-draft-body-candidate-review-v337";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/342-disabled-design-draft-body-candidate-review-v337.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationProfile {
  const sourceNodeV337 = createSourceNodeV337(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV337, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV337, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV337, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV337, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body candidate archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-body-candidate-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "body-candidate-archive-verified-before-design-body" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: true,
    activeNodeVersion: "Node v338",
    sourceNodeVersion: "Node v337",
    readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: ready,
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
    sourceNodeV337,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV337Json: SOURCE_NODE_V337_ROUTE,
      sourceNodeV337Markdown: `${SOURCE_NODE_V337_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v339",
    },
    nextActions: [
      "Treat Node v338 as archive verification only; it validates v337 before any body draft is considered.",
      "If v338 remains clean, use the next plan to decide whether Node v339 may start a pre-draft decision step.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any design body, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV337(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReviewReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v337",
    profileVersion: source.profileVersion,
    bodyCandidateReviewState: source.bodyCandidateReviewState,
    bodyCandidateReviewDecision: source.bodyCandidateReviewDecision,
    readyForBodyCandidateReview:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateReview,
    readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
      source.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    reviewDigest: source.bodyCandidateReview.reviewDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV336.archiveVerificationDigest,
    sourceBodyIntakeDigest: source.sourceNodeV336.sourceBodyIntakeDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceArchiveFileCount: source.summary.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: source.summary.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sourceBodySectionCount: source.summary.sourceBodySectionCount,
    sourceEvidenceItemCount: source.summary.sourceEvidenceItemCount,
    sourceStopConditionCount: source.summary.sourceStopConditionCount,
    reviewQuestionCount: source.summary.reviewQuestionCount,
    answeredReviewQuestionCount: source.summary.answeredReviewQuestionCount,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V337_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V337_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V337_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V337_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V337_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V337_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V337_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V337_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
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
  sourceNodeV337: SourceNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "bodyCandidateReview", "reviewDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceReviewDigest: sourceNodeV337.reviewDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v337-body-candidate-review-archive-verification",
    sourceSpan: "Node v337 disabled design draft body candidate review archive",
    decision: ready ? "body-candidate-archive-verified-before-design-body" : "blocked",
    archiveRoot: ARCHIVE_ROOT,
    verifiesRouteAndMarkdown: true,
    verifiesSmokeSummary: true,
    verifiesScreenshotAndExplanation: true,
    verifiesCodeWalkthroughAndPlanIndex: true,
    verifiesHistoricalFallbackArchive: true,
    rerunsSourceEndpoint: false,
    opensDisabledDesignDraftBodyNow: false,
    implementsRuntimeShell: false,
    invokesRuntimeShell: false,
    requestsJavaMiniKvEcho: false,
    readyForNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: ready,
    nextNodeVersionSuggested: "Node v339",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV337: SourceNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "bodyCandidateReviewState")
      === "disabled-runtime-shell-design-draft-body-candidate-review-ready"
    && valueAt(archive.json, "bodyCandidateReviewDecision") === "archive-before-disabled-design-draft-body"
    && valueAt(
      archive.json,
      "readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification",
    ) === true
    && valueAt(
      archive.json,
      "bodyCandidateReview",
      "readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification",
    ) === true;
  const jsonDigest = valueAt(archive.json, "bodyCandidateReview", "reviewDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV337.reviewDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonCandidateReviewDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV337Ready:
      sourceNodeV337.bodyCandidateReviewState === "disabled-runtime-shell-design-draft-body-candidate-review-ready"
      && sourceNodeV337.bodyCandidateReviewDecision === "archive-before-disabled-design-draft-body"
      && sourceNodeV337.readyForBodyCandidateReview
      && sourceNodeV337.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification
      && sourceNodeV337.sourceProductionBlockerCount === 0,
    sourceNodeV337RequiresArchiveVerification:
      sourceNodeV337.readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification
      && sourceNodeV337.reviewQuestionCount === 5
      && sourceNodeV337.answeredReviewQuestionCount === 5
      && sourceNodeV337.stopConditionCount === 8,
    sourceNodeV337KeepsDesignDraftClosed:
      !sourceNodeV337.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV337.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV337KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV337.runtimeShellImplemented
      && !sourceNodeV337.runtimeShellInvocationAllowed
      && !sourceNodeV337.realResolverImplementationAllowed
      && !sourceNodeV337.executionAllowed
      && !sourceNodeV337.connectsManagedAudit
      && !sourceNodeV337.credentialValueRead
      && !sourceNodeV337.rawEndpointUrlParsed
      && !sourceNodeV337.externalRequestSent
      && !sourceNodeV337.httpRequestSent
      && !sourceNodeV337.tcpConnectionAttempted
      && !sourceNodeV337.automaticUpstreamStart
      && !sourceNodeV337.javaSqlExecutionAllowed
      && !sourceNodeV337.approvalLedgerWritten
      && !sourceNodeV337.schemaMigrationExecuted
      && !sourceNodeV337.rollbackExecutionAllowed
      && !sourceNodeV337.miniKvWriteCommandAllowed
      && !sourceNodeV337.miniKvLoadAllowed
      && !sourceNodeV337.miniKvCompactAllowed
      && !sourceNodeV337.miniKvRestoreAllowed
      && !sourceNodeV337.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsBodyCandidateReviewReady: jsonReady,
    markdownEvidenceRecordsBodyBoundary:
      archive.markdown.includes("Ready for Node v338 body candidate archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("--maxWorkers=2")
      && archive.explanation.includes("Chrome headless")
      && archive.explanation.includes("22/22"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v337 disabled design draft body candidate review"),
    planIndexReferencesV337AndV338:
      archive.activePlan.includes("Node v337")
      && archive.activePlan.includes("Node v338")
      && archive.plansIndex.includes("Node v337")
      && archive.plansIndex.includes("Node v338"),
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    archiveVerificationDoesNotRerunEndpoint: !verification.rerunsSourceEndpoint,
    noBodyDraftCreated: !verification.opensDisabledDesignDraftBodyNow,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
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
  checks: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV337Ready, "NODE_V337_NOT_READY", "node-v337",
    "Node v337 body candidate review is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV337RequiresArchiveVerification, "NODE_V337_ARCHIVE_GATE_MISSING",
    "node-v337", "Node v337 did not require archive verification before any design body draft.");
  addBlocker(messages, checks.sourceNodeV337KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v337 already opened a design draft body or outline.");
  addBlocker(messages, checks.sourceNodeV337KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v337 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v337 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v337 JSON body candidate review digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsBodyCandidateReviewReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v337 JSON does not record the ready body candidate review state.");
  addBlocker(messages, checks.markdownEvidenceRecordsBodyBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v337 Markdown does not record the body candidate review and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v337 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV337AndV338, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v337 and v338.");
  addBlocker(messages, checks.noBodyDraftCreated, "BODY_DRAFT_OPENED_TOO_EARLY", "runtime-boundary",
    "v338 must not create the design draft body; it only verifies the v337 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v338 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "archive-files",
      message: "v338 verifies v337 archive evidence only; it does not create the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V339_PRE_DRAFT_DECISION_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v338 remains verified, use the next plan for a pre-draft decision and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV337: SourceNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReviewReference,
  refs: DisabledRuntimeShellDesignDraftBodyCandidateArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV337CheckCount: sourceNodeV337.sourceCheckCount,
    sourceNodeV337PassedCheckCount: sourceNodeV337.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV337.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV337.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV337.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV337.sourceBodySectionCount,
    sourceEvidenceItemCount: sourceNodeV337.sourceEvidenceItemCount,
    sourceStopConditionCount: sourceNodeV337.sourceStopConditionCount,
    reviewQuestionCount: sourceNodeV337.reviewQuestionCount,
    answeredReviewQuestionCount: sourceNodeV337.answeredReviewQuestionCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerificationMessage["source"],
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

function archiveJsonCandidateReviewDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "bodyCandidateReview", "reviewDigest");
  if (!isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV336", "archiveVerificationDigest"),
    sourceBodyIntakeDigest: valueAt(source, "sourceNodeV336", "sourceBodyIntakeDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    reviewQuestions: valueAt(source, "reviewQuestions"),
    stopConditions: valueAt(source, "stopConditions"),
    readyForNodeV338ArchiveVerification: valueAt(
      source,
      "bodyCandidateReview",
      "readyForNodeV338DisabledRuntimeShellDesignDraftBodyCandidateArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
