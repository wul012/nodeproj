import { readFile } from "node:fs/promises";

import type { AppConfig } from "../config.js";
import {
  createAccessGuardReadinessProfile,
  evaluateAccessGuard,
  type AccessGuardEvaluation,
  type AccessGuardReadinessProfile,
} from "./accessGuard.js";
import { describeAuditStoreRuntime } from "./auditStoreFactory.js";
import {
  createFileAuditRestartEvidenceReport,
  type FileAuditRestartEvidenceReport,
} from "./fileAuditRestartEvidence.js";
import {
  createOperatorIdentityContractProfile,
  type OperatorIdentityContractProfile,
} from "./operatorIdentityContract.js";
import {
  loadProductionReadinessSummaryV3,
  type ProductionReadinessSummaryV3,
} from "./productionReadinessSummaryV3.js";

export type ProductionReadinessV4CategoryId =
  | "upstream-boundary-evidence"
  | "access-control"
  | "audit"
  | "execution-safety";

export interface ProductionReadinessSummaryV4 {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  summaryVersion: "production-readiness-summary.v4";
  maturityTarget: "production-near";
  readyForProductionOperations: false;
  readOnly: true;
  executionAllowed: false;
  checks: {
    previousSummaryAvailable: boolean;
    javaOperatorAuthBoundaryReady: boolean;
    miniKvRecoveryBoundaryReady: boolean;
    accessGuardAuditContextReady: boolean;
    operatorIdentityCoverageReady: boolean;
    fileAuditRestartEvidenceReady: boolean;
    accessEvidenceDurableCoverage: boolean;
    upstreamActionsStillDisabled: boolean;
    executionStillBlocked: boolean;
    productionBlockersRemain: boolean;
  };
  summary: {
    categoryCount: number;
    readyCategoryCount: number;
    notReadyCategoryCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    javaRequiredHeaderCount: number;
    javaProductionAuthGapCount: number;
    miniKvRetentionBoundaryDeclared: boolean;
    miniKvRestartReplayCostDeclared: boolean;
    operatorIdentitySampleCount: number;
    auditRecoveredEventCount: number;
    auditRuntimeStoreKind: "memory" | "file";
  };
  upstreamEvidence: {
    javaOperatorAuthBoundary: JavaOperatorAuthBoundarySummary;
    miniKvRecoveryBoundary: MiniKvRecoveryBoundarySummary;
  };
  nodeEvidence: {
    accessGuardAuditContext: AccessGuardAuditContextSummary;
    operatorIdentityContract: OperatorIdentityContractSummary;
    fileAuditRestartEvidence: FileAuditRestartEvidenceSummary;
  };
  categories: ProductionReadinessV4Category[];
  productionBlockers: ProductionReadinessV4Message[];
  warnings: ProductionReadinessV4Message[];
  recommendations: ProductionReadinessV4Message[];
  evidenceEndpoints: {
    productionReadinessSummaryV4Json: string;
    productionReadinessSummaryV4Markdown: string;
    productionReadinessSummaryV3Json: string;
    accessGuardReadinessJson: string;
    operatorIdentityContractJson: string;
    fileAuditRestartEvidenceJson: string;
    javaReplayEvidenceIndex: string;
    miniKvRecoveryFixtureIndex: string;
  };
  nextActions: string[];
}

export interface JavaOperatorAuthBoundarySummary {
  source: EvidenceSource;
  evidenceVersion?: string;
  readOnly?: boolean;
  executionAllowed?: boolean;
  identitySource?: string;
  requiredHeaders: string[];
  anonymousAllowed?: boolean;
  javaAuthenticatesCredentials?: boolean;
  enforcementMode?: string;
  globalAllowedRoles: string[];
  actionCount: number;
  normalizationRules: string[];
  productionAuthGaps: string[];
  executionSafetyRules: string[];
  checks: {
    evidenceVersionMatches: boolean;
    readOnlyIndex: boolean;
    executionBlocked: boolean;
    identitySourceDeclared: boolean;
    requiredHeadersPresent: boolean;
    anonymousBlocked: boolean;
    credentialsNotAuthenticatedByJava: boolean;
    enforcementModeDeclared: boolean;
    globalRolesDeclared: boolean;
    productionAuthGapsDeclared: boolean;
    operatorSafetyRulesPresent: boolean;
  };
}

export interface MiniKvRecoveryBoundarySummary {
  source: EvidenceSource;
  indexVersion?: string;
  readOnly?: boolean;
  executionAllowed?: boolean;
  orderAuthoritative?: boolean;
  fixtureId?: string;
  evidenceVersion?: string;
  consumerHint?: string;
  restartReplayCost: {
    costModel?: string;
    snapshotLoads?: number;
    walRecordsReplayed?: number;
    expectedReplayComplexity?: string;
    measuredInFixtureOnly?: boolean;
  };
  retentionBoundary: {
    fixtureSampleOnly?: boolean;
    valuesRetainedInIndex?: boolean;
    productionRetentionPolicy?: string;
    backupOrRotationPolicy?: string;
    operatorActionRequired?: string;
  };
  boundaries: string[];
  checks: {
    indexVersionMatches: boolean;
    readOnlyIndex: boolean;
    executionBlocked: boolean;
    notOrderAuthoritative: boolean;
    recoveryFixturePresent: boolean;
    recoveryFixtureValid: boolean;
    restartReplayCostDeclared: boolean;
    retentionBoundaryDeclared: boolean;
    retentionPolicyNotDefined: boolean;
    valuesNotRetainedInIndex: boolean;
    consumerHintTargetsNodeV107: boolean;
  };
}

export interface AccessGuardAuditContextSummary {
  profileVersion: string;
  guardMode: "dry-run";
  rejectsRequests: false;
  readinessChecksPass: boolean;
  auditSample: {
    method: string;
    path: string;
    policyMatched: boolean;
    routeGroup: string;
    requiredRole?: string;
    matchedRoles: string[];
    wouldDeny: boolean;
    reason: string;
    operatorId?: string;
  };
  durableCoverageSource: "file-audit-restart-evidence";
  durableCoverageReady: boolean;
  productionBlockerCount: number;
}

export interface OperatorIdentityContractSummary {
  profileVersion: string;
  source: "headers";
  readyForProductionAuth: false;
  writesAuditContext: true;
  rejectsRequests: false;
  allowedRoleCount: number;
  sampleCount: number;
  rejectedSampleRoleCount: number;
  productionBlockerCount: number;
  checks: OperatorIdentityContractProfile["checks"];
}

export interface FileAuditRestartEvidenceSummary {
  evidenceVersion: "file-audit-restart-evidence.v1";
  runtimeStoreKind: "memory" | "file";
  durableAtRuntime: boolean;
  configuredByEnvironment: boolean;
  recoveredEventCount: number;
  recoveryVerified: boolean;
  digestStableAfterRestore: boolean;
  productionBlockerCount: number;
  checks: FileAuditRestartEvidenceReport["checks"];
}

export interface ProductionReadinessV4Category {
  id: ProductionReadinessV4CategoryId;
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

export interface ProductionReadinessV4Message {
  category: ProductionReadinessV4CategoryId;
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
  productionReadinessSummaryV4Json: "/api/v1/production/readiness-summary-v4",
  productionReadinessSummaryV4Markdown: "/api/v1/production/readiness-summary-v4?format=markdown",
  productionReadinessSummaryV3Json: "/api/v1/production/readiness-summary-v3",
  accessGuardReadinessJson: "/api/v1/security/access-guard-readiness",
  operatorIdentityContractJson: "/api/v1/security/operator-identity-contract",
  fileAuditRestartEvidenceJson: "/api/v1/audit/file-restart-evidence",
  javaReplayEvidenceIndex: "/api/v1/failed-events/replay-evidence-index",
  miniKvRecoveryFixtureIndex: "fixtures/recovery/index.json",
});

export async function loadProductionReadinessSummaryV4(config: AppConfig): Promise<ProductionReadinessSummaryV4> {
  const [previousSummary, javaReplayEvidenceIndex, miniKvRecoveryFixtureIndex] = await Promise.all([
    loadProductionReadinessSummaryV3(config),
    readJsonEvidence(config.javaReplayEvidenceIndexFixturePath, "java"),
    readJsonEvidence(config.miniKvRecoveryFixtureIndexPath, "mini-kv"),
  ]);
  const runtime = describeAuditStoreRuntime(config);

  return createProductionReadinessSummaryV4({
    config,
    previousSummary,
    javaReplayEvidenceIndex,
    miniKvRecoveryFixtureIndex,
    accessGuardReadinessProfile: createAccessGuardReadinessProfile(),
    accessGuardAuditSample: evaluateAccessGuard({
      method: "GET",
      path: "/api/v1/audit/events",
      headers: {
        "x-orderops-operator-id": "audit-v107",
        "x-orderops-roles": "auditor",
      },
    }),
    operatorIdentityContract: createOperatorIdentityContractProfile(),
    fileAuditRestartEvidence: createFileAuditRestartEvidenceReport({ config, runtime }),
  });
}

export function createProductionReadinessSummaryV4(input: {
  config: Pick<AppConfig, "upstreamActionsEnabled">;
  previousSummary: ProductionReadinessSummaryV3;
  javaReplayEvidenceIndex: EvidenceDocument;
  miniKvRecoveryFixtureIndex: EvidenceDocument;
  accessGuardReadinessProfile: AccessGuardReadinessProfile;
  accessGuardAuditSample: AccessGuardEvaluation;
  operatorIdentityContract: OperatorIdentityContractProfile;
  fileAuditRestartEvidence: FileAuditRestartEvidenceReport;
}): ProductionReadinessSummaryV4 {
  const javaOperatorAuthBoundary = summarizeJavaOperatorAuthBoundary(input.javaReplayEvidenceIndex);
  const miniKvRecoveryBoundary = summarizeMiniKvRecoveryBoundary(input.miniKvRecoveryFixtureIndex);
  const accessGuardAuditContext = summarizeAccessGuardAuditContext(
    input.accessGuardReadinessProfile,
    input.accessGuardAuditSample,
    input.fileAuditRestartEvidence,
  );
  const operatorIdentityContract = summarizeOperatorIdentityContract(input.operatorIdentityContract);
  const fileAuditRestartEvidence = summarizeFileAuditRestartEvidence(input.fileAuditRestartEvidence);
  const checks = {
    previousSummaryAvailable: input.previousSummary.summaryVersion === "production-readiness-summary.v3",
    javaOperatorAuthBoundaryReady: javaOperatorAuthBoundaryReady(javaOperatorAuthBoundary),
    miniKvRecoveryBoundaryReady: miniKvRecoveryBoundaryReady(miniKvRecoveryBoundary),
    accessGuardAuditContextReady: accessGuardAuditContext.readinessChecksPass
      && accessGuardAuditContext.auditSample.policyMatched
      && !accessGuardAuditContext.auditSample.wouldDeny,
    operatorIdentityCoverageReady: Object.values(operatorIdentityContract.checks).every(Boolean),
    fileAuditRestartEvidenceReady: fileAuditRestartEvidence.checks.fileRuntimeSelected
      && fileAuditRestartEvidence.checks.filePathConfigured
      && fileAuditRestartEvidence.checks.syntheticWriteRecorded
      && fileAuditRestartEvidence.checks.restoredEventPresent
      && fileAuditRestartEvidence.checks.digestStableAfterRestore,
    accessEvidenceDurableCoverage: accessGuardAuditContext.durableCoverageReady,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    executionStillBlocked: input.previousSummary.checks.executionStillBlocked
      && input.config.upstreamActionsEnabled === false,
    productionBlockersRemain: false,
  };
  const productionBlockers = collectProductionBlockers(input, checks, javaOperatorAuthBoundary, miniKvRecoveryBoundary);
  checks.productionBlockersRemain = productionBlockers.length > 0;
  const warnings = collectWarnings(input, javaOperatorAuthBoundary, miniKvRecoveryBoundary);
  const recommendations = collectRecommendations(input);
  const categories = createCategories(checks, productionBlockers, warnings, recommendations);

  return {
    service: "orderops-node",
    title: "Production readiness summary v4",
    generatedAt: new Date().toISOString(),
    summaryVersion: "production-readiness-summary.v4",
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
      javaRequiredHeaderCount: javaOperatorAuthBoundary.requiredHeaders.length,
      javaProductionAuthGapCount: javaOperatorAuthBoundary.productionAuthGaps.length,
      miniKvRetentionBoundaryDeclared: miniKvRecoveryBoundary.checks.retentionBoundaryDeclared,
      miniKvRestartReplayCostDeclared: miniKvRecoveryBoundary.checks.restartReplayCostDeclared,
      operatorIdentitySampleCount: operatorIdentityContract.sampleCount,
      auditRecoveredEventCount: fileAuditRestartEvidence.recoveredEventCount,
      auditRuntimeStoreKind: fileAuditRestartEvidence.runtimeStoreKind,
    },
    upstreamEvidence: {
      javaOperatorAuthBoundary,
      miniKvRecoveryBoundary,
    },
    nodeEvidence: {
      accessGuardAuditContext,
      operatorIdentityContract,
      fileAuditRestartEvidence,
    },
    categories,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(),
  };
}

export function renderProductionReadinessSummaryV4Markdown(summary: ProductionReadinessSummaryV4): string {
  return [
    "# Production readiness summary v4",
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
    "## Upstream Evidence",
    "",
    ...renderEntries(summary.upstreamEvidence.javaOperatorAuthBoundary, "javaOperatorAuthBoundary"),
    ...renderEntries(summary.upstreamEvidence.miniKvRecoveryBoundary, "miniKvRecoveryBoundary"),
    "",
    "## Node Evidence",
    "",
    ...renderEntries(summary.nodeEvidence.accessGuardAuditContext, "accessGuardAuditContext"),
    ...renderEntries(summary.nodeEvidence.operatorIdentityContract, "operatorIdentityContract"),
    ...renderEntries(summary.nodeEvidence.fileAuditRestartEvidence, "fileAuditRestartEvidence"),
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

function summarizeJavaOperatorAuthBoundary(document: EvidenceDocument): JavaOperatorAuthBoundarySummary {
  const data = asRecord(document.data);
  const boundary = readRecord(data, "operatorAuthBoundary");
  const requiredHeaders = readStringArray(boundary.requiredHeaders);
  const globalAllowedRoles = readStringArray(boundary.globalAllowedRoles);
  const allowedRolesByAction = readRecord(boundary, "allowedRolesByAction");
  const productionAuthGaps = readStringArray(boundary.productionAuthGaps);
  const executionSafetyRules = readStringArray(data.executionSafetyRules);
  const evidenceVersion = readString(data, "evidenceVersion");
  const checks = {
    evidenceVersionMatches: evidenceVersion === "failed-event-replay-evidence-index.v2",
    readOnlyIndex: readBoolean(data, "readOnly") === true,
    executionBlocked: readBoolean(data, "executionAllowed") === false,
    identitySourceDeclared: readString(boundary, "identitySource") === "HEADER_DERIVED_OPERATOR_CONTEXT",
    requiredHeadersPresent: ["X-Operator-Id", "X-Operator-Role"].every((header) => requiredHeaders.includes(header)),
    anonymousBlocked: readBoolean(boundary, "anonymousAllowed") === false,
    credentialsNotAuthenticatedByJava: readBoolean(boundary, "javaAuthenticatesCredentials") === false,
    enforcementModeDeclared: readString(boundary, "enforcementMode") === "ROLE_POLICY_PRECHECK_AND_SERVICE_GATE",
    globalRolesDeclared: globalAllowedRoles.length >= 3,
    productionAuthGapsDeclared: productionAuthGaps.length >= 3,
    operatorSafetyRulesPresent: [
      "OPERATOR_HEADERS_ARE_REQUIRED_BUT_NOT_CREDENTIAL_AUTHENTICATION",
      "UPSTREAM_MUST_PREVENT_X_OPERATOR_HEADER_SPOOFING",
    ].every((rule) => executionSafetyRules.includes(rule)),
  };

  return {
    source: document.source,
    evidenceVersion,
    readOnly: readBoolean(data, "readOnly"),
    executionAllowed: readBoolean(data, "executionAllowed"),
    identitySource: readString(boundary, "identitySource"),
    requiredHeaders,
    anonymousAllowed: readBoolean(boundary, "anonymousAllowed"),
    javaAuthenticatesCredentials: readBoolean(boundary, "javaAuthenticatesCredentials"),
    enforcementMode: readString(boundary, "enforcementMode"),
    globalAllowedRoles,
    actionCount: Object.keys(allowedRolesByAction).length,
    normalizationRules: readStringArray(boundary.normalizationRules),
    productionAuthGaps,
    executionSafetyRules,
    checks,
  };
}

function summarizeMiniKvRecoveryBoundary(document: EvidenceDocument): MiniKvRecoveryBoundarySummary {
  const data = asRecord(document.data);
  const fixtures = readRecordArray(data.fixtures);
  const recoveryFixture = fixtures.find((fixture) => readString(fixture, "id") === "restart-recovery-evidence") ?? {};
  const restartReplayCost = readRecord(recoveryFixture, "restart_replay_cost");
  const retentionBoundary = readRecord(recoveryFixture, "retention_boundary");
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
    restartReplayCostDeclared: readString(restartReplayCost, "cost_model") === "sample_record_count"
      && readBoolean(restartReplayCost, "measured_in_fixture_only") === true,
    retentionBoundaryDeclared: readBoolean(retentionBoundary, "fixture_sample_only") === true
      && readString(retentionBoundary, "operator_action_required") !== undefined,
    retentionPolicyNotDefined: readString(retentionBoundary, "production_retention_policy") === "not_defined",
    valuesNotRetainedInIndex: readBoolean(retentionBoundary, "values_retained_in_index") === false,
    consumerHintTargetsNodeV107: (readString(recoveryFixture, "consumer_hint") ?? "").includes("Node v107"),
  };

  return {
    source: document.source,
    indexVersion: readString(data, "index_version"),
    readOnly: readBoolean(data, "read_only"),
    executionAllowed: readBoolean(data, "execution_allowed"),
    orderAuthoritative: readBoolean(data, "order_authoritative"),
    fixtureId: readString(recoveryFixture, "id"),
    evidenceVersion: readString(recoveryFixture, "evidence_version"),
    consumerHint: readString(recoveryFixture, "consumer_hint"),
    restartReplayCost: {
      costModel: readString(restartReplayCost, "cost_model"),
      snapshotLoads: readNumber(restartReplayCost, "snapshot_loads"),
      walRecordsReplayed: readNumber(restartReplayCost, "wal_records_replayed"),
      expectedReplayComplexity: readString(restartReplayCost, "expected_replay_complexity"),
      measuredInFixtureOnly: readBoolean(restartReplayCost, "measured_in_fixture_only"),
    },
    retentionBoundary: {
      fixtureSampleOnly: readBoolean(retentionBoundary, "fixture_sample_only"),
      valuesRetainedInIndex: readBoolean(retentionBoundary, "values_retained_in_index"),
      productionRetentionPolicy: readString(retentionBoundary, "production_retention_policy"),
      backupOrRotationPolicy: readString(retentionBoundary, "backup_or_rotation_policy"),
      operatorActionRequired: readString(retentionBoundary, "operator_action_required"),
    },
    boundaries,
    checks,
  };
}

function summarizeAccessGuardAuditContext(
  profile: AccessGuardReadinessProfile,
  sample: AccessGuardEvaluation,
  fileAuditRestartEvidence: FileAuditRestartEvidenceReport,
): AccessGuardAuditContextSummary {
  return {
    profileVersion: profile.profileVersion,
    guardMode: profile.guard.mode,
    rejectsRequests: profile.guard.rejectsRequests,
    readinessChecksPass: Object.values(profile.checks).every(Boolean),
    auditSample: {
      method: "GET",
      path: "/api/v1/audit/events",
      policyMatched: sample.policyMatched,
      routeGroup: sample.routeGroup,
      requiredRole: sample.requiredRole,
      matchedRoles: sample.matchedRoles,
      wouldDeny: sample.wouldDeny,
      reason: sample.reason,
      operatorId: sample.requestIdentity.operatorId,
    },
    durableCoverageSource: "file-audit-restart-evidence",
    durableCoverageReady: fileAuditRestartEvidence.checks.fileRuntimeSelected
      && fileAuditRestartEvidence.checks.restoredEventPresent
      && fileAuditRestartEvidence.checks.digestStableAfterRestore,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function summarizeOperatorIdentityContract(profile: OperatorIdentityContractProfile): OperatorIdentityContractSummary {
  return {
    profileVersion: profile.profileVersion,
    source: profile.currentRuntime.source,
    readyForProductionAuth: profile.readyForProductionAuth,
    writesAuditContext: profile.currentRuntime.writesAuditContext,
    rejectsRequests: profile.currentRuntime.rejectsRequests,
    allowedRoleCount: profile.summary.allowedRoleCount,
    sampleCount: profile.summary.sampleCount,
    rejectedSampleRoleCount: profile.summary.rejectedSampleRoleCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
    checks: profile.checks,
  };
}

function summarizeFileAuditRestartEvidence(report: FileAuditRestartEvidenceReport): FileAuditRestartEvidenceSummary {
  return {
    evidenceVersion: report.evidenceVersion,
    runtimeStoreKind: report.runtime.runtimeStoreKind,
    durableAtRuntime: report.runtime.durableAtRuntime,
    configuredByEnvironment: report.runtime.configuredByEnvironment,
    recoveredEventCount: report.rehearsal.restoredEventCount,
    recoveryVerified: report.rehearsal.recoveryVerified,
    digestStableAfterRestore: report.rehearsal.digestAfterWrite === report.rehearsal.digestAfterRestore,
    productionBlockerCount: report.summary.productionBlockerCount,
    checks: report.checks,
  };
}

function collectProductionBlockers(
  input: {
    accessGuardReadinessProfile: AccessGuardReadinessProfile;
    operatorIdentityContract: OperatorIdentityContractProfile;
    fileAuditRestartEvidence: FileAuditRestartEvidenceReport;
  },
  checks: ProductionReadinessSummaryV4["checks"],
  javaOperatorAuthBoundary: JavaOperatorAuthBoundarySummary,
  miniKvRecoveryBoundary: MiniKvRecoveryBoundarySummary,
): ProductionReadinessV4Message[] {
  const blockers: ProductionReadinessV4Message[] = [];
  addCheckMessage(blockers, checks.previousSummaryAvailable, "PREVIOUS_SUMMARY_V3_UNAVAILABLE", "execution-safety", "production-readiness-summary-v3", "Production readiness summary v3 must remain loadable before v4 aggregation.");
  addCheckMessage(blockers, checks.javaOperatorAuthBoundaryReady, "JAVA_OPERATOR_AUTH_BOUNDARY_INVALID", "upstream-boundary-evidence", "java-replay-evidence-index", "Java v48 operator auth boundary must be present in failed-event replay evidence index v2.");
  addCheckMessage(blockers, checks.miniKvRecoveryBoundaryReady, "MINIKV_RECOVERY_BOUNDARY_INVALID", "upstream-boundary-evidence", "mini-kv-recovery-fixture-index", "mini-kv v57 recovery fixture index must expose restart cost and retention boundary evidence.");
  addCheckMessage(blockers, checks.accessGuardAuditContextReady, "ACCESS_GUARD_AUDIT_CONTEXT_INCOMPLETE", "access-control", "access-guard", "Access guard must produce a matched audit-route context sample without allowing real enforcement.");
  addCheckMessage(blockers, checks.operatorIdentityCoverageReady, "OPERATOR_IDENTITY_COVERAGE_INCOMPLETE", "access-control", "operator-identity-contract", "Operator identity parsing samples must cover anonymous, invalid, duplicate, and admin role cases.");
  addCheckMessage(blockers, checks.fileAuditRestartEvidenceReady, "FILE_AUDIT_RESTART_EVIDENCE_INCOMPLETE", "audit", "file-audit-restart-evidence", "File audit restart evidence must restore the synthetic access/operator audit event.");
  addCheckMessage(blockers, checks.accessEvidenceDurableCoverage, "ACCESS_EVIDENCE_NOT_DURABLE", "audit", "file-audit-restart-evidence", "Access guard and operator identity context must survive the file audit restart rehearsal.");
  addCheckMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "execution-safety", "node-config", "UPSTREAM_ACTIONS_ENABLED must stay false while production blockers remain.");
  addCheckMessage(blockers, checks.executionStillBlocked, "NODE_EXECUTION_NOT_BLOCKED", "execution-safety", "production-readiness-summary-v3", "Execution must remain blocked until authentication, authorization, and audit durability are production-ready.");

  blockers.push({
    category: "access-control",
    code: "JAVA_HEADER_AUTH_REHEARSAL_ONLY",
    severity: "blocker",
    source: "java-operator-auth-boundary",
    message: `Java declares ${javaOperatorAuthBoundary.productionAuthGaps.length} production auth gaps; Node must still treat header identity as rehearsal evidence.`,
  });
  blockers.push(...input.accessGuardReadinessProfile.productionBlockers.map((message) =>
    fromProfileMessage("access-control", "access-guard-readiness-profile", message)));
  blockers.push(...input.operatorIdentityContract.productionBlockers.map((message) =>
    fromProfileMessage("access-control", "operator-identity-contract", message)));
  blockers.push(...input.fileAuditRestartEvidence.productionBlockers.map((message) =>
    fromProfileMessage("audit", "file-audit-restart-evidence", message)));
  if (miniKvRecoveryBoundary.retentionBoundary.productionRetentionPolicy === "not_defined") {
    blockers.push({
      category: "audit",
      code: "MINIKV_RETENTION_POLICY_NOT_DEFINED",
      severity: "blocker",
      source: "mini-kv-recovery-fixture-index",
      message: "mini-kv recovery evidence explicitly marks retention policy as not defined, so it is not production storage evidence.",
    });
  }

  return dedupeMessages(blockers);
}

function collectWarnings(
  input: {
    operatorIdentityContract: OperatorIdentityContractProfile;
    fileAuditRestartEvidence: FileAuditRestartEvidenceReport;
  },
  javaOperatorAuthBoundary: JavaOperatorAuthBoundarySummary,
  miniKvRecoveryBoundary: MiniKvRecoveryBoundarySummary,
): ProductionReadinessV4Message[] {
  const warnings: ProductionReadinessV4Message[] = [
    ...input.operatorIdentityContract.warnings.map((message) =>
      fromProfileMessage("access-control", "operator-identity-contract", message)),
    ...input.fileAuditRestartEvidence.warnings.map((message) =>
      fromProfileMessage("audit", "file-audit-restart-evidence", message)),
  ];

  if (javaOperatorAuthBoundary.productionAuthGaps.length > 0) {
    warnings.push({
      category: "access-control",
      code: "JAVA_OPERATOR_AUTH_GAPS_DECLARED",
      severity: "warning",
      source: "java-operator-auth-boundary",
      message: "Java exposes replay operator role gates, but credential authentication is still outside Java.",
    });
  }
  if (miniKvRecoveryBoundary.retentionBoundary.fixtureSampleOnly === true) {
    warnings.push({
      category: "audit",
      code: "MINIKV_RECOVERY_SAMPLE_ONLY",
      severity: "warning",
      source: "mini-kv-recovery-fixture-index",
      message: "mini-kv restart recovery evidence is fixture-scale evidence and is not a retention or backup policy.",
    });
  }

  return dedupeMessages(warnings);
}

function collectRecommendations(input: {
  operatorIdentityContract: OperatorIdentityContractProfile;
  fileAuditRestartEvidence: FileAuditRestartEvidenceReport;
}): ProductionReadinessV4Message[] {
  return dedupeMessages([
    ...input.operatorIdentityContract.recommendations.map((message) =>
      fromProfileMessage("access-control", "operator-identity-contract", message)),
    ...input.fileAuditRestartEvidence.recommendations.map((message) =>
      fromProfileMessage("audit", "file-audit-restart-evidence", message)),
    {
      category: "upstream-boundary-evidence",
      code: "KEEP_UPSTREAM_BOUNDARIES_VERSIONED",
      severity: "recommendation",
      source: "production-readiness-summary-v4",
      message: "Keep Java operator auth and mini-kv recovery/retention boundary evidence versioned before live probe windows.",
    },
    {
      category: "execution-safety",
      code: "KEEP_ACTIONS_DISABLED_UNTIL_ENFORCEMENT",
      severity: "recommendation",
      source: "production-readiness-summary-v4",
      message: "Do not enable real upstream actions until auth middleware, RBAC enforcement, and managed audit storage are complete.",
    },
  ]);
}

function createCategories(
  checks: ProductionReadinessSummaryV4["checks"],
  blockers: ProductionReadinessV4Message[],
  warnings: ProductionReadinessV4Message[],
  recommendations: ProductionReadinessV4Message[],
): ProductionReadinessV4Category[] {
  return [
    {
      id: "upstream-boundary-evidence",
      title: "Upstream boundary evidence",
      ready: checks.javaOperatorAuthBoundaryReady && checks.miniKvRecoveryBoundaryReady,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "upstream-boundary-evidence"),
      warningCount: countMessages(warnings, "upstream-boundary-evidence"),
      recommendationCount: countMessages(recommendations, "upstream-boundary-evidence"),
      evidenceEndpoints: [
        ENDPOINTS.javaReplayEvidenceIndex,
        ENDPOINTS.miniKvRecoveryFixtureIndex,
      ],
      note: "Java v48 and mini-kv v57 evidence are accepted as read-only boundaries, not as permission to execute.",
    },
    {
      id: "access-control",
      title: "Access and operator identity",
      ready: false,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "access-control"),
      warningCount: countMessages(warnings, "access-control"),
      recommendationCount: countMessages(recommendations, "access-control"),
      evidenceEndpoints: [
        ENDPOINTS.accessGuardReadinessJson,
        ENDPOINTS.operatorIdentityContractJson,
      ],
      note: "Access guard and operator identity evidence are now connected, but real auth/RBAC enforcement is still missing.",
    },
    {
      id: "audit",
      title: "Durable audit evidence",
      ready: false,
      readOnly: true,
      executionAllowed: false,
      blockerCount: countMessages(blockers, "audit"),
      warningCount: countMessages(warnings, "audit"),
      recommendationCount: countMessages(recommendations, "audit"),
      evidenceEndpoints: [
        ENDPOINTS.fileAuditRestartEvidenceJson,
      ],
      note: "File restart evidence proves local recovery, while managed audit storage and retention remain production blockers.",
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
        ENDPOINTS.productionReadinessSummaryV4Json,
        ENDPOINTS.productionReadinessSummaryV3Json,
      ],
      note: "Node keeps real upstream execution disabled while production blockers remain.",
    },
  ];
}

function collectNextActions(): string[] {
  return [
    "Replace rehearsal headers with real auth middleware and RBAC enforcement.",
    "Promote file audit restart evidence into managed durable audit storage with retention, backup, and restore policy.",
    "Keep Java replay and mini-kv recovery evidence read-only until a dedicated production operation enablement version exists.",
  ];
}

function javaOperatorAuthBoundaryReady(summary: JavaOperatorAuthBoundarySummary): boolean {
  return summary.source.status === "available" && Object.values(summary.checks).every(Boolean);
}

function miniKvRecoveryBoundaryReady(summary: MiniKvRecoveryBoundarySummary): boolean {
  return summary.source.status === "available" && Object.values(summary.checks).every(Boolean);
}

function addCheckMessage(
  messages: ProductionReadinessV4Message[],
  condition: boolean,
  code: string,
  category: ProductionReadinessV4CategoryId,
  source: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ category, code, severity: "blocker", source, message });
  }
}

function fromProfileMessage(
  category: ProductionReadinessV4CategoryId,
  source: string,
  message: { code: string; severity: "blocker" | "warning" | "recommendation"; message: string },
): ProductionReadinessV4Message {
  return {
    category,
    source,
    code: message.code,
    severity: message.severity,
    message: message.message,
  };
}

function dedupeMessages(messages: ProductionReadinessV4Message[]): ProductionReadinessV4Message[] {
  const seen = new Set<string>();
  return messages.filter((message) => {
    const key = `${message.category}:${message.code}:${message.source}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function countMessages(messages: ProductionReadinessV4Message[], category: ProductionReadinessV4CategoryId): number {
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

function renderCategory(category: ProductionReadinessV4Category): string[] {
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

function renderMessages(messages: ProductionReadinessV4Message[], emptyText: string): string[] {
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
