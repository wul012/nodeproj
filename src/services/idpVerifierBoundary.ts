import type { AppConfig } from "../config.js";

export interface IdpVerifierBoundaryProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "idp-verifier-boundary.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  currentVerifier: {
    localRehearsalVerifier: "orderops-hmac-jws-rehearsal";
    tokenCurrentlyAuthorizesRequests: false;
    productionVerifier: "oidc-jwt-jwks";
    productionVerifierConnected: false;
    doesNotFetchJwks: true;
    doesNotCallExternalIdp: true;
    upstreamActionsEnabled: boolean;
  };
  oidcContract: {
    issuer: string;
    audience: string;
    jwksUrl: string;
    clockSkewSeconds: number;
    requiredClaims: string[];
    acceptedAlgorithms: ["RS256"];
    futureKeyRotationRequired: true;
  };
  verifierStates: IdpVerifierState[];
  checks: {
    localHmacRehearsalVerifierStillAvailable: boolean;
    oidcVerifierBoundaryDefined: boolean;
    issuerConfigured: boolean;
    audienceConfigured: boolean;
    jwksUrlConfigured: boolean;
    jwksUrlUsesHttps: boolean;
    clockSkewConfigured: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    tokenDoesNotAuthorizeRequests: boolean;
    realIdpVerifierConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    verifierStateCount: number;
    requiredClaimCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: IdpVerifierBoundaryMessage[];
  warnings: IdpVerifierBoundaryMessage[];
  recommendations: IdpVerifierBoundaryMessage[];
  evidenceEndpoints: {
    idpVerifierBoundaryJson: string;
    idpVerifierBoundaryMarkdown: string;
    signedAuthTokenContractJson: string;
    verifiedIdentityAuditBindingJson: string;
    productionReadinessSummaryV6Json: string;
  };
  nextActions: string[];
}

export interface IdpVerifierState {
  id: "local-hmac-rehearsal" | "oidc-boundary" | "oidc-connected";
  activeNow: boolean;
  verifiesSignature: boolean;
  fetchesRemoteKeys: boolean;
  authorizesRequests: boolean;
  productionReady: boolean;
  note: string;
}

export interface IdpVerifierBoundaryMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

const REQUIRED_CLAIMS = Object.freeze(["iss", "sub", "aud", "exp", "iat", "roles"]);

const ENDPOINTS = Object.freeze({
  idpVerifierBoundaryJson: "/api/v1/security/idp-verifier-boundary",
  idpVerifierBoundaryMarkdown: "/api/v1/security/idp-verifier-boundary?format=markdown",
  signedAuthTokenContractJson: "/api/v1/security/signed-auth-token-contract",
  verifiedIdentityAuditBindingJson: "/api/v1/security/verified-identity-audit-binding",
  productionReadinessSummaryV6Json: "/api/v1/production/readiness-summary-v6",
});

export function createIdpVerifierBoundaryProfile(
  config: Pick<AppConfig,
    | "authTokenIssuer"
    | "authTokenSecret"
    | "idpIssuer"
    | "idpAudience"
    | "idpJwksUrl"
    | "idpClockSkewSeconds"
    | "upstreamActionsEnabled"
  >,
): IdpVerifierBoundaryProfile {
  const verifierStates = createVerifierStates(config);
  const checks = {
    localHmacRehearsalVerifierStillAvailable: config.authTokenIssuer.length > 0 && config.authTokenSecret.length > 0,
    oidcVerifierBoundaryDefined: REQUIRED_CLAIMS.length === 6,
    issuerConfigured: config.idpIssuer.length > 0,
    audienceConfigured: config.idpAudience.length > 0,
    jwksUrlConfigured: config.idpJwksUrl.length > 0,
    jwksUrlUsesHttps: config.idpJwksUrl.startsWith("https://"),
    clockSkewConfigured: config.idpClockSkewSeconds > 0,
    noJwksNetworkFetch: true,
    noExternalIdpCall: true,
    tokenDoesNotAuthorizeRequests: true,
    realIdpVerifierConnected: false,
    upstreamActionsStillDisabled: config.upstreamActionsEnabled === false,
  };
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings(config);
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "IdP verifier boundary",
    generatedAt: new Date().toISOString(),
    profileVersion: "idp-verifier-boundary.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    currentVerifier: {
      localRehearsalVerifier: "orderops-hmac-jws-rehearsal",
      tokenCurrentlyAuthorizesRequests: false,
      productionVerifier: "oidc-jwt-jwks",
      productionVerifierConnected: false,
      doesNotFetchJwks: true,
      doesNotCallExternalIdp: true,
      upstreamActionsEnabled: config.upstreamActionsEnabled,
    },
    oidcContract: {
      issuer: config.idpIssuer,
      audience: config.idpAudience,
      jwksUrl: config.idpJwksUrl,
      clockSkewSeconds: config.idpClockSkewSeconds,
      requiredClaims: [...REQUIRED_CLAIMS],
      acceptedAlgorithms: ["RS256"],
      futureKeyRotationRequired: true,
    },
    verifierStates,
    checks,
    summary: {
      verifierStateCount: verifierStates.length,
      requiredClaimCount: REQUIRED_CLAIMS.length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Implement an OIDC/JWT verifier that validates issuer, audience, expiry, signature, and roles without using local headers as authority.",
      "Add JWKS cache and key rotation evidence before allowing production auth.",
      "Keep token verification as audit-bound evidence only until the real IdP verifier is connected.",
    ],
  };
}

export function renderIdpVerifierBoundaryMarkdown(profile: IdpVerifierBoundaryProfile): string {
  return [
    "# IdP verifier boundary",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Current Verifier",
    "",
    ...renderEntries(profile.currentVerifier),
    "",
    "## OIDC Contract",
    "",
    ...renderEntries(profile.oidcContract),
    "",
    "## Verifier States",
    "",
    ...profile.verifierStates.flatMap(renderVerifierState),
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
    ...renderMessages(profile.productionBlockers, "No IdP verifier blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No IdP verifier warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No IdP verifier recommendations."),
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

function createVerifierStates(
  config: Pick<AppConfig, "authTokenSecret" | "idpIssuer" | "idpAudience" | "idpJwksUrl">,
): IdpVerifierState[] {
  return [
    {
      id: "local-hmac-rehearsal",
      activeNow: config.authTokenSecret.length > 0,
      verifiesSignature: config.authTokenSecret.length > 0,
      fetchesRemoteKeys: false,
      authorizesRequests: false,
      productionReady: false,
      note: "Local HMAC token verification is useful for rehearsal and audit binding only.",
    },
    {
      id: "oidc-boundary",
      activeNow: config.idpIssuer.length > 0 || config.idpAudience.length > 0 || config.idpJwksUrl.length > 0,
      verifiesSignature: false,
      fetchesRemoteKeys: false,
      authorizesRequests: false,
      productionReady: false,
      note: "OIDC/JWT settings are checked as configuration shape; no JWKS network fetch is attempted.",
    },
    {
      id: "oidc-connected",
      activeNow: false,
      verifiesSignature: false,
      fetchesRemoteKeys: false,
      authorizesRequests: false,
      productionReady: false,
      note: "Future state after a real IdP verifier, JWKS cache, and role mapping are implemented.",
    },
  ];
}

function collectProductionBlockers(
  checks: IdpVerifierBoundaryProfile["checks"],
): IdpVerifierBoundaryMessage[] {
  const blockers: IdpVerifierBoundaryMessage[] = [];
  addMessage(blockers, checks.localHmacRehearsalVerifierStillAvailable, "LOCAL_HMAC_REHEARSAL_DISABLED", "Local HMAC rehearsal token verification should remain available until the real IdP verifier exists.");
  addMessage(blockers, checks.oidcVerifierBoundaryDefined, "OIDC_VERIFIER_BOUNDARY_MISSING", "OIDC verifier boundary must define issuer, audience, JWKS URL, clock skew, and required claims.");
  addMessage(blockers, checks.issuerConfigured, "IDP_ISSUER_MISSING", "ORDEROPS_IDP_ISSUER must be configured before production auth.");
  addMessage(blockers, checks.audienceConfigured, "IDP_AUDIENCE_MISSING", "ORDEROPS_IDP_AUDIENCE must be configured before production auth.");
  addMessage(blockers, checks.jwksUrlConfigured, "IDP_JWKS_URL_MISSING", "ORDEROPS_IDP_JWKS_URL must be configured before production auth.");
  addMessage(blockers, checks.jwksUrlUsesHttps, "IDP_JWKS_URL_NOT_HTTPS", "ORDEROPS_IDP_JWKS_URL must use https.");
  addMessage(blockers, checks.clockSkewConfigured, "IDP_CLOCK_SKEW_MISSING", "ORDEROPS_IDP_CLOCK_SKEW_SECONDS must be configured.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "A real IdP verifier is required before production auth.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production auth is not connected.");
  return blockers;
}

function collectWarnings(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl">,
): IdpVerifierBoundaryMessage[] {
  return [
    {
      code: config.idpIssuer.length > 0 && config.idpAudience.length > 0 && config.idpJwksUrl.length > 0
        ? "OIDC_CONFIG_SHAPE_ONLY"
        : "OIDC_CONFIG_INCOMPLETE",
      severity: "warning",
      message: "This version validates IdP configuration shape only; it does not fetch JWKS or verify external signatures.",
    },
  ];
}

function collectRecommendations(): IdpVerifierBoundaryMessage[] {
  return [
    {
      code: "IMPLEMENT_JWKS_CACHE",
      severity: "recommendation",
      message: "Add JWKS retrieval, cache expiry, key rotation, and signature verification in a dedicated version.",
    },
    {
      code: "MAP_VERIFIED_CLAIMS_TO_ACCESS_GUARD",
      severity: "recommendation",
      message: "After the real verifier exists, derive access guard identity from verified claims instead of local headers.",
    },
  ];
}

function addMessage(
  messages: IdpVerifierBoundaryMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderVerifierState(state: IdpVerifierState): string[] {
  return [
    `### ${state.id}`,
    "",
    `- Active now: ${state.activeNow}`,
    `- Verifies signature: ${state.verifiesSignature}`,
    `- Fetches remote keys: ${state.fetchesRemoteKeys}`,
    `- Authorizes requests: ${state.authorizesRequests}`,
    `- Production ready: ${state.productionReady}`,
    `- Note: ${state.note}`,
    "",
  ];
}

function renderMessages(messages: IdpVerifierBoundaryMessage[], emptyText: string): string[] {
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
