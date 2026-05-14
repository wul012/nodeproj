import type { AppConfig } from "../config.js";

export type AccessPolicyRole = "viewer" | "operator" | "approver" | "auditor" | "admin";

export interface AccessPolicyProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "access-policy-profile.v1";
  readyForEnforcement: false;
  readOnly: true;
  executionAllowed: false;
  enforcement: {
    mode: "contract-only";
    rejectsRequests: false;
    requiresLogin: false;
    readsSecrets: false;
    upstreamActionsEnabled: boolean;
  };
  requestIdentityContract: RequestIdentityContract;
  routePolicies: AccessRoutePolicy[];
  checks: {
    identityContractDefined: boolean;
    routePolicyMapDefined: boolean;
    readinessRoutesCovered: boolean;
    auditRoutesRequireAuditor: boolean;
    mutationRoutesRequireOperatorOrApprover: boolean;
    archiveRoutesRequireApprover: boolean;
    noSecretRequired: boolean;
    enforcementStillDisabled: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    roleCount: number;
    routePolicyCount: number;
    protectedRouteGroupCount: number;
    mutationPolicyCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: AccessPolicyMessage[];
  warnings: AccessPolicyMessage[];
  recommendations: AccessPolicyMessage[];
  evidenceEndpoints: {
    accessPolicyProfileJson: string;
    accessPolicyProfileMarkdown: string;
    accessControlReadinessJson: string;
    productionReadinessSummaryV2Json: string;
  };
  nextActions: string[];
}

export interface RequestIdentityContract {
  source: "future-auth-middleware";
  requiredForProduction: true;
  currentRuntime: "anonymous-local";
  fields: RequestIdentityField[];
  sample: {
    authenticated: boolean;
    operatorId: string | null;
    roles: AccessPolicyRole[];
    authSource: "none";
  };
}

export interface RequestIdentityField {
  name: "authenticated" | "operatorId" | "roles" | "authSource";
  type: "boolean" | "string" | "string[]";
  requiredForMutation: boolean;
  currentRuntimeValue: string;
}

export interface AccessRoutePolicy {
  id: string;
  routeGroup: "readiness" | "audit" | "intent" | "approval" | "archive" | "upstream-proxy";
  methods: string[];
  pathPatterns: string[];
  minimumRole: AccessPolicyRole;
  mutatesLocalState: boolean;
  touchesUpstream: boolean;
  productionReady: false;
  note: string;
}

export interface AccessPolicyMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  accessPolicyProfileJson: "/api/v1/security/access-policy",
  accessPolicyProfileMarkdown: "/api/v1/security/access-policy?format=markdown",
  accessControlReadinessJson: "/api/v1/security/access-control-readiness",
  productionReadinessSummaryV2Json: "/api/v1/production/readiness-summary-v2",
});

const REQUIRED_ROLES: AccessPolicyRole[] = ["viewer", "operator", "approver", "auditor", "admin"];

export function createAccessPolicyProfile(
  config: Pick<AppConfig, "upstreamActionsEnabled">,
): AccessPolicyProfile {
  const routePolicies = createAccessRoutePolicies();
  const checks = {
    identityContractDefined: createRequestIdentityContract().fields.length === 4,
    routePolicyMapDefined: routePolicies.length >= 6,
    readinessRoutesCovered: routePolicies.some((policy) => policy.routeGroup === "readiness" && policy.minimumRole === "viewer"),
    auditRoutesRequireAuditor: routePolicies
      .filter((policy) => policy.routeGroup === "audit")
      .every((policy) => policy.minimumRole === "auditor"),
    mutationRoutesRequireOperatorOrApprover: routePolicies
      .filter((policy) => policy.mutatesLocalState)
      .every((policy) => policy.minimumRole === "operator" || policy.minimumRole === "approver"),
    archiveRoutesRequireApprover: routePolicies
      .filter((policy) => policy.routeGroup === "archive")
      .every((policy) => policy.minimumRole === "approver"),
    noSecretRequired: true,
    enforcementStillDisabled: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Access policy profile",
    generatedAt: new Date().toISOString(),
    profileVersion: "access-policy-profile.v1",
    readyForEnforcement: false,
    readOnly: true,
    executionAllowed: false,
    enforcement: {
      mode: "contract-only",
      rejectsRequests: false,
      requiresLogin: false,
      readsSecrets: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    requestIdentityContract: createRequestIdentityContract(),
    routePolicies,
    checks,
    summary: {
      roleCount: REQUIRED_ROLES.length,
      routePolicyCount: routePolicies.length,
      protectedRouteGroupCount: new Set(routePolicies.map((policy) => policy.routeGroup)).size,
      mutationPolicyCount: routePolicies.filter((policy) => policy.mutatesLocalState).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: collectNextActions(),
  };
}

export function renderAccessPolicyProfileMarkdown(profile: AccessPolicyProfile): string {
  return [
    "# Access policy profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for enforcement: ${profile.readyForEnforcement}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Enforcement",
    "",
    ...renderEntries(profile.enforcement),
    "",
    "## Request Identity Contract",
    "",
    ...profile.requestIdentityContract.fields.flatMap(renderIdentityField),
    "## Route Policies",
    "",
    ...profile.routePolicies.flatMap(renderRoutePolicy),
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
    ...renderMessages(profile.productionBlockers, "No access policy blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No access policy warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No access policy recommendations."),
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

function createRequestIdentityContract(): RequestIdentityContract {
  return {
    source: "future-auth-middleware",
    requiredForProduction: true,
    currentRuntime: "anonymous-local",
    fields: [
      {
        name: "authenticated",
        type: "boolean",
        requiredForMutation: true,
        currentRuntimeValue: "false",
      },
      {
        name: "operatorId",
        type: "string",
        requiredForMutation: true,
        currentRuntimeValue: "null",
      },
      {
        name: "roles",
        type: "string[]",
        requiredForMutation: true,
        currentRuntimeValue: "[]",
      },
      {
        name: "authSource",
        type: "string",
        requiredForMutation: true,
        currentRuntimeValue: "none",
      },
    ],
    sample: {
      authenticated: false,
      operatorId: null,
      roles: [],
      authSource: "none",
    },
  };
}

export function createAccessRoutePolicies(): AccessRoutePolicy[] {
  return [
    {
      id: "readiness-and-status",
      routeGroup: "readiness",
      methods: ["GET"],
      pathPatterns: ["/health", "/api/v1/runtime/config", "/api/v1/ci/*", "/api/v1/production/*", "/api/v1/security/*", "/api/v1/deployment/*"],
      minimumRole: "viewer",
      mutatesLocalState: false,
      touchesUpstream: false,
      productionReady: false,
      note: "Readiness and security evidence should be readable by authenticated viewers before external exposure.",
    },
    {
      id: "audit-read",
      routeGroup: "audit",
      methods: ["GET"],
      pathPatterns: [
        "/api/v1/audit/events",
        "/api/v1/audit/summary",
        "/api/v1/audit/store-*",
        "/api/v1/audit/file-*",
        "/api/v1/audit/retention-*",
        "/api/v1/audit/managed-*",
      ],
      minimumRole: "auditor",
      mutatesLocalState: false,
      touchesUpstream: false,
      productionReady: false,
      note: "Audit events can expose operator activity and need auditor or admin access.",
    },
    {
      id: "operation-intent-mutations",
      routeGroup: "intent",
      methods: ["POST", "PUT", "DELETE"],
      pathPatterns: ["/api/v1/operation-intents", "/api/v1/operation-intents/:intentId/confirm"],
      minimumRole: "operator",
      mutatesLocalState: true,
      touchesUpstream: false,
      productionReady: false,
      note: "Intent creation and confirmation mutate local ledgers and require an operator identity.",
    },
    {
      id: "approval-decisions",
      routeGroup: "approval",
      methods: ["POST"],
      pathPatterns: [
        "/api/v1/operation-approval-requests",
        "/api/v1/operation-approval-requests/:requestId/decision",
        "/api/v1/production/connection-dry-run-approvals",
      ],
      minimumRole: "approver",
      mutatesLocalState: true,
      touchesUpstream: false,
      productionReady: false,
      note: "Approval records must be bound to an approver before real execution can ever be considered.",
    },
    {
      id: "archive-mutations",
      routeGroup: "archive",
      methods: ["POST"],
      pathPatterns: ["/api/v1/operation-approval-requests/:requestId/execution-gate-archive"],
      minimumRole: "approver",
      mutatesLocalState: true,
      touchesUpstream: false,
      productionReady: false,
      note: "Archive creation changes the local evidence ledger and needs an approver identity.",
    },
    {
      id: "upstream-proxy-actions",
      routeGroup: "upstream-proxy",
      methods: ["POST", "PUT", "DELETE"],
      pathPatterns: ["/api/v1/order-platform/*", "/api/v1/mini-kv/*"],
      minimumRole: "admin",
      mutatesLocalState: false,
      touchesUpstream: true,
      productionReady: false,
      note: "Upstream actions stay disabled until authentication, RBAC, audit durability, and explicit execution gates are complete.",
    },
  ];
}

function collectProductionBlockers(checks: AccessPolicyProfile["checks"]): AccessPolicyMessage[] {
  const blockers: AccessPolicyMessage[] = [];
  addMessage(blockers, checks.enforcementStillDisabled === false, "ACCESS_GUARD_NOT_ENFORCED", "Policy exists, but no request is blocked by it yet.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while access policy is contract-only.");
  return blockers;
}

function collectWarnings(): AccessPolicyMessage[] {
  return [
    {
      code: "POLICY_CONTRACT_ONLY",
      severity: "warning",
      message: "This version defines the access contract but deliberately does not reject requests.",
    },
    {
      code: "IDENTITY_IS_ANONYMOUS",
      severity: "warning",
      message: "The current runtime identity sample is anonymous until an auth middleware attaches operator context.",
    },
  ];
}

function collectRecommendations(): AccessPolicyMessage[] {
  return [
    {
      code: "ADD_DRY_RUN_GUARD",
      severity: "recommendation",
      message: "Next version should evaluate this policy per request in dry-run mode and record wouldDeny evidence.",
    },
    {
      code: "PROPAGATE_IDENTITY_TO_AUDIT",
      severity: "recommendation",
      message: "Attach operator identity and matched roles to audit events before enabling upstream actions.",
    },
  ];
}

function collectNextActions(): string[] {
  return [
    "Use this policy map as the source for a dry-run access guard in Node v101.",
    "Keep this endpoint read-only and do not require secrets until a dedicated auth version.",
    "Keep UPSTREAM_ACTIONS_ENABLED=false while access enforcement is contract-only.",
  ];
}

function addMessage(
  messages: AccessPolicyMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderIdentityField(field: RequestIdentityField): string[] {
  return [
    `### ${field.name}`,
    "",
    `- Type: ${field.type}`,
    `- Required for mutation: ${field.requiredForMutation}`,
    `- Current runtime value: ${field.currentRuntimeValue}`,
    "",
  ];
}

function renderRoutePolicy(policy: AccessRoutePolicy): string[] {
  return [
    `### ${policy.id}`,
    "",
    `- Route group: ${policy.routeGroup}`,
    `- Methods: ${policy.methods.join(", ")}`,
    `- Path patterns: ${policy.pathPatterns.join(", ")}`,
    `- Minimum role: ${policy.minimumRole}`,
    `- Mutates local state: ${policy.mutatesLocalState}`,
    `- Touches upstream: ${policy.touchesUpstream}`,
    `- Production ready: ${policy.productionReady}`,
    `- Note: ${policy.note}`,
    "",
  ];
}

function renderMessages(messages: AccessPolicyMessage[], emptyText: string): string[] {
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
