import type { AppConfig } from "../config.js";

export interface AccessControlReadinessProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "access-control-readiness-profile.v1";
  readyForProductionAccessControl: false;
  readOnly: true;
  executionAllowed: false;
  currentState: {
    authenticationConfigured: false;
    rbacConfigured: false;
    operatorIdentityCaptured: false;
    auditReadProtected: false;
    mutationRoutesProtected: false;
    corsPolicy: "wildcard";
    upstreamActionsEnabled: boolean;
  };
  checks: {
    authenticationConfigured: boolean;
    rbacConfigured: boolean;
    operatorIdentityCaptured: boolean;
    auditReadProtected: boolean;
    mutationRoutesProtected: boolean;
    upstreamActionsDisabled: boolean;
    corsPolicyProductionReady: boolean;
    minimumRoleModelDefined: boolean;
  };
  summary: {
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
    requiredRoleCount: number;
    protectedRouteGroupCount: number;
  };
  requiredRoles: AccessControlRole[];
  routeGroups: AccessControlRouteGroup[];
  productionBlockers: AccessControlReadinessMessage[];
  warnings: AccessControlReadinessMessage[];
  recommendations: AccessControlReadinessMessage[];
  evidenceEndpoints: {
    accessControlReadinessJson: string;
    accessControlReadinessMarkdown: string;
    auditStoreEnvConfigProfileJson: string;
    productionReadinessSummaryJson: string;
  };
  nextActions: string[];
}

export interface AccessControlRole {
  role: "viewer" | "operator" | "approver" | "auditor" | "admin";
  purpose: string;
  canMutate: boolean;
  canApprove: boolean;
  canReadAudit: boolean;
}

export interface AccessControlRouteGroup {
  id: string;
  routes: string[];
  currentProtection: "none";
  requiredMinimumRole: AccessControlRole["role"];
  productionReady: false;
}

export interface AccessControlReadinessMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  accessControlReadinessJson: "/api/v1/security/access-control-readiness",
  accessControlReadinessMarkdown: "/api/v1/security/access-control-readiness?format=markdown",
  auditStoreEnvConfigProfileJson: "/api/v1/audit/store-config-profile",
  productionReadinessSummaryJson: "/api/v1/production/readiness-summary",
});

export function createAccessControlReadinessProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): AccessControlReadinessProfile {
  const requiredRoles = createRequiredRoles();
  const routeGroups = createRouteGroups();
  const checks = {
    authenticationConfigured: false,
    rbacConfigured: false,
    operatorIdentityCaptured: false,
    auditReadProtected: false,
    mutationRoutesProtected: false,
    upstreamActionsDisabled: config.upstreamActionsEnabled === false,
    corsPolicyProductionReady: false,
    minimumRoleModelDefined: requiredRoles.length >= 5,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Access-control readiness profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "access-control-readiness-profile.v1",
    readyForProductionAccessControl: false,
    readOnly: true,
    executionAllowed: false,
    currentState: {
      authenticationConfigured: false,
      rbacConfigured: false,
      operatorIdentityCaptured: false,
      auditReadProtected: false,
      mutationRoutesProtected: false,
      corsPolicy: "wildcard",
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    checks,
    summary: {
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
      requiredRoleCount: requiredRoles.length,
      protectedRouteGroupCount: routeGroups.filter((group) => group.productionReady).length,
    },
    requiredRoles,
    routeGroups,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(),
  };
}

export function renderAccessControlReadinessProfileMarkdown(profile: AccessControlReadinessProfile): string {
  return [
    "# Access-control readiness profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production access control: ${profile.readyForProductionAccessControl}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Current State",
    "",
    ...renderEntries(profile.currentState),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Required Roles",
    "",
    ...profile.requiredRoles.flatMap(renderRole),
    "## Route Groups",
    "",
    ...profile.routeGroups.flatMap(renderRouteGroup),
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No access-control blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No access-control warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No access-control recommendations."),
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

function createRequiredRoles(): AccessControlRole[] {
  return [
    {
      role: "viewer",
      purpose: "Read dashboards and readiness evidence.",
      canMutate: false,
      canApprove: false,
      canReadAudit: false,
    },
    {
      role: "operator",
      purpose: "Create operation intents and preflight requests.",
      canMutate: true,
      canApprove: false,
      canReadAudit: false,
    },
    {
      role: "approver",
      purpose: "Approve or reject operation approval requests.",
      canMutate: true,
      canApprove: true,
      canReadAudit: false,
    },
    {
      role: "auditor",
      purpose: "Read audit events, evidence reports, and archive bundles.",
      canMutate: false,
      canApprove: false,
      canReadAudit: true,
    },
    {
      role: "admin",
      purpose: "Manage access policies and emergency disable switches.",
      canMutate: true,
      canApprove: true,
      canReadAudit: true,
    },
  ];
}

function createRouteGroups(): AccessControlRouteGroup[] {
  return [
    {
      id: "readiness-and-status",
      routes: ["/health", "/api/v1/upstreams/*", "/api/v1/production/readiness-summary"],
      currentProtection: "none",
      requiredMinimumRole: "viewer",
      productionReady: false,
    },
    {
      id: "audit",
      routes: ["/api/v1/audit/events", "/api/v1/audit/summary"],
      currentProtection: "none",
      requiredMinimumRole: "auditor",
      productionReady: false,
    },
    {
      id: "operation-mutations",
      routes: ["/api/v1/operation-intents", "/api/v1/operation-approval-requests", "/api/v1/operation-approval-decisions"],
      currentProtection: "none",
      requiredMinimumRole: "operator",
      productionReady: false,
    },
    {
      id: "approval-execution-gates",
      routes: ["/api/v1/operation-approval-execution-gate-archives"],
      currentProtection: "none",
      requiredMinimumRole: "approver",
      productionReady: false,
    },
  ];
}

function collectProductionBlockers(checks: AccessControlReadinessProfile["checks"]): AccessControlReadinessMessage[] {
  const blockers: AccessControlReadinessMessage[] = [];
  addMessage(blockers, checks.authenticationConfigured, "AUTHENTICATION_MISSING", "Production access control needs authenticated operators.");
  addMessage(blockers, checks.rbacConfigured, "RBAC_MISSING", "Production access control needs route-level RBAC.");
  addMessage(blockers, checks.operatorIdentityCaptured, "OPERATOR_IDENTITY_MISSING", "Mutating requests must capture operator identity for audit evidence.");
  addMessage(blockers, checks.auditReadProtected, "AUDIT_READ_UNPROTECTED", "Audit event and summary routes must require an auditor/admin role.");
  addMessage(blockers, checks.mutationRoutesProtected, "MUTATION_ROUTES_UNPROTECTED", "Intent, approval, and archive mutation routes must be protected.");
  addMessage(blockers, checks.upstreamActionsDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must stay false until access control exists.");
  addMessage(blockers, checks.corsPolicyProductionReady, "CORS_POLICY_WILDCARD", "Wildcard CORS is acceptable for local smoke but not production exposure.");
  return blockers;
}

function collectWarnings(config: Pick<AppConfig, "upstreamActionsEnabled">): AccessControlReadinessMessage[] {
  const warnings: AccessControlReadinessMessage[] = [];

  if (!config.upstreamActionsEnabled) {
    warnings.push({
      code: "ACTIONS_DISABLED_AS_COMPENSATING_CONTROL",
      severity: "warning",
      message: "Upstream actions are disabled, which limits blast radius while access control is not implemented.",
    });
  }

  return warnings;
}

function collectRecommendations(): AccessControlReadinessMessage[] {
  return [
    {
      code: "ADD_AUTH_MIDDLEWARE",
      severity: "recommendation",
      message: "Add a Fastify preHandler that validates identity and attaches operator context to requests.",
    },
    {
      code: "ADD_ROUTE_POLICY_MAP",
      severity: "recommendation",
      message: "Define route-group to minimum-role policy before enabling production exposure.",
    },
    {
      code: "PROPAGATE_OPERATOR_TO_AUDIT",
      severity: "recommendation",
      message: "Record operator id, roles, and decision id in audit events and approval ledgers.",
    },
  ];
}

function collectNextActions(): string[] {
  return [
    "Keep UPSTREAM_ACTIONS_ENABLED=false until authentication and RBAC are implemented.",
    "Implement access-control middleware in a dedicated version before exposing the control plane.",
    "Use this profile as an input to the next production readiness summary.",
  ];
}

function addMessage(
  messages: AccessControlReadinessMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderRole(role: AccessControlRole): string[] {
  return [
    `### ${role.role}`,
    "",
    `- Purpose: ${role.purpose}`,
    `- Can mutate: ${role.canMutate}`,
    `- Can approve: ${role.canApprove}`,
    `- Can read audit: ${role.canReadAudit}`,
    "",
  ];
}

function renderRouteGroup(group: AccessControlRouteGroup): string[] {
  return [
    `### ${group.id}`,
    "",
    `- Routes: ${group.routes.join(", ")}`,
    `- Current protection: ${group.currentProtection}`,
    `- Required minimum role: ${group.requiredMinimumRole}`,
    `- Production ready: ${group.productionReady}`,
    "",
  ];
}

function renderMessages(messages: AccessControlReadinessMessage[], emptyText: string): string[] {
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
