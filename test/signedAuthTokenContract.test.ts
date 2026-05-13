import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createRehearsalToken,
  createSignedAuthTokenContractProfile,
  verifyRehearsalToken,
} from "../src/services/signedAuthTokenContract.js";

const now = new Date("2026-05-13T00:00:00.000Z");

describe("signed auth token contract", () => {
  it("documents signed token success and failure samples without exposing the rehearsal secret", () => {
    const profile = createSignedAuthTokenContractProfile(loadTestConfig(), now);

    expect(profile).toMatchObject({
      profileVersion: "signed-auth-token-contract.v1",
      readyForProductionAuth: false,
      readOnly: true,
      executionAllowed: false,
      contract: {
        tokenFormat: "orderops-hmac-jws-rehearsal",
        issuer: "orderops-test",
        subjectRequired: true,
        rolesRequired: true,
        expiresAtRequired: true,
        signatureRequired: true,
        algorithm: "HS256",
        productionIdentityProvider: "not-connected",
      },
      runtime: {
        secretConfigured: true,
        secretExposed: false,
        validatesSignature: true,
        validatesExpiry: true,
        validatesIssuer: true,
        mapsRolesToAccessGuard: true,
        upstreamActionsEnabled: false,
      },
      checks: {
        issuerConfigured: true,
        secretConfiguredForRehearsal: true,
        missingTokenRejected: true,
        badSignatureRejected: true,
        expiredTokenRejected: true,
        insufficientRoleRejected: true,
        allowedRoleAccepted: true,
        secretNotExposed: true,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        sampleCount: 5,
        acceptedSampleCount: 1,
        rejectedSampleCount: 4,
      },
    });
    expect(JSON.stringify(profile)).not.toContain("test-secret");
    expect(profile.samples.map((sample) => [sample.id, sample.result.statusCode])).toEqual([
      ["missing-token", 401],
      ["bad-signature", 401],
      ["expired-token", 401],
      ["insufficient-role", 403],
      ["allowed-operator", 200],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("REAL_IDP_NOT_CONNECTED");
  });

  it("verifies local HMAC rehearsal tokens for success, bad signature, expiry, and role checks", () => {
    const valid = createRehearsalToken({
      issuer: "orderops-test",
      subject: "operator-1",
      roles: ["operator"],
      expiresAt: new Date(now.getTime() + 60_000),
      secret: "test-secret",
    });
    const expired = createRehearsalToken({
      issuer: "orderops-test",
      subject: "operator-1",
      roles: ["operator"],
      expiresAt: new Date(now.getTime() - 60_000),
      secret: "test-secret",
    });
    const viewer = createRehearsalToken({
      issuer: "orderops-test",
      subject: "viewer-1",
      roles: ["viewer"],
      expiresAt: new Date(now.getTime() + 60_000),
      secret: "test-secret",
    });

    expect(verifyRehearsalToken({
      token: valid,
      issuer: "orderops-test",
      secret: "test-secret",
      requiredRole: "operator",
      now,
    })).toMatchObject({
      accepted: true,
      statusCode: 200,
      subject: "operator-1",
      roles: ["operator"],
    });
    expect(verifyRehearsalToken({
      token: `${valid.slice(0, -3)}bad`,
      issuer: "orderops-test",
      secret: "test-secret",
      requiredRole: "operator",
      now,
    })).toMatchObject({ accepted: false, statusCode: 401, reason: "bad_signature" });
    expect(verifyRehearsalToken({
      token: expired,
      issuer: "orderops-test",
      secret: "test-secret",
      requiredRole: "operator",
      now,
    })).toMatchObject({ accepted: false, statusCode: 401, reason: "expired" });
    expect(verifyRehearsalToken({
      token: viewer,
      issuer: "orderops-test",
      secret: "test-secret",
      requiredRole: "operator",
      now,
    })).toMatchObject({ accepted: false, statusCode: 403, reason: "missing_required_role" });
  });

  it("exposes signed auth token contract routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/signed-auth-token-contract",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/signed-auth-token-contract?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "signed-auth-token-contract.v1",
        runtime: {
          secretConfigured: true,
          secretExposed: false,
        },
        checks: {
          allowedRoleAccepted: true,
          badSignatureRejected: true,
          expiredTokenRejected: true,
        },
      });
      expect(JSON.stringify(json.json())).not.toContain("test-secret");
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Signed auth token contract");
      expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
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
  });
}
