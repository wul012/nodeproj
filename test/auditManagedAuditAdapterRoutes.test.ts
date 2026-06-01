import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  managedAuditAdapterAuditJsonMarkdownRoutes,
} from "../src/routes/auditManagedAuditAdapterRoutes.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

describe("managed audit adapter audit route group", () => {
  it("keeps boundary, compliance, and runner routes registered through the shared route table", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-adapter-routes-"));
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
      ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
      ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
      ORDEROPS_IDP_ISSUER: "https://idp.example",
      ORDEROPS_IDP_AUDIENCE: "orderops-node",
      ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
      ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: path.join(directory, "audit.jsonl"),
      AUDIT_STORE_URL: "managed-audit://contract-only",
      PORT: "4443",
    }));
    try {
      const paths = managedAuditAdapterAuditJsonMarkdownRoutes.map((route) => route.path);
      const responses = await Promise.all(paths.flatMap((url) => [
        app.inject({ method: "GET", url, headers: completeHeaders() }),
        app.inject({ method: "GET", url: `${url}?format=markdown`, headers: completeHeaders() }),
      ]));

      expect(paths).toEqual([
        "/api/v1/audit/managed-adapter-boundary",
        "/api/v1/audit/managed-adapter-compliance",
        "/api/v1/audit/managed-adapter-runner",
      ]);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: managedAuditAdapterAuditJsonMarkdownRoutes,
      });
      for (const response of responses) {
        expect(response.statusCode).toBe(200);
      }
      expect(responses[0].json()).toMatchObject({
        profileVersion: "managed-audit-adapter-boundary.v1",
        executionAllowed: false,
        runtimeSelection: {
          selectedBoundaryRuntime: "file",
          managedStoreUrlConfigured: true,
          doesNotOpenNetworkConnection: true,
          doesNotMigrateAuditFiles: true,
        },
        checks: {
          realManagedAdapterConnected: false,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(responses[1].headers["content-type"]).toContain("text/markdown");
      expect(responses[1].body).toContain("# Managed audit adapter boundary");
      expect(responses[2].json()).toMatchObject({
        profileVersion: "managed-audit-adapter-compliance.v1",
        executionAllowed: false,
        checks: {
          appendOnlyWriteCovered: true,
          queryByRequestIdCovered: true,
          noDatabaseConnectionAttempted: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(responses[3].headers["content-type"]).toContain("text/markdown");
      expect(responses[3].body).toContain("# Managed audit adapter compliance");
      expect(responses[4].json()).toMatchObject({
        profileVersion: "managed-audit-adapter-runner.v1",
        executionAllowed: false,
        checks: {
          memoryRunnerPasses: true,
          fileCandidateRunnerPasses: true,
          allRunnerTargetsPass: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(responses[5].headers["content-type"]).toContain("text/markdown");
      expect(responses[5].body).toContain("# Managed audit adapter harness runner");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 60000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-443",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v443-route-split",
  };
}
