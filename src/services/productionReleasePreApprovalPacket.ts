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
  loadCrossProjectEvidenceRetentionGate,
  type CrossProjectEvidenceRetentionGateProfile,
} from "./crossProjectEvidenceRetentionGate.js";

type PacketState = "ready-for-production-release-pre-approval-review" | "blocked";
type PreApprovalActor = "node" | "operator" | "release-manager" | "ci-runner";

interface PreApprovalMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-release-pre-approval-packet"
    | "cross-project-evidence-retention-gate"
    | "ci-operator-identity-evidence-packet"
    | "java-v63-release-audit-retention-fixture"
    | "mini-kv-v72-restore-evidence-retention"
    | "runtime-config";
  message: string;
}

interface PreApprovalChecklistItem {
  id: string;
  category:
    | "operator-identity"
    | "retention"
    | "release-evidence"
    | "rollback"
    | "security"
    | "operator-handoff";
  requirement: string;
  evidenceSource: string;
  required: true;
  operatorMustConfirm: boolean;
  nodeMayInfer: false;
  approvalDecisionCreated: false;
}

interface MissingEvidenceItem {
  id: string;
  source: string;
  requiredBefore: "approval-decision" | "production-release" | "production-rollback" | "production-restore";
  reason: string;
  nodeMayFill: false;
  blocksApprovalDecision: true;
}

interface PreApprovalStep {
  order: number;
  phase: "collect" | "review" | "verify" | "preserve" | "stop";
  actor: PreApprovalActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  createsApprovalDecision: false;
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
    | "Node v179 pre-approval packet"
    | "Node v178 cross-project evidence retention gate"
    | "Node v177 operator identity evidence"
    | "Java v63 release audit retention fixture"
    | "mini-kv v72 restore evidence retention"
    | "runtime safety";
}

export interface ProductionReleasePreApprovalPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-release-pre-approval-packet.v1";
  packetState: PacketState;
  readyForProductionReleasePreApprovalPacket: boolean;
  readyForApprovalDecision: false;
  readyForProductionAuth: false;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionRestore: false;
  readOnly: true;
  preApprovalOnly: true;
  executionAllowed: false;
  packet: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  preApprovalChecklist: PreApprovalChecklistItem[];
  missingEvidence: MissingEvidenceItem[];
  preApprovalSteps: PreApprovalStep[];
  forbiddenOperations: ForbiddenOperation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: PreApprovalMessage[];
  warnings: PreApprovalMessage[];
  recommendations: PreApprovalMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  productionReleasePreApprovalPacketJson: "/api/v1/production/release-pre-approval-packet",
  productionReleasePreApprovalPacketMarkdown: "/api/v1/production/release-pre-approval-packet?format=markdown",
  crossProjectEvidenceRetentionGateJson: "/api/v1/production/cross-project-evidence-retention-gate",
  ciOperatorIdentityEvidencePacketJson: "/api/v1/ci/operator-identity-evidence-packet",
  javaReleaseAuditRetentionFixture: "/contracts/release-audit-retention.fixture.json",
  miniKvRestoreEvidenceRetention: "fixtures/release/restore-evidence-retention.json",
  currentRoadmap: "docs/plans/v176-post-ci-evidence-hardening-roadmap.md",
});

export function loadProductionReleasePreApprovalPacket(
  config: AppConfig,
  headers: IncomingHttpHeaders = {},
): ProductionReleasePreApprovalPacketProfile {
  const retentionGate = loadCrossProjectEvidenceRetentionGate(config, headers);
  const preApprovalChecklist = createPreApprovalChecklist();
  const missingEvidence = createMissingEvidence();
  const preApprovalSteps = createPreApprovalSteps();
  const forbiddenOperations = createForbiddenOperations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    retentionGate,
    preApprovalChecklist,
    missingEvidence,
    preApprovalSteps,
    forbiddenOperations,
    pauseConditions,
  );
  const packetDigest = digestPacket({
    profileVersion: "production-release-pre-approval-packet.v1",
    sourceRetentionGateDigest: retentionGate.gate.gateDigest,
    sourceRetentionGateProfileVersion: retentionGate.profileVersion,
    sourceRetentionGateState: retentionGate.gateState,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checklistIds: preApprovalChecklist.map((item) => item.id),
    missingEvidenceIds: missingEvidence.map((item) => item.id),
    checks: {
      ...checks,
      packetDigestValid: undefined,
      readyForProductionReleasePreApprovalPacket: undefined,
    },
  });
  checks.packetDigestValid = isReleaseReportDigest(packetDigest);
  completeAggregateReadyCheck(checks, "readyForProductionReleasePreApprovalPacket");
  const packetState: PacketState = checks.readyForProductionReleasePreApprovalPacket
    ? "ready-for-production-release-pre-approval-review"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Production release pre-approval packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-release-pre-approval-packet.v1",
    packetState,
    readyForProductionReleasePreApprovalPacket: checks.readyForProductionReleasePreApprovalPacket,
    readyForApprovalDecision: false,
    readyForProductionAuth: false,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionRestore: false,
    readOnly: true,
    preApprovalOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sourceRetentionGateDigest: retentionGate.gate.gateDigest,
      sourceRetentionGateProfileVersion: retentionGate.profileVersion,
      sourceRetentionGateState: retentionGate.gateState,
      sourceRetentionGateReady: retentionGate.readyForCrossProjectEvidenceRetentionGate,
      sourceIdentityGateState: retentionGate.gate.sourceNodeIdentityGateState,
      javaVersion: retentionGate.gate.javaVersion,
      javaFixtureVersion: retentionGate.gate.javaFixtureVersion,
      javaRetentionId: retentionGate.gate.javaRetentionId,
      miniKvVersion: retentionGate.gate.miniKvVersion,
      miniKvRetentionVersion: retentionGate.gate.miniKvRetentionVersion,
      miniKvRetentionId: retentionGate.gate.miniKvRetentionId,
      packetMode: "manual-production-release-pre-approval-review-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      automaticUpstreamStart: false,
      approvalDecisionCreated: false,
      approvalLedgerWriteAllowed: false,
      productionAuthReady: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionRestoreAuthorized: false,
    },
    checks,
    artifacts: {
      sourceCrossProjectEvidenceRetentionGate: summarizeRetentionGate(retentionGate),
      preApprovalBoundary: {
        nodeMayCreateApprovalDecision: false,
        nodeMayWriteApprovalLedger: false,
        nodeMayTriggerRelease: false,
        nodeMayTriggerDeployment: false,
        nodeMayTriggerRollback: false,
        nodeMayExecuteJavaRollbackSql: false,
        nodeMayExecuteMiniKvRestore: false,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        nodeMayReadSecretValues: false,
        nodeMayConnectProductionDatabase: false,
        nodeMayConnectProductionIdp: false,
      },
    },
    preApprovalChecklist,
    missingEvidence,
    preApprovalSteps,
    forbiddenOperations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      checklistItemCount: preApprovalChecklist.length,
      operatorConfirmationChecklistCount: preApprovalChecklist.filter((item) => item.operatorMustConfirm).length,
      missingEvidenceCount: missingEvidence.length,
      missingEvidenceBlockingDecisionCount: missingEvidence.filter((item) => item.blocksApprovalDecision).length,
      preApprovalStepCount: preApprovalSteps.length,
      forbiddenOperationCount: forbiddenOperations.length,
      pauseConditionCount: pauseConditions.length,
      sourceRetentionGateCheckCount: retentionGate.summary.checkCount,
      sourceRetentionGatePassedCheckCount: retentionGate.summary.passedCheckCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Archive this packet as the manual pre-approval review input, not as an approval decision.",
      "Do not create an approval ledger decision until an operator replaces placeholders and confirms missing evidence outside Node.",
      "Start a new non-overlapping plan after v179 before moving toward any approval-decision version.",
    ],
  };
}

export function renderProductionReleasePreApprovalPacketMarkdown(
  profile: ProductionReleasePreApprovalPacketProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Production release pre-approval packet",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for production release pre-approval packet": profile.readyForProductionReleasePreApprovalPacket,
      "Ready for approval decision": profile.readyForApprovalDecision,
      "Ready for production auth": profile.readyForProductionAuth,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production restore": profile.readyForProductionRestore,
      "Read only": profile.readOnly,
      "Pre-approval only": profile.preApprovalOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Packet", entries: profile.packet },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Cross-project Evidence Retention Gate", entries: profile.artifacts.sourceCrossProjectEvidenceRetentionGate },
      { heading: "Pre-approval Boundary", entries: profile.artifacts.preApprovalBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Pre-approval Checklist",
        items: profile.preApprovalChecklist,
        renderItem: renderChecklistItem,
      },
      {
        heading: "Missing Evidence",
        items: profile.missingEvidence,
        renderItem: renderMissingEvidence,
      },
      {
        heading: "Pre-approval Steps",
        items: profile.preApprovalSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Creates approval decision", "createsApprovalDecision"],
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
        emptyText: "No production release pre-approval packet blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No production release pre-approval packet warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No production release pre-approval packet recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  retentionGate: CrossProjectEvidenceRetentionGateProfile,
  preApprovalChecklist: PreApprovalChecklistItem[],
  missingEvidence: MissingEvidenceItem[],
  preApprovalSteps: PreApprovalStep[],
  forbiddenOperations: ForbiddenOperation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourceRetentionGateReady: retentionGate.readyForCrossProjectEvidenceRetentionGate
      && retentionGate.gateState === "ready-for-cross-project-evidence-retention-review",
    sourceRetentionGateDigestValid: isReleaseReportDigest(retentionGate.gate.gateDigest),
    sourceRetentionGateStillBlocksProduction: retentionGate.readyForProductionAuth === false
      && retentionGate.readyForProductionRelease === false
      && retentionGate.readyForProductionDeployment === false
      && retentionGate.readyForProductionRollback === false
      && retentionGate.readyForProductionRestore === false
      && retentionGate.executionAllowed === false,
    sourceRetentionGateReferencesNodeV177: retentionGate.gate.sourceNodeIdentityProfileVersion === "ci-operator-identity-evidence-packet.v1"
      && retentionGate.gate.sourceNodeIdentityGateState === "ready-for-operator-identity-evidence",
    sourceRetentionGateReferencesJavaV63: retentionGate.gate.javaVersion === "Java v63"
      && retentionGate.gate.javaFixtureVersion === "java-release-audit-retention-fixture.v1"
      && retentionGate.gate.javaRetentionId === "release-retention-record-placeholder",
    sourceRetentionGateReferencesMiniKvV72: retentionGate.gate.miniKvVersion === "mini-kv v72"
      && retentionGate.gate.miniKvRetentionVersion === "mini-kv-restore-evidence-retention.v1"
      && retentionGate.gate.miniKvRetentionId === "mini-kv-restore-retention-v72",
    preApprovalChecklistComplete: preApprovalChecklist.length === 8
      && preApprovalChecklist.some((item) => item.id === "operator-identity-reviewed")
      && preApprovalChecklist.some((item) => item.id === "retention-placeholders-reviewed")
      && preApprovalChecklist.some((item) => item.id === "rollback-owner-confirmed")
      && preApprovalChecklist.every((item) => item.required && !item.nodeMayInfer && !item.approvalDecisionCreated),
    operatorConfirmationsRemainManual: preApprovalChecklist.filter((item) => item.operatorMustConfirm).length === 5,
    missingEvidenceBlocksApprovalDecision: missingEvidence.length === 5
      && missingEvidence.every((item) => item.blocksApprovalDecision && !item.nodeMayFill),
    missingEvidenceCoversProductionHazards: missingEvidence.some((item) => item.id === "real-production-idp")
      && missingEvidence.some((item) => item.id === "release-operator-signoff")
      && missingEvidence.some((item) => item.id === "rollback-approver-signoff")
      && missingEvidence.some((item) => item.id === "retained-artifact-digests"),
    preApprovalStepsComplete: preApprovalSteps.length === 6,
    preApprovalStepsReadOnly: preApprovalSteps.every((step) => (
      step.readOnly
      && !step.createsApprovalDecision
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    )),
    forbiddenOperationsCovered: forbiddenOperations.length === 12
      && forbiddenOperations.some((operation) => operation.operation === "Create production approval decision from Node v179")
      && forbiddenOperations.some((operation) => operation.operation === "Trigger production release from Node v179")
      && forbiddenOperations.some((operation) => operation.operation === "Execute mini-kv restore from Node v179"),
    pauseConditionsComplete: pauseConditions.length === 9
      && pauseConditions.includes("Need real production IdP connection or token verification.")
      && pauseConditions.includes("Need approval decision, release, deployment, rollback, or restore execution."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && retentionGate.gate.upstreamActionsEnabled === false,
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
    readyForProductionAuthStillFalse: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionDeploymentStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionRestoreStillFalse: true,
    packetDigestValid: false,
    readyForProductionReleasePreApprovalPacket: false,
  };
}

function createPreApprovalChecklist(): PreApprovalChecklistItem[] {
  return [
    checklist("operator-identity-reviewed", "operator-identity", "Review Node v177 operator identity evidence and preserve local smoke operator headers.", ENDPOINTS.ciOperatorIdentityEvidencePacketJson, true),
    checklist("retention-placeholders-reviewed", "retention", "Review Node v178 retention gate digest and retained placeholder evidence summary.", ENDPOINTS.crossProjectEvidenceRetentionGateJson, false),
    checklist("java-release-retention-reviewed", "retention", "Review Java v63 release audit retention id, operator placeholder, artifact target, and retention days.", ENDPOINTS.javaReleaseAuditRetentionFixture, true),
    checklist("mini-kv-restore-retention-reviewed", "retention", "Review mini-kv v72 restore evidence retention id and Snapshot/WAL/artifact placeholders.", ENDPOINTS.miniKvRestoreEvidenceRetention, true),
    checklist("release-evidence-ready-for-human-signoff", "release-evidence", "Confirm all release evidence artifacts are retained before any approval decision is created.", "cross-project retained evidence", true),
    checklist("rollback-owner-confirmed", "rollback", "Confirm rollback owner and rollback evidence are explicit external operator inputs.", "manual operator handoff", true),
    checklist("security-boundaries-closed", "security", "Confirm production secrets, production database, and production IdP remain disconnected from this packet.", "runtime safety checks", false),
    checklist("handoff-archive-ready", "operator-handoff", "Archive v179 screenshot, explanation, and walkthrough before starting the next plan.", "c/179 and walkthrough", false),
  ];
}

function checklist(
  id: string,
  category: PreApprovalChecklistItem["category"],
  requirement: string,
  evidenceSource: string,
  operatorMustConfirm: boolean,
): PreApprovalChecklistItem {
  return {
    id,
    category,
    requirement,
    evidenceSource,
    required: true,
    operatorMustConfirm,
    nodeMayInfer: false,
    approvalDecisionCreated: false,
  };
}

function createMissingEvidence(): MissingEvidenceItem[] {
  return [
    missing("real-production-idp", "runtime-config", "approval-decision", "A real production IdP or verified token source is not connected."),
    missing("release-operator-signoff", "manual operator handoff", "approval-decision", "Release operator signoff must be recorded outside this packet."),
    missing("rollback-approver-signoff", "manual rollback handoff", "approval-decision", "Rollback approver signoff must remain explicit before production release approval."),
    missing("retained-artifact-digests", "Java v63 and mini-kv v72 placeholders", "approval-decision", "Retained artifact digest placeholders must be replaced by external retained evidence."),
    missing("production-release-window-confirmation", "release management", "production-release", "A real production release window confirmation is outside Node v179."),
  ];
}

function missing(
  id: string,
  source: string,
  requiredBefore: MissingEvidenceItem["requiredBefore"],
  reason: string,
): MissingEvidenceItem {
  return {
    id,
    source,
    requiredBefore,
    reason,
    nodeMayFill: false,
    blocksApprovalDecision: true,
  };
}

function createPreApprovalSteps(): PreApprovalStep[] {
  return [
    createStep(1, "collect", "node", "Load Node v178 cross-project evidence retention gate.", ENDPOINTS.crossProjectEvidenceRetentionGateJson, "Gate is ready, digest-valid, and still blocks production actions."),
    createStep(2, "review", "operator", "Review operator identity, Java release retention, and mini-kv restore retention evidence.", "preApprovalChecklist", "Checklist records which evidence must be manually confirmed."),
    createStep(3, "verify", "node", "Verify missing evidence still blocks approval decision creation.", "missingEvidence", "Every missing evidence item blocks approval and cannot be filled by Node."),
    createStep(4, "preserve", "ci-runner", "Preserve the pre-approval packet JSON and Markdown as read-only CI evidence.", ENDPOINTS.productionReleasePreApprovalPacketJson, "Packet is archivable and reproducible without upstream execution."),
    createStep(5, "review", "release-manager", "Use the packet as a human review input only.", "manual release review", "Release manager must create any future approval decision outside v179."),
    createStep(6, "stop", "node", "Stop before approval decision, release, deployment, rollback, or restore execution.", "next plan handoff", "A new non-overlapping plan is required before any approval-decision version."),
  ];
}

function createStep(
  order: number,
  phase: PreApprovalStep["phase"],
  actor: PreApprovalActor,
  action: string,
  evidenceTarget: string,
  expectedEvidence: string,
): PreApprovalStep {
  return {
    order,
    phase,
    actor,
    action,
    evidenceTarget,
    expectedEvidence,
    readOnly: true,
    createsApprovalDecision: false,
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
    forbid("Create production approval decision from Node v179", "v179 is pre-approval review input only.", "Node v179 pre-approval packet"),
    forbid("Write production approval ledger from Node v179", "No approval decision or ledger mutation belongs to this packet.", "Node v179 pre-approval packet"),
    forbid("Trigger production release from Node v179", "The packet does not authorize release execution.", "Node v179 pre-approval packet"),
    forbid("Trigger production deployment from Node v179", "Deployment remains outside pre-approval evidence.", "Node v179 pre-approval packet"),
    forbid("Trigger production rollback from Node v179", "Rollback requires separate approval and runbook evidence.", "Node v179 pre-approval packet"),
    forbid("Execute Java rollback SQL from Node v179", "Java v63 fixture is retention metadata only.", "Java v63 release audit retention fixture"),
    forbid("Write Java audit export from Node v179", "Java v63 names audit export placeholders only.", "Java v63 release audit retention fixture"),
    forbid("Execute mini-kv restore from Node v179", "mini-kv v72 restore evidence retention is not a restore executor.", "mini-kv v72 restore evidence retention"),
    forbid("Execute mini-kv LOAD/COMPACT/SETNXEX from Node v179", "mini-kv v72 keeps CHECKJSON risk evidence only.", "mini-kv v72 restore evidence retention"),
    forbid("Read production secret values", "v179 records evidence sources and placeholders only.", "runtime safety"),
    forbid("Connect production database", "Pre-approval packet rendering does not need database access.", "runtime safety"),
    forbid("Treat local smoke headers as production authentication", "Node v177 identity evidence is rehearsal evidence only.", "Node v177 operator identity evidence"),
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
    "Need real production IdP connection or token verification.",
    "Need production secrets or secret values.",
    "Need production database access.",
    "Need approval decision, release, deployment, rollback, or restore execution.",
    "Need Node to auto-start Java or mini-kv.",
    "Need Java deployment, Java rollback, Java rollback SQL, or Java audit export writes.",
    "Need mini-kv LOAD/COMPACT/SETNXEX or real restore execution.",
    "Need retained artifact digest placeholders to be treated as real retained artifacts.",
    "Operator signoff, rollback approver, or production release window is unclear.",
  ];
}

function summarizeRetentionGate(profile: CrossProjectEvidenceRetentionGateProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    gateDigest: profile.gate.gateDigest,
    readyForCrossProjectEvidenceRetentionGate: profile.readyForCrossProjectEvidenceRetentionGate,
    readyForProductionAuth: profile.readyForProductionAuth,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionRestore: profile.readyForProductionRestore,
    executionAllowed: profile.executionAllowed,
    sourceNodeIdentityGateState: profile.gate.sourceNodeIdentityGateState,
    javaFixtureVersion: profile.gate.javaFixtureVersion,
    javaRetentionId: profile.gate.javaRetentionId,
    miniKvRetentionVersion: profile.gate.miniKvRetentionVersion,
    miniKvRetentionId: profile.gate.miniKvRetentionId,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): PreApprovalMessage[] {
  return collectBlockingMessages<PreApprovalMessage>([
    { condition: checks.sourceRetentionGateReady, code: "SOURCE_RETENTION_GATE_NOT_READY", source: "cross-project-evidence-retention-gate", message: "Node v178 cross-project evidence retention gate must be ready before v179 pre-approval packet." },
    { condition: checks.sourceRetentionGateDigestValid, code: "SOURCE_RETENTION_GATE_DIGEST_INVALID", source: "cross-project-evidence-retention-gate", message: "Node v178 retention gate digest must be valid." },
    { condition: checks.sourceRetentionGateStillBlocksProduction, code: "SOURCE_RETENTION_GATE_UNLOCKS_PRODUCTION", source: "cross-project-evidence-retention-gate", message: "Node v178 must still block production auth, release, deployment, rollback, and restore." },
    { condition: checks.sourceRetentionGateReferencesNodeV177, code: "SOURCE_RETENTION_GATE_IDENTITY_REFERENCE_INVALID", source: "ci-operator-identity-evidence-packet", message: "Node v178 gate must reference Node v177 operator identity evidence." },
    { condition: checks.sourceRetentionGateReferencesJavaV63, code: "SOURCE_RETENTION_GATE_JAVA_REFERENCE_INVALID", source: "java-v63-release-audit-retention-fixture", message: "Node v178 gate must reference Java v63 release audit retention fixture." },
    { condition: checks.sourceRetentionGateReferencesMiniKvV72, code: "SOURCE_RETENTION_GATE_MINI_KV_REFERENCE_INVALID", source: "mini-kv-v72-restore-evidence-retention", message: "Node v178 gate must reference mini-kv v72 restore evidence retention fixture." },
    { condition: checks.preApprovalChecklistComplete, code: "PRE_APPROVAL_CHECKLIST_INCOMPLETE", source: "production-release-pre-approval-packet", message: "Pre-approval checklist must cover identity, retention, release, rollback, security, and archive handoff." },
    { condition: checks.operatorConfirmationsRemainManual, code: "OPERATOR_CONFIRMATIONS_NOT_MANUAL", source: "production-release-pre-approval-packet", message: "Operator confirmations must remain manual and cannot be inferred by Node." },
    { condition: checks.missingEvidenceBlocksApprovalDecision, code: "MISSING_EVIDENCE_DOES_NOT_BLOCK_APPROVAL", source: "production-release-pre-approval-packet", message: "Missing evidence must block approval decision creation." },
    { condition: checks.missingEvidenceCoversProductionHazards, code: "MISSING_EVIDENCE_HAZARDS_INCOMPLETE", source: "production-release-pre-approval-packet", message: "Missing evidence must cover IdP, signoff, rollback approval, and retained artifact digest hazards." },
    { condition: checks.preApprovalStepsComplete, code: "PRE_APPROVAL_STEPS_INCOMPLETE", source: "production-release-pre-approval-packet", message: "Pre-approval packet must list all collection, review, verification, preservation, and stop steps." },
    { condition: checks.preApprovalStepsReadOnly, code: "PRE_APPROVAL_STEPS_NOT_READ_ONLY", source: "production-release-pre-approval-packet", message: "Pre-approval steps must be read-only and non-executing." },
    { condition: checks.forbiddenOperationsCovered, code: "FORBIDDEN_OPERATIONS_INCOMPLETE", source: "production-release-pre-approval-packet", message: "Forbidden operations must cover approval, release, Java, mini-kv, secret, database, and auth hazards." },
    { condition: checks.pauseConditionsComplete, code: "PAUSE_CONDITIONS_INCOMPLETE", source: "production-release-pre-approval-packet", message: "Pause conditions must cover production auth and execution hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "runtime-config", message: "Node v179 must not start Java or mini-kv." },
    { condition: checks.noApprovalDecisionCreated, code: "APPROVAL_DECISION_CREATED", source: "production-release-pre-approval-packet", message: "v179 must not create approval decisions." },
    { condition: checks.noApprovalLedgerWrite, code: "APPROVAL_LEDGER_WRITE_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not write approval ledger records." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not execute release." },
    { condition: checks.noDeploymentExecution, code: "DEPLOYMENT_EXECUTION_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not execute deployment." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not execute restore." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_UNLOCKED", source: "runtime-config", message: "v179 must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_UNLOCKED", source: "runtime-config", message: "v179 must not connect production databases." },
    { condition: checks.noProductionIdpConnection, code: "PRODUCTION_IDP_CONNECTION_UNLOCKED", source: "runtime-config", message: "v179 must not connect production IdP." },
    { condition: checks.readyForApprovalDecisionStillFalse, code: "APPROVAL_DECISION_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not mark approval decision ready." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not mark production release ready." },
    { condition: checks.readyForProductionDeploymentStillFalse, code: "PRODUCTION_DEPLOYMENT_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not mark production deployment ready." },
    { condition: checks.readyForProductionRollbackStillFalse, code: "PRODUCTION_ROLLBACK_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not mark production rollback ready." },
    { condition: checks.readyForProductionRestoreStillFalse, code: "PRODUCTION_RESTORE_UNLOCKED", source: "production-release-pre-approval-packet", message: "v179 must not mark production restore ready." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "production-release-pre-approval-packet", message: "Packet digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(packetState: PacketState): PreApprovalMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "PRODUCTION_RELEASE_PRE_APPROVAL_PACKET_BLOCKED"
        : "PRE_APPROVAL_PACKET_NOT_APPROVAL_DECISION",
      severity: "warning",
      source: "production-release-pre-approval-packet",
      message: packetState === "blocked"
        ? "Production release pre-approval packet has blockers."
        : "This packet is review input only; it is not an approval decision or release authorization.",
    },
    {
      code: "MISSING_EVIDENCE_REQUIRES_EXTERNAL_OPERATOR",
      severity: "warning",
      source: "production-release-pre-approval-packet",
      message: "Missing evidence items must be resolved by an external operator process before any approval-decision version.",
    },
  ];
}

function collectRecommendations(packetState: PacketState): PreApprovalMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_PRE_APPROVAL_PACKET_BLOCKERS"
        : "START_POST_PRE_APPROVAL_PLAN",
      severity: "recommendation",
      source: "production-release-pre-approval-packet",
      message: packetState === "blocked"
        ? "Fix source gate or pre-approval evidence blockers before archiving v179."
        : "After v179 is archived, start a new non-overlapping plan before any approval-decision work.",
    },
  ];
}

function renderChecklistItem(item: PreApprovalChecklistItem): string[] {
  return [
    `### ${item.id}`,
    "",
    `- Category: ${item.category}`,
    `- Requirement: ${item.requirement}`,
    `- Evidence source: ${item.evidenceSource}`,
    `- Required: ${item.required}`,
    `- Operator must confirm: ${item.operatorMustConfirm}`,
    `- Node may infer: ${item.nodeMayInfer}`,
    `- Approval decision created: ${item.approvalDecisionCreated}`,
    "",
  ];
}

function renderMissingEvidence(item: MissingEvidenceItem): string[] {
  return [
    `### ${item.id}`,
    "",
    `- Source: ${item.source}`,
    `- Required before: ${item.requiredBefore}`,
    `- Reason: ${item.reason}`,
    `- Node may fill: ${item.nodeMayFill}`,
    `- Blocks approval decision: ${item.blocksApprovalDecision}`,
    "",
  ];
}

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
