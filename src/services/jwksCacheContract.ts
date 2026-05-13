import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";

export interface JwksCacheContractProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "jwks-cache-contract.v1";
  readyForProductionAuth: false;
  readOnly: true;
  executionAllowed: false;
  cache: {
    issuer: string;
    audience: string;
    jwksUrl: string;
    algorithm: "RS256";
    cacheProvider: "local-fixture-cache";
    initialKeyCount: number;
    finalKeyCount: number;
    ttlSeconds: number;
    noJwksNetworkFetch: true;
    noExternalIdpCall: true;
    tokenDoesNotAuthorizeRequests: true;
    realIdpVerifierConnected: false;
    upstreamActionsEnabled: boolean;
  };
  samples: JwksCacheContractSample[];
  checks: {
    idpConfigComplete: boolean;
    cacheHitCovered: boolean;
    unknownKidRejected: boolean;
    expiredCacheRejected: boolean;
    rotationMarkerCovered: boolean;
    noJwksNetworkFetch: boolean;
    noExternalIdpCall: boolean;
    tokenDoesNotAuthorizeRequests: boolean;
    realIdpVerifierConnected: boolean;
    upstreamActionsStillDisabled: boolean;
  };
  summary: {
    sampleCount: number;
    passedSampleCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: JwksCacheContractMessage[];
  warnings: JwksCacheContractMessage[];
  recommendations: JwksCacheContractMessage[];
  evidenceEndpoints: {
    jwksCacheContractJson: string;
    jwksCacheContractMarkdown: string;
    jwksVerifierFixtureRehearsalJson: string;
    idpVerifierBoundaryJson: string;
    productionReadinessSummaryV8Json: string;
  };
  nextActions: string[];
}

export interface JwksCacheContractSample {
  id: "cache-hit" | "unknown-kid" | "expired-cache" | "rotation-marker";
  expected: "hit" | "rejected" | "changed";
  actual: "hit" | "rejected" | "changed";
  passed: boolean;
  reason: "cache_hit" | "unknown_kid" | "cache_expired" | "rotation_marker_changed";
  evidence: {
    kid: string;
    keyCountBefore: number;
    keyCountAfter: number;
    markerBefore: string;
    markerAfter: string;
  };
}

export interface JwksCacheContractMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  message: string;
}

interface CachedJwk {
  kid: string;
  alg: "RS256";
  use: "sig";
  kty: "RSA";
  n: string;
  e: string;
  expiresAt: number;
}

type CacheLookup =
  | { status: "hit"; key: CachedJwk }
  | { status: "rejected"; reason: "unknown_kid" | "cache_expired" };

const TTL_SECONDS = 300;

const ENDPOINTS = Object.freeze({
  jwksCacheContractJson: "/api/v1/security/jwks-cache-contract",
  jwksCacheContractMarkdown: "/api/v1/security/jwks-cache-contract?format=markdown",
  jwksVerifierFixtureRehearsalJson: "/api/v1/security/jwks-verifier-fixture-rehearsal",
  idpVerifierBoundaryJson: "/api/v1/security/idp-verifier-boundary",
  productionReadinessSummaryV8Json: "/api/v1/production/readiness-summary-v8",
});

export function createJwksCacheContractProfile(
  config: Pick<AppConfig, "idpIssuer" | "idpAudience" | "idpJwksUrl" | "upstreamActionsEnabled">,
): JwksCacheContractProfile {
  const now = Math.floor(Date.now() / 1000);
  const cache = new LocalJwksFixtureCache(now);
  const initialKeyCount = cache.size();
  const samples = createSamples(cache, now);
  const checks = {
    idpConfigComplete: config.idpIssuer.length > 0
      && config.idpAudience.length > 0
      && config.idpJwksUrl.startsWith("https://"),
    cacheHitCovered: samplePassed(samples, "cache-hit", "hit"),
    unknownKidRejected: samplePassed(samples, "unknown-kid", "rejected"),
    expiredCacheRejected: samplePassed(samples, "expired-cache", "rejected"),
    rotationMarkerCovered: samplePassed(samples, "rotation-marker", "changed"),
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
    title: "JWKS cache contract",
    generatedAt: new Date().toISOString(),
    profileVersion: "jwks-cache-contract.v1",
    readyForProductionAuth: false,
    readOnly: true,
    executionAllowed: false,
    cache: {
      issuer: config.idpIssuer,
      audience: config.idpAudience,
      jwksUrl: config.idpJwksUrl,
      algorithm: "RS256",
      cacheProvider: "local-fixture-cache",
      initialKeyCount,
      finalKeyCount: cache.size(),
      ttlSeconds: TTL_SECONDS,
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
      passedSampleCount: samples.filter((sample) => sample.passed).length,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    nextActions: [
      "Replace the local fixture cache with a real JWKS cache that fetches, expires, and rotates keys under explicit timeouts.",
      "Keep unknown kid and expired cache failures observable before binding verified claims to access guard decisions.",
      "Keep fixture cache evidence separate from request authorization until the real IdP verifier is connected.",
    ],
  };
}

export function renderJwksCacheContractMarkdown(profile: JwksCacheContractProfile): string {
  return [
    "# JWKS cache contract",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Ready for production auth: ${profile.readyForProductionAuth}`,
    `- Read only: ${profile.readOnly}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    "",
    "## Cache",
    "",
    ...renderEntries(profile.cache),
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
    ...renderMessages(profile.productionBlockers, "No JWKS cache contract blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No JWKS cache contract warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No JWKS cache contract recommendations."),
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

class LocalJwksFixtureCache {
  private readonly keys = new Map<string, CachedJwk>();

  constructor(now: number) {
    this.put(createFixtureKey("orderops-fixture-key-1", now + TTL_SECONDS));
    this.put(createFixtureKey("orderops-expired-key", now - 60));
  }

  lookup(kid: string, now: number): CacheLookup {
    const key = this.keys.get(kid);
    if (key === undefined) {
      return { status: "rejected", reason: "unknown_kid" };
    }
    if (key.expiresAt <= now) {
      return { status: "rejected", reason: "cache_expired" };
    }
    return { status: "hit", key };
  }

  rotate(kid: string, now: number): void {
    this.put(createFixtureKey(kid, now + TTL_SECONDS));
  }

  marker(): string {
    const stableKeys = [...this.keys.values()]
      .map((key) => `${key.kid}:${key.expiresAt}:${key.n}`)
      .sort()
      .join("|");
    return `jwks-rotation-marker:${createHash("sha256").update(stableKeys).digest("hex").slice(0, 16)}`;
  }

  size(): number {
    return this.keys.size;
  }

  private put(key: CachedJwk): void {
    this.keys.set(key.kid, key);
  }
}

function createSamples(cache: LocalJwksFixtureCache, now: number): JwksCacheContractSample[] {
  const keyCountBeforeSamples = cache.size();
  const beforeHitMarker = cache.marker();
  const hit = cache.lookup("orderops-fixture-key-1", now);
  const unknown = cache.lookup("unknown-fixture-key", now);
  const expired = cache.lookup("orderops-expired-key", now);
  const markerBefore = cache.marker();
  const keyCountBeforeRotation = cache.size();
  cache.rotate("orderops-rotated-key-2", now);
  const markerAfter = cache.marker();

  return [
    {
      id: "cache-hit",
      expected: "hit",
      actual: hit.status,
      passed: hit.status === "hit",
      reason: "cache_hit",
      evidence: {
        kid: "orderops-fixture-key-1",
        keyCountBefore: keyCountBeforeSamples,
        keyCountAfter: keyCountBeforeSamples,
        markerBefore: beforeHitMarker,
        markerAfter: beforeHitMarker,
      },
    },
    {
      id: "unknown-kid",
      expected: "rejected",
      actual: unknown.status,
      passed: unknown.status === "rejected" && unknown.reason === "unknown_kid",
      reason: "unknown_kid",
      evidence: {
        kid: "unknown-fixture-key",
        keyCountBefore: keyCountBeforeSamples,
        keyCountAfter: keyCountBeforeSamples,
        markerBefore: beforeHitMarker,
        markerAfter: beforeHitMarker,
      },
    },
    {
      id: "expired-cache",
      expected: "rejected",
      actual: expired.status,
      passed: expired.status === "rejected" && expired.reason === "cache_expired",
      reason: "cache_expired",
      evidence: {
        kid: "orderops-expired-key",
        keyCountBefore: keyCountBeforeSamples,
        keyCountAfter: keyCountBeforeSamples,
        markerBefore: beforeHitMarker,
        markerAfter: beforeHitMarker,
      },
    },
    {
      id: "rotation-marker",
      expected: "changed",
      actual: markerAfter !== markerBefore ? "changed" : "rejected",
      passed: markerAfter !== markerBefore && cache.size() === keyCountBeforeRotation + 1,
      reason: "rotation_marker_changed",
      evidence: {
        kid: "orderops-rotated-key-2",
        keyCountBefore: keyCountBeforeRotation,
        keyCountAfter: cache.size(),
        markerBefore,
        markerAfter,
      },
    },
  ];
}

function createFixtureKey(kid: string, expiresAt: number): CachedJwk {
  const digest = createHash("sha256").update(`${kid}:${expiresAt}`).digest("base64url");
  return {
    kid,
    alg: "RS256",
    use: "sig",
    kty: "RSA",
    n: digest,
    e: "AQAB",
    expiresAt,
  };
}

function samplePassed(
  samples: JwksCacheContractSample[],
  id: JwksCacheContractSample["id"],
  expectedActual: JwksCacheContractSample["actual"],
): boolean {
  const sample = samples.find((item) => item.id === id);
  return sample?.passed === true && sample.actual === expectedActual;
}

function collectProductionBlockers(
  checks: JwksCacheContractProfile["checks"],
): JwksCacheContractMessage[] {
  const blockers: JwksCacheContractMessage[] = [];
  addMessage(blockers, checks.idpConfigComplete, "IDP_CONFIG_INCOMPLETE", "ORDEROPS_IDP_ISSUER, ORDEROPS_IDP_AUDIENCE, and HTTPS ORDEROPS_IDP_JWKS_URL must be configured.");
  addMessage(blockers, checks.cacheHitCovered, "JWKS_CACHE_HIT_NOT_COVERED", "JWKS cache hit contract must be covered.");
  addMessage(blockers, checks.unknownKidRejected, "UNKNOWN_KID_NOT_REJECTED", "Unknown kid must be rejected by the JWKS cache contract.");
  addMessage(blockers, checks.expiredCacheRejected, "EXPIRED_CACHE_NOT_REJECTED", "Expired JWKS cache entries must be rejected.");
  addMessage(blockers, checks.rotationMarkerCovered, "ROTATION_MARKER_NOT_COVERED", "JWKS rotation marker must change when a new key is added.");
  addMessage(blockers, checks.realIdpVerifierConnected, "REAL_IDP_VERIFIER_NOT_CONNECTED", "A real JWKS/OIDC verifier is still required before production auth.");
  addMessage(blockers, checks.upstreamActionsStillDisabled, "UPSTREAM_ACTIONS_ENABLED", "UPSTREAM_ACTIONS_ENABLED must remain false while production auth is not connected.");
  return blockers;
}

function collectWarnings(): JwksCacheContractMessage[] {
  return [
    {
      code: "LOCAL_JWKS_CACHE_ONLY",
      severity: "warning",
      message: "This cache contract uses local fixture keys only; it does not fetch JWKS from an external IdP.",
    },
  ];
}

function collectRecommendations(): JwksCacheContractMessage[] {
  return [
    {
      code: "IMPLEMENT_REAL_JWKS_FETCH_TIMEOUTS",
      severity: "recommendation",
      message: "Add real JWKS fetch timeouts, cache expiry, and stale-key handling before production auth.",
    },
    {
      code: "PERSIST_JWKS_ROTATION_EVIDENCE",
      severity: "recommendation",
      message: "Persist rotation marker evidence with production readiness reports after the real IdP verifier exists.",
    },
  ];
}

function addMessage(
  messages: JwksCacheContractMessage[],
  condition: boolean,
  code: string,
  message: string,
): void {
  if (!condition) {
    messages.push({ code, severity: "blocker", message });
  }
}

function renderSample(sample: JwksCacheContractSample): string[] {
  return [
    `### ${sample.id}`,
    "",
    `- Expected: ${sample.expected}`,
    `- Actual: ${sample.actual}`,
    `- Passed: ${sample.passed}`,
    `- Reason: ${sample.reason}`,
    `- Evidence: ${formatValue(sample.evidence)}`,
    "",
  ];
}

function renderMessages(messages: JwksCacheContractMessage[], emptyText: string): string[] {
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
