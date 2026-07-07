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
import { normalizeRendererMigrationMarkdown, sha256 } from "./rendererMigrationParityUtils.js";

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
            length: 12_549,
            sha256: "aaf1a33231bb5be35f3f2f6f77e09ccdb3818b2669d7b5654119463ff538739e",
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
            length: 11_479,
            sha256: "249a2e597bbc89d2366dfe41d62ec79c1845c6297322cd5cdbb3d590a9219c98",
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
            length: 8_797,
            sha256: "16e87b91ce2638e604271c715033678d88d58df1fdb2a1ea7020d388ba1c9dec",
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
            length: 6_729,
            sha256: "aaec0eb63d178f772c08e85e263a48926e56347bfcd6dceb04f94d60b3369748",
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
            length: 8_458,
            sha256: "893f1bb7bd8ad1c45e40cb30243e7ba733a47362e8f28f6f9c9d545fa3b6d969",
            h1Count: 1,
            h2Count: 9,
            h3Count: 0,
          },
        },
      ];

      for (const rendererCase of cases) {
        const markdown = normalizeRendererMigrationMarkdown(rendererCase.render(), { generatedAt: GENERATED_AT });

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
