import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { AuditLog, FileBackedAuditStore } from "../src/services/auditLog.js";
import {
  createRehearsalToken,
} from "../src/services/signedAuthTokenContract.js";
import {
  createVerifiedIdentityAuditBindingProfile,
  createVerifiedTokenAuditContext,
} from "../src/services/verifiedIdentityAuditBinding.js";

const now = new Date("2026-05-13T00:00:00.000Z");

describe("verified identity audit binding", () => {
  it("binds accepted and rejected rehearsal token verification into audit-shaped evidence", () => {
    const profile = createVerifiedIdentityAuditBindingProfile(loadTestConfig(), now);

    expect(profile).toMatchObject({
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
        upstreamActionsEnabled: false,
      },
      checks: {
        headerIdentityStillSupported: true,
        acceptedTokenBindsSubject: true,
        acceptedTokenBindsRoles: true,
        acceptedTokenCapturesIssuer: true,
        rejectedTokenCapturesReason: true,
        tokenSecretNotExposed: true,
        futureProductionIdpStillMissing: true,
        tokenDoesNotAuthorizeRequests: true,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        identitySourceCount: 3,
        sampleCount: 3,
        acceptedSampleCount: 1,
        rejectedSampleCount: 2,
      },
    });
    expect(profile.identitySources.map((source) => source.id)).toEqual([
      "header-identity",
      "rehearsal-token-identity",
      "future-production-idp",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("REAL_IDP_NOT_CONNECTED");
    expect(JSON.stringify(profile)).not.toContain("test-secret");
  });

  it("persists optional verified token audit context through the file-backed audit store", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-token-audit-"));
    const filePath = path.join(directory, "audit.jsonl");
    const token = createRehearsalToken({
      issuer: "orderops-test",
      subject: "auditor-1",
      roles: ["auditor"],
      expiresAt: new Date(now.getTime() + 60_000),
      secret: "test-secret",
    });

    try {
      const log = new AuditLog({ capacity: 3, store: new FileBackedAuditStore(filePath, 3) });
      log.record({
        requestId: "req-verified-token",
        method: "GET",
        path: "/api/v1/audit/events",
        statusCode: 200,
        durationMs: 5,
        operatorIdentity: {
          identityVersion: "operator-identity-contract.v1",
          authenticated: true,
          operatorId: "auditor-1",
          roles: ["auditor"],
          authSource: "headers",
          rawRoles: ["auditor"],
          rejectedRoles: [],
          verifiedToken: createVerifiedTokenAuditContext({
            config: loadTestConfig(),
            authorization: `Bearer ${token}`,
            requiredRole: "auditor",
            now,
          }),
        },
      });

      const restored = new AuditLog({ capacity: 3, store: new FileBackedAuditStore(filePath, 3) });

      expect(restored.list()[0]).toMatchObject({
        requestId: "req-verified-token",
        operatorIdentity: {
          verifiedToken: {
            verifiedTokenVersion: "signed-auth-token-audit-binding.v1",
            verification: "accepted",
            subject: "auditor-1",
            roles: ["auditor"],
            issuer: "orderops-test",
          },
        },
      });
      expect(await readFile(filePath, "utf8")).toContain("\"verifiedTokenVersion\":\"signed-auth-token-audit-binding.v1\"");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("exposes verified identity binding routes and records Authorization token context in audit events", async () => {
    const app = await buildApp(loadTestConfig());
    const token = createRehearsalToken({
      issuer: "orderops-test",
      subject: "operator-1",
      roles: ["viewer"],
      expiresAt: new Date(Date.now() + 60_000),
      secret: "test-secret",
    });

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/verified-identity-audit-binding",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/verified-identity-audit-binding?format=markdown",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const request = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
        headers: {
          authorization: `Bearer ${token}`,
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const events = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events?limit=5",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "verified-identity-audit-binding.v1",
        checks: {
          acceptedTokenBindsSubject: true,
          rejectedTokenCapturesReason: true,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Verified identity audit binding");
      expect(markdown.body).toContain("REAL_IDP_NOT_CONNECTED");
      expect(request.statusCode).toBe(200);
      expect(events.json().events[0]).toMatchObject({
        path: "/api/v1/security/access-policy",
        operatorIdentity: {
          operatorId: "viewer-1",
          verifiedToken: {
            verification: "accepted",
            subject: "operator-1",
            roles: ["viewer"],
            issuer: "orderops-test",
          },
        },
      });
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
