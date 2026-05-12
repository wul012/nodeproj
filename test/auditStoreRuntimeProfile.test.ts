import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAuditStoreRuntimeProfile,
} from "../src/services/auditStoreRuntimeProfile.js";

describe("audit store runtime profile", () => {
  it("describes the current in-memory audit runtime and production blockers", () => {
    const profile = createAuditStoreRuntimeProfile({ currentEventCount: 7 });

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "audit-store-runtime-profile.v1",
      safeForCurrentRuntime: true,
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      runtime: {
        instantiatedBy: "src/app.ts:new AuditLog()",
        defaultStore: "InMemoryAuditStore",
        defaultCapacity: 200,
        durableAtRuntime: false,
        currentEventCount: 7,
        configuredByEnvironment: false,
      },
      checks: {
        auditStoreInterfacePresent: true,
        defaultStoreIsInMemory: true,
        fileBackedPrototypeAvailable: true,
        databaseStoreConfigured: false,
        durableRuntimeConfigured: false,
        retentionPolicyConfigured: false,
        migrationRequiredBeforeProduction: true,
      },
      summary: {
        storeCount: 3,
        durablePrototypeCount: 2,
        productionBlockerCount: 3,
        warningCount: 2,
        recommendationCount: 3,
      },
    });
    expect(profile.stores.map((store) => store.id)).toEqual([
      "in-memory",
      "file-backed-prototype",
      "database-required",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "AUDIT_RUNTIME_NOT_DURABLE",
      "DATABASE_AUDIT_STORE_MISSING",
      "AUDIT_RETENTION_POLICY_MISSING",
    ]);
  });

  it("exposes audit store runtime profile routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-profile",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-profile?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForProductionAudit: false,
        readOnly: true,
        executionAllowed: false,
        runtime: {
          defaultStore: "InMemoryAuditStore",
          durableAtRuntime: false,
          configuredByEnvironment: false,
        },
        checks: {
          fileBackedPrototypeAvailable: true,
          durableRuntimeConfigured: false,
          migrationRequiredBeforeProduction: true,
        },
        summary: {
          productionBlockerCount: 3,
          warningCount: 2,
          recommendationCount: 3,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Audit store runtime profile");
      expect(markdown.body).toContain("AUDIT_RUNTIME_NOT_DURABLE");
      expect(markdown.body).toContain("### file-backed-prototype");
      expect(markdown.body).toContain("auditStoreRuntimeProfileJson");
    } finally {
      await app.close();
    }
  });
});
