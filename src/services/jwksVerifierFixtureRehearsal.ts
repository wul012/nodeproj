import {
  createSign,
  createVerify,
  generateKeyPairSync,
  type KeyObject,
} from "node:crypto";

import type { AppConfig } from "../config.js";

export interface JwksVerifierFixtureRehearsalProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "jwks-verifier-fixture-rehearsal.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  fixture: {
    issuer: string;
    audience: string;
    algorithm: "RS256";
    primaryKid: "orderops-fixture-key-1";
    jwksKeyCount: number;
    publicKeyExposed: true;
    privateKeyExposed: false;
    localOnly: true;
    noJwksNetworkFetch: true;
    noExternalIdpCall: true;
    tokenDoesNotAuthorizeRequests: true;
    realIdpVerifierConnected: false;
    upstreamActionsEnabled: boolean;
  };
  samples: JwksVerifierFixtureSample[];
  checks: {
    idpConfigComplete: boolean;
    localJwksFixtureCreated: boolean;
    acceptedTokenVerified: boolean;
    issuerMismatchRejected: boolean;
    audienceMismatchRejected: boolean;
    expiredTokenRejected: boolean;
    missingRequiredRoleRejected: boolean;
    unknownKidRejected: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    tokenDoesNotAuthorizeRequests: boolean;
    realIdpVerifierConnected: boolean;
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
  productionBlockers: JwksVerifierFixtureMessage[];
  warnings: JwksVerifierFixtureMessage[];
  recommendations: JwksVerifierFixtureMessage[];
  evidenceEndpoints: {
    jwksVerifierFixtureRehearsalJson: string;
    jwksVerifierFixtureRehearsalMarkdown: string;
    idpVerifierBoundaryJson: string;
    signedAuthTokenContractJson: string;
    verifiedIdentityAuditBindingJson: string;
    productionReadinessSummaryV7Json: string;
  };
  nextActions: string[];
}

export interface JwksVerifierFixtureSample {
  id:
    | "accepted-operator"
    | "issuer-mismatch"
    | "audience-mismatch"
    | "expired-token"
    | "missing-required-role"
    | "unknown-kid";
  expected: "accepted" | "rejected";
  actual: "accepted" | "rejected";
  passed: boolean;
  reason: string;
  claims: {
    issuer: string;
    audience: string;
    subject: string;
    roles: string[];
    kid: string;
    expiresAt: string;
  };
}

export interface JwksVerifierFixtureMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

type VerificationReason =
  | "verified"
  | "malformed_token"
  | "invalid_algorithm"
  | "unknown_kid"
  | "issuer_mismatch"
  | "audience_mismatch"
  | "expired"
  | "missing_required_role"
  | "bad_signature";

interface LocalJwksFixture {
  kid: "orderops-fixture-key-1";
  publicKey: KeyObject;
  privateKey: KeyObject;
  publicJwk: Record<string, unknown>;
}

interface FixtureClaims {
  iss: string;
  aud: string;
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
}

interface SignedFixtureToken {
  token: string;
  claims: FixtureClaims;
  kid: string;
}

interface VerificationResult {
  accepted: boolean;
  reason: VerificationReason;
}

const REQUIRED_ROLE = "operator";

const ENDPOINTS = Object.freeze({
  jwksVerifierFixtureRehearsalJson: "/api/v1/security/jwks-verifier-fixture-rehearsal",
  jwksVerifierFixtureRehearsalMarkdown: "/api/v1/security/jwks-verifier-fixture-rehearsal?format=markdown",
  idpVerifierBoundaryJson: "/api/v1/security/idp-verifier-boundary",
  signedAuthTokenContractJson: "/api/v1/security/signed-auth-token-contract",
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
  productionReadinessSummaryV7Json: "/api/v1/production/readiness-summary-v7",
});

export function createJwksVerifierFixtureRehearsalProfile(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "upstreamActionsEnabled">,
): JwksVerifierFixtureRehearsalProfile {
  const fixture = createLocalJwksFixture();
  const issuer = config.idpIssuer;
  const audience = config.idpAudience;
  const now = Math.floor(Date.now() / 1000);
  const samples = createSamples({
    fixture,
    issuer,
    audience,
    now,
  });
  const checks = {
    idpConfigComplete: issuer.length > 0 && audience.length > 0 && config.idpJwksUrl.startsWith("https://"),
    localJwksFixtureCreated: fixture.publicJwk.kid === fixture.kid
      && fixture.publicJwk.alg === "RS256"
      && fixture.publicJwk.use === "sig",
    acceptedTokenVerified: samplePassed(samples, "accepted-operator", "accepted"),
    issuerMismatchRejected: samplePassed(samples, "issuer-mismatch", "rejected"),
    audienceMismatchRejected: samplePassed(samples, "audience-mismatch", "rejected"),
    expiredTokenRejected: samplePassed(samples, "expired-token", "rejected"),
    missingRequiredRoleRejected: samplePassed(samples, "missing-required-role", "rejected"),
    unknownKidRejected: samplePassed(samples, "unknown-kid", "rejected"),
    noJwksNetworkFetch: true,
    noExternalIdpCall: true,
    tokenDoesNotAuthorizeRequests: true,
    realIdpVerifierConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "JWKS verifier fixture rehearsal",
    generatedAt: new Date().toISOString(),
    profileVersion: "jwks-verifier-fixture-rehearsal.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    fixture: {
      issuer,
      audience,
      algorithm: "RS256",
      primaryKid: fixture.kid,
      jwksKeyCount: 1,
      publicKeyExposed: true,
      privateKeyExposed: false,
      localOnly: true,
      noJwksNetworkFetch: true,
      noExternalIdpCall: true,
      tokenDoesNotAuthorizeRequests: true,
      realIdpVerifierConnected: false,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    samples,
    checks,
    summary: {
      sampleCount: samples.length,
      acceptedSampleCount: samples.filter((sample) => sample.actual === "accepted").length,
      rejectedSampleCount: samples.filter((sample) => sample.actual === "rejected").length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Replace the local JWKS fixture with a real JWKS cache and key rotation policy in a dedicated version.",
      "Map verified IdP roles into the access guard only after real issuer, audience, signature, expiry, and role checks pass.",
      "Keep fixture tokens as evidence only; they must not authorize requests in production.",
    ],
  };
}

export function renderJwksVerifierFixtureRehearsalMarkdown(profile: JwksVerifierFixtureRehearsalProfile): string {
  return [
    "# JWKS verifier fixture rehearsal",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Fixture",
    "",
    ...renderEntries(profile.fixture),
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
    ...renderMessages(profile.productionBlockers, "No JWKS fixture rehearsal blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No JWKS fixture rehearsal warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No JWKS fixture rehearsal recommendations."),
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

function createLocalJwksFixture(): LocalJwksFixture {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const publicJwk = publicKey.export({ format: "jwk" }) as Record<string, unknown>;
  publicJwk.kid = "orderops-fixture-key-1";
  publicJwk.alg = "RS256";
  publicJwk.use = "sig";

  return {
    kid: "orderops-fixture-key-1",
    publicKey,
    privateKey,
    publicJwk,
  };
}

function createSamples(input: {
  fixture: LocalJwksFixture;
  issuer: string;
  audience: string;
  now: number;
}): JwksVerifierFixtureSample[] {
  const baseClaims = {
    issuer: input.issuer,
    audience: input.audience,
    subject: "operator-1",
    roles: [REQUIRED_ROLE, "auditor"],
    issuedAt: input.now,
    expiresAt: input.now + 600,
  };
  const sampleInputs = [
    {
      id: "accepted-operator" as const,
      expected: "accepted" as const,
      token: signFixtureToken(input.fixture, baseClaims),
    },
    {
      id: "issuer-mismatch" as const,
      expected: "rejected" as const,
      token: signFixtureToken(input.fixture, {
        ...baseClaims,
        issuer: "https://wrong-idp.example",
      }),
    },
    {
      id: "audience-mismatch" as const,
      expected: "rejected" as const,
      token: signFixtureToken(input.fixture, {
        ...baseClaims,
        audience: "wrong-audience",
      }),
    },
    {
      id: "expired-token" as const,
      expected: "rejected" as const,
      token: signFixtureToken(input.fixture, {
        ...baseClaims,
        issuedAt: input.now - 1200,
        expiresAt: input.now - 60,
      }),
    },
    {
      id: "missing-required-role" as const,
      expected: "rejected" as const,
      token: signFixtureToken(input.fixture, {
        ...baseClaims,
        roles: ["viewer"],
      }),
    },
    {
      id: "unknown-kid" as const,
      expected: "rejected" as const,
      token: signFixtureToken(input.fixture, baseClaims, "unknown-fixture-key"),
    },
  ];

  return sampleInputs.map((sample) => {
    const result = verifyFixtureToken({
      fixture: input.fixture,
      token: sample.token.token,
      issuer: input.issuer,
      audience: input.audience,
      now: input.now,
    });
    const actual = result.accepted ? "accepted" : "rejected";
    return {
      id: sample.id,
      expected: sample.expected,
      actual,
      passed: actual === sample.expected,
      reason: result.reason,
      claims: {
        issuer: sample.token.claims.iss,
        audience: sample.token.claims.aud,
        subject: sample.token.claims.sub,
        roles: [...sample.token.claims.roles],
        kid: sample.token.kid,
        expiresAt: new Date(sample.token.claims.exp * 1000).toISOString(),
      },
    };
  });
}

function signFixtureToken(
  fixture: LocalJwksFixture,
  input: {
    issuer: string;
    audience: string;
    subject: string;
    roles: string[];
    issuedAt: number;
    expiresAt: number;
  },
  kid: string = fixture.kid,
): SignedFixtureToken {
  const header = base64UrlJson({ alg: "RS256", typ: "JWT", kid });
  const claims: FixtureClaims = {
    iss: input.issuer,
    aud: input.audience,
    sub: input.subject,
    roles: input.roles,
    iat: input.issuedAt,
    exp: input.expiresAt,
  };
  const payload = base64UrlJson(claims);
  const signingInput = `${header}.${payload}`;
  const signature = createSign("RSA-SHA256")
    .update(signingInput)
    .end()
    .sign(fixture.privateKey);

  return {
    token: `${signingInput}.${toBase64Url(signature)}`,
    claims,
    kid,
  };
}

function verifyFixtureToken(input: {
  fixture: LocalJwksFixture;
  token: string;
  issuer: string;
  audience: string;
  now: number;
}): VerificationResult {
  const parts = input.token.split(".");
  if (parts.length !== 3) {
    return rejected("malformed_token");
  }

  const header = parseBase64UrlJson(parts[0]);
  const claims = parseBase64UrlJson(parts[1]);
  if (header === undefined || claims === undefined) {
    return rejected("malformed_token");
  }
  if (header.alg !== "RS256") {
    return rejected("invalid_algorithm");
  }
  if (header.kid !== input.fixture.kid) {
    return rejected("unknown_kid");
  }
  if (claims.iss !== input.issuer) {
    return rejected("issuer_mismatch");
  }
  if (claims.aud !== input.audience) {
    return rejected("audience_mismatch");
  }
  if (typeof claims.exp !== "number" || claims.exp <= input.now) {
    return rejected("expired");
  }
  if (!Array.isArray(claims.roles) || !claims.roles.includes(REQUIRED_ROLE)) {
    return rejected("missing_required_role");
  }

  const signatureValid = createVerify("RSA-SHA256")
    .update(`${parts[0]}.${parts[1]}`)
    .end()
    .verify(input.fixture.publicKey, fromBase64Url(parts[2]));
  if (!signatureValid) {
    return rejected("bad_signature");
  }

  return { accepted: true, reason: "verified" };
}

function samplePassed(
  samples: JwksVerifierFixtureSample[],
  id: JwksVerifierFixtureSample["id"],
  expectedActual: JwksVerifierFixtureSample["actual"],
): boolean {
  const sample = samples.find((item) => item.id === id);
  return sample?.passed === true && sample.actual === expectedActual;
}

function collectProductionBlockers(
  checks: JwksVerifierFixtureRehearsalProfile["checks"],
): JwksVerifierFixtureMessage[] {
  const blockers: JwksVerifierFixtureMessage[] = [];
  addMessage(blockers, checks.idpConfigComplete, "IDP_CONFIG_INCOMPLETE", "ORDEROPS_IDP_ISSUER, ORDEROPS_IDP_AUDIENCE, and HTTPS ORDEROPS_IDP_JWKS_URL must be configured.");
  addMessage(blockers, checks.localJwksFixtureCreated, "LOCAL_JWKS_FIXTURE_MISSING", "A local RS256 JWKS fixture must exist before verifier rehearsal.");
  addMessage(blockers, checks.acceptedTokenVerified, "ACCEPTED_TOKEN_NOT_VERIFIED", "The valid fixture token must pass issuer, audience, expiry, role, kid, and signature checks.");
  addMessage(blockers, checks.issuerMismatchRejected, "ISSUER_MISMATCH_NOT_REJECTED", "Issuer mismatch must be rejected.");
  addMessage(blockers, checks.audienceMismatchRejected, "AUDIENCE_MISMATCH_NOT_REJECTED", "Audience mismatch must be rejected.");
  addMessage(blockers, checks.expiredTokenRejected, "EXPIRED_TOKEN_NOT_REJECTED", "Expired token must be rejected.");
  addMessage(blockers, checks.missingRequiredRoleRejected, "MISSING_ROLE_NOT_REJECTED", "Token missing the required operator role must be rejected.");
  addMessage(blockers, checks.unknownKidRejected, "UNKNOWN_KID_NOT_REJECTED", "Unknown JWKS kid must be rejected.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "A real JWKS/OIDC verifier is still required before production auth.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production auth is not connected.");
  return blockers;
}

function collectWarnings(): JwksVerifierFixtureMessage[] {
  return [
    {
      code: "LOCAL_JWKS_FIXTURE_ONLY",
      severity: "warning",
      message: "This rehearsal verifies a local fixture only; it does not fetch JWKS or trust an external IdP.",
    },
  ];
}

function collectRecommendations(): JwksVerifierFixtureMessage[] {
  return [
    {
      code: "IMPLEMENT_JWKS_CACHE_AND_ROTATION",
      severity: "recommendation",
      message: "Add a real JWKS cache with rotation and stale-key handling before production auth.",
    },
    {
      code: "BIND_VERIFIED_CLAIMS_TO_ACCESS_GUARD",
      severity: "recommendation",
      message: "After real verification exists, derive operator identity and roles from verified token claims.",
    },
  ];
}

function addMessage(
  messages: JwksVerifierFixtureMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function rejected(reason: VerificationReason): VerificationResult {
  return { accepted: false, reason };
}

function base64UrlJson(value: object): string {
  return toBase64Url(Buffer.from(JSON.stringify(value), "utf8"));
}

function parseBase64UrlJson(value: string): Record<string, unknown> | undefined {
  try {
    const parsed = JSON.parse(fromBase64Url(value).toString("utf8")) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return undefined;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function toBase64Url(value: Buffer): string {
  return value
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string): Buffer {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padding = "=".repeat((4 - normalized.length % 4) % 4);
  return Buffer.from(`${normalized}${padding}`, "base64");
}

function renderSample(sample: JwksVerifierFixtureSample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Expected: ${sample.expected}`,
    `- Actual: ${sample.actual}`,
    `- Passed: ${sample.passed}`,
    `- Reason: ${sample.reason}`,
    `- Claims: ${formatValue(sample.claims)}`,
    "",
  ];
}

function renderMessages(messages: JwksVerifierFixtureMessage[], emptyText: string): string[] {
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
