export interface JavaRollbackApprovalHandoffReference {
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

export interface MiniKvRestoreCompatibilityHandoffReference {
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

export const JAVA_V57_ROLLBACK_HANDOFF: JavaRollbackApprovalHandoffReference = Object.freeze({
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

export const MINI_KV_V66_RESTORE_HANDOFF: MiniKvRestoreCompatibilityHandoffReference = Object.freeze({
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
