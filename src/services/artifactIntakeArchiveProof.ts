import type { AppConfig } from "../config.js";
import {
  archiveNumber as numberValue,
  archiveString as stringValue,
  archiveStrings as arrayOfString,
  archiveValueAt as valueAt,
  createArchiveEvidenceRefs,
  hasAllStrings as includesAll,
  isSha256 as isDigest,
  listArchiveEvidenceFiles as archiveFiles,
  readArchiveEvidence,
} from "../evidence/archiveEvidenceEngine.js";
import type { ArchiveEvidenceContent as ParsedArchive } from "../evidence/archiveEvidenceEngine.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.js";
import type {
  ArtifactIntakeArchiveProofProfile,
  ArtifactIntakeArchiveRefs,
  ArtifactIntakeArchiveReplay,
  ArtifactIntakeArchiveChecks,
  ArtifactIntakeArchiveMessage,
  ArtifactIntakeArchiveRecord,
  ArtifactIntakeArchiveSummary,
  ArtifactIntakeArchiveSource,
} from "./artifactIntakeArchiveProofTypes.js";

export {
  renderArtifactIntakeArchiveProofMarkdown,
} from "./artifactIntakeArchiveProofRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification";
const SOURCE_NODE_V394_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight";
const ACTIVE_PLAN =
  "docs/plans3/v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md";
const ARCHIVE_ROOT = "e/394" as const;
const V394_BASENAME =
  "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-v394";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/r0000/399-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-v394.md";
const ARCHIVE_SPEC = {
  archiveRoot: ARCHIVE_ROOT,
  basename: V394_BASENAME,
  codeWalkthrough: CODE_WALKTHROUGH,
  sourcePlan: ACTIVE_PLAN,
  plansIndex: "docs/plans3/README.md",
  archiveIndex: "e/README.md",
} as const;
const REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT = 4;
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;
const MISSING_REASON_CODES = [
  "OPERATOR_APPROVAL_RECORD_MISSING",
  "CONCRETE_LOOPBACK_PORTS_MISSING",
  "GET_ONLY_SMOKE_COMMAND_MISSING",
  "CLEANUP_PROOF_MISSING",
  "SERVICE_OWNER_MISSING",
  "PROCESS_CLEANUP_RULES_MISSING",
] as const;

export function loadArtifactIntakeArchiveProof(
  input: { config: AppConfig; archiveRoot?: string },
): ArtifactIntakeArchiveProofProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const archiveReferences = createArchiveEvidenceRefs(projectRoot, ARCHIVE_SPEC);
  const parsed = readArchiveEvidence(projectRoot, archiveReferences);
  const sourceNodeV394 = createSourceNodeV394(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const draftVerification = createArchiveVerification(sourceNodeV394, archiveReferences, replay, false);
  const checks = createChecks(sourceNodeV394, archiveReferences, parsed, replay, draftVerification);
  checks.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification = Object.entries(
    checks,
  )
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification;
  const archiveVerification = createArchiveVerification(sourceNodeV394, archiveReferences, replay, ready);
  checks.archiveVerificationDigestStable = isDigest(archiveVerification.archiveVerificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV394, archiveReferences, replay, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState: ready
      ? "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verified"
      : "blocked",
    archiveVerificationDecision: ready
      ? "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed"
      : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: ready,
    readyForNodeV396RuntimeExecutionArtifactIntake: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v395",
    sourceNodeVersion: "Node v394",
    archiveVerificationOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
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
    sourceNodeV394,
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
      sourceNodeV394Json: SOURCE_NODE_V394_ROUTE,
      sourceNodeV394Markdown: `${SOURCE_NODE_V394_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v396",
    },
    nextActions: ready
      ? [
        "Keep runtime execution blocked until all six concrete runtime execution artifacts are supplied together.",
        "Use a later artifact intake only for concrete operator approval, ports, smoke command, cleanup proof, service owner, and process cleanup rules.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this archive verification.",
      ]
      : [
        "Repair the v394 artifact intake preflight archive before moving forward.",
        "Do not start Java or mini-kv from this archive verification.",
      ],
  };
}

function createSourceNodeV394(
  archive: ParsedArchive,
): ArtifactIntakeArchiveSource {
  return {
    sourceVersion: "Node v394",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    intakePreflightState: stringValue(valueAt(archive.json, "intakePreflightState")),
    intakeDecision: stringValue(valueAt(archive.json, "intakeDecision")),
    readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight") === true,
    readyForNodeV395ArchiveVerification: valueAt(archive.json, "readyForNodeV395ArchiveVerification") === true,
    readyForRuntimeExecutionPacket: valueAt(archive.json, "readyForRuntimeExecutionPacket") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v394",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    artifactIntakePreflightOnly: valueAt(archive.json, "artifactIntakePreflightOnly") === true,
    runtimeExecutionArtifactsComplete: valueAt(archive.json, "runtimeExecutionArtifactsComplete") === true,
    presentRuntimeExecutionArtifactCount: numberValue(valueAt(archive.json, "presentRuntimeExecutionArtifactCount")),
    missingRuntimeExecutionArtifactCount: numberValue(valueAt(archive.json, "missingRuntimeExecutionArtifactCount")),
    runtimeExecutionPacketPresent: valueAt(archive.json, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: valueAt(archive.json, "runtimeExecutionPacketExecutable") === true,
    runtimeGateApprovalPresent: valueAt(archive.json, "runtimeGateApprovalPresent") === true,
    concreteLoopbackPortsAssigned: valueAt(archive.json, "concreteLoopbackPortsAssigned") === true,
    executionAttempted: valueAt(archive.json, "executionAttempted") === true,
    artifactIntakeDigest: stringValue(valueAt(archive.json, "artifactIntakePreflight", "artifactIntakeDigest")),
    sourceNodeV393ArchiveVerificationDigest:
      stringValue(valueAt(archive.json, "artifactIntakePreflight", "sourceNodeV393ArchiveVerificationDigest")),
    sourceNodeV392PacketDigest:
      stringValue(valueAt(archive.json, "artifactIntakePreflight", "sourceNodeV392PacketDigest")),
    missingReasonCodes: arrayOfString(valueAt(archive.json, "artifactIntakePreflight", "missingReasonCodes")),
    sourceCheckCount: numberValue(valueAt(archive.json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(archive.json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(archive.json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(archive.json, "summary", "replayPassedCheckCount")),
    requiredRuntimeGateArtifactCount: numberValue(valueAt(archive.json, "summary", "requiredRuntimeGateArtifactCount")),
    requiredRuntimeExecutionArtifactCount:
      numberValue(valueAt(archive.json, "summary", "requiredRuntimeExecutionArtifactCount")),
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
): ArtifactIntakeArchiveReplay {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight
    && profile.readyForNodeV395ArchiveVerification
    && !profile.readyForRuntimeExecutionPacket
    && !profile.readyForRuntimeLiveReadGate
    && profile.artifactIntakePreflightOnly
    && !profile.runtimeExecutionArtifactsComplete
    && profile.presentRuntimeExecutionArtifactCount === 0
    && profile.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
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
    && profile.summary.presentRuntimeExecutionArtifactCount === 0
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
    intakePreflightState: profile.intakePreflightState,
    intakeDecision: profile.intakeDecision,
    readyForNodeV395ArchiveVerification: profile.readyForNodeV395ArchiveVerification,
    readyForRuntimeExecutionPacket: profile.readyForRuntimeExecutionPacket,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    artifactIntakePreflightOnly: profile.artifactIntakePreflightOnly,
    runtimeExecutionArtifactsComplete: profile.runtimeExecutionArtifactsComplete,
    presentRuntimeExecutionArtifactCount: profile.presentRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: profile.missingRuntimeExecutionArtifactCount,
    runtimeExecutionPacketPresent: profile.runtimeExecutionPacketPresent,
    runtimeExecutionPacketExecutable: profile.runtimeExecutionPacketExecutable,
    runtimeGateApprovalPresent: profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: profile.concreteLoopbackPortsAssigned,
    executionAttempted: profile.executionAttempted,
    artifactIntakeDigest: profile.artifactIntakePreflight.artifactIntakeDigest,
    sourceNodeV393ArchiveVerificationDigest:
      profile.artifactIntakePreflight.sourceNodeV393ArchiveVerificationDigest,
    sourceNodeV392PacketDigest: profile.artifactIntakePreflight.sourceNodeV392PacketDigest,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    requiredRuntimeGateArtifactCount: profile.summary.requiredRuntimeGateArtifactCount,
    requiredRuntimeExecutionArtifactCount: profile.summary.requiredRuntimeExecutionArtifactCount,
    declaredOperatorEvidenceSourceCount: profile.summary.declaredOperatorEvidenceSourceCount,
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
  source: ArtifactIntakeArchiveSource,
  refs: ArtifactIntakeArchiveRefs,
  replay: ArtifactIntakeArchiveReplay,
  ready: boolean,
): ArtifactIntakeArchiveRecord {
  const archiveFileDigests = archiveFiles(refs)
    .map((file) => ({ path: file.path, digest: file.digest, byteLength: file.byteLength }));
  const record = {
    verificationMode:
      "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification" as const,
    sourceSpan: "Node v394 runtime execution artifact intake preflight" as const,
    archiveRoot: ARCHIVE_ROOT,
    archiveVerificationDecision: ready
      ? "archive-runtime-execution-artifact-intake-preflight-and-keep-runtime-gate-closed" as const
      : "blocked" as const,
    sourceArtifactIntakeDigest: source.artifactIntakeDigest,
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
    verifiesArtifactSetStillMissing: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    activeShardPrototypeEnabled: false,
    nextNodeVersionSuggested: "Node v396",
  };
}

function createChecks(
  source: ArtifactIntakeArchiveSource,
  refs: ArtifactIntakeArchiveRefs,
  archive: ParsedArchive,
  replay: ArtifactIntakeArchiveReplay,
  verification: ArtifactIntakeArchiveRecord,
): ArtifactIntakeArchiveChecks {
  return {
    archiveFilesPresent: archiveFiles(refs).every((file) => file.exists),
    jsonEvidenceReadable: archive.json !== null,
    jsonProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight.v1",
    jsonPreflightReady:
      source.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight
      && source.intakePreflightState
        === "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete",
    jsonReadyForNodeV395ArchiveVerification: source.readyForNodeV395ArchiveVerification,
    jsonRuntimeGateClosed: !source.readyForRuntimeExecutionPacket && !source.readyForRuntimeLiveReadGate,
    jsonRuntimeExecutionPacketBlocked:
      source.artifactIntakePreflightOnly
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned
      && !source.executionAttempted,
    jsonArtifactCountsPreserved:
      !source.runtimeExecutionArtifactsComplete
      && source.presentRuntimeExecutionArtifactCount === 0
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    jsonMissingReasonCodesStable: includesAll(source.missingReasonCodes, MISSING_REASON_CODES),
    jsonDigestStable:
      isDigest(source.artifactIntakeDigest)
      && isDigest(source.sourceNodeV393ArchiveVerificationDigest)
      && isDigest(source.sourceNodeV392PacketDigest),
    jsonChecksAllPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    summaryMatchesJson:
      valueAt(archive.summary, "intakePreflightState") === source.intakePreflightState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForRuntimeExecutionPacket") === false
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "presentRuntimeExecutionArtifactCount") === 0
      && valueAt(archive.summary, "missingRuntimeExecutionArtifactCount")
        === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    markdownRecordsBlockedPreflight:
      archive.markdown.includes("Intake decision: block-runtime-execution-artifact-intake-missing-concrete-artifacts")
      && archive.markdown.includes("Runtime Execution Artifact Requirements")
      && archive.markdown.includes("runtimeExecutionArtifactsComplete: false"),
    browserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes(
        "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete",
      ),
    screenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    explanationRecordsBlockedBoundaryAndChecks:
      archive.explanation.includes("presentRuntimeExecutionArtifactCount=0")
      && archive.explanation.includes("missingRuntimeExecutionArtifactCount=6")
      && archive.explanation.includes("43/43"),
    codeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v395")
      && archive.codeWalkthrough.includes("0/6"),
    sourcePlanPointsToV395ArchiveVerification:
      archive.sourcePlan.includes("Node v395 can archive and verify this v394 preflight")
      && archive.sourcePlan.includes("does not add another planning echo"),
    planIndexReferencesV394AndV395:
      archive.plansIndex.includes(
        "v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md",
      )
      && archive.plansIndex.includes(
        "v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md",
      ),
    archiveIndexReferencesV394:
      archive.archiveIndex.includes(
        "394: Java / mini-kv declared operator lifecycle runtime execution artifact intake preflight",
      ),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "runtimeExecutionArtifactIntakePreflightJson"))
      === SOURCE_NODE_V394_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayKeepsRuntimeGateClosed: !replay.readyForRuntimeExecutionPacket && !replay.readyForRuntimeLiveReadGate,
    replayKeepsRuntimeExecutionPacketBlocked:
      !replay.runtimeExecutionPacketPresent
      && !replay.runtimeExecutionPacketExecutable
      && !replay.runtimeGateApprovalPresent
      && !replay.concreteLoopbackPortsAssigned
      && !replay.executionAttempted,
    replayPreservesMissingArtifacts:
      !replay.runtimeExecutionArtifactsComplete
      && replay.presentRuntimeExecutionArtifactCount === 0
      && replay.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && replay.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
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
    readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification: false,
  };
}

function createSummary(
  source: ArtifactIntakeArchiveSource,
  refs: ArtifactIntakeArchiveRefs,
  replay: ArtifactIntakeArchiveReplay,
  checks: ArtifactIntakeArchiveChecks,
  productionBlockers: readonly ArtifactIntakeArchiveMessage[],
  warnings: readonly ArtifactIntakeArchiveMessage[],
  recommendations: readonly ArtifactIntakeArchiveMessage[],
): ArtifactIntakeArchiveSummary {
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
    presentRuntimeExecutionArtifactCount: source.presentRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: source.missingRuntimeExecutionArtifactCount,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ArtifactIntakeArchiveChecks,
): ArtifactIntakeArchiveMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.archiveFilesPresent, "ARCHIVE_FILES_MISSING", "archive", "All v394 archive files must be present."],
    [checks.jsonEvidenceReadable, "ARCHIVE_JSON_UNREADABLE", "archive", "v394 JSON archive must be readable."],
    [checks.jsonPreflightReady, "SOURCE_V394_NOT_READY", "source-node-v394", "Node v394 preflight must be ready for archive verification."],
    [checks.jsonRuntimeGateClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v394 must keep runtime gates closed."],
    [checks.jsonRuntimeExecutionPacketBlocked, "EXECUTION_PACKET_NOT_BLOCKED", "runtime-boundary", "v394 must keep runtime execution packet blocked."],
    [checks.jsonArtifactCountsPreserved, "ARTIFACT_COUNTS_CHANGED", "source-node-v394", "v394 must preserve 0/6 concrete artifacts."],
    [checks.jsonChecksAllPassed, "SOURCE_V394_CHECKS_NOT_PASSED", "source-node-v394", "v394 checks must all pass."],
    [checks.summaryMatchesJson, "SUMMARY_JSON_MISMATCH", "archive", "v394 summary archive must match the JSON evidence."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v394 must replay from frozen evidence."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime gates disabled."],
    [checks.replayKeepsRuntimeExecutionPacketBlocked, "REPLAY_EXECUTION_PACKET_NOT_BLOCKED", "frozen-evidence-replay", "Replay must preserve blocked runtime execution packet state."],
    [checks.replayPreservesMissingArtifacts, "REPLAY_MISSING_ARTIFACTS_CHANGED", "frozen-evidence-replay", "Replay must preserve 0/6 artifact counts."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v395 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v395 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ArtifactIntakeArchiveMessage[] {
  return [{
    code: "ARCHIVE_VERIFICATION_IS_NOT_RUNTIME_ARTIFACT_INTAKE",
    severity: "warning",
    source: "archive-verification",
    message: "v395 verifies archived v394 blocked preflight evidence; it still does not start Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): ArtifactIntakeArchiveMessage[] {
  return [{
    code: ready ? "WAIT_FOR_CONCRETE_RUNTIME_ARTIFACTS" : "REPAIR_V394_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v395",
    message: ready
      ? "Wait for all six concrete runtime execution artifacts before any renewed execution packet attempt."
      : "Repair the v394 archive before moving forward.",
  }];
}
