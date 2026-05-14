import type { AppConfig } from "../config.js";
import {
  collectBlockingMessages,
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadReleaseWindowReadinessPacket,
} from "./releaseWindowReadinessPacket.js";
import type {
  ReleaseWindowReadinessPacketProfile,
} from "./releaseWindowReadinessPacket.js";

type EnvelopeState = "ready-for-manual-production-release-dry-run" | "blocked";

interface EnvelopeMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "production-release-dry-run-envelope"
    | "release-window-readiness-packet"
    | "runtime-config";
  message: string;
}

interface DryRunStep {
  order: number;
  phase: "prepare" | "verify" | "simulate" | "decide" | "closeout";
  actor: "operator" | "node";
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  dryRunOnly: true;
  readOnly: true;
  mutatesState: false;
  executesRelease: false;
  executesDeployment: false;
  executesRollback: false;
  executesRestore: false;
  readsSecretValues: false;
  connectsProductionDatabase: false;
}

interface OperatorConfirmation {
  name: string;
  required: true;
  source: "release-window-readiness-packet" | "operator";
  placeholderOnly: true;
  nodeMayInfer: false;
}

export interface ProductionReleaseDryRunEnvelopeProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-release-dry-run-envelope.v1";
  envelopeState: EnvelopeState;
  readyForProductionReleaseDryRunEnvelope: boolean;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  envelope: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  dryRunSteps: DryRunStep[];
  operatorConfirmations: OperatorConfirmation[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: EnvelopeMessage[];
  warnings: EnvelopeMessage[];
  recommendations: EnvelopeMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  productionReleaseDryRunEnvelopeJson: "/api/v1/production/release-dry-run-envelope",
  productionReleaseDryRunEnvelopeMarkdown: "/api/v1/production/release-dry-run-envelope?format=markdown",
  releaseWindowReadinessPacketJson: "/api/v1/production/release-window-readiness-packet",
  currentRoadmap: "docs/plans/v173-post-release-window-readiness-roadmap.md",
});

export function loadProductionReleaseDryRunEnvelope(config: AppConfig): ProductionReleaseDryRunEnvelopeProfile {
  const packet = loadReleaseWindowReadinessPacket(config);
  const dryRunSteps = createDryRunSteps();
  const operatorConfirmations = createOperatorConfirmations();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(config, packet, dryRunSteps, operatorConfirmations, pauseConditions);
  const envelopeDigest = digestEnvelope({
    profileVersion: "production-release-dry-run-envelope.v1",
    sourcePacketDigest: packet.packet.packetDigest,
    sourcePacketProfileVersion: packet.profileVersion,
    packetState: packet.packetState,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      envelopeDigestValid: undefined,
      readyForProductionReleaseDryRunEnvelope: undefined,
    },
  });
  checks.envelopeDigestValid = isReleaseReportDigest(envelopeDigest);
  completeAggregateReadyCheck(checks, "readyForProductionReleaseDryRunEnvelope");
  const envelopeState: EnvelopeState = checks.readyForProductionReleaseDryRunEnvelope
    ? "ready-for-manual-production-release-dry-run"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(envelopeState);
  const recommendations = collectRecommendations(envelopeState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Production release dry-run envelope",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-release-dry-run-envelope.v1",
    envelopeState,
    readyForProductionReleaseDryRunEnvelope: checks.readyForProductionReleaseDryRunEnvelope,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    envelope: {
      envelopeDigest,
      sourcePacketDigest: packet.packet.packetDigest,
      sourcePacketProfileVersion: packet.profileVersion,
      sourcePacketState: packet.packetState,
      sourceReadyForReleaseWindowReadinessPacket: packet.readyForReleaseWindowReadinessPacket,
      envelopeMode: "manual-production-release-dry-run-only",
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
      sourceReleaseWindowReadinessPacket: summarizePacket(packet),
      dryRunEnvelopeBoundary: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        releaseExecutionAllowed: false,
        deploymentExecutionAllowed: false,
        rollbackExecutionAllowed: false,
        restoreExecutionAllowed: false,
        sqlExecutionAllowed: false,
        secretValueReadAllowed: false,
        productionDatabaseConnectionAllowed: false,
      },
    },
    dryRunSteps,
    operatorConfirmations,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      dryRunStepCount: dryRunSteps.length,
      operatorConfirmationCount: operatorConfirmations.length,
      pauseConditionCount: pauseConditions.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Use this envelope as dry-run preparation only; it is not production release approval.",
      "Proceed to the recommended parallel Java v62 plus mini-kv v71 handoff checklist stage before Node v175.",
      "Pause before production release, deployment, rollback, restore, SQL execution, secret reads, or production database access.",
    ],
  };
}

export function renderProductionReleaseDryRunEnvelopeMarkdown(
  profile: ProductionReleaseDryRunEnvelopeProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Production release dry-run envelope",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Envelope state": profile.envelopeState,
      "Ready for production release dry-run envelope": profile.readyForProductionReleaseDryRunEnvelope,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Envelope", entries: profile.envelope },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Release Window Readiness Packet", entries: profile.artifacts.sourceReleaseWindowReadinessPacket },
      { heading: "Dry-run Envelope Boundary", entries: profile.artifacts.dryRunEnvelopeBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Dry-run Steps",
        items: profile.dryRunSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Dry run only", "dryRunOnly"],
            ["Read only", "readOnly"],
            ["Mutates state", "mutatesState"],
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
        heading: "Operator Confirmations",
        items: profile.operatorConfirmations,
        renderItem: renderOperatorConfirmation,
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
        emptyText: "No production release dry-run envelope blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No production release dry-run envelope warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No production release dry-run envelope recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  packet: ReleaseWindowReadinessPacketProfile,
  dryRunSteps: DryRunStep[],
  operatorConfirmations: OperatorConfirmation[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourcePacketReady: packet.readyForReleaseWindowReadinessPacket
      && packet.packetState === "ready-for-manual-release-window-review",
    sourcePacketDigestValid: isReleaseReportDigest(packet.packet.packetDigest),
    sourcePacketStillBlocksProduction: packet.readyForProductionRelease === false
      && packet.readyForProductionDeployment === false
      && packet.readyForProductionRollback === false
      && packet.readyForProductionOperations === false
      && packet.executionAllowed === false,
    sourcePacketReferencesJavaV61: packet.packet.javaVersion === "Java v61"
      && packet.packet.javaFixtureVersion === "java-rollback-approval-record-fixture.v1",
    sourcePacketReferencesMiniKvV70: packet.packet.miniKvVersion === "mini-kv v70"
      && packet.packet.miniKvDrillVersion === "mini-kv-restore-drill-evidence.v1",
    dryRunStepsComplete: dryRunSteps.length === 6,
    dryRunStepsReadOnly: dryRunSteps.every((step) => (
      step.dryRunOnly
      && step.readOnly
      && !step.mutatesState
      && !step.executesRelease
      && !step.executesDeployment
      && !step.executesRollback
      && !step.executesRestore
      && !step.readsSecretValues
      && !step.connectsProductionDatabase
    )),
    operatorConfirmationsComplete: operatorConfirmations.length === 6
      && operatorConfirmations.every((confirmation) => (
        confirmation.required
        && confirmation.placeholderOnly
        && !confirmation.nodeMayInfer
      )),
    pauseConditionsComplete: pauseConditions.length === 8
      && pauseConditions.includes("UPSTREAM_ACTIONS_ENABLED must remain false.")
      && pauseConditions.includes("Node must not start Java or mini-kv automatically."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && packet.packet.upstreamActionsEnabled === false,
    noAutomaticUpstreamStart: true,
    noReleaseExecution: true,
    noDeploymentExecution: true,
    noRollbackExecution: true,
    noRestoreExecution: true,
    noSqlExecution: true,
    noProductionSecretRead: true,
    noProductionDatabaseConnection: true,
    readyForProductionReleaseStillFalse: true,
    readyForProductionDeploymentStillFalse: true,
    readyForProductionRollbackStillFalse: true,
    readyForProductionOperationsStillFalse: true,
    envelopeDigestValid: false,
    readyForProductionReleaseDryRunEnvelope: false,
  };
}

function createDryRunSteps(): DryRunStep[] {
  return [
    {
      order: 1,
      phase: "prepare",
      actor: "node",
      action: "Load v173 release window readiness packet.",
      evidenceTarget: "/api/v1/production/release-window-readiness-packet",
      expectedEvidence: "Packet is ready for manual review and still blocks production operations.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 2,
      phase: "verify",
      actor: "node",
      action: "Verify packet digest and version references.",
      evidenceTarget: "release-window-readiness-packet.v1",
      expectedEvidence: "Digest is valid and packet references Java v61 plus mini-kv v70.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 3,
      phase: "simulate",
      actor: "operator",
      action: "Review release, deployment, rollback, and restore actions as blocked dry-run entries.",
      evidenceTarget: "manual-production-release-dry-run-only",
      expectedEvidence: "Operator can see what remains blocked before real release preparation.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 4,
      phase: "decide",
      actor: "operator",
      action: "Confirm placeholders and pause conditions outside Node.",
      evidenceTarget: "operator confirmations",
      expectedEvidence: "All confirmations remain placeholder-only and cannot be inferred by Node.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 5,
      phase: "closeout",
      actor: "node",
      action: "Render JSON and Markdown dry-run envelope evidence.",
      evidenceTarget: "/api/v1/production/release-dry-run-envelope",
      expectedEvidence: "Envelope renders without unlocking production operations.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "node",
      action: "Archive v174 evidence and keep next stage waiting for Java v62 plus mini-kv v71.",
      evidenceTarget: "c/174",
      expectedEvidence: "Screenshot, explanation, tests, and walkthrough are archived.",
      dryRunOnly: true,
      readOnly: true,
      mutatesState: false,
      executesRelease: false,
      executesDeployment: false,
      executesRollback: false,
      executesRestore: false,
      readsSecretValues: false,
      connectsProductionDatabase: false,
    },
  ];
}

function createOperatorConfirmations(): OperatorConfirmation[] {
  return [
    { name: "release-operator", required: true, source: "operator", placeholderOnly: true, nodeMayInfer: false },
    { name: "rollback-approver", required: true, source: "release-window-readiness-packet", placeholderOnly: true, nodeMayInfer: false },
    { name: "artifact-target", required: true, source: "release-window-readiness-packet", placeholderOnly: true, nodeMayInfer: false },
    { name: "migration-direction", required: true, source: "release-window-readiness-packet", placeholderOnly: true, nodeMayInfer: false },
    { name: "restore-drill-digest-review", required: true, source: "release-window-readiness-packet", placeholderOnly: true, nodeMayInfer: false },
    { name: "secret-source-confirmation", required: true, source: "operator", placeholderOnly: true, nodeMayInfer: false },
  ];
}

function createPauseConditions(): string[] {
  return [
    "UPSTREAM_ACTIONS_ENABLED must remain false.",
    "Node must not start Java or mini-kv automatically.",
    "No production secret values may be read.",
    "No production database may be connected.",
    "No Java release, deployment, rollback, or SQL command may execute.",
    "No mini-kv LOAD, COMPACT, SETNXEX, or restore command may execute.",
    "mini-kv must remain outside the Java order authority chain.",
    "Unclear release target, artifact digest, migration direction, or approval owner pauses the workflow.",
  ];
}

function summarizePacket(profile: ReleaseWindowReadinessPacketProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    packetState: profile.packetState,
    packetDigest: profile.packet.packetDigest,
    readyForReleaseWindowReadinessPacket: profile.readyForReleaseWindowReadinessPacket,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    javaVersion: profile.packet.javaVersion,
    miniKvVersion: profile.packet.miniKvVersion,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): EnvelopeMessage[] {
  return collectBlockingMessages<EnvelopeMessage>([
    { condition: checks.sourcePacketReady, code: "SOURCE_PACKET_NOT_READY", source: "release-window-readiness-packet", message: "Node v173 release window packet must be ready before v174 dry-run envelope." },
    { condition: checks.sourcePacketDigestValid, code: "SOURCE_PACKET_DIGEST_INVALID", source: "release-window-readiness-packet", message: "Node v173 packet digest must be valid." },
    { condition: checks.sourcePacketStillBlocksProduction, code: "SOURCE_PACKET_UNLOCKS_PRODUCTION", source: "release-window-readiness-packet", message: "Node v173 packet must still block production operations." },
    { condition: checks.sourcePacketReferencesJavaV61, code: "SOURCE_PACKET_JAVA_REFERENCE_INVALID", source: "release-window-readiness-packet", message: "Node v173 packet must reference Java v61 approval evidence." },
    { condition: checks.sourcePacketReferencesMiniKvV70, code: "SOURCE_PACKET_MINI_KV_REFERENCE_INVALID", source: "release-window-readiness-packet", message: "Node v173 packet must reference mini-kv v70 restore drill evidence." },
    { condition: checks.dryRunStepsComplete, code: "DRY_RUN_STEPS_INCOMPLETE", source: "production-release-dry-run-envelope", message: "Dry-run envelope must list all required steps." },
    { condition: checks.dryRunStepsReadOnly, code: "DRY_RUN_STEPS_MUTATE_STATE", source: "production-release-dry-run-envelope", message: "Dry-run steps must be read-only and non-executing." },
    { condition: checks.operatorConfirmationsComplete, code: "OPERATOR_CONFIRMATIONS_INCOMPLETE", source: "production-release-dry-run-envelope", message: "Operator confirmations must be explicit placeholders that Node cannot infer." },
    { condition: checks.pauseConditionsComplete, code: "PAUSE_CONDITIONS_INCOMPLETE", source: "production-release-dry-run-envelope", message: "Pause conditions must cover unsafe production actions." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noAutomaticUpstreamStart, code: "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", source: "production-release-dry-run-envelope", message: "Node v174 must not start Java or mini-kv." },
    { condition: checks.noReleaseExecution, code: "RELEASE_EXECUTION_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not execute release." },
    { condition: checks.noDeploymentExecution, code: "DEPLOYMENT_EXECUTION_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not execute deployment." },
    { condition: checks.noRollbackExecution, code: "ROLLBACK_EXECUTION_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not execute rollback." },
    { condition: checks.noRestoreExecution, code: "RESTORE_EXECUTION_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not execute restore." },
    { condition: checks.noSqlExecution, code: "SQL_EXECUTION_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not execute SQL." },
    { condition: checks.noProductionSecretRead, code: "PRODUCTION_SECRET_READ_NOT_ALLOWED", source: "runtime-config", message: "Dry-run envelope must not read production secret values." },
    { condition: checks.noProductionDatabaseConnection, code: "PRODUCTION_DATABASE_CONNECTION_NOT_ALLOWED", source: "runtime-config", message: "Dry-run envelope must not connect production databases." },
    { condition: checks.readyForProductionReleaseStillFalse, code: "PRODUCTION_RELEASE_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not authorize production release." },
    { condition: checks.readyForProductionDeploymentStillFalse, code: "PRODUCTION_DEPLOYMENT_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not authorize production deployment." },
    { condition: checks.readyForProductionRollbackStillFalse, code: "PRODUCTION_ROLLBACK_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not authorize production rollback." },
    { condition: checks.readyForProductionOperationsStillFalse, code: "PRODUCTION_OPERATIONS_UNLOCKED", source: "production-release-dry-run-envelope", message: "Dry-run envelope must not authorize production operations." },
    { condition: checks.envelopeDigestValid, code: "ENVELOPE_DIGEST_INVALID", source: "production-release-dry-run-envelope", message: "Envelope digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(envelopeState: EnvelopeState): EnvelopeMessage[] {
  return [
    {
      code: envelopeState === "blocked"
        ? "PRODUCTION_RELEASE_DRY_RUN_ENVELOPE_BLOCKED"
        : "PRODUCTION_RELEASE_DRY_RUN_NOT_APPROVAL",
      severity: "warning",
      source: "production-release-dry-run-envelope",
      message: envelopeState === "blocked"
        ? "Production release dry-run envelope has blockers."
        : "Production release dry-run envelope is preparation evidence only.",
    },
    {
      code: "NEXT_STAGE_REQUIRES_UPSTREAM_HANDOFF_FIXTURES",
      severity: "warning",
      source: "production-release-dry-run-envelope",
      message: "The next stage should be recommended parallel Java v62 plus mini-kv v71 handoff checklist fixtures before Node v175.",
    },
  ];
}

function collectRecommendations(envelopeState: EnvelopeState): EnvelopeMessage[] {
  return [
    {
      code: envelopeState === "blocked"
        ? "FIX_PRODUCTION_RELEASE_DRY_RUN_BLOCKERS"
        : "PROCEED_TO_PARALLEL_JAVA_V62_MINI_KV_V71",
      severity: "recommendation",
      source: "production-release-dry-run-envelope",
      message: envelopeState === "blocked"
        ? "Fix dry-run envelope blockers before requesting upstream handoff fixtures."
        : "Proceed to recommended parallel Java v62 plus mini-kv v71; Node v175 must wait for both and this envelope.",
    },
  ];
}

function renderOperatorConfirmation(confirmation: OperatorConfirmation): string[] {
  return [
    `- ${confirmation.name}: required=${String(confirmation.required)}, source=${confirmation.source}, placeholderOnly=${String(confirmation.placeholderOnly)}, nodeMayInfer=${String(confirmation.nodeMayInfer)}`,
  ];
}

function digestEnvelope(value: unknown): string {
  return digestReleaseReport(value);
}
