import type { AppConfig } from "../config.js";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateProfile,
  MinimalShardReadinessRegularGateChecks,
  MinimalShardReadinessRegularGateMessage,
  MinimalShardReadinessRegularGateRecord,
  MinimalShardReadinessRegularGateSummary,
  SourceNodeV373ShardReadinessCompatibilityRegularGateReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-regular-gate";
const SOURCE_NODE_V373_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report";
const ACTIVE_PLAN = "docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md";
const NEXT_PLAN = "docs/plans3/v374-post-minimal-shard-readiness-regular-gate-roadmap.md";

export function loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGateProfile {
  const sourceProfile = loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
    config: input.config,
    archiveRoot: input.archiveRoot ?? process.cwd(),
  });
  const sourceNodeV373 = createSourceNodeV373(sourceProfile);
  const draftGate = createRegularGate(sourceNodeV373, false);
  const checks = createChecks(input.config, sourceNodeV373, draftGate);
  checks.readyForMinimalShardReadinessRegularGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForMinimalShardReadinessRegularGate")
    .every(([, value]) => value);
  const ready = checks.readyForMinimalShardReadinessRegularGate;
  const regularGate = createRegularGate(sourceNodeV373, ready);
  checks.regularGateDigestStable = isDigest(regularGate.gateDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(sourceNodeV373);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(sourceNodeV373, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver minimal shard readiness regular gate",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    gateState: ready ? "minimal-shard-readiness-regular-gate-ready" : "blocked",
    gateDecision: ready ? "freeze-minimal-shard-readiness-regular-gate" : "blocked",
    readyForMinimalShardReadinessRegularGate: ready,
    readyForNodeV375RegularGateArchiveVerification: ready,
    activeNodeVersion: "Node v374",
    sourceNodeVersion: "Node v373",
    consumesNodeV373ShardReadinessCompatibilityReport: true,
    regularGateOnly: true,
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
    sourceNodeV373,
    regularGate,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      regularGateJson: ROUTE_PATH,
      regularGateMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV373Json: SOURCE_NODE_V373_ROUTE,
      sourceNodeV373Markdown: `${SOURCE_NODE_V373_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v375",
    },
    nextActions: ready
      ? [
        "Use Node v375 to verify the regular gate archive.",
        "Let Java and mini-kv continue shard-readiness hardening in parallel; Node should consume their next evidence instead of blocking it.",
        "Do not interpret this regular gate as active sharding or authority transfer.",
      ]
      : [
        "Repair the v373 compatibility report before freezing the regular gate.",
        "Do not run Java or mini-kv live reads from this regular gate.",
      ],
  };
}

function createSourceNodeV373(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
): SourceNodeV373ShardReadinessCompatibilityRegularGateReference {
  return {
    sourceVersion: "Node v373",
    profileVersion: profile.profileVersion,
    compatibilityState: profile.compatibilityState,
    compatibilityDecision: profile.compatibilityDecision,
    readyForShardReadinessCompatibilityReport: profile.readyForShardReadinessCompatibilityReport,
    readyForNodeV374MinimalShardReadinessRegularGate: profile.readyForNodeV374MinimalShardReadinessRegularGate,
    compatibilityReportDigest: profile.compatibilityReport.reportDigest,
    sourceStaticGateDigest: profile.compatibilityReport.sourceStaticGateDigest,
    sourceLiveReadGateDigest: profile.compatibilityReport.sourceLiveReadGateDigest,
    sourceArchiveVerificationDigest: profile.compatibilityReport.sourceArchiveVerificationDigest,
    projectReportCount: profile.summary.projectReportCount,
    compatibleProjectCount: profile.summary.compatibleProjectCount,
    fieldCheckCount: profile.summary.fieldCheckCount,
    matchedFieldCheckCount: profile.summary.matchedFieldCheckCount,
    mismatchedFieldCount: profile.summary.mismatchedFieldCount,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
  };
}

function createRegularGate(
  source: SourceNodeV373ShardReadinessCompatibilityRegularGateReference,
  ready: boolean,
): MinimalShardReadinessRegularGateRecord {
  const record = {
    gateMode: "minimal-shard-readiness-regular-gate" as const,
    sourceSpan: "Node v370-v373 shard readiness evidence chain" as const,
    contractVersion: "shard-readiness-regular-gate.v1" as const,
    sourceCompatibilityReportDigest: source.compatibilityReportDigest,
    sourceStaticGateDigest: source.sourceStaticGateDigest,
    sourceLiveReadGateDigest: source.sourceLiveReadGateDigest,
    sourceArchiveVerificationDigest: source.sourceArchiveVerificationDigest,
    operatorCiReady: ready,
  };

  return {
    gateDigest: sha256StableJson(record),
    gateMode: record.gateMode,
    sourceSpan: record.sourceSpan,
    contractVersion: record.contractVersion,
    consumesStaticContractGate: true,
    consumesLiveReadArchive: true,
    consumesArchiveVerification: true,
    consumesCompatibilityReport: true,
    operatorCiReady: ready,
    activeShardingEnabled: false,
    readOnlyReadinessOnly: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    focusedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts",
    groupedCommand:
      "npx.cmd vitest run test\\managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.test.ts test\\managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessRegularGate.test.ts",
    buildCommand: "npm.cmd run build",
    smokeCommand: "Node HTTP smoke with UPSTREAM_PROBES_ENABLED=false for minimal shard readiness regular gate route",
    nextNodeVersionSuggested: "Node v375",
  };
}

function createChecks(
  config: AppConfig,
  source: SourceNodeV373ShardReadinessCompatibilityRegularGateReference,
  gate: MinimalShardReadinessRegularGateRecord,
): MinimalShardReadinessRegularGateChecks {
  return {
    sourceNodeV373Ready:
      source.compatibilityState === "shard-readiness-compatible-for-regular-gate"
      && source.compatibilityDecision === "prepare-minimal-shard-readiness-regular-gate"
      && source.readyForNodeV374MinimalShardReadinessRegularGate
      && source.productionBlockerCount === 0,
    sourceDigestChainComplete:
      isDigest(source.compatibilityReportDigest)
      && isDigest(source.sourceStaticGateDigest)
      && isDigest(source.sourceLiveReadGateDigest)
      && isDigest(source.sourceArchiveVerificationDigest),
    sourceProjectReportsComplete: source.projectReportCount === 2 && source.compatibleProjectCount === 2,
    sourceFieldChecksAllMatched: source.fieldCheckCount > 0
      && source.fieldCheckCount === source.matchedFieldCheckCount
      && source.mismatchedFieldCount === 0,
    sourceProductionBlockersClear: source.productionBlockerCount === 0,
    regularGateDigestStable: isDigest(gate.gateDigest),
    regularGateConsumesFullEvidenceChain:
      gate.consumesStaticContractGate
      && gate.consumesLiveReadArchive
      && gate.consumesArchiveVerification
      && gate.consumesCompatibilityReport,
    operatorCiReady:
      source.readyForNodeV374MinimalShardReadinessRegularGate
      && source.projectReportCount === source.compatibleProjectCount
      && source.fieldCheckCount === source.matchedFieldCheckCount
      && source.mismatchedFieldCount === 0,
    archiveVerificationOnlyEvidencePreserved: gate.readOnlyReadinessOnly && !gate.activeShardingEnabled,
    noLiveReadRerun: !gate.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !gate.startsUpstreamServices && !gate.stopsUpstreamServices,
    noUpstreamMutation: !gate.writesUpstreamState,
    noManagedAuditConnection: !config.upstreamActionsEnabled && !gate.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForMinimalShardReadinessRegularGate: false,
  };
}

function createSummary(
  source: SourceNodeV373ShardReadinessCompatibilityRegularGateReference,
  checks: MinimalShardReadinessRegularGateChecks,
  productionBlockers: readonly MinimalShardReadinessRegularGateMessage[],
  warnings: readonly MinimalShardReadinessRegularGateMessage[],
  recommendations: readonly MinimalShardReadinessRegularGateMessage[],
): MinimalShardReadinessRegularGateSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    sourceProjectReportCount: source.projectReportCount,
    sourceCompatibleProjectCount: source.compatibleProjectCount,
    sourceFieldCheckCount: source.fieldCheckCount,
    sourceMatchedFieldCheckCount: source.matchedFieldCheckCount,
    sourceMismatchedFieldCount: source.mismatchedFieldCount,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: MinimalShardReadinessRegularGateChecks,
): MinimalShardReadinessRegularGateMessage[] {
  const rules: Array<[boolean, string, MinimalShardReadinessRegularGateMessage["source"], string]> = [
    [checks.sourceNodeV373Ready, "SOURCE_NODE_V373_NOT_READY", "node-v373", "Node v373 compatibility report must be ready."],
    [checks.sourceDigestChainComplete, "SOURCE_DIGEST_CHAIN_INCOMPLETE", "regular-gate", "v370-v373 digest chain must be complete."],
    [checks.sourceProjectReportsComplete, "SOURCE_PROJECT_REPORTS_INCOMPLETE", "regular-gate", "Both Java and mini-kv must be compatible."],
    [checks.sourceFieldChecksAllMatched, "SOURCE_FIELD_CHECKS_MISMATCHED", "regular-gate", "All shard-readiness fields must match."],
    [checks.operatorCiReady, "OPERATOR_CI_NOT_READY", "operator-ci", "Regular gate must be ready for operator/CI consumption."],
    [checks.noLiveReadRerun, "LIVE_READ_RERUN_NOT_ALLOWED", "runtime-boundary", "Regular gate must not rerun live reads."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "Regular gate must not start or stop Java/mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  source: SourceNodeV373ShardReadinessCompatibilityRegularGateReference,
): MinimalShardReadinessRegularGateMessage[] {
  return [{
    code: "REGULAR_GATE_IS_READINESS_NOT_ACTIVE_SHARDING",
    severity: "warning",
    source: "regular-gate",
    message: `The regular gate freezes ${source.matchedFieldCheckCount}/${source.fieldCheckCount} matched readiness fields, but active sharding remains disabled.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): MinimalShardReadinessRegularGateMessage[] {
  return [{
    code: ready ? "ARCHIVE_REGULAR_GATE_IN_V375" : "FIX_COMPATIBILITY_CHAIN",
    severity: "recommendation",
    source: "regular-gate",
    message: ready
      ? "Proceed to Node v375 archive verification for the regular gate."
      : "Fix the v373 compatibility chain before regular gate archive verification.",
  }];
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
