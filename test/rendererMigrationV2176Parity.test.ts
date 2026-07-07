import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateRenderer.js";
import {
  loadProductionShardExecutionExternalArtifactDryRunCloseout,
} from "../src/services/productionShardExecutionExternalArtifactDryRunCloseout.js";
import {
  loadProductionShardExecutionHandoffReadiness,
} from "../src/services/productionShardExecutionHandoffReadiness.js";
import {
  loadProductionShardExecutionRealArtifactIntakePreflightCloseout,
} from "../src/services/productionShardExecutionRealArtifactIntakePreflightCloseout.js";
import { renderProductionShardExecutionReadinessMarkdown } from "../src/services/productionShardExecutionReadinessRenderer.js";
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

describe("renderer migration v2176 parity", () => {
  it("keeps shard readiness and production shard execution renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "shardReadinessCompatibilityReport",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReportMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessCompatibilityReport({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_808,
            sha256: "c686d8191ca816c4829baef8747a7ee8390afdad37dbf0f92ea0122e901d2208",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "shardReadinessContractConsumerGate",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGateMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverShardReadinessContractConsumerGate({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 7_170,
            sha256: "511043dda77864007d4c1f8e8828bbba59c7b6b1412af14bd97e485acf3a71c1",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "productionShardExecutionHandoffReadiness",
          render: () =>
            renderProductionShardExecutionReadinessMarkdown({
              ...loadProductionShardExecutionHandoffReadiness({ config }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_484,
            sha256: "89ce139f67e5bd41bda567c38355d7b96f44a71a7cabe486c758acc5f110f5f1",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "productionShardExecutionExternalArtifactDryRunCloseout",
          render: () =>
            renderProductionShardExecutionReadinessMarkdown({
              ...loadProductionShardExecutionExternalArtifactDryRunCloseout({ config }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_148,
            sha256: "205e5633dfc64100422e7b084d2419de65f3d3a80631329a321cf44a200de69b",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "productionShardExecutionRealArtifactIntakePreflightCloseout",
          render: () =>
            renderProductionShardExecutionReadinessMarkdown({
              ...loadProductionShardExecutionRealArtifactIntakePreflightCloseout({ config }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_143,
            sha256: "086c52d75448053f5e4929ab918159a0d060ced5ce51d6b42ec9d5e4178d15ba",
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
