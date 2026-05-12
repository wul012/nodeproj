import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createAuditStoreRuntime,
  describeAuditStoreRuntime,
} from "../src/services/auditStoreFactory.js";

describe("audit store factory", () => {
  it("keeps memory as the default runtime store", () => {
    const runtime = createAuditStoreRuntime({
      auditStoreKind: "memory",
      auditStorePath: "",
      auditStoreUrl: "",
    });

    runtime.auditLog.record({
      requestId: "req-memory",
      method: "GET",
      path: "/health",
      statusCode: 200,
      durationMs: 1,
    });

    expect(runtime.description).toMatchObject({
      requestedStoreKind: "memory",
      normalizedStoreKind: "memory",
      runtimeStoreKind: "memory",
      storeImplementation: "InMemoryAuditStore",
      durableAtRuntime: false,
      configuredByEnvironment: false,
      capacity: 200,
    });
    expect(runtime.auditLog.summary().total).toBe(1);
  });

  it("uses file-backed audit runtime when AUDIT_STORE_KIND=file", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-audit-factory-"));
    const filePath = path.join(directory, "audit.jsonl");

    try {
      const runtime = createAuditStoreRuntime({
        auditStoreKind: "file",
        auditStorePath: filePath,
        auditStoreUrl: "",
      });
      runtime.auditLog.record({
        requestId: "req-file",
        method: "GET",
        path: "/api/v1/audit/summary",
        statusCode: 200,
        durationMs: 2,
      });
      const restored = createAuditStoreRuntime({
        auditStoreKind: "file",
        auditStorePath: filePath,
        auditStoreUrl: "",
      });

      expect(runtime.description).toMatchObject({
        requestedStoreKind: "file",
        normalizedStoreKind: "file",
        runtimeStoreKind: "file",
        storeImplementation: "FileBackedAuditStore",
        durableAtRuntime: true,
        configuredByEnvironment: true,
        auditStorePath: filePath,
      });
      expect(restored.auditLog.list().map((event) => event.requestId)).toEqual(["req-file"]);
      expect(await readFile(filePath, "utf8")).toContain("\"requestId\":\"req-file\"");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("requires AUDIT_STORE_PATH for file runtime", () => {
    expect(() => describeAuditStoreRuntime({
      auditStoreKind: "file",
      auditStorePath: "",
      auditStoreUrl: "",
    })).toThrow("AUDIT_STORE_PATH is required when AUDIT_STORE_KIND=file");
  });

  it("wires file-backed audit runtime into the app profile and persists request audit", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-audit-app-"));
    const filePath = path.join(directory, "audit.jsonl");
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: filePath,
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    try {
      const health = await app.inject({
        method: "GET",
        url: "/health",
      });
      const profile = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-profile",
      });
      const configProfile = await app.inject({
        method: "GET",
        url: "/api/v1/audit/store-config-profile",
      });

      expect(health.statusCode).toBe(200);
      expect(profile.json()).toMatchObject({
        readyForProductionAudit: false,
        runtime: {
          defaultStore: "FileBackedAuditStore",
          durableAtRuntime: true,
          configuredByEnvironment: true,
          requestedStoreKind: "file",
          runtimeStoreKind: "file",
          auditStorePath: filePath,
        },
        checks: {
          durableRuntimeConfigured: true,
          retentionPolicyConfigured: false,
        },
        summary: {
          productionBlockerCount: 2,
        },
      });
      expect(configProfile.json()).toMatchObject({
        config: {
          normalizedStoreKind: "file",
          auditStorePathConfigured: true,
          runtimeStillUsesDefaultInMemoryStore: false,
        },
        checks: {
          currentRuntimeStillInMemory: false,
          durableStoreWiringImplemented: true,
        },
      });
      expect(await readFile(filePath, "utf8")).toContain("\"path\":\"/health\"");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});
