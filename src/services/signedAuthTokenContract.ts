import { createHmac, timingSafeEqual } from "node:crypto";

import type { AppConfig } from "../config.js";
import type { AccessPolicyRole } from "./accessPolicyProfile.js";

export interface SignedAuthTokenContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "signed-auth-token-contract.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  contract: {
    tokenFormat: "orderops-hmac-jws-rehearsal";
    issuer: string;
    subjectRequired: true;
    rolesRequired: true;
    expiresAtRequired: true;
    signatureRequired: true;
    algorithm: "HS256";
    productionIdentityProvider: "not-connected";
  };
  runtime: {
    secretConfigured: boolean;
    secretExposed: false;
    validatesSignature: boolean;
    validatesExpiry: boolean;
    validatesIssuer: boolean;
    mapsRolesToAccessGuard: true;
    upstreamActionsEnabled: boolean;
  };
  samples: SignedAuthTokenSample[];
  checks: {
    issuerConfigured: boolean;
    secretConfiguredForRehearsal: boolean;
    missingTokenRejected: boolean;
    badSignatureRejected: boolean;
    expiredTokenRejected: boolean;
    insufficientRoleRejected: boolean;
    allowedRoleAccepted: boolean;
    secretNotExposed: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    sampleCount: number;
    acceptedSampleCount: number;
    rejectedSampleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: SignedAuthTokenMessage[];
  warnings: SignedAuthTokenMessage[];
  recommendations: SignedAuthTokenMessage[];
  evidenceEndpoints: {
    signedAuthTokenContractJson: string;
    signedAuthTokenContractMarkdown: string;
    authEnforcementRehearsalJson: string;
    productionReadinessSummaryV5Json: string;
  };
  nextActions: string[];
}

export interface SignedAuthTokenSample {
  id: string;
  purpose: string;
  tokenPresent: boolean;
  requiredRole: AccessPolicyRole;
  result: TokenVerificationResult;
}

export type TokenVerificationResult =
  | {
    accepted: true;
    statusCode: 200;
    subject: string;
    roles: AccessPolicyRole[];
    expiresAt: string;
  }
  | {
    accepted: false;
    statusCode: 401 | 403;
    reason: "missing_token" | "secret_not_configured" | "malformed_token" | "bad_signature" | "issuer_mismatch" | "expired" | "missing_required_role";
  };

export interface SignedAuthTokenMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

interface TokenPayload {
  iss: string;
  sub: string;
  roles: AccessPolicyRole[];
  exp: number;
}

const ENDPOINTS = Object.freeze({
  signedAuthTokenContractJson: "/api/v1/security/signed-auth-token-contract",
  signedAuthTokenContractMarkdown: "/api/v1/security/signed-auth-token-contract?format=markdown",
  authEnforcementRehearsalJson: "/api/v1/security/auth-enforcement-rehearsal",
  productionReadinessSummaryV5Json: "/api/v1/production/readiness-summary-v5",
});

const ALLOWED_ROLES: AccessPolicyRole[] = ["viewer", "operator", "approver", "auditor", "admin"];

export function createSignedAuthTokenContractProfile(
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret" | "upstreamActionsEnabled">,
  now = new Date(),
): SignedAuthTokenContractProfile {
  const samples = createSamples(config, now);
  const checks = {
    issuerConfigured: config.authTokenIssuer.length > 0,
    secretConfiguredForRehearsal: config.authTokenSecret.length > 0,
    missingTokenRejected: sampleReason(samples, "missing-token") === "missing_token",
    badSignatureRejected: sampleReason(samples, "bad-signature") === "bad_signature",
    expiredTokenRejected: sampleReason(samples, "expired-token") === "expired",
    insufficientRoleRejected: sampleReason(samples, "insufficient-role") === "missing_required_role",
    allowedRoleAccepted: sampleAccepted(samples, "allowed-operator"),
    secretNotExposed: true,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Signed auth token contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "signed-auth-token-contract.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    contract: {
      tokenFormat: "orderops-hmac-jws-rehearsal",
      issuer: config.authTokenIssuer,
      subjectRequired: true,
      rolesRequired: true,
      expiresAtRequired: true,
      signatureRequired: true,
      algorithm: "HS256",
      productionIdentityProvider: "not-connected",
    },
    runtime: {
      secretConfigured: config.authTokenSecret.length > 0,
      secretExposed: false,
      validatesSignature: config.authTokenSecret.length > 0,
      validatesExpiry: true,
      validatesIssuer: true,
      mapsRolesToAccessGuard: true,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    samples,
    checks,
    summary: {
      sampleCount: samples.length,
      acceptedSampleCount: samples.filter((sample) => sample.result.accepted).length,
      rejectedSampleCount: samples.filter((sample) => !sample.result.accepted).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Replace HMAC rehearsal tokens with a real OIDC/JWT identity provider before production exposure.",
      "Bind verified subject and roles into access guard enforcement and audit events.",
      "Keep UPSTREAM_ACTIONS_ENABLED=false while token auth remains rehearsal-only.",
    ],
  };
}

export function createRehearsalToken(input: {
  issuer: string;
  subject: string;
  roles: AccessPolicyRole[];
  expiresAt: Date;
  secret: string;
}): string {
  const header = { alg: "HS256", typ: "JWT", kid: "orderops-rehearsal" };
  const payload: TokenPayload = {
    iss: input.issuer,
    sub: input.subject,
    roles: input.roles,
    exp: Math.floor(input.expiresAt.getTime() / 1000),
  };
  const signingInput = `${base64UrlJson(header)}.${base64UrlJson(payload)}`;
  return `${signingInput}.${sign(signingInput, input.secret)}`;
}

export function verifyRehearsalToken(input: {
  token?: string;
  issuer: string;
  secret: string;
  requiredRole: AccessPolicyRole;
  now?: Date;
}): TokenVerificationResult {
  if (input.token === undefined || input.token.trim().length === 0) {
    return { accepted: false, statusCode: 401, reason: "missing_token" };
  }
  if (input.secret.length === 0) {
    return { accepted: false, statusCode: 401, reason: "secret_not_configured" };
  }

  const parts = input.token.split(".");
  if (parts.length !== 3) {
    return { accepted: false, statusCode: 401, reason: "malformed_token" };
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  if (!signatureMatches(signature, sign(signingInput, input.secret))) {
    return { accepted: false, statusCode: 401, reason: "bad_signature" };
  }

  const payload = parsePayload(encodedPayload);
  if (payload === undefined) {
    return { accepted: false, statusCode: 401, reason: "malformed_token" };
  }
  if (payload.iss !== input.issuer) {
    return { accepted: false, statusCode: 401, reason: "issuer_mismatch" };
  }
  const nowSeconds = Math.floor((input.now ?? new Date()).getTime() / 1000);
  if (payload.exp <= nowSeconds) {
    return { accepted: false, statusCode: 401, reason: "expired" };
  }
  if (!payload.roles.includes(input.requiredRole) && !payload.roles.includes("admin")) {
    return { accepted: false, statusCode: 403, reason: "missing_required_role" };
  }

  return {
    accepted: true,
    statusCode: 200,
    subject: payload.sub,
    roles: payload.roles,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
}

export function renderSignedAuthTokenContractMarkdown(profile: SignedAuthTokenContractProfile): string {
  return [
    "# Signed auth token contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Contract",
    "",
    ...renderEntries(profile.contract),
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
    ...renderMessages(profile.productionBlockers, "No signed auth blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No signed auth warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No signed auth recommendations."),
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
): SignedAuthTokenSample[] {
  const expiresAt = new Date(now.getTime() + 60_000);
  const expiredAt = new Date(now.getTime() - 60_000);
  const allowed = config.authTokenSecret.length > 0
    ? createRehearsalToken({
      issuer: config.authTokenIssuer,
      subject: "operator-1",
      roles: ["operator"],
      expiresAt,
      secret: config.authTokenSecret,
    })
    : undefined;
  const insufficient = config.authTokenSecret.length > 0
    ? createRehearsalToken({
      issuer: config.authTokenIssuer,
      subject: "viewer-1",
      roles: ["viewer"],
      expiresAt,
      secret: config.authTokenSecret,
    })
    : undefined;
  const expired = config.authTokenSecret.length > 0
    ? createRehearsalToken({
      issuer: config.authTokenIssuer,
      subject: "operator-2",
      roles: ["operator"],
      expiresAt: expiredAt,
      secret: config.authTokenSecret,
    })
    : undefined;
  const badSignature = allowed === undefined ? undefined : `${allowed.slice(0, -4)}oops`;

  return [
    createSample("missing-token", "No bearer token should be rejected.", undefined, "viewer", config, now),
    createSample("bad-signature", "A tampered rehearsal token should be rejected.", badSignature, "operator", config, now),
    createSample("expired-token", "Expired token should be rejected.", expired, "operator", config, now),
    createSample("insufficient-role", "Valid signature with insufficient role should return 403.", insufficient, "operator", config, now),
    createSample("allowed-operator", "Valid signature and required role should be accepted.", allowed, "operator", config, now),
  ];
}

function createSample(
  id: string,
  purpose: string,
  token: string | undefined,
  requiredRole: AccessPolicyRole,
  config: Pick<AppConfig, "authTokenIssuer" | "authTokenSecret">,
  now: Date,
): SignedAuthTokenSample {
  return {
    id,
    purpose,
    tokenPresent: token !== undefined,
    requiredRole,
    result: verifyRehearsalToken({
      token,
      issuer: config.authTokenIssuer,
      secret: config.authTokenSecret,
      requiredRole,
      now,
    }),
  };
}

function collectProductionBlockers(checks: SignedAuthTokenContractProfile["checks"]): SignedAuthTokenMessage[] {
  const blockers: SignedAuthTokenMessage[] = [
    {
      code: "REAL_IDP_NOT_CONNECTED",
      severity: "blocker",
      message: "HMAC rehearsal tokens are not a real OAuth/OIDC/JWT production identity provider.",
    },
  ];
  addMessage(blockers, checks.secretConfiguredForRehearsal, "AUTH_TOKEN_SECRET_MISSING", "ORDEROPS_AUTH_TOKEN_SECRET is required for local signed-token rehearsal.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while auth is rehearsal-only.");
  return blockers;
}

function collectWarnings(config: Pick<AppConfig, "authTokenSecret">): SignedAuthTokenMessage[] {
  return [
    {
      code: config.authTokenSecret.length > 0 ? "HMAC_REHEARSAL_ONLY" : "TOKEN_REHEARSAL_DISABLED",
      severity: "warning",
      message: config.authTokenSecret.length > 0
        ? "Local HMAC verification proves token contract behavior but is not production IdP validation."
        : "Token samples cannot fully validate signature behavior until ORDEROPS_AUTH_TOKEN_SECRET is supplied.",
    },
  ];
}

function collectRecommendations(): SignedAuthTokenMessage[] {
  return [
    {
      code: "CONNECT_OIDC_PROVIDER",
      severity: "recommendation",
      message: "Connect a real OIDC provider and validate issuer, audience, expiry, and signature keys.",
    },
    {
      code: "AUDIT_VERIFIED_IDENTITY",
      severity: "recommendation",
      message: "Write verified token subject and roles into audit events before production enforcement.",
    },
  ];
}

function addMessage(
  messages: SignedAuthTokenMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function sampleReason(
  samples: SignedAuthTokenSample[],
  id: string,
): Extract<TokenVerificationResult, { accepted: false }>["reason"] | undefined {
  const result = samples.find((sample) => sample.id === id)?.result;
  return result !== undefined && !result.accepted ? result.reason : undefined;
}

function sampleAccepted(samples: SignedAuthTokenSample[], id: string): boolean {
  return samples.find((sample) => sample.id === id)?.result.accepted === true;
}

function parsePayload(encodedPayload: string): TokenPayload | undefined {
  try {
    const value: unknown = JSON.parse(Buffer.from(fromBase64Url(encodedPayload), "base64").toString("utf8"));
    if (!isRecord(value)) {
      return undefined;
    }
    const roles = value.roles;
    if (
      typeof value.iss !== "string"
      || typeof value.sub !== "string"
      || typeof value.exp !== "number"
      || !Array.isArray(roles)
      || !roles.every(isAccessPolicyRole)
    ) {
      return undefined;
    }
    return {
      iss: value.iss,
      sub: value.sub,
      roles,
      exp: value.exp,
    };
  } catch {
    return undefined;
  }
}

function base64UrlJson(value: object): string {
  return toBase64Url(Buffer.from(JSON.stringify(value), "utf8").toString("base64"));
}

function sign(value: string, secret: string): string {
  return toBase64Url(createHmac("sha256", secret).update(value).digest("base64"));
}

function signatureMatches(actual: string, expected: string): boolean {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

function toBase64Url(value: string): string {
  return value.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

function fromBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  return normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");
}

function isAccessPolicyRole(value: unknown): value is AccessPolicyRole {
  return typeof value === "string" && ALLOWED_ROLES.includes(value as AccessPolicyRole);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function renderSample(sample: SignedAuthTokenSample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Purpose: ${sample.purpose}`,
    `- Token present: ${sample.tokenPresent}`,
    `- Required role: ${sample.requiredRole}`,
    `- Result: ${formatValue(sample.result)}`,
    "",
  ];
}

function renderMessages(messages: SignedAuthTokenMessage[], emptyText: string): string[] {
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
