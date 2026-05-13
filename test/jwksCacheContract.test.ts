import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createJwksCacheContractProfile,
} from "../src/services/jwksCacheContract.js";

describe("JWKS cache contract", () => {
  it("covers local cache hit, unknown kid, expired cache, and rotation marker", () => {
    const profile = createJwksCacheContractProfile(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "jwks-cache-contract.v1",
      readyForProductionAuth: false,
      readOnly: true,
      executionAllowed: false,
      cache: {
        issuer: "https://idp.example",
        audience: "orderops-node",
        jwksUrl: "https://idp.example/.well-known/jwks.json",
        algorithm: "RS256",
        cacheProvider: "local-fixture-cache",
        initialKeyCount: 2,
        finalKeyCount: 3,
        ttlSeconds: 300,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        tokenDoesNotAuthorizeRequests: true,
        realIdpVerifierConnected: false,
        upstreamActionsEnabled: false,
      },
      checks: {
        idpConfigComplete: true,
        cacheHitCovered: true,
        unknownKidRejected: true,
        expiredCacheRejected: true,
        rotationMarkerCovered: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        tokenDoesNotAuthorizeRequests: true,
        realIdpVerifierConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        sampleCount: 4,
        passedSampleCount: 4,
        productionBlockerCount: 1,
      },
    });
    expect(profile.samples.map((sample) => [sample.id, sample.actual, sample.reason])).toEqual([
      ["cache-hit", "hit", "cache_hit"],
      ["unknown-kid", "rejected", "unknown_kid"],
      ["expired-cache", "rejected", "cache_expired"],
      ["rotation-marker", "changed", "rotation_marker_changed"],
    ]);
    const rotation = profile.samples.find((sample) => sample.id === "rotation-marker");
    expect(rotation?.evidence.keyCountAfter).toBe((rotation?.evidence.keyCountBefore ?? 0) + 1);
    expect(rotation?.evidence.markerAfter).not.toBe(rotation?.evidence.markerBefore);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]);
  });

  it("reports missing IdP config and enabled upstream actions as blockers", () => {
    const profile = createJwksCacheContractProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
    }));

    expect(profile.checks).toMatchObject({
      idpConfigComplete: false,
      realIdpVerifierConnected: false,
      upstreamActionsStillDisabled: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "IDP_CONFIG_INCOMPLETE",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes JWKS cache contract routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-cache-contract",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-cache-contract?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "jwks-cache-contract.v1",
        checks: {
          cacheHitCovered: true,
          unknownKidRejected: true,
          expiredCacheRejected: true,
          rotationMarkerCovered: true,
          noJwksNetworkFetch: true,
          realIdpVerifierConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# JWKS cache contract");
      expect(markdown.body).toContain("REAL_IDP_VERIFIER_NOT_CONNECTED");
    } finally {
      await app.close();
    }
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
  });
}
