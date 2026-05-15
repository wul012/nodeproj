import type { IncomingHttpHeaders } from "node:http";

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
import {
  loadProductionReleasePreApprovalPacket,
  type ProductionReleasePreApprovalPacketProfile,
} from "./productionReleasePreApprovalPacket.js";

type GateState = "ready-for-approval-decision-prerequisite-review" | "blocked";
type PrerequisiteActor = "node" | "operator" | "release-manager" | "java" | "mini-kv";

interface GateMessage {
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

interface JavaReleaseOperatorSignoffFixtureReference {
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

interface MiniKvRetainedRestoreArtifactDigestReference {
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

interface PrerequisiteSignal {
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

interface RemainingApprovalBlocker {
  id: string;
  requiredBefore: "approval-decision" | "production-release" | "production-rollback" | "production-restore";
  reason: string;
  blocksRealApprovalDecision: true;
  blocksDryRunEnvelope: false;
}

interface PrerequisiteStep {
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

interface ForbiddenOperation {
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

const JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE: JavaReleaseOperatorSignoffFixtureReference = {
  project: "advanced-order-platform",
  plannedVersion: "Java v64",
  evidenceTag: "v64 release operator signoff fixture",
  fixtureVersion: "java-release-operator-signoff-fixture.v1",
  scenario: "RELEASE_OPERATOR_SIGNOFF_FIXTURE_SAMPLE",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  fixtureEndpoint: "/contracts/release-operator-signoff.fixture.json",
  fixtureMode: "READ_ONLY_RELEASE_OPERATOR_SIGNOFF_FIXTURE",
  signoffRecord: {
    releaseOperator: "release-operator-placeholder",
    rollbackApprover: "rollback-approver-placeholder",
    releaseWindow: "release-window-placeholder",
    artifactTarget: "release-tag-or-artifact-version-placeholder",
    operatorSignoffPlaceholder: "operator-signoff-placeholder",
    operatorMustReplacePlaceholders: true,
    signoffStatus: "PENDING_OPERATOR_SIGNOFF_CONFIRMATION",
  },
  requiredSignoffFields: [
    { name: "release-operator", required: true, nodeMayInfer: false },
    { name: "rollback-approver", required: true, nodeMayInfer: false },
    { name: "release-window", required: true, nodeMayInfer: false },
    { name: "artifact-target", required: true, nodeMayInfer: false },
    { name: "operator-signoff-placeholder", required: true, nodeMayCreateApprovalDecision: false },
    { name: "release-audit-retention-fixture", required: true, expectedEndpoint: "/contracts/release-audit-retention.fixture.json", nodeMayWriteAuditExport: false },
    { name: "no-secret-value-boundary", required: true, nodeMayReadSecretValues: false },
  ],
  signoffArtifacts: [
    "/contracts/release-handoff-checklist.fixture.json",
    "/contracts/release-audit-retention.fixture.json",
    "/contracts/release-bundle-manifest.sample.json",
    "/contracts/release-verification-manifest.sample.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
    "/contracts/rollback-approval-handoff.sample.json",
  ],
  noSecretValueBoundaries: [
    "Signoff fixture stores metadata only",
    "Secret values must not be read by Java or Node when rendering this signoff",
    "Secret values must not be embedded in release operator signoff JSON",
    "Node may render the approval prerequisite gate only",
  ],
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderApprovalPrerequisiteGate: true,
    nodeMayCreateApprovalDecision: false,
    nodeMayWriteApprovalLedger: false,
    nodeMayTriggerDeployment: false,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayReadSecretValues: false,
    requiresUpstreamActionsEnabled: false,
  },
  boundaries: {
    deploymentExecutionAllowed: false,
    rollbackExecutionAllowed: false,
    rollbackSqlExecutionAllowed: false,
    approvalDecisionCreated: false,
    approvalLedgerWriteAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    changesOrderCreateSemantics: false,
    changesPaymentOrInventoryTransaction: false,
    changesOutboxOrReplayExecution: false,
    changesOrderTransactionSemantics: false,
    connectsMiniKv: false,
  },
  forbiddenOperations: [
    "Creating a real approval decision from this fixture",
    "Writing approval ledger entries from this fixture",
    "Executing Java deployment from this fixture",
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
    "Embedding secret values in release operator signoff JSON",
    "Triggering Java deployment from Node",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ],
  readOnly: true,
  executionAllowed: false,
};

const MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST: MiniKvRetainedRestoreArtifactDigestReference = {
  project: "mini-kv",
  plannedVersion: "mini-kv v73",
  evidenceTag: "v73 retained restore artifact digest fixture",
  digestVersion: "mini-kv-retained-restore-artifact-digest.v1",
  projectVersion: "0.73.0",
  releaseVersion: "v73",
  path: "fixtures/release/retained-restore-artifact-digest.json",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  consumerHint: "Node v180 approval decision prerequisite gate",
  digestTarget: {
    targetReleaseVersion: "v73",
    sourceRetentionFixture: "fixtures/release/restore-evidence-retention.json",
    sourceVerificationManifest: "fixtures/release/verification-manifest.json",
    retentionId: "mini-kv-retained-restore-artifact-digest-v73",
    restoreTargetPlaceholder: "restore-target:<operator-recorded-restore-target>",
    restoreArtifactDigestPlaceholder: "sha256:<operator-retained-restore-artifact-digest>",
    snapshotReviewDigestPlaceholder: "sha256:<operator-retained-snapshot-review-digest>",
    walReviewDigestPlaceholder: "sha256:<operator-retained-wal-review-digest>",
    retentionOwner: "operator:<retained-restore-artifact-owner>",
    boundary: "retained digest fixture records approval input evidence only and does not execute restore",
  },
  retainedDigestEvidence: {
    fields: [
      "restore_artifact_digest_retained_at",
      "snapshot_review_digest_retained_at",
      "wal_review_digest_retained_at",
      "retention_owner",
      "restore_target_placeholder",
      "order_authoritative",
      "approval_prerequisite_ready_for_node_review",
    ],
    requiredConfirmations: [
      "restore artifact digest retained outside mini-kv",
      "Snapshot review digest retained outside mini-kv",
      "WAL review digest retained outside mini-kv",
      "restore target placeholder recorded without production secret value",
      "retention owner recorded without production secret value",
      "mini-kv order_authoritative remains false",
    ],
    storagePolicy: "fixture records retained digest field names and placeholders only; artifact bytes and operator records live outside mini-kv",
  },
  checkjsonDigestEvidence: {
    commands: [
      "INFOJSON",
      "CHECKJSON LOAD data/retained-digest-restore.snap",
      "CHECKJSON COMPACT",
      "CHECKJSON SETNXEX restore:digest-token 30 value",
      "STORAGEJSON",
      "HEALTH",
      "GET restore:digest-token",
      "QUIT",
    ],
    expected: [
      "INFOJSON version matches 0.73.0",
      "CHECKJSON LOAD explains restore target risk without executing LOAD",
      "CHECKJSON COMPACT explains WAL rewrite risk without executing COMPACT",
      "CHECKJSON SETNXEX explains token claim risk without executing SETNXEX",
      "STORAGEJSON keeps order_authoritative=false",
      "GET restore:digest-token returns (nil)",
    ],
    writeCommandsExecuted: false,
    adminCommandsExecuted: false,
    approvalPrerequisiteInput: true,
  },
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
    "fixtures/release/restore-evidence-retention.json",
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
    "retained restore artifact digest fixture only",
    "artifact digest placeholder only",
    "Snapshot review digest placeholder only",
    "WAL review digest placeholder only",
    "restore target placeholder only",
    "retention owner placeholder only",
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
      "Node v180 may consume this fixture only after Java v64, mini-kv v73, and Node v179 are complete",
      "retained digest fixture is not an approval decision and not a restore executor",
      "artifact digest, Snapshot review digest, WAL review digest, restore target, and retention owner must be verified outside mini-kv before approval decision prerequisite review",
    ],
    pauseConditions: [
      "needs production secrets",
      "needs production database access",
      "needs Node to auto-start Java or mini-kv",
      "needs mini-kv LOAD/COMPACT/SETNXEX execution",
      "needs mini-kv in Java transaction consistency chain",
      "restore target or retained digest owner is unclear",
    ],
  },
};

const ENDPOINTS = Object.freeze({
  approvalDecisionPrerequisiteGateJson: "/api/v1/production/approval-decision-prerequisite-gate",
  approvalDecisionPrerequisiteGateMarkdown: "/api/v1/production/approval-decision-prerequisite-gate?format=markdown",
  productionReleasePreApprovalPacketJson: "/api/v1/production/release-pre-approval-packet",
  javaReleaseOperatorSignoffFixture: "/contracts/release-operator-signoff.fixture.json",
  miniKvRetainedRestoreArtifactDigest: "fixtures/release/retained-restore-artifact-digest.json",
  currentRoadmap: "docs/plans/v179-post-pre-approval-roadmap.md",
});

export function loadApprovalDecisionPrerequisiteGate(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ApprovalDecisionPrerequisiteGateProfile {
  const preApprovalPacket = loadProductionReleasePreApprovalPacket(config, headers);
  const prerequisiteSignals = createPrerequisiteSignals();
  const remainingApprovalBlockers = createRemainingApprovalBlockers();
  const prerequisiteSteps = createPrerequisiteSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    preApprovalPacket,
    prerequisiteSignals,
    remainingApprovalBlockers,
    prerequisiteSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const gateDigest = digestGate({
    profileVersion: "approval-decision-prerequisite-gate.v1",
    sourcePreApprovalPacketDigest: preApprovalPacket.packet.packetDigest,
    javaFixtureVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion,
    javaOperatorSignoffPlaceholder: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder,
    miniKvDigestVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion,
    miniKvRetentionId: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      gateDigestValid: undefined,
      readyForApprovalDecisionPrerequisiteGate: undefined,
    },
  });
  checks.gateDigestValid = isReleaseReportDigest(gateDigest);
  completeAggregateReadyCheck(checks, "readyForApprovalDecisionPrerequisiteGate");
  const gateState: GateState = checks.readyForApprovalDecisionPrerequisiteGate
    ? "ready-for-approval-decision-prerequisite-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Approval decision prerequisite gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "approval-decision-prerequisite-gate.v1",
    gateState,
    readyForApprovalDecisionPrerequisiteGate: checks.readyForApprovalDecisionPrerequisiteGate,
    readyForApprovalLedgerDryRunEnvelope: checks.readyForApprovalDecisionPrerequisiteGate,
    readyForApprovalDecision: false,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    prerequisiteReviewOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      sourcePreApprovalPacketDigest: preApprovalPacket.packet.packetDigest,
      sourcePreApprovalProfileVersion: preApprovalPacket.profileVersion,
      sourcePreApprovalPacketState: preApprovalPacket.packetState,
      sourcePreApprovalReady: preApprovalPacket.readyForProductionReleasePreApprovalPacket,
      javaVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.plannedVersion,
      javaFixtureVersion: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion,
      javaReleaseOperator: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseOperator,
      javaRollbackApprover: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.rollbackApprover,
      javaReleaseWindow: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseWindow,
      javaOperatorSignoffPlaceholder: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder,
      miniKvVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.plannedVersion,
      miniKvDigestVersion: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion,
      miniKvRetentionId: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId,
      miniKvRestoreArtifactDigestPlaceholder: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreArtifactDigestPlaceholder,
      miniKvRestoreTargetPlaceholder: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreTargetPlaceholder,
      prerequisiteMode: "approval-decision-prerequisite-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      approvalDecisionCreated: false,
      approvalLedgerWriteAllowed: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
    },
    checks,
    artifacts: {
      sourceProductionReleasePreApprovalPacket: summarizePreApprovalPacket(preApprovalPacket),
      javaReleaseOperatorSignoffFixture: { ...JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE },
      miniKvRetainedRestoreArtifactDigest: { ...MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST },
      noExecutionBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerRelease: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommand: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
        nodeMayConnectProductionIdp: false,
      },
    },
    prerequisiteSignals,
    remainingApprovalBlockers,
    prerequisiteSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      prerequisiteSignalCount: prerequisiteSignals.length,
      remainingApprovalBlockerCount: remainingApprovalBlockers.length,
      prerequisiteStepCount: prerequisiteSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      javaRequiredSignoffFieldCount: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.length,
      javaSignoffArtifactCount: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.length,
      miniKvRetainedDigestFieldCount: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.length,
      miniKvCheckJsonCommandCount: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.length,
      sourcePreApprovalCheckCount: preApprovalPacket.summary.checkCount,
      sourcePreApprovalPassedCheckCount: preApprovalPacket.summary.passedCheckCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this gate as proof that Java v64 and mini-kv v73 prerequisites are readable before the approval ledger dry-run envelope.",
      "Proceed to Node v181 only as an approval ledger dry-run envelope; do not create a real approval decision.",
      "Keep recommended parallel Java v65 + mini-kv v74 for later rollback/restore approval boundaries before Node v182.",
    ],
  };
}

export function renderApprovalDecisionPrerequisiteGateMarkdown(
  profile: ApprovalDecisionPrerequisiteGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Approval decision prerequisite gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for approval decision prerequisite gate": profile.readyForApprovalDecisionPrerequisiteGate,
      "Ready for approval ledger dry-run envelope": profile.readyForApprovalLedgerDryRunEnvelope,
      "Ready for approval decision": profile.readyForApprovalDecision,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Prerequisite review only": profile.prerequisiteReviewOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Production Release Pre-approval Packet", entries: profile.artifacts.sourceProductionReleasePreApprovalPacket },
      { heading: "Java Release Operator Signoff Fixture", entries: profile.artifacts.javaReleaseOperatorSignoffFixture },
      { heading: "mini-kv Retained Restore Artifact Digest", entries: profile.artifacts.miniKvRetainedRestoreArtifactDigest },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Prerequisite Signals",
        items: profile.prerequisiteSignals,
        renderItem: renderPrerequisiteSignal,
      },
      {
        heading: "Remaining Approval Blockers",
        items: profile.remainingApprovalBlockers,
        renderItem: renderRemainingApprovalBlocker,
      },
      {
        heading: "Prerequisite Steps",
        items: profile.prerequisiteSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Creates approval decision", "createsApprovalDecision"],
            ["Writes approval ledger", "writesApprovalLedger"],
            ["Executes release", "executesRelease"],
            ["Executes deployment", "executesDeployment"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
            ["Reads secret values", "readsSecretValues"],
            ["Connects production database", "connectsProductionDatabase"],
          ],
        }),
      },
      {
        heading: "Forbidden Operations",
        items: profile.forbiddenOperations,
        renderItem: renderReleaseForbiddenOperation,
      },
      {
        heading: "Pause Conditions",
        items: profile.pauseConditions,
        renderItem: (condition) => [`- ${condition}`],
      },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No approval decision prerequisite gate blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No approval decision prerequisite gate warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No approval decision prerequisite gate recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  preApprovalPacket: ProductionReleasePreApprovalPacketProfile,
  prerequisiteSignals: PrerequisiteSignal[],
  remainingApprovalBlockers: RemainingApprovalBlocker[],
  prerequisiteSteps: PrerequisiteStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourcePreApprovalPacketReady: preApprovalPacket.readyForProductionReleasePreApprovalPacket
      && preApprovalPacket.packetState === "ready-for-production-release-pre-approval-review",
    sourcePreApprovalPacketDigestValid: isReleaseReportDigest(preApprovalPacket.packet.packetDigest),
    sourcePreApprovalStillBlocksApprovalAndProduction: preApprovalPacket.readyForApprovalDecision === false
      && preApprovalPacket.readyForProductionRelease === false
      && preApprovalPacket.readyForProductionDeployment === false
      && preApprovalPacket.readyForProductionRollback === false
      && preApprovalPacket.readyForProductionRestore === false
      && preApprovalPacket.executionAllowed === false,
    sourcePreApprovalReferencesNodeV178: preApprovalPacket.packet.sourceRetentionGateProfileVersion === "cross-project-evidence-retention-gate.v1"
      && preApprovalPacket.packet.sourceRetentionGateState === "ready-for-cross-project-evidence-retention-review",
    javaV64SignoffFixtureReady: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.plannedVersion === "Java v64"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.fixtureVersion === "java-release-operator-signoff-fixture.v1"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.scenario === "RELEASE_OPERATOR_SIGNOFF_FIXTURE_SAMPLE",
    javaSignoffRecordComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseOperator === "release-operator-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.rollbackApprover === "rollback-approver-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.releaseWindow === "release-window-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.artifactTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorSignoffPlaceholder === "operator-signoff-placeholder"
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffRecord.operatorMustReplacePlaceholders,
    javaRequiredSignoffFieldsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.length === 7
      && hasJavaSignoffField("release-operator")
      && hasJavaSignoffField("rollback-approver")
      && hasJavaSignoffField("release-window")
      && hasJavaSignoffField("artifact-target")
      && hasJavaSignoffField("operator-signoff-placeholder")
      && hasJavaSignoffField("no-secret-value-boundary"),
    javaSignoffArtifactsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.length === 6
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/release-audit-retention.fixture.json")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/release-bundle-manifest.sample.json")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.signoffArtifacts.includes("/contracts/rollback-approval-handoff.sample.json"),
    javaNodeConsumptionSafe: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayConsume
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayRenderApprovalPrerequisiteGate
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayCreateApprovalDecision
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayWriteApprovalLedger
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayTriggerDeployment
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayTriggerRollback
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.nodeMayExecuteRollbackSql
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.nodeConsumption.requiresUpstreamActionsEnabled,
    javaProductionBoundariesClosed: !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.deploymentExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.rollbackExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.rollbackSqlExecutionAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.approvalDecisionCreated
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.approvalLedgerWriteAllowed
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.requiresProductionDatabase
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.requiresProductionSecrets
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.changesOrderTransactionSemantics
      && !JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.boundaries.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Creating a real approval decision from this fixture")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Writing approval ledger entries from this fixture")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Triggering Java deployment from Node")
      && JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.forbiddenOperations.includes("Reading production secret values from this fixture"),
    miniKvV73DigestFixtureReady: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.plannedVersion === "mini-kv v73"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestVersion === "mini-kv-retained-restore-artifact-digest.v1"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.projectVersion === "0.73.0",
    miniKvDigestTargetComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionId === "mini-kv-retained-restore-artifact-digest-v73"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreTargetPlaceholder === "restore-target:<operator-recorded-restore-target>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.restoreArtifactDigestPlaceholder === "sha256:<operator-retained-restore-artifact-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.snapshotReviewDigestPlaceholder === "sha256:<operator-retained-snapshot-review-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.walReviewDigestPlaceholder === "sha256:<operator-retained-wal-review-digest>"
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.digestTarget.retentionOwner === "operator:<retained-restore-artifact-owner>",
    miniKvRetainedDigestEvidenceComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.length === 7
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.includes("approval_prerequisite_ready_for_node_review")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.fields.includes("order_authoritative")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.retainedDigestEvidence.requiredConfirmations.length === 6,
    miniKvCheckJsonDigestEvidenceReadOnly: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON LOAD data/retained-digest-restore.snap")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON COMPACT")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("CHECKJSON SETNXEX restore:digest-token 30 value")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.commands.includes("GET restore:digest-token")
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.writeCommandsExecuted
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.adminCommandsExecuted
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.checkjsonDigestEvidence.approvalPrerequisiteInput,
    miniKvBoundariesClosed: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.readOnly
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.executionAllowed
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.restoreExecutionAllowed
      && !MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.orderAuthoritative
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("not connected to Java transaction chain")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.boundaries.includes("mini-kv remains not Java order authority"),
    miniKvPauseConditionsComplete: MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs production secrets")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs mini-kv LOAD/COMPACT/SETNXEX execution")
      && MINI_KV_V73_RETAINED_RESTORE_ARTIFACT_DIGEST.diagnostics.pauseConditions.includes("needs mini-kv in Java transaction consistency chain"),
    prerequisiteSignalsComplete: prerequisiteSignals.length === 5
      && prerequisiteSignals.every((signal) => !signal.nodeMayInfer && !signal.nodeMayCreateApprovalDecision)
      && prerequisiteSignals.some((signal) => signal.id === "java-release-operator-signoff-present")
      && prerequisiteSignals.some((signal) => signal.id === "mini-kv-retained-artifact-digests-present"),
    remainingApprovalBlockersExplicit: remainingApprovalBlockers.length === 4
      && remainingApprovalBlockers.every((blocker) => blocker.blocksRealApprovalDecision && !blocker.blocksDryRunEnvelope),
    prerequisiteStepsReadOnly: prerequisiteSteps.length === 6
      && prerequisiteSteps.every((step) => (
        step.readOnly
        && !step.createsApprovalDecision
        && !step.writesApprovalLedger
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
        && !step.connectsProductionDatabase
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 12
      && forbiddenOperations.some((operation) => operation.operation === "Create approval decision from Node v180")
      && forbiddenOperations.some((operation) => operation.operation === "Write approval ledger from Node v180")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v180"),
    pauseConditionsComplete: pauseConditions.length === 9
      && pauseConditions.includes("Need approval decision, release, deployment, rollback, or restore execution.")
      && pauseConditions.includes("Need Java deployment, Java rollback, Java rollback SQL, or Java approval ledger writes."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && preApprovalPacket.packet.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    noApprovalDecisionCreated: true,
    noApprovalLedgerWrite: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRestoreExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForApprovalDecisionStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    gateDigestValid: false,
    readyForApprovalDecisionPrerequisiteGate: false,
  };
}

function hasJavaSignoffField(name: string): boolean {
  return JAVA_V64_RELEASE_OPERATOR_SIGNOFF_FIXTURE.requiredSignoffFields.some((field) =>
    field.name === name && field.required);
}

function createPrerequisiteSignals(): PrerequisiteSignal[] {
  return [
    signal("source-pre-approval-packet-present", "production-release-pre-approval-packet", "present-for-dry-run", ENDPOINTS.productionReleasePreApprovalPacketJson),
    signal("java-release-operator-signoff-present", "java-v64-release-operator-signoff-fixture", "placeholder-requires-operator", ENDPOINTS.javaReleaseOperatorSignoffFixture),
    signal("java-rollback-approver-placeholder-present", "java-v64-release-operator-signoff-fixture", "placeholder-requires-operator", "signoffRecord.rollbackApprover"),
    signal("mini-kv-retained-artifact-digests-present", "mini-kv-v73-retained-restore-artifact-digest", "placeholder-requires-operator", ENDPOINTS.miniKvRetainedRestoreArtifactDigest),
    signal("mini-kv-order-authority-closed", "mini-kv-v73-retained-restore-artifact-digest", "explicitly-blocked-for-production", "order_authoritative=false"),
  ];
}

function signal(
  id: string,
  source: PrerequisiteSignal["source"],
  status: PrerequisiteSignal["status"],
  evidenceTarget: string,
): PrerequisiteSignal {
  return {
    id,
    source,
    status,
    evidenceTarget,
    nodeMayInfer: false,
    nodeMayCreateApprovalDecision: false,
  };
}

function createRemainingApprovalBlockers(): RemainingApprovalBlocker[] {
  return [
    blocker("real-production-idp", "approval-decision", "Production IdP or verified token source is still not connected."),
    blocker("approval-ledger-dry-run-envelope", "approval-decision", "Node v181 must design the approval ledger dry-run envelope before any approval decision rehearsal."),
    blocker("rollback-approver-evidence-fixture", "production-rollback", "Java v65 rollback approver evidence is still planned for the rollback boundary."),
    blocker("restore-approval-boundary-fixture", "production-restore", "mini-kv v74 restore approval boundary is still planned before decision rehearsal."),
  ];
}

function blocker(
  id: string,
  requiredBefore: RemainingApprovalBlocker["requiredBefore"],
  reason: string,
): RemainingApprovalBlocker {
  return {
    id,
    requiredBefore,
    reason,
    blocksRealApprovalDecision: true,
    blocksDryRunEnvelope: false,
  };
}

function createPrerequisiteSteps(): PrerequisiteStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v179 production release pre-approval packet.", ENDPOINTS.productionReleasePreApprovalPacketJson, "Packet is ready, digest-valid, and still blocks approval decision creation."),
    createStep(2, "collect", "java", "Reference Java v64 release operator signoff fixture.", ENDPOINTS.javaReleaseOperatorSignoffFixture, "Release operator, rollback approver, release window, artifact target, and signoff placeholder are present."),
    createStep(3, "collect", "mini-kv", "Reference mini-kv v73 retained restore artifact digest fixture.", ENDPOINTS.miniKvRetainedRestoreArtifactDigest, "Restore artifact digest, Snapshot/WAL digest, restore target, retention owner, and order-authority boundary are present."),
    createStep(4, "compare", "node", "Compare prerequisites against v179 missing evidence categories.", "prerequisiteSignals", "Java and mini-kv placeholders are present for a dry-run envelope while real approval remains blocked."),
    createStep(5, "preserve", "operator", "Archive this gate as approval prerequisite evidence.", "c/180 and code walkthrough", "Screenshot, explanation, and walkthrough are archived before Node v181."),
    createStep(6, "stop", "node", "Stop before approval decision, approval ledger write, release, rollback, or restore execution.", "next plan handoff", "Node v181 may create a dry-run envelope only; real decisions remain blocked."),
  ];
}

function createStep(
  order: number,
  phase: PrerequisiteStep["phase"],
  actor: PrerequisiteActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): PrerequisiteStep {
  return {
    order,
    phase,
    actor,
    action,
    evidenceTarget,
    expectedEvidence,
    readOnly: true,
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
    forbid("Create approval decision from Node v180", "v180 is only a prerequisite gate.", "Node v180 approval decision prerequisite gate"),
    forbid("Write approval ledger from Node v180", "The approval ledger dry-run envelope is planned for Node v181.", "Node v180 approval decision prerequisite gate"),
    forbid("Trigger production release from Node v180", "Prerequisite evidence cannot authorize release execution.", "Node v180 approval decision prerequisite gate"),
    forbid("Trigger production deployment from Node v180", "Java v64 fixture forbids deployment execution.", "Java v64 release operator signoff fixture"),
    forbid("Trigger Java rollback from Node v180", "Java v64 records rollback approver placeholder only.", "Java v64 release operator signoff fixture"),
    forbid("Execute Java rollback SQL from Node v180", "Java v64 forbids rollback SQL execution.", "Java v64 release operator signoff fixture"),
    forbid("Execute mini-kv restore from Node v180", "mini-kv v73 is retained digest evidence only.", "mini-kv v73 retained restore artifact digest"),
    forbid("Execute mini-kv LOAD/COMPACT/SETNXEX from Node v180", "mini-kv v73 uses CHECKJSON retained digest evidence only.", "mini-kv v73 retained restore artifact digest"),
    forbid("Attach mini-kv to Java order transaction chain", "mini-kv remains not Java order authority.", "mini-kv v73 retained restore artifact digest"),
    forbid("Read production secret values", "Prerequisite gate uses placeholders and source names only.", "runtime safety"),
    forbid("Connect production database", "Rendering the gate does not require production database access.", "runtime safety"),
    forbid("Treat v180 as production authentication", "Production IdP remains a blocker.", "runtime safety"),
  ];
}

function forbid(
  operation: ForbiddenOperation["operation"],
  reason: string,
  blockedBy: ForbiddenOperation["blockedBy"],
): ForbiddenOperation {
  return { operation, reason, blockedBy };
}

function createPauseConditions(): string[] {
  return [
    "Need production secrets or secret values.",
    "Need production database access.",
    "Need production IdP connection or token verification.",
    "Need Node to auto-start Java or mini-kv.",
    "Need approval decision, release, deployment, rollback, or restore execution.",
    "Need Java deployment, Java rollback, Java rollback SQL, or Java approval ledger writes.",
    "Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution.",
    "Need mini-kv in Java transaction consistency chain.",
    "Operator signoff, retained digest owner, or restore target is unclear.",
  ];
}

function summarizePreApprovalPacket(profile: ProductionReleasePreApprovalPacketProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    packetState: profile.packetState,
    packetDigest: profile.packet.packetDigest,
    readyForProductionReleasePreApprovalPacket: profile.readyForProductionReleasePreApprovalPacket,
    readyForApprovalDecision: profile.readyForApprovalDecision,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionRestore: profile.readyForProductionRestore,
    executionAllowed: profile.executionAllowed,
    missingEvidenceCount: profile.summary.missingEvidenceCount,
    missingEvidenceBlockingDecisionCount: profile.summary.missingEvidenceBlockingDecisionCount,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): GateMessage[] {
  return collectBlockingMessages<GateMessage>([
    { condition: checks.sourcePreApprovalPacketReady, code: "SOURCE_PRE_APPROVAL_PACKET_NOT_READY", source: "production-release-pre-approval-packet", message: "Node v179 pre-approval packet must be ready before v180 prerequisite gate." },
    { condition: checks.sourcePreApprovalPacketDigestValid, code: "SOURCE_PRE_APPROVAL_PACKET_DIGEST_INVALID", source: "production-release-pre-approval-packet", message: "Node v179 packet digest must be valid." },
    { condition: checks.sourcePreApprovalStillBlocksApprovalAndProduction, code: "SOURCE_PRE_APPROVAL_UNLOCKS_PRODUCTION", source: "production-release-pre-approval-packet", message: "Node v179 must still block approval decision and production operations." },
    { condition: checks.sourcePreApprovalReferencesNodeV178, code: "SOURCE_PRE_APPROVAL_V178_REFERENCE_INVALID", source: "production-release-pre-approval-packet", message: "Node v179 must reference the v178 retention gate." },
    { condition: checks.javaV64SignoffFixtureReady, code: "JAVA_V64_SIGNOFF_FIXTURE_NOT_READY", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 release operator signoff fixture must be present." },
    { condition: checks.javaSignoffRecordComplete, code: "JAVA_SIGNOFF_RECORD_INCOMPLETE", source: "java-v64-release-operator-signoff-fixture", message: "Java signoff record must include release operator, rollback approver, release window, artifact target, and signoff placeholder." },
    { condition: checks.javaRequiredSignoffFieldsComplete, code: "JAVA_REQUIRED_SIGNOFF_FIELDS_INCOMPLETE", source: "java-v64-release-operator-signoff-fixture", message: "Java required signoff fields must include operator, approver, window, artifact, signoff, retention, and no-secret boundaries." },
    { condition: checks.javaNodeConsumptionSafe, code: "JAVA_NODE_CONSUMPTION_UNSAFE", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 may be consumed only for rendering the prerequisite gate." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v64-release-operator-signoff-fixture", message: "Java v64 must not enable approval, ledger writes, deployment, rollback, SQL, secrets, database, or mini-kv coupling." },
    { condition: checks.miniKvV73DigestFixtureReady, code: "MINI_KV_V73_DIGEST_FIXTURE_NOT_READY", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv v73 retained restore artifact digest fixture must be present." },
    { condition: checks.miniKvDigestTargetComplete, code: "MINI_KV_DIGEST_TARGET_INCOMPLETE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv digest target must include restore target, artifact digest, Snapshot/WAL digest, and retention owner placeholders." },
    { condition: checks.miniKvRetainedDigestEvidenceComplete, code: "MINI_KV_RETAINED_DIGEST_EVIDENCE_INCOMPLETE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv retained digest evidence fields and confirmations must be complete." },
    { condition: checks.miniKvCheckJsonDigestEvidenceReadOnly, code: "MINI_KV_CHECKJSON_DIGEST_EVIDENCE_UNSAFE", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv CHECKJSON digest evidence must remain read-only and non-executing." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v73-retained-restore-artifact-digest", message: "mini-kv v73 must remain non-authoritative and disconnected from Java transaction consistency." },
    { condition: checks.prerequisiteSignalsComplete, code: "PREREQUISITE_SIGNALS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Prerequisite signals must map v179 missing evidence to Java v64 and mini-kv v73 inputs." },
    { condition: checks.remainingApprovalBlockersExplicit, code: "REMAINING_APPROVAL_BLOCKERS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Remaining real approval blockers must be explicit and must not block the dry-run envelope." },
    { condition: checks.prerequisiteStepsReadOnly, code: "PREREQUISITE_STEPS_NOT_READ_ONLY", source: "approval-decision-prerequisite-gate", message: "Prerequisite steps must be read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "approval-decision-prerequisite-gate", message: "Forbidden operations must cover approval, ledger, release, Java, mini-kv, secrets, database, and auth hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "runtime-config", message: "Node v180 must not start Java or mini-kv." },
    { condition: checks.noApprovalDecisionCreated, code: "APPROVAL_DECISION_CREATED", source: "approval-decision-prerequisite-gate", message: "v180 must not create an approval decision." },
    { condition: checks.noApprovalLedgerWrite, code: "APPROVAL_LEDGER_WRITE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not write approval ledger records." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute release." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not execute restore." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v180 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v180 must not connect production databases." },
    { condition: checks.noProductionIdpConnection, code: "PRODUCTION_IDP_CONNECTION_UNLOCKED", source: "runtime-config", message: "v180 must not connect production IdP." },
    { condition: checks.readyForApprovalDecisionStillFalse, code: "APPROVAL_DECISION_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark approval decision ready." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark production release ready." },
    { condition: checks.readyForProductionRestoreStillFalse, code: "PRODUCTION_RESTORE_UNLOCKED", source: "approval-decision-prerequisite-gate", message: "v180 must not mark production restore ready." },
    { condition: checks.gateDigestValid, code: "GATE_DIGEST_INVALID", source: "approval-decision-prerequisite-gate", message: "Gate digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "APPROVAL_DECISION_PREREQUISITE_GATE_BLOCKED"
        : "PREREQUISITE_GATE_NOT_APPROVAL_DECISION",
      severity: "warning",
      source: "approval-decision-prerequisite-gate",
      message: gateState === "blocked"
        ? "Approval decision prerequisite gate has blockers."
        : "This gate proves prerequisite evidence is readable for a dry-run envelope only; it is not an approval decision.",
    },
    {
      code: "PLACEHOLDERS_REQUIRE_EXTERNAL_OPERATOR_CONFIRMATION",
      severity: "warning",
      source: "approval-decision-prerequisite-gate",
      message: "Java and mini-kv placeholders must be replaced by external operator evidence before any real approval decision.",
    },
  ];
}

function collectRecommendations(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_APPROVAL_DECISION_PREREQUISITE_BLOCKERS"
        : "PROCEED_TO_APPROVAL_LEDGER_DRY_RUN_ENVELOPE",
      severity: "recommendation",
      source: "approval-decision-prerequisite-gate",
      message: gateState === "blocked"
        ? "Fix missing prerequisite evidence before archiving v180."
        : "After v180 is archived, proceed to Node v181 approval ledger dry-run envelope without writing a real ledger.",
    },
  ];
}

function renderPrerequisiteSignal(signal: PrerequisiteSignal): string[] {
  return [
    `### ${signal.id}`,
    "",
    `- Source: ${signal.source}`,
    `- Status: ${signal.status}`,
    `- Evidence target: ${signal.evidenceTarget}`,
    `- Node may infer: ${signal.nodeMayInfer}`,
    `- Node may create approval decision: ${signal.nodeMayCreateApprovalDecision}`,
    "",
  ];
}

function renderRemainingApprovalBlocker(blocker: RemainingApprovalBlocker): string[] {
  return [
    `### ${blocker.id}`,
    "",
    `- Required before: ${blocker.requiredBefore}`,
    `- Reason: ${blocker.reason}`,
    `- Blocks real approval decision: ${blocker.blocksRealApprovalDecision}`,
    `- Blocks dry-run envelope: ${blocker.blocksDryRunEnvelope}`,
    "",
  ];
}

function digestGate(value: unknown): string {
  return digestReleaseReport(value);
}
