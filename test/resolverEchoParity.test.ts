import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";
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

  it("freezes disabled-candidate ready and blocked reports", () => {
    process.env[FALLBACK_ENV] = "true";
    const ready = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    ready.generatedAt = FROZEN_TIME;

    expect(ready.summary.checkCount).toBe(25);
    expect(ready.verificationState).toBe(
      "credential-resolver-disabled-candidate-upstream-echo-verification-ready",
    );
    expect(reportIdentity(
      ready,
      renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
    )).toEqual({
      json: {
        bytes: 51_391,
        sha256: "6a372391b0712e4b213d6298b5444016fd1b55ee4f83fe50a1b5874240515fd9",
      },
      markdown: {
        bytes: 50_911,
        sha256: "25ce0a46d926ac3d2da291d19c9d104ae21d25b64900999a657df0f7af5f8e0b",
      },
    });

    const blocked = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });
    blocked.generatedAt = FROZEN_TIME;

    expect(blocked.productionBlockers.map((item) => item.code)).toEqual([
      "SOURCE_NODE_V273_NOT_READY",
      "CANDIDATE_COUNTS_NOT_ALIGNED",
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]);
    expect(reportIdentity(
      blocked,
      renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
    )).toEqual({
      json: {
        bytes: 52_245,
        sha256: "3a77c29f51f0d1e16c9db234b0e27bf41dc19fb4b3dd5b305f99a329dfc8d4b6",
      },
      markdown: {
        bytes: 51_554,
        sha256: "d1cc7af7a2dc23a1ad1ea976dfc842f2aa106858a4cc22d34f1aadec686c345e",
      },
    });
  });
});

function artifactIdentity(content: string) {
  return {
    bytes: Buffer.byteLength(content, "utf8"),
    sha256: createHash("sha256").update(content).digest("hex"),
  };
}

function reportIdentity<Profile>(
  profile: Profile,
  render: (value: Profile) => string,
) {
  return {
    json: artifactIdentity(JSON.stringify(profile)),
    markdown: artifactIdentity(render(profile)),
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
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
    AUDIT_RETENTION_DAYS: "30",
    AUDIT_MAX_FILE_BYTES: "1048576",
    AUDIT_ROTATION_ENABLED: "true",
    AUDIT_BACKUP_ENABLED: "true",
    AUDIT_STORE_URL: "managed-audit://contract-only",
    PORT: "4365",
    ...overrides,
  });
}
