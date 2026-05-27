import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import type {
  ArchiveFileReference,
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile,
  MinimalReadOnlyIntegrationPassedArchiveReferences,
  MinimalReadOnlyIntegrationPassedArchiveTransitionRecord,
  MinimalReadOnlyIntegrationPassedArchiveVerificationChecks,
  MinimalReadOnlyIntegrationPassedArchiveVerificationMessage,
  MinimalReadOnlyIntegrationPassedArchiveVerificationSummary,
  SourceNodeV349SmokeRerunArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-passed-archive-verification";
const SOURCE_NODE_V349_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive";
const ACTIVE_PLAN = "docs/plans2/v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md";
const NEXT_PLAN = "docs/plans2/v350-post-minimal-read-only-integration-passed-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "d/349" as const;
const V349_BASENAME = "minimal-read-only-integration-smoke-rerun-archive-v349";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段2/354-minimal-read-only-integration-smoke-rerun-archive-v349.md";

interface ParsedArchiveEvidence {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  activePlan: string;
  plansIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationPassedArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV349 = createSourceNodeV349(parsedArchive);
  const draftTransitionRecord = createTransitionRecord(sourceNodeV349, archiveReferences, false);
  const checks = createChecks(input.config, sourceNodeV349, archiveReferences, parsedArchive, draftTransitionRecord);
  checks.readyForMinimalReadOnlyIntegrationPassedArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalReadOnlyIntegrationPassedArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalReadOnlyIntegrationPassedArchiveVerification;
  const transitionRecord = createTransitionRecord(sourceNodeV349, archiveReferences, ready);
  checks.transitionDigestStable = isDigest(transitionRecord.transitionDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV349);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV349, archiveReferences, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver minimal read-only integration passed archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    transitionState: ready ? "minimal-read-only-integration-passed-archive-verified" : "blocked",
    transitionDecision: ready ? "advance-to-managed-audit-disabled-read-only-integration-intake" : "blocked",
    readyForMinimalReadOnlyIntegrationPassedArchiveVerification: ready,
    readyForNodeV351ManagedAuditDisabledReadOnlyIntegrationIntake: ready,
    consumesNodeV349MinimalReadOnlyIntegrationSmokeRerunArchive: true,
    activeNodeVersion: "Node v350",
    sourceNodeVersion: "Node v349",
    archiveVerificationOnly: true,
    transitionDecisionOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    requiresParallelJavaV153MiniKvV144ReadOnlyEcho: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV349,
    transitionRecord,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      minimalReadOnlyIntegrationPassedArchiveVerificationJson: ROUTE_PATH,
      minimalReadOnlyIntegrationPassedArchiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV349Json: SOURCE_NODE_V349_ROUTE,
      sourceNodeV349Markdown: `${SOURCE_NODE_V349_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v351",
    },
    nextActions: ready
      ? [
        "Proceed to Node v351 managed-audit-disabled read-only integration intake.",
        "Keep credential value, raw endpoint URL parsing, provider/client instantiation, runtime shell, Java writes, and mini-kv write/admin commands closed.",
        "For the next true integration window, have Java and mini-kv start in their own project windows and only report read-only readiness.",
      ]
      : [
        "Fix the v349 archive evidence before proceeding to Node v351.",
        "Do not rerun probes or request Java/mini-kv code changes from a broken archive verification alone.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): MinimalReadOnlyIntegrationPassedArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V349_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V349_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V349_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V349_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V349_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V349_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V349_BASENAME}.md`),
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
  refs: MinimalReadOnlyIntegrationPassedArchiveReferences,
): ParsedArchiveEvidence {
  return {
    json: readJsonFile(projectRoot, refs.jsonEvidence.path),
    markdown: readTextFile(projectRoot, refs.markdownEvidence.path),
    summary: readJsonFile(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readTextFile(projectRoot, refs.browserSnapshot.path),
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

function createSourceNodeV349(archive: ParsedArchiveEvidence): SourceNodeV349SmokeRerunArchiveReference {
  return {
    sourceVersion: "Node v349",
    profileVersion:
      "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1",
    rerunArchiveState: sourceArchiveState(archive),
    rerunArchiveResult: sourceArchiveResult(archive),
    rerunArchiveDecision: sourceArchiveDecision(archive),
    readyForRerunArchive: valueAt(
      archive.json,
      "readyForManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive",
    ) === true,
    archiveDigest: stringValue(valueAt(archive.json, "rerunArchive", "archiveDigest")),
    externalReadWindowConfirmed: valueAt(archive.json, "externalReadWindowConfirmed") === true,
    liveProbePerformedNow: valueAt(archive.json, "liveProbePerformedNow") === true,
    attemptedTargetCount: numberValue(valueAt(archive.json, "summary", "attemptedTargetCount")),
    passedTargetCount: numberValue(valueAt(archive.json, "summary", "passedTargetCount")),
    unavailableTargetCount: numberValue(valueAt(archive.json, "summary", "unavailableTargetCount")),
    invalidContractTargetCount: numberValue(valueAt(archive.json, "summary", "invalidContractTargetCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
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

function sourceArchiveState(
  archive: ParsedArchiveEvidence,
): SourceNodeV349SmokeRerunArchiveReference["rerunArchiveState"] {
  const value = valueAt(archive.json, "rerunArchiveState");
  if (
    value === "minimal-read-only-integration-smoke-rerun-archived"
    || value === "minimal-read-only-integration-smoke-rerun-pending"
    || value === "blocked"
  ) {
    return value;
  }
  return "blocked";
}

function sourceArchiveResult(
  archive: ParsedArchiveEvidence,
): SourceNodeV349SmokeRerunArchiveReference["rerunArchiveResult"] {
  const value = valueAt(archive.json, "rerunArchiveResult");
  if (
    value === "all-read-passed"
    || value === "read-window-unavailable"
    || value === "invalid-read-contract"
    || value === "pending"
    || value === "blocked"
  ) {
    return value;
  }
  return "blocked";
}

function sourceArchiveDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV349SmokeRerunArchiveReference["rerunArchiveDecision"] {
  const value = valueAt(archive.json, "rerunArchiveDecision");
  if (
    value === "archive-read-passed-rerun-evidence"
    || value === "archive-read-window-unavailable-rerun-evidence"
    || value === "request-java-mini-kv-read-contract-fix"
    || value === "pending-external-read-window"
    || value === "blocked"
  ) {
    return value;
  }
  return "blocked";
}

function createTransitionRecord(
  source: SourceNodeV349SmokeRerunArchiveReference,
  refs: MinimalReadOnlyIntegrationPassedArchiveReferences,
  ready: boolean,
): MinimalReadOnlyIntegrationPassedArchiveTransitionRecord {
  const recordWithoutDigest = {
    transitionMode: "minimal-read-only-integration-passed-archive-verification" as const,
    sourceSpan: "Node v349 minimal read-only integration smoke rerun archive" as const,
    archiveRoot: ARCHIVE_ROOT,
    sourceArchiveDigest: source.archiveDigest,
    transitionDecision: ready
      ? "advance-to-managed-audit-disabled-read-only-integration-intake" as const
      : "blocked" as const,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    rerunsLiveProbe: false as const,
    startsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    requestsJavaMiniKvEcho: false as const,
    nextNodeVersionSuggested: "Node v351" as const,
    archiveFileDigests: archiveFileReferences(refs).map((file) => ({
      path: file.path,
      digest: file.digest,
      byteLength: file.byteLength,
    })),
  };

  return {
    transitionDigest: sha256StableJson(recordWithoutDigest),
    ...recordWithoutDigest,
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV349SmokeRerunArchiveReference,
  refs: MinimalReadOnlyIntegrationPassedArchiveReferences,
  archive: ParsedArchiveEvidence,
  transition: MinimalReadOnlyIntegrationPassedArchiveTransitionRecord,
): MinimalReadOnlyIntegrationPassedArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFileReferences(refs).every((file) => file.exists && file.byteLength > 0),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      valueAt(archive.json, "profileVersion")
      === "managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-smoke-rerun-archive.v1",
    jsonReadyForV350Verification:
      source.readyForRerunArchive
      && source.rerunArchiveState === "minimal-read-only-integration-smoke-rerun-archived"
      && isDigest(source.archiveDigest),
    jsonArchiveAllReadPassed:
      source.rerunArchiveResult === "all-read-passed"
      && source.rerunArchiveDecision === "archive-read-passed-rerun-evidence",
    targetCountsConfirmAllPassed:
      source.attemptedTargetCount === 5
      && source.passedTargetCount === 5
      && source.unavailableTargetCount === 0
      && source.invalidContractTargetCount === 0
      && source.productionBlockerCount === 0,
    targetResultsAllReadOnlyAndAllowed: targetResultsAllReadOnlyAndAllowed(archive.json),
    summaryMatchesJson:
      valueAt(archive.summary, "rerunArchiveResult") === source.rerunArchiveResult
      && valueAt(archive.summary, "rerunArchiveDecision") === source.rerunArchiveDecision
      && valueAt(archive.summary, "attemptedTargetCount") === source.attemptedTargetCount
      && valueAt(archive.summary, "passedTargetCount") === source.passedTargetCount
      && valueAt(archive.summary, "unavailableTargetCount") === source.unavailableTargetCount
      && valueAt(archive.summary, "invalidContractTargetCount") === source.invalidContractTargetCount,
    markdownRecordsPassedArchive:
      archive.markdown.includes("Rerun archive result: all-read-passed")
      && archive.markdown.includes("Live probe performed now: true")
      && archive.markdown.includes("Starts Java service: false")
      && archive.markdown.includes("Starts mini-kv service: false"),
    screenshotAndHtmlPresent:
      refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists && refs.htmlArchive.byteLength > 0,
    explanationRecordsPassedWindow:
      archive.explanation.includes("all-read-passed")
      && archive.explanation.includes("passedTargetCount: 5")
      && archive.explanation.includes("不执行 mini-kv write/admin"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v349")
      && archive.codeWalkthrough.includes("createReadinessSourceConfig"),
    planIndexReferencesV349AndV350:
      archive.activePlan.includes("Node v350")
      && archive.activePlan.includes("Node v351")
      && archive.plansIndex.includes("Node v349")
      && archive.plansIndex.includes("v349-post-minimal-read-only-integration-smoke-rerun-archive-roadmap.md"),
    transitionDoesNotRerunProbe: !transition.rerunsLiveProbe,
    noUpstreamServiceStartedByNode:
      !transition.startsUpstreamServices
      && valueAt(archive.json, "startsJavaService") === false
      && valueAt(archive.json, "startsMiniKvService") === false,
    noUpstreamMutation:
      !transition.writesUpstreamState
      && valueAt(archive.json, "mutatesJavaState") === false
      && valueAt(archive.json, "mutatesMiniKvState") === false,
    noManagedAuditConnection:
      !transition.opensManagedAuditConnection
      && !config.upstreamActionsEnabled
      && valueAt(archive.json, "connectsManagedAudit") === false,
    noCredentialValueRead: valueAt(archive.json, "readsManagedAuditCredential") === false,
    noRawEndpointUrlParsed: valueAt(archive.json, "rawEndpointUrlParsed") === false,
    noJavaMiniKvEchoRequired:
      !transition.requestsJavaMiniKvEcho
      && valueAt(archive.json, "requiresParallelJavaV153MiniKvV144ReadOnlyEcho") === false,
    transitionDecisionLimitedToDisabledReadOnlyStage:
      transition.transitionDecision === "blocked"
      || transition.transitionDecision === "advance-to-managed-audit-disabled-read-only-integration-intake",
    transitionDigestStable: isDigest(transition.transitionDigest),
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalReadOnlyIntegrationPassedArchiveVerification: false,
  };
}

function targetResultsAllReadOnlyAndAllowed(json: Record<string, unknown> | null): boolean {
  const targets = valueAt(json, "targetResults");
  if (!Array.isArray(targets) || targets.length !== 5) {
    return false;
  }
  const allowedJava = new Set(["GET /actuator/health", "GET /api/v1/ops/overview"]);
  const allowedMiniKv = new Set(["HEALTH", "INFOJSON", "STATSJSON"]);
  return targets.every((target) => {
    if (target === null || typeof target !== "object" || Array.isArray(target)) {
      return false;
    }
    const record = target as Record<string, unknown>;
    const project = record.project;
    const command = record.methodOrCommand;
    const allowed = project === "java"
      ? allowedJava.has(String(command))
      : project === "mini-kv" && allowedMiniKv.has(String(command));
    return allowed
      && record.readOnly === true
      && record.mutatesState === false
      && record.attempted === true
      && record.status === "read-passed";
  });
}

function archiveFileReferences(refs: MinimalReadOnlyIntegrationPassedArchiveReferences): ArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.summaryEvidence,
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
  checks: MinimalReadOnlyIntegrationPassedArchiveVerificationChecks,
): MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, MinimalReadOnlyIntegrationPassedArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "One or more v349 archive files are missing."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v349 JSON evidence must be readable."],
    [checks.jsonProfileVersionValid, "ARCHIVE_JSON_PROFILE_VERSION_INVALID", "archive-json",
      "v349 JSON evidence must use the smoke rerun archive profile version."],
    [checks.jsonReadyForV350Verification, "ARCHIVE_JSON_NOT_READY", "archive-json",
      "v349 JSON must be ready and include a stable archive digest."],
    [checks.jsonArchiveAllReadPassed, "ARCHIVE_NOT_ALL_READ_PASSED", "node-v349",
      "v350 can advance only from all-read-passed v349 evidence."],
    [checks.targetCountsConfirmAllPassed, "TARGET_COUNTS_NOT_ALL_PASSED", "archive-json",
      "v349 must show five attempted targets, five passed targets, and zero unavailable/invalid targets."],
    [checks.targetResultsAllReadOnlyAndAllowed, "TARGET_RESULTS_NOT_ALLOWED_READS", "archive-json",
      "v349 target results must be Java GETs and mini-kv read commands only."],
    [checks.summaryMatchesJson, "SUMMARY_MISMATCH", "archive-json",
      "v349 summary must match the archived JSON profile."],
    [checks.markdownRecordsPassedArchive, "ARCHIVE_MARKDOWN_INCOMPLETE", "archive-markdown",
      "v349 Markdown must record all-read-passed and closed auto-start boundaries."],
    [checks.screenshotAndHtmlPresent, "SCREENSHOT_OR_HTML_MISSING", "archive-docs",
      "v349 screenshot and HTML archive must exist."],
    [checks.explanationRecordsPassedWindow, "EXPLANATION_INCOMPLETE", "archive-docs",
      "v349 explanation must record the passed read-only window and forbidden write/admin scope."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs",
      "v349 code walkthrough must exist and explain the readiness-source config split."],
    [checks.planIndexReferencesV349AndV350, "PLAN_INDEX_NOT_ALIGNED", "archive-docs",
      "Plan files must reference v349 completion and v350/v351 continuation."],
    [checks.noUpstreamServiceStartedByNode, "UPSTREAM_SERVICE_STARTED_BY_NODE", "runtime-boundary",
      "v350 must not start Java or mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_DETECTED", "runtime-boundary",
      "v350 and source v349 archive must not mutate Java or mini-kv state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary",
      "Managed audit connection must remain closed."],
    [checks.noJavaMiniKvEchoRequired, "UNNEEDED_JAVA_MINI_KV_ECHO_REQUESTED", "transition-decision",
      "all-read-passed v349 evidence must not request Java v153 + mini-kv v144."],
    [checks.transitionDigestStable, "TRANSITION_DIGEST_UNSTABLE", "transition-decision",
      "v350 transition digest must be stable."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV349SmokeRerunArchiveReference,
): MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[] {
  return [{
    code: "V349_PASSED_ARCHIVE_VERIFIED",
    severity: "warning",
    source: "node-v349",
    message: `v350 verified v349 as ${source.rerunArchiveResult} with ${source.passedTargetCount}/${source.attemptedTargetCount} read targets passed.`,
  }];
}

function collectRecommendations(ready: boolean): MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_NODE_V351_DISABLED_READ_ONLY_INTAKE" : "FIX_V349_ARCHIVE_BEFORE_V351",
    severity: "recommendation",
    source: "transition-decision",
    message: ready
      ? "Proceed to Node v351 as managed-audit-disabled read-only integration intake; do not open credential, endpoint, provider/client, runtime, or write scopes."
      : "Keep the stage blocked until the v349 archive is complete and internally consistent.",
  }];
}

function createSummary(
  source: SourceNodeV349SmokeRerunArchiveReference,
  refs: MinimalReadOnlyIntegrationPassedArchiveReferences,
  checks: MinimalReadOnlyIntegrationPassedArchiveVerificationChecks,
  productionBlockers: readonly MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[],
  warnings: readonly MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[],
  recommendations: readonly MinimalReadOnlyIntegrationPassedArchiveVerificationMessage[],
): MinimalReadOnlyIntegrationPassedArchiveVerificationSummary {
  const files = archiveFileReferences(refs);
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: files.length,
    presentArchiveFileCount: files.filter((file) => file.exists && file.byteLength > 0).length,
    attemptedTargetCount: source.attemptedTargetCount,
    passedTargetCount: source.passedTargetCount,
    unavailableTargetCount: source.unavailableTargetCount,
    invalidContractTargetCount: source.invalidContractTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
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

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
