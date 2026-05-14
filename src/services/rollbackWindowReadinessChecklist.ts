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
  loadCrossProjectReleaseBundleGate,
} from "./crossProjectReleaseBundleGate.js";
import type {
  CrossProjectReleaseBundleGateProfile,
} from "./crossProjectReleaseBundleGate.js";

export interface RollbackWindowReadinessChecklistProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "rollback-window-readiness-checklist.v1";
  checklistState: "ready-for-manual-window-review" | "blocked";
  readyForRollbackWindowReadinessChecklist: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  checklist: {
    checklistDigest: string;
    previousBundleGateDigest: string;
    previousBundleGateVersion: CrossProjectReleaseBundleGateProfile["profileVersion"];
    javaVersion: JavaRollbackApprovalHandoffReference["plannedVersion"];
    javaHandoffVersion: JavaRollbackApprovalHandoffReference["handoffVersion"];
    miniKvVersion: MiniKvRestoreCompatibilityHandoffReference["plannedVersion"];
    miniKvHandoffVersion: MiniKvRestoreCompatibilityHandoffReference["handoffVersion"];
    nodeBaselineTag: "v165";
    windowMode: "manual-readiness-checklist-only";
    nodeMayRenderChecklist: true;
    nodeMayTriggerJavaRollback: false;
    nodeMayExecuteJavaRollbackSql: false;
    nodeMayModifyRuntimeConfig: false;
    nodeMayExecuteMiniKvRestore: false;
    nodeMayExecuteMiniKvAdminCommands: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionRollbackAuthorized: false;
  };
  checks: {
    previousBundleGateReady: boolean;
    previousGateDoesNotAuthorizeReleaseOrRollback: boolean;
    javaV57HandoffReady: boolean;
    javaHandoffVersionReady: boolean;
    javaRequiredConfirmationsComplete: boolean;
    javaNodeCannotTriggerRollback: boolean;
    javaCannotExecuteRollbackSql: boolean;
    javaCannotReadSecrets: boolean;
    javaBoundariesClosed: boolean;
    javaForbiddenOperationsComplete: boolean;
    javaArchiveRootUsesC: boolean;
    miniKvV66HandoffReady: boolean;
    miniKvHandoffVersionReady: boolean;
    miniKvManualConfirmationsComplete: boolean;
    miniKvRestoreSmokeReadOnly: boolean;
    miniKvDangerousCommandsExplainedOnly: boolean;
    miniKvWriteAdminRestoreNotExecuted: boolean;
    miniKvBoundariesClosed: boolean;
    miniKvArchiveRootUsesC: boolean;
    checklistStepsDryRunOnly: boolean;
    forbiddenOperationsCovered: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionRollbackStillFalse: boolean;
    readyForProductionOperationsStillFalse: boolean;
    readyForRollbackWindowReadinessChecklist: boolean;
  };
  artifacts: {
    previousReleaseBundleGate: {
      profileVersion: CrossProjectReleaseBundleGateProfile["profileVersion"];
      gateDigest: string;
      gateState: CrossProjectReleaseBundleGateProfile["gateState"];
      readyForCrossProjectReleaseBundleGate: boolean;
      readyForProductionRelease: false;
      readyForProductionRollback: false;
    };
    javaRollbackApprovalHandoff: JavaRollbackApprovalHandoffReference;
    miniKvRestoreCompatibilityHandoff: MiniKvRestoreCompatibilityHandoffReference;
    nodeChecklistEnvelope: {
      manualReadinessChecklistOnly: true;
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionRollbackAuthorized: false;
    };
  };
  checklistSteps: RollbackWindowChecklistStep[];
  forbiddenOperations: RollbackWindowForbiddenOperation[];
  summary: {
    checklistCheckCount: number;
    passedChecklistCheckCount: number;
    handoffCount: number;
    checklistStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: RollbackWindowMessage[];
  warnings: RollbackWindowMessage[];
  recommendations: RollbackWindowMessage[];
  evidenceEndpoints: {
    rollbackWindowReadinessChecklistJson: string;
    rollbackWindowReadinessChecklistMarkdown: string;
    crossProjectReleaseBundleGateJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaRollbackApprovalHandoffReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v57";
  evidenceTag: "v57订单平台rollback-approval-handoff-sample";
  handoffVersion: "java-rollback-approval-handoff.v1";
  scenario: "ROLLBACK_APPROVAL_HANDOFF_SAMPLE";
  handoffEndpoint: "/contracts/rollback-approval-handoff.sample.json";
  handoffSource: "src/main/resources/static/contracts/rollback-approval-handoff.sample.json";
  archivePath: "c/57";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/61-version-57-rollback-approval-handoff-sample.md";
  approvalMode: "OPERATOR_CONFIRMATION_REQUIRED";
  requiredConfirmationFields: [
    "artifact-version-target",
    "runtime-config-profile",
    "configuration-secret-source",
    "database-migration-direction",
    "release-bundle-manifest",
    "deployment-rollback-evidence",
  ];
  handoffArtifacts: [
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/release-verification-manifest.sample.json",
  ];
  nodeMayConsume: true;
  nodeMayRenderChecklist: true;
  nodeMayTriggerRollback: false;
  nodeMayExecuteRollbackSql: false;
  nodeMayModifyRuntimeConfig: false;
  nodeMayReadSecretValues: false;
  requiresUpstreamActionsEnabled: false;
  rollbackSqlExecutionAllowed: false;
  requiresProductionDatabase: false;
  requiresProductionSecrets: false;
  changesOrderCreateSemantics: false;
  changesPaymentOrInventoryTransaction: false;
  changesOutboxOrReplayExecution: false;
  changesOrderTransactionSemantics: false;
  connectsMiniKv: false;
  forbiddenOperations: [
    "Executing database rollback SQL from this handoff",
    "Reading production secret values from this handoff",
    "Triggering Java rollback from Node",
    "Modifying runtime configuration from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ];
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvRestoreCompatibilityHandoffReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v66";
  evidenceTag: "第六十六版恢复兼容交接样本";
  handoffVersion: "mini-kv-restore-compatibility-handoff.v1";
  manifestPath: "fixtures/release/restore-compatibility-handoff.json";
  archivePath: "c/66";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/122-version-66-restore-compatibility-handoff.md";
  projectVersion: "0.66.0";
  releaseVersion: "v66";
  manualConfirmationIds: [
    "binary-compatibility",
    "wal-compatibility",
    "snapshot-compatibility",
    "fixture-compatibility",
  ];
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/restore.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX restore:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET restore:token",
    "QUIT",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  restoreExecutionAllowed: false;
  noRuntimeCommandAdded: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  doesNotRunJavaOrNode: true;
  doesNotOpenUpstreamActions: true;
  restoreCompatibilityCannotCreateJavaOrderAuthority: true;
  productionRestoreApprovalRemainsOutsideFixture: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface RollbackWindowChecklistStep {
  order: number;
  phase: "prepare" | "confirm" | "compare" | "decide" | "closeout";
  source: "operator" | "node" | "java" | "mini-kv";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  executesRollback: false;
  executesRestore: false;
}

interface RollbackWindowForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v166 rollback window checklist"
    | "Java v57 rollback approval handoff"
    | "mini-kv v66 restore compatibility handoff"
    | "runtime safety";
}

interface RollbackWindowMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "rollback-window-readiness-checklist"
    | "cross-project-release-bundle-gate"
    | "java-v57-rollback-approval-handoff"
    | "mini-kv-v66-restore-compatibility-handoff"
    | "runtime-config";
  message: string;
}

const JAVA_V57_ROLLBACK_HANDOFF: JavaRollbackApprovalHandoffReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v57",
  evidenceTag: "v57订单平台rollback-approval-handoff-sample",
  handoffVersion: "java-rollback-approval-handoff.v1",
  scenario: "ROLLBACK_APPROVAL_HANDOFF_SAMPLE",
  handoffEndpoint: "/contracts/rollback-approval-handoff.sample.json",
  handoffSource: "src/main/resources/static/contracts/rollback-approval-handoff.sample.json",
  archivePath: "c/57",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/61-version-57-rollback-approval-handoff-sample.md",
  approvalMode: "OPERATOR_CONFIRMATION_REQUIRED",
  requiredConfirmationFields: [
    "artifact-version-target",
    "runtime-config-profile",
    "configuration-secret-source",
    "database-migration-direction",
    "release-bundle-manifest",
    "deployment-rollback-evidence",
  ] as JavaRollbackApprovalHandoffReference["requiredConfirmationFields"],
  handoffArtifacts: [
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/release-verification-manifest.sample.json",
  ] as JavaRollbackApprovalHandoffReference["handoffArtifacts"],
  nodeMayConsume: true,
  nodeMayRenderChecklist: true,
  nodeMayTriggerRollback: false,
  nodeMayExecuteRollbackSql: false,
  nodeMayModifyRuntimeConfig: false,
  nodeMayReadSecretValues: false,
  requiresUpstreamActionsEnabled: false,
  rollbackSqlExecutionAllowed: false,
  requiresProductionDatabase: false,
  requiresProductionSecrets: false,
  changesOrderCreateSemantics: false,
  changesPaymentOrInventoryTransaction: false,
  changesOutboxOrReplayExecution: false,
  changesOrderTransactionSemantics: false,
  connectsMiniKv: false,
  forbiddenOperations: [
    "Executing database rollback SQL from this handoff",
    "Reading production secret values from this handoff",
    "Triggering Java rollback from Node",
    "Modifying runtime configuration from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ] as JavaRollbackApprovalHandoffReference["forbiddenOperations"],
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V66_RESTORE_HANDOFF: MiniKvRestoreCompatibilityHandoffReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v66",
  evidenceTag: "第六十六版恢复兼容交接样本",
  handoffVersion: "mini-kv-restore-compatibility-handoff.v1",
  manifestPath: "fixtures/release/restore-compatibility-handoff.json",
  archivePath: "c/66",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/122-version-66-restore-compatibility-handoff.md",
  projectVersion: "0.66.0",
  releaseVersion: "v66",
  manualConfirmationIds: [
    "binary-compatibility",
    "wal-compatibility",
    "snapshot-compatibility",
    "fixture-compatibility",
  ] as MiniKvRestoreCompatibilityHandoffReference["manualConfirmationIds"],
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/restore.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX restore:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET restore:token",
    "QUIT",
  ] as MiniKvRestoreCompatibilityHandoffReference["readOnlySmokeCommands"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  restoreExecutionAllowed: false,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotOpenUpstreamActions: true,
  restoreCompatibilityCannotCreateJavaOrderAuthority: true,
  productionRestoreApprovalRemainsOutsideFixture: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  rollbackWindowReadinessChecklistJson: "/api/v1/production/rollback-window-readiness-checklist",
  rollbackWindowReadinessChecklistMarkdown: "/api/v1/production/rollback-window-readiness-checklist?format=markdown",
  crossProjectReleaseBundleGateJson: "/api/v1/production/cross-project-release-bundle-gate",
  currentRoadmap: "docs/plans/v163-post-rollback-readiness-roadmap.md",
});

export function loadRollbackWindowReadinessChecklist(config: AppConfig): RollbackWindowReadinessChecklistProfile {
  const previousGate = loadCrossProjectReleaseBundleGate(config);
  const checklistSteps = createChecklistSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousGate, checklistSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForRollbackWindowReadinessChecklist");
  const checklistState = checks.readyForRollbackWindowReadinessChecklist
    ? "ready-for-manual-window-review"
    : "blocked";
  const checklistDigest = digestChecklist({
    profileVersion: "rollback-window-readiness-checklist.v1",
    previousBundleGateDigest: previousGate.gate.gateDigest,
    javaVersion: JAVA_V57_ROLLBACK_HANDOFF.plannedVersion,
    javaHandoffVersion: JAVA_V57_ROLLBACK_HANDOFF.handoffVersion,
    miniKvVersion: MINI_KV_V66_RESTORE_HANDOFF.plannedVersion,
    miniKvHandoffVersion: MINI_KV_V66_RESTORE_HANDOFF.handoffVersion,
    windowMode: "manual-readiness-checklist-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checklistState);
  const recommendations = collectRecommendations(checklistState);

  return {
    service: "orderops-node",
    title: "Rollback window readiness checklist",
    generatedAt: new Date().toISOString(),
    profileVersion: "rollback-window-readiness-checklist.v1",
    checklistState,
    readyForRollbackWindowReadinessChecklist: checks.readyForRollbackWindowReadinessChecklist,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    checklist: {
      checklistDigest,
      previousBundleGateDigest: previousGate.gate.gateDigest,
      previousBundleGateVersion: previousGate.profileVersion,
      javaVersion: JAVA_V57_ROLLBACK_HANDOFF.plannedVersion,
      javaHandoffVersion: JAVA_V57_ROLLBACK_HANDOFF.handoffVersion,
      miniKvVersion: MINI_KV_V66_RESTORE_HANDOFF.plannedVersion,
      miniKvHandoffVersion: MINI_KV_V66_RESTORE_HANDOFF.handoffVersion,
      nodeBaselineTag: "v165",
      windowMode: "manual-readiness-checklist-only",
      nodeMayRenderChecklist: true,
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayModifyRuntimeConfig: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      previousReleaseBundleGate: {
        profileVersion: previousGate.profileVersion,
        gateDigest: previousGate.gate.gateDigest,
        gateState: previousGate.gateState,
        readyForCrossProjectReleaseBundleGate: previousGate.readyForCrossProjectReleaseBundleGate,
        readyForProductionRelease: previousGate.readyForProductionRelease,
        readyForProductionRollback: previousGate.readyForProductionRollback,
      },
      javaRollbackApprovalHandoff: { ...JAVA_V57_ROLLBACK_HANDOFF },
      miniKvRestoreCompatibilityHandoff: { ...MINI_KV_V66_RESTORE_HANDOFF },
      nodeChecklistEnvelope: {
        manualReadinessChecklistOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionRollbackAuthorized: false,
      },
    },
    checklistSteps,
    forbiddenOperations,
    summary: {
      checklistCheckCount: countReportChecks(checks),
      passedChecklistCheckCount: countPassedReportChecks(checks),
      handoffCount: 2,
      checklistStepCount: checklistSteps.length,
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
      "Close the v163-derived delivery-hardening plan after this checklist remains clean.",
      "Start a new post-v166 plan before adding real rollback execution, CI enforcement, or production secret/database integration.",
      "Keep Java rollback approval, mini-kv restore compatibility, and Node checklist review as manual evidence until production access is explicitly provided.",
    ],
  };
}

export function renderRollbackWindowReadinessChecklistMarkdown(
  profile: RollbackWindowReadinessChecklistProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Rollback window readiness checklist",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Checklist state": profile.checklistState,
      "Ready for rollback window readiness checklist": profile.readyForRollbackWindowReadinessChecklist,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Checklist", entries: profile.checklist },
      { heading: "Checks", entries: profile.checks },
      { heading: "Previous Release Bundle Gate", entries: profile.artifacts.previousReleaseBundleGate },
      { heading: "Java Rollback Approval Handoff", entries: profile.artifacts.javaRollbackApprovalHandoff },
      {
        heading: "mini-kv Restore Compatibility Handoff",
        entries: profile.artifacts.miniKvRestoreCompatibilityHandoff,
      },
      { heading: "Node Checklist Envelope", entries: profile.artifacts.nodeChecklistEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Checklist Steps", items: profile.checklistSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No rollback window readiness checklist blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No rollback window readiness checklist warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No rollback window readiness checklist recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecklistSteps(): RollbackWindowChecklistStep[] {
  return [
    {
      order: 1,
      phase: "prepare",
      source: "operator",
      action: "Confirm rollback window owner, artifact target, runtime profile, and secret source outside Node.",
      evidenceTarget: "Java v57 required confirmation fields",
      expectedEvidence: "artifact-version-target, runtime-config-profile, and configuration-secret-source are manually confirmed.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 2,
      phase: "confirm",
      source: "java",
      action: "Review Java rollback approval handoff and database migration direction.",
      evidenceTarget: "/contracts/rollback-approval-handoff.sample.json and c/57 archive",
      expectedEvidence: "rollback SQL is not executed and database migration direction requires operator confirmation.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 3,
      phase: "confirm",
      source: "mini-kv",
      action: "Review mini-kv restore compatibility handoff for binary, WAL, Snapshot, and fixture compatibility.",
      evidenceTarget: "fixtures/release/restore-compatibility-handoff.json and c/66 archive",
      expectedEvidence: "LOAD, COMPACT, and SETNXEX are explained through CHECKJSON/read-only smoke, not executed.",
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
      action: "Compare Java rollback approval fields with mini-kv restore compatibility boundaries.",
      evidenceTarget: "Node v166 checklist checks",
      expectedEvidence: "No evidence claims Node may trigger rollback, execute restore, read secrets, or create Java order authority.",
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
      action: "Pause if production secrets, production database access, restore target, or version compatibility are unclear.",
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
      action: "Archive this checklist and start a post-v166 plan before any real rollback execution work.",
      evidenceTarget: "c/166 archive and docs/plans next plan",
      expectedEvidence: "v166 closes this readiness stage without opening production rollback authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
      executesRestore: false,
    },
  ];
}

function createForbiddenOperations(): RollbackWindowForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java rollback from Node v166",
      reason: "Java v57 handoff allows Node to render checklist evidence only.",
      blockedBy: "Java v57 rollback approval handoff",
    },
    {
      operation: "Execute database rollback SQL",
      reason: "Java v57 marks database migration direction as operator-confirmed and rollback SQL execution as false.",
      blockedBy: "Java v57 rollback approval handoff",
    },
    {
      operation: "Read production secret values",
      reason: "Java v57 only confirms the secret source; it does not expose secret values to Node.",
      blockedBy: "Java v57 rollback approval handoff",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "mini-kv v66 uses CHECKJSON/read-only smoke to explain restore-sensitive commands.",
      blockedBy: "mini-kv v66 restore compatibility handoff",
    },
    {
      operation: "Execute mini-kv restore or admin commands",
      reason: "mini-kv v66 marks restore_execution_allowed=false and admin_commands_executed=false.",
      blockedBy: "mini-kv v66 restore compatibility handoff",
    },
    {
      operation: "Treat mini-kv restore as Java order authority",
      reason: "mini-kv restore compatibility cannot create Java order authoritative state.",
      blockedBy: "mini-kv v66 restore compatibility handoff",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production writes and rollback actions remain disabled during checklist review.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this checklist as production rollback approval",
      reason: "v166 is a manual readiness checklist and does not authorize production rollback.",
      blockedBy: "Node v166 rollback window checklist",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousGate: CrossProjectReleaseBundleGateProfile,
  checklistSteps: RollbackWindowChecklistStep[],
  forbiddenOperations: RollbackWindowForbiddenOperation[],
): RollbackWindowReadinessChecklistProfile["checks"] {
  return {
    previousBundleGateReady: previousGate.readyForCrossProjectReleaseBundleGate
      && previousGate.gateState === "ready-for-release-bundle-review",
    previousGateDoesNotAuthorizeReleaseOrRollback: previousGate.readyForProductionRelease === false
      && previousGate.readyForProductionRollback === false
      && !previousGate.executionAllowed,
    javaV57HandoffReady: JAVA_V57_ROLLBACK_HANDOFF.plannedVersion === "Java v57"
      && JAVA_V57_ROLLBACK_HANDOFF.evidenceTag === "v57订单平台rollback-approval-handoff-sample",
    javaHandoffVersionReady: JAVA_V57_ROLLBACK_HANDOFF.handoffVersion === "java-rollback-approval-handoff.v1"
      && JAVA_V57_ROLLBACK_HANDOFF.scenario === "ROLLBACK_APPROVAL_HANDOFF_SAMPLE",
    javaRequiredConfirmationsComplete: JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.length === 6
      && JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.includes("artifact-version-target")
      && JAVA_V57_ROLLBACK_HANDOFF.requiredConfirmationFields.includes("database-migration-direction"),
    javaNodeCannotTriggerRollback: JAVA_V57_ROLLBACK_HANDOFF.nodeMayConsume
      && JAVA_V57_ROLLBACK_HANDOFF.nodeMayRenderChecklist
      && !JAVA_V57_ROLLBACK_HANDOFF.nodeMayTriggerRollback
      && !JAVA_V57_ROLLBACK_HANDOFF.requiresUpstreamActionsEnabled,
    javaCannotExecuteRollbackSql: !JAVA_V57_ROLLBACK_HANDOFF.nodeMayExecuteRollbackSql
      && !JAVA_V57_ROLLBACK_HANDOFF.rollbackSqlExecutionAllowed,
    javaCannotReadSecrets: !JAVA_V57_ROLLBACK_HANDOFF.nodeMayReadSecretValues
      && !JAVA_V57_ROLLBACK_HANDOFF.nodeMayModifyRuntimeConfig,
    javaBoundariesClosed: !JAVA_V57_ROLLBACK_HANDOFF.requiresProductionDatabase
      && !JAVA_V57_ROLLBACK_HANDOFF.requiresProductionSecrets
      && !JAVA_V57_ROLLBACK_HANDOFF.changesOrderCreateSemantics
      && !JAVA_V57_ROLLBACK_HANDOFF.changesPaymentOrInventoryTransaction
      && !JAVA_V57_ROLLBACK_HANDOFF.changesOutboxOrReplayExecution
      && !JAVA_V57_ROLLBACK_HANDOFF.changesOrderTransactionSemantics
      && !JAVA_V57_ROLLBACK_HANDOFF.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V57_ROLLBACK_HANDOFF.forbiddenOperations.length === 6
      && JAVA_V57_ROLLBACK_HANDOFF.forbiddenOperations.includes("Executing database rollback SQL from this handoff")
      && JAVA_V57_ROLLBACK_HANDOFF.forbiddenOperations.includes("Triggering Java rollback from Node"),
    javaArchiveRootUsesC: JAVA_V57_ROLLBACK_HANDOFF.archivePath === "c/57",
    miniKvV66HandoffReady: MINI_KV_V66_RESTORE_HANDOFF.plannedVersion === "mini-kv v66"
      && MINI_KV_V66_RESTORE_HANDOFF.evidenceTag === "第六十六版恢复兼容交接样本",
    miniKvHandoffVersionReady:
      MINI_KV_V66_RESTORE_HANDOFF.handoffVersion === "mini-kv-restore-compatibility-handoff.v1"
      && MINI_KV_V66_RESTORE_HANDOFF.projectVersion === "0.66.0",
    miniKvManualConfirmationsComplete: MINI_KV_V66_RESTORE_HANDOFF.manualConfirmationIds.length === 4
      && MINI_KV_V66_RESTORE_HANDOFF.manualConfirmationIds.includes("binary-compatibility")
      && MINI_KV_V66_RESTORE_HANDOFF.manualConfirmationIds.includes("snapshot-compatibility"),
    miniKvRestoreSmokeReadOnly: MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.length === 8
      && MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("GET restore:token"),
    miniKvDangerousCommandsExplainedOnly:
      MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON LOAD data/restore.snap")
      && MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V66_RESTORE_HANDOFF.readOnlySmokeCommands.includes("CHECKJSON SETNXEX restore:token 30 value"),
    miniKvWriteAdminRestoreNotExecuted: !MINI_KV_V66_RESTORE_HANDOFF.writeCommandsExecuted
      && !MINI_KV_V66_RESTORE_HANDOFF.adminCommandsExecuted
      && !MINI_KV_V66_RESTORE_HANDOFF.restoreExecutionAllowed,
    miniKvBoundariesClosed: MINI_KV_V66_RESTORE_HANDOFF.noRuntimeCommandAdded
      && !MINI_KV_V66_RESTORE_HANDOFF.orderAuthoritative
      && !MINI_KV_V66_RESTORE_HANDOFF.connectedToJavaTransactionChain
      && MINI_KV_V66_RESTORE_HANDOFF.doesNotRunJavaOrNode
      && MINI_KV_V66_RESTORE_HANDOFF.doesNotOpenUpstreamActions
      && MINI_KV_V66_RESTORE_HANDOFF.restoreCompatibilityCannotCreateJavaOrderAuthority
      && MINI_KV_V66_RESTORE_HANDOFF.productionRestoreApprovalRemainsOutsideFixture,
    miniKvArchiveRootUsesC: MINI_KV_V66_RESTORE_HANDOFF.archivePath === "c/66",
    checklistStepsDryRunOnly: checklistSteps.length === 6
      && checklistSteps.every((step) => (
        step.dryRunOnly
        && step.readOnly
        && !step.mutatesState
        && !step.executesRollback
        && !step.executesRestore
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 8
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java rollback from Node v166")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore or admin commands"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    readyForRollbackWindowReadinessChecklist: false,
  };
}

function collectProductionBlockers(
  checks: RollbackWindowReadinessChecklistProfile["checks"],
): RollbackWindowMessage[] {
  const blockers: RollbackWindowMessage[] = [];
  addMessage(blockers, checks.previousBundleGateReady, "PREVIOUS_BUNDLE_GATE_NOT_READY", "cross-project-release-bundle-gate", "Node v165 release bundle gate must be ready before rollback window checklist.");
  addMessage(blockers, checks.previousGateDoesNotAuthorizeReleaseOrRollback, "PREVIOUS_GATE_AUTHORIZES_EXECUTION", "cross-project-release-bundle-gate", "Node v165 must not authorize release or rollback.");
  addMessage(blockers, checks.javaV57HandoffReady, "JAVA_V57_HANDOFF_NOT_READY", "java-v57-rollback-approval-handoff", "Java v57 rollback approval handoff must be present.");
  addMessage(blockers, checks.javaHandoffVersionReady, "JAVA_HANDOFF_VERSION_NOT_READY", "java-v57-rollback-approval-handoff", "Java rollback approval handoff version must match.");
  addMessage(blockers, checks.javaRequiredConfirmationsComplete, "JAVA_CONFIRMATIONS_INCOMPLETE", "java-v57-rollback-approval-handoff", "Java handoff must list all required operator confirmation fields.");
  addMessage(blockers, checks.javaNodeCannotTriggerRollback, "NODE_MAY_TRIGGER_JAVA_ROLLBACK", "java-v57-rollback-approval-handoff", "Java handoff must allow Node checklist rendering only.");
  addMessage(blockers, checks.javaCannotExecuteRollbackSql, "JAVA_ROLLBACK_SQL_EXECUTION_ALLOWED", "java-v57-rollback-approval-handoff", "Java handoff must not allow rollback SQL execution.");
  addMessage(blockers, checks.javaCannotReadSecrets, "JAVA_SECRET_OR_CONFIG_ACCESS_OPEN", "java-v57-rollback-approval-handoff", "Java handoff must not expose secrets or allow Node runtime config mutation.");
  addMessage(blockers, checks.javaBoundariesClosed, "JAVA_ROLLBACK_BOUNDARY_OPEN", "java-v57-rollback-approval-handoff", "Java handoff must not require production database/secrets or change transaction semantics.");
  addMessage(blockers, checks.javaForbiddenOperationsComplete, "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", "java-v57-rollback-approval-handoff", "Java handoff forbidden operations must be complete.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v57-rollback-approval-handoff", "Java v57 archive must use c/57.");
  addMessage(blockers, checks.miniKvV66HandoffReady, "MINI_KV_V66_HANDOFF_NOT_READY", "mini-kv-v66-restore-compatibility-handoff", "mini-kv v66 restore compatibility handoff must be present.");
  addMessage(blockers, checks.miniKvHandoffVersionReady, "MINI_KV_HANDOFF_VERSION_NOT_READY", "mini-kv-v66-restore-compatibility-handoff", "mini-kv restore compatibility handoff version must match.");
  addMessage(blockers, checks.miniKvManualConfirmationsComplete, "MINI_KV_CONFIRMATIONS_INCOMPLETE", "mini-kv-v66-restore-compatibility-handoff", "mini-kv handoff must list binary, WAL, snapshot, and fixture confirmations.");
  addMessage(blockers, checks.miniKvRestoreSmokeReadOnly, "MINI_KV_RESTORE_SMOKE_NOT_READY", "mini-kv-v66-restore-compatibility-handoff", "mini-kv restore smoke must remain read-only.");
  addMessage(blockers, checks.miniKvDangerousCommandsExplainedOnly, "MINI_KV_DANGEROUS_COMMAND_EXPLANATIONS_MISSING", "mini-kv-v66-restore-compatibility-handoff", "mini-kv handoff must explain LOAD, COMPACT, and SETNXEX through CHECKJSON only.");
  addMessage(blockers, checks.miniKvWriteAdminRestoreNotExecuted, "MINI_KV_WRITE_ADMIN_OR_RESTORE_EXECUTED", "mini-kv-v66-restore-compatibility-handoff", "mini-kv handoff must not execute write, admin, or restore commands.");
  addMessage(blockers, checks.miniKvBoundariesClosed, "MINI_KV_RESTORE_BOUNDARY_OPEN", "mini-kv-v66-restore-compatibility-handoff", "mini-kv handoff must not become order-authoritative or enter Java transaction chain.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v66-restore-compatibility-handoff", "mini-kv v66 archive must use c/66.");
  addMessage(blockers, checks.checklistStepsDryRunOnly, "CHECKLIST_STEPS_NOT_DRY_RUN", "rollback-window-readiness-checklist", "Checklist steps must remain read-only dry-run.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "rollback-window-readiness-checklist", "Forbidden rollback and restore operations must be explicit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "rollback-window-readiness-checklist", "Node v166 must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "rollback-window-readiness-checklist", "Node v166 must not authorize production rollback.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "rollback-window-readiness-checklist", "Node v166 must not authorize production operations.");
  return blockers;
}

function collectWarnings(
  checklistState: RollbackWindowReadinessChecklistProfile["checklistState"],
): RollbackWindowMessage[] {
  return [
    {
      code: checklistState === "blocked" ? "ROLLBACK_WINDOW_CHECKLIST_BLOCKED" : "ROLLBACK_WINDOW_CHECKLIST_READY",
      severity: "warning",
      source: "rollback-window-readiness-checklist",
      message: checklistState === "blocked"
        ? "Rollback window readiness checklist has blockers."
        : "Rollback window readiness checklist is ready for manual window review only.",
    },
    {
      code: "JAVA_ROLLBACK_REMAINS_OPERATOR_OWNED",
      severity: "warning",
      source: "java-v57-rollback-approval-handoff",
      message: "Java rollback approval requires human confirmation and rollback SQL remains outside Node execution.",
    },
    {
      code: "MINI_KV_RESTORE_IS_NOT_ORDER_AUTHORITY",
      severity: "warning",
      source: "mini-kv-v66-restore-compatibility-handoff",
      message: "mini-kv restore compatibility evidence cannot create Java order authoritative state.",
    },
  ];
}

function collectRecommendations(
  checklistState: RollbackWindowReadinessChecklistProfile["checklistState"],
): RollbackWindowMessage[] {
  return [
    {
      code: checklistState === "blocked"
        ? "FIX_ROLLBACK_WINDOW_CHECKLIST_BLOCKERS"
        : "START_POST_V166_PLAN",
      severity: "recommendation",
      source: "rollback-window-readiness-checklist",
      message: checklistState === "blocked"
        ? "Fix rollback window checklist blockers before closing this delivery-hardening stage."
        : "Start a new post-v166 plan before adding real rollback execution, CI enforcement, or production integrations.",
    },
  ];
}

function addMessage(
  messages: RollbackWindowMessage[],
  condition: boolean,
  code: string,
  source: RollbackWindowMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, condition, code, source, message);
}

function renderStep(step: RollbackWindowChecklistStep): string[] {
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

function renderForbiddenOperation(operation: RollbackWindowForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestChecklist(value: unknown): string {
  return digestReleaseReport(value);
}
