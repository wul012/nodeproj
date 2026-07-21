import { includesAll, isSha256 } from "../../../evidence/projectJson.js";

import type {
  DeclaredEvidenceFile,
  DeclaredIntakeChecks,
  DeclaredIntakeRecord,
  FrozenOperatorTemplate,
  JavaDeclaredLifecycle,
  MiniKvDeclaredLifecycle,
  SourceV387Archive,
} from "./intakeTypes.js";

// Readiness behavior is grouped by evidence owner, while source models stay data-only.
// Spread order preserves the public check-key contract consumed by digests and renderers.
// No group may start services, mutate siblings, or infer approval from template evidence.
interface DeclaredCheckInput {
  source: SourceV387Archive;
  javaFile: DeclaredEvidenceFile;
  miniKvFile: DeclaredEvidenceFile;
  frozenFile: DeclaredEvidenceFile;
  java: JavaDeclaredLifecycle;
  miniKv: MiniKvDeclaredLifecycle;
  frozen: FrozenOperatorTemplate;
  intake: DeclaredIntakeRecord;
}

export function createDeclaredChecks(input: DeclaredCheckInput): DeclaredIntakeChecks {
  return {
    ...sourceChecks(input.source),
    ...javaChecks(input.javaFile, input.java),
    ...miniKvChecks(input.miniKvFile, input.frozenFile, input.miniKv, input.frozen),
    ...boundaryChecks(input),
    readyForDeclaredOperatorLifecycleEvidenceIntake: false,
  };
}

function sourceChecks(source: SourceV387Archive) {
  return {
    sourceNodeV387Ready: sourceReady(source),
    sourceNodeV387ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verified",
    sourceNodeV387ChecksAllPassed: sourceChecksPass(source),
    sourceNodeV387BoundariesClosed: sourceBoundariesClosed(source),
  };
}

function javaChecks(file: DeclaredEvidenceFile, java: JavaDeclaredLifecycle) {
  return {
    javaV161FilePresent: file.exists,
    javaV161VersionValid: java.version === "Java v161",
    javaV161ReadOnly: java.readOnly,
    javaV161ExecutionBlocked: !java.executionAllowed,
    javaV161DeclaredLifecycleComplete: javaLifecycleComplete(java),
    javaV161NodeLifecycleBlocked: !java.nodeMayStartService && !java.nodeMayStopService,
    javaV161ReferencesV160AndNodeV387: javaReferencesAligned(java),
    javaV161OwnerPortAndStartupPresent: javaRuntimeHandlesPresent(java),
    javaV161SmokeTargetsReadOnlyGet: javaSmokeTargetsSafe(java),
    javaV161FailClosedRulesComplete: javaFailClosedRulesComplete(java),
    javaV161CleanupResponsibilitiesSafe: javaCleanupSafe(java),
    javaV161RuntimeGatePrerequisitesComplete: javaGatePrerequisitesComplete(java),
    javaV161StopConditionsSafe: javaStopConditionsSafe(java),
    javaV161StatusPassed: java.status === "passed",
  };
}

function miniKvChecks(
  file: DeclaredEvidenceFile,
  frozenFile: DeclaredEvidenceFile,
  miniKv: MiniKvDeclaredLifecycle,
  frozen: FrozenOperatorTemplate,
) {
  return {
    miniKvV152FilePresent: file.exists,
    miniKvV152ReleaseVersionValid: miniKv.releaseVersion === "v152",
    miniKvV152ReadOnly: miniKv.readOnly,
    miniKvV152ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV152ShardDisabled: !miniKv.shardEnabled,
    miniKvV152StatusAccepted: miniKv.status === "declared-operator-lifecycle-no-runtime-read-only",
    miniKvV152BoundarySafe: miniKvBoundariesSafe(miniKv),
    miniKvV152HistoricalFallbackSafe: miniKvFallbackSafe(miniKv),
    miniKvV152PreservesNodeV387Archive:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v387"),
    miniKvV152OperatorTemplateFreezeSafe: miniKvFreezeSafe(miniKv),
    miniKvV152DeclaredLifecycleComplete: miniKvLifecycleComplete(miniKv),
    miniKvV152RuntimeGateStillBlocked: miniKvRuntimeGateBlocked(miniKv),
    miniKvV152RequiresSeparateRuntimeGate: miniKvRequiresGate(miniKv),
    miniKvV152NoRollingCurrentBaseline:
      file.configuredPath.endsWith("shard-readiness-v152.json")
      && !miniKv.rollingCurrentUsedForHistoricalBaseline,
    miniKvV151FrozenTemplatePresent: frozenFile.exists,
    miniKvV151FrozenTemplateSafe: frozenTemplateSafe(frozen),
  };
}

function boundaryChecks(input: DeclaredCheckInput) {
  return {
    allEvidenceUsesHistoricalFallbackSnapshots: evidenceIsFrozen(input),
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

function sourceReady(source: SourceV387Archive): boolean {
  return source.readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification
    && source.readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate
    && !source.readyForRuntimeLiveReadGate;
}

function sourceChecksPass(source: SourceV387Archive): boolean {
  return source.sourceCheckCount === source.sourcePassedCheckCount
    && source.replayCheckCount === source.replayPassedCheckCount
    && source.productionBlockerCount === 0;
}

function sourceBoundariesClosed(source: SourceV387Archive): boolean {
  return source.archiveVerificationOnly && !source.rerunsLiveRead
    && !source.startsJavaService && !source.startsMiniKvService
    && !source.stopsJavaService && !source.stopsMiniKvService
    && !source.connectsManagedAudit && !source.executionAllowed
    && !source.activeShardPrototypeEnabled;
}

function javaLifecycleComplete(java: JavaDeclaredLifecycle): boolean {
  return java.operatorOwned && java.operatorLifecycleDeclared
    && java.startupCommandDeclared && java.portDeclared
    && java.getOnlySmokeDeclared && java.cleanupDeclared
    && java.failClosedDeclared && !java.runtimeProbeAllowed;
}

function javaReferencesAligned(java: JavaDeclaredLifecycle): boolean {
  return java.sourceLifecycleEvidenceVersion === "Java v160"
    && java.lastVerifiedByNodeVersion === "Node v387"
    && java.nextNodeConsumerHint === "Node v388";
}

function javaRuntimeHandlesPresent(java: JavaDeclaredLifecycle): boolean {
  return java.javaServiceOwner === "java-platform-operator"
    && java.javaStartOwner === "java-platform-operator"
    && java.javaStopOwner === "java-platform-operator"
    && java.declaredWorkingDirectory === "advanced-order-platform"
    && java.declaredStartupCommand !== null
    && java.declaredPorts.includes("8080")
    && java.javaBaseUrlHandle === "java-local-readonly-base-url";
}

function javaSmokeTargetsSafe(java: JavaDeclaredLifecycle): boolean {
  return java.getOnlySmokeTargets.length >= 4
    && java.getOnlySmokeTargets.every((target) => target.startsWith("GET "))
    && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/declared-operator-lifecycle");
}

function javaFailClosedRulesComplete(java: JavaDeclaredLifecycle): boolean {
  return includesAll(java.failClosedRules, [
    "missing-java-service-owner-blocks-runtime-gate",
    "missing-java-start-command-blocks-runtime-gate",
    "missing-java-port-blocks-runtime-gate",
    "missing-java-cleanup-owner-blocks-runtime-gate",
    "non-get-smoke-target-blocks-runtime-gate",
    "failed-java-smoke-blocks-node-consumption",
  ]);
}

function javaCleanupSafe(java: JavaDeclaredLifecycle): boolean {
  return java.cleanupResponsibilities.includes("node-must-not-stop-java-from-declared-evidence")
    && java.cleanupResponsibilities.includes(
      "node-may-clean-only-processes-started-by-separate-approved-runtime-gate",
    );
}

function javaGatePrerequisitesComplete(java: JavaDeclaredLifecycle): boolean {
  return includesAll(java.runtimeGatePrerequisites, [
    "mini-kv-declared-operator-lifecycle-evidence",
    "separate-approved-runtime-live-read-gate",
    "operator-confirms-java-service-running-and-port",
  ]);
}

function javaStopConditionsSafe(java: JavaDeclaredLifecycle): boolean {
  return includesAll(java.stopConditions, [
    "request-would-start-java-from-this-evidence",
    "request-would-stop-java-from-this-evidence",
    "request-would-run-runtime-probe-before-mini-kv-declared-lifecycle",
    "request-would-enable-active-shard-router-or-write-routing",
  ]);
}

function miniKvBoundariesSafe(miniKv: MiniKvDeclaredLifecycle): boolean {
  return !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed
    && !miniKv.loadRestoreCompactAllowed && !miniKv.setnxexExecutionAllowed
    && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
    && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated;
}

function miniKvFallbackSafe(miniKv: MiniKvDeclaredLifecycle): boolean {
  return miniKv.previousConsumedReleaseVersion === "v151"
    && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v151.json"
    && miniKv.previousConsumptionNodeVersion === "Node v388 pending separate runtime gate approval"
    && !miniKv.rollingCurrentUsedForHistoricalBaseline
    && miniKv.nodeV387ArchiveVerificationPreserved
    && !miniKv.nodeV388ReadsUnfinishedUpstream;
}

function miniKvFreezeSafe(miniKv: MiniKvDeclaredLifecycle): boolean {
  return miniKv.operatorTemplateFreezeFrozenReleaseVersion === "v151"
    && miniKv.operatorTemplateFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v151.json"
    && miniKv.operatorTemplateFreezePreservesTemplate
    && !miniKv.frozenRuntimeProbeAllowed && !miniKv.frozenExecutionAllowed;
}

function miniKvLifecycleComplete(miniKv: MiniKvDeclaredLifecycle): boolean {
  return miniKv.operatorEvidenceMode === "declared-lifecycle-no-runtime"
    && miniKv.operatorSourceFrozenReleaseVersion === "v151"
    && miniKv.operatorSourceFrozenFixturePath === "fixtures/release/shard-readiness-v151.json"
    && miniKv.operatorOwnedServiceLifecycleDeclared
    && miniKv.serviceOwnerDeclared && miniKv.startupCommandDeclared
    && miniKv.portListDeclared && miniKv.getOnlySmokeTargetDeclared
    && miniKv.failClosedBehaviorDeclared && miniKv.cleanupResponsibilityDeclared;
}

function miniKvRuntimeGateBlocked(miniKv: MiniKvDeclaredLifecycle): boolean {
  return !miniKv.runtimeGateApproved && !miniKv.startsServices
    && !miniKv.runtimeProbeAllowed && !miniKv.liveReadAllowed
    && !miniKv.activeShardPrototypeEnabled && !miniKv.routerActivationAllowed
    && !miniKv.writeRoutingAllowed && !miniKv.operatorExecutionAllowed;
}

function miniKvRequiresGate(miniKv: MiniKvDeclaredLifecycle): boolean {
  return miniKv.requiresSeparateRuntimeGate
    && includesAll(miniKv.requiredBeforeRuntimeGate, [
      "operator approval record",
      "concrete loopback port assignment",
      "GET-only smoke command",
      "cleanup proof",
    ]);
}

function frozenTemplateSafe(frozen: FrozenOperatorTemplate): boolean {
  return frozen.project === "mini-kv" && frozen.releaseVersion === "v151"
    && frozen.readOnly && !frozen.executionAllowed && !frozen.shardEnabled
    && frozen.status === "operator-service-lifecycle-template-read-only"
    && frozen.operatorEvidenceMode === "template-only-no-runtime"
    && frozen.operatorOwnedServiceLifecycleRequired
    && !frozen.serviceOwnerDeclared && !frozen.runtimeProbeAllowed
    && !frozen.executionAllowedByOperatorTemplate;
}

function evidenceIsFrozen(input: DeclaredCheckInput): boolean {
  return input.javaFile.usedHistoricalFallback
    && input.miniKvFile.usedHistoricalFallback
    && input.frozenFile.usedHistoricalFallback;
}

function runtimeGateBlocked(input: DeclaredCheckInput): boolean {
  return input.intake.runtimeGateStillBlocked
    && !input.intake.runtimeProbeAllowed && !input.intake.liveReadGateAllowed
    && !input.java.runtimeProbeAllowed
    && !input.miniKv.runtimeGateApproved && !input.miniKv.runtimeProbeAllowed;
}
