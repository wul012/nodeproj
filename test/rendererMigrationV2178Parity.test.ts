import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerRenderer.js";
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
  readonly render: () => string | Promise<string>;
  readonly expected: RendererParityExpectation;
}

describe("renderer migration v2178 parity", () => {
  it("keeps read-only cross-project and minimal integration renderers byte-identical after builder migration", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "readOnlyCrossProjectReadinessRunner",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunnerMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverReadOnlyCrossProjectReadinessRunner({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 5_524,
            sha256: "539cd2c580b00269ce17a1ba26e2b023e56a0809a5e66a73dda326284e50de8e",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "minimalReadOnlyIntegrationRegularGate",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGateMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationRegularGate({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_230,
            sha256: "a209742f6a569707ca861e8381781f89bff152aaf1eabb6edc19e85792d548c6",
            h1Count: 1,
            h2Count: 13,
            h3Count: 0,
          },
        },
        {
          name: "minimalReadOnlyIntegrationSmokeRehearsalPassing",
          render: async () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsalMarkdown({
              ...(await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRehearsal({
                config,
                orderPlatform: passingOrderPlatform(),
                miniKv: passingMiniKv(),
              })),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 5_395,
            sha256: "d61e01c68d5abb3692d18ec524029fe1f693283d32dcbbf0fd650eb87309a1dd",
            h1Count: 1,
            h2Count: 9,
            h3Count: 0,
          },
        },
        {
          name: "minimalReadOnlyIntegrationGateExecutionPassing",
          render: async () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecutionMarkdown({
              ...(await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationGateExecution({
                config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
                orderPlatform: passingOrderPlatform(),
                miniKv: passingMiniKv(),
              })),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_690,
            sha256: "b99f3d4a876a93636ba6fd6dde41413a331a54297bcb4a1181df53f2b78e48ab",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
      ];

      for (const rendererCase of cases) {
        const markdown = normalizeRendererMigrationMarkdown(await rendererCase.render(), { generatedAt: GENERATED_AT });

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

function passingOrderPlatform() {
  return {
    health: async () => ({ statusCode: 200, latencyMs: 3, data: { status: "UP" } }),
    opsOverview: async () => ({
      statusCode: 200,
      latencyMs: 4,
      data: { application: { name: "advanced-order-platform" } },
    }),
  };
}

function passingMiniKv() {
  return {
    health: async () => ({ command: "HEALTH", response: "OK", latencyMs: 2 }),
    infoJson: async () => ({
      command: "INFOJSON",
      response: "{\"version\":\"0.143.0\"}",
      latencyMs: 3,
      info: { version: "0.143.0" },
    }),
    statsJson: async () => ({
      command: "STATSJSON",
      response: "{\"keys\":0}",
      latencyMs: 3,
      stats: { keys: 0 },
    }),
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
    ...overrides,
  });
}
