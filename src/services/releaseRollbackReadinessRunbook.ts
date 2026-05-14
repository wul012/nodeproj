import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  loadCrossProjectReleaseVerificationIntakeGate,
} from "./crossProjectReleaseVerificationIntakeGate.js";
import type {
  CrossProjectReleaseVerificationIntakeGateProfile,
} from "./crossProjectReleaseVerificationIntakeGate.js";

export interface ReleaseRollbackReadinessRunbookProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "release-rollback-readiness-runbook.v1";
  runbookState: "ready-for-manual-dry-run" | "blocked";
  readyForReleaseRollbackReadinessRunbook: boolean;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  runbook: {
    runbookDigest: string;
    previousIntakeGateDigest: string;
    previousIntakeGateVersion: CrossProjectReleaseVerificationIntakeGateProfile["profileVersion"];
    javaVersion: JavaDeploymentRollbackEvidenceReference["plannedVersion"];
    javaEvidenceVersion: JavaDeploymentRollbackEvidenceReference["evidenceVersion"];
    miniKvVersion: MiniKvRuntimeArtifactRollbackEvidenceReference["plannedVersion"];
    miniKvEvidenceVersion: MiniKvRuntimeArtifactRollbackEvidenceReference["evidenceVersion"];
    rollbackMode: "manual-dry-run-only";
    nodeMayTriggerJavaRollback: false;
    nodeMayExecuteJavaMaven: false;
    nodeMayExecuteMiniKvRollback: false;
    nodeMayExecuteMiniKvAdminCommands: false;
    upstreamActionsEnabled: boolean;
    automaticUpstreamStart: false;
    mutatesUpstreamState: false;
    runtimeFileRead: false;
    productionRollbackAuthorized: false;
  };
  checks: {
    previousIntakeGateReady: boolean;
    previousGateDoesNotAuthorizeRelease: boolean;
    javaV55EvidenceReady: boolean;
    javaRollbackEvidenceVersionReady: boolean;
    javaRollbackSubjectsComplete: boolean;
    javaRequiresOperatorConfirmation: boolean;
    javaNodeRollbackForbidden: boolean;
    javaMavenExecutionForbidden: boolean;
    javaDatabaseRollbackNotAutomatic: boolean;
    javaNoProductionDatabaseRequired: boolean;
    javaBusinessSemanticsUnchanged: boolean;
    javaDoesNotConnectMiniKv: boolean;
    miniKvV64EvidenceReady: boolean;
    miniKvRollbackEvidenceVersionReady: boolean;
    miniKvArtifactBoundariesComplete: boolean;
    miniKvReadOnlySmokeReady: boolean;
    miniKvWriteCommandsNotExecuted: boolean;
    miniKvAdminCommandsNotExecuted: boolean;
    miniKvOrderAuthoritativeFalse: boolean;
    miniKvNotConnectedToJavaTransactionChain: boolean;
    operatorStepsDryRunOnly: boolean;
    forbiddenOperationsCovered: boolean;
    upstreamActionsStillDisabled: boolean;
    noAutomaticUpstreamStart: boolean;
    readyForProductionRollbackStillFalse: boolean;
    readyForReleaseRollbackReadinessRunbook: boolean;
  };
  artifacts: {
    previousIntakeGate: {
      profileVersion: CrossProjectReleaseVerificationIntakeGateProfile["profileVersion"];
      gateDigest: string;
      gateState: CrossProjectReleaseVerificationIntakeGateProfile["gateState"];
      readyForCrossProjectReleaseVerificationIntakeGate: boolean;
      readyForProductionRelease: false;
    };
    javaDeploymentRollbackEvidence: JavaDeploymentRollbackEvidenceReference;
    miniKvRuntimeArtifactRollbackEvidence: MiniKvRuntimeArtifactRollbackEvidenceReference;
    nodeRunbookEnvelope: {
      manualDryRunOnly: true;
      upstreamActionsEnabled: boolean;
      automaticUpstreamStart: false;
      mutatesUpstreamState: false;
      runtimeFileRead: false;
      productionRollbackAuthorized: false;
    };
  };
  operatorSteps: ReleaseRollbackReadinessStep[];
  forbiddenOperations: ReleaseRollbackForbiddenOperation[];
  summary: {
    runbookCheckCount: number;
    passedRunbookCheckCount: number;
    rollbackEvidenceCount: number;
    operatorStepCount: number;
    forbiddenOperationCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReleaseRollbackReadinessMessage[];
  warnings: ReleaseRollbackReadinessMessage[];
  recommendations: ReleaseRollbackReadinessMessage[];
  evidenceEndpoints: {
    releaseRollbackReadinessRunbookJson: string;
    releaseRollbackReadinessRunbookMarkdown: string;
    crossProjectReleaseVerificationIntakeGateJson: string;
    currentRoadmap: string;
  };
  nextActions: string[];
}

interface JavaDeploymentRollbackEvidenceReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v55";
  evidenceTag: "java-v55-deployment-rollback-evidence-sample";
  evidenceVersion: "java-deployment-rollback-evidence.v1";
  scenario: "DEPLOYMENT_ROLLBACK_EVIDENCE_SAMPLE";
  evidenceEndpoint: "/contracts/deployment-rollback-evidence.sample.json";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  archivePath: "c/55";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/59-version-55-deployment-rollback-evidence-sample.md";
  rollbackSubjects: [
    "java-package",
    "runtime-configuration",
    "database-migrations",
    "static-contracts",
  ];
  packageRollbackSupported: true;
  configurationRollbackSupported: true;
  databaseMigrationRollbackAutomatic: false;
  databaseMigrationRequiresOperatorConfirmation: true;
  staticContractsRollbackByArtifactVersion: true;
  requiredOperatorConfirmations: [
    "artifact-version-target",
    "configuration-secret-source",
    "database-migration-direction",
  ];
  nodeMayTriggerRollback: false;
  nodeMayExecuteMaven: false;
  nodeMayTriggerJavaWrites: false;
  requiresProductionDatabase: false;
  changesOrderCreateSemantics: false;
  changesPaymentOrInventoryTransaction: false;
  changesOrderTransactionSemantics: false;
  connectsMiniKv: false;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvRuntimeArtifactRollbackEvidenceReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v64";
  evidenceTag: "mini-kv-v64-runtime-artifact-rollback-evidence";
  evidenceVersion: "mini-kv-runtime-artifact-rollback.v1";
  evidencePath: "fixtures/release/runtime-artifact-rollback-evidence.json";
  releaseManifestPath: "fixtures/release/verification-manifest.json";
  archivePath: "c/64";
  screenshotCount: 5;
  walkthroughPath: "代码讲解记录_生产雏形阶段/120-version-64-runtime-artifact-rollback-evidence.md";
  projectVersion: "0.64.0";
  releaseVersion: "v64";
  artifactIds: [
    "binary-version",
    "wal",
    "snapshot",
    "fixtures",
  ];
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/rollback.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX rollback:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET rollback:token",
    "QUIT",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  noRuntimeCommandAdded: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  cannotForgeJavaOrderState: true;
  requiresOperatorConfirmationForRollbackTargets: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface ReleaseRollbackReadinessStep {
  order: number;
  phase: "prepare" | "collect" | "compare" | "decide" | "closeout";
  actor: "operator" | "node" | "java" | "mini-kv";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  executesRollback: false;
}

interface ReleaseRollbackForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v163 runbook"
    | "Java v55 rollback evidence"
    | "mini-kv v64 rollback evidence"
    | "runtime safety";
}

interface ReleaseRollbackReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "release-rollback-readiness-runbook"
    | "cross-project-release-verification-intake-gate"
    | "java-v55-deployment-rollback-evidence"
    | "mini-kv-v64-runtime-artifact-rollback-evidence"
    | "runtime-config";
  message: string;
}

const JAVA_V55_DEPLOYMENT_ROLLBACK: JavaDeploymentRollbackEvidenceReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v55",
  evidenceTag: "java-v55-deployment-rollback-evidence-sample",
  evidenceVersion: "java-deployment-rollback-evidence.v1",
  scenario: "DEPLOYMENT_ROLLBACK_EVIDENCE_SAMPLE",
  evidenceEndpoint: "/contracts/deployment-rollback-evidence.sample.json",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  archivePath: "c/55",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/59-version-55-deployment-rollback-evidence-sample.md",
  rollbackSubjects: [
    "java-package",
    "runtime-configuration",
    "database-migrations",
    "static-contracts",
  ] as JavaDeploymentRollbackEvidenceReference["rollbackSubjects"],
  packageRollbackSupported: true,
  configurationRollbackSupported: true,
  databaseMigrationRollbackAutomatic: false,
  databaseMigrationRequiresOperatorConfirmation: true,
  staticContractsRollbackByArtifactVersion: true,
  requiredOperatorConfirmations: [
    "artifact-version-target",
    "configuration-secret-source",
    "database-migration-direction",
  ] as JavaDeploymentRollbackEvidenceReference["requiredOperatorConfirmations"],
  nodeMayTriggerRollback: false,
  nodeMayExecuteMaven: false,
  nodeMayTriggerJavaWrites: false,
  requiresProductionDatabase: false,
  changesOrderCreateSemantics: false,
  changesPaymentOrInventoryTransaction: false,
  changesOrderTransactionSemantics: false,
  connectsMiniKv: false,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK: MiniKvRuntimeArtifactRollbackEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v64",
  evidenceTag: "mini-kv-v64-runtime-artifact-rollback-evidence",
  evidenceVersion: "mini-kv-runtime-artifact-rollback.v1",
  evidencePath: "fixtures/release/runtime-artifact-rollback-evidence.json",
  releaseManifestPath: "fixtures/release/verification-manifest.json",
  archivePath: "c/64",
  screenshotCount: 5,
  walkthroughPath: "代码讲解记录_生产雏形阶段/120-version-64-runtime-artifact-rollback-evidence.md",
  projectVersion: "0.64.0",
  releaseVersion: "v64",
  artifactIds: [
    "binary-version",
    "wal",
    "snapshot",
    "fixtures",
  ] as MiniKvRuntimeArtifactRollbackEvidenceReference["artifactIds"],
  readOnlySmokeCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/rollback.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX rollback:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET rollback:token",
    "QUIT",
  ] as MiniKvRuntimeArtifactRollbackEvidenceReference["readOnlySmokeCommands"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  cannotForgeJavaOrderState: true,
  requiresOperatorConfirmationForRollbackTargets: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  releaseRollbackReadinessRunbookJson: "/api/v1/production/release-rollback-readiness-runbook",
  releaseRollbackReadinessRunbookMarkdown: "/api/v1/production/release-rollback-readiness-runbook?format=markdown",
  crossProjectReleaseVerificationIntakeGateJson: "/api/v1/production/cross-project-release-verification-intake-gate",
  currentRoadmap: "docs/plans/v161-post-controlled-idempotency-drill-roadmap.md",
});

export function loadReleaseRollbackReadinessRunbook(config: AppConfig): ReleaseRollbackReadinessRunbookProfile {
  const previousIntakeGate = loadCrossProjectReleaseVerificationIntakeGate(config);
  const operatorSteps = createOperatorSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, previousIntakeGate, operatorSteps, forbiddenOperations);
  checks.readyForReleaseRollbackReadinessRunbook = Object.entries(checks)
    .filter(([key]) => key !== "readyForReleaseRollbackReadinessRunbook")
    .every(([, value]) => value);
  const runbookState = checks.readyForReleaseRollbackReadinessRunbook
    ? "ready-for-manual-dry-run"
    : "blocked";
  const runbookDigest = digestRunbook({
    profileVersion: "release-rollback-readiness-runbook.v1",
    previousIntakeGateDigest: previousIntakeGate.gate.gateDigest,
    javaVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.plannedVersion,
    javaEvidenceVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.evidenceVersion,
    miniKvVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.plannedVersion,
    miniKvEvidenceVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.evidenceVersion,
    rollbackMode: "manual-dry-run-only",
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    operatorSteps: operatorSteps.map((step) => ({
      order: step.order,
      phase: step.phase,
      evidenceTarget: step.evidenceTarget,
    })),
    forbiddenOperations: forbiddenOperations.map((operation) => operation.operation),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(runbookState);
  const recommendations = collectRecommendations(runbookState);

  return {
    service: "orderops-node",
    title: "Release rollback readiness runbook",
    generatedAt: new Date().toISOString(),
    profileVersion: "release-rollback-readiness-runbook.v1",
    runbookState,
    readyForReleaseRollbackReadinessRunbook: checks.readyForReleaseRollbackReadinessRunbook,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    runbook: {
      runbookDigest,
      previousIntakeGateDigest: previousIntakeGate.gate.gateDigest,
      previousIntakeGateVersion: previousIntakeGate.profileVersion,
      javaVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.plannedVersion,
      javaEvidenceVersion: JAVA_V55_DEPLOYMENT_ROLLBACK.evidenceVersion,
      miniKvVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.plannedVersion,
      miniKvEvidenceVersion: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.evidenceVersion,
      rollbackMode: "manual-dry-run-only",
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteJavaMaven: false,
      nodeMayExecuteMiniKvRollback: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      runtimeFileRead: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      previousIntakeGate: {
        profileVersion: previousIntakeGate.profileVersion,
        gateDigest: previousIntakeGate.gate.gateDigest,
        gateState: previousIntakeGate.gateState,
        readyForCrossProjectReleaseVerificationIntakeGate:
          previousIntakeGate.readyForCrossProjectReleaseVerificationIntakeGate,
        readyForProductionRelease: previousIntakeGate.readyForProductionRelease,
      },
      javaDeploymentRollbackEvidence: { ...JAVA_V55_DEPLOYMENT_ROLLBACK },
      miniKvRuntimeArtifactRollbackEvidence: { ...MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK },
      nodeRunbookEnvelope: {
        manualDryRunOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        runtimeFileRead: false,
        productionRollbackAuthorized: false,
      },
    },
    operatorSteps,
    forbiddenOperations,
    summary: {
      runbookCheckCount: countReportChecks(checks),
      passedRunbookCheckCount: countPassedReportChecks(checks),
      rollbackEvidenceCount: 2,
      operatorStepCount: operatorSteps.length,
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
      "Run Java v55 and mini-kv v64 rollback evidence reviews manually before any real rollback window.",
      "Keep Node v163 as a dry-run runbook until production secrets, database access, and operator approval are explicitly provided.",
      "Start a new post-v163 plan before adding any real rollback execution capability.",
    ],
  };
}

export function renderReleaseRollbackReadinessRunbookMarkdown(
  profile: ReleaseRollbackReadinessRunbookProfile,
): string {
  return [
    "# Release rollback readiness runbook",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Runbook state: ${profile.runbookState}`,
    `- Ready for release rollback readiness runbook: ${profile.readyForReleaseRollbackReadinessRunbook}`,
    `- Ready for production rollback: ${profile.readyForProductionRollback}`,
    `- Ready for production operations: ${profile.readyForProductionOperations}`,
    `- Read only: ${profile.readOnly}`,
    `- Dry run only: ${profile.dryRunOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runbook",
    "",
    ...renderEntries(profile.runbook),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Artifacts",
    "",
    "### Previous Intake Gate",
    "",
    ...renderEntries(profile.artifacts.previousIntakeGate),
    "",
    "### Java Deployment Rollback Evidence",
    "",
    ...renderEntries(profile.artifacts.javaDeploymentRollbackEvidence),
    "",
    "### mini-kv Runtime Artifact Rollback Evidence",
    "",
    ...renderEntries(profile.artifacts.miniKvRuntimeArtifactRollbackEvidence),
    "",
    "### Node Runbook Envelope",
    "",
    ...renderEntries(profile.artifacts.nodeRunbookEnvelope),
    "",
    "## Operator Steps",
    "",
    ...profile.operatorSteps.flatMap(renderStep),
    "## Forbidden Operations",
    "",
    ...profile.forbiddenOperations.flatMap(renderForbiddenOperation),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No release rollback readiness runbook blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No release rollback readiness runbook warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No release rollback readiness runbook recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createOperatorSteps(): ReleaseRollbackReadinessStep[] {
  return [
    {
      order: 1,
      phase: "prepare",
      actor: "operator",
      action: "Confirm rollback target artifact versions and keep UPSTREAM_ACTIONS_ENABLED=false.",
      evidenceTarget: "Java artifact target and mini-kv binary/version target",
      expectedEvidence: "Operator-selected rollback targets are documented before any command is executed.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
    {
      order: 2,
      phase: "collect",
      actor: "java",
      action: "Review Java v55 deployment rollback evidence sample.",
      evidenceTarget: "/contracts/deployment-rollback-evidence.sample.json and c/55 archive",
      expectedEvidence: "java-deployment-rollback-evidence.v1 covers package, runtime config, database migration, and static contracts.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
    {
      order: 3,
      phase: "collect",
      actor: "mini-kv",
      action: "Review mini-kv v64 runtime artifact rollback evidence sample.",
      evidenceTarget: "fixtures/release/runtime-artifact-rollback-evidence.json and c/64 archive",
      expectedEvidence: "mini-kv-runtime-artifact-rollback.v1 covers binary/version, WAL, Snapshot, and fixtures.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
    {
      order: 4,
      phase: "compare",
      actor: "node",
      action: "Compare Java rollback subjects with mini-kv runtime artifact boundaries.",
      evidenceTarget: "Node v163 runbook checks",
      expectedEvidence: "No evidence claims Node may trigger rollback, execute admin commands, or create Java order authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
    {
      order: 5,
      phase: "decide",
      actor: "operator",
      action: "Pause if production secrets, production database access, or version compatibility are unclear.",
      evidenceTarget: "pause conditions and production blockers",
      expectedEvidence: "Any uncertainty blocks real rollback instead of being automated by Node.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Archive the runbook as readiness evidence and start a new post-v163 plan before real rollback execution work.",
      evidenceTarget: "c/163 archive and docs/plans next plan",
      expectedEvidence: "v163 closes this rollback evidence stage without opening production rollback authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRollback: false,
    },
  ];
}

function createForbiddenOperations(): ReleaseRollbackForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java deployment rollback from Node",
      reason: "Java v55 evidence is a boundary sample and sets nodeMayTriggerRollback=false.",
      blockedBy: "Java v55 rollback evidence",
    },
    {
      operation: "Execute Maven or package commands from Node v163",
      reason: "Node consumes Java rollback evidence; Java owns Maven and package execution.",
      blockedBy: "Node v163 runbook",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX during rollback readiness",
      reason: "mini-kv v64 uses CHECKJSON to inspect rollback-sensitive commands without executing them.",
      blockedBy: "mini-kv v64 rollback evidence",
    },
    {
      operation: "Execute database rollback SQL from this runbook",
      reason: "Java v55 marks database migration rollback as manual and operator-confirmed.",
      blockedBy: "Java v55 rollback evidence",
    },
    {
      operation: "Treat mini-kv recovery as Java order authority",
      reason: "mini-kv v64 cannot forge Java order authoritative state.",
      blockedBy: "mini-kv v64 rollback evidence",
    },
    {
      operation: "UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production writes and rollback actions remain disabled during this dry-run runbook.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat this runbook as production rollback approval",
      reason: "v163 is readiness evidence only and does not authorize production rollback.",
      blockedBy: "Node v163 runbook",
    },
  ];
}

function createChecks(
  config: AppConfig,
  previousIntakeGate: CrossProjectReleaseVerificationIntakeGateProfile,
  operatorSteps: ReleaseRollbackReadinessStep[],
  forbiddenOperations: ReleaseRollbackForbiddenOperation[],
): ReleaseRollbackReadinessRunbookProfile["checks"] {
  return {
    previousIntakeGateReady: previousIntakeGate.readyForCrossProjectReleaseVerificationIntakeGate
      && previousIntakeGate.gateState === "ready-for-release-verification-intake",
    previousGateDoesNotAuthorizeRelease: previousIntakeGate.readyForProductionRelease === false
      && !previousIntakeGate.executionAllowed,
    javaV55EvidenceReady: JAVA_V55_DEPLOYMENT_ROLLBACK.plannedVersion === "Java v55"
      && JAVA_V55_DEPLOYMENT_ROLLBACK.evidenceTag === "java-v55-deployment-rollback-evidence-sample",
    javaRollbackEvidenceVersionReady: JAVA_V55_DEPLOYMENT_ROLLBACK.evidenceVersion === "java-deployment-rollback-evidence.v1"
      && JAVA_V55_DEPLOYMENT_ROLLBACK.scenario === "DEPLOYMENT_ROLLBACK_EVIDENCE_SAMPLE",
    javaRollbackSubjectsComplete: JAVA_V55_DEPLOYMENT_ROLLBACK.rollbackSubjects.length === 4
      && JAVA_V55_DEPLOYMENT_ROLLBACK.rollbackSubjects.includes("java-package")
      && JAVA_V55_DEPLOYMENT_ROLLBACK.rollbackSubjects.includes("database-migrations"),
    javaRequiresOperatorConfirmation: JAVA_V55_DEPLOYMENT_ROLLBACK.requiredOperatorConfirmations.length === 3
      && JAVA_V55_DEPLOYMENT_ROLLBACK.databaseMigrationRequiresOperatorConfirmation,
    javaNodeRollbackForbidden: !JAVA_V55_DEPLOYMENT_ROLLBACK.nodeMayTriggerRollback,
    javaMavenExecutionForbidden: !JAVA_V55_DEPLOYMENT_ROLLBACK.nodeMayExecuteMaven,
    javaDatabaseRollbackNotAutomatic: !JAVA_V55_DEPLOYMENT_ROLLBACK.databaseMigrationRollbackAutomatic,
    javaNoProductionDatabaseRequired: !JAVA_V55_DEPLOYMENT_ROLLBACK.requiresProductionDatabase,
    javaBusinessSemanticsUnchanged: !JAVA_V55_DEPLOYMENT_ROLLBACK.changesOrderCreateSemantics
      && !JAVA_V55_DEPLOYMENT_ROLLBACK.changesPaymentOrInventoryTransaction
      && !JAVA_V55_DEPLOYMENT_ROLLBACK.changesOrderTransactionSemantics,
    javaDoesNotConnectMiniKv: !JAVA_V55_DEPLOYMENT_ROLLBACK.connectsMiniKv,
    miniKvV64EvidenceReady: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.plannedVersion === "mini-kv v64"
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.evidenceTag === "mini-kv-v64-runtime-artifact-rollback-evidence",
    miniKvRollbackEvidenceVersionReady:
      MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.evidenceVersion === "mini-kv-runtime-artifact-rollback.v1"
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.projectVersion === "0.64.0",
    miniKvArtifactBoundariesComplete: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.artifactIds.length === 4
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.artifactIds.includes("wal")
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.artifactIds.includes("snapshot"),
    miniKvReadOnlySmokeReady: MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.readOnlySmokeCommands.length === 8
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.readOnlySmokeCommands.includes("CHECKJSON LOAD data/rollback.snap")
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.readOnlySmokeCommands.includes("GET rollback:token"),
    miniKvWriteCommandsNotExecuted: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.writeCommandsExecuted,
    miniKvAdminCommandsNotExecuted: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.adminCommandsExecuted,
    miniKvOrderAuthoritativeFalse: !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.orderAuthoritative
      && MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.cannotForgeJavaOrderState,
    miniKvNotConnectedToJavaTransactionChain:
      !MINI_KV_V64_RUNTIME_ARTIFACT_ROLLBACK.connectedToJavaTransactionChain,
    operatorStepsDryRunOnly: operatorSteps.length === 6
      && operatorSteps.every((step) => step.dryRunOnly && step.readOnly && !step.mutatesState && !step.executesRollback),
    forbiddenOperationsCovered: forbiddenOperations.length === 7
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java deployment rollback from Node")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv LOAD, COMPACT, or SETNXEX during rollback readiness"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    readyForProductionRollbackStillFalse: true,
    readyForReleaseRollbackReadinessRunbook: false,
  };
}

function collectProductionBlockers(
  checks: ReleaseRollbackReadinessRunbookProfile["checks"],
): ReleaseRollbackReadinessMessage[] {
  const blockers: ReleaseRollbackReadinessMessage[] = [];
  addMessage(blockers, checks.previousIntakeGateReady, "PREVIOUS_INTAKE_GATE_NOT_READY", "cross-project-release-verification-intake-gate", "Node v162 intake gate must be ready before rollback readiness.");
  addMessage(blockers, checks.previousGateDoesNotAuthorizeRelease, "PREVIOUS_GATE_AUTHORIZES_RELEASE", "cross-project-release-verification-intake-gate", "Node v162 must not authorize production release.");
  addMessage(blockers, checks.javaV55EvidenceReady, "JAVA_V55_ROLLBACK_EVIDENCE_NOT_READY", "java-v55-deployment-rollback-evidence", "Java v55 rollback evidence must be present.");
  addMessage(blockers, checks.javaRollbackEvidenceVersionReady, "JAVA_ROLLBACK_EVIDENCE_VERSION_NOT_READY", "java-v55-deployment-rollback-evidence", "Java rollback evidence version must match.");
  addMessage(blockers, checks.javaRollbackSubjectsComplete, "JAVA_ROLLBACK_SUBJECTS_INCOMPLETE", "java-v55-deployment-rollback-evidence", "Java rollback subjects must cover package, config, database migrations, and static contracts.");
  addMessage(blockers, checks.javaRequiresOperatorConfirmation, "JAVA_OPERATOR_CONFIRMATION_MISSING", "java-v55-deployment-rollback-evidence", "Java rollback evidence must require operator confirmation.");
  addMessage(blockers, checks.javaNodeRollbackForbidden, "NODE_MAY_TRIGGER_JAVA_ROLLBACK", "java-v55-deployment-rollback-evidence", "Node v163 must not trigger Java rollback.");
  addMessage(blockers, checks.javaMavenExecutionForbidden, "NODE_MAY_EXECUTE_JAVA_MAVEN", "java-v55-deployment-rollback-evidence", "Node v163 must not execute Maven.");
  addMessage(blockers, checks.javaDatabaseRollbackNotAutomatic, "JAVA_DATABASE_ROLLBACK_AUTOMATIC", "java-v55-deployment-rollback-evidence", "Database rollback must not be automatic.");
  addMessage(blockers, checks.javaNoProductionDatabaseRequired, "JAVA_REQUIRES_PRODUCTION_DATABASE", "java-v55-deployment-rollback-evidence", "Readiness evidence must not require a production database.");
  addMessage(blockers, checks.javaBusinessSemanticsUnchanged, "JAVA_BUSINESS_SEMANTICS_CHANGED", "java-v55-deployment-rollback-evidence", "Java rollback evidence must not change order transaction semantics.");
  addMessage(blockers, checks.javaDoesNotConnectMiniKv, "JAVA_CONNECTS_MINI_KV", "java-v55-deployment-rollback-evidence", "Java rollback evidence must not connect mini-kv.");
  addMessage(blockers, checks.miniKvV64EvidenceReady, "MINI_KV_V64_ROLLBACK_EVIDENCE_NOT_READY", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv v64 rollback evidence must be present.");
  addMessage(blockers, checks.miniKvRollbackEvidenceVersionReady, "MINI_KV_ROLLBACK_EVIDENCE_VERSION_NOT_READY", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv rollback evidence version must match.");
  addMessage(blockers, checks.miniKvArtifactBoundariesComplete, "MINI_KV_ARTIFACT_BOUNDARIES_INCOMPLETE", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv rollback evidence must cover binary, WAL, snapshot, and fixtures.");
  addMessage(blockers, checks.miniKvReadOnlySmokeReady, "MINI_KV_READ_ONLY_SMOKE_NOT_READY", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv rollback smoke must remain read-only.");
  addMessage(blockers, checks.miniKvWriteCommandsNotExecuted, "MINI_KV_WRITE_COMMANDS_EXECUTED", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv rollback readiness must not execute write commands.");
  addMessage(blockers, checks.miniKvAdminCommandsNotExecuted, "MINI_KV_ADMIN_COMMANDS_EXECUTED", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv rollback readiness must not execute admin commands.");
  addMessage(blockers, checks.miniKvOrderAuthoritativeFalse, "MINI_KV_ORDER_AUTHORITATIVE", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv must not be treated as Java order authority.");
  addMessage(blockers, checks.miniKvNotConnectedToJavaTransactionChain, "MINI_KV_CONNECTED_TO_JAVA_TRANSACTION_CHAIN", "mini-kv-v64-runtime-artifact-rollback-evidence", "mini-kv must not enter Java transaction chain.");
  addMessage(blockers, checks.operatorStepsDryRunOnly, "OPERATOR_STEPS_NOT_DRY_RUN", "release-rollback-readiness-runbook", "Operator steps must remain read-only dry-run.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "release-rollback-readiness-runbook", "Forbidden rollback operations must be explicit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "release-rollback-readiness-runbook", "Node v163 must not start Java or mini-kv.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "release-rollback-readiness-runbook", "Node v163 must not authorize production rollback.");
  return blockers;
}

function collectWarnings(
  runbookState: ReleaseRollbackReadinessRunbookProfile["runbookState"],
): ReleaseRollbackReadinessMessage[] {
  return [
    {
      code: runbookState === "blocked" ? "ROLLBACK_READINESS_RUNBOOK_BLOCKED" : "ROLLBACK_READINESS_RUNBOOK_READY",
      severity: "warning",
      source: "release-rollback-readiness-runbook",
      message: runbookState === "blocked"
        ? "Release rollback readiness runbook has blockers."
        : "Release rollback readiness runbook is ready for manual dry-run review only.",
    },
    {
      code: "DATABASE_ROLLBACK_REQUIRES_OPERATOR",
      severity: "warning",
      source: "java-v55-deployment-rollback-evidence",
      message: "Java database migration rollback remains an operator-confirmed action outside this runbook.",
    },
    {
      code: "MINI_KV_ROLLBACK_IS_NOT_ORDER_AUTHORITY",
      severity: "warning",
      source: "mini-kv-v64-runtime-artifact-rollback-evidence",
      message: "mini-kv WAL/Snapshot rollback cannot create Java order authoritative state.",
    },
  ];
}

function collectRecommendations(
  runbookState: ReleaseRollbackReadinessRunbookProfile["runbookState"],
): ReleaseRollbackReadinessMessage[] {
  return [
    {
      code: runbookState === "blocked"
        ? "FIX_ROLLBACK_READINESS_BLOCKERS"
        : "START_POST_V163_PLAN",
      severity: "recommendation",
      source: "release-rollback-readiness-runbook",
      message: runbookState === "blocked"
        ? "Fix rollback readiness blockers before starting the next plan."
        : "Create a new post-v163 plan before adding any real rollback execution capability.",
    },
  ];
}

function addMessage(
  messages: ReleaseRollbackReadinessMessage[],
  condition: boolean,
  code: string,
  source: ReleaseRollbackReadinessMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderStep(step: ReleaseRollbackReadinessStep): string[] {
  return [
    `### Step ${step.order}: ${step.phase}`,
    "",
    `- Actor: ${step.actor}`,
    `- Action: ${step.action}`,
    `- Evidence target: ${step.evidenceTarget}`,
    `- Expected evidence: ${step.expectedEvidence}`,
    `- Dry run only: ${step.dryRunOnly}`,
    `- Read only: ${step.readOnly}`,
    `- Mutates state: ${step.mutatesState}`,
    `- Executes rollback: ${step.executesRollback}`,
    "",
  ];
}

function renderForbiddenOperation(operation: ReleaseRollbackForbiddenOperation): string[] {
  return [
    `- ${operation.operation}: ${operation.reason} Blocked by ${operation.blockedBy}.`,
  ];
}

function digestRunbook(value: unknown): string {
  return sha256StableJson(value);
}
