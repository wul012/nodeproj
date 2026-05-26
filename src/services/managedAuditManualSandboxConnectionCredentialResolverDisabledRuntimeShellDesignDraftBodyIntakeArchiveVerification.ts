import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
  DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationProfile,
  SourceNodeV335DisabledRuntimeShellDesignDraftBodyIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake-archive-verification";
const SOURCE_NODE_V335_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-intake";
const ACTIVE_PLAN = "docs/plans2/v334-post-disabled-design-draft-outline-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v336-post-disabled-design-draft-body-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/335";
const V335_BASENAME = "disabled-design-draft-body-intake-v335";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/340-disabled-design-draft-body-intake-v335.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationProfile {
  const sourceNodeV335 = createSourceNodeV335(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV335, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV335, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV335, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV335, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-body-intake-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "proceed-to-disabled-design-draft-body-candidate-review" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV335DisabledRuntimeShellDesignDraftBodyIntake: true,
    activeNodeVersion: "Node v336",
    sourceNodeVersion: "Node v335",
    readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: ready,
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
    sourceNodeV335,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV335Json: SOURCE_NODE_V335_ROUTE,
      sourceNodeV335Markdown: `${SOURCE_NODE_V335_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v337",
    },
    nextActions: [
      "Use Node v337 only for a disabled design draft body candidate review after this archive verification is committed and tagged.",
      "Keep the candidate review non-executable: no design body draft, provider/client, credential value, raw endpoint URL, HTTP/TCP, Java writes, mini-kv writes/admin, or automatic upstream start.",
      "Do not request Java or mini-kv echo until a later version introduces new non-secret handoff fields that need upstream confirmation.",
      "If any v335 archive reference, smoke evidence, screenshot, code walkthrough, or plan index drifts, stop before any body candidate review.",
    ],
  };
}

function createSourceNodeV335(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV335DisabledRuntimeShellDesignDraftBodyIntakeReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v335",
    profileVersion: source.profileVersion,
    bodyIntakeState: source.bodyIntakeState,
    bodyIntakeDecision: source.bodyIntakeDecision,
    readyForBodyIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntake,
    readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification:
      source.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    bodyIntakeDigest: source.bodyIntake.intakeDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV334.archiveVerificationDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    bodySectionCount: source.summary.bodySectionCount,
    evidenceItemCount: source.summary.evidenceItemCount,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V335_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V335_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V335_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V335_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V335_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V335_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V335_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V335_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
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
  sourceNodeV335: SourceNodeV335DisabledRuntimeShellDesignDraftBodyIntakeReference,
  refs: DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "bodyIntake", "intakeDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceBodyIntakeDigest: sourceNodeV335.bodyIntakeDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v335-body-intake-archive-verification",
    sourceSpan: "Node v335 disabled runtime shell design draft body intake archive",
    decision: ready ? "proceed-to-disabled-design-draft-body-candidate-review" : "blocked",
    archiveRoot: "d/335",
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
    readyForNodeV337DisabledRuntimeShellDesignDraftBodyCandidateReview: ready,
    nextNodeVersionSuggested: "Node v337",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV335: SourceNodeV335DisabledRuntimeShellDesignDraftBodyIntakeReference,
  refs: DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "bodyIntakeState") === "disabled-runtime-shell-design-draft-body-intake-ready"
    && valueAt(archive.json, "bodyIntakeDecision") === "archive-disabled-body-intake-before-drafting-body"
    && valueAt(archive.json, "readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification") === true
    && valueAt(
      archive.json,
      "bodyIntake",
      "readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification",
    ) === true;
  const jsonDigest = valueAt(archive.json, "bodyIntake", "intakeDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV335.bodyIntakeDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonBodyIntakeDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV335Ready:
      sourceNodeV335.bodyIntakeState === "disabled-runtime-shell-design-draft-body-intake-ready"
      && sourceNodeV335.bodyIntakeDecision === "archive-disabled-body-intake-before-drafting-body"
      && sourceNodeV335.readyForBodyIntake
      && sourceNodeV335.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification
      && sourceNodeV335.sourceProductionBlockerCount === 0,
    sourceNodeV335RequiresArchiveVerification:
      sourceNodeV335.readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification
      && sourceNodeV335.bodySectionCount === 8
      && sourceNodeV335.evidenceItemCount === 6
      && sourceNodeV335.stopConditionCount === 8,
    sourceNodeV335KeepsDesignDraftClosed:
      !sourceNodeV335.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV335.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV335KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV335.runtimeShellImplemented
      && !sourceNodeV335.runtimeShellInvocationAllowed
      && !sourceNodeV335.realResolverImplementationAllowed
      && !sourceNodeV335.executionAllowed
      && !sourceNodeV335.connectsManagedAudit
      && !sourceNodeV335.credentialValueRead
      && !sourceNodeV335.rawEndpointUrlParsed
      && !sourceNodeV335.externalRequestSent
      && !sourceNodeV335.httpRequestSent
      && !sourceNodeV335.tcpConnectionAttempted
      && !sourceNodeV335.automaticUpstreamStart
      && !sourceNodeV335.javaSqlExecutionAllowed
      && !sourceNodeV335.approvalLedgerWritten
      && !sourceNodeV335.schemaMigrationExecuted
      && !sourceNodeV335.rollbackExecutionAllowed
      && !sourceNodeV335.miniKvWriteCommandAllowed
      && !sourceNodeV335.miniKvLoadAllowed
      && !sourceNodeV335.miniKvCompactAllowed
      && !sourceNodeV335.miniKvRestoreAllowed
      && !sourceNodeV335.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsBodyIntakeReady: jsonReady,
    markdownEvidenceRecordsBodyBoundary:
      archive.markdown.includes("Ready for Node v336 body intake archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("--maxWorkers=2")
      && archive.explanation.includes("Chrome headless")
      && archive.explanation.includes("25/25"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v335 disabled design draft body intake"),
    planIndexReferencesV335AndV336:
      archive.activePlan.includes("Node v335")
      && archive.activePlan.includes("Node v336")
      && archive.plansIndex.includes("Node v335")
      && archive.plansIndex.includes("Node v336"),
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
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
  checks: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV335Ready, "NODE_V335_NOT_READY", "node-v335",
    "Node v335 body intake is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV335RequiresArchiveVerification, "NODE_V335_ARCHIVE_GATE_MISSING",
    "node-v335", "Node v335 did not require archive verification before a body candidate review.");
  addBlocker(messages, checks.sourceNodeV335KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v335 already opened a design draft body or outline.");
  addBlocker(messages, checks.sourceNodeV335KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v335 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v335 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v335 JSON body intake digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsBodyIntakeReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v335 JSON does not record the ready body intake state.");
  addBlocker(messages, checks.markdownEvidenceRecordsBodyBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v335 Markdown does not record the body intake and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v335 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV335AndV336, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v335 and v336.");
  addBlocker(messages, checks.noBodyDraftCreated, "BODY_DRAFT_OPENED_TOO_EARLY", "runtime-boundary",
    "v336 must not create the design draft body; it only verifies the v335 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v336 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_BODY_DRAFT",
      severity: "warning",
      source: "archive-files",
      message: "v336 verifies v335 archive evidence only; it does not create the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V337_BODY_CANDIDATE_REVIEW_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v336 remains verified, use Node v337 for a disabled design draft body candidate review and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV335: SourceNodeV335DisabledRuntimeShellDesignDraftBodyIntakeReference,
  refs: DisabledRuntimeShellDesignDraftBodyIntakeArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV335CheckCount: sourceNodeV335.sourceCheckCount,
    sourceNodeV335PassedCheckCount: sourceNodeV335.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV335.sourceProductionBlockerCount,
    sourceBodySectionCount: sourceNodeV335.bodySectionCount,
    sourceEvidenceItemCount: sourceNodeV335.evidenceItemCount,
    sourceStopConditionCount: sourceNodeV335.stopConditionCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerificationMessage["source"],
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

function archiveJsonBodyIntakeDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "bodyIntake", "intakeDigest");
  if (typeof digest !== "string" || !isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV334", "archiveVerificationDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    sections: valueAt(source, "bodySections"),
    evidenceCatalog: valueAt(source, "evidenceCatalog"),
    stopConditions: valueAt(source, "stopConditions"),
    ready: valueAt(
      source,
      "bodyIntake",
      "readyForNodeV336DisabledRuntimeShellDesignDraftBodyIntakeArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}
