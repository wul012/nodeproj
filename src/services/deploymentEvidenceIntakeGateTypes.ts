export type IntakeState = "ready-for-manual-deployment-evidence-review" | "blocked";
export type IntakeSource = "node" | "java" | "mini-kv" | "operator";

export interface IntakeMessage {
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

export interface IntakeStep {
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

export interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v171 deployment evidence intake gate"
    | "Node v169 post-v166 readiness summary"
    | "Java v60 production deployment runbook contract"
    | "mini-kv v69 release artifact digest package"
    | "runtime safety";
}

export interface JavaDeploymentRunbookContractReference {
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

export interface MiniKvReleaseArtifactDigestPackageReference {
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
