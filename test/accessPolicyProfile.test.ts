import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAccessPolicyProfile } from "../src/services/accessPolicyProfile.js";

describe("access policy profile", () => {
  it("defines the access policy map and identity contract without enforcing requests", () => {
    const profile = createAccessPolicyProfile({
      upstreamActionsEnabled: false,
    });

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "access-policy-profile.v1",
      readyForEnforcement: false,
      readOnly: true,
      executionAllowed: false,
      enforcement: {
        mode: "contract-only",
        rejectsRequests: false,
        requiresLogin: false,
        readsSecrets: false,
        upstreamActionsEnabled: false,
      },
      requestIdentityContract: {
        source: "future-auth-middleware",
        requiredForProduction: true,
        currentRuntime: "anonymous-local",
        sample: {
          authenticated: false,
          operatorId: null,
          roles: [],
          authSource: "none",
        },
      },
      checks: {
        identityContractDefined: true,
        routePolicyMapDefined: true,
        readinessRoutesCovered: true,
        auditRoutesRequireAuditor: true,
        mutationRoutesRequireOperatorOrApprover: true,
        archiveRoutesRequireApprover: true,
        noSecretRequired: true,
        enforcementStillDisabled: true,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        roleCount: 5,
        routePolicyCount: 6,
        protectedRouteGroupCount: 6,
        mutationPolicyCount: 3,
        productionBlockerCount: 1,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.routePolicies.map((policy) => policy.id)).toEqual([
      "readiness-and-status",
      "audit-read",
      "operation-intent-mutations",
      "approval-decisions",
      "archive-mutations",
      "upstream-proxy-actions",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "ACCESS_GUARD_NOT_ENFORCED",
    ]);
    expect(profile.nextActions).toContain("Use this policy map as the source for a dry-run access guard in Node v101.");
  });

  it("blocks the policy profile when upstream actions are enabled", () => {
    const profile = createAccessPolicyProfile({
      upstreamActionsEnabled: true,
    });

    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "ACCESS_GUARD_NOT_ENFORCED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("exposes the access policy profile routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/security/access-policy?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForEnforcement: false,
        readOnly: true,
        executionAllowed: false,
        checks: {
          routePolicyMapDefined: true,
          enforcementStillDisabled: true,
          upstreamActionsStillDisabled: true,
        },
        summary: {
          routePolicyCount: 6,
          productionBlockerCount: 1,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Access policy profile");
      expect(markdown.body).toContain("### audit-read");
      expect(markdown.body).toContain("/api/v1/ci/*");
      expect(markdown.body).toContain("ACCESS_GUARD_NOT_ENFORCED");
      expect(markdown.body).toContain("accessPolicyProfileJson");
    } finally {
      await app.close();
    }
  });
});
