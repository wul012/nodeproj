import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAuditStoreEnvConfigProfile,
} from "../src/services/auditStoreEnvConfigProfile.js";

describe("audit store env config profile", () => {
  it("reports memory audit store config as a production blocker", () => {
    const profile = createAuditStoreEnvConfigProfile({
      auditStoreKind: "memory",
      auditStorePath: "",
      auditStoreUrl: "",
    });

    expect(profile).toMatchObject({
      service: "orderops-node",
      profileVersion: "audit-store-env-config-profile.v1",
      readyForDurableAuditMigration: false,
      readOnly: true,
      executionAllowed: false,
      config: {
        requestedStoreKind: "memory",
        normalizedStoreKind: "memory",
        auditStorePathConfigured: false,
        auditStoreUrlConfigured: false,
        auditStoreUrlRedacted: "",
        runtimeStillUsesDefaultInMemoryStore: true,
      },
      checks: {
        storeKindRecognized: true,
        currentRuntimeStillInMemory: true,
        durableStoreRequested: false,
        durableStoreWiringImplemented: false,
        noDatabaseConnectionAttempted: true,
        noSecretValueExposed: true,
        migrationRequiredBeforeProduction: true,
      },
      summary: {
        productionBlockerCount: 3,
        warningCount: 0,
        recommendationCount: 3,
      },
    });
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "AUDIT_STORE_KIND_MEMORY",
      "AUDIT_STORE_RUNTIME_NOT_WIRED",
      "AUDIT_STORE_MIGRATION_REQUIRED",
    ]);
  });

  it("redacts database URLs and still blocks because runtime wiring is not implemented", () => {
    const profile = createAuditStoreEnvConfigProfile({
      auditStoreKind: "postgres",
      auditStorePath: "",
      auditStoreUrl: "postgres://user:secret@localhost:5432/orderops",
    });

    expect(profile.config.normalizedStoreKind).toBe("database");
    expect(profile.config.auditStoreUrlConfigured).toBe(true);
    expect(profile.config.auditStoreUrlRedacted).toBe("postgres://redacted:redacted@localhost:5432/orderops");
    expect(profile.checks.databaseStoreUrlReady).toBe(true);
    expect(profile.checks.durableStoreWiringImplemented).toBe(false);
    expect(profile.summary.productionBlockerCount).toBe(2);
    expect(profile.warnings.map((warning) => warning.code)).toContain("AUDIT_STORE_URL_REDACTED");
  });

  it("exposes audit store env config profile routes in JSON and Markdown", async () => {
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: "D:\\audit\\audit.jsonl",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-config-profile",
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-config-profile?format=markdown",
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        readyForDurableAuditMigration: false,
        executionAllowed: false,
        config: {
          normalizedStoreKind: "file",
          auditStorePathConfigured: true,
          runtimeStillUsesDefaultInMemoryStore: false,
        },
        checks: {
          currentRuntimeStillInMemory: false,
          fileStorePathReady: true,
          durableStoreRequested: true,
          durableStoreWiringImplemented: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Audit store env config profile");
      expect(markdown.body).toContain("AUDIT_STORE_MIGRATION_REQUIRED");
      expect(markdown.body).toContain("auditStoreEnvConfigProfileJson");
    } finally {
      await app.close();
    }
  });
});
