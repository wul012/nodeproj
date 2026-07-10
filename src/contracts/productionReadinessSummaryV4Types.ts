import type { FileAuditRestartEvidenceReport } from "../services/fileAuditRestartEvidence.js";
import type { OperatorIdentityContractProfile } from "../services/operatorIdentityContract.js";

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

export interface EvidenceSource {
  project: "java" | "mini-kv";
  path: string;
  status: "available" | "missing" | "invalid";
  message: string;
}
