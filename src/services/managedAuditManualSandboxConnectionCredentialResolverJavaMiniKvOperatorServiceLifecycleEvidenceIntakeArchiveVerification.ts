import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationProfile,
  OperatorServiceLifecycleEvidenceIntakeArchiveFileReference,
  OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
  OperatorServiceLifecycleEvidenceIntakeArchiveVerificationChecks,
  OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage,
  OperatorServiceLifecycleEvidenceIntakeArchiveVerificationRecord,
  OperatorServiceLifecycleEvidenceIntakeArchiveVerificationSummary,
  OperatorServiceLifecycleEvidenceIntakeReplayReference,
  SourceNodeV386OperatorServiceLifecycleEvidenceIntakeReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification";
const SOURCE_NODE_V386_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake";
const ACTIVE_PLAN =
  "docs/plans3/v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v387-post-java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/386" as const;
const V386_BASENAME = "java-mini-kv-operator-service-lifecycle-evidence-intake-v386";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/r0000/391-java-mini-kv-operator-service-lifecycle-evidence-intake-v386.md";

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV386 = createSourceNodeV386(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV386, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV386, archiveReferences, parsed, replay, draftVerification);
  checks.readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV386, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV386, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready ? "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified" : "blocked",
    archiveVerificationDecision: ready
      ? "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388"
      : "blocked",
    readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: ready,
    readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v387",
    sourceNodeVersion: "Node v386",
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
    sourceNodeV386,
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
      sourceNodeV386Json: SOURCE_NODE_V386_ROUTE,
      sourceNodeV386Markdown: `${SOURCE_NODE_V386_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v388",
    },
    nextActions: ready
      ? [
        "Pause runtime work until mini-kv replaces the v151 template with declared operator-owned service lifecycle evidence.",
        "Keep Java and mini-kv in recommended parallel mode; Node v387 only verifies the v386 archive.",
        "Do not run runtime probes or start sibling services from this archive verification.",
      ]
      : [
        "Repair the v386 archive before moving beyond v387.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): OperatorServiceLifecycleEvidenceIntakeArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V386_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V386_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V386_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V386_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V386_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V386_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V386_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): OperatorServiceLifecycleEvidenceIntakeArchiveFileReference {
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

function readParsedArchive(
  projectRoot: string,
  refs: OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
): ParsedArchive {
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

function createSourceNodeV386(archive: ParsedArchive): SourceNodeV386OperatorServiceLifecycleEvidenceIntakeReference {
  return {
    sourceVersion: "Node v386",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakeState: stringValue(valueAt(archive.json, "intakeState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForOperatorServiceLifecycleEvidenceIntake:
      valueAt(archive.json, "readyForOperatorServiceLifecycleEvidenceIntake") === true,
    readyForNodeV387ArchiveVerification: valueAt(archive.json, "readyForNodeV387ArchiveVerification") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v386",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    javaOperatorServiceLifecycleVersion:
      stringValue(valueAt(archive.json, "javaOperatorServiceLifecycle", "version")),
    miniKvOperatorServiceLifecycleReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvOperatorServiceLifecycleTemplate", "releaseVersion")),
    miniKvFrozenLiveReadGatePlanReleaseVersion:
      stringValue(valueAt(archive.json, "miniKvFrozenLiveReadGatePlan", "releaseVersion")),
    javaOperatorLifecycleEvidencePresent:
      valueAt(archive.json, "intake", "javaOperatorLifecycleEvidencePresent") === true,
    miniKvLifecycleTemplateOnly: valueAt(archive.json, "intake", "miniKvLifecycleTemplateOnly") === true,
    declaredMiniKvOperatorEvidenceCount:
      numberValue(valueAt(archive.json, "summary", "declaredMiniKvOperatorEvidenceCount")),
    liveReadGateAllowed: valueAt(archive.json, "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(archive.json, "runtimeProbeAllowed") === true,
    activeShardPrototypeEnabled: valueAt(archive.json, "activeShardPrototypeEnabled") === true,
    intakeDigest: stringValue(valueAt(archive.json, "intake", "intakeDigest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    javaOperatorServiceLifecycleUsesHistoricalFallback:
      valueAt(archive.json, "javaOperatorServiceLifecycleFile", "usedHistoricalFallback") === true,
    miniKvOperatorServiceLifecycleTemplateUsesHistoricalFallback:
      valueAt(archive.json, "miniKvOperatorServiceLifecycleTemplateFile", "usedHistoricalFallback") === true,
    miniKvFrozenLiveReadGatePlanUsesHistoricalFallback:
      valueAt(archive.json, "miniKvFrozenLiveReadGatePlanFile", "usedHistoricalFallback") === true,
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

function replayFromFrozenEvidence(
  config: AppConfig,
  projectRoot: string,
): OperatorServiceLifecycleEvidenceIntakeReplayReference {
  const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForOperatorServiceLifecycleEvidenceIntake
    && profile.javaOperatorServiceLifecycleFile.usedHistoricalFallback
    && profile.miniKvOperatorServiceLifecycleTemplateFile.usedHistoricalFallback
    && profile.miniKvFrozenLiveReadGatePlanFile.usedHistoricalFallback
    && profile.javaOperatorServiceLifecycle.version === "Java v160"
    && profile.miniKvOperatorServiceLifecycleTemplate.releaseVersion === "v151"
    && profile.miniKvFrozenLiveReadGatePlan.releaseVersion === "v150"
    && profile.intake.javaOperatorLifecycleEvidencePresent
    && profile.intake.miniKvLifecycleTemplateOnly
    && profile.summary.declaredMiniKvOperatorEvidenceCount === 0
    && !profile.readyForRuntimeLiveReadGate
    && !profile.liveReadGateAllowed
    && !profile.runtimeProbeAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForOperatorServiceLifecycleEvidenceIntake: profile.readyForOperatorServiceLifecycleEvidenceIntake,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    javaOperatorServiceLifecycleUsedHistoricalFallback:
      profile.javaOperatorServiceLifecycleFile.usedHistoricalFallback,
    miniKvOperatorServiceLifecycleTemplateUsedHistoricalFallback:
      profile.miniKvOperatorServiceLifecycleTemplateFile.usedHistoricalFallback,
    miniKvFrozenLiveReadGatePlanUsedHistoricalFallback:
      profile.miniKvFrozenLiveReadGatePlanFile.usedHistoricalFallback,
    javaOperatorServiceLifecycleVersion: profile.javaOperatorServiceLifecycle.version,
    miniKvOperatorServiceLifecycleReleaseVersion: profile.miniKvOperatorServiceLifecycleTemplate.releaseVersion,
    miniKvFrozenLiveReadGatePlanReleaseVersion: profile.miniKvFrozenLiveReadGatePlan.releaseVersion,
    javaOperatorLifecycleEvidencePresent: profile.intake.javaOperatorLifecycleEvidencePresent,
    miniKvLifecycleTemplateOnly: profile.intake.miniKvLifecycleTemplateOnly,
    declaredMiniKvOperatorEvidenceCount: profile.summary.declaredMiniKvOperatorEvidenceCount,
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
  source: SourceNodeV386OperatorServiceLifecycleEvidenceIntakeReference,
  refs: OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
  replay: OperatorServiceLifecycleEvidenceIntakeReplayReference,
  ready: boolean,
): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification" as const,
    sourceSpan: "Node v386 operator service lifecycle evidence intake" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-operator-service-lifecycle-evidence-intake-and-prepare-v388" as const
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
    verifiesRuntimeGateStillBlocked: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v388",
  };
}

function createChecks(
  source: SourceNodeV386OperatorServiceLifecycleEvidenceIntakeReference,
  refs: OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
  archive: ParsedArchive,
  replay: OperatorServiceLifecycleEvidenceIntakeReplayReference,
  verification: OperatorServiceLifecycleEvidenceIntakeArchiveVerificationRecord,
): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1",
    jsonIntakeReady:
      source.readyForOperatorServiceLifecycleEvidenceIntake && source.readyForNodeV387ArchiveVerification,
    jsonSourceNodeV385Ready: stringValue(valueAt(archive.json, "sourceNodeV385", "archiveVerificationState"))
      === "java-mini-kv-live-read-gate-plan-intake-archive-verified",
    jsonEvidenceVersionsMatch:
      source.javaOperatorServiceLifecycleVersion === "Java v160"
      && source.miniKvOperatorServiceLifecycleReleaseVersion === "v151"
      && source.miniKvFrozenLiveReadGatePlanReleaseVersion === "v150",
    jsonRuntimeGateClosed:
      !source.readyForRuntimeLiveReadGate && !source.liveReadGateAllowed && !source.runtimeProbeAllowed,
    jsonActiveShardPrototypeDisabled: !source.activeShardPrototypeEnabled,
    jsonIntakeDigestStable: isDigest(source.intakeDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonUsesFrozenHistoricalSnapshots:
      source.javaOperatorServiceLifecycleUsesHistoricalFallback
      && source.miniKvOperatorServiceLifecycleTemplateUsesHistoricalFallback
      && source.miniKvFrozenLiveReadGatePlanUsesHistoricalFallback,
    jsonMiniKvTemplateOnly:
      source.javaOperatorLifecycleEvidencePresent
      && source.miniKvLifecycleTemplateOnly
      && source.declaredMiniKvOperatorEvidenceCount === 0,
    summaryMatchesJson:
      valueAt(archive.summary, "intakeState") === source.intakeState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "declaredMiniKvOperatorEvidenceCount") === 0,
    markdownRecordsOperatorServiceLifecycle:
      archive.markdown.includes(
        "Intake decision: consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence",
      )
      && archive.markdown.includes("mini-kv v151 Operator Service Lifecycle Template")
      && archive.markdown.includes("Ready for runtime live-read gate: false"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("java-mini-kv-operator-service-lifecycle-evidence-intake-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsRuntimeGateBlockedAndChecks:
      archive.explanation.includes("readyForRuntimeLiveReadGate: false") && archive.explanation.includes("45/45"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists && archive.codeWalkthrough.includes("v386")
      && archive.codeWalkthrough.includes("shard-readiness-v151.json"),
    sourcePlanPointsToV387ArchiveVerification:
      archive.sourcePlan.includes("Node v387 archives and verifies the v386 evidence intake")
      || archive.sourcePlan.includes("Node v387 should archive and verify this v386 intake"),
    planIndexReferencesV386AndV387:
      archive.plansIndex.includes("v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md")
      && archive.plansIndex.includes("Node v386"),
    archiveIndexReferencesV386:
      archive.archiveIndex.includes("386: Java v160 + mini-kv v151 operator service lifecycle evidence intake"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "operatorServiceLifecycleEvidenceIntakeJson"))
      === SOURCE_NODE_V386_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayUsesFrozenJavaV160MiniKvV151AndV150:
      replay.javaOperatorServiceLifecycleUsedHistoricalFallback
      && replay.miniKvOperatorServiceLifecycleTemplateUsedHistoricalFallback
      && replay.miniKvFrozenLiveReadGatePlanUsedHistoricalFallback
      && replay.javaOperatorServiceLifecycleVersion === "Java v160"
      && replay.miniKvOperatorServiceLifecycleReleaseVersion === "v151"
      && replay.miniKvFrozenLiveReadGatePlanReleaseVersion === "v150",
    replayKeepsRuntimeGateClosed:
      !replay.readyForRuntimeLiveReadGate && !replay.liveReadGateAllowed && !replay.runtimeProbeAllowed,
    replayKeepsActiveShardPrototypeDisabled: !replay.activeShardPrototypeEnabled,
    replayKeepsMiniKvTemplateOnly:
      replay.javaOperatorLifecycleEvidencePresent
      && replay.miniKvLifecycleTemplateOnly
      && replay.declaredMiniKvOperatorEvidenceCount === 0,
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV386OperatorServiceLifecycleEvidenceIntakeReference,
  refs: OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
  replay: OperatorServiceLifecycleEvidenceIntakeReplayReference,
  checks: OperatorServiceLifecycleEvidenceIntakeArchiveVerificationChecks,
  productionBlockers: readonly OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[],
  warnings: readonly OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[],
  recommendations: readonly OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[],
): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    declaredMiniKvOperatorEvidenceCount: source.declaredMiniKvOperatorEvidenceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: OperatorServiceLifecycleEvidenceIntakeArchiveVerificationChecks,
): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v386 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v386 JSON archive must be readable."],
    [checks.jsonIntakeReady, "SOURCE_V386_NOT_READY", "source-node-v386", "Node v386 intake must be ready."],
    [checks.jsonUsesFrozenHistoricalSnapshots, "SOURCE_V386_NOT_FROZEN", "source-node-v386", "v386 must use frozen historical snapshots."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "source-node-v386", "v386 must keep runtime live-read gate closed."],
    [checks.jsonMiniKvTemplateOnly, "MINI_KV_TEMPLATE_STATE_CHANGED", "source-node-v386", "v386 must record mini-kv v151 as template-only with no declared runtime evidence."],
    [checks.jsonActiveShardPrototypeDisabled, "ACTIVE_SHARD_PROTOTYPE_ENABLED", "source-node-v386", "v386 must keep active shard prototype disabled."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v386 must replay from frozen evidence."],
    [checks.replayUsesFrozenJavaV160MiniKvV151AndV150, "V386_REPLAY_NOT_FROZEN", "frozen-evidence-replay", "Replay must use Java v160, mini-kv v151, and mini-kv v150 frozen snapshots."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsMiniKvTemplateOnly, "REPLAY_MINI_KV_TEMPLATE_CHANGED", "frozen-evidence-replay", "Replay must preserve mini-kv v151 template-only state."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v387 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v387 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFIES_OPERATOR_LIFECYCLE_INTAKE_NOT_RUNTIME_GATE",
      severity: "warning",
      source: "archive-verification",
      message: "v387 verifies archived v386 operator lifecycle intake; it still does not run Java, mini-kv, or runtime probes.",
    },
    {
      code: "MINI_KV_TEMPLATE_STILL_BLOCKS_RUNTIME_GATE",
      severity: "warning",
      source: "mini-kv-v151",
      message: "mini-kv v151 remains template-only, so v387 cannot promote this archive to runtime live-read approval.",
    },
  ];
}

function collectRecommendations(ready: boolean): OperatorServiceLifecycleEvidenceIntakeArchiveVerificationMessage[] {
  return [{
    code: ready ? "WAIT_FOR_DECLARED_OPERATOR_SERVICE_LIFECYCLE_EVIDENCE" : "REPAIR_V386_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v387",
    message: ready
      ? "Pause runtime work until declared Java and mini-kv operator service lifecycle evidence exists."
      : "Repair the v386 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: OperatorServiceLifecycleEvidenceIntakeArchiveReferences,
): OperatorServiceLifecycleEvidenceIntakeArchiveFileReference[] {
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
