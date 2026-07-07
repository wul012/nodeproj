import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionRenderer.js";
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

describe("renderer migration v2175 parity", () => {
  it("keeps shard readiness intake renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "shardReadinessEvidenceConsumption",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumptionMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvShardReadinessEvidenceConsumption({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_614,
            sha256: "23afa5be96d6124010f756ec0b9056996570a1fde466cc49b02f5212411357c8",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "completedShardReadinessEvidenceIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvCompletedShardReadinessEvidenceIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_074,
            sha256: "00e63d5142546c6a84e307ef79c795429b6100d6e456216f46a8061bcf1bd5ae",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "activeShardPlanEvidenceIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanEvidenceIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 7_478,
            sha256: "7a2bacc9328c8acc37a3484832c3019ff5c65bb28ba0eb52442017de333df26a",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "activeShardPlanBoundaryHandoffIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvActiveShardPlanBoundaryHandoffIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 9_666,
            sha256: "d7d7f0bc718e1d2032a1b19c74d9debeaebca8433a3e95e713b3a0d115cdd3cd",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "liveReadGatePlanIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvLiveReadGatePlanIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_558,
            sha256: "014490df23b1873a2d91b96fa14ccc4d612ec7e504e715eb12927651011587d0",
            h1Count: 1,
            h2Count: 12,
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
