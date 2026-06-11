import type { AppConfig } from "../config.js";
import {
  collectBlockingMessages,
  isReleaseReportDigest,
} from "./releaseReportShared.js";
import type {
  DeploymentEvidenceIntakeGateProfile,
} from "./deploymentEvidenceIntakeGate.js";
import type {
  DeploymentEvidenceVerificationProfile,
} from "./deploymentEvidenceVerification.js";
import {
  JAVA_V61_ROLLBACK_APPROVAL_RECORD,
  MINI_KV_V70_RESTORE_DRILL_EVIDENCE,
} from "./releaseWindowReadinessPacketEvidence.js";
import type {
  ForbiddenOperation,
  PacketMessage,
  PacketState,
  ReleaseWindowStep,
} from "./releaseWindowReadinessPacketTypes.js";

export function createChecks(
  config: AppConfig,
  intakeGate: DeploymentEvidenceIntakeGateProfile,
  verification: DeploymentEvidenceVerificationProfile,
  releaseWindowSteps: ReleaseWindowStep[],
  forbiddenOperations: ForbiddenOperation[],
): Record<string, boolean> {
  return {
    deploymentEvidenceIntakeGateReady: intakeGate.readyForDeploymentEvidenceIntakeGate
      && intakeGate.gateState === "ready-for-manual-deployment-evidence-review",
    deploymentEvidenceVerificationReady: verification.readyForDeploymentEvidenceVerification
      && verification.verificationState === "ready-for-manual-deployment-evidence-verification",
    intakeDigestValid: isReleaseReportDigest(intakeGate.gate.intakeDigest),
    verificationDigestValid: isReleaseReportDigest(verification.verification.verificationDigest),
    previousVerificationStillBlocksProduction: verification.readyForProductionDeployment === false
      && verification.readyForProductionRollback === false
      && verification.readyForProductionOperations === false
      && verification.executionAllowed === false,
    javaV61ApprovalFixtureReady: JAVA_V61_ROLLBACK_APPROVAL_RECORD.plannedVersion === "Java v61"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.evidenceTag === "v61订单平台rollback-approval-record-fixture",
    javaFixtureVersionReady: JAVA_V61_ROLLBACK_APPROVAL_RECORD.fixtureVersion === "java-rollback-approval-record-fixture.v1",
    javaApprovalRecordPlaceholdersPresent: JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.reviewer === "rollback-reviewer-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.approvalTimestampPlaceholder === "approval-timestamp-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.rollbackTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.operatorMustReplacePlaceholders === true,
    javaRequiredFieldsComplete: JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.length === 6
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("reviewer")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("rollback-target")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("no-secret-value-boundary"),
    javaMigrationDirectionClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.selectedDirection === "no-database-change"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.rollbackSqlExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.requiresProductionDatabase === false,
    javaNoSecretBoundaryClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.noSecretValueBoundaries.length === 4
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayReadSecretValues === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.requiresProductionSecrets === false,
    javaNodeConsumptionReadOnly: JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayConsume === true
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayRenderReleaseWindowPacket === true
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayTriggerRollback === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayExecuteRollbackSql === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.requiresUpstreamActionsEnabled === false,
    javaProductionBoundariesClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.rollbackExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.rollbackSqlExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.requiresProductionDatabase === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.changesOrderTransactionSemantics === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.connectsMiniKv === false,
    javaForbiddenOperationsComplete: JAVA_V61_ROLLBACK_APPROVAL_RECORD.forbiddenOperations.includes("Triggering Java rollback from Node")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.forbiddenOperations.includes("Embedding secret values in approval record JSON"),
    javaArchiveRootUsesC: JAVA_V61_ROLLBACK_APPROVAL_RECORD.archivePath === "c/61",
    miniKvV70RestoreDrillReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.plannedVersion === "mini-kv v70"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.evidenceTag === "第七十版恢复演练证据",
    miniKvDrillVersionReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.drillVersion === "mini-kv-restore-drill-evidence.v1"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.projectVersion === "0.70.0",
    miniKvTargetReleaseReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.targetReleaseVersion === "v70"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.currentReleaseVersion === "v70",
    miniKvPreviousEvidenceComplete: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/release-artifact-digest-package.json")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/artifact-digest-compatibility-matrix.json")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/restore-dry-run-operator-package.json"),
    miniKvDigestPlaceholderPresent: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.digestComparisonPlaceholder === "sha256:<operator-recorded-restore-drill-digest>",
    miniKvCheckJsonCommandsReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON LOAD data/restore-drill.snap")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON SETNXEX restore:drill-token 30 value")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("GET restore:drill-token"),
    miniKvWriteAndAdminCommandsNotExecuted: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.writeCommandsExecuted === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.adminCommandsExecuted === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreExecutionAllowed === false,
    miniKvOperatorConfirmationComplete: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.required === true
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.fields.includes("restore_operator_id")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.fields.includes("boundary_reviewed"),
    miniKvBoundariesClosed: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.executionAllowed === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreExecutionAllowed === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.orderAuthoritative === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.noRuntimeCommandAdded === true
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.boundaries.includes("not connected to Java transaction chain"),
    miniKvArchiveRootUsesC: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.archivePath === "c/70",
    releaseWindowStepsDryRunOnly: releaseWindowSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    )),
    forbiddenOperationsCovered: forbiddenOperations.length === 9
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java rollback from Node v173")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v173"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && verification.verification.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    packetDigestValid: false,
    readyForReleaseWindowReadinessPacket: false,
  };
}

export function createReleaseWindowSteps(): ReleaseWindowStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      actor: "node",
      action: "Load Node v171 intake gate and Node v172 verification evidence.",
      evidenceTarget: "/api/v1/production/deployment-evidence-verification",
      expectedEvidence: "v171 intake digest and v172 verification digest are valid.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 2,
      phase: "collect",
      actor: "java",
      action: "Reference Java v61 rollback approval record fixture.",
      evidenceTarget: "/contracts/rollback-approval-record.fixture.json",
      expectedEvidence: "Reviewer, timestamp placeholder, rollback target, migration direction, and no-secret boundary are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 3,
      phase: "collect",
      actor: "mini-kv",
      action: "Reference mini-kv v70 restore drill evidence fixture.",
      evidenceTarget: "fixtures/release/restore-drill-evidence.json",
      expectedEvidence: "CHECKJSON restore drill, digest comparison placeholder, and operator confirmation fields are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 4,
      phase: "compare",
      actor: "node",
      action: "Compare all sources into a single manual release-window packet.",
      evidenceTarget: "release-window-readiness-packet.v1",
      expectedEvidence: "All sources remain read-only and no production operation is authorized.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 5,
      phase: "decide",
      actor: "operator",
      action: "Review packet outside Node before any real release window.",
      evidenceTarget: "manual release-window review",
      expectedEvidence: "Operator replaces placeholders outside this packet and pauses on unclear evidence.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Archive packet evidence and keep production flags closed.",
      evidenceTarget: "c/173",
      expectedEvidence: "JSON, Markdown, tests, screenshot, and walkthrough evidence are archived.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
  ];
}

export function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java rollback from Node v173",
      reason: "Java v61 only provides a read-only approval record fixture.",
      blockedBy: "Java v61 rollback approval record fixture",
    },
    {
      operation: "Execute Java rollback SQL from Node v173",
      reason: "SQL execution remains outside the release window packet.",
      blockedBy: "Java v61 rollback approval record fixture",
    },
    {
      operation: "Execute mini-kv restore from Node v173",
      reason: "mini-kv v70 restore drill evidence uses CHECKJSON only.",
      blockedBy: "mini-kv v70 restore drill evidence",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "Those commands are inspected as risk profiles and are not run by Node.",
      blockedBy: "mini-kv v70 restore drill evidence",
    },
    {
      operation: "Read production secret values",
      reason: "The release window packet records secret boundaries, not secret values.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Connect production database",
      reason: "No production database connection is required for packet rendering.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Start Java or mini-kv automatically",
      reason: "Node v173 consumes archived evidence only.",
      blockedBy: "Node v173 release window readiness packet",
    },
    {
      operation: "Authorize production release",
      reason: "The packet is manual review evidence, not a release approval.",
      blockedBy: "Node v173 release window readiness packet",
    },
    {
      operation: "Open UPSTREAM_ACTIONS_ENABLED",
      reason: "The packet is valid only with upstream actions disabled.",
      blockedBy: "runtime safety",
    },
  ];
}

export function collectProductionBlockers(checks: Record<string, boolean>): PacketMessage[] {
  return collectBlockingMessages<PacketMessage>([
    { condition: checks.deploymentEvidenceIntakeGateReady, code: "DEPLOYMENT_INTAKE_GATE_NOT_READY", source: "deployment-evidence-intake-gate", message: "Node v171 intake gate must be ready before release window packet generation." },
    { condition: checks.deploymentEvidenceVerificationReady, code: "DEPLOYMENT_VERIFICATION_NOT_READY", source: "deployment-evidence-verification", message: "Node v172 verification must be ready before release window packet generation." },
    { condition: checks.intakeDigestValid, code: "INTAKE_DIGEST_INVALID", source: "deployment-evidence-intake-gate", message: "v171 intake digest must be valid." },
    { condition: checks.verificationDigestValid, code: "VERIFICATION_DIGEST_INVALID", source: "deployment-evidence-verification", message: "v172 verification digest must be valid." },
    { condition: checks.previousVerificationStillBlocksProduction, code: "PREVIOUS_VERIFICATION_UNLOCKS_PRODUCTION", source: "deployment-evidence-verification", message: "v172 verification must still block production operations." },
    { condition: checks.javaV61ApprovalFixtureReady, code: "JAVA_V61_APPROVAL_FIXTURE_NOT_READY", source: "java-v61-rollback-approval-record-fixture", message: "Java v61 rollback approval record fixture must be present." },
    { condition: checks.javaFixtureVersionReady, code: "JAVA_APPROVAL_FIXTURE_VERSION_INVALID", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture version must match v61." },
    { condition: checks.javaApprovalRecordPlaceholdersPresent, code: "JAVA_APPROVAL_PLACEHOLDERS_MISSING", source: "java-v61-rollback-approval-record-fixture", message: "Java approval record placeholders must remain explicit." },
    { condition: checks.javaRequiredFieldsComplete, code: "JAVA_APPROVAL_FIELDS_INCOMPLETE", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must list required manual record fields." },
    { condition: checks.javaMigrationDirectionClosed, code: "JAVA_MIGRATION_DIRECTION_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java migration direction must not allow SQL execution or production database access." },
    { condition: checks.javaNoSecretBoundaryClosed, code: "JAVA_SECRET_BOUNDARY_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must not expose secret values." },
    { condition: checks.javaNodeConsumptionReadOnly, code: "JAVA_NODE_CONSUMPTION_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Node may render but must not trigger rollback or execute SQL." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must keep production boundaries closed." },
    { condition: checks.javaForbiddenOperationsComplete, code: "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", source: "java-v61-rollback-approval-record-fixture", message: "Java fixture must list rollback and secret forbidden operations." },
    { condition: checks.javaArchiveRootUsesC, code: "JAVA_ARCHIVE_NOT_IN_C", source: "java-v61-rollback-approval-record-fixture", message: "Java v61 archive path must use c/61." },
    { condition: checks.miniKvV70RestoreDrillReady, code: "MINI_KV_V70_RESTORE_DRILL_NOT_READY", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv v70 restore drill evidence must be present." },
    { condition: checks.miniKvDrillVersionReady, code: "MINI_KV_DRILL_VERSION_INVALID", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill evidence version must match v70." },
    { condition: checks.miniKvTargetReleaseReady, code: "MINI_KV_TARGET_RELEASE_INVALID", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill target must be v70." },
    { condition: checks.miniKvPreviousEvidenceComplete, code: "MINI_KV_PREVIOUS_EVIDENCE_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must reference prior release evidence." },
    { condition: checks.miniKvDigestPlaceholderPresent, code: "MINI_KV_DIGEST_PLACEHOLDER_MISSING", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must keep operator digest comparison as a placeholder." },
    { condition: checks.miniKvCheckJsonCommandsReady, code: "MINI_KV_CHECKJSON_COMMANDS_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must use CHECKJSON for risky commands." },
    { condition: checks.miniKvWriteAndAdminCommandsNotExecuted, code: "MINI_KV_WRITE_OR_ADMIN_EXECUTED", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must not execute writes, admin commands, or restore." },
    { condition: checks.miniKvOperatorConfirmationComplete, code: "MINI_KV_OPERATOR_CONFIRMATION_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must include operator confirmation fields." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill boundaries must remain closed." },
    { condition: checks.miniKvArchiveRootUsesC, code: "MINI_KV_ARCHIVE_NOT_IN_C", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv v70 archive path must use c/70." },
    { condition: checks.releaseWindowStepsDryRunOnly, code: "RELEASE_WINDOW_STEPS_MUTATE_STATE", source: "release-window-readiness-packet", message: "Release window steps must remain read-only dry-run steps." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "release-window-readiness-packet", message: "Packet must list key forbidden operations." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "release-window-readiness-packet", message: "Node v173 must not start Java or mini-kv." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_NOT_ALLOWED", source: "runtime-config", message: "Node v173 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_NOT_ALLOWED", source: "runtime-config", message: "Node v173 must not connect to production databases." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production release." },
    { condition: checks.readyForProductionRollbackStillFalse, code: "PRODUCTION_ROLLBACK_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production rollback." },
    { condition: checks.readyForProductionOperationsStillFalse, code: "PRODUCTION_OPERATIONS_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production operations." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "release-window-readiness-packet", message: "Packet digest must be a valid SHA-256 hex digest." },
  ]);
}

export function collectWarnings(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "RELEASE_WINDOW_PACKET_BLOCKED"
        : "RELEASE_WINDOW_PACKET_NOT_PRODUCTION_APPROVAL",
      severity: "warning",
      source: "release-window-readiness-packet",
      message: packetState === "blocked"
        ? "Release window readiness packet has blockers."
        : "Release window readiness packet is ready for manual review only.",
    },
    {
      code: "PLACEHOLDERS_REQUIRE_OPERATOR_REPLACEMENT",
      severity: "warning",
      source: "java-v61-rollback-approval-record-fixture",
      message: "Java approval reviewer, timestamp, and rollback target placeholders must be replaced outside Node before any real release window.",
    },
    {
      code: "RESTORE_DRILL_DIGEST_PLACEHOLDER_REQUIRES_REVIEW",
      severity: "warning",
      source: "mini-kv-v70-restore-drill-evidence",
      message: "mini-kv digest comparison placeholder must be reviewed outside Node before any restore window.",
    },
  ];
}

export function collectRecommendations(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_RELEASE_WINDOW_PACKET_BLOCKERS"
        : "MANUAL_RELEASE_WINDOW_REVIEW_ONLY",
      severity: "recommendation",
      source: "release-window-readiness-packet",
      message: packetState === "blocked"
        ? "Fix release window packet blockers before creating a new production-stage plan."
        : "Use v173 as a manual release-window review packet; do not treat it as release approval.",
    },
  ];
}
