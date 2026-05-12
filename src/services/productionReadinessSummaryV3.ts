import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";
import {
  createAccessGuardReadinessProfile,
  type AccessGuardReadinessProfile,
} from "./accessGuard.js";
import {
  createAccessPolicyProfile,
  type AccessPolicyProfile,
  type AccessRoutePolicy,
} from "./accessPolicyProfile.js";
import {
  createAuditStoreEnvConfigProfile,
  type AuditStoreEnvConfigProfile,
} from "./auditStoreEnvConfigProfile.js";
import {
  createAuditStoreRuntimeProfile,
  type AuditStoreRuntimeProfile,
} from "./auditStoreRuntimeProfile.js";
import { describeAuditStoreRuntime } from "./auditStoreFactory.js";
import {
  loadProductionReadinessSummaryV2,
  type ProductionReadinessSummaryV2,
} from "./productionReadinessSummaryV2.js";

export type ProductionReadinessV3CategoryId =
  | "upstream-observability"
  | "access-control"
  | "audit"
  | "execution-safety";

export interface ProductionReadinessSummaryV3 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v3";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    previousSummaryAvailable: boolean;
    javaReplayEvidenceIndexReady: boolean;
    miniKvRecoveryFixtureIndexReady: boolean;
    accessPolicyCoverageReady: boolean;
    accessGuardDryRunReady: boolean;
    auditStoreRuntimeSelectable: boolean;
    auditStoreRuntimeDurable: boolean;
    auditStoreProductionReady: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    categorizedProductionBlockersPresent: boolean;
  };
  summary: {
    categoryCount: number;
    readyCategoryCount: number;
    notReadyCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    accessPolicyCount: number;
    protectedRouteGroupCount: number;
    javaLiveEvidenceEndpointCount: number;
    javaStaticEvidenceSampleCount: number;
    miniKvRecoveryFixtureCount: number;
    auditRuntimeStoreKind: "memory" | "file";
  };
  upstreamEvidenceIndexes: {
    javaReplay: JavaReplayEvidenceIndexSummary;
    miniKvRecovery: MiniKvRecoveryFixtureIndexSummary;
  };
  accessControlEvidence: {
    policyProfileVersion: string;
    policyCount: number;
    protectedRouteGroupCount: number;
    guardProfileVersion: string;
    guardMode: "dry-run";
    rejectsRequests: false;
    routeGroups: string[];
    productionBlockerCount: number;
  };
  auditEvidence: {
    runtimeProfileVersion: string;
    runtimeStoreKind: "memory" | "file";
    storeImplementation: string;
    durableAtRuntime: boolean;
    configuredByEnvironment: boolean;
    envProfileReadyForMigration: boolean;
    productionBlockerCount: number;
  };
  categories: ProductionReadinessV3Category[];
  productionBlockers: ProductionReadinessV3Message[];
  warnings: ProductionReadinessV3Message[];
  recommendations: ProductionReadinessV3Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV3Json: string;
    productionReadinessSummaryV3Markdown: string;
    productionReadinessSummaryV2Json: string;
    accessPolicyProfileJson: string;
    accessGuardReadinessJson: string;
    auditStoreRuntimeProfileJson: string;
    auditStoreEnvConfigProfileJson: string;
    javaReplayEvidenceIndex: string;
    miniKvRecoveryFixtureIndex: string;
  };
  nextActions: string[];
}

export interface JavaReplayEvidenceIndexSummary {
  source: EvidenceSource;
  evidenceVersion?: string;
  readOnly?: boolean;
  executionAllowed?: boolean;
  liveEvidenceEndpointCount: number;
  staticEvidenceSampleCount: number;
  auditIdentityFields: string[];
  executionSafetyRules: string[];
  checks: {
    evidenceVersionMatches: boolean;
    readOnlyIndex: boolean;
    executionBlocked: boolean;
    liveEvidenceEndpointsReadOnly: boolean;
    staticEvidenceSamplesPresent: boolean;
    auditIdentityFieldsPresent: boolean;
    safetyRulesPresent: boolean;
  };
}

export interface MiniKvRecoveryFixtureIndexSummary {
  source: EvidenceSource;
  indexVersion?: string;
  readOnly?: boolean;
  executionAllowed?: boolean;
  orderAuthoritative?: boolean;
  fixtureCount: number;
  consumerHint?: string;
  boundaries: string[];
  checks: {
    indexVersionMatches: boolean;
    readOnlyIndex: boolean;
    executionBlocked: boolean;
    notOrderAuthoritative: boolean;
    recoveryFixturePresent: boolean;
    recoveryFixtureValid: boolean;
    fixtureCountMatchesDiagnostics: boolean;
    consumerHintTargetsNodeV103: boolean;
  };
}

export interface ProductionReadinessV3Category {
  id: ProductionReadinessV3CategoryId;
  title: string;
  ready: boolean;
  readOnly: boolean;
  executionAllowed: boolean;
  blockerCount: number;
  warningCount: number;
  recommendationCount: number;
  evidenceEndpoints: string[];
  note: string;
}

export interface ProductionReadinessV3Message {
  category: ProductionReadinessV3CategoryId;
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: string;
  message: string;
}

interface EvidenceSource {
  project: "java" | "mini-kv";
  path: string;
  status: "available" | "missing" | "invalid";
  message: string;
}

interface EvidenceDocument {
  source: EvidenceSource;
  data?: unknown;
}

const ENDPOINTS = Object.freeze({
  productionReadinessSummaryV3Json: "/api/v1/production/readiness-summary-v3",
  productionReadinessSummaryV3Markdown: "/api/v1/production/readiness-summary-v3?format=markdown",
  productionReadinessSummaryV2Json: "/api/v1/production/readiness-summary-v2",
  accessPolicyProfileJson: "/api/v1/security/access-policy",
  accessGuardReadinessJson: "/api/v1/security/access-guard-readiness",
  auditStoreRuntimeProfileJson: "/api/v1/audit/store-profile",
  auditStoreEnvConfigProfileJson: "/api/v1/audit/store-config-profile",
  javaReplayEvidenceIndex: "/api/v1/failed-events/replay-evidence-index",
  miniKvRecoveryFixtureIndex: "fixtures/recovery/index.json",
});

export async function loadProductionReadinessSummaryV3(config: AppConfig): Promise<ProductionReadinessSummaryV3> {
  const [previousSummary, javaReplayEvidenceIndex, miniKvRecoveryFixtureIndex] = await Promise.all([
    loadProductionReadinessSummaryV2(config),
    readJsonEvidence(config.javaReplayEvidenceIndexFixturePath, "java"),
    readJsonEvidence(config.miniKvRecoveryFixtureIndexPath, "mini-kv"),
  ]);

  const auditRuntime = describeAuditStoreRuntime(config);

  return createProductionReadinessSummaryV3({
    config,
    previousSummary,
    javaReplayEvidenceIndex,
    miniKvRecoveryFixtureIndex,
    accessPolicyProfile: createAccessPolicyProfile(config),
    accessGuardReadinessProfile: createAccessGuardReadinessProfile(),
    auditStoreRuntimeProfile: createAuditStoreRuntimeProfile({ runtime: auditRuntime }),
    auditStoreEnvConfigProfile: createAuditStoreEnvConfigProfile(config),
  });
}

export function createProductionReadinessSummaryV3(input: {
  config: Pick<AppConfig, "upstreamActionsEnabled">;
  previousSummary: ProductionReadinessSummaryV2;
  javaReplayEvidenceIndex: EvidenceDocument;
  miniKvRecoveryFixtureIndex: EvidenceDocument;
  accessPolicyProfile: AccessPolicyProfile;
  accessGuardReadinessProfile: AccessGuardReadinessProfile;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
}): ProductionReadinessSummaryV3 {
  const javaReplay = summarizeJavaReplayEvidenceIndex(input.javaReplayEvidenceIndex);
  const miniKvRecovery = summarizeMiniKvRecoveryFixtureIndex(input.miniKvRecoveryFixtureIndex);
  const accessPolicyCount = input.accessPolicyProfile.summary.routePolicyCount;
  const protectedRouteGroupCount = input.accessPolicyProfile.summary.protectedRouteGroupCount;
  const checks = {
    previousSummaryAvailable: input.previousSummary.summaryVersion === "production-readiness-summary.v2",
    javaReplayEvidenceIndexReady: javaReplayIndexReady(javaReplay),
    miniKvRecoveryFixtureIndexReady: miniKvRecoveryIndexReady(miniKvRecovery),
    accessPolicyCoverageReady: accessPolicyCoverageReady(input.accessPolicyProfile),
    accessGuardDryRunReady: accessGuardDryRunReady(input.accessGuardReadinessProfile),
    auditStoreRuntimeSelectable: isRuntimeSelectable(input.auditStoreRuntimeProfile),
    auditStoreRuntimeDurable: input.auditStoreRuntimeProfile.runtime.durableAtRuntime,
    auditStoreProductionReady: input.auditStoreRuntimeProfile.readyForProductionAudit
      && input.auditStoreEnvConfigProfile.readyForDurableAuditMigration,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    executionStillBlocked: input.previousSummary.checks.executionStillBlocked
      && input.config.upstreamActionsEnabled === false,
    categorizedProductionBlockersPresent: false,
  };
  const productionBlockers = collectProductionBlockers(input, checks);
  checks.categorizedProductionBlockersPresent = productionBlockers.length > 0;
  const warnings = collectWarnings(input);
  const recommendations = collectRecommendations(input);
  const categories = createCategories(checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Production readiness summary v3",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v3",
    maturityTarget: "production-near",
    readyForProductionOperations: false,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      categoryCount: categories.length,
      readyCategoryCount: categories.filter((category) => category.ready).length,
      notReadyCategoryCount: categories.filter((category) => !category.ready).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      accessPolicyCount,
      protectedRouteGroupCount,
      javaLiveEvidenceEndpointCount: javaReplay.liveEvidenceEndpointCount,
      javaStaticEvidenceSampleCount: javaReplay.staticEvidenceSampleCount,
      miniKvRecoveryFixtureCount: miniKvRecovery.fixtureCount,
      auditRuntimeStoreKind: input.auditStoreRuntimeProfile.runtime.runtimeStoreKind,
    },
    upstreamEvidenceIndexes: {
      javaReplay,
      miniKvRecovery,
    },
    accessControlEvidence: {
      policyProfileVersion: input.accessPolicyProfile.profileVersion,
      policyCount: accessPolicyCount,
      protectedRouteGroupCount,
      guardProfileVersion: input.accessGuardReadinessProfile.profileVersion,
      guardMode: input.accessGuardReadinessProfile.guard.mode,
      rejectsRequests: input.accessGuardReadinessProfile.guard.rejectsRequests,
      routeGroups: uniqueRouteGroups(input.accessPolicyProfile.routePolicies),
      productionBlockerCount: input.accessPolicyProfile.summary.productionBlockerCount
        + input.accessGuardReadinessProfile.summary.productionBlockerCount,
    },
    auditEvidence: {
      runtimeProfileVersion: input.auditStoreRuntimeProfile.profileVersion,
      runtimeStoreKind: input.auditStoreRuntimeProfile.runtime.runtimeStoreKind,
      storeImplementation: input.auditStoreRuntimeProfile.runtime.defaultStore,
      durableAtRuntime: input.auditStoreRuntimeProfile.runtime.durableAtRuntime,
      configuredByEnvironment: input.auditStoreRuntimeProfile.runtime.configuredByEnvironment,
      envProfileReadyForMigration: input.auditStoreEnvConfigProfile.readyForDurableAuditMigration,
      productionBlockerCount: input.auditStoreRuntimeProfile.summary.productionBlockerCount
        + input.auditStoreEnvConfigProfile.summary.productionBlockerCount,
    },
    categories,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(productionBlockers.length),
  };
}

export function renderProductionReadinessSummaryV3Markdown(summary: ProductionReadinessSummaryV3): string {
  return [
    "# Production readiness summary v3",
    "",
    `- Service: ${summary.service}`,
    `- Generated at: ${summary.generatedAt}`,
    `- Summary version: ${summary.summaryVersion}`,
    `- Maturity target: ${summary.maturityTarget}`,
    `- Ready for production operations: ${summary.readyForProductionOperations}`,
    `- Read only: ${summary.readOnly}`,
    `- Execution allowed: ${summary.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(summary.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(summary.summary),
    "",
    "## Categories",
    "",
    ...summary.categories.flatMap(renderCategory),
    "## Upstream Evidence Indexes",
    "",
    ...renderEntries(summary.upstreamEvidenceIndexes.javaReplay, "javaReplay"),
    ...renderEntries(summary.upstreamEvidenceIndexes.miniKvRecovery, "miniKvRecovery"),
    "",
    "## Access Control Evidence",
    "",
    ...renderEntries(summary.accessControlEvidence),
    "",
    "## Audit Evidence",
    "",
    ...renderEntries(summary.auditEvidence),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(summary.productionBlockers, "No production readiness blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(summary.warnings, "No production readiness warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(summary.recommendations, "No production readiness recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(summary.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(summary.nextActions, "No next actions."),
    "",
  ].join("\n");
}

async function readJsonEvidence(filePath: string, project: EvidenceSource["project"]): Promise<EvidenceDocument> {
  try {
    const data: unknown = JSON.parse(await readFile(filePath, "utf8"));
    if (!isRecord(data)) {
      return {
        data,
        source: {
          project,
          path: filePath,
          status: "invalid",
          message: "Evidence fixture is not a JSON object.",
        },
      };
    }

    return {
      data,
      source: {
        project,
        path: filePath,
        status: "available",
        message: "Evidence fixture was read and parsed.",
      },
    };
  } catch (error) {
    return {
      source: {
        project,
        path: filePath,
        status: "missing",
        message: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

function summarizeJavaReplayEvidenceIndex(document: EvidenceDocument): JavaReplayEvidenceIndexSummary {
  const data = asRecord(document.data);
  const liveEvidenceEndpoints = readRecordArray(data.liveEvidenceEndpoints);
  const staticEvidenceSamples = readRecordArray(data.staticEvidenceSamples);
  const auditIdentityFields = readStringArray(data.auditIdentityFields);
  const executionSafetyRules = readStringArray(data.executionSafetyRules);
  const checks = {
    evidenceVersionMatches: readString(data, "evidenceVersion") === "failed-event-replay-evidence-index.v1",
    readOnlyIndex: readBoolean(data, "readOnly") === true,
    executionBlocked: readBoolean(data, "executionAllowed") === false,
    liveEvidenceEndpointsReadOnly: liveEvidenceEndpoints.length >= 6
      && liveEvidenceEndpoints.every((endpoint) =>
        readString(endpoint, "method") === "GET"
        && readBoolean(endpoint, "readOnly") === true
        && readBoolean(endpoint, "changesReplayState") === false),
    staticEvidenceSamplesPresent: staticEvidenceSamples.length >= 4,
    auditIdentityFieldsPresent: [
      "operator.operatorId",
      "requestId",
      "decisionId",
    ].every((field) => auditIdentityFields.includes(field)),
    safetyRulesPresent: [
      "REAL_REPLAY_REQUIRES_APPROVED_STATUS",
      "BLOCKED_PRECHECK_MUST_NOT_CREATE_REPLAY_ATTEMPT",
    ].every((rule) => executionSafetyRules.includes(rule)),
  };

  return {
    source: document.source,
    evidenceVersion: readString(data, "evidenceVersion"),
    readOnly: readBoolean(data, "readOnly"),
    executionAllowed: readBoolean(data, "executionAllowed"),
    liveEvidenceEndpointCount: liveEvidenceEndpoints.length,
    staticEvidenceSampleCount: staticEvidenceSamples.length,
    auditIdentityFields,
    executionSafetyRules,
    checks,
  };
}

function summarizeMiniKvRecoveryFixtureIndex(document: EvidenceDocument): MiniKvRecoveryFixtureIndexSummary {
  const data = asRecord(document.data);
  const fixtures = readRecordArray(data.fixtures);
  const diagnostics = readRecord(data, "diagnostics");
  const recoveryFixture = fixtures.find((fixture) => readString(fixture, "id") === "restart-recovery-evidence") ?? {};
  const boundaries = readStringArray(recoveryFixture.boundaries);
  const checks = {
    indexVersionMatches: readString(data, "index_version") === "mini-kv-recovery-fixtures.v1",
    readOnlyIndex: readBoolean(data, "read_only") === true,
    executionBlocked: readBoolean(data, "execution_allowed") === false,
    notOrderAuthoritative: readBoolean(data, "order_authoritative") === false,
    recoveryFixturePresent: isRecord(recoveryFixture) && Object.keys(recoveryFixture).length > 0,
    recoveryFixtureValid: readString(recoveryFixture, "evidence_version") === "mini-kv-restart-recovery.v1"
      && readBoolean(recoveryFixture, "recovered") === true
      && readBoolean(recoveryFixture, "digests_match") === true,
    fixtureCountMatchesDiagnostics: readNumber(diagnostics, "fixture_count") === fixtures.length,
    consumerHintTargetsNodeV103: (readString(recoveryFixture, "consumer_hint") ?? "").includes("Node v103"),
  };

  return {
    source: document.source,
    indexVersion: readString(data, "index_version"),
    readOnly: readBoolean(data, "read_only"),
    executionAllowed: readBoolean(data, "execution_allowed"),
    orderAuthoritative: readBoolean(data, "order_authoritative"),
    fixtureCount: fixtures.length,
    consumerHint: readString(recoveryFixture, "consumer_hint"),
    boundaries,
    checks,
  };
}

function javaReplayIndexReady(summary: JavaReplayEvidenceIndexSummary): boolean {
  return summary.source.status === "available" && Object.values(summary.checks).every(Boolean);
}

function miniKvRecoveryIndexReady(summary: MiniKvRecoveryFixtureIndexSummary): boolean {
  return summary.source.status === "available" && Object.values(summary.checks).every(Boolean);
}

function accessPolicyCoverageReady(profile: AccessPolicyProfile): boolean {
  return profile.checks.identityContractDefined
    && profile.checks.routePolicyMapDefined
    && profile.checks.readinessRoutesCovered
    && profile.checks.auditRoutesRequireAuditor
    && profile.checks.mutationRoutesRequireOperatorOrApprover
    && profile.checks.archiveRoutesRequireApprover
    && profile.checks.noSecretRequired
    && profile.checks.upstreamActionsStillDisabled;
}

function accessGuardDryRunReady(profile: AccessGuardReadinessProfile): boolean {
  return profile.checks.dryRunGuardEnabled
    && profile.checks.noRequestRejection
    && profile.checks.readinessRoutesCovered
    && profile.checks.auditRoutesCovered
    && profile.checks.intentMutationRoutesCovered
    && profile.checks.approvalRoutesCovered
    && profile.checks.archiveRoutesCovered
    && profile.checks.upstreamProxyActionsCovered
    && profile.checks.roleEvaluationImplemented;
}

function isRuntimeSelectable(profile: AuditStoreRuntimeProfile): boolean {
  return profile.runtime.runtimeStoreKind === "memory" || profile.runtime.runtimeStoreKind === "file";
}

function collectProductionBlockers(
  input: {
    accessPolicyProfile: AccessPolicyProfile;
    accessGuardReadinessProfile: AccessGuardReadinessProfile;
    auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
    auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
  },
  checks: ProductionReadinessSummaryV3["checks"],
): ProductionReadinessV3Message[] {
  const blockers: ProductionReadinessV3Message[] = [];
  addCheckMessage(blockers, checks.previousSummaryAvailable, "PREVIOUS_SUMMARY_UNAVAILABLE", "execution-safety", "production-readiness-summary-v2", "Production readiness summary v2 must remain loadable.");
  addCheckMessage(blockers, checks.javaReplayEvidenceIndexReady, "JAVA_REPLAY_EVIDENCE_INDEX_INVALID", "upstream-observability", "java-replay-evidence-index", "Java v47 replay evidence index must expose read-only replay evidence endpoints and samples.");
  addCheckMessage(blockers, checks.miniKvRecoveryFixtureIndexReady, "MINIKV_RECOVERY_FIXTURE_INDEX_INVALID", "upstream-observability", "mini-kv-recovery-fixture-index", "mini-kv v56 recovery fixture index must prove recovery evidence remains read-only and non-authoritative.");
  addCheckMessage(blockers, checks.accessPolicyCoverageReady, "ACCESS_POLICY_COVERAGE_INCOMPLETE", "access-control", "access-policy-profile", "Access policy map must cover readiness, audit, mutation, archive, and upstream proxy route groups.");
  addCheckMessage(blockers, checks.accessGuardDryRunReady, "ACCESS_GUARD_DRY_RUN_INCOMPLETE", "access-control", "access-guard-readiness-profile", "Access guard dry-run must evaluate protected route groups without rejecting requests.");
  addCheckMessage(blockers, input.accessPolicyProfile.readyForEnforcement, "ACCESS_POLICY_CONTRACT_ONLY", "access-control", "access-policy-profile", "Access policy is still a contract and is not enforceable production authentication.");
  addCheckMessage(blockers, input.accessGuardReadinessProfile.readyForEnforcement, "ACCESS_GUARD_DRY_RUN_ONLY", "access-control", "access-guard-readiness-profile", "Access guard still records would-deny evidence without rejecting requests.");
  addCheckMessage(blockers, checks.auditStoreRuntimeSelectable, "AUDIT_STORE_RUNTIME_UNSELECTABLE", "audit", "audit-store-runtime-profile", "Audit store runtime must be selectable by configuration.");
  addCheckMessage(blockers, checks.auditStoreRuntimeDurable, "AUDIT_RUNTIME_NOT_DURABLE", "audit", "audit-store-runtime-profile", "Current runtime is not durable enough for production audit evidence.");
  addCheckMessage(blockers, checks.auditStoreProductionReady, "AUDIT_PRODUCTION_STORE_NOT_READY", "audit", "audit-store-runtime-profile", "Durable audit still needs production storage, retention, rotation, and backup policy.");
  addCheckMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "execution-safety", "node-config", "UPSTREAM_ACTIONS_ENABLED must remain false while production blockers exist.");
  addCheckMessage(blockers, checks.executionStillBlocked, "NODE_EXECUTION_NOT_BLOCKED", "execution-safety", "production-readiness-summary-v2", "Execution must remain blocked until access and audit are production-ready.");

  return blockers;
}

function collectWarnings(input: {
  accessPolicyProfile: AccessPolicyProfile;
  accessGuardReadinessProfile: AccessGuardReadinessProfile;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
}): ProductionReadinessV3Message[] {
  return [
    ...input.accessPolicyProfile.warnings.map((message) => fromProfileMessage("access-control", "access-policy-profile", message)),
    ...input.accessGuardReadinessProfile.warnings.map((message) => fromProfileMessage("access-control", "access-guard-readiness-profile", message)),
    ...input.auditStoreRuntimeProfile.warnings.map((message) => fromProfileMessage("audit", "audit-store-runtime-profile", message)),
    ...input.auditStoreEnvConfigProfile.warnings.map((message) => fromProfileMessage("audit", "audit-store-env-config-profile", message)),
  ];
}

function collectRecommendations(input: {
  accessPolicyProfile: AccessPolicyProfile;
  accessGuardReadinessProfile: AccessGuardReadinessProfile;
  auditStoreRuntimeProfile: AuditStoreRuntimeProfile;
  auditStoreEnvConfigProfile: AuditStoreEnvConfigProfile;
}): ProductionReadinessV3Message[] {
  return [
    ...input.accessPolicyProfile.recommendations.map((message) => fromProfileMessage("access-control", "access-policy-profile", message)),
    ...input.accessGuardReadinessProfile.recommendations.map((message) => fromProfileMessage("access-control", "access-guard-readiness-profile", message)),
    ...input.auditStoreRuntimeProfile.recommendations.map((message) => fromProfileMessage("audit", "audit-store-runtime-profile", message)),
    ...input.auditStoreEnvConfigProfile.recommendations.map((message) => fromProfileMessage("audit", "audit-store-env-config-profile", message)),
    {
      category: "upstream-observability",
      code: "KEEP_UPSTREAM_INDEXES_VERSIONED",
      severity: "recommendation",
      source: "production-readiness-summary-v3",
      message: "Keep Java replay evidence and mini-kv recovery indexes versioned before live probe windows.",
    },
  ];
}

function createCategories(
  checks: ProductionReadinessSummaryV3["checks"],
  blockers: ProductionReadinessV3Message[],
  warnings: ProductionReadinessV3Message[],
  recommendations: ProductionReadinessV3Message[],
): ProductionReadinessV3Category[] {
  return [
    {
      id: "upstream-observability",
      title: "Upstream observability indexes",
      ready: checks.previousSummaryAvailable
        && checks.javaReplayEvidenceIndexReady
        && checks.miniKvRecoveryFixtureIndexReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "upstream-observability"),
      warningCount: countMessages(warnings, "upstream-observability"),
      recommendationCount: countMessages(recommendations, "upstream-observability"),
      evidenceEndpoints: [
        ENDPOINTS.productionReadinessSummaryV2Json,
        ENDPOINTS.javaReplayEvidenceIndex,
        ENDPOINTS.miniKvRecoveryFixtureIndex,
      ],
      note: "Java v47 and mini-kv v56 indexes are accepted as read-only upstream evidence, not as permission to execute.",
    },
    {
      id: "access-control",
      title: "Access policy and dry-run guard",
      ready: checks.accessPolicyCoverageReady && checks.accessGuardDryRunReady && false,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "access-control"),
      warningCount: countMessages(warnings, "access-control"),
      recommendationCount: countMessages(recommendations, "access-control"),
      evidenceEndpoints: [
        ENDPOINTS.accessPolicyProfileJson,
        ENDPOINTS.accessGuardReadinessJson,
      ],
      note: "Policy coverage and dry-run evaluation exist, but real auth/RBAC enforcement is still intentionally blocked.",
    },
    {
      id: "audit",
      title: "Audit runtime durability",
      ready: checks.auditStoreProductionReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "audit"),
      warningCount: countMessages(warnings, "audit"),
      recommendationCount: countMessages(recommendations, "audit"),
      evidenceEndpoints: [
        ENDPOINTS.auditStoreRuntimeProfileJson,
        ENDPOINTS.auditStoreEnvConfigProfileJson,
      ],
      note: "File mode can be selected for rehearsal, but production audit still needs managed durable storage and retention.",
    },
    {
      id: "execution-safety",
      title: "Execution safety",
      ready: checks.upstreamActionsStillDisabled && checks.executionStillBlocked,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "execution-safety"),
      warningCount: countMessages(warnings, "execution-safety"),
      recommendationCount: countMessages(recommendations, "execution-safety"),
      evidenceEndpoints: [
        ENDPOINTS.productionReadinessSummaryV3Json,
        ENDPOINTS.productionReadinessSummaryV2Json,
      ],
      note: "Node keeps upstream execution disabled while access and audit are not production-ready.",
    },
  ];
}

function collectNextActions(productionBlockerCount: number): string[] {
  if (productionBlockerCount === 0) {
    return [
      "Run a coordinated read-only live probe window before enabling any production operation.",
      "Keep upstream actions disabled until a dedicated enforcement version is approved.",
    ];
  }

  return [
    "Promote access guard evidence into durable audit records before real enforcement.",
    "Add operator identity authentication and RBAC middleware in a dedicated Node version.",
    "Keep using file-backed audit only for local restart rehearsal until managed audit storage and retention exist.",
  ];
}

function uniqueRouteGroups(policies: AccessRoutePolicy[]): string[] {
  return [...new Set(policies.map((policy) => policy.routeGroup))];
}

function addCheckMessage(
  messages: ProductionReadinessV3Message[],
  condition: boolean,
  code: string,
  category: ProductionReadinessV3CategoryId,
  source: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ category, code, severity: "blocker", source, message });
  }
}

function fromProfileMessage(
  category: ProductionReadinessV3CategoryId,
  source: string,
  message: { code: string; severity: "blocker" | "warning" | "recommendation"; message: string },
): ProductionReadinessV3Message {
  return {
    category,
    source,
    code: message.code,
    severity: message.severity,
    message: message.message,
  };
}

function countMessages(messages: ProductionReadinessV3Message[], category: ProductionReadinessV3CategoryId): number {
  return messages.filter((message) => message.category === category).length;
}

function readRecord(record: Record<string, unknown>, field: string): Record<string, unknown> {
  const value = record[field];
  return isRecord(value) ? value : {};
}

function readString(record: Record<string, unknown>, field: string): string | undefined {
  const value = record[field];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readNumber(record: Record<string, unknown>, field: string): number | undefined {
  const value = record[field];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function readBoolean(record: Record<string, unknown>, field: string): boolean | undefined {
  const value = record[field];
  return typeof value === "boolean" ? value : undefined;
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function readRecordArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) && value.every(isRecord) ? value : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function renderCategory(category: ProductionReadinessV3Category): string[] {
  return [
    `### ${category.id}`,
    "",
    `- Title: ${category.title}`,
    `- Ready: ${category.ready}`,
    `- Read only: ${category.readOnly}`,
    `- Execution allowed: ${category.executionAllowed}`,
    `- Blocker count: ${category.blockerCount}`,
    `- Warning count: ${category.warningCount}`,
    `- Recommendation count: ${category.recommendationCount}`,
    `- Evidence endpoints: ${category.evidenceEndpoints.join(", ")}`,
    `- Note: ${category.note}`,
    "",
  ];
}

function renderMessages(messages: ProductionReadinessV3Message[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.category}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object, prefix?: string): string[] {
  return Object.entries(record).map(([key, value]) => `- ${prefix === undefined ? key : `${prefix}.${key}`}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
