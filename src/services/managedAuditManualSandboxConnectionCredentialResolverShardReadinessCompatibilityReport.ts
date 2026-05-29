import type { AppConfig } from "../config.js";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { countPassedReportChecks, countReportChecks, sha256StableJson } from "./liveProbeReportUtils.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationTypes.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
  ShardReadinessEvidenceAssessment,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateTypes.js";
import type {
  MinimalShardReadinessLiveReadObservation,
} from "./managedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadGateTypes.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile,
  ShardReadinessCompatibilityFieldCheck,
  ShardReadinessCompatibilityProjectReport,
  ShardReadinessCompatibilityReportChecks,
  ShardReadinessCompatibilityReportMessage,
  ShardReadinessCompatibilityReportRecord,
  ShardReadinessCompatibilityReportSummary,
  SourceNodeV370ShardReadinessStaticCompatibilityReference,
  SourceNodeV372ShardReadinessArchiveCompatibilityReference,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportTypes.js";

export {
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-compatibility-report";
const SOURCE_NODE_V370_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate";
const SOURCE_NODE_V372_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-minimal-shard-readiness-live-read-archive-verification";
const ACTIVE_PLAN = "docs/plans3/v372-post-minimal-shard-readiness-live-read-archive-verification-roadmap.md";
const NEXT_PLAN = "docs/plans3/v373-post-shard-readiness-compatibility-report-roadmap.md";
const V370_ARCHIVE_JSON = path.join(
  "e",
  "370",
  "evidence",
  "shard-readiness-contract-consumer-gate-v370-http.json",
);
const COMPATIBILITY_FIELDS = Object.freeze([
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

export function loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport(
  input: { config: AppConfig; archiveRoot?: string },
): ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportProfile {
  const projectRoot = input.archiveRoot ?? process.cwd();
  const staticGate = readArchivedStaticGate(projectRoot)
    ?? loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
      config: input.config,
      archiveRoot: projectRoot,
    });
  const archiveVerification =
    loadManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerification({
      config: input.config,
      archiveRoot: projectRoot,
    });
  const sourceNodeV370 = createSourceNodeV370(staticGate);
  const sourceNodeV372 = createSourceNodeV372(archiveVerification);
  const javaReport = createProjectReport(staticGate.javaShardReadiness, archiveVerification.liveReads.java);
  const miniKvReport = createProjectReport(staticGate.miniKvShardReadiness, archiveVerification.liveReads.miniKv);
  const projectReports = [javaReport, miniKvReport];
  const fieldChecks = [
    ...createFieldChecks(staticGate.javaShardReadiness, archiveVerification.liveReads.java),
    ...createFieldChecks(staticGate.miniKvShardReadiness, archiveVerification.liveReads.miniKv),
  ];
  const draftReport = createCompatibilityReport(sourceNodeV370, sourceNodeV372, false);
  const checks = createChecks(input.config, sourceNodeV370, sourceNodeV372, javaReport, miniKvReport, draftReport);
  checks.readyForShardReadinessCompatibilityReport = Object.entries(checks)
    .filter(([key]) => key !== "readyForShardReadinessCompatibilityReport")
    .every(([, value]) => value);
  const ready = checks.readyForShardReadinessCompatibilityReport;
  const compatibilityReport = createCompatibilityReport(sourceNodeV370, sourceNodeV372, ready);
  checks.reportDigestStable = isDigest(compatibilityReport.reportDigest);
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(projectReports);
  const recommendations = collectRecommendations(ready);
  const summary = createSummary(projectReports, fieldChecks, checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver shard readiness compatibility report",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    compatibilityState: ready ? "shard-readiness-compatible-for-regular-gate" : "blocked",
    compatibilityDecision: ready ? "prepare-minimal-shard-readiness-regular-gate" : "blocked",
    readyForShardReadinessCompatibilityReport: ready,
    readyForNodeV374MinimalShardReadinessRegularGate: ready,
    activeNodeVersion: "Node v373",
    sourceStaticNodeVersion: "Node v370",
    sourceArchiveNodeVersion: "Node v372",
    consumesNodeV370ShardReadinessContractConsumerGate: true,
    consumesNodeV372LiveReadArchiveVerification: true,
    compatibilityReportOnly: true,
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
    sourceNodeV370,
    sourceNodeV372,
    projectReports,
    fieldChecks,
    compatibilityReport,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      compatibilityReportJson: ROUTE_PATH,
      compatibilityReportMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV370Json: SOURCE_NODE_V370_ROUTE,
      sourceNodeV370Markdown: `${SOURCE_NODE_V370_ROUTE}?format=markdown`,
      sourceNodeV372Json: SOURCE_NODE_V372_ROUTE,
      sourceNodeV372Markdown: `${SOURCE_NODE_V372_ROUTE}?format=markdown`,
      activePlan: ACTIVE_PLAN,
      nextPlan: NEXT_PLAN,
      nextNodeVersion: "Node v374",
    },
    nextActions: ready
      ? [
        "Use Node v374 to turn v370-v373 shard readiness evidence into a regular gate.",
        "Keep Java and mini-kv hardening parallel; Node should consume their evidence instead of blocking their progress.",
        "Do not treat shard-readiness compatibility as active sharding or authority transfer.",
      ]
      : [
        "Repair static/live shard-readiness drift before creating a regular gate.",
        "Do not reopen live reads from this compatibility report.",
      ],
  };
}

function readArchivedStaticGate(
  projectRoot: string,
): ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile | null {
  const absolutePath = path.join(projectRoot, ...V370_ARCHIVE_JSON.split("/"));
  if (!existsSync(absolutePath)) {
    return null;
  }

  try {
    const parsed = JSON.parse(readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, ""));
    if (
      parsed !== null
      && typeof parsed === "object"
      && !Array.isArray(parsed)
      && (parsed as Record<string, unknown>).profileVersion
        === "managed-audit-manual-sandbox-connection-credential-resolver-shard-readiness-contract-consumer-gate.v1"
    ) {
      return parsed as ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile;
    }
  } catch {
    return null;
  }

  return null;
}

function createSourceNodeV370(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateProfile,
): SourceNodeV370ShardReadinessStaticCompatibilityReference {
  return {
    sourceVersion: "Node v370",
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    gateDecision: profile.gateDecision,
    readyForShardReadinessContractConsumerGate: profile.readyForShardReadinessContractConsumerGate,
    readyForNodeV371MinimalShardReadinessLiveReadGate: profile.readyForNodeV371MinimalShardReadinessLiveReadGate,
    gateDigest: profile.gate.gateDigest,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    evidenceSourceCount: profile.summary.evidenceSourceCount,
    readyEvidenceSourceCount: profile.summary.readyEvidenceSourceCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    startsJavaService: false,
    startsMiniKvService: false,
    executionAllowed: false,
  };
}

function createSourceNodeV372(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverMinimalShardReadinessLiveReadArchiveVerificationProfile,
): SourceNodeV372ShardReadinessArchiveCompatibilityReference {
  return {
    sourceVersion: "Node v372",
    profileVersion: profile.profileVersion,
    archiveVerificationState: profile.archiveVerificationState,
    archiveVerificationDecision: profile.archiveVerificationDecision,
    readyForMinimalShardReadinessLiveReadArchiveVerification:
      profile.readyForMinimalShardReadinessLiveReadArchiveVerification,
    readyForNodeV373ShardReadinessCompatibilityReport: profile.readyForNodeV373ShardReadinessCompatibilityReport,
    archiveVerificationDigest: profile.archiveVerification.archiveVerificationDigest,
    sourceGateDigest: profile.sourceNodeV371.gateDigest,
    sourceNodeV370GateDigest: profile.sourceNodeV371.sourceNodeV370GateDigest,
    sourceCheckCount: profile.summary.checkCount,
    sourcePassedCheckCount: profile.summary.passedCheckCount,
    archiveFileCount: profile.summary.archiveFileCount,
    presentArchiveFileCount: profile.summary.presentArchiveFileCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    rerunsLiveRead: false,
    startsJavaService: false,
    startsMiniKvService: false,
    stopsJavaService: false,
    stopsMiniKvService: false,
    executionAllowed: false,
  };
}

function createProjectReport(
  staticEvidence: ShardReadinessEvidenceAssessment,
  liveRead: MinimalShardReadinessLiveReadObservation | null,
): ShardReadinessCompatibilityProjectReport {
  const fieldChecks = createFieldChecks(staticEvidence, liveRead);
  const mismatchedFields = fieldChecks.filter((field) => !field.matches).map((field) => field.field);
  const liveReady = liveRead?.readyForGate === true && liveRead.status === "passed-read";
  const readOnlySafe = staticEvidence.readOnlySafe && liveRead?.readOnlySafe === true;
  const executionBlocked = staticEvidence.executionBlocked && liveRead?.executionBlocked === true;
  const activeShardingEnabled = staticEvidence.evidence.shardEnabled === true || liveRead?.evidence?.shardEnabled === true;
  const compatibleForRegularGate =
    staticEvidence.readyForNodeConsumption
    && liveReady
    && readOnlySafe
    && executionBlocked
    && !activeShardingEnabled
    && mismatchedFields.length === 0;

  return {
    project: staticEvidence.project,
    staticSourceVersion: staticEvidence.sourceVersion,
    liveSourceVersion: liveRead?.sourceVersion ?? (staticEvidence.project === "advanced-order-platform"
      ? "Java v153 live"
      : "mini-kv v144 live"),
    staticReady: staticEvidence.readyForNodeConsumption,
    liveReady,
    readOnlySafe,
    executionBlocked,
    activeShardingEnabled,
    fieldCount: fieldChecks.length,
    matchedFieldCount: fieldChecks.filter((field) => field.matches).length,
    mismatchedFields,
    compatibleForRegularGate,
  };
}

function createFieldChecks(
  staticEvidence: ShardReadinessEvidenceAssessment,
  liveRead: MinimalShardReadinessLiveReadObservation | null,
): ShardReadinessCompatibilityFieldCheck[] {
  return COMPATIBILITY_FIELDS.map((field) => {
    const staticValue = primitiveValue((staticEvidence.evidence as unknown as Record<string, unknown>)[field]);
    const liveValue = primitiveValue(liveRead?.evidence?.[field]);
    return {
      project: staticEvidence.project,
      field,
      staticValue,
      liveValue,
      matches: staticValue === liveValue,
    };
  });
}

function createCompatibilityReport(
  sourceNodeV370: SourceNodeV370ShardReadinessStaticCompatibilityReference,
  sourceNodeV372: SourceNodeV372ShardReadinessArchiveCompatibilityReference,
  ready: boolean,
): ShardReadinessCompatibilityReportRecord {
  const record = {
    reportMode: "shard-readiness-compatibility-report" as const,
    sourceSpan: "Node v370 static contract plus Node v371/v372 archived live-read evidence" as const,
    sourceStaticGateDigest: sourceNodeV370.gateDigest,
    sourceLiveReadGateDigest: sourceNodeV372.sourceGateDigest,
    sourceArchiveVerificationDigest: sourceNodeV372.archiveVerificationDigest,
    compatibilityDecision: ready ? "prepare-minimal-shard-readiness-regular-gate" : "blocked",
  };

  return {
    reportDigest: sha256StableJson(record),
    reportMode: record.reportMode,
    sourceSpan: record.sourceSpan,
    sourceStaticGateDigest: record.sourceStaticGateDigest,
    sourceLiveReadGateDigest: record.sourceLiveReadGateDigest,
    sourceArchiveVerificationDigest: record.sourceArchiveVerificationDigest,
    comparesStaticAndLiveEvidence: true,
    consumesArchiveVerificationOnly: true,
    rerunsLiveRead: false,
    startsUpstreamServices: false,
    stopsUpstreamServices: false,
    writesUpstreamState: false,
    opensManagedAuditConnection: false,
    nextNodeVersionSuggested: "Node v374",
  };
}

function createChecks(
  config: AppConfig,
  sourceNodeV370: SourceNodeV370ShardReadinessStaticCompatibilityReference,
  sourceNodeV372: SourceNodeV372ShardReadinessArchiveCompatibilityReference,
  javaReport: ShardReadinessCompatibilityProjectReport,
  miniKvReport: ShardReadinessCompatibilityProjectReport,
  report: ShardReadinessCompatibilityReportRecord,
): ShardReadinessCompatibilityReportChecks {
  return {
    sourceNodeV370Ready:
      sourceNodeV370.gateState === "shard-readiness-contract-consumer-gate-ready"
      && sourceNodeV370.readyForNodeV371MinimalShardReadinessLiveReadGate
      && sourceNodeV370.productionBlockerCount === 0,
    sourceNodeV372ArchiveReady:
      sourceNodeV372.archiveVerificationState === "minimal-shard-readiness-live-read-archive-verified"
      && sourceNodeV372.readyForNodeV373ShardReadinessCompatibilityReport
      && sourceNodeV372.archiveFileCount === sourceNodeV372.presentArchiveFileCount
      && sourceNodeV372.productionBlockerCount === 0,
    sourceDigestChainAligned:
      isDigest(sourceNodeV370.gateDigest)
      && sourceNodeV370.gateDigest === sourceNodeV372.sourceNodeV370GateDigest
      && isDigest(sourceNodeV372.sourceGateDigest)
      && isDigest(sourceNodeV372.archiveVerificationDigest),
    javaStaticEvidenceReady: javaReport.staticReady,
    javaLiveReadArchivedReady: javaReport.liveReady,
    javaStaticLiveFieldsCompatible: javaReport.mismatchedFields.length === 0,
    javaReadOnlyBoundarySafe: javaReport.readOnlySafe && javaReport.executionBlocked && !javaReport.activeShardingEnabled,
    miniKvStaticEvidenceReady: miniKvReport.staticReady,
    miniKvLiveReadArchivedReady: miniKvReport.liveReady,
    miniKvStaticLiveFieldsCompatible: miniKvReport.mismatchedFields.length === 0,
    miniKvReadOnlyBoundarySafe: miniKvReport.readOnlySafe && miniKvReport.executionBlocked
      && !miniKvReport.activeShardingEnabled,
    bothProjectsCompatible: javaReport.compatibleForRegularGate && miniKvReport.compatibleForRegularGate,
    archiveVerificationOnly: report.consumesArchiveVerificationOnly,
    noLiveReadRerun: !report.rerunsLiveRead,
    noAutomaticUpstreamStartStop: !report.startsUpstreamServices && !report.stopsUpstreamServices,
    noUpstreamMutation: !report.writesUpstreamState,
    noManagedAuditConnection: !config.upstreamActionsEnabled && !report.opensManagedAuditConnection,
    noCredentialValueRead: true,
    noRawEndpointUrlParsed: true,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    reportDigestStable: isDigest(report.reportDigest),
    readyForShardReadinessCompatibilityReport: false,
  };
}

function createSummary(
  projectReports: readonly ShardReadinessCompatibilityProjectReport[],
  fieldChecks: readonly ShardReadinessCompatibilityFieldCheck[],
  checks: ShardReadinessCompatibilityReportChecks,
  productionBlockers: readonly ShardReadinessCompatibilityReportMessage[],
  warnings: readonly ShardReadinessCompatibilityReportMessage[],
  recommendations: readonly ShardReadinessCompatibilityReportMessage[],
): ShardReadinessCompatibilityReportSummary {
  return {
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    projectReportCount: projectReports.length,
    compatibleProjectCount: projectReports.filter((project) => project.compatibleForRegularGate).length,
    fieldCheckCount: fieldChecks.length,
    matchedFieldCheckCount: fieldChecks.filter((field) => field.matches).length,
    mismatchedFieldCount: fieldChecks.filter((field) => !field.matches).length,
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
}

function collectProductionBlockers(
  checks: ShardReadinessCompatibilityReportChecks,
): ShardReadinessCompatibilityReportMessage[] {
  const rules: Array<[boolean, string, ShardReadinessCompatibilityReportMessage["source"], string]> = [
    [checks.sourceNodeV370Ready, "SOURCE_NODE_V370_NOT_READY", "node-v370", "Node v370 static shard readiness gate must be ready."],
    [checks.sourceNodeV372ArchiveReady, "SOURCE_NODE_V372_ARCHIVE_NOT_READY", "node-v372", "Node v372 live-read archive verification must be ready."],
    [checks.sourceDigestChainAligned, "SOURCE_DIGEST_CHAIN_DRIFTED", "compatibility-report", "v370, v371 and v372 digests must align."],
    [checks.javaStaticLiveFieldsCompatible, "JAVA_STATIC_LIVE_DRIFT", "java-compatibility", "Java static evidence and archived live read must match."],
    [checks.miniKvStaticLiveFieldsCompatible, "MINI_KV_STATIC_LIVE_DRIFT", "mini-kv-compatibility", "mini-kv static evidence and archived live read must match."],
    [checks.bothProjectsCompatible, "PROJECT_COMPATIBILITY_INCOMPLETE", "compatibility-report", "Both Java and mini-kv must be compatible before v374."],
    [checks.noLiveReadRerun, "LIVE_READ_RERUN_NOT_ALLOWED", "runtime-boundary", "v373 must not rerun Java or mini-kv reads."],
    [checks.noAutomaticUpstreamStartStop, "UPSTREAM_LIFECYCLE_TOUCHED", "runtime-boundary", "v373 must not start or stop Java/mini-kv."],
    [checks.noManagedAuditConnection, "MANAGED_AUDIT_CONNECTION_OPEN", "runtime-boundary", "Managed audit connection must remain closed."],
  ];

  return rules
    .filter(([condition]) => !condition)
    .map(([, code, source, message]) => ({ code, severity: "blocker" as const, source, message }));
}

function collectWarnings(
  reports: readonly ShardReadinessCompatibilityProjectReport[],
): ShardReadinessCompatibilityReportMessage[] {
  const active = reports.filter((report) => report.activeShardingEnabled);
  return [{
    code: active.length === 0 ? "COMPATIBLE_READINESS_NOT_ACTIVE_SHARDING" : "ACTIVE_SHARDING_OBSERVED",
    severity: "warning",
    source: "compatibility-report",
    message: active.length === 0
      ? "Static and live evidence are compatible, but both still describe read-only readiness rather than active sharding."
      : `Active sharding observed for: ${active.map((report) => report.project).join(", ")}.`,
  }];
}

function collectRecommendations(
  ready: boolean,
): ShardReadinessCompatibilityReportMessage[] {
  return [{
    code: ready ? "PROCEED_TO_V374_REGULAR_GATE" : "FIX_SHARD_READINESS_DRIFT",
    severity: "recommendation",
    source: "compatibility-report",
    message: ready
      ? "Proceed to Node v374 regular gate; keep Java/mini-kv hardening parallel."
      : "Fix static/live shard-readiness drift before a regular gate.",
  }];
}

function primitiveValue(value: unknown): string | number | boolean | null {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? value : null;
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}
