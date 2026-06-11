import type { AppConfig } from "../config.js";
import {
  completeAggregateReadyCheck,
  digestReleaseReport,
  prefixReportCheckSummary,
  renderReleaseForbiddenOperation,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadPostV166ReadinessSummary,
} from "./postV166ReadinessSummary.js";
import type {
  PostV166ReadinessSummaryProfile,
} from "./postV166ReadinessSummary.js";

import {
  ENDPOINTS,
  JAVA_V60_DEPLOYMENT_RUNBOOK,
  MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE,
} from "./deploymentEvidenceIntakeGateEvidence.js";
import {
  collectProductionBlockers,
  collectRecommendations,
  collectWarnings,
  createChecks,
  createForbiddenOperations,
  createIntakeSteps,
} from "./deploymentEvidenceIntakeGatePolicy.js";
import type {
  DeploymentEvidenceIntakeGateProfile,
  ForbiddenOperation,
  IntakeState,
  IntakeStep,
} from "./deploymentEvidenceIntakeGateTypes.js";

export type {
  DeploymentEvidenceIntakeGateProfile,
} from "./deploymentEvidenceIntakeGateTypes.js";

export function loadDeploymentEvidenceIntakeGate(config: AppConfig): DeploymentEvidenceIntakeGateProfile {
  const postV166Summary = loadPostV166ReadinessSummary(config);
  const intakeSteps = createIntakeSteps();
  const forbiddenOperations = createForbiddenOperations();
  const checks = createChecks(config, postV166Summary, intakeSteps, forbiddenOperations);
  completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceIntakeGate");
  const gateState: IntakeState = checks.readyForDeploymentEvidenceIntakeGate
    ? "ready-for-manual-deployment-evidence-review"
    : "blocked";
  const intakeDigest = digestIntake({
    profileVersion: "deployment-evidence-intake-gate.v1",
    sourceSummaryDigest: postV166Summary.stage.stageDigest,
    javaVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.plannedVersion,
    javaContractVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.contractVersion,
    miniKvVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.plannedVersion,
    miniKvPackageVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.packageVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(gateState);
  const recommendations = collectRecommendations(gateState);
  const checkSummary = prefixReportCheckSummary(summarizeReportChecks(checks), "gate");

  return {
    service: "orderops-node",
    title: "Deployment evidence intake gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "deployment-evidence-intake-gate.v1",
    gateState,
    readyForDeploymentEvidenceIntakeGate: checks.readyForDeploymentEvidenceIntakeGate,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    gate: {
      intakeDigest,
      sourceSummaryDigest: postV166Summary.stage.stageDigest,
      sourceSummaryVersion: postV166Summary.summaryVersion,
      javaVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.plannedVersion,
      javaContractVersion: JAVA_V60_DEPLOYMENT_RUNBOOK.contractVersion,
      miniKvVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.plannedVersion,
      miniKvPackageVersion: MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE.packageVersion,
      nodeBaselineTag: "v170",
      intakeMode: "manual-deployment-evidence-intake-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      nodeMayRenderIntakeGate: true,
      nodeMayTriggerDeployment: false,
      nodeMayTriggerJavaRollback: false,
      nodeMayExecuteJavaRollbackSql: false,
      nodeMayExecuteMiniKvRestore: false,
      nodeMayExecuteMiniKvAdminCommands: false,
      nodeMayReadSecretValues: false,
      nodeMayConnectProductionDatabase: false,
      automaticUpstreamStart: false,
      mutatesUpstreamState: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      sourcePostV166ReadinessSummary: summarizePostV166Summary(postV166Summary),
      javaProductionDeploymentRunbookContract: { ...JAVA_V60_DEPLOYMENT_RUNBOOK },
      miniKvReleaseArtifactDigestPackage: { ...MINI_KV_V69_RELEASE_ARTIFACT_PACKAGE },
      nodeIntakeEnvelope: {
        manualDeploymentEvidenceIntakeOnly: true,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        automaticUpstreamStart: false,
        mutatesUpstreamState: false,
        readsSecretValues: false,
        connectsProductionDatabase: false,
        executesDeployment: false,
        executesRollback: false,
        executesRestore: false,
        productionDeploymentAuthorized: false,
      },
    },
    intakeSteps,
    forbiddenOperations,
    summary: {
      gateCheckCount: checkSummary.gateCheckCount,
      passedGateCheckCount: checkSummary.passedGateCheckCount,
      sourceEvidenceCount: 3,
      intakeStepCount: intakeSteps.length,
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
      "Proceed to Node v172 deployment evidence verification only after this intake gate remains clean.",
      "Keep Java v60 and mini-kv v69 as read-only evidence; do not use either as production deployment, rollback, or restore approval.",
      "Pause before any production secret manager, production database, Java deployment, Java rollback SQL, or mini-kv restore execution.",
    ],
  };
}

export function renderDeploymentEvidenceIntakeGateMarkdown(
  profile: DeploymentEvidenceIntakeGateProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Deployment evidence intake gate",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Gate state": profile.gateState,
      "Ready for deployment evidence intake gate": profile.readyForDeploymentEvidenceIntakeGate,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Gate", entries: profile.gate },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Post-v166 Readiness Summary", entries: profile.artifacts.sourcePostV166ReadinessSummary },
      {
        heading: "Java Production Deployment Runbook Contract",
        entries: profile.artifacts.javaProductionDeploymentRunbookContract,
      },
      {
        heading: "mini-kv Release Artifact Digest Package",
        entries: profile.artifacts.miniKvReleaseArtifactDigestPackage,
      },
      { heading: "Node Intake Envelope", entries: profile.artifacts.nodeIntakeEnvelope },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      { heading: "Intake Steps", items: profile.intakeSteps, renderItem: renderStep },
      { heading: "Forbidden Operations", items: profile.forbiddenOperations, renderItem: renderForbiddenOperation },
    ],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No deployment evidence intake blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No deployment evidence intake warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No deployment evidence intake recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function summarizePostV166Summary(
  profile: PostV166ReadinessSummaryProfile,
): Record<string, object | string | boolean | number | unknown> {
  return {
    summaryVersion: profile.summaryVersion,
    summaryState: profile.summaryState,
    stageDigest: profile.stage.stageDigest,
    readyForPostV166ReadinessSummary: profile.readyForPostV166ReadinessSummary,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    passedCheckCount: profile.summary.passedCheckCount,
    checkCount: profile.summary.checkCount,
    productionBlockerCount: profile.summary.productionBlockerCount,
  };
}

function renderStep(step: IntakeStep): string[] {
  return renderReleaseReportStep(step as unknown as Record<string, unknown>, {
    identityLabel: "Source",
    identityKey: "source",
    booleanFields: [
      ["Dry run only", "dryRunOnly"],
      ["Read only", "readOnly"],
      ["Mutates state", "mutatesState"],
      ["Reads secret values", "readsSecretValues"],
      ["Connects production database", "connectsProductionDatabase"],
      ["Executes deployment", "executesDeployment"],
      ["Executes rollback", "executesRollback"],
      ["Executes restore", "executesRestore"],
    ],
  });
}

function renderForbiddenOperation(operation: ForbiddenOperation): string[] {
  return renderReleaseForbiddenOperation(operation);
}

function digestIntake(value: unknown): string {
  return digestReleaseReport(value);
}
