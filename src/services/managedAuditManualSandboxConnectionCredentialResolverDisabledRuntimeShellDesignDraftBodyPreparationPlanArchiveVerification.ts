import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationProfile,
  SourceNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlanReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan-archive-verification";
const SOURCE_NODE_V341_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-preparation-plan";
const ACTIVE_PLAN = "docs/plans2/v340-post-disabled-design-draft-body-pre-draft-decision-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v342-post-disabled-design-draft-body-preparation-plan-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/341";
const V341_BASENAME = "disabled-design-draft-body-preparation-plan-v341";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/346-disabled-design-draft-body-preparation-plan-v341.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationProfile {
  const sourceNodeV341 = createSourceNodeV341(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV341, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV341, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV341, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV341, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body preparation plan archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-body-preparation-plan-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "preparation-plan-archive-verified-before-body-draft" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlan: true,
    activeNodeVersion: "Node v342",
    sourceNodeVersion: "Node v341",
    readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: ready,
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
    sourceNodeV341,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV341Json: SOURCE_NODE_V341_ROUTE,
      sourceNodeV341Markdown: `${SOURCE_NODE_V341_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v343",
    },
    nextActions: [
      "Treat Node v342 as archive verification only; it validates v341 before any disabled body draft candidate.",
      "If v342 remains clean, use the next plan to decide whether Node v343 may create a disabled body draft candidate without runtime behavior.",
      "Do not request Java or mini-kv echo until a later version defines new non-secret handoff fields that need upstream confirmation.",
      "Pause before any body draft content, credential value, raw endpoint URL, provider/client, HTTP/TCP, Java write, mini-kv write/admin command, or automatic upstream start.",
    ],
  };
}

function createSourceNodeV341(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlanReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v341",
    profileVersion: source.profileVersion,
    preparationPlanState: source.preparationPlanState,
    preparationPlanDecision: source.preparationPlanDecision,
    readyForPreparationPlan:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlan,
    readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
      source.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    planDigest: source.bodyPreparationPlan.planDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV340.archiveVerificationDigest,
    sourceDecisionDigest: source.sourceNodeV340.sourceDecisionDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceArchiveFileCount: source.summary.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: source.summary.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceSectionPlanCount: source.summary.sectionPlanCount,
    sourceEvidenceMappingCount: source.summary.evidenceMappingCount,
    sourceStopConditionCount: source.summary.stopConditionCount,
    sourceDraftGuardCount: source.summary.draftGuardCount,
    sourceEnforcedDraftGuardCount: source.summary.enforcedDraftGuardCount,
    sourcePlannedSectionCount: source.summary.plannedSectionCount,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V341_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V341_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V341_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V341_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V341_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V341_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V341_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V341_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
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
  sourceNodeV341: SourceNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlanReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "bodyPreparationPlan", "planDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourcePlanDigest: sourceNodeV341.planDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v341-preparation-plan-archive-verification",
    sourceSpan: "Node v341 disabled design draft body preparation plan archive",
    decision: ready ? "preparation-plan-archive-verified-before-body-draft" : "blocked",
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
    readyForNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: ready,
    nextNodeVersionSuggested: "Node v343",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV341: SourceNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlanReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "preparationPlanState")
      === "disabled-runtime-shell-design-draft-body-preparation-plan-ready"
    && valueAt(archive.json, "preparationPlanDecision") === "prepare-disabled-body-draft-plan-after-archive-verification"
    && valueAt(
      archive.json,
      "readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification",
    ) === true
    && valueAt(
      archive.json,
      "bodyPreparationPlan",
      "readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification",
    ) === true;
  const jsonDigest = valueAt(archive.json, "bodyPreparationPlan", "planDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV341.planDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonPreparationPlanDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && (
      valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
      || valueAt(archive.smokeSummary, "fallbackEnabled") === null
    )
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV341Ready:
      sourceNodeV341.preparationPlanState === "disabled-runtime-shell-design-draft-body-preparation-plan-ready"
      && sourceNodeV341.preparationPlanDecision === "prepare-disabled-body-draft-plan-after-archive-verification"
      && sourceNodeV341.readyForPreparationPlan
      && sourceNodeV341.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification
      && sourceNodeV341.sourceProductionBlockerCount === 0,
    sourceNodeV341RequiresArchiveVerification:
      sourceNodeV341.readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification
      && sourceNodeV341.sourceSectionPlanCount === 8
      && sourceNodeV341.sourcePlannedSectionCount === 8
      && sourceNodeV341.sourceEvidenceMappingCount === 6
      && sourceNodeV341.sourceDraftGuardCount === 8
      && sourceNodeV341.sourceEnforcedDraftGuardCount === 8
      && sourceNodeV341.sourceStopConditionCount === 8,
    sourceNodeV341KeepsDesignDraftClosed:
      !sourceNodeV341.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV341.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV341KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV341.runtimeShellImplemented
      && !sourceNodeV341.runtimeShellInvocationAllowed
      && !sourceNodeV341.realResolverImplementationAllowed
      && !sourceNodeV341.executionAllowed
      && !sourceNodeV341.connectsManagedAudit
      && !sourceNodeV341.credentialValueRead
      && !sourceNodeV341.rawEndpointUrlParsed
      && !sourceNodeV341.externalRequestSent
      && !sourceNodeV341.httpRequestSent
      && !sourceNodeV341.tcpConnectionAttempted
      && !sourceNodeV341.automaticUpstreamStart
      && !sourceNodeV341.javaSqlExecutionAllowed
      && !sourceNodeV341.approvalLedgerWritten
      && !sourceNodeV341.schemaMigrationExecuted
      && !sourceNodeV341.rollbackExecutionAllowed
      && !sourceNodeV341.miniKvWriteCommandAllowed
      && !sourceNodeV341.miniKvLoadAllowed
      && !sourceNodeV341.miniKvCompactAllowed
      && !sourceNodeV341.miniKvRestoreAllowed
      && !sourceNodeV341.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsPreparationPlanReady: jsonReady,
    markdownEvidenceRecordsPreparationBoundary:
      archive.markdown.includes("Ready for Node v342 body preparation plan archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("full vitest stable mode")
      && archive.explanation.includes("Chrome DevTools MCP")
      && archive.explanation.includes("25/25"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v341 disabled design draft body preparation plan"),
    planIndexReferencesV341AndV342:
      archive.activePlan.includes("Node v341")
      && archive.activePlan.includes("Node v342")
      && archive.plansIndex.includes("Node v341")
      && archive.plansIndex.includes("Node v342"),
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
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
  checks: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV341Ready, "NODE_V341_NOT_READY", "node-v341",
    "Node v341 preparation plan is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV341RequiresArchiveVerification, "NODE_V341_ARCHIVE_GATE_MISSING",
    "node-v341", "Node v341 did not require archive verification before any body draft preparation.");
  addBlocker(messages, checks.sourceNodeV341KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v341 already opened a design draft body or outline.");
  addBlocker(messages, checks.sourceNodeV341KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v341 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v341 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v341 JSON preparation plan digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsPreparationPlanReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v341 JSON does not record the ready preparation plan state.");
  addBlocker(messages, checks.markdownEvidenceRecordsPreparationBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v341 Markdown does not record the preparation plan and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v341 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV341AndV342, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v341 and v342.");
  addBlocker(messages, checks.noBodyDraftWritten, "BODY_DRAFT_WRITTEN_TOO_EARLY", "runtime-boundary",
    "v342 must not create the design draft body; it only verifies the v341 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v342 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "archive-files",
      message: "v342 verifies v341 archive evidence only; it does not create the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V343_BODY_DRAFT_CANDIDATE_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v342 remains verified, use the next plan for a disabled body draft candidate and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV341: SourceNodeV341DisabledRuntimeShellDesignDraftBodyPreparationPlanReference,
  refs: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV341CheckCount: sourceNodeV341.sourceCheckCount,
    sourceNodeV341PassedCheckCount: sourceNodeV341.sourcePassedCheckCount,
    sourceArchiveFileCount: sourceNodeV341.sourceArchiveFileCount,
    sourcePresentArchiveFileCount: sourceNodeV341.sourcePresentArchiveFileCount,
    sourceProductionBlockerCount: sourceNodeV341.sourceProductionBlockerCount,
    sourceSectionPlanCount: sourceNodeV341.sourceSectionPlanCount,
    sourceEvidenceMappingCount: sourceNodeV341.sourceEvidenceMappingCount,
    sourceDraftGuardCount: sourceNodeV341.sourceDraftGuardCount,
    sourceEnforcedDraftGuardCount: sourceNodeV341.sourceEnforcedDraftGuardCount,
    sourcePlannedSectionCount: sourceNodeV341.sourcePlannedSectionCount,
    sourceStopConditionCount: sourceNodeV341.sourceStopConditionCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerificationMessage["source"],
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

function archiveJsonPreparationPlanDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "bodyPreparationPlan", "planDigest");
  if (!isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV340", "archiveVerificationDigest"),
    sourceDecisionDigest: valueAt(source, "sourceNodeV340", "sourceDecisionDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    sectionPlans: valueAt(source, "sectionPlans"),
    evidenceMappings: valueAt(source, "evidenceMappings"),
    draftGuards: valueAt(source, "draftGuards"),
    stopConditions: valueAt(source, "stopConditions"),
    readyForNodeV342: valueAt(
      source,
      "bodyPreparationPlan",
      "readyForNodeV342DisabledRuntimeShellDesignDraftBodyPreparationPlanArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}


