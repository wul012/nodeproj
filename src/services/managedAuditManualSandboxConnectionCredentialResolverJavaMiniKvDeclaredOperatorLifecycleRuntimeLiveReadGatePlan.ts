import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadDeclaredIntake,
} from "./operatorLifecycle/declared/intake.js";
import {
  loadDeclaredArchive,
} from "./operatorLifecycle/declared/archive.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanProfile,
  RuntimeLiveReadGatePlanChecks,
  RuntimeLiveReadGatePlanMessage,
  RuntimeLiveReadGatePlanRecord,
  RuntimeLiveReadGatePlanSummary,
  SourceNodeV388DeclaredOperatorLifecycleReplayReference,
  SourceNodeV389ArchiveReplayReference,
  SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan";
const SOURCE_NODE_V389_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v389-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v390-post-java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-roadmap.md";
const SOURCE_NODE_V389_ARCHIVE =
  "e/389/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verification-v389-http.json";
const REQUIRED_RUNTIME_GATE_ARTIFACTS = [
  "operator approval record",
  "concrete loopback port assignment",
  "GET-only smoke command",
  "cleanup proof",
] as const;

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlan(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeLiveReadGatePlanProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV389 = createSourceNodeV389(readProjectJson(projectRoot, SOURCE_NODE_V389_ARCHIVE));
  const sourceNodeV389Replay = createSourceNodeV389Replay(input.config, projectRoot);
  const sourceNodeV388Replay = createSourceNodeV388Replay(input.config, projectRoot);
  const draftPlan = createRuntimeGatePlan(sourceNodeV389, sourceNodeV388Replay, false);
  const checks = createChecks(sourceNodeV389, sourceNodeV389Replay, sourceNodeV388Replay, draftPlan);
  checks.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan = Object.entries(checks)
    .filter(([key]) => key !== "readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan")
    .every(([, value]) => value);
  const ready = checks.readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan;
  const runtimeGatePlan = createRuntimeGatePlan(sourceNodeV389, sourceNodeV388Replay, ready);
  checks.planDigestStable = isDigest(runtimeGatePlan.planDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV388Replay, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv declared operator lifecycle runtime live-read gate plan",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    planState: ready ? "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan-ready" : "blocked",
    planDecision: ready ? "write-separate-runtime-live-read-gate-plan-after-v389-archive-verification" : "blocked",
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: ready,
    readyForNodeV391ArchiveVerification: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v390",
    sourceNodeVersion: "Node v389",
    runtimeGatePlanOnly: true,
    runtimeGateRequiresSeparateApproval: true,
    operatorApprovalRecordRequired: true,
    concreteLoopbackPortsRequired: true,
    getOnlySmokeCommandRequired: true,
    cleanupProofRequired: true,
    runtimeGateApprovalPresent: false,
    concreteLoopbackPortsAssigned: false,
    liveReadGateAllowed: false,
    runtimeProbeAllowed: false,
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
    sourceNodeV389,
    sourceNodeV389Replay,
    sourceNodeV388Replay,
    runtimeGatePlan,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      runtimeLiveReadGatePlanJson: ROUTE_PATH,
      runtimeLiveReadGatePlanMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV389Json: SOURCE_NODE_V389_ROUTE,
      sourceNodeV389Markdown: `${SOURCE_NODE_V389_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v391",
    },
    nextActions: ready
      ? [
        "Archive and verify this Node v390 runtime live-read gate plan before any runtime probe.",
        "Collect operator approval, concrete loopback ports, GET-only smoke command, and cleanup proof in a separate gate execution packet.",
        "Do not start Java, start mini-kv, parse raw endpoint URLs, or enable active shard routing from this plan.",
      ]
      : [
        "Repair the v389 archive verification and v388 declared lifecycle replay before writing the runtime gate plan.",
        "Do not start Java or mini-kv from this plan.",
      ],
  };
}

function createSourceNodeV389(
  json: Record<string, unknown> | null,
): SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference {
  return {
    sourceVersion: "Node v389",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification:
      valueAt(json, "readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification") === true,
    readyForNodeV390RuntimeGatePlan: valueAt(json, "readyForNodeV390RuntimeGatePlan") === true,
    readyForRuntimeLiveReadGate: valueAt(json, "readyForRuntimeLiveReadGate") === true,
    activeNodeVersion: "Node v389",
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    archiveVerificationDigest: stringValue(valueAt(json, "archiveVerification", "archiveVerificationDigest")),
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    sourceCheckCount: numberValue(valueAt(json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(json, "summary", "replayPassedCheckCount")),
    declaredOperatorEvidenceSourceCount:
      numberValue(valueAt(json, "summary", "declaredOperatorEvidenceSourceCount")),
    productionBlockerCount: numberValue(valueAt(json, "summary", "productionBlockerCount")),
    archiveVerificationOnly: valueAt(json, "archiveVerificationOnly") === true,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createSourceNodeV389Replay(config: AppConfig, projectRoot: string): SourceNodeV389ArchiveReplayReference {
  const profile =
    loadDeclaredArchive({
      config,
      archiveRoot: projectRoot,
    });
  const ready = profile.readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification
    && profile.readyForNodeV390RuntimeGatePlan
    && !profile.readyForRuntimeLiveReadGate
    && profile.archiveVerificationOnly
    && profile.summary.checkCount === profile.summary.passedCheckCount
    && profile.summary.sourceCheckCount === profile.summary.sourcePassedCheckCount
    && profile.summary.replayCheckCount === profile.summary.replayPassedCheckCount
    && profile.summary.productionBlockerCount === 0
    && profile.summary.declaredOperatorEvidenceSourceCount === 2
    && !profile.startsJavaService
    && !profile.startsMiniKvService
    && !profile.stopsJavaService
    && !profile.stopsMiniKvService
    && !profile.executionAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification:
      profile.readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification,
    readyForNodeV390RuntimeGatePlan: profile.readyForNodeV390RuntimeGatePlan,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    archiveVerificationOnly: profile.archiveVerificationOnly,
    sourceCheckCount: profile.summary.sourceCheckCount,
    sourcePassedCheckCount: profile.summary.sourcePassedCheckCount,
    replayCheckCount: profile.summary.replayCheckCount,
    replayPassedCheckCount: profile.summary.replayPassedCheckCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
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

function createSourceNodeV388Replay(
  config: AppConfig,
  projectRoot: string,
): SourceNodeV388DeclaredOperatorLifecycleReplayReference {
  const profile = loadDeclaredIntake({
    config,
    archiveRoot: projectRoot,
  });
  const ready = profile.readyForDeclaredOperatorLifecycleEvidenceIntake
    && profile.readyForNodeV389ArchiveVerification
    && !profile.readyForRuntimeLiveReadGate
    && profile.declaredOperatorLifecycleEvidencePresent
    && profile.runtimeGateRequiresSeparateApproval
    && profile.javaDeclaredOperatorLifecycle.version === "Java v161"
    && profile.miniKvDeclaredOperatorLifecycle.releaseVersion === "v152"
    && profile.miniKvFrozenOperatorTemplate.releaseVersion === "v151"
    && profile.javaDeclaredOperatorLifecycleFile.usedHistoricalFallback
    && profile.miniKvDeclaredOperatorLifecycleFile.usedHistoricalFallback
    && profile.miniKvFrozenOperatorTemplateFile.usedHistoricalFallback
    && profile.summary.checkCount === profile.summary.passedCheckCount
    && profile.summary.productionBlockerCount === 0
    && !profile.startsJavaService
    && !profile.startsMiniKvService
    && !profile.executionAllowed
    && !profile.activeShardPrototypeEnabled;
  return {
    replayState: ready ? "ready" : "blocked",
    replayedProfileVersion: profile.profileVersion,
    readyForDeclaredOperatorLifecycleEvidenceIntake: profile.readyForDeclaredOperatorLifecycleEvidenceIntake,
    readyForNodeV389ArchiveVerification: profile.readyForNodeV389ArchiveVerification,
    readyForRuntimeLiveReadGate: profile.readyForRuntimeLiveReadGate,
    declaredOperatorLifecycleEvidencePresent: profile.declaredOperatorLifecycleEvidencePresent,
    runtimeGateRequiresSeparateApproval: profile.runtimeGateRequiresSeparateApproval,
    javaDeclaredOperatorLifecycleVersion: profile.javaDeclaredOperatorLifecycle.version,
    javaDeclaredPortCount: profile.javaDeclaredOperatorLifecycle.declaredPorts.length,
    javaGetOnlySmokeTargetCount: profile.javaDeclaredOperatorLifecycle.getOnlySmokeTargets.length,
    javaStartupCommandDeclared: profile.javaDeclaredOperatorLifecycle.startupCommandDeclared,
    javaCleanupDeclared: profile.javaDeclaredOperatorLifecycle.cleanupDeclared,
    javaFailClosedDeclared: profile.javaDeclaredOperatorLifecycle.failClosedDeclared,
    javaNodeMayStartService: profile.javaDeclaredOperatorLifecycle.nodeMayStartService,
    javaNodeMayStopService: profile.javaDeclaredOperatorLifecycle.nodeMayStopService,
    miniKvDeclaredOperatorLifecycleReleaseVersion: profile.miniKvDeclaredOperatorLifecycle.releaseVersion,
    miniKvDeclaredPortHandleCount: profile.miniKvDeclaredOperatorLifecycle.declaredPortHandles.length,
    miniKvRequiredBeforeRuntimeGateCount: profile.miniKvDeclaredOperatorLifecycle.requiredBeforeRuntimeGate.length,
    miniKvStartupCommandDeclared: profile.miniKvDeclaredOperatorLifecycle.startupCommandDeclared,
    miniKvCleanupResponsibilityDeclared: profile.miniKvDeclaredOperatorLifecycle.cleanupResponsibilityDeclared,
    miniKvFailClosedBehaviorDeclared: profile.miniKvDeclaredOperatorLifecycle.failClosedBehaviorDeclared,
    miniKvRuntimeGateApproved: profile.miniKvDeclaredOperatorLifecycle.runtimeGateApproved,
    miniKvStartsServices: profile.miniKvDeclaredOperatorLifecycle.startsServices,
    javaDeclaredOperatorLifecycleUsedHistoricalFallback:
      profile.javaDeclaredOperatorLifecycleFile.usedHistoricalFallback,
    miniKvDeclaredOperatorLifecycleUsedHistoricalFallback:
      profile.miniKvDeclaredOperatorLifecycleFile.usedHistoricalFallback,
    miniKvFrozenOperatorTemplateUsedHistoricalFallback:
      profile.miniKvFrozenOperatorTemplateFile.usedHistoricalFallback,
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

function createRuntimeGatePlan(
  sourceNodeV389: SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference,
  sourceNodeV388Replay: SourceNodeV388DeclaredOperatorLifecycleReplayReference,
  ready: boolean,
): RuntimeLiveReadGatePlanRecord {
  const record = {
    planMode: "java-mini-kv-declared-operator-lifecycle-runtime-live-read-gate-plan" as const,
    sourceSpan: "Node v389 + Node v388 + Java v161 + mini-kv v152" as const,
    sourceNodeV389ArchiveVerificationDigest: sourceNodeV389.archiveVerificationDigest,
    sourceNodeV388ReplayProfileVersion: sourceNodeV388Replay.replayedProfileVersion,
    operatorApprovalRecordRequired: true as const,
    concreteLoopbackPortsRequired: true as const,
    getOnlySmokeCommandRequired: true as const,
    cleanupProofRequired: true as const,
    failClosedResultRequired: true as const,
    runtimeGateApprovalPresent: false as const,
    concreteLoopbackPortsAssigned: false as const,
    javaOperatorMustStartService: true as const,
    miniKvOperatorMustStartService: true as const,
    nodeMayStartJavaService: false as const,
    nodeMayStartMiniKvService: false as const,
    nodeMayStopJavaService: false as const,
    nodeMayStopMiniKvService: false as const,
    javaDeclaredPortHandles: ["8080"],
    miniKvDeclaredPortHandles: ["operator-approved-loopback-port"],
    javaGetOnlySmokeTargetCount: sourceNodeV388Replay.javaGetOnlySmokeTargetCount,
    miniKvGetOnlySmokeTargetDeclared: true,
    requiredBeforeRuntimeGate: [...REQUIRED_RUNTIME_GATE_ARTIFACTS],
    liveReadGateAllowed: false as const,
    runtimeProbeAllowed: false as const,
    activeShardPrototypeEnabled: false as const,
    ready,
  };
  return {
    ...record,
    planDigest: sha256StableJson(record),
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v391",
  };
}

function createChecks(
  sourceNodeV389: SourceNodeV389DeclaredOperatorLifecycleArchiveVerificationReference,
  sourceNodeV389Replay: SourceNodeV389ArchiveReplayReference,
  sourceNodeV388Replay: SourceNodeV388DeclaredOperatorLifecycleReplayReference,
  plan: RuntimeLiveReadGatePlanRecord,
): RuntimeLiveReadGatePlanChecks {
  return {
    sourceNodeV389Ready:
      sourceNodeV389.readyForDeclaredOperatorLifecycleEvidenceIntakeArchiveVerification
      && sourceNodeV389.readyForNodeV390RuntimeGatePlan
      && !sourceNodeV389.readyForRuntimeLiveReadGate,
    sourceNodeV389ArchiveVerified:
      sourceNodeV389.archiveVerificationState ===
      "java-mini-kv-declared-operator-lifecycle-evidence-intake-archive-verified",
    sourceNodeV389ChecksAllPassed:
      sourceNodeV389.checkCount > 0
      && sourceNodeV389.checkCount === sourceNodeV389.passedCheckCount
      && sourceNodeV389.sourceCheckCount === sourceNodeV389.sourcePassedCheckCount
      && sourceNodeV389.replayCheckCount === sourceNodeV389.replayPassedCheckCount
      && sourceNodeV389.productionBlockerCount === 0,
    sourceNodeV389BoundariesClosed:
      sourceNodeV389.archiveVerificationOnly && !sourceNodeV389.rerunsLiveRead
      && !sourceNodeV389.startsJavaService && !sourceNodeV389.startsMiniKvService
      && !sourceNodeV389.stopsJavaService && !sourceNodeV389.stopsMiniKvService
      && !sourceNodeV389.connectsManagedAudit && !sourceNodeV389.executionAllowed
      && !sourceNodeV389.activeShardPrototypeEnabled,
    sourceNodeV389ReplayReady: sourceNodeV389Replay.replayState === "ready",
    sourceNodeV388DeclaredEvidenceReady:
      sourceNodeV388Replay.replayState === "ready"
      && sourceNodeV388Replay.declaredOperatorLifecycleEvidencePresent
      && sourceNodeV388Replay.runtimeGateRequiresSeparateApproval,
    sourceNodeV388EvidenceVersionsMatch:
      sourceNodeV388Replay.javaDeclaredOperatorLifecycleVersion === "Java v161"
      && sourceNodeV388Replay.miniKvDeclaredOperatorLifecycleReleaseVersion === "v152",
    sourceNodeV388UsesFrozenHistoricalSnapshots:
      sourceNodeV388Replay.javaDeclaredOperatorLifecycleUsedHistoricalFallback
      && sourceNodeV388Replay.miniKvDeclaredOperatorLifecycleUsedHistoricalFallback
      && sourceNodeV388Replay.miniKvFrozenOperatorTemplateUsedHistoricalFallback,
    javaLifecyclePlanComplete:
      sourceNodeV388Replay.javaStartupCommandDeclared
      && sourceNodeV388Replay.javaDeclaredPortCount > 0
      && sourceNodeV388Replay.javaGetOnlySmokeTargetCount >= 4,
    javaStartupOwnershipDeclared:
      !sourceNodeV388Replay.javaNodeMayStartService && !sourceNodeV388Replay.javaNodeMayStopService,
    javaGetOnlySmokeDeclared: sourceNodeV388Replay.javaGetOnlySmokeTargetCount >= 4,
    javaCleanupAndFailClosedDeclared:
      sourceNodeV388Replay.javaCleanupDeclared && sourceNodeV388Replay.javaFailClosedDeclared,
    javaRuntimePrerequisitesContainRuntimeGate: plan.requiredBeforeRuntimeGate.includes("operator approval record"),
    miniKvLifecyclePlanComplete:
      sourceNodeV388Replay.miniKvStartupCommandDeclared
      && sourceNodeV388Replay.miniKvDeclaredPortHandleCount > 0
      && sourceNodeV388Replay.miniKvRequiredBeforeRuntimeGateCount === REQUIRED_RUNTIME_GATE_ARTIFACTS.length,
    miniKvStartupOwnershipDeclared: !sourceNodeV388Replay.miniKvStartsServices,
    miniKvGetOnlySmokeDeclared: plan.miniKvGetOnlySmokeTargetDeclared,
    miniKvCleanupAndFailClosedDeclared:
      sourceNodeV388Replay.miniKvCleanupResponsibilityDeclared
      && sourceNodeV388Replay.miniKvFailClosedBehaviorDeclared,
    miniKvRequiresSeparateRuntimeGate:
      sourceNodeV388Replay.runtimeGateRequiresSeparateApproval
      && includesAll(plan.requiredBeforeRuntimeGate, REQUIRED_RUNTIME_GATE_ARTIFACTS),
    miniKvRuntimeGateStillBlocked:
      !sourceNodeV388Replay.miniKvRuntimeGateApproved && !sourceNodeV388Replay.miniKvStartsServices,
    runtimeApprovalRecordRequired: plan.operatorApprovalRecordRequired,
    concreteLoopbackPortsRequired: plan.concreteLoopbackPortsRequired,
    getOnlySmokeCommandRequired: plan.getOnlySmokeCommandRequired,
    cleanupProofRequired: plan.cleanupProofRequired,
    runtimeGatePlanDoesNotApproveRuntime:
      !plan.runtimeGateApprovalPresent && !plan.concreteLoopbackPortsAssigned,
    runtimeProbeStillBlocked: !plan.runtimeProbeAllowed,
    liveReadGateStillBlocked: !plan.liveReadGateAllowed,
    noAutomaticUpstreamStartStop: !plan.startsUpstreamServices && !plan.stopsUpstreamServices,
    noUpstreamMutation: !plan.writesUpstreamState,
    noManagedAuditConnection: !plan.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    activeShardPrototypeStillDisabled: !plan.activeShardPrototypeEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    planDigestStable: isDigest(plan.planDigest),
    readyForDeclaredOperatorLifecycleRuntimeLiveReadGatePlan: false,
  };
}

function createSummary(
  sourceNodeV388Replay: SourceNodeV388DeclaredOperatorLifecycleReplayReference,
  checks: RuntimeLiveReadGatePlanChecks,
  productionBlockers: readonly RuntimeLiveReadGatePlanMessage[],
  warnings: readonly RuntimeLiveReadGatePlanMessage[],
  recommendations: readonly RuntimeLiveReadGatePlanMessage[],
): RuntimeLiveReadGatePlanSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    requiredRuntimeGateArtifactCount: REQUIRED_RUNTIME_GATE_ARTIFACTS.length,
    declaredOperatorEvidenceSourceCount: 2,
    javaDeclaredPortCount: sourceNodeV388Replay.javaDeclaredPortCount,
    miniKvDeclaredPortHandleCount: sourceNodeV388Replay.miniKvDeclaredPortHandleCount,
    javaGetOnlySmokeTargetCount: sourceNodeV388Replay.javaGetOnlySmokeTargetCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(checks: RuntimeLiveReadGatePlanChecks): RuntimeLiveReadGatePlanMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV389Ready, "SOURCE_NODE_V389_NOT_READY", "node-v389", "Node v389 must be ready for v390 runtime gate planning."],
    [checks.sourceNodeV389ArchiveVerified, "SOURCE_NODE_V389_ARCHIVE_NOT_VERIFIED", "node-v389", "Node v389 archive verification must be complete."],
    [checks.sourceNodeV389ChecksAllPassed, "SOURCE_NODE_V389_CHECKS_NOT_PASSED", "node-v389", "Node v389 source and replay checks must pass."],
    [checks.sourceNodeV389ReplayReady, "SOURCE_NODE_V389_REPLAY_FAILED", "node-v389", "Node v389 must replay from frozen archive evidence."],
    [checks.sourceNodeV388DeclaredEvidenceReady, "SOURCE_NODE_V388_DECLARED_EVIDENCE_NOT_READY", "node-v388", "Node v388 declared lifecycle evidence must be ready."],
    [checks.sourceNodeV388UsesFrozenHistoricalSnapshots, "SOURCE_NODE_V388_NOT_FROZEN", "historical-fixtures", "Node v388 replay must use frozen historical snapshots."],
    [checks.javaLifecyclePlanComplete, "JAVA_RUNTIME_PLAN_INCOMPLETE", "java-v161", "Java v161 must declare startup, port, and GET-only smoke evidence."],
    [checks.javaStartupOwnershipDeclared, "JAVA_NODE_LIFECYCLE_ALLOWED", "java-v161", "Node must not be allowed to start or stop Java from this plan."],
    [checks.miniKvLifecyclePlanComplete, "MINI_KV_RUNTIME_PLAN_INCOMPLETE", "mini-kv-v152", "mini-kv v152 must declare startup, port, and runtime prerequisites."],
    [checks.miniKvRequiresSeparateRuntimeGate, "MINI_KV_SEPARATE_RUNTIME_GATE_MISSING", "mini-kv-v152", "mini-kv v152 must require a separate runtime gate."],
    [checks.runtimeGatePlanDoesNotApproveRuntime, "RUNTIME_GATE_ALREADY_APPROVED", "runtime-boundary", "v390 must not approve runtime or assign ports."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v390 must not start or stop sibling services."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v390 must not mutate sibling state."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPENED", "runtime-boundary", "v390 must not connect to managed audit."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): RuntimeLiveReadGatePlanMessage[] {
  return [{
    code: "RUNTIME_LIVE_READ_GATE_PLAN_IS_NOT_EXECUTION",
    severity: "warning",
    source: "node-v390",
    message: "v390 writes a separate runtime gate plan only; it does not start Java, start mini-kv, or run probes.",
  }];
}

function collectRecommendations(ready: boolean): RuntimeLiveReadGatePlanMessage[] {
  return [{
    code: ready ? "ARCHIVE_V390_BEFORE_RUNTIME_PACKET" : "REPAIR_V390_PREREQUISITES_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v390",
    message: ready
      ? "Archive and verify v390 before preparing any runtime execution packet."
      : "Repair v389/v388 prerequisites before preparing a runtime gate plan.",
  }];
}

function readProjectJson(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return null;
  }
  try {
    return JSON.parse(stripBom(readFileSync(absolutePath, "utf8"))) as Record<string, unknown>;
  } catch {
    return null;
  }
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
