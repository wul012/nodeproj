import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  createManagedAuditStoreContractProfile,
} from "../src/services/managedAuditStoreContract.js";

describe("managed audit store contract", () => {
  it("covers required adapter capabilities with a fake adapter without claiming production readiness", () => {
    const profile = createManagedAuditStoreContractProfile(loadTestConfig());

    expect(profile).toMatchObject({
      profileVersion: "managed-audit-store-contract.v1",
      readyForProductionAudit: false,
      readOnly: true,
      executionAllowed: false,
      runtime: {
        requestedStoreKind: "memory",
        auditStoreUrlConfigured: false,
        realManagedAdapterConnected: false,
        fakeAdapterUsed: true,
        migratesFileAudit: false,
        deletesOrRotatesAuditFiles: false,
      },
      checks: {
        appendOnlyWriteCovered: true,
        queryByRequestIdCovered: true,
        digestVerificationCovered: true,
        retentionMetadataCovered: true,
        backupRestoreMarkerCovered: true,
        fakeAdapterDoesNotClaimProduction: true,
        realManagedAdapterConnected: false,
      },
      summary: {
        capabilityCount: 5,
        coveredCapabilityCount: 5,
        productionBlockerCount: 1,
      },
    });
    expect(profile.requiredCapabilities.map((capability) => capability.id)).toEqual([
      "append-only-write",
      "query-by-request-id",
      "digest-verification",
      "retention-metadata",
      "backup-restore-marker",
    ]);
    expect(profile.fakeAdapterEvidence).toMatchObject({
      requestId: "managed-audit-contract-request",
      queryByRequestIdCount: 1,
      appendOnlyCountAfterWrite: 1,
      digestStableOnRepeatRead: true,
      retentionMetadata: {
        retentionDays: 30,
        rotationEnabled: true,
        backupEnabled: true,
      },
    });
    expect(profile.fakeAdapterEvidence.digestBefore).not.toBe(profile.fakeAdapterEvidence.digestAfterWrite);
    expect(profile.fakeAdapterEvidence.backupRestoreMarker).toMatch(/^backup-restore-marker:/);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual([
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
    ]);
  });

  it("keeps retention metadata uncovered when local retention knobs are missing", () => {
    const profile = createManagedAuditStoreContractProfile(loadConfig({
      LOG_LEVEL: "silent",
      UPSTREAM_PROBES_ENABLED: "false",
      UPSTREAM_ACTIONS_ENABLED: "false",
    }));

    expect(profile.checks.retentionMetadataCovered).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "RETENTION_METADATA_CONTRACT_UNCOVERED",
      "REAL_MANAGED_AUDIT_ADAPTER_MISSING",
    ]));
  });

  it("exposes managed audit store contract routes in JSON and Markdown", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-store-contract",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });
      const markdown = await app.inject({
        method: "GET",
        url: "/api/v1/audit/managed-store-contract?format=markdown",
        headers: {
          "x-orderops-operator-id": "auditor-1",
          "x-orderops-roles": "auditor",
        },
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "managed-audit-store-contract.v1",
        checks: {
          appendOnlyWriteCovered: true,
          queryByRequestIdCovered: true,
          digestVerificationCovered: true,
          retentionMetadataCovered: true,
          backupRestoreMarkerCovered: true,
          realManagedAdapterConnected: false,
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("# Managed audit store contract");
      expect(markdown.body).toContain("REAL_MANAGED_AUDIT_ADAPTER_MISSING");
    } finally {
      await app.close();
    }
  });
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
  });
}
