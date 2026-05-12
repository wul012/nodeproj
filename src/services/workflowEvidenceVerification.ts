import { readFile } from "node:fs/promises";
import path from "node:path";

export interface WorkflowEvidenceVerification {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  verificationVersion: "workflow-evidence-verification.v1";
  workflowPath: string;
  workflowLineCount: number;
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  checks: {
    workflowFilePresent: boolean;
    workflowNamePresent: boolean;
    permissionsReadOnly: boolean;
    nodeSetupPresent: boolean;
    npmCiPresent: boolean;
    typecheckPresent: boolean;
    testPresent: boolean;
    buildPresent: boolean;
    safeSmokeServerPresent: boolean;
    healthSmokePresent: boolean;
    releaseEvidenceReadinessSmokePresent: boolean;
    probesDisabled: boolean;
    actionsDisabled: boolean;
    readinessSmokeKeepsExecutionBlocked: boolean;
    noSecretsReference: boolean;
    noKubectl: boolean;
    noDockerPush: boolean;
    noScp: boolean;
    noUpstreamActionsEnabledTrue: boolean;
  };
  summary: {
    requiredCheckCount: number;
    passingCheckCount: number;
    failingCheckCount: number;
    blockerCount: number;
    warningCount: number;
    workflowLineCount: number;
  };
  blockers: WorkflowEvidenceMessage[];
  warnings: WorkflowEvidenceMessage[];
  evidenceEndpoints: {
    workflowEvidenceVerificationJson: string;
    workflowEvidenceVerificationMarkdown: string;
    ciEvidenceCommandProfileJson: string;
    releaseEvidenceReadinessGateJson: string;
  };
  nextActions: string[];
}

export interface WorkflowEvidenceMessage {
  code: string;
  severity: "blocker" | "warning";
  message: string;
}

const ENDPOINTS = Object.freeze({
  workflowEvidenceVerificationJson: "/api/v1/ci/workflow-evidence-verification",
  workflowEvidenceVerificationMarkdown: "/api/v1/ci/workflow-evidence-verification?format=markdown",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  releaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
});

export async function loadWorkflowEvidenceVerification(): Promise<WorkflowEvidenceVerification> {
  const workflowPath = path.join(process.cwd(), ".github", "workflows", "node-evidence.yml");

  try {
    const workflowContent = await readFile(workflowPath, "utf8");
    return createWorkflowEvidenceVerification(workflowPath, workflowContent);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return createMissingWorkflowEvidenceVerification(workflowPath, message);
  }
}

export function createWorkflowEvidenceVerification(
  workflowPath: string,
  workflowContent: string,
): WorkflowEvidenceVerification {
  const workflowLineCount = countLines(workflowContent);
  const checks = {
    workflowFilePresent: true,
    workflowNamePresent: workflowContent.includes("name: Node Evidence"),
    permissionsReadOnly: workflowContent.includes("permissions:")
      && workflowContent.includes("contents: read")
      && !workflowContent.includes("contents: write"),
    nodeSetupPresent: workflowContent.includes("actions/setup-node@v4")
      && workflowContent.includes("node-version: \"22\""),
    npmCiPresent: workflowContent.includes("npm ci"),
    typecheckPresent: workflowContent.includes("npm run typecheck"),
    testPresent: workflowContent.includes("npm test"),
    buildPresent: workflowContent.includes("npm run build"),
    safeSmokeServerPresent: workflowContent.includes("node dist/server.js")
      && workflowContent.includes("node-evidence-smoke.pid"),
    healthSmokePresent: workflowContent.includes("/health"),
    releaseEvidenceReadinessSmokePresent: workflowContent
      .includes("/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate"),
    probesDisabled: workflowContent.includes("UPSTREAM_PROBES_ENABLED: \"false\""),
    actionsDisabled: workflowContent.includes("UPSTREAM_ACTIONS_ENABLED: \"false\""),
    readinessSmokeKeepsExecutionBlocked: workflowContent
      .includes("json.readyForReleaseEvidenceArchive !== true || json.executionAllowed !== false"),
    noSecretsReference: !workflowContent.includes("secrets."),
    noKubectl: !/\bkubectl\b/i.test(workflowContent),
    noDockerPush: !/\bdocker\s+push\b/i.test(workflowContent),
    noScp: !/\bscp\b/i.test(workflowContent),
    noUpstreamActionsEnabledTrue: !workflowContent.includes("UPSTREAM_ACTIONS_ENABLED: \"true\""),
  };
  const blockers = collectBlockers(checks);
  const warnings = collectWarnings(workflowContent);
  const passingCheckCount = Object.values(checks).filter(Boolean).length;
  const requiredCheckCount = Object.keys(checks).length;
  const valid = blockers.length === 0;

  return {
    service: "orderops-node",
    title: "Workflow evidence verification",
    generatedAt: new Date().toISOString(),
    verificationVersion: "workflow-evidence-verification.v1",
    workflowPath,
    workflowLineCount,
    valid,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      requiredCheckCount,
      passingCheckCount,
      failingCheckCount: requiredCheckCount - passingCheckCount,
      blockerCount: blockers.length,
      warningCount: warnings.length,
      workflowLineCount,
    },
    blockers,
    warnings,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };
}

export function renderWorkflowEvidenceVerificationMarkdown(verification: WorkflowEvidenceVerification): string {
  return [
    "# Workflow evidence verification",
    "",
    `- Service: ${verification.service}`,
    `- Generated at: ${verification.generatedAt}`,
    `- Verification version: ${verification.verificationVersion}`,
    `- Workflow path: ${verification.workflowPath}`,
    `- Valid: ${verification.valid}`,
    `- Read only: ${verification.readOnly}`,
    `- Execution allowed: ${verification.executionAllowed}`,
    "",
    "## Checks",
    "",
    ...renderEntries(verification.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(verification.summary),
    "",
    "## Blockers",
    "",
    ...renderMessages(verification.blockers, "No workflow evidence blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(verification.warnings, "No workflow evidence warnings."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(verification.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(verification.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createMissingWorkflowEvidenceVerification(
  workflowPath: string,
  errorMessage: string,
): WorkflowEvidenceVerification {
  const checks = {
    workflowFilePresent: false,
    workflowNamePresent: false,
    permissionsReadOnly: false,
    nodeSetupPresent: false,
    npmCiPresent: false,
    typecheckPresent: false,
    testPresent: false,
    buildPresent: false,
    safeSmokeServerPresent: false,
    healthSmokePresent: false,
    releaseEvidenceReadinessSmokePresent: false,
    probesDisabled: false,
    actionsDisabled: false,
    readinessSmokeKeepsExecutionBlocked: false,
    noSecretsReference: true,
    noKubectl: true,
    noDockerPush: true,
    noScp: true,
    noUpstreamActionsEnabledTrue: true,
  };
  const blockers = collectBlockers(checks);
  const warnings = [{
    code: "WORKFLOW_READ_FAILED",
    severity: "warning" as const,
    message: `Workflow file could not be read: ${errorMessage}`,
  }];
  const passingCheckCount = Object.values(checks).filter(Boolean).length;
  const requiredCheckCount = Object.keys(checks).length;

  return {
    service: "orderops-node",
    title: "Workflow evidence verification",
    generatedAt: new Date().toISOString(),
    verificationVersion: "workflow-evidence-verification.v1",
    workflowPath,
    workflowLineCount: 0,
    valid: false,
    readOnly: true,
    executionAllowed: false,
    checks,
    summary: {
      requiredCheckCount,
      passingCheckCount,
      failingCheckCount: requiredCheckCount - passingCheckCount,
      blockerCount: blockers.length,
      warningCount: warnings.length,
      workflowLineCount: 0,
    },
    blockers,
    warnings,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(false),
  };
}

function collectBlockers(checks: WorkflowEvidenceVerification["checks"]): WorkflowEvidenceMessage[] {
  const blockers: WorkflowEvidenceMessage[] = [];
  addBlocker(blockers, checks.workflowFilePresent, "WORKFLOW_FILE_MISSING", "Node evidence workflow file must exist.");
  addBlocker(blockers, checks.workflowNamePresent, "WORKFLOW_NAME_MISSING", "Workflow must be the Node Evidence workflow.");
  addBlocker(blockers, checks.permissionsReadOnly, "PERMISSIONS_NOT_READ_ONLY", "Workflow permissions must stay contents: read.");
  addBlocker(blockers, checks.nodeSetupPresent, "NODE_SETUP_MISSING", "Workflow must set up Node.js 22.");
  addBlocker(blockers, checks.npmCiPresent, "NPM_CI_MISSING", "Workflow must install dependencies with npm ci.");
  addBlocker(blockers, checks.typecheckPresent, "TYPECHECK_MISSING", "Workflow must run npm run typecheck.");
  addBlocker(blockers, checks.testPresent, "TEST_MISSING", "Workflow must run npm test.");
  addBlocker(blockers, checks.buildPresent, "BUILD_MISSING", "Workflow must run npm run build.");
  addBlocker(blockers, checks.safeSmokeServerPresent, "SAFE_SMOKE_SERVER_MISSING", "Workflow must start the built Node server for safe smoke.");
  addBlocker(blockers, checks.healthSmokePresent, "HEALTH_SMOKE_MISSING", "Workflow must smoke /health.");
  addBlocker(blockers, checks.releaseEvidenceReadinessSmokePresent, "RELEASE_EVIDENCE_SMOKE_MISSING", "Workflow must smoke release evidence readiness.");
  addBlocker(blockers, checks.probesDisabled, "PROBES_NOT_DISABLED", "Workflow must keep UPSTREAM_PROBES_ENABLED=false.");
  addBlocker(blockers, checks.actionsDisabled, "ACTIONS_NOT_DISABLED", "Workflow must keep UPSTREAM_ACTIONS_ENABLED=false.");
  addBlocker(blockers, checks.readinessSmokeKeepsExecutionBlocked, "EXECUTION_BLOCK_ASSERTION_MISSING", "Workflow must assert release evidence executionAllowed=false.");
  addBlocker(blockers, checks.noSecretsReference, "SECRETS_REFERENCE_PRESENT", "Workflow evidence job must not read GitHub secrets.");
  addBlocker(blockers, checks.noKubectl, "KUBECTL_PRESENT", "Workflow evidence job must not run kubectl.");
  addBlocker(blockers, checks.noDockerPush, "DOCKER_PUSH_PRESENT", "Workflow evidence job must not push Docker images.");
  addBlocker(blockers, checks.noScp, "SCP_PRESENT", "Workflow evidence job must not copy files to servers with scp.");
  addBlocker(blockers, checks.noUpstreamActionsEnabledTrue, "UPSTREAM_ACTIONS_TRUE_PRESENT", "Workflow must not enable upstream actions.");
  return blockers;
}

function collectWarnings(workflowContent: string): WorkflowEvidenceMessage[] {
  const warnings: WorkflowEvidenceMessage[] = [];

  if (workflowContent.includes("workflow_dispatch:")) {
    warnings.push({
      code: "MANUAL_DISPATCH_PRESENT",
      severity: "warning",
      message: "Manual dispatch is present; keep workflow permissions read-only and upstream actions disabled.",
    });
  }

  return warnings;
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Archive this verification beside CI evidence before production-demo review.",
      "Keep workflow changes gated by this endpoint and the CI evidence command profile.",
      "Stop if the workflow starts referencing secrets, deployment commands, or upstream actions.",
    ];
  }

  return [
    "Resolve workflow evidence blockers before relying on CI output.",
    "Do not treat the workflow as production evidence while verification is invalid.",
  ];
}

function addBlocker(
  blockers: WorkflowEvidenceMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    blockers.push({ code, severity: "blocker", message });
  }
}

function countLines(content: string): number {
  if (content.length === 0) {
    return 0;
  }

  return content.split(/\r?\n/).length;
}

function renderMessages(messages: WorkflowEvidenceMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
}

function renderEntries(record: Record<string, unknown>): string[] {
  return Object.entries(record).map(([key, value]) => `- ${key}: ${formatValue(value)}`);
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
