import type { AppConfig } from "../config.js";
import {
  completeAggregateReadyCheck,
  digestReleaseReport,
  isReleaseReportDigest,
  renderReleaseReportMarkdown,
  renderReleaseReportStep,
  summarizeReportChecks,
} from "./releaseReportShared.js";
import {
  createCiEvidenceCommandProfile,
} from "./ciEvidenceCommandProfile.js";
import type {
  CiEvidenceCommandProfile,
} from "./ciEvidenceCommandProfile.js";
import {
  loadReleaseHandoffReadinessReview,
} from "./releaseHandoffReadinessReview.js";
import type {
  ReleaseHandoffReadinessReviewProfile,
} from "./releaseHandoffReadinessReview.js";

type PacketState = "ready-for-ci-evidence-hardening" | "blocked";
type PacketActor = "node" | "ci-runner" | "operator";

interface PacketMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "ci-evidence-hardening-packet"
    | "release-handoff-readiness-review"
    | "ci-evidence-command-profile"
    | "github-actions"
    | "runtime-config";
  message: string;
}

interface EvidenceExpectation {
  id: string;
  phase: "install" | "verify" | "build" | "smoke" | "visual" | "archive";
  command: string;
  expectedEvidence: string;
  localRequired: true;
  ciRequired: boolean;
  readOnly: true;
  createsTemporaryOutput: boolean;
  cleanupRequired: boolean;
}

interface CiDifference {
  id: string;
  area: "environment" | "process" | "artifact" | "browser" | "authorization";
  localBehavior: string;
  githubActionsBehavior: string;
  hardeningRule: string;
  blocksProductionExecution: true;
}

interface HardeningStep {
  order: number;
  phase: "collect" | "verify" | "run" | "capture" | "cleanup" | "closeout";
  actor: PacketActor;
  action: string;
  evidenceTarget: string;
  expectedEvidence: string;
  readOnly: true;
  executionAllowed: false;
  upstreamActionsEnabled: false;
}

export interface CiEvidenceHardeningPacketProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "ci-evidence-hardening-packet.v1";
  packetState: PacketState;
  readyForCiEvidenceHardeningPacket: boolean;
  readyForProductionRelease: false;
  readyForProductionDeployment: false;
  readyForProductionRollback: false;
  readOnly: true;
  executionAllowed: false;
  packet: Record<string, unknown>;
  checks: Record<string, boolean>;
  artifacts: Record<string, object>;
  evidenceExpectations: EvidenceExpectation[];
  ciDifferences: CiDifference[];
  hardeningSteps: HardeningStep[];
  pauseConditions: string[];
  summary: Record<string, number>;
  productionBlockers: PacketMessage[];
  warnings: PacketMessage[];
  recommendations: PacketMessage[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

const ENDPOINTS = Object.freeze({
  ciEvidenceHardeningPacketJson: "/api/v1/ci/evidence-hardening-packet",
  ciEvidenceHardeningPacketMarkdown: "/api/v1/ci/evidence-hardening-packet?format=markdown",
  releaseHandoffReadinessReviewJson: "/api/v1/production/release-handoff-readiness-review",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  workflowEvidenceVerificationJson: "/api/v1/ci/workflow-evidence-verification",
  currentRoadmap: "docs/plans/v173-post-release-window-readiness-roadmap.md",
});

export function loadCiEvidenceHardeningPacket(config: AppConfig): CiEvidenceHardeningPacketProfile {
  const handoffReview = loadReleaseHandoffReadinessReview(config);
  const commandProfile = createCiEvidenceCommandProfile(config);
  const evidenceExpectations = createEvidenceExpectations();
  const ciDifferences = createCiDifferences();
  const hardeningSteps = createHardeningSteps();
  const pauseConditions = createPauseConditions();
  const checks = createChecks(
    config,
    handoffReview,
    commandProfile,
    evidenceExpectations,
    ciDifferences,
    hardeningSteps,
    pauseConditions,
  );
  const packetDigest = digestPacket({
    profileVersion: "ci-evidence-hardening-packet.v1",
    sourceHandoffReviewDigest: handoffReview.review.reviewDigest,
    sourceCiProfileVersion: commandProfile.profileVersion,
    upstreamActionsEnabled: config.upstreamActionsEnabled,
    checks: {
      ...checks,
      packetDigestValid: undefined,
      readyForCiEvidenceHardeningPacket: undefined,
    },
  });
  checks.packetDigestValid = isReleaseReportDigest(packetDigest);
  completeAggregateReadyCheck(checks, "readyForCiEvidenceHardeningPacket");
  const packetState: PacketState = checks.readyForCiEvidenceHardeningPacket
    ? "ready-for-ci-evidence-hardening"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(packetState);
  const recommendations = collectRecommendations(packetState);
  const checkSummary = summarizeReportChecks(checks);

  return {
    service: "orderops-node",
    title: "CI evidence hardening packet",
    generatedAt: new Date().toISOString(),
    profileVersion: "ci-evidence-hardening-packet.v1",
    packetState,
    readyForCiEvidenceHardeningPacket: checks.readyForCiEvidenceHardeningPacket,
    readyForProductionRelease: false,
    readyForProductionDeployment: false,
    readyForProductionRollback: false,
    readOnly: true,
    executionAllowed: false,
    packet: {
      packetDigest,
      sourceHandoffReviewDigest: handoffReview.review.reviewDigest,
      sourceHandoffReviewProfileVersion: handoffReview.profileVersion,
      sourceHandoffReviewState: handoffReview.reviewState,
      sourceCiCommandProfileVersion: commandProfile.profileVersion,
      sourceCiCommandProfileValid: commandProfile.valid,
      packetMode: "ci-evidence-hardening-only",
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      localSmokeEndpoint: ENDPOINTS.ciEvidenceHardeningPacketJson,
      githubActionsWorkflowExpected: ".github/workflows/node-evidence.yml",
      screenshotEvidenceRequiredLocally: true,
      screenshotEvidenceRequiredInCi: false,
      productionReleaseAuthorized: false,
      productionDeploymentAuthorized: false,
      productionRollbackAuthorized: false,
    },
    checks,
    artifacts: {
      releaseHandoffReadinessReview: summarizeHandoffReview(handoffReview),
      ciEvidenceCommandProfile: summarizeCiEvidenceCommandProfile(commandProfile),
      safetyBoundary: {
        upstreamProbesEnabled: config.upstreamProbesEnabled,
        upstreamActionsEnabled: config.upstreamActionsEnabled,
        nodeMayStartJava: false,
        nodeMayStartMiniKv: false,
        ciMayReadSecrets: false,
        ciMayDeploy: false,
        ciMayRollback: false,
        ciMayRestore: false,
        ciMayPushDocker: false,
      },
    },
    evidenceExpectations,
    ciDifferences,
    hardeningSteps,
    pauseConditions,
    summary: {
      checkCount: checkSummary.checkCount,
      passedCheckCount: checkSummary.passedCheckCount,
      evidenceExpectationCount: evidenceExpectations.length,
      ciDifferenceCount: ciDifferences.length,
      hardeningStepCount: hardeningSteps.length,
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
      "Use this packet to harden CI evidence expectations without enabling upstream actions.",
      "Keep screenshots as local archived evidence unless the workflow explicitly provisions a browser artifact path.",
      "After v176 is archived, create a new non-overlapping plan for the next production-grade stage.",
    ],
  };
}

export function renderCiEvidenceHardeningPacketMarkdown(profile: CiEvidenceHardeningPacketProfile): string {
  return renderReleaseReportMarkdown({
    title: "CI evidence hardening packet",
    header: {
      Service: profile.service,
      "Generated at": profile.generatedAt,
      "Profile version": profile.profileVersion,
      "Packet state": profile.packetState,
      "Ready for CI evidence hardening packet": profile.readyForCiEvidenceHardeningPacket,
      "Ready for production release": profile.readyForProductionRelease,
      "Ready for production deployment": profile.readyForProductionDeployment,
      "Ready for production rollback": profile.readyForProductionRollback,
      "Read only": profile.readOnly,
      "Execution allowed": profile.executionAllowed,
    },
    sections: [
      { heading: "Packet", entries: profile.packet },
      { heading: "Checks", entries: profile.checks },
      { heading: "Release Handoff Readiness Review", entries: profile.artifacts.releaseHandoffReadinessReview },
      { heading: "CI Evidence Command Profile", entries: profile.artifacts.ciEvidenceCommandProfile },
      { heading: "Safety Boundary", entries: profile.artifacts.safetyBoundary },
      { heading: "Summary", entries: profile.summary },
    ],
    itemSections: [
      {
        heading: "Evidence Expectations",
        items: profile.evidenceExpectations,
        renderItem: renderEvidenceExpectation,
      },
      {
        heading: "Local vs GitHub Actions Differences",
        items: profile.ciDifferences,
        renderItem: renderCiDifference,
      },
      {
        heading: "Hardening Steps",
        items: profile.hardeningSteps,
        renderItem: (step) => renderReleaseReportStep(step, {
          identityLabel: "Actor",
          identityKey: "actor",
          booleanFields: [
            ["Read only", "readOnly"],
            ["Execution allowed", "executionAllowed"],
            ["Upstream actions enabled", "upstreamActionsEnabled"],
          ],
        }),
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
        emptyText: "No CI evidence hardening blockers.",
      },
      {
        heading: "Warnings",
        messages: profile.warnings,
        emptyText: "No CI evidence hardening warnings.",
      },
      {
        heading: "Recommendations",
        messages: profile.recommendations,
        emptyText: "No CI evidence hardening recommendations.",
      },
    ],
    evidenceEndpoints: profile.evidenceEndpoints,
    nextActions: profile.nextActions,
  });
}

function createChecks(
  config: AppConfig,
  handoffReview: ReleaseHandoffReadinessReviewProfile,
  commandProfile: CiEvidenceCommandProfile,
  evidenceExpectations: EvidenceExpectation[],
  ciDifferences: CiDifference[],
  hardeningSteps: HardeningStep[],
  pauseConditions: string[],
): Record<string, boolean> {
  return {
    sourceHandoffReviewReady: handoffReview.readyForReleaseHandoffReadinessReview
      && handoffReview.reviewState === "ready-for-manual-release-handoff-review",
    sourceHandoffReviewDigestValid: isReleaseReportDigest(handoffReview.review.reviewDigest),
    sourceHandoffReviewStillBlocksProduction: handoffReview.readyForProductionRelease === false
      && handoffReview.readyForProductionDeployment === false
      && handoffReview.readyForProductionRollback === false
      && handoffReview.executionAllowed === false,
    ciCommandProfileValid: commandProfile.valid
      && commandProfile.executionAllowed === false
      && commandProfile.readOnly === true,
    ciCommandProfileIncludesCoreCommands: commandProfile.checks.typecheckCommandPresent
      && commandProfile.checks.testCommandPresent
      && commandProfile.checks.buildCommandPresent
      && commandProfile.checks.readinessGateSmokePresent,
    ciCommandProfileSafeByDefault: commandProfile.checks.safeEnvironmentDisablesProbes
      && commandProfile.checks.safeEnvironmentDisablesActions
      && commandProfile.checks.noManualAuthorizationCommandRunsByDefault
      && commandProfile.checks.allCiRunnableCommandsAreReadOnly,
    evidenceExpectationsComplete: evidenceExpectations.length === 7
      && evidenceExpectations.some((item) => item.id === "typecheck")
      && evidenceExpectations.some((item) => item.id === "full-test")
      && evidenceExpectations.some((item) => item.id === "chrome-screenshot"),
    evidenceExpectationsReadOnly: evidenceExpectations.every((item) => item.readOnly),
    cleanupExpectationsPresent: evidenceExpectations
      .filter((item) => item.createsTemporaryOutput)
      .every((item) => item.cleanupRequired),
    ciDifferencesComplete: ciDifferences.length === 5
      && ciDifferences.every((item) => item.blocksProductionExecution),
    hardeningStepsComplete: hardeningSteps.length === 6,
    hardeningStepsReadOnly: hardeningSteps.every((step) => (
      step.readOnly
      && !step.executionAllowed
      && !step.upstreamActionsEnabled
    )),
    pauseConditionsComplete: pauseConditions.length === 7
      && pauseConditions.includes("UPSTREAM_ACTIONS_ENABLED must remain false.")
      && pauseConditions.includes("GitHub Actions must not read production secrets."),
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    noProductionReleaseAuthorization: true,
    noDeploymentAuthorization: true,
    noRollbackAuthorization: true,
    noWorkflowSecretRead: true,
    noJavaOrMiniKvStart: true,
    packetDigestValid: false,
    readyForCiEvidenceHardeningPacket: false,
  };
}

function createEvidenceExpectations(): EvidenceExpectation[] {
  return [
    {
      id: "npm-ci",
      phase: "install",
      command: "npm ci",
      expectedEvidence: "Dependencies are installed from package-lock.json in CI.",
      localRequired: true,
      ciRequired: true,
      readOnly: true,
      createsTemporaryOutput: false,
      cleanupRequired: false,
    },
    {
      id: "typecheck",
      phase: "verify",
      command: "npm run typecheck",
      expectedEvidence: "TypeScript exits with code 0 without emitting files.",
      localRequired: true,
      ciRequired: true,
      readOnly: true,
      createsTemporaryOutput: false,
      cleanupRequired: false,
    },
    {
      id: "full-test",
      phase: "verify",
      command: "npm test",
      expectedEvidence: "Vitest exits with code 0 and reports all test files passing.",
      localRequired: true,
      ciRequired: true,
      readOnly: true,
      createsTemporaryOutput: false,
      cleanupRequired: false,
    },
    {
      id: "build",
      phase: "build",
      command: "npm run build",
      expectedEvidence: "dist/ is emitted successfully before smoke, then removed after the version closes.",
      localRequired: true,
      ciRequired: true,
      readOnly: true,
      createsTemporaryOutput: true,
      cleanupRequired: true,
    },
    {
      id: "safe-http-smoke",
      phase: "smoke",
      command: "node dist/server.js; GET /api/v1/ci/evidence-hardening-packet",
      expectedEvidence: "Packet endpoint returns readyForCiEvidenceHardeningPacket=true and executionAllowed=false.",
      localRequired: true,
      ciRequired: true,
      readOnly: true,
      createsTemporaryOutput: true,
      cleanupRequired: true,
    },
    {
      id: "chrome-screenshot",
      phase: "visual",
      command: "npx playwright screenshot --channel chrome",
      expectedEvidence: "Local Chrome screenshot is archived under c/176/图片.",
      localRequired: true,
      ciRequired: false,
      readOnly: true,
      createsTemporaryOutput: false,
      cleanupRequired: false,
    },
    {
      id: "archive-and-cleanup",
      phase: "archive",
      command: "archive c/176 and remove .tmp/dist",
      expectedEvidence: "Version archive, code walkthrough, and cleanup summary are present.",
      localRequired: true,
      ciRequired: false,
      readOnly: true,
      createsTemporaryOutput: true,
      cleanupRequired: true,
    },
  ];
}

function createCiDifferences(): CiDifference[] {
  return [
    {
      id: "environment-source",
      area: "environment",
      localBehavior: "Developer shell exports safe smoke environment variables.",
      githubActionsBehavior: "Workflow env block must pin probes/actions false and avoid secrets.",
      hardeningRule: "CI packet is invalid if upstream actions are true or secrets are referenced.",
      blocksProductionExecution: true,
    },
    {
      id: "process-lifetime",
      area: "process",
      localBehavior: "Smoke server is started and stopped by the current task.",
      githubActionsBehavior: "Workflow must capture PID and stop the smoke server in cleanup.",
      hardeningRule: "No long-running CI process may survive after the job.",
      blocksProductionExecution: true,
    },
    {
      id: "artifact-retention",
      area: "artifact",
      localBehavior: "c/<version>/ keeps screenshot and explanation; .tmp/dist are removed.",
      githubActionsBehavior: "CI may upload logs but must not upload secrets or deployment artifacts.",
      hardeningRule: "Only read-only evidence artifacts are allowed.",
      blocksProductionExecution: true,
    },
    {
      id: "browser-availability",
      area: "browser",
      localBehavior: "Use local Chrome through Playwright for screenshots.",
      githubActionsBehavior: "Browser screenshots are optional unless the runner provisions a browser.",
      hardeningRule: "Missing CI screenshot does not authorize skipping local visual archive.",
      blocksProductionExecution: true,
    },
    {
      id: "authorization-boundary",
      area: "authorization",
      localBehavior: "Operator headers are used for safe local smoke.",
      githubActionsBehavior: "CI must not obtain production approval or execution credentials.",
      hardeningRule: "CI evidence hardening is not production release approval.",
      blocksProductionExecution: true,
    },
  ];
}

function createHardeningSteps(): HardeningStep[] {
  return [
    {
      order: 1,
      phase: "collect",
      actor: "node",
      action: "Load v175 release handoff readiness review and CI command profile.",
      evidenceTarget: "release handoff review + CI command profile",
      expectedEvidence: "Both sources are valid and still block production operations.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 2,
      phase: "verify",
      actor: "node",
      action: "Verify evidence expectations cover install, typecheck, test, build, smoke, screenshot, and cleanup.",
      evidenceTarget: "evidenceExpectations",
      expectedEvidence: "All expected evidence entries are read-only and cleanup-aware.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 3,
      phase: "run",
      actor: "ci-runner",
      action: "Run CI-runnable commands with probes/actions disabled.",
      evidenceTarget: "GitHub Actions job log",
      expectedEvidence: "typecheck, test, build, and safe HTTP smoke pass without secrets or deployment commands.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 4,
      phase: "capture",
      actor: "operator",
      action: "Capture local Chrome screenshot for the version archive.",
      evidenceTarget: "c/176/图片",
      expectedEvidence: "Screenshot renders the CI evidence hardening packet endpoint.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 5,
      phase: "cleanup",
      actor: "node",
      action: "Remove .tmp and dist after verification.",
      evidenceTarget: "cleanup summary",
      expectedEvidence: ".tmp and dist are absent; task-started Node service is stopped.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
    {
      order: 6,
      phase: "closeout",
      actor: "operator",
      action: "Review packet before creating the next non-overlapping plan.",
      evidenceTarget: "docs/plans",
      expectedEvidence: "Current plan is closed and the next plan does not repeat completed versions.",
      readOnly: true,
      executionAllowed: false,
      upstreamActionsEnabled: false,
    },
  ];
}

function createPauseConditions(): string[] {
  return [
    "UPSTREAM_ACTIONS_ENABLED must remain false.",
    "GitHub Actions must not read production secrets.",
    "CI must not deploy, rollback, restore, push Docker images, run kubectl, or copy files to servers.",
    "Node must not start Java or mini-kv for this packet.",
    "Screenshot failure may block archive completeness but must not trigger upstream actions.",
    "Any CI job requesting production credentials pauses the workflow.",
    "Unclear CI evidence ownership or missing cleanup path pauses the workflow.",
  ];
}

function summarizeHandoffReview(profile: ReleaseHandoffReadinessReviewProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    reviewState: profile.reviewState,
    reviewDigest: profile.review.reviewDigest,
    readyForReleaseHandoffReadinessReview: profile.readyForReleaseHandoffReadinessReview,
    readyForProductionRelease: profile.readyForProductionRelease,
    readyForProductionDeployment: profile.readyForProductionDeployment,
    readyForProductionRollback: profile.readyForProductionRollback,
    executionAllowed: profile.executionAllowed,
    checkCount: profile.summary.checkCount,
    passedCheckCount: profile.summary.passedCheckCount,
  };
}

function summarizeCiEvidenceCommandProfile(profile: CiEvidenceCommandProfile): Record<string, object | string | boolean | number | unknown> {
  return {
    profileVersion: profile.profileVersion,
    valid: profile.valid,
    readOnly: profile.readOnly,
    executionAllowed: profile.executionAllowed,
    safety: profile.safety,
    safeEnvironment: profile.safeEnvironment,
    commandCount: profile.summary.commandCount,
    ciRunnableCommandCount: profile.summary.ciRunnableCommandCount,
    smokeCommandCount: profile.summary.smokeCommandCount,
    blockerCount: profile.summary.blockerCount,
    warningCount: profile.summary.warningCount,
  };
}

function collectProductionBlockers(checks: Record<string, boolean>): PacketMessage[] {
  return collectMessages("blocker", [
    { condition: checks.sourceHandoffReviewReady, code: "SOURCE_HANDOFF_REVIEW_NOT_READY", source: "release-handoff-readiness-review", message: "Node v175 handoff review must be ready before CI evidence hardening." },
    { condition: checks.sourceHandoffReviewDigestValid, code: "SOURCE_HANDOFF_REVIEW_DIGEST_INVALID", source: "release-handoff-readiness-review", message: "Node v175 handoff review digest must be valid." },
    { condition: checks.sourceHandoffReviewStillBlocksProduction, code: "SOURCE_HANDOFF_REVIEW_UNLOCKS_PRODUCTION", source: "release-handoff-readiness-review", message: "Node v175 handoff review must still block production operations." },
    { condition: checks.ciCommandProfileValid, code: "CI_COMMAND_PROFILE_INVALID", source: "ci-evidence-command-profile", message: "CI command profile must be valid and read-only." },
    { condition: checks.ciCommandProfileIncludesCoreCommands, code: "CI_CORE_COMMANDS_INCOMPLETE", source: "ci-evidence-command-profile", message: "CI command profile must include typecheck, test, build, and smoke." },
    { condition: checks.ciCommandProfileSafeByDefault, code: "CI_COMMAND_PROFILE_UNSAFE", source: "ci-evidence-command-profile", message: "CI command profile must keep probes/actions disabled and manual commands out of CI defaults." },
    { condition: checks.evidenceExpectationsComplete, code: "EVIDENCE_EXPECTATIONS_INCOMPLETE", source: "ci-evidence-hardening-packet", message: "Packet must list all required evidence expectations." },
    { condition: checks.evidenceExpectationsReadOnly, code: "EVIDENCE_EXPECTATION_NOT_READ_ONLY", source: "ci-evidence-hardening-packet", message: "Evidence expectations must remain read-only." },
    { condition: checks.cleanupExpectationsPresent, code: "CLEANUP_EXPECTATIONS_MISSING", source: "ci-evidence-hardening-packet", message: "Temporary-output evidence expectations must require cleanup." },
    { condition: checks.ciDifferencesComplete, code: "CI_DIFFERENCES_INCOMPLETE", source: "github-actions", message: "Packet must document local versus GitHub Actions differences." },
    { condition: checks.hardeningStepsComplete, code: "HARDENING_STEPS_INCOMPLETE", source: "ci-evidence-hardening-packet", message: "Packet must list the hardening steps." },
    { condition: checks.hardeningStepsReadOnly, code: "HARDENING_STEPS_NOT_READ_ONLY", source: "ci-evidence-hardening-packet", message: "Hardening steps must not authorize execution or upstream actions." },
    { condition: checks.pauseConditionsComplete, code: "PAUSE_CONDITIONS_INCOMPLETE", source: "ci-evidence-hardening-packet", message: "Pause conditions must cover CI hardening hazards." },
    { condition: checks.upstreamActionsStillDisabled, code: "UPSTREAM_ACTIONS_ENABLED", source: "runtime-config", message: "UPSTREAM_ACTIONS_ENABLED must remain false." },
    { condition: checks.noProductionReleaseAuthorization, code: "PRODUCTION_RELEASE_UNLOCKED", source: "ci-evidence-hardening-packet", message: "CI evidence hardening must not authorize release." },
    { condition: checks.noDeploymentAuthorization, code: "DEPLOYMENT_UNLOCKED", source: "ci-evidence-hardening-packet", message: "CI evidence hardening must not authorize deployment." },
    { condition: checks.noRollbackAuthorization, code: "ROLLBACK_UNLOCKED", source: "ci-evidence-hardening-packet", message: "CI evidence hardening must not authorize rollback." },
    { condition: checks.noWorkflowSecretRead, code: "WORKFLOW_SECRET_READ_UNLOCKED", source: "github-actions", message: "CI evidence hardening must not read production secrets." },
    { condition: checks.noJavaOrMiniKvStart, code: "UPSTREAM_START_UNLOCKED", source: "ci-evidence-hardening-packet", message: "CI evidence hardening must not start Java or mini-kv." },
    { condition: checks.packetDigestValid, code: "PACKET_DIGEST_INVALID", source: "ci-evidence-hardening-packet", message: "Packet digest must be a valid SHA-256 hex digest." },
  ]);
}

function collectWarnings(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked" ? "CI_EVIDENCE_HARDENING_BLOCKED" : "CI_EVIDENCE_HARDENING_NOT_DEPLOYMENT",
      severity: "warning",
      source: "ci-evidence-hardening-packet",
      message: packetState === "blocked"
        ? "CI evidence hardening packet has blockers."
        : "CI evidence hardening improves release evidence but does not deploy or approve production release.",
    },
    {
      code: "CI_SCREENSHOT_OPTIONAL_LOCAL_REQUIRED",
      severity: "warning",
      source: "github-actions",
      message: "GitHub Actions screenshot is optional in this packet, but local archive screenshot remains required.",
    },
  ];
}

function collectRecommendations(packetState: PacketState): PacketMessage[] {
  return [
    {
      code: packetState === "blocked"
        ? "FIX_CI_EVIDENCE_HARDENING_BLOCKERS"
        : "CREATE_NEXT_NON_OVERLAPPING_PLAN",
      severity: "recommendation",
      source: "ci-evidence-hardening-packet",
      message: packetState === "blocked"
        ? "Fix packet blockers before relying on CI evidence hardening."
        : "Create the next plan after v176; do not append overlapping versions to the completed v173-derived plan.",
    },
  ];
}

function renderEvidenceExpectation(expectation: EvidenceExpectation): string[] {
  return [
    `### ${expectation.id}`,
    "",
    `- Phase: ${expectation.phase}`,
    `- Command: ${expectation.command}`,
    `- Expected evidence: ${expectation.expectedEvidence}`,
    `- Local required: ${expectation.localRequired}`,
    `- CI required: ${expectation.ciRequired}`,
    `- Read only: ${expectation.readOnly}`,
    `- Creates temporary output: ${expectation.createsTemporaryOutput}`,
    `- Cleanup required: ${expectation.cleanupRequired}`,
    "",
  ];
}

function renderCiDifference(difference: CiDifference): string[] {
  return [
    `### ${difference.id}`,
    "",
    `- Area: ${difference.area}`,
    `- Local behavior: ${difference.localBehavior}`,
    `- GitHub Actions behavior: ${difference.githubActionsBehavior}`,
    `- Hardening rule: ${difference.hardeningRule}`,
    `- Blocks production execution: ${difference.blocksProductionExecution}`,
    "",
  ];
}

function collectMessages(
  severity: "blocker",
  specs: Array<{
    condition: boolean | undefined;
    code: string;
    source: PacketMessage["source"];
    message: string;
  }>,
): PacketMessage[] {
  const messages: PacketMessage[] = [];
  for (const spec of specs) {
    if (!spec.condition) {
      messages.push({ code: spec.code, severity, source: spec.source, message: spec.message });
    }
  }
  return messages;
}

function digestPacket(value: unknown): string {
  return digestReleaseReport(value);
}
