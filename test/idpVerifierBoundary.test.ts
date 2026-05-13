import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createIdpVerifierBoundaryProfile,
} from "../src/services/idpVerifierBoundary.js";

describe("IdP verifier boundary", () => {
  it("documents OIDC verifier configuration shape without connecting a real IdP", () => {
    const profile = createIdpVerifierBoundaryProfile(loadTestConfig());

    expect(profile).toMatchObject({
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
        upstreamActionsEnabled: false,
      },
      oidcContract: {
        issuer: "https://idp.example",
        audience: "orderops-node",
        jwksUrl: "https://idp.example/.well-known/jwks.json",
        clockSkewSeconds: 90,
        requiredClaims: ["iss", "sub", "aud", "exp", "iat", "roles"],
        acceptedAlgorithms: ["RS256"],
        futureKeyRotationRequired: true,
      },
      checks: {
        localHmacRehearsalVerifierStillAvailable: true,
        oidcVerifierBoundaryDefined: true,
        issuerConfigured: true,
        audienceConfigured: true,
        jwksUrlConfigured: true,
        jwksUrlUsesHttps: true,
        clockSkewConfigured: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        tokenDoesNotAuthorizeRequests: true,
        realIdpVerifierConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        verifierStateCount: 3,
        requiredClaimCount: 6,
        productionBlockerCount: 1,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]);
    expect(JSON.stringify(profile)).not.toContain("test-secret");
  });

  it("reports missing OIDC settings as production auth blockers", () => {
    const profile = createIdpVerifierBoundaryProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
      ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    }));

    expect(profile.checks).toMatchObject({
      issuerConfigured: false,
      audienceConfigured: false,
      jwksUrlConfigured: false,
      jwksUrlUsesHttps: false,
      realIdpVerifierConnected: false,
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "IDP_ISSUER_MISSING",
      "IDP_AUDIENCE_MISSING",
      "IDP_JWKS_URL_MISSING",
      "IDP_JWKS_URL_NOT_HTTPS",
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]));
  });

  it("exposes IdP verifier boundary routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/idp-verifier-boundary",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/idp-verifier-boundary?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "idp-verifier-boundary.v1",
        checks: {
          issuerConfigured: true,
          audienceConfigured: true,
          jwksUrlUsesHttps: true,
          noJwksNetworkFetch: true,
          realIdpVerifierConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# IdP verifier boundary");
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
