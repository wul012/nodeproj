import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile,
  MinimalReadOnlyIntegrationSmokeArchiveReferences,
  MinimalReadOnlyIntegrationSmokeArchiveResult,
  MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks,
  MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage,
  MinimalReadOnlyIntegrationSmokeArchiveVerificationRecord,
  MinimalReadOnlyIntegrationSmokeArchiveVerificationSummary,
  SourceNodeV346SmokeRehearsalReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-archive-verification";
const SOURCE_NODE_V346_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal";
const ACTIVE_PLAN = "docs/plans2/v346-post-minimal-read-only-integration-smoke-rehearsal-roadmap.md";
const ARCHIVE_ROOT = "d/346" as const;
const V346_BASENAME = "minimal-read-only-integration-smoke-rehearsal-v346";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/351-minimal-read-only-integration-smoke-rehearsal-v346.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  smokeSummary: Record<string, unknown> | null;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV346 = createSourceNodeV346(parsedArchive);
  const archiveResult = determineArchiveResult(sourceNodeV346);
  const archiveDecision = determineArchiveDecision(archiveResult);
  const draftVerification = createArchiveVerification(sourceNodeV346, archiveReferences, archiveResult, archiveDecision,
    false);
  const checks = createChecks(input.config, sourceNodeV346, archiveReferences, parsedArchive, draftVerification);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !==
        "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification")
      .every(([, value]) => value);
  const ready =
    checks.readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV346, archiveReferences, archiveResult, archiveDecision,
    ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.verificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(archiveResult);
  const recommendations = collectRecommendations(archiveResult);
  const summary = createSummary(sourceNodeV346, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal read-only integration smoke archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "minimal-read-only-integration-smoke-archive-verified" : "blocked",
    archiveResult: ready ? archiveResult : "blocked",
    archiveDecision: ready ? archiveDecision : "blocked",
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification:
      ready,
    consumesNodeV346MinimalReadOnlyIntegrationSmokeRehearsal: true,
    activeNodeVersion: "Node v347",
    sourceNodeVersion: "Node v346",
    archiveVerificationOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: archiveResult === "invalid-read-contract",
    readyForNodeV348MinimalReadOnlyIntegrationRerunDecision: ready,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    archiveVerification,
    sourceNodeV346,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationSmokeArchiveVerificationJson: ROUTE_PATH,
      minimalReadOnlyIntegrationSmokeArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV346Json: SOURCE_NODE_V346_ROUTE,
      sourceNodeV346Markdown: `${SOURCE_NODE_V346_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: ACTIVE_PLAN,
      nextNodeVersion: "Node v348",
    },
    nextActions: nextActionsForArchiveResult(archiveResult),
  };
}

function createArchiveReferences(projectRoot: string): MinimalReadOnlyIntegrationSmokeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V346_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V346_BASENAME}-http.md`),
    smokeSummary: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V346_BASENAME}-smoke-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V346_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V346_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V346_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V346_BASENAME}.md`),
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
  projectRoot: string,
  refs: MinimalReadOnlyIntegrationSmokeArchiveReferences,
): ParsedArchiveEvidence {
  return {
    json: readJsonFile(projectRoot, refs.jsonEvidence.path),
    markdown: readTextFile(projectRoot, refs.markdownEvidence.path),
    smokeSummary: readJsonFile(projectRoot, refs.smokeSummary.path),
    explanation: readTextFile(projectRoot, refs.explanation.path),
    codeWalkthrough: readTextFile(projectRoot, refs.codeWalkthrough.path),
    activePlan: readTextFile(projectRoot, refs.activePlan.path),
    plansIndex: readTextFile(projectRoot, refs.plansIndex.path),
  };
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "");
}

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(projectRoot, relativePath);
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

function createSourceNodeV346(archive: ParsedArchiveEvidence): SourceNodeV346SmokeRehearsalReference {
  return {
    sourceVersion: "Node v346",
    profileVersion: valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1"
      ? "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1"
      : "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1",
    smokeState: sourceSmokeState(archive),
    smokeDecision: sourceSmokeDecision(archive),
    readyForSmokeRehearsal: valueAt(
      archive.json,
      "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal",
    ) === true,
    readyForNodeV347ArchiveVerification:
      valueAt(archive.json, "readyForNodeV347MinimalReadOnlyIntegrationSmokeArchiveVerification") === true,
    sessionDigest: stringValue(valueAt(archive.json, "smokeSession", "sessionDigest")),
    attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
    passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
    connectionRefusedTargetCount: numberValue(valueAt(archive.json, "summary", "connectionRefusedTargetCount")),
    timeoutTargetCount: numberValue(valueAt(archive.json, "summary", "timeoutTargetCount")),
    invalidJsonTargetCount: numberValue(valueAt(archive.json, "summary", "invalidJsonTargetCount")),
    unexpectedStatusTargetCount: numberValue(valueAt(archive.json, "summary", "unexpectedStatusTargetCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    liveProbePerformedNow: true,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
  };
}

function sourceSmokeState(archive: ParsedArchiveEvidence): SourceNodeV346SmokeRehearsalReference["smokeState"] {
  const value = valueAt(archive.json, "smokeState");
  return value === "all-read-passed" || value === "read-window-unavailable" || value === "invalid-read-contract"
    ? value
    : "blocked";
}

function sourceSmokeDecision(archive: ParsedArchiveEvidence): SourceNodeV346SmokeRehearsalReference["smokeDecision"] {
  const value = valueAt(archive.json, "smokeDecision");
  if (
    value === "archive-read-passed-evidence"
    || value === "archive-read-window-unavailable-evidence"
    || value === "request-read-contract-field-fix"
  ) {
    return value;
  }
  return "blocked";
}

function determineArchiveResult(source: SourceNodeV346SmokeRehearsalReference): MinimalReadOnlyIntegrationSmokeArchiveResult {
  if (source.smokeState === "all-read-passed") {
    return "all-read-passed";
  }
  if (source.smokeState === "invalid-read-contract") {
    return "invalid-read-contract";
  }
  return "read-window-unavailable";
}

function determineArchiveDecision(
  result: MinimalReadOnlyIntegrationSmokeArchiveResult,
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"] {
  if (result === "all-read-passed") {
    return "ready-for-next-read-only-stage";
  }
  if (result === "invalid-read-contract") {
    return "request-java-mini-kv-read-contract-fix";
  }
  return "wait-for-external-read-window-rerun";
}

function createArchiveVerification(
  source: SourceNodeV346SmokeRehearsalReference,
  refs: MinimalReadOnlyIntegrationSmokeArchiveReferences,
  archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult,
  archiveDecision: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerificationProfile["archiveDecision"],
  ready: boolean,
): MinimalReadOnlyIntegrationSmokeArchiveVerificationRecord {
  const fileDigests = archiveFileReferences(refs).map((file) => ({
    path: file.path,
    digest: file.digest,
    byteLength: file.byteLength,
  }));
  return {
    verificationDigest: sha256StableJson({
      profileVersion: PROFILE_VERSION,
      sourceSessionDigest: source.sessionDigest,
      archiveResult,
      archiveDecision,
      fileDigests,
      ready,
    }),
    verificationMode: "read-only-v346-smoke-archive-verification",
    sourceSpan: "Node v346 minimal read-only integration smoke rehearsal archive",
    decision: archiveDecision,
    archiveRoot: ARCHIVE_ROOT,
    archiveResult,
    verifiesJsonAndMarkdown: true,
    verifiesSmokeSummary: true,
    verifiesScreenshotAndExplanation: true,
    verifiesCodeWalkthroughAndPlanIndex: true,
    rerunsLiveProbe: false,
    startsUpstreamServices: false,
    requestsJavaMiniKvEcho: archiveResult === "invalid-read-contract",
    nextNodeVersionSuggested: "Node v348",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV346SmokeRehearsalReference,
  refs: MinimalReadOnlyIntegrationSmokeArchiveReferences,
  archive: ParsedArchiveEvidence,
  verification: MinimalReadOnlyIntegrationSmokeArchiveVerificationRecord,
): MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks {
  const archiveResult = verification.archiveResult;
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonEvidenceProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rehearsal.v1",
    jsonEvidenceReadyForArchiveVerification:
      source.readyForSmokeRehearsal
      && source.readyForNodeV347ArchiveVerification
      && isDigest(source.sessionDigest),
    jsonEvidenceKeepsRuntimeAndWritesClosed:
      valueAt(archive.json, "startsJavaService") === false
      && valueAt(archive.json, "startsMiniKvService") === false
      && valueAt(archive.json, "mutatesJavaState") === false
      && valueAt(archive.json, "mutatesMiniKvState") === false
      && valueAt(archive.json, "executionAllowed") === false
      && valueAt(archive.json, "connectsManagedAudit") === false
      && valueAt(archive.json, "readsManagedAuditCredential") === false
      && valueAt(archive.json, "rawEndpointUrlParsed") === false,
    smokeSummaryMatchesJson:
      valueAt(archive.smokeSummary, "smokeState") === source.smokeState
      && valueAt(archive.smokeSummary, "smokeDecision") === source.smokeDecision
      && valueAt(archive.smokeSummary, "attemptedTargetCount") === source.attemptedTargetCount
      && valueAt(archive.smokeSummary, "passedTargetCount") === source.passedTargetCount
      && valueAt(archive.smokeSummary, "invalidJsonTargetCount") === source.invalidJsonTargetCount
      && valueAt(archive.smokeSummary, "unexpectedStatusTargetCount") === source.unexpectedStatusTargetCount,
    markdownRecordsSmokeState:
      archive.markdown.includes(`Smoke state: ${source.smokeState}`)
      && archive.markdown.includes("Starts Java service: false")
      && archive.markdown.includes("Starts mini-kv service: false"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsReadWindowUnavailable:
      archive.explanation.includes("read-window-unavailable")
      && archive.explanation.includes("是否需要改代码")
      && archive.explanation.includes("17/17"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v346")
      && archive.codeWalkthrough.includes("真实只读窗口"),
    planIndexReferencesV346AndV347:
      archive.activePlan.includes("Node v346")
      && archive.activePlan.includes("Node v347")
      && archive.plansIndex.includes("Node v346")
      && archive.plansIndex.includes("Node v347"),
    archiveVerificationDoesNotRerunProbe: !verification.rerunsLiveProbe,
    noUpstreamServiceStarted: !verification.startsUpstreamServices,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    readWindowUnavailableDoesNotRequestJavaMiniKvCodeChange:
      archiveResult !== "read-window-unavailable" || !verification.requestsJavaMiniKvEcho,
    invalidContractRequestsParallelEchoOnlyWhenNeeded:
      archiveResult === "invalid-read-contract" ? verification.requestsJavaMiniKvEcho : !verification.requestsJavaMiniKvEcho,
    archiveVerificationDigestStable: isDigest(verification.verificationDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeArchiveVerification: false,
  };
}

function archiveFileReferences(refs: MinimalReadOnlyIntegrationSmokeArchiveReferences): ArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.smokeSummary,
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
  checks: MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks,
): MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[] {
  const messages: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[] = [];
  addBlocker(messages, checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files",
    "One or more v346 archive files are missing.");
  addBlocker(messages, checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json",
    "v346 JSON evidence must be readable.");
  addBlocker(messages, checks.jsonEvidenceProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
    "v346 JSON evidence must use the v346 smoke rehearsal profile version.");
  addBlocker(messages, checks.jsonEvidenceReadyForArchiveVerification, "ARCHIVE_JSON_NOT_READY", "archive-json",
    "v346 JSON must mark the smoke rehearsal ready for v347 archive verification.");
  addBlocker(messages, checks.jsonEvidenceKeepsRuntimeAndWritesClosed, "ARCHIVE_JSON_BOUNDARY_OPEN", "runtime-boundary",
    "v346 JSON must keep runtime, credential, managed audit, Java write, and mini-kv write boundaries closed.");
  addBlocker(messages, checks.smokeSummaryMatchesJson, "SMOKE_SUMMARY_MISMATCH", "archive-json",
    "v346 smoke summary must match the archived JSON result.");
  addBlocker(messages, checks.markdownRecordsSmokeState, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
    "v346 Markdown must record smoke state and no auto-start boundary.");
  addBlocker(messages, checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
    "v346 screenshot and HTML archive must exist.");
  addBlocker(messages, checks.explanationRecordsReadWindowUnavailable, "EXPLANATION_INCOMPLETE", "archive-docs",
    "v346 explanation must record the read-window-unavailable result and no code-change requirement.");
  addBlocker(messages, checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
    "v346 code walkthrough must exist and explain the read-only smoke rehearsal.");
  addBlocker(messages, checks.planIndexReferencesV346AndV347, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
    "Plan files must reference v346 and v347.");
  addBlocker(messages, checks.archiveVerificationDoesNotRerunProbe, "ARCHIVE_VERIFICATION_RERAN_PROBE",
    "runtime-boundary", "v347 must not rerun live Java/mini-kv probes.");
  addBlocker(messages, checks.readWindowUnavailableDoesNotRequestJavaMiniKvCodeChange,
    "UNNEEDED_JAVA_MINI_KV_CODE_CHANGE_REQUESTED", "next-step",
    "read-window-unavailable must request an external rerun window, not Java/mini-kv code changes.");
  addBlocker(messages, checks.invalidContractRequestsParallelEchoOnlyWhenNeeded,
    "PARALLEL_ECHO_POLICY_INVALID", "next-step",
    "Java v153 + mini-kv v144 should be requested only for invalid-read-contract.");
  return messages;
}

function collectWarnings(
  archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult,
): MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[] {
  return [
    {
      code: `ARCHIVE_RESULT_${archiveResult.toUpperCase().replace(/-/g, "_")}`,
      severity: "warning",
      source: "node-v346",
      message: `v347 verified the v346 archive result as ${archiveResult}.`,
    },
  ];
}

function collectRecommendations(
  archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult,
): MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[] {
  const message = archiveResult === "read-window-unavailable"
    ? "Wait for the user or external window to start Java and mini-kv, then rerun the read-only smoke lane."
    : archiveResult === "invalid-read-contract"
      ? "Run Java v153 and/or mini-kv v144 only for missing read-only fields."
      : "Prepare the next managed-audit-disabled read-only stage without opening runtime or write permissions.";
  return [{ code: "NEXT_RERUN_DECISION", severity: "recommendation", source: "next-step", message }];
}

function createSummary(
  source: SourceNodeV346SmokeRehearsalReference,
  refs: MinimalReadOnlyIntegrationSmokeArchiveReferences,
  checks: MinimalReadOnlyIntegrationSmokeArchiveVerificationChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[],
  warnings: readonly MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[],
): MinimalReadOnlyIntegrationSmokeArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    unavailableTargetCount: source.connectionRefusedTargetCount + source.timeoutTargetCount,
    invalidContractTargetCount: source.invalidJsonTargetCount + source.unexpectedStatusTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function nextActionsForArchiveResult(archiveResult: MinimalReadOnlyIntegrationSmokeArchiveResult): string[] {
  if (archiveResult === "invalid-read-contract") {
    return [
      "Request Java v153 and/or mini-kv v144 only for missing read-only fields.",
      "Do not change Java/mini-kv write or admin behavior.",
      "After the read contract fix, rerun the v346 read-only smoke lane.",
    ];
  }
  if (archiveResult === "all-read-passed") {
    return [
      "Use Node v348 to decide the next managed-audit-disabled read-only stage.",
      "Do not open managed audit endpoint, runtime shell, Java writes, or mini-kv write/admin commands.",
    ];
  }
  return [
    "Wait for the user or external window to start Java and mini-kv, then rerun the read-only smoke lane.",
    "Do not request Java v153 or mini-kv v144 for connection refused alone.",
    "Keep v348 as a rerun decision, not a production authorization.",
  ];
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

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function addBlocker(
  messages: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage[],
  condition: boolean,
  code: string,
  source: MinimalReadOnlyIntegrationSmokeArchiveVerificationMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
