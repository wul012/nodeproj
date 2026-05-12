import path from "node:path";

import type { AppConfig } from "../config.js";

export interface DeploymentSafetyProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "deployment-safety-profile.v1";
  suitableForProductionDemo: boolean;
  readOnly: true;
  executionAllowed: false;
  configSnapshot: {
    host: string;
    port: number;
    logLevel: string;
    orderPlatformUrl: string;
    orderPlatformTimeoutMs: number;
    miniKv: string;
    miniKvTimeoutMs: number;
    opsSampleIntervalMs: number;
    upstreamProbesEnabled: boolean;
    upstreamActionsEnabled: boolean;
    mutationRateLimitWindowMs: number;
    mutationRateLimitMax: number;
    fixtures: {
      javaExecutionContractFixturePath: string;
      javaExecutionContractBlockedFixturePath: string;
      miniKvCheckJsonFixturePath: string;
      miniKvCheckJsonReadFixturePath: string;
    };
  };
  checks: {
    upstreamActionsDisabled: boolean;
    portValid: boolean;
    logLevelKnown: boolean;
    orderPlatformUrlConfigured: boolean;
    miniKvEndpointConfigured: boolean;
    upstreamTimeoutsPositive: boolean;
    opsSampleIntervalPositive: boolean;
    mutationRateLimitConfigured: boolean;
    fixturePathsConfigured: boolean;
    fixturePathsAbsolute: boolean;
  };
  summary: {
    blockerCount: number;
    warningCount: number;
    recommendationCount: number;
    probesEnabled: boolean;
    actionsEnabled: boolean;
    loopbackHost: boolean;
    localhostUpstreams: number;
  };
  blockers: DeploymentSafetyMessage[];
  warnings: DeploymentSafetyMessage[];
  recommendations: DeploymentSafetyMessage[];
  evidenceEndpoints: {
    deploymentSafetyProfileJson: string;
    deploymentSafetyProfileMarkdown: string;
    ciEvidenceCommandProfileJson: string;
    releaseEvidenceReadinessGateJson: string;
  };
  nextActions: string[];
}

export interface DeploymentSafetyMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  deploymentSafetyProfileJson: "/api/v1/deployment/safety-profile",
  deploymentSafetyProfileMarkdown: "/api/v1/deployment/safety-profile?format=markdown",
  ciEvidenceCommandProfileJson: "/api/v1/ci/evidence-command-profile",
  releaseEvidenceReadinessGateJson: "/api/v1/upstream-contract-fixtures/scenario-matrix/release-evidence-readiness-gate",
});

const KNOWN_LOG_LEVELS = new Set(["fatal", "error", "warn", "info", "debug", "trace", "silent"]);

export function createDeploymentSafetyProfile(config: AppConfig): DeploymentSafetyProfile {
  const checks = {
    upstreamActionsDisabled: config.upstreamActionsEnabled === false,
    portValid: Number.isInteger(config.port) && config.port > 0 && config.port <= 65535,
    logLevelKnown: KNOWN_LOG_LEVELS.has(config.logLevel),
    orderPlatformUrlConfigured: isHttpUrl(config.orderPlatformUrl),
    miniKvEndpointConfigured: config.miniKvHost.length > 0 && Number.isInteger(config.miniKvPort) && config.miniKvPort > 0,
    upstreamTimeoutsPositive: config.orderPlatformTimeoutMs > 0 && config.miniKvTimeoutMs > 0,
    opsSampleIntervalPositive: config.opsSampleIntervalMs > 0,
    mutationRateLimitConfigured: config.mutationRateLimitWindowMs > 0 && config.mutationRateLimitMax > 0,
    fixturePathsConfigured: fixturePaths(config).every((fixturePath) => fixturePath.length > 0),
    fixturePathsAbsolute: fixturePaths(config).every((fixturePath) => path.isAbsolute(fixturePath)),
  };
  const blockers = collectBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations(config);
  const suitableForProductionDemo = blockers.length === 0;

  return {
    service: "orderops-node",
    title: "Deployment safety profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "deployment-safety-profile.v1",
    suitableForProductionDemo,
    readOnly: true,
    executionAllowed: false,
    configSnapshot: {
      host: config.host,
      port: config.port,
      logLevel: config.logLevel,
      orderPlatformUrl: config.orderPlatformUrl,
      orderPlatformTimeoutMs: config.orderPlatformTimeoutMs,
      miniKv: `${config.miniKvHost}:${config.miniKvPort}`,
      miniKvTimeoutMs: config.miniKvTimeoutMs,
      opsSampleIntervalMs: config.opsSampleIntervalMs,
      upstreamProbesEnabled: config.upstreamProbesEnabled,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
      mutationRateLimitWindowMs: config.mutationRateLimitWindowMs,
      mutationRateLimitMax: config.mutationRateLimitMax,
      fixtures: {
        javaExecutionContractFixturePath: config.javaExecutionContractFixturePath,
        javaExecutionContractBlockedFixturePath: config.javaExecutionContractBlockedFixturePath,
        miniKvCheckJsonFixturePath: config.miniKvCheckJsonFixturePath,
        miniKvCheckJsonReadFixturePath: config.miniKvCheckJsonReadFixturePath,
      },
    },
    checks,
    summary: {
      blockerCount: blockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      probesEnabled: config.upstreamProbesEnabled,
      actionsEnabled: config.upstreamActionsEnabled,
      loopbackHost: isLoopbackHost(config.host),
      localhostUpstreams: [config.orderPlatformUrl, config.miniKvHost].filter(isLocalUpstream).length,
    },
    blockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(suitableForProductionDemo),
  };
}

export function renderDeploymentSafetyProfileMarkdown(profile: DeploymentSafetyProfile): string {
  return [
    "# Deployment safety profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Suitable for production demo: ${profile.suitableForProductionDemo}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Config Snapshot",
    "",
    ...renderEntries(profile.configSnapshot),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Blockers",
    "",
    ...renderMessages(profile.blockers, "No deployment safety blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No deployment safety warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No deployment safety recommendations."),
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

function collectBlockers(checks: DeploymentSafetyProfile["checks"]): DeploymentSafetyMessage[] {
  const blockers: DeploymentSafetyMessage[] = [];
  addMessage(blockers, checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false for production-demo readiness.", "blocker");
  addMessage(blockers, checks.portValid, "INVALID_PORT", "Configured port must be in the 1-65535 range.", "blocker");
  addMessage(blockers, checks.logLevelKnown, "UNKNOWN_LOG_LEVEL", "Log level must be a known pino-compatible level.", "blocker");
  addMessage(blockers, checks.orderPlatformUrlConfigured, "ORDER_PLATFORM_URL_INVALID", "Order platform URL must be an HTTP(S) URL.", "blocker");
  addMessage(blockers, checks.miniKvEndpointConfigured, "MINIKV_ENDPOINT_INVALID", "mini-kv host and port must be configured.", "blocker");
  addMessage(blockers, checks.upstreamTimeoutsPositive, "UPSTREAM_TIMEOUT_INVALID", "Upstream timeouts must be positive.", "blocker");
  addMessage(blockers, checks.opsSampleIntervalPositive, "OPS_SAMPLE_INTERVAL_INVALID", "Ops sample interval must be positive.", "blocker");
  addMessage(blockers, checks.mutationRateLimitConfigured, "MUTATION_RATE_LIMIT_INVALID", "Mutation rate limit window and max must be positive.", "blocker");
  addMessage(blockers, checks.fixturePathsConfigured, "FIXTURE_PATH_MISSING", "All fixture paths must be configured.", "blocker");
  addMessage(blockers, checks.fixturePathsAbsolute, "FIXTURE_PATH_NOT_ABSOLUTE", "All fixture paths must be absolute for reproducible deployment diagnostics.", "blocker");
  return blockers;
}

function collectWarnings(config: AppConfig): DeploymentSafetyMessage[] {
  const warnings: DeploymentSafetyMessage[] = [];

  if (isLoopbackHost(config.host)) {
    warnings.push({
      code: "HOST_LOOPBACK",
      severity: "warning",
      message: "Node is bound to loopback; this is safe for smoke but not externally reachable as a demo service.",
    });
  }

  if (!config.upstreamProbesEnabled) {
    warnings.push({
      code: "UPSTREAM_PROBES_DISABLED",
      severity: "warning",
      message: "Upstream probes are disabled; production-demo observability will be limited until a coordinated integration window enables probes.",
    });
  }

  if (isLocalUpstream(config.orderPlatformUrl)) {
    warnings.push({
      code: "ORDER_PLATFORM_LOCALHOST",
      severity: "warning",
      message: "Order platform points at a localhost URL; replace with an environment-specific URL for deployment.",
    });
  }

  if (isLocalUpstream(config.miniKvHost)) {
    warnings.push({
      code: "MINIKV_LOCALHOST",
      severity: "warning",
      message: "mini-kv points at a localhost endpoint; replace with an environment-specific endpoint for deployment.",
    });
  }

  if (config.logLevel === "silent") {
    warnings.push({
      code: "LOGGING_SILENT",
      severity: "warning",
      message: "Silent logging is useful for tests but not suitable for an observable production-demo runtime.",
    });
  }

  return warnings;
}

function collectRecommendations(config: AppConfig): DeploymentSafetyMessage[] {
  const recommendations: DeploymentSafetyMessage[] = [
    {
      code: "VERIFY_NODE_EVIDENCE_WORKFLOW",
      severity: "recommendation",
      message: "Verify the checked-in Node evidence workflow before calling this production-like.",
    },
    {
      code: "PERSIST_AUDIT_LOGS",
      severity: "recommendation",
      message: "Move audit and readiness evidence from in-memory/runtime output to durable storage before real operations.",
    },
    {
      code: "DEFINE_ROLLBACK_RUNBOOK",
      severity: "recommendation",
      message: "Add a rollback runbook and verify it beside deployment evidence.",
    },
  ];

  if (!config.upstreamProbesEnabled) {
    recommendations.push({
      code: "PLAN_PROBE_WINDOW",
      severity: "recommendation",
      message: "Plan a read-only probe window with Java and mini-kv owners to validate live upstream observability.",
    });
  }

  return recommendations;
}

function collectNextActions(suitable: boolean): string[] {
  if (suitable) {
    return [
      "Archive this deployment safety profile beside release evidence before a demo deployment.",
      "Address warnings before exposing the service beyond loopback.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false until an audited execution workflow exists.",
    ];
  }

  return [
    "Resolve deployment safety blockers before any production-demo deployment.",
    "Do not expose this runtime or enable upstream actions while blockers remain.",
  ];
}

function fixturePaths(config: AppConfig): string[] {
  return [
    config.javaExecutionContractFixturePath,
    config.javaExecutionContractBlockedFixturePath,
    config.miniKvCheckJsonFixturePath,
    config.miniKvCheckJsonReadFixturePath,
  ];
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\/[^/]+/i.test(value);
}

function isLoopbackHost(value: string): boolean {
  return value === "127.0.0.1" || value === "localhost" || value === "::1";
}

function isLocalUpstream(value: string): boolean {
  return value.includes("localhost") || value.includes("127.0.0.1") || value === "::1";
}

function addMessage(
  messages: DeploymentSafetyMessage[],
  condition: boolean,
  code: string,
  message: string,
  severity: "blocker" | "warning" | "recommendation",
): void {
  if (!condition) {
    messages.push({ code, severity, message });
  }
}

function renderMessages(messages: DeploymentSafetyMessage[], emptyText: string): string[] {
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
