import type { AppConfig } from "../config.js";
import type { AccessPolicyRole } from "./accessPolicyProfile.js";
import type { AuditVerifiedTokenContext } from "./auditLog.js";
import {
  createRehearsalToken,
  type TokenVerificationResult,
  verifyRehearsalToken,
} from "./signedAuthTokenContract.js";

export interface VerifiedIdentityAuditBindingProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "verified-identity-audit-binding.v1";
  readyForProductionAuth: false;
  readyForProductionAudit: false;
  readOnly: true;
  executionAllowed: false;
  currentBinding: {
    auditContextField: "operatorIdentity.verifiedToken";
    headerIdentityStillPrimary: true;
    rehearsalTokenIdentityProvider: "local-hmac-rehearsal";
    productionIdentityProviderConnected: false;
    tokenDoesNotAuthorizeRequests: true;
    upstreamActionsEnabled: boolean;
  };
  identitySources: IdentitySource[];
  samples: VerifiedIdentityAuditBindingSample[];
  checks: {
    headerIdentityStillSupported: boolean;
    acceptedTokenBindsSubject: boolean;
    acceptedTokenBindsRoles: boolean;
    acceptedTokenCapturesIssuer: boolean;
    rejectedTokenCapturesReason: boolean;
    tokenSecretNotExposed: boolean;
    futureProductionIdpStillMissing: boolean;
    tokenDoesNotAuthorizeRequests: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    identitySourceCount: number;
    sampleCount: number;
    acceptedSampleCount: number;
    rejectedSampleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: VerifiedIdentityAuditBindingMessage[];
  warnings: VerifiedIdentityAuditBindingMessage[];
  recommendations: VerifiedIdentityAuditBindingMessage[];
  evidenceEndpoints: {
    verifiedIdentityAuditBindingJson: string;
    verifiedIdentityAuditBindingMarkdown: string;
    signedAuthTokenContractJson: string;
    auditEventsJson: string;
  };
  nextActions: string[];
}

export interface IdentitySource {
  id: "header-identity" | "rehearsal-token-identity" | "future-production-idp";
  source: "request-headers" | "authorization-bearer-token" | "external-idp";
  writesAuditContext: boolean;
  productionReady: boolean;
  note: string;
}

export interface VerifiedIdentityAuditBindingSample {
  id: string;
  purpose: string;
  requiredRole: AccessPolicyRole;
  auditContext: AuditVerifiedTokenContext;
}

export interface VerifiedIdentityAuditBindingMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const ENDPOINTS = Object.freeze({
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
  verifiedIdentityAuditBindingMarkdown: "/api/v1/security/verified-identity-audit-binding?format=markdown",
  signedAuthTokenContractJson: "/api/v1/security/signed-auth-token-contract",
  auditEventsJson: "/api/v1/audit/events?limit=50",
});

export function createVerifiedIdentityAuditBindingProfile(
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret" | "upstreamActionsEnabled">,
  now = new Date(),
): VerifiedIdentityAuditBindingProfile {
  const samples = createSamples(config, now);
  const accepted = samples.find((sample) => sample.id === "accepted-operator")?.auditContext;
  const rejected = samples.find((sample) => sample.id === "rejected-bad-signature")?.auditContext;
  const checks = {
    headerIdentityStillSupported: true,
    acceptedTokenBindsSubject: accepted?.verification === "accepted" && accepted.subject === "operator-1",
    acceptedTokenBindsRoles: accepted?.verification === "accepted" && accepted.roles.includes("operator"),
    acceptedTokenCapturesIssuer: accepted?.issuer === config.authTokenIssuer,
    rejectedTokenCapturesReason: rejected?.verification === "rejected" && rejected.failureReason === "bad_signature",
    tokenSecretNotExposed: true,
    futureProductionIdpStillMissing: true,
    tokenDoesNotAuthorizeRequests: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Verified identity audit binding",
    generatedAt: new Date().toISOString(),
    profileVersion: "verified-identity-audit-binding.v1",
    readyForProductionAuth: false,
    readyForProductionAudit: false,
    readOnly: true,
    executionAllowed: false,
    currentBinding: {
      auditContextField: "operatorIdentity.verifiedToken",
      headerIdentityStillPrimary: true,
      rehearsalTokenIdentityProvider: "local-hmac-rehearsal",
      productionIdentityProviderConnected: false,
      tokenDoesNotAuthorizeRequests: true,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    identitySources: createIdentitySources(),
    samples,
    checks,
    summary: {
      identitySourceCount: createIdentitySources().length,
      sampleCount: samples.length,
      acceptedSampleCount: samples.filter((sample) => sample.auditContext.verification === "accepted").length,
      rejectedSampleCount: samples.filter((sample) => sample.auditContext.verification === "rejected").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Keep header identity as the local dry-run source until real authentication middleware exists.",
      "Use the verified token audit field to rehearse subject, roles, issuer, and failure reason persistence.",
      "Replace local HMAC verification with a real IdP before treating this as production authentication.",
    ],
  };
}

export function createVerifiedTokenAuditContext(input: {
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret">;
  authorization?: string | string[];
  requiredRole: AccessPolicyRole;
  now?: Date;
}): AuditVerifiedTokenContext {
  const result = verifyRehearsalToken({
    token: extractBearerToken(input.authorization),
    issuer: input.config.authTokenIssuer,
    secret: input.config.authTokenSecret,
    requiredRole: input.requiredRole,
    now: input.now,
  });
  return toAuditContext(input.config.authTokenIssuer, input.requiredRole, result);
}

export function renderVerifiedIdentityAuditBindingMarkdown(profile: VerifiedIdentityAuditBindingProfile): string {
  return [
    "# Verified identity audit binding",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Ready for production audit: ${profile.readyForProductionAudit}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Current Binding",
    "",
    ...renderEntries(profile.currentBinding),
    "",
    "## Identity Sources",
    "",
    ...profile.identitySources.flatMap(renderIdentitySource),
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
    ...renderMessages(profile.productionBlockers, "No verified identity blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No verified identity warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No verified identity recommendations."),
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

function createSamples(
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret">,
  now: Date,
): VerifiedIdentityAuditBindingSample[] {
  const expiresAt = new Date(now.getTime() + 60_000);
  const valid = config.authTokenSecret.length > 0
    ? createRehearsalToken({
      issuer: config.authTokenIssuer,
      subject: "operator-1",
      roles: ["operator", "auditor"],
      expiresAt,
      secret: config.authTokenSecret,
    })
    : undefined;
  const badSignature = valid === undefined ? undefined : `${valid.slice(0, -4)}oops`;

  return [
    createSample("accepted-operator", "Accepted token binds subject and roles into audit context.", valid, "operator", config, now),
    createSample("rejected-bad-signature", "Rejected token preserves a failure reason for audit review.", badSignature, "operator", config, now),
    createSample("rejected-missing-token", "Missing token remains a rejected rehearsal identity result.", undefined, "viewer", config, now),
  ];
}

function createSample(
  id: string,
  purpose: string,
  token: string | undefined,
  requiredRole: AccessPolicyRole,
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret">,
  now: Date,
): VerifiedIdentityAuditBindingSample {
  return {
    id,
    purpose,
    requiredRole,
    auditContext: createVerifiedTokenAuditContext({
      config,
      authorization: token === undefined ? undefined : `Bearer ${token}`,
      requiredRole,
      now,
    }),
  };
}

function toAuditContext(
  issuer: string,
  requiredRole: AccessPolicyRole,
  result: TokenVerificationResult,
): AuditVerifiedTokenContext {
  const base = {
    verifiedTokenVersion: "signed-auth-token-audit-binding.v1" as const,
    tokenFormat: "orderops-hmac-jws-rehearsal" as const,
    issuer,
    requiredRole,
    identityProvider: "local-hmac-rehearsal" as const,
    productionIdentityProviderConnected: false as const,
  };

  if (result.accepted) {
    return {
      ...base,
      verification: "accepted",
      subject: result.subject,
      roles: result.roles,
      expiresAt: result.expiresAt,
    };
  }

  return {
    ...base,
    verification: "rejected",
    roles: [],
    failureReason: result.reason,
  };
}

function extractBearerToken(value: string | string[] | undefined): string | undefined {
  const header = Array.isArray(value) ? value[0] : value;
  if (header === undefined || header.trim().length === 0) {
    return undefined;
  }

  const trimmed = header.trim();
  return trimmed.toLowerCase().startsWith("bearer ") ? trimmed.slice("bearer ".length).trim() : trimmed;
}

function createIdentitySources(): IdentitySource[] {
  return [
    {
      id: "header-identity",
      source: "request-headers",
      writesAuditContext: true,
      productionReady: false,
      note: "x-orderops-operator-id and x-orderops-roles remain the local dry-run identity source.",
    },
    {
      id: "rehearsal-token-identity",
      source: "authorization-bearer-token",
      writesAuditContext: true,
      productionReady: false,
      note: "Local HMAC token verification writes subject, roles, issuer, and result into audit evidence.",
    },
    {
      id: "future-production-idp",
      source: "external-idp",
      writesAuditContext: false,
      productionReady: false,
      note: "A real OIDC/JWT identity provider is still required before production exposure.",
    },
  ];
}

function collectProductionBlockers(
  checks: VerifiedIdentityAuditBindingProfile["checks"],
): VerifiedIdentityAuditBindingMessage[] {
  const blockers: VerifiedIdentityAuditBindingMessage[] = [
    {
      code: "REAL_IDP_NOT_CONNECTED",
      severity: "blocker",
      message: "Verified token audit binding still uses local HMAC rehearsal, not a production identity provider.",
    },
  ];
  addMessage(blockers, checks.acceptedTokenBindsSubject, "TOKEN_SUBJECT_NOT_BOUND", "Accepted token subject must be recorded in audit context.");
  addMessage(blockers, checks.acceptedTokenBindsRoles, "TOKEN_ROLES_NOT_BOUND", "Accepted token roles must be recorded in audit context.");
  addMessage(blockers, checks.rejectedTokenCapturesReason, "TOKEN_FAILURE_REASON_MISSING", "Rejected token verification must record the failure reason.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while identity is rehearsal-only.");
  return blockers;
}

function collectWarnings(
  config: Pick<AppConfig, "authTokenSecret">,
): VerifiedIdentityAuditBindingMessage[] {
  return [
    {
      code: config.authTokenSecret.length > 0 ? "HMAC_REHEARSAL_ONLY" : "TOKEN_BINDING_SECRET_MISSING",
      severity: "warning",
      message: config.authTokenSecret.length > 0
        ? "Token verification evidence proves local binding behavior only; it does not replace production IdP validation."
        : "ORDEROPS_AUTH_TOKEN_SECRET is missing, so accepted-token binding cannot be rehearsed locally.",
    },
  ];
}

function collectRecommendations(): VerifiedIdentityAuditBindingMessage[] {
  return [
    {
      code: "CONNECT_REAL_IDP",
      severity: "recommendation",
      message: "Replace local HMAC rehearsal with OIDC/JWT issuer, audience, and key-set verification.",
    },
    {
      code: "PROMOTE_TOKEN_IDENTITY_TO_ACCESS_GUARD",
      severity: "recommendation",
      message: "After real IdP integration, derive access guard identity from verified token claims instead of local headers.",
    },
  ];
}

function addMessage(
  messages: VerifiedIdentityAuditBindingMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderIdentitySource(source: IdentitySource): string[] {
  return [
    `### ${source.id}`,
    "",
    `- Source: ${source.source}`,
    `- Writes audit context: ${source.writesAuditContext}`,
    `- Production ready: ${source.productionReady}`,
    `- Note: ${source.note}`,
    "",
  ];
}

function renderSample(sample: VerifiedIdentityAuditBindingSample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Purpose: ${sample.purpose}`,
    `- Required role: ${sample.requiredRole}`,
    `- Audit context: ${formatValue(sample.auditContext)}`,
    "",
  ];
}

function renderMessages(messages: VerifiedIdentityAuditBindingMessage[], emptyText: string): string[] {
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
