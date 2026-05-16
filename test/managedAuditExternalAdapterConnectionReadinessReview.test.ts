import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditExternalAdapterConnectionReadinessReview,
} from "../src/services/managedAuditExternalAdapterConnectionReadinessReview.js";

describe("managed audit external adapter connection readiness review", () => {
  it("consumes Node v222, Java v81, and mini-kv v90 without opening a real connection", () => {
    const profile = loadManagedAuditExternalAdapterConnectionReadinessReview({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
      reviewState: "ready-for-external-adapter-connection-review",
      readyForManagedAuditExternalAdapterConnectionReadinessReview: true,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      readOnlyReview: true,
      executionAllowed: false,
      restoreExecutionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      schemaMigrationExecuted: false,
      automaticUpstreamStart: false,
      sourceNodeV222: {
        sourceVersion: "Node v222",
        profileVersion: "managed-audit-local-adapter-candidate-verification-report.v1",
        reportState: "local-adapter-candidate-verification-ready",
        readyForVerificationReport: true,
        sourceEndpointRerunPerformed: false,
        additionalLocalDryRunWritePerformed: false,
      },
      upstreamGuards: {
        javaV81: {
          sourceVersion: "Java v81",
          receiptVersion: "java-release-approval-rehearsal-managed-audit-external-adapter-migration-guard-receipt.v1",
          responseSchemaVersion: "java-release-approval-rehearsal-response-schema.v15",
          consumedByNodeVerificationReportVersion: "Node v222",
          nextNodeReviewVersion: "Node v223",
          readyForNodeV223ExternalAdapterConnectionReadinessReview: true,
          ownerApprovalRequiredBeforeConnection: true,
          schemaMigrationReviewRequired: true,
          credentialReviewRequired: true,
          credentialValueReadByJava: false,
          externalManagedAuditConnectionOpened: false,
          externalManagedAuditSchemaMigrated: false,
          javaManagedAuditStoreWritten: false,
          javaSqlExecuted: false,
          readyForProductionAudit: false,
        },
        miniKvV90: {
          sourceVersion: "mini-kv v90",
          projectVersion: "0.90.0",
          receiptDigest: "fnv1a64:0dfb07cd2f8de289",
          consumedReceiptDigest: "fnv1a64:76411286a0913dc8",
          currentArtifactPathHint: "c/90/",
          externalAdapterStorageBackend: false,
          participatesInExternalAdapter: false,
          credentialReadAllowed: false,
          migrationExecutionAllowed: false,
          managedAuditWriteExecuted: false,
          localDryRunRecordsWritten: false,
          orderAuthoritative: false,
        },
      },
      connectionReadiness: {
        evidenceSpan: "Node v222 + Java v81 + mini-kv v90",
        ownerApprovalRequiredBeforeConnection: true,
        ownerApprovalPresent: false,
        schemaMigrationReviewRequired: true,
        schemaMigrationApproved: false,
        credentialReviewRequired: true,
        credentialApproved: false,
        credentialValueReadByNode: false,
        credentialValueReadByJava: false,
        externalManagedAuditConnectionOpened: false,
        externalManagedAuditSchemaMigrated: false,
        miniKvExternalAdapterStorageBackend: false,
        miniKvParticipatesInExternalAdapter: false,
        upstreamActionsEnabled: false,
        productionAuditAllowed: false,
      },
      checks: {
        nodeV222VerificationReady: true,
        javaV81EvidencePresent: true,
        javaV81MigrationGuardAccepted: true,
        javaV81CredentialBoundaryValid: true,
        javaV81NoConnectionNoSqlBoundaryValid: true,
        miniKvV90RuntimeEvidencePresent: true,
        miniKvV90ReceiptAccepted: true,
        miniKvV90NonParticipationBoundaryValid: true,
        miniKvV90NoCredentialMigrationBoundaryValid: true,
        ownerApprovalStillRequired: true,
        schemaMigrationReviewStillRequired: true,
        credentialReviewStillRequired: true,
        realExternalAdapterStillDisconnected: true,
        credentialStillUnread: true,
        javaMiniKvWritesStillBlocked: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditExternalAdapterConnectionReadinessReview: true,
      },
      summary: {
        evidenceFileCount: 6,
        snippetMatchCount: 18,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV222.reportDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.connectionReadiness.readinessDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.archivedEvidence.files.every((file) => file.exists && file.sizeBytes > 0 && file.digest?.length === 64)).toBe(true);
    expect(profile.archivedEvidence.snippetMatches.every((snippet) => snippet.matched)).toBe(true);
  });

  it("blocks when upstream actions are enabled", () => {
    const profile = loadManagedAuditExternalAdapterConnectionReadinessReview({
      config: loadTestConfig({
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.reviewState).toBe("blocked");
    expect(profile.readyForManagedAuditExternalAdapterConnectionReadinessReview).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toContain("UPSTREAM_ACTIONS_ENABLED");
    expect(profile.connectsManagedAudit).toBe(false);
    expect(profile.readsManagedAuditCredential).toBe(false);
    expect(profile.readyForProductionAudit).toBe(false);
  });

  it("exposes JSON and Markdown routes", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review",
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-audit-external-adapter-connection-readiness-review?format=markdown",
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-external-adapter-connection-readiness-review.v1",
        reviewState: "ready-for-external-adapter-connection-review",
        readyForProductionAudit: false,
        connectsManagedAudit: false,
        readsManagedAuditCredential: false,
        upstreamGuards: {
          miniKvV90: {
            receiptDigest: "fnv1a64:0dfb07cd2f8de289",
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit external adapter connection readiness review");
      expect(markdown.body).toContain("ready-for-external-adapter-connection-review");
      expect(markdown.body).toContain("PREPARE_SANDBOX_ADAPTER_DRY_RUN");
    } finally {
      await app.close();
    }
  });
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-223",
    "x-orderops-roles": "auditor,operator",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v223-readiness-review",
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
    PORT: "4318",
    ...overrides,
  });
}
