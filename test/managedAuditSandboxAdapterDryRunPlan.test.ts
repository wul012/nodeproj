import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditSandboxAdapterDryRunPlan,
} from "../src/services/managedAuditSandboxAdapterDryRunPlan.js";

describe("managed audit sandbox adapter dry-run plan", () => {
  it("turns Node v223 into a visible sandbox-only dry-run plan with hard quality gates", () => {
    const profile = loadManagedAuditSandboxAdapterDryRunPlan({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
      planState: "sandbox-adapter-dry-run-plan-ready",
      readyForManagedAuditSandboxAdapterDryRunPlan: true,
      readyForManagedAuditSandboxAdapterDryRunPackage: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyPlan: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      localDryRunWritePerformed: false,
      automaticUpstreamStart: false,
      sourceNodeV223: {
        sourceVersion: "Node v223",
        profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
        reviewState: "ready-for-external-adapter-connection-review",
        readyForConnectionReadinessReview: true,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        schemaMigrationExecuted: false,
      },
      sandboxPlan: {
        evidenceSpan: "Node v223 external adapter connection readiness review",
        sandboxOnly: true,
        productionCredentialAllowed: false,
        credentialValueRequired: false,
        credentialHandleRequired: true,
        credentialHandleName: "ORDEROPS_MANAGED_AUDIT_SANDBOX_CREDENTIAL_HANDLE",
        ownerApprovalArtifactRequired: true,
        schemaMigrationRehearsalRequired: true,
        schemaMigrationExecutionAllowed: false,
        externalConnectionExecutionAllowed: false,
        managedAuditWriteAllowed: false,
        externalServiceStartAllowed: false,
        miniKvStorageBackendAllowed: false,
        javaApprovalLedgerWriteAllowed: false,
        failureRollbackPathRequired: true,
      },
      qualityGates: {
        gateSource: "docs/plans/v223-post-external-adapter-readiness-roadmap.md",
        gatesAreHardAcceptanceCriteria: true,
        nodeV224ProfileExportsQualityGates: true,
        nodeManagedAuditServiceFileLimit: "split-before-800-lines",
        nodeRouteRegistrationRequired: "registerAuditJsonMarkdownRoute",
        nodeSummaryOnlyVersionForbidden: true,
        javaV82OpsEvidenceServiceBloatForbidden: true,
        javaV82BuilderOrHelperRequired: true,
        javaV82LongBooleanConstructorForbidden: true,
        miniKvV91CommandCppIfChainBloatForbidden: true,
        miniKvV91RuntimeEvidenceHelperRequired: true,
        miniKvV91WalSnapshotRestoreCoreUntouched: true,
      },
      checks: {
        nodeV223ReviewReady: true,
        nodeV223StillReadOnly: true,
        ownerApprovalArtifactRequired: true,
        sandboxCredentialHandleRequired: true,
        productionCredentialStillForbidden: true,
        schemaMigrationRehearsalRequired: true,
        schemaMigrationExecutionStillBlocked: true,
        externalConnectionStillBlocked: true,
        managedAuditWriteStillBlocked: true,
        failureRollbackPathRequired: true,
        javaMiniKvFutureGuardsRequired: true,
        nodeQualityGatesRecorded: true,
        javaMiniKvQualityGatesRecorded: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditSandboxAdapterDryRunPlan: true,
      },
      summary: {
        requiredEvidenceCount: 7,
        operatorStepCount: 6,
        forbiddenOperationCount: 7,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV223.readinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sandboxPlan.planDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.sandboxPlan.requiredEvidence).toContain("Java v82 approval/schema rehearsal guard receipt.");
    expect(profile.sandboxPlan.requiredEvidence).toContain("mini-kv v91 non-participation receipt for sandbox adapter runtime evidence.");
    expect(profile.sandboxPlan.forbiddenOperations).toContain("Open a real external managed audit connection.");
    expect(profile.recommendations.map((message) => message.code)).toContain("RUN_PARALLEL_SANDBOX_GUARDS");
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditSandboxAdapterDryRunPlan({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.planState).toBe("blocked");
    expect(profile.readyForManagedAuditSandboxAdapterDryRunPlan).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.schemaMigrationExecuted).toBe(false);
  });

  it("exposes JSON and Markdown routes through the shared audit route helper", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-sandbox-adapter-dry-run-plan?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-sandbox-adapter-dry-run-plan.v1",
        planState: "sandbox-adapter-dry-run-plan-ready",
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        qualityGates: {
          gatesAreHardAcceptanceCriteria: true,
          nodeRouteRegistrationRequired: "registerAuditJsonMarkdownRoute",
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit sandbox adapter dry-run plan");
      expect(markdown.body).toContain("sandbox-adapter-dry-run-plan-ready");
      expect(markdown.body).toContain("RUN_PARALLEL_SANDBOX_GUARDS");
      expect(markdown.body).toContain("split-before-800-lines");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-224",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v224-sandbox-plan",
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
    PORT: "4319",
    ...overrides,
  });
}
