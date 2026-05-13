import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { describeAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import {
  createManagedAuditAdapterBoundaryProfile,
} from "../src/services/managedAuditAdapterBoundary.js";

describe("managed audit adapter boundary", () => {
  it("documents the managed adapter interface without connecting a real adapter", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      AUDIT_STORE_URL: "managed-audit://contract-only",
    });
    const runtime = describeAuditStoreRuntime(config);
    const profile = createManagedAuditAdapterBoundaryProfile({ config, runtime });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-boundary.v1",
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      adapterInterface: {
        name: "ManagedAuditAdapter",
        realImplementationConnected: false,
        backupRestoreDrillImplemented: false,
      },
      runtimeSelection: {
        requestedStoreKind: "memory",
        currentRuntimeStoreKind: "memory",
        selectedBoundaryRuntime: "memory",
        managedStoreUrlConfigured: true,
        wouldUseManagedAdapter: false,
        fallsBackToCurrentRuntime: true,
        doesNotOpenNetworkConnection: true,
        doesNotMigrateAuditFiles: true,
        upstreamActionsEnabled: false,
      },
      checks: {
        adapterInterfaceDefined: true,
        runtimeSelectionDocumented: true,
        memoryRuntimeStateDocumented: true,
        fileRuntimeStateDocumented: true,
        managedUnimplementedStateDocumented: true,
        managedStoreUrlConfigured: true,
        realManagedAdapterConnected: false,
        backupRestoreDrillImplemented: false,
        noDatabaseConnectionAttempted: true,
        noAuditMigrationPerformed: true,
        upstreamActionsStillDisabled: true,
      },
      summary: {
        methodCount: 4,
        runtimeStateCount: 3,
        productionBlockerCount: 2,
      },
    });
    expect(profile.adapterInterface.methods.map((method) => method.name)).toEqual([
      "appendOnlyWrite",
      "queryByRequestId",
      "digest",
      "backupRestoreMarker",
    ]);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
      "MANAGED_AUDIT_BACKUP_RESTORE_DRILL_MISSING",
    ]);
  });

  it("marks database-like store kinds as managed-unimplemented without constructing a database connection", () => {
    const config = loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      AUDIT_STORE_KIND: "database",
      AUDIT_STORE_URL: "postgres://audit.example/orderops",
    });
    const profile = createManagedAuditAdapterBoundaryProfile({
      config,
      runtime: {
        requestedStoreKind: "memory",
        normalizedStoreKind: "memory",
        runtimeStoreKind: "memory",
        storeImplementation: "InMemoryAuditStore",
        durableAtRuntime: false,
        configuredByEnvironment: false,
        capacity: 200,
      },
    });

    expect(profile.runtimeSelection).toMatchObject({
      requestedStoreKind: "database",
      selectedBoundaryRuntime: "managed-unimplemented",
      managedStoreUrlConfigured: true,
      wouldUseManagedAdapter: true,
      fallsBackToCurrentRuntime: false,
      doesNotOpenNetworkConnection: true,
    });
    expect(profile.warnings.map((warning) => warning.code)).toContain("MANAGED_RUNTIME_NOT_CONNECTED");
  });

  it("exposes managed audit adapter boundary routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-managed-adapter-"));
    const app = await buildApp(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
      AUDIT_STORE_KIND: "file",
      AUDIT_STORE_PATH: path.join(directory, "audit.jsonl"),
      AUDIT_STORE_URL: "managed-audit://contract-only",
    }));

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-boundary",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-adapter-boundary?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-boundary.v1",
        runtimeSelection: {
          selectedBoundaryRuntime: "file",
          managedStoreUrlConfigured: true,
          doesNotOpenNetworkConnection: true,
          doesNotMigrateAuditFiles: true,
        },
        checks: {
          adapterInterfaceDefined: true,
          realManagedAdapterConnected: false,
          upstreamActionsStillDisabled: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter boundary");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  });
});
