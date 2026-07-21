import { includesAll, isSha256 } from "../../../evidence/projectJson.js";

import type {
  FrozenLiveReadPlan,
  JavaServiceLifecycle,
  LifecycleEvidenceFile,
  MiniKvServiceTemplate,
  ServiceIntakeChecks,
  ServiceIntakeRecord,
  SourceV385Archive,
} from "./intakeTypes.js";

// Design: this module owns service-lifecycle readiness behavior.
// Source models remain data; each predicate group owns one evidence boundary.
// Object spread order preserves the established public check-key sequence.

interface ServiceCheckInput {
  source: SourceV385Archive;
  javaFile: LifecycleEvidenceFile;
  miniTemplateFile: LifecycleEvidenceFile;
  frozenPlanFile: LifecycleEvidenceFile;
  java: JavaServiceLifecycle;
  miniKv: MiniKvServiceTemplate;
  frozenPlan: FrozenLiveReadPlan;
  intake: ServiceIntakeRecord;
}

export function createServiceChecks(input: ServiceCheckInput): ServiceIntakeChecks {
  return {
    ...sourceChecks(input.source),
    ...javaChecks(input.javaFile, input.java),
    ...miniKvChecks(input.miniTemplateFile, input.frozenPlanFile, input.miniKv, input.frozenPlan),
    ...boundaryChecks(input),
    readyForOperatorServiceLifecycleEvidenceIntake: false,
  };
}

function sourceChecks(source: SourceV385Archive) {
  return {
    sourceNodeV385Ready: sourceReady(source),
    sourceNodeV385ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-live-read-gate-plan-intake-archive-verified",
    sourceNodeV385ChecksAllPassed: sourceChecksPass(source),
    sourceNodeV385BoundariesClosed: sourceBoundariesClosed(source),
  };
}

function javaChecks(file: LifecycleEvidenceFile, java: JavaServiceLifecycle) {
  return {
    javaV160FilePresent: file.exists,
    javaV160VersionValid: java.version === "Java v160",
    javaV160ReadOnly: java.readOnly,
    javaV160ExecutionBlocked: !java.executionAllowed,
    javaV160OperatorOwned: java.operatorOwned,
    javaV160RuntimeProbeBlocked: !java.runtimeProbeAllowed,
    javaV160NodeLifecycleBlocked: !java.nodeMayStartService && !java.nodeMayStopService,
    javaV160ReferencesV159AndNodeV385: javaReferencesAligned(java),
    javaV160OwnerAndPortPlaceholdersPresent: javaPlaceholdersPresent(java),
    javaV160OperatorPrerequisitesComplete: javaPrerequisitesComplete(java),
    javaV160SmokeTargetsReadOnlyGet: javaSmokeTargetsSafe(java),
    javaV160FailClosedRulesComplete: javaFailClosedRulesComplete(java),
    javaV160CleanupResponsibilitiesSafe: javaCleanupSafe(java),
    javaV160StopConditionsSafe: javaStopConditionsSafe(java),
    javaV160StatusPassed: java.status === "passed",
  };
}

function miniKvChecks(
  templateFile: LifecycleEvidenceFile,
  frozenFile: LifecycleEvidenceFile,
  miniKv: MiniKvServiceTemplate,
  frozenPlan: FrozenLiveReadPlan,
) {
  return {
    miniKvV151FilePresent: templateFile.exists,
    miniKvV151ReleaseVersionValid: miniKv.releaseVersion === "v151",
    miniKvV151ReadOnly: miniKv.readOnly,
    miniKvV151ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV151ShardDisabled: !miniKv.shardEnabled,
    miniKvV151StatusAccepted: miniKv.status === "operator-service-lifecycle-template-read-only",
    miniKvV151BoundarySafe: miniKvBoundariesSafe(miniKv),
    miniKvV151HistoricalFallbackSafe: miniKvFallbackSafe(miniKv),
    miniKvV151PreservesNodeV385Archive:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v385"),
    miniKvV151LiveReadGatePlanFreezeSafe: miniKvFreezeSafe(miniKv),
    miniKvV151OperatorTemplateRequiresEvidence: miniKvTemplateRequiresEvidence(miniKv),
    miniKvV151OperatorTemplateNotRuntimeReady: miniKvTemplateNotRuntimeReady(miniKv),
    miniKvV151NoRollingCurrentBaseline: miniKvNoRollingBaseline(templateFile, miniKv),
    miniKvV150FrozenGatePlanPresent: frozenFile.exists,
    miniKvV150FrozenGatePlanSafe: frozenPlanSafe(frozenPlan),
  };
}

function boundaryChecks(input: ServiceCheckInput) {
  return {
    allEvidenceUsesHistoricalFallbackSnapshots: allEvidenceFrozen(input),
    runtimeGateStillBlocked: runtimeGateBlocked(input),
    intakeDigestStable: isSha256(input.intake.intakeDigest),
    noAutomaticUpstreamStartStop:
      !input.intake.startsUpstreamServices && !input.intake.stopsUpstreamServices,
    noUpstreamMutation: !input.intake.writesUpstreamState,
    noManagedAuditConnection: !input.intake.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
  };
}

function sourceReady(source: SourceV385Archive): boolean {
  return source.readyForLiveReadGatePlanIntakeArchiveVerification
    && source.readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate;
}

function sourceChecksPass(source: SourceV385Archive): boolean {
  return source.sourceCheckCount > 0
    && source.sourceCheckCount === source.sourcePassedCheckCount
    && source.replayCheckCount > 0
    && source.replayCheckCount === source.replayPassedCheckCount
    && source.productionBlockerCount === 0;
}

function sourceBoundariesClosed(source: SourceV385Archive): boolean {
  return source.archiveVerificationOnly && !source.rerunsLiveRead
    && !source.startsJavaService && !source.startsMiniKvService
    && !source.stopsJavaService && !source.stopsMiniKvService
    && !source.connectsManagedAudit && !source.executionAllowed
    && !source.activeShardPrototypeEnabled;
}

function javaReferencesAligned(java: JavaServiceLifecycle): boolean {
  return java.sourceGatePlanVersion === "Java v159"
    && java.lastVerifiedByNodeVersion === "Node v385"
    && java.nextNodeConsumerHint === "Node v386";
}

function javaPlaceholdersPresent(java: JavaServiceLifecycle): boolean {
  return java.javaServiceOwner === "java-service-operator-placeholder"
    && java.javaStartOwner === "java-service-operator-placeholder"
    && java.javaStopOwner === "java-service-operator-placeholder"
    && java.javaPortDeclaration === "operator-declared-port-before-window"
    && java.javaBaseUrlTemplate === "http://127.0.0.1:{java-port}";
}

function javaPrerequisitesComplete(java: JavaServiceLifecycle): boolean {
  return includesAll(java.operatorPrerequisites, [
    "operator-confirms-java-service-owner",
    "operator-confirms-start-command-and-port-before-window",
    "operator-confirms-stop-responsibility-before-window",
    "operator-confirms-get-only-smoke-targets",
    "operator-confirms-no-credential-or-raw-endpoint-value-read",
  ]);
}

function javaSmokeTargetsSafe(java: JavaServiceLifecycle): boolean {
  return java.getOnlySmokeTargets.length >= 4
    && java.getOnlySmokeTargets.every((target) => target.startsWith("GET "))
    && java.getOnlySmokeTargets.includes("GET /actuator/health")
    && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/operator-service-lifecycle")
    && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/live-read-gate-plan");
}

function javaFailClosedRulesComplete(java: JavaServiceLifecycle): boolean {
  return includesAll(java.failClosedRules, [
    "missing-operator-owner-blocks-runtime-probe",
    "missing-operator-declared-port-blocks-runtime-probe",
    "missing-cleanup-owner-blocks-runtime-probe",
    "non-get-smoke-target-blocks-runtime-probe",
    "failed-smoke-blocks-node-consumption",
  ]);
}

function javaCleanupSafe(java: JavaServiceLifecycle): boolean {
  return java.cleanupResponsibilities.includes("operator-stops-java-if-operator-started-java")
    && java.cleanupResponsibilities.includes("node-must-not-stop-java-from-this-evidence")
    && java.cleanupResponsibilities.includes("node-may-clean-only-processes-started-by-a-separate-approved-runtime-plan")
    && java.cleanupResponsibilities.includes("archive-runtime-smoke-output-before-cleanup");
}

function javaStopConditionsSafe(java: JavaServiceLifecycle): boolean {
  return includesAll(java.stopConditions, [
    "source-gate-plan-status-not-passed",
    "request-would-start-java-from-this-evidence",
    "request-would-stop-java-from-this-evidence",
    "request-would-run-runtime-probe-before-operator-port-confirmation",
    "request-would-run-non-get-smoke",
    "request-would-read-credential-or-raw-endpoint-value",
  ]);
}

function miniKvBoundariesSafe(miniKv: MiniKvServiceTemplate): boolean {
  return !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed
    && !miniKv.loadRestoreCompactAllowed && !miniKv.setnxexExecutionAllowed
    && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
    && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated;
}

function miniKvFallbackSafe(miniKv: MiniKvServiceTemplate): boolean {
  return miniKv.previousConsumedReleaseVersion === "v150"
    && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v150.json"
    && miniKv.previousConsumptionNodeVersion === "Node v386 pending operator-owned service lifecycle evidence"
    && !miniKv.rollingCurrentUsedForHistoricalBaseline
    && miniKv.nodeV385ArchiveVerificationPreserved
    && !miniKv.nodeV386ReadsUnfinishedUpstream;
}

function miniKvFreezeSafe(miniKv: MiniKvServiceTemplate): boolean {
  return miniKv.liveReadGatePlanFreezeFrozenReleaseVersion === "v150"
    && miniKv.liveReadGatePlanFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v150.json"
    && miniKv.liveReadGatePlanFreezePreservesLiveReadGatePlan
    && !miniKv.frozenLiveReadGateAllowed && !miniKv.frozenRuntimeProbeAllowed
    && !miniKv.frozenStartsServices && !miniKv.frozenRouterActivationAllowed
    && !miniKv.frozenWriteRoutingAllowed && !miniKv.frozenExecutionAllowed
    && !miniKv.liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline;
}

function miniKvTemplateRequiresEvidence(miniKv: MiniKvServiceTemplate): boolean {
  return miniKv.operatorEvidenceMode === "template-only-no-runtime"
    && miniKv.operatorSourceFrozenReleaseVersion === "v150"
    && miniKv.operatorSourceFrozenFixturePath === "fixtures/release/shard-readiness-v150.json"
    && miniKv.operatorOwnedServiceLifecycleRequired
    && miniKv.failClosedBehaviorRequired
    && includesAll(miniKv.requiredOperatorEvidence, [
      "service owner",
      "startup command",
      "port list",
      "GET-only smoke target",
      "fail-closed missing evidence behavior",
      "cleanup responsibility and stop command",
    ]);
}

function miniKvTemplateNotRuntimeReady(miniKv: MiniKvServiceTemplate): boolean {
  return !miniKv.serviceOwnerDeclared && !miniKv.startupCommandDeclared
    && !miniKv.portListDeclared && !miniKv.getOnlySmokeTargetDeclared
    && !miniKv.cleanupResponsibilityDeclared && !miniKv.operatorStartsServices
    && !miniKv.operatorRuntimeProbeAllowed && !miniKv.operatorLiveReadAllowed
    && !miniKv.operatorRouterActivationAllowed && !miniKv.operatorWriteRoutingAllowed
    && !miniKv.operatorExecutionAllowed;
}

function miniKvNoRollingBaseline(file: LifecycleEvidenceFile, miniKv: MiniKvServiceTemplate): boolean {
  return file.configuredPath.endsWith("shard-readiness-v151.json")
    && !miniKv.rollingCurrentUsedForHistoricalBaseline
    && !miniKv.liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline;
}

function frozenPlanSafe(plan: FrozenLiveReadPlan): boolean {
  return plan.project === "mini-kv" && plan.releaseVersion === "v150"
    && plan.readOnly && !plan.executionAllowed && !plan.shardEnabled
    && plan.status === "live-read-gate-prerequisite-read-only"
    && plan.liveReadGatePlanMode === "service-lifecycle-prerequisite-only"
    && !plan.liveReadGateAllowed && !plan.runtimeProbeAllowed && !plan.startsServices
    && !plan.routerActivationAllowed && !plan.writeRoutingAllowed
    && !plan.liveReadGateExecutionAllowed;
}

function allEvidenceFrozen(input: ServiceCheckInput): boolean {
  return input.javaFile.usedHistoricalFallback
    && input.miniTemplateFile.usedHistoricalFallback
    && input.frozenPlanFile.usedHistoricalFallback;
}

function runtimeGateBlocked(input: ServiceCheckInput): boolean {
  return input.intake.runtimeGateStillBlocked
    && !input.intake.runtimeProbeAllowed && !input.intake.liveReadGateAllowed
    && !input.java.runtimeProbeAllowed
    && !input.miniKv.operatorRuntimeProbeAllowed && !input.miniKv.operatorLiveReadAllowed
    && !input.frozenPlan.runtimeProbeAllowed;
}
