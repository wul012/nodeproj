import type { AppConfig } from "../config.js";

export interface CiEvidenceCommandProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "ci-evidence-command-profile.v1";
  valid: boolean;
  readOnly: true;
  executionAllowed: false;
  safety: {
    upstreamProbesEnabled: false;
    upstreamActionsEnabled: false;
    requiresManualAuthorizationForUpstreamProbes: true;
    requiresManualAuthorizationForUpstreamActions: true;
  };
  safeEnvironment: Record<string, string>;
  commands: CiEvidenceCommand[];
  checks: {
    safeEnvironmentDisablesProbes: boolean;
    safeEnvironmentDisablesActions: boolean;
    typecheckCommandPresent: boolean;
    testCommandPresent: boolean;
    buildCommandPresent: boolean;
    readinessGateSmokePresent: boolean;
    noManualAuthorizationCommandRunsByDefault: boolean;
    allCiRunnableCommandsAreReadOnly: boolean;
  };
  summary: {
    commandCount: number;
    ciRunnableCommandCount: number;
    manualAuthorizationCommandCount: number;
    smokeCommandCount: number;
    blockerCount: number;
    warningCount: number;
  };
  blockers: CiEvidenceCommandProfileMessage[];
  warnings: CiEvidenceCommandProfileMessage[];
  evidenceEndpoints: {
    releaseEvidenceReadinessGateJson: string;
    releaseEvidenceReadinessGateMarkdown: string;
    ciEvidenceCommandProfileJson: string;
    ciEvidenceCommandProfileMarkdown: string;
  };
  nextActions: string[];
}

export interface CiEvidenceCommand {
  id: string;
  phase: "verify" | "build" | "smoke" | "manual-authorization";
  description: string;
  command: string;
  ciRunnable: boolean;
  readOnly: boolean;
  requiresManualAuthorization: boolean;
  expectedResult: string;
}

export interface CiEvidenceCommandProfileMessage {
  code: string;
  severity: "blocker" | "warning";
  message: string;
}

const ENDPOINTS = Object.freeze({
  releaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
  releaseEvidenceReadinessGateMarkdown: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate?format=markdown",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  ciEvidenceCommandProfileMarkdown: "/api/v1/ci/evidence-command-profile?format=markdown",
});

export function createCiEvidenceCommandProfile(
  config: Pick<AppConfig, "upstreamProbesEnabled" | "upstreamActionsEnabled" | "host" | "port" | "logLevel">,
): CiEvidenceCommandProfile {
  const safeEnvironment = {
    HOST: "127.0.0.1",
    PORT: "4190",
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
  };
  const commands = createCommands(safeEnvironment);
  const checks = {
    safeEnvironmentDisablesProbes: safeEnvironment.UPSTREAM_PROBES_ENABLED === "false",
    safeEnvironmentDisablesActions: safeEnvironment.UPSTREAM_ACTIONS_ENABLED === "false",
    typecheckCommandPresent: commands.some((command) => command.id === "typecheck"),
    testCommandPresent: commands.some((command) => command.id === "test"),
    buildCommandPresent: commands.some((command) => command.id === "build"),
    readinessGateSmokePresent: commands.some((command) => command.id === "smoke-release-evidence-readiness-gate"),
    noManualAuthorizationCommandRunsByDefault: commands
      .filter((command) => command.requiresManualAuthorization)
      .every((command) => !command.ciRunnable),
    allCiRunnableCommandsAreReadOnly: commands
      .filter((command) => command.ciRunnable)
      .every((command) => command.readOnly && !command.requiresManualAuthorization),
  };
  const blockers = collectBlockers(checks);
  const warnings = collectWarnings(config);
  const valid = blockers.length === 0;

  return {
    service: "orderops-node",
    title: "CI evidence command profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "ci-evidence-command-profile.v1",
    valid,
    readOnly: true,
    executionAllowed: false,
    safety: {
      upstreamProbesEnabled: false,
      upstreamActionsEnabled: false,
      requiresManualAuthorizationForUpstreamProbes: true,
      requiresManualAuthorizationForUpstreamActions: true,
    },
    safeEnvironment,
    commands,
    checks,
    summary: {
      commandCount: commands.length,
      ciRunnableCommandCount: commands.filter((command) => command.ciRunnable).length,
      manualAuthorizationCommandCount: commands.filter((command) => command.requiresManualAuthorization).length,
      smokeCommandCount: commands.filter((command) => command.phase === "smoke").length,
      blockerCount: blockers.length,
      warningCount: warnings.length,
    },
    blockers,
    warnings,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(valid),
  };
}

export function renderCiEvidenceCommandProfileMarkdown(profile: CiEvidenceCommandProfile): string {
  return [
    "# CI evidence command profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Valid: ${profile.valid}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Safe Environment",
    "",
    ...renderEntries(profile.safeEnvironment),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Commands",
    "",
    ...profile.commands.flatMap(renderCommand),
    "## Blockers",
    "",
    ...renderMessages(profile.blockers, "No CI evidence profile blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No CI evidence profile warnings."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
  ].join("\n");
}

function createCommands(env: Record<string, string>): CiEvidenceCommand[] {
  const smokeBase = `http://${env.HOST}:${env.PORT}`;

  return [
    {
      id: "typecheck",
      phase: "verify",
      description: "Compile-check TypeScript without emitting files.",
      command: "npm run typecheck",
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "tsc exits with code 0.",
    },
    {
      id: "test",
      phase: "verify",
      description: "Run the Node test suite.",
      command: "npm test",
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "Vitest exits with code 0.",
    },
    {
      id: "build",
      phase: "build",
      description: "Build distributable JavaScript before HTTP smoke.",
      command: "npm run build",
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "tsc emits dist/ successfully.",
    },
    {
      id: "start-safe-smoke-server",
      phase: "smoke",
      description: "Start Node with probes and upstream actions disabled.",
      command: `$env:HOST='${env.HOST}'; $env:PORT='${env.PORT}'; $env:LOG_LEVEL='${env.LOG_LEVEL}'; $env:UPSTREAM_PROBES_ENABLED='${env.UPSTREAM_PROBES_ENABLED}'; $env:UPSTREAM_ACTIONS_ENABLED='${env.UPSTREAM_ACTIONS_ENABLED}'; node dist/server.js`,
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "Node listens on the configured loopback port.",
    },
    {
      id: "smoke-health",
      phase: "smoke",
      description: "Check the Node health endpoint.",
      command: `Invoke-RestMethod '${smokeBase}/health'`,
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "Response status is ok.",
    },
    {
      id: "smoke-release-evidence-readiness-gate",
      phase: "smoke",
      description: "Check that the release evidence readiness gate is archive-ready and execution remains blocked.",
      command: `Invoke-RestMethod '${smokeBase}${ENDPOINTS.releaseEvidenceReadinessGateJson}'`,
      ciRunnable: true,
      readOnly: true,
      requiresManualAuthorization: false,
      expectedResult: "readyForReleaseEvidenceArchive=true and executionAllowed=false.",
    },
    {
      id: "manual-upstream-probes",
      phase: "manual-authorization",
      description: "Coordinate an integration window before enabling upstream probes.",
      command: "Set UPSTREAM_PROBES_ENABLED=true only after Java and mini-kv owners approve the window.",
      ciRunnable: false,
      readOnly: true,
      requiresManualAuthorization: true,
      expectedResult: "Manual approval is recorded before probes are enabled.",
    },
    {
      id: "manual-upstream-actions",
      phase: "manual-authorization",
      description: "Keep upstream actions disabled unless a separate audited execution workflow is approved.",
      command: "Do not set UPSTREAM_ACTIONS_ENABLED=true in CI evidence jobs.",
      ciRunnable: false,
      readOnly: false,
      requiresManualAuthorization: true,
      expectedResult: "No CI evidence job enables real upstream actions.",
    },
  ];
}

function collectBlockers(checks: CiEvidenceCommandProfile["checks"]): CiEvidenceCommandProfileMessage[] {
  const blockers: CiEvidenceCommandProfileMessage[] = [];
  addBlocker(blockers, checks.safeEnvironmentDisablesProbes, "SAFE_ENV_PROBES_ENABLED", "CI evidence profile must disable upstream probes by default.");
  addBlocker(blockers, checks.safeEnvironmentDisablesActions, "SAFE_ENV_ACTIONS_ENABLED", "CI evidence profile must disable upstream actions by default.");
  addBlocker(blockers, checks.typecheckCommandPresent, "TYPECHECK_COMMAND_MISSING", "CI evidence profile must include typecheck.");
  addBlocker(blockers, checks.testCommandPresent, "TEST_COMMAND_MISSING", "CI evidence profile must include tests.");
  addBlocker(blockers, checks.buildCommandPresent, "BUILD_COMMAND_MISSING", "CI evidence profile must include build.");
  addBlocker(blockers, checks.readinessGateSmokePresent, "READINESS_GATE_SMOKE_MISSING", "CI evidence profile must include release evidence readiness gate smoke.");
  addBlocker(blockers, checks.noManualAuthorizationCommandRunsByDefault, "MANUAL_COMMAND_RUNS_BY_DEFAULT", "Manual-authorization commands must not be CI-runnable.");
  addBlocker(blockers, checks.allCiRunnableCommandsAreReadOnly, "CI_COMMAND_NOT_READ_ONLY", "CI-runnable commands must remain read-only.");
  return blockers;
}

function collectWarnings(config: Pick<AppConfig, "upstreamProbesEnabled" | "upstreamActionsEnabled" | "host" | "port" | "logLevel">): CiEvidenceCommandProfileMessage[] {
  const warnings: CiEvidenceCommandProfileMessage[] = [
    {
      code: "WORKFLOW_NOT_CREATED",
      severity: "warning",
      message: "This profile describes CI commands but does not create a GitHub Actions workflow yet.",
    },
  ];

  if (config.upstreamProbesEnabled) {
    warnings.push({
      code: "CURRENT_RUNTIME_PROBES_ENABLED",
      severity: "warning",
      message: "The current runtime config has upstream probes enabled; CI evidence profile still recommends probes disabled.",
    });
  }

  if (config.upstreamActionsEnabled) {
    warnings.push({
      code: "CURRENT_RUNTIME_ACTIONS_ENABLED",
      severity: "warning",
      message: "The current runtime config has upstream actions enabled; CI evidence profile still recommends actions disabled.",
    });
  }

  return warnings;
}

function collectNextActions(valid: boolean): string[] {
  if (valid) {
    return [
      "Use this profile as the command source for the next CI workflow proposal.",
      "Keep safe smoke jobs on loopback with upstream probes and actions disabled.",
      "Require manual approval before any job enables upstream probes or actions.",
    ];
  }

  return [
    "Resolve CI evidence command profile blockers before creating workflow automation.",
    "Do not create CI jobs from an invalid command profile.",
  ];
}

function addBlocker(
  blockers: CiEvidenceCommandProfileMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    blockers.push({ code, severity: "blocker", message });
  }
}

function renderCommand(command: CiEvidenceCommand): string[] {
  return [
    `### ${command.id}`,
    "",
    `- Phase: ${command.phase}`,
    `- Description: ${command.description}`,
    `- Command: ${command.command}`,
    `- CI runnable: ${command.ciRunnable}`,
    `- Read only: ${command.readOnly}`,
    `- Requires manual authorization: ${command.requiresManualAuthorization}`,
    `- Expected result: ${command.expectedResult}`,
    "",
  ];
}

function renderMessages(messages: CiEvidenceCommandProfileMessage[], emptyText: string): string[] {
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
