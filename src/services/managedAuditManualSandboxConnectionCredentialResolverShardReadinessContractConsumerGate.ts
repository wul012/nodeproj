import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";

import type { AppConfig } from "../config.js";
import { resolveHistoricalEvidencePath } from "./historicalEvidenceResolver.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessContractConsumerGate,
  ShardReadinessContractConsumerGateChecks,
  ShardReadinessContractConsumerGateMessage,
  ShardReadinessContractConsumerGateSummary,
  ShardReadinessEvidenceAssessment,
  ShardReadinessEvidenceFileReference,
  ShardReadinessEvidenceView,
  SourceNodeV369OperatorCiHandoffReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate";
const SOURCE_NODE_V369_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-read-only-integration-operator-ci-regular-gate-handoff";
const ACTIVE_PLAN = "docs/plans3/v369-post-operator-ci-regular-gate-handoff-roadmap.md";
const NEXT_PLAN = "docs/plans3/v370-post-shard-readiness-contract-consumer-gate-roadmap.md";
const JAVA_SHARD_READINESS_EVIDENCE =
  "D:/javaproj/advanced-order-platform/e/153/evidence/java-shard-readiness-v153.json";
const MINI_KV_SHARD_READINESS_EVIDENCE = "D:/C/mini-kv/fixtures/release/shard-readiness.json";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const REQUIRED_SHARD_READINESS_FIELDS = Object.freeze([
  "project",
  "version",
  "readOnly",
  "executionAllowed",
  "shardEnabled",
  "shardCount",
  "slotCount",
  "routingMode",
  "evidencePath",
  "status",
]);

export function loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const sourceNodeV369Profile =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
      config: input.config,
      archiveRoot: projectRoot,
    });
  const sourceNodeV369 = createSourceNodeV369(sourceNodeV369Profile);
  const javaShardReadiness = assessShardReadinessEvidence(
    "advanced-order-platform",
    "Java v153",
    JAVA_SHARD_READINESS_EVIDENCE,
  );
  const miniKvShardReadiness = assessShardReadinessEvidence(
    "mini-kv",
    "mini-kv v144",
    MINI_KV_SHARD_READINESS_EVIDENCE,
  );
  const gate = createGate(sourceNodeV369, javaShardReadiness, miniKvShardReadiness);
  const checks = createChecks(input.config, sourceNodeV369, javaShardReadiness, miniKvShardReadiness, gate);
  checks.readyForShardReadinessContractConsumerGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForShardReadinessContractConsumerGate")
    .every(([, value]) => value);
  const ready = checks.readyForShardReadinessContractConsumerGate;
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(javaShardReadiness, miniKvShardReadiness);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(javaShardReadiness, miniKvShardReadiness, checks, productionBlockers, warnings,
    recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver shard readiness contract consumer gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateState: ready ? "shard-readiness-contract-consumer-gate-ready" : "blocked",
    gateDecision: ready ? "consume-java-and-mini-kv-shard-readiness-evidence" : "blocked",
    readyForShardReadinessContractConsumerGate: ready,
    readyForNodeV371MinimalShardReadinessLiveReadGate: ready,
    activeNodeVersion: "Node v370",
    sourceNodeVersion: "Node v369",
    consumesNodeV369OperatorCiRegularGateHandoff: true,
    consumesJavaV153ShardReadinessEcho: true,
    consumesMiniKvV144ShardReadinessPrototype: true,
    contractConsumerOnly: true,
    rerunsLiveProbe: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    credentialValueRequested: false,
    credentialValueRead: false,
    rawEndpointUrlRequested: false,
    rawEndpointUrlParsed: false,
    runtimeShellImplemented: false,
    runtimeShellInvocationAllowed: false,
    executionAllowed: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    sourceNodeV369,
    javaShardReadiness,
    miniKvShardReadiness,
    gate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      shardReadinessContractConsumerGateJson: ROUTE_PATH,
      shardReadinessContractConsumerGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV369Json: SOURCE_NODE_V369_ROUTE,
      sourceNodeV369Markdown: `${SOURCE_NODE_V369_ROUTE}?format=markdown`,
      javaShardReadinessEvidence: JAVA_SHARD_READINESS_EVIDENCE,
      miniKvShardReadinessEvidence: MINI_KV_SHARD_READINESS_EVIDENCE,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v371",
    },
    nextActions: ready
      ? [
        "Treat Java v153 and mini-kv v144 shard readiness evidence as the fixed baseline for Node v371.",
        "Only run Node v371 live-read gate after the user confirms Java and mini-kv services are already started.",
        "Keep v371 read-only: GET/INFO/HEALTH-style reads only, no upstream start, no write command, no managed audit connection.",
      ]
      : [
        "Fix missing or unsafe shard readiness evidence before attempting Node v371.",
        "Do not start Java or mini-kv from Node to compensate for missing evidence.",
      ],
  };
}

function createSourceNodeV369(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffProfile,
): SourceNodeV369OperatorCiHandoffReference {
  return {
    sourceVersion: "Node v369",
    profileVersion: profile.profileVersion,
    handoffState: profile.handoffState,
    handoffDecision: profile.handoffDecision,
    readyForOperatorCiRegularGateHandoff: profile.readyForOperatorCiRegularGateHandoff,
    readyForNodeV370ShardReadinessContractConsumerGate: profile.readyForNodeV370ShardReadinessContractConsumerGate,
    sourceHandoffDigest: profile.handoff.handoffDigest,
    sourcePlanDigest: profile.parallelShardReadinessPlan.planDigest,
    frozenContractCount: profile.summary.frozenContractCount,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    connectsManagedAudit: false,
    sendsManagedAuditHttpTcp: false,
    executionAllowed: false,
  };
}

function assessShardReadinessEvidence(
  project: ShardReadinessEvidenceAssessment["project"],
  sourceVersion: ShardReadinessEvidenceAssessment["sourceVersion"],
  configuredPath: string,
): ShardReadinessEvidenceAssessment {
  const evidenceFile = evidenceFileReference(project, configuredPath);
  const parsed = evidenceFile.exists ? parseJson(readFileSync(evidenceFile.resolvedPath, "utf8").replace(/^\uFEFF/, "")) : null;
  const evidence = evidenceView(parsed);
  const missingRequiredFields = REQUIRED_SHARD_READINESS_FIELDS
    .filter((field) => !fieldPresent(parsed, field));
  const statusAccepted = statusAcceptedFor(project, evidence.status);
  const sourceSpecificPrototypeValueAccepted =
    project === "mini-kv"
    && evidence.status === "prototype-ready-read-only"
    && evidence.routingMode === "single-shard-readiness-prototype";
  const boundarySafe = project === "mini-kv" ? miniKvBoundariesSafe(parsed) : javaBoundariesSafe(evidence);
  const readOnlySafe = evidence.readOnly === true;
  const executionBlocked = evidence.executionAllowed === false;
  const shardCountValid =
    typeof evidence.shardCount === "number" && Number.isInteger(evidence.shardCount) && evidence.shardCount >= 0;
  const slotCountValid =
    typeof evidence.slotCount === "number" && Number.isInteger(evidence.slotCount) && evidence.slotCount >= 0;
  const routingModePresent = typeof evidence.routingMode === "string" && evidence.routingMode.length > 0;
  const readyForNodeConsumption =
    evidenceFile.exists
    && missingRequiredFields.length === 0
    && readOnlySafe
    && executionBlocked
    && shardCountValid
    && slotCountValid
    && routingModePresent
    && statusAccepted
    && boundarySafe;

  return {
    project,
    sourceVersion,
    evidenceFile,
    evidence,
    contractVersionObserved: stringOrNull(parsed?.contract),
    requiredFieldCount: REQUIRED_SHARD_READINESS_FIELDS.length,
    presentRequiredFieldCount: REQUIRED_SHARD_READINESS_FIELDS.length - missingRequiredFields.length,
    missingRequiredFields,
    readOnlySafe,
    executionBlocked,
    shardCountValid,
    slotCountValid,
    routingModePresent,
    statusAccepted,
    sourceSpecificPrototypeValueAccepted,
    boundarySafe,
    readyForNodeConsumption,
  };
}

function evidenceFileReference(
  project: ShardReadinessEvidenceFileReference["project"],
  configuredPath: string,
): ShardReadinessEvidenceFileReference {
  const resolvedPath = resolveSiblingEvidencePath(configuredPath);
  const historicalFallbackPath = resolveHistoricalEvidencePath(configuredPath);
  const historicalFallbackAvailable = existsSync(historicalFallbackPath);
  if (!existsSync(resolvedPath)) {
    return {
      project,
      configuredPath,
      resolvedPath,
      historicalFallbackPath,
      exists: false,
      byteLength: 0,
      digest: null,
      usedHistoricalFallback: isHistoricalFallback(resolvedPath),
      historicalFallbackAvailable,
    };
  }
  const content = readFileSync(resolvedPath);
  return {
    project,
    configuredPath,
    resolvedPath,
    historicalFallbackPath,
    exists: true,
    byteLength: statSync(resolvedPath).size,
    digest: createHash("sha256").update(content).digest("hex"),
    usedHistoricalFallback: isHistoricalFallback(resolvedPath),
    historicalFallbackAvailable,
  };
}

function resolveSiblingEvidencePath(configuredPath: string): string {
  if (process.env[FORCE_FALLBACK_ENV] === "true") {
    return resolveHistoricalEvidencePath(configuredPath);
  }
  return existsSync(configuredPath) ? configuredPath : resolveHistoricalEvidencePath(configuredPath);
}

function createGate(
  source: SourceNodeV369OperatorCiHandoffReference,
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
): ShardReadinessContractConsumerGate {
  const record = {
    gateMode: "shard-readiness-contract-consumer" as const,
    sourceSpan: "Node v369 handoff plus Java v153 and mini-kv v144 shard readiness evidence" as const,
    sourceHandoffDigest: source.sourceHandoffDigest,
    javaDigest: javaEvidence.evidenceFile.digest,
    miniKvDigest: miniKvEvidence.evidenceFile.digest,
    focusedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts",
    groupedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.test.ts",
    buildCommand: "npm.cmd run build",
    smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for shard readiness contract consumer gate route",
  };
  return {
    gateDigest: sha256StableJson(record),
    gateMode: record.gateMode,
    sourceSpan: record.sourceSpan,
    consumesContracts: ["read-only-integration.v1", "shard-readiness.v1"],
    consumesSiblingEvidence: ["Java v153", "mini-kv v144"],
    focusedCommand: record.focusedCommand,
    groupedCommand: record.groupedCommand,
    buildCommand: record.buildCommand,
    smokeCommand: record.smokeCommand,
    nodeRole: "contract-consumer-and-integration-gate",
    automaticUpstreamStart: false,
    externalReadWindowRequiredForLiveGate: true,
    nextNodeVersionSuggested: "Node v371",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV369OperatorCiHandoffReference,
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
  gate: ShardReadinessContractConsumerGate,
): ShardReadinessContractConsumerGateChecks {
  return {
    sourceNodeV369Ready:
      source.handoffState === "operator-ci-regular-gate-handoff-ready"
      && source.handoffDecision === "freeze-read-only-and-shard-readiness-contracts"
      && source.readyForNodeV370ShardReadinessContractConsumerGate
      && source.productionBlockerCount === 0,
    sourceNodeV369ContractsFrozen: source.frozenContractCount === 2,
    sourceNodeV369BoundariesClosed:
      !source.startsJavaService
      && !source.startsMiniKvService
      && !source.connectsManagedAudit
      && !source.sendsManagedAuditHttpTcp
      && !source.executionAllowed,
    javaEvidenceFilePresent: javaEvidence.evidenceFile.exists && javaEvidence.evidenceFile.byteLength > 0,
    javaEvidenceRequiredFieldsComplete: javaEvidence.missingRequiredFields.length === 0,
    javaEvidenceReadOnly: javaEvidence.readOnlySafe,
    javaEvidenceExecutionBlocked: javaEvidence.executionBlocked,
    javaShardCountValid: javaEvidence.shardCountValid,
    javaSlotCountValid: javaEvidence.slotCountValid,
    javaRoutingModePresent: javaEvidence.routingModePresent,
    javaStatusAccepted: javaEvidence.statusAccepted,
    miniKvEvidenceFilePresent: miniKvEvidence.evidenceFile.exists && miniKvEvidence.evidenceFile.byteLength > 0,
    miniKvEvidenceRequiredFieldsComplete: miniKvEvidence.missingRequiredFields.length === 0,
    miniKvEvidenceReadOnly: miniKvEvidence.readOnlySafe,
    miniKvEvidenceExecutionBlocked: miniKvEvidence.executionBlocked,
    miniKvShardCountValid: miniKvEvidence.shardCountValid,
    miniKvSlotCountValid: miniKvEvidence.slotCountValid,
    miniKvRoutingModePresent: miniKvEvidence.routingModePresent,
    miniKvStatusAccepted: miniKvEvidence.statusAccepted,
    miniKvBoundarySafe: miniKvEvidence.boundarySafe,
    bothEvidenceSourcesReady: javaEvidence.readyForNodeConsumption && miniKvEvidence.readyForNodeConsumption,
    digestCoverageComplete:
      isDigest(gate.gateDigest)
      && isDigest(source.sourceHandoffDigest)
      && isDigest(source.sourcePlanDigest)
      && isDigest(javaEvidence.evidenceFile.digest)
      && isDigest(miniKvEvidence.evidenceFile.digest),
    historicalFallbackCovered:
      javaEvidence.evidenceFile.historicalFallbackAvailable
      && miniKvEvidence.evidenceFile.historicalFallbackAvailable,
    nodeDoesNotStartUpstreams: !gate.automaticUpstreamStart,
    nodeDoesNotMutateSiblingState: true,
    noManagedAuditConnection: !config.upstreamActionsEnabled,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForShardReadinessContractConsumerGate: false,
  };
}

function collectProductionBlockers(
  checks: ShardReadinessContractConsumerGateChecks,
): ShardReadinessContractConsumerGateMessage[] {
  const rules: Array<[boolean, string, ShardReadinessContractConsumerGateMessage["source"], string]> = [
    [checks.sourceNodeV369Ready, "SOURCE_NODE_V369_NOT_READY", "node-v369", "Node v369 handoff must be ready."],
    [checks.sourceNodeV369ContractsFrozen, "SOURCE_CONTRACTS_NOT_FROZEN", "node-v369", "Node v369 must freeze both contracts."],
    [checks.javaEvidenceFilePresent, "JAVA_SHARD_EVIDENCE_MISSING", "java-v153", "Java shard readiness evidence must be present."],
    [checks.javaEvidenceRequiredFieldsComplete, "JAVA_SHARD_FIELDS_INCOMPLETE", "java-v153", "Java shard readiness evidence must contain all required fields."],
    [checks.javaEvidenceReadOnly, "JAVA_SHARD_NOT_READ_ONLY", "java-v153", "Java shard readiness evidence must be read-only."],
    [checks.javaEvidenceExecutionBlocked, "JAVA_SHARD_EXECUTION_ALLOWED", "java-v153", "Java shard readiness evidence must block execution."],
    [checks.miniKvEvidenceFilePresent, "MINI_KV_SHARD_EVIDENCE_MISSING", "mini-kv-v144", "mini-kv shard readiness evidence must be present."],
    [checks.miniKvEvidenceRequiredFieldsComplete, "MINI_KV_SHARD_FIELDS_INCOMPLETE", "mini-kv-v144", "mini-kv shard readiness evidence must contain all required fields."],
    [checks.miniKvEvidenceReadOnly, "MINI_KV_SHARD_NOT_READ_ONLY", "mini-kv-v144", "mini-kv shard readiness evidence must be read-only."],
    [checks.miniKvEvidenceExecutionBlocked, "MINI_KV_SHARD_EXECUTION_ALLOWED", "mini-kv-v144", "mini-kv shard readiness evidence must block execution."],
    [checks.miniKvBoundarySafe, "MINI_KV_BOUNDARY_UNSAFE", "mini-kv-v144", "mini-kv shard readiness evidence must keep writes, admin commands, storage directories, and extra processes disabled."],
    [checks.digestCoverageComplete, "DIGEST_COVERAGE_INCOMPLETE", "shard-readiness-contract", "Gate and source evidence digests must be present."],
    [checks.nodeDoesNotStartUpstreams, "NODE_STARTS_UPSTREAMS", "runtime-boundary", "Node v370 must not start Java or mini-kv."],
    [checks.nodeDoesNotMutateSiblingState, "NODE_MUTATES_SIBLING_STATE", "runtime-boundary", "Node v370 must remain read-only against sibling projects."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
): ShardReadinessContractConsumerGateMessage[] {
  const warnings: ShardReadinessContractConsumerGateMessage[] = [];
  if (miniKvEvidence.sourceSpecificPrototypeValueAccepted) {
    warnings.push({
      code: "MINI_KV_PROTOTYPE_ROUTING_MODE_ACCEPTED",
      severity: "warning",
      source: "mini-kv-v144",
      message:
        "mini-kv v144 uses prototype-specific status/routingMode values; Node v370 accepts them because readOnly and executionAllowed boundaries are hard-safe.",
    });
  }
  if (javaEvidence.evidence.shardEnabled === false && miniKvEvidence.evidence.shardEnabled === false) {
    warnings.push({
      code: "SHARD_ENABLED_FALSE_IS_BASELINE",
      severity: "warning",
      source: "shard-readiness-contract",
      message: "Both upstreams intentionally report shardEnabled=false; this is readiness evidence, not active sharding.",
    });
  }
  return warnings;
}

function collectRecommendations(ready: boolean): ShardReadinessContractConsumerGateMessage[] {
  return [{
    code: ready ? "PREPARE_NODE_V371_LIVE_READ_WINDOW" : "FIX_SHARD_READINESS_EVIDENCE",
    severity: "recommendation",
    source: "next-plan",
    message: ready
      ? "Proceed to Node v371 only after Java and mini-kv are already running; v371 should perform read-only live reads."
      : "Keep Node v371 paused until Java and mini-kv shard readiness evidence is complete and safe.",
  }];
}

function createSummary(
  javaEvidence: ShardReadinessEvidenceAssessment,
  miniKvEvidence: ShardReadinessEvidenceAssessment,
  checks: ShardReadinessContractConsumerGateChecks,
  productionBlockers: readonly ShardReadinessContractConsumerGateMessage[],
  warnings: readonly ShardReadinessContractConsumerGateMessage[],
  recommendations: readonly ShardReadinessContractConsumerGateMessage[],
): ShardReadinessContractConsumerGateSummary {
  const evidence = [javaEvidence, miniKvEvidence];
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    evidenceSourceCount: evidence.length,
    readyEvidenceSourceCount: evidence.filter((item) => item.readyForNodeConsumption).length,
    requiredFieldCount: evidence.reduce((total, item) => total + item.requiredFieldCount, 0),
    presentRequiredFieldCount: evidence.reduce((total, item) => total + item.presentRequiredFieldCount, 0),
    missingRequiredFieldCount: evidence.reduce((total, item) => total + item.missingRequiredFields.length, 0),
    historicalFallbackSourceCount: evidence.filter((item) => item.evidenceFile.usedHistoricalFallback).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function evidenceView(parsed: Record<string, unknown> | null): ShardReadinessEvidenceView {
  return {
    project: stringOrNull(parsed?.project) ?? "missing",
    version: stringOrNull(parsed?.version) ?? "missing",
    releaseVersion: stringOrNull(parsed?.releaseVersion),
    readOnly: booleanOrNull(parsed?.readOnly),
    executionAllowed: booleanOrNull(parsed?.executionAllowed),
    shardEnabled: booleanOrNull(parsed?.shardEnabled),
    shardCount: numberOrNull(parsed?.shardCount),
    slotCount: numberOrNull(parsed?.slotCount),
    routingMode: stringOrNull(parsed?.routingMode),
    evidencePath: stringOrNull(parsed?.evidencePath),
    status: stringOrNull(parsed?.status),
    evidenceDigest: stringOrNull(parsed?.evidenceDigest),
    rawFieldCount: parsed === null ? 0 : Object.keys(parsed).length,
  };
}

function statusAcceptedFor(project: ShardReadinessEvidenceAssessment["project"], status: string | null): boolean {
  return project === "advanced-order-platform"
    ? status === "passed"
    : status === "prototype-ready-read-only" || status === "passed";
}

function javaBoundariesSafe(evidence: ShardReadinessEvidenceView): boolean {
  return evidence.readOnly === true && evidence.executionAllowed === false;
}

function miniKvBoundariesSafe(parsed: Record<string, unknown> | null): boolean {
  const boundaries = objectOrNull(parsed?.boundaries);
  const diagnostics = objectOrNull(parsed?.diagnostics);
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
    && diagnostics?.writeCommandsExecuted === false
    && diagnostics.adminCommandsExecuted === false
    && diagnostics.loadRestoreCompactExecuted === false;
}

function fieldPresent(parsed: Record<string, unknown> | null, field: string): boolean {
  return parsed !== null && Object.prototype.hasOwnProperty.call(parsed, field);
}

function parseJson(raw: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(raw);
    return objectOrNull(parsed);
  } catch {
    return null;
  }
}

function objectOrNull(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null;
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

function isHistoricalFallback(resolvedPath: string): boolean {
  return resolvedPath.replace(/\\/g, "/").includes("/fixtures/historical/sibling-workspaces/");
}
