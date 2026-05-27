import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate.js";
import type {
  ArchiveFileReference,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationChecks,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRecord,
  DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile,
  SourceNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate-archive-verification";
const SOURCE_NODE_V343_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-runtime-shell-design-draft-body-draft-candidate";
const ACTIVE_PLAN = "docs/plans2/v342-post-disabled-design-draft-body-preparation-plan-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/343";
const V343_BASENAME = "disabled-design-draft-body-draft-candidate-v343";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/348-disabled-design-draft-body-draft-candidate-v343.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification(
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
): ManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationProfile {
  const sourceNodeV343 = createSourceNodeV343(input.config, input.archiveRoot, input.evidencePaths);
  const archiveReferences = createArchiveReferences(input.archiveRoot ?? process.cwd());
  const parsedArchive = readParsedArchiveEvidence(archiveReferences);
  const archiveVerification = createArchiveVerification(sourceNodeV343, archiveReferences, parsedArchive, true);
  const checks = createChecks(input.config, sourceNodeV343, archiveReferences, parsedArchive, archiveVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification")
      .every(([, value]) => value);
  const ready = checks
    .readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification;
  const finalArchiveVerification = createArchiveVerification(sourceNodeV343, archiveReferences, parsedArchive, ready);
  checks.archiveVerificationDigestStable = isDigest(finalArchiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = createSummary(sourceNodeV343, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver disabled runtime shell design draft body draft candidate archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "disabled-design-draft-body-draft-candidate-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "body-draft-candidate-archive-verified-before-next-design-step" : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
      ready,
    readOnlyArchiveVerification: true,
    archiveVerificationOnly: true,
    consumesNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidate: true,
    activeNodeVersion: "Node v344",
    sourceNodeVersion: "Node v343",
    readyForNextDisabledDesignDraftStep: ready,
    readyForDisabledRuntimeShellDesignDraft: false,
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
    sourceNodeV343,
    archiveReferences,
    archiveVerification: finalArchiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      disabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationJson: ROUTE_PATH,
      disabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV343Json: SOURCE_NODE_V343_ROUTE,
      sourceNodeV343Markdown: `${SOURCE_NODE_V343_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v345",
    },
    nextActions: [
      "Treat Node v344 as archive verification only; it validates v343 before any next design step.",
      "Do not open runtime shell implementation, invocation, provider/client construction, credential value reads, raw endpoint parsing, HTTP/TCP, Java writes, or mini-kv write/admin behavior.",
      "If the next version introduces a new non-secret handoff field, request Java/mini-kv echo in the plan; otherwise keep the chain Node-only.",
      "After v344 is archived, write a new plan instead of extending the completed v342-derived plan.",
    ],
  };
}

function createSourceNodeV343(
  config: AppConfig,
  archiveRoot?: string,
  evidencePaths?: {
    javaV150EvidencePath?: string;
    miniKvV142ReceiptPath?: string;
    javaV151EvidencePath?: string;
    javaV152EvidencePath?: string;
    miniKvV143ReceiptPath?: string;
  },
): SourceNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidateReference {
  const source =
    loadManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate({
      config,
      archiveRoot,
      evidencePaths,
    });

  return {
    sourceVersion: "Node v343",
    profileVersion: source.profileVersion,
    draftCandidateState: source.draftCandidateState,
    draftCandidateDecision: source.draftCandidateDecision,
    readyForDraftCandidate:
      source.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidate,
    readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
      source.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification,
    readyForDisabledRuntimeShellDesignDraft: source.readyForDisabledRuntimeShellDesignDraft,
    candidateDigest: source.draftCandidate.candidateDigest,
    sourceArchiveVerificationDigest: source.sourceNodeV342.archiveVerificationDigest,
    sourcePlanDigest: source.sourceNodeV342.sourcePlanDigest,
    sourceCheckCount: source.summary.checkCount,
    sourcePassedCheckCount: source.summary.passedCheckCount,
    sourceProductionBlockerCount: source.summary.productionBlockerCount,
    sourceSectionCount: source.summary.sectionCount,
    sourceEvidenceCitationCount: source.summary.evidenceCitationCount,
    sourceSafetyGuardCount: source.summary.safetyGuardCount,
    sourceStopConditionCount: source.summary.stopConditionCount,
    writesDesignBodyText: source.draftCandidate.writesDesignBodyText,
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

function createArchiveReferences(projectRoot: string): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V343_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V343_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V343_BASENAME}-smoke-summary.json`),
    routeSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V343_BASENAME}-snapshot.md`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V343_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V343_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V343_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V343_BASENAME}.md`),
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
  refs: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
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
  sourceNodeV343: SourceNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidateReference,
  refs: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  ready: boolean,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  const archiveCandidateDigest = valueAt(archive.json, "draftCandidate", "candidateDigest");

  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceCandidateDigest: sourceNodeV343.candidateDigest,
      archiveCandidateDigest,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v343-body-draft-candidate-archive-verification",
    sourceSpan: "Node v343 disabled design draft body draft candidate archive",
    decision: ready ? "body-draft-candidate-archive-verified-before-next-design-step" : "blocked",
    archiveRoot: ARCHIVE_ROOT,
    verifiesRouteAndMarkdown: true,
    verifiesSmokeSummary: true,
    verifiesScreenshotAndExplanation: true,
    verifiesCodeWalkthroughAndPlanIndex: true,
    verifiesCandidateDigest: true,
    rerunsSourceEndpoint: false,
    writesDesignDraftNow: false,
    implementsRuntimeShell: false,
    invokesRuntimeShell: false,
    requestsJavaMiniKvEcho: false,
    readyForNextDisabledDesignDraftStep: ready,
    nextNodeVersionSuggested: "Node v345",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV343: SourceNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidateReference,
  refs: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationRecord,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationChecks {
  const jsonReady =
    valueAt(archive.json, "draftCandidateState") === "disabled-runtime-shell-design-draft-body-draft-candidate-ready"
    && valueAt(archive.json, "draftCandidateDecision")
      === "record-disabled-body-draft-candidate-under-non-runtime-boundary"
    && valueAt(
      archive.json,
      "readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification",
    ) === true
    && valueAt(
      archive.json,
      "draftCandidate",
      "readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification",
    ) === true
    && valueAt(archive.json, "draftCandidate", "writesDesignBodyText") === true
    && valueAt(archive.json, "draftCandidate", "implementsRuntimeShell") === false
    && valueAt(archive.json, "draftCandidate", "requestsJavaMiniKvEcho") === false;
  const jsonDigest = valueAt(archive.json, "draftCandidate", "candidateDigest");
  const jsonDigestMatchesLiveSource = jsonDigest === sourceNodeV343.candidateDigest;
  const jsonDigestMatchesArchivedPayload = archiveJsonCandidateDigestMatchesPayload(archive.json);
  const smokeSummaryReady =
    valueAt(archive.smokeSummary, "jsonStatus") === 200
    && valueAt(archive.smokeSummary, "markdownStatus") === 200
    && (
      valueAt(archive.smokeSummary, "fallbackEnabled") === "true"
      || valueAt(archive.smokeSummary, "fallbackEnabled") === null
    )
    && valueAt(
      archive.smokeSummary,
      "readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification",
    ) === true
    && valueAt(archive.smokeSummary, "executionAllowed") === false
    && valueAt(archive.smokeSummary, "checkCount") === 22
    && valueAt(archive.smokeSummary, "passedCheckCount") === 22;

  return {
    sourceNodeV343Ready:
      sourceNodeV343.draftCandidateState === "disabled-runtime-shell-design-draft-body-draft-candidate-ready"
      && sourceNodeV343.draftCandidateDecision === "record-disabled-body-draft-candidate-under-non-runtime-boundary"
      && sourceNodeV343.readyForDraftCandidate
      && sourceNodeV343.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification
      && sourceNodeV343.sourceProductionBlockerCount === 0,
    sourceNodeV343AllowsArchiveVerification:
      sourceNodeV343.readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification
      && sourceNodeV343.writesDesignBodyText
      && sourceNodeV343.sourceSectionCount === 8
      && sourceNodeV343.sourceEvidenceCitationCount === 8
      && sourceNodeV343.sourceSafetyGuardCount === 9
      && sourceNodeV343.sourceStopConditionCount === 8,
    sourceNodeV343KeepsRuntimeAndSideEffectsClosed:
      !sourceNodeV343.runtimeShellImplemented
      && !sourceNodeV343.runtimeShellInvocationAllowed
      && !sourceNodeV343.realResolverImplementationAllowed
      && !sourceNodeV343.executionAllowed
      && !sourceNodeV343.connectsManagedAudit
      && !sourceNodeV343.credentialValueRead
      && !sourceNodeV343.rawEndpointUrlParsed
      && !sourceNodeV343.externalRequestSent
      && !sourceNodeV343.httpRequestSent
      && !sourceNodeV343.tcpConnectionAttempted
      && !sourceNodeV343.automaticUpstreamStart
      && !sourceNodeV343.javaSqlExecutionAllowed
      && !sourceNodeV343.approvalLedgerWritten
      && !sourceNodeV343.schemaMigrationExecuted
      && !sourceNodeV343.rollbackExecutionAllowed
      && !sourceNodeV343.miniKvWriteCommandAllowed
      && !sourceNodeV343.miniKvLoadAllowed
      && !sourceNodeV343.miniKvCompactAllowed
      && !sourceNodeV343.miniKvRestoreAllowed
      && !sourceNodeV343.miniKvSetnxexAllowed,
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceMatchesSourceDigest: jsonDigestMatchesLiveSource || jsonDigestMatchesArchivedPayload,
    jsonEvidenceKeepsCandidateReady: jsonReady,
    markdownEvidenceRecordsDraftCandidateBoundary:
      archive.markdown.includes("Ready for Node v344 archive verification: true")
      && archive.markdown.includes("Ready for runtime shell implementation: false")
      && archive.markdown.includes("requestsJavaMiniKvEcho: false"),
    smokeSummaryRecordsFallbackAndRouteSuccess: smokeSummaryReady,
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsValidationAndScreenshotFallback:
      archive.explanation.includes("npm.cmd test")
      && archive.explanation.includes("Playwright MCP")
      && archive.explanation.includes("22/22"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v343")
      && archive.codeWalkthrough.includes("body draft candidate"),
    planIndexReferencesV343AndV344:
      archive.activePlan.includes("Node v343")
      && archive.activePlan.includes("Node v344")
      && archive.plansIndex.includes("Node v343")
      && archive.plansIndex.includes("Node v344"),
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    archiveVerificationDoesNotRerunEndpoint: !verification.rerunsSourceEndpoint,
    noDesignDraftOpened: !verification.writesDesignDraftNow,
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
    readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification:
      false,
  };
}

function archiveFileReferences(
  refs: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
): ArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.smokeSummary,
    refs.routeSnapshot,
    refs.htmlArchive,
    refs.screenshot,
    refs.explanation,
    refs.codeWalkthrough,
    refs.activePlan,
    refs.plansIndex,
  ];
}

function collectProductionBlockers(
  checks: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationChecks,
): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[] {
  const messages: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.sourceNodeV343Ready, "NODE_V343_NOT_READY", "node-v343",
    "Node v343 body draft candidate is not ready for archive verification.");
  addBlocker(messages, checks.sourceNodeV343AllowsArchiveVerification, "NODE_V343_ARCHIVE_GATE_MISSING",
    "node-v343", "Node v343 did not open the v344 archive verification gate.");
  addBlocker(messages, checks.sourceNodeV343KeepsRuntimeAndSideEffectsClosed, "SOURCE_RUNTIME_BOUNDARY_OPEN",
    "runtime-boundary", "Node v343 opened runtime, credential, network, Java write, mini-kv write/admin, or auto-start behavior.");
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v343 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceMatchesSourceDigest, "ARCHIVE_JSON_DIGEST_DRIFTED", "archive-json",
    "The archived v343 JSON candidate digest does not match the live source digest.");
  addBlocker(messages, checks.jsonEvidenceKeepsCandidateReady, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "The archived v343 JSON does not record the ready body draft candidate state.");
  addBlocker(messages, checks.markdownEvidenceRecordsDraftCandidateBoundary, "ARCHIVE_MARKDOWN_BOUNDARY_MISSING",
    "archive-markdown", "The archived v343 Markdown does not record the draft candidate and runtime boundary.");
  addBlocker(messages, checks.smokeSummaryRecordsFallbackAndRouteSuccess, "ARCHIVE_SMOKE_SUMMARY_NOT_READY",
    "archive-smoke", "The archived smoke summary does not prove JSON/Markdown 200 and forced historical fallback.");
  addBlocker(messages, checks.explanationRecordsValidationAndScreenshotFallback, "ARCHIVE_EXPLANATION_INCOMPLETE",
    "archive-docs", "The v343 explanation must record validation and screenshot fallback evidence.");
  addBlocker(messages, checks.planIndexReferencesV343AndV344, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "The active plan and plans index must reference v343 and v344.");
  addBlocker(messages, checks.noDesignDraftOpened, "DESIGN_DRAFT_OPENED_TOO_EARLY", "runtime-boundary",
    "v344 must not open a runtime design draft; it only verifies the v343 archive.");
  addBlocker(messages, checks.noUpstreamEchoRequested, "UNNEEDED_UPSTREAM_ECHO_REQUESTED", "next-step",
    "v344 must not request Java/mini-kv echo because it defines no new cross-project contract fields.");
  addBlocker(messages, checks.upstreamProbesStillDisabled, "UPSTREAM_PROBES_ENABLED", "configuration",
    "UPSTREAM_PROBES_ENABLED must stay false for this archive verification.");
  addBlocker(messages, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "configuration",
    "UPSTREAM_ACTIONS_ENABLED must stay false for this archive verification.");
  return messages;
}

function collectWarnings(): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME",
      severity: "warning",
      source: "archive-files",
      message: "v344 verifies v343 archive evidence only; it does not create a runtime shell implementation.",
    },
  ];
}

function collectRecommendations(): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[] {
  return [
    {
      code: "WRITE_NEXT_PLAN_AFTER_V344",
      severity: "recommendation",
      source: "next-step",
      message:
        "After v344 is archived, create the next plan before deciding whether the next design step remains Node-only or needs Java/mini-kv echo.",
    },
  ];
}

function createSummary(
  sourceNodeV343: SourceNodeV343DisabledRuntimeShellDesignDraftBodyDraftCandidateReference,
  refs: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveReferences,
  checks: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationChecks,
  productionBlockers: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[],
  warnings: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[],
  recommendations: readonly DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[],
): DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceNodeV343CheckCount: sourceNodeV343.sourceCheckCount,
    sourceNodeV343PassedCheckCount: sourceNodeV343.sourcePassedCheckCount,
    sourceProductionBlockerCount: sourceNodeV343.sourceProductionBlockerCount,
    sourceSectionCount: sourceNodeV343.sourceSectionCount,
    sourceEvidenceCitationCount: sourceNodeV343.sourceEvidenceCitationCount,
    sourceSafetyGuardCount: sourceNodeV343.sourceSafetyGuardCount,
    sourceStopConditionCount: sourceNodeV343.sourceStopConditionCount,
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function addBlocker(
  messages: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerificationMessage["source"],
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

function archiveJsonCandidateDigestMatchesPayload(source: Record<string, unknown> | null): boolean {
  const digest = valueAt(source, "draftCandidate", "candidateDigest");
  if (!isDigest(digest)) {
    return false;
  }
  const payload = {
    profileVersion: valueAt(source, "profileVersion"),
    sourceArchiveVerificationDigest: valueAt(source, "sourceNodeV342", "archiveVerificationDigest"),
    sourcePlanDigest: valueAt(source, "sourceNodeV342", "sourcePlanDigest"),
    necessityProof: valueAt(source, "necessityProof"),
    bodySections: valueAt(source, "bodySections"),
    evidenceCitations: valueAt(source, "evidenceCitations"),
    safetyGuards: valueAt(source, "safetyGuards"),
    stopConditions: valueAt(source, "stopConditions"),
    readyForNodeV344: valueAt(
      source,
      "draftCandidate",
      "readyForNodeV344DisabledRuntimeShellDesignDraftBodyDraftCandidateArchiveVerification",
    ),
  };
  return sha256StableJson(payload) === digest;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
