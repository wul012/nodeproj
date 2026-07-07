import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutRenderer.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const GENERATED_AT = "2026-07-07T00:00:00.000Z";

interface RendererParityExpectation {
  readonly length: number;
  readonly sha256: string;
  readonly h1Count: number;
  readonly h2Count: number;
  readonly h3Count: number;
}

interface RendererParityCase {
  readonly name: string;
  readonly render: () => string;
  readonly expected: RendererParityExpectation;
}

describe("renderer migration v2169 parity", () => {
  it("keeps runtime execution chain renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "artifactUpstreamProgressIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_605,
            sha256: "475040454fd00c8dcc37cf930cd1e74931b6c504ee42f3310d06e334333c0f44",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "packetContributionReview",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReviewMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketContributionReview({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 11_535,
            sha256: "e0276b15ece3e3e9d9bd934e9e59b9c4cb5b1f079c9fb57c00984677de808c79",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "packetApprovalGateReview",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReviewMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPacketApprovalGateReview({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_965,
            sha256: "059338f940417812b8b953442bb58af32f41b7c1326a9bf60521ba8ae959c417",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "liveReadGate",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGateMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionLiveReadGate({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_785,
            sha256: "4efed60de898cf8119a2004cfbf20ea91effb287151cb019dc2d4bb457427ac8",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "passEvidenceCloseout",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseoutMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceCloseout({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_514,
            sha256: "1720fdf24fac15fbfd71cf2ed0870a3598c0f4bb41ed9c89461357de04ee8a55",
            h1Count: 1,
            h2Count: 9,
            h3Count: 0,
          },
        },
      ];

      for (const rendererCase of cases) {
        const markdown = normalizeMarkdown(rendererCase.render());

        expect(markdown.length, rendererCase.name).toBe(rendererCase.expected.length);
        expect(sha256(markdown), rendererCase.name).toBe(rendererCase.expected.sha256);
        expect(markdown.match(/^# /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h1Count);
        expect(markdown.match(/^## /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h2Count);
        expect(markdown.match(/^### /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h3Count);
        expect(markdown.endsWith("\n"), rendererCase.name).toBe(true);
      }
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  }, 180_000);
});

function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

function normalizeMarkdown(value: string): string {
  return value
    .replace(/Generated at: [^\n]+/g, `Generated at: ${GENERATED_AT}`)
    .replace(/"(path|resolvedPath)":"([^"]*)"/g, (_match: string, key: string, pathValue: string) =>
      `"${key}":"${normalizePathValue(pathValue)}"`,
    )
    .replace(
      /"exists":true,"sizeBytes":\d+,"digest":"[a-f0-9]{64}"/g,
      `"exists":true,"sizeBytes":<bytes>,"digest":"<sha256>"`,
    );
}

function normalizePathValue(value: string): string {
  const slashPath = value
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/");

  const fixturesIndex = slashPath.indexOf("/fixtures/");
  if (fixturesIndex >= 0) {
    return `<repo>${slashPath.slice(fixturesIndex)}`;
  }

  const javaMarker = "/advanced-order-platform/";
  const javaIndex = slashPath.indexOf(javaMarker);
  if (javaIndex >= 0) {
    return `<java>${slashPath.slice(javaIndex + javaMarker.length - 1)}`;
  }

  const miniKvMarker = "/mini-kv/";
  const miniKvIndex = slashPath.indexOf(miniKvMarker);
  if (miniKvIndex >= 0) {
    return `<mini-kv>${slashPath.slice(miniKvIndex + miniKvMarker.length - 1)}`;
  }

  return slashPath;
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
    ...overrides,
  });
}
