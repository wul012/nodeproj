import { createHash } from "node:crypto";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { loadConfig } from "../src/config.js";
import { resolveHistoricalEvidencePath } from "../src/services/historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionPacketVerification,
  renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionPacketVerification.js";
import {
  loadManagedAuditManualSandboxConnectionPreflightVerification,
  renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionPreflightVerification.js";

describe("manual connection verification renderer parity", () => {
  const previousFallback = process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;

  beforeAll(() => {
    process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = "true";
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-21T14:00:00.000Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
    if (previousFallback === undefined) {
      delete process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK;
    } else {
      process.env.ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK = previousFallback;
    }
  });

  it("preserves packet and preflight Markdown bytes under historical fallback", () => {
    const config = loadTestConfig();
    const packetProfile = loadManagedAuditManualSandboxConnectionPacketVerification({ config });
    const preflightProfile = loadManagedAuditManualSandboxConnectionPreflightVerification({ config });
    const packet = renderManagedAuditManualSandboxConnectionPacketVerificationMarkdown(packetProfile);
    const preflight = renderManagedAuditManualSandboxConnectionPreflightVerificationMarkdown(preflightProfile);

    expect(Buffer.byteLength(packet)).toBe(11_099);
    expect(sha256(packet)).toBe("876df6e9a37680dc5b49c49d3deb7f0c0694dee8db5ec7138b62bdfbda7feb49");
    expect(Buffer.byteLength(preflight)).toBe(13_344);
    expect(sha256(preflight)).toBe("b00d1a28faf06dd992aaa1fe8cf5516adf040a07150e0a9f3e2eb38af1801d77");

    const siblingPaths = [...packetProfile.evidenceFiles, ...preflightProfile.evidenceFiles]
      .map((file) => file.path)
      .filter((filePath) => /^(?:D:\/javaproj\/|D:\/C\/mini-kv\/)/.test(filePath.replace(/\\/g, "/")));
    expect(siblingPaths.length).toBeGreaterThan(0);
    expect(siblingPaths.every((filePath) =>
      resolveHistoricalEvidencePath(filePath).replace(/\\/g, "/")
        .includes("/fixtures/historical/sibling-workspaces/"))).toBe(true);
  });
});

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

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
    PORT: "4320",
  });
}
