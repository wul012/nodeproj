import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAuthEnforcementRehearsalProfile,
} from "../src/services/authEnforcementRehearsal.js";

describe("auth enforcement rehearsal", () => {
  it("keeps default runtime in observe-only rehearsal mode", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
      });
      const profile = await app.inject({
        method: "GET",
        url: "/api/v1/security/auth-enforcement-rehearsal",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers["x-orderops-access-would-deny"]).toBe("true");
      expect(response.headers["x-orderops-access-enforcement"]).toBe("false");
      expect(profile.statusCode).toBe(200);
      expect(profile.json()).toMatchObject({
        profileVersion: "auth-enforcement-rehearsal.v1",
        readyForProductionAuth: false,
        readOnly: true,
        executionAllowed: false,
        runtime: {
          authMode: "rehearsal",
          accessGuardEnforcementEnabled: false,
          rejectsRequests: false,
          credentialAuthImplemented: false,
          upstreamActionsEnabled: false,
        },
        checks: {
          missingIdentityCanReturn401: true,
          insufficientRoleCanReturn403: true,
          allowedRoleCanPass: true,
          upstreamActionsStillDisabled: true,
        },
      });
    } finally {
      await app.close();
    }
  });

  it("can reject missing identity and insufficient role when rehearsal enforcement is explicitly enabled", async () => {
    const app = await buildApp(loadTestConfig({
      ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    }));

    try {
      const missingIdentity = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
      });
      const insufficientRole = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const allowed = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(missingIdentity.statusCode).toBe(401);
      expect(missingIdentity.json()).toMatchObject({
        error: "ACCESS_GUARD_UNAUTHENTICATED",
        details: {
          routeGroup: "readiness",
          requiredRole: "viewer",
          reason: "missing_identity",
        },
      });
      expect(insufficientRole.statusCode).toBe(403);
      expect(insufficientRole.json()).toMatchObject({
        error: "ACCESS_GUARD_FORBIDDEN",
        details: {
          routeGroup: "audit",
          requiredRole: "auditor",
          matchedRoles: ["viewer"],
          reason: "missing_required_role",
        },
      });
      expect(allowed.statusCode).toBe(200);
      expect(allowed.headers["x-orderops-access-enforcement"]).toBe("true");
    } finally {
      await app.close();
    }
  });

  it("documents 401 and 403 rehearsal samples without claiming production auth", () => {
    const profile = createAuthEnforcementRehearsalProfile(loadTestConfig({
      ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    }));

    expect(profile.runtime).toMatchObject({
      rejectsRequests: true,
      credentialAuthImplemented: false,
      readsSecrets: false,
    });
    expect(profile.samples.map((sample) => [sample.id, sample.enforcement.statusCode])).toEqual([
      ["missing-identity", 401],
      ["insufficient-role", 403],
      ["allowed-auditor", 200],
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "REAL_CREDENTIAL_AUTH_MISSING",
      "AUTH_MODE_REHEARSAL_ONLY",
    ]));
  });
});

function loadTestConfig(overrides: NodeJS.ProcessEnv = {}) {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ...overrides,
  });
}
