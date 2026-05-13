import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { MiniKvClient } from "../src/clients/miniKvClient.js";
import { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { createAuditStoreRuntime } from "../src/services/auditStoreFactory.js";
import { loadProductionConnectionDryRunChangeRequest } from "../src/services/productionConnectionDryRunChangeRequest.js";
import { ProductionConnectionDryRunApprovalLedger } from "../src/services/productionConnectionDryRunApprovalLedger.js";
import {
  loadProductionLiveProbeRealReadSmokeDryRunCommandPackage,
} from "../src/services/productionLiveProbeRealReadSmokeDryRunCommandPackage.js";

describe("production live probe real-read smoke dry-run command package", () => {
  it("bundles execution request, result importer, and release gate digests into an operator package", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-dry-run-package-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"));
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v147 dry-run command package evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeDryRunCommandPackage({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
        packageState: "ready-for-operator-review",
        readyForDryRunPackage: true,
        readyForRealPassCapture: false,
        readyForProductionOperations: false,
        readOnly: true,
        executionAllowed: false,
        package: {
          releaseGateDecision: "not-production-pass-evidence",
          upstreamProbesEnabled: false,
          upstreamActionsEnabled: false,
          dryRunOnly: true,
          startsJavaAutomatically: false,
          startsMiniKvAutomatically: false,
          mutatesUpstreamState: false,
        },
        checks: {
          executionRequestReady: true,
          executionRequestDigestValid: true,
          resultImporterReady: true,
          resultImportDigestValid: true,
          releaseEvidenceGateReady: true,
          releaseEvidenceGateDigestValid: true,
          releaseGateStillNotProductionPass: true,
          upstreamActionsStillDisabled: true,
          startsNoUpstreamsAutomatically: true,
          dryRunPackageOnly: true,
          readyForDryRunPackage: true,
        },
        summary: {
          operatorStepCount: 6,
          manualStepCount: 3,
          nodeStepCount: 3,
          productionBlockerCount: 0,
        },
      });
      expect(profile.package.packageDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.package.executionRequestDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.package.resultImportDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.package.releaseEvidenceGateDigest).toMatch(/^[a-f0-9]{64}$/);
      expect(profile.operatorSteps.map((step) => [step.id, step.status])).toEqual([
        ["review-execution-request", "ready"],
        ["review-result-importer", "ready"],
        ["review-release-evidence-gate", "ready"],
        ["confirm-read-only-window-requirements", "manual-required"],
        ["prepare-manual-upstream-start", "manual-required"],
        ["defer-real-pass-capture", "manual-required"],
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("blocks the package when upstream write actions are enabled", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-dry-run-package-blocked-"));
    const config = loadTestConfig(path.join(directory, "audit.jsonl"), {
      UPSTREAM_ACTIONS_ENABLED: "true",
    });
    const runtime = createAuditStoreRuntime(config);
    const ledger = new ProductionConnectionDryRunApprovalLedger();

    try {
      await approveCurrentChangeRequest(config, runtime, ledger, "approve v147 blocked dry-run command package evidence");
      const profile = await loadProductionLiveProbeRealReadSmokeDryRunCommandPackage({
        config,
        auditLog: runtime.auditLog,
        auditStoreRuntime: runtime.description,
        productionConnectionDryRunApprovals: ledger,
        orderPlatform: new OrderPlatformClient(config.orderPlatformUrl, config.orderPlatformTimeoutMs),
        miniKv: new MiniKvClient(config.miniKvHost, config.miniKvPort, config.miniKvTimeoutMs),
      });

      expect(profile.packageState).toBe("blocked");
      expect(profile.readyForDryRunPackage).toBe(false);
      expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
      expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);

  it("exposes dry-run package routes in JSON and Markdown", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "orderops-live-probe-dry-run-package-route-"));
    const app = await buildApp(loadTestConfig(path.join(directory, "audit.jsonl")));

    try {
      const headers = {
        "x-orderops-operator-id": "approver-1",
        "x-orderops-roles": "approver",
      };
      const changeRequest = await app.inject({
        method: "GET",
        url: "/api/v1/production/connection-dry-run-change-request",
        headers,
      });
      await app.inject({
        method: "POST",
        url: "/api/v1/production/connection-dry-run-approvals",
        headers,
        payload: {
          decision: "approve",
          reviewer: "approver-1",
          reason: "approve v147 route evidence",
          changeRequestDigest: changeRequest.json().changeRequest.changeRequestDigest,
        },
      });
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package",
        headers,
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/production/live-probe-real-read-smoke-dry-run-command-package?format=markdown",
        headers,
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-live-probe-real-read-smoke-dry-run-command-package.v1",
        packageState: "ready-for-operator-review",
        readyForDryRunPackage: true,
        readyForRealPassCapture: false,
        package: {
          releaseGateDecision: "not-production-pass-evidence",
          dryRunOnly: true,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Production live probe real-read smoke dry-run command package");
      expect(markdown.body).toContain("DRY_RUN_PACKAGE_ONLY");
      expect(markdown.body).toContain("prepare-manual-upstream-start");
    } finally {
      await app.close();
      await rm(directory, { recursive: true, force: true });
    }
  }, 20000);
});

async function approveCurrentChangeRequest(
  config: ReturnType<typeof loadConfig>,
  runtime: ReturnType<typeof createAuditStoreRuntime>,
  ledger: ProductionConnectionDryRunApprovalLedger,
  reason: string,
): Promise<void> {
  const changeRequest = await loadProductionConnectionDryRunChangeRequest({
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
  await ledger.create({
    decision: "approve",
    reviewer: "live-probe-dry-run-command-package",
    reason,
    changeRequestDigest: changeRequest.changeRequest.changeRequestDigest,
  }, {
    config,
    auditLog: runtime.auditLog,
    auditStoreRuntime: runtime.description,
  });
}

function loadTestConfig(auditStorePath: string, overrides: Record<string, string> = {}) {
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
    AUDIT_STORE_KIND: "file",
    AUDIT_STORE_PATH: auditStorePath,
    AUDIT_STORE_URL: "managed-audit://contract-only",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    ...overrides,
  });
}
