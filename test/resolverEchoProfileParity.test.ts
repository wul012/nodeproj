import { createHash } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification as loadDisabledEcho,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification as loadShellEcho,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const previousFallback = process.env[FORCE_FALLBACK_ENV];

describe("credential resolver echo profile parity", () => {
  beforeAll(() => {
    process.env[FORCE_FALLBACK_ENV] = "true";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-21T16:00:00.000Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
    if (previousFallback === undefined) delete process.env[FORCE_FALLBACK_ENV];
    else process.env[FORCE_FALLBACK_ENV] = previousFallback;
  });

  it.each([
    ["Java v106 disabled precheck", loadDisabledEcho, 38_343, "774add4d75f8222cfa72d57efa1087972eeb7ba49b89aa1320d6d27c53609aa9"],
    ["Java v107 test-only shell", loadShellEcho, 43_068, "f338d2f3b78afc8e3130a80bfcad8c975bb5ad395f4acfb570c2c70b4b2c72cc"],
  ])("keeps the %s profile byte-identical", (_label, loadProfile, expectedBytes, expectedHash) => {
    const json = JSON.stringify(loadProfile({ config: loadTestConfig() }));

    expect(Buffer.byteLength(json)).toBe(expectedBytes);
    expect(createHash("sha256").update(json).digest("hex")).toBe(expectedHash);
  });
});

function loadTestConfig() {
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
    PORT: "4366",
  });
}
