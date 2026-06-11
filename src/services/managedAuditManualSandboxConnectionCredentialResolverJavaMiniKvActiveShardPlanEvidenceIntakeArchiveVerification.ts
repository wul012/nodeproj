import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.js";
import type {
  ActiveShardPlanEvidenceIntakeArchiveFileReference,
  ActiveShardPlanEvidenceIntakeArchiveReferences,
  ActiveShardPlanEvidenceIntakeArchiveVerificationChecks,
  ActiveShardPlanEvidenceIntakeArchiveVerificationMessage,
  ActiveShardPlanEvidenceIntakeArchiveVerificationRecord,
  ActiveShardPlanEvidenceIntakeArchiveVerificationSummary,
  ActiveShardPlanEvidenceIntakeReplayReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationProfile,
  SourceNodeV380ActiveShardPlanEvidenceIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification";
const SOURCE_NODE_V380_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake";
const ACTIVE_PLAN =
  "docs/plans3/v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v381-post-java-mini-kv-active-shard-plan-evidence-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/380" as const;
const V380_BASENAME = "java-mini-kv-active-shard-plan-evidence-intake-v380";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/385-java-mini-kv-active-shard-plan-evidence-intake-v380.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV380 = createSourceNodeV380(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV380, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV380, archiveReferences, parsed, replay, draftVerification);
  checks.readyForActiveShardPlanEvidenceIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForActiveShardPlanEvidenceIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForActiveShardPlanEvidenceIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV380, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV380, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-active-shard-plan-evidence-intake-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready ? "archive-active-shard-plan-evidence-intake-and-prepare-v381" : "blocked",
    readyForActiveShardPlanEvidenceIntakeArchiveVerification: ready,
    readyForNodeV381NextArchiveVerification: ready,
    activeNodeVersion: "Node v381",
    sourceNodeVersion: "Node v380",
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
    sourceNodeV380,
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
      sourceNodeV380Json: SOURCE_NODE_V380_ROUTE,
      sourceNodeV380Markdown: `${SOURCE_NODE_V380_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v382",
    },
    nextActions: ready
      ? [
        "Pause Node unless there is a new completed frozen evidence step or an explicit live-read gate plan.",
        "Keep Java and mini-kv parallel work independent; Node should remain a consumer/gate.",
        "Do not enable active shard routing without a separate mini-kv active prototype plan and service ownership record.",
      ]
      : [
        "Repair the v380 archive before moving beyond v381.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): ActiveShardPlanEvidenceIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V380_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V380_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V380_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V380_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V380_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V380_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V380_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): ActiveShardPlanEvidenceIntakeArchiveFileReference {
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

function readParsedArchive(projectRoot: string, refs: ActiveShardPlanEvidenceIntakeArchiveReferences): ParsedArchive {
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

function createSourceNodeV380(archive: ParsedArchive): SourceNodeV380ActiveShardPlanEvidenceIntakeReference {
  return {
    sourceVersion: "Node v380",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForActiveShardPlanEvidenceIntake:
      valueAt(archive.json, "readyForActiveShardPlanEvidenceIntake") === true,
    readyForNodeV381ArchiveVerification: valueAt(archive.json, "readyForNodeV381ArchiveVerification") === true,
    activeNodeVersion: "Node v380",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    javaHandoffVersion: stringValue(valueAt(archive.json, "javaHandoff", "version")),
    miniKvReleaseVersion: stringValue(valueAt(archive.json, "miniKvEvidence", "releaseVersion")),
    activeShardPrototypeEnabled: valueAt(archive.json, "activeShardPrototypeEnabled") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaHandoffUsesHistoricalFallback: valueAt(archive.json, "javaHandoffFile", "usedHistoricalFallback") === true,
    miniKvUsesHistoricalFallback: valueAt(archive.json, "miniKvSnapshotFile", "usedHistoricalFallback") === true,
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

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): ActiveShardPlanEvidenceIntakeReplayReference {
  const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForActiveShardPlanEvidenceIntake
    && profile.javaHandoffFile.usedHistoricalFallback
    && profile.miniKvSnapshotFile.usedHistoricalFallback
    && profile.javaHandoff.version === "Java v157"
    && profile.miniKvEvidence.releaseVersion === "v147"
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForActiveShardPlanEvidenceIntake: profile.readyForActiveShardPlanEvidenceIntake,
    javaHandoffUsedHistoricalFallback: profile.javaHandoffFile.usedHistoricalFallback,
    miniKvUsedHistoricalFallback: profile.miniKvSnapshotFile.usedHistoricalFallback,
    javaHandoffVersion: profile.javaHandoff.version,
    miniKvReleaseVersion: profile.miniKvEvidence.releaseVersion,
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
  source: SourceNodeV380ActiveShardPlanEvidenceIntakeReference,
  refs: ActiveShardPlanEvidenceIntakeArchiveReferences,
  replay: ActiveShardPlanEvidenceIntakeReplayReference,
  ready: boolean,
): ActiveShardPlanEvidenceIntakeArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-active-shard-plan-evidence-intake-archive-verification" as const,
    sourceSpan: "Node v380 active shard plan evidence intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-active-shard-plan-evidence-intake-and-prepare-v381" as const
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
    nextNodeVersionSuggested: "Node v381",
  };
}

function createChecks(
  source: SourceNodeV380ActiveShardPlanEvidenceIntakeReference,
  refs: ActiveShardPlanEvidenceIntakeArchiveReferences,
  archive: ParsedArchive,
  replay: ActiveShardPlanEvidenceIntakeReplayReference,
  verification: ActiveShardPlanEvidenceIntakeArchiveVerificationRecord,
): ActiveShardPlanEvidenceIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1",
    jsonIntakeReady: source.readyForActiveShardPlanEvidenceIntake,
    jsonSourceNodeV379Ready: stringValue(valueAt(archive.json, "sourceNodeV379", "archiveVerificationState"))
      === "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified",
    jsonEvidenceVersionsMatch:
      source.javaHandoffVersion === "Java v157" && source.miniKvReleaseVersion === "v147",
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonIntakeDigestStable: isDigest(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots: source.javaHandoffUsesHistoricalFallback && source.miniKvUsesHistoricalFallback,
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "activeShardPrototypeEnabled") === false,
    markdownRecordsIntake:
      archive.markdown.includes("Intake decision: consume-java-v157-and-mini-kv-v147-active-plan-evidence")
      && archive.markdown.includes("mini-kv v147 Frozen Snapshot"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("Intake state: java-mini-kv-active-shard-plan-evidence-intake-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsFrozenMiniKvV147:
      archive.explanation.includes("mini-kv v147") && archive.explanation.includes("33/33"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists && archive.codeWalkthrough.includes("v380")
      && archive.codeWalkthrough.includes("shard-readiness-v147.json"),
    sourcePlanPointsToV381AndLiveGatePause:
      archive.sourcePlan.includes("Node v381") && archive.sourcePlan.includes("live-read gate"),
    planIndexReferencesV380AndV381:
      archive.plansIndex.includes("v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md")
      && archive.plansIndex.includes("Node v381"),
    archiveIndexReferencesV380:
      archive.archiveIndex.includes("380: Java v157 + mini-kv v147 active shard plan evidence intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "activeShardPlanEvidenceIntakeJson"))
      === SOURCE_NODE_V380_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV157AndMiniKvV147:
      replay.javaHandoffUsedHistoricalFallback && replay.miniKvUsedHistoricalFallback
      && replay.javaHandoffVersion === "Java v157" && replay.miniKvReleaseVersion === "v147",
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
    readyForActiveShardPlanEvidenceIntakeArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV380ActiveShardPlanEvidenceIntakeReference,
  refs: ActiveShardPlanEvidenceIntakeArchiveReferences,
  replay: ActiveShardPlanEvidenceIntakeReplayReference,
  checks: ActiveShardPlanEvidenceIntakeArchiveVerificationChecks,
  productionBlockers: readonly ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[],
  warnings: readonly ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[],
  recommendations: readonly ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[],
): ActiveShardPlanEvidenceIntakeArchiveVerificationSummary {
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
  checks: ActiveShardPlanEvidenceIntakeArchiveVerificationChecks,
): ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v380 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v380 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V380_NOT_READY", "source-node-v380", "Node v380 intake must be ready."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V380_NOT_FROZEN", "source-node-v380", "v380 must use frozen historical snapshots."],
    [checks.jsonActiveShardPrototypeDisabled, "ACTIVE_SHARD_PROTOTYPE_ENABLED", "source-node-v380", "v380 must keep active shard prototype disabled."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v380 must replay from frozen evidence."],
    [checks.replayUsesFrozenJavaV157AndMiniKvV147, "V380_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use Java v157 and mini-kv v147 frozen snapshots."],
    [checks.replayKeepsActiveShardPrototypeDisabled, "REPLAY_ENABLED_ACTIVE_SHARD", "frozen-evidence-replay", "Replay must keep active shard prototype disabled."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v381 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v381 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_ACTIVE_PLAN_EVIDENCE_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "archive-verification",
    message: "v381 verifies archived v380 intake; activePrototypePlan evidence is still not active sharding.",
  }];
}

function collectRecommendations(ready: boolean): ActiveShardPlanEvidenceIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "WAIT_FOR_NEW_EVIDENCE_OR_EXPLICIT_LIVE_GATE" : "REPAIR_V380_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v381",
    message: ready
      ? "Pause Node unless there is new completed frozen evidence or an explicit live-read gate plan."
      : "Repair the v380 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: ActiveShardPlanEvidenceIntakeArchiveReferences,
): ActiveShardPlanEvidenceIntakeArchiveFileReference[] {
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
  return readFileSync(absolutePath, "utf8");
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
