import type { AppConfig } from "../config.js";
import {
  JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE,
  MINI_KV_V72_RESTORE_EVIDENCE_RETENTION,
} from "../evidence/crossProjectEvidenceRetentionGateFixtures.js";
import type { CiOperatorIdentityEvidencePacketProfile } from "./ciOperatorIdentityEvidencePacket.js";
import {
  JAVA_V62_RELEASE_HANDOFF_CHECKLIST,
  MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST,
} from "./releaseHandoffEvidenceReferences.js";
import { isReleaseReportDigest } from "./releaseReportShared.js";
import type { ProductionReleaseDryRunEnvelopeProfile } from "./productionReleaseDryRunEnvelope.js";

interface ReadOnlyStep {
  readOnly: boolean;
  mutatesState: boolean;
  executesRelease: boolean;
  executesDeployment: boolean;
  executesRollback: boolean;
  executesRestore: boolean;
  readsSecretValues: boolean;
  connectsProductionDatabase?: boolean;
  dryRunOnly?: boolean;
  executionAllowed?: boolean;
}

interface NamedOperation {
  operation: string;
}

export function createReleaseHandoffChecks(
  config: AppConfig,
  envelope: ProductionReleaseDryRunEnvelopeProfile,
  handoffSteps: readonly ReadOnlyStep[],
  forbiddenOperations: readonly NamedOperation[],
  pauseConditions: readonly string[],
): Record<string, boolean> {
  return {
    ...releaseSourceChecks(envelope),
    ...javaHandoffFixtureChecks(),
    ...javaHandoffBoundaryChecks(),
    ...miniKvHandoffEvidenceChecks(),
    ...miniKvHandoffBoundaryChecks(),
    ...releaseLocalChecks(config, envelope, handoffSteps, forbiddenOperations, pauseConditions),
  };
}

function releaseSourceChecks(envelope: ProductionReleaseDryRunEnvelopeProfile) {
  return {
    sourceEnvelopeReady: envelope.readyForProductionReleaseDryRunEnvelope
      && envelope.envelopeState === "ready-for-manual-production-release-dry-run",
    sourceEnvelopeDigestValid: isReleaseReportDigest(envelope.envelope.envelopeDigest),
    sourceEnvelopeStillBlocksProduction: envelope.readyForProductionRelease === false
      && envelope.readyForProductionDeployment === false
      && envelope.readyForProductionRollback === false
      && envelope.readyForProductionOperations === false
      && envelope.executionAllowed === false,
    sourceEnvelopeReferencesV173: envelope.envelope.sourcePacketProfileVersion === "release-window-readiness-packet.v1",
  };
}

function javaHandoffFixtureChecks() {
  return {
    javaV62FixtureReady: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.plannedVersion === "Java v62"
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureVersion === "java-release-handoff-checklist-fixture.v1"
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.scenario === "RELEASE_HANDOFF_CHECKLIST_FIXTURE_SAMPLE",
    javaChecklistPlaceholdersPresent: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist.releaseOperator === "release-operator-placeholder"
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist.rollbackApprover === "rollback-approver-placeholder"
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist.artifactTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist.operatorMustReplacePlaceholders
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist.handoffStatus === "PENDING_OPERATOR_CONFIRMATION",
    javaRequiredFieldsComplete: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames.length === 8
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames.includes("release-operator")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames.includes("artifact-target")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames.includes("secret-source-confirmation"),
    javaChecklistArtifactsComplete: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.checklistArtifacts.includes("/contracts/release-bundle-manifest.sample.json")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.checklistArtifacts.includes("/contracts/production-deployment-runbook-contract.sample.json")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.checklistArtifacts.includes("/contracts/rollback-approval-record.fixture.json"),
    javaMigrationDirectionClosed: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.databaseMigration.selectedDirection === "no-database-change"
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.databaseMigration.rollbackSqlExecutionAllowed
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.databaseMigration.requiresProductionDatabase,
    javaSecretBoundaryClosed: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.secretSourceConfirmation.required
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.secretSourceConfirmation.secretValueRecorded
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.secretSourceConfirmation.nodeMayReadSecretValues
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.noSecretValueBoundaries.includes("Node may render the release handoff review only"),
  };
}

function javaHandoffBoundaryChecks() {
  return {
    javaNodeConsumptionReadOnly: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayConsume
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayRenderReleaseHandoffReview
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayTriggerDeployment
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayTriggerRollback
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayExecuteRollbackSql
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.nodeMayReadSecretValues
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption.requiresUpstreamActionsEnabled,
    javaProductionBoundariesClosed: !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.deploymentExecutionAllowed
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.rollbackExecutionAllowed
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.rollbackSqlExecutionAllowed
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.requiresProductionDatabase
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.requiresProductionSecrets
      && !JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.forbiddenOperations.includes("Executing Java deployment from this fixture")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.forbiddenOperations.includes("Triggering Java rollback from Node")
      && JAVA_V62_RELEASE_HANDOFF_CHECKLIST.forbiddenOperations.includes("POST /api/v1/orders"),
    javaArchiveRootUsesC: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.archivePath === "c/62",
  };
}

function miniKvHandoffEvidenceChecks() {
  return {
    miniKvV71ChecklistReady: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.plannedVersion === "mini-kv v71"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checklistVersion === "mini-kv-restore-handoff-checklist.v1"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.projectVersion === "0.71.0",
    miniKvTargetReleaseReady: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.targetReleaseVersion === "v71"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.currentReleaseVersion === "v71",
    miniKvPreviousEvidenceComplete: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.previousEvidence.includes("fixtures/release/restore-drill-evidence.json")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.previousEvidence.includes("fixtures/release/release-artifact-digest-package.json")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.previousEvidence.includes("fixtures/release/artifact-digest-compatibility-matrix.json"),
    miniKvDigestPlaceholdersPresent: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.artifactDigestTarget === "sha256:<operator-recorded-restore-artifact-digest>"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.snapshotReviewPlaceholder === "sha256:<operator-recorded-snapshot-review-digest>"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.walReviewPlaceholder === "sha256:<operator-recorded-wal-review-digest>"
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget.operatorConfirmationRequired,
    miniKvChecklistFieldsComplete: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.fields.length === 7
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.fields.includes("restore_operator_id")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.fields.includes("checkjson_risk_confirmed")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.fields.includes("handoff_ready_for_node_review"),
    miniKvRequiredConfirmationsComplete: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.requiredConfirmations.includes("restore operator assigned")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.requiredConfirmations.includes("no restore execution requested"),
  };
}

function miniKvHandoffBoundaryChecks() {
  return {
    miniKvCheckJsonRiskCommandsReady: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.commands.includes("CHECKJSON LOAD data/handoff-restore.snap")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.commands.includes("CHECKJSON COMPACT")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.commands.includes("CHECKJSON SETNXEX restore:handoff-token 30 value")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.commands.includes("GET restore:handoff-token"),
    miniKvNoWriteOrAdminExecuted: !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.writeCommandsExecuted
      && !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation.adminCommandsExecuted
      && !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.restoreExecutionAllowed,
    miniKvBoundariesClosed: !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.executionAllowed
      && !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.restoreExecutionAllowed
      && !MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.orderAuthoritative
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.boundaries.includes("not connected to Java transaction chain"),
    miniKvArchiveRootUsesC: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.archivePath === "c/71",
  };
}

function releaseLocalChecks(
  config: AppConfig,
  envelope: ProductionReleaseDryRunEnvelopeProfile,
  steps: readonly ReadOnlyStep[],
  operations: readonly NamedOperation[],
  pauseConditions: readonly string[],
) {
  return {
    handoffReviewStepsReadOnly: steps.length === 6
      && steps.every((step) => (
        step.readOnly
        && step.dryRunOnly === true
        && !step.mutatesState
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
      )),
    forbiddenOperationsCovered: operations.length === 10
      && operations.some((operation) => operation.operation === "Trigger Java deployment from Node v175")
      && operations.some((operation) => operation.operation === "Execute mini-kv restore from Node v175"),
    pauseConditionsComplete: pauseConditions.length === 8
      && pauseConditions.includes("UPSTREAM_ACTIONS_ENABLED must remain false.")
      && pauseConditions.includes("Node must not start Java or mini-kv automatically."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && envelope.envelope.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionDeploymentStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    reviewDigestValid: false,
    readyForReleaseHandoffReadinessReview: false,
  };
}

export function createRetentionGateChecks(
  config: AppConfig,
  identityPacket: CiOperatorIdentityEvidencePacketProfile,
  retentionSteps: readonly ReadOnlyStep[],
  forbiddenOperations: readonly NamedOperation[],
  pauseConditions: readonly string[],
): Record<string, boolean> {
  return {
    ...retentionSourceChecks(identityPacket),
    ...javaRetentionEvidenceChecks(),
    ...javaRetentionBoundaryChecks(),
    ...miniKvRetentionEvidenceChecks(),
    ...miniKvRetentionBoundaryChecks(),
    ...retentionLocalChecks(config, retentionSteps, forbiddenOperations, pauseConditions),
  };
}

function retentionSourceChecks(identityPacket: CiOperatorIdentityEvidencePacketProfile) {
  return {
    nodeV177IdentityEvidenceReady: identityPacket.readyForCiOperatorIdentityEvidencePacket
      && identityPacket.packetState === "ready-for-operator-identity-evidence",
    nodeV177IdentityDigestValid: isReleaseReportDigest(identityPacket.packet.packetDigest),
    nodeV177StillBlocksProduction: identityPacket.readyForProductionAuth === false
      && identityPacket.readyForProductionRelease === false
      && identityPacket.readyForProductionDeployment === false
      && identityPacket.readyForProductionRollback === false
      && identityPacket.executionAllowed === false,
  };
}

function javaRetentionEvidenceChecks() {
  return {
    javaV63RetentionFixtureReady: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.plannedVersion === "Java v63"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.fixtureVersion === "java-release-audit-retention-fixture.v1",
    javaRetentionRecordComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionId === "release-retention-record-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.releaseOperator === "release-operator-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.artifactTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionDays === 180
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.operatorMustReplacePlaceholders === true,
    javaAuditExportFieldsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.auditExportFields.length === 7
      && hasAuditField("retention-id")
      && hasAuditField("release-operator")
      && hasAuditField("artifact-target")
      && hasAuditField("retention-days")
      && hasAuditField("no-secret-value-boundary"),
    javaEvidenceEndpointsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/api/v1/ops/evidence")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/contracts/release-verification-manifest.sample.json")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/contracts/release-handoff-checklist.fixture.json"),
    javaRetainedArtifactsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retainedArtifacts.length === 5
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retainedArtifacts.includes("/contracts/production-secret-source-contract.sample.json"),
    javaNoSecretBoundaryClosed: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.noSecretValueBoundaries.length === 4
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayReadSecretValues === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.requiresProductionSecrets === false,
  };
}

function javaRetentionBoundaryChecks() {
  return {
    javaNodeConsumptionReadOnly: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayConsume === true
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayRenderRetentionGate === true
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayTriggerDeployment === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayTriggerRollback === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayExecuteRollbackSql === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayWriteAuditExport === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.requiresUpstreamActionsEnabled === false,
    javaProductionBoundariesClosed: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.auditExportReadOnly
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.deploymentExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.rollbackExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.rollbackSqlExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.requiresProductionDatabase === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.connectsMiniKv === false,
    javaForbiddenOperationsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Triggering Java deployment from Node")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Writing audit export files from Node through this fixture")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Reading production secret values from this fixture"),
  };
}

function miniKvRetentionEvidenceChecks() {
  return {
    miniKvV72RetentionFixtureReady: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.plannedVersion === "mini-kv v72"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionVersion === "mini-kv-restore-evidence-retention.v1"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.projectVersion === "0.72.0",
    miniKvRetentionTargetComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionId === "mini-kv-restore-retention-v72"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionDays === 90
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.artifactDigestPlaceholder === "sha256:<operator-retained-restore-artifact-digest>"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.snapshotReviewRetention === "sha256:<operator-retained-snapshot-review-digest>"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.walReviewRetention === "sha256:<operator-retained-wal-review-digest>",
    miniKvRetainedEvidenceComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.length === 8
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.includes("checkjson_risk_evidence_retained_at")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.includes("retention_gate_ready_for_node_review")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.requiredConfirmations.length === 6,
  };
}

function miniKvRetentionBoundaryChecks() {
  return {
    miniKvCheckJsonRiskEvidenceRetained: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON LOAD data/retention-restore.snap")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON COMPACT")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON SETNXEX restore:retention-token 30 value")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("GET restore:retention-token")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.expected.includes("GET restore:retention-token returns (nil)"),
    miniKvWriteAndAdminCommandsNotExecuted: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.writeCommandsExecuted === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.adminCommandsExecuted === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.restoreExecutionAllowed === false,
    miniKvBoundariesClosed: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.readOnly
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.executionAllowed === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.restoreExecutionAllowed === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.orderAuthoritative === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("not connected to Java transaction chain")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("mini-kv remains not Java order authority"),
    miniKvPauseConditionsComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs production secrets")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs mini-kv LOAD/COMPACT/SETNXEX execution")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs mini-kv in Java transaction consistency chain"),
  };
}

function retentionLocalChecks(
  config: AppConfig,
  steps: readonly ReadOnlyStep[],
  operations: readonly NamedOperation[],
  pauseConditions: readonly string[],
) {
  return {
    retentionGateStepsReadOnly: steps.length === 6
      && steps.every((step) => (
        step.readOnly
        && !step.executionAllowed
        && !step.mutatesState
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
      )),
    forbiddenOperationsCovered: operations.length === 10
      && operations.some((operation) => operation.operation === "Trigger Java deployment from Node v178")
      && operations.some((operation) => operation.operation === "Execute mini-kv restore from Node v178"),
    pauseConditionsComplete: pauseConditions.length === 8
      && pauseConditions.includes("Need production secrets or secret values.")
      && pauseConditions.includes("Need Node to auto-start Java or mini-kv."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForProductionAuthStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    gateDigestValid: false,
    readyForCrossProjectEvidenceRetentionGate: false,
  };
}

function hasAuditField(name: string): boolean {
  return JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.auditExportFields.some((field) =>
    field.name === name && field.required);
}
