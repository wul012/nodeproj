import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordRenderer.js";
import {
  loadServiceIntake,
} from "../src/services/operatorLifecycle/serviceIntake.js";
import {
  renderServiceIntakeMarkdown,
} from "../src/services/operatorLifecycle/serviceRenderer.js";
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

describe("renderer migration v2170 parity", () => {
  it("keeps declared operator lifecycle renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "operatorServiceLifecycle",
          render: () =>
            renderServiceIntakeMarkdown({
              ...loadServiceIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 13_196,
            sha256: "fc1eed6c6916373b278177f5a2ba92c53986f871d54e481eb09f62034ad74e03",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "declaredOperatorLifecycle",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_494,
            sha256: "fa6caf07f1233a99b5b900f523ebf222f52c760c515e6ca1ff249dcb1e9b5e45",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "packetStopRecord",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecord({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 11_344,
            sha256: "a305caa6f0f30ae6e23352714a591544c7201d28eac392464966bec672e07a8b",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "artifactIntakePreflight",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_505,
            sha256: "7756125199c6399629189fd6fb8affb665c1c94560ea9b65514bb2a926f7231d",
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
