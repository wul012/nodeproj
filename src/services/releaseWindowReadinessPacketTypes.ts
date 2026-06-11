export type PacketState = "ready-for-manual-release-window-review" | "blocked";
export type PacketActor = "operator" | "node" | "java" | "mini-kv";

export interface PacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "release-window-readiness-packet"
    | "deployment-evidence-intake-gate"
    | "deployment-evidence-verification"
    | "java-v61-rollback-approval-record-fixture"
    | "mini-kv-v70-restore-drill-evidence"
    | "runtime-config";
  message: string;
}

export interface ReleaseWindowStep {
  order: number;
  phase: "collect" | "verify" | "compare" | "decide" | "closeout";
  actor: PacketActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  executesRelease: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
}

export interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v173 release window readiness packet"
    | "Node v172 deployment evidence verification"
    | "Java v61 rollback approval record fixture"
    | "mini-kv v70 restore drill evidence"
    | "runtime safety";
}

export interface JavaRollbackApprovalRecordReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v61";
  evidenceTag: "v61订单平台rollback-approval-record-fixture";
  fixtureVersion: "java-rollback-approval-record-fixture.v1";
  scenario: "ROLLBACK_APPROVAL_RECORD_FIXTURE_SAMPLE";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  fixtureEndpoint: "/contracts/rollback-approval-record.fixture.json";
  fixtureSource: "src/main/resources/static/contracts/rollback-approval-record.fixture.json";
  archivePath: "c/61";
  fixtureMode: "READ_ONLY_APPROVAL_RECORD_FIXTURE";
  fixtureGoal: string;
  approvalRecord: {
    reviewer: "rollback-reviewer-placeholder";
    approvalTimestampPlaceholder: "approval-timestamp-placeholder";
    rollbackTarget: "release-tag-or-artifact-version-placeholder";
    approvalStatus: "PENDING_OPERATOR_CONFIRMATION";
    operatorMustReplacePlaceholders: true;
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
  requiredRecordFieldNames: [
    "reviewer",
    "approval-timestamp-placeholder",
    "rollback-target",
    "database-migration-direction",
    "rollback-sql-review-gate",
    "no-secret-value-boundary",
  ];
  recordArtifacts: [
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/rollback-sql-review-gate.sample.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
  ];
  noSecretValueBoundaries: [
    "Record fixture stores metadata only",
    "Secret values must not be read by Java or Node when rendering this record",
    "Secret values must not be embedded in approval record JSON",
    "Node may render the release window packet only",
  ];
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderReleaseWindowPacket: true;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayModifyRuntimeConfig: false;
    nodeMayReadSecretValues: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
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
  forbiddenOperations: [
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
    "Embedding secret values in approval record JSON",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ];
  readOnlyEvidence: true;
  executionAllowed: false;
}

export interface MiniKvRestoreDrillEvidenceReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v70";
  evidenceTag: "第七十版恢复演练证据";
  drillVersion: "mini-kv-restore-drill-evidence.v1";
  evidencePath: "fixtures/release/restore-drill-evidence.json";
  archivePath: "c/70";
  projectVersion: "0.70.0";
  releaseVersion: "v70";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  noRuntimeCommandAdded: true;
  restoreDrillTarget: {
    targetReleaseVersion: "v70";
    currentReleaseVersion: "v70";
    previousEvidence: [
      "fixtures/release/verification-manifest.json",
      "fixtures/release/release-artifact-digest-package.json",
      "fixtures/release/artifact-digest-compatibility-matrix.json",
      "fixtures/release/restore-dry-run-operator-package.json",
    ];
    digestComparisonPlaceholder: "sha256:<operator-recorded-restore-drill-digest>";
    comparisonBasis: [
      "release artifact digest package v69",
      "artifact digest compatibility matrix v68",
    ];
    operatorConfirmationRequired: true;
  };
  restoreDrillCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/restore-drill.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX restore:drill-token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET restore:drill-token",
    "QUIT",
  ];
  restoreDrillExpected: [
    "INFOJSON version matches 0.70.0",
    "CHECKJSON LOAD reports store_replace_from_snapshot without executing LOAD",
    "CHECKJSON COMPACT reports wal_rewrite_when_enabled without executing COMPACT",
    "CHECKJSON SETNXEX reports write risks without token claim",
    "STORAGEJSON keeps order_authoritative=false",
    "GET restore:drill-token returns (nil)",
  ];
  writeCommandsExecuted: false;
  adminCommandsExecuted: false;
  operatorConfirmation: {
    required: true;
    fields: [
      "restore_operator_id",
      "restore_drill_target_reviewed_at",
      "digest_comparison_recorded_at",
      "fixture_digest_recorded_at",
      "restore_drill_profile_reviewed",
      "boundary_reviewed",
    ];
  };
  fixtureInputs: string[];
  boundaries: string[];
}

export interface ReleaseWindowReadinessPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "release-window-readiness-packet.v1";
  packetState: PacketState;
  readyForReleaseWindowReadinessPacket: boolean;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  packet: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  releaseWindowSteps: ReleaseWindowStep[];
  forbiddenOperations: ForbiddenOperation[];
  summary: Record<string, number>;
  productionBlockers: PacketMessage[];
  warnings: PacketMessage[];
  recommendations: PacketMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}
