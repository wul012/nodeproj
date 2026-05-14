import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
} from "./liveProbeReportUtils.js";
import {
  appendBlockingMessage,
  completeAggregateReadyCheck,
  digestReleaseReport,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
} from "./releaseReportShared.js";
import {
  loadRollbackWindowReadinessChecklist,
} from "./rollbackWindowReadinessChecklist.js";
import type {
  RollbackWindowReadinessChecklistProfile,
} from "./rollbackWindowReadinessChecklist.js";

type PreflightState = "ready-for-manual-preflight-review" | "blocked";
type PreflightSource = "node" | "operator" | "java" | "mini-kv";

interface PreflightMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "rollback-execution-preflight-contract"
    | "rollback-window-readiness-checklist"
    | "java-v58-rollback-sql-review-gate"
    | "mini-kv-v67-restore-dry-run-operator-package"
    | "runtime-config";
  message: string;
}

interface PreflightStep {
  order: number;
  phase: "collect" | "review" | "compare" | "decide" | "closeout";
  source: PreflightSource;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  executesRollback: false;
  executesRestore: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v167 rollback execution preflight contract"
    | "Java v58 rollback SQL review gate"
    | "mini-kv v67 restore dry-run operator package"
    | "runtime safety";
}

export interface RollbackExecutionPreflightContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "rollback-execution-preflight-contract.v1";
  contractState: PreflightState;
  readyForRollbackExecutionPreflightContract: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  contract: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  preflightSteps: PreflightStep[];
  forbiddenOperations: ForbiddenOperation[];
  summary: Record<string, number>;
  productionBlockers: PreflightMessage[];
  warnings: PreflightMessage[];
  recommendations: PreflightMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V58_SQL_REVIEW_GATE = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v58",
  evidenceTag: "v58订单平台rollback-sql-review-gate-sample",
  gateVersion: "java-rollback-sql-review-gate.v1",
  scenario: "ROLLBACK_SQL_REVIEW_GATE_SAMPLE",
  gateEndpoint: "/contracts/rollback-sql-review-gate.sample.json",
  gateSource: "src/main/resources/static/contracts/rollback-sql-review-gate.sample.json",
  archivePath: "c/58",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/62-version-58-rollback-sql-review-gate-sample.md",
  gateMode: "READ_ONLY_SQL_REVIEW_GATE",
  reviewOwner: "database-release-owner",
  requiredReviewFields: [
    "rollback-sql-review-owner",
    "migration-direction",
    "operator-approval-placeholder",
    "rollback-sql-artifact-reference",
    "production-database-access-boundary",
  ],
  migrationDirectionOptions: [
    "forward-only",
    "rollback-script-reviewed",
    "no-database-change",
  ],
  operatorApprovalPlaceholder: "operator-approval-required-before-any-sql-execution",
  handoffArtifacts: [
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
  ],
  nodeMayConsume: true,
  nodeMayRenderPreflight: true,
  nodeMayTriggerRollback: false,
  nodeMayExecuteRollbackSql: false,
  requiresUpstreamActionsEnabled: false,
  sqlExecutionAllowed: false,
  requiresProductionDatabase: false,
  requiresProductionSecrets: false,
  changesOrderCreateSemantics: false,
  changesPaymentOrInventoryTransaction: false,
  changesOutboxOrReplayExecution: false,
  changesOrderTransactionSemantics: false,
  connectsMiniKv: false,
  forbiddenOperations: [
    "Executing rollback SQL from this sample",
    "Connecting to a production database from this sample",
    "Embedding production SQL text with secret values",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ],
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V67_OPERATOR_PACKAGE = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v67",
  evidenceTag: "第六十七版恢复演练操作包",
  packageVersion: "mini-kv-restore-dry-run-operator-package.v1",
  packagePath: "fixtures/release/restore-dry-run-operator-package.json",
  archivePath: "c/67",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/123-version-67-restore-dry-run-operator-package.md",
  projectVersion: "0.67.0",
  releaseVersion: "v67",
  targetReleaseVersion: "v67",
  currentReleaseVersion: "v67",
  artifactDigestIds: [
    "binary-digest",
    "fixture-digest",
    "handoff-digest",
  ],
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ],
  compatibilityConfirmationIds: [
    "wal-compatibility",
    "snapshot-compatibility",
    "token-write-risk",
  ],
  dryRunCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/dry-run-restore.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX dryrun:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET dryrun:token",
    "QUIT",
  ],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  restoreExecutionAllowed: false,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotOpenUpstreamActions: true,
  restorePackageCannotCreateJavaOrderAuthority: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  rollbackExecutionPreflightContractJson: "/api/v1/production/rollback-execution-preflight-contract",
  rollbackExecutionPreflightContractMarkdown: "/api/v1/production/rollback-execution-preflight-contract?format=markdown",
  rollbackWindowReadinessChecklistJson: "/api/v1/production/rollback-window-readiness-checklist",
  currentRoadmap: "docs/plans/v166-post-rollback-window-roadmap.md",
});

export function loadRollbackExecutionPreflightContract(config: AppConfig): RollbackExecutionPreflightContractProfile {
  const previousChecklist = loadRollbackWindowReadinessChecklist(config);
  const preflightSteps = createPreflightSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousChecklist, preflightSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForRollbackExecutionPreflightContract");
  const contractState: PreflightState = checks.readyForRollbackExecutionPreflightContract
    ? "ready-for-manual-preflight-review"
    : "blocked";
  const contractDigest = digestContract({
    profileVersion: "rollback-execution-preflight-contract.v1",
    previousChecklistDigest: previousChecklist.checklist.checklistDigest,
    javaVersion: JAVA_V58_SQL_REVIEW_GATE.plannedVersion,
    javaGateVersion: JAVA_V58_SQL_REVIEW_GATE.gateVersion,
    miniKvVersion: MINI_KV_V67_OPERATOR_PACKAGE.plannedVersion,
    miniKvPackageVersion: MINI_KV_V67_OPERATOR_PACKAGE.packageVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(contractState);
  const recommendations = collectRecommendations(contractState);

  return {
    service: "orderops-node",
    title: "Rollback execution preflight contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "rollback-execution-preflight-contract.v1",
    contractState,
    readyForRollbackExecutionPreflightContract: checks.readyForRollbackExecutionPreflightContract,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    contract: {
      contractDigest,
      previousChecklistDigest: previousChecklist.checklist.checklistDigest,
      previousChecklistVersion: previousChecklist.profileVersion,
      javaVersion: JAVA_V58_SQL_REVIEW_GATE.plannedVersion,
      javaGateVersion: JAVA_V58_SQL_REVIEW_GATE.gateVersion,
      miniKvVersion: MINI_KV_V67_OPERATOR_PACKAGE.plannedVersion,
      miniKvPackageVersion: MINI_KV_V67_OPERATOR_PACKAGE.packageVersion,
      nodeBaselineTag: "v166",
      preflightMode: "manual-preflight-contract-only",
      nodeMayRenderPreflight: true,
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      previousRollbackWindowChecklist: {
        profileVersion: previousChecklist.profileVersion,
        checklistDigest: previousChecklist.checklist.checklistDigest,
        checklistState: previousChecklist.checklistState,
        readyForRollbackWindowReadinessChecklist:
          previousChecklist.readyForRollbackWindowReadinessChecklist,
        readyForProductionRollback: previousChecklist.readyForProductionRollback,
      },
      javaRollbackSqlReviewGate: { ...JAVA_V58_SQL_REVIEW_GATE },
      miniKvRestoreDryRunOperatorPackage: { ...MINI_KV_V67_OPERATOR_PACKAGE },
      nodePreflightEnvelope: {
        manualPreflightContractOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        productionRollbackAuthorized: false,
      },
    },
    preflightSteps,
    forbiddenOperations,
    summary: {
      preflightCheckCount: countReportChecks(checks),
      passedPreflightCheckCount: countPassedReportChecks(checks),
      preflightArtifactCount: 2,
      preflightStepCount: preflightSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to the recommended parallel Java v59 plus mini-kv v68 stage only after this preflight contract remains clean.",
      "Keep Node v167 as a manual preflight contract; do not make it execute SQL, restore commands, Java rollback, or mini-kv admin commands.",
      "Build Node v168 only after Java v59 and mini-kv v68 are both complete.",
    ],
  };
}

export function renderRollbackExecutionPreflightContractMarkdown(
  profile: RollbackExecutionPreflightContractProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Rollback execution preflight contract",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Contract state": profile.contractState,
      "Ready for rollback execution preflight contract": profile.readyForRollbackExecutionPreflightContract,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Contract", entries: profile.contract },
      { heading: "Checks", entries: profile.checks },
      { heading: "Previous Rollback Window Checklist", entries: profile.artifacts.previousRollbackWindowChecklist },
      { heading: "Java Rollback SQL Review Gate", entries: profile.artifacts.javaRollbackSqlReviewGate },
      {
        heading: "mini-kv Restore Dry-run Operator Package",
        entries: profile.artifacts.miniKvRestoreDryRunOperatorPackage,
      },
      { heading: "Node Preflight Envelope", entries: profile.artifacts.nodePreflightEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Preflight Steps", items: profile.preflightSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No rollback execution preflight contract blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No rollback execution preflight contract warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No rollback execution preflight contract recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createPreflightSteps(): PreflightStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "java",
      action: "Collect Java v58 rollback SQL review gate sample and c/58 evidence.",
      evidenceTarget: "/contracts/rollback-sql-review-gate.sample.json and c/58",
      expectedEvidence: "SQL review owner, migration direction, operator approval placeholder, and production database boundary are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 2,
      phase: "collect",
      source: "mini-kv",
      action: "Collect mini-kv v67 restore dry-run operator package and c/67 evidence.",
      evidenceTarget: "fixtures/release/restore-dry-run-operator-package.json and c/67",
      expectedEvidence: "Restore target, artifact digest placeholders, WAL/Snapshot compatibility, and CHECKJSON dry-run commands are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 3,
      phase: "review",
      source: "operator",
      action: "Review whether SQL artifact references and mini-kv digest placeholders have real operator records outside this sample.",
      evidenceTarget: "operator approval record and artifact digest record",
      expectedEvidence: "Production rollback remains blocked when approval or digest evidence is unclear.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 4,
      phase: "compare",
      source: "node",
      action: "Compare Java SQL review boundaries with mini-kv restore dry-run boundaries.",
      evidenceTarget: "Node v167 preflight checks",
      expectedEvidence: "No evidence claims Node may execute SQL, trigger rollback, execute restore, or create Java order authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 5,
      phase: "decide",
      source: "operator",
      action: "Pause if production database, production secret, artifact digest, or restore target evidence is unclear.",
      evidenceTarget: "production blockers and pause conditions",
      expectedEvidence: "Any uncertainty blocks real rollback instead of being automated by Node.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 6,
      phase: "closeout",
      source: "node",
      action: "Archive this preflight contract and wait for Java v59 plus mini-kv v68 before Node v168.",
      evidenceTarget: "c/167 archive and docs/plans/v166-post-rollback-window-roadmap.md",
      expectedEvidence: "v167 closes the rollback execution preflight contract without opening production rollback authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
  ];
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Execute rollback SQL from Node v167",
      reason: "Java v58 is a SQL review gate sample and sets SQL execution to false.",
      blockedBy: "Java v58 rollback SQL review gate",
    },
    {
      operation: "Connect to a production database",
      reason: "Java v58 records the production database boundary without connecting to production.",
      blockedBy: "Java v58 rollback SQL review gate",
    },
    {
      operation: "Trigger Java rollback from Node v167",
      reason: "Node may render preflight evidence only.",
      blockedBy: "Java v58 rollback SQL review gate",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "mini-kv v67 uses CHECKJSON dry-run commands and does not execute restore-sensitive operations.",
      blockedBy: "mini-kv v67 restore dry-run operator package",
    },
    {
      operation: "Execute mini-kv restore or admin commands",
      reason: "mini-kv v67 marks restore_execution_allowed=false and admin_commands_executed=false.",
      blockedBy: "mini-kv v67 restore dry-run operator package",
    },
    {
      operation: "Treat mini-kv restore package as Java order authority",
      reason: "mini-kv restore package cannot create Java order authoritative state.",
      blockedBy: "mini-kv v67 restore dry-run operator package",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production writes and rollback actions remain disabled during preflight review.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this preflight contract as production rollback approval",
      reason: "v167 is preflight evidence only and does not authorize production rollback.",
      blockedBy: "Node v167 rollback execution preflight contract",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousChecklist: RollbackWindowReadinessChecklistProfile,
  preflightSteps: PreflightStep[],
  forbiddenOperations: ForbiddenOperation[],
): Record<string, boolean> {
  return {
    previousChecklistReady: previousChecklist.readyForRollbackWindowReadinessChecklist
      && previousChecklist.checklistState === "ready-for-manual-window-review",
    previousChecklistDoesNotAuthorizeRollback: previousChecklist.readyForProductionRollback === false
      && !previousChecklist.executionAllowed,
    javaV58GateReady: JAVA_V58_SQL_REVIEW_GATE.plannedVersion === "Java v58"
      && JAVA_V58_SQL_REVIEW_GATE.evidenceTag === "v58订单平台rollback-sql-review-gate-sample",
    javaGateVersionReady: JAVA_V58_SQL_REVIEW_GATE.gateVersion === "java-rollback-sql-review-gate.v1"
      && JAVA_V58_SQL_REVIEW_GATE.scenario === "ROLLBACK_SQL_REVIEW_GATE_SAMPLE",
    javaReviewFieldsComplete: JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.length === 5
      && JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.includes("rollback-sql-review-owner")
      && JAVA_V58_SQL_REVIEW_GATE.requiredReviewFields.includes("production-database-access-boundary"),
    javaMigrationOptionsComplete: JAVA_V58_SQL_REVIEW_GATE.migrationDirectionOptions.length === 3
      && JAVA_V58_SQL_REVIEW_GATE.migrationDirectionOptions.includes("rollback-script-reviewed"),
    javaOperatorApprovalPlaceholderPresent:
      JAVA_V58_SQL_REVIEW_GATE.operatorApprovalPlaceholder === "operator-approval-required-before-any-sql-execution",
    javaNodeCannotExecuteRollback: JAVA_V58_SQL_REVIEW_GATE.nodeMayConsume
      && JAVA_V58_SQL_REVIEW_GATE.nodeMayRenderPreflight
      && !JAVA_V58_SQL_REVIEW_GATE.nodeMayTriggerRollback
      && !JAVA_V58_SQL_REVIEW_GATE.nodeMayExecuteRollbackSql
      && !JAVA_V58_SQL_REVIEW_GATE.requiresUpstreamActionsEnabled,
    javaSqlAndProductionDbClosed: !JAVA_V58_SQL_REVIEW_GATE.sqlExecutionAllowed
      && !JAVA_V58_SQL_REVIEW_GATE.requiresProductionDatabase,
    javaBoundariesClosed: !JAVA_V58_SQL_REVIEW_GATE.requiresProductionSecrets
      && !JAVA_V58_SQL_REVIEW_GATE.changesOrderCreateSemantics
      && !JAVA_V58_SQL_REVIEW_GATE.changesPaymentOrInventoryTransaction
      && !JAVA_V58_SQL_REVIEW_GATE.changesOutboxOrReplayExecution
      && !JAVA_V58_SQL_REVIEW_GATE.changesOrderTransactionSemantics
      && !JAVA_V58_SQL_REVIEW_GATE.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V58_SQL_REVIEW_GATE.forbiddenOperations.length === 6
      && JAVA_V58_SQL_REVIEW_GATE.forbiddenOperations.includes("Executing rollback SQL from this sample")
      && JAVA_V58_SQL_REVIEW_GATE.forbiddenOperations.includes("Triggering Java rollback from Node"),
    javaArchiveRootUsesC: JAVA_V58_SQL_REVIEW_GATE.archivePath === "c/58",
    miniKvV67PackageReady: MINI_KV_V67_OPERATOR_PACKAGE.plannedVersion === "mini-kv v67"
      && MINI_KV_V67_OPERATOR_PACKAGE.evidenceTag === "第六十七版恢复演练操作包",
    miniKvPackageVersionReady:
      MINI_KV_V67_OPERATOR_PACKAGE.packageVersion === "mini-kv-restore-dry-run-operator-package.v1"
      && MINI_KV_V67_OPERATOR_PACKAGE.projectVersion === "0.67.0",
    miniKvRestoreTargetReady: MINI_KV_V67_OPERATOR_PACKAGE.targetReleaseVersion === "v67"
      && MINI_KV_V67_OPERATOR_PACKAGE.currentReleaseVersion === "v67",
    miniKvArtifactDigestsComplete: MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.length === 3
      && MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.includes("binary-digest")
      && MINI_KV_V67_OPERATOR_PACKAGE.artifactDigestIds.includes("fixture-digest"),
    miniKvCompatibilityConfirmationsComplete:
      MINI_KV_V67_OPERATOR_PACKAGE.compatibilityConfirmationIds.length === 3
      && MINI_KV_V67_OPERATOR_PACKAGE.compatibilityConfirmationIds.includes("wal-compatibility")
      && MINI_KV_V67_OPERATOR_PACKAGE.compatibilityConfirmationIds.includes("snapshot-compatibility"),
    miniKvDryRunCommandsComplete: MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.length === 8
      && MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("GET dryrun:token"),
    miniKvDangerousCommandsExplainedOnly:
      MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON LOAD data/dry-run-restore.snap")
      && MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V67_OPERATOR_PACKAGE.dryRunCommands.includes("CHECKJSON SETNXEX dryrun:token 30 value"),
    miniKvExecutionBoundariesClosed: !MINI_KV_V67_OPERATOR_PACKAGE.writeCommandsExecuted
      && !MINI_KV_V67_OPERATOR_PACKAGE.adminCommandsExecuted
      && !MINI_KV_V67_OPERATOR_PACKAGE.restoreExecutionAllowed
      && MINI_KV_V67_OPERATOR_PACKAGE.noRuntimeCommandAdded,
    miniKvOrderAuthorityClosed: !MINI_KV_V67_OPERATOR_PACKAGE.orderAuthoritative
      && !MINI_KV_V67_OPERATOR_PACKAGE.connectedToJavaTransactionChain
      && MINI_KV_V67_OPERATOR_PACKAGE.doesNotRunJavaOrNode
      && MINI_KV_V67_OPERATOR_PACKAGE.doesNotOpenUpstreamActions
      && MINI_KV_V67_OPERATOR_PACKAGE.restorePackageCannotCreateJavaOrderAuthority,
    miniKvArchiveRootUsesC: MINI_KV_V67_OPERATOR_PACKAGE.archivePath === "c/67",
    preflightStepsDryRunOnly: preflightSteps.length === 6
      && preflightSteps.every((step) => (
        step.dryRunOnly
        && step.readOnly
        && !step.mutatesState
        && !step.executesRollback
        && !step.executesRestore
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 8
      && forbiddenOperations.some((operation) => operation.operation === "Execute rollback SQL from Node v167")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore or admin commands"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionRollbackStillFalse: true,
    readyForRollbackExecutionPreflightContract: false,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): PreflightMessage[] {
  const blockers: PreflightMessage[] = [];
  addMessage(blockers, checks.previousChecklistReady, "PREVIOUS_CHECKLIST_NOT_READY", "rollback-window-readiness-checklist", "Node v166 checklist must be ready before rollback execution preflight.");
  addMessage(blockers, checks.previousChecklistDoesNotAuthorizeRollback, "PREVIOUS_CHECKLIST_AUTHORIZES_ROLLBACK", "rollback-window-readiness-checklist", "Node v166 must not authorize rollback.");
  addMessage(blockers, checks.javaV58GateReady, "JAVA_V58_SQL_REVIEW_GATE_NOT_READY", "java-v58-rollback-sql-review-gate", "Java v58 rollback SQL review gate must be present.");
  addMessage(blockers, checks.javaGateVersionReady, "JAVA_SQL_REVIEW_GATE_VERSION_NOT_READY", "java-v58-rollback-sql-review-gate", "Java SQL review gate version must match.");
  addMessage(blockers, checks.javaReviewFieldsComplete, "JAVA_SQL_REVIEW_FIELDS_INCOMPLETE", "java-v58-rollback-sql-review-gate", "Java SQL review gate must list required review fields.");
  addMessage(blockers, checks.javaMigrationOptionsComplete, "JAVA_MIGRATION_OPTIONS_INCOMPLETE", "java-v58-rollback-sql-review-gate", "Java SQL review gate must list migration direction options.");
  addMessage(blockers, checks.javaOperatorApprovalPlaceholderPresent, "JAVA_OPERATOR_APPROVAL_PLACEHOLDER_MISSING", "java-v58-rollback-sql-review-gate", "Java SQL review gate must require operator approval before SQL execution.");
  addMessage(blockers, checks.javaNodeCannotExecuteRollback, "NODE_MAY_EXECUTE_JAVA_ROLLBACK", "java-v58-rollback-sql-review-gate", "Java SQL review gate must allow Node preflight rendering only.");
  addMessage(blockers, checks.javaSqlAndProductionDbClosed, "JAVA_SQL_OR_PROD_DB_OPEN", "java-v58-rollback-sql-review-gate", "Java SQL review gate must not execute SQL or connect to production database.");
  addMessage(blockers, checks.javaBoundariesClosed, "JAVA_ROLLBACK_BOUNDARY_OPEN", "java-v58-rollback-sql-review-gate", "Java SQL review gate must not require production secrets or change transaction semantics.");
  addMessage(blockers, checks.javaForbiddenOperationsComplete, "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", "java-v58-rollback-sql-review-gate", "Java SQL review gate forbidden operations must be complete.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v58-rollback-sql-review-gate", "Java v58 archive must use c/58.");
  addMessage(blockers, checks.miniKvV67PackageReady, "MINI_KV_V67_PACKAGE_NOT_READY", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv v67 restore dry-run operator package must be present.");
  addMessage(blockers, checks.miniKvPackageVersionReady, "MINI_KV_PACKAGE_VERSION_NOT_READY", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv operator package version must match.");
  addMessage(blockers, checks.miniKvRestoreTargetReady, "MINI_KV_RESTORE_TARGET_NOT_READY", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv restore target must be explicit.");
  addMessage(blockers, checks.miniKvArtifactDigestsComplete, "MINI_KV_ARTIFACT_DIGESTS_INCOMPLETE", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must list operator-recorded artifact digest placeholders.");
  addMessage(blockers, checks.miniKvCompatibilityConfirmationsComplete, "MINI_KV_COMPATIBILITY_CONFIRMATIONS_INCOMPLETE", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must list WAL and Snapshot compatibility confirmations.");
  addMessage(blockers, checks.miniKvDryRunCommandsComplete, "MINI_KV_DRY_RUN_COMMANDS_INCOMPLETE", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must list read-only dry-run commands.");
  addMessage(blockers, checks.miniKvDangerousCommandsExplainedOnly, "MINI_KV_DANGEROUS_COMMANDS_NOT_EXPLAINED", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must explain LOAD, COMPACT, and SETNXEX through CHECKJSON only.");
  addMessage(blockers, checks.miniKvExecutionBoundariesClosed, "MINI_KV_EXECUTION_BOUNDARY_OPEN", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must not execute write, admin, or restore commands.");
  addMessage(blockers, checks.miniKvOrderAuthorityClosed, "MINI_KV_ORDER_AUTHORITY_OPEN", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv package must not become Java order authority.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v67-restore-dry-run-operator-package", "mini-kv v67 archive must use c/67.");
  addMessage(blockers, checks.preflightStepsDryRunOnly, "PREFLIGHT_STEPS_NOT_DRY_RUN", "rollback-execution-preflight-contract", "Preflight steps must remain read-only dry-run.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "rollback-execution-preflight-contract", "Forbidden rollback and restore operations must be explicit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "rollback-execution-preflight-contract", "Node v167 must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "rollback-execution-preflight-contract", "Node v167 must not authorize production rollback.");
  return blockers;
}

function collectWarnings(contractState: PreflightState): PreflightMessage[] {
  return [
    {
      code: contractState === "blocked" ? "ROLLBACK_PREFLIGHT_BLOCKED" : "ROLLBACK_PREFLIGHT_READY",
      severity: "warning",
      source: "rollback-execution-preflight-contract",
      message: contractState === "blocked"
        ? "Rollback execution preflight contract has blockers."
        : "Rollback execution preflight contract is ready for manual preflight review only.",
    },
    {
      code: "JAVA_SQL_REVIEW_IS_NOT_SQL_EXECUTION",
      severity: "warning",
      source: "java-v58-rollback-sql-review-gate",
      message: "Java SQL review evidence records review fields and approval placeholders, but SQL execution remains outside Node.",
    },
    {
      code: "MINI_KV_DRY_RUN_IS_NOT_RESTORE",
      severity: "warning",
      source: "mini-kv-v67-restore-dry-run-operator-package",
      message: "mini-kv restore dry-run package records digest and CHECKJSON evidence, but restore execution remains outside Node.",
    },
  ];
}

function collectRecommendations(contractState: PreflightState): PreflightMessage[] {
  return [
    {
      code: contractState === "blocked"
        ? "FIX_ROLLBACK_PREFLIGHT_BLOCKERS"
        : "PROCEED_TO_SECRET_AND_DIGEST_STAGE",
      severity: "recommendation",
      source: "rollback-execution-preflight-contract",
      message: contractState === "blocked"
        ? "Fix rollback execution preflight blockers before Java v59 or mini-kv v68."
        : "Proceed to recommended parallel Java v59 and mini-kv v68 secret/digest evidence stage.",
    },
  ];
}

function addMessage(
  messages: PreflightMessage[],
  condition: boolean | undefined,
  code: string,
  source: PreflightMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, Boolean(condition), code, source, message);
}

function renderStep(step: PreflightStep): string[] {
  return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
    identityLabel: "Source",
    identityKey: "source",
    booleanFields: [
      ["Dry run only", "dryRunOnly"],
      ["Read only", "readOnly"],
      ["Mutates state", "mutatesState"],
      ["Executes rollback", "executesRollback"],
      ["Executes restore", "executesRestore"],
    ],
  });
}

function renderForbiddenOperation(operation: ForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestContract(value: unknown): string {
  return digestReleaseReport(value);
}
