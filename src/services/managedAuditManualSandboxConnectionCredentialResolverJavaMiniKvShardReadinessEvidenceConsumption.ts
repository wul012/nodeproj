import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import { resolveHistoricalEvidencePath } from "./historicalEvidenceResolver.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationTypes.js";
import type {
  EvidenceFileReference,
  EvidenceProject,
  EvidenceSourceVersion,
  JavaMiniKvShardReadinessEvidenceConsumptionChecks,
  JavaMiniKvShardReadinessEvidenceConsumptionMessage,
  JavaMiniKvShardReadinessEvidenceConsumptionRecord,
  JavaMiniKvShardReadinessEvidenceConsumptionSummary,
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile,
  ShardReadinessContractView,
  ShardReadinessEvidenceAssessment,
  SourceNodeV375ArchiveVerificationReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-shard-readiness-evidence-consumption";
const SOURCE_NODE_V375_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate-archive-verification";
const ACTIVE_PLAN = "docs/plans3/v375-post-minimal-shard-readiness-regular-gate-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans3/v376-post-java-mini-kv-shard-readiness-evidence-consumption-roadmap.md";
const JAVA_V154_HARDENING_EVIDENCE =
  "D:/javaproj/advanced-order-platform/e/154/evidence/java-shard-readiness-hardening-v154.json";
const JAVA_V153_CORE_EVIDENCE =
  "D:/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json";
const MINI_KV_V145_EVIDENCE = "D:/C/mini-kv/fixtures/release/shard-readiness.json";
const MINI_KV_V145_HISTORICAL_FALLBACK =
  "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v145.json";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const REQUIRED_CONTRACT_FIELDS = Object.freeze([
  "project",
  "version",
  "readOnly",
  "executionAllowed",
  "shardEnabled",
  "shardCount",
  "slotCount",
  "routingMode",
  "status",
]);

export function loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV375 = createSourceNodeV375(
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerification({
      config: input.config,
      archiveRoot: projectRoot,
    }),
  );
  const javaShardReadiness = assessJavaShardReadinessEvidence();
  const miniKvShardReadiness = assessMiniKvShardReadinessEvidence();
  const checks = createChecks(input.config, sourceNodeV375, javaShardReadiness, miniKvShardReadiness);
  checks.readyForJavaMiniKvShardReadinessEvidenceConsumption = Object.entries(checks)
    .filter(([key]) => key !== "readyForJavaMiniKvShardReadinessEvidenceConsumption")
    .every(([, value]) => value);
  const ready = checks.readyForJavaMiniKvShardReadinessEvidenceConsumption;
  const evidenceConsumption = createEvidenceConsumption(sourceNodeV375, javaShardReadiness, miniKvShardReadiness);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(javaShardReadiness, miniKvShardReadiness);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaShardReadiness, miniKvShardReadiness, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver Java/mini-kv shard readiness evidence consumption",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    evidenceConsumptionState: ready ? "java-mini-kv-shard-readiness-evidence-consumed" : "blocked",
    evidenceConsumptionDecision: ready ? "consume-java-v154-and-mini-kv-v145-hardening" : "blocked",
    readyForJavaMiniKvShardReadinessEvidenceConsumption: ready,
    readyForNodeV377ShardReadinessEvidenceConsumptionArchiveVerification: ready,
    activeNodeVersion: "Node v376",
    sourceNodeVersion: "Node v375",
    consumesNodeV375ArchiveVerification: true,
    consumesJavaV154ShardReadinessHardening: true,
    consumesMiniKvV145ShardReadinessHardening: true,
    evidenceConsumptionOnly: true,
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
    sourceNodeV375,
    javaShardReadiness,
    miniKvShardReadiness,
    evidenceConsumption,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      evidenceConsumptionJson: ROUTE_PATH,
      evidenceConsumptionMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV375Json: SOURCE_NODE_V375_ROUTE,
      sourceNodeV375Markdown: `${SOURCE_NODE_V375_ROUTE}?format=markdown`,
      javaV154HardeningEvidence: JAVA_V154_HARDENING_EVIDENCE,
      javaV153SourceEvidence: JAVA_V153_CORE_EVIDENCE,
      miniKvV145Evidence: MINI_KV_V145_EVIDENCE,
      miniKvV145HistoricalFallback: MINI_KV_V145_HISTORICAL_FALLBACK,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v377",
    },
    nextActions: ready
      ? [
        "Archive Node v376 consumption evidence before moving to v377.",
        "Let Java and mini-kv continue in parallel; Node should only consume completed shard-readiness evidence.",
        "Keep active sharding disabled until a separate cluster/shard prototype plan is authorized.",
      ]
      : [
        "Repair missing Java v154 or mini-kv v145 evidence before v377.",
        "Do not start Java or mini-kv from Node to manufacture missing evidence.",
      ],
  };
}

function createSourceNodeV375(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateArchiveVerificationProfile,
): SourceNodeV375ArchiveVerificationReference {
  return {
    sourceVersion: "Node v375",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForMinimalShardReadinessRegularGateArchiveVerification:
      profile.readyForMinimalShardReadinessRegularGateArchiveVerification,
    readyForNodeV376JavaMiniKvShardEvidenceConsumption: profile.readyForNodeV376JavaMiniKvShardEvidenceConsumption,
    sourceArchiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    connectsManagedAudit: false,
    executionAllowed: false,
  };
}

function assessJavaShardReadinessEvidence(): ShardReadinessEvidenceAssessment {
  const hardeningFile = evidenceFileReference("advanced-order-platform", "java-hardening", JAVA_V154_HARDENING_EVIDENCE);
  const sourceCoreFile = evidenceFileReference("advanced-order-platform", "java-source-core", JAVA_V153_CORE_EVIDENCE);
  const hardening = readEvidenceJson(hardeningFile);
  const sourceCore = readEvidenceJson(sourceCoreFile);
  const evidence = mergedJavaContractView(hardening, sourceCore);
  return assessEvidence({
    project: "advanced-order-platform",
    sourceVersion: "Java v154",
    hardeningFile,
    sourceCoreFile,
    evidence,
    contractVersionObserved: null,
    hardeningExplainsFields: arrayLength(hardening?.fieldExplanations) >= 5,
    sourceCoreLinked:
      stringValue(hardening?.sourceEvidenceVersion) === "Java v153"
      && stringValue(hardening?.sourceEvidencePath) === "e/153/evidence/java-shard-readiness-v153.json",
    boundarySafe:
      evidence.readOnly === true
      && evidence.executionAllowed === false
      && arrayIncludes(hardening?.compatibilityGuarantees, "v153-shard-readiness-core-fields-unchanged")
      && arrayIncludes(hardening?.forbiddenChanges, "enable-shard-routing-or-execution-from-hardening-endpoint"),
    preservesArchivedNodeEvidence: arrayIncludes(hardening?.compatibilityGuarantees, "v370-v373-node-archive-chain-not-mutated"),
  });
}

function assessMiniKvShardReadinessEvidence(): ShardReadinessEvidenceAssessment {
  const hardeningFile = evidenceFileReference("mini-kv", "mini-kv-hardening", MINI_KV_V145_EVIDENCE,
    MINI_KV_V145_HISTORICAL_FALLBACK);
  const parsed = readEvidenceJson(hardeningFile);
  const evidence = directContractView(parsed);
  return assessEvidence({
    project: "mini-kv",
    sourceVersion: "mini-kv v145",
    hardeningFile,
    sourceCoreFile: null,
    evidence,
    contractVersionObserved: stringValue(parsed?.contract),
    hardeningExplainsFields: arrayLength(parsed?.readOnlyBoundaryFields) >= 6,
    sourceCoreLinked: true,
    boundarySafe: miniKvBoundariesSafe(parsed),
    preservesArchivedNodeEvidence:
      objectValue(parsed?.archiveCompatibility)?.preservesNodeArchivedEvidence === true
      && objectValue(parsed?.archiveCompatibility)?.changesArchivedNodeEvidence === false,
  });
}

function assessEvidence(input: {
  project: EvidenceProject;
  sourceVersion: EvidenceSourceVersion;
  hardeningFile: EvidenceFileReference;
  sourceCoreFile: EvidenceFileReference | null;
  evidence: ShardReadinessContractView;
  contractVersionObserved: string | null;
  hardeningExplainsFields: boolean;
  sourceCoreLinked: boolean;
  boundarySafe: boolean;
  preservesArchivedNodeEvidence: boolean;
}): ShardReadinessEvidenceAssessment {
  const missingRequiredFields = REQUIRED_CONTRACT_FIELDS.filter((field) =>
    valueForRequiredField(input.evidence, field) === null || valueForRequiredField(input.evidence, field) === "missing");
  const readOnlySafe = input.evidence.readOnly === true;
  const executionBlocked = input.evidence.executionAllowed === false;
  const shardCountValid = Number.isInteger(input.evidence.shardCount) && (input.evidence.shardCount ?? -1) >= 0;
  const slotCountValid = Number.isInteger(input.evidence.slotCount) && (input.evidence.slotCount ?? -1) >= 0;
  const routingModePresent = typeof input.evidence.routingMode === "string" && input.evidence.routingMode.length > 0;
  const statusAccepted = input.project === "advanced-order-platform"
    ? input.evidence.status === "passed"
    : input.evidence.status === "hardened-read-only";
  const filesReady = input.hardeningFile.exists && (input.sourceCoreFile === null || input.sourceCoreFile.exists);
  const readyForNodeConsumption =
    filesReady
    && missingRequiredFields.length === 0
    && readOnlySafe
    && executionBlocked
    && shardCountValid
    && slotCountValid
    && routingModePresent
    && statusAccepted
    && input.hardeningExplainsFields
    && input.sourceCoreLinked
    && input.boundarySafe
    && input.preservesArchivedNodeEvidence;

  return {
    ...input,
    requiredFieldCount: REQUIRED_CONTRACT_FIELDS.length,
    presentRequiredFieldCount: REQUIRED_CONTRACT_FIELDS.length - missingRequiredFields.length,
    missingRequiredFields,
    readOnlySafe,
    executionBlocked,
    shardCountValid,
    slotCountValid,
    routingModePresent,
    statusAccepted,
    readyForNodeConsumption,
  };
}

function createEvidenceConsumption(
  source: SourceNodeV375ArchiveVerificationReference,
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
): JavaMiniKvShardReadinessEvidenceConsumptionRecord {
  const record = {
    consumptionMode: "java-mini-kv-shard-readiness-evidence-consumption" as const,
    sourceSpan:
      "Node v375 archive verification plus Java v154 and mini-kv v145 hardening evidence" as const,
    sourceNodeV375Digest: source.sourceArchiveVerificationDigest,
    javaV154HardeningDigest: javaEvidence.hardeningFile.digest,
    javaV153SourceDigest: javaEvidence.sourceCoreFile?.digest ?? null,
    miniKvV145Digest: miniKvEvidence.hardeningFile.digest,
    verifiesRequiredContractFields: REQUIRED_CONTRACT_FIELDS,
  };
  return {
    consumptionDigest: sha256StableJson(record),
    ...record,
    verifiesHistoricalFallback: true,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v377",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV375ArchiveVerificationReference,
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
): JavaMiniKvShardReadinessEvidenceConsumptionChecks {
  return {
    sourceNodeV375Ready:
      source.archiveVerificationState === "minimal-shard-readiness-regular-gate-archive-verified"
      && source.archiveVerificationDecision === "archive-minimal-shard-readiness-regular-gate-and-consume-v154-v145"
      && source.readyForMinimalShardReadinessRegularGateArchiveVerification
      && source.readyForNodeV376JavaMiniKvShardEvidenceConsumption
      && source.productionBlockerCount === 0,
    sourceNodeV375ArchiveVerified: source.archiveFileCount > 0 && source.archiveFileCount === source.presentArchiveFileCount,
    sourceNodeV375BoundariesClosed:
      !source.startsJavaService
      && !source.startsMiniKvService
      && !source.stopsJavaService
      && !source.stopsMiniKvService
      && !source.connectsManagedAudit
      && !source.executionAllowed,
    javaV154HardeningFilePresent: javaEvidence.hardeningFile.exists && javaEvidence.hardeningFile.byteLength > 0,
    javaV153SourceCoreFilePresent:
      javaEvidence.sourceCoreFile !== null && javaEvidence.sourceCoreFile.exists && javaEvidence.sourceCoreFile.byteLength > 0,
    javaRequiredFieldsComplete: javaEvidence.missingRequiredFields.length === 0,
    javaReadOnlySafe: javaEvidence.readOnlySafe,
    javaExecutionBlocked: javaEvidence.executionBlocked,
    javaStatusAccepted: javaEvidence.statusAccepted,
    javaHardeningExplainsFields: javaEvidence.hardeningExplainsFields,
    javaSourceCoreLinked: javaEvidence.sourceCoreLinked,
    miniKvV145FilePresent: miniKvEvidence.hardeningFile.exists && miniKvEvidence.hardeningFile.byteLength > 0,
    miniKvReleaseVersionV145: miniKvEvidence.evidence.releaseVersion === "v145",
    miniKvRequiredFieldsComplete: miniKvEvidence.missingRequiredFields.length === 0,
    miniKvReadOnlySafe: miniKvEvidence.readOnlySafe,
    miniKvExecutionBlocked: miniKvEvidence.executionBlocked,
    miniKvStatusAccepted: miniKvEvidence.statusAccepted,
    miniKvBoundarySafe: miniKvEvidence.boundarySafe,
    miniKvArchivedEvidencePreserved: miniKvEvidence.preservesArchivedNodeEvidence,
    bothEvidenceSourcesReady: javaEvidence.readyForNodeConsumption && miniKvEvidence.readyForNodeConsumption,
    historicalFallbackCovered:
      javaEvidence.hardeningFile.historicalFallbackAvailable
      && javaEvidence.sourceCoreFile?.historicalFallbackAvailable === true
      && miniKvEvidence.hardeningFile.historicalFallbackAvailable,
    digestCoverageComplete:
      isDigest(source.sourceArchiveVerificationDigest)
      && isDigest(javaEvidence.hardeningFile.digest)
      && isDigest(javaEvidence.sourceCoreFile?.digest)
      && isDigest(miniKvEvidence.hardeningFile.digest),
    nodeDoesNotStartOrStopUpstreams: true,
    nodeDoesNotMutateSiblingState: true,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForJavaMiniKvShardReadinessEvidenceConsumption: false,
  };
}

function collectProductionBlockers(
  checks: JavaMiniKvShardReadinessEvidenceConsumptionChecks,
): JavaMiniKvShardReadinessEvidenceConsumptionMessage[] {
  const rules: Array<[boolean, string, JavaMiniKvShardReadinessEvidenceConsumptionMessage["source"], string]> = [
    [checks.sourceNodeV375Ready, "SOURCE_NODE_V375_NOT_READY", "node-v375", "Node v375 archive verification must be ready."],
    [checks.sourceNodeV375ArchiveVerified, "SOURCE_NODE_V375_ARCHIVE_INCOMPLETE", "node-v375", "Node v375 must verify every v374 archive file."],
    [checks.javaV154HardeningFilePresent, "JAVA_V154_HARDENING_MISSING", "java-v154", "Java v154 hardening evidence must be present."],
    [checks.javaV153SourceCoreFilePresent, "JAVA_V153_SOURCE_CORE_MISSING", "java-v154", "Java v154 must remain linked to Java v153 core shard fields."],
    [checks.javaRequiredFieldsComplete, "JAVA_SHARD_FIELDS_INCOMPLETE", "java-v154", "Java shard readiness contract fields must be complete after v154+v153 merge."],
    [checks.javaReadOnlySafe, "JAVA_SHARD_NOT_READ_ONLY", "java-v154", "Java shard readiness evidence must remain read-only."],
    [checks.javaExecutionBlocked, "JAVA_SHARD_EXECUTION_ALLOWED", "java-v154", "Java shard readiness evidence must block execution."],
    [checks.miniKvV145FilePresent, "MINI_KV_V145_EVIDENCE_MISSING", "mini-kv-v145", "mini-kv v145 hardening evidence must be present."],
    [checks.miniKvReleaseVersionV145, "MINI_KV_RELEASE_VERSION_NOT_V145", "mini-kv-v145", "mini-kv evidence must identify releaseVersion v145."],
    [checks.miniKvRequiredFieldsComplete, "MINI_KV_SHARD_FIELDS_INCOMPLETE", "mini-kv-v145", "mini-kv shard readiness fields must be complete."],
    [checks.miniKvBoundarySafe, "MINI_KV_BOUNDARY_UNSAFE", "mini-kv-v145", "mini-kv v145 must keep writes, admin commands, active routing, and extra processes disabled."],
    [checks.historicalFallbackCovered, "HISTORICAL_FALLBACK_MISSING", "shard-readiness-contract", "GitHub runner historical fixtures must cover Java v154/v153 and mini-kv v145."],
    [checks.digestCoverageComplete, "DIGEST_COVERAGE_INCOMPLETE", "shard-readiness-contract", "Source and evidence digests must all be stable."],
    [checks.nodeDoesNotStartOrStopUpstreams, "NODE_TOUCHES_UPSTREAM_LIFECYCLE", "runtime-boundary", "Node v376 must not start or stop Java/mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];
  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
): JavaMiniKvShardReadinessEvidenceConsumptionMessage[] {
  const warnings: JavaMiniKvShardReadinessEvidenceConsumptionMessage[] = [];
  if (javaEvidence.evidence.sourceCoreVersion === "Java v153") {
    warnings.push({
      code: "JAVA_V154_IS_ADDITIVE_HARDENING",
      severity: "warning",
      source: "java-v154",
      message: "Java v154 hardens the Java v153 core shard-readiness fields instead of duplicating every field.",
    });
  }
  if (miniKvEvidence.evidence.shardEnabled === false) {
    warnings.push({
      code: "ACTIVE_SHARDING_STILL_DISABLED",
      severity: "warning",
      source: "mini-kv-v145",
      message: "mini-kv v145 proves shard-readiness evidence only; active sharding and write routing remain disabled.",
    });
  }
  return warnings;
}

function collectRecommendations(ready: boolean): JavaMiniKvShardReadinessEvidenceConsumptionMessage[] {
  return [{
    code: ready ? "ARCHIVE_NODE_V376_CONSUMPTION" : "REPAIR_V154_V145_EVIDENCE",
    severity: "recommendation",
    source: "next-plan",
    message: ready
      ? "Proceed to Node v377 archive verification for the v376 Java/mini-kv evidence consumption."
      : "Keep Node v377 paused until Java v154 and mini-kv v145 evidence are complete and covered by fallback fixtures.",
  }];
}

function createSummary(
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
  checks: JavaMiniKvShardReadinessEvidenceConsumptionChecks,
  productionBlockers: readonly JavaMiniKvShardReadinessEvidenceConsumptionMessage[],
  warnings: readonly JavaMiniKvShardReadinessEvidenceConsumptionMessage[],
  recommendations: readonly JavaMiniKvShardReadinessEvidenceConsumptionMessage[],
): JavaMiniKvShardReadinessEvidenceConsumptionSummary {
  const evidence = [javaEvidence, miniKvEvidence];
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceSourceCount: evidence.length,
    readyEvidenceSourceCount: evidence.filter((item) => item.readyForNodeConsumption).length,
    requiredFieldCount: evidence.reduce((total, item) => total + item.requiredFieldCount, 0),
    presentRequiredFieldCount: evidence.reduce((total, item) => total + item.presentRequiredFieldCount, 0),
    missingRequiredFieldCount: evidence.reduce((total, item) => total + item.missingRequiredFields.length, 0),
    historicalFallbackSourceCount: [
      javaEvidence.hardeningFile,
      javaEvidence.sourceCoreFile,
      miniKvEvidence.hardeningFile,
    ].filter((file) => file?.usedHistoricalFallback).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function mergedJavaContractView(
  hardening: Record<string, unknown> | null,
  sourceCore: Record<string, unknown> | null,
): ShardReadinessContractView {
  return {
    project: stringValue(hardening?.project) || stringValue(sourceCore?.project) || "missing",
    version: stringValue(hardening?.version) || "missing",
    sourceCoreVersion: stringValue(sourceCore?.version) || null,
    releaseVersion: null,
    readOnly: booleanOrNull(hardening?.readOnly),
    executionAllowed: booleanOrNull(hardening?.executionAllowed),
    shardEnabled: booleanOrNull(sourceCore?.shardEnabled),
    shardCount: numberOrNull(sourceCore?.shardCount),
    slotCount: numberOrNull(sourceCore?.slotCount),
    routingMode: stringValue(sourceCore?.routingMode) || null,
    status: stringValue(hardening?.status) || null,
    evidencePath: stringValue(hardening?.evidencePath) || null,
    rawFieldCount: (hardening === null ? 0 : Object.keys(hardening).length)
      + (sourceCore === null ? 0 : Object.keys(sourceCore).length),
  };
}

function directContractView(parsed: Record<string, unknown> | null): ShardReadinessContractView {
  return {
    project: stringValue(parsed?.project) || "missing",
    version: stringValue(parsed?.version) || "missing",
    sourceCoreVersion: null,
    releaseVersion: stringValue(parsed?.releaseVersion) || null,
    readOnly: booleanOrNull(parsed?.readOnly),
    executionAllowed: booleanOrNull(parsed?.executionAllowed),
    shardEnabled: booleanOrNull(parsed?.shardEnabled),
    shardCount: numberOrNull(parsed?.shardCount),
    slotCount: numberOrNull(parsed?.slotCount),
    routingMode: stringValue(parsed?.routingMode) || null,
    status: stringValue(parsed?.status) || null,
    evidencePath: stringValue(parsed?.evidencePath) || null,
    rawFieldCount: parsed === null ? 0 : Object.keys(parsed).length,
  };
}

function evidenceFileReference(
  project: EvidenceProject,
  role: EvidenceFileReference["role"],
  configuredPath: string,
  customHistoricalFallback?: string,
): EvidenceFileReference {
  const historicalFallbackPath = customHistoricalFallback === undefined
    ? resolveHistoricalEvidencePath(configuredPath)
    : path.resolve(process.cwd(), customHistoricalFallback);
  const resolvedPath = resolveEvidencePath(configuredPath, historicalFallbackPath);
  if (!existsSync(resolvedPath)) {
    return {
      project,
      role,
      configuredPath,
      resolvedPath,
      historicalFallbackPath,
      exists: false,
      byteLength: 0,
      digest: null,
      usedHistoricalFallback: pathsEqual(resolvedPath, historicalFallbackPath),
      historicalFallbackAvailable: existsSync(historicalFallbackPath),
    };
  }
  const content = readFileSync(resolvedPath);
  return {
    project,
    role,
    configuredPath,
    resolvedPath,
    historicalFallbackPath,
    exists: true,
    byteLength: statSync(resolvedPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
    usedHistoricalFallback: pathsEqual(resolvedPath, historicalFallbackPath),
    historicalFallbackAvailable: existsSync(historicalFallbackPath),
  };
}

function resolveEvidencePath(configuredPath: string, historicalFallbackPath: string): string {
  if (process.env[FORCE_FALLBACK_ENV] === "true") {
    return historicalFallbackPath;
  }
  return existsSync(configuredPath) ? configuredPath : historicalFallbackPath;
}

function readEvidenceJson(file: EvidenceFileReference): Record<string, unknown> | null {
  if (!file.exists) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync(file.resolvedPath, "utf8").replace(/^\uFEFF/, ""));
    return objectValue(parsed);
  } catch {
    return null;
  }
}

function miniKvBoundariesSafe(parsed: Record<string, unknown> | null): boolean {
  const boundaries = objectValue(parsed?.boundaries);
  const diagnostics = objectValue(parsed?.diagnostics);
  return parsed?.readOnly === true
    && parsed.executionAllowed === false
    && boundaries?.orderAuthoritative === false
    && boundaries.auditAuthoritative === false
    && boundaries.writeCommandsAllowed === false
    && boundaries.adminCommandsAllowed === false
    && boundaries.loadRestoreCompactAllowed === false
    && boundaries.setnxexExecutionAllowed === false
    && boundaries.multiProcessStarted === false
    && boundaries.storageDirectoriesCreated === false
    && boundaries.activeRouterInstalled === false
    && boundaries.archivedNodeEvidenceMutated === false
    && diagnostics?.writeCommandsExecuted === false
    && diagnostics.adminCommandsExecuted === false
    && diagnostics.loadRestoreCompactExecuted === false;
}

function valueForRequiredField(view: ShardReadinessContractView, field: string): unknown {
  return (view as unknown as Record<string, unknown>)[field] ?? null;
}

function arrayLength(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

function arrayIncludes(value: unknown, expected: string): boolean {
  return Array.isArray(value) && value.includes(expected);
}

function objectValue(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function booleanOrNull(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function pathsEqual(left: string, right: string): boolean {
  return path.resolve(left).replace(/\\/g, "/") === path.resolve(right).replace(/\\/g, "/");
}
