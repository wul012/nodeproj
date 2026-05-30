import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightProfile,
  RuntimeExecutionArtifactIntakePreflightChecks,
  RuntimeExecutionArtifactIntakePreflightFileReference,
  RuntimeExecutionArtifactIntakePreflightMessage,
  RuntimeExecutionArtifactIntakePreflightRecord,
  RuntimeExecutionArtifactIntakePreflightReplayReference,
  RuntimeExecutionArtifactIntakePreflightSummary,
  RuntimeExecutionArtifactRequirement,
  RuntimeExecutionArtifactSiblingWorkspaceSnapshot,
  SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight";
const SOURCE_NODE_V393_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v393-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md";
const ARCHIVE_ROOT = "e/393" as const;
const V393_BASENAME =
  "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-v393";
const CODE_WALKTHROUGH =
  "\u4ee3\u7801\u8bb2\u89e3\u8bb0\u5f55_\u751f\u4ea7\u96cf\u5f62\u9636\u6bb53/398-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-v393.md";
const JAVA_WORKSPACE = "D:/javaproj/advanced-order-platform";
const MINI_KV_WORKSPACE = "D:/C/mini-kv";
const JAVA_V161_DECLARED_LIFECYCLE =
  "D:/javaproj/advanced-order-platform/e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json";
const JAVA_V162_RUNTIME_ARTIFACT_CANDIDATE =
  "D:/javaproj/advanced-order-platform/e/162/evidence/java-shard-readiness-runtime-execution-artifacts-v162.json";
const MINI_KV_V152_DECLARED_LIFECYCLE = "D:/C/mini-kv/fixtures/release/shard-readiness-v152.json";
const MINI_KV_V153_RUNTIME_ARTIFACT_CANDIDATE =
  "D:/C/mini-kv/fixtures/release/runtime-execution-artifact-candidate-v153.json";
const REQUIRED_RUNTIME_GATE_ARTIFACT_COUNT = 4;
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;

interface ParsedSourceArchive {
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

type SourceArchiveReferences = Record<string, RuntimeExecutionArtifactIntakePreflightFileReference>;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceArchiveReferences = createSourceArchiveReferences(projectRoot);
  const parsed = readParsedSourceArchive(projectRoot, sourceArchiveReferences);
  const sourceNodeV393 = createSourceNodeV393(parsed);
  const replay = replayFromFrozenEvidence(input.config, projectRoot);
  const siblingWorkspaceSnapshot = createSiblingWorkspaceSnapshot();
  const artifactRequirements = createArtifactRequirements(projectRoot);
  const draftPreflight = createArtifactIntakePreflight(sourceNodeV393, artifactRequirements, siblingWorkspaceSnapshot,
    false);
  const checks = createChecks(
    sourceNodeV393,
    sourceArchiveReferences,
    parsed,
    replay,
    siblingWorkspaceSnapshot,
    artifactRequirements,
    draftPreflight,
  );
  checks.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight;
  const artifactIntakePreflight = createArtifactIntakePreflight(
    sourceNodeV393,
    artifactRequirements,
    siblingWorkspaceSnapshot,
    ready,
  );
  checks.artifactIntakeDigestStable = isDigest(artifactIntakePreflight.artifactIntakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const presentRuntimeExecutionArtifactCount = artifactRequirements.filter((artifact) => artifact.present).length;
  const missingRuntimeExecutionArtifactCount = REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
    - presentRuntimeExecutionArtifactCount;
  const summary = createSummary(sourceNodeV393, replay, artifactRequirements, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime execution artifact intake preflight",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakePreflightState: ready
      ? "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-complete"
      : "blocked",
    intakeDecision: ready
      ? "block-runtime-execution-artifact-intake-missing-concrete-artifacts"
      : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: ready,
    readyForNodeV395ArchiveVerification: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v394",
    sourceNodeVersion: "Node v393",
    artifactIntakePreflightOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    runtimeExecutionArtifactsComplete: presentRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    presentRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount,
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
    sourceArchiveReferences,
    sourceNodeV393,
    replay,
    siblingWorkspaceSnapshot,
    artifactRequirements,
    artifactIntakePreflight,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeExecutionArtifactIntakePreflightJson: ROUTE_PATH,
      runtimeExecutionArtifactIntakePreflightMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV393Json: SOURCE_NODE_V393_ROUTE,
      sourceNodeV393Markdown: `${SOURCE_NODE_V393_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v395",
    },
    nextActions: ready
      ? [
        "Archive and verify this Node v394 artifact-intake preflight before any renewed runtime packet.",
        "Provide all six concrete runtime execution artifacts in the Node drop zone before runtime execution can be reconsidered.",
        "Keep Java and mini-kv in recommended parallel mode; Node v394 does not start, stop, or mutate either service.",
      ]
      : [
        "Repair the v393 archive verification before attempting runtime artifact intake again.",
        "Do not start Java or mini-kv from this preflight.",
      ],
  };
}

function createSourceArchiveReferences(projectRoot: string): SourceArchiveReferences {
  return {
    jsonEvidence: projectFileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V393_BASENAME}-http.json`),
    markdownEvidence: projectFileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V393_BASENAME}-http.md`),
    summaryEvidence: projectFileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V393_BASENAME}-summary.json`),
    browserSnapshot: projectFileReference(projectRoot, ARCHIVE_ROOT, "evidence", `${V393_BASENAME}-browser-snapshot.md`),
    htmlArchive: projectFileReference(projectRoot, ARCHIVE_ROOT, `${V393_BASENAME}.html`),
    screenshot: projectFileReference(projectRoot, ARCHIVE_ROOT, "\u56fe\u7247", `${V393_BASENAME}.png`),
    explanation: projectFileReference(projectRoot, ARCHIVE_ROOT, "\u89e3\u91ca", `${V393_BASENAME}.md`),
    codeWalkthrough: projectFileReference(projectRoot, CODE_WALKTHROUGH),
    sourcePlan: projectFileReference(projectRoot, ACTIVE_PLAN),
    plansIndex: projectFileReference(projectRoot, "docs", "plans3", "README.md"),
    archiveIndex: projectFileReference(projectRoot, "e", "README.md"),
  };
}

function readParsedSourceArchive(projectRoot: string, refs: SourceArchiveReferences): ParsedSourceArchive {
  return {
    json: readProjectJson(projectRoot, refs.jsonEvidence.path),
    markdown: readProjectText(projectRoot, refs.markdownEvidence.path),
    summary: readProjectJson(projectRoot, refs.summaryEvidence.path),
    browserSnapshot: readProjectText(projectRoot, refs.browserSnapshot.path),
    explanation: readProjectText(projectRoot, refs.explanation.path),
    codeWalkthrough: readProjectText(projectRoot, refs.codeWalkthrough.path),
    sourcePlan: readProjectText(projectRoot, refs.sourcePlan.path),
    plansIndex: readProjectText(projectRoot, refs.plansIndex.path),
    archiveIndex: readProjectText(projectRoot, refs.archiveIndex.path),
  };
}

function createSourceNodeV393(
  archive: ParsedSourceArchive,
): SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference {
  return {
    sourceVersion: "Node v393",
    profileVersion: stringValue(valueAt(archive.json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(archive.json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(archive.json, "archiveVerificationDecision")),
    readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification:
      valueAt(archive.json, "readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification")
      === true,
    readyForNodeV394RuntimeExecutionArtifactIntake:
      valueAt(archive.json, "readyForNodeV394RuntimeExecutionArtifactIntake") === true,
    readyForRuntimeLiveReadGate: valueAt(archive.json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v393",
    sourceNodeVersion: stringValue(valueAt(archive.json, "sourceNodeVersion")),
    archiveVerificationOnly: valueAt(archive.json, "archiveVerificationOnly") === true,
    runtimeExecutionPacketPresent: valueAt(archive.json, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: valueAt(archive.json, "runtimeExecutionPacketExecutable") === true,
    runtimeGateApprovalPresent: valueAt(archive.json, "runtimeGateApprovalPresent") === true,
    concreteLoopbackPortsAssigned: valueAt(archive.json, "concreteLoopbackPortsAssigned") === true,
    missingRuntimeExecutionArtifactCount: numberValue(valueAt(archive.json, "missingRuntimeExecutionArtifactCount")),
    executionAttempted: valueAt(archive.json, "executionAttempted") === true,
    archiveVerificationDigest:
      stringValue(valueAt(archive.json, "archiveVerification", "archiveVerificationDigest")),
    sourcePacketDigest: stringValue(valueAt(archive.json, "archiveVerification", "sourcePacketDigest")),
    archiveFileCount: numberValue(valueAt(archive.json, "summary", "archiveFileCount")),
    presentArchiveFileCount: numberValue(valueAt(archive.json, "summary", "presentArchiveFileCount")),
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
): RuntimeExecutionArtifactIntakePreflightReplayReference {
  const profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification
    && profile.readyForNodeV394RuntimeExecutionArtifactIntake
    && !profile.readyForRuntimeLiveReadGate
    && profile.archiveVerificationOnly
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
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForNodeV394RuntimeExecutionArtifactIntake: profile.readyForNodeV394RuntimeExecutionArtifactIntake,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    archiveVerificationOnly: profile.archiveVerificationOnly,
    runtimeExecutionPacketPresent: profile.runtimeExecutionPacketPresent,
    runtimeExecutionPacketExecutable: profile.runtimeExecutionPacketExecutable,
    runtimeGateApprovalPresent: profile.runtimeGateApprovalPresent,
    concreteLoopbackPortsAssigned: profile.concreteLoopbackPortsAssigned,
    missingRuntimeExecutionArtifactCount: profile.missingRuntimeExecutionArtifactCount,
    executionAttempted: profile.executionAttempted,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourcePacketDigest: profile.archiveVerification.sourcePacketDigest,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    requiredRuntimeGateArtifactCount: profile.summary.requiredRuntimeGateArtifactCount,
    requiredRuntimeExecutionArtifactCount: profile.summary.requiredRuntimeExecutionArtifactCount,
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

function createSiblingWorkspaceSnapshot(): RuntimeExecutionArtifactSiblingWorkspaceSnapshot {
  return {
    javaWorkspace: directPathReference(JAVA_WORKSPACE),
    miniKvWorkspace: directPathReference(MINI_KV_WORKSPACE),
    javaV161DeclaredLifecycle: directPathReference(JAVA_V161_DECLARED_LIFECYCLE),
    javaV162RuntimeArtifactCandidate: directPathReference(JAVA_V162_RUNTIME_ARTIFACT_CANDIDATE),
    miniKvV152DeclaredLifecycle: directPathReference(MINI_KV_V152_DECLARED_LIFECYCLE),
    miniKvV153RuntimeArtifactCandidate: directPathReference(MINI_KV_V153_RUNTIME_ARTIFACT_CANDIDATE),
    latestKnownJavaEvidenceVersion: "Java v161",
    latestKnownMiniKvEvidenceVersion: "mini-kv v152",
    runtimeArtifactFallbackAllowed: false,
  };
}

function createArtifactRequirements(projectRoot: string): RuntimeExecutionArtifactRequirement[] {
  return [
    artifactRequirement(
      "operatorApprovalRecord",
      "operator approval record",
      "node-drop-zone",
      "OPERATOR_APPROVAL_RECORD_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "operator-approval-record-v394.json")],
    ),
    artifactRequirement(
      "concreteLoopbackPorts",
      "concrete Java and mini-kv loopback ports",
      "node-drop-zone",
      "CONCRETE_LOOPBACK_PORTS_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "concrete-loopback-ports-v394.json")],
    ),
    artifactRequirement(
      "getOnlySmokeCommand",
      "GET-only smoke command",
      "node-drop-zone",
      "GET_ONLY_SMOKE_COMMAND_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "get-only-smoke-command-v394.json")],
    ),
    artifactRequirement(
      "cleanupProof",
      "cleanup proof",
      "node-drop-zone",
      "CLEANUP_PROOF_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "cleanup-proof-v394.json")],
    ),
    artifactRequirement(
      "serviceOwner",
      "service owner",
      "node-drop-zone",
      "SERVICE_OWNER_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "service-owner-v394.json")],
    ),
    artifactRequirement(
      "processCleanupRules",
      "process cleanup rules",
      "node-drop-zone",
      "PROCESS_CLEANUP_RULES_MISSING",
      [projectFileReference(projectRoot, "e", "394", "input", "process-cleanup-rules-v394.json")],
    ),
  ];
}

function artifactRequirement(
  key: RuntimeExecutionArtifactRequirement["key"],
  label: string,
  source: RuntimeExecutionArtifactRequirement["source"],
  missingReasonCode: RuntimeExecutionArtifactRequirement["missingReasonCode"],
  candidatePaths: RuntimeExecutionArtifactIntakePreflightFileReference[],
): RuntimeExecutionArtifactRequirement {
  return {
    key,
    label,
    required: true,
    present: candidatePaths.some((file) => file.exists),
    source,
    missingReasonCode,
    candidatePaths,
  };
}

function createArtifactIntakePreflight(
  source: SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference,
  artifactRequirements: readonly RuntimeExecutionArtifactRequirement[],
  siblingWorkspaceSnapshot: RuntimeExecutionArtifactSiblingWorkspaceSnapshot,
  ready: boolean,
): RuntimeExecutionArtifactIntakePreflightRecord {
  const presentRuntimeExecutionArtifactCount = artifactRequirements.filter((artifact) => artifact.present).length;
  const missingReasonCodes = artifactRequirements
    .filter((artifact) => !artifact.present)
    .map((artifact) => artifact.missingReasonCode);
  const record = {
    preflightMode:
      "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight" as const,
    sourceSpan: "Node v393 + Java v161 + mini-kv v152 local artifact scan" as const,
    intakeDecision: ready
      ? "block-runtime-execution-artifact-intake-missing-concrete-artifacts" as const
      : "blocked" as const,
    sourceNodeV393ArchiveVerificationDigest: source.archiveVerificationDigest,
    sourceNodeV392PacketDigest: source.sourcePacketDigest,
    scansNodeDropZone: true as const,
    scansLocalSiblingWorkspaces: true as const,
    usesHistoricalFallbackForRuntimeArtifacts: false as const,
    runtimeExecutionArtifactsComplete: presentRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    requiredRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT as 6,
    presentRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT - presentRuntimeExecutionArtifactCount,
    missingReasonCodes,
    javaNextRuntimeArtifactPresent: siblingWorkspaceSnapshot.javaV162RuntimeArtifactCandidate.exists,
    miniKvNextRuntimeArtifactPresent: siblingWorkspaceSnapshot.miniKvV153RuntimeArtifactCandidate.exists,
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
    nextNodeVersionSuggested: "Node v395" as const,
  };
  return {
    artifactIntakeDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  source: SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference,
  refs: SourceArchiveReferences,
  archive: ParsedSourceArchive,
  replay: RuntimeExecutionArtifactIntakePreflightReplayReference,
  sibling: RuntimeExecutionArtifactSiblingWorkspaceSnapshot,
  artifacts: readonly RuntimeExecutionArtifactRequirement[],
  preflight: RuntimeExecutionArtifactIntakePreflightRecord,
): RuntimeExecutionArtifactIntakePreflightChecks {
  return {
    sourceArchiveFilesPresent: Object.values(refs).every((file) => file.exists),
    sourceJsonReadable: archive.json !== null,
    sourceProfileVersionValid:
      source.profileVersion ===
      "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification.v1",
    sourceArchiveVerificationReady:
      source.readyForDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification
      && source.archiveVerificationState
        === "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified",
    sourceReadyForV394Intake: source.readyForNodeV394RuntimeExecutionArtifactIntake,
    sourceRuntimeGateClosed: !source.readyForRuntimeLiveReadGate,
    sourceExecutionPacketStopped:
      source.archiveVerificationOnly
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned
      && !source.executionAttempted,
    sourceMissingArtifactsRecorded:
      source.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && source.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    sourceChecksAllPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    sourceDigestStable: isDigest(source.archiveVerificationDigest) && isDigest(source.sourcePacketDigest),
    sourceSummaryMatchesJson:
      valueAt(archive.summary, "archiveVerificationState") === source.archiveVerificationState
      && valueAt(archive.summary, "checkCount") === source.checkCount
      && valueAt(archive.summary, "passedCheckCount") === source.passedCheckCount
      && valueAt(archive.summary, "readyForNodeV394RuntimeExecutionArtifactIntake") === true
      && valueAt(archive.summary, "readyForRuntimeLiveReadGate") === false
      && valueAt(archive.summary, "missingRuntimeExecutionArtifactCount")
        === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    sourceMarkdownRecordsV394Intake:
      archive.markdown.includes("Ready for Node v394 runtime execution artifact intake: true")
      && archive.markdown.includes("Collect all six runtime execution artifacts"),
    sourceBrowserSnapshotPresent:
      refs.browserSnapshot.exists
      && archive.browserSnapshot.includes(
        "java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verified",
      ),
    sourceScreenshotAndHtmlPresent: refs.screenshot.exists && refs.htmlArchive.exists,
    sourceExplanationRecordsV394Boundary:
      archive.explanation.includes("Node v394 should only continue if real runtime execution artifacts are available")
      && archive.explanation.includes("missingRuntimeExecutionArtifactCount=6"),
    sourceCodeWalkthroughPresent:
      refs.codeWalkthrough.exists
      && archive.codeWalkthrough.includes("Node v394")
      && archive.codeWalkthrough.includes("concrete runtime execution artifacts"),
    sourcePlanPointsToConcreteArtifacts:
      archive.sourcePlan.includes("concrete operator approval, loopback ports, GET-only smoke command")
      && archive.sourcePlan.includes("not another planning echo"),
    planIndexReferencesV393AndV394:
      archive.plansIndex.includes(
        "v393-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification-roadmap.md",
      )
      && archive.plansIndex.includes(
        "v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md",
      ),
    archiveIndexReferencesV393:
      archive.archiveIndex.includes(
        "393: Java / mini-kv declared operator lifecycle runtime execution packet stop record archive verification",
      ),
    routeRecordedInArchive:
      stringValue(valueAt(archive.json, "evidenceEndpoints", "archiveVerificationJson")) === SOURCE_NODE_V393_ROUTE,
    replayReady: replay.replayState === "ready" && replay.productionBlockerCount === 0,
    replayKeepsRuntimeGateClosed: !replay.readyForRuntimeLiveReadGate,
    replayKeepsExecutionPacketStopped:
      !replay.runtimeExecutionPacketPresent
      && !replay.runtimeExecutionPacketExecutable
      && !replay.runtimeGateApprovalPresent
      && !replay.concreteLoopbackPortsAssigned
      && !replay.executionAttempted,
    replayPreservesMissingArtifacts:
      replay.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && replay.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    replayPreservesSourceCheckCounts:
      replay.checkCount === replay.passedCheckCount
      && replay.sourceCheckCount === replay.sourcePassedCheckCount
      && replay.replayCheckCount === replay.replayPassedCheckCount,
    javaWorkspaceScanRecorded: sibling.javaWorkspace.path.length > 0,
    miniKvWorkspaceScanRecorded: sibling.miniKvWorkspace.path.length > 0,
    latestDeclaredLifecycleEvidenceBaselineRecorded:
      sibling.latestKnownJavaEvidenceVersion === "Java v161"
      && sibling.latestKnownMiniKvEvidenceVersion === "mini-kv v152",
    javaNextRuntimeArtifactAbsent: !sibling.javaV162RuntimeArtifactCandidate.exists,
    miniKvNextRuntimeArtifactAbsent: !sibling.miniKvV153RuntimeArtifactCandidate.exists,
    artifactRequirementCountStable: artifacts.length === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    artifactRequirementsAllAbsent: artifacts.every((artifact) => !artifact.present),
    artifactIntakeDigestStable: isDigest(preflight.artifactIntakeDigest),
    noHistoricalRuntimeArtifactFallback: !preflight.usesHistoricalFallbackForRuntimeArtifacts
      && !sibling.runtimeArtifactFallbackAllowed,
    noAutomaticUpstreamStartStop: !preflight.startsUpstreamServices && !preflight.stopsUpstreamServices,
    noUpstreamMutation: !preflight.writesUpstreamState,
    noManagedAuditConnection: !preflight.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !preflight.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight: false,
  };
}

function createSummary(
  source: SourceNodeV393RuntimeExecutionPacketStopRecordArchiveVerificationReference,
  replay: RuntimeExecutionArtifactIntakePreflightReplayReference,
  artifacts: readonly RuntimeExecutionArtifactRequirement[],
  checks: RuntimeExecutionArtifactIntakePreflightChecks,
  productionBlockers: readonly RuntimeExecutionArtifactIntakePreflightMessage[],
  warnings: readonly RuntimeExecutionArtifactIntakePreflightMessage[],
  recommendations: readonly RuntimeExecutionArtifactIntakePreflightMessage[],
): RuntimeExecutionArtifactIntakePreflightSummary {
  const presentRuntimeExecutionArtifactCount = artifacts.filter((artifact) => artifact.present).length;
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    replayCheckCount: replay.checkCount,
    replayPassedCheckCount: replay.passedCheckCount,
    requiredRuntimeGateArtifactCount: source.requiredRuntimeGateArtifactCount,
    requiredRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    presentRuntimeExecutionArtifactCount,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      - presentRuntimeExecutionArtifactCount,
    declaredOperatorEvidenceSourceCount: source.declaredOperatorEvidenceSourceCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: RuntimeExecutionArtifactIntakePreflightChecks,
): RuntimeExecutionArtifactIntakePreflightMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceArchiveFilesPresent, "SOURCE_ARCHIVE_FILES_MISSING", "source-node-v393", "All v393 archive files must be present."],
    [checks.sourceJsonReadable, "SOURCE_JSON_UNREADABLE", "source-node-v393", "v393 JSON archive must be readable."],
    [checks.sourceArchiveVerificationReady, "SOURCE_V393_NOT_READY", "source-node-v393", "Node v393 archive verification must be ready."],
    [checks.sourceReadyForV394Intake, "SOURCE_V393_NOT_READY_FOR_V394", "source-node-v393", "Node v393 must explicitly allow v394 artifact intake."],
    [checks.sourceRuntimeGateClosed, "SOURCE_RUNTIME_GATE_OPENED", "runtime-boundary", "v393 must keep runtime live-read gate closed."],
    [checks.sourceExecutionPacketStopped, "SOURCE_EXECUTION_PACKET_NOT_STOPPED", "runtime-boundary", "v393 must preserve the stopped execution packet state."],
    [checks.sourceChecksAllPassed, "SOURCE_CHECKS_NOT_PASSED", "source-node-v393", "v393 checks must all pass."],
    [checks.replayReady, "REPLAY_FAILED", "frozen-evidence-replay", "v393 must replay from frozen evidence."],
    [checks.replayKeepsRuntimeGateClosed, "REPLAY_OPENED_RUNTIME_GATE", "frozen-evidence-replay", "Replay must keep runtime live-read gate disabled."],
    [checks.replayKeepsExecutionPacketStopped, "REPLAY_EXECUTION_PACKET_NOT_STOPPED", "frozen-evidence-replay", "Replay must preserve stopped packet state."],
    [checks.javaWorkspaceScanRecorded, "JAVA_WORKSPACE_SCAN_MISSING", "sibling-workspace", "Java workspace scan result must be recorded."],
    [checks.miniKvWorkspaceScanRecorded, "MINI_KV_WORKSPACE_SCAN_MISSING", "sibling-workspace", "mini-kv workspace scan result must be recorded."],
    [checks.latestDeclaredLifecycleEvidenceBaselineRecorded, "LATEST_DECLARED_LIFECYCLE_BASELINE_MISSING", "sibling-workspace", "Latest declared lifecycle baseline versions must be recorded."],
    [checks.artifactRequirementCountStable, "ARTIFACT_REQUIREMENT_COUNT_CHANGED", "runtime-artifact-intake", "Exactly six runtime artifacts must be scanned."],
    [checks.artifactRequirementsAllAbsent, "PARTIAL_RUNTIME_ARTIFACT_SET_PRESENT", "runtime-artifact-intake", "v394 expects either no concrete artifacts or a later complete execution packet, not a partial set."],
    [checks.noHistoricalRuntimeArtifactFallback, "RUNTIME_ARTIFACT_FALLBACK_ENABLED", "runtime-artifact-intake", "Runtime execution artifacts must be concrete local/operator artifacts, not historical fallback."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v394 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v394 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeExecutionArtifactIntakePreflightMessage[] {
  return [{
    code: "RUNTIME_EXECUTION_ARTIFACTS_NOT_PRESENT",
    severity: "warning",
    source: "node-v394",
    message: "v394 found no concrete runtime execution artifacts in the Node drop zone or next sibling evidence files.",
  }];
}

function collectRecommendations(ready: boolean): RuntimeExecutionArtifactIntakePreflightMessage[] {
  return [{
    code: ready ? "ARCHIVE_V394_BLOCKED_PREFLIGHT" : "REPAIR_V393_ARCHIVE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v394",
    message: ready
      ? "Archive this blocked preflight, then wait for all six concrete runtime execution artifacts before attempting execution."
      : "Repair the v393 archive before rerunning artifact intake preflight.",
  }];
}

function projectFileReference(
  projectRoot: string,
  ...segments: string[]
): RuntimeExecutionArtifactIntakePreflightFileReference {
  const relativePath = path.join(...segments).replace(/\\/g, "/");
  const absolutePath = path.join(projectRoot, ...segments);
  return fileReference(relativePath, absolutePath);
}

function directPathReference(inputPath: string): RuntimeExecutionArtifactIntakePreflightFileReference {
  return fileReference(inputPath.replace(/\\/g, "/"), inputPath);
}

function fileReference(displayPath: string, absolutePath: string): RuntimeExecutionArtifactIntakePreflightFileReference {
  if (!existsSync(absolutePath)) {
    return { path: displayPath, exists: false, byteLength: 0, digest: null };
  }
  const stats = statSync(absolutePath);
  if (!stats.isFile()) {
    return { path: displayPath, exists: true, byteLength: 0, digest: null };
  }
  const content = readFileSync(absolutePath);
  return {
    path: displayPath,
    exists: true,
    byteLength: stats.size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function readProjectJson(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const content = readProjectText(projectRoot, relativePath);
  if (content.length === 0) {
    return null;
  }
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function readProjectText(projectRoot: string, relativePath: string): string {
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
