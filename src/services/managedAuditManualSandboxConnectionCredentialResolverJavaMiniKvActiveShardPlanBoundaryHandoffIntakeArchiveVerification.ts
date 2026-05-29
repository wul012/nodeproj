import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.js";
import type {
  ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference,
  ActiveShardPlanBoundaryHandoffIntakeArchiveReferences,
  ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks,
  ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage,
  ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRecord,
  ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationSummary,
  ActiveShardPlanBoundaryHandoffIntakeReplayReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationProfile,
  SourceNodeV382BoundaryHandoffIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification";
const SOURCE_NODE_V382_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake";
const ACTIVE_PLAN =
  "docs/plans3/v382-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v383-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/382" as const;
const V382_BASENAME = "java-mini-kv-active-shard-plan-boundary-handoff-intake-v382";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/387-java-mini-kv-active-shard-plan-boundary-handoff-intake-v382.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV382 = createSourceNodeV382(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV382, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV382, archiveReferences, parsed, replay, draftVerification);
  checks.readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV382, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV382, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384"
      : "blocked",
    readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: ready,
    readyForNodeV384NextBoundaryEvidenceOrLiveGate: ready,
    activeNodeVersion: "Node v383",
    sourceNodeVersion: "Node v382",
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
    sourceNodeV382,
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
      sourceNodeV382Json: SOURCE_NODE_V382_ROUTE,
      sourceNodeV382Markdown: `${SOURCE_NODE_V382_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v384",
    },
    nextActions: ready
      ? [
        "Pause Node unless there is new frozen boundary evidence or an explicit live-read gate plan.",
        "Keep Java and mini-kv parallel work independent; Node v383 only verifies the v382 archive.",
        "Do not enable active shard routing without a separate mini-kv active prototype plan and service ownership record.",
      ]
      : [
        "Repair the v382 archive before moving beyond v383.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): ActiveShardPlanBoundaryHandoffIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V382_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V382_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V382_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V382_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V382_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V382_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V382_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference {
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

function readParsedArchive(projectRoot: string, refs: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences): ParsedArchive {
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

function createSourceNodeV382(archive: ParsedArchive): SourceNodeV382BoundaryHandoffIntakeReference {
  return {
    sourceVersion: "Node v382",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForActiveShardPlanBoundaryHandoffIntake:
      valueAt(archive.json, "readyForActiveShardPlanBoundaryHandoffIntake") === true,
    readyForNodeV383ArchiveVerification: valueAt(archive.json, "readyForNodeV383ArchiveVerification") === true,
    activeNodeVersion: "Node v382",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    javaHandoffVersion: stringValue(valueAt(archive.json, "javaHandoff", "version")),
    miniKvHandoffReleaseVersion: stringValue(valueAt(archive.json, "miniKvHandoff", "releaseVersion")),
    miniKvFrozenPlanReleaseVersion: stringValue(valueAt(archive.json, "miniKvFrozenPlan", "releaseVersion")),
    activeShardPrototypeEnabled: valueAt(archive.json, "activeShardPrototypeEnabled") === true,
    liveReadGateRequiredBeforeRuntimeProbe:
      valueAt(archive.json, "intake", "liveReadGateRequiredBeforeRuntimeProbe") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaHandoffUsesHistoricalFallback: valueAt(archive.json, "javaHandoffFile", "usedHistoricalFallback") === true,
    miniKvHandoffUsesHistoricalFallback: valueAt(archive.json, "miniKvHandoffFile", "usedHistoricalFallback") === true,
    miniKvFrozenPlanUsesHistoricalFallback:
      valueAt(archive.json, "miniKvFrozenPlanFile", "usedHistoricalFallback") === true,
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

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): ActiveShardPlanBoundaryHandoffIntakeReplayReference {
  const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForActiveShardPlanBoundaryHandoffIntake
    && profile.javaHandoffFile.usedHistoricalFallback
    && profile.miniKvHandoffFile.usedHistoricalFallback
    && profile.miniKvFrozenPlanFile.usedHistoricalFallback
    && profile.javaHandoff.version === "Java v158"
    && profile.miniKvHandoff.releaseVersion === "v149"
    && profile.miniKvFrozenPlan.releaseVersion === "v148"
    && profile.intake.liveReadGateRequiredBeforeRuntimeProbe
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForActiveShardPlanBoundaryHandoffIntake: profile.readyForActiveShardPlanBoundaryHandoffIntake,
    javaHandoffUsedHistoricalFallback: profile.javaHandoffFile.usedHistoricalFallback,
    miniKvHandoffUsedHistoricalFallback: profile.miniKvHandoffFile.usedHistoricalFallback,
    miniKvFrozenPlanUsedHistoricalFallback: profile.miniKvFrozenPlanFile.usedHistoricalFallback,
    javaHandoffVersion: profile.javaHandoff.version,
    miniKvHandoffReleaseVersion: profile.miniKvHandoff.releaseVersion,
    miniKvFrozenPlanReleaseVersion: profile.miniKvFrozenPlan.releaseVersion,
    activeShardPrototypeEnabled: profile.activeShardPrototypeEnabled,
    liveReadGateRequiredBeforeRuntimeProbe: profile.intake.liveReadGateRequiredBeforeRuntimeProbe,
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
  source: SourceNodeV382BoundaryHandoffIntakeReference,
  refs: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences,
  replay: ActiveShardPlanBoundaryHandoffIntakeReplayReference,
  ready: boolean,
): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification" as const,
    sourceSpan: "Node v382 active shard plan boundary handoff intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-active-shard-plan-boundary-handoff-intake-and-prepare-v384" as const
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
    nextNodeVersionSuggested: "Node v384",
  };
}

function createChecks(
  source: SourceNodeV382BoundaryHandoffIntakeReference,
  refs: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences,
  archive: ParsedArchive,
  replay: ActiveShardPlanBoundaryHandoffIntakeReplayReference,
  verification: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationRecord,
): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1",
    jsonIntakeReady: source.readyForActiveShardPlanBoundaryHandoffIntake,
    jsonSourceNodeV381Ready: stringValue(valueAt(archive.json, "sourceNodeV381", "archiveVerificationState"))
      === "java-mini-kv-active-shard-plan-evidence-intake-archive-verified",
    jsonEvidenceVersionsMatch:
      source.javaHandoffVersion === "Java v158"
      && source.miniKvHandoffReleaseVersion === "v149"
      && source.miniKvFrozenPlanReleaseVersion === "v148",
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonLiveReadGateRequiredBeforeRuntimeProbe: source.liveReadGateRequiredBeforeRuntimeProbe,
    jsonIntakeDigestStable: isDigest(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots:
      source.javaHandoffUsesHistoricalFallback
      && source.miniKvHandoffUsesHistoricalFallback
      && source.miniKvFrozenPlanUsesHistoricalFallback,
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "activeShardPrototypeEnabled") === false,
    markdownRecordsBoundaryHandoff:
      archive.markdown.includes("Intake decision: consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence")
      && archive.markdown.includes("mini-kv v149 Consumer Handoff"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("java-mini-kv-active-shard-plan-boundary-handoff-intake-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsMiniKvV149AndChecks:
      archive.explanation.includes("mini-kv handoff = v149") && archive.explanation.includes("39/39"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists && archive.codeWalkthrough.includes("v382")
      && archive.codeWalkthrough.includes("shard-readiness-v149.json"),
    sourcePlanPointsToV383AndLiveGatePause:
      archive.sourcePlan.includes("Node v383") && archive.sourcePlan.includes("live-read gate"),
    planIndexReferencesV382AndV383:
      archive.plansIndex.includes("v382-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-roadmap.md")
      && archive.plansIndex.includes("Node v383"),
    archiveIndexReferencesV382:
      archive.archiveIndex.includes("382: Java v158 + mini-kv v149 active shard plan boundary handoff intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "activeShardPlanBoundaryHandoffIntakeJson"))
      === SOURCE_NODE_V382_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV158MiniKvV149AndV148:
      replay.javaHandoffUsedHistoricalFallback
      && replay.miniKvHandoffUsedHistoricalFallback
      && replay.miniKvFrozenPlanUsedHistoricalFallback
      && replay.javaHandoffVersion === "Java v158"
      && replay.miniKvHandoffReleaseVersion === "v149"
      && replay.miniKvFrozenPlanReleaseVersion === "v148",
    replayKeepsActiveShardPrototypeDisabled: !replay.activeShardPrototypeEnabled,
    replayRequiresLiveReadGateBeforeRuntimeProbe: replay.liveReadGateRequiredBeforeRuntimeProbe,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV382BoundaryHandoffIntakeReference,
  refs: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences,
  replay: ActiveShardPlanBoundaryHandoffIntakeReplayReference,
  checks: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks,
  productionBlockers: readonly ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[],
  warnings: readonly ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[],
  recommendations: readonly ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[],
): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationSummary {
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
  checks: ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationChecks,
): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v382 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v382 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V382_NOT_READY", "source-node-v382", "Node v382 intake must be ready."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V382_NOT_FROZEN", "source-node-v382", "v382 must use frozen historical snapshots."],
    [checks.jsonActiveShardPrototypeDisabled, "ACTIVE_SHARD_PROTOTYPE_ENABLED", "source-node-v382", "v382 must keep active shard prototype disabled."],
    [checks.jsonLiveReadGateRequiredBeforeRuntimeProbe, "LIVE_READ_GATE_REQUIREMENT_MISSING", "source-node-v382", "v382 must keep live read behind a separate gate."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v382 must replay from frozen evidence."],
    [checks.replayUsesFrozenJavaV158MiniKvV149AndV148, "V382_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use Java v158, mini-kv v149, and mini-kv v148 frozen snapshots."],
    [checks.replayKeepsActiveShardPrototypeDisabled, "REPLAY_ENABLED_ACTIVE_SHARD", "frozen-evidence-replay", "Replay must keep active shard prototype disabled."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v383 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v383 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_BOUNDARY_HANDOFF_NOT_LIVE_READ",
    severity: "warning",
    source: "archive-verification",
    message: "v383 verifies archived v382 boundary handoff intake; it still does not run Java or mini-kv.",
  }];
}

function collectRecommendations(ready: boolean): ActiveShardPlanBoundaryHandoffIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "WAIT_FOR_NEW_EVIDENCE_OR_EXPLICIT_LIVE_GATE" : "REPAIR_V382_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v383",
    message: ready
      ? "Pause Node unless there is new frozen boundary evidence or an explicit live-read gate plan."
      : "Repair the v382 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: ActiveShardPlanBoundaryHandoffIntakeArchiveReferences,
): ActiveShardPlanBoundaryHandoffIntakeArchiveFileReference[] {
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
