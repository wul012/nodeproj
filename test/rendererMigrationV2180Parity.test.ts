import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewRenderer.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake.js";
import {
  renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeRenderer.js";
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

describe("renderer migration v2180 parity", () => {
  it("keeps sandbox handle review renderers byte-identical after builder migration", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const config = loadTestConfig();
      const cases: RendererParityCase[] = [
        {
          name: "sandboxHandleReviewPrerequisiteIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 10_535,
            sha256: "fa32926da5b8871891ab5a0a6fd4bebc21e886b968f3c9d03a5c1e442275d2c1",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "sandboxHandleReviewContractDecision",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecisionMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewContractDecision({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 9_833,
            sha256: "34bb24a8b9df440c8b4e4b5a4be8ed85d9b6687d8aecae421e7b6733eb94d5ab",
            h1Count: 1,
            h2Count: 11,
            h3Count: 0,
          },
        },
        {
          name: "sandboxHandleReviewPacketGateNonSecretIntake",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntakeMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateNonSecretIntake({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 12_228,
            sha256: "67cf771cdf18f0cd4c9e6e371a1639ecc22f552539d69e0e1dfd0695e7ebcf5f",
            h1Count: 1,
            h2Count: 12,
            h3Count: 0,
          },
        },
        {
          name: "sandboxHandleReviewPacketGateDecisionRecord",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecordMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPacketGateDecisionRecord({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 7_230,
            sha256: "1a04cf94a3e93346cde8e34b623159d613a49bef5a02b398142d10ba095248ca",
            h1Count: 1,
            h2Count: 10,
            h3Count: 0,
          },
        },
        {
          name: "sandboxHandleReviewPrerequisiteClosureReview",
          render: () =>
            renderManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReviewMarkdown({
              ...loadManagedAuditManualSandboxConnectionCredentialResolverSandboxHandleReviewPrerequisiteClosureReview({
                config,
              }),
              generatedAt: GENERATED_AT,
            }),
          expected: {
            length: 7_927,
            sha256: "fe3313856c72fa3b11710892c05b9970edec533c7d0ac47608044873d3a9e6b9",
            h1Count: 1,
            h2Count: 10,
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
