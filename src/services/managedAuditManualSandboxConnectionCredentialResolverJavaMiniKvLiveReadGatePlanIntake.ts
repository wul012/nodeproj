import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createJavaLiveReadGatePlan,
  createLiveReadGatePlanEvidenceFileReference,
  createMiniKvFrozenConsumerHandoff,
  createMiniKvLiveReadGatePlan,
  readHistoricalJson,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeEvidence.js";
import type {
  JavaLiveReadGatePlanReference,
  LiveReadGatePlanEvidenceFileReference,
  LiveReadGatePlanIntakeChecks,
  LiveReadGatePlanIntakeMessage,
  LiveReadGatePlanIntakeRecord,
  LiveReadGatePlanIntakeSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeProfile,
  MiniKvFrozenConsumerHandoffReference,
  MiniKvLiveReadGatePlanReference,
  SourceNodeV383ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake";
const SOURCE_NODE_V383_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v383-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v384-post-java-mini-kv-live-read-gate-plan-intake-roadmap.md";
const SOURCE_NODE_V383_ARCHIVE =
  "e/383/evidence/java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verification-v383-http.json";
const JAVA_V159_LIVE_READ_GATE_PLAN =
  "D:/javaproj/advanced-order-platform/e/159/evidence/java-shard-readiness-live-read-gate-plan-v159.json";
const JAVA_V159_LIVE_READ_GATE_PLAN_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/159/evidence/java-shard-readiness-live-read-gate-plan-v159.json";
const MINI_KV_V150_LIVE_READ_GATE_PLAN =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v150.json";
const MINI_KV_V150_LIVE_READ_GATE_PLAN_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json";
const MINI_KV_V149_FROZEN_CONSUMER_HANDOFF =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v149.json";
const MINI_KV_V149_FROZEN_CONSUMER_HANDOFF_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v149.json";

interface ParsedLiveReadGatePlanEvidence {
  sourceNodeV383Json: Record<string, unknown> | null;
  javaLiveReadGatePlanJson: Record<string, unknown> | null;
  miniKvLiveReadGatePlanJson: Record<string, unknown> | null;
  miniKvFrozenConsumerHandoffJson: Record<string, unknown> | null;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaLiveReadGatePlanFile = createLiveReadGatePlanEvidenceFileReference("java-v159-live-read-gate-plan",
    JAVA_V159_LIVE_READ_GATE_PLAN, JAVA_V159_LIVE_READ_GATE_PLAN_FALLBACK);
  const miniKvLiveReadGatePlanFile = createLiveReadGatePlanEvidenceFileReference("mini-kv-v150-live-read-gate-plan",
    MINI_KV_V150_LIVE_READ_GATE_PLAN, MINI_KV_V150_LIVE_READ_GATE_PLAN_FALLBACK);
  const miniKvFrozenConsumerHandoffFile = createLiveReadGatePlanEvidenceFileReference(
    "mini-kv-v149-frozen-consumer-handoff",
    MINI_KV_V149_FROZEN_CONSUMER_HANDOFF, MINI_KV_V149_FROZEN_CONSUMER_HANDOFF_FALLBACK);
  const parsed: ParsedLiveReadGatePlanEvidence = {
    sourceNodeV383Json: readProjectJson(projectRoot, SOURCE_NODE_V383_ARCHIVE),
    javaLiveReadGatePlanJson: readHistoricalJson(JAVA_V159_LIVE_READ_GATE_PLAN),
    miniKvLiveReadGatePlanJson: readHistoricalJson(MINI_KV_V150_LIVE_READ_GATE_PLAN),
    miniKvFrozenConsumerHandoffJson: readHistoricalJson(MINI_KV_V149_FROZEN_CONSUMER_HANDOFF),
  };
  const sourceNodeV383 = createSourceNodeV383(parsed.sourceNodeV383Json);
  const javaLiveReadGatePlan = createJavaLiveReadGatePlan(parsed.javaLiveReadGatePlanJson);
  const miniKvLiveReadGatePlan = createMiniKvLiveReadGatePlan(parsed.miniKvLiveReadGatePlanJson);
  const miniKvFrozenConsumerHandoff = createMiniKvFrozenConsumerHandoff(parsed.miniKvFrozenConsumerHandoffJson);
  const draftIntake = createIntake(sourceNodeV383, javaLiveReadGatePlanFile, miniKvLiveReadGatePlanFile,
    miniKvFrozenConsumerHandoffFile, false);
  const checks = createChecks(
    sourceNodeV383,
    javaLiveReadGatePlanFile,
    miniKvLiveReadGatePlanFile,
    miniKvFrozenConsumerHandoffFile,
    javaLiveReadGatePlan,
    miniKvLiveReadGatePlan,
    miniKvFrozenConsumerHandoff,
    draftIntake,
  );
  checks.readyForJavaMiniKvLiveReadGatePlanIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvLiveReadGatePlanIntake")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvLiveReadGatePlanIntake;
  const intake = createIntake(sourceNodeV383, javaLiveReadGatePlanFile, miniKvLiveReadGatePlanFile,
    miniKvFrozenConsumerHandoffFile, ready);
  checks.intakeDigestStable = isDigest(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaLiveReadGatePlan, miniKvLiveReadGatePlan, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver Java/mini-kv live-read gate plan intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-live-read-gate-plan-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v159-and-mini-kv-v150-live-read-gate-plan-evidence" : "blocked",
    readyForJavaMiniKvLiveReadGatePlanIntake: ready,
    readyForNodeV385ArchiveVerification: ready,
    activeNodeVersion: "Node v384",
    sourceNodeVersion: "Node v383",
    evidenceIntakeOnly: true,
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
    sourceNodeV383,
    javaLiveReadGatePlanFile,
    miniKvLiveReadGatePlanFile,
    miniKvFrozenConsumerHandoffFile,
    javaLiveReadGatePlan,
    miniKvLiveReadGatePlan,
    miniKvFrozenConsumerHandoff,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      liveReadGatePlanIntakeJson: ROUTE_PATH,
      liveReadGatePlanIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV383Json: SOURCE_NODE_V383_ROUTE,
      sourceNodeV383Markdown: `${SOURCE_NODE_V383_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v385",
    },
    nextActions: ready
      ? [
        "Use Node v385 to archive and verify the v384 live-read gate plan intake.",
        "Keep Java and mini-kv in recommended parallel mode until an operator-owned service lifecycle plan exists.",
        "Do not run runtime probes, start services, or enable active shard routing from this evidence intake.",
      ]
      : [
        "Repair missing Node v383, Java v159, or mini-kv v150 frozen evidence before retrying v384.",
        "Do not substitute mini-kv rolling current evidence for a frozen v150 historical snapshot.",
      ],
  };
}

function createSourceNodeV383(json: Record<string, unknown> | null): SourceNodeV383ArchiveVerificationReference {
  return {
    sourceVersion: "Node v383",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification:
      valueAt(json, "readyForActiveShardPlanBoundaryHandoffIntakeArchiveVerification") === true,
    readyForNodeV384NextBoundaryEvidenceOrLiveGate:
      valueAt(json, "readyForNodeV384NextBoundaryEvidenceOrLiveGate") === true,
    activeNodeVersion: "Node v383",
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    archiveVerificationDigest: stringValue(valueAt(json, "archiveVerification", "archiveVerificationDigest")),
    sourceCheckCount: numberValue(valueAt(json, "summary", "sourceCheckCount")),
    sourcePassedCheckCount: numberValue(valueAt(json, "summary", "sourcePassedCheckCount")),
    replayCheckCount: numberValue(valueAt(json, "summary", "replayCheckCount")),
    replayPassedCheckCount: numberValue(valueAt(json, "summary", "replayPassedCheckCount")),
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

function createIntake(
  source: SourceNodeV383ArchiveVerificationReference,
  javaLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvFrozenConsumerHandoffFile: LiveReadGatePlanEvidenceFileReference,
  ready: boolean,
): LiveReadGatePlanIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-live-read-gate-plan-intake" as const,
    sourceSpan: "Node v383 + Java v159 + mini-kv v150" as const,
    sourceNodeV383Digest: source.archiveVerificationDigest,
    javaV159Digest: javaLiveReadGatePlanFile.digest,
    miniKvV150Digest: miniKvLiveReadGatePlanFile.digest,
    miniKvV149Digest: miniKvFrozenConsumerHandoffFile.digest,
    usesFrozenJavaV159LiveReadGatePlan: javaLiveReadGatePlanFile.usedHistoricalFallback,
    usesFrozenMiniKvV150LiveReadGatePlan: miniKvLiveReadGatePlanFile.usedHistoricalFallback,
    verifiesMiniKvV149FrozenConsumerHandoff: miniKvFrozenConsumerHandoffFile.usedHistoricalFallback,
    consumesRollingCurrentAsHistoricalBaseline: false as const,
    liveReadGateAllowed: false as const,
    runtimeProbeAllowed: false as const,
    activeShardPrototypeEnabled: false as const,
    ready,
  };
  return {
    ...record,
    intakeDigest: sha256StableJson(record),
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v385",
  };
}

function createChecks(
  source: SourceNodeV383ArchiveVerificationReference,
  javaLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvFrozenConsumerHandoffFile: LiveReadGatePlanEvidenceFileReference,
  java: JavaLiveReadGatePlanReference,
  miniKv: MiniKvLiveReadGatePlanReference,
  miniKvFrozenConsumerHandoff: MiniKvFrozenConsumerHandoffReference,
  intake: LiveReadGatePlanIntakeRecord,
): LiveReadGatePlanIntakeChecks {
  return {
    ...sourceArchiveChecks(source),
    ...javaPlanChecks(javaLiveReadGatePlanFile, java),
    ...miniKvSurfaceChecks(miniKvLiveReadGatePlanFile, miniKv),
    ...miniKvConsumerChecks(miniKv),
    ...miniKvPrerequisiteChecks(miniKv),
    ...miniKvFreezeChecks(miniKvLiveReadGatePlanFile, miniKv),
    ...frozenHandoffChecks(miniKvFrozenConsumerHandoffFile, miniKvFrozenConsumerHandoff),
    ...intakeBoundaryChecks(
      javaLiveReadGatePlanFile,
      miniKvLiveReadGatePlanFile,
      miniKvFrozenConsumerHandoffFile,
      intake,
    ),
  };
}

function sourceArchiveChecks(source: SourceNodeV383ArchiveVerificationReference) {
  return {
    sourceNodeV383Ready: source.readyForNodeV384NextBoundaryEvidenceOrLiveGate,
    sourceNodeV383ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-active-shard-plan-boundary-handoff-intake-archive-verified",
    sourceNodeV383ChecksAllPassed:
      source.sourceCheckCount > 0
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount > 0
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    sourceNodeV383BoundariesClosed:
      source.archiveVerificationOnly && !source.rerunsLiveRead && !source.startsJavaService && !source.startsMiniKvService
      && !source.stopsJavaService && !source.stopsMiniKvService && !source.connectsManagedAudit
      && !source.executionAllowed && !source.activeShardPrototypeEnabled,
  };
}

function javaPlanChecks(
  javaLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  java: JavaLiveReadGatePlanReference,
) {
  return {
    javaV159FilePresent: javaLiveReadGatePlanFile.exists,
    javaV159VersionValid: java.version === "Java v159",
    javaV159ReadOnly: java.readOnly,
    javaV159ExecutionBlocked: !java.executionAllowed,
    javaV159LiveReadGateClosed: !java.liveReadGateAllowed,
    javaV159ServiceLifecycleNotOwnedByNode: !java.serviceStartAllowedByNode && !java.serviceStopAllowedByNode,
    javaV159FailClosedRequired: java.failClosedRequired,
    javaV159ReferencesV158AndNodeV383:
      java.sourceBoundaryHandoffVersion === "Java v158"
      && java.lastVerifiedByNodeVersion === "Node v383"
      && java.nextNodeConsumerHint === "Node v384",
    javaV159OwnershipFieldsComplete:
      includesAll(java.requiredServiceOwnershipFields, [
        "java-service-owner",
        "java-base-url-or-port",
        "java-start-command-owner",
        "java-stop-responsibility",
        "node-smoke-timeout-and-fail-closed-policy",
      ]),
    javaV159LifecyclePlanSafe:
      java.javaServiceLifecyclePlan.includes("node-may-not-start-java-from-this-plan")
      && java.javaServiceLifecyclePlan.includes("java-operator-starts-service-before-live-read-window")
      && java.javaServiceLifecyclePlan.includes("node-probes-get-only-smoke-targets-after-service-owner-confirms-readiness")
      && java.javaServiceLifecyclePlan.includes("operator-stops-java-service-after-window-if-operator-started-it"),
    javaV159SmokeTargetsReadOnlyGet:
      java.smokeTargets.length >= 2
      && java.smokeTargets.every((target) => target.startsWith("GET "))
      && java.smokeTargets.includes("GET /actuator/health")
      && java.smokeTargets.includes("GET /api/v1/ops/shard-readiness/live-read-gate-plan"),
    javaV159FailClosedRulesComplete:
      includesAll(java.failClosedRules, [
        "missing-service-owner-blocks-live-read",
        "missing-port-or-base-url-blocks-live-read",
        "non-get-request-blocks-live-read",
        "failed-smoke-blocks-node-consumption",
        "cleanup-owner-missing-blocks-live-read",
      ]),
    javaV159CleanupResponsibilitiesSafe:
      java.cleanupResponsibilities.includes("node-must-not-stop-pre-existing-java-service")
      && java.cleanupResponsibilities.includes("node-may-close-only-processes-it-started-in-a-separate-approved-plan")
      && java.cleanupResponsibilities.includes("archive-smoke-output-before-service-cleanup"),
    javaV159StopConditionsSafe:
      includesAll(java.stopConditions, [
        "request-would-start-java-without-service-owner",
        "request-would-start-mini-kv-without-service-owner",
        "request-would-enable-active-shard-router-or-write-routing",
        "request-would-read-credential-or-raw-endpoint-value",
        "request-would-run-non-get-smoke",
      ]),
    javaV159StatusPassed: java.status === "passed",
  };
}

function miniKvSurfaceChecks(
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKv: MiniKvLiveReadGatePlanReference,
) {
  return {
    miniKvV150FilePresent: miniKvLiveReadGatePlanFile.exists,
    miniKvV150ReleaseVersionValid: miniKv.releaseVersion === "v150",
    miniKvV150ReadOnly: miniKv.readOnly,
    miniKvV150ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV150ShardDisabled: !miniKv.shardEnabled,
    miniKvV150StatusAccepted: miniKv.status === "live-read-gate-prerequisite-read-only",
    miniKvV150BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.setnxexExecutionAllowed && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
      && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated,
  };
}

function miniKvConsumerChecks(miniKv: MiniKvLiveReadGatePlanReference) {
  return {
    miniKvV150ConsumerHandoffReady:
      miniKv.consumerHandoffMode === "frozen-evidence-only"
      && miniKv.consumerFrozenReleaseVersion === "v149"
      && miniKv.consumerFrozenFixturePath === "fixtures/release/shard-readiness-v149.json"
      && miniKv.readyForNodeConsumption
      && miniKv.liveReadGateRequiredBeforeRuntimeProbe
      && !miniKv.consumerStartsServices
      && !miniKv.consumerActiveShardPrototypeEnabled
      && !miniKv.consumerRouterActivationAllowed
      && !miniKv.consumerWriteRoutingAllowed
      && !miniKv.consumerExecutionAllowed,
  };
}

function miniKvPrerequisiteChecks(miniKv: MiniKvLiveReadGatePlanReference) {
  return {
    miniKvV150LiveReadGatePlanPrerequisiteOnly:
      miniKv.liveReadGatePlanMode === "service-lifecycle-prerequisite-only"
      && !miniKv.liveReadGateAllowed
      && !miniKv.runtimeProbeAllowed
      && !miniKv.liveReadGateStartsServices
      && !miniKv.liveReadGateRouterActivationAllowed
      && !miniKv.liveReadGateWriteRoutingAllowed
      && !miniKv.liveReadGateExecutionAllowed,
    miniKvV150RequiresServicePlanFields:
      miniKv.requiresServiceOwner
      && miniKv.requiresPortList
      && miniKv.requiresSmokeTarget
      && miniKv.requiresFailClosedBehavior
      && miniKv.requiresCleanup
      && includesAll(miniKv.requiredBeforeLiveRead, [
        "explicit live-read gate plan",
        "service owner and startup command",
        "port list and conflict behavior",
        "read-only smoke target",
        "fail-closed missing evidence behavior",
        "cleanup responsibility and stop command",
      ]),
  };
}

function miniKvFreezeChecks(
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKv: MiniKvLiveReadGatePlanReference,
) {
  return {
    miniKvV150ActivePlanStillDisabled:
      !miniKv.activeShardPrototypeAllowed && !miniKv.routerActivationAllowed && !miniKv.shardDirectoryCreationAllowed
      && !miniKv.multiProcessStartAllowed && !miniKv.writeRoutingAllowed,
    miniKvV150ActivePlanFreezeSafe:
      miniKv.activePlanFreezeFrozenReleaseVersion === "v149"
      && miniKv.activePlanFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v149.json"
      && miniKv.activePlanFreezePreservesActivePrototypePlan
      && !miniKv.activePlanFreezeRouterActivationAllowed
      && !miniKv.activePlanFreezeWriteRoutingAllowed
      && !miniKv.activePlanFreezeRollingCurrentUsedForFrozenBaseline,
    miniKvV150HistoricalFallbackSafe:
      miniKv.previousConsumedReleaseVersion === "v149"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v149.json"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && miniKv.nodeV383ArchiveVerificationPreserved
      && !miniKv.nodeV384ReadsUnfinishedUpstream,
    miniKvV150PreservesNodeV383Archive:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v383"),
    miniKvV150NoRollingCurrentBaseline:
      miniKvLiveReadGatePlanFile.configuredPath.endsWith("shard-readiness-v150.json")
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && !miniKv.activePlanFreezeRollingCurrentUsedForFrozenBaseline,
  };
}

function frozenHandoffChecks(
  miniKvFrozenConsumerHandoffFile: LiveReadGatePlanEvidenceFileReference,
  miniKvFrozenConsumerHandoff: MiniKvFrozenConsumerHandoffReference,
) {
  return {
    miniKvV149FrozenConsumerEvidencePresent: miniKvFrozenConsumerHandoffFile.exists,
    miniKvV149FrozenConsumerEvidenceSafe:
      miniKvFrozenConsumerHandoff.project === "mini-kv"
      && miniKvFrozenConsumerHandoff.releaseVersion === "v149"
      && miniKvFrozenConsumerHandoff.readOnly
      && !miniKvFrozenConsumerHandoff.executionAllowed
      && !miniKvFrozenConsumerHandoff.shardEnabled
      && miniKvFrozenConsumerHandoff.status === "frozen-evidence-handoff-read-only"
      && miniKvFrozenConsumerHandoff.consumerHandoffMode === "frozen-evidence-only"
      && miniKvFrozenConsumerHandoff.consumerFrozenReleaseVersion === "v148"
      && miniKvFrozenConsumerHandoff.readyForNodeConsumption
      && miniKvFrozenConsumerHandoff.liveReadGateRequiredBeforeRuntimeProbe
      && !miniKvFrozenConsumerHandoff.consumerStartsServices
      && !miniKvFrozenConsumerHandoff.consumerActiveShardPrototypeEnabled
      && !miniKvFrozenConsumerHandoff.consumerRouterActivationAllowed
      && !miniKvFrozenConsumerHandoff.consumerWriteRoutingAllowed
      && !miniKvFrozenConsumerHandoff.consumerExecutionAllowed,
  };
}

function intakeBoundaryChecks(
  javaLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvLiveReadGatePlanFile: LiveReadGatePlanEvidenceFileReference,
  miniKvFrozenConsumerHandoffFile: LiveReadGatePlanEvidenceFileReference,
  intake: LiveReadGatePlanIntakeRecord,
) {
  return {
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaLiveReadGatePlanFile.usedHistoricalFallback
      && miniKvLiveReadGatePlanFile.usedHistoricalFallback
      && miniKvFrozenConsumerHandoffFile.usedHistoricalFallback,
    intakeDigestStable: isDigest(intake.intakeDigest),
    noAutomaticUpstreamStartStop: !intake.startsUpstreamServices && !intake.stopsUpstreamServices,
    noUpstreamMutation: !intake.writesUpstreamState,
    noManagedAuditConnection: !intake.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForJavaMiniKvLiveReadGatePlanIntake: false,
  };
}

function createSummary(
  java: JavaLiveReadGatePlanReference,
  miniKv: MiniKvLiveReadGatePlanReference,
  checks: LiveReadGatePlanIntakeChecks,
  productionBlockers: readonly LiveReadGatePlanIntakeMessage[],
  warnings: readonly LiveReadGatePlanIntakeMessage[],
  recommendations: readonly LiveReadGatePlanIntakeMessage[],
): LiveReadGatePlanIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [
      java.status === "passed",
      miniKv.status === "live-read-gate-prerequisite-read-only" && miniKv.readyForNodeConsumption,
      checks.miniKvV149FrozenConsumerEvidenceSafe,
    ].filter(Boolean).length,
    javaOwnershipFieldCount: java.requiredServiceOwnershipFields.length,
    javaSmokeTargetCount: java.smokeTargets.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    miniKvRequiredBeforeLiveReadCount: miniKv.requiredBeforeLiveRead.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(checks: LiveReadGatePlanIntakeChecks): LiveReadGatePlanIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV383Ready, "SOURCE_NODE_V383_NOT_READY", "node-v383", "Node v383 must be ready for v384 intake."],
    [checks.sourceNodeV383ArchiveVerified, "SOURCE_NODE_V383_ARCHIVE_NOT_VERIFIED", "node-v383", "Node v383 archive verification must be complete."],
    [checks.sourceNodeV383ChecksAllPassed, "SOURCE_NODE_V383_CHECKS_NOT_PASSED", "node-v383", "Node v383 source and replay checks must pass."],
    [checks.javaV159FilePresent, "JAVA_V159_GATE_PLAN_MISSING", "java-v159", "Java v159 live-read gate plan evidence must be frozen."],
    [checks.javaV159ServiceLifecycleNotOwnedByNode, "JAVA_V159_LIFECYCLE_OWNED_BY_NODE", "java-v159", "v384 must not own Java service start or stop."],
    [checks.javaV159OwnershipFieldsComplete, "JAVA_V159_OWNERSHIP_FIELDS_INCOMPLETE", "java-v159", "Java v159 must require owner, port, smoke, timeout, and cleanup fields."],
    [checks.javaV159SmokeTargetsReadOnlyGet, "JAVA_V159_SMOKE_TARGETS_UNSAFE", "java-v159", "Java v159 smoke targets must be GET-only."],
    [checks.javaV159StopConditionsSafe, "JAVA_V159_STOP_CONDITIONS_UNSAFE", "java-v159", "Java v159 must fail closed on service, credential, and non-GET requests."],
    [checks.miniKvV150FilePresent, "MINI_KV_V150_GATE_PLAN_MISSING", "mini-kv-v150", "mini-kv v150 live-read gate plan evidence must be frozen."],
    [checks.miniKvV150LiveReadGatePlanPrerequisiteOnly, "MINI_KV_V150_GATE_PLAN_OPENED", "mini-kv-v150", "mini-kv v150 must remain prerequisite-only."],
    [checks.miniKvV150RequiresServicePlanFields, "MINI_KV_V150_SERVICE_FIELDS_INCOMPLETE", "mini-kv-v150", "mini-kv v150 must require owner, port, smoke, fail-closed, and cleanup fields."],
    [checks.miniKvV150BoundarySafe, "MINI_KV_V150_BOUNDARY_UNSAFE", "mini-kv-v150", "mini-kv v150 must keep write, admin, storage, router, and process mutation disabled."],
    [checks.miniKvV149FrozenConsumerEvidenceSafe, "MINI_KV_V149_FROZEN_HANDOFF_INVALID", "mini-kv-v149", "mini-kv v149 frozen consumer handoff must remain read-only and service-free."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v384 inputs must resolve to frozen historical snapshots."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v384 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v384 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): LiveReadGatePlanIntakeMessage[] {
  return [{
    code: "LIVE_READ_GATE_PLAN_IS_NOT_LIVE_READ",
    severity: "warning",
    source: "node-v384",
    message: "v384 consumes frozen gate-plan evidence only; it does not run Java, mini-kv, or runtime probes.",
  }];
}

function collectRecommendations(ready: boolean): LiveReadGatePlanIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V384_BEFORE_ANY_RUNTIME_GATE" : "REPAIR_GATE_PLAN_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v384",
    message: ready
      ? "Archive and verify v384 before considering any operator-owned live-read runtime gate."
      : "Repair missing frozen gate-plan evidence before rerunning v384.",
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
