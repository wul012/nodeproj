import { afterEach, describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification as loadV117,
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerificationMarkdown as renderV117,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification as loadV115,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationMarkdown as renderV115,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification as loadV116,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationMarkdown as renderV116,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification as loadV114,
  renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerificationMarkdown as renderV114,
} from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification.js";
import { normalizeForParity, normalizeText, sha256 } from "./support/portableProfileParity.js";

const FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const FIXED_TIME = "2026-07-20T00:00:00.000Z";

describe("sandbox resolver echo parity", () => {
  const previousFallback = process.env[FALLBACK_ENV];

  afterEach(() => {
    if (previousFallback === undefined) delete process.env[FALLBACK_ENV];
    else process.env[FALLBACK_ENV] = previousFallback;
  });

  it("freezes portable v114-v117 JSON and Markdown before receipt extraction", () => {
    process.env[FALLBACK_ENV] = "true";
    const config = loadTestConfig();
    const actual = [
      measure(loadV114({ config }), renderV114),
      measure(loadV115({ config }), renderV115),
      measure(loadV116({ config }), renderV116),
      measure(loadV117({ config }), renderV117),
    ];

    expect(actual).toEqual([
      {
        json: { bytes: 36_249, sha256: "7d3905bb91f296e43271c3ac98320803cca2df63b0b08705ca424d853e91f01a" },
        markdown: { bytes: 35_642, sha256: "4c617a8336dd8013690b9abec7088a98035e2874bb6d533d9ef861c32e8cf535" },
      },
      {
        json: { bytes: 36_937, sha256: "0de871b30b2adf5d18ea2504d0d024a696c58026cdbb10fd2e959db22391bb66" },
        markdown: { bytes: 9_367, sha256: "b33209898b45b43623fa1cdcdd1ba3e2631ffee1a1635ca72607848227c6ee37" },
      },
      {
        json: { bytes: 41_218, sha256: "36e1101517897f20bf01028d976a74d441744c9cb4d7ad0c73025b26a67959c0" },
        markdown: { bytes: 10_308, sha256: "d6e61cf239ad4440c3fe668a68245378707e73510f298a74c674320831fec16f" },
      },
      {
        json: { bytes: 27_607, sha256: "6390036c745ea592daec92fe174c310f35ec2062679328542a875ec19ceb1b55" },
        markdown: { bytes: 27_125, sha256: "652967413af4ff00ef919864355061385ac476be9c8aa4e4dd708fa25a9f5bc4" },
      },
    ]);
  });
});

function measure<T extends { generatedAt: string }>(profile: T, render: (value: T) => string) {
  const stableProfile = { ...profile, generatedAt: FIXED_TIME };
  const portableProfile = normalizeForParity(stableProfile) as T;
  const json = JSON.stringify(portableProfile);
  const markdown = normalizeText(render(portableProfile));
  return {
    json: { bytes: Buffer.byteLength(json, "utf8"), sha256: sha256(json) },
    markdown: { bytes: Buffer.byteLength(markdown, "utf8"), sha256: sha256(markdown) },
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
    PORT: "4411",
  });
}
