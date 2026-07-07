import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationRenderer.js";

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

describe("renderer migration v2168 parity", () => {
  it("keeps runtime execution approval input renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "intakeContract",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContractMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputIntakeContract({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_428,
            sha256: "c61e8534ce44c00f90a8089fe91ab6b5b7b1be78184f4dc9319f0ed353b7a97c",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "completionIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputCompletionIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 8_064,
            sha256: "320fde7f1dfd3362884460f30f6b051f887c1e32f6010b67e423fb0a7d90f85d",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "templateValidator",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidator({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 11_355,
            sha256: "d7b4684c5f837e159395de3a176ee0e594752625b7b3eb830f18fa73491dd73f",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "canonicalValueValidation",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidationMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionCanonicalApprovalInputValueValidation({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 9_342,
            sha256: "738ef8fcae785e6a63404a19249bd78f244273ad5a6b31aa0ab9ef48758b4bd7",
            h1Count: 1,
            h2Count: 11,
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
