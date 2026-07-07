import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutRenderer.js";
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

describe("renderer migration v2179 parity", () => {
  it("keeps minimal read-only handoff and disabled integration renderers byte-identical after builder migration", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "minimalReadOnlyIntegrationWindowReadinessCut",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCutMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationWindowReadinessCut({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 7_062,
            sha256: "e7b7cfd19326e33bdb40e6cb985ec653db50c35b3239d6922f52e36c2b70c08e",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "minimalReadOnlyIntegrationSmokeRerunArchivePassing",
          render: async () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchiveMarkdown({
              ...(await loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationSmokeRerunArchive({
                config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "true" }),
                orderPlatform: passingOrderPlatform(),
                miniKv: passingMiniKv(),
              })),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 5_369,
            sha256: "e505fcb170ba8b8e1d906d38acb1dfaf047335c71386df0fae863aa821bb2bc5",
            h1Count: 1,
            h2Count: 9,
            h3Count: 0,
          },
        },
        {
          name: "minimalReadOnlyIntegrationOperatorCiRegularGateHandoff",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoffMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverMinimalReadOnlyIntegrationOperatorCiRegularGateHandoff({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_943,
            sha256: "357a89e6c8111e802cbdb612232281bc021fdd77bcb9b2240e9fa8861cc1fb5c",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "managedAuditDisabledReadOnlyIntegrationIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_304,
            sha256: "a5ae0d9fe7c4c0400f4b207bdfc9e661869c22245800ad09cea5c8cc8bd43b99",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "managedAuditDisabledReadOnlyIntegrationDecisionRecord",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecordMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverManagedAuditDisabledReadOnlyIntegrationDecisionRecord({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 6_315,
            sha256: "ea3a220cf8b6c07938586f65b7bf621369b8de245ecee3698916ce4c6538f69a",
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
