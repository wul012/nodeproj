import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createOperatorIdentityContractProfile,
} from "../src/services/operatorIdentityContract.js";

describe("operator identity contract", () => {
  it("describes header-derived identity as a rehearsal-only contract", () => {
    const profile = createOperatorIdentityContractProfile();

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "operator-identity-contract.v1",
      readyForProductionAuth: false,
      readOnly: true,
      executionAllowed: false,
      currentRuntime: {
        source: "headers",
        rejectsRequests: false,
        readsSecrets: false,
        writesAuditContext: true,
        productionReplacement: "auth-middleware",
      },
      headerContract: {
        operatorIdHeader: "x-orderops-operator-id",
        rolesHeader: "x-orderops-roles",
        allowedRoles: ["viewer", "operator", "approver", "auditor", "admin"],
        invalidRolePolicy: "filter-and-record",
      },
      checks: {
        parserAvailable: true,
        anonymousWhenHeadersMissing: true,
        authenticatedRequiresOperatorId: true,
        invalidRolesFiltered: true,
        duplicateRolesDeduplicated: true,
        adminIncludesAllRolesInGuard: true,
        noSecretRequired: true,
        auditContextWritable: true,
      },
      summary: {
        allowedRoleCount: 5,
        sampleCount: 5,
        rejectedSampleRoleCount: 1,
        productionBlockerCount: 2,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "AUTH_MIDDLEWARE_MISSING",
      "IDENTITY_NOT_ENFORCED",
    ]);
  });

  it("writes operator identity context to audit events and exposes the contract route", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const contract = await app.inject({
        method: "GET",
        url: "/api/v1/security/operator-identity-contract?format=markdown",
      });
      const request = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
        headers: {
          "x-orderops-operator-id": "operator-1",
          "x-orderops-roles": "viewer,root,operator",
        },
      });
      const events = await app.inject({
        method: "GET",
        url: "/api/v1/audit/events?limit=5",
      });

      expect(contract.statusCode).toBe(200);
      expect(contract.headers["content-type"]).toContain("text/markdown");
      expect(contract.body).toContain("# Operator identity contract");
      expect(contract.body).toContain("AUTH_MIDDLEWARE_MISSING");

      expect(request.statusCode).toBe(200);
      expect(events.json().events[0]).toMatchObject({
        path: "/api/v1/security/access-policy",
        operatorIdentity: {
          identityVersion: "operator-identity-contract.v1",
          authenticated: true,
          operatorId: "operator-1",
          roles: ["viewer", "operator"],
          authSource: "headers",
          rawRoles: ["viewer", "root", "operator"],
          rejectedRoles: ["root"],
        },
        accessGuard: {
          routeGroup: "readiness",
          requiredRole: "viewer",
          matchedRoles: ["viewer", "operator"],
          wouldDeny: false,
          reason: "allowed_by_role",
        },
      });
    } finally {
      await app.close();
    }
  });
});
