import type { AppConfig } from "../config.js";
import { createCiEvidenceCommandProfile, type CiEvidenceCommandProfile } from "./ciEvidenceCommandProfile.js";
import { createDeploymentSafetyProfile, type DeploymentSafetyProfile } from "./deploymentSafetyProfile.js";
import {
  loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
  type UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate,
} from "./upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.js";

export interface RollbackEvidenceRunbook {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  runbookVersion: "rollback-evidence-runbook.v1";
  readyForRollbackEvidenceArchive: boolean;
  readOnly: true;
  executionAllowed: false;
  checks: {
    releaseEvidenceReady: boolean;
    ciProfileValid: boolean;
    deploymentProfileHasNoBlockers: boolean;
    rollbackStepsPresent: boolean;
    verificationStepsPresent: boolean;
    stopConditionsPresent: boolean;
    executionStillBlocked: boolean;
  };
  summary: {
    rollbackStepCount: number;
    verificationStepCount: number;
    stopConditionCount: number;
    evidenceEndpointCount: number;
    blockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  evidence: {
    releaseEvidenceReadinessGate: {
      ready: boolean;
      blockerCount: number;
      warningCount: number;
      endpoint: string;
    };
    ciEvidenceCommandProfile: {
      valid: boolean;
      commandCount: number;
      ciRunnableCommandCount: number;
      endpoint: string;
    };
    deploymentSafetyProfile: {
      suitableForProductionDemo: boolean;
      blockerCount: number;
      warningCount: number;
      endpoint: string;
    };
  };
  rollbackSteps: RollbackRunbookStep[];
  verificationSteps: RollbackRunbookStep[];
  stopConditions: RollbackRunbookCondition[];
  evidenceEndpoints: Record<string, string>;
  nextActions: string[];
}

export interface RollbackRunbookStep {
  order: number;
  id: string;
  title: string;
  detail: string;
  evidenceEndpoint?: string;
}

export interface RollbackRunbookCondition {
  code: string;
  severity: "stop";
  message: string;
}

const ENDPOINTS = Object.freeze({
  rollbackEvidenceRunbookJson: "/api/v1/deployment/rollback-runbook",
  rollbackEvidenceRunbookMarkdown: "/api/v1/deployment/rollback-runbook?format=markdown",
  releaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
  releaseEvidenceReadinessGateMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate?format=markdown",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  ciEvidenceCommandProfileMarkdown: "/api/v1/ci/evidence-command-profile?format=markdown",
  deploymentSafetyProfileJson: "/api/v1/deployment/safety-profile",
  deploymentSafetyProfileMarkdown: "/api/v1/deployment/safety-profile?format=markdown",
});

export async function loadRollbackEvidenceRunbook(config: AppConfig): Promise<RollbackEvidenceRunbook> {
  return createRollbackEvidenceRunbook({
    readinessGate: await loadUpstreamContractFixtureScenarioReleaseEvidenceReadinessGate(config),
    ciProfile: createCiEvidenceCommandProfile(config),
    deploymentProfile: createDeploymentSafetyProfile(config),
  });
}

export function createRollbackEvidenceRunbook(input: {
  readinessGate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate;
  ciProfile: CiEvidenceCommandProfile;
  deploymentProfile: DeploymentSafetyProfile;
}): RollbackEvidenceRunbook {
  const rollbackSteps = createRollbackSteps();
  const verificationSteps = createVerificationSteps();
  const stopConditions = createStopConditions(input);
  const checks = {
    releaseEvidenceReady: input.readinessGate.readyForReleaseEvidenceArchive,
    ciProfileValid: input.ciProfile.valid,
    deploymentProfileHasNoBlockers: input.deploymentProfile.summary.blockerCount === 0,
    rollbackStepsPresent: rollbackSteps.length >= 5,
    verificationStepsPresent: verificationSteps.length >= 4,
    stopConditionsPresent: stopConditions.length >= 4,
    executionStillBlocked: input.readinessGate.executionAllowed === false
      && input.ciProfile.executionAllowed === false
      && input.deploymentProfile.executionAllowed === false,
  };
  const blockerCount = [
    input.readinessGate.summary.blockerCount,
    input.ciProfile.summary.blockerCount,
    input.deploymentProfile.summary.blockerCount,
  ].reduce((sum, count) => sum + count, 0);
  const warningCount = input.readinessGate.summary.warningCount
    + input.ciProfile.summary.warningCount
    + input.deploymentProfile.summary.warningCount;
  const recommendationCount = input.deploymentProfile.summary.recommendationCount;
  const readyForRollbackEvidenceArchive = Object.values(checks).every((check) => check)
    && blockerCount === 0;

  return {
    service: "orderops-node",
    title: "Rollback evidence runbook",
    generatedAt: new Date().toISOString(),
    runbookVersion: "rollback-evidence-runbook.v1",
    readyForRollbackEvidenceArchive,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      rollbackStepCount: rollbackSteps.length,
      verificationStepCount: verificationSteps.length,
      stopConditionCount: stopConditions.length,
      evidenceEndpointCount: Object.keys(ENDPOINTS).length,
      blockerCount,
      warningCount,
      recommendationCount,
    },
    evidence: {
      releaseEvidenceReadinessGate: {
        ready: input.readinessGate.readyForReleaseEvidenceArchive,
        blockerCount: input.readinessGate.summary.blockerCount,
        warningCount: input.readinessGate.summary.warningCount,
        endpoint: ENDPOINTS.releaseEvidenceReadinessGateJson,
      },
      ciEvidenceCommandProfile: {
        valid: input.ciProfile.valid,
        commandCount: input.ciProfile.summary.commandCount,
        ciRunnableCommandCount: input.ciProfile.summary.ciRunnableCommandCount,
        endpoint: ENDPOINTS.ciEvidenceCommandProfileJson,
      },
      deploymentSafetyProfile: {
        suitableForProductionDemo: input.deploymentProfile.suitableForProductionDemo,
        blockerCount: input.deploymentProfile.summary.blockerCount,
        warningCount: input.deploymentProfile.summary.warningCount,
        endpoint: ENDPOINTS.deploymentSafetyProfileJson,
      },
    },
    rollbackSteps,
    verificationSteps,
    stopConditions,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(readyForRollbackEvidenceArchive),
  };
}

export function renderRollbackEvidenceRunbookMarkdown(runbook: RollbackEvidenceRunbook): string {
  return [
    "# Rollback evidence runbook",
    "",
    `- Service: ${runbook.service}`,
    `- Generated at: ${runbook.generatedAt}`,
    `- Runbook version: ${runbook.runbookVersion}`,
    `- Ready for rollback evidence archive: ${runbook.readyForRollbackEvidenceArchive}`,
    `- Read only: ${runbook.readOnly}`,
    `- Execution allowed: ${runbook.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(runbook.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(runbook.summary),
    "",
    "## Evidence",
    "",
    ...renderEntries(runbook.evidence.releaseEvidenceReadinessGate, "releaseEvidenceReadinessGate"),
    ...renderEntries(runbook.evidence.ciEvidenceCommandProfile, "ciEvidenceCommandProfile"),
    ...renderEntries(runbook.evidence.deploymentSafetyProfile, "deploymentSafetyProfile"),
    "",
    "## Rollback Steps",
    "",
    ...runbook.rollbackSteps.flatMap(renderStep),
    "## Verification Steps",
    "",
    ...runbook.verificationSteps.flatMap(renderStep),
    "## Stop Conditions",
    "",
    ...runbook.stopConditions.map((condition) => `- ${condition.code} (${condition.severity}): ${condition.message}`),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(runbook.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(runbook.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createRollbackSteps(): RollbackRunbookStep[] {
  return [
    {
      order: 1,
      id: "freeze-upstream-actions",
      title: "Keep upstream actions disabled",
      detail: "Confirm UPSTREAM_ACTIONS_ENABLED remains false before any rollback evidence is archived.",
      evidenceEndpoint: ENDPOINTS.deploymentSafetyProfileJson,
    },
    {
      order: 2,
      id: "capture-release-evidence",
      title: "Capture release evidence readiness",
      detail: "Archive the release evidence readiness gate output before deciding on rollback.",
      evidenceEndpoint: ENDPOINTS.releaseEvidenceReadinessGateJson,
    },
    {
      order: 3,
      id: "capture-ci-profile",
      title: "Capture CI evidence command profile",
      detail: "Archive the CI evidence command profile so rollback reviewers know exactly which checks are safe to rerun.",
      evidenceEndpoint: ENDPOINTS.ciEvidenceCommandProfileJson,
    },
    {
      order: 4,
      id: "capture-deployment-safety",
      title: "Capture deployment safety profile",
      detail: "Archive current deployment safety blockers, warnings, recommendations, and runtime config snapshot.",
      evidenceEndpoint: ENDPOINTS.deploymentSafetyProfileJson,
    },
    {
      order: 5,
      id: "coordinate-human-rollback",
      title: "Coordinate rollback outside Node",
      detail: "Use the archived evidence to guide human rollback. This Node runbook does not execute server, Java, or mini-kv rollback commands.",
    },
  ];
}

function createVerificationSteps(): RollbackRunbookStep[] {
  return [
    {
      order: 1,
      id: "verify-node-health",
      title: "Verify Node health",
      detail: "Check /health after rollback evidence is archived.",
    },
    {
      order: 2,
      id: "verify-actions-disabled",
      title: "Verify upstream actions remain disabled",
      detail: "Confirm deployment safety profile still reports upstreamActionsDisabled=true.",
      evidenceEndpoint: ENDPOINTS.deploymentSafetyProfileJson,
    },
    {
      order: 3,
      id: "verify-release-gate",
      title: "Verify release evidence gate",
      detail: "Confirm readiness gate still reports executionAllowed=false before any follow-up action.",
      evidenceEndpoint: ENDPOINTS.releaseEvidenceReadinessGateJson,
    },
    {
      order: 4,
      id: "verify-audit-capture",
      title: "Verify audit capture",
      detail: "Confirm audit summary/events are still recording Node requests after rollback review.",
    },
  ];
}

function createStopConditions(input: {
  readinessGate: UpstreamContractFixtureScenarioReleaseEvidenceReadinessGate;
  ciProfile: CiEvidenceCommandProfile;
  deploymentProfile: DeploymentSafetyProfile;
}): RollbackRunbookCondition[] {
  return [
    {
      code: "UPSTREAM_ACTIONS_ENABLED",
      severity: "stop",
      message: "Stop if any profile reports executionAllowed=true or UPSTREAM_ACTIONS_ENABLED=true.",
    },
    {
      code: "READINESS_BLOCKERS_PRESENT",
      severity: "stop",
      message: `Stop if release evidence readiness blockers are present. Current count: ${input.readinessGate.summary.blockerCount}.`,
    },
    {
      code: "CI_PROFILE_INVALID",
      severity: "stop",
      message: `Stop if the CI evidence command profile is invalid. Current valid: ${input.ciProfile.valid}.`,
    },
    {
      code: "DEPLOYMENT_BLOCKERS_PRESENT",
      severity: "stop",
      message: `Stop if deployment safety blockers are present. Current count: ${input.deploymentProfile.summary.blockerCount}.`,
    },
    {
      code: "HUMAN_AUTHORIZATION_MISSING",
      severity: "stop",
      message: "Stop before any real rollback command unless a human rollback owner explicitly authorizes it outside this Node endpoint.",
    },
  ];
}

function collectNextActions(ready: boolean): string[] {
  if (ready) {
    return [
      "Archive this rollback runbook with release evidence, CI profile, and deployment safety profile.",
      "Keep this endpoint read-only; execute rollback commands only through a separate authorized operations process.",
      "Use the stop conditions as release-review checklist items before any future deployment.",
    ];
  }

  return [
    "Resolve runbook blockers before archiving rollback evidence.",
    "Do not execute rollback commands from this Node endpoint.",
  ];
}

function renderStep(step: RollbackRunbookStep): string[] {
  return [
    `### ${step.order}. ${step.id}`,
    "",
    `- Title: ${step.title}`,
    `- Detail: ${step.detail}`,
    ...(step.evidenceEndpoint === undefined ? [] : [`- Evidence endpoint: ${step.evidenceEndpoint}`]),
    "",
  ];
}

function renderEntries(record: Record<string, unknown>, prefix?: string): string[] {
  return Object.entries(record).map(([key, value]) => `- ${prefix === undefined ? key : `${prefix}.${key}`}: ${formatValue(value)}`);
}

function renderList(items: string[], emptyText: string): string[] {
  return items.length === 0 ? [`- ${emptyText}`] : items.map((item) => `- ${item}`);
}

function formatValue(value: unknown): string {
  if (value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}
