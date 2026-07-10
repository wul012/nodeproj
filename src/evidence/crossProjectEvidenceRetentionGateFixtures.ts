export interface JavaReleaseAuditRetentionFixtureReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v63";
  evidenceTag: "v63 release audit retention fixture";
  fixtureVersion: "java-release-audit-retention-fixture.v1";
  scenario: "RELEASE_AUDIT_RETENTION_FIXTURE_SAMPLE";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  fixtureEndpoint: "/contracts/release-audit-retention.fixture.json";
  fixtureSource: "src/main/resources/static/contracts/release-audit-retention.fixture.json";
  archivePath: "c/63";
  fixtureMode: "READ_ONLY_RELEASE_AUDIT_RETENTION_FIXTURE";
  retentionRecord: {
    retentionId: "release-retention-record-placeholder";
    releaseOperator: "release-operator-placeholder";
    artifactTarget: "release-tag-or-artifact-version-placeholder";
    retentionDays: 180;
    operatorMustReplacePlaceholders: true;
    retentionStatus: "PENDING_EVIDENCE_ARCHIVE_CONFIRMATION";
  };
  evidenceEndpoints: string[];
  auditExportFields: Array<{
    name: string;
    required: true;
    readOnly?: true;
    nodeMayInfer?: false;
    nodeMayWriteExport?: false;
    nodeMayReadSecretValues?: false;
    minimum?: number;
  }>;
  retainedArtifacts: string[];
  noSecretValueBoundaries: string[];
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderRetentionGate: true;
    nodeMayTriggerDeployment: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayWriteAuditExport: false;
    nodeMayReadSecretValues: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
    auditExportReadOnly: true;
    deploymentExecutionAllowed: false;
    rollbackExecutionAllowed: false;
    rollbackSqlExecutionAllowed: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    connectsMiniKv: false;
  };
  forbiddenOperations: string[];
  readOnly: true;
  executionAllowed: false;
}

export interface MiniKvRestoreEvidenceRetentionReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v72";
  evidenceTag: "v72 restore evidence retention";
  retentionVersion: "mini-kv-restore-evidence-retention.v1";
  evidencePath: "fixtures/release/restore-evidence-retention.json";
  archivePath: "c/72";
  projectVersion: "0.72.0";
  releaseVersion: "v72";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  consumerHint: "Node v178 cross-project evidence retention gate";
  retentionTarget: {
    targetReleaseVersion: "v72";
    sourceChecklist: "fixtures/release/restore-handoff-checklist.json";
    sourceVerificationManifest: "fixtures/release/verification-manifest.json";
    retentionId: "mini-kv-restore-retention-v72";
    artifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>";
    snapshotReviewRetention: "sha256:<operator-retained-snapshot-review-digest>";
    walReviewRetention: "sha256:<operator-retained-wal-review-digest>";
    retentionDays: 90;
    operatorIdentityPlaceholder: "operator:<retained-restore-reviewer>";
    boundary: string;
  };
  retainedEvidence: {
    fields: string[];
    requiredConfirmations: string[];
    storagePolicy: string;
  };
  checkjsonRetentionEvidence: {
    commands: string[];
    expected: string[];
    writeCommandsExecuted: false;
    adminCommandsExecuted: false;
    retentionGateInput: true;
  };
  fixtureInputs: string[];
  boundaries: string[];
  diagnostics: {
    warnings: string[];
    pauseConditions: string[];
  };
}

export const JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE: JavaReleaseAuditRetentionFixtureReference = {
  project: "advanced-order-platform",
  plannedVersion: "Java v63",
  evidenceTag: "v63 release audit retention fixture",
  fixtureVersion: "java-release-audit-retention-fixture.v1",
  scenario: "RELEASE_AUDIT_RETENTION_FIXTURE_SAMPLE",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  fixtureEndpoint: "/contracts/release-audit-retention.fixture.json",
  fixtureSource: "src/main/resources/static/contracts/release-audit-retention.fixture.json",
  archivePath: "c/63",
  fixtureMode: "READ_ONLY_RELEASE_AUDIT_RETENTION_FIXTURE",
  retentionRecord: {
    retentionId: "release-retention-record-placeholder",
    releaseOperator: "release-operator-placeholder",
    artifactTarget: "release-tag-or-artifact-version-placeholder",
    retentionDays: 180,
    operatorMustReplacePlaceholders: true,
    retentionStatus: "PENDING_EVIDENCE_ARCHIVE_CONFIRMATION",
  },
  evidenceEndpoints: [
    "/api/v1/ops/evidence",
    "/api/v1/failed-events/replay-evidence-index",
    "/contracts/release-verification-manifest.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-handoff-checklist.fixture.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
  ],
  auditExportFields: [
    { name: "retention-id", required: true, nodeMayInfer: false },
    { name: "release-operator", required: true, nodeMayInfer: false },
    { name: "artifact-target", required: true, nodeMayInfer: false },
    { name: "retention-days", required: true, minimum: 30 },
    { name: "evidence-endpoints", required: true, readOnly: true },
    { name: "audit-export-location-placeholder", required: true, nodeMayWriteExport: false },
    { name: "no-secret-value-boundary", required: true, nodeMayReadSecretValues: false },
  ],
  retainedArtifacts: [
    "/contracts/release-verification-manifest.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-handoff-checklist.fixture.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
  ],
  noSecretValueBoundaries: [
    "Retention fixture stores metadata only",
    "Secret values must not be read by Java or Node when rendering this retention record",
    "Secret values must not be embedded in retained audit evidence",
    "Node may render the cross-project retention gate only",
  ],
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderRetentionGate: true,
    nodeMayTriggerDeployment: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayWriteAuditExport: false,
    nodeMayReadSecretValues: false,
    requiresUpstreamActionsEnabled: false,
  },
  boundaries: {
    auditExportReadOnly: true,
    deploymentExecutionAllowed: false,
    rollbackExecutionAllowed: false,
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    connectsMiniKv: false,
  },
  forbiddenOperations: [
    "Executing Java deployment from this fixture",
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Writing audit export files from Node through this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
    "Embedding secret values in retained audit evidence",
    "Triggering Java deployment from Node",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ],
  readOnly: true,
  executionAllowed: false,
};

export const MINI_KV_V72_RESTORE_EVIDENCE_RETENTION: MiniKvRestoreEvidenceRetentionReference = {
  project: "mini-kv",
  plannedVersion: "mini-kv v72",
  evidenceTag: "v72 restore evidence retention",
  retentionVersion: "mini-kv-restore-evidence-retention.v1",
  evidencePath: "fixtures/release/restore-evidence-retention.json",
  archivePath: "c/72",
  projectVersion: "0.72.0",
  releaseVersion: "v72",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  consumerHint: "Node v178 cross-project evidence retention gate",
  retentionTarget: {
    targetReleaseVersion: "v72",
    sourceChecklist: "fixtures/release/restore-handoff-checklist.json",
    sourceVerificationManifest: "fixtures/release/verification-manifest.json",
    retentionId: "mini-kv-restore-retention-v72",
    artifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
    snapshotReviewRetention: "sha256:<operator-retained-snapshot-review-digest>",
    walReviewRetention: "sha256:<operator-retained-wal-review-digest>",
    retentionDays: 90,
    operatorIdentityPlaceholder: "operator:<retained-restore-reviewer>",
    boundary: "restore evidence retention records review evidence only and does not execute restore",
  },
  retainedEvidence: {
    fields: [
      "restore_checklist_retention_id",
      "artifact_digest_retained_at",
      "snapshot_review_retained_at",
      "wal_review_retained_at",
      "checkjson_risk_evidence_retained_at",
      "retention_owner",
      "retention_expires_at",
      "retention_gate_ready_for_node_review",
    ],
    requiredConfirmations: [
      "restore checklist retained outside mini-kv",
      "artifact digest placeholder retained outside mini-kv",
      "snapshot review placeholder retained outside mini-kv",
      "WAL review placeholder retained outside mini-kv",
      "CHECKJSON LOAD/COMPACT/SETNXEX risk evidence retained",
      "retention owner recorded without production secret value",
    ],
    storagePolicy: "fixture records retention field names and placeholders only; retained artifacts live outside mini-kv",
  },
  checkjsonRetentionEvidence: {
    commands: [
      "INFOJSON",
      "CHECKJSON LOAD data/retention-restore.snap",
      "CHECKJSON COMPACT",
      "CHECKJSON SETNXEX restore:retention-token 30 value",
      "STORAGEJSON",
      "HEALTH",
      "GET restore:retention-token",
      "QUIT",
    ],
    expected: [
      "INFOJSON version matches 0.72.0",
      "CHECKJSON LOAD risk evidence is retained without executing LOAD",
      "CHECKJSON COMPACT risk evidence is retained without executing COMPACT",
      "CHECKJSON SETNXEX risk evidence is retained without token claim",
      "STORAGEJSON keeps order_authoritative=false",
      "GET restore:retention-token returns (nil)",
    ],
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    retentionGateInput: true,
  },
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/restore-handoff-checklist.json",
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
    "restore evidence retention fixture only",
    "retention metadata only",
    "artifact digest placeholder only",
    "snapshot/WAL review retention placeholder only",
    "CHECKJSON risk evidence retention only",
    "no runtime command added",
    "does not execute restore",
    "does not execute LOAD/COMPACT/SETNXEX",
    "does not run Java or Node",
    "does not read production secrets",
    "does not open UPSTREAM_ACTIONS_ENABLED",
    "not connected to Java transaction chain",
    "mini-kv remains not Java order authority",
  ],
  diagnostics: {
    warnings: [
      "Node v178 may consume this fixture only after Java v63, mini-kv v72, and Node v177 are complete",
      "retention fixture is not a restore executor",
      "retained artifacts and operator identity must be verified outside mini-kv before cross-project retention gate review",
    ],
    pauseConditions: [
      "needs production secrets",
      "needs production database access",
      "needs Node to auto-start Java or mini-kv",
      "needs mini-kv LOAD/COMPACT/SETNXEX execution",
      "needs mini-kv in Java transaction consistency chain",
      "retention owner or retained artifact digest is unclear",
    ],
  },
};
