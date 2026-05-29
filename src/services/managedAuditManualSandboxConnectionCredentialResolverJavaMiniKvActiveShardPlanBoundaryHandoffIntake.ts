import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  historicalEvidenceExists,
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import type {
  ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  ActiveShardPlanBoundaryHandoffIntakeChecks,
  ActiveShardPlanBoundaryHandoffIntakeMessage,
  ActiveShardPlanBoundaryHandoffIntakeRecord,
  ActiveShardPlanBoundaryHandoffIntakeSummary,
  JavaActiveShardPlanBoundaryHandoffReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeProfile,
  MiniKvActiveShardPlanConsumerHandoffReference,
  MiniKvFrozenActivePlanReference,
  SourceNodeV381ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-boundary-handoff-intake";
const SOURCE_NODE_V381_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v381-post-java-mini-kv-active-shard-plan-evidence-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v382-post-java-mini-kv-active-shard-plan-boundary-handoff-intake-roadmap.md";
const SOURCE_NODE_V381_ARCHIVE =
  "e/381/evidence/java-mini-kv-active-shard-plan-evidence-intake-archive-verification-v381-http.json";
const JAVA_V158_HANDOFF =
  "D:/javaproj/advanced-order-platform/e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json";
const JAVA_V158_HANDOFF_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/158/evidence/java-shard-readiness-active-shard-plan-handoff-v158.json";
const MINI_KV_V149_HANDOFF =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v149.json";
const MINI_KV_V149_HANDOFF_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v149.json";
const MINI_KV_V148_FROZEN_PLAN =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v148.json";
const MINI_KV_V148_FROZEN_PLAN_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v148.json";

interface ParsedBoundaryHandoffEvidence {
  sourceNodeV381Json: Record<string, unknown> | null;
  javaHandoffJson: Record<string, unknown> | null;
  miniKvHandoffJson: Record<string, unknown> | null;
  miniKvFrozenPlanJson: Record<string, unknown> | null;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaHandoffFile = evidenceFileReference("java-v158-boundary-handoff", JAVA_V158_HANDOFF,
    JAVA_V158_HANDOFF_FALLBACK);
  const miniKvHandoffFile = evidenceFileReference("mini-kv-v149-consumer-handoff", MINI_KV_V149_HANDOFF,
    MINI_KV_V149_HANDOFF_FALLBACK);
  const miniKvFrozenPlanFile = evidenceFileReference("mini-kv-v148-frozen-active-plan", MINI_KV_V148_FROZEN_PLAN,
    MINI_KV_V148_FROZEN_PLAN_FALLBACK);
  const parsed: ParsedBoundaryHandoffEvidence = {
    sourceNodeV381Json: readProjectJson(projectRoot, SOURCE_NODE_V381_ARCHIVE),
    javaHandoffJson: readHistoricalJson(JAVA_V158_HANDOFF),
    miniKvHandoffJson: readHistoricalJson(MINI_KV_V149_HANDOFF),
    miniKvFrozenPlanJson: readHistoricalJson(MINI_KV_V148_FROZEN_PLAN),
  };
  const sourceNodeV381 = createSourceNodeV381(parsed.sourceNodeV381Json);
  const javaHandoff = createJavaHandoff(parsed.javaHandoffJson);
  const miniKvHandoff = createMiniKvHandoff(parsed.miniKvHandoffJson);
  const miniKvFrozenPlan = createMiniKvFrozenPlan(parsed.miniKvFrozenPlanJson);
  const draftIntake = createIntake(sourceNodeV381, javaHandoffFile, miniKvHandoffFile, miniKvFrozenPlanFile, false);
  const checks = createChecks(
    sourceNodeV381,
    javaHandoffFile,
    miniKvHandoffFile,
    miniKvFrozenPlanFile,
    javaHandoff,
    miniKvHandoff,
    miniKvFrozenPlan,
    draftIntake,
  );
  checks.readyForActiveShardPlanBoundaryHandoffIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForActiveShardPlanBoundaryHandoffIntake")
    .every(([, value]) => value);
  const ready = checks.readyForActiveShardPlanBoundaryHandoffIntake;
  const intake = createIntake(sourceNodeV381, javaHandoffFile, miniKvHandoffFile, miniKvFrozenPlanFile, ready);
  checks.intakeDigestStable = isDigest(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaHandoff, miniKvHandoff, miniKvFrozenPlan, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title:
      "Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan boundary handoff intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-active-shard-plan-boundary-handoff-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v158-and-mini-kv-v149-boundary-handoff-evidence" : "blocked",
    readyForActiveShardPlanBoundaryHandoffIntake: ready,
    readyForNodeV383ArchiveVerification: ready,
    activeNodeVersion: "Node v382",
    sourceNodeVersion: "Node v381",
    evidenceIntakeOnly: true,
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
    sourceNodeV381,
    javaHandoffFile,
    miniKvHandoffFile,
    miniKvFrozenPlanFile,
    javaHandoff,
    miniKvHandoff,
    miniKvFrozenPlan,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      activeShardPlanBoundaryHandoffIntakeJson: ROUTE_PATH,
      activeShardPlanBoundaryHandoffIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV381Json: SOURCE_NODE_V381_ROUTE,
      sourceNodeV381Markdown: `${SOURCE_NODE_V381_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v383",
    },
    nextActions: ready
      ? [
        "Use Node v383 to archive and verify the v382 boundary handoff intake.",
        "Keep Java v158 as a read-only boundary handoff; it is not an active shard router.",
        "Keep mini-kv v149 as frozen consumer handoff evidence until a separate live-read gate owns service startup and cleanup.",
      ]
      : [
        "Repair missing Java v158 or mini-kv v149 frozen handoff evidence before retrying v382.",
        "Do not read mini-kv rolling current files to satisfy historical boundary handoff intake.",
      ],
  };
}

function evidenceFileReference(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): ActiveShardPlanBoundaryHandoffEvidenceFileReference {
  const resolvedPath = resolveHistoricalEvidencePath(configuredPath);
  const exists = historicalEvidenceExists(configuredPath);
  if (!exists) {
    return {
      id,
      configuredPath,
      resolvedPath,
      historicalFallbackPath,
      exists: false,
      usedHistoricalFallback: false,
      byteLength: 0,
      digest: null,
    };
  }
  const content = readHistoricalEvidenceFile(configuredPath);
  return {
    id,
    configuredPath,
    resolvedPath,
    historicalFallbackPath,
    exists: true,
    usedHistoricalFallback: normalizePath(resolvedPath).endsWith(normalizePath(historicalFallbackPath)),
    byteLength: statHistoricalEvidence(configuredPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
  };
}

function createSourceNodeV381(json: Record<string, unknown> | null): SourceNodeV381ArchiveVerificationReference {
  return {
    sourceVersion: "Node v381",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForActiveShardPlanEvidenceIntakeArchiveVerification:
      valueAt(json, "readyForActiveShardPlanEvidenceIntakeArchiveVerification") === true,
    readyForNodeV381NextArchiveVerification: valueAt(json, "readyForNodeV381NextArchiveVerification") === true,
    activeNodeVersion: "Node v381",
    sourceNodeVersion: stringValue(valueAt(json, "sourceNodeVersion")),
    archiveVerificationDigest: stringValue(valueAt(json, "archiveVerification", "archiveVerificationDigest")),
    checkCount: numberValue(valueAt(json, "summary", "checkCount")),
    passedCheckCount: numberValue(valueAt(json, "summary", "passedCheckCount")),
    productionBlockerCount: numberValue(valueAt(json, "summary", "productionBlockerCount")),
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
    activeShardPrototypeEnabled: false,
  };
}

function createJavaHandoff(json: Record<string, unknown> | null): JavaActiveShardPlanBoundaryHandoffReference {
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    activeShardPrototypeEnabled: valueAt(json, "activeShardPrototypeEnabled") === true,
    liveReadAllowed: valueAt(json, "liveReadAllowed") === true,
    sourceHandoffVersion: stringValue(valueAt(json, "sourceHandoffVersion")),
    lastConsumedByNodeVersion: stringOrNull(valueAt(json, "lastConsumedByNodeVersion")),
    nodeArchiveVerificationVersion: stringOrNull(valueAt(json, "nodeArchiveVerificationVersion")),
    javaRole: stringValue(valueAt(json, "javaRole")),
    activePrototypeAuthority: stringValue(valueAt(json, "activePrototypeAuthority")),
    frozenJavaEvidence: stringArray(valueAt(json, "frozenJavaEvidence")),
    nodeConsumptionReferences: stringArray(valueAt(json, "nodeConsumptionReferences")),
    javaBoundaryRules: stringArray(valueAt(json, "javaBoundaryRules")),
    stopConditions: stringArray(valueAt(json, "stopConditions")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    status: stringValue(valueAt(json, "status")),
  };
}

function createMiniKvHandoff(json: Record<string, unknown> | null): MiniKvActiveShardPlanConsumerHandoffReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    contract: stringValue(valueAt(json, "contract")),
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    shardCount: numberValue(valueAt(json, "shardCount")),
    slotCount: numberValue(valueAt(json, "slotCount")),
    routingMode: stringValue(valueAt(json, "routingMode")),
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    writeCommandsAllowed: valueAt(json, "boundaries", "writeCommandsAllowed") === true,
    adminCommandsAllowed: valueAt(json, "boundaries", "adminCommandsAllowed") === true,
    loadRestoreCompactAllowed: valueAt(json, "boundaries", "loadRestoreCompactAllowed") === true,
    setnxexExecutionAllowed: valueAt(json, "boundaries", "setnxexExecutionAllowed") === true,
    activeRouterInstalled: valueAt(json, "boundaries", "activeRouterInstalled") === true,
    storageDirectoriesCreated: valueAt(json, "boundaries", "storageDirectoriesCreated") === true,
    multiProcessStarted: valueAt(json, "boundaries", "multiProcessStarted") === true,
    archivedNodeEvidenceMutated: valueAt(json, "boundaries", "archivedNodeEvidenceMutated") === true,
    activeShardPrototypeAllowed: valueAt(json, "activePrototypePlan", "activeShardPrototypeAllowed") === true,
    routerActivationAllowed: valueAt(json, "activePrototypePlan", "routerActivationAllowed") === true,
    shardDirectoryCreationAllowed: valueAt(json, "activePrototypePlan", "shardDirectoryCreationAllowed") === true,
    multiProcessStartAllowed: valueAt(json, "activePrototypePlan", "multiProcessStartAllowed") === true,
    writeRoutingAllowed: valueAt(json, "activePrototypePlan", "writeRoutingAllowed") === true,
    activePlanFreezeFrozenReleaseVersion:
      stringOrNull(valueAt(json, "activePrototypePlanFreeze", "frozenReleaseVersion")),
    activePlanFreezeFrozenFixturePath:
      stringOrNull(valueAt(json, "activePrototypePlanFreeze", "frozenFixturePath")),
    activePlanFreezePreservesActivePrototypePlan:
      valueAt(json, "activePrototypePlanFreeze", "preservesActivePrototypePlan") === true,
    activePlanFreezeRouterActivationAllowed:
      valueAt(json, "activePrototypePlanFreeze", "frozenRouterActivationAllowed") === true,
    activePlanFreezeWriteRoutingAllowed:
      valueAt(json, "activePrototypePlanFreeze", "frozenWriteRoutingAllowed") === true,
    activePlanFreezeRollingCurrentUsedForFrozenBaseline:
      valueAt(json, "activePrototypePlanFreeze", "rollingCurrentUsedForFrozenBaseline") === true,
    consumerHandoffMode: stringValue(valueAt(json, "consumerHandoff", "handoffMode")),
    consumerFrozenReleaseVersion: stringOrNull(valueAt(json, "consumerHandoff", "frozenReleaseVersion")),
    consumerFrozenFixturePath: stringOrNull(valueAt(json, "consumerHandoff", "frozenFixturePath")),
    readyForNodeConsumption: valueAt(json, "consumerHandoff", "readyForNodeConsumption") === true,
    liveReadGateRequiredBeforeRuntimeProbe:
      valueAt(json, "consumerHandoff", "liveReadGateRequiredBeforeRuntimeProbe") === true,
    consumerStartsServices: valueAt(json, "consumerHandoff", "startsServices") === true,
    consumerActiveShardPrototypeEnabled:
      valueAt(json, "consumerHandoff", "activeShardPrototypeEnabled") === true,
    consumerRouterActivationAllowed:
      valueAt(json, "consumerHandoff", "routerActivationAllowed") === true,
    consumerWriteRoutingAllowed: valueAt(json, "consumerHandoff", "writeRoutingAllowed") === true,
    consumerExecutionAllowed: valueAt(json, "consumerHandoff", "executionAllowed") === true,
    previousConsumedReleaseVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedFixturePath")),
    previousConsumptionNodeVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumptionNodeVersion")),
    rollingCurrentUsedForHistoricalBaseline:
      valueAt(json, "historicalFallback", "rollingCurrentUsedForHistoricalBaseline") === true,
    nodeV381ArchiveVerificationPreserved:
      valueAt(json, "historicalFallback", "nodeV381ArchiveVerificationPreserved") === true,
    nodeV382ReadsUnfinishedUpstream: valueAt(json, "historicalFallback", "nodeV382ReadsUnfinishedUpstream") === true,
    archivedNodeVersions: stringArray(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

function createMiniKvFrozenPlan(json: Record<string, unknown> | null): MiniKvFrozenActivePlanReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    status: stringValue(valueAt(json, "status")),
    activeShardPrototypeAllowed: valueAt(json, "activePrototypePlan", "activeShardPrototypeAllowed") === true,
    routerActivationAllowed: valueAt(json, "activePrototypePlan", "routerActivationAllowed") === true,
    writeRoutingAllowed: valueAt(json, "activePrototypePlan", "writeRoutingAllowed") === true,
    rollingCurrentUsedForFrozenBaseline:
      valueAt(json, "activePrototypePlanFreeze", "rollingCurrentUsedForFrozenBaseline") === true,
  };
}

function createIntake(
  source: SourceNodeV381ArchiveVerificationReference,
  javaHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  miniKvHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  miniKvFrozenPlanFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  ready: boolean,
): ActiveShardPlanBoundaryHandoffIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-active-shard-plan-boundary-handoff-intake" as const,
    sourceSpan: "Node v381 + Java v158 + mini-kv v149" as const,
    sourceNodeV381Digest: source.archiveVerificationDigest,
    javaV158Digest: javaHandoffFile.digest,
    miniKvV149Digest: miniKvHandoffFile.digest,
    miniKvV148Digest: miniKvFrozenPlanFile.digest,
    usesFrozenJavaV158Handoff: javaHandoffFile.usedHistoricalFallback,
    usesFrozenMiniKvV149Handoff: miniKvHandoffFile.usedHistoricalFallback,
    verifiesMiniKvV148FrozenPlan: miniKvFrozenPlanFile.usedHistoricalFallback,
    consumesRollingCurrentAsHistoricalBaseline: false as const,
    activeShardPrototypeEnabled: false as const,
    liveReadGateRequiredBeforeRuntimeProbe: true as const,
    ready,
  };
  return {
    ...record,
    intakeDigest: sha256StableJson(record),
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v383",
  };
}

function createChecks(
  source: SourceNodeV381ArchiveVerificationReference,
  javaHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  miniKvHandoffFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  miniKvFrozenPlanFile: ActiveShardPlanBoundaryHandoffEvidenceFileReference,
  java: JavaActiveShardPlanBoundaryHandoffReference,
  miniKv: MiniKvActiveShardPlanConsumerHandoffReference,
  miniKvFrozenPlan: MiniKvFrozenActivePlanReference,
  intake: ActiveShardPlanBoundaryHandoffIntakeRecord,
): ActiveShardPlanBoundaryHandoffIntakeChecks {
  return {
    sourceNodeV381Ready: source.readyForNodeV381NextArchiveVerification,
    sourceNodeV381ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-active-shard-plan-evidence-intake-archive-verified",
    sourceNodeV381BoundariesClosed:
      !source.startsJavaService && !source.startsMiniKvService && !source.stopsJavaService && !source.stopsMiniKvService
      && !source.connectsManagedAudit && !source.executionAllowed && !source.activeShardPrototypeEnabled,
    javaV158HandoffFilePresent: javaHandoffFile.exists,
    javaV158VersionValid: java.version === "Java v158",
    javaV158ReadOnly: java.readOnly,
    javaV158ExecutionBlocked: !java.executionAllowed,
    javaV158ActivePrototypeDisabled: !java.activeShardPrototypeEnabled,
    javaV158LiveReadDisabled: !java.liveReadAllowed,
    javaV158StatusPassed: java.status === "passed",
    javaV158SourceReferencesV157:
      java.sourceHandoffVersion === "Java v157" && java.frozenJavaEvidence.includes("Java v157"),
    javaV158ReferencesNodeV380AndV381:
      java.lastConsumedByNodeVersion === "Node v380" && java.nodeArchiveVerificationVersion === "Node v381"
      && java.nodeConsumptionReferences.some((reference) => reference.includes("Node v380"))
      && java.nodeConsumptionReferences.some((reference) => reference.includes("Node v381")),
    javaV158BoundaryRulesSafe:
      java.javaRole === "read-only-active-shard-plan-boundary-handoff"
      && java.activePrototypeAuthority === "mini-kv-active-prototype-plan"
      && java.javaBoundaryRules.includes("active-shard-prototype-authority-stays-with-mini-kv-plan")
      && java.javaBoundaryRules.includes("do-not-enable-java-shard-router-or-write-routing")
      && java.javaBoundaryRules.includes("live-read-gate-requires-explicit-service-start-port-and-cleanup-plan"),
    javaV158StopConditionsSafe:
      java.stopConditions.includes("request-would-enable-active-shard-prototype")
      && java.stopConditions.includes("node-requests-live-read-without-service-responsibility-plan")
      && java.stopConditions.includes("mini-kv-active-prototype-plan-not-frozen-or-not-read-only"),
    miniKvV149HandoffFilePresent: miniKvHandoffFile.exists,
    miniKvV149ReleaseVersionValid: miniKv.releaseVersion === "v149",
    miniKvV149ReadOnly: miniKv.readOnly,
    miniKvV149ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV149StatusAccepted: miniKv.status === "frozen-evidence-handoff-read-only",
    miniKvV149ConsumerHandoffReady:
      miniKv.consumerHandoffMode === "frozen-evidence-only"
      && miniKv.consumerFrozenReleaseVersion === "v148"
      && miniKv.consumerFrozenFixturePath === "fixtures/release/shard-readiness-v148.json"
      && miniKv.readyForNodeConsumption,
    miniKvV149ConsumerHandoffRequiresLiveGate:
      miniKv.liveReadGateRequiredBeforeRuntimeProbe
      && !miniKv.consumerStartsServices
      && !miniKv.consumerActiveShardPrototypeEnabled
      && !miniKv.consumerRouterActivationAllowed
      && !miniKv.consumerWriteRoutingAllowed
      && !miniKv.consumerExecutionAllowed,
    miniKvV149BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.setnxexExecutionAllowed && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
      && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated,
    miniKvV149ActivePrototypeStillDisabled:
      !miniKv.activeShardPrototypeAllowed && !miniKv.routerActivationAllowed && !miniKv.shardDirectoryCreationAllowed
      && !miniKv.multiProcessStartAllowed && !miniKv.writeRoutingAllowed,
    miniKvV149ActivePlanFreezeSafe:
      miniKv.activePlanFreezeFrozenReleaseVersion === "v148"
      && miniKv.activePlanFreezeFrozenFixturePath === "fixtures/release/shard-readiness-v148.json"
      && miniKv.activePlanFreezePreservesActivePrototypePlan
      && !miniKv.activePlanFreezeRouterActivationAllowed
      && !miniKv.activePlanFreezeWriteRoutingAllowed
      && !miniKv.activePlanFreezeRollingCurrentUsedForFrozenBaseline,
    miniKvV149HistoricalFallbackSafe:
      miniKv.previousConsumedReleaseVersion === "v148"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v148.json"
      && miniKv.previousConsumptionNodeVersion === "Node v382 pending completed evidence intake"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline
      && miniKv.nodeV381ArchiveVerificationPreserved
      && !miniKv.nodeV382ReadsUnfinishedUpstream,
    miniKvV149PreservesNodeV381Path:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v381"),
    miniKvV148FrozenPlanFilePresent: miniKvFrozenPlanFile.exists,
    miniKvV148FrozenPlanValid:
      miniKvFrozenPlan.project === "mini-kv"
      && miniKvFrozenPlan.releaseVersion === "v148"
      && miniKvFrozenPlan.readOnly
      && !miniKvFrozenPlan.executionAllowed
      && miniKvFrozenPlan.status === "active-prototype-plan-frozen-read-only"
      && !miniKvFrozenPlan.activeShardPrototypeAllowed
      && !miniKvFrozenPlan.routerActivationAllowed
      && !miniKvFrozenPlan.writeRoutingAllowed
      && !miniKvFrozenPlan.rollingCurrentUsedForFrozenBaseline,
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaHandoffFile.usedHistoricalFallback
      && miniKvHandoffFile.usedHistoricalFallback
      && miniKvFrozenPlanFile.usedHistoricalFallback,
    intakeDigestStable: isDigest(intake.intakeDigest),
    noRollingCurrentHistoricalBaseline:
      !intake.consumesRollingCurrentAsHistoricalBaseline
      && miniKvHandoffFile.configuredPath.endsWith("shard-readiness-v149.json"),
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForActiveShardPlanBoundaryHandoffIntake: false,
  };
}

function createSummary(
  java: JavaActiveShardPlanBoundaryHandoffReference,
  miniKv: MiniKvActiveShardPlanConsumerHandoffReference,
  miniKvFrozenPlan: MiniKvFrozenActivePlanReference,
  checks: ActiveShardPlanBoundaryHandoffIntakeChecks,
  productionBlockers: readonly ActiveShardPlanBoundaryHandoffIntakeMessage[],
  warnings: readonly ActiveShardPlanBoundaryHandoffIntakeMessage[],
  recommendations: readonly ActiveShardPlanBoundaryHandoffIntakeMessage[],
): ActiveShardPlanBoundaryHandoffIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [
      java.status === "passed",
      miniKv.status === "frozen-evidence-handoff-read-only" && miniKv.readyForNodeConsumption,
      miniKvFrozenPlan.status === "active-prototype-plan-frozen-read-only",
    ].filter(Boolean).length,
    javaBoundaryRuleCount: java.javaBoundaryRules.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ActiveShardPlanBoundaryHandoffIntakeChecks,
): ActiveShardPlanBoundaryHandoffIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV381Ready, "SOURCE_NODE_V381_NOT_READY", "node-v381", "Node v381 must be ready for v382 intake."],
    [checks.sourceNodeV381ArchiveVerified, "SOURCE_NODE_V381_ARCHIVE_NOT_VERIFIED", "node-v381", "Node v381 archive verification must be complete."],
    [checks.javaV158HandoffFilePresent, "JAVA_V158_HANDOFF_MISSING", "java-v158", "Java v158 boundary handoff evidence must be frozen."],
    [checks.javaV158BoundaryRulesSafe, "JAVA_V158_BOUNDARY_RULES_UNSAFE", "java-v158", "Java v158 must keep active shard authority outside Java."],
    [checks.javaV158StopConditionsSafe, "JAVA_V158_STOP_CONDITIONS_UNSAFE", "java-v158", "Java v158 must fail closed on live read or active prototype requests."],
    [checks.miniKvV149HandoffFilePresent, "MINI_KV_V149_HANDOFF_MISSING", "mini-kv-v149", "mini-kv v149 consumer handoff evidence must be frozen."],
    [checks.miniKvV149ConsumerHandoffReady, "MINI_KV_V149_HANDOFF_NOT_READY", "mini-kv-v149", "mini-kv v149 must be ready for frozen evidence consumption."],
    [checks.miniKvV149ConsumerHandoffRequiresLiveGate, "MINI_KV_V149_LIVE_GATE_UNSAFE", "mini-kv-v149", "mini-kv v149 must require an explicit live-read gate before runtime probing."],
    [checks.miniKvV149BoundarySafe, "MINI_KV_V149_BOUNDARY_UNSAFE", "mini-kv-v149", "mini-kv v149 must keep writes, admin, router, and storage mutation disabled."],
    [checks.miniKvV148FrozenPlanValid, "MINI_KV_V148_FROZEN_PLAN_INVALID", "mini-kv-v148", "mini-kv v148 frozen active plan must be present and read-only."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v382 inputs must resolve to frozen historical snapshots."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v382 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v382 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ActiveShardPlanBoundaryHandoffIntakeMessage[] {
  return [{
    code: "BOUNDARY_HANDOFF_IS_NOT_LIVE_READ",
    severity: "warning",
    source: "node-v382",
    message: "v382 consumes frozen Java/mini-kv boundary handoff evidence only; it does not run a live-read gate.",
  }];
}

function collectRecommendations(ready: boolean): ActiveShardPlanBoundaryHandoffIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V382_BEFORE_NEXT_GATE" : "REPAIR_BOUNDARY_HANDOFF_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v382",
    message: ready
      ? "Archive and verify v382 before considering a live-read gate with explicit service ownership."
      : "Repair missing frozen boundary handoff evidence before rerunning v382.",
  }];
}

function readProjectJson(projectRoot: string, relativePath: string): Record<string, unknown> | null {
  const absolutePath = path.join(projectRoot, ...relativePath.split("/"));
  if (!existsSync(absolutePath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(absolutePath, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function readHistoricalJson(inputPath: string): Record<string, unknown> | null {
  if (!historicalEvidenceExists(inputPath)) {
    return null;
  }
  try {
    return JSON.parse(readHistoricalEvidenceFile(inputPath, "utf8")) as Record<string, unknown>;
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

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function numberValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function normalizePath(input: string): string {
  return input.replace(/\\/g, "/");
}

function isDigest(value: string | null): boolean {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
