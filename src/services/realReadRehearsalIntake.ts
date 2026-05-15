import type { AppConfig } from "../config.js";
import {
  collectBlockingMessages,
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";

type IntakeState = "ready-for-real-read-rehearsal-review" | "blocked";
type IntakeActor = "node" | "operator" | "java" | "mini-kv" | "release-manager";

interface IntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "real-read-rehearsal-intake"
    | "java-v66-release-approval-rehearsal"
    | "mini-kv-v75-restore-boundary-smoke-manifest"
    | "runtime-config";
  message: string;
}

interface JavaV66ReleaseApprovalRehearsalReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v66";
  rehearsalVersion: "java-release-approval-rehearsal.v1";
  endpoint: "/api/v1/ops/release-approval-rehearsal";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  rehearsalMode: "READ_ONLY_RELEASE_APPROVAL_REHEARSAL";
  readOnly: true;
  executionAllowed: false;
  releaseApprovalInputs: {
    requiredEvidenceEndpointCount: number;
    includesOperatorSignoffFixture: true;
    includesRollbackApproverEvidenceFixture: true;
    includesRollbackApprovalRecordFixture: true;
    includesReleaseBundleManifest: true;
  };
  liveSignals: {
    pendingReplayApprovalsObserved: true;
    approvedReplayApprovalsObserved: true;
    rejectedReplayApprovalsObserved: true;
    replayBacklogObserved: true;
    pendingOutboxEventsObserved: true;
    realReplayAllowedByEvidence: false;
    approvalExecutionDryRun: true;
    evidenceExecutionAllowed: false;
  };
  executionBoundaries: {
    nodeMayConsume: true;
    nodeMayCreateApprovalDecision: false;
    nodeMayWriteApprovalLedger: false;
    nodeMayTriggerDeployment: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    changesOrderTransactionSemantics: false;
  };
  rehearsalBlockers: string[];
}

interface MiniKvV75RestoreBoundarySmokeManifestReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v75";
  smokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1";
  projectVersion: "0.75.0";
  releaseVersion: "v75";
  path: "fixtures/release/restore-boundary-smoke-manifest.json";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  javaTransactionChainConnected: false;
  smokeTarget: {
    smokeManifestId: "mini-kv-restore-boundary-smoke-v75";
    runtimeTarget: "minikv_server 6415 127.0.0.1";
    clientTarget: "minikv_client 127.0.0.1 6415 5000 --connect-retries 10 --retry-delay-ms 100";
    restoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>";
    artifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>";
  };
  realReadSmoke: {
    commandCount: number;
    includesInfoJson: true;
    includesStorageJson: true;
    includesHealth: true;
    includesGetTokenNoWriteProof: true;
    writeCommandsExecuted: false;
    adminCommandsExecuted: false;
    runtimeWriteObserved: false;
    realReadRehearsalInput: true;
  };
  evidenceFields: {
    requiredFieldCount: number;
    diagnosticCount: number;
    nodeConsumption: "Node v185 may consume this manifest after Java v66 and mini-kv v75 complete";
  };
  pauseConditionCount: number;
}

interface IntakeStep {
  order: number;
  phase: "collect" | "compare" | "normalize" | "digest" | "preserve" | "stop";
  actor: IntakeActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  startsJava: false;
  startsMiniKv: false;
  createsApprovalDecision: false;
  writesApprovalLedger: false;
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
    | "Node v185 real-read rehearsal intake"
    | "Java v66 release approval rehearsal"
    | "mini-kv v75 restore boundary smoke manifest"
    | "runtime safety";
}

export interface RealReadRehearsalIntakeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "real-read-rehearsal-intake.v1";
  intakeState: IntakeState;
  readyForRealReadRehearsalReview: boolean;
  readyForApprovalDecision: false;
  readyForApprovalLedgerWrite: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  rehearsalOnly: true;
  executionAllowed: false;
  intake: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  intakeSteps: IntakeStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: IntakeMessage[];
  warnings: IntakeMessage[];
  recommendations: IntakeMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V66_RELEASE_APPROVAL_REHEARSAL: JavaV66ReleaseApprovalRehearsalReference = {
  project: "advanced-order-platform",
  plannedVersion: "Java v66",
  rehearsalVersion: "java-release-approval-rehearsal.v1",
  endpoint: "/api/v1/ops/release-approval-rehearsal",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  rehearsalMode: "READ_ONLY_RELEASE_APPROVAL_REHEARSAL",
  readOnly: true,
  executionAllowed: false,
  releaseApprovalInputs: {
    requiredEvidenceEndpointCount: 4,
    includesOperatorSignoffFixture: true,
    includesRollbackApproverEvidenceFixture: true,
    includesRollbackApprovalRecordFixture: true,
    includesReleaseBundleManifest: true,
  },
  liveSignals: {
    pendingReplayApprovalsObserved: true,
    approvedReplayApprovalsObserved: true,
    rejectedReplayApprovalsObserved: true,
    replayBacklogObserved: true,
    pendingOutboxEventsObserved: true,
    realReplayAllowedByEvidence: false,
    approvalExecutionDryRun: true,
    evidenceExecutionAllowed: false,
  },
  executionBoundaries: {
    nodeMayConsume: true,
    nodeMayCreateApprovalDecision: false,
    nodeMayWriteApprovalLedger: false,
    nodeMayTriggerDeployment: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    changesOrderTransactionSemantics: false,
  },
  rehearsalBlockers: [
    "READ_ONLY_RELEASE_APPROVAL_REHEARSAL",
    "APPROVAL_DECISION_CREATION_DISABLED",
    "APPROVAL_LEDGER_WRITE_DISABLED",
    "DEPLOYMENT_EXECUTION_DISABLED",
    "ROLLBACK_EXECUTION_DISABLED",
    "ROLLBACK_SQL_EXECUTION_DISABLED",
  ],
};

const MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST: MiniKvV75RestoreBoundarySmokeManifestReference = {
  project: "mini-kv",
  plannedVersion: "mini-kv v75",
  smokeManifestVersion: "mini-kv-restore-boundary-smoke-manifest.v1",
  projectVersion: "0.75.0",
  releaseVersion: "v75",
  path: "fixtures/release/restore-boundary-smoke-manifest.json",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  javaTransactionChainConnected: false,
  smokeTarget: {
    smokeManifestId: "mini-kv-restore-boundary-smoke-v75",
    runtimeTarget: "minikv_server 6415 127.0.0.1",
    clientTarget: "minikv_client 127.0.0.1 6415 5000 --connect-retries 10 --retry-delay-ms 100",
    restoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>",
    artifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>",
  },
  realReadSmoke: {
    commandCount: 8,
    includesInfoJson: true,
    includesStorageJson: true,
    includesHealth: true,
    includesGetTokenNoWriteProof: true,
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    runtimeWriteObserved: false,
    realReadRehearsalInput: true,
  },
  evidenceFields: {
    requiredFieldCount: 11,
    diagnosticCount: 4,
    nodeConsumption: "Node v185 may consume this manifest after Java v66 and mini-kv v75 complete",
  },
  pauseConditionCount: 6,
};

const EVIDENCE_ENDPOINTS = {
  realReadRehearsalIntakeJson: "/api/v1/production/real-read-rehearsal-intake",
  realReadRehearsalIntakeMarkdown: "/api/v1/production/real-read-rehearsal-intake?format=markdown",
  javaReleaseApprovalRehearsal: "/api/v1/ops/release-approval-rehearsal",
  javaOpsEvidence: "/api/v1/ops/evidence",
  miniKvRestoreBoundarySmokeManifest: "fixtures/release/restore-boundary-smoke-manifest.json",
  miniKvVerificationManifest: "fixtures/release/verification-manifest.json",
};

export function loadRealReadRehearsalIntake(config: AppConfig): RealReadRehearsalIntakeProfile {
  const intakeSteps = createIntakeSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(config, intakeSteps, forbiddenOperations, pauseConditions);
  completeAggregateReadyCheck(checks, "readyForRealReadRehearsalReview");

  const intakeState: IntakeState = checks.readyForRealReadRehearsalReview
    ? "ready-for-real-read-rehearsal-review"
    : "blocked";
  const intakeDigestPayload = {
    profileVersion: "real-read-rehearsal-intake.v1",
    javaRehearsalVersion: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalVersion,
    javaEndpoint: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.endpoint,
    miniKvSmokeManifestVersion: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeManifestVersion,
    miniKvSmokeManifestId: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeTarget.smokeManifestId,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    upstreamProbesEnabled: config.upstreamProbesEnabled,
    checks,
  };
  const intakeDigest = digestReleaseReport(intakeDigestPayload);
  const productionBlockers = createProductionBlockers(checks);
  const warnings = createWarnings(config);
  const recommendations = createRecommendations();
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Real-read rehearsal intake",
    generatedAt: new Date().toISOString(),
    profileVersion: "real-read-rehearsal-intake.v1",
    intakeState,
    readyForRealReadRehearsalReview: checks.readyForRealReadRehearsalReview,
    readyForApprovalDecision: false,
    readyForApprovalLedgerWrite: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    rehearsalOnly: true,
    executionAllowed: false,
    intake: {
      intakeDigest,
      javaRehearsalVersion: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalVersion,
      javaEndpoint: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.endpoint,
      javaRehearsalMode: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalMode,
      miniKvSmokeManifestVersion: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeManifestVersion,
      miniKvProjectVersion: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.projectVersion,
      miniKvSmokeManifestId: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeTarget.smokeManifestId,
      miniKvRuntimeTarget: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeTarget.runtimeTarget,
      miniKvClientTarget: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeTarget.clientTarget,
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      approvalDecisionCreated: false,
      approvalLedgerWritten: false,
      releaseExecuted: false,
      rollbackExecuted: false,
      restoreExecuted: false,
    },
    checks,
    artifacts: {
      javaReleaseApprovalRehearsal: JAVA_V66_RELEASE_APPROVAL_REHEARSAL,
      miniKvRestoreBoundarySmokeManifest: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST,
      noExecutionBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
      },
    },
    intakeSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      intakeStepCount: intakeSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      javaRequiredEvidenceEndpointCount: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.releaseApprovalInputs.requiredEvidenceEndpointCount,
      javaRehearsalBlockerCount: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalBlockers.length,
      miniKvSmokeCommandCount: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.commandCount,
      miniKvRequiredEvidenceFieldCount: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.evidenceFields.requiredFieldCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: EVIDENCE_ENDPOINTS,
    nextActions: createNextActions(checks),
  };
}

export function renderRealReadRehearsalIntakeMarkdown(profile: RealReadRehearsalIntakeProfile): string {
  return renderReleaseReportMarkdown({
    title: "Real-read rehearsal intake",
    header: {
      service: profile.service,
      generatedAt: profile.generatedAt,
      profileVersion: profile.profileVersion,
      intakeState: profile.intakeState,
      readyForRealReadRehearsalReview: profile.readyForRealReadRehearsalReview,
      readOnly: profile.readOnly,
      rehearsalOnly: profile.rehearsalOnly,
      executionAllowed: profile.executionAllowed,
    },
    sections: [
      { heading: "Intake", entries: profile.intake },
      { heading: "Checks", entries: profile.checks },
      { heading: "Summary", entries: profile.summary },
      { heading: "Java v66 Release Approval Rehearsal", entries: profile.artifacts.javaReleaseApprovalRehearsal },
      { heading: "mini-kv v75 Restore Boundary Smoke Manifest", entries: profile.artifacts.miniKvRestoreBoundarySmokeManifest },
    ],
    itemSections: [
      {
        heading: "Intake Steps",
        items: profile.intakeSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Starts Java", "startsJava"],
            ["Starts mini-kv", "startsMiniKv"],
            ["Creates approval decision", "createsApprovalDecision"],
            ["Writes approval ledger", "writesApprovalLedger"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
          ],
        }),
      },
      {
        heading: "Forbidden Operations",
        items: profile.forbiddenOperations,
        renderItem: renderReleaseForbiddenOperation,
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No real-read rehearsal intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No real-read rehearsal intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No real-read rehearsal intake recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  intakeSteps: IntakeStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    javaV66ReleaseApprovalRehearsalReady: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.plannedVersion === "Java v66"
      && JAVA_V66_RELEASE_APPROVAL_REHEARSAL.rehearsalVersion === "java-release-approval-rehearsal.v1",
    javaRehearsalEndpointKnown: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.endpoint === "/api/v1/ops/release-approval-rehearsal",
    javaRehearsalReadOnly: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.readOnly,
    javaExecutionBlocked: !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionAllowed,
    javaLiveSignalsPresent: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.pendingReplayApprovalsObserved
      && JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.approvedReplayApprovalsObserved
      && JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.replayBacklogObserved
      && JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.pendingOutboxEventsObserved,
    javaRealReplayStillBlocked: !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.realReplayAllowedByEvidence
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.liveSignals.evidenceExecutionAllowed,
    javaNodeConsumptionSafe: JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayConsume
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayCreateApprovalDecision
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayWriteApprovalLedger,
    javaProductionBoundariesClosed: !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayTriggerDeployment
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayTriggerRollback
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.nodeMayExecuteRollbackSql
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.requiresProductionDatabase
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.requiresProductionSecrets
      && !JAVA_V66_RELEASE_APPROVAL_REHEARSAL.executionBoundaries.changesOrderTransactionSemantics,
    miniKvV75RestoreBoundarySmokeManifestReady: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.plannedVersion === "mini-kv v75"
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.smokeManifestVersion === "mini-kv-restore-boundary-smoke-manifest.v1",
    miniKvSmokeManifestVersionReady: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.projectVersion === "0.75.0"
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.releaseVersion === "v75",
    miniKvReadOnly: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.readOnly,
    miniKvExecutionBlocked: !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.executionAllowed
      && !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.restoreExecutionAllowed,
    miniKvNotOrderAuthoritative: !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.orderAuthoritative
      && !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.javaTransactionChainConnected,
    miniKvSmokeCommandsReadOnly: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.includesInfoJson
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.includesStorageJson
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.includesHealth
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.includesGetTokenNoWriteProof
      && !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.writeCommandsExecuted
      && !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.adminCommandsExecuted
      && !MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.runtimeWriteObserved,
    miniKvNodeConsumptionReady: MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.realReadSmoke.realReadRehearsalInput
      && MINI_KV_V75_RESTORE_BOUNDARY_SMOKE_MANIFEST.evidenceFields.nodeConsumption.includes("Node v185"),
    intakeStepsReadOnly: intakeSteps.every((step) => step.readOnly
      && !step.startsJava
      && !step.startsMiniKv
      && !step.createsApprovalDecision
      && !step.writesApprovalLedger
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase),
    forbiddenOperationsCovered: forbiddenOperations.length >= 10,
    pauseConditionsComplete: pauseConditions.length >= 8,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noApprovalDecisionCreated: true,
    noApprovalLedgerWrite: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRollbackSqlExecution: true,
    noRestoreExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    intakeDigestValid: true,
    readyForRealReadRehearsalReview: false,
  };
}

function createIntakeSteps(): IntakeStep[] {
  return [
    step(1, "collect", "node", "Read Java v66 release approval rehearsal evidence shape.", "Java v66 rehearsal endpoint", "java-release-approval-rehearsal.v1 remains read-only."),
    step(2, "collect", "node", "Read mini-kv v75 restore boundary smoke manifest shape.", "mini-kv v75 smoke manifest", "mini-kv-restore-boundary-smoke-manifest.v1 remains read-only."),
    step(3, "compare", "node", "Compare both upstream evidence sources against Node no-execution boundaries.", "Java and mini-kv boundary flags", "No approval, ledger, rollback, SQL, restore, or write execution is allowed."),
    step(4, "normalize", "node", "Normalize real-read rehearsal inputs for operator review.", "Real-read rehearsal intake", "Operator can review evidence without starting upstreams from Node."),
    step(5, "digest", "node", "Digest intake source versions and checks.", "Intake digest", "Digest covers Java v66, mini-kv v75, runtime flags, and readiness checks."),
    step(6, "preserve", "operator", "Archive the intake with Java v66 and mini-kv v75 evidence.", "Release evidence archive", "Evidence is retained before any real execution proposal."),
    step(7, "stop", "release-manager", "Pause before approval decision or restore execution.", "Production execution boundary", "Manual authorization remains outside Node v185."),
  ];
}

function step(
  order: number,
  phase: IntakeStep["phase"],
  actor: IntakeActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): IntakeStep {
  return {
    order,
    phase,
    actor,
    action,
    evidenceTarget,
    expectedEvidence,
    readOnly: true,
    startsJava: false,
    startsMiniKv: false,
    createsApprovalDecision: false,
    writesApprovalLedger: false,
    executesRelease: false,
    executesDeployment: false,
    executesRollback: false,
    executesRestore: false,
    readsSecretValues: false,
    connectsProductionDatabase: false,
  };
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    forbid("Start Java from Node v185", "Node v185 consumes evidence only; it does not own Java lifecycle.", "Node v185 real-read rehearsal intake"),
    forbid("Start mini-kv from Node v185", "Node v185 consumes evidence only; it does not own mini-kv lifecycle.", "Node v185 real-read rehearsal intake"),
    forbid("Create approval decision from Node v185", "Java v66 is rehearsal-only and Node v185 is intake-only.", "Java v66 release approval rehearsal"),
    forbid("Write approval ledger from Node v185", "Approval ledger write remains disabled.", "Java v66 release approval rehearsal"),
    forbid("Trigger Java deployment from Node v185", "Deployment execution is outside this intake.", "Java v66 release approval rehearsal"),
    forbid("Trigger Java rollback from Node v185", "Rollback execution remains blocked.", "Java v66 release approval rehearsal"),
    forbid("Execute rollback SQL from Node v185", "Rollback SQL execution is explicitly disabled.", "Java v66 release approval rehearsal"),
    forbid("Execute mini-kv LOAD from Node v185", "LOAD appears only in CHECKJSON smoke evidence.", "mini-kv v75 restore boundary smoke manifest"),
    forbid("Execute mini-kv COMPACT from Node v185", "COMPACT appears only in CHECKJSON smoke evidence.", "mini-kv v75 restore boundary smoke manifest"),
    forbid("Execute mini-kv SETNXEX from Node v185", "SETNXEX appears only in CHECKJSON smoke evidence and GET token proves no write.", "mini-kv v75 restore boundary smoke manifest"),
    forbid("Execute mini-kv restore from Node v185", "restore_execution_allowed=false.", "mini-kv v75 restore boundary smoke manifest"),
    forbid("Read production secrets from Node v185", "No production secret access is required for this intake.", "runtime safety"),
    forbid("Connect production database from Node v185", "Java v66 rehearsal does not require production database access.", "runtime safety"),
  ];
}

function forbid(operation: string, reason: string, blockedBy: ForbiddenOperation["blockedBy"]): ForbiddenOperation {
  return { operation, reason, blockedBy };
}

function createPauseConditions(): string[] {
  return [
    "Java v66 endpoint shape is unclear or missing.",
    "mini-kv v75 smoke manifest shape is unclear or missing.",
    "UPSTREAM_ACTIONS_ENABLED must be true to continue.",
    "Node must auto-start Java or mini-kv.",
    "A real approval decision must be created.",
    "Approval ledger must be written.",
    "Rollback SQL must be executed.",
    "mini-kv LOAD, COMPACT, SETNXEX, or restore must be executed.",
    "Production secrets, production database, or production IdP are required.",
  ];
}

function createProductionBlockers(checks: Record<string, boolean>): IntakeMessage[] {
  return collectBlockingMessages<IntakeMessage>([
    { condition: checks.javaV66ReleaseApprovalRehearsalReady, code: "JAVA_V66_REHEARSAL_NOT_READY", source: "java-v66-release-approval-rehearsal", message: "Java v66 release approval rehearsal evidence must be ready." },
    { condition: checks.javaRehearsalReadOnly, code: "JAVA_REHEARSAL_NOT_READ_ONLY", source: "java-v66-release-approval-rehearsal", message: "Java rehearsal evidence must remain read-only." },
    { condition: checks.javaExecutionBlocked, code: "JAVA_EXECUTION_ALLOWED", source: "java-v66-release-approval-rehearsal", message: "Java execution must remain blocked." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v66-release-approval-rehearsal", message: "Java deployment, rollback, SQL, database, and secret boundaries must stay closed." },
    { condition: checks.miniKvV75RestoreBoundarySmokeManifestReady, code: "MINI_KV_V75_SMOKE_MANIFEST_NOT_READY", source: "mini-kv-v75-restore-boundary-smoke-manifest", message: "mini-kv v75 restore boundary smoke manifest must be ready." },
    { condition: checks.miniKvExecutionBlocked, code: "MINI_KV_EXECUTION_ALLOWED", source: "mini-kv-v75-restore-boundary-smoke-manifest", message: "mini-kv write, admin, and restore execution must remain blocked." },
    { condition: checks.miniKvNotOrderAuthoritative, code: "MINI_KV_ORDER_AUTHORITY_OPEN", source: "mini-kv-v75-restore-boundary-smoke-manifest", message: "mini-kv must remain outside Java order authority." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must stay false for Node v185." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_REQUESTED", source: "runtime-config", message: "Node v185 must not start Java or mini-kv automatically." },
  ]);
}

function createWarnings(config: AppConfig): IntakeMessage[] {
  const warnings: IntakeMessage[] = [];
  if (config.upstreamProbesEnabled) {
    warnings.push({
      code: "UPSTREAM_PROBES_ENABLED",
      severity: "warning",
      source: "runtime-config",
      message: "UPSTREAM_PROBES_ENABLED is true; keep v185 intake read-only and do not interpret probes as execution approval.",
    });
  }
  warnings.push({
    code: "REAL_READ_REHEARSAL_IS_NOT_PRODUCTION_APPROVAL",
    severity: "warning",
    source: "real-read-rehearsal-intake",
    message: "This intake can prepare an operator review but cannot authorize approval decisions, ledger writes, rollback, SQL, or restore.",
  });
  return warnings;
}

function createRecommendations(): IntakeMessage[] {
  return [
    {
      code: "ARCHIVE_V185_WITH_JAVA_V66_AND_MINIKV_V75",
      severity: "recommendation",
      source: "real-read-rehearsal-intake",
      message: "Archive this intake with the Java v66 release approval rehearsal output and mini-kv v75 restore boundary smoke manifest.",
    },
    {
      code: "NEXT_PLAN_SHOULD_CHOOSE_REAL_READ_OR_MORE_OPTIMIZATION",
      severity: "recommendation",
      source: "real-read-rehearsal-intake",
      message: "The next plan should either schedule a coordinated real-read window or continue Node maintainability work, without adding overlapping versions.",
    },
  ];
}

function createNextActions(checks: Record<string, boolean>): string[] {
  if (!checks.readyForRealReadRehearsalReview) {
    return ["Fix real-read rehearsal intake blockers before building a coordinated read window."];
  }

  return [
    "Archive Node v185 with Java v66 and mini-kv v75 evidence.",
    "Write the next global plan without overlapping completed v182-v185 work.",
    "Only schedule a coordinated real-read window if Java and mini-kv are intentionally started by the operator.",
  ];
}
