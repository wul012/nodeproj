import type { IncomingHttpHeaders } from "node:http";

import type { AppConfig } from "../config.js";
import { completeAggregateReadyCheck, digestReleaseReport, isReleaseReportDigest, summarizeReportChecks } from "./releaseReportShared.js";
import type {
  ApprovalDecisionPrerequisiteGateProfile,
  GateState,
} from "./approvalDecisionPrerequisiteGateTypes.js";
import {
  ENDPOINTS,
  JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE,
  MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST,
} from "./approvalDecisionPrerequisiteGateData.js";
import type { ProductionReleasePreApprovalPacketProfile } from "./productionReleasePreApprovalPacket.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createForbiddenOperations,
  createPauseConditions,
  createPrerequisiteSignals,
  createPrerequisiteSteps,
  createRemainingApprovalBlockers,
  hasJavaSignoffField,
  summarizePreApprovalPacket,
} from "./approvalDecisionPrerequisiteGateSupport.js";
import { loadProductionReleasePreApprovalPacket } from "./productionReleasePreApprovalPacket.js";

export function loadApprovalDecisionPrerequisiteGate(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ApprovalDecisionPrerequisiteGateProfile {
  const preApprovalPacket = loadProductionReleasePreApprovalPacket(config, headers);
  const prerequisiteSignals = createPrerequisiteSignals();
  const remainingApprovalBlockers = createRemainingApprovalBlockers();
  const prerequisiteSteps = createPrerequisiteSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    preApprovalPacket,
    prerequisiteSignals,
    remainingApprovalBlockers,
    prerequisiteSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const gateDigest = digestGate({
    profileVersion: "approval-decision-prerequisite-gate.v1",
    sourcePreApprovalPacketDigest: preApprovalPacket.packet.packetDigest,
    javaFixtureVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion,
    javaOperatorSignoffPlaceholder: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder,
    miniKvDigestVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion,
    miniKvRetentionId: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      gateDigestValid: undefined,
      readyForApprovalDecisionPrerequisiteGate: undefined,
    },
  });
  checks.gateDigestValid = isReleaseReportDigest(gateDigest);
  completeAggregateReadyCheck(checks, "readyForApprovalDecisionPrerequisiteGate");
  const gateState: GateState = checks.readyForApprovalDecisionPrerequisiteGate
    ? "ready-for-approval-decision-prerequisite-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Approval decision prerequisite gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "approval-decision-prerequisite-gate.v1",
    gateState,
    readyForApprovalDecisionPrerequisiteGate: checks.readyForApprovalDecisionPrerequisiteGate,
    readyForApprovalLedgerDryRunEnvelope: checks.readyForApprovalDecisionPrerequisiteGate,
    readyForApprovalDecision: false,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    prerequisiteReviewOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      sourcePreApprovalPacketDigest: preApprovalPacket.packet.packetDigest,
      sourcePreApprovalProfileVersion: preApprovalPacket.profileVersion,
      sourcePreApprovalPacketState: preApprovalPacket.packetState,
      sourcePreApprovalReady: preApprovalPacket.readyForProductionReleasePreApprovalPacket,
      javaVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.plannedVersion,
      javaFixtureVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion,
      javaReleaseOperator: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseOperator,
      javaRollbackApprover: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.rollbackApprover,
      javaReleaseWindow: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseWindow,
      javaOperatorSignoffPlaceholder: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder,
      miniKvVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.plannedVersion,
      miniKvDigestVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion,
      miniKvRetentionId: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId,
      miniKvRestoreArtifactDigestPlaceholder: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreArtifactDigestPlaceholder,
      miniKvRestoreTargetPlaceholder: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreTargetPlaceholder,
      prerequisiteMode: "approval-decision-prerequisite-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      approvalDecisionCreated: false,
      approvalLedgerWriteAllowed: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
    },
    checks,
    artifacts: {
      sourceProductionReleasePreApprovalPacket: summarizePreApprovalPacket(preApprovalPacket),
      javaReleaseOperatorSignoffFixture: { ...JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE },
      miniKvRetainedRestoreArtifactDigest: { ...MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST },
      noExecutionBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerRelease: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommand: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
        nodeMayConnectProductionIdp: false,
      },
    },
    prerequisiteSignals,
    remainingApprovalBlockers,
    prerequisiteSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      prerequisiteSignalCount: prerequisiteSignals.length,
      remainingApprovalBlockerCount: remainingApprovalBlockers.length,
      prerequisiteStepCount: prerequisiteSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      javaRequiredSignoffFieldCount: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.length,
      javaSignoffArtifactCount: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.length,
      miniKvRetainedDigestFieldCount: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.length,
      miniKvCheckJsonCommandCount: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.length,
      sourcePreApprovalCheckCount: preApprovalPacket.summary.checkCount,
      sourcePreApprovalPassedCheckCount: preApprovalPacket.summary.passedCheckCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this gate as proof that Java v64 and mini-kv v73 prerequisites are readable before the approval ledger dry-run envelope.",
      "Proceed to Node v181 only as an approval ledger dry-run envelope; do not create a real approval decision.",
      "Keep recommended parallel Java v65 + mini-kv v74 for later rollback/restore approval boundaries before Node v182.",
    ],
  };
}

function createChecks(
  config: AppConfig,
  preApprovalPacket: ProductionReleasePreApprovalPacketProfile,
  prerequisiteSignals: ApprovalDecisionPrerequisiteGateProfile["prerequisiteSignals"],
  remainingApprovalBlockers: ApprovalDecisionPrerequisiteGateProfile["remainingApprovalBlockers"],
  prerequisiteSteps: ApprovalDecisionPrerequisiteGateProfile["prerequisiteSteps"],
  forbiddenOperations: ApprovalDecisionPrerequisiteGateProfile["forbiddenOperations"],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    ...preApprovalChecks(preApprovalPacket),
    ...javaSignoffChecks(),
    ...javaBoundaryChecks(),
    ...miniKvDigestChecks(),
    ...miniKvBoundaryChecks(),
    ...prerequisiteChecks(prerequisiteSignals, remainingApprovalBlockers, prerequisiteSteps),
    ...localControlChecks(config, forbiddenOperations, pauseConditions),
  };
}

function preApprovalChecks(preApprovalPacket: ProductionReleasePreApprovalPacketProfile) {
  return {
    sourcePreApprovalPacketReady: preApprovalPacket.readyForProductionReleasePreApprovalPacket
      && preApprovalPacket.packetState === "ready-for-production-release-pre-approval-review",
    sourcePreApprovalPacketDigestValid: isReleaseReportDigest(preApprovalPacket.packet.packetDigest),
    sourcePreApprovalStillBlocksApprovalAndProduction: preApprovalPacket.readyForApprovalDecision === false
      && preApprovalPacket.readyForProductionRelease === false
      && preApprovalPacket.readyForProductionDeployment === false
      && preApprovalPacket.readyForProductionRollback === false
      && preApprovalPacket.readyForProductionRestore === false
      && preApprovalPacket.executionAllowed === false,
    sourcePreApprovalReferencesNodeV178: preApprovalPacket.packet.sourceRetentionGateProfileVersion === "cross-project-evidence-retention-gate.v1"
      && preApprovalPacket.packet.sourceRetentionGateState === "ready-for-cross-project-evidence-retention-review",
  };
}

function javaSignoffChecks() {
  return {
    javaV64SignoffFixtureReady: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.plannedVersion === "Java v64"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion === "java-release-operator-signoff-fixture.v1"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.scenario === "RELEASE_OPERATOR_SIGNOFF_FIXTURE_SAMPLE",
    javaSignoffRecordComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseOperator === "release-operator-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.rollbackApprover === "rollback-approver-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseWindow === "release-window-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.artifactTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder === "operator-signoff-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorMustReplacePlaceholders,
    javaRequiredSignoffFieldsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.length === 7
      && hasJavaSignoffField("release-operator")
      && hasJavaSignoffField("rollback-approver")
      && hasJavaSignoffField("release-window")
      && hasJavaSignoffField("artifact-target")
      && hasJavaSignoffField("operator-signoff-placeholder")
      && hasJavaSignoffField("no-secret-value-boundary"),
    javaSignoffArtifactsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.length === 6
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/release-audit-retention.fixture.json")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/release-bundle-manifest.sample.json")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/rollback-approval-handoff.sample.json"),
  };
}

function javaBoundaryChecks() {
  return {
    javaNodeConsumptionSafe: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayConsume
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayRenderApprovalPrerequisiteGate
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayCreateApprovalDecision
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayWriteApprovalLedger
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayTriggerDeployment
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayTriggerRollback
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayExecuteRollbackSql
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.requiresUpstreamActionsEnabled,
    javaProductionBoundariesClosed: !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.deploymentExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.rollbackExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.rollbackSqlExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.approvalDecisionCreated
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.approvalLedgerWriteAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.requiresProductionDatabase
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.requiresProductionSecrets
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.changesOrderTransactionSemantics
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Creating a real approval decision from this fixture")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Writing approval ledger entries from this fixture")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Triggering Java deployment from Node")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Reading production secret values from this fixture"),
  };
}

function miniKvDigestChecks() {
  return {
    miniKvV73DigestFixtureReady: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.plannedVersion === "mini-kv v73"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion === "mini-kv-retained-restore-artifact-digest.v1"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.projectVersion === "0.73.0",
    miniKvDigestTargetComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId === "mini-kv-retained-restore-artifact-digest-v73"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreTargetPlaceholder === "restore-target:<operator-recorded-restore-target>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreArtifactDigestPlaceholder === "sha256:<operator-retained-restore-artifact-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.snapshotReviewDigestPlaceholder === "sha256:<operator-retained-snapshot-review-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.walReviewDigestPlaceholder === "sha256:<operator-retained-wal-review-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionOwner === "operator:<retained-restore-artifact-owner>",
    miniKvRetainedDigestEvidenceComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.length === 7
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.includes("approval_prerequisite_ready_for_node_review")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.includes("order_authoritative")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.requiredConfirmations.length === 6,
  };
}

function miniKvBoundaryChecks() {
  return {
    miniKvCheckJsonDigestEvidenceReadOnly: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON LOAD data/retained-digest-restore.snap")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON COMPACT")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON SETNXEX restore:digest-token 30 value")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("GET restore:digest-token")
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.writeCommandsExecuted
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.adminCommandsExecuted
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.approvalPrerequisiteInput,
    miniKvBoundariesClosed: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.readOnly
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.executionAllowed
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.restoreExecutionAllowed
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.orderAuthoritative
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("not connected to Java transaction chain")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("mini-kv remains not Java order authority"),
    miniKvPauseConditionsComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs production secrets")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs mini-kv LOAD/COMPACT/SETNXEX execution")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs mini-kv in Java transaction consistency chain"),
  };
}

function prerequisiteChecks(
  prerequisiteSignals: ApprovalDecisionPrerequisiteGateProfile["prerequisiteSignals"],
  remainingApprovalBlockers: ApprovalDecisionPrerequisiteGateProfile["remainingApprovalBlockers"],
  prerequisiteSteps: ApprovalDecisionPrerequisiteGateProfile["prerequisiteSteps"],
) {
  return {
    prerequisiteSignalsComplete: prerequisiteSignals.length === 5
      && prerequisiteSignals.some((signal) => signal.id === "java-release-operator-signoff-present")
      && prerequisiteSignals.some((signal) => signal.id === "mini-kv-retained-artifact-digests-present")
      && prerequisiteSignals.some((signal) => signal.id === "mini-kv-order-authority-closed"),
    remainingApprovalBlockersExplicit: remainingApprovalBlockers.length === 4
      && remainingApprovalBlockers.every((blocker) => blocker.blocksRealApprovalDecision && !blocker.blocksDryRunEnvelope),
    prerequisiteStepsReadOnly: prerequisiteSteps.length === 6
      && prerequisiteSteps.every((step) => (
        step.readOnly
        && !step.createsApprovalDecision
        && !step.writesApprovalLedger
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
      )),
  };
}

function localControlChecks(
  config: AppConfig,
  forbiddenOperations: ApprovalDecisionPrerequisiteGateProfile["forbiddenOperations"],
  pauseConditions: string[],
) {
  return {
    forbiddenOperationsCovered: forbiddenOperations.length === 12
      && forbiddenOperations.some((operation) => operation.operation === "Create approval decision from Node v180")
      && forbiddenOperations.some((operation) => operation.operation === "Write approval ledger from Node v180")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v180"),
    pauseConditionsComplete: pauseConditions.length === 9
      && pauseConditions.includes("Need approval decision, release, deployment, rollback, or restore execution.")
      && pauseConditions.includes("Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noApprovalDecisionCreated: true,
    noApprovalLedgerWrite: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRestoreExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForApprovalDecisionStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    gateDigestValid: false,
    readyForApprovalDecisionPrerequisiteGate: false,
  };
}

function digestGate(value: unknown): string {
  return digestReleaseReport(value);
}
