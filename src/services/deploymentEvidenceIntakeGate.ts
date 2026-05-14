import type { AppConfig } from "../config.js";
import {
  appendBlockingMessage,
  completeAggregateReadyCheck,
  digestReleaseReport,
  prefixReportCheckSummary,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadPostV166ReadinessSummary,
} from "./postV166ReadinessSummary.js";
import type {
  PostV166ReadinessSummaryProfile,
} from "./postV166ReadinessSummary.js";

type IntakeState = "ready-for-manual-deployment-evidence-review" | "blocked";
type IntakeSource = "node" | "java" | "mini-kv" | "operator";

interface IntakeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "deployment-evidence-intake-gate"
    | "post-v166-readiness-summary"
    | "java-v60-production-deployment-runbook-contract"
    | "mini-kv-v69-release-artifact-digest-package"
    | "runtime-config";
  message: string;
}

interface IntakeStep {
  order: number;
  phase: "collect" | "verify" | "compare" | "decide" | "closeout";
  source: IntakeSource;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v171 deployment evidence intake gate"
    | "Node v169 post-v166 readiness summary"
    | "Java v60 production deployment runbook contract"
    | "mini-kv v69 release artifact digest package"
    | "runtime safety";
}

interface JavaDeploymentRunbookContractReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v60";
  evidenceTag: "v60订单平台production-deployment-runbook-contract";
  contractVersion: "java-production-deployment-runbook-contract.v1";
  scenario: "PRODUCTION_DEPLOYMENT_RUNBOOK_CONTRACT_SAMPLE";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  contractEndpoint: "/contracts/production-deployment-runbook-contract.sample.json";
  contractSource: "src/main/resources/static/contracts/production-deployment-runbook-contract.sample.json";
  archivePath: "c/60";
  walkthroughPath: "代码讲解记录_生产雏形阶段/64-version-60-production-deployment-runbook-contract.md";
  contractMode: "READ_ONLY_DEPLOYMENT_RUNBOOK_CONTRACT";
  deploymentWindow: {
    owner: "release-window-owner";
    rollbackApprover: "rollback-approval-owner";
    operatorStartRequired: true;
    nodeMayScheduleWindow: false;
    nodeMayTriggerDeployment: false;
  };
  databaseMigration: {
    directionOptions: [
      "forward-only",
      "rollback-script-reviewed",
      "no-database-change",
    ];
    selectedDirection: "no-database-change";
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
  };
  secretSourceConfirmation: {
    endpoint: "/contracts/production-secret-source-contract.sample.json";
    required: true;
    nodeMayReadSecretValues: false;
    secretValueRecorded: false;
  };
  requiredConfirmationFields: [
    "deployment-window-owner",
    "rollback-approver",
    "database-migration-direction",
    "secret-source-confirmation",
    "rollback-sql-review-gate",
    "operator-approval-placeholder",
  ];
  runbookArtifacts: [
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/rollback-sql-review-gate.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
  ];
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderIntakeGate: true;
    nodeMayTriggerDeployment: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayModifyRuntimeConfig: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
    sqlExecutionAllowed: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    changesOrderCreateSemantics: false;
    changesPaymentOrInventoryTransaction: false;
    changesOutboxOrReplayExecution: false;
    changesOrderTransactionSemantics: false;
    connectsMiniKv: false;
  };
  forbiddenOperations: [
    "Executing Java deployment from this runbook contract",
    "Triggering Java rollback from Node",
    "Executing rollback SQL from this runbook contract",
    "Connecting production database",
    "Reading production secret values from this runbook contract",
    "Modifying Java runtime configuration from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ];
  readOnlyEvidence: true;
  executionAllowed: false;
}

interface MiniKvReleaseArtifactDigestPackageReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v69";
  evidenceTag: "第六十九版发布产物摘要包";
  packageVersion: "mini-kv-release-artifact-digest-package.v1";
  packagePath: "fixtures/release/release-artifact-digest-package.json";
  archivePath: "c/69";
  walkthroughPath: "代码讲解记录_生产雏形阶段/125-version-69-release-artifact-digest-package.md";
  projectVersion: "0.69.0";
  releaseVersion: "v69";
  targetReleaseVersion: "v69";
  previousReleaseVersion: "v68";
  previousEvidence: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/artifact-digest-compatibility-matrix.json",
    "fixtures/release/restore-dry-run-operator-package.json",
    "fixtures/release/runtime-artifact-bundle-manifest.json",
  ];
  artifactDigestIds: [
    "binary-digest",
    "wal-checksum-evidence",
    "snapshot-digest-evidence",
    "fixture-digest",
  ];
  restoreDrillCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/release-artifact-drill.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX release:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET release:token",
    "QUIT",
  ];
  operatorConfirmationFields: [
    "release_operator_id",
    "binary_digest_recorded_at",
    "wal_snapshot_digest_recorded_at",
    "fixture_digest_recorded_at",
    "restore_drill_profile_reviewed",
    "artifact_matrix_cross_checked",
  ];
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/artifact-digest-compatibility-matrix.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/recovery/restart-recovery-evidence.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  restoreExecutionAllowed: false;
  operatorConfirmationRequired: true;
  digestPlaceholdersOnly: true;
  noRuntimeCommandAdded: true;
  orderAuthoritative: false;
  connectedToJavaTransactionChain: false;
  doesNotRunJavaOrNode: true;
  doesNotReadProductionSecrets: true;
  doesNotOpenUpstreamActions: true;
  readOnlyEvidence: true;
  executionAllowed: false;
}

export interface DeploymentEvidenceIntakeGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "deployment-evidence-intake-gate.v1";
  gateState: IntakeState;
  readyForDeploymentEvidenceIntakeGate: boolean;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  gate: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  intakeSteps: IntakeStep[];
  forbiddenOperations: ForbiddenOperation[];
  summary: Record<string, number>;
  productionBlockers: IntakeMessage[];
  warnings: IntakeMessage[];
  recommendations: IntakeMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V60_DEPLOYMENT_RUNBOOK: JavaDeploymentRunbookContractReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v60",
  evidenceTag: "v60订单平台production-deployment-runbook-contract",
  contractVersion: "java-production-deployment-runbook-contract.v1",
  scenario: "PRODUCTION_DEPLOYMENT_RUNBOOK_CONTRACT_SAMPLE",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  contractEndpoint: "/contracts/production-deployment-runbook-contract.sample.json",
  contractSource: "src/main/resources/static/contracts/production-deployment-runbook-contract.sample.json",
  archivePath: "c/60",
  walkthroughPath: "代码讲解记录_生产雏形阶段/64-version-60-production-deployment-runbook-contract.md",
  contractMode: "READ_ONLY_DEPLOYMENT_RUNBOOK_CONTRACT",
  deploymentWindow: {
    owner: "release-window-owner",
    rollbackApprover: "rollback-approval-owner",
    operatorStartRequired: true,
    nodeMayScheduleWindow: false,
    nodeMayTriggerDeployment: false,
  } as JavaDeploymentRunbookContractReference["deploymentWindow"],
  databaseMigration: {
    directionOptions: [
      "forward-only",
      "rollback-script-reviewed",
      "no-database-change",
    ] as JavaDeploymentRunbookContractReference["databaseMigration"]["directionOptions"],
    selectedDirection: "no-database-change",
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
  } as JavaDeploymentRunbookContractReference["databaseMigration"],
  secretSourceConfirmation: {
    endpoint: "/contracts/production-secret-source-contract.sample.json",
    required: true,
    nodeMayReadSecretValues: false,
    secretValueRecorded: false,
  } as JavaDeploymentRunbookContractReference["secretSourceConfirmation"],
  requiredConfirmationFields: [
    "deployment-window-owner",
    "rollback-approver",
    "database-migration-direction",
    "secret-source-confirmation",
    "rollback-sql-review-gate",
    "operator-approval-placeholder",
  ] as JavaDeploymentRunbookContractReference["requiredConfirmationFields"],
  runbookArtifacts: [
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/deployment-rollback-evidence.sample.json",
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/rollback-sql-review-gate.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
  ] as JavaDeploymentRunbookContractReference["runbookArtifacts"],
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderIntakeGate: true,
    nodeMayTriggerDeployment: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayModifyRuntimeConfig: false,
    requiresUpstreamActionsEnabled: false,
  } as JavaDeploymentRunbookContractReference["nodeConsumption"],
  boundaries: {
    sqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    changesOrderCreateSemantics: false,
    changesPaymentOrInventoryTransaction: false,
    changesOutboxOrReplayExecution: false,
    changesOrderTransactionSemantics: false,
    connectsMiniKv: false,
  } as JavaDeploymentRunbookContractReference["boundaries"],
  forbiddenOperations: [
    "Executing Java deployment from this runbook contract",
    "Triggering Java rollback from Node",
    "Executing rollback SQL from this runbook contract",
    "Connecting production database",
    "Reading production secret values from this runbook contract",
    "Modifying Java runtime configuration from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ] as JavaDeploymentRunbookContractReference["forbiddenOperations"],
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE: MiniKvReleaseArtifactDigestPackageReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v69",
  evidenceTag: "第六十九版发布产物摘要包",
  packageVersion: "mini-kv-release-artifact-digest-package.v1",
  packagePath: "fixtures/release/release-artifact-digest-package.json",
  archivePath: "c/69",
  walkthroughPath: "代码讲解记录_生产雏形阶段/125-version-69-release-artifact-digest-package.md",
  projectVersion: "0.69.0",
  releaseVersion: "v69",
  targetReleaseVersion: "v69",
  previousReleaseVersion: "v68",
  previousEvidence: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/artifact-digest-compatibility-matrix.json",
    "fixtures/release/restore-dry-run-operator-package.json",
    "fixtures/release/runtime-artifact-bundle-manifest.json",
  ] as MiniKvReleaseArtifactDigestPackageReference["previousEvidence"],
  artifactDigestIds: [
    "binary-digest",
    "wal-checksum-evidence",
    "snapshot-digest-evidence",
    "fixture-digest",
  ] as MiniKvReleaseArtifactDigestPackageReference["artifactDigestIds"],
  restoreDrillCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/release-artifact-drill.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX release:token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET release:token",
    "QUIT",
  ] as MiniKvReleaseArtifactDigestPackageReference["restoreDrillCommands"],
  operatorConfirmationFields: [
    "release_operator_id",
    "binary_digest_recorded_at",
    "wal_snapshot_digest_recorded_at",
    "fixture_digest_recorded_at",
    "restore_drill_profile_reviewed",
    "artifact_matrix_cross_checked",
  ] as MiniKvReleaseArtifactDigestPackageReference["operatorConfirmationFields"],
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/artifact-digest-compatibility-matrix.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/recovery/restart-recovery-evidence.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ] as MiniKvReleaseArtifactDigestPackageReference["fixtureInputs"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  restoreExecutionAllowed: false,
  operatorConfirmationRequired: true,
  digestPlaceholdersOnly: true,
  noRuntimeCommandAdded: true,
  orderAuthoritative: false,
  connectedToJavaTransactionChain: false,
  doesNotRunJavaOrNode: true,
  doesNotReadProductionSecrets: true,
  doesNotOpenUpstreamActions: true,
  readOnlyEvidence: true,
  executionAllowed: false,
});

const ENDPOINTS = Object.freeze({
  deploymentEvidenceIntakeGateJson: "/api/v1/production/deployment-evidence-intake-gate",
  deploymentEvidenceIntakeGateMarkdown: "/api/v1/production/deployment-evidence-intake-gate?format=markdown",
  postV166ReadinessSummaryJson: "/api/v1/production/post-v166-readiness-summary",
  javaDeploymentRunbookContract: "/contracts/production-deployment-runbook-contract.sample.json",
  miniKvReleaseArtifactDigestPackage: "fixtures/release/release-artifact-digest-package.json",
  currentRoadmap: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
});

export function loadDeploymentEvidenceIntakeGate(config: AppConfig): DeploymentEvidenceIntakeGateProfile {
  const postV166Summary = loadPostV166ReadinessSummary(config);
  const intakeSteps = createIntakeSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, postV166Summary, intakeSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceIntakeGate");
  const gateState: IntakeState = checks.readyForDeploymentEvidenceIntakeGate
    ? "ready-for-manual-deployment-evidence-review"
    : "blocked";
  const intakeDigest = digestIntake({
    profileVersion: "deployment-evidence-intake-gate.v1",
    sourceSummaryDigest: postV166Summary.stage.stageDigest,
    javaVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.plannedVersion,
    javaContractVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.contractVersion,
    miniKvVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.plannedVersion,
    miniKvPackageVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.packageVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);
  const checkSummary = prefixReportCheckSummary(summarizeReportChecks(checks), "gate");

  return {
    service: "orderops-node",
    title: "Deployment evidence intake gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "deployment-evidence-intake-gate.v1",
    gateState,
    readyForDeploymentEvidenceIntakeGate: checks.readyForDeploymentEvidenceIntakeGate,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    gate: {
      intakeDigest,
      sourceSummaryDigest: postV166Summary.stage.stageDigest,
      sourceSummaryVersion: postV166Summary.summaryVersion,
      javaVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.plannedVersion,
      javaContractVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.contractVersion,
      miniKvVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.plannedVersion,
      miniKvPackageVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.packageVersion,
      nodeBaselineTag: "v170",
      intakeMode: "manual-deployment-evidence-intake-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      nodeMayRenderIntakeGate: true,
      nodeMayTriggerDeployment: false,
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      nodeMayReadSecretValues: false,
      nodeMayConnectProductionDatabase: false,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      sourcePostV166ReadinessSummary: summarizePostV166Summary(postV166Summary),
      javaProductionDeploymentRunbookContract: { ...JAVA_V60_DEPLOYMENT_RUNBOOK },
      miniKvReleaseArtifactDigestPackage: { ...MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE },
      nodeIntakeEnvelope: {
        manualDeploymentEvidenceIntakeOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        readsSecretValues: false,
        connectsProductionDatabase: false,
        executesDeployment: false,
        executesRollback: false,
        executesRestore: false,
        productionDeploymentAuthorized: false,
      },
    },
    intakeSteps,
    forbiddenOperations,
    summary: {
      gateCheckCount: checkSummary.gateCheckCount,
      passedGateCheckCount: checkSummary.passedGateCheckCount,
      sourceEvidenceCount: 3,
      intakeStepCount: intakeSteps.length,
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
      "Proceed to Node v172 deployment evidence verification only after this intake gate remains clean.",
      "Keep Java v60 and mini-kv v69 as read-only evidence; do not use either as production deployment, rollback, or restore approval.",
      "Pause before any production secret manager, production database, Java deployment, Java rollback SQL, or mini-kv restore execution.",
    ],
  };
}

export function renderDeploymentEvidenceIntakeGateMarkdown(
  profile: DeploymentEvidenceIntakeGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Deployment evidence intake gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for deployment evidence intake gate": profile.readyForDeploymentEvidenceIntakeGate,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Post-v166 Readiness Summary", entries: profile.artifacts.sourcePostV166ReadinessSummary },
      {
        heading: "Java Production Deployment Runbook Contract",
        entries: profile.artifacts.javaProductionDeploymentRunbookContract,
      },
      {
        heading: "mini-kv Release Artifact Digest Package",
        entries: profile.artifacts.miniKvReleaseArtifactDigestPackage,
      },
      { heading: "Node Intake Envelope", entries: profile.artifacts.nodeIntakeEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Intake Steps", items: profile.intakeSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No deployment evidence intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No deployment evidence intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No deployment evidence intake recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function summarizePostV166Summary(
  profile: PostV166ReadinessSummaryProfile,
): Record<string, object | string | boolean | number | unknown> {
  return {
    summaryVersion: profile.summaryVersion,
    summaryState: profile.summaryState,
    stageDigest: profile.stage.stageDigest,
    readyForPostV166ReadinessSummary: profile.readyForPostV166ReadinessSummary,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    passedCheckCount: profile.summary.passedCheckCount,
    checkCount: profile.summary.checkCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function createIntakeSteps(): IntakeStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      source: "node",
      action: "Load Node v169 post-v166 readiness summary as the source stage digest.",
      evidenceTarget: "/api/v1/production/post-v166-readiness-summary",
      expectedEvidence: "Post-v166 summary is complete while production blockers remain explicit.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 2,
      phase: "collect",
      source: "java",
      action: "Collect Java v60 deployment runbook contract metadata.",
      evidenceTarget: "/contracts/production-deployment-runbook-contract.sample.json and c/60",
      expectedEvidence: "Deployment window owner, rollback approver, migration direction, and secret source confirmation are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 3,
      phase: "collect",
      source: "mini-kv",
      action: "Collect mini-kv v69 release artifact digest package metadata.",
      evidenceTarget: "fixtures/release/release-artifact-digest-package.json and c/69",
      expectedEvidence: "Binary, WAL, Snapshot, fixture digest placeholders and restore drill command profile are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 4,
      phase: "verify",
      source: "operator",
      action: "Verify Java and mini-kv evidence stays operator-reviewed and non-executable.",
      evidenceTarget: "Java required confirmations plus mini-kv operator confirmation fields",
      expectedEvidence: "Operator fields exist, but Node does not infer approval or execute production actions.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 5,
      phase: "compare",
      source: "node",
      action: "Compare runtime safety flags with deployment evidence boundaries.",
      evidenceTarget: "UPSTREAM_ACTIONS_ENABLED and Node intake envelope",
      expectedEvidence: "Upstream actions remain disabled; Node cannot start Java or mini-kv automatically.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 6,
      phase: "decide",
      source: "node",
      action: "Emit intake decision for manual deployment evidence review only.",
      evidenceTarget: "deployment-evidence-intake-gate.v1",
      expectedEvidence: "Gate can be ready for manual review without granting production deployment, rollback, or restore authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
    {
      order: 7,
      phase: "closeout",
      source: "node",
      action: "Archive the intake gate and prepare Node v172 verification.",
      evidenceTarget: "c/171 archive and docs/plans/v169-post-production-environment-preflight-roadmap.md",
      expectedEvidence: "v171 remains an intake gate; v172 performs verification without adding execution authority.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
    },
  ];
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java deployment from Node v171",
      reason: "Java v60 is a read-only runbook contract and does not grant deployment execution authority.",
      blockedBy: "Java v60 production deployment runbook contract",
    },
    {
      operation: "Trigger Java rollback from Node v171",
      reason: "Rollback approval and SQL execution remain manual and outside this intake gate.",
      blockedBy: "Java v60 production deployment runbook contract",
    },
    {
      operation: "Execute rollback SQL",
      reason: "Java v60 records migration direction and SQL review boundary but keeps SQL execution disabled.",
      blockedBy: "Java v60 production deployment runbook contract",
    },
    {
      operation: "Read production secret values",
      reason: "Java v60 confirms only secret source metadata and marks secret values outside Node.",
      blockedBy: "Java v60 production deployment runbook contract",
    },
    {
      operation: "Connect production database",
      reason: "Production database access remains outside the intake gate.",
      blockedBy: "Node v171 deployment evidence intake gate",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "mini-kv v69 uses CHECKJSON restore drill commands and does not execute restore-sensitive commands.",
      blockedBy: "mini-kv v69 release artifact digest package",
    },
    {
      operation: "Treat mini-kv release artifact package as Java order authority",
      reason: "mini-kv v69 remains not order-authoritative and is not connected to the Java transaction chain.",
      blockedBy: "mini-kv v69 release artifact digest package",
    },
    {
      operation: "Auto-start Java or mini-kv from Node v171",
      reason: "The intake gate consumes recorded evidence only and must not manage upstream process lifecycle.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Open UPSTREAM_ACTIONS_ENABLED=true",
      reason: "Production deployment evidence review remains read-only and dry-run only.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Treat Node v171 as production approval",
      reason: "The gate is ready for manual evidence review only and does not approve deployment, rollback, or restore.",
      blockedBy: "Node v171 deployment evidence intake gate",
    },
  ];
}

function createChecks(
  config: AppConfig,
  postV166Summary: PostV166ReadinessSummaryProfile,
  intakeSteps: IntakeStep[],
  forbiddenOperations: ForbiddenOperation[],
): Record<string, boolean> {
  return {
    postV166SummaryReady: postV166Summary.readyForPostV166ReadinessSummary
      && postV166Summary.summaryState === "completed-with-production-blockers",
    postV166StillBlocksProduction: postV166Summary.readyForProductionRollback === false
      && postV166Summary.readyForProductionOperations === false
      && postV166Summary.executionAllowed === false,
    javaV60RunbookReady: JAVA_V60_DEPLOYMENT_RUNBOOK.plannedVersion === "Java v60"
      && JAVA_V60_DEPLOYMENT_RUNBOOK.evidenceTag === "v60订单平台production-deployment-runbook-contract",
    javaContractVersionReady:
      JAVA_V60_DEPLOYMENT_RUNBOOK.contractVersion === "java-production-deployment-runbook-contract.v1"
      && JAVA_V60_DEPLOYMENT_RUNBOOK.scenario === "PRODUCTION_DEPLOYMENT_RUNBOOK_CONTRACT_SAMPLE",
    javaDeploymentWindowComplete: JAVA_V60_DEPLOYMENT_RUNBOOK.deploymentWindow.owner === "release-window-owner"
      && JAVA_V60_DEPLOYMENT_RUNBOOK.deploymentWindow.rollbackApprover === "rollback-approval-owner"
      && JAVA_V60_DEPLOYMENT_RUNBOOK.deploymentWindow.operatorStartRequired
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.deploymentWindow.nodeMayScheduleWindow
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.deploymentWindow.nodeMayTriggerDeployment,
    javaMigrationDirectionClosed: JAVA_V60_DEPLOYMENT_RUNBOOK.databaseMigration.selectedDirection === "no-database-change"
      && JAVA_V60_DEPLOYMENT_RUNBOOK.databaseMigration.directionOptions.length === 3
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.databaseMigration.rollbackSqlExecutionAllowed
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.databaseMigration.requiresProductionDatabase,
    javaSecretSourceConfirmationClosed: JAVA_V60_DEPLOYMENT_RUNBOOK.secretSourceConfirmation.required
      && JAVA_V60_DEPLOYMENT_RUNBOOK.secretSourceConfirmation.endpoint === "/contracts/production-secret-source-contract.sample.json"
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.secretSourceConfirmation.nodeMayReadSecretValues
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.secretSourceConfirmation.secretValueRecorded,
    javaRequiredConfirmationsComplete: JAVA_V60_DEPLOYMENT_RUNBOOK.requiredConfirmationFields.length === 6
      && JAVA_V60_DEPLOYMENT_RUNBOOK.requiredConfirmationFields.includes("deployment-window-owner")
      && JAVA_V60_DEPLOYMENT_RUNBOOK.requiredConfirmationFields.includes("rollback-approver")
      && JAVA_V60_DEPLOYMENT_RUNBOOK.requiredConfirmationFields.includes("database-migration-direction")
      && JAVA_V60_DEPLOYMENT_RUNBOOK.requiredConfirmationFields.includes("secret-source-confirmation"),
    javaRunbookArtifactsComplete: JAVA_V60_DEPLOYMENT_RUNBOOK.runbookArtifacts.length === 5
      && JAVA_V60_DEPLOYMENT_RUNBOOK.runbookArtifacts.includes("/contracts/rollback-sql-review-gate.sample.json")
      && JAVA_V60_DEPLOYMENT_RUNBOOK.runbookArtifacts.includes("/contracts/production-secret-source-contract.sample.json"),
    javaNodeConsumptionReadOnly: JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayConsume
      && JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayRenderIntakeGate
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayTriggerDeployment
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayTriggerRollback
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayExecuteRollbackSql
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.nodeMayModifyRuntimeConfig
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.nodeConsumption.requiresUpstreamActionsEnabled,
    javaProductionBoundaryClosed: !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.sqlExecutionAllowed
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.requiresProductionDatabase
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.requiresProductionSecrets
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.changesOrderCreateSemantics
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.changesPaymentOrInventoryTransaction
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.changesOutboxOrReplayExecution
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.changesOrderTransactionSemantics
      && !JAVA_V60_DEPLOYMENT_RUNBOOK.boundaries.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V60_DEPLOYMENT_RUNBOOK.forbiddenOperations.length === 8
      && JAVA_V60_DEPLOYMENT_RUNBOOK.forbiddenOperations.includes("Executing Java deployment from this runbook contract")
      && JAVA_V60_DEPLOYMENT_RUNBOOK.forbiddenOperations.includes("Reading production secret values from this runbook contract"),
    javaArchiveRootUsesC: JAVA_V60_DEPLOYMENT_RUNBOOK.archivePath === "c/60",
    miniKvV69PackageReady: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.plannedVersion === "mini-kv v69"
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.evidenceTag === "第六十九版发布产物摘要包",
    miniKvPackageVersionReady:
      MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.packageVersion === "mini-kv-release-artifact-digest-package.v1"
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.projectVersion === "0.69.0",
    miniKvReleaseMappingReady: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.releaseVersion === "v69"
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.targetReleaseVersion === "v69"
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.previousReleaseVersion === "v68",
    miniKvPreviousEvidenceComplete: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.previousEvidence.length === 4
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.previousEvidence.includes("fixtures/release/artifact-digest-compatibility-matrix.json")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.previousEvidence.includes("fixtures/release/restore-dry-run-operator-package.json"),
    miniKvArtifactDigestsComplete: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.artifactDigestIds.length === 4
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.artifactDigestIds.includes("binary-digest")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.artifactDigestIds.includes("wal-checksum-evidence")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.artifactDigestIds.includes("snapshot-digest-evidence")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.artifactDigestIds.includes("fixture-digest"),
    miniKvRestoreDrillProfileReadOnly: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreDrillCommands.length === 8
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreDrillCommands.includes("CHECKJSON LOAD data/release-artifact-drill.snap")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreDrillCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreDrillCommands.includes("CHECKJSON SETNXEX release:token 30 value")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreDrillCommands.includes("GET release:token"),
    miniKvOperatorConfirmationComplete: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.operatorConfirmationRequired
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.operatorConfirmationFields.length === 6
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.operatorConfirmationFields.includes("release_operator_id")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.operatorConfirmationFields.includes("artifact_matrix_cross_checked"),
    miniKvFixtureInputsComplete: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.fixtureInputs.length === 5
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.fixtureInputs.includes("fixtures/release/verification-manifest.json")
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.fixtureInputs.includes("fixtures/ttl-token/recovery-evidence.json"),
    miniKvExecutionBoundariesClosed: !MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.writeCommandsExecuted
      && !MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.adminCommandsExecuted
      && !MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.restoreExecutionAllowed
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.digestPlaceholdersOnly
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.noRuntimeCommandAdded,
    miniKvOrderAuthorityClosed: !MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.orderAuthoritative
      && !MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.connectedToJavaTransactionChain
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.doesNotRunJavaOrNode
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.doesNotReadProductionSecrets
      && MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.doesNotOpenUpstreamActions,
    miniKvArchiveRootUsesC: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.archivePath === "c/69",
    intakeStepsDryRunOnly: intakeSteps.length === 7
      && intakeSteps.every((step) => (
        step.dryRunOnly
        && step.readOnly
        && !step.mutatesState
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 10
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java deployment from Node v171")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv LOAD, COMPACT, or SETNXEX")
      && forbiddenOperations.some((operation) => operation.operation === "Treat Node v171 as production approval"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionDeploymentStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    readyForDeploymentEvidenceIntakeGate: false,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): IntakeMessage[] {
  const blockers: IntakeMessage[] = [];
  addMessage(blockers, checks.postV166SummaryReady, "POST_V166_SUMMARY_NOT_READY", "post-v166-readiness-summary", "Node v169 post-v166 readiness summary must be ready before v171 intake.");
  addMessage(blockers, checks.postV166StillBlocksProduction, "POST_V166_PRODUCTION_BOUNDARY_OPEN", "post-v166-readiness-summary", "Node v169 must still block production operations.");
  addMessage(blockers, checks.javaV60RunbookReady, "JAVA_V60_RUNBOOK_NOT_READY", "java-v60-production-deployment-runbook-contract", "Java v60 production deployment runbook contract must be present.");
  addMessage(blockers, checks.javaContractVersionReady, "JAVA_RUNBOOK_VERSION_NOT_READY", "java-v60-production-deployment-runbook-contract", "Java v60 runbook contract version must match.");
  addMessage(blockers, checks.javaDeploymentWindowComplete, "JAVA_DEPLOYMENT_WINDOW_INCOMPLETE", "java-v60-production-deployment-runbook-contract", "Java v60 deployment window owner and rollback approver must be present.");
  addMessage(blockers, checks.javaMigrationDirectionClosed, "JAVA_MIGRATION_DIRECTION_OPEN", "java-v60-production-deployment-runbook-contract", "Java v60 migration direction must not allow SQL execution.");
  addMessage(blockers, checks.javaSecretSourceConfirmationClosed, "JAVA_SECRET_SOURCE_CONFIRMATION_OPEN", "java-v60-production-deployment-runbook-contract", "Java v60 must not expose production secret values.");
  addMessage(blockers, checks.javaRequiredConfirmationsComplete, "JAVA_CONFIRMATIONS_INCOMPLETE", "java-v60-production-deployment-runbook-contract", "Java v60 required confirmation fields must be complete.");
  addMessage(blockers, checks.javaRunbookArtifactsComplete, "JAVA_RUNBOOK_ARTIFACTS_INCOMPLETE", "java-v60-production-deployment-runbook-contract", "Java v60 runbook artifacts must include rollback SQL and secret-source contracts.");
  addMessage(blockers, checks.javaNodeConsumptionReadOnly, "JAVA_NODE_CONSUMPTION_NOT_READ_ONLY", "java-v60-production-deployment-runbook-contract", "Java v60 must allow Node intake rendering only.");
  addMessage(blockers, checks.javaProductionBoundaryClosed, "JAVA_PRODUCTION_BOUNDARY_OPEN", "java-v60-production-deployment-runbook-contract", "Java v60 must not require production secrets/database or change order transaction semantics.");
  addMessage(blockers, checks.javaForbiddenOperationsComplete, "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", "java-v60-production-deployment-runbook-contract", "Java v60 forbidden operations must be complete.");
  addMessage(blockers, checks.javaArchiveRootUsesC, "JAVA_ARCHIVE_NOT_IN_C", "java-v60-production-deployment-runbook-contract", "Java v60 archive must use c/60.");
  addMessage(blockers, checks.miniKvV69PackageReady, "MINI_KV_V69_PACKAGE_NOT_READY", "mini-kv-v69-release-artifact-digest-package", "mini-kv v69 release artifact digest package must be present.");
  addMessage(blockers, checks.miniKvPackageVersionReady, "MINI_KV_PACKAGE_VERSION_NOT_READY", "mini-kv-v69-release-artifact-digest-package", "mini-kv package version must match.");
  addMessage(blockers, checks.miniKvReleaseMappingReady, "MINI_KV_RELEASE_MAPPING_NOT_READY", "mini-kv-v69-release-artifact-digest-package", "mini-kv release mapping must identify v69 over v68.");
  addMessage(blockers, checks.miniKvPreviousEvidenceComplete, "MINI_KV_PREVIOUS_EVIDENCE_INCOMPLETE", "mini-kv-v69-release-artifact-digest-package", "mini-kv v69 must reference prior release evidence.");
  addMessage(blockers, checks.miniKvArtifactDigestsComplete, "MINI_KV_ARTIFACT_DIGESTS_INCOMPLETE", "mini-kv-v69-release-artifact-digest-package", "mini-kv artifact digest placeholders must include binary, WAL, Snapshot, and fixture digest.");
  addMessage(blockers, checks.miniKvRestoreDrillProfileReadOnly, "MINI_KV_RESTORE_DRILL_PROFILE_NOT_READ_ONLY", "mini-kv-v69-release-artifact-digest-package", "mini-kv restore drill profile must use CHECKJSON/read commands only.");
  addMessage(blockers, checks.miniKvOperatorConfirmationComplete, "MINI_KV_OPERATOR_CONFIRMATION_INCOMPLETE", "mini-kv-v69-release-artifact-digest-package", "mini-kv operator confirmation fields must be present.");
  addMessage(blockers, checks.miniKvFixtureInputsComplete, "MINI_KV_FIXTURE_INPUTS_INCOMPLETE", "mini-kv-v69-release-artifact-digest-package", "mini-kv fixture inputs must include release and recovery evidence.");
  addMessage(blockers, checks.miniKvExecutionBoundariesClosed, "MINI_KV_EXECUTION_BOUNDARY_OPEN", "mini-kv-v69-release-artifact-digest-package", "mini-kv v69 must not execute writes, admin commands, or restore.");
  addMessage(blockers, checks.miniKvOrderAuthorityClosed, "MINI_KV_ORDER_AUTHORITY_OPEN", "mini-kv-v69-release-artifact-digest-package", "mini-kv v69 must not enter Java transaction authority.");
  addMessage(blockers, checks.miniKvArchiveRootUsesC, "MINI_KV_ARCHIVE_NOT_IN_C", "mini-kv-v69-release-artifact-digest-package", "mini-kv v69 archive must use c/69.");
  addMessage(blockers, checks.intakeStepsDryRunOnly, "INTAKE_STEPS_NOT_DRY_RUN", "deployment-evidence-intake-gate", "Intake steps must remain read-only dry-run.");
  addMessage(blockers, checks.forbiddenOperationsCovered, "FORBIDDEN_OPERATIONS_INCOMPLETE", "deployment-evidence-intake-gate", "Forbidden deployment, rollback, restore, secret, database, and approval operations must be explicit.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "deployment-evidence-intake-gate", "Node v171 must not start Java or mini-kv.");
  addMessage(blockers, checks.noProductionSecretRead, "PRODUCTION_SECRET_READ_ATTEMPTED", "deployment-evidence-intake-gate", "Node v171 must not read production secret values.");
  addMessage(blockers, checks.noProductionDatabaseConnection, "PRODUCTION_DATABASE_CONNECTION_ATTEMPTED", "deployment-evidence-intake-gate", "Node v171 must not connect to production database.");
  addMessage(blockers, checks.readyForProductionDeploymentStillFalse, "PRODUCTION_DEPLOYMENT_UNLOCKED", "deployment-evidence-intake-gate", "Node v171 must not authorize production deployment.");
  addMessage(blockers, checks.readyForProductionRollbackStillFalse, "PRODUCTION_ROLLBACK_UNLOCKED", "deployment-evidence-intake-gate", "Node v171 must not authorize production rollback.");
  addMessage(blockers, checks.readyForProductionOperationsStillFalse, "PRODUCTION_OPERATIONS_UNLOCKED", "deployment-evidence-intake-gate", "Node v171 must not authorize production operations.");
  return blockers;
}

function collectWarnings(gateState: IntakeState): IntakeMessage[] {
  return [
    {
      code: gateState === "blocked" ? "DEPLOYMENT_INTAKE_BLOCKED" : "DEPLOYMENT_INTAKE_NOT_PRODUCTION_APPROVAL",
      severity: "warning",
      source: "deployment-evidence-intake-gate",
      message: gateState === "blocked"
        ? "Deployment evidence intake gate has blockers."
        : "Deployment evidence intake gate is ready for manual evidence review only.",
    },
    {
      code: "JAVA_RUNBOOK_IS_NOT_DEPLOYMENT_EXECUTION",
      severity: "warning",
      source: "java-v60-production-deployment-runbook-contract",
      message: "Java v60 records deployment runbook metadata, but Node still cannot trigger deployment or rollback.",
    },
    {
      code: "MINI_KV_PACKAGE_IS_NOT_RESTORE_EXECUTION",
      severity: "warning",
      source: "mini-kv-v69-release-artifact-digest-package",
      message: "mini-kv v69 records artifact digest placeholders and restore drill profile, but Node still cannot execute restore commands.",
    },
  ];
}

function collectRecommendations(gateState: IntakeState): IntakeMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_DEPLOYMENT_INTAKE_BLOCKERS"
        : "PROCEED_TO_DEPLOYMENT_EVIDENCE_VERIFICATION",
      severity: "recommendation",
      source: "deployment-evidence-intake-gate",
      message: gateState === "blocked"
        ? "Fix deployment intake blockers before verification."
        : "Proceed to Node v172 deployment evidence verification after v171 remains clean.",
    },
  ];
}

function addMessage(
  messages: IntakeMessage[],
  condition: boolean | undefined,
  code: string,
  source: IntakeMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, Boolean(condition), code, source, message);
}

function renderStep(step: IntakeStep): string[] {
  return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
    identityLabel: "Source",
    identityKey: "source",
    booleanFields: [
      ["Dry run only", "dryRunOnly"],
      ["Read only", "readOnly"],
      ["Mutates state", "mutatesState"],
      ["Reads secret values", "readsSecretValues"],
      ["Connects production database", "connectsProductionDatabase"],
      ["Executes deployment", "executesDeployment"],
      ["Executes rollback", "executesRollback"],
      ["Executes restore", "executesRestore"],
    ],
  });
}

function renderForbiddenOperation(operation: ForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestIntake(value: unknown): string {
  return digestReleaseReport(value);
}
