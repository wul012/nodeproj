import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  DisabledManagedAuditAdapter,
  loadManagedAuditAdapterDisabledShell,
  selectManagedAuditAdapterShell,
} from "../src/services/managedAuditAdapterDisabledShell.js";

describe("managed audit adapter disabled shell", () => {
  it("defines the minimal adapter surface and keeps the disabled implementation as the default", async () => {
    const profile = await loadManagedAuditAdapterDisabledShell({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-adapter-disabled-shell.v1",
      shellState: "disabled-shell-ready",
      readyForManagedAuditAdapterDisabledShell: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyShell: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      automaticUpstreamStart: false,
      sourcePrecheck: {
        sourceVersion: "Node v219",
        profileVersion: "managed-audit-adapter-implementation-precheck-packet.v1",
        precheckState: "ready-for-implementation-precheck-review",
        readyForImplementationPrecheck: true,
      },
      adapterInterface: {
        name: "ManagedAuditAdapter",
        methodNames: ["append", "query", "digest", "health", "describe"],
        methodCount: 5,
        minimalSurface: true,
      },
      adapterSelection: {
        defaultAdapterKind: "disabled",
        selectedAdapterKind: "disabled",
        acceptedCandidateKinds: ["disabled", "local-dry-run"],
        requestedStoreKind: "memory",
        auditStoreUrlConfigured: true,
        productionExternalUrlAccepted: false,
        localDryRunCandidateDeclared: true,
        localDryRunSelected: false,
        externalManagedAuditAccessed: false,
        localDryRunWritePerformed: false,
        upstreamActionsEnabled: false,
      },
      disabledAdapterProbe: {
        descriptionAdapterKind: "disabled",
        healthStatus: "disabled",
        appendStatus: "disabled",
        appendAccepted: false,
        appendWritten: false,
        queryStatus: "disabled",
        queryRecordCount: 0,
        digestStatus: "disabled",
        externalConnectionAttempted: false,
      },
      checks: {
        sourcePrecheckReady: true,
        interfaceMethodSurfaceMinimal: true,
        disabledAdapterSelectedByDefault: true,
        localDryRunCandidateOnlyDeclared: true,
        productionExternalUrlRejected: true,
        disabledAppendDoesNotWrite: true,
        disabledQueryReturnsNoRecords: true,
        disabledHealthReportsDisabled: true,
        disabledDescribeReportsDisabled: true,
        disabledDigestStable: true,
        noLocalDryRunWritePerformed: true,
        noExternalManagedAuditAccessed: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        readyForManagedAuditAdapterDisabledShell: true,
      },
      summary: {
        methodCount: 5,
        acceptedCandidateKindCount: 2,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourcePrecheck.precheckDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.disabledAdapterProbe.digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("refuses append and query directly through the disabled adapter", async () => {
    const adapter = new DisabledManagedAuditAdapter();

    const append = await adapter.append({
      requestId: "request-disabled",
      eventType: "SHOULD_NOT_WRITE",
      payload: { allowed: false },
    });
    const query = await adapter.query({ requestId: "request-disabled" });
    const health = await adapter.health();
    const description = await adapter.describe();
    const digest = await adapter.digest();

    expect(append).toMatchObject({
      status: "disabled",
      accepted: false,
      written: false,
      code: "MANAGED_AUDIT_ADAPTER_DISABLED",
    });
    expect(query).toEqual({
      status: "disabled",
      records: [],
      recordCount: 0,
      code: "MANAGED_AUDIT_ADAPTER_DISABLED",
    });
    expect(health).toMatchObject({
      status: "disabled",
      writable: false,
      externalConnectionAttempted: false,
    });
    expect(description).toMatchObject({
      adapterName: "DisabledManagedAuditAdapter",
      adapterKind: "disabled",
      appendEnabled: false,
      queryEnabled: false,
      externalConnectionEnabled: false,
      localDryRunEnabled: false,
    });
    expect(digest.digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("blocks the profile if upstream actions are enabled while still selecting disabled", async () => {
    const profile = await loadManagedAuditAdapterDisabledShell({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.shellState).toBe("blocked");
    expect(profile.readyForManagedAuditAdapterDisabledShell).toBe(false);
    expect(profile.adapterSelection.selectedAdapterKind).toBe("disabled");
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.disabledAdapterProbe.appendWritten).toBe(false);
    expect(profile.connectsManagedAudit).toBe(false);
  });

  it("does not accept production external URLs in the selector", () => {
    const { adapter, selection } = selectManagedAuditAdapterShell({
      config: loadTestConfig({
        AUDIT_STORE_KIND: "database",
        AUDIT_STORE_URL: "postgres://user:secret@localhost:5432/orderops",
      }),
    });

    expect(adapter).toBeInstanceOf(DisabledManagedAuditAdapter);
    expect(selection).toMatchObject({
      defaultAdapterKind: "disabled",
      selectedAdapterKind: "disabled",
      requestedStoreKind: "database",
      auditStoreUrlConfigured: true,
      productionExternalUrlAccepted: false,
      externalManagedAuditAccessed: false,
      localDryRunWritePerformed: false,
    });
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-disabled-shell",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-adapter-disabled-shell?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-adapter-disabled-shell.v1",
        shellState: "disabled-shell-ready",
        adapterSelection: {
          selectedAdapterKind: "disabled",
          localDryRunSelected: false,
        },
        disabledAdapterProbe: {
          appendWritten: false,
          queryRecordCount: 0,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit adapter disabled shell");
      expect(markdown.body).toContain('["append","query","digest","health","describe"]');
      expect(markdown.body).toContain("LOCAL_DRY_RUN_DEFERRED_TO_V221");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-220",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v220-disabled-shell",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
  return loadConfig({
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
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_KIND: "memory",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4316",
    ...overrides,
  });
}
