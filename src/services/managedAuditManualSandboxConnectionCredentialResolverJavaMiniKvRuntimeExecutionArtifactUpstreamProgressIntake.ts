import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import { evidenceFile, readJsonObject } from "./historicalEvidenceReportUtils.js";
import {
  loadArtifactIntakeArchiveProof,
} from "./artifactIntakeArchiveProof.js";
import type {
  JavaV162RuntimeArtifactCandidateReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeProfile,
  MiniKvV153RuntimeArtifactPreflightReference,
  RuntimePacketRequirementClarification,
  SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference,
  UpstreamProgressClarificationRecord,
  UpstreamProgressEvidenceFileReference,
  UpstreamProgressIntakeChecks,
  UpstreamProgressIntakeMessage,
  UpstreamProgressIntakeSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-runtime-execution-artifact-upstream-progress-intake";
const SOURCE_NODE_V395_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v396-post-java-mini-kv-runtime-execution-artifact-upstream-progress-intake-roadmap.md";
const JAVA_V162_RUNTIME_ARTIFACT_CANDIDATE =
  "D:/javaproj/advanced-order-platform/e/162/evidence/java-shard-readiness-runtime-execution-artifact-candidate-v162.json";
const MINI_KV_V153_RUNTIME_ARTIFACT_PREFLIGHT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v153.json";
const REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT = 6;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeProfile {
  const sourceNodeV395 = createSourceNodeV395(input.config, input.archiveRoot);
  const javaV162RuntimeArtifactCandidate = createJavaV162RuntimeArtifactCandidate();
  const miniKvV153RuntimeArtifactPreflight = createMiniKvV153RuntimeArtifactPreflight();
  const runtimePacketRequirements = createRuntimePacketRequirements(
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
  );
  const draftClarification = createUpstreamProgressClarification(
    sourceNodeV395,
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
    runtimePacketRequirements,
    false,
  );
  const checks = createChecks(
    sourceNodeV395,
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
    runtimePacketRequirements,
    draftClarification,
  );
  checks.readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake;
  const upstreamProgressClarification = createUpstreamProgressClarification(
    sourceNodeV395,
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
    runtimePacketRequirements,
    ready,
  );
  checks.clarificationDigestStable = isDigest(upstreamProgressClarification.clarificationDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    sourceNodeV395,
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
    runtimePacketRequirements,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv runtime execution artifact upstream progress intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    upstreamProgressIntakeState: ready
      ? "java-v162-candidate-and-mini-kv-v153-blocked-preflight-intaken"
      : "blocked",
    upstreamProgressDecision: ready
      ? "clarify-prerequisite-gap-and-keep-runtime-gate-closed"
      : "blocked",
    readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: ready,
    readyForNodeV397RuntimeExecutionPacketPrerequisiteReview: ready,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v396",
    sourceNodeVersion: "Node v395",
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
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
    sourceNodeV395,
    javaV162RuntimeArtifactCandidate,
    miniKvV153RuntimeArtifactPreflight,
    runtimePacketRequirements,
    upstreamProgressClarification,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      upstreamProgressIntakeJson: ROUTE_PATH,
      upstreamProgressIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV395Json: SOURCE_NODE_V395_ROUTE,
      sourceNodeV395Markdown: `${SOURCE_NODE_V395_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v397",
    },
    nextActions: ready
      ? [
        "Treat Java v162 as a Java-side candidate only, not cross-project runtime approval.",
        "Treat mini-kv v153 as a blocked preflight proving the concrete mini-kv runtime artifact set is still missing.",
        "Publish the next upstream handoff as a hard six-item delivery matrix before another Node execution-packet attempt.",
        "Keep Java and mini-kv in recommended parallel mode; Node v396 does not start, stop, or mutate either service.",
      ]
      : [
        "Repair the v395 archive verification or missing upstream evidence before publishing the prerequisite clarification.",
        "Do not start Java or mini-kv from this upstream progress intake.",
      ],
  };
}

function createSourceNodeV395(
  config: AppConfig,
  archiveRoot: string | undefined,
): SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference {
  const profile =
    loadArtifactIntakeArchiveProof({
      config,
      archiveRoot,
    });
  return {
    sourceVersion: "Node v395",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForNodeV396RuntimeExecutionArtifactIntake: profile.readyForNodeV396RuntimeExecutionArtifactIntake,
    readyForRuntimeExecutionPacket: false,
    readyForRuntimeLiveReadGate: false,
    runtimeExecutionArtifactsComplete: false,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    runtimeExecutionPacketPresent: false,
    runtimeExecutionPacketExecutable: false,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    executionAttempted: false,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createJavaV162RuntimeArtifactCandidate(): JavaV162RuntimeArtifactCandidateReference {
  const json = readJsonObject(JAVA_V162_RUNTIME_ARTIFACT_CANDIDATE);
  const evidence = evidenceFile("java-v162-runtime-artifact-candidate", JAVA_V162_RUNTIME_ARTIFACT_CANDIDATE);
  const getOnlySmokeCommands = stringArray(valueAt(json, "getOnlySmokeCommands"));
  const cleanupProofs = stringArray(valueAt(json, "cleanupProofs"));
  const processCleanupRules = stringArray(valueAt(json, "processCleanupRules"));
  const missingCrossProjectArtifacts = stringArray(valueAt(json, "missingCrossProjectArtifacts"));
  const startsJavaService = valueAt(json, "startsJavaService") === true;
  const startsMiniKvService = valueAt(json, "startsMiniKvService") === true;
  const executionAllowed = valueAt(json, "executionAllowed") === true;
  return {
    sourceVersion: "Java v162",
    evidenceFile: toFileReference(evidence),
    status: stringOrNull(valueAt(json, "status")),
    project: stringOrNull(valueAt(json, "project")),
    candidatePresent: valueAt(json, "javaRuntimeArtifactCandidatePresent") === true,
    javaRuntimeArtifactsDeclared: valueAt(json, "javaRuntimeArtifactsDeclared") === true,
    javaRuntimeArtifactsComplete: valueAt(json, "javaRuntimeArtifactsComplete") === true,
    crossProjectRuntimeArtifactsComplete: valueAt(json, "crossProjectRuntimeArtifactsComplete") === true,
    runtimeExecutionPacketPresent: valueAt(json, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: valueAt(json, "runtimeExecutionPacketExecutable") === true,
    readyForRuntimeExecutionPacket: valueAt(json, "readyForRuntimeExecutionPacket") === true,
    readyForRuntimeLiveReadGate: valueAt(json, "readyForRuntimeLiveReadGate") === true,
    operatorApprovalRecord: stringOrNull(valueAt(json, "operatorApprovalRecord")),
    operatorApprovalScope: stringOrNull(valueAt(json, "operatorApprovalScope")),
    serviceOwner: stringOrNull(valueAt(json, "serviceOwner")),
    startupCommandOwner: stringOrNull(valueAt(json, "startupCommandOwner")),
    cleanupOwner: stringOrNull(valueAt(json, "cleanupOwner")),
    declaredWorkingDirectory: stringOrNull(valueAt(json, "declaredWorkingDirectory")),
    declaredStartupCommand: stringOrNull(valueAt(json, "declaredStartupCommand")),
    javaLoopbackPort: stringOrNull(valueAt(json, "javaLoopbackPort")),
    miniKvLoopbackPort: stringOrNull(valueAt(json, "miniKvLoopbackPort")),
    getOnlySmokeCommandCount: getOnlySmokeCommands.length,
    cleanupProofCount: cleanupProofs.length,
    processCleanupRuleCount: processCleanupRules.length,
    missingCrossProjectArtifactCount: missingCrossProjectArtifacts.length,
    executionAllowed: false,
    startsJavaService: false,
    startsMiniKvService: false,
    evidenceReady:
      evidence.exists
      && valueAt(json, "status") === "passed"
      && valueAt(json, "nextNodeConsumerHint") === "Node v396"
      && valueAt(json, "javaRuntimeArtifactCandidatePresent") === true
      && valueAt(json, "javaRuntimeArtifactsComplete") === true
      && valueAt(json, "crossProjectRuntimeArtifactsComplete") === false
      && valueAt(json, "readyForRuntimeExecutionPacket") === false
      && valueAt(json, "readyForRuntimeLiveReadGate") === false
      && !startsJavaService
      && !startsMiniKvService
      && !executionAllowed,
  };
}

function createMiniKvV153RuntimeArtifactPreflight(): MiniKvV153RuntimeArtifactPreflightReference {
  const json = readJsonObject(MINI_KV_V153_RUNTIME_ARTIFACT_PREFLIGHT);
  const evidence = evidenceFile("mini-kv-v153-runtime-artifact-preflight", MINI_KV_V153_RUNTIME_ARTIFACT_PREFLIGHT);
  const preflight = objectValue(valueAt(json, "runtimeExecutionArtifactIntakePreflight"));
  const requiredArtifacts = stringArray(valueAt(preflight, "requiredRuntimeExecutionArtifacts"));
  const executionAllowed = valueAt(json, "executionAllowed") === true;
  const startsMiniKvService = valueAt(preflight, "startsMiniKvService") === true;
  const startsServices = valueAt(preflight, "startsServices") === true;
  const runtimeProbeAllowed = valueAt(preflight, "runtimeProbeAllowed") === true;
  const liveReadAllowed = valueAt(preflight, "liveReadAllowed") === true;
  const routerActivationAllowed = valueAt(preflight, "routerActivationAllowed") === true;
  const writeRoutingAllowed = valueAt(preflight, "writeRoutingAllowed") === true;
  return {
    sourceVersion: "mini-kv v153",
    evidenceFile: toFileReference(evidence),
    project: stringOrNull(valueAt(json, "project")),
    releaseVersion: stringOrNull(valueAt(json, "releaseVersion")),
    status: stringOrNull(valueAt(json, "status")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed,
    sourceFrozenReleaseVersion: stringOrNull(valueAt(preflight, "sourceFrozenReleaseVersion")),
    sourceFrozenFixturePath: stringOrNull(valueAt(preflight, "sourceFrozenFixturePath")),
    preflightMode: stringOrNull(valueAt(preflight, "preflightMode")),
    runtimeExecutionArtifactsComplete: valueAt(preflight, "runtimeExecutionArtifactsComplete") === true,
    presentRuntimeExecutionArtifactCount: numberValue(valueAt(preflight, "presentRuntimeExecutionArtifactCount")),
    missingRuntimeExecutionArtifactCount: numberValue(valueAt(preflight, "missingRuntimeExecutionArtifactCount")),
    requiredRuntimeExecutionArtifactCount: requiredArtifacts.length,
    runtimeExecutionPacketPresent: valueAt(preflight, "runtimeExecutionPacketPresent") === true,
    runtimeExecutionPacketExecutable: valueAt(preflight, "runtimeExecutionPacketExecutable") === true,
    executionAttempted: valueAt(preflight, "executionAttempted") === true,
    startsMiniKvService,
    startsServices,
    runtimeProbeAllowed,
    liveReadAllowed,
    routerActivationAllowed,
    writeRoutingAllowed,
    failClosedOnMissingArtifacts: valueAt(preflight, "failClosedOnMissingArtifacts") === true,
    evidenceReady:
      evidence.exists
      && valueAt(json, "releaseVersion") === "v153"
      && valueAt(json, "status") === "runtime-execution-artifact-intake-preflight-blocked-read-only"
      && valueAt(preflight, "preflightMode") === "blocked-missing-runtime-execution-artifacts"
      && valueAt(preflight, "runtimeExecutionArtifactsComplete") === false
      && valueAt(preflight, "presentRuntimeExecutionArtifactCount") === 0
      && valueAt(preflight, "missingRuntimeExecutionArtifactCount") === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && requiredArtifacts.length === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && !executionAllowed
      && !startsMiniKvService
      && !startsServices
      && !runtimeProbeAllowed
      && !liveReadAllowed
      && !routerActivationAllowed
      && !writeRoutingAllowed,
  };
}

function createRuntimePacketRequirements(
  java: JavaV162RuntimeArtifactCandidateReference,
  miniKv: MiniKvV153RuntimeArtifactPreflightReference,
): RuntimePacketRequirementClarification[] {
  return [
    requirement(
      "operatorApprovalRecord",
      "operator approval record",
      java.operatorApprovalScope === "java-side-artifact-candidate-only"
        ? `Java candidate-only record ${java.operatorApprovalRecord ?? "unknown"} is not cross-project approval.`
        : "Java did not provide a usable approval scope.",
      "mini-kv v153 explicitly remains blocked without runtime approval.",
      "Missing Node/operator approved runtime execution window and cross-project approval packet.",
    ),
    requirement(
      "concreteLoopbackPorts",
      "concrete Java and mini-kv loopback ports",
      java.javaLoopbackPort === "8080"
        ? "Java candidate declares loopback port 8080."
        : "Java concrete loopback port is not declared.",
      miniKv.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
        ? "mini-kv v153 still lacks a concrete operator-approved loopback port."
        : "mini-kv loopback port status is unclear.",
      "Cross-project packet must name both ports together.",
    ),
    requirement(
      "getOnlySmokeCommand",
      "GET-only smoke command",
      java.getOnlySmokeCommandCount > 0
        ? `Java candidate declares ${java.getOnlySmokeCommandCount} GET-only smoke commands.`
        : "Java GET-only smoke command is missing.",
      "mini-kv v153 says the concrete GET-only smoke command artifact is missing.",
      "Cross-project packet must bind Java GET smoke and mini-kv read-only smoke together.",
    ),
    requirement(
      "cleanupProof",
      "cleanup proof",
      java.cleanupProofCount > 0
        ? "Java candidate records cleanup responsibility, but no runtime cleanup was executed."
        : "Java cleanup proof reference is missing.",
      "mini-kv v153 says cleanup proof is missing.",
      "Node/operator packet must archive cleanup proof after any approved runtime start.",
    ),
    requirement(
      "serviceOwner",
      "service owner confirmation",
      java.serviceOwner === "java-platform-operator"
        ? "Java candidate declares java-platform-operator."
        : "Java service owner is not confirmed.",
      "mini-kv v153 keeps service owner confirmation in the missing 0/6 runtime artifact set.",
      "Cross-project packet must confirm both service owners in one place.",
    ),
    requirement(
      "processCleanupRules",
      "process cleanup rules",
      java.processCleanupRuleCount > 0
        ? `Java candidate declares ${java.processCleanupRuleCount} process cleanup rules.`
        : "Java process cleanup rules are missing.",
      "mini-kv v153 says process cleanup rules are missing.",
      "Cross-project packet must state stop-only-owned-process rules for both services.",
    ),
  ];
}

function requirement(
  key: RuntimePacketRequirementClarification["key"],
  label: string,
  javaCandidateStatus: string,
  miniKvStatus: string,
  operatorOrNodeStatus: string,
): RuntimePacketRequirementClarification {
  return {
    key,
    label,
    javaCandidateStatus,
    miniKvStatus,
    operatorOrNodeStatus,
    packetSatisfied: false,
  };
}

function createUpstreamProgressClarification(
  source: SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference,
  java: JavaV162RuntimeArtifactCandidateReference,
  miniKv: MiniKvV153RuntimeArtifactPreflightReference,
  requirements: readonly RuntimePacketRequirementClarification[],
  ready: boolean,
): UpstreamProgressClarificationRecord {
  const record = {
    clarificationMode: "java-mini-kv-runtime-execution-artifact-upstream-progress-intake" as const,
    sourceSpan: "Node v395 + Java v162 + mini-kv v153" as const,
    intakeDecision: ready
      ? "record-upstream-progress-and-clarify-prerequisites-runtime-still-closed" as const
      : "blocked" as const,
    javaV162CandidateReceived: java.evidenceReady,
    miniKvV153BlockedPreflightReceived: miniKv.evidenceReady,
    bothUpstreamsFollowedNodePlanDirection: java.evidenceReady && miniKv.evidenceReady,
    nodePlanAcceptanceCriteriaClarified: ready,
    candidateIsNotCrossProjectApproval: true as const,
    blockedPreflightIsNotRuntimeArtifactSet: true as const,
    runtimeExecutionArtifactsComplete: false as const,
    satisfiedRuntimePacketRequirementCount: 0 as const,
    unsatisfiedRuntimePacketRequirementCount: requirements.length as 6,
    runtimeExecutionPacketPresent: false as const,
    runtimeExecutionPacketExecutable: false as const,
    readyForRuntimeExecutionPacket: false as const,
    readyForRuntimeLiveReadGate: false as const,
    executionAttempted: false as const,
    startsUpstreamServices: false as const,
    stopsUpstreamServices: false as const,
    writesUpstreamState: false as const,
    opensManagedAuditConnection: false as const,
    activeShardPrototypeEnabled: false as const,
    nextNodeVersionSuggested: "Node v397" as const,
    sourceNodeV395ReadyForV396: source.readyForNodeV396RuntimeExecutionArtifactIntake,
  };
  return {
    clarificationDigest: sha256StableJson(record),
    ...record,
  };
}

function createChecks(
  source: SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference,
  java: JavaV162RuntimeArtifactCandidateReference,
  miniKv: MiniKvV153RuntimeArtifactPreflightReference,
  requirements: readonly RuntimePacketRequirementClarification[],
  clarification: UpstreamProgressClarificationRecord,
): UpstreamProgressIntakeChecks {
  return {
    sourceNodeV395Ready:
      source.archiveVerificationState
        === "java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verified",
    sourceNodeV395ReadyForV396: source.readyForNodeV396RuntimeExecutionArtifactIntake,
    sourceNodeV395RuntimeGateClosed:
      !source.readyForRuntimeExecutionPacket
      && !source.readyForRuntimeLiveReadGate
      && !source.runtimeExecutionPacketPresent
      && !source.runtimeExecutionPacketExecutable
      && !source.runtimeGateApprovalPresent
      && !source.concreteLoopbackPortsAssigned
      && !source.executionAttempted,
    sourceNodeV395ChecksPassed:
      source.checkCount > 0
      && source.checkCount === source.passedCheckCount
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    javaEvidenceFilePresent: java.evidenceFile.exists,
    javaEvidenceStatusPassed: java.status === "passed",
    javaNextNodeHintV396: java.evidenceReady,
    javaCandidatePresent: java.candidatePresent,
    javaCandidateCompleteForJavaSide: java.javaRuntimeArtifactsDeclared && java.javaRuntimeArtifactsComplete,
    javaCandidateNotCrossProjectComplete: !java.crossProjectRuntimeArtifactsComplete,
    javaCandidateNotExecutable:
      !java.runtimeExecutionPacketPresent
      && !java.runtimeExecutionPacketExecutable
      && !java.readyForRuntimeExecutionPacket
      && !java.readyForRuntimeLiveReadGate
      && !java.executionAllowed,
    javaOwnerPortSmokeCleanupRecorded:
      java.serviceOwner === "java-platform-operator"
      && java.javaLoopbackPort === "8080"
      && java.getOnlySmokeCommandCount >= 3
      && java.cleanupProofCount >= 3
      && java.processCleanupRuleCount >= 4,
    miniKvEvidenceFilePresent: miniKv.evidenceFile.exists,
    miniKvReleaseVersionV153: miniKv.releaseVersion === "v153",
    miniKvBlockedPreflightStatus: miniKv.status === "runtime-execution-artifact-intake-preflight-blocked-read-only"
      && miniKv.preflightMode === "blocked-missing-runtime-execution-artifacts",
    miniKvPreflightCountsPreserved:
      !miniKv.runtimeExecutionArtifactsComplete
      && miniKv.presentRuntimeExecutionArtifactCount === 0
      && miniKv.missingRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT
      && miniKv.requiredRuntimeExecutionArtifactCount === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    miniKvFailClosed: miniKv.failClosedOnMissingArtifacts,
    miniKvNoExecutionAllowed:
      !miniKv.executionAllowed
      && !miniKv.runtimeExecutionPacketPresent
      && !miniKv.runtimeExecutionPacketExecutable
      && !miniKv.executionAttempted
      && !miniKv.startsMiniKvService
      && !miniKv.startsServices
      && !miniKv.runtimeProbeAllowed
      && !miniKv.liveReadAllowed
      && !miniKv.routerActivationAllowed
      && !miniKv.writeRoutingAllowed,
    miniKvFrozenFromV152:
      miniKv.sourceFrozenReleaseVersion === "v152"
      && miniKv.sourceFrozenFixturePath === "fixtures/release/shard-readiness-v152.json",
    upstreamDirectionFollowed: java.evidenceReady && miniKv.evidenceReady,
    nodePlanGapClarified:
      clarification.candidateIsNotCrossProjectApproval
      && clarification.blockedPreflightIsNotRuntimeArtifactSet,
    runtimeRequirementCountStable: requirements.length === REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    noRuntimePacketRequirementsSatisfied: requirements.every((requirementItem) => !requirementItem.packetSatisfied),
    runtimeExecutionPacketStillAbsent:
      !clarification.runtimeExecutionPacketPresent
      && !clarification.runtimeExecutionPacketExecutable,
    runtimeGateStillClosed:
      !clarification.readyForRuntimeExecutionPacket
      && !clarification.readyForRuntimeLiveReadGate
      && !clarification.executionAttempted,
    noAutomaticUpstreamStartStop: !clarification.startsUpstreamServices && !clarification.stopsUpstreamServices,
    noUpstreamMutation: !clarification.writesUpstreamState,
    noManagedAuditConnection: !clarification.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !clarification.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    clarificationDigestStable: isDigest(clarification.clarificationDigest),
    readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake: false,
  };
}

function createSummary(
  source: SourceNodeV395RuntimeExecutionArtifactIntakePreflightArchiveReference,
  java: JavaV162RuntimeArtifactCandidateReference,
  miniKv: MiniKvV153RuntimeArtifactPreflightReference,
  requirements: readonly RuntimePacketRequirementClarification[],
  checks: UpstreamProgressIntakeChecks,
  productionBlockers: readonly UpstreamProgressIntakeMessage[],
  warnings: readonly UpstreamProgressIntakeMessage[],
  recommendations: readonly UpstreamProgressIntakeMessage[],
): UpstreamProgressIntakeSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceCheckCount: source.checkCount,
    sourcePassedCheckCount: source.passedCheckCount,
    javaEvidenceReady: java.evidenceReady,
    miniKvEvidenceReady: miniKv.evidenceReady,
    runtimePacketRequirementCount: requirements.length,
    satisfiedRuntimePacketRequirementCount: 0,
    unsatisfiedRuntimePacketRequirementCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    requiredRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    presentRuntimeExecutionArtifactCount: 0,
    missingRuntimeExecutionArtifactCount: REQUIRED_RUNTIME_EXECUTION_ARTIFACT_COUNT,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(checks: UpstreamProgressIntakeChecks): UpstreamProgressIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV395Ready, "SOURCE_V395_NOT_READY", "source-node-v395", "Node v395 archive verification must be ready before v396 can consume upstream progress."],
    [checks.sourceNodeV395ReadyForV396, "SOURCE_V395_NOT_READY_FOR_V396", "source-node-v395", "Node v395 must explicitly allow Node v396 artifact intake."],
    [checks.sourceNodeV395RuntimeGateClosed, "SOURCE_V395_RUNTIME_GATE_OPENED", "runtime-boundary", "Node v395 must keep runtime gates closed."],
    [checks.sourceNodeV395ChecksPassed, "SOURCE_V395_CHECKS_NOT_PASSED", "source-node-v395", "Node v395 checks must all pass."],
    [checks.javaEvidenceFilePresent, "JAVA_V162_EVIDENCE_MISSING", "java-v162", "Java v162 runtime artifact candidate evidence must be present."],
    [checks.javaEvidenceStatusPassed, "JAVA_V162_NOT_PASSED", "java-v162", "Java v162 runtime artifact candidate must have status=passed."],
    [checks.javaCandidatePresent, "JAVA_V162_CANDIDATE_MISSING", "java-v162", "Java v162 must expose a candidate artifact."],
    [checks.javaCandidateNotCrossProjectComplete, "JAVA_CANDIDATE_OVERSTATED", "java-v162", "Java v162 candidate must not be treated as cross-project completion."],
    [checks.javaCandidateNotExecutable, "JAVA_CANDIDATE_EXECUTABLE", "java-v162", "Java v162 candidate must remain non-executable."],
    [checks.miniKvEvidenceFilePresent, "MINI_KV_V153_EVIDENCE_MISSING", "mini-kv-v153", "mini-kv v153 frozen evidence must be present."],
    [checks.miniKvReleaseVersionV153, "MINI_KV_RELEASE_VERSION_CHANGED", "mini-kv-v153", "mini-kv frozen evidence must be releaseVersion=v153."],
    [checks.miniKvBlockedPreflightStatus, "MINI_KV_PREFLIGHT_NOT_BLOCKED", "mini-kv-v153", "mini-kv v153 must remain a blocked runtime artifact preflight."],
    [checks.miniKvPreflightCountsPreserved, "MINI_KV_ARTIFACT_COUNTS_CHANGED", "mini-kv-v153", "mini-kv v153 must preserve 0/6 runtime artifact counts."],
    [checks.miniKvNoExecutionAllowed, "MINI_KV_EXECUTION_OPENED", "mini-kv-v153", "mini-kv v153 must not open runtime execution."],
    [checks.runtimeRequirementCountStable, "RUNTIME_REQUIREMENT_COUNT_CHANGED", "runtime-packet-requirements", "Exactly six runtime packet requirements must be clarified."],
    [checks.noRuntimePacketRequirementsSatisfied, "RUNTIME_REQUIREMENT_UNEXPECTEDLY_SATISFIED", "runtime-packet-requirements", "v396 should clarify that no full packet requirement is satisfied yet."],
    [checks.runtimeGateStillClosed, "RUNTIME_GATE_OPENED", "runtime-boundary", "v396 must keep runtime gates closed."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v396 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v396 must not mutate sibling state."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): UpstreamProgressIntakeMessage[] {
  return [
    {
      code: "UPSTREAM_PROGRESS_DOES_NOT_UNLOCK_RUNTIME",
      severity: "warning",
      source: "node-v396",
      message: "Java v162 followed the candidate direction and mini-kv v153 followed the preflight direction, but together they still do not form a runtime execution packet.",
    },
    {
      code: "PREVIOUS_PLAN_ACCEPTANCE_CRITERIA_WAS_AMBIGUOUS",
      severity: "warning",
      source: "node-v396",
      message: "The previous Node plan named the six artifacts but did not hard-map which project or operator must supply each accepted artifact.",
    },
  ];
}

function collectRecommendations(ready: boolean): UpstreamProgressIntakeMessage[] {
  return [
    {
      code: ready ? "PUBLISH_HARD_UPSTREAM_DELIVERY_MATRIX" : "REPAIR_PROGRESS_INTAKE_INPUTS",
      severity: "recommendation",
      source: "node-v396",
      message: ready
        ? "Use the v396 requirement clarification as the next handoff so Java, mini-kv, and operator evidence converge on the same six accepted artifacts."
        : "Repair the missing source archive or upstream evidence before publishing a handoff.",
    },
  ];
}

function toFileReference(file: UpstreamProgressEvidenceFileReference): UpstreamProgressEvidenceFileReference {
  return {
    id: file.id,
    path: file.path,
    resolvedPath: file.resolvedPath.replace(/\\/g, "/"),
    exists: file.exists,
    sizeBytes: file.sizeBytes,
    digest: file.digest,
  };
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

function objectValue(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
