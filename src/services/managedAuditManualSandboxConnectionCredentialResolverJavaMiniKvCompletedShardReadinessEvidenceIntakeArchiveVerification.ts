import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.js";
import type {
  CompletedShardEvidenceIntakeArchiveFileReference,
  CompletedShardEvidenceIntakeArchiveReferences,
  CompletedShardEvidenceIntakeArchiveVerificationChecks,
  CompletedShardEvidenceIntakeArchiveVerificationMessage,
  CompletedShardEvidenceIntakeArchiveVerificationRecord,
  CompletedShardEvidenceIntakeArchiveVerificationSummary,
  CompletedShardEvidenceIntakeReplayReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationProfile,
  SourceNodeV378CompletedShardEvidenceIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification";
const SOURCE_NODE_V378_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake";
const ACTIVE_PLAN =
  "docs/plans3/v378-post-java-mini-kv-completed-shard-readiness-evidence-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v379-post-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/378" as const;
const V378_BASENAME = "java-mini-kv-completed-shard-readiness-evidence-intake-v378";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/383-java-mini-kv-completed-shard-readiness-evidence-intake-v378.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV378 = createSourceNodeV378(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV378, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV378, archiveReferences, parsed, replay, draftVerification);
  checks.readyForCompletedShardEvidenceIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForCompletedShardEvidenceIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForCompletedShardEvidenceIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV378, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV378, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready ? "archive-completed-shard-evidence-intake-and-prepare-v380" : "blocked",
    readyForCompletedShardEvidenceIntakeArchiveVerification: ready,
    readyForNodeV380NextCompletedEvidenceOrLiveGate: ready,
    activeNodeVersion: "Node v379",
    sourceNodeVersion: "Node v378",
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
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    archiveReferences,
    sourceNodeV378,
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
      sourceNodeV378Json: SOURCE_NODE_V378_ROUTE,
      sourceNodeV378Markdown: `${SOURCE_NODE_V378_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v380",
    },
    nextActions: ready
      ? [
        "Use Node v380 only if there is a completed frozen upstream evidence step or an explicit live-read gate plan.",
        "Keep Java and mini-kv parallel work independent; Node should remain a consumer/gate, not a pre-approval blocker.",
        "Do not convert readiness evidence into active sharding without a separate mini-kv prototype plan.",
      ]
      : [
        "Repair the v378 archive before moving to v380.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): CompletedShardEvidenceIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V378_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V378_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V378_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V378_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V378_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V378_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V378_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): CompletedShardEvidenceIntakeArchiveFileReference {
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

function readParsedArchive(projectRoot: string, refs: CompletedShardEvidenceIntakeArchiveReferences): ParsedArchive {
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

function createSourceNodeV378(archive: ParsedArchive): SourceNodeV378CompletedShardEvidenceIntakeReference {
  return {
    sourceVersion: "Node v378",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForCompletedShardReadinessEvidenceIntake:
      valueAt(archive.json, "readyForCompletedShardReadinessEvidenceIntake") === true,
    readyForNodeV379ArchiveVerification: valueAt(archive.json, "readyForNodeV379ArchiveVerification") === true,
    activeNodeVersion: "Node v378",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    javaVerificationVersion: stringValue(valueAt(archive.json, "javaVerification", "version")),
    javaIndexVersion: stringValue(valueAt(archive.json, "javaIndex", "version")),
    miniKvReleaseVersion: stringValue(valueAt(archive.json, "miniKvEvidence", "releaseVersion")),
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaVerificationUsesHistoricalFallback: valueAt(archive.json, "javaVerificationFile", "usedHistoricalFallback") === true,
    javaIndexUsesHistoricalFallback: valueAt(archive.json, "javaIndexFile", "usedHistoricalFallback") === true,
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

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): CompletedShardEvidenceIntakeReplayReference {
  const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForCompletedShardReadinessEvidenceIntake
    && profile.javaVerificationFile.usedHistoricalFallback
    && profile.javaIndexFile.usedHistoricalFallback
    && profile.miniKvSnapshotFile.usedHistoricalFallback
    && profile.miniKvEvidence.releaseVersion === "v146";
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForCompletedShardReadinessEvidenceIntake: profile.readyForCompletedShardReadinessEvidenceIntake,
    javaVerificationUsedHistoricalFallback: profile.javaVerificationFile.usedHistoricalFallback,
    javaIndexUsedHistoricalFallback: profile.javaIndexFile.usedHistoricalFallback,
    miniKvUsedHistoricalFallback: profile.miniKvSnapshotFile.usedHistoricalFallback,
    miniKvReleaseVersion: profile.miniKvEvidence.releaseVersion,
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
  source: SourceNodeV378CompletedShardEvidenceIntakeReference,
  refs: CompletedShardEvidenceIntakeArchiveReferences,
  replay: CompletedShardEvidenceIntakeReplayReference,
  ready: boolean,
): CompletedShardEvidenceIntakeArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification" as const,
    sourceSpan: "Node v378 completed shard-readiness evidence intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-completed-shard-evidence-intake-and-prepare-v380" as const
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
    nextNodeVersionSuggested: "Node v380",
  };
}

function createChecks(
  source: SourceNodeV378CompletedShardEvidenceIntakeReference,
  refs: CompletedShardEvidenceIntakeArchiveReferences,
  archive: ParsedArchive,
  replay: CompletedShardEvidenceIntakeReplayReference,
  verification: CompletedShardEvidenceIntakeArchiveVerificationRecord,
): CompletedShardEvidenceIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1",
    jsonIntakeReady: source.readyForCompletedShardReadinessEvidenceIntake,
    jsonSourceNodeV377Ready: stringValue(valueAt(archive.json, "sourceNodeV377", "archiveVerificationState"))
      === "java-mini-kv-shard-readiness-evidence-consumption-archive-verified",
    jsonEvidenceVersionsMatch:
      source.javaVerificationVersion === "Java v156"
      && source.javaIndexVersion === "Java v155"
      && source.miniKvReleaseVersion === "v146",
    jsonIntakeDigestStable: isDigest(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots:
      source.javaVerificationUsesHistoricalFallback && source.javaIndexUsesHistoricalFallback
      && source.miniKvUsesHistoricalFallback,
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount,
    markdownRecordsIntake:
      archive.markdown.includes("Intake decision: consume-java-v156-and-mini-kv-v146-completed-evidence")
      && archive.markdown.includes("mini-kv v146 Snapshot"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("Intake state: java-mini-kv-completed-shard-readiness-evidence-intake-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsFrozenMiniKvV146:
      archive.explanation.includes("shard-readiness-v146.json") && archive.explanation.includes("38/38"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists && archive.codeWalkthrough.includes("v378") && archive.codeWalkthrough.includes("shard-readiness-v146.json"),
    sourcePlanPointsToV379AndParallelUpstreams:
      archive.sourcePlan.includes("Node v379") && archive.sourcePlan.includes("推荐并行"),
    planIndexReferencesV378AndV379:
      archive.plansIndex.includes("v378-post-java-mini-kv-completed-shard-readiness-evidence-intake-roadmap.md")
      && archive.plansIndex.includes("Node v379"),
    archiveIndexReferencesV378: archive.archiveIndex.includes("378: Java v156/v155 + mini-kv v146"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "completedEvidenceIntakeJson")) === SOURCE_NODE_V378_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenMiniKvV146:
      replay.miniKvUsedHistoricalFallback && replay.miniKvReleaseVersion === "v146",
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForCompletedShardEvidenceIntakeArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV378CompletedShardEvidenceIntakeReference,
  refs: CompletedShardEvidenceIntakeArchiveReferences,
  replay: CompletedShardEvidenceIntakeReplayReference,
  checks: CompletedShardEvidenceIntakeArchiveVerificationChecks,
  productionBlockers: readonly CompletedShardEvidenceIntakeArchiveVerificationMessage[],
  warnings: readonly CompletedShardEvidenceIntakeArchiveVerificationMessage[],
  recommendations: readonly CompletedShardEvidenceIntakeArchiveVerificationMessage[],
): CompletedShardEvidenceIntakeArchiveVerificationSummary {
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
  checks: CompletedShardEvidenceIntakeArchiveVerificationChecks,
): CompletedShardEvidenceIntakeArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v378 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v378 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V378_NOT_READY", "source-node-v378", "Node v378 intake must be ready."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V378_NOT_FROZEN", "source-node-v378", "v378 must use frozen historical snapshots."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v378 must replay from frozen evidence."],
    [checks.replayUsesFrozenMiniKvV146, "MINI_KV_V146_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use mini-kv v146 frozen snapshot."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v379 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v379 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): CompletedShardEvidenceIntakeArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_EVIDENCE_INTAKE_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "archive-verification",
    message: "v379 verifies archived v378 intake; shard readiness is still not active sharding.",
  }];
}

function collectRecommendations(ready: boolean): CompletedShardEvidenceIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_ONLY_WITH_COMPLETED_EVIDENCE_OR_EXPLICIT_LIVE_GATE" : "REPAIR_V378_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v379",
    message: ready
      ? "Proceed to Node v380 only with completed frozen upstream evidence or an explicit live-read gate plan."
      : "Repair the v378 archive before moving forward.",
  }];
}

function archiveFiles(refs: CompletedShardEvidenceIntakeArchiveReferences): CompletedShardEvidenceIntakeArchiveFileReference[] {
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
