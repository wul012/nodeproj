import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
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
  CompletedShardEvidenceFileReference,
  CompletedShardEvidenceIntakeChecks,
  CompletedShardEvidenceIntakeMessage,
  CompletedShardEvidenceIntakeRecord,
  CompletedShardEvidenceIntakeSummary,
  JavaCompletedShardEvidenceIndexReference,
  JavaCompletedShardEvidenceVerificationReference,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile,
  MiniKvCompletedShardEvidenceReference,
  SourceNodeV377ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-completed-shard-readiness-evidence-intake";
const SOURCE_NODE_V377_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption-archive-verification";
const ACTIVE_PLAN =
  "docs/plans3/v377-post-java-mini-kv-shard-readiness-evidence-consumption-archive-verification-roadmap.md";
const NEXT_PLAN =
  "docs/plans3/v378-post-java-mini-kv-completed-shard-readiness-evidence-intake-roadmap.md";
const SOURCE_NODE_V377_ARCHIVE =
  "e/377/evidence/java-mini-kv-shard-readiness-evidence-consumption-archive-verification-v377-http.json";
const JAVA_V155_INDEX =
  "D:/javaproj/advanced-order-platform/e/155/evidence/java-shard-readiness-evidence-index-v155.json";
const JAVA_V155_INDEX_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/155/evidence/java-shard-readiness-evidence-index-v155.json";
const JAVA_V156_VERIFICATION =
  "D:/javaproj/advanced-order-platform/e/156/evidence/java-shard-readiness-evidence-verification-v156.json";
const JAVA_V156_VERIFICATION_FALLBACK =
  "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/156/evidence/java-shard-readiness-evidence-verification-v156.json";
const MINI_KV_V146_SNAPSHOT =
  "D:/C/mini-kv/fixtures/release/shard-readiness-v146.json";
const MINI_KV_V146_SNAPSHOT_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v146.json";

interface ParsedCompletedEvidence {
  sourceNodeV377Json: Record<string, unknown> | null;
  javaIndexJson: Record<string, unknown> | null;
  javaVerificationJson: Record<string, unknown> | null;
  miniKvJson: Record<string, unknown> | null;
}

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeProfile {
  void input.config;
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV377Json = readProjectJson(projectRoot, SOURCE_NODE_V377_ARCHIVE);
  const javaIndexFile = evidenceFileReference("java-v155-index", JAVA_V155_INDEX, JAVA_V155_INDEX_FALLBACK);
  const javaVerificationFile = evidenceFileReference("java-v156-verification", JAVA_V156_VERIFICATION,
    JAVA_V156_VERIFICATION_FALLBACK);
  const miniKvSnapshotFile = evidenceFileReference("mini-kv-v146-snapshot", MINI_KV_V146_SNAPSHOT,
    MINI_KV_V146_SNAPSHOT_FALLBACK);
  const parsed: ParsedCompletedEvidence = {
    sourceNodeV377Json,
    javaIndexJson: readHistoricalJson(JAVA_V155_INDEX),
    javaVerificationJson: readHistoricalJson(JAVA_V156_VERIFICATION),
    miniKvJson: readHistoricalJson(MINI_KV_V146_SNAPSHOT),
  };
  const sourceNodeV377 = createSourceNodeV377(parsed.sourceNodeV377Json);
  const javaIndex = createJavaIndex(parsed.javaIndexJson);
  const javaVerification = createJavaVerification(parsed.javaVerificationJson);
  const miniKvEvidence = createMiniKvEvidence(parsed.miniKvJson);
  const draftIntake = createIntake(sourceNodeV377, javaVerificationFile, javaIndexFile, miniKvSnapshotFile, false);
  const checks = createChecks(sourceNodeV377, javaVerificationFile, javaIndexFile, miniKvSnapshotFile, javaVerification,
    javaIndex, miniKvEvidence, draftIntake);
  checks.readyForCompletedShardReadinessEvidenceIntake = Object.entries(checks)
    .filter(([key]) => key !== "readyForCompletedShardReadinessEvidenceIntake")
    .every(([, value]) => value);
  const ready = checks.readyForCompletedShardReadinessEvidenceIntake;
  const intake = createIntake(sourceNodeV377, javaVerificationFile, javaIndexFile, miniKvSnapshotFile, ready);
  checks.intakeDigestStable = isDigest(intake.intakeDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(miniKvEvidence);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaIndex, javaVerification, miniKvEvidence, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver Java/mini-kv completed shard readiness evidence intake",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    intakeState: ready ? "java-mini-kv-completed-shard-readiness-evidence-intake-ready" : "blocked",
    intakeDecision: ready ? "consume-java-v156-and-mini-kv-v146-completed-evidence" : "blocked",
    readyForCompletedShardReadinessEvidenceIntake: ready,
    readyForNodeV379ArchiveVerification: ready,
    activeNodeVersion: "Node v378",
    sourceNodeVersion: "Node v377",
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
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV377,
    javaIndexFile,
    javaVerificationFile,
    miniKvSnapshotFile,
    javaIndex,
    javaVerification,
    miniKvEvidence,
    intake,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      completedEvidenceIntakeJson: ROUTE_PATH,
      completedEvidenceIntakeMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV377Json: SOURCE_NODE_V377_ROUTE,
      sourceNodeV377Markdown: `${SOURCE_NODE_V377_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v379",
    },
    nextActions: ready
      ? [
        "Use Node v379 to verify the v378 archive before consuming another shard-readiness step.",
        "Keep Java and mini-kv parallel work independent; Node should consume only completed frozen evidence.",
        "Do not convert readiness evidence into active shard routing without a separate mini-kv prototype plan.",
      ]
      : [
        "Freeze the missing Java or mini-kv completed evidence before retrying v378.",
        "Do not read rolling current files to satisfy historical evidence intake.",
      ],
  };
}

function evidenceFileReference(
  id: string,
  configuredPath: string,
  historicalFallbackPath: string,
): CompletedShardEvidenceFileReference {
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

function createSourceNodeV377(json: Record<string, unknown> | null): SourceNodeV377ArchiveVerificationReference {
  return {
    sourceVersion: "Node v377",
    profileVersion: stringValue(valueAt(json, "profileVersion")),
    archiveVerificationState: stringValue(valueAt(json, "archiveVerificationState")),
    archiveVerificationDecision: stringValue(valueAt(json, "archiveVerificationDecision")),
    readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification:
      valueAt(json, "readyForJavaMiniKvShardEvidenceConsumptionArchiveVerification") === true,
    readyForNodeV378CompletedEvidenceIntake: valueAt(json, "readyForNodeV378CompletedEvidenceIntake") === true,
    activeNodeVersion: "Node v377",
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

function createJavaIndex(json: Record<string, unknown> | null): JavaCompletedShardEvidenceIndexReference {
  const entries = arrayValue(valueAt(json, "evidenceEntries"));
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    lastConsumedByNodeVersion: stringOrNull(valueAt(json, "lastConsumedByNodeVersion")),
    requiredContractFieldCount: stringArray(valueAt(json, "requiredContractFields")).length,
    evidenceEntryCount: entries.length,
    frozenEntryCount: entries.filter((entry) => valueAt(entry, "frozen") === true).length,
    rollingCurrentPointerCount: entries.filter((entry) => valueAt(entry, "rollingCurrentPointer") === true).length,
    evidenceVersions: entries.map((entry) => stringValue(valueAt(entry, "evidenceVersion"))).filter(Boolean),
    fallbackPolicy: stringArray(valueAt(json, "fallbackPolicy")),
    compatibilityGuarantees: stringArray(valueAt(json, "compatibilityGuarantees")),
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
  };
}

function createJavaVerification(json: Record<string, unknown> | null): JavaCompletedShardEvidenceVerificationReference {
  const checks = arrayValue(valueAt(json, "checks"));
  return {
    project: valueAt(json, "project") === "advanced-order-platform" ? "advanced-order-platform" : "unknown",
    version: stringValue(valueAt(json, "version")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    sourceIndexVersion: stringValue(valueAt(json, "sourceIndexVersion")),
    sourceIndexEvidencePath: stringOrNull(valueAt(json, "sourceIndexEvidencePath")),
    verifiedEntryCount: numberValue(valueAt(json, "verifiedEntryCount")),
    verifiedEvidenceVersions: stringArray(valueAt(json, "verifiedEvidenceVersions")),
    checkCount: checks.length,
    passedCheckCount: checks.filter((check) => valueAt(check, "passed") === true).length,
    failedCheckCount: checks.filter((check) => valueAt(check, "passed") !== true).length,
    fallbackPolicy: stringArray(valueAt(json, "fallbackPolicy")),
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
  };
}

function createMiniKvEvidence(json: Record<string, unknown> | null): MiniKvCompletedShardEvidenceReference {
  return {
    project: valueAt(json, "project") === "mini-kv" ? "mini-kv" : "unknown",
    contract: stringValue(valueAt(json, "contract")),
    evidenceType: stringValue(valueAt(json, "evidenceType")),
    releaseVersion: stringValue(valueAt(json, "releaseVersion")),
    readOnly: valueAt(json, "readOnly") === true,
    executionAllowed: valueAt(json, "executionAllowed") === true,
    shardEnabled: valueAt(json, "shardEnabled") === true,
    shardCount: numberValue(valueAt(json, "shardCount")),
    slotCount: numberValue(valueAt(json, "slotCount")),
    routingMode: stringValue(valueAt(json, "routingMode")),
    status: stringValue(valueAt(json, "status")),
    evidencePath: stringOrNull(valueAt(json, "evidencePath")),
    previousConsumedReleaseVersion: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedReleaseVersion")),
    previousConsumedFixturePath: stringOrNull(valueAt(json, "historicalFallback", "previousConsumedFixturePath")),
    rollingCurrentUsedForHistoricalBaseline:
      valueAt(json, "historicalFallback", "rollingCurrentUsedForHistoricalBaseline") === true,
    nodeV376ConsumptionPreserved: valueAt(json, "historicalFallback", "nodeV376ConsumptionPreserved") === true,
    archivedNodeVersions: stringArray(valueAt(json, "archiveCompatibility", "archivedNodeVersions")),
    changesArchivedNodeEvidence: valueAt(json, "archiveCompatibility", "changesArchivedNodeEvidence") === true,
    writeCommandsAllowed: valueAt(json, "boundaries", "writeCommandsAllowed") === true,
    adminCommandsAllowed: valueAt(json, "boundaries", "adminCommandsAllowed") === true,
    loadRestoreCompactAllowed: valueAt(json, "boundaries", "loadRestoreCompactAllowed") === true,
    activeRouterInstalled: valueAt(json, "boundaries", "activeRouterInstalled") === true,
    storageDirectoriesCreated: valueAt(json, "boundaries", "storageDirectoriesCreated") === true,
    multiProcessStarted: valueAt(json, "boundaries", "multiProcessStarted") === true,
    futureNodeConsumer: stringOrNull(valueAt(json, "archiveCompatibility", "futureNodeConsumer"))
      ?? stringOrNull(valueAt(json, "diagnostics", "nodeConsumer")),
    evidenceDigest: stringOrNull(valueAt(json, "evidenceDigest")),
  };
}

function createIntake(
  source: SourceNodeV377ArchiveVerificationReference,
  javaVerificationFile: CompletedShardEvidenceFileReference,
  javaIndexFile: CompletedShardEvidenceFileReference,
  miniKvSnapshotFile: CompletedShardEvidenceFileReference,
  ready: boolean,
): CompletedShardEvidenceIntakeRecord {
  const record = {
    intakeMode: "java-mini-kv-completed-shard-readiness-evidence-intake" as const,
    sourceSpan: "Node v377 + Java v156/v155 + mini-kv v146" as const,
    sourceNodeV377Digest: source.archiveVerificationDigest,
    javaV156Digest: javaVerificationFile.digest,
    javaV155Digest: javaIndexFile.digest,
    miniKvV146Digest: miniKvSnapshotFile.digest,
    usesFrozenJavaV156Verification: javaVerificationFile.usedHistoricalFallback,
    usesFrozenJavaV155Index: javaIndexFile.usedHistoricalFallback,
    usesFrozenMiniKvV146Snapshot: miniKvSnapshotFile.usedHistoricalFallback,
    consumesRollingCurrentAsHistoricalBaseline: false as const,
    ready,
  };
  return {
    ...record,
    intakeDigest: sha256StableJson(record),
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v379",
  };
}

function createChecks(
  source: SourceNodeV377ArchiveVerificationReference,
  javaVerificationFile: CompletedShardEvidenceFileReference,
  javaIndexFile: CompletedShardEvidenceFileReference,
  miniKvSnapshotFile: CompletedShardEvidenceFileReference,
  javaVerification: JavaCompletedShardEvidenceVerificationReference,
  javaIndex: JavaCompletedShardEvidenceIndexReference,
  miniKv: MiniKvCompletedShardEvidenceReference,
  intake: CompletedShardEvidenceIntakeRecord,
): CompletedShardEvidenceIntakeChecks {
  return {
    sourceNodeV377Ready: source.readyForNodeV378CompletedEvidenceIntake,
    sourceNodeV377ArchiveVerified:
      source.archiveVerificationState === "java-mini-kv-shard-readiness-evidence-consumption-archive-verified",
    sourceNodeV377BoundariesClosed:
      !source.startsJavaService && !source.startsMiniKvService && !source.stopsJavaService && !source.stopsMiniKvService
      && !source.connectsManagedAudit && !source.executionAllowed,
    javaV156VerificationFilePresent: javaVerificationFile.exists,
    javaV155IndexFilePresent: javaIndexFile.exists,
    javaV156VersionValid: javaVerification.version === "Java v156",
    javaV155VersionValid: javaIndex.version === "Java v155",
    javaV156ReadOnly: javaVerification.readOnly,
    javaV156ExecutionBlocked: !javaVerification.executionAllowed,
    javaV156StatusPassed: javaVerification.status === "passed",
    javaV156ChecksAllPassed:
      javaVerification.checkCount > 0 && javaVerification.checkCount === javaVerification.passedCheckCount,
    javaV156ReferencesJavaV155:
      javaVerification.sourceIndexVersion === "Java v155"
      && javaVerification.sourceIndexEvidencePath === "e/155/evidence/java-shard-readiness-evidence-index-v155.json",
    javaV156VerifiedEntryCountValid:
      javaVerification.verifiedEntryCount === 2
      && javaVerification.verifiedEvidenceVersions.includes("Java v153")
      && javaVerification.verifiedEvidenceVersions.includes("Java v154"),
    javaV156NoRollingCurrentPolicy:
      javaVerification.fallbackPolicy.includes("do-not-read-rolling-current-files-for-historical-baselines"),
    javaV155EntriesFrozen:
      javaIndex.evidenceEntryCount === 2 && javaIndex.frozenEntryCount === javaIndex.evidenceEntryCount,
    javaV155NoRollingCurrentPointers: javaIndex.rollingCurrentPointerCount === 0,
    javaV155RequiredFieldsIndexed: javaIndex.requiredContractFieldCount === 9,
    miniKvV146SnapshotPresent: miniKvSnapshotFile.exists,
    miniKvV146ReleaseVersionValid: miniKv.releaseVersion === "v146",
    miniKvV146ReadOnly: miniKv.readOnly,
    miniKvV146ExecutionBlocked: !miniKv.executionAllowed,
    miniKvV146StatusAccepted: miniKv.status === "historical-fallback-hardened-read-only",
    miniKvV146HistoricalFallbackHardened:
      miniKv.previousConsumedReleaseVersion === "v145"
      && miniKv.previousConsumedFixturePath === "fixtures/release/shard-readiness-v145.json"
      && !miniKv.rollingCurrentUsedForHistoricalBaseline,
    miniKvV146PreservesNodeV376:
      miniKv.nodeV376ConsumptionPreserved && miniKv.archivedNodeVersions.includes("Node v376"),
    miniKvV146DoesNotMutateArchivedNodeEvidence: !miniKv.changesArchivedNodeEvidence,
    miniKvV146BoundarySafe:
      !miniKv.writeCommandsAllowed && !miniKv.adminCommandsAllowed && !miniKv.loadRestoreCompactAllowed
      && !miniKv.activeRouterInstalled && !miniKv.storageDirectoriesCreated && !miniKv.multiProcessStarted,
    miniKvV146FutureNodeConsumerReady:
      miniKv.futureNodeConsumer?.includes("Node v378") === true,
    allEvidenceUsesHistoricalFallbackSnapshots:
      javaVerificationFile.usedHistoricalFallback && javaIndexFile.usedHistoricalFallback
      && miniKvSnapshotFile.usedHistoricalFallback,
    intakeDigestStable: isDigest(intake.intakeDigest),
    noRollingCurrentHistoricalBaseline: !intake.consumesRollingCurrentAsHistoricalBaseline,
    noAutomaticUpstreamStartStop: true,
    noUpstreamMutation: true,
    noManagedAuditConnection: true,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForCompletedShardReadinessEvidenceIntake: false,
  };
}

function createSummary(
  javaIndex: JavaCompletedShardEvidenceIndexReference,
  javaVerification: JavaCompletedShardEvidenceVerificationReference,
  miniKv: MiniKvCompletedShardEvidenceReference,
  checks: CompletedShardEvidenceIntakeChecks,
  productionBlockers: readonly CompletedShardEvidenceIntakeMessage[],
  warnings: readonly CompletedShardEvidenceIntakeMessage[],
  recommendations: readonly CompletedShardEvidenceIntakeMessage[],
): CompletedShardEvidenceIntakeSummary {
  return {
    evidenceSourceCount: 3,
    readyEvidenceSourceCount: [javaIndex.status === "passed", javaVerification.status === "passed",
      miniKv.status === "historical-fallback-hardened-read-only"].filter(Boolean).length,
    javaVerificationCheckCount: javaVerification.checkCount,
    javaVerificationPassedCheckCount: javaVerification.passedCheckCount,
    requiredContractFieldCount: javaIndex.requiredContractFieldCount,
    archivedNodeVersionCount: miniKv.archivedNodeVersions.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(checks: CompletedShardEvidenceIntakeChecks): CompletedShardEvidenceIntakeMessage[] {
  const rules: Array<[boolean, string, string, string]> = [
    [checks.sourceNodeV377Ready, "SOURCE_NODE_V377_NOT_READY", "node-v377", "Node v377 must be ready for v378 intake."],
    [checks.javaV156VerificationFilePresent, "JAVA_V156_VERIFICATION_MISSING", "java-v156", "Java v156 verification evidence must be frozen."],
    [checks.javaV155IndexFilePresent, "JAVA_V155_INDEX_MISSING", "java-v155", "Java v155 evidence index must be frozen."],
    [checks.javaV156ChecksAllPassed, "JAVA_V156_CHECKS_NOT_PASSED", "java-v156", "Java v156 verification checks must all pass."],
    [checks.javaV155EntriesFrozen, "JAVA_V155_ENTRIES_NOT_FROZEN", "java-v155", "Java index entries must be frozen."],
    [checks.miniKvV146SnapshotPresent, "MINI_KV_V146_SNAPSHOT_MISSING", "mini-kv-v146", "mini-kv v146 snapshot must exist under historical fixtures."],
    [checks.miniKvV146HistoricalFallbackHardened, "MINI_KV_V146_FALLBACK_NOT_HARDENED", "mini-kv-v146", "mini-kv v146 must preserve v145 as the previous historical baseline."],
    [checks.allEvidenceUsesHistoricalFallbackSnapshots, "EVIDENCE_NOT_FROZEN", "historical-fixtures", "All v378 inputs must resolve to frozen historical snapshots."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v378 must not start or stop Java/mini-kv."],
    [checks.noUpstreamMutation, "UPSTREAM_MUTATION_ALLOWED", "runtime-boundary", "v378 must not mutate sibling state."],
    [checks.productionAuditStillBlocked, "PRODUCTION_AUDIT_OPENED", "production-boundary", "Production audit must remain blocked."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(miniKv: MiniKvCompletedShardEvidenceReference): CompletedShardEvidenceIntakeMessage[] {
  const warnings: CompletedShardEvidenceIntakeMessage[] = [{
    code: "COMPLETED_EVIDENCE_IS_STILL_READINESS_ONLY",
    severity: "warning",
    source: "shard-readiness",
    message: "Java v156 and mini-kv v146 are completed evidence inputs, not active shard routing.",
  }];
  if (miniKv.evidencePath === "fixtures/release/shard-readiness.json") {
    warnings.push({
      code: "SOURCE_MINI_KV_V146_WAS_CURRENT_FILE",
      severity: "warning",
      source: "mini-kv-v146",
      message: "mini-kv v146 completed evidence came from current output, so Node freezes it as shard-readiness-v146.json.",
    });
  }
  return warnings;
}

function collectRecommendations(ready: boolean): CompletedShardEvidenceIntakeMessage[] {
  return [{
    code: ready ? "ARCHIVE_V378_BEFORE_NEXT_CONSUMPTION" : "REPAIR_COMPLETED_EVIDENCE_BEFORE_RETRY",
    severity: "recommendation",
    source: "node-v378",
    message: ready
      ? "Archive and verify v378 before consuming another Java/mini-kv shard-readiness step."
      : "Repair missing frozen evidence before rerunning v378.",
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

function arrayValue(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => item !== null && typeof item === "object") : [];
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
