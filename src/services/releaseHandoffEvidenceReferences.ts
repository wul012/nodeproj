interface JavaReleaseHandoffChecklistReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v62";
  fixtureVersion: "java-release-handoff-checklist-fixture.v1";
  scenario: "RELEASE_HANDOFF_CHECKLIST_FIXTURE_SAMPLE";
  fixtureEndpoint: "/contracts/release-handoff-checklist.fixture.json";
  fixtureSource: "src/main/resources/static/contracts/release-handoff-checklist.fixture.json";
  archivePath: "c/62";
  readOnly: true;
  executionAllowed: false;
  releaseChecklist: {
    releaseOperator: "release-operator-placeholder";
    rollbackApprover: "rollback-approver-placeholder";
    artifactTarget: "release-tag-or-artifact-version-placeholder";
    operatorMustReplacePlaceholders: true;
    handoffStatus: "PENDING_OPERATOR_CONFIRMATION";
  };
  databaseMigration: {
    selectedDirection: "no-database-change";
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
  };
  secretSourceConfirmation: {
    endpoint: "/contracts/production-secret-source-contract.sample.json";
    required: true;
    secretValueRecorded: false;
    nodeMayReadSecretValues: false;
  };
  requiredChecklistFieldNames: string[];
  checklistArtifacts: string[];
  noSecretValueBoundaries: string[];
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderReleaseHandoffReview: true;
    nodeMayTriggerDeployment: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayModifyRuntimeConfig: false;
    nodeMayReadSecretValues: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
    deploymentExecutionAllowed: false;
    rollbackExecutionAllowed: false;
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    changesOrderCreateSemantics: false;
    changesPaymentOrInventoryTransaction: false;
    changesOutboxOrReplayExecution: false;
    changesOrderTransactionSemantics: false;
    connectsMiniKv: false;
  };
  forbiddenOperations: string[];
}

interface MiniKvRestoreHandoffChecklistReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v71";
  checklistVersion: "mini-kv-restore-handoff-checklist.v1";
  evidencePath: "fixtures/release/restore-handoff-checklist.json";
  archivePath: "c/71";
  projectVersion: "0.71.0";
  releaseVersion: "v71";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  handoffTarget: {
    targetReleaseVersion: "v71";
    currentReleaseVersion: "v71";
    previousEvidence: string[];
    artifactDigestTarget: "sha256:<operator-recorded-restore-artifact-digest>";
    snapshotReviewPlaceholder: "sha256:<operator-recorded-snapshot-review-digest>";
    walReviewPlaceholder: "sha256:<operator-recorded-wal-review-digest>";
    operatorConfirmationRequired: true;
  };
  handoffChecklist: {
    fields: string[];
    requiredConfirmations: string[];
    placeholderPolicy: string;
  };
  checkjsonRiskConfirmation: {
    commands: string[];
    expected: string[];
    writeCommandsExecuted: false;
    adminCommandsExecuted: false;
  };
  fixtureInputs: string[];
  boundaries: string[];
}

export const JAVA_V62_RELEASE_HANDOFF_CHECKLIST = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v62",
  fixtureVersion: "java-release-handoff-checklist-fixture.v1",
  scenario: "RELEASE_HANDOFF_CHECKLIST_FIXTURE_SAMPLE",
  fixtureEndpoint: "/contracts/release-handoff-checklist.fixture.json",
  fixtureSource: "src/main/resources/static/contracts/release-handoff-checklist.fixture.json",
  archivePath: "c/62",
  readOnly: true,
  executionAllowed: false,
  releaseChecklist: {
    releaseOperator: "release-operator-placeholder",
    rollbackApprover: "rollback-approver-placeholder",
    artifactTarget: "release-tag-or-artifact-version-placeholder",
    operatorMustReplacePlaceholders: true,
    handoffStatus: "PENDING_OPERATOR_CONFIRMATION",
  },
  databaseMigration: {
    selectedDirection: "no-database-change",
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
  },
  secretSourceConfirmation: {
    endpoint: "/contracts/production-secret-source-contract.sample.json",
    required: true,
    secretValueRecorded: false,
    nodeMayReadSecretValues: false,
  },
  requiredChecklistFieldNames: [
    "release-operator",
    "rollback-approver",
    "artifact-target",
    "database-migration-direction",
    "secret-source-confirmation",
    "deployment-runbook-contract",
    "rollback-approval-record-fixture",
    "no-secret-value-boundary",
  ],
  checklistArtifacts: [
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-verification-manifest.sample.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
    "/contracts/rollback-approval-record.fixture.json",
    "/contracts/rollback-sql-review-gate.sample.json",
  ],
  noSecretValueBoundaries: [
    "Checklist fixture stores metadata only",
    "Secret values must not be read by Java or Node when rendering this checklist",
    "Secret values must not be embedded in handoff checklist JSON",
    "Node may render the release handoff review only",
  ],
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderReleaseHandoffReview: true,
    nodeMayTriggerDeployment: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayModifyRuntimeConfig: false,
    nodeMayReadSecretValues: false,
    requiresUpstreamActionsEnabled: false,
  },
  boundaries: {
    deploymentExecutionAllowed: false,
    rollbackExecutionAllowed: false,
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    changesOrderCreateSemantics: false,
    changesPaymentOrInventoryTransaction: false,
    changesOutboxOrReplayExecution: false,
    changesOrderTransactionSemantics: false,
    connectsMiniKv: false,
  },
  forbiddenOperations: [
    "Executing Java deployment from this fixture",
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
    "Embedding secret values in handoff checklist JSON",
    "Triggering Java deployment from Node",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ],
} as const satisfies JavaReleaseHandoffChecklistReference);

export const MINI_KV_V71_RESTORE_HANDOFF_CHECKLIST = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v71",
  checklistVersion: "mini-kv-restore-handoff-checklist.v1",
  evidencePath: "fixtures/release/restore-handoff-checklist.json",
  archivePath: "c/71",
  projectVersion: "0.71.0",
  releaseVersion: "v71",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  handoffTarget: {
    targetReleaseVersion: "v71",
    currentReleaseVersion: "v71",
    previousEvidence: [
      "fixtures/release/verification-manifest.json",
      "fixtures/release/restore-drill-evidence.json",
      "fixtures/release/release-artifact-digest-package.json",
      "fixtures/release/artifact-digest-compatibility-matrix.json",
    ],
    artifactDigestTarget: "sha256:<operator-recorded-restore-artifact-digest>",
    snapshotReviewPlaceholder: "sha256:<operator-recorded-snapshot-review-digest>",
    walReviewPlaceholder: "sha256:<operator-recorded-wal-review-digest>",
    operatorConfirmationRequired: true,
  },
  handoffChecklist: {
    fields: [
      "restore_operator_id",
      "artifact_digest_target_reviewed_at",
      "snapshot_review_recorded_at",
      "wal_review_recorded_at",
      "checkjson_risk_confirmed",
      "restore_boundary_reviewed",
      "handoff_ready_for_node_review",
    ],
    requiredConfirmations: [
      "restore operator assigned",
      "artifact digest target recorded outside mini-kv",
      "snapshot review placeholder recorded outside mini-kv",
      "WAL review placeholder recorded outside mini-kv",
      "CHECKJSON LOAD/COMPACT/SETNXEX risk profile reviewed",
      "no restore execution requested",
    ],
    placeholderPolicy: "operator records review values outside mini-kv; fixture keeps placeholders only",
  },
  checkjsonRiskConfirmation: {
    commands: [
      "INFOJSON",
      "CHECKJSON LOAD data/handoff-restore.snap",
      "CHECKJSON COMPACT",
      "CHECKJSON SETNXEX restore:handoff-token 30 value",
      "STORAGEJSON",
      "HEALTH",
      "GET restore:handoff-token",
      "QUIT",
    ],
    expected: [
      "INFOJSON version matches 0.71.0",
      "CHECKJSON LOAD reports store_replace_from_snapshot without executing LOAD",
      "CHECKJSON COMPACT reports wal_rewrite_when_enabled without executing COMPACT",
      "CHECKJSON SETNXEX reports write risks without token claim",
      "STORAGEJSON keeps order_authoritative=false",
      "GET restore:handoff-token returns (nil)",
    ],
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
  },
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/restore-drill-evidence.json",
    "fixtures/release/release-artifact-digest-package.json",
    "fixtures/release/artifact-digest-compatibility-matrix.json",
    "fixtures/release/restore-dry-run-operator-package.json",
    "fixtures/release/runtime-artifact-bundle-manifest.json",
    "fixtures/release/restore-compatibility-handoff.json",
    "fixtures/readonly/infojson-empty-inline.json",
    "fixtures/recovery/restart-recovery-evidence.json",
    "fixtures/ttl-token/recovery-evidence.json",
  ],
  boundaries: [
    "restore handoff checklist fixture only",
    "manual checklist only",
    "artifact digest target placeholder only",
    "snapshot/WAL review placeholder only",
    "CHECKJSON risk confirmation only",
    "no runtime command added",
    "does not execute restore",
    "does not execute LOAD/COMPACT/SETNXEX",
    "does not run Java or Node",
    "does not read production secrets",
    "does not open UPSTREAM_ACTIONS_ENABLED",
    "not connected to Java transaction chain",
    "mini-kv remains not Java order authority",
  ],
} as const satisfies MiniKvRestoreHandoffChecklistReference);
