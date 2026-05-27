import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationProfile,
  SourceNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecisionReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision-archive-verification";
const SOURCE_NODE_V339_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-pre-draft-decision";
const ACTIVE_PLAN = "docs/plans2/v338-post-disabled-design-draft-body-candidate-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v340-post-disabled-design-draft-body-pre-draft-decision-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/339";
const V339_BASENAME = "disabled-design-draft-body-pre-draft-decision-v339";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/344-disabled-design-draft-body-pre-draft-decision-v339.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationProfile {
  const sourceNodeV339 = createSourceNodeV339(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV339, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV339, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV339, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV339, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body pre-draft decision archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-body-pre-draft-decision-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "pre-draft-decision-archive-verified-before-body-draft" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecision: true,
    activeNodeVersion: "Node v340",
    sourceNodeVersion: "Node v339",
    readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: ready,
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
    sourceNodeV339,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV339Json: SOURCE_NODE_V339_ROUTE,
      sourceNodeV339Markdown: `${SOURCE_NODE_V339_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v341",
    },
    nextActions: [
      "Treat Node v340 as archive verification only; it validates v339 before any body draft preparation plan.",
      "If v340 remains clean, use the next plan to decide whether Node v341 may prepare a disabled body draft plan.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV339(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecisionReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v339",
    profileVersion: source.profileVersion,
    preDraftDecisionState: source.preDraftDecisionState,
    preDraftDecision: source.preDraftDecision,
    readyForPreDraftDecision:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecision,
    readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification:
      source.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    decisionDigest: source.preDraftDecisionRecord.decisionDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV338.archiveVerificationDigest,
    sourceReviewDigest: source.sourceNodeV338.sourceReviewDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceArchiveFileCount: source.summary.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: source.summary.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceBodySectionCount: source.summary.sourceBodySectionCount,
    sourceEvidenceItemCount: source.summary.sourceEvidenceItemCount,
    sourceStopConditionCount: source.summary.sourceStopConditionCount,
    decisionQuestionCount: source.summary.decisionQuestionCount,
    answeredDecisionQuestionCount: source.summary.answeredDecisionQuestionCount,
    preparationControlCount: source.summary.preparationControlCount,
    enforcedPreparationControlCount: source.summary.enforcedPreparationControlCount,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V339_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V339_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V339_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V339_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V339_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V339_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V339_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V339_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
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
  sourceNodeV339: SourceNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecisionReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "preDraftDecisionRecord", "decisionDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceDecisionDigest: sourceNodeV339.decisionDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v339-pre-draft-decision-archive-verification",
    sourceSpan: "Node v339 disabled design draft body pre-draft decision archive",
    decision: ready ? "pre-draft-decision-archive-verified-before-body-draft" : "blocked",
    archiveRoot: ARCHIVE_ROOT,
    verifiesRouteAndMarkdown: true,
    verifiesSmokeSummary: true,
    verifiesScreenshotAndExplanation: true,
    verifiesCodeWalkthroughAndPlanIndex: true,
    verifiesHistoricalFallbackArchive: true,
    rerunsSourceEndpoint: false,
    writesBodyDraftNow: false,
    opensDisabledDesignDraftBodyNow: false,
    implementsRuntimeShell: false,
    invokesRuntimeShell: false,
    requestsJavaMiniKvEcho: false,
    readyForNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: ready,
    nextNodeVersionSuggested: "Node v341",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV339: SourceNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecisionReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "preDraftDecisionState")
      === "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready"
    && valueAt(archive.json, "preDraftDecision") === "prepare-body-draft-under-disabled-boundary-after-archive"
    && valueAt(
      archive.json,
      "readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification",
    ) === true
    && valueAt(
      archive.json,
      "preDraftDecisionRecord",
      "readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification",
    ) === true;
  const jsonDigest = valueAt(archive.json, "preDraftDecisionRecord", "decisionDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV339.decisionDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonPreDraftDecisionDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV339Ready:
      sourceNodeV339.preDraftDecisionState === "disabled-runtime-shell-design-draft-body-pre-draft-decision-ready"
      && sourceNodeV339.preDraftDecision === "prepare-body-draft-under-disabled-boundary-after-archive"
      && sourceNodeV339.readyForPreDraftDecision
      && sourceNodeV339.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification
      && sourceNodeV339.sourceProductionBlockerCount === 0,
    sourceNodeV339RequiresArchiveVerification:
      sourceNodeV339.readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification
      && sourceNodeV339.decisionQuestionCount === 5
      && sourceNodeV339.answeredDecisionQuestionCount === 5
      && sourceNodeV339.preparationControlCount === 6
      && sourceNodeV339.enforcedPreparationControlCount === 6
      && sourceNodeV339.stopConditionCount === 8,
    sourceNodeV339KeepsDesignDraftClosed:
      !sourceNodeV339.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV339.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV339KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV339.runtimeShellImplemented
      && !sourceNodeV339.runtimeShellInvocationAllowed
      && !sourceNodeV339.realResolverImplementationAllowed
      && !sourceNodeV339.executionAllowed
      && !sourceNodeV339.connectsManagedAudit
      && !sourceNodeV339.credentialValueRead
      && !sourceNodeV339.rawEndpointUrlParsed
      && !sourceNodeV339.externalRequestSent
      && !sourceNodeV339.httpRequestSent
      && !sourceNodeV339.tcpConnectionAttempted
      && !sourceNodeV339.automaticUpstreamStart
      && !sourceNodeV339.javaSqlExecutionAllowed
      && !sourceNodeV339.approvalLedgerWritten
      && !sourceNodeV339.schemaMigrationExecuted
      && !sourceNodeV339.rollbackExecutionAllowed
      && !sourceNodeV339.miniKvWriteCommandAllowed
      && !sourceNodeV339.miniKvLoadAllowed
      && !sourceNodeV339.miniKvCompactAllowed
      && !sourceNodeV339.miniKvRestoreAllowed
      && !sourceNodeV339.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsPreDraftDecisionReady: jsonReady,
    markdownEvidenceRecordsPreDraftBoundary:
      archive.markdown.includes("Ready for Node v340 pre-draft decision archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("full vitest stable mode")
      && archive.explanation.includes("Chrome headless")
      && archive.explanation.includes("23/23"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v339 disabled design draft body pre-draft decision"),
    planIndexReferencesV339AndV340:
      archive.activePlan.includes("Node v339")
      && archive.activePlan.includes("Node v340")
      && archive.plansIndex.includes("Node v339")
      && archive.plansIndex.includes("Node v340"),
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    archiveVerificationDoesNotRerunEndpoint: !verification.rerunsSourceEndpoint,
    noBodyDraftWritten: !verification.writesBodyDraftNow && !verification.opensDisabledDesignDraftBodyNow,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
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
  checks: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV339Ready, "NODE_V339_NOT_READY", "node-v339",
    "Node v339 pre-draft decision is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV339RequiresArchiveVerification, "NODE_V339_ARCHIVE_GATE_MISSING",
    "node-v339", "Node v339 did not require archive verification before any body draft preparation.");
  addBlocker(messages, checks.sourceNodeV339KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v339 already opened a design draft body or outline.");
  addBlocker(messages, checks.sourceNodeV339KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v339 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v339 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v339 JSON pre-draft decision digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsPreDraftDecisionReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v339 JSON does not record the ready pre-draft decision state.");
  addBlocker(messages, checks.markdownEvidenceRecordsPreDraftBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v339 Markdown does not record the pre-draft decision and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v339 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV339AndV340, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v339 and v340.");
  addBlocker(messages, checks.noBodyDraftWritten, "BODY_DRAFT_WRITTEN_TOO_EARLY", "runtime-boundary",
    "v340 must not create the design draft body; it only verifies the v339 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v340 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "archive-files",
      message: "v340 verifies v339 archive evidence only; it does not create the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V341_BODY_PREPARATION_PLAN_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v340 remains verified, use the next plan for a body preparation plan and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV339: SourceNodeV339DisabledRuntimeShellDesignDraftBodyPreDraftDecisionReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV339CheckCount: sourceNodeV339.sourceCheckCount,
    sourceNodeV339PassedCheckCount: sourceNodeV339.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV339.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV339.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV339.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV339.sourceBodySectionCount,
    sourceEvidenceItemCount: sourceNodeV339.sourceEvidenceItemCount,
    sourceStopConditionCount: sourceNodeV339.sourceStopConditionCount,
    decisionQuestionCount: sourceNodeV339.decisionQuestionCount,
    answeredDecisionQuestionCount: sourceNodeV339.answeredDecisionQuestionCount,
    preparationControlCount: sourceNodeV339.preparationControlCount,
    enforcedPreparationControlCount: sourceNodeV339.enforcedPreparationControlCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerificationMessage["source"],
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

function archiveJsonPreDraftDecisionDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "preDraftDecisionRecord", "decisionDigest");
  if (!isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV338", "archiveVerificationDigest"),
    sourceReviewDigest: valueAt(source, "sourceNodeV338", "sourceReviewDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    decisionQuestions: valueAt(source, "decisionQuestions"),
    preparationControls: valueAt(source, "preparationControls"),
    stopConditions: valueAt(source, "stopConditions"),
    readyForNodeV340: valueAt(
      source,
      "preDraftDecisionRecord",
      "readyForNodeV340DisabledRuntimeShellDesignDraftBodyPreDraftDecisionArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
