import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditSandboxAdapterDryRunPackage,
} from "../src/services/managedAuditSandboxAdapterDryRunPackage.js";

describe("managed audit sandbox adapter dry-run package", () => {
  it("packages Node v224, Java v82, and mini-kv sandbox guard evidence without connecting audit", () => {
    const profile = loadManagedAuditSandboxAdapterDryRunPackage({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
      packageState: "sandbox-adapter-dry-run-package-ready",
      readyForManagedAuditSandboxAdapterDryRunPackage: true,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyPackage: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      localDryRunWritePerformed: false,
      automaticUpstreamStart: false,
      sourceNodeV224: {
        sourceVersion: "Node v224",
        profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
        planState: "sandbox-adapter-dry-run-plan-ready",
        readyForDryRunPlan: true,
        readyForDryRunPackageBeforeV225: false,
        qualityGatesExported: true,
      },
      upstreamGuards: {
        javaV82: {
          sourceVersion: "Java v82",
          currentHeadVersionHint: "Java v85",
          receiptVersion: "java-release-approval-rehearsal-managed-audit-sandbox-adapter-approval-schema-guard-receipt.v1",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v16",
          consumedByNodeSandboxPlanVersion: "Node v224",
          nextNodePackageVersion: "Node v225",
          readyForNodeV225SandboxAdapterDryRunPackage: true,
          ownerApprovalArtifactRequired: true,
          ownerApprovalArtifactProvidedByJava: false,
          schemaMigrationRehearsalRequired: true,
          schemaMigrationSqlExecutedByJava: false,
          sandboxCredentialHandleRequired: true,
          sandboxCredentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
          credentialValueReadByJava: false,
          externalManagedAuditConnectionOpened: false,
          javaManagedAuditStoreWritten: false,
          javaSqlExecuted: false,
          builderOrHelperSplitApplied: true,
          longBooleanConstructorAvoided: true,
          receiptFieldsGroupedByBoundary: true,
          opsEvidenceServiceOnlyWiresReceipt: true,
          readyForProductionAudit: false,
        },
        miniKvSandboxGuard: {
          sourceVersion: "mini-kv v91",
          currentReleaseVersion: "v94",
          currentProjectVersion: "0.94.0",
          receiptConsumer: "Node v225 managed audit sandbox adapter dry-run package",
          consumedByNodeSandboxPlanVersion: "Node v224",
          consumedReleaseVersion: "v90",
          consumedArtifactPathHint: "c/90/",
          consumedReceiptDigest: "fnv1a64:0dfb07cd2f8de289",
          currentArtifactPathHint: "c/94/",
          receiptDigest: "fnv1a64:41e870043630f686",
          runtimeRole: "runtime evidence provider only",
          readOnly: true,
          executionAllowed: false,
          sandboxAdapterStorageBackend: false,
          participatesInSandboxAdapter: false,
          credentialValueRequired: false,
          credentialValueReadAllowed: false,
          productionCredentialReadAllowed: false,
          schemaMigrationExecutionAllowed: false,
          sandboxManagedAuditStateWriteAllowed: false,
          writeHandlerChanged: false,
          adminHandlerChanged: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          managedAuditWriteExecuted: false,
          sandboxDryRunRecordsWritten: false,
          orderAuthoritative: false,
          qualityChain: {
            v91RuntimeEvidenceHelperUsed: true,
            v92ManagedAuditReceiptFormatterSplit: true,
            v93RuntimeEvidenceReceiptFormatterSplit: true,
            v94CommandFormatterSplit: true,
          },
        },
      },
      packagePlan: {
        evidenceSpan: "Node v224 + Java v82 + mini-kv v91/v94",
        packageMode: "sandbox-dry-run-package-only",
        sandboxOnly: true,
        packageReadyButConnectionStillBlocked: true,
        credentialHandleRequired: true,
        credentialValueRequired: false,
        schemaMigrationExecutionAllowed: false,
        externalConnectionExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        miniKvStorageBackendAllowed: false,
        javaApprovalLedgerWriteAllowed: false,
        externalServiceStartAllowed: false,
      },
      checks: {
        nodeV224PlanReady: true,
        nodeV224StillReadOnly: true,
        javaV82EvidencePresent: true,
        javaV82ReceiptAccepted: true,
        javaV82QualityGateAccepted: true,
        javaV82NoWriteNoCredentialNoSqlBoundaryValid: true,
        miniKvRuntimeEvidencePresent: true,
        miniKvSandboxReceiptAccepted: true,
        miniKvNonParticipationBoundaryValid: true,
        miniKvQualityChainAccepted: true,
        packageEvidenceComplete: true,
        packageStillConnectionBlocked: true,
        credentialValueStillForbidden: true,
        schemaMigrationStillBlocked: true,
        managedAuditWritesStillBlocked: true,
        automaticServiceStartStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditSandboxAdapterDryRunPackage: true,
      },
      summary: {
        evidenceFileCount: 9,
        snippetMatchCount: 20,
        requiredEvidenceCount: 7,
        packageStepCount: 5,
        forbiddenOperationCount: 8,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV224.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.packagePlan.packageDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.archivedEvidence.snippetMatches.every((snippet) => snippet.matched)).toBe(true);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditSandboxAdapterDryRunPackage({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.packageState).toBe("blocked");
    expect(profile.readyForManagedAuditSandboxAdapterDryRunPackage).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.readyForProductionAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes for v225 package and migrated legacy routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const packageJson = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package",
        headers: completeHeaders(),
      });
      const packageMarkdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-package?format=markdown",
        headers: completeHeaders(),
      });
      const migratedRoutes = [
        "/api/v1/audit/store-profile?format=markdown",
        "/api/v1/audit/store-config-profile?format=markdown",
        "/api/v1/audit/file-restart-evidence?format=markdown",
        "/api/v1/audit/retention-integrity-evidence?format=markdown",
        "/api/v1/audit/managed-store-contract?format=markdown",
        "/api/v1/audit/managed-readiness-summary?format=markdown",
        "/api/v1/audit/managed-adapter-boundary?format=markdown",
      ];

      expect(packageJson.statusCode).toBe(200);
      expect(packageJson.json()).toMatchObject({
        profileVersion: "managed-audit-sandbox-adapter-dry-run-package.v1",
        packageState: "sandbox-adapter-dry-run-package-ready",
        readyForManagedAuditSandboxAdapterConnection: false,
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
      });
      expect(packageMarkdown.statusCode).toBe(200);
      expect(packageMarkdown.headers["content-type"]).toContain("text/markdown");
      expect(packageMarkdown.body).toContain("# Managed audit sandbox adapter dry-run package");
      expect(packageMarkdown.body).toContain("PACKAGE_ONLY_NO_CONNECTION");

      for (const route of migratedRoutes) {
        const response = await app.inject({
          method: "GET",
          url: route,
          headers: completeHeaders(),
        });
        expect(response.statusCode, route).toBe(200);
        expect(response.headers["content-type"], route).toContain("text/markdown");
      }
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-225",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v225-sandbox-package",
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
