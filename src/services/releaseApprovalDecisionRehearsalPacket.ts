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
  loadApprovalLedgerDryRunEnvelope,
  type ApprovalLedgerDryRunEnvelopeProfile,
} from "./approvalLedgerDryRunEnvelope.js";

type PacketState = "ready-for-release-approval-decision-rehearsal-review" | "blocked";
type RehearsalActor = "node" | "operator" | "release-manager" | "auditor" | "java" | "mini-kv";

interface RehearsalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "release-approval-decision-rehearsal-packet"
    | "approval-ledger-dry-run-envelope"
    | "java-v65-rollback-approver-evidence-fixture"
    | "mini-kv-v74-restore-approval-boundary"
    | "runtime-config";
  message: string;
}

interface JavaRollbackApproverEvidenceReference {
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

interface MiniKvRestoreApprovalBoundaryReference {
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

interface RehearsalInput {
  id: string;
  source:
    | "approval-ledger-dry-run-envelope"
    | "java-v65-rollback-approver-evidence-fixture"
    | "mini-kv-v74-restore-approval-boundary";
  status: "present-for-rehearsal" | "placeholder-requires-operator" | "explicitly-blocked-for-production";
  evidenceTarget: string;
  nodeMayInfer: false;
  nodeMayCreateApprovalDecision: false;
  nodeMayWriteApprovalLedger: false;
}

interface RehearsalStep {
  order: number;
  phase: "collect" | "compare" | "compose" | "digest" | "preserve" | "stop";
  actor: RehearsalActor;
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
    | "Node v182 release approval decision rehearsal packet"
    | "Node v181 approval ledger dry-run envelope"
    | "Java v65 rollback approver evidence fixture"
    | "mini-kv v74 restore approval boundary"
    | "runtime safety";
}

export interface ReleaseApprovalDecisionRehearsalPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "release-approval-decision-rehearsal-packet.v1";
  packetState: PacketState;
  readyForReleaseApprovalDecisionRehearsalPacket: boolean;
  readyForApprovalDecision: false;
  readyForApprovalLedgerWrite: false;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  rehearsalOnly: true;
  executionAllowed: false;
  packet: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  rehearsalInputs: RehearsalInput[];
  rehearsalSteps: RehearsalStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: RehearsalMessage[];
  warnings: RehearsalMessage[];
  recommendations: RehearsalMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const JAVA_V65_ROLLBACK_APPROVER_EVIDENCE: JavaRollbackApproverEvidenceReference = {
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

const MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY: MiniKvRestoreApprovalBoundaryReference = {
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

const ENDPOINTS = Object.freeze({
  releaseApprovalDecisionRehearsalPacketJson: "/api/v1/production/release-approval-decision-rehearsal-packet",
  releaseApprovalDecisionRehearsalPacketMarkdown: "/api/v1/production/release-approval-decision-rehearsal-packet?format=markdown",
  approvalLedgerDryRunEnvelopeJson: "/api/v1/production/approval-ledger-dry-run-envelope",
  javaRollbackApproverEvidenceFixture: "/contracts/rollback-approver-evidence.fixture.json",
  miniKvRestoreApprovalBoundaryFixture: "fixtures/release/restore-approval-boundary.json",
  currentRoadmap: "docs/plans/v179-post-pre-approval-roadmap.md",
});

export function loadReleaseApprovalDecisionRehearsalPacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ReleaseApprovalDecisionRehearsalPacketProfile {
  const dryRunEnvelope = loadApprovalLedgerDryRunEnvelope(config, headers);
  const rehearsalInputs = createRehearsalInputs();
  const rehearsalSteps = createRehearsalSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    dryRunEnvelope,
    rehearsalInputs,
    rehearsalSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const packetDigest = digestPacket({
    profileVersion: "release-approval-decision-rehearsal-packet.v1",
    sourceDryRunEnvelopeDigest: stringValue(dryRunEnvelope.envelope.envelopeDigest),
    javaFixtureVersion: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.fixtureVersion,
    javaRollbackApprover: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.rollbackApprover,
    miniKvBoundaryVersion: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaryVersion,
    miniKvApprovalBoundaryId: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.approvalBoundaryId,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      packetDigestValid: undefined,
      readyForReleaseApprovalDecisionRehearsalPacket: undefined,
    },
  });
  checks.packetDigestValid = isReleaseReportDigest(packetDigest);
  completeAggregateReadyCheck(checks, "readyForReleaseApprovalDecisionRehearsalPacket");
  const packetState: PacketState = checks.readyForReleaseApprovalDecisionRehearsalPacket
    ? "ready-for-release-approval-decision-rehearsal-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Release approval decision rehearsal packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "release-approval-decision-rehearsal-packet.v1",
    packetState,
    readyForReleaseApprovalDecisionRehearsalPacket: checks.readyForReleaseApprovalDecisionRehearsalPacket,
    readyForApprovalDecision: false,
    readyForApprovalLedgerWrite: false,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    rehearsalOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sourceDryRunEnvelopeDigest: stringValue(dryRunEnvelope.envelope.envelopeDigest),
      sourceDryRunEnvelopeVersion: dryRunEnvelope.profileVersion,
      sourceDryRunEnvelopeState: dryRunEnvelope.envelopeState,
      sourceDryRunEnvelopeReady: dryRunEnvelope.readyForApprovalLedgerDryRunEnvelope,
      javaFixtureVersion: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.fixtureVersion,
      javaRollbackApprover: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.rollbackApprover,
      javaMigrationDirection: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.selectedDirection,
      javaRollbackSqlArtifactReference: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.rollbackSqlArtifactReference,
      miniKvBoundaryVersion: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaryVersion,
      miniKvApprovalBoundaryId: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.approvalBoundaryId,
      miniKvRestoreApproverPlaceholder: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.restoreApproverPlaceholder,
      miniKvRestoreTargetPlaceholder: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.restoreTargetPlaceholder,
      miniKvArtifactDigestPlaceholder: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.artifactDigestPlaceholder,
      rehearsalMode: "release-approval-decision-rehearsal-only",
      approvalDecisionCreated: false,
      approvalLedgerWriteAllowed: false,
      approvalLedgerWritten: false,
      productionReleaseAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
    },
    checks,
    artifacts: {
      sourceApprovalLedgerDryRunEnvelope: summarizeDryRunEnvelope(dryRunEnvelope),
      javaRollbackApproverEvidenceFixture: { ...JAVA_V65_ROLLBACK_APPROVER_EVIDENCE },
      miniKvRestoreApprovalBoundary: { ...MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY },
      noExecutionBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerRelease: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
      },
    },
    rehearsalInputs,
    rehearsalSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      ...checkSummary,
      rehearsalInputCount: rehearsalInputs.length,
      rehearsalStepCount: rehearsalSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      sourceEnvelopeCheckCount: dryRunEnvelope.summary.checkCount,
      sourceEnvelopePassedCheckCount: dryRunEnvelope.summary.passedCheckCount,
      javaRequiredEvidenceFieldCount: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.requiredEvidenceFieldCount,
      javaEvidenceArtifactCount: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.evidenceArtifactCount,
      miniKvRestoreEvidenceFieldCount: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.restoreApprovalEvidence.fieldCount,
      miniKvCheckJsonCommandCount: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.checkjsonBoundaryEvidence.commandCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this rehearsal packet as proof that Node v181, Java v65, and mini-kv v74 are readable together.",
      "Do not create a real approval decision or approval ledger entry from this rehearsal packet.",
      "Start the next plan with an actual Node quality optimization, especially splitting opsPromotionArchiveBundle.ts.",
    ],
  };
}

export function renderReleaseApprovalDecisionRehearsalPacketMarkdown(
  profile: ReleaseApprovalDecisionRehearsalPacketProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Release approval decision rehearsal packet",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for release approval decision rehearsal packet": profile.readyForReleaseApprovalDecisionRehearsalPacket,
      "Ready for approval decision": profile.readyForApprovalDecision,
      "Ready for approval ledger write": profile.readyForApprovalLedgerWrite,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Rehearsal only": profile.rehearsalOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Packet", entries: profile.packet },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Approval Ledger Dry-run Envelope", entries: profile.artifacts.sourceApprovalLedgerDryRunEnvelope },
      { heading: "Java Rollback Approver Evidence Fixture", entries: profile.artifacts.javaRollbackApproverEvidenceFixture },
      { heading: "mini-kv Restore Approval Boundary", entries: profile.artifacts.miniKvRestoreApprovalBoundary },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Rehearsal Inputs",
        items: profile.rehearsalInputs,
        renderItem: renderRehearsalInput,
      },
      {
        heading: "Rehearsal Steps",
        items: profile.rehearsalSteps,
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
        emptyText: "No release approval decision rehearsal blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No release approval decision rehearsal warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No release approval decision rehearsal recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createRehearsalInputs(): RehearsalInput[] {
  return [
    input("node-approval-ledger-dry-run-envelope-present", "approval-ledger-dry-run-envelope", "present-for-rehearsal", ENDPOINTS.approvalLedgerDryRunEnvelopeJson),
    input("java-rollback-approver-evidence-present", "java-v65-rollback-approver-evidence-fixture", "placeholder-requires-operator", ENDPOINTS.javaRollbackApproverEvidenceFixture),
    input("java-rollback-sql-boundary-closed", "java-v65-rollback-approver-evidence-fixture", "explicitly-blocked-for-production", "databaseMigration.rollbackSqlExecutionAllowed=false"),
    input("mini-kv-restore-approval-boundary-present", "mini-kv-v74-restore-approval-boundary", "placeholder-requires-operator", ENDPOINTS.miniKvRestoreApprovalBoundaryFixture),
    input("mini-kv-java-transaction-chain-disconnected", "mini-kv-v74-restore-approval-boundary", "explicitly-blocked-for-production", "java_transaction_chain_connected=false"),
  ];
}

function input(
  id: string,
  source: RehearsalInput["source"],
  status: RehearsalInput["status"],
  evidenceTarget: string,
): RehearsalInput {
  return {
    id,
    source,
    status,
    evidenceTarget,
    nodeMayInfer: false,
    nodeMayCreateApprovalDecision: false,
    nodeMayWriteApprovalLedger: false,
  };
}

function createRehearsalSteps(): RehearsalStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v181 approval ledger dry-run envelope.", ENDPOINTS.approvalLedgerDryRunEnvelopeJson, "Envelope is ready, digest-valid, and still non-persistent."),
    createStep(2, "collect", "java", "Reference Java v65 rollback approver evidence fixture.", ENDPOINTS.javaRollbackApproverEvidenceFixture, "Rollback approver, migration direction, SQL artifact reference, and production database boundary are present."),
    createStep(3, "collect", "mini-kv", "Reference mini-kv v74 restore approval boundary fixture.", ENDPOINTS.miniKvRestoreApprovalBoundaryFixture, "Restore approver, target, artifact digest, order authority, and Java transaction chain boundaries are present."),
    createStep(4, "compare", "node", "Compare Node, Java, and mini-kv evidence as rehearsal inputs.", "rehearsalInputs", "All sources are readable for rehearsal while real approval remains blocked."),
    createStep(5, "digest", "node", "Digest the rehearsal packet for archival review.", "packet.packetDigest", "Packet digest is a valid SHA-256 value."),
    createStep(6, "preserve", "auditor", "Preserve JSON, Markdown, screenshot, and code walkthrough as v182 evidence.", "c/182 and code walkthrough", "Evidence is reproducible without upstream execution."),
    createStep(7, "stop", "node", "Stop before approval decision, approval ledger write, release, rollback, or restore execution.", "next plan handoff", "The next plan must begin with actual Node quality optimization."),
  ];
}

function createStep(
  order: number,
  phase: RehearsalStep["phase"],
  actor: RehearsalActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): RehearsalStep {
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
    forbid("Create approval decision from Node v182", "v182 is only a decision rehearsal packet.", "Node v182 release approval decision rehearsal packet"),
    forbid("Write approval ledger from Node v182", "The approval ledger remains dry-run only.", "Node v182 release approval decision rehearsal packet"),
    forbid("Trigger production release from Node v182", "Rehearsal evidence cannot authorize release execution.", "Node v182 release approval decision rehearsal packet"),
    forbid("Trigger production deployment from Node v182", "Deployment still requires a real external approval process.", "Node v182 release approval decision rehearsal packet"),
    forbid("Execute Java rollback from Node v182", "Java v65 records rollback approver evidence only.", "Java v65 rollback approver evidence fixture"),
    forbid("Execute Java rollback SQL from Node v182", "Java v65 forbids rollback SQL execution.", "Java v65 rollback approver evidence fixture"),
    forbid("Execute mini-kv restore from Node v182", "mini-kv v74 is restore approval boundary evidence only.", "mini-kv v74 restore approval boundary"),
    forbid("Execute mini-kv LOAD/COMPACT/SETNXEX from Node v182", "mini-kv v74 uses CHECKJSON boundary evidence only.", "mini-kv v74 restore approval boundary"),
    forbid("Start Java or mini-kv from Node v182", "This endpoint consumes static evidence only.", "runtime safety"),
    forbid("Read production secret values", "Rehearsal packet stores placeholders and digests only.", "runtime safety"),
    forbid("Connect production database", "Rendering the rehearsal packet does not require production database access.", "runtime safety"),
    forbid("Treat v182 as production authentication", "Production IdP remains a blocker.", "runtime safety"),
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
    "Need approval decision creation or approval ledger persistence.",
    "Need release, deployment, rollback, restore, or rollback SQL execution.",
    "Need mini-kv LOAD/COMPACT/SETNXEX execution.",
    "Need mini-kv in Java transaction consistency chain.",
    "Operator signoff, rollback approver, restore approver, restore target, or artifact digest is unclear.",
  ];
}

function createChecks(
  config: AppConfig,
  dryRunEnvelope: ApprovalLedgerDryRunEnvelopeProfile,
  rehearsalInputs: RehearsalInput[],
  rehearsalSteps: RehearsalStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourceDryRunEnvelopeReady: dryRunEnvelope.readyForApprovalLedgerDryRunEnvelope
      && dryRunEnvelope.envelopeState === "ready-for-approval-ledger-dry-run-review",
    sourceDryRunEnvelopeDigestValid: isReleaseReportDigest(dryRunEnvelope.envelope.envelopeDigest),
    sourceDryRunEnvelopeStillBlocksApprovalAndProduction: dryRunEnvelope.readyForApprovalDecision === false
      && dryRunEnvelope.readyForApprovalLedgerWrite === false
      && dryRunEnvelope.readyForProductionRelease === false
      && dryRunEnvelope.readyForProductionDeployment === false
      && dryRunEnvelope.readyForProductionRollback === false
      && dryRunEnvelope.readyForProductionRestore === false
      && dryRunEnvelope.executionAllowed === false,
    javaV65RollbackApproverFixtureReady: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.plannedVersion === "Java v65"
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.fixtureVersion === "java-rollback-approver-evidence-fixture.v1"
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.scenario === "ROLLBACK_APPROVER_EVIDENCE_FIXTURE_SAMPLE",
    javaRollbackApproverRecordComplete: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.rollbackApprover === "rollback-approver-placeholder"
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.operatorMustReplacePlaceholders
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.approverEvidence.evidenceStatus === "PENDING_OPERATOR_CONFIRMATION",
    javaDatabaseMigrationBoundaryClosed: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.selectedDirection === "no-database-change"
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.rollbackSqlTextEmbedded
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.rollbackSqlExecutionAllowed
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.databaseMigration.requiresProductionDatabase,
    javaNodeConsumptionSafe: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayConsume
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayRenderDecisionRehearsalInput
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayCreateApprovalDecision
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayWriteApprovalLedger
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayTriggerRollback
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayExecuteRollbackSql
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.nodeConsumption.nodeMayReadSecretValues,
    javaProductionBoundariesClosed: !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.approvalDecisionCreated
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.approvalLedgerWriteAllowed
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.rollbackExecutionAllowed
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.rollbackSqlExecutionAllowed
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.requiresProductionDatabase
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.requiresProductionSecrets
      && !JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.boundaries.connectsMiniKv,
    javaForbiddenOperationsComplete: JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.forbiddenOperations.length >= 6
      && JAVA_V65_ROLLBACK_APPROVER_EVIDENCE.forbiddenOperations.includes("Executing database rollback SQL from this fixture"),
    miniKvV74RestoreApprovalBoundaryReady: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.plannedVersion === "mini-kv v74"
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaryVersion === "mini-kv-restore-approval-boundary.v1"
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.projectVersion === "0.74.0",
    miniKvApprovalBoundaryTargetComplete: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.approvalBoundaryId === "mini-kv-restore-approval-boundary-v74"
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.restoreApproverPlaceholder.length > 0
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.restoreTargetPlaceholder.length > 0
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.artifactDigestPlaceholder.startsWith("sha256:")
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.javaTransactionChain === "disconnected"
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.approvalBoundaryTarget.orderAuthoritative,
    miniKvRestoreEvidenceComplete: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.restoreApprovalEvidence.fieldCount === 7
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.restoreApprovalEvidence.requiredConfirmationCount === 6,
    miniKvCheckJsonBoundaryEvidenceReadOnly: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.checkjsonBoundaryEvidence.commandCount === 8
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.checkjsonBoundaryEvidence.writeCommandsExecuted
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.checkjsonBoundaryEvidence.adminCommandsExecuted
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.checkjsonBoundaryEvidence.approvalDecisionRehearsalInput,
    miniKvBoundariesClosed: MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.readOnly
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.executionAllowed
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.restoreExecutionAllowed
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.orderAuthoritative
      && !MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.javaTransactionChainConnected
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaries.includes("Java transaction chain disconnected")
      && MINI_KV_V74_RESTORE_APPROVAL_BOUNDARY.boundaries.includes("mini-kv remains not Java order authority"),
    rehearsalInputsComplete: rehearsalInputs.length === 5
      && rehearsalInputs.every((input) => !input.nodeMayInfer && !input.nodeMayCreateApprovalDecision && !input.nodeMayWriteApprovalLedger),
    rehearsalStepsReadOnly: rehearsalSteps.length === 7
      && rehearsalSteps.every((step) => (
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
      && forbiddenOperations.some((operation) => operation.operation === "Create approval decision from Node v182")
      && forbiddenOperations.some((operation) => operation.operation === "Write approval ledger from Node v182")
      && forbiddenOperations.some((operation) => operation.operation === "Execute Java rollback SQL from Node v182")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v182"),
    pauseConditionsComplete: pauseConditions.length === 9
      && pauseConditions.includes("Need approval decision creation or approval ledger persistence.")
      && pauseConditions.includes("Need release, deployment, rollback, restore, or rollback SQL execution."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noAutomaticUpstreamStart: true,
    noApprovalDecisionCreated: true,
    noApprovalLedgerWrite: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRollbackSqlExecution: true,
    noRestoreExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    noProductionIdpConnection: true,
    readyForApprovalDecisionStillFalse: true,
    readyForApprovalLedgerWriteStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    packetDigestValid: false,
    readyForReleaseApprovalDecisionRehearsalPacket: false,
  };
}

function summarizeDryRunEnvelope(profile: ApprovalLedgerDryRunEnvelopeProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    envelopeState: profile.envelopeState,
    envelopeDigest: profile.envelope.envelopeDigest,
    readyForApprovalLedgerDryRunEnvelope: profile.readyForApprovalLedgerDryRunEnvelope,
    readyForApprovalDecision: profile.readyForApprovalDecision,
    readyForApprovalLedgerWrite: profile.readyForApprovalLedgerWrite,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): RehearsalMessage[] {
  return collectBlockingMessages<RehearsalMessage>([
    { condition: checks.sourceDryRunEnvelopeReady, code: "SOURCE_DRY_RUN_ENVELOPE_NOT_READY", source: "approval-ledger-dry-run-envelope", message: "Node v181 approval ledger dry-run envelope must be ready before v182 rehearsal packet." },
    { condition: checks.sourceDryRunEnvelopeDigestValid, code: "SOURCE_DRY_RUN_ENVELOPE_DIGEST_INVALID", source: "approval-ledger-dry-run-envelope", message: "Node v181 envelope digest must be valid." },
    { condition: checks.sourceDryRunEnvelopeStillBlocksApprovalAndProduction, code: "SOURCE_DRY_RUN_ENVELOPE_UNLOCKS_PRODUCTION", source: "approval-ledger-dry-run-envelope", message: "Node v181 must still block approval decision, ledger write, and production operations." },
    { condition: checks.javaV65RollbackApproverFixtureReady, code: "JAVA_V65_ROLLBACK_APPROVER_FIXTURE_NOT_READY", source: "java-v65-rollback-approver-evidence-fixture", message: "Java v65 rollback approver evidence fixture must be present." },
    { condition: checks.javaRollbackApproverRecordComplete, code: "JAVA_ROLLBACK_APPROVER_RECORD_INCOMPLETE", source: "java-v65-rollback-approver-evidence-fixture", message: "Java v65 rollback approver record must include placeholder and pending confirmation state." },
    { condition: checks.javaDatabaseMigrationBoundaryClosed, code: "JAVA_DATABASE_MIGRATION_BOUNDARY_OPEN", source: "java-v65-rollback-approver-evidence-fixture", message: "Java v65 must keep SQL text, SQL execution, and production database access closed." },
    { condition: checks.javaNodeConsumptionSafe, code: "JAVA_NODE_CONSUMPTION_UNSAFE", source: "java-v65-rollback-approver-evidence-fixture", message: "Java v65 may be consumed only for rendering rehearsal input." },
    { condition: checks.javaProductionBoundariesClosed, code: "JAVA_PRODUCTION_BOUNDARY_OPEN", source: "java-v65-rollback-approver-evidence-fixture", message: "Java v65 must not enable approval, ledger, rollback, SQL, secrets, database, or mini-kv coupling." },
    { condition: checks.miniKvV74RestoreApprovalBoundaryReady, code: "MINI_KV_V74_RESTORE_BOUNDARY_NOT_READY", source: "mini-kv-v74-restore-approval-boundary", message: "mini-kv v74 restore approval boundary fixture must be present." },
    { condition: checks.miniKvApprovalBoundaryTargetComplete, code: "MINI_KV_APPROVAL_BOUNDARY_TARGET_INCOMPLETE", source: "mini-kv-v74-restore-approval-boundary", message: "mini-kv v74 must include restore approver, target, artifact digest, order authority, and Java chain boundaries." },
    { condition: checks.miniKvRestoreEvidenceComplete, code: "MINI_KV_RESTORE_EVIDENCE_INCOMPLETE", source: "mini-kv-v74-restore-approval-boundary", message: "mini-kv v74 restore approval evidence fields and confirmations must be complete." },
    { condition: checks.miniKvCheckJsonBoundaryEvidenceReadOnly, code: "MINI_KV_CHECKJSON_BOUNDARY_UNSAFE", source: "mini-kv-v74-restore-approval-boundary", message: "mini-kv v74 CHECKJSON boundary evidence must remain read-only and non-executing." },
    { condition: checks.miniKvBoundariesClosed, code: "MINI_KV_BOUNDARY_OPEN", source: "mini-kv-v74-restore-approval-boundary", message: "mini-kv v74 must remain non-authoritative and disconnected from Java transaction consistency." },
    { condition: checks.rehearsalInputsComplete, code: "REHEARSAL_INPUTS_INCOMPLETE", source: "release-approval-decision-rehearsal-packet", message: "Rehearsal inputs must map Node v181, Java v65, and mini-kv v74 evidence." },
    { condition: checks.rehearsalStepsReadOnly, code: "REHEARSAL_STEPS_NOT_READ_ONLY", source: "release-approval-decision-rehearsal-packet", message: "Rehearsal steps must be read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "release-approval-decision-rehearsal-packet", message: "Forbidden operations must cover approval, ledger, release, Java, mini-kv, secrets, database, and auth hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "runtime-config", message: "Node v182 must not start Java or mini-kv." },
    { condition: checks.noApprovalDecisionCreated, code: "APPROVAL_DECISION_CREATED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not create an approval decision." },
    { condition: checks.noApprovalLedgerWrite, code: "APPROVAL_LEDGER_WRITE_UNLOCKED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not write approval ledger records." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not execute release." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not execute restore." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v182 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v182 must not connect production databases." },
    { condition: checks.readyForApprovalDecisionStillFalse, code: "APPROVAL_DECISION_UNLOCKED", source: "release-approval-decision-rehearsal-packet", message: "v182 must not mark approval decision ready." },
    { condition: checks.readyForApprovalLedgerWriteStillFalse, code: "APPROVAL_LEDGER_WRITE_READY", source: "release-approval-decision-rehearsal-packet", message: "v182 must not mark approval ledger write ready." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "release-approval-decision-rehearsal-packet", message: "Rehearsal packet digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(packetState: PacketState): RehearsalMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "RELEASE_APPROVAL_DECISION_REHEARSAL_PACKET_BLOCKED"
        : "REHEARSAL_PACKET_NOT_APPROVAL_DECISION",
      severity: "warning",
      source: "release-approval-decision-rehearsal-packet",
      message: packetState === "blocked"
        ? "Release approval decision rehearsal packet has blockers."
        : "This packet rehearses approval decision inputs only; it is not a real approval decision.",
    },
    {
      code: "NEXT_PLAN_MUST_START_WITH_NODE_QUALITY_OPTIMIZATION",
      severity: "warning",
      source: "release-approval-decision-rehearsal-packet",
      message: "The next plan must include actual Node quality work, starting with opsPromotionArchiveBundle.ts split.",
    },
  ];
}

function collectRecommendations(packetState: PacketState): RehearsalMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_RELEASE_APPROVAL_REHEARSAL_BLOCKERS"
        : "START_NEXT_PLAN_WITH_OPS_PROMOTION_ARCHIVE_BUNDLE_SPLIT",
      severity: "recommendation",
      source: "release-approval-decision-rehearsal-packet",
      message: packetState === "blocked"
        ? "Fix missing rehearsal evidence before archiving v182."
        : "After v182 is archived, start a new plan with a real Node maintainability optimization before adding more fixture surface.",
    },
  ];
}

function renderRehearsalInput(input: RehearsalInput): string[] {
  return [
    `### ${input.id}`,
    "",
    `- Source: ${input.source}`,
    `- Status: ${input.status}`,
    `- Evidence target: ${input.evidenceTarget}`,
    `- Node may infer: ${input.nodeMayInfer}`,
    `- Node may create approval decision: ${input.nodeMayCreateApprovalDecision}`,
    `- Node may write approval ledger: ${input.nodeMayWriteApprovalLedger}`,
    "",
  ];
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
