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
import { normalizeForParity, normalizeText } from "./support/portableProfileParity.js";

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
        sha256: "f31103cc64bfdff7b866821d8cfbd71991d757803b09c8949abc6f4f60ab04c6",
      },
      markdown: {
        bytes: 48_304,
        sha256: "c7b8b4fab1f3b3c6dc81de908eb679f6eb553a468bc9cfcf2294cd62db05977e",
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
        sha256: "a42cd1034dc35d1d81b62f1ba9d64d9ad3a24b9edc331e53424c6e73df03bfc3",
      },
      markdown: {
        bytes: 48_947,
        sha256: "eccfe3ee84745785f91ef9dfdf0bd04eb975fc68ac0cbf65dfaf4e798788952d",
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
        sha256: "b51ebacc7b10d101176b8ca245d7f86155443b0166e602b66abb143bd7084047",
      },
      markdown: {
        bytes: 21_115,
        sha256: "293393d31d69e894e7939b53a4c1b95488d6efb092cfb9d0b29a520e45e3207f",
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
        sha256: "1fae1e5e8243bd9d098602629d8be8f1589772ebfb3e485ebf23479333cbaf6b",
      },
      markdown: {
        bytes: 21_284,
        sha256: "07f4dbbef30ca49d452624b4e4ffbbe8e8ad684bd4e4e826f0e40219bca90738",
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
        sha256: "ccbce3c7be0aae7abc8b0ecbc8aa0df62ae4626d17380444c0a404ebb2408724",
      },
      markdown: {
        bytes: 24_867,
        sha256: "7df50d5dd94be7574b95fd986922ef525f65239fda03623654b71c944f64dc59",
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
        sha256: "3203f20f18b961596f646dbed7eddf280f363375098ea4f393b6eafc4abd9cf8",
      },
      markdown: {
        bytes: 25_029,
        sha256: "1e5c7a057fa57ff14506d5feb81584cb6045bb1b01232c34d70fc90a39a18729",
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
  const portableProfile = normalizeForParity(profile) as Profile;
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
