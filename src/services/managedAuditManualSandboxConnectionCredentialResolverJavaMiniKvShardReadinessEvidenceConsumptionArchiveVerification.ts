import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.js";
import type {
  ForcedHistoricalFallbackReplayReference,
  JavaMiniKvShardEvidenceConsumptionArchiveFileReference,
  JavaMiniKvShardEvidenceConsumptionArchiveReferences,
  JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks,
  JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage,
  JavaMiniKvShardEvidenceConsumptionArchiveVerificationRecord,
  JavaMiniKvShardEvidenceConsumptionArchiveVerificationSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationProfile,
  SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification";
const SOURCE_NODE_V376_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption";
const ACTIVE_PLAN = "docs/plans3/v376-post-java-mini-kv-shard-readiness-evidence-consumption-roadmap.md";
const NEXT_PLAN = "docs/plans3/v377-post-java-mini-kv-shard-readiness-evidence-consumption-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/376" as const;
const V376_BASENAME = "java-mini-kv-shard-readiness-evidence-consumption-v376";
const CODE_WALKTHROUGH =
  "代码讲解记录_生产雏形阶段3/381-java-mini-kv-shard-readiness-evidence-consumption-v376.md";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

interface ParsedArchiveEvidence {
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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsedArchive = readParsedArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV376 = createSourceNodeV376(parsedArchive);
  const forcedHistoricalFallbackReplay = replayForcedHistoricalFallback(input.config, projectRoot);
  const draftArchiveVerification = createArchiveVerification(sourceNodeV376, archiveReferences,
    forcedHistoricalFallbackReplay, false);
  const checks = createChecks(input.config, sourceNodeV376, archiveReferences, parsedArchive,
    forcedHistoricalFallbackReplay, draftArchiveVerification);
  checks.readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV376, archiveReferences,
    forcedHistoricalFallbackReplay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV376);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV376, archiveReferences, forcedHistoricalFallbackReplay, checks,
    productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-shard-readiness-evidence-consumption-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378"
      : "blocked",
    readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: ready,
    readyForNodeV378CompletedEvidenceIntake: ready,
    consumesNodeV376JavaMiniKvShardEvidenceConsumption: true,
    activeNodeVersion: "Node v377",
    sourceNodeVersion: "Node v376",
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
    sourceNodeV376,
    forcedHistoricalFallbackReplay,
    archiveVerification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV376Json: SOURCE_NODE_V376_ROUTE,
      sourceNodeV376Markdown: `${SOURCE_NODE_V376_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v378",
    },
    nextActions: ready
      ? [
        "Use Node v378 to consume the next completed Java/mini-kv shard-readiness evidence, or pause if no completed upstream evidence exists.",
        "Keep Java and mini-kv parallel work independent; Node should only read completed evidence versions.",
        "Do not convert shard readiness evidence into active sharding without a separate explicit plan.",
      ]
      : [
        "Repair the v376 archive or forced historical fallback replay before moving to v378.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): JavaMiniKvShardEvidenceConsumptionArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V376_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V376_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V376_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V376_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V376_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "图片", `${V376_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "解释", `${V376_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): JavaMiniKvShardEvidenceConsumptionArchiveFileReference {
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
  refs: JavaMiniKvShardEvidenceConsumptionArchiveReferences,
): ParsedArchiveEvidence {
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

function createSourceNodeV376(
  archive: ParsedArchiveEvidence,
): SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference {
  return {
    sourceVersion: "Node v376",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    evidenceConsumptionState: evidenceConsumptionState(archive),
    evidenceConsumptionDecision: evidenceConsumptionDecision(archive),
    readyForJavaMiniKvShardReadinessEvidenceConsumption:
      valueAt(archive.json, "readyForJavaMiniKvShardReadinessEvidenceConsumption") === true,
    readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification:
      valueAt(archive.json, "readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification") === true,
    activeNodeVersion: "Node v376",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    sourceNodeV375Ready:
      valueAt(archive.json, "sourceNodeV375", "readyForNodeV376JavaMiniKvShardEvidenceConsumption") === true,
    consumptionDigest: stringValue(valueAt(archive.json, "evidenceConsumption", "consumptionDigest")),
    sourceNodeV375Digest: stringValue(valueAt(archive.json, "sourceNodeV375", "sourceArchiveVerificationDigest")),
    javaVersion: stringValue(valueAt(archive.json, "javaShardReadiness", "evidence", "version")),
    javaSourceCoreVersion: stringOrNull(valueAt(archive.json, "javaShardReadiness", "evidence", "sourceCoreVersion")),
    miniKvReleaseVersion: stringOrNull(valueAt(archive.json, "miniKvShardReadiness", "evidence", "releaseVersion")),
    javaHardeningDigest: stringOrNull(valueAt(archive.json, "evidenceConsumption", "javaV154HardeningDigest")),
    javaSourceCoreDigest: stringOrNull(valueAt(archive.json, "evidenceConsumption", "javaV153SourceDigest")),
    miniKvDigest: stringOrNull(valueAt(archive.json, "evidenceConsumption", "miniKvV145Digest")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    historicalFallbackCovered: valueAt(archive.json, "checks", "historicalFallbackCovered") === true,
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

function replayForcedHistoricalFallback(
  config: AppConfig,
  projectRoot: string,
): ForcedHistoricalFallbackReplayReference {
  const previous = process.env[FORCE_FALLBACK_ENV];
  process.env[FORCE_FALLBACK_ENV] = "true";
  try {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
      config,
      archiveRoot: projectRoot,
    });
    const ready = profile.readyForJavaMiniKvShardReadinessEvidenceConsumption
      && profile.javaShardReadiness.hardeningFile.usedHistoricalFallback
      && profile.javaShardReadiness.sourceCoreFile?.usedHistoricalFallback === true
      && profile.miniKvShardReadiness.hardeningFile.usedHistoricalFallback
      && profile.miniKvShardReadiness.evidence.releaseVersion === "v145";
    return {
      replayState: ready ? "ready" : "blocked",
      replayedProfileVersion: profile.profileVersion,
      readyForJavaMiniKvShardReadinessEvidenceConsumption: profile.readyForJavaMiniKvShardReadinessEvidenceConsumption,
      javaHardeningUsedHistoricalFallback: profile.javaShardReadiness.hardeningFile.usedHistoricalFallback,
      javaSourceCoreUsedHistoricalFallback: profile.javaShardReadiness.sourceCoreFile?.usedHistoricalFallback === true,
      miniKvUsedHistoricalFallback: profile.miniKvShardReadiness.hardeningFile.usedHistoricalFallback,
      miniKvResolvedPath: profile.miniKvShardReadiness.hardeningFile.resolvedPath,
      miniKvReleaseVersion: profile.miniKvShardReadiness.evidence.releaseVersion,
      checkCount: profile.summary.checkCount,
      passedCheckCount: profile.summary.passedCheckCount,
      productionBlockerCount: profile.summary.productionBlockerCount,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      executionAllowed: false,
    };
  } finally {
    if (previous === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
    } else {
      process.env[FORCE_FALLBACK_ENV] = previous;
    }
  }
}

function createArchiveVerification(
  source: SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference,
  refs: JavaMiniKvShardEvidenceConsumptionArchiveReferences,
  fallback: ForcedHistoricalFallbackReplayReference,
  ready: boolean,
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-shard-readiness-evidence-consumption-archive-verification" as const,
    sourceSpan: "Node v376 Java/mini-kv shard readiness evidence consumption" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-java-mini-kv-shard-evidence-consumption-and-prepare-v378" as const
      : "blocked" as const,
    sourceConsumptionDigest: source.consumptionDigest,
    sourceNodeV375Digest: source.sourceNodeV375Digest,
    forcedHistoricalFallbackReplayReady: fallback.replayState === "ready",
    archiveFileDigests,
  };
  return {
    archiveVerificationDigest: sha256StableJson(record),
    ...record,
    verifiesJsonMarkdownAndSummary: true,
    verifiesScreenshotExplanationAndWalkthrough: true,
    verifiesPlanAndArchiveIndexes: true,
    verifiesForcedHistoricalFallback: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v378",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference,
  refs: JavaMiniKvShardEvidenceConsumptionArchiveReferences,
  archive: ParsedArchiveEvidence,
  fallback: ForcedHistoricalFallbackReplayReference,
  verification: JavaMiniKvShardEvidenceConsumptionArchiveVerificationRecord,
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks {
  const jsonChecks = recordOrNull(valueAt(archive.json, "checks"));
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists && file.byteLength > 0 && isDigest(file.digest)),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid: source.profileVersion
      === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1",
    jsonEvidenceConsumptionReady:
      source.evidenceConsumptionState === "java-mini-kv-shard-readiness-evidence-consumed"
      && source.evidenceConsumptionDecision === "consume-java-v154-and-mini-kv-v145-hardening"
      && source.readyForJavaMiniKvShardReadinessEvidenceConsumption
      && source.readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification,
    jsonSourceNodeV375Ready: source.sourceNodeVersion === "Node v375" && source.sourceNodeV375Ready
      && isDigest(source.sourceNodeV375Digest),
    jsonEvidenceVersionsMatch:
      source.javaVersion === "Java v154"
      && source.javaSourceCoreVersion === "Java v153"
      && source.miniKvReleaseVersion === "v145",
    jsonConsumptionDigestStable:
      isDigest(source.consumptionDigest)
      && isDigest(source.javaHardeningDigest)
      && isDigest(source.javaSourceCoreDigest)
      && isDigest(source.miniKvDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount
      && objectBooleanValues(jsonChecks).every(Boolean),
    summaryMatchesJson:
      valueAt(archive.summary, "profileVersion") === source.profileVersion
      && valueAt(archive.summary, "evidenceConsumptionState") === source.evidenceConsumptionState
      && valueAt(archive.summary, "evidenceConsumptionDecision") === source.evidenceConsumptionDecision
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "javaVersion") === source.javaVersion
      && valueAt(archive.summary, "miniKvReleaseVersion") === source.miniKvReleaseVersion,
    markdownRecordsConsumption:
      archive.markdown.includes("Evidence consumption decision: consume-java-v154-and-mini-kv-v145-hardening")
      && archive.markdown.includes("Java v154")
      && archive.markdown.includes("mini-kv v145"),
    browserSnapshotPresent:
      archive.browserSnapshot.includes("Node v376")
      && archive.browserSnapshot.includes("Ready for Node v377 archive verification: true"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.screenshot.byteLength > 0 && refs.htmlArchive.exists
      && refs.htmlArchive.byteLength > 0,
    explanationRecordsBoundaryAndFallback:
      archive.explanation.includes("v376")
      && archive.explanation.includes("启动 Java: false")
      && archive.explanation.includes("写 Java: false")
      && archive.explanation.includes("historical fixture fallback"),
    codeWalkthroughPresent:
      archive.codeWalkthrough.includes("v376")
      && archive.codeWalkthrough.includes("Java v154")
      && archive.codeWalkthrough.includes("mini-kv v145"),
    sourcePlanPointsToV377AndParallelUpstreams:
      archive.sourcePlan.includes("Node v377")
      && archive.sourcePlan.includes("archive verification")
      && archive.sourcePlan.includes("Java / mini-kv")
      && archive.sourcePlan.includes("推荐并行"),
    planIndexReferencesV376AndV377:
      archive.plansIndex.includes("v376-post-java-mini-kv-shard-readiness-evidence-consumption-roadmap.md")
      && archive.plansIndex.includes("Node v377"),
    archiveIndexReferencesV376: archive.archiveIndex.includes("376: Java v154 + mini-kv v145"),
    routeRecordedInArchive:
      valueAt(archive.json, "evidenceEndpoints", "evidenceConsumptionJson") === SOURCE_NODE_V376_ROUTE,
    forcedHistoricalFallbackReplayReady: fallback.replayState === "ready" && fallback.productionBlockerCount === 0,
    forcedFallbackUsesVersionedMiniKvSnapshot:
      fallback.miniKvUsedHistoricalFallback
      && fallback.miniKvResolvedPath.replace(/\\/g, "/").includes("shard-readiness-v145.json"),
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !config.upstreamActionsEnabled && !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference,
  refs: JavaMiniKvShardEvidenceConsumptionArchiveReferences,
  fallback: ForcedHistoricalFallbackReplayReference,
  checks: JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks,
  productionBlockers: readonly JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[],
  warnings: readonly JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[],
  recommendations: readonly JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[],
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    forcedFallbackCheckCount: fallback.checkCount,
    forcedFallbackPassedCheckCount: fallback.passedCheckCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: JavaMiniKvShardEvidenceConsumptionArchiveVerificationChecks,
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage["source"], string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive-files", "All v376 archive files must exist."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive-json", "v376 JSON evidence must be readable."],
    [checks.jsonEvidenceConsumptionReady, "SOURCE_V376_NOT_READY", "node-v376", "v376 evidence consumption must be ready."],
    [checks.jsonSourceNodeV375Ready, "SOURCE_NODE_V375_NOT_READY", "node-v376", "v376 must preserve ready Node v375 archive verification."],
    [checks.jsonEvidenceVersionsMatch, "SOURCE_EVIDENCE_VERSION_MISMATCH", "node-v376", "v376 must record Java v154, Java v153 source core, and mini-kv v145."],
    [checks.summaryMatchesJson, "SUMMARY_DRIFTED", "archive-json", "v376 summary must match the JSON archive."],
    [checks.markdownRecordsConsumption, "MARKDOWN_INCOMPLETE", "archive-markdown", "v376 Markdown must record the evidence consumption decision."],
    [checks.explanationRecordsBoundaryAndFallback, "EXPLANATION_INCOMPLETE", "archive-docs", "v376 explanation must record boundary and fallback behavior."],
    [checks.codeWalkthroughPresent, "CODE_WALKTHROUGH_MISSING", "archive-docs", "v376 code walkthrough must be present."],
    [checks.forcedHistoricalFallbackReplayReady, "FORCED_FALLBACK_REPLAY_FAILED", "forced-historical-fallback", "Forced historical fallback must replay v376 successfully."],
    [checks.forcedFallbackUsesVersionedMiniKvSnapshot, "MINI_KV_FALLBACK_NOT_VERSIONED", "forced-historical-fallback", "mini-kv fallback must use shard-readiness-v145.json."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v377 must not start or stop sibling services."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference,
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFIES_EVIDENCE_CONSUMPTION_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "archive-verification",
    message:
      `v377 verifies ${source.passedCheckCount}/${source.checkCount} archived v376 checks; shard readiness is still not active sharding.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): JavaMiniKvShardEvidenceConsumptionArchiveVerificationMessage[] {
  return [{
    code: ready ? "PROCEED_TO_V378_OR_WAIT_FOR_COMPLETED_UPSTREAM_EVIDENCE" : "REPAIR_V376_ARCHIVE",
    severity: "recommendation",
    source: "archive-verification",
    message: ready
      ? "Proceed to Node v378 only if there is completed Java/mini-kv evidence to consume; otherwise pause instead of adding another governance link."
      : "Repair v376 archive evidence before moving to v378.",
  }];
}

function archiveFiles(
  refs: JavaMiniKvShardEvidenceConsumptionArchiveReferences,
): JavaMiniKvShardEvidenceConsumptionArchiveFileReference[] {
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

function readTextFile(projectRoot: string, relativePath: string): string {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "") : "";
}

function readJsonFile(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const text = readTextFile(projectRoot, relativePath);
  if (text.length === 0) {
    return null;
  }
  try {
    const parsed = JSON.parse(text);
    return recordOrNull(parsed);
  } catch {
    return null;
  }
}

function evidenceConsumptionState(
  archive: ParsedArchiveEvidence,
): SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference["evidenceConsumptionState"] {
  return valueAt(archive.json, "evidenceConsumptionState") === "java-mini-kv-shard-readiness-evidence-consumed"
    ? "java-mini-kv-shard-readiness-evidence-consumed"
    : "blocked";
}

function evidenceConsumptionDecision(
  archive: ParsedArchiveEvidence,
): SourceNodeV376JavaMiniKvShardEvidenceConsumptionArchiveReference["evidenceConsumptionDecision"] {
  return valueAt(archive.json, "evidenceConsumptionDecision") === "consume-java-v154-and-mini-kv-v145-hardening"
    ? "consume-java-v154-and-mini-kv-v145-hardening"
    : "blocked";
}

function valueAt(source: unknown, ...pathSegments: string[]): unknown {
  let current = source;
  for (const segment of pathSegments) {
    if (current === null || typeof current !== "object" || Array.isArray(current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function recordOrNull(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function objectBooleanValues(value: Record<string, unknown> | null): boolean[] {
  if (value === null) {
    return [];
  }
  return Object.values(value).filter((entry): entry is boolean => typeof entry === "boolean");
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
