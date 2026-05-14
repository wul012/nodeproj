import type { AppConfig } from "../config.js";
import {
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadProductionReleaseDryRunEnvelope,
} from "./productionReleaseDryRunEnvelope.js";
import type {
  ProductionReleaseDryRunEnvelopeProfile,
} from "./productionReleaseDryRunEnvelope.js";
import {
  JAVA_V62_RELEASE_HANDOFF_CHECKLIST,
  MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST,
} from "./releaseHandoffEvidenceReferences.js";
import {
  collectReleaseHandoffReviewBlockers,
  collectReleaseHandoffReviewRecommendations,
  collectReleaseHandoffReviewWarnings,
} from "./releaseHandoffReviewMessages.js";
import type {
  ReleaseHandoffReviewMessage,
  ReleaseHandoffReviewState,
} from "./releaseHandoffReviewMessages.js";

type ReviewState = ReleaseHandoffReviewState;
type ReviewActor = "operator" | "node" | "java" | "mini-kv";

interface HandoffReviewStep {
  order: number;
  phase: "collect" | "verify" | "compare" | "decide" | "closeout";
  actor: ReviewActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  dryRunOnly: true;
  mutatesState: false;
  executesRelease: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v175 release handoff readiness review"
    | "Node v174 production release dry-run envelope"
    | "Java v62 release handoff checklist fixture"
    | "mini-kv v71 restore handoff checklist"
    | "runtime safety";
}

export interface ReleaseHandoffReadinessReviewProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "release-handoff-readiness-review.v1";
  reviewState: ReviewState;
  readyForReleaseHandoffReadinessReview: boolean;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  review: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  handoffReviewSteps: HandoffReviewStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: ReleaseHandoffReviewMessage[];
  warnings: ReleaseHandoffReviewMessage[];
  recommendations: ReleaseHandoffReviewMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  releaseHandoffReadinessReviewJson: "/api/v1/production/release-handoff-readiness-review",
  releaseHandoffReadinessReviewMarkdown: "/api/v1/production/release-handoff-readiness-review?format=markdown",
  productionReleaseDryRunEnvelopeJson: "/api/v1/production/release-dry-run-envelope",
  javaReleaseHandoffChecklistFixture: "/contracts/release-handoff-checklist.fixture.json",
  miniKvRestoreHandoffChecklistFixture: "fixtures/release/restore-handoff-checklist.json",
  currentRoadmap: "docs/plans/v173-post-release-window-readiness-roadmap.md",
});

export function loadReleaseHandoffReadinessReview(config: AppConfig): ReleaseHandoffReadinessReviewProfile {
  const envelope = loadProductionReleaseDryRunEnvelope(config);
  const handoffReviewSteps = createHandoffReviewSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(config, envelope, handoffReviewSteps, forbiddenOperations, pauseConditions);
  const reviewDigest = digestReview({
    profileVersion: "release-handoff-readiness-review.v1",
    sourceEnvelopeDigest: envelope.envelope.envelopeDigest,
    javaVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.plannedVersion,
    javaFixtureVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureVersion,
    miniKvVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.plannedVersion,
    miniKvChecklistVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checklistVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      reviewDigestValid: undefined,
      readyForReleaseHandoffReadinessReview: undefined,
    },
  });
  checks.reviewDigestValid = isReleaseReportDigest(reviewDigest);
  completeAggregateReadyCheck(checks, "readyForReleaseHandoffReadinessReview");
  const reviewState: ReviewState = checks.readyForReleaseHandoffReadinessReview
    ? "ready-for-manual-release-handoff-review"
    : "blocked";
  const productionBlockers = collectReleaseHandoffReviewBlockers(checks);
  const warnings = collectReleaseHandoffReviewWarnings(reviewState);
  const recommendations = collectReleaseHandoffReviewRecommendations(reviewState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Release handoff readiness review",
    generatedAt: new Date().toISOString(),
    profileVersion: "release-handoff-readiness-review.v1",
    reviewState,
    readyForReleaseHandoffReadinessReview: checks.readyForReleaseHandoffReadinessReview,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    review: {
      reviewDigest,
      sourceEnvelopeDigest: envelope.envelope.envelopeDigest,
      sourceEnvelopeProfileVersion: envelope.profileVersion,
      sourceEnvelopeState: envelope.envelopeState,
      sourceReadyForProductionReleaseDryRunEnvelope: envelope.readyForProductionReleaseDryRunEnvelope,
      javaVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.plannedVersion,
      javaFixtureVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureVersion,
      miniKvVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.plannedVersion,
      miniKvChecklistVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checklistVersion,
      reviewMode: "manual-release-handoff-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      nodeMayTriggerRelease: false,
      nodeMayTriggerDeployment: false,
      nodeMayTriggerRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayReadSecretValues: false,
      nodeMayConnectProductionDatabase: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionOperationsAuthorized: false,
    },
    checks,
    artifacts: {
      sourceProductionReleaseDryRunEnvelope: summarizeEnvelope(envelope),
      javaReleaseHandoffChecklistFixture: summarizeJavaReleaseHandoffChecklist(),
      miniKvRestoreHandoffChecklistFixture: summarizeMiniKvRestoreHandoffChecklist(),
      noExecutionBoundary: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        releaseExecutionAllowed: false,
        deploymentExecutionAllowed: false,
        rollbackExecutionAllowed: false,
        restoreExecutionAllowed: false,
        sqlExecutionAllowed: false,
        secretValueReadAllowed: false,
        productionDatabaseConnectionAllowed: false,
      },
    },
    handoffReviewSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      handoffReviewStepCount: handoffReviewSteps.length,
      javaRequiredChecklistFieldCount: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames.length,
      miniKvChecklistFieldCount: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist.fields.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this review as manual release handoff evidence only; it is not production release approval.",
      "Keep Java deployment, Java rollback SQL, mini-kv restore, and all upstream writes outside Node.",
      "Proceed to Node v176 CI evidence hardening only after this review is archived and verified.",
    ],
  };
}

export function renderReleaseHandoffReadinessReviewMarkdown(
  profile: ReleaseHandoffReadinessReviewProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Release handoff readiness review",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Review state": profile.reviewState,
      "Ready for release handoff readiness review": profile.readyForReleaseHandoffReadinessReview,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Review", entries: profile.review },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Production Release Dry-run Envelope", entries: profile.artifacts.sourceProductionReleaseDryRunEnvelope },
      { heading: "Java Release Handoff Checklist Fixture", entries: profile.artifacts.javaReleaseHandoffChecklistFixture },
      { heading: "mini-kv Restore Handoff Checklist Fixture", entries: profile.artifacts.miniKvRestoreHandoffChecklistFixture },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Handoff Review Steps",
        items: profile.handoffReviewSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Dry run only", "dryRunOnly"],
            ["Mutates state", "mutatesState"],
            ["Executes release", "executesRelease"],
            ["Executes deployment", "executesDeployment"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
            ["Reads secret values", "readsSecretValues"],
            ["Connects production database", "connectsProductionDatabase"],
          ],
        }),
      },
      {
        heading: "Forbidden Operations",
        items: profile.forbiddenOperations,
        renderItem: renderReleaseForbiddenOperation,
      },
      {
        heading: "Pause Conditions",
        items: profile.pauseConditions,
        renderItem: (condition) => [`- ${condition}`],
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No release handoff readiness review blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No release handoff readiness review warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No release handoff readiness review recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  envelope: ProductionReleaseDryRunEnvelopeProfile,
  handoffReviewSteps: HandoffReviewStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
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
    handoffReviewStepsReadOnly: handoffReviewSteps.length === 6
      && handoffReviewSteps.every((step) => (
        step.readOnly
        && step.dryRunOnly
        && !step.mutatesState
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 10
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java deployment from Node v175")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v175"),
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

function createHandoffReviewSteps(): HandoffReviewStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      actor: "node",
      action: "Load Node v174 production release dry-run envelope.",
      evidenceTarget: "/api/v1/production/release-dry-run-envelope",
      expectedEvidence: "Envelope is ready for manual dry-run review and still blocks production operations.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 2,
      phase: "collect",
      actor: "java",
      action: "Reference Java v62 release handoff checklist fixture.",
      evidenceTarget: "/contracts/release-handoff-checklist.fixture.json",
      expectedEvidence: "Release operator, rollback approver, artifact target, migration direction, and secret-source confirmation placeholders are present.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 3,
      phase: "collect",
      actor: "mini-kv",
      action: "Reference mini-kv v71 restore handoff checklist fixture.",
      evidenceTarget: "fixtures/release/restore-handoff-checklist.json",
      expectedEvidence: "Restore operator, artifact digest target, Snapshot/WAL review placeholders, and CHECKJSON risk confirmation are present.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 4,
      phase: "compare",
      actor: "node",
      action: "Compare Node, Java, and mini-kv handoff evidence into one readiness review.",
      evidenceTarget: "release-handoff-readiness-review.v1",
      expectedEvidence: "All sources remain read-only and all real production operations remain forbidden.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 5,
      phase: "decide",
      actor: "operator",
      action: "Review placeholders outside Node before any real release window.",
      evidenceTarget: "manual release handoff review",
      expectedEvidence: "Operator replaces placeholders and pauses on unclear target, digest, migration, or approval ownership.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Render JSON and Markdown handoff readiness evidence for archive.",
      evidenceTarget: "/api/v1/production/release-handoff-readiness-review",
      expectedEvidence: "Review renders without unlocking release, deployment, rollback, restore, SQL, secret, or database actions.",
      readOnly: true,
      dryRunOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
  ];
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java deployment from Node v175",
      reason: "Java v62 provides a read-only handoff checklist fixture only.",
      blockedBy: "Java v62 release handoff checklist fixture",
    },
    {
      operation: "Trigger Java rollback from Node v175",
      reason: "Rollback approver evidence is a placeholder record and does not grant execution.",
      blockedBy: "Java v62 release handoff checklist fixture",
    },
    {
      operation: "Execute Java rollback SQL from Node v175",
      reason: "Migration direction remains no-database-change in the fixture.",
      blockedBy: "Java v62 release handoff checklist fixture",
    },
    {
      operation: "Execute mini-kv restore from Node v175",
      reason: "mini-kv v71 restore handoff checklist is manual review evidence only.",
      blockedBy: "mini-kv v71 restore handoff checklist",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "Risk commands are inspected through CHECKJSON and must not be run by Node.",
      blockedBy: "mini-kv v71 restore handoff checklist",
    },
    {
      operation: "Read production secret values",
      reason: "Java v62 records secret-source confirmation metadata only.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Connect production database",
      reason: "Release handoff review does not need production database connectivity.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Start Java or mini-kv automatically",
      reason: "Node v175 consumes archived evidence only.",
      blockedBy: "Node v175 release handoff readiness review",
    },
    {
      operation: "Authorize production release",
      reason: "This review is a handoff readiness packet, not a production release approval.",
      blockedBy: "Node v174 production release dry-run envelope",
    },
    {
      operation: "Open UPSTREAM_ACTIONS_ENABLED",
      reason: "The review is valid only with upstream actions disabled.",
      blockedBy: "runtime safety",
    },
  ];
}

function createPauseConditions(): string[] {
  return [
    "UPSTREAM_ACTIONS_ENABLED must remain false.",
    "Node must not start Java or mini-kv automatically.",
    "No production secret values may be read.",
    "No production database may be connected.",
    "No Java deployment, rollback, rollback SQL, or replay command may execute.",
    "No mini-kv LOAD, COMPACT, SETNXEX, or restore command may execute.",
    "mini-kv must remain outside the Java order authority chain.",
    "Unclear release operator, rollback approver, artifact target, digest, Snapshot/WAL review, migration direction, or secret-source confirmation pauses the workflow.",
  ];
}

function summarizeEnvelope(profile: ProductionReleaseDryRunEnvelopeProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    envelopeState: profile.envelopeState,
    envelopeDigest: profile.envelope.envelopeDigest,
    readyForProductionReleaseDryRunEnvelope: profile.readyForProductionReleaseDryRunEnvelope,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function summarizeJavaReleaseHandoffChecklist(): Record<string, object | string | boolean | number | unknown> {
  return {
    project: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.project,
    plannedVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.plannedVersion,
    fixtureVersion: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureVersion,
    scenario: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.scenario,
    fixtureEndpoint: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.fixtureEndpoint,
    archivePath: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.archivePath,
    readOnly: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.readOnly,
    executionAllowed: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.executionAllowed,
    releaseChecklist: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.releaseChecklist,
    databaseMigration: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.databaseMigration,
    secretSourceConfirmation: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.secretSourceConfirmation,
    requiredChecklistFields: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.requiredChecklistFieldNames,
    checklistArtifacts: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.checklistArtifacts,
    nodeConsumption: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.nodeConsumption,
    boundaries: JAVA_V62_RELEASE_HANDOFF_CHECKLIST.boundaries,
  };
}

function summarizeMiniKvRestoreHandoffChecklist(): Record<string, object | string | boolean | number | unknown> {
  return {
    project: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.project,
    plannedVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.plannedVersion,
    checklistVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checklistVersion,
    evidencePath: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.evidencePath,
    archivePath: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.archivePath,
    projectVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.projectVersion,
    releaseVersion: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.releaseVersion,
    readOnly: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.readOnly,
    executionAllowed: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.executionAllowed,
    restoreExecutionAllowed: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.restoreExecutionAllowed,
    orderAuthoritative: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.orderAuthoritative,
    handoffTarget: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffTarget,
    handoffChecklist: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.handoffChecklist,
    checkjsonRiskConfirmation: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.checkjsonRiskConfirmation,
    boundaries: MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST.boundaries,
  };
}

function digestReview(value: unknown): string {
  return digestReleaseReport(value);
}
