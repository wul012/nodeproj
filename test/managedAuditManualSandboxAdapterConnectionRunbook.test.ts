import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxAdapterConnectionRunbook,
} from "../src/services/managedAuditManualSandboxAdapterConnectionRunbook.js";

describe("managed audit manual sandbox adapter connection runbook", () => {
  it("turns the v225 package into a machine-readable manual runbook without connecting audit", () => {
    const profile = loadManagedAuditManualSandboxAdapterConnectionRunbook({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
      runbookState: "manual-sandbox-connection-runbook-ready",
      readyForManagedAuditManualSandboxAdapterConnectionRunbook: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyRunbook: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      localDryRunWritePerformed: false,
      automaticUpstreamStart: false,
      sourceNodeV225: {
        sourceVersion: "Node v225",
        profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
        packageState: "sandbox-adapter-dry-run-package-ready",
        readyForDryRunPackage: true,
        readyForConnectionFromSource: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
        packageForbiddenOperationCount: 8,
        packageEvidenceFileCount: 10,
      },
      manualRunbook: {
        runbookMode: "manual-sandbox-connection-runbook-only",
        manualReviewRequired: true,
        connectionExecutionAllowed: false,
        credentialValueRequired: false,
        credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        ownerApprovalArtifactRequired: true,
        schemaRehearsalRequired: true,
        schemaMigrationExecutionAllowed: false,
        rollbackPathRequired: true,
        timeoutFailureClassificationRequired: true,
        nodeAutoStartAllowed: false,
        externalConnectionOpened: false,
        managedAuditWriteAllowed: false,
        javaLedgerWriteAllowed: false,
        miniKvManagedAuditStateWriteAllowed: false,
      },
      checks: {
        sourcePackageReady: true,
        sourcePackageStillConnectionBlocked: true,
        sourcePackageStillCredentialSafe: true,
        operatorInputsListed: true,
        ownerArtifactInputListed: true,
        credentialHandleInputListed: true,
        schemaRehearsalInputListed: true,
        rollbackPathInputListed: true,
        failureClassificationCovered: true,
        checklistMachineReadable: true,
        forbiddenOperationsMachineReadable: true,
        pauseConditionsMachineReadable: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxAdapterConnectionRunbook: true,
      },
      summary: {
        operatorInputCount: 8,
        checklistStepCount: 8,
        forbiddenOperationCount: 8,
        pauseConditionCount: 8,
        failureClassCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV225.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.manualRunbook.runbookDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.operatorInputs.find((item) => item.id === "sandboxCredentialHandle")).toMatchObject({
      valuePolicy: "identifier-or-handle-only",
      evidenceTarget: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE only; never paste the resolved value.",
    });
    expect(profile.forbiddenOperations.map((operation) => operation.operation)).toContain(
      "Open an external managed audit connection.",
    );
    expect(profile.pauseConditions.map((condition) => condition.code)).toContain("CREDENTIAL_VALUE_REQUESTED");
    expect(profile.failureTaxonomy.map((failureClass) => failureClass.failureClass)).toEqual([
      "closed-window",
      "missing-owner-artifact",
      "credential-value-requested",
      "schema-sql-required",
      "connection-refused",
      "timeout",
      "invalid-response",
      "manual-abort",
    ]);
  });

  it("blocks the runbook when upstream actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxAdapterConnectionRunbook({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.runbookState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxAdapterConnectionRunbook).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.manualRunbook.connectionExecutionAllowed).toBe(false);
  });

  it("exposes JSON and Markdown routes through the shared audit report helper", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook?format=markdown",
        headers: completeHeaders(),
      });
      const routeEntryPointSource = readFileSync("src/routes/auditRoutes.ts", "utf8");
      const routeTableSource = readFileSync("src/routes/auditJsonMarkdownRoutes.ts", "utf8");

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-manual-sandbox-adapter-connection-runbook.v1",
        runbookState: "manual-sandbox-connection-runbook-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit manual sandbox adapter connection runbook");
      expect(markdown.body).toContain("RUNBOOK_ONLY_NO_CONNECTION");
      expect(routeTableSource).toContain("...managedAuditSandboxAdapterAuditJsonMarkdownRoutes");
      expect(routeTableSource).not.toContain("loadManagedAuditManualSandboxAdapterConnectionRunbook");
      expect(routeEntryPointSource).toContain("registerAuditJsonMarkdownRoutes(app, deps, auditJsonMarkdownRoutes)");
      expect(routeEntryPointSource).not.toContain("/api/v1/audit/managed-audit-manual-sandbox-adapter-connection-runbook");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-226",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v226-manual-sandbox-runbook",
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
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4320",
    ...overrides,
  });
}
