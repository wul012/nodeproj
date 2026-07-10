export interface JavaRollbackApproverEvidenceReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v65";
  fixtureVersion: "java-rollback-approver-evidence-fixture.v1";
  scenario: "ROLLBACK_APPROVER_EVIDENCE_FIXTURE_SAMPLE";
  fixtureEndpoint: "/contracts/rollback-approver-evidence.fixture.json";
  readOnly: true;
  executionAllowed: false;
  approverEvidence: {
    rollbackApprover: "rollback-approver-placeholder";
    operatorMustReplacePlaceholders: true;
    evidenceStatus: "PENDING_OPERATOR_CONFIRMATION";
  };
  databaseMigration: {
    selectedDirection: "no-database-change";
    rollbackSqlArtifactReference: "rollback-sql-artifact-reference-placeholder";
    rollbackSqlTextEmbedded: false;
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
    productionDatabaseBoundary: "production-database-connection-outside-this-fixture";
  };
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderDecisionRehearsalInput: true;
    nodeMayCreateApprovalDecision: false;
    nodeMayWriteApprovalLedger: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayReadSecretValues: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
    approvalDecisionCreated: false;
    approvalLedgerWriteAllowed: false;
    rollbackExecutionAllowed: false;
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    connectsMiniKv: false;
  };
  requiredEvidenceFieldCount: 6;
  evidenceArtifactCount: 6;
  forbiddenOperations: string[];
}

export interface MiniKvRestoreApprovalBoundaryReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v74";
  boundaryVersion: "mini-kv-restore-approval-boundary.v1";
  projectVersion: "0.74.0";
  releaseVersion: "v74";
  path: "fixtures/release/restore-approval-boundary.json";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  javaTransactionChainConnected: false;
  approvalBoundaryTarget: {
    approvalBoundaryId: "mini-kv-restore-approval-boundary-v74";
    restoreApproverPlaceholder: "operator:<restore-approval-approver>";
    restoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>";
    artifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>";
    javaTransactionChain: "disconnected";
    orderAuthoritative: false;
  };
  restoreApprovalEvidence: {
    fieldCount: 7;
    requiredConfirmationCount: 6;
  };
  checkjsonBoundaryEvidence: {
    commandCount: 8;
    writeCommandsExecuted: false;
    adminCommandsExecuted: false;
    approvalDecisionRehearsalInput: true;
  };
  boundaries: string[];
  pauseConditionCount: 6;
}

export const JAVA_V65_ROLLBACK_APPROVER_EVIDENCE: JavaRollbackApproverEvidenceReference = {
  project: "advanced-order-platform",
  plannedVersion: "Java v65",
  fixtureVersion: "java-rollback-approver-evidence-fixture.v1",
  scenario: "ROLLBACK_APPROVER_EVIDENCE_FIXTURE_SAMPLE",
  fixtureEndpoint: "/contracts/rollback-approver-evidence.fixture.json",
  readOnly: true,
  executionAllowed: false,
  approverEvidence: {
    rollbackApprover: "rollback-approver-placeholder",
    operatorMustReplacePlaceholders: true,
    evidenceStatus: "PENDING_OPERATOR_CONFIRMATION",
  },
  databaseMigration: {
    selectedDirection: "no-database-change",
    rollbackSqlArtifactReference: "rollback-sql-artifact-reference-placeholder",
    rollbackSqlTextEmbedded: false,
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    productionDatabaseBoundary: "production-database-connection-outside-this-fixture",
  },
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderDecisionRehearsalInput: true,
    nodeMayCreateApprovalDecision: false,
    nodeMayWriteApprovalLedger: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayReadSecretValues: false,
    requiresUpstreamActionsEnabled: false,
  },
  boundaries: {
    approvalDecisionCreated: false,
    approvalLedgerWriteAllowed: false,
    rollbackExecutionAllowed: false,
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    connectsMiniKv: false,
  },
  requiredEvidenceFieldCount: 6,
  evidenceArtifactCount: 6,
  forbiddenOperations: [
    "Creating a real approval decision from this fixture",
    "Writing approval ledger entries from this fixture",
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
  ],
};

export const MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY: MiniKvRestoreApprovalBoundaryReference = {
  project: "mini-kv",
  plannedVersion: "mini-kv v74",
  boundaryVersion: "mini-kv-restore-approval-boundary.v1",
  projectVersion: "0.74.0",
  releaseVersion: "v74",
  path: "fixtures/release/restore-approval-boundary.json",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  javaTransactionChainConnected: false,
  approvalBoundaryTarget: {
    approvalBoundaryId: "mini-kv-restore-approval-boundary-v74",
    restoreApproverPlaceholder: "operator:<restore-approval-approver>",
    restoreTargetPlaceholder: "restore-target:<operator-approved-restore-target>",
    artifactDigestPlaceholder: "sha256:<operator-approved-restore-artifact-digest>",
    javaTransactionChain: "disconnected",
    orderAuthoritative: false,
  },
  restoreApprovalEvidence: {
    fieldCount: 7,
    requiredConfirmationCount: 6,
  },
  checkjsonBoundaryEvidence: {
    commandCount: 8,
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    approvalDecisionRehearsalInput: true,
  },
  boundaries: [
    "restore approval boundary fixture only",
    "approval ledger not written",
    "Java transaction chain disconnected",
    "order_authoritative=false evidence only",
    "does not execute restore",
    "does not execute LOAD/COMPACT/SETNXEX",
    "not connected to Java transaction chain",
    "mini-kv remains not Java order authority",
  ],
  pauseConditionCount: 6,
};
