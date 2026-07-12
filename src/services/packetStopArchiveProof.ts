import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.js";
import type {
  PacketStopArchiveProofProfile,
  PacketStopArchiveRefs,
  PacketStopArchiveReplay,
  PacketStopArchiveChecks,
  PacketStopArchiveFileRef,
  PacketStopArchiveMessage,
  PacketStopArchiveRecord,
  PacketStopArchiveSummary,
  PacketStopArchiveSource,
} from "./packetStopArchiveProofTypes.js";

export {
  renderPacketStopArchiveProofMarkdown,
} from "./packetStopArchiveProofRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification";
const SOURCE_NODE_V392_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record";
const ACTIVE_PLAN =
  "docs/plans3/v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v393-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/392" as const;
const V392_BASENAME =
  "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-v392";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/r0000/397-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-v392.md";
const STOP_REASON_CODES = [
  "OPERATOR_APPROVAL_RECORD_MISSING",
  "CONCRETE_LOOPBACK_PORTS_MISSING",
  "GET_ONLY_SMOKE_COMMAND_MISSING",
  "CLEANUP_PROOF_MISSING",
  "SERVICE_OWNER_MISSING",
  "PROCESS_CLEANUP_RULES_MISSING",
] as const;
const REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT = 4;
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = STOP_REASON_CODES.length;

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

export function loadPacketStopArchiveProof(
  input: { config: AppConfig; archiveRoot?: string },
): PacketStopArchiveProofProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveReferences(projectRoot);
  const parsed = readParsedArchive(projectRoot, archiveReferences);
  const sourceNodeV392 = createSourceNodeV392(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV392, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV392, archiveReferences, parsed, replay, draftVerification);
  checks.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV392, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV392, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution packet stop record archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed"
      : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: ready,
    readyForNodeV394RuntimeExecutionArtifactIntake: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v393",
    sourceNodeVersion: "Node v392",
    archiveVerificationOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
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
    sourceNodeV392,
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
      sourceNodeV392Json: SOURCE_NODE_V392_ROUTE,
      sourceNodeV392Markdown: `${SOURCE_NODE_V392_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v394",
    },
    nextActions: ready
      ? [
        "Collect all six runtime execution artifacts before any renewed runtime packet attempt.",
        "Use a future artifact intake only for concrete operator approval, ports, smoke command, cleanup proof, service owner, and process cleanup rules.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this archive verification.",
      ]
      : [
        "Repair the v392 stop record archive before moving forward.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createArchiveReferences(projectRoot: string): PacketStopArchiveRefs {
  return {
    archiveRoot: ARCHIVE_ROOT,
    jsonEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V392_BASENAME}-http.json`),
    markdownEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V392_BASENAME}-http.md`),
    summaryEvidence: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V392_BASENAME}-summary.json`),
    browserSnapshot: fileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V392_BASENAME}-browser-snapshot.md`),
    htmlArchive: fileReference(projectRoot, ARCHIVE_ROOT, `${V392_BASENAME}.html`),
    screenshot: fileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V392_BASENAME}.png`),
    explanation: fileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V392_BASENAME}.md`),
    codeWalkthrough: fileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: fileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: fileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: fileReference(projectRoot, "e", "README.md"),
  };
}

function fileReference(
  projectRoot: string,
  ...segments: string[]
): PacketStopArchiveFileRef {
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
  refs: PacketStopArchiveRefs,
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

function createSourceNodeV392(archive: ParsedArchive): PacketStopArchiveSource {
  return {
    sourceVersion: "Node v392",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    stopRecordState: stringValue(valueAt(archive.json, "stopRecordState")),
    stopRecordDecision: stringValue(valueAt(archive.json, "stopRecordDecision")),
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord") === true,
    readyForNodeV393ArchiveVerification: valueAt(archive.json, "readyForNodeV393ArchiveVerification") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v392",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    stopRecordOnly: valueAt(archive.json, "stopRecordOnly") === true,
    runtimeExecutionPacketPresent: valueAt(archive.json, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: valueAt(archive.json, "runtimeExecutionPacketExecutable") === true,
    runtimeGateApprovalPresent: valueAt(archive.json, "runtimeGateApprovalPresent") === true,
    concreteLoopbackPortsAssigned: valueAt(archive.json, "concreteLoopbackPortsAssigned") === true,
    operatorApprovalRecordPresent: valueAt(archive.json, "operatorApprovalRecordPresent") === true,
    concreteLoopbackPortsPresent: valueAt(archive.json, "concreteLoopbackPortsPresent") === true,
    getOnlySmokeCommandPresent: valueAt(archive.json, "getOnlySmokeCommandPresent") === true,
    cleanupProofPresent: valueAt(archive.json, "cleanupProofPresent") === true,
    serviceOwnerPresent: valueAt(archive.json, "serviceOwnerPresent") === true,
    processCleanupRulesPresent: valueAt(archive.json, "processCleanupRulesPresent") === true,
    executionAttempted: valueAt(archive.json, "executionAttempted") === true,
    packetDigest: stringValue(valueAt(archive.json, "runtimeExecutionPacket", "packetDigest")),
    sourceNodeV391ArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "runtimeExecutionPacket", "sourceNodeV391ArchiveVerificationDigest")),
    sourceNodeV390PlanDigest: stringValue(valueAt(archive.json, "runtimeExecutionPacket", "sourceNodeV390PlanDigest")),
    missingArtifactCount: numberValue(valueAt(archive.json, "runtimeExecutionPacket", "missingArtifactCount")),
    stopReasonCodes: arrayOfString(valueAt(archive.json, "stopReasons")).length > 0
      ? arrayOfString(valueAt(archive.json, "stopReasons")).map((reason) => stringValue(valueAt(reason, "code")))
      : [],
    archiveFileCount: numberValue(valueAt(archive.json, "summary", "archiveFileCount")),
    presentArchiveFileCount: numberValue(valueAt(archive.json, "summary", "presentArchiveFileCount")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(archive.json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(archive.json, "summary", "replayPassedCheckCount")),
    requiredRuntimeGateArtifactCount: numberValue(valueAt(archive.json, "summary", "requiredRuntimeGateArtifactCount")),
    requiredRuntimeExecutionArtifactCount:
      numberValue(valueAt(archive.json, "summary", "requiredRuntimeExecutionArtifactCount")),
    missingRuntimeExecutionArtifactCount:
      numberValue(valueAt(archive.json, "summary", "missingRuntimeExecutionArtifactCount")),
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

function replayFromFrozenEvidence(
  config: AppConfig,
  projectRoot: string,
): PacketStopArchiveReplay {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord
    && profile.readyForNodeV393ArchiveVerification
    && !profile.readyForRuntimeLiveReadGate
    && profile.stopRecordOnly
    && !profile.runtimeExecutionPacketPresent
    && !profile.runtimeExecutionPacketExecutable
    && !profile.runtimeGateApprovalPresent
    && !profile.concreteLoopbackPortsAssigned
    && !profile.executionAttempted
    && profile.summary.checkCount === profile.summary.passedCheckCount
    && profile.summary.sourceCheckCount === profile.summary.sourcePassedCheckCount
    && profile.summary.replayCheckCount === profile.summary.replayPassedCheckCount
    && profile.summary.requiredRuntimeGateArtifactCount === REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT
    && profile.summary.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
    && profile.summary.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
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
    stopRecordState: profile.stopRecordState,
    stopRecordDecision: profile.stopRecordDecision,
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord:
      profile.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord,
    readyForNodeV393ArchiveVerification: profile.readyForNodeV393ArchiveVerification,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    stopRecordOnly: profile.stopRecordOnly,
    runtimeExecutionPacketPresent: profile.runtimeExecutionPacketPresent,
    runtimeExecutionPacketExecutable: profile.runtimeExecutionPacketExecutable,
    runtimeGateApprovalPresent: profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: profile.concreteLoopbackPortsAssigned,
    executionAttempted: profile.executionAttempted,
    packetDigest: profile.runtimeExecutionPacket.packetDigest,
    sourceNodeV391ArchiveVerificationDigest:
      profile.runtimeExecutionPacket.sourceNodeV391ArchiveVerificationDigest,
    sourceNodeV390PlanDigest: profile.runtimeExecutionPacket.sourceNodeV390PlanDigest,
    missingArtifactCount: profile.runtimeExecutionPacket.missingArtifactCount,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    requiredRuntimeGateArtifactCount: profile.summary.requiredRuntimeGateArtifactCount,
    requiredRuntimeExecutionArtifactCount: profile.summary.requiredRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: profile.summary.missingRuntimeExecutionArtifactCount,
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

function createArchiveVerification(
  source: PacketStopArchiveSource,
  refs: PacketStopArchiveRefs,
  replay: PacketStopArchiveReplay,
  ready: boolean,
): PacketStopArchiveRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode:
      "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification" as const,
    sourceSpan: "Node v392 runtime execution packet stop record" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-runtime-execution-packet-stop-record-and-keep-runtime-gate-closed" as const
      : "blocked" as const,
    sourcePacketDigest: source.packetDigest,
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
    verifiesExecutionPacketStillStopped: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v394",
  };
}

function createChecks(
  source: PacketStopArchiveSource,
  refs: PacketStopArchiveRefs,
  archive: ParsedArchive,
  replay: PacketStopArchiveReplay,
  verification: PacketStopArchiveRecord,
): PacketStopArchiveChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record.v1",
    jsonStopRecordReady:
      source.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord
      && source.stopRecordState === "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped",
    jsonReadyForNodeV393ArchiveVerification: source.readyForNodeV393ArchiveVerification,
    jsonRuntimeGateClosed: !source.readyForRuntimeLiveReadGate,
    jsonExecutionPacketStopped:
      source.stopRecordOnly
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned
      && !source.executionAttempted,
    jsonMissingArtifactsRecorded:
      source.missingArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    jsonStopReasonCodesStable: includesAll(source.stopReasonCodes, STOP_REASON_CODES),
    jsonPacketDigestStable:
      isDigest(source.packetDigest)
      && isDigest(source.sourceNodeV391ArchiveVerificationDigest)
      && isDigest(source.sourceNodeV390PlanDigest),
    jsonChecksAllPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    summaryMatchesJson:
      valueAt(archive.summary, "stopRecordState") === source.stopRecordState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "runtimeExecutionPacketExecutable") === false
      && valueAt(archive.summary, "missingRuntimeExecutionArtifactCount")
        === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    markdownRecordsStopRecord:
      archive.markdown.includes("Stop record decision: stop-before-runtime-execution-missing-operator-artifacts")
      && archive.markdown.includes("Runtime Execution Packet Stop Record")
      && archive.markdown.includes("runtimeExecutionPacketExecutable: false"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes(
        "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stopped",
      ),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsStopBoundaryAndChecks:
      archive.explanation.includes("readyForRuntimeLiveReadGate: false")
      && archive.explanation.includes("runtimeExecutionPacketExecutable=false")
      && archive.explanation.includes("42/42"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("v392")
      && archive.codeWalkthrough.includes("runtimeExecutionPacketPresent=false"),
    sourcePlanPointsToV393ArchiveVerification:
      archive.sourcePlan.includes("Node v393 should archive and verify this v392 stop record"),
    planIndexReferencesV392AndV393:
      archive.plansIndex.includes(
        "v392-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-roadmap.md",
      )
      && archive.plansIndex.includes(
        "v393-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-roadmap.md",
      ),
    archiveIndexReferencesV392:
      archive.archiveIndex.includes(
        "392: Java / mini-kv declared operator lifecycle runtime execution packet stop record",
      ),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "runtimeExecutionPacketStopRecordJson"))
      === SOURCE_NODE_V392_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayKeepsRuntimeGateClosed: !replay.readyForRuntimeLiveReadGate,
    replayKeepsExecutionPacketStopped:
      !replay.runtimeExecutionPacketPresent
      && !replay.runtimeExecutionPacketExecutable
      && !replay.runtimeGateApprovalPresent
      && !replay.concreteLoopbackPortsAssigned
      && !replay.executionAttempted,
    replayPreservesMissingArtifacts:
      replay.missingArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && replay.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && replay.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    replayPreservesSourceCheckCounts:
      replay.checkCount === replay.passedCheckCount
      && replay.sourceCheckCount === replay.sourcePassedCheckCount
      && replay.replayCheckCount === replay.replayPassedCheckCount,
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
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification: false,
  };
}

function createSummary(
  source: PacketStopArchiveSource,
  refs: PacketStopArchiveRefs,
  replay: PacketStopArchiveReplay,
  checks: PacketStopArchiveChecks,
  productionBlockers: readonly PacketStopArchiveMessage[],
  warnings: readonly PacketStopArchiveMessage[],
  recommendations: readonly PacketStopArchiveMessage[],
): PacketStopArchiveSummary {
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
    requiredRuntimeExecutionArtifactCount: source.requiredRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: source.missingRuntimeExecutionArtifactCount,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: PacketStopArchiveChecks,
): PacketStopArchiveMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v392 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v392 JSON archive must be readable."],
    [checks.jsonStopRecordReady, "SOURCE_V392_NOT_READY", "source-node-v392", "Node v392 stop record must be ready for archive verification."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v392 must keep runtime live-read gate closed."],
    [checks.jsonExecutionPacketStopped, "EXECUTION_PACKET_NOT_STOPPED", "runtime-boundary", "v392 must record a stopped execution packet."],
    [checks.jsonMissingArtifactsRecorded, "MISSING_ARTIFACTS_NOT_RECORDED", "source-node-v392", "v392 must record all six missing execution artifacts."],
    [checks.jsonChecksAllPassed, "SOURCE_V392_CHECKS_NOT_PASSED", "source-node-v392", "v392 checks must all pass."],
    [checks.summaryMatchesJson, "SUMMARY_JSON_MISMATCH", "archive", "v392 summary archive must match the JSON evidence."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v392 must replay from frozen evidence."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsExecutionPacketStopped, "REPLAY_EXECUTION_PACKET_NOT_STOPPED", "frozen-evidence-replay", "Replay must preserve the stopped packet state."],
    [checks.replayPreservesMissingArtifacts, "REPLAY_MISSING_ARTIFACTS_CHANGED", "frozen-evidence-replay", "Replay must preserve missing artifact counts."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v393 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v393 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): PacketStopArchiveMessage[] {
  return [{
    code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME_EXECUTION",
    severity: "warning",
    source: "archive-verification",
    message: "v393 verifies archived v392 stop record evidence; it still does not start Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): PacketStopArchiveMessage[] {
  return [{
    code: ready ? "COLLECT_RUNTIME_EXECUTION_ARTIFACTS" : "REPAIR_V392_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v393",
    message: ready
      ? "Collect the six required runtime execution artifacts before any renewed execution packet attempt."
      : "Repair the v392 archive before moving forward.",
  }];
}

function archiveFiles(
  refs: PacketStopArchiveRefs,
): PacketStopArchiveFileRef[] {
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

function arrayOfString(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function includesAll(values: readonly string[], required: readonly string[]): boolean {
  return required.every((value) => values.includes(value));
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
