import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import { loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal } from "../src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsal.js";
import { renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown } from "../src/services/managedAuditManualSandboxConnectionBlockedExecutionRehearsalRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionRenderer.js";
import { loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke.js";
import { renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeMarkdown } from "../src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeRenderer.js";
import { loadManagedAuditManualSandboxConnectionReadinessGate } from "../src/services/managedAuditManualSandboxConnectionReadinessGate.js";
import { renderManagedAuditManualSandboxConnectionReadinessGateMarkdown } from "../src/services/managedAuditManualSandboxConnectionReadinessGateRenderer.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordRenderer.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckRenderer.js";
import { loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import { renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown } from "../src/services/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractRenderer.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  loadTestConfig as loadControlledPreviewTestConfig,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";
import { normalizeRendererMigrationMarkdown, sha256 } from "./rendererMigrationParityUtils.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";
const GENERATED_AT = "2026-07-10T00:00:00.000Z";

interface RendererParityCase {
  readonly name: string;
  readonly render: () => string | Promise<string>;
  readonly expected: {
    readonly length: number;
    readonly sha256: string;
    readonly h1Count: number;
    readonly h2Count: number;
    readonly h3Count: number;
    readonly trailingNewline: boolean;
  };
}

describe("renderer migration v2183 parity", () => {
  it("captures the final full-report renderer baseline", async () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "blockedExecutionRehearsal",
          render: () => renderManagedAuditManualSandboxConnectionBlockedExecutionRehearsalMarkdown({
            ...loadManagedAuditManualSandboxConnectionBlockedExecutionRehearsal({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 15_712, sha256: "220e2854e6e3b2ac0851227ccaf9abf9a23425b6df8ab8aa1d8f8b130b2514e6", h1Count: 1, h2Count: 14, h3Count: 0, trailingNewline: true },
        },
        {
          name: "approvalRequiredImplementationReadinessReview",
          render: () => renderManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReviewMarkdown({
            ...loadManagedAuditManualSandboxConnectionCredentialResolverApprovalRequiredImplementationReadinessReview({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 9_905, sha256: "6b8dbc6f19a112ba5775a46a5090faeb7e4af880c7c6be93d017488c90fd2ae7", h1Count: 1, h2Count: 10, h3Count: 0, trailingNewline: true },
        },
        {
          name: "candidateGateUpstreamHardeningReview",
          render: () => renderManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReviewMarkdown({
            ...loadManagedAuditManualSandboxConnectionCredentialResolverCandidateGateUpstreamHardeningReview({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 6_114, sha256: "96457d87ec3af940e44b759fdcae7ac0d18ae2260ed84c8bb25f7331d5793ec6", h1Count: 1, h2Count: 10, h3Count: 0, trailingNewline: true },
        },
        {
          name: "controlledReadOnlyShardPreview",
          render: async () => renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown({
            ...await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
              config: loadControlledPreviewTestConfig(),
              orderPlatform: fakeOrderPlatform(),
              miniKv: fakeMiniKv(),
            }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 78_413, sha256: "58bcf8d2a408b08223376d552587c93caa716972eac5f2deeeca5645e0113196", h1Count: 1, h2Count: 72, h3Count: 14, trailingNewline: false },
        },
        {
          name: "disabledFakeHarnessExecutionDeniedRoutePreflight",
          render: () => renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflightMarkdown({
            ...loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 10_208, sha256: "17ff6d66ac4be6af96accbac8cd5c25aadd853d23a17a1c3f04481b9c2e55b8e", h1Count: 1, h2Count: 11, h3Count: 0, trailingNewline: true },
        },
        {
          name: "implementationCandidateGateInputHardeningDecision",
          render: () => renderManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecisionMarkdown({
            ...loadManagedAuditManualSandboxConnectionCredentialResolverImplementationCandidateGateInputHardeningDecision({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 7_584, sha256: "9b5ef5777b766bfe0eff7bc1349ef60eab28ee7ff074a3ac5ca9ecb214535a66", h1Count: 1, h2Count: 11, h3Count: 0, trailingNewline: true },
        },
        {
          name: "javaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke",
          render: async () => renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmokeMarkdown({
            ...await loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovedLocalLoopbackReadOnlySmoke({
              config: loadTestConfig({
                UPSTREAM_PROBES_ENABLED: "true",
                ORDER_PLATFORM_URL: "http://127.0.0.1:8080",
                MINIKV_HOST: "127.0.0.1",
                MINIKV_PORT: "6424",
              }),
              orderPlatform: {
                async health() {
                  return { statusCode: 200, latencyMs: 7, data: { status: "UP" } };
                },
              },
              miniKv: {
                async health() {
                  return { command: "HEALTH", response: "OK live_keys=0 wal_enabled=no", latencyMs: 3 };
                },
              },
            }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 5_933, sha256: "5c327355694333666d43e00048103dabc82a25de987bdfc43d7580a94072ad61", h1Count: 1, h2Count: 11, h3Count: 0, trailingNewline: true },
        },
        {
          name: "readinessGate",
          render: () => renderManagedAuditManualSandboxConnectionReadinessGateMarkdown({
            ...loadManagedAuditManualSandboxConnectionReadinessGate({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 13_601, sha256: "6e0a7780f8d591c0adc09aa483ca9b6a300b1d8c6674216ade691f0df9973073", h1Count: 1, h2Count: 13, h3Count: 0, trailingNewline: true },
        },
        {
          name: "sandboxEndpointCredentialResolverDecisionRecord",
          render: () => renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecordMarkdown({
            ...loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDecisionRecord({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 7_958, sha256: "0cccd86c0a371c19c978b06b8b129691881f0e5181e6871bcd8335d0a7171aa9", h1Count: 1, h2Count: 11, h3Count: 0, trailingNewline: true },
        },
        {
          name: "sandboxEndpointCredentialResolverDisabledPrecheck",
          render: () => renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckMarkdown({
            ...loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheck({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 8_727, sha256: "25f4bdf4f6bac3bf83de98dc78d15d8a9ba4e5b6c0279e1fcb5bc0cfd08fbd24", h1Count: 1, h2Count: 14, h3Count: 0, trailingNewline: true },
        },
        {
          name: "sandboxEndpointCredentialResolverTestOnlyShellContract",
          render: () => renderManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractMarkdown({
            ...loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config }),
            generatedAt: GENERATED_AT,
          }),
          expected: { length: 10_632, sha256: "15050c345b883f7d0105d2d61083eb11ae2cde1e83637c7f6a3226c0daadd511", h1Count: 1, h2Count: 14, h3Count: 0, trailingNewline: true },
        },
      ];

      for (const rendererCase of cases) {
        const markdown = normalizeRendererMigrationMarkdown(await rendererCase.render(), { generatedAt: GENERATED_AT });
        expect(markdown.length, rendererCase.name).toBe(rendererCase.expected.length);
        expect(sha256(markdown), rendererCase.name).toBe(rendererCase.expected.sha256);
        expect(markdown.match(/^# /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h1Count);
        expect(markdown.match(/^## /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h2Count);
        expect(markdown.match(/^### /gm) ?? [], rendererCase.name).toHaveLength(rendererCase.expected.h3Count);
        expect(markdown.endsWith("\n"), rendererCase.name).toBe(rendererCase.expected.trailingNewline);
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
