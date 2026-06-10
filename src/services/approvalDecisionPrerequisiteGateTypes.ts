type GateState = "ready-for-approval-decision-prerequisite-review" | "blocked";
type PrerequisiteActor = "node" | "operator" | "release-manager" | "java" | "mini-kv";

export interface GateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "approval-decision-prerequisite-gate"
    | "production-release-pre-approval-packet"
    | "java-v64-release-operator-signoff-fixture"
    | "mini-kv-v73-retained-restore-artifact-digest"
    | "runtime-config";
  message: string;
}

export interface JavaReleaseOperatorSignoffFixtureReference {
  project: "advanced-order-platform";
  plannedVersion: "Java v64";
  evidenceTag: "v64 release operator signoff fixture";
  fixtureVersion: "java-release-operator-signoff-fixture.v1";
  scenario: "RELEASE_OPERATOR_SIGNOFF_FIXTURE_SAMPLE";
  sourceEvidenceEndpoint: "/api/v1/ops/evidence";
  fixtureEndpoint: "/contracts/release-operator-signoff.fixture.json";
  fixtureMode: "READ_ONLY_RELEASE_OPERATOR_SIGNOFF_FIXTURE";
  signoffRecord: {
    releaseOperator: "release-operator-placeholder";
    rollbackApprover: "rollback-approver-placeholder";
    releaseWindow: "release-window-placeholder";
    artifactTarget: "release-tag-or-artifact-version-placeholder";
    operatorSignoffPlaceholder: "operator-signoff-placeholder";
    operatorMustReplacePlaceholders: true;
    signoffStatus: "PENDING_OPERATOR_SIGNOFF_CONFIRMATION";
  };
  requiredSignoffFields: Array<{
    name: string;
    required: true;
    nodeMayInfer?: false;
    nodeMayCreateApprovalDecision?: false;
    nodeMayWriteAuditExport?: false;
    nodeMayReadSecretValues?: false;
    expectedEndpoint?: string;
  }>;
  signoffArtifacts: string[];
  noSecretValueBoundaries: string[];
  nodeConsumption: {
    nodeMayConsume: true;
    nodeMayRenderApprovalPrerequisiteGate: true;
    nodeMayCreateApprovalDecision: false;
    nodeMayWriteApprovalLedger: false;
    nodeMayTriggerDeployment: false;
    nodeMayTriggerRollback: false;
    nodeMayExecuteRollbackSql: false;
    nodeMayReadSecretValues: false;
    requiresUpstreamActionsEnabled: false;
  };
  boundaries: {
    deploymentExecutionAllowed: false;
    rollbackExecutionAllowed: false;
    rollbackSqlExecutionAllowed: false;
    approvalDecisionCreated: false;
    approvalLedgerWriteAllowed: false;
    requiresProductionDatabase: false;
    requiresProductionSecrets: false;
    changesOrderCreateSemantics: false;
    changesPaymentOrInventoryTransaction: false;
    changesOutboxOrReplayExecution: false;
    changesOrderTransactionSemantics: false;
    connectsMiniKv: false;
  };
  forbiddenOperations: string[];
  readOnly: true;
  executionAllowed: false;
}

export interface MiniKvRetainedRestoreArtifactDigestReference {
  project: "mini-kv";
  plannedVersion: "mini-kv v73";
  evidenceTag: "v73 retained restore artifact digest fixture";
  digestVersion: "mini-kv-retained-restore-artifact-digest.v1";
  projectVersion: "0.73.0";
  releaseVersion: "v73";
  path: "fixtures/release/retained-restore-artifact-digest.json";
  readOnly: true;
  executionAllowed: false;
  restoreExecutionAllowed: false;
  orderAuthoritative: false;
  consumerHint: "Node v180 approval decision prerequisite gate";
  digestTarget: {
    targetReleaseVersion: "v73";
    sourceRetentionFixture: "fixtures/release/restore-evidence-retention.json";
    sourceVerificationManifest: "fixtures/release/verification-manifest.json";
    retentionId: "mini-kv-retained-restore-artifact-digest-v73";
    restoreTargetPlaceholder: "restore-target:<operator-recorded-restore-target>";
    restoreArtifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>";
    snapshotReviewDigestPlaceholder: "sha256:<operator-retained-snapshot-review-digest>";
    walReviewDigestPlaceholder: "sha256:<operator-retained-wal-review-digest>";
    retentionOwner: "operator:<retained-restore-artifact-owner>";
    boundary: string;
  };
  retainedDigestEvidence: {
    fields: string[];
    requiredConfirmations: string[];
    storagePolicy: string;
  };
  checkjsonDigestEvidence: {
    commands: string[];
    expected: string[];
    writeCommandsExecuted: false;
    adminCommandsExecuted: false;
    approvalPrerequisiteInput: true;
  };
  fixtureInputs: string[];
  boundaries: string[];
  diagnostics: {
    warnings: string[];
    pauseConditions: string[];
  };
}

export interface PrerequisiteSignal {
  id: string;
  source:
    | "production-release-pre-approval-packet"
    | "java-v64-release-operator-signoff-fixture"
    | "mini-kv-v73-retained-restore-artifact-digest";
  status: "present-for-dry-run" | "placeholder-requires-operator" | "explicitly-blocked-for-production";
  evidenceTarget: string;
  nodeMayInfer: false;
  nodeMayCreateApprovalDecision: false;
}

export interface RemainingApprovalBlocker {
  id: string;
  requiredBefore: "approval-decision" | "production-release" | "production-rollback" | "production-restore";
  reason: string;
  blocksRealApprovalDecision: true;
  blocksDryRunEnvelope: false;
}

export interface PrerequisiteStep {
  order: number;
  phase: "collect" | "compare" | "verify" | "preserve" | "stop";
  actor: PrerequisiteActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  createsApprovalDecision: false;
  writesApprovalLedger: false;
  executesRelease: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
}

export interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v180 approval decision prerequisite gate"
    | "Node v179 pre-approval packet"
    | "Java v64 release operator signoff fixture"
    | "mini-kv v73 retained restore artifact digest"
    | "runtime safety";
}

export interface ApprovalDecisionPrerequisiteGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "approval-decision-prerequisite-gate.v1";
  gateState: GateState;
  readyForApprovalDecisionPrerequisiteGate: boolean;
  readyForApprovalLedgerDryRunEnvelope: boolean;
  readyForApprovalDecision: false;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  prerequisiteReviewOnly: true;
  executionAllowed: false;
  gate: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  prerequisiteSignals: PrerequisiteSignal[];
  remainingApprovalBlockers: RemainingApprovalBlocker[];
  prerequisiteSteps: PrerequisiteStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: GateMessage[];
  warnings: GateMessage[];
  recommendations: GateMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

export type { GateState, PrerequisiteActor };
