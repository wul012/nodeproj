import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAccessControlReadinessProfile,
} from "../src/services/accessControlReadinessProfile.js";

describe("access-control readiness profile", () => {
  it("lists missing auth, RBAC, operator identity, and route protection as production blockers", () => {
    const profile = createAccessControlReadinessProfile({
      upstreamActionsEnabled: false,
    });

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "access-control-readiness-profile.v1",
      readyForProductionAccessControl: false,
      readOnly: true,
      executionAllowed: false,
      currentState: {
        authenticationConfigured: false,
        rbacConfigured: false,
        operatorIdentityCaptured: false,
        auditReadProtected: false,
        mutationRoutesProtected: false,
        corsPolicy: "wildcard",
        upstreamActionsEnabled: false,
      },
      checks: {
        authenticationConfigured: false,
        rbacConfigured: false,
        operatorIdentityCaptured: false,
        auditReadProtected: false,
        mutationRoutesProtected: false,
        upstreamActionsDisabled: true,
        corsPolicyProductionReady: false,
        minimumRoleModelDefined: true,
      },
      summary: {
        productionBlockerCount: 6,
        warningCount: 1,
        recommendationCount: 3,
        requiredRoleCount: 5,
        protectedRouteGroupCount: 0,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "AUTHENTICATION_MISSING",
      "RBAC_MISSING",
      "OPERATOR_IDENTITY_MISSING",
      "AUDIT_READ_UNPROTECTED",
      "MUTATION_ROUTES_UNPROTECTED",
      "CORS_POLICY_WILDCARD",
    ]);
    expect(profile.requiredRoles.map((role) => role.role)).toEqual([
      "viewer",
      "operator",
      "approver",
      "auditor",
      "admin",
    ]);
  });

  it("adds a blocker when upstream actions are enabled before access control exists", () => {
    const profile = createAccessControlReadinessProfile({
      upstreamActionsEnabled: true,
    });

    expect(profile.checks.upstreamActionsDisabled).toBe(false);
    expect(profile.summary.productionBlockerCount).toBe(7);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.warnings).toHaveLength(0);
  });

  it("exposes access-control readiness routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-control-readiness",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-control-readiness?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionAccessControl: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          authenticationConfigured: false,
          rbacConfigured: false,
          upstreamActionsDisabled: true,
          minimumRoleModelDefined: true,
        },
        summary: {
          productionBlockerCount: 6,
          requiredRoleCount: 5,
          protectedRouteGroupCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Access-control readiness profile");
      expect(markdown.body).toContain("AUTHENTICATION_MISSING");
      expect(markdown.body).toContain("### auditor");
      expect(markdown.body).toContain("accessControlReadinessJson");
    } finally {
      await app.close();
    }
  });
});
