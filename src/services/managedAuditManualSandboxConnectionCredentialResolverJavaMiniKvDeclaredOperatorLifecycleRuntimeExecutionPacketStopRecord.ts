import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordProfile,
  RuntimeExecutionPacketStopRecord,
  RuntimeExecutionPacketStopRecordArchiveReferences,
  RuntimeExecutionPacketStopRecordChecks,
  RuntimeExecutionPacketStopRecordFileReference,
  RuntimeExecutionPacketStopRecordMessage,
  RuntimeExecutionPacketStopRecordReplayReference,
  RuntimeExecutionPacketStopRecordSummary,
  RuntimeExecutionStopReason,
  SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record";
const SOURCE_NODE_V391_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md";
const ARCHIVE_ROOT = "e/391" as const;
const V391_BASENAME =
  "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-v391";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/396-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-v391.md";
const REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT = 4;
const STOP_REASONS: RuntimeExecutionStopReason[] = [
  {
    code: "OPERATOR_APPROVAL_RECORD_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "A signed operator approval record was not supplied for runtime execution.",
  },
  {
    code: "CONCRETE_LOOPBACK_PORTS_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "Concrete Java and mini-kv loopback ports were not assigned.",
  },
  {
    code: "GET_ONLY_SMOKE_COMMAND_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "A GET-only smoke command was not supplied.",
  },
  {
    code: "CLEANUP_PROOF_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "Cleanup proof and stop ownership were not supplied.",
  },
  {
    code: "SERVICE_OWNER_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "Runtime service owner information was not supplied.",
  },
  {
    code: "PROCESS_CLEANUP_RULES_MISSING",
    source: "runtime-execution-packet",
    required: true,
    present: false,
    message: "Process cleanup rules were not supplied.",
  },
];

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

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV391 = createSourceNodeV391(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftPacket = createRuntimeExecutionPacket(sourceNodeV391, false);
  const checks = createChecks(sourceNodeV391, archiveReferences, parsed, replay, draftPacket);
  checks.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord;
  const runtimeExecutionPacket = createRuntimeExecutionPacket(sourceNodeV391, ready);
  checks.packetDigestStable = isDigest(runtimeExecutionPacket.packetDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV391, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    stopRecordState: ready ? "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped" : "blocked",
    stopRecordDecision: ready ? "stop-before-runtime-execution-missing-operator-artifacts" : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: ready,
    readyForNodeV393ArchiveVerification: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v392",
    sourceNodeVersion: "Node v391",
    stopRecordOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    operatorApprovalRecordRequired: true,
    concreteLoopbackPortsRequired: true,
    getOnlySmokeCommandRequired: true,
    cleanupProofRequired: true,
    serviceOwnerRequired: true,
    processCleanupRulesRequired: true,
    operatorApprovalRecordPresent: false,
    concreteLoopbackPortsPresent: false,
    getOnlySmokeCommandPresent: false,
    cleanupProofPresent: false,
    serviceOwnerPresent: false,
    processCleanupRulesPresent: false,
    executionAttempted: false,
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
    sourceNodeV391,
    replay,
    runtimeExecutionPacket,
    checks,
    summary,
    stopReasons: STOP_REASONS,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeExecutionPacketStopRecordJson: ROUTE_PATH,
      runtimeExecutionPacketStopRecordMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV391Json: SOURCE_NODE_V391_ROUTE,
      sourceNodeV391Markdown: `${SOURCE_NODE_V391_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v393",
    },
    nextActions: ready
      ? [
        "Archive and verify this Node v392 stop record before considering any renewed runtime packet.",
        "Collect operator approval, concrete loopback ports, GET-only smoke command, cleanup proof, service owner, and process cleanup rules before retrying execution.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this stop record.",
      ]
      : [
        "Repair the v391 archive verification before writing any runtime execution packet.",
        "Do not start Java or mini-kv from this stop record.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): RuntimeExecutionPacketStopRecordArchiveReferences {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V391_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V391_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V391_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V391_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V391_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V391_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V391_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(projectRoot: string, ...segments: string[]): RuntimeExecutionPacketStopRecordFileReference {
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

function readParsedArchive(projectRoot: string, refs: RuntimeExecutionPacketStopRecordArchiveReferences): ParsedArchive {
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

function createSourceNodeV391(
  archive: ParsedArchive,
): SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference {
  return {
    sourceVersion: "Node v391",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(archive.json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(archive.json, "archiveVerificationDecision")),
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification") === true,
    readyForNodeV392RuntimeExecutionPacket:
      valueAt(archive.json, "readyForNodeV392RuntimeExecutionPacket") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v391",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    archiveVerificationOnly: valueAt(archive.json, "archiveVerificationOnly") === true,
    runtimeExecutionPacketPresent: valueAt(archive.json, "runtimeExecutionPacketPresent") === true,
    runtimeGateApprovalPresent: valueAt(archive.json, "runtimeGateApprovalPresent") === true,
    concreteLoopbackPortsAssigned: valueAt(archive.json, "concreteLoopbackPortsAssigned") === true,
    operatorApprovalRecordRequired: valueAt(archive.json, "operatorApprovalRecordRequired") === true,
    concreteLoopbackPortsRequired: valueAt(archive.json, "concreteLoopbackPortsRequired") === true,
    getOnlySmokeCommandRequired: valueAt(archive.json, "getOnlySmokeCommandRequired") === true,
    cleanupProofRequired: valueAt(archive.json, "cleanupProofRequired") === true,
    archiveVerificationDigest: stringValue(valueAt(archive.json, "archiveVerification", "archiveVerificationDigest")),
    sourcePlanDigest: stringValue(valueAt(archive.json, "archiveVerification", "sourcePlanDigest")),
    archiveFileCount: numberValue(valueAt(archive.json, "summary", "archiveFileCount")),
    presentArchiveFileCount: numberValue(valueAt(archive.json, "summary", "presentArchiveFileCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(archive.json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(archive.json, "summary", "replayPassedCheckCount")),
    requiredRuntimeGateArtifactCount: numberValue(valueAt(archive.json, "summary", "requiredRuntimeGateArtifactCount")),
    declaredOperatorEvidenceSourceCount:
      numberValue(valueAt(archive.json, "summary", "declaredOperatorEvidenceSourceCount")),
    checkCount: numberValue(valueAt(archive.json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(archive.json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(archive.json, "summary", "productionBlockerCount")),
    warningCount: numberValue(valueAt(archive.json, "summary", "warningCount")),
    recommendationCount: numberValue(valueAt(archive.json, "summary", "recommendationCount")),
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function replayFromFrozenEvidence(config: AppConfig, projectRoot: string): RuntimeExecutionPacketStopRecordReplayReference {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification
    && profile.readyForNodeV392RuntimeExecutionPacket
    && !profile.readyForRuntimeLiveReadGate
    && profile.archiveVerificationOnly
    && !profile.runtimeExecutionPacketPresent
    && !profile.runtimeGateApprovalPresent
    && !profile.concreteLoopbackPortsAssigned
    && profile.summary.checkCount === profile.summary.passedCheckCount
    && profile.summary.sourceCheckCount === profile.summary.sourcePassedCheckCount
    && profile.summary.replayCheckCount === profile.summary.replayPassedCheckCount
    && profile.summary.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT
    && profile.summary.declaredOperatorEvidenceSourceCount === 2
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
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification:
      profile.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification,
    readyForNodeV392RuntimeExecutionPacket: profile.readyForNodeV392RuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    archiveVerificationOnly: profile.archiveVerificationOnly,
    runtimeExecutionPacketPresent: profile.runtimeExecutionPacketPresent,
    runtimeGateApprovalPresent: profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: profile.concreteLoopbackPortsAssigned,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourcePlanDigest: profile.archiveVerification.sourcePlanDigest,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    requiredRuntimeGateArtifactCount: profile.summary.requiredRuntimeGateArtifactCount,
    declaredOperatorEvidenceSourceCount: profile.summary.declaredOperatorEvidenceSourceCount,
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

function createRuntimeExecutionPacket(
  source: SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference,
  ready: boolean,
): RuntimeExecutionPacketStopRecord {
  const record = {
    packetMode: "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record" as const,
    sourceSpan: "Node v391 + Node v390 + Node v389 + Node v388 + Java v161 + mini-kv v152" as const,
    sourceNodeV391ArchiveVerificationDigest: source.archiveVerificationDigest,
    sourceNodeV390PlanDigest: source.sourcePlanDigest,
    packetDecision: ready ? "stop-before-runtime-execution-missing-operator-artifacts" as const : "blocked" as const,
    missingArtifactCount: STOP_REASONS.length,
    missingArtifacts: STOP_REASONS,
    operatorApprovalRecordPresent: false as const,
    concreteLoopbackPortsPresent: false as const,
    getOnlySmokeCommandPresent: false as const,
    cleanupProofPresent: false as const,
    serviceOwnerPresent: false as const,
    processCleanupRulesPresent: false as const,
    runtimeExecutionPacketPresent: false as const,
    runtimeExecutionPacketExecutable: false as const,
    executionAttempted: false as const,
    liveReadGateAllowed: false as const,
    runtimeProbeAllowed: false as const,
    startsUpstreamServices: false as const,
    stopsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    activeShardPrototypeEnabled: false as const,
    nextNodeVersionSuggested: "Node v393" as const,
  };
  return {
    packetDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  source: SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference,
  refs: RuntimeExecutionPacketStopRecordArchiveReferences,
  archive: ParsedArchive,
  replay: RuntimeExecutionPacketStopRecordReplayReference,
  packet: RuntimeExecutionPacketStopRecord,
): RuntimeExecutionPacketStopRecordChecks {
  return {
    sourceArchiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    sourceJsonReadable: archive.json !== null,
    sourceProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification.v1",
    sourceArchiveVerificationReady:
      source.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlanArchiveVerification
      && source.archiveVerificationState
        === "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified",
    sourceNodeV390PlanReady: source.readyForNodeV392RuntimeExecutionPacket && source.sourceNodeVersion === "Node v390",
    sourceRuntimeGateClosed: !source.readyForRuntimeLiveReadGate,
    sourceExecutionPacketAbsent:
      !source.runtimeExecutionPacketPresent
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned,
    sourceChecksAllPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    sourceArchiveDigestStable: isDigest(source.archiveVerificationDigest) && isDigest(source.sourcePlanDigest),
    sourceSummaryMatchesJson:
      valueAt(archive.summary, "archiveVerificationState") === source.archiveVerificationState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "runtimeExecutionPacketPresent") === false
      && valueAt(archive.summary, "runtimeGateApprovalPresent") === false
      && valueAt(archive.summary, "concreteLoopbackPortsAssigned") === false,
    sourceMarkdownRecordsArchiveVerification:
      archive.markdown.includes(
        "Archive verification decision: archive-runtime-live-read-gate-plan-and-prepare-v392-runtime-execution-packet",
      )
      && archive.markdown.includes("Ready for Node v392 runtime execution packet: true")
      && archive.markdown.includes("Ready for runtime live-read gate: false"),
    sourceBrowserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes(
        "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verified",
      ),
    sourceScreenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    sourceExplanationRecordsRuntimeBoundary:
      archive.explanation.includes("readyForRuntimeLiveReadGate=false")
      && archive.explanation.includes("runtimeExecutionPacketPresent=false")
      && archive.explanation.includes("38/38"),
    sourceCodeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("v391")
      && archive.codeWalkthrough.includes("Node v392"),
    sourcePlanPointsToV392RuntimeExecutionPacket:
      archive.sourcePlan.includes("Node v392 may prepare a separate runtime execution packet"),
    planIndexReferencesV391AndV392:
      archive.plansIndex.includes(
        "v391-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-archive-verification-roadmap.md",
      )
      && archive.plansIndex.includes(
        "v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md",
      ),
    archiveIndexReferencesV391:
      archive.archiveIndex.includes(
        "391: Java / mini-kv declared operator lifecycle runtime live-read gate plan archive verification",
      ),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "archiveVerificationJson")) === SOURCE_NODE_V391_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayKeepsRuntimeGateClosed: !replay.readyForRuntimeLiveReadGate,
    replayKeepsExecutionPacketAbsent:
      !replay.runtimeExecutionPacketPresent
      && !replay.runtimeGateApprovalPresent
      && !replay.concreteLoopbackPortsAssigned,
    replayPreservesPlanArtifactCounts:
      replay.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT
      && replay.declaredOperatorEvidenceSourceCount === 2,
    replayPreservesSourceCheckCounts:
      replay.checkCount === replay.passedCheckCount
      && replay.sourceCheckCount === replay.sourcePassedCheckCount
      && replay.replayCheckCount === replay.replayPassedCheckCount,
    operatorApprovalStillMissing: !packet.operatorApprovalRecordPresent,
    concreteLoopbackPortsStillMissing: !packet.concreteLoopbackPortsPresent,
    getOnlySmokeCommandStillMissing: !packet.getOnlySmokeCommandPresent,
    cleanupProofStillMissing: !packet.cleanupProofPresent,
    serviceOwnerStillMissing: !packet.serviceOwnerPresent,
    processCleanupRulesStillMissing: !packet.processCleanupRulesPresent,
    stopRecordDoesNotApproveRuntime:
      !packet.runtimeExecutionPacketPresent
      && !packet.runtimeExecutionPacketExecutable
      && !packet.liveReadGateAllowed
      && !packet.runtimeProbeAllowed,
    executionAttemptSkipped: !packet.executionAttempted,
    noAutomaticUpstreamStartStop: !packet.startsUpstreamServices && !packet.stopsUpstreamServices,
    noUpstreamMutation: !packet.writesUpstreamState,
    noManagedAuditConnection: !packet.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !packet.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    packetDigestStable: isDigest(packet.packetDigest),
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord: false,
  };
}

function createSummary(
  source: SourceNodeV391RuntimeLiveReadGatePlanArchiveVerificationReference,
  refs: RuntimeExecutionPacketStopRecordArchiveReferences,
  replay: RuntimeExecutionPacketStopRecordReplayReference,
  checks: RuntimeExecutionPacketStopRecordChecks,
  productionBlockers: readonly RuntimeExecutionPacketStopRecordMessage[],
  warnings: readonly RuntimeExecutionPacketStopRecordMessage[],
  recommendations: readonly RuntimeExecutionPacketStopRecordMessage[],
): RuntimeExecutionPacketStopRecordSummary {
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
    requiredRuntimeExecutionArtifactCount: STOP_REASONS.length,
    missingRuntimeExecutionArtifactCount: STOP_REASONS.length,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionPacketStopRecordChecks,
): RuntimeExecutionPacketStopRecordMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceArchiveFilesPresent, "SOURCE_ARCHIVE_FILES_MISSING", "source-node-v391", "All v391 archive files must be present."],
    [checks.sourceJsonReadable, "SOURCE_JSON_UNREADABLE", "source-node-v391", "v391 JSON archive must be readable."],
    [checks.sourceArchiveVerificationReady, "SOURCE_V391_NOT_READY", "source-node-v391", "Node v391 archive verification must be ready."],
    [checks.sourceNodeV390PlanReady, "SOURCE_V390_PLAN_NOT_READY", "source-node-v390", "Node v390 plan must be ready through v391."],
    [checks.sourceRuntimeGateClosed, "SOURCE_RUNTIME_GATE_OPENED", "runtime-boundary", "v391 must keep runtime live-read gate closed."],
    [checks.sourceExecutionPacketAbsent, "SOURCE_EXECUTION_PACKET_PRESENT", "runtime-boundary", "v391 must not already contain an execution packet."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_PASSED", "source-node-v391", "v391 checks must all pass."],
    [checks.sourceSummaryMatchesJson, "SOURCE_SUMMARY_JSON_MISMATCH", "archive", "v391 summary archive must match the JSON evidence."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v391 must replay from frozen evidence."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsExecutionPacketAbsent, "REPLAY_EXECUTION_PACKET_PRESENT", "frozen-evidence-replay", "Replay must not approve runtime execution."],
    [checks.stopRecordDoesNotApproveRuntime, "STOP_RECORD_APPROVES_RUNTIME", "runtime-boundary", "The stop record must not approve runtime execution."],
    [checks.executionAttemptSkipped, "EXECUTION_ATTEMPTED", "runtime-boundary", "v392 must skip runtime execution."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v392 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v392 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeExecutionPacketStopRecordMessage[] {
  return [{
    code: "RUNTIME_EXECUTION_PACKET_STOPPED_BEFORE_RUNTIME",
    severity: "warning",
    source: "node-v392",
    message: "v392 writes an explicit stop record because runtime approval artifacts are absent.",
  }];
}

function collectRecommendations(ready: boolean): RuntimeExecutionPacketStopRecordMessage[] {
  return [{
    code: ready ? "ARCHIVE_V392_STOP_RECORD" : "REPAIR_V391_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v392",
    message: ready
      ? "Archive and verify the v392 stop record before any renewed runtime execution packet attempt."
      : "Repair v391 archive verification before moving forward.",
  }];
}

function archiveFiles(
  refs: RuntimeExecutionPacketStopRecordArchiveReferences,
): RuntimeExecutionPacketStopRecordFileReference[] {
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
