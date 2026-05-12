import type { AppConfig } from "../config.js";
import { evaluateAccessGuard, type AccessGuardEvaluation } from "./accessGuard.js";

export interface AuthEnforcementRehearsalProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "auth-enforcement-rehearsal.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  runtime: {
    authMode: "disabled" | "rehearsal";
    accessGuardEnforcementEnabled: boolean;
    rejectsRequests: boolean;
    credentialAuthImplemented: false;
    readsSecrets: false;
    upstreamActionsEnabled: boolean;
  };
  samples: AuthEnforcementSample[];
  checks: {
    authModeConfigured: boolean;
    defaultSafeWhenDisabled: boolean;
    missingIdentityCanReturn401: boolean;
    insufficientRoleCanReturn403: boolean;
    allowedRoleCanPass: boolean;
    operatorIdentityStillHeaderDerived: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    sampleCount: number;
    enforcedSampleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AuthEnforcementMessage[];
  warnings: AuthEnforcementMessage[];
  recommendations: AuthEnforcementMessage[];
  evidenceEndpoints: {
    authEnforcementRehearsalJson: string;
    authEnforcementRehearsalMarkdown: string;
    accessGuardReadinessJson: string;
    operatorIdentityContractJson: string;
    productionReadinessSummaryV4Json: string;
  };
  nextActions: string[];
}

export interface AuthEnforcementSample {
  id: string;
  purpose: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  evaluation: Pick<AccessGuardEvaluation, "policyMatched" | "routeGroup" | "requiredRole" | "matchedRoles" | "wouldDeny" | "reason">;
  enforcement: {
    enabled: boolean;
    wouldReject: boolean;
    statusCode: 200 | 401 | 403;
    error?: "ACCESS_GUARD_UNAUTHENTICATED" | "ACCESS_GUARD_FORBIDDEN";
  };
}

export interface AuthEnforcementMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  authEnforcementRehearsalJson: "/api/v1/security/auth-enforcement-rehearsal",
  authEnforcementRehearsalMarkdown: "/api/v1/security/auth-enforcement-rehearsal?format=markdown",
  accessGuardReadinessJson: "/api/v1/security/access-guard-readiness",
  operatorIdentityContractJson: "/api/v1/security/operator-identity-contract",
  productionReadinessSummaryV4Json: "/api/v1/production/readiness-summary-v4",
});

export function createAuthEnforcementRehearsalProfile(
  config: Pick<AppConfig, "orderopsAuthMode" | "accessGuardEnforcementEnabled" | "upstreamActionsEnabled">,
): AuthEnforcementRehearsalProfile {
  const rejectsRequests = authEnforcementActive(config);
  const samples = createSamples(rejectsRequests);
  const checks = {
    authModeConfigured: config.orderopsAuthMode === "disabled" || config.orderopsAuthMode === "rehearsal",
    defaultSafeWhenDisabled: config.accessGuardEnforcementEnabled || !rejectsRequests,
    missingIdentityCanReturn401: samples.find((sample) => sample.id === "missing-identity")?.enforcement.statusCode === (rejectsRequests ? 401 : 200),
    insufficientRoleCanReturn403: samples.find((sample) => sample.id === "insufficient-role")?.enforcement.statusCode === (rejectsRequests ? 403 : 200),
    allowedRoleCanPass: samples.find((sample) => sample.id === "allowed-auditor")?.enforcement.statusCode === 200,
    operatorIdentityStillHeaderDerived: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(config);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Auth enforcement rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "auth-enforcement-rehearsal.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    runtime: {
      authMode: config.orderopsAuthMode,
      accessGuardEnforcementEnabled: config.accessGuardEnforcementEnabled,
      rejectsRequests,
      credentialAuthImplemented: false,
      readsSecrets: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    samples,
    checks,
    summary: {
      sampleCount: samples.length,
      enforcedSampleCount: samples.filter((sample) => sample.enforcement.wouldReject).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep enforcement disabled by default until signed auth middleware exists.",
      "Use the rehearsal mode to test 401/403 behavior without enabling upstream actions.",
      "Promote this profile into production readiness summary v5 after audit retention evidence exists.",
    ],
  };
}

export function authEnforcementActive(
  config: Pick<AppConfig, "orderopsAuthMode" | "accessGuardEnforcementEnabled">,
): boolean {
  return config.orderopsAuthMode === "rehearsal" && config.accessGuardEnforcementEnabled;
}

export function renderAuthEnforcementRehearsalMarkdown(profile: AuthEnforcementRehearsalProfile): string {
  return [
    "# Auth enforcement rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Runtime",
    "",
    ...renderEntries(profile.runtime),
    "",
    "## Samples",
    "",
    ...profile.samples.flatMap(renderSample),
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
    ...renderMessages(profile.productionBlockers, "No auth enforcement blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No auth enforcement warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No auth enforcement recommendations."),
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

function createSamples(enforcementEnabled: boolean): AuthEnforcementSample[] {
  return [
    createSample("missing-identity", "Missing operator headers produce 401 only when rehearsal enforcement is enabled.", "GET", "/api/v1/security/access-policy", {}, enforcementEnabled),
    createSample("insufficient-role", "Viewer identity cannot read audit events when rehearsal enforcement is enabled.", "GET", "/api/v1/audit/events", {
      "x-orderops-operator-id": "viewer-1",
      "x-orderops-roles": "viewer",
    }, enforcementEnabled),
    createSample("allowed-auditor", "Auditor identity can read audit events in rehearsal enforcement mode.", "GET", "/api/v1/audit/events", {
      "x-orderops-operator-id": "auditor-1",
      "x-orderops-roles": "auditor",
    }, enforcementEnabled),
  ];
}

function createSample(
  id: string,
  purpose: string,
  method: string,
  path: string,
  headers: Record<string, string>,
  enforcementEnabled: boolean,
): AuthEnforcementSample {
  const evaluation = evaluateAccessGuard({ method, path, headers });
  const statusCode = enforcementStatusCode(evaluation, enforcementEnabled);
  return {
    id,
    purpose,
    method,
    path,
    headers,
    evaluation: {
      policyMatched: evaluation.policyMatched,
      routeGroup: evaluation.routeGroup,
      requiredRole: evaluation.requiredRole,
      matchedRoles: evaluation.matchedRoles,
      wouldDeny: evaluation.wouldDeny,
      reason: evaluation.reason,
    },
    enforcement: {
      enabled: enforcementEnabled,
      wouldReject: statusCode !== 200,
      statusCode,
      error: statusCode === 401
        ? "ACCESS_GUARD_UNAUTHENTICATED"
        : statusCode === 403
          ? "ACCESS_GUARD_FORBIDDEN"
          : undefined,
    },
  };
}

function enforcementStatusCode(evaluation: AccessGuardEvaluation, enforcementEnabled: boolean): 200 | 401 | 403 {
  if (!enforcementEnabled || !evaluation.wouldDeny) {
    return 200;
  }
  return evaluation.reason === "missing_identity" ? 401 : 403;
}

function collectProductionBlockers(
  config: Pick<AppConfig, "orderopsAuthMode" | "accessGuardEnforcementEnabled" | "upstreamActionsEnabled">,
): AuthEnforcementMessage[] {
  const blockers: AuthEnforcementMessage[] = [
    {
      code: "REAL_CREDENTIAL_AUTH_MISSING",
      severity: "blocker",
      message: "Rehearsal enforcement still trusts headers and does not validate signed credentials.",
    },
    {
      code: "AUTH_MODE_REHEARSAL_ONLY",
      severity: "blocker",
      message: "ORDEROPS_AUTH_MODE is a rehearsal switch, not production authentication.",
    },
  ];
  if (!config.accessGuardEnforcementEnabled) {
    blockers.push({
      code: "ACCESS_GUARD_ENFORCEMENT_DISABLED",
      severity: "blocker",
      message: "ACCESS_GUARD_ENFORCEMENT_ENABLED is false by default, so requests are not rejected.",
    });
  }
  if (config.upstreamActionsEnabled) {
    blockers.push({
      code: "UPSTREAM_ACTIONS_ENABLED",
      severity: "blocker",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false while auth enforcement is rehearsal-only.",
    });
  }
  return blockers;
}

function collectWarnings(config: Pick<AppConfig, "accessGuardEnforcementEnabled">): AuthEnforcementMessage[] {
  return [
    {
      code: config.accessGuardEnforcementEnabled ? "REHEARSAL_CAN_REJECT_REQUESTS" : "REHEARSAL_DEFAULTS_TO_OBSERVE_ONLY",
      severity: "warning",
      message: config.accessGuardEnforcementEnabled
        ? "Rehearsal enforcement can reject requests in tests or local drills, but it is still header-derived."
        : "Default runtime records access evidence without rejecting requests.",
    },
  ];
}

function collectRecommendations(): AuthEnforcementMessage[] {
  return [
    {
      code: "ADD_SIGNED_AUTH_MIDDLEWARE",
      severity: "recommendation",
      message: "Replace rehearsal headers with signed auth middleware before exposing the control plane.",
    },
    {
      code: "BIND_ENFORCEMENT_TO_MANAGED_AUDIT",
      severity: "recommendation",
      message: "Do not enable production enforcement until rejected requests are written to managed audit storage.",
    },
  ];
}

function renderSample(sample: AuthEnforcementSample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Purpose: ${sample.purpose}`,
    `- Method: ${sample.method}`,
    `- Path: ${sample.path}`,
    `- Headers: ${formatValue(sample.headers)}`,
    `- Evaluation: ${formatValue(sample.evaluation)}`,
    `- Enforcement: ${formatValue(sample.enforcement)}`,
    "",
  ];
}

function renderMessages(messages: AuthEnforcementMessage[], emptyText: string): string[] {
  if (messages.length === 0) {
    return [`- ${emptyText}`];
  }

  return messages.map((message) => `- ${message.code} (${message.severity}): ${message.message}`);
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
