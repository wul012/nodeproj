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
  loadDeploymentEvidenceIntakeGate,
} from "./deploymentEvidenceIntakeGate.js";
import {
  loadDeploymentEvidenceVerification,
} from "./deploymentEvidenceVerification.js";
import type {
  DeploymentEvidenceIntakeGateProfile,
} from "./deploymentEvidenceIntakeGate.js";
import type {
  DeploymentEvidenceVerificationProfile,
} from "./deploymentEvidenceVerification.js";

type PacketState = "ready-for-manual-release-window-review" | "blocked";
type PacketActor = "operator" | "node" | "java" | "mini-kv";

interface PacketMessage {
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

interface ReleaseWindowStep {
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

interface ForbiddenOperation {
  operation: string;
  reason: string;
  blockedBy:
    | "Node v173 release window readiness packet"
    | "Node v172 deployment evidence verification"
    | "Java v61 rollback approval record fixture"
    | "mini-kv v70 restore drill evidence"
    | "runtime safety";
}

interface JavaRollbackApprovalRecordReference {
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

interface MiniKvRestoreDrillEvidenceReference {
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

const JAVA_V61_ROLLBACK_APPROVAL_RECORD: JavaRollbackApprovalRecordReference = Object.freeze({
  project: "advanced-order-platform",
  plannedVersion: "Java v61",
  evidenceTag: "v61订单平台rollback-approval-record-fixture",
  fixtureVersion: "java-rollback-approval-record-fixture.v1",
  scenario: "ROLLBACK_APPROVAL_RECORD_FIXTURE_SAMPLE",
  sourceEvidenceEndpoint: "/api/v1/ops/evidence",
  fixtureEndpoint: "/contracts/rollback-approval-record.fixture.json",
  fixtureSource: "src/main/resources/static/contracts/rollback-approval-record.fixture.json",
  archivePath: "c/61",
  fixtureMode: "READ_ONLY_APPROVAL_RECORD_FIXTURE",
  fixtureGoal: "Capture the human rollback approval record shape for a release window packet without executing rollback or reading secret values.",
  approvalRecord: {
    reviewer: "rollback-reviewer-placeholder",
    approvalTimestampPlaceholder: "approval-timestamp-placeholder",
    rollbackTarget: "release-tag-or-artifact-version-placeholder",
    approvalStatus: "PENDING_OPERATOR_CONFIRMATION",
    operatorMustReplacePlaceholders: true,
  } as JavaRollbackApprovalRecordReference["approvalRecord"],
  databaseMigration: {
    directionOptions: [
      "forward-only",
      "rollback-script-reviewed",
      "no-database-change",
    ],
    selectedDirection: "no-database-change",
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
  } as JavaRollbackApprovalRecordReference["databaseMigration"],
  requiredRecordFieldNames: [
    "reviewer",
    "approval-timestamp-placeholder",
    "rollback-target",
    "database-migration-direction",
    "rollback-sql-review-gate",
    "no-secret-value-boundary",
  ] as JavaRollbackApprovalRecordReference["requiredRecordFieldNames"],
  recordArtifacts: [
    "/contracts/rollback-approval-handoff.sample.json",
    "/contracts/rollback-sql-review-gate.sample.json",
    "/contracts/production-deployment-runbook-contract.sample.json",
    "/contracts/production-secret-source-contract.sample.json",
    "/contracts/release-bundle-manifest.sample.json",
  ] as JavaRollbackApprovalRecordReference["recordArtifacts"],
  noSecretValueBoundaries: [
    "Record fixture stores metadata only",
    "Secret values must not be read by Java or Node when rendering this record",
    "Secret values must not be embedded in approval record JSON",
    "Node may render the release window packet only",
  ] as JavaRollbackApprovalRecordReference["noSecretValueBoundaries"],
  nodeConsumption: {
    nodeMayConsume: true,
    nodeMayRenderReleaseWindowPacket: true,
    nodeMayTriggerRollback: false,
    nodeMayExecuteRollbackSql: false,
    nodeMayModifyRuntimeConfig: false,
    nodeMayReadSecretValues: false,
    requiresUpstreamActionsEnabled: false,
  } as JavaRollbackApprovalRecordReference["nodeConsumption"],
  boundaries: {
    rollbackExecutionAllowed: false,
    rollbackSqlExecutionAllowed: false,
    requiresProductionDatabase: false,
    requiresProductionSecrets: false,
    changesOrderCreateSemantics: false,
    changesPaymentOrInventoryTransaction: false,
    changesOutboxOrReplayExecution: false,
    changesOrderTransactionSemantics: false,
    connectsMiniKv: false,
  } as JavaRollbackApprovalRecordReference["boundaries"],
  forbiddenOperations: [
    "Executing Java rollback from this fixture",
    "Executing database rollback SQL from this fixture",
    "Connecting production database from this fixture",
    "Reading production secret values from this fixture",
    "Embedding secret values in approval record JSON",
    "Triggering Java rollback from Node",
    "POST /api/v1/orders",
    "POST /api/v1/failed-events/{id}/replay",
  ] as JavaRollbackApprovalRecordReference["forbiddenOperations"],
  readOnlyEvidence: true,
  executionAllowed: false,
});

const MINI_KV_V70_RESTORE_DRILL_EVIDENCE: MiniKvRestoreDrillEvidenceReference = Object.freeze({
  project: "mini-kv",
  plannedVersion: "mini-kv v70",
  evidenceTag: "第七十版恢复演练证据",
  drillVersion: "mini-kv-restore-drill-evidence.v1",
  evidencePath: "fixtures/release/restore-drill-evidence.json",
  archivePath: "c/70",
  projectVersion: "0.70.0",
  releaseVersion: "v70",
  readOnly: true,
  executionAllowed: false,
  restoreExecutionAllowed: false,
  orderAuthoritative: false,
  noRuntimeCommandAdded: true,
  restoreDrillTarget: {
    targetReleaseVersion: "v70",
    currentReleaseVersion: "v70",
    previousEvidence: [
      "fixtures/release/verification-manifest.json",
      "fixtures/release/release-artifact-digest-package.json",
      "fixtures/release/artifact-digest-compatibility-matrix.json",
      "fixtures/release/restore-dry-run-operator-package.json",
    ],
    digestComparisonPlaceholder: "sha256:<operator-recorded-restore-drill-digest>",
    comparisonBasis: [
      "release artifact digest package v69",
      "artifact digest compatibility matrix v68",
    ],
    operatorConfirmationRequired: true,
  } as MiniKvRestoreDrillEvidenceReference["restoreDrillTarget"],
  restoreDrillCommands: [
    "INFOJSON",
    "CHECKJSON LOAD data/restore-drill.snap",
    "CHECKJSON COMPACT",
    "CHECKJSON SETNXEX restore:drill-token 30 value",
    "STORAGEJSON",
    "HEALTH",
    "GET restore:drill-token",
    "QUIT",
  ] as MiniKvRestoreDrillEvidenceReference["restoreDrillCommands"],
  restoreDrillExpected: [
    "INFOJSON version matches 0.70.0",
    "CHECKJSON LOAD reports store_replace_from_snapshot without executing LOAD",
    "CHECKJSON COMPACT reports wal_rewrite_when_enabled without executing COMPACT",
    "CHECKJSON SETNXEX reports write risks without token claim",
    "STORAGEJSON keeps order_authoritative=false",
    "GET restore:drill-token returns (nil)",
  ] as MiniKvRestoreDrillEvidenceReference["restoreDrillExpected"],
  writeCommandsExecuted: false,
  adminCommandsExecuted: false,
  operatorConfirmation: {
    required: true,
    fields: [
      "restore_operator_id",
      "restore_drill_target_reviewed_at",
      "digest_comparison_recorded_at",
      "fixture_digest_recorded_at",
      "restore_drill_profile_reviewed",
      "boundary_reviewed",
    ],
  } as MiniKvRestoreDrillEvidenceReference["operatorConfirmation"],
  fixtureInputs: [
    "fixtures/release/verification-manifest.json",
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
    "restore drill evidence fixture only",
    "digest comparison placeholder only",
    "restore drill command profile only",
    "no runtime command added",
    "does not execute restore",
    "does not execute LOAD/COMPACT/SETNXEX",
    "does not run Java or Node",
    "does not open UPSTREAM_ACTIONS_ENABLED",
    "not connected to Java transaction chain",
    "mini-kv remains not Java order authority",
  ],
});

const ENDPOINTS = Object.freeze({
  releaseWindowReadinessPacketJson: "/api/v1/production/release-window-readiness-packet",
  releaseWindowReadinessPacketMarkdown: "/api/v1/production/release-window-readiness-packet?format=markdown",
  deploymentEvidenceIntakeGateJson: "/api/v1/production/deployment-evidence-intake-gate",
  deploymentEvidenceVerificationJson: "/api/v1/production/deployment-evidence-verification",
  javaRollbackApprovalRecordFixture: "/contracts/rollback-approval-record.fixture.json",
  miniKvRestoreDrillEvidence: "fixtures/release/restore-drill-evidence.json",
  currentRoadmap: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
});

export function loadReleaseWindowReadinessPacket(config: AppConfig): ReleaseWindowReadinessPacketProfile {
  const intakeGate = loadDeploymentEvidenceIntakeGate(config);
  const verification = loadDeploymentEvidenceVerification(config);
  const releaseWindowSteps = createReleaseWindowSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, intakeGate, verification, releaseWindowSteps, forbiddenOperations);
  const packetDigest = digestPacket({
    profileVersion: "release-window-readiness-packet.v1",
    sourceIntakeDigest: intakeGate.gate.intakeDigest,
    sourceVerificationDigest: verification.verification.verificationDigest,
    javaVersion: JAVA_V61_ROLLBACK_APPROVAL_RECORD.plannedVersion,
    javaFixtureVersion: JAVA_V61_ROLLBACK_APPROVAL_RECORD.fixtureVersion,
    miniKvVersion: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.plannedVersion,
    miniKvDrillVersion: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.drillVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      packetDigestValid: undefined,
      readyForReleaseWindowReadinessPacket: undefined,
    },
  });
  checks.packetDigestValid = isReleaseReportDigest(packetDigest);
  completeAggregateReadyCheck(checks, "readyForReleaseWindowReadinessPacket");
  const packetState: PacketState = checks.readyForReleaseWindowReadinessPacket
    ? "ready-for-manual-release-window-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Release window readiness packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "release-window-readiness-packet.v1",
    packetState,
    readyForReleaseWindowReadinessPacket: checks.readyForReleaseWindowReadinessPacket,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sourceIntakeDigest: intakeGate.gate.intakeDigest,
      sourceVerificationDigest: verification.verification.verificationDigest,
      sourceIntakeProfileVersion: intakeGate.profileVersion,
      sourceVerificationProfileVersion: verification.profileVersion,
      javaVersion: JAVA_V61_ROLLBACK_APPROVAL_RECORD.plannedVersion,
      javaFixtureVersion: JAVA_V61_ROLLBACK_APPROVAL_RECORD.fixtureVersion,
      miniKvVersion: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.plannedVersion,
      miniKvDrillVersion: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.drillVersion,
      packetMode: "manual-release-window-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      nodeMayTriggerRelease: false,
      nodeMayTriggerDeployment: false,
      nodeMayTriggerRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayReadSecretValues: false,
      nodeMayConnectProductionDatabase: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionOperationsAuthorized: false,
    },
    checks,
    artifacts: {
      deploymentEvidenceIntakeGate: summarizeIntakeGate(intakeGate),
      deploymentEvidenceVerification: summarizeVerification(verification),
      javaRollbackApprovalRecordFixture: { ...JAVA_V61_ROLLBACK_APPROVAL_RECORD },
      miniKvRestoreDrillEvidence: { ...MINI_KV_V70_RESTORE_DRILL_EVIDENCE },
      noExecutionBoundary: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        nodeMayTriggerRelease: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
      },
    },
    releaseWindowSteps,
    forbiddenOperations,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      sourceEvidenceCount: 4,
      releaseWindowStepCount: releaseWindowSteps.length,
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
      "Use this packet for manual release-window review only; it is not production release approval.",
      "Keep Java v61 rollback approval record and mini-kv v70 restore drill as read-only evidence.",
      "Pause before production secret manager, production database, Java rollback SQL, mini-kv restore, or any real release operation.",
    ],
  };
}

export function renderReleaseWindowReadinessPacketMarkdown(
  profile: ReleaseWindowReadinessPacketProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Release window readiness packet",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for release window readiness packet": profile.readyForReleaseWindowReadinessPacket,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Packet", entries: profile.packet },
      { heading: "Checks", entries: profile.checks },
      { heading: "Deployment Evidence Intake Gate", entries: profile.artifacts.deploymentEvidenceIntakeGate },
      { heading: "Deployment Evidence Verification", entries: profile.artifacts.deploymentEvidenceVerification },
      { heading: "Java Rollback Approval Record Fixture", entries: profile.artifacts.javaRollbackApprovalRecordFixture },
      { heading: "mini-kv Restore Drill Evidence", entries: profile.artifacts.miniKvRestoreDrillEvidence },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Release Window Steps",
        items: profile.releaseWindowSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Dry run only", "dryRunOnly"],
            ["Read only", "readOnly"],
            ["Mutates state", "mutatesState"],
            ["Executes release", "executesRelease"],
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
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No release window readiness packet blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No release window readiness packet warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No release window readiness packet recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  intakeGate: DeploymentEvidenceIntakeGateProfile,
  verification: DeploymentEvidenceVerificationProfile,
  releaseWindowSteps: ReleaseWindowStep[],
  forbiddenOperations: ForbiddenOperation[],
): Record<string, boolean> {
  return {
    deploymentEvidenceIntakeGateReady: intakeGate.readyForDeploymentEvidenceIntakeGate
      && intakeGate.gateState === "ready-for-manual-deployment-evidence-review",
    deploymentEvidenceVerificationReady: verification.readyForDeploymentEvidenceVerification
      && verification.verificationState === "ready-for-manual-deployment-evidence-verification",
    intakeDigestValid: isReleaseReportDigest(intakeGate.gate.intakeDigest),
    verificationDigestValid: isReleaseReportDigest(verification.verification.verificationDigest),
    previousVerificationStillBlocksProduction: verification.readyForProductionDeployment === false
      && verification.readyForProductionRollback === false
      && verification.readyForProductionOperations === false
      && verification.executionAllowed === false,
    javaV61ApprovalFixtureReady: JAVA_V61_ROLLBACK_APPROVAL_RECORD.plannedVersion === "Java v61"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.evidenceTag === "v61订单平台rollback-approval-record-fixture",
    javaFixtureVersionReady: JAVA_V61_ROLLBACK_APPROVAL_RECORD.fixtureVersion === "java-rollback-approval-record-fixture.v1",
    javaApprovalRecordPlaceholdersPresent: JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.reviewer === "rollback-reviewer-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.approvalTimestampPlaceholder === "approval-timestamp-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.rollbackTarget === "release-tag-or-artifact-version-placeholder"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.approvalRecord.operatorMustReplacePlaceholders === true,
    javaRequiredFieldsComplete: JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.length === 6
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("reviewer")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("rollback-target")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.requiredRecordFieldNames.includes("no-secret-value-boundary"),
    javaMigrationDirectionClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.selectedDirection === "no-database-change"
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.rollbackSqlExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.databaseMigration.requiresProductionDatabase === false,
    javaNoSecretBoundaryClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.noSecretValueBoundaries.length === 4
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayReadSecretValues === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.requiresProductionSecrets === false,
    javaNodeConsumptionReadOnly: JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayConsume === true
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayRenderReleaseWindowPacket === true
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayTriggerRollback === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.nodeMayExecuteRollbackSql === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.nodeConsumption.requiresUpstreamActionsEnabled === false,
    javaProductionBoundariesClosed: JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.rollbackExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.rollbackSqlExecutionAllowed === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.requiresProductionDatabase === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.changesOrderTransactionSemantics === false
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.boundaries.connectsMiniKv === false,
    javaForbiddenOperationsComplete: JAVA_V61_ROLLBACK_APPROVAL_RECORD.forbiddenOperations.includes("Triggering Java rollback from Node")
      && JAVA_V61_ROLLBACK_APPROVAL_RECORD.forbiddenOperations.includes("Embedding secret values in approval record JSON"),
    javaArchiveRootUsesC: JAVA_V61_ROLLBACK_APPROVAL_RECORD.archivePath === "c/61",
    miniKvV70RestoreDrillReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.plannedVersion === "mini-kv v70"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.evidenceTag === "第七十版恢复演练证据",
    miniKvDrillVersionReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.drillVersion === "mini-kv-restore-drill-evidence.v1"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.projectVersion === "0.70.0",
    miniKvTargetReleaseReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.targetReleaseVersion === "v70"
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.currentReleaseVersion === "v70",
    miniKvPreviousEvidenceComplete: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/release-artifact-digest-package.json")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/artifact-digest-compatibility-matrix.json")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.previousEvidence.includes("fixtures/release/restore-dry-run-operator-package.json"),
    miniKvDigestPlaceholderPresent: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillTarget.digestComparisonPlaceholder === "sha256:<operator-recorded-restore-drill-digest>",
    miniKvCheckJsonCommandsReady: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON LOAD data/restore-drill.snap")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON COMPACT")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("CHECKJSON SETNXEX restore:drill-token 30 value")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreDrillCommands.includes("GET restore:drill-token"),
    miniKvWriteAndAdminCommandsNotExecuted: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.writeCommandsExecuted === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.adminCommandsExecuted === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreExecutionAllowed === false,
    miniKvOperatorConfirmationComplete: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.required === true
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.fields.includes("restore_operator_id")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.operatorConfirmation.fields.includes("boundary_reviewed"),
    miniKvBoundariesClosed: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.executionAllowed === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.restoreExecutionAllowed === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.orderAuthoritative === false
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.noRuntimeCommandAdded === true
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.boundaries.includes("does not execute LOAD/COMPACT/SETNXEX")
      && MINI_KV_V70_RESTORE_DRILL_EVIDENCE.boundaries.includes("not connected to Java transaction chain"),
    miniKvArchiveRootUsesC: MINI_KV_V70_RESTORE_DRILL_EVIDENCE.archivePath === "c/70",
    releaseWindowStepsDryRunOnly: releaseWindowSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    )),
    forbiddenOperationsCovered: forbiddenOperations.length === 9
      && forbiddenOperations.some((operation) => operation.operation === "Trigger Java rollback from Node v173")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v173"),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && verification.verification.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    packetDigestValid: false,
    readyForReleaseWindowReadinessPacket: false,
  };
}

function createReleaseWindowSteps(): ReleaseWindowStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      actor: "node",
      action: "Load Node v171 intake gate and Node v172 verification evidence.",
      evidenceTarget: "/api/v1/production/deployment-evidence-verification",
      expectedEvidence: "v171 intake digest and v172 verification digest are valid.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 2,
      phase: "collect",
      actor: "java",
      action: "Reference Java v61 rollback approval record fixture.",
      evidenceTarget: "/contracts/rollback-approval-record.fixture.json",
      expectedEvidence: "Reviewer, timestamp placeholder, rollback target, migration direction, and no-secret boundary are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 3,
      phase: "collect",
      actor: "mini-kv",
      action: "Reference mini-kv v70 restore drill evidence fixture.",
      evidenceTarget: "fixtures/release/restore-drill-evidence.json",
      expectedEvidence: "CHECKJSON restore drill, digest comparison placeholder, and operator confirmation fields are present.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 4,
      phase: "compare",
      actor: "node",
      action: "Compare all sources into a single manual release-window packet.",
      evidenceTarget: "release-window-readiness-packet.v1",
      expectedEvidence: "All sources remain read-only and no production operation is authorized.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 5,
      phase: "decide",
      actor: "operator",
      action: "Review packet outside Node before any real release window.",
      evidenceTarget: "manual release-window review",
      expectedEvidence: "Operator replaces placeholders outside this packet and pauses on unclear evidence.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Archive packet evidence and keep production flags closed.",
      evidenceTarget: "c/173",
      expectedEvidence: "JSON, Markdown, tests, screenshot, and walkthrough evidence are archived.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
  ];
}

function createForbiddenOperations(): ForbiddenOperation[] {
  return [
    {
      operation: "Trigger Java rollback from Node v173",
      reason: "Java v61 only provides a read-only approval record fixture.",
      blockedBy: "Java v61 rollback approval record fixture",
    },
    {
      operation: "Execute Java rollback SQL from Node v173",
      reason: "SQL execution remains outside the release window packet.",
      blockedBy: "Java v61 rollback approval record fixture",
    },
    {
      operation: "Execute mini-kv restore from Node v173",
      reason: "mini-kv v70 restore drill evidence uses CHECKJSON only.",
      blockedBy: "mini-kv v70 restore drill evidence",
    },
    {
      operation: "Execute mini-kv LOAD, COMPACT, or SETNXEX",
      reason: "Those commands are inspected as risk profiles and are not run by Node.",
      blockedBy: "mini-kv v70 restore drill evidence",
    },
    {
      operation: "Read production secret values",
      reason: "The release window packet records secret boundaries, not secret values.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Connect production database",
      reason: "No production database connection is required for packet rendering.",
      blockedBy: "runtime safety",
    },
    {
      operation: "Start Java or mini-kv automatically",
      reason: "Node v173 consumes archived evidence only.",
      blockedBy: "Node v173 release window readiness packet",
    },
    {
      operation: "Authorize production release",
      reason: "The packet is manual review evidence, not a release approval.",
      blockedBy: "Node v173 release window readiness packet",
    },
    {
      operation: "Open UPSTREAM_ACTIONS_ENABLED",
      reason: "The packet is valid only with upstream actions disabled.",
      blockedBy: "runtime safety",
    },
  ];
}

function summarizeIntakeGate(profile: DeploymentEvidenceIntakeGateProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    intakeDigest: profile.gate.intakeDigest,
    readyForDeploymentEvidenceIntakeGate: profile.readyForDeploymentEvidenceIntakeGate,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    gateCheckCount: profile.summary.gateCheckCount,
    passedGateCheckCount: profile.summary.passedGateCheckCount,
  };
}

function summarizeVerification(profile: DeploymentEvidenceVerificationProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    verificationState: profile.verificationState,
    verificationDigest: profile.verification.verificationDigest,
    sourceIntakeDigest: profile.verification.sourceIntakeDigest,
    readyForDeploymentEvidenceVerification: profile.readyForDeploymentEvidenceVerification,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): PacketMessage[] {
  return collectBlockingMessages<PacketMessage>([
    { condition: checks.deploymentEvidenceIntakeGateReady, code: "DEPLOYMENT_INTAKE_GATE_NOT_READY", source: "deployment-evidence-intake-gate", message: "Node v171 intake gate must be ready before release window packet generation." },
    { condition: checks.deploymentEvidenceVerificationReady, code: "DEPLOYMENT_VERIFICATION_NOT_READY", source: "deployment-evidence-verification", message: "Node v172 verification must be ready before release window packet generation." },
    { condition: checks.intakeDigestValid, code: "INTAKE_DIGEST_INVALID", source: "deployment-evidence-intake-gate", message: "v171 intake digest must be valid." },
    { condition: checks.verificationDigestValid, code: "VERIFICATION_DIGEST_INVALID", source: "deployment-evidence-verification", message: "v172 verification digest must be valid." },
    { condition: checks.previousVerificationStillBlocksProduction, code: "PREVIOUS_VERIFICATION_UNLOCKS_PRODUCTION", source: "deployment-evidence-verification", message: "v172 verification must still block production operations." },
    { condition: checks.javaV61ApprovalFixtureReady, code: "JAVA_V61_APPROVAL_FIXTURE_NOT_READY", source: "java-v61-rollback-approval-record-fixture", message: "Java v61 rollback approval record fixture must be present." },
    { condition: checks.javaFixtureVersionReady, code: "JAVA_APPROVAL_FIXTURE_VERSION_INVALID", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture version must match v61." },
    { condition: checks.javaApprovalRecordPlaceholdersPresent, code: "JAVA_APPROVAL_PLACEHOLDERS_MISSING", source: "java-v61-rollback-approval-record-fixture", message: "Java approval record placeholders must remain explicit." },
    { condition: checks.javaRequiredFieldsComplete, code: "JAVA_APPROVAL_FIELDS_INCOMPLETE", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must list required manual record fields." },
    { condition: checks.javaMigrationDirectionClosed, code: "JAVA_MIGRATION_DIRECTION_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java migration direction must not allow SQL execution or production database access." },
    { condition: checks.javaNoSecretBoundaryClosed, code: "JAVA_SECRET_BOUNDARY_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must not expose secret values." },
    { condition: checks.javaNodeConsumptionReadOnly, code: "JAVA_NODE_CONSUMPTION_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Node may render but must not trigger rollback or execute SQL." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v61-rollback-approval-record-fixture", message: "Java approval fixture must keep production boundaries closed." },
    { condition: checks.javaForbiddenOperationsComplete, code: "JAVA_FORBIDDEN_OPERATIONS_INCOMPLETE", source: "java-v61-rollback-approval-record-fixture", message: "Java fixture must list rollback and secret forbidden operations." },
    { condition: checks.javaArchiveRootUsesC, code: "JAVA_ARCHIVE_NOT_IN_C", source: "java-v61-rollback-approval-record-fixture", message: "Java v61 archive path must use c/61." },
    { condition: checks.miniKvV70RestoreDrillReady, code: "MINI_KV_V70_RESTORE_DRILL_NOT_READY", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv v70 restore drill evidence must be present." },
    { condition: checks.miniKvDrillVersionReady, code: "MINI_KV_DRILL_VERSION_INVALID", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill evidence version must match v70." },
    { condition: checks.miniKvTargetReleaseReady, code: "MINI_KV_TARGET_RELEASE_INVALID", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill target must be v70." },
    { condition: checks.miniKvPreviousEvidenceComplete, code: "MINI_KV_PREVIOUS_EVIDENCE_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must reference prior release evidence." },
    { condition: checks.miniKvDigestPlaceholderPresent, code: "MINI_KV_DIGEST_PLACEHOLDER_MISSING", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must keep operator digest comparison as a placeholder." },
    { condition: checks.miniKvCheckJsonCommandsReady, code: "MINI_KV_CHECKJSON_COMMANDS_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must use CHECKJSON for risky commands." },
    { condition: checks.miniKvWriteAndAdminCommandsNotExecuted, code: "MINI_KV_WRITE_OR_ADMIN_EXECUTED", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must not execute writes, admin commands, or restore." },
    { condition: checks.miniKvOperatorConfirmationComplete, code: "MINI_KV_OPERATOR_CONFIRMATION_INCOMPLETE", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill must include operator confirmation fields." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv restore drill boundaries must remain closed." },
    { condition: checks.miniKvArchiveRootUsesC, code: "MINI_KV_ARCHIVE_NOT_IN_C", source: "mini-kv-v70-restore-drill-evidence", message: "mini-kv v70 archive path must use c/70." },
    { condition: checks.releaseWindowStepsDryRunOnly, code: "RELEASE_WINDOW_STEPS_MUTATE_STATE", source: "release-window-readiness-packet", message: "Release window steps must remain read-only dry-run steps." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "release-window-readiness-packet", message: "Packet must list key forbidden operations." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "release-window-readiness-packet", message: "Node v173 must not start Java or mini-kv." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_NOT_ALLOWED", source: "runtime-config", message: "Node v173 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_NOT_ALLOWED", source: "runtime-config", message: "Node v173 must not connect to production databases." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production release." },
    { condition: checks.readyForProductionRollbackStillFalse, code: "PRODUCTION_ROLLBACK_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production rollback." },
    { condition: checks.readyForProductionOperationsStillFalse, code: "PRODUCTION_OPERATIONS_UNLOCKED", source: "release-window-readiness-packet", message: "Packet must not authorize production operations." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "release-window-readiness-packet", message: "Packet digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "RELEASE_WINDOW_PACKET_BLOCKED"
        : "RELEASE_WINDOW_PACKET_NOT_PRODUCTION_APPROVAL",
      severity: "warning",
      source: "release-window-readiness-packet",
      message: packetState === "blocked"
        ? "Release window readiness packet has blockers."
        : "Release window readiness packet is ready for manual review only.",
    },
    {
      code: "PLACEHOLDERS_REQUIRE_OPERATOR_REPLACEMENT",
      severity: "warning",
      source: "java-v61-rollback-approval-record-fixture",
      message: "Java approval reviewer, timestamp, and rollback target placeholders must be replaced outside Node before any real release window.",
    },
    {
      code: "RESTORE_DRILL_DIGEST_PLACEHOLDER_REQUIRES_REVIEW",
      severity: "warning",
      source: "mini-kv-v70-restore-drill-evidence",
      message: "mini-kv digest comparison placeholder must be reviewed outside Node before any restore window.",
    },
  ];
}

function collectRecommendations(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_RELEASE_WINDOW_PACKET_BLOCKERS"
        : "MANUAL_RELEASE_WINDOW_REVIEW_ONLY",
      severity: "recommendation",
      source: "release-window-readiness-packet",
      message: packetState === "blocked"
        ? "Fix release window packet blockers before creating a new production-stage plan."
        : "Use v173 as a manual release-window review packet; do not treat it as release approval.",
    },
  ];
}

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
