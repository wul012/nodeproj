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
  ActiveShardPlanEvidenceFileReference,
  ActiveShardPlanEvidenceIntakeChecks,
  ActiveShardPlanEvidenceIntakeMessage,
  ActiveShardPlanEvidenceIntakeRecord,
  ActiveShardPlanEvidenceIntakeSummary,
  JavaShardEvidenceHandoffReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeProfile,
  MiniKvActiveShardPlanFrozenEvidenceReference,
  SourceNodeV379ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-active-shard-plan-evidence-intake";
const SOURCE_NODE_V379_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v379-post-java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v380-post-java-mini-kv-active-shard-plan-evidence-intake-roadmap.md";
const SOURCE_NODE_V379_ARCHIVE =
  "e/379/evidence/java-mini-kv-completed-shard-readiness-evidence-intake-archive-verification-v379-http.json";
const JAVA_V157_HANDOFF =
  "D:/javaproj/advanced-order-platform/e/157/evidence/java-shard-readiness-evidence-handoff-v157.json";
const JAVA_V157_HANDOFF_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/157/evidence/java-shard-readiness-evidence-handoff-v157.json";
const MINI_KV_V147_SNAPSHOT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v147.json";
const MINI_KV_V147_SNAPSHOT_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v147.json";

interface ParsedActiveShardPlanEvidence {
  sourceNodeV379Json: Record<string, unknown> | null;
  javaHandoffJson: Record<string, unknown> | null;
  miniKvJson: Record<string, unknown> | null;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const javaHandoffFile = evidenceFileReference("java-v157-handoff", JAVA_V157_HANDOFF, JAVA_V157_HANDOFF_FALLBACK);
  const miniKvSnapshotFile = evidenceFileReference("mini-kv-v147-snapshot", MINI_KV_V147_SNAPSHOT,
    MINI_KV_V147_SNAPSHOT_FALLBACK);
  const parsed: ParsedActiveShardPlanEvidence = {
    sourceNodeV379Json: readProjectJson(projectRoot, SOURCE_NODE_V379_ARCHIVE),
    javaHandoffJson: readHistoricalJson(JAVA_V157_HANDOFF),
    miniKvJson: readHistoricalJson(MINI_KV_V147_SNAPSHOT),
  };
  const sourceNodeV379 = createSourceNodeV379(parsed.sourceNodeV379Json);
  const javaHandoff = createJavaHandoff(parsed.javaHandoffJson);
  const miniKvEvidence = createMiniKvEvidence(parsed.miniKvJson);
  const draftIntake = createIntake(sourceNodeV379, javaHandoffFile, miniKvSnapshotFile, false);
  const checks = createChecks(sourceNodeV379, javaHandoffFile, miniKvSnapshotFile, javaHandoff, miniKvEvidence,
    draftIntake);
  checks.readyForActiveShardPlanEvidenceIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForActiveShardPlanEvidenceIntake")
    .every(([, value]) => value);
  const ready = checks.readyForActiveShardPlanEvidenceIntake;
  const intake = createIntake(sourceNodeV379, javaHandoffFile, miniKvSnapshotFile, ready);
  checks.intakeDigestStable = isDigest(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaHandoff, miniKvEvidence, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver Java/mini-kv active shard plan evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-active-shard-plan-evidence-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v157-and-mini-kv-v147-active-plan-evidence" : "blocked",
    readyForActiveShardPlanEvidenceIntake: ready,
    readyForNodeV381ArchiveVerification: ready,
    activeNodeVersion: "Node v380",
    sourceNodeVersion: "Node v379",
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
    sourceNodeV379,
    javaHandoffFile,
    miniKvSnapshotFile,
    javaHandoff,
    miniKvEvidence,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      activeShardPlanEvidenceIntakeJson: ROUTE_PATH,
      activeShardPlanEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV379Json: SOURCE_NODE_V379_ROUTE,
      sourceNodeV379Markdown: `${SOURCE_NODE_V379_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v381",
    },
    nextActions: ready
      ? [
        "Use Node v381 to archive and verify the v380 active shard plan evidence intake.",
        "Keep active shard prototype disabled until a separate live-read gate plan defines service startup and cleanup ownership.",
        "Do not treat Java v157 or mini-kv v147 as write routing, active router, or production audit authorization.",
      ]
      : [
        "Repair missing Java v157 handoff or mini-kv v147 frozen evidence before retrying v380.",
        "Do not read mini-kv rolling current files to satisfy historical active plan evidence intake.",
      ],
  };
}

function evidenceFileReference(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): ActiveShardPlanEvidenceFileReference {
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

function createSourceNodeV379(json: Record<string, unknown> | null): SourceNodeV379ArchiveVerificationReference {
  return {
    sourceVersion: "Node v379",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForCompletedShardEvidenceIntakeArchiveVerification:
      valueAt(json, "readyForCompletedShardEvidenceIntakeArchiveVerification") === true,
    readyForNodeV380NextCompletedEvidenceOrLiveGate:
      valueAt(json, "readyForNodeV380NextCompletedEvidenceOrLiveGate") === true,
    activeNodeVersion: "Node v379",
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
  };
}

function createJavaHandoff(json: Record<string, unknown> | null): JavaShardEvidenceHandoffReference {
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    sourceIndexVersion: stringValue(valueAt(json, "sourceIndexVersion")),
    sourceVerificationVersion: stringValue(valueAt(json, "sourceVerificationVersion")),
    lastConsumedByNodeVersion: stringOrNull(valueAt(json, "lastConsumedByNodeVersion")),
    completedEvidenceVersions: stringArray(valueAt(json, "completedEvidenceVersions")),
    handoffArtifacts: stringArray(valueAt(json, "handoffArtifacts")),
    consumerRules: stringArray(valueAt(json, "consumerRules")),
    stopConditions: stringArray(valueAt(json, "stopConditions")),
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
  };
}

function createMiniKvEvidence(json: Record<string, unknown> | null): MiniKvActiveShardPlanFrozenEvidenceReference {
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
    previousConsumedReleaseVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedFixturePath")),
    previousConsumptionNodeVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumptionNodeVersion")),
    rollingCurrentUsedForHistoricalBaseline:
      valueAt(json, "historicalFallback", "rollingCurrentUsedForHistoricalBaseline") === true,
    archivedNodeVersions: stringArray(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

function createIntake(
  source: SourceNodeV379ArchiveVerificationReference,
  javaHandoffFile: ActiveShardPlanEvidenceFileReference,
  miniKvSnapshotFile: ActiveShardPlanEvidenceFileReference,
  ready: boolean,
): ActiveShardPlanEvidenceIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-active-shard-plan-evidence-intake" as const,
    sourceSpan: "Node v379 + Java v157 + mini-kv v147" as const,
    sourceNodeV379Digest: source.archiveVerificationDigest,
    javaV157Digest: javaHandoffFile.digest,
    miniKvV147Digest: miniKvSnapshotFile.digest,
    usesFrozenJavaV157Handoff: javaHandoffFile.usedHistoricalFallback,
    usesFrozenMiniKvV147Snapshot: miniKvSnapshotFile.usedHistoricalFallback,
    consumesRollingCurrentAsHistoricalBaseline: false as const,
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
    nextNodeVersionSuggested: "Node v381",
  };
}

function createChecks(
  source: SourceNodeV379ArchiveVerificationReference,
  javaHandoffFile: ActiveShardPlanEvidenceFileReference,
  miniKvSnapshotFile: ActiveShardPlanEvidenceFileReference,
  java: JavaShardEvidenceHandoffReference,
  miniKv: MiniKvActiveShardPlanFrozenEvidenceReference,
  intake: ActiveShardPlanEvidenceIntakeRecord,
): ActiveShardPlanEvidenceIntakeChecks {
  return {
    sourceNodeV379Ready: source.readyForNodeV380NextCompletedEvidenceOrLiveGate,
    sourceNodeV379ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-completed-shard-readiness-evidence-intake-archive-verified",
    sourceNodeV379BoundariesClosed:
      !source.startsJavaService && !source.startsMiniKvService && !source.stopsJavaService && !source.stopsMiniKvService
      && !source.connectsManagedAudit && !source.executionAllowed,
    javaV157HandoffFilePresent: javaHandoffFile.exists,
    javaV157VersionValid: java.version === "Java v157",
    javaV157ReadOnly: java.readOnly,
    javaV157ExecutionBlocked: !java.executionAllowed,
    javaV157StatusPassed: java.status === "passed",
    javaV157ReferencesJavaV155AndV156:
      java.sourceIndexVersion === "Java v155" && java.sourceVerificationVersion === "Java v156",
    javaV157CompletedEvidenceVersionsValid:
      java.completedEvidenceVersions.includes("Java v155") && java.completedEvidenceVersions.includes("Java v156"),
    javaV157ConsumerRulesSafe:
      java.consumerRules.includes("consume-only-completed-and-tagged-java-evidence")
      && java.consumerRules.includes("do-not-read-rolling-current-files-for-historical-baselines")
      && java.consumerRules.includes("do-not-start-or-stop-java-from-node-consumption"),
    javaV157StopConditionsSafe:
      java.stopConditions.includes("node-requests-live-read-without-explicit-service-plan")
      && java.stopConditions.includes("request-would-enable-write-routing-or-active-sharding"),
    miniKvV147SnapshotPresent: miniKvSnapshotFile.exists,
    miniKvV147ReleaseVersionValid: miniKv.releaseVersion === "v147",
    miniKvV147ReadOnly: miniKv.readOnly,
    miniKvV147ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV147StatusAccepted: miniKv.status === "active-prototype-prerequisite-read-only",
    miniKvV147ActivePrototypePlanPresent: miniKv.futureNodeConsumer?.includes("Node v380") === true,
    miniKvV147ActivePrototypeStillDisabled:
      !miniKv.activeShardPrototypeAllowed && !miniKv.routerActivationAllowed && !miniKv.shardDirectoryCreationAllowed
      && !miniKv.multiProcessStartAllowed && !miniKv.writeRoutingAllowed,
    miniKvV147BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.setnxexExecutionAllowed && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated
      && !miniKv.multiProcessStarted && !miniKv.archivedNodeEvidenceMutated,
    miniKvV147HistoricalFallbackSafe:
      miniKv.previousConsumedReleaseVersion === "v146"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v146.json"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline,
    miniKvV147PreservesNodeV378Path:
      !miniKv.changesArchivedNodeEvidence && miniKv.archivedNodeVersions.includes("Node v378"),
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaHandoffFile.usedHistoricalFallback && miniKvSnapshotFile.usedHistoricalFallback,
    intakeDigestStable: isDigest(intake.intakeDigest),
    noRollingCurrentHistoricalBaseline: !intake.consumesRollingCurrentAsHistoricalBaseline,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForActiveShardPlanEvidenceIntake: false,
  };
}

function createSummary(
  java: JavaShardEvidenceHandoffReference,
  miniKv: MiniKvActiveShardPlanFrozenEvidenceReference,
  checks: ActiveShardPlanEvidenceIntakeChecks,
  productionBlockers: readonly ActiveShardPlanEvidenceIntakeMessage[],
  warnings: readonly ActiveShardPlanEvidenceIntakeMessage[],
  recommendations: readonly ActiveShardPlanEvidenceIntakeMessage[],
): ActiveShardPlanEvidenceIntakeSummary {
  return {
    evidenceSourceCount: 2,
    readyEvidenceSourceCount: [java.status === "passed", miniKv.status === "active-prototype-prerequisite-read-only"]
      .filter(Boolean).length,
    completedJavaEvidenceVersionCount: java.completedEvidenceVersions.length,
    miniKvArchivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ActiveShardPlanEvidenceIntakeChecks,
): ActiveShardPlanEvidenceIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV379Ready, "SOURCE_NODE_V379_NOT_READY", "node-v379", "Node v379 must be ready for v380 intake."],
    [checks.sourceNodeV379ArchiveVerified, "SOURCE_NODE_V379_ARCHIVE_NOT_VERIFIED", "node-v379", "Node v379 archive verification must be complete."],
    [checks.javaV157HandoffFilePresent, "JAVA_V157_HANDOFF_MISSING", "java-v157", "Java v157 handoff evidence must be frozen."],
    [checks.javaV157StatusPassed, "JAVA_V157_HANDOFF_NOT_PASSED", "java-v157", "Java v157 handoff must be passed."],
    [checks.javaV157ConsumerRulesSafe, "JAVA_V157_CONSUMER_RULES_UNSAFE", "java-v157", "Java v157 must prohibit rolling current and Node-owned service lifecycle."],
    [checks.miniKvV147SnapshotPresent, "MINI_KV_V147_SNAPSHOT_MISSING", "mini-kv-v147", "mini-kv v147 active plan snapshot must exist under historical fixtures."],
    [checks.miniKvV147ActivePrototypeStillDisabled, "MINI_KV_ACTIVE_PROTOTYPE_ENABLED", "mini-kv-v147", "mini-kv v147 must keep active router, directories, processes, and write routing disabled."],
    [checks.miniKvV147BoundarySafe, "MINI_KV_V147_BOUNDARY_UNSAFE", "mini-kv-v147", "mini-kv v147 must keep writes, admin, restore/load/compact, and setnxex disabled."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v380 inputs must resolve to frozen historical snapshots."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v380 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v380 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(): ActiveShardPlanEvidenceIntakeMessage[] {
  return [{
    code: "ACTIVE_SHARD_PLAN_IS_PREREQUISITE_ONLY",
    severity: "warning",
    source: "mini-kv-v147",
    message: "mini-kv v147 exposes activePrototypePlan evidence, but router activation and write routing remain disabled.",
  }];
}

function collectRecommendations(ready: boolean): ActiveShardPlanEvidenceIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V380_BEFORE_LIVE_GATE" : "REPAIR_ACTIVE_PLAN_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v380",
    message: ready
      ? "Archive and verify v380 before considering a live-read gate with explicit Java/mini-kv service ownership."
      : "Repair missing frozen evidence before rerunning v380.",
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
