import type { IncomingHttpHeaders } from "node:http";

import type { AppConfig } from "../config.js";
import {
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadCiOperatorIdentityEvidencePacket,
  type CiOperatorIdentityEvidencePacketProfile,
} from "./ciOperatorIdentityEvidencePacket.js";

type GateState = "ready-for-cross-project-evidence-retention-review" | "blocked";
type RetentionActor = "node" | "operator" | "java" | "mini-kv";

interface GateMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "cross-project-evidence-retention-gate"
    | "ci-operator-identity-evidence-packet"
    | "java-v63-release-audit-retention-fixture"
    | "mini-kv-v72-restore-evidence-retention"
    | "runtime-config";
  message: string;
}

interface JavaReleaseAuditRetentionFixtureReference {
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

interface MiniKvRestoreEvidenceRetentionReference {
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

interface RetentionGateStep {
  order: number;
  phase: "collect" | "verify" | "compare" | "preserve" | "closeout";
  actor: RetentionActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  executionAllowed: false;
  mutatesState: false;
  executesRelease: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
}

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v178 cross-project evidence retention gate"
    | "Node v177 operator identity evidence"
    | "Java v63 release audit retention fixture"
    | "mini-kv v72 restore evidence retention"
    | "runtime safety";
}

export interface CrossProjectEvidenceRetentionGateProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "cross-project-evidence-retention-gate.v1";
  gateState: GateState;
  readyForCrossProjectEvidenceRetentionGate: boolean;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  executionAllowed: false;
  gate: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  retentionGateSteps: RetentionGateStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: GateMessage[];
  warnings: GateMessage[];
  recommendations: GateMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE: JavaReleaseAuditRetentionFixtureReference = {
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

const MINI_KV_V72_RESTORE_EVIDENCE_RETENTION: MiniKvRestoreEvidenceRetentionReference = {
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

const ENDPOINTS = Object.freeze({
  crossProjectEvidenceRetentionGateJson: "/api/v1/production/cross-project-evidence-retention-gate",
  crossProjectEvidenceRetentionGateMarkdown: "/api/v1/production/cross-project-evidence-retention-gate?format=markdown",
  ciOperatorIdentityEvidencePacketJson: "/api/v1/ci/operator-identity-evidence-packet",
  javaReleaseAuditRetentionFixture: "/contracts/release-audit-retention.fixture.json",
  miniKvRestoreEvidenceRetention: "fixtures/release/restore-evidence-retention.json",
  currentRoadmap: "docs/plans/v176-post-ci-evidence-hardening-roadmap.md",
});

export function loadCrossProjectEvidenceRetentionGate(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): CrossProjectEvidenceRetentionGateProfile {
  const identityPacket = loadCiOperatorIdentityEvidencePacket(config, headers);
  const retentionGateSteps = createRetentionGateSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    identityPacket,
    retentionGateSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const gateDigest = digestGate({
    profileVersion: "cross-project-evidence-retention-gate.v1",
    sourceNodeIdentityPacketDigest: identityPacket.packet.packetDigest,
    javaFixtureVersion: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.fixtureVersion,
    javaRetentionId: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionId,
    miniKvRetentionVersion: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionVersion,
    miniKvRetentionId: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionId,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      gateDigestValid: undefined,
      readyForCrossProjectEvidenceRetentionGate: undefined,
    },
  });
  checks.gateDigestValid = isReleaseReportDigest(gateDigest);
  completeAggregateReadyCheck(checks, "readyForCrossProjectEvidenceRetentionGate");
  const gateState: GateState = checks.readyForCrossProjectEvidenceRetentionGate
    ? "ready-for-cross-project-evidence-retention-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Cross-project evidence retention gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "cross-project-evidence-retention-gate.v1",
    gateState,
    readyForCrossProjectEvidenceRetentionGate: checks.readyForCrossProjectEvidenceRetentionGate,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    executionAllowed: false,
    gate: {
      gateDigest,
      sourceNodeIdentityPacketDigest: identityPacket.packet.packetDigest,
      sourceNodeIdentityProfileVersion: identityPacket.profileVersion,
      sourceNodeIdentityGateState: identityPacket.packetState,
      javaVersion: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.plannedVersion,
      javaFixtureVersion: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.fixtureVersion,
      javaRetentionId: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionId,
      javaRetentionDays: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionDays,
      miniKvVersion: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.plannedVersion,
      miniKvRetentionVersion: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionVersion,
      miniKvRetentionId: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionId,
      miniKvRetentionDays: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionDays,
      gateMode: "cross-project-retention-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      productionAuthReady: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
    },
    checks,
    artifacts: {
      nodeOperatorIdentityEvidencePacket: summarizeIdentityPacket(identityPacket),
      javaReleaseAuditRetentionFixture: { ...JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE },
      miniKvRestoreEvidenceRetention: { ...MINI_KV_V72_RESTORE_EVIDENCE_RETENTION },
      noExecutionBoundary: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayTriggerJavaDeployment: false,
        nodeMayTriggerJavaRollback: false,
        nodeMayExecuteRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayExecuteMiniKvAdminCommand: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
      },
    },
    retentionGateSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      sourceEvidenceCount: 3,
      retentionGateStepCount: retentionGateSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      javaAuditExportFieldCount: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.auditExportFields.length,
      javaRetainedArtifactCount: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retainedArtifacts.length,
      miniKvRetainedEvidenceFieldCount: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.length,
      miniKvCheckJsonCommandCount: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this gate for manual evidence retention review only; it is not release or restore approval.",
      "Keep Java v63 and mini-kv v72 retention placeholders external until operators record real retained artifact locations.",
      "After v178 is archived, Node v179 may build a pre-approval packet without creating an approval decision.",
    ],
  };
}

export function renderCrossProjectEvidenceRetentionGateMarkdown(
  profile: CrossProjectEvidenceRetentionGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Cross-project evidence retention gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for cross-project evidence retention gate": profile.readyForCrossProjectEvidenceRetentionGate,
      "Ready for production auth": profile.readyForProductionAuth,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Node Operator Identity Evidence Packet", entries: profile.artifacts.nodeOperatorIdentityEvidencePacket },
      { heading: "Java Release Audit Retention Fixture", entries: profile.artifacts.javaReleaseAuditRetentionFixture },
      { heading: "mini-kv Restore Evidence Retention", entries: profile.artifacts.miniKvRestoreEvidenceRetention },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Retention Gate Steps",
        items: profile.retentionGateSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Execution allowed", "executionAllowed"],
            ["Mutates state", "mutatesState"],
            ["Executes release", "executesRelease"],
            ["Executes deployment", "executesDeployment"],
            ["Executes rollback", "executesRollback"],
            ["Executes restore", "executesRestore"],
            ["Reads secret values", "readsSecretValues"],
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
        emptyText: "No cross-project evidence retention gate blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No cross-project evidence retention gate warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No cross-project evidence retention gate recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  identityPacket: CiOperatorIdentityEvidencePacketProfile,
  retentionGateSteps: RetentionGateStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    nodeV177IdentityEvidenceReady: identityPacket.readyForCiOperatorIdentityEvidencePacket
      && identityPacket.packetState === "ready-for-operator-identity-evidence",
    nodeV177IdentityDigestValid: isReleaseReportDigest(identityPacket.packet.packetDigest),
    nodeV177StillBlocksProduction: identityPacket.readyForProductionAuth === false
      && identityPacket.readyForProductionRelease === false
      && identityPacket.readyForProductionDeployment === false
      && identityPacket.readyForProductionRollback === false
      && identityPacket.executionAllowed === false,
    javaV63RetentionFixtureReady: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.plannedVersion === "Java v63"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.fixtureVersion === "java-release-audit-retention-fixture.v1",
    javaRetentionRecordComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionId === "release-retention-record-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.releaseOperator === "release-operator-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.artifactTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.retentionDays === 180
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retentionRecord.operatorMustReplacePlaceholders === true,
    javaAuditExportFieldsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.auditExportFields.length === 7
      && hasAuditField("retention-id")
      && hasAuditField("release-operator")
      && hasAuditField("artifact-target")
      && hasAuditField("retention-days")
      && hasAuditField("no-secret-value-boundary"),
    javaEvidenceEndpointsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/api/v1/ops/evidence")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/contracts/release-verification-manifest.sample.json")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.evidenceEndpoints.includes("/contracts/release-handoff-checklist.fixture.json"),
    javaRetainedArtifactsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retainedArtifacts.length === 5
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.retainedArtifacts.includes("/contracts/production-secret-source-contract.sample.json"),
    javaNoSecretBoundaryClosed: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.noSecretValueBoundaries.length === 4
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayReadSecretValues === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.requiresProductionSecrets === false,
    javaNodeConsumptionReadOnly: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayConsume === true
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayRenderRetentionGate === true
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayTriggerDeployment === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayTriggerRollback === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayExecuteRollbackSql === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.nodeMayWriteAuditExport === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.nodeConsumption.requiresUpstreamActionsEnabled === false,
    javaProductionBoundariesClosed: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.auditExportReadOnly
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.deploymentExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.rollbackExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.rollbackSqlExecutionAllowed === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.requiresProductionDatabase === false
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.boundaries.connectsMiniKv === false,
    javaForbiddenOperationsComplete: JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Triggering Java deployment from Node")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Writing audit export files from Node through this fixture")
      && JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.forbiddenOperations.includes("Reading production secret values from this fixture"),
    miniKvV72RetentionFixtureReady: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.plannedVersion === "mini-kv v72"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionVersion === "mini-kv-restore-evidence-retention.v1"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.projectVersion === "0.72.0",
    miniKvRetentionTargetComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionId === "mini-kv-restore-retention-v72"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.retentionDays === 90
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.artifactDigestPlaceholder === "sha256:<operator-retained-restore-artifact-digest>"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.snapshotReviewRetention === "sha256:<operator-retained-snapshot-review-digest>"
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retentionTarget.walReviewRetention === "sha256:<operator-retained-wal-review-digest>",
    miniKvRetainedEvidenceComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.length === 8
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.includes("checkjson_risk_evidence_retained_at")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.fields.includes("retention_gate_ready_for_node_review")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.retainedEvidence.requiredConfirmations.length === 6,
    miniKvCheckJsonRiskEvidenceRetained: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON LOAD data/retention-restore.snap")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON COMPACT")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("CHECKJSON SETNXEX restore:retention-token 30 value")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.commands.includes("GET restore:retention-token")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.expected.includes("GET restore:retention-token returns (nil)"),
    miniKvWriteAndAdminCommandsNotExecuted: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.writeCommandsExecuted === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.checkjsonRetentionEvidence.adminCommandsExecuted === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.restoreExecutionAllowed === false,
    miniKvBoundariesClosed: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.readOnly
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.executionAllowed === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.restoreExecutionAllowed === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.orderAuthoritative === false
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("not connected to Java transaction chain")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.boundaries.includes("mini-kv remains not Java order authority"),
    miniKvPauseConditionsComplete: MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs production secrets")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs mini-kv LOAD/COMPACT/SETNXEX execution")
      && MINI_KV_V72_RESTORE_EVIDENCE_RETENTION.diagnostics.pauseConditions.includes("needs mini-kv in Java transaction consistency chain"),
    retentionGateStepsReadOnly: retentionGateSteps.length === 6
      && retentionGateSteps.every((step) => (
        step.readOnly
        && !step.executionAllowed
        && !step.mutatesState
        && !step.executesRelease
        && !step.executesDeployment
        && !step.executesRollback
        && !step.executesRestore
        && !step.readsSecretValues
      )),
    forbiddenOperationsCovered: forbiddenOperations.length === 10
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java deployment from Node v178")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v178"),
    pauseConditionsComplete: pauseConditions.length === 8
      && pauseConditions.includes("Need production secrets or secret values.")
      && pauseConditions.includes("Need Node to auto-start Java or mini-kv."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForProductionAuthStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    gateDigestValid: false,
    readyForCrossProjectEvidenceRetentionGate: false,
  };
}

function hasAuditField(name: string): boolean {
  return JAVA_V63_RELEASE_AUDIT_RETENTION_FIXTURE.auditExportFields.some((field) =>
    field.name === name && field.required);
}

function createRetentionGateSteps(): RetentionGateStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v177 operator identity evidence packet.", "/api/v1/ci/operator-identity-evidence-packet", "Node identity evidence is ready and still not production auth."),
    createStep(2, "collect", "java", "Reference Java v63 release audit retention fixture.", "/contracts/release-audit-retention.fixture.json", "Retention id, operator placeholder, artifact target, retention days, and audit export fields are present."),
    createStep(3, "collect", "mini-kv", "Reference mini-kv v72 restore evidence retention fixture.", "fixtures/release/restore-evidence-retention.json", "Restore checklist, artifact digest, Snapshot/WAL review, and CHECKJSON risk evidence retention fields are present."),
    createStep(4, "compare", "node", "Compare retention boundaries across Node identity, Java release evidence, and mini-kv restore evidence.", "cross-project retention checks", "All sources are read-only, placeholder-based, and do not unlock upstream execution."),
    createStep(5, "preserve", "operator", "Preserve this gate as manual retention review evidence.", "c/178 and code walkthrough", "Screenshot, explanation, and walkthrough are archived for later pre-approval packet review."),
    createStep(6, "closeout", "node", "Stop before any real approval, release, rollback, or restore action.", "next plan handoff", "Node v179 may prepare a pre-approval packet only after this gate is archived."),
  ];
}

function createStep(
  order: number,
  phase: RetentionGateStep["phase"],
  actor: RetentionActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): RetentionGateStep {
  return {
    order,
    phase,
    actor,
    action,
    evidenceTarget,
    expectedEvidence,
    readOnly: true,
    executionAllowed: false,
    mutatesState: false,
    executesRelease: false,
    executesDeployment: false,
    executesRollback: false,
    executesRestore: false,
    readsSecretValues: false,
  };
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    forbid("Use v178 as production authentication", "v177 identity evidence is header rehearsal only.", "Node v177 operator identity evidence"),
    forbid("Trigger Java deployment from Node v178", "Java v63 fixture is retention metadata only.", "Java v63 release audit retention fixture"),
    forbid("Trigger Java rollback from Node v178", "Java v63 forbids rollback execution and rollback SQL.", "Java v63 release audit retention fixture"),
    forbid("Write Java audit export from Node v178", "Java v63 only names the export location placeholder.", "Java v63 release audit retention fixture"),
    forbid("Read production secret values", "Retention gates preserve metadata and placeholders only.", "runtime safety"),
    forbid("Connect production database", "No retention input requires a production database connection.", "runtime safety"),
    forbid("Execute mini-kv restore from Node v178", "mini-kv v72 is restore evidence retention only.", "mini-kv v72 restore evidence retention"),
    forbid("Execute mini-kv LOAD/COMPACT/SETNXEX", "mini-kv v72 uses CHECKJSON risk evidence and does not execute admin/write commands.", "mini-kv v72 restore evidence retention"),
    forbid("Attach mini-kv to Java order transaction chain", "mini-kv remains not Java order authority.", "mini-kv v72 restore evidence retention"),
    forbid("Create release approval decision", "v178 is only a retention gate; v179 may prepare pre-approval without decision.", "Node v178 cross-project evidence retention gate"),
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
    "Need production IdP connection.",
    "Need Node to auto-start Java or mini-kv.",
    "Need Java deployment, rollback, rollback SQL, or audit export writes.",
    "Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution.",
    "Need mini-kv in Java transaction consistency chain.",
    "Retention owner or retained artifact digest is unclear.",
  ];
}

function summarizeIdentityPacket(profile: CiOperatorIdentityEvidencePacketProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    packetState: profile.packetState,
    packetDigest: profile.packet.packetDigest,
    readyForCiOperatorIdentityEvidencePacket: profile.readyForCiOperatorIdentityEvidencePacket,
    readyForProductionAuth: profile.readyForProductionAuth,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    executionAllowed: profile.executionAllowed,
    localSmokeOperatorId: profile.localSmokeIdentity.operatorId,
    localSmokeRoles: profile.localSmokeIdentity.roles,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): GateMessage[] {
  return collectMessages("blocker", [
    { condition: checks.nodeV177IdentityEvidenceReady, code: "NODE_V177_IDENTITY_EVIDENCE_NOT_READY", source: "ci-operator-identity-evidence-packet", message: "Node v177 operator identity evidence must be ready before v178 retention gate." },
    { condition: checks.nodeV177IdentityDigestValid, code: "NODE_V177_IDENTITY_DIGEST_INVALID", source: "ci-operator-identity-evidence-packet", message: "Node v177 operator identity evidence digest must be valid." },
    { condition: checks.nodeV177StillBlocksProduction, code: "NODE_V177_UNLOCKS_PRODUCTION", source: "ci-operator-identity-evidence-packet", message: "Node v177 must still block production auth and production operations." },
    { condition: checks.javaV63RetentionFixtureReady, code: "JAVA_V63_RETENTION_FIXTURE_NOT_READY", source: "java-v63-release-audit-retention-fixture", message: "Java v63 release audit retention fixture must be present." },
    { condition: checks.javaRetentionRecordComplete, code: "JAVA_RETENTION_RECORD_INCOMPLETE", source: "java-v63-release-audit-retention-fixture", message: "Java retention record must include retention id, operator, artifact target, and days." },
    { condition: checks.javaAuditExportFieldsComplete, code: "JAVA_AUDIT_EXPORT_FIELDS_INCOMPLETE", source: "java-v63-release-audit-retention-fixture", message: "Java audit export fields must include retention, artifact, endpoint, and no-secret boundaries." },
    { condition: checks.javaNodeConsumptionReadOnly, code: "JAVA_NODE_CONSUMPTION_NOT_READ_ONLY", source: "java-v63-release-audit-retention-fixture", message: "Java retention fixture may be consumed only for rendering the retention gate." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v63-release-audit-retention-fixture", message: "Java retention fixture must not allow deployment, rollback, SQL, secrets, database, or mini-kv coupling." },
    { condition: checks.miniKvV72RetentionFixtureReady, code: "MINI_KV_V72_RETENTION_FIXTURE_NOT_READY", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv v72 restore evidence retention fixture must be present." },
    { condition: checks.miniKvRetentionTargetComplete, code: "MINI_KV_RETENTION_TARGET_INCOMPLETE", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv retention target must include retention id and retained artifact placeholders." },
    { condition: checks.miniKvRetainedEvidenceComplete, code: "MINI_KV_RETAINED_EVIDENCE_INCOMPLETE", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv retained evidence fields and confirmations must be complete." },
    { condition: checks.miniKvCheckJsonRiskEvidenceRetained, code: "MINI_KV_CHECKJSON_EVIDENCE_INCOMPLETE", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv CHECKJSON retention evidence must cover LOAD, COMPACT, SETNXEX, and nil GET." },
    { condition: checks.miniKvWriteAndAdminCommandsNotExecuted, code: "MINI_KV_WRITE_OR_ADMIN_EXECUTION_UNLOCKED", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv retention evidence must not execute write/admin commands." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v72-restore-evidence-retention", message: "mini-kv must remain non-authoritative and disconnected from Java transaction consistency." },
    { condition: checks.retentionGateStepsReadOnly, code: "RETENTION_GATE_STEPS_NOT_READ_ONLY", source: "cross-project-evidence-retention-gate", message: "Retention gate steps must be read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "cross-project-evidence-retention-gate", message: "Forbidden operations must cover Java, mini-kv, secrets, database, auth, and approval hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v178 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v178 must not connect to production database." },
    { condition: checks.gateDigestValid, code: "GATE_DIGEST_INVALID", source: "cross-project-evidence-retention-gate", message: "Gate digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked" ? "RETENTION_GATE_BLOCKED" : "RETENTION_GATE_NOT_APPROVAL",
      severity: "warning",
      source: "cross-project-evidence-retention-gate",
      message: gateState === "blocked"
        ? "Cross-project evidence retention gate has blockers."
        : "This gate proves retention evidence shape only; it is not release, rollback, restore, or production auth approval.",
    },
    {
      code: "RETENTION_PLACEHOLDERS_REQUIRE_OPERATOR_CONFIRMATION",
      severity: "warning",
      source: "cross-project-evidence-retention-gate",
      message: "Java and mini-kv retained artifact placeholders must be replaced by an external operator process before production use.",
    },
  ];
}

function collectRecommendations(gateState: GateState): GateMessage[] {
  return [
    {
      code: gateState === "blocked"
        ? "FIX_RETENTION_GATE_BLOCKERS"
        : "PREPARE_PRODUCTION_RELEASE_PRE_APPROVAL_PACKET",
      severity: "recommendation",
      source: "cross-project-evidence-retention-gate",
      message: gateState === "blocked"
        ? "Fix missing identity or retention evidence before archiving v178."
        : "After v178 is archived, build Node v179 as a pre-approval packet without creating an approval decision.",
    },
  ];
}

function collectMessages(
  severity: "blocker",
  specs: Array<{
    condition: boolean | undefined;
    code: string;
    source: GateMessage["source"];
    message: string;
  }>,
): GateMessage[] {
  const messages: GateMessage[] = [];
  for (const spec of specs) {
    if (!spec.condition) {
      messages.push({ code: spec.code, severity, source: spec.source, message: spec.message });
    }
  }
  return messages;
}

function digestGate(value: unknown): string {
  return digestReleaseReport(value);
}
