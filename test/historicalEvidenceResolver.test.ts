import { afterEach, describe, expect, it } from "vitest";

import { evidenceFile } from "../src/services/historicalEvidenceReportUtils.js";
import {
  historicalEvidenceExists,
  resolveHistoricalEvidenceContentPath,
  resolveHistoricalEvidencePath,
} from "../src/services/historicalEvidenceResolver.js";

const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("historicalEvidenceResolver", () => {
  const previousForceFallback = process.env[FORCE_FALLBACK_ENV];

  afterEach(() => {
    if (previousForceFallback === undefined) {
      delete process.env[FORCE_FALLBACK_ENV];
      return;
    }
    process.env[FORCE_FALLBACK_ENV] = previousForceFallback;
  });

  it("resolves sibling Java evidence through the committed fixture fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const resolvedPath = resolveHistoricalEvidencePath(
      "D:/javaproj/advanced-order-platform/c/82/解释/说明.md",
    );

    expect(resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/c/82/解释/说明.md",
    );
    expect(historicalEvidenceExists("D:/javaproj/advanced-order-platform/c/82/解释/说明.md")).toBe(true);
  });

  it("resolves root-level Java repository evidence through the committed fixture fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const resolvedPath = resolveHistoricalEvidencePath("D:/javaproj/.github/dependabot.yml");

    expect(resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/javaproj/.github/dependabot.yml",
    );
    expect(historicalEvidenceExists("D:/javaproj/.github/dependabot.yml")).toBe(true);
  });

  it("resolves sibling mini-kv evidence through the committed fixture fallback", () => {
    process.env[FORCE_FALLBACK_ENV] = "true";

    const resolvedPath = resolveHistoricalEvidencePath("D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json");

    expect(resolvedPath.replace(/\\/g, "/")).toContain(
      "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/runtime-smoke-evidence.json",
    );
    expect(historicalEvidenceExists("D:/C/mini-kv/fixtures/release/runtime-smoke-evidence.json")).toBe(true);
  });

  it("pins Node v961 evidence content without changing its declared path", () => {
    const declaredPath =
      "D:/nodeproj/orderops-node/src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplyEnvelopeArtifacts.ts";
    const contentPath = resolveHistoricalEvidenceContentPath(declaredPath).replace(/\\/g, "/");
    const report = evidenceFile("node-v961-value-supply-envelope-artifacts", declaredPath);

    expect(contentPath).toContain("fixtures/historical/node/v961/value-supply-envelope-artifacts.ts.snapshot");
    expect(resolveHistoricalEvidencePath(declaredPath).replace(/\\/g, "/"))
      .toContain("src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview");
    expect(report).toMatchObject({
      exists: true,
      sizeBytes: 11_741,
      digest: "e69b1e1bbfa1983b4e54c9c0b194409bf14349beac104e7a0180a5b4997a172e",
    });
  });
});
