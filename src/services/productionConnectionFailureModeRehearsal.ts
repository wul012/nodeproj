import type { AppConfig } from "../config.js";
import { createProductionConnectionConfigContractProfile } from "./productionConnectionConfigContract.js";

export interface ProductionConnectionFailureModeRehearsalProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "production-connection-failure-mode-rehearsal.v1";
  readyForProductionConnections: false;
  readOnly: true;
  executionAllowed: false;
  targetContext: {
    configContractVersion: "production-connection-config-contract.v1";
    auditCurrentTargetKind: string;
    auditProductionTargetKind: string;
    idpCurrentTargetKind: string;
    idpProductionTargetKind: string;
    actualMissingEnv: string[];
    upstreamActionsEnabled: boolean;
  };
  scenarios: ProductionConnectionFailureScenario[];
  checks: {
    configContractReady: boolean;
    auditConnectionMissingCovered: boolean;
    idpJwksTimeoutSimulated: boolean;
    credentialsMissingCovered: boolean;
    safeFallbackCovered: boolean;
    noDatabaseConnectionAttempted: boolean;
    noAuditWritePerformed: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    realManagedAdapterConnected: boolean;
    realIdpVerifierConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    scenarioCount: number;
    passedScenarioCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ProductionConnectionFailureMessage[];
  warnings: ProductionConnectionFailureMessage[];
  recommendations: ProductionConnectionFailureMessage[];
  evidenceEndpoints: {
    productionConnectionFailureModeRehearsalJson: string;
    productionConnectionFailureModeRehearsalMarkdown: string;
    productionConnectionConfigContractJson: string;
    productionReadinessSummaryV9Json: string;
    managedAuditAdapterRunnerJson: string;
    jwksCacheContractJson: string;
  };
  nextActions: string[];
}

export interface ProductionConnectionFailureScenario {
  id:
    | "audit-connection-missing"
    | "idp-jwks-timeout-simulated"
    | "credentials-missing"
    | "safe-fallback";
  simulatedFailure: string;
  expectedOutcome: "blocked";
  actualOutcome: "blocked";
  passed: boolean;
  safeFallback: "keep-production-connections-disabled" | "keep-upstream-actions-disabled";
  databaseConnectionAttempted: false;
  auditWritePerformed: false;
  jwksNetworkFetchAttempted: false;
  externalIdpCallAttempted: false;
  evidence: {
    source: "config-contract" | "simulated-timeout" | "simulated-credentials" | "runtime-safety";
    missingEnv: string[];
    statusCode: 503 | 504 | 500 | 403;
    operatorMessage: string;
  };
}

export interface ProductionConnectionFailureMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source: "audit-failure" | "idp-failure" | "credentials-failure" | "safe-fallback" | "failure-mode-rehearsal";
  message: string;
}

const ENDPOINTS = Object.freeze({
  productionConnectionFailureModeRehearsalJson: "/api/v1/production/connection-failure-mode-rehearsal",
  productionConnectionFailureModeRehearsalMarkdown: "/api/v1/production/connection-failure-mode-rehearsal?format=markdown",
  productionConnectionConfigContractJson: "/api/v1/production/connection-config-contract",
  productionReadinessSummaryV9Json: "/api/v1/production/readiness-summary-v9",
  managedAuditAdapterRunnerJson: "/api/v1/audit/managed-adapter-runner",
  jwksCacheContractJson: "/api/v1/security/jwks-cache-contract",
});

export function createProductionConnectionFailureModeRehearsalProfile(
  config: Pick<AppConfig,
    | "auditStoreKind"
    | "auditStorePath"
    | "auditStoreUrl"
    | "auditRetentionDays"
    | "auditMaxFileBytes"
    | "auditRotationEnabled"
    | "auditBackupEnabled"
    | "idpIssuer"
    | "idpAudience"
    | "idpJwksUrl"
    | "idpClockSkewSeconds"
    | "upstreamActionsEnabled"
  >,
): ProductionConnectionFailureModeRehearsalProfile {
  const configContract = createProductionConnectionConfigContractProfile(config);
  const actualMissingEnv = [
    ...configContract.targets.audit.missingEnv,
    ...configContract.targets.idp.missingEnv,
  ];
  const scenarios = createScenarios(actualMissingEnv);
  const checks = {
    configContractReady: configContract.checks.auditRequiredEnvConfigured && configContract.checks.idpRequiredEnvConfigured,
    auditConnectionMissingCovered: scenarioPassed(scenarios, "audit-connection-missing"),
    idpJwksTimeoutSimulated: scenarioPassed(scenarios, "idp-jwks-timeout-simulated"),
    credentialsMissingCovered: scenarioPassed(scenarios, "credentials-missing"),
    safeFallbackCovered: scenarioPassed(scenarios, "safe-fallback"),
    noDatabaseConnectionAttempted: scenarios.every((scenario) => scenario.databaseConnectionAttempted === false),
    noAuditWritePerformed: scenarios.every((scenario) => scenario.auditWritePerformed === false),
    noJwksNetworkFetch: scenarios.every((scenario) => scenario.jwksNetworkFetchAttempted === false),
    noExternalIdpCall: scenarios.every((scenario) => scenario.externalIdpCallAttempted === false),
    realManagedAdapterConnected: false,
    realIdpVerifierConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(checks);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Production connection failure-mode rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "production-connection-failure-mode-rehearsal.v1",
    readyForProductionConnections: false,
    readOnly: true,
    executionAllowed: false,
    targetContext: {
      configContractVersion: configContract.profileVersion,
      auditCurrentTargetKind: configContract.targets.audit.currentTargetKind,
      auditProductionTargetKind: configContract.targets.audit.productionTargetKind,
      idpCurrentTargetKind: configContract.targets.idp.currentTargetKind,
      idpProductionTargetKind: configContract.targets.idp.productionTargetKind,
      actualMissingEnv,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    scenarios,
    checks,
    summary: {
      scenarioCount: scenarios.length,
      passedScenarioCount: scenarios.filter((scenario) => scenario.passed).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep simulated failure-mode evidence separate from real production connection attempts.",
      "Add real connection timeout handling only after credentials and network policies are explicitly available.",
      "Keep upstream execution disabled until failure modes and real connections both pass readiness checks.",
    ],
  };
}

export function renderProductionConnectionFailureModeRehearsalMarkdown(
  profile: ProductionConnectionFailureModeRehearsalProfile,
): string {
  return [
    "# Production connection failure-mode rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production connections: ${profile.readyForProductionConnections}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Target Context",
    "",
    ...renderEntries(profile.targetContext),
    "",
    "## Scenarios",
    "",
    ...profile.scenarios.flatMap(renderScenario),
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No production connection failure blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No production connection failure warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No production connection failure recommendations."),
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

function createScenarios(actualMissingEnv: string[]): ProductionConnectionFailureScenario[] {
  const simulatedMissingEnv = actualMissingEnv.length > 0
    ? actualMissingEnv
    : ["AUDIT_STORE_URL", "ORDEROPS_IDP_JWKS_URL"];

  return [
    {
      id: "audit-connection-missing",
      simulatedFailure: "managed audit adapter target is not connected",
      expectedOutcome: "blocked",
      actualOutcome: "blocked",
      passed: true,
      safeFallback: "keep-production-connections-disabled",
      databaseConnectionAttempted: false,
      auditWritePerformed: false,
      jwksNetworkFetchAttempted: false,
      externalIdpCallAttempted: false,
      evidence: {
        source: "config-contract",
        missingEnv: actualMissingEnv.filter((key) => key.startsWith("AUDIT_")),
        statusCode: 503,
        operatorMessage: "Production audit connection is unavailable; keep managed audit target disabled.",
      },
    },
    {
      id: "idp-jwks-timeout-simulated",
      simulatedFailure: "JWKS fetch timeout is simulated without network access",
      expectedOutcome: "blocked",
      actualOutcome: "blocked",
      passed: true,
      safeFallback: "keep-production-connections-disabled",
      databaseConnectionAttempted: false,
      auditWritePerformed: false,
      jwksNetworkFetchAttempted: false,
      externalIdpCallAttempted: false,
      evidence: {
        source: "simulated-timeout",
        missingEnv: [],
        statusCode: 504,
        operatorMessage: "JWKS timeout simulation blocks production IdP connection and preserves local evidence only.",
      },
    },
    {
      id: "credentials-missing",
      simulatedFailure: "required production connection credentials are missing",
      expectedOutcome: "blocked",
      actualOutcome: "blocked",
      passed: true,
      safeFallback: "keep-production-connections-disabled",
      databaseConnectionAttempted: false,
      auditWritePerformed: false,
      jwksNetworkFetchAttempted: false,
      externalIdpCallAttempted: false,
      evidence: {
        source: "simulated-credentials",
        missingEnv: simulatedMissingEnv,
        statusCode: 500,
        operatorMessage: "Missing credentials keep real audit and IdP connections disabled.",
      },
    },
    {
      id: "safe-fallback",
      simulatedFailure: "production connection readiness is incomplete",
      expectedOutcome: "blocked",
      actualOutcome: "blocked",
      passed: true,
      safeFallback: "keep-upstream-actions-disabled",
      databaseConnectionAttempted: false,
      auditWritePerformed: false,
      jwksNetworkFetchAttempted: false,
      externalIdpCallAttempted: false,
      evidence: {
        source: "runtime-safety",
        missingEnv: actualMissingEnv,
        statusCode: 403,
        operatorMessage: "Fallback keeps UPSTREAM_ACTIONS_ENABLED=false until production connections are real.",
      },
    },
  ];
}

function scenarioPassed(
  scenarios: ProductionConnectionFailureScenario[],
  id: ProductionConnectionFailureScenario["id"],
): boolean {
  const scenario = scenarios.find((item) => item.id === id);
  return scenario?.passed === true
    && scenario.actualOutcome === "blocked"
    && scenario.databaseConnectionAttempted === false
    && scenario.auditWritePerformed === false
    && scenario.jwksNetworkFetchAttempted === false
    && scenario.externalIdpCallAttempted === false;
}

function collectProductionBlockers(
  checks: ProductionConnectionFailureModeRehearsalProfile["checks"],
): ProductionConnectionFailureMessage[] {
  const blockers: ProductionConnectionFailureMessage[] = [];
  addMessage(blockers, checks.configContractReady, "CONFIG_CONTRACT_INCOMPLETE", "failure-mode-rehearsal", "Production connection config contract must be complete before real failure-mode drills.");
  addMessage(blockers, checks.auditConnectionMissingCovered, "AUDIT_CONNECTION_MISSING_NOT_COVERED", "audit-failure", "Audit connection missing scenario must block safely.");
  addMessage(blockers, checks.idpJwksTimeoutSimulated, "IDP_JWKS_TIMEOUT_NOT_COVERED", "idp-failure", "IdP JWKS timeout simulation must block safely.");
  addMessage(blockers, checks.credentialsMissingCovered, "CREDENTIALS_MISSING_NOT_COVERED", "credentials-failure", "Credentials missing scenario must block safely.");
  addMessage(blockers, checks.safeFallbackCovered, "SAFE_FALLBACK_NOT_COVERED", "safe-fallback", "Safe fallback must keep production connections and upstream actions disabled.");
  addMessage(blockers, checks.realManagedAdapterConnected, "REAL_MANAGED_AUDIT_ADAPTER_MISSING", "audit-failure", "A real managed audit adapter is still required before production connections.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "idp-failure", "A real JWKS/OIDC verifier is still required before production connections.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "safe-fallback", "UPSTREAM_ACTIONS_ENABLED must remain false while production connections are missing.");
  return blockers;
}

function collectWarnings(
  checks: ProductionConnectionFailureModeRehearsalProfile["checks"],
): ProductionConnectionFailureMessage[] {
  return [
    {
      code: checks.configContractReady
        ? "FAILURE_MODES_REHEARSED_CONNECTIONS_MISSING"
        : "FAILURE_MODES_REHEARSED_CONFIG_INCOMPLETE",
      severity: "warning",
      source: "failure-mode-rehearsal",
      message: "Failure modes are simulated locally; no production database or IdP network call is attempted.",
    },
  ];
}

function collectRecommendations(): ProductionConnectionFailureMessage[] {
  return [
    {
      code: "ADD_REAL_TIMEOUT_POLICIES",
      severity: "recommendation",
      source: "idp-failure",
      message: "Add real JWKS timeout and retry policies after production IdP access is explicitly available.",
    },
    {
      code: "ADD_MANAGED_AUDIT_HEALTHCHECK",
      severity: "recommendation",
      source: "audit-failure",
      message: "Add a real managed audit adapter healthcheck only after credentials and migration rules are explicit.",
    },
  ];
}

function addMessage(
  messages: ProductionConnectionFailureMessage[],
  condition: boolean,
  code: string,
  source: ProductionConnectionFailureMessage["source"],
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", source, message });
  }
}

function renderScenario(scenario: ProductionConnectionFailureScenario): string[] {
  return [
    `### ${scenario.id}`,
    "",
    `- Simulated failure: ${scenario.simulatedFailure}`,
    `- Expected outcome: ${scenario.expectedOutcome}`,
    `- Actual outcome: ${scenario.actualOutcome}`,
    `- Passed: ${scenario.passed}`,
    `- Safe fallback: ${scenario.safeFallback}`,
    `- Database connection attempted: ${scenario.databaseConnectionAttempted}`,
    `- Audit write performed: ${scenario.auditWritePerformed}`,
    `- JWKS network fetch attempted: ${scenario.jwksNetworkFetchAttempted}`,
    `- External IdP call attempted: ${scenario.externalIdpCallAttempted}`,
    `- Evidence: ${formatValue(scenario.evidence)}`,
    "",
  ];
}

function renderMessages(messages: ProductionConnectionFailureMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}, ${message.source}): ${message.message}`);
}

function renderEntries(record: object): string[] {
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
