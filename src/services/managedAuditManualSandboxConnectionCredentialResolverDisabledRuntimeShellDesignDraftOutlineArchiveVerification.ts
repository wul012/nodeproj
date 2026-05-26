import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
  DisabledRuntimeShellDesignDraftOutlineArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftOutlineArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftOutlineArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationProfile,
  SourceNodeV333DisabledRuntimeShellDesignDraftOutlineIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-archive-verification";
const SOURCE_NODE_V333_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-outline-intake";
const ACTIVE_PLAN = "docs/plans2/v332-post-disabled-design-draft-candidate-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans2/v334-post-disabled-design-draft-outline-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/333";
const V333_BASENAME = "disabled-design-draft-outline-intake-v333";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb52/338-disabled-design-draft-outline-intake-v333.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerificationProfile {
  const sourceNodeV333 = createSourceNodeV333(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV333, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV333, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV333, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV333, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft outline archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-outline-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "proceed-to-disabled-design-draft-body-intake" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV333DisabledRuntimeShellDesignDraftOutlineIntake: true,
    activeNodeVersion: "Node v334",
    sourceNodeVersion: "Node v333",
    readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake: ready,
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
    sourceNodeV333,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftOutlineArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftOutlineArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV333Json: SOURCE_NODE_V333_ROUTE,
      sourceNodeV333Markdown: `${SOURCE_NODE_V333_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v335",
    },
    nextActions: [
      "Use Node v335 only for a disabled design draft body intake/readiness step after this archive verification is committed and tagged.",
      "Keep the next step non-executable: no provider/client, credential value, raw endpoint URL, HTTP/TCP, Java writes, mini-kv writes/admin, or automatic upstream start.",
      "Do not request Java or mini-kv echo until a later version introduces new non-secret handoff fields that need upstream confirmation.",
      "If any v333 archive reference, smoke evidence, screenshot, code walkthrough, or plan index drifts, stop before any design body intake.",
    ],
  };
}

function createSourceNodeV333(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV333DisabledRuntimeShellDesignDraftOutlineIntakeReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v333",
    profileVersion: source.profileVersion,
    outlineIntakeState: source.outlineIntakeState,
    outlineIntakeDecision: source.outlineIntakeDecision,
    readyForOutlineIntake:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineIntake,
    readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification:
      source.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    readyForDisabledRuntimeShellDesignDraftOutline: source.readyForDisabledRuntimeShellDesignDraftOutline,
    outlineIntakeDigest: source.outlineIntake.intakeDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV332.archiveVerificationDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceWarningCount: source.summary.warningCount,
    sourceRecommendationCount: source.summary.recommendationCount,
    sectionCount: source.summary.sectionCount,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftOutlineArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V333_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V333_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V333_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V333_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V333_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V333_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V333_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V333_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
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
  sourceNodeV333: SourceNodeV333DisabledRuntimeShellDesignDraftOutlineIntakeReference,
  refs: DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveJsonDigest = valueAt(archive.json, "outlineIntake", "intakeDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceOutlineIntakeDigest: sourceNodeV333.outlineIntakeDigest,
      archiveJsonDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v333-outline-intake-archive-verification",
    sourceSpan: "Node v333 disabled runtime shell design draft outline intake archive",
    decision: ready ? "proceed-to-disabled-design-draft-body-intake" : "blocked",
    archiveRoot: "d/333",
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
    readyForNodeV335DisabledRuntimeShellDesignDraftBodyIntake: ready,
    nextNodeVersionSuggested: "Node v335",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV333: SourceNodeV333DisabledRuntimeShellDesignDraftOutlineIntakeReference,
  refs: DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "outlineIntakeState") === "disabled-runtime-shell-design-draft-outline-intake-ready"
    && valueAt(archive.json, "outlineIntakeDecision") === "archive-disabled-outline-intake-before-drafting-outline"
    && valueAt(archive.json, "readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification") === true
    && valueAt(archive.json, "outlineIntake", "readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification")
    === true;
  const jsonDigest = valueAt(archive.json, "outlineIntake", "intakeDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV333.outlineIntakeDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonOutlineIntakeDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false;

  return {
    sourceNodeV333Ready:
      sourceNodeV333.outlineIntakeState === "disabled-runtime-shell-design-draft-outline-intake-ready"
      && sourceNodeV333.outlineIntakeDecision === "archive-disabled-outline-intake-before-drafting-outline"
      && sourceNodeV333.readyForOutlineIntake
      && sourceNodeV333.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification
      && sourceNodeV333.sourceProductionBlockerCount === 0,
    sourceNodeV333RequiresArchiveVerification:
      sourceNodeV333.readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification
      && sourceNodeV333.sectionCount === 8
      && sourceNodeV333.stopConditionCount === 8,
    sourceNodeV333KeepsDesignDraftClosed:
      !sourceNodeV333.readyForDisabledRuntimeShellDesignDraft
      && !sourceNodeV333.readyForDisabledRuntimeShellDesignDraftOutline,
    sourceNodeV333KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV333.runtimeShellImplemented
      && !sourceNodeV333.runtimeShellInvocationAllowed
      && !sourceNodeV333.realResolverImplementationAllowed
      && !sourceNodeV333.executionAllowed
      && !sourceNodeV333.connectsManagedAudit
      && !sourceNodeV333.credentialValueRead
      && !sourceNodeV333.rawEndpointUrlParsed
      && !sourceNodeV333.externalRequestSent
      && !sourceNodeV333.httpRequestSent
      && !sourceNodeV333.tcpConnectionAttempted
      && !sourceNodeV333.automaticUpstreamStart
      && !sourceNodeV333.javaSqlExecutionAllowed
      && !sourceNodeV333.approvalLedgerWritten
      && !sourceNodeV333.schemaMigrationExecuted
      && !sourceNodeV333.rollbackExecutionAllowed
      && !sourceNodeV333.miniKvWriteCommandAllowed
      && !sourceNodeV333.miniKvLoadAllowed
      && !sourceNodeV333.miniKvCompactAllowed
      && !sourceNodeV333.miniKvRestoreAllowed
      && !sourceNodeV333.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsOutlineIntakeReady: jsonReady,
    markdownEvidenceRecordsOutlineBoundary:
      archive.markdown.includes("Ready for Node v334 archive verification: true")
      && archive.markdown.includes("Ready for disabled runtime shell design draft: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("--maxWorkers=2")
      && archive.explanation.includes("Chrome headless")
      && archive.explanation.includes("23/23"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v333 disabled design draft outline intake"),
    planIndexReferencesV333AndV334:
      archive.activePlan.includes("Node v333")
      && archive.activePlan.includes("Node v334")
      && archive.plansIndex.includes("Node v333")
      && archive.plansIndex.includes("Node v334"),
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    archiveVerificationDoesNotRerunEndpoint: !verification.rerunsSourceEndpoint,
    noOutlineBodyCreated: !verification.opensDisabledDesignDraftBodyNow,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftOutlineArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
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
  checks: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV333Ready, "NODE_V333_NOT_READY", "node-v333",
    "Node v333 outline intake is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV333RequiresArchiveVerification, "NODE_V333_ARCHIVE_GATE_MISSING",
    "node-v333", "Node v333 did not require archive verification before a design body intake.");
  addBlocker(messages, checks.sourceNodeV333KeepsDesignDraftClosed, "SOURCE_DESIGN_DRAFT_ALREADY_OPEN",
    "runtime-boundary", "Node v333 already opened a design draft or outline body.");
  addBlocker(messages, checks.sourceNodeV333KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v333 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v333 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v333 JSON outline intake digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsOutlineIntakeReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v333 JSON does not record the ready outline intake state.");
  addBlocker(messages, checks.markdownEvidenceRecordsOutlineBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v333 Markdown does not record the outline intake and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v333 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV333AndV334, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v333 and v334.");
  addBlocker(messages, checks.noOutlineBodyCreated, "OUTLINE_BODY_OPENED_TOO_EARLY", "runtime-boundary",
    "v334 must not create the design draft body; it only verifies the v333 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v334 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_DESIGN_BODY",
      severity: "warning",
      source: "archive-files",
      message: "v334 verifies v333 archive evidence only; it does not create the disabled runtime shell design body.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[] {
  return [
    {
      code: "OPEN_NODE_V335_BODY_INTAKE_ONLY",
      severity: "recommendation",
      source: "next-step",
      message:
        "If v334 remains verified, use Node v335 for a disabled design draft body intake/readiness step and keep every runtime side effect closed.",
    },
  ];
}

function createSummary(
  sourceNodeV333: SourceNodeV333DisabledRuntimeShellDesignDraftOutlineIntakeReference,
  refs: DisabledRuntimeShellDesignDraftOutlineArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftOutlineArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV333CheckCount: sourceNodeV333.sourceCheckCount,
    sourceNodeV333PassedCheckCount: sourceNodeV333.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV333.sourceProductionBlockerCount,
    sourceSectionCount: sourceNodeV333.sectionCount,
    sourceStopConditionCount: sourceNodeV333.stopConditionCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftOutlineArchiveVerificationMessage["source"],
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

function archiveJsonOutlineIntakeDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "outlineIntake", "intakeDigest");
  if (typeof digest !== "string" || !isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV332", "archiveVerificationDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    sections: valueAt(source, "outlineSections"),
    stopConditions: valueAt(source, "stopConditions"),
    ready: valueAt(
      source,
      "outlineIntake",
      "readyForNodeV334DisabledRuntimeShellDesignDraftOutlineArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value);
}
