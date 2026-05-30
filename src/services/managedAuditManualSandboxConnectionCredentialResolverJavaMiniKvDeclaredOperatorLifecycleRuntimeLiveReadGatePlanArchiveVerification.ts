import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationProfile,
  RuntimeLiveReadGatePlanArchiveReferences,
  RuntimeLiveReadGatePlanArchiveVerificationChecks,
  RuntimeLiveReadGatePlanArchiveVerificationFileReference,
  RuntimeLiveReadGatePlanArchiveVerificationMessage,
  RuntimeLiveReadGatePlanArchiveVerificationRecord,
  RuntimeLiveReadGatePlanArchiveVerificationSummary,
  RuntimeLiveReadGatePlanReplayReference,
  SourceNodeV390RuntimeLiveReadGatePlanReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification";
const SOURCE_NODE_V390_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan";
const ACTIVE_PLAN =
  "docs/plans3/v390-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/390" as const;
const V390_BASENAME = "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-v390";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/395-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-v390.md";
const REQUIRED_RUNTIME_GATE_ARTIFACTS = [
  "operator approval record",
  "concrete loopback port assignment",
  "GET-only smoke command",
  "cleanup proof",
] as const;

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerificationProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV390 = createSourceNodeV390(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV390, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV390, archiveReferences, parsed, replay, draftVerification);
  checks.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV390, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV390, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet"
      : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: ready,
    readyForNodeV392RuntimeExecutionPacket: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v391",
    sourceNodeVersion: "Node v390",
    archiveVerificationOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionPacketPresent: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    operatorApprovalRecordRequired: true,
    concreteLoopbackPortsRequired: true,
    getOnlySmokeCommandRequired: true,
    cleanupProofRequired: true,
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
    sourceNodeV390,
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
      sourceNodeV390Json: SOURCE_NODE_V390_ROUTE,
      sourceNodeV390Markdown: `${SOURCE_NODE_V390_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v392",
    },
    nextActions: ready
      ? [
        "Prepare a separate Node v392 runtime execution packet only after operator approval and concrete loopback ports are provided.",
        "Keep Java and mini-kv in recommended parallel mode until a separate execution packet names service owner, ports, GET-only smoke command, and cleanup owner.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this archive verification.",
      ]
      : [
        "Repair the v390 archive before preparing any runtime execution packet.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): RuntimeLiveReadGatePlanArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V390_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V390_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V390_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V390_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V390_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V390_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V390_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): RuntimeLiveReadGatePlanArchiveVerificationFileReference {
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

function readParsedArchive(projectRoot: string, refs: RuntimeLiveReadGatePlanArchiveReferences): ParsedArchive {
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

function createSourceNodeV390(archive: ParsedArchive): SourceNodeV390RuntimeLiveReadGatePlanReference {
  return {
    sourceVersion: "Node v390",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    planState: stringValue(valueAt(archive.json, "planState")),
    planDecision: stringValue(valueAt(archive.json, "planDecision")),
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan") === true,
    readyForNodeV391ArchiveVerification: valueAt(archive.json, "readyForNodeV391ArchiveVerification") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v390",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    runtimeGatePlanOnly: valueAt(archive.json, "runtimeGatePlanOnly") === true,
    runtimeGateRequiresSeparateApproval: valueAt(archive.json, "runtimeGateRequiresSeparateApproval") === true,
    operatorApprovalRecordRequired: valueAt(archive.json, "operatorApprovalRecordRequired") === true,
    concreteLoopbackPortsRequired: valueAt(archive.json, "concreteLoopbackPortsRequired") === true,
    getOnlySmokeCommandRequired: valueAt(archive.json, "getOnlySmokeCommandRequired") === true,
    cleanupProofRequired: valueAt(archive.json, "cleanupProofRequired") === true,
    runtimeGateApprovalPresent: valueAt(archive.json, "runtimeGateApprovalPresent") === true,
    concreteLoopbackPortsAssigned: valueAt(archive.json, "concreteLoopbackPortsAssigned") === true,
    liveReadGateAllowed: valueAt(archive.json, "liveReadGateAllowed") === true,
    runtimeProbeAllowed: valueAt(archive.json, "runtimeProbeAllowed") === true,
    planDigest: stringValue(valueAt(archive.json, "runtimeGatePlan", "planDigest")),
    sourceNodeV389ArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "runtimeGatePlan", "sourceNodeV389ArchiveVerificationDigest")),
    sourceNodeV388ReplayProfileVersion:
      stringValue(valueAt(archive.json, "runtimeGatePlan", "sourceNodeV388ReplayProfileVersion")),
    requiredRuntimeGateArtifactCount: numberValue(valueAt(archive.json, "summary", "requiredRuntimeGateArtifactCount")),
    declaredOperatorEvidenceSourceCount:
      numberValue(valueAt(archive.json, "summary", "declaredOperatorEvidenceSourceCount")),
    javaDeclaredPortCount: numberValue(valueAt(archive.json, "summary", "javaDeclaredPortCount")),
    miniKvDeclaredPortHandleCount: numberValue(valueAt(archive.json, "summary", "miniKvDeclaredPortHandleCount")),
    javaGetOnlySmokeTargetCount: numberValue(valueAt(archive.json, "summary", "javaGetOnlySmokeTargetCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
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
  };
}

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): RuntimeLiveReadGatePlanReplayReference {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan
    && profile.readyForNodeV391ArchiveVerification
    && !profile.readyForRuntimeLiveReadGate
    && profile.runtimeGatePlanOnly
    && profile.runtimeGateRequiresSeparateApproval
    && !profile.runtimeGateApprovalPresent
    && !profile.concreteLoopbackPortsAssigned
    && !profile.liveReadGateAllowed
    && !profile.runtimeProbeAllowed
    && profile.summary.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACTS.length
    && profile.summary.declaredOperatorEvidenceSourceCount === 2
    && profile.summary.checkCount === profile.summary.passedCheckCount
    && profile.summary.productionBlockerCount === 0
    && !profile.startsJavaService
    && !profile.startsMiniKvService
    && !profile.stopsJavaService
    && !profile.stopsMiniKvService
    && !profile.executionAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    planState: profile.planState,
    planDecision: profile.planDecision,
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan:
      profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan,
    readyForNodeV391ArchiveVerification: profile.readyForNodeV391ArchiveVerification,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    runtimeGatePlanOnly: profile.runtimeGatePlanOnly,
    runtimeGateRequiresSeparateApproval: profile.runtimeGateRequiresSeparateApproval,
    runtimeGateApprovalPresent: profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: profile.concreteLoopbackPortsAssigned,
    liveReadGateAllowed: profile.liveReadGateAllowed,
    runtimeProbeAllowed: profile.runtimeProbeAllowed,
    planDigest: profile.runtimeGatePlan.planDigest,
    sourceNodeV389ArchiveVerificationDigest: profile.runtimeGatePlan.sourceNodeV389ArchiveVerificationDigest,
    sourceNodeV388ReplayProfileVersion: profile.runtimeGatePlan.sourceNodeV388ReplayProfileVersion,
    requiredRuntimeGateArtifactCount: profile.summary.requiredRuntimeGateArtifactCount,
    declaredOperatorEvidenceSourceCount: profile.summary.declaredOperatorEvidenceSourceCount,
    javaDeclaredPortCount: profile.summary.javaDeclaredPortCount,
    miniKvDeclaredPortHandleCount: profile.summary.miniKvDeclaredPortHandleCount,
    javaGetOnlySmokeTargetCount: profile.summary.javaGetOnlySmokeTargetCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createArchiveVerification(
  source: SourceNodeV390RuntimeLiveReadGatePlanReference,
  refs: RuntimeLiveReadGatePlanArchiveReferences,
  replay: RuntimeLiveReadGatePlanReplayReference,
  ready: boolean,
): RuntimeLiveReadGatePlanArchiveVerificationRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification" as const,
    sourceSpan: "Node v390 declared operator lifecycle runtime live-read gate plan" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet" as const
      : "blocked" as const,
    sourcePlanDigest: source.planDigest,
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
    verifiesExecutionPacketStillAbsent: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v392",
  };
}

function createChecks(
  source: SourceNodeV390RuntimeLiveReadGatePlanReference,
  refs: RuntimeLiveReadGatePlanArchiveReferences,
  archive: ParsedArchive,
  replay: RuntimeLiveReadGatePlanReplayReference,
  verification: RuntimeLiveReadGatePlanArchiveVerificationRecord,
): RuntimeLiveReadGatePlanArchiveVerificationChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1",
    jsonPlanReady:
      source.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan
      && source.readyForNodeV391ArchiveVerification,
    jsonSourceNodeV389ArchiveVerified:
      stringValue(valueAt(archive.json, "sourceNodeV389", "archiveVerificationState"))
      === "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified",
    jsonSourceNodeV388ReplayReady:
      stringValue(valueAt(archive.json, "sourceNodeV388Replay", "replayState")) === "ready",
    jsonRuntimeGateClosed:
      !source.readyForRuntimeLiveReadGate && !source.liveReadGateAllowed && !source.runtimeProbeAllowed,
    jsonExecutionPacketNotApproved:
      !source.runtimeGateApprovalPresent && !source.concreteLoopbackPortsAssigned,
    jsonRuntimeGateArtifactsRequired:
      source.runtimeGateRequiresSeparateApproval
      && source.operatorApprovalRecordRequired
      && source.concreteLoopbackPortsRequired
      && source.getOnlySmokeCommandRequired
      && source.cleanupProofRequired
      && source.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACTS.length,
    jsonPlanDigestStable: isDigest(source.planDigest),
    jsonChecksAllPassed: source.checkCount > 0 && source.checkCount === source.passedCheckCount,
    jsonPlanSummaryMatches:
      source.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACTS.length
      && source.declaredOperatorEvidenceSourceCount === 2
      && source.productionBlockerCount === 0
      && source.warningCount === 1
      && source.recommendationCount === 1,
    summaryMatchesJson:
      valueAt(archive.summary, "planState") === source.planState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "runtimeGateApprovalPresent") === false
      && valueAt(archive.summary, "concreteLoopbackPortsAssigned") === false
      && valueAt(archive.summary, "requiredRuntimeGateArtifactCount") === REQUIRED_RUNTIME_GATE_ARTIFACTS.length,
    markdownRecordsRuntimeGatePlan:
      archive.markdown.includes("Plan decision: write-separate-runtime-live-read-gate-plan-after-v389-archive-verification")
      && archive.markdown.includes("Runtime Live Read Gate Plan")
      && archive.markdown.includes("Ready for runtime live-read gate: false"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes("java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready"),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsRuntimeBoundaryAndChecks:
      archive.explanation.includes("readyForRuntimeLiveReadGate: false")
      && archive.explanation.includes("runtimeGateApprovalPresent=false")
      && archive.explanation.includes("36/36"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("v390")
      && archive.codeWalkthrough.includes("RuntimeLiveReadGatePlan"),
    sourcePlanPointsToV391ArchiveVerification:
      archive.sourcePlan.includes("Node v391 should archive and verify this v390 plan"),
    planIndexReferencesV390AndV391:
      archive.plansIndex.includes("v390-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-roadmap.md")
      && archive.plansIndex.includes("v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md"),
    archiveIndexReferencesV390:
      archive.archiveIndex.includes("390: Java / mini-kv declared operator lifecycle runtime live-read gate plan"),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "runtimeLiveReadGatePlanJson"))
      === SOURCE_NODE_V390_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayKeepsRuntimeGateClosed:
      !replay.readyForRuntimeLiveReadGate && !replay.liveReadGateAllowed && !replay.runtimeProbeAllowed
      && replay.runtimeGateRequiresSeparateApproval,
    replayKeepsExecutionPacketUnapproved:
      !replay.runtimeGateApprovalPresent && !replay.concreteLoopbackPortsAssigned,
    replayKeepsPlanArtifactsRequired:
      replay.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACTS.length
      && replay.javaDeclaredPortCount === 1
      && replay.miniKvDeclaredPortHandleCount === 1
      && replay.javaGetOnlySmokeTargetCount === 4,
    replayPreservesSourceEvidence:
      replay.declaredOperatorEvidenceSourceCount === 2
      && isDigest(replay.sourceNodeV389ArchiveVerificationDigest)
      && replay.sourceNodeV388ReplayProfileVersion
        === "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake.v1",
    archiveVerificationDoesNotRerunLiveRead: !verification.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !verification.startsUpstreamServices && !verification.stopsUpstreamServices,
    noUpstreamMutation: !verification.writesUpstreamState,
    noManagedAuditConnection: !verification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !verification.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    archiveVerificationDigestStable: isDigest(verification.archiveVerificationDigest),
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification: false,
  };
}

function createSummary(
  source: SourceNodeV390RuntimeLiveReadGatePlanReference,
  refs: RuntimeLiveReadGatePlanArchiveReferences,
  replay: RuntimeLiveReadGatePlanReplayReference,
  checks: RuntimeLiveReadGatePlanArchiveVerificationChecks,
  productionBlockers: readonly RuntimeLiveReadGatePlanArchiveVerificationMessage[],
  warnings: readonly RuntimeLiveReadGatePlanArchiveVerificationMessage[],
  recommendations: readonly RuntimeLiveReadGatePlanArchiveVerificationMessage[],
): RuntimeLiveReadGatePlanArchiveVerificationSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    archiveFileCount: archiveFiles(refs).length,
    presentArchiveFileCount: archiveFiles(refs).filter((file) => file.exists).length,
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    requiredRuntimeGateArtifactCount: source.requiredRuntimeGateArtifactCount,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeLiveReadGatePlanArchiveVerificationChecks,
): RuntimeLiveReadGatePlanArchiveVerificationMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v390 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v390 JSON archive must be readable."],
    [checks.jsonPlanReady, "SOURCE_V390_NOT_READY", "source-node-v390", "Node v390 runtime gate plan must be ready for archive verification."],
    [checks.jsonSourceNodeV389ArchiveVerified, "SOURCE_NODE_V389_ARCHIVE_NOT_VERIFIED", "source-node-v389", "Node v389 archive verification must remain verified."],
    [checks.jsonSourceNodeV388ReplayReady, "SOURCE_NODE_V388_REPLAY_NOT_READY", "source-node-v388", "Node v388 replay must remain ready in the v390 archive."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v390 archive must keep runtime live-read gate closed."],
    [checks.jsonExecutionPacketNotApproved, "EXECUTION_PACKET_ALREADY_APPROVED", "runtime-boundary", "v390 must not contain approval or concrete ports."],
    [checks.jsonRuntimeGateArtifactsRequired, "RUNTIME_GATE_ARTIFACTS_MISSING", "source-node-v390", "v390 must require approval, ports, GET-only smoke, and cleanup proof."],
    [checks.jsonChecksAllPassed, "SOURCE_V390_CHECKS_NOT_PASSED", "source-node-v390", "v390 checks must all pass."],
    [checks.summaryMatchesJson, "SUMMARY_JSON_MISMATCH", "archive", "v390 summary archive must match the JSON evidence."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v390 must replay from frozen evidence."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsExecutionPacketUnapproved, "REPLAY_APPROVED_EXECUTION_PACKET", "frozen-evidence-replay", "Replay must not approve runtime execution."],
    [checks.replayKeepsPlanArtifactsRequired, "REPLAY_RUNTIME_ARTIFACTS_CHANGED", "frozen-evidence-replay", "Replay must preserve runtime gate artifact requirements."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v391 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v391 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeLiveReadGatePlanArchiveVerificationMessage[] {
  return [{
    code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME_EXECUTION",
    severity: "warning",
    source: "archive-verification",
    message: "v391 verifies archived v390 runtime gate planning; it still does not start Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): RuntimeLiveReadGatePlanArchiveVerificationMessage[] {
  return [{
    code: ready ? "PREPARE_SEPARATE_RUNTIME_EXECUTION_PACKET" : "REPAIR_V390_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v391",
    message: ready
      ? "Prepare a separate Node v392 runtime execution packet only after operator approval, concrete ports, GET-only smoke command, and cleanup proof are available."
      : "Repair the v390 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: RuntimeLiveReadGatePlanArchiveReferences,
): RuntimeLiveReadGatePlanArchiveVerificationFileReference[] {
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
