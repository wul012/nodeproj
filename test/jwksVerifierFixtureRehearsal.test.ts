import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createJwksVerifierFixtureRehearsalProfile,
} from "../src/services/jwksVerifierFixtureRehearsal.js";

describe("JWKS verifier fixture rehearsal", () => {
  it("verifies local RS256 fixture tokens without connecting a real IdP", () => {
    const profile = createJwksVerifierFixtureRehearsalProfile(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "jwks-verifier-fixture-rehearsal.v1",
      readyForProductionAuth: false,
      readOnly: true,
      executionAllowed: false,
      fixture: {
        issuer: "https://idp.example",
        audience: "orderops-node",
        algorithm: "RS256",
        primaryKid: "orderops-fixture-key-1",
        jwksKeyCount: 1,
        publicKeyExposed: true,
        privateKeyExposed: false,
        localOnly: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        tokenDoesNotAuthorizeRequests: true,
        realIdpVerifierConnected: false,
        upstreamActionsEnabled: false,
      },
      checks: {
        idpConfigComplete: true,
        localJwksFixtureCreated: true,
        acceptedTokenVerified: true,
        issuerMismatchRejected: true,
        audienceMismatchRejected: true,
        expiredTokenRejected: true,
        missingRequiredRoleRejected: true,
        unknownKidRejected: true,
        noJwksNetworkFetch: true,
        noExternalIdpCall: true,
        tokenDoesNotAuthorizeRequests: true,
        realIdpVerifierConnected: false,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        sampleCount: 6,
        acceptedSampleCount: 1,
        rejectedSampleCount: 5,
        productionBlockerCount: 1,
      },
    });
    expect(profile.samples.map((sample) => [sample.id, sample.actual, sample.reason])).toEqual([
      ["accepted-operator", "accepted", "verified"],
      ["issuer-mismatch", "rejected", "issuer_mismatch"],
      ["audience-mismatch", "rejected", "audience_mismatch"],
      ["expired-token", "rejected", "expired"],
      ["missing-required-role", "rejected", "missing_required_role"],
      ["unknown-kid", "rejected", "unknown_kid"],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_IDP_VERIFIER_NOT_CONNECTED",
    ]);
    expect(JSON.stringify(profile)).not.toContain("PRIVATE");
    expect(JSON.stringify(profile)).not.toContain("BEGIN PRIVATE KEY");
  });

  it("reports missing IdP config and enabled upstream actions as blockers", () => {
    const profile = createJwksVerifierFixtureRehearsalProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "true",
      ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
      ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
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

  it("exposes JWKS verifier fixture rehearsal routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-verifier-fixture-rehearsal",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/jwks-verifier-fixture-rehearsal?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "jwks-verifier-fixture-rehearsal.v1",
        checks: {
          acceptedTokenVerified: true,
          expiredTokenRejected: true,
          unknownKidRejected: true,
          noJwksNetworkFetch: true,
          realIdpVerifierConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# JWKS verifier fixture rehearsal");
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
