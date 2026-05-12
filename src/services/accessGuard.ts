import type { IncomingHttpHeaders } from "node:http";

import {
  createAccessRoutePolicies,
  type AccessPolicyRole,
  type AccessRoutePolicy,
} from "./accessPolicyProfile.js";

export interface RequestIdentity {
  authenticated: boolean;
  operatorId?: string;
  roles: AccessPolicyRole[];
  authSource: "none" | "headers";
  rawRoles: string[];
  rejectedRoles: string[];
}

export interface AccessGuardEvaluation {
  guardVersion: "access-guard-dry-run.v1";
  mode: "dry-run";
  rejectsRequests: false;
  policyMatched: boolean;
  policyId?: string;
  routeGroup: string;
  requiredRole?: AccessPolicyRole;
  matchedRoles: AccessPolicyRole[];
  wouldDeny: boolean;
  reason: "missing_policy" | "missing_identity" | "missing_required_role" | "allowed_by_role";
  requestIdentity: RequestIdentity;
}

export interface AccessGuardReadinessProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "access-guard-readiness-profile.v1";
  readyForEnforcement: false;
  readOnly: true;
  executionAllowed: false;
  guard: {
    mode: "dry-run";
    rejectsRequests: false;
    sourcePolicyCount: number;
  };
  checks: {
    dryRunGuardEnabled: boolean;
    noRequestRejection: boolean;
    readinessRoutesCovered: boolean;
    auditRoutesCovered: boolean;
    intentMutationRoutesCovered: boolean;
    approvalRoutesCovered: boolean;
    archiveRoutesCovered: boolean;
    upstreamProxyActionsCovered: boolean;
    roleEvaluationImplemented: boolean;
  };
  summary: {
    routePolicyCount: number;
    protectedRouteGroupCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AccessGuardMessage[];
  warnings: AccessGuardMessage[];
  recommendations: AccessGuardMessage[];
  evidenceEndpoints: {
    accessGuardReadinessJson: string;
    accessGuardReadinessMarkdown: string;
    accessPolicyProfileJson: string;
    accessControlReadinessJson: string;
  };
  nextActions: string[];
}

export interface AccessGuardMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  accessGuardReadinessJson: "/api/v1/security/access-guard-readiness",
  accessGuardReadinessMarkdown: "/api/v1/security/access-guard-readiness?format=markdown",
  accessPolicyProfileJson: "/api/v1/security/access-policy",
  accessControlReadinessJson: "/api/v1/security/access-control-readiness",
});

const ROLE_GRANTS: Record<AccessPolicyRole, AccessPolicyRole[]> = {
  viewer: ["viewer"],
  operator: ["viewer", "operator"],
  approver: ["viewer", "operator", "approver"],
  auditor: ["viewer", "auditor"],
  admin: ["viewer", "operator", "approver", "auditor", "admin"],
};

export function evaluateAccessGuard(input: {
  method: string;
  path: string;
  headers?: IncomingHttpHeaders;
  policies?: AccessRoutePolicy[];
}): AccessGuardEvaluation {
  const normalizedMethod = input.method.toUpperCase();
  const normalizedPath = normalizePath(input.path);
  const policies = input.policies ?? createAccessRoutePolicies();
  const policy = policies.find((candidate) =>
    candidate.methods.includes(normalizedMethod) && candidate.pathPatterns.some((pattern) => pathMatches(pattern, normalizedPath)));
  const identity = extractRequestIdentityFromHeaders(input.headers ?? {});

  if (policy === undefined) {
    return {
      guardVersion: "access-guard-dry-run.v1",
      mode: "dry-run",
      rejectsRequests: false,
      policyMatched: false,
      routeGroup: "unmatched",
      matchedRoles: identity.roles,
      wouldDeny: true,
      reason: "missing_policy",
      requestIdentity: identity,
    };
  }

  const roleAllowed = hasRequiredRole(identity.roles, policy.minimumRole);
  const wouldDeny = !identity.authenticated || !roleAllowed;

  return {
    guardVersion: "access-guard-dry-run.v1",
    mode: "dry-run",
    rejectsRequests: false,
    policyMatched: true,
    policyId: policy.id,
    routeGroup: policy.routeGroup,
    requiredRole: policy.minimumRole,
    matchedRoles: identity.roles,
    wouldDeny,
    reason: !identity.authenticated ? "missing_identity" : roleAllowed ? "allowed_by_role" : "missing_required_role",
    requestIdentity: identity,
  };
}

export function createAccessGuardReadinessProfile(): AccessGuardReadinessProfile {
  const policies = createAccessRoutePolicies();
  const routeGroups = new Set(policies.map((policy) => policy.routeGroup));
  const checks = {
    dryRunGuardEnabled: true,
    noRequestRejection: true,
    readinessRoutesCovered: routeGroups.has("readiness"),
    auditRoutesCovered: routeGroups.has("audit"),
    intentMutationRoutesCovered: routeGroups.has("intent"),
    approvalRoutesCovered: routeGroups.has("approval"),
    archiveRoutesCovered: routeGroups.has("archive"),
    upstreamProxyActionsCovered: routeGroups.has("upstream-proxy"),
    roleEvaluationImplemented: hasRequiredRole(["admin"], "auditor") && hasRequiredRole(["operator"], "viewer"),
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Access guard readiness profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "access-guard-readiness-profile.v1",
    readyForEnforcement: false,
    readOnly: true,
    executionAllowed: false,
    guard: {
      mode: "dry-run",
      rejectsRequests: false,
      sourcePolicyCount: policies.length,
    },
    checks,
    summary: {
      routePolicyCount: policies.length,
      protectedRouteGroupCount: routeGroups.size,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Propagate access guard evaluation into durable audit evidence before enforcement.",
      "Keep guard mode dry-run until authentication and RBAC are implemented.",
      "Use this readiness profile as input for the next production readiness summary.",
    ],
  };
}

export function renderAccessGuardReadinessProfileMarkdown(profile: AccessGuardReadinessProfile): string {
  return [
    "# Access guard readiness profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for enforcement: ${profile.readyForEnforcement}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Guard",
    "",
    ...renderEntries(profile.guard),
    "",
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
    ...renderMessages(profile.productionBlockers, "No access guard blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No access guard warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No access guard recommendations."),
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

export function extractRequestIdentityFromHeaders(headers: IncomingHttpHeaders): RequestIdentity {
  const operatorId = readHeader(headers, "x-orderops-operator-id");
  const parsedRoles = parseOperatorRoles(readHeader(headers, "x-orderops-roles"));

  return {
    authenticated: operatorId !== undefined && parsedRoles.roles.length > 0,
    operatorId,
    roles: parsedRoles.roles,
    authSource: operatorId === undefined && parsedRoles.rawRoles.length === 0 ? "none" : "headers",
    rawRoles: parsedRoles.rawRoles,
    rejectedRoles: parsedRoles.rejectedRoles,
  };
}

function hasRequiredRole(roles: AccessPolicyRole[], requiredRole: AccessPolicyRole): boolean {
  return roles.some((role) => ROLE_GRANTS[role].includes(requiredRole));
}

export function parseOperatorRoles(value: string | undefined): {
  roles: AccessPolicyRole[];
  rawRoles: string[];
  rejectedRoles: string[];
} {
  if (value === undefined) {
    return {
      roles: [],
      rawRoles: [],
      rejectedRoles: [],
    };
  }

  const unique = new Set<AccessPolicyRole>();
  const rawRoles: string[] = [];
  const rejectedRoles: string[] = [];
  for (const role of value.split(",").map((item) => item.trim().toLowerCase())) {
    if (role.length === 0) {
      continue;
    }

    rawRoles.push(role);
    if (isAccessPolicyRole(role)) {
      unique.add(role);
    } else {
      rejectedRoles.push(role);
    }
  }
  return {
    roles: [...unique],
    rawRoles,
    rejectedRoles,
  };
}

function pathMatches(pattern: string, requestPath: string): boolean {
  const escaped = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:[^/]+/g, "[^/]+")
    .replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`).test(requestPath);
}

function normalizePath(path: string): string {
  const [pathname] = path.split("?", 1);
  return pathname || "/";
}

function readHeader(headers: IncomingHttpHeaders, key: string): string | undefined {
  const value = headers[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function collectProductionBlockers(checks: AccessGuardReadinessProfile["checks"]): AccessGuardMessage[] {
  const blockers: AccessGuardMessage[] = [];
  addMessage(blockers, false, "ACCESS_GUARD_DRY_RUN_ONLY", "Access guard evaluates requests but does not enforce denial yet.");
  addMessage(blockers, checks.noRequestRejection, "ACCESS_GUARD_REJECTS_REQUESTS", "Dry-run guard must not reject requests in v101.");
  addMessage(blockers, checks.roleEvaluationImplemented, "ACCESS_ROLE_EVALUATION_MISSING", "Access guard must evaluate minimum roles.");
  return blockers;
}

function collectWarnings(): AccessGuardMessage[] {
  return [
    {
      code: "DRY_RUN_HEADERS_ONLY",
      severity: "warning",
      message: "Access guard evidence is currently exposed through response headers and readiness profile, not durable audit.",
    },
  ];
}

function collectRecommendations(): AccessGuardMessage[] {
  return [
    {
      code: "WRITE_GUARD_CONTEXT_TO_AUDIT",
      severity: "recommendation",
      message: "Persist routeGroup, requiredRole, matchedRoles, and wouldDeny in audit evidence before real enforcement.",
    },
    {
      code: "ADD_AUTH_MIDDLEWARE",
      severity: "recommendation",
      message: "Replace header-derived dry-run identity with authenticated operator context.",
    },
  ];
}

function addMessage(
  messages: AccessGuardMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function isAccessPolicyRole(value: string): value is AccessPolicyRole {
  return value === "viewer"
    || value === "operator"
    || value === "approver"
    || value === "auditor"
    || value === "admin";
}

function renderMessages(messages: AccessGuardMessage[], emptyText: string): string[] {
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
