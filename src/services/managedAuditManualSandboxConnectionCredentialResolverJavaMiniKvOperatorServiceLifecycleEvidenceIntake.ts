import type { AppConfig } from "../config.js";
import {
  includesAll,
  isSha256,
  numberValue,
  readProjectJson,
  stringValue,
  valueAt,
} from "../evidence/projectJson.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  createJavaOperatorServiceLifecycle,
  createMiniKvFrozenLiveReadGatePlan,
  createMiniKvOperatorServiceLifecycleTemplate,
  createOperatorServiceLifecycleEvidenceFileReference,
  readHistoricalJson,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeEvidence.js";
import type {
  JavaOperatorServiceLifecycleReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeProfile,
  MiniKvFrozenLiveReadGatePlanReference,
  MiniKvOperatorServiceLifecycleTemplateReference,
  OperatorServiceLifecycleEvidenceFileReference,
  OperatorServiceLifecycleEvidenceIntakeChecks,
  OperatorServiceLifecycleEvidenceIntakeMessage,
  OperatorServiceLifecycleEvidenceIntakeRecord,
  OperatorServiceLifecycleEvidenceIntakeSummary,
  SourceNodeV385ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-operator-service-lifecycle-evidence-intake";
const SOURCE_NODE_V385_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-live-read-gate-plan-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v385-post-java-mini-kv-live-read-gate-plan-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md";
const SOURCE_NODE_V385_ARCHIVE =
  "e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json";
const JAVA_V160_OPERATOR_SERVICE_LIFECYCLE =
  "D:/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json";
const JAVA_V160_OPERATOR_SERVICE_LIFECYCLE_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json";
const MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v151.json";
const MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json";
const MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v150.json";
const MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json";

interface ParsedOperatorServiceLifecycleEvidence {
  sourceNodeV385Json: Record<string, unknown> | null;
  javaOperatorServiceLifecycleJson: Record<string, unknown> | null;
  miniKvOperatorServiceLifecycleTemplateJson: Record<string, unknown> | null;
  miniKvFrozenLiveReadGatePlanJson: Record<string, unknown> | null;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaOperatorServiceLifecycleFile = createOperatorServiceLifecycleEvidenceFileReference(
    "java-v160-operator-service-lifecycle",
    JAVA_V160_OPERATOR_SERVICE_LIFECYCLE,
    JAVA_V160_OPERATOR_SERVICE_LIFECYCLE_FALLBACK,
  );
  const miniKvOperatorServiceLifecycleTemplateFile = createOperatorServiceLifecycleEvidenceFileReference(
    "mini-kv-v151-operator-service-lifecycle-template",
    MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE,
    MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE_FALLBACK,
  );
  const miniKvFrozenLiveReadGatePlanFile = createOperatorServiceLifecycleEvidenceFileReference(
    "mini-kv-v150-frozen-live-read-gate-plan",
    MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN,
    MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN_FALLBACK,
  );
  const parsed: ParsedOperatorServiceLifecycleEvidence = {
    sourceNodeV385Json: readProjectJson(projectRoot, SOURCE_NODE_V385_ARCHIVE),
    javaOperatorServiceLifecycleJson: readHistoricalJson(JAVA_V160_OPERATOR_SERVICE_LIFECYCLE),
    miniKvOperatorServiceLifecycleTemplateJson: readHistoricalJson(MINI_KV_V151_OPERATOR_SERVICE_LIFECYCLE_TEMPLATE),
    miniKvFrozenLiveReadGatePlanJson: readHistoricalJson(MINI_KV_V150_FROZEN_LIVE_READ_GATE_PLAN),
  };
  const sourceNodeV385 = createSourceNodeV385(parsed.sourceNodeV385Json);
  const javaOperatorServiceLifecycle = createJavaOperatorServiceLifecycle(parsed.javaOperatorServiceLifecycleJson);
  const miniKvOperatorServiceLifecycleTemplate = createMiniKvOperatorServiceLifecycleTemplate(
    parsed.miniKvOperatorServiceLifecycleTemplateJson,
  );
  const miniKvFrozenLiveReadGatePlan = createMiniKvFrozenLiveReadGatePlan(parsed.miniKvFrozenLiveReadGatePlanJson);
  const draftIntake = createIntake(
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    false,
  );
  const checks = createChecks(
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    miniKvFrozenLiveReadGatePlan,
    draftIntake,
  );
  checks.readyForOperatorServiceLifecycleEvidenceIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForOperatorServiceLifecycleEvidenceIntake")
    .every(([, value]) => value);
  const ready = checks.readyForOperatorServiceLifecycleEvidenceIntake;
  const intake = createIntake(
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    ready,
  );
  checks.intakeDigestStable = isSha256(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    miniKvFrozenLiveReadGatePlan,
    checks,
    productionBlockers,
    warnings,
    recommendations,
  );

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv operator service lifecycle evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-operator-service-lifecycle-evidence-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v160-and-mini-kv-v151-operator-service-lifecycle-evidence" : "blocked",
    readyForOperatorServiceLifecycleEvidenceIntake: ready,
    readyForNodeV387ArchiveVerification: ready,
    readyForRuntimeLiveReadGate: false,
    activeNodeVersion: "Node v386",
    sourceNodeVersion: "Node v385",
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
    sourceNodeV385,
    javaOperatorServiceLifecycleFile,
    miniKvOperatorServiceLifecycleTemplateFile,
    miniKvFrozenLiveReadGatePlanFile,
    javaOperatorServiceLifecycle,
    miniKvOperatorServiceLifecycleTemplate,
    miniKvFrozenLiveReadGatePlan,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      operatorServiceLifecycleEvidenceIntakeJson: ROUTE_PATH,
      operatorServiceLifecycleEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV385Json: SOURCE_NODE_V385_ROUTE,
      sourceNodeV385Markdown: `${SOURCE_NODE_V385_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v387",
    },
    nextActions: ready
      ? [
        "Use Node v387 to archive and verify the v386 operator service lifecycle evidence intake.",
        "Keep Java and mini-kv in recommended parallel mode while mini-kv replaces the template with declared operator evidence.",
        "Do not run runtime probes, start services, or enable active shard routing from this evidence intake.",
      ]
      : [
        "Repair missing Node v385, Java v160, or mini-kv v151/v150 frozen evidence before retrying v386.",
        "Do not substitute mini-kv rolling current evidence for the frozen v151 and v150 historical snapshots.",
      ],
  };
}

function createSourceNodeV385(json: Record<string, unknown> | null): SourceNodeV385ArchiveVerificationReference {
  return {
    sourceVersion: "Node v385",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForLiveReadGatePlanIntakeArchiveVerification:
      valueAt(json, "readyForLiveReadGatePlanIntakeArchiveVerification") === true,
    readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate:
      valueAt(json, "readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate") === true,
    activeNodeVersion: "Node v385",
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
  source: SourceNodeV385ArchiveVerificationReference,
  javaOperatorServiceLifecycleFile: OperatorServiceLifecycleEvidenceFileReference,
  miniKvOperatorServiceLifecycleTemplateFile: OperatorServiceLifecycleEvidenceFileReference,
  miniKvFrozenLiveReadGatePlanFile: OperatorServiceLifecycleEvidenceFileReference,
  java: JavaOperatorServiceLifecycleReference,
  miniKv: MiniKvOperatorServiceLifecycleTemplateReference,
  ready: boolean,
): OperatorServiceLifecycleEvidenceIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-operator-service-lifecycle-evidence-intake" as const,
    sourceSpan: "Node v385 + Java v160 + mini-kv v151" as const,
    sourceNodeV385Digest: source.archiveVerificationDigest,
    javaV160Digest: javaOperatorServiceLifecycleFile.digest,
    miniKvV151Digest: miniKvOperatorServiceLifecycleTemplateFile.digest,
    miniKvV150Digest: miniKvFrozenLiveReadGatePlanFile.digest,
    usesFrozenJavaV160OperatorLifecycleEvidence: javaOperatorServiceLifecycleFile.usedHistoricalFallback,
    usesFrozenMiniKvV151LifecycleTemplate: miniKvOperatorServiceLifecycleTemplateFile.usedHistoricalFallback,
    verifiesMiniKvV150LiveReadGatePlanFreeze: miniKvFrozenLiveReadGatePlanFile.usedHistoricalFallback,
    javaOperatorLifecycleEvidencePresent: java.operatorOwned && java.status === "passed",
    miniKvLifecycleTemplateOnly: miniKv.operatorEvidenceMode === "template-only-no-runtime",
    runtimeGateStillBlocked: true as const,
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
    nextNodeVersionSuggested: "Node v387",
  };
}

function createChecks(
  source: SourceNodeV385ArchiveVerificationReference,
  javaOperatorServiceLifecycleFile: OperatorServiceLifecycleEvidenceFileReference,
  miniKvOperatorServiceLifecycleTemplateFile: OperatorServiceLifecycleEvidenceFileReference,
  miniKvFrozenLiveReadGatePlanFile: OperatorServiceLifecycleEvidenceFileReference,
  java: JavaOperatorServiceLifecycleReference,
  miniKv: MiniKvOperatorServiceLifecycleTemplateReference,
  miniKvFrozen: MiniKvFrozenLiveReadGatePlanReference,
  intake: OperatorServiceLifecycleEvidenceIntakeRecord,
): OperatorServiceLifecycleEvidenceIntakeChecks {
  return {
    sourceNodeV385Ready:
      source.readyForLiveReadGatePlanIntakeArchiveVerification
      && source.readyForNodeV386ServiceLifecycleEvidenceOrRuntimeGate,
    sourceNodeV385ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-live-read-gate-plan-intake-archive-verified",
    sourceNodeV385ChecksAllPassed:
      source.sourceCheckCount > 0
      && source.sourceCheckCount === source.sourcePassedCheckCount
      && source.replayCheckCount > 0
      && source.replayCheckCount === source.replayPassedCheckCount
      && source.productionBlockerCount === 0,
    sourceNodeV385BoundariesClosed:
      source.archiveVerificationOnly && !source.rerunsLiveRead && !source.startsJavaService && !source.startsMiniKvService
      && !source.stopsJavaService && !source.stopsMiniKvService && !source.connectsManagedAudit
      && !source.executionAllowed && !source.activeShardPrototypeEnabled,
    javaV160FilePresent: javaOperatorServiceLifecycleFile.exists,
    javaV160VersionValid: java.version === "Java v160",
    javaV160ReadOnly: java.readOnly,
    javaV160ExecutionBlocked: !java.executionAllowed,
    javaV160OperatorOwned: java.operatorOwned,
    javaV160RuntimeProbeBlocked: !java.runtimeProbeAllowed,
    javaV160NodeLifecycleBlocked: !java.nodeMayStartService && !java.nodeMayStopService,
    javaV160ReferencesV159AndNodeV385:
      java.sourceGatePlanVersion === "Java v159"
      && java.lastVerifiedByNodeVersion === "Node v385"
      && java.nextNodeConsumerHint === "Node v386",
    javaV160OwnerAndPortPlaceholdersPresent:
      java.javaServiceOwner === "java-service-operator-placeholder"
      && java.javaStartOwner === "java-service-operator-placeholder"
      && java.javaStopOwner === "java-service-operator-placeholder"
      && java.javaPortDeclaration === "operator-declared-port-before-window"
      && java.javaBaseUrlTemplate === "http://127.0.0.1:{java-port}",
    javaV160OperatorPrerequisitesComplete:
      includesAll(java.operatorPrerequisites, [
        "operator-confirms-java-service-owner",
        "operator-confirms-start-command-and-port-before-window",
        "operator-confirms-stop-responsibility-before-window",
        "operator-confirms-get-only-smoke-targets",
        "operator-confirms-no-credential-or-raw-endpoint-value-read",
      ]),
    javaV160SmokeTargetsReadOnlyGet:
      java.getOnlySmokeTargets.length >= 4
      && java.getOnlySmokeTargets.every((target) => target.startsWith("GET "))
      && java.getOnlySmokeTargets.includes("GET /actuator/health")
      && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/operator-service-lifecycle")
      && java.getOnlySmokeTargets.includes("GET /api/v1/ops/shard-readiness/live-read-gate-plan"),
    javaV160FailClosedRulesComplete:
      includesAll(java.failClosedRules, [
        "missing-operator-owner-blocks-runtime-probe",
        "missing-operator-declared-port-blocks-runtime-probe",
        "missing-cleanup-owner-blocks-runtime-probe",
        "non-get-smoke-target-blocks-runtime-probe",
        "failed-smoke-blocks-node-consumption",
      ]),
    javaV160CleanupResponsibilitiesSafe:
      java.cleanupResponsibilities.includes("operator-stops-java-if-operator-started-java")
      && java.cleanupResponsibilities.includes("node-must-not-stop-java-from-this-evidence")
      && java.cleanupResponsibilities.includes("node-may-clean-only-processes-started-by-a-separate-approved-runtime-plan")
      && java.cleanupResponsibilities.includes("archive-runtime-smoke-output-before-cleanup"),
    javaV160StopConditionsSafe:
      includesAll(java.stopConditions, [
        "source-gate-plan-status-not-passed",
        "request-would-start-java-from-this-evidence",
        "request-would-stop-java-from-this-evidence",
        "request-would-run-runtime-probe-before-operator-port-confirmation",
        "request-would-run-non-get-smoke",
        "request-would-read-credential-or-raw-endpoint-value",
      ]),
    javaV160StatusPassed: java.status === "passed",
    miniKvV151FilePresent: miniKvOperatorServiceLifecycleTemplateFile.exists,
    miniKvV151ReleaseVersionValid: miniKv.releaseVersion === "v151",
    miniKvV151ReadOnly: miniKv.readOnly,
    miniKvV151ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV151ShardDisabled: !miniKv.shardEnabled,
    miniKvV151StatusAccepted: miniKv.status === "operator-service-lifecycle-template-read-only",
    miniKvV151BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.setnxexExecutionAllowed && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
      && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated,
    miniKvV151HistoricalFallbackSafe:
      miniKv.previousConsumedReleaseVersion === "v150"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v150.json"
      && miniKv.previousConsumptionNodeVersion === "Node v386 pending operator-owned service lifecycle evidence"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && miniKv.nodeV385ArchiveVerificationPreserved
      && !miniKv.nodeV386ReadsUnfinishedUpstream,
    miniKvV151PreservesNodeV385Archive:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v385"),
    miniKvV151LiveReadGatePlanFreezeSafe:
      miniKv.liveReadGatePlanFreezeFrozenReleaseVersion === "v150"
      && miniKv.liveReadGatePlanFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v150.json"
      && miniKv.liveReadGatePlanFreezePreservesLiveReadGatePlan
      && !miniKv.frozenLiveReadGateAllowed
      && !miniKv.frozenRuntimeProbeAllowed
      && !miniKv.frozenStartsServices
      && !miniKv.frozenRouterActivationAllowed
      && !miniKv.frozenWriteRoutingAllowed
      && !miniKv.frozenExecutionAllowed
      && !miniKv.liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline,
    miniKvV151OperatorTemplateRequiresEvidence:
      miniKv.operatorEvidenceMode === "template-only-no-runtime"
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
      ]),
    miniKvV151OperatorTemplateNotRuntimeReady:
      !miniKv.serviceOwnerDeclared
      && !miniKv.startupCommandDeclared
      && !miniKv.portListDeclared
      && !miniKv.getOnlySmokeTargetDeclared
      && !miniKv.cleanupResponsibilityDeclared
      && !miniKv.operatorStartsServices
      && !miniKv.operatorRuntimeProbeAllowed
      && !miniKv.operatorLiveReadAllowed
      && !miniKv.operatorRouterActivationAllowed
      && !miniKv.operatorWriteRoutingAllowed
      && !miniKv.operatorExecutionAllowed,
    miniKvV151NoRollingCurrentBaseline:
      miniKvOperatorServiceLifecycleTemplateFile.configuredPath.endsWith("shard-readiness-v151.json")
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && !miniKv.liveReadGatePlanFreezeRollingCurrentUsedForFrozenBaseline,
    miniKvV150FrozenGatePlanPresent: miniKvFrozenLiveReadGatePlanFile.exists,
    miniKvV150FrozenGatePlanSafe:
      miniKvFrozen.project === "mini-kv"
      && miniKvFrozen.releaseVersion === "v150"
      && miniKvFrozen.readOnly
      && !miniKvFrozen.executionAllowed
      && !miniKvFrozen.shardEnabled
      && miniKvFrozen.status === "live-read-gate-prerequisite-read-only"
      && miniKvFrozen.liveReadGatePlanMode === "service-lifecycle-prerequisite-only"
      && !miniKvFrozen.liveReadGateAllowed
      && !miniKvFrozen.runtimeProbeAllowed
      && !miniKvFrozen.startsServices
      && !miniKvFrozen.routerActivationAllowed
      && !miniKvFrozen.writeRoutingAllowed
      && !miniKvFrozen.liveReadGateExecutionAllowed,
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaOperatorServiceLifecycleFile.usedHistoricalFallback
      && miniKvOperatorServiceLifecycleTemplateFile.usedHistoricalFallback
      && miniKvFrozenLiveReadGatePlanFile.usedHistoricalFallback,
    runtimeGateStillBlocked:
      intake.runtimeGateStillBlocked
      && !intake.runtimeProbeAllowed
      && !intake.liveReadGateAllowed
      && !java.runtimeProbeAllowed
      && !miniKv.operatorRuntimeProbeAllowed
      && !miniKv.operatorLiveReadAllowed
      && !miniKvFrozen.runtimeProbeAllowed,
    intakeDigestStable: isSha256(intake.intakeDigest),
    noAutomaticUpstreamStartStop: !intake.startsUpstreamServices && !intake.stopsUpstreamServices,
    noUpstreamMutation: !intake.writesUpstreamState,
    noManagedAuditConnection: !intake.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForOperatorServiceLifecycleEvidenceIntake: false,
  };
}

function createSummary(
  java: JavaOperatorServiceLifecycleReference,
  miniKv: MiniKvOperatorServiceLifecycleTemplateReference,
  miniKvFrozen: MiniKvFrozenLiveReadGatePlanReference,
  checks: OperatorServiceLifecycleEvidenceIntakeChecks,
  productionBlockers: readonly OperatorServiceLifecycleEvidenceIntakeMessage[],
  warnings: readonly OperatorServiceLifecycleEvidenceIntakeMessage[],
  recommendations: readonly OperatorServiceLifecycleEvidenceIntakeMessage[],
): OperatorServiceLifecycleEvidenceIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [
      java.status === "passed" && java.operatorOwned,
      miniKv.status === "operator-service-lifecycle-template-read-only" && checks.miniKvV151OperatorTemplateRequiresEvidence,
      miniKvFrozen.status === "live-read-gate-prerequisite-read-only" && checks.miniKvV150FrozenGatePlanSafe,
    ].filter(Boolean).length,
    javaSmokeTargetCount: java.getOnlySmokeTargets.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    requiredOperatorEvidenceCount: miniKv.requiredOperatorEvidence.length,
    declaredMiniKvOperatorEvidenceCount: [
      miniKv.serviceOwnerDeclared,
      miniKv.startupCommandDeclared,
      miniKv.portListDeclared,
      miniKv.getOnlySmokeTargetDeclared,
      miniKv.cleanupResponsibilityDeclared,
    ].filter(Boolean).length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: OperatorServiceLifecycleEvidenceIntakeChecks,
): OperatorServiceLifecycleEvidenceIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV385Ready, "SOURCE_NODE_V385_NOT_READY", "node-v385", "Node v385 must be ready for v386 intake."],
    [checks.sourceNodeV385ArchiveVerified, "SOURCE_NODE_V385_ARCHIVE_NOT_VERIFIED", "node-v385", "Node v385 archive verification must be complete."],
    [checks.sourceNodeV385ChecksAllPassed, "SOURCE_NODE_V385_CHECKS_NOT_PASSED", "node-v385", "Node v385 source and replay checks must pass."],
    [checks.javaV160FilePresent, "JAVA_V160_OPERATOR_LIFECYCLE_MISSING", "java-v160", "Java v160 operator-owned service lifecycle evidence must be frozen."],
    [checks.javaV160OperatorOwned, "JAVA_V160_NOT_OPERATOR_OWNED", "java-v160", "Java v160 must declare operator-owned lifecycle responsibility."],
    [checks.javaV160NodeLifecycleBlocked, "JAVA_V160_NODE_LIFECYCLE_ALLOWED", "java-v160", "v386 must not allow Node to start or stop Java."],
    [checks.javaV160SmokeTargetsReadOnlyGet, "JAVA_V160_SMOKE_TARGETS_UNSAFE", "java-v160", "Java v160 smoke targets must be GET-only."],
    [checks.javaV160StopConditionsSafe, "JAVA_V160_STOP_CONDITIONS_UNSAFE", "java-v160", "Java v160 must fail closed on service, credential, and non-GET requests."],
    [checks.miniKvV151FilePresent, "MINI_KV_V151_TEMPLATE_MISSING", "mini-kv-v151", "mini-kv v151 operator lifecycle template must be frozen."],
    [checks.miniKvV151BoundarySafe, "MINI_KV_V151_BOUNDARY_UNSAFE", "mini-kv-v151", "mini-kv v151 must keep write, admin, storage, router, and process mutation disabled."],
    [checks.miniKvV151LiveReadGatePlanFreezeSafe, "MINI_KV_V151_LIVE_READ_FREEZE_UNSAFE", "mini-kv-v151", "mini-kv v151 must freeze v150 live-read gate evidence safely."],
    [checks.miniKvV151OperatorTemplateRequiresEvidence, "MINI_KV_V151_OPERATOR_EVIDENCE_NOT_REQUIRED", "mini-kv-v151", "mini-kv v151 must require owner, port, smoke, fail-closed, and cleanup evidence."],
    [checks.miniKvV151OperatorTemplateNotRuntimeReady, "MINI_KV_V151_RUNTIME_TEMPLATE_OPENED", "mini-kv-v151", "mini-kv v151 is a template only and must not be runtime-ready."],
    [checks.miniKvV150FrozenGatePlanSafe, "MINI_KV_V150_FROZEN_GATE_PLAN_INVALID", "mini-kv-v150", "mini-kv v150 frozen live-read gate plan must remain read-only and service-free."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v386 inputs must resolve to frozen historical snapshots."],
    [checks.runtimeGateStillBlocked, "RUNTIME_GATE_UNEXPECTEDLY_OPEN", "runtime-boundary", "v386 must keep runtime live-read gate blocked."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v386 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v386 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): OperatorServiceLifecycleEvidenceIntakeMessage[] {
  return [
    {
      code: "OPERATOR_SERVICE_LIFECYCLE_INTAKE_IS_NOT_RUNTIME_GATE",
      severity: "warning",
      source: "node-v386",
      message: "v386 archives operator service lifecycle evidence only; it does not run Java, mini-kv, or runtime probes.",
    },
    {
      code: "MINI_KV_V151_TEMPLATE_NOT_OPERATOR_APPROVAL",
      severity: "warning",
      source: "mini-kv-v151",
      message: "mini-kv v151 requires operator evidence but declares no owner, port, smoke target, or cleanup responsibility yet.",
    },
  ];
}

function collectRecommendations(ready: boolean): OperatorServiceLifecycleEvidenceIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V386_BEFORE_ANY_RUNTIME_GATE" : "REPAIR_OPERATOR_LIFECYCLE_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v386",
    message: ready
      ? "Archive and verify v386 before considering any separate runtime live-read gate."
      : "Repair missing frozen operator lifecycle evidence before rerunning v386.",
  }];
}
