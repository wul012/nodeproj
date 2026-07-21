import { createHash } from "node:crypto";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass.js";

describe("catalog quality loader parity", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-21T15:30:00.000Z"));
  });

  afterAll(() => vi.useRealTimers());

  it("preserves the complete catalog quality profile", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverRuntimeShellPostDecisionContinuationCatalogQualityPass({
      config: loadConfig({
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
      }),
    });
    const json = JSON.stringify(profile);

    expect(Buffer.byteLength(json)).toBe(5_947);
    expect(createHash("sha256").update(json).digest("hex"))
      .toBe("0aee7c29c888304cbf380dfdf995d489be1e287d93c24347f31d58e5b36fe19f");
    expect(profile.qualityDigest).toBe("c7cf6c8bb2cef5bf4c94d77a593f01551d9e4da6939ad84f4668c2da03a5be74");
  });
});
