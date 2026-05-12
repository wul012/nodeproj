import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAccessGuardReadinessProfile,
  evaluateAccessGuard,
  extractRequestIdentityFromHeaders,
  parseOperatorRoles,
} from "../src/services/accessGuard.js";

describe("access guard dry-run", () => {
  it("evaluates policy matches and roles without rejecting requests", () => {
    const anonymous = evaluateAccessGuard({
      method: "GET",
      path: "/api/v1/security/access-policy",
      headers: {},
    });
    const viewer = evaluateAccessGuard({
      method: "GET",
      path: "/api/v1/security/access-policy",
      headers: {
        "x-orderops-operator-id": "viewer-1",
        "x-orderops-roles": "viewer",
      },
    });
    const auditor = evaluateAccessGuard({
      method: "GET",
      path: "/api/v1/audit/events",
      headers: {
        "x-orderops-operator-id": "auditor-1",
        "x-orderops-roles": "auditor",
      },
    });
    const auditorMutation = evaluateAccessGuard({
      method: "POST",
      path: "/api/v1/operation-intents",
      headers: {
        "x-orderops-operator-id": "auditor-1",
        "x-orderops-roles": "auditor",
      },
    });

    expect(anonymous).toMatchObject({
      guardVersion: "access-guard-dry-run.v1",
      mode: "dry-run",
      rejectsRequests: false,
      policyMatched: true,
      policyId: "readiness-and-status",
      routeGroup: "readiness",
      requiredRole: "viewer",
      matchedRoles: [],
      wouldDeny: true,
      reason: "missing_identity",
    });
    expect(viewer).toMatchObject({
      routeGroup: "readiness",
      requiredRole: "viewer",
      matchedRoles: ["viewer"],
      wouldDeny: false,
      reason: "allowed_by_role",
    });
    expect(auditor).toMatchObject({
      routeGroup: "audit",
      requiredRole: "auditor",
      matchedRoles: ["auditor"],
      wouldDeny: false,
      reason: "allowed_by_role",
    });
    expect(auditorMutation).toMatchObject({
      routeGroup: "intent",
      requiredRole: "operator",
      matchedRoles: ["auditor"],
      wouldDeny: true,
      reason: "missing_required_role",
    });
  });

  it("parses header-derived operator identity as a rehearsal contract", () => {
    expect(extractRequestIdentityFromHeaders({})).toMatchObject({
      authenticated: false,
      roles: [],
      authSource: "none",
      rawRoles: [],
      rejectedRoles: [],
    });
    expect(extractRequestIdentityFromHeaders({
      "x-orderops-roles": "operator",
    })).toMatchObject({
      authenticated: false,
      roles: ["operator"],
      authSource: "headers",
      rawRoles: ["operator"],
      rejectedRoles: [],
    });
    expect(extractRequestIdentityFromHeaders({
      "x-orderops-operator-id": "operator-1",
      "x-orderops-roles": "viewer,root,operator,viewer",
    })).toMatchObject({
      authenticated: true,
      operatorId: "operator-1",
      roles: ["viewer", "operator"],
      authSource: "headers",
      rawRoles: ["viewer", "root", "operator", "viewer"],
      rejectedRoles: ["root"],
    });
    expect(parseOperatorRoles("admin,operator,admin,unknown")).toEqual({
      roles: ["admin", "operator"],
      rawRoles: ["admin", "operator", "admin", "unknown"],
      rejectedRoles: ["unknown"],
    });
  });

  it("reports dry-run guard readiness while keeping production enforcement blocked", () => {
    const profile = createAccessGuardReadinessProfile();

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "access-guard-readiness-profile.v1",
      readyForEnforcement: false,
      readOnly: true,
      executionAllowed: false,
      guard: {
        mode: "dry-run",
        rejectsRequests: false,
        sourcePolicyCount: 6,
      },
      checks: {
        dryRunGuardEnabled: true,
        noRequestRejection: true,
        readinessRoutesCovered: true,
        auditRoutesCovered: true,
        intentMutationRoutesCovered: true,
        approvalRoutesCovered: true,
        archiveRoutesCovered: true,
        upstreamProxyActionsCovered: true,
        roleEvaluationImplemented: true,
      },
      summary: {
        routePolicyCount: 6,
        protectedRouteGroupCount: 6,
        productionBlockerCount: 1,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "ACCESS_GUARD_DRY_RUN_ONLY",
    ]);
  });

  it("adds dry-run access evidence headers without blocking protected routes", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const anonymousAudit = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events",
      });
      const viewerPolicy = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
        headers: {
          "x-orderops-operator-id": "viewer-1",
          "x-orderops-roles": "viewer",
        },
      });
      const readiness = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-guard-readiness?format=markdown",
      });

      expect(anonymousAudit.statusCode).toBe(200);
      expect(anonymousAudit.headers["x-orderops-access-guard-mode"]).toBe("dry-run");
      expect(anonymousAudit.headers["x-orderops-access-route-group"]).toBe("audit");
      expect(anonymousAudit.headers["x-orderops-access-required-role"]).toBe("auditor");
      expect(anonymousAudit.headers["x-orderops-access-would-deny"]).toBe("true");
      expect(anonymousAudit.headers["x-orderops-access-reason"]).toBe("missing_identity");

      expect(viewerPolicy.statusCode).toBe(200);
      expect(viewerPolicy.headers["x-orderops-access-route-group"]).toBe("readiness");
      expect(viewerPolicy.headers["x-orderops-access-would-deny"]).toBe("false");

      expect(readiness.statusCode).toBe(200);
      expect(readiness.headers["content-type"]).toContain("text/markdown");
      expect(readiness.body).toContain("# Access guard readiness profile");
      expect(readiness.body).toContain("ACCESS_GUARD_DRY_RUN_ONLY");
    } finally {
      await app.close();
    }
  });
});
