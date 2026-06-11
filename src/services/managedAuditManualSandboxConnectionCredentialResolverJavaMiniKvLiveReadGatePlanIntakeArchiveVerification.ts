import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.js";
import type {
  LiveReadGatePlanIntakeArchiveFileReference,
  LiveReadGatePlanIntakeArchiveReferences,
  LiveReadGatePlanIntakeArchiveVerificationChecks,
  LiveReadGatePlanIntakeArchiveVerificationMessage,
  LiveReadGatePlanIntakeArchiveVerificationRecord,
  LiveReadGatePlanIntakeArchiveVerificationSummary,
  LiveReadGatePlanIntakeReplayReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationProfile,
  SourceNodeV384LiveReadGatePlanIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification";
const SOURCE_NODE_V384_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake";
const ACTIVE_PLAN = "docs/plans3/v384-post-java-mini-kv-live-read-gate-plan-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v385-post-java-mini-kv-live-read-gate-plan-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/384" as const;
const V384_BASENAME = "java-mini-kv-live-read-gate-plan-intake-v384";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/389-java-mini-kv-live-read-gate-plan-intake-v384.md";

interface ParsedArchive {
  json: Record<string, unknown> | null;
  markdown: string;
  summary: Record<string, unknown> | null;
  browserSnapshot: string;
  explanation: string;
  codeWalkthrough: string;
  sourcePlan: string;
  plansIndex: string;
  archiveIndex: string;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV384 = createSourceNodeV384(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV384, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV384, archiveReferences, parsed, replay, draftVerification);
  checks.readyForLiveReadGatePlanIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForLiveReadGatePlanIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForLiveReadGatePlanIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV384, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV384, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "java-mini-kv-live-read-gate-plan-intake-archive-verified" : "blocked",
    archiveVerificationDecision: ready ? "archive-live-read-gate-plan-intake-and-prepare-v386" : "blocked",
    readyForLiveReadGatePlanIntakeArchiveVerification: ready,
    readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate: ready,
    activeNodeVersion: "Node v385",
    sourceNodeVersion: "Node v384",
    archiveVerificationOnly: true,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV384,
    replay,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV384Json: SOURCE_NODE_V384_ROUTE,
      sourceNodeV384Markdown: `${SOURCE_NODE_V384_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v386",
    },
    nextActions: ready
      ? [
        "Pause Node unless operator-owned service lifecycle evidence appears for a later runtime gate.",
        "Keep Java and mini-kv parallel work independent; Node v385 only verifies the v384 archive.",
        "Do not run runtime probes or start sibling services from this archive verification.",
      ]
      : [
        "Repair the v384 archive before moving beyond v385.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): LiveReadGatePlanIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V384_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V384_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V384_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V384_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V384_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V384_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V384_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): LiveReadGatePlanIntakeArchiveFileReference {
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

function readParsedArchive(projectRoot: string, refs: LiveReadGatePlanIntakeArchiveReferences): ParsedArchive {
  return {
    json: readJsonFile(projectRoot, refs.jsonEvidence.path),
    markdown: readTextFile(projectRoot, refs.markdownEvidence.path),
    summary: readJsonFile(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readTextFile(projectRoot, refs.browserSnapshot.path),
    explanation: readTextFile(projectRoot, refs.explanation.path),
    codeWalkthrough: readTextFile(projectRoot, refs.codeWalkthrough.path),
    sourcePlan: readTextFile(projectRoot, refs.sourcePlan.path),
    plansIndex: readTextFile(projectRoot, refs.plansIndex.path),
    archiveIndex: readTextFile(projectRoot, refs.archiveIndex.path),
  };
}

function createSourceNodeV384(archive: ParsedArchive): SourceNodeV384LiveReadGatePlanIntakeReference {
  return {
    sourceVersion: "Node v384",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForJavaMiniKvLiveReadGatePlanIntake:
      valueAt(archive.json, "readyForJavaMiniKvLiveReadGatePlanIntake") === true,
    readyForNodeV385ArchiveVerification: valueAt(archive.json, "readyForNodeV385ArchiveVerification") === true,
    activeNodeVersion: "Node v384",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    javaLiveReadGatePlanVersion: stringValue(valueAt(archive.json, "javaLiveReadGatePlan", "version")),
    miniKvLiveReadGatePlanReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvLiveReadGatePlan", "releaseVersion")),
    miniKvFrozenConsumerHandoffReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvFrozenConsumerHandoff", "releaseVersion")),
    liveReadGateAllowed: valueAt(archive.json, "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(archive.json, "runtimeProbeAllowed") === true,
    activeShardPrototypeEnabled: valueAt(archive.json, "activeShardPrototypeEnabled") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaLiveReadGatePlanUsesHistoricalFallback:
      valueAt(archive.json, "javaLiveReadGatePlanFile", "usedHistoricalFallback") === true,
    miniKvLiveReadGatePlanUsesHistoricalFallback:
      valueAt(archive.json, "miniKvLiveReadGatePlanFile", "usedHistoricalFallback") === true,
    miniKvFrozenConsumerHandoffUsesHistoricalFallback:
      valueAt(archive.json, "miniKvFrozenConsumerHandoffFile", "usedHistoricalFallback") === true,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    executionAllowed: false,
  };
}

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): LiveReadGatePlanIntakeReplayReference {
  const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForJavaMiniKvLiveReadGatePlanIntake
    && profile.javaLiveReadGatePlanFile.usedHistoricalFallback
    && profile.miniKvLiveReadGatePlanFile.usedHistoricalFallback
    && profile.miniKvFrozenConsumerHandoffFile.usedHistoricalFallback
    && profile.javaLiveReadGatePlan.version === "Java v159"
    && profile.miniKvLiveReadGatePlan.releaseVersion === "v150"
    && profile.miniKvFrozenConsumerHandoff.releaseVersion === "v149"
    && !profile.liveReadGateAllowed
    && !profile.runtimeProbeAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForJavaMiniKvLiveReadGatePlanIntake: profile.readyForJavaMiniKvLiveReadGatePlanIntake,
    javaLiveReadGatePlanUsedHistoricalFallback: profile.javaLiveReadGatePlanFile.usedHistoricalFallback,
    miniKvLiveReadGatePlanUsedHistoricalFallback: profile.miniKvLiveReadGatePlanFile.usedHistoricalFallback,
    miniKvFrozenConsumerHandoffUsedHistoricalFallback:
      profile.miniKvFrozenConsumerHandoffFile.usedHistoricalFallback,
    javaLiveReadGatePlanVersion: profile.javaLiveReadGatePlan.version,
    miniKvLiveReadGatePlanReleaseVersion: profile.miniKvLiveReadGatePlan.releaseVersion,
    miniKvFrozenConsumerHandoffReleaseVersion: profile.miniKvFrozenConsumerHandoff.releaseVersion,
    liveReadGateAllowed: profile.liveReadGateAllowed,
    runtimeProbeAllowed: profile.runtimeProbeAllowed,
    activeShardPrototypeEnabled: profile.activeShardPrototypeEnabled,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
  };
}

function createArchiveVerification(
  source: SourceNodeV384LiveReadGatePlanIntakeReference,
  refs: LiveReadGatePlanIntakeArchiveReferences,
  replay: LiveReadGatePlanIntakeReplayReference,
  ready: boolean,
): LiveReadGatePlanIntakeArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-live-read-gate-plan-intake-archive-verification" as const,
    sourceSpan: "Node v384 live-read gate plan intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-live-read-gate-plan-intake-and-prepare-v386" as const
      : "blocked" as const,
    sourceIntakeDigest: source.intakeDigest,
    replayReady: replay.replayState === "ready",
    archiveFileDigests,
  };
  return {
    archiveVerificationDigest: sha256StableJson(record),
    ...record,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesReplayFromFrozenEvidence: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v386",
  };
}

function createChecks(
  source: SourceNodeV384LiveReadGatePlanIntakeReference,
  refs: LiveReadGatePlanIntakeArchiveReferences,
  archive: ParsedArchive,
  replay: LiveReadGatePlanIntakeReplayReference,
  verification: LiveReadGatePlanIntakeArchiveVerificationRecord,
): LiveReadGatePlanIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1",
    jsonIntakeReady: source.readyForJavaMiniKvLiveReadGatePlanIntake && source.readyForNodeV385ArchiveVerification,
    jsonSourceNodeV383Ready: stringValue(valueAt(archive.json, "sourceNodeV383", "archiveVerificationState"))
      === "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified",
    jsonEvidenceVersionsMatch:
      source.javaLiveReadGatePlanVersion === "Java v159"
      && source.miniKvLiveReadGatePlanReleaseVersion === "v150"
      && source.miniKvFrozenConsumerHandoffReleaseVersion === "v149",
    jsonLiveReadGateClosed: !source.liveReadGateAllowed && !source.runtimeProbeAllowed,
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonIntakeDigestStable: isDigest(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots:
      source.javaLiveReadGatePlanUsesHistoricalFallback
      && source.miniKvLiveReadGatePlanUsesHistoricalFallback
      && source.miniKvFrozenConsumerHandoffUsesHistoricalFallback,
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "liveReadGateAllowed") === false
      && valueAt(archive.summary, "runtimeProbeAllowed") === false,
    markdownRecordsLiveReadGatePlan:
      archive.markdown.includes("Intake decision: consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence")
      && archive.markdown.includes("mini-kv v150 Live Read Gate Plan"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("java-mini-kv-live-read-gate-plan-intake-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsMiniKvV150AndChecks:
      archive.explanation.includes("mini-kv v150") && archive.explanation.includes("46/46"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists && archive.codeWalkthrough.includes("v384")
      && archive.codeWalkthrough.includes("shard-readiness-v150.json"),
    sourcePlanPointsToV385ArchiveVerification:
      archive.sourcePlan.includes("Node v385 archives and verifies the v384 intake")
      || archive.sourcePlan.includes("Node v385 should archive and verify this v384 intake"),
    planIndexReferencesV384AndV385:
      archive.plansIndex.includes("v384-post-java-mini-kv-live-read-gate-plan-intake-roadmap.md")
      && archive.plansIndex.includes("Node v384"),
    archiveIndexReferencesV384:
      archive.archiveIndex.includes("384: Java v159 + mini-kv v150 live-read gate plan intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "liveReadGatePlanIntakeJson")) === SOURCE_NODE_V384_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV159MiniKvV150AndV149:
      replay.javaLiveReadGatePlanUsedHistoricalFallback
      && replay.miniKvLiveReadGatePlanUsedHistoricalFallback
      && replay.miniKvFrozenConsumerHandoffUsedHistoricalFallback
      && replay.javaLiveReadGatePlanVersion === "Java v159"
      && replay.miniKvLiveReadGatePlanReleaseVersion === "v150"
      && replay.miniKvFrozenConsumerHandoffReleaseVersion === "v149",
    replayKeepsLiveReadGateClosed: !replay.liveReadGateAllowed && !replay.runtimeProbeAllowed,
    replayKeepsActiveShardPrototypeDisabled: !replay.activeShardPrototypeEnabled,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForLiveReadGatePlanIntakeArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV384LiveReadGatePlanIntakeReference,
  refs: LiveReadGatePlanIntakeArchiveReferences,
  replay: LiveReadGatePlanIntakeReplayReference,
  checks: LiveReadGatePlanIntakeArchiveVerificationChecks,
  productionBlockers: readonly LiveReadGatePlanIntakeArchiveVerificationMessage[],
  warnings: readonly LiveReadGatePlanIntakeArchiveVerificationMessage[],
  recommendations: readonly LiveReadGatePlanIntakeArchiveVerificationMessage[],
): LiveReadGatePlanIntakeArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: LiveReadGatePlanIntakeArchiveVerificationChecks,
): LiveReadGatePlanIntakeArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v384 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v384 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V384_NOT_READY", "source-node-v384", "Node v384 intake must be ready."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V384_NOT_FROZEN", "source-node-v384", "v384 must use frozen historical snapshots."],
    [checks.jsonLiveReadGateClosed, "LIVE_READ_GATE_OPENED", "source-node-v384", "v384 must keep live read and runtime probe closed."],
    [checks.jsonActiveShardPrototypeDisabled, "ACTIVE_SHARD_PROTOTYPE_ENABLED", "source-node-v384", "v384 must keep active shard prototype disabled."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v384 must replay from frozen evidence."],
    [checks.replayUsesFrozenJavaV159MiniKvV150AndV149, "V384_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use Java v159, mini-kv v150, and mini-kv v149 frozen snapshots."],
    [checks.replayKeepsLiveReadGateClosed, "REPLAY_OPENED_LIVE_READ_GATE", "frozen-evidence-replay", "Replay must keep live read and runtime probes disabled."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v385 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v385 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): LiveReadGatePlanIntakeArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_GATE_PLAN_NOT_RUNTIME_GATE",
    severity: "warning",
    source: "archive-verification",
    message: "v385 verifies archived v384 gate-plan intake; it still does not run Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): LiveReadGatePlanIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "WAIT_FOR_OPERATOR_OWNED_SERVICE_LIFECYCLE_PLAN" : "REPAIR_V384_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v385",
    message: ready
      ? "Pause Node unless operator-owned service lifecycle evidence appears for a later runtime gate."
      : "Repair the v384 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: LiveReadGatePlanIntakeArchiveReferences,
): LiveReadGatePlanIntakeArchiveFileReference[] {
  return [
    refs.jsonEvidence,
    refs.markdownEvidence,
    refs.summaryEvidence,
    refs.browserSnapshot,
    refs.htmlArchive,
    refs.screenshot,
    refs.explanation,
    refs.codeWalkthrough,
    refs.sourcePlan,
    refs.plansIndex,
    refs.archiveIndex,
  ];
}

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const content = readTextFile(projectRoot, relativePath);
  if (content.length === 0) {
    return null;
  }
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return "";
  }
  return stripBom(readFileSync(absolutePath, "utf8"));
}

function valueAt(source: unknown, ...keys: string[]): unknown {
  let value = source;
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function stripBom(content: string): string {
  return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}
