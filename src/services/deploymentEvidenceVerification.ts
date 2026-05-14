import type { AppConfig } from "../config.js";
import {
  appendBlockingMessage,
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseReportMarkdown,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  loadDeploymentEvidenceIntakeGate,
} from "./deploymentEvidenceIntakeGate.js";
import type {
  DeploymentEvidenceIntakeGateProfile,
} from "./deploymentEvidenceIntakeGate.js";

type VerificationState = "ready-for-manual-deployment-evidence-verification" | "blocked";

interface VerificationMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "deployment-evidence-verification"
    | "deployment-evidence-intake-gate"
    | "java-v60-production-deployment-runbook-contract"
    | "mini-kv-v69-release-artifact-digest-package"
    | "runtime-config";
  message: string;
}

export interface DeploymentEvidenceVerificationProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "deployment-evidence-verification.v1";
  verificationState: VerificationState;
  readyForDeploymentEvidenceVerification: boolean;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readyForProductionOperations: false;
  readOnly: true;
  dryRunOnly: true;
  executionAllowed: false;
  verification: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  summary: Record<string, number>;
  productionBlockers: VerificationMessage[];
  warnings: VerificationMessage[];
  recommendations: VerificationMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  deploymentEvidenceVerificationJson: "/api/v1/production/deployment-evidence-verification",
  deploymentEvidenceVerificationMarkdown: "/api/v1/production/deployment-evidence-verification?format=markdown",
  deploymentEvidenceIntakeGateJson: "/api/v1/production/deployment-evidence-intake-gate",
  javaDeploymentRunbookContract: "/contracts/production-deployment-runbook-contract.sample.json",
  miniKvReleaseArtifactDigestPackage: "fixtures/release/release-artifact-digest-package.json",
  currentRoadmap: "docs/plans/v169-post-production-environment-preflight-roadmap.md",
});

export function loadDeploymentEvidenceVerification(config: AppConfig): DeploymentEvidenceVerificationProfile {
  const intakeGate = loadDeploymentEvidenceIntakeGate(config);
  const checks = createChecks(config, intakeGate);
  const verificationDigest = digestVerification({
    profileVersion: "deployment-evidence-verification.v1",
    sourceIntakeDigest: intakeGate.gate.intakeDigest,
    sourceProfileVersion: intakeGate.profileVersion,
    javaVersion: intakeGate.gate.javaVersion,
    miniKvVersion: intakeGate.gate.miniKvVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      verificationDigestValid: undefined,
      readyForDeploymentEvidenceVerification: undefined,
    },
  });
  checks.verificationDigestValid = isReleaseReportDigest(verificationDigest);
  completeAggregateReadyCheck(checks, "readyForDeploymentEvidenceVerification");
  const verificationState: VerificationState = checks.readyForDeploymentEvidenceVerification
    ? "ready-for-manual-deployment-evidence-verification"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(verificationState);
  const recommendations = collectRecommendations(verificationState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "Deployment evidence verification",
    generatedAt: new Date().toISOString(),
    profileVersion: "deployment-evidence-verification.v1",
    verificationState,
    readyForDeploymentEvidenceVerification: checks.readyForDeploymentEvidenceVerification,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readyForProductionOperations: false,
    readOnly: true,
    dryRunOnly: true,
    executionAllowed: false,
    verification: {
      verificationDigest,
      sourceIntakeDigest: intakeGate.gate.intakeDigest,
      sourceProfileVersion: intakeGate.profileVersion,
      sourceGateState: intakeGate.gateState,
      sourceReadyForDeploymentEvidenceIntakeGate: intakeGate.readyForDeploymentEvidenceIntakeGate,
      javaVersion: intakeGate.gate.javaVersion,
      miniKvVersion: intakeGate.gate.miniKvVersion,
      nodeBaselineTag: "v171",
      verificationMode: "manual-deployment-evidence-verification-only",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
      productionOperationsAuthorized: false,
    },
    checks,
    artifacts: {
      sourceDeploymentEvidenceIntakeGate: summarizeIntakeGate(intakeGate),
      javaRunbookVerification: summarizeJavaRunbook(intakeGate),
      miniKvPackageVerification: summarizeMiniKvPackage(intakeGate),
      noExecutionBoundary: {
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        sourceExecutionAllowed: intakeGate.executionAllowed,
        nodeMayTriggerDeployment: intakeGate.gate.nodeMayTriggerDeployment,
        nodeMayExecuteJavaRollbackSql: intakeGate.gate.nodeMayExecuteJavaRollbackSql,
        nodeMayExecuteMiniKvRestore: intakeGate.gate.nodeMayExecuteMiniKvRestore,
        nodeMayReadSecretValues: intakeGate.gate.nodeMayReadSecretValues,
        nodeMayConnectProductionDatabase: intakeGate.gate.nodeMayConnectProductionDatabase,
        automaticUpstreamStart: intakeGate.gate.automaticUpstreamStart,
        mutatesUpstreamState: intakeGate.gate.mutatesUpstreamState,
      },
    },
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      verifiedArtifactCount: 4,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Proceed to the recommended parallel Java v61 plus mini-kv v70 stage only after this verification remains clean.",
      "Keep v172 as verification evidence only; do not promote it to production deployment approval.",
      "Pause before any production secret manager, production database, Java deployment, Java rollback SQL, or mini-kv restore execution.",
    ],
  };
}

export function renderDeploymentEvidenceVerificationMarkdown(
  profile: DeploymentEvidenceVerificationProfile,
): string {
  return renderReleaseReportMarkdown({
    title: "Deployment evidence verification",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Verification state": profile.verificationState,
      "Ready for deployment evidence verification": profile.readyForDeploymentEvidenceVerification,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Ready for production operations": profile.readyForProductionOperations,
      "Read only": profile.readOnly,
      "Dry run only": profile.dryRunOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Verification", entries: profile.verification },
      { heading: "Checks", entries: profile.checks },
      { heading: "Source Deployment Evidence Intake Gate", entries: profile.artifacts.sourceDeploymentEvidenceIntakeGate },
      { heading: "Java Runbook Verification", entries: profile.artifacts.javaRunbookVerification },
      { heading: "mini-kv Package Verification", entries: profile.artifacts.miniKvPackageVerification },
      { heading: "No Execution Boundary", entries: profile.artifacts.noExecutionBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [],
    messageSections: [
      {
        heading: "Production Blockers",
        messages: profile.productionBlockers,
        emptyText: "No deployment evidence verification blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No deployment evidence verification warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No deployment evidence verification recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  intakeGate: DeploymentEvidenceIntakeGateProfile,
): Record<string, boolean> {
  const javaRunbook = intakeGate.artifacts.javaProductionDeploymentRunbookContract as Record<string, any>;
  const miniKvPackage = intakeGate.artifacts.miniKvReleaseArtifactDigestPackage as Record<string, any>;
  const sourceSummary = intakeGate.artifacts.sourcePostV166ReadinessSummary as Record<string, any>;

  return {
    sourceIntakeGateReady: intakeGate.readyForDeploymentEvidenceIntakeGate
      && intakeGate.gateState === "ready-for-manual-deployment-evidence-review",
    sourceIntakeDigestValid: isReleaseReportDigest(intakeGate.gate.intakeDigest),
    sourceSummaryDigestValid: isReleaseReportDigest(intakeGate.gate.sourceSummaryDigest),
    sourceSummaryStillBlocksProduction: sourceSummary.readyForProductionRollback === false
      && sourceSummary.readyForProductionOperations === false
      && sourceSummary.executionAllowed === false,
    javaVersionMatchesIntake: intakeGate.gate.javaVersion === "Java v60"
      && javaRunbook.plannedVersion === "Java v60",
    javaContractVersionMatchesIntake: intakeGate.gate.javaContractVersion === "java-production-deployment-runbook-contract.v1"
      && javaRunbook.contractVersion === "java-production-deployment-runbook-contract.v1",
    javaDeploymentWindowFieldsVerified: javaRunbook.deploymentWindow?.owner === "release-window-owner"
      && javaRunbook.deploymentWindow?.rollbackApprover === "rollback-approval-owner"
      && javaRunbook.deploymentWindow?.operatorStartRequired === true
      && javaRunbook.deploymentWindow?.nodeMayScheduleWindow === false
      && javaRunbook.deploymentWindow?.nodeMayTriggerDeployment === false,
    javaMigrationFieldsVerified: javaRunbook.databaseMigration?.selectedDirection === "no-database-change"
      && javaRunbook.databaseMigration?.rollbackSqlExecutionAllowed === false
      && javaRunbook.databaseMigration?.requiresProductionDatabase === false,
    javaSecretBoundaryVerified: javaRunbook.secretSourceConfirmation?.required === true
      && javaRunbook.secretSourceConfirmation?.nodeMayReadSecretValues === false
      && javaRunbook.secretSourceConfirmation?.secretValueRecorded === false,
    javaNoExecutionBoundaryVerified: javaRunbook.nodeConsumption?.nodeMayTriggerDeployment === false
      && javaRunbook.nodeConsumption?.nodeMayTriggerRollback === false
      && javaRunbook.nodeConsumption?.nodeMayExecuteRollbackSql === false
      && javaRunbook.nodeConsumption?.nodeMayModifyRuntimeConfig === false
      && javaRunbook.boundaries?.requiresProductionDatabase === false
      && javaRunbook.boundaries?.requiresProductionSecrets === false,
    miniKvVersionMatchesIntake: intakeGate.gate.miniKvVersion === "mini-kv v69"
      && miniKvPackage.plannedVersion === "mini-kv v69",
    miniKvPackageVersionMatchesIntake: intakeGate.gate.miniKvPackageVersion === "mini-kv-release-artifact-digest-package.v1"
      && miniKvPackage.packageVersion === "mini-kv-release-artifact-digest-package.v1",
    miniKvDigestFieldsVerified: Array.isArray(miniKvPackage.artifactDigestIds)
      && miniKvPackage.artifactDigestIds.length === 4
      && miniKvPackage.artifactDigestIds.includes("binary-digest")
      && miniKvPackage.artifactDigestIds.includes("wal-checksum-evidence")
      && miniKvPackage.artifactDigestIds.includes("snapshot-digest-evidence")
      && miniKvPackage.artifactDigestIds.includes("fixture-digest"),
    miniKvRestoreDrillVerified: Array.isArray(miniKvPackage.restoreDrillCommands)
      && miniKvPackage.restoreDrillCommands.includes("CHECKJSON LOAD data/release-artifact-drill.snap")
      && miniKvPackage.restoreDrillCommands.includes("CHECKJSON COMPACT")
      && miniKvPackage.restoreDrillCommands.includes("CHECKJSON SETNXEX release:token 30 value")
      && miniKvPackage.restoreDrillCommands.includes("GET release:token"),
    miniKvOperatorConfirmationVerified: miniKvPackage.operatorConfirmationRequired === true
      && Array.isArray(miniKvPackage.operatorConfirmationFields)
      && miniKvPackage.operatorConfirmationFields.includes("release_operator_id")
      && miniKvPackage.operatorConfirmationFields.includes("artifact_matrix_cross_checked"),
    miniKvNoExecutionBoundaryVerified: miniKvPackage.writeCommandsExecuted === false
      && miniKvPackage.adminCommandsExecuted === false
      && miniKvPackage.restoreExecutionAllowed === false
      && miniKvPackage.digestPlaceholdersOnly === true
      && miniKvPackage.noRuntimeCommandAdded === true,
    miniKvOrderAuthorityBoundaryVerified: miniKvPackage.orderAuthoritative === false
      && miniKvPackage.connectedToJavaTransactionChain === false
      && miniKvPackage.doesNotRunJavaOrNode === true
      && miniKvPackage.doesNotReadProductionSecrets === true
      && miniKvPackage.doesNotOpenUpstreamActions === true,
    intakeNoExecutionBoundaryVerified: intakeGate.executionAllowed === false
      && intakeGate.readyForProductionDeployment === false
      && intakeGate.readyForProductionRollback === false
      && intakeGate.readyForProductionOperations === false
      && intakeGate.gate.nodeMayTriggerDeployment === false
      && intakeGate.gate.nodeMayExecuteJavaRollbackSql === false
      && intakeGate.gate.nodeMayExecuteMiniKvRestore === false
      && intakeGate.gate.nodeMayReadSecretValues === false
      && intakeGate.gate.nodeMayConnectProductionDatabase === false,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled
      && intakeGate.gate.upstreamActionsEnabled === false
      && intakeGate.checks.upstreamActionsStillDisabled === true,
    noAutomaticUpstreamStart: intakeGate.gate.automaticUpstreamStart === false
      && intakeGate.checks.noAutomaticUpstreamStart === true,
    verificationDigestValid: false,
    readyForDeploymentEvidenceVerification: false,
  };
}

function summarizeIntakeGate(profile: DeploymentEvidenceIntakeGateProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    gateState: profile.gateState,
    intakeDigest: profile.gate.intakeDigest,
    sourceSummaryDigest: profile.gate.sourceSummaryDigest,
    readyForDeploymentEvidenceIntakeGate: profile.readyForDeploymentEvidenceIntakeGate,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    readyForProductionOperations: profile.readyForProductionOperations,
    executionAllowed: profile.executionAllowed,
    gateCheckCount: profile.summary.gateCheckCount,
    passedGateCheckCount: profile.summary.passedGateCheckCount,
  };
}

function summarizeJavaRunbook(profile: DeploymentEvidenceIntakeGateProfile): Record<string, object | string | boolean | number | unknown> {
  const javaRunbook = profile.artifacts.javaProductionDeploymentRunbookContract as Record<string, any>;
  return {
    plannedVersion: javaRunbook.plannedVersion,
    contractVersion: javaRunbook.contractVersion,
    deploymentWindowOwner: javaRunbook.deploymentWindow?.owner,
    rollbackApprover: javaRunbook.deploymentWindow?.rollbackApprover,
    selectedMigrationDirection: javaRunbook.databaseMigration?.selectedDirection,
    nodeMayTriggerDeployment: javaRunbook.nodeConsumption?.nodeMayTriggerDeployment,
    nodeMayTriggerRollback: javaRunbook.nodeConsumption?.nodeMayTriggerRollback,
    nodeMayExecuteRollbackSql: javaRunbook.nodeConsumption?.nodeMayExecuteRollbackSql,
    nodeMayReadSecretValues: javaRunbook.secretSourceConfirmation?.nodeMayReadSecretValues,
    requiresProductionDatabase: javaRunbook.boundaries?.requiresProductionDatabase,
    archivePath: javaRunbook.archivePath,
  };
}

function summarizeMiniKvPackage(profile: DeploymentEvidenceIntakeGateProfile): Record<string, object | string | boolean | number | unknown> {
  const miniKvPackage = profile.artifacts.miniKvReleaseArtifactDigestPackage as Record<string, any>;
  return {
    plannedVersion: miniKvPackage.plannedVersion,
    packageVersion: miniKvPackage.packageVersion,
    projectVersion: miniKvPackage.projectVersion,
    artifactDigestCount: Array.isArray(miniKvPackage.artifactDigestIds) ? miniKvPackage.artifactDigestIds.length : 0,
    restoreDrillCommandCount: Array.isArray(miniKvPackage.restoreDrillCommands)
      ? miniKvPackage.restoreDrillCommands.length
      : 0,
    operatorConfirmationRequired: miniKvPackage.operatorConfirmationRequired,
    writeCommandsExecuted: miniKvPackage.writeCommandsExecuted,
    adminCommandsExecuted: miniKvPackage.adminCommandsExecuted,
    restoreExecutionAllowed: miniKvPackage.restoreExecutionAllowed,
    orderAuthoritative: miniKvPackage.orderAuthoritative,
    connectedToJavaTransactionChain: miniKvPackage.connectedToJavaTransactionChain,
    archivePath: miniKvPackage.archivePath,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): VerificationMessage[] {
  const blockers: VerificationMessage[] = [];
  addMessage(blockers, checks.sourceIntakeGateReady, "SOURCE_INTAKE_GATE_NOT_READY", "deployment-evidence-intake-gate", "Node v171 deployment evidence intake gate must be ready before v172 verification.");
  addMessage(blockers, checks.sourceIntakeDigestValid, "SOURCE_INTAKE_DIGEST_INVALID", "deployment-evidence-intake-gate", "Node v171 intake digest must be a valid SHA-256 hex digest.");
  addMessage(blockers, checks.sourceSummaryDigestValid, "SOURCE_SUMMARY_DIGEST_INVALID", "deployment-evidence-intake-gate", "Node v171 source summary digest must be valid.");
  addMessage(blockers, checks.sourceSummaryStillBlocksProduction, "SOURCE_SUMMARY_UNLOCKED_PRODUCTION", "deployment-evidence-intake-gate", "Source post-v166 summary must still block production operations.");
  addMessage(blockers, checks.javaVersionMatchesIntake, "JAVA_VERSION_MISMATCH", "java-v60-production-deployment-runbook-contract", "Java runbook version must match the intake gate.");
  addMessage(blockers, checks.javaContractVersionMatchesIntake, "JAVA_CONTRACT_VERSION_MISMATCH", "java-v60-production-deployment-runbook-contract", "Java runbook contract version must match the intake gate.");
  addMessage(blockers, checks.javaDeploymentWindowFieldsVerified, "JAVA_DEPLOYMENT_WINDOW_FIELDS_INVALID", "java-v60-production-deployment-runbook-contract", "Java deployment window owner, rollback approver, and no-trigger fields must be present.");
  addMessage(blockers, checks.javaMigrationFieldsVerified, "JAVA_MIGRATION_FIELDS_INVALID", "java-v60-production-deployment-runbook-contract", "Java migration fields must keep SQL and production database access disabled.");
  addMessage(blockers, checks.javaSecretBoundaryVerified, "JAVA_SECRET_BOUNDARY_INVALID", "java-v60-production-deployment-runbook-contract", "Java secret source confirmation must not expose secret values.");
  addMessage(blockers, checks.javaNoExecutionBoundaryVerified, "JAVA_EXECUTION_BOUNDARY_OPEN", "java-v60-production-deployment-runbook-contract", "Java v60 must not let Node deploy, rollback, execute SQL, or modify runtime config.");
  addMessage(blockers, checks.miniKvVersionMatchesIntake, "MINI_KV_VERSION_MISMATCH", "mini-kv-v69-release-artifact-digest-package", "mini-kv package version must match the intake gate.");
  addMessage(blockers, checks.miniKvPackageVersionMatchesIntake, "MINI_KV_PACKAGE_VERSION_MISMATCH", "mini-kv-v69-release-artifact-digest-package", "mini-kv package contract version must match the intake gate.");
  addMessage(blockers, checks.miniKvDigestFieldsVerified, "MINI_KV_DIGEST_FIELDS_INVALID", "mini-kv-v69-release-artifact-digest-package", "mini-kv package must include binary, WAL, Snapshot, and fixture digest fields.");
  addMessage(blockers, checks.miniKvRestoreDrillVerified, "MINI_KV_RESTORE_DRILL_INVALID", "mini-kv-v69-release-artifact-digest-package", "mini-kv restore drill must use CHECKJSON/read-only commands.");
  addMessage(blockers, checks.miniKvOperatorConfirmationVerified, "MINI_KV_OPERATOR_CONFIRMATION_INVALID", "mini-kv-v69-release-artifact-digest-package", "mini-kv operator confirmation fields must be present.");
  addMessage(blockers, checks.miniKvNoExecutionBoundaryVerified, "MINI_KV_EXECUTION_BOUNDARY_OPEN", "mini-kv-v69-release-artifact-digest-package", "mini-kv package must not execute writes, admin commands, or restore.");
  addMessage(blockers, checks.miniKvOrderAuthorityBoundaryVerified, "MINI_KV_ORDER_AUTHORITY_OPEN", "mini-kv-v69-release-artifact-digest-package", "mini-kv package must not create Java order authority.");
  addMessage(blockers, checks.intakeNoExecutionBoundaryVerified, "INTAKE_EXECUTION_BOUNDARY_OPEN", "deployment-evidence-intake-gate", "Node v171 intake gate must keep all execution flags closed.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "runtime-config", "UPSTREAM_ACTIONS_ENABLED must remain false.");
  addMessage(blockers, checks.noAutomaticUpstreamStart, "AUTOMATIC_UPSTREAM_START_NOT_ALLOWED", "deployment-evidence-verification", "Node v172 must not start Java or mini-kv.");
  addMessage(blockers, checks.verificationDigestValid, "VERIFICATION_DIGEST_INVALID", "deployment-evidence-verification", "v172 verification digest must be a valid SHA-256 hex digest.");
  return blockers;
}

function collectWarnings(verificationState: VerificationState): VerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "DEPLOYMENT_VERIFICATION_BLOCKED"
        : "DEPLOYMENT_VERIFICATION_NOT_PRODUCTION_APPROVAL",
      severity: "warning",
      source: "deployment-evidence-verification",
      message: verificationState === "blocked"
        ? "Deployment evidence verification has blockers."
        : "Deployment evidence verification is ready for manual review only.",
    },
    {
      code: "NEXT_STAGE_REQUIRES_NEW_UPSTREAM_EVIDENCE",
      severity: "warning",
      source: "deployment-evidence-verification",
      message: "The next stage should be the recommended parallel Java v61 plus mini-kv v70 evidence fixtures before Node v173.",
    },
  ];
}

function collectRecommendations(verificationState: VerificationState): VerificationMessage[] {
  return [
    {
      code: verificationState === "blocked"
        ? "FIX_DEPLOYMENT_VERIFICATION_BLOCKERS"
        : "PROCEED_TO_PARALLEL_JAVA_V61_MINI_KV_V70",
      severity: "recommendation",
      source: "deployment-evidence-verification",
      message: verificationState === "blocked"
        ? "Fix v172 verification blockers before requesting new upstream evidence."
        : "Proceed to recommended parallel Java v61 plus mini-kv v70; Node v173 must wait for both and this verification.",
    },
  ];
}

function addMessage(
  messages: VerificationMessage[],
  condition: boolean | undefined,
  code: string,
  source: VerificationMessage["source"],
  message: string,
): void {
  appendBlockingMessage(messages, Boolean(condition), code, source, message);
}

function digestVerification(value: unknown): string {
  return digestReleaseReport(value);
}
