import { createHash } from "node:crypto";

import { afterEach, describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
import {
  normalizeForParity,
  normalizeHistoricalReportForParity,
  normalizeText,
} from "./support/portableProfileParity.js";

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
    expect(artifactIdentity(JSON.stringify(normalizeForParity(profile)))).toEqual({
      bytes: 36_937,
      sha256: "31686dd71d504b9676ef50e8555aab15a64a6aded4dc339be02cb910dd5b8c86",
    });
    expect(artifactIdentity(
      normalizeText(
        renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown(
          normalizeForParity(profile) as typeof profile,
        ),
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
    expect(artifactIdentity(JSON.stringify(normalizeForParity(profile)))).toEqual({
      bytes: 41_218,
      sha256: "ac4488d6cfe1fb244f9c3c8959696b2aea12bc29a6101dde815b4a3656aa8a20",
    });
    expect(artifactIdentity(
      normalizeText(
        renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown(
          normalizeForParity(profile) as typeof profile,
        ),
      ),
    )).toEqual({
      bytes: 10_308,
      sha256: "f0b13efe96136f997590f1e7116787ea56ef5a317566d53b3d960d1fe1e8923c",
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
        bytes: 48_784,
        sha256: "494eb32af445dd6eb104a0ef3d49ae2093d6402bc74e12c412d0f899d368245c",
      },
      markdown: {
        bytes: 48_304,
        sha256: "dfe5cfa6db7984b7ca0b8fb42d3ffb814a828ab3d49240ba265e6abdd5606493",
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
        bytes: 49_638,
        sha256: "bb7ef6d8608a3a857235a06e20ed200d03b8384adea547c7af5a9b134358d8e3",
      },
      markdown: {
        bytes: 48_947,
        sha256: "97f08b978f8e43509814f2d6a317ff87414ff2ba587c52761b47efd5c92bf806",
      },
    });
  });

  it("freezes disabled-adapter local, fallback, and blocked reports", () => {
    delete process.env[FALLBACK_ENV];
    const local = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    local.generatedAt = FROZEN_TIME;

    process.env[FALLBACK_ENV] = "true";
    const fallback = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    fallback.generatedAt = FROZEN_TIME;

    const readyIdentity = {
      json: {
        bytes: 21_502,
        sha256: "be416997ac7103136b33e42d9c63b41376a315a9ea2a28aad1a41ac5793f58cb",
      },
      markdown: {
        bytes: 21_115,
        sha256: "4c657eee22c6a727d864051873c2cc2ddd83fd9da5244527bb06bbd585c6e4aa",
      },
    };
    expect(reportIdentity(
      local,
      renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
    )).toEqual(readyIdentity);
    expect(reportIdentity(
      fallback,
      renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
    )).toEqual(readyIdentity);

    const blocked = loadManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerification({
      config: loadTestConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }),
    });
    blocked.generatedAt = FROZEN_TIME;
    expect(blocked.productionBlockers.map((item) => item.code)).toEqual([
      "NODE_SOURCES_NOT_READY",
      "UPSTREAM_ACTIONS_ENABLED",
    ]);
    expect(reportIdentity(
      blocked,
      renderManagedAuditManualSandboxConnectionDisabledAdapterClientUpstreamEchoVerificationMarkdown,
    )).toEqual({
      json: {
        bytes: 21_818,
        sha256: "0a92afaf3615fb2ebb4c9e9f60a4a42bca94f7d49176c0fc288cf42061d1f113",
      },
      markdown: {
        bytes: 21_284,
        sha256: "8b89580e075abc02e1bbcb13d20a658aabfbcaca2747e3caa21804776af2ec63",
      },
    });
  });

  it("freezes fake-transport local, fallback, and blocked reports", () => {
    delete process.env[FALLBACK_ENV];
    const local = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    local.generatedAt = FROZEN_TIME;

    process.env[FALLBACK_ENV] = "true";
    const fallback = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig(),
    });
    fallback.generatedAt = FROZEN_TIME;

    const readyIdentity = {
      json: {
        bytes: 25_240,
        sha256: "cda7000a3f61a89bd81a96cd3d5581a2d2396e2ab96977a205364a1a09fe3aa1",
      },
      markdown: {
        bytes: 24_867,
        sha256: "e006f8dde8cc380511489500d0745324d0073515482539af30144cfd8a06838d",
      },
    };
    expect(reportIdentity(
      local,
      renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
    )).toEqual(readyIdentity);
    expect(reportIdentity(
      fallback,
      renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
    )).toEqual(readyIdentity);

    const blocked = loadManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerification({
      config: loadTestConfig({ UPSTREAM_ACTIONS_ENABLED: "true" }),
    });
    blocked.generatedAt = FROZEN_TIME;
    expect(blocked.productionBlockers.map((item) => item.code)).toEqual([
      "NODE_FAKE_TRANSPORT_SOURCES_NOT_READY",
      "UPSTREAM_ACTIONS_ENABLED",
    ]);
    expect(reportIdentity(
      blocked,
      renderManagedAuditManualSandboxConnectionFakeTransportPacketUpstreamEchoVerificationMarkdown,
    )).toEqual({
      json: {
        bytes: 25_547,
        sha256: "b07dab1216a675327969334ac03eedb56a1c746b32c3988ff115ea70a035f6fb",
      },
      markdown: {
        bytes: 25_029,
        sha256: "4c58aabebbcdaad9791199222b62e6eb5dd01516512dc69fccda014ef413a58d",
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
  const portableProfile = normalizeHistoricalReportForParity(profile) as Profile;
  return {
    json: artifactIdentity(JSON.stringify(portableProfile)),
    markdown: artifactIdentity(normalizeText(render(portableProfile))),
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
