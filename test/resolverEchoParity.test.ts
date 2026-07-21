import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";

const FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const FROZEN_TIME = "2026-07-21T00:00:00.000Z";

describe("resolver echo report parity", () => {
  const previousFallback = process.env[FALLBACK_ENV];

  afterEach(() => {
    if (previousFallback === undefined) delete process.env[FALLBACK_ENV];
    else process.env[FALLBACK_ENV] = previousFallback;
  });

  it("freezes disabled-precheck JSON and Markdown", () => {
    process.env[FALLBACK_ENV] = "true";
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    profile.generatedAt = FROZEN_TIME;

    expect(profile.summary.checkCount).toBe(19);
    expect(profile.verificationState).toBe(
      "sandbox-endpoint-credential-resolver-disabled-precheck-upstream-echo-verification-ready",
    );
    expect(artifactIdentity(JSON.stringify(profile))).toEqual({
      bytes: 38_343,
      sha256: "aede3ab9c385c357c21cfea8b86cafdf18054bb38717462e28c85cc8ced59480",
    });
    expect(artifactIdentity(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown(
        profile,
      ),
    )).toEqual({
      bytes: 9_367,
      sha256: "aa6fd14cd0c0c62b4a2499e749ba34df7c8c5a3c5f3be057bc6dadb8b2b7f4a0",
    });
  });

  it("freezes test-only-shell JSON and Markdown", () => {
    process.env[FALLBACK_ENV] = "true";
    const profile = loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    profile.generatedAt = FROZEN_TIME;

    expect(profile.summary.checkCount).toBe(20);
    expect(profile.verificationState).toBe(
      "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
    );
    expect(artifactIdentity(JSON.stringify(profile))).toEqual({
      bytes: 43_068,
      sha256: "d4b4d534e2a571eb290d2f4b436dfe5db4b77fe64aaad5464a6a9458748c7179",
    });
    expect(artifactIdentity(
      renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown(
        profile,
      ),
    )).toEqual({
      bytes: 10_582,
      sha256: "ec8640aeca9d44f828f54a7102aa779f03eaeaf694695899da1c252d47608e5b",
    });
  });
});

function artifactIdentity(content: string) {
  return {
    bytes: Buffer.byteLength(content, "utf8"),
    sha256: createHash("sha256").update(content).digest("hex"),
  };
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4365",
  });
}
