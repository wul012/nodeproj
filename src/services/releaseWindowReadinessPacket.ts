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

import {
  ENDPOINTS,
  JAVA_V61_ROLLBACK_APPROVAL_RECORD,
  MINI_KV_V70_RESTORE_DRILL_EVIDENCE,
} from "./releaseWindowReadinessPacketEvidence.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createForbiddenOperations,
  createReleaseWindowSteps,
} from "./releaseWindowReadinessPacketPolicy.js";
import type {
  ForbiddenOperation,
  PacketState,
  ReleaseWindowReadinessPacketProfile,
  ReleaseWindowStep,
} from "./releaseWindowReadinessPacketTypes.js";

export type {
  ReleaseWindowReadinessPacketProfile,
} from "./releaseWindowReadinessPacketTypes.js";

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

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
