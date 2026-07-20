import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification,
  renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.js";
import { normalizeForParity, normalizeText, sha256 } from "./support/portableProfileParity.js";

const ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification";
const FORCE_FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

describe("managed audit manual sandbox connection credential resolver disabled fake harness contract upstream echo verification", () => {
  it("verifies Java v122-v126 and mini-kv v127 without enabling fake harness runtime", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
      config: loadTestConfig(),
    });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification.v1",
      verificationState: "disabled-fake-harness-contract-upstream-echo-verification-ready",
      readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
        true,
      readOnlyUpstreamEchoVerification: true,
      disabledFakeHarnessContractUpstreamEchoVerificationOnly: true,
      consumesNodeV288DisabledFakeHarnessContract: true,
      consumesJavaV122V126QualityAndEchoEvidence: true,
      consumesMiniKvV127DisabledFakeHarnessNonParticipationReceipt: true,
      readyForManagedAuditResolverImplementation: false,
      readyForManagedAuditSandboxAdapterConnection: false,
      readyForProductionAudit: false,
      readyForProductionWindow: false,
      readyForProductionOperations: false,
      realResolverImplementationAllowed: false,
      testOnlyFakeHarnessAllowed: false,
      testOnlyFakeHarnessExecutionAllowed: false,
      fakeHarnessRuntimeEnabled: false,
      fakeHarnessInvocationAllowed: false,
      executionAllowed: false,
      connectsManagedAudit: false,
      readsManagedAuditCredential: false,
      storesManagedAuditCredential: false,
      credentialValueRead: false,
      credentialValueProvided: false,
      rawEndpointUrlParsed: false,
      rawEndpointUrlRendered: false,
      externalRequestSent: false,
      secretProviderInstantiated: false,
      resolverClientInstantiated: false,
      fakeSecretProviderInstantiated: false,
      fakeResolverClientInstantiated: false,
      schemaMigrationExecuted: false,
      approvalLedgerWritten: false,
      automaticUpstreamStart: false,
      sourceNodeV288: {
        sourceVersion: "Node v288",
        contractState: "disabled-fake-harness-contract-ready",
        readyForDisabledFakeHarnessContract: true,
        readyForJavaV122MiniKvV127ParallelEcho: true,
        contractName: "ManagedAuditCredentialResolverDisabledFakeHarnessContract",
        contractMode: "disabled-test-only-fake-harness-contract-only",
        runtimeToggleName: "ORDEROPS_MANAGED_AUDIT_TEST_ONLY_FAKE_HARNESS_ENABLED",
        defaultRuntimeToggleValue: false,
        invocationState: "disabled",
        requiredInputCount: 6,
        allowedOutputCount: 5,
        prohibitedInputCount: 6,
        requiredArtifactCount: 9,
        contractAssertionCount: 10,
        prohibitedActionCount: 15,
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        sourceProductionBlockerCount: 0,
        javaEchoRequiredNow: true,
        miniKvEchoRequiredNow: true,
        fakeHarnessRuntimeEnabled: false,
        fakeHarnessInvocationAllowed: false,
        executionAllowed: false,
        connectsManagedAudit: false,
        credentialValueRead: false,
        credentialValueProvided: false,
        rawEndpointUrlParsed: false,
        rawEndpointUrlRendered: false,
        externalRequestSent: false,
        secretProviderInstantiated: false,
        resolverClientInstantiated: false,
        fakeSecretProviderInstantiated: false,
        fakeResolverClientInstantiated: false,
        schemaMigrationExecuted: false,
        approvalLedgerWritten: false,
        automaticUpstreamStart: false,
      },
      upstreamEchoes: {
        javaV122V126: {
          sourceVersion: "Java v122-v126",
          evidencePresent: true,
          verificationDocumented: true,
          completedVersions: ["Java v122", "Java v123", "Java v124", "Java v125", "Java v126"],
          integrationTestSplitVersions: ["Java v122", "Java v123", "Java v124", "Java v125"],
          qualityCatalogVersion: "Java v126",
          integrationTestSplitComplete: true,
          evidenceServiceCatalogStopgapApplied: true,
          boundaryCatalogPresent: true,
          noFakeHarnessRuntimeDocumented: true,
          credentialValueBoundaryDocumented: true,
          rawEndpointBoundaryDocumented: true,
          managedAuditConnectionBoundaryDocumented: true,
          ledgerAndSqlBoundaryDocumented: true,
          didNotModifyProductionCodeDuringV122V125: true,
          v126RefactorOnly: true,
          javaStillReadOnlyEvidenceInput: true,
        },
        miniKvV127: {
          sourceVersion: "mini-kv v127",
          evidencePresent: true,
          verificationDocumented: true,
          receiptVersion: "mini-kv-credential-resolver-disabled-fake-harness-non-participation-receipt.v1",
          releaseVersion: "v127",
          consumerHint: "Node v289 disabled fake harness contract upstream echo verification",
          sourceContract: "Node v288 disabled fake harness contract",
          sourceProfileVersion:
            "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract.v1",
          sourceContractState: "disabled-fake-harness-contract-ready",
          sourceReadyForDisabledFakeHarnessContract: true,
          sourceReadOnlyContract: true,
          sourceDisabledFakeHarnessContractOnly: true,
          readyForNodeV289UpstreamEchoVerification: true,
          readyForJavaV122MiniKvV127ParallelEcho: true,
          readOnly: true,
          executionAllowed: false,
          disabledFakeHarnessNonParticipationReceiptOnly: true,
          disabledFakeHarnessContractOnly: true,
          consumesNodeV288DisabledFakeHarnessContract: true,
          contractName: "ManagedAuditCredentialResolverDisabledFakeHarnessContract",
          fakeHarnessRuntimeEnabled: false,
          fakeHarnessInvocationAllowed: false,
          fakeHarnessRuntimeImplemented: false,
          fakeHarnessRuntimeInvoked: false,
          credentialResolverImplemented: false,
          credentialResolverInvoked: false,
          resolverClientInstantiated: false,
          secretProviderInstantiated: false,
          fakeSecretProviderInstantiated: false,
          fakeResolverClientInstantiated: false,
          credentialValueReadAllowed: false,
          credentialValueRead: false,
          credentialValueProvided: false,
          credentialValueLoaded: false,
          credentialValueStored: false,
          credentialValueIncluded: false,
          credentialValueRendered: false,
          rawEndpointUrlParseAllowed: false,
          rawEndpointUrlRenderAllowed: false,
          rawEndpointUrlParsed: false,
          rawEndpointUrlRendered: false,
          rawEndpointUrlProvided: false,
          rawEndpointUrlIncluded: false,
          externalRequestAllowed: false,
          externalRequestSent: false,
          httpTcpDialAllowed: false,
          connectsManagedAudit: false,
          readsManagedAuditCredential: false,
          storesManagedAuditCredential: false,
          managedAuditStore: false,
          managedAuditStorageBackend: false,
          sandboxAuditStorageBackend: false,
          storageWriteAllowed: false,
          writeCommandsExecuted: false,
          adminCommandsExecuted: false,
          runtimeWriteObserved: false,
          approvalLedgerWriteAllowed: false,
          approvalLedgerWritten: false,
          approvalLedgerWriteExecuted: false,
          managedAuditWriteExecuted: false,
          productionRecordWritten: false,
          schemaMigrationAllowed: false,
          schemaMigrationExecuted: false,
          restoreExecutionAllowed: false,
          loadRestoreCompactExecuted: false,
          setnxexExecutionAllowed: false,
          automaticUpstreamStartAllowed: false,
          automaticUpstreamStart: false,
          auditAuthoritative: false,
          orderAuthoritative: false,
          checkCount: 26,
          passedCheckCount: 26,
        },
      },
      echoVerification: {
        verificationMode:
          "java-v122-v126-plus-mini-kv-v127-disabled-fake-harness-contract-upstream-echo-verification-only",
        sourceSpan: "Node v288 + Java v122-v126 + mini-kv v127",
        sourceNodeV288Ready: true,
        javaV122V126EvidenceReady: true,
        miniKvV127NonParticipationReady: true,
        contractDigestAlignedWithMiniKv: true,
        javaQualityStopgapApplied: true,
        integrationTestSplitComplete: true,
        sideEffectBoundariesAligned: true,
        implementationStillBlocked: true,
        readyForNextDisabledFakeHarnessPlanning: true,
      },
      checks: {
        sourceNodeV288Ready: true,
        sourceNodeV288ContractStillDisabled: true,
        javaV122V126EvidenceReady: true,
        javaIntegrationTestSplitsComplete: true,
        javaCatalogStopgapApplied: true,
        javaDocumentsRuntimeBoundaries: true,
        miniKvV127ReceiptReady: true,
        miniKvV127EchoesNodeV288Contract: true,
        miniKvV127KeepsRuntimeSideEffectsBlocked: true,
        contractDigestAlignedWithMiniKv: true,
        requiredInputsAlignedWithMiniKv: true,
        allowedOutputsAlignedWithMiniKv: true,
        prohibitedInputsAlignedWithMiniKv: true,
        requiredArtifactsAlignedWithMiniKv: true,
        contractAssertionsAlignedWithMiniKv: true,
        prohibitedActionsAlignedWithMiniKv: true,
        credentialBoundaryClosed: true,
        rawEndpointBoundaryClosed: true,
        providerClientBoundaryClosed: true,
        connectionBoundaryClosed: true,
        writeBoundaryClosed: true,
        autoStartBoundaryClosed: true,
        authorityBoundaryClosed: true,
        sideEffectBoundaryClosed: true,
        upstreamProbesStillDisabled: true,
        upstreamActionsStillDisabled: true,
        productionAuditStillBlocked: true,
        productionWindowStillBlocked: true,
        readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification:
          true,
      },
      summary: {
        checkCount: 29,
        passedCheckCount: 29,
        evidenceFileCount: 7,
        matchedSnippetCount: 48,
        sourceCheckCount: 26,
        sourcePassedCheckCount: 26,
        sourceProductionBlockerCount: 0,
        javaEvidenceFileCount: 6,
        javaMatchedSnippetCount: 38,
        javaCompletedVersionCount: 5,
        javaIntegrationTestSplitVersionCount: 4,
        miniKvEvidenceFileCount: 1,
        miniKvMatchedSnippetCount: 10,
        miniKvCheckCount: 26,
        miniKvPassedCheckCount: 26,
        requiredInputCount: 6,
        allowedOutputCount: 5,
        prohibitedInputCount: 6,
        requiredArtifactCount: 9,
        contractAssertionCount: 10,
        prohibitedActionCount: 15,
        productionBlockerCount: 0,
        warningCount: 2,
        recommendationCount: 2,
      },
    });
    expect(profile.sourceNodeV288.contractDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.upstreamEchoes.miniKvV127.contractDigest).toBe(profile.sourceNodeV288.contractDigest);
    expect(profile.upstreamEchoes.miniKvV127.requiredInputs).toHaveLength(6);
    expect(profile.upstreamEchoes.miniKvV127.prohibitedActions).toHaveLength(15);
    expect(profile.echoVerification.verificationDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.productionBlockers).toHaveLength(0);
  });

  it("blocks the verification if upstream probes or actions are enabled", () => {
    const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
      config: loadTestConfig({
        UPSTREAM_PROBES_ENABLED: "true",
        UPSTREAM_ACTIONS_ENABLED: "true",
      }),
    });

    expect(profile.verificationState).toBe("blocked");
    expect(profile.readyForManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification)
      .toBe(false);
    expect(profile.checks.upstreamProbesStillDisabled).toBe(false);
    expect(profile.checks.upstreamActionsStillDisabled).toBe(false);
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_ENABLED",
      "UPSTREAM_ACTIONS_ENABLED",
    ]));
  });

  it("freezes portable profile bytes across the field-manifest refactor", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
        config: loadTestConfig(),
      });
      const stableProfile = { ...profile, generatedAt: "2026-07-21T00:00:00.000Z" };
      const normalizedProfile = normalizeForParity(stableProfile) as typeof stableProfile;
      const json = JSON.stringify(normalizedProfile);
      const markdown = normalizeText(
        renderManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationMarkdown(
          normalizedProfile,
        ),
      );

      expect.soft(Buffer.byteLength(json, "utf8")).toBe(32_490);
      expect.soft(sha256(json)).toBe(
        "e6ba14bd44a3870774a00a6aaec125724dd7788e978937c596e560c24e748838",
      );
      expect.soft(Buffer.byteLength(markdown, "utf8")).toBe(9_456);
      expect.soft(sha256(markdown)).toBe(
        "90cfc91d1b72a749303f3cd4b1793d25014f4b4f2eb2f98ba170844579f84805",
      );
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });

  it("keeps historical fixture fallback viable for sibling evidence", () => {
    const previous = process.env[FORCE_FALLBACK_ENV];
    process.env[FORCE_FALLBACK_ENV] = "true";

    try {
      const profile = loadManagedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification({
        config: loadTestConfig(),
      });

      expect(profile.verificationState).toBe("disabled-fake-harness-contract-upstream-echo-verification-ready");
      expect(profile.summary.checkCount).toBe(profile.summary.passedCheckCount);
      expect(profile.upstreamEchoes.javaV122V126.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/d/122/解释/说明.md",
      );
      expect(profile.upstreamEchoes.javaV122V126.evidenceFiles[5]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalSandboxEndpointCredentialResolverBoundaryCatalog.java",
      );
      expect(profile.upstreamEchoes.miniKvV127.evidenceFiles[0]?.resolvedPath.replace(/\\/g, "/")).toContain(
        "fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/credential-resolver-disabled-fake-harness-non-participation-receipt.json",
      );
      expect(profile.upstreamEchoes.miniKvV127.contractDigest).toBe(profile.sourceNodeV288.contractDigest);
    } finally {
      if (previous === undefined) {
        delete process.env[FORCE_FALLBACK_ENV];
      } else {
        process.env[FORCE_FALLBACK_ENV] = previous;
      }
    }
  });

  it("exposes JSON and Markdown routes through the audit route table", async () => {
    const app = await buildApp(loadTestConfig());

    try {
      const json = await app.inject({
        method: "GET",
        url: ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion:
          "managed-audit-manual-sandbox-connection-credential-resolver-disabled-fake-harness-contract-upstream-echo-verification.v1",
        verificationState: "disabled-fake-harness-contract-upstream-echo-verification-ready",
        upstreamEchoes: {
          javaV122V126: {
            integrationTestSplitComplete: true,
            evidenceServiceCatalogStopgapApplied: true,
          },
          miniKvV127: {
            releaseVersion: "v127",
            readyForNodeV289UpstreamEchoVerification: true,
          },
        },
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain(
        "# Managed audit manual sandbox connection credential resolver disabled fake harness contract upstream echo verification",
      );
      expect(markdown.body).toContain("Java v122-v126");
      expect(markdown.body).toContain("mini-kv v127");
      expect(markdown.body).toContain("Node v288");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-289",
    "x-orderops-roles": "auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v289-disabled-fake-harness-upstream-echo",
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
    ...overrides,
  });
}
